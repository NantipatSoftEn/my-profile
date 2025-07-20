import { useState } from 'react'

export default function MasonryGrid() {
    // State for box count
    const [boxCount, setBoxCount] = useState(17)
    // State for size factor (percentage)
    const [sizeFactor, setSizeFactor] = useState(100)

    // Handler for box count change
    const handleBoxCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(e.target.value)
        if (!isNaN(count) && count > 0 && count <= 30) {
            setBoxCount(count)
        }
    }

    // Handler for size factor change
    const handleSizeFactorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const factor = parseInt(e.target.value)
        if (!isNaN(factor) && factor > 20 && factor <= 200) {
            setSizeFactor(factor)
        }
    }

    // Sample data with different sizes
    const allItems = [
        { id: 1, size: '7vw', color: 'bg-rose-500' },
        { id: 2, size: '7vw', color: 'bg-amber-400' },
        { id: 3, size: '6vw', color: 'bg-teal-400' },
        { id: 4, size: '14vw', color: 'bg-fuchsia-500' },
        { id: 5, size: '5vw', color: 'bg-blue-500' },
        { id: 6, size: '14vw', color: 'bg-fuchsia-400' },
        { id: 7, size: '10vw', color: 'bg-blue-400' },
        { id: 8, size: '14vw', color: 'bg-orange-400' },
        { id: 9, size: '9vw', color: 'bg-green-400' },
        { id: 10, size: '14vw', color: 'bg-violet-500' },
        { id: 11, size: '12vw', color: 'bg-rose-400' },
        { id: 12, size: '8vw', color: 'bg-amber-400' },
        { id: 13, size: '11vw', color: 'bg-teal-400' },
        { id: 14, size: '14vw', color: 'bg-fuchsia-400' },
        { id: 15, size: '11vw', color: 'bg-blue-400' },
        { id: 16, size: '7vw', color: 'bg-fuchsia-500' },
        { id: 17, size: '5vw', color: 'bg-blue-500' },
        { id: 18, size: '9vw', color: 'bg-green-600' },
        { id: 19, size: '12vw', color: 'bg-yellow-500' },
        { id: 20, size: '8vw', color: 'bg-red-400' },
        { id: 21, size: '10vw', color: 'bg-purple-500' },
        { id: 22, size: '6vw', color: 'bg-cyan-400' },
        { id: 23, size: '13vw', color: 'bg-indigo-500' },
        { id: 24, size: '7vw', color: 'bg-pink-400' },
        { id: 25, size: '9vw', color: 'bg-orange-500' },
        { id: 26, size: '11vw', color: 'bg-lime-400' },
        { id: 27, size: '8vw', color: 'bg-sky-500' },
        { id: 28, size: '14vw', color: 'bg-emerald-500' },
        { id: 29, size: '6vw', color: 'bg-violet-400' },
        { id: 30, size: '10vw', color: 'bg-amber-500' },
    ]

    // Use only the number of items specified by boxCount
    const items = allItems.slice(0, boxCount)

    // Function to apply size factor to a size string
    const applyFactor = (sizeStr: string) => {
        const sizeNum = Number.parseInt(sizeStr)
        const scaledSize = (sizeNum * sizeFactor) / 100
        return `${scaledSize}vw`
    }

    return (
        <div className="p-4">
            <h1 className="mb-6 text-center text-2xl font-bold">
                Flexbox with Different Sized Boxes
            </h1>

            {/* Controls for Box Count and Size Factor */}
            <div className="mx-auto mb-6 flex w-fit flex-wrap items-center gap-4 rounded-lg bg-gray-100 p-3">
                <div className="flex items-center gap-2">
                    <label htmlFor="box-count" className="font-medium">
                        Box Count:
                    </label>
                    <input
                        id="box-count"
                        type="number"
                        min="1"
                        max="30"
                        value={boxCount}
                        onChange={handleBoxCountChange}
                        className="w-20 rounded border border-gray-300 p-1 text-center"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <label htmlFor="size-factor" className="font-medium">
                        Size (%):
                    </label>
                    <input
                        id="size-factor"
                        type="number"
                        min="20"
                        max="200"
                        value={sizeFactor}
                        onChange={handleSizeFactorChange}
                        className="w-20 rounded border border-gray-300 p-1 text-center"
                    />
                    <span className="text-gray-500">%</span>
                </div>
            </div>

            {/* Solution 1: CSS Grid with auto-fit and minmax */}
            <h2 className="mb-3 text-xl font-semibold">
                Solution 1: CSS Grid with auto-fit
            </h2>
            <div className="md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-10 grid grid-cols-1 gap-2 sm:grid-cols-4">
                {items.map(item => (
                    <div
                        key={item.id}
                        className={`${item.color} flex items-center justify-center rounded-lg p-4 font-bold text-white`}
                        style={{
                            aspectRatio: '1/1',
                        }}
                    >
                        {applyFactor(item.size)}
                    </div>
                ))}
            </div>

            {/* Solution 2: Masonry-like layout with column-count */}
            <h2 className="mb-3 text-xl font-semibold">
                Solution 2: CSS Columns (Masonry-like)
            </h2>
            <div className="md:columns-3 lg:columns-4 xl:columns-5 mb-10 columns-1 gap-2 sm:columns-2">
                {items.map(item => (
                    <div
                        key={item.id}
                        className={`${item.color} mb-2 flex break-inside-avoid items-center justify-center rounded-lg p-4 font-bold text-white`}
                        style={{
                            height: applyFactor(item.size),
                        }}
                    >
                        {applyFactor(item.size)}
                    </div>
                ))}
            </div>

            {/* Solution 3: Flexbox with flex-wrap and flex-grow */}
            <h2 className="mb-3 text-xl font-semibold">
                Solution 3: Optimized Flexbox
            </h2>
            <div className="mb-10 flex flex-wrap gap-2">
                {items.map(item => {
                    // Convert vw size to a flex-grow value (larger items get more growth)
                    const sizeNum = Number.parseInt(item.size)
                    const scaledSize = (sizeNum * sizeFactor) / 100
                    const flexGrow = scaledSize / 5 // Scale down to reasonable flex-grow values

                    return (
                        <div
                            key={item.id}
                            className={`${item.color} flex items-center justify-center rounded-lg p-4 font-bold text-white`}
                            style={{
                                flexBasis: `${scaledSize * 0.8}%`,
                                flexGrow: flexGrow,
                                aspectRatio: '1/1',
                            }}
                        >
                            {applyFactor(item.size)}
                        </div>
                    )
                })}
            </div>

            {/* Solution 4: Grid with specific spans based on size */}
            <h2 className="mb-3 text-xl font-semibold">
                Solution 4: Grid with Dynamic Spans
            </h2>
            <div className="grid grid-cols-12 gap-2">
                {items.map(item => {
                    // Convert vw size to a column span (1-12)
                    const sizeNum = Number.parseInt(item.size)
                    const scaledSize = (sizeNum * sizeFactor) / 100
                    const span = Math.max(
                        1,
                        Math.min(12, Math.round(scaledSize / 2))
                    ) // Map to 1-12 span

                    return (
                        <div
                            key={item.id}
                            className={`${item.color} flex items-center justify-center rounded-lg p-4 font-bold text-white`}
                            style={{
                                gridColumn: `span ${span}`,
                                aspectRatio: '1/1',
                            }}
                        >
                            {applyFactor(item.size)}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
