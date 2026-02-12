///입력타입 //

///회원 로그인 입력 (types)
//(입력타입 )
export type LoginRequest = {
loginId:               string;
password:              string;
}

//응답 타입//
//회원 로그인 응답 (types)
//(응답타입 )
export type LoginResponse = {


loginId:               string;

accessToken: string; // ✅ 필수로 받을 거 (토큰)
}

/////////////////////////////////////////////////////////////////////



//상세정보 타입 

export type AuthMeResponse = {

  loginId: string | null;
  authenticationId: number | null;
};


//리플레이용 (통제용,재발급)
export type RefreshResponseDTO = {
  accessToken: string;
};



//////////////////////////////////////////////////////////////////////////////////
//오류검출 타입용 (log)
//////////////////////////////////////////////////////////////////////////////////



export type ApiResponse<T> = {
success:               boolean;
message:               string;
data:                  T;


};