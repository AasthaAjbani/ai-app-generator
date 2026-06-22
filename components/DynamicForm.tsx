"use client";

import { useState } from "react";

export default function DynamicForm({ config }: any) {
  const [formData, setFormData] = useState<any>({});

  const supportedTypes = [
    "text",
    "email",
    "number",
    "password",
    "textarea",
    "select",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    for (const field of config.fields) {
      const value = String(formData[field.name] || "").trim();

      // Required validation
      if (value === "") {
        alert(`${field.label} is required`);
        return;
      }

      // Email validation
      if (field.type === "email") {
        const emailRegex =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(value)) {
          alert("Please enter a valid email address");
          return;
        }
      }

      // Number validation
      if (field.type === "number") {
        if (isNaN(Number(value))) {
          alert(`${field.label} must be a valid number`);
          return;
        }
      }
    }

    try {
      const response = await fetch(
        "/api/submissions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        alert("Failed to save submission");
        return;
      }

      const result = await response.json();

      console.log("Saved:", result);

      alert("Form submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="space-y-4">
      {config.fields.map((field: any) => (
        <div key={field.name}>
          <label className="block mb-1 font-medium">
            {field.label}
          </label>

          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              rows={4}
            />
          ) : field.type === "select" ? (
            <select
              name={field.name}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="">
                Select an option
              </option>

              {field.options?.map(
                (option: string) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                )
              )}
            </select>
          ) : supportedTypes.includes(
              field.type
            ) ? (
            <input
              type={field.type}
              name={field.name}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          ) : (
            <div className="bg-red-100 border border-red-300 text-red-600 p-2 rounded">
              Unsupported field type:{" "}
              {field.type}
            </div>
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}