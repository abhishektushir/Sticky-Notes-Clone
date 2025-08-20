import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogOut, Menu, Search } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import CreateNoteDialog from "@/components/app-components/CreateNoteDialog";
import FirstInteraction from "@/components/app-components/FirstInteraction";
import NoteCard from "@/components/app-components/NoteCard";
import { Input } from "@/components/ui/input";
import { useAuth0 } from "@auth0/auth0-react";
function NoteDashboard() {
  const { user, logout, isLoading } = useAuth0();
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };
  const createNote = (content) => {
    if (!user?.sub) return;

    const newNote = {
      id: Date.now().toString(),
      content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      userId: user.sub,
    };

    setNotes((prev) => [newNote, ...prev]);
    setIsFirstTime(false);
  };
  const updateNote = (id, content) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, content, updatedAt: Date.now() } : note
      )
    );
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) {
      return notes;
    }

    return notes.filter((note) =>
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [notes, searchQuery]);
  useEffect(() => {
    if (user?.sub) {
      const userNotesKey = `notes_${user.sub}`;
      const savedNotes = localStorage.getItem(userNotesKey);

      if (savedNotes) {
        const parsedNotes = JSON.parse(savedNotes);
        setNotes(parsedNotes);
        setIsFirstTime(parsedNotes.length === 0);
      } else {
        setNotes([]);
        setIsFirstTime(true);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user?.sub) {
      const userNotesKey = `notes_${user.sub}`;
      localStorage.setItem(userNotesKey, JSON.stringify(notes));
    }
  }, [notes, user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <h1 className="text-lg sm:text-xl">NoteKeeper</h1>

              <div className="hidden sm:block">
                <CreateNoteDialog onCreateNote={createNote} />
              </div>
            </div>

            {/* Desktop user info and logout */}
            <div className="hidden sm:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.picture} alt={user.name || "User"} />
                  <AvatarFallback>
                    {user.name?.charAt(0).toUpperCase() ||
                      user.email?.charAt(0).toUpperCase() ||
                      "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="font-medium truncate max-w-32">
                    {user.name || user.email}
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>

            {/* Mobile menu */}
            <div className="flex sm:hidden items-center space-x-2">
              <CreateNoteDialog onCreateNote={createNote} />
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={user.picture}
                          alt={user.name || "User"}
                        />
                        <AvatarFallback>
                          {user.name?.charAt(0).toUpperCase() ||
                            user.email?.charAt(0).toUpperCase() ||
                            "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">
                          {user.name || "Anonymous User"}
                        </div>
                        <div className="text-sm text-muted-foreground truncate">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {notes.length === 0 ? (
          <FirstInteraction
            onCreateNote={createNote}
            isFirstTime={isFirstTime}
          />
        ) : (
          <>
            <div className="mb-4 sm:mb-6">
              <div className="relative max-w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {filteredNotes.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <Search className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="mb-2">No notes found</h3>
                <p className="text-muted-foreground px-4">
                  Try adjusting your search query or create a new note.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-muted-foreground">
                  {filteredNotes.length}{" "}
                  {filteredNotes.length === 1 ? "note" : "notes"} found
                </div>
                <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onUpdate={updateNote}
                      onDelete={deleteNote}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default NoteDashboard;
