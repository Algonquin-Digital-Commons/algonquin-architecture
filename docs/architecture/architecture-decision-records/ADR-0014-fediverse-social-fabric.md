# ADR-0014: The Social Fabric Is Fediverse- and ActivityPub-Based


> Standard: PSDC-DOC-001
> Document type: adr
> Status: Accepted
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Date: 2026-09-10
> Scope: Social, photos, video, communities, blogs, live media, and inter-campus collaboration

## Decision

Every institution operates its own governed social node or suite. Cross-campus,
provincial, Canadian, and public social interoperability uses ActivityPub and
related Fediverse standards rather than a proprietary social protocol or shared
central social database.

Algonquin-specific value belongs in institutional affiliation, local discovery,
clubs, courses, events, moderation, policy, accessibility, student-life agents,
media/spatial integration, and coherent UX. Mature open-source Fediverse products
are adopted or extended behind shared contracts.

Institutional identity and public Fediverse identity remain distinct. Verified
affiliation is an explicit, revocable claim; it does not expose private
institutional identity data to federation peers.

## Consequences

- AC Fediverse remains the sole external ActivityPub boundary.
- Other fabrics publish through internal contracts rather than implementing
  federation independently.
- Federation trust and moderation operate at institution, consortium, and public
  levels with different policies.
- Compatibility and abuse-resistance testing precede public federation.

## Alternatives and evidence

For **ADR-0014: The Social Fabric Is Fediverse- and ActivityPub-Based**, the decision record considered: retain the prior approach; adopt a mature compatible standard or open-source implementation; and build or fork a new primitive. The selected decision is preferred under the stated constraints. A change trigger is new security, licensing, interoperability, sovereignty, cost, or operational evidence; a new option requires an ADR update rather than an undocumented exception.

## Migration and rollback

A change implementing **ADR-0014: The Social Fabric Is Fediverse- and ActivityPub-Based** MUST preserve the current contract during the declared compatibility window, publish a versioned migration plan, and rehearse rollback before production promotion. Migration evidence includes inventory, data/state transformation, operator communication, and verification. Rollback is triggered by failed acceptance, security regression, loss of institution control, or unrecoverable compatibility failure; it restores the last accepted artifact and preserves audit history. If no migration is currently required, the owner MUST record that as a reviewed no-op and revisit it when the decision changes.
