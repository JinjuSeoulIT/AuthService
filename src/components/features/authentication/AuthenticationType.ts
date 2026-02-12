

// ✅ 개인정보(회원상세) 응답 타입
export type AuthenticationResponse ={
    authenticationId: number;
    userId: number;
    realName: string;
    phone: string;
    email: string;
    birthDate: string; // 서버 LocalDate면 보통 "YYYY-MM-DD" 문자열로 옴
    sex: string;
    
    zipCode?: string;
    address1?: string;
    address2?: string;
    nationCode?: string;
}




//추가
export type AuthenticationRequest = {
 
    realName: string;
    phone: string;
    email: string;
    birthDate: string; // 서버 LocalDate면 보통 "YYYY-MM-DD" 문자열로 옴
    sex: string;
    
    zipCode?: string;
    address1?: string;
    address2?: string;
    nationCode?: string;
}

export const  initialAuthenticationCreateForm :  AuthenticationRequest = { //회원가입 입력용 초기값

realName:              "",
phone:                 "",
email:                 "", 
birthDate:             "",
sex:                   "male",

zipCode:               "",
address1:              "",
address2:              "",
nationCode:            "",
}






