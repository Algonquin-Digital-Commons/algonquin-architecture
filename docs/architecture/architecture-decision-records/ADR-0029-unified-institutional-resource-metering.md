# ADR-0029: Policy-Gated Market Placement and Institutional Resource Units

> Standard: PSDC-DOC-001
> Document type: adr
> Status: Accepted
> Owner: PSDC Economics and Compute Working Groups
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: ADR-0010, ADR-0012, ADR-0013, ADR-0026, ADR-0028

> Date: 2026-09-17
> Scope: Compute, storage, network placement, metering and federation settlement
> Decision owner: PSDC founder; institutional finance and service-owner approval before production

## Context

Kubernetes, OpenStack, Slurm, Akash-derived service placement, Golem-derived task
execution and the six storage tiers expose different resource and accounting models. PSDC
needs one transparent market and evidence model so capacity can be priced, reserved,
compared and reconciled without letting price bypass institutional policy or turning public
cryptocurrency into a dependency.

## Decision drivers

- all resource use and placement must be attributable and explainable;
- backends need a common economic contract without losing native measurements;
- scheduling should exploit underused campus and federated capacity;
- critical services must remain reliable when market prices or providers change;
- institutional credits must not become securities, public money or authorization tokens.

## Options considered

| Option | Benefit | Rejection or qualification |
|---|---|---|
| Backend-specific quotas and billing | Lowest integration effort | Rejected because it creates incomparable shadow economies. |
| Public tradable token | Broad market liquidity | Rejected as a core dependency because of legal, volatility, custody and sovereignty risk. |
| Lowest-price reverse auction for every workload | Simple and transparent | Rejected because price alone ignores risk, locality, network path, carbon, deadlines and failure domains. |
| Non-transferable institutional resource units plus policy-gated multi-objective auctions | Transparent allocation with institutional control | Accepted. |

## Decision

1. Every admitted compute, storage and material network reservation receives a signed,
   non-transferable resource authorization record and later a usage receipt.
2. **Institutional Resource Units (IRUs)** are accounting units denominated by a published
   resource catalogue, for example CPU-core-second, GiB-second, GPU-profile-second,
   storage-GiB-day, I/O operation and governed egress GiB. They MAY be normalized into
   budget credits by an institution's published rate card.
3. IRUs and credits are not public cryptocurrency, bearer access tokens, equity, securities,
   automatic authorization or substitutes for finance/procurement controls. Federation
   settlement units are bilateral or consortium accounting claims with explicit terms.
4. Eligible providers submit sealed or bounded offers containing price, capacity, start,
   duration, performance, network, locality, energy and evidence commitments. Policy,
   identity, data, license and production eligibility hard-filter offers before ranking.
5. The resolver selects a workload archetype and backend hierarchy first; the market
   optimizer selects among eligible providers for that backend or approved hybrid plan.
6. Kubernetes, OpenStack, Slurm, Akash-derived and Golem-derived adapters preserve native
   scheduling while accepting PSDC placement constraints and emitting a common receipt.
7. Storage placement uses the same offer/lease/receipt model, but tokens contain only
   object references, tier, obligations and placement—not plaintext, secrets or keys.
8. Critical services use dynamic placement only inside a prequalified production pool with
   reserved capacity, failure-domain constraints and a tested stable fallback. A market may
   optimize among safe choices; it cannot auction away the production boundary.

## Market and settlement sequence

```text
classify -> authorize -> select backend -> filter providers -> solicit offers
   -> score/clear -> reserve credits -> issue lease -> execute/store
   -> measure -> verify -> receipt -> reconcile -> periodic ledger commitment
```

Operational state is held in a transactional database and cache. A ledger records periodic
commitments, settlement, governance and disputes; it is not polled in the scheduler's hot
path.

## Consequences

### Benefits

- one budget can compare containers, VMs, HPC, task workers, storage and federation;
- reverse auctions expose supply, demand, price and why a placement won;
- underused labs and partner capacity can participate without becoming trusted by default;
- backend-specific metrics remain available for audit and calibration.

### Costs and risks

- measurement normalization, pricing and reconciliation are custom integration work;
- gaming, collusion, strategic bidding and inaccurate capability claims require controls;
- a public-looking token UI can create legal or user misunderstanding;
- a multi-objective optimizer can hide policy mistakes unless explanations are retained.

## Security, privacy, operations, cost and portability effects

Signed receipts use pseudonymous project/workload references where possible and exclude
content. Bid visibility is role-scoped until auction close to reduce collusion. Algorithms,
weights, reserve rules and exceptions are versioned. All records export as open schemas.
Institutions publish their rate card and subsidy rules without exposing protected user data.

## Migration and rollback

Metering begins in shadow mode alongside native backend telemetry. After reconciliation
meets the allowed variance, budgets become advisory, then enforceable. Rollback disables
market enforcement, retains measurement, restores backend-native quotas and reconciles
outstanding leases. Ledger failure delays commitment and settlement but does not interrupt
an already-authorized workload; credit-reservation uncertainty blocks new discretionary
leases and uses explicit emergency policy for critical services.

## Validation and acceptance evidence

- `MARKET-ADR-ACC-001`: equivalent receipts are produced for a Kubernetes pod, OpenStack
  VM, Slurm job, Golem-derived task and Akash-derived service;
- `MARKET-ADR-ACC-002`: native and common measurements reconcile within a declared,
  evidence-backed tolerance and disagreement opens a dispute record;
- `MARKET-ADR-ACC-003`: a cheaper ineligible provider is rejected before ranking and the
  reason is visible to an authorized reviewer;
- `MARKET-ADR-ACC-004`: quota exhaustion, lease expiry, revocation, retry and partial
  completion produce deterministic settlement outcomes;
- `MARKET-ADR-ACC-005`: critical service placement survives loss of the auction service by
  using its accepted reservation and stable production fallback;
- `MARKET-ADR-ACC-006`: storage receipts expose tier and obligations but no object content,
  usable key material or unauthorized subject identity.

## Review triggers

Review on legal classification concern, material market manipulation, reconciliation drift,
provider default, critical-service incident, new backend/tier, federation dispute or a
change to resource-unit semantics.

## Affected documents and gates

- [Scheduling Algorithm](../../campus-compute-fabric/Scheduling-Algorithm.md)
- [Compute Fabric Economics](../../economics/Campus-Compute-Fabric-Economics.md)
- [Storage Architecture](../../storage/Storage-Architecture.md)
- [Storage TCO](../../economics/Storage-TCO.md)
- [Technology Defaults and Alternatives](../../vision/13-Technology-Defaults-and-Alternatives.md)

Enforced credits and settlement remain blocked until receipt schemas, calibration,
anti-gaming controls, dispute workflows, finance review and conformance tests are complete.
