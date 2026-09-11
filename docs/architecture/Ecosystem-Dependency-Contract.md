# Ecosystem Dependency Contract

> Status: Accepted dependency model; contracts incomplete  
> Purpose: Make runtime, build, feature, and external dependencies explicit

## Dependency classes

- **Foundation:** required for the production system to start or authenticate.
- **Capability:** required only for a named feature; the rest of the system works.
- **Asynchronous:** work can queue while the dependency is unavailable.
- **Development:** used to build/test; absent from production runtime.
- **External adapter:** outside the self-hosted core and always isolatable.
- **Federation peer:** another sovereign institution; trusted only for explicitly
  negotiated capabilities, scopes, data classes and time periods.

## Runtime dependency matrix

| Consumer | Dependency | Class | Contract | Required failure behavior |
|---|---|---|---|---|
| All products | AC Cloud identity | Foundation | OIDC/OAuth claims and scopes | Existing sessions follow policy; new login reports identity outage |
| AC Cloud identity | College institutional IdP | External adapter; required for institutional production login | OIDC/OAuth adapter | Local/test environments continue; institutional login reports upstream outage |
| All products | AC Cloud policy | Foundation or local cache | Versioned policy query/bundle | Fail closed for privileged actions; documented safe cache for low-risk reads |
| All products | AC Cloud events | Asynchronous | CloudEvents/AsyncAPI | Durable local outbox and replay |
| All products | AC Cloud telemetry | Asynchronous | OTLP | Bounded local buffering; product remains available |
| AC AI | Local inference runtime | Foundation for AI requests | Provider adapter | Health-aware routing, queue, or explicit unavailable response |
| AC AI | ACF | Capability | Compute job/runtime contract | Fall back to dedicated local runtime or queue |
| AC AI | External model provider | External adapter | Provider adapter | Disabled by default; never required for core operation |
| AC AI | Brightspace | External adapter | Supported D2L/OAuth/LTI adapter | Academic features degrade; general AI remains available |
| AC AI development/CI | Local academic provider | Development | Internal Academic Service contract and deterministic fixtures | Tests fail explicitly; no external LMS call |
| AC AI | Media Fabric | Capability | Asset and job APIs | Text-only operation remains available |
| AC AI | Fediverse | Capability | Internal publication API | Publication queues or fails explicitly; inference remains available |
| Media Fabric | Ceph object storage | Foundation | S3-compatible objects | Reject new writes safely; preserve metadata and retry |
| Media Fabric | Local media runtime | Foundation for processing | Runtime adapter | Queue jobs and surface capacity state |
| Media Fabric | ACF | Capability | Compute jobs | Use local workers or queue |
| Media Fabric | AC AI | Capability | AI Gateway | Skip/queue AI enrichment according to policy |
| Media Fabric | Fediverse | Capability | Publication API | Assets remain usable without federation |
| Fediverse | PostgreSQL/object storage | Foundation | Owned schema and S3-compatible media | Safe read-only or unavailable mode by failure type |
| Fediverse | Media Fabric | Capability | Asset/rendition references | Text posts remain available; media processing queues |
| Fediverse | AC AI | Capability | AI Gateway | Moderation fallback policy; no silent safety bypass |
| Fediverse | ACF | Asynchronous | Compute jobs | Queue background work |
| ACF | AC Cloud identity/PKI | Foundation in production | Device/workload identity | Reject untrusted enrollment and privileged jobs |
| ACF | AC Cloud events/telemetry | Asynchronous | CloudEvents/OTLP | Local durable state and replay |
| ACF | Ceph object storage | Capability/Foundation by job | S3-compatible artifact refs | Do not start jobs lacking verified inputs; retry result upload |
| Any fabric | Institution deployment configuration | Foundation | Versioned neutral configuration schema | Reject invalid configuration; never infer another institution's values |
| Academic Service | Institution LMS | External adapter | Provider-neutral academic contract | Academic features degrade; core and other fabrics continue |
| Communications | Email/SMS/push channel | External adapter or capability | Notification delivery contract | Queue, retry, offer in-app delivery, or report unavailable by consent/policy |
| Local scheduler | Federation peer | Federation peer/capability | Capability, workload-envelope, artifact and ledger contracts | Continue locally, try the next permitted tier, queue, or fail explicitly |
| Social node | Fediverse peer | Federation peer/capability | ActivityPub/ActivityStreams | Local use continues; retry delivery and apply local moderation/block policy |

## Prohibited dependency cycles

- AC Cloud cannot require AC AI, Media Fabric, Fediverse, or ACF to authenticate,
  route, observe, or recover core platform services.
- ACF scheduling cannot call AC AI to make mandatory placement decisions.
- AC AI policy cannot require Fediverse or Media Fabric availability.
- Media storage cannot require a Fediverse database.
- Fediverse identity cannot silently become institutional identity.
- A federation peer cannot become a local identity, policy, secrets, LMS, database
  or infrastructure-state authority.
- A central Commons service cannot require unrestricted access to sovereign
  institution data in order to perform discovery, routing or accounting.

Optional enrichment may call across these boundaries, but the fallback remains
deterministic and documented.

## Contract ownership

The producer owns availability and compatibility of its contract. The consumer
owns timeouts, retries, circuit breaking, fallback, queues, and user-visible
degradation. Both own contract tests and incident communication.

## Change process

1. Propose the contract change in the umbrella repository.
2. Identify producers, consumers, data classification, and failure behavior.
3. Add schema examples and compatibility tests.
4. Review security, privacy, operations, and open-source implications.
5. Version the contract and publish a migration window.
6. Upgrade consumers before removing old producer behavior.

## Federation dependency requirements

Every peer dependency declares institution identity, trust anchors, supported
contract versions, data and geographic envelope, workload/resource classes,
timeouts, retry and revocation, audit fields, incident contacts, reconciliation,
conformance evidence and exit/data-disposition behavior. Trust is denied by
default and cannot transitively spread from one peer to another.
