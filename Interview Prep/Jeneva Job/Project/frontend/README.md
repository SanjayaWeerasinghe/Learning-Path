# ERP Procurement System - Frontend

React + TypeScript frontend with Vite.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

The app will start on `http://localhost:3000`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Features

### Pages

- **Dashboard**: Overview with quick links
- **Materials**: Material master data management
- **Suppliers**: Supplier management
- **Purchase Requests**: PR creation and approval
- **Purchase Orders**: PO generation and tracking
- **Master Data**: Categories, UOMs, Warehouses

### Design Patterns

1. **Custom Hooks**
   - `useApi` - Generic API data fetching
   - `useMaterials` - Material-specific operations
   - `usePurchasingRequests` - PR operations
   - `usePurchasingOrders` - PO operations

2. **Context API**
   - `AppContext` - Global application state

3. **Container/Presentational**
   - Pages (MaterialsPage) = Containers
   - Components (MaterialList) = Presentational

4. **Service Layer**
   - All API calls abstracted in service modules
   - Centralized axios client with interceptors

## Project Structure

```
src/
├── components/     # Presentational components
├── pages/          # Container components
├── hooks/          # Custom React hooks
├── contexts/       # Context providers
├── services/       # API service layer
├── types/          # TypeScript definitions
├── styles/         # CSS styles
├── App.tsx         # Main app with routing
└── main.tsx        # Entry point
```

## TypeScript

Full TypeScript coverage with:
- Interface definitions for all entities
- Type-safe API calls
- Enum types for statuses
- Generic hooks

## Styling

Responsive CSS with:
- Mobile-first design
- Grid layouts
- Flexbox
- Clean, modern UI
