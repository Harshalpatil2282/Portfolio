import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Projects.css"; // <-- Make sure this CSS file exists
import { motion } from "framer-motion";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/projects")
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
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <img src={proj.image} alt={proj.title} className="project-image" />
            <h3 className="project-title">{proj.title}</h3>
            <p className="project-desc">{proj.description}</p>
            <div className="tech-stack">
              {proj.techStack.map((tech, index) => (
                <span className="tech-badge" key={index}>{tech}</span>
              ))}
            </div>
            <div className="project-links">
              {proj.github && (
                <a href={proj.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              )}
              {proj.link && (
                <a href={proj.link} target="_blank" rel="noreferrer">
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;







// import React from 'react';
// import ProjectCard from '../components/ProjectCard';
// import './Projects.css';
// import { motion } from 'framer-motion';

// const projectData = [
//   {
//     title: "AI Resume Builder",
//     description: "Generate professional resumes using AI. PDF export, templates & suggestions.",
//     tech: "React, Java, Spring, AI NLP",
//     demoLink: "#",
//     codeLink: "https://github.com/harshal-ai/resume-builder",
//     image: "https://via.placeholder.com/300x200?text=Resume+Builder"
//   },
//   {
//     title: "SkillShare Lite",
//     description: "Micro-learning platform with subscriptions, progress tracking, and badges.",
//     tech: "MERN, JWT, Stripe",
//     demoLink: "#",
//     codeLink: "https://github.com/harshal-ai/skillshare-lite",
//     image: "https://via.placeholder.com/300x200?text=SkillShare+Lite"
//   }
// ];

// const Projects = () => {
//   return (
//     <motion.section
//       className="projects-section"
//       id="projects"
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1 }}
//       transition={{ duration: 1 }}
//     >
//       <motion.h2
//         initial={{ y: -50, opacity: 0 }}
//         whileInView={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6 }}
//       >
//         My Projects
//       </motion.h2>

//       <motion.div
//         className="projects-grid"
//         initial="hidden"
//         whileInView="visible"
//         variants={{
//           visible: {
//             transition: {
//               staggerChildren: 0.2
//             }
//           }
//         }}
//       >
//         {projectData.map((project, index) => (
//           <motion.div
//             key={index}
//             variants={{
//               hidden: { opacity: 0, y: 40 },
//               visible: { opacity: 1, y: 0 }
//             }}
//             transition={{ duration: 0.6 }}
//           >
//             <ProjectCard {...project} />
//           </motion.div>
//         ))}
//       </motion.div>
//     </motion.section>
//   );
// };

// export default Projects;
