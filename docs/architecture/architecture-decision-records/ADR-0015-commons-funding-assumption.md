# ADR-0015: Use CA$30 per Enrolled Student-Month as the Funding Assumption


> Standard: PSDC-DOC-001
> Document type: adr
> Status: Accepted
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Date: 2026-09-10
> Scope: Business-case and capacity scenarios
> External approval: Not granted

## Decision

Business and capacity models use **CA$30 per participating student for each month
of an enrolled term**. A four-month term therefore models CA$120 per student; two
four-month terms model CA$240 per student-year.

This is a gross funding assumption, not profit, an approved fee, a promise of
revenue, or authority to charge students. The preferred framing is an
institutionally governed digital-commons service supporting AI, compute,
academic, social, developer, research, accessibility, security, operations, paid
student work, and reserves—not a consumer chatbot subscription.

## Required scenario treatment

- Show covered students, billable months, participation, exemptions, collection
  costs, taxes, bad debt, financial aid, and contingency explicitly.
- Separate institution-local, provincial commons, Canadian commons, development,
  student innovation, security/privacy, and reserve allocations.
- Label all enrolment, adoption, price, cloud, power, hardware, and staffing inputs
  with source date and confidence.
- Do not count ACF savings until hardware census and workload measurements exist.
- Do not treat illustrative allocations from planning conversations as approved
  budgets.

## External gates

Student governance, College leadership, finance, legal, accessibility/equity,
privacy, procurement, and any applicable provincial authority must approve the
actual funding model before collection or public claims.

## Alternatives and evidence

For **ADR-0015: Use CA$30 per Enrolled Student-Month as the Funding Assumption**, the decision record considered: retain the prior approach; adopt a mature compatible standard or open-source implementation; and build or fork a new primitive. The selected decision is preferred under the stated constraints. A change trigger is new security, licensing, interoperability, sovereignty, cost, or operational evidence; a new option requires an ADR update rather than an undocumented exception.

## Migration and rollback

A change implementing **ADR-0015: Use CA$30 per Enrolled Student-Month as the Funding Assumption** MUST preserve the current contract during the declared compatibility window, publish a versioned migration plan, and rehearse rollback before production promotion. Migration evidence includes inventory, data/state transformation, operator communication, and verification. Rollback is triggered by failed acceptance, security regression, loss of institution control, or unrecoverable compatibility failure; it restores the last accepted artifact and preserves audit history. If no migration is currently required, the owner MUST record that as a reviewed no-op and revisit it when the decision changes.
