"use client";

export default function DynamicTable({ config }: any) {
  if (!config) return null;

  if (!config.columns || !config.data) {
    return (
      <div className="text-red-500">
        Invalid table configuration
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300">
        <thead>
          <tr>
            {config.columns.map(
              (column: string, index: number) => (
                <th
                  key={index}
                  className="border p-2"
                >
                  {column}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {config.data.map(
            (row: any[], rowIndex: number) => (
              <tr key={rowIndex}>
                {row.map(
                  (
                    cell: any,
                    cellIndex: number
                  ) => (
                    <td
                      key={cellIndex}
                      className="border p-2"
                    >
                      {cell}
                    </td>
                  )
                )}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}