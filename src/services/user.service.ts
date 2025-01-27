import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

class UserService {
  static async getPlans() {
    return axios.get(`${API_URL}/plans`);
  }

  static async getAgencyUsers() {
    return axios.get(`${API_URL}/agency/users`);
  }

  static async createAgencyUser(userData: any) {
    return axios.post(`${API_URL}/agency/users`, userData);
  }

  static async updateAgencyUser(userData: any) {
    return axios.put(`${API_URL}/agency/users/${userData.userid}`, userData);
  }

  static async deleteAgencyUser(userId: string) {
    return axios.delete(`${API_URL}/agency/users/${userId}`);
  }

  static async editAgencyUser(userData: any) {
    return axios.put(`${API_URL}/agency/users/${userData.userid}`, userData);
  }
}

export default UserService; 