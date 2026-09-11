# Integration Principles


> Standard: PSDC-DOC-001
> Document type: architecture-map
> Status: Normative
> Owner: Algonquin Institution Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

1. Platform capability first, then a versioned API/contract, then clients.
2. Prefer asynchronous events for cross-system notifications and projections.
3. Keep each ecosystem independently deployable and testable.
4. Normalize institutional identity at the Commons Cloud boundary.
5. Treat spatial metadata as portable contract data, not a UI-only feature.
6. Treat ActivityPub as a protocol boundary owned by Commons Social Fabric.
7. Use explicit permissions, data classification, retention, and audit trails.
8. Keep model weights, media assets, datasets, and benchmark results outside Git.
9. Keep Commons core code and schemas institution-neutral; local authority and
   branding stay in deployment overlays.
10. Follow the institution-first locality ladder and never widen a workload's
    trust, geography, data, retention, egress, or cost envelope implicitly.
11. Use OpenTofu plus Ansible for reproducible infrastructure; keep state under
    institution control.

## Purpose and mapped scope

This map records the context, scope, and relationships represented by **01-integration-principles**. It is a cross-repository navigation and ownership record, not a replacement for an owning contract.

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
