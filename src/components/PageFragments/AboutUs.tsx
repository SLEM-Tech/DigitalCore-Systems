import Link from "next/link";

const AboutUs = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Background Section Transition */}
      <div className="absolute bottom-0 left-0 w-full h-[85%] bg-[#F9F3E5]" />

      <div className="relative max-w-[1140px] mx-auto px-6 lg:px-20 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-24 relative bottom-0 lg:bottom-16">
          {/* Left Side: Image with Dark Rounded Border */}
          <div className="w-full lg:w-1/2 mx-auto flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[420px] aspect-[3/4] rounded-xl border-4 border-[#2D2926] overflow-hidden shadow-2xl shadow-black/10">
              <img
                src="/images/about-us-image.png" // Replace with your actual asset path
                alt="Our workspace"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side: Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center pt-8 lg:pt-48">
            <div className="space-y-6">
              {/* Heading */}
              <h2 className="text-2xl lg:text-3xl poppins-medium text-[#2D2D2D]">
                About{" "}
                <span className="relative">
                  us
                  <span className="absolute left-0 -bottom-2 w-full h-1.5 bg-[#E68A45] rounded-full" />
                </span>
              </h2>

              {/* Headline */}
              <h3 className="text-lg lg:text-xl poppins-semibold text-[#2D2D2D] leading-tight max-w-md">
                We Supply quality accessories, <br /> and ready to deliver.
              </h3>

              {/* Description */}
              <p className="text-[#2D2D2D]/50 text-sm lg:text-base poppins-medium leading-relaxed max-w-md">
                We are a company that sell and distributes <br /> quality
                computer.
              </p>

              {/* CTA Button */}
              <div className="pt-4">
                <Link
                  href="/category"
                  className="inline-block bg-[#2D2926] text-[#E68A45] px-10 py-4 rounded-full poppins-medium text-xs lg:text-sm hover:bg-black transition-all active:scale-95 shadow-xl shadow-black/10"
                >
                  Get your coffee
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
