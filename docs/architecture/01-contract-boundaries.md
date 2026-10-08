# Contract Boundaries


> Standard: PSDC-DOC-001
> Document type: architecture-map
> Status: Normative
> Owner: Algonquin Institution Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

## Shared identity

Every internal request carries one normalized subject identity plus service
identity. Human roles originate in the institutional identity system and are
mapped by Commons Cloud's identity broker. Services authorize scopes locally.
Another institution or federation peer never becomes a local identity authority.

## Shared events

Cross-system events use versioned envelopes with an event id, type, timestamp,
producer, subject, schema version, trace context, classification, and optional
spatial context. Consumers must tolerate additive fields and process events
idempotently.

## Spatial contract

Spatial data uses stable place/scene identifiers, coordinate-reference metadata,
precision, provenance, visibility, and retention classification. Public
federation never receives precise private location by default.

## ActivityPub contract

Commons Social Fabric owns HTTP signatures, actor discovery, inbox/outbox processing,
delivery, retries, remote-media handling, federation policy, and abuse controls.
Other ecosystems request publishing or attach approved objects through internal
APIs; they do not independently expose ActivityPub endpoints.

## Compute contract

Commons Compute Fabric accepts declarative jobs describing resource requirements, artifacts,
isolation, preemption, locality, data classification, and result destinations.
Callers do not select individual worker machines.

## Academic contract

The Academic Service exposes neutral course, enrolment, content, assessment, and
authorization shapes. An LMS is authoritative only through its institution's
approved production adapter; the common contract does not select a vendor.

## Commons federation contract

Non-social federation exchanges signed capability descriptions, workload
envelopes, bounded jobs, artifact references, conformance evidence, revocation,
and resource-ledger events. It does not expose raw directories, LMS databases,
private vector stores, secrets, infrastructure state, or precise location.

## Purpose and mapped scope

This map records the context, scope, and relationships represented by **01-contract-boundaries**. It is a cross-repository navigation and ownership record, not a replacement for an owning contract.

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
