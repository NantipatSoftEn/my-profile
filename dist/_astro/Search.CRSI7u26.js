import { j as g } from './jsx-runtime.qnxbK-qf.js'
import { r as z } from './index.CQPPKyn2.js'
var K =
    typeof globalThis < 'u'
        ? globalThis
        : typeof window < 'u'
          ? window
          : typeof global < 'u'
            ? global
            : typeof self < 'u'
              ? self
              : {}
function et(t) {
    return t &&
        t.__esModule &&
        Object.prototype.hasOwnProperty.call(t, 'default')
        ? t.default
        : t
}
function N(t) {
    return Array.isArray ? Array.isArray(t) : ye(t) === '[object Array]'
}
const tt = 1 / 0
function st(t) {
    if (typeof t == 'string') return t
    let e = t + ''
    return e == '0' && 1 / t == -tt ? '-0' : e
}
function rt(t) {
    return t == null ? '' : st(t)
}
function _(t) {
    return typeof t == 'string'
}
function be(t) {
    return typeof t == 'number'
}
function nt(t) {
    return t === !0 || t === !1 || (it(t) && ye(t) == '[object Boolean]')
}
function Me(t) {
    return typeof t == 'object'
}
function it(t) {
    return Me(t) && t !== null
}
function E(t) {
    return t != null
}
function Y(t) {
    return !t.trim().length
}
function ye(t) {
    return t == null
        ? t === void 0
            ? '[object Undefined]'
            : '[object Null]'
        : Object.prototype.toString.call(t)
}
const ct = "Incorrect 'index' type",
    ot = t => `Invalid value for key ${t}`,
    at = t => `Pattern length exceeds max of ${t}.`,
    ut = t => `Missing ${t} property in key`,
    lt = t => `Property 'weight' in key '${t}' must be a positive integer`,
    he = Object.prototype.hasOwnProperty
class ht {
    constructor(e) {
        ;(this._keys = []), (this._keyMap = {})
        let s = 0
        e.forEach(r => {
            let n = Se(r)
            this._keys.push(n), (this._keyMap[n.id] = n), (s += n.weight)
        }),
            this._keys.forEach(r => {
                r.weight /= s
            })
    }
    get(e) {
        return this._keyMap[e]
    }
    keys() {
        return this._keys
    }
    toJSON() {
        return JSON.stringify(this._keys)
    }
}
function Se(t) {
    let e = null,
        s = null,
        r = null,
        n = 1,
        i = null
    if (_(t) || N(t)) (r = t), (e = fe(t)), (s = J(t))
    else {
        if (!he.call(t, 'name')) throw new Error(ut('name'))
        const c = t.name
        if (((r = c), he.call(t, 'weight') && ((n = t.weight), n <= 0)))
            throw new Error(lt(c))
        ;(e = fe(c)), (s = J(c)), (i = t.getFn)
    }
    return { path: e, id: s, weight: n, src: r, getFn: i }
}
function fe(t) {
    return N(t) ? t : t.split('.')
}
function J(t) {
    return N(t) ? t.join('.') : t
}
function ft(t, e) {
    let s = [],
        r = !1
    const n = (i, c, o) => {
        if (E(i))
            if (!c[o]) s.push(i)
            else {
                let a = c[o]
                const u = i[a]
                if (!E(u)) return
                if (o === c.length - 1 && (_(u) || be(u) || nt(u)))
                    s.push(rt(u))
                else if (N(u)) {
                    r = !0
                    for (let l = 0, d = u.length; l < d; l += 1)
                        n(u[l], c, o + 1)
                } else c.length && n(u, c, o + 1)
            }
    }
    return n(t, _(e) ? e.split('.') : e, 0), r ? s : s[0]
}
const dt = { includeMatches: !1, findAllMatches: !1, minMatchCharLength: 1 },
    gt = {
        isCaseSensitive: !1,
        includeScore: !1,
        keys: [],
        shouldSort: !0,
        sortFn: (t, e) =>
            t.score === e.score
                ? t.idx < e.idx
                    ? -1
                    : 1
                : t.score < e.score
                  ? -1
                  : 1,
    },
    xt = { location: 0, threshold: 0.6, distance: 100 },
    pt = {
        useExtendedSearch: !1,
        getFn: ft,
        ignoreLocation: !1,
        ignoreFieldNorm: !1,
        fieldNormWeight: 1,
    }
var f = { ...gt, ...dt, ...xt, ...pt }
const mt = /[^ ]+/g
function bt(t = 1, e = 3) {
    const s = new Map(),
        r = Math.pow(10, e)
    return {
        get(n) {
            const i = n.match(mt).length
            if (s.has(i)) return s.get(i)
            const c = 1 / Math.pow(i, 0.5 * t),
                o = parseFloat(Math.round(c * r) / r)
            return s.set(i, o), o
        },
        clear() {
            s.clear()
        },
    }
}
class se {
    constructor({
        getFn: e = f.getFn,
        fieldNormWeight: s = f.fieldNormWeight,
    } = {}) {
        ;(this.norm = bt(s, 3)),
            (this.getFn = e),
            (this.isCreated = !1),
            this.setIndexRecords()
    }
    setSources(e = []) {
        this.docs = e
    }
    setIndexRecords(e = []) {
        this.records = e
    }
    setKeys(e = []) {
        ;(this.keys = e),
            (this._keysMap = {}),
            e.forEach((s, r) => {
                this._keysMap[s.id] = r
            })
    }
    create() {
        this.isCreated ||
            !this.docs.length ||
            ((this.isCreated = !0),
            _(this.docs[0])
                ? this.docs.forEach((e, s) => {
                      this._addString(e, s)
                  })
                : this.docs.forEach((e, s) => {
                      this._addObject(e, s)
                  }),
            this.norm.clear())
    }
    add(e) {
        const s = this.size()
        _(e) ? this._addString(e, s) : this._addObject(e, s)
    }
    removeAt(e) {
        this.records.splice(e, 1)
        for (let s = e, r = this.size(); s < r; s += 1) this.records[s].i -= 1
    }
    getValueForItemAtKeyId(e, s) {
        return e[this._keysMap[s]]
    }
    size() {
        return this.records.length
    }
    _addString(e, s) {
        if (!E(e) || Y(e)) return
        let r = { v: e, i: s, n: this.norm.get(e) }
        this.records.push(r)
    }
    _addObject(e, s) {
        let r = { i: s, $: {} }
        this.keys.forEach((n, i) => {
            let c = n.getFn ? n.getFn(e) : this.getFn(e, n.path)
            if (E(c)) {
                if (N(c)) {
                    let o = []
                    const a = [{ nestedArrIndex: -1, value: c }]
                    for (; a.length; ) {
                        const { nestedArrIndex: u, value: l } = a.pop()
                        if (E(l))
                            if (_(l) && !Y(l)) {
                                let d = { v: l, i: u, n: this.norm.get(l) }
                                o.push(d)
                            } else
                                N(l) &&
                                    l.forEach((d, x) => {
                                        a.push({ nestedArrIndex: x, value: d })
                                    })
                    }
                    r.$[i] = o
                } else if (_(c) && !Y(c)) {
                    let o = { v: c, n: this.norm.get(c) }
                    r.$[i] = o
                }
            }
        }),
            this.records.push(r)
    }
    toJSON() {
        return { keys: this.keys, records: this.records }
    }
}
function we(
    t,
    e,
    { getFn: s = f.getFn, fieldNormWeight: r = f.fieldNormWeight } = {}
) {
    const n = new se({ getFn: s, fieldNormWeight: r })
    return n.setKeys(t.map(Se)), n.setSources(e), n.create(), n
}
function Mt(
    t,
    { getFn: e = f.getFn, fieldNormWeight: s = f.fieldNormWeight } = {}
) {
    const { keys: r, records: n } = t,
        i = new se({ getFn: e, fieldNormWeight: s })
    return i.setKeys(r), i.setIndexRecords(n), i
}
function V(
    t,
    {
        errors: e = 0,
        currentLocation: s = 0,
        expectedLocation: r = 0,
        distance: n = f.distance,
        ignoreLocation: i = f.ignoreLocation,
    } = {}
) {
    const c = e / t.length
    if (i) return c
    const o = Math.abs(r - s)
    return n ? c + o / n : o ? 1 : c
}
function yt(t = [], e = f.minMatchCharLength) {
    let s = [],
        r = -1,
        n = -1,
        i = 0
    for (let c = t.length; i < c; i += 1) {
        let o = t[i]
        o && r === -1
            ? (r = i)
            : !o &&
              r !== -1 &&
              ((n = i - 1), n - r + 1 >= e && s.push([r, n]), (r = -1))
    }
    return t[i - 1] && i - r >= e && s.push([r, i - 1]), s
}
const k = 32
function St(
    t,
    e,
    s,
    {
        location: r = f.location,
        distance: n = f.distance,
        threshold: i = f.threshold,
        findAllMatches: c = f.findAllMatches,
        minMatchCharLength: o = f.minMatchCharLength,
        includeMatches: a = f.includeMatches,
        ignoreLocation: u = f.ignoreLocation,
    } = {}
) {
    if (e.length > k) throw new Error(at(k))
    const l = e.length,
        d = t.length,
        x = Math.max(0, Math.min(r, d))
    let p = i,
        m = x
    const b = o > 1 || a,
        I = b ? Array(d) : []
    let j
    for (; (j = t.indexOf(e, m)) > -1; ) {
        let y = V(e, {
            currentLocation: j,
            expectedLocation: x,
            distance: n,
            ignoreLocation: u,
        })
        if (((p = Math.min(y, p)), (m = j + l), b)) {
            let A = 0
            for (; A < l; ) (I[j + A] = 1), (A += 1)
        }
    }
    m = -1
    let L = [],
        v = 1,
        C = l + d
    const H = 1 << (l - 1)
    for (let y = 0; y < l; y += 1) {
        let A = 0,
            R = C
        for (; A < R; )
            V(e, {
                errors: y,
                currentLocation: x + R,
                expectedLocation: x,
                distance: n,
                ignoreLocation: u,
            }) <= p
                ? (A = R)
                : (C = R),
                (R = Math.floor((C - A) / 2 + A))
        C = R
        let W = Math.max(1, x - R + 1),
            $ = c ? d : Math.min(x + R, d) + l,
            w = Array($ + 2)
        w[$ + 1] = (1 << y) - 1
        for (let S = $; S >= W; S -= 1) {
            let F = S - 1,
                D = s[t.charAt(F)]
            if (
                (b && (I[F] = +!!D),
                (w[S] = ((w[S + 1] << 1) | 1) & D),
                y && (w[S] |= ((L[S + 1] | L[S]) << 1) | 1 | L[S + 1]),
                w[S] & H &&
                    ((v = V(e, {
                        errors: y,
                        currentLocation: F,
                        expectedLocation: x,
                        distance: n,
                        ignoreLocation: u,
                    })),
                    v <= p))
            ) {
                if (((p = v), (m = F), m <= x)) break
                W = Math.max(1, 2 * x - m)
            }
        }
        if (
            V(e, {
                errors: y + 1,
                currentLocation: x,
                expectedLocation: x,
                distance: n,
                ignoreLocation: u,
            }) > p
        )
            break
        L = w
    }
    const T = { isMatch: m >= 0, score: Math.max(0.001, v) }
    if (b) {
        const y = yt(I, o)
        y.length ? a && (T.indices = y) : (T.isMatch = !1)
    }
    return T
}
function wt(t) {
    let e = {}
    for (let s = 0, r = t.length; s < r; s += 1) {
        const n = t.charAt(s)
        e[n] = (e[n] || 0) | (1 << (r - s - 1))
    }
    return e
}
class Ee {
    constructor(
        e,
        {
            location: s = f.location,
            threshold: r = f.threshold,
            distance: n = f.distance,
            includeMatches: i = f.includeMatches,
            findAllMatches: c = f.findAllMatches,
            minMatchCharLength: o = f.minMatchCharLength,
            isCaseSensitive: a = f.isCaseSensitive,
            ignoreLocation: u = f.ignoreLocation,
        } = {}
    ) {
        if (
            ((this.options = {
                location: s,
                threshold: r,
                distance: n,
                includeMatches: i,
                findAllMatches: c,
                minMatchCharLength: o,
                isCaseSensitive: a,
                ignoreLocation: u,
            }),
            (this.pattern = a ? e : e.toLowerCase()),
            (this.chunks = []),
            !this.pattern.length)
        )
            return
        const l = (x, p) => {
                this.chunks.push({ pattern: x, alphabet: wt(x), startIndex: p })
            },
            d = this.pattern.length
        if (d > k) {
            let x = 0
            const p = d % k,
                m = d - p
            for (; x < m; ) l(this.pattern.substr(x, k), x), (x += k)
            if (p) {
                const b = d - k
                l(this.pattern.substr(b), b)
            }
        } else l(this.pattern, 0)
    }
    searchIn(e) {
        const { isCaseSensitive: s, includeMatches: r } = this.options
        if ((s || (e = e.toLowerCase()), this.pattern === e)) {
            let m = { isMatch: !0, score: 0 }
            return r && (m.indices = [[0, e.length - 1]]), m
        }
        const {
            location: n,
            distance: i,
            threshold: c,
            findAllMatches: o,
            minMatchCharLength: a,
            ignoreLocation: u,
        } = this.options
        let l = [],
            d = 0,
            x = !1
        this.chunks.forEach(({ pattern: m, alphabet: b, startIndex: I }) => {
            const {
                isMatch: j,
                score: L,
                indices: v,
            } = St(e, m, b, {
                location: n + I,
                distance: i,
                threshold: c,
                findAllMatches: o,
                minMatchCharLength: a,
                includeMatches: r,
                ignoreLocation: u,
            })
            j && (x = !0), (d += L), j && v && (l = [...l, ...v])
        })
        let p = { isMatch: x, score: x ? d / this.chunks.length : 1 }
        return x && r && (p.indices = l), p
    }
}
class O {
    constructor(e) {
        this.pattern = e
    }
    static isMultiMatch(e) {
        return de(e, this.multiRegex)
    }
    static isSingleMatch(e) {
        return de(e, this.singleRegex)
    }
    search() {}
}
function de(t, e) {
    const s = t.match(e)
    return s ? s[1] : null
}
class Et extends O {
    constructor(e) {
        super(e)
    }
    static get type() {
        return 'exact'
    }
    static get multiRegex() {
        return /^="(.*)"$/
    }
    static get singleRegex() {
        return /^=(.*)$/
    }
    search(e) {
        const s = e === this.pattern
        return {
            isMatch: s,
            score: s ? 0 : 1,
            indices: [0, this.pattern.length - 1],
        }
    }
}
class jt extends O {
    constructor(e) {
        super(e)
    }
    static get type() {
        return 'inverse-exact'
    }
    static get multiRegex() {
        return /^!"(.*)"$/
    }
    static get singleRegex() {
        return /^!(.*)$/
    }
    search(e) {
        const r = e.indexOf(this.pattern) === -1
        return { isMatch: r, score: r ? 0 : 1, indices: [0, e.length - 1] }
    }
}
class It extends O {
    constructor(e) {
        super(e)
    }
    static get type() {
        return 'prefix-exact'
    }
    static get multiRegex() {
        return /^\^"(.*)"$/
    }
    static get singleRegex() {
        return /^\^(.*)$/
    }
    search(e) {
        const s = e.startsWith(this.pattern)
        return {
            isMatch: s,
            score: s ? 0 : 1,
            indices: [0, this.pattern.length - 1],
        }
    }
}
class vt extends O {
    constructor(e) {
        super(e)
    }
    static get type() {
        return 'inverse-prefix-exact'
    }
    static get multiRegex() {
        return /^!\^"(.*)"$/
    }
    static get singleRegex() {
        return /^!\^(.*)$/
    }
    search(e) {
        const s = !e.startsWith(this.pattern)
        return { isMatch: s, score: s ? 0 : 1, indices: [0, e.length - 1] }
    }
}
class At extends O {
    constructor(e) {
        super(e)
    }
    static get type() {
        return 'suffix-exact'
    }
    static get multiRegex() {
        return /^"(.*)"\$$/
    }
    static get singleRegex() {
        return /^(.*)\$$/
    }
    search(e) {
        const s = e.endsWith(this.pattern)
        return {
            isMatch: s,
            score: s ? 0 : 1,
            indices: [e.length - this.pattern.length, e.length - 1],
        }
    }
}
class Rt extends O {
    constructor(e) {
        super(e)
    }
    static get type() {
        return 'inverse-suffix-exact'
    }
    static get multiRegex() {
        return /^!"(.*)"\$$/
    }
    static get singleRegex() {
        return /^!(.*)\$$/
    }
    search(e) {
        const s = !e.endsWith(this.pattern)
        return { isMatch: s, score: s ? 0 : 1, indices: [0, e.length - 1] }
    }
}
class je extends O {
    constructor(
        e,
        {
            location: s = f.location,
            threshold: r = f.threshold,
            distance: n = f.distance,
            includeMatches: i = f.includeMatches,
            findAllMatches: c = f.findAllMatches,
            minMatchCharLength: o = f.minMatchCharLength,
            isCaseSensitive: a = f.isCaseSensitive,
            ignoreLocation: u = f.ignoreLocation,
        } = {}
    ) {
        super(e),
            (this._bitapSearch = new Ee(e, {
                location: s,
                threshold: r,
                distance: n,
                includeMatches: i,
                findAllMatches: c,
                minMatchCharLength: o,
                isCaseSensitive: a,
                ignoreLocation: u,
            }))
    }
    static get type() {
        return 'fuzzy'
    }
    static get multiRegex() {
        return /^"(.*)"$/
    }
    static get singleRegex() {
        return /^(.*)$/
    }
    search(e) {
        return this._bitapSearch.searchIn(e)
    }
}
class Ie extends O {
    constructor(e) {
        super(e)
    }
    static get type() {
        return 'include'
    }
    static get multiRegex() {
        return /^'"(.*)"$/
    }
    static get singleRegex() {
        return /^'(.*)$/
    }
    search(e) {
        let s = 0,
            r
        const n = [],
            i = this.pattern.length
        for (; (r = e.indexOf(this.pattern, s)) > -1; )
            (s = r + i), n.push([r, s - 1])
        const c = !!n.length
        return { isMatch: c, score: c ? 0 : 1, indices: n }
    }
}
const Q = [Et, Ie, It, vt, Rt, At, jt, je],
    ge = Q.length,
    _t = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,
    Lt = '|'
function Nt(t, e = {}) {
    return t.split(Lt).map(s => {
        let r = s
                .trim()
                .split(_t)
                .filter(i => i && !!i.trim()),
            n = []
        for (let i = 0, c = r.length; i < c; i += 1) {
            const o = r[i]
            let a = !1,
                u = -1
            for (; !a && ++u < ge; ) {
                const l = Q[u]
                let d = l.isMultiMatch(o)
                d && (n.push(new l(d, e)), (a = !0))
            }
            if (!a)
                for (u = -1; ++u < ge; ) {
                    const l = Q[u]
                    let d = l.isSingleMatch(o)
                    if (d) {
                        n.push(new l(d, e))
                        break
                    }
                }
        }
        return n
    })
}
const Ot = new Set([je.type, Ie.type])
class kt {
    constructor(
        e,
        {
            isCaseSensitive: s = f.isCaseSensitive,
            includeMatches: r = f.includeMatches,
            minMatchCharLength: n = f.minMatchCharLength,
            ignoreLocation: i = f.ignoreLocation,
            findAllMatches: c = f.findAllMatches,
            location: o = f.location,
            threshold: a = f.threshold,
            distance: u = f.distance,
        } = {}
    ) {
        ;(this.query = null),
            (this.options = {
                isCaseSensitive: s,
                includeMatches: r,
                minMatchCharLength: n,
                findAllMatches: c,
                ignoreLocation: i,
                location: o,
                threshold: a,
                distance: u,
            }),
            (this.pattern = s ? e : e.toLowerCase()),
            (this.query = Nt(this.pattern, this.options))
    }
    static condition(e, s) {
        return s.useExtendedSearch
    }
    searchIn(e) {
        const s = this.query
        if (!s) return { isMatch: !1, score: 1 }
        const { includeMatches: r, isCaseSensitive: n } = this.options
        e = n ? e : e.toLowerCase()
        let i = 0,
            c = [],
            o = 0
        for (let a = 0, u = s.length; a < u; a += 1) {
            const l = s[a]
            ;(c.length = 0), (i = 0)
            for (let d = 0, x = l.length; d < x; d += 1) {
                const p = l[d],
                    { isMatch: m, indices: b, score: I } = p.search(e)
                if (m) {
                    if (((i += 1), (o += I), r)) {
                        const j = p.constructor.type
                        Ot.has(j) ? (c = [...c, ...b]) : c.push(b)
                    }
                } else {
                    ;(o = 0), (i = 0), (c.length = 0)
                    break
                }
            }
            if (i) {
                let d = { isMatch: !0, score: o / i }
                return r && (d.indices = c), d
            }
        }
        return { isMatch: !1, score: 1 }
    }
}
const X = []
function Ct(...t) {
    X.push(...t)
}
function q(t, e) {
    for (let s = 0, r = X.length; s < r; s += 1) {
        let n = X[s]
        if (n.condition(t, e)) return new n(t, e)
    }
    return new Ee(t, e)
}
const G = { AND: '$and', OR: '$or' },
    ee = { PATH: '$path', PATTERN: '$val' },
    te = t => !!(t[G.AND] || t[G.OR]),
    Tt = t => !!t[ee.PATH],
    $t = t => !N(t) && Me(t) && !te(t),
    xe = t => ({ [G.AND]: Object.keys(t).map(e => ({ [e]: t[e] })) })
function ve(t, e, { auto: s = !0 } = {}) {
    const r = n => {
        let i = Object.keys(n)
        const c = Tt(n)
        if (!c && i.length > 1 && !te(n)) return r(xe(n))
        if ($t(n)) {
            const a = c ? n[ee.PATH] : i[0],
                u = c ? n[ee.PATTERN] : n[a]
            if (!_(u)) throw new Error(ot(a))
            const l = { keyId: J(a), pattern: u }
            return s && (l.searcher = q(u, e)), l
        }
        let o = { children: [], operator: i[0] }
        return (
            i.forEach(a => {
                const u = n[a]
                N(u) &&
                    u.forEach(l => {
                        o.children.push(r(l))
                    })
            }),
            o
        )
    }
    return te(t) || (t = xe(t)), r(t)
}
function Ft(t, { ignoreFieldNorm: e = f.ignoreFieldNorm }) {
    t.forEach(s => {
        let r = 1
        s.matches.forEach(({ key: n, norm: i, score: c }) => {
            const o = n ? n.weight : null
            r *= Math.pow(
                c === 0 && o ? Number.EPSILON : c,
                (o || 1) * (e ? 1 : i)
            )
        }),
            (s.score = r)
    })
}
function Pt(t, e) {
    const s = t.matches
    ;(e.matches = []),
        E(s) &&
            s.forEach(r => {
                if (!E(r.indices) || !r.indices.length) return
                const { indices: n, value: i } = r
                let c = { indices: n, value: i }
                r.key && (c.key = r.key.src),
                    r.idx > -1 && (c.refIndex = r.idx),
                    e.matches.push(c)
            })
}
function zt(t, e) {
    e.score = t.score
}
function Ut(
    t,
    e,
    {
        includeMatches: s = f.includeMatches,
        includeScore: r = f.includeScore,
    } = {}
) {
    const n = []
    return (
        s && n.push(Pt),
        r && n.push(zt),
        t.map(i => {
            const { idx: c } = i,
                o = { item: e[c], refIndex: c }
            return (
                n.length &&
                    n.forEach(a => {
                        a(i, o)
                    }),
                o
            )
        })
    )
}
class U {
    constructor(e, s = {}, r) {
        ;(this.options = { ...f, ...s }),
            this.options.useExtendedSearch,
            (this._keyStore = new ht(this.options.keys)),
            this.setCollection(e, r)
    }
    setCollection(e, s) {
        if (((this._docs = e), s && !(s instanceof se))) throw new Error(ct)
        this._myIndex =
            s ||
            we(this.options.keys, this._docs, {
                getFn: this.options.getFn,
                fieldNormWeight: this.options.fieldNormWeight,
            })
    }
    add(e) {
        E(e) && (this._docs.push(e), this._myIndex.add(e))
    }
    remove(e = () => !1) {
        const s = []
        for (let r = 0, n = this._docs.length; r < n; r += 1) {
            const i = this._docs[r]
            e(i, r) && (this.removeAt(r), (r -= 1), (n -= 1), s.push(i))
        }
        return s
    }
    removeAt(e) {
        this._docs.splice(e, 1), this._myIndex.removeAt(e)
    }
    getIndex() {
        return this._myIndex
    }
    search(e, { limit: s = -1 } = {}) {
        const {
            includeMatches: r,
            includeScore: n,
            shouldSort: i,
            sortFn: c,
            ignoreFieldNorm: o,
        } = this.options
        let a = _(e)
            ? _(this._docs[0])
                ? this._searchStringList(e)
                : this._searchObjectList(e)
            : this._searchLogical(e)
        return (
            Ft(a, { ignoreFieldNorm: o }),
            i && a.sort(c),
            be(s) && s > -1 && (a = a.slice(0, s)),
            Ut(a, this._docs, { includeMatches: r, includeScore: n })
        )
    }
    _searchStringList(e) {
        const s = q(e, this.options),
            { records: r } = this._myIndex,
            n = []
        return (
            r.forEach(({ v: i, i: c, n: o }) => {
                if (!E(i)) return
                const { isMatch: a, score: u, indices: l } = s.searchIn(i)
                a &&
                    n.push({
                        item: i,
                        idx: c,
                        matches: [{ score: u, value: i, norm: o, indices: l }],
                    })
            }),
            n
        )
    }
    _searchLogical(e) {
        const s = ve(e, this.options),
            r = (o, a, u) => {
                if (!o.children) {
                    const { keyId: d, searcher: x } = o,
                        p = this._findMatches({
                            key: this._keyStore.get(d),
                            value: this._myIndex.getValueForItemAtKeyId(a, d),
                            searcher: x,
                        })
                    return p && p.length
                        ? [{ idx: u, item: a, matches: p }]
                        : []
                }
                const l = []
                for (let d = 0, x = o.children.length; d < x; d += 1) {
                    const p = o.children[d],
                        m = r(p, a, u)
                    if (m.length) l.push(...m)
                    else if (o.operator === G.AND) return []
                }
                return l
            },
            n = this._myIndex.records,
            i = {},
            c = []
        return (
            n.forEach(({ $: o, i: a }) => {
                if (E(o)) {
                    let u = r(s, o, a)
                    u.length &&
                        (i[a] ||
                            ((i[a] = { idx: a, item: o, matches: [] }),
                            c.push(i[a])),
                        u.forEach(({ matches: l }) => {
                            i[a].matches.push(...l)
                        }))
                }
            }),
            c
        )
    }
    _searchObjectList(e) {
        const s = q(e, this.options),
            { keys: r, records: n } = this._myIndex,
            i = []
        return (
            n.forEach(({ $: c, i: o }) => {
                if (!E(c)) return
                let a = []
                r.forEach((u, l) => {
                    a.push(
                        ...this._findMatches({
                            key: u,
                            value: c[l],
                            searcher: s,
                        })
                    )
                }),
                    a.length && i.push({ idx: o, item: c, matches: a })
            }),
            i
        )
    }
    _findMatches({ key: e, value: s, searcher: r }) {
        if (!E(s)) return []
        let n = []
        if (N(s))
            s.forEach(({ v: i, i: c, n: o }) => {
                if (!E(i)) return
                const { isMatch: a, score: u, indices: l } = r.searchIn(i)
                a &&
                    n.push({
                        score: u,
                        key: e,
                        value: i,
                        idx: c,
                        norm: o,
                        indices: l,
                    })
            })
        else {
            const { v: i, n: c } = s,
                { isMatch: o, score: a, indices: u } = r.searchIn(i)
            o && n.push({ score: a, key: e, value: i, norm: c, indices: u })
        }
        return n
    }
}
U.version = '7.0.0'
U.createIndex = we
U.parseIndex = Mt
U.config = f
U.parseQuery = ve
Ct(kt)
var Z, pe
function Wt() {
    if (pe) return Z
    pe = 1
    var t = 1 / 0,
        e = '[object Symbol]',
        s = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
        r = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
        n = '\\ud800-\\udfff',
        i = '\\u0300-\\u036f\\ufe20-\\ufe23',
        c = '\\u20d0-\\u20f0',
        o = '\\u2700-\\u27bf',
        a = 'a-z\\xdf-\\xf6\\xf8-\\xff',
        u = '\\xac\\xb1\\xd7\\xf7',
        l = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
        d = '\\u2000-\\u206f',
        x =
            ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
        p = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
        m = '\\ufe0e\\ufe0f',
        b = u + l + d + x,
        I = "['’]",
        j = '[' + b + ']',
        L = '[' + i + c + ']',
        v = '\\d+',
        C = '[' + o + ']',
        H = '[' + a + ']',
        T = '[^' + n + b + v + o + a + p + ']',
        y = '\\ud83c[\\udffb-\\udfff]',
        A = '(?:' + L + '|' + y + ')',
        R = '[^' + n + ']',
        W = '(?:\\ud83c[\\udde6-\\uddff]){2}',
        $ = '[\\ud800-\\udbff][\\udc00-\\udfff]',
        w = '[' + p + ']',
        re = '\\u200d',
        S = '(?:' + H + '|' + T + ')',
        F = '(?:' + w + '|' + T + ')',
        D = '(?:' + I + '(?:d|ll|m|re|s|t|ve))?',
        ne = '(?:' + I + '(?:D|LL|M|RE|S|T|VE))?',
        ie = A + '?',
        ce = '[' + m + ']?',
        Ae = '(?:' + re + '(?:' + [R, W, $].join('|') + ')' + ce + ie + ')*',
        Re = ce + ie + Ae,
        _e = '(?:' + [C, W, $].join('|') + ')' + Re,
        Le = RegExp(I, 'g'),
        Ne = RegExp(L, 'g'),
        Oe = RegExp(
            [
                w + '?' + H + '+' + D + '(?=' + [j, w, '$'].join('|') + ')',
                F + '+' + ne + '(?=' + [j, w + S, '$'].join('|') + ')',
                w + '?' + S + '+' + D,
                w + '+' + ne,
                v,
                _e,
            ].join('|'),
            'g'
        ),
        ke =
            /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
        Ce = {
            À: 'A',
            Á: 'A',
            Â: 'A',
            Ã: 'A',
            Ä: 'A',
            Å: 'A',
            à: 'a',
            á: 'a',
            â: 'a',
            ã: 'a',
            ä: 'a',
            å: 'a',
            Ç: 'C',
            ç: 'c',
            Ð: 'D',
            ð: 'd',
            È: 'E',
            É: 'E',
            Ê: 'E',
            Ë: 'E',
            è: 'e',
            é: 'e',
            ê: 'e',
            ë: 'e',
            Ì: 'I',
            Í: 'I',
            Î: 'I',
            Ï: 'I',
            ì: 'i',
            í: 'i',
            î: 'i',
            ï: 'i',
            Ñ: 'N',
            ñ: 'n',
            Ò: 'O',
            Ó: 'O',
            Ô: 'O',
            Õ: 'O',
            Ö: 'O',
            Ø: 'O',
            ò: 'o',
            ó: 'o',
            ô: 'o',
            õ: 'o',
            ö: 'o',
            ø: 'o',
            Ù: 'U',
            Ú: 'U',
            Û: 'U',
            Ü: 'U',
            ù: 'u',
            ú: 'u',
            û: 'u',
            ü: 'u',
            Ý: 'Y',
            ý: 'y',
            ÿ: 'y',
            Æ: 'Ae',
            æ: 'ae',
            Þ: 'Th',
            þ: 'th',
            ß: 'ss',
            Ā: 'A',
            Ă: 'A',
            Ą: 'A',
            ā: 'a',
            ă: 'a',
            ą: 'a',
            Ć: 'C',
            Ĉ: 'C',
            Ċ: 'C',
            Č: 'C',
            ć: 'c',
            ĉ: 'c',
            ċ: 'c',
            č: 'c',
            Ď: 'D',
            Đ: 'D',
            ď: 'd',
            đ: 'd',
            Ē: 'E',
            Ĕ: 'E',
            Ė: 'E',
            Ę: 'E',
            Ě: 'E',
            ē: 'e',
            ĕ: 'e',
            ė: 'e',
            ę: 'e',
            ě: 'e',
            Ĝ: 'G',
            Ğ: 'G',
            Ġ: 'G',
            Ģ: 'G',
            ĝ: 'g',
            ğ: 'g',
            ġ: 'g',
            ģ: 'g',
            Ĥ: 'H',
            Ħ: 'H',
            ĥ: 'h',
            ħ: 'h',
            Ĩ: 'I',
            Ī: 'I',
            Ĭ: 'I',
            Į: 'I',
            İ: 'I',
            ĩ: 'i',
            ī: 'i',
            ĭ: 'i',
            į: 'i',
            ı: 'i',
            Ĵ: 'J',
            ĵ: 'j',
            Ķ: 'K',
            ķ: 'k',
            ĸ: 'k',
            Ĺ: 'L',
            Ļ: 'L',
            Ľ: 'L',
            Ŀ: 'L',
            Ł: 'L',
            ĺ: 'l',
            ļ: 'l',
            ľ: 'l',
            ŀ: 'l',
            ł: 'l',
            Ń: 'N',
            Ņ: 'N',
            Ň: 'N',
            Ŋ: 'N',
            ń: 'n',
            ņ: 'n',
            ň: 'n',
            ŋ: 'n',
            Ō: 'O',
            Ŏ: 'O',
            Ő: 'O',
            ō: 'o',
            ŏ: 'o',
            ő: 'o',
            Ŕ: 'R',
            Ŗ: 'R',
            Ř: 'R',
            ŕ: 'r',
            ŗ: 'r',
            ř: 'r',
            Ś: 'S',
            Ŝ: 'S',
            Ş: 'S',
            Š: 'S',
            ś: 's',
            ŝ: 's',
            ş: 's',
            š: 's',
            Ţ: 'T',
            Ť: 'T',
            Ŧ: 'T',
            ţ: 't',
            ť: 't',
            ŧ: 't',
            Ũ: 'U',
            Ū: 'U',
            Ŭ: 'U',
            Ů: 'U',
            Ű: 'U',
            Ų: 'U',
            ũ: 'u',
            ū: 'u',
            ŭ: 'u',
            ů: 'u',
            ű: 'u',
            ų: 'u',
            Ŵ: 'W',
            ŵ: 'w',
            Ŷ: 'Y',
            ŷ: 'y',
            Ÿ: 'Y',
            Ź: 'Z',
            Ż: 'Z',
            Ž: 'Z',
            ź: 'z',
            ż: 'z',
            ž: 'z',
            Ĳ: 'IJ',
            ĳ: 'ij',
            Œ: 'Oe',
            œ: 'oe',
            ŉ: "'n",
            ſ: 'ss',
        },
        Te = typeof K == 'object' && K && K.Object === Object && K,
        $e = typeof self == 'object' && self && self.Object === Object && self,
        Fe = Te || $e || Function('return this')()
    function Pe(h, M, P, Yt) {
        for (var B = -1, qe = h ? h.length : 0; ++B < qe; ) P = M(P, h[B], B, h)
        return P
    }
    function ze(h) {
        return h.match(s) || []
    }
    function Ue(h) {
        return function (M) {
            return h?.[M]
        }
    }
    var We = Ue(Ce)
    function De(h) {
        return ke.test(h)
    }
    function He(h) {
        return h.match(Oe) || []
    }
    var Ke = Object.prototype,
        Ve = Ke.toString,
        oe = Fe.Symbol,
        ae = oe ? oe.prototype : void 0,
        ue = ae ? ae.toString : void 0
    function Ge(h) {
        if (typeof h == 'string') return h
        if (Ze(h)) return ue ? ue.call(h) : ''
        var M = h + ''
        return M == '0' && 1 / h == -t ? '-0' : M
    }
    function Be(h) {
        return function (M) {
            return Pe(Xe(Je(M).replace(Le, '')), h, '')
        }
    }
    function Ye(h) {
        return !!h && typeof h == 'object'
    }
    function Ze(h) {
        return typeof h == 'symbol' || (Ye(h) && Ve.call(h) == e)
    }
    function le(h) {
        return h == null ? '' : Ge(h)
    }
    function Je(h) {
        return (h = le(h)), h && h.replace(r, We).replace(Ne, '')
    }
    var Qe = Be(function (h, M, P) {
        return h + (P ? '-' : '') + M.toLowerCase()
    })
    function Xe(h, M, P) {
        return (
            (h = le(h)),
            (M = M),
            M === void 0 ? (De(h) ? He(h) : ze(h)) : h.match(M) || []
        )
    }
    return (Z = Qe), Z
}
var Dt = Wt()
const Ht = et(Dt),
    Kt = t => Ht(t),
    me = { lang: 'en', langTag: ['en-EN'] }
function Vt({
    pubDatetime: t,
    modDatetime: e,
    size: s = 'sm',
    className: r = '',
}) {
    return g.jsxs('div', {
        className: `flex items-center space-x-2 opacity-80 ${r}`.trim(),
        children: [
            g.jsxs('svg', {
                xmlns: 'http://www.w3.org/2000/svg',
                className: `${s === 'sm' ? 'scale-90' : 'scale-100'} inline-block h-6 w-6 min-w-[1.375rem] fill-skin-base`,
                'aria-hidden': 'true',
                children: [
                    g.jsx('path', {
                        d: 'M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z',
                    }),
                    g.jsx('path', {
                        d: 'M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z',
                    }),
                ],
            }),
            e && e > t
                ? g.jsx('span', {
                      className: `italic ${s === 'sm' ? 'text-sm' : 'text-base'}`,
                      children: 'Updated:',
                  })
                : g.jsx('span', {
                      className: 'sr-only',
                      children: 'Published:',
                  }),
            g.jsx('span', {
                className: `italic ${s === 'sm' ? 'text-sm' : 'text-base'}`,
                children: g.jsx(Gt, { pubDatetime: t, modDatetime: e }),
            }),
        ],
    })
}
const Gt = ({ pubDatetime: t, modDatetime: e }) => {
    const s = new Date(e && e > t ? e : t),
        r = s.toLocaleDateString(me.langTag, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }),
        n = s.toLocaleTimeString(me.langTag, {
            hour: '2-digit',
            minute: '2-digit',
        })
    return g.jsxs(g.Fragment, {
        children: [
            g.jsx('time', { dateTime: s.toISOString(), children: r }),
            g.jsx('span', { 'aria-hidden': 'true', children: ' | ' }),
            g.jsx('span', { className: 'sr-only', children: ' at ' }),
            g.jsx('span', { className: 'text-nowrap', children: n }),
        ],
    })
}
function Bt({ href: t, frontmatter: e, secHeading: s = !0 }) {
    const {
            title: r,
            pubDatetime: n,
            modDatetime: i,
            description: c,
            ogImage: o,
        } = e,
        a = {
            style: { viewTransitionName: Kt(r) },
            className: 'text-lg font-medium decoration-dashed hover:underline',
        },
        u = typeof o == 'string' ? o : o?.src || ''
    return g.jsx('li', {
        className: 'my-6',
        children: g.jsxs('div', {
            className: 'flex flex-col md:flex-row gap-4',
            children: [
                u &&
                    g.jsx('a', {
                        href: t,
                        className: 'md:w-1/3 overflow-hidden rounded-lg',
                        children: g.jsx('img', {
                            src: u,
                            alt: r,
                            className:
                                'h-300 w-full object-cover transition-transform duration-300 hover:scale-105',
                        }),
                    }),
                g.jsxs('div', {
                    className: u ? 'md:w-2/3' : 'w-full',
                    children: [
                        g.jsx('a', {
                            href: t,
                            className:
                                'inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0',
                            children: s
                                ? g.jsx('h2', { ...a, children: r })
                                : g.jsx('h3', { ...a, children: r }),
                        }),
                        g.jsx(Vt, { pubDatetime: n, modDatetime: i }),
                        g.jsx('p', { children: c }),
                    ],
                }),
            ],
        }),
    })
}
function Qt({ searchList: t }) {
    const e = z.useRef(null),
        [s, r] = z.useState(''),
        [n, i] = z.useState(null),
        c = a => {
            r(a.currentTarget.value)
        },
        o = z.useMemo(
            () =>
                new U(t, {
                    keys: ['title', 'description'],
                    includeMatches: !0,
                    minMatchCharLength: 2,
                    threshold: 0.5,
                }),
            [t]
        )
    return (
        z.useEffect(() => {
            const u = new URLSearchParams(window.location.search).get('q')
            u && r(u),
                setTimeout(function () {
                    e.current.selectionStart = e.current.selectionEnd =
                        u?.length || 0
                }, 50)
        }, []),
        z.useEffect(() => {
            const a = s.length > 1 ? o.search(s) : []
            if ((i(a), s.length > 0)) {
                const u = new URLSearchParams(window.location.search)
                u.set('q', s)
                const l = window.location.pathname + '?' + u.toString()
                history.replaceState(history.state, '', l)
            } else
                history.replaceState(
                    history.state,
                    '',
                    window.location.pathname
                )
        }, [s]),
        g.jsxs(g.Fragment, {
            children: [
                g.jsxs('label', {
                    className: 'relative block',
                    children: [
                        g.jsxs('span', {
                            className:
                                'absolute inset-y-0 left-0 flex items-center pl-2 opacity-75',
                            children: [
                                g.jsx('svg', {
                                    xmlns: 'http://www.w3.org/2000/svg',
                                    'aria-hidden': 'true',
                                    children: g.jsx('path', {
                                        d: 'M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z',
                                    }),
                                }),
                                g.jsx('span', {
                                    className: 'sr-only',
                                    children: 'Search',
                                }),
                            ],
                        }),
                        g.jsx('input', {
                            className:
                                'block w-full rounded border border-skin-fill/40 bg-skin-fill py-3 pl-10 pr-3 placeholder:italic focus:border-skin-accent focus:outline-none',
                            placeholder: 'Search for anything...',
                            type: 'text',
                            name: 'search',
                            value: s,
                            onChange: c,
                            autoComplete: 'off',
                            ref: e,
                        }),
                    ],
                }),
                s.length > 1 &&
                    g.jsxs('div', {
                        className: 'mt-8',
                        children: [
                            'Found ',
                            n?.length,
                            n?.length && n?.length === 1
                                ? ' result'
                                : ' results',
                            ' ',
                            "for '",
                            s,
                            "'",
                        ],
                    }),
                g.jsx('ul', {
                    children:
                        n &&
                        n.map(({ item: a, refIndex: u }) =>
                            g.jsx(
                                Bt,
                                {
                                    href: `/posts/${a.id}/`,
                                    frontmatter: a.data,
                                },
                                `${u}-${a.id}`
                            )
                        ),
                }),
            ],
        })
    )
}
export { Qt as default }
