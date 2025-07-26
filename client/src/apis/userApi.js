import { baseUrl } from "../utils/Localization";
import { api, apiWithoutAuth } from "./api_config";
import axios from "axios";
const userBaseUrl = `${baseUrl}/api/auth`;

// Register new user with authorization token
export const registerNewUser = async (userData) => {
  try {
    const response = await apiWithoutAuth.post(
      `${userBaseUrl}/register`,
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      }
    );
    const dataReturned = {
      data: response.data,
      status: response.status,
      message: "User registration successful",
    };
    return dataReturned;
  } catch (error) {
    console.error(
      "Error registering user:",
      error.response ? error.response : error.message
    );
    throw error;
  }
};

// User login
export const loginUser = async (credentials) => {
  try {
    const response = await apiWithoutAuth.post(
      `${userBaseUrl}/login`,
      credentials
    );
    const dataReturned = {
      data: response.data,
      status: response.status,
      message: "User login successful",
    };
    return dataReturned;
  } catch (error) {
    console.error(
      "Error logging in user:",
      error.response ? error.response : error.message
    );
    throw error;
  }
};

// get All users
export const getAllUsers = async () => {
  try {
    const response = await api.get(`${userBaseUrl}`);
    const dataReturned = {
      data: response.data,
      status: response.status,
      message: "all users are returned successfully",
    };
    return dataReturned;
  } catch (error) {
    console.error(
      "Error getting users:",
      error.response ? error.response : error.message
    );
    throw error;
  }
};
// get All users stats
export const getAllUsersStats = async () => {
  try {
    const response = await api.get(`${userBaseUrl}/stats`);
    const dataReturned = {
      data: response.data,
      status: response.status,
      message: "all users are returned successfully",
    };
    return dataReturned;
  } catch (error) {
    console.error(
      "Error getting users:",
      error.response ? error.response : error.message
    );
    throw error;
  }
};
// get me
export const getMe = async () => {
  try {
    const response = await api.get(`${userBaseUrl}/me`);
    // console.log("🚀 ~ getMe ~ response:", response);
    const dataReturned = {
      data: response.data,
      status: response.status,
      message: "all users are returned successfully",
    };
    return dataReturned;
  } catch (error) {
    console.error(
      "Error getting users:",
      error.response ? error.response : error.message
    );
    throw error;
  }
};
