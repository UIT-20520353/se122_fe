import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { useHandleResponseError } from "../../../hooks/useHandleResponseError";
import { setLoading } from "../../../redux/globalSlice";
import requestApi from "../../../api/requestApi";
import { RequestModel } from "../../../models/request";
import UserCart from "../components/UserCart";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

interface SentProps {}

interface DataProps {
  requests: RequestModel[];
  totalUsers: number;
}

const Sent: React.FunctionComponent<SentProps> = () => {
  const dispatch = useAppDispatch();
  const handleResponseError = useHandleResponseError();

  const [page, setPage] = useState<number>(0);
  const [data, setData] = useState<DataProps>({ requests: [], totalUsers: 0 });
  const [statusButtons, setStatusButtons] = useState<boolean[]>([
    true,
    true,
    true,
  ]);

  const handleChangePage = (type: "INCREASE" | "DECREASE") => {
    switch (type) {
      case "INCREASE":
        setPage((prev) => (prev + 1 >= totalPages ? 0 : prev + 1));
        break;
      case "DECREASE":
        setPage((prev) => (prev - 1 < 0 ? totalPages - 1 : prev - 1));
        break;
      default:
        break;
    }
  };

  const updateStatusButtons = (index: number) => {
    setStatusButtons((prev) => {
      const temp = [...prev];
      temp[index] = !prev[index];
      return temp;
    });
  };

  const fetchData = async (page: number) => {
    setStatusButtons([true, true, true]);
    dispatch(setLoading("ADD"));
    const { ok, body, error, pagination } = await requestApi.getRequests({
      size: 3,
      page,
    });
    dispatch(setLoading("REMOVE"));

    if (ok && body && pagination) {
      setData({ requests: body, totalUsers: pagination.total });
    } else {
      handleResponseError(error);
    }
  };

  const totalPages = useMemo(() => {
    return Math.ceil(data.totalUsers / 3);
  }, [data.totalUsers]);

  useEffect(() => {
    fetchData(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <Fragment>
      <div className="user-list">
        {data.requests.map((request, index) => (
          <UserCart
            user={request.targetUser}
            key={`user-${request.targetUser.id}`}
            index={index}
            statusButtons={statusButtons}
            updateStatusButtons={updateStatusButtons}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="control-buttons">
          <button className="btn" onClick={() => handleChangePage("DECREASE")}>
            <GrLinkPrevious className="btn__icon" />
          </button>
          <button className="btn" onClick={() => handleChangePage("INCREASE")}>
            <GrLinkNext className="btn__icon" />
          </button>
        </div>
      )}
    </Fragment>
  );
};

export { Sent };
