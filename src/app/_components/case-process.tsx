export type ProcessStep = {
  number: string;
  eyebrow: string;
  heading: string;
  body: string;
  methods: readonly string[];
  takeaway: string;
};

type CaseProcessProps = {
  id: string;
  title: string;
  intro: string;
  steps: readonly ProcessStep[];
};

export function CaseProcess({ id, title, intro, steps }: CaseProcessProps) {
  return (
    <section className="process" aria-labelledby={id}>
      <style>{`
        .process {
          margin-top: 72px;
          padding-top: 28px;
          border-top: 1px solid #e1e1e1;
        }
        .process-kicker {
          font-size: 14px;
          line-height: 1.4;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(41, 41, 41, 0.45);
          margin: 0 0 8px;
        }
        .process-title {
          font-size: 28px;
          line-height: 1.25;
          letter-spacing: -0.02em;
          font-weight: 300;
          margin: 0;
        }
        .process-intro {
          max-width: 680px;
          margin: 12px 0 0;
          font-size: 17px;
          line-height: 1.55;
          color: rgba(41, 41, 41, 0.7);
        }
        .process-list {
          display: grid;
          gap: 72px;
          margin: 72px 0;
        }
        .process-step {
          display: grid;
          grid-template-columns: 68px minmax(0, 1fr);
          gap: 24px;
          padding: 0;
        }
        .process-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 68px;
          height: 68px;
          box-sizing: border-box;
          border: 1px solid #d7d7d7;
          border-radius: 50%;
          background: #ffffff;
          font-size: 16px;
          line-height: 1;
          font-weight: 500;
          color: rgba(41, 41, 41, 0.5);
        }
        .process-eyebrow {
          margin: 0 0 5px;
          font-size: 13px;
          line-height: 1.4;
          font-weight: 500;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: rgba(41, 41, 41, 0.46);
        }
        .process-heading {
          margin: 0;
          font-size: 21px;
          line-height: 1.3;
          letter-spacing: -0.01em;
          font-weight: 400;
        }
        .process-body {
          margin: 12px 0 0;
          font-size: 16px;
          line-height: 1.58;
          color: rgba(41, 41, 41, 0.7);
        }
        .process-methods {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 18px;
        }
        .process-method {
          display: inline-flex;
          align-items: center;
          min-height: 28px;
          padding: 3px 10px;
          border: 1px solid rgba(41, 41, 41, 0.12);
          border-radius: 999px;
          background: #ffffff;
          font-size: 13px;
          color: rgba(41, 41, 41, 0.62);
        }
        .process-takeaway {
          margin: 20px 0 0;
          padding-top: 18px;
          border-top: 1px solid rgba(41, 41, 41, 0.1);
          font-size: 15px;
          line-height: 1.5;
          font-weight: 500;
          color: rgba(41, 41, 41, 0.76);
        }
        @media (max-width: 560px) {
          .process-step {
            grid-template-columns: 1fr;
            gap: 18px;
          }
        }
      `}</style>

      <p className="process-kicker">The process</p>
      <h2 id={id} className="process-title">
        {title}
      </h2>
      <p className="process-intro">{intro}</p>
      <div className="process-list">
        {steps.map((step) => (
          <article className="process-step" key={step.number}>
            <div className="process-number" aria-hidden="true">
              {step.number}
            </div>
            <div>
              <p className="process-eyebrow">{step.eyebrow}</p>
              <h3 className="process-heading">{step.heading}</h3>
              <p className="process-body">{step.body}</p>
              <div className="process-methods" aria-label="Methods used">
                {step.methods.map((method) => (
                  <span className="process-method" key={method}>
                    {method}
                  </span>
                ))}
              </div>
              <p className="process-takeaway">{step.takeaway}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
