# Case Study 01 — Cloud Service Ordering
**Kate Xu · Lead Product Designer · Bank of America · 2025–2026**

Internal private-cloud platform hosting 1,000+ applications. Users: BofA engineers ordering hosted infrastructure. Headline result: **ordering success 11% → 34% (+23 points), average ordering time −32%.**

---

## 1. Context

Engineers order hosted services — compute, databases, middleware — through a 12-step ordering wizard: Create → Solution template → Placement (AZ) → OS base → Hypervisor → Hostnames → NAS mounts → Storage → Maintenance windows → Advanced parameters → Summary → Submit.

Glassbox session analytics showed the funnel narrowing at every stage:

| Step | Reaching it |
|---|---|
| Create | 100% |
| Solution template | 96% |
| Placement (AZ) | 76% |
| OS base | 71% |
| Hypervisor | 67% |
| Hostnames | 63% |
| NAS mounts | 45% |
| Storage | 28% |
| Maintenance windows | 22% |
| Advanced parameters | 17% |
| Summary | 11% |
| Submit | 11% |

Three cliffs dominated: **Placement −20 points, NAS mounts −18, Storage −17.** Nine of every ten started orders never reached submit.

**The framing that drives the whole study:** quantitative data shows *where* users leave. It can never show *why*.

## 2. First instinct — and the first wall

Hypotheses taken into working sessions with engineering and the PM:
- **H1 — drop steps entirely.** Which are truly required?
- **H2 — ask later.** Could some questions wait until after submission?
- **H3 — merge screens.** Fewer stops, same inputs?

Verdict after walking the wizard field by field: **12 of 12 steps required before provisioning.** Every input is a technical parameter the provisioning system needs; deferring one only moves the block downstream and stalls the build; merging screens made each screen worse without shortening the flow. The wizard wasn't long by accident — it was already as short as it could be.

*What a lost argument buys: certainty.* The problem was not the number of steps.

## 3. Reframing the question

From **"which steps can we cut?"** to **"who is walking these steps — what's on their mind?"**

## 4. Research

Directed the study and staffed it with two UX interns, five solid interviews each (10 power users total). Before any session was approved, the team aligned on:

1. **Who counts as a power user** — ordering frequency, not job title.
2. **What we observe** — time per step, re-entered configurations, workarounds, where hands hesitate.
3. **What we listen for** — hearing them talk is the priority: it's the one thing session tracking can never capture.
4. **What counts as a pattern** — a behavior repeated across sessions, tagged per wizard step.

Method, in order: **watch what they do → observe the patterns → listen to what they say.** What people do and what they say don't always match; the gap between them is where the insight lives.

**The finding: 7 of 10 said a version of the same thing, unprompted —** *"I just want to repeat my last order — or place the same one for my teammates."* The wizard treated every order as novel. Most orders aren't; they're repeats of a standard setup shared across a team.

## 5. Two dead ends

**Attempt 1 — ordering on behalf.** Let a power user place standard orders for teammates. Killed at proposal stage: every provisioning call authenticates with the requester's identity token — entitlements, quota, and compliance are bound to whoever clicks submit. Separating requester from owner meant re-architecting entitlements across a dozen downstream systems, quoted at two quarters.
*What it revealed: it's the **approval** that needs to transfer between people, not the person.*

**Attempt 2 — vouchers.** Configure a standard order once, mint vouchers a teammate redeems under their own identity. Engineering's first read: achievable. Then the review surfaced the real problem — a voucher lives **outside the platform**. Passed around in chat and email, it can be redeemed by someone the approval was never meant for: steps happen off-platform outside the audit trail, vouchers can be shared or reused, entitlement rules get bypassed instead of enforced. In a bank, an approval that travels unattached to identity is a governance gap, not a shortcut. (Separately, each voucher carried its own lifecycle — mint, validate, track, expire, reconcile — firing backend calls on every redemption.)

*The sharpened question: what's the lightest object that carries an approval from one person to a team — without ever leaving the platform?*

## 6. The solution — pre-approval tickets

A standard order requested once, approved by the tech owner who owns the AIT. The requester receives an approval email and orders without the wizard. Identity stays the requester's own, so the backend is untouched.

1. **Request** — one checkbox at the end of the existing ordering flow ("Request pre-approval ticket"), tracked in My Open Tickets. No new flow to learn; the order just configured becomes the template.
2. **Approve** — the tech owner reviews under My Approvals.
3. **Order** — the requester gets the email and skips the wizard.

### Role-based access as the authentication
- **My Open Tickets — all roles.** Status and delete only; a requester can never approve their own request.
- **My Approvals — tech owner only.** Approve, reject with a reason, or decide in bulk across the AIT.

The second tab doesn't gray out for a requester — it isn't rendered at all. Role-based visibility *is* the authorization boundary.

### State model
One rule for every action: **act → processing → settled.** Four ticket states — Pending, Submitted, Deleting, Deleted (plus Approved). A row shows a spinner while the backend works, then settles and its actions disappear. Ticket details travel with the actions — who requested it, the exact provisioning description, full approval history — so approval is informed, not rubber-stamped.

## 7. Impact

**Before:** one path for every order — start → 12-step wizard → submit.
**Now:** a branch — start → pre-approval ticket → submit, with the full wizard still available for genuinely new orders.

- **+23 points ordering success** (11% → 34%)
- **−32% average ordering time**

Nothing was taken away; repeats just stopped paying the wizard's cost. The time drop reveals how much volume was this category all along — standard setups placed by teams under the same AIT.

## 8. Reflection — dead ends led to the method

| The wall | What it proved | The turn it forced |
|---|---|---|
| Nothing could be cut | All 12 steps required before provisioning | Stop asking which steps to remove; ask who is walking them |
| Identity couldn't move | Provisioning is bound to the requester's token | It's the approval that transfers, not the person |
| Vouchers left the platform | Shareable, reusable, unauditable | Keep the approval inside the system, under the requester's identity |

Quantitative data showed what to fix. Qualitative patterns showed the way in. The walls decided the shape.

---

**Collaborators:** a 35-person platform org — product managers, cloud engineers, the BofA design-system group, and two UX interns I directed for the research.
