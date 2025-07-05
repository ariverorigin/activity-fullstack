import React from "react";
import { Order } from "../interfaces";

type Props = {
  orders: Order[];
  loading: boolean;
  error: string | null;
  onAddOrderClick: () => void;
  onNextPage: () => void;
  onPrevPage: () => void;
  currentPage: number;
  totalPages: number;
};

export const OrderList: React.FC<Props> = ({
  orders,
  loading,
  error,
  onAddOrderClick,
  onPrevPage,
  onNextPage,
  currentPage,
  totalPages,
}) => {
  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders: {error}</p>;
  if (orders.length === 0) return <p>No orders available.</p>;

  return (
    <div className="table">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onAddOrderClick();
        }}
      >
        Click here to Add Order
      </a>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.product}</td>
              <td>{order.qty}</td>
              <td>₱ {order.price.toFixed(2)}</td>
              <td>₱ {(order.qty * order.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="navigation">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onPrevPage();
          }}
        >
          &#60; Previous
        </a>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNextPage();
          }}
        >
          Next &#62;
        </a>
      </div>
    </div>
  );
};
