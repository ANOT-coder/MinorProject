import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div className="about-container">
      <Navbar />

      {/* Page Header */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        About Us
      </motion.h1>

      
       
      
        <p>Welcome to the <b>Financial Advisor</b> platform. Here, you get investment advice with  a portfolio composition.</p>
        <p>This is our <b>Third-Year Minor Project</b>, developed under the supervision of <b>Er. Ashok G.M. Sir</b>.</p>
        <p>The team members of this project include:</p>

      {/* Team Members Section */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ delay: 0.6, duration: 0.8 }}
        className="team-section"
      >
        
        <ul>
          {["Bidisha Amatya (HCE078BCT011)", "Prasanna Shakya (HCE078BCT026)", "Prinska Maharjan (HCE078BCT027)", "Sajal Maharjan (HCE078BCT033)"].map((member, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.0, color: "#41826E" }}
              transition={{ duration: 0.5 }}
            >
              {member}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default About;

