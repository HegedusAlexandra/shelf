import React, { useState } from "react";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [value_name, setValue_name] = useState("");
  const [value_password, setValue_password] = useState("");
  const navigate = useNavigate()

  const handleChangeName = (e) => {
    setValue_name(e.target.value);
  };

  const handleChangePassword = (e) => {
    setValue_password(e.target.value);
  };

  const handleSubmit = () => {
    if(value_name === "Hexa" && value_password === "myRecipes") navigate('/dashboard')
  };

  return (
    <div className="w-full h-[80vh] flex items-center justify-center overflow-hidden bg-ab2 bg-no-repeat bg-cover bg-center">
      <div className="w-[80%] h-[72vh] absolute z-10 top-[14vh] bg-white/20 backdrop-blur-md flex items-center justify-center rounded-full">
        <div className="w-[90%] md:w-[300px] mx-auto mt-10 flex flex-col justify-center items-center">
          <TextInput
            label="Your Name"
            placeholder="Enter your full name"
            value={value_name}
            onChange={handleChangeName}
            required
          />
          <TextInput
            label="Your Password"
            placeholder="Enter your password"
            value={value_password}
            onChange={handleChangePassword}
            required
          />
          <Button
            label="Bejelentkezés"
            variant="primary"
            size="md"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
