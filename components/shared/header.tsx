"use client";
import { Menu, ThumbsUp, Github } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { config } from "@/config";

const Header = () => {
  return (
    <header className="border-b">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="MarkdownAI"
                width={32}
                height={32}
                className=""
              />
              <span className="text-2xl font-bold">MarkdownAI</span>
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Image
                src="/peerlist.svg"
                alt="Upvote"
                width={24}
                height={24}
                className=""
              />
              Upvote on Peerlist
            </Button>
            <Link href={config.githubLink}>
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Github className="h-4 w-4" />
                Source Code
              </Button>
            </Link>

            {/* Mobile Navigation (Sheet/Drawer) */}
            <div className="sm:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>MarkdownAI</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 mt-6">
                    <Button variant="outline" className="w-full">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Upvote Project
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Github className="h-4 w-4 mr-2" />
                      Source Code
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
