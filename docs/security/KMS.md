# Key Management and Cryptographic Authority

> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: PSDC Security Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: ADR-0002, ADR-0010, ADR-0013, ADR-0027, ADR-0028

## Purpose and measurable outcomes

This specification defines institution-controlled cryptographic authority for storage,
workload identity, credentials, signing, backups and federation. It ensures that loss of a
storage provider does not lose keys, compromise of a provider does not reveal plaintext, and
federation does not require a shared consortium master key.

Outcomes are non-exportable root/KEK protection where practical, least-privilege
operation-scoped grants, rehearsed recovery, deterministic rotation/revocation, complete
key-use evidence and independent institutional operation.

## Scope, exclusions and prohibited behavior

In scope: trust roots, HSM/PKCS#11 boundary, OpenBao services, envelope encryption, key
classes, issuance, wrapping, rotation, revocation, backup, recovery, deletion, federation
and audit.

Out of scope: business authorization, data classification and deciding who should receive a
credential. The key service enforces a signed policy decision but does not invent one. Root
keys, KEKs, issuer keys and validator keys MUST NOT be committed to Git, embedded in images,
placed in ledger transactions, shared between institutions or exposed to storage providers.

## Technology default and boundary

- OpenBao is the self-hosted secrets and transit/key-service control plane.
- Production cryptographic roots and high-impact signing/KEKs use an institution-controlled
  HSM or hardware-backed PKCS#11 provider where risk and budget justify it.
- step-ca and cert-manager handle certificate issuance; SPIRE handles workload identities.
- SOPS plus age may protect GitOps bootstrap material, but is not the runtime KMS.
- Applications use versioned key APIs and envelope formats, not product-specific storage.

OpenBao, HSM, PKI and SPIRE are separate roles. One product compromise must not expose every
key class.

## Authority and key hierarchy

    offline institution recovery/root authority
                 |
       +---------+----------+
       |                    |
    PKI roots          KMS recovery quorum
       |                    |
    issuing CAs       HSM-backed KEKs/signing keys
       |                    |
 workload certs       wrapped DEKs / signed records

Each institution has independent roots. Federation trust bundles contain approved public
keys/certificates and constraints, never private roots. Cross-institution storage transfer
rewraps a DEK to a recipient-controlled key or streams data through an authorized ephemeral
transfer session.

## Architecture and ownership boundaries

Security authority owns roots and policy; custodians perform ceremonies; OpenBao/HSM owns
key operations; PKI/SPIRE owns certificate/workload issuance; callers own business purpose.

## Security, privacy and policy

Keys and operations are least-privilege, purpose-bound, minimized and audited. Logs reveal
identifiers and outcomes, never key material or plaintext.

## Key classes and ownership

| Class | Owner | Default handling | Rotation trigger |
|---|---|---|---|
| offline root/recovery | institutional security authority | offline, quorum-controlled, geographically separated evidence | planned ceremony or compromise |
| intermediate CA | PKI operations | HSM-backed where practical; short-lived issued certs | scheduled, policy or incident |
| workload identity | SPIRE/cert-manager | short-lived and automatically renewed | frequent automatic rotation |
| storage KEK | storage key authority | HSM/OpenBao transit; non-exportable where possible | scheduled, staff/provider change, compromise |
| object DEK | generated per object or bounded group | random, wrapped, never stored plaintext | object version/reclassification or cryptographic event |
| VC issuer key | credential authority | separated signing service and HSM profile | published key lifecycle and credential window |
| artifact/evidence signer | release/evidence authority | separate key and identity from issuer/ledger | release policy or compromise |
| ledger validator/proposer | ledger operations | separate host/HSM profile | validator rotation/governance |
| backup encryption | backup authority | separate credential/failure domain | scheduled or restore/incident |
| developer/test | environment owner | synthetic and isolated | frequent; never promoted |

## Envelope encryption

1. The caller authenticates with a short-lived workload identity.
2. Policy authorizes a purpose, object, operation and duration.
3. A cryptographically secure DEK is generated.
4. Content is encrypted locally or in an authorized gateway boundary.
5. The KMS wraps the DEK under the current KEK and returns an envelope containing key ID,
   version, algorithm, nonce/parameters and wrapped DEK.
6. Storage receives ciphertext and envelope reference, not the plaintext DEK.
7. Retrieval obtains a short-lived unwrap/decrypt operation only after fresh authorization.

Authenticated encryption is required. Algorithm suites are versioned and cryptographically
agile; institution/FIPS requirements are deployment-profile choices. Custom cryptographic
algorithms are prohibited.

## Interfaces

- Encrypt/wrap, decrypt/unwrap, sign, verify, issue, revoke and metadata operations use
  authenticated versioned APIs with explicit purpose and object binding.
- Workloads authenticate through SPIFFE identities or approved equivalent, not static root
  tokens.
- Every request has an idempotency key where replay could duplicate state and a trace ID that
  does not reveal protected content.
- Key aliases resolve to immutable versions; ciphertext records the exact version.
- Error responses distinguish policy denial, unavailable service, invalid ciphertext,
  revoked version and rate limit without becoming an oracle for unauthorized callers.

## Authorization and separation of duties

No single routine operator can create a production root, change key policy, export recovery
material and erase audit evidence. Required roles are security authority, key custodian,
service owner, recovery approver and auditor. During the current one-maintainer phase,
procedural role overlap is documented and high-impact ceremonies require recorded
two-person/quorum participation from authorized institutional staff before production.

Break-glass grants are purpose-bound, time-limited, separately approved where personnel
exists, heavily audited and automatically revoked. Break-glass cannot export non-exportable
keys or bypass legal holds.

## Rotation, revocation and cryptographic erasure

- certificate/workload keys rotate automatically before expiry;
- KEK rotation normally rewraps DEKs without re-encrypting large data;
- algorithm or DEK compromise requires decrypt/re-encrypt migration;
- issuer-key rotation preserves verification metadata for still-valid credentials;
- revocation propagates to gateways, workloads, federation trust and caches within the
  declared objective;
- cryptographic erasure destroys all authorized wrapped DEKs/KEKs only after retention,
  hold, replica and recovery policy checks and records the limitation that previously
  disclosed plaintext cannot be recalled.

## Backup and recovery

Recovery material is quorum-split or multi-custodian, encrypted, offline and held in
separate physical/administrative failure domains. Backups include configuration, policies,
key metadata and necessary protected state but not an undocumented plaintext export of HSM
keys. Recovery exercises rebuild a clean key service, restore policy, verify a controlled
fixture, rotate affected credentials and demonstrate audit continuity.

## Federation

Federation gateways mutually authenticate, validate institution trust and use recipient
public keys. The sender issues a manifest-bound transfer grant and rewraps or transfers the
DEK only for the approved recipient/purpose/expiry. Recipient acceptance creates its local
custody and key reference. Revocation cannot erase a recipient's already decrypted copy;
contracts, retention and evidence govern that reality.

## Failure and threat matrix

| Failure/threat | Required behavior |
|---|---|
| OpenBao node loss | fail over HA cluster; no static emergency root in applications |
| HSM unavailable | bounded outage/degraded verification as designed; no software key copy |
| policy engine unavailable | deny new unwrap/sign operations except explicit offline-safe verification |
| root/KEK suspected compromise | stop affected operations, activate incident plan, rotate hierarchy and inventory exposure |
| workload identity stolen | revoke identity, deny new grants, expire short-lived credentials and investigate uses |
| rollback to old ciphertext/key metadata | authenticated version and manifest digest reject mismatch |
| audit sink unavailable | bounded local protected buffer; high-impact operations stop at threshold |
| recovery shares lost | report loss and re-establish ceremony before redundancy falls below threshold |
| malicious custodian | quorum and separation prevent unilateral recovery/export |

## Deployment, capacity and observability

Production uses HA across at least two power/network failure domains, dedicated management
access, sealed bootstrap, protected audit export and rate limits per identity/key class.
Capacity planning covers peak unwrap/sign operations, federation bursts, rotation and mass
recovery. Metrics expose availability, latency, denial reasons, grant count, version age,
rotation status, revocation propagation, HSM health and recovery readiness—never key
material or plaintext.

## Alternatives and trade-offs

Cloud-hosted KMS reduces operations but violates the no-required-vendor and standalone goals.
Software-only keys are cheaper but weaker against host compromise. One shared consortium
root simplifies federation but creates catastrophic common authority. Per-institution roots
plus constrained trust bundles add governance work and preserve sovereignty. Client-only
keys maximize user control but cannot alone meet institutional recovery, service and records
obligations; PSDC supports user-held keys for appropriate personal data alongside
institutional classes.

## Implementation sequence, migration and rollback

1. define key classes, policies, envelope schema and synthetic fixtures;
2. deploy development OpenBao and workload identity with synthetic keys;
3. perform production root/recovery ceremony and HSM evaluation;
4. integrate storage envelopes and artifact/evidence signing;
5. add VC issuer and federation profiles after separate approval;
6. rehearse compromise, restore, rewrap, revocation and total-site recovery.

Rollback restores the prior accepted service/configuration while retaining new key versions
for decrypt compatibility. Never roll back by reactivating a compromised key. Ciphertext
migration remains resumable and evidence-preserving.

## Testing and evidence

Tests cover authorization denial, envelope integrity, rotation, compromise, quorum recovery,
federation rewrap and deletion evidence without exposing key material.

## Binary acceptance criteria

These testing and evidence gates are mandatory before production key custody.

- **SEC-KMS-ACC-001:** storage providers and database dumps contain no plaintext DEK/KEK;
- **SEC-KMS-ACC-002:** an unauthorized workload, wrong purpose, expired grant, revoked key
  and altered envelope each fail closed with stable evidence;
- **SEC-KMS-ACC-003:** KEK rotation rewraps controlled fixtures and both migration and
  rollback behavior are proven;
- **SEC-KMS-ACC-004:** clean-site recovery restores authorized fixture access within RTO
  without one custodian acting alone;
- **SEC-KMS-ACC-005:** compromise exercise identifies affected objects/credentials, revokes
  access and rotates within declared objectives;
- **SEC-KMS-ACC-006:** two institutions exchange an approved encrypted object without
  sharing private roots or leaving the sender key generally usable;
- **SEC-KMS-ACC-007:** cryptographic deletion records every key/placement/backup decision and
  accurately states unverifiable prior copies.

## References

- [Storage Architecture](../storage/Storage-Architecture.md)
- [PKI](PKI.md)
- [Secrets Management](Secrets-Management.md)
- [Key Rotation Runbook](../runbooks/Key-Rotation.md)
- [ADR-0028](../architecture/architecture-decision-records/ADR-0028-private-content-and-storage-fabric.md)
