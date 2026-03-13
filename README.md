# Shop-Sphere Monorepo Setup Guide

A modern e-commerce platform built with Turborepo, PERN stack (PostgreSQL, Express, React, Node.js), and TypeScript.

## 📋 Prerequisites

- **Node.js**: v20+ ([Download](https://nodejs.org/))
- **pnpm**: v8+ (Install: `npm install -g pnpm`)
- **Docker**: For PostgreSQL database ([Download](https://www.docker.com/))

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start PostgreSQL Database

```bash
docker-compose up -d
```

This will start PostgreSQL on `localhost:5432` with:
- **Database**: `shop_sphere`
- **Username**: `postgres`
- **Password**: `postgres`

### 3. Push Database Schema

```bash
pnpm db:push
```

This uses Drizzle ORM to create the database tables.

### 4. Seed Database (Optional)

Create an admin user for testing:

```bash
cd apps/backend
pnpm db:seed
```

**Admin credentials:**
- Email: `admin@shop-sphere.com`
- Password: `admin123`

### 5. Start All Applications

```bash
pnpm dev
```

This will start:
- **Backend API**: http://localhost:3000
- **Admin Dashboard**: http://localhost:5173
- **Customer Shop**: http://localhost:5174

## 📁 Project Structure

```
Shop-Sphere/
├── apps/
│   ├── backend/          # Express.js API (Port 3000)
│   ├── admin/            # Admin dashboard (Port 5173)
│   └── user/             # Customer shop (Port 5174)
├── packages/
│   ├── shared/           # Shared types, Zod schemas, constants
│   ├── typescript-config/# Shared TypeScript configurations
│   └── eslint-config/    # Shared ESLint configurations
├── turbo.json            # Turborepo configuration
├── pnpm-workspace.yaml   # pnpm workspace configuration
└── docker-compose.yml    # PostgreSQL setup
```

## 🔑 Authentication

### User Registration (Customer)

New customers can register via the customer app at http://localhost:5174/register

### Admin Login

Use the seeded admin credentials or create your own via direct database insert.

### API Endpoints

- `POST /api/auth/register` - Register new customer
- `POST /api/auth/login` - Login (admin/customer)
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - Logout

## 🛠️ Development Commands

### Root Commands (from project root)

```bash
# Start all apps in dev mode
pnpm dev

# Build all apps
pnpm build

# Run type checking across all packages
pnpm type-check

# Run linting
pnpm lint
```

### Backend Commands (from apps/backend)

```bash
# Start backend dev server
pnpm dev

# Push database schema changes
pnpm db:push

# Generate migrations
pnpm db:generate

# Run migrations
pnpm db:migrate

# Open Drizzle Studio (database GUI)
pnpm db:studio

# Seed database
pnpm db:seed
```

### Frontend Commands (from apps/admin or apps/user)

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🗄️ Database

### Schema

The database includes:

- **users** table with RBAC (roles: ADMIN, CUSTOMER)

### Migrations

```bash
# Generate migration from schema changes
cd apps/backend
pnpm db:generate

# Apply migrations
pnpm db:migrate
```

### GUI Management

```bash
cd apps/backend
pnpm db:studio
```

Opens Drizzle Studio at http://localhost:4983

## 🔐 RBAC (Role-Based Access Control)

Two roles are defined:
- **ADMIN**: Full access to admin dashboard and API
- **CUSTOMER**: Access to customer features only

Protected routes use the `requireRole` middleware:

```typescript
router.get('/admin-only', authenticate, requireRole(Roles.ADMIN), handler);
```

## 📦 Shared Package

The `@shop-sphere/shared` package contains:

- **Types**: TypeScript interfaces for User, AuthResponse, etc.
- **Schemas**: Zod validation schemas (registerSchema, loginSchema)
- **Constants**: Role definitions, shared constants

Both frontend and backend import from this package for type safety.

## 🌐 Environment Variables

### Backend (.env)

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/shop_sphere
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=3000
NODE_ENV=development
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000
```

## 🎯 Next Steps

This setup provides the foundation for:

1. **Product Management** (admin creates/edits products)
2. **Shopping Cart** (customer adds products to cart)
3. **Order Management** (customers place orders, admin manages)
4. **Inventory Tracking** (stock management)
5. **Customer Management** (admin views customer data)

All features can be added following the existing feature-based structure.

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Check if PostgreSQL is running
docker ps

# Restart database
docker-compose restart

# View logs
docker-compose logs postgres
```

### Port Already in Use

If ports 3000, 5173, or 5174 are in use, update:
- Backend: `apps/backend/.env` (PORT)
- Admin: `apps/admin/vite.config.ts` (server.port)
- User: `apps/user/vite.config.ts` (server.port)

### Dependencies Issues

```bash
# Clean install
rm -rf node_modules
pnpm install
```

## 📝 License

MIT
