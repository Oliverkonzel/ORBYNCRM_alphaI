import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const getCustomers = async () => {
  const res = await api.get("/customers/");
  return res.data;
};

export const addCustomer = async (customer) => {
  const res = await api.post("/customers/", customer);
  return res.data;
};
