import { ToasterProvider } from '@/components/providers/toaster-provider'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import {Inter} from 'next/font/google'
import { ConfettiProvider } from '@/components/providers/confetti-provider'


const inter = Inter({subsets:['latin']})

export const metadata = {
    title:'E-Learning',
    description:'This is a E-Learning Plateform',
}

export default function RootLayout({
    children,
}:{
    children:React.ReactNode
}){
    return (
        <ClerkProvider>
        <html lang='en'>
                <body className={inter.className}>
                    <ConfettiProvider />

                    
                    <ToasterProvider />
                    {/* <h1>hello</h1> */}
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}