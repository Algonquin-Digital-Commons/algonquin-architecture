# Source Decision Import — Commons Expansion


> Standard: PSDC-DOC-001
> Document type: architecture-map
> Status: Complete
> Owner: PSDC Architecture Maintainers
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

This map explains the relationships represented by **Source Decision Import — Commons Expansion**. It is a navigation and traceability authority for the named repositories, contracts, decisions, or cross-pollination paths; it does not silently replace an implementation specification.

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
