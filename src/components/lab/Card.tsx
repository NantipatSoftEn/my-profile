import { useState } from 'react'

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
                <h2 className="text-base font-semibold leading-tight">{title}</h2>
            </div>
        </div>
    )
}

export default function TodayGrid() {
    const cards = [
        {
            category: 'Travel',
            title: '5 Inspiring Apps for Your Next Trip',
            image: '/assets/orochimaru.gif',
            size: {
                width: '60%',
                height: '300px',
            },
        },
        {
            category: 'How To',
            title: 'Contemplate the Meaning of Life Twice a Day',
            image: '/assets/orochimaru.gif',
            size: {
                width: '40%',
                height: '300px',
            },
        },
        {
            category: 'Steps',
            title: 'Urban Exploration Apps for the Vertically-Inclined',
            image: '/assets/orochimaru.gif',
            size: {
                width: '40%',
                height: '300px',
            },
        },
        {
            category: 'Hats',
            title: 'Take Control of Your Hat Life With This Stunning New App',
            image: 'assets/orochimaru.gif',
            size: {
                width: '60%',
                height: '300px',
            },
        },
    ]

    return (
        <div className="min-h-screen px-6 py-8 text-white">
            <h1 className="mb-6 text-3xl font-bold">Today</h1>

            {/* Two rows with two cards each of different widths */}
            <div className="flex flex-col gap-2">
                {/* First row */}
                <div className="flex gap-2">
                    <Card {...cards[0]} />
                    <Card {...cards[1]} />
                </div>

                {/* Second row */}
                <div className="flex gap-2">
                    <Card {...cards[2]} />
                    <Card {...cards[3]} />
                </div>
            </div>
        </div>
    )
}
