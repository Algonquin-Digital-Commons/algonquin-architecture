# Documentation Consistency Audit — 2026-09-10

> Status: Complete current-state audit  
> Scope: Entire migration-source Markdown corpus and target polyrepo model  
> Method: Full-corpus pattern, link, status, and traceability checks plus manual review of canonical architecture, policy, stack, governance, roadmap, contracts, maps, and repository entry points

## Result

No known unresolved conflict remains between the current normative documents.
The corpus consistently selects OpenTofu plus Ansible, the tenant-neutral
Post-Secondary Digital Commons, sovereign institutional deployments,
institution-first federation, ActivityPub for the Social Fabric, the accepted
technology catalog, OpenWork's eligible MIT core as the desktop foundation,
Happy's MIT Expo app with a self-hosted E2EE relay as the mobile foundation, and
CA$30 per participating student-month as a planning
assumption rather than approved revenue.

This result does not mean the system is implemented. Incomplete specifications,
unfilled fields, unnamed accountable people, unmeasured thresholds, unpinned releases,
and outstanding external approvals are tracked as gaps rather than silently
presented as completed decisions.

## Normative precedence

1. The newest accepted ADR governs a decision and explicitly supersedes older ADRs.
2. Constitutional and consolidated architecture govern cross-system boundaries.
3. The Human Choices and Decisions Register governs accepted defaults and identifies
   the human/external authority still required.
4. Technology Defaults and Alternatives plus the Full Technology Stack catalog
   govern project-level technical selections.
5. Shared contracts govern exchanged shapes and compatibility.
6. Domain specifications add requirements without weakening higher-level rules.
7. Repository READMEs and Obsidian maps are navigation/summaries and link back to
   canonical documents.
8. Conversation exports and source-import records are provenance, not normative
   instructions.

## Conflicts resolved in this pass

| Conflict class | Earlier wording | Resolution |
|---|---|---|
| Infrastructure as code | Terraform briefly selected; generic IaC remained elsewhere | ADR-0017 supersedes ADR-0011; OpenTofu + Ansible and `infrastructure/opentofu/` are current everywhere |
| Stack decisions | Several documents still presented CNI, ingress, CI, GitOps, gateway, inference, desktop, and mobile defaults as undecided pairs | Register and reference documents now match the accepted defaults; alternatives are exit/evidence paths |
| Platform scope | Older pages described only an Algonquin-specific platform | Core is tenant-neutral Commons; Algonquin is the first sovereign deployment overlay |
| Fabric scope | Older diagrams showed only five systems | Five implementation repositories remain, while Academic, Data, Developer, Communications, and Research are explicit logical fabrics |
| Federation | Some pages implied ActivityPub was the only federation model | ActivityPub exclusively owns public social federation; compute, artifact, research, and service federation use separate trust/capability contracts |
| Placement | Older AI labels stopped at campus/self-hosted/user-edge | Labels are convenience profiles only; ADR-0013's full locality ladder and workload envelope govern placement |
| Identity | One taxonomy called Entra the broker | Keycloak is the broker; each institution's approved IdP is authoritative, with Entra expected for Algonquin production |
| ACF | Earlier wording implied only Algonquin machines and a repository “merge” | ACF integrates through contracts, supports explicit sovereign peers, and cannot claim capacity before the census/pilot |
| Open source | Terraform exception and ambiguous vendor reliance | OpenTofu restores the OSI baseline; Entra/Brightspace are isolated external authorities; Obsidian is optional |
| Web foundation | “Proposed” language could conflict with ADR-0009 | v0.6.5 is the selected baseline but remains blocked from import until provenance, license, security, accessibility, and ownership gates pass |
| Documentation status | Older foundation pages remained Draft/TBD; index claimed 435 placeholders and seven ADRs | Foundation pages now state accepted baseline plus incomplete evidence; index and gap counts are current |
| Vault location | Nested and root Obsidian locations were ambiguous | Root `.obsidian/` is canonical; the historical nested location is superseded |
| Desktop foundation | Generic Tauri default did not reflect the selected client | ADR-0018 selects a gated OpenWork MIT-core downstream; its current React/Electron shell is implementation-specific, `ee/` and hosted services are excluded, and Tauri is the replacement path |
| Mobile foundation | Generic Flutter default did not reflect the selected client | ADR-0019 selects the Happy MIT Expo/React Native baseline, an institution-controlled content-blind E2EE relay, and provider-neutral sessions |
| Shared platform name | Generic specifications and navigation still used Algonquin as the platform name | ADR-0020 selects Post-Secondary Digital Commons; Algonquin is now an explicitly labelled reference deployment |
| Client access | White-labelling had no canonical distribution/authentication flow | ADR-0021 defines signed deployment manifests/builds, institution OIDC and institution-owned endpoints without upstream-vendor accounts |
| Repository topology | The documentation treated one checkout as a permanent grand monorepo | ADR-0022 establishes independent product repositories plus a source-free workspace/vault coordinator |
| Social federation policy | ActivityPub ownership existed without a consolidated operating policy | Commons Social Fabric now has optional local-only operation, allowlist-first federation, local moderation, peer trust, user protection and readiness gates |

## Intentional conditions that are not conflicts

- ADR-0011 retains Terraform wording as a superseded historical record. ADR-0017
  is the only current IaC authority.
- Exact version selection remains open even when a project default is accepted.
- OpenStack is an accepted conditional capability, not a baseline deployment.
- Entra and Brightspace are proprietary external adapters for Algonquin production;
  open alternatives exist for institutions able to choose their authoritative
  IdP/LMS, but the platform cannot override College authority.
- Open WebUI v0.6.5 is a selected source baseline but has not been imported. Later
  Open WebUI source remains excluded from the open-source baseline.
- OpenWork and Happy are selected source foundations but have not been imported.
  Their exact commits, files, dependencies, cryptographic behavior, accessibility,
  security and maintenance remain gated; OpenWork `ee/` is intentionally ineligible.
- `Accepted baseline; specification incomplete` means the inherited decisions are
  settled while the document's measurable implementation content is not.
- The CA$30 student-month figure is accepted for planning arithmetic only and does
  not imply an approved fee, enrolment count, budget, revenue, or profit.
- A logical fabric does not automatically require another repository or service.

## Corpus checks

At the end of the pass:

- 587 Markdown files were included in link and consistency validation;
- 423 incomplete specifications link the current technology defaults and ADR-0017;
- zero decision-seeded status labels remain;
- zero Draft/TBD foundation statuses remain;
- zero active Terraform infrastructure directory references or directories remain;
- five `infrastructure/opentofu` directories exist;
- four valid draft JSON Schemas exist under `contracts/agent-sessions`;
- one valid draft institution deployment-manifest schema exists under `contracts/deployment`;
- zero broken Obsidian wiki links or relative Markdown links were found;
- zero duplicate Human Choices register IDs were found; and
- `git diff --check` found no whitespace errors (line-ending notices are warnings,
  not content conflicts).

## Still required

The documentation is internally aligned but not implementation-ready as a whole.
The remaining work is the gap analysis: stable commits and licenses, accountable
owners, exact releases and provider locks, versioned contracts and fixtures,
threat/data models, a deployable vertical slice, self-hosted CI, tests and recovery
evidence, ACF census, institutional adapters/approvals, and a second-institution
federation proof.

Re-run this audit whenever an ADR, stack default, architecture boundary, or
institutional authority changes.
