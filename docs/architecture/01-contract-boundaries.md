# Contract Boundaries


> Standard: PSDC-DOC-001
> Document type: architecture-map
> Status: Normative
> Owner: PSDC Architecture Maintainers
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

This map explains the relationships represented by **Contract Boundaries**. It is a navigation and traceability authority for the named repositories, contracts, decisions, or cross-pollination paths; it does not silently replace an implementation specification.

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
