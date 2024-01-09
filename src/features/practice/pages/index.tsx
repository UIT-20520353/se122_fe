import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { useHandleResponseError } from "../../../hooks/useHandleResponseError";
import { TestModel } from "../../../models/test";
import { setLoading } from "../../../redux/globalSlice";
import testApi from "../../../api/testApi";
import { Pagination, Tag } from "antd";
import { FaUserEdit } from "react-icons/fa";
import { showConfirmModal } from "../../../components/modals/CommonModals";
import { useNavigate } from "react-router-dom";

interface PracticePageProps {}

interface DataProps {
  tests: TestModel[];
  totalUsers: number;
}

const PracticePage: React.FunctionComponent<PracticePageProps> = () => {
  const dispatch = useAppDispatch();
  const handlResponseError = useHandleResponseError();
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<DataProps>({ tests: [], totalUsers: 0 });

  const onChangePage = (value: number) => {
    setPage(value);
  };

  const onOk = (testId: number) => {
    navigate(`/practice/test/${testId}`);
  };

  const handleStart = (testId: number) => {
    showConfirmModal({
      title: "Notification",
      content: "Do you want to start this test?",
      onOk: () => onOk(testId),
    });
  };

  const fetchData = async (page: number) => {
    dispatch(setLoading("ADD"));
    const { ok, body, error, pagination } = await testApi.getTests({
      size: 3,
      page: page - 1,
    });
    dispatch(setLoading("REMOVE"));

    if (ok && body && pagination) {
      setData({ tests: body, totalUsers: pagination.total });
    } else {
      handlResponseError(error);
    }
  };

  useEffect(() => {
    fetchData(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="test-page">
      <div className="tests">
        {data.tests.map((test) => (
          <div key={test.key} className="test">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <p className="test-name">{test.name}</p>
              <p className="test-level">
                <span>Level: </span>{" "}
                <Tag
                  className="tag"
                  color={test.level === "EASY" ? "success" : "warning"}
                >
                  {test.level === "EASY" ? "Easy" : "Medium"}
                </Tag>
              </p>
              {/* <div className="amount-participant">
                <FaUserEdit />
                <span>123</span>
              </div> */}
            </div>
            <button className="btn-start" onClick={() => handleStart(test.id)}>
              Start
            </button>
          </div>
        ))}
      </div>
      <div className="control-buttons">
        <Pagination
          current={page}
          total={data.totalUsers}
          pageSize={3}
          hideOnSinglePage
          onChange={onChangePage}
        />
      </div>
    </div>
  );
};

export default PracticePage;
