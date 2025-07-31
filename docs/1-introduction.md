
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


