"use client";

import Picture from "../picture/Picture";

const NewsletterSection = () => {
  return (
    <section className="w-full px-6 lg:px-20 pt-20 pb-8 bg-white">
      <div className="max-w-[1440px] mx-auto">
        {/* Main Banner Container - Added min-h for mobile flexibility */}
        <div className="relative w-full min-h-[300px] lg:h-[350px] rounded-lg lg:rounded-2xl overflow-hidden flex flex-col items-center justify-center px-6 text-center shadow-2xl">
          {/* Background Image with Dark Overlay */}
          <div className="absolute inset-0 z-0">
            <Picture
              src="/images/newsletter-bg.png"
              alt="Subscription Background"
              // Changed to object-cover to ensure the texture fills the banner on all screen sizes
              className="w-full h-full object-cover"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 backdrop-blur-[1px] bg-black/20" />
          </div>

          {/* Content Wrapper */}
          <div className="relative z-10 w-full max-w-2xl space-y-8 lg:space-y-10">
            <h2 className="text-lg md:text-xl lg:text-4xl poppins-medium text-white leading-tight">
              Subscribe to get 50% discount price
            </h2>

            {/* Input Group - Responsive Stack logic */}
            {/* Mobile: transparent bg, stacked items | Tablet/Desktop: white pill bg, horizontal items */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="relative flex flex-col sm:flex-row items-stretch sm:items-center sm:bg-white sm:rounded-full p-0 sm:p-2 shadow-xl sm:shadow-xl max-w-xl mx-auto gap-3 sm:gap-0"
            >
              <input
                type="email"
                placeholder="Email address"
                // On mobile we add a white bg and rounded corners to the input since the form container is transparent
                className="flex-grow bg-white sm:bg-transparent px-6 py-3 sm:py-2 text-gray-800 rounded-full sm:rounded-none outline-none placeholder:text-gray-400 placeholder:text-sm font-medium text-sm lg:text-base"
                required
              />
              <button
                type="submit"
                // Preserved poppins-medium and your specific padding/colors
                className="bg-[#2D2926] text-[#F9F3E5] px-4 lg:px-8 py-3 sm:py-1 lg:py-2 rounded-full poppins-medium text-sm lg:text-base hover:bg-black transition-all active:scale-95 whitespace-nowrap"
              >
                Order now
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
