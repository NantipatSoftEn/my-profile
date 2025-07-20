import { useState } from 'react'

// Height control component
const HeightControl = ({
    value,
    onChange,
}: {
    value: number
    onChange: (newVal: number) => void
}) => {
    return (
        <div className="mb-4">
            <label className="flex items-center gap-4">
                <span>Image Height: {value}px</span>
                <input
                    type="range"
                    min="100"
                    max="500"
                    value={value}
                    onChange={e => onChange(parseInt(e.target.value))}
                    className="w-40 accent-blue-500"
                />
            </label>
        </div>
    )
}

const Card = ({
    category,
    title,
    image,
    size,
}: {
    category: string
    title: string
    image: string
    size: {
        width: string
        height: string
    }
}) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className="relative overflow-hidden transition-transform duration-300"
            style={{
                width: size.width,
                height: size.height,
                transform: isHovered ? 'scale(1.02)' : 'scale(1)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={image}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white drop-shadow-lg">
                <p className="text-xs font-medium uppercase opacity-80">
                    {category}
                </p>
                <h2 className="text-base font-semibold leading-tight">
                    {title}
                </h2>
            </div>
        </div>
    )
}

export default function TodayGrid() {
    const [cardHeight, setCardHeight] = useState(500)

    const cards = [
        {
            category: 'Travel',
            title: '5 Inspiring Apps for Your Next Trip',
            image: '/assets/orochimaru.gif',
            size: {
                width: '60%',
                height: `${cardHeight}px`,
            },
        },
        {
            category: 'How To',
            title: 'Contemplate the Meaning of Life Twice a Day',
            image: './assets/gif/code geass.gif',
            size: {
                width: '40%',
                height: `${cardHeight}px`,
            },
        },
        {
            category: 'Steps',
            title: 'Urban Exploration Apps for the Vertically-Inclined',
            image: '/assets/gif/naruto.gif',
            size: {
                width: '60%',
                height: `${cardHeight}px`,
            },
        },

        {
            category: 'Hats',
            title: 'Take Control of Your Hat Life With This Stunning New App',
            image: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnNyZTdldzZhdGRsM2xuNmd4ejRyY2FwY3pmajVmNmo3eHQ4bDh0eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4EpeErFp4AgqiZB6/giphy.gif',
            size: {
                width: '70%',
                height: `${cardHeight}px`,
            },
        },
        {
            category: 'Hats',
            title: 'Take Control of Your Hat Life With This Stunning New App',
            image: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3pod2lsbHp2dzByMWcyNnkwZHdpcmppazcyM3FvbGptbmx6aDZlciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/287NbXOXYDNuHe29JG/giphy.gif',
            size: {
                width: '70%',
                height: `${cardHeight}px`,
            },
        },
        {
            category: 'Hats',
            title: 'Take Control of Your Hat Life With This Stunning New App',
            image: 'public/assets/gif/ab2a38e3258a09b97f7879b54251b8ab.gif',
            size: {
                width: '20%',
                height: `${cardHeight}px`,
            },
        },
        {
            category: 'Hats',
            title: 'Take Control of Your Hat Life With This Stunning New App',
            image: 'public/assets/gif/anime-naruto-shippuden.gif',
            size: {
                width: '80%',
                height: `${cardHeight}px`,
            },
        },
    ]

    // Group cards into rows of 2 cards each
    const groupCardsIntoRows = (cards: any[]) => {
        const rows = []
        for (let i = 0; i < cards.length; i += 2) {
            // For each row, take up to 2 cards (handles odd number of cards)
            rows.push(cards.slice(i, i + 2))
        }
        return rows
    }

    const cardRows = groupCardsIntoRows(cards)

    return (
        <div className="min-h-screen px-6 py-8 text-white">
            <h1 className="mb-6 text-3xl font-bold">Today</h1>

            <HeightControl value={cardHeight} onChange={setCardHeight} />

            {/* Cards displayed using loops */}
            <div className="flex flex-col gap-2">
                {/* Render all rows dynamically */}
                {cardRows.map((row, rowIndex) => (
                    <div key={`row-${rowIndex}`} className="flex gap-2">
                        {row.map((card, cardIndex) => (
                            <Card
                                key={`card-${rowIndex}-${cardIndex}`}
                                {...card}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
