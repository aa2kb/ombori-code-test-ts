import axios from 'axios';
import { User, ApiResponse } from '../types/api';

export const fetchUsers = async (page: number): Promise<User[]> => {
    const response = await axios.get<ApiResponse>(`https://reqres.in/api/users?page=${page}`);
    return response.data.data;
};
