# GPU Fabric


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative; subject-specific section is contract-backed, open questions listed
> Owner: PSDC Campus Compute Fabric Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance
> Domain: campus-compute-fabric

## Purpose and outcome

This specification defines **GPU Fabric** as part of the Post Secondary Digital
Commons. Its required outcome is institution-controlled heterogeneous campus compute with explicit capability, trust, scheduling, and preemption contracts. An implementation conforms
only when it satisfies this document, the linked ADRs, and the common
[Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md).

## Scope

- **In scope:** behaviour, interfaces, dependencies, data, security, deployment
  boundaries, capacity, failure handling, observability, validation, and lifecycle
  requirements for GPU Fabric.
- **Out of scope:** institution-specific hostnames, credentials, physical capacity,
  named operators, and legal approvals. Those values belong in signed institution
  deployment manifests and cannot redefine the common contract.
- **Authority:** the owning domain may make compatible implementation choices.
  Contract-breaking or cross-domain changes require an ADR and migration plan.

## Normative requirements

- **CCF-GF-001:** The GPU Fabric capability SHALL provide institution-controlled heterogeneous campus compute with explicit capability, trust, scheduling, and preemption contracts.
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

GPU Fabric is the part of the compute fabric that offers accelerator capacity. It adds no new contract. GPUs are described, matched and leased through the same capability, offer, placement and lease records as CPU capacity.

- **What a GPU looks like.** Each capability advertisement lists `accelerators` entries ([capability.schema.json](../../contracts/compute/capability.schema.json)): `kind` (gpu, npu, fpga), `modelClass`, `count`, `memoryBytes` and `partitioning` (none, mig, sriov, timeslice). Up to 16 entries per resource.
- **Who asks for one.** A workload manifest ([workload-manifest.schema.json](../../contracts/compute/workload-manifest.schema.json)) states resources and a `workloadClass`. `ai_inference` and `ai_service` are the classes that normally need accelerators; `backendPreferences` names acceptable runtime backends.
- **How it is granted.** A provider answers with an offer ([offer.schema.json](../../contracts/compute/offer.schema.json)), the scheduler records a placement decision, and the lease `allocatedResources` fixes exactly what was granted ([lease.schema.json](../../contracts/compute/lease.schema.json)).

- **CCF-GPU-010:** A lease SHALL NOT allocate more accelerator memory or devices than the advertisement `available` quantity at the time the offer was made.
- **CCF-GPU-011:** A partitioned device (`mig`, `sriov`, `timeslice`) SHALL be advertised and leased by its partition capability, not as a whole device, so two leases cannot silently claim the same hardware.
- **CCF-GPU-012:** GPUs on machines with `interactiveUserPresent` true SHALL be treated under the idle policy and are subject to drain; see [Preemption and Drain](Preemption-and-Drain.md).
- **CCF-GPU-013:** Usage on accelerators SHALL be reported through the signed usage receipt ([usage-receipt.schema.json](../../contracts/compute/usage-receipt.schema.json)) so metering and settlement do not depend on provider self-reporting alone.

**Not covered by the contracts yet (open questions).** Interconnect and topology between devices, which matters for multi-GPU and distributed inference; model-cache locality; driver and runtime version compatibility; and fairness between inference and batch work. These must be decided before multi-GPU scheduling. The first slice only needs single-node census and leasing.

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

