# Source Decision Import — 2026-09-10


> Standard: PSDC-DOC-001
> Document type: architecture-map
> Status: Complete
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Source type: User-provided chat excerpt
> Scope: Standards-first architecture decisions

## Imported principle

Algonquin-specific engineering value belongs at the orchestration, integration,
policy, UX, academic, student-service, and campus-resource coordination layers.
Infrastructure standards and mature implementations should be adopted, extended,
or integrated rather than recreated.

## Normalized decisions

| Source decision | Architecture record |
|---|---|
| Use standards and mature implementations before building | ADR-0001 |
| Use Entra/Algonquin SSO through OIDC/OAuth | ADR-0002 |
| Expose OpenAI-compatible AI endpoints and common provider adapters | ADR-0003 |
| Keep ACF runtime-agnostic and own only campus-specific orchestration | ADR-0004 |
| Use standard data, API, event, OCI, telemetry, storage, TLS, and secret primitives | ADR-0005 |
| Keep eligible clients and adopted products as thin downstream forks | ADR-0006; Open WebUI eligibility superseded by ADR-0008 |
| Use supported D2L/Brightspace interfaces and do not scrape | ADR-0007 |

## Reference projects preserved as references

HTCondor, Kubernetes, GPUStack, vLLM, SGLang, llama.cpp, Ray, exo, and SwarmLLM
are recorded as projects to adopt, interoperate with, or evaluate. The source does
not establish one product or version as mandatory for every environment.

PostgreSQL, Redis-compatible coordination through Valkey, object storage, OCI, OpenTelemetry,
OpenAPI, CloudEvents, AsyncAPI, gRPC/Protobuf, TLS/mTLS, and established secret
management are recorded as default standards or mature primitives subject to
workload and institutional review.

## Intentionally unresolved

The source does not settle:

- exact versions, vendors, hosting environment, procurement, or support model;
- the final policy engine, event broker, object store, secrets system, or database
  topology;
- which workloads justify gRPC, Ray, distributed inference, or heterogeneous
  sharding;
- production Entra tenant configuration or institutional claims;
- licensing, data-residency, accessibility, security, and operational approval;
- quantitative SLOs, quotas, capacity, cost, recovery targets, and rollout dates.

Those were recorded as unresolved items in the owning documents at import time. They must not be inferred
from a reference technology name.

## Later constitutional clarification

ADR-0008 requires an OSI-approved license and fully self-hosted core for every
selection. It makes Entra and Brightspace provider-specific boundary adapters and
excludes current Open WebUI releases as dependencies. ADR-0009 subsequently chose
the v0.6.5 BSD source as a gated web scaffold, and ADR-0010 clarified that
College-approved systems remain authoritative for institutional production. This
preserves the imported source as a historical record without allowing older
product assumptions to override current policy.

## Propagation

All 434 Markdown specifications from the master suite contain applicable settled
constraints and ADR traceability. The OpenAPI normative profile now contains equivalent
machine-readable decision metadata. The constitutional documents and core
standards documents were expanded into drafts where the source contained enough
decision content.

## Purpose and mapped scope

This map explains the relationships represented by **Source Decision Import — 2026-09-10**. It is a navigation and traceability authority for the named repositories, contracts, decisions, or cross-pollination paths; it does not silently replace an implementation specification.

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
