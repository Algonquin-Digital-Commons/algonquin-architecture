# Cross-System Contracts


> Standard: PSDC-DOC-001
> Document type: architecture-map
> Status: Normative
> Owner: Algonquin Institution Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

The umbrella repository owns the stable shapes exchanged between ecosystems.
Product repositories may add internal APIs, but cross-system integrations must
use versioned contracts here.

| Contract area | Producer/owner | Main consumers |
|---|---|---|
| Identity and roles | Commons Cloud | Every ecosystem |
| Event envelope | Commons Cloud | Every ecosystem |
| AI model/inference reference | Commons AI Fabric | Commons Cloud, Commons Compute Fabric, Media Fabric |
| Compute capacity/job reference | Commons Compute Fabric | Commons Cloud, AI, Media Fabric |
| Media asset/rendition metadata | Commons Media and Spatial Fabric | Fediverse, AI, Commons Cloud |
| ActivityPub objects and federation | Commons Social Fabric | Media Fabric and approved platform clients |
| Spatial/temporal-spatial metadata | Shared platform | Every ecosystem |
| Academic provider-neutral resources | Academic contract owners | AI, agents, clients, institution adapters |
| Commons peer trust/capabilities | Federation governance and contract owners | Compute, AI, Media, Research, Cloud |
| Workload envelope and resource ledger | Commons Compute Fabric/Cloud plus federation governance | Schedulers, providers, finance/audit |

## Federation boundary

Commons Social Fabric is the only subsystem that owns ActivityPub inbox, outbox, actor,
and federation behavior. Other systems publish or consume through adapters and
must not silently become independent federated servers.
This exclusivity applies to ActivityPub social federation, not to approved
compute, artifact, research, or service federation through their own contracts.

## Spatial boundary

Spatial support is cross-cutting metadata and capability negotiation. It can
describe locations, scenes, geometry, camera poses, coordinate reference
systems, and temporal-spatial media. Storage, rendering, and indexing remain
owned by the subsystem that needs them; the shared contract prevents incompatible
representations.

## Purpose and mapped scope

This map records the context, scope, and relationships represented by **02-contracts**. It is a cross-repository navigation and ownership record, not a replacement for an owning contract.

## Scope and exclusions

The map covers only the named systems, documents, capabilities, and edges. It excludes secrets, private implementation details, undocumented vendor commitments, and requirements owned by a different specification.

## Ownership boundaries

The owning repository remains authoritative for each capability and contract. This map may summarize and link but MUST NOT redefine an institution policy, product boundary, or signed deployment value.

## Dependency and relationship semantics

A relationship means a declared contract, event, protocol, deployment dependency, or navigation edge; it does not imply shared databases or filesystem access. Producers and consumers MUST use the referenced versioned interface.

## Source of truth and references

Authoritative sources are the owning contracts, accepted ADRs, and deployment profiles linked by this map. References MUST identify the source document and version where applicable.

## Validation and staleness

Maintainers MUST validate links, versions, ownership, and contradictions whenever a boundary or contract changes. A stale edge is corrected, superseded, or marked historical with an owner and expiry before dependent release.
