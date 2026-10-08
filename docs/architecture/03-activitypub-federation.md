# ActivityPub Federation


> Standard: PSDC-DOC-001
> Document type: architecture-map
> Status: Normative
> Owner: Algonquin Institution Maintainers
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

This map records the context, scope, and relationships represented by **03-activitypub-federation**. It is a cross-repository navigation and ownership record, not a replacement for an owning contract.

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
