# ADR-0016: Accept the Human-Decision Register Defaults as the Project Baseline


> Standard: PSDC-DOC-001
> Document type: adr
> Status: Accepted
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Date: 2026-09-10
> Scope: Human Choices and Decisions Register
> Decision owner: Project founder

## Decision

Every value in the register's **Accepted project default** column is approved as
the working project baseline. Teams design, document, and scaffold against those
defaults unless a later ADR changes them.

Acceptance of a default does not fabricate evidence, select a value where the
default explicitly calls for measurement, appoint an unnamed owner, grant College
authority, complete legal/privacy/security review, or satisfy an implementation
gate. In those cases the accepted default governs the method and preferred
direction while the concrete decision remains a tracked gap.

Alternatives remain documented so the architecture retains an exit path. A team
departing from an accepted default records rationale, compatibility, migration,
and ownership through the decision process appropriate to its impact.

## Alternatives and evidence

For **ADR-0016: Accept the Human-Decision Register Defaults as the Project Baseline**, the decision record considered: retain the prior approach; adopt a mature compatible standard or open-source implementation; and build or fork a new primitive. The selected decision is preferred under the stated constraints. A change trigger is new security, licensing, interoperability, sovereignty, cost, or operational evidence; a new option requires an ADR update rather than an undocumented exception.

## Migration and rollback

A change implementing **ADR-0016: Accept the Human-Decision Register Defaults as the Project Baseline** MUST preserve the current contract during the declared compatibility window, publish a versioned migration plan, and rehearse rollback before production promotion. Migration evidence includes inventory, data/state transformation, operator communication, and verification. Rollback is triggered by failed acceptance, security regression, loss of institution control, or unrecoverable compatibility failure; it restores the last accepted artifact and preserves audit history. If no migration is currently required, the owner MUST record that as a reviewed no-op and revisit it when the decision changes.
