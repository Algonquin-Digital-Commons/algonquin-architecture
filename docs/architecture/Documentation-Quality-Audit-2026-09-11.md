# Documentation Quality Audit — 2026-09-11

> Standard: PSDC-DOC-001
> Document type: architecture-map
> Status: Active
> Owner: PSDC Architecture Maintainer
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: PSDC-DOC-001 and repository governance

## Purpose and scope

This record reports the first substantive audit using `PSDC-DOC-001`. It covers
the workspace Markdown corpus, the ten institution-neutral repositories, and
the ten Algonquin institution repositories. It is an audit of documentation
maturity, not evidence that product implementation is complete.

## Method and evidence

Run from `C:\Users\jredj\dev\psdc`:

```powershell
./scripts/Test-DocumentQuality.ps1 -ReportPath ./common/psdc-architecture/docs/architecture/Documentation-Quality-Findings-2026-09-11.csv
```

The checker validates the PSDC-DOC-001 control block, declared document type,
type-specific required content, minimum substantive length for implementation-
authorizing documents, and normative language. The CSV is the machine-readable
finding set for this run.

## Baseline result

| Measure | Result |
|---|---:|
| Markdown documents scanned | 1,273 |
| Findings | 1,216 |
| Affected repository groups | 4 |
| Structural/link gate | Separate `Test-Documentation.ps1` check |
| Enforcement mode | Not enabled until the remediation queue is zero |

The result is intentionally non-green. The prior marker-only audit could report
clean while a document still lacked interfaces, dependencies, failure behavior,
acceptance evidence, or policy enforcement. PSDC-DOC-001 now exposes those gaps.
The current report reflects a full run that consumed all validator output before
writing the CSV; piping the validator through an early-select command can leave a
stale report file.

## Finding concentration

- **Algonquin institution repositories:** 905 findings. These are expected to
  converge through the same upstream remediation and institution-specific fork
  synchronization; they are not a reason to weaken the common standard.
- **Common architecture repository:** 311 findings, concentrated in older
  policy, constitutional, client, and technology documents that predate the
  executable document-type taxonomy.
- **Commons AI:** 0 findings. Its architecture pages, roadmap, repository index,
  ecosystem map, and migration provenance pointer now meet PSDC-DOC-001.
- **Commons Web:** 0 findings. Client architecture, release operations, product
  scope, browser security, and Open WebUI provenance now meet PSDC-DOC-001.
- **Commons Desktop and Mobile:** upstream provenance records now include
  explicit immutable commit, license, included/excluded boundary, and import
  state sections; their remaining work is covered by the common audit when
  downstream synchronization is performed.

## Remediation order

1. Complete the remaining common architecture policy and constitutional records: enforcement,
   exception approval/expiry, audit evidence, alternatives, migration, and
   acceptance sections.
2. Synchronize the accepted common changes into Algonquin forks with a
   non-destructive upstream merge and preserve institution overlays.
3. Re-run the audit, inspect every CSV row, and resolve broken links and
   conflicting accepted ADRs.
4. Enable `-Enforce` in local/CI gates only after the finding set is empty or
   every remaining item is explicitly classified as an approved historical
   exception with an expiry date.

## Completion rule

Documentation is fully scoped only when every current document has the right
type, every implementation-authorizing document meets its type requirements,
maps point to authoritative specifications, provenance is reproducible, and
the structural and substantive audits pass. Empty headings, generic boilerplate,
and unreviewed “not applicable” statements do not satisfy this rule.

## References

- [Ecosystem documentation quality and scope standard](../standards/Ecosystem-Documentation-Quality-Standard.md)
- [Specification completeness standard](./Specification-Completeness-Standard.md)
- [Machine-readable findings](./Documentation-Quality-Findings-2026-09-11.csv)
- [Workspace documentation test](../../../../scripts/Test-DocumentQuality.ps1)

## Scope and exclusions

The map covers only the documents, repositories, capabilities, and relationships explicitly named here. It excludes secrets, private infrastructure values, undocumented vendor commitments, and requirements that belong in an owning specification.

## Ownership boundaries

The owning repository remains authoritative for each capability and contract. This map may summarize and link, but it MUST NOT redefine a product boundary, institution policy, or signed deployment value. Cross-repository changes require the owning ADR or contract update.

## Dependency and relationship semantics

A relationship means a declared contract, event, protocol, deployment dependency, or navigation link; it does not mean shared database or filesystem access. Producers and consumers MUST use the referenced versioned contract, and circular synchronous dependencies require an accepted ADR.

## Validation and staleness

The map is valid only while links resolve, referenced control blocks and versions remain current, and no newer accepted ADR contradicts the summary. Run Test-Documentation.ps1 and Test-DocumentQuality.ps1; stale or contradictory entries MUST be corrected, superseded, or marked historical with an owner and expiry.
