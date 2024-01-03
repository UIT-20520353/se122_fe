import React, { Fragment, useEffect, useMemo, useState } from "react";
import { FriendModel } from "../../../models/friend";
import friendApi from "../../../api/friendApi";
import { useAppDispatch } from "../../../app/hooks";
import { setLoading } from "../../../redux/globalSlice";
import { useHandleResponseError } from "../../../hooks/useHandleResponseError";

interface FriendProps {}

interface DataProps {
  friends: FriendModel[];
  totalUsers: number;
}

const Friend: React.FunctionComponent<FriendProps> = () => {
  const dispatch = useAppDispatch();
  const handleResponseError = useHandleResponseError();

  const [data, setData] = useState<DataProps>({ friends: [], totalUsers: 0 });
  const [page, setPage] = useState<number>(0);

  const fetchData = async (page: number) => {
    dispatch(setLoading("ADD"));
    const { ok, body, error, pagination } = await friendApi.getFriends({
      size: 3,
      page,
    });
    dispatch(setLoading("REMOVE"));

    if (ok && body && pagination) {
      setData({ friends: body, totalUsers: pagination.total });
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

  return <Fragment>dasdsadad</Fragment>;
};

export { Friend };
