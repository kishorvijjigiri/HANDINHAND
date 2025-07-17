import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'; // Make sure you have react-select installed
import countryList from 'react-select-country-list'; // Make sure you have react-select-country-list installed
import { Container } from 'react-bootstrap';
import LogoandNaviBar from '../Commonfiles/LogoandNaviBar'


const SearchDonar = (props) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        bloodGroup: '',
        country: '',
        state: '',
        district: '',
        cityOrVillage: '',
        pinCode: '',
    });
    const [errors, setErrors] = useState({
        bloodGroup: '',
        country: '',
        state: '',
        district: '',
        cityOrVillage: '',
        pinCode: '',
    });

    const { bloodGroup, country, state, district, cityOrVillage, pinCode } = formData;
    const options = useMemo(() => countryList().getData(), []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if ((name === 'state' || name === 'district' || name === 'cityOrVillage') && !/^[A-Za-z\s]*$/.test(value)) {
            return; // Ignore input if it contains non-alphabetic characters
        } else if (name === 'pinCode' && !/^\d*$/.test(value)) {
            return; // Ignore input if it contains non-numeric characters
        }

        setFormData({
            ...formData,
            [name]: value
        });
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'pinCode':
                if (!value) {
                    error = 'PIN Code is required';
                }
                break;
            case 'country':
                if (!value) {
                    error = 'Country is required';
                }
                break;
            case 'state':
                if (!value) {
                    error = 'State is required';
                }
                break;
            case 'district':
                if (!value) {
                    error = 'District is required';
                }
                break;
            case 'cityOrVillage':
                if (!value) {
                    error = 'City/Village is required';
                }
                break;
            case 'bloodGroup':
                if (!value) {
                    error = 'You must select your Blood Group';
                }
                break;
            default:
                break;
        }

        setErrors({
            ...errors,
            [name]: error
        });
    };

    const handleSelectChange = (selectedOption) => {
        setFormData({ ...formData, country: selectedOption.value });
        validateField('country', selectedOption.value);
    };

    const handleBloodGroupChange = (e) => {
        setFormData({ ...formData, bloodGroup: e.target.value });
        validateField('bloodGroup', e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields before submission
        validateField('country', country);
        validateField('state', state);
        validateField('district', district);
        validateField('cityOrVillage', cityOrVillage);
        validateField('pinCode', pinCode);
        validateField('bloodGroup', bloodGroup);

        if (country && state && district && cityOrVillage && pinCode && bloodGroup) {
            if (!errors.country && !errors.state && !errors.district && !errors.cityOrVillage && !errors.pinCode && !errors.bloodGroup) {
                try {
                    // Make a GET request to verify the data
                    const response = await axios.get('http://localhost:8080/userdetails/getAllUsers');
                
                    if (response.status === 200) {
                        const users = response.data;
                
                        // Normalize form data
                        const normalizedBloodGroup = bloodGroup.trim().toUpperCase();
                        const normalizedCountry = country.trim().toUpperCase();
                        const normalizedState = state.trim().toUpperCase();
                        const normalizedDistrict = district.trim().toUpperCase();
                        const normalizedCityOrVillage = cityOrVillage.trim().toUpperCase();
                        const normalizedPinCode = pinCode.trim(); // Ensure pinCode is a string
                
                        // Find the matching user
                        const matchedUsers = users.filter(user => {
                            return (user.bloodGroup || '').trim().toUpperCase() === normalizedBloodGroup &&
                                   (user.country || '').trim().toUpperCase() === normalizedCountry &&
                                   (user.state || '').trim().toUpperCase() === normalizedState &&
                                   (user.district || '').trim().toUpperCase() === normalizedDistrict &&
                                   (user.cityOrVillage || '').trim().toUpperCase() === normalizedCityOrVillage &&
                                   (String(user.pinCode) || '').trim() === normalizedPinCode;
                        });
                        
                        if (matchedUsers.length > 0) {
                            navigate('/donarsList', { state: { matchedUsers } });
                        } else {
                            navigate('/donarsList', { state: { noMatch: true } });
                        }
                        
                    } else {
                        alert('There was a problem fetching user details. Please try again.');
                    }
                } catch (error) {
                    console.error('Error submitting form:', error);
                    alert('There was an error processing your request. Please try again.');
                }
                
            } else {
                alert('Please check the errors before submitting the form');
            }
        } else {
            alert('All fields are required');
        }
    };

    return (
        <div style={{ ...props.style }}> 
            <Container>
                <LogoandNaviBar/>
        <div className="containere" style={{ marginTop: "80px" }}>
            <h2>Search Donor</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Blood Group</label>
                    <select
                        name="bloodGroup"
                        value={bloodGroup}
                        onChange={handleBloodGroupChange}
                        className="form-control">
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                    {errors.bloodGroup && <p style={{ color: 'red' }}>{errors.bloodGroup}</p>}
                </div>
                <div className="select-wrapper">
                    <label>Country</label>
                    <Select
                        value={options.find(option => option.value === country)}
                        onChange={handleSelectChange}
                        options={options}
                        placeholder="Select a country"
                    />
                    {errors.country && <p style={{ color: 'red' }}>{errors.country}</p>}
                </div>
                <div>
                    <label>State</label>
                    <input
                        type="text"
                        name="state"
                        value={state}
                        onChange={handleChange}
                        required
                    />
                    {errors.state && <p style={{ color: 'red' }}>{errors.state}</p>}
                </div>
                <div>
                    <label>District</label>
                    <input
                        type="text"
                        name="district"
                        value={district}
                        onChange={handleChange}
                        required
                    />
                    {errors.district && <p style={{ color: 'red' }}>{errors.district}</p>}
                </div>
                <div>
                    <label>City/Village</label>
                    <input
                        type="text"
                        name="cityOrVillage"
                        value={cityOrVillage}
                        onChange={handleChange}
                        required
                    />
                    {errors.cityOrVillage && <p style={{ color: 'red' }}>{errors.cityOrVillage}</p>}
                </div>
                <div>
                    <label>Pin Code</label>
                    <input
                        type="text"
                        name="pinCode"
                        value={pinCode}
                        onChange={handleChange}
                        required
                    />
                    {errors.pinCode && <p style={{ color: 'red' }}>{errors.pinCode}</p>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </Container>
        </div>
    );
};

export default SearchDonar;
