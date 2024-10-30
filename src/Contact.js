import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { BASE_URL } from './config'; // Adjust path based on file location

const Contact = () => {
  // State for handling form data and errors
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    message: "",
  });

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    try {
      // Send form data to the server using axios
      const response = await axios.post(
        `${BASE_URL}/email/contact`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check response status
      if (response.status === 200) {
        alert("Message sent successfully!");
        setFormData({
          fullname: "",
          email: "",
          message: "",
        });
      } else {
        alert("Failed to send the message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to send the message. Please try again.");
    }
  };

  return (
    <Wrapper>
      <h2 className="common-heading">Contact US</h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.261714126435!2d78.33457567414382!3d17.49501589969769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93df8b4a01f7%3A0x50037b62ec1c23c8!2sWeblabs%20Technologies!5e0!3m2!1sen!2sin!4v1722503414371!5m2!1sen!2sin"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div className="container">
        <div className="contact-form">
          <form onSubmit={handleSubmit} className="contact-inputs">
            <input
              type="text"
              placeholder="Full Name"
              name="fullname"
              required
              autoComplete="off"
              onChange={handleChange}
              value={formData.username} // Bind value to form data
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              required
              onChange={handleChange}
              value={formData.email} // Bind value to form data
            />

            <textarea
              name="message"
              cols="30"
              rows="10"
              required
              autoComplete="off"
              placeholder="Enter your message"
              onChange={handleChange}
              value={formData.message} // Bind value to form data
            ></textarea>

            <input type="submit" value="Send" />
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 9rem 0 5rem 0;
  text-align: center;
  margin-top: 100px;

  .container {
    margin-top: 6rem;

    .contact-form {
      max-width: 50rem;
      margin: auto;

      .contact-inputs {
        display: flex;
        flex-direction: column;
        gap: 3rem;

        input[type="submit"] {
          cursor: pointer;
          &:hover {
            background-color: ${({ theme }) => theme.colors.white};
            border: 1px solid ${({ theme }) => theme.colors.btn};
            color: ${({ theme }) => theme.colors.btn};
            transform: scale(0.9);
          }
        }
      }
    }
  }
`;

export default Contact;
