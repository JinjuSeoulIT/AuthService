package session.member.mapstruct;


import common.mapper.EntityReqMapper;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import session.member.dto.membership.Request.AuthenticationRequestDTO;
import session.member.entity.AuthenticationEntity;


@Mapper(componentModel = "spring",
         unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberReqMapStruct extends EntityReqMapper<AuthenticationEntity, AuthenticationRequestDTO>
{
}
