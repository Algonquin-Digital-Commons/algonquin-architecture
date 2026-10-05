# Technology Defaults and Alternatives


> Standard: PSDC-DOC-001
> Document type: policy-standard
> Status: Normative
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: ADR-0008, ADR-0009, ADR-0016, ADR-0017, ADR-0018, ADR-0019, ADR-0026, ADR-0027, ADR-0028, ADR-0029, ADR-0030, ADR-0031

> Date: 2026-09-10

This matrix turns the architecture's earlier candidate lists into an explicit
default stack. Alternatives remain supported evaluation or exit paths; they are
not additional products to deploy automatically.

For a single inventory including project-level open-source status and license
families, see [Full Technology Stack and Open-Source Alternatives](14-Full-Technology-Stack-and-Open-Source-Alternatives.md).

## Selection rules

1. Self-host the core and keep data, identity, policy, state, and telemetry under
   institution/consortium control.
2. Require an OSI-approved license for the required edition; there is no standing
   source-available exception.
3. Treat protocols and data formats as the durable boundary; projects are
   replaceable implementations.
4. Pin exact releases, produce an SBOM, scan licenses and vulnerabilities, test
   backup/restore, and record an owner before production.
5. Do not add every alternative. Adopt the default until evidence justifies a
   recorded change.

## Reconciliation of earlier defaults with accepted fabric decisions

The earlier stack treated products as mostly independent defaults. ADR-0026 through
ADR-0029 add a common sovereign authority, market, evidence and storage-tier plane. The
product remains the execution mechanism; PSDC contracts now decide whether, where and under
what lease it may be used.

| Earlier default or ambiguity | Reconciled decision | Resulting implementation rule |
|---|---|---|
| Kubernetes-first could be read as “send everything to Kubernetes” | Kubernetes is the default long-running container backend, not the universal scheduler | classifier chooses Kubernetes, OpenStack, Slurm, task fabric or a hybrid graph before provider auction |
| HTCondor listed as campus batch default | Golem-derived task fabric is primary for new opportunistic/DAG/parameter-sweep work; HTCondor is an interoperability/migration adapter | both emit PSDC leases, receipts and evidence |
| Slurm appeared as an alternative batch scheduler | Slurm is the required default for tightly coupled MPI/HPC when that class is adopted | PSDC selects an eligible Slurm partition; Slurm retains native gang/backfill scheduling |
| OpenStack was optional VM infrastructure | OpenStack is the default VM backend when the workload actually requires VM semantics | Nova/Neutron/Cinder remain behind PSDC provider, network, storage, lease and receipt contracts |
| Ceph was called “primary storage” for all storage | the six-tier semantic fabric is primary; Ceph is one replaceable Tier 1/3 physical backend | tier, manifest, key, custody, repair and deletion semantics live above Ceph |
| content addressing was an artifact feature | private Kubo/IPFS-compatible Tier 2 is an internal immutable distribution fabric | no public DHT by default; CID never grants authorization |
| ledger and tokenization were unspecified | non-transferable Institutional Resource Units, placement tokens, leases and receipts cover compute/storage/network | PostgreSQL holds live state; Cosmos-derived ledger records periodic commitments and settlement |
| dynamic placement excluded critical services | critical services may be dynamically placed only inside a certified, reserved, failure-domain-safe production pool | price optimizes safe choices and cannot widen eligibility |
| institutional identity was the only practical login | W3C DID/VC portability is standard alongside local institutional identity | credentials prove claims; each institution still performs local authorization |
| generic open-source policy did not define reciprocal boundaries | AGPL target for PSDC network services, reciprocal worker/client decisions, Apache-2.0 interoperability contracts, and exact upstream license boundaries | every repository has an explicit license/provenance record; recognized participants separately offer reusable improvements upstream |

## Infrastructure and delivery

| Capability | Accepted default | Alternatives / exit path | Selection note |
|---|---|---|---|
| Server OS | Debian Stable | Ubuntu Server LTS; Rocky Linux; AlmaLinux | Choose one supported image family per environment |
| Virtualization | KVM + QEMU + libvirt | Proxmox VE; OpenNebula | Standard Linux virtualization, no proprietary hypervisor dependency |
| Container standard/runtime | OCI + containerd | CRI-O | Docker-compatible artifacts are acceptable; Docker Desktop is not required |
| Cluster orchestration | Kubernetes (open-source upstream) | OKD for an integrated open platform; systemd/Podman for very small edge nodes | Kubernetes is the shared production control API; alternatives require an adapter to the PSDC workload, lease, evidence and metering contracts |
| Kubernetes distribution | RKE2 for managed production; K3s for edge/dev | kubeadm; Talos Linux | No hosted control plane requirement |
| Private cloud | Kubernetes first; selected OpenStack services for VM/bare metal | Apache CloudStack; OpenNebula; Proxmox VE | Add OpenStack only when workload evidence requires it; every VM backend emits common PSDC usage receipts |
| Bare-metal lifecycle | OpenStack Ironic | Metal3 | Keep hardware inventory and enrollment contracts implementation-neutral |
| CNI/network policy | Cilium | Calico | Decide dataplane mode from campus network testing |
| Load balancer | MetalLB | PureLB | Integrate hardware appliances only behind standard Kubernetes APIs |
| API gateway/ingress | Envoy Gateway | Traefik; ingress-nginx | Envoy Gateway is the common north-south baseline |
| Service mesh | None initially; Cilium capabilities first | Linkerd; Istio after measured need | Avoid a second networking control plane by default |
| Storage semantic architecture | PSDC six-tier storage fabric | A simpler Tier 0/1-only profile for small pilots | Tier policy, object manifest, keys, placement/custody, lifecycle and receipts are authoritative |
| Tier 1/3 physical storage | Ceph RBD + CephFS + Ceph RGW where operational capacity supports it | Garage or SeaweedFS for focused object use; Longhorn for small block clusters | Avoid double erasure coding; S3/block/file providers remain replaceable |
| Tier 2 content distribution | Private Kubo-compatible nodes + IPFS Cluster | OCI registry/object-cache distribution where CID/IPLD is unnecessary | No public DHT by default; content addressing is not authorization |
| Infrastructure as code | OpenTofu + Ansible | Terraform only as a bounded compatibility option | OpenTofu is MPL-2.0; no hosted control plane dependency |
| IaC state | Institution-controlled encrypted backend with locking and recovery tests | Small local state only for disposable dev | Never store production state in Git |
| GitOps | Argo CD | Flux | Use pull-based promotion and signed artifacts |
| Git forge | Forgejo | GitLab Community Edition after open-feature review | Self-hosted accounts, repositories and reviews |
| CI | Woodpecker CI for the first vertical slice | Tekton for Kubernetes-native pipelines | Self-hosted runners; no GitHub Actions dependency |
| OCI registry | Harbor | CNCF Distribution registry | Scan, sign, retain and replicate images |
| Backup | Velero + restic plus database-native tools | Kopia; BorgBackup for host/file use | Recovery tests are required, not only backup jobs |

## Identity, security, policy, and integration

| Capability | Accepted default | Alternatives / exit path | Selection note |
|---|---|---|---|
| Identity broker | Keycloak | ZITADEL self-hosted; Kanidm for narrower deployments | College IdP remains authoritative in institutional production |
| Institutional upstream | College-approved OIDC/OAuth, currently Entra | Another College-approved standards-based IdP | Provider-specific claims terminate at the adapter |
| Development identity | Synthetic Keycloak realm | Deterministic test adapter | Never becomes a student production directory |
| Authorization/policy | Open Policy Agent | Cedar; Kyverno for Kubernetes admission policy | Policy decisions remain external to application business logic |
| Secrets | OpenBao | SOPS + age for static GitOps secrets | No proprietary Vault or hosted secrets dependency |
| PKI | step-ca + cert-manager | Institution PKI through an adapter | Automate issuance, rotation and revocation |
| Workload identity | SPIFFE/SPIRE profile | cert-manager-issued workload certificates | Required before cross-institution workload trust |
| Event/request messaging | NATS JetStream | Apache Pulsar; Apache Kafka | CloudEvents envelope and AsyncAPI contract remain stable |
| Durable workflows | Temporal Community | Argo Workflows for Kubernetes batch workflows | Choose by human/action workflow versus batch semantics |
| Synchronous APIs | REST + OpenAPI | gRPC/Protobuf for justified internal hot paths | Public APIs remain HTTP/standards friendly |
| Events | CloudEvents + AsyncAPI | Protocol-specific adapters | At-least-once and idempotent by default |
| Schemas | JSON Schema; Protobuf where gRPC is approved | Avro for evidence-based streaming needs | Shared schema registry owns compatibility |
| Supply-chain metadata | SPDX or CycloneDX SBOM + Sigstore/Cosign | in-toto attestations | Generate and verify on every release |

## Data and observability

| Capability | Accepted default | Alternatives / exit path | Selection note |
|---|---|---|---|
| Relational database | PostgreSQL | MariaDB; YugabyteDB after distributed-SQL evidence | Service-owned schemas; no cross-service reads |
| Vector retrieval | pgvector first | Qdrant; Milvus | Add a separate vector engine only after measured need |
| Cache/coordination | Valkey | PostgreSQL/advisory locks when a separate cache is unnecessary | Avoid proprietary Redis modules |
| Search | PostgreSQL search first, then OpenSearch | Meilisearch; Typesense | Do not operate a search cluster before requirements justify it |
| Object storage API | S3-compatible Ceph RGW | Garage; SeaweedFS | Content-addressed manifests and checksums above the provider |
| Geospatial data | PostGIS + GeoJSON/OGC APIs | GeoServer; MapServer | Precision, provenance, CRS and privacy are mandatory metadata |
| Telemetry boundary | OpenTelemetry SDKs/Collector + OTLP | None; this is the portability contract | Applications never emit only vendor-native telemetry |
| Metrics | Prometheus | VictoriaMetrics after scale review | OpenMetrics-compatible exposition |
| Dashboards | Grafana OSS | Perses | Store dashboards as versioned code |
| Logs | Loki | OpenSearch | Structured logs with classification and redaction |
| Traces | Tempo | Jaeger | OpenTelemetry context propagation end to end |
| Scheduler operational state | PostgreSQL transactional state + outbox; NATS JetStream events; Valkey only as cache | another open transactional database after conformance ADR | The scheduler hot path never depends on ledger finality |
| Commitment and settlement ledger | Bounded Cosmos SDK/CometBFT-derived internal ledger using ADR-0031 deterministic batches | signed append-only transparency log plus periodic settlement exports | Store commitments, governance and settlement—not content, keys, heartbeats or live queues; PostgreSQL/outbox owns live operations |

## AI, agents, and compute

| Capability | Accepted default | Alternatives / exit path | Selection note |
|---|---|---|---|
| AI gateway MVP | Python + FastAPI | Go for measured data-plane pressure; another open framework through ADR | Gateway owns policy, routing, normalization and audit |
| Client compatibility | Documented OpenAI-compatible subset + native Commons APIs | Additional protocol adapters | Compatibility is a boundary, not an OpenAI service dependency |
| Production LLM serving | vLLM | SGLang | Runtime adapters expose capability/health/usage consistently |
| Local/edge inference | llama.cpp | Ollama for development convenience | llama.cpp is the durable low-level adapter target |
| Embeddings/reranking | Gateway-managed open model adapters | Text Embeddings Inference; llama.cpp-supported models | Model and license are approved separately |
| RAG | PostgreSQL + pgvector | Qdrant or Milvus after evidence | Authorized sources and user-visible provenance |
| Model metadata/tracking | Content-addressed manifests + MLflow | Kubeflow components after need | Weights remain outside Git |
| Cross-backend resolver | PSDC policy-gated multi-attribute reverse auction and placement service | deterministic static placement if market service is unavailable | Hard policy filters precede cost/performance ranking |
| Opportunistic/DAG task scheduling | Golem-derived sovereign task fabric | HTCondor interoperability; Kubernetes Jobs/Argo for suitable bounded jobs | Task workers are preemptible and emit common leases/receipts |
| Long-running container services | Kubernetes | Akash-derived provider/lease mechanics choose among eligible Kubernetes providers | Kubernetes retains pod/service reconciliation inside the selected cluster |
| VM scheduling | OpenStack | Apache CloudStack; OpenNebula; Proxmox adapter after evidence | PSDC selects cloud/aggregate; Nova placement selects host |
| Tightly coupled HPC | Slurm | another HPC scheduler only through conformance ADR | Slurm retains gang, topology, reservation and backfill semantics |
| Service-provider market | Akash-derived sovereign offer/reverse-auction/lease mechanisms | clean PSDC implementation of the same open contracts | No public Akash or public token dependency |
| Distributed Python | Ray only when measured | Dask | Never a baseline dependency for simple inference |
| Workload isolation | OCI/containerd; gVisor for higher-risk compatible jobs | Kata Containers; dedicated VM | Isolation follows trust and data class |
| Agent workflows | Temporal-backed deterministic action services | Plain service workflow for simple cases | Models propose; deterministic services authorize and execute |
| Tool protocol | Versioned JSON/OpenAPI tool contracts | MCP adapter after threat and compatibility review | Tools require owner, scope, risk and confirmation tier |

## Applications, media, spatial, and federation

| Capability | Accepted default | Alternatives / exit path | Selection note |
|---|---|---|---|
| Web client | Independent `psdc-web` browser/PWA product using the verified Open WebUI v0.6.5 BSD source only if its provenance gate passes | LibreChat after exact-release review; clean native client | Ownership under ADR-0025; frozen eligible source boundary under ADR-0009, never current Open WebUI by default |
| Native web evolution | Svelte/SvelteKit-compatible path | React; Vue | Minimize scaffold rewrite while native modules grow |
| Coding client | OpenCode thin integration | Continue via standard API/CLI clients | Exact release license is verified before update |
| Desktop | OpenWork MIT core outside `ee/` (current upstream: React + Electron) | Tauri native client; native web-derived shell | Exact commit/import gate; exclude Den, hosted MCP/inference and all source-available material |
| Mobile | Happy MIT baseline (Expo + React Native) | Happier feature evaluation; native Expo client; Flutter for a distinct future product | Self-host relay, E2EE review, no required Happy cloud or provider dependency |
| Mobile push wake channel | self-hosted ntfy + UnifiedPush where supported | Gotify; optional APNs/FCM OS adapters | Opaque wake payloads only; core sync and refresh work without vendor push |
| Media processing | FFmpeg + GStreamer | ImageMagick for bounded image operations | Pipeline contracts hide engines |
| 3D | Blender + glTF | OpenUSD where scene requirements justify it | Preserve open interchange and provenance |
| Image/color | OpenImageIO + OpenColorIO | libvips for service image transforms | Explicit color and metadata handling |
| Spatial web rendering | MapLibre + open web standards | CesiumJS after feature/license review | Provide non-spatial accessible alternatives |
| Social protocol | ActivityPub + ActivityStreams | Related Fediverse Enhancement Proposals after review | ADR-0014 prohibits a proprietary social protocol |
| Social app | Mastodon | GoToSocial for smaller nodes | One institution-hosted actor domain strategy |
| Photos | Pixelfed | Mastodon-compatible media experience | Share media contracts, not databases |
| Video | PeerTube | Owncast for live-first workloads | Federated delivery and rights controls |
| Communities | Lemmy | Forum experience built on an eligible ActivityPub project | Controlled federation first |
| Blogs | WriteFreely | Plume only after project-health review | Preserve portable content/export |
| Live media | Owncast | PeerTube live capabilities | Media Fabric handles governed processing |
| Documentation source | UTF-8 Markdown + Git | AsciiDoc where publishing demands it | Obsidian is optional; Zettlr is an OSS editor alternative |

## Federation implementation posture

No single product is yet selected as the cross-fabric federation broker. The
accepted default is standards composition: OIDC/OAuth and SPIFFE/SPIRE for trust,
mTLS for transport, CloudEvents/AsyncAPI for events, content-addressed artifacts,
ActivityPub for social, and explicit provider/job contracts. A custom broker may
be built only for post-secondary policy, routing, settlement, and sovereignty
that existing open projects do not provide.

The Compute Fabric-specific division between adopted frameworks, external
adapters, prohibited forks, and PSDC-owned scheduling, lease, worker, and
evidence code is evaluated in the
[Compute Fabric Implementation Framework Composition Study](../campus-compute-fabric/Implementation-Framework-Composition-Study.md)
and scoped in the
[Compute Fabric Custom Control Plane and Worker Scope](../campus-compute-fabric/Custom-Control-Plane-and-Worker-Scope.md).

## Change rule

An alternative becomes the default through an ADR recording requirements,
license, security, operations, accessibility, compatibility, migration, rollback,
data export, and lifecycle ownership. Exact version selection remains a release
decision even when the project default is accepted.

## Purpose, scope, normative rules, enforcement, exceptions, audit evidence, and acceptance review

POL-TECH-001: This policy selects portable defaults and alternatives for infrastructure, identity, data, observability, AI, clients, media, and federation. Components MUST depend on the open contract, not a product-private API. Admission requires provenance, threat and privacy review, ownership, compatibility, migration, rollback, and standalone evidence. CI and architecture review enforce selections. An alternative requires an allowed substitution or ADR with equivalent controls and exit path. Acceptance is a reproducible evaluation plus conformance and failure tests.
