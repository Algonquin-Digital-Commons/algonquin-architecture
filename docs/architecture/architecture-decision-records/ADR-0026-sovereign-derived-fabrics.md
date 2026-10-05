# ADR-0026: Sovereign Derived Infrastructure Fabrics

> Standard: PSDC-DOC-001
> Document type: adr
> Status: Accepted
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: ADR-0001, ADR-0008, ADR-0010, ADR-0012, ADR-0013

> Date: 2026-09-16
> Scope: Common compute, storage, identity, federation, market and settlement architecture
> Decision owner: PSDC founder; legal and security approval required before source import

## Context

PSDC needs the useful mechanisms of decentralized compute and storage systems without
ceding institutional authority to public networks, public tokens, or external governance.
Akash demonstrates provider offers, reverse auctions and deployment leases; Golem
demonstrates requestor/provider task execution; Kubo/IPFS demonstrates content addressing;
Tahoe-LAFS, Storj and Sia demonstrate least-authority, encryption, erasure and repair;
Cosmos SDK and CometBFT demonstrate replicated commitments and governed settlement.

Their default trust, discovery, payment, privacy and locality assumptions do not satisfy
institutional records, critical services, deletion, procurement or independent-operation
requirements. PSDC therefore adopts bounded mechanisms and contracts, not the public
networks as authorities and not undifferentiated whole-project forks.

## Decision drivers

- each institution must operate independently and remain able to federate;
- policy and data eligibility must precede price or performance optimization;
- every provider, workload, storage placement, lease and usage result must be traceable;
- public networks must never become silent fallbacks;
- upstream source obligations and security fixes must remain maintainable;
- backend products must remain replaceable behind PSDC-owned contracts.

## Options considered

| Option | Benefit | Rejection or qualification |
|---|---|---|
| Use public Akash, Golem and IPFS directly | Fastest access to existing networks | Rejected as the default because governance, provider admission, locality, privacy and public economics are outside institutional control. |
| Fork every upstream project in full | Maximum immediate feature reuse | Rejected because patch surface, license coupling and security-rebase cost would be unbounded. |
| Build every mechanism from scratch | Clean ownership and semantics | Rejected because it discards mature code and operational knowledge. |
| PSDC semantic authority plus bounded integrations, compatible forks and design-derived modules | Preserves sovereignty while reusing proven mechanisms | Accepted; every imported component needs a provenance and maintenance gate. |

## Decision

1. PSDC owns canonical workload, provider, capability, offer, placement, lease, object,
   custody, evidence, receipt, credit and federation contracts.
2. An institution operates its own trust roots, provider registry, policy engine, keys,
   storage domain, market, operational state and settlement domain. Federation exchanges
   signed portable contracts; it does not merge administrative authority.
3. Akash-derived code or designs MAY implement service offers, reverse auctions,
   deployment leases and provider settlement behind the PSDC contracts.
4. Golem-derived code or designs MAY implement finite task graphs, requestor/provider
   negotiation, worker execution and result evidence behind the PSDC contracts.
5. Kubo/IPFS-derived code MAY provide private content addressing and distribution;
   Tahoe-LAFS, Storj and Sia concepts MAY provide least-authority, encryption, erasure,
   repair and provider-obligation mechanisms. None is an authorization authority.
6. Cosmos SDK/CometBFT-derived components MAY record low-frequency commitments,
   governance decisions, credit settlement and disputes. They SHALL NOT be the scheduler's
   high-frequency current-state database.
7. Public Akash, Golem, IPFS or other capacity is an explicit, policy-gated adapter for a
   workload classified `public` or `approved-burst`; absence or failure of that adapter
   SHALL NOT prevent sovereign internal operation.
8. No source import is authorized until its exact repository, tag or commit, included
   paths, license, notices, SBOM, vulnerabilities, build, compatibility surface, patch
   budget, upstream strategy, owner and replacement path are accepted.

## Authority and boundary model

```text
institution identity, policy, data and risk authority
                         |
                         v
PSDC contracts: classify -> admit -> offer -> place -> lease -> execute/store
                         |
          +--------------+---------------+
          |              |               |
   adapted service   adapted task   adapted content/
   placement         execution      settlement mechanisms
          |              |               |
          +--------------+---------------+
                         |
                receipts and evidence
```

Upstream mechanisms cannot grant identity, authorization, data eligibility, records
authority, credential validity or permission to federate. PSDC adapters cannot read one
another's private databases and exchange only versioned contracts.

## Consequences

### Benefits

- institutions retain operational and governance sovereignty;
- the system gains mature marketplace, execution, storage and ledger mechanisms;
- common contracts permit backend substitution and cross-institution conformance;
- external participation is explicit and auditable rather than accidental.

### Costs and risks

- adapters, conformance tests and upgrade reconciliation add engineering cost;
- copyleft components may require process isolation or same-license fork repositories;
- derived behavior can drift from upstream and from other institutions;
- a single integrated optimizer becomes safety-critical and needs explainable decisions.

## Security, privacy, operations, cost and portability effects

Hard policy filters apply before auction or ranking. Protected data cannot be placed on a
provider merely because its price is lower. Every decision records considered providers,
rejection reasons, algorithm and policy versions, winning score, lease and evidence.
Institutions budget for upstream monitoring, emergency security rebases and replacement;
they can export PSDC contracts and operational records without depending on a public chain.

## Migration and rollback

Adoption proceeds per mechanism: record a provenance baseline, wrap the component behind a
PSDC adapter, replay conformance fixtures, canary on non-production workloads, then promote.
The previous backend remains available during the declared compatibility window. Rollback
stops new leases, drains or expires current leases according to workload policy, restores
the last accepted adapter and reconciles receipts without deleting audit history. A source
import that exceeds its patch budget or cannot take a critical upstream fix is replaced,
not indefinitely patched.

## Validation and acceptance evidence

- `FABRIC-ADR-ACC-001`: a restricted workload receives no bid from an ineligible provider,
  even when that provider is cheapest; evidence is a signed decision trace;
- `FABRIC-ADR-ACC-002`: an internal workload completes while every public adapter is
  unavailable; evidence is execution and settlement receipts;
- `FABRIC-ADR-ACC-003`: each imported component has an immutable provenance manifest,
  verified license/notice set, SBOM, build recipe and vulnerability report;
- `FABRIC-ADR-ACC-004`: replacing one backend preserves the PSDC contract and passes the
  same positive, negative, timeout, retry, cancellation and reconciliation fixtures;
- `FABRIC-ADR-ACC-005`: an institution disconnects from federation and continues identity,
  placement, execution, storage and settlement locally.

## Review triggers

Review on a material upstream license change, an abandoned or compromised upstream,
patch-budget breach, public-adapter incident, inability to operate independently, contract
version change, or evidence that a clean implementation is cheaper than continued forking.

## Affected documents and gates

- [Technology Defaults and Alternatives](../../vision/13-Technology-Defaults-and-Alternatives.md)
- [Compute Fabric Architecture](../../campus-compute-fabric/Campus-Compute-Fabric-Architecture.md)
- [Storage Architecture](../../storage/Storage-Architecture.md)
- [Fork Management](../../open-source/Fork-Management.md)
- [License Policy](../../open-source/License-Policy.md)

Source import, production promotion and federation remain blocked until their respective
provenance, security, conformance, recovery and institutional approval evidence is present.
