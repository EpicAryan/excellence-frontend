'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function CustomPagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: CustomPaginationProps) {
  return (
    <Pagination>
      <PaginationContent className="text-white">
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => onPageChange(currentPage - 1)}
              className="cursor-pointer border border-[#6544A3] text-[#B091EA] hover:bg-[#6544A3]/70 hover:text-white" 
            />
          </PaginationItem>
        )}
        
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          const pageNumber = i + 1;
          // Show first page, last page, current page, and pages around current
          const shouldShowPage = 
            pageNumber === 1 || 
            pageNumber === totalPages || 
            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);
          
          if (shouldShowPage) {
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink 
                  onClick={() => onPageChange(pageNumber)}
                  isActive={currentPage === pageNumber}
                  className={`cursor-pointer ${
                    currentPage === pageNumber 
                      ? 'bg-[#6544A3] text-white' 
                      : 'text-[#B091EA] hover:bg-[#6544A3]/70 hover:text-white border border-[#6544A3]'
                  }`}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          } else if (
            (pageNumber === 2 && currentPage > 3) || 
            (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
          ) {
            return (
              <PaginationItem key={pageNumber}>
                <PaginationEllipsis className="text-[#B091EA]" />
              </PaginationItem>
            );
          }
          return null;
        })}
        
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext 
              onClick={() => onPageChange(currentPage + 1)}
              className="cursor-pointer border border-[#6544A3] text-[#B091EA] hover:bg-[#6544A3]/70 hover:text-white" 
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
