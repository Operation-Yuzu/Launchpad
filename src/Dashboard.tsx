import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard ({dashboardId, toggleEditing}: {dashboardId: number, toggleEditing: () => void}) {
  const [dashboard, setDashboard] = useState({name: "Loading"});
  
  const loadDashboard = async () => {
    try {
      const response = await axios.get(`/dashboard/${dashboardId}`);
      console.log(response.data);
      setDashboard(response.data);
    } catch (error) {
      console.error('Failed to get dashboard:', error);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <>
      <h2>{dashboard.name}</h2>
      <button onClick={toggleEditing}>Edit</button>
    </>
  );
}

export default Dashboard;
