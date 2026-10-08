# KMS Contract Profile

> Standard: PSDC-DOC-001
> Document type: repository-index
> Status: D1 schema candidates; not a deployed KMS
> Owner: PSDC Security Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-27
> Governing decisions: ADR-0028

## Purpose and contents

`kms-operation-grant.schema.json` represents a short-lived, purpose-bound authorization to use a
named key for explicit operations and resources. `key-envelope.schema.json` represents an
encrypted data key bound to an object and associated-data digest. Neither exposes key material
or replaces live KMS authorization.

## Allowed and prohibited contents

Opaque key references, versions, algorithms, encrypted key bytes, policy decisions, approvals,
and revocation evidence are allowed. Plaintext keys, wildcard purpose, credentials, private-key
exports, and indefinite unbounded grants are prohibited.

## Validation and change control

The root runner covers active and revoked grants and a valid envelope. KMS integration must also
verify live time, use count, subject/workload identity, policy, approval quorum, key status,
associated data, algorithm policy, audit emission, and compromise recovery.

## References

- [KMS Architecture](../../docs/security/KMS.md)
- [Object Manifest](../storage/object-manifest.schema.json)

