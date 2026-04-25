# Next.js 16 Starter with Redux Toolkit

A modern Next.js 16 starter project with Redux Toolkit state management, organized within the App Router structure.

## Features

- ⚡ **Next.js 16** - Latest version with App Router
- 🔄 **Redux Toolkit** - Efficient state management
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📱 **Responsive Layouts** - Multiple layout components
- 🔧 **TypeScript** - Full type safety
- 🚀 **Bun** - Fast package manager and runtime
- 🪝 **Custom Hooks** - Reusable React hooks
- 🧩 **Component Library** - Reusable UI components

## Project Structure

```
blink-dashboard
├─ .husky
│  └─ pre-commit
├─ app
│  ├─ (pages)
│  │  ├─ (auth)
│  │  │  ├─ forgot-password
│  │  │  │  └─ page.tsx
│  │  │  ├─ layout.tsx
│  │  │  ├─ login
│  │  │  │  └─ page.tsx
│  │  │  ├─ register
│  │  │  │  └─ page.tsx
│  │  │  ├─ reset-password
│  │  │  │  └─ page.tsx
│  │  │  └─ verify-otp
│  │  │     └─ page.tsx
│  │  ├─ (dashboard)
│  │  │  ├─ dashboard
│  │  │  │  └─ page.tsx
│  │  │  ├─ inquiries
│  │  │  │  ├─ page.tsx
│  │  │  │  └─ [id]
│  │  │  │     └─ page.tsx
│  │  │  ├─ notifications
│  │  │  │  └─ page.tsx
│  │  │  ├─ payment-management
│  │  │  │  └─ page.tsx
│  │  │  ├─ profile
│  │  │  │  └─ page.tsx
│  │  │  ├─ user-management
│  │  │  │  └─ page.tsx
│  │  │  └─ user-report
│  │  │     └─ page.tsx
│  │  └─ (public)
│  │     ├─ about
│  │     │  ├─ layout.tsx
│  │     │  └─ page.tsx
│  │     ├─ contact
│  │     │  ├─ layout.tsx
│  │     │  └─ page.tsx
│  │     └─ ppr-example
│  │        └─ page.tsx
│  ├─ assets
│  │  ├─ actions
│  │  │  ├─ Freesentation-Regular.woff2
│  │  │  ├─ multiplication-sign.svg
│  │  │  ├─ pencil-edit-02.svg
│  │  │  ├─ unavailable.svg
│  │  │  ├─ view.svg
│  │  │  └─ waste-restore.svg
│  │  ├─ icons
│  │  │  ├─ arrow-left-01.svg
│  │  │  ├─ bell.svg
│  │  │  ├─ calendar-03.svg
│  │  │  ├─ champion.svg
│  │  │  ├─ clock-03.svg
│  │  │  ├─ clock.svg
│  │  │  ├─ computer.svg
│  │  │  ├─ cross.svg
│  │  │  ├─ diamond-02.svg
│  │  │  ├─ doubletick.svg
│  │  │  ├─ elements.png
│  │  │  ├─ eye.svg
│  │  │  ├─ eyelock.svg
│  │  │  ├─ flag.svg
│  │  │  ├─ gold.svg
│  │  │  ├─ lock.svg
│  │  │  ├─ mail.svg
│  │  │  ├─ male-symbol.svg
│  │  │  ├─ mobile.svg
│  │  │  ├─ money-bag-02.svg
│  │  │  ├─ money-not.svg
│  │  │  ├─ multiplication-sign.svg
│  │  │  ├─ play.svg
│  │  │  ├─ refresh.svg
│  │  │  ├─ sad-02.svg
│  │  │  ├─ sent-02.svg
│  │  │  ├─ shield.svg
│  │  │  ├─ tel.svg
│  │  │  ├─ tick-double-02.svg
│  │  │  ├─ unavailable.svg
│  │  │  ├─ user.svg
│  │  │  ├─ Vector.svg
│  │  │  └─ whiteTick.svg
│  │  ├─ notification
│  │  │  ├─ alert-02.svg
│  │  │  ├─ checkgreen.svg
│  │  │  ├─ checkn.svg
│  │  │  ├─ clear.svg
│  │  │  ├─ delete.svg
│  │  │  ├─ message-02.svg
│  │  │  ├─ money-04.svg
│  │  │  ├─ settings.svg
│  │  │  └─ user-group.svg
│  │  └─ sidebar
│  │     ├─ complaint.png
│  │     ├─ dashboard.png
│  │     ├─ inquiry.png
│  │     ├─ logout-04.png
│  │     ├─ notification.png
│  │     ├─ payment.png
│  │     ├─ profile.png
│  │     ├─ theme.png
│  │     └─ user-group.png
│  ├─ components
│  │  ├─ common
│  │  │  ├─ AuthControls.tsx
│  │  │  ├─ DashboardLayout.tsx
│  │  │  ├─ Footer.tsx
│  │  │  ├─ Header.tsx
│  │  │  ├─ index.ts
│  │  │  └─ Sidebar.tsx
│  │  ├─ filters
│  │  │  ├─ filterDropdown.tsx
│  │  │  ├─ InquiryFilters.tsx
│  │  │  ├─ ReportFilters.tsx
│  │  │  └─ UserFilters.tsx
│  │  ├─ forms
│  │  │  ├─ ContactForm.tsx
│  │  │  ├─ CreateUserForm.tsx
│  │  │  ├─ DatePicker.tsx
│  │  │  ├─ ForgotPasswordForm.tsx
│  │  │  ├─ FormFieldRenderer.tsx
│  │  │  ├─ index.ts
│  │  │  ├─ LoginForm.tsx
│  │  │  ├─ RegisterForm.tsx
│  │  │  ├─ ResetPasswordForm.tsx
│  │  │  ├─ UserForm.tsx
│  │  │  └─ VerifyOtpForm.tsx
│  │  ├─ index.ts
│  │  ├─ layouts
│  │  │  ├─ AuthLayout.tsx
│  │  │  ├─ index.ts
│  │  │  ├─ MainLayout.tsx
│  │  │  └─ SidebarLayout.tsx
│  │  ├─ notifications
│  │  │  ├─ FilterTabs.tsx
│  │  │  ├─ index.ts
│  │  │  ├─ NotificationItem.tsx
│  │  │  └─ NotificationSettingsCard.tsx
│  │  ├─ pages
│  │  │  ├─ dashboard
│  │  │  │  ├─ RecentReports.tsx
│  │  │  │  └─ TopUsers.tsx
│  │  │  ├─ index.ts
│  │  │  ├─ inquiries
│  │  │  │  ├─ ChatPanel.tsx
│  │  │  │  └─ InquiryDetailsCard.tsx
│  │  │  └─ Profile
│  │  │     ├─ ActivityAlert.tsx
│  │  │     ├─ ActivityAlertParent.tsx
│  │  │     ├─ Auth.tsx
│  │  │     ├─ General.tsx
│  │  │     ├─ GeneralParent.tsx
│  │  │     ├─ LoginHistory.tsx
│  │  │     ├─ Notification.tsx
│  │  │     ├─ ProfileInfoForm.tsx
│  │  │     └─ Security.tsx
│  │  ├─ tables
│  │  │  ├─ columns
│  │  │  │  ├─ inquiryColumns.tsx
│  │  │  │  ├─ payment
│  │  │  │  │  ├─ paymentColumns.tsx
│  │  │  │  │  └─ paymentTable.tsx
│  │  │  │  ├─ reportColumns.tsx
│  │  │  │  └─ userColumns.tsx
│  │  │  ├─ index.ts
│  │  │  ├─ InquiryTable.tsx
│  │  │  ├─ ReportTable.tsx
│  │  │  ├─ ReusableTable.tsx
│  │  │  └─ UserTable.tsx
│  │  └─ ui
│  │     ├─ Badge.tsx
│  │     ├─ BoleanModal.tsx
│  │     ├─ Button.tsx
│  │     ├─ Card.tsx
│  │     ├─ CustomCheckbox.tsx
│  │     ├─ CustomSelectField.tsx
│  │     ├─ HistoryForm.tsx
│  │     ├─ index.ts
│  │     ├─ InputField.tsx
│  │     ├─ Modal.tsx
│  │     ├─ NotificationCard.tsx
│  │     ├─ PasswordInputField.tsx
│  │     ├─ RegisterDetailsList.tsx
│  │     ├─ RelativeTime.tsx
│  │     ├─ ReportDetails.tsx
│  │     ├─ StatCard.tsx
│  │     ├─ StatusBadge.tsx
│  │     ├─ ThemeToggle.tsx
│  │     ├─ Title.tsx
│  │     └─ ToggleButton.tsx
│  ├─ config
│  │  └─ formConfigs
│  │     ├─ createUserFormConfig.ts
│  │     └─ userDetailsFormConfig.ts
│  ├─ data
│  │  ├─ dashboard
│  │  │  └─ statCardsData.ts
│  │  ├─ index.ts
│  │  ├─ inquiry
│  │  │  └─ inquiryData.ts
│  │  ├─ payment
│  │  │  ├─ paymentStatCardsData.ts
│  │  │  └─ paymentTableData.ts
│  │  ├─ report
│  │  │  └─ reportsData.ts
│  │  ├─ sidebar
│  │  │  └─ sidebarLinks.ts
│  │  └─ user
│  │     └─ usersData.ts
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ hooks
│  │  ├─ index.ts
│  │  ├─ useCreateUserForm.ts
│  │  ├─ useDebounce.ts
│  │  ├─ useLocalStorage.ts
│  │  └─ useUserDetailsForm.ts
│  ├─ layout.tsx
│  ├─ manifest.ts
│  ├─ page.tsx
│  ├─ redux
│  │  ├─ provider.tsx
│  │  ├─ rootReducer.ts
│  │  ├─ slices
│  │  │  ├─ dashboardSlice.ts
│  │  │  ├─ inquirySlice.ts
│  │  │  ├─ reportSlice.ts
│  │  │  └─ userSlice.ts
│  │  └─ store.ts
│  ├─ services
│  │  ├─ httpMethods
│  │  │  ├─ delete.ts
│  │  │  ├─ get.ts
│  │  │  ├─ index.ts
│  │  │  ├─ patch.ts
│  │  │  ├─ post.ts
│  │  │  └─ put.ts
│  │  ├─ httpService.ts
│  │  ├─ httpServices
│  │  │  ├─ authApiService.ts
│  │  │  ├─ dashboardApiService.ts
│  │  │  ├─ index.ts
│  │  │  ├─ inquiryApiService.ts
│  │  │  ├─ reportApiservice.ts
│  │  │  └─ userApiService.ts
│  │  ├─ index.ts
│  │  └─ interceptors
│  │     ├─ index.ts
│  │     ├─ interceptorManager.ts
│  │     ├─ requestInterceptor.ts
│  │     └─ responseInterceptor.ts
│  ├─ sitemap.ts
│  ├─ types
│  │  ├─ common.d.ts
│  │  ├─ dashboard.d.ts
│  │  ├─ form.d.ts
│  │  ├─ index.ts
│  │  ├─ inquiry.d.ts
│  │  ├─ interceptors.d.ts
│  │  ├─ redux.d.ts
│  │  ├─ report.d.ts
│  │  ├─ service.d.ts
│  │  ├─ ui.d.ts
│  │  └─ user.d.ts
│  └─ utils
│     ├─ cn.ts
│     ├─ date.ts
│     ├─ errorUtils.ts
│     ├─ helpers.ts
│     ├─ httpUtils.ts
│     ├─ image
│     │  ├─ icon.image.ts
│     │  └─ notify.image.ts
│     ├─ index.ts
│     ├─ inquiryFilters.ts
│     ├─ reportFilters.ts
│     ├─ serverUtils.ts
│     ├─ tokenManager.ts
│     └─ userFilters.ts
├─ bun.lock
├─ Dockerfile
├─ dockerignore
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ file.svg
│  ├─ fonts
│  │  ├─ Freesentation-4Regular.woff2
│  │  ├─ Freesentation-5Medium.woff2
│  │  ├─ Freesentation-6SemiBold.woff2
│  │  ├─ Freesentation-8ExtraBold.woff2
│  │  └─ Lufga-Regular.woff2
│  ├─ globe.svg
│  ├─ lock.svg
│  ├─ next.svg
│  ├─ robots.txt
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ SERVER_COMPONENTS_GUIDE.md
├─ SERVICE_DOCUMENTATION.md
├─ tsconfig.json
└─ TYPES_DOCUMENTATION.md

```

## Getting Started

1. **Install dependencies:**
   ```bash
   bun install
   ```

2. **Run the development server:**
   ```bash
   bun dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Route Groups

This project uses Next.js nested route groups for optimal organization:

### Main Route Group: `(pages)`
- **Primary container** for all application pages
- Provides top-level organization without affecting URLs

### Sub-Route Groups:
- **`(public)`** - Public pages accessible to all users
  - About, Contact, and other marketing pages
  - Uses MainLayout with header/footer
  
- **`(dashboard)`** - Protected dashboard and admin pages
  - Dashboard, Users, Settings
  - Uses SidebarLayout for navigation
  
- **`(auth)`** - Authentication-related pages
  - Login, Register, Password Reset
  - Uses AuthLayout for centered forms

### Benefits of Nested Route Groups:
- **Clean URLs**: Group names don't appear in URLs (`/about`, not `/(pages)/(public)/about`)
- **Logical Organization**: Related pages are grouped by functionality
- **Layout Management**: Different layouts can be applied to different groups
- **Middleware Control**: Apply authentication/authorization per group
- **Easy Maintenance**: Clear separation of concerns

### URL Structure:
```
/ → Home page (root)
/about → (pages)/(public)/about/page.tsx
/contact → (pages)/(public)/contact/page.tsx
/dashboard → (pages)/(dashboard)/dashboard/page.tsx
/analytics → (pages)/(dashboard)/analytics/page.tsx
/users → (pages)/(dashboard)/users/page.tsx
/settings → (pages)/(dashboard)/settings/page.tsx
/login → (pages)/(auth)/login/page.tsx
/register → (pages)/(auth)/register/page.tsx
```

## Available Routes

All pages are organized under nested route groups within `(pages)`:

### Public Pages - `(public)` group
- `/` - Home page with MainLayout
- `/about` - About page with company information  
- `/contact` - Contact page with contact form

### Dashboard Pages - `(dashboard)` group
- `/dashboard` - Main dashboard with SidebarLayout
- `/analytics` - Analytics and metrics page
- `/users` - User management interface
- `/settings` - Application settings

### Authentication Pages - `(auth)` group
- `/login` - Login page with AuthLayout
- `/register` - User registration page

## Route Groups

This project uses Next.js 13+ route groups to organize pages:

### `(main)` - Public Pages
- **Purpose**: Marketing and informational content
- **Layout**: MainLayout (header, footer, navigation)
- **Pages**: Home, About, Contact

### `(dashboard)` - Protected Dashboard
- **Purpose**: Admin and user management interfaces  
- **Layout**: SidebarLayout (sidebar navigation, header)
- **Pages**: Dashboard, Users, Settings

### `(auth)` - Authentication Flow
- **Purpose**: User authentication and registration
- **Layout**: AuthLayout (centered, minimal design)
- **Pages**: Login, Register, Forgot Password

Route groups allow you to organize related pages while keeping URLs clean (the group names don't appear in the URL).

### MainLayout
- **Purpose**: Public pages, marketing content
- **Features**: Header with navigation, main content area, footer
- **Usage**: Home, about, contact pages

### SidebarLayout
- **Purpose**: Admin dashboards, user panels
- **Features**: Sidebar navigation, header, main content area
- **Usage**: Dashboard, settings

### AuthLayout
- **Purpose**: Authentication flows
- **Features**: Centered form container, minimal design
- **Usage**: Login, register, forgot password

## UI Components

All components are located in `app/components/ui/`:

- **Button**: Configurable button with variants and loading states
- **Card**: Container component with optional title
- **Header**: Navigation header with user state
- **Footer**: Site footer with links
- **Sidebar**: Navigation sidebar for dashboards

## Custom Hooks

Located in `app/hooks/`:

- **useAppDispatch/useAppSelector**: Typed Redux hooks
- **useLocalStorage**: Persistent local storage hook
- **useDebounce**: Debounce hook for search inputs

## Redux Store

The Redux store includes:

- **Counter Slice**: Basic counter with increment/decrement
- **User Slice**: User authentication and profile management

### Using Redux

```tsx
import { useAppSelector, useAppDispatch } from './hooks'
import { increment, decrement } from './redux/slices/counterSlice'

function Counter() {
  const { value, loading } = useAppSelector((state) => state.counter)
  const dispatch = useAppDispatch()

  return (
    <div>
      <span>{value}</span>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  )
}
```

## Adding New Pages

1. **Create page component** in appropriate route folder under `app/`
2. **Choose layout** from `app/components/layouts/`
3. **Import components** from `app/components/`
4. **Use hooks** from `app/hooks/`

Example:
```tsx
// app/about/page.tsx
'use client'

import { MainLayout, Card } from '../components'

export default function About() {
  return (
    <MainLayout>
      <Card title="About Us">
        <p>Welcome to our application!</p>
      </Card>
    </MainLayout>
  )
}
```

## Adding New Components

1. **Create component** in `app/components/ui/`
2. **Export from index** in `app/components/ui/index.ts`
3. **Import in layouts** or pages as needed

## Utility Functions

Located in `app/lib/`:

- **cn()**: Combines CSS classes with Tailwind merge
- **formatDate()**: Date formatting utility
- **formatCurrency()**: Currency formatting
- **truncateText()**: Text truncation
- **generateId()**: Random ID generation

## Scripts

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run ESLint

## Environment Structure

This project follows the Next.js 13+ App Router conventions with everything organized within the `app/` directory:

- **Colocation**: Components, hooks, and utilities are colocated near their usage
- **Clear separation**: Layouts, UI components, and business logic are separated
- **TypeScript**: Full type safety across all modules
- **Scalable**: Easy to extend with new features and components

```

