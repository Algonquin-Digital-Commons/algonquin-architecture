# Institution Deployment Contracts


> Standard: PSDC-DOC-001
> Document type: repository-index
> Status: Normative
> Owner: Algonquin Institution Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-11
> Governing decisions: none; index governed by repository policy

Neutral contracts used to configure a complete institution-owned deployment.

- `deployment-manifest.schema.json` defines the public, signed configuration used
  by web, desktop and mobile clients.

The v1 manifest contains public endpoints, OIDC client configuration, branding,
feature policy and trust/rollback metadata. It never contains client secrets,
provider credentials, session keys or infrastructure credentials.

Manifests use RFC 8785 JSON canonicalization and an external Ed25519 signature
envelope containing key ID, sequence, issued time, expiry, payload digest and
signature. Clients pin an institution trust root, reject expired or decreasing
sequences beyond the declared rollback window, retain the last valid manifest
for safe recovery, and expose validation failure without applying partial values.

Implementations SHALL provide valid, expired, tampered, rollback, key-rotation,
unknown-field and cross-institution fixtures and compatibility tests.

## Purpose

This index explains the purpose and placement of $dir and links readers to the authoritative documents it contains.

## Allowed contents

This directory belongs to $repo. It may contain scoped documentation, contracts, configuration examples, tests, and navigation links owned by this repository.

## Prohibited contents

It MUST NOT contain secrets, credentials, private infrastructure values, unrelated product source, copied institution overrides, or undocumented external dependencies.

## Owner

The owning role is $owner; accountable maintenance remains with RedjiJB until a second maintainer is appointed.

## Contents

- `deployment-manifest.schema.json`
- `README.md`

## References

- [Ecosystem documentation quality standard](https://github.com/Post-Secondary-Digital-Commons/psdc-architecture/blob/main/docs/standards/Ecosystem-Documentation-Quality-Standard.md)
- [Repository governance](https://github.com/Post-Secondary-Digital-Commons/psdc-architecture/blob/main/docs/governance/GitHub-Repository-Governance.md)

## Contribution and change control

Changes MUST use a pull request, preserve the repository boundary, update affected links and contracts, and pass the structural and substantive documentation audits before merge.
