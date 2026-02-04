FROM eclipse-temurin:17-jdk
#자바 버전


RUN mkdir /app
#mkdir는 폴더(디렉터리)를 만드는 명령어

WORKDIR /app
#“이 컨테이너 안에서 앞으로 작업은 /app 폴더 기준으로 해라”

COPY ./build/libs/member-0.0.1-SNAPSHOT.jar /app/app.jar
#COPY ./member/build/libs/*SNAPSHOT.jar /app/app.jar
#빌드 경로
#멀티 모듈은 이걸로 하는게 정석


EXPOSE 8086


ENTRYPOINT ["java","-jar","/app/app.jar","--server.port=8086"]
#도커용 고정포트 8086