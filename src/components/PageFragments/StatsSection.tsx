const StatsSection = () => {
  const stats = [
    {
      value: "94550",
      label: "Customers",
    },
    {
      value: "6000",
      label: "Product List",
    },
    {
      value: "499",
      label: "Discounts",
    },
    {
      value: "1280",
      label: "Reviews",
    },
  ];

  return (
    <section className="w-full bg-primary py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 place-items-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center w-full max-w-[280px] aspect-square rounded-full border-[8px] border-white/30 transition-all duration-300 hover:border-white/60 hover:bg-white/5"
            >
              {/* Statistic Number */}
              <h2 className="dm-sans text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">
                {stat.value}
              </h2>

              {/* Statistic Label */}
              <p className="dm-sans text-sm lg:text-base font-medium text-white/90 uppercase tracking-widest">
                {stat.label}
              </p>

              {/* Decorative line under label as seen in design */}
              <div className="w-12 h-[1.5px] bg-white/40 mt-4 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
