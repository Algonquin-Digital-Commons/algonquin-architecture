# ADR-0006: Thin, Upstream-Compatible Product Forks


> Standard: PSDC-DOC-001
> Document type: adr
> Status: Accepted
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Scope: Adopted user-facing and federated products

## Context

Branding, SSO, model catalogs, tools, and Algonquin integrations provide value;
rewriting mature products or allowing a fork to drift indefinitely does not.

## Decision

Eligible OSI-licensed clients, including OpenCode, remain thin downstream forks or
extension layers. The same upstream-first rule applies to adopted Fediverse and
other products. Changes use supported configuration or plugin surfaces first, are
proposed upstream when generally useful, and carry a measured patch budget when
maintained downstream.

ADR-0008 adds a mandatory license gate. Open WebUI v0.6.6 and later is not an
eligible dependency because its branding restriction is not OSI-approved. It may
be treated as a protocol-compatibility target. ADR-0009 selects its BSD-3-Clause
v0.6.5 source as the preferred, gated bootstrap for Algonquin AI Web. That source
is a frozen foundation for independent development, not a moving upstream.

## Consequences

- Security and feature updates remain mergeable.
- Every downstream patch needs an owner, rationale, compatibility test, and removal
  or upstream plan.
- Deep visual or architectural divergence requires an ADR and lifecycle funding.
- A license change automatically suspends adoption or upgrade until the new terms
  pass the open-source admission test.

## Alternatives and evidence

For **ADR-0006: Thin, Upstream-Compatible Product Forks**, the decision record considered: retain the prior approach; adopt a mature compatible standard or open-source implementation; and build or fork a new primitive. The selected decision is preferred under the stated constraints. A change trigger is new security, licensing, interoperability, sovereignty, cost, or operational evidence; a new option requires an ADR update rather than an undocumented exception.

## Migration and rollback

A change implementing **ADR-0006: Thin, Upstream-Compatible Product Forks** MUST preserve the current contract during the declared compatibility window, publish a versioned migration plan, and rehearse rollback before production promotion. Migration evidence includes inventory, data/state transformation, operator communication, and verification. Rollback is triggered by failed acceptance, security regression, loss of institution control, or unrecoverable compatibility failure; it restores the last accepted artifact and preserves audit history. If no migration is currently required, the owner MUST record that as a reviewed no-op and revisit it when the decision changes.

## Alternatives

Considered alternatives include retaining the prior approach, adopting a mature open implementation, and building a local adapter. The selected decision is preferred under the stated requirements, constraints, sovereignty, and maintenance capacity; a new option requires a superseding ADR.
