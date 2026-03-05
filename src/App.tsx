import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Public pages
import Index          from "./pages/Index";
import Tours          from "./pages/Tours";
import Destinations   from "./pages/Destinations";
import DestinationPage from "./pages/DestinationPage";
import About          from "./pages/About";
import Contact        from "./pages/Contact";
import NotFound       from "./pages/NotFound";
import QuotePage      from "./pages/Quote";
import BlogPage       from "./pages/Blog";
import BlogPostPage   from "./pages/BlogPost";
import ScrollToTop    from "./components/ScrollToTop";

// Admin
import { AdminAuthProvider, ProtectedRoute } from "./admin/AdminAuth";
import AdminLogin      from "./admin/AdminLogin";
import AdminLayout     from "./admin/AdminLayout";
import DashboardPage   from "./admin/pages/DashboardPage";
import QuotesPage      from "./admin/pages/QuotesPage";
import QuoteDetailPage from "./admin/pages/QuoteDetailPage";
import ToursPage       from "./admin/pages/ToursPage";
import BookingsPage    from "./admin/pages/BookingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AdminAuthProvider>
          <ScrollToTop />
          <Routes>

            {/* ── Public ── */}
            <Route path="/"                    element={<Index />} />
            <Route path="/tours"               element={<Tours />} />
            <Route path="/destinations"        element={<Destinations />} />
            <Route path="/destinations/:slug"  element={<DestinationPage />} />
            <Route path="/about"               element={<About />} />
            <Route path="/contact"             element={<Contact />} />
            <Route path="/quote"               element={<QuotePage />} />
            <Route path="/blog"                element={<BlogPage />} />
            <Route path="/blog/:slug"          element={<BlogPostPage />} />

            {/* ── Admin ── */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index                element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard"     element={<DashboardPage />} />
              <Route path="quotes"        element={<QuotesPage />} />
              <Route path="quotes/:id"    element={<QuoteDetailPage />} />
              <Route path="tours"         element={<ToursPage />} />
              <Route path="bookings"      element={<BookingsPage />} />
            </Route>

            {/* ── 404 ── */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </AdminAuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;