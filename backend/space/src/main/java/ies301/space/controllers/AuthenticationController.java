package ies301.space.controllers;


import ies301.space.infra.security.TokenService;
import ies301.space.models.user.AuthenticationDTO;
import ies301.space.models.user.LoginResponseDTO;
import ies301.space.models.user.RegisterDTO;
import ies301.space.models.user.User;
import ies301.space.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data) {

        // here I verify if the user exists in the database 😩

        var usernamepassword = new UsernamePasswordAuthenticationToken(data.username(), data.password());
        var authentication = this.authenticationManager.authenticate(usernamepassword);

        var token = tokenService.generateToken((User) authentication.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data) {
        if(this.userRepository.findByEmailAndUsername(data.email(), data.username()) != null) return ResponseEntity.badRequest().build();

        String encriptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.username(), data.password(), data.email(), data.role());

        this.userRepository.save(newUser);
        return ResponseEntity.ok().build();
    }
    

}
