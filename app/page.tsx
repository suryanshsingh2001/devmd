"use client";

import { LoadingOverlay } from "@/components/shared/loading-overlay";
import { CONVERT_LOADING_STATES, LOADING_STATES } from "@/lib/constants";
import { useMarkdownConverter } from "@/hooks/useMarkdownConverter";
import { HeroSection } from "@/components/converter/hero-section";
import { TextInputForm } from "@/components/converter/text-input-form";
import { ResultSection } from "@/components/converter/result-section";

export default function Home() {
  const {
    form,
    markdown,
    loading,
    showResult,
    isExtracting,
    onSubmit,
    handleUrlSubmit,
    handleTryAgain,
    maxCharacters,
  } = useMarkdownConverter();

  return (
    <main className="min-h-screen py-12 px-4">
      {loading && (
        <LoadingOverlay
          loadingState={isExtracting ? LOADING_STATES : CONVERT_LOADING_STATES}
          loading={loading}
        />
      )}
      <div className="max-w-5xl mx-auto space-y-8">
        <HeroSection />
        
        <div className="flex flex-col space-y-8">
          {!showResult ? (
            <TextInputForm
              form={form}
              onSubmit={onSubmit}
              onUrlSubmit={handleUrlSubmit}
              loading={loading}
              maxCharacters={maxCharacters}
            />
          ) : (
            <ResultSection
              markdown={markdown}
              onTryAgain={handleTryAgain}
            />
          )}
        </div>
      </div>
    </main>
  );
}
