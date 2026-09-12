# Data Loss Prevention


> Standard: PSDC-DOC-001
> Document type: policy-standard
> Status: Normative
> Owner: PSDC Security Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance
> Domain: security

## Purpose and outcome

This specification defines **Data Loss Prevention** as part of the Post Secondary Digital
Commons. Its required outcome is defence in depth across identity, software supply chain, workloads, data, networks, clients, federation, and incident response. An implementation conforms
only when it satisfies this document, the linked ADRs, and the common
[Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for Data Loss Prevention.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- The Data Loss Prevention capability SHALL provide defence in depth across identity, software supply chain, workloads, data, networks, clients, federation, and incident response.
- The capability SHALL have a versioned configuration schema, explicit safe
  defaults, validation before activation, and a reversible change procedure.
- User-visible and administrative behaviour SHALL be accessible, explainable,
  auditable, and bounded by institution policy and user authority.
- An implementation SHALL expose only the minimum capability required by its
  callers and SHALL reject unknown, unauthorized, malformed, expired, or
  unsupported requests with stable machine-readable errors.
- Institution deployments SHALL be independently operable and SHALL remain
  compatible with the common contract and conformance suite.

## Interfaces, APIs, events, and contracts

See [Interface controls](../architecture/Domain-Control-Profiles.md#security-profile); local extensions remain normative.

## Dependencies and ownership boundaries

Inherits [baseline ownership controls](../architecture/Cross-Cutting-Architecture-Requirements.md#ownership-and-dependency-boundaries).

## Data, state, residency, and retention

See [Data controls](../architecture/Domain-Control-Profiles.md#security-profile); local extensions remain normative.

## Security, privacy, safety, and compliance

See [Security controls](../architecture/Domain-Control-Profiles.md#security-profile); local extensions remain normative.

## Deployment, environments, and configuration

Inherits [baseline deployment controls](../architecture/Cross-Cutting-Architecture-Requirements.md#deployment-and-configuration).

## Capacity, scaling, cost, and sustainability

Inherits [baseline capacity controls](../architecture/Cross-Cutting-Architecture-Requirements.md#capacity-and-overload).

## Failure, recovery, and compatibility

See [Failure controls](../architecture/Domain-Control-Profiles.md#security-profile); local extensions remain normative.

## Observability, testing, and operational readiness

Inherits [baseline evidence controls](../architecture/Cross-Cutting-Architecture-Requirements.md#observability-and-evidence).

## Standards and implementation strategy

See [Standards controls](../architecture/Domain-Control-Profiles.md#security-profile); local extensions remain normative.

## Settled architecture constraints

- Security uses standard TLS/mTLS, PKI, identity, secret-management, signing, SBOM, and supply-chain mechanisms.
- Any custom policy or enforcement component must integrate established engines or standards before proposing a new language.
- Use CloudEvents and AsyncAPI where appropriate, with explicit idempotency, ordering, retry, and schema evolution.
- Any exception follows the adopt → extend → compatible fork → build hierarchy and requires an ADR with evidence.

## Subject-specific control contract

| Dimension | Required definition |
|---|---|
| Owned responsibility | classification-aware controls that prevent unauthorized disclosure |
| Authoritative input | classified payload, actor purpose, destination, consent, and transfer context |
| Authoritative output | allow, redact, quarantine, deny, or escalated-review decision with audit evidence |
| Primary trust boundary | every egress path from protected storage, clients, AI context, logs, and federation |
| Unsafe failure to prevent | protected data leaves its permitted purpose, residency, audience, or retention boundary |

- **SEC-DLP-001:** The owner MUST implement the responsibility and preserve the input-to-output evidence chain shown above.
- **SEC-DLP-002:** The enforcement point MUST fail closed when identity, policy version, integrity, freshness, or required context cannot be verified.
- **SEC-DLP-003:** A release MUST include a positive conformance case, an unauthorized or malformed case, a dependency-loss case, and a regression case for the unsafe failure.
- **SEC-DLP-004:** Exceptions MUST identify scope, compensating controls, approver, expiry, monitoring, and a removal plan; permanent undocumented bypasses are prohibited.

The Algonquin deployment MUST bind these controls to Algonquin-owned identity, policy, evidence retention, and incident routes without weakening the common contract.

### Verification scenarios

1. Exercise classification-aware controls that prevent unauthorized disclosure | with classified payload, actor purpose, destination, consent, and transfer context | and prove the recorded result is allow, redact, quarantine, deny, or escalated-review decision with audit evidence |.
2. Remove or alter one required input and prove the request is denied without exposing protected diagnostic content.
3. Simulate the dependency or authority failure that could cause protected data leaves its permitted purpose, residency, audience, or retention boundary |; prove the declared safe state, revocation, and evidence are produced.
## Decision traceability

- ADR-0001: Standards-First / Buy-Borrow-Build
- ADR-0005: Standard Platform Primitives
- ADR-0012: Tenant-Neutral Post-Secondary Digital Commons
- ADR-0013: Institution-First Federation Locality
- ADR-0016: Accepted Project Defaults
- ADR-0017: OpenTofu Default Infrastructure-as-Code Toolchain

## Acceptance criteria

Inherits [baseline acceptance gates](../architecture/Cross-Cutting-Architecture-Requirements.md#observability-and-evidence); every local requirement MUST also pass.

## Purpose

This policy defines the required outcome, actors, and decision boundary for **Data-Loss-Prevention**. It applies to all implementations and institution overlays that claim conformance.

## Normative rules

The requirements in this document are normative. Owners MUST implement them, SHOULD document justified risk trade-offs, and MUST NOT treat an example as an exemption.

## Enforcement

The owning maintainer enforces this policy through review, automated checks, release gates, operator runbooks, and periodic evidence review. A critical violation blocks promotion until corrected or explicitly excepted.

## Exceptions

An exception requires affected scope, rationale, threat/risk assessment, compensating controls, accountable approver, expiry date, and rollback or remediation plan. Exceptions MUST be narrow and time-bounded.

## Audit evidence

Audit evidence includes implementation links, test results, configuration or provenance records, incidents, approvals, and exception history. Evidence MUST be reproducible by an independent maintainer.

## Acceptance and review

Acceptance requires the documented controls, tests, operator ownership, and evidence to be complete. The owner reviews this policy on material architecture change and at least once per release cycle.

## References

- [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md)
- [Technology Defaults and Alternatives](../vision/13-Technology-Defaults-and-Alternatives.md)
- [Human Choices and Decisions Register](../governance/Human-Choices-and-Decisions-Register.md)
- [ADR-0001: Standards First](../architecture/architecture-decision-records/ADR-0001-standards-first-buy-borrow-build.md)
- [ADR-0012: Post Secondary Digital Commons](../architecture/architecture-decision-records/ADR-0012-post-secondary-digital-commons.md)
- [ADR-0017: OpenTofu Default](../architecture/architecture-decision-records/ADR-0017-opentofu-default.md)

