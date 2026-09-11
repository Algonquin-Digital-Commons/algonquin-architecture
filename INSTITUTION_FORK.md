# Algonquin Fork Boundary


> Standard: PSDC-DOC-001
> Document type: institution-deployment-profile
> Status: Normative
> Owner: Algonquin Institution Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

This repository is the `Algonquin-Digital-Commons` organization fork of
`Post-Secondary-Digital-Commons/psdc-architecture`. `origin` identifies the
Algonquin fork and `upstream` identifies the common repository. Shared
architecture and contract improvements go upstream first. Algonquin-only
decisions and operational evidence belong in `algonquin-deployment`.

## Institution

Institution: Algonquin College. This profile defines institution-controlled deployment values and may run standalone while consuming portable Commons contracts.

## Upstream and synchronization

The upstream is the corresponding Commons repository. Portable improvements arrive through reviewed synchronization; institution-specific configuration remains local.

## Override

Allowed overrides include branding, origins, identity claims, policy, capacity, enabled modules, legal/support links, and operator contacts. Overrides MUST be versioned and signed.

## Identity

Identity configuration names the approved issuer, claims, tenant, and session boundary. Secrets and credentials MUST remain in institution-controlled secret storage.

## Secrets

Secrets include issuer credentials, signing keys, provider keys, deployment tokens, and passwords; they MUST NOT be committed, logged, or exposed to clients.

## Rollback

Rollback retains a signed last-known-good artifact and configuration snapshot. Failed security, contract, health, or evidence gates block promotion and restore that release.
