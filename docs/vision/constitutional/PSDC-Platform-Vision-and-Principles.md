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

## Purpose and outcome

This specification defines the purpose and intended outcome of **PSDC-Platform-Vision-and-Principles** for the Algonquin deployment and its Commons compatibility boundary.

## Out of scope

Out of scope are secrets, unowned implementation internals, unrelated product capabilities, and any integration not named by a versioned contract. Such work requires its owning specification.

## Architecture and ownership

The architecture assigns responsibilities, trust boundaries, and ownership to the components named here. Algonquin owns institutional configuration and operations; Commons owners retain portable contracts unless this document explicitly records a local exception.

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
