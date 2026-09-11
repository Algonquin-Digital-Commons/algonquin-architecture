# Desktop File Permissions

> Status: Accepted baseline; specification incomplete  
> Domain: clients  
> Owner: Owning domain team; accountable person pending  
> Last reviewed: 2026-09-10

## Purpose

Specify Desktop File Permissions within the Federated Post-Secondary Digital Commons. This outline inherits the
accepted cross-platform decisions below; its owner must add domain requirements,
evidence, and institutionally approved choices without weakening those constraints.

## Scope

- In scope: requirements, interfaces, dependencies, data, security, operations,
  validation, and roadmap decisions for Desktop File Permissions.
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

- Clients consume shared platform APIs and do not implement provider, identity, policy, or storage integrations independently.
- Eligible OSI-licensed clients remain thin downstream forks or extension layers with compatibility tests and bounded patch budgets; ADR-0009 permits the frozen Open WebUI v0.6.5 BSD scaffold while current releases remain compatibility-only.
- Any exception follows the adopt → extend → compatible fork → build hierarchy and requires an ADR with evidence.
- Grants bind an explicit canonical workspace root, permitted operations, actor, device, session, expiry, and revocation state. Symlink/junction escape and path canonicalization tests are mandatory.
- Remote approval binds the exact action digest and permits `allow_once` or `deny` in the first release; it cannot create a broad persistent grant.

## Decision traceability

- ADR-0001: Standards-First / Buy-Borrow-Build
- ADR-0005: Standard Platform Primitives
- ADR-0012: Tenant-Neutral Federated Post-Secondary Digital Commons
- ADR-0013: Institution-First Federation Locality
- ADR-0016: Accepted Project Defaults
- ADR-0017: OpenTofu Default Infrastructure-as-Code Toolchain
- ADR-0008: Open-Source, Self-Hosted Core
- ADR-0009: Algonquin AI Web Foundation
- ADR-0010: Provider-Neutral Core with Institutional Production Authorities
- ADR-0018: OpenWork MIT Core Is the Desktop AI Client Foundation
- ADR-0019: Happy Is the Mobile AI Client Foundation

## Accepted default and alternatives

Apply [Technology Defaults and Alternatives](../vision/13-Technology-Defaults-and-Alternatives.md) and the [Human Choices and Decisions Register](../governance/Human-Choices-and-Decisions-Register.md). The accepted default is authoritative; alternatives are evaluated migration or evidence paths, not co-defaults.

## Decisions and open questions

- Accepted project baseline: Inherits the applicable accepted ADRs and the consolidated technology defaults listed above.
- Remaining specification work: Replace TODO fields with measured requirements, named owners, exact versions, site-specific values, acceptance evidence, and external approvals before the implementation gate.

## References

- [OpenWork desktop foundation](OpenWork-Desktop-Client-Foundation.md)
- [Agent Session Contract](../../contracts/agent-sessions/README.md)
