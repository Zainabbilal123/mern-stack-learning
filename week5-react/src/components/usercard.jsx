function UserCard({ name, email, role }) {
    return (
      <div style={{
        border: '1px solid #ddd',
        padding: '1rem',
        borderRadius: '8px',
        margin: '1rem',
        backgroundColor: role === 'admin' ? '#f0f0f0' : 'white'
      }}>
        <h3>{name}</h3>
        <p>Email: {email}</p>
        <span>Role: {role}</span>
      </div>
    );
  }
  
  export default UserCard;