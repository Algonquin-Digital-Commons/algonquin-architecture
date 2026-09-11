# System Context


> Standard: PSDC-DOC-001
> Document type: architecture-map
> Status: Normative
> Owner: Algonquin Institution Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

```text
          POST-SECONDARY DIGITAL COMMONS
 institution experience | neutral core | federation
                        |
           ALGONQUIN REFERENCE DEPLOYMENT
                        |
                     AC CLOUD
                        |
   ┌────────────────────┼──────────────────────┐
   │                    │                      │
  Commons Compute Fabric                  Commons AI Fabric              AC MEDIA FABRIC
   │                    │           ┌──────────┼─────────┐
   │                    │          Image Video 3D      4DGS
   └────────────────────┼──────────────────────┘
                        |
                   AC FEDIVERSE
                        |
       Social · Photos · Video · Communities · Blogs
                        |
                 ActivityPub Federation
```

## Ownership boundaries

Algonquin is the first deployment overlay, not a tenant embedded in core code.
Academic, Data, Developer, Communications, and Research are logical Commons
fabrics composed through these implementation systems until extraction is
justified.

- **Commons Cloud** owns shared identity, control-plane services, service discovery,
  policy distribution, storage primitives, events, and observability.
- **Commons AI Fabric** owns the AI gateway, model aliases, AI clients, inference policy,
  and AI-specific agents and APIs.
- **Commons Compute Fabric** owns machine inventory, worker lifecycle, scheduling, compute runtimes,
  and capacity reporting.
- **Commons Media and Spatial Fabric** owns media assets, generation/transcoding pipelines,
  metadata, delivery, rights, and spatial media workflows for image, video, 3D,
  and 4DGS.
- **Commons Social Fabric** owns social applications, actors, ActivityPub inbox/outbox,
  federation, moderation, and federated media presentation.

## Cross-cutting capabilities

All systems consume shared identity and event contracts. Spatial support is a
cross-system capability: resources may carry spatial references, scenes, camera
poses, geometry, or temporal-spatial metadata without forcing every subsystem to
implement the same storage or rendering engine. ActivityPub federation is
centralized in Commons Social Fabric and exposed to other systems through versioned
contracts. Non-social compute, research, artifact, and service federation use the
owning capability contracts, explicit peer trust, and institution-first locality
ladder rather than ActivityPub.

## Purpose and mapped scope

This map records the context, scope, and relationships represented by **00-system-context**. It is a cross-repository navigation and ownership record, not a replacement for an owning contract.

## Scope and exclusions

The map covers only the named systems, documents, capabilities, and edges. It excludes secrets, private implementation details, undocumented vendor commitments, and requirements owned by a different specification.

## Dependency and relationship semantics

A relationship means a declared contract, event, protocol, deployment dependency, or navigation edge; it does not imply shared databases or filesystem access. Producers and consumers MUST use the referenced versioned interface.

## Source of truth and references

Authoritative sources are the owning contracts, accepted ADRs, and deployment profiles linked by this map. References MUST identify the source document and version where applicable.

## Validation and staleness

Maintainers MUST validate links, versions, ownership, and contradictions whenever a boundary or contract changes. A stale edge is corrected, superseded, or marked historical with an owner and expiry before dependent release.
