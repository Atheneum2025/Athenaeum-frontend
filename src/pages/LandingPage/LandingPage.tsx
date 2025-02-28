import "./LandingPage.css";
import Logo_Light_Image from "../../assets/light_theme/logo.png";
import Logo_Dark_Image from "../../assets/dark_theme/logo.png"
export default function Landing() {
  return (
    <>
      <section>
        <div className="logo">
          {/* <img src={Logo_Light_Image} height="100px" width="100px" alt="Logo" /> */}
          <img src={Logo_Dark_Image} height="100px" width="100px" alt="Logo" />
        </div>
        <div className="hero-section">
          <div>
            <h1 className="head-title">ATHENAEUM</h1>
            <div className="para">
              <p className="">"Athenaeum - where knowledge meets wisdom".</p>
            </div>
          </div>

          <a href="/login" className="btn btn-start">
            START STUDYING!{" "}
          </a>
        </div>
      </section>

      <section className="section-2">
        <div>
          <p>What is ATHENAEUM ?</p>
          <p>
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
