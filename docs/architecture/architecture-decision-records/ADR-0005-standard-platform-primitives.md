# ADR-0005: Standard Platform Primitives


> Standard: PSDC-DOC-001
> Document type: adr
> Status: Accepted
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Scope: Data, infrastructure, APIs, events, telemetry, security, and artifacts

## Decision

Use established standards and mature implementations by default:

| Concern | Default boundary or reference |
|---|---|
| Relational data | PostgreSQL-compatible interfaces |
| Cache/coordination | Redis-compatible behavior implemented with Valkey where appropriate |
| Objects | S3-compatible object storage and content-addressed concepts |
| Containers/artifacts | OCI formats and registries |
| API definitions | OpenAPI for REST; gRPC/Protobuf where justified |
| Events | CloudEvents envelopes and AsyncAPI where appropriate |
| Observability | OpenTelemetry signals and context propagation |
| Transport security | Standard TLS/mTLS mechanisms |
| Secrets | Established secret-management infrastructure |

These are defaults, not permission to select products without requirements,
security, operational, licensing, and institutional review.

## Consequences

No `AlgonquinDB`, proprietary container format, custom tracing protocol, or novel
storage transport is created without an exception ADR satisfying ADR-0001.

## Alternatives and evidence

For **ADR-0005: Standard Platform Primitives**, the decision record considered: retain the prior approach; adopt a mature compatible standard or open-source implementation; and build or fork a new primitive. The selected decision is preferred under the stated constraints. A change trigger is new security, licensing, interoperability, sovereignty, cost, or operational evidence; a new option requires an ADR update rather than an undocumented exception.

## Migration and rollback

A change implementing **ADR-0005: Standard Platform Primitives** MUST preserve the current contract during the declared compatibility window, publish a versioned migration plan, and rehearse rollback before production promotion. Migration evidence includes inventory, data/state transformation, operator communication, and verification. Rollback is triggered by failed acceptance, security regression, loss of institution control, or unrecoverable compatibility failure; it restores the last accepted artifact and preserves audit history. If no migration is currently required, the owner MUST record that as a reviewed no-op and revisit it when the decision changes.
