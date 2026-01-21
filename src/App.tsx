import { useState } from 'react';

import Dashboard from './Dashboard';
import DashEditor from './DashEditor';

function App() {
  const [editing, setEditing] = useState(false);

  const toggleEditing = () => {
    setEditing((e: boolean) => !e);
  }

  const dashboardId = 1; // hardcoded for now


  return (
    <>
      <h1>Rendering</h1>
      {
        editing ? <DashEditor dashboardId={dashboardId} toggleEditing={toggleEditing}/>
          : <Dashboard dashboardId={dashboardId} toggleEditing={toggleEditing}/>
      }
    </>
  );
}

export default App;
