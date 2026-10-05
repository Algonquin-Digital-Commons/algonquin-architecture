# Network Contract Profile

> Standard: PSDC-DOC-001
> Document type: repository-index
> Status: D1 schema candidates; not a configured campus network
> Owner: PSDC Network Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-27
> Governing decisions: ADR-0026, ADR-0029

## Purpose and contents

`network-path.schema.json` advertises privacy-minimized zone-to-zone capacity, freshness,
transport, isolation, latency class, encryption, egress, and federation scope.
`network-reservation.schema.json` binds approved bandwidth and QoS to a workload lease with a
fencing generation and terminal revocation/failure reason.

## Allowed and prohibited contents

Zone identifiers and abstract capabilities are allowed. Campus address ranges, router secrets,
raw flow records, student identifiers, or sufficient topology to map private infrastructure are
prohibited from federation-facing contracts.

## Validation and change control

The root runner covers available, active, revoked, and unavailable records. A network
implementation must additionally verify current telemetry, bandwidth arithmetic, policy,
controller acknowledgement, release, QoS, partition, and recovery behavior.

## References

- [Network Architecture](../../docs/network/Network-Architecture.md)
- [Scheduling Algorithm](../../docs/campus-compute-fabric/Scheduling-Algorithm.md)

