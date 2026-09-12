# Data Handling

> Standard: PSDC-DOC-001
> Document type: policy-standard
> Status: Normative
> Owner: PSDC Governance Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: ADR-0001, ADR-0008, ADR-0012, ADR-0013, ADR-0016, and ADR-0024

## Purpose

This policy governs **Data Handling** across portable PSDC contracts. Its outcome is enforceable, reviewable behavior that each institution can tighten without weakening the common privacy, security, portability, or interoperability floor.

## Scope and authority

`POL-HANDLE-001`: This policy applies to collection, validation, use, transformation, sharing, storage, caching, backup, export, archival, and deletion. Applicable law and binding institution policy take precedence; institution overlays supply approved values and may impose stricter controls.

Product, service, data, security, privacy, and release owners retain their existing accountability. The AI reviewer and automated validator provide evidence but cannot approve an exception or replace specialist judgment.

## Normative rules

`POL-HANDLE-002`: A service MUST collect and process only fields required for an approved purpose and MUST validate the permitted purpose, actor, destination, and data class at every trust boundary.

`POL-HANDLE-003`: Protected data MUST use approved encrypted transport and storage, least-privilege access, bounded copies, declared retention, user or owner correction/export, and deletion propagation.

`POL-HANDLE-004`: Implementations MUST expose the policy decision and reason at the enforcement point, fail safely when required context or policy is unavailable, and preserve a redacted receipt linked to the actor, resource, policy version, and correlation identifier.

## Enforcement and deny behavior

`POL-HANDLE-005`: Policy enforcement denies unapproved destination, purpose, copy, or export; the data owner quarantines mishandled copies and initiates incident review. A failed check MUST prevent the affected operation rather than merely emit a warning. Unaffected local and standalone functions continue when isolation is safe.

## Exceptions, expiry, and appeal

`POL-HANDLE-006`: An exception requires the accountable institution authority, exact scope, rationale, risk, compensating controls, evidence, start and expiry, and revocation trigger. It cannot waive law or silently weaken a shared contract. Affected users or owners may appeal with contrary evidence; the maintainer preserves the original decision and resolution.

## Violation response

Suspected violation triggers containment, evidence preservation, notification to the owning security/privacy/data role, impact analysis, correction or rollback, and tracked prevention. Credentials or protected payloads never enter the general issue record.

## Audit evidence and review cadence

`POL-HANDLE-007`: Acceptance evidence includes lineage, access decisions, copy inventory, encryption tests, export receipts, retention jobs, deletion propagation, and incident records. Evidence MUST identify environment, time window, owner, pass/fail boundary, and retained artifact.

The owner reviews this policy annually and after a material law, institutional policy, data flow, threat, dependency, federation, licensing, or enforcement change.

## Acceptance criteria

`POL-HANDLE-008`: A capability conforms only when positive, negative, unavailable-policy, unauthorized-actor, prohibited-destination, retention/deletion, and exception-expiry tests demonstrate the rules at every relevant enforcement point and the accountable maintainer accepts residual risk.

## References

- [Ecosystem Documentation Quality Standard](../standards/Ecosystem-Documentation-Quality-Standard.md)
- [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md)
- [Human Choices and Decisions Register](./Human-Choices-and-Decisions-Register.md)
- [License Policy](./License-Policy.md)
- [Third-Party Provider Policy](./Third-Party-Provider-Policy.md)
