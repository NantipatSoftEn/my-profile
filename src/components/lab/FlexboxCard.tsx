import { useState } from 'react'

export default function FlexboxCard() {
    const [size, setSize] = useState(30)
    const [flexStyle, setFlexStyle] = useState('flex-auto')
    const [boxCount, setBoxCount] = useState(4)

    const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newWidth = parseInt(e.target.value)
        if (!isNaN(newWidth) && newWidth > 0) {
            setSize(newWidth)
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

    return (
        <div className="space-y-4">
            <div className="mx-auto flex w-fit flex-wrap items-center gap-4 rounded-lg bg-gray-100 p-3">
                <div className="flex items-center gap-2">
                    <label htmlFor="width-input" className="font-medium">
                        Box Width:
                    </label>
                    <input
                        id="width-input"
                        type="number"
                        value={size}
                        onChange={handleSizeChange}
                        className="w-20 rounded border border-gray-300 p-1 text-center"
                    />
                    <span className="text-gray-500">px</span>
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
            </div>

            <div className="flex flex-wrap justify-center gap-4 p-4">
                {Array.from({ length: boxCount }).map((_, index) => (
                    <div
                        key={index}
                        style={{ width: `${size}px`, height: `${size}px` }}
                        className={`box-border ${flexStyle} cursor-pointer rounded-lg border-4 p-5 transition-all duration-300`}
                    >
                        {flexStyle}
                    </div>
                ))}
            </div>
        </div>
    )
}
