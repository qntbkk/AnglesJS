parcelRequire = (function(e, r, n, t) {
  var i = "function" == typeof parcelRequire && parcelRequire,
    o = "function" == typeof require && require;
  function u(n, t) {
    if (!r[n]) {
      if (!e[n]) {
        var f = "function" == typeof parcelRequire && parcelRequire;
        if (!t && f) return f(n, !0);
        if (i) return i(n, !0);
        if (o && "string" == typeof n) return o(n);
        var c = new Error("Cannot find module '" + n + "'");
        throw ((c.code = "MODULE_NOT_FOUND"), c);
      }
      (p.resolve = function(r) {
        return e[n][1][r] || r;
      }),
        (p.cache = {});
      var l = (r[n] = new u.Module(n));
      e[n][0].call(l.exports, p, l, l.exports, this);
    }
    return r[n].exports;
    function p(e) {
      return u(p.resolve(e));
    }
  }
  (u.isParcelRequire = !0),
    (u.Module = function(e) {
      (this.id = e), (this.bundle = u), (this.exports = {});
    }),
    (u.modules = e),
    (u.cache = r),
    (u.parent = i),
    (u.register = function(r, n) {
      e[r] = [
        function(e, r) {
          r.exports = n;
        },
        {}
      ];
    });
  for (var f = 0; f < n.length; f++) u(n[f]);
  if (n.length) {
    var c = u(n[n.length - 1]);
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = c)
      : "function" == typeof define && define.amd
      ? define(function() {
          return c;
        })
      : t && (this[t] = c);
  }
  return u;
})(
  {
    paDP: [
      function(require, module, exports) {
        "use strict";
        function t(r) {
          return (t =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function(t) {
                  return typeof t;
                }
              : function(t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(r);
        }
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = void 0);
        var r = function(t) {
            return void 0 === t;
          },
          e = function(t) {
            return Array.isArray(t);
          },
          n = function(t) {
            return t && "[object Function]" === {}.toString.call(t);
          },
          i = function(t) {
            return "" !== t ? "".concat(t, ".") : "";
          },
          s = function(t) {
            var r =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : self,
              e =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : ".",
              n = Array.isArray(t) ? t : t.split(e);
            return 1 === n.length
              ? r[n[0]]
              : n.reduce(function(t, r) {
                  return t && t[r];
                }, r);
          };
        function o(t, r, e) {
          return (
            (this.sourceOfTruth = t || {}),
            (this.basePath = r || ""),
            (this.subscribers = e || { entries: [] }),
            this.DataInterpreter.bind(this)
          );
        }
        (o.prototype.extract = function(t) {
          return new o(
            this.sourceOfTruth,
            "".concat(i(this.basePath)).concat(t),
            this.subscribers
          );
        }),
          (o.prototype.DataInterpreter = function(e, n) {
            return !r(e) && r(n)
              ? this.get(e)
              : !r(e) && t(!r(n))
              ? this.set(e, n)
              : this;
          }),
          (o.prototype.get = function(t) {
            var n = this;
            if (e(t)) {
              var o = {};
              t.map(function(t) {
                o[t] = n.get(t);
              });
              return o;
            }
            return r(t)
              ? this
              : s("".concat(i(this.basePath)).concat(t), this.sourceOfTruth);
          }),
          (o.prototype.set = function(t, r) {
            var e =
                arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
              o = (!(arguments.length > 3 && void 0 !== arguments[3]) ||
                arguments[3],
              "".concat(i(this.basePath)).concat(t)),
              u = o.split(".");
            u.unshift("sourceOfTruth");
            var c = u.pop(),
              h = u.join("."),
              a = s(h, this),
              f = a[c];
            return (
              (a[c] = n(r) && !e ? r(s(o, this.sourceOfTruth)) : r),
              this.notifySubscribers(o, f),
              this
            );
          }),
          (o.prototype.emitSubscriber = function(t) {
            var r = s(t.path, this.sourceOfTruth);
            r !== t.value &&
              (t.fn(r, !!t.value && t.value, t.path), (t.value = r));
          }),
          (o.prototype.notifySubscribers = function(t, r) {
            var e = this;
            this.subscribers.entries.forEach(function(r) {
              r.deep && r.path === t.substr(0, r.path.length)
                ? e.emitSubscriber(r)
                : r.path === t
                ? e.emitSubscriber(r)
                : t === r.path.substr(0, t.length) && e.emitSubscriber(r);
            });
          }),
          (o.prototype.subscribe = function(t) {
            var r = this,
              n =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
              s =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : Date.now(),
              o =
                arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
              u = function(t) {
                var e = "".concat(i(r.basePath)).concat(t);
                r.subscribers.entries.some(function(t) {
                  return t.path === e && t.fn === n;
                }) ||
                  r.subscribers.entries.push({
                    path: e,
                    fn: n,
                    deep: o,
                    id: s
                  });
              };
            return e(t) ? t.forEach(u) : u(t), this;
          }),
          (o.prototype.unsubscribe = function() {
            var t =
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
              r =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
              e =
                arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return (
              (this.subscribers.entries = this.subscribers.entries.filter(
                function(n) {
                  return e
                    ? n.id !== e
                    : t && r
                    ? n.path !== t && n.fn !== r
                    : t && !r
                    ? n.path !== t || n !== t
                    : !t && r
                    ? n.fn !== r
                    : void 0;
                }
              )),
              this
            );
          }),
          (o.prototype.toJSON = function() {
            return this.basePath
              ? s(this.basePath, this.sourceOfTruth)
              : this.sourceOfTruth;
          });
        var u = o;
        exports.default = u;
      },
      {}
    ],
    "2368": [
      function(require, module, exports) {
        "use strict";
        module.exports = function(r) {
          return null != r && "object" == typeof r && !1 === Array.isArray(r);
        };
      },
      {}
    ],
    "6dK+": [
      function(require, module, exports) {
        "use strict";
        var t = require("isobject");
        function o(o) {
          return (
            !0 === t(o) &&
            "[object Object]" === Object.prototype.toString.call(o)
          );
        }
        module.exports = function(t) {
          var r, e;
          return (
            !1 !== o(t) &&
            ("function" == typeof (r = t.constructor) &&
              (!1 !== o((e = r.prototype)) &&
                !1 !== e.hasOwnProperty("isPrototypeOf")))
          );
        };
      },
      { isobject: "2368" }
    ],
    "8WHH": [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = void 0);
        var e = function() {
          var e = this;
          (this.queue = new Set()), (this.now = Date.now());
          !(function t() {
            e.tick(), window.requestAnimationFrame(t);
          })();
        };
        (e.prototype.tick = function() {
          (this.now = Date.now()), this.renderQueue();
        }),
          (e.prototype.add = function(e) {
            this.queue.has(e) || this.queue.add(e);
          }),
          (e.prototype.renderQueue = function() {
            var e = this;
            this.queue.forEach(function(t) {
              e.render(t);
            });
          }),
          (e.prototype.render = function(e) {
            e.renderTimestamp < this.now &&
              (e._render(), (e.renderTimestamp = this.now)),
              this.queue.delete(e);
          });
        var t = e;
        exports.default = t;
      },
      {}
    ],
    "1UHx": [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = void 0);
        var t = r(require("./data")),
          n = r(require("is-plain-object")),
          e = r(require("./rendering-scheduler"));
        function r(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function u(t) {
          return a(t) || i(t) || o();
        }
        function o() {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance"
          );
        }
        function i(t) {
          if (
            Symbol.iterator in Object(t) ||
            "[object Arguments]" === Object.prototype.toString.call(t)
          )
            return Array.from(t);
        }
        function a(t) {
          if (Array.isArray(t)) {
            for (var n = 0, e = new Array(t.length); n < t.length; n++)
              e[n] = t[n];
            return e;
          }
        }
        var c = new e.default(),
          f = function(t) {
            return t && "[object Function]" === {}.toString.call(t);
          },
          s = function(t) {
            return Array.isArray(t);
          },
          l = function(t) {
            return s(t) && 0 === t.length;
          },
          d = function(t) {
            return t instanceof Element;
          },
          h = function(t) {
            return t && t.$el && d(t.$el);
          },
          v = function(t) {
            return (
              s(t) &&
              t.length &&
              t.every(function(t) {
                return h(t);
              })
            );
          },
          p = function(t) {
            return t.nodeType === Node.TEXT_NODE;
          },
          m = function(t) {
            return void 0 === t;
          },
          g = function(t) {
            return -1 !== t.search(/<!--?(\s*)svg?(\s*)-->/gim);
          },
          y = /fhtmlfn\((\d+)\)/g,
          b = /(fhtmlfn\(\d+\))/gm,
          C = function(t) {
            return -1 !== t.search(y);
          },
          $ = function(t) {
            return g(t)
              ? document.createElementNS("http://www.w3.org/2000/svg", "svg")
              : document.createElement("span");
          },
          w = function(t, e) {
            return t
              .map(function(t, r) {
                var u = e[r];
                return u
                  ? u[N]
                    ? ((e[r] = function() {
                        return u();
                      }),
                      "".concat(t, "fhtmlfn(").concat(r, ")"))
                    : f(u)
                    ? "".concat(t, "fhtmlfn(").concat(r, ")")
                    : d(u) || h(u) || v(u) || (0, n.default)(u)
                    ? ((e[r] = function() {
                        return u;
                      }),
                      "".concat(t, "fhtmlfn(").concat(r, ")"))
                    : "".concat(t).concat(u)
                  : t;
              })
              .join("");
          },
          E = new Map(),
          x = function(t, n) {
            if (E.has(n)) return E.get(n);
            for (var e in t) if (e.toLowerCase() === n) return E.set(n, e), e;
            return n;
          },
          N = Symbol("isProxy"),
          S = function t(n) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : "";
            return new Proxy(function() {}, {
              apply: function(t, r, u) {
                if (!e) return n;
                var o = u[0];
                return m(o) ? n(e, o) : n(e);
              },
              get: function(r, u, o) {
                return (
                  u === N ||
                  t(n, "".concat(e ? "".concat(e, ".") : "").concat(u))
                );
              }
            });
          },
          _ = function t(n, e, r) {
            var u =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : "";
            return new Proxy(function() {}, {
              apply: function(t, o, i) {
                var a = i[0];
                return (
                  m(a) || j.bind(n())(e(), r, u, a), j.bind(n())(e(), r, u)
                );
              },
              get: function(o, i, a) {
                return (
                  i === N ||
                  t(n, e, r, "".concat(u ? "".concat(u, ".") : "").concat(i))
                );
              }
            });
          },
          A = function t(n, e) {
            var r =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : "",
              u =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : "";
            return new Proxy(function() {}, {
              apply: function(t, o, i) {
                var a = i[0];
                return n()[e](r, u, a);
              },
              get: function(o, i) {
                return t(
                  n,
                  e,
                  r || i,
                  "".concat(u ? "".concat(u, ".") : "").concat(r ? i : "")
                );
              }
            });
          };
        function j(t, n, e, r) {
          var u = this;
          return (
            !n.some(function(t) {
              return t.path === e;
            }) &&
              e &&
              m(r) &&
              (n.push({ path: e, id: this }),
              t().subscribe(
                e,
                function() {
                  return u.render();
                },
                this
              )),
            t(e, r)
          );
        }
        var T = function() {
            return { state: [], data: [], props: [], attrs: [] };
          },
          O = {
            state: "$state",
            data: "$data",
            prop: "$props",
            attr: "$attrs"
          },
          P = function(t, n, e) {
            var r = T(),
              u = !1,
              o = {
                fn: t,
                node: n,
                resetPropSubscribers: function() {
                  r.props.length &&
                    (r.props.forEach(function(t) {
                      e.$props().unsubscribe(!1, !1, t.id);
                    }),
                    (r.props = []));
                },
                state: _(
                  function() {
                    return o;
                  },
                  function() {
                    return e.$state;
                  },
                  r.state
                ),
                data: _(
                  function() {
                    return o;
                  },
                  function() {
                    return e.$data;
                  },
                  r.data
                ),
                prop: _(
                  function() {
                    return o;
                  },
                  function() {
                    return e.$props;
                  },
                  r.props
                ),
                attr: _(
                  function() {
                    return o;
                  },
                  function() {
                    return e.$attrs;
                  },
                  r.attrs
                ),
                renderTimestamp: 0,
                render: function() {
                  c.add(o);
                },
                _render: function() {},
                get _isStatic() {
                  return u;
                },
                get isStatic() {
                  return (u = !0);
                }
              };
            return o;
          },
          q = function(t, n, e, r) {
            var u = P(n, t, r);
            (u._render = function() {
              u._isStatic || u.fn(u);
            }),
              e.push(u);
          },
          M = function(t, n, e, r, u) {
            var o = P(e, n, u),
              i = function(t) {
                return e(o, t);
              };
            ["beforemount", "mounted", "beforeunmount", "unmounted"].some(
              function(n) {
                return n === t;
              }
            )
              ? (o[t] = e)
              : ((o.mounted = function() {
                  return n.addEventListener(t, i);
                }),
                (o.unmounted = function() {
                  return n.removeEventListener(t, i);
                })),
              r.push(o);
          },
          B = function(t, e, r, u, o, i) {
            var a = t ? x(r, e) : e,
              c = P(u, r, i);
            (c.value = void 0),
              (c._render = function() {
                if (!c._isStatic) {
                  var u = c.fn(c);
                  if (!m(u) && u !== c.value) {
                    if ((0, n.default)(u) && "class" === e) {
                      var o = Object.keys(u)
                        .filter(function(t) {
                          return u[t];
                        })
                        .join(" ");
                      r.setAttribute(e, o);
                    } else if ((0, n.default)(u) && "style" === e)
                      for (var i in u)
                        "--" === i.substr(0, 2)
                          ? r.style.setProperty(i, u[i])
                          : ("transform" === i &&
                              (0, n.default)(u[i]) &&
                              (function() {
                                var t = u[i],
                                  n = Object.keys(u[i])
                                    .map(function(n) {
                                      return ""
                                        .concat(n, "(")
                                        .concat(t[n], ")");
                                    })
                                    .join(" ");
                                r.style.transform = n;
                              })(),
                            (r.style[i] = u[i]));
                    else if ((0, n.default)(u) && "dataset" === e)
                      for (var f in u) r.dataset[f] = JSON.stringify(u[f]);
                    else t ? (r[a] = u) : r.setAttribute(e, u);
                    c.value = u;
                  }
                }
              }),
              o.push(c);
          },
          L = function(t, n, e, r) {
            var o = function(t) {
              return n[t.replace(y, "$1")];
            };
            u(t.attributes).forEach(function(n) {
              var u = C(n.value),
                i = C(n.name);
              if (u || i) {
                var a = n.name.startsWith("."),
                  c = n.name.startsWith("@"),
                  f = n.name
                    .replace(/\./g, "")
                    .replace(/:/g, "")
                    .replace(/@/g, "")
                    .replace(/\^([a-z])/g, function(t, n) {
                      return n.toUpperCase();
                    });
                c && M(f, t, o(n.value), e, r),
                  u && !c
                    ? B(a, f, t, o(n.value), e, r)
                    : i && q(t, o(n.name), e, r),
                  t.removeAttribute(n.name);
              }
            });
          },
          k = function(t, n, e, r) {
            u(t.childNodes)
              .filter(function(t) {
                return p(t);
              })
              .forEach(function(u) {
                C(u.textContent) &&
                  (u.textContent
                    .split(b)
                    .map(function(u) {
                      if (!C(u)) return document.createTextNode(u);
                      var o = n[u.replace(y, "$1")],
                        i = new Map(),
                        a = document.createTextNode(""),
                        c = document.createComment(""),
                        f = P(o, t, r);
                      return (
                        (f.value = c),
                        (f.cache = function(t, n) {
                          return D(i, t, n);
                        }),
                        (f.map = A(function() {
                          return f;
                        }, "_map")),
                        (f._map = function(t, n) {
                          var e =
                              arguments.length > 2 && void 0 !== arguments[2]
                                ? arguments[2]
                                : function(t) {
                                    return t;
                                  },
                            u = r[O[t]];
                          return f[t][n]().map(function(r, o, a) {
                            var c = f[t][n][o],
                              s = D(i, r, function() {
                                return e(c, o, a);
                              });
                            return (
                              h(s) &&
                                (s.props(function(t, e) {
                                  return u().extract(
                                    "".concat(n, ".").concat(o)
                                  );
                                }),
                                s.renderers.forEach(function(t) {
                                  t.resetPropSubscribers();
                                })),
                              s
                            );
                          });
                        }),
                        (f._render = function() {
                          if (!f._isStatic) {
                            var t = f.fn(f);
                            if (
                              t !== f.value &&
                              (!p(f.value) || t !== a.textContent)
                            )
                              if (!t || l(t)) {
                                if (f.value === c) return;
                                z(r, c, f.value), (f.value = c);
                              } else if (d(t) || h(t) || v(t))
                                z(r, t, f.value), (f.value = t);
                              else {
                                if (
                                  f.value.textContent &&
                                  "".concat(t) ===
                                    "".concat(f.value.textContent)
                                )
                                  return;
                                (a.textContent = t),
                                  z(r, a, f.value),
                                  (f.value = a);
                              }
                          }
                        }),
                        e.push(f),
                        f.value
                      );
                    })
                    .forEach(function(t) {
                      var n = document.createComment("");
                      u.parentNode.insertBefore(n, u), z(r, t, n);
                    }),
                  u.parentNode.removeChild(u));
              });
          },
          F = function(t) {
            return s(t)
              ? u(t).map(function(t) {
                  return h(t) ? t.$el : t;
                })
              : [h(t) ? t.$el : t];
          },
          W = function(t) {
            return s(t)
              ? t.filter(function(t) {
                  return h(t);
                })
              : h(t)
              ? [t]
              : [];
          },
          z = function(t, n, e) {
            if (
              (s(n) || n !== e) &&
              !(
                s(n) &&
                s(e) &&
                n.every(function(t, n) {
                  return t === e[n];
                }) &&
                n.length === e.length
              )
            ) {
              var r = F(n),
                o = F(e),
                i = W(n),
                a = W(e),
                c = o[0],
                f = o[o.length - 1],
                l = c.parentNode,
                d = document.createComment(""),
                h = document.createComment(""),
                v = a.filter(function(t) {
                  return !i.includes(t);
                }),
                p = i.filter(function(t) {
                  return !a.includes(t);
                });
              l.insertBefore(d, c),
                l.insertBefore(h, f.nextSibling),
                v.forEach(function(t) {
                  return t.lifeCycle("beforeunmount");
                }),
                o
                  .filter(function(t) {
                    return !r.includes(t);
                  })
                  .forEach(function(t) {
                    return l.removeChild(t);
                  }),
                v.forEach(function(t) {
                  return t.lifeCycle("unmounted");
                });
              var m = u(l.childNodes).indexOf(d) + 1;
              p.forEach(function(t) {
                return t.lifeCycle("beforemount");
              }),
                r.forEach(function(t, n) {
                  var e = l.childNodes[m + n];
                  t.isSameNode(e) || l.insertBefore(t, e);
                }),
                p.forEach(function(n) {
                  n.state(t.$state),
                    n.render(),
                    window.requestAnimationFrame(function() {
                      n.lifeCycle("mounted");
                    });
                }),
                l.removeChild(d),
                l.removeChild(h);
            }
          },
          D = function(t, n, e) {
            if (t.has(n)) return t.get(n);
            var r = e(n);
            return h(r) ? t.set(n, r).get(n) : r;
          },
          H = function(e) {
            return (0, n.default)(e)
              ? new t.default(e)
              : f(e) && e() instanceof t.default
              ? e
              : f(e) && f(e()) && e()() instanceof t.default
              ? e()
              : void 0;
          },
          I = function(t, e, r) {
            if ((0, n.default)(r))
              for (var u in r) {
                var o = r[u],
                  i = void 0,
                  a = void 0;
                f(o) && ((i = o), (a = !1)),
                  (0, n.default)(o) && ((i = o.handler), (a = o.deep)),
                  e().unsubscribe(u, i.bind(t), "watcher", a),
                  e().subscribe(u, i.bind(t), "watcher", a);
              }
          };
        function J() {
          var n,
            e = Array.prototype.slice.call(arguments),
            r = e[0],
            o = e.length > 1 ? e.slice(1) : [],
            i = [],
            a = new t.default({}),
            c = new t.default({}),
            f = new t.default({}),
            s = new t.default({}),
            l = {},
            d = w(r, o),
            p = $(r[0]);
          p.insertAdjacentHTML("beforeend", d);
          var m = {
            mount: function(t) {
              if (((n = t), t && n.parentNode)) return z(this, this, n), this;
            },
            unmount: function() {
              var t =
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              if (this.$el.parentNode)
                return (
                  this.lifeCycle("beforeunmount"),
                  t
                    ? this.$el.parentNode.replaceChild(n, this.$el)
                    : this.$el.parentNode.removeChild(this.$el),
                  this.lifeCycle("unmounted"),
                  this
                );
            },
            lifeCycle: function(t) {
              i.forEach(function(n) {
                n[t] && n[t](n, t),
                  h(n.value) && n.value.lifeCycle(t),
                  v(n.value) &&
                    n.value.forEach(function(n) {
                      return n.lifeCycle(t);
                    });
              });
            },
            state: function(t) {
              return (a = H(t)), I(this, a, l.state), this;
            },
            get $state() {
              return a;
            },
            data: function(t) {
              return (c = H(t)), I(this, c, l.data), this;
            },
            get $data() {
              return c;
            },
            props: function(t) {
              return (f = H(t)), I(this, f, l.props), this;
            },
            get $props() {
              return f;
            },
            attrs: function(t) {
              return (s = H(t)), I(this, s, l.attrs), this;
            },
            get $attrs() {
              return s;
            },
            watch: function(t) {
              return (
                (l = t),
                I(this, a, t.state),
                I(this, c, t.data),
                I(this, f, t.props),
                I(this, s, t.attrs),
                this
              );
            },
            get renderers() {
              return i;
            },
            renderTimestamp: 0,
            render: function() {
              return (
                i.forEach(function(t) {
                  t.render(),
                    h(t.value) && t.value.render(),
                    v(t.value) &&
                      t.value.forEach(function(t) {
                        return t.render();
                      });
                }),
                this
              );
            },
            $el: p.children[0] || p
          };
          return (
            [p].concat(u(p.querySelectorAll("*"))).forEach(function(t) {
              L(t, o, i, m), k(t, o, i, m);
            }),
            m
          );
        }
        var U = J;
        exports.default = U;
      },
      {
        "./data": "paDP",
        "is-plain-object": "6dK+",
        "./rendering-scheduler": "8WHH"
      }
    ]
  },
  {},
  ["1UHx"],
  "fhtml"
);
