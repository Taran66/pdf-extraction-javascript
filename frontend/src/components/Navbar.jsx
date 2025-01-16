import { useState } from "react";
import arrow from '/assets/arrow.svg';
import { TypeAnimation } from 'react-type-animation';
import axios from "axios";

const Navbar = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      const userMessage = { type: "user", text: message };
      setConversation((prev) => [...prev, userMessage]);
      setMessage('');

      try {
        const response = await axios.post("http://localhost:5000/chat", { message });
        const botReply = { type: "bot", text: response.data.reply };
        setConversation((prev) => [...prev, botReply]);
      } catch (error) {
        console.error("Error sending message: ", error);
        alert("Failed to send message. Please try again");
      }
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen py-10">
      {/* <div className="flex justify-between">
        <h4 className="text-violet-800 font-bold text-xl">Askify</h4>
        <button className="group border-2 border-white p-2 rounded-md font-bold flex items-center gap-2 hover:border-violet-800">
          <span className="text-white group-hover:text-violet-800">Upload PDF</span>
        </button>
      </div> */}
      <div className="flex flex-col justify-between h-full mt-5 overflow-hidden">
        <div className="rounded-md h-3/4 bg-slate-900 opacity-60 p-5 overflow-y-scroll flex-grow">
          {conversation.map((msg, index) => (
            <div
              key={index}
              className={`${
                msg.type === "user" ? "bg-slate-600 ml-auto" : "bg-violet-600"
              } p-2 my-2 rounded-md w-2/5 text-slate-200 break-words text-left`}
            >
              {msg.type === "bot" ? (
                <TypeAnimation
                  sequence={[msg.text]}
                  wrapper="span"
                  cursor={true}
                  speed={100}
                />
              ) : (
                msg.text
              )}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex mt-5">
          <input
            type="text"
            value={message}
            onChange={handleChange}
            placeholder="Send a message..."
            className="bg-slate-800 w-full p-5 outline-none text-white"
          />
          <button type="submit" className="bg-slate-800 pr-5">
            <img src={arrow} alt="arrow-logo" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
