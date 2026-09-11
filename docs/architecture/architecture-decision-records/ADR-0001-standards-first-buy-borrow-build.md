# ADR-0001: Standards-First / Buy-Borrow-Build


> Standard: PSDC-DOC-001
> Document type: adr
> Status: Accepted
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Scope: Entire Algonquin Digital Platform
> Decision owner: Platform architecture
> Review trigger: A proposal to create a new infrastructure primitive or protocol

## Context

The platform spans cloud, compute, AI, academic integrations, clients, media,
spatial systems, and a federated social suite. Reimplementing identity, protocols,
schedulers, storage, telemetry, policy languages, or runtimes would consume the
project's limited engineering capacity and create interfaces understood only by
the project.

The platform's differentiating value is Algonquin-specific orchestration,
integration, policy, UX, academic intelligence, student services, and intelligent
use of institutional resources.

## Decision

Every capability follows this decision hierarchy:

1. Adopt a mature open or industry standard.
2. Use an established, actively maintained open-source implementation.
3. Extend through supported plugins, adapters, configuration, or APIs.
4. Fork while preserving upstream compatibility and a bounded patch budget.
5. Build a new implementation only when the first four options are demonstrably
   inadequate.

Option 5 requires its own ADR documenting evaluated standards and projects,
measured gaps, security and operational implications, interoperability strategy,
maintenance ownership, migration path, and exit criteria.

Custom components expose stable, versioned interfaces so implementations remain
replaceable.

## Consequences

- Architecture work begins with standards and upstream evaluation.
- Reference technologies are replaceable implementations, not identity-defining
  platform contracts.
- Extensions and forks need compatibility tests and upstream tracking.
- Teams spend more effort on integration quality and less on novel primitives.
- A standard may be rejected, but only with recorded evidence and consequences.

## Compliance test

A proposal is compliant when it names the governing standard, evaluated mature
implementations, selected extension point, compatibility test, responsible owner,
upgrade path, and fallback or migration strategy.

## Alternatives and evidence

For **ADR-0001: Standards-First / Buy-Borrow-Build**, the decision record considered: retain the prior approach; adopt a mature compatible standard or open-source implementation; and build or fork a new primitive. The selected decision is preferred under the stated constraints. A change trigger is new security, licensing, interoperability, sovereignty, cost, or operational evidence; a new option requires an ADR update rather than an undocumented exception.

## Migration and rollback

A change implementing **ADR-0001: Standards-First / Buy-Borrow-Build** MUST preserve the current contract during the declared compatibility window, publish a versioned migration plan, and rehearse rollback before production promotion. Migration evidence includes inventory, data/state transformation, operator communication, and verification. Rollback is triggered by failed acceptance, security regression, loss of institution control, or unrecoverable compatibility failure; it restores the last accepted artifact and preserves audit history. If no migration is currently required, the owner MUST record that as a reviewed no-op and revisit it when the decision changes.
