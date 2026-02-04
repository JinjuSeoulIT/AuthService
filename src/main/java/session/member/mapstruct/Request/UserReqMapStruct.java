package session.member.mapstruct.Request;


import common.mapper.EntityReqMapper;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import session.member.dto.membership.Request.UserRequestDTO;
import session.member.entity.UserEntity;


@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserReqMapStruct extends EntityReqMapper<UserEntity, UserRequestDTO>
{
}
