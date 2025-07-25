import { j as s } from './jsx-runtime.qnxbK-qf.js'
import { r as n } from './index.CQPPKyn2.js'
function v() {
    const [a, d] = n.useState(17),
        [r, m] = n.useState(100),
        b = e => {
            const i = parseInt(e.target.value)
            !isNaN(i) && i > 0 && i <= 30 && d(i)
        },
        x = e => {
            const i = parseInt(e.target.value)
            !isNaN(i) && i > 20 && i <= 200 && m(i)
        },
        t = [
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
        ].slice(0, a),
        o = e => `${(Number.parseInt(e) * r) / 100}vw`
    return s.jsxs('div', {
        className: 'p-4',
        children: [
            s.jsx('h1', {
                className: 'mb-6 text-center text-2xl font-bold',
                children: 'Flexbox with Different Sized Boxes',
            }),
            s.jsxs('div', {
                className:
                    'mx-auto mb-6 flex w-fit flex-wrap items-center gap-4 rounded-lg bg-gray-100 p-3',
                children: [
                    s.jsxs('div', {
                        className: 'flex items-center gap-2',
                        children: [
                            s.jsx('label', {
                                htmlFor: 'box-count',
                                className: 'font-medium',
                                children: 'Box Count:',
                            }),
                            s.jsx('input', {
                                id: 'box-count',
                                type: 'number',
                                min: '1',
                                max: '30',
                                value: a,
                                onChange: b,
                                className:
                                    'w-20 rounded border border-gray-300 p-1 text-center',
                            }),
                        ],
                    }),
                    s.jsxs('div', {
                        className: 'flex items-center gap-2',
                        children: [
                            s.jsx('label', {
                                htmlFor: 'size-factor',
                                className: 'font-medium',
                                children: 'Size (%):',
                            }),
                            s.jsx('input', {
                                id: 'size-factor',
                                type: 'number',
                                min: '20',
                                max: '200',
                                value: r,
                                onChange: x,
                                className:
                                    'w-20 rounded border border-gray-300 p-1 text-center',
                            }),
                            s.jsx('span', {
                                className: 'text-gray-500',
                                children: '%',
                            }),
                        ],
                    }),
                ],
            }),
            s.jsx('h2', {
                className: 'mb-3 text-xl font-semibold',
                children: 'Solution 1: CSS Grid with auto-fit',
            }),
            s.jsx('div', {
                className:
                    'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-10 grid grid-cols-1 gap-2 sm:grid-cols-4',
                children: t.map(e =>
                    s.jsx(
                        'div',
                        {
                            className: `${e.color} flex items-center justify-center rounded-lg p-4 font-bold text-white`,
                            style: { aspectRatio: '1/1' },
                            children: o(e.size),
                        },
                        e.id
                    )
                ),
            }),
            s.jsx('h2', {
                className: 'mb-3 text-xl font-semibold',
                children: 'Solution 2: CSS Columns (Masonry-like)',
            }),
            s.jsx('div', {
                className:
                    'md:columns-3 lg:columns-4 xl:columns-5 mb-10 columns-1 gap-2 sm:columns-2',
                children: t.map(e =>
                    s.jsx(
                        'div',
                        {
                            className: `${e.color} mb-2 flex break-inside-avoid items-center justify-center rounded-lg p-4 font-bold text-white`,
                            style: { height: o(e.size) },
                            children: o(e.size),
                        },
                        e.id
                    )
                ),
            }),
            s.jsx('h2', {
                className: 'mb-3 text-xl font-semibold',
                children: 'Solution 3: Optimized Flexbox',
            }),
            s.jsx('div', {
                className: 'mb-10 flex flex-wrap gap-2',
                children: t.map(e => {
                    const l = (Number.parseInt(e.size) * r) / 100,
                        c = l / 5
                    return s.jsx(
                        'div',
                        {
                            className: `${e.color} flex items-center justify-center rounded-lg p-4 font-bold text-white`,
                            style: {
                                flexBasis: `${l * 0.8}%`,
                                flexGrow: c,
                                aspectRatio: '1/1',
                            },
                            children: o(e.size),
                        },
                        e.id
                    )
                }),
            }),
            s.jsx('h2', {
                className: 'mb-3 text-xl font-semibold',
                children: 'Solution 4: Grid with Dynamic Spans',
            }),
            s.jsx('div', {
                className: 'grid grid-cols-12 gap-2',
                children: t.map(e => {
                    const l = (Number.parseInt(e.size) * r) / 100,
                        c = Math.max(1, Math.min(12, Math.round(l / 2)))
                    return s.jsx(
                        'div',
                        {
                            className: `${e.color} flex items-center justify-center rounded-lg p-4 font-bold text-white`,
                            style: {
                                gridColumn: `span ${c}`,
                                aspectRatio: '1/1',
                            },
                            children: o(e.size),
                        },
                        e.id
                    )
                }),
            }),
        ],
    })
}
export { v as default }
