import { useSelector } from "react-redux";
import { Home } from "../components/Home";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  let { isLogedIn } = useSelector((store) => store.appSlice);
  const nagivate = useNavigate();

  if (isLogedIn === false) {
    nagivate("/login");
  }

  return (
    <>
      <Home />
    </>
  );
};
