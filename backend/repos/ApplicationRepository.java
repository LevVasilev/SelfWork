package com.platform.freelance.repos;

import com.platform.freelance.model.Application;
import com.platform.freelance.dto.ApplicationDetailsDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByJobId(Long jobId);
    List<Application> findBySeekerId(Long seekerId);

    @Query("SELECT new com.platform.freelance.dto.ApplicationDetailsDto(j.companyName, j.title, u.name, u.skills) " +
            "FROM Application a " +
            "JOIN a.job j " +
            "JOIN a.seeker u")
    List<ApplicationDetailsDto> findAllApplicationDetails();
}