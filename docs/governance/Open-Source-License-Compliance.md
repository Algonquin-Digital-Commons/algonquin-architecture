# Open-Source License Compliance

> Standard: PSDC-DOC-001
> Document type: policy-standard
> Status: Normative
> Owner: PSDC Governance Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: ADR-0001, ADR-0008, ADR-0012, ADR-0013, ADR-0016, and ADR-0024

## Purpose

This policy governs **Open-Source License Compliance** across portable PSDC contracts. Its outcome is enforceable, reviewable behavior that each institution can tighten without weakening the common privacy, security, portability, or interoperability floor.

## Scope and authority

`POL-OSSLIC-001`: This policy applies to source, dependencies, containers, models, datasets, media, fonts, build tools, copied files, patches, and distributed artifacts. Applicable law and binding institution policy take precedence; institution overlays supply approved values and may impose stricter controls.

Product, service, data, security, privacy, and release owners retain their existing accountability. The AI reviewer and automated validator provide evidence but cannot approve an exception or replace specialist judgment.

## Normative rules

`POL-OSSLIC-002`: Every included artifact MUST have an identified source, immutable version, SPDX expression, notice obligations, redistribution conditions, and compatibility decision before release.

`POL-OSSLIC-003`: Apache-2.0 is the default for new PSDC code; upstream licenses remain authoritative. Contribution-back expectations use contribution policy, governance, support terms, or a separately accepted agreement and MUST NOT be misrepresented as a restriction imposed by a permissive license.

`POL-OSSLIC-004`: Implementations MUST expose the policy decision and reason at the enforcement point, fail safely when required context or policy is unavailable, and preserve a redacted receipt linked to the actor, resource, policy version, and correlation identifier.

## Enforcement and deny behavior

`POL-OSSLIC-005`: Release gates block unknown, incompatible, prohibited, or notice-incomplete material; maintainers remove or replace it and preserve the evidence. A failed check MUST prevent the affected operation rather than merely emit a warning. Unaffected local and standalone functions continue when isolation is safe.

## Exceptions, expiry, and appeal

`POL-OSSLIC-006`: An exception requires the accountable institution authority, exact scope, rationale, risk, compensating controls, evidence, start and expiry, and revocation trigger. It cannot waive law or silently weaken a shared contract. Affected users or owners may appeal with contrary evidence; the maintainer preserves the original decision and resolution.

## Violation response

Suspected violation triggers containment, evidence preservation, notification to the owning security/privacy/data role, impact analysis, correction or rollback, and tracked prevention. Credentials or protected payloads never enter the general issue record.

## Audit evidence and review cadence

`POL-OSSLIC-007`: Acceptance evidence includes SBOM, source and checksum manifest, license scan with human disposition, NOTICE/source-offer output, model and dataset terms, patch provenance, and release approval. Evidence MUST identify environment, time window, owner, pass/fail boundary, and retained artifact.

The owner reviews this policy annually and after a material law, institutional policy, data flow, threat, dependency, federation, licensing, or enforcement change.

## Acceptance criteria

`POL-OSSLIC-008`: A capability conforms only when positive, negative, unavailable-policy, unauthorized-actor, prohibited-destination, retention/deletion, and exception-expiry tests demonstrate the rules at every relevant enforcement point and the accountable maintainer accepts residual risk.

## References

- [Ecosystem Documentation Quality Standard](../standards/Ecosystem-Documentation-Quality-Standard.md)
- [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md)
- [Human Choices and Decisions Register](./Human-Choices-and-Decisions-Register.md)
- [License Policy](./License-Policy.md)
- [Third-Party Provider Policy](./Third-Party-Provider-Policy.md)
