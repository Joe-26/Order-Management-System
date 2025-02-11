import axios from "axios";

const REST_API_URL = "http://localhost:8080/api/orders";

export const listOrders = () => axios.get(REST_API_URL);

export const createOrder = (order) => axios.post(REST_API_URL, order);

export const getOrder = (orderId) => axios.get(REST_API_URL + '/' + orderId);

export const updateOrder = (orderId, order) => axios.put(REST_API_URL + '/' + orderId, order);

export const deleteOrder = (orderId) => axios.delete(REST_API_URL + '/' + orderId);

export const getTotalRevenue = () => axios.get(REST_API_URL + '/total-revenue');

export const getDashboardData = () => axios.get(REST_API_URL+ '/dashboard');