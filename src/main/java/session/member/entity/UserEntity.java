package session.member.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table (name = "member_user") //테이블 이름
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor


public class UserEntity {

//    @Id
//    @GeneratedValue
//            (strategy = GenerationType.IDENTITY)


    @Id

    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "member_user_seq_gen")
    @SequenceGenerator(
            name = "member_user_seq_gen",
            sequenceName = "MEMBER_USER_SEQ",
            allocationSize = 1  //호출용범위 (여기서 나중에 조절)
    )



    @Column(name = "user_id" )  //pk
    private Long userId;


    @Column(name = "login_id",nullable = false,unique= true )
    //FK
    private String loginId;       //nullable = false,unique= true = 필수입력해야한다 명령어


    @Column(name="login_type", nullable=false)
    private String loginType = "LOCAL";


//  @Column(name = "login_type")
//  private String loginType;     //나중에 JWT구현때 사용


    @Column(name = "password_hash" ,nullable = false)
    private String passwordHash;  //nullable = false,unique= true = 필수입력해야한다 명령어
    //같은 비밀번호를 쓰는 사람이 있으면(해시가 같아질 수 있음) 가입이 막힐 수 있어서 유닉은 제거


    //조인
     //상세부터 먼저 가져옴


//삭제는 db에 연관관게 CASCADE케이스로 처리해놨음

//    AuthenticationEntity 안에 있는 user 필드가 이 관계를 관리한다(=FK를 가진 주인이다)”



}
