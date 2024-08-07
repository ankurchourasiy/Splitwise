import React from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import axios from 'axios';
import { useEffect,useState } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout();
    navigate('/login');
  };

  const [groups, setGroups] = useState([]);
  const[userName,setUserName]=useState('');

  
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/expensess/groups');
        setGroups(response.data);
      } catch (error) {
        console.log('Error fetching groups', error);
      }
    };
     
    const name=localStorage.getItem('userName');
    if(name){
      setUserName(name);
    }
    fetchGroups();
  }, []);

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="logo-container">
          <img src="/assets/splitwise-logo.png" alt="Splitwise Logo" className="logo" />
        </div>
      </header>
      <div className="user-actions">
        <button onClick={handleLogout}>Logout</button>
        <Link to="/User">
          <img src="https://picsum.photos/id/3/50/50" alt="User" className="user-image" />
        </Link>
      </div>
      <h2 className="admin-subtitle">Splitwise Admin Panel</h2>
      <h3 className="admin-subtext">for {userName}</h3>
      <nav className="admin-nav">
        <button onClick={() => navigate('/RecentActivity')}>Check your Recent Activity</button>
        <br></br>
        <button onClick={() => navigate('/CreateGroup')}>Create Group</button>
      </nav>
      <main className="admin-main">
         
        <h2>Your Groups</h2>
        <ul className="group-list">
          {groups.map(group => (
            <li key={group.id}>
              <Link to={`/group/${group.id}`}>{group.name}</Link>
            </li>
          ))}
        </ul>
       </main>
    </div>
  );
};

export default Home;
