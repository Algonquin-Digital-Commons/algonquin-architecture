# ADR-0016: Accept the Human-Decision Register Defaults as the Project Baseline


> Standard: PSDC-DOC-001
> Document type: adr
> Status: Accepted
> Owner: Algonquin Institution Maintainers
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

## Alternatives

Considered alternatives include retaining the prior approach, adopting a mature open implementation, and building a local adapter. The selected decision is preferred under the stated requirements, constraints, sovereignty, and maintenance capacity; a new option requires a superseding ADR.

## Migration and rollback

Migration MUST identify data/configuration transitions, compatibility windows, verification evidence, owner, and rollback trigger. Rollback restores the last known-good contract and implementation without losing audit evidence.

## Context

This decision records which proposed defaults the sole maintainer accepts so future
contributors can distinguish settled choices from open human decisions.

## Consequences

Defaults reduce ambiguity and enable consistent scaffolding, but remain changeable
through the documented decision process when evidence or staffing changes.
