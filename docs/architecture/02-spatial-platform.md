# Spatial Platform


> Standard: PSDC-DOC-001
> Document type: architecture-map
> Status: Normative
> Owner: Algonquin Institution Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

Spatial support is a shared capability, not a single application. Every ecosystem
may attach spatial context using the same versioned contract while keeping its own
domain behavior and access controls.

## Domain uses

| Ecosystem | Spatial use |
|---|---|
| Commons Cloud | Place/scene identity lookup, access policy, indexing, and events |
| Commons Compute Fabric | Hardware locality, topology, scheduling zones, and data locality |
| Commons AI Fabric | Campus graph, place-aware assistance, spatial reasoning, and agents |
| Commons Media and Spatial Fabric | Captures, cameras, poses, scenes, 3D assets, and 4DGS |
| Commons Social Fabric | Place-aware communities, events, media, and federated objects |

## Privacy defaults

- Precise location is private unless an explicit policy and user action allow it.
- Public/federated objects use reduced precision or a public place identifier.
- Every spatial assertion records source, precision, time, confidence, and
  retention classification.
- Systems exchange identifiers and contract-shaped metadata, not unrestricted
  location histories.
- Federation peers receive only the precision, purpose, geography, and retention
  explicitly permitted by the workload or publication envelope.

## Purpose and mapped scope

This map records the context, scope, and relationships represented by **02-spatial-platform**. It is a cross-repository navigation and ownership record, not a replacement for an owning contract.

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
