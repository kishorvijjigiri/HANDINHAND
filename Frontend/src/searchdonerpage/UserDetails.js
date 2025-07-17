import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoandNaviBar from '../Commonfiles/LogoandNaviBar';

const UserDetails = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const response = await fetch(`http://localhost:8080/userdetails/delete/${user.email}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          localStorage.removeItem('user');
          alert('Account deleted successfully.');
          navigate('/');
        } else {
          try {  // Nested try-catch for parsing error text
            const errorText = await response.text();
            // Check if errorText is valid JSON, if yes, parse it and display the message
            try {
                const errorJson = JSON.parse(errorText);
                alert(`Failed to delete account. ${errorJson.message || errorText || 'Please try again later.'} Status: ${response.status}`);
            } catch (jsonError) {
                alert(`Failed to delete account. ${errorText || 'Please try again later.'} Status: ${response.status}`);
            }
            console.error(`Server returned ${response.status}: ${errorText}`);
          } catch (textError) { // Catch if response.text() fails (e.g., no body)
            alert(`Failed to delete account. Please try again later. Status: ${response.status}`);
            console.error(`Error getting error text: ${textError}`);
          }
        }
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('An error occurred while deleting the account.');
      }
    }
  };


  if (!user) {
    return (
      <div className="text-center" style={{ padding: '60px 10%' }}>
        <h2>User Details</h2>
        <p>No user data found. Please log in.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center">
      <LogoandNaviBar/>
      <div className="card shadow containere" style={{ marginTop: "90px" }}>
        <h2 className="text-center mb-4">User Details</h2>
        <div className="table-responsive">
          <table className="table">
            <tbody>
              {Object.entries(user).map(([key, value]) => (
                key !== 'confirmPassword' && key !== 'id' && (
                  <tr key={key}>
                    <th className="text-end text-capitalize pe-3">{key.replace(/([A-Z])/g, ' $1')}:</th>
                    <td>{value}</td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-4">
          <button className="btn btn-warning me-3" onClick={() => navigate('/edit-form')}>Edit</button>
          <button className="btn btn-secondary me-3" onClick={() => navigate('/outer-search')}>Back</button>
          <button className="btn btn-danger" onClick={handleDeleteAccount}>Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
