# Sovereign Campus and Federation Network Architecture

> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: PSDC Network Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: ADR-0010, ADR-0013, ADR-0026, ADR-0028, ADR-0029

## Purpose and measurable outcomes

This specification defines how campus labs, production cells, Kubernetes, OpenStack, Slurm,
storage, federation and public ingress communicate without forming one flat trust domain.
The network must allow the market resolver to compare safe paths and reserve capacity while
keeping each institution's addressing, routing, DNS, PKI and operations sovereign.

Outcomes are default-deny segmentation, authenticated workloads, deterministic address/name
authority, outbound-safe lab cells, no Layer-2 federation, measurable capacity/QoS, private
telemetry, tested isolation and disaster-recovery routing.

## Scope, exclusions and prohibited behavior

In scope: address management, VRFs/VLANs, routing, DNS, CNI, Neutron, HPC/RDMA profiles,
lab cells, ingress/egress, firewalls, PKI/workload identity, mirrors, federation transport,
telemetry, time, backup/DR paths, capacity and change authority.

Out of scope: an institution's exact assigned prefixes, switch models, carrier contracts and
physical port numbers; those belong in its signed deployment profile. Federation MUST NOT
depend on overlapping RFC1918 routes, stretched Layer 2, unrestricted east-west access,
publicly exposed worker agents or unauthenticated storage/content peers.

## Trust-zone topology

    public users / partner institutions
                 |
        public and federation edge
          WAF/rate limit/mTLS
                 |
    +------------+-------------+
    |                          |
 service/production VRF     federation VRF
    |                          |
 Kubernetes/OpenStack       federation gateways
    |
 control and management VRF ---- out-of-band administration
    |
 compute VRFs ---- lab cell gateways ---- outbound-only workers
    |
 storage VRF ---- backup VRF ---- isolated recovery copy
    |
 observability collectors (one-way/minimized where practical)

Default traffic between zones is denied. Required flows name source identity/zone,
destination service/zone, protocol, port, purpose, data class, owner, expiry and evidence.

## Accepted common decisions

These are common defaults. An institution supplies concrete values or a stricter compatible
choice in its signed deployment profile.

| Decision | Accepted default | Institution must supply |
|---|---|---|
| campus IP ranges | institution IPAM allocates non-overlapping production ranges; IPv6 uses institution GUA where available plus RFC 4193 ULA for controlled internal use; no universal PSDC RFC1918 range | actual IPv4/IPv6 prefixes and collision check |
| IPv4/IPv6 order | dual-stack from managed pilot where campus supports it; IPv4 remains required compatibility initially; IPv6 readiness is a production gate and federation prefers DNS names, not literals | routing/firewall/DNS support and retirement date for IPv4-only exceptions |
| VLAN/VRF layout | separate management, control, production, compute/lab, storage, backup, federation, public edge and observability VRFs; VLANs segment within a VRF | IDs, route targets, gateways and physical mapping |
| lab networking | cell gateway with outbound-initiated mTLS worker sessions; no unsolicited inbound to desktops; student interactive traffic has priority | lab subnets, gateway location, schedules and NAC integration |
| IPAM authority | NetBox is the open-source source of truth, synchronized with institution network authority | delegated prefix owners and approval workflow |
| DNS zones/naming | institution-owned DNS namespace; split-horizon internal zones; DNSSEC on public zones; PowerDNS or BIND authoritative and CoreDNS for cluster service discovery | base domains, delegation and resolver addresses |
| internal service naming | stable service names, not host IPs; service.environment.institution namespace pattern; Kubernetes cluster DNS stays local | institution suffix and reserved labels |
| CA hierarchy | offline institution root, separate issuing intermediates, step-ca/cert-manager automation and federation trust bundles | root ceremony, intermediate names and trust approval |
| workload identity | SPIFFE/SPIRE SVIDs mapped to institution/project/service; short-lived mTLS credentials | trust-domain name and federation mappings |
| Cilium mode | production managed clusters use native routing with approved BGP integration where campus supports it; pilots/lab cells use VXLAN overlay; Hubble visibility enabled with privacy limits | MTU, BGP peers, pod/service CIDRs and exception |
| OpenStack Neutron | OVN/OVS-backed tenant networks, security groups and routed provider networks; no flat shared tenant network | physical/provider network mappings and MTU |
| Slurm/HPC profiles | separate management, compute and storage networks; topology-aware partitions; no general internet on compute nodes | partition prefixes, bandwidth and storage mounts |
| RDMA/high-speed fabric | optional, not baseline; dedicated approved lossless profile for workloads that declare it; never converged casually with ordinary lab traffic | InfiniBand/RoCE technology, PFC/ECN and operational owner |
| firewall ownership | network team owns perimeter/VRF policy; platform team owns Cilium/Neutron policy; service owner requests app flows; security approves high-risk exceptions | RACI names and emergency contacts |
| egress proxy | deny by default for protected/production workloads; authenticated egress gateway/proxy, DNS policy and destination allowlists | allowed destinations, inspection/privacy policy and bypass approver |
| package/model mirrors | institution mirrors approved OCI artifacts in Harbor; OS/language packages use Pulp or ecosystem-specific OSS mirror; model weights use governed object storage | upstream allowlist, refresh cadence and storage quota |
| federation gateway protocol | HTTPS/mTLS, OpenAPI for requests, CloudEvents/AsyncAPI for events, signed manifests and SPIFFE/OIDC-bound identity | endpoints, trust mappings and accepted contract versions |
| institution transport | application-layer mTLS is mandatory; WireGuard site-to-site may protect/standardize transport; no shared L2 or mandatory private WAN | peer addresses, tunnel keys and routes |
| public ingress protection | Envoy Gateway, Coraza-compatible WAF controls, rate limits, bot/abuse controls and isolated public edge | public VIPs, TLS names, rules and service owners |
| DDoS ownership | institution network/security owns host/application controls and upstream escalation; volumetric capacity requires campus/ISP cooperation and cannot be solved by application code alone | carrier/escalation path and tested contact |
| network telemetry retention | raw flow/security metadata 30 days by default; access-controlled aggregate capacity evidence up to 13 months; incident hold by approved policy | stricter legal/privacy limits and approved collectors |
| flow-log privacy | collect headers/flow metadata only when needed; pseudonymize user/device identities; no payload capture by default | authorized exceptional capture procedure |
| time synchronization | chrony/NTPsec clients use redundant institution time sources; authenticated NTS where available; isolated infrastructure gets controlled fallback | authoritative servers and drift thresholds |
| failure/isolation | cross-zone failure defaults closed; cells isolate locally; accepted critical traffic continues on reserved paths; unsafe new placement pauses | local failover routes and emergency policy |
| backup network | separate VRF, credentials and QoS; not generally routable from workload networks | backup prefixes, targets and windows |
| DR routing | DNS/service failover and routed L3; no stretched L2; BGP changes remain under institution network change control | DR prefixes, TTLs, advertisements and failback |
| capacity/QoS | reserve control, critical service, storage repair and backup classes; student interactive use outranks opportunistic lab work; admission prevents unsafe oversubscription | link capacities, class percentages and congestion thresholds |
| change authority | Git-reviewed intent, generated/configured deployment, staged validation and institution network approval; emergency change is time-limited and retrospectively reviewed | approvers, windows and rollback contacts |

## Addressing, routing and naming mechanics

NetBox is the desired-state source for prefixes, VLANs, VRFs, IPs, ASN/route metadata and
ownership. Automation validates overlap before allocation and deployment. Private addresses
never appear in federation contracts; services are addressed by DNS and authenticated
identity. Route leaking between VRFs is explicit through inspected gateways. Default routes
from compute/storage do not imply egress permission.

IPv6 ULA generation follows RFC 4193 and includes collision checks before federation.
Globally routable campus IPv6 is preferred for controlled service endpoints when available.
NAT is a compatibility mechanism, not identity. DNS records, certificates and workload
identities have coordinated lifecycle and no wildcard certificate spans unrelated trust
zones.

## Lab compute-cell networking

Forty lab PCs form a compute cell:

1. each worker enrolls through device identity/attestation;
2. it initiates an mTLS session to the cell gateway; inbound worker ports remain closed;
3. the gateway advertises aggregate capability and receives task leases;
4. inputs are fetched by signed object reference through approved cache/storage paths;
5. tasks run in an isolated local container/VM sandbox;
6. results and receipts return through the gateway;
7. idle detection, schedule and student activity preempt or drain work;
8. cell loss expires/retries tasks without routing through neighbouring desktops.

The cell is suitable for public/synthetic/approved internal retryable work. It is not a
production service network or primary protected-data store.

## Kubernetes, OpenStack and Slurm integration

### Kubernetes

Cilium enforces identity-aware network policy; namespaces are not sufficient isolation.
NetworkPolicy defaults deny ingress/egress. Native routing/BGP is used after campus
validation; overlay mode limits early integration impact. MetalLB or approved load-balancer
integration advertises only authorized VIPs. Envoy Gateway terminates controlled ingress.

### OpenStack

Neutron with OVN/OVS provides tenant networks, security groups, routers and provider-network
attachments. Projects do not attach VMs directly to management/storage/backup networks.
Provider networks are predeclared and policy-gated; floating/public IPs require ingress
approval and lifecycle ownership.

### Slurm/HPC

Login/control, compute and storage paths are separate. Compute nodes have minimal egress and
obtain packages/containers/models through mirrors. MPI placement consumes a topology/RDMA
profile. RDMA is enabled only on a managed dedicated fabric with congestion and security
controls; opportunistic lab nodes do not advertise RDMA merely because hardware supports it.

## Market-aware path selection

The network controller exports abstract path capabilities: endpoints/zones, bandwidth,
latency, loss, trust, egress class, cost/IRUs, energy signal and expiry. The market resolver
computes candidate paths, hard-filters segmentation/trust/capacity/latency, then includes
path cost and data-movement time in placement ranking. A selected compute/storage plan and
its network reservation commit atomically or not at all.

The network reservation token identifies the path class and capacity, never the packet
payload or permission to call the application.

## Interfaces and API boundaries

NetBox exports desired-state inventory; DNS, PKI/SPIRE, Cilium, Neutron, Slurm and gateways
expose only their approved control APIs. The resolver consumes an abstract path-capability
contract and never receives switch credentials or protected topology.

## Ingress, egress and federation

Public traffic passes public DNS, DDoS/upstream controls, rate limiting/WAF and Envoy to an
authorized service. Production egress passes an identity-aware gateway with DNS/destination
policy; direct uncontrolled internet access is denied. Package/model mirrors reduce
dependency, data leakage and repeated egress.

Federation is application-layer. Gateways validate peer institution trust, contract
version, workload/data policy and signed manifests. WireGuard may secure routes but does not
grant application access. Each institution can disconnect federation and continue locally.

## Data, telemetry and privacy

IPAM and DNS state are configuration records. Flows, identities and device locations can be
personal/security-sensitive. Raw logs are restricted, minimized, encrypted and expire at
the default 30-day window unless an approved incident/legal hold applies. Capacity reports
aggregate/pseudonymize and may remain 13 months for seasonal planning. Payload capture is
off by default and requires incident authority, scope, notice where required and deletion.

## Capacity and QoS

Links maintain measured headroom and class reservations:

1. control/identity/key traffic;
2. critical service traffic;
3. storage replication/repair and database replication;
4. student interactive/teaching traffic;
5. standard workloads;
6. opportunistic batch;
7. scheduled backup/bulk transfer.

Percentages are local values. Hard service minima and anti-starvation apply; lower classes
cannot crowd out identity, control or student interactive use. Market cost may reflect
congestion, but payment cannot override a protected reservation.

## Failure and isolation matrix

| Failure | Required behavior |
|---|---|
| one lab worker/cell lost | expire/retry eligible tasks; no lateral failover into desktops |
| Cilium/Neutron control degraded | existing safe data plane may continue; unsafe new policy/attachment stops |
| DNS internal failure | local caches within TTL; failover authoritative service; no hard-coded IP workaround |
| federation tunnel/gateway lost | queue bounded exchange; institution remains independently operational |
| egress proxy lost | protected egress fails closed; critical allowlisted dependency uses approved HA path |
| public ingress attack | rate/WAF/isolate service; preserve management/internal networks |
| time drift | quarantine signing/lease-sensitive node at threshold |
| telemetry unavailable | retain bounded local evidence; do not remove network policy |
| backup link saturated | QoS protects control/critical traffic; backup extends or pauses |
| route leak | prefix/max-route/filter controls reject; isolate and execute routing incident runbook |
| primary site lost | activate DR DNS/routed advertisements after health and authority gate |

## Security and operational ownership

Administrative planes require dedicated access, MFA, short-lived privilege and audited
jump/management paths. Device and workload identities are distinct. Switch/router secrets
and certificates use OpenBao/KMS. Firewall rules and routes have owner, purpose, ticket/PR,
expiry and rollback. High-risk changes need independent institutional approval once staff
exists; current role overlap is disclosed.

## Observability

Metrics include link utilization, loss, latency, jitter, errors, drops, policy denies,
conntrack/NAT capacity, DNS health, route changes, certificate expiry, tunnel state, flow
volume, Cilium/Neutron health, RDMA counters and reservation variance. Synthetic probes test
user, service, storage, federation and DR paths. Dashboards avoid exposing internal topology
to unauthorized users.

## Alternatives and trade-offs

A flat campus network is easier initially but creates lateral movement and ambiguous
ownership. One overlay everywhere hides campus integration but adds MTU/encapsulation and
troubleshooting burden. Native routing everywhere offers visibility/performance but raises
pilot risk. PSDC uses overlay for early/lab cells, native routed production after validation,
and application-layer federation rather than a cross-institution network fabric.

## Implementation sequence, migration and rollback

1. populate NetBox and validate existing ranges/routes/DNS;
2. deploy management/control and lab cell gateway with outbound-only workers;
3. establish production/storage/backup zones and default-deny policy;
4. deploy Kubernetes overlay pilot, then validated native routing/BGP;
5. integrate Neutron and Slurm profiles;
6. add ingress/egress/mirrors and federation gateway;
7. test isolation, congestion, provider/path placement and site DR.

Every change captures pre/post routes, policy, connectivity and capacity. Rollback restores
the last accepted Git/network snapshot and withdraws new advertisements. Emergency rules
expire automatically. Address renumbering uses dual-address/DNS transition and never relies
on an untracked NAT forever.

## Testing and evidence

Evidence includes configuration snapshots, reachability/denial matrices, path reservations,
MTU/capacity measurements, privacy retention checks and DR/failback results.

## Binary acceptance criteria

These testing and evidence gates are required before network production acceptance.

- **NET-NA-ACC-001:** automated overlap and forbidden-route tests pass for institution,
  Kubernetes, OpenStack, Slurm, backup and federation prefixes;
- **NET-NA-ACC-002:** every zone pair is denied by default and each allowed flow has owner,
  purpose, identity, data class and expiry;
- **NET-NA-ACC-003:** a lab worker accepts no unsolicited inbound connection and is drained
  when student activity begins;
- **NET-NA-ACC-004:** Kubernetes, OpenStack and Slurm fixtures reach only declared networks
  and preserve MTU/performance objectives;
- **NET-NA-ACC-005:** resolver selects only a path meeting trust/capacity/latency and the
  path reservation commits or fails atomically with the lease;
- **NET-NA-ACC-006:** federation continues over public Internet plus mTLS without shared L2
  and local services continue after federation isolation;
- **NET-NA-ACC-007:** raw flow data expires at policy while aggregate planning data remains
  useful and no payload is collected by default;
- **NET-NA-ACC-008:** primary-site failure and failback meet declared RTO without route leak
  or simultaneous writers;
- **NET-NA-ACC-009:** volumetric DDoS exercise documents the exact campus/ISP escalation
  boundary rather than claiming application software can absorb upstream saturation.

## References

- [Campus Compute Network](Campus-Compute-Network.md)
- [Network Segmentation](../security/Network-Segmentation.md)
- [Scheduling Algorithm](../campus-compute-fabric/Scheduling-Algorithm.md)
- [Storage Architecture](../storage/Storage-Architecture.md)
- [KMS](../security/KMS.md)
