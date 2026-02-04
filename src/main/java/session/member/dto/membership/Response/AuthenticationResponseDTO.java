package session.member.controller.SecurityController.Response;

import  session.member.dto.Authentication.Response;


import lombok.Data;

import java.time.LocalDate;

@Data
public class AuthenticationResponseDTO {


    private long authenticationId;
    private long userId;
    private String realName;
    private String phone;
    private String email;
    private LocalDate birthDate;
    private String sex;
    private String nationCode;
}