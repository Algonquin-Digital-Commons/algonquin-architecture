# Repository Access and Onboarding Policy


> Standard: PSDC-DOC-001
> Document type: policy-standard
> Status: Active
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: Applicable ADRs and repository governance

> Effective: 2026-09-11
> Applies to: Both PSDC GitHub organizations

## Principle

Joining a club is not equivalent to receiving write access. Public repositories
already let anyone read, fork, propose changes, and participate in public review.
Privileges are added only when a role requires them, for the shortest practical
duration, and without bypassing protected branches.

## Access model

| Person or team | GitHub access | Can push repository branches? | Can update protected `main`? | Intended use |
|---|---|---:|---:|---|
| Public participant | Public read/fork | Only in personal fork | No | Learn, test, report issues, submit pull requests |
| Organization member with no team | No additional organization grant | No | No | Membership identity only |
| `Club Members` team | Triage | No | No | Manage issues, labels, milestones and pull-request coordination |
| Trusted contributor | Prefer personal fork; temporary write only when justified | If explicitly granted | No | Sustained implementation without merge authority |
| `Maintainers` team | Maintain | Yes, except protected refs | No during bootstrap | Repository operations and review preparation |
| `RedjiJB` | Organization owner and allowed protected-branch actor | Yes through pull requests | Yes through pull requests | Bootstrap governance authority |

Do not give a student, volunteer, vendor, or ordinary club participant the
organization Owner role. Do not use repository Admin as a substitute for a
missing workflow. Do not add a person to `Maintainers` merely so they can clone a
public repository.

## Onboarding procedure

1. Confirm the person's identity and institutional or community relationship.
2. Require two-factor authentication before organization membership.
3. Start with public participation or the `Club Members` triage team.
4. Have code contributors work from personal forks and pull requests whenever
   possible; this needs no organization write permission.
5. Grant temporary repository-specific write only when personal forks cannot
   support a documented workflow.
6. Promote to `Maintainers` only after sustained contribution, security training,
   license/provenance understanding, and explicit owner approval.
7. Record who approved elevated access, its purpose, scope and review date.
8. Review membership and elevated access at least once per academic term.

## Protected-branch authority

During the single-owner bootstrap phase, only `RedjiJB` is in the protected-main
push restriction. A maintainer may prepare and review work but cannot merge it.
This prevents a newly added or compromised maintainer account from replacing
canonical history.

When a second accountable maintainer is appointed:

1. verify 2FA and recovery procedures;
2. add both accountable maintainers to a dedicated protected-branch team;
3. require one approval and code-owner review;
4. prohibit the pull-request author from supplying the decisive approval;
5. add stable self-hosted CI status checks; and
6. test ordinary change, emergency recovery and maintainer-removal scenarios.

## Security and content controls

All current repositories use secret scanning and push protection, dependency
vulnerability alerts, automated security fixes, private vulnerability reporting,
web commit signoff, protected `main`, and disabled repository wikis. Security
reports containing exploit details or personal information must use private
vulnerability reporting rather than a public issue.

These controls reduce risk but do not replace human review. Push protection can
miss novel credentials, dependency automation can propose unsafe upgrades, and a
repository owner can still perform high-impact administrative actions.

## Offboarding and incident response

When access is no longer required or an account may be compromised:

1. remove the person from elevated teams immediately;
2. remove repository-specific grants and active invitations;
3. revoke deploy, signing, package, runner and environment credentials outside
   GitHub as separate actions;
4. inspect audit logs, branches, tags, releases, webhooks, applications and recent
   permission changes;
5. rotate any secret the account could access;
6. review unmerged and recently merged work; and
7. record the incident or routine offboarding outcome without exposing protected
   personal or security data.

Removing GitHub membership alone does not revoke credentials copied to another
system. Offboarding is complete only when every trust boundary has been checked.

## Bootstrap exceptions

- `RedjiJB` is the only accountable maintainer, so an independent approval is not
  yet technically enforceable without blocking owner-authored changes.
- CODEOWNERS enforcement activates when a second accountable maintainer is
  appointed; activating it sooner would make owner-authored changes unmergeable.
- Self-hosted CI status checks and signed releases are not implemented.
- Organization-wide 2FA enforcement is active in both organizations and remains
  a prerequisite for every future member.
- Protected release-tag and environment-deployment policies remain to be defined
  before publishing executable artifacts.

## Enforcement

PSDC Architecture Maintainers MUST enforce **Repository Access and Onboarding Policy** at the declared policy, identity, repository, gateway, deployment, or moderation enforcement points. A request or change that does not satisfy the normative requirements MUST be denied or quarantined with a stable reason code. Enforcement decisions MUST be attributable, fail closed for authorization failures, and remain independently testable without relying on a proprietary service.

## Exceptions

An exception to **Repository Access and Onboarding Policy** requires a written reason, affected scope, risk assessment, compensating control, approving role, start date, and expiry date. The subject owner MUST NOT self-approve a high-impact exception. Expired exceptions MUST stop applying automatically; renewal requires new evidence and review.

## Audit evidence

Conformance evidence for **Repository Access and Onboarding Policy** MUST record the policy version, actor or service, decision, reason code, affected object or boundary, timestamp, outcome, and reviewer where applicable. Evidence MUST minimize protected data, be access-controlled, be exportable to the institution, and be retained according to the governing data policy. The owner MUST be able to demonstrate both an allowed and a denied case.

## Acceptance and review

The policy is accepted only when positive, negative, authorization, exception-expiry, audit-retrieval, failure, and recovery tests pass for **Repository Access and Onboarding Policy**. PSDC Architecture Maintainers MUST review it at least annually and whenever an ADR, contract, threat model, legal requirement, or material incident changes its assumptions. Review output MUST record the decision, evidence, and next review trigger.
