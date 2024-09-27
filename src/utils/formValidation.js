export function valueIsNull(value) {
  if (value === null || value === "" || value.trim() === "") {
    return "Field cannot be empty";
  }
}

export function valueIsEmail(value) {
  const regex = /\S+@\S+\.\S+/;
  if (value !== null && value !== "" && !regex.test(value)) {
    return "Invalid Email Address";
  }
}

export function hasLengthLimit(value, min, max) {
  if (min && value.trim().length < min) {
    return `Please enter a value longer than ${min}`;
  }
  if (max && value.trim().length > max) {
    return `Please enter a value shorter than ${max}`;
  }
}

export function passwordValidation(password) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
  if (!regex.test(password)) {
    return "Password must contain characters and numbers";
  }
  return hasLengthLimit(password, 6, null);
}

export function confirmPassword(value1, value2) {
  if (value1 !== value2) {
    return "Password didn't match";
  }
}
