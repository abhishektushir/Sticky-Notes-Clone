import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";

function CreateNoteDialog({ onCreateNote }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onCreateNote(content.trim());
      setContent("");
      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-9 text-sm gap-1">
          <Plus className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">New Note</span>
          <span className="sm:hidden">New</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md w-[95vw] max-w-[425px] mx-auto">
        <DialogHeader>
          <DialogTitle>Create New Note</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[160px] sm:min-h-[200px] resize-none text-base"
            autoFocus
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="h-10 px-4 text-sm">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!content.trim()}
              className="h-10 px-4 text-sm">
              Create Note
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateNoteDialog;
