# Standards-First Decision Coverage Matrix


> Standard: PSDC-DOC-001
> Document type: architecture-map
> Status: Normative
> Owner: Platform architecture
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-10
> Governing decisions: Applicable ADRs and repository governance

This matrix shows how the accepted standards-first decisions constrain every
section of the master documentation suite. It prevents a subsystem from treating
the principle as optional or limited to Commons AI Fabric.

| Documentation domain | Adopted boundary/reference | institution-specific value to build |
|---|---|---|
| Vision | Open standards and upstream-first sourcing | Mission, principles, institutional outcomes |
| Architecture | Versioned APIs, events, schemas, capability and contracts | Cross-ecosystem composition and ownership model |
| Cloud | OpenStack/Kubernetes and mature references | Service broker, institutional policy, coherent control experience |
| Compute | VM, OCI, batch, Kubernetes and accelerator interfaces | College quotas, catalogs, placement policy |
| Commons Compute Fabric | Runtime adapters; HTCondor model; mature inference engines | Enrollment, trust, topology, idle policy, scheduling and accounting |
| Storage | S3-compatible objects, content addressing, mature storage | Institutional placement, lifecycle and policy |
| Network | IP, DNS, TLS/mTLS, standard routing and VPN | Campus topology and service policy |
| Identity | Keycloak, OIDC/OAuth, SCIM where supported; College-authoritative Entra upstream in production | Claim normalization, roles, scopes and identity separation |
| AI | OpenAI-compatible API; mature model runtimes | Gateway, aliases, routing, academic and agent platform |
| Academic | Supported D2L APIs, OAuth and LTI | Course contracts, study tools and faculty controls |
| Student life | Standard APIs, events, workflows and identity | Campus services, consent, planning and agent UX |
| Clients | OSI-licensed upstreams and platform APIs; verified Open WebUI v0.6.5 BSD scaffold | PSDC Web branding, accessibility, SSO and coherent workflows |
| Developer | OpenAPI, gRPC/Protobuf, OCI and standard SDK practices | Unified developer portal and institution-neutral APIs |
| Infrastructure as code | OpenTofu plus Ansible | Open-source, self-hosted provisioning with institution-controlled state |
| Integration | CloudEvents, AsyncAPI and standard webhook/RPC patterns | Shared schemas, policy and workflow composition |
| Fediverse | ActivityPub and mature upstream products | Identity integration, moderation and shared UX |
| Media | Open portable formats and runtime adapters | Provenance, orchestration, spatial policy and delivery |
| Data | PostgreSQL, Valkey and mature open data engines | Service-owned schemas, governance and managed experience |
| Security | TLS/mTLS, PKI, established secret and policy systems | College threat models, controls and response |
| Governance | Standards compliance and recorded exceptions | Institutional decision rights and accountability |
| Operations | OpenTelemetry and native upstream controls | Cross-system SLOs, incident coordination and capacity |
| Reliability | Native HA/backup capabilities and portable contracts | Platform failure policy and dependency management |
| Runbooks | Supported product operations | Deterministic College-owned procedures |
| Testing | Conformance and upstream compatibility suites | Institutional acceptance and end-to-end validation |
| Open source | Upstream-first and bounded compatible forks | Contribution governance and patch accountability |
| Product | Accessible clients over shared APIs | Student, faculty, researcher and developer journeys |
| Deployment | OCI, Kubernetes, IaC and GitOps where appropriate | Environment policy and institutional promotion controls |
| Roadmap | Standards evaluation before custom work | Dependency order and exit criteria |
| Economics | Full lifecycle and migration costs | College capacity, quota and sustainability model |
| Institutional | Supported College identity and integration | Ownership, support, adoption and student access |
| Commons tenancy | Neutral core plus sovereign deployment overlays | No institution-specific assumptions in shared business logic |
| Non-social federation | Trust, capability, workload-envelope, artifact and ledger contracts | Institution-first exchange without a central super-admin |

## Exception path

Any cell may evolve as requirements become concrete. Replacing a standard boundary
or building a proprietary primitive requires a superseding ADR with evidence,
interoperability impact, maintenance ownership, migration, rollback, and exit plan.

## Purpose and mapped scope

This map explains the relationships represented by **Standards-First Decision Coverage Matrix**. It is a navigation and traceability authority for the named repositories, contracts, decisions, or cross-pollination paths; it does not silently replace an implementation specification.

## Scope and exclusions

The map covers only the documents, repositories, capabilities, and relationships explicitly named here. It excludes secrets, private infrastructure values, undocumented vendor commitments, and requirements that belong in an owning specification.

## Ownership boundaries

The owning repository remains authoritative for each capability and contract. This map may summarize and link, but it MUST NOT redefine a product boundary, institution policy, or signed deployment value. Cross-repository changes require the owning ADR or contract update.

## Dependency and relationship semantics

A relationship means a declared contract, event, protocol, deployment dependency, or navigation link; it does not mean shared database or filesystem access. Producers and consumers MUST use the referenced versioned contract, and circular synchronous dependencies require an accepted ADR.

## Source of truth and references

The source of truth is the linked document in the owning repository plus its accepted ADRs, schemas, and deployment profiles. When a link crosses repositories it MUST use a canonical hosted URL or a workspace-relative path that the structural checker can resolve.

## Validation and staleness

The map is valid only while links resolve, referenced control blocks and versions remain current, and no newer accepted ADR contradicts the summary. Run Test-Documentation.ps1 and Test-DocumentQuality.ps1; stale or contradictory entries MUST be corrected, superseded, or marked historical with an owner and expiry.
