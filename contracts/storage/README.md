# Storage Contract Profile

> Standard: PSDC-DOC-001
> Document type: repository-index
> Status: D1 schema candidates; not a running storage authority
> Owner: PSDC Storage Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-27
> Governing decisions: ADR-0028, ADR-0029

## Purpose and contents

`object-manifest.schema.json` records content identity, classification, purpose, tier,
encryption-envelope reference, retention, residency, and optional private content addressing.
`storage-placement.schema.json` is the authority-issued placement token describing approved
providers, durability, repair, and policy without putting the data or plaintext key in metadata.

## Allowed and prohibited contents

Digests, opaque identifiers, tier, zones, custody requirements, and encrypted-key references are
allowed. Plaintext content/keys, provider credentials, private addresses, consent substitutes,
and a CID treated as authorization are prohibited. Tier 5 is constrained to public content and
intentional public permanence.

## Validation and change control

The root runner validates positive and prohibited-key fixtures. Runtime services must also test
retention time, jurisdiction, provider health, erasure parameters, repair thresholds, custody,
revocation, and verified deletion; JSON Schema alone cannot prove these relationships.

## References

- [Storage Architecture](../../docs/storage/Storage-Architecture.md)
- [Storage TCO](../../docs/economics/Storage-TCO.md)

