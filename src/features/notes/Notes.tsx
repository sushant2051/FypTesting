import React, { useState } from "react";
import { Button } from "../../components/Button";
import z from "zod";
import { NoteSchema, type NoteType } from "./validation/notes.validation";

const mockContacts = [
  { id: 1, name: "Contact 1" },
  { id: 2, name: "Contact 2" },
  { id: 3, name: "Contact 3" },
];

type SavedNote = {
  id: number;
  contactName: string;
  description: string;
};

const Notes = () => {
  const [formData, setFormData] = useState<NoteType>({
    contactId: 0,
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const [savedNotes, setSavedNotes] = useState<SavedNote[]>([
    { id: 1, contactName: "Contact 1", description: "Follow up on project." },
    { id: 2, contactName: "Contact 2", description: "Send meeting agenda." },
    { id: 3, contactName: "Contact 3", description: "Call regarding invoice." },
  ]);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>,
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
      const data = NoteSchema.parse(formData);
      setErrors({});

      const contact = mockContacts.find((c) => c.id === data.contactId);

      if (contact) {
        const newNote: SavedNote = {
          id: savedNotes.length + 1,
          contactName: contact.name,
          description: data.description,
        };

        setSavedNotes((prev) => [...prev, newNote]);
        setFormData({ contactId: 0, description: "" });
      }
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
    <div className="p-4 flex flex-col gap-4 sm:gap-6 w-full">
      <form
        className="flex flex-col gap-2 border border-gray-200 rounded-md p-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm">Select Contact</label>
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
        </div>

        <label className="font-medium mt-2">Description</label>
        <textarea
          name="description"
          placeholder="Enter note description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 rounded w-full h-24 resize-none"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description[0]}</p>
        )}

        <Button type="submit" label="Add Note" />
      </form>
      <div className="border border-gray-200 rounded-md p-4 w-full flex flex-col gap-2">
        <p className="font-bold text-lg">Saved Notes</p>
        {savedNotes.map((note) => (
          <div
            key={note.id}
            className="flex flex-col gap-1 border-b border-gray-300 pb-2"
          >
            <p className="font-medium">{note.contactName}</p>
            <p>{note.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
