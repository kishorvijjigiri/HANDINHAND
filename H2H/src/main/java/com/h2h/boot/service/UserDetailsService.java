package com.h2h.boot.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.h2h.boot.model.UserDetails;
import com.h2h.boot.repository.UserDetailsRepository;

@Service
public class UserDetailsService {

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    public UserDetails saveUserDetails(UserDetails userDetails) {
        return userDetailsRepository.save(userDetails);
    }

    public UserDetails getUserByEmail(String email) {
        return userDetailsRepository.findByEmail(email);
    }

    public boolean isEmailRegistered(String email) {
        return userDetailsRepository.existsByEmail(email);
    }

    public UserDetails updateUserByEmail(String email, UserDetails updatedUserDetails) {
        Optional<UserDetails> existingUserOptional = Optional.ofNullable(userDetailsRepository.findByEmail(email));
        
        if (existingUserOptional.isPresent()) {
            UserDetails existingUser = existingUserOptional.get();
            existingUser.setFullName(updatedUserDetails.getFullName());
            existingUser.setMobileNo(updatedUserDetails.getMobileNo());
            existingUser.setAadhaarNo(updatedUserDetails.getAadhaarNo());
            existingUser.setBloodGroup(updatedUserDetails.getBloodGroup());
            existingUser.setCountry(updatedUserDetails.getCountry());
            existingUser.setState(updatedUserDetails.getState());
            existingUser.setDistrict(updatedUserDetails.getDistrict());
            existingUser.setCityOrVillage(updatedUserDetails.getCityOrVillage());
            existingUser.setPinCode(updatedUserDetails.getPinCode());
            existingUser.setPassword(updatedUserDetails.getPassword());
            existingUser.setConformPassword(updatedUserDetails.getConformPassword());
            
            return userDetailsRepository.save(existingUser);
        }
        return null; // Or throw an exception
    }

    public void deleteUserByEmail(String email) {
        userDetailsRepository.deleteByEmail(email);
    }

    public List<UserDetails> getAllUsers() {
        return userDetailsRepository.findAll();
    }

    public boolean authenticateUser(String email, String password) {
        UserDetails user = userDetailsRepository.findByEmail(email);
        
        if (user != null && user.getPassword().equals(password)) {
            return true; // User is authenticated
        } else {
            return false; // Invalid email or password
        }
    }
}
