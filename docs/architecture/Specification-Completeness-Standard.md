# Specification Completeness Standard


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: PSDC Architecture Maintainer
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Effective: 2026-09-11

## Purpose

This standard defines when Post Secondary Digital Commons architecture and
scope documentation is complete enough to authorize implementation. It prevents
empty outlines from being treated as architecture while keeping measured
deployment evidence separate from design decisions.

## Completion rule

A specification is complete when it defines all of the following without an
unresolved architectural choice:

1. purpose, users, scope, and exclusions;
2. normative behaviour and quality requirements;
3. versioned interfaces and compatibility rules;
4. ownership and dependency boundaries;
5. data classification, residency, retention, and deletion rules;
6. authentication, authorization, privacy, safety, and threat controls;
7. deployment model, configuration ownership, and secret boundaries;
8. capacity model and resource controls;
9. failure behaviour, recovery, and rollback;
10. observability, testing, and implementation acceptance gates;
11. the selected open-source default and the migration boundary for alternatives;
12. the ADR or governance authority that controls changes.

The specification may require site values in an institution deployment manifest
without becoming incomplete. Examples include DNS names, node counts, storage
capacity, recovery objectives, retention periods, identity issuer identifiers,
and named on-call personnel. The specification must define the schema, allowed
ranges, decision owner, validation rule, and safe default for every such value.

## Normative language

The words **MUST**, **MUST NOT**, **REQUIRED**, **SHALL**, **SHALL NOT**,
**SHOULD**, **SHOULD NOT**, and **MAY** express requirement strength. A deviation
from MUST or SHALL requires a recorded ADR and compatibility assessment.

## Default cross-cutting requirements

Every capability specification inherits these requirements:

- Interfaces SHALL be versioned, documented, authenticated where non-public,
  bounded by timeouts, and testable without a proprietary service.
- Mutating operations SHALL be idempotent or carry an idempotency key and SHALL
  produce an auditable result.
- Services SHALL enforce least privilege, deny by default, validate inputs at
  trust boundaries, and keep secrets outside source and images.
- Data SHALL have an owner, classification, residency policy, retention rule,
  export path, and deletion path before production use.
- Deployments SHALL be reproducible with OpenTofu, Kubernetes manifests or Helm,
  and GitOps reconciliation; institution secrets and site values stay in the
  institution deployment repository.
- Components SHALL publish health, readiness, structured logs, metrics, traces,
  security events, and saturation indicators without leaking protected data.
- A release SHALL have automated tests, dependency and secret scans, an SBOM,
  a rollback procedure, backup and restore evidence where stateful, and a named
  operational owner.
- Protocols and data SHALL remain portable. A proprietary dependency MAY be an
  optional adapter but SHALL NOT become the only supported path.
- Accessibility, privacy, security, and federation policy tests are release
  gates, not post-release enhancements.

## Design-time defaults

Unless a more specific specification overrides them through an ADR:

| Concern | Normative default |
|---|---|
| Availability class | Three replicas across failure domains for production control-plane services; graceful degradation for optional features |
| API compatibility | Current major version plus one prior major version during a documented migration window |
| Transport | TLS 1.3 preferred; TLS 1.2 minimum only where interoperability requires it |
| Identity | OIDC for authentication, OAuth 2.1-style authorization, short-lived tokens, institutional issuer authority |
| Authorization | Central policy decision with local enforcement and deny-by-default rules |
| Events | CloudEvents envelope and AsyncAPI documentation where asynchronous integration is used |
| APIs | OpenAPI 3.1 for HTTP APIs; explicit schemas for every request, response, and error |
| Storage | PostgreSQL for relational state, Valkey for ephemeral coordination, S3-compatible object storage for objects |
| Infrastructure | OpenTofu, Kubernetes, Helm, and GitOps using open interfaces |
| Telemetry | OpenTelemetry-compatible traces, metrics, and logs |
| Recovery | Restore is tested before production; service-specific RPO and RTO are declared in the institution manifest |
| Supply chain | Locked dependencies, provenance, SBOM, signature verification, vulnerability and secret scans |

## Implementation authorization gate

Implementation may begin when the owning repository links its work item to the
applicable specification and ADRs. Production release additionally requires:

- completed threat model and privacy assessment;
- approved institution deployment manifest;
- passing automated acceptance and interoperability tests;
- capacity and failure testing against declared objectives;
- rollback and restore evidence;
- accessibility conformance for user-facing components;
- named service owner and incident escalation path;
- license, provenance, and upstream-maintenance review.

These are implementation deliverables, not unresolved architecture decisions.

## Change control

Specifications change through pull requests. Contract-breaking changes,
security-boundary changes, new mandatory dependencies, licensing changes, or
federation-policy changes require an ADR. Institution overlays MAY tighten local
policy but SHALL NOT weaken common security, portability, accessibility, or
protocol-compatibility requirements.

## Purpose and outcome

This specification defines the purpose and intended outcome of **Specification-Completeness-Standard** for the Algonquin deployment and its Commons compatibility boundary.

## Scope

The scope includes the capabilities, users, data, lifecycle, and interfaces described here. Institution overlays may configure approved values but MUST preserve the shared contract.

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
