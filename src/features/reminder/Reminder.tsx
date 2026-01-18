import React, { useState } from "react";
import { Button } from "../../components/Button";
import z from "zod";
import {
  ReminderSchema,
  type ReminderType,
} from "./validation/reminder.validation";
import { InputField } from "../../components/InputFiled";

const mockContacts = [
  { id: 1, name: "Contact 1" },
  { id: 2, name: "Contact 2" },
  { id: 3, name: "Contact 3" },
];

const reminderTypes = ["Birthday", "Meeting", "Anniversary", "Other"];

const Reminder = () => {
  const [formData, setFormData] = useState<ReminderType>({
    contactId: 0,
    title: "",
    date: "",
    time: "",
    type: "",
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "contactId" ? Number(value) : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: [] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = ReminderSchema.parse(formData);
      setErrors({});
      console.log("Reminder Data:", data);
      alert(
        `Reminder for ${mockContacts.find((c) => c.id === data.contactId)?.name} added!`,
      );
      setFormData({ contactId: 0, title: "", date: "", time: "", type: "" });
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
    <div className="p-6 w-full">
      <form
        className="flex flex-col gap-4 border border-gray-200 rounded-md p-4"
        onSubmit={handleSubmit}
      >
        <label className="font-medium">Select Contact</label>
        <select
          name="contactId"
          value={formData.contactId}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value={0}>Select Contact</option>
          {mockContacts.map((contact) => (
            <option key={contact.id} value={contact.id}>
              {contact.name}
            </option>
          ))}
        </select>
        {errors.contactId && (
          <p className="text-red-500 text-sm">{errors.contactId[0]}</p>
        )}

        <InputField
          label="Reminder Title"
          type="text"
          name="title"
          placeholder="Enter reminder title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          errors={errors.name}
        />
        <div className="relative">
          <InputField
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            errors={errors.name}
          />
        </div>
        <InputField
          label="Time"
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          errors={errors.time}
        />
        <label className="font-medium">Reminder Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Select type</option>
          {reminderTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.type && (
          <p className="text-red-500 text-sm">{errors.type[0]}</p>
        )}
        <Button type="submit" label="Add Reminder" />
      </form>
    </div>
  );
};

export default Reminder;
