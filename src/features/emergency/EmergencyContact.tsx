import { IoCall, IoArrowBack, IoAddCircle } from "react-icons/io5";
import { Button } from "../../components/Button";
import { useState } from "react";
import z from "zod";
import {
  EmergencyContactSchema,
  type EmergencyContactType,
} from "./validation/emergencyContact.validation";
import { InputField } from "../../components/InputFiled";
import { FaPlusCircle } from "react-icons/fa";
import MotionWrapper from "../../components/animation/MotionWrapper";
import {
  blurIn,
  fadeDown,
  rotateIn,
  scaleIn,
  slideLeft,
  slideRight,
} from "../../components/animation/Variants";
import { FaCheck } from "react-icons/fa";
import { MdCancel, MdEmergency } from "react-icons/md";

type Contact = {
  id: number;
  name: string;
  relationship: string;
  phone: string;
};

const relationshipOptions = ["Father", "Mother", "Brother", "Sister", "Friend"];

const EmergencyContact = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, name: "Example 1", relationship: "Father", phone: "9806053511" },
    { id: 2, name: "Example 2", relationship: "Brother", phone: "9806053522" },
    { id: 3, name: "Example 3", relationship: "Sister", phone: "9806053533" },
    { id: 4, name: "Example 4", relationship: "Friend", phone: "9806053544" },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<EmergencyContactType>({
    name: "",
    relationship: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: [] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = EmergencyContactSchema.parse(formData);
      setErrors({});

      const newContact: Contact = {
        id: contacts.length + 1,
        name: data.name,
        relationship: data.relationship,
        phone: data.phone,
      };

      setContacts((prev) => [...prev, newContact]);
      setFormData({ name: "", phone: "", relationship: "" });
      setShowForm(false);
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

  const handleResetForm = () => {
    setFormData({
      name: "",
      phone: "",
      relationship: "",
    });
  };

  const handleBack = () => {
    setShowForm(false);
    setFormData({ name: "", phone: "", relationship: "" });
    setErrors({});
  };

  return (
    <div>
      {!showForm ? (
        <div className="py-6 flex flex-col gap-4 border p-4 border-gray-200 rounded-md sm:m-6 m-3">
          <MotionWrapper
            variants={rotateIn}
            className="flex items-center gap-2 py-2"
          >
            <MdEmergency className="h-8 w-8" />
            <h2 className="text-lg font-bold">Emergency Contacts</h2>
          </MotionWrapper>
          <MotionWrapper variants={scaleIn}>
            <div>
              <Button
                label="Add Emergency Contact"
                onClick={() => setShowForm(true)}
              >
                <FaPlusCircle />
              </Button>
            </div>
          </MotionWrapper>
          <div className="border border-gray-200 rounded-md p-4 w-full">
            {contacts.map((contact, index) => (
              <div key={contact.id}>
                <div className="flex items-center justify-between py-2">
                  <MotionWrapper variants={slideRight}>
                    <div className="flex-1 gap-1">
                      <div className="flex items-center gap-1">
                        <p>{contact.name}</p>
                        <p>-</p>
                        <p>{contact.phone}</p>
                      </div>
                    </div>
                  </MotionWrapper>
                  <MotionWrapper variants={fadeDown}>
                    <p className="flex-1">{contact.relationship}</p>
                  </MotionWrapper>
                  <MotionWrapper variants={slideLeft}>
                    <div>
                      <IoCall className="text-blue-900 h-6 w-6" />
                    </div>
                  </MotionWrapper>
                </div>
                {index < contacts.length - 1 && (
                  <hr className="border-gray-300" />
                )}
              </div>
            ))}
            <MotionWrapper variants={blurIn}>
              {contacts.length === 0 && (
                <p className="text-gray-500 py-2">
                  No emergency contacts added
                </p>
              )}
            </MotionWrapper>
          </div>
        </div>
      ) : (
        <form
          className="flex flex-col gap-3 border border-gray-200 rounded-md p-4"
          onSubmit={handleSubmit}
        >
          <MotionWrapper variants={scaleIn}>
            <button
              type="button"
              className="flex items-center gap-2 mb-2 cursor-pointer hover:bg-gray-300 rounded p-2"
              onClick={handleBack}
            >
              <IoArrowBack /> Go Back
            </button>
          </MotionWrapper>
          <MotionWrapper
            variants={rotateIn}
            className="flex items-center gap-2"
          >
            <IoAddCircle className="h-6 w-6" />
            <h2 className="text-lg font-bold">Add Emergency Contact</h2>{" "}
          </MotionWrapper>
          <MotionWrapper variants={slideLeft}>
            <InputField
              label="Name"
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              errors={errors.name}
            />
          </MotionWrapper>
          <MotionWrapper variants={slideLeft}>
            <InputField
              label="Phone Number"
              type="text"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
              errors={errors.phone}
            />
          </MotionWrapper>
          <MotionWrapper variants={slideRight}>
            <div className="w-full text-sm">
              <p className="mb-1">Relationship</p>
              <select
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option value="">Relationship</option>
                {relationshipOptions.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
          </MotionWrapper>

          <Button type="submit" label="Save Contact">
            <FaCheck />
          </Button>

          <Button
            onClick={handleResetForm}
            variant="outline"
            type="reset"
            label="Cancel"
          >
            <MdCancel />
          </Button>
        </form>
      )}
    </div>
  );
};

export default EmergencyContact;
