# Cross-System Contracts


> Standard: PSDC-DOC-001
> Document type: architecture-map
> Status: Normative
> Owner: PSDC Architecture Maintainers
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

This map explains the relationships represented by **Cross-System Contracts**. It is a navigation and traceability authority for the named repositories, contracts, decisions, or cross-pollination paths; it does not silently replace an implementation specification.

## Scope and exclusions

The map covers only the documents, repositories, capabilities, and relationships explicitly named here. It excludes secrets, private infrastructure values, undocumented vendor commitments, and requirements that belong in an owning specification.

## Ownership boundaries

The owning repository remains authoritative for each capability and contract. This map may summarize and link, but it MUST NOT redefine a product boundary, institution policy, or signed deployment value. Cross-repository changes require the owning ADR or contract update.

## Dependency and relationship semantics

A relationship means a declared contract, event, protocol, deployment dependency, or navigation link; it does not mean shared database or filesystem access. Producers and consumers MUST use the referenced versioned contract, and circular synchronous dependencies require an accepted ADR.

## Source of truth and references

The source of truth is the linked document in the owning repository plus its accepted ADRs, schemas, and deployment profiles. When a link crosses repositories it MUST use a canonical hosted URL or a workspace-relative path that the structural checker can resolve.

## Validation and staleness

The map is valid only while links resolve, referenced control blocks and versions remain current, and no newer accepted ADR contradicts the summary. Run Test-Documentation.ps1 and Test-DocumentQuality.ps1; stale or contradictory entries MUST be corrected, superseded, or marked historical with an owner and expiry.
