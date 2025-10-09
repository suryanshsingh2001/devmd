import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
  markdown: string;
  showRaw: boolean;
}

export function MarkdownRenderer({ markdown, showRaw }: MarkdownRendererProps) {
  if (!markdown) {
    return (
      <p className="text-gray-500 dark:text-gray-400 text-center mt-32">
        No markdown to display.
      </p>
    );
  }

  if (showRaw) {
    return (
      <pre className="text-sm font-mono whitespace-pre-wrap">
        {markdown}
      </pre>
    );
  }

  return (
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
  );
}