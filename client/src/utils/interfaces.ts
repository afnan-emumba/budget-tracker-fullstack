export interface User {
  userId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  aboutMe: string;
  gender: string;
  email: string;
  password: string;
  website: string;
  phoneNumber: string;
  education: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  dateOfBirth: string;
  budgetLimit: number;
  profilePicture: string;
  isLoggedIn: boolean;
}

export interface UsersState {
  users: User[];
}

export interface Expense {
  key: number;
  userId: number;
  expense: string;
  price: string;
  date: string;
}

export interface ExpensesState {
  expenses: Expense[];
}
