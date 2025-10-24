import { strongsHebrewDictionary } from '@assets/strongs-hebrew-dictionary'

export interface StrongsNumber {
    number: string
    text: string
    definition?: {
        lemma: string
        transliteration: string
        pronunciation: string
        derivation?: string
        strongsDefinition: string
        kjvDefinition?: string
    }
}

/**
 * แยก Strong's numbers จากข้อความ KJV
 * เช่น "In the beginning{H7225} God{H430} created{H1254}{(H8804)}"
 */
export function parseStrongsNumbers(text: string): StrongsNumber[] {
    const strongsNumbers: StrongsNumber[] = []
    
    // Regular expression เพื่อจับ pattern ของ Strong's numbers
    // จับทั้ง word{H1234} และ {(H5678)}
    const strongsPattern = /([^{]*)\{(H\d+)\}(?:\{([^}]*)\})?/g
    let match

    while ((match = strongsPattern.exec(text)) !== null) {
        const [, wordText, strongsNum] = match
        
        const strongsNumber: StrongsNumber = {
            number: strongsNum,
            text: wordText.trim(),
            definition: getStrongsDefinition(strongsNum)
        }

        strongsNumbers.push(strongsNumber)
    }

    return strongsNumbers
}

/**
 * ดึงข้อมูลความหมายจาก Strong's Hebrew Dictionary
 */
export function getStrongsDefinition(strongsNumber: string) {
    const entry = strongsHebrewDictionary[strongsNumber]
    
    if (!entry) {
        return undefined
    }

    return {
        lemma: entry.lemma,
        transliteration: entry.xlit,
        pronunciation: entry.pron,
        derivation: entry.derivation,
        strongsDefinition: entry.strongs_def,
        kjvDefinition: entry.kjv_def
    }
}

/**
 * แปลงข้อความ KJV ให้มี hover tooltips สำหรับ Strong's numbers
 */
export function renderTextWithStrongsTooltips(text: string): JSX.Element[] {
    const elements: JSX.Element[] = []
    let lastIndex = 0
    
    // Regular expression เพื่อจับ pattern ของ Strong's numbers
    const strongsPattern = /([^{]*)\{(H\d+)\}(?:\{([^}]*)\})?/g
    let match
    let elementIndex = 0

    while ((match = strongsPattern.exec(text)) !== null) {
        const [fullMatch, wordText, strongsNum] = match
        const matchStart = match.index
        
        // เพิ่มข้อความที่อยู่ก่อนหน้า Strong's number (ถ้ามี)
        if (matchStart > lastIndex) {
            const beforeText = text.substring(lastIndex, matchStart)
            if (beforeText.trim()) {
                elements.push(
                    <span key={`text-${elementIndex++}`}>{beforeText}</span>
                )
            }
        }

        // เพิ่ม word พร้อม tooltip
        const definition = getStrongsDefinition(strongsNum)
        const cleanedWord = wordText.trim()
        
        if (cleanedWord) {
            elements.push(
                <StrongsTooltip 
                    key={`strongs-${elementIndex++}`}
                    word={cleanedWord}
                    strongsNumber={strongsNum}
                    definition={definition}
                />
            )
        }

        lastIndex = matchStart + fullMatch.length
    }

    // เพิ่มข้อความที่เหลือ (ถ้ามี)
    if (lastIndex < text.length) {
        const remainingText = text.substring(lastIndex)
        if (remainingText.trim()) {
            elements.push(
                <span key={`text-${elementIndex++}`}>{remainingText}</span>
            )
        }
    }

    return elements
}

/**
 * Component สำหรับแสดง tooltip ของ Strong's number
 */
interface StrongsTooltipProps {
    readonly word: string
    readonly strongsNumber: string
    readonly definition?: {
        lemma: string
        transliteration: string
        pronunciation: string
        derivation?: string
        strongsDefinition: string
        kjvDefinition?: string
    }
}

export function StrongsTooltip({ word, strongsNumber, definition }: StrongsTooltipProps) {
    if (!definition) {
        return <span className="strongs-word">{word}</span>
    }

    return (
        <span className="strongs-tooltip-container relative inline-block">
            <span className="strongs-word cursor-help underline decoration-dotted text-blue-600 hover:text-blue-800">
                {word}
            </span>
            <div className="strongs-tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible hover:opacity-100 hover:visible transition-all duration-300 z-50 min-w-80 max-w-96">
                <div className="font-bold text-lg mb-2 text-blue-300">
                    {definition.lemma} ({strongsNumber})
                </div>
                
                <div className="mb-2">
                    <span className="text-gray-300">Transliteration:</span> 
                    <span className="ml-1 font-medium">{definition.transliteration}</span>
                </div>
                
                <div className="mb-2">
                    <span className="text-gray-300">Pronunciation:</span> 
                    <span className="ml-1 font-medium">{definition.pronunciation}</span>
                </div>
                
                {definition.derivation && (
                    <div className="mb-2">
                        <span className="text-gray-300">Derivation:</span> 
                        <span className="ml-1 text-sm">{definition.derivation}</span>
                    </div>
                )}
                
                <div className="mb-2">
                    <span className="text-gray-300">Definition:</span> 
                    <div className="text-sm mt-1 text-yellow-200">{definition.strongsDefinition}</div>
                </div>
                
                {definition.kjvDefinition && (
                    <div>
                        <span className="text-gray-300">KJV Usage:</span> 
                        <div className="text-sm mt-1 text-green-200">{definition.kjvDefinition}</div>
                    </div>
                )}
                
                {/* Tooltip arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
            </div>
        </span>
    )
}