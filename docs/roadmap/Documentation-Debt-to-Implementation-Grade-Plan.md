# Documentation Debt to Implementation-Grade Plan

> Standard: PSDC-DOC-001
> Document type: roadmap
> Status: Active
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: ADR-0001 through ADR-0031; PSDC-DOC-001

## Outcome

Turn the documentation corpus from structurally complete but semantically repetitive
scaffolding into implementation-authorizing Level-3 specifications. Completion means a new
engineering team can implement one conformant system from contracts, failure behavior,
security boundaries, deployment plans and tests without inventing material architecture.

This plan does not claim the corpus is complete. At the 2026-09-25 baseline:

- structural/document-quality audit: 530 Markdown documents, zero required-section findings
  in psdc-architecture;
- whole-workspace validation: 1,294 Markdown files, 15 JSON files, zero broken local links
  or unresolved specification markers;
- semantic audit: 1,273 documents scanned, 1,506 findings—880 repeated-substantive-content
  and 626 subject-substitution-clone findings;
- implementation evidence: no running provider registry, scheduler, storage control plane,
  identity portability system, AI gateway or end-to-end client session has been proven.

Structural success is therefore a floor, not implementation readiness.

## Definition of implementation-grade

A specification is Level 3 only when it contains subject-specific:

1. measurable purpose, stakeholders, use cases, scope and prohibited responsibilities;
2. stable normative requirements linked to binary acceptance evidence;
3. logical/component architecture and ownership boundaries;
4. named versioned APIs, events, schemas, producers, consumers and compatibility;
5. authoritative state, lifecycle, classification, residency, retention, deletion/export;
6. control/data flows including timeouts, idempotency, retries and state transitions;
7. trust boundaries, threats, authorization, secrets, abuse and privacy controls;
8. topology, environment separation, configuration and deployment mechanics;
9. capacity, performance, quotas, availability, degradation, RPO/RTO, backup and rollback;
10. observability, owner/on-call/incident and escalation behavior;
11. alternatives, open-source/provenance strategy and replacement boundary;
12. implementation sequence, migration, failure matrix, conformance fixtures and evidence.

A document fails even if all headings exist when its prose can be moved to another domain by
renaming nouns, when it names a technology without a contract, or when acceptance cannot
distinguish a correct implementation from an incorrect one.

## Dependencies and critical path

    accepted ADRs and authority map
              |
      shared contracts/schemas
              |
    vertical-slice specifications
              |
  threat/failure/operations evidence design
              |
   institution deployment overlay
              |
      implementation backlog/tasks
              |
       code and runtime evidence

Common PSDC specifications are completed before Algonquin bindings. Institution documents
may tighten policy and provide site values but cannot copy and redefine common contracts.
The quality standard, semantic audit, link validator and AI rubric are required gates.

## Normative requirements

- **DOC-REMED-001:** Every remediation pull request MUST identify the authoritative source,
  affected dependants, maturity change and validation evidence.
- **DOC-REMED-002:** A document MUST NOT be marked Level 3 until its subject-specific
  contracts, failure behavior, security boundaries, migration and binary evidence are
  reviewable.
- **DOC-REMED-003:** Common PSDC behavior MUST be accepted before an Algonquin overlay
  supplies site values or stricter local policy.
- **DOC-REMED-004:** Semantic findings MUST be closed by consolidation, substantive rewrite,
  reclassification, supersession or deletion—not synonym replacement.
- **DOC-REMED-005:** A production claim MUST remain prohibited until Level-4 runtime,
  institutional, recovery and operational evidence exists.
- **DOC-REMED-006:** Every implementation issue generated from documentation MUST cite the
  governing requirement IDs and required evidence artifacts.

## Work-product packet per component

Every executable component receives one reviewable packet:

- architecture or component specification;
- OpenAPI/AsyncAPI/JSON Schema or equivalent contract;
- example positive, negative and fault fixtures;
- state machine and authoritative-data table;
- trust-boundary/threat and privacy analysis;
- deployment/configuration/secret schema;
- SLO/capacity and dependency failure matrix;
- operational runbook, restore and rollback procedure;
- upstream provenance/license/fork record;
- test plan and evidence manifest;
- institution-overlay fields and standalone/federation scenarios.

Documents link to shared definitions instead of copying boilerplate.

## Phase 0 — stabilize authority and stop new debt

### Work

- mark one source of truth per decision/contract and identify summaries/indexes;
- prohibit mass-generated domain prose from entering main without semantic review;
- require the template, stable requirements and review rubric for new content;
- preserve current common-first/institution-overlay ownership.

### Exit criteria

- all current normative documents have control blocks and governing decisions;
- no new repeated-content/subject-substitution findings are introduced;
- every PR reports quality, link and semantic deltas.

### Evidence

Validator output, authority map, changed-document review report and zero-new-debt CI result.

## Phase 1 — authoritative P0 remediation

### Work

Remediate cross-cutting documents whose ambiguity would cause incompatible code:

1. compute hierarchy, market/lease/token semantics and backend selection;
2. storage tiers, manifests, keys, placement/custody and deletion;
3. ledger versus operational database;
4. network addressing/zones/path/federation/QoS;
5. licensing, source admission and fork maintenance;
6. production boundary, critical dynamic placement and recovery;
7. identity DID/VC method, schema, wallet, recovery and account linking.

### Exit criteria

- each P0 family has accepted ADRs, architecture, contracts, failure matrix and binary tests;
- the technology matrix and human-decision register contain no contradictory older default;
- domain specialists record outstanding institutional/legal approvals as gates, not prose.

### Evidence

Cross-document traceability review, AI-rubric score, zero quality/link findings and approved
semantic exceptions only.

## Phase 2 — executable contract specifications

### Work

Specify provider/capability registries, workload API, resolver, auction, lease, worker,
compute-cell, backend adapters, metering, credit, object manifest, tier policy, provider
storage, KMS/envelope, erasure/repair, custody, federation exchange, DID/VC issuer/verifier,
gateway/runtime and client/session contracts.

Each contract includes canonical examples, validation, error/reason codes, idempotency,
compatibility/deprecation, security context and conformance fixtures.

### Exit criteria

- contract linter/code generation succeeds where applicable;
- reference stub producer/consumer pass each fixture;
- no service requires another service's private database or undocumented field;
- every deferred implementation item maps to an owning specification and repository.

### Evidence

Versioned schemas, generated documentation, contract-test reports and dependency graph.

## Phase 3 — vertical-slice documentation

### Work

Complete slices rather than editing 1,273 files alphabetically:

1. internal opportunistic lab task;
2. long-running Kubernetes service;
3. OpenStack VM;
4. Slurm MPI job;
5. Tier 1 object write/read/restore;
6. Tier 2 private content distribution;
7. Tier 4 federation exchange;
8. portable credential issue/verify/revoke/link;
9. web/desktop/mobile login and AI session.

Each slice traces identity to policy, network, storage, key, execution, evidence, receipt,
failure, recovery and operator ownership.

### Exit criteria

- one packet per slice can be converted directly to implementation issues;
- failures at every dependency have deterministic degraded/stop behavior;
- common and Algonquin overlay agree through automated conformance comparison.

### Evidence

Sequence/state diagrams, fixtures, threat model, test matrix, runbooks and review disposition.

## Phase 4 — long-tail semantic remediation

### Work

For every semantic finding, choose one action:

- consolidate shared content into a true common authority and replace copies with links;
- rewrite with domain-specific actors, state, interfaces, threats and failures;
- downgrade a navigation-only file to repository-index;
- mark superseded material historical with replacement;
- delete redundant/generated prose and its recreation path.

Do not “fix” a clone by synonym substitution. The governing mechanics must differ or the
content belongs in a shared specification.

### Exit criteria

- zero unreviewed subject-substitution clones;
- zero repeated substantive blocks except allowlisted legal/control text with one authority;
- each current file meets its declared document type and maturity;
- documentation-completion audit is regenerated from evidence.

### Evidence

Semantic audit report, exception register, deletion/supersession map and human review sample.

## Phase 5 — implementation handoff and evidence feedback

### Work

Convert accepted requirements/criteria into repository issues and tests. Implementation
records observed deviations, benchmarks, incidents and operational constraints. Documents
are corrected through ADR/change control; code does not silently redefine architecture.

### Exit criteria

- each implementation issue cites requirement IDs and expected evidence;
- tests map back to acceptance criteria;
- production claims require measured Level-4 evidence;
- post-implementation discrepancies are resolved in code or documentation.

### Evidence

Traceability matrix, CI/test artifacts, deployment evidence, restore/failure exercises and
accepted production-readiness record.

## Prioritization algorithm

Score each document:

    priority =
        authority impact (0–5)
      + security/privacy impact (0–5)
      + number of downstream dependants (0–5)
      + implementation proximity (0–5)
      + semantic-debt severity (0–5)

P0 is 20–25, P1 is 14–19, P2 is 8–13 and P3 is 0–7. Fix the authority once before its
dependants. A cross-cutting contract outranks a leaf feature with the same score.

## Review workflow

1. identify authority, type, maturity and dependent documents;
2. read ADRs, contracts, source research and institution constraints;
3. mark facts, decisions, assumptions, external approvals and measurements distinctly;
4. replace generic prose with mechanics and stable requirements;
5. add failure/security/operations and binary evidence;
6. reconcile upstream/downstream documents and remove duplicate authority;
7. run quality, link, schema and semantic audits;
8. use the AI rubric, then maintainer/domain review;
9. record disposition, residual risks and next implementation gate.

The same author/model may draft and self-check but cannot claim independent review. A second
maintainer remains a backlog control until a staff member joins.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| chasing warning count instead of usefulness | review vertical slices and implementation handoff tests |
| enormous rewrite creates contradictions | authority-first waves, small PRs and traceability |
| accepted defaults hide missing site data | institution overlay schema and explicit evidence gates |
| AI produces polished clones | semantic audit plus domain-mechanics review |
| new ADRs drift from old matrices | required affected-document reconciliation checklist |
| no second maintainer | transparent role overlap, reproducible review record and deferred independent gate |
| specifications overfit one product | contract-first boundary and tested alternative/reference stub |
| documents claim production | maturity language and Level-4 evidence prohibition |

## Progress measures

Track per review wave:

- current documents by type and maturity;
- P0/P1 packets accepted;
- requirements with linked binary criteria;
- interfaces with machine-readable schemas/fixtures;
- semantic findings opened/closed/new;
- duplicate authorities eliminated;
- links/schema/quality checks;
- institution-overlay conformance;
- implementation issues generated;
- Level-4 evidence obtained.

The final semantic number must reach zero or contain only reviewed, reasoned exceptions.
Reducing the count without completing the work-product packets is not success.

## Stop and rollback conditions

Stop a remediation wave if it changes accepted behavior without an ADR, erases source
history, mixes Algonquin values into common contracts, creates broken links/contracts, or
cannot identify the authoritative replacement. Roll back that wave, preserve review
evidence and resume from the last accepted authority map.

## References

- [Documentation Quality Standard](../standards/Ecosystem-Documentation-Quality-Standard.md)
- [AI Documentation Review Rubric](../standards/AI-Documentation-Review-Rubric.md)
- [Architecture Authority and Precedence](../architecture/Architecture-Authority-and-Precedence.md)
- [P0 Architecture Baseline](../architecture/P0-Architecture-Baseline-and-Remediation-Register.md)
- [Executable Contract Portfolio](../architecture/Executable-Contract-Portfolio.md)
- [Vertical Slice Completion Plan](Vertical-Slice-Completion-Plan.md)
- [Semantic Clone Removal Plan](Semantic-Clone-Removal-Plan.md)
- [Implementation Handoff Standard](../standards/Implementation-Handoff-Standard.md)
- [Implementation Handoff Backlog](Implementation-Handoff-Backlog.md)
- [Technology Defaults and Alternatives](../vision/13-Technology-Defaults-and-Alternatives.md)
- [Human Choices and Decisions Register](../governance/Human-Choices-and-Decisions-Register.md)
- [Ecosystem Implementation Readiness](Ecosystem-Implementation-Readiness-2026-09-11.md)
