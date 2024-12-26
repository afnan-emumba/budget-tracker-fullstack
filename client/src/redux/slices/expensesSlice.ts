import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Expense, ExpensesState } from "../../utils/interfaces";
import { testExpenses } from "../testData/testExpenses";

const initialState: ExpensesState = {
  expenses: [...testExpenses],
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.push(action.payload);
    },
    updateExpense: (
      state,
      action: PayloadAction<Partial<Expense> & { key: number }>
    ) => {
      const index = state.expenses.findIndex(
        (expense) => expense.key === action.payload.key
      );
      if (index !== -1) {
        state.expenses[index] = { ...state.expenses[index], ...action.payload };
      }
    },
    deleteExpense: (state, action: PayloadAction<number>) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.key !== action.payload
      );
    },
  },
});

export const { addExpense, updateExpense, deleteExpense } =
  expensesSlice.actions;
export default expensesSlice.reducer;
