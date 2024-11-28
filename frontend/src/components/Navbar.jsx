import { useState } from "react";
import arrow from '/assets/arrow.svg'
import { TypeAnimation } from 'react-type-animation';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';


const Navbar = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([]);

  const handleChange = (e) => {
      setMessage(e.target.value);

  }

  const handleSubmit = (e) => {
      e.preventDefault();
      if (message.trim()){
          setMessages([...messages, message]);
          setMessage('')
      }
  }
  return (
    <div className="flex flex-col justify-between h-screen py-10">
      <div className="flex justify-between">
        <h4 className="text-violet-800 font-bold text-xl">Askify</h4>
        <button className="group border-2 border-white p-2 rounded-md font-bold flex items-center gap-2 hover:border-violet-800">
          <span className="text-white group-hover:text-violet-800">Upload PDF</span>
        </button>
      </div>
      <div className="flex flex-col justify-between h-full mt-5 overflow-hidden">
            <PerfectScrollbar className="rounded-md h-3/4 bg-slate-900 opacity-60 p-5 overflow-y-scroll flex-grow">
            {messages.map((msg, index) => (
                <div key={index} className=" bg-slate-600 p-2 my-2 rounded-md w-1/4  text-slate-300 break-words text-left">
                  <TypeAnimation
                    sequence={[msg]}
                    wrapper="span"
                    cursor={true}
                    // repeat={Infinity}
                    // style={{  display: 'inline-block' }}
                  />
                </div>
            ))}
            </PerfectScrollbar>
        <form onSubmit={handleSubmit} className="flex mt-5">
            <input 
                type="text"
                value={message}
                onChange={handleChange}
                placeholder="Send a message..."
                className="bg-slate-800 w-full p-5 outline-none"
            />
            <button type="submit" className="bg-slate-800 pr-5">
                <img src={arrow} alt="arrow-logo" />
            </button>
        </form>

    </div>
    </div>
  )
}

export default Navbar


