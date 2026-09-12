# Domain Control Profiles

> Standard: PSDC-ARCH-DOMAIN-001
> Document type: architecture-map
> Status: Normative
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: PSDC-ARCH-BASELINE-001 and applicable ADRs

## Purpose and scope

This map centralizes controls shared by specifications in a domain. A subject
specification inherits its domain profile and the [cross-cutting architecture
baseline](Cross-Cutting-Architecture-Requirements.md); it MUST define its own
purpose, interfaces, data owner, failure behavior, and acceptance extension.

## Ownership and validation

- **DOM-OWN-001:** The domain profile owns shared invariants; a subject document
  owns behavior that differs by capability, data class, or lifecycle.
- **DOM-OWN-002:** A profile change requires impact analysis for every linked
  subject document and a conformance-test update before acceptance.
- **DOM-OWN-003:** Institution forks inherit these profiles and MAY strengthen
  controls through an explicit local overlay, but MUST NOT silently weaken them.

## AI profile

AI specifications inherit provider-neutral gateway access, policy enforcement,
model and tool routing, bounded context, usage metering, evaluation gates, and
safe fallback. Governed data includes prompts, responses, embeddings, model
metadata, policy decisions, usage records, and explicitly scoped memory. The
security boundary is untrusted content to privileged tools; prompt injection,
data exfiltration, unsafe automation, and model unavailability are mandatory
failure cases. Interfaces use versioned OpenAI-compatible and native contracts,
explicit confirmation levels, and attributable audit events.

- **DOM-AI-001:** An AI subject MUST declare the model, tool, policy, and data
  boundary it owns and the gateway contracts it consumes.
- **DOM-AI-002:** High-impact actions MUST have policy evaluation, confirmation,
  cancellation, and an evidence record independent of model output.

## Campus compute fabric profile

Campus-compute specifications inherit signed enrollment, capability attestation,
trust tiers, job and artifact contracts, fair scheduling, interactive priority,
preemption, checkpointing, resource accounting, and failure-domain-aware drain.
Governed data includes node posture, capability claims, job metadata, artifacts,
utilization, and bounded diagnostics. The security boundary is an enrolled
worker and its sandbox; compromised workers, thermal limits, power loss, and
stale attestations are mandatory failure cases.

- **DOM-CCF-001:** A compute subject MUST state its scheduler, trust-tier, and
  checkpoint interaction without depending on a particular execution engine.
- **DOM-CCF-002:** Overload MUST preserve protected workloads and never bypass
  authorization, attestation, accounting, or artifact-integrity checks.

## Media fabric profile

Media specifications inherit resumable ingest, immutable asset hashes,
deterministic derivatives, rights and moderation enforcement, metadata and
provenance, object lifecycle, spatial representation, and bounded delivery.
Governed data includes source assets, derivatives, manifests, rights, moderation
state, spatial metadata, and retention records. Malware, unsupported content,
rights violations, failed derivatives, and storage loss are mandatory failure
cases. Interfaces remain compatible with object, media, spatial, and provenance
standards behind Commons-owned contracts.

- **DOM-MEDIA-001:** A media subject MUST identify the source-of-truth asset,
  derivative lineage, rights decision, and deletion propagation path.
- **DOM-MEDIA-002:** Delivery MUST not expose an asset until integrity, rights,
  moderation, and audience policy have been evaluated.

## Fediverse profile

Fediverse specifications inherit ActivityPub, ActivityStreams 2.0, WebFinger,
NodeInfo, signed requests, instance policy, moderation, queue isolation, object
deletion, export, and federation suspension. Governed data includes actors,
objects, activities, media references, reports, blocks, consent, and retention
metadata. Remote compromise, replay, abuse, media overload, and deletion failure
are mandatory failure cases. Institutional authentication remains separate from
public actor identity.

- **DOM-FED-001:** A federation subject MUST declare local authority, remote
  trust assumptions, delivery/replay behavior, moderation owner, and tombstone
  handling.
- **DOM-FED-002:** Remote failure or policy incompatibility MUST be isolated from
  local protected data and interactive operation.

## Security profile

Security specifications inherit zero implicit trust, phishing-resistant MFA,
least privilege, encryption, secure defaults, rapid revocation, supply-chain
integrity, auditability, and explicit exceptions. Governed data includes threat
models, findings, keys and metadata, incidents, vulnerabilities, and remediation
evidence. Identity compromise, malicious input, dependency compromise,
exfiltration, denial of service, and unsafe automation are mandatory threat
categories. Every control must have an owner, enforcement point, signal, and
verification evidence.

- **DOM-SEC-001:** A security subject MUST name the protected asset, attacker,
  trust boundary, preventive control, detection signal, and recovery action.
- **DOM-SEC-002:** A control that cannot be tested, observed, revoked, or
  recovered is incomplete regardless of its prose description.

## Applicability and change control

- **DOM-APPLY-001:** A subject document MUST link the applicable profile section
  and record a local extension or a justified non-applicability decision.
- **DOM-APPLY-002:** Profile and subject documents are reviewed together when an
  interface, trust boundary, data class, or failure assumption changes.

## References

- [Cross-Cutting Architecture Requirements](Cross-Cutting-Architecture-Requirements.md)
- [Specification Completeness Standard](Specification-Completeness-Standard.md)
