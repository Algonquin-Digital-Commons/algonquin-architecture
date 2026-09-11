# Post-Secondary Digital Commons Architecture


> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Accepted
> Owner: PSDC Architecture Maintainers
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

## Scope

This constitutional specification covers the cross-repository decisions named in **Post-Secondary Digital Commons Architecture**. Institution-specific hostnames, credentials, physical capacity, and production values remain in signed institution overlays.

## Out of scope

This document does not authorize product implementation, institution-specific secrets, or a proprietary hosted dependency. Those decisions require the owning repository contract, deployment profile, and ADR evidence.

## Interfaces and contracts

Cross-system interactions MUST use versioned APIs, schemas, events, or federation protocols owned by the referenced repository. Producers, consumers, compatibility windows, idempotency, authorization context, and machine-readable errors MUST be explicit; direct database or private queue access is prohibited.

## Dependencies and ownership

The owning fabric retains its data, policy, release, and failure boundary. Shared identity, secrets, storage, events, telemetry, and compute are consumed through Commons contracts. Mandatory dependencies MUST be self-hostable and open source; institution overlays MAY add stricter policy but MUST NOT fork a common contract silently.

## Security, privacy, and safety

Trust boundaries MUST use institution-controlled identity, deny-by-default authorization, least privilege, secret rotation, minimized telemetry, and explicit data classification/residency/retention/deletion. Protected content, credentials, and private infrastructure values MUST NOT appear in maps, logs, or committed configuration.

## Deployment and implementation

The common organization owns portable contracts, reference configuration, OpenTofu modules, conformance fixtures, and upstream-compatible improvements. Institution organizations own branding, signed site values, policy overlays, adapters, and operational approvals. Development uses synthetic data; production promotion is reviewed, observable, reversible, and provenance-recorded.

## Capacity and scaling

Implementations MUST declare workload assumptions, quotas, concurrency, queue limits, saturation thresholds, resource budgets, and service objectives. Scale-out MUST preserve authorization, ordering, idempotency, auditability, and locality; overload degrades optional work before protected or interactive work.

## Failure, recovery, and compatibility

Dependencies require timeouts, bounded retries, circuit breakers, health signals, and documented degraded modes. Authorization and security failures fail closed. Stateful deployments declare RPO/RTO and restore evidence; contract changes require migration, compatibility windows, rollback, and an ADR when behavior is incompatible.

## Testing and evidence

Evidence MUST include contract and schema validation, authorization/privacy/security tests, failure and recovery exercises, capacity measurements, accessibility where user-facing, SBOM/license review, signed provenance, and standalone institution conformance. The workspace structural and substantive documentation gates are required before release authorization.

## Acceptance criteria

The specification is accepted only when all named boundaries and requirements have an owner, an observable test or evidence type, a recovery path, and a traceable governing ADR or contract. Unmeasured production values remain implementation gates rather than undocumented assumptions.
