package com.example.demo.Repo;

import com.example.demo.Entity.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface EmpleadoRepo extends JpaRepository<Empleado,Integer>
{
    Optional<Empleado> findOneByEmailAndPassword(String email, String password);
    Empleado findByEmail(String email);
}
