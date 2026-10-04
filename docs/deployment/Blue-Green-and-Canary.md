# Blue Green and Canary


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Stub; not yet specified
> Owner: PSDC Deployment Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance
> Domain: deployment

## Purpose and outcome

This specification defines **Blue Green and Canary** as part of the Post Secondary Digital
Commons. Its required outcome is reproducible environment promotion from local development through staging and production. An implementation conforms
only when it satisfies this document, the linked ADRs, and the common
[Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for Blue Green and Canary.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- **DEPLOY-BGAC-001:** The Blue Green and Canary capability SHALL provide reproducible environment promotion from local development through staging and production.
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

- Required interoperability boundary: OpenTofu modules, Helm values, Kubernetes resources, GitOps reconciliation, release metadata, and environment manifests.
- HTTP interfaces SHALL use OpenAPI 3.1, explicit request and response schemas,
  documented error codes, pagination for collections, and bounded timeouts.
- Asynchronous interfaces SHALL use versioned schemas and CloudEvents envelopes;
  delivery semantics, ordering, replay, deduplication, and dead-letter behaviour
  SHALL be declared per event.
- Mutations SHALL be idempotent or accept an idempotency key. Long-running work
  SHALL expose status, cancellation, expiry, and result retrieval.
- Consumers SHALL depend on contracts rather than another service's database,
  internal queue, filesystem, or implementation-specific API.

## Dependencies and ownership boundaries

Inherits [baseline ownership controls](../architecture/Cross-Cutting-Architecture-Requirements.md#ownership-and-dependency-boundaries).

> **Stub - not yet specified.** The requirements below are generic domain-level placeholders shared with sibling documents; this subject's own interfaces, state, failure behaviour and acceptance evidence have not been written. Do not implement from this document. Replace this notice when subject-specific content is added.

## Data, state, residency, and retention

- Governed information includes desired configuration, encrypted secret references, release provenance, deployment evidence, drift, and rollback state.
- Every data class SHALL declare an authoritative owner, purpose, classification,
  residency, retention, export, correction, archival, and deletion rule in the
  institution manifest before production activation.
- Services SHALL minimize copied data, preserve provenance, encrypt protected
  state and backups, and prevent telemetry from becoming an undeclared secondary
  record system.
- Cache and derived data SHALL be rebuildable or explicitly protected by backup
  and recovery objectives. Deletion SHALL propagate to indexes, caches,
  derivatives, replicas, and backups according to the declared retention policy.

## Security, privacy, safety, and compliance

- Domain controls SHALL include separation of duties, signed artifacts, secret bootstrap controls, policy-as-code, protected environments, and auditable promotion.
- Authentication SHALL use the institution-approved identity issuer;
  authorization SHALL be deny-by-default, least-privilege, policy-driven, and
  enforced at every trust boundary.
- Secrets SHALL use institution-controlled secret storage, short-lived credentials
  where possible, documented rotation, and immediate revocation procedures.
- Threat modelling SHALL cover misuse, compromised identities, malicious inputs,
  dependency compromise, data exfiltration, denial of service, and unsafe
  automation. High-impact actions require explicit confirmation and audit.
- Logs, traces, diagnostics, and model context SHALL exclude protected content
  unless explicitly required, minimized, access-controlled, and retained by policy.

## Deployment, environments, and configuration

Inherits [baseline deployment controls](../architecture/Cross-Cutting-Architecture-Requirements.md#deployment-and-configuration).

## Capacity, scaling, cost, and sustainability

Inherits [baseline capacity controls](../architecture/Cross-Cutting-Architecture-Requirements.md#capacity-and-overload).

## Failure, recovery, and compatibility

- Required lifecycle behaviour includes immutable releases, progressive delivery, health gates, rollback, backup validation, drift correction, and controlled upgrades.
- Dependencies SHALL have timeouts, bounded retries with jitter, circuit breakers,
  health reporting, and documented degraded modes. Security and authorization
  failures SHALL fail closed.
- Stateful implementations SHALL meet manifest-declared RPO and RTO values and
  prove backup restoration before production. Stateless components SHALL be
  replaceable from source, configuration, and signed artifacts.
- Releases SHALL support rollback and a compatibility window covering the current
  major contract version and one prior major version unless an ADR documents a
  safer domain-specific migration.

## Observability, testing, and operational readiness

Inherits [baseline evidence controls](../architecture/Cross-Cutting-Architecture-Requirements.md#observability-and-evidence).

## Standards and implementation strategy

- Adopted boundary and strategy: OpenTofu, OCI, Kubernetes, Helm, GitOps, SOPS-compatible encryption, and supply-chain attestations.
- Implementations SHALL follow **adopt → extend → compatible fork → build**.
  Building a new primitive requires an ADR demonstrating that mature alternatives
  fail the requirements and that long-term maintenance is funded.
- Product selection is replaceable behind the contract. Product-specific APIs
  SHALL remain inside adapters and SHALL NOT leak into portable clients or domain
  contracts.

## Settled architecture constraints

- Deployments use OCI artifacts and established container, Kubernetes, infrastructure-as-code, and GitOps mechanisms where appropriate.
- Environment-specific choices remain configuration behind stable application contracts.
- Any exception follows the adopt → extend → compatible fork → build hierarchy and requires an ADR with evidence.

## Decision traceability

- ADR-0001: Standards-First / Buy-Borrow-Build
- ADR-0005: Standard Platform Primitives
- ADR-0012: Tenant-Neutral Post-Secondary Digital Commons
- ADR-0013: Institution-First Federation Locality
- ADR-0016: Accepted Project Defaults
- ADR-0017: OpenTofu Default Infrastructure-as-Code Toolchain

## Acceptance criteria

Inherits [baseline acceptance gates](../architecture/Cross-Cutting-Architecture-Requirements.md#observability-and-evidence); every local requirement MUST also pass.

## References

- [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md)
- [Technology Defaults and Alternatives](../vision/13-Technology-Defaults-and-Alternatives.md)
- [Human Choices and Decisions Register](../governance/Human-Choices-and-Decisions-Register.md)
- [ADR-0001: Standards First](../architecture/architecture-decision-records/ADR-0001-standards-first-buy-borrow-build.md)
- [ADR-0012: Post Secondary Digital Commons](../architecture/architecture-decision-records/ADR-0012-post-secondary-digital-commons.md)
- [ADR-0017: OpenTofu Default](../architecture/architecture-decision-records/ADR-0017-opentofu-default.md)

