# ADR-0010: Provider-Neutral Core with Institutional Production Authorities


> Standard: PSDC-DOC-001
> Document type: adr
> Status: Accepted
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Date: 2026-09-10
> Scope: Identity and academic integrations
> Decision owner: Project founder; production configuration requires College approval

## Context

The platform must be portable and locally testable without distributing College
credentials. That requirement must not be misread as creating a competing student
identity authority or unofficial academic source for Algonquin production.

## Decision

The core depends on stable internal provider contracts, not Entra- or
Brightspace-specific concepts.

### Identity

Applications consume normalized identities, affiliations, groups, roles, scopes,
and assurance through the platform identity contract. A self-hosted broker such as
Keycloak implements protocol brokering and claim normalization; it is not the
authoritative source for institutional people.

- Production Algonquin deployments use College-approved institutional identity
  through OIDC/OAuth. Microsoft Entra is the expected current upstream.
- Development, CI, demonstrations, and standalone deployments use an approved
  local OIDC provider or deterministic test adapter.
- Local identities must not become a parallel production account system for
  students, faculty, or staff.
- Break-glass operator and workload identities are separately governed, scoped,
  audited, and never presented as institutional human identity.

### Academic services

Clients and agents consume an internal Academic Service contract for courses,
content, assignments, deadlines, announcements, and permitted actions.

- Production Algonquin academic features use College-approved integrations;
  Brightspace is the expected current LMS adapter.
- Development and CI use local fixtures or a test academic provider.
- Future LMS adapters translate into the same contract without leaking vendor
  object names or permissions into clients and agents.
- General AI remains available when the academic adapter is unavailable; academic
  features report explicit degradation.

## Required boundaries

- No client integrates directly with Entra or Brightspace.
- Provider-specific tokens, identifiers, errors, and schemas terminate at the
  adapter.
- Contract tests run against local/test providers on every self-hosted CI run.
- Separate controlled integration tests validate College-approved adapters.
- Production authority and core runtime dependency are documented separately.

## Consequences

- A contributor can run the core without College VPN access or credentials.
- Institutional lifecycle, MFA, account authority, and academic truth remain with
  College-approved systems in production.
- Provider outages affect the named capability without contaminating unrelated
  platform services.
- ADR-0002, ADR-0007, and ADR-0008 are interpreted through this distinction.

## Alternatives and evidence

For **ADR-0010: Provider-Neutral Core with Institutional Production Authorities**, the decision record considered: retain the prior approach; adopt a mature compatible standard or open-source implementation; and build or fork a new primitive. The selected decision is preferred under the stated constraints. A change trigger is new security, licensing, interoperability, sovereignty, cost, or operational evidence; a new option requires an ADR update rather than an undocumented exception.

## Migration and rollback

A change implementing **ADR-0010: Provider-Neutral Core with Institutional Production Authorities** MUST preserve the current contract during the declared compatibility window, publish a versioned migration plan, and rehearse rollback before production promotion. Migration evidence includes inventory, data/state transformation, operator communication, and verification. Rollback is triggered by failed acceptance, security regression, loss of institution control, or unrecoverable compatibility failure; it restores the last accepted artifact and preserves audit history. If no migration is currently required, the owner MUST record that as a reviewed no-op and revisit it when the decision changes.

## Alternatives

Considered alternatives include retaining the prior approach, adopting a mature open implementation, and building a local adapter. The selected decision is preferred under the stated requirements, constraints, sovereignty, and maintenance capacity; a new option requires a superseding ADR.
