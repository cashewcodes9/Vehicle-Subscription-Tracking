# Vehicle Subscription Tracking

A SAP Cloud Application Programming Model (CAP) application for managing vehicle subscriptions. Built with Node.js and deployed on SAP BTP Cloud Foundry with SAP HANA as the database.

## Live API

Base URL: `https://vehicle-subscription-tracking-srv-grateful-topi-fb.cfapps.us10-001.hana.ondemand.com/odata/v4/subscription`

| Endpoint | Description |
|---|---|
| `/Vehicles` | List all vehicles |
| `/Vehicles(ID='v-001')` | Get vehicle by ID |
| `/Subscriptions` | List all subscriptions |
| `/Subscriptions(ID='s-001')` | Get subscription by ID |
| `/Subscriptions?$expand=vehicle` | Subscriptions with vehicle details |
| `/$metadata` | OData metadata |

## Project Structure

| Folder | Purpose |
|---|---|
| `db/` | Domain model (`Schema.cds`) and seed data (`csv/`) |
| `srv/` | Service definition (`SubscriptionService.cds`) and business logic (`SubscriptionService.js`) |
| `manifest-db.yml` | CF deployment manifest for the HDI deployer |
| `manifest-srv.yml` | CF deployment manifest for the CAP service |

## Data Model

- **Vehicles** — brand, model, monthly rate, status (`available` / `subscribed` / `maintenance`)
- **Subscriptions** — links a customer to a vehicle with start date, duration, and total value

## Local Development

```bash
cds watch
```

Service runs at `http://localhost:4004/odata/v4/subscription`

## Deployment to SAP BTP Cloud Foundry

Prerequisites: CF CLI installed and logged in (`cf login -a https://api.cf.us10-001.hana.ondemand.com`)

```powershell
# 1. Create HANA HDI container (once)
cf create-service hana hdi-shared vehicle-subscription-tracking-db-hdi-container

# 2. Build and deploy
$env:CDS_ENV="production"
cds build
cf push -f manifest-db.yml
cf push -f manifest-srv.yml
```
