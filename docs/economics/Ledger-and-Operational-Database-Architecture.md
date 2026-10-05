# Ledger and Operational Database Architecture

> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: PSDC Economics and Platform Working Groups
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: ADR-0026, ADR-0029, ADR-0031

## Purpose and decision

PSDC uses two complementary state systems:

- PostgreSQL and bounded caches/streams hold high-frequency operational truth for bids,
  queues, leases, heartbeats, reservations and idempotent workflow state.
- An institution-controlled Cosmos SDK/CometBFT-derived ledger records low-frequency,
  multi-party commitments, governance, settlement, disputes and audit anchors.

The ledger does not replace the operational database and is not the scheduler database.
The architecture gains verifiable shared settlement without paying consensus cost for every
heartbeat or queue transition.

## Layering verdict

The “fast front, slow back” description is a useful first mental model, with two corrections.
First, there are three planes rather than two: PostgreSQL operational state, governed evidence
objects, and Cosmos-derived settlement. Second, routine batching is not called a state channel
or rollup unless PSDC later defines the proof, challenge, custody, and exit protocol those terms
imply. The accepted name is **off-chain operational state with deterministic evidence and
on-chain settlement**.

PSDC uses event-driven synchronization, periodic settlement batches, and cryptographic
anchoring together. Consequential domain events leave PostgreSQL through a transactional
outbox; canonical signed receipts form replayable batches; a Merkle root commits those receipts
to the ledger. Raw database log files are never the settlement proof because their format is
implementation-specific, may contain secrets, and cannot efficiently prove individual receipt
inclusion.

## Scope

This document covers operational state, event outbox, receipt aggregation, commitment,
settlement, dispute and audit-indexer boundaries.

## Out of scope

It does not authorize workloads, hold content/keys, operate backend schedulers or define
public cryptocurrency.

## Dependencies, adapters, runtimes and ownership

PostgreSQL owns live transactions, the event runtime transports outbox messages, backend
adapters produce measurements, the batch builder owns canonical commitments and the
Cosmos-derived runtime owns finalized settlement only.

## Cost-benefit chart

| Dimension | Operational PostgreSQL/event state | Cosmos-derived ledger |
|---|---|---|
| best use | live queues, offers, leases, heartbeats, current capacity, retries | final commitments, settlement, governance, provider obligations, disputes |
| write latency | low milliseconds in a local HA domain | consensus and block-finality latency |
| throughput | high and tunable for indexed mutable state | lower; every validator verifies ordered transitions |
| queries | rich joins, indexes, transactions and corrections | deterministic state-machine queries; analytics usually need an indexer |
| mutation | efficient updates and expiry | append/transition semantics; correction is a new transaction |
| trust model | institution/operator and database controls | replicated validators and cryptographic commitment |
| partition behavior | local primary/failover can continue under policy | quorum loss stops finalization |
| privacy | row/column controls and local retention | validator replication expands metadata exposure |
| storage cost | compact current state plus selected history | replicated history and state across validators |
| operational burden | established DBA, backup and failover practice | validator security, consensus, upgrades, snapshots and governance |
| independent audit | needs signed logs/anchors | strong ordered commitment once finalized |
| ideal frequency | every scheduler transition | periodic batches and consequential events |

## Why the ledger cannot be the high-frequency scheduler database

It is technically possible to submit every scheduler update to a chain, but it is a poor
production design:

1. **Consensus is deliberate overhead.** Every validator re-executes and orders each
   transition. Scheduler heartbeats and resource updates are high-volume and short-lived.
2. **Finality adds latency.** Placement needs fast compare-and-set, locks, expiry and queue
   updates; waiting for blocks expands scheduling and recovery time.
3. **Quorum couples liveness.** A validator partition would stop new scheduler state even
   when the institution's compute cluster and database remain healthy.
4. **Mutable current state maps poorly.** Available capacity, heartbeats and bids change
   constantly. A ledger preserves a large history that operations does not need forever.
5. **Privacy surface grows.** Validators replicate metadata. Even hashes can reveal timing,
   relationships and workload patterns.
6. **Query and repair are harder.** Operational reconciliation needs indexes, joins,
   bounded transactions and correction workflows; chains require deterministic modules and
   separate indexers.
7. **Upgrade risk moves into consensus.** A scheduler bug should not require a chain halt or
   coordinated consensus upgrade.

The expert boundary is: use the database to decide and operate; use the ledger to prove and
settle the parts multiple sovereign parties must agree on.

## Component and data flow

    scheduler/API -> PostgreSQL transaction -> outbox event -> backend adapter
          |                    |
          |                    +-> receipts/reconciliation
          |                                |
          +--------------------------------v
                                  settlement batch builder
                                             |
                                      Merkle commitment
                                             |
                                  Cosmos-derived ledger
                                             |
                                    auditors/indexers

Large evidence remains in governed object storage. The ledger stores identifiers, amounts,
states, policy/schema versions, evidence digests, Merkle roots and signatures.

The ledger-event projector writes finalized chain state into a PostgreSQL read model for normal
queries. That projection is disposable and replayable. It does not make PostgreSQL authoritative
for finalized settlement, and a mismatch opens reconciliation rather than silently overwriting
either history.

## Normative requirements

- **LEDGER-DB-001:** Scheduler correctness MUST depend on transactional operational state,
  not on synchronous chain finality.
- **LEDGER-DB-002:** Every consequential state transition MUST produce an idempotent outbox
  event linked to the transaction that created it.
- **LEDGER-DB-003:** Settlement batches MUST be reproducible from signed receipts and MUST
  fail verification if a receipt is added, removed or modified.
- **LEDGER-DB-004:** Ledger unavailability MUST queue bounded commitments and disputes; it
  MUST NOT invalidate accepted leases or release protected data.
- **LEDGER-DB-005:** New discretionary leases MUST stop when credit-reservation truth cannot
  be determined; critical renewals require a pre-approved emergency reserve and evidence.
- **LEDGER-DB-006:** No plaintext content, credential, secret, key, private network address
  or unnecessary person identifier may be written on the ledger.

## Interfaces and compatibility

The operational plane exposes versioned OpenAPI and CloudEvents contracts for offer,
decision, lease, measurement, receipt and dispute state. The settlement builder accepts
finalized receipts and emits a canonical batch plus Merkle root. Ledger modules expose
commitment, settlement, governance and dispute transactions. Schemas use deterministic
canonical serialization; changes require versioning and replay fixtures.

## Failure and reconciliation matrix

| Failure | Operational response | Ledger/settlement response |
|---|---|---|
| PostgreSQL primary loss | promote tested replica; pause unsafe writes | no new batch until source recovers |
| event stream loss | replay transactional outbox | no receipt omitted silently |
| ledger quorum loss | continue accepted operational leases under policy | queue bounded batches; show settlement pending |
| duplicate receipt | deduplicate by workload/lease/attempt/interval | batch verification rejects duplicate |
| backend-meter disagreement | quarantine receipt and open dispute | commit only resolved or explicitly disputed state |
| database/ledger mismatch | ledger is commitment history; reconstruct and compare | no destructive rewrite; corrective transaction |
| signing-key compromise | stop batch signing, rotate and investigate | governance records replacement and affected window |

## Security, privacy and operations

Validator membership is institution-controlled; federation uses an explicit consortium
validator/governance profile rather than automatic public validators. Signing and validator
keys use separate non-exportable or tightly controlled key classes. Database roles,
settlement builder and ledger proposer are separated. Raw bid and user-level telemetry have
shorter retention than final financial/audit commitments.

## Performance and capacity

The institution declares scheduler transaction latency, write throughput, outbox lag,
receipt lag, maximum uncommitted settlement window, block time and recovery objectives.
Batches are sized by evidence volume and risk, not arbitrary token excitement. A default
starting profile is minute-scale receipt aggregation and hour/day-scale settlement, subject
to measurement during the pilot.

## Alternatives and trade-offs

- database only is simpler but weakens multi-institution non-repudiation and common
  settlement;
- ledger only maximizes replicated history but harms latency, privacy and availability;
- managed external blockchain services violate sovereign-operation goals;
- signed append-only logs plus transparency trees remain an exit option if a Cosmos-derived
  chain proves too costly.

## Implementation sequence, migration and rollback

Implement operational schemas, outbox and reconciliation first. Run settlement batch
construction offline, then on a single institution test chain, then with independent
validators. Compare full reconstruction against the database before enforcing credit
settlement. Rollback pauses chain submission and returns to signed local settlement exports;
operational state remains authoritative and no historical commitment is deleted.

## Testing and evidence

Tests isolate database, stream, batch builder, validator quorum and privacy failures and
prove deterministic receipt reconstruction.

## Binary acceptance criteria

These testing and evidence gates prove the separation under normal and failed operation.

- **LEDGER-DB-ACC-001:** the scheduler meets its latency target while the ledger is stopped;
- **LEDGER-DB-ACC-002:** a committed batch exactly verifies all included receipts and fails
  after any mutation, addition or removal;
- **LEDGER-DB-ACC-003:** database failover, outbox replay and duplicate delivery create no
  duplicate lease or settlement;
- **LEDGER-DB-ACC-004:** validator quorum loss queues bounded settlement and triggers the
  declared credit-risk limit without stopping an accepted critical service;
- **LEDGER-DB-ACC-005:** a privacy inspection finds no prohibited content in blocks,
  transactions, events or public indexer views;
- **LEDGER-DB-ACC-006:** a clean implementation of the open settlement export can reproduce
  balances without the original scheduler application.

## References

- [Scheduling Algorithm](../campus-compute-fabric/Scheduling-Algorithm.md)
- [Compute Fabric Economics](Campus-Compute-Fabric-Economics.md)
- [KMS](../security/KMS.md)
- [ADR-0029](../architecture/architecture-decision-records/ADR-0029-unified-institutional-resource-metering.md)
- [ADR-0031](../architecture/architecture-decision-records/ADR-0031-off-chain-operations-and-on-chain-settlement.md)
- [Executable Contract Portfolio](../architecture/Executable-Contract-Portfolio.md)
