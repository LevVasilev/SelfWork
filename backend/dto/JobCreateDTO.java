package com.platform.freelance.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.platform.freelance.model.User;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobCreateDTO {
    private User creator;
    private String title;
    private String description;
    private String companyName;
    private String salary;
}