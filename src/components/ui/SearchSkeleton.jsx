import React from "react";

const SearchSkeleton = () => {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="p-3 border border-border rounded-lg animate-pulse"
        >
          <div className="flex items-start gap-3">
            {/* Checkbox */}
            <div className="w-4 h-4 mt-1 rounded-full bg-muted" />

            {/* Content */}
            <div className="flex-1">
              <div className="h-4 w-44 rounded bg-muted" />

              <div className="mt-3 h-3 w-full rounded bg-muted" />
              <div className="mt-2 h-3 w-2/3 rounded bg-muted" />

              <div className="flex gap-2 mt-4">
                <div className="h-6 w-16 rounded-full bg-muted" />
                <div className="h-6 w-20 rounded-full bg-muted" />
                <div className="h-6 w-24 rounded-full bg-muted" />
              </div>
            </div>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchSkeleton;