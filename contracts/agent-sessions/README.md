# Agent Session Contract

Versioned, agent-neutral contracts shared by desktop, mobile, Session Host,
Session Relay, gateway, policy, notifications, and audit services.

## Authority boundaries

- Session Host owns execution, ordered events, workspace grants, and control lease.
- Relay transports opaque encrypted envelopes and cannot authorize actions.
- Client displays state and submits authenticated commands or decisions.
- Policy service may further restrict a host action; a mobile approval can never
  weaken host or institutional policy.
- Commons AI Gateway owns model aliases, routing, usage, and provider credentials.

## Seed schemas

- `session-envelope.schema.json` — encrypted relay message and replay metadata.
- `permission-request.schema.json` — bound privileged-action challenge.
- `permission-decision.schema.json` — expiring signed response.
- `device-pairing.schema.json` — expiring device-key pairing challenge.

These schemas are implementation scaffolds, not a frozen v1. Add fixtures,
cryptographic profiles, canonical serialization, event/command schemas, version
negotiation, and compatibility tests before implementation freeze.

