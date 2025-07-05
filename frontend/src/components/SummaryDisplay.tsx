import React from "react";
import { Summary } from "../interfaces";

type Props = {
  summary: Summary | null;
  loading: boolean;
  error: string | null;
};

export const SummaryDisplay: React.FC<Props> = ({
  summary,
  loading,
  error,
}) => {
  if (loading) return <p>Loading summary...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!summary) return <p>No summary available.</p>;

  return (
    <div className="table table-summary">
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Summary</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th>Total Revenue:</th>
            <td>₱ {summary.totalRevenue.toFixed(2)}</td>
          </tr>
          <tr>
            <th>Median Order Price:</th>
            <td>₱ {summary.medianOrderPrice.toFixed(2)}</td>
          </tr>
          <tr>
            <th>Top Product by Quantity: </th>
            <td>{summary.topProductByQty}</td>
          </tr>
          <tr>
            <th>Unique Product Count:</th>
            <td>{summary.uniqueProductCount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
