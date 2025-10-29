// Type declarations for JSON imports
declare module '*.json' {
    const value: any
    export default value
}

// Specific type for thaikjv.json
declare module '../assets/thaikjv.json' {
    import type { ThaiKJVData } from '../types/bible'
    const data: ThaiKJVData
    export default data
}
