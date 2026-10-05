# System Context


> Standard: PSDC-DOC-001
> Document type: architecture-map
> Status: Normative
> Owner: PSDC Architecture Maintainers
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

This map explains the relationships represented by **System Context**. It is a navigation and traceability authority for the named repositories, contracts, decisions, or cross-pollination paths; it does not silently replace an implementation specification.

## Scope and exclusions

The map covers only the documents, repositories, capabilities, and relationships explicitly named here. It excludes secrets, private infrastructure values, undocumented vendor commitments, and requirements that belong in an owning specification.

## Dependency and relationship semantics

A relationship means a declared contract, event, protocol, deployment dependency, or navigation link; it does not mean shared database or filesystem access. Producers and consumers MUST use the referenced versioned contract, and circular synchronous dependencies require an accepted ADR.

## Source of truth and references

The source of truth is the linked document in the owning repository plus its accepted ADRs, schemas, and deployment profiles. When a link crosses repositories it MUST use a canonical hosted URL or a workspace-relative path that the structural checker can resolve.

## Validation and staleness

The map is valid only while links resolve, referenced control blocks and versions remain current, and no newer accepted ADR contradicts the summary. Run Test-Documentation.ps1 and Test-DocumentQuality.ps1; stale or contradictory entries MUST be corrected, superseded, or marked historical with an owner and expiry.
