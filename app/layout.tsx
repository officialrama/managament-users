import "./globals.css";
import { UserProvider } from "@/context/UserProvider";

export const metadata = { title: 'User Management' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <div className="min-h-screen">
            <header className="bg-white border-b">
              <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-xl font-bold text-black">Mini User Management</div>
              </div>
            </header>
            <main>{children}</main>
          </div>
        </UserProvider>
      </body>
    </html>
  )
}
