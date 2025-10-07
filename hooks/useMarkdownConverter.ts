"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const MAX_CHARACTERS = Number(process.env.NEXT_PUBLIC_MAX_CHARACTERS) || 5000;

const formSchema = z.object({
  inputText: z
    .string()
    .min(
      500,
      "Your plain text is too short. Please enter at least 500 characters"
    )
    .max(
      MAX_CHARACTERS,
      `Your plain text is too long. Please keep it under ${MAX_CHARACTERS} characters`
    ),
});

export function useMarkdownConverter() {
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
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
        throw new Error(errorData.text);
      }

      const data = await response.json();

      if (data.success) {
        form.setValue("inputText", data.data);
        await onSubmit({ inputText: data.data });
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to extract text from URL");
    } finally {
      setLoading(false);
      setIsExtracting(false);
    }
  };

  const handleTryAgain = () => {
    form.setValue("inputText", "");
    setShowResult(false);
    setMarkdown("");
  };

  return {
    form,
    markdown,
    loading,
    showResult,
    isExtracting,
    onSubmit,
    handleUrlSubmit,
    handleTryAgain,
    maxCharacters: MAX_CHARACTERS,
  };
}