import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ProductsProvider } from "@/context/products-provider";
import { UserProvider } from "@/context/user-context";

// export type Params = {};

export const metadata: Metadata = {
  title: "OneClick Importer",
  description: "Import products from Aliexpress to shopify in one click!!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <UserProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ProductsProvider>{children}</ProductsProvider>
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
