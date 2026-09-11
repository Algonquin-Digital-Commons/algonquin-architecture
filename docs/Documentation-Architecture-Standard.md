# Documentation Architecture Standard


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: Algonquin Institution Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

## Purpose

Keep architecture work consistent across Commons Cloud, Commons Compute Fabric, Commons AI Fabric, Commons Media and Spatial Fabric,
Commons Social Fabric, the extended Commons fabrics, spatial support, clients, sovereign
institution deployments, and federation.

## Document hierarchy

1. Vision and principles define purpose and non-negotiable constraints.
2. Reference architecture defines the whole system and ownership boundaries.
3. Subsystem architecture refines one bounded domain.
4. Specifications define interoperable behavior and interfaces.
5. ADRs record consequential decisions and alternatives.
6. Threat models challenge trust assumptions and controls.
7. Operational documents explain how production is observed and operated.
8. Runbooks define deterministic incident procedures.
9. Roadmaps establish dependency order, milestones, and exit criteria.

Lower-level documents must cite and conform to higher-level documents unless an
approved ADR changes them.

Within one level, the newest accepted ADR controls. A document explicitly marked
superseded is historical, not conflicting guidance. ADR-0017 therefore controls
IaC and ADR-0011 remains history. Conversation exports are provenance rather than
normative architecture.

## Required document metadata

- Status: normative specification, implementation-gated, approved, deprecated,
  superseded, or historical
- Owning team and accountable role
- Reviewers and approval authority
- Creation and last-reviewed dates
- Related systems, contracts, ADRs, risks, and roadmap phase
- Intended audience and confidentiality classification

## Required architecture sections

Every service or subsystem architecture document addresses:

1. Purpose and institutional value
2. Scope, exclusions, assumptions, and constraints
3. Functional and quality requirements
4. Interfaces, APIs, events, schemas, and compatibility
5. Dependencies and ownership boundaries
6. Data model, residency, retention, deletion, and migration
7. Identity, authorization, security, privacy, safety, and compliance
8. Deployment environments, configuration, secrets, and upgrades
9. Scaling, capacity, performance, cost, and sustainability
10. Failure modes, availability, recovery, and degraded operation
11. Metrics, logs, traces, alerts, and service objectives
12. Standards and upstream projects
13. Build, adopt, fork, or integrate rationale
14. Testing, validation, and release criteria
15. Operational ownership and runbooks
16. Roadmap, decision status, and change log

Sections may state “not applicable” with a reason; they must not be silently
omitted.

## ADR requirements

An ADR contains status, context, decision drivers, considered options, decision,
positive and negative consequences, security/privacy impact, operational impact,
migration or rollback plan, and links to superseded decisions.

Use the established sequential identifiers. `ADR-XXXX.md` remains the template
and never represents an accepted decision.

## Specification completion rule

A normative specification authorizes implementation only when its purpose, scope,
accountable owner, dependencies, interfaces, data handling, security and privacy,
failure behaviour, release gates, acceptance tests, operations, change authority,
and references are explicit. Site values and measured implementation evidence are
supplied later through governed manifests and release evidence; they are not
architectural blanks. Removing empty markers alone is not sufficient.

## Naming and links

- Preserve the canonical filenames listed in this suite.
- Use relative links within the repository.
- Link to the owning repository rather than copying implementation details.
- Link standards and upstream projects to their authoritative sources.
- Avoid embedding secrets, private infrastructure addresses, personal data, or
  precise private spatial data.

## Purpose and outcome

This specification defines the purpose and intended outcome of **Documentation-Architecture-Standard** for the Algonquin deployment and its Commons compatibility boundary.

## Scope

The scope includes the capabilities, users, data, lifecycle, and interfaces described here. Institution overlays may configure approved values but MUST preserve the shared contract.

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
