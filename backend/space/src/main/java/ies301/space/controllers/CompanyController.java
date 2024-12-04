package ies301.space.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ies301.space.entities.Company;
import ies301.space.services.CompanyService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/company")
public class CompanyController {

    private final CompanyService companyService;

    // Injeta o CompanyService no Controller
    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    // Retorna todas as empresas
    @GetMapping
    public List<Company> getEmpresas() {
        return companyService.getEmpresas();
    }

    // Retorna uma empresa específica pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<Company> getEmpresaById(@PathVariable Long id) {
        Optional<Company> company = companyService.getEmpresaById(id);
        return company.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }

    // Cria uma nova empresa
    @PostMapping
    public ResponseEntity<Company> createEmpresa(@RequestBody Company company) {
        Company savedCompany = companyService.createEmpresa(company);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCompany);
    }

    // Atualiza os dados de uma empresa
    @PutMapping("/{id}")
    public ResponseEntity<Company> updateEmpresa(
            @PathVariable Long id,
            @RequestBody Company companyDetails) {

        Company updatedCompany = companyService.updateEmpresa(id, companyDetails);

        if (updatedCompany != null) {
            return ResponseEntity.ok(updatedCompany);
        } else {
            return ResponseEntity.notFound().build(); // Se a empresa não foi encontrada
        }
    }
}
