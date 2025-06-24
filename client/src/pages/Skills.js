import React, { useEffect, useState } from 'react';
import './Skills.css';
import { motion } from 'framer-motion';

const vfxColors = [
  "#00e6e6", "#ff4081", "#00e6e6", "#ff4081", "#00e6e6", "#ff4081"
];

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch("/api/skills");
        const data = await res.json();
        setSkills(data);
      } catch (err) {
        setSkills([]);
      }
    };
    fetchSkills();
  }, []);

  return (
    <motion.section
      className="skills-section vfx-bg"
      id="skills"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* VFX Bubbles */}
      <div className="skills-vfx">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className={`skills-bubble skills-bubble${i + 1}`}
            style={{ background: vfxColors[i % vfxColors.length] }}
          ></span>
        ))}
      </div>

      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <span className="highlight">My Skills</span>
      </motion.h2>

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <motion.div
            key={skill._id}
            className="skill-square"
            initial={{ y: 60, opacity: 0, scale: 0.9 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.08, boxShadow: "0 8px 32px #00e6e655" }}
            transition={{ duration: 0.6, delay: index * 0.08, type: "spring" }}
          >
            <span className="skill-name">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Skills;
