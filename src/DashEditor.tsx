function DashEditor({dashboardId, toggleEditing}: {dashboardId: number, toggleEditing: () => void}) {
  return (
    <>
      <h2>Editing: {dashboardId}</h2>
      <button onClick={toggleEditing}>Done</button>
    </>
  );
}

export default DashEditor;
