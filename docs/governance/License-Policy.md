# License Policy


> Standard: PSDC-DOC-001
> Document type: policy-standard
> Status: Accepted
> Owner: Algonquin Institution Maintainers
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
## Stable conformance requirement

- **GOV-LP-001:** The **License Policy** owner MUST record enforcement evidence, exceptions, expiry, and review outcomes for this policy.


