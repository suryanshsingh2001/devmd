import { config } from "@/config";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 text-center border-t mt-auto">
      <h3 className="text-lg text-muted-foreground">
      Made with ❤️ by <Link href={config.profileUrl}>{config.authorName}</Link>
      </h3>
      <p className="text-sm text-gray-500 mt-1">
      © {currentYear} All rights reserved.
      </p>
      <div className="text-sm text-gray-500 mt-2">
      <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
      {" • "}
      <Link href="/terms" className="hover:underline">Terms of Service</Link>
      </div>
    </footer>
  );
};

export default Footer;
