"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  FileText,
  ArrowRight,
  Copy,
  Wand2,
  BookMarked,
  AlertCircle,
  Check,
  CheckCircle,
  CheckCircle2,
  Cross,
  X,
  Download,
  FileCheck,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { LoadingOverlay } from "@/components/shared/loading-overlay";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { AuroraText } from "@/components/magicui/aurora-text";

import UrlInputDialog from "@/components/shared/url-input-dialog";
import {
  CONVERT_LOADING_STATES,
  EXTRACT_LOADING_STATES,
} from "@/lib/constants";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  inputText: z
    .string()
    .min(
      500,
      "Your plain text is too short. Please enter at least 500 characters"
    )
    .max(
      5000,
      "Your plain text is too long. Please keep it under 5000 characters"
    ),
});

export default function Home() {
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRaw, setShowRaw] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inputText: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { inputText } = values;
    if (!inputText.trim()) {
      toast.error("How about entering some text to convert? 😅");
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.text || "Failed to convert text to markdown");
      }

      const data = await response.json();
      setMarkdown(data.markdown);
      setShowResult(true);
      toast.success("Text converted to markdown successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      toast.success("Markdown copied to clipboard");
      setIsCopied(true);
    } catch (error) {
      toast.error("Failed to copy markdown to clipboard");
    }
  };

  const handleUrlSubmit = async (url: string) => {
    setLoading(true);
    setIsExtracting(true);
    try {
      const response = await fetch("/api/scrap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.text );
      }
      
      const data = await response.json();

      

      if (data.success) {
        form.setValue("inputText", data.data);
        toast.success("Text extracted from URL successfully");
      } 
      
    } catch (error: any) {
      toast.error(error.message || "Failed to extract text from URL");
    } finally {
      setLoading(false);
      setIsExtracting(false);
    }
  };

  const exportFile = async () => {
    try {
      // Use the markdown state instead of form values since that contains the converted content
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
    <main className="min-h-screen  py-12 px-4">
      {loading && (
        <LoadingOverlay
          loadingState={
            isExtracting ? EXTRACT_LOADING_STATES : CONVERT_LOADING_STATES
          }
          loading={loading}
        />
      )}
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-pretty tracking-tight text-center space-y-4">
          <h2 className="text-4xl font-bold  ">
            Medium to <AuroraText> Dev.to </AuroraText> Converter
          </h2>
          <p className="text-muted-foreground text-lg mx-auto max-w-2xl ">
            Transform your Medium/Peerlist articles into Dev.to-compatible
            markdown format in seconds.
          </p>
        </div>

        <div className="flex flex-col space-y-8">
          {!showResult ? (
            <Card className="p-4 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-semibold">Plain Text</h2>
              </div>

              <div className="flex items-center gap-2">
                <UrlInputDialog onSubmit={handleUrlSubmit} loading={loading} />

                {form.watch("inputText") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => form.setValue("inputText", "")}
                  >
                    <span className="text-red-500">Clear Text</span>
                  </Button>
                )}
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="inputText"
                    render={({ field }) => (
                      <FormItem>
                        {form.formState.errors.inputText && (
                          <Alert variant="destructive" className="text-red-500">
                            <AlertTitle>
                              <div className="flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />
                                <span className="text-sm">Too Short</span>
                              </div>
                            </AlertTitle>
                            <AlertDescription>
                              {form.formState.errors.inputText.message}
                            </AlertDescription>
                          </Alert>
                        )}
                        <FormControl>
                          <div className="relative">
                            <Textarea
                              placeholder="Paste your plain text here..."
                              className={`min-h-[700px] resize-none pr-16 ${
                                form.formState.errors.inputText
                                  ? " focus-visible:ring-red-500"
                                  : ""
                              }`}
                              {...field}
                            />
                            <div
                              className={`absolute bottom-2 right-2 text-sm ${
                                field.value.length > 5000
                                  ? "text-red-500"
                                  : "text-gray-500"
                              }`}
                            >
                              {field.value.length}/5000
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <RainbowButton
                    type="submit"
                    className="w-full  text-background bg-foreground"
                    disabled={loading}
                  >
                    {loading ? "Converting..." : <>Convert to Markdown</>}
                  </RainbowButton>
                </form>
              </Form>
            </Card>
          ) : (
            <Card className="p-3 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-green-500" />
                  <h2 className="text-xl font-semibold">Result</h2>
                </div>
                {markdown && (
                  <div className="flex items-center gap-2">
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
                          <span className="">Copy to clipboard</span>
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRaw(!showRaw)}
                  className="text-sm"
                >
                  {showRaw ? "Show Rendered" : "Show Raw"}
                </Button>
              </div>
              <div className="min-h-[400px] bg-gray-50 dark:bg-gray-900 rounded-md p-4 overflow-auto">
                {markdown ? (
                  showRaw ? (
                    <pre className="text-sm font-mono whitespace-pre-wrap">
                      {markdown}
                    </pre>
                  ) : (
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-3xl font-bold my-6 border-b pb-2">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-2xl font-semibold my-5">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-xl font-semibold my-4">
                            {children}
                          </h3>
                        ),
                        h4: ({ children }) => (
                          <h4 className="text-lg font-medium my-3">
                            {children}
                          </h4>
                        ),
                        h5: ({ children }) => (
                          <h5 className="text-base font-medium my-2">
                            {children}
                          </h5>
                        ),
                        h6: ({ children }) => (
                          <h6 className="text-sm font-medium my-2">
                            {children}
                          </h6>
                        ),
                        p: ({ children }) => (
                          <p className="text-gray-700 dark:text-gray-300 my-4 leading-relaxed">
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc ml-6 my-4 space-y-2">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal ml-6 my-4 space-y-2">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-gray-700 dark:text-gray-300">
                            {children}
                          </li>
                        ),
                        code: ({ children }) => (
                          <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">
                            {children}
                          </code>
                        ),
                        pre: ({ children }) => (
                          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto font-mono text-sm">
                            {children}
                          </pre>
                        ),
                        a: ({ children, href }) => (
                          <a
                            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {markdown}
                    </ReactMarkdown>
                  )
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center mt-32">
                    No markdown to display.
                  </p>
                )}
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={() => setShowResult(false)}
              >
                Try Again
              </Button>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}
