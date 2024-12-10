package ies301.space.services;

import ies301.space.entities.user.User;
import ies301.space.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import ies301.space.dto.UserResponseDTO;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserResponseDTO> findAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserResponseDTO(user.getId(), user.getName(), user.getEmail()))
                .collect(Collectors.toList());
    }

    public UserResponseDTO findUserById(String id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            return null;
        }
        User user = userOptional.get();
        return new UserResponseDTO(user.getId(), user.getName(), user.getEmail());
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public UserResponseDTO updateUser(String id, User updatedUser) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            return null;
        }
        User existingUser = userOptional.get();
        if (updatedUser.getName() != null) {
            existingUser.setName(updatedUser.getName());
        }
        if (updatedUser.getEmail() != null) {
            existingUser.setEmail(updatedUser.getEmail());
        }
        if (updatedUser.getPassword() != null) {
            existingUser.setPassword(updatedUser.getPassword());
        }

        User savedUser = userRepository.save(existingUser);
        return new UserResponseDTO(savedUser.getId(), savedUser.getName(), savedUser.getEmail());
    }

    public boolean deleteUser(String id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}