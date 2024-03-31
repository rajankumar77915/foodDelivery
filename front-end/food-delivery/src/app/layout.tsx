"use client";
import { Provider } from "react-redux";
import { store } from "../lib/store";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from "react-hot-toast";
import 'flowbite';


const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
    <html lang="en">
      
<link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'></link>
      <body className={inter.className} style={{fontFamily:"'Poppins'"}}>
      <Toaster/>
        {children}</body>
      
    </html>
    </Provider>
  )
}
