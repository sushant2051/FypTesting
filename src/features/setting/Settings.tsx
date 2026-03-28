import { useState } from "react";
import { Button } from "../../components/Button";
import { InputField } from "../../components/InputFiled";
import { IoArrowBack } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { FaDatabase } from "react-icons/fa6";
import { TbLockPassword } from "react-icons/tb";
import {
  PasswordChangeSchema,
  type PasswordChangeType,
} from "./validator/changePassword.validation";
import z from "zod";
import MotionWrapper from "../../components/animation/MotionWrapper";
import {
  blurIn,
  scaleIn,
  slideLeft,
  slideRight,
} from "../../components/animation/Variants";

const Settings = () => {
  const [isPasswordChange, setIsPasswordChange] = useState<boolean>(false);
  const [passwordData, setPasswordData] = useState<PasswordChangeType>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: [] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = PasswordChangeSchema.parse(passwordData);
      setErrors({});
      const payload = { password: data.newPassword };
      console.log("Sending to backend:", payload);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string[]> = {};
        err.issues.forEach((issue) => {
          const key = issue.path[0] as string;
          if (!fieldErrors[key]) fieldErrors[key] = [];
          fieldErrors[key].push(issue.message);
        });
        setErrors(fieldErrors);
      }
    }
  };

  const handleGoBack = () => {
    setIsPasswordChange(false);
  };
  return (
    <div className="p-4">
      {!isPasswordChange ? (
        <MotionWrapper variants={scaleIn}>
          <div className="flex flex-col gap-2 py-6">
            <div className="flex items-center gap-2">
              <IoSettingsOutline className="h-8 w-8" />
              <p className="text-xl">Settings</p>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <p>Enable Notifications</p>
            </div>
            <div className="flex flex-col gap-4 w-fit">
              <Button label="Backup Data">
                <FaDatabase />
              </Button>
              <Button
                onClick={() => setIsPasswordChange(true)}
                label="Change Password"
              >
                <TbLockPassword />
              </Button>
            </div>
          </div>
        </MotionWrapper>
      ) : (
        <div className="border border-gray-200 rounded-md p-4 my-8">
          <MotionWrapper variants={slideRight}>
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 cursor-pointer"
            >
              <IoArrowBack />
              <p>Go back</p>
            </button>
          </MotionWrapper>
          <MotionWrapper variants={blurIn}>
            <p className="text-medium py-5">Change your password</p>
          </MotionWrapper>
          <MotionWrapper variants={slideLeft}>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <InputField
                label="Old password"
                name="oldPassword"
                type="password"
                placeholder="Old password"
                value={passwordData.oldPassword}
                onChange={handleChange}
                errors={errors.oldPassword}
              />
              <InputField
                label="New password"
                name="newPassword"
                type="password"
                placeholder="New password"
                value={passwordData.newPassword}
                onChange={handleChange}
                errors={errors.newPassword}
              />
              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handleChange}
                errors={errors.confirmPassword}
              />
              <Button type="submit" label="Change Password" />
            </form>
          </MotionWrapper>
        </div>
      )}
    </div>
  );
};

export default Settings;
