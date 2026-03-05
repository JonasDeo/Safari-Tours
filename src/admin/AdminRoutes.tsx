/**
 * Add these routes to your existing App.tsx / router config.
 * Place AFTER your public routes.
 *
 * Required installs (if not already present):
 *   npm install react-router-dom framer-motion lucide-react
 */

import { Route, Routes } from "react-router-dom";
import { AdminAuthProvider, ProtectedRoute } from "@/admin/AdminAuth";
import AdminLogin       from "@/admin/AdminLogin";
import AdminLayout      from "@/admin/AdminLayout";
import DashboardPage    from "@/admin/DashboardPage";
import QuotesPage       from "@/admin/QuotesPage";
import QuoteDetailPage  from "@/admin/QuoteDetailPage";
import ToursPage        from "@/admin/ToursPage";
import BookingsPage     from "@/admin/BookingsPage";

// Wrap your <App /> or <RouterProvider /> with <AdminAuthProvider>
// OR add it inside the component below:

const AdminRoutes = () => (
  <AdminAuthProvider>
    <Routes>
      {/* Public */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected — all nested routes require auth */}
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard"      element={<DashboardPage />} />
        <Route path="quotes"         element={<QuotesPage />} />
        <Route path="quotes/:id"     element={<QuoteDetailPage />} />
        <Route path="tours"          element={<ToursPage />} />
        {/* TourFormPage (new/edit) — to be built next */}
        {/* <Route path="tours/new"        element={<TourFormPage />} /> */}
        {/* <Route path="tours/:id/edit"   element={<TourFormPage />} /> */}
        <Route path="bookings"       element={<BookingsPage />} />
      </Route>
    </Routes>
  </AdminAuthProvider>
);

export default AdminRoutes;

// In App.tsx:
// import AdminRoutes from "@/admin/AdminRoutes";
// Add <AdminRoutes /> alongside your existing <Routes>
// OR merge the routes directly into your existing router.
