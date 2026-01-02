const SectionHeader = ({ title, description, align = "left" }) => {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "text-center" : "text-left"}>
      <h2 className="text-2xl md:text-3xl font-extrabold text-[rgb(226,98,73)]">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 text-sm md:text-base text-base-content/70 max-w-3xl mx-auto">
          {description}
        </p>
      ) : null}
      <div
        className={`${isCenter ? "mx-auto" : ""} mt-4 h-1 w-20 rounded-full bg-[rgb(226,98,73)]/70`}
      />
    </div>
  );
};

export default SectionHeader;
