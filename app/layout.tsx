import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#6366f1", // Indigo-500 to match your theme
          colorBackground: "#1f1f23", // Slightly lighter than black
          colorInputBackground: "#2d2d30", // Lighter than zinc-900
          colorInputText: "#f4f4f5", // Zinc-100
          colorText: "#f4f4f5", // Zinc-100
          colorTextSecondary: "#a1a1aa", // Zinc-400
          colorShimmer: "#3f3f46", // Lighter zinc-700
          colorNeutral: "#f4f4f5", // Zinc-100
          borderRadius: "0.75rem", // rounded-xl
        },
        elements: {
          card: "bg-zinc-900/95 border border-zinc-700 shadow-xl",
          headerTitle: "text-white",
          headerSubtitle: "text-zinc-300",
          socialButtonsBlockButton: "border-zinc-600 hover:bg-zinc-700/70 bg-zinc-800/50",
          formFieldInput: "bg-zinc-800 border-zinc-600 text-zinc-100 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/20",
          formFieldLabel: "text-zinc-200",
          formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg",
          footerActionLink: "text-indigo-400 hover:text-indigo-300",
          identityPreviewText: "text-zinc-200",
          identityPreviewEditButton: "text-indigo-400 hover:text-indigo-300",
          formFieldSuccessText: "text-green-400",
          formFieldErrorText: "text-red-400",
          otpCodeFieldInput: "bg-zinc-800 border-zinc-600 text-zinc-100",
          dividerLine: "bg-zinc-600",
          dividerText: "text-zinc-400",
        }
      }}
    >
      <html lang="en" className="dark" suppressHydrationWarning>
        <body className="antialiased bg-black text-zinc-100 min-h-dvh">
          {/* Subtle radial gradient background */}
          <div className="min-h-dvh flex flex-col bg-[radial-gradient(45rem_25rem_at_50%_-20%,rgba(120,119,198,0.25),transparent)]">
            <Navbar />
            <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <div className="mt-auto">
              <Footer />
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
