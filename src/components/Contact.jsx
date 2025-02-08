import React, {useState} from "react";
import {Send} from "lucide-react";

const NEON_CLASSES =
    "bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-[0_0_15px_rgba(168,101,201,0.8)]";

// List of trusted email domains
const trustedDomains = [
    "gmail.com", "outlook.com", "yahoo.com", "hotmail.com", "icloud.com", "protonmail.com", "aol.com"
];

export default function Contact() {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");

    const handleInput = (event) => {
        event.target.style.height = "auto"; // Reset height
        event.target.style.height = event.target.scrollHeight + "px"; // Expand height dynamically
        setMessage(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validation: Check if all fields are filled
        if (!name.trim() || !email.trim() || !message.trim()) {
            alert("Please fill in all fields before submitting.");
            return;
        }

        // Extract domain from email
        const emailDomain = email.split("@")[1];

        if (!trustedDomains.includes(emailDomain)) {
            alert("Please use a valid email provider like Gmail, Outlook, or Yahoo.");
            setEmail(""); // Clear email field
            return;
        }

        // Web3Forms API Submission
        const formData = new FormData();
        formData.append("access_key", "730e1c83-0ce7-433a-b59d-055e9f024026"); // Replace with your Web3Forms key
        formData.append("subject", "New Submission from Portfolio");
        formData.append("botcheck", "");
        formData.append("name", name);
        formData.append("email", email);
        formData.append("message", message);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (result.success) {
                setStatus("Message sent successfully!");
                setTimeout(() => setStatus(""), 3000); // Clear status message after 3 sec

                // Clear input fields
                setEmail("");
                setMessage("");
                setName("");
            } else {
                setStatus("Failed to send message. Please try again.");
            }
        } catch (error) {
            setStatus("Error sending message. Please try again.");
        }
    };

    return (
        <section id="contact" className="py-20">
            <div className="max-w-6xl mx-auto px-6 lg:px-12">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    Contact
                </h2>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Left Section: Contact Info */}
                    <div className="hidden md:flex flex-col justify-center self-start space-y-6">
                        <h3 className="text-3xl font-bold">Get in touch</h3>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            I'd love to hear from you! Whether you have a question, feedback,
                            or just want to connect, feel free to reach out.
                        </p>

                        <div className="space-y-2 text-lg text-gray-700 dark:text-gray-300">
                            <p>
                                You can drop a <strong>Hi</strong> on WhatsApp : <br/>
                                <a
                                    href="https://wa.me/918793738304"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    +91 8793738304
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Right Section: Contact Form */}
                    <div className="w-full">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={handleNameChange}
                                className="w-full px-4 py-2 border border-gray-400 dark:border-gray-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                                className="w-full px-4 py-2 border border-gray-400 dark:border-gray-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500"
                            />
                            <textarea
                                placeholder="Message"
                                value={message}
                                onInput={handleInput}
                                rows="2"
                                className="w-full px-4 py-2 border border-gray-400 dark:border-gray-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
                            />

                            {/* Submission Status */}
                            {status && <p className="text-center text-green-500">{status}</p>}

                            {/* Neon-Themed Submit Button */}
                            <button
                                type="submit"
                                className={`flex items-center justify-center space-x-2 w-full px-6 py-3 text-white rounded-lg transition-all shadow-lg ${NEON_CLASSES}`}
                            >
                                <Send className="w-5 h-5"/>
                                <span>Send Message</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
