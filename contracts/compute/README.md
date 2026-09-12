# Compute Contract Profile


> Standard: PSDC-DOC-001
> Document type: repository-index
> Status: Normative
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: none; index governed by repository policy

The compute profile defines NodeCapability, Workload, Job, Placement, Lease,
Checkpoint, ArtifactReference, UsageRecord, LifecycleEvent and ResultReference.
Capabilities describe architecture, CPU, memory, accelerators, storage, network,
runtime adapters, trust tier, power state and locality without encoding a vendor.

Jobs declare identity, institution, purpose, classification, resources, artifacts,
runtime, priority, preemption, deadline, retry, checkpoint, network and result
policy. Scheduling returns a signed lease; workers execute only valid leases and
emit ordered lifecycle events. Artifacts use immutable hashes and S3-compatible
references. Results preserve provenance and never expose worker credentials.

Implementations pass admission, quota, trust-tier, placement, isolation,
preemption, checkpoint, duplicate, cancellation, worker-loss, artifact-integrity,
accounting and heterogeneous-runtime compatibility tests.

## Purpose

This index explains the purpose and placement of $dir and links readers to the authoritative documents it contains.

## Allowed contents

This directory belongs to $repo. It may contain scoped documentation, contracts, configuration examples, tests, and navigation links owned by this repository.

## Prohibited contents

It MUST NOT contain secrets, credentials, private infrastructure values, unrelated product source, copied institution overrides, or undocumented external dependencies.

## Owner

The owning role is $owner; accountable maintenance remains with RedjiJB until a second maintainer is appointed.

## Contents

- `.gitkeep`
- `README.md`

## Contribution and change control

Changes MUST use a pull request, preserve the repository boundary, update affected links and contracts, and pass the structural and substantive documentation audits before merge.

## References

- [Ecosystem documentation quality standard](https://github.com/Post-Secondary-Digital-Commons/psdc-architecture/blob/main/docs/standards/Ecosystem-Documentation-Quality-Standard.md)
- [Repository governance](https://github.com/Post-Secondary-Digital-Commons/psdc-architecture/blob/main/docs/governance/GitHub-Repository-Governance.md)

