# Preemption and Drain


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative; subject-specific section is contract-backed, open questions listed
> Owner: PSDC Campus Compute Fabric Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance
> Domain: campus-compute-fabric

## Purpose and outcome

This specification defines **Preemption and Drain** as part of the Post Secondary Digital
Commons. Its required outcome is institution-controlled heterogeneous campus compute with explicit capability, trust, scheduling, and preemption contracts. An implementation conforms
only when it satisfies this document, the linked ADRs, and the common
[Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for Preemption and Drain.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- **CCF-PAD-001:** The Preemption and Drain capability SHALL provide institution-controlled heterogeneous campus compute with explicit capability, trust, scheduling, and preemption contracts.
- The capability SHALL have a versioned configuration schema, explicit safe
  defaults, validation before activation, and a reversible change procedure.
- User-visible and administrative behaviour SHALL be accessible, explainable,
  auditable, and bounded by institution policy and user authority.
- An implementation SHALL expose only the minimum capability required by its
  callers and SHALL reject unknown, unauthorized, malformed, expired, or
  unsupported requests with stable machine-readable errors.
- Institution deployments SHALL be independently operable and SHALL remain
  compatible with the common contract and conformance suite.

## Subject-specific specification

Preemption and drain describe how running work is stopped or moved when a donor machine needs its resources back, is retired, or loses trust. The contracts already provide the building blocks.

- **Drain starts at the capability.** A capability moves `available -> draining` (`capability.drain`), then `draining -> unavailable`, or back to `available` if the drain is cancelled ([capability.machine.json](../../contracts/state-machines/capability.machine.json)). A draining resource takes no new leases.
- **Eviction ends at the lease.** The lease has no "preempting" state. A running lease ends through `active | renewal_pending -> released | expired | revoked | failed` ([lease.machine.json](../../contracts/state-machines/lease.machine.json)). Each ending requires a reason, is idempotent, and is fenced by the lease `generation`, so a stale controller cannot act on a lease that has already moved on.
- **What the workload asked for.** The manifest `schedule` carries `priority`, `preemptible`, `maxRuntimeSeconds` and `checkpointIntervalSeconds`; `retryPolicy` carries `maxAttempts`, backoff and `retryableReasonCodes` ([workload-manifest.schema.json](../../contracts/compute/workload-manifest.schema.json)).
- **What gets billed.** The usage receipt records an `outcome` of `preempted` (as well as succeeded, failed, cancelled, lost) so partial runs are metered honestly ([usage-receipt.schema.json](../../contracts/compute/usage-receipt.schema.json)).

- **CCF-PREEMPT-010:** Only a lease whose workload set `preemptible` true MAY be ended by an idle-policy or capacity eviction. Other leases end only by release, expiry, revocation for cause, or failure.
- **CCF-PREEMPT-011:** A preemptive end SHALL be recorded as a lease transition with a reason code, and the resulting usage receipt SHALL carry outcome `preempted`.
- **CCF-PREEMPT-012:** A controller SHALL supply the expected lease `generation` on every transition; a mismatch SHALL be rejected rather than applied.
- **CCF-PREEMPT-013:** Where a workload declares `checkpointIntervalSeconds`, the drain procedure SHALL allow time for one checkpoint before forced termination, bounded by the lease expiry.
- **CCF-PREEMPT-014:** A preempted workload is retried only if its `retryableReasonCodes` include the preemption reason and `maxAttempts` is not exhausted.
- **CCF-PREEMPT-015:** Revoking a provider or capability SHALL end its active leases through `lease.revoke` with a reason, and SHALL NOT silently drop them.

**Open questions.** (1) The contract has no distinct reason code or state for eviction for the owner's benefit versus revocation for cause, so billing and retry policy cannot yet tell them apart; a reason-code vocabulary is the smallest fix. (2) The grace period between drain notice and forced termination is not defined. (3) Checkpoint and migration mechanics belong to [Checkpoint and Migration](Checkpoint-and-Migration.md), which is a stub.

## Interfaces, APIs, events, and contracts

See [Interface controls](../architecture/Domain-Control-Profiles.md#campus-compute-fabric-profile); local extensions remain normative.

## Dependencies and ownership boundaries

Inherits [baseline ownership controls](../architecture/Cross-Cutting-Architecture-Requirements.md#ownership-and-dependency-boundaries).

## Data, state, residency, and retention

See [Data controls](../architecture/Domain-Control-Profiles.md#campus-compute-fabric-profile); local extensions remain normative.

## Security, privacy, safety, and compliance

See [Security controls](../architecture/Domain-Control-Profiles.md#campus-compute-fabric-profile); local extensions remain normative.

## Deployment, environments, and configuration

Inherits [baseline deployment controls](../architecture/Cross-Cutting-Architecture-Requirements.md#deployment-and-configuration).

## Capacity, scaling, cost, and sustainability

Inherits [baseline capacity controls](../architecture/Cross-Cutting-Architecture-Requirements.md#capacity-and-overload).

## Failure, recovery, and compatibility

See [Failure controls](../architecture/Domain-Control-Profiles.md#campus-compute-fabric-profile); local extensions remain normative.

## Observability, testing, and operational readiness

Inherits [baseline evidence controls](../architecture/Cross-Cutting-Architecture-Requirements.md#observability-and-evidence).

## Standards and implementation strategy

See [Standards controls](../architecture/Domain-Control-Profiles.md#campus-compute-fabric-profile); local extensions remain normative.

## Settled architecture constraints

- Commons Compute Fabric owns campus-specific enrollment, topology, trust, idle detection, scheduling, preemption, accounting, and integration.
- Execution engines remain plugins behind versioned job, capability, lifecycle, and result contracts.
- Any exception follows the adopt → extend → compatible fork → build hierarchy and requires an ADR with evidence.

## Decision traceability

- ADR-0001: Standards-First / Buy-Borrow-Build
- ADR-0005: Standard Platform Primitives
- ADR-0012: Tenant-Neutral Post-Secondary Digital Commons
- ADR-0013: Institution-First Federation Locality
- ADR-0016: Accepted Project Defaults
- ADR-0017: OpenTofu Default Infrastructure-as-Code Toolchain

## Acceptance criteria

Inherits [baseline acceptance gates](../architecture/Cross-Cutting-Architecture-Requirements.md#observability-and-evidence); every local requirement MUST also pass.

## References

- [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md)
- [Technology Defaults and Alternatives](../vision/13-Technology-Defaults-and-Alternatives.md)
- [Human Choices and Decisions Register](../governance/Human-Choices-and-Decisions-Register.md)
- [ADR-0001: Standards First](../architecture/architecture-decision-records/ADR-0001-standards-first-buy-borrow-build.md)
- [ADR-0012: Post Secondary Digital Commons](../architecture/architecture-decision-records/ADR-0012-post-secondary-digital-commons.md)
- [ADR-0017: OpenTofu Default](../architecture/architecture-decision-records/ADR-0017-opentofu-default.md)

