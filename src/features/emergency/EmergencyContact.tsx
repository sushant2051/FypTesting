import { IoCall } from "react-icons/io5";
import { Button } from "../../components/Button";
import { useState } from "react";

import z from "zod";
import {
  EmergencyContactSchema,
  type EmergencyContactType,
} from "./validation/emergencyContact.validation";
import { InputField } from "../../components/InputFiled";

type Contact = {
  id: number;
  name: string;
  phone: string;
};

const EmergencyContact = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, name: "Example 1", phone: "9806053511" },
    { id: 2, name: "Example 2", phone: "9806053522" },
    { id: 3, name: "Example 3", phone: "9806053533" },
    { id: 4, name: "Example 4", phone: "9806053544" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<EmergencyContactType>({
    name: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        phone: data.phone,
      };

      setContacts((prev) => [...prev, newContact]);
      setFormData({ name: "", phone: "" });
      setShowForm(false);
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

  return (
    <div className="py-6 flex flex-col gap-4 sm:gap-6">
      <div>
        <Button
          label="Add Emergency Contact"
          onClick={() => setShowForm(true)}
        />
      </div>

      {showForm && (
        <form
          className="flex flex-col gap-2 border border-gray-200 w-full rounded-md p-4"
          onSubmit={handleSubmit}
        >
          <InputField
            label="Name"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            errors={errors.name}
          />
          <InputField
            label="Phone Number"
            type="text"
            name="phone"
            placeholder="Number"
            value={formData.phone}
            onChange={handleChange}
            errors={errors.phone}
          />
          <Button type="submit" label="Add Contact" />
        </form>
      )}

      <div className="border border-gray-200 rounded-md p-4 w-full">
        {contacts.map((contact) => (
          <div key={contact.id}>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-1">
                <p>{contact.name}</p>
                <p>-</p>
                <p>{contact.phone}</p>
              </div>
              <IoCall className="text-blue-900 h-6 w-6" />
            </div>
            <hr className="border-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyContact;
