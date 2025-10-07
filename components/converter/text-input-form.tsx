"use client";

import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import UrlInputDialog from "@/components/shared/url-input-dialog";

interface TextInputFormProps {
  form: UseFormReturn<{ inputText: string }>;
  onSubmit: (values: { inputText: string }) => Promise<void>;
  onUrlSubmit: (url: string) => Promise<void>;
  loading: boolean;
  maxCharacters: number;
}

export function TextInputForm({ 
  form, 
  onSubmit, 
  onUrlSubmit, 
  loading, 
  maxCharacters 
}: TextInputFormProps) {
  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-semibold">Plain Text</h2>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <UrlInputDialog
            onSubmit={onUrlSubmit}
            loading={loading}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 p-2">
        <span className="text-muted-foreground text-lg mx-auto">
          Or
        </span>
        {form.watch("inputText") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => form.setValue("inputText", "")}
            className="text-red-500 hover:text-red-600"
          >
            Clear Text
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
                <FormMessage className="text-md text-red-600 text-center" />
                <FormControl>
                  <div className="relative">
                    <Textarea
                      placeholder="Paste your plain text here..."
                      className={`min-h-[500px] resize-none pr-16 ${
                        form.formState.errors.inputText
                          ? " focus-visible:ring-red-500"
                          : ""
                      }`}
                      {...field}
                    />
                    <div
                      className={`absolute bottom-2 right-2 text-sm ${
                        field.value.length > maxCharacters
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      {field.value.length}/{maxCharacters}
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <RainbowButton
            type="submit"
            className="w-full text-background bg-foreground"
            disabled={loading}
          >
            {loading ? "Converting..." : <>Convert to Markdown</>}
          </RainbowButton>
        </form>
      </Form>
    </Card>
  );
}