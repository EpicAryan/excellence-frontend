// components/PopUpCard.tsx
"use client"

import React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ShieldAlert } from "lucide-react"

const PopUpCard = ({ open, setOpen }: { open: boolean; setOpen: (val: boolean) => void }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md rounded-2xl border border-red-500 shadow-xl bg-white dark:bg-zinc-900">
        <DialogHeader>
          <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
            <ShieldAlert className="h-6 w-6" />
            <DialogTitle className="text-lg font-semibold">Disclaimer</DialogTitle>
          </div>
          <DialogDescription className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            This content is strictly for <span className="font-semibold text-black dark:text-white">reading purposes only</span> on this website. <br />
            <br />
            <span className="text-red-600 font-semibold">Do not share, copy, or distribute</span> this content by any means. If such activity is detected, strict actions will be taken.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button onClick={() => setOpen(false)} variant="destructive">
            I Understand
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PopUpCard
