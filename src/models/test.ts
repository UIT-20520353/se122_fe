import { QuestionModel } from "./question";

export interface TestModel {
  key: string;
  id: number;
  name: string;
  level: "EASY" | "MEDIUM";
}

export interface TestDetailModel {
  id: number;
  name: string;
  level: "EASY" | "MEDIUM";
  questions: QuestionModel[];
  image: string | null;
  paragraph: string | null;
}

export interface SubmitTestRequest {
  userId: number;
  testId: number;
  result: number;
  time: number;
}
