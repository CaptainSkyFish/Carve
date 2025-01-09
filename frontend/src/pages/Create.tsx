import React, { useState } from "react";

const Create: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const handlePublish = () => {
    if (!title || !description || !content) {
      alert("All fields are required!");
      return;
    }

    // Here, you would send the data to your backend or database
    console.log({ title, description, content });
    alert("Blog published successfully!");
    setTitle("");
    setDescription("");
    setContent("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Create a New Blog</h1>
      <div style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your blog title"
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a short description for your blog"
            style={styles.textarea}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="content" style={styles.label}>
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content here"
            style={styles.textarea}
          />
        </div>
        <button onClick={handlePublish} style={styles.button}>
          Publish
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
  },
  header: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "2rem",
  },
  form: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  formGroup: {
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "0.8rem",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "5px",
    outline: "none",
    transition: "border-color 0.2s",
  },
  textarea: {
    width: "100%",
    minHeight: "100px",
    padding: "0.8rem",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "5px",
    outline: "none",
    resize: "vertical",
    transition: "border-color 0.2s",
  },
  button: {
    width: "100%",
    padding: "0.8rem",
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#4caf50",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#45a049",
  },
};

export default Create;
