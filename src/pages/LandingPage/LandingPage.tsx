import "./LandingPage.css";
export default function Landing() {
  return (
    <>
      <section>
        <div className="logo">LOGO</div>
        <div className="hero-section">
          <div>
            <h1 className="head-title" style={{ fontVariant: "small-caps" }} >ATHENAEUM</h1>
            <p className="para">
              "Unlock the power of wisdom and strategy - Learn like Athena".
            </p>
          </div>

          <button className="btn btn-start">
            <a href="/login">Start Studying</a>
          </button>
        </div>
      </section>
      <section className="section-2">
        <div>
          <p>What is ATHENAEUM ?</p>
          <p className="">
            A platform built to make studying and education more streamlined and
            accessible, where the content is provided directly by professors and
            categorised in a way which makes finding relevant content less
            cumbersome.
          </p>
        </div>
      </section>
    </>
  );
}
