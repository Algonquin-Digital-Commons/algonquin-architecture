# ADR-0007: Use Supported Brightspace Integration Mechanisms


> Standard: PSDC-DOC-001
> Document type: adr
> Status: Accepted
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Scope: Academic integrations

## Context

Scraping Brightspace pages or inventing an unofficial LMS protocol would be
fragile, difficult to authorize, and hard to secure.

## Decision

Brightspace integration uses supported D2L mechanisms such as approved APIs,
OAuth, and LTI 1.3 as appropriate. The connector translates those interfaces into
internal versioned academic contracts. Initial access is read-only and least
privilege; write actions require separate risk review and explicit confirmation.

As clarified by
[ADR-0010](./ADR-0010-provider-neutral-core-institutional-production-authority.md),
Brightspace is the expected College-approved provider for production Algonquin
academic features, while the core depends only on the internal Academic Service
contract. Development and CI use local fixtures or a test provider. General AI
continues without Brightspace; production features that require authoritative
course data become explicitly unavailable when its adapter is disabled.

## Consequences

- Integration depends on institutional approval and supported D2L contracts.
- API limitations are surfaced as constraints rather than bypassed through
  scraping.
- Contract tests and vendor-change monitoring are required.
- Disabling the connector does not disable the core platform, but it does disable
  the production academic capabilities that require authoritative LMS data.

## Alternatives and evidence

For **ADR-0007: Use Supported Brightspace Integration Mechanisms**, the decision record considered: retain the prior approach; adopt a mature compatible standard or open-source implementation; and build or fork a new primitive. The selected decision is preferred under the stated constraints. A change trigger is new security, licensing, interoperability, sovereignty, cost, or operational evidence; a new option requires an ADR update rather than an undocumented exception.

## Migration and rollback

A change implementing **ADR-0007: Use Supported Brightspace Integration Mechanisms** MUST preserve the current contract during the declared compatibility window, publish a versioned migration plan, and rehearse rollback before production promotion. Migration evidence includes inventory, data/state transformation, operator communication, and verification. Rollback is triggered by failed acceptance, security regression, loss of institution control, or unrecoverable compatibility failure; it restores the last accepted artifact and preserves audit history. If no migration is currently required, the owner MUST record that as a reviewed no-op and revisit it when the decision changes.

## Alternatives

Considered alternatives include retaining the prior approach, adopting a mature open implementation, and building a local adapter. The selected decision is preferred under the stated requirements, constraints, sovereignty, and maintenance capacity; a new option requires a superseding ADR.
