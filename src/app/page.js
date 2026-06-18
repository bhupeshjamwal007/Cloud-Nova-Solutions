import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import ClientSection from "@/components/ClientSection";
import WebDevBanner from "@/components/WebDevBanner";
import ProcessSection from "@/components/ProcessSection";
import ProcessTimeline from "@/components/ProcessTimeline";
import MobileAppsBanner from "@/components/MobileAppsBanner";
import FAQSection from "@/components/FAQSection";
import ManifestoSection from "@/components/ManifestoSection";
import SoftwareBanner from "@/components/SoftwareBanner";
import FounderSection from "@/components/FounderSection";
import { CinematicFooter } from "@/components/ui/motion-footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <div className="relative w-full overflow-x-hidden bg-black">
      <main className="relative z-10 w-full bg-black flex flex-col rounded-b-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-b border-[rgba(255,255,255,0.1)]">
        <Header />
        <Hero />
        <VideoSection />
        <ClientSection />
        <WebDevBanner />
        <ProcessSection />
        <ProcessTimeline />
        <MobileAppsBanner />
        <FAQSection />
        <ManifestoSection />
        <SoftwareBanner />
        <FounderSection />
      </main>

      <CinematicFooter />
      <FloatingWhatsApp />
    </div>
  );
}
