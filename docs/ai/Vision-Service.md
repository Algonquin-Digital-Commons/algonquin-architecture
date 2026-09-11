# Vision Service

> Status: Accepted baseline; specification incomplete  
> Domain: ai  
> Owner: Owning domain team; accountable person pending  
> Last reviewed: 2026-09-10

## Purpose

Specify Vision Service within the Federated Post-Secondary Digital Commons. This outline inherits the
accepted cross-platform decisions below; its owner must add domain requirements,
evidence, and institutionally approved choices without weakening those constraints.

## Scope

- In scope: requirements, interfaces, dependencies, data, security, operations,
  validation, and roadmap decisions for Vision Service.
- Out of scope: redefining shared standards or sibling-system responsibilities
  without an approved cross-platform ADR.
- Assumptions and constraints: accepted platform ADRs apply; unresolved product,
  procurement, institutional, and implementation choices remain explicit.

## Architecture content

- Requirements and quality attributes: TODO
- Interfaces, APIs, events, and contracts: TODO
- Dependencies and ownership boundaries: TODO
- Data, state, residency, and retention: TODO
- Security, privacy, safety, and compliance: TODO
- Deployment, environments, and configuration: TODO
- Scaling, capacity, cost, and sustainability: TODO
- Failure behavior, recovery, and compatibility: TODO
- Observability, testing, and operational readiness: TODO
- Standards, upstream projects, and build/adopt/fork decision: TODO

## Settled architecture constraints

- Clients use the Commons AI Gateway rather than connecting directly to model providers.
- Portable inference uses an OpenAI-compatible boundary; institution-specific capabilities use a separate versioned native API.
- Any exception follows the adopt → extend → compatible fork → build hierarchy and requires an ADR with evidence.

## Decision traceability

- ADR-0001: Standards-First / Buy-Borrow-Build
- ADR-0005: Standard Platform Primitives
- ADR-0012: Tenant-Neutral Federated Post-Secondary Digital Commons
- ADR-0013: Institution-First Federation Locality
- ADR-0016: Accepted Project Defaults
- ADR-0017: OpenTofu Default Infrastructure-as-Code Toolchain

## Accepted default and alternatives

Apply [Technology Defaults and Alternatives](../vision/13-Technology-Defaults-and-Alternatives.md) and the [Human Choices and Decisions Register](../governance/Human-Choices-and-Decisions-Register.md). The accepted default is authoritative; alternatives are evaluated migration or evidence paths, not co-defaults.

## Decisions and open questions

- Accepted project baseline: Inherits the applicable accepted ADRs and the consolidated technology defaults listed above.
- Remaining specification work: Replace TODO fields with measured requirements, named owners, exact versions, site-specific values, acceptance evidence, and external approvals before the implementation gate.

## References

- Related contracts, ADRs, standards, and source material: TODO
