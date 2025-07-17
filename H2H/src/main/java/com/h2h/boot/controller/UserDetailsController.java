package com.h2h.boot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.h2h.boot.model.UserDetails;
import com.h2h.boot.service.UserDetailsService;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/userdetails")
public class UserDetailsController {

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/save")
    public ResponseEntity<UserDetails> saveUser(@RequestBody UserDetails userDetails) {
        UserDetails savedUser = userDetailsService.saveUserDetails(userDetails);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/get/{email}")
    public ResponseEntity<UserDetails> getUserByEmail(@PathVariable String email) {
        UserDetails user = userDetailsService.getUserByEmail(email);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    @PutMapping("/update/{email}")
    public ResponseEntity<UserDetails> updateUserByEmail(@PathVariable String email, @RequestBody UserDetails updatedUserDetails) {
        UserDetails updatedUser = userDetailsService.updateUserByEmail(email, updatedUserDetails);
        return updatedUser != null ? ResponseEntity.ok(updatedUser) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{email}")
    public ResponseEntity<Void> deleteUserByEmail(@PathVariable String email) {
        userDetailsService.deleteUserByEmail(email);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/check-email/{email}")
    public ResponseEntity<Boolean> checkEmail(@PathVariable("email") String email) {
        boolean exists = userDetailsService.isEmailRegistered(email);
        return ResponseEntity.ok(exists);
    }


    @GetMapping("/getAllUsers")
    public ResponseEntity<List<UserDetails>> getAllUsers() {
        List<UserDetails> users = userDetailsService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDetails loginDetails) {
        boolean isAuthenticated = userDetailsService.authenticateUser(loginDetails.getEmail(), loginDetails.getPassword());

        if (isAuthenticated) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
}
