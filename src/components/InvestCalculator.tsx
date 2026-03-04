import { useState, useMemo } from 'react'

interface MonthlyData {
    month: number
    principal: number
    profit: number
    total: number
}

export default function InvestCalculator() {
    const [principal, setPrincipal] = useState<string>('10000')
    const [monthlyRate, setMonthlyRate] = useState<string>('5')
    const [months, setMonths] = useState<string>('12')

    const tableData = useMemo<MonthlyData[]>(() => {
        const p = Number.parseFloat(principal) || 0
        const rate = Number.parseFloat(monthlyRate) || 0
        const m = Number.parseInt(months) || 0

        if (p <= 0 || rate <= 0 || m <= 0) return []

        const data: MonthlyData[] = []
        let currentPrincipal = p

        for (let i = 1; i <= m; i++) {
            const profit = currentPrincipal * (rate / 100)
            const total = currentPrincipal + profit
            data.push({
                month: i,
                principal: currentPrincipal,
                profit: profit,
                total: total,
            })
            currentPrincipal = total // ทบต้นทบกำไร
        }

        return data
    }, [principal, monthlyRate, months])

    const formatNumber = (num: number): string => {
        return num.toLocaleString('th-TH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    }

    const totalProfit = tableData.reduce((sum, row) => sum + row.profit, 0)
    const finalAmount = tableData.length > 0 ? (tableData.at(-1)?.total ?? 0) : 0

    return (
        <div className="mx-auto max-w-4xl">
            {/* Input Form */}
            <div className="mb-8 rounded-lg border border-skin-line bg-skin-card p-6">
                <h2 className="mb-4 text-xl font-semibold text-skin-accent">
                    คำนวณผลตอบแทนทบต้น
                </h2>
                <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                        <label
                            htmlFor="principal"
                            className="mb-2 block text-sm font-medium"
                        >
                            เงินต้น (บาท)
                        </label>
                        <input
                            type="number"
                            id="principal"
                            value={principal}
                            onChange={e => setPrincipal(e.target.value)}
                            className="w-full rounded-lg border border-skin-line bg-skin-fill px-4 py-2 focus:border-skin-accent focus:outline-none"
                            placeholder="10000"
                            min="0"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="rate"
                            className="mb-2 block text-sm font-medium"
                        >
                            กำไร % ต่อเดือน
                        </label>
                        <input
                            type="number"
                            id="rate"
                            value={monthlyRate}
                            onChange={e => setMonthlyRate(e.target.value)}
                            className="w-full rounded-lg border border-skin-line bg-skin-fill px-4 py-2 focus:border-skin-accent focus:outline-none"
                            placeholder="5"
                            min="0"
                            step="0.1"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="months"
                            className="mb-2 block text-sm font-medium"
                        >
                            จำนวนเดือน
                        </label>
                        <input
                            type="number"
                            id="months"
                            value={months}
                            onChange={e => setMonths(e.target.value)}
                            className="w-full rounded-lg border border-skin-line bg-skin-fill px-4 py-2 focus:border-skin-accent focus:outline-none"
                            placeholder="12"
                            min="1"
                        />
                    </div>
                </div>
            </div>

            {/* Summary */}
            {tableData.length > 0 && (
                <div className="mb-8 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-lg border border-skin-line bg-skin-card p-4 text-center">
                        <p className="text-sm opacity-70">เงินต้นเริ่มต้น</p>
                        <p className="text-2xl font-bold text-skin-accent">
                            ฿{formatNumber(Number.parseFloat(principal) || 0)}
                        </p>
                    </div>
                    <div className="rounded-lg border border-skin-line bg-skin-card p-4 text-center">
                        <p className="text-sm opacity-70">กำไรรวมทั้งหมด</p>
                        <p className="text-2xl font-bold text-green-500">
                            ฿{formatNumber(totalProfit)}
                        </p>
                    </div>
                    <div className="rounded-lg border border-skin-line bg-skin-card p-4 text-center">
                        <p className="text-sm opacity-70">ยอดรวมสุดท้าย</p>
                        <p className="text-2xl font-bold text-skin-accent">
                            ฿{formatNumber(finalAmount)}
                        </p>
                    </div>
                </div>
            )}

            {/* Table */}
            {tableData.length > 0 && (
                <div className="overflow-x-auto rounded-lg border border-skin-line">
                    <table className="w-full text-left">
                        <thead className="bg-skin-card">
                            <tr>
                                <th className="px-4 py-3 text-sm font-semibold">
                                    เดือน
                                </th>
                                <th className="px-4 py-3 text-right text-sm font-semibold">
                                    เงินต้น (บาท)
                                </th>
                                <th className="px-4 py-3 text-right text-sm font-semibold">
                                    กำไร (บาท)
                                </th>
                                <th className="px-4 py-3 text-right text-sm font-semibold">
                                    ยอดรวม (บาท)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, index) => (
                                <tr
                                    key={row.month}
                                    className={
                                        index % 2 === 0
                                            ? 'bg-skin-fill'
                                            : 'bg-skin-card/50'
                                    }
                                >
                                    <td className="px-4 py-3">{row.month}</td>
                                    <td className="px-4 py-3 text-right">
                                        {formatNumber(row.principal)}
                                    </td>
                                    <td className="px-4 py-3 text-right text-green-500">
                                        +{formatNumber(row.profit)}
                                    </td>
                                    <td className="px-4 py-3 text-right font-semibold">
                                        {formatNumber(row.total)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="border-t border-skin-line bg-skin-card">
                            <tr>
                                <td className="px-4 py-3 font-bold">รวม</td>
                                <td className="px-4 py-3 text-right">-</td>
                                <td className="px-4 py-3 text-right font-bold text-green-500">
                                    +{formatNumber(totalProfit)}
                                </td>
                                <td className="px-4 py-3 text-right font-bold text-skin-accent">
                                    {formatNumber(finalAmount)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            )}

            {tableData.length === 0 && (
                <div className="rounded-lg border border-skin-line bg-skin-card p-8 text-center opacity-70">
                    กรุณากรอกข้อมูลให้ครบถ้วน เพื่อดูตารางผลตอบแทน
                </div>
            )}
        </div>
    )
}
