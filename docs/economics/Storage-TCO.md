# Storage Cost-Benefit and Total-Cost Model

> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: PSDC Economics and Storage Working Groups
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: ADR-0026, ADR-0028, ADR-0029

## Purpose and measurable outcome

This specification makes storage-tier choices economically transparent without reducing
privacy, residency, durability or deletion to a price score. It defines the costs, benefits,
risk premiums and evidence needed to compare providers. A conformant cost model produces
the same evaluated cost from the same versioned inputs and exposes which policy constraint,
not merely which price, caused a placement.

## Scope and exclusions

The model covers capital, energy, operations, network, replication/erasure, repair, proof,
key, backup, federation and exit costs. It does not authorize data, set retention law,
release keys or decide that public permanence is appropriate. The cheapest provider that
fails a hard requirement is not a candidate.

## Out of scope

Legal retention, object authorization, key release and provider certification are inputs
owned by governance, storage and security—not outputs of the economic model.

## Interfaces, dependencies, adapters and ownership

The model consumes versioned provider offers, capacity/energy/network telemetry, storage
manifests and risk profiles. It emits evaluated cost and receipts through open schemas; the
storage authority owns placement and providers own native measurement adapters.

## Capacity, scaling and routing effects

Cost evaluation includes usable rather than raw capacity, solver batch size, repair and
federation bandwidth, path congestion, cache locality and admission headroom.

## Tier cost-benefit chart

| Tier | Primary benefit | Main cost | Best fit | Main warning |
|---|---|---|---|---|
| 0 ephemeral | lowest latency and cost; local scratch | recomputation and loss risk | temporary execution data | deletion must still be verified where possible |
| 1 private hot | fast governed access, mutable application semantics | always-on capacity, replication, KMS and backup | active private records and user/application data | highest routine operational responsibility |
| 2 private content-addressed | deduplication, digest verification and peer distribution | pin/replication control, metadata privacy and cache capacity | immutable images, weights, datasets, CAR/IPLD artifacts | CID is not authorization; do not use public DHT by default |
| 3 verified durable | contractual durability, independent failure domains, proof and repair | extra providers, proof traffic, audit and long retention | archives, backups and high-value artifacts | proof of possession is not proof of correctness or permission |
| 4 governed federation | controlled portability and shared research/service workflows | egress, re-encryption, duplicate custody, receiving validation and policy coordination | approved cross-institution copies | this is a transfer/custody boundary, not one shared disk tier |
| 5 public permanent | durable publication and broad public retrieval | irreversible disclosure, permanent fees and loss of deletion | public releases, research and transparency artifacts | prohibited for protected or deletion-eligible data |

## Architecture choice comparison

| Choice | Benefits | Costs/risks | PSDC use |
|---|---|---|---|
| Ceph RBD/CephFS/RGW | unified block/file/object, mature internal control | operational complexity, failure-domain planning, possible double erasure | physical Tier 1/3 backend where team capacity supports it |
| Garage/SeaweedFS | focused object service, simpler footprint | narrower feature/operational ecosystem | smaller institution object backend |
| private Kubo + IPFS Cluster | content addressing, peer distribution, CAR/IPLD compatibility | membership, pin policy, metadata and repair operations | Tier 2 only by default |
| Tahoe-LAFS code | least-authority design and robust erasure concepts | GPL/TGPPL licensing, separate operational model | design input or isolated reviewed component; not copied into Apache core |
| Storj code | mature encryption/erasure/repair concepts | AGPL service obligations and upstream complexity | design input or separately deployed compliant service |
| Sia renter/storage code | permissive components and storage-contract ideas | public-chain assumptions differ; repository licenses vary | exact-component review, design-derived contracts |
| public Filecoin/Arweave | external durability/permanence | public metadata/economics, deletion and sovereignty risks | explicit Tier 5 or approved public/burst adapter only |

## Total-cost formula

For a compliant placement plan, annualized evaluated cost is:

    media and hardware depreciation
  + power and cooling
  + rack/network/facility allocation
  + usable-capacity overhead from replication or erasure
  + read/write/operation and egress cost
  + encryption, key and HSM operation
  + monitoring, patching, on-call and incident labour
  + proof, audit, repair and rebalance traffic
  + backup, restore testing and disaster-recovery reserve
  + upstream/fork maintenance and license compliance
  + migration and exit reserve
  + expected loss = probability of failure * impact
  - measured reuse, deduplication and locality savings

The model reports both currency and Institutional Resource Units. It never turns a low
expected-loss estimate into permission to violate a hard control.

## Placement and storage tokens

Providers bid on an eligible placement request containing tier, usable capacity, duration,
I/O profile, network locality, durability, failure domains, proof schedule and lifecycle.
The winning plan issues a storage placement token containing only governed references,
obligations, price/credit ceiling and expiry. Actual content remains encrypted off-ledger;
keys remain in the key plane. Measured GiB-time, requests, transfer, repair and proof events
produce receipts.

## Required cost and risk inputs

- raw and usable capacity; replication factor or erasure k/m parameters;
- drive/media failure, provider correlation and replacement lead time;
- ingress, egress, intra-cluster, federation and repair bandwidth;
- latency, throughput, operation rate and cache hit rate;
- energy, cooling and carbon signals;
- staffing, hardware lifecycle, spares and support;
- key/HSM, backup, proof, audit and compliance cost;
- RPO/RTO, durability target, retention and deletion obligations;
- migration bandwidth, format portability and provider exit time;
- upstream patch/upgrade effort and license obligations.

Unknown mandatory inputs use a conservative bound or make the plan ineligible; they do not
default to zero.

## Worked comparison

For 100 TiB of active protected data:

- three full replicas require roughly 300 TiB before filesystem and backup overhead;
- a 10+4 erasure profile requires roughly 140 TiB for encoded payload but adds encoding,
  fragment placement, repair traffic and small-object complexity;
- applying Ceph erasure coding and then a second application-level 10+4 code multiplies
  overhead and recovery complexity and is prohibited unless explicitly modelled.

The erasure plan wins only if its failure-domain independence, repair time, performance and
operator complexity meet the workload objectives. Raw-capacity efficiency alone is not a
decision.

## Data, privacy and retention

Cost records use project/object references and aggregated measurements. They exclude content,
keys and user-level access paths. Raw provider and object-level telemetry is retained only as
long as dispute, capacity and security needs require. Final receipts follow financial/audit
retention; deletion and legal-hold states are explicit.

## Failure and dependency matrix

| Failure | Economic effect | Required response |
|---|---|---|
| provider capacity loss | repair and temporary redundancy cost | repair to policy target and charge by contract |
| egress spike | transfer cost and congestion | apply approved QoS/budget; never strand required restore |
| proof failure | increased expected loss | quarantine provider, repair and dispute |
| KMS unavailable | data inaccessible though stored | meet key-plane HA; storage bid cannot claim availability alone |
| model input stale | false price winner | expire model and stop enforcing placement |
| federation recipient rejects | duplicated staging/transfer cost | expire transfer grant and delete staged copy by policy |
| Tier 5 mistake | irreversible privacy impact | block by classification; no financial offset can cure it |

## Alternatives and trade-offs

Flat per-GiB pricing is easy but hides I/O, repair, egress, staffing and risk. A purely
financial model can reward unsafe concentration. A purely policy-fixed model wastes supply
and obscures real subsidy. PSDC first filters policy, then compares complete lifecycle cost
and benefits among compliant placements.

## Implementation sequence, migration and rollback

1. inventory physical and logical capacity and current costs;
2. publish resource-unit definitions and conservative assumptions;
3. collect shadow receipts from existing storage;
4. validate restore, repair and deletion evidence;
5. enable advisory bids, then bounded placement enforcement.

Rollback disables automatic price enforcement, retains measurement, restores the last
accepted static placement policy and completes required repair/retention. It never abandons
data because its current placement becomes expensive.

## Binary acceptance criteria

- **ECON-ST-ACC-001:** every tier has a positive and prohibited-data fixture;
- **ECON-ST-ACC-002:** evaluated cost includes usable-capacity, repair, key, backup, labour,
  exit and expected-loss terms rather than raw disk price only;
- **ECON-ST-ACC-003:** a cheaper but ineligible provider is absent from ranking;
- **ECON-ST-ACC-004:** loss of one provider produces modelled repair cost and measured
  evidence within the declared variance;
- **ECON-ST-ACC-005:** storage tokens and receipts contain no content or usable key material;
- **ECON-ST-ACC-006:** the model detects and rejects unreviewed double erasure coding;
- **ECON-ST-ACC-007:** an institution can export objects, manifests, keys under its control,
  receipts and custody evidence to a replacement backend.

## References

- [Storage Architecture](../storage/Storage-Architecture.md)
- [ADR-0028](../architecture/architecture-decision-records/ADR-0028-private-content-and-storage-fabric.md)
- [KMS](../security/KMS.md)
- [Network Architecture](../network/Network-Architecture.md)
