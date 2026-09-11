# License Policy


> Standard: PSDC-DOC-001
> Document type: policy-standard
> Status: Accepted
> Owner: PSDC Architecture Maintainers
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

## Enforcement

PSDC Architecture Maintainers MUST enforce **License Policy** at the declared policy, identity, repository, gateway, deployment, or moderation enforcement points. A request or change that does not satisfy the normative requirements MUST be denied or quarantined with a stable reason code. Enforcement decisions MUST be attributable, fail closed for authorization failures, and remain independently testable without relying on a proprietary service.

## Exceptions

An exception to **License Policy** requires a written reason, affected scope, risk assessment, compensating control, approving role, start date, and expiry date. The subject owner MUST NOT self-approve a high-impact exception. Expired exceptions MUST stop applying automatically; renewal requires new evidence and review.

## Audit evidence

Conformance evidence for **License Policy** MUST record the policy version, actor or service, decision, reason code, affected object or boundary, timestamp, outcome, and reviewer where applicable. Evidence MUST minimize protected data, be access-controlled, be exportable to the institution, and be retained according to the governing data policy. The owner MUST be able to demonstrate both an allowed and a denied case.

## Acceptance and review

The policy is accepted only when positive, negative, authorization, exception-expiry, audit-retrieval, failure, and recovery tests pass for **License Policy**. PSDC Architecture Maintainers MUST review it at least annually and whenever an ADR, contract, threat model, legal requirement, or material incident changes its assumptions. Review output MUST record the decision, evidence, and next review trigger.
