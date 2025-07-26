import { baseUrl } from './index';
import { api, apiWithoutAuth } from './api_config';
const targetGroupBaseUrl = `${baseUrl}/target-groups`;

// Get all target groups
export const getAllTargetGroups = async () => {
    try {
      const response = await apiWithoutAuth.get(`${targetGroupBaseUrl}/`, );
      const dataReturned = { data: response.data, status: response.status, message: "Get all target groups" }
      return dataReturned;
    } catch (error) {
      console.error("Error getting target groups:", error.response ? error.response : error.message);
      throw error;
    }
  };

// get target group by id
export const getTargetGroupById = async (id) => {
    try {
      const response = await api.get(`${targetGroupBaseUrl}/${id}`);
      const dataReturned = { data: response.data, status: response.status, message: "Get target group by id" }
      return dataReturned;
    } catch (error) {
      console.error("Error getting target group:", error.response ? error.response : error.message);
      throw error;
    }
  };

  // get latest two events
export const getLatestTwoEvents = async (type) => {
    try {
      const response = await api.post(`${targetGroupBaseUrl}/latest`);
      const dataReturned = { data: response.data, status: response.status, message: "Get latest two events" }
      return dataReturned;
    } catch (error) {
      console.error("Error getting latest two events:", error.response ? error.response : error.message);
      throw error;
    }
  };

// Editor Creates New target group
export const createNewTargetGroup = async (targetGroupData) => {
    try {
      const response = await api.post(`${targetGroupBaseUrl}/`, targetGroupData);
      const dataReturned = { data: response.data, status: response.status, message: "Target group Data created successfully" }
      return dataReturned;
    } catch (error) {
      console.error("Error creating target group:", error.response ? error.response : error.message);
      throw error;
    }
  };

// Editor edits New target group info
export const editTargetGroupInfo = async (id, targetGroupData) => {
    try {
      const response = await api.patch(`${targetGroupBaseUrl}/${id}`, targetGroupData);
      const dataReturned = { data: response.data, status: response.status, message: "Target group Data edited successfully" }
      return dataReturned;
    } catch (error) {
      console.error("Error editing Target group:", error.response ? error.response : error.message);
      throw error;
    }
  };

// Editor deletes target group
export const deleteTargetGroupById = async (id) => {
    try {
      const response = await api.delete(`${targetGroupBaseUrl}/${id}`);
      const dataReturned = { data: response.data, status: response.status, message: "Editor deleted target group successfully" }
      return dataReturned;
    } catch (error) {
      console.error("Error in deleting target group:", error.response ? error.response : error.message);
      throw error;
    }
  }