import Navbar from "@/components/Navbar"
import { Poppins } from "next/font/google"
import "./globals.tw.css"

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
