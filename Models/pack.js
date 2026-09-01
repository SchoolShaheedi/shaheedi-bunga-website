#!/usr/bin/env node
/* GLB -> compact quantised geometry, for inlining into a single-file page.
   The three.min.js UMD build has no GLTFLoader, so rather than ship one we
   bake the geometry: world-space positions quantised to int16, merged per
   material, normals recomputed at load. Typically 4-6x smaller than the GLB. */
const fs = require('fs'), path = require('path');

/* ---- 4x4 matrix helpers (column-major, as glTF stores them) ---- */
const I4 = () => [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
function mul(a, b) {            // a * b
  const o = new Array(16);
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) {
    let s = 0;
    for (let k = 0; k < 4; k++) s += a[k*4 + r] * b[c*4 + k];
    o[c*4 + r] = s;
  }
  return o;
}
function fromTRS(t, q, s) {
  t = t || [0,0,0]; q = q || [0,0,0,1]; s = s || [1,1,1];
  const [x,y,z,w] = q;
  const x2=x+x, y2=y+y, z2=z+z;
  const xx=x*x2, xy=x*y2, xz=x*z2, yy=y*y2, yz=y*z2, zz=z*z2;
  const wx=w*x2, wy=w*y2, wz=w*z2;
  return [
    (1-(yy+zz))*s[0], (xy+wz)*s[0],     (xz-wy)*s[0],     0,
    (xy-wz)*s[1],     (1-(xx+zz))*s[1], (yz+wx)*s[1],     0,
    (xz+wy)*s[2],     (yz-wx)*s[2],     (1-(xx+yy))*s[2], 0,
    t[0],             t[1],             t[2],             1
  ];
}
const apply = (m, x, y, z) => [
  m[0]*x + m[4]*y + m[8]*z  + m[12],
  m[1]*x + m[5]*y + m[9]*z  + m[13],
  m[2]*x + m[6]*y + m[10]*z + m[14]
];

/* ---- GLB reading ---- */
function readGLB(file) {
  const b = fs.readFileSync(file);
  if (b.readUInt32LE(0) !== 0x46546C67) throw new Error('not a GLB: ' + file);
  let off = 12, json = null, bin = null;
  while (off < b.length) {
    const len = b.readUInt32LE(off), type = b.readUInt32LE(off + 4);
    const data = b.slice(off + 8, off + 8 + len);
    if (type === 0x4E4F534A) json = JSON.parse(data.toString('utf8'));
    if (type === 0x004E4942) bin = data;
    off += 8 + len;
  }
  return { json, bin };
}
const COMP = { 5120:[1,'Int8'], 5121:[1,'Uint8'], 5122:[2,'Int16'],
               5123:[2,'Uint16'], 5125:[4,'Uint32'], 5126:[4,'Float32'] };
const NUM  = { SCALAR:1, VEC2:2, VEC3:3, VEC4:4, MAT4:16 };

function readAccessor(json, bin, idx) {
  const a = json.accessors[idx];
  const [csize, cname] = COMP[a.componentType];
  const n = NUM[a.type];
  const out = new (globalThis[cname + 'Array'])(a.count * n);
  if (a.bufferView === undefined) return out;             // sparse/zero-filled
  const v = json.bufferViews[a.bufferView];
  const base = (v.byteOffset || 0) + (a.byteOffset || 0);
  const stride = v.byteStride || csize * n;
  for (let i = 0; i < a.count; i++) {
    const at = base + i * stride;
    for (let c = 0; c < n; c++) {
      const o = at + c * csize;
      out[i * n + c] =
        cname === 'Float32' ? bin.readFloatLE(o) :
        cname === 'Uint32'  ? bin.readUInt32LE(o) :
        cname === 'Uint16'  ? bin.readUInt16LE(o) :
        cname === 'Int16'   ? bin.readInt16LE(o)  :
        cname === 'Uint8'   ? bin.readUInt8(o)    : bin.readInt8(o);
    }
  }
  return out;
}

/* ---- collect world-space triangles, grouped by material ---- */
function collect(file) {
  const { json, bin } = readGLB(file);
  const groups = new Map();                                // matIdx -> {pos:[], idx:[]}
  const scene = json.scenes[json.scene || 0];

  (function walk(nodeIdx, parent) {
    const nd = json.nodes[nodeIdx];
    const local = nd.matrix ? nd.matrix.slice() : fromTRS(nd.translation, nd.rotation, nd.scale);
    const world = mul(parent, local);
    if (nd.mesh !== undefined) {
      for (const p of json.meshes[nd.mesh].primitives) {
        if (p.mode !== undefined && p.mode !== 4) continue;   // triangles only
        const m = p.material === undefined ? -1 : p.material;
        if (!groups.has(m)) groups.set(m, { pos: [], idx: [] });
        const g = groups.get(m);
        const base = g.pos.length / 3;
        const P = readAccessor(json, bin, p.attributes.POSITION);
        for (let i = 0; i < P.length; i += 3) {
          const w = apply(world, P[i], P[i+1], P[i+2]);
          g.pos.push(w[0], w[1], w[2]);
        }
        if (p.indices !== undefined) {
          const I = readAccessor(json, bin, p.indices);
          for (let i = 0; i < I.length; i++) g.idx.push(base + I[i]);
        } else {
          for (let i = 0; i < P.length / 3; i++) g.idx.push(base + i);
        }
      }
    }
    for (const c of (nd.children || [])) walk(c, world);
  });

  for (const n of scene.nodes) (function rec(i, par){
    const nd = json.nodes[i];
    const local = nd.matrix ? nd.matrix.slice() : fromTRS(nd.translation, nd.rotation, nd.scale);
    const world = mul(par, local);
    if (nd.mesh !== undefined) {
      for (const p of json.meshes[nd.mesh].primitives) {
        if (p.mode !== undefined && p.mode !== 4) continue;
        const m = p.material === undefined ? -1 : p.material;
        if (!groups.has(m)) groups.set(m, { pos: [], idx: [] });
        const g = groups.get(m);
        const base = g.pos.length / 3;
        const P = readAccessor(json, bin, p.attributes.POSITION);
        for (let k = 0; k < P.length; k += 3) {
          const w = apply(world, P[k], P[k+1], P[k+2]);
          g.pos.push(w[0], w[1], w[2]);
        }
        if (p.indices !== undefined) {
          const Ix = readAccessor(json, bin, p.indices);
          for (let k = 0; k < Ix.length; k++) g.idx.push(base + Ix[k]);
        } else {
          for (let k = 0; k < P.length / 3; k++) g.idx.push(base + k);
        }
      }
    }
    for (const c of (nd.children || [])) rec(c, world);
  })(n, I4());

  /* material palette */
  const mats = (json.materials || []).map(m => {
    const pbr = m.pbrMetallicRoughness || {};
    const c = pbr.baseColorFactor || [0.8,0.8,0.8,1];
    return {
      name: m.name || '',
      color: '#' + [0,1,2].map(i =>
        Math.round(Math.min(1, Math.max(0, c[i])) * 255).toString(16).padStart(2,'0')).join(''),
      metal: pbr.metallicFactor  === undefined ? 1   : pbr.metallicFactor,
      rough: pbr.roughnessFactor === undefined ? 1   : pbr.roughnessFactor
    };
  });
  return { groups, mats };
}

/* ---- pack one model ---- */
function pack(file) {
  const { groups, mats } = collect(file);
  let lo = [ Infinity, Infinity, Infinity], hi = [-Infinity,-Infinity,-Infinity];
  for (const g of groups.values())
    for (let i = 0; i < g.pos.length; i += 3)
      for (let c = 0; c < 3; c++) {
        const v = g.pos[i + c];
        if (v < lo[c]) lo[c] = v;
        if (v > hi[c]) hi[c] = v;
      }
  const span = Math.max(hi[0]-lo[0], hi[1]-lo[1], hi[2]-lo[2]) || 1;
  const scale = span / 65534;                              // int16 range

  const list = [...groups.entries()].filter(([, g]) => g.idx.length);
  const meta = [];
  const chunks = [];
  for (const [mat, g] of list) {
    const nv = g.pos.length / 3, ni = g.idx.length;
    const wide = nv > 65535;
    const P = Buffer.alloc(nv * 6);
    for (let i = 0; i < nv * 3; i++) {
      let q = Math.round((g.pos[i] - lo[i % 3]) / scale) - 32767;
      P.writeInt16LE(Math.max(-32768, Math.min(32767, q)), i * 2);
    }
    const IB = Buffer.alloc(ni * (wide ? 4 : 2));
    for (let i = 0; i < ni; i++)
      wide ? IB.writeUInt32LE(g.idx[i], i*4) : IB.writeUInt16LE(g.idx[i], i*2);
    chunks.push(P, IB);
    meta.push({ m: mat, v: nv, i: ni, w: wide ? 1 : 0 });
  }
  return {
    name: path.basename(file, '.glb'),
    origin: lo.map(v => +(v + 32767 * scale).toFixed(5)),
    scale: +scale.toFixed(9),
    size: [ +(hi[0]-lo[0]).toFixed(3), +(hi[1]-lo[1]).toFixed(3), +(hi[2]-lo[2]).toFixed(3) ],
    mats, groups: meta,
    b64: Buffer.concat(chunks).toString('base64')
  };
}

const files = process.argv.slice(2);
const out = { models: {} };
let rawTotal = 0, packTotal = 0;
for (const f of files) {
  const p = pack(f);
  const raw = fs.statSync(f).size;
  rawTotal += raw; packTotal += p.b64.length;
  out.models[p.name] = p;
  const tris = p.groups.reduce((a,g) => a + g.i/3, 0);
  console.error(
    p.name.padEnd(18),
    ((raw/1048576).toFixed(2)+'MB').padStart(8), '->',
    ((p.b64.length/1048576).toFixed(2)+'MB').padStart(8),
    ('x'+(raw/p.b64.length).toFixed(1)).padStart(6),
    ' tris '+Math.round(tris).toString().padStart(6),
    ' grp '+String(p.groups.length).padStart(3),
    ' size '+p.size.join(' x ')
  );
}
console.error('-'.repeat(96));
console.error('TOTAL'.padEnd(18), ((rawTotal/1048576).toFixed(2)+'MB').padStart(8), '->',
              ((packTotal/1048576).toFixed(2)+'MB').padStart(8),
              ('x'+(rawTotal/packTotal).toFixed(1)).padStart(6));
fs.writeFileSync('models.packed.json', JSON.stringify(out));
console.error('wrote models.packed.json');
