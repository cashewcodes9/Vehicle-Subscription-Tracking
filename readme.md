# Vehicle Subscription Tracking

A SAP Cloud Application Programming Model (CAP) application for managing vehicle subscriptions. Built with Node.js and deployed on SAP BTP Cloud Foundry with SAP HANA as the database.

## Live API

Base URL: `https://vehicle-subscription-tracking-srv-grateful-topi-fb.cfapps.us10-001.hana.ondemand.com/odata/v4/subscription`

| Description | URL |
|---|---|
| List all vehicles | [/Vehicles](https://vehicle-subscription-tracking-srv-grateful-topi-fb.cfapps.us10-001.hana.ondemand.com/odata/v4/subscription/Vehicles) |
| Get vehicle by ID | [/Vehicles(ID='v-001')](https://vehicle-subscription-tracking-srv-grateful-topi-fb.cfapps.us10-001.hana.ondemand.com/odata/v4/subscription/Vehicles(ID='v-001')) |
| List all subscriptions | [/Subscriptions](https://vehicle-subscription-tracking-srv-grateful-topi-fb.cfapps.us10-001.hana.ondemand.com/odata/v4/subscription/Subscriptions) |
| Get subscription by ID | [/Subscriptions(ID='s-001')](https://vehicle-subscription-tracking-srv-grateful-topi-fb.cfapps.us10-001.hana.ondemand.com/odata/v4/subscription/Subscriptions(ID='s-001')) |
| Subscriptions with vehicle details | [/Subscriptions?$expand=vehicle](https://vehicle-subscription-tracking-srv-grateful-topi-fb.cfapps.us10-001.hana.ondemand.com/odata/v4/subscription/Subscriptions?$expand=vehicle) |
| OData metadata | [/$metadata](https://vehicle-subscription-tracking-srv-grateful-topi-fb.cfapps.us10-001.hana.ondemand.com/odata/v4/subscription/$metadata) |

## Project Structure

| Folder | Purpose |
|---|---|
| `db/` | Domain model (`Schema.cds`) and seed data (`csv/`) |
| `srv/` | Service definition (`SubscriptionService.cds`) and business logic (`SubscriptionService.js`) |
| `manifest-db.yml` | CF deployment manifest for the HDI deployer |
| `manifest-srv.yml` | CF deployment manifest for the CAP service |

## Demo Screenshots

### List All Vehicles
![List All Vehicles](Demo%20Screenshots/index%20vehicles%20endpoint.png)

### Get Vehicle by ID
![Get Vehicle by ID](Demo%20Screenshots/view%20vehicle%20endpoint.png)

### Create Vehicle
![Create Vehicle](Demo%20Screenshots/Create%20Vehicle%20endpoint.png)

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
