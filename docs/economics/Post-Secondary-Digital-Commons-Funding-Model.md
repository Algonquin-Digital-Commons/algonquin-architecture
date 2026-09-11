# Post-Secondary Digital Commons Funding Model


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Accepted
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Date: 2026-09-10
> Governing decision: ADR-0015

## Accepted assumption

Use **CA$30 per participating student per enrolled month** as the common planning
input. This equals CA$120 for a four-month term and CA$240 for two four-month
terms. It is a gross capacity-planning assumption, not an approved student fee,
revenue commitment, profit forecast, procurement authority, or promise of service.

## Reproducible formulas

```text
gross_monthly_funding = participating_students × enrolled_months_in_month × CA$30
gross_term_funding    = participating_students × 4 × CA$30
gross_two_term_year   = participating_students × 8 × CA$30
```

| Participating students | One enrolled month | Four-month term | Two-term year |
|---:|---:|---:|---:|
| 500 | CA$15,000 | CA$60,000 | CA$120,000 |
| 1,000 | CA$30,000 | CA$120,000 | CA$240,000 |
| 5,000 | CA$150,000 | CA$600,000 | CA$1,200,000 |
| 10,000 | CA$300,000 | CA$1,200,000 | CA$2,400,000 |
| 25,000 | CA$750,000 | CA$3,000,000 | CA$6,000,000 |
| 50,000 | CA$1,500,000 | CA$6,000,000 | CA$12,000,000 |
| 100,000 | CA$3,000,000 | CA$12,000,000 | CA$24,000,000 |

Scenarios are arithmetic examples only. Actual participation, eligible months,
collections, exemptions, taxes, transfers and costs require validated inputs.

## Allocation categories

Every approved budget identifies amounts for:

- people, support, accessibility and training;
- security, privacy, legal, audit and compliance;
- infrastructure acquisition, facilities, power, network and lifecycle renewal;
- platform development, maintenance, upstream contribution and release engineering;
- backup, disaster recovery, observability and incident response;
- grants, teaching, research and student innovation;
- federation operations, conformance and shared services;
- contingency and long-term sustainability.

No exact percentage split is accepted yet. It must follow measured operating costs,
governance goals and the applicable public-sector approval process.

## Economic safeguards

- Keep gross funding, operating expense, capital expense, avoided cost, reserves
  and restricted funds separate.
- Never count opportunistic campus compute as available capacity or savings before
  a hardware census, utilization measurement, eligibility analysis and pilot.
- Student and institutional workloads retain priority over contributed spare
  compute; preemption and compensation policies are explicit.
- Federation contributions and consumption use an auditable resource ledger with
  dispute, reconciliation and exit procedures.
- Procurement and architecture preserve data portability and avoid vendor lock-in.
- Equity, hardship, opt-out, program eligibility and accessibility impacts require
  human governance before any charge or allocation model is implemented.

## Approval gates

Before this assumption becomes an operating program, name accountable owners and
obtain required student, academic, finance, legal, privacy, security, accessibility,
procurement, institutional and government approvals. Publish the approved service
scope, budget, measurement rules, audit method, complaint path and annual review.

## Purpose and outcome

This specification defines the purpose and intended outcome of **Post-Secondary-Digital-Commons-Funding-Model** for the institution-neutral Commons ecosystem and its deployment boundaries.

## Scope

The scope includes the capabilities, users, data, lifecycle, and interfaces described here. Institution overlays may configure approved values but MUST preserve the shared contract.

## Out of scope

Out of scope are secrets, unowned implementation internals, unrelated product capabilities, and any integration not named by a versioned contract. Such work requires its owning specification.

## Architecture and ownership

The architecture assigns responsibilities, trust boundaries, and ownership to the components named here. Shared owners retain portable contracts; institution maintainers own local configuration and operations.

## Interfaces and contracts

Interfaces, APIs, events, schemas, and boundary conditions MUST be versioned, validated, and documented for producers and consumers. Private database schemas MUST NOT cross repository boundaries.

## Dependencies and ownership

Dependencies include runtime services, identity, policy, storage, network, upstream source, and operator capabilities named by this specification. Each dependency requires an owner, compatibility expectation, and failure behavior.

## Security, privacy, and safety

Security, privacy, safety, and policy controls MUST enforce least privilege, data classification, tenant separation, provenance, and auditable decisions. Sensitive defaults fail closed.

## Deployment and implementation

Deployment and implementation MUST separate portable source from institution configuration and secrets. The release path requires reproducible artifacts, health checks, observability, and a tested rollback.

## Capacity and scaling

Capacity planning MUST identify workload, latency, throughput, storage, concurrency, and scaling limits. Evidence covers expected peak, recovery margin, and degradation when a dependency saturates.

## Failure and recovery

Failures produce bounded, typed behavior with no secret or protected-content leakage. Operators MUST have detection, quarantine or degradation, recovery, and rollback procedures.

## Testing and evidence

Testing and evidence include contract, integration, authorization, privacy/security, accessibility where applicable, failure, migration, and rollback checks. Evidence is linked to the release or decision record.

## Acceptance criteria

Acceptance requires the stated interfaces, controls, tests, operational ownership, and evidence to be complete. A document is not complete merely because a stub or implementation exists.
