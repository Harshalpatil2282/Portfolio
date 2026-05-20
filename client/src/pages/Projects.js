import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Projects.css";
import { motion } from "framer-motion";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("/api/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="projects-section" id="projects">
      <h2 className="projects-heading">🚀 My Projects</h2>
      <div className="projects-grid">
        {projects.map((proj, i) => (
          <motion.div
            className="project-card"
            key={proj._id || i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            {proj.image && (
              <img src={proj.image} alt={proj.title} className="project-image" />
            )}
            <h3 className="project-title">{proj.title}</h3>
            <p className="project-desc">{proj.description}</p>
            <div className="tech-stack">
              {(Array.isArray(proj.techStack) ? proj.techStack : [proj.techStack]).map((tech, index) => (
                <span className="tech-badge" key={index}>{tech}</span>
              ))}
            </div>
            <div className="project-links">
              {proj.github && (
                <a href={proj.github} target="_blank" rel="noreferrer">GitHub</a>
              )}
              {proj.link && (
                <a href={proj.link} target="_blank" rel="noreferrer">Live Demo</a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
