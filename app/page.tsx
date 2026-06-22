"use client";

import { useState } from "react";
import DynamicForm from "../components/DynamicForm";
import DynamicTable from "../components/DynamicTable";
import DynamicDashboard from "../components/DynamicDashboard";
import ComponentRenderer from "../components/ComponentRenderer";

export default function Home() {
  const [jsonInput, setJsonInput] = useState(`{
  "title": "Student Registration",
  "fields": [
    {
      "name": "name",
      "label": "Student Name",
      "type": "text"
    },
    {
      "name": "email",
      "label": "Email",
      "type": "email"
    }
  ]
}`);

  const [config, setConfig] = useState<any>(null);
  const [error, setError] = useState("");

  const generateApp = () => {
    try {
      const parsed = JSON.parse(jsonInput);

      if (!parsed.title) {
        setError("Missing title");
        setConfig(null);
        return;
      }

      // MULTI-COMPONENT PAGE
      if (Array.isArray(parsed.components)) {
        setConfig(parsed);
        setError("");
        return;
      }

      // DASHBOARD
      if (parsed.type === "dashboard") {
        if (!Array.isArray(parsed.cards)) {
          setError("cards must be an array");
          setConfig(null);
          return;
        }

        setConfig(parsed);
        setError("");
        return;
      }

      // TABLE
      if (parsed.type === "table") {
        if (!Array.isArray(parsed.columns)) {
          setError("columns must be an array");
          setConfig(null);
          return;
        }

        if (!Array.isArray(parsed.data)) {
          setError("data must be an array");
          setConfig(null);
          return;
        }

        setConfig(parsed);
        setError("");
        return;
      }

      // FORM
      if (!parsed.fields) {
        setError("Missing fields array");
        setConfig(null);
        return;
      }

      if (!Array.isArray(parsed.fields)) {
        setError("fields must be an array");
        setConfig(null);
        return;
      }

      setConfig(parsed);
      setError("");
    } catch {
      setError("Invalid JSON");
      setConfig(null);
    }
  };

  return (
    <main className="max-w-6xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-6">
        AI App Generator
      </h1>

      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        className="w-full border p-4 rounded h-64"
      />

      <button
        onClick={generateApp}
        className="bg-green-600 text-white px-5 py-2 rounded mt-4 hover:bg-green-700"
      >
        Generate App
      </button>

      {error && (
        <div className="mt-4 p-3 rounded bg-red-100 text-red-600">
          {error}
        </div>
      )}

      {config && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">
            {config.title}
          </h2>

          {/* MULTI-COMPONENT MODE */}
          {config.components ? (
            <div className="space-y-8">
              {config.components.map(
                (component: any, index: number) => (
                  <ComponentRenderer
                    key={index}
                    component={component}
                  />
                )
              )}
            </div>
          ) : config.type === "dashboard" ? (
            <DynamicDashboard config={config} />
          ) : config.type === "table" ? (
            <DynamicTable config={config} />
          ) : (
            <DynamicForm config={config} />
          )}
        </div>
      )}
    </main>
  );
}