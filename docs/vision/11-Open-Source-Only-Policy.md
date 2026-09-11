# Open-Source-Only Technology Policy


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Applies to: code, infrastructure, control planes, data stores, clients, build
> systems, observability, AI runtimes, media pipelines, and federation

## Policy statement

The Post-Secondary Digital Commons is self-hosted and open-source by default. Teams
select technology for capability, security, interoperability, maintainability,
community health, and total lifecycle cost—not because a vendor bundles it with a
cloud account.

## Admission test

A dependency may enter the reference stack only when reviewers can answer “yes”
to all mandatory questions:

1. Is the required edition distributed under an OSI-approved license?
2. Can an institution build or obtain the complete required software without a private
   vendor repository?
3. Can it run without a vendor-hosted control plane, license server, or SaaS
   account?
4. Are HA, SSO, security, audit, backup, and recovery available in the open edition?
5. Are configuration, schemas, APIs, and stored data exportable in documented
   formats?
6. Can the component be monitored, upgraded, rolled back, backed up, restored, and
   replaced by the institution's operators?
7. Does the project publish security reporting and supported-release information?
8. Can the team maintain a safe version without depending on one student's account?
9. Is mandatory telemetry absent or fully disableable?
10. Does the integration avoid leaking private data or precise spatial data?

## Not acceptable for the core

- SaaS-only services;
- proprietary public-cloud primitives with no self-hosted equivalent;
- “open core” products when required operational or security features are closed;
- source-available licenses that restrict use, competition, scale, or production;
- opaque hosted AI APIs as the only inference path;
- proprietary identity, event, telemetry, container, model, or storage protocols;
- undocumented vendor extensions embedded in shared contracts.

## Infrastructure-as-code policy

ADR-0017 selects OpenTofu plus Ansible. OpenTofu is distributed under MPL-2.0 and
requires no source-available exception. Terraform has no standing exception and
may be evaluated only as a bounded compatibility target through the normal
dependency review. Infrastructure state remains institution-controlled.

## Allowed boundary dependencies

Institutional Entra and Brightspace integrations may exist because the College
controls those upstream relationships. They are adapters, not the platform's
internal identity or academic protocol. College-approved systems remain
authoritative for the corresponding production identity and academic data;
development, testing, demonstrations, and standalone operation use self-hosted
test providers and contract fixtures that cannot become parallel production
authorities.

## Documentation tooling

The canonical format is plain UTF-8 Markdown in Git. Obsidian is an optional local
editor and graph viewer, not a runtime dependency. Notes must remain readable in a
text editor and Git forge. Essential workflows may not require a proprietary
Obsidian plugin.

## Enforcement

- Maintain a software bill of materials for every release.
- Run automated license, dependency, image, and vulnerability checks.
- Record each accepted component in the technology catalog with license, upstream,
  owner, version policy, data formats, and replacement plan.
- Review exceptions at least annually and before major upgrades.
- Reject changes that introduce mandatory vendor control without an approved ADR.
- Test OpenTofu modules, provider locks, plans and state recovery at each supported release.

## Purpose and outcome

This specification defines the purpose and intended outcome of **11-Open-Source-Only-Policy** for the institution-neutral Commons ecosystem and its deployment boundaries.

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
