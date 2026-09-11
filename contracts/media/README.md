# Media Contract Profile


> Standard: PSDC-DOC-001
> Document type: repository-index
> Status: Normative
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: none; index governed by repository policy

The media profile defines Asset, UploadSession, ContentDigest, TechnicalMetadata,
Rights, Provenance, TransformJob, Rendition, DeliveryManifest, SpatialReference,
ModerationState and LifecyclePolicy. Source assets and renditions use immutable
content digests and S3-compatible references rather than shared databases.

Uploads are resumable, size-bounded, authenticated and scanned before publication.
Transforms declare deterministic inputs, tool and model versions, parameters,
resource limits and result digests. Rights and moderation decisions travel with
references and are rechecked at delivery. Protected spatial and identity metadata
is excluded from public renditions by default.

Implementations pass upload resume, hash integrity, malware, malformed media,
rights, moderation, deterministic rendition, deletion propagation, accessibility,
streaming fallback and cross-product reference tests.

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
