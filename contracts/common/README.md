# Common Contract Definitions

> Standard: PSDC-DOC-001
> Document type: repository-index
> Status: D1 schema candidate
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-29
> Governing decisions: ADR-0001, ADR-0031

## Purpose and contents

`definitions.schema.json` owns shared structural definitions. Standalone C0 contracts now cover
portable resource references, RFC 9457-aligned error envelopes, signed authorization decisions,
detached RFC 8785 signed-object envelopes, and the executable state-machine definition. These
objects deliberately distinguish reference from existence, authentication from authorization,
schema validity from signature validity, and an operational decision from permanent authority.

## Allowed and prohibited contents

Only cross-domain structural primitives belong here. Domain state-machine *instances*, policy
rules, pricing policy, site values, secrets, and private infrastructure details are prohibited.
Referencing a definition does not grant authority or prove the referenced resource exists.

## Validation and change control

Every production schema and fixture is validated by the root runner. A breaking common change
requires a new common schema ID, affected-contract major versions, migration evidence, and
consumer review because a silent common edit can affect every domain.

## References

- [Shared Executable Contracts](../README.md)
- [Executable Contract Portfolio](../../docs/architecture/Executable-Contract-Portfolio.md)
