# System Context

```text
          POST-SECONDARY DIGITAL COMMONS
 institution experience | neutral core | federation
                        |
           ALGONQUIN REFERENCE DEPLOYMENT
                        |
                     AC CLOUD
                        |
   ┌────────────────────┼──────────────────────┐
   │                    │                      │
  ACF                  AC AI              AC MEDIA FABRIC
   │                    │           ┌──────────┼─────────┐
   │                    │          Image Video 3D      4DGS
   └────────────────────┼──────────────────────┘
                        |
                   AC FEDIVERSE
                        |
       Social · Photos · Video · Communities · Blogs
                        |
                 ActivityPub Federation
```

## Ownership boundaries

Algonquin is the first deployment overlay, not a tenant embedded in core code.
Academic, Data, Developer, Communications, and Research are logical Commons
fabrics composed through these implementation systems until extraction is
justified.

- **AC Cloud** owns shared identity, control-plane services, service discovery,
  policy distribution, storage primitives, events, and observability.
- **AC AI** owns the AI gateway, model aliases, AI clients, inference policy,
  and AI-specific agents and APIs.
- **ACF** owns machine inventory, worker lifecycle, scheduling, compute runtimes,
  and capacity reporting.
- **AC Media Fabric** owns media assets, generation/transcoding pipelines,
  metadata, delivery, rights, and spatial media workflows for image, video, 3D,
  and 4DGS.
- **AC Fediverse** owns social applications, actors, ActivityPub inbox/outbox,
  federation, moderation, and federated media presentation.

## Cross-cutting capabilities

All systems consume shared identity and event contracts. Spatial support is a
cross-system capability: resources may carry spatial references, scenes, camera
poses, geometry, or temporal-spatial metadata without forcing every subsystem to
implement the same storage or rendering engine. ActivityPub federation is
centralized in AC Fediverse and exposed to other systems through versioned
contracts. Non-social compute, research, artifact, and service federation use the
owning capability contracts, explicit peer trust, and institution-first locality
ladder rather than ActivityPub.
