# Integration Principles


> Standard: PSDC-DOC-001
> Document type: architecture-map
> Status: Normative
> Owner: PSDC Architecture Maintainers
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

This map explains the relationships represented by **Integration Principles**. It is a navigation and traceability authority for the named repositories, contracts, decisions, or cross-pollination paths; it does not silently replace an implementation specification.

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
