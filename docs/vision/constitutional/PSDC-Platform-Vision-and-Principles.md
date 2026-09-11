# Post-Secondary Digital Commons Vision and Principles


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: Platform architecture and institutional sponsors
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-10
> Governing decisions: Applicable ADRs and repository governance
> Domain: vision

## Purpose

Define the constitutional purpose and non-negotiable design posture of the
tenant-neutral Post-Secondary Digital Commons and its first Algonquin deployment.

## Scope

- In scope: Commons Cloud, Compute, AI, Media and Spatial, Social, Academic, Data,
  Developer, Communications, and Research fabrics, shared spatial support,
  governance, sovereign institution deployments, and federation.
- Out of scope: replacing every existing College service or creating proprietary
  versions of solved infrastructure standards.
- Constraint: student-led engineering can prototype on authorized resources;
  institution-wide production requires College ownership of identity, policy,
  infrastructure, data, secrets, continuity, and support.

## Mission

Create an open, standards-based Commons through which post-secondary learners,
educators, researchers, staff, clubs, and developers can safely use and build AI,
compute, media, spatial, social, and campus-integrated services without purchasing
fragmented vendor access or surrendering institutional governance. Algonquin is
the first reference deployment, not a hard-coded tenant.

## Institutional value

- Give students a real platform on which to learn cloud, AI, distributed systems,
  media, federation, security, accessibility, and operations.
- Turn institution-specific knowledge and workflows into governed reusable APIs and
  services.
- Prefer local and institutionally controlled capacity while retaining portable,
  policy-aware hybrid options.
- Create an open developer ecosystem instead of a single chatbot or application.
- Complement existing College AI and digital services rather than duplicating them.

## Constitutional principles

1. Standards first; interoperability is a requirement.
2. Adopt, extend, contribute, fork, then build.
3. Put original engineering into portable Commons capabilities and institution-specific deployment value.
4. Institutional identity is authoritative for institutional access.
5. Public social identity is separated from institutional identity.
6. Every ecosystem owns a bounded domain and integrates through contracts.
7. Clients use shared services; they do not independently reinvent backends.
8. Local-first and hybrid routing obey data classification and policy.
9. Privacy, security, accessibility, and student control are architecture inputs.
10. Experimental research remains behind adapters until production exit criteria
    pass.
11. Production services are observable, operable, recoverable, and owned.
12. Students can build on the platform through least-privilege, versioned APIs.
13. Every institution retains sovereign identity, academic, data, policy, compute,
    moderation, keys, infrastructure state, operations, and branding.
14. Placement is institution-first and may use approved federation only inside an
    explicit workload and data envelope.
15. OpenTofu and Ansible are the infrastructure-as-code baseline.

## Success condition

The platform succeeds when teams can replace an engine, provider, client, storage
system, or scheduler without rewriting the ecosystem; when users receive coherent
institution-branded experiences; and when each institution can govern production without
depending on any single student or proprietary protocol.

## Settled architecture constraints

- The platform creates distinctive value in orchestration, integration, policy, user experience, academic intelligence, student services, and campus-resource coordination while keeping its technology open-source.
- Mature standards and upstream implementations are adopted or extended before a new infrastructure primitive is proposed.
- Any exception follows the adopt → extend → compatible fork → build hierarchy and requires an ADR with evidence.

## Decision traceability

- ADR-0001: Standards-First / Buy-Borrow-Build
- ADR-0005: Standard Platform Primitives
- ADR-0008: Open-Source, Self-Hosted Core
- ADR-0012: Tenant-Neutral Post-Secondary Digital Commons
- ADR-0013: Institution-First Federation Locality
- ADR-0016: Accepted Project Defaults
- ADR-0017: OpenTofu Default Infrastructure-as-Code Toolchain
- ADR-0020: Post-Secondary Digital Commons Is the Shared Platform Name

## Decision status

- Decision: Inherits the accepted ADRs and consolidated technology defaults.
- Implementation evidence gate: name institutional authorities, measurable outcomes, exact
  releases, service owners, and production acceptance evidence.

## References

- [Post-Secondary Digital Commons Architecture](Post-Secondary-Digital-Commons-Architecture.md)
- [Technology Defaults and Alternatives](../13-Technology-Defaults-and-Alternatives.md)

## Interfaces and contracts

Cross-system interactions MUST use versioned APIs, schemas, events, or federation protocols owned by the referenced repository. Producers, consumers, compatibility windows, idempotency, authorization context, and machine-readable errors MUST be explicit; direct database or private queue access is prohibited.

## Dependencies and ownership

The owning fabric retains its data, policy, release, and failure boundary. Shared identity, secrets, storage, events, telemetry, and compute are consumed through Commons contracts. Mandatory dependencies MUST be self-hostable and open source; institution overlays MAY add stricter policy but MUST NOT fork a common contract silently.

## Security, privacy, and safety

Trust boundaries MUST use institution-controlled identity, deny-by-default authorization, least privilege, secret rotation, minimized telemetry, and explicit data classification/residency/retention/deletion. Protected content, credentials, and private infrastructure values MUST NOT appear in maps, logs, or committed configuration.

## Deployment and implementation

The common organization owns portable contracts, reference configuration, OpenTofu modules, conformance fixtures, and upstream-compatible improvements. Institution organizations own branding, signed site values, policy overlays, adapters, and operational approvals. Development uses synthetic data; production promotion is reviewed, observable, reversible, and provenance-recorded.

## Capacity and scaling

Implementations MUST declare workload assumptions, quotas, concurrency, queue limits, saturation thresholds, resource budgets, and service objectives. Scale-out MUST preserve authorization, ordering, idempotency, auditability, and locality; overload degrades optional work before protected or interactive work.

## Failure, recovery, and compatibility

Dependencies require timeouts, bounded retries, circuit breakers, health signals, and documented degraded modes. Authorization and security failures fail closed. Stateful deployments declare RPO/RTO and restore evidence; contract changes require migration, compatibility windows, rollback, and an ADR when behavior is incompatible.

## Testing and evidence

Evidence MUST include contract and schema validation, authorization/privacy/security tests, failure and recovery exercises, capacity measurements, accessibility where user-facing, SBOM/license review, signed provenance, and standalone institution conformance. The workspace structural and substantive documentation gates are required before release authorization.

## Purpose and outcome

This specification defines the purpose and intended outcome of **PSDC-Platform-Vision-and-Principles** for the institution-neutral Commons ecosystem and its deployment boundaries.

## Out of scope

Out of scope are secrets, unowned implementation internals, unrelated product capabilities, and any integration not named by a versioned contract. Such work requires its owning specification.

## Architecture and ownership

The architecture assigns responsibilities, trust boundaries, and ownership to the components named here. Shared owners retain portable contracts; institution maintainers own local configuration and operations.

## Failure and recovery

Failures produce bounded, typed behavior with no secret or protected-content leakage. Operators MUST have detection, quarantine or degradation, recovery, and rollback procedures.

## Acceptance criteria

Acceptance requires the stated interfaces, controls, tests, operational ownership, and evidence to be complete. A document is not complete merely because a stub or implementation exists.
