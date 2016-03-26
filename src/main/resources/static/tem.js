/**
 * Created by Else05 on 2016/3/19.
 */
javascript:(function () {
    function R(a) {
        ona = "on" + a;
        if (window.addEventListener) {
            window.addEventListener(a, function (e) {
                for (var n = e.originalTarget; n; n = n.parentNode) {
                    n[ona] = null;
                }
            }, true);
        }

        window[ona] = null;
        document[ona] = null;
        if (document.body) {
            document.body[ona] = null;
        }
    }

    R("contextmenu");
    R("click");
    R("mousedown");
    R("mouseup");
    R("selectstart");
})();


!function () {
    function m() {
        return function () {
        }
    }

    function p(t) {
        return function () {
            return this[t]
        }
    }

    function q(t) {
        return function () {
            return t
        }
    }

    function u(t, e, i) {
        if ("string" == typeof t) {
            if (0 === t.indexOf("#") && (t = t.slice(1)), u.wa[t])return u.wa[t];
            t = u.v(t)
        }
        if (!t || !t.nodeName)throw new TypeError("The element or ID supplied is not valid. (videojs)");
        return t.player || new u.w(t, e, i)
    }

    function D(t) {
        t.t("vjs-lock-showing")
    }

    function E(t, e, i, n) {
        return i !== b ? (t.a.style[e] = -1 !== ("" + i).indexOf("%") || -1 !== ("" + i).indexOf("px") ? i : "auto" === i ? "" : i + "px", n || t.j("resize"), t) : t.a ? (i = t.a.style[e], n = i.indexOf("px"), -1 !== n ? parseInt(i.slice(0, n), 10) : parseInt(t.a["offset" + u.$(e)], 10)) : 0
    }

    function F(t, e) {
        var i, n, o, s;
        return i = t.a, n = u.Xc(i), s = o = i.offsetWidth, i = t.handle, t.g.zd ? (s = n.top, n = e.changedTouches ? e.changedTouches[0].pageY : e.pageY, i && (i = i.v().offsetHeight, s += i / 2, o -= i), Math.max(0, Math.min(1, (s - n + o) / o))) : (o = n.left, n = e.changedTouches ? e.changedTouches[0].pageX : e.pageX, i && (i = i.v().offsetWidth, o += i / 2, s -= i), Math.max(0, Math.min(1, (n - o) / s)))
    }

    function ca(t, e) {
        t.Z(e), e.d("click", u.bind(t, function () {
            D(this)
        }))
    }

    function H(t) {
        t.oa = f, t.va.m("vjs-lock-showing"), t.a.setAttribute("aria-pressed", f), t.J && 0 < t.J.length && t.J[0].v().focus()
    }

    function G(t) {
        t.oa = l, D(t.va), t.a.setAttribute("aria-pressed", l)
    }

    function da(t) {
        var e = {sources: [], tracks: []};
        if (u.k.B(e, u.wb(t)), t.hasChildNodes()) {
            var i, n, o, s;
            for (t = t.childNodes, o = 0, s = t.length; s > o; o++)i = t[o], n = i.nodeName.toLowerCase(), "source" === n ? e.sources.push(u.wb(i)) : "track" === n && e.tracks.push(u.wb(i))
        }
        return e
    }

    function J(t, e, i) {
        t.h ? (t.aa = l, t.h.D(), t.Db && (t.Db = l, clearInterval(t.Qa)), t.Eb && K(t), t.h = l) : "Html5" !== e && t.F && (t.a.removeChild(t.F), t.F.player = j, t.F = j), t.ia = e, t.aa = l;
        var n = u.k.B({source: i, parentEl: t.a}, t.g[e.toLowerCase()]);
        i && (i.src == t.u.src && 0 < t.u.currentTime && (n.startTime = t.u.currentTime), t.u.src = i.src), t.h = new window.videojs[e](t, n), t.h.M(function () {
            if (this.b.Ta(), !this.l.progressEvents) {
                var t = this.b;
                t.Db = f, t.Qa = setInterval(u.bind(t, function () {
                    this.u.kb < this.buffered().end(0) ? this.j("progress") : 1 == this.Ia() && (clearInterval(this.Qa), this.j("progress"))
                }), 500), t.h.U("progress", function () {
                    this.l.progressEvents = f;
                    var t = this.b;
                    t.Db = l, clearInterval(t.Qa)
                })
            }
            this.l.timeupdateEvents || (t = this.b, t.Eb = f, t.d("play", t.yc), t.d("pause", t.ya), t.h.U("timeupdate", function () {
                this.l.timeupdateEvents = f, K(this.b)
            }))
        })
    }

    function K(t) {
        t.Eb = l, t.ya(), t.n("play", t.yc), t.n("pause", t.ya)
    }

    function M(t, e, i) {
        if (t.h && !t.h.aa)t.h.M(function () {
            this[e](i)
        }); else try {
            t.h[e](i)
        } catch (n) {
            throw u.log(n), n
        }
    }

    function L(t, e) {
        if (t.h && t.h.aa)try {
            return t.h[e]()
        } catch (i) {
            throw t.h[e] === b ? u.log("Video.js: " + e + " method not defined for " + t.ia + " playback technology.", i) : "TypeError" == i.name ? (u.log("Video.js: " + e + " unavailable on " + t.ia + " playback technology element.", i), t.h.aa = l) : u.log(i), i
        }
    }

    function N(t) {
        t.Zc = l, u.n(document, "keydown", t.hc), document.documentElement.style.overflow = t.Uc, u.t(document.body, "vjs-full-window"), t.j("exitFullWindow")
    }

    function I(t, e) {
        return e !== b ? (e = !!e, e !== t.Ob && ((t.Ob = e) ? (t.ja = f, t.t("vjs-user-inactive"), t.m("vjs-user-active"), t.j("useractive")) : (t.ja = l, t.h.U("mousemove", function (t) {
            t.stopPropagation(), t.preventDefault()
        }), t.t("vjs-user-active"), t.m("vjs-user-inactive"), t.j("userinactive"))), t) : t.Ob
    }

    function ea() {
        var t = u.media.Ua[i];
        return function () {
            throw Error('The "' + t + "\" method is not available on the playback technology's API")
        }
    }

    function fa() {
        var t = S[U], e = t.charAt(0).toUpperCase() + t.slice(1);
        R["set" + e] = function (e) {
            return this.a.vjs_setProperty(t, e)
        }
    }

    function V(t) {
        R[t] = function () {
            return this.a.vjs_getProperty(t)
        }
    }

    function W(t) {
        return t.za = t.za || [], t.za
    }

    function X(t, e, i) {
        for (var n, o, s = t.za, u = 0, a = s.length; a > u; u++)n = s[u], n.id() === e ? (n.show(), o = n) : i && n.K() == i && 0 < n.mode() && n.disable();
        (e = o ? o.K() : i ? i : l) && t.j(e + "trackchange")
    }

    function Y(t) {
        0 === t.ha && t.load(), 0 === t.ga && (t.b.d("timeupdate", u.bind(t, t.update, t.Q)), t.b.d("ended", u.bind(t, t.reset, t.Q)), ("captions" === t.A || "subtitles" === t.A) && t.b.V.textTrackDisplay.Z(t))
    }

    function ga(t) {
        var e = t.split(":");
        t = 0;
        var i, n, o;
        return 3 == e.length ? (i = e[0], n = e[1], e = e[2]) : (i = 0, n = e[0], e = e[1]), e = e.split(/\s+/), e = e.splice(0, 1)[0], e = e.split(/\.|,/), o = parseFloat(e[1]), e = e[0], t += 3600 * parseFloat(i), t += 60 * parseFloat(n), t += parseFloat(e), o && (t += o / 1e3), t
    }

    function $(t, e) {
        var i = t.split("."), n = ha;
        !(i[0] in n) && n.execScript && n.execScript("var " + i[0]);
        for (var o; i.length && (o = i.shift());)i.length || e === b ? n = n[o] ? n[o] : n[o] = {} : n[o] = e
    }

    var b = void 0, f = !0, j = null, l = !1, t;
    document.createElement("video"), document.createElement("audio"), document.createElement("track");
    var v = u;
    window.Qd = window.Rd = u, u.Rb = "4.2", u.Bc = "https:" == document.location.protocol ? "https://" : "http://", u.options = {
        techOrder: ["html5", "flash"],
        html5: {},
        flash: {},
        width: 300,
        height: 150,
        defaultVolume: 0,
        children: {
            mediaLoader: {},
            posterImage: {},
            textTrackDisplay: {},
            loadingSpinner: {},
            bigPlayButton: {},
            controlBar: {}
        },
        notSupportedMessage: 'Sorry, no compatible source and playback technology were found for this video. Try using another browser like <a href="http://bit.ly/ccMUEC">Chrome</a> or download the latest <a href="http://adobe.ly/mwfN1">Adobe Flash Player</a>.'
    }, "GENERATED_CDN_VSN" !== u.Rb && (v.options.flash.swf = u.Bc + "vjs.zencdn.net/" + u.Rb + "/video-js.swf"), u.wa = {}, u.ka = u.CoreObject = m(), u.ka.extend = function (t) {
        var e, i;
        t = t || {}, e = t.init || t.i || this.prototype.init || this.prototype.i || m(), i = function () {
            e.apply(this, arguments)
        }, i.prototype = u.k.create(this.prototype), i.prototype.constructor = i, i.extend = u.ka.extend, i.create = u.ka.create;
        for (var n in t)t.hasOwnProperty(n) && (i.prototype[n] = t[n]);
        return i
    }, u.ka.create = function () {
        var t = u.k.create(this.prototype);
        return this.apply(t, arguments), t
    }, u.d = function (t, e, i) {
        var n = u.getData(t);
        n.z || (n.z = {}), n.z[e] || (n.z[e] = []), i.s || (i.s = u.s++), n.z[e].push(i), n.W || (n.disabled = l, n.W = function (e) {
            if (!n.disabled) {
                e = u.gc(e);
                var i = n.z[e.type];
                if (i)for (var i = i.slice(0), o = 0, s = i.length; s > o && !e.lc(); o++)i[o].call(t, e)
            }
        }), 1 == n.z[e].length && (document.addEventListener ? t.addEventListener(e, n.W, l) : document.attachEvent && t.attachEvent("on" + e, n.W))
    }, u.n = function (t, e, i) {
        if (u.kc(t)) {
            var n = u.getData(t);
            if (n.z)if (e) {
                var o = n.z[e];
                if (o) {
                    if (i) {
                        if (i.s)for (n = 0; n < o.length; n++)o[n].s === i.s && o.splice(n--, 1)
                    } else n.z[e] = [];
                    u.dc(t, e)
                }
            } else for (o in n.z)e = o, n.z[e] = [], u.dc(t, e)
        }
    }, u.dc = function (t, e) {
        var i = u.getData(t);
        0 === i.z[e].length && (delete i.z[e], document.removeEventListener ? t.removeEventListener(e, i.W, l) : document.detachEvent && t.detachEvent("on" + e, i.W)), u.Ab(i.z) && (delete i.z, delete i.W, delete i.disabled), u.Ab(i) && u.qc(t)
    }, u.gc = function (t) {
        function e() {
            return f
        }

        function i() {
            return l
        }

        if (!t || !t.Bb) {
            var n = t || window.event;
            t = {};
            for (var o in n)"layerX" !== o && "layerY" !== o && (t[o] = n[o]);
            if (t.target || (t.target = t.srcElement || document), t.relatedTarget = t.fromElement === t.target ? t.toElement : t.fromElement, t.preventDefault = function () {
                    n.preventDefault && n.preventDefault(), t.returnValue = l, t.zb = e
                }, t.zb = i, t.stopPropagation = function () {
                    n.stopPropagation && n.stopPropagation(), t.cancelBubble = f, t.Bb = e
                }, t.Bb = i, t.stopImmediatePropagation = function () {
                    n.stopImmediatePropagation && n.stopImmediatePropagation(), t.lc = e, t.stopPropagation()
                }, t.lc = i, t.clientX != j) {
                o = document.documentElement;
                var s = document.body;
                t.pageX = t.clientX + (o && o.scrollLeft || s && s.scrollLeft || 0) - (o && o.clientLeft || s && s.clientLeft || 0), t.pageY = t.clientY + (o && o.scrollTop || s && s.scrollTop || 0) - (o && o.clientTop || s && s.clientTop || 0)
            }
            t.which = t.charCode || t.keyCode, t.button != j && (t.button = 1 & t.button ? 0 : 4 & t.button ? 1 : 2 & t.button ? 2 : 0)
        }
        return t
    }, u.j = function (t, e) {
        var i = u.kc(t) ? u.getData(t) : {}, n = t.parentNode || t.ownerDocument;
        return "string" == typeof e && (e = {
            type: e,
            target: t
        }), e = u.gc(e), i.W && i.W.call(t, e), n && !e.Bb() && e.bubbles !== l ? u.j(n, e) : n || e.zb() || (i = u.getData(e.target), !e.target[e.type]) || (i.disabled = f, "function" == typeof e.target[e.type] && e.target[e.type](), i.disabled = l), !e.zb()
    }, u.U = function (t, e, i) {
        function n() {
            u.n(t, e, n), i.apply(this, arguments)
        }

        n.s = i.s = i.s || u.s++, u.d(t, e, n)
    };
    var w = Object.prototype.hasOwnProperty;
    u.e = function (t, e) {
        var i, n;
        i = document.createElement(t || "div");
        for (n in e)w.call(e, n) && (-1 !== n.indexOf("aria-") || "role" == n ? i.setAttribute(n, e[n]) : i[n] = e[n]);
        return i
    }, u.$ = function (t) {
        return t.charAt(0).toUpperCase() + t.slice(1)
    }, u.k = {}, u.k.create = Object.create || function (t) {
            function e() {
            }

            return e.prototype = t, new e
        }, u.k.ta = function (t, e, i) {
        for (var n in t)w.call(t, n) && e.call(i || this, n, t[n])
    }, u.k.B = function (t, e) {
        if (!e)return t;
        for (var i in e)w.call(e, i) && (t[i] = e[i]);
        return t
    }, u.k.fc = function (t, e) {
        var i, n, o;
        t = u.k.copy(t);
        for (i in e)w.call(e, i) && (n = t[i], o = e[i], t[i] = u.k.mc(n) && u.k.mc(o) ? u.k.fc(n, o) : e[i]);
        return t
    }, u.k.copy = function (t) {
        return u.k.B({}, t)
    }, u.k.mc = function (t) {
        return !!t && "object" == typeof t && "[object Object]" === t.toString() && t.constructor === Object
    }, u.bind = function (t, e, i) {
        function n() {
            return e.apply(t, arguments)
        }

        return e.s || (e.s = u.s++), n.s = i ? i + "_" + e.s : e.s, n
    }, u.qa = {}, u.s = 1, u.expando = "vdata" + (new Date).getTime(), u.getData = function (t) {
        var e = t[u.expando];
        return e || (e = t[u.expando] = u.s++, u.qa[e] = {}), u.qa[e]
    }, u.kc = function (t) {
        return t = t[u.expando], !(!t || u.Ab(u.qa[t]))
    }, u.qc = function (t) {
        var e = t[u.expando];
        if (e) {
            delete u.qa[e];
            try {
                delete t[u.expando]
            } catch (i) {
                t.removeAttribute ? t.removeAttribute(u.expando) : t[u.expando] = j
            }
        }
    }, u.Ab = function (t) {
        for (var e in t)if (t[e] !== j)return l;
        return f
    }, u.m = function (t, e) {
        -1 == (" " + t.className + " ").indexOf(" " + e + " ") && (t.className = "" === t.className ? e : t.className + " " + e)
    }, u.t = function (t, e) {
        var i, n;
        if (-1 != t.className.indexOf(e)) {
            for (i = t.className.split(" "), n = i.length - 1; n >= 0; n--)i[n] === e && i.splice(n, 1);
            t.className = i.join(" ")
        }
    }, u.ma = u.e("video"), u.G = navigator.userAgent, u.Hc = /iPhone/i.test(u.G), u.Gc = /iPad/i.test(u.G), u.Ic = /iPod/i.test(u.G), u.Fc = u.Hc || u.Gc || u.Ic;
    var aa = u, x, y = u.G.match(/OS (\d+)_/i);
    x = y && y[1] ? y[1] : b, aa.Cd = x, u.Dc = /Android/i.test(u.G);
    var ba = u, z, A = u.G.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i), B, C;
    A ? (B = A[1] && parseFloat(A[1]), C = A[2] && parseFloat(A[2]), z = B && C ? parseFloat(A[1] + "." + A[2]) : B ? B : j) : z = j, ba.Cc = z, u.Jc = u.Dc && /webkit/i.test(u.G) && 2.3 > u.Cc, u.Ec = /Firefox/i.test(u.G), u.Dd = /Chrome/i.test(u.G), u.Mc = "ontouchstart" in window, u.wb = function (t) {
        var e, i, n, o;
        if (e = {}, t && t.attributes && 0 < t.attributes.length) {
            i = t.attributes;
            for (var s = i.length - 1; s >= 0; s--)n = i[s].name, o = i[s].value, ("boolean" == typeof t[n] || -1 !== ",autoplay,controls,loop,muted,default,".indexOf("," + n + ",")) && (o = o !== j ? f : l), e[n] = o
        }
        return e
    }, u.Hd = function (t, e) {
        var i = "";
        return document.defaultView && document.defaultView.getComputedStyle ? i = document.defaultView.getComputedStyle(t, "").getPropertyValue(e) : t.currentStyle && (i = t["client" + e.substr(0, 1).toUpperCase() + e.substr(1)] + "px"), i
    }, u.yb = function (t, e) {
        e.firstChild ? e.insertBefore(t, e.firstChild) : e.appendChild(t)
    }, u.Nb = {}, u.v = function (t) {
        return 0 === t.indexOf("#") && (t = t.slice(1)), document.getElementById(t)
    }, u.Ka = function (t, e) {
        e = e || t;
        var i = Math.floor(t % 60), n = Math.floor(t / 60 % 60), o = Math.floor(t / 3600), s = Math.floor(e / 60 % 60), u = Math.floor(e / 3600);
        return (isNaN(t) || 1 / 0 === t) && (o = n = i = "-"), o = o > 0 || u > 0 ? o + ":" : "", o + (((o || s >= 10) && 10 > n ? "0" + n : n) + ":") + (10 > i ? "0" + i : i)
    }, u.Pc = function () {
        document.body.focus(), document.onselectstart = q(l)
    }, u.yd = function () {
        document.onselectstart = q(f)
    }, u.trim = function (t) {
        return (t + "").replace(/^\s+|\s+$/g, "")
    }, u.round = function (t, e) {
        return e || (e = 0), Math.round(t * Math.pow(10, e)) / Math.pow(10, e)
    }, u.sb = function (t, e) {
        return {
            length: 1, start: function () {
                return t
            }, end: function () {
                return e
            }
        }
    }, u.get = function (t, e, i) {
        var n, o;
        "undefined" == typeof XMLHttpRequest && (window.XMLHttpRequest = function () {
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP.6.0")
            } catch (t) {
            }
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP.3.0")
            } catch (e) {
            }
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP")
            } catch (i) {
            }
            throw Error("This browser does not support XMLHttpRequest.")
        }), o = new XMLHttpRequest;
        try {
            o.open("GET", t)
        } catch (s) {
            i(s)
        }
        n = 0 === t.indexOf("file:") || 0 === window.location.href.indexOf("file:") && -1 === t.indexOf("http"), o.onreadystatechange = function () {
            4 === o.readyState && (200 === o.status || n && 0 === o.status ? e(o.responseText) : i && i())
        };
        try {
            o.send()
        } catch (u) {
            i && i(u)
        }
    }, u.qd = function (t) {
        try {
            var e = window.localStorage || l;
            e && (e.volume = t)
        } catch (i) {
            22 == i.code || 1014 == i.code ? u.log("LocalStorage Full (VideoJS)", i) : 18 == i.code ? u.log("LocalStorage not allowed (VideoJS)", i) : u.log("LocalStorage Error (VideoJS)", i)
        }
    }, u.ic = function (t) {
        return t.match(/^https?:\/\//) || (t = u.e("div", {innerHTML: '<a href="' + t + '">x</a>'}).firstChild.href), t
    }, u.log = function () {
        u.log.history = u.log.history || [], u.log.history.push(arguments), window.console && window.console.log(Array.prototype.slice.call(arguments))
    }, u.Xc = function (t) {
        var e, i;
        return t.getBoundingClientRect && t.parentNode && (e = t.getBoundingClientRect()), e ? (t = document.documentElement, i = document.body, {
            left: e.left + (window.pageXOffset || i.scrollLeft) - (t.clientLeft || i.clientLeft || 0),
            top: e.top + (window.pageYOffset || i.scrollTop) - (t.clientTop || i.clientTop || 0)
        }) : {left: 0, top: 0}
    }, u.c = u.ka.extend({
        i: function (t, e, i) {
            if (this.b = t, this.g = u.k.copy(this.g), e = this.options(e), this.Q = e.id || (e.el && e.el.id ? e.el.id : t.id() + "_component_" + u.s++), this.cd = e.name || j, this.a = e.el || this.e(), this.H = [], this.pb = {}, this.V = {}, (t = this.g) && t.children) {
                var n = this;
                u.k.ta(t.children, function (t, e) {
                    e !== l && !e.loadEvent && (n[t] = n.Z(t, e))
                })
            }
            this.M(i)
        }
    }), t = u.c.prototype, t.D = function () {
        if (this.j("dispose"), this.H)for (var t = this.H.length - 1; t >= 0; t--)this.H[t].D && this.H[t].D();
        this.V = this.pb = this.H = j, this.n(), this.a.parentNode && this.a.parentNode.removeChild(this.a), u.qc(this.a), this.a = j
    }, t.L = p("b"), t.options = function (t) {
        return t === b ? this.g : this.g = u.k.fc(this.g, t)
    }, t.e = function (t, e) {
        return u.e(t, e)
    }, t.v = p("a"), t.id = p("Q"), t.name = p("cd"), t.children = p("H"), t.Z = function (t, e) {
        var i, n;
        return "string" == typeof t ? (n = t, e = e || {}, i = e.componentClass || u.$(n), e.name = n, i = new window.videojs[i](this.b || this, e)) : i = t, this.H.push(i), "function" == typeof i.id && (this.pb[i.id()] = i), (n = n || i.name && i.name()) && (this.V[n] = i), "function" == typeof i.el && i.el() && (this.ra || this.a).appendChild(i.el()), i
    }, t.removeChild = function (t) {
        if ("string" == typeof t && (t = this.V[t]), t && this.H) {
            for (var e = l, i = this.H.length - 1; i >= 0; i--)if (this.H[i] === t) {
                e = f, this.H.splice(i, 1);
                break
            }
            e && (this.pb[t.id] = j, this.V[t.name] = j, (e = t.v()) && e.parentNode === (this.ra || this.a) && (this.ra || this.a).removeChild(t.v()))
        }
    }, t.T = q(""), t.d = function (t, e) {
        return u.d(this.a, t, u.bind(this, e)), this
    }, t.n = function (t, e) {
        return u.n(this.a, t, e), this
    }, t.U = function (t, e) {
        return u.U(this.a, t, u.bind(this, e)), this
    }, t.j = function (t, e) {
        return u.j(this.a, t, e), this
    }, t.M = function (t) {
        return t && (this.aa ? t.call(this) : (this.Ra === b && (this.Ra = []), this.Ra.push(t))), this
    }, t.Ta = function () {
        this.aa = f;
        var t = this.Ra;
        if (t && 0 < t.length) {
            for (var e = 0, i = t.length; i > e; e++)t[e].call(this);
            this.Ra = [], this.j("ready")
        }
    }, t.m = function (t) {
        return u.m(this.a, t), this
    }, t.t = function (t) {
        return u.t(this.a, t), this
    }, t.show = function () {
        return this.a.style.display = "block", this
    }, t.C = function () {
        return this.a.style.display = "none", this
    }, t.disable = function () {
        this.C(), this.show = m()
    }, t.width = function (t, e) {
        return E(this, "width", t, e)
    }, t.height = function (t, e) {
        return E(this, "height", t, e)
    }, t.Tc = function (t, e) {
        return this.width(t, f).height(e)
    }, u.q = u.c.extend({
        i: function (t, e) {
            u.c.call(this, t, e);
            var i = l;
            this.d("touchstart", function (t) {
                t.preventDefault(), i = f
            }), this.d("touchmove", function () {
                i = l
            });
            var n = this;
            this.d("touchend", function (t) {
                i && n.p(t), t.preventDefault()
            }), this.d("click", this.p), this.d("focus", this.Na), this.d("blur", this.Ma)
        }
    }), t = u.q.prototype, t.e = function (t, e) {
        return e = u.k.B({
            className: this.T(),
            innerHTML: '<div class="vjs-control-content"><span class="vjs-control-text">' + (this.pa || "Need Text") + "</span></div>",
            nd: "button",
            "aria-live": "polite",
            tabIndex: 0
        }, e), u.c.prototype.e.call(this, t, e)
    }, t.T = function () {
        return "vjs-control " + u.c.prototype.T.call(this)
    }, t.p = m(), t.Na = function () {
        u.d(document, "keyup", u.bind(this, this.ba))
    }, t.ba = function (t) {
        (32 == t.which || 13 == t.which) && (t.preventDefault(), this.p())
    }, t.Ma = function () {
        u.n(document, "keyup", u.bind(this, this.ba))
    }, u.O = u.c.extend({
        i: function (t, e) {
            u.c.call(this, t, e), this.Oc = this.V[this.g.barName], this.handle = this.V[this.g.handleName], t.d(this.oc, u.bind(this, this.update)), this.d("mousedown", this.Oa), this.d("touchstart", this.Oa), this.d("focus", this.Na), this.d("blur", this.Ma), this.d("click", this.p), this.b.d("controlsvisible", u.bind(this, this.update)), t.M(u.bind(this, this.update)), this.P = {}
        }
    }), t = u.O.prototype, t.e = function (t, e) {
        return e = e || {}, e.className += " vjs-slider", e = u.k.B({
            nd: "slider",
            "aria-valuenow": 0,
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            tabIndex: 0
        }, e), u.c.prototype.e.call(this, t, e)
    }, t.Oa = function (t) {
        t.preventDefault(), u.Pc(), this.P.move = u.bind(this, this.Gb), this.P.end = u.bind(this, this.Hb), u.d(document, "mousemove", this.P.move), u.d(document, "mouseup", this.P.end), u.d(document, "touchmove", this.P.move), u.d(document, "touchend", this.P.end), this.Gb(t)
    }, t.Hb = function () {
        u.yd(), u.n(document, "mousemove", this.P.move, l), u.n(document, "mouseup", this.P.end, l), u.n(document, "touchmove", this.P.move, l), u.n(document, "touchend", this.P.end, l), this.update()
    }, t.update = function () {
        if (this.a) {
            var t, e = this.xb(), i = this.handle, n = this.Oc;
            if (isNaN(e) && (e = 0), t = e, i) {
                t = this.a.offsetWidth;
                var o = i.v().offsetWidth;
                t = o ? o / t : 0, e *= 1 - t, t = e + t / 2, i.v().style.left = u.round(100 * e, 2) + "%"
            }
            n.v().style.width = u.round(100 * t, 2) + "%"
        }
    }, t.Na = function () {
        u.d(document, "keyup", u.bind(this, this.ba))
    }, t.ba = function (t) {
        37 == t.which ? (t.preventDefault(), this.uc()) : 39 == t.which && (t.preventDefault(), this.vc())
    }, t.Ma = function () {
        u.n(document, "keyup", u.bind(this, this.ba))
    }, t.p = function (t) {
        t.stopImmediatePropagation(), t.preventDefault()
    }, u.ea = u.c.extend(), u.ea.prototype.defaultValue = 0, u.ea.prototype.e = function (t, e) {
        return e = e || {}, e.className += " vjs-slider-handle", e = u.k.B({innerHTML: '<span class="vjs-control-text">' + this.defaultValue + "</span>"}, e), u.c.prototype.e.call(this, "div", e)
    }, u.la = u.c.extend(), u.la.prototype.e = function () {
        var t = this.options().Rc || "ul";
        return this.ra = u.e(t, {className: "vjs-menu-content"}), t = u.c.prototype.e.call(this, "div", {
            append: this.ra,
            className: "vjs-menu"
        }), t.appendChild(this.ra), u.d(t, "click", function (t) {
            t.preventDefault(), t.stopImmediatePropagation()
        }), t
    }, u.N = u.q.extend({
        i: function (t, e) {
            u.q.call(this, t, e), this.selected(e.selected)
        }
    }), u.N.prototype.e = function (t, e) {
        return u.q.prototype.e.call(this, "li", u.k.B({className: "vjs-menu-item", innerHTML: this.g.label}, e))
    }, u.N.prototype.p = function () {
        this.selected(f)
    }, u.N.prototype.selected = function (t) {
        t ? (this.m("vjs-selected"), this.a.setAttribute("aria-selected", f)) : (this.t("vjs-selected"), this.a.setAttribute("aria-selected", l))
    }, u.R = u.q.extend({
        i: function (t, e) {
            u.q.call(this, t, e), this.va = this.Ja(), this.Z(this.va), this.J && 0 === this.J.length && this.C(), this.d("keyup", this.ba), this.a.setAttribute("aria-haspopup", f), this.a.setAttribute("role", "button")
        }
    }), t = u.R.prototype, t.oa = l, t.Ja = function () {
        var t = new u.la(this.b);
        if (this.options().title && t.v().appendChild(u.e("li", {
                className: "vjs-menu-title",
                innerHTML: u.$(this.A),
                wd: -1
            })), this.J = this.createItems())for (var e = 0; e < this.J.length; e++)ca(t, this.J[e]);
        return t
    }, t.sa = m(), t.T = function () {
        return this.className + " vjs-menu-button " + u.q.prototype.T.call(this)
    }, t.Na = m(), t.Ma = m(), t.p = function () {
        this.U("mouseout", u.bind(this, function () {
            D(this.va), this.a.blur()
        })), this.oa ? G(this) : H(this)
    }, t.ba = function (t) {
        t.preventDefault(), 32 == t.which || 13 == t.which ? this.oa ? G(this) : H(this) : 27 == t.which && this.oa && G(this)
    }, u.w = u.c.extend({
        i: function (t, e, i) {
            this.F = t, e = u.k.B(da(t), e), this.u = {}, this.pc = e.poster || "http://s1.jikexueyuan.com/common/images/play_bg_v4_6fe6f30.jpg", this.rb = e.controls, t.controls = l, u.c.call(this, this, e, i), this.m(this.controls() ? "vjs-controls-enabled" : "vjs-controls-disabled"), this.U("play", function (t) {
                u.j(this.a, {
                    type: "firstplay",
                    target: this.a
                }) || (t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation())
            }), this.d("ended", this.ed), this.d("play", this.Jb), this.d("firstplay", this.fd), this.d("pause", this.Ib), this.d("progress", this.hd), this.d("durationchange", this.dd), this.d("error", this.Fb), this.d("fullscreenchange", this.gd), u.wa[this.Q] = this, e.plugins && u.k.ta(e.plugins, function (t, e) {
                this[t](e)
            }, this);
            var n, o, s, a;
            n = this.rc, t = function () {
                n(), clearInterval(o), o = setInterval(u.bind(this, n), 250)
            }, e = function () {
                n(), clearInterval(o)
            }, this.d("mousedown", t), this.d("mousemove", n), this.d("mouseup", e), this.d("keydown", n), this.d("keyup", n), this.d("touchstart", t), this.d("touchmove", n), this.d("touchend", e), this.d("touchcancel", e), s = setInterval(u.bind(this, function () {
                this.ja && (this.ja = l, I(this, f), clearTimeout(a), a = setTimeout(u.bind(this, function () {
                    this.ja || I(this, l)
                }), 2e3))
            }), 250), this.d("dispose", function () {
                clearInterval(s), clearTimeout(a)
            })
        }
    }), t = u.w.prototype, t.g = u.options, t.D = function () {
        this.j("dispose"), this.n("dispose"), u.wa[this.Q] = j, this.F && this.F.player && (this.F.player = j), this.a && this.a.player && (this.a.player = j), clearInterval(this.Qa), this.ya(), this.h && this.h.D(), u.c.prototype.D.call(this)
    }, t.e = function () {
        var t = this.a = u.c.prototype.e.call(this, "div"), e = this.F;
        if (e.removeAttribute("width"), e.removeAttribute("height"), e.hasChildNodes()) {
            var i, n, o, s, a;
            for (i = e.childNodes, n = i.length, a = []; n--;)o = i[n], s = o.nodeName.toLowerCase(), ("source" === s || "track" === s) && a.push(o);
            for (i = 0; i < a.length; i++)e.removeChild(a[i])
        }
        return e.id = e.id || "vjs_video_" + u.s++, t.id = e.id, t.className = e.className, e.id += "_html5_api", e.className = "vjs-tech", e.player = t.player = this, this.m("vjs-paused"), this.width(this.g.width, f), this.height(this.g.height, f), e.parentNode && e.parentNode.insertBefore(t, e), u.yb(e, t), t
    }, t.yc = function () {
        this.ec && this.ya(), this.ec = setInterval(u.bind(this, function () {
            this.j("timeupdate")
        }), 250)
    }, t.ya = function () {
        clearInterval(this.ec)
    }, t.ed = function () {
        this.g.loop && (this.currentTime(0), this.play())
    }, t.Jb = function () {
        u.t(this.a, "vjs-paused"), u.m(this.a, "vjs-playing")
    }, t.fd = function () {
        this.g.starttime && this.currentTime(this.g.starttime), this.m("vjs-has-started")
    }, t.Ib = function () {
        u.t(this.a, "vjs-playing"), u.m(this.a, "vjs-paused")
    }, t.hd = function () {
        1 == this.Ia() && this.j("loadedalldata")
    }, t.dd = function () {
        this.duration(L(this, "duration"))
    }, t.Fb = function (t) {
        u.log("Video Error", t)
    }, t.gd = function () {
        this.I ? this.m("vjs-fullscreen") : this.t("vjs-fullscreen")
    },t.play = function () {
        return M(this, "play"), this
    },t.pause = function () {
        return M(this, "pause"), this
    },t.paused = function () {
        return L(this, "paused") === l ? l : f
    },t.currentTime = function (t) {
        return t !== b ? (this.u.nc = t, M(this, "setCurrentTime", t), this.Eb && this.j("timeupdate"), this) : this.u.currentTime = L(this, "currentTime") || 0
    },t.duration = function (t) {
        return t !== b ? (this.u.duration = parseFloat(t), this) : this.u.duration
    },t.buffered = function () {
        var t = L(this, "buffered"), e = t.length - 1, i = this.u.kb = this.u.kb || 0;
        return t && e >= 0 && t.end(e) !== i && (i = t.end(e), this.u.kb = i), u.sb(0, i)
    },t.Ia = function () {
        return this.duration() ? this.buffered().end(0) / this.duration() : 0
    },t.volume = function (t) {
        return t !== b ? (t = Math.max(0, Math.min(1, parseFloat(t))), this.u.volume = t, M(this, "setVolume", t), u.qd(t), this) : (t = parseFloat(L(this, "volume")), isNaN(t) ? 1 : t)
    },t.muted = function (t) {
        return t !== b ? (M(this, "setMuted", t), this) : L(this, "muted") || l
    },t.Sa = function () {
        return L(this, "supportsFullScreen") || l
    },t.xa = function () {
        var t = u.Nb.xa;
        return this.I = f, t ? (u.d(document, t.ub, u.bind(this, function () {
            this.I = document[t.I], this.I === l && u.n(document, t.ub, arguments.callee), this.j("fullscreenchange")
        })), this.a[t.sc]()) : this.h.Sa() ? M(this, "enterFullScreen") : (this.Zc = f, this.Uc = document.documentElement.style.overflow, u.d(document, "keydown", u.bind(this, this.hc)), document.documentElement.style.overflow = "hidden", u.m(document.body, "vjs-full-window"), this.j("enterFullWindow"), this.j("fullscreenchange")), this
    },t.nb = function () {
        var t = u.Nb.xa;
        return this.I = l, t ? document[t.mb]() : this.h.Sa() ? M(this, "exitFullScreen") : (N(this), this.j("fullscreenchange")), this
    },t.hc = function (t) {
        27 === t.keyCode && (this.I === f ? this.nb() : N(this))
    },t.src = function (t) {
        if (t instanceof Array) {
            var e;
            t:{
                e = t;
                for (var i = 0, n = this.g.techOrder; i < n.length; i++) {
                    var o = u.$(n[i]), s = window.videojs[o];
                    if (s.isSupported())for (var a = 0, r = e; a < r.length; a++) {
                        var c = r[a];
                        if (s.canPlaySource(c)) {
                            e = {source: c, h: o};
                            break t
                        }
                    }
                }
                e = l
            }
            e ? (t = e.source, e = e.h, e == this.ia ? this.src(t) : J(this, e, t)) : this.a.appendChild(u.e("p", {innerHTML: this.options().notSupportedMessage}))
        } else t instanceof Object ? this.src(window.videojs[this.ia].canPlaySource(t) ? t.src : [t]) : (this.u.src = t, this.aa ? (M(this, "src", t), "auto" == this.g.preload && this.load(), this.g.autoplay && this.play()) : this.M(function () {
            this.src(t)
        }));
        return this
    },t.load = function () {
        return M(this, "load"), this
    },t.currentSrc = function () {
        return L(this, "currentSrc") || this.u.src || ""
    },t.Pa = function (t) {
        return t !== b ? (M(this, "setPreload", t), this.g.preload = t, this) : L(this, "preload")
    },t.autoplay = function (t) {
        return t !== b ? (M(this, "setAutoplay", t), this.g.autoplay = t, this) : L(this, "autoplay")
    },t.loop = function (t) {
        return t !== b ? (M(this, "setLoop", t), this.g.loop = t, this) : L(this, "loop")
    },t.poster = function (t) {
        return t !== b && (this.pc = t), this.pc
    },t.controls = function (t) {
        return t !== b ? (t = !!t, this.rb !== t && ((this.rb = t) ? (this.t("vjs-controls-disabled"), this.m("vjs-controls-enabled"), this.j("controlsenabled")) : (this.t("vjs-controls-enabled"), this.m("vjs-controls-disabled"), this.j("controlsdisabled"))), this) : this.rb
    },u.w.prototype.Qb,t = u.w.prototype,t.Pb = function (t) {
        return t !== b ? (t = !!t, this.Qb !== t && ((this.Qb = t) ? (this.m("vjs-using-native-controls"), this.j("usingnativecontrols")) : (this.t("vjs-using-native-controls"), this.j("usingcustomcontrols"))), this) : this.Qb
    },t.error = function () {
        return L(this, "error")
    },t.seeking = function () {
        return L(this, "seeking")
    },t.ja = f,t.rc = function () {
        this.ja = f
    },t.Ob = f;
    var O, P, Q;
    Q = document.createElement("div"), P = {}, Q.Ed !== b ? (P.sc = "requestFullscreen", P.mb = "exitFullscreen", P.ub = "fullscreenchange", P.I = "fullScreen") : (document.mozCancelFullScreen ? (O = "moz", P.I = O + "FullScreen") : (O = "webkit", P.I = O + "IsFullScreen"), Q[O + "RequestFullScreen"] && (P.sc = O + "RequestFullScreen", P.mb = O + "CancelFullScreen"), P.ub = O + "fullscreenchange"), document[P.mb] && (u.Nb.xa = P), u.Ea = u.c.extend(), u.Ea.prototype.g = {
        Jd: "play",
        children: {
            playToggle: {},
            currentTimeDisplay: {},
            timeDivider: {},
            durationDisplay: {},
            remainingTimeDisplay: {},
            progressControl: {},
            fullscreenToggle: {},
            volumeControl: {},
            muteToggle: {}
        }
    }, u.Ea.prototype.e = function () {
        return u.e("div", {className: "vjs-control-bar"})
    }, u.Wb = u.q.extend({
        i: function (t, e) {
            u.q.call(this, t, e), t.d("play", u.bind(this, this.Jb)), t.d("pause", u.bind(this, this.Ib))
        }
    }), t = u.Wb.prototype, t.pa = "Play", t.T = function () {
        return "vjs-play-control " + u.q.prototype.T.call(this)
    }, t.p = function () {
        this.b.paused() ? this.b.play() : this.b.pause()
    }, t.Jb = function () {
        u.t(this.a, "vjs-paused"), u.m(this.a, "vjs-playing"), this.a.children[0].children[0].innerHTML = "Pause"
    }, t.Ib = function () {
        u.t(this.a, "vjs-playing"), u.m(this.a, "vjs-paused"), this.a.children[0].children[0].innerHTML = "Play"
    }, u.Xa = u.c.extend({
        i: function (t, e) {
            u.c.call(this, t, e), t.d("timeupdate", u.bind(this, this.Ba))
        }
    }), u.Xa.prototype.e = function () {
        var t = u.c.prototype.e.call(this, "div", {className: "vjs-current-time vjs-time-controls vjs-control"});
        return this.content = u.e("div", {
            className: "vjs-current-time-display",
            innerHTML: '<span class="vjs-control-text">Current Time </span>0:00',
            "aria-live": "off"
        }), t.appendChild(u.e("div").appendChild(this.content)), t
    }, u.Xa.prototype.Ba = function () {
        var t = this.b.Lb ? this.b.u.currentTime : this.b.currentTime();
        this.content.innerHTML = '<span class="vjs-control-text">Current Time </span>' + u.Ka(t, this.b.duration())
    }, u.Ya = u.c.extend({
        i: function (t, e) {
            u.c.call(this, t, e), t.d("timeupdate", u.bind(this, this.Ba))
        }
    }), u.Ya.prototype.e = function () {
        var t = u.c.prototype.e.call(this, "div", {className: "vjs-duration vjs-time-controls vjs-control"});
        return this.content = u.e("div", {
            className: "vjs-duration-display",
            innerHTML: '<span class="vjs-control-text">Duration Time </span>0:00',
            "aria-live": "off"
        }), t.appendChild(u.e("div").appendChild(this.content)), t
    }, u.Ya.prototype.Ba = function () {
        var t = this.b.duration();
        t && (this.content.innerHTML = '<span class="vjs-control-text">Duration Time </span>' + u.Ka(t))
    }, u.$b = u.c.extend({
        i: function (t, e) {
            u.c.call(this, t, e)
        }
    }), u.$b.prototype.e = function () {
        return u.c.prototype.e.call(this, "div", {
            className: "vjs-time-divider",
            innerHTML: "<div><span>/</span></div>"
        })
    }, u.eb = u.c.extend({
        i: function (t, e) {
            u.c.call(this, t, e), t.d("timeupdate", u.bind(this, this.Ba))
        }
    }), u.eb.prototype.e = function () {
        var t = u.c.prototype.e.call(this, "div", {className: "vjs-remaining-time vjs-time-controls vjs-control"});
        return this.content = u.e("div", {
            className: "vjs-remaining-time-display",
            innerHTML: '<span class="vjs-control-text">Remaining Time </span>-0:00',
            "aria-live": "off"
        }), t.appendChild(u.e("div").appendChild(this.content)), t
    }, u.eb.prototype.Ba = function () {
        this.b.duration() && (this.content.innerHTML = '<span class="vjs-control-text">Remaining Time </span>-' + u.Ka(this.b.duration() - this.b.currentTime()))
    }, u.Fa = u.q.extend({
        i: function (t, e) {
            u.q.call(this, t, e)
        }
    }), u.Fa.prototype.pa = "Fullscreen", u.Fa.prototype.T = function () {
        return "vjs-fullscreen-control " + u.q.prototype.T.call(this)
    }, u.Fa.prototype.p = function () {
        this.b.I ? (this.b.nb(), this.a.children[0].children[0].innerHTML = "Fullscreen") : (this.b.xa(), this.a.children[0].children[0].innerHTML = "Non-Fullscreen")
    }, u.cb = u.c.extend({
        i: function (t, e) {
            u.c.call(this, t, e)
        }
    }), u.cb.prototype.g = {children: {seekBar: {}}}, u.cb.prototype.e = function () {
        return u.c.prototype.e.call(this, "div", {className: "vjs-progress-control vjs-control"})
    }, u.Xb = u.O.extend({
        i: function (t, e) {
            u.O.call(this, t, e), t.d("timeupdate", u.bind(this, this.Aa)), t.M(u.bind(this, this.Aa))
        }
    }), t = u.Xb.prototype, t.g = {
        children: {loadProgressBar: {}, playProgressBar: {}, seekHandle: {}},
        barName: "playProgressBar",
        handleName: "seekHandle"
    }, t.oc = "timeupdate", t.e = function () {
        return u.O.prototype.e.call(this, "div", {className: "vjs-progress-holder", "aria-label": "video progress bar"})
    }, t.Aa = function () {
        var t = this.b.Lb ? this.b.u.currentTime : this.b.currentTime();
        this.a.setAttribute("aria-valuenow", u.round(100 * this.xb(), 2)), this.a.setAttribute("aria-valuetext", u.Ka(t, this.b.duration()))
    }, t.xb = function () {
        var t;
        return "Flash" === this.b.ia && this.b.seeking() ? (t = this.b.u, t = t.nc ? t.nc : this.b.currentTime()) : t = this.b.currentTime(), t / this.b.duration()
    }, t.Oa = function (t) {
        u.O.prototype.Oa.call(this, t), this.b.Lb = f, this.Ad = !this.b.paused(), this.b.pause()
    }, t.Gb = function (t) {
        t = F(this, t) * this.b.duration(), t == this.b.duration() && (t -= .1), this.b.currentTime(t)
    }, t.Hb = function (t) {
        u.O.prototype.Hb.call(this, t), this.b.Lb = l, this.Ad && this.b.play()
    }, t.vc = function () {
        this.b.currentTime(this.b.currentTime() + 5)
    }, t.uc = function () {
        this.b.currentTime(this.b.currentTime() - 5)
    }, u.$a = u.c.extend({
        i: function (t, e) {
            u.c.call(this, t, e), t.d("progress", u.bind(this, this.update))
        }
    }), u.$a.prototype.e = function () {
        return u.c.prototype.e.call(this, "div", {
            className: "vjs-load-progress",
            innerHTML: '<span class="vjs-control-text">Loaded: 0%</span>'
        })
    }, u.$a.prototype.update = function () {
        this.a.style && (this.a.style.width = u.round(100 * this.b.Ia(), 2) + "%")
    }, u.Vb = u.c.extend({
        i: function (t, e) {
            u.c.call(this, t, e)
        }
    }), u.Vb.prototype.e = function () {
        return u.c.prototype.e.call(this, "div", {
            className: "vjs-play-progress",
            innerHTML: '<span class="vjs-control-text">Progress: 0%</span>'
        })
    }, u.fb = u.ea.extend(), u.fb.prototype.defaultValue = "00:00", u.fb.prototype.e = function () {
        return u.ea.prototype.e.call(this, "div", {className: "vjs-seek-handle"})
    }, u.hb = u.c.extend({
        i: function (t, e) {
            u.c.call(this, t, e), t.h && t.h.l && t.h.l.volumeControl === l && this.m("vjs-hidden"), t.d("loadstart", u.bind(this, function () {
                t.h.l && t.h.l.volumeControl === l ? this.m("vjs-hidden") : this.t("vjs-hidden")
            }))
        }
    }), u.hb.prototype.g = {children: {volumeBar: {}}}, u.hb.prototype.e = function () {
        return u.c.prototype.e.call(this, "div", {className: "vjs-volume-control vjs-control"})
    }, u.gb = u.O.extend({
        i: function (t, e) {
            u.O.call(this, t, e), t.d("volumechange", u.bind(this, this.Aa)), t.M(u.bind(this, this.Aa)), setTimeout(u.bind(this, this.update), 0)
        }
    }), t = u.gb.prototype, t.Aa = function () {
        this.a.setAttribute("aria-valuenow", u.round(100 * this.b.volume(), 2)), this.a.setAttribute("aria-valuetext", u.round(100 * this.b.volume(), 2) + "%")
    }, t.g = {
        children: {volumeLevel: {}, volumeHandle: {}},
        barName: "volumeLevel",
        handleName: "volumeHandle"
    }, t.oc = "volumechange", t.e = function () {
        return u.O.prototype.e.call(this, "div", {className: "vjs-volume-bar", "aria-label": "volume level"})
    }, t.Gb = function (t) {
        this.b.volume(F(this, t))
    }, t.xb = function () {
        return this.b.muted() ? 0 : this.b.volume()
    }, t.vc = function () {
        this.b.volume(this.b.volume() + .1)
    }, t.uc = function () {
        this.b.volume(this.b.volume() - .1)
    }, u.ac = u.c.extend({
        i: function (t, e) {
            u.c.call(this, t, e)
        }
    }), u.ac.prototype.e = function () {
        return u.c.prototype.e.call(this, "div", {
            className: "vjs-volume-level",
            innerHTML: '<span class="vjs-control-text"></span>'
        })
    }, u.ib = u.ea.extend(), u.ib.prototype.defaultValue = "00:00", u.ib.prototype.e = function () {
        return u.ea.prototype.e.call(this, "div", {className: "vjs-volume-handle"})
    }, u.da = u.q.extend({
        i: function (t, e) {
            u.q.call(this, t, e), t.d("volumechange", u.bind(this, this.update)), t.h && t.h.l && t.h.l.volumeControl === l && this.m("vjs-hidden"), t.d("loadstart", u.bind(this, function () {
                t.h.l && t.h.l.volumeControl === l ? this.m("vjs-hidden") : this.t("vjs-hidden")
            }))
        }
    }), u.da.prototype.e = function () {
        return u.q.prototype.e.call(this, "div", {
            className: "vjs-mute-control vjs-control",
            innerHTML: '<div><span class="vjs-control-text">Mute</span></div>'
        })
    }, u.da.prototype.p = function () {
        this.b.muted(this.b.muted() ? l : f)
    }, u.da.prototype.update = function () {
        var t = this.b.volume(), e = 3;
        for (0 === t || this.b.muted() ? e = 0 : .33 > t ? e = 1 : .67 > t && (e = 2), this.b.muted() ? "Unmute" != this.a.children[0].children[0].innerHTML && (this.a.children[0].children[0].innerHTML = "Unmute") : "Mute" != this.a.children[0].children[0].innerHTML && (this.a.children[0].children[0].innerHTML = "Mute"), t = 0; 4 > t; t++)u.t(this.a, "vjs-vol-" + t);
        u.m(this.a, "vjs-vol-" + e)
    }, u.na = u.R.extend({
        i: function (t, e) {
            u.R.call(this, t, e), t.d("volumechange", u.bind(this, this.update)), t.h && t.h.l && t.h.l.zc === l && this.m("vjs-hidden"), t.d("loadstart", u.bind(this, function () {
                t.h.l && t.h.l.zc === l ? this.m("vjs-hidden") : this.t("vjs-hidden")
            })), this.m("vjs-menu-button")
        }
    }), u.na.prototype.Ja = function () {
        var t = new u.la(this.b, {Rc: "div"}), e = new u.gb(this.b, u.k.B({zd: f}, this.g.Sd));
        return t.Z(e), t
    }, u.na.prototype.p = function () {
        u.da.prototype.p.call(this), u.R.prototype.p.call(this)
    }, u.na.prototype.e = function () {
        return u.q.prototype.e.call(this, "div", {
            className: "vjs-volume-menu-button vjs-menu-button vjs-control",
            innerHTML: '<div><span class="vjs-control-text">Mute</span></div>'
        })
    }, u.na.prototype.update = u.da.prototype.update, u.bb = u.q.extend({
        i: function (t, e) {
            u.q.call(this, t, e), (!t.poster() || !t.controls()) && this.C(), t.d("play", u.bind(this, this.C))
        }
    }), u.bb.prototype.e = function () {
        var t = u.e("div", {className: "vjs-poster", tabIndex: -1}), e = this.b.poster();
        return e && ("backgroundSize" in t.style ? t.style.backgroundImage = 'url("' + e + '")' : t.appendChild(u.e("img", {src: e}))), t
    }, u.bb.prototype.p = function () {
        this.L().controls() && this.b.play()
    }, u.Ub = u.c.extend({
        i: function (t, e) {
            u.c.call(this, t, e), t.d("canplay", u.bind(this, this.C)), t.d("canplaythrough", u.bind(this, this.C)), t.d("playing", u.bind(this, this.C)), t.d("seeked", u.bind(this, this.C)), t.d("seeking", u.bind(this, this.show)), t.d("seeked", u.bind(this, this.C)), t.d("error", u.bind(this, this.show)), t.d("waiting", u.bind(this, this.show))
        }
    }), u.Ub.prototype.e = function () {
        return u.c.prototype.e.call(this, "div", {className: "vjs-loading-spinner"})
    }, u.Va = u.q.extend(), u.Va.prototype.e = function () {
        return u.q.prototype.e.call(this, "div", {
            className: "vjs-big-play-button",
            innerHTML: "<span></span>",
            "aria-label": "play video"
        })
    }, u.Va.prototype.p = function () {
        this.b.play()
    }, u.r = u.c.extend({
        i: function (t, e, i) {
            u.c.call(this, t, e, i);
            var n, o;
            o = this, n = this.L(), t = function () {
                if (n.controls() && !n.Pb()) {
                    var t, e;
                    o.d("mousedown", o.p), o.d("touchstart", function (t) {
                        t.preventDefault(), t.stopPropagation(), e = I(this.b)
                    }), t = function (t) {
                        t.stopPropagation(), e && this.b.rc()
                    }, o.d("touchmove", t), o.d("touchleave", t), o.d("touchcancel", t), o.d("touchend", t);
                    var i, s, u;
                    i = 0, o.d("touchstart", function () {
                        i = (new Date).getTime(), u = f
                    }), t = function () {
                        u = l
                    }, o.d("touchmove", t), o.d("touchleave", t), o.d("touchcancel", t), o.d("touchend", function () {
                        u === f && (s = (new Date).getTime() - i, 250 > s && this.j("tap"))
                    }), o.d("tap", o.jd)
                }
            }, e = u.bind(o, o.md), this.M(t), n.d("controlsenabled", t), n.d("controlsdisabled", e)
        }
    }), u.r.prototype.md = function () {
        this.n("tap"), this.n("touchstart"), this.n("touchmove"), this.n("touchleave"), this.n("touchcancel"), this.n("touchend"), this.n("click"), this.n("mousedown")
    }, u.r.prototype.p = function (t) {
        0 === t.button && this.L().controls() && (this.L().paused() ? this.L().play() : this.L().pause())
    }, u.r.prototype.jd = function () {
        I(this.L(), !I(this.L()))
    }, u.r.prototype.l = {
        volumeControl: f,
        fullscreenResize: l,
        progressEvents: l,
        timeupdateEvents: l
    }, u.media = {}, u.media.Ua = "play pause paused currentTime setCurrentTime duration buffered volume setVolume muted setMuted width height supportsFullScreen enterFullScreen src load currentSrc preload setPreload autoplay setAutoplay loop setLoop error networkState readyState seeking initialTime startOffsetTime played seekable ended videoTracks audioTracks videoWidth videoHeight textTracks defaultPlaybackRate playbackRate mediaGroup controller controls defaultMuted".split(" ");
    for (var i = u.media.Ua.length - 1; i >= 0; i--)u.r.prototype[u.media.Ua[i]] = ea();
    u.o = u.r.extend({
        i: function (t, e, i) {
            if (this.l.volumeControl = u.o.Qc(), this.l.movingMediaElementInDOM = !u.Fc, this.l.fullscreenResize = f, u.r.call(this, t, e, i), (e = e.source) && this.a.currentSrc == e.src ? t.j("loadstart") : e && (this.a.src = e.src), u.Mc && t.options().nativeControlsForTouch !== l) {
                var n, o, s, a;
                n = this, o = this.L(), e = o.controls(), n.a.controls = !!e, s = function () {
                    n.a.controls = f
                }, a = function () {
                    n.a.controls = l
                }, o.d("controlsenabled", s), o.d("controlsdisabled", a), e = function () {
                    o.n("controlsenabled", s), o.n("controlsdisabled", a)
                }, n.d("dispose", e), o.d("usingcustomcontrols", e), o.Pb(f)
            }
            for (t.M(function () {
                this.F && this.g.autoplay && this.paused() && (delete this.F.poster, this.play())
            }), t = u.o.Za.length - 1; t >= 0; t--)u.d(this.a, u.o.Za[t], u.bind(this.b, this.Wc));
            this.Ta()
        }
    }), t = u.o.prototype, t.D = function () {
        u.r.prototype.D.call(this)
    }, t.e = function () {
        var t = this.b, e = t.F;
        e && this.l.movingMediaElementInDOM !== l || (e ? (e.player = j, t.F = j, t.v().removeChild(e), e = e.cloneNode(l)) : e = u.e("video", {
            id: t.id() + "_html5_api",
            className: "vjs-tech"
        }), e.player = t, u.yb(e, t.v()));
        for (var i = ["autoplay", "preload", "loop", "muted"], n = i.length - 1; n >= 0; n--) {
            var o = i[n];
            t.g[o] !== j && (e[o] = t.g[o])
        }
        return e
    }, t.Wc = function (t) {
        this.j(t), t.stopPropagation()
    }, t.play = function () {
        this.a.play()
    }, t.pause = function () {
        this.a.pause()
    }, t.paused = function () {
        return this.a.paused
    }, t.currentTime = function () {
        return this.a.currentTime
    }, t.pd = function (t) {
        try {
            this.a.currentTime = t
        } catch (e) {
            u.log(e, "Video is not ready. (Video.js)")
        }
    }, t.duration = function () {
        return this.a.duration || 0
    }, t.buffered = function () {
        return this.a.buffered
    }, t.volume = function () {
        return this.a.volume
    }, t.ud = function (t) {
        this.a.volume = t
    }, t.muted = function () {
        return this.a.muted
    }, t.sd = function (t) {
        this.a.muted = t
    }, t.width = function () {
        return this.a.offsetWidth
    }, t.height = function () {
        return this.a.offsetHeight
    }, t.Sa = function () {
        return "function" != typeof this.a.webkitEnterFullScreen || !/Android/.test(u.G) && /Chrome|Mac OS X 10.5/.test(u.G) ? l : f
    }, t.src = function (t) {
        this.a.src = t
    }, t.load = function () {
        this.a.load()
    }, t.currentSrc = function () {
        return this.a.currentSrc
    }, t.Pa = function () {
        return this.a.Pa
    }, t.td = function (t) {
        this.a.Pa = t
    }, t.autoplay = function () {
        return this.a.autoplay
    }, t.od = function (t) {
        this.a.autoplay = t
    }, t.controls = function () {
        return this.a.controls
    }, t.loop = function () {
        return this.a.loop
    }, t.rd = function (t) {
        this.a.loop = t
    }, t.error = function () {
        return this.a.error
    }, t.seeking = function () {
        return this.a.seeking
    }, u.o.isSupported = function () {
        return !!u.ma.canPlayType
    }, u.o.lb = function (t) {
        try {
            return !!u.ma.canPlayType(t.type)
        } catch (e) {
            return ""
        }
    }, u.o.Qc = function () {
        var t = u.ma.volume;
        return u.ma.volume = t / 2 + .1, t !== u.ma.volume
    }, u.o.Za = "loadstart suspend abort error emptied stalled loadedmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate progress play pause ratechange volumechange".split(" "), u.Jc && (document.createElement("video").constructor.prototype.canPlayType = function (t) {
        return t && -1 != t.toLowerCase().indexOf("video/mp4") ? "maybe" : ""
    }), u.f = u.r.extend({
        i: function (t, e, i) {
            u.r.call(this, t, e, i);
            var n = e.source;
            i = e.parentEl;
            var o = this.a = u.e("div", {id: t.id() + "_temp_flash"}), s = t.id() + "_flash_api";
            t = t.g;
            var a = u.k.B({
                readyFunction: "videojs.Flash.onReady",
                eventProxyFunction: "videojs.Flash.onEvent",
                errorEventProxyFunction: "videojs.Flash.onError",
                autoplay: t.autoplay,
                preload: t.Pa,
                loop: t.loop,
                muted: t.muted
            }, e.flashVars), r = u.k.B({wmode: "opaque", bgcolor: "#000000"}, e.params), c = u.k.B({
                id: s,
                name: s,
                "class": "vjs-tech"
            }, e.attributes);
            if (n && (n.type && u.f.ad(n.type) ? (t = u.f.wc(n.src), a.rtmpConnection = encodeURIComponent(t.qb), a.rtmpStream = encodeURIComponent(t.Mb)) : a.src = encodeURIComponent(u.ic(n.src))), u.yb(o, i), e.startTime && this.M(function () {
                    this.load(), this.play(), this.currentTime(e.startTime)
                }), e.iFrameMode !== f || u.Ec)u.f.Vc(e.swf, o, a, r, c); else {
                var l = u.e("iframe", {
                    id: s + "_iframe",
                    name: s + "_iframe",
                    className: "vjs-tech",
                    scrolling: "no",
                    marginWidth: 0,
                    marginHeight: 0,
                    frameBorder: 0
                });
                a.readyFunction = "ready", a.eventProxyFunction = "events", a.errorEventProxyFunction = "errors", u.d(l, "load", u.bind(this, function () {
                    var t, i = l.contentWindow;
                    t = l.contentDocument ? l.contentDocument : l.contentWindow.document, t.write(u.f.jc(e.swf, a, r, c)), i.player = this.b, i.ready = u.bind(this.b, function (e) {
                        var i = this.h;
                        i.a = t.getElementById(e), u.f.ob(i)
                    }), i.events = u.bind(this.b, function (t, e) {
                        this && "flash" === this.ia && this.j(e)
                    }), i.errors = u.bind(this.b, function (t, e) {
                        u.log("Flash Error", e)
                    })
                })), o.parentNode.replaceChild(l, o)
            }
        }
    }), t = u.f.prototype, t.D = function () {
        u.r.prototype.D.call(this)
    }, t.play = function () {
        this.a.vjs_play()
    }, t.pause = function () {
        this.a.vjs_pause()
    }, t.src = function (t) {
        if (u.f.$c(t) ? (t = u.f.wc(t), this.Nd(t.qb), this.Od(t.Mb)) : (t = u.ic(t), this.a.vjs_src(t)), this.b.autoplay()) {
            var e = this;
            setTimeout(function () {
                e.play()
            }, 0)
        }
    }, t.currentSrc = function () {
        var t = this.a.vjs_getProperty("currentSrc");
        if (t == j) {
            var e = this.Ld(), i = this.Md();
            e && i && (t = u.f.vd(e, i))
        }
        return t
    }, t.load = function () {
        this.a.vjs_load()
    }, t.poster = function () {
        this.a.vjs_getProperty("poster")
    }, t.buffered = function () {
        return u.sb(0, this.a.vjs_getProperty("buffered"))
    }, t.Sa = q(l);
    var R = u.f.prototype, S = "rtmpConnection rtmpStream preload currentTime defaultPlaybackRate playbackRate autoplay loop mediaGroup controller controls volume muted defaultMuted".split(" "), T = "error currentSrc networkState readyState seeking initialTime duration startOffsetTime paused played seekable ended videoTracks audioTracks videoWidth videoHeight textTracks".split(" "), U;
    for (U = 0; U < S.length; U++)V(S[U]), fa();
    for (U = 0; U < T.length; U++)V(T[U]);
    if (u.f.isSupported = function () {
            return 10 <= u.f.version()[0]
        }, u.f.lb = function (t) {
            return t.type in u.f.Yc || t.type in u.f.xc ? "maybe" : void 0
        }, u.f.Yc = {
            "video/flv": "FLV",
            "video/x-flv": "FLV",
            "video/mp4": "MP4",
            "video/m4v": "MP4"
        }, u.f.xc = {"rtmp/mp4": "MP4", "rtmp/flv": "FLV"}, u.f.onReady = function (t) {
            t = u.v(t);
            var e = t.player || t.parentNode.player, i = e.h;
            t.player = e, i.a = t
        }, u.f.ob = function (t) {
            t.v().vjs_getProperty ? t.Ta() : setTimeout(function () {
                u.f.ob(t)
            }, 50)
        }, u.f.onEvent = function (t, e) {
            u.v(t).player.j(e)
        }, u.f.onError = function (t, e) {
            u.v(t).player.j("error"), u.log("Flash Error", e, t)
        }, u.f.version = function () {
            var t = "0,0,0";
            try {
                t = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]
            } catch (e) {
                try {
                    navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin && (t = (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1])
                } catch (i) {
                }
            }
            return t.split(",")
        }, u.f.Vc = function (t, e, i, n, o) {
            t = u.f.jc(t, i, n, o), t = u.e("div", {innerHTML: t}).childNodes[0], i = e.parentNode, e.parentNode.replaceChild(t, e);
            var s = i.childNodes[0];
            setTimeout(function () {
                s.style.display = "block"
            }, 1e3)
        }, u.f.jc = function (t, e, i, n) {
            var o = "", s = "", a = "";
            return e && u.k.ta(e, function (t, e) {
                o += t + "=" + e + "&amp;"
            }), i = u.k.B({
                movie: t,
                flashvars: o,
                allowScriptAccess: "always",
                allowNetworking: "all"
            }, i), u.k.ta(i, function (t, e) {
                s += '<param name="' + t + '" value="' + e + '" />'
            }), n = u.k.B({data: t, width: "100%", height: "100%"}, n), u.k.ta(n, function (t, e) {
                a += t + '="' + e + '" '
            }), '<object type="application/x-shockwave-flash"' + a + ">" + s + "</object>"
        }, u.f.vd = function (t, e) {
            return t + "&" + e
        }, u.f.wc = function (t) {
            var e = {qb: "", Mb: ""};
            if (!t)return e;
            var i, n = t.indexOf("&");
            return -1 !== n ? i = n + 1 : (n = i = t.lastIndexOf("/") + 1, 0 === n && (n = i = t.length)), e.qb = t.substring(0, n), e.Mb = t.substring(i, t.length), e
        }, u.f.ad = function (t) {
            return t in u.f.xc
        }, u.f.Lc = /^rtmp[set]?:\/\//i, u.f.$c = function (t) {
            return u.f.Lc.test(t)
        }, u.Kc = u.c.extend({
            i: function (t, e, i) {
                if (u.c.call(this, t, e, i), t.g.sources && 0 !== t.g.sources.length)t.src(t.g.sources); else for (e = 0, i = t.g.techOrder; e < i.length; e++) {
                    var n = u.$(i[e]), o = window.videojs[n];
                    if (o && o.isSupported()) {
                        J(t, n);
                        break
                    }
                }
            }
        }), u.X = u.c.extend({
            i: function (t, e) {
                u.c.call(this, t, e), this.Q = e.id || "vjs_" + e.kind + "_" + e.language + "_" + u.s++, this.tc = e.src, this.Sc = e["default"] || e.dflt, this.xd = e.title, this.Id = e.srclang, this.bd = e.label, this.fa = [], this.bc = [], this.ga = this.ha = 0, this.b.d("fullscreenchange", u.bind(this, this.Nc))
            }
        }), t = u.X.prototype, t.K = p("A"), t.src = p("tc"), t.tb = p("Sc"), t.title = p("xd"), t.label = p("bd"), t.readyState = p("ha"), t.mode = p("ga"), t.Nc = function () {
            this.a.style.fontSize = this.b.I ? 140 * (screen.width / this.b.width()) + "%" : ""
        }, t.e = function () {
            return u.c.prototype.e.call(this, "div", {className: "vjs-" + this.A + " vjs-text-track"})
        }, t.show = function () {
            Y(this), this.ga = 2, u.c.prototype.show.call(this)
        }, t.C = function () {
            Y(this), this.ga = 1, u.c.prototype.C.call(this)
        }, t.disable = function () {
            2 == this.ga && this.C(), this.b.n("timeupdate", u.bind(this, this.update, this.Q)), this.b.n("ended", u.bind(this, this.reset, this.Q)), this.reset(), this.b.V.textTrackDisplay.removeChild(this), this.ga = 0
        }, t.load = function () {
            0 === this.ha && (this.ha = 1, u.get(this.tc, u.bind(this, this.kd), u.bind(this, this.Fb)))
        }, t.Fb = function (t) {
            this.error = t, this.ha = 3, this.j("error")
        }, t.kd = function (t) {
            var e, i;
            t = t.split("\n");
            for (var n = "", o = 1, s = t.length; s > o; o++)if (n = u.trim(t[o])) {
                for (-1 == n.indexOf("-->") ? (e = n, n = u.trim(t[++o])) : e = this.fa.length, e = {
                    id: e,
                    index: this.fa.length
                }, i = n.split(" --> "), e.startTime = ga(i[0]), e.ua = ga(i[1]), i = []; t[++o] && (n = u.trim(t[o]));)i.push(n);
                e.text = i.join("<br/>"), this.fa.push(e)
            }
            this.ha = 2, this.j("loaded")
        }, t.update = function () {
            if (0 < this.fa.length) {
                var t = this.b.currentTime();
                if (this.Kb === b || t < this.Kb || this.La <= t) {
                    var e, i, n, o, s = this.fa, u = this.b.duration(), a = 0, r = l, c = [];
                    for (t >= this.La || this.La === b ? o = this.vb !== b ? this.vb : 0 : (r = f, o = this.Cb !== b ? this.Cb : s.length - 1); ;) {
                        if (n = s[o], n.ua <= t)a = Math.max(a, n.ua), n.Ha && (n.Ha = l); else if (t < n.startTime) {
                            if (u = Math.min(u, n.startTime), n.Ha && (n.Ha = l), !r)break
                        } else r ? (c.splice(0, 0, n), i === b && (i = o), e = o) : (c.push(n), e === b && (e = o), i = o), u = Math.min(u, n.ua), a = Math.max(a, n.startTime), n.Ha = f;
                        if (r) {
                            if (0 === o)break;
                            o--
                        } else {
                            if (o === s.length - 1)break;
                            o++
                        }
                    }
                    for (this.bc = c, this.La = u, this.Kb = a, this.vb = e, this.Cb = i, t = this.bc, s = "", u = 0, a = t.length; a > u; u++)s += '<span class="vjs-tt-cue">' + t[u].text + "</span>";
                    this.a.innerHTML = s, this.j("cuechange")
                }
            }
        }, t.reset = function () {
            this.La = 0, this.Kb = this.b.duration(), this.Cb = this.vb = 0
        }, u.Sb = u.X.extend(), u.Sb.prototype.A = "captions", u.Yb = u.X.extend(), u.Yb.prototype.A = "subtitles", u.Tb = u.X.extend(), u.Tb.prototype.A = "chapters", u.Zb = u.c.extend({
            i: function (t, e, i) {
                if (u.c.call(this, t, e, i), t.g.tracks && 0 < t.g.tracks.length) {
                    e = this.b, t = t.g.tracks;
                    var n;
                    for (i = 0; i < t.length; i++) {
                        n = t[i];
                        var o = e, s = n.kind, a = n.label, r = n.language, c = n;
                        n = o.za = o.za || [], c = c || {}, c.kind = s, c.label = a, c.language = r, s = u.$(s || "subtitles"), o = new window.videojs[s + "Track"](o, c), n.push(o)
                    }
                }
            }
        }), u.Zb.prototype.e = function () {
            return u.c.prototype.e.call(this, "div", {className: "vjs-text-track-display"})
        }, u.Y = u.N.extend({
            i: function (t, e) {
                var i = this.ca = e.track;
                e.label = i.label(), e.selected = i.tb(), u.N.call(this, t, e), this.b.d(i.K() + "trackchange", u.bind(this, this.update))
            }
        }), u.Y.prototype.p = function () {
            u.N.prototype.p.call(this), X(this.b, this.ca.Q, this.ca.K())
        }, u.Y.prototype.update = function () {
            this.selected(2 == this.ca.mode())
        }, u.ab = u.Y.extend({
            i: function (t, e) {
                e.track = {
                    K: function () {
                        return e.kind
                    }, L: t, label: function () {
                        return e.kind + " off"
                    }, tb: q(l), mode: q(l)
                }, u.Y.call(this, t, e), this.selected(f)
            }
        }), u.ab.prototype.p = function () {
            u.Y.prototype.p.call(this), X(this.b, this.ca.Q, this.ca.K())
        }, u.ab.prototype.update = function () {
            for (var t, e = W(this.b), i = 0, n = e.length, o = f; n > i; i++)t = e[i], t.K() == this.ca.K() && 2 == t.mode() && (o = l);
            this.selected(o)
        }, u.S = u.R.extend({
            i: function (t, e) {
                u.R.call(this, t, e), 1 >= this.J.length && this.C()
            }
        }), u.S.prototype.sa = function () {
            var t, e = [];
            e.push(new u.ab(this.b, {kind: this.A}));
            for (var i = 0; i < W(this.b).length; i++)t = W(this.b)[i], t.K() === this.A && e.push(new u.Y(this.b, {track: t}));
            return e
        }, u.Ca = u.S.extend({
            i: function (t, e, i) {
                u.S.call(this, t, e, i), this.a.setAttribute("aria-label", "Captions Menu")
            }
        }), u.Ca.prototype.A = "captions", u.Ca.prototype.pa = "Captions", u.Ca.prototype.className = "vjs-captions-button", u.Ga = u.S.extend({
            i: function (t, e, i) {
                u.S.call(this, t, e, i), this.a.setAttribute("aria-label", "Subtitles Menu")
            }
        }), u.Ga.prototype.A = "subtitles", u.Ga.prototype.pa = "Subtitles", u.Ga.prototype.className = "vjs-subtitles-button", u.Da = u.S.extend({
            i: function (t, e, i) {
                u.S.call(this, t, e, i), this.a.setAttribute("aria-label", "Chapters Menu")
            }
        }), t = u.Da.prototype, t.A = "chapters", t.pa = "Chapters", t.className = "vjs-chapters-button", t.sa = function () {
            for (var t, e = [], i = 0; i < W(this.b).length; i++)t = W(this.b)[i], t.K() === this.A && e.push(new u.Y(this.b, {track: t}));
            return e
        }, t.Ja = function () {
            for (var t, e, i = W(this.b), n = 0, o = i.length, s = this.J = []; o > n; n++)if (t = i[n], t.K() == this.A && t.tb()) {
                if (2 > t.readyState())return this.Fd = t, void t.d("loaded", u.bind(this, this.Ja));
                e = t;
                break
            }
            if (i = this.va = new u.la(this.b), i.a.appendChild(u.e("li", {
                    className: "vjs-menu-title",
                    innerHTML: u.$(this.A),
                    wd: -1
                })), e) {
                t = e.fa;
                for (var a, n = 0, o = t.length; o > n; n++)a = t[n], a = new u.Wa(this.b, {
                    track: e,
                    cue: a
                }), s.push(a), i.Z(a)
            }
            return 0 < this.J.length && this.show(), i
        }, u.Wa = u.N.extend({
            i: function (t, e) {
                var i = this.ca = e.track, n = this.cue = e.cue, o = t.currentTime();
                e.label = n.text, e.selected = n.startTime <= o && o < n.ua, u.N.call(this, t, e), i.d("cuechange", u.bind(this, this.update))
            }
        }), u.Wa.prototype.p = function () {
            u.N.prototype.p.call(this), this.b.currentTime(this.cue.startTime), this.update(this.cue.startTime)
        }, u.Wa.prototype.update = function () {
            var t = this.cue, e = this.b.currentTime();
            this.selected(t.startTime <= e && e < t.ua)
        }, u.k.B(u.Ea.prototype.g.children, {
            subtitlesButton: {},
            captionsButton: {},
            chaptersButton: {}
        }), "undefined" != typeof window.JSON && "function" === window.JSON.parse)u.JSON = window.JSON; else {
        u.JSON = {};
        var Z = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        u.JSON.parse = function (a, c) {
            function d(t, e) {
                var i, n, o = t[e];
                if (o && "object" == typeof o)for (i in o)Object.prototype.hasOwnProperty.call(o, i) && (n = d(o, i), n !== b ? o[i] = n : delete o[i]);
                return c.call(t, e, o)
            }

            var e;
            if (a = String(a), Z.lastIndex = 0, Z.test(a) && (a = a.replace(Z, function (t) {
                    return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
                })), /^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return e = eval("(" + a + ")"), "function" == typeof c ? d({"": e}, "") : e;
            throw new SyntaxError("JSON.parse(): invalid or malformed JSON data")
        }
    }
    u.cc = function () {
        var t, e, i = document.getElementsByTagName("video");
        if (i && 0 < i.length)for (var n = 0, o = i.length; o > n; n++) {
            if (!(e = i[n]) || !e.getAttribute) {
                u.jb();
                break
            }
            e.player === b && (t = e.getAttribute("data-setup"), t !== j && (t = u.JSON.parse(t || "{}"), v(e, t)))
        } else u.Ac || u.jb()
    }, u.jb = function () {
        setTimeout(u.cc, 1)
    }, "complete" === document.readyState ? u.Ac = f : u.U(window, "load", function () {
        u.Ac = f
    }), u.jb(), u.ld = function (t, e) {
        u.w.prototype[t] = e
    };
    var ha = this;
    ha.Bd = f, $("videojs", u), $("_V_", u), $("videojs.options", u.options), $("videojs.players", u.wa), $("videojs.cache", u.qa), $("videojs.Component", u.c), u.c.prototype.player = u.c.prototype.L, u.c.prototype.dispose = u.c.prototype.D, u.c.prototype.createEl = u.c.prototype.e, u.c.prototype.el = u.c.prototype.v, u.c.prototype.addChild = u.c.prototype.Z, u.c.prototype.children = u.c.prototype.children, u.c.prototype.on = u.c.prototype.d, u.c.prototype.off = u.c.prototype.n, u.c.prototype.one = u.c.prototype.U, u.c.prototype.trigger = u.c.prototype.j, u.c.prototype.triggerReady = u.c.prototype.Ta, u.c.prototype.show = u.c.prototype.show, u.c.prototype.hide = u.c.prototype.C, u.c.prototype.width = u.c.prototype.width, u.c.prototype.height = u.c.prototype.height, u.c.prototype.dimensions = u.c.prototype.Tc, u.c.prototype.ready = u.c.prototype.M, u.c.prototype.addClass = u.c.prototype.m, u.c.prototype.removeClass = u.c.prototype.t, $("videojs.Player", u.w), u.w.prototype.dispose = u.w.prototype.D, u.w.prototype.requestFullScreen = u.w.prototype.xa, u.w.prototype.cancelFullScreen = u.w.prototype.nb, u.w.prototype.bufferedPercent = u.w.prototype.Ia, u.w.prototype.usingNativeControls = u.w.prototype.Pb, $("videojs.MediaLoader", u.Kc), $("videojs.TextTrackDisplay", u.Zb), $("videojs.ControlBar", u.Ea), $("videojs.Button", u.q), $("videojs.PlayToggle", u.Wb), $("videojs.FullscreenToggle", u.Fa), $("videojs.BigPlayButton", u.Va), $("videojs.LoadingSpinner", u.Ub), $("videojs.CurrentTimeDisplay", u.Xa), $("videojs.DurationDisplay", u.Ya), $("videojs.TimeDivider", u.$b), $("videojs.RemainingTimeDisplay", u.eb), $("videojs.Slider", u.O), $("videojs.ProgressControl", u.cb), $("videojs.SeekBar", u.Xb), $("videojs.LoadProgressBar", u.$a), $("videojs.PlayProgressBar", u.Vb), $("videojs.SeekHandle", u.fb), $("videojs.VolumeControl", u.hb), $("videojs.VolumeBar", u.gb), $("videojs.VolumeLevel", u.ac), $("videojs.VolumeMenuButton", u.na), $("videojs.VolumeHandle", u.ib), $("videojs.MuteToggle", u.da), $("videojs.PosterImage", u.bb), $("videojs.Menu", u.la), $("videojs.MenuItem", u.N), $("videojs.MenuButton", u.R), u.R.prototype.createItems = u.R.prototype.sa, u.S.prototype.createItems = u.S.prototype.sa, u.Da.prototype.createItems = u.Da.prototype.sa, $("videojs.SubtitlesButton", u.Ga), $("videojs.CaptionsButton", u.Ca), $("videojs.ChaptersButton", u.Da), $("videojs.MediaTechController", u.r), u.r.prototype.features = u.r.prototype.l, u.r.prototype.l.volumeControl = u.r.prototype.l.zc, u.r.prototype.l.fullscreenResize = u.r.prototype.l.Gd, u.r.prototype.l.progressEvents = u.r.prototype.l.Kd, u.r.prototype.l.timeupdateEvents = u.r.prototype.l.Pd, $("videojs.Html5", u.o), u.o.Events = u.o.Za, u.o.isSupported = u.o.isSupported, u.o.canPlaySource = u.o.lb, u.o.prototype.setCurrentTime = u.o.prototype.pd, u.o.prototype.setVolume = u.o.prototype.ud, u.o.prototype.setMuted = u.o.prototype.sd, u.o.prototype.setPreload = u.o.prototype.td, u.o.prototype.setAutoplay = u.o.prototype.od, u.o.prototype.setLoop = u.o.prototype.rd, $("videojs.Flash", u.f), u.f.isSupported = u.f.isSupported, u.f.canPlaySource = u.f.lb, u.f.onReady = u.f.onReady, $("videojs.TextTrack", u.X), u.X.prototype.label = u.X.prototype.label, $("videojs.CaptionsTrack", u.Sb), $("videojs.SubtitlesTrack", u.Yb), $("videojs.ChaptersTrack", u.Tb), $("	videojs.autoSetup", u.cc), $("videojs.plugin", u.ld), $("videojs.createTimeRange", u.sb)
}();
var videoPlayer = {
    init: function () {
        this.bindEle(), this.autopaly(), this.video_download()
    }, bindEle: function () {
        $(".warning-vip").on("click", this.warningvip), $(".down-ajax").on("click", this.downAjax), $(".closew").bind("click", function () {
            $(".slow-time-tip").fadeOut()
        })
    }, downAjax: function () {
        var t = $.cookie("uid");
        if ("" == t || void 0 == t || null == t)return !1;
        var e = $(".videobox").attr("seq") || 0, i = $(".videobox").attr("course_id");
        $.ajax({
            type: "get",
            url: "/course/video_download",
            data: {seq: e, course_id: i},
            dataType: "json",
            success: function (t) {
                200 == t.code ? window.location.href = t.data.urls : JKXY.msgBox(1, "只有年VIP及指定院校学生才能下载高清视频，亲")
            },
            error: function () {
                alert("网络错误刷新重试！")
            },
            dataType: "json"
        })
    }, warningvip: function () {
        JKXY.msgBox(1, "只有年VIP及指定院校学生才能下载高清视频，亲")
    }, autopaly: function () {
        var t = $.cookie("lianbo");
        if ("yes" == t) {
            $(".lianbo>i").addClass("ysc");
            var e = videojs("play_video");
            e.play()
        }
    }, load: function () {
        var t, e, i = parseInt($(".videobox").attr("time")), n = videojs("play_video");
        n.ready(function () {
            window.courseInfo && window.courseInfo.id && sa.track("study_ke_play", {
                cname: window.courseInfo.title,
                cid: window.courseInfo.id
            }), t = setInterval(function () {
                var e = $.cookie("lianbo");
                if ("yes" == e) {
                    var o = n.currentTime();
                    if (o > i - 5) {
                        ws.send(JSON.stringify(videoPlayer.heartbeat.allInfor())), clearInterval(t);
                        var s = $(".videobox").attr("seq"), u = $(".videobox").attr("lesson_count");
                        u > s && (JKXY.msgBox(1, "即将为您播放下一课程"), videoPlayer.heartbeat.time = "close", setTimeout(function () {
                            $("#lesson-next").click()
                        }, 5e3), $(".vjs-loading-spinner").addClass("vjs-loading-spinner-show"))
                    }
                }
            }, 1e3), e = setInterval(function () {
                var t = n.currentTime();
                t > i - 5 && (clearInterval(e), window.courseInfo && window.courseInfo.id && (sa.track("study_ke_done", {
                    cname: window.courseInfo.title,
                    cid: window.courseInfo.id
                }), window.courseInfo = null))
            }, 1e3)
        })
    }, heartbeat: {
        playing: null, time: 5e3, currLock: "open", _setcurrentTime: function () {
            var t = videojs("play_video"), e = setInterval(function () {
                var i = parseInt(t.currentTime()), n = parseInt($(".videobox").attr("time")), o = parseInt($(".videobox").attr("last_play_position"));
                n - 5 > o && (t.currentTime(o), i >= o && (videoPlayer.heartbeat.currLock = "close", clearInterval(e)))
            }, 10)
        }, allInfor: function () {
            var t, e = $.cookie("uid"), i = parseInt($(".videobox").attr("time")), n = videojs("play_video"), o = $(".videobox").attr("course_id"), s = parseInt($(".videobox").attr("seq")) || 0, u = parseInt(n.currentTime());
            t = u >= i - 5 ? 1 : 0;
            var a = {
                type: "progress",
                data: {app_id: 1, seq: s, course_id: o, uid: e, last_play_position: u, is_finish: t}
            };
            return a
        }, heart: function () {
            var t = videojs("play_video");
            t.on("play", function () {
                function t() {
                    var t = parseInt(e.currentTime());
                    t > 0 && ws.send(JSON.stringify(videoPlayer.heartbeat.allInfor()))
                }

                videoPlayer.load(), videoPlayer.slowLine();
                parseInt($(".videobox").attr("time"));
                "open" == videoPlayer.heartbeat.currLock && videoPlayer.heartbeat._setcurrentTime();
                var e = videojs("play_video");
                $(".vjs-loading-spinner").css("opacity", .75);
                var i = $.cookie("uid");
                return "" == i || "undefined" == typeof i || null == i ? !1 : void(videoPlayer.heartbeat.playing = setInterval(t, videoPlayer.heartbeat.time))
            }), t.on("pause", function () {
                clearInterval(videoPlayer.heartbeat.playing)
            }), t.on("ended", function () {
                clearInterval(videoPlayer.heartbeat.playing)
            })
        }
    }, slowLine: function () {
        var t = videojs("play_video");
        setTimeout(function () {
            var e = t.currentTime();
            0 == e && $(".slow-time-tip").css("left", "-210px")
        }, 5e3)
    }, video_download: function () {
        var t = $(".videobox").attr("seq"), e = $(".videobox").attr("course_id");
        $.ajax({
            type: "get",
            url: "/course/video_download",
            data: {seq: t, course_id: e},
            dataType: "json",
            success: function (t) {
                $("#down_video").attr("href", t.urls)
            }
        })
    }
}, playernav = {
    init: function () {
        this.state(), this.bindEle()
    }, lock: !0, showFinish: !0, bindEle: function () {
        playernav.lock && ($("#shouchang").on("click", this.collection), $("#shouchang-towbtn").on("click", this.collection)), $("#lesson-next").on("click", this.prevAndNext), $("#lesson-prev").on("click", this.prevAndNext)
    }, state: function () {
        $(".lianbo").click(function () {
            var t = $(this);
            t.children("i").hasClass("ysc") ? (t.children("i").removeClass("ysc"), $.cookie("lianbo", "no")) : (t.children("i").addClass("ysc"), $.cookie("lianbo", "yes", {expires: 7}))
        })
    }, collection: function () {
        if (playernav.lock = !1, playernav.showFinish) {
            var t = $("#shouchang");
            t.children("i").hasClass("ysc") ? (t.children("i").removeClass("ysc"), $("#shouchang-towbtn").html("收藏")) : (t.children("i").addClass("ysc"), $("#shouchang-towbtn").html("已收藏")), playernav.showFinish = !1, playernav.lock = !0
        }
        var e = $(".videobox").attr("course_id");
        playernav.lock && playernav.collecFunction(e)
    }, collecFunction: function (t) {
        $.ajax({
            type: "get", url: "/course/fav", success: function (t) {
                JKXY.msgBox(1, t.msg, 1500, function () {
                    playernav.showFinish = !0
                })
            }, data: {course_id: t}, dataType: "json"
        })
    }, prevAndNext: function () {
        var t = $(this);
        window.location.href = t.attr("courseurl")
    }
};
$(function () {
    videojs("play_video").ready(function () {
        videoPlayer.init(), videoPlayer.heartbeat.heart(), playernav.init()
    })
});
