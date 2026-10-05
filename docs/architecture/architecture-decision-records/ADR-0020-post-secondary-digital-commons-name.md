# ADR-0020: Post-Secondary Digital Commons Is the Shared Platform Name


> Standard: PSDC-DOC-001
> Document type: adr
> Status: Accepted
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Date: 2026-09-10
> Scope: Shared architecture, software, contracts, documentation and federation
> Decision owner: Project founder

## Context

The reusable platform is intended for independently governed post-secondary
institutions. Naming shared software or architecture after Algonquin incorrectly
implies that Algonquin is a central operator, tenant host, identity authority or
owner of peer deployments.

The shared name must communicate the post-secondary commons without implying a
central federation operator. Federation remains a capability and operating
model, not part of the product name.

## Decision

The canonical shared platform name is **Post-Secondary Digital Commons**,
abbreviated **PSDC** where an acronym is useful.

- PSDC names shared architecture, protocols, contracts, schemas, reference
  software, conformance tests and federation profiles.
- Each post-secondary institution operates a complete standalone **institution
  deployment** under its own authority, branding and technology selections.
- **Algonquin Digital Platform** and the `AC` product names refer only to the
  Algonquin reference deployment and its deployment overlay.
- Shared component names are Commons Cloud Fabric, Commons Compute Fabric,
  Commons AI Fabric, Commons Media and Spatial Fabric, and Commons Social Fabric.
- Shared repositories use the neutral `psdc-*` prefix. `algonquin-*` names are
  reserved for Algonquin's institution-owned forks and deployment overlay.
- Federation is optional, explicitly trusted, revocable and incapable of
  becoming a peer's local identity, policy, data or infrastructure authority.

Algonquin maintains the first reference implementation and demonstrates a
conforming deployment. It does not operate a mandatory global control plane.

## Governance model

Local clubs may steward development, community governance, education and
deployment proposals. The institution remains accountable for production
identity, student data, keys, infrastructure, policy, moderation, compliance,
service continuity and risk acceptance.

## Consequences

- Documentation must use PSDC for shared material and reserve Algonquin naming
  for an explicitly labelled deployment example or overlay.
- Institution branding and component choice can differ without breaking
  federation, provided the selected protocol profiles pass conformance tests.
- A disconnected institution continues operating its local platform.

## Alternatives and evidence

For **ADR-0020: Post-Secondary Digital Commons Is the Shared Platform Name**, the decision record considered: retain the prior approach; adopt a mature compatible standard or open-source implementation; and build or fork a new primitive. The selected decision is preferred under the stated constraints. A change trigger is new security, licensing, interoperability, sovereignty, cost, or operational evidence; a new option requires an ADR update rather than an undocumented exception.

## Migration and rollback

A change implementing **ADR-0020: Post-Secondary Digital Commons Is the Shared Platform Name** MUST preserve the current contract during the declared compatibility window, publish a versioned migration plan, and rehearse rollback before production promotion. Migration evidence includes inventory, data/state transformation, operator communication, and verification. Rollback is triggered by failed acceptance, security regression, loss of institution control, or unrecoverable compatibility failure; it restores the last accepted artifact and preserves audit history. If no migration is currently required, the owner MUST record that as a reviewed no-op and revisit it when the decision changes.

## Alternatives

Considered alternatives include retaining the prior approach, adopting a mature open implementation, and building a local adapter. The selected decision is preferred under the stated requirements, constraints, sovereignty, and maintenance capacity; a new option requires a superseding ADR.
