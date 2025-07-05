import React, { useCallback, useState } from "react";
import { SummaryDisplay, OrderList, OrderForm } from "./components";
import { useSummary, useOrders } from "./hooks";

const App: React.FC = () => {
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [showAddOrder, setShowAddOrder] = useState(false);

  const { summary, loading, error } = useSummary();
  const {
    orders,
    loading: ordersLoading,
    error: ordersError,
  } = useOrders(refreshIndex);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const paginatedOrders = orders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleOrderCreated = useCallback(() => {
    console.log("here");
    setRefreshIndex((prev) => prev + 1); // triggers refresh in hooks
  }, []);

  const handleAddOrderClick = useCallback(() => {
    console.log("handleAddOrderClick");
    setShowAddOrder(true);
  }, []);

  return (
    <div className="main-container">
      <h1>Order Dashboard</h1>
      {showAddOrder && (
        <OrderForm
          onOrderCreated={() => {
            setRefreshIndex((prev) => prev + 1);
            setShowAddOrder(false); // optionally hide after submitting
          }}
        />
      )}
      <OrderList
        orders={paginatedOrders}
        loading={ordersLoading}
        error={ordersError}
        onAddOrderClick={handleAddOrderClick}
        onNextPage={() => setCurrentPage((prev) => prev + 1)}
        onPrevPage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        currentPage={currentPage}
        totalPages={Math.ceil(orders.length / pageSize)}
      />
      <SummaryDisplay summary={summary} loading={loading} error={error} />
    </div>
  );
};

export default App;
