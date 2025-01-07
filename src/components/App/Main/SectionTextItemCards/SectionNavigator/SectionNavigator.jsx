import "./SectionNavigator.css";

function SectionNavigator({ maxSectionCount, sectionIndex, setSectionIndex }) {
  const handlePrevClick = () => {
    if (sectionIndex > 0) setSectionIndex((prev) => prev - 1);
    console.log("prev click");
  };

  const handleNextClick = () => {
    if (sectionIndex < maxSectionCount - 1) {
      setSectionIndex((prev) => prev + 1);
    }
    console.log("next click");
  };

  const handleDotClick = (index) => {
    setSectionIndex(index);
  };

  return maxSectionCount ? (
    <div className="section-navigator">
      <button className="section-navigator__arrow" onClick={handlePrevClick}>
        &lt;
      </button>
      <div className="section-navigator__dots">
        {Array.from({ length: maxSectionCount }, (_, index) => (
          <span
            key={index}
            className={`section-navigator__dot ${
              index === sectionIndex ? "active" : ""
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
      <button className="section-navigator__arrow" onClick={handleNextClick}>
        &gt;
      </button>
    </div>
  ) : (
    ""
  );
}

export default SectionNavigator;
