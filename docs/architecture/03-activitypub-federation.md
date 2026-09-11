# ActivityPub Federation

The Commons Social Fabric is the sole public ActivityPub security and interoperability edge.
Centralizing that boundary avoids five inconsistent implementations of HTTP
signatures, discovery, delivery, moderation, remote media, and abuse controls.
This document governs public social federation only. Compute, research, artifact,
and service federation use separate Commons trust and capability contracts and do
not expose ActivityPub endpoints.

## Internal publication flow

```text
Commons AI or Commons Media and Spatial Fabric
          |
          v
authenticated internal publication request
          |
          v
Commons Social Fabric policy + moderation + object mapping
          |
          v
local actor outbox
          |
          v
signed ActivityPub delivery
```

Commons Cloud Fabric provides identity, secrets, events, and observability. The
Commons Compute Fabric may process
background jobs. Neither exposes ActivityPub endpoints.

## Required controls before public federation

- HTTP signature and actor-key verification
- SSRF-resistant discovery and remote-media retrieval
- Durable inbox/outbox processing with idempotency and bounded retries
- Instance, actor, domain, and content federation policy
- Rate limits, abuse reporting, moderation, appeals, and audit trails
- Spatial precision reduction and private-location stripping
- Incident response, peer blocking, key rotation, and recovery procedures

The normative operating policy is [Federated Social Governance
Policy](../fediverse/Federated-Social-Governance-Policy.md).
