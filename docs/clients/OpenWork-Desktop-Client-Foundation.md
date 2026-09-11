# OpenWork Desktop Client Foundation


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: Commons AI Fabric desktop team
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Governing decision: ADR-0018

## Product role

The institution-branded OpenWork-derived desktop is the workstation client for
long-running AI work. It owns
desktop interaction, workspace selection, local previews, diff review, and safe
local tool mediation. It does not own identity, provider routing, policy, durable
institutional records, or cross-device authorization.

## Component boundary

```text
OpenWork-derived desktop UI and shell
        │
        ├── local workspace grant + tool sandbox
        ├── Commons Session Host / agent adapter
        │         └── Commons AI Gateway ── policy/router ── approved model runtime
        └── optional E2EE session channel ── Commons Session Relay ── mobile
```

The current upstream OpenWork core is React + Electron + `openwork-server` and is
MIT outside `ee/`. The import must exclude `ee/`, Den, hosted MCP URLs, hosted
inference, cloud workers, subscription features, and provider-specific shortcuts
that bypass the gateway.

## First release scope

- Institutional sign-in and local device registration.
- Explicit folder/workspace grants with visible scope and revocation.
- Create, resume, interrupt, and archive agent sessions.
- Streaming messages, plans, todos, tool calls, permission prompts, diffs, files,
  artifacts, and receipts.
- OpenCode adapter first; adapters remain replaceable.
- Gateway model aliases rather than upstream provider/model identifiers.
- Signed desktop packages and self-hosted update metadata with rollback.
- Optional pairing with Happy-derived mobile through the encrypted relay.

## Security invariants

- Renderer code never receives durable host-owner or provider credentials.
- Local server binds to loopback unless a separately reviewed authenticated
  remote mode is enabled.
- IPC, deep links, file URLs, navigation, clipboard, updater, and spawned commands
  use explicit allowlists.
- Permission decisions bind session, request, action digest, device, actor, and
  expiry. `allow_once` cannot become a durable rule accidentally.
- The desktop remains useful with the relay offline; the relay never becomes a
  path around local policy.

## Delivery slices

1. Provenance-only import rehearsal and reproducible upstream build.
2. AC Gateway adapter and synthetic identity.
3. Workspace grants, permission receipts, and tool sandbox.
4. Shared session contract and local host.
5. Mobile pairing, encrypted relay, handoff, and notifications.
6. Accessibility, signed distribution, update rollback, and pilot evidence.

## Acceptance evidence

Record exact upstream commit, licenses, SBOM, dependency scan, IPC threat model,
accessibility results, supported OS matrix, installer/update signatures, adapter
contract tests, offline behavior, and downstream patch size before release.

Users obtain the client and authenticate through the flow defined in
[Institution-Branded Client Distribution and Access](Institution-Branded-Client-Distribution-and-Access.md).

## Purpose and outcome

This specification defines the purpose and intended outcome of **OpenWork-Desktop-Client-Foundation** for the institution-neutral Commons ecosystem and its deployment boundaries.

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
