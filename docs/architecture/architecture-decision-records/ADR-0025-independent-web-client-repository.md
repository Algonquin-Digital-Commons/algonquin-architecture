# ADR-0025: Independent Web Client Repository


> Standard: PSDC-DOC-001
> Document type: adr
> Status: Accepted
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Date: 2026-09-11

## Context

The browser client was initially scoped inside `psdc-ai/apps/web`, while the
desktop and mobile clients had independent repositories. The embedded layout
mixed a user-facing product lifecycle with the AI service lifecycle and made
institution branding, accessibility review, browser security, and independent
release management harder to govern.

## Decision

The common browser client SHALL live in `psdc-web`. Each institution SHALL use a
thin fork, beginning with `algonquin-web`, for branding, issuer discovery,
institution policy, supported domain names, and release configuration.

The web client SHALL:

- communicate with platform services only through documented gateway contracts;
- use OIDC authorization-code flow with PKCE and secure same-site session cookies;
- avoid storing bearer tokens in browser persistent storage;
- meet WCAG 2.2 AA and support keyboard-only and assistive-technology operation;
- provide responsive Chat, Study, Work, Code, Campus, account, privacy, and
  administration experiences according to role;
- support installable progressive-web-app metadata without requiring installation;
- use institution-neutral packages and keep institution branding in the fork;
- preserve Open WebUI provenance constraints if the approved historical baseline
  is imported; no upstream source is imported merely by creating the repository;
- release independently from `psdc-ai`, `psdc-desktop`, and `psdc-mobile`.

The former `psdc-ai/apps/web` path SHALL contain only a migration notice after
the documentation is moved. AI services SHALL NOT contain browser-client source.

## Interfaces

`psdc-web` consumes the AI gateway, identity discovery, academic, files,
notifications, media, social, and action-gateway APIs. It owns no authoritative
institutional data and accesses no inference engine, database, object store,
learning-management system, or federation server directly.

## Consequences

- Browser release and security policy can evolve independently.
- Common and institution-specific concerns have the same fork model as desktop
  and mobile.
- Two repositories are added to the ecosystem inventory.
- Shared API contracts remain owned by their domain repositories rather than by
  the web client.

## Alternatives and evidence

For **ADR-0025: Independent Web Client Repository**, the decision record considered: retain the prior approach; adopt a mature compatible standard or open-source implementation; and build or fork a new primitive. The selected decision is preferred under the stated constraints. A change trigger is new security, licensing, interoperability, sovereignty, cost, or operational evidence; a new option requires an ADR update rather than an undocumented exception.

## Migration and rollback

A change implementing **ADR-0025: Independent Web Client Repository** MUST preserve the current contract during the declared compatibility window, publish a versioned migration plan, and rehearse rollback before production promotion. Migration evidence includes inventory, data/state transformation, operator communication, and verification. Rollback is triggered by failed acceptance, security regression, loss of institution control, or unrecoverable compatibility failure; it restores the last accepted artifact and preserves audit history. If no migration is currently required, the owner MUST record that as a reviewed no-op and revisit it when the decision changes.
