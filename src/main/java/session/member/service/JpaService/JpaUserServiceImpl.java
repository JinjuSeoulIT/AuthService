package session.member.service.JpaService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import session.member.dto.membership.Request.UserRequestDTO;
import session.member.entity.UserEntity;
import session.member.mapstruct.Request.UserReqMapStruct;
import session.member.repository.UserRepository;


@Service
@RequiredArgsConstructor
//jpa가 맵퍼 , 매칭

public class JpaUserServiceImpl implements JpaUserService {


    private final UserRepository userRepository;
    private final UserReqMapStruct userReqMapStruct;


    /// ///////////////////////////////////////////////////////////

    //회원가입 트랙잭션
    //추가 정보
    //새 엔티티는 영속성 컨텍스트에 없음 (그래서 이건 따로 수정이랑 달리 세이브포인트로 만들어 놓음)
    @Override
    @Transactional
    public Long createLoginId(UserRequestDTO userReq,           //평문 ID/PW 입력용
//                                         AuthenticationRequestDTO authReq, //상세 입력용 (이전 회원가입 지금은 필요없음)
                              String passwordHash) {            //비밀번호 해시
        //아이디 맵스테이트 (여기부터 ID/PW/ 트랙잭션처리)
        UserEntity user = userReqMapStruct.toEntity(userReq);
        // 1) user 맵스테이트를 처리했기때문에 따로 겟을 안불러옴
//        user.setLoginId(userReq.getLoginId());
        user.setPasswordHash(passwordHash); //비밀번호 헤시저장

//        user.setLoginType("LOCAL"); // ✅ 이거 반드시
        // 1) 먼저 user 저장 (login_id 확실히 DB에 들어감)
        UserEntity savedUser = userRepository.save(user);
        //여기까지 저장후  뒤에 만약 실패하면 롤백
/////////////////////////////////////////////////////////////////////////////////////////////////
        //상세구현시  여기서부터 시작 //
        //상세정보 맵스테이트 (여기부터 상세정보 트랙잭션처리)
//        AuthenticationEntity auth = authenticationReqMapStruct.toEntity(authReq);
        //초기구상 맵스테이트 없을때
//        auth.setRealName(req.getRealName());
//        auth.setPhone(req.getPhone());
//        auth.setEmail(req.getEmail());
//        auth.setBirthDate(req.getBirthDate());
//        auth.setSex(req.getSex());
//        auth.setZipCode(req.getZipCode());
//        auth.setAddress1(req.getAddress1());
//        auth.setAddress2(req.getAddress2());
//        auth.setNationCode(req.getNationCode());
        // 3) FK 주인(auth)에 저장된 user 연결
//        auth.setUser(savedUser);
//        // (양방향이면 권장)
//        savedUser.setAuthenticationEntity(auth);
//        //이 한 줄로 UserEntity까지 자동 저장
//
//        // 4)AuthenticationEntity.user 관계에 cascade = PERSIST or ALL이 정확히 걸려 있어서 동시저장가능
//        authenticationRepository.save(auth);
        //그후 유저아이디도 저장 (유저테이블에도 연관관계이용)
        return savedUser.getUserId();
    }
}

//
//    //수정 정보  (지금은 상세만 구현)
//    @Transactional
//    @Override
//    public void updateAuthentication(Long userId, AuthenticationRequestDTO authReq) {
//
//        //레포메서드에서 가져옴
//        AuthenticationEntity auth = authenticationRepository.findOneByUser_UserId(userId);
//        if (auth == null) {
//            throw new RuntimeException("회원정보가 없습니다." + userId);
//        }
//
//        authenticationReqMapStruct.updateEntity(authReq, auth);
//    }
//
//
//
////        //삭제
////        @Transactional
////        @Override
////        public void deleteUser (Long userId){
////
////        // 1) 인증(자식) 먼저 삭제 (FK 끊기)
////        authenticationRepository.deleteById(userId);
////
////        // 2) 유저(부모) 삭제
////        userRepository.deleteById(userId);
//
//    }
//
//    }












//트랙잭선 정리//
//“FK 주인(auth)에 user를 박아라. user 쪽 set만 하면 FK 안 들어가서 깨진다.”
//“insertUser 1개 + insertAuthentication 1개” 를 JPA에선 어떻게 처리?
//JPA에선 보통 두 가지 패턴 중 하나로 가.
//
//A안) 서비스 메서드 1개로 묶어서 한 번에 처리 (지금 너 코드 방향)
//
//signupWithAuthentication() 하나에서
//
//User 만들고
//
//Authentication 만들고
//
//연관관계 세팅하고
//
//save() 한 번(또는 두 번) 호출
//
//이게 현업에서도 제일 흔함. (회원가입은 “한 유스케이스”)