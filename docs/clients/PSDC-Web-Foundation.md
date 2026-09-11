# PSDC Web Foundation


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: PSDC Web Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Decisions: ADR-0009 and ADR-0025

## Architectural identity

`psdc-web` is the neutral browser and PWA application. Each deployment supplies
its institution-approved product identity through configuration.

```text
PSDC Web
        |
Web client contract
        |
Commons AI Gateway
        |
identity | policy | models | knowledge | tools | academic services
```

The client does not know whether inference runs on a laptop, a dedicated cluster,
or Commons Compute Fabric. It does not call Entra, Brightspace, model servers, databases, or object
stores directly.

## Bootstrap decision

Begin from an immutable, verified copy of Open WebUI v0.6.5 because the desired
landing and conversation experience exists in its BSD-3-Clause code. Treat that
source as a possible foundation for PSDC Web, not as a moving upstream.

Current Open WebUI releases remain useful protocol-compatibility targets but are
not eligible source dependencies under ADR-0008. LibreChat remains the first
fallback candidate if legal, security, maintenance, or accessibility review rejects
the legacy baseline.

## Product evolution

The target navigation and experience encompasses:

- **Chat:** general conversations, files, tools, model aliases, and history;
- **Study:** courses, assignments, grounded study sessions, and faculty controls;
- **Work:** projects, documents, local tools, and governed agents;
- **Code:** repositories, development sessions, SDKs, and OpenCode handoff;
- **Campus:** schedule, events, clubs, notifications, and campus services.

Inherited generic components may remain where they meet requirements. Native
components replace them when an institution workflow, accessibility, security, or
maintenance case justifies the change.

## Source-provenance controls

Before import, create a provenance manifest containing:

| Field | Required value |
|---|---|
| Upstream | Canonical Open WebUI repository URL |
| Baseline | Exact v0.6.5 tag and immutable commit |
| Integrity | Archive and file checksums |
| License | Verified BSD-3-Clause text and applicable notices |
| Inventory | Imported, removed, and generated files |
| Dependencies | Lockfiles, license inventory, and initial SBOM |
| Approval | Legal, security, accessibility, and maintenance reviewers |

Maintain a `THIRD_PARTY_NOTICES` file and clear per-file provenance where needed.
Automated license checks must reject later Open WebUI license material.

## Maintenance model

The downstream Commons maintainers own dependency upgrades, vulnerability remediation, browser support,
accessibility improvements, tests, and feature development. Security fixes from
post-v0.6.5 Open WebUI are specifications to analyze and independently address,
not patches to copy without review.

## Exit conditions

Replace the baseline when its security debt, framework age, accessibility gap, or
maintenance cost exceeds the measured cost of another OSI-licensed client or a
fully native implementation. The gateway contract makes that replacement local to
`psdc-web`.

## Purpose and outcome

This specification defines the purpose and intended outcome of **PSDC-Web-Foundation** for the Algonquin deployment and its Commons compatibility boundary.

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
