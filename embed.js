var he = (m,y,v)=>{
    if (!y.has(m))
        throw TypeError("Cannot " + v)
}
;
var C = (m,y,v)=>(he(m, y, "read from private field"),
v ? v.call(m) : y.get(m))
  , q = (m,y,v)=>{
    if (y.has(m))
        throw TypeError("Cannot add the same private member more than once");
    y instanceof WeakSet ? y.add(m) : y.set(m, v)
}
  , V = (m,y,v,E)=>(he(m, y, "write to private field"),
E ? E.call(m, v) : y.set(m, v),
v);
var appetize = function(m) {
    var S, L;
    "use strict";
    class y {
        constructor() {
            console.log("Here Here Here")
            this.log = this.createLogFn("log"),
            this.warn = this.createLogFn("warn"),
            this.error = this.createLogFn("error"),
            this.debug = this.createLogFn("log")
        }
        createLogFn(e) {
            const t = new Set
              , i = "[Appetize]"
              , s = Function.prototype.bind.call(console[e], console, i);
            return s.once = r=>{
                if (!t.has(r))
                    return t.add(r),
                    s.call(console, r)
            }
            ,
            s
        }
    }
    var v = {
        exports: {}
    }, E = typeof Reflect == "object" ? Reflect : null, B = E && typeof E.apply == "function" ? E.apply : function(e, t, i) {
        return Function.prototype.apply.call(e, t, i)
    }
    , O;
    E && typeof E.ownKeys == "function" ? O = E.ownKeys : Object.getOwnPropertySymbols ? O = function(e) {
        return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))
    }
    : O = function(e) {
        return Object.getOwnPropertyNames(e)
    }
    ;
    function ue(n) {
        console && console.warn && console.warn(n)
    }
    var H = Number.isNaN || function(e) {
        return e !== e
    }
    ;
    function d() {
        d.init.call(this)
    }
    v.exports = d,
    v.exports.once = pe,
    d.EventEmitter = d,
    d.prototype._events = void 0,
    d.prototype._eventsCount = 0,
    d.prototype._maxListeners = void 0;
    var z = 10;
    function D(n) {
        if (typeof n != "function")
            throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof n)
    }
    Object.defineProperty(d, "defaultMaxListeners", {
        enumerable: !0,
        get: function() {
            return z
        },
        set: function(n) {
            if (typeof n != "number" || n < 0 || H(n))
                throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + n + ".");
            z = n
        }
    }),
    d.init = function() {
        (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = Object.create(null),
        this._eventsCount = 0),
        this._maxListeners = this._maxListeners || void 0
    }
    ,
    d.prototype.setMaxListeners = function(e) {
        if (typeof e != "number" || e < 0 || H(e))
            throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
        return this._maxListeners = e,
        this
    }
    ;
    function J(n) {
        return n._maxListeners === void 0 ? d.defaultMaxListeners : n._maxListeners
    }
    d.prototype.getMaxListeners = function() {
        return J(this)
    }
    ,
    d.prototype.emit = function(e) {
        for (var t = [], i = 1; i < arguments.length; i++)
            t.push(arguments[i]);
        var s = e === "error"
          , r = this._events;
        if (r !== void 0)
            s = s && r.error === void 0;
        else if (!s)
            return !1;
        if (s) {
            var o;
            if (t.length > 0 && (o = t[0]),
            o instanceof Error)
                throw o;
            var a = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
            throw a.context = o,
            a
        }
        var c = r[e];
        if (c === void 0)
            return !1;
        if (typeof c == "function")
            B(c, this, t);
        else
            for (var h = c.length, u = Z(c, h), i = 0; i < h; ++i)
                B(u[i], this, t);
        return !0
    }
    ;
    function X(n, e, t, i) {
        var s, r, o;
        if (D(t),
        r = n._events,
        r === void 0 ? (r = n._events = Object.create(null),
        n._eventsCount = 0) : (r.newListener !== void 0 && (n.emit("newListener", e, t.listener ? t.listener : t),
        r = n._events),
        o = r[e]),
        o === void 0)
            o = r[e] = t,
            ++n._eventsCount;
        else if (typeof o == "function" ? o = r[e] = i ? [t, o] : [o, t] : i ? o.unshift(t) : o.push(t),
        s = J(n),
        s > 0 && o.length > s && !o.warned) {
            o.warned = !0;
            var a = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            a.name = "MaxListenersExceededWarning",
            a.emitter = n,
            a.type = e,
            a.count = o.length,
            ue(a)
        }
        return n
    }
    d.prototype.addListener = function(e, t) {
        return X(this, e, t, !1)
    }
    ,
    d.prototype.on = d.prototype.addListener,
    d.prototype.prependListener = function(e, t) {
        return X(this, e, t, !0)
    }
    ;
    function le() {
        if (!this.fired)
            return this.target.removeListener(this.type, this.wrapFn),
            this.fired = !0,
            arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
    }
    function Y(n, e, t) {
        var i = {
            fired: !1,
            wrapFn: void 0,
            target: n,
            type: e,
            listener: t
        }
          , s = le.bind(i);
        return s.listener = t,
        i.wrapFn = s,
        s
    }
    d.prototype.once = function(e, t) {
        return D(t),
        this.on(e, Y(this, e, t)),
        this
    }
    ,
    d.prototype.prependOnceListener = function(e, t) {
        return D(t),
        this.prependListener(e, Y(this, e, t)),
        this
    }
    ,
    d.prototype.removeListener = function(e, t) {
        var i, s, r, o, a;
        if (D(t),
        s = this._events,
        s === void 0)
            return this;
        if (i = s[e],
        i === void 0)
            return this;
        if (i === t || i.listener === t)
            --this._eventsCount === 0 ? this._events = Object.create(null) : (delete s[e],
            s.removeListener && this.emit("removeListener", e, i.listener || t));
        else if (typeof i != "function") {
            for (r = -1,
            o = i.length - 1; o >= 0; o--)
                if (i[o] === t || i[o].listener === t) {
                    a = i[o].listener,
                    r = o;
                    break
                }
            if (r < 0)
                return this;
            r === 0 ? i.shift() : de(i, r),
            i.length === 1 && (s[e] = i[0]),
            s.removeListener !== void 0 && this.emit("removeListener", e, a || t)
        }
        return this
    }
    ,
    d.prototype.off = d.prototype.removeListener,
    d.prototype.removeAllListeners = function(e) {
        var t, i, s;
        if (i = this._events,
        i === void 0)
            return this;
        if (i.removeListener === void 0)
            return arguments.length === 0 ? (this._events = Object.create(null),
            this._eventsCount = 0) : i[e] !== void 0 && (--this._eventsCount === 0 ? this._events = Object.create(null) : delete i[e]),
            this;
        if (arguments.length === 0) {
            var r = Object.keys(i), o;
            for (s = 0; s < r.length; ++s)
                o = r[s],
                o !== "removeListener" && this.removeAllListeners(o);
            return this.removeAllListeners("removeListener"),
            this._events = Object.create(null),
            this._eventsCount = 0,
            this
        }
        if (t = i[e],
        typeof t == "function")
            this.removeListener(e, t);
        else if (t !== void 0)
            for (s = t.length - 1; s >= 0; s--)
                this.removeListener(e, t[s]);
        return this
    }
    ;
    function G(n, e, t) {
        var i = n._events;
        if (i === void 0)
            return [];
        var s = i[e];
        return s === void 0 ? [] : typeof s == "function" ? t ? [s.listener || s] : [s] : t ? fe(s) : Z(s, s.length)
    }
    d.prototype.listeners = function(e) {
        return G(this, e, !0)
    }
    ,
    d.prototype.rawListeners = function(e) {
        return G(this, e, !1)
    }
    ,
    d.listenerCount = function(n, e) {
        return typeof n.listenerCount == "function" ? n.listenerCount(e) : Q.call(n, e)
    }
    ,
    d.prototype.listenerCount = Q;
    function Q(n) {
        var e = this._events;
        if (e !== void 0) {
            var t = e[n];
            if (typeof t == "function")
                return 1;
            if (t !== void 0)
                return t.length
        }
        return 0
    }
    d.prototype.eventNames = function() {
        return this._eventsCount > 0 ? O(this._events) : []
    }
    ;
    function Z(n, e) {
        for (var t = new Array(e), i = 0; i < e; ++i)
            t[i] = n[i];
        return t
    }
    function de(n, e) {
        for (; e + 1 < n.length; e++)
            n[e] = n[e + 1];
        n.pop()
    }
    function fe(n) {
        for (var e = new Array(n.length), t = 0; t < e.length; ++t)
            e[t] = n[t].listener || n[t];
        return e
    }
    function pe(n, e) {
        return new Promise(function(t, i) {
            function s(o) {
                n.removeListener(e, r),
                i(o)
            }
            function r() {
                typeof n.removeListener == "function" && n.removeListener("error", s),
                t([].slice.call(arguments))
            }
            ee(n, e, r, {
                once: !0
            }),
            e !== "error" && we(n, s, {
                once: !0
            })
        }
        )
    }
    function we(n, e, t) {
        typeof n.on == "function" && ee(n, "error", e, t)
    }
    function ee(n, e, t, i) {
        if (typeof n.on == "function")
            i.once ? n.once(e, t) : n.on(e, t);
        else if (typeof n.addEventListener == "function")
            n.addEventListener(e, function s(r) {
                i.once && n.removeEventListener(e, s),
                t(r)
            });
        else
            throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof n)
    }
    class N extends v.exports.EventEmitter {
        constructor() {
            super(),
            this.on("error", ()=>{}
            )
        }
    }
    class me extends N {
        constructor({socket: e, logger: t=new y}) {
            super(),
            this.logger = t,
            this.socket = e,
            this.socket.on("*", ({type: i, value: s})=>{
                const r = ye(i, s);
                r !== null && (r ? (this.emit(r.type, r.value),
                this.emit("*", r)) : (this.emit(i, s),
                this.emit("*", {
                    type: i,
                    value: s
                })))
            }
            ),
            this.socket.on("newSession", ()=>{
                this.queue && (this.emit("queueEnd"),
                this.queue = void 0)
            }
            ),
            this.on("queue", i=>{
                this.queue = i
            }
            )
        }
        on(e, t) {
            return super.on(e, t)
        }
        async startSession(e) {
            throw new Error("Not implemented")
        }
        async setConfig(e) {
            throw new Error("Not implemented")
        }
        getConfig() {
            return this._config
        }
        async waitForSessionStart(e) {
            return new Promise(async(t,i)=>{
                const s = ()=>{
                    i(new Error("Session disconnected before it was ready"))
                }
                  , r = a=>{
                    i(new Error(`Session failed to start - ${typeof a.message == "object" ? JSON.stringify(a.message) : a.message}`))
                }
                  , o = a=>{
                    a.message.match(/Too many requests/) && i(new Error("Session failed to start due to too many requests"))
                }
                ;
                try {
                    this.on("error", o),
                    e.on("disconnect", s),
                    e.on("error", r),
                    await e.waitUntilReady()
                } finally {
                    this.off("error", o),
                    e.off("disconnect", s),
                    e.off("error", r)
                }
                t(e)
            }
            )
        }
    }
    function ye(n, e) {
        switch (n) {
        case "concurrentQueue":
            return {
                type: "queue",
                value: {
                    type: "concurrent",
                    name: e.name,
                    position: e.position
                }
            };
        case "queue":
            return {
                type: "queue",
                value: {
                    type: "session",
                    position: e.position
                }
            };
        case "userError":
            return {
                type: "error",
                value: e
            };
        case "newSession":
            return null
        }
    }
    function ge() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, n=>{
            const e = Math.random() * 16 | 0;
            return (n === "x" ? e : e & 3 | 8).toString(16)
        }
        )
    }
    function ve(n) {
        return Object.entries(n).map(([e,t])=>`${e}=${encodeURIComponent(t)}`).join("&")
    }
    function be() {
        let n, e;
        return [new Promise((i,s)=>{
            n = i,
            e = s
        }
        ), n, e]
    }
    function A(n) {
        return Array.isArray(n) ? n.map(A).filter(e=>e != null) : typeof n == "object" && n !== null ? Object.entries(n).reduce((e,[t,i])=>{
            const s = A(i);
            return s != null && (e[t] = s),
            e
        }
        , {}) : n
    }
    function te(n, e) {
        if ("captureStackTrace"in Error)
            Error.captureStackTrace(n, e);
        else {
            const t = new Error;
            Object.defineProperty(n, "stack", {
                configurable: !0,
                get() {
                    const {stack: i} = t;
                    return Object.defineProperty(this, "stack", {
                        value: i
                    }),
                    i
                }
            })
        }
    }
    async function f(n, e) {
        n instanceof g && te(n, e)
    }
    class g extends Error {
        constructor(e) {
            super(e),
            this.name = "Error",
            this.isOperational = !0,
            te(this, this.constructor)
        }
    }
    class I extends g {
        constructor(e, t) {
            super(t != null ? t : e.message),
            this.errorId = e.errorId,
            this.playback = e.playback
        }
    }
    class Ee extends I {
        constructor(e) {
            super(e, `No element found for selector
${JSON.stringify(e.playback.action.element, null, 2)}`)
        }
    }
    class xe extends I {
        constructor(e) {
            super(e, `Action requires 1 unique element but the selector returned ${e.matchedElements.length}. Provide a \`matchIndex\` to pick an element below or add additional attributes to your selector.

${Ae(e.matchedElements)}`)
        }
    }
    class ke extends I {
        constructor(e) {
            let t = e.message;
            if (e.message.match("outside the screen bounds")) {
                const {action: i} = e.playback;
                "localPosition"in i && i.localPosition ? t = `localPosition (${i.localPosition.x}, ${i.localPosition.y}) for the element evaluates to a coordinate outside of screen bounds.` : t = "Element is outside of screen bounds."
            }
            super(e, t)
        }
    }
    class ie extends I {
        constructor(e) {
            super(e, `An internal error has occurred for the action:
${JSON.stringify(e.playback.action, null, 2)}`)
        }
    }
    class R extends g {
    }
    class se extends g {
        constructor(e, t) {
            super(t),
            this.playback = e
        }
    }
    class $ extends g {
        constructor(e) {
            super(`App Recorder must be enabled to use ${e}. Please set "record" to true in the config.`)
        }
    }
    function Ae(n) {
        const t = n.slice(0, 5)
          , i = n.length > 5;
        return `${t.map((r,o)=>`// ${o}
${JSON.stringify(r, null, 2)}`).join(`

`)}${i ? `

...and ${n.length - 5} more` : ""}`
    }
    async function F(n, e=5e3) {
        const t = Date.now();
        let i = !1;
        for (; ; )
            try {
                return await n(r=>{
                    if (r)
                        throw i = !0,
                        r
                }
                )
            } catch (s) {
                if (await new Promise(r=>setTimeout(r, 100)),
                i || e !== null && Date.now() - t > e)
                    throw s
            }
    }
    async function U(n) {
        return new Promise(e=>setTimeout(e, n))
    }
    async function W(n, e, t) {
        const i = typeof t == "function" ? {} : t
          , s = typeof t == "function" ? t : t == null ? void 0 : t.predicate
          , r = typeof (i == null ? void 0 : i.timeout) != "undefined" ? i.timeout : 1e4;
        return new Promise((o,a)=>{
            const c = h=>{
                (!s || s(h)) && (n.off(e, c),
                o(h))
            }
            ;
            n.on(e, c),
            r !== null && setTimeout(()=>{
                n.off(e, c),
                a(new R(`Timeout ${r}ms exceeded while waiting for event "${e}"`))
            }
            , r)
        }
        )
    }
    class Te extends me {
        constructor({socket: e, window: t, logger: i=new y, config: s}) {
            super({
                socket: e,
                logger: i
            }),
            this.ready = !1,
            this.window = t,
            s && (this._config = this.mapConfig(s)),
            this.window.on("*", async({type: r, value: o})=>{
                if (this.ready)
                    switch (r) {
                    case "app":
                        this.app = o,
                        this.emit(r, o);
                        break;
                    case "deviceInfo":
                        this.device = o,
                        this.emit(r, o);
                        break;
                    case "config":
                        this._config = this.mapConfig(o);
                        break
                    }
            }
            ),
            this.window.on("reinit", ()=>{
                this.ready = !1,
                this.session = void 0,
                this.init({
                    isReinit: !0
                })
            }
            ),
            this.socket.on("*", async({type: r, value: o})=>{
                if (this.ready)
                    switch (r) {
                    case "newSession":
                        try {
                            this.session = this.createSession(this._config, {
                                path: o.path,
                                token: o.sessionToken
                            }),
                            await this.waitForSessionStart(this.session),
                            this.emit("session", this.session)
                        } catch (a) {
                            this.session = void 0,
                            this.emit("sessionError", a)
                        }
                    }
            }
            ),
            this.init()
        }
        async init(e={
            isReinit: !1
        }) {
            await this.window.waitUntilReady();
            const t = async()=>{
                if (e.isReinit) {
                    const r = this._config
                      , o = await this.setConfig({});
                    return this.setConfig({
                        record: !0,
                        ...r,
                        ...o
                    })
                } else
                    return this.setConfig({
                        record: !0,
                        ...this._config
                    })
            }
              , [i,s] = await Promise.all([this.window.postMessage({
                type: "getApp"
            }, !0), this.window.postMessage({
                type: "getDeviceInfo"
            }, !0), t()]);
            this.app = i,
            this.device = s,
            this.ready = !0
        }
        async waitUntilReady() {
            if (!this.ready)
                return F(async()=>{
                    if (!this.ready)
                        throw new Error("Timed out waiting for client to be ready")
                }
                , 3e4)
        }
        async startSession(e) {
            try {
                await this.waitUntilReady()
            } catch (i) {
                const s = i instanceof Error ? i.message : i;
                throw new Error(`Failed to start session. ${s}`)
            }
            this.session && await this.session.end(),
            await this.setConfig(e != null ? e : {});
            const [t] = await Promise.all([new Promise((i,s)=>{
                const r = a=>{
                    this.off("session", r),
                    this.off("sessionError", o),
                    i(a)
                }
                  , o = a=>{
                    this.off("session", r),
                    this.off("sessionError", o),
                    s(a)
                }
                ;
                this.on("session", r),
                this.on("sessionError", o)
            }
            ), this.window.postMessage({
                type: "requestSession"
            }, !0)]);
            return t
        }
        async config(e) {
            return this.logger.warn("client.config() is deprecated and will be removed in a future major release. Use client.setConfig() instead."),
            this.setConfig(e)
        }
        async setConfig({publicKey: e, ...t}) {
            if (e) {
                const s = await this.window.postMessage({
                    type: "loadApp",
                    value: e
                }, !0);
                if (s && "error"in s)
                    throw new Error(s.error)
            }
            const i = await this.window.postMessage({
                type: "setConfig",
                value: this.validateConfig(t != null ? t : {})
            }, !0).then(this.mapConfig.bind(this));
            return this._config = i,
            i
        }
        mapConfig(e) {
            return e.autoplay === !0 && this.logger.warn.once("autoplay=true may cause the session to start before the SDK is ready. You should start the session programmatically using client.startSession() instead."),
            {
                ...A(e),
                device: e.deviceType || e.device
            }
        }
        validateConfig(e) {
            return e
        }
        createSession(e, t) {
            throw new Error("Not implemented")
        }
    }
    function T(n) {
        if (typeof n == "string") {
            if (n.endsWith("%"))
                return parseInt(n, 10) / 100;
            throw new Error(`Invalid position value: ${n}. Must be a number between 0 and 1, or a string ending with %`)
        }
        return n
    }
    class Se {
        constructor({platform: e, screen: t, app: i}) {
            this.platform = e,
            this.screen = t,
            this.app = i
        }
        pixelToDip(e) {
            return e / (this.screen.devicePixelRatio || 1)
        }
        dipToPixel(e) {
            return e * (this.screen.devicePixelRatio || 1)
        }
        getCoordinates(e, t) {
            const i = T(e.x)
              , s = T(e.y);
            return {
                x: i * t.width,
                y: s * t.height
            }
        }
        mapHardwareKey(e) {
            switch (e) {
            case "HOME":
                return "home";
            case "VOLUME_UP":
                return "volumeUp";
            case "VOLUME_DOWN":
                return "volumeDown"
            }
            return e
        }
        mapAction(e) {
            return A((()=>{
                e = A(e);
                let i, s, r;
                if ("element"in e && e.element && (i = this.mapElement(e.element)),
                "position"in e && e.position) {
                    const o = T(e.position.x)
                      , a = T(e.position.y);
                    if (!x.isValidNumber(o) || !x.isValidNumber(a))
                        throw new g(`Invalid position: (${e.position.x}, ${e.position.y}). Values must be a number or a percentage`);
                    if (!x.isPositionWithinBounds(e.position))
                        throw typeof e.position.x == "string" ? new Error(`Invalid position: (${e.position.x}, ${e.position.y}) must be within (0%, 0%) and (100%, 100%)`) : new Error(`Invalid position: (${e.position.x}, ${e.position.y}) must be within (0, 0) and (1, 1)`);
                    this.platform === "android" ? s = this.getCoordinates(e.position, {
                        width: this.dipToPixel(this.screen.width) - 1,
                        height: this.dipToPixel(this.screen.height) - 1
                    }) : s = this.getCoordinates(e.position, {
                        width: this.screen.width - 1,
                        height: this.screen.height - 1
                    })
                } else if ("coordinates"in e && e.coordinates) {
                    if (!x.isValidNumber(e.coordinates.x) || !x.isValidNumber(e.coordinates.y))
                        throw new g(`Invalid coordinates: (${e.coordinates.x}, ${e.coordinates.y}). Values must be a number`);
                    if (!x.isCoordinatesWithinBounds(e.coordinates, {
                        width: this.screen.width - 1,
                        height: this.screen.height - 1
                    }))
                        throw new g(`Invalid coordinates: (${e.coordinates.x}, ${e.coordinates.y}) exceed screen bounds (${this.screen.width - 1}, ${this.screen.height - 1})`);
                    this.platform === "android" ? s = {
                        x: this.dipToPixel(e.coordinates.x),
                        y: this.dipToPixel(e.coordinates.y)
                    } : s = e.coordinates
                }
                if ("localPosition"in e && e.localPosition) {
                    const o = T(e.localPosition.x)
                      , a = T(e.localPosition.y);
                    if (!x.isValidNumber(o) || !x.isValidNumber(a))
                        throw new g(`Invalid localPosition: (${e.localPosition.x}, ${e.localPosition.y}). Values must be a number or a percentage`);
                    r = {
                        x: o,
                        y: a
                    }
                } else
                    i && (r = {
                        x: .5,
                        y: .5
                    });
                if ("duration"in e && e.duration && !x.isValidNumber(e.duration))
                    throw new g(`Invalid duration: ${e.duration}. Value must be a number`);
                switch (e.type) {
                case "tap":
                    {
                        const {position: o, ...a} = e;
                        return {
                            ...a,
                            element: i,
                            localPosition: r,
                            coordinates: s
                        }
                    }
                case "swipe":
                    {
                        const {position: o, ...a} = e;
                        return {
                            ...a,
                            element: i,
                            localPosition: r,
                            coordinates: s,
                            moves: e.moves.map(c=>{
                                if (this.platform === "android") {
                                    const {x: h, y: u} = this.getCoordinates(c, {
                                        width: this.dipToPixel(this.screen.width) - 1,
                                        height: this.dipToPixel(this.screen.height) - 1
                                    });
                                    return {
                                        ...c,
                                        x: h,
                                        y: u
                                    }
                                } else {
                                    const {x: h, y: u} = this.getCoordinates(c, {
                                        width: this.screen.width - 1,
                                        height: this.screen.height - 1
                                    });
                                    return {
                                        ...c,
                                        x: h,
                                        y: u
                                    }
                                }
                            }
                            )
                        }
                    }
                case "keypress":
                    {
                        const o = this.mapHardwareKey(e.key)
                          , a = this.mapHardwareKey(e.character);
                        return {
                            ...e,
                            key: o,
                            character: a,
                            shiftKey: this.platform === "ios" ? Le(e.shiftKey) : e.shiftKey
                        }
                    }
                case "findElements":
                    return {
                        ...e,
                        element: i
                    }
                }
                return e
            }
            )())
        }
        mapElement(e) {
            const {attributes: t, bounds: i, ...s} = e
              , r = ()=>{
                if (i) {
                    const {x: a, y: c, width: h, height: u} = i;
                    return this.platform === "android" ? {
                        x: this.dipToPixel(a),
                        y: this.dipToPixel(c),
                        width: this.dipToPixel(h),
                        height: this.dipToPixel(u)
                    } : {
                        x: j(a),
                        y: j(c),
                        width: j(h),
                        height: j(u)
                    }
                }
            }
              , o = ()=>{
                if (t)
                    return Object.keys(t).reduce((a,c)=>{
                        if (this.platform === "ios")
                            switch (c) {
                            case "userInteractionEnabled":
                            case "isHidden":
                                return {
                                    ...a,
                                    [c]: t[c] ? "1" : "0"
                                }
                            }
                        else
                            this.platform;
                        return {
                            ...a,
                            [c]: t[c]
                        }
                    }
                    , {})
            }
            ;
            return A({
                ...s,
                bounds: r(),
                attributes: o(),
                accessibilityElements: void 0
            })
        }
    }
    class Ce {
        constructor({platform: e, screen: t, app: i}) {
            this.platform = e,
            this.screen = t,
            this.app = i
        }
        pixelToDip(e) {
            return e / (this.screen.devicePixelRatio || 1)
        }
        dipToPixel(e) {
            return e * (this.screen.devicePixelRatio || 1)
        }
        getPosition(e, t) {
            return {
                x: e.x / t.width,
                y: e.y / t.height
            }
        }
        mapHardwareKey(e) {
            switch (e) {
            case "home":
                return "HOME";
            case "volumeUp":
                return "VOLUME_UP";
            case "volumeDown":
                return "VOLUME_DOWN"
            }
            return e
        }
        mapAction(e) {
            return A((()=>{
                let i, s, r, o = "localPosition"in e ? e.localPosition : void 0;
                switch ("coordinates"in e && e.coordinates && (s = {
                    x: this.pixelToDip(e.coordinates.x),
                    y: this.pixelToDip(e.coordinates.y)
                },
                r = this.getPosition(s, {
                    width: this.screen.width - 1,
                    height: this.screen.height - 1
                })),
                "element"in e && e.element && (i = this.mapElement(e.element),
                s && i.bounds && (o = this.getPosition({
                    x: s.x - i.bounds.x,
                    y: s.y - i.bounds.y
                }, {
                    width: i.bounds.width,
                    height: i.bounds.height
                }))),
                e.type) {
                case "tap":
                    return {
                        ...e,
                        element: i,
                        position: r,
                        localPosition: o
                    };
                case "swipe":
                    return {
                        ...e,
                        element: i,
                        position: r,
                        localPosition: o,
                        moves: e.moves.map(a=>{
                            const {x: c, y: h} = this.getPosition({
                                x: this.pixelToDip(a.x),
                                y: this.pixelToDip(a.y)
                            }, {
                                width: this.screen.width - 1,
                                height: this.screen.height - 1
                            });
                            return {
                                x: c,
                                y: h,
                                t: a.t
                            }
                        }
                        )
                    };
                case "keypress":
                    {
                        const a = this.mapHardwareKey(e.key)
                          , c = this.mapHardwareKey(e.character);
                        return {
                            ...e,
                            key: a,
                            character: c,
                            shiftKey: typeof e.shiftKey == "number" ? Pe(e.shiftKey) : Boolean(e.shiftKey)
                        }
                    }
                case "findElements":
                    return {
                        ...e,
                        element: i
                    }
                }
                return e
            }
            )())
        }
        mapUI(e) {
            var o, a;
            const t = (o = e.ui) != null ? o : e.result
              , i = e.springboard
              , s = c=>{
                var h;
                return {
                    ...this.mapElement(c),
                    children: (h = c.children) == null ? void 0 : h.map(s)
                }
            }
              , r = [];
            return t && (this.platform === "ios" ? r.push({
                type: "app",
                appId: (a = this.app) == null ? void 0 : a.bundle,
                children: t.map(s)
            }) : r.push({
                type: "app",
                children: t.map(s)
            })),
            i && r.push({
                type: "app",
                appId: "com.apple.springboard",
                children: i.map(s)
            }),
            r
        }
        mapElement(e) {
            const {attributes: t, bounds: i, accessibilityElements: s, ...r} = e
              , o = h=>this.platform === "android" ? {
                x: this.pixelToDip(h.x),
                y: this.pixelToDip(h.y),
                width: this.pixelToDip(h.width),
                height: this.pixelToDip(h.height)
            } : {
                x: K(h.x),
                y: K(h.y),
                width: K(h.width),
                height: K(h.height)
            }
              , a = h=>Object.keys(h).reduce((u,l)=>{
                switch (l) {
                case "userInteractionEnabled":
                case "isHidden":
                    return {
                        ...u,
                        [l]: h[l] === "1"
                    };
                default:
                    return {
                        ...u,
                        [l]: h[l]
                    }
                }
            }
            , {})
              , c = h=>h.map(u=>{
                const {accessibilityFrame: l} = u;
                return {
                    ...a(u),
                    accessibilityFrame: l ? o(l) : void 0
                }
            }
            );
            return A({
                ...r,
                bounds: i ? o(i) : void 0,
                attributes: t ? a(t) : void 0,
                accessibilityElements: s ? c(s) : void 0
            })
        }
        mapAppetizerEvent(e, t) {
            var i, s;
            switch (e) {
            case "debug":
                return {
                    type: "log",
                    value: t
                };
            case "interceptResponse":
                return {
                    type: "network",
                    value: {
                        type: "response",
                        ...t
                    }
                };
            case "interceptRequest":
                return {
                    type: "network",
                    value: {
                        type: "request",
                        ...t
                    }
                };
            case "interceptError":
                return {
                    type: "network",
                    value: {
                        type: "error",
                        ...t
                    }
                };
            case "userError":
                return {
                    type: "error",
                    value: t
                };
            case "recordedAction":
                return {
                    type: "action",
                    value: this.mapAction(t)
                };
            case "playbackFoundAndSent":
                {
                    const r = t;
                    return {
                        type: "playbackFoundAndSent",
                        value: {
                            ...r,
                            playback: {
                                ...r.playback,
                                action: r.playback.action ? this.mapAction(r.playback.action) : void 0
                            },
                            matchedElements: (i = r.matchedElements) == null ? void 0 : i.map(o=>{
                                if (o)
                                    return this.mapElement(o)
                            }
                            )
                        }
                    }
                }
            case "playbackError":
                {
                    const r = t;
                    return {
                        type: "playbackError",
                        value: {
                            ...r,
                            playback: {
                                ...r.playback,
                                action: r.playback.action ? this.mapAction(r.playback.action) : void 0
                            },
                            matchedElements: (s = r.matchedElements) == null ? void 0 : s.map(o=>{
                                if (o)
                                    return this.mapElement(o)
                            }
                            )
                        }
                    }
                }
            case "uiDump":
                return {
                    type: "uiDump",
                    value: this.mapUI(t)
                };
            case "userInteractionReceived":
                return {
                    type: "interaction",
                    value: t
                };
            case "countdownWarning":
                return {
                    type: "inactivityWarning",
                    value: t
                };
            case "h264Data":
                return {
                    type: "video",
                    value: {
                        ...t,
                        codec: "h264"
                    }
                };
            case "frameData":
                return {
                    type: "video",
                    value: {
                        ...t,
                        codec: "jpeg"
                    }
                };
            case "audioData":
                return {
                    type: "audio",
                    value: {
                        ...t,
                        codec: "aac"
                    }
                };
            case "deleteEvent":
                return null
            }
        }
    }
    class x {
        static isCoordinatesWithinBounds(e, t) {
            return !(e.x < 0 || e.x > t.width || e.y < 0 || e.y > t.height)
        }
        static isPositionWithinBounds(e) {
            const t = T(e.x)
              , i = T(e.y);
            return !(t < 0 || t > 1 || i < 0 || i > 1)
        }
        static isValidNumber(e) {
            return !(typeof e != "number" || isNaN(e))
        }
    }
    function Le(n) {
        return n ? 1 : 0
    }
    function Pe(n) {
        return n === 1
    }
    function K(n) {
        return typeof n == "number" ? n : n === "inf" ? 1 / 0 : n === "-inf" ? -1 / 0 : parseFloat(n)
    }
    function j(n) {
        return n === 1 / 0 ? "inf" : n === -1 / 0 ? "-inf" : n
    }
    function Ie(n) {
        if (typeof n != "object" || Array.isArray(n))
            throw new Error("Element must be an object");
        const e = Object.keys(n)
          , i = Re(e, ["text", "accessibilityIdentifier", "accessibilityLabel", "resource-id", "content-desc", "class", "baseClass"]);
        if (i.length > 0) {
            const s = i.map(r=>`'${r}'`).join(", ");
            throw new Error(`Element has invalid properties: ${s}. Did you mean to put these under 'attributes'?`)
        }
        return n
    }
    function Re(n, e) {
        return n.filter(t=>e.includes(t))
    }
    function Me(n) {
        const e = n.length;
        let t = "";
        for (let i = 0; i < e; i += 65535) {
            let s = 65535;
            i + 65535 > e && (s = e - i),
            t += String.fromCharCode.apply(null, n.subarray(i, i + s))
        }
        return t
    }
    function _e(n, e) {
        if (typeof window == "undefined" && typeof Buffer != "undefined") {
            const t = Buffer.from(n).toString("base64");
            return `data:${e};base64,` + t
        } else {
            const t = Me(n)
              , i = btoa(t);
            return `data:${e};base64,` + i
        }
    }
    class Oe {
        constructor({duration: e, stepDuration: t}) {
            this.moves = [],
            this.duration = e,
            this.stepDuration = t != null ? t : 16,
            this.moves = [{
                x: 0,
                y: 0
            }]
        }
        to(e, t) {
            if (typeof e != "string" || typeof t != "string")
                throw new g('x and y must be strings and in percentages (e.g. "50%")');
            if (!e.endsWith("%") || !t.endsWith("%"))
                throw new g('x and y must be in percentages (e.g. "50%")');
            return this.moves.push({
                x: parseFloat(e) / 100,
                y: parseFloat(t) / 100
            }),
            this
        }
        wait(e) {
            var i;
            const t = this.moves[this.moves.length - 1];
            return t && (t.wait = e + ((i = t.wait) != null ? i : 0)),
            this
        }
        build() {
            var a;
            const e = this.stepDuration
              , t = (a = this.duration) != null ? a : Math.max(500, e * (this.moves.length - 1))
              , i = Math.floor(t / e)
              , s = Math.floor(i / (this.moves.length - 1))
              , r = [];
            let o = 0;
            if (s === 0) {
                const c = (this.moves.length - 1) * e;
                throw new Error(`Duration is too short for ${this.moves.length - 1} moves, please set duration to at least ${c}ms`)
            }
            for (let c = 0; c < this.moves.length - 1; c++) {
                const h = this.moves[c]
                  , u = this.moves[c + 1]
                  , l = c === this.moves.length - 2;
                for (let p = 0; p <= s; p++) {
                    if (!l && p === s)
                        continue;
                    const w = p / s
                      , k = h.x + w * (u.x - h.x)
                      , P = h.y + w * (u.y - h.y)
                      , M = ((c * s + p) * e + o) / 1e3;
                    r.push({
                        x: k,
                        y: P,
                        t: M
                    }),
                    p === 0 && h.wait && (r.push({
                        x: k,
                        y: P,
                        t: M + h.wait / 1e3
                    }),
                    o += h.wait)
                }
                if (c === this.moves.length - 2 && u.wait) {
                    const p = r[r.length - 1];
                    r.push({
                        x: p.x,
                        y: p.y,
                        t: p.t + u.wait / 1e3
                    })
                }
            }
            return r
        }
        up(e="50%") {
            const t = parseFloat(e);
            return this.to("0%", `-${t}%`)
        }
        down(e="50%") {
            const t = parseFloat(e);
            return this.to("0%", `${t}%`)
        }
        left(e="50%") {
            const t = parseFloat(e);
            return this.to(`-${t}%`, "0%")
        }
        right(e="50%") {
            const t = parseFloat(e);
            return this.to(`${t}%`, "0%")
        }
    }
    class De extends N {
        constructor({socket: t, config: i, path: s, token: r, app: o, device: a, logger: c=new y}) {
            super();
            q(this, S, void 0);
            q(this, L, void 0);
            this.isEndingManually = !1,
            this.countdownWarning = !1,
            this.ready = !1,
            this._waitForAnimationsPromises = new Set,
            this.config = i,
            this.socket = t,
            this.device = a,
            this.app = o,
            this.path = s,
            this.token = r,
            this.logger = c;
            const h = ({type: u, value: l})=>{
                const w = new Ce({
                    platform: this.config.platform,
                    screen: this.device.screen,
                    app: this.app
                }).mapAppetizerEvent(u, l);
                switch (u) {
                case "ready":
                    this.ready = !0;
                    break;
                case "adbOverTcp":
                    {
                        V(this, S, {
                            ...l,
                            command: Ne(l)
                        });
                        break
                    }
                case "networkInspectorUrl":
                    V(this, L, l);
                    break;
                case "countdownWarning":
                    this.countdownWarning = !0;
                    break;
                case "timeoutReset":
                    this.countdownWarning = !1;
                    break;
                case "deviceInfo":
                    this.device = l;
                    break
                }
                w ? (this.emit(w.type, w.value),
                this.emit("*", w)) : w !== null && (this.emit(u, l),
                this.emit("*", {
                    type: u,
                    value: l
                }))
            }
            ;
            this.socket.on("*", h),
            this.on("disconnect", ()=>{
                this.socket.off("*", h),
                this.isEndingManually || (this.countdownWarning ? this.logger.warn("Appetize session has ended due to inactivity") : this.logger.warn("Session disconnected"))
            }
            )
        }
        on(t, i) {
            return t === "network" && this.config.proxy !== "intercept" && this.logger.warn('Session must be configured with `proxy: "intercept"` to listen to network events.'),
            t === "log" && this.config.debug !== !0 && this.logger.warn("Session must be configured with `debug: true` to listen to log events."),
            t === "action" && this.config.record !== !0 && this.logger.warn("Session must configured with `record: true` to listen to action events."),
            super.on(t, i)
        }
        async waitUntilReady() {
            let t = !0;
            const i = async r=>new Promise(o=>{
                const a = setInterval(()=>{
                    r() && o(void 0)
                }
                , 10);
                setTimeout(()=>{
                    clearInterval(a),
                    o(void 0)
                }
                , 3e3)
            }
            )
              , s = ()=>{
                t = !1
            }
            ;
            this.socket.once("disconnect", s);
            try {
                await F(r=>{
                    if (!this.ready) {
                        if (t)
                            throw new R("Timed out after 180s waiting for session to be ready");
                        r(new Error("Session disconnected"))
                    }
                }
                , 18e4)
            } finally {
                this.socket.off("disconnect", s)
            }
            await Promise.all([this.config.proxy === "intercept" ? i(()=>Boolean(C(this, L))) : Promise.resolve(), this.config.enableAdb ? i(()=>Boolean(C(this, S))) : Promise.resolve()])
        }
        async waitForEvent(t, i) {
            try {
                return await W(this, t, i)
            } catch (s) {
                throw f(s, this.waitForEvent),
                s
            }
        }
        async end() {
            this.isEndingManually = !0,
            await this.socket.disconnect()
        }
        get networkInspectorUrl() {
            return this.config.proxy !== "intercept" && this.logger.warn('Session must be configured with `proxy: "intercept"` to use the network inspector'),
            C(this, L)
        }
        get adbConnection() {
            if (this.config.platform && this.config.platform !== "android" && this.logger.warn("Session must be connected to an Android device to use adb"),
            this.config.enableAdb || this.logger.warn("Session must be configured with `enableAdb: true` to use adb"),
            C(this, S))
                return C(this, S)
        }
        async rotate(t) {
            try {
                const [i] = await Promise.all([this.waitForEvent("orientationChanged"), this.socket.send("userInteraction", {
                    type: "keypress",
                    key: t === "left" ? "rotateLeft" : "rotateRight",
                    timeStamp: Date.now()
                })]);
                return i
            } catch (i) {
                throw f(i, this.rotate),
                i
            }
        }
        async screenshot(t="buffer") {
            var i;
            try {
                this.socket.send("getScreenshot", {});
                const s = await W(this.socket, "screenshot", {
                    timeout: 6e4
                });
                if (!s.success)
                    throw new g((i = s.error) != null ? i : "Screenshot failed");
                return {
                    data: t === "buffer" ? (a=>typeof window == "undefined" ? Buffer.from(a) : a)(s.data) : _e(new Uint8Array(s.data), s.mimeType),
                    mimeType: s.mimeType
                }
            } catch (s) {
                throw f(s, this.screenshot),
                s
            }
        }
        async heartbeat() {
            try {
                return await this.socket.send("heartbeat")
            } catch (t) {
                throw f(t, this.heartbeat),
                t
            }
        }
        async type(t) {
            try {
                await U(1e3);
                const i = await this.playAction({
                    type: "typeText",
                    text: t
                });
                return await U(500),
                i
            } catch (i) {
                throw f(i, this.type),
                i
            }
        }
        async keypress(t, i) {
            try {
                if (t === "ANDROID_KEYCODE_MENU")
                    return await this.socket.send("androidKeycodeMenu");
                if ((i == null ? void 0 : i.shift) || t === "HOME") {
                    switch (t) {
                    case "ArrowUp":
                        t = "arrowUp";
                        break;
                    case "ArrowDown":
                        t = "arrowDown";
                        break;
                    case "ArrowLeft":
                        t = "arrowLeft";
                        break;
                    case "ArrowRight":
                        t = "arrowRight";
                        break;
                    case "Enter":
                        t = "\r";
                        break;
                    case "Tab":
                        t = "	";
                        break;
                    case "Backspace":
                        t = "\b";
                        break
                    }
                    return this.playAction({
                        type: "keypress",
                        key: t,
                        shiftKey: !!(i != null && i.shift)
                    })
                } else
                    return this.playAction({
                        type: "keypress",
                        character: t
                    })
            } catch (s) {
                throw f(s, this.keypress),
                s
            }
        }
        async setLanguage(t) {
            try {
                return this.config.language = t,
                await this.socket.send("setLanguage", {
                    language: t,
                    timeStamp: Date.now()
                })
            } catch (i) {
                throw f(i, this.setLanguage),
                i
            }
        }
        async setLocation(t, i) {
            try {
                if (typeof t != "number" || typeof i != "number")
                    throw new g("setLocation requires latitude and longitude to be numbers");
                const s = [t, i];
                return this.config.location = s,
                await this.socket.send("setLocation", {
                    location: s,
                    timeStamp: Date.now()
                })
            } catch (s) {
                throw f(s, this.setLocation),
                s
            }
        }
        async openUrl(t) {
            try {
                return await this.socket.send("openUrl", {
                    url: t,
                    timeStamp: Date.now()
                })
            } catch (i) {
                throw f(i, this.openUrl),
                i
            }
        }
        async shake() {
            try {
                return await this.socket.send("shakeDevice")
            } catch (t) {
                throw f(t, this.swipe),
                t
            }
        }
        async toggleSoftKeyboard() {
            try {
                if (this.config.platform !== "ios")
                    throw new Error("toggleSoftKeyboard is only available on iOS devices");
                return await this.socket.send("toggleSoftKeyboard")
            } catch (t) {
                throw f(t, this.toggleSoftKeyboard),
                t
            }
        }
        async biometry({match: t}) {
            try {
                return await this.socket.send(t ? "biometryMatch" : "biometryNoMatch")
            } catch (i) {
                throw f(i, this.biometry),
                i
            }
        }
        async allowInteractions(t) {
            try {
                return await this.socket.send(t ? "enableInteractions" : "disableInteractions")
            } catch (i) {
                throw f(i, this.allowInteractions),
                i
            }
        }
        async restartApp() {
            try {
                this.socket.send("restartApp");
                const {platform: t} = this.config;
                t === "ios" ? await this.waitForEvent("appLaunch", {
                    timeout: 6e4
                }) : await U(1e3)
            } catch (t) {
                throw f(t, this.restartApp),
                t
            }
        }
        async reinstallApp() {
            try {
                this.socket.send("reinstallApp"),
                await this.waitForEvent("appLaunch", {
                    timeout: 6e4
                })
            } catch (t) {
                throw f(t, this.reinstallApp),
                t
            }
        }
        async adbShellCommand(t) {
            if (this.config.platform !== "android")
                throw new Error("adbShellCommand is only available on Android devices");
            try {
                return await this.socket.send("adbShellCommand", {
                    command: t,
                    timeStamp: Date.now()
                })
            } catch (i) {
                throw f(i, this.adbShellCommand),
                i
            }
        }
        async playAction(t, i={}) {
            const {timeout: s=1e4} = i
              , r = 1e4
              , o = s + 3e4;
            try {
                if (!this.config.record)
                    throw new $("playAction()");
                if (isNaN(s))
                    throw new g(`Invalid timeout value: ${i.timeout}`);
                if (s < 0)
                    throw new g(`Timeout value cannot be negative: ${i.timeout}`);
                "element"in t && t.element && Ie(t.element);
                const a = new Se({
                    platform: this.config.platform,
                    screen: this.device.screen,
                    app: this.app
                })
                  , h = i.noMap ? t : a.mapAction(t)
                  , u = {
                    id: ge(),
                    action: h,
                    options: {
                        ...i,
                        timeout: Math.round(Math.min(s, r) / 1e3)
                    }
                };
                try {
                    return await new Promise((p,w)=>{
                        const k = setTimeout(()=>{
                            P(),
                            w(new se({
                                id: u.id,
                                action: t,
                                timeout: u.options.timeout
                            },"Timed out waiting for response from device"))
                        }
                        , o)
                          , P = ()=>{
                            this.off("playbackFoundAndSent", M),
                            this.off("playbackError", ce),
                            clearTimeout(k)
                        }
                          , M = async b=>{
                            var _;
                            ((_ = b.playback) == null ? void 0 : _.id) === u.id && (P(),
                            p(b))
                        }
                          , ce = async b=>{
                            var _;
                            if (((_ = b.playback) == null ? void 0 : _.id) === u.id)
                                switch (P(),
                                b.errorId) {
                                case "internalError":
                                    w(new ie(b));
                                    break;
                                case "notFound":
                                    {
                                        w(new Ee(b));
                                        break
                                    }
                                case "ambiguousMatch":
                                    w(new xe(b));
                                    break;
                                case "invalidArgument":
                                    {
                                        w(new ke(b));
                                        break
                                    }
                                default:
                                    w(new I(b));
                                    break
                                }
                        }
                        ;
                        this.on("playbackFoundAndSent", M),
                        this.on("playbackError", ce),
                        this.socket.send("playAction", u)
                    }
                    )
                } catch (l) {
                    const p = Math.max(0, s - r);
                    if (p > 0 && !(l instanceof se) && !(l instanceof ie))
                        return await this.playAction(t, {
                            ...i,
                            timeout: p
                        });
                    throw l
                }
            } catch (a) {
                throw f(a, this.playAction),
                a
            }
        }
        async playActions(t, i={}) {
            try {
                if (!this.config.record)
                    throw new $("playActions()");
                const s = [];
                for (const r of t) {
                    const o = await this.playAction(r, i);
                    s.push(o);
                    const a = t[t.indexOf(r) + 1];
                    a && a.type === "keypress" && r.type === "keypress" || await this.waitForAnimations({
                        timeout: 2e3
                    }).catch(()=>{}
                    )
                }
                return s
            } catch (s) {
                throw f(s, this.playActions),
                s
            }
        }
        async getUI({timeout: t=3e4}={}) {
            try {
                return this.socket.send("dumpUi"),
                await W(this, "uiDump", {
                    timeout: t
                })
            } catch (i) {
                throw f(i, this.getUI),
                i
            }
        }
        async findElement(t, i) {
            var s;
            try {
                return (s = (await this.playAction({
                    type: "findElements",
                    element: t,
                    appId: i == null ? void 0 : i.appId
                }, i)).matchedElements) == null ? void 0 : s[0]
            } catch (r) {
                throw f(r, this.findElement),
                r
            }
        }
        async findElements(t, i) {
            try {
                return (await this.playAction({
                    type: "findElements",
                    element: t,
                    appId: i == null ? void 0 : i.appId
                }, i)).matchedElements
            } catch (s) {
                throw f(s, this.findElements),
                s
            }
        }
        async tap(t, i) {
            var s;
            try {
                if (!this.config.record)
                    throw new $("tap()");
                return await this.playAction({
                    type: "tap",
                    ...t,
                    duration: ((s = t.duration) != null ? s : 0) / 1e3
                }, i)
            } catch (r) {
                throw f(r, this.tap),
                r
            }
        }
        async swipe({duration: t, gesture: i, ...s}, r) {
            try {
                if (!this.config.record)
                    throw new $("swipe()");
                let o;
                const a = new Oe({
                    duration: t,
                    stepDuration: s.stepDuration
                });
                if (typeof i == "function")
                    i(a);
                else
                    switch (i) {
                    case "up":
                        a.up();
                        break;
                    case "down":
                        a.down();
                        break;
                    case "left":
                        a.left();
                        break;
                    case "right":
                        a.right();
                        break
                    }
                if ("element"in s)
                    o = {
                        type: "swipe",
                        element: s.element,
                        localPosition: s.localPosition,
                        moves: a.build()
                    };
                else if ("position"in s)
                    o = {
                        type: "swipe",
                        position: s.position,
                        moves: a.build()
                    };
                else
                    throw new Error("Either element or position must be specified");
                return this.playAction(o, r)
            } catch (o) {
                throw f(o, this.swipe),
                o
            }
        }
        async waitForAnimations(t={}) {
            try {
                const {imageThreshold: i=.001, timeout: s=1e4} = t;
                let r = 1e3
                  , o = 1;
                t.imageThresholdDuration && (r = t.imageThresholdDuration);
                const [a,c,h] = be()
                  , u = setTimeout(()=>{
                    let w = `Timed out after ${s}ms waiting for animation to end.`;
                    i < o && (w += ` Waited for imageThreshold of ${i} but lowest was ${Math.round(o * 1e4) / 1e4}`),
                    h(new R(w))
                }
                , s);
                let l;
                const p = ({percentage: w, timestamp: k})=>{
                    w < o && (o = w),
                    w <= i ? (l || (l = k),
                    l && k - l >= r && c()) : l = void 0
                }
                ;
                return this.socket.send("enablePixelChangeDetection"),
                this.socket.on("pixelsChanged", p),
                this._waitForAnimationsPromises.add(a),
                await a.finally(()=>{
                    clearTimeout(u),
                    this.socket.off("pixelsChanged", p),
                    this._waitForAnimationsPromises.delete(a),
                    this._waitForAnimationsPromises.size === 0 && this.socket.send("disablePixelChangeDetection")
                }
                )
            } catch (i) {
                throw f(i, this.waitForAnimations),
                i
            }
        }
        async getAdbInfo() {
            return this.logger.warn("getAdbInfo() is deprecated. Please use the `adbConnection` property instead."),
            Promise.resolve(C(this, S))
        }
        async getNetworkInspectorUrl() {
            return this.logger.warn("getNetworkInspectorUrl() is deprecated. Please use the `networkInspectorUrl` property instead."),
            Promise.resolve(C(this, L))
        }
        async getDeviceInfo() {
            return this.logger.warn("getDeviceInfo() is deprecated. Please use the `device` property instead."),
            Promise.resolve(this.device)
        }
    }
    S = new WeakMap,
    L = new WeakMap;
    function Ne(n) {
        const e = "ssh -fN -o StrictHostKeyChecking=no -oHostKeyAlgorithms=+ssh-rsa -p SERVER_PORT USERNAME@HOSTNAME -L6000:FORWARD_DESTINATION:FORWARD_PORT && adb connect localhost:6000";
        if (!n || !n.forwards[0])
            return;
        let t = e;
        return t = t.replace(/SERVER_PORT/, n.port.toString()),
        t = t.replace(/USERNAME/, n.user),
        t = t.replace(/HOSTNAME/, n.hostname),
        t = t.replace(/FORWARD_DESTINATION/, n.forwards[0].destination),
        t = t.replace(/FORWARD_PORT/, n.forwards[0].port.toString()),
        t
    }
    function ne({type: n, value: e}) {
        switch (n) {
        case "deviceInfo":
            return {
                type: "deviceInfo",
                value: e
            };
        case "sessionRequested":
            return {
                type: "sessionRequested"
            };
        case "chromeDevToolsUrl":
            return {
                type: "networkInspectorUrl",
                value: e
            };
        case "orientationChanged":
            return {
                type: "orientationChanged",
                value: e
            }
        }
    }
    class re extends N {
        constructor({window: e, type: t}) {
            super(),
            this.type = t,
            this.window = e,
            this.window.on("*", ({type: i, value: s})=>{
                switch (i) {
                case "socketEvent":
                    s.socket === this.type && (this.emit(s.type, s.value),
                    this.emit("*", {
                        type: s.type,
                        value: s.value
                    }));
                    break;
                case "disconnect":
                    this.emit("disconnect"),
                    this.emit("*", {
                        type: "disconnect"
                    });
                    break;
                case "sessionInfo":
                case "chromeDevToolsUrl":
                case "orientationChanged":
                case "deviceInfo":
                    if (this.type === "appetizer") {
                        const r = ne({
                            type: i,
                            value: s
                        });
                        r && (this.emit(r.type, r.value),
                        this.emit("*", r))
                    }
                    break;
                case "sessionRequested":
                    if (this.type === "webserver") {
                        const r = ne({
                            type: i,
                            value: s
                        });
                        r && (this.emit(r.type, r.value),
                        this.emit("*", r))
                    }
                    break
                }
            }
            )
        }
        async send(e, t) {
            var i;
            await this.window.waitUntilReady(),
            await ((i = this.window) == null ? void 0 : i.postMessage({
                type: "emitSocketEvent",
                value: {
                    type: e,
                    value: t,
                    socket: this.type
                }
            }))
        }

        async waitForEvent(e, t) {
            return W(this, e, t)
        }
    }
    class $e extends De {
        constructor({window: e, config: t, ...i}) {
            const s = new re({
                window: e,
                type: "appetizer"
            });
            super({
                ...i,
                config: t,
                socket: s,
                logger: new y
            }),
            this.window = e
        }
        async rotate(e) {
            try {
                const [t] = await Promise.all([this.waitForEvent("orientationChanged"), this.window.postMessage(e === "left" ? "rotateLeft" : "rotateRight")]);
                return await U(1e3),
                t
            } catch (t) {
                throw f(t, this.rotate),
                t
            }
        }
        async end() {
            this.isEndingManually = !0,
            await this.window.postMessage("endSession")
        }
    }
    const oe = "1.2.1";
    class Fe extends N {
        constructor({selector: e, config: t}={}) {
            super(),
            this.selector = e,
            this.initialConfig = t,
            this.handleWindowMessage = this.handleWindowMessage.bind(this),
            window.addEventListener("message", this.handleWindowMessage),
            this.init()
        }
        async init() {
            await new Promise((e,t)=>{
                let i;
                const s = ()=>{
                    i == null || i.disconnect(),
                    clearTimeout(r),
                    clearInterval(o)
                }
                  , r = setTimeout(()=>{
                    this.selector && (s(),
                    t(new R(`Timed out after 60000ms waiting for Appetize iframe with selector "${this.selector}"`)))
                }
                , 6e4)
                  , o = setInterval(()=>{
                    var h, u, l;
                    const a = new MessageChannel;
                    this.contentWindow = this.getContentWindow();
                    const c = this.getIframe();
                    if (this.contentWindow)
                        a.port1.onmessage = ()=>{
                            if (this.ready = !0,
                            s(),
                            c) {
                                const p = ()=>{
                                    s(),
                                    this.emit("reinit"),
                                    this.ready = !1,
                                    this.init()
                                }
                                ;
                                i = Ue(c, {
                                    onSrcChange: ()=>{
                                        this.ready = !1
                                    }
                                    ,
                                    onLoad: p,
                                    onRemoved: p
                                })
                            }
                            e(void 0)
                        }
                        ,
                        (h = this.contentWindow) == null || h.postMessage({
                            type: "init",
                            appetizeClient: !0,
                            version: oe
                        }, "*", [a.port2]);
                    else if (c && !c.src) {
                        const p = (u = c.getAttribute("data-appetize-url")) != null ? u : "https://appetize.io";
                        if ((l = this.initialConfig) != null && l.publicKey) {
                            const {publicKey: w, ...k} = this.initialConfig;
                            c.src = `${p}/embed/${this.initialConfig.publicKey}?${ve(k)}`
                        } else
                            throw s(),
                            new Error("Missing publicKey in config in getClient()")
                    }
                }
                , 100)
            }
            )
        }
        async waitUntilReady() {
            return F(async()=>{
                if (this.selector && !this.getContentWindow())
                    throw new Error(`iframe not found for selector "${this.selector}"`);
                await F(()=>{
                    if (!this.ready)
                        throw new Error("iframe was found but content did not load")
                }
                , 2e4)
            }
            , 5e3)
        }
        async postMessage(e, t=!1) {
            var s;
            await this.waitUntilReady();
            const i = new MessageChannel;
            if ((s = this.contentWindow) == null || s.postMessage(e, "*", [i.port2]),
            t)
                return new Promise((r,o)=>{
                    const a = setTimeout(()=>{
                        o(new R("Timed out after 60000ms while waiting for postMessage response"))
                    }
                    , 6e4);
                    i.port1.onmessage = c=>{
                        clearTimeout(a),
                        i.port1.close(),
                        i.port2.close(),
                        r(c.data)
                    }
                }
                );
            i.port1.close(),
            i.port2.close()
        }
        getContentWindow() {
            var e;
            if (this.selector) {
                const t = this.getIframe();
                if (t != null && t.src)
                    return (e = t.contentWindow) != null ? e : void 0
            } else
                return window
        }
        getIframe() {
            if (this.selector)
                return document.querySelector(this.selector)
        }
        handleWindowMessage(e) {
            var i, s, r;
            const t = typeof e.data == "string" ? e.data : (i = e.data) == null ? void 0 : i.type;
            this.contentWindow && e.source === this.contentWindow && (this.emit(t, (s = e.data) == null ? void 0 : s.value),
            this.emit("*", {
                type: t,
                value: (r = e.data) == null ? void 0 : r.value
            }))
        }
    }
    function Ue(n, e) {
        const t = n.src
          , i = ()=>{
            n.src !== t && e.onLoad()
        }
          , s = ()=>{
            n.removeEventListener("load", i),
            r.disconnect()
        }
        ;
        n.addEventListener("load", i);
        const r = new MutationObserver(o=>{
            o.forEach(a=>{
                a.type === "attributes" ? a.target === n && a.attributeName === "src" && e.onSrcChange() : a.type === "childList" && a.removedNodes.forEach(c=>{
                    c === n && e.onRemoved()
                }
                )
            }
            )
        }
        );
        return r.observe(document.body, {
            childList: !0,
            subtree: !0,
            attributes: !0
        }),
        {
            disconnect: s
        }
    }
    class ae extends Te {
        constructor({selector: e, config: t}={}) {
            const i = new Fe({
                selector: e,
                config: t
            });
            super({
                socket: new re({
                    window: i,
                    type: "webserver"
                }),
                config: t,
                window: i
            }),
            this.ready = !1
        }
        createSession(e, t) {
            return this.session = new $e({
                window: this.window,
                config: e,
                path: t.path,
                token: t.token,
                device: this.device,
                app: this.app
            }),
            this.session.on("disconnect", ()=>{
                this.session = void 0
            }
            ),
            this.session
        }
    }
    async function We(n, e) {
        if (!n)
            throw new Error("selector is required");
        const t = new ae({
            selector: n,
            config: e
        });
        return await t.waitUntilReady(),
        t
    }
    function Ke(n) {
        return new ae({
            config: n
        })
    }
    const je = oe;
    return m.getClient = We,
    m.getWindowClient = Ke,
    m.version = je,
    Object.defineProperties(m, {
        __esModule: {
            value: !0
        },
        [Symbol.toStringTag]: {
            value: "Module"
        }
    }),
    m
}({});
//# sourceMappingURL=embed.js.map
