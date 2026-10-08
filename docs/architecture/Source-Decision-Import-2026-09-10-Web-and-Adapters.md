# Source Decision Import — Web Foundation and Provider Adapters


> Standard: PSDC-DOC-001
> Document type: architecture-map
> Status: Complete
> Owner: Algonquin Institution Maintainers
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

This map records the context, scope, and relationships represented by **Source-Decision-Import-2026-09-10-Web-and-Adapters**. It is a cross-repository navigation and ownership record, not a replacement for an owning contract.

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
