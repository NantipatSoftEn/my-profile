import { useState, useEffect } from 'react'

export default function ClockIF() {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const hours = time.getHours()
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()

    // Convert to 12-hour format for analog clock
    const hours12 = hours % 12

    // Calculate angles for clock hands
    const secondAngle = (seconds / 60) * 360
    const minuteAngle = (minutes / 60) * 360 + (seconds / 60) * 6
    const hourAngle = (hours12 / 12) * 360 + (minutes / 60) * 30

    // Check if current time is in eating window (14:00 - 20:00)
    const isEatingTime = hours >= 14 && hours < 20

    // Eating window: 2 PM (14:00) to 8 PM (20:00)
    // On 12-hour clock: 2 to 8 (both PM)
    // Start angle: 2 o'clock = 60 degrees from 12 o'clock
    // End angle: 8 o'clock = 240 degrees from 12 o'clock
    const eatingStartAngle = 60 // 2 o'clock
    const eatingEndAngle = 240 // 8 o'clock

    // SVG arc path for eating window
    const createArcPath = (
        startAngle: number,
        endAngle: number,
        innerRadius: number,
        outerRadius: number
    ) => {
        const startRad = ((startAngle - 90) * Math.PI) / 180
        const endRad = ((endAngle - 90) * Math.PI) / 180

        const x1Outer = 150 + outerRadius * Math.cos(startRad)
        const y1Outer = 150 + outerRadius * Math.sin(startRad)
        const x2Outer = 150 + outerRadius * Math.cos(endRad)
        const y2Outer = 150 + outerRadius * Math.sin(endRad)

        const x1Inner = 150 + innerRadius * Math.cos(endRad)
        const y1Inner = 150 + innerRadius * Math.sin(endRad)
        const x2Inner = 150 + innerRadius * Math.cos(startRad)
        const y2Inner = 150 + innerRadius * Math.sin(startRad)

        const largeArc = endAngle - startAngle > 180 ? 1 : 0

        return `
            M ${x1Outer} ${y1Outer}
            A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2Outer} ${y2Outer}
            L ${x1Inner} ${y1Inner}
            A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x2Inner} ${y2Inner}
            Z
        `
    }

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('th-TH', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        })
    }

    return (
        <div className="flex flex-col items-center gap-8">
            {/* Status */}
            <div
                className={`rounded-full px-6 py-3 text-lg font-bold ${
                    isEatingTime
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-red-500/20 text-red-500'
                }`}
            >
                {isEatingTime ? '🍽️ ช่วงเวลากินอาหารได้' : '⏳ ช่วงงดอาหาร (Fasting)'}
            </div>

            {/* Analog Clock */}
            <div className="relative">
                <svg
                    width="400"
                    height="400"
                    viewBox="0 0 300 300"
                    className="h-[400px] w-[400px] max-w-full"
                >
                    {/* Clock face background */}
                    <circle
                        cx="150"
                        cy="150"
                        r="140"
                        fill="currentColor"
                        className="text-skin-card"
                    />
                    <circle
                        cx="150"
                        cy="150"
                        r="140"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="text-skin-line"
                    />

                    {/* Fasting zone (red) - 8 PM to 2 PM (next day) */}
                    {/* Part 1: 8 to 12 */}
                    <path
                        d={createArcPath(240, 360, 100, 135)}
                        fill="rgba(239, 68, 68, 0.3)"
                    />
                    {/* Part 2: 12 to 2 */}
                    <path
                        d={createArcPath(0, 60, 100, 135)}
                        fill="rgba(239, 68, 68, 0.3)"
                    />

                    {/* Eating window (green) - 2 PM to 8 PM */}
                    <path
                        d={createArcPath(eatingStartAngle, eatingEndAngle, 100, 135)}
                        fill="rgba(34, 197, 94, 0.3)"
                    />

                    {/* Inner circle */}
                    <circle
                        cx="150"
                        cy="150"
                        r="95"
                        fill="currentColor"
                        className="text-skin-fill"
                    />

                    {/* Hour markers */}
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => {
                        const angle = ((i * 30 - 90) * Math.PI) / 180
                        const x1 = 150 + 85 * Math.cos(angle)
                        const y1 = 150 + 85 * Math.sin(angle)
                        const x2 = 150 + 75 * Math.cos(angle)
                        const y2 = 150 + 75 * Math.sin(angle)
                        const isMainHour = i % 3 === 0
                        return (
                            <line
                                key={`marker-${i}`}
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke="currentColor"
                                strokeWidth={isMainHour ? 3 : 1}
                                className="text-skin-base"
                            />
                        )
                    })}

                    {/* Hour numbers */}
                    {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
                        const angle = ((i * 30 - 90) * Math.PI) / 180
                        const x = 150 + 62 * Math.cos(angle)
                        const y = 150 + 62 * Math.sin(angle)
                        // Highlight eating hours (2-8)
                        const isEatingHour = num >= 2 && num <= 8
                        return (
                            <text
                                key={num}
                                x={x}
                                y={y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize="14"
                                fontWeight={isEatingHour ? 'bold' : 'normal'}
                                fill={isEatingHour ? '#22c55e' : 'currentColor'}
                                className={isEatingHour ? '' : 'text-skin-base'}
                            >
                                {num}
                            </text>
                        )
                    })}

                    {/* Hour hand */}
                    <line
                        x1="150"
                        y1="150"
                        x2="150"
                        y2="100"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeLinecap="round"
                        className="text-skin-accent"
                        transform={`rotate(${hourAngle}, 150, 150)`}
                    />

                    {/* Minute hand */}
                    <line
                        x1="150"
                        y1="150"
                        x2="150"
                        y2="70"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="text-skin-base"
                        transform={`rotate(${minuteAngle}, 150, 150)`}
                    />

                    {/* Second hand */}
                    <line
                        x1="150"
                        y1="150"
                        x2="150"
                        y2="55"
                        stroke="#ef4444"
                        strokeWidth="2"
                        strokeLinecap="round"
                        transform={`rotate(${secondAngle}, 150, 150)`}
                    />

                    {/* Center dot */}
                    <circle cx="150" cy="150" r="8" fill="currentColor" className="text-skin-accent" />
                    <circle cx="150" cy="150" r="4" fill="#ef4444" />
                </svg>
            </div>

            {/* Digital Time */}
            <div className="text-center">
                <p className="font-mono text-4xl font-bold text-skin-accent">
                    {formatTime(time)}
                </p>
                <p className="mt-2 text-sm opacity-70">
                    {time.toLocaleDateString('th-TH', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </p>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-6 rounded-lg border border-skin-line bg-skin-card p-4">
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-green-500/30"></div>
                    <span className="text-sm">กินอาหารได้ (14:00 - 20:00)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-red-500/30"></div>
                    <span className="text-sm">งดอาหาร (20:00 - 14:00)</span>
                </div>
            </div>

            {/* IF Info */}
            <div className="max-w-md rounded-lg border border-skin-line bg-skin-card p-6 text-center">
                <h3 className="mb-2 text-lg font-semibold text-skin-accent">
                    Intermittent Fasting 18:6
                </h3>
                <p className="text-sm opacity-80">
                    กินอาหารได้ 6 ชั่วโมง (บ่าย 2 - 2 ทุ่ม)
                    <br />
                    งดอาหาร 18 ชั่วโมง (2 ทุ่ม - บ่าย 2 วันถัดไป)
                </p>
            </div>
        </div>
    )
}
