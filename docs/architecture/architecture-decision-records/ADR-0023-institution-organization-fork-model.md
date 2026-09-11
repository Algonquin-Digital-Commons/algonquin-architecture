# ADR-0023: Institution Organizations Use Thin Repository Forks


> Standard: PSDC-DOC-001
> Document type: adr
> Status: Accepted
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Date: 2026-09-11
> Scope: GitHub organizations, white-labelling and upstream synchronization
> Decision owner: Project founder

## Context

The neutral Commons and each institution require separate ownership, permissions,
release channels and branding. GitHub cannot fork an organization as one object;
fork relationships exist repository by repository.

## Decision

The Commons GitHub organization owns the canonical `psdc-*` upstream
repositories. The Algonquin GitHub organization owns matching `algonquin-*` thin
forks. Every other institution repeats the same mapping in its own organization.

In an institution checkout:

- `origin` is the institution-owned GitHub fork;
- `upstream` is the corresponding Commons repository;
- shared fixes and generally useful features are proposed upstream first;
- institution-only branding, identity mappings, endpoints and policy remain in
  the forked deployment-template repository and signed deployment manifest; and
- product forks contain only the smallest unavoidable institution patch set.

The fork is a distribution, review and release boundary. It is not permission to
hard-code institution identity into reusable source. White-labelling combines the
thin fork with configuration and assets, preserving upstream compatibility.

## Release flow

1. The Commons repository publishes a signed release and contract compatibility
   metadata.
2. The institution fork synchronizes and runs its own security, accessibility,
   policy and integration gates.
3. The institution deployment repository pins approved fork releases.
4. The institution signs and distributes its manifests, packages and images.
5. Reusable institution improvements are submitted to the Commons upstream.

## Consequences

- The initial hosted topology uses `Post-Secondary-Digital-Commons` for common
  repositories and `Algonquin-Digital-Commons` for Algonquin forks.
- Every institution checkout must keep its institution fork as `origin` and the
  matching common repository as `upstream`.
- Fork synchronization, divergence budgets and upstream contribution metrics are
  required in CI.
- Institution production authority remains independent even when software history
  is shared.
- Another university can reproduce the white-label model without asking
  Algonquin for infrastructure, identity or release access.

## Alternatives and evidence

For **ADR-0023: Institution Organizations Use Thin Repository Forks**, the decision record considered: retain the prior approach; adopt a mature compatible standard or open-source implementation; and build or fork a new primitive. The selected decision is preferred under the stated constraints. A change trigger is new security, licensing, interoperability, sovereignty, cost, or operational evidence; a new option requires an ADR update rather than an undocumented exception.

## Migration and rollback

A change implementing **ADR-0023: Institution Organizations Use Thin Repository Forks** MUST preserve the current contract during the declared compatibility window, publish a versioned migration plan, and rehearse rollback before production promotion. Migration evidence includes inventory, data/state transformation, operator communication, and verification. Rollback is triggered by failed acceptance, security regression, loss of institution control, or unrecoverable compatibility failure; it restores the last accepted artifact and preserves audit history. If no migration is currently required, the owner MUST record that as a reviewed no-op and revisit it when the decision changes.
