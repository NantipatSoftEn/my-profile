import { r as nt, a as z } from './index.CcfSqGrV.js'
var V =
    typeof globalThis < 'u'
        ? globalThis
        : typeof window < 'u'
          ? window
          : typeof global < 'u'
            ? global
            : typeof self < 'u'
              ? self
              : {}
function it(t) {
    return t &&
        t.__esModule &&
        Object.prototype.hasOwnProperty.call(t, 'default')
        ? t.default
        : t
}
var Y = { exports: {} },
    H = {}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var de
function ct() {
    if (de) return H
    de = 1
    var t = nt(),
        e = Symbol.for('react.element'),
        s = Symbol.for('react.fragment'),
        r = Object.prototype.hasOwnProperty,
        n =
            t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
                .ReactCurrentOwner,
        i = { key: !0, ref: !0, __self: !0, __source: !0 }
    function c(a, o, u) {
        var l,
            h = {},
            g = null,
            x = null
        u !== void 0 && (g = '' + u),
            o.key !== void 0 && (g = '' + o.key),
            o.ref !== void 0 && (x = o.ref)
        for (l in o) r.call(o, l) && !i.hasOwnProperty(l) && (h[l] = o[l])
        if (a && a.defaultProps)
            for (l in ((o = a.defaultProps), o))
                h[l] === void 0 && (h[l] = o[l])
        return {
            $$typeof: e,
            type: a,
            key: g,
            ref: x,
            props: h,
            _owner: n.current,
        }
    }
    return (H.Fragment = s), (H.jsx = c), (H.jsxs = c), H
}
var ge
function ot() {
    return ge || ((ge = 1), (Y.exports = ct())), Y.exports
}
var p = ot()
function L(t) {
    return Array.isArray ? Array.isArray(t) : Ee(t) === '[object Array]'
}
const at = 1 / 0
function ut(t) {
    if (typeof t == 'string') return t
    let e = t + ''
    return e == '0' && 1 / t == -at ? '-0' : e
}
function lt(t) {
    return t == null ? '' : ut(t)
}
function A(t) {
    return typeof t == 'string'
}
function _e(t) {
    return typeof t == 'number'
}
function ht(t) {
    return t === !0 || t === !1 || (ft(t) && Ee(t) == '[object Boolean]')
}
function we(t) {
    return typeof t == 'object'
}
function ft(t) {
    return we(t) && t !== null
}
function w(t) {
    return t != null
}
function Z(t) {
    return !t.trim().length
}
function Ee(t) {
    return t == null
        ? t === void 0
            ? '[object Undefined]'
            : '[object Null]'
        : Object.prototype.toString.call(t)
}
const dt = "Incorrect 'index' type",
    gt = t => `Invalid value for key ${t}`,
    pt = t => `Pattern length exceeds max of ${t}.`,
    xt = t => `Missing ${t} property in key`,
    mt = t => `Property 'weight' in key '${t}' must be a positive integer`,
    pe = Object.prototype.hasOwnProperty
class bt {
    constructor(e) {
        ;(this._keys = []), (this._keyMap = {})
        let s = 0
        e.forEach(r => {
            let n = Re(r)
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
function Re(t) {
    let e = null,
        s = null,
        r = null,
        n = 1,
        i = null
    if (A(t) || L(t)) (r = t), (e = xe(t)), (s = X(t))
    else {
        if (!pe.call(t, 'name')) throw new Error(xt('name'))
        const c = t.name
        if (((r = c), pe.call(t, 'weight') && ((n = t.weight), n <= 0)))
            throw new Error(mt(c))
        ;(e = xe(c)), (s = X(c)), (i = t.getFn)
    }
    return { path: e, id: s, weight: n, src: r, getFn: i }
}
function xe(t) {
    return L(t) ? t : t.split('.')
}
function X(t) {
    return L(t) ? t.join('.') : t
}
function yt(t, e) {
    let s = [],
        r = !1
    const n = (i, c, a) => {
        if (w(i))
            if (!c[a]) s.push(i)
            else {
                let o = c[a]
                const u = i[o]
                if (!w(u)) return
                if (a === c.length - 1 && (A(u) || _e(u) || ht(u)))
                    s.push(lt(u))
                else if (L(u)) {
                    r = !0
                    for (let l = 0, h = u.length; l < h; l += 1)
                        n(u[l], c, a + 1)
                } else c.length && n(u, c, a + 1)
            }
    }
    return n(t, A(e) ? e.split('.') : e, 0), r ? s : s[0]
}
const Mt = { includeMatches: !1, findAllMatches: !1, minMatchCharLength: 1 },
    St = {
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
    _t = { location: 0, threshold: 0.6, distance: 100 },
    wt = {
        useExtendedSearch: !1,
        getFn: yt,
        ignoreLocation: !1,
        ignoreFieldNorm: !1,
        fieldNormWeight: 1,
    }
var d = { ...St, ...Mt, ..._t, ...wt }
const Et = /[^ ]+/g
function Rt(t = 1, e = 3) {
    const s = new Map(),
        r = Math.pow(10, e)
    return {
        get(n) {
            const i = n.match(Et).length
            if (s.has(i)) return s.get(i)
            const c = 1 / Math.pow(i, 0.5 * t),
                a = parseFloat(Math.round(c * r) / r)
            return s.set(i, a), a
        },
        clear() {
            s.clear()
        },
    }
}
class ne {
    constructor({
        getFn: e = d.getFn,
        fieldNormWeight: s = d.fieldNormWeight,
    } = {}) {
        ;(this.norm = Rt(s, 3)),
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
            A(this.docs[0])
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
        A(e) ? this._addString(e, s) : this._addObject(e, s)
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
        if (!w(e) || Z(e)) return
        let r = { v: e, i: s, n: this.norm.get(e) }
        this.records.push(r)
    }
    _addObject(e, s) {
        let r = { i: s, $: {} }
        this.keys.forEach((n, i) => {
            let c = n.getFn ? n.getFn(e) : this.getFn(e, n.path)
            if (w(c)) {
                if (L(c)) {
                    let a = []
                    const o = [{ nestedArrIndex: -1, value: c }]
                    for (; o.length; ) {
                        const { nestedArrIndex: u, value: l } = o.pop()
                        if (w(l))
                            if (A(l) && !Z(l)) {
                                let h = { v: l, i: u, n: this.norm.get(l) }
                                a.push(h)
                            } else
                                L(l) &&
                                    l.forEach((h, g) => {
                                        o.push({ nestedArrIndex: g, value: h })
                                    })
                    }
                    r.$[i] = a
                } else if (A(c) && !Z(c)) {
                    let a = { v: c, n: this.norm.get(c) }
                    r.$[i] = a
                }
            }
        }),
            this.records.push(r)
    }
    toJSON() {
        return { keys: this.keys, records: this.records }
    }
}
function ve(
    t,
    e,
    { getFn: s = d.getFn, fieldNormWeight: r = d.fieldNormWeight } = {}
) {
    const n = new ne({ getFn: s, fieldNormWeight: r })
    return n.setKeys(t.map(Re)), n.setSources(e), n.create(), n
}
function vt(
    t,
    { getFn: e = d.getFn, fieldNormWeight: s = d.fieldNormWeight } = {}
) {
    const { keys: r, records: n } = t,
        i = new ne({ getFn: e, fieldNormWeight: s })
    return i.setKeys(r), i.setIndexRecords(n), i
}
function B(
    t,
    {
        errors: e = 0,
        currentLocation: s = 0,
        expectedLocation: r = 0,
        distance: n = d.distance,
        ignoreLocation: i = d.ignoreLocation,
    } = {}
) {
    const c = e / t.length
    if (i) return c
    const a = Math.abs(r - s)
    return n ? c + a / n : a ? 1 : c
}
function It(t = [], e = d.minMatchCharLength) {
    let s = [],
        r = -1,
        n = -1,
        i = 0
    for (let c = t.length; i < c; i += 1) {
        let a = t[i]
        a && r === -1
            ? (r = i)
            : !a &&
              r !== -1 &&
              ((n = i - 1), n - r + 1 >= e && s.push([r, n]), (r = -1))
    }
    return t[i - 1] && i - r >= e && s.push([r, i - 1]), s
}
const N = 32
function jt(
    t,
    e,
    s,
    {
        location: r = d.location,
        distance: n = d.distance,
        threshold: i = d.threshold,
        findAllMatches: c = d.findAllMatches,
        minMatchCharLength: a = d.minMatchCharLength,
        includeMatches: o = d.includeMatches,
        ignoreLocation: u = d.ignoreLocation,
    } = {}
) {
    if (e.length > N) throw new Error(pt(N))
    const l = e.length,
        h = t.length,
        g = Math.max(0, Math.min(r, h))
    let x = i,
        m = g
    const b = a > 1 || o,
        R = b ? Array(h) : []
    let E
    for (; (E = t.indexOf(e, m)) > -1; ) {
        let M = B(e, {
            currentLocation: E,
            expectedLocation: g,
            distance: n,
            ignoreLocation: u,
        })
        if (((x = Math.min(M, x)), (m = E + l), b)) {
            let I = 0
            for (; I < l; ) (R[E + I] = 1), (I += 1)
        }
    }
    m = -1
    let O = [],
        v = 1,
        C = l + h
    const K = 1 << (l - 1)
    for (let M = 0; M < l; M += 1) {
        let I = 0,
            j = C
        for (; I < j; )
            B(e, {
                errors: M,
                currentLocation: g + j,
                expectedLocation: g,
                distance: n,
                ignoreLocation: u,
            }) <= x
                ? (I = j)
                : (C = j),
                (j = Math.floor((C - I) / 2 + I))
        C = j
        let W = Math.max(1, g - j + 1),
            $ = c ? h : Math.min(g + j, h) + l,
            _ = Array($ + 2)
        _[$ + 1] = (1 << M) - 1
        for (let S = $; S >= W; S -= 1) {
            let P = S - 1,
                D = s[t.charAt(P)]
            if (
                (b && (R[P] = +!!D),
                (_[S] = ((_[S + 1] << 1) | 1) & D),
                M && (_[S] |= ((O[S + 1] | O[S]) << 1) | 1 | O[S + 1]),
                _[S] & K &&
                    ((v = B(e, {
                        errors: M,
                        currentLocation: P,
                        expectedLocation: g,
                        distance: n,
                        ignoreLocation: u,
                    })),
                    v <= x))
            ) {
                if (((x = v), (m = P), m <= g)) break
                W = Math.max(1, 2 * g - m)
            }
        }
        if (
            B(e, {
                errors: M + 1,
                currentLocation: g,
                expectedLocation: g,
                distance: n,
                ignoreLocation: u,
            }) > x
        )
            break
        O = _
    }
    const T = { isMatch: m >= 0, score: Math.max(0.001, v) }
    if (b) {
        const M = It(R, a)
        M.length ? o && (T.indices = M) : (T.isMatch = !1)
    }
    return T
}
function At(t) {
    let e = {}
    for (let s = 0, r = t.length; s < r; s += 1) {
        const n = t.charAt(s)
        e[n] = (e[n] || 0) | (1 << (r - s - 1))
    }
    return e
}
class Ie {
    constructor(
        e,
        {
            location: s = d.location,
            threshold: r = d.threshold,
            distance: n = d.distance,
            includeMatches: i = d.includeMatches,
            findAllMatches: c = d.findAllMatches,
            minMatchCharLength: a = d.minMatchCharLength,
            isCaseSensitive: o = d.isCaseSensitive,
            ignoreLocation: u = d.ignoreLocation,
        } = {}
    ) {
        if (
            ((this.options = {
                location: s,
                threshold: r,
                distance: n,
                includeMatches: i,
                findAllMatches: c,
                minMatchCharLength: a,
                isCaseSensitive: o,
                ignoreLocation: u,
            }),
            (this.pattern = o ? e : e.toLowerCase()),
            (this.chunks = []),
            !this.pattern.length)
        )
            return
        const l = (g, x) => {
                this.chunks.push({ pattern: g, alphabet: At(g), startIndex: x })
            },
            h = this.pattern.length
        if (h > N) {
            let g = 0
            const x = h % N,
                m = h - x
            for (; g < m; ) l(this.pattern.substr(g, N), g), (g += N)
            if (x) {
                const b = h - N
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
            findAllMatches: a,
            minMatchCharLength: o,
            ignoreLocation: u,
        } = this.options
        let l = [],
            h = 0,
            g = !1
        this.chunks.forEach(({ pattern: m, alphabet: b, startIndex: R }) => {
            const {
                isMatch: E,
                score: O,
                indices: v,
            } = jt(e, m, b, {
                location: n + R,
                distance: i,
                threshold: c,
                findAllMatches: a,
                minMatchCharLength: o,
                includeMatches: r,
                ignoreLocation: u,
            })
            E && (g = !0), (h += O), E && v && (l = [...l, ...v])
        })
        let x = { isMatch: g, score: g ? h / this.chunks.length : 1 }
        return g && r && (x.indices = l), x
    }
}
class k {
    constructor(e) {
        this.pattern = e
    }
    static isMultiMatch(e) {
        return me(e, this.multiRegex)
    }
    static isSingleMatch(e) {
        return me(e, this.singleRegex)
    }
    search() {}
}
function me(t, e) {
    const s = t.match(e)
    return s ? s[1] : null
}
class Ot extends k {
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
class Lt extends k {
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
class kt extends k {
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
class Nt extends k {
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
class Ct extends k {
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
class Tt extends k {
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
class je extends k {
    constructor(
        e,
        {
            location: s = d.location,
            threshold: r = d.threshold,
            distance: n = d.distance,
            includeMatches: i = d.includeMatches,
            findAllMatches: c = d.findAllMatches,
            minMatchCharLength: a = d.minMatchCharLength,
            isCaseSensitive: o = d.isCaseSensitive,
            ignoreLocation: u = d.ignoreLocation,
        } = {}
    ) {
        super(e),
            (this._bitapSearch = new Ie(e, {
                location: s,
                threshold: r,
                distance: n,
                includeMatches: i,
                findAllMatches: c,
                minMatchCharLength: a,
                isCaseSensitive: o,
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
class Ae extends k {
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
const q = [Ot, Ae, kt, Nt, Tt, Ct, Lt, je],
    be = q.length,
    $t = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,
    Pt = '|'
function Ft(t, e = {}) {
    return t.split(Pt).map(s => {
        let r = s
                .trim()
                .split($t)
                .filter(i => i && !!i.trim()),
            n = []
        for (let i = 0, c = r.length; i < c; i += 1) {
            const a = r[i]
            let o = !1,
                u = -1
            for (; !o && ++u < be; ) {
                const l = q[u]
                let h = l.isMultiMatch(a)
                h && (n.push(new l(h, e)), (o = !0))
            }
            if (!o)
                for (u = -1; ++u < be; ) {
                    const l = q[u]
                    let h = l.isSingleMatch(a)
                    if (h) {
                        n.push(new l(h, e))
                        break
                    }
                }
        }
        return n
    })
}
const zt = new Set([je.type, Ae.type])
class Ut {
    constructor(
        e,
        {
            isCaseSensitive: s = d.isCaseSensitive,
            includeMatches: r = d.includeMatches,
            minMatchCharLength: n = d.minMatchCharLength,
            ignoreLocation: i = d.ignoreLocation,
            findAllMatches: c = d.findAllMatches,
            location: a = d.location,
            threshold: o = d.threshold,
            distance: u = d.distance,
        } = {}
    ) {
        ;(this.query = null),
            (this.options = {
                isCaseSensitive: s,
                includeMatches: r,
                minMatchCharLength: n,
                findAllMatches: c,
                ignoreLocation: i,
                location: a,
                threshold: o,
                distance: u,
            }),
            (this.pattern = s ? e : e.toLowerCase()),
            (this.query = Ft(this.pattern, this.options))
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
            a = 0
        for (let o = 0, u = s.length; o < u; o += 1) {
            const l = s[o]
            ;(c.length = 0), (i = 0)
            for (let h = 0, g = l.length; h < g; h += 1) {
                const x = l[h],
                    { isMatch: m, indices: b, score: R } = x.search(e)
                if (m) {
                    if (((i += 1), (a += R), r)) {
                        const E = x.constructor.type
                        zt.has(E) ? (c = [...c, ...b]) : c.push(b)
                    }
                } else {
                    ;(a = 0), (i = 0), (c.length = 0)
                    break
                }
            }
            if (i) {
                let h = { isMatch: !0, score: a / i }
                return r && (h.indices = c), h
            }
        }
        return { isMatch: !1, score: 1 }
    }
}
const ee = []
function Wt(...t) {
    ee.push(...t)
}
function te(t, e) {
    for (let s = 0, r = ee.length; s < r; s += 1) {
        let n = ee[s]
        if (n.condition(t, e)) return new n(t, e)
    }
    return new Ie(t, e)
}
const G = { AND: '$and', OR: '$or' },
    se = { PATH: '$path', PATTERN: '$val' },
    re = t => !!(t[G.AND] || t[G.OR]),
    Dt = t => !!t[se.PATH],
    Ht = t => !L(t) && we(t) && !re(t),
    ye = t => ({ [G.AND]: Object.keys(t).map(e => ({ [e]: t[e] })) })
function Oe(t, e, { auto: s = !0 } = {}) {
    const r = n => {
        let i = Object.keys(n)
        const c = Dt(n)
        if (!c && i.length > 1 && !re(n)) return r(ye(n))
        if (Ht(n)) {
            const o = c ? n[se.PATH] : i[0],
                u = c ? n[se.PATTERN] : n[o]
            if (!A(u)) throw new Error(gt(o))
            const l = { keyId: X(o), pattern: u }
            return s && (l.searcher = te(u, e)), l
        }
        let a = { children: [], operator: i[0] }
        return (
            i.forEach(o => {
                const u = n[o]
                L(u) &&
                    u.forEach(l => {
                        a.children.push(r(l))
                    })
            }),
            a
        )
    }
    return re(t) || (t = ye(t)), r(t)
}
function Kt(t, { ignoreFieldNorm: e = d.ignoreFieldNorm }) {
    t.forEach(s => {
        let r = 1
        s.matches.forEach(({ key: n, norm: i, score: c }) => {
            const a = n ? n.weight : null
            r *= Math.pow(
                c === 0 && a ? Number.EPSILON : c,
                (a || 1) * (e ? 1 : i)
            )
        }),
            (s.score = r)
    })
}
function Vt(t, e) {
    const s = t.matches
    ;(e.matches = []),
        w(s) &&
            s.forEach(r => {
                if (!w(r.indices) || !r.indices.length) return
                const { indices: n, value: i } = r
                let c = { indices: n, value: i }
                r.key && (c.key = r.key.src),
                    r.idx > -1 && (c.refIndex = r.idx),
                    e.matches.push(c)
            })
}
function Bt(t, e) {
    e.score = t.score
}
function Gt(
    t,
    e,
    {
        includeMatches: s = d.includeMatches,
        includeScore: r = d.includeScore,
    } = {}
) {
    const n = []
    return (
        s && n.push(Vt),
        r && n.push(Bt),
        t.map(i => {
            const { idx: c } = i,
                a = { item: e[c], refIndex: c }
            return (
                n.length &&
                    n.forEach(o => {
                        o(i, a)
                    }),
                a
            )
        })
    )
}
class U {
    constructor(e, s = {}, r) {
        ;(this.options = { ...d, ...s }),
            this.options.useExtendedSearch,
            (this._keyStore = new bt(this.options.keys)),
            this.setCollection(e, r)
    }
    setCollection(e, s) {
        if (((this._docs = e), s && !(s instanceof ne))) throw new Error(dt)
        this._myIndex =
            s ||
            ve(this.options.keys, this._docs, {
                getFn: this.options.getFn,
                fieldNormWeight: this.options.fieldNormWeight,
            })
    }
    add(e) {
        w(e) && (this._docs.push(e), this._myIndex.add(e))
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
            ignoreFieldNorm: a,
        } = this.options
        let o = A(e)
            ? A(this._docs[0])
                ? this._searchStringList(e)
                : this._searchObjectList(e)
            : this._searchLogical(e)
        return (
            Kt(o, { ignoreFieldNorm: a }),
            i && o.sort(c),
            _e(s) && s > -1 && (o = o.slice(0, s)),
            Gt(o, this._docs, { includeMatches: r, includeScore: n })
        )
    }
    _searchStringList(e) {
        const s = te(e, this.options),
            { records: r } = this._myIndex,
            n = []
        return (
            r.forEach(({ v: i, i: c, n: a }) => {
                if (!w(i)) return
                const { isMatch: o, score: u, indices: l } = s.searchIn(i)
                o &&
                    n.push({
                        item: i,
                        idx: c,
                        matches: [{ score: u, value: i, norm: a, indices: l }],
                    })
            }),
            n
        )
    }
    _searchLogical(e) {
        const s = Oe(e, this.options),
            r = (a, o, u) => {
                if (!a.children) {
                    const { keyId: h, searcher: g } = a,
                        x = this._findMatches({
                            key: this._keyStore.get(h),
                            value: this._myIndex.getValueForItemAtKeyId(o, h),
                            searcher: g,
                        })
                    return x && x.length
                        ? [{ idx: u, item: o, matches: x }]
                        : []
                }
                const l = []
                for (let h = 0, g = a.children.length; h < g; h += 1) {
                    const x = a.children[h],
                        m = r(x, o, u)
                    if (m.length) l.push(...m)
                    else if (a.operator === G.AND) return []
                }
                return l
            },
            n = this._myIndex.records,
            i = {},
            c = []
        return (
            n.forEach(({ $: a, i: o }) => {
                if (w(a)) {
                    let u = r(s, a, o)
                    u.length &&
                        (i[o] ||
                            ((i[o] = { idx: o, item: a, matches: [] }),
                            c.push(i[o])),
                        u.forEach(({ matches: l }) => {
                            i[o].matches.push(...l)
                        }))
                }
            }),
            c
        )
    }
    _searchObjectList(e) {
        const s = te(e, this.options),
            { keys: r, records: n } = this._myIndex,
            i = []
        return (
            n.forEach(({ $: c, i: a }) => {
                if (!w(c)) return
                let o = []
                r.forEach((u, l) => {
                    o.push(
                        ...this._findMatches({
                            key: u,
                            value: c[l],
                            searcher: s,
                        })
                    )
                }),
                    o.length && i.push({ idx: a, item: c, matches: o })
            }),
            i
        )
    }
    _findMatches({ key: e, value: s, searcher: r }) {
        if (!w(s)) return []
        let n = []
        if (L(s))
            s.forEach(({ v: i, i: c, n: a }) => {
                if (!w(i)) return
                const { isMatch: o, score: u, indices: l } = r.searchIn(i)
                o &&
                    n.push({
                        score: u,
                        key: e,
                        value: i,
                        idx: c,
                        norm: a,
                        indices: l,
                    })
            })
        else {
            const { v: i, n: c } = s,
                { isMatch: a, score: o, indices: u } = r.searchIn(i)
            a && n.push({ score: o, key: e, value: i, norm: c, indices: u })
        }
        return n
    }
}
U.version = '7.0.0'
U.createIndex = ve
U.parseIndex = vt
U.config = d
U.parseQuery = Oe
Wt(Ut)
var Q, Me
function Jt() {
    if (Me) return Q
    Me = 1
    var t = 1 / 0,
        e = '[object Symbol]',
        s = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
        r = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
        n = '\\ud800-\\udfff',
        i = '\\u0300-\\u036f\\ufe20-\\ufe23',
        c = '\\u20d0-\\u20f0',
        a = '\\u2700-\\u27bf',
        o = 'a-z\\xdf-\\xf6\\xf8-\\xff',
        u = '\\xac\\xb1\\xd7\\xf7',
        l = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
        h = '\\u2000-\\u206f',
        g =
            ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
        x = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
        m = '\\ufe0e\\ufe0f',
        b = u + l + h + g,
        R = "['’]",
        E = '[' + b + ']',
        O = '[' + i + c + ']',
        v = '\\d+',
        C = '[' + a + ']',
        K = '[' + o + ']',
        T = '[^' + n + b + v + a + o + x + ']',
        M = '\\ud83c[\\udffb-\\udfff]',
        I = '(?:' + O + '|' + M + ')',
        j = '[^' + n + ']',
        W = '(?:\\ud83c[\\udde6-\\uddff]){2}',
        $ = '[\\ud800-\\udbff][\\udc00-\\udfff]',
        _ = '[' + x + ']',
        ie = '\\u200d',
        S = '(?:' + K + '|' + T + ')',
        P = '(?:' + _ + '|' + T + ')',
        D = '(?:' + R + '(?:d|ll|m|re|s|t|ve))?',
        ce = '(?:' + R + '(?:D|LL|M|RE|S|T|VE))?',
        oe = I + '?',
        ae = '[' + m + ']?',
        Le = '(?:' + ie + '(?:' + [j, W, $].join('|') + ')' + ae + oe + ')*',
        ke = ae + oe + Le,
        Ne = '(?:' + [C, W, $].join('|') + ')' + ke,
        Ce = RegExp(R, 'g'),
        Te = RegExp(O, 'g'),
        $e = RegExp(
            [
                _ + '?' + K + '+' + D + '(?=' + [E, _, '$'].join('|') + ')',
                P + '+' + ce + '(?=' + [E, _ + S, '$'].join('|') + ')',
                _ + '?' + S + '+' + D,
                _ + '+' + ce,
                v,
                Ne,
            ].join('|'),
            'g'
        ),
        Pe =
            /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
        Fe = {
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
        ze = typeof V == 'object' && V && V.Object === Object && V,
        Ue = typeof self == 'object' && self && self.Object === Object && self,
        We = ze || Ue || Function('return this')()
    function De(f, y, F, ts) {
        for (var J = -1, rt = f ? f.length : 0; ++J < rt; ) F = y(F, f[J], J, f)
        return F
    }
    function He(f) {
        return f.match(s) || []
    }
    function Ke(f) {
        return function (y) {
            return f?.[y]
        }
    }
    var Ve = Ke(Fe)
    function Be(f) {
        return Pe.test(f)
    }
    function Ge(f) {
        return f.match($e) || []
    }
    var Je = Object.prototype,
        Ye = Je.toString,
        ue = We.Symbol,
        le = ue ? ue.prototype : void 0,
        he = le ? le.toString : void 0
    function Ze(f) {
        if (typeof f == 'string') return f
        if (qe(f)) return he ? he.call(f) : ''
        var y = f + ''
        return y == '0' && 1 / f == -t ? '-0' : y
    }
    function Qe(f) {
        return function (y) {
            return De(st(et(y).replace(Ce, '')), f, '')
        }
    }
    function Xe(f) {
        return !!f && typeof f == 'object'
    }
    function qe(f) {
        return typeof f == 'symbol' || (Xe(f) && Ye.call(f) == e)
    }
    function fe(f) {
        return f == null ? '' : Ze(f)
    }
    function et(f) {
        return (f = fe(f)), f && f.replace(r, Ve).replace(Te, '')
    }
    var tt = Qe(function (f, y, F) {
        return f + (F ? '-' : '') + y.toLowerCase()
    })
    function st(f, y, F) {
        return (
            (f = fe(f)),
            (y = y),
            y === void 0 ? (Be(f) ? Ge(f) : He(f)) : f.match(y) || []
        )
    }
    return (Q = tt), Q
}
var Yt = Jt()
const Zt = it(Yt),
    Qt = t => Zt(t),
    Se = { lang: 'en', langTag: ['en-EN'] }
function Xt({
    pubDatetime: t,
    modDatetime: e,
    size: s = 'sm',
    className: r = '',
}) {
    return p.jsxs('div', {
        className: `flex items-center space-x-2 opacity-80 ${r}`.trim(),
        children: [
            p.jsxs('svg', {
                xmlns: 'http://www.w3.org/2000/svg',
                className: `${s === 'sm' ? 'scale-90' : 'scale-100'} inline-block h-6 w-6 min-w-[1.375rem] fill-skin-base`,
                'aria-hidden': 'true',
                children: [
                    p.jsx('path', {
                        d: 'M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z',
                    }),
                    p.jsx('path', {
                        d: 'M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z',
                    }),
                ],
            }),
            e && e > t
                ? p.jsx('span', {
                      className: `italic ${s === 'sm' ? 'text-sm' : 'text-base'}`,
                      children: 'Updated:',
                  })
                : p.jsx('span', {
                      className: 'sr-only',
                      children: 'Published:',
                  }),
            p.jsx('span', {
                className: `italic ${s === 'sm' ? 'text-sm' : 'text-base'}`,
                children: p.jsx(qt, { pubDatetime: t, modDatetime: e }),
            }),
        ],
    })
}
const qt = ({ pubDatetime: t, modDatetime: e }) => {
    const s = new Date(e && e > t ? e : t),
        r = s.toLocaleDateString(Se.langTag, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }),
        n = s.toLocaleTimeString(Se.langTag, {
            hour: '2-digit',
            minute: '2-digit',
        })
    return p.jsxs(p.Fragment, {
        children: [
            p.jsx('time', { dateTime: s.toISOString(), children: r }),
            p.jsx('span', { 'aria-hidden': 'true', children: ' | ' }),
            p.jsx('span', { className: 'sr-only', children: ' at ' }),
            p.jsx('span', { className: 'text-nowrap', children: n }),
        ],
    })
}
function es({ href: t, frontmatter: e, secHeading: s = !0 }) {
    const { title: r, pubDatetime: n, modDatetime: i, description: c } = e,
        a = {
            style: { viewTransitionName: Qt(r) },
            className: 'text-lg font-medium decoration-dashed hover:underline',
        }
    return p.jsxs('li', {
        className: 'my-6',
        children: [
            p.jsx('a', {
                href: t,
                className:
                    'inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0',
                children: s
                    ? p.jsx('h2', { ...a, children: r })
                    : p.jsx('h3', { ...a, children: r }),
            }),
            p.jsx(Xt, { pubDatetime: n, modDatetime: i }),
            p.jsx('p', { children: c }),
        ],
    })
}
function rs({ searchList: t }) {
    const e = z.useRef(null),
        [s, r] = z.useState(''),
        [n, i] = z.useState(null),
        c = o => {
            r(o.currentTarget.value)
        },
        a = z.useMemo(
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
            const o = s.length > 1 ? a.search(s) : []
            if ((i(o), s.length > 0)) {
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
        p.jsxs(p.Fragment, {
            children: [
                p.jsxs('label', {
                    className: 'relative block',
                    children: [
                        p.jsxs('span', {
                            className:
                                'absolute inset-y-0 left-0 flex items-center pl-2 opacity-75',
                            children: [
                                p.jsx('svg', {
                                    xmlns: 'http://www.w3.org/2000/svg',
                                    'aria-hidden': 'true',
                                    children: p.jsx('path', {
                                        d: 'M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z',
                                    }),
                                }),
                                p.jsx('span', {
                                    className: 'sr-only',
                                    children: 'Search',
                                }),
                            ],
                        }),
                        p.jsx('input', {
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
                    p.jsxs('div', {
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
                p.jsx('ul', {
                    children:
                        n &&
                        n.map(({ item: o, refIndex: u }) =>
                            p.jsx(
                                es,
                                {
                                    href: `/posts/${o.id}/`,
                                    frontmatter: o.data,
                                },
                                `${u}-${o.id}`
                            )
                        ),
                }),
            ],
        })
    )
}
export { rs as default }
