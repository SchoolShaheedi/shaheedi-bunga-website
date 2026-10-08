# The support page — why it says what it says

Written 2026-10-05, when `/donate/` was built.

## There is no way to give, and the page does not pretend otherwise

No bank details, no card form, no JustGiving or CAF page. I looked at the
website, the Instagram and the Linktree: **nothing anywhere carries a
donation route.** A page that invented one would send people's money nowhere,
so instead it says where the money goes and offers three real routes —
message, email, or give time.

**When there is a real route**, it goes in the `.ways` block on that page.

## Gift Aid is deliberately not mentioned

The Charity Commission register for 1185103 records:

> Gift aid: **Not recognised by HMRC for gift aid**

The old site menu promised *"Give, Gift Aid, sponsor a student"*. Two of those
three cannot be honoured today, so the menu now reads "Give, lend an
instrument, or give your time".

This matters more than wording: inviting Gift Aid declarations without HMRC
recognition is a tax matter, not a copy matter.

**Worth raising with the trustees:** registering for Gift Aid is free, and on
eligible donations from UK taxpayers it adds 25p per £1 at no cost to the
giver. For a charity whose whole model is "nothing is charged", that is the
single highest-value piece of admin available.

## Figures on the page

Income £25,126 and expenditure £4,136, year ending 5 April 2026; seven
trustees, none paid; no salaries over £60k; owns and leases no property. All
from the public register, which the page links to. Update them when the next
annual return is published, or remove them — do not let them go stale.


---

## Rewritten 2026-10-08 on Ustad Ji's instruction

Two changes, both asked for directly:

1. **The "Where the money goes" section is gone**, with it the income,
   expenditure, paid-trustee and charity-number figures, and the link to the
   register at the foot of the page. Ustad Ji said to leave the money records
   out. The register link on `/about/` is left alone - it is a link to the
   public register, not a statement of the charity's finances - but remove
   that too if the instruction is meant more broadly.
2. **The three "ways to give" cards are gone** (WhatsApp, email, give your
   time) and replaced by the charity's **bank details only**. No form, no
   platform. The instruction was "just bank details".

`Seva in kind` is kept: it is about lending an instrument, not about giving
money, and nothing in it is a form.

### The numbers are not in the repo yet

The four fields on the page are placeholders - `__ACCOUNT_NAME__`,
`__SORT_CODE__`, `__ACCOUNT_NUMBER__`, `__REFERENCE__`. **This branch must not
be merged until they are filled in.** Publishing a bank block with blanks in
it is worse than publishing no block at all.

Get them from the charity's own bank, not from a message or a screenshot that
was forwarded on - redirected-payment fraud against charities works exactly by
supplying plausible details through a side channel.

Gift Aid is still deliberately absent; the section above still applies.
