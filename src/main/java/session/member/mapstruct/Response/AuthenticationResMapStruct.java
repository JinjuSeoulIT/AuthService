package session.member.mapstruct;

import common.mapper.EntityResMapper;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import session.member.dto.membership.Response.AuthenticationResponseDTO;
import session.member.dto.membership.Response.UserResponseDTO;
import session.member.entity.AuthenticationEntity;

@Mapper(componentModel = "spring",
unmappedTargetPolicy = ReportingPolicy.IGNORE)

public interface MemberResMapStruct extends EntityResMapper<AuthenticationEntity,
        AuthenticationResponseDTO
,AuthenticationResponseDTO, UserResponseDTO>

        {



}
