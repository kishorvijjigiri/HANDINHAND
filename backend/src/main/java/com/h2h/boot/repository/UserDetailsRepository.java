package com.h2h.boot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.h2h.boot.model.UserDetails;

@Repository
public interface UserDetailsRepository extends JpaRepository<UserDetails, Long> {
    UserDetails findByEmail(String email);
    void deleteByEmail(String email);
    boolean existsByEmail(String email);
}
