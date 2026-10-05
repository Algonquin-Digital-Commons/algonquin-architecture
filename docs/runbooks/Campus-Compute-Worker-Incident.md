# Campus Compute Worker Incident

> Standard: PSDC-DOC-001
> Document type: runbook
> Status: Normative design; execution requires an approved institution binding
> Owner: PSDC Operations Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: ADR-0002, ADR-0005, ADR-0012, ADR-0013, and ADR-0016

## Purpose and outcome

This runbook defines the portable response to **Campus Compute Worker Incident**. Its outcome is a bounded incident, preserved evidence, restored service, and an auditable decision trail. Site hostnames, credentials, thresholds, recovery objectives, channels, and named personnel belong in the institution binding.

## Scope and authority

`RUN-WORKER-001`: The incident commander MUST apply this procedure when a worker misses heartbeats, fails attestation, violates thermal policy, returns corrupt results, or accepts work after drain. The commander coordinates; service owners execute changes; security and privacy owners govern evidence and notification when affected.

The Campus Compute Worker Incident response covers detection through closure and specializes the shared PSDC incident model with the triggers, diagnostics, recovery action, and verification defined below. Unapproved destructive changes and undocumented vendor-only controls remain outside its authority.

## Trigger and symptoms

`RUN-WORKER-002`: Monitoring or an authorized operator MUST open an incident when a worker misses heartbeats, fails attestation, violates thermal policy, returns corrupt results, or accepts work after drain. Record first observation, reporter, scope, severity, trace or event identifiers, and last known-good change.

## Safety constraints and prerequisites

`RUN-WORKER-003`: Responders MUST stop and escalate before irreversible action, evidence destruction, authority expansion, residency change, unverified restore, or control bypass. The principal risk is that untrusted hardware may execute protected workloads, corrupt artifacts, or disrupt an interactive workstation.

Before changing state during Campus Compute Worker Incident, responders confirm the service owner, incident channel, dependency map, last-known-good release, backup or rollback, change freeze, required specialist, and redacted telemetry. Missing authority or recovery evidence restricts the response to containment and diagnosis; any break-glass access is time-limited, audited, and revoked during recovery.

## Triage and severity

| Condition | Severity | Response |
|---|---:|---|
| Safety, privacy, active compromise, or probable irreversible loss | SEV-1 | Contain; engage security/privacy and institutional authority. |
| Critical journey unavailable without safe workaround | SEV-2 | Establish incident command and recovery ownership. |
| Bounded degradation with safe workaround | SEV-3 | Protect capacity, diagnose, and repair under change control. |
| Warning without user impact | SEV-4 | Record, investigate, and prevent threshold breach. |

## Diagnostic hypotheses

`RUN-WORKER-004`: The operator MUST correlate enrollment, attestation, scheduler lease, sandbox, hardware telemetry, network, and result hashes. Every test records hypothesis, evidence, discriminator, result, and next decision.

## Ordered response

| Step | Action | Expected result | Stop or rollback condition |
|---:|---|---|---|
| 1 | Declare severity, commander, scope, and freeze. | One incident record exists. | Authority or scope is unknown. |
| 2 | Capture volatile and durable evidence. | Timeline, traces, versions, health, configuration, and changes are preserved. | Collection exposes data or worsens impact. |
| 3 | Contain the smallest unsafe boundary. | New impact stops without disabling unrelated services. | Impact expands or a control is bypassed. |
| 4 | Test hypotheses and locate the first failing dependency. | Evidence separates cause from symptoms. | Evidence conflicts; engage the owner. |
| 5 | revoke the lease, drain or quarantine the node, preserve the interactive user, clear workload state, and require fresh enrollment. | Recovery target is healthy but restricted. | State diverges, validation fails, or risk rises. |
| 6 | Run technical, security, data, and journey verification. | Release gates pass under observation. | Any critical check fails. |
| 7 | Revoke temporary authority, end freeze, communicate, and assign prevention. | Normal ownership resumes. | Temporary authority remains. |

## Rollback and recovery

`RUN-WORKER-005`: Each state-changing action MUST name its last-known-good target and reversal before execution. Roll back when integrity, authorization, health, or blast radius worsens; reconcile caches, queues, sessions, routes, and policy.

## Communication and escalation

`RUN-WORKER-006`: The commander MUST issue timestamped updates at the institution cadence. Escalate for suspected compromise, protected-data exposure, notification duty, repeated failure, missing owner or backup, or action beyond authority.

## Verification and evidence

`RUN-WORKER-007`: Recovery MUST demonstrate that the node remains ineligible until attestation, discovery, sandbox, and test-job evidence pass. Retain timeline, changes, approvers, before/after signals, tests, versions, residual risks, and follow-up links.

## Rehearsal and acceptance

`RUN-WORKER-008`: Each institution MUST rehearse this runbook before production and after a material dependency or control change. A failed exercise blocks the affected release.

1. `RUN-WORKER-ACC-001` — the institution binding supplies identifiers, thresholds, contacts, access roles, channels, backup locations, and recovery objectives;
2. `RUN-WORKER-ACC-002` — a tabletop reaches correct severity, containment, escalation, and rollback decisions;
3. `RUN-WORKER-ACC-003` — a representative fault proves verification while preserving controls; and
4. `RUN-WORKER-ACC-004` — temporary access and mitigations are detectable, expiring, and present in closure evidence.

## References

- [Specification Completeness Standard](../architecture/Specification-Completeness-Standard.md)
- [Dependency Map](../architecture/Dependency-Map.md)
- [Incident Response](../security/Incident-Response.md)
- [Audit Requirements](../governance/Audit-Requirements.md)
