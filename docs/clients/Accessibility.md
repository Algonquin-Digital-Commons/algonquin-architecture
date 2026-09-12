# Accessibility


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: PSDC Clients Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance
> Domain: clients

## Purpose and outcome

This specification defines **Accessibility** as part of the Post Secondary Digital
Commons. Its required outcome is accessible, institution-branded web, desktop, mobile, and command-line experiences over shared platform contracts. An implementation conforms
only when it satisfies this document, the linked ADRs, and the common
[Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for Accessibility.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- **CLIENT-ACCESSIBIL-001:** The Accessibility capability SHALL provide accessible, institution-branded web, desktop, mobile, and command-line experiences over shared platform contracts.
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

- Required interoperability boundary: OIDC with PKCE, gateway APIs, deep links, notification contracts, local tool permissions, and cross-device session handoff.
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

## Data, state, residency, and retention

- Governed information includes minimal local preferences, encrypted session state, user-selected files, accessibility settings, and revocable device registrations.
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

- Domain controls SHALL include secure credential storage, no persistent browser bearer tokens, explicit local-file and tool consent, sandboxing, and remote revocation.
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

- Required lifecycle behaviour includes signed releases, staged updates, rollback, offline-safe behaviour, compatibility checks, accessibility testing, and crash diagnostics.
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

- Adopted boundary and strategy: WCAG 2.2 AA, platform-native packaging, OIDC, OpenAPI, and installable web standards without mandatory proprietary stores.
- Implementations SHALL follow **adopt → extend → compatible fork → build**.
  Building a new primitive requires an ADR demonstrating that mature alternatives
  fail the requirements and that long-term maintenance is funded.
- Product selection is replaceable behind the contract. Product-specific APIs
  SHALL remain inside adapters and SHALL NOT leak into portable clients or domain
  contracts.

## Settled architecture constraints

- Clients consume shared platform APIs and do not implement provider, identity, policy, or storage integrations independently.
- Eligible OSI-licensed clients remain thin downstream forks or extension layers with compatibility tests and bounded patch budgets; ADR-0009 permits the frozen Open WebUI v0.6.5 BSD scaffold while current releases remain compatibility-only.
- Any exception follows the adopt → extend → compatible fork → build hierarchy and requires an ADR with evidence.

## Decision traceability

- ADR-0001: Standards-First / Buy-Borrow-Build
- ADR-0005: Standard Platform Primitives
- ADR-0012: Tenant-Neutral Post-Secondary Digital Commons
- ADR-0013: Institution-First Federation Locality
- ADR-0016: Accepted Project Defaults
- ADR-0017: OpenTofu Default Infrastructure-as-Code Toolchain
- ADR-0008: Open-Source, Self-Hosted Core
- ADR-0009: PSDC Web Foundation
- ADR-0010: Provider-Neutral Core with Institutional Production Authorities

## Acceptance criteria

Inherits [baseline acceptance gates](../architecture/Cross-Cutting-Architecture-Requirements.md#observability-and-evidence); every local requirement MUST also pass.

## References

- [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md)
- [Technology Defaults and Alternatives](../vision/13-Technology-Defaults-and-Alternatives.md)
- [Human Choices and Decisions Register](../governance/Human-Choices-and-Decisions-Register.md)
- [ADR-0001: Standards First](../architecture/architecture-decision-records/ADR-0001-standards-first-buy-borrow-build.md)
- [ADR-0012: Post Secondary Digital Commons](../architecture/architecture-decision-records/ADR-0012-post-secondary-digital-commons.md)
- [ADR-0017: OpenTofu Default](../architecture/architecture-decision-records/ADR-0017-opentofu-default.md)

