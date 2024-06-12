import axios from 'axios';

interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export const fetchUsers = async (page: number): Promise<User[]> => {
    const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
    return response.data.data;
};
