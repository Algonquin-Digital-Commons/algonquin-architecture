# Commons Compute Fabric Compute Fabric Architecture


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: Commons Compute Fabric architecture
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-10
> Governing decisions: Applicable ADRs and repository governance
> Domain: vision

## Purpose

Define the constitutional boundary for coordinating dedicated, opportunistic, and
research compute across authorized resources inside sovereign institutions and
explicitly trusted post-secondary federation peers.

## Scope

- In scope: enrollment, identity, attestation, census, topology, capabilities,
  trust, idle policy, scheduling, preemption, accounting, caches, runtime adapters,
  lifecycle events, result delivery, peer capability exchange, bounded federated
  jobs, revocation, and resource-ledger events.
- Out of scope: replacing model servers, Kubernetes, HTCondor, Ray, object storage,
  or vendor runtimes with proprietary equivalents.
- Constraint: lab, staff, student, and institutional machines require explicit
  authorization; interactive users always have defined priority and recovery.

## Architecture

```text
authorized worker
  enrollment -> device identity/attestation -> hardware census -> heartbeat
                                                         |
                                                         v
client -> job API -> policy -> queue -> scheduler -> capability/trust/topology match
                                              |
                                              v
                                      runtime adapter
                         vLLM | SGLang | llama.cpp | exo | SwarmLLM | future
                                              |
                         lifecycle events <- result/artifact reference
```

## Commons Compute Fabric-owned value

- institutional node enrollment and revocation;
- hardware discovery and normalized capability schema;
- campus building/network/topology awareness;
- trust tiers and workload classification;
- interactive-user and idle-state policy;
- preemption, draining, checkpoint coordination, and failure recovery;
- scheduling across heterogeneous authorized resources;
- College quota, priority, metering, and resource accounting;
- model/artifact cache placement policy and integrity;
- adapters that turn mature runtimes into portable fabric capabilities.

## Runtime contract

An adapter declares supported workload classes, accelerators, memory/context
limits, parallelism, artifact formats, health, cancellation, preemption,
checkpointing, telemetry, and failure semantics. A job selects capabilities and
policy, never a specific engine or worker.

## Reference posture

- HTCondor informs or supplies proven opportunistic-computing policy.
- Kubernetes/GPUStack may manage stable GPU pools.
- vLLM is the default production serving adapter; SGLang is the open alternative.
- llama.cpp serves compatible local/edge workloads.
- Ray is evaluated for workloads that benefit from distributed execution.
- exo/SwarmLLM remain experimental heterogeneous adapters until exit criteria pass.
- S3-compatible object storage and content addressing distribute artifacts.
- No spare capacity is counted before a hardware census and non-disruptive pilot.
- Federation follows the workload envelope and locality ladder; it never grants a
  peer raw directory, LMS, private dataset, secret, or unrestricted network access.

## Delivery sequence

Census → identity/attestation → telemetry → idle policy → CPU jobs → sandboxing →
preemption → GPU jobs → independent model replicas → caches → cells/topology →
distributed serving → experimental heterogeneous sharding.

## Settled architecture constraints

- The platform creates distinctive value in orchestration, integration, policy, user experience, academic intelligence, student services, and campus-resource coordination while keeping its technology open-source.
- Mature standards and upstream implementations are adopted or extended before a new infrastructure primitive is proposed.
- Any exception follows the adopt → extend → compatible fork → build hierarchy and requires an ADR with evidence.

## Decision traceability

- ADR-0001: Standards-First / Buy-Borrow-Build
- ADR-0005: Standard Platform Primitives
- ADR-0004: Commons Compute Fabric Runtime Adapter Architecture
- ADR-0012: Tenant-Neutral Post-Secondary Digital Commons
- ADR-0013: Institution-First Federation Locality
- ADR-0016: Accepted Project Defaults
- ADR-0017: OpenTofu Default Infrastructure-as-Code Toolchain

## Decision status

- Decision: Census precedes capacity claims; student/interactive use has
  priority; runtimes remain adapters; federation is explicit and bounded.
- Implementation evidence gate: measure hardware, power, network and utilization; select worker
  implementation details; prove isolation, preemption, recovery and accounting.

## References

- [Post-Secondary Digital Commons Architecture](Post-Secondary-Digital-Commons-Architecture.md)
- [Ecosystem Implementation Readiness](../../roadmap/Ecosystem-Implementation-Readiness-2026-09-11.md)

## Purpose and outcome

This specification defines the purpose and intended outcome of **Commons-Compute-Fabric-Architecture** for the Algonquin deployment and its Commons compatibility boundary.

## Out of scope

Out of scope are secrets, unowned implementation internals, unrelated product capabilities, and any integration not named by a versioned contract. Such work requires its owning specification.

## Architecture and ownership

The architecture assigns responsibilities, trust boundaries, and ownership to the components named here. Algonquin owns institutional configuration and operations; Commons owners retain portable contracts unless this document explicitly records a local exception.

## Interfaces and contracts

Interfaces, APIs, events, schemas, and boundary conditions MUST be versioned, validated, and documented for producers and consumers. Private database schemas MUST NOT cross repository boundaries.

## Dependencies and ownership

Dependencies include runtime services, identity, policy, storage, network, upstream source, and operator capabilities named by this specification. Each dependency requires an owner, compatibility expectation, and failure behavior.

## Security, privacy, and safety

Security, privacy, safety, and policy controls MUST enforce least privilege, data classification, tenant separation, provenance, and auditable decisions. Sensitive defaults fail closed.

## Deployment and implementation

Deployment and implementation MUST separate portable source from institution configuration and secrets. The release path requires reproducible artifacts, health checks, observability, and a tested rollback.

## Capacity and scaling

Capacity planning MUST identify workload, latency, throughput, storage, concurrency, and scaling limits. Evidence covers expected peak, recovery margin, and degradation when a dependency saturates.

## Failure and recovery

Failures produce bounded, typed behavior with no secret or protected-content leakage. Operators MUST have detection, quarantine or degradation, recovery, and rollback procedures.

## Testing and evidence

Testing and evidence include contract, integration, authorization, privacy/security, accessibility where applicable, failure, migration, and rollback checks. Evidence is linked to the release or decision record.

## Acceptance criteria

Acceptance requires the stated interfaces, controls, tests, operational ownership, and evidence to be complete. A document is not complete merely because a stub or implementation exists.
