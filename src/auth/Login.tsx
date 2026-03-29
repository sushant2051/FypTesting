import { useNavigate } from "react-router";
import { Button } from "../components/Button";
import { InputField } from "../components/InputFiled";
import { useState } from "react";
import { z } from "zod";
import {
  LoginSchema,
  type LoginSchemaType,
} from "./validators/login.validation";
import { MdOutlineLogin } from "react-icons/md";
import MotionWrapper from "../components/animation/MotionWrapper";
import { combo, rotateIn, slideLeft } from "../components/animation/Variants";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginSchemaType>({
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: [],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = LoginSchema.parse(formData);
      console.log("Login Data:", data);
      setErrors({});
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string[]> = {};

        err.issues.forEach((issue) => {
          const key = issue.path[0] as string;
          fieldErrors[key] = fieldErrors[key] || [];
          fieldErrors[key].push(issue.message);
        });

        setErrors(fieldErrors);
      }
    }
  };

  const handleNavigateToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="w-100 py-8">
      <div className="border border-gray-200 w-full rounded-md shadow-md p-6">
        <MotionWrapper
          variants={rotateIn}
          className="pb-5 text-center flex items-center gap-2 justify-center"
        >
          <MdOutlineLogin className="h-8 w-8" />
          <p className="text-xl font-bold">Login to samparka diary</p>
        </MotionWrapper>
        <MotionWrapper variants={combo}>
          <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
            <InputField
              autoFocus
              label="Phone number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              errors={errors.phone}
            />

            <InputField
              autoComplete="password"
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              errors={errors.password}
            />

            <Button label="Login" type="submit"><MdOutlineLogin /></Button>
          </form>
        </MotionWrapper>

        <MotionWrapper variants={slideLeft} className="flex items-center justify-center gap-2 mt-2">
          <p>Don't have an account?</p>
          <button
            onClick={handleNavigateToSignup}
            className="underline cursor-pointer"
          >
            Signup
          </button>
        </MotionWrapper>
      </div>
    </div>
  );
};

export default Login;
