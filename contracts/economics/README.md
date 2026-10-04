# Settlement Contract Profile

> Standard: PSDC-DOC-001
> Document type: repository-index
> Status: D1 schema candidates; not a running ledger
> Owner: PSDC Economics and Platform Working Groups
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-29
> Governing decisions: ADR-0029, ADR-0031

## Purpose and contents

`settlement-batch.schema.json` commits an ordered receipt range, prior root, canonicalization and
policy versions, Merkle root, aggregates, balance deltas, evidence reference, dispute deadline,
and builder signature. `ledger-commitment.schema.json` records the Cosmos-derived submission or
finalized/rejected commitment without placing receipts or protected content on chain.
`dispute-case.schema.json` records append-oriented challenges, governed evidence, deadlines,
resolution, and optional compensating batches. Its executable lifecycle forbids mutation after
a terminal outcome.

## Allowed and prohibited contents

Cryptographic commitments, non-transferable IRU deltas, version identifiers, validator-set
digest, and governed evidence references are allowed. Raw receipts, personal identifiers,
credentials, content, keys, private addresses, and scheduler heartbeats are prohibited.

## Validation and change control

The root runner covers built/finalized and rejected records. Settlement implementation must
add RFC 8785 canonicalization vectors, Merkle inclusion/mutation tests, sequence and prior-root
continuity, evidence retrieval, idempotent chain
submission, projector replay, and quorum-loss behavior.

## References

- [Ledger and Operational Database Architecture](../../docs/economics/Ledger-and-Operational-Database-Architecture.md)
- [ADR-0031](../../docs/architecture/architecture-decision-records/ADR-0031-off-chain-operations-and-on-chain-settlement.md)
