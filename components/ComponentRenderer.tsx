"use client";

import DynamicForm from "./DynamicForm";
import DynamicTable from "./DynamicTable";
import DynamicDashboard from "./DynamicDashboard";

export default function ComponentRenderer({
  component,
}: any) {
  switch (component.type) {
    case "form":
      return (
        <DynamicForm
          config={{
            fields: component.fields,
          }}
        />
      );

    case "table":
      return (
        <DynamicTable
          config={{
            columns: component.columns,
            data: component.data,
          }}
        />
      );

    case "dashboard":
      return (
        <DynamicDashboard
          config={{
            cards: component.cards,
          }}
        />
      );

    default:
      return (
        <div className="bg-yellow-100 text-yellow-700 p-3 rounded">
          Unknown component type:{" "}
          {component.type}
        </div>
      );
  }
}