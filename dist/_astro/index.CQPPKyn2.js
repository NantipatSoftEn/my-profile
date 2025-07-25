var k = { exports: {} },
    r = {}
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var T
function X() {
    if (T) return r
    T = 1
    var y = Symbol.for('react.element'),
        A = Symbol.for('react.portal'),
        D = Symbol.for('react.fragment'),
        U = Symbol.for('react.strict_mode'),
        F = Symbol.for('react.profiler'),
        L = Symbol.for('react.provider'),
        M = Symbol.for('react.context'),
        N = Symbol.for('react.forward_ref'),
        z = Symbol.for('react.suspense'),
        B = Symbol.for('react.memo'),
        H = Symbol.for('react.lazy'),
        w = Symbol.iterator
    function W(e) {
        return e === null || typeof e != 'object'
            ? null
            : ((e = (w && e[w]) || e['@@iterator']),
              typeof e == 'function' ? e : null)
    }
    var $ = {
            isMounted: function () {
                return !1
            },
            enqueueForceUpdate: function () {},
            enqueueReplaceState: function () {},
            enqueueSetState: function () {},
        },
        b = Object.assign,
        C = {}
    function p(e, t, n) {
        ;(this.props = e),
            (this.context = t),
            (this.refs = C),
            (this.updater = n || $)
    }
    ;(p.prototype.isReactComponent = {}),
        (p.prototype.setState = function (e, t) {
            if (typeof e != 'object' && typeof e != 'function' && e != null)
                throw Error(
                    'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
                )
            this.updater.enqueueSetState(this, e, t, 'setState')
        }),
        (p.prototype.forceUpdate = function (e) {
            this.updater.enqueueForceUpdate(this, e, 'forceUpdate')
        })
    function x() {}
    x.prototype = p.prototype
    function v(e, t, n) {
        ;(this.props = e),
            (this.context = t),
            (this.refs = C),
            (this.updater = n || $)
    }
    var m = (v.prototype = new x())
    ;(m.constructor = v), b(m, p.prototype), (m.isPureReactComponent = !0)
    var j = Array.isArray,
        O = Object.prototype.hasOwnProperty,
        S = { current: null },
        g = { key: !0, ref: !0, __self: !0, __source: !0 }
    function P(e, t, n) {
        var u,
            o = {},
            c = null,
            s = null
        if (t != null)
            for (u in (t.ref !== void 0 && (s = t.ref),
            t.key !== void 0 && (c = '' + t.key),
            t))
                O.call(t, u) && !g.hasOwnProperty(u) && (o[u] = t[u])
        var f = arguments.length - 2
        if (f === 1) o.children = n
        else if (1 < f) {
            for (var i = Array(f), a = 0; a < f; a++) i[a] = arguments[a + 2]
            o.children = i
        }
        if (e && e.defaultProps)
            for (u in ((f = e.defaultProps), f))
                o[u] === void 0 && (o[u] = f[u])
        return {
            $$typeof: y,
            type: e,
            key: c,
            ref: s,
            props: o,
            _owner: S.current,
        }
    }
    function G(e, t) {
        return {
            $$typeof: y,
            type: e.type,
            key: t,
            ref: e.ref,
            props: e.props,
            _owner: e._owner,
        }
    }
    function R(e) {
        return typeof e == 'object' && e !== null && e.$$typeof === y
    }
    function J(e) {
        var t = { '=': '=0', ':': '=2' }
        return (
            '$' +
            e.replace(/[=:]/g, function (n) {
                return t[n]
            })
        )
    }
    var I = /\/+/g
    function E(e, t) {
        return typeof e == 'object' && e !== null && e.key != null
            ? J('' + e.key)
            : t.toString(36)
    }
    function d(e, t, n, u, o) {
        var c = typeof e
        ;(c === 'undefined' || c === 'boolean') && (e = null)
        var s = !1
        if (e === null) s = !0
        else
            switch (c) {
                case 'string':
                case 'number':
                    s = !0
                    break
                case 'object':
                    switch (e.$$typeof) {
                        case y:
                        case A:
                            s = !0
                    }
            }
        if (s)
            return (
                (s = e),
                (o = o(s)),
                (e = u === '' ? '.' + E(s, 0) : u),
                j(o)
                    ? ((n = ''),
                      e != null && (n = e.replace(I, '$&/') + '/'),
                      d(o, t, n, '', function (a) {
                          return a
                      }))
                    : o != null &&
                      (R(o) &&
                          (o = G(
                              o,
                              n +
                                  (!o.key || (s && s.key === o.key)
                                      ? ''
                                      : ('' + o.key).replace(I, '$&/') + '/') +
                                  e
                          )),
                      t.push(o)),
                1
            )
        if (((s = 0), (u = u === '' ? '.' : u + ':'), j(e)))
            for (var f = 0; f < e.length; f++) {
                c = e[f]
                var i = u + E(c, f)
                s += d(c, t, n, i, o)
            }
        else if (((i = W(e)), typeof i == 'function'))
            for (e = i.call(e), f = 0; !(c = e.next()).done; )
                (c = c.value), (i = u + E(c, f++)), (s += d(c, t, n, i, o))
        else if (c === 'object')
            throw (
                ((t = String(e)),
                Error(
                    'Objects are not valid as a React child (found: ' +
                        (t === '[object Object]'
                            ? 'object with keys {' +
                              Object.keys(e).join(', ') +
                              '}'
                            : t) +
                        '). If you meant to render a collection of children, use an array instead.'
                ))
            )
        return s
    }
    function _(e, t, n) {
        if (e == null) return e
        var u = [],
            o = 0
        return (
            d(e, u, '', '', function (c) {
                return t.call(n, c, o++)
            }),
            u
        )
    }
    function K(e) {
        if (e._status === -1) {
            var t = e._result
            ;(t = t()),
                t.then(
                    function (n) {
                        ;(e._status === 0 || e._status === -1) &&
                            ((e._status = 1), (e._result = n))
                    },
                    function (n) {
                        ;(e._status === 0 || e._status === -1) &&
                            ((e._status = 2), (e._result = n))
                    }
                ),
                e._status === -1 && ((e._status = 0), (e._result = t))
        }
        if (e._status === 1) return e._result.default
        throw e._result
    }
    var l = { current: null },
        h = { transition: null },
        Q = {
            ReactCurrentDispatcher: l,
            ReactCurrentBatchConfig: h,
            ReactCurrentOwner: S,
        }
    function q() {
        throw Error('act(...) is not supported in production builds of React.')
    }
    return (
        (r.Children = {
            map: _,
            forEach: function (e, t, n) {
                _(
                    e,
                    function () {
                        t.apply(this, arguments)
                    },
                    n
                )
            },
            count: function (e) {
                var t = 0
                return (
                    _(e, function () {
                        t++
                    }),
                    t
                )
            },
            toArray: function (e) {
                return (
                    _(e, function (t) {
                        return t
                    }) || []
                )
            },
            only: function (e) {
                if (!R(e))
                    throw Error(
                        'React.Children.only expected to receive a single React element child.'
                    )
                return e
            },
        }),
        (r.Component = p),
        (r.Fragment = D),
        (r.Profiler = F),
        (r.PureComponent = v),
        (r.StrictMode = U),
        (r.Suspense = z),
        (r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Q),
        (r.act = q),
        (r.cloneElement = function (e, t, n) {
            if (e == null)
                throw Error(
                    'React.cloneElement(...): The argument must be a React element, but you passed ' +
                        e +
                        '.'
                )
            var u = b({}, e.props),
                o = e.key,
                c = e.ref,
                s = e._owner
            if (t != null) {
                if (
                    (t.ref !== void 0 && ((c = t.ref), (s = S.current)),
                    t.key !== void 0 && (o = '' + t.key),
                    e.type && e.type.defaultProps)
                )
                    var f = e.type.defaultProps
                for (i in t)
                    O.call(t, i) &&
                        !g.hasOwnProperty(i) &&
                        (u[i] = t[i] === void 0 && f !== void 0 ? f[i] : t[i])
            }
            var i = arguments.length - 2
            if (i === 1) u.children = n
            else if (1 < i) {
                f = Array(i)
                for (var a = 0; a < i; a++) f[a] = arguments[a + 2]
                u.children = f
            }
            return {
                $$typeof: y,
                type: e.type,
                key: o,
                ref: c,
                props: u,
                _owner: s,
            }
        }),
        (r.createContext = function (e) {
            return (
                (e = {
                    $$typeof: M,
                    _currentValue: e,
                    _currentValue2: e,
                    _threadCount: 0,
                    Provider: null,
                    Consumer: null,
                    _defaultValue: null,
                    _globalName: null,
                }),
                (e.Provider = { $$typeof: L, _context: e }),
                (e.Consumer = e)
            )
        }),
        (r.createElement = P),
        (r.createFactory = function (e) {
            var t = P.bind(null, e)
            return (t.type = e), t
        }),
        (r.createRef = function () {
            return { current: null }
        }),
        (r.forwardRef = function (e) {
            return { $$typeof: N, render: e }
        }),
        (r.isValidElement = R),
        (r.lazy = function (e) {
            return {
                $$typeof: H,
                _payload: { _status: -1, _result: e },
                _init: K,
            }
        }),
        (r.memo = function (e, t) {
            return { $$typeof: B, type: e, compare: t === void 0 ? null : t }
        }),
        (r.startTransition = function (e) {
            var t = h.transition
            h.transition = {}
            try {
                e()
            } finally {
                h.transition = t
            }
        }),
        (r.unstable_act = q),
        (r.useCallback = function (e, t) {
            return l.current.useCallback(e, t)
        }),
        (r.useContext = function (e) {
            return l.current.useContext(e)
        }),
        (r.useDebugValue = function () {}),
        (r.useDeferredValue = function (e) {
            return l.current.useDeferredValue(e)
        }),
        (r.useEffect = function (e, t) {
            return l.current.useEffect(e, t)
        }),
        (r.useId = function () {
            return l.current.useId()
        }),
        (r.useImperativeHandle = function (e, t, n) {
            return l.current.useImperativeHandle(e, t, n)
        }),
        (r.useInsertionEffect = function (e, t) {
            return l.current.useInsertionEffect(e, t)
        }),
        (r.useLayoutEffect = function (e, t) {
            return l.current.useLayoutEffect(e, t)
        }),
        (r.useMemo = function (e, t) {
            return l.current.useMemo(e, t)
        }),
        (r.useReducer = function (e, t, n) {
            return l.current.useReducer(e, t, n)
        }),
        (r.useRef = function (e) {
            return l.current.useRef(e)
        }),
        (r.useState = function (e) {
            return l.current.useState(e)
        }),
        (r.useSyncExternalStore = function (e, t, n) {
            return l.current.useSyncExternalStore(e, t, n)
        }),
        (r.useTransition = function () {
            return l.current.useTransition()
        }),
        (r.version = '18.3.1'),
        r
    )
}
var V
function Y() {
    return V || ((V = 1), (k.exports = X())), k.exports
}
var Z = Y()
export { Y as a, Z as r }
