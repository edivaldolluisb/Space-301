package ies301.space.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ies301.space.entities.Company;
import ies301.space.repositories.CompanyRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    @Autowired
    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    // Retorna todas as empresas
    public List<Company> getEmpresas() {
        return companyRepository.findAll();
    }

    // Retorna uma empresa específica pelo ID
    public Optional<Company> getEmpresaById(Long id) {
        return companyRepository.findById(id);
    }

    // Cria uma nova empresa
    public Company createEmpresa(Company company) {
        return companyRepository.save(company);
    }

    // Atualiza os dados de uma empresa
    public Company updateEmpresa(Long id, Company companyDetails) {
        Optional<Company> companyOptional = companyRepository.findById(id);

        if (companyOptional.isPresent()) {
            Company company = companyOptional.get();

            // Atualiza os campos desejados
            if (companyDetails.getNome() != null) {
                company.setNome(companyDetails.getNome());
            }
            if (companyDetails.getEmail() != null) {
                company.setEmail(companyDetails.getEmail());
            }
            if (companyDetails.getEndereco() != null) {
                company.setEndereco(companyDetails.getEndereco());
            }

            return companyRepository.save(company); // Salva e retorna a empresa atualizada
        }
        return null; // Retorna null se a empresa não for encontrada
    }
}
