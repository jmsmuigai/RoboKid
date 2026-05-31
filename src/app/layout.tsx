import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RoboKid — AI-Powered Learning for Kenyan Children | CBC Curriculum",
  description: "Learn AI, play smart, and speak your language! RoboKid is an interactive educational platform for Kenyan Grade 1-3 children, aligned with the KICD Competency-Based Curriculum. Features real-time AI tutoring, games, and mother tongue support in English, Kiswahili, Kikuyu, Luo, and Somali.",
  keywords: "RoboKid, Kenya education, CBC curriculum, KICD, Grade 1, Grade 2, Grade 3, AI learning, Kiswahili, educational games, KNEC",
  authors: [{ name: "RoboKid Team" }],
  openGraph: {
    title: "RoboKid — AI-Powered Learning for Kenyan Children",
    description: "Interactive CBC-aligned learning with AI tutoring, games, and mother tongue support.",
    type: "website",
    locale: "en_KE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var saved = localStorage.getItem('robokid-theme');
              if (saved === 'bright') {
                document.documentElement.classList.add('bright-theme');
              } else {
                document.documentElement.classList.remove('bright-theme');
              }
            } catch (e) {}
          })();
        ` }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
