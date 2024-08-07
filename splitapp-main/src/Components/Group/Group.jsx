import React, { useEffect, useState } from 'react'
import './Group.css'
import {Link,useNavigate} from 'react-router-dom'
import Select from 'react-select';
import axios from 'axios';


const Group = () => {
  const [groupName, setGroupName] = useState('');
  const [selectedusers,setselectedusers]=useState([]);
  const [options,setOptions]=useState([]);
  const navigate = useNavigate();

   useEffect(()=>{
    const fetchUsers=async()=>{
      try{
        const response =await axios.get('http://localhost:3000/api/v1/users');
        const users=response.data;
        const userOptions=users.map(users=>({
          value: users.id,
          label:users.email
        }))
        setOptions(userOptions)
      }
      catch(error){
        console.log('error for fetching users',error);
      }
    };

    fetchUsers();
   },[])

  const handleChange=(selected)=>{
    setselectedusers(selected);
  }


         const handleSubmit=async(e)=>{
          e.preventDefault();
          e.stopPropagation();
          try{
          const response=await axios.post('http://localhost:3000/api/v1/expensess/groups',{
            name:groupName,
            created_at:new Date().toISOString()
          })

          const groupId=response.data.id;

          await axios.post('http://localhost:3000/api/v1/expensess/groups/addMembers',{
            group_id:groupId,
            user_Ids:selectedusers.map(user=>user.value)
          })
          navigate(`/group/${groupId}`);
          }
          catch(error){
            console.log('error creating group',error)
          }
         }
  
   
  return (
    <div className="create-group">
    <header className="header">
      <h1 className="home-title"><Link to="/Home">Splitwise</Link></h1>
      <h1 className="user-page"><Link to="/User">User Page</Link></h1>
    </header>
    <main className="main-content">
      <h2>Start a New Group</h2>
      <form className="group-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="groupName">Group Name:</label>
          <input
              type="text"
              id="groupName"
              name="groupName"
              value={groupName}
              onChange={(e) =>{e.stopPropagation(); setGroupName(e.target.value)}}
              required
            />
        </div>
       
        <div className="form-group">
          <label htmlFor="email">Email:</label>
         <Select
         isMulti
         name='users'
         options={options}
         className='multi-select'
         value={selectedusers}
         onChange={handleChange}
         />
        </div>
        
        <button type="submit" className="create-group-button">Create Group</button>
      
      </form>
    </main>
  </div>
  )
}

export default Group