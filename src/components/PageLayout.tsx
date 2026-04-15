import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { ReactNode } from "react";

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-[var(--nav-total-h)]">{children}</main>
      <FooterSection />
    </div>
  );
};

export default PageLayout;
