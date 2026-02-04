package session.member.mapstruct.Response;

import common.mapper.EntityResMapper;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import session.member.dto.membership.Response.UserResponseDTO;
import session.member.entity.UserEntity;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserResMapStruct extends EntityResMapper<UserEntity, UserResponseDTO>
{

}
