import React from 'react'
import { Card, CardContent } from '../ui/card'
import { FileText } from 'lucide-react'
import CreateNoteDialog from './CreateNoteDialog'

function FirstInteraction({onCreateNote,isFirstTime}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-8 pb-8 px-6">
          <FileText className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 text-muted-foreground" />
          {isFirstTime ? (
            <>
              <h3 className="mb-3 text-lg sm:text-xl">Welcome to NoteKeeper!</h3>
              <p className="text-muted-foreground mb-6 text-sm sm:text-base leading-relaxed">
                Get started by creating your first note. You can write single-line reminders or multi-line thoughts.
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-3 text-lg sm:text-xl">No notes found</h3>
              <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                Create your first note to get started.
              </p>
            </>
          )}
          <div className="flex justify-center">
            <CreateNoteDialog onCreateNote={onCreateNote} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FirstInteraction