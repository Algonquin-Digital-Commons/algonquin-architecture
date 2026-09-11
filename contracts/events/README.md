# Event Contract Profile


> Standard: PSDC-DOC-001
> Document type: repository-index
> Status: Normative
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: none; index governed by repository policy

Asynchronous integration uses CloudEvents 1.0 envelopes and AsyncAPI documents.
Required attributes are specversion, id, source, type, subject where applicable,
time, datacontenttype, dataschema, institution, classification, schemaVersion,
correlationId and causationId. Event payloads use versioned JSON Schema.

Producers own schemas and event meaning. Consumers deduplicate by source and ID,
declare ordering scope, handle at-least-once delivery, bound retries, use dead
letters, preserve correlation, and support replay from a documented checkpoint.
Protected data is minimized and encrypted; event authorization is enforced at
publication and consumption.

Breaking payload changes require a new major event type or schema version and a
parallel migration window. The conformance suite covers validation, duplicate,
reorder, replay, expiry, poison event, unavailable consumer, authorization and
classification enforcement.

## Purpose

This index explains the purpose and placement of $dir and links readers to the authoritative documents it contains.

## Allowed contents

This directory belongs to $repo. It may contain scoped documentation, contracts, configuration examples, tests, and navigation links owned by this repository.

## Prohibited contents

It MUST NOT contain secrets, credentials, private infrastructure values, unrelated product source, copied institution overrides, or undocumented external dependencies.

## Owner

The owning role is $owner; accountable maintenance remains with RedjiJB until a second maintainer is appointed.

## Contents

- `.gitkeep`
- `README.md`

## References

- [Ecosystem documentation quality standard](https://github.com/Post-Secondary-Digital-Commons/psdc-architecture/blob/main/docs/standards/Ecosystem-Documentation-Quality-Standard.md)
- [Repository governance](https://github.com/Post-Secondary-Digital-Commons/psdc-architecture/blob/main/docs/governance/GitHub-Repository-Governance.md)

## Contribution and change control

Changes MUST use a pull request, preserve the repository boundary, update affected links and contracts, and pass the structural and substantive documentation audits before merge.
