# ADR Authoring Template


> Standard: PSDC-DOC-001
> Document type: adr
> Status: Template
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

Copy this structure to the next sequential ADR number. Replace the instructional
text with project evidence and delete sections that are genuinely inapplicable
only after explaining why. This file records no decision.

## Context

Describe the problem, affected users and systems, current behaviour, constraints,
assumptions, evidence, urgency and the consequence of taking no action.

## Decision drivers

List the required outcomes and rank correctness, portability, openness, security,
privacy, accessibility, reliability, operability, cost and migration concerns.

## Considered options

For every credible option, describe its mechanism, benefits, disadvantages,
licensing, dependencies, operational burden, security and privacy impact,
compatibility, migration cost and exit path. Include retaining the current state
when it is credible.

## Decision

State the selected option as a testable rule using normative language. Define its
scope, owner, affected contracts, effective version and exception authority.

## Consequences

Describe positive and negative consequences, new dependencies, work created,
capabilities removed, compatibility window and maintenance commitment.

## Security, privacy and safety

Identify changed trust boundaries, data flows, threats, controls, residual risks,
required reviews and emergency behaviour.

## Operations and economics

Define ownership, observability, capacity, service objectives, failure behaviour,
recovery, lifecycle, staffing, cost and sustainability effects.

## Migration and rollback

Define prerequisites, sequencing, compatibility, data migration, verification,
rollback trigger, rollback procedure and irreversible boundaries.

## Validation

List the contract, security, privacy, accessibility, performance, recovery and
interoperability evidence that demonstrates the decision works.

## References and supersession

Link governing specifications, issues, standards, upstream projects and replaced
ADRs. State whether this ADR supersedes or is superseded by another decision.

## Alternatives and evidence

For **ADR Authoring Template**, the decision record considered: retain the prior approach; adopt a mature compatible standard or open-source implementation; and build or fork a new primitive. The selected decision is preferred under the stated constraints. A change trigger is new security, licensing, interoperability, sovereignty, cost, or operational evidence; a new option requires an ADR update rather than an undocumented exception.

## Alternatives

Considered alternatives include retaining the prior approach, adopting a mature open implementation, and building a local adapter. The selected decision is preferred under the stated requirements, constraints, sovereignty, and maintenance capacity; a new option requires a superseding ADR.

## Normative requirement

This stub MUST be completed with context, decision, consequences,
alternatives, migration/rollback plan, owner, and acceptance evidence before it is
accepted as an ADR. Until then it is non-deployable scaffolding.
