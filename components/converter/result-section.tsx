"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Copy,
  CheckCircle2,
  Download,
  FileCheck,
} from "lucide-react";
import { toast } from "sonner";
import { MarkdownRenderer } from "./markdown-renderer";

interface ResultSectionProps {
  markdown: string;
  onTryAgain: () => void;
}

export function ResultSection({ markdown, onTryAgain }: ResultSectionProps) {
  const [showRaw, setShowRaw] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      toast.success("Markdown copied to clipboard");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy markdown to clipboard");
    }
  };

  const exportFile = async () => {
    try {
      if (!markdown) {
        toast.error("No markdown content to export");
        return;
      }

      const blob = new Blob([markdown], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "devto-article.md";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Markdown file exported successfully");
    } catch (error) {
      toast.error("Failed to export markdown file");
    }
  };

  return (
    <Card className="p-3 space-y-4">
      {/* Header with responsive layout */}
      <div className="mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-green-500" />
            <h2 className="text-xl font-semibold">Result</h2>
          </div>

          {/* Buttons inline on md+, stacked below on sm */}
          {markdown && (
            <div className="flex flex-col sm:flex-col md:flex-row gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={exportFile}
                className="flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                <span>Export</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="flex items-center gap-2"
              >
                {isCopied ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-green-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 text-primary" />
                    <span>Copy to clipboard</span>
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Show Raw Toggle */}
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowRaw(!showRaw)}
          className="text-sm outline"
        >
          {showRaw ? "Show Rendered" : "Show Raw"}
        </Button>
      </div>

      {/* Markdown Viewer */}
      <div className="min-h-[400px] bg-gray-50 dark:bg-gray-900 rounded-md p-4 overflow-auto">
        <MarkdownRenderer markdown={markdown} showRaw={showRaw} />
      </div>

      {/* Try Again Button */}
      <Button
        className="w-full"
        size="lg"
        onClick={onTryAgain}
      >
        Write Another
      </Button>
    </Card>
  );
}
