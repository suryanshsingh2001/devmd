export const CONVERT_LOADING_STATES = [
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
] as const;

export const EXTRACT_LOADING_STATES = [
  {
    text: "Extracting content... 📄",
  },
  {
    text: "Parsing HTML like it's going out of style... 🕵️‍♂️",
  },
  {
    text: "Fighting with divs and spans... 🥊",
  },
  {
    text: "Cleaning up the digital mess... 🧹",
  },
  {
    text: "Teaching the code some manners... 🎩",
  },
  {
    text: "Almost there! Hold onto your keyboards! ⚡",
  },
] as const;

export const FAQs = [
  {
    question: "What is DevMD?",
    answer:
      "DevMD is a tool that helps you convert your blog posts from Medium to dev.to-friendly markdown format using AI.",
  },
  {
    question: "How does it work?",
    answer:
      "You can paste your Medium blog post into the text area, and DevMD will convert it to markdown format optimized for dev.to.",
  },
  {
    question: "Can I import my Medium or Peerlist article?",
    answer:
      "Support for Medium articles is coming soon! For now, you can import Peerlist articles by pasting the URL.",
  },
  {
    question: "What AI model does DevMD use?",
    answer:
      "DevMD uses Google's Gemini Flash model to ensure efficient and accurate conversions of your blog posts while maintaining the original context and formatting.",
  },
  {
    question: "Does DevMD support image conversion?",
    answer:
      "Currently, DevMD does not support working with images. You will need to manually move and upload your images to dev.to or your markdown destination.",
  },
  {
    question: "What is the current word limit?",
    answer:
      "DevMD currently supports articles up to 5,000 characters. For longer articles, you may need to process them in parts.",
  },
  {
    question: "Is DevMD open source?",
    answer:
      "DevMD will be open source soon! We're currently preparing the codebase for public release. Stay tuned for updates.",
  },
  {
    question: "Is there a limit on article conversions?",
    answer:
      "Yes, conversions are limited to 5 requests per day to ensure fair usage and prevent resource abuse.",
  },
] as const;
