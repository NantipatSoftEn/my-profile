import React, { useState, useEffect } from 'react'
import type { BibleVerse, BibleBook, BibleNote } from '../types/bible'
import {
    getBibleBooks,
    getChaptersByBook,
    getVersesByChapter,
    searchVerses,
    BibleNotesManager,
    formatVerseReference,
} from '@utils/bibleUtils'

interface BibleReaderProps {
    className?: string
}

const BibleReader: React.FC<BibleReaderProps> = ({ className = '' }) => {
    const [books] = useState<BibleBook[]>(getBibleBooks())
    const [selectedBook, setSelectedBook] = useState<number | null>(null)
    const [selectedChapter, setSelectedChapter] = useState<number | null>(null)
    const [chapters, setChapters] = useState<number[]>([])
    const [verses, setVerses] = useState<BibleVerse[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<BibleVerse[]>([])
    const [activeTab, setActiveTab] = useState<'read' | 'search' | 'notes'>(
        'read'
    )
    const [notes, setNotes] = useState<BibleNote[]>([])
    const [newNote, setNewNote] = useState('')
    const [selectedVerse, setSelectedVerse] = useState<BibleVerse | null>(null)
    const [showNoteModal, setShowNoteModal] = useState(false)

    // อัพเดทบทเมื่อเลือกหนังสือ
    useEffect(() => {
        if (selectedBook) {
            const bookChapters = getChaptersByBook(selectedBook)
            setChapters(bookChapters)
            setSelectedChapter(bookChapters[0] || null)
        }
    }, [selectedBook])

    // อัพเดทข้อเมื่อเลือกบท
    useEffect(() => {
        if (selectedBook && selectedChapter) {
            const chapterVerses = getVersesByChapter(
                selectedBook,
                selectedChapter
            )
            setVerses(chapterVerses)
        }
    }, [selectedBook, selectedChapter])

    // ค้นหาข้อพระคัมภีร
    useEffect(() => {
        if (searchQuery.trim()) {
            const results = searchVerses(searchQuery)
            setSearchResults(results.slice(0, 50)) // จำกัดผลลัพธ์ไม่เกิน 50 รายการ
        } else {
            setSearchResults([])
        }
    }, [searchQuery])

    // Load notes on component mount
    useEffect(() => {
        const loadNotes = async () => {
            const fetchedNotes = await BibleNotesManager.getNotes()
            setNotes(fetchedNotes)
        }
        loadNotes()
    }, [])

    const handleAddNote = async () => {
        if (selectedVerse && newNote.trim()) {
            const savedNote = await BibleNotesManager.saveNote({
                bookId: selectedVerse.book,
                bookName: selectedVerse.book_name,
                chapter: selectedVerse.chapter,
                verse: selectedVerse.verse,
                note: newNote.trim(),
            })
            
            if (savedNote) {
                const updatedNotes = await BibleNotesManager.getNotes()
                setNotes(updatedNotes)
                setNewNote('')
                setShowNoteModal(false)
                setSelectedVerse(null)
            }
        }
    }

    const handleDeleteNote = async (noteId: string) => {
        const success = await BibleNotesManager.deleteNote(noteId)
        if (success) {
            const updatedNotes = await BibleNotesManager.getNotes()
            setNotes(updatedNotes)
        }
    }

    const openNoteModal = (verse: BibleVerse) => {
        setSelectedVerse(verse)
        setShowNoteModal(true)
    }

    const getVerseNotes = (bookId: number, chapter: number, verse: number) => {
        return notes.filter(
            note =>
                note.bookId === bookId &&
                note.chapter === chapter &&
                note.verse === verse
        )
    }

    return (
        <div className={`bible-reader ${className}`}>
            {/* Tab Navigation */}
            <div className="mb-6">
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg tabs overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('read')}
                        className={`px-4 py-2 rounded-md transition-colors tab-button ${
                            activeTab === 'read'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:text-blue-600'
                        }`}
                    >
                        อ่านพระคัมภีร
                    </button>
                    <button
                        onClick={() => setActiveTab('search')}
                        className={`px-4 py-2 rounded-md transition-colors tab-button ${
                            activeTab === 'search'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:text-blue-600'
                        }`}
                    >
                        ค้นหา
                    </button>
                    <button
                        onClick={() => setActiveTab('notes')}
                        className={`px-4 py-2 rounded-md transition-colors tab-button ${
                            activeTab === 'notes'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:text-blue-600'
                        }`}
                    >
                        โน้ต ({notes.length})
                    </button>
                </div>
            </div>

            {/* Read Tab */}
            {activeTab === 'read' && (
                <div className="space-y-6">
                    {/* Book and Chapter Selectors */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Book Selector */}
                        <div>
                            <label
                                htmlFor="book-select"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                เลือกหนังสือ
                            </label>
                            <select
                                id="book-select"
                                value={selectedBook || ''}
                                onChange={e =>
                                    setSelectedBook(
                                        Number(e.target.value) || null
                                    )
                                }
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">-- เลือกหนังสือ --</option>
                                {books.map(book => (
                                    <option
                                        key={book.book_id}
                                        value={book.book_id}
                                    >
                                        {book.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Chapter Selector */}
                        <div>
                            <label
                                htmlFor="chapter-select"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                เลือกบท
                            </label>
                            <select
                                id="chapter-select"
                                value={selectedChapter || ''}
                                onChange={e =>
                                    setSelectedChapter(
                                        Number(e.target.value) || null
                                    )
                                }
                                disabled={!selectedBook}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                            >
                                <option value="">-- เลือกบท --</option>
                                {chapters.map(chapter => (
                                    <option key={chapter} value={chapter}>
                                        บทที่ {chapter}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Verses Display */}
                    {verses.length > 0 && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">
                                {verses[0]?.book_name} บทที่ {selectedChapter}
                            </h2>
                            <div className="space-y-3">
                                {verses.map(verse => {
                                    const verseNotes = getVerseNotes(
                                        verse.book,
                                        verse.chapter,
                                        verse.verse
                                    )
                                    return (
                                        <div
                                            key={`${verse.book}-${verse.chapter}-${verse.verse}`}
                                            className="group relative verse-container"
                                        >
                                            <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-gray-50">
                                                <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                                                    {verse.verse}
                                                </span>
                                                <div className="flex-1">
                                                    <p className="text-gray-800 leading-relaxed verse-text">
                                                        {verse.text}
                                                    </p>
                                                    {verseNotes.length > 0 && (
                                                        <div className="mt-2 space-y-1">
                                                            {verseNotes.map(
                                                                note => (
                                                                    <div
                                                                        key={
                                                                            note.id
                                                                        }
                                                                        className="bg-yellow-50 border-l-4 border-yellow-400 p-2 rounded"
                                                                    >
                                                                        <p className="text-sm text-gray-700">
                                                                            {
                                                                                note.note
                                                                            }
                                                                        </p>
                                                                        <div className="flex justify-between items-center mt-1">
                                                                            <span className="text-xs text-gray-500">
                                                                                {note.updated.toLocaleDateString(
                                                                                    'th-TH'
                                                                                )}
                                                                            </span>
                                                                            <button
                                                                                onClick={() =>
                                                                                    handleDeleteNote(
                                                                                        note.id
                                                                                    )
                                                                                }
                                                                                className="text-xs text-red-600 hover:text-red-800"
                                                                            >
                                                                                ลบ
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        openNoteModal(verse)
                                                    }
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 hover:text-blue-800 text-sm"
                                                >
                                                    + โน้ต
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Search Tab */}
            {activeTab === 'search' && (
                <div className="space-y-6">
                    <div>
                        <label
                            htmlFor="search-input"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            ค้นหาข้อพระคัมภีร
                        </label>
                        <input
                            id="search-input"
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="พิมพ์คำที่ต้องการค้นหา..."
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {searchResults.length > 0 && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                ผลการค้นหา ({searchResults.length} รายการ)
                            </h3>
                            <div className="space-y-4">
                                {searchResults.map(verse => (
                                    <div
                                        key={`${verse.book}-${verse.chapter}-${verse.verse}`}
                                        className="border-b border-gray-200 pb-4 last:border-b-0"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-medium text-blue-600">
                                                {formatVerseReference(
                                                    verse.book_name,
                                                    verse.chapter,
                                                    verse.verse
                                                )}
                                            </h4>
                                            <button
                                                onClick={() =>
                                                    openNoteModal(verse)
                                                }
                                                className="text-sm text-gray-500 hover:text-blue-600"
                                            >
                                                + โน้ต
                                            </button>
                                        </div>
                                        <p className="text-gray-800">
                                            {verse.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Notes Tab */}
            {activeTab === 'notes' && (
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            โน้ตทั้งหมด ({notes.length} รายการ)
                        </h3>
                        {notes.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">
                                ยังไม่มีโน้ต
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {notes
                                    .toSorted(
                                        (a, b) =>
                                            b.updated.getTime() -
                                            a.updated.getTime()
                                    )
                                    .map(note => (
                                        <div
                                            key={note.id}
                                            className="border rounded-lg p-4"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-medium text-blue-600">
                                                    {formatVerseReference(
                                                        note.bookName,
                                                        note.chapter,
                                                        note.verse
                                                    )}
                                                </h4>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteNote(
                                                            note.id
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-800 text-sm"
                                                >
                                                    ลบ
                                                </button>
                                            </div>
                                            <p className="text-gray-800 mb-2">
                                                {note.note}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                อัพเดทล่าสุด:{' '}
                                                {note.updated.toLocaleDateString(
                                                    'th-TH'
                                                )}{' '}
                                                {note.updated.toLocaleTimeString(
                                                    'th-TH'
                                                )}
                                            </p>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Note Modal */}
            {showNoteModal && selectedVerse && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            เพิ่มโน้ตสำหรับ{' '}
                            {formatVerseReference(
                                selectedVerse.book_name,
                                selectedVerse.chapter,
                                selectedVerse.verse
                            )}
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm bg-gray-50 p-3 rounded">
                            {selectedVerse.text}
                        </p>
                        <textarea
                            value={newNote}
                            onChange={e => setNewNote(e.target.value)}
                            placeholder="เขียนโน้ตของคุณ..."
                            rows={4}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
                        />
                        <div className="flex space-x-3">
                            <button
                                onClick={handleAddNote}
                                disabled={!newNote.trim()}
                                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                บันทึก
                            </button>
                            <button
                                onClick={() => {
                                    setShowNoteModal(false)
                                    setSelectedVerse(null)
                                    setNewNote('')
                                }}
                                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                            >
                                ยกเลิก
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BibleReader
