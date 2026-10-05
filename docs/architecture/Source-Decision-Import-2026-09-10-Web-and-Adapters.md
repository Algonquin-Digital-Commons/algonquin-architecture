# Source Decision Import — Web Foundation and Provider Adapters


> Standard: PSDC-DOC-001
> Document type: architecture-map
> Status: Complete
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Date: 2026-09-10
> Source type: Two user-provided chat excerpts

## Decisions incorporated

| Source conclusion | Canonical record |
|---|---|
| Name the architecture component `apps/web`, not after an upstream | ADR-0009 |
| Prefer Open WebUI v0.6.5 BSD source as the initial UI scaffold | ADR-0009 |
| Preserve notices and verify the exact immutable source baseline | ADR-0009; web foundation |
| Do not copy or merge post-v0.6.5 code without license review | ADR-0009 |
| Evolve toward an Algonquin-native Study/Work/Code/Campus experience | Web foundation |
| Keep LibreChat as a fallback candidate rather than the selected default | ADR-0009 |
| Keep identity and academic integrations behind internal contracts | ADR-0010 |
| Production institutional identity remains College-authoritative | ADR-0010; ADR-0002 |
| Development and CI use local/test identity and academic implementations | ADR-0010 |
| Production academic features use College-approved LMS integrations | ADR-0010; ADR-0007 |

## Source details not adopted as architecture

- References to GitHub Actions are examples only; the accepted stack uses
  self-hosted Forgejo and Woodpecker CI, with Tekton as the Kubernetes-native
  alternative.
- References to proprietary cloud inference do not change the self-hosted core or
  the default-disabled external-provider policy.
- Interface sketches communicate intent but are not approved visual designs.
- Licensing statements are recorded as upstream claims and still require legal
  review of the exact imported source.

## Superseded wording

Earlier documents described current Open WebUI as compatibility-only and v0.6.5
as merely evaluable. ADR-0009 now selects v0.6.5 as the preferred gated bootstrap
while preserving current Open WebUI as compatibility-only.

## Purpose and mapped scope

This map explains the relationships represented by **Source Decision Import — Web Foundation and Provider Adapters**. It is a navigation and traceability authority for the named repositories, contracts, decisions, or cross-pollination paths; it does not silently replace an implementation specification.

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
