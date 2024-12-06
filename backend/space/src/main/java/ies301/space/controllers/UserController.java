package ies301.space.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ies301.space.entities.user.User;
import ies301.space.services.UserService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
// @CrossOrigin(origins = "*")
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getUser(){
        return ResponseEntity.ok(userService.getUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<User> updateUser(
        @PathVariable("id") String id,
        @RequestBody Map<String, Object> userDetails) {

            User existingUser = userService.updateUser(id, userDetails);

            if (existingUser != null) {
                return ResponseEntity.ok(existingUser);
            } else {
                return ResponseEntity.notFound().build();
            }
        }
}
