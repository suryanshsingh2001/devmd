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
import { ModeToggle } from "./theme-toggle";

const Header = () => {
  return (
    <header className="bg-background/75 my-2">
      <nav className="mx-auto max-w-5xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="DevMD"
                width={36}
                height={36}
                className="dark:bg-white rounded-sm  p-1"
              />
              <span className="text-2xl font-bold">{config.name}</span>
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Link href={config.peerlistLink}>
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
            </Link>
            {/* <Link href={config.githubLink}>
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Github className="h-4 w-4" />
                Source Code
              </Button>
            </Link> */}

            <ModeToggle />

            {/* Mobile Navigation (Sheet/Drawer) */}
            <div className="sm:hidden">
              <Sheet>
                <SheetTrigger asChild className="p-2">
                  <Button variant="ghost" size="lg">
                    <Menu className="size-12" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader className="flex-shrink-0">
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                    <Link href="/" className="flex items-center gap-2">
                      <Image
                        src="/logo.svg"
                        alt="DevMD"
                        width={36}
                        height={36}
                        className="dark:bg-white rounded-sm  p-1"
                      />
                      <span className="text-2xl font-bold">{config.name}</span>
                    </Link>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 mt-6">
                    <Link href={config.peerlistLink}>
                      <Button variant="outline" className="w-full">
                        <Image
                          src="/peerlist.svg"
                          alt="Upvote"
                          width={24}
                          height={24}
                          className="mr-2"
                        />
                        Upvote on Peerlist
                      </Button>
                    </Link>
                    <Link href={config.githubLink}>
                      <Button variant="outline" className="w-full">
                        <Github className="h-4 w-4 mr-2" />
                        Source Code
                      </Button>
                    </Link>
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
