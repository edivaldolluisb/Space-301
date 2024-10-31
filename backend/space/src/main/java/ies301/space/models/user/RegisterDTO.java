package ies301.space.models.user;

public record RegisterDTO(String username, String password, UserRole role, String email) {
}
