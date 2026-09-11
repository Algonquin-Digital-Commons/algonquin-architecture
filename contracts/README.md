# Shared Contracts

Versioned schemas and protocol profiles shared across repositories:

- `identity/` — normalized user, service, role, and scope shapes
- `academic/` — normalized courses, memberships, content, assignments, deadlines, announcements, and provider operations
- `events/` — event envelope, tracing, classification, and delivery semantics
- `activitypub/` — supported ActivityPub objects, activities, and extensions
- `spatial/` — places, scenes, coordinates, precision, provenance, and privacy
- `ai/` — model aliases, inference requests, usage, and policy metadata
- `agent-sessions/` — encrypted envelopes, pairing, permissions, continuity, and handoff
- `deployment/` — signed institution branding, endpoints, OIDC, feature and trust configuration
- `compute/` — capabilities, jobs, lifecycle events, and result references
- `media/` — assets, renditions, provenance, rights, and delivery references

Contracts are implementation-neutral. Product repositories generate or maintain
language-specific bindings only after the contract is approved and versioned.
