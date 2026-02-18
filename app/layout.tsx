import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "PROTOCOL | IEEE SRMIST",
    description:
        "An innovative online hackathon by IEEE SRM empowering Computer Science and Engineering students to innovate and create impactful solutions using cutting-edge technologies.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
