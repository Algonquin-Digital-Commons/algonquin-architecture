# Happy Ecosystem Feature Adoption Scope


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Accepted
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Applies to: Happy-derived mobile, OpenWork-derived desktop, Commons Session Host and Relay

## Adopt first

| Capability | Platform implementation | Guardrail |
|---|---|---|
| End-to-end encrypted sync | Ciphertext envelopes through Commons Session Relay | Relay has no transcript or workspace keys |
| Device pairing | Expiring QR/deep-link challenge plus proof of device key | No bearer secret in URLs or logs |
| Session continuity | Ordered events, cursor resume, idempotent commands | Host remains authoritative |
| Permission inbox | Signed request and decision contracts | `allow_once`/`deny`; expiry and action digest required |
| Push notifications | Self-hosted ntfy/UnifiedPush first; optional APNs/FCM wake adapters | No content or filenames; core works by sync/refresh without a vendor |
| Device handoff | Short control lease with monotonic generation | One controlling endpoint; safe race resolution |
| Plans, todos, diffs, artifacts | Typed session events and content references | Classification and preview sandbox apply |
| Offline queue | Client-side encrypted queue with edit/cancel before send | No silent privileged action replay |
| Multi-agent adapters | Adapter capability negotiation | AC contract, not any agent's private protocol, is durable |

## Adopt after the first pilot

| Capability | Conditions |
|---|---|
| Voice supervision | Local/open STT/TTS path, explicit microphone consent, action-by-action approval |
| Attach to an existing session | Ownership proof, workspace match, immutable audit receipt |
| Session fork/replay | Provider-neutral semantics and clear disclosure of copied context |
| Multiple machines | Per-machine trust, residency-aware routing, revocation and conflict tests |
| Collaboration | Named participants, end-to-end group keys, role/scopes, no public links by default |
| Local transcript search | Endpoint-local decrypted index; explicit retention and deletion |
| Reusable skills/tools | Signed bundles, provenance, scopes, review and sandboxing |
| Terminal/file editing | Desktop-only mediation, constrained workspace roots, visible command preview |
| Smart notification routing | User rules evaluated on institution-controlled metadata |

## Do not adopt into the required core

- Mandatory Happy Cloud, OpenWork Den, vendor MCP, analytics, or account service.
- Source-available OpenWork `ee/` code or subscription-gated control-plane logic.
- Provider credentials synchronized to mobile or stored by the relay.
- Plaintext transcript, code, prompt, or file contents at the relay.
- Public session links, broad filesystem grants, unrestricted remote shell, or
  automatic approval as defaults.
- A hard dependency on Codex, Claude Code, OpenCode, or any single agent engine.
- Push payloads containing sensitive content.

## Shared capability model

Every host advertises protocol version, agent adapter, model aliases, workspace
grant, supported commands, event kinds, content types, and permission modes. A
client hides unsupported controls instead of guessing. Unknown event kinds are
retained for cursor progress but never executed.

## Delivery plan

1. Freeze schemas and build fixtures for pairing, envelopes, permissions, events,
   cursor resume, and handoff.
2. Implement a loopback Session Host and synthetic relay with no model provider.
3. Connect OpenWork desktop through the host adapter and Commons AI Gateway.
4. Import the Happy mobile baseline after its gate and connect it to the relay.
5. Threat-test compromised relay, lost phone, duplicated commands, stale approval,
   offline host, and concurrent handoff.
6. Pilot read/observe workflows before enabling remote tool approval.

## Purpose and outcome

This specification defines the purpose and intended outcome of **Happy-Ecosystem-Feature-Adoption-Scope** for the institution-neutral Commons ecosystem and its deployment boundaries.

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
