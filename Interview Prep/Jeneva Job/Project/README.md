# ERP Procurement System

A full-stack ERP Procurement Management System built with **Node.js**, **Express**, **TypeORM**, **PostgreSQL**, **React**, and **TypeScript**. This project demonstrates modern web development practices, clean code principles, and scalable architecture patterns.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Design Patterns](#design-patterns)
- [Skills Demonstrated](#skills-demonstrated)

## Overview

This ERP system manages the complete procurement workflow including:

- Material master data management
- Supplier management
- Purchase requisition creation and approval
- Purchase order generation and tracking
- Category and unit of measure management
- Warehouse management

## Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **TypeORM** - Object-Relational Mapper
- **PostgreSQL** - Relational database
- **dotenv** - Environment configuration

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Vite** - Build tool and dev server

## Features

### Master Data Management
- **Materials**: Manage material codes, descriptions, pricing, and stock levels
- **Categories**: Organize materials into categories
- **Units of Measure (UOM)**: Define measurement units
- **Warehouses**: Manage warehouse locations and details
- **Suppliers**: Maintain supplier information and contacts

### Procurement Process
- **Purchase Requests**: Create and approve purchase requisitions
- **Purchase Orders**: Generate POs from approved requests
- **Status Tracking**: Track document status throughout the workflow
- **Item Management**: Detailed line item tracking for requests and orders

## Architecture

### Backend Architecture

The backend follows a **layered architecture** with clear separation of concerns:

```
├── Entities (Data Models)
│   └── TypeORM decorators for database mapping
├── Services (Business Logic)
│   └── Reusable business operations
├── Controllers (Request Handlers)
│   └── HTTP request/response handling
├── Routes (API Endpoints)
│   └── RESTful route definitions
└── Config (Configuration)
    └── Database connection and settings
```

**Key Design Patterns:**
- **Repository Pattern**: Data access abstraction through TypeORM
- **Service Layer Pattern**: Business logic separated from controllers
- **Dependency Injection**: Services injected into controllers
- **Single Responsibility Principle**: Each class has one clear purpose

### Frontend Architecture

The frontend follows **React best practices** with modern design patterns:

```
├── Components (Presentational)
│   └── Reusable UI components
├── Pages (Container)
│   └── Page-level components with business logic
├── Hooks (Custom)
│   └── Reusable stateful logic
├── Contexts (State Management)
│   └── Global state with Context API
├── Services (API Layer)
│   └── HTTP client and API calls
└── Types (TypeScript)
    └── Type definitions and interfaces
```

**Key Design Patterns:**
- **Container/Presentational Pattern**: Separation of logic and UI
- **Custom Hooks Pattern**: Reusable stateful logic
- **Context Pattern**: Global state management
- **Service Layer Pattern**: API abstraction
- **Composition Pattern**: Component reusability

## Project Structure

```
Project/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── entities/
│   │   │   ├── Material.ts
│   │   │   ├── UnitOfMeasure.ts
│   │   │   ├── Category.ts
│   │   │   ├── Warehouse.ts
│   │   │   ├── Supplier.ts
│   │   │   ├── PurchasingRequest.ts
│   │   │   ├── PurchasingRequestItem.ts
│   │   │   ├── PurchasingOrder.ts
│   │   │   └── PurchasingOrderItem.ts
│   │   ├── services/
│   │   │   ├── BaseService.ts
│   │   │   ├── MaterialService.ts
│   │   │   ├── PurchasingRequestService.ts
│   │   │   └── ...
│   │   ├── controllers/
│   │   │   ├── MaterialController.ts
│   │   │   ├── PurchasingRequestController.ts
│   │   │   └── ...
│   │   ├── routes/
│   │   │   ├── index.ts
│   │   │   ├── material.routes.ts
│   │   │   └── ...
│   │   ├── utils/
│   │   │   └── ApiResponse.ts
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Layout.tsx
    │   │   ├── MaterialList.tsx
    │   │   └── ...
    │   ├── pages/
    │   │   ├── Dashboard.tsx
    │   │   ├── MaterialsPage.tsx
    │   │   └── ...
    │   ├── hooks/
    │   │   ├── useApi.ts
    │   │   ├── useMaterials.ts
    │   │   └── ...
    │   ├── contexts/
    │   │   └── AppContext.tsx
    │   ├── services/
    │   │   ├── api.ts
    │   │   ├── materialService.ts
    │   │   └── ...
    │   ├── types/
    │   │   └── index.ts
    │   ├── styles/
    │   │   └── index.css
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    └── index.html
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd Project/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=erp_procurement
```

4. Create the PostgreSQL database:
```sql
CREATE DATABASE erp_procurement;
```

5. Run the development server:
```bash
npm run dev
```

The backend will start on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd Project/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

### Building for Production

**Backend:**
```bash
cd Project/backend
npm run build
npm start
```

**Frontend:**
```bash
cd Project/frontend
npm run build
npm run preview
```

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Materials
- `GET /api/materials` - Get all materials
- `GET /api/materials/:id` - Get material by ID
- `POST /api/materials` - Create new material
- `PUT /api/materials/:id` - Update material
- `DELETE /api/materials/:id` - Delete material

#### Suppliers
- `GET /api/suppliers` - Get all suppliers
- `GET /api/suppliers/:id` - Get supplier by ID
- `POST /api/suppliers` - Create new supplier
- `PUT /api/suppliers/:id` - Update supplier
- `DELETE /api/suppliers/:id` - Delete supplier

#### Purchase Requests
- `GET /api/purchasing-requests` - Get all purchase requests
- `GET /api/purchasing-requests?status=PENDING` - Filter by status
- `GET /api/purchasing-requests/:id` - Get request by ID
- `POST /api/purchasing-requests` - Create new request
- `PUT /api/purchasing-requests/:id` - Update request
- `PATCH /api/purchasing-requests/:id/status` - Update status
- `DELETE /api/purchasing-requests/:id` - Delete request

#### Purchase Orders
- `GET /api/purchasing-orders` - Get all purchase orders
- `GET /api/purchasing-orders?status=CONFIRMED` - Filter by status
- `GET /api/purchasing-orders?supplierId=xxx` - Filter by supplier
- `GET /api/purchasing-orders/:id` - Get order by ID
- `POST /api/purchasing-orders` - Create new order
- `PUT /api/purchasing-orders/:id` - Update order
- `PATCH /api/purchasing-orders/:id/status` - Update status
- `DELETE /api/purchasing-orders/:id` - Delete order

#### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

#### Units of Measure
- `GET /api/unit-of-measures` - Get all UOMs
- `POST /api/unit-of-measures` - Create UOM
- `PUT /api/unit-of-measures/:id` - Update UOM
- `DELETE /api/unit-of-measures/:id` - Delete UOM

#### Warehouses
- `GET /api/warehouses` - Get all warehouses
- `POST /api/warehouses` - Create warehouse
- `PUT /api/warehouses/:id` - Update warehouse
- `DELETE /api/warehouses/:id` - Delete warehouse

### API Response Format

**Success Response:**
```json
{
  "success": true,
  "message": "Success",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message",
  "errors": { ... }
}
```

## Design Patterns

### Backend Patterns

1. **Service Layer Pattern**
   - Business logic encapsulated in service classes
   - Controllers remain thin and focused on HTTP concerns
   - Example: `MaterialService.ts`

2. **Repository Pattern**
   - TypeORM repositories abstract data access
   - Services work with repositories, not raw queries

3. **Base Service Pattern**
   - Common CRUD operations in `BaseService`
   - Specific services extend and add custom methods
   - Promotes DRY (Don't Repeat Yourself)

4. **Dependency Injection**
   - Services receive repository instances
   - Loose coupling between layers

5. **Response Wrapper Pattern**
   - Consistent API responses via `ApiResponse` utility
   - Standardized error handling

### Frontend Patterns

1. **Custom Hooks Pattern**
   - Reusable stateful logic (e.g., `useMaterials`, `useApi`)
   - Encapsulates data fetching and state management
   - Clean component code

2. **Container/Presentational Pattern**
   - Pages = Containers (handle logic and state)
   - Components = Presentational (pure UI)
   - Example: `MaterialsPage` (container) uses `MaterialList` (presentational)

3. **Context Pattern**
   - Global state management with `AppContext`
   - Avoids prop drilling
   - Clean component tree

4. **Service Layer Pattern**
   - API calls abstracted in service modules
   - Axios client wrapper for consistent error handling
   - Type-safe API methods

5. **Composition Pattern**
   - Small, reusable components
   - Compose complex UIs from simple parts

## Skills Demonstrated

### Required Skills ✓

✅ **React with Design Patterns**
- Container/Presentational components
- Custom hooks for reusable logic
- Context API for state management
- Functional components with TypeScript

✅ **TypeScript**
- Strong typing throughout the application
- Interfaces and type definitions
- Generic types in services and hooks
- Enum usage for constants

✅ **Clean Code & OOP Principles**
- Single Responsibility Principle
- DRY (Don't Repeat Yourself)
- Clear naming conventions
- Separation of concerns
- Inheritance (BaseService pattern)
- Encapsulation in services

✅ **API Design and Development**
- RESTful API architecture
- Consistent endpoint naming
- Proper HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Status code usage
- Request validation
- Error handling

✅ **Git Version Control**
- Project structure ready for Git
- `.gitignore` files configured
- Modular commits recommended

### Bonus Skills ✓

✅ **TypeORM & Prisma**
- TypeORM decorators and entities
- Relationships (OneToMany, ManyToOne)
- Migrations support
- Database abstraction

✅ **Node.js Backend Development**
- Express.js framework
- Middleware usage
- Environment configuration
- Error handling middleware

✅ **PostgreSQL Database**
- Relational database design
- Foreign keys and constraints
- Data types and indexes

## Object-Oriented Principles

### SOLID Principles Applied

1. **Single Responsibility Principle (SRP)**
   - Each controller handles one entity
   - Services focus on specific business logic
   - Utilities have single, clear purposes

2. **Open/Closed Principle (OCP)**
   - `BaseService` can be extended without modification
   - New services add functionality via inheritance

3. **Dependency Inversion Principle (DIP)**
   - Controllers depend on service abstractions
   - TypeORM repositories injected into services

4. **Interface Segregation Principle (ISP)**
   - TypeScript interfaces define contracts
   - Components receive only needed props

5. **Don't Repeat Yourself (DRY)**
   - Common CRUD in `BaseService`
   - Shared API client in frontend
   - Reusable hooks and components

## Clean Code Practices

- **Meaningful Names**: Clear, descriptive variable and function names
- **Small Functions**: Functions do one thing well
- **No Magic Numbers**: Constants defined for statuses and codes
- **Error Handling**: Comprehensive try-catch blocks
- **Consistent Formatting**: TypeScript and Prettier standards
- **Type Safety**: Full TypeScript coverage
- **Comments**: Code is self-documenting with clear naming

## Future Enhancements

- Authentication and authorization (JWT)
- Role-based access control
- Real-time notifications (WebSockets)
- File upload for material images
- Advanced reporting and analytics
- Email notifications
- Audit logging
- Unit and integration tests
- Docker containerization
- CI/CD pipeline

## License

This project is created for demonstration purposes.

## Author

Created as a portfolio project to demonstrate full-stack development skills with modern technologies and best practices.
