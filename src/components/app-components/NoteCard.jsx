import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Edit3, Save, Trash2, X } from "lucide-react";

function NoteCard({ note, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(note.content);

  const handleSave = () => {
    if (editContent.trim()) {
      onUpdate(note.id, editContent.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditContent(note.content);
    setIsEditing(false);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInHours < 24 * 7) {
      return date.toLocaleDateString([], {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };
  return (
    <Card className="h-fit transition-shadow hover:shadow-md">
      <CardContent className="pt-4 px-4">
        {isEditing ? (
          <Textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="min-h-[120px] sm:min-h-[100px] resize-none text-base"
            placeholder="Write your note..."
            autoFocus
          />
        ) : (
          <div className="min-h-[120px] sm:min-h-[100px] whitespace-pre-wrap break-words text-sm sm:text-base leading-relaxed">
            {note.content}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2 px-4 pb-4">
        <span className="text-xs sm:text-sm text-muted-foreground">
          {formatDate(note.updatedAt)}
        </span>
        <div className="flex gap-1 sm:gap-2">
          {isEditing ? (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={handleSave}
                disabled={!editContent.trim()}
                className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3">
                <Save className="h-4 w-4" />
                <span className="hidden sm:inline sm:ml-1">Save</span>
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancel}
                className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3">
                <X className="h-4 w-4" />
                <span className="hidden sm:inline sm:ml-1">Cancel</span>
              </Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3">
                <Edit3 className="h-4 w-4" />
                <span className="hidden sm:inline sm:ml-1">Edit</span>
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDelete(note.id)}
                className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3 text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline sm:ml-1">Delete</span>
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

export default NoteCard;
