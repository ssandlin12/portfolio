type Placeholder = {
  label: string;
};

export type PlainCaseStudySection = {
  title: string;
  paragraphs: readonly string[];
  placeholders?: readonly Placeholder[];
};

export function PlainCaseStudy({
  sections,
}: {
  sections: readonly PlainCaseStudySection[];
}) {
  return (
    <>
      {sections.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.placeholders?.map((placeholder) => (
            <div
              key={placeholder.label}
              role="img"
              aria-label={placeholder.label}
              style={{
                border: "1px solid #ccc",
                minHeight: 220,
                display: "grid",
                placeItems: "center",
                padding: 16,
                margin: "16px 0",
              }}
            >
              {placeholder.label}
            </div>
          ))}
        </section>
      ))}
    </>
  );
}
