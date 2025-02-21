"use client"
import { MultiStepLoader } from "../ui/multi-step-loader";

interface LoadingOverlayProps {
  loading: boolean;
}
export function LoadingOverlay({ loading = false }: LoadingOverlayProps) {
  return (
    <MultiStepLoader
      loading={loading}
      loop
      loadingStates={[
        {
          text: "Converting your text... 📝",
        },
        {
          text: "Teaching AI proper grammar... 🎓",
        },
        {
          text: "Adding markdown magic... ✨",
        },
        {
          text: "Making it dev.to friendly... 🚀",
        },
        {
          text: "Almost there! ⚡",
        },
      ]}
    />
  );
}
