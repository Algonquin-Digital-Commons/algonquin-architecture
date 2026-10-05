# Sovereign Content and Storage Fabric Architecture

> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: PSDC Storage Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: ADR-0010, ADR-0013, ADR-0026, ADR-0028, ADR-0029

## Purpose and measurable outcomes

The storage fabric provides private, durable, content-addressed, federated and public
storage through one governed manifest, placement, key, evidence and accounting contract.
It must place and repair encrypted data across replaceable providers, prove custody and
lifecycle actions, and keep each institution independently operable.

Measurable outcomes are declared RPO/RTO/durability, bounded restore and repair time,
authorized retrieval only, transparent tier/provider placement, deterministic retention and
export, and deletion evidence that states both what was verified and what could not be.

## Scope, exclusions and prohibited behavior

In scope: object manifests, tier assignment, S3/native APIs, encryption envelopes, provider
offers, placement tokens, replication/erasure, private content distribution, custody, proof,
repair, retention, deletion, backup, restore, federation and receipts.

Out of scope: deciding legal record retention, authenticating users, authorizing compute,
public-chain tokenomics and storing plaintext in ledger state. A CID, possession proof,
encryption or paid placement MUST NOT be treated as authorization, consent, correctness or
records authority.

## Architecture

    application / workload / federation gateway
                       |
                Storage Authority
        manifest, policy, tier, placement, custody
             /            |             \
        Key Plane      Market/Lease      Evidence/Repair
             \            |             /
                    Object Gateway
           S3, block/file adapters, native API
                       |
       +---------------+------------------+
       |               |                  |
    Tier 1         Tier 2 private       Tier 3 durable
  hot providers    content fabric       providers/proofs
       |                                  |
       +---------------+------------------+
                       |
            Tier 4 federation gateway
                       |
              Tier 5 public adapter

## Six semantic tiers

| Tier | Required semantics | Default implementation direction |
|---|---|---|
| 0 ephemeral execution | encrypted scratch, bounded TTL, cleanup and no durability promise | runtime/local provider volume |
| 1 internal private hot | primary private mode, mutable object/block/file access, backup and low latency | S3-compatible internal fabric; Ceph/Garage/SeaweedFS as replaceable candidates |
| 2 internal content-addressed distribution | immutable digest/CID/CAR/IPLD, private membership, pin/replication policy | private Kubo-compatible nodes plus IPFS Cluster |
| 3 verified durable | multiple independent providers, commitments, proof schedule, audit, repair and expiry | PSDC storage contracts using internally approved providers |
| 4 governed federation | approved encrypted copy, signed manifest, recipient acceptance and independent custody | application gateway over authenticated transport |
| 5 public permanent archive | deliberate publication and accepted non-deletability | explicit Arweave/Irys-style or other public adapter |

Tier 4 is a lifecycle transition and custody boundary, not necessarily a distinct physical
disk technology. A received object becomes a local Tier 1, 2 or 3 placement under the
recipient's policy.

## Component responsibilities

| Component | Owns | Must not own |
|---|---|---|
| Storage Authority | object ID, manifest, tier, policy, placement and lifecycle state | plaintext or root key |
| Key Plane | KEKs, wrapping, rotation, scoped grants and cryptographic erasure | business authorization policy |
| Object Gateway | authenticated S3/native operations, streaming encryption and integrity | permanent policy authority |
| Provider Registry | identity, capabilities, trust, capacity and health | data keys |
| Market/Lease | offers, evaluated cost, placement token and credit hold | eligibility policy |
| Encoder | selected replication/erasure profile and fragment map | independent second encoding layer |
| Private Content Fabric | CIDs, blocks, CAR/IPLD, approved peer exchange and cache | ownership or public discovery by default |
| Evidence/Repair | proofs, audits, health, repair and deletion evidence | silent policy weakening |
| Federation Gateway | export/import approval, encrypted transfer and custody handoff | flat cross-institution storage authority |

## Dependencies, adapters, runtimes and ownership

The fabric depends on identity/policy, KMS, network paths, provider registry and metering.
S3/block/file/content adapters translate contracts; storage providers own ciphertext
runtime only, while the Storage Authority owns manifests and lifecycle.

## Object manifest and placement token

The versioned object manifest contains object ID, logical version, controller, data class,
purpose, content digest and optional CID, size, media/schema, provenance, policy/key
references, tier, residency, retention/hold, placements, derivation links and deletion
state. It does not contain plaintext, credentials or usable key material.

A placement token contains token/lease ID, object reference, provider, tier, role
(replica/fragment/cache), failure domain, region, capacity, valid interval, proof schedule,
repair threshold, retention, evaluated price/credits and signatures. It authorizes custody
under terms but does not grant retrieval. Retrieval requires a separate policy decision and
operation-scoped key grant.

## Write, read and repair flows

### Write

    classify -> authorize -> choose tier -> solicit eligible provider offers
      -> reserve placement/credits -> create data key -> encrypt
      -> replicate/encode -> send ciphertext -> verify digest/proof
      -> activate manifest -> issue receipt

### Read

    authenticate -> authorize purpose/object/version -> select healthy placement
      -> issue short-lived operation grant -> retrieve ciphertext/fragments
      -> verify -> reconstruct -> decrypt in authorized boundary -> audit

### Repair

    detect missing/degraded proof -> confirm policy and healthy sources
      -> choose new eligible provider -> reserve placement -> copy/reconstruct ciphertext
      -> verify -> activate replacement -> retire failed placement -> receipt/dispute

The storage provider never receives a general-purpose decryption key merely to store or
repair ciphertext.

## Placement algorithm and market

Hard filters cover classification, residency, provider trust, failure-domain independence,
key compatibility, tier, retention, proof, capacity, network and production status. Eligible
providers return offers. The controller minimizes evaluated lifecycle cost subject to
durability and path constraints using constrained min-cost flow or a deterministic
CRUSH-like mapping for large repeated sets. Cost includes capacity, I/O, egress, energy,
proof, repair and risk. Exactly one layer owns erasure coding for a placement profile.

## Interfaces and events

- S3-compatible object operations are the broad application boundary; block/file interfaces
  use explicit adapters and CSI/Cinder-style contracts where applicable.
- Native OpenAPI operations manage manifests, tier requests, placements, grants, custody,
  repair and deletion.
- CloudEvents include ObjectClassified, PlacementReserved, ObjectCommitted,
  ProofFailed, RepairCompleted, FederationAccepted and DeletionRecorded.
- Every mutation is idempotent; upload uses a client request ID and content digest.
- Long operations expose state, cancellation, expiry and retry. Unknown schema versions fail
  before content is accepted.

## Key management

Each object or bounded object group uses a data-encryption key. A KEK in the institution
key plane wraps the DEK; envelope metadata stores only key identifiers and wrapped material.
Production root and KEKs are non-exportable where practical. Tier 4 rewraps for an approved
recipient or uses an authenticated transfer session; institutions do not share one root.
Tier 5 publication uses content intentionally approved as public and no secret key as its
access control.

## Data lifecycle

    created -> classified -> encrypted -> placed -> verified -> active
      -> replicated/repaired -> federated/archived -> expired/held
      -> deletion requested -> authorization and hold check
      -> replicas/caches/indexes/keys processed
      -> deletion verified or limitation recorded

Backup is a distinct, tested placement with its own manifest and key policy. A snapshot is
not a backup until independent restore succeeds. Retention changes are prospective unless
law/policy explicitly authorizes a migration. Unknown copies are recorded as a limitation;
the system never claims universal deletion without evidence.

## Security and privacy

- deny-by-default object and administrative authorization;
- authenticated private peers, controlled bootstrap/discovery and no public DHT for private
  tiers;
- TLS/mTLS in transit and encryption before provider custody;
- metadata minimization, opaque identifiers at providers and separated mapping service;
- per-operation grants, bounded duration and purpose, immediate revocation path;
- protected logs omit names, object paths and content;
- malware/content-policy checks occur in an authorized quarantine boundary;
- provider compromise, correlation, rollback, replay, ransomware, malicious repair and
  traffic analysis are threat-modelled.

## Availability, capacity and performance

Institution profiles declare per tier: usable capacity floor, replication/erasure profile,
failure-domain count, proof interval, repair threshold, durability, p95/p99 latency,
throughput, IOPS, RPO/RTO, backup isolation, maximum egress and reserve. Admission rejects
new writes before safety reserve is consumed. Cache eviction never deletes authoritative
placements. Repair traffic is QoS-bounded but takes priority before durability falls below
the safe minimum.

## Failure and dependency matrix

| Failure | Behavior | Forbidden shortcut |
|---|---|---|
| Storage Authority unavailable | no new lifecycle mutation; existing scoped reads may continue | provider invents policy |
| Key Plane unavailable | ciphertext remains stored; new decrypt/write fails closed | escrow plaintext key in app config |
| one provider/shard lost | repair from independent healthy set | lower durability silently |
| private content peer untrusted | disconnect/quarantine and rotate affected peer credentials | continue because digest matches |
| proof delayed | grace only within policy, then quarantine/repair | assume durability |
| object gateway unavailable | fail over stateless gateway | bypass authorization to provider API |
| federation interruption | resume idempotently or expire; recipient does not activate partial object | treat sent bytes as custody acceptance |
| ledger unavailable | queue commitment/settlement | block ordinary object reads/writes after local authorization |
| deletion partial | report verified and unverified locations; retry/escalate | claim deletion complete |

## Deployment and environment separation

Development uses synthetic data and keys. Staging uses production-like topology with
non-production trust roots. Production separates management, storage, backup and federation
networks; key and storage operators have separated privileges. Provider and controller
upgrades are canaried, format compatibility tested and rolled back without changing the
manifest contract. Backups cross a distinct failure and credential domain.

## Observability and operations

Metrics cover logical/physical/usable capacity, latency, errors, proof freshness, degraded
objects, repair backlog/time, fragment concentration, key operations, unauthorized access,
cache performance, egress, federation transfers, deletion backlog and cost. Traces carry
opaque IDs. Alerts lead to object-storage, key, network, federation and restore runbooks.
Quarterly restore and provider-loss exercises are required for production.

## Alternatives and trade-offs

One Ceph cluster is a valid implementation building block but not the semantic architecture.
Public IPFS improves reach but exposes metadata and uncontrolled peers. Application-only
encryption without a key plane reduces components but makes recovery/rotation inconsistent.
Double erasure coding appears safer but amplifies write, repair and failure complexity.
PSDC therefore combines replaceable physical backends with one policy and evidence plane.

## Implementation sequence, migration and rollback

1. finalize schemas, tier rules and key hierarchy;
2. deploy Tier 0/1 with one internal provider and restore tests;
3. add placement offers, receipts and a second failure domain;
4. add private Tier 2 distribution;
5. add Tier 3 proofs/repair and then Tier 4 federation;
6. enable Tier 5 only after publication and irreversibility review.

Migration copies ciphertext under a candidate token, verifies it, switches the manifest and
retires the old placement after a safety window. Rollback restores the old reference while
valid. Tier 5 has no privacy rollback.

## Testing and evidence

The suite covers each tier, provider loss, repair, restore, authorization, metadata leakage,
key rotation, federation custody, retention/deletion and accounting.

## Binary acceptance criteria

These testing and evidence gates must pass per provider, tier and institution profile.

- **STORE-SA-ACC-001:** each tier passes allowed and prohibited classification fixtures;
- **STORE-SA-ACC-002:** provider loss repairs to the declared target within RPO/RTO without
  plaintext provider access;
- **STORE-SA-ACC-003:** key rotation rewraps envelopes or migrates ciphertext as declared and
  revoked grants stop working within the objective;
- **STORE-SA-ACC-004:** unauthorized peers cannot enumerate or fetch private content;
- **STORE-SA-ACC-005:** Tier 4 transfer activates only after recipient validation and signed
  custody acceptance;
- **STORE-SA-ACC-006:** deletion evidence enumerates manifest, placements, replicas, caches,
  backups and keys and records limitations;
- **STORE-SA-ACC-007:** a full restore works from independent backup after loss of the
  primary provider and operational database;
- **STORE-SA-ACC-008:** all placement bids, tokens and receipts contain references and
  obligations but no plaintext or usable key material.

## References

- [Storage TCO](../economics/Storage-TCO.md)
- [KMS](../security/KMS.md)
- [Network Architecture](../network/Network-Architecture.md)
- [ADR-0028](../architecture/architecture-decision-records/ADR-0028-private-content-and-storage-fabric.md)
- [Retention and Deletion](Retention-and-Deletion.md)
- [Object Storage Failure Runbook](../runbooks/Object-Storage-Failure.md)
