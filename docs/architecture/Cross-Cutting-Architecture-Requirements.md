# Cross-Cutting Architecture Requirements

> Standard: PSDC-ARCH-BASELINE-001
> Document type: governance-standard
> Status: Normative
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: ADR-0001, ADR-0005, ADR-0012, ADR-0013, ADR-0016, ADR-0017

## Purpose

This standard owns requirements that apply to many PSDC components. A component
specification references this baseline and defines only its additional behavior,
interfaces, state, threats, degraded modes, and evidence. Central ownership keeps
security and operations consistent without copying prose into hundreds of files.

## Required applicability declaration

- **BASE-APPLY-001:** Every normative architecture or component specification
  MUST declare that this standard applies, list each non-applicable control with
  rationale, and define subject-specific extensions using stable identifiers.
- **BASE-APPLY-002:** A local specification MUST NOT repeat this standard. If a
  baseline control needs different behavior, a superseding ADR MUST identify the
  affected control, compatibility impact, migration, evidence, and expiry or
  permanent rationale.
- **BASE-APPLY-003:** Institution forks MAY strengthen this baseline but MUST NOT
  weaken it or replace portable contracts with institution- or vendor-only APIs.

## Ownership and dependency boundaries

- **BASE-OWN-001:** A domain owns its schemas, policy enforcement points,
  migrations, service metadata, compatibility tests, and operational evidence.
- **BASE-OWN-002:** Consumers MUST use versioned contracts; direct dependence on
  another service's database, queue, filesystem, or undocumented API is prohibited.
- **BASE-OWN-003:** Identity, authorization, secrets, telemetry, object storage,
  notifications, and gateway capabilities MUST be consumed from their owning
  contracts with timeouts and an explicit unavailable-state behavior.
- **BASE-OWN-004:** Mandatory runtime dependencies MUST be open source and
  self-hostable. A proprietary service MAY exist only as an optional adapter with
  a tested local replacement and no exclusive data or control-plane dependency.
- **BASE-OWN-005:** Circular synchronous dependencies are prohibited. A workflow
  spanning domains MUST name its coordinator, state owner, idempotency boundary,
  timeout, compensation, and reconciliation behavior.

## Deployment and configuration

- **BASE-DEPLOY-001:** Common repositories own portable schemas, reference
  configuration, conformance tests, and reusable OpenTofu, Helm, Kubernetes, or
  OCI assets. Institution repositories own branding, adapters, policy overlays,
  signed site values, and release promotion configuration.
- **BASE-DEPLOY-002:** Secrets MUST NOT be committed. Deployments MUST retrieve
  them through an institution-controlled secret manager using least privilege and
  support rotation without rebuilding source artifacts.
- **BASE-DEPLOY-003:** Development uses synthetic data. Staging MUST exercise
  production-like identity, policy, upgrade, rollback, backup, and dependency-loss
  behavior without copying production data by default.
- **BASE-DEPLOY-004:** Production promotion MUST use reviewed GitOps change,
  immutable versioned artifacts, signed provenance, automated health gates, and a
  tested rollback or forward-recovery procedure.

## Capacity and overload

- **BASE-CAP-001:** Each institution deployment manifest MUST record workload
  assumptions, normal and peak demand, quota dimensions, saturation thresholds,
  scale limits, resource budgets, and service objectives. Unmeasured estimates
  MUST be labelled and replaced by measured evidence before production approval.
- **BASE-CAP-002:** Components MUST bound concurrency, queues, retries, payloads,
  result size, and execution time. Admission control and backpressure MUST act
  before resource exhaustion.
- **BASE-CAP-003:** Overload MUST preserve authorization, audit, ordering,
  idempotency, and tenant fairness. Optional and batch work degrades before safety,
  protected operations, and declared interactive workloads.
- **BASE-CAP-004:** CPU, accelerator, memory, storage, network, cost, and energy
  consumption MUST be observable at the allocation boundary used for capacity and
  sustainability decisions.

## Security, privacy, and data

- **BASE-SEC-001:** Authentication uses the institution-approved issuer.
  Authorization MUST be deny-by-default, least-privilege, policy-versioned, and
  enforced at every trust boundary; an unavailable policy authority fails closed.
- **BASE-SEC-002:** Threat models MUST cover malicious input, compromised identity,
  dependency compromise, data exfiltration, denial of service, unsafe automation,
  and administrative misuse. High-impact actions require explicit authority,
  confirmation appropriate to risk, and attributable audit evidence.
- **BASE-DATA-001:** Each persisted data class MUST declare owner, purpose,
  classification, residency, retention, export, correction, archival, deletion,
  backup, and recovery behavior in the institution deployment manifest.
- **BASE-DATA-002:** Protected content MUST be minimized in logs, traces, model
  context, caches, and diagnostics. Deletion MUST address indexes, derivatives,
  replicas, queues, caches, and backups under the declared retention rule.

## Reliability and compatibility

- **BASE-REL-001:** Every remote dependency MUST have bounded timeouts, retry
  limits with jitter, circuit breaking, health signals, and a declared fail-closed,
  fail-open, queued, cached, or unavailable mode justified by data and safety risk.
- **BASE-REL-002:** Stateful services MUST demonstrate restore against declared
  recovery objectives. Stateless services MUST be reproducible from reviewed
  source, signed artifacts, and versioned configuration.
- **BASE-COMPAT-001:** Releases MUST support rollback and the current major
  contract version plus one prior major version unless a domain ADR defines a
  safer migration window and coordinated consumer retirement.

## Observability and evidence

- **BASE-OBS-001:** Components MUST publish health, readiness, structured logs,
  metrics, traces, security events, latency, errors, usage, and saturation through
  OpenTelemetry-compatible boundaries without exposing protected content.
- **BASE-TEST-001:** Applicable unit, schema, contract, authorization, privacy,
  failure, upgrade, rollback, accessibility, performance, and standalone-
  institution tests MUST pass at the release gate.
- **BASE-EVID-001:** A production candidate requires an accountable owner,
  runbook, threat model, locked dependencies, license inventory, SBOM, vulnerability
  and secret scans, signed provenance, recovery evidence, and acceptance results.
- **BASE-EVID-002:** Evidence MUST name the artifact digest, configuration version,
  environment class, test identity class, timestamp, tool or procedure, result,
  reviewer, and retained evidence location. A prose claim is not execution evidence.

## Maturity and definition of done

A specification is scoped when its subject-specific contract, data ownership,
interfaces, degraded modes, and measurable acceptance evidence are defined and no
material choice is hidden. It is implemented only when the evidence in
`BASE-EVID-002` exists for a concrete artifact and environment. It is production
ready only after institutional approvals and operating ownership are recorded.

## Change control

Changes to this baseline require architecture and security review because every
adopting specification inherits them. A pull request MUST identify affected
control IDs, compatibility consequences, migration needs, and which conformance
tests prove the new behavior. Silent weakening through an institution override is
non-conforming.

## References

- [Specification Completeness Standard](Specification-Completeness-Standard.md)
- [Documentation Architecture Standard](../Documentation-Architecture-Standard.md)
- [Architecture Decision Records](../decisions/README.md)
