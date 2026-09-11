# License Policy


> Standard: PSDC-DOC-001
> Document type: policy-standard
> Status: Accepted
> Owner: Algonquin Institution Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Governing decision: ADR-0024

## Default

New PSDC-authored code, configuration and documentation use Apache-2.0. Imported
or derived material retains its original approved license and attribution. A
repository must not claim that Apache-2.0 relicenses upstream MIT, BSD, MPL, GPL,
AGPL or other third-party content.

Every repository release includes:

- the repository `LICENSE`;
- `NOTICE` and required upstream notices;
- an SBOM and third-party license inventory;
- provenance for imported source; and
- source-file change notices where required.

## Contribution reciprocity

Apache-2.0 is permissive. It does not require a university or business to send
private modifications back. PSDC uses upstream-first fork governance and a
separate participation agreement for organizations seeking official consortium,
certification, shared-release, trademark or support benefits.

Do not add a commercial-use restriction, Commons Clause, Business Source License
condition or custom mandatory-contribution addendum and still describe the result
as permissive open source.

## Alternative if policy changes

AGPL-3.0-or-later can require operators of modified network software to offer
corresponding source to remote users. MPL-2.0 can require source for distributed
modifications at the file level. Both require a new compatibility and legal ADR
because neither is the accepted permissive default.

## Purpose

This policy defines the required outcome, actors, and decision boundary for **License-Policy**. It applies to all implementations and institution overlays that claim conformance.

## Scope

The scope covers the systems, people, data, interfaces, and lifecycle named by this policy. Local values may tighten these rules but MUST NOT weaken shared safety, privacy, or audit requirements.

## Normative rules

The requirements in this document are normative. Owners MUST implement them, SHOULD document justified risk trade-offs, and MUST NOT treat an example as an exemption.

## Enforcement

The owning maintainer enforces this policy through review, automated checks, release gates, operator runbooks, and periodic evidence review. A critical violation blocks promotion until corrected or explicitly excepted.

## Exceptions

An exception requires affected scope, rationale, threat/risk assessment, compensating controls, accountable approver, expiry date, and rollback or remediation plan. Exceptions MUST be narrow and time-bounded.

## Audit evidence

Audit evidence includes implementation links, test results, configuration or provenance records, incidents, approvals, and exception history. Evidence MUST be reproducible by an independent maintainer.

## Acceptance and review

Acceptance requires the documented controls, tests, operator ownership, and evidence to be complete. The owner reviews this policy on material architecture change and at least once per release cycle.
