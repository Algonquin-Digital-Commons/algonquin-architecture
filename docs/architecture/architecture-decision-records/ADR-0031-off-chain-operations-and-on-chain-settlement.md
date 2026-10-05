# ADR-0031: Off-Chain Operations and On-Chain Settlement

> Standard: PSDC-DOC-001
> Document type: adr
> Status: Accepted
> Owner: PSDC Economics and Platform Working Groups
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: ADR-0013, ADR-0026, ADR-0029

> Date: 2026-09-25
> Scope: operational resource markets, usage evidence, institutional credits, settlement, disputes, and federation

## Context and decision drivers

PSDC needs millisecond-scale scheduling, mutable queues, retries, heartbeats, rich operational
queries, and continued local operation during ledger quorum loss. It also needs multiple
sovereign institutions to validate commitments, settle institutional credits, govern shared
rules, and resolve disputes without treating one institution's mutable database as universal
truth.

Calling every database batch a state channel or rollup would be inaccurate. Those terms imply
defined proof, challenge, custody, and exit mechanics that PSDC has not adopted. The required
pattern is off-chain operational state with deterministic evidence and on-chain settlement.

## Decision

PSDC adopts three deliberately separated state planes:

1. **Operational plane:** PostgreSQL is the authoritative working state for offers, queues,
   reservations, placement decisions, leases, heartbeats, retries, and current credit
   reservations. A transactional outbox is committed in the same database transaction as
   every consequential transition.
2. **Evidence plane:** governed object storage holds signed usage receipts, measurement
   evidence, settlement manifests, inclusion proofs, dispute packages, and retention metadata.
   Objects are content-digested, access-controlled, and referenced rather than copied onto the
   ledger.
3. **Settlement plane:** an institution-controlled Cosmos SDK and CometBFT-derived ledger
   holds finalized batch commitments, balance deltas, provider obligations, governance,
   validator membership, dispute states, and corrective transactions.

The integration uses three compatible rhythms:

- continuous outbox events keep downstream projections and receipt workflows current;
- periodic deterministic batches settle routine usage efficiently; and
- consequential milestones, such as a dispute opening or governance decision, receive a
  prompt dedicated ledger transaction through the same idempotent submission boundary.

The ledger is not the scheduler database. PostgreSQL is not allowed to rewrite finalized
ledger history. A ledger-event projector maintains a queryable operational read model, while
the reconciliation service detects divergence and creates a corrective or dispute workflow.

## Canonical settlement batch

Each batch MUST contain or commit to:

| Field | Purpose |
|---|---|
| batch identifier and institution/federation scope | global uniqueness and authority |
| ordered sequence range and prior batch root | omission, reordering, and fork detection |
| canonicalization, schema, meter, price, and policy versions | deterministic replay |
| receipt count and Merkle root | inclusion and mutation proof |
| aggregate resource quantities and balance deltas | settlement transition |
| evidence object URI, digest, classification, and retention class | governed evidence retrieval |
| builder identity, signing-key identifier, time window, and signature | attribution and verification |
| dispute deadline and status | finality lifecycle |

Raw PostgreSQL transaction logs are not settlement proofs. Their representation is unstable,
may contain secrets or irrelevant records, and does not provide portable inclusion proofs.
The batch builder canonicalizes domain receipts and constructs a Merkle tree over those
receipts. The full manifest stays in the evidence plane; the ledger stores the commitment and
settlement result.

## Invariants

- **LEDGER-0031-001:** A business transition and its outbox record MUST commit atomically or
  neither may commit.
- **LEDGER-0031-002:** Every event, receipt, batch, and ledger submission MUST have a stable
  idempotency key and versioned producer identity.
- **LEDGER-0031-003:** A batch MUST be reproducible byte-for-byte from its retained canonical
  receipts, versions, and ordering rules.
- **LEDGER-0031-004:** A ledger commitment MUST NOT expose plaintext content, credentials,
  keys, private addresses, or unnecessary person identifiers.
- **LEDGER-0031-005:** Accepted workloads MAY continue through a bounded ledger outage under
  policy, but new discretionary commitments MUST stop when the credit-risk ceiling or evidence
  retention bound is reached.
- **LEDGER-0031-006:** Database and chain divergence MUST create a visible reconciliation
  exception; neither side may be silently overwritten.
- **LEDGER-0031-007:** Correcting finalized settlement requires a linked compensating
  transaction or resolved dispute, never deletion or in-place history mutation.

## Data and control flow

    API or scheduler
           |
           v
    PostgreSQL transaction ----> transactional outbox
           |                              |
           |                              v
           |                       event transport
           |                              |
           v                              v
    live read models              receipt and evidence builder
                                          |
                                          v
                                deterministic batch builder
                                  |                  |
                                  v                  v
                           evidence object      Merkle commitment
                                                     |
                                                     v
                                            Cosmos-derived ledger
                                                     |
                                                     v
                                           finalized-event projector
                                                     |
                                                     v
                                          reconciliation read model

## Failure and recovery behavior

| Failure | Required behavior |
|---|---|
| database transaction succeeds but event transport is down | outbox poller retries; no state is lost |
| duplicate event or chain submission | idempotency returns the original result |
| evidence object unavailable | batch is not finalized; alert and repair from retained receipts |
| ledger quorum unavailable | queue bounded submissions; preserve accepted lease execution; enforce risk ceiling |
| projector unavailable | ledger remains authoritative for finalized settlement; rebuild projection by replay |
| receipt disagrees with meter or lease | quarantine from ordinary settlement and open a dispute |
| canonicalization or schema changes | start a new version; old batches remain independently verifiable |
| signing key is compromised | halt batch signing, identify affected range, rotate, and use governance recovery |

## Alternatives and consequences

A database-only architecture is simpler but leaves federated settlement dependent on one
operator. A ledger-only scheduler increases latency, metadata exposure, replicated storage,
upgrade coordination, and quorum-related outages. Signed transparency logs are a viable exit
if operating a Cosmos-derived chain costs more than the federation trust problem warrants.

The accepted model adds batch building, evidence retention, projection, and reconciliation
services. In return, high-frequency operations remain fast and independently recoverable,
while cross-institution commitments gain deterministic verification and governance.

## Migration and rollback

Build the operational schema and transactional outbox first. Add canonical receipt generation
and offline batch replay next. Submit commitments to a single-institution test chain, then an
independent-validator test federation. Enforce balances only after replay, outage, privacy,
and dispute tests pass. Rollback pauses ledger submission and emits signed settlement exports;
it does not alter live operational leases or erase prior commitments.

## Binary acceptance criteria

- **LEDGER-0031-ACC-001:** killing the event transport after a committed database transition
  still results in exactly one effective downstream event after recovery;
- **LEDGER-0031-ACC-002:** two independent implementations produce the same canonical bytes,
  leaf hashes, Merkle root, totals, and balance deltas for the conformance fixture;
- **LEDGER-0031-ACC-003:** modifying, deleting, inserting, or reordering one receipt makes the
  batch commitment fail verification;
- **LEDGER-0031-ACC-004:** the scheduler meets its declared objective while ledger finality is
  unavailable and stops new discretionary risk at the configured bound;
- **LEDGER-0031-ACC-005:** a projector rebuild from genesis reproduces the accepted settlement
  read model;
- **LEDGER-0031-ACC-006:** a privacy audit finds no prohibited field in transactions, events,
  block data, or public indexer views;
- **LEDGER-0031-ACC-007:** a disputed receipt cannot reach ordinary final settlement until the
  state machine records an authorized resolution.

## References

- [Ledger and Operational Database Architecture](../../economics/Ledger-and-Operational-Database-Architecture.md)
- [Unified Institutional Resource Metering](ADR-0029-unified-institutional-resource-metering.md)
- [Scheduling Algorithm](../../campus-compute-fabric/Scheduling-Algorithm.md)
- [Storage Architecture](../../storage/Storage-Architecture.md)
