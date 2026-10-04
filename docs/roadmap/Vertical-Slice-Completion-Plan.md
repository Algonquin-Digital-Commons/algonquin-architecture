# Vertical Slice Completion Plan

> Standard: PSDC-DOC-001
> Document type: roadmap
> Status: Normative implementation plan
> Owner: PSDC Architecture Maintainers and Product Owners
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: ADR-0013, ADR-0026, ADR-0027, ADR-0028, ADR-0029, ADR-0031

## Purpose and definition

A vertical slice proves one useful outcome through every required boundary: request, identity,
policy, contract, placement, execution or storage, metering, evidence, observation, failure,
and operator recovery. A collection of isolated components is not a completed slice.

## Outcome and evidence

The outcome of each slice is one reproducible user or institutional capability plus a signed
evidence manifest. Evidence includes pinned commits, contracts, build environment, test results,
failure injection, security/license scans, telemetry, rollback rehearsal, known limitations,
and the maturity actually demonstrated.

## Common definition of done

Every slice requires pinned source provenance, approved licenses, versioned contracts,
deployment automation, synthetic data, threat and privacy review, observability, positive and
negative tests, failure injection, backup/recovery or replay, rollback, operator runbook, SBOM,
signed evidence manifest, and an institution-controlled exit path. “Works on one laptop” is
development evidence, not a production claim.

## Ordered slices

| Slice | User-visible outcome | End-to-end path | Exit evidence |
|---|---|---|---|
| VS-01 internal opportunistic lab task | an approved request runs on an idle lab node and settles institutional credits | identity → policy/classification → provider/capability registry → Golem-derived task offer → placement/lease → worker sandbox → receipt/evidence → PostgreSQL/outbox → settlement batch/test ledger | successful, denied, duplicate, cancellation, node-loss, network-loss, tamper, and ledger-outage runs |
| VS-02 long-running Kubernetes service | an approved service is dynamically placed and safely moved between eligible institutional clusters | service manifest → eligibility → Akash-derived offers → resolver → lease → Kubernetes adapter → health/SLO → meter → settlement | rollout, reschedule, rollback, data-class denial, quorum loss, and capacity exhaustion |
| VS-03 OpenStack VM | a governed VM is provisioned on an approved cloud cell | VM workload → image verification → network/storage eligibility → market/resolver → lease → OpenStack adapter → lifecycle and meter | create, stop, snapshot, migrate/replace, quota, network, image, host and rollback tests |
| VS-04 Slurm HPC job | a tightly coupled job reaches an eligible HPC partition without task-fabric misrouting | HPC manifest → topology/network classification → reservation/offer → Slurm adapter → job/accounting → receipt and settlement | queue, preemption, MPI/topology, failure, accounting reconciliation, and denial tests |
| VS-05 private hot object | a protected object is encrypted, erasure-coded, placed, read, repaired, and deleted | identity/authority → client encryption/envelope → object manifest → Tier 1 placement → providers → S3-compatible access → custody/repair/deletion evidence | confidentiality, missing shard, provider loss, rotation, retention, restore, and verified deletion |
| VS-06 private content distribution | an approved immutable artifact moves through a private content-addressed swarm without public discovery | manifest → policy → encrypted/public payload → CID/CAR → private Kubo peers → digest verification → custody and cache expiry | unauthorized peer, DHT isolation, poisoning, pin loss, repair, and metadata inspection |
| VS-07 governed federation storage | one institution transfers an authorized encrypted object to another sovereign institution | transfer authority/consent → Tier 4 manifest → gateways → mutual identity and policy → encrypted transport → destination custody receipt → expiry/deletion | destination denial, interruption/replay, key mismatch, consent withdrawal, retention conflict, and receipt verification |
| VS-08 portable student identity | a student links an institutional account, receives a VC, transfers, verifies, revokes, and recovers control | institutional OIDC → account link → DID proof → issuer registry → VC wallet → verifier/status → receiving institution | minimum disclosure, expiry, revocation, key loss/recovery, duplicate link, issuer compromise, and independent verification |
| VS-09 client-to-AI session | web, desktop, and mobile clients use the same institution-owned AI and tool boundary | client discovery → OIDC → gateway/session → policy → model router/runtime → tool grant → encrypted relay/handoff → audit | browser, managed desktop, personal desktop, mobile, offline/reconnect, denied tool, model failure, and session handoff |

## Phase plan and dependencies

### Wave A: authority and executable boundaries

Release C0 contracts, source-admission records, minimal identity/policy, site network lab profile,
development KMS profile, operational PostgreSQL/outbox, and reproducible local environments.

### Wave B: VS-01 reference slice

VS-01 is first because it exercises the unique PSDC value—sovereign provider registration,
market-style placement, opportunistic execution, metering, and hybrid settlement—without first
requiring production Kubernetes, OpenStack, Slurm, or protected student data.

### Wave C: backend and storage expansion

VS-02 through VS-06 reuse the resolver, lease, receipt, evidence, and settlement contracts.
Backend adapters remain replaceable and cannot bypass classification or policy.

### Wave D: federation and portability

VS-07 and VS-08 begin only after institutional trust, credential, gateway, retention, and
dispute contracts pass independent conformance testing.

### Wave E: cohesive clients

VS-09 consumes stable identity, gateway, policy, and session contracts. It does not create a
second identity authority, model-provider bypass, or client-only federation protocol.

## Per-slice handoff packet

Each slice is decomposed into bounded implementation issues using the Implementation Handoff
Standard. The parent packet includes its sequence diagram, data classifications, authority
matrix, contract versions, repositories, test topology, upstream baselines, rollout/rollback,
resource budget, observability, and evidence manifest. Child issues cannot change a contract or
security boundary without returning to the owner.

## Acceptance and stopping rules

The following normative requirements are mandatory; a slice MUST NOT be called complete when
any applicable criterion lacks recorded evidence.

- **SLICE-ACC-001:** no slice depends on a proprietary hosted service, public token, public
  workload network, or public content network for its normal path;
- **SLICE-ACC-002:** every external/backend dependency can be stopped and produces the declared
  degraded behavior rather than silent data loss or policy bypass;
- **SLICE-ACC-003:** settlement can be independently reconstructed from retained canonical
  receipts and evidence;
- **SLICE-ACC-004:** protected data never enters a lower-trust provider, ledger, log, fixture,
  or public artifact;
- **SLICE-ACC-005:** the institution can export state and replace a backend through the released
  contract;
- **SLICE-ACC-006:** a slice stops at pilot status until production boundary evidence and the
  institution's delegated approval are complete.

## Exit criteria and risks

A phase exits only when all included slices meet their declared acceptance criteria and every
shared defect has an owner. Major risks are building components without end-to-end value,
allowing backend APIs to become common contracts, using real student data in pilots, masking
ledger/network outages, and mistaking simulated evidence for production proof. The stopping
rules above, synthetic fixtures, adapter conformance, explicit maturity labels, and independent
review mitigate those risks.

## References

- [Executable Contract Portfolio](../architecture/Executable-Contract-Portfolio.md)
- [P0 Architecture Baseline](../architecture/P0-Architecture-Baseline-and-Remediation-Register.md)
- [Implementation Handoff Standard](../standards/Implementation-Handoff-Standard.md)
- [Implementation Handoff Backlog](Implementation-Handoff-Backlog.md)
