"use client";

export default function DynamicDashboard({ config }: any) {
  if (!config.cards || !Array.isArray(config.cards)) {
    return (
      <div className="bg-red-100 text-red-600 p-3 rounded">
        Invalid dashboard configuration
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {config.cards.map((card: any, index: number) => (
        <div
          key={index}
          className="border rounded-lg p-6 shadow-sm bg-white"
        >
          <h3 className="text-gray-500 text-sm">
            {card.title}
          </h3>

          <p className="text-3xl font-bold mt-2">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}