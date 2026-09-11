# ActivityPub Federation


> Standard: PSDC-DOC-001
> Document type: architecture-map
> Status: Normative
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

The Commons Social Fabric is the sole public ActivityPub security and interoperability edge.
Centralizing that boundary avoids five inconsistent implementations of HTTP
signatures, discovery, delivery, moderation, remote media, and abuse controls.
This document governs public social federation only. Compute, research, artifact,
and service federation use separate Commons trust and capability contracts and do
not expose ActivityPub endpoints.

## Internal publication flow

```text
Commons AI or Commons Media and Spatial Fabric
          |
          v
authenticated internal publication request
          |
          v
Commons Social Fabric policy + moderation + object mapping
          |
          v
local actor outbox
          |
          v
signed ActivityPub delivery
```

Commons Cloud Fabric provides identity, secrets, events, and observability. The
Commons Compute Fabric may process
background jobs. Neither exposes ActivityPub endpoints.

## Required controls before public federation

- HTTP signature and actor-key verification
- SSRF-resistant discovery and remote-media retrieval
- Durable inbox/outbox processing with idempotency and bounded retries
- Instance, actor, domain, and content federation policy
- Rate limits, abuse reporting, moderation, appeals, and audit trails
- Spatial precision reduction and private-location stripping
- Incident response, peer blocking, key rotation, and recovery procedures

The normative operating policy is [Federated Social Governance
Policy](../fediverse/Federated-Social-Governance-Policy.md).

## Purpose and mapped scope

This map explains the relationships represented by **ActivityPub Federation**. It is a navigation and traceability authority for the named repositories, contracts, decisions, or cross-pollination paths; it does not silently replace an implementation specification.

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
