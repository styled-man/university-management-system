import "./globals.tw.css"
import { Poppins } from "next/font/google"
import Navbar from "@/components/Navbar"

export const metadata = {
    title: "University management system",
}

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-poppins",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${poppins.className}`}>
                <header>
                    <Navbar />
                </header>
                {children}
            </body>
        </html>
    )
}
