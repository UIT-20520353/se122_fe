import { useCallback } from "react";
import { HttpError } from "../models/http";
import { useAppDispatch, useErrTranslation } from "../app/hooks";
import { showErrorModal } from "../components/modals/CommonModals";
import { removeLocalStorage } from "../utils/localStorage";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "../consts/app";

const useHandleResponseError = () => {
  const dispatch = useAppDispatch();
  const et = useErrTranslation();

  const handleOK = () => {
    //   dispatch(setClearStateToLogout());
    removeLocalStorage(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
  };

  return useCallback(
    (error?: HttpError, onOk?: () => void) => {
      if (!error) {
        return null;
      }

      if (error.unauthorized) {
        if (
          error.message ===
          "Full authentication is required to access this resource"
        ) {
          handleOK();
          return undefined;
        }

        showErrorModal({
          content: et(error.message),
          onOk,
          title: et(error.title || "", {
            defaultValue: et("defaultMessage.title"),
          }),
        });
      }

      if (error.serverError || (error.badRequest && !error.fieldErrors)) {
        showErrorModal({
          content: et(error.message),
          onOk,
          title: et(error.title || "", {
            defaultValue: et("defaultMessage.title"),
          }),
        });
      }

      return undefined;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, et]
  );
};

export { useHandleResponseError };
