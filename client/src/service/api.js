import axios from "axios";

const url = "http://localhost:8000";

export const addUser = async (data) => {
  try {
    let response = await axios.post(`${url}/add`, data);
    return response.data;
  } catch (error) {
    console.log("Error while calling addUser API ", error);
  }
};

export const getUsers = async () => {
  try {
    let response = await axios.get(`${url}/users`);
    return response.data;
  } catch (error) {
    console.log("Error while calling getUsers API ", error);
  }
};

export const setConversation = async (data) => {
  try {
    await axios.post(`${url}/conversation/add`, data);
  } catch (error) {
    console.log("Error while calling setConversation API ", error);
  }
};

export const getConversation = async (users) => {
  try {
    let response = await axios.post(`${url}/conversation/get`, users);
    return response.data;
  } catch (error) {
    console.log("Error while calling getConversation API ", error);
  }
};

export const getMessages = async (id) => {
  try {
    let response = await axios.get(`${url}/message/get/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error while calling getMessages API ", error);
  }
};

export const newMessages = async (data) => {
  try {
    let response = await axios.post(`${url}/message/add`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error while calling newConversations API ", error);
  }
};

export const uploadFile = async (data) => {
  try {
    return await axios.post(`${url}/file/upload`, data);
  } catch (error) {
    console.log("Error while calling newConversations API ", error);
  }
};

export const isPhishingUrl = async (message) => {
  try {
    const response = await axios.post(`${url}/prediction`, message );
    console.log(message, "is a phishing link?", response);
    return response.data;
  } catch (error) {
    console.error("Error while checking url", error);
    throw error;
  }
};
