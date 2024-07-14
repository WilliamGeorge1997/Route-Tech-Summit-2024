import React from "react";
import { useFetchData } from "../../Hooks/useFetchData";
import { Helmet } from "react-helmet";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Text,
} from "recharts";

export default function Graph() {
  const {
    customers,
    customersLoading,
    customersError,
    transactions,
    transactionsLoading,
    transactionsError,
  } = useFetchData();

  function processData(customers, transactions) {
    if (!Array.isArray(customers) || !Array.isArray(transactions)) return [];

    const customerMap = {};
    customers.forEach((customer) => {
      customerMap[customer.id] = customer.name;
    });

    const groupedTransactions = {};
    transactions.forEach((transaction) => {
      const key = `${transaction.customer_id}-${transaction.date}`;
      if (!groupedTransactions[key]) {
        groupedTransactions[key] = {
          customer_id: transaction.customer_id,
          date: transaction.date,
          total_amount: 0,
        };
      }
      groupedTransactions[key].total_amount += transaction.amount;
    });

    return Object.values(groupedTransactions).map((transaction) => ({
      name: transaction.date,
      customer_id: transaction.customer_id,
      customer: customerMap[transaction.customer_id] || "Unknown",
      total_amount: transaction.total_amount,
    }));
  }

  function CustomTooltip({ active, payload, label }) {
    if (active && payload && payload.length) {
      const { customer, total_amount } = payload[0].payload;
      return (
        <div className="custom-tooltip border bg-white p-2">
          <p>{`Date: ${label}`}</p>
          <p>{`Customer: ${customer}`}</p>
          <p>{`Total Amount: ${total_amount}`}</p>
        </div>
      );
    }
    return null;
  }

  if (customersLoading || transactionsLoading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (customersError || transactionsError) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <h2>Error fetching data</h2>
      </div>
    );
  }

  const chartData = processData(customers, transactions);

  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Graph</title>
        </Helmet>
      </div>
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div>
          <h2>Total Amount of Transactions per Customer per Day</h2>
          <BarChart width={800} height={400} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="total_amount" fill="#8884d8" />
            {chartData.map((entry, index) => (
              <Text
                key={index}
                x={
                  index * (800 / chartData.length) +
                  (800 / chartData.length - 20) / 2
                }
                y={400}
                width={800 / chartData.length}
                textAnchor="middle"
              >
                {entry.customer}
              </Text>
            ))}
          </BarChart>
        </div>
      </div>
    </>
  );
}
