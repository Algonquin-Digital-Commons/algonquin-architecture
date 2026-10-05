# ActivityPub Contract Profile


> Standard: PSDC-DOC-001
> Document type: repository-index
> Status: Normative
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: none; index governed by repository policy

PSDC social implementations conform to W3C ActivityPub and ActivityStreams 2.0,
WebFinger and NodeInfo. The portable profile requires Person, Group, Service and
Application actors; Note, Article, Image, Video, Audio and Event objects; and
Create, Update, Delete, Follow, Accept, Reject, Undo, Like, Announce, Add, Remove,
Block and Flag activities when supported by the declared capability document.

Extensions use globally unique HTTPS context terms, remain ignorable by receivers,
and never replace a standard field. Delivery authenticates the remote actor,
checks freshness and replay, applies local federation and moderation policy,
deduplicates by activity ID, bounds body and media size, and records an auditable
decision. Delete and Undo propagate according to protocol and local retention law.

Every server publishes its supported profile, moderation contact, actor domain,
media policy and capability limits and passes the common controlled-peer,
signature, replay, deletion, block, report and failure-isolation suite.

## Purpose

This index explains the purpose and placement of $dir and links readers to the authoritative documents it contains.

## Allowed contents

This directory belongs to $repo. It may contain scoped documentation, contracts, configuration examples, tests, and navigation links owned by this repository.

## Prohibited contents

It MUST NOT contain secrets, credentials, private infrastructure values, unrelated product source, copied institution overrides, or undocumented external dependencies.

## Owner

The owning role is $owner; accountable maintenance remains with RedjiJB until a second maintainer is appointed.

## Contents

- `.gitkeep`
- `README.md`

## Contribution and change control

Changes MUST use a pull request, preserve the repository boundary, update affected links and contracts, and pass the structural and substantive documentation audits before merge.

## References

- [Ecosystem documentation quality standard](https://github.com/Post-Secondary-Digital-Commons/psdc-architecture/blob/main/docs/standards/Ecosystem-Documentation-Quality-Standard.md)
- [Repository governance](https://github.com/Post-Secondary-Digital-Commons/psdc-architecture/blob/main/docs/governance/GitHub-Repository-Governance.md)

