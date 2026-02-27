"use client";

import { useRouter } from "next/navigation";
import { ShieldCheck, Laptop, ArrowRight } from "lucide-react";

interface FeatureItem {
  id: number;
  text: string;
  icon: any;
}

const features: FeatureItem[] = [
  {
    id: 1,
    text: "Premium aluminum finish",
    icon: SparklesIcon, // Custom or simple icon
  },
  {
    id: 2,
    text: "Seamless multi-device support",
    icon: Laptop,
  },
  {
    id: 3,
    text: "Built for everyday durability",
    icon: ShieldCheck,
  },
];

// Reusable simple sparkle/aluminum icon
function SparklesIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}

const EditorialWorkspaceSection: React.FC = () => {
  const router = useRouter();

  return (
    <section className="w-full bg-[#F9F3E5]">
      <div className="relative px-6 lg:px-20 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left Column: Text Content */}
        <div className="flex flex-col items-start">
          <span className="text-sm tracking-[0.3em] uppercase text-neutral-500 font-medium">
            Workspace Essentials
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 leading-tight">
            Crafted for Focus
          </h2>

          <p className="mt-6 text-neutral-600 leading-relaxed max-w-md text-lg">
            Thoughtfully designed computer accessories that enhance productivity
            while maintaining a refined, modern aesthetic.
          </p>

          <div className="mt-8 space-y-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="flex items-center gap-3 text-neutral-700"
                >
                  <Icon
                    className="w-5 h-5 text-neutral-800"
                    strokeWidth={1.5}
                  />
                  <span className="text-sm md:text-base">{feature.text}</span>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => router.push("/category")}
            className="mt-10 group bg-black text-white px-8 py-3.5 rounded-full font-medium transition-all duration-300 hover:bg-neutral-800 active:scale-95 flex items-center gap-2"
          >
            Shop Workspace
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Right Column: Premium Image & Floating Accent */}
        <div className="relative group">
          <div className="relative overflow-hidden rounded-2xl shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1491336477066-31156b5e4f35?q=80&w=2000&auto=format&fit=crop"
              alt="Minimalist Desk Setup"
              className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>

          {/* Floating Stat Card - Hidden on mobile, overlapping on desktop */}
          <div className="hidden md:block absolute -bottom-6 -left-6 bg-white shadow-2xl rounded-xl px-6 py-5 border border-neutral-100 transition-transform duration-300 hover:-translate-y-1">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-neutral-900">10K+</span>
              <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">
                Happy Customers
              </span>
            </div>
          </div>

          {/* Mobile version of the stat card (Visible only on mobile) */}
          <div className="md:hidden mt-6 bg-neutral-50 rounded-xl px-6 py-4 border border-neutral-100">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-neutral-600">
                Trusted by professionals
              </span>
              <span className="text-lg font-bold text-neutral-900">
                10K+ Orders
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialWorkspaceSection;
