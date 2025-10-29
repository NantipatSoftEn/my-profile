import type { APIRoute } from 'astro'
import type { BibleNote } from '../../types/bible'
import fs from 'node:fs/promises'
import path from 'node:path'

const NOTES_FILE_PATH = path.join(process.cwd(), 'src/assets/biblenote.json')

// Helper function to read notes from JSON file
async function readNotes(): Promise<BibleNote[]> {
    try {
        const data = await fs.readFile(NOTES_FILE_PATH, 'utf-8')
        const parsed = JSON.parse(data)
        
        // Handle both single object and array formats
        if (Array.isArray(parsed)) {
            return parsed.map(note => ({
                ...note,
                created: new Date(note.created),
                updated: new Date(note.updated)
            }))
        } else if (parsed && typeof parsed === 'object') {
            // Convert single object to array format
            const noteArray = [{
                ...parsed,
                created: new Date(parsed.created),
                updated: new Date(parsed.updated)
            }]
            
            // Write back as array format
            await fs.writeFile(NOTES_FILE_PATH, JSON.stringify(noteArray, null, 2), 'utf-8')
            return noteArray
        }
        
        return []
    } catch (error) {
        console.error('Error reading notes:', error)
        
        // If file doesn't exist or is invalid, create empty array
        await fs.writeFile(NOTES_FILE_PATH, JSON.stringify([], null, 2), 'utf-8')
        return []
    }
}

// Helper function to write notes to JSON file
async function writeNotes(notes: BibleNote[]): Promise<void> {
    try {
        await fs.writeFile(NOTES_FILE_PATH, JSON.stringify(notes, null, 2), 'utf-8')
    } catch (error) {
        console.error('Error writing notes:', error)
        throw new Error('Failed to save notes')
    }
}

// GET - Get all notes
export const GET: APIRoute = async ({ url }) => {
    try {
        const notes = await readNotes()
        
        // Support filtering by verse
        const bookId = url.searchParams.get('bookId')
        const chapter = url.searchParams.get('chapter')
        const verse = url.searchParams.get('verse')
        
        let filteredNotes = notes
        
        if (bookId) {
            filteredNotes = filteredNotes.filter(note => note.bookId === Number.parseInt(bookId))
        }
        
        if (chapter) {
            filteredNotes = filteredNotes.filter(note => note.chapter === Number.parseInt(chapter))
        }
        
        if (verse) {
            filteredNotes = filteredNotes.filter(note => note.verse === Number.parseInt(verse))
        }
        
        return new Response(JSON.stringify(filteredNotes), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.error('API Error (GET):', error)
        return new Response(JSON.stringify({ error: 'Failed to fetch notes' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}

// POST - Add new note
export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json()
        const { bookId, bookName, chapter, verse, note } = body
        
        if (!bookId || !bookName || !chapter || !verse || !note) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        
        const notes = await readNotes()
        
        const newNote: BibleNote = {
            id: Date.now().toString(),
            bookId: Number.parseInt(bookId),
            bookName,
            chapter: Number.parseInt(chapter),
            verse: Number.parseInt(verse),
            note: note.trim(),
            created: new Date(),
            updated: new Date()
        }
        
        notes.push(newNote)
        await writeNotes(notes)
        
        return new Response(JSON.stringify(newNote), {
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.error('API Error (POST):', error)
        return new Response(JSON.stringify({ error: 'Failed to create note' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}

// PUT - Update existing note
export const PUT: APIRoute = async ({ request }) => {
    try {
        const body = await request.json()
        const { id, note } = body
        
        if (!id || !note) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        
        const notes = await readNotes()
        const index = notes.findIndex(n => n.id === id)
        
        if (index === -1) {
            return new Response(JSON.stringify({ error: 'Note not found' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        
        notes[index] = {
            ...notes[index],
            note: note.trim(),
            updated: new Date()
        }
        
        await writeNotes(notes)
        
        return new Response(JSON.stringify(notes[index]), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.error('API Error (PUT):', error)
        return new Response(JSON.stringify({ error: 'Failed to update note' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}

// DELETE - Delete note
export const DELETE: APIRoute = async ({ request }) => {
    try {
        const body = await request.json()
        const { id } = body
        
        if (!id) {
            return new Response(JSON.stringify({ error: 'Missing note ID' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        
        const notes = await readNotes()
        const filtered = notes.filter(note => note.id !== id)
        
        if (filtered.length === notes.length) {
            return new Response(JSON.stringify({ error: 'Note not found' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        
        await writeNotes(filtered)
        
        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.error('API Error (DELETE):', error)
        return new Response(JSON.stringify({ error: 'Failed to delete note' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}