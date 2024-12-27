export interface User {
  _id?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  aboutMe?: string;
  gender?: string;
  email: string;
  password: string;
  website?: string;
  phoneNumber?: string;
  education?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  dateOfBirth?: string;
  budgetLimit: number;
  profilePicture?: string;
}

export interface UsersState {
  users: User[];
}

export interface Expense {
  _id?: string;
  title: string;
  userID: string;
  price: number;
  date: string;
}

export interface ExpensesState {
  expenses: Expense[];
}
