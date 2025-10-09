import { AuroraText } from "@/components/magicui/aurora-text";

export function HeroSection() {
  return (
    <div className="text-pretty tracking-tight text-center space-y-4">
      <h2 className="text-4xl font-bold">
        Medium to <AuroraText> Dev.to </AuroraText> Converter
      </h2>
      <p className="text-muted-foreground text-lg mx-auto max-w-2xl">
        Transform your Medium/Peerlist articles into Dev.to-compatible
        markdown format in seconds.
      </p>
    </div>
  );
}