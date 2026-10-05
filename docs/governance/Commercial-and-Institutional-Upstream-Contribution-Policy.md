# Commercial and Institutional Upstream Contribution Policy


> Standard: PSDC-DOC-001
> Document type: policy-standard
> Status: Normative
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: ADR-0030

> Governing decision: ADR-0030; ADR-0024 is superseded

PSDC remains OSI open source so institutions, researchers, students, and businesses
can adopt it without a mandatory vendor relationship. Service copyleft requires
corresponding source where its license applies; recognized commercial and
institutional participants also have a contractual duty to offer reusable fixes,
security improvements, accessibility work, integrations, and performance
improvements to the owning Commons repository.

## Required for recognized participants

An organization seeking official PSDC certification, consortium membership,
shared release infrastructure, use of Commons certification marks or paid project
support must sign a separate participation agreement requiring it to:

1. identify generally useful modifications;
2. offer those modifications upstream under the repository's inbound license;
3. provide reproducible tests and required security information;
4. disclose incompatible private patches in its compatibility report; and
5. preserve confidential institutional data and secrets when contributing.

This upstream-offer obligation comes from the participation agreement, not from a
commercial-use restriction in the public license. General users who have not
signed such an agreement still obey the applicable Apache, MPL, GPL, or AGPL
license. AGPL corresponding-source compliance is not the same thing as submitting
or assigning a contribution to PSDC.

## Commercial participant lifecycle

The agreement defines the recognized participant, covered products and services,
upstream repositories, review cadence, confidential exclusions, contribution
license, security-disclosure path, cure period, dispute process, and consequences
for certification, marks, federation services, shared release access, or support.
It must not purport to revoke open-source rights the participant already received.

An upstream offer contains the source change, provenance, applicable license,
tests, migration impact, security context, and enough documentation for review.
PSDC may accept, request revision, or reject the proposal without erasing the
participant's duty to make the offer. Institution secrets and protected records
must be removed before submission.

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

## Enforcement

**GOV-CAIUCP-001:** PSDC Architecture Maintainers MUST enforce **Commercial and Institutional Upstream Contribution Policy** at the declared policy, identity, repository, gateway, deployment, or moderation enforcement points. A request or change that does not satisfy the normative requirements MUST be denied or quarantined with a stable reason code. Enforcement decisions MUST be attributable, fail closed for authorization failures, and remain independently testable without relying on a proprietary service.

## Exceptions

An exception to **Commercial and Institutional Upstream Contribution Policy** requires a written reason, affected scope, risk assessment, compensating control, approving role, start date, and expiry date. The subject owner MUST NOT self-approve a high-impact exception. Expired exceptions MUST stop applying automatically; renewal requires new evidence and review.

## Audit evidence

Conformance evidence for **Commercial and Institutional Upstream Contribution Policy** MUST record the policy version, actor or service, decision, reason code, affected object or boundary, timestamp, outcome, and reviewer where applicable. Evidence MUST minimize protected data, be access-controlled, be exportable to the institution, and be retained according to the governing data policy. The owner MUST be able to demonstrate both an allowed and a denied case.

## Acceptance and review

The policy is accepted only when positive, negative, authorization, exception-expiry, audit-retrieval, failure, and recovery tests pass for **Commercial and Institutional Upstream Contribution Policy**. PSDC Architecture Maintainers MUST review it at least annually and whenever an ADR, contract, threat model, legal requirement, or material incident changes its assumptions. Review output MUST record the decision, evidence, and next review trigger.

## Purpose

This policy defines the required outcome, actors, and decision boundary for **Commercial-and-Institutional-Upstream-Contribution-Policy**. It applies to all implementations and institution overlays that claim conformance.

## Scope

The scope covers the systems, people, data, interfaces, and lifecycle named by this policy. Local values may tighten these rules but MUST NOT weaken shared safety, privacy, or audit requirements.

## Normative rules

The requirements in this document are normative. Owners MUST implement them, SHOULD document justified risk trade-offs, and MUST NOT treat an example as an exemption.

