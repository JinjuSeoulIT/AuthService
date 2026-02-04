"use client";

import { Provider } from "react-redux";
import type { ReactNode } from "react";
import { appStore } from "@/store/store";// 네 store export 방식에 맞춰 import

//서버용
export default function Providers({ children }: { children: ReactNode })


{
  return <Provider store={appStore}>
    
    
    {children}</Provider>;
}