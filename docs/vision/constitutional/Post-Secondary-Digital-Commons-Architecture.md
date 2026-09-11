# Post-Secondary Digital Commons Architecture


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Accepted
> Owner: Algonquin Institution Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: ADR-0012, ADR-0013, ADR-0014, ADR-0016, ADR-0020

> Date: 2026-09-10

## Purpose

The platform is the reusable, institution-neutral Post-Secondary Digital Commons.
Algonquin College is its first reference deployment, not a tenant hard-coded into
the core. Each participating institution operates a sovereign deployment with its
own branding, identity, academic adapters, policy, data, models, applications,
compute, moderation, retention, and operational authority.

The commons provides shared protocols, schemas, software, conformance tests, and
federation mechanisms. It does not create one central database, directory, LMS,
social graph, or super-administrator for every institution.

## Three architectural layers

| Layer | Responsibility | Examples |
|---|---|---|
| Institution experience | Local branding, portals, policy, authoritative adapters, data and operations | Algonquin deployment overlay, Entra and Brightspace adapters |
| Reusable commons | Tenant-neutral software, contracts, SDKs, reference infrastructure and test suites | Gateway, provider contracts, event schemas, policy profiles |
| Federation | Explicit trust, discovery, routing, exchange, settlement and conformance across sovereign deployments | ActivityPub peers, compute capability exchange, shared artifact manifests |

## Fabric model

| Fabric | Primary responsibilities | Current repository home |
|---|---|---|
| Cloud and service fabric | Identity broker, policy, APIs, events, data services, storage, secrets, observability, delivery platform | `psdc-cloud` |
| Compute fabric | Dedicated and opportunistic resource enrollment, trust, capability discovery, scheduling, preemption and accounting | `psdc-compute` |
| AI and agent fabric | Gateway, models, routing, RAG, evaluations, agent tools and AI clients | `psdc-ai` |
| Media and spatial fabric | Image, audio, video, 3D, 4DGS, spatial assets, provenance, transformation and delivery | `psdc-media` |
| Social fabric | Fediverse actors, social, photos, video, communities, blogs, moderation and ActivityPub federation | `psdc-social` |
| Academic fabric | Institution-neutral course, enrolment, content and assessment contracts with local authoritative adapters | Normative academic contract profile |
| Data fabric | Classification, sovereignty, catalogs, lineage, authorized exchange and lifecycle policy | Umbrella contracts plus service-owned stores |
| Developer fabric | Forge, CI, registry, SDKs, templates, sandbox and service catalog | Cloud plus umbrella standards |
| Communications fabric | Notifications, messaging and approved institutional communication adapters | Normative communications boundary |
| Research and innovation fabric | Reproducible environments, data/model manifests, compute grants and publication lineage | Normative cross-fabric capability |

These are logical ownership boundaries. They do not require an immediate new
repository or microservice for every row. A boundary earns extraction only when
independent ownership, scaling, security, release cadence, or reuse makes the
split operationally valuable.

## Institution sovereignty

Every institution controls:

- its user and workload trust relationships;
- authoritative identity and academic adapters;
- data classification, residency, retention, consent and deletion;
- approved models, tools, applications and federation peers;
- compute admission, scheduling, contribution and preemption policies;
- social domains, moderation, block lists and publication policies;
- branding, accessibility acceptance and local service levels;
- infrastructure state, secrets, keys, backups and recovery.

Federation cannot silently widen any of these authorities.

## Locality ladder

Placement uses the narrowest allowed and operationally suitable location:

1. the user's authorized device or local runtime;
2. dedicated infrastructure inside the institution;
3. the institution's campus compute fabric;
4. an approved regional post-secondary federation;
5. an approved provincial post-secondary federation;
6. an approved Canadian post-secondary federation;
7. an approved Canadian commercial provider;
8. a global hyperscaler or external API as an explicit last resort; or
9. queue, degrade, or fail when the workload envelope permits no location.

Each workload envelope states data class, geography, identity trust, execution
trust, software/model license, egress, retention, observability, cost ceiling,
fallback and approval. Routing may move down the ladder only inside that envelope.

## What federates

The default federation unit is a capability or signed reference, not unrestricted
raw institutional data. Eligible exchanges include:

- service and capability descriptions;
- bounded compute jobs and resource availability classes;
- signed container, model and media manifests;
- public or explicitly shared research artifacts;
- ActivityPub activities governed by each social node;
- coarse usage/accounting events required for an agreed resource ledger;
- conformance results, schemas and open-source software releases.

The following do not federate by default: raw identity directories, LMS databases,
private vector stores, prompt histories, precise location, access tokens, private
student work, unrestricted telemetry, secrets, keys, or infrastructure state.

## Federation trust and accounting

Federation requires bilateral or consortium trust profiles, mutually authenticated
workloads, scoped authorization, compatible policy, signed artifacts, auditable
events, incident contacts, revocation, data-processing terms, exit procedures and
conformance tests. A transparent resource ledger records contributions and use;
it does not require blockchain or public disclosure of private workloads.

## Social Fabric

The public social boundary is Fediverse-native. ActivityPub and ActivityStreams
are the durable protocols for social, photos, video, communities and blogs. A
specific server is replaceable. Institutional identity remains separate from
public social identity, and local moderation always applies before federation.

## Repository model

ADR-0022 establishes independent Git repositories for architecture/contracts,
each major fabric, each independently released client and each institution's
deployment overlay. A lightweight workspace repository coordinates checkouts and
Obsidian navigation without versioning product source. Tenant-specific values
belong only in institution deployment repositories.

Tightly coupled packages may share a Happy-style workspace inside one product
repository when they have the same owners, security boundary and release train.
That exception never combines unrelated fabrics into a grand monorepo.

## Validation sequence

1. Build and operate one Algonquin vertical slice.
2. Prove sovereign deployment and neutral contracts with a second institution.
3. Validate federation with three to five Ontario institutions.
4. Expand only after privacy, security, accessibility, operations, economics and
   governance evidence is repeatable.
5. Pursue Ontario-wide and then Canadian participation without centralizing local
   institutional authority.

White-labelling is successful only when a new institution can configure an
independent deployment without forking core business logic.

## Purpose and outcome

This specification defines the purpose and intended outcome of **Post-Secondary-Digital-Commons-Architecture** for the Algonquin deployment and its Commons compatibility boundary.

## Scope

The scope includes the capabilities, users, data, lifecycle, and interfaces described here. Institution overlays may configure approved values but MUST preserve the shared contract.

## Out of scope

Out of scope are secrets, unowned implementation internals, unrelated product capabilities, and any integration not named by a versioned contract. Such work requires its owning specification.

## Architecture and ownership

The architecture assigns responsibilities, trust boundaries, and ownership to the components named here. Algonquin owns institutional configuration and operations; Commons owners retain portable contracts unless this document explicitly records a local exception.

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
