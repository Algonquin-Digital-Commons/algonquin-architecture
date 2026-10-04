# Policy-Gated Market Resolver and Scheduling Algorithm

> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: PSDC Campus Compute Fabric Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: ADR-0010, ADR-0013, ADR-0026, ADR-0028, ADR-0029

## Purpose and measurable outcomes

This specification defines how PSDC finds the best safe execution and storage plan across
Kubernetes, OpenStack, Slurm, task workers, service-placement providers and storage tiers.
It uses reverse offers and published scoring in a marketplace-like process while preserving
institutional authority. The outcome is not merely the cheapest placement: it is the
lowest evaluated cost among providers that satisfy every hard identity, policy, data,
production, capacity and network constraint.

Required outcomes are deterministic eligibility, explainable ranking, bounded decision
latency, atomic lease/credit reservation, backend-native execution and reconciled receipts.

## Mental model and its limit

The market resembles an exchange in that providers publish capacity and terms, requesters
publish demand, a clearing process matches them, and a transparent record explains the
match. It does **not** resemble an equity market: providers are not companies in which
students invest, credits are not ownership or speculative securities, and a low price never
buys permission to handle protected data. The more accurate model is a policy-gated
procurement market with verifiable resource leases.

## Scope and prohibited responsibilities

The resolver owns candidate construction, bid solicitation, multi-objective ranking,
placement plans, resource leases and decision evidence. Backend schedulers still own
node-level execution:

- Kubernetes owns pod/service reconciliation inside an eligible cluster;
- OpenStack owns VM, volume and tenant-network lifecycle;
- Slurm owns allocation, gang scheduling and backfill inside an eligible HPC partition;
- the task fabric owns DAG dispatch, retry and work stealing;
- the storage controller owns shard/replica placement and repair.

The resolver MUST NOT mint identity, override authorization, release data keys, inspect
plaintext, edit academic/official records or use price to weaken hard constraints.

## Out of scope

Backend node-level scheduling, cryptographic key custody, application authorization and
institutional records authority are outside the market resolver.

## Logical architecture and API boundary

The resolver is a control-plane service between the classifier/registries and backend
adapters. Its public contract is the request, offer, decision, lease and receipt API; backend
private databases and scheduler-specific APIs stay behind adapters.

## End-to-end hierarchy

    1. Validate and authenticate the workload manifest.
    2. Authorize requester, project, action, data and provider scope.
    3. Classify execution shape, criticality and storage/network needs.
    4. Select the backend family or authorized hybrid graph.
    5. Build the provider universe from fresh capabilities.
    6. Hard-filter policy, trust, residency, production, license and path constraints.
    7. Solicit bounded reverse offers from the remaining providers.
    8. Normalize offers and compute risk-aware evaluated cost.
    9. Solve placement and failure-domain constraints.
    10. Reserve capacity, network path, storage placement and credits atomically.
    11. Issue a signed lease and delegate execution to the backend scheduler.
    12. Measure, verify, receipt, reconcile and periodically commit settlement.

Steps 1–6 are safety gates. Steps 7–9 optimize. An optimizer can choose only among the set
produced by the gates.

## Contracts

### Provider capability advertisement

A signed advertisement contains provider ID, owner institution, trust and production tier,
backend types, resource vectors, accelerators, software/driver versions, network and storage
adjacency, failure domains, residency, attestation, availability window, evidence freshness,
minimum/maximum lease and offer endpoint. It expires automatically.

### Reverse offer

An offer contains request digest, provider, resource bundle, earliest start, expected finish,
duration, unit price and ceiling, performance confidence, energy/carbon signal, network
path estimate, storage locality, reliability/SLO commitment, preemption terms, collateral or
institutional guarantee if required, and expiry. Offers are signed and bound to one request.

### Placement decision

A decision contains the eligible and rejected sets with reason codes, normalized inputs,
algorithm and weight versions, winning and runner-up scores, sensitivity band, selected
backend/provider/path/storage plan, resource reservation, credit hold and override if any.

### Lease and receipt

The lease is a non-transferable authorization to use named resources under bounded terms.
It is not the identity credential or data key. The receipt records measured native units,
normalized Institutional Resource Units, evidence digests, completion status, variance,
charges/refunds and dispute state.

## Algorithms by stage

### Hard-constraint engine

Use a constraint-satisfaction model. A provider is eligible only if all required predicates
are true: authorization, provider scope, trust, production certification, data residency,
backend capability, software/image/license, capacity, time window, network reachability,
storage/key compatibility and budget preauthorization. OPA may evaluate policy; a solver
such as OR-Tools may evaluate compound capacity/topology constraints. A false or unknown
mandatory predicate rejects the provider before bidding.

### Reverse auction

Use a sealed-bid, multi-attribute reverse auction by default:

1. publish a request digest and bounded requirements to eligible providers;
2. accept signed offers until the deadline;
3. reject expired, infeasible or non-conformant offers;
4. normalize attributes against the request and current catalogue;
5. select the lowest evaluated cost, not necessarily the lowest nominal price;
6. publish an authorized decision trace after clearing.

Initial settlement is pay-as-bid because it is easier to audit. A second-price or
VCG-derived mechanism MAY be piloted only after simulation shows reduced strategic gaming
and finance/legal review accepts the semantics.

### Multi-objective evaluated cost

For eligible provider p, compute:

    score(p) =
        w_cost * normalized_total_cost
      + w_start * normalized_queue_or_start_delay
      + w_finish * normalized_expected_completion
      + w_network * normalized_path_cost
      + w_data * normalized_data_movement_cost
      + w_energy * normalized_energy_or_carbon_cost
      + w_risk * normalized_failure_and_trust_risk
      + w_fragment * normalized_fragmentation_penalty
      - w_locality * normalized_locality_benefit

Weights are selected from a versioned workload-class profile, not chosen by a provider.
Hard SLO, deadline and risk limits remain predicates, not weights. The decision records raw
values, normalization bounds and sensitivity: if small weight changes flip the winner, the
result is marked low-confidence and may require a stable tie-breaker.

### Placement solvers

| Problem | Default algorithm | Reason |
|---|---|---|
| single service/VM/provider | filtered multi-attribute reverse auction | one bundle, explainable ranking |
| multi-resource packing | mixed-integer/constraint programming, then best-fit decreasing fallback | CPU, RAM, GPU, storage and affinity are multidimensional |
| many requests and providers | min-cost max-flow or auction matching in bounded batches | globally reduces cost and fragmentation |
| fair project sharing | Dominant Resource Fairness above reserved floors | prevents one project monopolizing its dominant resource |
| task DAG | HEFT-style earliest-finish ranking plus locality and work stealing | heterogeneous task durations and dependencies |
| tightly coupled HPC | Slurm multifactor priority, reservations, gang scheduling and backfill | native topology and MPI semantics |
| Kubernetes service | PSDC chooses eligible cluster/provider; Kubernetes scheduler places pods | preserves reconciliation and plugin ecosystem |
| OpenStack VM | PSDC chooses eligible cloud/aggregate; Nova placement selects host | preserves VM lifecycle and inventory semantics |
| storage shards/replicas | constrained min-cost flow or CRUSH-like deterministic failure-domain placement | balances locality, independence, repair and cost |
| network path | constrained shortest path over k candidates | rejects paths lacking trust, capacity or latency before price |

The first implementation MAY use deterministic heuristics when exact solving exceeds the
decision deadline. It must record the optimality gap or heuristic reason and cannot bypass
hard constraints.

## Dynamic placement for critical services

Dynamic placement applies to critical services only within a production-certified set:

- capacity is reserved before normal auction demand;
- replicas span independent power, network, storage and control-plane failure domains;
- stateful movement requires replication/restore evidence and a change window;
- maximum move frequency and disruption budget are enforced;
- a stable last-known-good placement remains available;
- no opportunistic lab, volunteer, public or newly federated provider can bid;
- a market outage cannot evict or stop an accepted critical lease.

This gains utilization and fault-aware rebalancing without making an essential service
chase momentary prices. Applying unrestricted placement would increase correlated failure,
data movement, cache churn, unstable latency, complex incident ownership and exposure to
bad bids. Therefore critical optimization is constrained portfolio rebalancing, not day
trading.

## Network-aware best path

The network controller exports abstract edges with available bandwidth, latency, loss,
trust zone, egress class, monetary/credit cost, energy signal and freshness. It does not
expose private topology to ordinary users. The resolver:

1. calculates k shortest candidate paths;
2. removes paths violating segmentation, trust, egress, capacity or latency constraints;
3. includes remaining path cost and data-movement time in provider scoring;
4. reserves the selected path/QoS class with the compute/storage lease;
5. releases or renews it atomically with the lease.

No flat Layer-2 extension between institutions is required. Federation normally uses
application gateways over mTLS, optionally protected by WireGuard.

## Tokenized evidence model

| Record or token | What it proves | What it never proves |
|---|---|---|
| capability assertion | provider claimed measured capacity at a time | future availability or authorization |
| offer | provider committed stated terms for a request | identity or right to use data |
| credit reservation | budget is held for a lease | permission to execute |
| compute lease | named resource use is authorized under terms | access to object keys |
| storage placement token | tier/provider/custody obligation exists | bearer retrieval right |
| network reservation | path/QoS capacity is reserved | application authorization |
| usage receipt | measured work and accounting outcome | result correctness unless verification is attached |
| ledger commitment | a batch of records existed and was settled | live scheduler state |

Tokens are signed records with identifiers, scopes, expiries and revocation state. Protected
content and usable secrets are never token payloads.

## State ownership and consistency

PostgreSQL is authoritative for requests, offers, decisions, leases, holds, live provider
state and idempotency. NATS JetStream carries versioned events; Valkey may accelerate
expiring capability and queue views but is never sole authority. Backend state is reconciled
through adapters. Periodic Merkle roots and settlement batches may be committed to the
institution ledger. Exactly-once execution is not assumed; mutations are idempotent and
receipts deduplicate by workload, lease, attempt and measurement interval.

## Failure and dependency matrix

| Dependency/failure | Timeout and behavior | Degraded mode |
|---|---|---|
| identity/policy unavailable | fail closed for new lease | accepted leases follow expiry policy |
| capability registry stale | exclude stale provider | use fresh smaller set |
| offer endpoint slow | bounded auction deadline; no late bid | clear with remaining offers |
| optimizer deadline exceeded | deterministic safe heuristic | record suboptimal flag |
| credit service uncertain | no new discretionary lease | reserved critical lease may renew by emergency policy |
| ledger unavailable | queue commitments | scheduler continues from operational database |
| backend accepts then response is lost | reconcile by idempotency key | do not create duplicate workload |
| network reservation fails | try next fully scored plan | never execute across an unapproved path |
| provider disappears | expire lease, checkpoint/retry/fail over by class | charge only verified usage |
| receipt disagreement | quarantine settlement and open dispute | preserve raw telemetry |

## Security, privacy and market-integrity controls

- authenticated providers and signed, nonce-bound, expiring offers;
- sealed bids until close and role-limited post-clear visibility;
- rate limits, deposits/guarantees where institutionally approved, and penalties for
  repeated non-delivery;
- anomaly detection for collusion, capability inflation, identity splitting and bid spam;
- reproducible scoring, no hidden provider-specific preference, and recorded overrides;
- subject and object pseudonyms in economic records; content and keys excluded;
- separation of policy author, provider operator, market operator and dispute approver.

## Capacity, performance and observability

The institution manifest declares auction window, scheduling p95/p99, solver deadline,
maximum queue age, lease-renewal margin and receipt-lag objective per class. Metrics include
eligible-set size, rejection reasons, bid spread, solver time, optimality gap, win rate,
estimate error, locality, data moved, preemption, failed leases, reconciliation variance,
market concentration and manual overrides. Decision traces are queryable by authorized
requesters and auditors.

## Alternatives and trade-offs

- **Lowest price only:** transparent but unsafe and prone to poor quality.
- **Central static priority queue:** predictable but wastes heterogeneous/federated supply.
- **One global exact optimizer:** theoretically efficient but slow, fragile and difficult to
  operate; PSDC uses hierarchy and bounded batches.
- **Public blockchain for every transition:** tamper-evident but too slow, expensive and
  privacy-revealing for hot-path state.
- **Backend-only scheduling:** operationally mature but cannot optimize across backends,
  storage, network and institutions.

## Implementation sequence, migration and rollback

1. implement schemas and a replayable decision simulator;
2. ingest capability data and shadow-score historical workloads;
3. enable internal non-production sealed offers with no credit enforcement;
4. calibrate native receipts and advisory budgets;
5. enable leases for opportunistic tasks, then services/VMs/HPC;
6. add storage and network reservations;
7. add production-certified and federated pools only after failure exercises.

Rollback stops new market clears, retains signed evidence, continues already accepted
leases, and restores the last accepted static/backend-native policy. Outstanding usage is
reconciled; rollback never deletes a liability or custody record.

## Binary acceptance criteria

- **CCF-SA-ACC-001:** a cheaper provider failing any hard predicate cannot enter ranking;
- **CCF-SA-ACC-002:** replaying the same snapshot, policy, weights and algorithm version
  returns the same eligible set, scores, winner and reason codes;
- **CCF-SA-ACC-003:** Kubernetes, OpenStack, Slurm, task and service-placement fixtures
  produce common leases/receipts while retaining native metrics;
- **CCF-SA-ACC-004:** auction, optimizer, ledger and one backend can each fail independently
  with the documented degraded behavior and no duplicate lease;
- **CCF-SA-ACC-005:** a critical three-replica service never co-locates inside a declared
  failure domain and continues during market unavailability;
- **CCF-SA-ACC-006:** an authorized reviewer can reconstruct every decision input, rejection,
  score, override, lease, measurement and settlement without accessing protected content;
- **CCF-SA-ACC-007:** adversarial bid-spam, false-capability, collusion and strategic
  underestimation simulations trigger bounded rejection or investigation controls.

## References

- [Workload Classification](Workload-Classification.md)
- [Compute Fabric Architecture](Campus-Compute-Fabric-Architecture.md)
- [Compute Fabric Economics](../economics/Campus-Compute-Fabric-Economics.md)
- [Storage Architecture](../storage/Storage-Architecture.md)
- [Network Architecture](../network/Network-Architecture.md)
- [ADR-0029](../architecture/architecture-decision-records/ADR-0029-unified-institutional-resource-metering.md)
