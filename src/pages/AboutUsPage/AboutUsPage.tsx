import React, { useState, useEffect } from "react";
import ContactUs from "../ContactUs/ContactUs";
import "./AboutUsPage.css";
import Logo_Image from "../../assets/logoo.png";

export default function AboutUsPage() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState([false, false, false]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Check visibility of sections
      const sectionPositions = [400, 800, 1200];
      const newVisibility = sectionPositions.map(pos => window.scrollY > pos);
      setVisibleSections(newVisibility);
    };

    window.scrollTo(0, 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <div className="about-hero">
        {/* Logo Background - Add this div */}
        <div className="hero-logo-background">
          <img
            src={Logo_Image}
            alt="Athenaeum Logo"
            className="transparent-logo"
            style={{
              height: '70vh', // Adjust this value (70% of viewport height)
              marginTop: '-31%' // Fine-tune vertical position
            }}
          />
        </div>

        <div className="about-hero-content" style={{ opacity: Math.max(1 - scrollY / 500, 0) }}>
          <h1 className="about-title">
            <span className="gradient-text">ABOUT ATHENAEUM</span>
          </h1>
          <p className="about-subtitle">
            "Where knowledge meets wisdom"
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="about-container">
        {/* Intro Section */}
        <div className={`about-section ${visibleSections[0] ? "visible" : ""}`}>
          <div className="about-card">
            <h2 className="section-heading">
              <span className="icon-circle">
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </span>
              Our Platform
            </h2>
            <p className="about-text">

              Athenaeum aims to provide easy and efficient access to any and all study related materials to students at their own convenience.
              Our mission is to bridge the gap in availability of academic resources without the hassle of a paywall or a heap of resources' clutter to comb through.
              through intuitive design, advanced search capabilities, and personalized learning experiences.


              {/* revolutionizes academic collaboration by connecting students and professors 
              for seamless study material distribution. We're breaking down barriers in education 
              with cutting-edge technology and .*/}
            </p>
          </div>
        </div>



        {/* How It Works Section */}
        <div className={`how-it-works ${visibleSections[1] ? "visible" : ""}`}>
          <div className="about-card">
            <h2 className="section-heading">
              <span className="icon-circle">
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />              </svg>
              </span>
              How It Works
            </h2>

            <div className="steps-container">
              <div className="step">
                <div className="step-content">
                  <h3>📖 Professors upload their study materials and notes to our digital library</h3>
                </div>
              </div>

              <div className="step">
                <div className="step-content">
                  <h3>✍️ Students can upload their own notes to private collections.</h3>
                </div>
              </div>

              <div className="step">
                <div className="step-content">
                  <h3>🌐 Access the finest academic resources anytime, anywhere.</h3>
                </div>
              </div>

              <div className="step">
                <div className="step-content">
                  <h3>🧠 Reinforce learning with quizzes curated by the professors</h3>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Mission/Vision Grid */}
        <div className="about-grid">
          <div className={`about-grid-card vision ${visibleSections[1] ? "visible" : ""}`}>
            <div className="card-icon">
              <svg viewBox="0 0 24 24">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3>Our Vision</h3>
            <p>
              To create a study resource ecosystem that empowers every learner through
              innovative collaboration tools and smart technology.
            </p>
          </div>

          <div className={`about-grid-card mission ${visibleSections[1] ? "visible" : ""}`}>
            <div className="card-icon">
              <svg viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3>Our Mission</h3>
            <p>
              To provide the most intuitive academic platform where knowledge flows
              effortlessly between educators and students.
            </p>
          </div>
        </div>


        {/* Team Section
          
        <div className={`team-section ${visibleSections[2] ? "visible" : ""}`}>
          <h2 className="section-heading">
            <span className="icon-circle">
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            </span>
            Meet The Team
          </h2>
          <p className="team-description">
            We're a diverse collective of education innovators, tech enthusiasts, 
            and design thinkers committed to transforming how knowledge is shared.
          </p>
          
          <div className="team-grid">
            {['Development', 'Design', 'Education', 'Support'].map((dept, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">{index + 1}</div>
                <h4>{dept} Team</h4>
              </div>
            ))}
          </div>
        </div> */}





        {/* Contact Section */}
        <div className="contact-section">
          <ContactUs />
        </div>
      </div>
    </div>
  );
}