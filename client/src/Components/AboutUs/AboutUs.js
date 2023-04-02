
import './App.css';
import home1 from "../../Images/home1.jpg"
import "./index.css"
import "./about_page.css";
function AboutUs() {
  return (
       <div class="about-us-body">

<section class="about">
    <div class="main">
        <img src={home1} />
        <div class="about-text">
            <h1>About Us</h1>

            <span class="about-us-heading"> Our Mission</span>
            <p className="aboutUs-desc">Our mission at Securify is to provide a cutting-edge document
                verification service that leverages the power of blockchain technology to ensure the highest
                level of security and transparency. We aim to provide a reliable and efficient platform for
                individuals and businesses to verify the authenticity of their important documents, such as IDs,
                passports, and certificates, without the need for physical verification.</p>
            <span class="about-us-heading"> Our Goal</span>
            <p className="aboutUs-desc">
                Our goal is to utilize the immutability and decentralization of the blockchain to create a
                tamper-proof and verifiable digital record of each document verification. We believe that this
                approach can revolutionize the document verification process, providing a secure and trustworthy
                solution to prevent fraud, identity theft, and other malicious activities.</p>
            <a href="https://google.com" class="button">Contact Us</a>
        </div>

    </div>


</section>

<footer class="about-footer">
    <p class="footer-text">&copy; 2023 Certification Verification</p>
</footer>


</div>
  );
}

export default AboutUs;
