module.exports = {
    validateInput: function (fields) {
        console.log(typeof fields.EMPLOYEE_TYPE_ID);
        if(fields.EMPLOYEE_TYPE_ID !== '2' && fields.EMPLOYEE_TYPE_ID !== '1') {
            return {validation: false, msg: "Please choose valid employment type"};
        }
    
        const nameRegex = /^[a-zA-Z]+$/;
        if(!nameRegex.test(fields.first_name) && !nameRegex.test(fields.lastName)) {
            return {validation: false, msg: "Please choose valid name"};
        }
    
        const emailRegex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if(!emailRegex.test(fields.email_address)) {
            return {validation: false, msg: "Please choose valid email"};
        }
    
        const phoneRegex = /^\d{10}$/;
        if(!phoneRegex.test(fields.phone_number)) {
            return {validation: false, msg: "Please choose valid phone number"};
        }

        return {validation: true, msg: "success"};
    }
};