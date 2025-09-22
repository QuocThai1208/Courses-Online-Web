import ChatRoom from "@/src/components/chat/ChatRoom";

const Chat = () => {
  const roomId = "room123"; // roomID tạo từ id user và id giáo viên nhắn tin (id user đang đăng nhập và id target)
  const currentUser = {
    id: 1,
    firstName: "Trường",
    lastName: "Trần",
    type: "student" as const
  };
  const targetUser = {
    id: 2,
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
