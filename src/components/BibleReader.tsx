import React, { useState, useEffect } from 'react'
import type { BibleVerse, BibleBook, BibleNote } from '../types/bible'
import {
    getBibleBooks,
    getChaptersByBook,
    getBilingualVersesByChapter,
    searchBilingualVerses,
    BibleNotesManager,
    formatVerseReference,
} from '@utils/bibleUtils'
import { renderTextWithStrongsTooltips } from '@utils/strongsHelper'

interface BibleReaderProps {
    className?: string
    bookStudyNotes?: Record<number, string>
}

const BibleReader: React.FC<BibleReaderProps> = ({ className = '', bookStudyNotes = {} }) => {
    const [books] = useState<BibleBook[]>(getBibleBooks())
    const [selectedBook, setSelectedBook] = useState<number | null>(null)
    const [bookInputValue, setBookInputValue] = useState('')
    const [showBookSuggestions, setShowBookSuggestions] = useState(false)
    const [selectedChapter, setSelectedChapter] = useState<number | null>(null)
    const [chapterInputValue, setChapterInputValue] = useState('')
    const [showChapterSuggestions, setShowChapterSuggestions] = useState(false)
    const [chapters, setChapters] = useState<number[]>([])
    const [verses, setVerses] = useState<BibleVerse[]>([])
    const [englishVerses, setEnglishVerses] = useState<BibleVerse[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<BibleVerse[]>([])
    const [englishSearchResults, setEnglishSearchResults] = useState<BibleVerse[]>([])
    const [showBilingual, setShowBilingual] = useState(false)
    const [activeTab, setActiveTab] = useState<'read' | 'search' | 'notes' | 'study'>(
        'read'
    )
    const [notes, setNotes] = useState<BibleNote[]>([])
    const [newNote, setNewNote] = useState('')
    const [selectedVerse, setSelectedVerse] = useState<BibleVerse | null>(null)
    const [showNoteModal, setShowNoteModal] = useState(false)

    const filteredBooks = bookInputValue.trim()
        ? books.filter(book =>
              book.name.toLowerCase().includes(bookInputValue.toLowerCase())
          )
        : books

    const filteredChapters = chapterInputValue.trim()
        ? chapters.filter(ch =>
              String(ch).includes(chapterInputValue.trim())
          )
        : chapters

    // อัพเดทบทเมื่อเลือกหนังสือ
    useEffect(() => {
        if (selectedBook) {
            const bookChapters = getChaptersByBook(selectedBook)
            setChapters(bookChapters)
            const firstChapter = bookChapters[0] || null
            setSelectedChapter(firstChapter)
            setChapterInputValue(firstChapter ? String(firstChapter) : '')
        } else {
            setChapters([])
            setSelectedChapter(null)
            setChapterInputValue('')
        }
    }, [selectedBook])

    // อัพเดทข้อเมื่อเลือกบท
    useEffect(() => {
        if (selectedBook && selectedChapter) {
            const bilingualVerses = getBilingualVersesByChapter(
                selectedBook,
                selectedChapter
            )
            setVerses(bilingualVerses.thai)
            setEnglishVerses(bilingualVerses.english)
        }
    }, [selectedBook, selectedChapter])

    // ค้นหาข้อพระคัมภีร
    useEffect(() => {
        if (searchQuery.trim()) {
            const bilingualResults = searchBilingualVerses(searchQuery)
            setSearchResults(bilingualResults.thai.slice(0, 50)) // จำกัดผลลัพธ์ไม่เกิน 50 รายการ
            setEnglishSearchResults(bilingualResults.english.slice(0, 50))
        } else {
            setSearchResults([])
            setEnglishSearchResults([])
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
                <div className="flex space-x-1 bg-skin-card p-1 rounded-lg tabs overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('read')}
                        className={`px-4 py-2 rounded-md transition-colors tab-button ${
                            activeTab === 'read'
                                ? 'bg-skin-accent text-skin-inverted'
                                : 'text-skin-base/70 hover:text-skin-accent'
                        }`}
                    >
                        อ่านพระคัมภีร
                    </button>
                    <button
                        onClick={() => setActiveTab('search')}
                        className={`px-4 py-2 rounded-md transition-colors tab-button ${
                            activeTab === 'search'
                                ? 'bg-skin-accent text-skin-inverted'
                                : 'text-skin-base/70 hover:text-skin-accent'
                        }`}
                    >
                        ค้นหา
                    </button>
                    <button
                        onClick={() => setActiveTab('study')}
                        className={`px-4 py-2 rounded-md transition-colors tab-button ${
                            activeTab === 'study'
                                ? 'bg-skin-accent text-skin-inverted'
                                : 'text-skin-base/70 hover:text-skin-accent'
                        }`}
                    >
                        บริบทเล่ม
                    </button>
                    {/* <button
                        onClick={() => setActiveTab('notes')}
                        className={`px-4 py-2 rounded-md transition-colors tab-button ${
                            activeTab === 'notes'
                                ? 'bg-skin-accent text-skin-inverted'
                                : 'text-skin-base/70 hover:text-skin-accent'
                        }`}
                    >
                        โน้ต ({notes.length})
                    </button> */}
                </div>

                {/* Language Toggle */}
                <div className="flex items-center justify-center mt-4 space-x-4">
                    <span className="text-sm text-skin-base/70">ภาษา:</span>
                    <div className="flex bg-skin-card rounded-lg p-1">
                        <button
                            onClick={() => setShowBilingual(false)}
                            className={`px-3 py-1 rounded-md text-sm transition-colors ${
                                showBilingual === false
                                    ? 'bg-skin-fill text-skin-base shadow'
                                    : 'text-skin-base/70 hover:text-skin-base'
                            }`}
                        >
                            ไทย
                        </button>
                        <button
                            onClick={() => setShowBilingual(true)}
                            className={`px-3 py-1 rounded-md text-sm transition-colors ${
                                showBilingual
                                    ? 'bg-skin-fill text-skin-base shadow'
                                    : 'text-skin-base/70 hover:text-skin-base'
                            }`}
                        >
                            ไทย + English
                        </button>
                    </div>
                </div>
            </div>

            {/* Read Tab */}
            {activeTab === 'read' && (
                <div className="space-y-6 w-full">
                    {/* Book and Chapter Selectors */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {/* Book Autocomplete */}
                        <div className="relative">
                            <label
                                htmlFor="book-input"
                                className="block text-sm font-medium text-skin-base mb-2"
                            >
                                เลือกหนังสือ
                            </label>
                            <input
                                id="book-input"
                                type="text"
                                value={bookInputValue}
                                onChange={e => {
                                    setBookInputValue(e.target.value)
                                    setSelectedBook(null)
                                    setShowBookSuggestions(true)
                                }}
                                onFocus={() => setShowBookSuggestions(true)}
                                onBlur={() =>
                                    setTimeout(
                                        () => setShowBookSuggestions(false),
                                        150
                                    )
                                }
                                placeholder="พิมพ์ชื่อหนังสือ..."
                                autoComplete="off"
                                className="w-full p-3 border border-skin-line bg-skin-fill text-skin-base placeholder:text-skin-base/50 rounded-md focus:ring-2 focus:ring-skin-accent focus:border-skin-accent"
                            />
                            {showBookSuggestions &&
                                filteredBooks.length > 0 && (
                                    <ul className="absolute z-10 w-full bg-skin-fill border border-skin-line text-skin-base rounded-md shadow-lg max-h-60 overflow-auto mt-1">
                                        {filteredBooks.map(book => (
                                            <li
                                                key={book.book_id}
                                                onMouseDown={() => {
                                                    setSelectedBook(
                                                        book.book_id
                                                    )
                                                    setBookInputValue(book.name)
                                                    setShowBookSuggestions(
                                                        false
                                                    )
                                                }}
                                                className={`px-4 py-2 cursor-pointer hover:bg-skin-accent/10 ${
                                                    selectedBook ===
                                                    book.book_id
                                                        ? 'bg-skin-accent/20 font-medium'
                                                        : ''
                                                }`}
                                            >
                                                {book.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                        </div>

                        {/* Chapter Autocomplete */}
                        <div className="relative">
                            <label
                                htmlFor="chapter-input"
                                className="block text-sm font-medium text-skin-base mb-2"
                            >
                                เลือกบท
                            </label>
                            <input
                                id="chapter-input"
                                type="text"
                                value={chapterInputValue}
                                onChange={e => {
                                    setChapterInputValue(e.target.value)
                                    setSelectedChapter(null)
                                    setShowChapterSuggestions(true)
                                }}
                                onFocus={() => setShowChapterSuggestions(true)}
                                onBlur={() =>
                                    setTimeout(
                                        () => setShowChapterSuggestions(false),
                                        150
                                    )
                                }
                                disabled={!selectedBook}
                                placeholder="พิมพ์เลขบท..."
                                autoComplete="off"
                                className="w-full p-3 border border-skin-line bg-skin-fill text-skin-base placeholder:text-skin-base/50 rounded-md focus:ring-2 focus:ring-skin-accent focus:border-skin-accent disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            {showChapterSuggestions &&
                                filteredChapters.length > 0 && (
                                    <ul className="absolute z-10 w-full bg-skin-fill border border-skin-line text-skin-base rounded-md shadow-lg max-h-60 overflow-auto mt-1">
                                        {filteredChapters.map(chapter => (
                                            <li
                                                key={chapter}
                                                onMouseDown={() => {
                                                    setSelectedChapter(chapter)
                                                    setChapterInputValue(
                                                        String(chapter)
                                                    )
                                                    setShowChapterSuggestions(
                                                        false
                                                    )
                                                }}
                                                className={`px-4 py-2 cursor-pointer hover:bg-skin-accent/10 ${
                                                    selectedChapter === chapter
                                                        ? 'bg-skin-accent/20 font-medium'
                                                        : ''
                                                }`}
                                            >
                                                บทที่ {chapter}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                        </div>
                    </div>

                    {/* Verses Display */}
                    {verses.length > 0 && (
                        <div className="bg-skin-card rounded-lg shadow-md p-8 w-full">
                            <h2 className="text-xl font-bold text-skin-base mb-4">
                                {verses[0]?.book_name} บทที่ {selectedChapter}
                            </h2>
                            <div className="space-y-3">
                                {verses.map((verse, index) => {
                                    const verseNotes = getVerseNotes(
                                        verse.book,
                                        verse.chapter,
                                        verse.verse
                                    )
                                    const englishVerse = englishVerses[index]
                                    
                                    return (
                                        <div
                                            key={`${verse.book}-${verse.chapter}-${verse.verse}`}
                                            className="group relative verse-container"
                                        >
                                            <div className="flex items-start space-x-4 p-4 rounded-md hover:bg-skin-accent/10 w-full">
                                                <span className="flex-shrink-0 w-10 h-10 bg-skin-accent/20 text-skin-accent rounded-full flex items-center justify-center text-sm font-medium">
                                                    {verse.verse}
                                                </span>
                                                <div className="flex-1 min-w-0 w-full">
                                                    <div className={showBilingual ? "space-y-3" : ""}>
                                                        <p className="text-skin-base leading-relaxed verse-text text-lg">
                                                            {verse.text}
                                                        </p>
                                                        {englishVerse && (
                                                            <p className={`leading-relaxed verse-text text-lg ${showBilingual ? 'text-skin-base/80 italic border-l-4 border-skin-accent/40 pl-4 bg-skin-accent/10 p-3 rounded-r mt-3' : 'text-skin-accent mt-2'}`}>
                                                                {showBilingual && renderTextWithStrongsTooltips(englishVerse.text)}
                                                            </p>
                                                        )}
                                                    </div>
                                                    {verseNotes.length > 0 && (
                                                        <div className="mt-2 space-y-1">
                                                            {verseNotes.map(
                                                                note => (
                                                                    <div
                                                                        key={
                                                                            note.id
                                                                        }
                                                                        className="bg-yellow-50 dark:bg-yellow-500/10 border-l-4 border-yellow-400 dark:border-yellow-500/60 p-2 rounded"
                                                                    >
                                                                        <p className="text-sm text-skin-base/90">
                                                                            {
                                                                                note.note
                                                                            }
                                                                        </p>
                                                                        <div className="flex justify-between items-center mt-1">
                                                                            <span className="text-xs text-skin-base/60">
                                                                                {note.updated.toLocaleDateString(
                                                                                    'th-TH'
                                                                                )}
                                                                            </span>
                                                                            {/* <button
                                                                                onClick={() =>
                                                                                    handleDeleteNote(
                                                                                        note.id
                                                                                    )
                                                                                }
                                                                                className="text-xs text-red-600 hover:text-red-800"
                                                                            >
                                                                                ลบ
                                                                            </button> */}
                                                                        </div>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                {/* <button
                                                    onClick={() =>
                                                        openNoteModal(verse)
                                                    }
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity text-skin-accent hover:text-skin-accent/80 text-sm"
                                                >
                                                    + โน้ต
                                                </button> */}
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
                            className="block text-sm font-medium text-skin-base mb-2"
                        >
                            ค้นหาข้อพระคัมภีร
                        </label>
                        <input
                            id="search-input"
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="พิมพ์คำที่ต้องการค้นหา..."
                            className="w-full p-3 border border-skin-line bg-skin-fill text-skin-base placeholder:text-skin-base/50 rounded-md focus:ring-2 focus:ring-skin-accent focus:border-skin-accent"
                        />
                    </div>

                    {searchResults.length > 0 && (
                        <div className="bg-skin-card rounded-lg shadow-md p-8 w-full">
                            <h3 className="text-xl font-semibold text-skin-base mb-6">
                                ผลการค้นหา ({searchResults.length} รายการ)
                            </h3>
                            <div className="space-y-6">
                                {searchResults.map((verse, index) => {
                                    const englishVerse = englishSearchResults[index]
                                    
                                    return (
                                        <div
                                            key={`${verse.book}-${verse.chapter}-${verse.verse}`}
                                            className="border-b border-skin-line pb-4 last:border-b-0"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-medium text-skin-accent">
                                                    {formatVerseReference(
                                                        verse.book_name,
                                                        verse.chapter,
                                                        verse.verse
                                                    )}
                                                </h4>
                                                {/* <button
                                                    onClick={() =>
                                                        openNoteModal(verse)
                                                    }
                                                    className="text-sm text-skin-base/60 hover:text-skin-accent"
                                                >
                                                    + โน้ต
                                                </button> */}
                                            </div>
                                            <div className={showBilingual ? "space-y-3" : ""}>
                                                <p className="text-skin-base text-lg leading-relaxed">
                                                    {verse.text}
                                                </p>
                                                {englishVerse && (
                                                    <p className={`text-lg leading-relaxed ${showBilingual ? 'text-skin-base/80 italic border-l-4 border-skin-accent/40 pl-4 bg-skin-accent/10 p-3 rounded-r mt-3' : 'text-skin-accent mt-2'}`}>
                                                        {renderTextWithStrongsTooltips(englishVerse.text)}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Study Tab */}
            {activeTab === 'study' && (
                <div className="space-y-6 w-full">
                    {!selectedBook ? (
                        <div className="bg-skin-card rounded-lg shadow-md p-12 text-center">
                            <p className="text-skin-base/70 text-lg">
                                กรุณาเลือกหนังสือก่อน เพื่อดูข้อมูลบริบทเล่ม
                            </p>
                        </div>
                    ) : bookStudyNotes[selectedBook] ? (
                        <div className="bg-skin-card rounded-lg shadow-md p-8 w-full prose max-w-none">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: bookStudyNotes[selectedBook],
                                }}
                            />
                        </div>
                    ) : (
                        <div className="bg-skin-card rounded-lg shadow-md p-12 text-center">
                            <p className="text-skin-base/70 text-lg">
                                ยังไม่มีข้อมูลบริบทสำหรับหนังสือเล่มนี้
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Notes Tab */}
            {activeTab === 'notes' && (                <div className="space-y-6 w-full">
                    <div className="bg-skin-card rounded-lg shadow-md p-8 w-full">
                        <h3 className="text-xl font-semibold text-skin-base mb-6">
                            โน้ตทั้งหมด ({notes.length} รายการ)
                        </h3>
                        {notes.length === 0 ? (
                            <p className="text-skin-base/70 text-center py-8">
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
                                                <h4 className="font-medium text-skin-accent">
                                                    {formatVerseReference(
                                                        note.bookName,
                                                        note.chapter,
                                                        note.verse
                                                    )}
                                                </h4>
                                                {/* <button
                                                    onClick={() =>
                                                        handleDeleteNote(
                                                            note.id
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-800 text-sm"
                                                >
                                                    ลบ
                                                </button> */}
                                            </div>
                                            <p className="text-skin-base mb-2">
                                                {note.note}
                                            </p>
                                            <p className="text-xs text-skin-base/60">
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
                    <div className="bg-skin-card rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold text-skin-base mb-4">
                            เพิ่มโน้ตสำหรับ{' '}
                            {formatVerseReference(
                                selectedVerse.book_name,
                                selectedVerse.chapter,
                                selectedVerse.verse
                            )}
                        </h3>
                        <p className="text-skin-base/80 mb-4 text-sm bg-skin-fill p-3 rounded">
                            {selectedVerse.text}
                        </p>
                        <textarea
                            value={newNote}
                            onChange={e => setNewNote(e.target.value)}
                            placeholder="เขียนโน้ตของคุณ..."
                            rows={4}
                            className="w-full p-3 border border-skin-line bg-skin-fill text-skin-base placeholder:text-skin-base/50 rounded-md focus:ring-2 focus:ring-skin-accent focus:border-skin-accent mb-4"
                        />
                        <div className="flex space-x-3">
                            <button
                                onClick={handleAddNote}
                                disabled={!newNote.trim()}
                                className="flex-1 bg-skin-accent text-skin-inverted px-4 py-2 rounded-md hover:bg-skin-accent/90 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                บันทึก
                            </button>
                            <button
                                onClick={() => {
                                    setShowNoteModal(false)
                                    setSelectedVerse(null)
                                    setNewNote('')
                                }}
                                className="flex-1 border border-skin-line text-skin-base px-4 py-2 rounded-md hover:bg-skin-accent/10"
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
