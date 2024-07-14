import React, { useState } from "react";
import { useFetchData } from "../../Hooks/useFetchData";
import { Helmet } from "react-helmet";

export default function Data() {
  const [searchName, setSearchName] = useState("");
  const [searchAmount, setSearchAmount] = useState("");

  const {
    customers,
    customersLoading,
    customersError,
    transactions,
    transactionsLoading,
    transactionsError,
  } = useFetchData();

  const filteredCustomers = customers?.filter((customer) => {
    const nameMatches =
      searchName == "" ||
      customer.name.toLowerCase().includes(searchName.toLowerCase());
    const transactionMatches = transactions?.some(
      (transaction) =>
        transaction.customer_id == customer.id &&
        (searchAmount == "" ||
          transaction.amount.toString().includes(searchAmount))
    );
    return nameMatches && (searchAmount == "" || transactionMatches);
  });

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

  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Data</title>
        </Helmet>
      </div>
      <section className="container border my-5">
        <div className="border p-3 mt-5">
          <h5 className="mb-4">Search:</h5>
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6">
                <label htmlFor="searchCustomers" className="fw-bold mb-2">
                  Customer name:
                </label>
                <input
                  id="searchCustomers"
                  type="text"
                  placeholder="Search by customer name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="form-control mb-3"
                />
              </div>
              <div className="col-12 col-sm-12 col-md-6">
                <label htmlFor="searchTransaction" className="fw-bold mb-2">
                  Transaction amount:
                </label>
                <input
                  id="searchTransaction"
                  type="text"
                  placeholder="Search by transaction amount"
                  value={searchAmount}
                  onChange={(e) => setSearchAmount(e.target.value)}
                  className="form-control mb-3"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Transactions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => {
                const filteredTransactions = transactions.filter(
                  (transaction) =>
                    transaction.customer_id == customer.id &&
                    (searchAmount == "" ||
                      transaction.amount.toString().includes(searchAmount))
                );

                return (
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Date</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredTransactions.map((transaction) => (
                            <tr key={transaction.id}>
                              <td>{transaction.id}</td>
                              <td>{transaction.date}</td>
                              <td>{transaction.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
