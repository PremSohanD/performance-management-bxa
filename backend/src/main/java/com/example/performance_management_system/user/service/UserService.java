package com.example.performance_management_system.user.service;

import com.example.performance_management_system.common.exception.BusinessException;
import com.example.performance_management_system.user.model.User;
import com.example.performance_management_system.user.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public User getByUsername(String username) {
        return repository.findByUsername(username)
                .orElseThrow(() -> new BusinessException("User not found"));
    }

    public User getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new BusinessException("User not found"));
    }

}

