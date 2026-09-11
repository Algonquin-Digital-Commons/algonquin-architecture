# ADR-0002: Institutional Identity Is the Root of Access


> Standard: PSDC-DOC-001
> Document type: adr
> Status: Accepted
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Scope: Institutional users and services

## Context

Creating separate Algonquin AI or platform usernames and passwords would duplicate
identity lifecycle, weaken offboarding and MFA, and fragment authorization.

## Decision

Microsoft Entra and Algonquin institutional SSO remain the root for institutional
human identity. Applications use OIDC/OAuth flows and scopes, then map normalized
claims into local authorization. Headless clients use an approved device flow.
Workload and service identities use standard machine-to-machine mechanisms and
remain distinct from human sessions.

As clarified by
[ADR-0010](./ADR-0010-provider-neutral-core-institutional-production-authority.md),
Entra is the expected College-approved upstream for production institutional
users but is not embedded as the platform's internal identity contract. A
self-hosted open-source broker provides protocol brokering and claim normalization;
it does not replace the College as identity authority. Development, CI,
demonstration, and standalone environments use approved local/test identities.

Public Fediverse identity remains explicitly separated from institutional identity
unless a user performs a policy-approved account link.

## Consequences

- No platform-native password database for institutional users.
- The identity broker normalizes tenants and claims without becoming the source of
  institutional truth.
- RBAC/ABAC decisions are local policy decisions built on normalized identity.
- Identity outage and token compromise require documented degraded modes and
  incident procedures.
- The institutional adapter can be disabled or replaced without changing internal
  identity contracts, but institutional production login then becomes unavailable.
- Local/test accounts cannot be promoted into a parallel production account system
  for students, faculty, or staff.

## Alternatives and evidence

For **ADR-0002: Institutional Identity Is the Root of Access**, the decision record considered: retain the prior approach; adopt a mature compatible standard or open-source implementation; and build or fork a new primitive. The selected decision is preferred under the stated constraints. A change trigger is new security, licensing, interoperability, sovereignty, cost, or operational evidence; a new option requires an ADR update rather than an undocumented exception.

## Migration and rollback

A change implementing **ADR-0002: Institutional Identity Is the Root of Access** MUST preserve the current contract during the declared compatibility window, publish a versioned migration plan, and rehearse rollback before production promotion. Migration evidence includes inventory, data/state transformation, operator communication, and verification. Rollback is triggered by failed acceptance, security regression, loss of institution control, or unrecoverable compatibility failure; it restores the last accepted artifact and preserves audit history. If no migration is currently required, the owner MUST record that as a reviewed no-op and revisit it when the decision changes.
