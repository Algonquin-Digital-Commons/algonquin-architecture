# License Policy


> Standard: PSDC-DOC-001
> Document type: policy-standard
> Status: Accepted
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: ADR-0030

> Governing decision: ADR-0030; ADR-0024 is superseded

## Default by architectural boundary

New PSDC-authored network and control-plane services target AGPL-3.0-or-later.
Distributed workers and command-line agents target GPL-3.0-or-later when their
distribution channel is compatible. Client repositories receive an explicit
OSI-license decision after store, linking, and update-channel review, with
MPL-2.0 as the default candidate. Protocols, schemas, conformance fixtures,
interface definitions, and interoperability examples use Apache-2.0 so an
institution can implement the standards independently. Documentation remains
Apache-2.0 unless its repository approves another open-content license.

Imported or derived material retains its original approved license and
attribution. A repository must not claim that PSDC's license choice relicenses
upstream MIT, BSD, MPL, GPL, AGPL or other third-party content. This target matrix
is prospective: existing contributions remain under their valid license until
copyright, compatibility, and legal migration gates pass.

Every repository release includes:

- the repository `LICENSE`;
- `NOTICE` and required upstream notices;
- an SBOM and third-party license inventory;
- provenance for imported source; and
- source-file change notices where required.

## Commercial contribution reciprocity

AGPL requires covered modified network software to offer corresponding source to
its remote users; it does not require that PSDC accept a pull request or that every
commercial user submit one. Organizations seeking official consortium,
certification, shared-release, federation-service, trademark, or support benefits
must additionally sign the participation agreement and offer generally useful
improvements to the owning PSDC repository.

Do not add a commercial-use restriction, Commons Clause, Business Source License
condition, or custom field-of-use limitation and describe the result as OSI open
source. Commercial use remains permitted under every OSI-approved license.

## Migration gate

Before changing a repository license, inventory copyright ownership, contributor
terms, dependencies, linking, generated artifacts, distribution channels, and
source-offer obligations. Obtain qualified legal review and any necessary consent.
If the gate fails, retain the current valid license and do not claim migration.

## Enforcement

**GOV-LP-001:** PSDC Architecture Maintainers MUST enforce **License Policy** at the declared policy, identity, repository, gateway, deployment, or moderation enforcement points. A request or change that does not satisfy the normative requirements MUST be denied or quarantined with a stable reason code. Enforcement decisions MUST be attributable, fail closed for authorization failures, and remain independently testable without relying on a proprietary service.

## Exceptions

An exception to **License Policy** requires a written reason, affected scope, risk assessment, compensating control, approving role, start date, and expiry date. The subject owner MUST NOT self-approve a high-impact exception. Expired exceptions MUST stop applying automatically; renewal requires new evidence and review.

## Audit evidence

Conformance evidence for **License Policy** MUST record the policy version, actor or service, decision, reason code, affected object or boundary, timestamp, outcome, and reviewer where applicable. Evidence MUST minimize protected data, be access-controlled, be exportable to the institution, and be retained according to the governing data policy. The owner MUST be able to demonstrate both an allowed and a denied case.

## Acceptance and review

The policy is accepted only when positive, negative, authorization, exception-expiry, audit-retrieval, failure, and recovery tests pass for **License Policy**. PSDC Architecture Maintainers MUST review it at least annually and whenever an ADR, contract, threat model, legal requirement, or material incident changes its assumptions. Review output MUST record the decision, evidence, and next review trigger.

## Purpose

This policy defines the required outcome, actors, and decision boundary for **License-Policy**. It applies to all implementations and institution overlays that claim conformance.

## Scope

The scope covers the systems, people, data, interfaces, and lifecycle named by this policy. Local values may tighten these rules but MUST NOT weaken shared safety, privacy, or audit requirements.

## Normative rules

The requirements in this document are normative. Owners MUST implement them, SHOULD document justified risk trade-offs, and MUST NOT treat an example as an exemption.

