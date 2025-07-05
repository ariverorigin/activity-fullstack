import { useEffect, useState } from "react";
import { Order } from "../components";

export const useOrders = (
  page: number,
  pageSize: number,
  refreshIndex: number
) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = () => {
    setLoading(true);
    fetch(`http://localhost:3001/api/orders?page=${page}&pageSize=${pageSize}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, [refreshIndex]);

  return { orders, loading, error, refresh: fetchOrders };
};
