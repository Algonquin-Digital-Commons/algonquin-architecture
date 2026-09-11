# Happy Mobile Client Foundation


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: Commons AI Fabric mobile team
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Governing decision: ADR-0019

## Product role

The institution-branded Happy-derived mobile client is a safe companion for observing, steering, and approving AI
sessions running on an authorized workstation or institutional runtime. It uses
Happy's MIT Expo application as a gated scaffold and speaks the platform-owned
Agent Session Contract.

## Architecture

```text
Happy-derived iOS / Android client
          │ E2EE envelopes; relay cannot read payloads
          ▼
institution-controlled Commons Session Relay
          │ E2EE envelopes
          ▼
Commons Session Host ── agent adapter ── Commons AI Gateway ── approved runtime
          │
          └── local workspace + permission enforcement
```

The mobile device displays and signs decisions. It does not execute arbitrary
workspace commands, hold model-provider credentials, or bypass host-side policy.

## First release scope

- Institution sign-in, QR/deep-link pairing, device naming, and revocation.
- Session list, health, current task, live event stream, and reconnect cursor.
- Send, queue, edit-before-dispatch, interrupt, and resume messages.
- Permission inbox with `allow_once` and `deny`; durable grants are a later,
  separately governed capability.
- Plans, todos, diffs, file/artifact previews, receipts, and failure notices.
- Device control lease and deterministic handoff back to desktop/terminal.
- Opaque push notifications that reveal no prompt, path, course, or result text.
- Accessible iOS/Android interaction and reduced-data/offline states.

## Data and key rules

- Generate or unwrap session encryption keys only on trusted endpoints.
- Relay storage contains ciphertext plus the minimum routing metadata.
- Key recovery, if enabled, is a separately approved institutional design; the
  server must not silently escrow transcript keys.
- Device revocation prevents new envelopes and rotates affected session keys.
- Notification providers receive only a random wake token and coarse event class.
- Self-hosted ntfy/UnifiedPush is preferred where supported. APNs/FCM adapters are
  optional wake channels; foreground sync and manual refresh remain functional
  when they are unavailable.
- Server retention and client caches are explicit, encrypted, and user-visible.

## Upstream boundary

The baseline is `slopus/happy`, not its hosted service. Happier and Happy Agent
may supply design evidence, but code is imported only after its own provenance,
license, cryptography, dependency, and maintenance review.

## Acceptance evidence

Require exact upstream commit and checksum, MIT notice inventory, SBOM, self-hosted
relay test, cryptographic protocol review, lost-device/revocation exercise,
metadata-leakage test, push/deep-link threat model, offline/handoff race tests,
WCAG-informed mobile testing, and signed distribution evidence.

Users obtain the app, authenticate and pair devices through
[Institution-Branded Client Distribution and Access](Institution-Branded-Client-Distribution-and-Access.md).

## Purpose and outcome

This specification defines the purpose and intended outcome of **Happy-Mobile-Client-Foundation** for the institution-neutral Commons ecosystem and its deployment boundaries.

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
