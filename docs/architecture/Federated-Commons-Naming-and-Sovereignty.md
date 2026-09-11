# Federated Commons Naming and Sovereignty


> Standard: PSDC-DOC-001
> Document type: architecture-map
> Status: Accepted
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Governing decision: ADR-0020

## Canonical names

| Shared/Federated concept | Canonical name | Algonquin deployment name |
|---|---|---|
| Complete framework | Post-Secondary Digital Commons (PSDC) | Algonquin Digital Platform |
| Shared service foundation | Commons Cloud Fabric | AC Cloud |
| Compute orchestration | Commons Compute Fabric | ACF Campus Compute Fabric |
| AI and agent services | Commons AI Fabric | AC AI |
| Media and spatial services | Commons Media and Spatial Fabric | AC Media Fabric |
| Social products and ActivityPub edge | Commons Social Fabric | AC Fediverse |

Shared schemas, API names, package namespaces, deployment variables and user-facing
defaults must be institution-neutral. Algonquin names may appear in the Algonquin
overlay, deployment documentation, examples explicitly labelled as Algonquin, and
current repository paths retained for migration compatibility.

## Standalone requirement

Every institution deployment must be installable, operable, backed up, restored,
upgraded and exited without an Algonquin account, network connection, control
plane, signing key, DNS zone, identity provider, database, relay or administrator.

The deployment owns its:

- source/configuration fork and release cadence;
- identity, academic adapters and public domains;
- policies, data, keys, secrets, models and infrastructure state;
- client branding, signing and distribution;
- social moderation and federation relationships;
- compute admission and resource-sharing rules; and
- observability, backups, incidents, continuity and exit plan.

## Federation relationship

Peers exchange only capabilities and objects covered by a mutually enabled
protocol profile. Federation cannot grant administrative access or silently
widen data residency, retention, identity, academic, compute or moderation policy.
Removing every peer connection leaves all local capabilities operational.

## Club and institution roles

The local club is the open technical community and steward of its distribution.
It may develop integrations, operate approved non-production environments, train
contributors and propose federation peers. The institution authorizes production
systems and remains the accountable data, security and service authority.

## Conformance, not uniformity

Institutions may replace the default database, client, runtime, scheduler, social
server or deployment mechanism. A peer is compatible when its enabled protocol
versions, security profile, object semantics, failure behavior and revocation
mechanisms pass the shared conformance suite. Identical internal stacks are not
required.

## Purpose and mapped scope

This map explains the relationships represented by **Federated Commons Naming and Sovereignty**. It is a navigation and traceability authority for the named repositories, contracts, decisions, or cross-pollination paths; it does not silently replace an implementation specification.

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
