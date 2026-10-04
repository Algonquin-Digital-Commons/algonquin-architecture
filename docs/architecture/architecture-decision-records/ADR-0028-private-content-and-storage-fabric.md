# ADR-0028: Private Content and Storage Fabric

> Standard: PSDC-DOC-001
> Document type: adr
> Status: Accepted
> Owner: PSDC Data and Storage Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: ADR-0008, ADR-0010, ADR-0012, ADR-0013, ADR-0026

> Date: 2026-09-16
> Scope: Private institutional records, portable artifacts, storage placement and federation
> Decision owner: PSDC founder; institutional privacy and security approval required

## Context

PSDC must store active private records, immutable artifacts, durable archives, federated
copies and intentionally public material. A public DHT, CID or provider market does not
encode authorization, consent, custody, retention or deletion. One undifferentiated storage
backend also cannot satisfy the latency, durability, privacy and cost needs of every class.

## Decision drivers

- private data and metadata must remain institution-controlled;
- every stored object and shard placement must be accountable without placing content on a ledger;
- storage must survive provider failure and support repair and deletion evidence;
- institutions must federate approved objects without sharing one administrative cluster;
- open protocols and replaceable providers are mandatory.

## Options considered

| Option | Benefit | Rejection or qualification |
|---|---|---|
| One Ceph cluster for all uses | Operationally familiar | Retained as a possible physical backend, but insufficient as the lifecycle and federation model. |
| Public IPFS/Filecoin/Arweave by default | Global distribution and proofs | Rejected for private records and deletion-eligible data. |
| Separate unrelated storage products | Local optimization | Rejected without a common manifest, policy, evidence and accounting plane. |
| Six semantic tiers over replaceable internal providers | Explicit risk, cost and lifecycle boundaries | Accepted. |

## Decision

PSDC defines six semantic tiers:

| Tier | Purpose | Default placement |
|---|---|---|
| 0 — ephemeral execution | scratch, caches and intermediates | encrypted runtime/local provider volume with bounded cleanup |
| 1 — internal private hot | active private application and user data | institution-controlled encrypted object/block/file providers; primary private mode |
| 2 — internal content-addressed distribution | immutable images, weights, datasets and CAR/IPLD artifacts | private Kubo-compatible swarm and approved peers |
| 3 — verified durable | archives, evidence, backup and high-value artifacts | multi-provider commitments, erasure/replication, audit and repair |
| 4 — governed federation | approved institution-to-institution transfer | encrypted copy, signed manifest, receiving acceptance and separate local custody |
| 5 — public permanent archive | intentionally public, deletion-ineligible releases | explicit public archival adapter only |

Protected content is encrypted before provider storage. Institution-controlled envelope keys,
authorization, retention, deletion and federation remain outside storage-provider logic.
Commons metadata holds governed references and commitments—object ID, digest or CID,
classification, controller, key and policy references, tier, placements, retention,
provenance and custody—but never plaintext content or usable data-encryption keys.

Each accepted placement creates a signed, non-transferable **storage placement token**. It
identifies the object reference, tier, provider, region/failure domain, lease, redundancy
role, capacity reservation, retention, proof schedule and price/credit ceiling. It is an
accounting and custody instrument, not a bearer right to retrieve the object. Retrieval
still requires identity, policy and a scoped key grant.

Ceph, Kubo, IPFS Cluster, Tahoe-LAFS-derived, Storj/Sia-derived or other mechanisms remain
replaceable below this semantic model. Avoid double erasure coding: exactly one layer owns
fragmentation for a placement profile unless a reviewed durability model proves otherwise.

## Placement flow

```text
object classification + retention + residency + RPO/RTO
                         |
                         v
eligible tiers/providers --hard filters--> reverse offers and risk/cost scoring
                         |
                         v
placement token -> encrypt -> encode/replicate -> store -> verify -> receipt
                         |
                         v
proof/health loop -> repair/rebalance -> retain/federate/delete -> evidence
```

## Consequences

### Benefits

- private records do not depend on public discovery or token networks;
- tier, location, provider obligations and cost are transparent and auditable;
- storage can be optimized and federated without exposing data or keys on a ledger;
- providers remain replaceable behind S3, block, file and content-manifest contracts.

### Costs and risks

- the manifest, key plane, repair controller and proof system are custom PSDC scope;
- metadata can still reveal relationships and must be minimized and protected;
- erasure and federation increase network and operator cost;
- deletion can be proven only for controlled copies and keys, not unknown prior disclosure.

## Security, privacy, operations, cost and portability effects

Provider eligibility is hard-filtered by classification, residency, trust, key policy,
retention and network reachability before cost ranking. Tier 1 optimizes latency and privacy;
Tier 2 optimizes immutable distribution; Tier 3 pays for durability evidence; Tier 4 adds
federation transfer and duplicate custody cost; Tier 5 accepts permanence and loss of
deletion. Object manifests and evidence are exportable independently of a provider.

## Migration and rollback

Objects are migrated by creating a candidate placement token, copying ciphertext, verifying
digest and policy, switching the authoritative placement reference, observing a safety
window, then retiring the old placement and recording deletion status. Rollback restores
the prior reference while its copy and key grant remain valid. Tier changes that weaken
privacy, residency or deletion require new approval; Tier 5 is irreversible and has no
rollback to private status.

## Validation and acceptance evidence

- `STORE-ADR-ACC-001`: unauthorized peers, gateways and metadata callers cannot enumerate
  protected objects or obtain keys;
- `STORE-ADR-ACC-002`: provider loss triggers repair to the declared redundancy target
  without plaintext exposure and within RPO/RTO;
- `STORE-ADR-ACC-003`: a placement decision records eligible/rejected providers, bid,
  policy version, token, ciphertext digest, proof and receipt;
- `STORE-ADR-ACC-004`: Tier 4 exchange requires signed manifest, receiving acceptance,
  scoped re-wrapping or transfer grant and independent receiving custody;
- `STORE-ADR-ACC-005`: retention expiry propagates to indexes, replicas, caches and keys,
  records deletion evidence and explicitly records any unverifiable copy;
- `STORE-ADR-ACC-006`: no private or deletion-eligible fixture can enter Tier 5.

## Review triggers

Review after a metadata leak, proof or repair failure, key compromise, provider-license
change, new record class, residency change, irrecoverable deletion failure or material
cost/durability evidence.

## Affected documents and gates

- [Storage Architecture](../../storage/Storage-Architecture.md)
- [Storage TCO](../../economics/Storage-TCO.md)
- [KMS](../../security/KMS.md)
- [Technology Defaults and Alternatives](../../vision/13-Technology-Defaults-and-Alternatives.md)

Production storage is blocked until object and placement schemas, key/envelope service,
provider protocol, repair controller, custody model, retention/deletion workflow, backup and
restore tests and institutional data approval exist.
