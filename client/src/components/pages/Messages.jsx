import { useEffect, useState } from "react";
import ChatBox from "../ChatBox";
import UserList from "../UserList";
import { jwtDecode } from "jwt-decode";

function Messages() {
  const [currentUser, setCurrentUser] = useState(null);
  const [receiver, setReceiver] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setCurrentUser(decoded);
    } catch (err) {
      console.error("Invalid token");
    }
  }, []);

  if (!currentUser) return <div>Please login</div>;

  return (
    <div className="flex h-screen">
      <UserList onSelect={setReceiver} />
      {receiver ? (
        <ChatBox
          senderId={currentUser.id || currentUser._id}
          receiver={receiver}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a user to chat with.
        </div>
      )}
    </div>
  );
}

export default Messages;
