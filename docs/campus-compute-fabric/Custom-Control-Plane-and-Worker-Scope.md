# Compute Fabric Custom Control Plane and Worker Scope

> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Proposed
> Owner: PSDC Campus Compute Fabric Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-14
> Governing decisions: ADR-0001, ADR-0004, ADR-0005, ADR-0012, ADR-0013, ADR-0016, ADR-0017, ADR-0026, ADR-0030

## Purpose and measurable outcome

This specification scopes the PSDC-specific code that remains after mature
open-source frameworks are composed beneath the Compute Fabric. It is intended
to prevent both extremes: building a scheduler, container runtime, identity
provider, policy language, registry, and telemetry system from scratch; or
gluing projects together without a coherent authority, lifecycle, or security
model.

The first implementation is successful when an authorized user can submit an
approved OCI workload, the control plane can select one eligible CPU/GPU node
deterministically, acquire a fenced lease without over-allocation, supervise the
execution, recover from node loss, and return a traceable outcome and usage
record.

The reference proof uses one administrative domain and two or three trusted
nodes. Federation, arbitrary public workers, payments, specialized hardware,
and general-purpose multi-domain coordination are not part of the first
executable release.

## Stakeholders and use cases

| Actor | Need | Authorized interaction |
|---|---|---|
| Student or member | Run an approved batch/inference task within assigned quota | submit, inspect, cancel, retrieve permitted result/evidence |
| Instructor or project owner | Define approved workload templates and project quota | approve template through governed workflow; inspect project usage |
| Compute operator | Enroll, drain, quarantine, diagnose, and retire nodes | operator API/CLI under institution policy |
| Security operator | Revoke identity/artifact/policy, investigate execution | security API, evidence export, emergency stop |
| Institution platform | Offer managed capacity without giving up authority | resource/offering API and local policy |
| Backend adapter | Execute a lease through containerd, HTCondor, Kubernetes, or Slurm | internal versioned executor interface only |
| Federation peer | Later exchange minimized signed offerings, requests, and evidence | excluded from v0 implementation; separate contract required |

Primary use cases:

1. Submit an approved CPU batch job by immutable OCI digest.
2. Submit an approved single-node GPU inference or batch job.
3. Reject a request for locality, authorization, quota, artifact, isolation, or
   hardware mismatch with stable reasons.
4. Cancel queued or running work with documented race behavior.
5. Drain a worker because a classroom user returned or an operator initiated
   maintenance.
6. Expire and recover a lease after worker loss.
7. Reconstruct why a node was selected and what executed.

## Scope

### In scope

- institution-neutral Compute Fabric contracts and reason catalog;
- modular institution-local control-plane reference implementation;
- one outbound-connecting node supervisor for managed Linux workers;
- PostgreSQL schema, migrations, transactions, and transactional outbox;
- OIDC authentication adapter and OPA policy-decision adapter;
- resource, capability, implementation, offering, request, lease, workload,
  outcome, evidence, and usage lifecycles;
- deterministic hard filtering, scoring, and stable tie-breaking;
- direct OCI/containerd executor;
- immutable artifact verification and approval binding;
- REST/OpenAPI user/operator API and one CLI;
- internal mTLS worker-control protocol;
- OpenTelemetry instrumentation and semantic evidence records;
- failure, race, security, contract, adapter, and conformance fixtures; and
- extension interfaces for HTCondor, Kubernetes/Kueue, Slurm, and inference
  runtimes without implementing all of them in v0.

### Out of scope for v0

- inter-institution federation and shared identity trust;
- public, anonymous, or arbitrary personal workers;
- multi-node distributed jobs, gang scheduling, or MPI;
- multiple active scheduler backends;
- WASM, VM, native-binary, FPGA, CGRA, ASIC, DPU, or SmartNIC executors;
- payments, auctions, rewards, tokens, billing, or settlement;
- global P2P discovery or mandatory IPFS;
- LLM interpretation of requests or AI authorization;
- a graph database, event-sourced authority, or global event broker;
- a custom container runtime, kernel, hypervisor, cryptographic protocol,
  identity provider, policy language, registry, or telemetry protocol;
- web, desktop, and mobile user interfaces; and
- institution-specific hostnames, keys, capacity, retention values, and named
  operators, which belong in signed deployment profiles.

### Prohibited responsibilities

The custom code MUST NOT:

- store or validate human passwords;
- mint an institutional human identity;
- parse and execute arbitrary shell commands from a request;
- allow a score to override a hard policy or capability failure;
- treat telemetry, message-broker state, or backend status as the authoritative
  PSDC lease ledger;
- give a remote client direct containerd, Kubernetes, HTCondor, Slurm, registry
  administrator, or host credentials;
- expose detailed worker topology across an institution boundary;
- require a specific backend object in the common request schema;
- continue a workload after its fencing authority is invalid; or
- claim that an artifact signature, node identity, or successful execution
  establishes the truth or safety of a result.

## System invariants

- **CCF-CUSTOM-001:** Every accepted mutation MUST carry an authenticated actor,
  institution context, authorization decision, idempotency key, correlation
  identifier, and auditable result.
- **CCF-CUSTOM-002:** A candidate that fails any hard constraint MUST NOT enter
  scoring or receive a lease.
- **CCF-CUSTOM-003:** Given the same canonical request, policy revision,
  candidate snapshot, scoring configuration, and tie-break seed, resolution MUST
  produce the same ordered candidates and explanation.
- **CCF-CUSTOM-004:** Authoritative capacity and lease mutation MUST be atomic;
  concurrent transactions MUST NOT allocate more than an offering's available
  quantity.
- **CCF-CUSTOM-005:** Each successful lease acquisition MUST issue a monotonically
  increasing fencing generation scoped to the allocatable resource.
- **CCF-CUSTOM-006:** A worker or adapter MUST reject start, renew, checkpoint,
  result, or completion operations carrying an older fencing generation than the
  highest generation it has durably observed for that resource/workload.
- **CCF-CUSTOM-007:** A workload MUST NOT start unless its lease is active, its
  artifact digest is approved for the requested workload/isolation class, and
  the worker has revalidated the command and policy-bound execution manifest.
- **CCF-CUSTOM-008:** A workload MUST have at most one authoritative terminal
  outcome. Late or contradictory backend messages MUST be retained as anomalies
  without rewriting the terminal result.
- **CCF-CUSTOM-009:** Institution-local operation MUST remain possible when
  optional federation, broker, graph, search, or hosted services are unavailable.
- **CCF-CUSTOM-010:** Every external contract MUST be versioned; unsupported
  versions MUST fail with a stable compatibility error rather than silent field
  loss.
- **CCF-CUSTOM-011:** Secret values MUST NOT appear in request records, decision
  traces, events, logs, metrics, outcomes, or CLI output.
- **CCF-CUSTOM-012:** A backend adapter MUST reconcile its external objects after
  restart before accepting new mutations for an ambiguous workload.
- **CCF-CUSTOM-013:** Control-plane time is authoritative for lease validity;
  worker clocks are evidence inputs and MUST NOT extend a lease independently.
- **CCF-CUSTOM-014:** Every terminal outcome MUST reference request, policy
  decision, resolver decision, lease, workload, artifact digest, backend
  execution, and evidence identifiers or explicitly record why a reference is
  unavailable.
- **CCF-CUSTOM-015:** A required evidence write failure MUST fail closed before
  execution when the missing evidence would prevent proving authorization,
  artifact identity, lease authority, or terminal disposition.

## Logical architecture

```text
                       USER / OPERATOR PLANE

                 CLI or authorized service client
                              │
                         REST + OpenAPI
                              │
                              ▼
┌───────────────────────────────────────────────────────────────┐
│ PSDC COMPUTE CONTROL PLANE — modular monolith                  │
│                                                               │
│ API/auth context ──> request service ──> policy adapter        │
│                              │                 │               │
│                              ▼                 ▼               │
│ resource/capability <── offering ──> deterministic resolver   │
│                                           │                   │
│                                           ▼                   │
│                                    lease manager              │
│                                           │                   │
│                                           ▼                   │
│ operation reconciler ─────────────> executor adapter          │
│          │                                │                   │
│          ▼                                ▼                   │
│ outcome/evidence <──────────────── backend observation        │
│          │                                                    │
│ usage normalizer                transactional outbox          │
└──────────┼──────────────────────────────┬─────────────────────┘
           │                              │
           └────────── PostgreSQL ────────┘
                                          │ optional publication
                                          ▼
                                  CloudEvents transport

                         WORKER / DATA PLANE

control plane <── outbound mTLS session ── node supervisor
                                                │
                  artifact store ───────────────┤
                                                ▼
                                      containerd / OCI runtime
                                                │
                                                ▼
                                        result destination
```

The modular monolith is a deployment decision, not permission for modules to
share undocumented tables. Each module has an owner, repository interface, and
explicit commands/events so it can be tested or extracted later.

## Component responsibilities

### Contract package

Owns:

- OpenAPI 3.1 document for external HTTP operations;
- JSON Schemas for domain objects, policy input/output, evidence, and errors;
- Protobuf schema for the internal worker stream if selected;
- CloudEvents types and AsyncAPI document when asynchronous publication begins;
- semantic versions, compatibility matrix, canonicalization rules, examples,
  negative fixtures, and generated documentation;
- stable reason-code registry; and
- backend adapter service-provider interface.

Does not own implementation classes, database tables, OPA Rego, deployment
values, or institution-specific claims.

### API and authentication context

Owns:

- TLS termination assumptions and trusted proxy rules;
- OIDC token verification through the accepted identity adapter;
- institution/tenant, subject, groups, scopes, assurance, and delegation context;
- request size, rate, timeout, content type, and version validation;
- idempotency-key reservation and canonical request hash;
- correlation/trace identifiers;
- stable error envelope; and
- authorization call before invoking a mutating domain command.

It does not decide placement or translate backend-specific objects.

### Resource registry

Owns durable identity and lifecycle for a physical/virtual worker and its
allocatable resource partitions. It records owner institution, failure domain,
locality classification, management class, hardware identifiers allowed by
privacy policy, lifecycle status, latest accepted inventory version, and
evidence freshness.

Inventory is observed state. A heartbeat may update health and capacity but may
not silently change the resource's institution owner, trust class, or approved
execution profiles.

### Capability catalog

Owns versioned callable behavior such as `oci.batch/v1` or
`inference.text-generation/v1`. It defines input/output contract, compatible
implementations, deprecation, required resource features, checkpoint/preemption
semantics, and evidence requirements.

A capability is not current availability. It remains stable while an offering
may appear, change, or expire.

### Implementation registry

Owns the runtime/backend realization of a capability: executor type and version,
artifact/runtime compatibility, configuration digest, supported isolation
profiles, readiness evidence, and lifecycle status.

The registry stores references and verified metadata, not runtime secrets.

### Offering service

Owns time-bounded provider assertions that a resource can presently supply a
capability through an implementation. An offering includes quantities,
availability window, locality, trust/isolation class, preemption/checkpoint
terms, usage-metering units, expiry, provider policy references, and health
freshness.

An offering automatically becomes ineligible when expired, suspended, drained,
quarantined, stale, or backed by an unavailable implementation/resource.

### Request service

Owns canonical request validation, immutable requested capability, hard
constraints, soft preferences, deadline, priority, maximum duration, requested
quantity, artifact/input references, output destination, isolation class,
network profile, policy context reference, and cancellation state.

It returns stable rejection reasons for schema, identity, authorization,
artifact, quota, or unsupported capability failures before resolution.

### Policy adapter

Owns translation of validated PSDC facts into the versioned OPA policy input and
translation of the decision into:

- allow/deny;
- mandatory constraints;
- maximum resource/duration limits;
- permitted isolation and network profiles;
- obligation identifiers;
- stable reason codes;
- policy bundle revision; and
- decision identifier.

It enforces a bounded timeout and fails closed. It must not allow Rego or
external data to mutate authoritative domain state.

### Deterministic resolver

Owns the pure placement calculation. It receives an immutable canonical request,
policy decision, candidate offering snapshot, scoring profile/version, and
tie-break material. It returns an ordered candidate list and explanation but
does not itself mutate capacity.

Required algorithm:

```text
validate immutable inputs
→ enumerate active offerings for requested capability version
→ evaluate every hard constraint in stable reason-code order
→ retain only eligible candidates
→ normalize each configured soft metric using versioned rules
→ compute integer/fixed-point score; prohibit floating nondeterminism
→ sort by score descending
→ apply stable tie-break tuple
→ return ordered candidates, rejected candidates, and trace hash
```

Default tie-break tuple:

```text
(provider-institution-id, resource-id, offering-id)
```

If a candidate loses capacity before lease acquisition, the allocator attempts
the next already-ranked eligible candidate using the same snapshot policy. A
materially changed request, policy, or candidate set requires a new resolver
decision, not mutation of the old trace.

### Lease and capacity manager

Owns the authoritative allocation transaction. For each attempted candidate it:

1. locks or conditionally updates the capacity record;
2. rechecks offering status, expiry, health threshold, policy-bound quantity,
   and unallocated capacity inside the transaction;
3. increments the resource fencing generation;
4. inserts the lease with issue, activation, expiry, renewal, and grace values;
5. reserves capacity;
6. appends the causal outbox/evidence records; and
7. commits all changes atomically or none.

Renewal requires the active lease identifier, current fencing generation,
authenticated worker/adapter identity, observed workload state, and a request
before the renewal deadline. Renewal cannot exceed request, offering, policy,
maintenance, or maximum-duration bounds.

Release, expiry, and revocation are idempotent. Capacity becomes reusable only
after the authoritative transition commits. A late worker completion never
reactivates or extends an expired lease.

### Operation/workload reconciler

Owns desired versus observed execution state. It claims bounded reconciliation
work from PostgreSQL, issues idempotent adapter commands, records observations,
advances valid state transitions, schedules retry with bounded backoff, and
stops at terminal or operator-required states.

The reconciler must distinguish:

- command accepted versus workload started;
- worker unreachable versus workload proven stopped;
- cancellation requested versus cancellation confirmed;
- lease expired versus backend process terminated;
- workload succeeded versus result/evidence successfully committed; and
- retryable infrastructure failure versus deterministic workload failure.

### Executor adapter manager

Owns adapter registration, health, capability declaration, command timeouts,
circuit breaking, version negotiation, and backend mapping ledger. It does not
permit an adapter to write lease or outcome tables directly.

Every adapter implements:

```text
DescribeCapabilities
ValidateExecution
Prepare
Start
Observe
Cancel
Checkpoint       (optional, explicitly unsupported in v0)
CollectUsage
CollectEvidence
Cleanup
Reconcile
```

Commands carry command ID, workload ID, lease ID, fencing generation, deadline,
expected prior state, and canonical execution-manifest hash. Adapter responses
carry command ID, backend execution ID, observed state/version, reason code,
timestamps, usage, evidence references, and retry classification.

### Artifact approval service

Owns the binding between an immutable digest and the workload classes for which
it is approved. It records registry, media type, platform, signature/provenance
verification, SBOM and vulnerability-policy result, license result, approving
actor/workflow, isolation/network limits, approval expiry, and revocation.

It delegates storage and scanning to Harbor and cryptographic verification to
Cosign-compatible tooling. It does not infer safety from a signature.

### Outcome and evidence service

Owns immutable terminal outcome creation and evidence references. It validates
the causal chain, records success/failure/cancel/lost/indeterminate reason,
output manifest digest, exit information allowed by policy, usage summary,
backend identity, anomaly flags, and evidence retention class.

Large logs, artifacts, or results remain in approved object storage. The
database stores bounded metadata and integrity references.

### Usage normalizer

Owns conversion from backend measurements into versioned units such as CPU
core-seconds, wall-clock seconds, peak bytes, GPU device-seconds, input/output
bytes, and storage byte-seconds where measured. It records source, sampling
interval, completeness, uncertainty, and transformations.

Usage is initially for quota, capacity analysis, and evidence. It is not a
financial invoice or settlement record.

### Transactional outbox publisher

Owns publication of already committed semantic events. It claims unpublished
outbox records in bounded batches, publishes with at-least-once delivery, records
attempt and acknowledgement state, and retries with jittered backoff. Consumers
deduplicate using the event identifier.

In v0 the outbox may be inspected or delivered by a simple PostgreSQL worker.
NATS JetStream is introduced only when at least one real asynchronous consumer
exists. Publication failure never rewrites the originating domain transaction.

### Operator CLI

Owns human-readable and JSON output for:

- login/context inspection;
- node enroll/list/describe/drain/quarantine/revoke/retire;
- capability and offering list/describe;
- artifact approval inspection;
- workload submit/list/describe/cancel;
- decision explanation;
- lease inspection and authorized revocation;
- outcome/evidence export; and
- adapter health and reconciliation status.

The CLI calls only documented APIs. It does not read the database or backend
administrator socket directly.

## Node supervisor scope

The node supervisor is PSDC-owned glue around mature runtime and telemetry
components. It is not a new operating system or scheduler.

### Supervisor modules

| Module | Owned behavior | Delegated behavior |
|---|---|---|
| Bootstrap/enrollment | consume one-time token, create local key, request node credential, bind expected resource identity | CA signs credential |
| Secure session | initiate outbound mTLS connection, negotiate version, rotate credentials, reconnect with backoff | TLS/SPIFFE libraries perform cryptography |
| Inventory | normalize approved CPU, memory, storage, GPU, runtime, topology, and isolation facts; sign/version report | OS/runtime/vendor collectors obtain raw facts |
| Heartbeat | send health, availability, active leases, pressure, interactive-user status, and monotonic sequence | OTel carries separate telemetry |
| Fence store | durably remember highest accepted generation per resource/workload | local durable filesystem or embedded store persists it |
| Command guard | verify identity, signature/channel, deadline, lease, generation, expected state, manifest hash, artifact approval, and local policy | control plane supplies authorized command |
| Artifact stage | fetch by digest, enforce size/timeout, verify digest/signature/approval, prepare read-only input | Harbor/OCI client transfers blobs |
| Executor supervisor | translate approved manifest to containerd request, apply isolation/cgroup/network/volume policy, start and monitor | containerd/runtime creates processes and namespaces |
| Cancellation/drain | stop accepting work, signal workload, enforce grace, kill if policy permits, confirm cleanup | runtime delivers signals/termination |
| Usage/evidence | collect bounded runtime and OS measurements and sign/hash evidence envelope | runtime/OS exposes raw measurements |
| Cleanup | remove secrets, writable layers, temporary inputs, network state, and stale runtime objects | runtime snapshotter/GC performs deletion |
| Self-update | verify signed release, stage, health-check, activate, rollback | package manager/system service manages files/process |

### Worker control protocol

The worker initiates the connection so campus firewalls do not require an
inbound listener on every node. The reference protocol is mTLS HTTP/2 with
versioned Protobuf messages; an HTTPS long-poll implementation may be used for
the first proof if it passes the same ordering, duplicate, timeout, and fencing
fixtures.

Required message families:

| Direction | Message | Required semantics |
|---|---|---|
| Worker → control | `Hello` | node ID, protocol versions, credential ID, boot/session ID, highest command sequence |
| Control → worker | `Welcome` | accepted version, control epoch, heartbeat interval, maximum message size |
| Worker → control | `InventoryReport` | monotonic inventory version, canonical hash, approved fields, evidence freshness |
| Worker → control | `Heartbeat` | session sequence, health, pressure, availability, active lease generations |
| Control → worker | `PrepareWorkload` | command/lease/workload IDs, generation, deadlines, manifest hash, artifact approval |
| Worker → control | `Prepared` | validated/rejected, local reason, resolved runtime/artifact facts |
| Control → worker | `StartWorkload` | expected prepared state, start deadline, same lease generation and manifest hash |
| Worker → control | `WorkloadObservation` | monotonic observation sequence, backend ID, state, usage/evidence delta |
| Control → worker | `CancelWorkload` | target generation, reason, grace, terminal expectation |
| Control → worker | `Drain` | new-work cutoff, active-work policy, deadline |
| Control → worker | `Revoke` | credential/resource revocation and stop policy |
| Worker → control | `CommandResult` | command ID, applied/already-applied/rejected, reason and state |

Every command is idempotent. The worker persists the result of recent command
IDs for at least the configured maximum retry window. Messages arriving out of
order cannot lower the observed fencing generation or move a terminal workload
back into an active state.

### Local execution manifest

The control plane sends a canonical manifest, not a shell string. It includes:

- schema version and manifest hash;
- immutable artifact digest and platform;
- entrypoint/arguments from an approved template plus bounded parameters;
- environment variable names and non-secret values permitted by schema;
- opaque secret references and mount targets;
- CPU, memory, device, process, disk, and wall-time limits;
- isolation profile;
- network profile and allowed destinations;
- read-only inputs and bounded writable/output mounts;
- output manifest and maximum result size;
- user/group/capability/seccomp settings;
- lease ID, fencing generation, request/workload/policy identifiers;
- logging and evidence limits; and
- cancellation/checkpoint behavior.

Unknown fields are rejected unless the negotiated schema explicitly permits
forward-compatible preservation. Privileged mode, host PID/network namespace,
arbitrary host mounts, unrestricted devices, and container runtime sockets are
prohibited in v0.

## External API surface

All endpoints are rooted at `/compute/v1`. Exact schemas belong in the contract
repository; this table establishes ownership and behavior.

| Method and path | Purpose | Idempotency/authorization |
|---|---|---|
| `POST /requests` | validate and submit workload request | required idempotency key; requester policy |
| `GET /requests/{id}` | inspect request and rejection/resolution status | requester/project/operator visibility |
| `POST /requests/{id}:cancel` | request cancellation | idempotent; owner or delegated operator |
| `GET /decisions/{id}` | retrieve redacted eligibility/score explanation | policy-filtered visibility |
| `GET /workloads/{id}` | inspect desired/observed lifecycle | requester/project/operator visibility |
| `GET /workloads/{id}/outcome` | retrieve terminal outcome metadata | same plus result policy |
| `GET /workloads/{id}/evidence` | retrieve/export allowed evidence manifest | evidence scope and classification policy |
| `GET /offerings` | discover locally visible eligible capability offerings | visibility policy; no private topology leakage |
| `GET /capabilities/{name}/{version}` | inspect capability contract | authenticated or public per catalog policy |
| `POST /operator/nodes:begin-enrollment` | mint bounded one-time enrollment challenge | compute operator |
| `POST /operator/nodes/{id}:drain` | stop new work and handle active work | compute operator; idempotent |
| `POST /operator/nodes/{id}:quarantine` | remove offerings and contain active work | security/compute operator |
| `POST /operator/nodes/{id}:revoke` | revoke credential/resource authority | security operator; elevated confirmation |
| `GET /operator/leases/{id}` | inspect allocation and fencing evidence | compute/security operator |
| `POST /operator/leases/{id}:revoke` | revoke active lease under policy | compute/security operator; idempotent |
| `GET /operator/adapters` | inspect adapter versions/health/backlog | compute operator |

Responses use a stable error envelope:

```json
{
  "type": "https://spec.psdc.example/errors/compute/policy-denied",
  "title": "Request denied by institution policy",
  "status": 403,
  "code": "CCF_POLICY_DENIED",
  "detail": "Redacted human-readable explanation",
  "correlation_id": "...",
  "retryable": false,
  "reasons": ["DATA_RESIDENCY_UNSATISFIED"]
}
```

The final hostname is an institution deployment value; `psdc.example` uses the
reserved `.example` documentation domain and MUST NOT be deployed as an endpoint.

## Data model and authority

| Entity | Authority | Mutable lifecycle | Retention/export requirement |
|---|---|---|---|
| `Resource` | resource registry | pending, active, draining, offline, quarantined, revoked, retired | durable identity and audit; export JSON |
| `CapabilityDefinition` | capability catalog | proposed, active, deprecated, retired | retain all referenced versions |
| `Implementation` | implementation registry | registered, ready, unavailable, deprecated, revoked | retain while referenced plus audit period |
| `Offering` | offering service | draft, active, suspended, expired, withdrawn | retain decision-referenced snapshot/hash |
| `Request` | request service | accepted, resolving, waiting, resolved, rejected, cancelling, cancelled | institution policy; user export of permitted record |
| `PolicyDecision` | policy adapter/evidence service | immutable | retain with request/outcome; redact protected inputs |
| `ResolverDecision` | resolver/evidence service | immutable | retain candidate snapshot/hash and reasons |
| `Lease` | lease manager | proposed, active, revoking, released, expired, revoked | retain authoritative transition history |
| `Workload` | operation service | accepted, preparing, prepared, starting, running, cancelling, finalizing, terminal/indeterminate | retain lifecycle and backend mapping |
| `Outcome` | outcome service | immutable terminal record | retain/export per workload/evidence class |
| `UsageRecord` | usage service | append/correct through superseding record | retain units/source/uncertainty; no destructive rewrite |
| `ArtifactApproval` | artifact service | pending, approved, suspended, expired, revoked | retain approval and revocation evidence |
| `OutboxEvent` | owning transaction | pending, publishing, published/dead-letter | retain until delivery/evidence policy permits purge |

Every row carrying institution-controlled data includes institution identifier,
classification, created/updated timestamps, schema version, and actor or source.
Database row-level security may provide defense in depth but does not replace
application authorization.

### Data classification

- **Public:** capability definitions explicitly approved for publication.
- **Internal:** aggregate offerings, non-sensitive operational configuration.
- **Confidential:** user/project requests, node inventory, usage, detailed
  decisions, topology, logs, and operator actions.
- **Restricted:** secrets, credential material, protected datasets, security
  evidence, vulnerability details, and sensitive identity attributes.

Restricted values are referenced, not copied, wherever possible. Federation is
not permitted to export confidential or restricted fields until a later
minimized disclosure contract and institutional agreement exist.

## Control flows

### Request-to-outcome

```text
1. API authenticates actor and validates version/idempotency.
2. Request service canonicalizes and persists accepted request.
3. Artifact service confirms immutable approval and applicable restrictions.
4. Policy adapter obtains allow/deny, constraints, obligations, and revision.
5. Resolver snapshots active eligible offerings.
6. Resolver hard-filters, scores, sorts, and writes immutable decision trace.
7. Lease manager atomically acquires capacity and fencing generation.
8. Operation service creates workload and desired PREPARED state.
9. Adapter/worker validates manifest, lease, artifact, and local policy.
10. Control plane commands START only after PREPARED evidence.
11. Worker emits monotonic observations and bounded usage/evidence.
12. Reconciler handles completion, cancellation, expiry, or loss.
13. Outcome service commits one terminal outcome and output manifest.
14. Lease manager releases capacity; cleanup remains reconciled until confirmed.
15. Outbox publisher distributes committed semantic events.
```

### Cancellation race

Cancellation is an intent, not immediate proof of process termination:

```text
cancel accepted
   → desired state CANCELLING
   → stop command with current fence
   → worker/backend acknowledgement
   → runtime exit observed
   → output/evidence policy applied
   → outcome CANCELLED or documented competing terminal result
   → lease release
```

If successful completion commits before cancellation, the outcome remains
`SUCCEEDED` and the cancellation result reports `ALREADY_TERMINAL`. If the
cancellation transition commits first but the workload later reports success,
the owning state-transition table determines whether output is retained as
cancelled evidence or accepted as success; this rule must be fixed before code.
The proposed v0 rule is that a confirmed successful exit observed before the
runtime receives cancellation may succeed; otherwise the terminal result is
cancelled and late success is an anomaly.

### Node loss

```text
missed heartbeat threshold
   → node SUSPECTED_OFFLINE; no new offerings eligible
   → attempt session/adapter observation
   → lease renewal deadline passes
   → lease EXPIRED with new fence reserved for recovery
   → workload LOST or retry-eligible by request policy
   → capacity becomes eligible only under resource recovery policy
   → returning worker presents observed active processes and stored fences
   → stale process is terminated/quarantined before new work
```

A returned node is not automatically trusted merely because it reconnects.

## Dependency and ownership matrix

| Dependency | Direction and data | Necessity | Timeout/failure behavior | Owner |
|---|---|---|---|---|
| Institution OIDC/Keycloak | control plane validates token/claims | required for user operations | deny new authenticated operation; existing workloads continue | Identity domain |
| OPA | policy input → decision/revision/reasons | required for new authorization | short timeout, fail closed, no lease | Policy domain + Compute adapter |
| PostgreSQL | all authoritative domain state/outbox | required | reject mutations; workers continue only within valid leases; reconcile after recovery | Compute operations |
| CA/step-ca | enrollment/rotation/revocation | required for node trust | deny new enrollment; existing cert valid only until expiry/revocation | PKI owner |
| Harbor/OCI registry | digest metadata and artifact blobs | required for staging uncached artifact | bounded retry; do not start without verified digest | Developer platform/storage |
| Cosign verifier | signature/provenance result | required by artifact policy | fail artifact admission closed | Supply-chain owner |
| containerd/runc | local execution lifecycle | required on direct OCI worker | mark adapter degraded; contain/observe existing process; no new start | Node operator |
| Object/result store | inputs/outputs/evidence blobs | workload dependent | stage/finalize retry; terminal outcome may be failed or indeterminate | Storage domain |
| OpenTelemetry Collector | telemetry export | operationally required, not lease authority | buffer/drop per classification; alert; never fabricate evidence | Observability owner |
| NATS | optional semantic-event delivery after v0 | optional | outbox accumulates; domain transaction remains committed | Integration owner |
| HTCondor/Kubernetes/Slurm | backend execution state through adapter | optional | circuit open; offerings suspended; reconcile active work | Backend owner |

No dependency may read another component's database directly. Cross-domain
access uses versioned APIs, events, or content references.

## Failure matrix

| Failure | Detection | Required behavior | Evidence/pass boundary |
|---|---|---|---|
| Duplicate `POST /requests` | repeated idempotency key | return original result if canonical hash matches; conflict if body differs | one request and no duplicate lease |
| Invalid/expired OIDC token | token validation | reject before domain mutation | stable auth reason; no request row except security audit as policy permits |
| OPA timeout/unhealthy | client deadline/health | fail closed; do not score or lease | `CCF_POLICY_UNAVAILABLE`; zero capacity mutation |
| Policy changes during resolution | revision mismatch | complete only with recorded revision if still valid by policy, otherwise restart resolution | decision references exact policy revision |
| PostgreSQL unavailable | connection/transaction error | reject mutation; worker leases continue only to existing bounded expiry | no acknowledged uncommitted operation |
| Concurrent lease attempts | row conflict/conditional update | one wins; losers try next candidate or wait | capacity never negative/overcommitted |
| Outbox publisher crash | stale claim/attempt | another publisher retries; consumers deduplicate | domain state retained; eventual delivery after recovery |
| Event broker unavailable | publish error | retain outbox and back off | no rollback of committed request/lease; backlog alert |
| Worker heartbeat late | session timer | suspend new offering eligibility, then follow node-loss flow | no new placement after threshold |
| Worker reconnect with stale fence | generation comparison | reject stale activity; terminate/quarantine stale workload | no late result changes terminal state |
| Duplicate start command | command ledger | return already-applied with same backend ID | one runtime process |
| Artifact digest mismatch | local hash verification | delete/quarantine staged blob; fail workload before execution | zero user code executed |
| Artifact approval revoked before start | local/control recheck | reject start and terminate staged state | revocation reason in outcome |
| Artifact approval revoked while running | policy-defined incident path | continue, checkpoint, or terminate according to severity; never silently ignore | operator/security event and terminal explanation |
| Runtime start failure | containerd response/observation | bounded retry only if no process exists and request permits | no duplicate process; explicit reason |
| Runtime process exits nonzero | observed exit | workload failed; collect bounded logs/evidence; release lease after cleanup policy | terminal failure with exit evidence |
| Result upload fails | transfer timeout/checksum | retry within lease/finalization bound; otherwise failed or indeterminate | never report success without required result manifest |
| Cancellation races completion | transition compare-and-set | exactly one terminal outcome under documented precedence | race test repeated without divergent authority |
| Control-plane restart | process health/reconciler startup | rebuild from PostgreSQL; reconcile non-terminal work before unsafe mutation | no lost active lease or duplicate start |
| Adapter restart | missing session/backend mapping | query backend, compare expected state, mark ambiguous work operator-required if necessary | no guessed completion |
| Clock skew | timestamp/sequence checks | use server expiry; flag worker skew; quarantine above configured bound | worker cannot self-extend lease |
| Worker disk full | local health/staging error | stop new offering; fail preparation; protect existing workload evidence where possible | no partial artifact executed |
| Node user returns | idle policy signal | drain; graceful cancel/checkpoint if supported; enforce deadline; restore interactive priority | no new work and documented preemption outcome |
| Telemetry unavailable | exporter health/backpressure | preserve authoritative evidence; degrade noncritical telemetry; alert | lease correctness unaffected |
| Secret retrieval fails | secret provider error | do not start; erase partial material | secret absent from logs and writable leftovers |
| Unknown protocol version | negotiation | reject session/command with supported versions | no partial interpretation |
| Node credential revoked | revocation check/session close | disconnect, suspend offerings, follow active-work security policy | no renewal with revoked credential |

## Security, privacy, and abuse controls

### Trust boundaries

```text
Internet/campus user
        │ untrusted request and token
        ▼
API boundary
        │ validated identity, schema, authorization
        ▼
Control-plane domain
        │ signed/fenced execution command over mTLS
        ▼
Node supervisor boundary
        │ constrained OCI manifest
        ▼
Sandbox/runtime boundary
        │ bounded artifact/input/output paths
        ▼
Workload code — always treated as potentially faulty
```

Threats include malicious or compromised users, stolen tokens, compromised
workers, malicious artifacts, runtime escape, confused-deputy adapters, replayed
commands, forged usage, stale leases, result substitution, topology disclosure,
denial of service, log/metric exfiltration, dependency compromise, and operator
error.

Required controls:

- deny-by-default authentication, authorization, capability, and network policy;
- short-lived user and node credentials with issuer/audience binding;
- one-time enrollment challenge bound to expected node/operator and expiry;
- mTLS worker sessions and credential rotation;
- immutable OCI digest, platform, signature/provenance, and approval checks;
- non-root workload identity, dropped Linux capabilities, resource limits,
  read-only root, bounded mounts, and no runtime socket;
- dedicated or stronger-isolation GPU profile until safe device multi-tenancy is
  proven;
- egress allowlists and DNS/IP rebinding protections where networking is allowed;
- secret references resolved only at the worker, mounted read-only/in-memory
  where possible, and erased after use;
- structured redaction at API, policy log, application log, telemetry, evidence,
  and CLI boundaries;
- request, artifact, worker, and operator rate/size quotas;
- signed releases, SBOM, locked dependencies, provenance, and rollback;
- separation of routine compute operator, security revocation, artifact approval,
  and platform administration where staffing permits; and
- emergency quarantine that prevents new leases while preserving evidence.

No control-plane service runs privileged merely to access containerd on remote
nodes. The local supervisor's runtime privileges are minimized and isolated from
the untrusted workload process.

## Deployment and configuration

### Development proof

- one control-plane process;
- one PostgreSQL instance with backup/restore exercise;
- OPA embedded or sidecar with test bundle;
- synthetic Keycloak realm;
- local/private OCI registry or Harbor test instance;
- one to three Linux VMs representing workers;
- containerd/runc; and
- one OpenTelemetry Collector with local open backends.

No administrator privileges are required on the developer workstation beyond
the virtualization/container environment. Worker VMs contain runtime privileges.

### Production reference

- three stateless control-plane replicas across declared failure domains;
- highly available institution-controlled PostgreSQL with tested RPO/RTO;
- leaderless API handlers and database-claimed reconciler/outbox work;
- OPA sidecars or embedded evaluation using signed promoted bundles;
- institution OIDC broker;
- institution CA or step-ca, with SPIRE introduced at the accepted maturity gate;
- Harbor/approved OCI registry and object store;
- outbound worker connections through restricted endpoints;
- OpenTelemetry collectors as node/cluster agents and gateway as appropriate;
- OpenTofu, Ansible, Helm/Kustomize, and GitOps-managed configuration; and
- secrets in OpenBao or approved institution secret provider.

Configuration categories:

| Category | Source | Examples |
|---|---|---|
| Common contract | versioned common repository | API/schema version, reason codes, state transitions |
| Reference safe default | control-plane/worker repository | timeouts, retry ceilings, message limits |
| Institution deployment | signed institution repository | endpoints, issuer, CA, locality vocabulary, capacity, RPO/RTO |
| Secret | secret manager/PKI | database password, signing key, registry token |
| Dynamic policy | signed OPA bundle | quotas, allowed projects/artifacts/localities |
| Observed state | resource/backend | health, inventory, usage, workload status |

Unknown configuration keys warn in development and fail activation in production.
Every change has schema validation, preview/diff, owner, rollout, rollback, and
audit record.

## Capacity, performance, and availability

The v0 scale target is a proof parameter, not a federation limit:

- 3 workers;
- 100 active offerings;
- 100 concurrent non-terminal requests;
- 10 concurrent running workloads;
- 1 control-plane institution;
- bounded request and evidence documents; and
- no more than one active backend per offering.

Before a production pilot, load tests must establish supported values for API
rate, candidate count, resolver latency, lease transaction contention, heartbeat
fan-in, reconciler backlog, outbox backlog, artifact throughput, telemetry volume,
and database growth.

Performance measurements separate:

```text
API validation
policy evaluation
candidate enumeration
filtering/scoring
lease acquisition
command delivery
artifact transfer
sandbox startup
workload execution
result transfer
finalization
```

The resolver should initially use an indexed database query plus in-process pure
calculation. A cache is introduced only after profiling proves the database or
calculation is the bottleneck and cache invalidation can preserve snapshot
explainability.

Overload behavior:

- reject or queue new requests with explicit retry advice before saturating the
  database;
- prioritize heartbeat, lease expiry, cancellation, security revocation, and
  terminal evidence over discovery/list operations;
- cap decision candidate count and return a documented capacity error rather
  than truncate silently;
- bound every external call and retry queue; and
- preserve operator access and emergency drain under user traffic overload.

## Observability and operational evidence

Required trace spans:

- API validation/authentication;
- policy evaluation with revision/decision ID but redacted input;
- resolver enumeration/filter/score;
- lease transaction and conflict;
- adapter command and reconciliation;
- worker artifact stage/start/stop/cleanup;
- result finalization; and
- outbox publication.

Required metrics include request outcomes by stable reason, policy latency/error,
eligible/rejected candidate counts, resolver latency, lease conflicts/expiry,
active capacity, stale workers, command duplicates, reconciliation backlog,
runtime startup, workload outcome, usage completeness, artifact verification
failure, outbox backlog/age, and redaction/telemetry drops.

Logs carry timestamp, severity, component, institution, correlation, causation,
request/workload/lease/command identifiers where permitted, reason code, and
schema version. They never carry bearer tokens, private keys, secret values,
full protected inputs, or unbounded workload output.

Operational dashboards distinguish:

- system health;
- scheduling and capacity;
- worker trust/availability;
- workload lifecycle;
- security/admission failures;
- evidence completeness; and
- dependency/backlog health.

## Repository and package boundaries

The custom implementation should not become an ecosystem-wide monorepo. The
recommended repository boundaries follow independent release and trust surfaces:

```text
psdc-compute-contracts
├── openapi/
├── json-schema/
├── proto/
├── asyncapi/
├── reason-codes/
├── fixtures/
└── compatibility/

psdc-compute-control-plane
├── cmd/control-plane/
├── internal/api/
├── internal/resource/
├── internal/capability/
├── internal/offering/
├── internal/request/
├── internal/policy/
├── internal/resolver/
├── internal/lease/
├── internal/operation/
├── internal/artifact/
├── internal/evidence/
├── internal/usage/
├── internal/outbox/
├── internal/adapters/
├── migrations/
└── tests/

psdc-compute-node
├── cmd/node/
├── internal/enrollment/
├── internal/session/
├── internal/inventory/
├── internal/fencing/
├── internal/artifact/
├── internal/executor/
├── internal/usage/
├── internal/drain/
├── internal/update/
└── tests/

psdc-compute-adapters
├── direct-oci/       # may begin in control-plane/node and split after SPI stabilizes
├── htcondor/
├── kubernetes-kueue/
├── slurm/
└── inference/

psdc-compute-conformance
├── contract/
├── integration/
├── failure/
├── race/
├── security/
├── backend/
└── performance/
```

For the first proof, `direct-oci` may live with the node repository and
conformance tests may live with contracts to avoid empty repositories. A split
occurs when an independently versioned artifact or separate trust/release owner
exists. Shared Go code is published as versioned modules from the contracts
repository; repositories do not copy generated schemas manually.

Algonquin-specific deployment manifests, DNS, identity mappings, capacity,
branding, policy values, and operator contacts belong in Algonquin deployment
repositories. They do not fork these common code repositories unless an accepted
institution exception proves that configuration or an external adapter is
insufficient.

## Custom implementation backlog

### Epic 0 — Contract foundation

Deliverables:

1. terminology and stable identifiers;
2. JSON Schemas for every semantic entity;
3. OpenAPI operations and error envelope;
4. worker protocol schema;
5. state-transition tables with allowed actor and guard;
6. reason-code registry;
7. canonical JSON/hash rules;
8. compatibility/deprecation policy;
9. positive, negative, unknown-field, and version-skew fixtures; and
10. generated documentation and linting.

Exit gate: two independent test implementations can validate and canonicalize
the fixtures identically.

### Epic 1 — Authoritative state foundation

Deliverables:

1. migration framework and schema ownership;
2. resource/capability/implementation/offering repositories;
3. request and idempotency repository;
4. immutable policy/resolver decision records;
5. atomic capacity/lease schema and generation counter;
6. workload/outcome/evidence/usage schema;
7. transactional outbox;
8. backup, restore, export, and migration tests; and
9. transaction-isolation and concurrency test harness.

Exit gate: forced concurrent acquisition cannot over-allocate and restore retains
all active leases and fencing generations.

### Epic 2 — Authentication and policy

Deliverables:

1. OIDC verifier and institutional claim mapper;
2. actor/delegation context;
3. OPA input/output schemas;
4. signed bundle promotion example;
5. fail-closed timeout/circuit behavior;
6. decision reason and revision persistence;
7. redaction/masking policy; and
8. policy unit, integration, stale-bundle, and unavailable tests.

Exit gate: all negative authorization fixtures mutate no capacity or execution
state and produce the expected stable reason.

### Epic 3 — Deterministic resolution and leases

Deliverables:

1. candidate snapshot query;
2. hard-filter registry and stable order;
3. integer/fixed-point scoring functions;
4. normalization bounds and missing-value behavior;
5. deterministic tie-breaking;
6. explanation and trace hash;
7. atomic lease acquisition/renew/release/revoke/expire;
8. retry-to-next-candidate behavior; and
9. fuzz, property, replay, race, and load tests.

Exit gate: recorded inputs replay to the same candidate order and no tested race
breaks capacity or fencing invariants.

### Epic 4 — Node enrollment and secure session

Deliverables:

1. one-time enrollment challenge;
2. local key creation and protected storage;
3. node certificate issuance/rotation/revocation;
4. outbound mTLS session and version negotiation;
5. inventory and heartbeat sequence handling;
6. local durable fence/command ledger;
7. drain/quarantine/revoke commands;
8. reconnect/backoff and control-plane epoch handling; and
9. replay, stolen-token, revoked-cert, clock-skew, and protocol-skew tests.

Exit gate: a stale or revoked node cannot obtain/renew a lease or execute a new
command.

### Epic 5 — Direct OCI execution

Deliverables:

1. canonical manifest validator;
2. OCI pull by digest with size/time bounds;
3. local digest and artifact-approval verification;
4. containerd namespace/snapshot/task lifecycle;
5. runc isolation profile;
6. cgroup/device/network/volume enforcement;
7. secret materialization and erasure;
8. start/observe/cancel/kill/cleanup idempotency;
9. output manifest and checksum generation;
10. bounded logs, usage, and evidence; and
11. escape, resource-exhaustion, duplicate-command, cancellation, disk-full,
    runtime-crash, and artifact-corruption tests.

Exit gate: approved workload succeeds; unapproved/mismatched workload executes
zero user instructions; forced failure leaves no reusable secret or capacity
corruption.

### Epic 6 — Reconciliation, outcome, and operations

Deliverables:

1. desired/observed workload reconciler;
2. database work claiming and bounded retries;
3. node-loss/lease-expiry recovery;
4. terminal-outcome compare-and-set;
5. result/evidence finalization;
6. usage normalization;
7. outbox publisher;
8. operator API and CLI;
9. health/readiness and maintenance modes;
10. dashboards, alerts, runbooks, backup/restore, and rollback; and
11. crash/restart, ambiguous-backend, telemetry-loss, outbox-lag, and operator
    usability tests.

Exit gate: an operator can diagnose and recover every injected v0 failure using
documented APIs and runbooks without direct database editing.

### Epic 7 — External scheduler adapters

Each adapter is a separate acceptance track. HTCondor is first, Kubernetes/Kueue
second, and Slurm only when an actual institutional cluster is available.

Common deliverables:

1. capability declaration and unsupported-feature matrix;
2. request/manifest translation;
3. backend identity/credential boundary;
4. submission with immutable PSDC identifiers;
5. backend mapping ledger;
6. observe/cancel/drain/reconcile behavior;
7. backend-to-PSDC reason mapping;
8. usage/evidence normalization;
9. upgrade/version-skew tests;
10. backend outage and ambiguous-state runbook; and
11. clean disable/drain/export/replacement proof.

Exit gate: the same conformance workload and failure corpus produces equivalent
PSDC-level outcomes without exposing backend-private fields in the common API.

## Test strategy

### Unit and property tests

- schema validation and canonicalization;
- state-transition guards;
- hard-filter truth tables;
- score normalization and overflow bounds;
- stable ordering and tie breaks;
- lease generation and expiry calculations;
- idempotency and reason mapping;
- redaction; and
- adapter translation round trips.

### Integration tests

- PostgreSQL transaction/isolation behavior;
- OPA bundle version, deny, timeout, and masking;
- Keycloak/OIDC claim and token failures;
- Harbor/OCI/Cosign artifact flow;
- containerd lifecycle and cleanup;
- node mTLS enrollment/rotation/revocation;
- OpenTelemetry context propagation; and
- outbox retry/deduplication.

### Failure and race tests

- parallel lease attempts;
- API retry during transaction outcome uncertainty;
- worker disconnect before/after prepare/start;
- expiry versus renewal;
- cancel versus start/completion;
- control-plane or worker restart at every transition;
- duplicate/out-of-order observations;
- artifact revocation during staging/running;
- result failure after successful process exit;
- outbox publisher crash before/after broker acknowledgement; and
- returning stale worker after replacement lease.

### Security tests

- malformed and oversized contracts;
- token issuer/audience/signature/expiry failures;
- cross-institution/object authorization;
- enrollment replay and credential theft simulation;
- command replay/downgrade;
- container privilege, mount, device, namespace, and egress escape attempts;
- secret/log/evidence leakage;
- malicious OCI metadata and decompression/storage exhaustion;
- backend confused-deputy paths; and
- dependency and image scanning with signed provenance.

### Conformance tests

Conformance is backend-neutral. A test supplies a request, policy result,
offerings, fault schedule, and expected semantic outcome. The implementation
must produce the specified reasons, state transitions, fencing behavior, and
evidence regardless of whether execution uses direct OCI, HTCondor, Kubernetes,
or Slurm.

## Binary acceptance criteria

- **CCF-CUSTOM-AC-001:** Given an approved CPU artifact and one eligible worker,
  the system completes the full request-to-outcome chain and the evidence graph
  contains every identifier required by `CCF-CUSTOM-014`.
- **CCF-CUSTOM-AC-002:** Given one hard-ineligible low-latency node and one
  eligible slower node, the eligible node is selected in 100 percent of repeated
  trials; the ineligible node never enters scoring.
- **CCF-CUSTOM-AC-003:** Replaying a captured canonical request, policy revision,
  candidate snapshot, scoring version, and tie-break material produces a byte-
  equivalent ordered decision trace after canonicalization.
- **CCF-CUSTOM-AC-004:** At least 1,000 synchronized attempts against one unit of
  exclusive test capacity result in no more than one active lease and no negative
  or excess capacity.
- **CCF-CUSTOM-AC-005:** After lease expiry and issuance of a higher generation,
  every command or observation from the old generation is rejected and cannot
  change workload, outcome, or capacity authority.
- **CCF-CUSTOM-AC-006:** Killing the control plane at every documented transition
  and restarting it results in reconciliation without duplicate execution,
  missing active leases, or multiple terminal outcomes.
- **CCF-CUSTOM-AC-007:** Disconnecting a worker until lease expiry removes its
  offerings from eligibility, produces the specified lost/retry outcome, and
  handles its stale process before reactivation.
- **CCF-CUSTOM-AC-008:** A wrong digest, revoked approval, invalid signature,
  prohibited mount/device/network request, or unsupported isolation profile
  starts no user workload and produces its stable reason.
- **CCF-CUSTOM-AC-009:** OPA timeout, invalid output, or unavailable state creates
  no lease and returns a stable fail-closed response with policy dependency
  evidence.
- **CCF-CUSTOM-AC-010:** A duplicated API mutation, worker command, observation,
  backend event, and CloudEvent causes one semantic effect.
- **CCF-CUSTOM-AC-011:** Cancellation/start/completion race tests produce one of
  the explicitly allowed terminal outcomes and never reopen a terminal workload.
- **CCF-CUSTOM-AC-012:** Required secrets do not appear in automated scans of
  database rows, logs, traces, metrics, events, CLI output, result manifests, or
  retained worker directories.
- **CCF-CUSTOM-AC-013:** With the message broker and telemetry backend disabled,
  lease correctness and terminal evidence remain intact; outbox/telemetry
  degradation is visible and bounded.
- **CCF-CUSTOM-AC-014:** A backup taken with active leases restores into a clean
  environment and reconciliation preserves or safely expires every generation
  according to the recovery policy.
- **CCF-CUSTOM-AC-015:** An operator who did not write the code can enroll, drain,
  quarantine, diagnose, revoke, and retire a test worker using only the CLI and
  runbooks, with every action audited.
- **CCF-CUSTOM-AC-016:** An external backend can be disabled after drain while all
  PSDC requests, lease transitions, outcomes, and evidence remain exportable and
  no common contract contains a required backend-private field.

## Decisions still required before implementation authorization

| Decision | Proposed default | Alternative | Evidence/ADR trigger |
|---|---|---|---|
| Repository license application | ADR-0030 boundary matrix: AGPL services, reciprocal worker decision, Apache interoperability contracts, DCO, and participant agreements | retain existing valid license when migration authority or compatibility is absent | copyright inventory, legal review, `LICENSE`, notices, exact source/source offer, SBOM, provenance, and DCO evidence |
| Control-plane/node language | Go | Rust for node after measured/security justification | ADR only if adding second baseline language |
| Worker protocol | mTLS gRPC/Protobuf outbound stream | HTTPS long polling | small spike must prove reconnect, ordering, duplicate, and firewall behavior |
| Initial node CA | step-ca or institution CA adapter | SPIRE from first release | select from available institutional PKI and operator capacity |
| OPA integration | embedded Go SDK for first proof | sidecar from first proof | performance/isolation/upgrade spike |
| Initial sandbox | hardened runc for approved jobs; gVisor compatible CPU profile | Kata/dedicated VM | threat model and workload compatibility corpus |
| GPU baseline | approved workloads on dedicated GPU nodes | tested VM/runtime isolation | hardware/driver/license/security evidence |
| Async broker | no broker in first proof; PostgreSQL outbox worker | NATS JetStream immediately | real asynchronous consumer and failure test required |
| First external scheduler | HTCondor | Kubernetes/Kueue if actual first design partner is Kubernetes-only | inventory and workflow evidence from design partner |

All other site values belong in an institution deployment manifest and do not
block the common contract if their schema, range, owner, safe default, and test
are defined.

## Alternatives and trade-offs

### Custom broker plus adapters — recommended

Gains institution-neutral semantics, backend replaceability, deterministic
evidence, and sovereignty. Costs are ownership of domain lifecycle, leases,
worker glue, and conformance tests. This is the smallest custom surface that
preserves PSDC's differentiating requirements.

### HTCondor as the entire control plane

Reduces initial scheduler code and fits opportunistic desktops, but makes
ClassAds, daemon topology, claim semantics, and HTCondor identity/policy the
de facto common model. It does not naturally cover Kubernetes services,
institution-neutral federation, PSDC evidence, or all isolation requirements.
Use it as an adapter.

### Kubernetes/Kueue as the entire control plane

Provides mature reconciliation, placement, resource accounting, and admission,
but requires every provider to expose Kubernetes semantics and makes managed
desktop participation awkward. Use it as an institution-local backend.

### Slurm as the entire control plane

Excellent for established HPC, but Linux/HPC assumptions, administrative API
security, and cluster-local semantics do not cover the whole PSDC resource
model. Use it as an adapter where it already exists.

### Build a new general scheduler/runtime

Offers theoretical control but duplicates mature container, batch, policy,
identity, and telemetry systems and creates an unjustifiable security burden.
Rejected.

## Migration and rollback

Schema migrations are expand/migrate/contract with current-major plus one prior
major compatibility during the declared window. A release must be able to roll
back application binaries without losing new data or fencing generations.
Irreversible data migration requires backup, restore rehearsal, forward-fix
procedure, and ADR.

Worker updates are staged by ring, preserve the prior signed binary, negotiate
protocol versions, drain incompatible workloads, and roll back on health or
conformance failure. A worker never downgrades its durable fencing generation.

Backend adapter rollout starts with discovery disabled, then shadow translation,
test offering, bounded project, and general offering. Rollback suspends new
offerings, drains/reconciles active workloads, preserves mapping/evidence, and
removes credentials after terminal accounting.

## Traceability and related documents

- [Implementation Framework Composition Study](Implementation-Framework-Composition-Study.md)
- [Compute Fabric Architecture](Campus-Compute-Fabric-Architecture.md)
- [Node Capability Schema](Node-Capability-Schema.md)
- [Scheduling Algorithm](Scheduling-Algorithm.md)
- [Worker Agent Specification](Worker-Agent-Specification.md)
- [Worker Lifecycle](Worker-Lifecycle.md)
- [Job Sandboxing](Job-Sandboxing.md)
- [HTCondor Interoperability](HTCondor-Interoperability.md)
- [Source Decision Import — Compute Fabric](../architecture/Source-Decision-Import-2026-09-12-Compute-Fabric.md)
- [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md)
- [Technology Defaults and Alternatives](../vision/13-Technology-Defaults-and-Alternatives.md)
- [ADR-0030: Network Copyleft and Commercial Contribution](../architecture/architecture-decision-records/ADR-0030-network-copyleft-and-commercial-contribution.md)
- [License Policy](../governance/License-Policy.md)

This proposed scope becomes implementation-authorizing only after the owning
normative specifications adopt its requirements, release practice conforms to
accepted ADR-0030,
the cross-document conflict audit passes, and the Algonquin deployment bindings
are derived from the stable common contracts rather than copied independently.
