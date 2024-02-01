"use client";
import { Provider } from "react-redux";
import { store } from "../lib/store";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { configureStore } from "@reduxjs/toolkit";
import Header from "./componant/layout/Header";
import Footer from "./componant/layout/Footer";
import { Toaster } from "react-hot-toast";



const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
    <html lang="en">
      
      <body className={inter.className}>
      <Toaster/>
      
        {children}</body>
      
    </html>
    </Provider>
  )
}
