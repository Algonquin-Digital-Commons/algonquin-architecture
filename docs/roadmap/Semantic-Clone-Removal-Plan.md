# Semantic Clone Removal Plan

> Standard: PSDC-DOC-001
> Document type: roadmap
> Status: Active remediation plan
> Owner: PSDC Documentation Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: ADR-0001, ADR-0012, ADR-0020

## Purpose and baseline

The current ecosystem audit reports 1,505 findings across 1,289 documents: 879 repeated-text
findings and 626 probable subject-substitution findings. The architecture-repository-only run
after this contract wave reports 727 findings across 546 documents: 419 repeated-text and 308
probable subject-substitution findings. These are candidates, not proven defects. The goal is
one authoritative requirement per subject, deliberate reuse only where a shared control is
intended, and links instead of copied policy.

## Outcome and evidence

The outcome is a dated disposition register, consolidated authorities, repaired links, reviewed
allowlist, before/after semantic reports, and an evidence summary for each remediation phase.
Evidence records cluster IDs, files changed, owner, reviewer, tests, residual risk, and reasons
for every retained exact control.

## Dependencies

Remediation depends on the architecture authority map, document-quality standard, link checker,
semantic detector, contract portfolio, accepted ADRs, and Git history. Contract freeze depends
on resolving P0 clone clusters first; low-risk navigation cleanup does not block that work.

## Why synonym replacement is prohibited

Changing words to defeat a detector preserves architectural duplication and may change legal or
security meaning. Remediation must decide whether text is a valid shared control, a domain-owned
requirement, a historical quotation, navigation, generated material, or an accidental clone.

## Finding dispositions

| Disposition | Required action | Evidence |
|---|---|---|
| authoritative shared control | move the normative text to the owning standard and link from consumers | authority and consumer list |
| domain-specific requirement | rewrite from the subject's actors, interfaces, data, failures, and tests | owner approval and acceptance IDs |
| navigation or generated mirror | keep only if generation is deterministic and visibly non-authoritative | generator/provenance and staleness test |
| historical/source quotation | mark non-normative and preserve provenance | status and source citation |
| accidental semantic clone | merge into owner, replace copy with link/context, or delete obsolete file | link test and dependency search |
| suspected false positive | document why wording is an invariant that must remain exact | reviewed allowlist entry with expiry |

## Remediation workflow

1. Generate a dated, deterministic report containing file, line, signature, paired subjects,
   detector rule, and cluster identifier.
2. Cluster findings by shared text and owning domain rather than fixing files one at a time.
3. Select the authority using the architecture precedence rules and confirm downstream links.
4. Classify every cluster using the dispositions above. P0 conflicts block contract freeze.
5. Patch the authority first, then consumers, indexes, generators, and archived references.
6. Search for exact and semantic remnants, run link/quality/semantic tests, and review the diff
   for lost domain requirements.
7. Record closed count, allowlisted count, remaining risk, reviewer, and next tranche.

## Ordered phases and exit criteria

| Tranche | Scope | Exit condition |
|---|---|---|
| S0 | authority, ADR, P0 register, technology defaults, decisions register | zero contradictory controlling statements |
| S1 | identity, security, privacy, licensing, storage, network, production | one control owner and domain-specific enforcement/evidence |
| S2 | compute, economics, data, federation, academic integrations | no copied policy redefining cross-domain behavior |
| S3 | clients, AI, media, social, spatial, operations | product documents consume contracts instead of cloning platform policy |
| S4 | maps, READMEs, roadmaps, imports, historical records | navigation accurate; provenance clearly non-normative |

## Regression controls

CI compares the semantic report with a reviewed baseline. New high-confidence P0 clones fail
review. An allowlist entry records signature, files, justification, owner, approval, and expiry;
path-only or permanent blanket exclusions are prohibited. Templates contain prompts and links,
not generic normative paragraphs that propagate semantic clones.

## Safety and change management

Before deleting or consolidating a document, search inbound links, generators, tests, release
automation, and repository consumers. Preserve history through Git and supersession notes.
Never delete the only statement of a requirement merely because it resembles another file.

## Risks and mitigations

The principal risks are deleting a unique requirement, breaking inbound links, obscuring source
history, changing security/legal meaning, and gaming the detector with synonyms. Mitigations are
cluster-level ownership review, dependency search, Git-preserved history, subject-matter review,
explicit dispositions, and before/after sampling. A phase rolls back if it raises ambiguity or
removes acceptance evidence.

## Acceptance criteria

- **SEM-ACC-001:** all S0 and S1 findings have a reviewed disposition and no unresolved
  cross-domain authority conflict;
- **SEM-ACC-002:** the total count trends downward without synonym-only rewrites or disabled
  detection;
- **SEM-ACC-003:** every remaining exact shared control maps to one authority or a time-bounded
  reviewed allowlist entry;
- **SEM-ACC-004:** structural and link tests pass after each cluster consolidation;
- **SEM-ACC-005:** random samples retain subject-specific interfaces, failure behavior, and
  acceptance evidence after consolidation;
- **SEM-ACC-006:** no generator or template recreates a removed clone.

## References

- [Architecture Authority and Precedence](../architecture/Architecture-Authority-and-Precedence.md)
- [Documentation Debt Plan](Documentation-Debt-to-Implementation-Grade-Plan.md)
- [AI Documentation Review Rubric](../standards/AI-Documentation-Review-Rubric.md)
