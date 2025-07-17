import React, { useMemo, useState } from 'react';
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import countryList from 'react-select-country-list';
import './Register.css'; // Import the CSS file
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = ({ onSelectChange },props) => {
    const [emailCheckStatus, setEmailCheckStatus] = useState('');
    const [aadhaarCheckStatus, setAadhaarCheckStatus] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNo: '',
    aadhaarNo: '',
    bloodGroup: '',
    country: '',
    state: '',
    district: '',
    cityOrVillage: '',
    pinCode: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    mobileNo: '',
    aadhaarNo: '',
    bloodGroup: '',
    country: '',
    state: '',
    district: '',
    cityOrVillage: '',
    pinCode: '',
    password: '',
    confirmPassword: '',
  });

  const { fullName, email, mobileNo, aadhaarNo, bloodGroup, country, state, district, cityOrVillage, pinCode, password, confirmPassword } = formData;

  // Options for the select component
  const options = useMemo(() => countryList().getData(), []);

  const handleChange = (e, phone) => {
    if (phone !== undefined) {
      // This handles the phone input from react-phone-input-2
      setFormData({ ...formData, mobileNo: phone });
    } else if (e && e.target) {
      // This handles regular form fields
      const { name, value } = e.target;
      
      // Enforce password length restriction
      if ((name === 'password' || name === 'confirmPassword') && value.length > 8) {
        return; // Ignore input if it exceeds the limit
      }
      if ((name === 'fullName'|| name === 'state'|| name === 'district'|| name === 'cityOrVillage') && !/^[A-Za-z\s]*$/.test(value)) {
        return; // Ignore input if it contains non-numeric characters
      }
      if((name==='aadhaarNo') && value.length>12 ){
        return;
      }else if((name==='aadhaarNo'|| name==='pinCode')&& !/^\d*$/.test(value)){
        return;
      }

      setFormData({
        ...formData,
        [name]: value
      });
      validateField(name, value);
    }
  };
  const checkEmailUniqueness = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8080/userdetails/check-email/${email}`);
      if (response.data) {
        alert('Email is already registered');
        setEmailCheckStatus('Email is already registered');
        return false; // Email is already registered
      } else {
        setEmailCheckStatus('');
        return true; // Email is unique
      }
    } catch (error) {
      console.error('Error checking email uniqueness:', error.response || error.message);
      setEmailCheckStatus('Error checking email uniqueness. Please try again.');
      return false; // Treat as duplicate in case of error
    }
  };
  const checkAadhaarUniqueness = async (aadhaarNo) => {
    try {
        const response = await axios.get(`http://localhost:8080/userdetails/check-aadhaar/${aadhaarNo}`);
        if (response.data) {
            alert('Aadhaar is already registered');
            setAadhaarCheckStatus('Aadhaar is already registered'); // Assuming you have a state for Aadhaar status
            return false;
        } else {
            setAadhaarCheckStatus('');
            return true;
        }
    } catch (error) {
        console.error('Error checking Aadhaar uniqueness:', error.response || error.message);
        setAadhaarCheckStatus('Error checking Aadhaar uniqueness. Please try again.');
        return false;
    }
};
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          error = 'Email is required';
        } else if (!emailRegex.test(value)) {
          error = 'Invalid email format';
        }
        break;
      case 'fullName':
        const nameRegex = /^[A-Za-z\s]*$/;
        if (!value){
            console.log('Input is valid');
          } else if(!nameRegex.test(value)) {
            console.log('Input should only contain alphabetic characters');
          }
        break;
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters long';
        }
        break;
      case 'aadhaarNo':
        const aadharRegex=/^\d*$/;
        if (!value) {
          error = 'AADHAAR is required';
        } else if (value.length !== 12) {
          error = 'AADHAAR must be 12 digits long';
        }else if (!aadharRegex.test(value)) {
          error = 'AADHAAR must be in digits';
        }
        break;
      case 'confirmPassword':
        if (!value) {
          error = 'Confirm Password is required';
        } else if (value !== formData.password) {
          error = 'Passwords do not match';
        }
        break;
      case 'mobileNo':
        if (!value) {
          error = 'Mobile number is required';
        } 
        else if (!/^\d{10}$/.test(value)) {
          error = 'Mobile number must be exactly 10 digits';
        }
        break;
      case 'pinCode':
        if (!value) {
          error = 'PIN CODE is required';
        } 
        break;
      case 'state':
        if (!value) {
          error = 'state is required';
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
    if (onSelectChange) {
      onSelectChange(selectedOption); // Call the parent function if defined
    }
  };

  const handleBloodGroupChange = (e) => {
    setFormData({ ...formData, bloodGroup: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateField('email', email);
    validateField('password', password);
    validateField('confirmPassword', confirmPassword);
    validateField('fullName', fullName);
    validateField('country', country);
    validateField('state', state);
    validateField('district', district);
    validateField('cityOrVillage', cityOrVillage);
    validateField('pinCode', pinCode);
    validateField('bloodGroup', bloodGroup);
    validateField('aadhaarNo', aadhaarNo);
  
    if (email && password && confirmPassword && mobileNo && fullName && country && state && district && cityOrVillage && pinCode && bloodGroup && aadhaarNo) {
      if (!errors.email && !errors.password && !errors.confirmPassword && !errors.mobileNo && !errors.fullName && !errors.country && !errors.state && !errors.district && !errors.cityOrVillage && !errors.pinCode && !errors.bloodGroup && !errors.aadhaarNo) {
        const isEmailUnique = await checkEmailUniqueness(email);
        const isAadhaarUnique = await checkAadhaarUniqueness(aadhaarNo);
        if (isEmailUnique && isAadhaarUnique) {
          try {
            const response = await axios.post('http://localhost:8080/userdetails/save', formData);
            if (response.status === 200) {
              alert('Form Submitted Successfully, if you want to search for donar go to Search Oner page');
              setFormData({fullName: '',
                email: '',
                mobileNo: '',
                aadhaarNo: '',
                bloodGroup: '',
                country: '',
                state: '',
                district: '',
                cityOrVillage: '',
                pinCode: '',
                password: '',
                confirmPassword: '' });
            } else {
              alert('There was a problem submitting the form. Please try again.');
            }
          } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting the form. Please try again.');
          }
        } else {
          alert(emailCheckStatus && aadhaarCheckStatus); // Show email uniqueness error message
        }
      } else {
        alert('Please check the errors before submitting the form');
      }
    } else {
      alert('All fields are required');
    }
  };
  

  return (
    <div  style={{marginTop:"70px" }}>
        <div className='note'>
        Note: "To donate blood, please complete the form below and register. You will be contacted by those in need."</div>
    <div className="containere">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={fullName}
            onChange={handleChange}
            required
          />
          {errors.fullName && <p className='error' style={{ color: 'red' }}>{errors.fullName}</p>}
        </div>
        <div>
  <label>Email</label>
  <input
    type="email"
    name="email"
    value={email}
    onChange={handleChange}
    required
  />
  {errors.email && <p className='error' style={{ color: 'red'}}>{errors.email}</p>}
  {emailCheckStatus && <p  className='error' style={{ color: 'red'  }}>{emailCheckStatus}</p>}
</div>
        <div>
          <label>Mobile No</label>
          <div className='phone'>
            <PhoneInput 
              country="eg"
              enableSearch={true}
              value={mobileNo}
              onChange={(phone) => handleChange(null, phone)}
            />
            {errors.mobileNo && <p className='error' style={{ color: 'red' }}>{errors.mobileNo}</p>}
          </div>
        </div>
        <div>
          <label>Aadhaar No</label>
          <input
            type="text"
            name="aadhaarNo"
            value={aadhaarNo}
            onChange={handleChange}
            required
          />
          {errors.aadhaarNo && <p className='error' style={{ color: 'red' }}>{errors.aadhaarNo}</p>}
          {aadhaarCheckStatus && <p  className='error' style={{ color: 'red'  }}>{aadhaarCheckStatus}</p>}
        </div>
        <div> 
          <label>Blood Group</label>
          <select
            name="bloodGroup"
            value={bloodGroup}
            onChange={handleBloodGroupChange}
            className="form-control"
          >
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
          {errors.bloodGroup && <p className='error' style={{ color: 'red' }}>{errors.bloodGroup}</p>}
        </div>
        <div className="select-wrapper">
          <label>Country</label>
          <Select
            value={options.find(option => option.value === country)}
            onChange={handleSelectChange}
            options={options}
            placeholder="Select a country"
          />
          {errors.country && <p className='error' style={{ color: 'red' }}>{errors.country}</p>}
        </div>
        <div>
          <label>State</label>
          <input
            type="text"
            name="state"
            value={state}
            onChange={handleChange}
            required
          />{errors.state && <p className='error' style={{ color: 'red' }}>{errors.state}</p>}
        </div>
        <div>
          <label>District</label>
          <input
            type="text"
            name="district"
            value={district}
            onChange={handleChange}
            required
          />{errors.district && <p className='error' style={{ color: 'red' }}>{errors.district}</p>}
        </div>
        <div>
          <label>City/Village</label>
          <input
            type="text"
            name="cityOrVillage"
            value={cityOrVillage}
            onChange={handleChange}
            required
          />{errors.cityOrVillage && <p className='error' style={{ color: 'red' }}>{errors.cityOrVillage}</p>}
        </div>
        <div>
          <label>Pin Code</label>
          <input
            type="text"
            name="pinCode"
            value={pinCode}
            onChange={handleChange}
            required
          />{errors.pinCode && <p className='error' style={{ color: 'red' }}>{errors.pinCode}</p>}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
           {errors.password && <p className='error' style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <p className='error' style={{ color: 'red' }}>{errors.confirmPassword}</p>}
        </div>
        <button type="submit">Register</button>
      </form>
      <p className="account">Don't have an account? 
                <Link to="/searchdonar">
                    <button className="btn btn-link">Login</button>
                </Link>
            </p>
    </div>
    </div>
  );
};

export default Register;
