import React, { useState } from "react";
import colors from "../config/colors";
import { StyleSheet } from "react-native";

const UploadAudio = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType === "audio/mpeg" || fileType === "audio/wav") {
        setSelectedFile(file);
        setErrorMessage("");
      } else {
        setErrorMessage("Please select a valid audio file (mp3 or wav).");
        setSelectedFile(null);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile || !name || !phoneNumber || !email) {
      setErrorMessage("Please fill in all required fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("name", name);
    formData.append("phoneNumber", phoneNumber);
    formData.append("email", email);
    formData.append("comments", comments);

    try {
      const response = await fetch("YOUR_BACKEND_API_ENDPOINT", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setErrorMessage("File uploaded successfully!");
      } else {
        setErrorMessage("Failed to upload file.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while uploading the file.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.text}>Send us your Music</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          style={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          style={styles.input}
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
        />
        <input
          style={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <textarea
          style={styles.textarea}
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Comments"
        />
        <input
          style={styles.input}
          type="file"
          accept=".mp3, .wav"
          onChange={handleFileChange}
        />
        {selectedFile && <p>Selected File: {selectedFile.name}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundImage:
      "url('https://res.cloudinary.com/djunroohl/image/upload/v1723400133/Superman_tpf7or.png')",
    borderColor: colors.secondary,
    borderRadius: 5,
    borderWidth: 5,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Bruno Ace SC",
  },
  form: {
    color: "white",
    fontsize: 16,
    fontfamily: "Bruno Ace SC",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  input: {
    color: "white",
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    marginBottom: 10,
    paddingLeft: 8,
    width: 400,
  },
  textarea: {
    color: "white",
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
    borderRadius: 5,
    borderWidth: 1,
    height: 80,
    marginBottom: 10,
    paddingLeft: 8,
    width: 400,
  },
  button: {
    color: "white",
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    marginBottom: 10,
    paddingLeft: 8,
    width: 400,
    textAlign: "center",
    lineHeight: "40px",
  },
});

export default UploadAudio;
