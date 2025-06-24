import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const Admin = ({ setAuth }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        techStack: "",
        image: "",
        github: "",
        link: "",
    });
    const [projects, setProjects] = useState([]);
    const [editId, setEditId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const fetchMessages = async () => {
        try {
            const res = await axios.get("/api/contact", config);
            setMessages(res.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    // Fetch all projects
    const fetchProjects = async () => {
        try {
            const res = await axios.get("/api/projects");
            setProjects(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Fetch all skills
    const fetchSkills = async () => {
        try {
            const res = await axios.get("/api/skills");
            setSkills(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProjects();
        fetchMessages();
        fetchSkills();
    }, []);

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Submit or update project
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                // Update project
                await axios.put(`/api/projects/edit/${editId}`, formData, config);
            } else {
                // Add project
                await axios.post("/api/projects/add", formData, config);
            }
            setFormData({ title: "", description: "", techStack: "", image: "", github: "", link: "" });
            setEditId(null);
            fetchProjects();
        } catch (err) {
            alert("Error: " + (err.response?.data?.error || "Failed to save project"));
        }
    };

    // Handle delete
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            try {
                await axios.delete(`/api/projects/delete/${id}`, config);
                fetchProjects();
            } catch (err) {
                alert("Error: " + (err.response?.data?.error || "Failed to delete project"));
            }
        }
    };

    // Handle edit
    const handleEdit = (project) => {
        setFormData(project);
        setEditId(project._id);
    };

    // Add a skill
    const handleAddSkill = async (e) => {
        e.preventDefault();
        if (!skillInput.trim()) return;
        try {
            await axios.post("/api/skills/add", { name: skillInput }, config);
            setSkillInput("");
            fetchSkills();
        } catch (err) {
            alert("Error: " + (err.response?.data?.error || "Failed to add skill"));
        }
    };

    // Delete a skill
    const handleDeleteSkill = async (id) => {
        if (window.confirm("Delete this skill?")) {
            try {
                await axios.delete(`/api/skills/delete/${id}`, config);
                fetchSkills();
            } catch (err) {
                alert("Error: " + (err.response?.data?.error || "Failed to delete skill"));
            }
        }
    };

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem("token");
        setAuth(false);
        navigate("/login");
    };

    return (
        <div className="admin-section">
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <h2>{editId ? "Edit Project" : "Add New Project"}</h2>
            <form className="admin-form" onSubmit={handleSubmit}>
                <input type="text" name="title" value={formData.title} placeholder="Project Title" onChange={handleChange} required />
                <input type="text" name="description" value={formData.description} placeholder="Description" onChange={handleChange} required />
                <input type="text" name="techStack" value={formData.techStack} placeholder="Tech Stack (comma-separated)" onChange={handleChange} required />
                <input type="text" name="image" value={formData.image} placeholder="Image URL" onChange={handleChange} />
                <input type="text" name="github" value={formData.github} placeholder="GitHub URL" onChange={handleChange} />
                <input type="text" name="link" value={formData.link} placeholder="Live Demo URL" onChange={handleChange} />
                <button type="submit">{editId ? "Update Project" : "Add Project"}</button>
            </form>

            <hr style={{ margin: "40px 0", borderColor: "#333" }} />

            <h3>📋 Existing Projects</h3>
            <ul className="project-list">
                {projects.map((p) => (
                    <li key={p._id}>
                        <strong>{p.title}</strong>
                        <button onClick={() => handleEdit(p)}>Edit</button>
                        <button onClick={() => handleDelete(p._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <hr style={{ margin: "40px 0", borderColor: "#333" }} />
            <h3>📨 Contact Messages</h3>
            <ul className="message-list">
                {messages.length === 0 ? (
                    <p>No messages yet.</p>
                ) : (
                    messages.map((msg) => (
                        <li key={msg._id} style={{ background: "#222", padding: "12px", borderRadius: "8px", marginBottom: "12px" }}>
                            <p><strong>Name:</strong> {msg.name}</p>
                            <p><strong>Email:</strong> {msg.email}</p>
                            <p><strong>Message:</strong> {msg.message}</p>
                            <p style={{ fontSize: "0.8rem", color: "#888" }}>🕒 {new Date(msg.createdAt).toLocaleString()}</p>
                        </li>
                    ))
                )}
            </ul>
            <hr style={{ margin: "40px 0", borderColor: "#333" }} />
            <h3>🛠️ Manage Skills</h3>
            <form onSubmit={handleAddSkill} style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                <input
                    type="text"
                    value={skillInput}
                    onChange={e => setSkillInput(e.target.value)}
                    placeholder="Add new skill"
                    required
                />
                <button type="submit">Add Skill</button>
            </form>
            <ul className="skill-list">
                {skills.map(skill => (
                    <li key={skill._id} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                        <span>{skill.name}</span>
                        <button onClick={() => handleDeleteSkill(skill._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;
