export interface MessageResponse {
  message: string;
  date: string;
  userId: number;
}

export interface MessageRequest {
  message: string;
  type: "JOIN" | "MESSAGE" | "LEAVE";
  chatroomId: number;
  userId: number;
}
