import LightRays from "@/components/LightRays";
import Header from "@/components/layout/public/Header";
import Footer from "@/components/layout/public/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Layer */}
      <div className="absolute inset-0 z-[-1] pointer-events-none">
        <div className="fixed inset-0">
          <LightRays
            raysOrigin="top-center-offset"
            raysColor="#5dfeca"
            raysSpeed={0.5}
            lightSpread={0.9}
            rayLength={1.4}
            followMouse={true}
            mouseInfluence={0.02}
            noiseAmount={0.0}
            distortion={0.01}
          />
        </div>
      </div>

      <Header />
      
      <main className="flex-grow pt-24 px-6 max-w-7xl mx-auto w-full">
        {children}
      </main>

      <Footer />
    </div>
  );
}
