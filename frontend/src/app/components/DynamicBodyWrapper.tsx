'use client';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function DynamicBodyWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === '/login';
  const isRegister = pathname === '/register';

  const bodyClass = isLogin
    ? 'login-background'
    : isRegister
    ? 'register-background'
    : 'default-background';

  return <div className={bodyClass}>{children}</div>;
}
