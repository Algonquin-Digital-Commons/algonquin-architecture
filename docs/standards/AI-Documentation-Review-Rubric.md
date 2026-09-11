# AI Documentation Review Rubric

> Standard: PSDC-DOC-001
> Document type: governance-standard
> Status: Normative
> Owner: PSDC Architecture Maintainer
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: PSDC-DOC-001 and repository governance

## Purpose

This rubric instructs a stronger reasoning model how to review a scoped ecosystem
document without mistaking headings, length, or confident prose for architectural
quality. It is the review companion to PSDC-DOC-001. The model MUST evaluate the
declared document type, inspect linked authorities, distinguish fact from
assumption, test cross-document consistency, and return evidence that a human can
verify. The rubric is an advisory review layer; the executable validators remain
the minimum structural and substantive gates.

## Applicability and review boundary

Apply this rubric to one document, a document family, or a cross-repository set.
The reviewer MUST identify the review scope before scoring: file paths, commit or
working-tree state, repository authority, applicable ADRs, and whether institution
overlays are included. A common document is reviewed for neutrality; an
institution document is reviewed for explicit overrides and preservation of the
common contract. The reviewer MUST NOT infer approval from an implementation that
the document does not authorize.

## Maturity

This rubric is an active governance standard for design-stage and implementation-
stage documentation. A review score is evidence about the document at the stated
commit; it is not a claim that the underlying software is production-ready. The
rubric itself is revised when review calibration or ecosystem governance changes.

## Review principles

1. **Evidence before confidence.** Treat a statement as a fact only when the
   document, linked source, test, decision, or repository state supports it.
2. **Mechanism before labels.** Require inputs, outputs, state, actors, trust
   boundaries, protocols, timing, and failure behavior rather than labels such as
   “secure,” “scalable,” or “federated.”
3. **Boundaries before breadth.** Reward explicit ownership and exclusions; do not
   reward a larger feature list that has no authority or dependency model.
4. **Consistency before elegance.** A locally polished document that contradicts
   an accepted contract or ADR fails the consistency gate.
5. **Uncertainty is data.** Mark unknowns, estimates, assumptions, and decisions
   still requiring human approval instead of silently filling them in.
6. **Institution sovereignty.** A common document MUST remain institution-neutral;
   a fork MAY tighten policy or set deployment values but MUST NOT silently change
   a shared contract.
7. **Open and replaceable core.** A required capability MUST have a self-hostable,
   open-source implementation path or an explicit accepted exception and exit plan.

## Scoring model

Score every applicable dimension from 0 to 4, then calculate the weighted score.
The reviewer MUST record `not_applicable` with a reason instead of awarding an
automatic four. Scores are evidence-based:

| Score | Meaning |
|---:|---|
| 0 | Absent, contradictory, or materially misleading. |
| 1 | Mentioned but vague, unowned, or not actionable. |
| 2 | Partly specified; important mechanics, boundaries, or evidence are missing. |
| 3 | Implementable and testable with minor omissions or bounded uncertainty. |
| 4 | Precise, internally consistent, operationally credible, and supported by evidence. |

| Dimension | Weight | What the model must verify |
|---|---:|---|
| Purpose, users, and outcomes | 10 | Why the subject exists, who uses it, desired measurable result, and decision context. |
| Scope, exclusions, and ownership | 15 | In-scope behavior, prohibited responsibilities, trust boundaries, accountable owner, and institution/common boundary. |
| Requirements and decisions | 15 | Normative requirements, invariants, selected defaults, decision status, alternatives, and change triggers. |
| Architecture and mechanics | 15 | Components, control/data flow, state, actors, protocols, inputs, outputs, timing, and lifecycle. |
| Interfaces and dependencies | 15 | Schemas, producers, consumers, versions, compatibility, external dependencies, and failure contracts. |
| Security, privacy, safety, and sovereignty | 10 | Threats, authorization, data classification, residency, retention, secrets, abuse controls, and open/self-hosted path. |
| Operations, capacity, and failure recovery | 10 | Deployment, observability, scaling limits, degradation, rollback, backup/restore, and operator runbook. |
| Verification and acceptance evidence | 5 | Tests, measurements, acceptance scenarios, evidence owner, and reproducibility. |
| Cross-document consistency and provenance | 5 | Links, ADR alignment, upstream commit/license evidence, terminology, and map freshness. |

Calculate `weighted_score = sum(dimension_score / 4 * weight)` over applicable
dimensions. A document is **strong** at 85–100, **reviewable** at 70–84,
**conditional** at 50–69, and **not ready** below 50. The numeric score NEVER
overrides a hard-fail condition.

## Hard-fail conditions

Set disposition to `reject` or `needs_human_decision` when any of these apply:

- the control block or declared document type is missing or misclassified;
- the document contradicts an accepted ADR, contract, security rule, or ownership
  boundary without recording a superseding decision;
- a required interface, data owner, trust boundary, or failure path is absent;
- a common document contains institution-specific secrets, hostnames, policy
  values, or branding as if they were portable requirements;
- an institution overlay silently weakens a common contract or safety control;
- a required provider, hosted service, license, or upstream source has no
  provenance, compatibility decision, self-hosted alternative, or exit path;
- the design grants an agent, client, or federated peer authority without explicit
  authorization, confirmation, audit, and revocation behavior;
- acceptance cannot be demonstrated by a named test, measurement, review, or
  reproducible evidence artifact;
- the reviewer cannot distinguish a known fact from an assumption that changes the
  architecture materially.

## Type-specific emphasis

The model MUST apply the declared type's emphasis in addition to the weighted
dimensions:

| Type | Required emphasis |
|---|---|
| Architecture specification | Component responsibilities, interfaces, data/state, trust boundaries, capacity, failure, security, and acceptance. |
| Architecture map | Authority, ownership edges, relationship semantics, source-of-truth links, and staleness rules. |
| Policy standard | Normative rules, enforcement, exception authority/expiry, audit evidence, and review cadence. |
| ADR | Context, decision, consequences, alternatives, migration, rollback, and supersession. |
| Product specification | Users, journeys, accessibility, privacy, success measures, and acceptance scenarios. |
| Contract specification | Version, owner, producer, consumer, compatibility, schemas, and conformance tests. |
| Roadmap | Outcome, dependency gates, phases, exit criteria, risks, evidence, and stop conditions. |
| Runbook | Trigger, prerequisites, diagnostic hypotheses, safe actions, rollback, escalation, and verification. |
| Provenance record | Upstream URL, immutable commit/tag, license, included/excluded files, import state, patch boundary, and maintenance owner. |
| Institution deployment profile | Institution, upstream, allowed overrides, identity, secrets handling, deployment evidence, and rollback. |
| Repository index | Purpose, allowed/prohibited contents, ownership, contents, references, and contribution/change control. |
| Template | Explicitly non-normative instructions and no accidental implementation authority. |

## Review protocol

The model MUST perform these passes in order:

1. **Inventory pass.** Read the control block, classify the type, record the
   repository and commit, collect local links, and identify governing ADRs and
   contracts.
2. **Requirement pass.** Extract every normative statement into a short list of
   obligations. For each obligation, identify actor, object, condition, authority,
   observable result, and missing evidence.
3. **Boundary pass.** Trace ownership, trust, data, control flow, dependencies,
   institution overlays, and prohibited bypasses. Check both the happy path and
   the failure path.
4. **Consistency pass.** Compare terminology, versions, defaults, links, ADRs,
   maps, contracts, and neighboring documents. Report contradictions separately
   from omissions.
5. **Evidence pass.** Test whether acceptance claims have a reproducible artifact,
   named owner, and pass/fail criterion. Do not accept “will be tested” as current
   evidence; mark it as a gap.
6. **Decision pass.** Produce the score, disposition, findings, unresolved human
   choices, and the smallest changes that would move the document to strong.

## Finding severity and disposition

Each finding receives one severity:

- `critical`: hard-fail or an unsafe/contradictory authority boundary;
- `high`: prevents implementation, interoperability, privacy/security review, or
  reliable operation;
- `medium`: material ambiguity or missing evidence that can be resolved before
  implementation approval;
- `low`: clarity, navigation, terminology, or maintainability improvement;
- `observation`: useful context that is not a defect.

Use one disposition: `accept`, `accept_with_conditions`, `revise`, `reject`, or
`needs_human_decision`. A reviewer MUST use `needs_human_decision` for choices
that change sovereignty, legal/licensing posture, institutional policy, data
residency, user authority, or irreversible migration behavior.

## Required review output

The stronger model MUST return machine-readable JSON or YAML with this shape,
followed by a concise human summary:

```yaml
review:
  rubric: PSDC-AI-DOC-001
  reviewed_at: YYYY-MM-DDThh:mm:ssZ
  scope:
    documents: []
    repositories: []
    commit_or_state: ""
  classification:
    document_type: ""
    confidence: 0.0
  result:
    weighted_score: 0
    disposition: accept|accept_with_conditions|revise|reject|needs_human_decision
    hard_fail: false
  dimensions:
    - name: ""
      score: 0
      weight: 0
      evidence: []
      gaps: []
  findings:
    - id: DOC-001
      severity: critical|high|medium|low|observation
      file: ""
      section_or_line: ""
      claim_or_excerpt: ""
      problem: ""
      why_it_matters: ""
      recommended_change: ""
      evidence_needed: ""
  contradictions: []
  human_decisions: []
  assumptions_and_uncertainty: []
  verification_plan: []
```

The model MUST cite file paths and headings or line numbers for findings, avoid
inventing implementation details, quote only the minimum text needed to locate a
claim, and distinguish observed evidence from inference. It MUST not rewrite a
decision silently while reviewing it.

## Human review and acceptance

An AI review is advisory until a human maintainer accepts the disposition. A
maintainer MUST review every `critical` or `high` finding, every contradiction,
and every `human_decisions` item. The review record is accepted only when the
document owner confirms the corrections or records an explicit exception with
approver, expiry, compensating controls, and linked evidence.

## Calibration and change control

Reviewers should calibrate against at least one accepted architecture document,
one accepted policy, one accepted ADR, one institution overlay, and one known
failure case before judging a large corpus. The rubric changes only through a
reviewed governance change; changes to weights or hard-fail rules require a new
rubric identifier or an ADR explaining the compatibility impact.

## Definition of done

This rubric is implemented when a reviewer can reproduce the score from the
listed evidence, every finding maps to a file and section, hard-fail decisions are
explainable, human decisions are explicit, and the review output can be consumed
by a follow-up model or a human maintainer without rereading the entire corpus.

## Reviewer instruction

The following instruction can be supplied to a stronger model together with the
documents and repository context:

> Review the supplied Post-Secondary Digital Commons documents using
> `AI-Documentation-Review-Rubric.md` and `PSDC-DOC-001`. First inventory the
> declared type, repository, commit/state, links, ADRs, and contracts. Then run
> the inventory, requirement, boundary, consistency, evidence, and decision
> passes in order. Do not fill gaps with plausible architecture. Mark facts,
> observations, inferences, assumptions, estimates, and unresolved human choices
> separately. Score every applicable dimension from 0–4, apply the weights, and
> enforce all hard-fail conditions. Check common neutrality versus institution
> overrides, upstream provenance and licensing, security/privacy, failure and
> rollback behavior, and acceptance evidence. Return the required JSON/YAML
> structure, cite file paths and headings or line numbers, and finish with the
> smallest correction set that would make the review acceptable. If evidence is
> unavailable, say exactly what artifact or human decision is needed.
