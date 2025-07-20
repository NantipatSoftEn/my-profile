import { j as e } from './jsx-runtime.qnxbK-qf.js'
import { r as s } from './index.CQPPKyn2.js'
function N() {
    const [o, m] = s.useState(10),
        [l, c] = s.useState('flex-auto'),
        [a, x] = s.useState(4),
        [n, h] = s.useState(2),
        u = r => {
            const t = parseInt(r.target.value)
            !isNaN(t) && t > 0 && m(t)
        },
        g = r => {
            c(r.target.value)
        },
        f = r => {
            const t = parseInt(r.target.value)
            !isNaN(t) && t > 0 && t <= 20 && x(t)
        },
        p = r => {
            const t = parseInt(r.target.value)
            !isNaN(t) && t > 0 && t <= 6 && h(t)
        },
        b = () => Math.floor(Math.random() * 10) + 5,
        w = Array.from({ length: a }).map(() => b()),
        i = s.useMemo(
            () => [
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
            ],
            []
        ),
        d = r => i[r % i.length]
    return e.jsxs('div', {
        className: 'space-y-8',
        children: [
            e.jsx('h1', {
                className: 'mb-3 text-center text-lg font-semibold',
                children: ' Playground Flex & Grid',
            }),
            e.jsxs('div', {
                className:
                    'mx-auto flex w-fit flex-wrap items-center gap-4 rounded-lg bg-gray-100 p-3',
                children: [
                    e.jsxs('div', {
                        className: 'flex items-center gap-2',
                        children: [
                            e.jsx('label', {
                                htmlFor: 'width-input',
                                className: 'font-medium',
                                children: 'Box Width (% of Viewport Width):',
                            }),
                            e.jsx('input', {
                                id: 'width-input',
                                type: 'number',
                                value: o,
                                onChange: u,
                                className:
                                    'w-20 rounded border border-gray-300 p-1 text-center',
                            }),
                            e.jsx('span', {
                                className: 'text-gray-500',
                                children: 'vw',
                            }),
                        ],
                    }),
                    e.jsxs('div', {
                        className: 'flex items-center gap-2',
                        children: [
                            e.jsx('label', {
                                htmlFor: 'flex-select',
                                className: 'font-medium',
                                children: 'Flex Style:',
                            }),
                            e.jsxs('select', {
                                id: 'flex-select',
                                value: l,
                                onChange: g,
                                className: 'rounded border border-gray-300 p-1',
                                children: [
                                    e.jsx('option', {
                                        value: 'flex-auto',
                                        children: 'flex-auto',
                                    }),
                                    e.jsx('option', {
                                        value: 'flex-1',
                                        children: 'flex-1',
                                    }),
                                    e.jsx('option', {
                                        value: 'flex-4',
                                        children: 'flex-4',
                                    }),
                                    e.jsx('option', {
                                        value: 'flex-none',
                                        children: 'flex-none',
                                    }),
                                ],
                            }),
                        ],
                    }),
                    e.jsxs('div', {
                        className: 'flex items-center gap-2',
                        children: [
                            e.jsx('label', {
                                htmlFor: 'box-count',
                                className: 'font-medium',
                                children: 'Box Count:',
                            }),
                            e.jsx('input', {
                                id: 'box-count',
                                type: 'number',
                                min: '1',
                                max: '20',
                                value: a,
                                onChange: f,
                                className:
                                    'w-20 rounded border border-gray-300 p-1 text-center',
                            }),
                        ],
                    }),
                    e.jsxs('div', {
                        className: 'flex items-center gap-2',
                        children: [
                            e.jsx('label', {
                                htmlFor: 'grid-columns',
                                className: 'font-medium',
                                children: 'Grid Columns:',
                            }),
                            e.jsx('input', {
                                id: 'grid-columns',
                                type: 'number',
                                min: '1',
                                max: '6',
                                value: n,
                                onChange: p,
                                className:
                                    'w-20 rounded border border-gray-300 p-1 text-center',
                            }),
                        ],
                    }),
                ],
            }),
            e.jsx('h3', {
                className: 'mb-3 text-center text-lg font-semibold',
                children: 'Flex',
            }),
            e.jsx('div', {
                className:
                    'flex flex-wrap border-2 border-dashed bord justify-center gap-4 p-4',
                children: Array.from({ length: a }).map((r, t) =>
                    e.jsx(
                        'div',
                        {
                            style: { width: `${o}vw`, height: `${o}vw` },
                            className: `box-border ${l} flex items-center justify-center cursor-pointer rounded-lg border-2 border-white bg-gradient-to-br ${d(t)} p-5 text-white font-medium shadow-lg transition-all duration-300 hover:scale-105`,
                            children: l,
                        },
                        t
                    )
                ),
            }),
            e.jsx('h3', {
                className: 'mb-3 text-center text-lg font-semibold',
                children: 'Grid',
            }),
            e.jsx('div', {
                className: `grid grid-cols-${n} gap-4 p-6`,
                style: {
                    display: 'grid',
                    gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
                },
                children: Array.from({ length: a }).map((r, t) =>
                    e.jsx(
                        'div',
                        {
                            style: { width: `${o}vw`, height: `${o}vw` },
                            className: `box-border flex items-center justify-center rounded-lg bg-gradient-to-br ${d(t + 2)} p-5 text-white font-medium shadow-md`,
                            children: t,
                        },
                        t
                    )
                ),
            }),
            e.jsx('h3', {
                className: 'mb-3 text-center text-lg font-semibold',
                children: 'Grid',
            }),
            e.jsxs('div', {
                className:
                    'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4',
                children: [
                    e.jsx('div', {
                        className:
                            'h-24 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 p-4 text-white font-medium shadow-md',
                        children: 'Box 1',
                    }),
                    e.jsx('div', {
                        className:
                            'h-40 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-4 text-white font-medium shadow-md',
                        children: 'Box 2',
                    }),
                    e.jsx('div', {
                        className:
                            'h-32 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 p-4 text-white font-medium shadow-md',
                        children: 'Box 3',
                    }),
                    e.jsx('div', {
                        className:
                            'h-28 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 p-4 text-white font-medium shadow-md',
                        children: 'Box 4',
                    }),
                    e.jsx('div', {
                        className:
                            'h-48 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 p-4 text-white font-medium shadow-md',
                        children: 'Box 5',
                    }),
                    e.jsx('div', {
                        className:
                            'h-48 rounded-lg bg-gradient-to-r from-fuchsia-500 to-purple-600 p-4 text-white font-medium shadow-md',
                        children: 'Box 6',
                    }),
                ],
            }),
            e.jsxs('div', {
                className: 'mt-8 p-4',
                children: [
                    e.jsx('h3', {
                        className: 'mb-3 text-center text-lg font-semibold',
                        children: 'Flexbox with Different Sized Boxes',
                    }),
                    e.jsx('div', {
                        className:
                            'flex flex-wrap gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg',
                        children: w.map((r, t) =>
                            e.jsx(
                                'div',
                                {
                                    style: {
                                        width: `${r}vw`,
                                        height: `${r}vw`,
                                    },
                                    className: `${l} flex items-center justify-center rounded-lg bg-gradient-to-br ${d(t + 5)} shadow-md text-white font-bold transition-all duration-300 hover:shadow-lg`,
                                    children: e.jsxs('span', {
                                        children: [r, 'vw'],
                                    }),
                                },
                                `random-${t}`
                            )
                        ),
                    }),
                ],
            }),
        ],
    })
}
export { N as default }
