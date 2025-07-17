import React from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';
import LogoandNaviBar from '../Commonfiles/LogoandNaviBar';

const DonarsList = () => {
    const location = useLocation();
    const { matchedUsers, noMatch } = location.state || {};
    const navigate = useNavigate();
    const handleBack = () => {
        // Clear all stored data
        localStorage.clear();
        sessionStorage.clear();
      
        // Redirect to login (Page 1) and prevent back navigation
        window.location.replace('/search');
      };

    return (
        <div>
        
            <LogoandNaviBar/>
            <Container style={{marginTop:"90px"}}>
        <div>
            {noMatch ? (
                <div className="text-center" style={{color:"red"}}>
                    <h2>No donors matched for your search.</h2>
                    <p style={{textAlign:'center'}}>Please try searching in the nearest cities.</p>
                </div>
            ) : (
                <div>
                    <h2>Matched Donors</h2>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Full Name</th>
                                <th>Phone Number</th>
                                <th>Blood Group</th>
                                <th>Country</th>
                                <th>State</th>
                                <th>District</th>
                                <th>City or Village</th>
                                <th>Pin Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matchedUsers.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.fullName}</td>
                                    <td>{user.mobileNo}</td>
                                    <td>{user.bloodGroup}</td>
                                    <td>{user.country}</td>
                                    <td>{user.state}</td>
                                    <td>{user.district}</td>
                                    <td>{user.cityOrVillage}</td>
                                    <td>{user.pinCode}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="row justify-content-center mt-4">
        <div className="col-md-4 text-center">
          <button className="btn btn-danger" onClick={handleBack}>Back</button>
        </div>
      </div>
                </div>
            )}
        </div>
        </Container>
        </div>
    );
};

export default DonarsList;
