# Fediverse Platform Architecture


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: Commons Social Fabric architecture and trust/safety
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-10
> Governing decisions: Applicable ADRs and repository governance
> Domain: vision

## Purpose

Define the shared social-product and public-federation architecture for AC Social,
Photos, Video, Communities, Blogs, events, live media, and spatial attachments.

## Scope

- In scope: local actors, social products, ActivityPub/ActivityStreams,
  WebFinger/NodeInfo, inbox/outbox, delivery, discovery, media integration,
  moderation, abuse prevention, identity separation, and interoperability tests.
- Out of scope: independent federation implementations in each product or silent
  linking of public social identity to institutional records.
- Constraint: public federation follows security, privacy, moderation, support,
  media-proxy, and incident-readiness approval.

## Architecture

```text
social | photos | video | communities | blogs | events | live
                               |
       actors | search | notifications | moderation | media references
                               |
                 governed ActivityPub gateway
      discovery | signatures | inbox/outbox | delivery | peer policy
                               |
                      federated network
```

## Product and upstream posture

Mastodon, Pixelfed, PeerTube, Lemmy, WriteFreely, Owncast, and other mature
projects are evaluated as upstream products or interoperability peers. Use
configuration, extensions, shared services, and upstream contribution before
maintaining forks. No product creates a private variant of ActivityPub.

## Identity separation

Institutional SSO may authorize local access, but institutional and public social
identity are separate records and namespaces. Account linking is explicit,
revocable, least privilege, auditable, and does not disclose institutional roles
or activity by default.

## Shared media and spatial support

Commons Media and Spatial Fabric owns source assets, renditions, provenance, rights, and spatial
representations. Commons Social Fabric owns social publication, visibility, moderation, and
federated representation. Public objects use safe renditions and privacy-reduced
spatial metadata with capability-negotiated fallbacks.

## Federation controls

- actor/key verification and rotation;
- SSRF-resistant discovery and media retrieval;
- durable idempotent inbox/outbox processing;
- bounded retries, backpressure, and per-peer health;
- domain, actor, object, and content federation policy;
- reports, moderation, appeals, audit, and emergency blocking;
- rate limits, abuse detection, and privacy-preserving telemetry;
- interoperability suites for supported ActivityStreams profiles and extensions.

## Settled architecture constraints

- The platform creates distinctive value in orchestration, integration, policy, user experience, academic intelligence, student services, and campus-resource coordination while keeping its technology open-source.
- Mature standards and upstream implementations are adopted or extended before a new infrastructure primitive is proposed.
- Any exception follows the adopt → extend → compatible fork → build hierarchy and requires an ADR with evidence.

## Decision traceability

- ADR-0001: Standards-First / Buy-Borrow-Build
- ADR-0005: Standard Platform Primitives
- ADR-0008: Open-Source, Self-Hosted Core
- ADR-0012: Tenant-Neutral Post-Secondary Digital Commons
- ADR-0014: Fediverse Social Fabric
- ADR-0016: Accepted Project Defaults
- ADR-0017: OpenTofu Default Infrastructure-as-Code Toolchain

## Decision status

- Decision: ActivityPub/ActivityStreams is the durable public social
  boundary; Mastodon, Pixelfed, PeerTube, Lemmy, WriteFreely and Owncast are
  replaceable open-source implementations.
- Implementation evidence gate: select exact releases, domain/actor policy, moderation staffing,
  legal/privacy controls, conformance evidence, SLOs and incident procedures.

## References

- [Full Technology Stack and Open-Source Alternatives](../14-Full-Technology-Stack-and-Open-Source-Alternatives.md)
- [Ecosystem Dependency Contract](../../architecture/Ecosystem-Dependency-Contract.md)

## Interfaces and contracts

Cross-system interactions MUST use versioned APIs, schemas, events, or federation protocols owned by the referenced repository. Producers, consumers, compatibility windows, idempotency, authorization context, and machine-readable errors MUST be explicit; direct database or private queue access is prohibited.

## Dependencies and ownership

The owning fabric retains its data, policy, release, and failure boundary. Shared identity, secrets, storage, events, telemetry, and compute are consumed through Commons contracts. Mandatory dependencies MUST be self-hostable and open source; institution overlays MAY add stricter policy but MUST NOT fork a common contract silently.

## Security, privacy, and safety

Trust boundaries MUST use institution-controlled identity, deny-by-default authorization, least privilege, secret rotation, minimized telemetry, and explicit data classification/residency/retention/deletion. Protected content, credentials, and private infrastructure values MUST NOT appear in maps, logs, or committed configuration.

## Deployment and implementation

The common organization owns portable contracts, reference configuration, OpenTofu modules, conformance fixtures, and upstream-compatible improvements. Institution organizations own branding, signed site values, policy overlays, adapters, and operational approvals. Development uses synthetic data; production promotion is reviewed, observable, reversible, and provenance-recorded.

## Capacity and scaling

Implementations MUST declare workload assumptions, quotas, concurrency, queue limits, saturation thresholds, resource budgets, and service objectives. Scale-out MUST preserve authorization, ordering, idempotency, auditability, and locality; overload degrades optional work before protected or interactive work.

## Failure, recovery, and compatibility

Dependencies require timeouts, bounded retries, circuit breakers, health signals, and documented degraded modes. Authorization and security failures fail closed. Stateful deployments declare RPO/RTO and restore evidence; contract changes require migration, compatibility windows, rollback, and an ADR when behavior is incompatible.

## Testing and evidence

Evidence MUST include contract and schema validation, authorization/privacy/security tests, failure and recovery exercises, capacity measurements, accessibility where user-facing, SBOM/license review, signed provenance, and standalone institution conformance. The workspace structural and substantive documentation gates are required before release authorization.

## Purpose and outcome

This specification defines the purpose and intended outcome of **Fediverse-Platform-Architecture** for the institution-neutral Commons ecosystem and its deployment boundaries.

## Out of scope

Out of scope are secrets, unowned implementation internals, unrelated product capabilities, and any integration not named by a versioned contract. Such work requires its owning specification.

## Architecture and ownership

The architecture assigns responsibilities, trust boundaries, and ownership to the components named here. Shared owners retain portable contracts; institution maintainers own local configuration and operations.

## Failure and recovery

Failures produce bounded, typed behavior with no secret or protected-content leakage. Operators MUST have detection, quarantine or degradation, recovery, and rollback procedures.

## Acceptance criteria

Acceptance requires the stated interfaces, controls, tests, operational ownership, and evidence to be complete. A document is not complete merely because a stub or implementation exists.
