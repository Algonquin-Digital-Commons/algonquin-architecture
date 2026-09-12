# Source Decision Import — Compute Fabric Architecture Comparison

> Standard: PSDC-DOC-001
> Document type: architecture-map
> Status: Proposed import
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-12
> Governing decisions: ADR-0001, ADR-0005, ADR-0012, ADR-0013, ADR-0016, ADR-0017

> Source: `ChatGPT-Compare compute architectures-20260912-0658.md`
> Source SHA-256: `CC0C3EA62EF1FEE731047C907020CFCFC8200E8BC2744D2143A8634E9198F13A`
> Source location at review: `C:\Users\jredj\Downloads`
> Import reviewed: 2026-09-12

## Purpose and source authority

This record extracts useful Compute Fabric mechanisms from a user-supplied
conversation export. The export is design input, not an instruction source and
not a normative PSDC authority. Its references, performance claims, product
ideas, costs, protocols, and feasibility statements remain unverified until the
owning specification or ADR validates them against primary sources.

The source uses the name “D-Central.” This import translates only compatible
architecture patterns into Post Secondary Digital Commons terminology; it does
not import that name, business model, organization, or product scope.

## Reviewed scope and boundaries

The review covers heterogeneous compute, scheduling, worker lifecycle, topology,
artifact distribution, trust, execution adapters, reconciliation, and
institution-to-institution federation. It excludes the source's proposed
cryptocurrency, marketplace, consumer hardware business, smart-city platform,
custom operating system, ASIC company, and global product catalog.

- **IMPORT-CF-001:** A candidate in this record MUST NOT become normative until
  it is incorporated into its owning specification or an accepted ADR.
- **IMPORT-CF-002:** An imported pattern MUST preserve institutional sovereignty,
  standalone operation, open-source replaceability, and the common-versus-local
  boundary.
- **IMPORT-CF-003:** Product-specific protocols may inform adapters but MUST NOT
  become the portable Compute Fabric semantics without a separate compatibility
  and lifecycle decision.

## High-value mechanisms to adopt

| Mechanism | PSDC interpretation | Why it matters |
|---|---|---|
| Resource, capability, and implementation separation | A physical or virtual resource exposes versioned capabilities through one or more replaceable implementations | Prevents hardware inventory, callable behavior, and runtime products from becoming one unstable schema |
| Capability offering | A time-bounded advertisement binds capability, provider, resource constraints, locality, trust, availability, quality, and policy | Describes what can actually be selected now without changing the stable capability definition |
| Hard constraints followed by explainable scoring | The resolver eliminates non-conforming candidates before the scheduler ranks eligible candidates deterministically | Makes residency, security, trust, data classification, and hardware requirements non-negotiable |
| Lease-based allocation | Reservation and allocation use renewable, expiring, revocable leases rather than a `busy` flag | Provides recovery when workers disappear and prevents ambiguous or permanent allocation state |
| Explicit lifecycle machines | Node, resource, offering, lease, workload, checkpoint, and outcome each have normal and exceptional states | Makes retries, cancellation, drain, revocation, reconciliation, and evidence testable |
| Desired-state reconciliation | Controllers compare desired with observed state and issue bounded operations until convergence or terminal failure | Supports long-lived services and recovery rather than modeling everything as a one-shot task |
| Control-plane/data-plane separation | Control services authorize, resolve, allocate, and observe; payloads flow directly through execution and artifact paths where policy permits | Keeps the central control plane out of protected or high-volume payload paths |
| Causal event chain | CloudEvents-compatible records carry correlation, causation, policy, lease, workload, artifact, attestation, and outcome references | Answers why work ran, what authorized it, where it ran, and what evidence it produced |
| Minimal bidirectional worker | A node can consume and provide resources; the worker remains a small agent with identity, heartbeat, inventory, execution adapters, lease handling, telemetry, and attestation | Avoids building a custom operating system and supports campus machines, servers, and personal opt-in nodes consistently |
| Execution-adapter contract | OCI containers, WASM, VMs, native processes, accelerator runtimes, and future backends implement one bounded executor interface | Prevents “workload” from meaning “Kubernetes container” and keeps runtimes replaceable |
| Content-addressed artifacts | Semantic artifact identity and version are separate from immutable digest and available providers | Allows OCI, S3-compatible storage, local caches, HTTPS, and optional P2P distribution behind one integrity model |
| Initial and continuous verification | Enrollment proves an initial claim; recurring challenge, telemetry, and attestation prove the capability remains trustworthy | Treats trust as expiring evidence rather than a permanent enrollment label |
| Hierarchical cells and failure domains | Node → cell → campus zone → institution → federation summarizes topology and contains failures | Avoids a flat global scheduler, registry, or network graph while supporting local decisions and federation |
| Relational authority with graph projections | Transactional state remains in an ordinary authoritative store; topology and discovery graphs are rebuildable projections | Prevents an early graph-database choice from becoming protocol semantics |
| Conformance-first vertical | Prove a small CPU/GPU workload across two or three nodes before advanced swarming, economics, agents, or custom hardware | Produces measurable evidence for the abstractions before expanding scope |

## Required semantic model

The conversation exposes a useful separation that is currently absent from the
Compute Fabric suite:

```text
Resource
  └── exposes Capability
        └── realized by Implementation
              └── advertised as Offering
                    └── selected for Request
                          └── committed by Lease
                                └── executes Workload
                                      └── produces Outcome + Evidence
```

These objects have different owners and lifetimes:

| Object | Stable meaning | Typical mutable state |
|---|---|---|
| Resource | Allocatable CPU, GPU, memory, storage, network, accelerator, or execution slot | Health, capacity, isolation state, topology, temperature |
| Capability | Versioned callable behavior and input/output contract | Compatibility and deprecation status |
| Implementation | Runtime or backend that realizes a capability | Version, artifact digest, configuration, readiness |
| Offering | Provider assertion that a capability is presently available under stated constraints | Availability, price or quota, locality, trust evidence, expiry |
| Request | Required capability plus hard constraints, preferences, budget, deadline, priority, and policy context | Submitted, resolved, rejected, cancelled |
| Lease | Time-bounded authority to consume a resource quantity | Offered, reserved, active, renewed, expired, released, revoked |
| Workload | Concrete execution bound to an implementation, lease, artifacts, and policy decision | Queued, staging, running, checkpointing, completed, failed, cancelled |
| Outcome | Terminal result and its evidence | Succeeded, failed, partially completed, rejected, indeterminate |

## Resolver and scheduler boundary

The source correctly distinguishes eligibility from optimization:

```text
Request
  → policy and schema validation
  → hard filtering
  → feasible candidates
  → explainable scoring
  → lease attempt
  → placement result or stable rejection
```

Hard filters include capability/schema compatibility, resource availability,
data classification, residency, trust tier, isolation class, artifact support,
deadline feasibility, and authorization. An ineligible candidate never receives
a compensating score. Ranking may consider latency, locality, queue time, energy,
reliability, cost, cache affinity, fragmentation, and user preference. The first
implementation should use deterministic rules and publish a decision trace; an
AI model may advise future optimization but MUST NOT define scheduling safety or
authorization correctness.

## Cell hierarchy and locality

The reusable insight is hierarchy, not the source's particular mesh protocols or
suggested node counts. PSDC should model:

```text
worker → cell → campus zone → institution → federated institution
```

A cell owns fast-changing local membership, health, cache, capacity, queue, and
failure response. Institution control aggregates cell summaries and retains
policy authority. Federation exchanges bounded offerings and requests rather
than exposing every worker or requiring a global scheduler. Actual cell size and
network technology are measured deployment choices; they are not universal
architecture constants.

## Controller and event semantics

One-shot work follows request → resolution → lease → execution → outcome.
Long-lived capacity follows desired state → observed state → difference →
controller operation → new observed state. Controllers MUST be idempotent,
bounded, observable, and authorized; reconciliation stops at a terminal or
operator-required condition rather than retrying forever.

Significant transitions emit versioned events with event ID, source, subject,
time, actor or workload identity, correlation ID, causation ID, schema version,
policy decision, evidence reference, and redacted domain payload. The event log
is not automatically the source of truth: each owning specification must state
whether events are notification, audit evidence, or authoritative event-sourced
state.

## Prior-art patterns to adapt

The named projects are reference lineages, not mandatory dependencies:

| Reference lineage | Pattern to adapt | Boundary not to import |
|---|---|---|
| Kubernetes | Desired/observed reconciliation and controller behavior | Kubernetes object models as universal PSDC semantics |
| Golem | Provider/requestor symmetry and pluggable execution units | Mandatory Yagna protocol or economic network |
| Akash | Request/order, agreement, lease, and provider lifecycle | Blockchain, token, auctions, or Kubernetes-only deployments |
| IPFS/IPLD | Content identity independent of storage location | Requiring IPFS for every artifact or protected dataset |
| libp2p | Optional peer transport, discovery, addressing, and NAT traversal | Making libp2p identifiers or DHT state the common capability contract |
| Storj/Filecoin | Challenge, audit, repair, initial proof, and continuing proof concepts | Specialized storage cryptography generalized to compute |
| Sigstore, in-toto, and TUF | Artifact identity, build provenance, signing transparency, and secure update roles | One hosted transparency or trust service as a required institution dependency |
| HTCondor | Campus batch scheduling, matchmaking, claims, ClassAds, and preemption lineage | Replacing the Commons contract with HTCondor internals |

Every reference requires primary-source verification, licensing review, current
maintenance assessment, and an adapter or standards decision before adoption.

## Deferred research

The following ideas may become capability types or research adapters but are not
part of the first Compute Fabric baseline:

- FPGA, CGRA, DPU, SmartNIC, structured-ASIC, and custom-ASIC execution;
- hardware bitstream distribution and partial reconfiguration;
- energy- and carbon-aware placement beyond collecting bounded telemetry;
- opportunistic personal or volunteer nodes beyond the existing restricted
  trust-tier design;
- P2P discovery beyond institution-managed local and federated discovery;
- cross-institution bidding, pricing, accounting settlement, or resource markets;
- topology-aware predictive optimization;
- custom Linux distributions, kernels, operating systems, or device firmware.

Research adapters MUST NOT delay the CPU/GPU campus vertical or weaken workload,
artifact, network, privacy, and physical-safety controls.

## Rejected as baseline architecture

- A global control plane that owns participating institutions or their workers.
- One flat routing, discovery, registry, or scheduling domain for all nodes.
- AI-generated policy, authorization, routing correctness, or safety decisions.
- A blockchain, token, auction, or marketplace requirement for campus allocation.
- Arbitrary workloads or FPGA bitstreams on classroom, staff, or personal devices.
- Treating enrollment, reputation, or network presence as permanent trust.
- Treating all hardware as interchangeable or assuming every workload can move.
- Making a custom operating system or custom silicon a prerequisite.
- Streaming every application as video when a result, remote interaction, or
  hybrid client protocol is more appropriate.

## Mapping to the Compute Fabric suite

| Owning document | Required change from this import |
|---|---|
| `Campus-Compute-Fabric-Architecture.md` | Define semantic objects, planes, hierarchy, standalone institution authority, and the first vertical |
| `Node-Capability-Schema.md` | Separate resource, capability, implementation, offering, evidence freshness, and provider identity |
| `Scheduling-Algorithm.md` | Define validation, hard filtering, scoring, explanation, lease acquisition, retry, and rejection semantics |
| `Compute-Cells.md` | Define cell membership, summaries, gateway responsibility, split/merge policy, and failure containment |
| `Worker-Agent-Specification.md` | Define the minimal bidirectional node, executor plugins, local policy enforcement, and control/data paths |
| `Worker-Lifecycle.md` | Define enrollment, verification, availability, drain, suspension, revocation, retirement, and recovery states |
| `Workload-Classification.md` | Define isolation, data, trust, hardware, deadline, checkpoint, preemption, locality, and network classes |
| `Trust-Tiers.md` | Replace permanent labels with evidence requirements, expiry, continuous verification, and allowed workload classes |
| `Content-Addressed-Cache.md` | Separate semantic artifact ID, version, digest, provider, cache state, provenance, and deletion behavior |
| `Checkpoint-and-Migration.md` | Bind checkpoint compatibility, integrity, ownership, retention, and resumption to workload and lease state |
| `Topology-Discovery.md` | Define worker, cell, campus zone, institution, and federation summaries without exposing unnecessary topology |
| `Preemption-and-Drain.md` | Bind lease revocation, grace, checkpoint, interactive-user return, compensation, and terminal outcome |
| `Node-Enrollment-and-Attestation.md` | Separate initial enrollment proof from recurring capability and posture verification |
| `Distributed-Inference-Backend-Interface.md` | Generalize the executor/backend boundary without hiding model-specific capability and topology requirements |
| `HTCondor-Interoperability.md` | Map Commons requests, offerings, leases, and outcomes to HTCondor without making it the canonical state model |

The rewrite should also introduce focused specifications for capability offerings
and leases, controller reconciliation, event causality, execution adapters, and
institution-federated compute exchange if those responsibilities cannot remain
clear in the mapped owners.

## Dependencies and relationship semantics

Compute Fabric consumes institution identity, authorization policy, artifact
integrity, secrets, network reachability, storage, telemetry, and deployment
contracts. It provides bounded resource offerings and execution outcomes to AI,
media, research, and other workload owners. No relationship in this record
authorizes shared databases, cross-institution administrative control, direct
provider credentials, or bypass of an owning contract.

## Source of truth and references

The source of truth remains the accepted ADRs and the rewritten Compute Fabric
specifications. This import preserves provenance and disposition only. Relevant
current authorities include:

- [Cross-Cutting Architecture Requirements](Cross-Cutting-Architecture-Requirements.md)
- [Domain Control Profiles](Domain-Control-Profiles.md#campus-compute-fabric-profile)
- [Commons Compute Fabric Architecture](../campus-compute-fabric/Campus-Compute-Fabric-Architecture.md)
- [Specification Completeness Standard](Specification-Completeness-Standard.md)

## Validation, staleness, and contradiction handling

This map becomes stale when its source hash, mapped Compute Fabric documents,
accepted ADRs, or reference-lineage assessment changes. Adoption requires stable
requirements and tests in each owner, common-to-Algonquin synchronization, and a
semantic audit showing the rewritten specifications are no longer title-only
clones. Any conflict is resolved in favor of accepted PSDC ADRs and institutional
sovereignty; a deliberate change requires a superseding ADR.

