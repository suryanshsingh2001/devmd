"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { FileText, ArrowRight, Copy, Wand2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);

  const convertToMarkdown = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to convert");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) throw new Error("Conversion failed");

      const data = await response.json();
      setMarkdown(data.markdown);
      toast.success("Text converted to markdown successfully");
    } catch (error) {
      toast.error("Failed to convert text to markdown");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      toast.success("Markdown copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy markdown to clipboard");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Plain Text to Markdown Converter
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Convert your blog posts from Medium to dev.to-friendly markdown
            format using AI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-semibold">Input Text</h2>
            </div>
            <Textarea
              placeholder="Paste your text here..."
              className="min-h-[400px] resize-none"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <Button
              onClick={convertToMarkdown}
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                "Converting..."
              ) : (
                <>
                  Convert to Markdown
                  <Wand2 className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </Card>

          <Card className="p-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-green-500" />
                <h2 className="text-xl font-semibold">Markdown Output</h2>
              </div>
              {markdown && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              )}
            </div>
            <div className="min-h-[400px] bg-gray-50 dark:bg-gray-900 rounded-md p-4 overflow-auto">
              {markdown ? (
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-2xl font-bold my-4">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl font-bold my-3">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg font-bold my-2">{children}</h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="text-base font-bold my-2">{children}</h4>
                    ),
                    h5: ({ children }) => (
                      <h5 className="text-sm font-bold my-2">{children}</h5>
                    ),
                    h6: ({ children }) => (
                      <h6 className="text-xs font-bold my-2">{children}</h6>
                    ),
                    p: ({ children }) => <p className="my-2">{children}</p>,
                    ul: ({ children }) => (
                      <ul className="list-disc ml-6 my-2">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal ml-6 my-2">{children}</ol>
                    ),
                    li: ({ children }) => <li className="my-1">{children}</li>,
                    code: ({ children }) => (
                      <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded-md">
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto">
                        {children}
                      </pre>
                    ),
                    a: ({ children, href }) => (
                      <a className="text-blue-500 hover:underline" href={href}>
                        {children}
                      </a>
                    ),
                  }}
                >
                  {markdown}
                </ReactMarkdown>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center mt-32">
                  Your markdown will appear here...
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
