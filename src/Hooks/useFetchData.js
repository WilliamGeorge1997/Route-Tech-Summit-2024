import { useQuery } from "react-query";
import axios from "axios";

const fetchCustomers = async () => {
  const { data } = await axios.get("http://localhost:2000/customers");
  return data;
};

const fetchTransactions = async () => {
  const { data } = await axios.get("http://localhost:2000/transactions");
  return data;
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
