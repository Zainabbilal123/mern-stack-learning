import userlist from '../components/userlist';

function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your protected dashboard!</p>
      <UserList />
    </div>
  );
}

export default DashboardPage;