# Commercial and Institutional Upstream Contribution Policy


> Standard: PSDC-DOC-001
> Document type: policy-standard
> Status: Accepted
> Owner: Algonquin Institution Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Governing decision: ADR-0024

PSDC is permissively licensed so institutions, researchers, students and
businesses can adopt it without a mandatory vendor relationship. The project asks
all downstream users to return reusable fixes, security improvements,
accessibility work, integrations and performance improvements to the owning
Commons repository.

## Required for recognized participants

An organization seeking official PSDC certification, consortium membership,
shared release infrastructure, use of Commons certification marks or paid project
support must sign a separate participation agreement requiring it to:

1. identify generally useful modifications;
2. offer those modifications upstream under the repository's inbound license;
3. provide reproducible tests and required security information;
4. disclose incompatible private patches in its compatibility report; and
5. preserve confidential institutional data and secrets when contributing.

This obligation comes from the participation agreement, not the Apache-2.0 public
license. General users who have not signed such an agreement are strongly
encouraged—but not legally compelled—to contribute modifications.

## Fork policy

- Prefer an upstream issue/design proposal before implementation.
- Keep branding, domains, IdP/LMS mappings and local policy in the institution
  deployment repository.
- Maintain a documented downstream patch queue and maximum divergence budget.
- Never send student records, credentials, private configuration or other
  institution-protected information upstream.
- Route vulnerability details through the private security process before public
  disclosure.

## Terminology

Changes move **upstream** from an institution or business fork to the canonical
Commons repository. Commons releases then flow **downstream** to institution
forks.

## Purpose

This policy defines the required outcome, actors, and decision boundary for **Commercial-and-Institutional-Upstream-Contribution-Policy**. It applies to all implementations and institution overlays that claim conformance.

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
