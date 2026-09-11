# Cross-System Contracts

The umbrella repository owns the stable shapes exchanged between ecosystems.
Product repositories may add internal APIs, but cross-system integrations must
use versioned contracts here.

| Contract area | Producer/owner | Main consumers |
|---|---|---|
| Identity and roles | AC Cloud | Every ecosystem |
| Event envelope | AC Cloud | Every ecosystem |
| AI model/inference reference | AC AI | AC Cloud, ACF, Media Fabric |
| Compute capacity/job reference | ACF | AC Cloud, AI, Media Fabric |
| Media asset/rendition metadata | AC Media Fabric | Fediverse, AI, AC Cloud |
| ActivityPub objects and federation | AC Fediverse | Media Fabric and approved platform clients |
| Spatial/temporal-spatial metadata | Shared platform | Every ecosystem |
| Academic provider-neutral resources | Academic contract owners | AI, agents, clients, institution adapters |
| Commons peer trust/capabilities | Federation governance and contract owners | Compute, AI, Media, Research, Cloud |
| Workload envelope and resource ledger | ACF/Cloud plus federation governance | Schedulers, providers, finance/audit |

## Federation boundary

AC Fediverse is the only subsystem that owns ActivityPub inbox, outbox, actor,
and federation behavior. Other systems publish or consume through adapters and
must not silently become independent federated servers.
This exclusivity applies to ActivityPub social federation, not to approved
compute, artifact, research, or service federation through their own contracts.

## Spatial boundary

Spatial support is cross-cutting metadata and capability negotiation. It can
describe locations, scenes, geometry, camera poses, coordinate reference
systems, and temporal-spatial media. Storage, rendering, and indexing remain
owned by the subsystem that needs them; the shared contract prevents incompatible
representations.
