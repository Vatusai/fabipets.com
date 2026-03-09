# Fabipets Admin Panel — Design & Architecture Proposal

> Comprehensive admin system that's **admin-first but customer-ready**

---

## Table of Contents

1. [Suggested UX Flow](#1-suggested-ux-flow)
2. [Admin Login Page Design Concept](#2-admin-login-page-design-concept)
3. [Admin Dashboard Structure](#3-admin-dashboard-structure)
4. [Component Breakdown](#4-component-breakdown)
5. [Suggested Authentication Architecture](#5-suggested-authentication-architecture)
6. [Tech Stack / Implementation Approach](#6-tech-stack--implementation-approach)
7. [Admin vs Customer User Separation](#7-admin-vs-customer-user-separation)
8. [Mobile Considerations](#8-mobile-considerations)
9. [Animation Recommendations](#9-animation-recommendations-smooth-but-light)
10. [Implementation Roadmap](#10-implementation-roadmap)

---

## 1. Suggested UX Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         PUBLIC SITE                              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌────────┐ │
│  │  Hero   │→ │Collection│→ │ Custom  │→ │Lookbook │→ │Contact │ │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘  └────────┘ │
│       ↑                                                          │
│  [Admin Link] ──→ /admin/login ──→ Authenticated? ──┐           │
│     (subtle)          ↓                    ↓          │           │
│                    Login Form         Dashboard ◄─────┘           │
│                       │                    │                     │
│              Invalid credentials      Logout / Session expired   │
└─────────────────────────────────────────────────────────────────┘
```

**Admin Access Point:** A subtle, non-intrusive link in the footer or navigation (only visible when needed, or a "secret" URL like `/admin`).

---

## 2. Admin Login Page Design Concept

### Visual Direction

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│    ┌─────────────────────────────────────────────────────┐     │
│    │                                                     │     │
│    │              🐾  FABIPETS  ADMIN                   │     │
│    │                                                     │     │
│    │    ┌─────────────────────────────────────────┐      │     │
│    │    │                                         │      │     │
│    │    │    [  Email Address  ]                  │      │     │
│    │    │    admin@fabipets.com                   │      │     │
│    │    │                                         │      │     │
│    │    │    [  Password        ]  [👁]           │      │     │
│    │    │    ••••••••••••••                       │      │     │
│    │    │                                         │      │     │
│    │    │         ┌──────────────────┐            │      │     │
│    │    │         │    SIGN IN       │            │      │     │
│    │    │         └──────────────────┘            │      │     │
│    │    │                                         │      │     │
│    │    │    [Error: Invalid credentials]         │      │     │
│    │    │                                         │      │     │
│    │    │         ← Back to Fabipets              │      │     │
│    │    │                                         │      │     │
│    │    └─────────────────────────────────────────┘      │     │
│    │                                                     │     │
│    │         Protected Area • v1.0.0                    │     │
│    │                                                     │     │
│    └─────────────────────────────────────────────────────┘     │
│                                                                 │
│              Soft blush gradient background                     │
│              Subtle grain texture overlay                       │
│              Floating paw prints (minimal)                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Design Specifications

| Element | Specification |
|---------|---------------|
| **Background** | `var(--blush)` to `var(--blush-light)` gradient |
| **Card** | White, `rounded-[28px]`, soft shadow, `2.5px` border (consistent with site) |
| **Inputs** | Rounded full (`rounded-full`), camel focus ring, smooth transitions |
| **Button** | Primary camel button, `rounded-full`, subtle hover lift |
| **Error State** | Soft red background (`#FEE2E2`), rounded, icon + message |
| **Loading** | Subtle spinner in button, disabled state |

### Animation Details (Light & Smooth)

| Interaction | Animation | Duration | Easing |
|-------------|-----------|----------|--------|
| Page enter | Card fades up from 20px | 600ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Input focus | Border color transition + subtle scale (1.01) | 200ms | ease-out |
| Button hover | Lift (-2px) + shadow increase | 200ms | ease-out |
| Error appear | Slide down + fade in | 300ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Loading spinner | Rotate 360° | 800ms | linear infinite |

---

## 3. Admin Dashboard Structure

### Layout Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│  🐾 FABIPETS ADMIN                                          [👤] [⚙]  │
├──────────┬──────────────────────────────────────────────────────────────┤
│          │                                                              │
│  ┌────┐  │   OVERVIEW                                  Last 7 days    │
│  │ 🏠 │  │   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │Home│  │   │  12 Leads   │ │  5 Custom   │ │  3 Pending  │          │
│  └────┘  │   │   +23% ↑    │ │   Orders    │ │   Orders    │          │
│          │   └─────────────┘ └─────────────┘ └─────────────┘          │
│  ─────── │                                                              │
│          │   RECENT ACTIVITY                                           │
│  ┌────┐  │   ┌─────────────────────────────────────────────────────┐  │
│  │ ✉️ │  │   │ • New custom design request from Maria G.    2m ago │  │
│  │Leads│  │   │ • Product "Summer Dress" updated             15m ago│  │
│  └────┘  │   │ • New contact form submission                1h ago  │  │
│          │   │ • Gallery image uploaded                     3h ago  │  │
│  ┌────┐  │   └─────────────────────────────────────────────────────┘  │
│  │ 📦 │  │                                                              │
│  │Products│   QUICK ACTIONS                                            │
│  └────┘  │   [+ Add Product]  [+ Upload Image]  [📊 View Reports]      │
│          │                                                              │
│  ┌────┐  │                                                              │
│  │ 🖼️ │  │                                                              │
│  │Gallery│  │                                                              │
│  └────┘  │                                                              │
│          │                                                              │
│  ┌────┐  │                                                              │
│  │ 🎨 │  │                                                              │
│  │Custom│  │                                                              │
│  └────┘  │                                                              │
│          │                                                              │
│  ┌────┐  │                                                              │
│  │ ⚙️ │  │                                                              │
│  │Settings│  │                                                              │
│  └────┘  │                                                              │
│          │                                                              │
└──────────┴──────────────────────────────────────────────────────────────┘
         ↑
    Collapsible on mobile (hamburger)
    Fixed width: 240px desktop
```

### Navigation Sections

| Section | Icon | Purpose | Sub-pages |
|---------|------|---------|-----------|
| **Overview** | 🏠 | Dashboard home, stats, quick actions | — |
| **Leads** | ✉️ | Form submissions, contact requests | All, Unread, Archived |
| **Products** | 📦 | Catalog management | List, Add, Categories |
| **Gallery** | 🖼️ | Lookbook image management | Upload, Organize, Tags |
| **Custom Orders** | 🎨 | Custom design requests | Pending, In Progress, Completed |
| **Settings** | ⚙️ | Site config, admin profile | General, Contact Info, Admin Users |

---

## 4. Component Breakdown

### New Components to Create

```
app/src/
├── admin/
│   ├── layouts/
│   │   └── AdminLayout.tsx          # Dashboard shell (sidebar + header)
│   │
│   ├── pages/
│   │   ├── LoginPage.tsx            # Admin login
│   │   ├── DashboardPage.tsx        # Overview/stats
│   │   ├── LeadsPage.tsx            # Form submissions list
│   │   ├── ProductsPage.tsx         # Catalog management
│   │   ├── GalleryPage.tsx          # Image manager
│   │   ├── CustomOrdersPage.tsx     # Custom design requests
│   │   └── SettingsPage.tsx         # Configuration
│   │
│   ├── components/
│   │   ├── AdminSidebar.tsx         # Navigation sidebar
│   │   ├── AdminHeader.tsx          # Top bar with user menu
│   │   ├── StatCard.tsx             # Dashboard stat widget
│   │   ├── DataTable.tsx            # Reusable table component
│   │   ├── LeadCard.tsx             # Individual lead display
│   │   ├── ImageUploader.tsx        # Drag-drop image upload
│   │   ├── StatusBadge.tsx          # Order/status badges
│   │   └── EmptyState.tsx           # No data illustration
│   │
│   ├── hooks/
│   │   ├── useAuth.ts               # Authentication state
│   │   ├── useAdmin.ts              # Admin data fetching
│   │   └── useProtectedRoute.ts     # Route protection
│   │
│   ├── context/
│   │   └── AuthContext.tsx          # Global auth state
│   │
│   ├── types/
│   │   └── admin.ts                 # Admin TypeScript types
│   │
│   └── utils/
│       └── auth.ts                  # Auth helpers, token management
```

### Shared Components (Existing)

- `Button`, `Input`, `Card` from `ui/` (shadcn)
- `Dialog` for modals
- `Toast` (sonner) for notifications

---

## 5. Suggested Authentication Architecture

### Phase 1: Admin-Only (Current)

```
┌─────────────────────────────────────────────────────────────────┐
│                     AUTHENTICATION FLOW                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. LOGIN                                                        │
│     ┌─────────┐    POST /api/auth/login    ┌───────────────┐    │
│     │  Client │ ──────────────────────────→ │  Auth Service │    │
│     └─────────┘                             └───────────────┘    │
│          ↑                                          │            │
│          └──────────── JWT Token ───────────────────┘            │
│                                                                  │
│  2. SESSION                                                      │
│     • Token stored in httpOnly cookie (secure)                  │
│     • Token expiry: 24 hours (configurable)                     │
│     • Refresh token rotation for security                       │
│                                                                  │
│  3. PROTECTED ROUTES                                             │
│     • React Router guard checks token validity                  │
│     • Auto-redirect to /admin/login if invalid                  │
│     • 401 responses trigger logout                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Phase 2: Multi-Role (Future)

```
┌─────────────────────────────────────────────────────────────────┐
│                     ROLE-BASED ACCESS                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  User Roles:                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   ADMIN     │  │   CUSTOMER  │  │      VISITOR            │  │
│  │  (you)      │  │  (future)   │  │   (public site)         │  │
│  └──────┬──────┘  └──────┬──────┘  └───────────┬─────────────┘  │
│         │                │                      │               │
│    Full access      Customer dashboard      Public pages       │
│    All sections     • My orders             • Browse           │
│                     • Saved designs         • Contact forms    │
│                     • Pet profiles          • Custom requests  │
│                     • Order history         (no auth needed)   │
│                                                                  │
│  Same auth system, different permissions (JWT claims)           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Token Structure (JWT)

```typescript
interface JWTPayload {
  sub: string;           // user ID
  email: string;         // user email
  role: 'admin' | 'customer';  // role for access control
  iat: number;           // issued at
  exp: number;           // expiration
}
```

---

## 6. Tech Stack / Implementation Approach

### Backend Options (Choose One)

| Option | Pros | Cons | Best For |
|--------|------|------|----------|
| **Supabase Auth** | Ready-made, PostgreSQL, free tier, Row Level Security | Vendor lock-in | Rapid development, small team |
| **Firebase Auth** | Google's infrastructure, generous free tier | Google ecosystem | Existing Google users |
| **Auth0/Clerk** | Enterprise features, easy integration | Paid for scale | Complex requirements |
| **Custom Node.js** | Full control, no vendor lock-in | Development time | Long-term independence |

### Recommendation: **Supabase**

Why Supabase for Fabipets:

1. **PostgreSQL database** - Perfect for storing leads, products, orders
2. **Built-in Auth** - Handles sessions, JWT, refresh tokens
3. **Row Level Security (RLS)** - Secure data access patterns
4. **Free tier generous** - 500MB DB, 2GB storage
5. **Easy migration path** - Can add customer auth later seamlessly

### Frontend Additions

| Package | Purpose |
|---------|---------|
| `@supabase/supabase-js` | Supabase client |
| `react-router-dom` | Routing (already have?) |
| `zustand` or Context API | State management (auth) |
| `@tanstack/react-query` | Server state (data fetching) |
| `recharts` | Already installed - for dashboard stats |

### Data Storage Strategy

```
Supabase PostgreSQL Tables:

┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│     users       │  │  leads          │  │  products       │
│  (auth managed) │  │  ─────────────  │  │  ─────────────  │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│ id              │  │ id              │  │ id              │
│ email           │  │ name            │  │ name            │
│ role            │  │ email           │  │ category        │
│ created_at      │  │ phone           │  │ price           │
└─────────────────┘  │ message         │  │ images[]        │
                     │ source          │  │ description     │
                     │ status          │  │ is_active       │
                     │ created_at      │  │ created_at      │
                     └─────────────────┘  └─────────────────┘

┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ custom_orders   │  │  gallery_images │  │  site_settings  │
│  ─────────────  │  │  ─────────────  │  │  ─────────────  │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│ id              │  │ id              │  │ key             │
│ customer_name   │  │ url             │  │ value           │
│ whatsapp        │  │ alt_text        │  │ updated_at      │
│ pet_name        │  │ category        │  │ updated_by      │
│ idea            │  │ order_index     │  └─────────────────┘
│ status          │  │ is_active       │
│ created_at      │  │ created_at      │
└─────────────────┘  └─────────────────┘
```

---

## 7. Admin vs Customer User Separation

### Database Design (Future-Proof)

```typescript
// Single users table with role discrimination
interface User {
  id: string;
  email: string;
  role: 'admin' | 'customer';
  status: 'active' | 'inactive' | 'pending';
  created_at: string;
  
  // Profile (nullable for admin)
  profile?: {
    first_name: string;
    last_name: string;
    phone?: string;
    avatar_url?: string;
  };
}

// Admin-specific data
interface AdminProfile {
  user_id: string;
  permissions: ('leads' | 'products' | 'gallery' | 'settings')[];
  last_login: string;
}

// Customer-specific data
interface CustomerProfile {
  user_id: string;
  pets: Pet[];
  addresses: Address[];
  saved_designs: string[]; // custom_order IDs
}
```

### Access Control Pattern

```typescript
// Route guard component
const ProtectedRoute = ({ 
  allowedRoles, 
  children 
}: { 
  allowedRoles: ('admin' | 'customer')[];
  children: React.ReactNode;
}) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />;
  
  return children;
};

// Usage
<Route path="/admin/*" element={
  <ProtectedRoute allowedRoles={['admin']}>
    <AdminLayout />
  </ProtectedRoute>
} />
```

---

## 8. Mobile Considerations

### Login Page Mobile

```
┌─────────────────┐
│                 │
│    🐾           │
│  FABIPETS       │
│    ADMIN        │
│                 │
│  ┌───────────┐  │
│  │  Email    │  │
│  └───────────┘  │
│                 │
│  ┌───────────┐  │
│  │ Password  │  │
│  └───────────┘  │
│                 │
│  ┌───────────┐  │
│  │  SIGN IN  │  │
│  └───────────┘  │
│                 │
│  ← Back         │
│                 │
└─────────────────┘
```

### Dashboard Mobile

| Feature | Implementation |
|---------|---------------|
| **Sidebar** | Slide-out drawer from left (hamburger menu) |
| **Tables** | Card-based layout instead of horizontal tables |
| **Touch targets** | Minimum 44px for all interactive elements |
| **Bottom nav** | Optional quick actions bar on mobile |
| **Pull-to-refresh** | On lists (leads, orders) |

### Responsive Breakpoints

- **Desktop (>1024px):** Sidebar always visible, full tables
- **Tablet (768-1024px):** Collapsible sidebar, adapted tables
- **Mobile (<768px):** Drawer navigation, card lists

---

## 9. Animation Recommendations (Smooth but Light)

### Page Transitions

```typescript
// Use Framer Motion (lightweight) or CSS transitions
// Recommended: Simple fade + slight Y movement

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: { duration: 0.2 }
  }
};
```

### Micro-interactions

| Element | Effect | Values |
|---------|--------|--------|
| Sidebar items | Hover bg + translateX(4px) | 150ms ease |
| Cards | Hover lift + shadow | `translateY(-2px)`, 200ms |
| Buttons | Active scale | `scale(0.98)`, 100ms |
| Status badges | Pulse for "new" items | CSS animation, subtle |
| Toast notifications | Slide in from right | 300ms, ease-out |

### What to AVOID

- ❌ Heavy parallax in admin
- ❌ Complex page transition animations
- ❌ Loading spinners on every interaction
- ❌ Background videos or heavy graphics
- ❌ Scroll-triggered animations in dashboard

✅ Keep it snappy and functional

---

## 10. Implementation Roadmap

### Phase 1: Foundation (Week 1)

1. Set up Supabase project
2. Create database schema
3. Implement auth context and hooks
4. Build LoginPage with validation

### Phase 2: Dashboard Shell (Week 2)

1. AdminLayout with sidebar/header
2. Protected routes setup
3. Dashboard overview page
4. Navigation between sections

### Phase 3: Core Features (Weeks 3-4)

1. Leads management (view, mark as read, archive)
2. Products CRUD
3. Gallery image upload
4. Custom orders view
5. Settings page (contact info, social links)

### Phase 4: Polish (Week 5)

1. Mobile responsiveness
2. Loading states and error handling
3. Animations and transitions
4. Testing and security audit

---

## Next Steps

Would you like to:

1. **Start implementing** - Begin with the LoginPage and authentication setup?
2. **Create detailed wireframes** - More specific design mockups?
3. **Set up the Supabase schema** - SQL for the database structure?
4. **Create the routing structure** - React Router setup for admin routes?

---

*Document created: 2026-03-08*
