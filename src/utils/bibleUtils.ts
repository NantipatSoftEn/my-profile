import bibleData from '../assets/thaikjv.json'
import type {
    BibleVerse,
    BibleBook,
    BibleNote,
    ThaiKJVData,
} from '../types/bible'

// Type assertion to ensure correct typing
const typedBibleData = bibleData as ThaiKJVData

// รับรายการหนังสือทั้งหมดในพระคัมภีร
export function getBibleBooks(): BibleBook[] {
    const books = new Map<number, BibleBook>()

    for (const verse of typedBibleData.verses) {
        if (!books.has(verse.book)) {
            books.set(verse.book, {
                name: verse.book_name,
                book_id: verse.book,
                chapters: [],
            })
        }

        const book = books.get(verse.book)!
        if (!book.chapters.includes(verse.chapter)) {
            book.chapters.push(verse.chapter)
        }
    }

    // เรียงลำดับบทในแต่ละหนังสือ
    for (const book of books.values()) {
        book.chapters.sort((a, b) => a - b)
    }

    return Array.from(books.values()).sort((a, b) => a.book_id - b.book_id)
}

// รับข้อมูลบททั้งหมดในหนังสือที่กำหนด
export function getChaptersByBook(bookId: number): number[] {
    const chapters = new Set<number>()

    for (const verse of typedBibleData.verses) {
        if (verse.book === bookId) {
            chapters.add(verse.chapter)
        }
    }

    return Array.from(chapters).sort((a, b) => a - b)
}

// รับข้อพระคัมภีรในบทที่กำหนด
export function getVersesByChapter(
    bookId: number,
    chapter: number
): BibleVerse[] {
    return typedBibleData.verses
        .filter(
            (verse: BibleVerse) =>
                verse.book === bookId && verse.chapter === chapter
        )
        .sort((a: BibleVerse, b: BibleVerse) => a.verse - b.verse)
}

// รับข้อพระคัมภีรเฉพาะข้อ
export function getSpecificVerse(
    bookId: number,
    chapter: number,
    verse: number
): BibleVerse | undefined {
    return typedBibleData.verses.find(
        (v: BibleVerse) =>
            v.book === bookId && v.chapter === chapter && v.verse === verse
    )
}

// ค้นหาข้อพระคัมภีรจากข้อความ
export function searchVerses(query: string): BibleVerse[] {
    const searchTerm = query.toLowerCase().trim()

    if (!searchTerm) return []

    return typedBibleData.verses.filter(
        (verse: BibleVerse) =>
            verse.text.toLowerCase().includes(searchTerm) ||
            verse.book_name.toLowerCase().includes(searchTerm)
    )
}

// จัดการโน้ตพระคัมภีร (ใช้ JSON File API)
export class BibleNotesManager {
    private static readonly API_ENDPOINT = '/api/bible-notes'

    static async getNotes(): Promise<BibleNote[]> {
        try {
            const response = await fetch(this.API_ENDPOINT)
            if (!response.ok) return []
            
            const notes = await response.json()
            return notes.map((note: any) => ({
                ...note,
                created: new Date(note.created),
                updated: new Date(note.updated),
            }))
        } catch (error) {
            console.error('Error fetching notes:', error)
            return []
        }
    }

    static async saveNote(
        note: Omit<BibleNote, 'id' | 'created' | 'updated'>
    ): Promise<BibleNote | null> {
        try {
            const response = await fetch(this.API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(note),
            })

            if (!response.ok) return null
            
            const newNote = await response.json()
            return {
                ...newNote,
                created: new Date(newNote.created),
                updated: new Date(newNote.updated),
            }
        } catch (error) {
            console.error('Error saving note:', error)
            return null
        }
    }

    static async updateNote(
        id: string,
        updates: { note: string }
    ): Promise<BibleNote | null> {
        try {
            const response = await fetch(this.API_ENDPOINT, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, ...updates }),
            })

            if (!response.ok) return null
            
            const updatedNote = await response.json()
            return {
                ...updatedNote,
                created: new Date(updatedNote.created),
                updated: new Date(updatedNote.updated),
            }
        } catch (error) {
            console.error('Error updating note:', error)
            return null
        }
    }

    static async deleteNote(id: string): Promise<boolean> {
        try {
            const response = await fetch(this.API_ENDPOINT, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            })

            return response.ok
        } catch (error) {
            console.error('Error deleting note:', error)
            return false
        }
    }

    static async getNotesByVerse(
        bookId: number,
        chapter: number,
        verse: number
    ): Promise<BibleNote[]> {
        try {
            const url = `${this.API_ENDPOINT}?bookId=${bookId}&chapter=${chapter}&verse=${verse}`
            const response = await fetch(url)
            if (!response.ok) return []
            
            const notes = await response.json()
            return notes.map((note: any) => ({
                ...note,
                created: new Date(note.created),
                updated: new Date(note.updated),
            }))
        } catch (error) {
            console.error('Error fetching verse notes:', error)
            return []
        }
    }

    static async getNotesByChapter(bookId: number, chapter: number): Promise<BibleNote[]> {
        try {
            const url = `${this.API_ENDPOINT}?bookId=${bookId}&chapter=${chapter}`
            const response = await fetch(url)
            if (!response.ok) return []
            
            const notes = await response.json()
            return notes.map((note: any) => ({
                ...note,
                created: new Date(note.created),
                updated: new Date(note.updated),
            }))
        } catch (error) {
            console.error('Error fetching chapter notes:', error)
            return []
        }
    }

    // Legacy method for backward compatibility
    static getNotesSync(): BibleNote[] {
        // Return empty array since async is required
        console.warn('getNotesSync is deprecated. Use getNotes() instead.')
        return []
    }
}

// ฟังก์ชันสำหรับการอ้างอิง
export function formatVerseReference(
    bookName: string,
    chapter: number,
    verse?: number
): string {
    if (verse) {
        return `${bookName} ${chapter}:${verse}`
    }
    return `${bookName} ${chapter}`
}

// ฟังก์ชันสำหรับการแปลง book name เป็น book id
export function getBookIdByName(bookName: string): number | undefined {
    const verse = typedBibleData.verses.find(
        (v: BibleVerse) => v.book_name === bookName
    )
    return verse?.book
}

// ฟังก์ชันสำหรับการแปลง book id เป็น book name
export function getBookNameById(bookId: number): string | undefined {
    const verse = typedBibleData.verses.find(
        (v: BibleVerse) => v.book === bookId
    )
    return verse?.book_name
}
