import React from 'react';
import "./Landing.css";
export default function Landing() {
  return (
    <>
      <section>
        <div className="logo">LOGO</div>
        <div className="hero-section">
          <div>
            <h1 className="head-title">Wish On An Eyelash Pt. 2</h1>
            <p className="para">
              Lost and Found
            </p>
          </div>

          <button className="btn btn-start">
            <a href="/login">Make a Wish</a>
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
