# AC Cloud Service Taxonomy v1

> Status: Accepted baseline; service specifications incomplete  
> Domain: vision  
> Owner: AC Cloud architecture  
> Last reviewed: 2026-09-10

## Purpose

Define which capabilities belong in AC Cloud and how they differ from product
services owned by ACF, AC AI, AC Media Fabric, and AC Fediverse.

## Scope

- In scope: shared edge, identity, projects/tenants, policy, service catalog,
  metering, provisioning, compute, storage, network, data, events, observability,
  secrets, developer services, and hybrid-cloud brokerage.
- Out of scope: academic behavior, AI prompts and agents, media semantics, social
  feeds, federation moderation, and ACF worker internals.
- Constraint: AC Cloud exposes standard service contracts and may adopt mature
  platforms rather than becoming a custom cloud implementation.

## Taxonomy

| Domain | Services | Boundary posture |
|---|---|---|
| Access edge | ingress, API gateway, load balancing, DNS, egress | Standard network and TLS mechanisms |
| Identity | Keycloak broker, OIDC/OAuth, workload identity, service accounts | College-approved upstream is authoritative; broker normalizes claims |
| Organization | organizations, projects, tenants, membership, quotas | Algonquin policy over portable resource models |
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
| Hybrid/federation brokerage | local, ACF, approved post-secondary peers, and external-provider adapters | Explicit workload envelope and institution-first locality ladder |

## Placement rule

A capability belongs in AC Cloud only when at least two ecosystems need the same
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
- ADR-0012: Tenant-Neutral Federated Post-Secondary Digital Commons
- ADR-0013: Institution-First Federation Locality
- ADR-0016: Accepted Project Defaults
- ADR-0017: OpenTofu Default Infrastructure-as-Code Toolchain

## Decisions and open questions

- Accepted baseline: Inherits the accepted ADRs and consolidated technology defaults.
- Remaining work: Define concrete service contracts, owners, SLOs, state, recovery,
  topology and release gates before implementation.

## References

- [Technology Defaults and Alternatives](../13-Technology-Defaults-and-Alternatives.md)
- [Ecosystem Dependency Contract](../../architecture/Ecosystem-Dependency-Contract.md)
