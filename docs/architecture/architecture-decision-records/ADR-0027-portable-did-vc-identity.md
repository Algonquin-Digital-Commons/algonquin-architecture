# ADR-0027: Portable W3C DID and Verifiable Credential Identity

> Standard: PSDC-DOC-001
> Document type: adr
> Status: Accepted
> Owner: PSDC Identity Working Group
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-09-25
> Governing decisions: ADR-0002, ADR-0010, ADR-0012, ADR-0013

> Date: 2026-09-16
> Scope: All PSDC identity, credential, client, academic and federation services
> Decision owner: PSDC founder; institutional privacy and legal approval required

## Context

Institutional accounts usually expire or change when a student graduates, transfers or
changes affiliation. PSDC cannot treat one institution's directory identifier as the
student's permanent identity, yet an institution must retain authority over enrolment,
employment, access, official records and credential issuance.

## Decision drivers

- students need portable proofs without a central PSDC identity provider;
- institutions must retain local authorization and records authority;
- disclosure must be minimized and revocation, expiry and recovery must work;
- issuer and verifier behavior must be interoperable and independently testable.

## Options considered

| Option | Benefit | Rejection or qualification |
|---|---|---|
| Institutional identity only | Mature and locally governed | Rejected as the portability layer because accounts are institution-bound. |
| One consortium identity provider | Uniform experience | Rejected because it creates a central authority and failure domain. |
| Public blockchain identity as authority | Portable global resolution | Rejected as mandatory; it leaks dependencies and does not grant institutional authorization. |
| Institutional identity plus W3C DID/VC portability | Separates local authority from portable claims | Accepted. |

## Decision

1. Institution-approved OIDC/OAuth, SAML where required, SCIM and WebAuthn remain the
   local authentication and account-lifecycle boundary.
2. W3C-compatible Decentralized Identifiers and Verifiable Credentials are mandatory
   PSDC portability contracts. A credential proves an issuer-signed claim; it never grants
   authorization by itself.
3. Each receiving institution creates or links a local account, verifies issuer trust,
   status, expiry, proof and subject binding, and evaluates its own admission policy.
4. Official records remain authoritative at the issuing institution. Portable credentials
   contain the minimum claims required and point to governed evidence when appropriate.
5. Credential schemas, issuer registry, status/revocation, consent, selective disclosure,
   wallet, recovery, account linking and transfer workflows require versioned contracts.
6. DID method and wallet product selection remain implementation gates. The selected method
   must support institutional and user-controlled identifiers, rotation, recovery, privacy,
   export and operation without a proprietary hosted resolver.

## Control flow

```text
institution account -> proofing -> DID binding -> signed credential -> student wallet
                                                              |
                                                              v
receiving verifier -> issuer/status/proof checks -> local account linking -> local policy
```

No verifier sends a credential to an unrelated party, stores the whole presentation when a
decision record is sufficient, or treats successful cryptographic verification as consent.

## Consequences

Students can retain verifiable proofs and personal work across institutions without a
central PSDC account. Institutions take on issuer-key protection, schema governance,
revocation/status availability, recovery and privacy obligations. Lost keys and correlation
risks become first-class operational concerns.

## Security, privacy, operations, cost and portability effects

Pairwise identifiers and selective disclosure SHOULD be used where supported. Issuer,
holder and verifier events are minimized; presentations containing protected claims follow
institution retention. Issuer signing keys are non-exportable where practical and separated
from online verification. Offline or cached status has a bounded freshness policy.

## Migration and rollback

Deployment starts with synthetic credentials, then a non-authoritative student pilot, then
approved credential classes. A legacy account remains usable during linking. Rollback stops
new issuance or verification for the affected schema, preserves signed audit evidence,
restores the prior verifier/schema version and never invalidates an official record merely
because a wallet is unavailable.

## Validation and acceptance evidence

- `ID-ADR-ACC-001`: reference credentials pass across two independent issuer/verifier
  implementations and altered signatures, issuers, audiences or subjects fail;
- `ID-ADR-ACC-002`: revoked and expired credentials fail within the declared status
  freshness interval while verifier outage follows a documented fail policy;
- `ID-ADR-ACC-003`: a valid credential does not create access until local policy approves;
- `ID-ADR-ACC-004`: account linking, unlinking, key rotation, recovery and transfer are
  rehearsed without changing the issuing institution's authoritative record;
- `ID-ADR-ACC-005`: privacy review shows that pairwise use and minimized disclosure do not
  create an unnecessary cross-service tracking identifier.

## Review triggers

Review when W3C specifications materially change, a DID method becomes unavailable,
correlation or recovery fails, regulation changes, or an institution cannot independently
verify credentials.

## Affected documents and gates

- [Identity Architecture](../../identity/Identity-Architecture.md)
- [KMS](../../security/KMS.md)
- [Technology Defaults and Alternatives](../../vision/13-Technology-Defaults-and-Alternatives.md)

Production issuance remains blocked on method selection, schema governance, issuer registry,
key ceremony, status service, wallet/recovery strategy and institutional approval.
