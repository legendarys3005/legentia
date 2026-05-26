import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Log in — Legentia',
  description: 'Sign in to your Legentia account',
  icons: {
    icon: "/favicon.ico"
  }
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
