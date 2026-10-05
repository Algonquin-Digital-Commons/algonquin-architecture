# Repository and Obsidian Linking Model


> Standard: PSDC-DOC-001
> Document type: architecture-map
> Status: Normative
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: ADR-0022, ADR-0023

## Source-of-truth model

The ecosystem is a collection of independent Git repositories, not a grand
monorepo. The `psdc-workspace` checkout root is a lightweight coordinator and Obsidian
vault containing repository metadata and maps only. Product and architecture
content remains canonical in its owning repository.

Neutral upstream checkouts live under `common/`; institution forks live under
`institutions/<institution>/`. The workspace manifest records organization role,
repository slug, fork counterpart, remote, local checkout directory,
default branch and optional contract compatibility version. Bootstrap tooling may
clone or update repositories, but the workspace repository must ignore their
checkout directories and must never commit nested product source.

## Ownership

- `psdc-architecture` owns constitutional architecture, cross-system contracts,
  dependency rules, governance, human decisions and conformance profiles.
- Each fabric repository owns its implementation architecture, code,
  infrastructure, security evidence, runbooks and releases.
- `psdc-web`, `psdc-desktop`, and `psdc-mobile` own their separate upstream
  provenance, downstream patches, product releases and store/package pipelines.
- Each institution deployment repository owns only local configuration, branding,
  policy overlays, environment composition and operational evidence.
- `psdc-workspace` owns navigation and developer checkout metadata, never runtime
  code or deployment secrets.

Every institution repository uses `origin` for its institution-owned GitHub fork
and `upstream` for the corresponding Commons repository. GitHub organization
separation is implemented as a repository-by-repository fork map because GitHub
does not fork an organization as one object.

## Cross-repository links

Canonical documents identify another source as
`<repository-slug>:<path>@<released-version>`. Web links use the configured forge
remote. Obsidian maps may additionally link to sibling local checkouts, but those
links are conveniences and cannot be the sole reference.

Shared contracts are consumed from signed releases or OCI/package registries,
not copied between repositories. A compatibility manifest states tested contract
and component versions for each institution release.

## Product-local workspaces

A repository may use pnpm, Cargo, Go, Python or another package workspace for
tightly coupled packages that share ownership and a release train. The Happy-style
pattern is appropriate inside `psdc-mobile`; it is not a reason to place
Cloud, AI, Compute, Media and Social into one Git history.

## Obsidian portability

The parent workspace directory can be opened as one Obsidian vault so users can
navigate all checked-out repositories. Markdown and Git remain canonical, no
Obsidian plugin is required, and repository READMEs remain usable when cloned
alone. The vault configuration contains no product source or secrets.

## Migration

The former `Algonquin` grand-monorepo is preserved read-only as migration source
until histories, licenses, links, contract releases and independent CI checks are
verified. New implementation work begins in the independent repositories.

## Purpose and mapped scope

This map explains the relationships represented by **Repository and Obsidian Linking Model**. It is a navigation and traceability authority for the named repositories, contracts, decisions, or cross-pollination paths; it does not silently replace an implementation specification.

## Scope and exclusions

The map covers only the documents, repositories, capabilities, and relationships explicitly named here. It excludes secrets, private infrastructure values, undocumented vendor commitments, and requirements that belong in an owning specification.

## Dependency and relationship semantics

A relationship means a declared contract, event, protocol, deployment dependency, or navigation link; it does not mean shared database or filesystem access. Producers and consumers MUST use the referenced versioned contract, and circular synchronous dependencies require an accepted ADR.

## Validation and staleness

The map is valid only while links resolve, referenced control blocks and versions remain current, and no newer accepted ADR contradicts the summary. Run Test-Documentation.ps1 and Test-DocumentQuality.ps1; stale or contradictory entries MUST be corrected, superseded, or marked historical with an owner and expiry.

## Ownership boundaries

The owning repository remains authoritative for each capability and contract. This map may summarize and link but MUST NOT redefine an institution policy, product boundary, or signed deployment value.

## Source of truth and references

Authoritative sources are the owning contracts, accepted ADRs, and deployment profiles linked by this map. References MUST identify the source document and version where applicable.
