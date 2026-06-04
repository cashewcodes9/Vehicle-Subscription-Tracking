# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

Start the CAP development server (watches for changes and hot-reloads):

```
cds watch
```

This can also be run via VS Code: **Terminal > Run Task > cds watch**.

## Architecture

This is a **SAP Cloud Application Programming Model (CAP)** project for tracking vehicle subscriptions.

- **[db/Schema.cds](db/Schema.cds)** — Domain model. Defines two entities:
  - `Vehicles` — vehicle catalog with brand, model, monthly rate, and an enum `status` (`available`, `subscribed`, `maintenance`)
  - `Subscriptions` — links a vehicle (via Association) to a customer with start date, duration, and total value
- **[srv/SubscriptionService.cds](srv/SubscriptionService.cds)** — Exposes both entities as OData projections through `SubscriptionService`
- **app/** — UI frontend content (not yet created)

The `namespace` for domain entities is `my` (referenced in the service as `my.Vehicles`, `my.Subscriptions`). When adding new entities in `db/`, use `namespace my;` at the top of the file or prefix entities with `my.` in service definitions.
