package com.example.performance_management_system.user.model;

import com.example.performance_management_system.role.model.RoleEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(
        name = "users",
        indexes = {
                @Index(name = "idx_user_manager", columnList = "manager_id"),
                @Index(name = "idx_user_role", columnList = "role")
        }
)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password; // hashed later

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role", nullable = false)
    private RoleEntity role;

    @Column(name = "manager_id")
    private Long managerId; // for hierarchy (next step)

    private Boolean active = true;

    // getters & setters
}

