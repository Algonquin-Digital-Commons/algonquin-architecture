# Spatial Platform


> Standard: PSDC-DOC-001
> Document type: architecture-map
> Status: Normative
> Owner: PSDC Architecture Maintainers
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

This map explains the relationships represented by **Spatial Platform**. It is a navigation and traceability authority for the named repositories, contracts, decisions, or cross-pollination paths; it does not silently replace an implementation specification.

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
