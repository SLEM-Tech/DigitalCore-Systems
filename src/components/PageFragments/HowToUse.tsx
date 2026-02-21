import React from "react";

const HowToUse = () => {
  const steps = [
    {
      id: 1,
      image: "/images/computer-screen-off.png", // Replace with your actual asset paths
      title: "Choose your Item",
      description: "There are 20+ coffees for you",
    },
    {
      id: 2,
      image: "/images/delivery-package-boxes.png",
      title: "We deliver it to you",
      description: "Choose delivery service",
    },
    {
      id: 3,
      image: "/images/man.png",
      title: "Enjoy your Item",
      description: "Choose delivery service",
    },
  ];

  return (
    <section className="w-full bg-white pt-16 lg:pt-48 pb-36 px-6 lg:px-20">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl poppins-medium text-[#2D2D2D] inline-block relative">
            How to use delivery{" "}
            <span className="relative inline-block">
              service
              <span className="absolute left-0 -bottom-2 w-full h-1.5 bg-[#F58B3C] rounded-full"></span>
            </span>
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 w-3/4 mx-auto">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center space-y-4"
            >
              {/* Illustration Wrapper */}
              <div className="w-full aspect-[4/3] flex items-center justify-center">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-40 h-40 max-w-full max-h-full object-contain"
                />
              </div>

              {/* Text Content */}
              <div className="space-y-2">
                <h3 className="text-base lg:text-lg poppins-semibold text-[#2D2D2D] capitalize">
                  {step.title}
                </h3>
                <p className="text-[#2D2D2D]/60 text-sm lg:text-base poppins-medium">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
