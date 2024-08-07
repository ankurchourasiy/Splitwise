import React, { createContext, useState } from 'react';

export const ExpenseContext=createContext();

export const ExpenseProvider = ({children}) => {
    const [recentExpense,setRecentExpense]=useState(null);
  return (
    <ExpenseContext.Provider value={{recentExpense,setRecentExpense}}>
        {children}
    </ExpenseContext.Provider>
  );
};