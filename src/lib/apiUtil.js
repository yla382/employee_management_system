import axios from 'axios';
import env from "react-dotenv";

export const ApiUtil = {
    getSickDayByEmployee(id) {
        return axios.get(`${env.API_URL}/sickdays/${id}`).then((response) => response.data);
    },

    addNewSickDays(employeeId, sickDayFrom, sickDayTo) {
        const sickDays = {
            EMPLOYEE_ID: employeeId,
            sickDayFrom: sickDayFrom,
            sickDayTo: sickDayTo
        };

        return axios
            .post(`${env.API_URL}/sickdays/add`, sickDays)
            .then((response) => {
                return response;
            })
            .catch((err) => err.response);
    },

    getAllEmployee(filters) {
        const params = {
            EMPLOYEE_TYPE_ID: filters.employmentTypeFilter,
            first_name: filters.firstNameFilter,   
            last_name: filters.lastNameFilter,
            email_address: filters.emailFilter,
            phone_number: filters.phoneFilter,
            sick_count: filters.sickDaysFilter,
            sick_from: filters.sickDaysFromFilter,
            sick_to: filters.sickDaysToFilter
        }

        return axios.get(`${env.API_URL}/employees`, {params: params}).then((response) => response.data);
    },

    findEmployee(id) {
        return axios.get(`${env.API_URL}/employees/${id}`).then((response) => response.data);
    },

    deleteEmployee(id) {
        return axios.get(`${env.API_URL}/employees/${id}/delete`).then((response) => response);
    },

    addEmployee(employeeType, firstName, lastName, email, phoneNumber) {
        console.log(employeeType);
        const newEmployee = {
            EMPLOYEE_TYPE_ID: employeeType,
            first_name: firstName,
            last_name: lastName,
            email_address: email,
            phone_number: phoneNumber,
            active: 'Y'
        };
        return axios
            .post(`${env.API_URL}/employees/add`, newEmployee)
            .then((response) => {
                return response;
            })
            .catch((err) => err.response);
    },

    updateEmployee(id, employeeType, firstName, lastName, email, phoneNumber) {
        const updateEmployee = {
            ID: id,
            employee_info: {
                EMPLOYEE_TYPE_ID: employeeType,
                first_name: firstName,
                last_name: lastName,
                email_address: email,
                phone_number: phoneNumber,
                active: 'Y'
            }
        };

        return axios
            .post(`${env.API_URL}/employees/update`, updateEmployee)
            .then((response) => {
                return response;
            })
            .catch((err) => err.response);
    }
}