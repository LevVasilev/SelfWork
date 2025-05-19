package com.platform.freelance.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@Configuration
@EntityScan("com.platform.freelance.model")
@EnableJpaRepositories("com.platform.freelance.repos")
@EnableTransactionManagement
public class DomainConfig {
}
