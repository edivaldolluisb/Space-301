package ies301.space.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ies301.space.models.user.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<User, Long> {
    UserDetails findByEmail(String email); // usado para auth
    UserDetails findByUsername(String username); // usado para auth

    // find by email and username
    UserDetails findByEmailAndUsername(String email, String username);

}
