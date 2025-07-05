import React, { useState } from "react";

interface OrderFormProps {
  onOrderCreated: () => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ onOrderCreated }) => {
  const [product, setProduct] = useState("");
  const [qty, setQty] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product, qty, price }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create order");
      }

      setProduct("");
      setQty(1);
      setPrice(0);

      onOrderCreated(); // to refresh order list and summary
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Order</h2>

      <div>
        <label>Product:</label>
        <input
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Quantity:</label>
        <input
          type="number"
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value))}
          required
          min={1}
        />
      </div>

      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          required
          min={0}
          step={0.01}
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Add Order"}
      </button>
    </form>
  );
};
