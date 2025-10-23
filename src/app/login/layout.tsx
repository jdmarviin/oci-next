import React from "react";

export default async function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<div>{children}</div>);
}
