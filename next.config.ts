import type { NextConfig } from "next";

const MEMBER = process.env.MEMBER_ORIGIN ?? "http://192.168.1.58:8880";
// const HOSPITAL = process.env.HOSPITAL_ORIGIN ?? "http://192.168.1.58:18080";

const nextConfig: NextConfig = {
  async rewrites() {
    return [

      // // doctor 도메인
      // { source: "/api/doctor/:path*", 
      //   destination: `${HOSPITAL}/api/doctor/:path*` },


      // { source: "/api/boards/:path*", 
      //   destination: `${HOSPITAL}/api/boards/:path*` },


      // { source: "/api/authentication/:path*", 
      //   destination: `${HOSPITAL}/api/authentication/:path*` },


      // member 도메인
      { source: "/api/users/:path*", 
       destination: `${MEMBER}/api/users/:path*` },


         // 온보딩 도메인
      { source: "/api/onboarding/:path*", 
      destination: `${MEMBER}/api/onboarding/:path*` },  
    ];
  },
};

export default nextConfig;