# ERP Procurement System - Backend

Node.js/Express backend with TypeORM and PostgreSQL.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. Create database:
```sql
CREATE DATABASE erp_procurement;
```

4. Run development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000` and automatically create database tables.

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production server

## Database Schema

### Entities

- **UnitOfMeasure**: Units like KG, PCS, LTR
- **Category**: Material categories
- **Warehouse**: Storage locations
- **Supplier**: Vendor information
- **Material**: Material master data
- **PurchasingRequest**: Purchase requisitions
- **PurchasingRequestItem**: PR line items
- **PurchasingOrder**: Purchase orders
- **PurchasingOrderItem**: PO line items

### Relationships

- Material → UnitOfMeasure (Many-to-One)
- Material → Category (Many-to-One)
- PurchasingRequest → PurchasingRequestItem (One-to-Many)
- PurchasingRequestItem → Material (Many-to-One)
- PurchasingOrder → Supplier (Many-to-One)
- PurchasingOrder → PurchasingOrderItem (One-to-Many)
- PurchasingOrderItem → Material (Many-to-One)

## Architecture

```
src/
├── config/         # Database configuration
├── entities/       # TypeORM entities
├── services/       # Business logic layer
├── controllers/    # HTTP request handlers
├── routes/         # API route definitions
├── utils/          # Helper utilities
└── index.ts        # Application entry point
```

## API Testing

Use tools like Postman or curl to test endpoints.

Example - Create Material:
```bash
curl -X POST http://localhost:5000/api/materials \
  -H "Content-Type: application/json" \
  -d '{
    "code": "MAT001",
    "name": "Steel Plate",
    "categoryId": "uuid-here",
    "unitOfMeasureId": "uuid-here",
    "standardCost": 100.50,
    "stockQuantity": 50
  }'
```
