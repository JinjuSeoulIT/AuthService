///입력타입 //

///회원 로그인 입력 (types)
//(입력타입 )
export interface LoginRequest {
loginId:               string;
password:              string;
}

//응답 타입//
//회원 로그인 응답 (types)
//(응답타입 )
export interface LoginResponse {

userId:                number;
loginId:               string;


}

/////////////////////////////////////////////////////////////////////


//상세정보 타입 

export type AuthMeResponse = {
  userId: number | null;
  loginId: string | null;
  authenticationId: number | null;
};



//////////////////////////////////////////////////////////////////////////////////
//오류검출 타입용 (log)
//////////////////////////////////////////////////////////////////////////////////



export type ApiResponse<T> = {
success:               boolean;
message:               string;
data:                  T;


};