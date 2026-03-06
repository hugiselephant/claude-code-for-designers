import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="font-heading mb-6 text-3xl font-medium tracking-tight sm:text-4xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-heading mt-10 mb-4 text-2xl font-medium tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading mt-8 mb-3 text-xl font-medium">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-text-muted mb-4 leading-relaxed">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="text-text-muted mb-4 list-disc space-y-1 pl-6">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="text-text-muted mb-4 list-decimal space-y-1 pl-6">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    code: ({ children }) => (
      <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-sm dark:bg-neutral-800">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="mb-4 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-primary-400 mb-4 border-l-4 pl-4 italic">
        {children}
      </blockquote>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-primary-600 underline underline-offset-2 hover:text-primary-700 dark:text-primary-400"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    hr: () => <hr className="border-border/30 my-8" />,
    ...components,
  };
}
