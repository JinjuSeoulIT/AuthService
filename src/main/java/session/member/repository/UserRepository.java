package session.member.repository;


//JPA Repository (엔티티 기반)
import org.springframework.data.jpa.repository.JpaRepository;
import session.member.entity.UserEntity;

import java.util.Optional;


//DB랑 직접 대화하는 담당(DAO)
public interface UserRepository extends JpaRepository<UserEntity, Long> {


    //    save(entity) : INSERT/UPDATE
    //
    //    findById(id) : PK로 조회
    //
    //    findAll() : 전체 조회
    //
    //    deleteById(id) : 삭제
    //
    //    count() : 전체 개수
    //상속


}
