package ies301.space.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.crypto.password.PasswordEncoder;
import ies301.space.entities.user.User;
import ies301.space.services.UserService;

import java.util.List;
import ies301.space.dto.UserResponseDTO;

import ies301.space.entities.user.UserRole;


@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;

    private final PasswordEncoder passwordEncoder;

    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<UserResponseDTO> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable String id) {
        UserResponseDTO user = userService.findUserById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    
    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@RequestBody User user) {
        if (user.getRole() == null) {
            user.setRole(UserRole.USER);
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        UserResponseDTO createdUser = userService.saveUser(user);
        return ResponseEntity.ok(createdUser);
    }

    
    @PatchMapping("/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(
            @PathVariable String id,
            @RequestBody User updatedUser) {

        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            
            updatedUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }
        
        // if (updatedUser.getRole() == null) {
        //     updatedUser.setRole(UserRole.USER);
        // }
        
        UserResponseDTO user = userService.updateUser(id, updatedUser);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        boolean deleted = userService.deleteUser(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
