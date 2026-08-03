"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export default function HeroSection() {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      if (!imageElement) return;

      if (window.scrollY > 100) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative overflow-hidden pt-32 md:pt-44 pb-28">

      {/* Background Glow */}

      <div className="absolute inset-0 -z-10 overflow-hidden">

        <div
          className="
          absolute
          left-1/2
          top-[-120px]
          -translate-x-1/2
          h-[700px]
          w-[700px]
          rounded-full
          bg-blue-400/20
          dark:bg-cyan-500/10
          blur-[180px]
        "
        />

        <div
          className="
          absolute
          left-0
          top-64
          h-[350px]
          w-[350px]
          rounded-full
          bg-sky-300/20
          dark:bg-indigo-500/10
          blur-[140px]
        "
        />

        <div
          className="
          absolute
          right-0
          top-32
          h-[250px]
          w-[250px]
          rounded-full
          bg-cyan-300/20
          dark:bg-sky-500/10
          blur-[120px]
        "
        />

      </div>

      <div className="container mx-auto px-6">

        <div className="max-w-5xl mx-auto text-center">

          {/* Badge */}

          {/* <div
            className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-primary/20
            bg-background/80
            backdrop-blur-xl
            shadow-lg
            px-5
            py-2
            mb-8
          "
          >
            <Sparkles className="w-4 h-4 text-blue-500" />

            <span className="text-sm font-medium text-muted-foreground">
              AI Powered Career Growth Platform
            </span> */}
          {/* </div> */}

          {/* Heading */}

          <h1
            className={`
              ${inter.className}
              gradient-title
              text-5xl
              md:text-7xl
              lg:text-8xl
              xl:text-[5rem]
              font-black
              leading-[0.92]
              tracking-tight
            `}
          >
            Full-Stack AI Career
            <br />
            Development Platform
          </h1>

          {/* Description */}

          <p
            className="
            mx-auto
            mt-8
            max-w-3xl
            text-lg
            md:text-xl
            leading-9
            text-muted-foreground
          "
          >
            Build an outstanding resume, prepare with AI-powered mock
            interviews, receive personalized career guidance, optimize your ATS
            score, and accelerate your journey toward your dream career—all from
            one intelligent platform.
          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <Link href="/dashboard">

              <Button
                size="lg"
                className="
                  h-14
                  px-10
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-600
                  via-blue-500
                  to-cyan-500
                  hover:scale-105
                  hover:shadow-2xl
                  hover:shadow-blue-500/30
                  transition-all
                  duration-300
                "
              >
                Get Started

                <ArrowRight className="ml-2 h-5 w-5" />

              </Button>

            </Link>

            <Link href="https://drive.google.com/file/d/1WbokF_bIidsEhCbuEUvjSXl8Nj9OboNW/view?usp=sharing"
            target="_blank">

              <Button
                size="lg"
                variant="outline"
                className="
                  h-14
                  px-10
                  rounded-xl
                  border-border
                  bg-background/70
                  backdrop-blur-xl
                  hover:bg-accent
                  transition-all
                "
              >
                <PlayCircle className="mr-2 h-5 w-5" />

                Watch Demo
              </Button>

            </Link>

          </div>

          {/* Stats */}

          <div className="mt-14 flex flex-wrap justify-center gap-10 text-center">

            <div>
              <h3 className="text-3xl font-bold">500+</h3>
              <p className="text-muted-foreground text-sm">
                Interview Questions
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">50+</h3>
              <p className="text-muted-foreground text-sm">
                Career Domains
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">24×7</h3>
              <p className="text-muted-foreground text-sm">
                AI Assistance
              </p>
            </div>

          </div>

          {/* Dashboard Preview */}

          <div className="hero-image-wrapper mt-50">

            <div
              ref={imageRef}
              className="hero-image"
            >

              <Image
                src="/banner1.png"
                width={2550}
                height={920}
                priority
                alt="Career Development Dashboard"
                className="
                  mx-auto
                  rounded-[28px]
                  border
                  border-border
                  shadow-[0_35px_100px_rgba(15,23,42,0.18)]
                  dark:shadow-[0_40px_120px_rgba(0,0,0,0.45)]
                "
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}