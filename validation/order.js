const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateOrderInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.items = !isEmpty(data.items) ? data.items : "";
    data.quantity = !isEmpty(data.quantity) ? data.quantity : "";
    data.userId = !isEmpty(data.userId) ? data.userId : "";
    data.farmerId = !isEmpty(data.farmerId) ? data.farmerId : "";
    data.completed = !isEmpty(data.completed) ? data.completed : "";

    // items checks
    if (Validator.isEmpty(data.items)) {
        errors.items = "Items field is required";
    }
    // items checks
    if (Validator.isEmpty(data.quantity)) {
        errors.quantity = "Quantity field is required";
    }
    // items checks
    if (Validator.isEmpty(data.userId)) {
        errors.userId = "userId field is required";
    }
    // items checks
    if (Validator.isEmpty(data.farmerId)) {
        errors.farmerId = "FarmerId field is required";
    }
    // items checks
    if (Validator.isEmpty(data.completed)) {
        errors.completed = "Completed field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};