package com.example.demo.config;

import com.example.demo.repositories.CredentialsRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(CredentialsRepository credentialsRepository) {
        return new CustomUserDetailsService(credentialsRepository);
    }

    @Bean
    public AuthenticationManager authenticationManager(UserDetailsService userDetailsService,
                                                       PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder);
        return new ProviderManager(authenticationProvider);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests((authorize) -> authorize.requestMatchers("/login")
                                                           .permitAll()
                                                           .requestMatchers("/register")
                                                           .permitAll()
                                                             .requestMatchers("/staff")
                                                            .permitAll()
                                                           .requestMatchers("/manager/**")
                                                           .hasAuthority("MANAGER")
                                                            .requestMatchers("/staff/**")
                                                            .hasAuthority("STAFF")
                                                           .requestMatchers("/profile")
                                                           .hasAnyAuthority("STAFF", "USER", "MANAGER")
                                                           .anyRequest()
                                                           .authenticated())
            .httpBasic(Customizer.withDefaults());
        return http.build();
    }
}
