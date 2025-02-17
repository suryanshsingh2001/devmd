
"use client"
import React, { useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";



interface AutoGrowTextareaProps 
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    value: string;
    maxLength?: number;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    className?: string;
}

export function AutoGrowTextarea({
    value,
    maxLength = 5000,
    onChange,
    className,
    ...props
}: AutoGrowTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const characterCount = value.length;

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        if (newValue.length <= maxLength) {
            onChange(e);
        }
    };

    return (
        <div className="relative">
            <Textarea
                ref={textareaRef}
                value={value}
                onChange={handleChange}
                maxLength={maxLength}
                className={cn(
                    "resize-none overflow-hidden min-h-[100px]",
                    className
                )}
                {...props}
            />
            <div
                className={cn(
                    "absolute bottom-2 right-2 text-xs",
                    characterCount >= maxLength
                        ? "text-destructive"
                        : "text-muted-foreground"
                )}
            >
                {characterCount}/{maxLength}
            </div>
        </div>
    );
}