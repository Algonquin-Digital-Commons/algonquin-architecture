# Ecosystem Gap Analysis — 2026-09-10

> Status: Current-state baseline  
> Scope: Full Post-Secondary Digital Commons architecture and all five ecosystem repositories

## Executive finding

The ecosystem is **architecture-rich but implementation-empty**. The vision,
polyrepo boundaries, default stack, cross-fabric dependencies, Obsidian maps,
decision records and placeholder specifications are extensive. There is not yet a
deployable vertical slice, production contract set, infrastructure module, CI
pipeline, service implementation, verified upstream client import, operational
environment, institutional approval, or federation pilot.

The next milestone is not more horizontal scaffolding. It is one narrow,
measurable Algonquin deployment that exercises identity, policy, gateway,
inference, data, telemetry and a client end to end while keeping the Commons core
tenant-neutral.

## Evidence snapshot

The repository consistency inspection on 2026-09-10 found:

- five ecosystem implementation repositories plus the umbrella architecture;
- 587 Markdown documents, including 423 accepted-baseline specifications whose
  implementation content remains incomplete;
- 162 `.gitkeep` scaffold markers; four agent-session JSON Schema scaffolds now
  replace empty markers in the desktop/mobile/session paths;
- 4,964 TODO/provenance-gate-bearing lines after the naming/client-access update;
- one OpenAPI YAML placeholder, five draft JSON Schemas, plus one legacy GitHub
  Actions structure check;
- no application or OpenTofu source, deployable infrastructure, automated test
  suite, or accepted self-hosted Woodpecker CI pipeline;
- a large uncommitted migration-source tree; ADR-0022 now requires verified
  history transfer into independent repositories before implementation begins.

Counts describe repository maturity, not quality or completion. Re-run them at
each milestone because this document intentionally does not pretend that seeded
specifications are implemented.

## Maturity by area

| Area | Current maturity | What exists | Exit criterion for next state |
|---|---|---|---|
| Vision and scope | Defined | Constitutional principles and Commons architecture | Sponsor and institutional review recorded |
| Architecture decisions | Defined project baseline | ADR-0001 through ADR-0024 | Owners verify implementation conformance |
| Technology choices | Defined project baseline | Defaults/alternatives matrix and OpenTofu decision | Exact versions, licenses and lifecycle owners pinned |
| Obsidian navigation | Defined | Root vault, maps and ecosystem notes | Link validation in self-hosted CI and relocation committed |
| Detailed specifications | Scaffolded | Broad decision-seeded outlines | Critical paths contain measurable requirements and acceptance tests |
| Shared contracts | Started | Catalog, identity/academic skeletons, OpenAPI placeholder and draft agent-session schemas | Complete event/command/crypto profiles, fixtures and compatibility tests for the first slice |
| Tenant-neutral Commons | Conceptual | ADR and constitutional model | A second independently configured institutional deployment |
| Application implementation | Not started | Desktop/mobile provenance, Session Host/Relay boundaries and schema scaffolds; no source | Working gateway, host, relay and client flow |
| Infrastructure implementation | Not started | OpenTofu directories only | Reproducible dev and pilot environments with tested state recovery |
| Security/privacy | Policy scaffolded | Principles and placeholder controls | Threat model, data flows, control owners and evidence |
| Testing/release | Not started | Strategy outlines | Automated unit, contract, integration, security and recovery gates |
| Operations | Not started | Runbook outlines | SLOs, telemetry, on-call, backup/restore and incident exercises |
| ACF capacity | Unknown | Architecture and census placeholder | Measured hardware census and non-disruptive pilot |
| Federation | Conceptual | ActivityPub/locality/trust decisions | Two sovereign deployments pass conformance and failure tests |
| Economics | Planning assumption | CA$30 student-month model | Approved scope, budget, equity rules and accountable authority |
| External governance | Not started | Required decision categories | Named institutional decisions and documented approvals |

## Critical gaps

| Priority | Gap | Why it blocks progress | Required evidence |
|---|---|---|---|
| P0 | Complete multi-organization fork migration | Independent local repositories exist, but GitHub organizations/remotes and verified fork relationships are not configured | Commons and Algonquin organization slugs, repository forks, `origin`/`upstream` remotes, protected branches, repository-local CI and archived source checkout |
| P0 | Accountable ownership | Defaults cannot become operated services without decision and incident owners | Sponsor, product, architecture, security/privacy, operations and domain RACI |
| P0 | OpenTofu state/module design | Reproducibility still needs an exact backend and dependency policy | Supported release, provider/module allowlist, encrypted locking backend and recovery test |
| P0 | Neutral configuration boundary | White-labelling fails if Algonquin assumptions enter core logic | Tenant-neutral naming/schema rules and an Algonquin deployment overlay |
| P0 | Institution deployment manifest and signing | A draft schema now exists but is not a trusted distribution mechanism | Canonical serialization, signature envelope, fixtures, signing/rollback verification, OIDC registration profile and reproducible institution builds |
| P0 | First-slice contracts | Teams otherwise build incompatible interfaces | Identity claims, policy input/output, AI request/stream/error, model capability, usage and telemetry schemas |
| P0 | Data classification and threat model | Identity, AI, LMS and federation introduce high-impact data paths | Approved classes, flow diagrams, retention, encryption, abuse cases and control owners |
| P1 | Deployable local environment | Architecture cannot be tested | OCI compose/dev setup with Keycloak, gateway, PostgreSQL, Valkey, inference and OpenTelemetry |
| P1 | Gateway vertical slice | It is the durable client/provider boundary | Authenticated request, policy check, local model route, stream, audit and failure tests |
| P1 | Web foundation provenance | ADR-0009 does not authorize an unverified source import | Exact v0.6.5 commit, license archive, SBOM, security/accessibility review and maintenance plan |
| P1 | Desktop foundation provenance | ADR-0018 selects only eligible OpenWork core, not an unreviewed clone | Exact commit, MIT file inventory, proof `ee/`/Den/hosted paths are excluded, SBOM and Electron/IPC/update review |
| P1 | Mobile foundation and cryptography | ADR-0019 establishes boundaries but does not validate Happy code or an E2EE protocol | Exact commit, license/SBOM, self-host test, cryptographic profile/review, lost-device/revocation and mobile accessibility evidence |
| P1 | Session Host and Relay | READMEs and four schemas do not execute, negotiate versions, or prove content blindness | Event/command schemas, crypto profile, fixtures, adapter, relay implementation, replay/handoff/failure tests |
| P1 | Self-hosted delivery path | No repeatable quality gate exists | Forgejo/CI/registry workflow, signed artifact and reproducible release |
| P1 | Institutional adapters | Production authority remains external | College-approved Entra and Brightspace test tenants, mappings and failure modes |
| P1 | ACF capacity evidence | Spare-compute claims are unmeasured | Census, trust tiers, utilization, network/power and preemption pilot |
| P2 | Media/spatial slice | The complete architecture is not validated by text AI alone | Provenanced asset ingest, transform, object reference and accessible rendition |
| P2 | Fediverse slice | ActivityPub ownership is documented but untested | Local node, moderation policy, media reference and controlled peer |
| P2 | Cross-institution federation | Commons claims need more than one institution | Second deployment, trust agreement, conformance suite, revocation and ledger reconciliation |
| P2 | Sustainable economics | Funding assumption is not an approved program | Validated participation/cost data, equity model, budget and external approvals |

## First executable vertical slice

Build only enough to prove the durable boundaries:

1. An OCI-based developer environment with a synthetic Keycloak realm,
   PostgreSQL, Valkey, OpenTelemetry Collector and one local inference runtime.
2. A Python/FastAPI gateway implementing a documented OpenAI-compatible subset
   plus a native health/capability API.
3. Identity claim normalization, OPA policy input/output, model alias routing,
   server-sent streaming, structured errors, usage events and trace propagation.
4. One minimal client pointed only at the gateway; import an upstream client only
   after its provenance gate passes. Desktop/mobile are later slices, after the
   Session Host/Relay contracts and security model are tested.
5. Contract, integration, abuse, failure, backup/restore and accessibility tests.
6. Self-hosted build, SBOM, vulnerability/license scan, signing and OCI publishing.

Do not introduce OpenStack, a service mesh, distributed Python, a separate vector
database, multi-cluster federation or every empty service directory into this
slice unless measured requirements demand them.

## Definition of ecosystem completion

The ecosystem is not complete because every placeholder exists. It reaches a
credible pilot state when a documented, supported user journey operates on
institution-controlled infrastructure; survives dependency failures; restores
from backup; meets accessibility, security and privacy gates; reports measurable
service levels; and can be redeployed from versioned OpenTofu/Ansible and signed
artifacts. It reaches Commons validation only when a second institution deploys
the neutral core independently and both parties pass federation, revocation,
data-sovereignty and exit tests.

## Immediate sequence

1. Review and commit the documentation baseline; resolve the Obsidian relocation.
2. Name owners and select exact code/document licenses.
3. Complete OpenTofu version, state backend, provider allowlist and recovery design.
4. Freeze the first-slice contracts and threat model; complete the Agent Session
   event/command/cryptographic profile before remote control.
5. Implement and operate the local vertical slice.
6. Run the ACF hardware census in parallel with, but outside, the critical path.
7. Add institutional adapters and a controlled Algonquin pilot.
8. Rehearse verified OpenWork and Happy imports, then pilot observe-only mobile
   continuity before remote approvals.
9. Add one Media and one Fediverse flow.
10. Recruit a second institution only after the Algonquin operational evidence is
   reviewable and the core contains no tenant-specific assumptions.
