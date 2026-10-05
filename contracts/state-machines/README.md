# Executable Lifecycle Tables

> Standard: PSDC-DOC-001
> Document type: repository-index
> Status: D1 contract candidates; not running controllers
> Owner: PSDC Architecture Maintainers and domain contract owners
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-04
> Governing decisions: ADR-0001, ADR-0031

## Purpose

Each `*.machine.json` file defines the legal state graph for a status-bearing contract. The
common state-machine schema binds the graph to the owning contract schema and JSON Pointer. The
validator requires exact enum parity, declared initial/terminal states, valid transition
endpoints, unique transition tuples, reachability from an initial state, and no outbound
transition from a terminal state.

## Runtime contract

An implementation must evaluate the named authorization action and guards against current
state, lock or compare-and-swap the expected generation where applicable, append the transition
and outbox event atomically, and return the prior result for an already-completed idempotency
key. The JSON table does not execute policy, lock a database, verify a signature, or prove that
the transition occurred.

Terminal evidence is immutable. Correction creates a linked new record, revision, dispute, or
compensating entry rather than reopening the terminal record. Some projections permit recovery
from unavailable/degraded state when a new, fresh, authorized observation arrives; that does
not rewrite the earlier signed observation.

## Coverage

The current tables cover provider, capability, offer, lease, usage receipt, storage placement,
network path, network reservation, KMS grant, key envelope, settlement batch, ledger
commitment, and dispute case. Custody/deletion, identity credential, production admission, and
future service lifecycles require their owning data contracts before a table can be added.
`state-transition-cases.json` supplies at least one allowed and one denied case for every current
machine, plus explicit idempotent replay cases for lease activation and batch submission.

## Allowed and prohibited contents

This directory belongs to the common contract portfolio. It may contain lifecycle tables,
schema bindings, conformance fixtures, and generated diagrams. It MUST NOT contain service
implementation code, site-specific policy, credentials, private topology, protected data,
database migrations, or undocumented transitions.

## Contents

- `provider.machine.json` and `capability.machine.json` — provider registry projections;
- `offer.machine.json`, `lease.machine.json`, and `usage-receipt.machine.json` — compute market,
  reservation, and metering lifecycles;
- `storage-placement.machine.json` — storage placement and repair projection;
- `network-path.machine.json` and `network-reservation.machine.json` — path and reservation state;
- `kms-operation-grant.machine.json` and `key-envelope.machine.json` — bounded key authority;
- `settlement-batch.machine.json`, `ledger-commitment.machine.json`, and
  `dispute.machine.json` — off-chain settlement, on-chain commitment, and correction lifecycle.

## Change control

A state addition, removal, changed terminal meaning, changed authorization action, or changed
guard is breaking unless compatibility analysis proves otherwise. Changes require positive,
denial, stale-generation, duplicate, timeout, replay, revocation, race, and recovery tests in
the implementing service.

## References

- [Shared Executable Contracts](../README.md)
- [Executable Contract Portfolio](../../docs/architecture/Executable-Contract-Portfolio.md)
- [Implementation Handoff Standard](../../docs/standards/Implementation-Handoff-Standard.md)
