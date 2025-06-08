# Supply chain management system 🚚


## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.


## About

This project is a modular, full-stack Supply Chain Management System built to support logistics operations such as shipment tracking, quote requests, driver assignment, and admin oversight. It’s designed for multi-role usage including shippers, logistics vendors, fleet managers, and platform administrators.

It includes:
- A robust NestJS backend for API handling, business logic, and authentication
- A responsive Vue-based(Nuxtjs) frontend dashboard for managing and tracking logistics workflows
- Support for role-based access control (RBAC) to manage permissions for Admins, Shippers, Vendors and Drivers
- Modular architecture with clear separation of concerns, designed for easy scaling and future multitenancy

### 💫 Core Features
- Submit and respond to transport quote requests
- Manage shipment orders with pickup/delivery scheduling
- Status updates
- Admin panel for platform administrator, user i.e shipper and vendor 
- Clean API structure for future mobile app or third-party integrations

### 🧰 Tech Stack
- Backend: NestJS + PostgreSQL + DrizzleORM
- Frontend: Nuxtjs + NuxtUI + TailwindCSS
- Auth: JWT-based authentication (support for roles)
- Tracking: Google Maps API (optional)
- Notifications: (Planned) Twilio / SendGrid integration for alerts


## Roles 
<details>
<summary>👨‍💻Admin (Platform owner)</summary>
Internal user who oversees and manages everything on the platform.

#### Permissions:
- View and manage all data (users, quotes, shipments, vendors)
- Assign roles, reset passwords
- Access analytics and system logs
- Moderate content or disputes
</details>

<details>
<summary>👤 Shipper (Customer / Client)</summary>
A business or individual that needs to move goods from A to B.

#### Permissions:
- Request quotes
- Book and track shipments
- View shipment history and invoices
- Rate vendor service and leave feedback
- Manage own profile 
</details>

<details>
<summary>🚚 Vendor (Logistics partners)</summary>
A company that provides transportation services, owns vehicles, or subcontracts drivers.

#### Permissions:
- View and accept shipment requests
- Assign drivers to shipments
- Configure pricing logic
- Manage fleet and pricing (if allowed)
- Track performance metrics
- Manage their own team (dispatchers, drivers)
</details>

<details>
<summary>🚗 Driver</summary>
A field-level user responsible for transporting goods.

#### Permissions:
- View assigned shipments
- Update delivery status (e.g. picked up, in-transit, delivered)
- Upload proof of delivery (photo, signature)
- Receive route directions or location details
- Get payment summary 
</details>



### How onbaording works!
- Only admin can use the register endpoint. Once an admin is registered, the endpoint cannot be used anymore
- Admin invites shippers / Vendors, they receive an invite link and complete their profile as well as onboard their business
- Shippers and vendors can further team members

--- 
### Tasks

---
## 🚨 Status
This project is in active development. Contributions and forks are welcome!
