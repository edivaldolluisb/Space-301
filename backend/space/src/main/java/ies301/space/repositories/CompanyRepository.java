package ies301.space.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ies301.space.entities.Company;

public interface CompanyRepository extends JpaRepository<Company, Long> {
}

