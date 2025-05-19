package com.platform.freelance.dto;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class LoginUserDto {
    @Size(max = 255)
    private String email;

    @Size(max = 255)
    private String password;

}
