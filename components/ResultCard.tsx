import React, { useState } from 'react';
import { ClipboardIcon, CheckIcon, TrashIcon, SparklesIcon } from './icons';

interface ResultCardProps {
  title: string;
  content: string;
  isLoading: boolean;
  onReset?: () => void;
  isSummary?: boolean;
}

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-3 animate-pulse">
    <div className="h-4 bg-gray-600 rounded w-3/4"></div>
    <div className="h-4 bg-gray-600 rounded w-full"></div>
    <div className="h-4 bg-gray-600 rounded w-5/6"></div>
  </div>
);

// Simple component to render markdown-like text content safely
const MarkdownContent: React.FC<{ text: string }> = ({ text }) => {
  const renderableContent = text
    .split('\n')
    .map((line, index) => {
      const trimmedLine = line.trim();
      // Handle bullet points
      if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
        return <li key={index}>{trimmedLine.substring(2)}</li>;
      }
      // Handle empty lines as paragraph breaks
      if (trimmedLine === '') {
        return <div key={index} className="h-4"></div>; // Represents a paragraph break
      }
      return <p key={index}>{line}</p>;
    })
    // Fix: Use React.ReactElement instead of JSX.Element to resolve "Cannot find namespace 'JSX'" error.
    .reduce((acc: React.ReactElement[], el) => {
      // Group `<li>` elements into a `<ul>`
      if (el.type === 'li') {
        const lastElement = acc[acc.length - 1];
        if (lastElement && lastElement.type === 'ul') {
          // Add to existing list
          lastElement.props.children.push(el);
        } else {
          // Start a new list
          acc.push(<ul key={`ul-${acc.length}`} className="list-disc list-inside space-y-1 my-2">{[el]}</ul>);
        }
      } else {
        acc.push(el);
      }
      return acc;
    }, []);

  return <>{renderableContent}</>;
};

export const ResultCard: React.FC<ResultCardProps> = ({ title, content, isLoading, onReset, isSummary = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if(!content) return;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="bg-gray-700/50 rounded-xl p-5 relative min-h-[150px] flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
          {isSummary && <SparklesIcon className="w-5 h-5 text-teal-400" />}
          {title}
        </h2>
        <div className="flex items-center gap-2">
            {content && !isLoading && (
                 <button onClick={handleCopy} className="text-gray-400 hover:text-white transition-colors" title="Copy to clipboard">
                    {copied ? <CheckIcon /> : <ClipboardIcon />}
                </button>
            )}
            {onReset && (
                 <button onClick={onReset} className="text-gray-400 hover:text-white transition-colors" title="Clear and Reset">
                    <TrashIcon />
                </button>
            )}
        </div>
      </div>
      <div className="text-gray-300 flex-grow prose prose-invert max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-1">
        {isLoading ? (
          <LoadingSkeleton />
        ) : content ? (
           <MarkdownContent text={content} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Your {title.toLowerCase()} will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};