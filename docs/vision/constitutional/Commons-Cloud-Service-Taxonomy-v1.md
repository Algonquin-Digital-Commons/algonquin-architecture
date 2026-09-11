# Commons Cloud Service Taxonomy v1


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: Commons Cloud architecture
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-10
> Governing decisions: Applicable ADRs and repository governance
> Domain: vision

## Purpose

Define which capabilities belong in Commons Cloud and how they differ from product
services owned by Commons Compute Fabric, Commons AI Fabric, Commons Media and Spatial Fabric, and Commons Social Fabric.

## Scope

- In scope: shared edge, identity, projects/tenants, policy, service catalog,
  metering, provisioning, compute, storage, network, data, events, observability,
  secrets, developer services, and hybrid-cloud brokerage.
- Out of scope: academic behavior, AI prompts and agents, media semantics, social
  feeds, federation moderation, and Commons Compute Fabric worker internals.
- Constraint: Commons Cloud exposes standard service contracts and may adopt mature
  platforms rather than becoming a custom cloud implementation.

## Taxonomy

| Domain | Services | Boundary posture |
|---|---|---|
| Access edge | ingress, API gateway, load balancing, DNS, egress | Standard network and TLS mechanisms |
| Identity | Keycloak broker, OIDC/OAuth, workload identity, service accounts | College-approved upstream is authoritative; broker normalizes claims |
| Organization | organizations, projects, tenants, membership, quotas | Institution policy over portable resource models |
| Catalog | service discovery, ownership, versions, health, documentation | Standard APIs and metadata |
| Provisioning | declarative requests, workflows, reconciliation, lifecycle | Adapters to adopted platforms |
| Compute | VMs, containers, batch, managed Kubernetes, accelerators, serverless | Established hypervisor/OCI/Kubernetes interfaces |
| Storage | object, block, file, snapshots, backup, archive | S3-compatible and adopted storage systems |
| Network | virtual networks, IPAM, routing, firewall, VPN, private connectivity | Standard network primitives |
| Data | managed relational, cache, vector, search, lake, catalog | Established engines behind managed contracts |
| Integration | events, queues, pub/sub, webhooks, durable workflows | CloudEvents/AsyncAPI and mature brokers |
| Security | secrets, KMS, PKI, artifact signing, policy integration | Approved standard systems; no custom cryptography |
| Observability | metrics, logs, traces, dashboards, alerting | OpenTelemetry-compatible signals |
| Developer | OpenAPI, SDKs, OCI registry, CI/CD, GitOps, templates | Portable developer interfaces |
| Hybrid/federation brokerage | local, Commons Compute Fabric, approved post-secondary peers, and external-provider adapters | Explicit workload envelope and institution-first locality ladder |

## Placement rule

A capability belongs in Commons Cloud only when at least two ecosystems need the same
non-domain-specific behavior and centralized operation materially improves
security, reliability, governance, or efficiency. Shared code alone is not enough;
product-specific semantics remain with the owning ecosystem.

## Settled architecture constraints

- The platform creates distinctive value in orchestration, integration, policy, user experience, academic intelligence, student services, and campus-resource coordination while keeping its technology open-source.
- Mature standards and upstream implementations are adopted or extended before a new infrastructure primitive is proposed.
- Any exception follows the adopt → extend → compatible fork → build hierarchy and requires an ADR with evidence.

## Decision traceability

- ADR-0001: Standards-First / Buy-Borrow-Build
- ADR-0005: Standard Platform Primitives
- ADR-0012: Tenant-Neutral Post-Secondary Digital Commons
- ADR-0013: Institution-First Federation Locality
- ADR-0016: Accepted Project Defaults
- ADR-0017: OpenTofu Default Infrastructure-as-Code Toolchain

## Decision status

- Decision: Inherits the accepted ADRs and consolidated technology defaults.
- Implementation evidence gate: define concrete service contracts, owners, SLOs, state, recovery,
  topology and release gates before implementation.

## References

- [Technology Defaults and Alternatives](../13-Technology-Defaults-and-Alternatives.md)
- [Ecosystem Dependency Contract](../../architecture/Ecosystem-Dependency-Contract.md)

## Purpose and outcome

This specification defines the purpose and intended outcome of **Commons-Cloud-Service-Taxonomy-v1** for the Algonquin deployment and its Commons compatibility boundary.

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
