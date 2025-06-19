import React from 'react';
import { motion } from "framer-motion";
import Navbar from '../components/Navbar';

const Contact = () => {
    return (
        <div className="contact-container">
            <Navbar/>
            <motion.h1 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }}
            >
        Contact Us
      </motion.h1>
            <p>If you have any queries, feedbacks feel free to reach out !</p>
            <p>BCT078</p>
            <p>Himalaya College of Engineering</p>
            <p>Chyasal,Lalitpur</p>
        </div>
    );
};

export default Contact;
