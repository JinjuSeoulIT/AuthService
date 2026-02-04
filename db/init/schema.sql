-- 01_schema.sql
-- 목적: XEPDB1에서 MEMBER 유저/테이블/시퀀스를 "처음 실행/재실행" 모두 안전하게 생성


ALTER SESSION SET CONTAINER = XEPDB1;

-- MEMBER 유저 생성 + 권한 부여(이미 있으면 스킵)
DECLARE
v_cnt NUMBER;

BEGIN
SELECT COUNT(*) INTO v_cnt FROM dba_users WHERE username = 'MEMBER';

IF v_cnt = 0 THEN
    EXECUTE IMMEDIATE 'CREATE USER MEMBER IDENTIFIED BY "1234"';
EXECUTE IMMEDIATE 'GRANT CONNECT, RESOURCE TO MEMBER';

-- 테이블스페이스 이름이 환경마다 달라서 quota는 안전하게 생략(필요하면 나중에 추가)
-- EXECUTE IMMEDIATE 'ALTER USER MEMBER QUOTA UNLIMITED ON USERS';
END IF;
END;
/
-- DDL 실행 스키마를 MEMBER로 고정(권장)
ALTER SESSION SET CURRENT_SCHEMA = MEMBER;





--초기단계에선 이건 필요없음--

--CREATE SEQUENCES (있으면 재사용) ---------------------------------------------------------

BEGIN
EXECUTE IMMEDIATE 'DROP TABLE MEMBER.MEMBER_AUTHENTICATION CASCADE CONSTRAINTS';
EXCEPTION
  WHEN OTHERS THEN
    IF SQLCODE != -942 THEN RAISE; END IF;
END;
/

BEGIN
EXECUTE IMMEDIATE 'DROP TABLE MEMBER.MEMBER_USER CASCADE CONSTRAINTS';
EXCEPTION
  WHEN OTHERS THEN
    IF SQLCODE != -942 THEN RAISE; END IF;
END;
/
-------------------------------------------------------------------------------------------







-- ====== CREATE (시퀀스) ====================================================================

BEGIN
EXECUTE IMMEDIATE 'DROP SEQUENCE MEMBER.MEMBER_USER_SEQ';
EXCEPTION WHEN OTHERS THEN
  IF SQLCODE != -2289 THEN RAISE; END IF;  --실패 예외처리
END;
/
CREATE SEQUENCE MEMBER.MEMBER_USER_SEQ
    START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;
/

BEGIN
EXECUTE IMMEDIATE 'DROP SEQUENCE MEMBER.MEMBER_AUTH_SEQ';
EXCEPTION WHEN OTHERS THEN
  IF SQLCODE != -2289 THEN RAISE; END IF; --실패 예외처리
END;
/
CREATE SEQUENCE MEMBER.MEMBER_AUTH_SEQ
    START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;
/
--=======================================================================================================



-- ====== TABLES ======
CREATE TABLE MEMBER.MEMBER_USER (
                                    USER_ID        NUMBER               NOT NULL,
                                    LOGIN_ID       VARCHAR2(50 BYTE)    NOT NULL,
                                    LOGIN_TYPE     VARCHAR2(20 BYTE)    DEFAULT 'LOCAL' NOT NULL,
                                    PASSWORD_HASH  VARCHAR2(255 BYTE)   NOT NULL,
                                    CREATED_AT     DATE                 DEFAULT SYSDATE NOT NULL,
                                    UPDATED_AT     DATE                 DEFAULT SYSDATE NOT NULL,
                                    CONSTRAINT PK_MEMBER_USER PRIMARY KEY (USER_ID),
                                    CONSTRAINT UQ_MEMBER_USER_LOGIN_ID UNIQUE (LOGIN_ID)
);

CREATE TABLE MEMBER.MEMBER_AUTHENTICATION (
                                              AUTHENTICATION_ID  NUMBER              NOT NULL,
                                              USER_ID            NUMBER              NOT NULL,
                                              REAL_NAME          VARCHAR2(50 BYTE)   NOT NULL,
                                              PHONE              VARCHAR2(20 BYTE)   NOT NULL,
                                              EMAIL              VARCHAR2(100 BYTE)  NOT NULL,
                                              BIRTH_DATE         DATE                NULL,
                                              SEX                VARCHAR2(10 BYTE)   NULL,
                                              ZIP_CODE           VARCHAR2(10 BYTE)   NOT NULL,
                                              ADDRESS1           VARCHAR2(200 BYTE)  NOT NULL,
                                              ADDRESS2           VARCHAR2(200 BYTE)  NULL,
                                              NATION_CODE        VARCHAR2(10 BYTE)   NULL,


                                              CONSTRAINT PK_MEMBER_AUTH PRIMARY KEY (AUTHENTICATION_ID),

                                              CONSTRAINT CK_AUTH_GENDER CHECK (SEX IN ('male', 'female')),
                                              CONSTRAINT UQ_AUTH_EMAIL UNIQUE (EMAIL),
                                              CONSTRAINT UQ_AUTH_PHONE UNIQUE (PHONE),
                                              CONSTRAINT UQ_AUTH_USER UNIQUE (USER_ID),

        CONSTRAINT FK_AUTH_USER FOREIGN KEY
            (USER_ID) REFERENCES MEMBER.MEMBER_USER (USER_ID)
            ON DELETE CASCADE
);

