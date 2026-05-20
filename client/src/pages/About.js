import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './About.css';
import profile from "../assets/Harsh_profile.jpg";

const skills = [
  "Full Stack Web Dev",
  "HTML, CSS, JS",
  "React + Node.js",
  "Express.js",
  "Python",
  "C++", "JAVA(Core)", "Data Structures and Algorithms",
  "Object-Oriented Programming", "MongoDB",
  "Git, GitHub", "PostMan", "backend", "ML Enthusiast",
  "Creative Coding",
  "Open Source",
];

const About = () => {
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    axios.get('/api/resume/link')
      .then(res => setResumeUrl(res.data.url || ''))
      .catch(() => setResumeUrl(''));
  }, []);

  return (
    <motion.section
      id="about"
      className="about-section vfx-bg"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="about-inner">
        <motion.div
          className="profile-float"
          initial={{ y: 0 }}
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <img src={profile} alt="Harshal Patil" className="profile-img" />
          <div className="profile-glow"></div>
        </motion.div>

        <motion.div
          className="bio"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h2>
            <span className="highlight">About Me</span>
          </h2>
          <p>
            Hi! I'm <span className="highlight">Harshal Patil</span>, a passionate{' '}
            <span className="accent">Full Stack Developer</span> and{' '}
            <span className='accent'>Strong foundation in Java</span>,{' '}
            <span className="accent">AI Enthusiast</span>. I love building seamless,
            modern web apps and exploring the world of{' '}
            <span className="accent">Machine Learning</span> and{' '}
            <span className="accent">AI-powered solutions</span>.
          </p>
          <p>
            I enjoy teaching tech, solving real-world problems, and learning new things every day.
            Let's create something <span className="highlight">amazing</span> together!
          </p>

          <div className="about-skills">
            {skills.map((skill, idx) => (
              <motion.span
                key={skill}
                className="about-skill"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>

          {resumeUrl ? (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="resume-btn"
            >
              Download Resume
            </a>
          ) : (
            <span className="resume-btn resume-btn-disabled">Resume Coming Soon</span>
          )}
        </motion.div>
      </div>

      {/* VFX background bubbles */}
      <div className="about-vfx">
        {[...Array(8)].map((_, i) => (
          <span key={i} className={`bubble bubble${i + 1}`}></span>
        ))}
      </div>
    </motion.section>
  );
};

export default About;
