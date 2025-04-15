'use client'

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
}

export function DeleteConfirmationDialog({ 
  isOpen, 
  setIsOpen, 
  onConfirm 
}: DeleteConfirmationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-[#1E1E1E] text-white border-[#8D6CCB]">
        <DialogHeader>
          <DialogTitle className="text-[#B091EA]">Confirm Deletion</DialogTitle>
          <DialogDescription className="text-gray-400">
            Are you sure you want to delete this topic? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-4">
          <Button 
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="border-[#6544A3] text-[#B091EA] hover:bg-[#6544A3]/20"
          >
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
