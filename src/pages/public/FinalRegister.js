import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import path from "../../ultils/path";
import Swal from "sweetalert2";
import imgShopping from "../../../src/assets/shopping-trolleys-packets-gift-tags.jpg";

const FinalRegister = () => {
  const { status } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "failed")
      Swal.fire("Oops!", "Registration failed !", "error").then(() => {
        navigate(`/${path.LOGIN}`);
      });
    if (status === "success")
      Swal.fire(
        "Congratulation!",
        "Sign Up Success ! Go Loginn",
        "success"
      ).then(() => {
        navigate(`/${path.LOGIN}`);
      });
  }, [navigate, status]);
  return (
    <img
      loading="lazy"
      className="relative w-screen h-screen"
      alt="anh shopping"
      src={imgShopping}
    />
  );
};
export default FinalRegister;
