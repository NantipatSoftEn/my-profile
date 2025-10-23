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

// จัดการโน้ตพระคัมภีร (ใช้ Local Storage)
export class BibleNotesManager {
    private static readonly STORAGE_KEY = 'bible_notes'

    static getNotes(): BibleNote[] {
        if (globalThis.window === undefined) return []

        const stored = localStorage.getItem(this.STORAGE_KEY)
        if (!stored) return []

        try {
            const notes = JSON.parse(stored)
            return notes.map((note: any) => ({
                ...note,
                created: new Date(note.created),
                updated: new Date(note.updated),
            }))
        } catch {
            return []
        }
    }

    static saveNote(
        note: Omit<BibleNote, 'id' | 'created' | 'updated'>
    ): BibleNote {
        const notes = this.getNotes()
        const newNote: BibleNote = {
            ...note,
            id: Date.now().toString(),
            created: new Date(),
            updated: new Date(),
        }

        notes.push(newNote)
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notes))

        return newNote
    }

    static updateNote(
        id: string,
        updates: Partial<BibleNote>
    ): BibleNote | null {
        const notes = this.getNotes()
        const index = notes.findIndex(note => note.id === id)

        if (index === -1) return null

        notes[index] = {
            ...notes[index],
            ...updates,
            updated: new Date(),
        }

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notes))
        return notes[index]
    }

    static deleteNote(id: string): boolean {
        const notes = this.getNotes()
        const filtered = notes.filter(note => note.id !== id)

        if (filtered.length === notes.length) return false

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered))
        return true
    }

    static getNotesByVerse(
        bookId: number,
        chapter: number,
        verse: number
    ): BibleNote[] {
        return this.getNotes().filter(
            note =>
                note.bookId === bookId &&
                note.chapter === chapter &&
                note.verse === verse
        )
    }

    static getNotesByChapter(bookId: number, chapter: number): BibleNote[] {
        return this.getNotes().filter(
            note => note.bookId === bookId && note.chapter === chapter
        )
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
