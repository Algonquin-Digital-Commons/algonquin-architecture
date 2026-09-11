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

## Purpose and outcome

This specification defines the purpose and intended outcome of **Fediverse-Platform-Architecture** for the Algonquin deployment and its Commons compatibility boundary.

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
