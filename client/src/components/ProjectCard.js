import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ title, description, tech, demoLink, codeLink, image }) => {
  return (
    <div className="project-card">
      <img src={image} alt={title} className="project-img" />
      <div className="project-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <p className="tech-used">{tech}</p>
        <div className="project-links">
          <a href={demoLink} target="_blank" rel="noreferrer">Live Demo</a>
          <a href={codeLink} target="_blank" rel="noreferrer">Source Code</a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
