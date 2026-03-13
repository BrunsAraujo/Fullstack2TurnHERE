package com.turnhere.fullstack2.dto;

// DTO for capturing admin registration form data from the frontend
public class AdminRegistrationRequest {
    private String username;
    private String password;
    private String email;
    private String adminSecretKey; // Secret key required to authorize admin account creation

    // Constructors
    public AdminRegistrationRequest() {}

    public AdminRegistrationRequest(String username, String password, String email, String adminSecretKey) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.adminSecretKey = adminSecretKey;
    }

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAdminSecretKey() {
        return adminSecretKey;
    }

    public void setAdminSecretKey(String adminSecretKey) {
        this.adminSecretKey = adminSecretKey;
    }
}