package ies301.space.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ies301.space.entities.user.User;
import ies301.space.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Retorna todas as Users
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    // Retorna uma User específica pelo ID
    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    // Cria uma nova User
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // Atualiza os dados de uma User
    @Transactional
    public User updateUser(User userDetails) {
        Optional<User> userOptional = userRepository.findById(userDetails.getId());

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (userDetails.getName() != null) {
                user.setName(userDetails.getName());
            }
            if (userDetails.getEmail() != null) {
                user.setEmail(userDetails.getEmail());
            }
            if (userDetails.getAddress() != null) {
                user.setAddress(userDetails.getAddress());
            }
            User savedUser = userRepository.save(user);
            userRepository.flush();
            return savedUser;
        }

        return null;
    }
}
