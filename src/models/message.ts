export interface MessageResponse {
  message: string;
  date: string;
  userId: number;
}

export interface MessageRequest {
  message: string;
  type: "JOIN" | "MESSAGE" | "LEAVE" | "CALL";
  chatroomId: number;
  userId: number;
}
