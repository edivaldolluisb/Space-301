package ies301.space.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ies301.space.models.User;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByEmail(String email);
}
