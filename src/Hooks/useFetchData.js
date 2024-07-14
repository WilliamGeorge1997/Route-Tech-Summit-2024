import { useQuery } from "react-query";
import axios from "axios";

const localData = {
  customers: [
    { id: 1, name: "Ahmed Ali" },
    { id: 2, name: "Aya Elsayed" },
    { id: 3, name: "Mina Adel" },
    { id: 4, name: "Sarah Reda" },
    { id: 5, name: "Mohamed Sayed" },
  ],
  transactions: [
    { id: 1, customer_id: 1, date: "2022-01-01", amount: 1000 },
    { id: 2, customer_id: 1, date: "2022-01-02", amount: 2000 },
    { id: 3, customer_id: 2, date: "2022-01-01", amount: 550 },
    { id: 4, customer_id: 3, date: "2022-01-01", amount: 500 },
    { id: 5, customer_id: 2, date: "2022-01-02", amount: 1300 },
    { id: 6, customer_id: 4, date: "2022-01-01", amount: 750 },
    { id: 7, customer_id: 3, date: "2022-01-02", amount: 1250 },
    { id: 8, customer_id: 5, date: "2022-01-01", amount: 2500 },
    { id: 9, customer_id: 5, date: "2022-01-02", amount: 875 },
  ],
};

const fetchCustomers = async () => {
  try {
    const { data } = await axios.get("http://localhost:2000/customers");
    return data;
  } catch (error) {
    return localData.customers;
  }
};

const fetchTransactions = async () => {
  try {
    const { data } = await axios.get("http://localhost:2000/transactions");
    return data;
  } catch (error) {
    return localData.transactions;
  }
};

export const useFetchData = () => {
  const {
    data: customers,
    isLoading: customersLoading,
    error: customersError,
  } = useQuery("customers", fetchCustomers);

  const {
    data: transactions,
    isLoading: transactionsLoading,
    error: transactionsError,
  } = useQuery("transactions", fetchTransactions);

  return {
    customers,
    customersLoading,
    customersError,
    transactions,
    transactionsLoading,
    transactionsError,
  };
};
