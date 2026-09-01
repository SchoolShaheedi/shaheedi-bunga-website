import re, sys, json, html, os
from datetime import datetime

TOK = re.compile(
    r'<h2 class="_3-95 _2pim _a6-h _a6-i">(?P<cap>.*?)</h2>'
    r'|<(?:a target="_blank" href|video src)="(?P<media>media/[^"]+)"'
    r'|<div class="_3-94 _a6-o">(?P<date>[^<]*)</div>'
    r'|<td class="_a6_q">Caption</td><td class="_2piu _a6_r">(?P<cap2>.*?)</td>'
    r'|<td class="_a6_q">Creation time</td><td class="_2piu _a6_r">(?P<date2>[^<]*)</td>', re.S)

def clean(s):
    return html.unescape(re.sub(r'<[^>]+>', ' ', s)).strip()

def parse(path, kind):
    h = open(path, encoding='utf-8').read()
    body = h[h.index('<main'):]
    out, cur = [], {'kind': kind, 'caption': '', 'media': [], 'time': ''}
    for m in TOK.finditer(body):
        if m.group('cap') is not None or m.group('cap2') is not None:
            c = clean(m.group('cap') if m.group('cap') is not None else m.group('cap2'))
            if c and c not in cur['caption']:
                cur['caption'] = (cur['caption'] + '\n' + c).strip()
        elif m.group('media'):
            p = m.group('media')
            if not p.endswith('.srt') and p not in cur['media']:
                cur['media'].append(p)
        else:
            d = (m.group('date') or m.group('date2') or '').strip()
            cur['time'] = d
            if cur['caption'] or cur['media']:
                out.append(cur)
            cur = {'kind': kind, 'caption': '', 'media': [], 'time': ''}
    if cur['caption'] or cur['media']:
        out.append(cur)
    return out

base = sys.argv[1]
files = [('post','your_instagram_activity/media/posts_1.html'),
         ('reel','your_instagram_activity/media/reels.html'),
         ('story','your_instagram_activity/media/stories.html'),
         ('archived','your_instagram_activity/media/archived_posts.html'),
         ('igtv','your_instagram_activity/media/igtv_videos.html'),
         ('other','your_instagram_activity/media/other_content.html')]
items = []
for kind, rel in files:
    p = os.path.join(base, rel)
    if not os.path.exists(p): continue
    got = parse(p, kind)
    withcap = sum(1 for g in got if g['caption'])
    print(f'{rel:52s} {len(got):5d} entries  {withcap:5d} with caption', file=sys.stderr)
    items += got

def key(it):
    for fmt in ('%b %d, %Y %I:%M %p',):
        try: return datetime.strptime(it['time'], fmt)
        except Exception: pass
    return datetime(1970,1,1)

# dedupe by (kind, time, caption)
seen, uniq = set(), []
for it in items:
    k = (it['kind'], it['time'], it['caption'][:120])
    if k in seen: continue
    seen.add(k); uniq.append(it)

uniq.sort(key=key, reverse=True)
for it in uniq:
    d = key(it)
    it['date'] = d.strftime('%Y-%m-%d %H:%M') if d.year > 1970 else ''
    del it['time']
json.dump(uniq, open(sys.argv[2],'w',encoding='utf-8'), ensure_ascii=False, indent=1)
print(f'TOTAL {len(uniq)} unique -> {sys.argv[2]}', file=sys.stderr)
