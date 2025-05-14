import { useState, useMemo } from 'react'

export default function FlexboxCard() {
    const [size, setSize] = useState(10) // Default size in vw
    const [flexStyle, setFlexStyle] = useState('flex-auto')
    const [boxCount, setBoxCount] = useState(4)
    const [gridColumns, setGridColumns] = useState(2) // New state for grid columns
    

    const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = parseInt(e.target.value)
        if (!isNaN(newSize) && newSize > 0) {
            setSize(newSize)
        }
    }

    const handleFlexChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFlexStyle(e.target.value)
    }

    const handleBoxCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(e.target.value)
        if (!isNaN(count) && count > 0 && count <= 20) {
            setBoxCount(count)
        }
    }

    // New handler for grid columns
    const handleGridColumnsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const columns = parseInt(e.target.value)
        if (!isNaN(columns) && columns > 0 && columns <= 6) {
            setGridColumns(columns)
        }
    }

    // Generate random sizes for different sized boxes
    const getRandomSize = () => {
        return Math.floor(Math.random() * 10) + 5; // Random size between 5-15vw
    }
    
    const randomBoxSizes = Array.from({ length: boxCount }).map(() => getRandomSize());

    // Define beautiful color gradients for boxes
    const colorPalettes = useMemo(() => [
        'from-pink-500 to-purple-500',
        'from-cyan-500 to-blue-500',
        'from-yellow-400 to-orange-500',
        'from-green-400 to-emerald-500',
        'from-indigo-500 to-purple-700',
        'from-red-500 to-pink-500',
        'from-amber-400 to-yellow-500',
        'from-teal-400 to-cyan-500',
        'from-fuchsia-500 to-pink-600',
        'from-sky-400 to-blue-600',
    ], []);

    // Generate a color for each box
    const getBoxColor = (index: number) => {
        return colorPalettes[index % colorPalettes.length];
    };

    return (
        <div className="space-y-8">
            {/* Controls */}
            <h1 className="mb-3 text-center text-lg font-semibold"> Playground Flex & Grid</h1>

            <div className="mx-auto flex w-fit flex-wrap items-center gap-4 rounded-lg bg-gray-100 p-3">
                <div className="flex items-center gap-2">
                    <label htmlFor="width-input" className="font-medium">
                        Box Width (% of Viewport Width):
                    </label>
                    <input
                        id="width-input"
                        type="number"
                        value={size}
                        onChange={handleSizeChange}
                        className="w-20 rounded border border-gray-300 p-1 text-center"
                    />
                    <span className="text-gray-500">vw</span>
                </div>

                <div className="flex items-center gap-2">
                    <label htmlFor="flex-select" className="font-medium">
                        Flex Style:
                    </label>
                    <select
                        id="flex-select"
                        value={flexStyle}
                        onChange={handleFlexChange}
                        className="rounded border border-gray-300 p-1"
                    >
                        <option value="flex-auto">flex-auto</option>
                        <option value="flex-1">flex-1</option>
                        <option value="flex-4">flex-4</option>
                        <option value="flex-none">flex-none</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <label htmlFor="box-count" className="font-medium">
                        Box Count:
                    </label>
                    <input
                        id="box-count"
                        type="number"
                        min="1"
                        max="20"
                        value={boxCount}
                        onChange={handleBoxCountChange}
                        className="w-20 rounded border border-gray-300 p-1 text-center"
                    />
                </div>

                {/* New control for grid columns */}
                <div className="flex items-center gap-2">
                    <label htmlFor="grid-columns" className="font-medium">
                        Grid Columns:
                    </label>
                    <input
                        id="grid-columns"
                        type="number"
                        min="1"
                        max="6"
                        value={gridColumns}
                        onChange={handleGridColumnsChange}
                        className="w-20 rounded border border-gray-300 p-1 text-center"
                    />
                </div>
            </div>
            <h3 className="mb-3 text-center text-lg font-semibold">Flex</h3>

            {/* Uniform flex boxes */}
            <div className="flex flex-wrap border-2 border-dashed bord justify-center gap-4 p-4">
                {Array.from({ length: boxCount }).map((_, index) => (
                    <div
                        key={index}
                        style={{ width: `${size}vw`, height: `${size}vw` }}
                        className={`box-border ${flexStyle} flex items-center justify-center cursor-pointer rounded-lg border-2 border-white bg-gradient-to-br ${getBoxColor(index)} p-5 text-white font-medium shadow-lg transition-all duration-300 hover:scale-105`}
                    >
                        {flexStyle}
                    </div>
                ))}
            </div>
            <h3 className="mb-3 text-center text-lg font-semibold">Grid</h3>
            {/* Grid boxes with dynamic columns */}
            <div className={`grid grid-cols-${gridColumns} gap-4 p-6`} style={{ 
                display: 'grid', 
                gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))` 
            }}>
                {Array.from({ length: boxCount }).map((_, index) => (
                    <div
                        key={index}
                        style={{ width: `${size}vw`, height: `${size}vw` }}
                        className={`box-border flex items-center justify-center rounded-lg bg-gradient-to-br ${getBoxColor(index + 2)} p-5 text-white font-medium shadow-md`}
                    >
                        {index}
                    </div>
                ))}
            </div>
            <h3 className="mb-3 text-center text-lg font-semibold">Grid</h3>
            {/* Responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="h-24 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 p-4 text-white font-medium shadow-md">Box 1</div>
                <div className="h-40 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-4 text-white font-medium shadow-md">Box 2</div>
                <div className="h-32 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 p-4 text-white font-medium shadow-md">Box 3</div>
                <div className="h-28 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 p-4 text-white font-medium shadow-md">Box 4</div>
                <div className="h-48 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 p-4 text-white font-medium shadow-md">Box 5</div>
                <div className="h-48 rounded-lg bg-gradient-to-r from-fuchsia-500 to-purple-600 p-4 text-white font-medium shadow-md">Box 6</div>
            </div>

            {/* Different sized boxes */}
            <div className="mt-8 p-4">
                <h3 className="mb-3 text-center text-lg font-semibold">Flexbox with Different Sized Boxes</h3>
                <div className="flex flex-wrap gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg">
                    {randomBoxSizes.map((boxSize, index) => (
                        <div
                            key={`random-${index}`}
                            style={{ 
                                width: `${boxSize}vw`, 
                                height: `${boxSize}vw`,
                            }}
                            className={`${flexStyle} flex items-center justify-center rounded-lg bg-gradient-to-br ${getBoxColor(index + 5)} shadow-md text-white font-bold transition-all duration-300 hover:shadow-lg`}
                        >
                            <span>{boxSize}vw</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        
    )
}
