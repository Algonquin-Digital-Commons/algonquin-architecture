# Desktop Mobile Rollout

> Status: Accepted baseline; specification incomplete  
> Domain: roadmap  
> Owner: Owning domain team; accountable person pending  
> Last reviewed: 2026-09-10

## Purpose

Specify Desktop Mobile Rollout within the Federated Post-Secondary Digital Commons. This outline inherits the
accepted cross-platform decisions below; its owner must add domain requirements,
evidence, and institutionally approved choices without weakening those constraints.

## Scope

- In scope: requirements, interfaces, dependencies, data, security, operations,
  validation, and roadmap decisions for Desktop Mobile Rollout.
- Out of scope: redefining shared standards or sibling-system responsibilities
  without an approved cross-platform ADR.
- Assumptions and constraints: accepted platform ADRs apply; unresolved product,
  procurement, institutional, and implementation choices remain explicit.

## Delivery tracks

| Track | First channel | Portable fallback | Release gate |
|---|---|---|---|
| Managed campus desktop | Institution endpoint management and signed update feed | Self-hosted installer/package repository | Packaging, signature, rollback, lab-image and accessibility tests |
| Personal desktop | Institution portal downloads for Windows, macOS and Linux | Self-hosted package repositories | Reproducible build, checksums, device revocation and least-privilege tests |
| Android mobile | Google Play after pilot | Signed APK, F-Droid-compatible repository and PWA | Publisher, privacy listing, signing custody, E2EE and store review |
| iOS mobile | Apple App Store after pilot | PWA and any institution-approved Apple distribution route | Publisher, privacy nutrition data, signing custody, E2EE and store review |
| Web companion | Institution-hosted installable PWA | Standards-compatible browser | Offline boundary, cache encryption and accessibility tests |

No native mobile build is currently published in a public app store. Source import,
branding, deployment-manifest verification, release automation and store accounts
remain implementation work.

## Rollout order

1. Import and pin eligible OpenWork and Happy source with provenance evidence.
2. Implement deployment-manifest signature and rollback verification.
3. Produce reproducible development builds and synthetic OIDC fixtures.
4. Pilot desktop and PWA with an opt-in club/research cohort.
5. Validate managed campus deployment without Compute Fabric enrollment.
6. Publish signed personal-computer installers through the institution portal.
7. Complete mobile E2EE, privacy, accessibility and recovery gates.
8. Establish accountable publisher accounts and submit native apps to stores.
9. Expand campus fleet deployment only after support and rollback evidence.

## Settled architecture constraints

- Roadmap work evaluates standards and upstream projects before scheduling custom implementation.
- Phases prioritize gateway, identity, integration, policy, and user value while experimental infrastructure remains replaceable.
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

- [Institution-Branded Client Distribution and Access](../clients/Institution-Branded-Client-Distribution-and-Access.md)
- [ADR-0021](../architecture/architecture-decision-records/ADR-0021-institution-branded-client-access.md)
- [Worker Agent Specification](../acf/Worker-Agent-Specification.md)
