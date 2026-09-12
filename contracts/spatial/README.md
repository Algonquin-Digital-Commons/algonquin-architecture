# Spatial Contract Profile


> Standard: PSDC-DOC-001
> Document type: repository-index
> Status: Normative
> Owner: Algonquin Institution Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: none; index governed by repository policy

The spatial profile defines Place, CoordinateReference, Geometry, Scene,
SpatialAsset, Capture, Anchor, Route, VisibilityPolicy and PrecisionPolicy.
Geometry uses GeoJSON and declared coordinate reference semantics; 3D scenes use
glTF or OpenUSD references where appropriate. Every record states provenance,
accuracy, observation time, owner, classification and allowed precision.

Private, safety-sensitive or accessibility-sensitive locations default to the
least precise representation needed for the authorized purpose. Public federation
never receives a more precise location than local policy permits. Indoor maps,
device captures and real-time position require explicit authority and retention.

Implementations pass coordinate, precision reduction, access, redaction, stale
data, route accessibility, reference integrity, deletion and cross-client tests.

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

## Contribution and change control

Changes MUST use a pull request, preserve the repository boundary, update affected links and contracts, and pass the structural and substantive documentation audits before merge.

## References

- [Ecosystem documentation quality standard](https://github.com/Post-Secondary-Digital-Commons/psdc-architecture/blob/main/docs/standards/Ecosystem-Documentation-Quality-Standard.md)
- [Repository governance](https://github.com/Post-Secondary-Digital-Commons/psdc-architecture/blob/main/docs/governance/GitHub-Repository-Governance.md)

