import React, { useState } from "react";
import { Button } from "../../components/Button";
import z from "zod";
import { InputField } from "../../components/InputFiled";
import { IoArrowBack } from "react-icons/io5";
import {
  ContactSchema,
  type ContactType,
} from "./validation/contact.validation";

const relationshipOptions = ["Father", "Mother", "Brother", "Sister", "Friend"];

const Contact = () => {
  const [contacts, setContacts] = useState<ContactType[]>([
    {
      id: 1,
      name: "John Doe",
      phone: "9806053511",
      email: "john@example.com",
      relationship: "Brother",
      note: "Sample note",
    },
    {
      id: 2,
      name: "Jane Doe",
      phone: "9806053522",
      email: "",
      relationship: "Sister",
      note: "Another note",
    },
    {
      id: 3,
      name: "Bob Smith",
      phone: "9806053533",
      email: "",
      relationship: "Friend",
      note: "Friend note",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState<ContactType | null>(
    null,
  );
  const [formData, setFormData] = useState<Omit<ContactType, "id">>({
    name: "",
    phone: "",
    email: "",
    relationship: "",
    note: "",
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: [] }));
  };

  const handleAddContact = () => {
    setFormData({ name: "", phone: "", email: "", relationship: "", note: "" });
    setEditingContact(null);
    setShowForm(true);
  };

  const handleEdit = (contact: ContactType) => {
    const { ...rest } = contact;
    setFormData(rest);
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleBack = () => {
    setShowForm(false);
    setEditingContact(null);
  };

  const handleDelete = (id: number) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = ContactSchema.parse(formData);
      setErrors({});

      if (editingContact) {
        setContacts((prev) =>
          prev.map((c) => (c.id === editingContact.id ? { ...c, ...data } : c)),
        );
      } else {
        const newContact: ContactType = {
          id: contacts.length + 1,
          ...data,
        };
        setContacts((prev) => [...prev, newContact]);
      }

      setShowForm(false);
      setEditingContact(null);
      setFormData({
        name: "",
        phone: "",
        email: "",
        relationship: "",
        note: "",
      });
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

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery),
  );

  return (
    <div className="p-6 w-full flex flex-col gap-4">
      {!showForm ? (
        <>
          <div className="flex items-center gap-4 mb-4">
            <InputField
              type="text"
              placeholder="Search contacts by name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button label="Add Contact" onClick={handleAddContact} />
          </div>

          <div className="border border-gray-200 rounded-md overflow-hidden">
            <div className="flex px-4 py-2 bg-gray-100 font-bold">
              <span className="w-1/4">Name</span>
              <span className="w-1/4">Phone</span>
              <span className="w-1/4">Relationship</span>
              <span className="w-1/4 text-center">Action</span>
            </div>

            <div className="flex flex-col">
              {filteredContacts.map((contact) => (
                <div key={contact.id}>
                  <div className="flex px-4 py-2 items-center">
                    <span className="w-1/4">{contact.name}</span>
                    <span className="w-1/4">{contact.phone}</span>
                    <span className="w-1/4">{contact.relationship}</span>
                    <span className="w-1/4 flex justify-center gap-2">
                      <Button
                        label="edit"
                        onClick={() => handleEdit(contact)}
                      />

                      <Button
                      variant='secondary'
                        label='Delete'
                        onClick={() => handleDelete(contact.id)}
                      />
                    </span>
                  </div>
                  <hr className="border-gray-300 mx-4" />
                </div>
              ))}

              {filteredContacts.length === 0 && (
                <p className="px-4 py-2 text-gray-500">No contacts found</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <form
          className="flex flex-col gap-2 border border-gray-200 rounded-md p-4 mt-4"
          onSubmit={handleSubmit}
        >
          <button
            type="button"
            className="flex items-center gap-2 mb-2"
            onClick={handleBack}
          >
            <IoArrowBack /> Go Back
          </button>

          <h2 className="font-bold text-lg">
            {editingContact ? "Edit Contact" : "Add Contact"}
          </h2>

          <InputField
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            errors={errors.name}
          />

          <InputField
            label="Phone Number"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            errors={errors.phone}
          />

          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            errors={errors.email}
          />

          <div className="flex flex-col gap-1">
            <label className="text-sm">Relationship</label>
            <select
              name="relationship"
              value={formData.relationship}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="">Select relationship</option>
              {relationshipOptions.map((rel) => (
                <option key={rel} value={rel}>
                  {rel}
                </option>
              ))}
            </select>
            {errors.relationship && (
              <p className="text-red-500 text-sm">{errors.relationship[0]}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Note</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              className="border p-2 rounded w-full h-24 resize-none"
            />
          </div>

          <Button
            type="submit"
            label={editingContact ? "Update Contact" : "Add Contact"}
          />
        </form>
      )}
    </div>
  );
};

export default Contact;
