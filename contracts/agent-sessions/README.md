# Agent Session Contract


> Standard: PSDC-DOC-001
> Document type: repository-index
> Status: Normative
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: none; index governed by repository policy

Versioned, agent-neutral contracts shared by desktop, mobile, Session Host,
Session Relay, gateway, policy, notifications, and audit services.

## Authority boundaries

- Session Host owns execution, ordered events, workspace grants, and control lease.
- Relay transports opaque encrypted envelopes and cannot authorize actions.
- Client displays state and submits authenticated commands or decisions.
- Policy service may further restrict a host action; a mobile approval can never
  weaken host or institutional policy.
- Commons AI Gateway owns model aliases, routing, usage, and provider credentials.

## Version 1 schemas

- `session-envelope.schema.json` — encrypted relay message and replay metadata.
- `permission-request.schema.json` — bound privileged-action challenge.
- `permission-decision.schema.json` — expiring signed response.
- `device-pairing.schema.json` — expiring device-key pairing challenge.

The schemas are the normative v1 wire shapes. Implementations use RFC 8785 JSON
Canonicalization Scheme before signatures, X25519 for pairwise key agreement,
HKDF-SHA-256 for key derivation, XChaCha20-Poly1305 for authenticated encryption,
and Ed25519 for signed permission decisions. A later algorithm profile is
negotiated by identifier and cannot silently downgrade an existing session.

Every implementation SHALL publish valid and invalid fixtures and pass schema,
canonicalization, replay, expiry, signature, reordering, reconnect, revocation,
lost-device, authorization and compatibility tests before release.

## Purpose

This index explains the purpose and placement of $dir and links readers to the authoritative documents it contains.

## Allowed contents

This directory belongs to $repo. It may contain scoped documentation, contracts, configuration examples, tests, and navigation links owned by this repository.

## Prohibited contents

It MUST NOT contain secrets, credentials, private infrastructure values, unrelated product source, copied institution overrides, or undocumented external dependencies.

## Owner

The owning role is $owner; accountable maintenance remains with RedjiJB until a second maintainer is appointed.

## Contents

- `device-pairing.schema.json`
- `permission-decision.schema.json`
- `permission-request.schema.json`
- `README.md`
- `session-envelope.schema.json`

## Contribution and change control

Changes MUST use a pull request, preserve the repository boundary, update affected links and contracts, and pass the structural and substantive documentation audits before merge.

## References

- [Ecosystem documentation quality standard](https://github.com/Post-Secondary-Digital-Commons/psdc-architecture/blob/main/docs/standards/Ecosystem-Documentation-Quality-Standard.md)
- [Repository governance](https://github.com/Post-Secondary-Digital-Commons/psdc-architecture/blob/main/docs/governance/GitHub-Repository-Governance.md)

