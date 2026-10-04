# Architecture Authority and Precedence

> Standard: PSDC-DOC-001
> Document type: architecture-map
> Status: Normative
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: ADR-0001, ADR-0012, ADR-0016, ADR-0020, ADR-0023, ADR-0030, ADR-0031

## Purpose and outcome

This document answers one question for every PSDC implementer: when two artifacts appear to
say different things, which artifact controls and how is the conflict resolved? It stabilizes
authority without turning summaries, roadmaps, institution overlays, or imported conversation
records into hidden requirements.

## Scope and exclusions

The map governs common PSDC architecture, contracts, technology defaults, institution
deployment profiles, runbooks, roadmaps, and historical material. It does not manufacture
legal authority, replace a signed institution policy, select site-specific network addresses,
or make untested implementation claims.

## Domain-aware order of authority

The following order applies within the subject each artifact is authorized to govern:

1. Applicable law, regulation, and formally delegated institution authority.
2. Accepted PSDC ADRs, with an explicit superseding ADR controlling the decision it replaces.
3. PSDC constitutional, governance, security, privacy, and documentation standards.
4. Versioned machine-readable contracts and conformance fixtures for wire format, field,
   validation, and compatibility behavior.
5. Normative common architecture and subsystem specifications.
6. The accepted common technology-default matrix for implementation selection.
7. Signed institution deployment profiles for local values and stricter local controls.
8. Operational procedures, test plans, and runbooks.
9. Navigation maps, indexes, status reports, and roadmaps.
10. Source imports, proposals, conversation exports, drafts, and historical records.

This is not a global “newest file wins” rule. An ADR controls a decision; a JSON Schema
controls the shape of the version it declares; an institution profile controls local values;
and a runbook controls an approved operational procedure. A higher category outside its
declared scope cannot silently seize another owner's domain.

## Stable authority rules

- **AUTH-001:** Every normative document MUST name its owner, status, review date, governing
  decisions, scope, exclusions, interfaces, and acceptance evidence.
- **AUTH-002:** A summary, README, roadmap, diagram, or traceability map MUST link to the owning
  authority and MUST NOT introduce an unowned requirement.
- **AUTH-003:** Contract prose and examples MUST conform to the released schema. If they differ,
  the schema controls the encoded version and the owning team must repair the prose or issue a
  versioned migration.
- **AUTH-004:** An institution overlay MAY select approved options, set site values, and impose
  stricter safeguards; it MUST NOT weaken common federation, portability, privacy, security,
  audit, or conformance requirements while claiming PSDC compatibility.
- **AUTH-005:** A technology table records the accepted implementation default but cannot
  override an ADR, protocol contract, or license compatibility decision.
- **AUTH-006:** Historical and superseded artifacts remain available for provenance and MUST be
  clearly marked so they cannot be mistaken for current guidance.
- **AUTH-007:** Cross-repository behavior changes require an owning contract version, migration
  window, compatibility test, and linked ADR when the decision is consequential.

## Dependency, relationship, and interface semantics

Authority flows from owning decisions into contracts and implementations; data does not flow
merely because two documents are related. A dependency means the consumer cannot satisfy its
declared behavior without the named versioned contract or authority. A reference means
navigation or rationale only. An interface means an independently testable exchange with an
owner, producer, consumer, version, failure behavior, and compatibility rule.

## P0 authority map

| Subject | Primary authority | Supporting authority | Local input allowed |
|---|---|---|---|
| documentation quality | [Documentation Architecture Standard](../Documentation-Architecture-Standard.md) | quality rubric and tests | reviewers and repository-specific examples |
| complete system boundaries | consolidated reference architecture and accepted ADRs | dependency/cross-pollination maps | enabled products and capacity |
| compute admission and placement | [Compute Fabric Architecture](../campus-compute-fabric/Campus-Compute-Fabric-Architecture.md) | classification, scheduler, ADR-0026 | approved providers, quotas, objectives |
| storage placement and custody | [Storage Architecture](../storage/Storage-Architecture.md) | tier policy, ADR-0027 | residency zones, retention, providers |
| metering and settlement | [ADR-0031](architecture-decision-records/ADR-0031-off-chain-operations-and-on-chain-settlement.md) | [ledger architecture](../economics/Ledger-and-Operational-Database-Architecture.md), ADR-0029 | validators, risk limits, settlement cadence |
| portable identity | identity architecture and ADR-0028 | credential and account-link contracts | institutional IdP and issuer delegation |
| networking | [Network Architecture](../network/Network-Architecture.md) | site network profile and backend adapters | address plan, VLAN/VRF, DNS, QoS |
| key management | [KMS](../security/KMS.md) | key profiles, ceremony, recovery evidence | approved device/HSM and site custodians |
| licensing and contributions | [ADR-0030](architecture-decision-records/ADR-0030-network-copyleft-and-commercial-contribution.md) | license and participation policies | repository migration evidence |
| production admission | [Production Boundary](../deployment/Production.md) | service profiles, threat models, release evidence | risk acceptance by delegated authority |
| technology defaults | Full Technology Stack and Open-Source Alternatives | individual ADRs and component provenance | approved equivalent behind a contract |

## Conflict-resolution procedure

1. Identify the exact subject, affected contract version, owner, institution, and release.
2. Freeze the affected promotion or contract change; do not halt unrelated running services.
3. Classify each artifact by the authority order and declared scope above.
4. Check ADR status, schema version, effective date, institution signature, and supersession
   links. Do not infer authority from filename or modification time.
5. Record a conflict finding with both citations, impact, provisional safe behavior, owner,
   decision deadline, and downstream consumers.
6. Resolve the conflict in the owning artifact. A consequential change uses a superseding ADR;
   a wire change uses a new contract version and migration plan.
7. Update summaries, maps, defaults, runbooks, conformance fixtures, and institution overlays.
8. Run structural, quality, semantic, schema, and affected implementation tests, then preserve
   the resolution record in release evidence.

Authorization and data-protection ambiguity fail closed. Operational ambiguity uses the last
accepted compatible behavior when that behavior is safe; otherwise promotion pauses.

## Common and institution boundary

Common PSDC owns institution-neutral protocols, schemas, conformance tests, shared
architecture, reference implementations, and federation rules. Each institution owns its
deployment, branding, identity/LMS adapters, legal approvals, addresses, keys, data, moderation,
and operating risk. Algonquin is an institution deployment and thin-fork family; it is not the
authority for common PSDC behavior.

## Change evidence and acceptance

- **AUTH-ACC-001:** a reviewer can resolve five seeded conflicts using this procedure and reach
  the owning artifacts without relying on conversation history;
- **AUTH-ACC-002:** every P0 subject maps to exactly one primary authority or an explicitly open
  decision with an owner and due gate;
- **AUTH-ACC-003:** no active summary or institution overlay weakens or contradicts its primary
  common authority;
- **AUTH-ACC-004:** a superseded ADR, old schema, and historical import are excluded from current
  implementation guidance by automated or reviewed navigation;
- **AUTH-ACC-005:** a common contract change produces a version, migration window, consumer list,
  conformance result, and rollback evidence.

## References

- [Decision Traceability Matrix](Decision-Traceability-Matrix.md)
- [P0 Architecture Baseline and Remediation Register](P0-Architecture-Baseline-and-Remediation-Register.md)
- [Executable Contract Portfolio](Executable-Contract-Portfolio.md)
- [Implementation Handoff Standard](../standards/Implementation-Handoff-Standard.md)
