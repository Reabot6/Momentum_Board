import React from 'react';
import { cn } from '../utils/cn';

export interface Tag {
  id: string;
  name: string;
  emoji: string;
}

interface TagSelectorProps {
  tags: Tag[];
  selectedTag: string | null;
  onSelectTag: (tagId: string) => void;
  className?: string;
}

const TagSelector: React.FC<TagSelectorProps> = ({
  tags,
  selectedTag,
  onSelectTag,
  className,
}) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => onSelectTag(tag.id)}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
            "flex items-center space-x-1",
            selectedTag === tag.id 
              ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
          )}
        >
          <span>{tag.emoji}</span>
          <span>#{tag.name}</span>
        </button>
      ))}
    </div>
  );
};

export default TagSelector;