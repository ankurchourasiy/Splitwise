import React, { useContext } from 'react';
import { ExpenseContext } from '../ExpenseContext/ExpenseContext';
import './RecentActivity.css'; 
// import { Link } from 'react-router-dom';

const RecentActivity = () => {
  const { recentExpense } = useContext(ExpenseContext);

  return (
    <div className="recent-activity-container">
      <h1 className="recent-activity-title">Recent Activity</h1>
      
      {recentExpense ? (
        <div className="recent-expense">
          <p className="expense-details">
            <span className="expense-amount">Rs. {recentExpense.amount}</span> is divided among all the members in a group for <span className="expense-category">{recentExpense.category}</span> purposes. Extra details: <span className="expense-notes">{recentExpense.notes}</span>
          </p>
        </div>
      ) : (
        <p className="no-expenses-message">No recent expenses.</p>
      )}
    </div>
  );
};

export default RecentActivity;
