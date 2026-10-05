# P0 Architecture Baseline and Remediation Register

> Standard: PSDC-DOC-001
> Document type: architecture-map
> Status: Normative readiness register
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: ADR-0016, ADR-0026, ADR-0027, ADR-0028, ADR-0029, ADR-0030, ADR-0031

## Purpose and completion meaning

P0 is the minimum architecture baseline that must be internally coherent before PSDC begins
material product implementation. A P0 row is complete only when the decision, owning
specification, executable contract plan, named owner, dependencies, risks, acceptance evidence,
and implementation handoff agree. P0 completion does not claim that software is deployed.

## Scope and boundary

P0 covers the shared decisions and executable boundaries needed to authorize the first
implementation slices. It excludes completed production deployments, invented institution site
values, procurement approval, and evidence that only running systems can generate. Common PSDC
sets interoperability and minimum safeguards; each institution remains authority for local
operations, data, identity sources, networks, keys, and production risk.

## Current baseline

| ID | Domain | Architecture decision state | Remaining implementation-grade debt | Required exit evidence | Owner |
|---|---|---|---|---|---|
| P0-AUTH | authority and precedence | resolved by the authority map | propagate references and test seeded conflicts | AUTH-ACC suite and zero unowned P0 requirements | Architecture Maintainers |
| P0-COMP | compute admission, market, and runtime placement | normative prose plus D1 data schemas, candidate OpenAPI/AsyncAPI surfaces, and all current compute lifecycle tables | adapters, compatibility/fuzz suites and independent consumers | schema/service conformance plus VS-01 through VS-04 evidence | Compute Fabric WG |
| P0-STOR | tiered storage, custody, repair, federation | object-manifest and placement D1 schema candidates | custody/deletion events, repair and federation-transfer contracts and providers | storage service fixtures plus VS-05 through VS-07 evidence | Storage WG |
| P0-LEDGER | operational state, evidence, and settlement | ADR-0031 plus settlement-batch/ledger-commitment D1 schema candidates | canonical byte/Merkle vectors, module state machines, projector and reconciliation contracts | deterministic independent batch replay and outage tests | Economics and Platform WGs |
| P0-ID | institutional identity plus DID/VC portability | architecture direction accepted | DID method profile, VC schemas, issuer/status registry, wallet/recovery, link/transfer workflow | independent issue, transfer, revoke, recover, and verify fixtures | Identity WG |
| P0-NET | campus, cell, backend, and federation network | path/reservation D1 schema candidates plus common defaults | signed site profile for addresses, VLAN/VRF, DNS, CA, IPAM, QoS, egress, telemetry and DR | controller, lab packet/flow and site authority evidence | Network WG plus institution network authority |
| P0-KEY | root, workload, envelope, signing, and recovery keys | KMS operation-grant/key-envelope D1 schema candidates plus architecture | root ceremony, device selection, custodians, live policy/key enforcement and recovery exercise | key lifecycle and compromise-recovery evidence | Security WG plus institution security authority |
| P0-LIC | open-source reciprocity and commercial upstream offers | target accepted by ADR-0030 | copyright inventory, legal review, repository migration, source-offer and participant-agreement templates | license-cleared reproducible release | Open Source WG plus legal authority |
| P0-PROD | prototype/pilot/production boundary | normative boundary accepted | per-service SLO, threat, capacity, backup, rollback, support and approval profiles | signed production admission package | Service owner plus institution risk authority |
| P0-DOC | structural and semantic integrity | structural baseline passes | eliminate or authorize 727 architecture-repository findings; coordinate the 1,505-finding ecosystem baseline | zero unresolved P0 clones and no new semantic regression | Documentation WG |

## Dependency order

    authority and licensing
             |
             v
    contract rules and security boundaries
             |
      +------+------+----------------+
      |             |                |
      v             v                v
    identity      network         key management
      |             |                |
      +------+------+----------------+
             |
             v
    compute + storage operational contracts
             |
             v
    receipts + evidence + ledger settlement
             |
             v
    complete vertical slices
             |
             v
    production admission packages

Documentation clone remediation runs continuously but P0 subjects are cleaned before their
contracts are frozen. A later layer cannot redefine an unresolved earlier boundary.

## Remediation rules

- **P0-001:** A missing site value is not filled with an invented example; it is represented by
  a typed deployment-profile field, validation rule, approving authority, and safe default or
  fail-closed behavior.
- **P0-002:** A component name does not constitute an interface. Every cross-boundary exchange
  requires a versioned contract, producer, consumer, owner, reason codes, and failure behavior.
- **P0-003:** “Implemented” requires source, tests, provenance, release evidence, and operations;
  a complete document remains “specified” until those exist.
- **P0-004:** P0 scope excludes public-network tokenomics, public workload execution, public
  IPFS discovery, public permanent storage by default, and proprietary mandatory services.
- **P0-005:** Every P0 implementation handoff identifies privacy classification, authority,
  threat boundary, rollback, and evidence location before coding begins.

## P0 release gate

P0 architecture is ready for implementation when:

1. every row above has an accepted primary authority and no unresolved decision conflict;
2. all C0 and C1 contracts in the executable contract portfolio have schemas, examples,
   negative fixtures, compatibility rules, and named producers/consumers;
3. each vertical slice has one accountable owner, repository list, runnable acceptance design,
   failure tests, evidence manifest, and rollback path;
4. license and source-admission gates are compatible with each selected upstream baseline;
5. P0 semantic clones have been consolidated into one authority plus links; and
6. an independent reviewer can trace requirement to contract, implementation issue, test,
   evidence, and governing decision.

## Current truthful status

The architecture decision layer is substantially defined. P0 is not yet implementation-ready
because the contract schemas, institutional site profiles, legal migration evidence, identity
method profile, and executable vertical-slice packets remain to be produced. No running
provider registry, resolver, scheduler, storage authority, ledger settlement service, identity
issuer, web/desktop/mobile client, or production platform is evidenced by this register.

## Validation, staleness, and contradiction handling

Review the register on every P0 ADR or contract change and at each readiness-gate review. A row
is stale if its linked authority, owner, maturity, blocker, or exit evidence no longer matches
the source document. Contradictions follow the architecture precedence procedure and block only
the affected contract/slice until resolved.

## References

- [Architecture Authority and Precedence](Architecture-Authority-and-Precedence.md)
- [Executable Contract Portfolio](Executable-Contract-Portfolio.md)
- [Vertical Slice Completion Plan](../roadmap/Vertical-Slice-Completion-Plan.md)
- [Documentation Debt Plan](../roadmap/Documentation-Debt-to-Implementation-Grade-Plan.md)
