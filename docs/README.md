# Master Architecture Document Suite

This directory is the documentation source of truth for the tenant-neutral
Post-Secondary Digital Commons and its Algonquin reference deployment. As of
2026-09-10 it contains 423 accepted-baseline specifications whose implementation
detail remains incomplete, ADR-0001 through ADR-0024 (with ADR-0011 superseded),
constitutional architecture documents, system context and contract pages,
the full technology catalog, a gap analysis, and documentation governance.

## Reading order

1. `vision/constitutional/Post-Secondary-Digital-Commons-Architecture.md`
2. The remaining six domain constitutional architecture documents
3. `vision/00-Vision-and-Mission.md` through the technology catalogs
4. `architecture/` — system-wide logical, physical, API, event, tenancy,
   availability, and dependency architecture
5. The owning subsystem directory: Cloud, Compute, ACF, AI, Media, or Fediverse
6. Cross-cutting Security, Governance, Operations, Reliability, Testing, and
   Deployment documents
7. ADRs for decisions that materially constrain later work

## Sections

| Section | Accepted-baseline incomplete specifications |
|---|---:|
| Academic | 13 |
| ACF | 30 |
| AI | 27 |
| Architecture | 16 |
| Clients | 17 |
| Cloud | 14 |
| Compute | 12 |
| Data | 9 |
| Deployment | 12 |
| Developer | 16 |
| Economics | 10 |
| Fediverse | 20 |
| Governance | 13 |
| Identity | 13 |
| Institutional | 9 |
| Integration | 9 |
| Media and spatial/4DGS | 26 |
| Network | 15 |
| Open source | 10 |
| Operations | 13 |
| Product | 12 |
| Reliability | 10 |
| Roadmap | 13 |
| Runbooks | 14 |
| Security | 21 |
| Storage | 13 |
| Student life | 17 |
| Testing | 12 |
| Vision | 7 |

The Architecture count includes the incomplete `ADR-XXXX` template. Canonical
constitutional, policy, catalog, audit, gap-analysis, source-import, and README
documents are additional to these 423 incomplete specifications.

Use `Documentation-Architecture-Standard.md` when converting an accepted-baseline,
incomplete specification into an implementation-ready or approved document.

Use `architecture/Decision-Traceability-Matrix.md` and
`architecture/Standards-First-Coverage-Matrix.md` to verify that subsystem work
conforms to the accepted decisions.

The current counts and implementation gaps are maintained in
`roadmap/Ecosystem-Gap-Analysis-2026-09-10.md`; this index does not treat a file's
existence as implementation completion.
