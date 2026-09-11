# ADR-0008: Open-Source, Self-Hosted Core


> Standard: PSDC-DOC-001
> Document type: adr
> Status: Accepted
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Date: 2026-09-10
> Scope: Entire Algonquin Digital Platform
> Decision owner: Project founder; institutional ratification still required

## Context

The platform must remain operable, inspectable, teachable, and migratable without
paying for or depending on an external vendor's hosted control plane, proprietary
cloud API, closed database, license server, or SaaS-only feature.

Algonquin may still need to interoperate with institutional systems such as Entra
or Brightspace. Those integrations must remain boundary adapters rather than
foundational runtime dependencies.

## Decision

The core platform uses software distributed under an OSI-approved open-source
license and capable of being deployed on infrastructure controlled by Algonquin.

Core operation must not require:

- an external SaaS account or hosted control plane;
- a proprietary cloud provider API;
- a paid enterprise edition for security, high availability, backup, SSO, audit,
  or basic operations;
- a remote license check or mandatory telemetry service;
- a proprietary data format without an open export and migration path;
- credentials held by an outside vendor.

Every component must have local deployment documentation, reproducible
configuration, documented data ownership, backup/restore, monitoring, upgrade,
rollback, and replacement procedures.

## External boundary adapters

Entra, Brightspace, email/SMS carriers, public federation peers, or other
institutional/external services may be integrated only through optional adapters.
The owning document must define:

- what capability becomes unavailable when the external system is down;
- a local development and test substitute;
- the minimum data and permissions crossing the boundary;
- disablement, migration, and credential-revocation procedures;
- whether institutional policy makes the adapter mandatory for a particular
  production deployment.

The platform core must continue operating when an optional adapter is disabled.
This portability rule does not authorize local/test providers as alternate
production authorities: production institutional login and academic data use
College-approved providers as defined by ADR-0010.

## Exceptions

Hardware firmware, accelerator drivers, regulatory services, or institutionally
mandated systems may make a fully open stack impossible in a specific deployment.
An exception requires its own ADR, named owner, affected capability, risk,
containment boundary, open alternative analysis, exit plan, and review date.

## Consequences

- Procurement and convenience do not override portability.
- “Source available” is not treated as open source.
- License and dependency scans become release gates.
- Obsidian may be used as an optional editor, but standard Markdown and ordinary
  relative links remain the documentation source format.
- The project must invest in operating its own infrastructure and developing
  internal skills rather than outsourcing control.

## Alternatives and evidence

For **ADR-0008: Open-Source, Self-Hosted Core**, the decision record considered: retain the prior approach; adopt a mature compatible standard or open-source implementation; and build or fork a new primitive. The selected decision is preferred under the stated constraints. A change trigger is new security, licensing, interoperability, sovereignty, cost, or operational evidence; a new option requires an ADR update rather than an undocumented exception.

## Migration and rollback

A change implementing **ADR-0008: Open-Source, Self-Hosted Core** MUST preserve the current contract during the declared compatibility window, publish a versioned migration plan, and rehearse rollback before production promotion. Migration evidence includes inventory, data/state transformation, operator communication, and verification. Rollback is triggered by failed acceptance, security regression, loss of institution control, or unrecoverable compatibility failure; it restores the last accepted artifact and preserves audit history. If no migration is currently required, the owner MUST record that as a reviewed no-op and revisit it when the decision changes.

## Alternatives

Considered alternatives include retaining the prior approach, adopting a mature open implementation, and building a local adapter. The selected decision is preferred under the stated requirements, constraints, sovereignty, and maintenance capacity; a new option requires a superseding ADR.
