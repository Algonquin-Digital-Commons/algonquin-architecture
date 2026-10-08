# Master Architecture Document Suite


> Standard: PSDC-DOC-001
> Document type: repository-index
> Status: Normative
> Owner: Algonquin Institution Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: none; index governed by repository policy

This directory is the normative documentation source for the institution-neutral
Post Secondary Digital Commons. institution-specific authority and configuration
live in the Algonquin institution forks.

As of 2026-09-25, the suite contains constitutional architecture, ADR-0001 through
ADR-0031, shared contract profiles, security and governance policy, implementation
readiness, and explicit acceptance gates. Structural validation currently passes,
but the semantic audit still identifies repeated and subject-substitution content;
the suite remains in documentation remediation. A complete Level-3 specification
may authorize implementation; it does not claim that code, infrastructure or
operational evidence already exists.

## Reading order

1. `vision/constitutional/Post-Secondary-Digital-Commons-Architecture.md`
2. `architecture/Consolidated-Ecosystem-Architecture.md`
3. `architecture/Architecture-Authority-and-Precedence.md`
4. `architecture/P0-Architecture-Baseline-and-Remediation-Register.md`
5. `architecture/Ecosystem-Dependency-Contract.md`
6. `architecture/Specification-Completeness-Standard.md`
7. `vision/13-Technology-Defaults-and-Alternatives.md`
8. `governance/Human-Choices-and-Decisions-Register.md`
9. `architecture/Executable-Contract-Portfolio.md`
10. the relevant domain specification and shared contract profile
11. the controlling ADRs
12. `roadmap/Vertical-Slice-Completion-Plan.md`, `roadmap/Implementation-Handoff-Backlog.md`, and the implementation-readiness roadmap.

## Normative specification inventory

| Section | Specifications |
|---|---:|
| Academic | 13 |
| Commons Compute Fabric | 30 |
| AI | 27 |
| Architecture | 15 |
| Clients | 18 |
| Cloud | 14 |
| Compute | 12 |
| Data | 9 |
| Deployment | 12 |
| Developer | 16 |
| Economics | 10 |
| Fediverse | 20 |
| Governance | 13 |
| Identity | 13 |
| Institutional | 9 |
| Integration | 9 |
| Media and spatial | 26 |
| Network | 15 |
| Open source | 10 |
| Operations | 13 |
| Product | 12 |
| Reliability | 10 |
| Roadmap | 13 |
| Runbooks | 14 |
| Security | 21 |
| Storage | 13 |
| Student life | 17 |
| Testing | 12 |
| Vision | 7 |

Constitutional, catalog, audit, source-history, README and ADR documents are
additional to the 423 generated domain specifications.

## Completion and change control

Every specification defines scope, normative behaviour, interfaces, ownership,
data, security, deployment separation, capacity, failure behaviour, observability,
tests, open-source strategy, acceptance criteria and change authority. Site values
belong in signed institution manifests. Implementation and production evidence is
collected at the gates defined by the specification.

Use `Documentation-Architecture-Standard.md` and
`architecture/Specification-Completeness-Standard.md` for new documentation. Use
`architecture/Decision-Traceability-Matrix.md` and
`architecture/Standards-First-Coverage-Matrix.md` for conformance. Current
execution work is tracked in
`roadmap/Ecosystem-Implementation-Readiness-2026-09-11.md`. Documentation
semantic remediation is tracked in
`roadmap/Documentation-Debt-to-Implementation-Grade-Plan.md`.
Implementation work also follows `standards/Implementation-Handoff-Standard.md`; semantic
consolidation follows `roadmap/Semantic-Clone-Removal-Plan.md`.

## Purpose

This index explains the purpose and placement of the docs directory and links readers to the authoritative documents it contains.

## Allowed contents

This directory belongs to psdc-architecture. It may contain scoped documentation, contracts, configuration examples, tests, and navigation links owned by this repository.

## Prohibited contents

It MUST NOT contain secrets, credentials, private infrastructure values, unrelated product source, copied institution overrides, or undocumented external dependencies.

## Owner

The owning role is PSDC Architecture Maintainers; accountable maintenance remains with RedjiJB until a second maintainer is appointed.

## Contents

- `academic`
- `ai`
- `architecture`
- `campus-compute-fabric`
- `clients`
- `cloud`
- `compute`
- `data`
- `decisions`
- `deployment`
- `developer`
- `Documentation-Architecture-Standard.md`
- `economics`
- `fediverse`
- `governance`
- `identity`
- `institutional`
- `integration`
- `media`
- `network`
- `open-source`
- `operations`
- `product`
- `README.md`
- `reliability`
- `roadmap`
- `runbooks`
- `security`
- `storage`
- `studentlife`

## Contribution and change control

Changes MUST use a pull request, preserve the repository boundary, update affected links and contracts, and pass the structural and substantive documentation audits before merge.

## References

- [Ecosystem documentation quality standard](https://github.com/Post-Secondary-Digital-Commons/psdc-architecture/blob/main/docs/standards/Ecosystem-Documentation-Quality-Standard.md)
- [Repository governance](https://github.com/Post-Secondary-Digital-Commons/psdc-architecture/blob/main/docs/governance/GitHub-Repository-Governance.md)

