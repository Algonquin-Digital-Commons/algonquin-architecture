# Platform Operations


> Standard: PSDC-DOC-001
> Document type: repository-index
> Status: Normative
> Owner: Algonquin Institution Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: none; index governed by repository policy

Shared service objectives, incident coordination, change management, dependency
status, disaster recovery, and cross-system runbooks belong here.

## Purpose

This index explains the purpose and placement of $dir and links readers to the authoritative documents it contains.

## Allowed contents

This directory belongs to $repo. It may contain scoped documentation, contracts, configuration examples, tests, and navigation links owned by this repository.

## Prohibited contents

It MUST NOT contain secrets, credentials, private infrastructure values, unrelated product source, copied institution overrides, or undocumented external dependencies.

## Owner

The owning role is $owner; accountable maintenance remains with RedjiJB until a second maintainer is appointed.

## Contents

- `Alerting.md`
- `Capacity-Planning.md`
- `Cost-and-Resource-Efficiency.md`
- `Dashboards.md`
- `Error-Budgets.md`
- `GPU-Telemetry.md`
- `Logging.md`
- `Metrics.md`
- `Observability-Architecture.md`
- `OpenTelemetry-Standard.md`
- `Performance-Benchmarking.md`
- `README.md`
- `SLO-SLI-SLA.md`
- `Tracing.md`

## References

- [Ecosystem documentation quality standard](https://github.com/Post-Secondary-Digital-Commons/psdc-architecture/blob/main/docs/standards/Ecosystem-Documentation-Quality-Standard.md)
- [Repository governance](https://github.com/Post-Secondary-Digital-Commons/psdc-architecture/blob/main/docs/governance/GitHub-Repository-Governance.md)

## Contribution and change control

Changes MUST use a pull request, preserve the repository boundary, update affected links and contracts, and pass the structural and substantive documentation audits before merge.
