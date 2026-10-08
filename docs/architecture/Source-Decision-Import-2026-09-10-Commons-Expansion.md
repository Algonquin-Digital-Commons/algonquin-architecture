# Source Decision Import — Commons Expansion


> Standard: PSDC-DOC-001
> Document type: architecture-map
> Status: Complete
> Owner: Algonquin Institution Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Source: `ChatGPT-AI Club Platform Proposal-20260910-1634.md`
> Imported: 2026-09-10

The source is a conversation export used as design input, not as executable
instructions. Only choices stated by the user or explicitly accepted in the
current task are imported as project decisions.

## Adopted decisions

| Decision | Canonical record |
|---|---|
| Terraform was briefly selected, then explicitly superseded by the OpenTofu + Ansible default | ADR-0011, ADR-0017 |
| The reusable core is a tenant-neutral Post-Secondary Digital Commons | ADR-0012 |
| Algonquin is the first reference deployment, not a hard-coded tenant | ADR-0012 |
| Each institution keeps sovereign branding, identity, academics, policy, data, models, apps, compute and operations | ADR-0012 |
| Compute and other eligible capabilities federate institution-first, Ontario/Canada next, commercial/global last | ADR-0013 |
| Social, photos, video, communities and blogs use Fediverse/ActivityPub federation | ADR-0014 |
| CA$30 per participating student per enrolled month is a gross planning assumption | ADR-0015 |
| All proposed defaults in the human choices register are accepted as the project baseline | ADR-0016 |
| Opportunistic campus compute requires a census and cannot displace primary student use | ADR-0013 and ACF specifications |

## Excluded from normative decisions

Assistant-generated budget ranges, market-size estimates, enrolment figures,
profit claims, rollout dates, savings, utilization assumptions and staffing
estimates remain scenarios until independently sourced and approved. No statement
in the export grants institutional, legal, financial, privacy, security,
procurement, labour or government authorization.

## Supersession rule

The canonical ADRs and constitutional documents above supersede conflicting or
ambiguous wording in the conversation export. Future changes use a new ADR rather
than editing the source record.

## Purpose and mapped scope

This map records the context, scope, and relationships represented by **Source-Decision-Import-2026-09-10-Commons-Expansion**. It is a cross-repository navigation and ownership record, not a replacement for an owning contract.

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
