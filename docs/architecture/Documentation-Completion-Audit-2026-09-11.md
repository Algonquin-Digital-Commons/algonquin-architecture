# Documentation Completion Audit — 2026-09-11


> Standard: PSDC-DOC-001
> Document type: historical-record
> Status: Superseded
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Source date: 2026-09-11
> Superseded by: Documentation-Semantic-Audit-2026-09-11.md
> Retention reason: preserves the prior completion claim for auditability while
> corpus remediation corrects title-substitution clones and repeated filler.

> Scope: Workspace, common repositories, Algonquin forks, contracts, maps and GitHub topology

## Completion model

Documentation completion means that scope, interfaces, boundaries, dependencies,
data, security, operations, failure behaviour, open-source defaults, acceptance
criteria, change authority and implementation gates are defined. It does not mean
that code, measured capacity, institutional approvals or deployment evidence
already exist.

The [Specification Completeness Standard](Specification-Completeness-Standard.md)
is normative. Institution-specific DNS, credentials, physical capacity, identity
registrations, personnel, retention values and recovery objectives enter signed
deployment manifests at the implementation gate rather than appearing as invented
facts in common architecture.

## Resolved consistency findings

| Concern | Resolution |
|---|---|
| Platform name | Shared architecture is Post Secondary Digital Commons; Algonquin appears in common material only when explicitly discussing its reference deployment, fork topology or historical decision context |
| Repository model | Independent common repositories plus thin institution forks; no grand monorepo |
| Web ownership | `psdc-web` and `algonquin-web` own browser/PWA products; `psdc-ai/apps/web` is a migration pointer |
| Desktop naming | Repository is `psdc-desktop`; OpenWork is documented only as gated upstream provenance |
| Mobile naming | Repository is `psdc-mobile`; Happy is documented only as gated upstream provenance |
| Infrastructure as code | OpenTofu is the normative default; Terraform remains a compatibility alternative where licensing and provider constraints require review |
| Open-source boundary | Mandatory core software is self-hostable and open-source; external institutional systems terminate at replaceable adapters |
| Identity | Institution-approved identity is authoritative; OIDC/OAuth normalization prevents client and service coupling to a vendor |
| AI access | Clients use the Commons AI Gateway; portable OpenAI-compatible surface plus versioned native institutional APIs |
| Federation | ActivityPub governs public social federation; other fabrics federate only through explicit capability and trust contracts |
| Institution sovereignty | Each institution can deploy and operate independently and may tighten local policy without breaking common contracts |
| GitHub governance | Protected branches, deny-by-default membership, secret protections and organization-wide 2FA are active |
| Sole maintainer | Independent approval and CODEOWNERS enforcement deliberately activate after a second accountable maintainer is appointed |
| AI development assistant | Copilot is optional; local open tooling and self-hosted CI are the default architecture |
| Licensing | Apache-2.0 is the default for new common code; upstream file licenses and notices remain authoritative |

## Contract status

The common contract catalog now defines normative profiles for identity,
academic, events, ActivityPub, spatial, AI, agent sessions, deployment, compute
and media. Agent-session and deployment JSON Schemas are version 1. The common
OpenAPI 3.1 profile defines versioning, errors, pagination, idempotency, tracing,
authentication, authorization and compatibility rules.

## Specification status

Every generated domain document now carries a normative status, accountable
bootstrap owner, explicit requirements, interface and ownership boundaries, data
rules, security controls, deployment separation, capacity and failure behaviour,
observability, tests, open-source strategy, acceptance criteria and ADR change
control. Operational or site evidence is clearly labeled as an implementation or
release-gate artifact instead of an unresolved architecture choice.

## Validation requirements

The documentation set passes when repository inventory, JSON and YAML parsing,
relative Markdown links, Obsidian wiki links, prohibited naming, unresolved-marker
search, fork ancestry, clean Git state and GitHub protection settings are checked.
The self-hosted Woodpecker implementation SHALL repeat these checks on every
documentation pull request.

The workspace provides `scripts/Test-Documentation.ps1` as the repeatable local
Markdown, Obsidian-link, JSON and unresolved-marker gate. On 2026-09-11 it passed
against 1,268 Markdown files and 15 JSON files with zero findings; the separate
open-source YAML parse passed all four YAML files. Final clean-state and fork-
ancestry checks run after the common changes and institution synchronizations are
merged.

## Purpose and mapped scope

This map explains the relationships represented by **Documentation Completion Audit — 2026-09-11**. It is a navigation and traceability authority for the named repositories, contracts, decisions, or cross-pollination paths; it does not silently replace an implementation specification.

## Scope and exclusions

The map covers only the documents, repositories, capabilities, and relationships explicitly named here. It excludes secrets, private infrastructure values, undocumented vendor commitments, and requirements that belong in an owning specification.

## Ownership boundaries

The owning repository remains authoritative for each capability and contract. This map may summarize and link, but it MUST NOT redefine a product boundary, institution policy, or signed deployment value. Cross-repository changes require the owning ADR or contract update.

## Dependency and relationship semantics

A relationship means a declared contract, event, protocol, deployment dependency, or navigation link; it does not mean shared database or filesystem access. Producers and consumers MUST use the referenced versioned contract, and circular synchronous dependencies require an accepted ADR.

## Source of truth and references

The source of truth is the linked document in the owning repository plus its accepted ADRs, schemas, and deployment profiles. When a link crosses repositories it MUST use a canonical hosted URL or a workspace-relative path that the structural checker can resolve.

## Validation and staleness

Maintainers MUST validate links, versions, ownership, and contradictions whenever a boundary or contract changes. A stale edge is corrected, superseded, or marked historical with an owner and expiry before dependent release.
