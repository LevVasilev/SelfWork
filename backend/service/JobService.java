package com.platform.freelance.service;

import com.platform.freelance.model.Job;
//import com.platform.freelance.model.JobDto;
import com.platform.freelance.dto.JobCreateDTO;
import com.platform.freelance.repos.JobRepository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;


@Service
public class JobService {
    private final JobRepository jobRepository;

    public JobService(final JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public List<Job> allJobs() {
        List<Job> jobs = new ArrayList<>();
        jobRepository.findAll().forEach(jobs::add);
        return jobs;
    }

    public Job addJob(JobCreateDTO jobCreateDTO) {
        Job job = new Job();
        job.setTitle(jobCreateDTO.getTitle());
        job.setDescription(jobCreateDTO.getDescription());
        job.setCompanyName(jobCreateDTO.getCompanyName());
        job.setSalary(jobCreateDTO.getSalary());

        return jobRepository.save(job);
    }
}
