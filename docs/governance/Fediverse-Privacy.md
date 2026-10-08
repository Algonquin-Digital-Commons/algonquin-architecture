# Fediverse Privacy

> Standard: PSDC-DOC-001
> Document type: policy-standard
> Status: Normative
> Owner: Algonquin Digital Commons Governance
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Common policy, Algonquin institutional policy, and applicable ADRs

## Purpose

This policy governs **Fediverse Privacy** across portable PSDC contracts. Its outcome is enforceable, reviewable behavior that each institution can tighten without weakening the common privacy, security, portability, or interoperability floor.

## Scope and authority

`POL-FEDPRIV-001`: This policy applies to local and federated actors, profiles, activities, audiences, media, relationships, reports, blocks, and deletion requests. Applicable law and binding institution policy take precedence; institution overlays supply approved values and may impose stricter controls.

Product, service, data, security, privacy, and release owners retain their existing accountability. The AI reviewer and automated validator provide evidence but cannot approve an exception or replace specialist judgment.

## Normative rules

`POL-FEDPRIV-002`: Clients MUST explain the selected audience and the limits of remote deletion before publication; servers MUST enforce local visibility and minimize data sent to each remote recipient.

`POL-FEDPRIV-003`: Private or institution-limited content MUST NOT be delivered to an unapproved peer; blocks, consent withdrawal, and deletion requests propagate where the protocol supports them without claiming remote erasure is guaranteed.

`POL-FEDPRIV-004`: Implementations MUST expose the policy decision and reason at the enforcement point, fail safely when required context or policy is unavailable, and preserve a redacted receipt linked to the actor, resource, policy version, and correlation identifier.

## Enforcement and deny behavior

`POL-FEDPRIV-005`: The federation policy engine rejects disallowed peers and audiences, quarantines suspect delivery, and permits local use to continue during peer isolation. A failed check MUST prevent the affected operation rather than merely emit a warning. Unaffected local and standalone functions continue when isolation is safe.

## Exceptions, expiry, and appeal

`POL-FEDPRIV-006`: An exception requires the accountable institution authority, exact scope, rationale, risk, compensating controls, evidence, start and expiry, and revocation trigger. It cannot waive law or silently weaken a shared contract. Affected users or owners may appeal with contrary evidence; the maintainer preserves the original decision and resolution.

## Violation response

Suspected violation triggers containment, evidence preservation, notification to the owning security/privacy/data role, impact analysis, correction or rollback, and tracked prevention. Credentials or protected payloads never enter the general issue record.

## Audit evidence and review cadence

`POL-FEDPRIV-007`: Acceptance evidence includes audience tests, peer-policy decisions, outbound payload minimization, block/report workflows, deletion attempts and receipts, and user-facing disclosure review. Evidence MUST identify environment, time window, owner, pass/fail boundary, and retained artifact.

The owner reviews this policy annually and after a material law, institutional policy, data flow, threat, dependency, federation, licensing, or enforcement change.

## Acceptance criteria

`POL-FEDPRIV-008`: A capability conforms only when positive, negative, unavailable-policy, unauthorized-actor, prohibited-destination, retention/deletion, and exception-expiry tests demonstrate the rules at every relevant enforcement point and the accountable maintainer accepts residual risk.

## Algonquin policy binding

Algonquin remains the authority for legal basis, approved data classes and locations, retention values, institutional systems, exception approvers, and enforcement configuration. Those values are stored in governed deployment and policy records, not copied into the portable common policy. Until the responsible College authority approves a required value, the corresponding processing remains disabled.

## References

- [Ecosystem Documentation Quality Standard](../standards/Ecosystem-Documentation-Quality-Standard.md)
- [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md)
- [Human Choices and Decisions Register](./Human-Choices-and-Decisions-Register.md)
- [License Policy](./License-Policy.md)
- [Third-Party Provider Policy](./Third-Party-Provider-Policy.md)
