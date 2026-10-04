# Compute Fabric Implementation Framework Composition Study

> Standard: PSDC-DOC-001
> Document type: architecture-map
> Status: Proposed
> Owner: PSDC Campus Compute Fabric Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-14
> Governing decisions: ADR-0001, ADR-0004, ADR-0005, ADR-0012, ADR-0013, ADR-0016, ADR-0017, ADR-0026, ADR-0030

## Purpose and decision boundary

This study identifies established OSI-approved and free/open-source software that
can supply most of the implementation beneath the PSDC Compute Fabric contracts.
It defines where PSDC should configure an upstream project, write an external
adapter, contribute an upstream extension, maintain a bounded patch, or write
purpose-built code.

This document is a research and composition map. It does not approve an exact
release, import third-party source, authorize production deployment, or replace
the owning Compute Fabric specifications. Every selected release still requires
an immutable version, source checksum, SBOM, transitive-license scan,
vulnerability review, reproducible build evidence, and an upstream-adoption
record.

The target first outcome is intentionally narrow:

> Run an approved OCI batch or inference workload on a suitable institution-
> controlled CPU/GPU node in an allowed locality, meter it, recover safely when
> the node disappears, and produce evidence explaining selection and outcome.

## Research method and evidence status

The review used current official project documentation, official source
repositories, and canonical license material available on 2026-09-14. Project
claims were treated as upstream claims rather than independent performance or
security proof. Popularity, foundation membership, or an OSI-approved license
does not by itself establish fitness for PSDC.

Candidates were evaluated against:

1. OSI-approved license for every required edition and component;
2. self-hosted operation without a mandatory vendor control plane;
3. an API, plugin, controller, runtime, or adapter boundary that avoids a fork;
4. institution-local authority and continued standalone operation;
5. exportable state and documented replacement path;
6. compatibility with versioned PSDC contracts rather than product-private
   objects as the federation boundary;
7. active maintenance, security process, testability, and observable failure
   behavior;
8. reasonable operational complexity for an initial two-to-three-node proof;
9. ability to deny unsafe work before execution; and
10. no requirement for blockchain, tokens, hosted identity, proprietary
    telemetry, or public arbitrary workers.

## License and contribution policy

[ADR-0030](../architecture/architecture-decision-records/ADR-0030-network-copyleft-and-commercial-contribution.md)
resolves the implementation-license direction. PSDC-authored network/control-plane
services target AGPL-3.0-or-later; distributed workers target a compatible reciprocal
license; and contracts, schemas, conformance tools, SDK interface definitions, and
interoperability examples remain Apache-2.0. Imported or derived material retains its
compatible upstream license, notices, provenance, and source-file change notices.

AGPL network reciprocity requires corresponding source where its conditions apply,
but it does not compel submission to PSDC. The upstream-offer mechanism combines
license compliance with governance:

- use Developer Certificate of Origin sign-off for accepted contributions;
- require institution forks to follow an upstream-first contribution workflow;
- use a separate participation agreement for organizations receiving official
  certification, consortium membership, shared release infrastructure,
  trademarks, or paid project support; and
- ask unaffiliated users to contribute generally useful improvements without
  presenting the request as a condition of the public license.

A release must include `LICENSE`, required notices, contribution/DCO instructions,
an SBOM, exact corresponding source/source-offer path, and a third-party license and
provenance inventory. A custom “business use must contribute” restriction must not be
described as open source. Repository migration requires copyright, compatibility,
distribution-channel, and qualified legal review.

## Recommended composition

```text
                         PSDC-OWNED CONTRACTS
     OpenAPI + JSON Schema + CloudEvents + conformance fixtures
                                  │
                                  ▼
                 PSDC COMPUTE CONTROL PLANE (custom)
      request ─ policy ─ resolver ─ lease ─ operation ─ evidence
               │          │          │          │
               │          │          │          └─ OpenTelemetry
               │          │          └──────────── PostgreSQL
               │          └─────────────────────── deterministic code
               └────────────────────────────────── OPA
                                  │
                       versioned executor contract
                                  │
           ┌──────────────────────┼──────────────────────┐
           ▼                      ▼                      ▼
    Direct OCI adapter      HTCondor adapter      Kubernetes adapter
      containerd/runc       campus batch pool       Job + Kueue
           │                      │                      │
           └──────────────────────┼──────────────────────┘
                                  ▼
                    PSDC NODE SUPERVISOR (custom)
        enrollment, heartbeat, inventory, fencing, execution guard
                                  │
              ┌───────────────────┼────────────────────┐
              ▼                   ▼                    ▼
            runc              gVisor/runsc       Kata/isolated VM
      approved low-risk     compatible CPU jobs    stronger boundary
                                  │
                                  ▼
              Harbor/OCI Distribution + Cosign verification
```

The composition deliberately has one authoritative business-state store. OPA,
NATS, Kubernetes, HTCondor, Slurm, an OCI registry, and observability backends
must not become competing authorities for a PSDC request or lease.

## Adoption vocabulary

| Posture | Meaning | Patch burden |
|---|---|---:|
| Adopt | Deploy upstream as designed and configure it | None beyond packaging/configuration |
| Adapt | Write a PSDC-owned adapter against a stable public interface | Bounded to the adapter |
| Extend upstream | Submit a generally useful plugin or feature to upstream | Temporary until accepted |
| Bounded patch | Carry a small, documented patch only when no extension point works | Explicit budget and expiry |
| Fork | Maintain an independent product lineage | Prohibited by default; ADR required |
| Build | Implement a PSDC-specific responsibility no suitable project owns | Full PSDC lifecycle ownership |

`CF-COMP-001`: A selected dependency MUST be integrated through configuration or
a documented public interface before a source fork is considered.

`CF-COMP-002`: A bounded patch MUST identify its upstream issue, exact changed
files, compatibility tests, rebase cost, removal condition, and accountable
owner.

`CF-COMP-003`: Product-native objects MAY be used inside an adapter but MUST NOT
become the institution-neutral PSDC request, lease, evidence, or federation
contract.

`CF-COMP-004`: An adapter MUST translate identity, lifecycle, cancellation,
capacity, status, errors, and evidence in both directions without claiming
semantics the backend cannot enforce.

`CF-COMP-005`: Failure of an optional backend MUST be contained to offerings
served by that backend and MUST NOT corrupt the authoritative PSDC lease ledger.

## Recommended foundation components

| Capability | Recommended project and posture | OSI/FOSS status at review | PSDC boundary | Alternative or exit |
|---|---|---|---|---|
| Control-plane implementation language | Go; build PSDC modules using standard library first | BSD-3-Clause toolchain | PSDC owns domain semantics; language is not a wire contract | Rust for a separately justified memory-safety or device boundary; Python only for adapters where upstream APIs require it |
| Authoritative operational state | PostgreSQL; adopt | PostgreSQL License | PSDC owns schema and migrations; database transaction is authority | Another ACID relational store only after SQL/concurrency conformance proof |
| Policy decision point | Open Policy Agent; embed Go SDK initially or run a local sidecar | Apache-2.0 | PSDC owns policy input/output schemas, policy bundles, deny behavior, and decision evidence | Cedar or a small deterministic evaluator through the same policy contract |
| Human authentication broker | Keycloak; adopt and configure | Apache-2.0 | Institution IdP remains authoritative; Keycloak normalizes OIDC claims | Another standards-conforming institutional OIDC broker |
| Initial node certificates | step-ca or institution PKI adapter | Apache-2.0 for step-ca code reviewed separately at exact release | PSDC enrollment approves a node; CA only issues the credential | Institution CA through adapter |
| Mature workload identity | SPIFFE/SPIRE; defer until automated workload identity or federation | Apache-2.0 | SPIRE issues SVIDs; PSDC decides enrollment, eligibility, trust tier, and lease authority | cert-manager/step-ca certificates with a narrower profile |
| OCI lifecycle | containerd plus runc; adopt | Apache-2.0 | Node supervisor authorizes and supervises execution through containerd; containerd does not schedule PSDC work | CRI-O for Kubernetes-only nodes; Podman for bounded standalone administration |
| Higher-risk CPU sandbox | gVisor/runsc; adapt through OCI runtime selection | Apache-2.0 | Isolation profile selects runtime after compatibility tests | Kata Containers or a dedicated VM |
| Stronger VM-backed isolation | Kata Containers; defer until threat model requires it | Apache-2.0 | Node supervisor selects a tested runtime class; Kata does not own admission | KVM/QEMU dedicated VM |
| OCI registry and promotion | Harbor; adopt | Apache-2.0 | Harbor stores/scans/replicates; PSDC policy decides whether a digest is executable | CNCF Distribution plus separate scanner and authorization |
| Artifact identity | OCI Image/Distribution specifications and immutable digest | Open specification/reference implementations under Apache-2.0 | PSDC binds semantic artifact version to immutable digest and provenance | S3-compatible content-addressed manifest |
| Artifact verification | Cosign/Sigstore plus optional in-toto/TUF metadata | Apache-2.0/BSD-style components; exact dependency scan required | A valid signature proves signer/integrity, not workload safety; PSDC admission still decides | Offline institution PKI signatures through the same verification result contract |
| Telemetry boundary | OpenTelemetry SDK/Collector and OTLP | Apache-2.0 | OTel transports telemetry; PSDC owns semantic attributes, redaction, retention, and evidence records | Prometheus/OpenMetrics exporters for metrics-only fallback |
| Asynchronous transport | NATS JetStream after the transactional outbox is proven | Apache-2.0 | PostgreSQL/outbox remains authority; NATS distributes at-least-once notifications | PostgreSQL outbox polling initially; Pulsar/Kafka later behind CloudEvents |
| Secret storage | OpenBao; adopt when dynamic secrets are needed | MPL-2.0 | Secret references enter workloads; secret values do not enter requests/events | SOPS + age for static GitOps material |
| Infrastructure as code | OpenTofu + Ansible | MPL-2.0 plus GPL-3.0-or-later for Ansible core | Deployment mechanism cannot redefine protocol semantics | Helm/Kustomize and institution automation behind manifests |

### Why Go is the proposed custom-code default

Go minimizes integration impedance with containerd, Kubernetes controller-runtime,
Kueue, OPA's embedded SDK, OpenTelemetry, and CloudEvents. It produces static
binaries suitable for a small node supervisor and supports race detection,
fuzzing, and straightforward cross-compilation. This is an implementation choice,
not a federation contract.

Rust is credible for a future low-level worker or device plugin when memory safety
and fine-grained resource control justify a second language. Introducing both Go
and Rust in the first vertical would increase build, packaging, review, and skills
burden without validating another user requirement.

## Scheduler and resource-manager candidates

### Fit summary

| Candidate | Best fit | Adopt/adapt decision | Do not use it for |
|---|---|---|---|
| HTCondor | Opportunistic campus desktops, high-throughput batch, heterogeneous pools, owner-return/preemption | Preferred first external scheduler adapter | PSDC identity, policy authority, federation contract, or canonical data model |
| Kubernetes scheduler | Pod-to-node placement in managed Kubernetes clusters | Adopt inside Kubernetes backend | Scheduling non-Kubernetes workers or defining PSDC resource semantics |
| Kueue | Job admission, quotas, fair sharing, flavors, preemption, and multi-cluster dispatch within Kubernetes estates | Preferred Kubernetes batch admission adapter | Institution-neutral federation or direct desktop worker enrollment |
| Volcano | Gang scheduling, MPI/training, DRF, backfill, topology-aware AI/HPC on Kubernetes | Conditional alternative when measured workloads exceed Kueue/native Job capabilities | First two-to-three-node batch proof |
| Slurm | Existing institutional HPC clusters, parallel jobs, reservations, accounting | Adapter to an existing Slurm authority | Internet-facing API, desktop scavenging, or PSDC federation authority |
| Karmada | Institution-internal multi-cluster Kubernetes application propagation | Research/conditional adapter | Cross-institution sovereignty protocol or a shared super-control-plane |
| Ray | Distributed Python execution inside an already admitted allocation | Workload/runtime adapter only when measured | Global resource authority or baseline dependency |
| Dask | Python analytics workloads inside an admitted allocation | Alternative workload adapter | Global resource authority |
| BOINC | Public volunteer computing with redundant result validation | Research-only future adapter | Trusted campus MVP or sensitive workloads |
| Temporal Community | Human/service workflow orchestration | Use outside the lease-critical path if a future workflow needs it | Authoritative resource allocation or fencing |

### HTCondor

HTCondor's ClassAds already model bilateral requirements and rankings for jobs and
machines, and its claims, job lifecycle, eviction, hold, removal, draining, event
logs, hooks, and Python bindings cover much of opportunistic campus batch
operation. The project is Apache-2.0 and publishes binaries for Linux, Windows,
and macOS. It is the strongest fit for reclaiming managed lab machines without
making every machine a Kubernetes node.

PSDC should not fork the negotiator for the initial integration. The adapter
should:

1. translate an eligible PSDC workload into a constrained HTCondor submit object;
2. map PSDC capability and offering fields to namespaced ClassAd attributes;
3. write the PSDC request, workload, lease, policy, and artifact identifiers into
   immutable or administrator-controlled job attributes;
4. observe job events and translate them into PSDC lifecycle transitions;
5. map cancel, hold, release, eviction, and completion without inventing
   unsupported atomicity;
6. reconcile HTCondor jobs after adapter restart;
7. treat the HTCondor claim as backend state while the PSDC lease ledger remains
   the institution-facing authority; and
8. refuse submission when the backend cannot meet the required sandbox,
   locality, network, or artifact-verification profile.

A future upstream contribution may add generic namespaced metadata or evidence
hooks. A private negotiator fork is not justified while ClassAds, transforms,
hooks, and bindings remain sufficient.

### Kubernetes and Kueue

Kubernetes already supplies node registration, Pod reconciliation, resource
requests, device plugins/Dynamic Resource Allocation, RuntimeClass, network
policy, secrets, and a scheduler whose stable plugin model explicitly separates
filtering, scoring, reserve/unreserve, permit, and binding phases. Kueue adds
job-level admission, quota, resource flavors, cohorts, fair sharing, admission
checks, preemption, topology awareness, and external custom-job integrations.

The Kubernetes adapter should be external to the PSDC control-plane core:

```text
PSDC Workload + Lease
        │
        ▼
Kubernetes executor adapter
        │ creates suspended job with PSDC labels/annotations
        ▼
Kueue admission / optional PSDC AdmissionCheck controller
        │
        ▼
kube-scheduler filtering, scoring, reserve and bind
        │
        ▼
Pod status/events → adapter reconciliation → PSDC Outcome/Evidence
```

Use a normal Kubernetes `Job` before inventing a PSDC custom resource. If Kueue
needs richer semantics, prefer an external integration or AdmissionCheck
controller. A new CRD is justified only when an owning state machine cannot be
represented safely through a Job plus versioned metadata.

MultiKueue and Karmada may help one institution operate several Kubernetes
clusters. They must not become the PSDC inter-institution federation protocol:
their control assumptions and Kubernetes-native objects do not establish
institutional policy, selective disclosure, independent identity authority, or
clean federation exit.

### Volcano

Volcano is an Apache-2.0 Kubernetes-native batch system with configurable actions
and plugins for enqueue, allocation, preemption, reclaim, backfill, gang
scheduling, dominant-resource fairness, queues, topology, and AI/HPC frameworks.
It is a better fit than Kueue when a measured workload requires multi-pod gang
semantics, MPI-oriented lifecycle, or scheduler-level backfill.

Do not install both Kueue and Volcano merely for optionality. Select Volcano only
after a compatibility spike shows the required workload semantics and documents
which component owns queue admission, quota reservation, Pod placement,
preemption, and status. Alpha features and plugin combinations require explicit
failure testing; upstream documentation notes configuration interactions and
reservation limitations that cannot be hidden by the adapter.

### Slurm

Slurm is GPL-licensed FOSS and the natural adapter for an institution that
already operates an HPC cluster. Its plugins, resource allocation, job lifecycle,
reservations, accounting, federation experience, and `slurmrestd` API are useful
prior art.

The PSDC adapter must place `slurmrestd` behind an authenticated TLS proxy on a
trusted network. Upstream documentation states that the REST daemon itself uses
unencrypted HTTP and is not intended to be directly Internet-facing. The adapter
must pin an OpenAPI version, rate-limit polling, map version changes explicitly,
and never proxy arbitrary Slurm administrator operations.

Slurm federation is valuable prior art but not the PSDC federation contract. It
replicates sibling jobs among Slurm clusters and has origin-cluster coordination
and topology assumptions that do not cover heterogeneous non-Slurm providers or
PSDC institutional disclosure policy.

## Policy, identity, and trust composition

### Human access

Keycloak should broker the institution's OIDC issuer for development and common
claims. In production the institution's approved identity provider remains the
authority. PSDC code validates issuer, audience, signature, expiry, nonce where
applicable, subject, tenant/institution context, and scopes; it does not store
passwords or reproduce an identity provider.

### Authorization

OPA should evaluate versioned PSDC policy inputs. PSDC must still implement:

- construction and validation of the policy input document;
- fail-closed timeout and unavailable behavior;
- distinction between request authorization, candidate eligibility, and runtime
  enforcement;
- signed/versioned policy-bundle promotion;
- redaction of policy decision logs;
- persistence of policy revision and decision identifier with the lease; and
- deterministic hard filters that remain enforceable even if OPA is unavailable.

OPA provides evaluation, bundles, health/status, and decision logging. It does
not provide a complete policy control plane, institutional governance, or truth
about input data.

### Node and workload identity

The initial closed pool can use one-time enrollment tokens followed by short-
lived mTLS node certificates from step-ca or an institution CA. SPIRE becomes
appropriate when automatic node/workload attestation, per-workload identities,
or cross-trust-domain federation is required.

SPIRE plugins can attest nodes and workloads and issue SVIDs, but PSDC must define
who may enroll, which selectors are trusted, certificate-to-node binding, expiry,
revocation, quarantine, and what an identity is authorized to do. The SPIRE
Delegated Identity API creates an impersonation-capable trusted delegate and must
not be enabled without a separate threat decision.

## Execution and sandbox composition

The first implementation should support explicit isolation profiles rather than
claiming every OCI workload is equally safe.

| Profile | Candidate runtime | Intended workloads | Required restrictions |
|---|---|---|---|
| `approved-standard` | containerd + runc | Institution-built or explicitly approved OCI jobs | non-root user, dropped capabilities, seccomp, AppArmor/SELinux where available, cgroup limits, read-only root, bounded writable volumes, deny-by-default network |
| `isolated-cpu` | containerd + gVisor/runsc | Compatible higher-risk CPU jobs | separate sandbox per trust boundary, compatibility test, no unsupported syscall assumption, explicit filesystem/network profile |
| `isolated-vm` | Kata or dedicated KVM/QEMU VM | Workloads requiring a VM boundary | measured startup/capacity overhead, image provenance, device policy, dedicated secret channel |
| `gpu-dedicated` | runc or tested VM runtime on a dedicated/drained GPU node | Approved GPU inference/batch | no untrusted co-tenancy, device allowlist, driver/runtime compatibility, reset/health test after workload |

gVisor reduces direct host-kernel exposure but does not protect against control-
plane/runtime compromise, workload-internal compromise, or CPU side channels.
GPU and specialized device compatibility must be tested rather than inferred.

The baseline cannot truthfully promise an entirely FOSS GPU stack for every
device. NVIDIA CUDA user-space dependencies are not an OSI-open foundation even
where portions of the kernel module are open. AMD ROCm and open drivers may
provide a more open path for supported hardware, but each accelerator profile
requires an exact driver/runtime/license record. GPU support is therefore a
capability-specific exception gate, never evidence that the whole stack is FOSS.

## Artifact and supply-chain composition

Harbor should own registry storage, repository access, replication, vulnerability
scan integration, garbage collection, and registry audit. PSDC should own the
admission record that says whether an immutable artifact digest is approved for
a workload class.

```text
source commit
   → reproducible build
   → SBOM and provenance
   → OCI digest
   → vulnerability/license policy
   → signature verification
   → PSDC ArtifactApproval
   → workload request by digest
   → node re-verifies digest and approval before execution
```

A Cosign-valid signature means that a configured identity or key signed a given
artifact. It does not prove that the artifact is non-malicious, licensed for the
workload, compatible with the sandbox, or authorized for the requester. Those
are separate PSDC admission decisions.

## Observability and evidence composition

OpenTelemetry and OTLP should carry traces, metrics, and logs through replaceable
collectors. Prometheus-compatible metrics may be exported for operations. The
following are PSDC-owned evidence, not merely telemetry:

- accepted request and canonical request hash;
- identity and authorization context references;
- policy revision and decision identifier;
- eligible and rejected candidate reason codes;
- scoring inputs, normalized scores, tie-break key, and candidate snapshot;
- lease identifier, fencing generation, acquisition/renewal/release transitions;
- artifact digest and verification result;
- backend execution identifier;
- metering interval and units;
- terminal outcome and reason;
- redaction and retention classification; and
- correlation and causation identifiers.

Telemetry loss must not roll back a valid lease transition. Evidence writes
required for authorization or settlement must participate in the authoritative
transaction or fail the operation closed according to its specification.

## Components deliberately not selected for the baseline

| Component or pattern | Disposition | Reason |
|---|---|---|
| HashiCorp Nomad current releases | Exclude from required path | Current upstream license is not an OSI-approved baseline; avoid license-dependent core |
| Terraform current releases | Compatibility adapter only | OpenTofu is the OSI/FOSS default |
| Docker Desktop | Exclude from required path | Not required for OCI execution and introduces proprietary desktop terms |
| Current Open WebUI releases with branding restrictions | Exclude from Compute Fabric foundation | Client UI is not a scheduler; required edition must remain OSI-approved |
| Kubernetes as the federation protocol | Reject | Kubernetes object/control assumptions do not encode institution sovereignty |
| Karmada shared across institutions | Reject as common control plane | Central multi-cluster management conflicts independent authority and exit |
| IPFS as mandatory artifact transport | Reject | Content addressing is useful; one peer network is not required |
| Blockchain/token/auction scheduler | Reject | No baseline requirement and materially increases correctness/governance burden |
| Graph database as authority | Reject | Operational invariants require one transactional authority; graphs can be projections |
| Temporal for leases | Reject for critical allocation | Lease atomicity and fencing belong with authoritative resource state |
| Multiple schedulers installed by default | Reject | Each backend adds divergent lifecycle and failure semantics |
| Private HTCondor, Kubernetes, Slurm, or Volcano fork | Reject by default | Stable APIs/plugins/adapters exist; a fork would dominate maintenance capacity |

## Patch and fork governance

The preferred contribution sequence is:

```text
configure upstream
    → external adapter/plugin
    → reproduce missing behavior in an upstream issue
    → contribute generic change upstream
    → carry a bounded patch while review proceeds
    → remove patch after upstream release
```

A fork requires all of the following:

1. the required behavior is normative and cannot be provided outside upstream;
2. the upstream project has rejected or cannot accept a general solution;
3. the changed surface is bounded and has automated compatibility tests;
4. an owner and review capacity exist for security updates and rebases;
5. a patch budget states maximum changed files/lines and maximum supported
   upstream divergence;
6. release, signing, provenance, CVE response, and upgrade procedures exist;
7. the fork has a sunset, rejoin, or replacement condition; and
8. an ADR accepts the ongoing cost.

Branding, defaults, policy bundles, deployment charts, adapters, and UI shells
should remain outside upstream source whenever possible. This makes white-
labeling an overlay rather than a permanent fork.

## Replacement and exit matrix

| Selected component | Portable boundary | State that must export | Replacement proof |
|---|---|---|---|
| PostgreSQL | SQL migrations plus domain repository interface | all authoritative domain tables and outbox offsets | restore into supported alternative and pass transaction/lease tests |
| OPA | versioned policy input/output and decision reason schema | policy bundles, revisions, test fixtures | alternate evaluator passes the same allow/deny/reason corpus |
| Keycloak | OIDC/OAuth claims profile | realm/client configuration and non-authoritative local mappings | alternate issuer passes authentication/claim conformance tests |
| step-ca/SPIRE | mTLS/SPIFFE identity profile | trust bundles, registration intent, revocation state as legally/exportably possible | re-enroll test nodes without changing PSDC resource identity |
| containerd/runc | OCI image/runtime specs plus executor contract | no authoritative PSDC state | same workload suite runs through alternative runtime adapter |
| Harbor | OCI Distribution API and content digests | artifacts, manifests, signatures, policies, audit exports | replicate to clean registry and resolve every approved digest |
| NATS JetStream | CloudEvents/AsyncAPI plus outbox cursor | replayable unpublished outbox and consumer checkpoints | replace broker without losing or duplicating semantic effects |
| OpenTelemetry | OTLP and PSDC semantic conventions | collector configuration and retained telemetry per policy | route to alternative backends with required attributes intact |
| HTCondor | PSDC executor adapter | backend IDs, mapping ledger, terminal events | drain adapter, reconcile every active job, then resubmit eligible work elsewhere |
| Kubernetes/Kueue | PSDC executor adapter plus OCI | backend IDs, manifests, mapping ledger | drain workloads and execute the conformance workload on another backend |
| Slurm | PSDC executor adapter | backend job IDs and accounting/evidence exports | preserve terminal outcomes while disabling new offerings |

## What must remain custom

No reviewed upstream project simultaneously provides institution-neutral
capability semantics, PSDC policy context, deterministic cross-backend resolution,
fenced leases, evidence, and institution-sovereign federation. The following
must therefore be PSDC-owned:

1. canonical contract schemas and compatibility rules;
2. resource/capability/implementation/offering normalization;
3. request validation and idempotency;
4. policy-input construction and stable decision reasons;
5. deterministic cross-backend resolver and decision trace;
6. authoritative capacity ledger, leases, renewals, revocation, and fencing;
7. workload/operation state machine and reconciliation;
8. backend executor service-provider interface;
9. node enrollment and local execution supervisor glue not supplied by a
   selected backend;
10. artifact approval binding and execution-time re-verification;
11. usage normalization and evidence chain;
12. operator API and CLI behavior;
13. contract, failure, race, security, and backend conformance suite; and
14. later federation offering/request/evidence exchange.

The granular component design and binary acceptance criteria are defined in
[Custom Control Plane and Worker Scope](Custom-Control-Plane-and-Worker-Scope.md).

## Implementation sequence

| Phase | Reused foundation | PSDC-owned deliverable | Exit evidence |
|---|---|---|---|
| 0 — Contracts | OpenAPI, JSON Schema, OCI, CloudEvents | schemas, state machines, reason catalog, threat model, fixtures | schemas validate; compatibility and negative fixtures pass |
| 1 — One node | PostgreSQL, OPA, containerd/runc, Harbor, OTel | modular control plane, node supervisor, CLI, direct OCI adapter | complete request-to-outcome loop and forced-failure evidence |
| 2 — Three-node pool | same foundation | deterministic resolver, fenced leases, capacity ledger, drain/recovery | no double allocation; node loss and stale holder tests pass |
| 3 — Campus batch | HTCondor | external HTCondor adapter and mapping/reconciliation ledger | owner-return, cancel, eviction, restart, and evidence tests pass |
| 4 — Kubernetes batch | Kubernetes + Kueue | Kubernetes executor adapter; optional external AdmissionCheck | quota/admission/preemption and status translation tests pass |
| 5 — Existing HPC | Slurm where institution already operates it | guarded `slurmrestd` adapter | proxy security and lifecycle mapping tests pass |
| 6 — Second institution | SPIFFE/SPIRE or accepted alternative | minimal federated offering/request/evidence protocol | independent operation, denial, timeout, revocation, and exit tests pass |
| 7 — Advanced workloads | Volcano, Ray, Kata, specialized runtimes as measured | additional adapters only | workload-specific performance/security evidence passes |

## Risks and mitigations

| Risk | Consequence | Mitigation and stop condition |
|---|---|---|
| Framework collage without a clear authority | contradictory state and impossible recovery | PostgreSQL is sole PSDC business-state authority; adapters reconcile external state |
| Upstream object leakage | federation becomes tied to Kubernetes/HTCondor/Slurm | schema translation tests reject product-private required fields |
| Too many initial components | club cannot operate or secure the system | Phase 1 excludes NATS, SPIRE, Kubernetes, HTCondor, Slurm, and federation unless required by the proof |
| Policy engine treated as policy authority | unsafe input or stale bundle produces incorrect permission | PSDC owns policy lifecycle, input validation, fail-closed behavior, and revision evidence |
| Scheduler atomicity assumed | double allocation or stale work | lease transaction and fencing tests remain PSDC-owned |
| Sandbox overclaim | host or data compromise | isolation profiles, compatibility corpus, dedicated GPU policy, and threat-specific tests |
| License drift | required component ceases to be OSI/FOSS | exact-release gate, automated license inventory, frozen fallback, and replacement test |
| Fork accumulation | unmaintainable security and upgrade burden | zero-fork default, bounded patch register, upstream-first rule, ADR gate |
| Federation framework centralizes institutions | loss of sovereignty and independent operation | federation uses PSDC contracts; multi-cluster tools remain institution-local adapters |
| Hardware vendor dependency | “open stack” claim becomes false | capability-specific exception register and open alternative assessment |

## Acceptance criteria for this composition study

- **CF-COMP-AC-001:** A reviewer can assign every first-vertical responsibility
  to exactly one PSDC component or external project; an unowned or multiply
  authoritative responsibility fails the review.
- **CF-COMP-AC-002:** Every required external project has an OSI-approved license
  for the selected release and an archived license/SBOM report; uncertainty or a
  source-available-only component fails admission.
- **CF-COMP-AC-003:** Every project-specific object is contained behind an
  adapter or implementation binding; a Kubernetes, HTCondor, Slurm, or vendor
  field required by the common contract fails portability review.
- **CF-COMP-AC-004:** A clean installation can run the first vertical without
  Kubernetes, HTCondor, Slurm, Karmada, BOINC, Temporal, a graph database,
  blockchain, or a proprietary hosted service.
- **CF-COMP-AC-005:** Removing an optional scheduler prevents only its offerings
  from accepting new work; authoritative requests, leases, outcomes, and audit
  evidence remain readable.
- **CF-COMP-AC-006:** The artifact registry can be replaced by replicating every
  approved digest and passing integrity and authorization fixtures.
- **CF-COMP-AC-007:** The policy engine can be unavailable without producing an
  allow decision; the observed result is a stable fail-closed reason and audit
  record.
- **CF-COMP-AC-008:** No maintained source fork exists without an accepted ADR,
  upstream issue, patch budget, compatibility suite, owner, and removal plan.
- **CF-COMP-AC-009:** GPU capability documentation identifies proprietary
  driver/runtime exceptions rather than claiming blanket FOSS compliance.
- **CF-COMP-AC-010:** Every release conforms to ADR-0030 by carrying `LICENSE`,
  required notices, contribution/DCO instructions, an SBOM, exact source/source-offer
  artifacts, and a third-party license inventory, while keeping participation-agreement
  upstream-offer duties distinct from public-license obligations.

## Source of truth, staleness, and contradiction handling

This study becomes stale when an upstream license, governance model, extension
interface, security posture, or PSDC owning specification changes. Before source
import or deployment, the implementer must create a release-specific adoption
record and re-verify primary sources.

Accepted ADRs and owning specifications override this map. A contradiction must
not be resolved silently: record the affected requirement, candidate behavior,
security/portability impact, and proposed ADR.

## Official references reviewed

- [OSI Open Source Definition](https://opensource.org/osd)
- [OSI approved licenses](https://opensource.org/licenses)
- [Apache License 2.0](https://opensource.org/license/apache-2.0)
- [Mozilla Public License 2.0](https://opensource.org/license/mpl-2.0)
- [GNU Affero GPL rationale](https://www.gnu.org/licenses/agpl.en.html)
- [HTCondor source and Apache-2.0 license](https://github.com/htcondor/htcondor)
- [HTCondor matchmaking with ClassAds](https://htcondor.readthedocs.io/en/lts/users-manual/matchmaking-with-classads.html)
- [HTCondor Python submission and management API](https://htcondor.readthedocs.io/en/25.x/apis/python-bindings/tutorials/Submitting-and-Managing-Jobs.html)
- [HTCondor hooks](https://htcondor.readthedocs.io/en/main/admin-manual/configuration/hooks.html)
- [Kubernetes scheduling framework](https://kubernetes.io/docs/concepts/scheduling-eviction/scheduling-framework/)
- [Kueue overview](https://kueue.sigs.k8s.io/docs/overview/)
- [Kueue external custom-job integration](https://kueue.sigs.k8s.io/docs/tasks/dev/integrate_a_custom_job/)
- [Volcano scheduler and plugin architecture](https://volcano.sh/docs/scheduler/overview/)
- [Volcano source and Apache-2.0 license](https://github.com/volcano-sh/volcano)
- [Slurm REST API security and versioned interfaces](https://slurm.schedmd.com/rest.html)
- [Slurm plugin model](https://slurm.schedmd.com/programmer_guide.html)
- [Slurm source and GPL license](https://github.com/SchedMD/slurm)
- [Slurm federation behavior](https://slurm.schedmd.com/federation.html)
- [Karmada source, purpose, and Apache-2.0 license](https://github.com/karmada-io/karmada)
- [containerd source and Apache-2.0 license](https://github.com/containerd/containerd)
- [containerd 2.x architecture documentation](https://containerd.io/docs/2.1/containerd-2.0/)
- [gVisor security architecture](https://gvisor.dev/docs/architecture_guide/intro/)
- [Kata Containers source and Apache-2.0 license](https://github.com/kata-containers/kata-containers)
- [OPA integration interfaces](https://www.openpolicyagent.org/docs/integration)
- [OPA bundles and signature verification](https://www.openpolicyagent.org/docs/management-bundles)
- [OPA decision logs and redaction](https://www.openpolicyagent.org/docs/management-decision-logs)
- [SPIRE concepts and plugin boundaries](https://spiffe.io/docs/latest/spire-about/spire-concepts/)
- [SPIRE extension model](https://spiffe.io/docs/latest/planning/extending/)
- [SPIRE agent API trust cautions](https://spiffe.io/docs/latest/deploying/spire_agent/)
- [Keycloak source and Apache-2.0 license](https://github.com/keycloak/keycloak)
- [Harbor source, capabilities, and Apache-2.0 license](https://github.com/goharbor/harbor)
- [Cosign source](https://github.com/sigstore/cosign)
- [OCI Distribution Specification](https://github.com/opencontainers/distribution-spec)
- [OpenTelemetry components](https://opentelemetry.io/docs/concepts/components/)
- [OTLP specification](https://opentelemetry.io/docs/specs/otlp/)
- [NATS server source and Apache-2.0 license](https://github.com/nats-io/nats-server)

## Related PSDC authorities

- [Compute Fabric Architecture](Campus-Compute-Fabric-Architecture.md)
- [Source Decision Import — Compute Fabric](../architecture/Source-Decision-Import-2026-09-12-Compute-Fabric.md)
- [Technology Defaults and Alternatives](../vision/13-Technology-Defaults-and-Alternatives.md)
- [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md)
- [Custom Control Plane and Worker Scope](Custom-Control-Plane-and-Worker-Scope.md)
