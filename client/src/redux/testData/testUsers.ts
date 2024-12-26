import { User } from "../../utils/interfaces";

export const testUsers: Array<User> = [
  {
    userId: 1,
    firstName: "John",
    middleName: "A.",
    lastName: "Doe",
    aboutMe:
      "Hello I am a demo user made for testing, I am a software engineer and I love to code.",
    gender: "male",
    email: "john@example.com",
    password: "12345678",
    website: "www.johndoe.com",
    phoneNumber: "03001234567",
    education: "Bachelor's Degree in Computer Science",
    streetAddress: "123 Main St",
    city: "Anytown",
    state: "Anystate",
    zipCode: "12345",
    dateOfBirth: "1990-01-01",
    budgetLimit: 50000,
    profilePicture: "",
    isLoggedIn: false,
  },
];
