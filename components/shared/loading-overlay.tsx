"use client"
import { MultiStepLoader } from "../ui/multi-step-loader";
import { CONVERT_LOADING_STATES } from "@/lib/constants";

interface LoadingOverlayProps {
  loading: boolean;
  loadingState : any
}
export function LoadingOverlay({ loading = false, loadingState = CONVERT_LOADING_STATES }: LoadingOverlayProps) {
  return (
    <MultiStepLoader
      loading={loading}
      loop
      loadingStates={loadingState}
    />
  );
}
