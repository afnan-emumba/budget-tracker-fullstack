import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(
      /^[a-zA-Z\s-]+$/,
      "First name can only contain alphabets, spaces, and hyphens"
    )
    .max(50, "First name must be at most 50 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .matches(
      /^[a-zA-Z\s-]+$/,
      "Last name can only contain alphabets, spaces, and hyphens"
    )
    .max(50, "Last name must be at most 50 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one alphabet, number, or special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
  budget: Yup.number()
    .min(1, "Budget must be at least 1")
    .max(99999999, "Budget must be at most 99999999")
    .required("Budget is required"),
});

export const profileValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(50, "First name must be at most 50 characters")
    .required("First name is required"),
  middleName: Yup.string().max(50, "Middle name must be at most 50 characters"),
  lastName: Yup.string()
    .max(50, "Last name must be at most 50 characters")
    .required("Last name is required"),
  aboutMe: Yup.string().max(500, "About me must be at most 500 characters"),
  gender: Yup.string().oneOf(
    ["male", "female", "rather_not_say"],
    "Invalid gender"
  ),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  website: Yup.string().matches(
    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
    "Invalid URL format"
  ),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits"),
  education: Yup.string(),
  streetAddress: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  zipCode: Yup.string()
    .matches(/^[0-9]+$/, "Zip code must contain only digits")
    .min(5, "Zip code must be at least 5 digits")
    .max(10, "Zip code must be at most 10 digits"),
  dateOfBirth: Yup.string(),
  budgetLimit: Yup.number()
    .min(1, "Budget limit must be at least 1")
    .max(99999999, "Budget limit must be at most 99999999")
    .required("Budget limit is required"),
});
