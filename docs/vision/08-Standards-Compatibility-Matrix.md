# 08 Standards Compatibility Matrix


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: Platform architecture and quality engineering
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-10
> Governing decisions: Applicable ADRs and repository governance
> Domain: vision

## Purpose

Define the platform's expected compatibility surfaces and the evidence needed to
claim conformance.

## Scope

- In scope: selected external interfaces, formats, protocols, telemetry, identity,
  infrastructure, LMS, and federation boundaries.
- Out of scope: claiming certification before a conformance suite or independent
  test evidence exists.
- Constraint: versions and intentional deviations must be documented per service.

## Compatibility commitments

| Boundary | Target compatibility | Required evidence |
|---|---|---|
| Institutional authentication | OIDC/OAuth profile approved for Entra | Login, logout, refresh, expiry, revocation, MFA, device-flow, and negative tests |
| AI inference clients | Documented OpenAI-compatible subset | Golden requests/responses against OpenWebUI, OpenCode, SDKs, and selected third-party clients |
| Native Commons APIs | Versioned REST/OpenAPI | Schema validation, backward-compatibility checks, and generated-client tests |
| Internal RPC | gRPC/Protobuf where selected | Wire compatibility and version-skew tests |
| Events | CloudEvents envelope; AsyncAPI where selected | Schema registry validation, replay, duplicate, ordering, and version-evolution tests |
| Containers and artifacts | OCI | Build, pull, signature, SBOM, scan, and runtime interoperability tests |
| Object storage | S3-compatible subset | CRUD, multipart, range, integrity, auth, lifecycle, and failure tests |
| Observability | OpenTelemetry | Trace-context propagation and semantic-convention validation |
| Brightspace | Supported D2L OAuth/API/LTI contracts | Sandbox contract tests and vendor-change regression suite |
| Fediverse | ActivityPub/ActivityStreams profile | Controlled peer interop, signatures, discovery, inbox/outbox, retry, moderation, and abuse tests |
| Spatial media | Selected open formats/profiles | Multi-viewer fixtures, capability negotiation, fallback, provenance, and privacy tests |
| Commons Compute Fabric runtimes | AC job/runtime adapter contract | Capability negotiation, cancellation, preemption, failure, accounting, and replacement-adapter tests |
| Infrastructure as code | OpenTofu module/provider/state profile | Format, validate, plan, provider-lock, policy, drift, import, and state-recovery tests |
| Commons federation | Trust, capability, workload-envelope, artifact, and ledger contracts | Two-institution discovery, authorization, execution, revocation, reconciliation, and exit tests |

## Compatibility status vocabulary

- Planned: architecture intent only.
- Partial: named subset implemented; gaps documented.
- Compatible: conformance suite passes for supported versions.
- Certified: externally or institutionally reviewed evidence exists.
- Deprecated: supported only through a published migration window.

No document may use “compatible” without naming the profile, versions, tested
behaviors, known deviations, and evidence location.

## Settled architecture constraints

- The platform creates distinctive value in orchestration, integration, policy, user experience, academic intelligence, student services, and campus-resource coordination while keeping its technology open-source.
- Mature standards and upstream implementations are adopted or extended before a new infrastructure primitive is proposed.
- Any exception follows the adopt → extend → compatible fork → build hierarchy and requires an ADR with evidence.

## Decision traceability

- ADR-0001: Standards-First / Buy-Borrow-Build
- ADR-0005: Standard Platform Primitives
- ADR-0012: Tenant-Neutral Post-Secondary Digital Commons
- ADR-0013: Institution-First Federation Locality
- ADR-0014: Fediverse Social Fabric
- ADR-0016: Accepted Project Defaults
- ADR-0017: OpenTofu Default Infrastructure-as-Code Toolchain

## Decision status

- Accepted targets: The named profiles are approved targets, not claims that
  conformance has already been achieved.
- Implementation evidence gate: pin versions, build suites, document deviations, and publish
  evidence before using `Compatible` or `Certified` status.

## References

- [Ecosystem Implementation Readiness](../roadmap/Ecosystem-Implementation-Readiness-2026-09-11.md)
- [Full Technology Stack and Open-Source Alternatives](14-Full-Technology-Stack-and-Open-Source-Alternatives.md)

## Purpose and outcome

This specification defines the purpose and intended outcome of **08-Standards-Compatibility-Matrix** for the Algonquin deployment and its Commons compatibility boundary.

## Out of scope

Out of scope are secrets, unowned implementation internals, unrelated product capabilities, and any integration not named by a versioned contract. Such work requires its owning specification.

## Architecture and ownership

The architecture assigns responsibilities, trust boundaries, and ownership to the components named here. Algonquin owns institutional configuration and operations; Commons owners retain portable contracts unless this document explicitly records a local exception.

## Interfaces and contracts

Interfaces, APIs, events, schemas, and boundary conditions MUST be versioned, validated, and documented for producers and consumers. Private database schemas MUST NOT cross repository boundaries.

## Dependencies and ownership

Dependencies include runtime services, identity, policy, storage, network, upstream source, and operator capabilities named by this specification. Each dependency requires an owner, compatibility expectation, and failure behavior.

## Security, privacy, and safety

Security, privacy, safety, and policy controls MUST enforce least privilege, data classification, tenant separation, provenance, and auditable decisions. Sensitive defaults fail closed.

## Deployment and implementation

Deployment and implementation MUST separate portable source from institution configuration and secrets. The release path requires reproducible artifacts, health checks, observability, and a tested rollback.

## Capacity and scaling

Capacity planning MUST identify workload, latency, throughput, storage, concurrency, and scaling limits. Evidence covers expected peak, recovery margin, and degradation when a dependency saturates.

## Failure and recovery

Failures produce bounded, typed behavior with no secret or protected-content leakage. Operators MUST have detection, quarantine or degradation, recovery, and rollback procedures.

## Testing and evidence

Testing and evidence include contract, integration, authorization, privacy/security, accessibility where applicable, failure, migration, and rollback checks. Evidence is linked to the release or decision record.

## Acceptance criteria

Acceptance requires the stated interfaces, controls, tests, operational ownership, and evidence to be complete. A document is not complete merely because a stub or implementation exists.
