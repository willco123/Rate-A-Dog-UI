import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLogout } from "../../services/backend/users.js";

export default function Logout({
  setIsLoggedIn,
}: {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      await getLogout();
    })();

    setIsLoggedIn(false);
    navigate("/");
  }, []);

  return <></>;
}
