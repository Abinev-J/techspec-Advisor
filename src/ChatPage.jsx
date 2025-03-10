import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function ChatPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Static Responses: A set of predefined questions and answers
  const staticResponses = {
    "what is techspec advisor?":
      "TechSpec Advisor helps you select electronic components based on your project requirements and budget.",
    "how do i use techspec advisor?":
      "Simply type your question, specify your budget, and get detailed suggestions for electronic components.",
    "what components can i find?":
      "You can find components like ICs, resistors, sensors, capacitors, and more.",
    "can i specify my budget?":
      "Yes, you can enter a budget, and the chatbot will suggest components that fit within it.",
    "how accurate are the suggestions?":
      "The suggestions are based on commonly used components and pricing trends in the industry.",
    "what types of projects can i use it for?":
      "TechSpec Advisor is suitable for electronics projects, ranging from simple circuits to advanced prototypes.",
    "is it free to use?":
      "Yes, TechSpec Advisor is free to use for basic inquiries and suggestions.",
    "can i get part numbers for the components?":
      "Yes, each component suggestion includes the part number along with its specifications.",
    "how do i get more detailed specs?":
      "You can click on the component names for more detailed specifications and datasheets.",
    "can i request custom components?":
      "Currently, the chatbot provides suggestions from a predefined set of components. Custom parts are not yet supported.",
    "how do i choose the right component?":
      "Specify your requirements, and the chatbot will suggest components based on compatibility, budget, and availability.",
    "what are ics?":
      "ICs (Integrated Circuits) are chips that contain multiple electronic components in a single package, used for various functions.",
    "what is a resistor?":
      "A resistor is an electrical component that resists the flow of current, used to control the voltage and current in circuits.",
    "what is a sensor?":
      "A sensor is a device that detects changes in the environment, like temperature, light, motion, etc.",
    "how can i find pricing for components?":
      "Component prices depend on suppliers, but the chatbot can suggest components within your budget range.",
    "what is the temperature coefficient of a resistor?":
      "The temperature coefficient indicates how much the resistance of a resistor changes with temperature.",
    "can i use the suggestions for a specific project?":
      "Yes, you can provide more details about your project, and the chatbot will suggest components tailored to your needs.",
    "what are capacitors used for?":
      "Capacitors store and release electrical energy in a circuit, typically used for smoothing voltage or filtering signals.",
    "what is a diode?":
      "A diode is a semiconductor device that allows current to flow in one direction only, often used for rectification in circuits.",
    "what is a microcontroller?":
      "A microcontroller is a small computer on a single chip that controls other components in an embedded system.",
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMessage = message.trim().toLowerCase(); // Normalize the case
    const userMessageTimestamp = new Date().toLocaleTimeString();

    // Add the user message to the chat state
    setChat((prevChat) => [
      ...prevChat,
      { user: message, bot: "", timestamp: userMessageTimestamp },
    ]);

    setMessage(""); // Clear input field
    setLoading(true); // Set loading state to true

    // Static response logic
    let botMessageText = staticResponses[userMessage];

    if (!botMessageText) {
      botMessageText = "I'm sorry, I don't have an answer for that.";
    } else if (typeof botMessageText === "object") {
      console.log("Bot message is an object:", botMessageText);
      // If the botMessage is an object, extract the relevant text
      botMessageText =
        botMessageText.text || "I'm sorry, I don't have an answer for that.";
    }

    // Simulate loading time (e.g., 1.5 seconds)
    setTimeout(() => {
      const botMessageTimestamp = new Date().toLocaleTimeString();

      // Add the bot response to the chat state
      setChat((prevChat) => [
        ...prevChat,
        { user: "", bot: botMessageText, timestamp: botMessageTimestamp },
      ]);

      setLoading(false); // Stop loading
    }, 1500); // Adjust this value for longer or shorter loading time
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && message.trim()) {
      sendMessage();
    }
  };

  useEffect(() => {
    setChat([
      {
        user: "",
        bot: "Welcome to TechSpec Advisor! How can I assist you today?",
        timestamp: new Date().toLocaleTimeString(),
      },
      ...chat,
    ]);
  }, []);

  return (
    <div className="chat-container">
     <Link to="/" className="back-to-home">
  Back to Home
</Link>

      <h1>Chat with TechSpec Advisor</h1>

      <div className="chat-box">
        {chat.map((c, index) => (
          <div
            key={index}
            className={`chat-message ${
              c.user ? "user-message" : "bot-message"
            }`}
          >
            <div className="message-content">
              <p>
                <strong>
                  <div className="avatar">
                    <img
                      src={
                        c.user
                          ? "https://res.cloudinary.com/dezw1axnm/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1732509011/anime-male-avatar__oaxbzp.avif"
                          : "https://res.cloudinary.com/dezw1axnm/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1732508803/chatbot-robo-advisor_pknnqe.webp"
                      }
                      alt={c.user ? "User" : "Bot"}
                      className="avatar-img"
                    />
                  </div>
                </strong>{" "}
                {c.user || c.bot}
              </p>
              <span className="timestamp">{c.timestamp}</span>
            </div>
          </div>
        ))}

        {/* Loading Indicator with Bot Avatar */}
        {loading && (
          <div className="loading">
            <div className="avatar">
              <img
                src="https://i.pravatar.cc/150?img=5"
                alt="Bot"
                className="avatar-img"
              />
            </div>
            <span className="loader"></span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          autoFocus
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatPage;
