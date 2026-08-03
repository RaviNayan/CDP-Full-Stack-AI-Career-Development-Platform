"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, FileText, FileSignature, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CTATools() {
  const [showTools, setShowTools] = useState(false);

  return (
    <>
      <Button
        size="lg"
        variant="secondary"
        className="h-11 mt-5 animate-bounce"
        onClick={() => setShowTools(!showTools)}
      >
        Start Your Journey Today
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

      {showTools && (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          <Link href="/resume">
            <Card className="cursor-pointer hover:scale-105 transition-all">
              <CardContent className="py-10 text-center">
                <FileText className="mx-auto h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold">Resume Builder</h3>
                <p className="text-muted-foreground mt-2">
                  Create an ATS-friendly resume.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/ai-cover-letter">
            <Card className="cursor-pointer hover:scale-105 transition-all">
              <CardContent className="py-10 text-center">
                <FileSignature className="mx-auto h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-bold">Cover Letter</h3>
                <p className="text-muted-foreground mt-2">
                  Generate AI cover letters.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/interview">
            <Card className="cursor-pointer hover:scale-105 transition-all">
              <CardContent className="py-10 text-center">
                <MessageSquare className="mx-auto h-12 w-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-bold">Interview Prep</h3>
                <p className="text-muted-foreground mt-2">
                  Practice mock interviews.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      )}
    </>
  );
}