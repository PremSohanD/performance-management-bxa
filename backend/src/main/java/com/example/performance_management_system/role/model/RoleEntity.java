package com.example.performance_management_system.role.model;

import jakarta.persistence.*;

@Entity
@Table(name = "role")
public class RoleEntity {

    @Id
    @Enumerated(EnumType.STRING)
    private com.example.performance_management_system.common.enums.Role name;

    public RoleEntity() {}

    public RoleEntity(com.example.performance_management_system.common.enums.Role name) {
        this.name = name;
    }

    public com.example.performance_management_system.common.enums.Role getName() {
        return name;
    }
}
