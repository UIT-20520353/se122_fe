import React from "react";

interface SubmitButtonProps {
  content?: string;
}

const SubmitButton: React.FunctionComponent<SubmitButtonProps> = ({
  content = "Login",
}) => {
  return (
    <button type="submit" className="submit-button mt-3">
      {content}
    </button>
  );
};

export { SubmitButton };
