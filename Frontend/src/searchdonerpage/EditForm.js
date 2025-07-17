import React, { useState, useEffect, useMemo } from 'react';
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import countryList from 'react-select-country-list';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LogoandNaviBar from '../Commonfiles/LogoandNaviBar';
import './EditForm.css';

const EditForm = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const [formData, setFormData] = useState({
    fullName: user.fullName || '',
    email: user.email || '',
    mobileNo: user.mobileNo || '',
    aadhaarNo: user.aadhaarNo || '',
    bloodGroup: user.bloodGroup || '',
    country: user.country || '',
    state: user.state || '',
    district: user.district || '',
    cityOrVillage: user.cityOrVillage || '',
    pinCode: user.pinCode || '',
    password: user.password || '',
    confirmPassword: user.password || '',
  });

  const [errors, setErrors] = useState({});
//   const [emailCheckStatus, setEmailCheckStatus] = useState('');

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
        if (!value) {
          error = 'Full Name is required';
        } else if (!/^[A-Za-z\s]*$/.test(value)) {
          error = 'Full Name should only contain alphabetic characters';
        }
        break;
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters long';
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
        break;
      case 'aadhaarNo':
        if (!value) {
          error = 'AADHAAR is required';
        } else if (value.length !== 12 || !/^\d{12}$/.test(value)) {
          error = 'AADHAAR must be exactly 12 digits';
        }
        break;
      case 'pinCode':
        if (!value) {
          error = 'PIN CODE is required';
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
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  // const handleChange = (e, phone) => {
  //   if (phone !== undefined) {
  //     setFormData(prev => ({ ...prev, mobileNo: phone }));
  //     validateField('mobileNo', phone);
  //   } else if (e && e.target) {
  //     const { name, value } = e.target;
  //     setFormData(prev => ({ ...prev, [name]: value }));
  //     validateField(name, value);
  //   }
    
  // };

  const handleSelectChange = selectedOption => {
    setFormData(prev => ({ ...prev, country: selectedOption.value }));
    validateField('country', selectedOption.value);
  };

  const handleBloodGroupChange = e => {
    setFormData(prev => ({ ...prev, bloodGroup: e.target.value }));
    validateField('bloodGroup', e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    Object.keys(formData).forEach(key => validateField(key, formData[key]));

    if (Object.values(errors).some(error => error)) {
      alert('Please fix the errors in the form before submitting.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8080/userdetails/update/${formData.email}`, formData);
      if (response.status === 200) {
        alert('Details updated successfully');
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/user-details');
      } else {
        alert('Error updating details. Please try again.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating details. Please try again.');
    }
  };

  return (
    <div>
      <LogoandNaviBar/>
    <div className="containere mt-5 margin" >
      <h2>Edit User Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
          {errors.fullName && <p className="error" style={{ color: 'red' }}>{errors.fullName}</p>}
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} disabled />
        </div>
        <div>
          <label>Mobile No</label>
          <PhoneInput country="eg" enableSearch={true} value={formData.mobileNo} onChange={phone => handleChange(null, phone)} />
          {errors.mobileNo && <p className="error" style={{ color: 'red' }}>{errors.mobileNo}</p>}
        </div>
        <div>
          <label>Aadhaar No</label>
          <input type="text" name="aadhaarNo" value={formData.aadhaarNo} disabled />
          {/* {errors.aadhaarNo && <p className="error" style={{ color: 'red' }}>{errors.aadhaarNo}</p>} */}
        </div>
        <div>
          <label>Blood Group</label>
          <select name="bloodGroup" value={formData.bloodGroup} onChange={handleBloodGroupChange} className="form-control">
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
          {errors.bloodGroup && <p className="error" style={{ color: 'red' }}>{errors.bloodGroup}</p>}
        </div>
        <div className="select-wrapper">
          <label>Country</label>
          <Select value={options.find(option => option.value === formData.country)} onChange={handleSelectChange} options={options} placeholder="Select a country" />
          {errors.country && <p className="error" style={{ color: 'red' }}>{errors.country}</p>}
        </div>
        <div>
          <label>State</label>
          <input type="text" name="state" value={formData.state} onChange={handleChange} />
          {errors.state && <p className="error" style={{ color: 'red' }}>{errors.state}</p>}
        </div>
        <div>
          <label>District</label>
          <input type="text" name="district" value={formData.district} onChange={handleChange} />
          {errors.district && <p className="error" style={{ color: 'red' }}>{errors.district}</p>}
        </div>
        <div>
          <label>City/Village</label>
          <input type="text" name="cityOrVillage" value={formData.cityOrVillage} onChange={handleChange} />
          {errors.cityOrVillage && <p className="error" style={{ color: 'red' }}>{errors.cityOrVillage}</p>}
        </div>
        <div>
          <label>Pin Code</label>
          <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} />
          {errors.pinCode && <p className="error" style={{ color: 'red' }}>{errors.pinCode}</p>}
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <p className="error" style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
          {errors.confirmPassword && <p className="error" style={{ color: 'red' }}>{errors.confirmPassword}</p>}
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
    </div>
  );
};

export default EditForm;
