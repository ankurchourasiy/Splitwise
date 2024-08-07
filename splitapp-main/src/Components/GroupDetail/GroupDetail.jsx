import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './GrourDetail.css';
import { ExpenseContext } from '../ExpenseContext/ExpenseContext';
const GroupDetail = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [expenses,setExpenses]=useState([]);
  const [showModal, setShowModal] = useState(false);
  // const [amountLent,setAmountLent]=useState(0)
  const [newExpense,setNewExpense]=useState({
    amount:'',
    category:'',
    notes:''
  });

const {setRecentExpense}=useContext(ExpenseContext);


  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const groupResponse = await axios.get(`http://localhost:3000/api/v1/expensess/groups/${groupId}`);
        const expensesResponse=await axios.get(`http://localhost:3000/api/v1/expensess/GetExpByGroup/${groupId}`)
        setGroup(groupResponse.data[0]);
        setExpenses(expensesResponse.data)
      } catch (error) {
        console.log('Error fetching group data', error);
      }
  
    };

    fetchGroupDetails();
  }, [groupId]);
   
  const handleExpenseSubmit=async(e)=>{
     e.preventDefault();
     e.stopPropagation();
     const parsedAmount=parseFloat(newExpense.amount)
     try{
       await axios.post(`http://localhost:3000/api/v1/expensess/groups/${groupId}/expenses`,{
        amount:parsedAmount,
        category:newExpense.category,
        notes:newExpense.notes,
       });
       const expensesResponse = await axios.get(`http://localhost:3000/api/v1/expensess/GetExpByGroup/${groupId}`);
       console.log('Expenses Response:', expensesResponse.data)
       setExpenses(expensesResponse.data);
       setShowModal(false); // Close modal after submission
       setNewExpense({ amount: '', category: '', notes: '' }); // Clear form
      //  setAmountLent(Amount=>Amount+parsedAmount);
       setRecentExpense({amount:parsedAmount,category:newExpense.category,notes:newExpense.notes})
     }
     catch(error){
      console.log('error while adding expenses',error)
     }
  };


  if (!group) return <div>Loading...</div>;

  // const createdAt = new Date(group[0].created_at).toLocaleDateString();
  return (
    <div className="group-detail">
      <h1>{group.name}</h1>
      <h2>Expenses</h2>
    
      <table className="expense-table">
        <thead>
          <tr>
          <th>Date</th>
          <th>Payer</th>
          <th>Notes</th>
          <th>Category</th>
          <th>Amount Owed</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense=>(
            <tr key={expense.id}>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>{expense.name}</td>
                <td>{expense.notes}</td>
                <td>{expense.category}</td>
                <td>Rs. {expense.amount_owe}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="new-expenses" onClick={()=>setShowModal(true)}>
        AddExpense
      </button>

      
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Expense</h2>
            <form onSubmit={handleExpenseSubmit}>
              <div className="form-group">
                <label>Amount:</label>
                <input
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category:</label>
                <input
                  type="text"
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Notes:</label>
                <input
                  type="text"
                  value={newExpense.notes}
                  onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
                />
              </div>
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
            </form>
            {/* <div className="you-lent">
              <h2 className="heading-you-lent">
              Amount You lent from others :  <span>{amountLent}</span>
              </h2>

            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};
export default GroupDetail;
