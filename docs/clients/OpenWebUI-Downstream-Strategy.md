# Open WebUI Baseline and License Boundary


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: Commons AI Fabric client team and open-source review
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-10
> Governing decisions: Applicable ADRs and repository governance
> Domain: clients

## Purpose

Define the exact boundary between the preferred BSD-licensed source scaffold and
later Open WebUI material that the platform may not consume under its
open-source-only policy.

## Accepted use

- Open WebUI v0.6.5 is the preferred initial source foundation for `psdc-web`.
- The exact tag, immutable commit and eligible file inventory are verified in the
  implementation import pull request before source enters repository history.
- Required BSD notices, copyright, attribution, dependency licenses, and file
  provenance remain preserved.
- PSDC Web evolves independently and talks only to Commons AI gateway APIs.

## Prohibited use

- Do not configure current Open WebUI as a core production dependency.
- Do not merge, cherry-pick, copy, or mechanically reproduce post-v0.6.5 code or
  assets without a new file-level license review and approved ADR.
- Do not imply endorsement by the Open WebUI project.
- Do not use an enterprise license to bypass ADR-0008 without superseding it.

## Compatibility and observation

Current releases may be exercised as external clients against the documented
OpenAI-compatible API. Interoperability tests may observe requests and responses;
they do not make current source or assets available for reuse.

## Maintenance implication

The v0.6.5 baseline is frozen. The PSDC Web team owns security fixes, dependency updates,
browser compatibility, accessibility, and feature work. LibreChat or a native
client remains the exit path if that burden becomes unsafe or unsustainable.

## Settled architecture constraints

- Clients consume shared platform APIs and do not implement provider, identity,
  policy, academic, compute, or storage integrations independently.
- Open WebUI v0.6.6+ remains compatibility-only.
- ADR-0009 governs source provenance and native evolution.
- Any exception requires evidence, license review, an owner, and a superseding ADR.

## Decision traceability

- ADR-0001: Standards-First / Buy-Borrow-Build
- ADR-0005: Standard Platform Primitives
- ADR-0006: Thin, Upstream-Compatible Product Forks
- ADR-0008: Open-Source, Self-Hosted Core
- ADR-0009: PSDC Web Foundation

## References

- [PSDC Web Foundation](./PSDC-Web-Foundation.md)
- `psdc-web:docs/upstream/Open-WebUI-Provenance-Policy.md`
- [Open WebUI license explanation](https://docs.openwebui.com/license/)
- [Open WebUI license notice](https://github.com/open-webui/open-webui/blob/main/LICENSE_NOTICE)

## Purpose and outcome

This specification defines the purpose and intended outcome of **OpenWebUI-Downstream-Strategy** for the institution-neutral Commons ecosystem and its deployment boundaries.

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
