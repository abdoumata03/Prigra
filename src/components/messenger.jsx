import React, { useState, useEffect, useContext } from "react";
import { db } from "../services/firebase";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import ProfileContext from "../context/profile-context";
import { FiSend } from "react-icons/fi";

const Messenger = ({ id }) => {
  const { userData } = useContext(ProfileContext);
  const [message, setMessage] = useState("");
  const [messagesData, setMessagesData] = useState([]);

  function isNotEmpty(str) {
    return str || str.length > 0;
  }
  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    if (isNotEmpty(message.trim())) {
      try {
        const projectDocRef = doc(db, "projects", `${id}`);

        const projectDocSnap = await getDoc(projectDocRef);

        if (!projectDocSnap.exists()) {
          // Create the project document if it doesn't exist
          await setDoc(projectDocRef, {});
        }

        const projectColletion = collection(db, "projects", `${id}`, "chat");

        // Add a new message document to the chat subcollection
        await addDoc(projectColletion, {
          sender: userData.first_name,
          content: message,
          user_id: userData.id,
          timestamp: serverTimestamp(),
        });

        // Reset the message input field
        setMessage("");
        e.target.reset();
      } catch (error) {
        console.error("Error saving message:", error);
      }
    }
  };

  useEffect(() => {
    const q = query(
      collection(db, "projects", `${id}`, "chat"),
      orderBy("timestamp", "desc"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessagesData(messages);
    });
    return () => unsubscribe;
  }, []);

  return (
    <div className="bg-white shadow-custom rounded-lg py-4 px-4 flex flex-col flex-grow h-fit">
      <h1 className="text-gray1 font-bold text-lg mb-1">Discussion</h1>
      <div className="flex h-80 overflow-auto flex-col-reverse ">
        {messagesData.map((item, id) => {
          const isSender = item.user_id === userData.id;
          return (
            <div className={`flex flex-col ${isSender && `items-end`}`}>
              {!isSender && (
                <p className="text-[0.7rem] text-gray3">{item.sender}</p>
              )}
              <div
                className={`${
                  isSender ? `bg-primary` : `bg-accent`
                }  mb-2 w-2/5 max-w-fit px-3 py-2 rounded-lg`}
              >
                <p
                  className={`text-sm ${
                    isSender ? `text-white font-medium` : `text-gray1`
                  }   w-fit`}
                >
                  {item.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <form
        className="relative flex items-center"
        onSubmit={handleMessageSubmit}
      >
        <input
          name="message"
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          className="bg-none bg-gray-100 justify-self-end pl-14 pr-6 text-sm rounded-full h-11 w-full"
        />
        <img
          src="https://i.ibb.co/T1r9Mzc/1679220246331.jpg"
          alt="Avatar Picture"
          className="h-8 w-8 rounded-full absolute left-2"
        />
        <button className="absolute right-4 p-2 cursor-pointer text-gray1">
          <FiSend />
        </button>
      </form>
    </div>
  );
};

export default Messenger;
