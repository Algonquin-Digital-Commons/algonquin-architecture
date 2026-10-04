# Production Trust, Data and Placement Boundary

> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: PSDC Deployment and Reliability Working Groups
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: ADR-0010, ADR-0013, ADR-0026, ADR-0028, ADR-0029

## Purpose and measurable outcomes

This specification defines what may be called production, which providers may host
critical services or protected data, and how dynamic marketplace placement remains safe.
A service is not production because it runs in Kubernetes or has a tokenized lease; it is
production only after its people, code, data, infrastructure, recovery and evidence pass the
gates below.

Outcomes are explicit production eligibility, isolated environments, predictable failure,
safe dynamic placement, tested restoration, accountable ownership and reversible releases.

## Production boundary

Production consists of:

- approved identities, roles, service owners and on-call/escalation;
- signed source, dependencies, SBOM, provenance and release artifacts;
- production-certified Kubernetes/OpenStack/Slurm/storage/network/key providers;
- protected configuration and institution-controlled secrets/keys;
- classified data, retention, residency, backup and deletion controls;
- SLOs, capacity floors, error budgets, observability and runbooks;
- accepted leases, reserved capacity and recovery/failover evidence.

Development, student experiments, opportunistic labs, volunteer workers, public burst
providers and unaccepted federated providers are outside the boundary even when they run the
same software.

## Scope

This document governs environment separation, production admission, provider certification,
release promotion, dynamic placement, recovery and operational evidence.

## Out of scope

It does not authorize institutional risk, legal retention, procurement or a specific
physical site; named institutional authorities supply those deployment decisions.

## Logical architecture and ownership boundaries

Service owners own outcomes and SLOs; platform/storage/network/security owners certify
providers; the market selects only within that certified set; backend controllers execute.

## Environment and provider classes

| Class | Data/workload | Provider eligibility | Market behavior |
|---|---|---|---|
| development | synthetic/non-sensitive | developer and test providers | broad/advisory |
| staging | production-like synthetic or approved masked data | managed non-production | shadow or bounded |
| opportunistic | retryable, non-authoritative | lab/desktop/task workers | dynamic, preemptible |
| managed standard | ordinary approved services/data | managed institution/federated provider | dynamic with fallback |
| production critical | critical services and protected data | prequalified production pool | dynamic only inside hard constraints and reservations |
| records/safety authority | official authority or extreme impact | named dedicated profile | change-controlled; no price-driven movement |

## Normative production gates

- **DEPLOY-PROD-001:** Every production service MUST have a durable owner, support contact,
  SLO, data classes, dependency map, RPO/RTO, capacity floor and approved runbooks.
- **DEPLOY-PROD-002:** Every release MUST be reproducible from reviewed source, signed,
  scanned, SBOM-attested and promoted by immutable digest.
- **DEPLOY-PROD-003:** Protected state MUST have an independently tested backup/restore and
  named retention/deletion policy.
- **DEPLOY-PROD-004:** Provider eligibility MUST cover trust, attestation, patching, physical
  and network zones, storage/key access, failure domains, capacity, telemetry and incident
  ownership.
- **DEPLOY-PROD-005:** Critical services MUST hold reserved capacity before discretionary
  demand and span declared independent failure domains.
- **DEPLOY-PROD-006:** No unreviewed lab, public or federated provider can become critical
  merely by offering a low price or high capacity.
- **DEPLOY-PROD-007:** Every automated placement or rollout MUST retain a last-known-good
  version/placement and a tested stop/rollback path.

## Dynamic placement for all services

Dynamic placement is allowed for every service class, but its search space narrows as impact
rises:

    all providers
       -> identity/trust eligible
       -> data/residency eligible
       -> backend/network/storage eligible
       -> environment eligible
       -> production certified
       -> reserved and failure-domain compliant
       -> ranked by evaluated cost

For critical services the market may choose among already-safe production cells, rebalance
after predicted failure, or choose an initial eligible site. It cannot remove required
replicas, move state without replication evidence, cross residency, use opportunistic
capacity, exhaust the disruption budget or depend on the market/ledger for continued
operation.

### Benefits

- better utilization of multiple production cells;
- automated failure-domain and locality optimization;
- transparent price, capacity and reliability signals;
- faster evacuation of degrading infrastructure.

### Risks and mitigations

| Risk | Mitigation |
|---|---|
| price oscillation causes churn | hysteresis, minimum lease, move cooldown and movement budget |
| correlated replicas | hard anti-affinity across power/network/storage/control domains |
| data movement increases outage risk | pre-copy, verify, cut over, retain rollback copy |
| auction outage disrupts service | accepted leases and backend reconciliation continue |
| compromised provider advertises capacity | attestation, production certification, signed freshness and quarantine |
| hidden network bottleneck | path reservation and capacity gate are atomic with lease |
| operator ownership becomes unclear | selected provider and service owner remain named in every lease |

## Deployment and release flow

    reviewed change -> CI tests/scans -> signed immutable artifact
       -> development -> staging -> canary production cell
       -> health/SLO/security/data gates -> progressive promotion
       -> accepted release evidence

Database/schema changes use expand-and-contract compatibility. Stateful placement uses
replicate, verify, quiesce/fence, cut over, observe and retire. Automated rollback triggers
on security control failure, data inconsistency, SLO breach, unexplained placement,
dependency incompatibility or restore uncertainty.

## Interfaces and state

Environment manifests, provider certifications, service profiles, reservations, release
manifests, placement leases and evidence packages are versioned and signed. OpenTofu,
Ansible, Helm and GitOps express desired infrastructure/deployment state; secrets are
references to OpenBao/KMS. The operational database tracks rollout and lease state. Ledger
commitments record accepted releases/settlements, not live reconciliation.

## Security and privacy

Production has separate identities, keys, networks, storage and audit from non-production.
No production record is copied to development without approved minimization/masking.
Administrative access uses phishing-resistant MFA, short-lived privilege and protected
management paths. Workloads use SPIFFE identities. Break-glass access is time-limited,
recorded and reviewed.

## Capacity, availability and recovery

Critical services declare N+1 or stronger capacity, quorum/failure domains, maintenance
headroom and dependency budgets. Admission rejects discretionary work before consuming
reserved floor. Backups use a separate credential and failure domain. Recovery tests include
loss of provider, cluster/control plane, database, key service, storage, network, identity,
market and ledger. A ledger outage must not stop accepted service traffic.

## Failure matrix

| Failure | Required production behavior |
|---|---|
| market/resolver unavailable | backend continues accepted leases; static accepted placement and reservations remain |
| operational DB unavailable | no unsafe new mutations; fail over and reconcile by idempotency |
| ledger unavailable | queue settlements; no current service interruption |
| one cell/provider lost | traffic fails to independent healthy replica within objective |
| KMS unavailable | existing explicitly cached short-lived operations follow policy; new protected decrypt fails closed |
| identity unavailable | established bounded sessions follow policy; new login/privilege fails closed |
| release health fails | halt progression and roll back/fail forward per data compatibility |
| backup restore fails | production acceptance revoked for affected data class until repaired |
| federation isolated | institution continues locally; queued exchange stays bounded |

## Observability and operational ownership

Dashboards tie service SLO, release, provider, lease, network path, storage placement, key
health, capacity and cost. Alerts identify the service owner and infrastructure owner.
Audit records show who approved production, which evidence passed, why placement changed,
and who invoked overrides. Synthetic transactions verify user-visible behavior, not only
process health.

## Alternatives and trade-offs

Static placement is easier to reason about but wastes capacity and reacts slowly to failure.
Unrestricted market placement maximizes theoretical choice but creates unacceptable
instability and trust/data risk. PSDC uses constrained dynamic placement: policy certifies a
safe portfolio, then the market optimizes within it.

## Implementation sequence, migration and rollback

1. define service/environment/provider schemas and evidence package;
2. certify one production cell and restore path;
3. run static production with market shadow decisions;
4. add a second independent cell and bounded non-stateful rebalancing;
5. enable stateful movement after replication/cutover exercises;
6. add approved federation only after standalone failure exercises.

Rollback freezes new placements/releases, preserves accepted leases, routes to last-known
good cells, restores the last compatible artifact/configuration and reconciles evidence.
Rollback does not erase the failed release or settlement trail.

## Testing and evidence

Production evidence includes gate approvals, signed release provenance, SLO observations,
failure/restore exercises, placement traces and rollback records.

## Binary acceptance criteria

These testing and evidence gates must pass before a service may claim production status.

- **DEPLOY-PROD-ACC-001:** an evidence package proves all production gates for one service;
- **DEPLOY-PROD-ACC-002:** a cheaper non-certified provider cannot host a critical replica;
- **DEPLOY-PROD-ACC-003:** loss of the market and ledger does not interrupt an accepted
  critical service;
- **DEPLOY-PROD-ACC-004:** loss of one production cell meets SLO/RPO/RTO with independent
  data, key and network evidence;
- **DEPLOY-PROD-ACC-005:** failed release and failed state migration each execute tested
  stop/rollback without data ambiguity;
- **DEPLOY-PROD-ACC-006:** production data cannot be queried from development identities or
  networks;
- **DEPLOY-PROD-ACC-007:** every manual override expires and produces owner, reason,
  affected scope, evidence and review.

## References

- [Scheduling Algorithm](../campus-compute-fabric/Scheduling-Algorithm.md)
- [Network Architecture](../network/Network-Architecture.md)
- [Storage Architecture](../storage/Storage-Architecture.md)
- [KMS](../security/KMS.md)
- [Production Readiness Checklist](../institutional/Production-Readiness-Checklist.md)
