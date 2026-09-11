# 07 Build vs Adopt vs Fork


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Accepted
> Owner: Platform architecture and open-source governance
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-10
> Governing decisions: Applicable ADRs and repository governance
> Domain: vision

## Purpose

Define the mandatory sourcing decision used before implementation work is added to
a roadmap or repository.

## Scope

- In scope: products, libraries, services, protocols, formats, infrastructure,
  clients, runtimes, developer tools, and research intended for platform use.
- Out of scope: trivial project-local code that does not create a reusable
  capability or interoperability boundary.
- Constraint: licensing, security, accessibility, institutional supportability,
  and data handling may disqualify an otherwise mature option.

## Decision ladder

### 1. Adopt

Use an upstream project substantially as released. Prefer supported configuration,
themes, policy, standard APIs, deployment overlays, and external integrations.

### 2. Extend

Use documented plugins, adapters, hooks, providers, middleware, or protocol
extensions. Keep the extension independently testable and avoid private internals.

### 3. Contribute upstream

When a change is generally useful, propose it upstream. Track review status and
maintain a temporary downstream patch only when necessary.

### 4. Maintain a thin compatible fork

Fork only for material institution-specific value that cannot be delivered otherwise. Define
the upstream remote, sync cadence, patch owners, patch budget, compatibility suite,
security update target, and exit plan.

### 5. Build

Build only the missing layer. A new protocol, database, runtime, scheduler,
identity system, telemetry format, container format, or storage transport requires
an exception ADR under ADR-0001.

## Required decision record

Before choosing extend, fork, or build, record:

- user and institutional requirement;
- standards and mature projects evaluated;
- measured functional, security, privacy, accessibility, and operational gaps;
- why composition or an adapter cannot close the gap;
- compatibility and conformance approach;
- lifecycle owner and five-year maintenance implication;
- upgrade, migration, rollback, and exit strategy;
- contribution-back opportunity;
- total cost including patch drift and incident response.

## Default examples

- Web AI client: bootstrap PSDC Web from the verified Open WebUI v0.6.5
  BSD source under ADR-0009, then evolve independently; treat current Open WebUI
  only as a compatibility target.
- OpenCode: extend or thin downstream fork while its required release remains
  OSI-licensed.
- Brightspace: supported adapter using D2L mechanisms.
- Infrastructure as code: adopt OpenTofu and Ansible; do not create a custom IaC
  language, state format, or hosted control plane.
- Model engines: adopt behind Commons AI Fabric/Commons Compute Fabric adapters.
- HTCondor/Kubernetes/GPUStack/Ray: adopt, interoperate, or borrow proven models;
  never recreate by default.
- Institution academic, campus, policy, agent, orchestration, and UX layers:
  build only where they express unique local value behind common contracts.

## Settled architecture constraints

- The platform creates distinctive value in orchestration, integration, policy, user experience, academic intelligence, student services, and campus-resource coordination while keeping its technology open-source.
- Mature standards and upstream implementations are adopted or extended before a new infrastructure primitive is proposed.
- Conform to ADR-0006: use extension points first and preserve upstream upgradeability.
- Any exception follows the adopt → extend → compatible fork → build hierarchy and requires an ADR with evidence.

## Decision traceability

- ADR-0001: Standards-First / Buy-Borrow-Build
- ADR-0005: Standard Platform Primitives
- ADR-0006: Thin, Upstream-Compatible Product Forks
- ADR-0008: Open-Source, Self-Hosted Core
- ADR-0012: Tenant-Neutral Post-Secondary Digital Commons
- ADR-0016: Accepted Project Defaults
- ADR-0017: OpenTofu Default Infrastructure-as-Code Toolchain

## Decision status

- Decision: This decision ladder applies to all platform work.
- Implementation evidence gate: each implementation records its exact upstream, release,
  license, patch budget, owner, evidence and exit path.

## References

- [Open-Source-Only Technology Policy](11-Open-Source-Only-Policy.md)
- [Full Technology Stack and Open-Source Alternatives](14-Full-Technology-Stack-and-Open-Source-Alternatives.md)

## Purpose and outcome

This specification defines the purpose and intended outcome of **07-Build-vs-Adopt-vs-Fork** for the institution-neutral Commons ecosystem and its deployment boundaries.

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
