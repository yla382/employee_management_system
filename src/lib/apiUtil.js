import axios from 'axios';

export const ApiUtil = {
    getAllEmployee() {
        return axios.get('http://localhost:3001/employees').then((response) => response.data);
    }
}