# Documentation Semantic Audit — 2026-09-11

> Standard: PSDC-DOC-001
> Document type: architecture-map
> Status: Active remediation record
> Owner: PSDC Architecture Maintainer
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: PSDC-DOC-001, PSDC-AI-DOC-001, and repository governance

## Purpose and reviewed scope

This audit replaces the earlier conclusion that passing metadata and heading
checks proved documentation completeness. It covers 1,261 Markdown documents in
the current workspace after excluding repository `CONTRIBUTING.md` files. The
review includes all common repositories and Algonquin forks and evaluates semantic
specificity, traceable requirements, repeated filler, and title-substitution
clones. It does not claim legal, privacy, security, or production approval.

## Method

The structural and type-specific baseline is produced by:

```powershell
./scripts/Test-Documentation.ps1
./scripts/Test-DocumentQuality.ps1 -ReportPath `
  ./common/psdc-architecture/docs/architecture/Documentation-Quality-Findings-2026-09-11.csv
```

The stronger semantic baseline is produced by:

```powershell
./scripts/Test-DocumentationSemantics.ps1 -ReportPath `
  ./common/psdc-architecture/docs/architecture/Documentation-Semantic-Findings-2026-09-11.csv
```

`AUDIT-SEM-001`: A zero-finding structural result MUST NOT be described as a
complete architecture review while the semantic report contains an unresolved
high-severity finding.

## Current result

| Gate | Result |
|---|---:|
| Structural links, JSON, and unresolved markers | Pass |
| Legacy control-block and heading audit | 0 findings |
| Documents in semantic audit | 1,261 |
| Semantic findings | 1,530 |
| Repeated substantive-content findings | 890 |
| Missing stable-requirement-identifier findings | 0 |
| Subject-substitution-clone findings | 640 |

A file may have more than one finding. These numbers describe the working-tree
snapshot produced after the first remediation tranche; the machine-readable CSV
is authoritative for the individual paths and clusters.

## Findings and consequences

The earlier corpus contained large document families whose content differed only
by title. For example, a capability such as adaptive tutoring could carry the same
interfaces, data, lifecycle, failure model, and acceptance text as an assignment
planner. Such documents cannot authorize compatible independent implementations
because the subject-specific state and behavior are absent.

Repeated cross-cutting controls are valid requirements but belong in an owning
standard and must be referenced with a subject-specific application. Copying them
into hundreds of files increases apparent length, obscures ownership, and allows a
heading checker to pass content that remains architecturally unspecified.

## Remediation completed in this tranche

- removed 745 repeated validator-padding bundles appended after references;
- removed 844 unsupported claims that no architecture choices remained;
- rewrote 14 common and 14 Algonquin incident runbooks with distinct triggers,
  diagnostic hypotheses, recovery actions, rollback conditions, and evidence;
- rewrote eight common and eight Algonquin governance policies with distinct
  rules, enforcement points, exceptions, and audit evidence;
- corrected special client, provenance, policy, governance, roadmap, and
  architecture-map classifications instead of padding them as architecture specs;
- synchronized common standards and constitutional documents into the Algonquin
  fork where no institution override was justified;
- replaced hard-coded “completed specification” counts in structural validation
  with an honest typed-document inventory.
- added subject-specific control contracts to 34 common and 34 Algonquin
  security and identity specifications, including stable controls and failure
  verification scenarios;
- added and synchronized the cross-cutting architecture baseline and domain
  control profiles, then replaced generated copies with explicit inheritance
  links;
- moved misplaced References sections to the terminal position and added stable
  local requirement identifiers to every normative document audited by the
  semantic checker.

## Ownership and dependency order

Common authorities are corrected before derived maps and Algonquin copies. The
architecture maintainer owns corpus sequencing; domain owners must validate
subject mechanics; security, privacy, licensing, and accessibility specialists
remain required at their release gates. Institution-specific values
stay in deployment bindings and do not repair a missing common contract.

Remediation proceeds in this order:

1. governance, constitutional architecture, contracts, identity, security,
   licensing, provenance, and operational runbooks;
2. cross-repository interfaces and dependency owners;
3. domain and component specifications, replacing clone families with explicit
   inputs, outputs, state, invariants, failure behavior, and acceptance mappings;
4. product, client, testing, roadmap, economics, and explanatory maps;
5. Algonquin overlay verification, contradiction review, and final corpus scoring.

## Source of truth and evidence

The source documents are PSDC-DOC-001 and PSDC-AI-DOC-001. The two CSV reports
are the current path-level evidence. Git history preserves the superseded audits
and the changes that created and removed the padding. This map summarizes those
records but does not replace them.

## Validation, staleness, and completion gate

This audit becomes stale whenever an in-scope Markdown file, the semantic checker,
or a governing standard changes. Refresh the reports, counts, and working-tree or
commit identity together. Completion requires zero unexplained semantic findings,
clean structural/type checks, authority-aware contradiction review, valid common
to institution synchronization, and accountable maintainer acceptance. Until
then, the correct project state is **documentation semantic remediation in
progress**, not “fully scoped” or “implementation-ready.”

## References

- [AI Documentation Review Rubric](../standards/AI-Documentation-Review-Rubric.md)
- [Ecosystem Documentation Quality Standard](../standards/Ecosystem-Documentation-Quality-Standard.md)
- [Specification Completeness Standard](./Specification-Completeness-Standard.md)
- [Legacy structural findings](./Documentation-Quality-Findings-2026-09-11.csv)
- [Semantic findings](./Documentation-Semantic-Findings-2026-09-11.csv)
