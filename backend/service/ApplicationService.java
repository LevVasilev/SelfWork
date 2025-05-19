package com.platform.freelance.service;

import com.platform.freelance.model.Application;
import com.platform.freelance.dto.ApplicationDetailsDto;
import com.platform.freelance.repos.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class ApplicationService {
    @Autowired
    private ApplicationRepository applicationRepository;

    public Application applyToJob(@RequestBody Application application) {
        return applicationRepository.save(application);
    }

    public List<Application> getApplicationsByUser(Long userId) {
        return applicationRepository.findBySeekerId(userId);
    }

    public List<ApplicationDetailsDto> getAllApplicationDetails() {
        return applicationRepository.findAllApplicationDetails();
    }
}
