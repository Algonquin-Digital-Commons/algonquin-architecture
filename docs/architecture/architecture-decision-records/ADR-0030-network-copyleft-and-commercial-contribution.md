# ADR-0030: Network Copyleft and Commercial Contribution

> Standard: PSDC-DOC-001
> Document type: adr
> Status: Accepted architecture direction; legal and copyright migration gated
> Owner: PSDC Architecture Maintainers and Open Source Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: ADR-0008, ADR-0023; supersedes ADR-0024

> Date: 2026-09-25
> Scope: PSDC-authored software, contracts, documentation, recognized participants, and institution forks
> Decision owner: Project founder; qualified legal review is required before relicensing or public release

## Context and decision drivers

PSDC must remain open source, self-hostable, forkable, and usable by institutions without a
vendor dependency. The project also intends that commercial operators return reusable
improvements rather than maintaining permanently private product forks.

These goals require two distinct mechanisms. An OSI-approved license cannot discriminate
against commercial activity. A public license may impose reciprocal source obligations, but
it cannot honestly be described as permissive when it does so, and network copyleft does not
automatically require a contributor to submit a pull request to PSDC. Certification,
consortium, trademark, shared-release, federation-service, or paid-support agreements can
separately require an upstream offer from organizations choosing those benefits.

## Considered options

| Option | Benefit | Material limitation | Decision |
|---|---|---|---|
| Apache-2.0 for every PSDC work | maximum reuse and patent clarity | commercial private modifications need not be published | rejected as the universal default |
| custom non-commercial or mandatory-upstream license | directly states the desired commercial restriction | is not OSI open source and creates compatibility uncertainty | prohibited for the open core |
| AGPL-3.0-or-later for every repository | strong network reciprocity | unsuitable for neutral contracts and can complicate client/store and library integration | rejected as universal |
| license by architectural boundary plus participation agreement | reciprocity where software is operated, broad protocol adoption, and enforceable upstream offers for recognized participants | requires inventory, careful boundaries, and legal administration | accepted |

## Decision

PSDC adopts the following target licensing matrix for new PSDC-authored material:

| Material | Target license | Reason |
|---|---|---|
| network services and control-plane services, including scheduling, marketplace, settlement, storage authority, gateways, relays, and server-side identity services | AGPL-3.0-or-later | modified versions offered over a network must provide corresponding source to their users under the license conditions |
| distributed worker, agent, and command-line executables | GPL-3.0-or-later unless a distribution-channel compatibility decision selects another OSI license | distributed modifications remain reciprocal |
| mobile, desktop, and embedded client code | repository-specific OSI license selected after store, linking, and update-channel review; MPL-2.0 is the default candidate | file-level reciprocity avoids silently making store distribution impossible |
| protocols, JSON Schemas, API descriptions, conformance fixtures, SDK interface definitions, and interoperability examples | Apache-2.0 | independent implementation and federation must not require adoption of one server implementation |
| documentation authored by PSDC | Apache-2.0 unless the owning repository records an approved open-content license | reuse and institutional adaptation |
| imported or derived material | its exact upstream license | PSDC cannot unilaterally relicense third-party work |

The target matrix applies prospectively after repository-specific copyright, compatibility,
and release review. It does not retroactively relicense existing Apache-2.0 contributions.

Every organization that seeks recognized-participant status, including official
certification, consortium membership, PSDC marks, shared release infrastructure,
institution-to-institution federation services, or paid PSDC support, MUST sign a separate
Commercial and Institutional Participation Agreement. That agreement requires reusable
fixes, security remediations, accessibility improvements, performance work, protocol
extensions, and general-purpose integrations to be offered to the owning upstream repository
with tests and provenance. Protected records, credentials, secrets, institution-only policy,
and material the participant lacks authority to license are excluded.

Unaffiliated commercial users retain all rights granted by the applicable open-source
license. For AGPL-covered network services, they must meet the AGPL corresponding-source
obligation, but the public license alone does not require acceptance by or submission to
PSDC. PSDC MUST describe that boundary accurately.

## Required controls

- **LIC-0030-001:** Every release artifact MUST map to an SPDX expression, copyright owner,
  source commit, build graph, notices, and corresponding-source procedure.
- **LIC-0030-002:** AGPL services MUST expose a durable and obvious path by which interacting
  users can obtain the exact corresponding source for the running modified version.
- **LIC-0030-003:** A protocol, schema, conformance fixture, or interoperability test MUST NOT
  inherit service copyleft merely because it is consumed by an AGPL implementation.
- **LIC-0030-004:** Recognized-participant admission and renewal MUST verify the signed
  agreement, upstream-offer register, unresolved private patch list, and security exceptions.
- **LIC-0030-005:** PSDC trademarks and certification marks MUST NOT imply that an
  unrecognized deployment has passed conformance or contribution review.
- **LIC-0030-006:** No repository may change license until the legal/copyright gate records
  contributor consent or another valid relicensing basis and confirms dependency compatibility.

## Security, privacy, and sovereignty effects

Published source MUST be scrubbed of student data, institution secrets, private addresses,
keys, credentials, incident details, and site-only policy. A private security process may
delay public disclosure while a fix is coordinated, but it cannot be used to evade a source
obligation after the covered version is deployed. Open contracts preserve independent
implementability and institutional exit even when the reference service is copyleft.

## Operational and maintenance effects

Repository templates require license metadata, notice generation, SBOMs, source archives,
offer links, DCO sign-off, and a downstream patch queue. Maintainers must budget for upstream
review and release matching. If one implementation becomes unmaintainable, the Apache-2.0
contracts permit a replacement without copying its copyleft code.

## Consequences

Commercial operation remains permitted, while modified covered services incur real
corresponding-source duties and recognized participants incur a separate upstream-offer duty.
The cost is greater release, copyright, compatibility, and source-archive administration than
an Apache-only estate. The benefit is a reusable commons without closing federation protocols
or mislabeling a commercial restriction as open source.

## Migration and rollback

1. Inventory every PSDC-authored and imported file, contributor, license, generated artifact,
   link boundary, and distribution channel.
2. Classify repositories using the target matrix and record unresolved compatibility issues.
3. Obtain qualified legal review and the copyright permissions required for any relicensing.
4. Apply the target license only to repositories or future contributions with a documented
   legal basis; preserve prior versions and notices.
5. Add source-offer, SBOM, provenance, and participation-agreement release gates.
6. Rehearse a release and independent source rebuild before declaring migration complete.

If review fails, the affected repository remains under its existing valid license. Rollback
restores the last license-cleared artifact and source package; it never deletes prior notices,
source offers, or compliance evidence.

## Binary acceptance criteria

- **LIC-0030-ACC-001:** every released file and dependency resolves to an approved SPDX
  expression, immutable source, and required notice;
- **LIC-0030-ACC-002:** an external user can retrieve and rebuild the exact source for a
  deployed modified AGPL service without private tooling;
- **LIC-0030-ACC-003:** an independent implementation passes the Apache-licensed contract
  conformance suite without linking to PSDC service code;
- **LIC-0030-ACC-004:** a recognized commercial participant cannot receive or renew PSDC
  certification while an overdue reusable upstream offer remains unresolved;
- **LIC-0030-ACC-005:** confidential fixture data is rejected from source and contribution
  packages;
- **LIC-0030-ACC-006:** the release process blocks an incompatible dependency, missing source
  offer, or unapproved relicensing attempt.

## Change control and references

Changing the matrix, participant trigger, or reciprocal boundary requires a superseding ADR,
compatibility analysis, migration plan, and legal review. This ADR is an engineering decision,
not legal advice.

- [Open-Source License and Component-Boundary Policy](../../open-source/License-Policy.md)
- [Commercial and Institutional Upstream Contribution Policy](../../governance/Commercial-and-Institutional-Upstream-Contribution-Policy.md)
- [Fork Management](../../open-source/Fork-Management.md)
- [ADR-0024, superseded](ADR-0024-permissive-license-and-upstream-contribution.md)
- [Open Source Definition](https://opensource.org/osd)
- [OSI Open Source FAQ](https://opensource.org/faq)
- [GNU Affero General Public License v3](https://www.gnu.org/licenses/agpl-3.0.html)
