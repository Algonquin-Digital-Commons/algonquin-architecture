# Institution Deployment Contracts

Neutral contracts used to configure a complete institution-owned deployment.

- `deployment-manifest.schema.json` defines the public, signed configuration used
  by web, desktop and mobile clients.

The manifest contains public endpoints, OIDC client configuration, branding,
feature policy and trust/rollback metadata. It never contains client secrets,
provider credentials, session keys or infrastructure credentials. Canonical
serialization, signature envelope, fixtures and rotation tests remain to be added
before the contract is frozen as v1.

