import "./Footer.css"
import Logo_Light_Image from "../../assets/light_theme/logo.png";
import Logo_Dark_Image from "../../assets/dark_theme/logo.png";;

export default function Footer() {
  return (
    <>
      <footer>
        <div>
          <div className="company">
            <div className="company_name">
              <img src={Logo_Light_Image} alt="" />
              {/* <img src={Logo_Dark_Image} alt="" /> */}
              <p>ATHENAEUM</p>
            </div>
            <div>
              <div className="footer_title">Institution :</div>
              <p>St. Xavier's College</p>
              <p>Mapusa 403517</p>
              <p>BCA Lab</p>
            </div>
          </div>
          <div className="links">
            <div className="footer_title">Links :</div>
            <ul>
              <li>
                <a href="/home" >Home</a>
              </li>
              <li>
                <a href="/about" >About Us</a>
              </li>
              <li>
                <a href="/docs" >Docs</a>
              </li>
              <li>
                <a href="/course" >Courses</a>
              </li>
              <li>
                <a href="/contact" >Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="contact">
            <div className="footer_title">Contact :</div>
            <p>Phone Number: +zx xyz-xyz-zyxy</p>
            <p>Email: athenaeum2025@gmail.com</p>
          </div>
          <div className="feedback_form">
            <div className="footer_title">Give Your Feedback :</div>
            <textarea name="" id=""></textarea>
            <button>Send Feedback</button>
          </div>
        </div>

        {/* <div className="date">
          <div>Date: {Date.now()}</div>
        </div> */}
        <div className="trademark" >Design @Athenaeum2025 all rights reserved.</div>
      </footer>
    </>
  )
}
