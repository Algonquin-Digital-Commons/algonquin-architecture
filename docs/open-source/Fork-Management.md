# Upstream Fork and Patch-Queue Management

> Standard: PSDC-DOC-001
> Document type: policy-standard
> Status: Normative
> Owner: PSDC Open Source Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: ADR-0001, ADR-0006, ADR-0023, ADR-0026, ADR-0030

## Purpose and authority

This policy prevents sovereign operation from becoming an unmaintainable collection of
deep forks. The PSDC Architecture Maintainers approve fork creation and retirement;
repository owners maintain provenance, patch queues, upstream synchronization, security
response and compatible release evidence.

## Scope

This policy covers configured upstreams, adapters, patch queues, forks and design-derived
implementations used in PSDC common or institution repositories.

## Normative rules

Owners MUST minimize divergence, preserve provenance/licenses, maintain a measured patch
budget, upstream generic changes and retain a tested replacement/rollback path.

## Enforcement

Repository protection, provenance/license checks, patch-budget checks, conformance CI and
release approval block a fork that breaches this policy.

## Exceptions

An exception requires scope, owner, reason, risk, compensating control, approval and expiry.
No exception may waive license compliance or silently enable a public-network dependency.

## Adopt-to-build hierarchy

Use the lowest-divergence strategy that meets requirements:

1. adopt upstream unmodified;
2. configure or compose supported extension points;
3. contribute a generic change upstream;
4. maintain a narrow adapter;
5. carry a bounded compatible patch queue;
6. maintain a scoped fork;
7. implement PSDC-owned behavior from public specifications/design principles.

A full fork is not the default interpretation of “adopt Akash/Golem/IPFS mechanisms.”
Fork only the code actually needed and only when configuration/adapters cannot satisfy the
contract.

## Source-relationship classes

| Class | Meaning | Update behavior |
|---|---|---|
| upstream dependency | unmodified release/package | track supported releases and verify artifacts |
| configured deployment | upstream code plus PSDC config | update upstream; test config compatibility |
| adapter | PSDC-owned code uses stable upstream API | independently versioned; contract tests |
| compatible patch queue | small local patches over upstream | continuously rebase; upstream/removal ticket per patch |
| scoped fork | maintained derived repository | preserve history/remotes/tags; explicit fork release line |
| design-derived implementation | no copied code; mechanism rebuilt to PSDC contract | document sources and clean implementation evidence |

## Selected strategy by derived fabric

| Fabric | Initial strategy | Fork trigger | Exit trigger |
|---|---|---|---|
| Akash-derived service market | study and extract contracts/algorithms; Apache-compatible adapter or bounded fork | required provider/auction mechanism cannot be exposed by adapter | patch budget/security lag breached |
| Golem-derived task fabric | separate GPL service behind PSDC API or clean design-derived task engine | exact Yagna modules materially reduce scope and obligations are accepted | GPL coupling, public-token assumptions or rebases exceed capacity |
| Kubo/IPFS | deploy upstream private Kubo and IPFS Cluster configuration first | required metadata/privacy/membership control cannot be added upstream/configured | security/scale/metadata requirements fail |
| Tahoe-LAFS | use least-authority design; separate GPL service only after evidence | code uniquely meets a requirement | license/operations cost exceeds benefit |
| Storj | use design and protocol insights; separate AGPL service only after source-publication plan | mature code materially reduces risk | AGPL/complexity or upstream drift exceeds capacity |
| Sia | exact MIT component/adapters or design-derived contracts | exact repository passes file/dependency review | public-chain assumptions dominate |
| Cosmos/CometBFT | bounded core modules for internal commitments/settlement | standard modules cannot express accepted state machine | consensus burden exceeds signed-log alternative |

## Repository and Git topology

Every fork preserves upstream commit history and has:

- origin pointing to the PSDC-maintained fork and upstream pointing to the canonical project;
- protected main and release branches; signed tags and immutable release artifacts;
- upstream baseline tag, PSDC patch-series branch and generated patch inventory;
- LICENSE, NOTICE, source offer where required, provenance manifest, SBOM, SECURITY,
  CONTRIBUTING and MAINTAINERS;
- automated upstream fetch, compare, vulnerability and compatibility reports;
- no private institutional configuration, keys, data or branding in the common fork.

Institution white-label repositories remain thin overlays. They do not create independent
forks of Akash/Golem/Kubo merely for branding.

## Patch record and budget

Each patch records ID, owner, purpose, affected contracts, upstream issue/PR or reason it
cannot be upstreamed, license, tests, security impact, conflict surface, introduced date,
review date and removal/replace plan.

Budgets are declared before import:

- maximum local patch count and changed lines by subsystem;
- maximum days behind supported upstream security release;
- maximum unresolved rebase conflicts;
- minimum test/pass rate and supported upstream versions;
- funded maintainer hours and named backup/continuity plan;
- automatic freeze/replace threshold.

Until a second staff maintainer exists, no high-risk fork may rely on undocumented knowledge
held by RedjiJB. Build, release, update, rollback and emergency patch procedures must be
reproducible by an authorized newcomer.

## Update and release cadence

1. continuously monitor upstream releases, advisories, licenses and project health;
2. triage critical security changes immediately and other changes at least monthly;
3. fetch upstream without rewriting PSDC history;
4. rebase/replay patch queue in a temporary integration branch;
5. run license, build, unit, integration, conformance, failure, migration and rollback tests;
6. review patch delta and update provenance/SBOM/notices;
7. canary, sign and release; retain the prior accepted artifact;
8. upstream generic improvements and close/remove downstream patches when accepted.

Security urgency may shorten the cycle but not omit provenance or rollback evidence.

## Compatibility and contracts

PSDC clients call PSDC contracts, not fork-private APIs. An adapter maps upstream versions to
current and previous supported PSDC contract versions. Fork-specific fields remain namespaced
and optional. Data formats and state migrations have export/import and downgrade rules.
Conformance fixtures run against the fork and at least one alternative or reference stub.

## Security, privacy and supply chain

Upstream commits and release signatures are verified; builds are reproducible where
practical and use pinned dependencies. CI runs with least privilege and no production data.
Maintainer compromise, malicious upstream, dependency confusion, abandoned project and
build-system takeover are threat-modelled. A fork never silently enables public peers,
tokens, telemetry or update services.

## Failure and escalation matrix

| Failure | Action |
|---|---|
| critical upstream CVE | freeze promotion, patch/rebase within SLA or disable component |
| incompatible license change | pin last accepted version; fork/replace under old rights after review |
| upstream abandoned | health review, adopt community successor or execute replacement |
| patch budget exceeded | stop features, reduce divergence or replace; architecture approval required |
| rebase breaks state | preserve old release, rehearse migration on copy and roll back |
| sole maintainer unavailable | freeze major release; follow documented continuity procedure |
| fork cannot meet conformance | remove from eligible backend set and use alternative |
| source publication failure | stop distribution/deployment until corrected |

## Audit evidence

Evidence includes immutable upstream baseline, source digest, patch inventory, license
decision, SBOM, vulnerability report, build log, tests, benchmark/behavior differences,
state migration, rollback, upstream contributions, release signature and owner approval.
Evidence is retained for every supported release.

## Alternatives and trade-offs

Never forking minimizes maintenance but may not meet sovereign policy or integration needs.
Forking whole systems accelerates early feature count but creates permanent security and
upgrade cost. Clean implementation minimizes license coupling but increases custom code.
The selected per-component strategy chooses the smallest maintained divergence and measures
when that choice stops paying for itself.

## Migration and rollback

A fork begins from an immutable accepted upstream baseline. Existing deployments migrate by
exporting state, validating the new adapter, canarying and retaining the old release during
the compatibility window. Rollback restores the last accepted binary/configuration and
state format or uses the rehearsed reverse migration. If downgrade is unsafe, promotion is
blocked until forward recovery is proven.

## Binary acceptance criteria

- **OS-FM-ACC-001:** a clean clone can reproduce the fork build, patches, notices and SBOM;
- **OS-FM-ACC-002:** upstream update rehearsal reports every conflict and passes the common
  contract/failure suite before release;
- **OS-FM-ACC-003:** every patch has an owner, upstream/removal plan and review date;
- **OS-FM-ACC-004:** exceeding any patch/security/maintainer budget automatically blocks
  normal promotion;
- **OS-FM-ACC-005:** public network, telemetry and token dependencies remain disabled in an
  offline sovereign deployment;
- **OS-FM-ACC-006:** a documented replacement backend accepts exported PSDC contracts and
  restores the tested workload/data fixture;
- **OS-FM-ACC-007:** another authorized operator can execute update and rollback from the
  repository documentation without private maintainer knowledge.

## References

- [License Policy](License-Policy.md)
- [Patch Budget](Patch-Budget.md)
- [Upstream-First Policy](Upstream-First-Policy.md)
- [Implementation Framework Composition Study](../campus-compute-fabric/Implementation-Framework-Composition-Study.md)
