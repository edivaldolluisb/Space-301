package ies301.space.dto;

import ies301.space.entities.user.UserRole;

public record ResponseDTO (String name, String token, String id, UserRole role) {
}
