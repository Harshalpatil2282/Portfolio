import React from 'react';
import './Timeline.css';
import { motion } from 'framer-motion';

const timelineData = [
  {
  title: "Primary Education (Class 1 – 4)",
  institution: "Z.P. School",
  duration: "2012 – 2016",
  description: "Back when school meant more play than pressure — I went to class for the crayons, not the curriculum. Still, the spark of learning quietly took root."
}
,
{
  title: "Secondary Education (Class 5 – 10)",
  institution: "S.J.Y.B.M. High School",
  duration: "2016 – 2021",
  description: "Completed SSC with distinction.10th Grade Percentage: 93.80%"
},
{
  title: "Higher Secondary Education (Class 11 – 12)",
  institution: "S.S.V.P.S. College, SNK",
  duration: "2021 – 2023",
  description: "After completing 10th grade, my curiosity for learning deepened — especially in the world of technology. With a strong foundation in mathematics and a genuine love for problem-solving, I naturally gravitated towards the science stream, setting the stage for my engineering journey. 12th Grade Percentage: 75.33%"
}
,
{
  title: "Bachelor of Technology – Computer Engineering",
  institution: "SVKM's NMIMS, Shirpur Campus",
  duration: "2023 – 2027 (Expected)",
  description: "Currently pursuing a B.Tech degree in Computer Engineering with a focus on full-stack development, data structures, algorithms, and software engineering principles."
}

];

const Timeline = () => {
  return (
    <motion.section
      className="timeline-section"
      id="timeline"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h2
        initial={{ y: -40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        My Journey
      </motion.h2>

      <div className="timeline-container">
        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            className="timeline-item"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="timeline-dot" />
            <div className="timeline-content">
              <h3>{item.title}</h3>
              <h4>{item.institution}</h4>
              <span className="timeline-date">{item.duration}</span>
              <p>{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Timeline;
