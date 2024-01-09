import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useHandleResponseError } from "../../../hooks/useHandleResponseError";
import { useNavigate, useParams } from "react-router-dom";
import { selectUserId, setLoading } from "../../../redux/globalSlice";
import testApi from "../../../api/testApi";
import { TestDetailModel } from "../../../models/test";
import { useEffectOnce } from "usehooks-ts";
import Question from "../components/Question";
import { showSuccessModal } from "../../../components/modals/CommonModals";

interface StartTestProps {}

interface ResultProps {
  questionId: number;
  answerId: number;
}

const StartTest: React.FunctionComponent<StartTestProps> = () => {
  const dispatch = useAppDispatch();
  const handlResponseError = useHandleResponseError();
  const navigate = useNavigate();
  const userId = useAppSelector(selectUserId);
  const { id } = useParams();

  const [test, setTest] = useState<TestDetailModel | null>(null);
  const [seconds, setSeconds] = useState<number>(0);
  const [result, setResult] = useState<ResultProps[]>([]);

  const handleResultClick = (questionId: number, answerId: number) => {
    setResult((prev) => {
      const temp = prev.filter((r) => r.questionId !== questionId);
      temp.push({ questionId, answerId });
      return temp;
    });
  };

  const handleSubmit = async () => {
    if (!test) return;
    dispatch(setLoading("ADD"));

    let amountRight: number = 0;
    test.questions.forEach((question) => {
      question.answers.forEach((answer) => {
        const checkAnswer = result.find(
          (r) =>
            r.answerId === answer.id &&
            r.questionId === question.id &&
            answer.isResult
        );
        if (checkAnswer) amountRight++;
      });
    });

    const { ok, error } = await testApi.submitTest({
      userId,
      testId: test.id,
      result: amountRight / test.questions.length,
      time: seconds,
    });
    dispatch(setLoading("REMOVE"));

    if (ok) {
      showSuccessModal({
        title: "Notification",
        content: `You get right ${(amountRight / test.questions.length).toFixed(
          2
        )}% of this test.`,
        onOk: () => {},
      });
    } else {
      handlResponseError(error);
    }

    navigate("/practice");
  };

  const fetchData = async () => {
    if (isNaN(Number(id))) {
      navigate("/practice");
      return;
    }

    dispatch(setLoading("ADD"));
    const { ok, body, error } = await testApi.getTest(Number(id));
    dispatch(setLoading("REMOVE"));

    if (ok && body) {
      setTest(body);
    } else {
      handlResponseError(error);
    }
  };

  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffectOnce(() => {
    fetchData();
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return test ? (
    <div className="test-detail">
      <div className="test-detail__header">
        <h3>{test.name}</h3>
      </div>
      <div className="test-detail__content">
        <div className="listening">
          <h4>Listening</h4>
          {test.questions
            .filter((q) => q.type === "LISTENING")
            .map((question, index) => (
              <Question
                key={`question-${question.id}`}
                question={question}
                index={index}
                type={"LISTENING"}
                handleResultClick={handleResultClick}
              />
            ))}
        </div>
        <div className="reading">
          <h4>Reading</h4>
          <div className="resource-reading">
            {test.image && <img src={test.image} alt="reading image" />}
            {test.paragraph && (
              <p style={{ fontSize: "16px" }}>
                <span style={{ fontWeight: 500 }}>Paragraph: </span>
                {test.paragraph}
              </p>
            )}
          </div>
          {test.questions
            .filter((q) => q.type === "READING")
            .map((question, index) => (
              <Question
                key={`question-${question.id}`}
                question={question}
                index={index}
                type={"READING"}
                handleResultClick={handleResultClick}
              />
            ))}
        </div>
      </div>

      <div className="test-detail__footer">
        <div className="card-submit">
          <span>{`Time: ${formatTime(seconds)}`}</span>
          <button className="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default StartTest;
