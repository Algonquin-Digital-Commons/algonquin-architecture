# ADR-0013: Institution First, Federation Second, Commercial Infrastructure Last


> Standard: PSDC-DOC-001
> Document type: adr
> Status: Accepted
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Date: 2026-09-10
> Scope: Compute, storage, models, knowledge, agents, services, media, and recovery

## Context

Each institution must remain sovereign and independently functional while trusted
post-secondary federation can share permitted capacity and services. Commercial
cloud should not become the automatic fallback when public institutional capacity
exists.

## Decision

Every routable workload carries an allowed execution/data envelope. Within that
envelope, the default locality ladder is:

1. user device or local resource;
2. institution dedicated capacity;
3. institution campus compute/storage fabric;
4. nearby or regional post-secondary federation;
5. provincial post-secondary federation;
6. Canadian post-secondary federation;
7. approved Canadian-hosted commercial provider;
8. approved global hyperscaler or external API as last resort;
9. queue or fail explicitly when no permitted tier is available.

The scheduler may skip an allowed tier that cannot meet security, residency,
latency, capability, reliability, sustainability, or cost requirements. It must
never widen the permitted envelope merely to complete a request.

Federation exchanges capability, permitted services, artifacts, and accounted
resource use—not raw identity databases, unrestricted LMS data, private vector
stores, or blanket access to campus machines.

Cross-institution settlement uses an auditable resource ledger for contributed
and consumed CPU/GPU time, storage, bandwidth, model hosting, availability, and
quality. Cryptocurrency or blockchain is not required.

## Consequences

- Federation policy is part of every relevant contract and job envelope.
- Canadian residency and institutional sovereignty are enforceable routing inputs.
- Commercial providers are replaceable adapters, never the shared protocol.
- ACF census and measured capacity precede claims about recovered compute.
- Disaster recovery may use federation only for data and services explicitly
  approved for that scope.

## Alternatives and evidence

For **ADR-0013: Institution First, Federation Second, Commercial Infrastructure Last**, the decision record considered: retain the prior approach; adopt a mature compatible standard or open-source implementation; and build or fork a new primitive. The selected decision is preferred under the stated constraints. A change trigger is new security, licensing, interoperability, sovereignty, cost, or operational evidence; a new option requires an ADR update rather than an undocumented exception.

## Migration and rollback

A change implementing **ADR-0013: Institution First, Federation Second, Commercial Infrastructure Last** MUST preserve the current contract during the declared compatibility window, publish a versioned migration plan, and rehearse rollback before production promotion. Migration evidence includes inventory, data/state transformation, operator communication, and verification. Rollback is triggered by failed acceptance, security regression, loss of institution control, or unrecoverable compatibility failure; it restores the last accepted artifact and preserves audit history. If no migration is currently required, the owner MUST record that as a reviewed no-op and revisit it when the decision changes.

## Alternatives

Considered alternatives include retaining the prior approach, adopting a mature open implementation, and building a local adapter. The selected decision is preferred under the stated requirements, constraints, sovereignty, and maintenance capacity; a new option requires a superseding ADR.
