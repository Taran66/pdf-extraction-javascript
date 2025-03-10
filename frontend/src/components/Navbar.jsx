import { useState } from "react";
import arrow from '/assets/arrow.svg';
import { TypeAnimation } from 'react-type-animation';
import axios from "axios";
import file_img from '/assets/file.svg'

const Navbar = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [file, setFile] = useState(null);
  const [visible, setVisible] = useState(false);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleFileChange = async(e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
      await uploadFile(selectedFile);
  } else {
    alert("Please upload a PDF file")
  }
  }

  const handleDrop = async(e) => {
    const selectedFile = e.dataTransfer.files[0];
    if (selectedFile && selectedFile.type === "application/pdf"){
      setFile(selectedFile);
      await uploadFile(selectedFile);
    } else {
      alert("Please upload a PDF file")
    }
  }

  const uploadFile = async (selectedFile) => { // Function to upload the file
    const formData = new FormData();
    
    formData.append("file", selectedFile);

    try {
        const response = await axios.post("http://localhost:5000/upload", formData, { // Sending the file to the backend using axios
            headers: { "Content-Type": "multipart/form-data" }, // Setting the content type to multipart/form-data
        });
        console.log("File uploaded successfully:", response.data);
    } catch (error) { // If there is an error
        console.error("Error uploading file:", error);
    }
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
    <div className="flex flex-col justify-between h-screen py-5">
      <div className="flex justify-between">
        <h4 className="text-violet-800 font-bold text-xl">Askify</h4>
        <div className="flex gap-5">
        {file && 
          <div className="flex flex-row gap-5 items-center">
            <img className="" src={file_img} alt="file logo" />
            <p className="text-white">{file.name}</p>
          </div>
        }
        <button className="group border-2 border-white p-2 rounded-md font-bold flex items-center gap-2 hover:border-violet-800" onClick={() => setVisible(!visible)}>
          <span className="text-white group-hover:text-violet-800">Upload PDF</span>
        </button>
        </div>
        
      </div>
      {visible && ( // Rendering the pdf uploading area
                <div
                    className="border-2 border-dashed border-blue-400 rounded-md p-5 mt-5 flex justify-center items-center"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                >
                    <input // Input element for file upload
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        id="fileInput"
                    />
                    <label
                        htmlFor="fileInput"
                        className="cursor-pointer text-blue-500 hover:underline"
                    >
                        Drag & drop a PDF here, or click to upload
                    </label>
                </div>
            )}
      
      <div className="flex flex-col justify-between items-center h-full mt-5 overflow-hidden">
        <div className="rounded-md h-3/4 my-4 bg-slate-900 w-11/12 p-5 overflow-y-scroll scroll-smooth custom-scrollbar flex-grow">
          {conversation.map((msg, index) => (
            <div
              key={index}
              className={`${
                msg.type === "user" ? "bg-slate-600 ml-auto my-5" : "bg-violet-900"
              } p-4 my-2 rounded-md w-2/5 text-white break-words text-left`}
            >
              {msg.type === "bot" ? (
                <TypeAnimation
                  sequence={[msg.text]}
                  wrapper="span"
                  cursor={false}
                  speed={100}
                />
              ) : (
                msg.text
              )}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex w-full mt-5">
          <input
            type="text"
            value={message}
            onChange={handleChange}
            placeholder="Write a Prompt ..."
            className="bg-slate-800 w-full p-5 outline-none text-white rounded-l-md"
          />
          <button type="submit" className="bg-slate-800 pr-5 rounded-r-md">
            <img src={arrow} className="h-8 filter invert" alt="arrow-logo" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
