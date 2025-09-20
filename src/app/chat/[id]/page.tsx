import ChatRoom from "@/src/components/chat/ChatRoom";

const Chat = () => {
  const roomId = "room123"; 
  const currentUser = {
    id: "u1",
    firstName: "Trường",
    lastName: "Trần",
    type: "student" as const
  };
  const targetUser = {
    id: "u2",
    firstName: "Giáo viên",
    lastName: "Nguyễn",
  };

  return (
    <ChatRoom
      roomId={roomId}
      currentUser={currentUser}
      targetUser={targetUser}
    />
  );
};

export default Chat;
