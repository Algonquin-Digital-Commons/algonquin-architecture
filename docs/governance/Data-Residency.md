# Data Residency

> Standard: PSDC-DOC-001
> Document type: policy-standard
> Status: Normative
> Owner: PSDC Governance Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: ADR-0001, ADR-0008, ADR-0012, ADR-0013, ADR-0016, and ADR-0030

## Purpose

This policy governs **Data Residency** across portable PSDC contracts. Its outcome is enforceable, reviewable behavior that each institution can tighten without weakening the common privacy, security, portability, or interoperability floor.

## Scope and authority

`POL-RESID-001`: This policy applies to primary data, replicas, backups, indexes, caches, logs, traces, model context, support access, and disaster-recovery copies. Applicable law and binding institution policy take precedence; institution overlays supply approved values and may impose stricter controls.

Product, service, data, security, privacy, and release owners retain their existing accountability. The AI reviewer and automated validator provide evidence but cannot approve an exception or replace specialist judgment.

## Normative rules

`POL-RESID-002`: The institution data owner MUST declare allowed and prohibited processing and storage locations for each class, including operator access and subprocessors.

`POL-RESID-003`: Routing MUST fail closed when no approved locality can meet the request; failover and backup restore MUST preserve residency rather than silently using an available foreign region.

`POL-RESID-004`: Implementations MUST expose the policy decision and reason at the enforcement point, fail safely when required context or policy is unavailable, and preserve a redacted receipt linked to the actor, resource, policy version, and correlation identifier.

## Enforcement and deny behavior

`POL-RESID-005`: Deployment admission, storage placement, AI routing, backup, telemetry, and support-access policies reject an undeclared or prohibited location. A failed check MUST prevent the affected operation rather than merely emit a warning. Unaffected local and standalone functions continue when isolation is safe.

## Exceptions, expiry, and appeal

`POL-RESID-006`: An exception requires the accountable institution authority, exact scope, rationale, risk, compensating controls, evidence, start and expiry, and revocation trigger. It cannot waive law or silently weaken a shared contract. Affected users or owners may appeal with contrary evidence; the maintainer preserves the original decision and resolution.

## Violation response

Suspected violation triggers containment, evidence preservation, notification to the owning security/privacy/data role, impact analysis, correction or rollback, and tracked prevention. Credentials or protected payloads never enter the general issue record.

## Audit evidence and review cadence

`POL-RESID-007`: Acceptance evidence includes placement inventories, provider and subprocessor records, route-denial tests, failover exercises, backup location checks, and access-location logs. Evidence MUST identify environment, time window, owner, pass/fail boundary, and retained artifact.

The owner reviews this policy annually and after a material law, institutional policy, data flow, threat, dependency, federation, licensing, or enforcement change.

## Acceptance criteria

`POL-RESID-008`: A capability conforms only when positive, negative, unavailable-policy, unauthorized-actor, prohibited-destination, retention/deletion, and exception-expiry tests demonstrate the rules at every relevant enforcement point and the accountable maintainer accepts residual risk.

## References

- [Ecosystem Documentation Quality Standard](../standards/Ecosystem-Documentation-Quality-Standard.md)
- [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md)
- [Human Choices and Decisions Register](./Human-Choices-and-Decisions-Register.md)
- [License Policy](./License-Policy.md)
- [Third-Party Provider Policy](./Third-Party-Provider-Policy.md)
