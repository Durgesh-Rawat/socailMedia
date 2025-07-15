import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

// Connect to socket server
const socket = io("https://socailmedia-sz9t.onrender.com");

function ChatBox({ senderId, receiver }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUser, setTypingUser] = useState(false);
  const scrollRef = useRef();
  const typingTimeoutRef = useRef();

  // 1️⃣ SOCKET CONNECTION AND EVENTS
  useEffect(() => {
    if (!senderId) return;

    socket.emit("addUser", senderId);

    // Receive list of online users
    socket.on("updateOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    // Listen for typing
    socket.on("typing", ({ senderId: typingSenderId }) => {
      if (typingSenderId === receiver._id) {
        setTypingUser(true);
      }
    });

    // Listen for stop typing
    socket.on("stopTyping", ({ senderId: typingSenderId }) => {
      if (typingSenderId === receiver._id) {
        setTypingUser(false);
      }
    });

    // Listen for incoming message
    socket.on("getMessage", (data) => {
      if (data.senderId === receiver._id) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => {
      socket.off("updateOnlineUsers");
      socket.off("typing");
      socket.off("stopTyping");
      socket.off("getMessage");
    };
  }, [senderId, receiver._id]);

  // 2️⃣ FETCH PREVIOUS MESSAGES
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`https://socailmedia-sz9t.onrender.com/api/messages/${receiver._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setMessages(data.messages);
      });
  }, [receiver._id]);

  // 3️⃣ HANDLE SEND MESSAGE
  const handleSend = async () => {
    const token = localStorage.getItem("token");
    if (!text.trim()) return;

    const res = await fetch("https://socailmedia-sz9t.onrender.com/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        receiverId: receiver._id,
        content: text,
      }),
    });

    const data = await res.json();
    if (data.success) {
      // Emit message to receiver
      socket.emit("sendMessage", {
        senderId,
        receiverId: receiver._id,
        content: text,
      });

      setMessages((prev) => [...prev, data.message]);
      setText("");
    }
  };

  // 4️⃣ HANDLE TYPING INDICATOR
  const handleTyping = () => {
    socket.emit("typing", { senderId, receiverId: receiver._id });

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping", { senderId, receiverId: receiver._id });
    }, 2000);
  };

  // 5️⃣ AUTO SCROLL TO LAST MESSAGE
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 p-4 flex flex-col">
      {/* Top Bar */}
      <div className="p-4 bg-gray-100 mb-2 rounded shadow">
           <div className="flex items-center justify-between">
               <div className="font-bold text-lg">
                     {receiver.email || receiver.username}
                </div>
             <div className="flex items-center gap-2">
               {onlineUsers.includes(receiver._id) ? (
               <span className="w-3 h-3 bg-green-500 rounded-full" title="Online" />
                     ) : (
               <span className="w-3 h-3 bg-red-500 rounded-full" title="Offline" />
                )}
            </div>
          </div>

        {/* Typing Indicator (below name bar) */}
         {typingUser && (
             <div className="text-sm italic text-blue-800 mt-1">
                 {receiver.email || receiver.username} is typing...
             </div>
              )}
    </div>




      {/* Message List */}
      <div className="flex-1 md:w-[400px] overflow-y-auto mb-4 flex flex-col gap-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            ref={i === messages.length - 1 ? scrollRef : null}
            className={`p-2 rounded max-w-[70%] ${
              msg.senderId === senderId
                ? "bg-blue-100 self-end"
                : "bg-gray-200 self-start"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex gap-3">
        <input
          className="border p-2 flex-1 rounded"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            handleTyping();
          }}
          placeholder="Type a message"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
