"use client";

import React from "react";
import "./globals.css";
import "@fontsource/roboto/700.css";
import { Inter } from "next/font/google";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IMGEN: REBOOT",
  description: "次世代图片生成器",
};

export default function RootLayout({ children }) {
  useEffect(() => {
    // var drawRipple = function (ev) {
    //   var x = ev.clientX;
    //   var y = ev.clientY;
    //   var node = document.querySelector(".ripple");
    //   var newNode = node.cloneNode(true);
    //   newNode.classList.add("animate");
    //   newNode.style.left = x - 5 + "px";
    //   newNode.style.top = y - 5 + "px";
    //   node.parentNode.replaceChild(newNode, node);
    // };

    // //Ripple Triggers
    // document.getElementById('main').addEventListener("click", drawRipple);

    console.log('Welcome to iMGEN! Next Gen Image Generator!');
    // return () => document.getElementById('main').removeEventListener("click", drawRipple);
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" />
        <title>iMGEN</title>
      </head>
      <body className={inter.className}>
        {children}
        {/* <div class="ripple" /> */}
      </body>
    </html>
  );
}
