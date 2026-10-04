# Implementation Handoff Standard

> Standard: PSDC-DOC-001
> Document type: governance-standard
> Status: Normative
> Owner: PSDC Architecture Maintainers and Engineering Leads
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: ADR-0001, ADR-0016, ADR-0022, ADR-0023, ADR-0030

## Purpose

This standard turns an accepted architecture requirement into a bounded unit that an engineer
or coding agent can implement without inventing authority, interfaces, security behavior, or
completion evidence. It prevents “implement the scheduler” from becoming an unreviewable epic
and prevents a small issue from silently changing cross-repository architecture.

## Readiness levels

| Level | Meaning | Required evidence |
|---|---|---|
| D0 decision-ready | problem, authority, constraints, alternatives, owner accepted | governing ADR/specification |
| D1 contract-ready | boundary and compatibility behavior executable | schema/API/event plus fixtures |
| D2 build-ready | bounded implementation packet complete | task manifest, dependencies, tests, threat boundary, rollback |
| D3 implementation-complete | code satisfies packet in a reproducible environment | review, tests, SBOM, provenance, evidence manifest |
| D4 release/production-ready | operational and institution gates satisfied | signed release or production admission package |

No task is handed to implementation before D2. D3 does not imply D4.

## Maturity

The standard is normative and active. Individual handoff packets declare their D0 through D4
maturity independently; inheriting this standard does not promote a packet. Architecture
Maintainers review the standard after the first completed vertical slice and after any material
contract, security, licensing, or release-process change.

## Required handoff packet

Each packet MUST contain:

1. unique issue/slice ID, title, owning repository, accountable reviewer, and target readiness;
2. problem statement, user/institution outcome, in-scope and explicitly out-of-scope behavior;
3. governing requirement IDs, ADRs, contracts and exact versions;
4. upstream source/provenance, selected integration mode, license obligations, and excluded paths;
5. inputs, outputs, state transitions, errors, idempotency, ordering, retry, timeout, and limits;
6. data classification, residency, retention, deletion, logging, secrets, and trust boundaries;
7. dependency graph, consumer impact, feature flags, migration, rollback, and compatibility window;
8. deterministic acceptance cases including positive, negative, boundary, authorization, failure,
   recovery, performance, privacy, accessibility, and operability evidence as applicable;
9. environment/bootstrap commands, expected output, test-data source, and prohibited real data;
10. evidence paths, completion reporter, review authority, and follow-up debt explicitly excluded.

## Granularity rule

A packet should normally produce one coherent contract, adapter capability, state transition,
or testable user outcome. Split it when it changes multiple independent authorities, cannot be
reviewed as one security boundary, lacks one rollback, or cannot complete within one integration
cycle. Do not split so far that child issues require hidden shared state or cannot be tested.

## Repository and contract discipline

- The owning common repository changes its contract; consumer repositories pin and implement it.
- Institution forks carry branding, site values, integrations, and evidence, not semantic clones
  of common contracts.
- A handoff MUST NOT authorize direct cross-service database access when a contract owns the
  boundary.
- Generated bindings are regenerated from the pinned contract and never edited as authority.
- An upstream fork task records the base commit, patch queue, upstreamable changes, excluded
  editions, update budget, divergence trigger, and replacement path.

## Implementation and review flow

1. Architecture owner promotes the requirement to D0.
2. Contract owner releases or pins the D1 boundary and fixtures.
3. Engineering lead decomposes a vertical slice into D2 packets and checks dependencies.
4. Implementer reproduces the environment, confirms assumptions, and records deviations before
   changing code.
5. Implementation, tests, documentation, migration, and observability are reviewed together.
6. CI builds from clean source, runs conformance and failure tests, generates the SBOM, and signs
   the evidence manifest.
7. Product/architecture/security owners accept D3; institution authorities independently decide
   D4 production admission.

## Blocking and change rules

Implementation pauses only the affected packet when authority, contract meaning, protected-data
handling, license compatibility, or rollback is ambiguous. The issue records the question and
owner; the implementer does not select a policy by convenience. A discovered architecture
change returns to D0/D1. Test-detail clarification that does not change behavior may remain in
the packet with reviewer approval.

## Evidence manifest

The completion manifest records repository and commit, contract versions, source provenance,
build environment digest, test identifiers/results, coverage boundaries, security/license
scans, SBOM digest, artifacts, migrations, rollback rehearsal, known limitations, reviewers,
and timestamps. It contains no secrets or protected student data.

## Definition of done and acceptance

- **HANDOFF-ACC-001:** an implementer unfamiliar with the conversation history can explain the
  authority, boundary, inputs, outputs, failures, tests, and rollback from the packet alone;
- **HANDOFF-ACC-002:** every code change and test maps to a requirement/contract or an explicitly
  approved implementation necessity;
- **HANDOFF-ACC-003:** seeded unauthorized, duplicate, stale, malformed, timeout, dependency-loss,
  and rollback cases have deterministic expected results;
- **HANDOFF-ACC-004:** a clean environment reproduces the artifact and evidence manifest from
  pinned open-source inputs;
- **HANDOFF-ACC-005:** reviewers can distinguish not-run, failed, passed, simulated, pilot, and
  production evidence;
- **HANDOFF-ACC-006:** changing a common contract identifies all consumers and cannot merge until
  compatibility or migration evidence exists.

## Change control and references

Changes to readiness levels or required packet fields require Architecture Maintainer and
Engineering Lead review. Security/privacy/license fields cannot be waived by an implementer;
an exception needs scope, rationale, compensating control, approver, and expiry.

- [Executable Contract Portfolio](../architecture/Executable-Contract-Portfolio.md)
- [Vertical Slice Completion Plan](../roadmap/Vertical-Slice-Completion-Plan.md)
- [P0 Architecture Baseline](../architecture/P0-Architecture-Baseline-and-Remediation-Register.md)
- [Implementation Handoff Backlog](../roadmap/Implementation-Handoff-Backlog.md)
