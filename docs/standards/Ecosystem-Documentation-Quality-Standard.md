# Algonquin Documentation Quality Profile

> Standard: PSDC-DOC-001
> Document type: governance-standard
> Status: Normative
> Owner: Algonquin Architecture Maintainer
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Upstream PSDC-DOC-001 and Algonquin governance

## Purpose and scope

This institution profile adopts the Post-Secondary Digital Commons ecosystem
documentation quality standard without weakening it. It applies to every
Algonquin fork document and deployment overlay. Institution values may add
stricter controls, but they MUST NOT redefine a common contract silently.

## Required controls

Every current document MUST declare the PSDC-DOC-001 control block, a document
type, owner, accountable maintainer, review date, governing decisions, scope,
dependencies, security/privacy boundary, failure or exception behavior, and
observable acceptance evidence appropriate to its type.

## Maturity and enforcement

Repository indexes may be concise but MUST identify allowed/prohibited contents,
ownership, inventory, references, and contribution rules. Architecture,
component, product, policy, contract, runbook, roadmap, provenance, and
deployment documents MUST meet their upstream type requirements. A document is
not implementation-ready when it is only a title, diagram, candidate list, or
empty heading set.

The workspace `Test-DocumentQuality.ps1` audit is the enforcement mechanism.
Algonquin changes MUST pass the structural gate and resolve or explicitly record
every substantive finding before merge. Historical exceptions require an ADR,
owner, reason, replacement, and expiry.

## Definition of done

Documentation is complete when links resolve, the common and institution
boundaries agree, accepted ADRs are traceable, secrets are absent, provenance
is reproducible, and the relevant conformance and acceptance evidence is linked.

## Change control

Changes MUST be made in a pull request, preserve the upstream relationship,
and identify whether they are common improvements or Algonquin-only overlays.
Common improvements are proposed upstream; institution-only policy and branding
remain in this fork. A conflict is resolved by the newest accepted ADR and an
explicit migration plan, never by silently editing the summary.

## References

- [Common PSDC-DOC-001](https://github.com/Post-Secondary-Digital-Commons/psdc-architecture/blob/main/docs/standards/Ecosystem-Documentation-Quality-Standard.md)
- [Institution fork policy](../../INSTITUTION_FORK.md)
