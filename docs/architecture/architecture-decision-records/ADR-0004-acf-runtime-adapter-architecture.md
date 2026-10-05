# ADR-0004: ACF Is Runtime-Agnostic


> Standard: PSDC-DOC-001
> Document type: adr
> Status: Accepted
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Scope: Algonquin Compute Fabric

## Context

Existing engines already solve model serving and distributed execution problems.
ACF's unique problem is safely coordinating authorized campus resources.

## Decision

ACF owns node enrollment, device identity and attestation, hardware discovery,
campus topology, trust tiers, idle detection, scheduling policy, preemption,
resource accounting, and institutional integration. Execution engines remain
plugins behind versioned runtime and job interfaces.

Initial/reference adapters may include vLLM, SGLang, llama.cpp, exo, SwarmLLM, and
future runtimes. HTCondor informs opportunistic desktop policy; Kubernetes or
GPUStack may manage stable GPU resources; Ray may be evaluated where distributed
serving provides evidence-based value.

## Consequences

- ACF does not become a model server or proprietary distributed runtime.
- Adapter capability negotiation is explicit and testable.
- Experimental heterogeneous sharding cannot define the baseline job contract.
- Replacing an engine does not require redesigning enrollment or scheduling.

## Alternatives and evidence

For **ADR-0004: ACF Is Runtime-Agnostic**, the decision record considered: retain the prior approach; adopt a mature compatible standard or open-source implementation; and build or fork a new primitive. The selected decision is preferred under the stated constraints. A change trigger is new security, licensing, interoperability, sovereignty, cost, or operational evidence; a new option requires an ADR update rather than an undocumented exception.

## Migration and rollback

A change implementing **ADR-0004: ACF Is Runtime-Agnostic** MUST preserve the current contract during the declared compatibility window, publish a versioned migration plan, and rehearse rollback before production promotion. Migration evidence includes inventory, data/state transformation, operator communication, and verification. Rollback is triggered by failed acceptance, security regression, loss of institution control, or unrecoverable compatibility failure; it restores the last accepted artifact and preserves audit history. If no migration is currently required, the owner MUST record that as a reviewed no-op and revisit it when the decision changes.

## Alternatives

Considered alternatives include retaining the prior approach, adopting a mature open implementation, and building a local adapter. The selected decision is preferred under the stated requirements, constraints, sovereignty, and maintenance capacity; a new option requires a superseding ADR.
