const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validatePostInput(data, file) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.description = !isEmpty(data.description) ? data.description : "";
    data.location = !isEmpty(data.location) ? data.location : "";
    data.farmer = !isEmpty(data.farmer) ? data.farmer : "";

    console.log(file);
    console.log(file);

    // Photo checks
    if (!file) {
        errors.photo = "Post image is required";
    }
    // Description checks
    if (Validator.isEmpty(data.description)) {
        errors.description = "Post description is required";
    }
    // Location checks
    if (Validator.isEmpty(data.location)) {
        errors.location = "Post location is required";
    }
    // Farmer checks
    if (Validator.isEmpty(data.farmer)) {
        errors.farmer = "Post farmer indication is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};