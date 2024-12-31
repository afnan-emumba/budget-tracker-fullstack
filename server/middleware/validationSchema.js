import * as yup from "yup";

export const updateUserSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  firstName: yup.string().required("First name is required"),
  middleName: yup.string(),
  lastName: yup.string().required("Last name is required"),
  aboutMe: yup.string(),
  gender: yup.string(),
  website: yup
    .string()
    .matches(
      /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,4}\/?$/,
      "Please fill a valid website URL"
    ),
  phoneNumber: yup.string(),
  education: yup.string(),
  streetAddress: yup.string(),
  city: yup.string(),
  state: yup.string(),
  zipCode: yup.string(),
  dateOfBirth: yup.string(),
  budgetLimit: yup
    .number()
    .required("Budget limit is required")
    .min(1, "Budget limit must be at least 1")
    .max(99999999, "Budget limit must be at most 99999999"),
  profilePicture: yup.string(),
});

export const createUserSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  budgetLimit: yup
    .number()
    .required("Budget limit is required")
    .min(1, "Budget limit must be at least 1")
    .max(99999999, "Budget limit must be at most 99999999"),
});

export const createExpenseSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  price: yup.number().required("Price is required"),
  date: yup.string().required("Date is required"),
});

export const updateExpenseSchema = yup.object().shape({
  title: yup.string(),
  price: yup.number(),
  date: yup.string(),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
