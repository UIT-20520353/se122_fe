import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { useHandleResponseError } from "../../../hooks/useHandleResponseError";
import { useNavigate, useParams } from "react-router-dom";
import { setLoading } from "../../../redux/globalSlice";
import testApi from "../../../api/testApi";
import { TestDetailModel } from "../../../models/test";
import { useEffectOnce } from "usehooks-ts";

interface StartTestProps {}

const StartTest: React.FunctionComponent<StartTestProps> = () => {
  const dispatch = useAppDispatch();
  const handlResponseError = useHandleResponseError();
  const navigate = useNavigate();
  const { id } = useParams();

  const [test, setTest] = useState<TestDetailModel | null>(null);
  const [seconds, setSeconds] = useState<number>(0);

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
              <div key={`question-${question.id}`} className="question">
                <audio autoPlay={false} controls src={question.resource} />
                <p>
                  <span
                    style={{ fontWeight: 600, fontSize: "16px" }}
                  >{`Question ${index + 1}: `}</span>
                  {question.question}
                </p>
                <div className="answers">
                  <span style={{ fontWeight: 600 }}>Answers: </span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      gap: "5px",
                    }}
                  >
                    {question.answers.map((answer) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <input
                          type="radio"
                          id={`question-${question.id}-answer-${answer.id}`}
                          name={`question-${question.id}`}
                        />
                        <label
                          htmlFor={`question-${question.id}-answer-${answer.id}`}
                          style={{ fontSize: "16px" }}
                        >
                          {answer.content}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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
              <div key={`question-${question.id}`} className="question">
                <p>
                  <span
                    style={{ fontWeight: 600, fontSize: "16px" }}
                  >{`Question ${index + 1}: `}</span>
                  {question.question}
                </p>
                <div className="answers">
                  <span style={{ fontWeight: 600 }}>Answers: </span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      gap: "5px",
                    }}
                  >
                    {question.answers.map((answer) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <input
                          type="radio"
                          id={`question-${question.id}-answer-${answer.id}`}
                          name={`question-${question.id}`}
                        />
                        <label
                          htmlFor={`question-${question.id}-answer-${answer.id}`}
                          style={{ fontSize: "16px" }}
                        >
                          {answer.content}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="test-detail__footer">
        <div className="card-submit">
          <span>{`Time: ${formatTime(seconds)}`}</span>
          <button className="submit">Submit</button>
        </div>
      </div>
    </div>
  ) : null;
};

export default StartTest;
