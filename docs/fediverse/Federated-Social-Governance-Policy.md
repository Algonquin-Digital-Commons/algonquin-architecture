# Federated Social Governance Policy


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: ADR-0002, ADR-0008, ADR-0012, ADR-0014, ADR-0020

> Scope: Commons Social Fabric and every ActivityPub-enabled social product

## Are the social products federated?

Yes. Mastodon-compatible social, Pixelfed photos, PeerTube video, Lemmy
communities and WriteFreely blogs use ActivityPub/ActivityStreams federation when
the local institution enables it. Text, photos, video, communities and blogs can
interoperate with external Fediverse peers to the extent supported by their
profiles. Unsupported object fields degrade safely rather than changing meaning.

Federation is optional per institution, product, domain, account and object. A
deployment can run local-only indefinitely.

## Federation modes

| Mode | Behavior | Default use |
|---|---|---|
| Disabled | No external inbox/outbox delivery | Development, incident containment, institutions choosing local-only |
| Allowlist pilot | Only named, reviewed peer domains | Initial institutional pilot |
| Limited federation | Broader delivery with quarantine/limit rules | After moderation and abuse evidence |
| Open federation | Federate unless a domain/actor/content rule blocks or limits it | Requires institutional risk acceptance |

The accepted first production mode is **allowlist pilot**. Advancing modes
requires measured moderator capacity, incident exercises and accountable approval.

## Authority and identity

- Each institution owns its actor domains, keys, moderation, block/allow lists,
  retention and legal decisions.
- Institutional OIDC may provision a local account, but the public ActivityPub
  actor is a separate identifier. Student/staff numbers, private email, course
  membership and IdP claims are never published by default.
- Remote actors never become local institutional identities or receive local
  application roles merely because they federate.
- There is no global moderator or Commons-wide block list with automatic force.
  Institutions may subscribe to signed advisories and choose whether to apply them.

## Publication policy

- Users choose local, followers, mentioned recipients, unlisted/public or another
  supported audience for each object; the interface shows when an object may leave
  the institution.
- Private, course-restricted, direct or precise-location content is not converted
  into public federation objects.
- Media publication uses governed Media Fabric references/renditions with rights,
  provenance, classification and accessibility metadata.
- Spatial objects use a public place identifier or reduced precision; private
  coordinates are stripped.
- AI assistance may label, summarize, translate or flag content, but it does not
  make final punitive moderation decisions.

## Peer trust controls

Every remote request passes:

1. HTTPS, actor discovery and key/signature verification;
2. SSRF-safe URL and redirect validation;
3. domain, instance and actor allow/limit/block policy;
4. schema, size, media-type and object-profile validation;
5. replay, duplicate, rate and abuse controls;
6. content/media quarantine and malware/safety processing where applicable; and
7. local moderation before eligible content reaches local discovery surfaces.

Trust actions include allow, silence/limit, quarantine, reject object, suspend
actor and block domain. Emergency blocks take effect immediately and enter the
appeal/review record.

## User and community protections

- Block, mute, filter and report controls are available to users.
- Community moderators receive bounded authority over named spaces, not the whole
  institution.
- Reports have acknowledgement, triage, evidence, decision, notification,
  appeal and retention rules.
- Harassment, threats, non-consensual intimate media, doxxing, impersonation,
  malicious software, unlawful content, privacy violations and repeated evasion
  receive documented response paths.
- Academic-integrity concerns are referred to the institution's academic process;
  social moderators do not determine grades or discipline.
- Users can export eligible content and request deletion. Remote deletion is sent
  as a best-effort ActivityPub activity and cannot guarantee that every peer erased
  an earlier lawful copy; the interface must explain this limitation.

## Operations and transparency

- Signed inbox/outbox jobs are durable, idempotent, bounded and observable.
- Failed peers back off; federation failure never takes down local social use.
- Logs minimize content and identity, use an institution-approved retention
  schedule and restrict moderator/operator access.
- Each deployment publishes contact, rules, supported object types, federation
  mode, moderation/appeal route and material policy changes.
- Regular transparency reporting uses aggregated counts that do not expose
  reporters, victims or private content.

## Required readiness evidence

Before public federation: named policy/moderation/security owners, approved code
of conduct and privacy notice, allowlist, abuse mailbox, coverage model, threat
model, key rotation, remote media controls, backups, moderation drills, appeals,
incident runbook, interoperability tests and a controlled peer exercise.

## Purpose and outcome

This specification defines the purpose and intended outcome of **Federated-Social-Governance-Policy** for the institution-neutral Commons ecosystem and its deployment boundaries.

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
