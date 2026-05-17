"use client";

import * as React from "react";
import Link from "next/link";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Pagination({ className, ...props }) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }) {
  return <li data-slot="pagination-item" {...props} />;
}

/* ✅ Correction principale : on force href à être requis */
function PaginationLink({
  href,
  className,
  isActive,
  size = "icon",
  children,
}) {
  if (!href) return null; // évite l’erreur de Next.js

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        isActive
          ? "bg-white text-black hover:bg-white hover:text-black" // ✅ bouton actif lisible
          : "text-white hover:bg-white hover:text-black",
        className
      )}
    >
      {children}
    </Link>
  );
}

function PaginationPrevious({ href, className }) {
  return (
    <PaginationLink
      href={href}
      aria-label="Page précédente"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Précédent</span>
    </PaginationLink>
  );
}

function PaginationNext({ href, className }) {
  return (
    <PaginationLink
      href={href}
      aria-label="Page suivante"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
    >
      <span className="hidden sm:block">Suivant</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">Plus de pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
