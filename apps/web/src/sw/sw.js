'use strict'
var he =
  typeof globalThis < 'u'
    ? globalThis
    : typeof window < 'u'
    ? window
    : typeof global < 'u'
    ? global
    : typeof self < 'u'
    ? self
    : {}
function hn(at) {
  if (at.__esModule) return at
  var ut = at.default
  if (typeof ut == 'function') {
    var m = function B() {
      if (this instanceof B) {
        var v = [null]
        v.push.apply(v, arguments)
        var h = Function.bind.apply(ut, v)
        return new h()
      }
      return ut.apply(this, arguments)
    }
    m.prototype = ut.prototype
  } else m = {}
  return (
    Object.defineProperty(m, '__esModule', { value: !0 }),
    Object.keys(at).forEach(function (B) {
      var v = Object.getOwnPropertyDescriptor(at, B)
      Object.defineProperty(
        m,
        B,
        v.get
          ? v
          : {
              enumerable: !0,
              get: function () {
                return at[B]
              }
            }
      )
    }),
    m
  )
}
var $e = {},
  _n = {
    get exports() {
      return $e
    },
    set exports(at) {
      $e = at
    }
  }
const pn = {},
  mn = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: pn },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  Te = hn(mn)
;(function (at, ut) {
  var m = void 0,
    B = function (v) {
      return (
        m ||
        ((m = new Promise(function (h, d) {
          var s = typeof v < 'u' ? v : {},
            _ = s.onAbort
          ;(s.onAbort = function (t) {
            d(new Error(t)), _ && _(t)
          }),
            (s.postRun = s.postRun || []),
            s.postRun.push(function () {
              h(s)
            }),
            (at = void 0)
          var r
          r || (r = typeof s < 'u' ? s : {}),
            (r.onRuntimeInitialized = function () {
              function t(R, tt) {
                switch (typeof tt) {
                  case 'boolean':
                    cn(R, tt ? 1 : 0)
                    break
                  case 'number':
                    on(R, tt)
                    break
                  case 'string':
                    un(R, tt, -1, -1)
                    break
                  case 'object':
                    if (tt === null) Tr(R)
                    else if (tt.length != null) {
                      var ct = Ge(tt)
                      ln(R, ct, tt.length, -1), we(ct)
                    } else
                      Le(
                        R,
                        'Wrong API use : tried to return a value of an unknown type (' +
                          tt +
                          ').',
                        -1
                      )
                    break
                  default:
                    Tr(R)
                }
              }
              function e(R, tt) {
                for (var ct = [], pt = 0; pt < R; pt += 1) {
                  var Et = J(tt + 4 * pt, 'i32'),
                    Lt = en(Et)
                  if (Lt === 1 || Lt === 2) Et = sn(Et)
                  else if (Lt === 3) Et = nn(Et)
                  else if (Lt === 4) {
                    ;(Lt = Et), (Et = rn(Lt)), (Lt = an(Lt))
                    for (var Ht = new Uint8Array(Et), Ct = 0; Ct < Et; Ct += 1)
                      Ht[Ct] = I[Lt + Ct]
                    Et = Ht
                  } else Et = null
                  ct.push(Et)
                }
                return ct
              }
              function a(R, tt) {
                ;(this.La = R), (this.db = tt), (this.Ja = 1), (this.fb = [])
              }
              function c(R, tt) {
                if (
                  ((this.db = tt),
                  (tt = A(R) + 1),
                  (this.Ya = ye(tt)),
                  this.Ya === null)
                )
                  throw Error('Unable to allocate memory for the SQL string')
                i(R, $, this.Ya, tt),
                  (this.eb = this.Ya),
                  (this.Ua = this.ib = null)
              }
              function y(R) {
                if (
                  ((this.filename =
                    'dbfile_' + ((4294967295 * Math.random()) >>> 0)),
                  R != null)
                ) {
                  var tt = this.filename,
                    ct = '/',
                    pt = tt
                  if (
                    (ct &&
                      ((ct = typeof ct == 'string' ? ct : ae(ct)),
                      (pt = tt ? st(ct + '/' + tt) : ct)),
                    (tt = dr(!0, !0)),
                    (pt = _e(
                      pt,
                      ((tt !== void 0 ? tt : 438) & 4095) | 32768,
                      0
                    )),
                    R)
                  ) {
                    if (typeof R == 'string') {
                      ct = Array(R.length)
                      for (var Et = 0, Lt = R.length; Et < Lt; ++Et)
                        ct[Et] = R.charCodeAt(Et)
                      R = ct
                    }
                    me(pt, tt | 146),
                      (ct = re(pt, 577)),
                      lr(ct, R, 0, R.length, 0),
                      Fe(ct),
                      me(pt, tt)
                  }
                }
                this.handleError(mt(this.filename, P)),
                  (this.db = J(P, 'i32')),
                  fn(this.db),
                  (this.Za = {}),
                  (this.Na = {})
              }
              var P = Zt(4),
                Z = r.cwrap,
                mt = Z('sqlite3_open', 'number', ['string', 'number']),
                vt = Z('sqlite3_close_v2', 'number', ['number']),
                bt = Z('sqlite3_exec', 'number', [
                  'number',
                  'string',
                  'number',
                  'number',
                  'number'
                ]),
                It = Z('sqlite3_changes', 'number', ['number']),
                $t = Z('sqlite3_prepare_v2', 'number', [
                  'number',
                  'string',
                  'number',
                  'number',
                  'number'
                ]),
                br = Z('sqlite3_sql', 'string', ['number']),
                Br = Z('sqlite3_normalized_sql', 'string', ['number']),
                yr = Z('sqlite3_prepare_v2', 'number', [
                  'number',
                  'number',
                  'number',
                  'number',
                  'number'
                ]),
                Mr = Z('sqlite3_bind_text', 'number', [
                  'number',
                  'number',
                  'number',
                  'number',
                  'number'
                ]),
                wr = Z('sqlite3_bind_blob', 'number', [
                  'number',
                  'number',
                  'number',
                  'number',
                  'number'
                ]),
                jr = Z('sqlite3_bind_double', 'number', [
                  'number',
                  'number',
                  'number'
                ]),
                Gr = Z('sqlite3_bind_int', 'number', [
                  'number',
                  'number',
                  'number'
                ]),
                Pr = Z('sqlite3_bind_parameter_index', 'number', [
                  'number',
                  'string'
                ]),
                Hr = Z('sqlite3_step', 'number', ['number']),
                $r = Z('sqlite3_errmsg', 'string', ['number']),
                qr = Z('sqlite3_column_count', 'number', ['number']),
                Wr = Z('sqlite3_data_count', 'number', ['number']),
                Xr = Z('sqlite3_column_double', 'number', ['number', 'number']),
                vr = Z('sqlite3_column_text', 'string', ['number', 'number']),
                Yr = Z('sqlite3_column_blob', 'number', ['number', 'number']),
                Zr = Z('sqlite3_column_bytes', 'number', ['number', 'number']),
                Kr = Z('sqlite3_column_type', 'number', ['number', 'number']),
                Jr = Z('sqlite3_column_name', 'string', ['number', 'number']),
                Vr = Z('sqlite3_reset', 'number', ['number']),
                Qr = Z('sqlite3_clear_bindings', 'number', ['number']),
                tn = Z('sqlite3_finalize', 'number', ['number']),
                Lr = Z(
                  'sqlite3_create_function_v2',
                  'number',
                  'number string number number number number number number number'.split(
                    ' '
                  )
                ),
                en = Z('sqlite3_value_type', 'number', ['number']),
                rn = Z('sqlite3_value_bytes', 'number', ['number']),
                nn = Z('sqlite3_value_text', 'string', ['number']),
                an = Z('sqlite3_value_blob', 'number', ['number']),
                sn = Z('sqlite3_value_double', 'number', ['number']),
                on = Z('sqlite3_result_double', '', ['number', 'number']),
                Tr = Z('sqlite3_result_null', '', ['number']),
                un = Z('sqlite3_result_text', '', [
                  'number',
                  'string',
                  'number',
                  'number'
                ]),
                ln = Z('sqlite3_result_blob', '', [
                  'number',
                  'number',
                  'number',
                  'number'
                ]),
                cn = Z('sqlite3_result_int', '', ['number', 'number']),
                Le = Z('sqlite3_result_error', '', [
                  'number',
                  'string',
                  'number'
                ]),
                Sr = Z('sqlite3_aggregate_context', 'number', [
                  'number',
                  'number'
                ]),
                fn = Z('RegisterExtensionFunctions', 'number', ['number'])
              ;(a.prototype.bind = function (R) {
                if (!this.La) throw 'Statement closed'
                return (
                  this.reset(),
                  Array.isArray(R)
                    ? this.xb(R)
                    : R != null && typeof R == 'object'
                    ? this.yb(R)
                    : !0
                )
              }),
                (a.prototype.step = function () {
                  if (!this.La) throw 'Statement closed'
                  this.Ja = 1
                  var R = Hr(this.La)
                  switch (R) {
                    case 100:
                      return !0
                    case 101:
                      return !1
                    default:
                      throw this.db.handleError(R)
                  }
                }),
                (a.prototype.sb = function (R) {
                  return (
                    R == null && ((R = this.Ja), (this.Ja += 1)), Xr(this.La, R)
                  )
                }),
                (a.prototype.Cb = function (R) {
                  if (
                    (R == null && ((R = this.Ja), (this.Ja += 1)),
                    (R = vr(this.La, R)),
                    typeof BigInt != 'function')
                  )
                    throw Error('BigInt is not supported')
                  return BigInt(R)
                }),
                (a.prototype.Db = function (R) {
                  return (
                    R == null && ((R = this.Ja), (this.Ja += 1)), vr(this.La, R)
                  )
                }),
                (a.prototype.getBlob = function (R) {
                  R == null && ((R = this.Ja), (this.Ja += 1))
                  var tt = Zr(this.La, R)
                  R = Yr(this.La, R)
                  for (var ct = new Uint8Array(tt), pt = 0; pt < tt; pt += 1)
                    ct[pt] = I[R + pt]
                  return ct
                }),
                (a.prototype.get = function (R, tt) {
                  ;(tt = tt || {}),
                    R != null && this.bind(R) && this.step(),
                    (R = [])
                  for (var ct = Wr(this.La), pt = 0; pt < ct; pt += 1)
                    switch (Kr(this.La, pt)) {
                      case 1:
                        var Et = tt.useBigInt ? this.Cb(pt) : this.sb(pt)
                        R.push(Et)
                        break
                      case 2:
                        R.push(this.sb(pt))
                        break
                      case 3:
                        R.push(this.Db(pt))
                        break
                      case 4:
                        R.push(this.getBlob(pt))
                        break
                      default:
                        R.push(null)
                    }
                  return R
                }),
                (a.prototype.getColumnNames = function () {
                  for (var R = [], tt = qr(this.La), ct = 0; ct < tt; ct += 1)
                    R.push(Jr(this.La, ct))
                  return R
                }),
                (a.prototype.getAsObject = function (R, tt) {
                  ;(R = this.get(R, tt)), (tt = this.getColumnNames())
                  for (var ct = {}, pt = 0; pt < tt.length; pt += 1)
                    ct[tt[pt]] = R[pt]
                  return ct
                }),
                (a.prototype.getSQL = function () {
                  return br(this.La)
                }),
                (a.prototype.getNormalizedSQL = function () {
                  return Br(this.La)
                }),
                (a.prototype.run = function (R) {
                  return R != null && this.bind(R), this.step(), this.reset()
                }),
                (a.prototype.nb = function (R, tt) {
                  tt == null && ((tt = this.Ja), (this.Ja += 1)), (R = Dt(R))
                  var ct = Ge(R)
                  this.fb.push(ct),
                    this.db.handleError(Mr(this.La, tt, ct, R.length - 1, 0))
                }),
                (a.prototype.wb = function (R, tt) {
                  tt == null && ((tt = this.Ja), (this.Ja += 1))
                  var ct = Ge(R)
                  this.fb.push(ct),
                    this.db.handleError(wr(this.La, tt, ct, R.length, 0))
                }),
                (a.prototype.mb = function (R, tt) {
                  tt == null && ((tt = this.Ja), (this.Ja += 1)),
                    this.db.handleError(
                      (R === (R | 0) ? Gr : jr)(this.La, tt, R)
                    )
                }),
                (a.prototype.zb = function (R) {
                  R == null && ((R = this.Ja), (this.Ja += 1)),
                    wr(this.La, R, 0, 0, 0)
                }),
                (a.prototype.ob = function (R, tt) {
                  switch (
                    (tt == null && ((tt = this.Ja), (this.Ja += 1)), typeof R)
                  ) {
                    case 'string':
                      this.nb(R, tt)
                      return
                    case 'number':
                      this.mb(R, tt)
                      return
                    case 'bigint':
                      this.nb(R.toString(), tt)
                      return
                    case 'boolean':
                      this.mb(R + 0, tt)
                      return
                    case 'object':
                      if (R === null) {
                        this.zb(tt)
                        return
                      }
                      if (R.length != null) {
                        this.wb(R, tt)
                        return
                      }
                  }
                  throw (
                    'Wrong API use : tried to bind a value of an unknown type (' +
                    R +
                    ').'
                  )
                }),
                (a.prototype.yb = function (R) {
                  var tt = this
                  return (
                    Object.keys(R).forEach(function (ct) {
                      var pt = Pr(tt.La, ct)
                      pt !== 0 && tt.ob(R[ct], pt)
                    }),
                    !0
                  )
                }),
                (a.prototype.xb = function (R) {
                  for (var tt = 0; tt < R.length; tt += 1)
                    this.ob(R[tt], tt + 1)
                  return !0
                }),
                (a.prototype.reset = function () {
                  return this.freemem(), Qr(this.La) === 0 && Vr(this.La) === 0
                }),
                (a.prototype.freemem = function () {
                  for (var R; (R = this.fb.pop()) !== void 0; ) we(R)
                }),
                (a.prototype.free = function () {
                  this.freemem()
                  var R = tn(this.La) === 0
                  return delete this.db.Za[this.La], (this.La = 0), R
                }),
                (c.prototype.next = function () {
                  if (this.Ya === null) return { done: !0 }
                  if (
                    (this.Ua !== null && (this.Ua.free(), (this.Ua = null)),
                    !this.db.db)
                  )
                    throw (this.gb(), Error('Database closed'))
                  var R = ce(),
                    tt = Zt(4)
                  C(P), C(tt)
                  try {
                    this.db.handleError(yr(this.db.db, this.eb, -1, P, tt)),
                      (this.eb = J(tt, 'i32'))
                    var ct = J(P, 'i32')
                    return ct === 0
                      ? (this.gb(), { done: !0 })
                      : ((this.Ua = new a(ct, this.db)),
                        (this.db.Za[ct] = this.Ua),
                        { value: this.Ua, done: !1 })
                  } catch (pt) {
                    throw ((this.ib = k(this.eb)), this.gb(), pt)
                  } finally {
                    fe(R)
                  }
                }),
                (c.prototype.gb = function () {
                  we(this.Ya), (this.Ya = null)
                }),
                (c.prototype.getRemainingSQL = function () {
                  return this.ib !== null ? this.ib : k(this.eb)
                }),
                typeof Symbol == 'function' &&
                  typeof Symbol.iterator == 'symbol' &&
                  (c.prototype[Symbol.iterator] = function () {
                    return this
                  }),
                (y.prototype.run = function (R, tt) {
                  if (!this.db) throw 'Database closed'
                  if (tt) {
                    R = this.prepare(R, tt)
                    try {
                      R.step()
                    } finally {
                      R.free()
                    }
                  } else this.handleError(bt(this.db, R, 0, 0, P))
                  return this
                }),
                (y.prototype.exec = function (R, tt, ct) {
                  if (!this.db) throw 'Database closed'
                  var pt = ce(),
                    Et = null
                  try {
                    var Lt = A(R) + 1,
                      Ht = Zt(Lt)
                    i(R, I, Ht, Lt)
                    var Ct = Ht,
                      zt = Zt(4)
                    for (R = []; J(Ct, 'i8') !== 0; ) {
                      C(P), C(zt), this.handleError(yr(this.db, Ct, -1, P, zt))
                      var Bt = J(P, 'i32')
                      if (((Ct = J(zt, 'i32')), Bt !== 0)) {
                        for (
                          Lt = null,
                            Et = new a(Bt, this),
                            tt != null && Et.bind(tt);
                          Et.step();

                        )
                          Lt === null &&
                            ((Lt = {
                              columns: Et.getColumnNames(),
                              values: []
                            }),
                            R.push(Lt)),
                            Lt.values.push(Et.get(null, ct))
                        Et.free()
                      }
                    }
                    return R
                  } catch (de) {
                    throw (Et && Et.free(), de)
                  } finally {
                    fe(pt)
                  }
                }),
                (y.prototype.each = function (R, tt, ct, pt, Et) {
                  typeof tt == 'function' &&
                    ((pt = ct), (ct = tt), (tt = void 0)),
                    (R = this.prepare(R, tt))
                  try {
                    for (; R.step(); ) ct(R.getAsObject(null, Et))
                  } finally {
                    R.free()
                  }
                  if (typeof pt == 'function') return pt()
                }),
                (y.prototype.prepare = function (R, tt) {
                  if (
                    (C(P),
                    this.handleError($t(this.db, R, -1, P, 0)),
                    (R = J(P, 'i32')),
                    R === 0)
                  )
                    throw 'Nothing to prepare'
                  var ct = new a(R, this)
                  return tt != null && ct.bind(tt), (this.Za[R] = ct)
                }),
                (y.prototype.iterateStatements = function (R) {
                  return new c(R, this)
                }),
                (y.prototype.export = function () {
                  Object.values(this.Za).forEach(function (tt) {
                    tt.free()
                  }),
                    Object.values(this.Na).forEach(le),
                    (this.Na = {}),
                    this.handleError(vt(this.db))
                  var R = xr(this.filename)
                  return (
                    this.handleError(mt(this.filename, P)),
                    (this.db = J(P, 'i32')),
                    R
                  )
                }),
                (y.prototype.close = function () {
                  this.db !== null &&
                    (Object.values(this.Za).forEach(function (R) {
                      R.free()
                    }),
                    Object.values(this.Na).forEach(le),
                    (this.Na = {}),
                    this.handleError(vt(this.db)),
                    nr('/' + this.filename),
                    (this.db = null))
                }),
                (y.prototype.handleError = function (R) {
                  if (R === 0) return null
                  throw ((R = $r(this.db)), Error(R))
                }),
                (y.prototype.getRowsModified = function () {
                  return It(this.db)
                }),
                (y.prototype.create_function = function (R, tt) {
                  Object.prototype.hasOwnProperty.call(this.Na, R) &&
                    (le(this.Na[R]), delete this.Na[R])
                  var ct = je(function (pt, Et, Lt) {
                    Et = e(Et, Lt)
                    try {
                      var Ht = tt.apply(null, Et)
                    } catch (Ct) {
                      Le(pt, Ct, -1)
                      return
                    }
                    t(pt, Ht)
                  }, 'viii')
                  return (
                    (this.Na[R] = ct),
                    this.handleError(
                      Lr(this.db, R, tt.length, 1, 0, ct, 0, 0, 0)
                    ),
                    this
                  )
                }),
                (y.prototype.create_aggregate = function (R, tt) {
                  var ct =
                      tt.init ||
                      function () {
                        return null
                      },
                    pt =
                      tt.finalize ||
                      function (zt) {
                        return zt
                      },
                    Et = tt.step
                  if (!Et)
                    throw (
                      'An aggregate function must have a step function in ' + R
                    )
                  var Lt = {}
                  Object.hasOwnProperty.call(this.Na, R) &&
                    (le(this.Na[R]), delete this.Na[R]),
                    (tt = R + '__finalize'),
                    Object.hasOwnProperty.call(this.Na, tt) &&
                      (le(this.Na[tt]), delete this.Na[tt])
                  var Ht = je(function (zt, Bt, de) {
                      var Qt = Sr(zt, 1)
                      Object.hasOwnProperty.call(Lt, Qt) || (Lt[Qt] = ct()),
                        (Bt = e(Bt, de)),
                        (Bt = [Lt[Qt]].concat(Bt))
                      try {
                        Lt[Qt] = Et.apply(null, Bt)
                      } catch (dn) {
                        delete Lt[Qt], Le(zt, dn, -1)
                      }
                    }, 'viii'),
                    Ct = je(function (zt) {
                      var Bt = Sr(zt, 1)
                      try {
                        var de = pt(Lt[Bt])
                      } catch (Qt) {
                        delete Lt[Bt], Le(zt, Qt, -1)
                        return
                      }
                      t(zt, de), delete Lt[Bt]
                    }, 'vi')
                  return (
                    (this.Na[R] = Ht),
                    (this.Na[tt] = Ct),
                    this.handleError(
                      Lr(this.db, R, Et.length - 1, 1, 0, 0, Ht, Ct, 0)
                    ),
                    this
                  )
                }),
                (r.Database = y)
            })
          var L = Object.assign({}, r),
            b = './this.program',
            T = typeof window == 'object',
            l = typeof importScripts == 'function',
            g =
              typeof process == 'object' &&
              typeof process.versions == 'object' &&
              typeof process.versions.node == 'string',
            o = '',
            p,
            f,
            E,
            U,
            x,
            O
          g
            ? ((o = l ? Te.dirname(o) + '/' : __dirname + '/'),
              (O = () => {
                x || ((U = Te), (x = Te))
              }),
              (p = function (t, e) {
                return (
                  O(),
                  (t = x.normalize(t)),
                  U.readFileSync(t, e ? void 0 : 'utf8')
                )
              }),
              (E = (t) => (
                (t = p(t, !0)), t.buffer || (t = new Uint8Array(t)), t
              )),
              (f = (t, e, a) => {
                O(),
                  (t = x.normalize(t)),
                  U.readFile(t, function (c, y) {
                    c ? a(c) : e(y.buffer)
                  })
              }),
              1 < process.argv.length &&
                (b = process.argv[1].replace(/\\/g, '/')),
              process.argv.slice(2),
              (at.exports = r),
              (r.inspect = function () {
                return '[Emscripten Module object]'
              }))
            : (T || l) &&
              (l
                ? (o = self.location.href)
                : typeof document < 'u' &&
                  document.currentScript &&
                  (o = document.currentScript.src),
              (o =
                o.indexOf('blob:') !== 0
                  ? o.substr(0, o.replace(/[?#].*/, '').lastIndexOf('/') + 1)
                  : ''),
              (p = (t) => {
                var e = new XMLHttpRequest()
                return e.open('GET', t, !1), e.send(null), e.responseText
              }),
              l &&
                (E = (t) => {
                  var e = new XMLHttpRequest()
                  return (
                    e.open('GET', t, !1),
                    (e.responseType = 'arraybuffer'),
                    e.send(null),
                    new Uint8Array(e.response)
                  )
                }),
              (f = (t, e, a) => {
                var c = new XMLHttpRequest()
                c.open('GET', t, !0),
                  (c.responseType = 'arraybuffer'),
                  (c.onload = () => {
                    c.status == 200 || (c.status == 0 && c.response)
                      ? e(c.response)
                      : a()
                  }),
                  (c.onerror = a),
                  c.send(null)
              }))
          var q = r.print || console.log.bind(console),
            G = r.printErr || console.warn.bind(console)
          Object.assign(r, L), (L = null), r.thisProgram && (b = r.thisProgram)
          var Q
          r.wasmBinary && (Q = r.wasmBinary),
            r.noExitRuntime,
            typeof WebAssembly != 'object' &&
              At('no native wasm support detected')
          var z,
            W = !1,
            lt = typeof TextDecoder < 'u' ? new TextDecoder('utf8') : void 0
          function w(t, e, a) {
            var c = e + a
            for (a = e; t[a] && !(a >= c); ) ++a
            if (16 < a - e && t.buffer && lt) return lt.decode(t.subarray(e, a))
            for (c = ''; e < a; ) {
              var y = t[e++]
              if (y & 128) {
                var P = t[e++] & 63
                if ((y & 224) == 192)
                  c += String.fromCharCode(((y & 31) << 6) | P)
                else {
                  var Z = t[e++] & 63
                  ;(y =
                    (y & 240) == 224
                      ? ((y & 15) << 12) | (P << 6) | Z
                      : ((y & 7) << 18) | (P << 12) | (Z << 6) | (t[e++] & 63)),
                    65536 > y
                      ? (c += String.fromCharCode(y))
                      : ((y -= 65536),
                        (c += String.fromCharCode(
                          55296 | (y >> 10),
                          56320 | (y & 1023)
                        )))
                }
              } else c += String.fromCharCode(y)
            }
            return c
          }
          function k(t, e) {
            return t ? w($, t, e) : ''
          }
          function i(t, e, a, c) {
            if (!(0 < c)) return 0
            var y = a
            c = a + c - 1
            for (var P = 0; P < t.length; ++P) {
              var Z = t.charCodeAt(P)
              if (55296 <= Z && 57343 >= Z) {
                var mt = t.charCodeAt(++P)
                Z = (65536 + ((Z & 1023) << 10)) | (mt & 1023)
              }
              if (127 >= Z) {
                if (a >= c) break
                e[a++] = Z
              } else {
                if (2047 >= Z) {
                  if (a + 1 >= c) break
                  e[a++] = 192 | (Z >> 6)
                } else {
                  if (65535 >= Z) {
                    if (a + 2 >= c) break
                    e[a++] = 224 | (Z >> 12)
                  } else {
                    if (a + 3 >= c) break
                    ;(e[a++] = 240 | (Z >> 18)),
                      (e[a++] = 128 | ((Z >> 12) & 63))
                  }
                  e[a++] = 128 | ((Z >> 6) & 63)
                }
                e[a++] = 128 | (Z & 63)
              }
            }
            return (e[a] = 0), a - y
          }
          function A(t) {
            for (var e = 0, a = 0; a < t.length; ++a) {
              var c = t.charCodeAt(a)
              127 >= c
                ? e++
                : 2047 >= c
                ? (e += 2)
                : 55296 <= c && 57343 >= c
                ? ((e += 4), ++a)
                : (e += 3)
            }
            return e
          }
          var rt, I, $, M, H, D, F, ot
          function et() {
            var t = z.buffer
            ;(rt = t),
              (r.HEAP8 = I = new Int8Array(t)),
              (r.HEAP16 = M = new Int16Array(t)),
              (r.HEAP32 = H = new Int32Array(t)),
              (r.HEAPU8 = $ = new Uint8Array(t)),
              (r.HEAPU16 = new Uint16Array(t)),
              (r.HEAPU32 = D = new Uint32Array(t)),
              (r.HEAPF32 = F = new Float32Array(t)),
              (r.HEAPF64 = ot = new Float64Array(t))
          }
          var K,
            yt = [],
            Tt = [],
            ht = []
          function dt() {
            var t = r.preRun.shift()
            yt.unshift(t)
          }
          var Nt = 0,
            wt = null
          function At(t) {
            throw (
              (r.onAbort && r.onAbort(t),
              (t = 'Aborted(' + t + ')'),
              G(t),
              (W = !0),
              new WebAssembly.RuntimeError(
                t + '. Build with -sASSERTIONS for more info.'
              ))
            )
          }
          function Ot() {
            return n.startsWith('data:application/octet-stream;base64,')
          }
          var n
          if (((n = 'sql-wasm.wasm'), !Ot())) {
            var Y = n
            n = r.locateFile ? r.locateFile(Y, o) : o + Y
          }
          function j() {
            var t = n
            try {
              if (t == n && Q) return new Uint8Array(Q)
              if (E) return E(t)
              throw 'both async and sync fetching of the wasm failed'
            } catch (e) {
              At(e)
            }
          }
          function N() {
            if (!Q && (T || l)) {
              if (typeof fetch == 'function' && !n.startsWith('file://'))
                return fetch(n, { credentials: 'same-origin' })
                  .then(function (t) {
                    if (!t.ok)
                      throw "failed to load wasm binary file at '" + n + "'"
                    return t.arrayBuffer()
                  })
                  .catch(function () {
                    return j()
                  })
              if (f)
                return new Promise(function (t, e) {
                  f(
                    n,
                    function (a) {
                      t(new Uint8Array(a))
                    },
                    e
                  )
                })
            }
            return Promise.resolve().then(function () {
              return j()
            })
          }
          var u, S
          function V(t) {
            for (; 0 < t.length; ) t.shift()(r)
          }
          function J(t, e = 'i8') {
            switch ((e.endsWith('*') && (e = '*'), e)) {
              case 'i1':
                return I[t >> 0]
              case 'i8':
                return I[t >> 0]
              case 'i16':
                return M[t >> 1]
              case 'i32':
                return H[t >> 2]
              case 'i64':
                return H[t >> 2]
              case 'float':
                return F[t >> 2]
              case 'double':
                return ot[t >> 3]
              case '*':
                return D[t >> 2]
              default:
                At('invalid type for getValue: ' + e)
            }
            return null
          }
          function C(t) {
            var e = 'i32'
            switch ((e.endsWith('*') && (e = '*'), e)) {
              case 'i1':
                I[t >> 0] = 0
                break
              case 'i8':
                I[t >> 0] = 0
                break
              case 'i16':
                M[t >> 1] = 0
                break
              case 'i32':
                H[t >> 2] = 0
                break
              case 'i64':
                ;(S = [
                  0,
                  ((u = 0),
                  1 <= +Math.abs(u)
                    ? 0 < u
                      ? (Math.min(+Math.floor(u / 4294967296), 4294967295) |
                          0) >>>
                        0
                      : ~~+Math.ceil((u - +(~~u >>> 0)) / 4294967296) >>> 0
                    : 0)
                ]),
                  (H[t >> 2] = S[0]),
                  (H[(t + 4) >> 2] = S[1])
                break
              case 'float':
                F[t >> 2] = 0
                break
              case 'double':
                ot[t >> 3] = 0
                break
              case '*':
                D[t >> 2] = 0
                break
              default:
                At('invalid type for setValue: ' + e)
            }
          }
          var nt = (t, e) => {
              for (var a = 0, c = t.length - 1; 0 <= c; c--) {
                var y = t[c]
                y === '.'
                  ? t.splice(c, 1)
                  : y === '..'
                  ? (t.splice(c, 1), a++)
                  : a && (t.splice(c, 1), a--)
              }
              if (e) for (; a; a--) t.unshift('..')
              return t
            },
            st = (t) => {
              var e = t.charAt(0) === '/',
                a = t.substr(-1) === '/'
              return (
                (t = nt(
                  t.split('/').filter((c) => !!c),
                  !e
                ).join('/')) ||
                  e ||
                  (t = '.'),
                t && a && (t += '/'),
                (e ? '/' : '') + t
              )
            },
            it = (t) => {
              var e =
                /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
                  .exec(t)
                  .slice(1)
              return (
                (t = e[0]),
                (e = e[1]),
                !t && !e ? '.' : (e && (e = e.substr(0, e.length - 1)), t + e)
              )
            },
            ft = (t) => {
              if (t === '/') return '/'
              ;(t = st(t)), (t = t.replace(/\/$/, ''))
              var e = t.lastIndexOf('/')
              return e === -1 ? t : t.substr(e + 1)
            }
          function St() {
            if (
              typeof crypto == 'object' &&
              typeof crypto.getRandomValues == 'function'
            ) {
              var t = new Uint8Array(1)
              return () => (crypto.getRandomValues(t), t[0])
            }
            if (g)
              try {
                var e = Te
                return () => e.randomBytes(1)[0]
              } catch {}
            return () => At('randomDevice')
          }
          function gt() {
            for (
              var t = '', e = !1, a = arguments.length - 1;
              -1 <= a && !e;
              a--
            ) {
              if (((e = 0 <= a ? arguments[a] : '/'), typeof e != 'string'))
                throw new TypeError('Arguments to path.resolve must be strings')
              if (!e) return ''
              ;(t = e + '/' + t), (e = e.charAt(0) === '/')
            }
            return (
              (t = nt(
                t.split('/').filter((c) => !!c),
                !e
              ).join('/')),
              (e ? '/' : '') + t || '.'
            )
          }
          function Dt(t, e) {
            var a = Array(A(t) + 1)
            return (t = i(t, a, 0, a.length)), e && (a.length = t), a
          }
          var Wt = []
          function xt(t, e) {
            ;(Wt[t] = { input: [], output: [], Xa: e }), De(t, Kt)
          }
          var Kt = {
              open: function (t) {
                var e = Wt[t.node.rdev]
                if (!e) throw new X(43)
                ;(t.tty = e), (t.seekable = !1)
              },
              close: function (t) {
                t.tty.Xa.fsync(t.tty)
              },
              fsync: function (t) {
                t.tty.Xa.fsync(t.tty)
              },
              read: function (t, e, a, c) {
                if (!t.tty || !t.tty.Xa.tb) throw new X(60)
                for (var y = 0, P = 0; P < c; P++) {
                  try {
                    var Z = t.tty.Xa.tb(t.tty)
                  } catch {
                    throw new X(29)
                  }
                  if (Z === void 0 && y === 0) throw new X(6)
                  if (Z == null) break
                  y++, (e[a + P] = Z)
                }
                return y && (t.node.timestamp = Date.now()), y
              },
              write: function (t, e, a, c) {
                if (!t.tty || !t.tty.Xa.jb) throw new X(60)
                try {
                  for (var y = 0; y < c; y++) t.tty.Xa.jb(t.tty, e[a + y])
                } catch {
                  throw new X(29)
                }
                return c && (t.node.timestamp = Date.now()), y
              }
            },
            kt = {
              tb: function (t) {
                if (!t.input.length) {
                  var e = null
                  if (g) {
                    var a = Buffer.alloc(256),
                      c = 0
                    try {
                      c = U.readSync(process.stdin.fd, a, 0, 256, -1)
                    } catch (y) {
                      if (y.toString().includes('EOF')) c = 0
                      else throw y
                    }
                    0 < c ? (e = a.slice(0, c).toString('utf-8')) : (e = null)
                  } else
                    typeof window < 'u' && typeof window.prompt == 'function'
                      ? ((e = window.prompt('Input: ')),
                        e !== null &&
                          (e += `
`))
                      : typeof readline == 'function' &&
                        ((e = readline()),
                        e !== null &&
                          (e += `
`))
                  if (!e) return null
                  t.input = Dt(e, !0)
                }
                return t.input.shift()
              },
              jb: function (t, e) {
                e === null || e === 10
                  ? (q(w(t.output, 0)), (t.output = []))
                  : e != 0 && t.output.push(e)
              },
              fsync: function (t) {
                t.output &&
                  0 < t.output.length &&
                  (q(w(t.output, 0)), (t.output = []))
              }
            },
            te = {
              jb: function (t, e) {
                e === null || e === 10
                  ? (G(w(t.output, 0)), (t.output = []))
                  : e != 0 && t.output.push(e)
              },
              fsync: function (t) {
                t.output &&
                  0 < t.output.length &&
                  (G(w(t.output, 0)), (t.output = []))
              }
            },
            _t = {
              Qa: null,
              Ra: function () {
                return _t.createNode(null, '/', 16895, 0)
              },
              createNode: function (t, e, a, c) {
                if ((a & 61440) === 24576 || (a & 61440) === 4096)
                  throw new X(63)
                return (
                  _t.Qa ||
                    (_t.Qa = {
                      dir: {
                        node: {
                          Pa: _t.Ga.Pa,
                          Oa: _t.Ga.Oa,
                          lookup: _t.Ga.lookup,
                          ab: _t.Ga.ab,
                          rename: _t.Ga.rename,
                          unlink: _t.Ga.unlink,
                          rmdir: _t.Ga.rmdir,
                          readdir: _t.Ga.readdir,
                          symlink: _t.Ga.symlink
                        },
                        stream: { Ta: _t.Ha.Ta }
                      },
                      file: {
                        node: { Pa: _t.Ga.Pa, Oa: _t.Ga.Oa },
                        stream: {
                          Ta: _t.Ha.Ta,
                          read: _t.Ha.read,
                          write: _t.Ha.write,
                          lb: _t.Ha.lb,
                          bb: _t.Ha.bb,
                          cb: _t.Ha.cb
                        }
                      },
                      link: {
                        node: {
                          Pa: _t.Ga.Pa,
                          Oa: _t.Ga.Oa,
                          readlink: _t.Ga.readlink
                        },
                        stream: {}
                      },
                      pb: { node: { Pa: _t.Ga.Pa, Oa: _t.Ga.Oa }, stream: Fr }
                    }),
                  (a = Ke(t, e, a, c)),
                  (a.mode & 61440) === 16384
                    ? ((a.Ga = _t.Qa.dir.node),
                      (a.Ha = _t.Qa.dir.stream),
                      (a.Ia = {}))
                    : (a.mode & 61440) === 32768
                    ? ((a.Ga = _t.Qa.file.node),
                      (a.Ha = _t.Qa.file.stream),
                      (a.Ma = 0),
                      (a.Ia = null))
                    : (a.mode & 61440) === 40960
                    ? ((a.Ga = _t.Qa.link.node), (a.Ha = _t.Qa.link.stream))
                    : (a.mode & 61440) === 8192 &&
                      ((a.Ga = _t.Qa.pb.node), (a.Ha = _t.Qa.pb.stream)),
                  (a.timestamp = Date.now()),
                  t && ((t.Ia[e] = a), (t.timestamp = a.timestamp)),
                  a
                )
              },
              Jb: function (t) {
                return t.Ia
                  ? t.Ia.subarray
                    ? t.Ia.subarray(0, t.Ma)
                    : new Uint8Array(t.Ia)
                  : new Uint8Array(0)
              },
              qb: function (t, e) {
                var a = t.Ia ? t.Ia.length : 0
                a >= e ||
                  ((e = Math.max(e, (a * (1048576 > a ? 2 : 1.125)) >>> 0)),
                  a != 0 && (e = Math.max(e, 256)),
                  (a = t.Ia),
                  (t.Ia = new Uint8Array(e)),
                  0 < t.Ma && t.Ia.set(a.subarray(0, t.Ma), 0))
              },
              Gb: function (t, e) {
                if (t.Ma != e)
                  if (e == 0) (t.Ia = null), (t.Ma = 0)
                  else {
                    var a = t.Ia
                    ;(t.Ia = new Uint8Array(e)),
                      a && t.Ia.set(a.subarray(0, Math.min(e, t.Ma))),
                      (t.Ma = e)
                  }
              },
              Ga: {
                Pa: function (t) {
                  var e = {}
                  return (
                    (e.dev = (t.mode & 61440) === 8192 ? t.id : 1),
                    (e.ino = t.id),
                    (e.mode = t.mode),
                    (e.nlink = 1),
                    (e.uid = 0),
                    (e.gid = 0),
                    (e.rdev = t.rdev),
                    (t.mode & 61440) === 16384
                      ? (e.size = 4096)
                      : (t.mode & 61440) === 32768
                      ? (e.size = t.Ma)
                      : (t.mode & 61440) === 40960
                      ? (e.size = t.link.length)
                      : (e.size = 0),
                    (e.atime = new Date(t.timestamp)),
                    (e.mtime = new Date(t.timestamp)),
                    (e.ctime = new Date(t.timestamp)),
                    (e.Ab = 4096),
                    (e.blocks = Math.ceil(e.size / e.Ab)),
                    e
                  )
                },
                Oa: function (t, e) {
                  e.mode !== void 0 && (t.mode = e.mode),
                    e.timestamp !== void 0 && (t.timestamp = e.timestamp),
                    e.size !== void 0 && _t.Gb(t, e.size)
                },
                lookup: function () {
                  throw Xt[44]
                },
                ab: function (t, e, a, c) {
                  return _t.createNode(t, e, a, c)
                },
                rename: function (t, e, a) {
                  if ((t.mode & 61440) === 16384) {
                    try {
                      var c = Jt(e, a)
                    } catch {}
                    if (c) for (var y in c.Ia) throw new X(55)
                  }
                  delete t.parent.Ia[t.name],
                    (t.parent.timestamp = Date.now()),
                    (t.name = a),
                    (e.Ia[a] = t),
                    (e.timestamp = t.parent.timestamp),
                    (t.parent = e)
                },
                unlink: function (t, e) {
                  delete t.Ia[e], (t.timestamp = Date.now())
                },
                rmdir: function (t, e) {
                  var a = Jt(t, e),
                    c
                  for (c in a.Ia) throw new X(55)
                  delete t.Ia[e], (t.timestamp = Date.now())
                },
                readdir: function (t) {
                  var e = ['.', '..'],
                    a
                  for (a in t.Ia) t.Ia.hasOwnProperty(a) && e.push(a)
                  return e
                },
                symlink: function (t, e, a) {
                  return (t = _t.createNode(t, e, 41471, 0)), (t.link = a), t
                },
                readlink: function (t) {
                  if ((t.mode & 61440) !== 40960) throw new X(28)
                  return t.link
                }
              },
              Ha: {
                read: function (t, e, a, c, y) {
                  var P = t.node.Ia
                  if (y >= t.node.Ma) return 0
                  if (((t = Math.min(t.node.Ma - y, c)), 8 < t && P.subarray))
                    e.set(P.subarray(y, y + t), a)
                  else for (c = 0; c < t; c++) e[a + c] = P[y + c]
                  return t
                },
                write: function (t, e, a, c, y, P) {
                  if ((e.buffer === I.buffer && (P = !1), !c)) return 0
                  if (
                    ((t = t.node),
                    (t.timestamp = Date.now()),
                    e.subarray && (!t.Ia || t.Ia.subarray))
                  ) {
                    if (P) return (t.Ia = e.subarray(a, a + c)), (t.Ma = c)
                    if (t.Ma === 0 && y === 0)
                      return (t.Ia = e.slice(a, a + c)), (t.Ma = c)
                    if (y + c <= t.Ma)
                      return t.Ia.set(e.subarray(a, a + c), y), c
                  }
                  if ((_t.qb(t, y + c), t.Ia.subarray && e.subarray))
                    t.Ia.set(e.subarray(a, a + c), y)
                  else for (P = 0; P < c; P++) t.Ia[y + P] = e[a + P]
                  return (t.Ma = Math.max(t.Ma, y + c)), c
                },
                Ta: function (t, e, a) {
                  if (
                    (a === 1
                      ? (e += t.position)
                      : a === 2 &&
                        (t.node.mode & 61440) === 32768 &&
                        (e += t.node.Ma),
                    0 > e)
                  )
                    throw new X(28)
                  return e
                },
                lb: function (t, e, a) {
                  _t.qb(t.node, e + a), (t.node.Ma = Math.max(t.node.Ma, e + a))
                },
                bb: function (t, e, a, c, y) {
                  if ((t.node.mode & 61440) !== 32768) throw new X(43)
                  if (((t = t.node.Ia), y & 2 || t.buffer !== rt)) {
                    if (
                      ((0 < a || a + e < t.length) &&
                        (t.subarray
                          ? (t = t.subarray(a, a + e))
                          : (t = Array.prototype.slice.call(t, a, a + e))),
                      (a = !0),
                      (e = 65536 * Math.ceil(e / 65536)),
                      (y = gr(65536, e))
                        ? ($.fill(0, y, y + e), (e = y))
                        : (e = 0),
                      !e)
                    )
                      throw new X(48)
                    I.set(t, e)
                  } else (a = !1), (e = t.byteOffset)
                  return { Fb: e, vb: a }
                },
                cb: function (t, e, a, c, y) {
                  if ((t.node.mode & 61440) !== 32768) throw new X(43)
                  return y & 2 || _t.Ha.write(t, e, 0, c, a, !1), 0
                }
              }
            },
            Rt = null,
            ne = {},
            jt = [],
            ke = 1,
            Gt = null,
            ie = !0,
            X = null,
            Xt = {},
            Ft = (t, e = {}) => {
              if (((t = gt('/', t)), !t)) return { path: '', node: null }
              if (((e = Object.assign({ rb: !0, kb: 0 }, e)), 8 < e.kb))
                throw new X(32)
              t = nt(
                t.split('/').filter((Z) => !!Z),
                !1
              )
              for (var a = Rt, c = '/', y = 0; y < t.length; y++) {
                var P = y === t.length - 1
                if (P && e.parent) break
                if (
                  ((a = Jt(a, t[y])),
                  (c = st(c + '/' + t[y])),
                  a.Va && (!P || (P && e.rb)) && (a = a.Va.root),
                  !P || e.Sa)
                ) {
                  for (P = 0; (a.mode & 61440) === 40960; )
                    if (
                      ((a = ir(c)),
                      (c = gt(it(c), a)),
                      (a = Ft(c, { kb: e.kb + 1 }).node),
                      40 < P++)
                    )
                      throw new X(32)
                }
              }
              return { path: c, node: a }
            },
            ae = (t) => {
              for (var e; ; ) {
                if (t === t.parent)
                  return (
                    (t = t.Ra.ub),
                    e ? (t[t.length - 1] !== '/' ? t + '/' + e : t + e) : t
                  )
                ;(e = e ? t.name + '/' + e : t.name), (t = t.parent)
              }
            },
            Ie = (t, e) => {
              for (var a = 0, c = 0; c < e.length; c++)
                a = ((a << 5) - a + e.charCodeAt(c)) | 0
              return ((t + a) >>> 0) % Gt.length
            },
            Ze = (t) => {
              var e = Ie(t.parent.id, t.name)
              if (Gt[e] === t) Gt[e] = t.Wa
              else
                for (e = Gt[e]; e; ) {
                  if (e.Wa === t) {
                    e.Wa = t.Wa
                    break
                  }
                  e = e.Wa
                }
            },
            Jt = (t, e) => {
              var a
              if ((a = (a = ee(t, 'x')) ? a : t.Ga.lookup ? 0 : 2))
                throw new X(a, t)
              for (a = Gt[Ie(t.id, e)]; a; a = a.Wa) {
                var c = a.name
                if (a.parent.id === t.id && c === e) return a
              }
              return t.Ga.lookup(t, e)
            },
            Ke = (t, e, a, c) => (
              (t = new mr(t, e, a, c)),
              (e = Ie(t.parent.id, t.name)),
              (t.Wa = Gt[e]),
              (Gt[e] = t)
            ),
            Dr = { r: 0, 'r+': 2, w: 577, 'w+': 578, a: 1089, 'a+': 1090 },
            Je = (t) => {
              var e = ['r', 'w', 'rw'][t & 3]
              return t & 512 && (e += 'w'), e
            },
            ee = (t, e) => {
              if (ie) return 0
              if (!e.includes('r') || t.mode & 292) {
                if (
                  (e.includes('w') && !(t.mode & 146)) ||
                  (e.includes('x') && !(t.mode & 73))
                )
                  return 2
              } else return 2
              return 0
            },
            Ve = (t, e) => {
              try {
                return Jt(t, e), 20
              } catch {}
              return ee(t, 'wx')
            },
            Qe = (t, e, a) => {
              try {
                var c = Jt(t, e)
              } catch (y) {
                return y.Ka
              }
              if ((t = ee(t, 'wx'))) return t
              if (a) {
                if ((c.mode & 61440) !== 16384) return 54
                if (c === c.parent || ae(c) === '/') return 10
              } else if ((c.mode & 61440) === 16384) return 31
              return 0
            },
            Or = (t = 0) => {
              for (; 4096 >= t; t++) if (!jt[t]) return t
              throw new X(33)
            },
            tr = (t, e) => (
              ue ||
                ((ue = function () {
                  this.$a = {}
                }),
                (ue.prototype = {}),
                Object.defineProperties(ue.prototype, {
                  object: {
                    get: function () {
                      return this.node
                    },
                    set: function (a) {
                      this.node = a
                    }
                  },
                  flags: {
                    get: function () {
                      return this.$a.flags
                    },
                    set: function (a) {
                      this.$a.flags = a
                    }
                  },
                  position: {
                    get: function () {
                      return this.$a.position
                    },
                    set: function (a) {
                      this.$a.position = a
                    }
                  }
                })),
              (t = Object.assign(new ue(), t)),
              (e = Or(e)),
              (t.fd = e),
              (jt[e] = t)
            ),
            Fr = {
              open: (t) => {
                ;(t.Ha = ne[t.node.rdev].Ha), t.Ha.open && t.Ha.open(t)
              },
              Ta: () => {
                throw new X(70)
              }
            },
            De = (t, e) => {
              ne[t] = { Ha: e }
            },
            er = (t, e) => {
              var a = e === '/',
                c = !e
              if (a && Rt) throw new X(10)
              if (!a && !c) {
                var y = Ft(e, { rb: !1 })
                if (((e = y.path), (y = y.node), y.Va)) throw new X(10)
                if ((y.mode & 61440) !== 16384) throw new X(54)
              }
              ;(e = { type: t, Kb: {}, ub: e, Eb: [] }),
                (t = t.Ra(e)),
                (t.Ra = e),
                (e.root = t),
                a ? (Rt = t) : y && ((y.Va = e), y.Ra && y.Ra.Eb.push(e))
            },
            _e = (t, e, a) => {
              var c = Ft(t, { parent: !0 }).node
              if (((t = ft(t)), !t || t === '.' || t === '..')) throw new X(28)
              var y = Ve(c, t)
              if (y) throw new X(y)
              if (!c.Ga.ab) throw new X(63)
              return c.Ga.ab(c, t, e, a)
            },
            Pt = (t, e) => _e(t, ((e !== void 0 ? e : 511) & 1023) | 16384, 0),
            pe = (t, e, a) => {
              typeof a > 'u' && ((a = e), (e = 438)), _e(t, e | 8192, a)
            },
            Oe = (t, e) => {
              if (!gt(t)) throw new X(44)
              var a = Ft(e, { parent: !0 }).node
              if (!a) throw new X(44)
              e = ft(e)
              var c = Ve(a, e)
              if (c) throw new X(c)
              if (!a.Ga.symlink) throw new X(63)
              a.Ga.symlink(a, e, t)
            },
            rr = (t) => {
              var e = Ft(t, { parent: !0 }).node
              t = ft(t)
              var a = Jt(e, t),
                c = Qe(e, t, !0)
              if (c) throw new X(c)
              if (!e.Ga.rmdir) throw new X(63)
              if (a.Va) throw new X(10)
              e.Ga.rmdir(e, t), Ze(a)
            },
            nr = (t) => {
              var e = Ft(t, { parent: !0 }).node
              if (!e) throw new X(44)
              t = ft(t)
              var a = Jt(e, t),
                c = Qe(e, t, !1)
              if (c) throw new X(c)
              if (!e.Ga.unlink) throw new X(63)
              if (a.Va) throw new X(10)
              e.Ga.unlink(e, t), Ze(a)
            },
            ir = (t) => {
              if (((t = Ft(t).node), !t)) throw new X(44)
              if (!t.Ga.readlink) throw new X(28)
              return gt(ae(t.parent), t.Ga.readlink(t))
            },
            se = (t, e) => {
              if (((t = Ft(t, { Sa: !e }).node), !t)) throw new X(44)
              if (!t.Ga.Pa) throw new X(63)
              return t.Ga.Pa(t)
            },
            ar = (t) => se(t, !0),
            me = (t, e) => {
              if (
                ((t = typeof t == 'string' ? Ft(t, { Sa: !0 }).node : t),
                !t.Ga.Oa)
              )
                throw new X(63)
              t.Ga.Oa(t, {
                mode: (e & 4095) | (t.mode & -4096),
                timestamp: Date.now()
              })
            },
            sr = (t, e) => {
              if (0 > e) throw new X(28)
              if (
                ((t = typeof t == 'string' ? Ft(t, { Sa: !0 }).node : t),
                !t.Ga.Oa)
              )
                throw new X(63)
              if ((t.mode & 61440) === 16384) throw new X(31)
              if ((t.mode & 61440) !== 32768) throw new X(28)
              var a = ee(t, 'w')
              if (a) throw new X(a)
              t.Ga.Oa(t, { size: e, timestamp: Date.now() })
            },
            re = (t, e, a) => {
              if (t === '') throw new X(44)
              if (typeof e == 'string') {
                var c = Dr[e]
                if (typeof c > 'u') throw Error('Unknown file open mode: ' + e)
                e = c
              }
              if (
                ((a = e & 64 ? ((typeof a > 'u' ? 438 : a) & 4095) | 32768 : 0),
                typeof t == 'object')
              )
                var y = t
              else {
                t = st(t)
                try {
                  y = Ft(t, { Sa: !(e & 131072) }).node
                } catch {}
              }
              if (((c = !1), e & 64))
                if (y) {
                  if (e & 128) throw new X(20)
                } else (y = _e(t, a, 0)), (c = !0)
              if (!y) throw new X(44)
              if (
                ((y.mode & 61440) === 8192 && (e &= -513),
                e & 65536 && (y.mode & 61440) !== 16384)
              )
                throw new X(54)
              if (
                !c &&
                (a = y
                  ? (y.mode & 61440) === 40960
                    ? 32
                    : (y.mode & 61440) === 16384 && (Je(e) !== 'r' || e & 512)
                    ? 31
                    : ee(y, Je(e))
                  : 44)
              )
                throw new X(a)
              return (
                e & 512 && !c && sr(y, 0),
                (e &= -131713),
                (y = tr({
                  node: y,
                  path: ae(y),
                  flags: e,
                  seekable: !0,
                  position: 0,
                  Ha: y.Ha,
                  Ib: [],
                  error: !1
                })),
                y.Ha.open && y.Ha.open(y),
                !r.logReadFiles ||
                  e & 1 ||
                  (Ne || (Ne = {}), t in Ne || (Ne[t] = 1)),
                y
              )
            },
            Fe = (t) => {
              if (t.fd === null) throw new X(8)
              t.hb && (t.hb = null)
              try {
                t.Ha.close && t.Ha.close(t)
              } catch (e) {
                throw e
              } finally {
                jt[t.fd] = null
              }
              t.fd = null
            },
            or = (t, e, a) => {
              if (t.fd === null) throw new X(8)
              if (!t.seekable || !t.Ha.Ta) throw new X(70)
              if (a != 0 && a != 1 && a != 2) throw new X(28)
              ;(t.position = t.Ha.Ta(t, e, a)), (t.Ib = [])
            },
            ur = (t, e, a, c, y) => {
              if (0 > c || 0 > y) throw new X(28)
              if (t.fd === null) throw new X(8)
              if ((t.flags & 2097155) === 1) throw new X(8)
              if ((t.node.mode & 61440) === 16384) throw new X(31)
              if (!t.Ha.read) throw new X(28)
              var P = typeof y < 'u'
              if (!P) y = t.position
              else if (!t.seekable) throw new X(70)
              return (e = t.Ha.read(t, e, a, c, y)), P || (t.position += e), e
            },
            lr = (t, e, a, c, y) => {
              if (0 > c || 0 > y) throw new X(28)
              if (t.fd === null) throw new X(8)
              if (!(t.flags & 2097155)) throw new X(8)
              if ((t.node.mode & 61440) === 16384) throw new X(31)
              if (!t.Ha.write) throw new X(28)
              t.seekable && t.flags & 1024 && or(t, 0, 2)
              var P = typeof y < 'u'
              if (!P) y = t.position
              else if (!t.seekable) throw new X(70)
              return (
                (e = t.Ha.write(t, e, a, c, y, void 0)),
                P || (t.position += e),
                e
              )
            },
            xr = (t) => {
              var e,
                a = re(t, a || 0)
              t = se(t).size
              var c = new Uint8Array(t)
              return ur(a, c, 0, t, 0), (e = c), Fe(a), e
            },
            cr = () => {
              X ||
                ((X = function (t, e) {
                  ;(this.node = e),
                    (this.Hb = function (a) {
                      this.Ka = a
                    }),
                    this.Hb(t),
                    (this.message = 'FS error')
                }),
                (X.prototype = Error()),
                (X.prototype.constructor = X),
                [44].forEach((t) => {
                  ;(Xt[t] = new X(t)),
                    (Xt[t].stack = '<generic error, no stack>')
                }))
            },
            fr,
            dr = (t, e) => {
              var a = 0
              return t && (a |= 365), e && (a |= 146), a
            },
            oe = (t, e, a) => {
              t = st('/dev/' + t)
              var c = dr(!!e, !!a)
              xe || (xe = 64)
              var y = (xe++ << 8) | 0
              De(y, {
                open: (P) => {
                  P.seekable = !1
                },
                close: () => {
                  a && a.buffer && a.buffer.length && a(10)
                },
                read: (P, Z, mt, vt) => {
                  for (var bt = 0, It = 0; It < vt; It++) {
                    try {
                      var $t = e()
                    } catch {
                      throw new X(29)
                    }
                    if ($t === void 0 && bt === 0) throw new X(6)
                    if ($t == null) break
                    bt++, (Z[mt + It] = $t)
                  }
                  return bt && (P.node.timestamp = Date.now()), bt
                },
                write: (P, Z, mt, vt) => {
                  for (var bt = 0; bt < vt; bt++)
                    try {
                      a(Z[mt + bt])
                    } catch {
                      throw new X(29)
                    }
                  return vt && (P.node.timestamp = Date.now()), bt
                }
              }),
                pe(t, c, y)
            },
            xe,
            Ut = {},
            ue,
            Ne
          function Vt(t, e, a) {
            if (e.charAt(0) === '/') return e
            if (((t = t === -100 ? '/' : Mt(t).path), e.length == 0)) {
              if (!a) throw new X(44)
              return t
            }
            return st(t + '/' + e)
          }
          function ge(t, e, a) {
            try {
              var c = t(e)
            } catch (y) {
              if (y && y.node && st(e) !== st(ae(y.node))) return -54
              throw y
            }
            return (
              (H[a >> 2] = c.dev),
              (H[(a + 8) >> 2] = c.ino),
              (H[(a + 12) >> 2] = c.mode),
              (D[(a + 16) >> 2] = c.nlink),
              (H[(a + 20) >> 2] = c.uid),
              (H[(a + 24) >> 2] = c.gid),
              (H[(a + 28) >> 2] = c.rdev),
              (S = [
                c.size >>> 0,
                ((u = c.size),
                1 <= +Math.abs(u)
                  ? 0 < u
                    ? (Math.min(+Math.floor(u / 4294967296), 4294967295) |
                        0) >>>
                      0
                    : ~~+Math.ceil((u - +(~~u >>> 0)) / 4294967296) >>> 0
                  : 0)
              ]),
              (H[(a + 40) >> 2] = S[0]),
              (H[(a + 44) >> 2] = S[1]),
              (H[(a + 48) >> 2] = 4096),
              (H[(a + 52) >> 2] = c.blocks),
              (S = [
                Math.floor(c.atime.getTime() / 1e3) >>> 0,
                ((u = Math.floor(c.atime.getTime() / 1e3)),
                1 <= +Math.abs(u)
                  ? 0 < u
                    ? (Math.min(+Math.floor(u / 4294967296), 4294967295) |
                        0) >>>
                      0
                    : ~~+Math.ceil((u - +(~~u >>> 0)) / 4294967296) >>> 0
                  : 0)
              ]),
              (H[(a + 56) >> 2] = S[0]),
              (H[(a + 60) >> 2] = S[1]),
              (D[(a + 64) >> 2] = 0),
              (S = [
                Math.floor(c.mtime.getTime() / 1e3) >>> 0,
                ((u = Math.floor(c.mtime.getTime() / 1e3)),
                1 <= +Math.abs(u)
                  ? 0 < u
                    ? (Math.min(+Math.floor(u / 4294967296), 4294967295) |
                        0) >>>
                      0
                    : ~~+Math.ceil((u - +(~~u >>> 0)) / 4294967296) >>> 0
                  : 0)
              ]),
              (H[(a + 72) >> 2] = S[0]),
              (H[(a + 76) >> 2] = S[1]),
              (D[(a + 80) >> 2] = 0),
              (S = [
                Math.floor(c.ctime.getTime() / 1e3) >>> 0,
                ((u = Math.floor(c.ctime.getTime() / 1e3)),
                1 <= +Math.abs(u)
                  ? 0 < u
                    ? (Math.min(+Math.floor(u / 4294967296), 4294967295) |
                        0) >>>
                      0
                    : ~~+Math.ceil((u - +(~~u >>> 0)) / 4294967296) >>> 0
                  : 0)
              ]),
              (H[(a + 88) >> 2] = S[0]),
              (H[(a + 92) >> 2] = S[1]),
              (D[(a + 96) >> 2] = 0),
              (S = [
                c.ino >>> 0,
                ((u = c.ino),
                1 <= +Math.abs(u)
                  ? 0 < u
                    ? (Math.min(+Math.floor(u / 4294967296), 4294967295) |
                        0) >>>
                      0
                    : ~~+Math.ceil((u - +(~~u >>> 0)) / 4294967296) >>> 0
                  : 0)
              ]),
              (H[(a + 104) >> 2] = S[0]),
              (H[(a + 108) >> 2] = S[1]),
              0
            )
          }
          var Ee = void 0
          function be() {
            return (Ee += 4), H[(Ee - 4) >> 2]
          }
          function Mt(t) {
            if (((t = jt[t]), !t)) throw new X(8)
            return t
          }
          function Re(t) {
            return D[t >> 2] + 4294967296 * H[(t + 4) >> 2]
          }
          function hr(t) {
            var e = A(t) + 1,
              a = ye(e)
            return a && i(t, I, a, e), a
          }
          function Rr(t, e, a) {
            function c(vt) {
              return (vt = vt.toTimeString().match(/\(([A-Za-z ]+)\)$/))
                ? vt[1]
                : 'GMT'
            }
            var y = new Date().getFullYear(),
              P = new Date(y, 0, 1),
              Z = new Date(y, 6, 1)
            y = P.getTimezoneOffset()
            var mt = Z.getTimezoneOffset()
            ;(H[t >> 2] = 60 * Math.max(y, mt)),
              (H[e >> 2] = Number(y != mt)),
              (t = c(P)),
              (e = c(Z)),
              (t = hr(t)),
              (e = hr(e)),
              mt < y
                ? ((D[a >> 2] = t), (D[(a + 4) >> 2] = e))
                : ((D[a >> 2] = e), (D[(a + 4) >> 2] = t))
          }
          function Ce(t, e, a) {
            Ce.Bb || ((Ce.Bb = !0), Rr(t, e, a))
          }
          var _r
          _r = g
            ? () => {
                var t = process.hrtime()
                return 1e3 * t[0] + t[1] / 1e6
              }
            : () => performance.now()
          var ze = {}
          function pr() {
            if (!Be) {
              var t = {
                  USER: 'web_user',
                  LOGNAME: 'web_user',
                  PATH: '/',
                  PWD: '/',
                  HOME: '/home/web_user',
                  LANG:
                    (
                      (typeof navigator == 'object' &&
                        navigator.languages &&
                        navigator.languages[0]) ||
                      'C'
                    ).replace('-', '_') + '.UTF-8',
                  _: b || './this.program'
                },
                e
              for (e in ze) ze[e] === void 0 ? delete t[e] : (t[e] = ze[e])
              var a = []
              for (e in t) a.push(e + '=' + t[e])
              Be = a
            }
            return Be
          }
          var Be,
            Yt = void 0,
            Me = []
          function je(t, e) {
            if (!Yt) {
              Yt = new WeakMap()
              var a = K.length
              if (Yt)
                for (var c = 0; c < 0 + a; c++) {
                  var y = K.get(c)
                  y && Yt.set(y, c)
                }
            }
            if (Yt.has(t)) return Yt.get(t)
            if (Me.length) a = Me.pop()
            else {
              try {
                K.grow(1)
              } catch (mt) {
                throw mt instanceof RangeError
                  ? 'Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.'
                  : mt
              }
              a = K.length - 1
            }
            try {
              K.set(a, t)
            } catch (mt) {
              if (!(mt instanceof TypeError)) throw mt
              if (typeof WebAssembly.Function == 'function') {
                ;(c = WebAssembly.Function),
                  (y = { i: 'i32', j: 'i64', f: 'f32', d: 'f64', p: 'i32' })
                for (
                  var P = {
                      parameters: [],
                      results: e[0] == 'v' ? [] : [y[e[0]]]
                    },
                    Z = 1;
                  Z < e.length;
                  ++Z
                )
                  P.parameters.push(y[e[Z]])
                e = new c(P, t)
              } else {
                for (
                  c = [1, 96],
                    y = e.slice(0, 1),
                    e = e.slice(1),
                    P = { i: 127, p: 127, j: 126, f: 125, d: 124 },
                    Z = e.length,
                    128 > Z ? c.push(Z) : c.push(Z % 128 | 128, Z >> 7),
                    Z = 0;
                  Z < e.length;
                  ++Z
                )
                  c.push(P[e[Z]])
                y == 'v' ? c.push(0) : c.push(1, P[y]),
                  (e = [0, 97, 115, 109, 1, 0, 0, 0, 1]),
                  (y = c.length),
                  128 > y ? e.push(y) : e.push(y % 128 | 128, y >> 7),
                  e.push.apply(e, c),
                  e.push(2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0),
                  (e = new WebAssembly.Module(new Uint8Array(e))),
                  (e = new WebAssembly.Instance(e, { e: { f: t } }).exports.f)
              }
              K.set(a, e)
            }
            return Yt.set(t, a), a
          }
          function le(t) {
            Yt.delete(K.get(t)), Me.push(t)
          }
          function Ge(t) {
            var e = ye(t.length)
            return (
              t.subarray || t.slice || (t = new Uint8Array(t)), $.set(t, e), e
            )
          }
          function Cr(t, e, a, c) {
            var y = {
              string: (bt) => {
                var It = 0
                if (bt != null && bt !== 0) {
                  var $t = (bt.length << 2) + 1
                  ;(It = Zt($t)), i(bt, $, It, $t)
                }
                return It
              },
              array: (bt) => {
                var It = Zt(bt.length)
                return I.set(bt, It), It
              }
            }
            t = r['_' + t]
            var P = [],
              Z = 0
            if (c)
              for (var mt = 0; mt < c.length; mt++) {
                var vt = y[a[mt]]
                vt
                  ? (Z === 0 && (Z = ce()), (P[mt] = vt(c[mt])))
                  : (P[mt] = c[mt])
              }
            return (
              (a = t.apply(null, P)),
              (a = (function (bt) {
                return (
                  Z !== 0 && fe(Z),
                  e === 'string' ? k(bt) : e === 'boolean' ? !!bt : bt
                )
              })(a))
            )
          }
          function mr(t, e, a, c) {
            t || (t = this),
              (this.parent = t),
              (this.Ra = t.Ra),
              (this.Va = null),
              (this.id = ke++),
              (this.name = e),
              (this.mode = a),
              (this.Ga = {}),
              (this.Ha = {}),
              (this.rdev = c)
          }
          Object.defineProperties(mr.prototype, {
            read: {
              get: function () {
                return (this.mode & 365) === 365
              },
              set: function (t) {
                t ? (this.mode |= 365) : (this.mode &= -366)
              }
            },
            write: {
              get: function () {
                return (this.mode & 146) === 146
              },
              set: function (t) {
                t ? (this.mode |= 146) : (this.mode &= -147)
              }
            }
          }),
            cr(),
            (Gt = Array(4096)),
            er(_t, '/'),
            Pt('/tmp'),
            Pt('/home'),
            Pt('/home/web_user'),
            (() => {
              Pt('/dev'),
                De(259, { read: () => 0, write: (e, a, c, y) => y }),
                pe('/dev/null', 259),
                xt(1280, kt),
                xt(1536, te),
                pe('/dev/tty', 1280),
                pe('/dev/tty1', 1536)
              var t = St()
              oe('random', t),
                oe('urandom', t),
                Pt('/dev/shm'),
                Pt('/dev/shm/tmp')
            })(),
            (() => {
              Pt('/proc')
              var t = Pt('/proc/self')
              Pt('/proc/self/fd'),
                er(
                  {
                    Ra: () => {
                      var e = Ke(t, 'fd', 16895, 73)
                      return (
                        (e.Ga = {
                          lookup: (a, c) => {
                            var y = jt[+c]
                            if (!y) throw new X(8)
                            return (
                              (a = {
                                parent: null,
                                Ra: { ub: 'fake' },
                                Ga: { readlink: () => y.path }
                              }),
                              (a.parent = a)
                            )
                          }
                        }),
                        e
                      )
                    }
                  },
                  '/proc/self/fd'
                )
            })()
          var zr = {
            a: function (t, e, a, c) {
              At(
                'Assertion failed: ' +
                  k(t) +
                  ', at: ' +
                  [
                    e ? k(e) : 'unknown filename',
                    a,
                    c ? k(c) : 'unknown function'
                  ]
              )
            },
            h: function (t, e) {
              try {
                return (t = k(t)), me(t, e), 0
              } catch (a) {
                if (typeof Ut > 'u' || !(a instanceof X)) throw a
                return -a.Ka
              }
            },
            H: function (t, e, a) {
              try {
                if (((e = k(e)), (e = Vt(t, e)), a & -8)) return -28
                var c = Ft(e, { Sa: !0 }).node
                return c
                  ? ((t = ''),
                    a & 4 && (t += 'r'),
                    a & 2 && (t += 'w'),
                    a & 1 && (t += 'x'),
                    t && ee(c, t) ? -2 : 0)
                  : -44
              } catch (y) {
                if (typeof Ut > 'u' || !(y instanceof X)) throw y
                return -y.Ka
              }
            },
            i: function (t, e) {
              try {
                var a = jt[t]
                if (!a) throw new X(8)
                return me(a.node, e), 0
              } catch (c) {
                if (typeof Ut > 'u' || !(c instanceof X)) throw c
                return -c.Ka
              }
            },
            g: function (t) {
              try {
                var e = jt[t]
                if (!e) throw new X(8)
                var a = e.node,
                  c = typeof a == 'string' ? Ft(a, { Sa: !0 }).node : a
                if (!c.Ga.Oa) throw new X(63)
                return c.Ga.Oa(c, { timestamp: Date.now() }), 0
              } catch (y) {
                if (typeof Ut > 'u' || !(y instanceof X)) throw y
                return -y.Ka
              }
            },
            b: function (t, e, a) {
              Ee = a
              try {
                var c = Mt(t)
                switch (e) {
                  case 0:
                    var y = be()
                    return 0 > y ? -28 : tr(c, y).fd
                  case 1:
                  case 2:
                    return 0
                  case 3:
                    return c.flags
                  case 4:
                    return (y = be()), (c.flags |= y), 0
                  case 5:
                    return (y = be()), (M[(y + 0) >> 1] = 2), 0
                  case 6:
                  case 7:
                    return 0
                  case 16:
                  case 8:
                    return -28
                  case 9:
                    return (H[Nr() >> 2] = 28), -1
                  default:
                    return -28
                }
              } catch (P) {
                if (typeof Ut > 'u' || !(P instanceof X)) throw P
                return -P.Ka
              }
            },
            G: function (t, e) {
              try {
                var a = Mt(t)
                return ge(se, a.path, e)
              } catch (c) {
                if (typeof Ut > 'u' || !(c instanceof X)) throw c
                return -c.Ka
              }
            },
            l: function (t, e, a) {
              try {
                if (
                  ((e =
                    (a + 2097152) >>> 0 < 4194305 - !!e
                      ? (e >>> 0) + 4294967296 * a
                      : NaN),
                  isNaN(e))
                )
                  return -61
                var c = jt[t]
                if (!c) throw new X(8)
                if (!(c.flags & 2097155)) throw new X(28)
                return sr(c.node, e), 0
              } catch (y) {
                if (typeof Ut > 'u' || !(y instanceof X)) throw y
                return -y.Ka
              }
            },
            B: function (t, e) {
              try {
                if (e === 0) return -28
                var a = A('/') + 1
                return e < a ? -68 : (i('/', $, t, e), a)
              } catch (c) {
                if (typeof Ut > 'u' || !(c instanceof X)) throw c
                return -c.Ka
              }
            },
            E: function (t, e) {
              try {
                return (t = k(t)), ge(ar, t, e)
              } catch (a) {
                if (typeof Ut > 'u' || !(a instanceof X)) throw a
                return -a.Ka
              }
            },
            y: function (t, e, a) {
              try {
                return (
                  (e = k(e)),
                  (e = Vt(t, e)),
                  (e = st(e)),
                  e[e.length - 1] === '/' && (e = e.substr(0, e.length - 1)),
                  Pt(e, a),
                  0
                )
              } catch (c) {
                if (typeof Ut > 'u' || !(c instanceof X)) throw c
                return -c.Ka
              }
            },
            D: function (t, e, a, c) {
              try {
                e = k(e)
                var y = c & 256
                return (e = Vt(t, e, c & 4096)), ge(y ? ar : se, e, a)
              } catch (P) {
                if (typeof Ut > 'u' || !(P instanceof X)) throw P
                return -P.Ka
              }
            },
            v: function (t, e, a, c) {
              Ee = c
              try {
                ;(e = k(e)), (e = Vt(t, e))
                var y = c ? be() : 0
                return re(e, a, y).fd
              } catch (P) {
                if (typeof Ut > 'u' || !(P instanceof X)) throw P
                return -P.Ka
              }
            },
            t: function (t, e, a, c) {
              try {
                if (((e = k(e)), (e = Vt(t, e)), 0 >= c)) return -28
                var y = ir(e),
                  P = Math.min(c, A(y)),
                  Z = I[a + P]
                return i(y, $, a, c + 1), (I[a + P] = Z), P
              } catch (mt) {
                if (typeof Ut > 'u' || !(mt instanceof X)) throw mt
                return -mt.Ka
              }
            },
            s: function (t) {
              try {
                return (t = k(t)), rr(t), 0
              } catch (e) {
                if (typeof Ut > 'u' || !(e instanceof X)) throw e
                return -e.Ka
              }
            },
            F: function (t, e) {
              try {
                return (t = k(t)), ge(se, t, e)
              } catch (a) {
                if (typeof Ut > 'u' || !(a instanceof X)) throw a
                return -a.Ka
              }
            },
            p: function (t, e, a) {
              try {
                return (
                  (e = k(e)),
                  (e = Vt(t, e)),
                  a === 0
                    ? nr(e)
                    : a === 512
                    ? rr(e)
                    : At('Invalid flags passed to unlinkat'),
                  0
                )
              } catch (c) {
                if (typeof Ut > 'u' || !(c instanceof X)) throw c
                return -c.Ka
              }
            },
            o: function (t, e, a) {
              try {
                if (((e = k(e)), (e = Vt(t, e, !0)), a)) {
                  var c = Re(a),
                    y = H[(a + 8) >> 2]
                  ;(P = 1e3 * c + y / 1e6),
                    (a += 16),
                    (c = Re(a)),
                    (y = H[(a + 8) >> 2]),
                    (Z = 1e3 * c + y / 1e6)
                } else
                  var P = Date.now(),
                    Z = P
                t = P
                var mt = Ft(e, { Sa: !0 }).node
                return mt.Ga.Oa(mt, { timestamp: Math.max(t, Z) }), 0
              } catch (vt) {
                if (typeof Ut > 'u' || !(vt instanceof X)) throw vt
                return -vt.Ka
              }
            },
            e: function () {
              return Date.now()
            },
            j: function (t, e) {
              ;(t = new Date(1e3 * Re(t))),
                (H[e >> 2] = t.getSeconds()),
                (H[(e + 4) >> 2] = t.getMinutes()),
                (H[(e + 8) >> 2] = t.getHours()),
                (H[(e + 12) >> 2] = t.getDate()),
                (H[(e + 16) >> 2] = t.getMonth()),
                (H[(e + 20) >> 2] = t.getFullYear() - 1900),
                (H[(e + 24) >> 2] = t.getDay())
              var a = new Date(t.getFullYear(), 0, 1)
              ;(H[(e + 28) >> 2] = ((t.getTime() - a.getTime()) / 864e5) | 0),
                (H[(e + 36) >> 2] = -(60 * t.getTimezoneOffset()))
              var c = new Date(t.getFullYear(), 6, 1).getTimezoneOffset()
              ;(a = a.getTimezoneOffset()),
                (H[(e + 32) >> 2] =
                  (c != a && t.getTimezoneOffset() == Math.min(a, c)) | 0)
            },
            w: function (t, e, a, c, y, P) {
              try {
                var Z = Mt(c)
                if (e & 2 && !(a & 2) && (Z.flags & 2097155) !== 2)
                  throw new X(2)
                if ((Z.flags & 2097155) === 1) throw new X(2)
                if (!Z.Ha.bb) throw new X(43)
                var mt = Z.Ha.bb(Z, t, y, e, a),
                  vt = mt.Fb
                return (H[P >> 2] = mt.vb), vt
              } catch (bt) {
                if (typeof Ut > 'u' || !(bt instanceof X)) throw bt
                return -bt.Ka
              }
            },
            x: function (t, e, a, c, y, P) {
              try {
                var Z = Mt(y)
                if (a & 2) {
                  var mt = $.slice(t, t + e)
                  Z && Z.Ha.cb && Z.Ha.cb(Z, mt, P, e, c)
                }
              } catch (vt) {
                if (typeof Ut > 'u' || !(vt instanceof X)) throw vt
                return -vt.Ka
              }
            },
            n: Ce,
            q: function () {
              return 2147483648
            },
            d: _r,
            c: function (t) {
              var e = $.length
              if (((t >>>= 0), 2147483648 < t)) return !1
              for (var a = 1; 4 >= a; a *= 2) {
                var c = e * (1 + 0.2 / a)
                c = Math.min(c, t + 100663296)
                var y = Math
                ;(c = Math.max(t, c)),
                  (y = y.min.call(
                    y,
                    2147483648,
                    c + ((65536 - (c % 65536)) % 65536)
                  ))
                t: {
                  try {
                    z.grow((y - rt.byteLength + 65535) >>> 16), et()
                    var P = 1
                    break t
                  } catch {}
                  P = void 0
                }
                if (P) return !0
              }
              return !1
            },
            z: function (t, e) {
              var a = 0
              return (
                pr().forEach(function (c, y) {
                  var P = e + a
                  for (y = D[(t + 4 * y) >> 2] = P, P = 0; P < c.length; ++P)
                    I[y++ >> 0] = c.charCodeAt(P)
                  ;(I[y >> 0] = 0), (a += c.length + 1)
                }),
                0
              )
            },
            A: function (t, e) {
              var a = pr()
              D[t >> 2] = a.length
              var c = 0
              return (
                a.forEach(function (y) {
                  c += y.length + 1
                }),
                (D[e >> 2] = c),
                0
              )
            },
            f: function (t) {
              try {
                var e = Mt(t)
                return Fe(e), 0
              } catch (a) {
                if (typeof Ut > 'u' || !(a instanceof X)) throw a
                return a.Ka
              }
            },
            m: function (t, e) {
              try {
                var a = Mt(t)
                return (
                  (I[e >> 0] = a.tty
                    ? 2
                    : (a.mode & 61440) === 16384
                    ? 3
                    : (a.mode & 61440) === 40960
                    ? 7
                    : 4),
                  0
                )
              } catch (c) {
                if (typeof Ut > 'u' || !(c instanceof X)) throw c
                return c.Ka
              }
            },
            u: function (t, e, a, c) {
              try {
                t: {
                  var y = Mt(t)
                  t = e
                  for (var P = (e = 0); P < a; P++) {
                    var Z = D[t >> 2],
                      mt = D[(t + 4) >> 2]
                    t += 8
                    var vt = ur(y, I, Z, mt)
                    if (0 > vt) {
                      var bt = -1
                      break t
                    }
                    if (((e += vt), vt < mt)) break
                  }
                  bt = e
                }
                return (D[c >> 2] = bt), 0
              } catch (It) {
                if (typeof Ut > 'u' || !(It instanceof X)) throw It
                return It.Ka
              }
            },
            k: function (t, e, a, c, y) {
              try {
                if (
                  ((e =
                    (a + 2097152) >>> 0 < 4194305 - !!e
                      ? (e >>> 0) + 4294967296 * a
                      : NaN),
                  isNaN(e))
                )
                  return 61
                var P = Mt(t)
                return (
                  or(P, e, c),
                  (S = [
                    P.position >>> 0,
                    ((u = P.position),
                    1 <= +Math.abs(u)
                      ? 0 < u
                        ? (Math.min(+Math.floor(u / 4294967296), 4294967295) |
                            0) >>>
                          0
                        : ~~+Math.ceil((u - +(~~u >>> 0)) / 4294967296) >>> 0
                      : 0)
                  ]),
                  (H[y >> 2] = S[0]),
                  (H[(y + 4) >> 2] = S[1]),
                  P.hb && e === 0 && c === 0 && (P.hb = null),
                  0
                )
              } catch (Z) {
                if (typeof Ut > 'u' || !(Z instanceof X)) throw Z
                return Z.Ka
              }
            },
            C: function (t) {
              try {
                var e = Mt(t)
                return e.Ha && e.Ha.fsync ? e.Ha.fsync(e) : 0
              } catch (a) {
                if (typeof Ut > 'u' || !(a instanceof X)) throw a
                return a.Ka
              }
            },
            r: function (t, e, a, c) {
              try {
                t: {
                  var y = Mt(t)
                  t = e
                  for (var P = (e = 0); P < a; P++) {
                    var Z = D[t >> 2],
                      mt = D[(t + 4) >> 2]
                    t += 8
                    var vt = lr(y, I, Z, mt)
                    if (0 > vt) {
                      var bt = -1
                      break t
                    }
                    e += vt
                  }
                  bt = e
                }
                return (D[c >> 2] = bt), 0
              } catch (It) {
                if (typeof Ut > 'u' || !(It instanceof X)) throw It
                return It.Ka
              }
            }
          }
          ;(function () {
            function t(y) {
              ;(r.asm = y.exports),
                (z = r.asm.I),
                et(),
                (K = r.asm.Aa),
                Tt.unshift(r.asm.J),
                Nt--,
                r.monitorRunDependencies && r.monitorRunDependencies(Nt),
                Nt == 0 && wt && ((y = wt), (wt = null), y())
            }
            function e(y) {
              t(y.instance)
            }
            function a(y) {
              return N()
                .then(function (P) {
                  return WebAssembly.instantiate(P, c)
                })
                .then(function (P) {
                  return P
                })
                .then(y, function (P) {
                  G('failed to asynchronously prepare wasm: ' + P), At(P)
                })
            }
            var c = { a: zr }
            if (
              (Nt++,
              r.monitorRunDependencies && r.monitorRunDependencies(Nt),
              r.instantiateWasm)
            )
              try {
                return r.instantiateWasm(c, t)
              } catch (y) {
                return (
                  G('Module.instantiateWasm callback failed with error: ' + y),
                  !1
                )
              }
            return (
              (function () {
                return Q ||
                  typeof WebAssembly.instantiateStreaming != 'function' ||
                  Ot() ||
                  n.startsWith('file://') ||
                  g ||
                  typeof fetch != 'function'
                  ? a(e)
                  : fetch(n, { credentials: 'same-origin' }).then(function (y) {
                      return WebAssembly.instantiateStreaming(y, c).then(
                        e,
                        function (P) {
                          return (
                            G('wasm streaming compile failed: ' + P),
                            G('falling back to ArrayBuffer instantiation'),
                            a(e)
                          )
                        }
                      )
                    })
              })(),
              {}
            )
          })(),
            (r.___wasm_call_ctors = function () {
              return (r.___wasm_call_ctors = r.asm.J).apply(null, arguments)
            }),
            (r._sqlite3_free = function () {
              return (r._sqlite3_free = r.asm.K).apply(null, arguments)
            }),
            (r._sqlite3_value_double = function () {
              return (r._sqlite3_value_double = r.asm.L).apply(null, arguments)
            }),
            (r._sqlite3_value_text = function () {
              return (r._sqlite3_value_text = r.asm.M).apply(null, arguments)
            })
          var Nr = (r.___errno_location = function () {
            return (Nr = r.___errno_location = r.asm.N).apply(null, arguments)
          })
          ;(r._sqlite3_prepare_v2 = function () {
            return (r._sqlite3_prepare_v2 = r.asm.O).apply(null, arguments)
          }),
            (r._sqlite3_step = function () {
              return (r._sqlite3_step = r.asm.P).apply(null, arguments)
            }),
            (r._sqlite3_finalize = function () {
              return (r._sqlite3_finalize = r.asm.Q).apply(null, arguments)
            }),
            (r._sqlite3_reset = function () {
              return (r._sqlite3_reset = r.asm.R).apply(null, arguments)
            }),
            (r._sqlite3_value_int = function () {
              return (r._sqlite3_value_int = r.asm.S).apply(null, arguments)
            }),
            (r._sqlite3_clear_bindings = function () {
              return (r._sqlite3_clear_bindings = r.asm.T).apply(
                null,
                arguments
              )
            }),
            (r._sqlite3_value_blob = function () {
              return (r._sqlite3_value_blob = r.asm.U).apply(null, arguments)
            }),
            (r._sqlite3_value_bytes = function () {
              return (r._sqlite3_value_bytes = r.asm.V).apply(null, arguments)
            }),
            (r._sqlite3_value_type = function () {
              return (r._sqlite3_value_type = r.asm.W).apply(null, arguments)
            }),
            (r._sqlite3_result_blob = function () {
              return (r._sqlite3_result_blob = r.asm.X).apply(null, arguments)
            }),
            (r._sqlite3_result_double = function () {
              return (r._sqlite3_result_double = r.asm.Y).apply(null, arguments)
            }),
            (r._sqlite3_result_error = function () {
              return (r._sqlite3_result_error = r.asm.Z).apply(null, arguments)
            }),
            (r._sqlite3_result_int = function () {
              return (r._sqlite3_result_int = r.asm._).apply(null, arguments)
            }),
            (r._sqlite3_result_int64 = function () {
              return (r._sqlite3_result_int64 = r.asm.$).apply(null, arguments)
            }),
            (r._sqlite3_result_null = function () {
              return (r._sqlite3_result_null = r.asm.aa).apply(null, arguments)
            }),
            (r._sqlite3_result_text = function () {
              return (r._sqlite3_result_text = r.asm.ba).apply(null, arguments)
            }),
            (r._sqlite3_sql = function () {
              return (r._sqlite3_sql = r.asm.ca).apply(null, arguments)
            }),
            (r._sqlite3_aggregate_context = function () {
              return (r._sqlite3_aggregate_context = r.asm.da).apply(
                null,
                arguments
              )
            }),
            (r._sqlite3_column_count = function () {
              return (r._sqlite3_column_count = r.asm.ea).apply(null, arguments)
            }),
            (r._sqlite3_data_count = function () {
              return (r._sqlite3_data_count = r.asm.fa).apply(null, arguments)
            }),
            (r._sqlite3_column_blob = function () {
              return (r._sqlite3_column_blob = r.asm.ga).apply(null, arguments)
            }),
            (r._sqlite3_column_bytes = function () {
              return (r._sqlite3_column_bytes = r.asm.ha).apply(null, arguments)
            }),
            (r._sqlite3_column_double = function () {
              return (r._sqlite3_column_double = r.asm.ia).apply(
                null,
                arguments
              )
            }),
            (r._sqlite3_column_text = function () {
              return (r._sqlite3_column_text = r.asm.ja).apply(null, arguments)
            }),
            (r._sqlite3_column_type = function () {
              return (r._sqlite3_column_type = r.asm.ka).apply(null, arguments)
            }),
            (r._sqlite3_column_name = function () {
              return (r._sqlite3_column_name = r.asm.la).apply(null, arguments)
            }),
            (r._sqlite3_bind_blob = function () {
              return (r._sqlite3_bind_blob = r.asm.ma).apply(null, arguments)
            }),
            (r._sqlite3_bind_double = function () {
              return (r._sqlite3_bind_double = r.asm.na).apply(null, arguments)
            }),
            (r._sqlite3_bind_int = function () {
              return (r._sqlite3_bind_int = r.asm.oa).apply(null, arguments)
            }),
            (r._sqlite3_bind_text = function () {
              return (r._sqlite3_bind_text = r.asm.pa).apply(null, arguments)
            }),
            (r._sqlite3_bind_parameter_index = function () {
              return (r._sqlite3_bind_parameter_index = r.asm.qa).apply(
                null,
                arguments
              )
            }),
            (r._sqlite3_normalized_sql = function () {
              return (r._sqlite3_normalized_sql = r.asm.ra).apply(
                null,
                arguments
              )
            }),
            (r._sqlite3_errmsg = function () {
              return (r._sqlite3_errmsg = r.asm.sa).apply(null, arguments)
            }),
            (r._sqlite3_exec = function () {
              return (r._sqlite3_exec = r.asm.ta).apply(null, arguments)
            }),
            (r._sqlite3_changes = function () {
              return (r._sqlite3_changes = r.asm.ua).apply(null, arguments)
            }),
            (r._sqlite3_close_v2 = function () {
              return (r._sqlite3_close_v2 = r.asm.va).apply(null, arguments)
            }),
            (r._sqlite3_create_function_v2 = function () {
              return (r._sqlite3_create_function_v2 = r.asm.wa).apply(
                null,
                arguments
              )
            }),
            (r._sqlite3_open = function () {
              return (r._sqlite3_open = r.asm.xa).apply(null, arguments)
            })
          var ye = (r._malloc = function () {
              return (ye = r._malloc = r.asm.ya).apply(null, arguments)
            }),
            we = (r._free = function () {
              return (we = r._free = r.asm.za).apply(null, arguments)
            })
          r._RegisterExtensionFunctions = function () {
            return (r._RegisterExtensionFunctions = r.asm.Ba).apply(
              null,
              arguments
            )
          }
          var gr = (r._emscripten_builtin_memalign = function () {
              return (gr = r._emscripten_builtin_memalign = r.asm.Ca).apply(
                null,
                arguments
              )
            }),
            ce = (r.stackSave = function () {
              return (ce = r.stackSave = r.asm.Da).apply(null, arguments)
            }),
            fe = (r.stackRestore = function () {
              return (fe = r.stackRestore = r.asm.Ea).apply(null, arguments)
            }),
            Zt = (r.stackAlloc = function () {
              return (Zt = r.stackAlloc = r.asm.Fa).apply(null, arguments)
            })
          ;(r.UTF8ToString = k),
            (r.stackAlloc = Zt),
            (r.stackSave = ce),
            (r.stackRestore = fe),
            (r.cwrap = function (t, e, a, c) {
              a = a || []
              var y = a.every((P) => P === 'number' || P === 'boolean')
              return e !== 'string' && y && !c
                ? r['_' + t]
                : function () {
                    return Cr(t, e, a, arguments)
                  }
            })
          var ve
          wt = function t() {
            ve || Er(), ve || (wt = t)
          }
          function Er() {
            function t() {
              if (!ve && ((ve = !0), (r.calledRun = !0), !W)) {
                if (
                  (r.noFSInit ||
                    fr ||
                    ((fr = !0),
                    cr(),
                    (r.stdin = r.stdin),
                    (r.stdout = r.stdout),
                    (r.stderr = r.stderr),
                    r.stdin
                      ? oe('stdin', r.stdin)
                      : Oe('/dev/tty', '/dev/stdin'),
                    r.stdout
                      ? oe('stdout', null, r.stdout)
                      : Oe('/dev/tty', '/dev/stdout'),
                    r.stderr
                      ? oe('stderr', null, r.stderr)
                      : Oe('/dev/tty1', '/dev/stderr'),
                    re('/dev/stdin', 0),
                    re('/dev/stdout', 1),
                    re('/dev/stderr', 1)),
                  (ie = !1),
                  V(Tt),
                  r.onRuntimeInitialized && r.onRuntimeInitialized(),
                  r.postRun)
                )
                  for (
                    typeof r.postRun == 'function' && (r.postRun = [r.postRun]);
                    r.postRun.length;

                  ) {
                    var e = r.postRun.shift()
                    ht.unshift(e)
                  }
                V(ht)
              }
            }
            if (!(0 < Nt)) {
              if (r.preRun)
                for (
                  typeof r.preRun == 'function' && (r.preRun = [r.preRun]);
                  r.preRun.length;

                )
                  dt()
              V(yt),
                0 < Nt ||
                  (r.setStatus
                    ? (r.setStatus('Running...'),
                      setTimeout(function () {
                        setTimeout(function () {
                          r.setStatus('')
                        }, 1),
                          t()
                      }, 1))
                    : t())
            }
          }
          if (r.preInit)
            for (
              typeof r.preInit == 'function' && (r.preInit = [r.preInit]);
              0 < r.preInit.length;

            )
              r.preInit.pop()()
          return Er(), s
        })),
        m)
      )
    }
  ;(at.exports = B), (at.exports.default = B)
})(_n)
const Nn = `DROP TABLE IF EXISTS comment;
CREATE TABLE IF NOT EXISTS comment
    (
        id bigint UNSIGNED NOT NULL
            PRIMARY KEY,
        ref_type varchar(32) DEFAULT '' NOT NULL,
        ref_id bigint NOT NULL,
        kr_id bigint DEFAULT 0 NOT NULL,
        msg_type tinyint UNSIGNED DEFAULT '1' NOT NULL,
        msg_format tinyint UNSIGNED DEFAULT '0' NOT NULL,
        system_type tinyint UNSIGNED DEFAULT '0' NOT NULL,
        content text NOT NULL,
        affected_uid varchar(3072) DEFAULT '' NOT NULL,
        notify_uid varchar(3072) DEFAULT '' NOT NULL,
        delete_uid varchar(3072) DEFAULT '' NOT NULL,
        gadget_delete_uid varchar(3072) DEFAULT '' NOT NULL,
        status smallint DEFAULT 1 NOT NULL,
        creator_id bigint UNSIGNED NOT NULL,
        important_at int UNSIGNED DEFAULT '0' NOT NULL,
        revoke_at int UNSIGNED DEFAULT '0' NOT NULL,
        create_at int UNSIGNED DEFAULT '0' NOT NULL,
        update_at int UNSIGNED DEFAULT '0' NOT NULL
    );

CREATE INDEX IF NOT EXISTS comment_creator_fk ON comment (creator_id);
DROP TABLE IF EXISTS message;
CREATE TABLE IF NOT EXISTS message
    (
        id bigint UNSIGNED NOT NULL
            PRIMARY KEY,
        ref_id bigint UNSIGNED NOT NULL,
        ref_type varchar(15) NOT NULL,
        code tinyint NOT NULL,
        comment_id bigint UNSIGNED DEFAULT '0' NULL,
        timed_task_id bigint UNSIGNED DEFAULT '0' NOT NULL,
        creator_id bigint UNSIGNED NOT NULL,
        send_from char(6) DEFAULT '' NOT NULL,
        create_at int NOT NULL,
        current_version tinyint UNSIGNED NOT NULL,
        max_version tinyint NOT NULL,
        min_version tinyint NOT NULL
    );

CREATE INDEX IF NOT EXISTS idx_comment_id ON message (comment_id);

CREATE INDEX IF NOT EXISTS idx_message_task_id ON message (ref_id);
DROP TABLE IF EXISTS message_action;
    CREATE TABLE IF NOT EXISTS message_action
        (
            id int UNSIGNED AUTO_INCREMENT
                PRIMARY KEY,
            ref_id bigint UNSIGNED NOT NULL,
            ref_type varchar(15) NOT NULL,
            user_id bigint UNSIGNED NOT NULL,
            topmost_at int DEFAULT 0 NOT NULL,
            delete_at int DEFAULT 0 NOT NULL,
            remind_at int DEFAULT 2 NOT NULL,
            last_message_id bigint UNSIGNED NOT NULL,
            top_parent_id bigint UNSIGNED DEFAULT '0' NOT NULL,
            read_at int DEFAULT 0 NOT NULL,
            CONSTRAINT idx_task_user_id UNIQUE (user_id, ref_id)
        );

    CREATE INDEX IF NOT EXISTS idx_user_type_delete ON message_action (user_id, delete_at, ref_type, read_at);

    CREATE INDEX IF NOT EXISTS message_idx_fk ON message_action (last_message_id);
DROP TABLE IF EXISTS task;
CREATE TABLE IF NOT EXISTS task
    (
        id bigint UNSIGNED NOT NULL
            PRIMARY KEY,
        matter_type smallint NOT NULL,
        title varchar(500) NOT NULL,
        detail longtext NOT NULL,
        files json NULL,
        start_time int UNSIGNED DEFAULT '0' NOT NULL,
        start_time_full_day tinyint UNSIGNED DEFAULT '1' NOT NULL,
        end_time int UNSIGNED DEFAULT '0' NOT NULL,
        end_time_full_day tinyint UNSIGNED DEFAULT '1' NOT NULL,
        remind_at json NULL,
        repeat_type tinyint UNSIGNED DEFAULT '0' NOT NULL,
        end_repeat_at int DEFAULT 0 NOT NULL,
        execute_addr varchar(255) DEFAULT '' NOT NULL,
        widget json NULL,
        state smallint UNSIGNED DEFAULT '10201' NOT NULL,
        creator_id bigint UNSIGNED NOT NULL,
        complete_at int UNSIGNED DEFAULT '0' NOT NULL,
        cancel_at int UNSIGNED DEFAULT '0' NOT NULL,
        create_at int UNSIGNED DEFAULT '0' NOT NULL,
        update_at int UNSIGNED DEFAULT '0' NOT NULL,
        cancel_from tinyint UNSIGNED DEFAULT 0 NOT NULL,
        priority_level tinyint  UNSIGNED DEFAULT 1 NOT NULL
    );
CREATE INDEX IF NOT EXISTS create_at ON task (create_at);
CREATE INDEX IF NOT EXISTS end_repeat_at ON task (end_repeat_at);
CREATE INDEX IF NOT EXISTS end_time ON task (end_time, end_time_full_day);
CREATE INDEX IF NOT EXISTS matter_creator_fk ON task (creator_id);
CREATE INDEX IF NOT EXISTS project_matters_idx ON task (state, matter_type, repeat_type);
CREATE INDEX IF NOT EXISTS start_time ON task (start_time, start_time_full_day);
DROP TABLE IF EXISTS task_dispatch;
CREATE TABLE IF NOT EXISTS task_dispatch
    (
        id bigint UNSIGNED NOT NULL
            PRIMARY KEY,
        dispatch_id bigint UNSIGNED NOT NULL,
        ref_task_id bigint UNSIGNED NOT NULL,
        creator_id bigint UNSIGNED DEFAULT '0' NOT NULL,
        taker_id bigint UNSIGNED NOT NULL,
        invite_id bigint UNSIGNED DEFAULT '0' NOT NULL,
        invite_type varchar(15) DEFAULT '' NOT NULL,
        identity smallint NOT NULL,
        state smallint UNSIGNED NOT NULL,
        operate_state smallint UNSIGNED DEFAULT '0' NOT NULL,
        personal_state smallint UNSIGNED DEFAULT '0' NOT NULL,
        reason varchar(255) DEFAULT '' NOT NULL,
        is_admin tinyint UNSIGNED DEFAULT '0' NOT NULL,
        is_dispatch tinyint UNSIGNED DEFAULT '0' NOT NULL,
        execute_at int UNSIGNED DEFAULT '0' NOT NULL,
        personal_remind_at json NULL,
        accept_at int UNSIGNED DEFAULT '0' NOT NULL,
        finish_time int UNSIGNED DEFAULT '0' NOT NULL,
        cancel_at int UNSIGNED DEFAULT '0' NOT NULL,
        revoke_at int UNSIGNED DEFAULT '0' NOT NULL,
        exit_at int UNSIGNED DEFAULT '0' NOT NULL,
        set_admin_at int UNSIGNED DEFAULT '0' NOT NULL,
        topmost_at int UNSIGNED DEFAULT '0' NOT NULL,
        create_at int UNSIGNED DEFAULT '0' NOT NULL,
        update_at int UNSIGNED DEFAULT '0' NOT NULL,
        delete_at int UNSIGNED DEFAULT '0' NOT NULL,
        is_view tinyint UNSIGNED DEFAULT '0' NOT NULL,
        status tinyint DEFAULT 1 NOT NULL,
        is_valid tinyint UNSIGNED DEFAULT '0' NOT NULL
    );
CREATE INDEX IF NOT EXISTS delete_idx ON task_dispatch (delete_at);
CREATE INDEX IF NOT EXISTS dispatch_idx ON task_dispatch (dispatch_id);
CREATE INDEX IF NOT EXISTS ref_task_taker_fk ON task_dispatch (ref_task_id, taker_id, is_valid);
CREATE INDEX IF NOT EXISTS taker_finish_idx ON task_dispatch (taker_id, is_valid, personal_state, finish_time);
DROP TABLE IF EXISTS task_follow;
CREATE TABLE IF NOT EXISTS task_follow
    (
        id bigint UNSIGNED PRIMARY KEY,
        user_id bigint UNSIGNED DEFAULT '0' NOT NULL,
        task_id bigint UNSIGNED DEFAULT '0' NOT NULL,
        create_at int UNSIGNED DEFAULT '0' NOT NULL,
        CONSTRAINT user_task_idx UNIQUE (user_id, task_id)
    );
DROP TABLE IF EXISTS task_config;
CREATE TABLE IF NOT EXISTS task_config
    (
        id bigint UNSIGNED DEFAULT '0' NOT NULL
            PRIMARY KEY,
        max_taker_total int UNSIGNED DEFAULT '20' NOT NULL,
        category tinyint UNSIGNED DEFAULT '0' NOT NULL,
        parent_id text DEFAULT '' NOT NULL,
        level tinyint UNSIGNED DEFAULT '1' NOT NULL,
        sort int UNSIGNED DEFAULT '0' NOT NULL,
        is_checkbox tinyint UNSIGNED DEFAULT '0' NOT NULL,
        ref_meeting_id text UNSIGNED DEFAULT '0' NOT NULL,
        project_id bigint UNSIGNED DEFAULT '0' NOT NULL,
        import_project_user_id bigint UNSIGNED DEFAULT '0' NOT NULL,
        import_project_at int UNSIGNED DEFAULT '0' NOT NULL,
        project_task_sort int UNSIGNED DEFAULT '0' NOT NULL,
        score int UNSIGNED DEFAULT '0' NOT NULL,
        last_active_at int UNSIGNED DEFAULT '0' NOT NULL,
        repeat_change_id bigint UNSIGNED DEFAULT '0' NOT NULL,
        application_id bigint UNSIGNED DEFAULT '0' NOT NULL,
        flow_step_id bigint UNSIGNED DEFAULT '0' NOT NULL,
        application_json json NULL,
        operate_type tinyint UNSIGNED DEFAULT '1' NOT NULL,
        creator_id bigint UNSIGNED DEFAULT '0' NOT NULL,
        create_at int UNSIGNED DEFAULT '0' NOT NULL,
        update_at int UNSIGNED DEFAULT '0' NOT NULL
    );
CREATE INDEX IF NOT EXISTS parent_id ON task_config (parent_id);
CREATE INDEX IF NOT EXISTS project_id ON task_config (project_id);
DROP TABLE IF EXISTS tag;
CREATE TABLE IF NOT EXISTS tag
    (
        id bigint UNSIGNED NOT NULL
            PRIMARY KEY,
        name varchar(12) NOT NULL,
        creator_id bigint NOT NULL,
        color varchar(10) NULL,
        type tinyint(1) DEFAULT 1 NOT NULL,
        state tinyint(1) DEFAULT 1 NOT NULL,
        create_at int UNSIGNED DEFAULT '0' NOT NULL,
        update_at int UNSIGNED DEFAULT '0' NOT NULL
    );
CREATE INDEX IF NOT EXISTS tag_creator_id_name_uindex ON tag (creator_id, name);
DROP TABLE IF EXISTS tag_bind;
CREATE TABLE IF NOT EXISTS tag_bind
    (
        id bigint UNSIGNED PRIMARY KEY,
        tag_id bigint NOT NULL,
        user_id bigint NOT NULL,
        object_id bigint NOT NULL,
        state tinyint(1) DEFAULT 1 NOT NULL,
        create_at int UNSIGNED DEFAULT '0' NOT NULL,
        update_at int UNSIGNED DEFAULT '0' NOT NULL
    );
CREATE INDEX IF NOT EXISTS tag_user_obj_idx ON tag_bind (user_id, object_id);
DROP TABLE IF EXISTS task_repeat;
CREATE TABLE IF NOT EXISTS task_repeat
    (
        repeat_id bigint UNSIGNED DEFAULT '0' NOT NULL
            PRIMARY KEY,
        task_id bigint UNSIGNED DEFAULT '0' NOT NULL,
        start_time int UNSIGNED DEFAULT '0' NOT NULL,
        start_time_full_day tinyint UNSIGNED DEFAULT '1' NOT NULL,
        end_time int UNSIGNED DEFAULT '0' NOT NULL,
        end_time_full_day tinyint UNSIGNED DEFAULT '1' NOT NULL,
        remind_at json NULL,
        cycle int NOT NULL,
        cycle_date date NULL,
        change_id bigint UNSIGNED DEFAULT '0' NOT NULL,
        complete_at int UNSIGNED DEFAULT '0' NOT NULL,
        create_at int UNSIGNED DEFAULT '0' NOT NULL,
        CONSTRAINT idx_only UNIQUE (task_id, start_time, end_time, cycle_date, change_id)
    );
CREATE INDEX IF NOT EXISTS idx_cycle_date ON task_repeat (cycle_date);
CREATE INDEX IF NOT EXISTS idx_end_time ON task_repeat (end_time, end_time_full_day);
CREATE INDEX IF NOT EXISTS idx_start_time ON task_repeat (start_time, start_time_full_day);
CREATE INDEX IF NOT EXISTS idx_task_id ON task_repeat (task_id);
DROP TABLE IF EXISTS task_repeat_finish;
CREATE TABLE IF NOT EXISTS task_repeat_finish
    (
        id bigint UNSIGNED PRIMARY KEY,
        repeat_id bigint UNSIGNED DEFAULT '0' NOT NULL,
        task_id bigint UNSIGNED DEFAULT '0' NOT NULL,
        user_id bigint UNSIGNED DEFAULT '0' NOT NULL,
        finish_time int NOT NULL,
        CONSTRAINT idx_fk_repeat_id UNIQUE (repeat_id, user_id)
    );
CREATE INDEX IF NOT EXISTS idx_fk_task_id ON task_repeat_finish (task_id);
CREATE INDEX IF NOT EXISTS idx_user_id ON task_repeat_finish (user_id, finish_time);
DROP TABLE IF EXISTS task_conclusion;
CREATE TABLE IF NOT EXISTS task_conclusion
    (
        task_id bigint NOT NULL
            PRIMARY KEY,
        content text NOT NULL,
        files json NULL,
        creator_id bigint NOT NULL,
        updater_id bigint NOT NULL,
        create_at int UNSIGNED DEFAULT '0' NOT NULL,
        update_at int UNSIGNED DEFAULT '0' NOT NULL,
        delete_at int UNSIGNED DEFAULT '0' NOT NULL
    );
DROP TABLE IF EXISTS workspace_bind;
CREATE TABLE IF NOT EXISTS workspace_bind
    (
        id bigint NOT NULL
            PRIMARY KEY,
        workspace_id bigint NOT NULL,
        project_id bigint NOT NULL,
        creator_id bigint UNSIGNED DEFAULT '0' NOT NULL,
        sort int NOT NULL,
        state tinyint(1) DEFAULT 1 NOT NULL,
        ws_type tinyint UNSIGNED DEFAULT '1' NOT NULL,
        accept_at int UNSIGNED DEFAULT '0' NOT NULL,
        refuse_at int UNSIGNED DEFAULT '0' NOT NULL,
        revoke_at int UNSIGNED DEFAULT '0' NOT NULL,
        create_at int DEFAULT 0 NOT NULL,
        update_at int DEFAULT 0 NOT NULL
    );
CREATE INDEX IF NOT EXISTS fk_workspace_project_id ON workspace_bind (workspace_id, project_id);
CREATE INDEX IF NOT EXISTS workspace_bind_project_id_index ON workspace_bind (project_id);
DROP TABLE IF EXISTS workspace;
CREATE TABLE IF NOT EXISTS workspace
    (
        id bigint NOT NULL
            PRIMARY KEY,
        name varchar(16) NOT NULL,
        icon varchar(255) DEFAULT '' NOT NULL,
        icon_color varchar(20) DEFAULT '' NOT NULL,
        bg_icon varchar(255) DEFAULT '' NOT NULL,
        creator_id bigint DEFAULT 0 NOT NULL,
        ws_desc varchar(2500) DEFAULT '' NOT NULL,
        ws_type tinyint(1) DEFAULT 1 NULL,
        files json NULL,
        level tinyint(1) DEFAULT 1 NOT NULL,
        create_at int DEFAULT 0 NOT NULL,
        update_at int DEFAULT 0 NOT NULL,
        state tinyint(1) DEFAULT 1 NOT NULL,
        expired_at int DEFAULT 0 NOT NULL,
        update_level_at int DEFAULT 0 NULL,
        attr_json json NULL
    );
CREATE INDEX IF NOT EXISTS idx_create_at ON workspace (create_at);
CREATE INDEX IF NOT EXISTS idx_creator_id ON workspace (creator_id);
DROP TABLE IF EXISTS workspace_member;
CREATE TABLE IF NOT EXISTS workspace_member
    (
        id bigint NOT NULL
            PRIMARY KEY,
        workspace_id bigint UNSIGNED DEFAULT '0' NOT NULL,
        creator_id bigint UNSIGNED DEFAULT '0' NOT NULL,
        user_id bigint UNSIGNED DEFAULT '0' NOT NULL,
        invite_id bigint UNSIGNED DEFAULT '0' NOT NULL,
        identify int UNSIGNED DEFAULT '0' NOT NULL,
        invite_type varchar(20) DEFAULT '' NOT NULL,
        state int UNSIGNED DEFAULT '0' NOT NULL,
        approval_at int DEFAULT 0 NULL,
        approval_state int DEFAULT 0 NULL,
        revoke_at int UNSIGNED DEFAULT '0' NOT NULL,
        create_at int UNSIGNED DEFAULT '0' NOT NULL,
        update_at int UNSIGNED DEFAULT '0' NOT NULL,
        member_type tinyint(1) DEFAULT 1 NOT NULL,
        accept_at int UNSIGNED DEFAULT '0' NOT NULL,
        refuse_at int UNSIGNED DEFAULT '0' NOT NULL,
        source varchar(40) DEFAULT '' NULL,
        exit_at int DEFAULT 0 NULL,
        target_member_type tinyint(1) NULL,
        CONSTRAINT fk_project_user_id
            UNIQUE (workspace_id, user_id)
    );
CREATE INDEX IF NOT EXISTS workspace_member_user_id_index ON workspace_member (user_id);
DROP TABLE IF EXISTS project;
CREATE TABLE IF NOT EXISTS project
    (
        id bigint UNSIGNED NOT NULL
            PRIMARY KEY,
        project_name varchar(20) NOT NULL,
        project_desc varchar(2500) NOT NULL,
        files json NULL,
        target_time int NOT NULL,
        state smallint UNSIGNED DEFAULT '10201' NOT NULL,
        creator_id bigint UNSIGNED NOT NULL,
        cancel_at int UNSIGNED DEFAULT '0' NOT NULL,
        create_at int UNSIGNED DEFAULT '0' NOT NULL,
        update_at int UNSIGNED DEFAULT '0' NOT NULL
    );
CREATE INDEX IF NOT EXISTS idx_creator_id ON project (creator_id);
DROP TABLE IF EXISTS task_relation;
CREATE TABLE task_relation
    (
        task_id bigint UNSIGNED DEFAULT '0' NOT NULL,
        user_id bigint UNSIGNED DEFAULT '0' NOT NULL,
        taker_total int UNSIGNED DEFAULT '0' NOT NULL,
        child_total int UNSIGNED DEFAULT '0' NOT NULL,
        comment_total int UNSIGNED DEFAULT '0' NOT NULL,
        important_total int UNSIGNED DEFAULT '0' NOT NULL,
        quote_total int UNSIGNED DEFAULT '0' NOT NULL,
        file_total int UNSIGNED DEFAULT '0' NOT NULL,
        note_total int UNSIGNED DEFAULT '0' NOT NULL,
        record_total int UNSIGNED DEFAULT '0' NOT NULL,
        gadget_meeting_total int UNSIGNED DEFAULT '0' NOT NULL,
        gadget_todo_total int UNSIGNED DEFAULT '0' NOT NULL,
        gadget_time_collect_total int UNSIGNED DEFAULT '0' NOT NULL,
        gadget_notice_total int UNSIGNED DEFAULT '0' NOT NULL,
        CONSTRAINT task_user_idx UNIQUE (task_id, user_id)
    );
DROP TABLE IF EXISTS task_flow_step;
CREATE TABLE IF NOT EXISTS task_flow_step
        (
            id text UNSIGNED NOT NULL
                PRIMARY KEY,
            task_id text UNSIGNED NOT NULL,
            application_flow_step_id text UNSIGNED NOT NULL,
            name varchar(255) DEFAULT '' NOT NULL,
            range_type smallint UNSIGNED NOT NULL,
            range_user_ids json NULL,
            specify_user_ids json NULL,
            operate_type smallint UNSIGNED DEFAULT '1' NOT NULL,
            sort smallint UNSIGNED DEFAULT '0' NOT NULL,
            state smallint DEFAULT 0 NOT NULL,
            complete_at int DEFAULT 0 NOT NULL,
            back_detail varchar(255) DEFAULT '' NOT NULL,
            creator_id text UNSIGNED NOT NULL,
            create_at int UNSIGNED DEFAULT '0' NOT NULL,
            update_at int UNSIGNED DEFAULT '0' NOT NULL
        );
CREATE INDEX IF NOT EXISTS matter_creator_fk ON task_flow_step (creator_id);
DROP TABLE IF EXISTS task_flow_step_relation;
CREATE TABLE task_flow_step_relation
    (
        id bigint UNSIGNED PRIMARY KEY,
        task_id bigint UNSIGNED DEFAULT '0' NOT NULL,
        user_id bigint UNSIGNED DEFAULT '0' NOT NULL,
        step_id bigint UNSIGNED DEFAULT '0' NOT NULL,
        is_lock tinyint(1) DEFAULT 0 NOT NULL,
        complete_at int UNSIGNED DEFAULT '0' NOT NULL,
        is_back tinyint UNSIGNED DEFAULT '0' NOT NULL,
        removed_at int UNSIGNED DEFAULT '0' NOT NULL,
        back_at int UNSIGNED DEFAULT '0' NOT NULL,
        create_at int DEFAULT 0 NOT NULL,
        update_at int DEFAULT 0 NOT NULL,
        delete_at int DEFAULT 0 NOT NULL,
        CONSTRAINT step_user_idx
            UNIQUE (step_id, user_id, delete_at)
    );
DROP TABLE IF EXISTS client_last_data;
CREATE TABLE client_last_data
    (
        table_name text PRIMARY KEY,
        last_id text DEFAULT '0' NOT NULL,
        update_at int DEFAULT 0 NOT NULL
    )`
function Se(at) {
  throw new Error(
    'Could not dynamically require "' +
      at +
      '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.'
  )
}
var qe = {},
  gn = {
    get exports() {
      return qe
    },
    set exports(at) {
      qe = at
    }
  }
/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/ ;(function (at, ut) {
  ;(function (m) {
    at.exports = m()
  })(function () {
    return (function m(B, v, h) {
      function d(r, L) {
        if (!v[r]) {
          if (!B[r]) {
            var b = typeof Se == 'function' && Se
            if (!L && b) return b(r, !0)
            if (s) return s(r, !0)
            var T = new Error("Cannot find module '" + r + "'")
            throw ((T.code = 'MODULE_NOT_FOUND'), T)
          }
          var l = (v[r] = { exports: {} })
          B[r][0].call(
            l.exports,
            function (g) {
              var o = B[r][1][g]
              return d(o || g)
            },
            l,
            l.exports,
            m,
            B,
            v,
            h
          )
        }
        return v[r].exports
      }
      for (var s = typeof Se == 'function' && Se, _ = 0; _ < h.length; _++)
        d(h[_])
      return d
    })(
      {
        1: [
          function (m, B, v) {
            var h = m('./utils'),
              d = m('./support'),
              s =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
            ;(v.encode = function (_) {
              for (
                var r,
                  L,
                  b,
                  T,
                  l,
                  g,
                  o,
                  p = [],
                  f = 0,
                  E = _.length,
                  U = E,
                  x = h.getTypeOf(_) !== 'string';
                f < _.length;

              )
                (U = E - f),
                  (b = x
                    ? ((r = _[f++]),
                      (L = f < E ? _[f++] : 0),
                      f < E ? _[f++] : 0)
                    : ((r = _.charCodeAt(f++)),
                      (L = f < E ? _.charCodeAt(f++) : 0),
                      f < E ? _.charCodeAt(f++) : 0)),
                  (T = r >> 2),
                  (l = ((3 & r) << 4) | (L >> 4)),
                  (g = 1 < U ? ((15 & L) << 2) | (b >> 6) : 64),
                  (o = 2 < U ? 63 & b : 64),
                  p.push(s.charAt(T) + s.charAt(l) + s.charAt(g) + s.charAt(o))
              return p.join('')
            }),
              (v.decode = function (_) {
                var r,
                  L,
                  b,
                  T,
                  l,
                  g,
                  o = 0,
                  p = 0,
                  f = 'data:'
                if (_.substr(0, f.length) === f)
                  throw new Error(
                    'Invalid base64 input, it looks like a data url.'
                  )
                var E,
                  U = (3 * (_ = _.replace(/[^A-Za-z0-9+/=]/g, '')).length) / 4
                if (
                  (_.charAt(_.length - 1) === s.charAt(64) && U--,
                  _.charAt(_.length - 2) === s.charAt(64) && U--,
                  U % 1 != 0)
                )
                  throw new Error('Invalid base64 input, bad content length.')
                for (
                  E = d.uint8array ? new Uint8Array(0 | U) : new Array(0 | U);
                  o < _.length;

                )
                  (r =
                    (s.indexOf(_.charAt(o++)) << 2) |
                    ((T = s.indexOf(_.charAt(o++))) >> 4)),
                    (L =
                      ((15 & T) << 4) | ((l = s.indexOf(_.charAt(o++))) >> 2)),
                    (b = ((3 & l) << 6) | (g = s.indexOf(_.charAt(o++)))),
                    (E[p++] = r),
                    l !== 64 && (E[p++] = L),
                    g !== 64 && (E[p++] = b)
                return E
              })
          },
          { './support': 30, './utils': 32 }
        ],
        2: [
          function (m, B, v) {
            var h = m('./external'),
              d = m('./stream/DataWorker'),
              s = m('./stream/Crc32Probe'),
              _ = m('./stream/DataLengthProbe')
            function r(L, b, T, l, g) {
              ;(this.compressedSize = L),
                (this.uncompressedSize = b),
                (this.crc32 = T),
                (this.compression = l),
                (this.compressedContent = g)
            }
            ;(r.prototype = {
              getContentWorker: function () {
                var L = new d(h.Promise.resolve(this.compressedContent))
                    .pipe(this.compression.uncompressWorker())
                    .pipe(new _('data_length')),
                  b = this
                return (
                  L.on('end', function () {
                    if (this.streamInfo.data_length !== b.uncompressedSize)
                      throw new Error('Bug : uncompressed data size mismatch')
                  }),
                  L
                )
              },
              getCompressedWorker: function () {
                return new d(h.Promise.resolve(this.compressedContent))
                  .withStreamInfo('compressedSize', this.compressedSize)
                  .withStreamInfo('uncompressedSize', this.uncompressedSize)
                  .withStreamInfo('crc32', this.crc32)
                  .withStreamInfo('compression', this.compression)
              }
            }),
              (r.createWorkerFrom = function (L, b, T) {
                return L.pipe(new s())
                  .pipe(new _('uncompressedSize'))
                  .pipe(b.compressWorker(T))
                  .pipe(new _('compressedSize'))
                  .withStreamInfo('compression', b)
              }),
              (B.exports = r)
          },
          {
            './external': 6,
            './stream/Crc32Probe': 25,
            './stream/DataLengthProbe': 26,
            './stream/DataWorker': 27
          }
        ],
        3: [
          function (m, B, v) {
            var h = m('./stream/GenericWorker')
            ;(v.STORE = {
              magic: '\0\0',
              compressWorker: function () {
                return new h('STORE compression')
              },
              uncompressWorker: function () {
                return new h('STORE decompression')
              }
            }),
              (v.DEFLATE = m('./flate'))
          },
          { './flate': 7, './stream/GenericWorker': 28 }
        ],
        4: [
          function (m, B, v) {
            var h = m('./utils'),
              d = (function () {
                for (var s, _ = [], r = 0; r < 256; r++) {
                  s = r
                  for (var L = 0; L < 8; L++)
                    s = 1 & s ? 3988292384 ^ (s >>> 1) : s >>> 1
                  _[r] = s
                }
                return _
              })()
            B.exports = function (s, _) {
              return s !== void 0 && s.length
                ? h.getTypeOf(s) !== 'string'
                  ? (function (r, L, b, T) {
                      var l = d,
                        g = T + b
                      r ^= -1
                      for (var o = T; o < g; o++)
                        r = (r >>> 8) ^ l[255 & (r ^ L[o])]
                      return -1 ^ r
                    })(0 | _, s, s.length, 0)
                  : (function (r, L, b, T) {
                      var l = d,
                        g = T + b
                      r ^= -1
                      for (var o = T; o < g; o++)
                        r = (r >>> 8) ^ l[255 & (r ^ L.charCodeAt(o))]
                      return -1 ^ r
                    })(0 | _, s, s.length, 0)
                : 0
            }
          },
          { './utils': 32 }
        ],
        5: [
          function (m, B, v) {
            ;(v.base64 = !1),
              (v.binary = !1),
              (v.dir = !1),
              (v.createFolders = !0),
              (v.date = null),
              (v.compression = null),
              (v.compressionOptions = null),
              (v.comment = null),
              (v.unixPermissions = null),
              (v.dosPermissions = null)
          },
          {}
        ],
        6: [
          function (m, B, v) {
            var h = null
            ;(h = typeof Promise < 'u' ? Promise : m('lie')),
              (B.exports = { Promise: h })
          },
          { lie: 37 }
        ],
        7: [
          function (m, B, v) {
            var h =
                typeof Uint8Array < 'u' &&
                typeof Uint16Array < 'u' &&
                typeof Uint32Array < 'u',
              d = m('pako'),
              s = m('./utils'),
              _ = m('./stream/GenericWorker'),
              r = h ? 'uint8array' : 'array'
            function L(b, T) {
              _.call(this, 'FlateWorker/' + b),
                (this._pako = null),
                (this._pakoAction = b),
                (this._pakoOptions = T),
                (this.meta = {})
            }
            ;(v.magic = '\b\0'),
              s.inherits(L, _),
              (L.prototype.processChunk = function (b) {
                ;(this.meta = b.meta),
                  this._pako === null && this._createPako(),
                  this._pako.push(s.transformTo(r, b.data), !1)
              }),
              (L.prototype.flush = function () {
                _.prototype.flush.call(this),
                  this._pako === null && this._createPako(),
                  this._pako.push([], !0)
              }),
              (L.prototype.cleanUp = function () {
                _.prototype.cleanUp.call(this), (this._pako = null)
              }),
              (L.prototype._createPako = function () {
                this._pako = new d[this._pakoAction]({
                  raw: !0,
                  level: this._pakoOptions.level || -1
                })
                var b = this
                this._pako.onData = function (T) {
                  b.push({ data: T, meta: b.meta })
                }
              }),
              (v.compressWorker = function (b) {
                return new L('Deflate', b)
              }),
              (v.uncompressWorker = function () {
                return new L('Inflate', {})
              })
          },
          { './stream/GenericWorker': 28, './utils': 32, pako: 38 }
        ],
        8: [
          function (m, B, v) {
            function h(l, g) {
              var o,
                p = ''
              for (o = 0; o < g; o++)
                (p += String.fromCharCode(255 & l)), (l >>>= 8)
              return p
            }
            function d(l, g, o, p, f, E) {
              var U,
                x,
                O = l.file,
                q = l.compression,
                G = E !== r.utf8encode,
                Q = s.transformTo('string', E(O.name)),
                z = s.transformTo('string', r.utf8encode(O.name)),
                W = O.comment,
                lt = s.transformTo('string', E(W)),
                w = s.transformTo('string', r.utf8encode(W)),
                k = z.length !== O.name.length,
                i = w.length !== W.length,
                A = '',
                rt = '',
                I = '',
                $ = O.dir,
                M = O.date,
                H = { crc32: 0, compressedSize: 0, uncompressedSize: 0 }
              ;(g && !o) ||
                ((H.crc32 = l.crc32),
                (H.compressedSize = l.compressedSize),
                (H.uncompressedSize = l.uncompressedSize))
              var D = 0
              g && (D |= 8), G || (!k && !i) || (D |= 2048)
              var F = 0,
                ot = 0
              $ && (F |= 16),
                f === 'UNIX'
                  ? ((ot = 798),
                    (F |= (function (K, yt) {
                      var Tt = K
                      return K || (Tt = yt ? 16893 : 33204), (65535 & Tt) << 16
                    })(O.unixPermissions, $)))
                  : ((ot = 20),
                    (F |= (function (K) {
                      return 63 & (K || 0)
                    })(O.dosPermissions))),
                (U = M.getUTCHours()),
                (U <<= 6),
                (U |= M.getUTCMinutes()),
                (U <<= 5),
                (U |= M.getUTCSeconds() / 2),
                (x = M.getUTCFullYear() - 1980),
                (x <<= 4),
                (x |= M.getUTCMonth() + 1),
                (x <<= 5),
                (x |= M.getUTCDate()),
                k &&
                  ((rt = h(1, 1) + h(L(Q), 4) + z),
                  (A += 'up' + h(rt.length, 2) + rt)),
                i &&
                  ((I = h(1, 1) + h(L(lt), 4) + w),
                  (A += 'uc' + h(I.length, 2) + I))
              var et = ''
              return (
                (et += `
\0`),
                (et += h(D, 2)),
                (et += q.magic),
                (et += h(U, 2)),
                (et += h(x, 2)),
                (et += h(H.crc32, 4)),
                (et += h(H.compressedSize, 4)),
                (et += h(H.uncompressedSize, 4)),
                (et += h(Q.length, 2)),
                (et += h(A.length, 2)),
                {
                  fileRecord: b.LOCAL_FILE_HEADER + et + Q + A,
                  dirRecord:
                    b.CENTRAL_FILE_HEADER +
                    h(ot, 2) +
                    et +
                    h(lt.length, 2) +
                    '\0\0\0\0' +
                    h(F, 4) +
                    h(p, 4) +
                    Q +
                    A +
                    lt
                }
              )
            }
            var s = m('../utils'),
              _ = m('../stream/GenericWorker'),
              r = m('../utf8'),
              L = m('../crc32'),
              b = m('../signature')
            function T(l, g, o, p) {
              _.call(this, 'ZipFileWorker'),
                (this.bytesWritten = 0),
                (this.zipComment = g),
                (this.zipPlatform = o),
                (this.encodeFileName = p),
                (this.streamFiles = l),
                (this.accumulate = !1),
                (this.contentBuffer = []),
                (this.dirRecords = []),
                (this.currentSourceOffset = 0),
                (this.entriesCount = 0),
                (this.currentFile = null),
                (this._sources = [])
            }
            s.inherits(T, _),
              (T.prototype.push = function (l) {
                var g = l.meta.percent || 0,
                  o = this.entriesCount,
                  p = this._sources.length
                this.accumulate
                  ? this.contentBuffer.push(l)
                  : ((this.bytesWritten += l.data.length),
                    _.prototype.push.call(this, {
                      data: l.data,
                      meta: {
                        currentFile: this.currentFile,
                        percent: o ? (g + 100 * (o - p - 1)) / o : 100
                      }
                    }))
              }),
              (T.prototype.openedSource = function (l) {
                ;(this.currentSourceOffset = this.bytesWritten),
                  (this.currentFile = l.file.name)
                var g = this.streamFiles && !l.file.dir
                if (g) {
                  var o = d(
                    l,
                    g,
                    !1,
                    this.currentSourceOffset,
                    this.zipPlatform,
                    this.encodeFileName
                  )
                  this.push({ data: o.fileRecord, meta: { percent: 0 } })
                } else this.accumulate = !0
              }),
              (T.prototype.closedSource = function (l) {
                this.accumulate = !1
                var g = this.streamFiles && !l.file.dir,
                  o = d(
                    l,
                    g,
                    !0,
                    this.currentSourceOffset,
                    this.zipPlatform,
                    this.encodeFileName
                  )
                if ((this.dirRecords.push(o.dirRecord), g))
                  this.push({
                    data: (function (p) {
                      return (
                        b.DATA_DESCRIPTOR +
                        h(p.crc32, 4) +
                        h(p.compressedSize, 4) +
                        h(p.uncompressedSize, 4)
                      )
                    })(l),
                    meta: { percent: 100 }
                  })
                else
                  for (
                    this.push({ data: o.fileRecord, meta: { percent: 0 } });
                    this.contentBuffer.length;

                  )
                    this.push(this.contentBuffer.shift())
                this.currentFile = null
              }),
              (T.prototype.flush = function () {
                for (
                  var l = this.bytesWritten, g = 0;
                  g < this.dirRecords.length;
                  g++
                )
                  this.push({
                    data: this.dirRecords[g],
                    meta: { percent: 100 }
                  })
                var o = this.bytesWritten - l,
                  p = (function (f, E, U, x, O) {
                    var q = s.transformTo('string', O(x))
                    return (
                      b.CENTRAL_DIRECTORY_END +
                      '\0\0\0\0' +
                      h(f, 2) +
                      h(f, 2) +
                      h(E, 4) +
                      h(U, 4) +
                      h(q.length, 2) +
                      q
                    )
                  })(
                    this.dirRecords.length,
                    o,
                    l,
                    this.zipComment,
                    this.encodeFileName
                  )
                this.push({ data: p, meta: { percent: 100 } })
              }),
              (T.prototype.prepareNextSource = function () {
                ;(this.previous = this._sources.shift()),
                  this.openedSource(this.previous.streamInfo),
                  this.isPaused ? this.previous.pause() : this.previous.resume()
              }),
              (T.prototype.registerPrevious = function (l) {
                this._sources.push(l)
                var g = this
                return (
                  l.on('data', function (o) {
                    g.processChunk(o)
                  }),
                  l.on('end', function () {
                    g.closedSource(g.previous.streamInfo),
                      g._sources.length ? g.prepareNextSource() : g.end()
                  }),
                  l.on('error', function (o) {
                    g.error(o)
                  }),
                  this
                )
              }),
              (T.prototype.resume = function () {
                return (
                  !!_.prototype.resume.call(this) &&
                  (!this.previous && this._sources.length
                    ? (this.prepareNextSource(), !0)
                    : this.previous ||
                      this._sources.length ||
                      this.generatedError
                    ? void 0
                    : (this.end(), !0))
                )
              }),
              (T.prototype.error = function (l) {
                var g = this._sources
                if (!_.prototype.error.call(this, l)) return !1
                for (var o = 0; o < g.length; o++)
                  try {
                    g[o].error(l)
                  } catch {}
                return !0
              }),
              (T.prototype.lock = function () {
                _.prototype.lock.call(this)
                for (var l = this._sources, g = 0; g < l.length; g++)
                  l[g].lock()
              }),
              (B.exports = T)
          },
          {
            '../crc32': 4,
            '../signature': 23,
            '../stream/GenericWorker': 28,
            '../utf8': 31,
            '../utils': 32
          }
        ],
        9: [
          function (m, B, v) {
            var h = m('../compressions'),
              d = m('./ZipFileWorker')
            v.generateWorker = function (s, _, r) {
              var L = new d(_.streamFiles, r, _.platform, _.encodeFileName),
                b = 0
              try {
                s.forEach(function (T, l) {
                  b++
                  var g = (function (E, U) {
                      var x = E || U,
                        O = h[x]
                      if (!O)
                        throw new Error(
                          x + ' is not a valid compression method !'
                        )
                      return O
                    })(l.options.compression, _.compression),
                    o =
                      l.options.compressionOptions ||
                      _.compressionOptions ||
                      {},
                    p = l.dir,
                    f = l.date
                  l._compressWorker(g, o)
                    .withStreamInfo('file', {
                      name: T,
                      dir: p,
                      date: f,
                      comment: l.comment || '',
                      unixPermissions: l.unixPermissions,
                      dosPermissions: l.dosPermissions
                    })
                    .pipe(L)
                }),
                  (L.entriesCount = b)
              } catch (T) {
                L.error(T)
              }
              return L
            }
          },
          { '../compressions': 3, './ZipFileWorker': 8 }
        ],
        10: [
          function (m, B, v) {
            function h() {
              if (!(this instanceof h)) return new h()
              if (arguments.length)
                throw new Error(
                  'The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.'
                )
              ;(this.files = Object.create(null)),
                (this.comment = null),
                (this.root = ''),
                (this.clone = function () {
                  var d = new h()
                  for (var s in this)
                    typeof this[s] != 'function' && (d[s] = this[s])
                  return d
                })
            }
            ;((h.prototype = m('./object')).loadAsync = m('./load')),
              (h.support = m('./support')),
              (h.defaults = m('./defaults')),
              (h.version = '3.10.1'),
              (h.loadAsync = function (d, s) {
                return new h().loadAsync(d, s)
              }),
              (h.external = m('./external')),
              (B.exports = h)
          },
          {
            './defaults': 5,
            './external': 6,
            './load': 11,
            './object': 15,
            './support': 30
          }
        ],
        11: [
          function (m, B, v) {
            var h = m('./utils'),
              d = m('./external'),
              s = m('./utf8'),
              _ = m('./zipEntries'),
              r = m('./stream/Crc32Probe'),
              L = m('./nodejsUtils')
            function b(T) {
              return new d.Promise(function (l, g) {
                var o = T.decompressed.getContentWorker().pipe(new r())
                o.on('error', function (p) {
                  g(p)
                })
                  .on('end', function () {
                    o.streamInfo.crc32 !== T.decompressed.crc32
                      ? g(new Error('Corrupted zip : CRC32 mismatch'))
                      : l()
                  })
                  .resume()
              })
            }
            B.exports = function (T, l) {
              var g = this
              return (
                (l = h.extend(l || {}, {
                  base64: !1,
                  checkCRC32: !1,
                  optimizedBinaryString: !1,
                  createFolders: !1,
                  decodeFileName: s.utf8decode
                })),
                L.isNode && L.isStream(T)
                  ? d.Promise.reject(
                      new Error(
                        "JSZip can't accept a stream when loading a zip file."
                      )
                    )
                  : h
                      .prepareContent(
                        'the loaded zip file',
                        T,
                        !0,
                        l.optimizedBinaryString,
                        l.base64
                      )
                      .then(function (o) {
                        var p = new _(l)
                        return p.load(o), p
                      })
                      .then(function (o) {
                        var p = [d.Promise.resolve(o)],
                          f = o.files
                        if (l.checkCRC32)
                          for (var E = 0; E < f.length; E++) p.push(b(f[E]))
                        return d.Promise.all(p)
                      })
                      .then(function (o) {
                        for (
                          var p = o.shift(), f = p.files, E = 0;
                          E < f.length;
                          E++
                        ) {
                          var U = f[E],
                            x = U.fileNameStr,
                            O = h.resolve(U.fileNameStr)
                          g.file(O, U.decompressed, {
                            binary: !0,
                            optimizedBinaryString: !0,
                            date: U.date,
                            dir: U.dir,
                            comment: U.fileCommentStr.length
                              ? U.fileCommentStr
                              : null,
                            unixPermissions: U.unixPermissions,
                            dosPermissions: U.dosPermissions,
                            createFolders: l.createFolders
                          }),
                            U.dir || (g.file(O).unsafeOriginalName = x)
                        }
                        return (
                          p.zipComment.length && (g.comment = p.zipComment), g
                        )
                      })
              )
            }
          },
          {
            './external': 6,
            './nodejsUtils': 14,
            './stream/Crc32Probe': 25,
            './utf8': 31,
            './utils': 32,
            './zipEntries': 33
          }
        ],
        12: [
          function (m, B, v) {
            var h = m('../utils'),
              d = m('../stream/GenericWorker')
            function s(_, r) {
              d.call(this, 'Nodejs stream input adapter for ' + _),
                (this._upstreamEnded = !1),
                this._bindStream(r)
            }
            h.inherits(s, d),
              (s.prototype._bindStream = function (_) {
                var r = this
                ;(this._stream = _).pause(),
                  _.on('data', function (L) {
                    r.push({ data: L, meta: { percent: 0 } })
                  })
                    .on('error', function (L) {
                      r.isPaused ? (this.generatedError = L) : r.error(L)
                    })
                    .on('end', function () {
                      r.isPaused ? (r._upstreamEnded = !0) : r.end()
                    })
              }),
              (s.prototype.pause = function () {
                return (
                  !!d.prototype.pause.call(this) && (this._stream.pause(), !0)
                )
              }),
              (s.prototype.resume = function () {
                return (
                  !!d.prototype.resume.call(this) &&
                  (this._upstreamEnded ? this.end() : this._stream.resume(), !0)
                )
              }),
              (B.exports = s)
          },
          { '../stream/GenericWorker': 28, '../utils': 32 }
        ],
        13: [
          function (m, B, v) {
            var h = m('readable-stream').Readable
            function d(s, _, r) {
              h.call(this, _), (this._helper = s)
              var L = this
              s.on('data', function (b, T) {
                L.push(b) || L._helper.pause(), r && r(T)
              })
                .on('error', function (b) {
                  L.emit('error', b)
                })
                .on('end', function () {
                  L.push(null)
                })
            }
            m('../utils').inherits(d, h),
              (d.prototype._read = function () {
                this._helper.resume()
              }),
              (B.exports = d)
          },
          { '../utils': 32, 'readable-stream': 16 }
        ],
        14: [
          function (m, B, v) {
            B.exports = {
              isNode: typeof Buffer < 'u',
              newBufferFrom: function (h, d) {
                if (Buffer.from && Buffer.from !== Uint8Array.from)
                  return Buffer.from(h, d)
                if (typeof h == 'number')
                  throw new Error('The "data" argument must not be a number')
                return new Buffer(h, d)
              },
              allocBuffer: function (h) {
                if (Buffer.alloc) return Buffer.alloc(h)
                var d = new Buffer(h)
                return d.fill(0), d
              },
              isBuffer: function (h) {
                return Buffer.isBuffer(h)
              },
              isStream: function (h) {
                return (
                  h &&
                  typeof h.on == 'function' &&
                  typeof h.pause == 'function' &&
                  typeof h.resume == 'function'
                )
              }
            }
          },
          {}
        ],
        15: [
          function (m, B, v) {
            function h(O, q, G) {
              var Q,
                z = s.getTypeOf(q),
                W = s.extend(G || {}, L)
              ;(W.date = W.date || new Date()),
                W.compression !== null &&
                  (W.compression = W.compression.toUpperCase()),
                typeof W.unixPermissions == 'string' &&
                  (W.unixPermissions = parseInt(W.unixPermissions, 8)),
                W.unixPermissions && 16384 & W.unixPermissions && (W.dir = !0),
                W.dosPermissions && 16 & W.dosPermissions && (W.dir = !0),
                W.dir && (O = f(O)),
                W.createFolders && (Q = p(O)) && E.call(this, Q, !0)
              var lt = z === 'string' && W.binary === !1 && W.base64 === !1
              ;(G && G.binary !== void 0) || (W.binary = !lt),
                ((q instanceof b && q.uncompressedSize === 0) ||
                  W.dir ||
                  !q ||
                  q.length === 0) &&
                  ((W.base64 = !1),
                  (W.binary = !0),
                  (q = ''),
                  (W.compression = 'STORE'),
                  (z = 'string'))
              var w = null
              w =
                q instanceof b || q instanceof _
                  ? q
                  : g.isNode && g.isStream(q)
                  ? new o(O, q)
                  : s.prepareContent(
                      O,
                      q,
                      W.binary,
                      W.optimizedBinaryString,
                      W.base64
                    )
              var k = new T(O, w, W)
              this.files[O] = k
            }
            var d = m('./utf8'),
              s = m('./utils'),
              _ = m('./stream/GenericWorker'),
              r = m('./stream/StreamHelper'),
              L = m('./defaults'),
              b = m('./compressedObject'),
              T = m('./zipObject'),
              l = m('./generate'),
              g = m('./nodejsUtils'),
              o = m('./nodejs/NodejsStreamInputAdapter'),
              p = function (O) {
                O.slice(-1) === '/' && (O = O.substring(0, O.length - 1))
                var q = O.lastIndexOf('/')
                return 0 < q ? O.substring(0, q) : ''
              },
              f = function (O) {
                return O.slice(-1) !== '/' && (O += '/'), O
              },
              E = function (O, q) {
                return (
                  (q = q !== void 0 ? q : L.createFolders),
                  (O = f(O)),
                  this.files[O] ||
                    h.call(this, O, null, { dir: !0, createFolders: q }),
                  this.files[O]
                )
              }
            function U(O) {
              return Object.prototype.toString.call(O) === '[object RegExp]'
            }
            var x = {
              load: function () {
                throw new Error(
                  'This method has been removed in JSZip 3.0, please check the upgrade guide.'
                )
              },
              forEach: function (O) {
                var q, G, Q
                for (q in this.files)
                  (Q = this.files[q]),
                    (G = q.slice(this.root.length, q.length)) &&
                      q.slice(0, this.root.length) === this.root &&
                      O(G, Q)
              },
              filter: function (O) {
                var q = []
                return (
                  this.forEach(function (G, Q) {
                    O(G, Q) && q.push(Q)
                  }),
                  q
                )
              },
              file: function (O, q, G) {
                if (arguments.length !== 1)
                  return (O = this.root + O), h.call(this, O, q, G), this
                if (U(O)) {
                  var Q = O
                  return this.filter(function (W, lt) {
                    return !lt.dir && Q.test(W)
                  })
                }
                var z = this.files[this.root + O]
                return z && !z.dir ? z : null
              },
              folder: function (O) {
                if (!O) return this
                if (U(O))
                  return this.filter(function (z, W) {
                    return W.dir && O.test(z)
                  })
                var q = this.root + O,
                  G = E.call(this, q),
                  Q = this.clone()
                return (Q.root = G.name), Q
              },
              remove: function (O) {
                O = this.root + O
                var q = this.files[O]
                if (
                  (q ||
                    (O.slice(-1) !== '/' && (O += '/'), (q = this.files[O])),
                  q && !q.dir)
                )
                  delete this.files[O]
                else
                  for (
                    var G = this.filter(function (z, W) {
                        return W.name.slice(0, O.length) === O
                      }),
                      Q = 0;
                    Q < G.length;
                    Q++
                  )
                    delete this.files[G[Q].name]
                return this
              },
              generate: function () {
                throw new Error(
                  'This method has been removed in JSZip 3.0, please check the upgrade guide.'
                )
              },
              generateInternalStream: function (O) {
                var q,
                  G = {}
                try {
                  if (
                    (((G = s.extend(O || {}, {
                      streamFiles: !1,
                      compression: 'STORE',
                      compressionOptions: null,
                      type: '',
                      platform: 'DOS',
                      comment: null,
                      mimeType: 'application/zip',
                      encodeFileName: d.utf8encode
                    })).type = G.type.toLowerCase()),
                    (G.compression = G.compression.toUpperCase()),
                    G.type === 'binarystring' && (G.type = 'string'),
                    !G.type)
                  )
                    throw new Error('No output type specified.')
                  s.checkSupport(G.type),
                    (G.platform !== 'darwin' &&
                      G.platform !== 'freebsd' &&
                      G.platform !== 'linux' &&
                      G.platform !== 'sunos') ||
                      (G.platform = 'UNIX'),
                    G.platform === 'win32' && (G.platform = 'DOS')
                  var Q = G.comment || this.comment || ''
                  q = l.generateWorker(this, G, Q)
                } catch (z) {
                  ;(q = new _('error')).error(z)
                }
                return new r(q, G.type || 'string', G.mimeType)
              },
              generateAsync: function (O, q) {
                return this.generateInternalStream(O).accumulate(q)
              },
              generateNodeStream: function (O, q) {
                return (
                  (O = O || {}).type || (O.type = 'nodebuffer'),
                  this.generateInternalStream(O).toNodejsStream(q)
                )
              }
            }
            B.exports = x
          },
          {
            './compressedObject': 2,
            './defaults': 5,
            './generate': 9,
            './nodejs/NodejsStreamInputAdapter': 12,
            './nodejsUtils': 14,
            './stream/GenericWorker': 28,
            './stream/StreamHelper': 29,
            './utf8': 31,
            './utils': 32,
            './zipObject': 35
          }
        ],
        16: [
          function (m, B, v) {
            B.exports = m('stream')
          },
          { stream: void 0 }
        ],
        17: [
          function (m, B, v) {
            var h = m('./DataReader')
            function d(s) {
              h.call(this, s)
              for (var _ = 0; _ < this.data.length; _++) s[_] = 255 & s[_]
            }
            m('../utils').inherits(d, h),
              (d.prototype.byteAt = function (s) {
                return this.data[this.zero + s]
              }),
              (d.prototype.lastIndexOfSignature = function (s) {
                for (
                  var _ = s.charCodeAt(0),
                    r = s.charCodeAt(1),
                    L = s.charCodeAt(2),
                    b = s.charCodeAt(3),
                    T = this.length - 4;
                  0 <= T;
                  --T
                )
                  if (
                    this.data[T] === _ &&
                    this.data[T + 1] === r &&
                    this.data[T + 2] === L &&
                    this.data[T + 3] === b
                  )
                    return T - this.zero
                return -1
              }),
              (d.prototype.readAndCheckSignature = function (s) {
                var _ = s.charCodeAt(0),
                  r = s.charCodeAt(1),
                  L = s.charCodeAt(2),
                  b = s.charCodeAt(3),
                  T = this.readData(4)
                return _ === T[0] && r === T[1] && L === T[2] && b === T[3]
              }),
              (d.prototype.readData = function (s) {
                if ((this.checkOffset(s), s === 0)) return []
                var _ = this.data.slice(
                  this.zero + this.index,
                  this.zero + this.index + s
                )
                return (this.index += s), _
              }),
              (B.exports = d)
          },
          { '../utils': 32, './DataReader': 18 }
        ],
        18: [
          function (m, B, v) {
            var h = m('../utils')
            function d(s) {
              ;(this.data = s),
                (this.length = s.length),
                (this.index = 0),
                (this.zero = 0)
            }
            ;(d.prototype = {
              checkOffset: function (s) {
                this.checkIndex(this.index + s)
              },
              checkIndex: function (s) {
                if (this.length < this.zero + s || s < 0)
                  throw new Error(
                    'End of data reached (data length = ' +
                      this.length +
                      ', asked index = ' +
                      s +
                      '). Corrupted zip ?'
                  )
              },
              setIndex: function (s) {
                this.checkIndex(s), (this.index = s)
              },
              skip: function (s) {
                this.setIndex(this.index + s)
              },
              byteAt: function () {},
              readInt: function (s) {
                var _,
                  r = 0
                for (
                  this.checkOffset(s), _ = this.index + s - 1;
                  _ >= this.index;
                  _--
                )
                  r = (r << 8) + this.byteAt(_)
                return (this.index += s), r
              },
              readString: function (s) {
                return h.transformTo('string', this.readData(s))
              },
              readData: function () {},
              lastIndexOfSignature: function () {},
              readAndCheckSignature: function () {},
              readDate: function () {
                var s = this.readInt(4)
                return new Date(
                  Date.UTC(
                    1980 + ((s >> 25) & 127),
                    ((s >> 21) & 15) - 1,
                    (s >> 16) & 31,
                    (s >> 11) & 31,
                    (s >> 5) & 63,
                    (31 & s) << 1
                  )
                )
              }
            }),
              (B.exports = d)
          },
          { '../utils': 32 }
        ],
        19: [
          function (m, B, v) {
            var h = m('./Uint8ArrayReader')
            function d(s) {
              h.call(this, s)
            }
            m('../utils').inherits(d, h),
              (d.prototype.readData = function (s) {
                this.checkOffset(s)
                var _ = this.data.slice(
                  this.zero + this.index,
                  this.zero + this.index + s
                )
                return (this.index += s), _
              }),
              (B.exports = d)
          },
          { '../utils': 32, './Uint8ArrayReader': 21 }
        ],
        20: [
          function (m, B, v) {
            var h = m('./DataReader')
            function d(s) {
              h.call(this, s)
            }
            m('../utils').inherits(d, h),
              (d.prototype.byteAt = function (s) {
                return this.data.charCodeAt(this.zero + s)
              }),
              (d.prototype.lastIndexOfSignature = function (s) {
                return this.data.lastIndexOf(s) - this.zero
              }),
              (d.prototype.readAndCheckSignature = function (s) {
                return s === this.readData(4)
              }),
              (d.prototype.readData = function (s) {
                this.checkOffset(s)
                var _ = this.data.slice(
                  this.zero + this.index,
                  this.zero + this.index + s
                )
                return (this.index += s), _
              }),
              (B.exports = d)
          },
          { '../utils': 32, './DataReader': 18 }
        ],
        21: [
          function (m, B, v) {
            var h = m('./ArrayReader')
            function d(s) {
              h.call(this, s)
            }
            m('../utils').inherits(d, h),
              (d.prototype.readData = function (s) {
                if ((this.checkOffset(s), s === 0)) return new Uint8Array(0)
                var _ = this.data.subarray(
                  this.zero + this.index,
                  this.zero + this.index + s
                )
                return (this.index += s), _
              }),
              (B.exports = d)
          },
          { '../utils': 32, './ArrayReader': 17 }
        ],
        22: [
          function (m, B, v) {
            var h = m('../utils'),
              d = m('../support'),
              s = m('./ArrayReader'),
              _ = m('./StringReader'),
              r = m('./NodeBufferReader'),
              L = m('./Uint8ArrayReader')
            B.exports = function (b) {
              var T = h.getTypeOf(b)
              return (
                h.checkSupport(T),
                T !== 'string' || d.uint8array
                  ? T === 'nodebuffer'
                    ? new r(b)
                    : d.uint8array
                    ? new L(h.transformTo('uint8array', b))
                    : new s(h.transformTo('array', b))
                  : new _(b)
              )
            }
          },
          {
            '../support': 30,
            '../utils': 32,
            './ArrayReader': 17,
            './NodeBufferReader': 19,
            './StringReader': 20,
            './Uint8ArrayReader': 21
          }
        ],
        23: [
          function (m, B, v) {
            ;(v.LOCAL_FILE_HEADER = 'PK'),
              (v.CENTRAL_FILE_HEADER = 'PK'),
              (v.CENTRAL_DIRECTORY_END = 'PK'),
              (v.ZIP64_CENTRAL_DIRECTORY_LOCATOR = 'PK\x07'),
              (v.ZIP64_CENTRAL_DIRECTORY_END = 'PK'),
              (v.DATA_DESCRIPTOR = 'PK\x07\b')
          },
          {}
        ],
        24: [
          function (m, B, v) {
            var h = m('./GenericWorker'),
              d = m('../utils')
            function s(_) {
              h.call(this, 'ConvertWorker to ' + _), (this.destType = _)
            }
            d.inherits(s, h),
              (s.prototype.processChunk = function (_) {
                this.push({
                  data: d.transformTo(this.destType, _.data),
                  meta: _.meta
                })
              }),
              (B.exports = s)
          },
          { '../utils': 32, './GenericWorker': 28 }
        ],
        25: [
          function (m, B, v) {
            var h = m('./GenericWorker'),
              d = m('../crc32')
            function s() {
              h.call(this, 'Crc32Probe'), this.withStreamInfo('crc32', 0)
            }
            m('../utils').inherits(s, h),
              (s.prototype.processChunk = function (_) {
                ;(this.streamInfo.crc32 = d(
                  _.data,
                  this.streamInfo.crc32 || 0
                )),
                  this.push(_)
              }),
              (B.exports = s)
          },
          { '../crc32': 4, '../utils': 32, './GenericWorker': 28 }
        ],
        26: [
          function (m, B, v) {
            var h = m('../utils'),
              d = m('./GenericWorker')
            function s(_) {
              d.call(this, 'DataLengthProbe for ' + _),
                (this.propName = _),
                this.withStreamInfo(_, 0)
            }
            h.inherits(s, d),
              (s.prototype.processChunk = function (_) {
                if (_) {
                  var r = this.streamInfo[this.propName] || 0
                  this.streamInfo[this.propName] = r + _.data.length
                }
                d.prototype.processChunk.call(this, _)
              }),
              (B.exports = s)
          },
          { '../utils': 32, './GenericWorker': 28 }
        ],
        27: [
          function (m, B, v) {
            var h = m('../utils'),
              d = m('./GenericWorker')
            function s(_) {
              d.call(this, 'DataWorker')
              var r = this
              ;(this.dataIsReady = !1),
                (this.index = 0),
                (this.max = 0),
                (this.data = null),
                (this.type = ''),
                (this._tickScheduled = !1),
                _.then(
                  function (L) {
                    ;(r.dataIsReady = !0),
                      (r.data = L),
                      (r.max = (L && L.length) || 0),
                      (r.type = h.getTypeOf(L)),
                      r.isPaused || r._tickAndRepeat()
                  },
                  function (L) {
                    r.error(L)
                  }
                )
            }
            h.inherits(s, d),
              (s.prototype.cleanUp = function () {
                d.prototype.cleanUp.call(this), (this.data = null)
              }),
              (s.prototype.resume = function () {
                return (
                  !!d.prototype.resume.call(this) &&
                  (!this._tickScheduled &&
                    this.dataIsReady &&
                    ((this._tickScheduled = !0),
                    h.delay(this._tickAndRepeat, [], this)),
                  !0)
                )
              }),
              (s.prototype._tickAndRepeat = function () {
                ;(this._tickScheduled = !1),
                  this.isPaused ||
                    this.isFinished ||
                    (this._tick(),
                    this.isFinished ||
                      (h.delay(this._tickAndRepeat, [], this),
                      (this._tickScheduled = !0)))
              }),
              (s.prototype._tick = function () {
                if (this.isPaused || this.isFinished) return !1
                var _ = null,
                  r = Math.min(this.max, this.index + 16384)
                if (this.index >= this.max) return this.end()
                switch (this.type) {
                  case 'string':
                    _ = this.data.substring(this.index, r)
                    break
                  case 'uint8array':
                    _ = this.data.subarray(this.index, r)
                    break
                  case 'array':
                  case 'nodebuffer':
                    _ = this.data.slice(this.index, r)
                }
                return (
                  (this.index = r),
                  this.push({
                    data: _,
                    meta: {
                      percent: this.max ? (this.index / this.max) * 100 : 0
                    }
                  })
                )
              }),
              (B.exports = s)
          },
          { '../utils': 32, './GenericWorker': 28 }
        ],
        28: [
          function (m, B, v) {
            function h(d) {
              ;(this.name = d || 'default'),
                (this.streamInfo = {}),
                (this.generatedError = null),
                (this.extraStreamInfo = {}),
                (this.isPaused = !0),
                (this.isFinished = !1),
                (this.isLocked = !1),
                (this._listeners = { data: [], end: [], error: [] }),
                (this.previous = null)
            }
            ;(h.prototype = {
              push: function (d) {
                this.emit('data', d)
              },
              end: function () {
                if (this.isFinished) return !1
                this.flush()
                try {
                  this.emit('end'), this.cleanUp(), (this.isFinished = !0)
                } catch (d) {
                  this.emit('error', d)
                }
                return !0
              },
              error: function (d) {
                return (
                  !this.isFinished &&
                  (this.isPaused
                    ? (this.generatedError = d)
                    : ((this.isFinished = !0),
                      this.emit('error', d),
                      this.previous && this.previous.error(d),
                      this.cleanUp()),
                  !0)
                )
              },
              on: function (d, s) {
                return this._listeners[d].push(s), this
              },
              cleanUp: function () {
                ;(this.streamInfo =
                  this.generatedError =
                  this.extraStreamInfo =
                    null),
                  (this._listeners = [])
              },
              emit: function (d, s) {
                if (this._listeners[d])
                  for (var _ = 0; _ < this._listeners[d].length; _++)
                    this._listeners[d][_].call(this, s)
              },
              pipe: function (d) {
                return d.registerPrevious(this)
              },
              registerPrevious: function (d) {
                if (this.isLocked)
                  throw new Error(
                    "The stream '" + this + "' has already been used."
                  )
                ;(this.streamInfo = d.streamInfo),
                  this.mergeStreamInfo(),
                  (this.previous = d)
                var s = this
                return (
                  d.on('data', function (_) {
                    s.processChunk(_)
                  }),
                  d.on('end', function () {
                    s.end()
                  }),
                  d.on('error', function (_) {
                    s.error(_)
                  }),
                  this
                )
              },
              pause: function () {
                return (
                  !this.isPaused &&
                  !this.isFinished &&
                  ((this.isPaused = !0),
                  this.previous && this.previous.pause(),
                  !0)
                )
              },
              resume: function () {
                if (!this.isPaused || this.isFinished) return !1
                var d = (this.isPaused = !1)
                return (
                  this.generatedError &&
                    (this.error(this.generatedError), (d = !0)),
                  this.previous && this.previous.resume(),
                  !d
                )
              },
              flush: function () {},
              processChunk: function (d) {
                this.push(d)
              },
              withStreamInfo: function (d, s) {
                return (
                  (this.extraStreamInfo[d] = s), this.mergeStreamInfo(), this
                )
              },
              mergeStreamInfo: function () {
                for (var d in this.extraStreamInfo)
                  Object.prototype.hasOwnProperty.call(
                    this.extraStreamInfo,
                    d
                  ) && (this.streamInfo[d] = this.extraStreamInfo[d])
              },
              lock: function () {
                if (this.isLocked)
                  throw new Error(
                    "The stream '" + this + "' has already been used."
                  )
                ;(this.isLocked = !0), this.previous && this.previous.lock()
              },
              toString: function () {
                var d = 'Worker ' + this.name
                return this.previous ? this.previous + ' -> ' + d : d
              }
            }),
              (B.exports = h)
          },
          {}
        ],
        29: [
          function (m, B, v) {
            var h = m('../utils'),
              d = m('./ConvertWorker'),
              s = m('./GenericWorker'),
              _ = m('../base64'),
              r = m('../support'),
              L = m('../external'),
              b = null
            if (r.nodestream)
              try {
                b = m('../nodejs/NodejsStreamOutputAdapter')
              } catch {}
            function T(g, o) {
              return new L.Promise(function (p, f) {
                var E = [],
                  U = g._internalType,
                  x = g._outputType,
                  O = g._mimeType
                g.on('data', function (q, G) {
                  E.push(q), o && o(G)
                })
                  .on('error', function (q) {
                    ;(E = []), f(q)
                  })
                  .on('end', function () {
                    try {
                      var q = (function (G, Q, z) {
                        switch (G) {
                          case 'blob':
                            return h.newBlob(h.transformTo('arraybuffer', Q), z)
                          case 'base64':
                            return _.encode(Q)
                          default:
                            return h.transformTo(G, Q)
                        }
                      })(
                        x,
                        (function (G, Q) {
                          var z,
                            W = 0,
                            lt = null,
                            w = 0
                          for (z = 0; z < Q.length; z++) w += Q[z].length
                          switch (G) {
                            case 'string':
                              return Q.join('')
                            case 'array':
                              return Array.prototype.concat.apply([], Q)
                            case 'uint8array':
                              for (
                                lt = new Uint8Array(w), z = 0;
                                z < Q.length;
                                z++
                              )
                                lt.set(Q[z], W), (W += Q[z].length)
                              return lt
                            case 'nodebuffer':
                              return Buffer.concat(Q)
                            default:
                              throw new Error(
                                "concat : unsupported type '" + G + "'"
                              )
                          }
                        })(U, E),
                        O
                      )
                      p(q)
                    } catch (G) {
                      f(G)
                    }
                    E = []
                  })
                  .resume()
              })
            }
            function l(g, o, p) {
              var f = o
              switch (o) {
                case 'blob':
                case 'arraybuffer':
                  f = 'uint8array'
                  break
                case 'base64':
                  f = 'string'
              }
              try {
                ;(this._internalType = f),
                  (this._outputType = o),
                  (this._mimeType = p),
                  h.checkSupport(f),
                  (this._worker = g.pipe(new d(f))),
                  g.lock()
              } catch (E) {
                ;(this._worker = new s('error')), this._worker.error(E)
              }
            }
            ;(l.prototype = {
              accumulate: function (g) {
                return T(this, g)
              },
              on: function (g, o) {
                var p = this
                return (
                  g === 'data'
                    ? this._worker.on(g, function (f) {
                        o.call(p, f.data, f.meta)
                      })
                    : this._worker.on(g, function () {
                        h.delay(o, arguments, p)
                      }),
                  this
                )
              },
              resume: function () {
                return h.delay(this._worker.resume, [], this._worker), this
              },
              pause: function () {
                return this._worker.pause(), this
              },
              toNodejsStream: function (g) {
                if (
                  (h.checkSupport('nodestream'),
                  this._outputType !== 'nodebuffer')
                )
                  throw new Error(
                    this._outputType + ' is not supported by this method'
                  )
                return new b(
                  this,
                  { objectMode: this._outputType !== 'nodebuffer' },
                  g
                )
              }
            }),
              (B.exports = l)
          },
          {
            '../base64': 1,
            '../external': 6,
            '../nodejs/NodejsStreamOutputAdapter': 13,
            '../support': 30,
            '../utils': 32,
            './ConvertWorker': 24,
            './GenericWorker': 28
          }
        ],
        30: [
          function (m, B, v) {
            if (
              ((v.base64 = !0),
              (v.array = !0),
              (v.string = !0),
              (v.arraybuffer =
                typeof ArrayBuffer < 'u' && typeof Uint8Array < 'u'),
              (v.nodebuffer = typeof Buffer < 'u'),
              (v.uint8array = typeof Uint8Array < 'u'),
              typeof ArrayBuffer > 'u')
            )
              v.blob = !1
            else {
              var h = new ArrayBuffer(0)
              try {
                v.blob = new Blob([h], { type: 'application/zip' }).size === 0
              } catch {
                try {
                  var d = new (self.BlobBuilder ||
                    self.WebKitBlobBuilder ||
                    self.MozBlobBuilder ||
                    self.MSBlobBuilder)()
                  d.append(h),
                    (v.blob = d.getBlob('application/zip').size === 0)
                } catch {
                  v.blob = !1
                }
              }
            }
            try {
              v.nodestream = !!m('readable-stream').Readable
            } catch {
              v.nodestream = !1
            }
          },
          { 'readable-stream': 16 }
        ],
        31: [
          function (m, B, v) {
            for (
              var h = m('./utils'),
                d = m('./support'),
                s = m('./nodejsUtils'),
                _ = m('./stream/GenericWorker'),
                r = new Array(256),
                L = 0;
              L < 256;
              L++
            )
              r[L] =
                252 <= L
                  ? 6
                  : 248 <= L
                  ? 5
                  : 240 <= L
                  ? 4
                  : 224 <= L
                  ? 3
                  : 192 <= L
                  ? 2
                  : 1
            r[254] = r[254] = 1
            function b() {
              _.call(this, 'utf-8 decode'), (this.leftOver = null)
            }
            function T() {
              _.call(this, 'utf-8 encode')
            }
            ;(v.utf8encode = function (l) {
              return d.nodebuffer
                ? s.newBufferFrom(l, 'utf-8')
                : (function (g) {
                    var o,
                      p,
                      f,
                      E,
                      U,
                      x = g.length,
                      O = 0
                    for (E = 0; E < x; E++)
                      (64512 & (p = g.charCodeAt(E))) == 55296 &&
                        E + 1 < x &&
                        (64512 & (f = g.charCodeAt(E + 1))) == 56320 &&
                        ((p = 65536 + ((p - 55296) << 10) + (f - 56320)), E++),
                        (O += p < 128 ? 1 : p < 2048 ? 2 : p < 65536 ? 3 : 4)
                    for (
                      o = d.uint8array ? new Uint8Array(O) : new Array(O),
                        E = U = 0;
                      U < O;
                      E++
                    )
                      (64512 & (p = g.charCodeAt(E))) == 55296 &&
                        E + 1 < x &&
                        (64512 & (f = g.charCodeAt(E + 1))) == 56320 &&
                        ((p = 65536 + ((p - 55296) << 10) + (f - 56320)), E++),
                        p < 128
                          ? (o[U++] = p)
                          : (p < 2048
                              ? (o[U++] = 192 | (p >>> 6))
                              : (p < 65536
                                  ? (o[U++] = 224 | (p >>> 12))
                                  : ((o[U++] = 240 | (p >>> 18)),
                                    (o[U++] = 128 | ((p >>> 12) & 63))),
                                (o[U++] = 128 | ((p >>> 6) & 63))),
                            (o[U++] = 128 | (63 & p)))
                    return o
                  })(l)
            }),
              (v.utf8decode = function (l) {
                return d.nodebuffer
                  ? h.transformTo('nodebuffer', l).toString('utf-8')
                  : (function (g) {
                      var o,
                        p,
                        f,
                        E,
                        U = g.length,
                        x = new Array(2 * U)
                      for (o = p = 0; o < U; )
                        if ((f = g[o++]) < 128) x[p++] = f
                        else if (4 < (E = r[f])) (x[p++] = 65533), (o += E - 1)
                        else {
                          for (
                            f &= E === 2 ? 31 : E === 3 ? 15 : 7;
                            1 < E && o < U;

                          )
                            (f = (f << 6) | (63 & g[o++])), E--
                          1 < E
                            ? (x[p++] = 65533)
                            : f < 65536
                            ? (x[p++] = f)
                            : ((f -= 65536),
                              (x[p++] = 55296 | ((f >> 10) & 1023)),
                              (x[p++] = 56320 | (1023 & f)))
                        }
                      return (
                        x.length !== p &&
                          (x.subarray
                            ? (x = x.subarray(0, p))
                            : (x.length = p)),
                        h.applyFromCharCode(x)
                      )
                    })(
                      (l = h.transformTo(
                        d.uint8array ? 'uint8array' : 'array',
                        l
                      ))
                    )
              }),
              h.inherits(b, _),
              (b.prototype.processChunk = function (l) {
                var g = h.transformTo(
                  d.uint8array ? 'uint8array' : 'array',
                  l.data
                )
                if (this.leftOver && this.leftOver.length) {
                  if (d.uint8array) {
                    var o = g
                    ;(g = new Uint8Array(o.length + this.leftOver.length)).set(
                      this.leftOver,
                      0
                    ),
                      g.set(o, this.leftOver.length)
                  } else g = this.leftOver.concat(g)
                  this.leftOver = null
                }
                var p = (function (E, U) {
                    var x
                    for (
                      (U = U || E.length) > E.length && (U = E.length),
                        x = U - 1;
                      0 <= x && (192 & E[x]) == 128;

                    )
                      x--
                    return x < 0 || x === 0 ? U : x + r[E[x]] > U ? x : U
                  })(g),
                  f = g
                p !== g.length &&
                  (d.uint8array
                    ? ((f = g.subarray(0, p)),
                      (this.leftOver = g.subarray(p, g.length)))
                    : ((f = g.slice(0, p)),
                      (this.leftOver = g.slice(p, g.length)))),
                  this.push({ data: v.utf8decode(f), meta: l.meta })
              }),
              (b.prototype.flush = function () {
                this.leftOver &&
                  this.leftOver.length &&
                  (this.push({ data: v.utf8decode(this.leftOver), meta: {} }),
                  (this.leftOver = null))
              }),
              (v.Utf8DecodeWorker = b),
              h.inherits(T, _),
              (T.prototype.processChunk = function (l) {
                this.push({ data: v.utf8encode(l.data), meta: l.meta })
              }),
              (v.Utf8EncodeWorker = T)
          },
          {
            './nodejsUtils': 14,
            './stream/GenericWorker': 28,
            './support': 30,
            './utils': 32
          }
        ],
        32: [
          function (m, B, v) {
            var h = m('./support'),
              d = m('./base64'),
              s = m('./nodejsUtils'),
              _ = m('./external')
            function r(o) {
              return o
            }
            function L(o, p) {
              for (var f = 0; f < o.length; ++f) p[f] = 255 & o.charCodeAt(f)
              return p
            }
            m('setimmediate'),
              (v.newBlob = function (o, p) {
                v.checkSupport('blob')
                try {
                  return new Blob([o], { type: p })
                } catch {
                  try {
                    var f = new (self.BlobBuilder ||
                      self.WebKitBlobBuilder ||
                      self.MozBlobBuilder ||
                      self.MSBlobBuilder)()
                    return f.append(o), f.getBlob(p)
                  } catch {
                    throw new Error("Bug : can't construct the Blob.")
                  }
                }
              })
            var b = {
              stringifyByChunk: function (o, p, f) {
                var E = [],
                  U = 0,
                  x = o.length
                if (x <= f) return String.fromCharCode.apply(null, o)
                for (; U < x; )
                  p === 'array' || p === 'nodebuffer'
                    ? E.push(
                        String.fromCharCode.apply(
                          null,
                          o.slice(U, Math.min(U + f, x))
                        )
                      )
                    : E.push(
                        String.fromCharCode.apply(
                          null,
                          o.subarray(U, Math.min(U + f, x))
                        )
                      ),
                    (U += f)
                return E.join('')
              },
              stringifyByChar: function (o) {
                for (var p = '', f = 0; f < o.length; f++)
                  p += String.fromCharCode(o[f])
                return p
              },
              applyCanBeUsed: {
                uint8array: (function () {
                  try {
                    return (
                      h.uint8array &&
                      String.fromCharCode.apply(null, new Uint8Array(1))
                        .length === 1
                    )
                  } catch {
                    return !1
                  }
                })(),
                nodebuffer: (function () {
                  try {
                    return (
                      h.nodebuffer &&
                      String.fromCharCode.apply(null, s.allocBuffer(1))
                        .length === 1
                    )
                  } catch {
                    return !1
                  }
                })()
              }
            }
            function T(o) {
              var p = 65536,
                f = v.getTypeOf(o),
                E = !0
              if (
                (f === 'uint8array'
                  ? (E = b.applyCanBeUsed.uint8array)
                  : f === 'nodebuffer' && (E = b.applyCanBeUsed.nodebuffer),
                E)
              )
                for (; 1 < p; )
                  try {
                    return b.stringifyByChunk(o, f, p)
                  } catch {
                    p = Math.floor(p / 2)
                  }
              return b.stringifyByChar(o)
            }
            function l(o, p) {
              for (var f = 0; f < o.length; f++) p[f] = o[f]
              return p
            }
            v.applyFromCharCode = T
            var g = {}
            ;(g.string = {
              string: r,
              array: function (o) {
                return L(o, new Array(o.length))
              },
              arraybuffer: function (o) {
                return g.string.uint8array(o).buffer
              },
              uint8array: function (o) {
                return L(o, new Uint8Array(o.length))
              },
              nodebuffer: function (o) {
                return L(o, s.allocBuffer(o.length))
              }
            }),
              (g.array = {
                string: T,
                array: r,
                arraybuffer: function (o) {
                  return new Uint8Array(o).buffer
                },
                uint8array: function (o) {
                  return new Uint8Array(o)
                },
                nodebuffer: function (o) {
                  return s.newBufferFrom(o)
                }
              }),
              (g.arraybuffer = {
                string: function (o) {
                  return T(new Uint8Array(o))
                },
                array: function (o) {
                  return l(new Uint8Array(o), new Array(o.byteLength))
                },
                arraybuffer: r,
                uint8array: function (o) {
                  return new Uint8Array(o)
                },
                nodebuffer: function (o) {
                  return s.newBufferFrom(new Uint8Array(o))
                }
              }),
              (g.uint8array = {
                string: T,
                array: function (o) {
                  return l(o, new Array(o.length))
                },
                arraybuffer: function (o) {
                  return o.buffer
                },
                uint8array: r,
                nodebuffer: function (o) {
                  return s.newBufferFrom(o)
                }
              }),
              (g.nodebuffer = {
                string: T,
                array: function (o) {
                  return l(o, new Array(o.length))
                },
                arraybuffer: function (o) {
                  return g.nodebuffer.uint8array(o).buffer
                },
                uint8array: function (o) {
                  return l(o, new Uint8Array(o.length))
                },
                nodebuffer: r
              }),
              (v.transformTo = function (o, p) {
                if (((p = p || ''), !o)) return p
                v.checkSupport(o)
                var f = v.getTypeOf(p)
                return g[f][o](p)
              }),
              (v.resolve = function (o) {
                for (var p = o.split('/'), f = [], E = 0; E < p.length; E++) {
                  var U = p[E]
                  U === '.' ||
                    (U === '' && E !== 0 && E !== p.length - 1) ||
                    (U === '..' ? f.pop() : f.push(U))
                }
                return f.join('/')
              }),
              (v.getTypeOf = function (o) {
                return typeof o == 'string'
                  ? 'string'
                  : Object.prototype.toString.call(o) === '[object Array]'
                  ? 'array'
                  : h.nodebuffer && s.isBuffer(o)
                  ? 'nodebuffer'
                  : h.uint8array && o instanceof Uint8Array
                  ? 'uint8array'
                  : h.arraybuffer && o instanceof ArrayBuffer
                  ? 'arraybuffer'
                  : void 0
              }),
              (v.checkSupport = function (o) {
                if (!h[o.toLowerCase()])
                  throw new Error(o + ' is not supported by this platform')
              }),
              (v.MAX_VALUE_16BITS = 65535),
              (v.MAX_VALUE_32BITS = -1),
              (v.pretty = function (o) {
                var p,
                  f,
                  E = ''
                for (f = 0; f < (o || '').length; f++)
                  E +=
                    '\\x' +
                    ((p = o.charCodeAt(f)) < 16 ? '0' : '') +
                    p.toString(16).toUpperCase()
                return E
              }),
              (v.delay = function (o, p, f) {
                setImmediate(function () {
                  o.apply(f || null, p || [])
                })
              }),
              (v.inherits = function (o, p) {
                function f() {}
                ;(f.prototype = p.prototype), (o.prototype = new f())
              }),
              (v.extend = function () {
                var o,
                  p,
                  f = {}
                for (o = 0; o < arguments.length; o++)
                  for (p in arguments[o])
                    Object.prototype.hasOwnProperty.call(arguments[o], p) &&
                      f[p] === void 0 &&
                      (f[p] = arguments[o][p])
                return f
              }),
              (v.prepareContent = function (o, p, f, E, U) {
                return _.Promise.resolve(p)
                  .then(function (x) {
                    return h.blob &&
                      (x instanceof Blob ||
                        ['[object File]', '[object Blob]'].indexOf(
                          Object.prototype.toString.call(x)
                        ) !== -1) &&
                      typeof FileReader < 'u'
                      ? new _.Promise(function (O, q) {
                          var G = new FileReader()
                          ;(G.onload = function (Q) {
                            O(Q.target.result)
                          }),
                            (G.onerror = function (Q) {
                              q(Q.target.error)
                            }),
                            G.readAsArrayBuffer(x)
                        })
                      : x
                  })
                  .then(function (x) {
                    var O = v.getTypeOf(x)
                    return O
                      ? (O === 'arraybuffer'
                          ? (x = v.transformTo('uint8array', x))
                          : O === 'string' &&
                            (U
                              ? (x = d.decode(x))
                              : f &&
                                E !== !0 &&
                                (x = (function (q) {
                                  return L(
                                    q,
                                    h.uint8array
                                      ? new Uint8Array(q.length)
                                      : new Array(q.length)
                                  )
                                })(x))),
                        x)
                      : _.Promise.reject(
                          new Error(
                            "Can't read the data of '" +
                              o +
                              "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"
                          )
                        )
                  })
              })
          },
          {
            './base64': 1,
            './external': 6,
            './nodejsUtils': 14,
            './support': 30,
            setimmediate: 54
          }
        ],
        33: [
          function (m, B, v) {
            var h = m('./reader/readerFor'),
              d = m('./utils'),
              s = m('./signature'),
              _ = m('./zipEntry'),
              r = m('./support')
            function L(b) {
              ;(this.files = []), (this.loadOptions = b)
            }
            ;(L.prototype = {
              checkSignature: function (b) {
                if (!this.reader.readAndCheckSignature(b)) {
                  this.reader.index -= 4
                  var T = this.reader.readString(4)
                  throw new Error(
                    'Corrupted zip or bug: unexpected signature (' +
                      d.pretty(T) +
                      ', expected ' +
                      d.pretty(b) +
                      ')'
                  )
                }
              },
              isSignature: function (b, T) {
                var l = this.reader.index
                this.reader.setIndex(b)
                var g = this.reader.readString(4) === T
                return this.reader.setIndex(l), g
              },
              readBlockEndOfCentral: function () {
                ;(this.diskNumber = this.reader.readInt(2)),
                  (this.diskWithCentralDirStart = this.reader.readInt(2)),
                  (this.centralDirRecordsOnThisDisk = this.reader.readInt(2)),
                  (this.centralDirRecords = this.reader.readInt(2)),
                  (this.centralDirSize = this.reader.readInt(4)),
                  (this.centralDirOffset = this.reader.readInt(4)),
                  (this.zipCommentLength = this.reader.readInt(2))
                var b = this.reader.readData(this.zipCommentLength),
                  T = r.uint8array ? 'uint8array' : 'array',
                  l = d.transformTo(T, b)
                this.zipComment = this.loadOptions.decodeFileName(l)
              },
              readBlockZip64EndOfCentral: function () {
                ;(this.zip64EndOfCentralSize = this.reader.readInt(8)),
                  this.reader.skip(4),
                  (this.diskNumber = this.reader.readInt(4)),
                  (this.diskWithCentralDirStart = this.reader.readInt(4)),
                  (this.centralDirRecordsOnThisDisk = this.reader.readInt(8)),
                  (this.centralDirRecords = this.reader.readInt(8)),
                  (this.centralDirSize = this.reader.readInt(8)),
                  (this.centralDirOffset = this.reader.readInt(8)),
                  (this.zip64ExtensibleData = {})
                for (var b, T, l, g = this.zip64EndOfCentralSize - 44; 0 < g; )
                  (b = this.reader.readInt(2)),
                    (T = this.reader.readInt(4)),
                    (l = this.reader.readData(T)),
                    (this.zip64ExtensibleData[b] = {
                      id: b,
                      length: T,
                      value: l
                    })
              },
              readBlockZip64EndOfCentralLocator: function () {
                if (
                  ((this.diskWithZip64CentralDirStart = this.reader.readInt(4)),
                  (this.relativeOffsetEndOfZip64CentralDir =
                    this.reader.readInt(8)),
                  (this.disksCount = this.reader.readInt(4)),
                  1 < this.disksCount)
                )
                  throw new Error('Multi-volumes zip are not supported')
              },
              readLocalFiles: function () {
                var b, T
                for (b = 0; b < this.files.length; b++)
                  (T = this.files[b]),
                    this.reader.setIndex(T.localHeaderOffset),
                    this.checkSignature(s.LOCAL_FILE_HEADER),
                    T.readLocalPart(this.reader),
                    T.handleUTF8(),
                    T.processAttributes()
              },
              readCentralDir: function () {
                var b
                for (
                  this.reader.setIndex(this.centralDirOffset);
                  this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);

                )
                  (b = new _(
                    { zip64: this.zip64 },
                    this.loadOptions
                  )).readCentralPart(this.reader),
                    this.files.push(b)
                if (
                  this.centralDirRecords !== this.files.length &&
                  this.centralDirRecords !== 0 &&
                  this.files.length === 0
                )
                  throw new Error(
                    'Corrupted zip or bug: expected ' +
                      this.centralDirRecords +
                      ' records in central dir, got ' +
                      this.files.length
                  )
              },
              readEndOfCentral: function () {
                var b = this.reader.lastIndexOfSignature(
                  s.CENTRAL_DIRECTORY_END
                )
                if (b < 0)
                  throw this.isSignature(0, s.LOCAL_FILE_HEADER)
                    ? new Error(
                        "Corrupted zip: can't find end of central directory"
                      )
                    : new Error(
                        "Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"
                      )
                this.reader.setIndex(b)
                var T = b
                if (
                  (this.checkSignature(s.CENTRAL_DIRECTORY_END),
                  this.readBlockEndOfCentral(),
                  this.diskNumber === d.MAX_VALUE_16BITS ||
                    this.diskWithCentralDirStart === d.MAX_VALUE_16BITS ||
                    this.centralDirRecordsOnThisDisk === d.MAX_VALUE_16BITS ||
                    this.centralDirRecords === d.MAX_VALUE_16BITS ||
                    this.centralDirSize === d.MAX_VALUE_32BITS ||
                    this.centralDirOffset === d.MAX_VALUE_32BITS)
                ) {
                  if (
                    ((this.zip64 = !0),
                    (b = this.reader.lastIndexOfSignature(
                      s.ZIP64_CENTRAL_DIRECTORY_LOCATOR
                    )) < 0)
                  )
                    throw new Error(
                      "Corrupted zip: can't find the ZIP64 end of central directory locator"
                    )
                  if (
                    (this.reader.setIndex(b),
                    this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),
                    this.readBlockZip64EndOfCentralLocator(),
                    !this.isSignature(
                      this.relativeOffsetEndOfZip64CentralDir,
                      s.ZIP64_CENTRAL_DIRECTORY_END
                    ) &&
                      ((this.relativeOffsetEndOfZip64CentralDir =
                        this.reader.lastIndexOfSignature(
                          s.ZIP64_CENTRAL_DIRECTORY_END
                        )),
                      this.relativeOffsetEndOfZip64CentralDir < 0))
                  )
                    throw new Error(
                      "Corrupted zip: can't find the ZIP64 end of central directory"
                    )
                  this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),
                    this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),
                    this.readBlockZip64EndOfCentral()
                }
                var l = this.centralDirOffset + this.centralDirSize
                this.zip64 &&
                  ((l += 20), (l += 12 + this.zip64EndOfCentralSize))
                var g = T - l
                if (0 < g)
                  this.isSignature(T, s.CENTRAL_FILE_HEADER) ||
                    (this.reader.zero = g)
                else if (g < 0)
                  throw new Error(
                    'Corrupted zip: missing ' + Math.abs(g) + ' bytes.'
                  )
              },
              prepareReader: function (b) {
                this.reader = h(b)
              },
              load: function (b) {
                this.prepareReader(b),
                  this.readEndOfCentral(),
                  this.readCentralDir(),
                  this.readLocalFiles()
              }
            }),
              (B.exports = L)
          },
          {
            './reader/readerFor': 22,
            './signature': 23,
            './support': 30,
            './utils': 32,
            './zipEntry': 34
          }
        ],
        34: [
          function (m, B, v) {
            var h = m('./reader/readerFor'),
              d = m('./utils'),
              s = m('./compressedObject'),
              _ = m('./crc32'),
              r = m('./utf8'),
              L = m('./compressions'),
              b = m('./support')
            function T(l, g) {
              ;(this.options = l), (this.loadOptions = g)
            }
            ;(T.prototype = {
              isEncrypted: function () {
                return (1 & this.bitFlag) == 1
              },
              useUTF8: function () {
                return (2048 & this.bitFlag) == 2048
              },
              readLocalPart: function (l) {
                var g, o
                if (
                  (l.skip(22),
                  (this.fileNameLength = l.readInt(2)),
                  (o = l.readInt(2)),
                  (this.fileName = l.readData(this.fileNameLength)),
                  l.skip(o),
                  this.compressedSize === -1 || this.uncompressedSize === -1)
                )
                  throw new Error(
                    "Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)"
                  )
                if (
                  (g = (function (p) {
                    for (var f in L)
                      if (
                        Object.prototype.hasOwnProperty.call(L, f) &&
                        L[f].magic === p
                      )
                        return L[f]
                    return null
                  })(this.compressionMethod)) === null
                )
                  throw new Error(
                    'Corrupted zip : compression ' +
                      d.pretty(this.compressionMethod) +
                      ' unknown (inner file : ' +
                      d.transformTo('string', this.fileName) +
                      ')'
                  )
                this.decompressed = new s(
                  this.compressedSize,
                  this.uncompressedSize,
                  this.crc32,
                  g,
                  l.readData(this.compressedSize)
                )
              },
              readCentralPart: function (l) {
                ;(this.versionMadeBy = l.readInt(2)),
                  l.skip(2),
                  (this.bitFlag = l.readInt(2)),
                  (this.compressionMethod = l.readString(2)),
                  (this.date = l.readDate()),
                  (this.crc32 = l.readInt(4)),
                  (this.compressedSize = l.readInt(4)),
                  (this.uncompressedSize = l.readInt(4))
                var g = l.readInt(2)
                if (
                  ((this.extraFieldsLength = l.readInt(2)),
                  (this.fileCommentLength = l.readInt(2)),
                  (this.diskNumberStart = l.readInt(2)),
                  (this.internalFileAttributes = l.readInt(2)),
                  (this.externalFileAttributes = l.readInt(4)),
                  (this.localHeaderOffset = l.readInt(4)),
                  this.isEncrypted())
                )
                  throw new Error('Encrypted zip are not supported')
                l.skip(g),
                  this.readExtraFields(l),
                  this.parseZIP64ExtraField(l),
                  (this.fileComment = l.readData(this.fileCommentLength))
              },
              processAttributes: function () {
                ;(this.unixPermissions = null), (this.dosPermissions = null)
                var l = this.versionMadeBy >> 8
                ;(this.dir = !!(16 & this.externalFileAttributes)),
                  l == 0 &&
                    (this.dosPermissions = 63 & this.externalFileAttributes),
                  l == 3 &&
                    (this.unixPermissions =
                      (this.externalFileAttributes >> 16) & 65535),
                  this.dir ||
                    this.fileNameStr.slice(-1) !== '/' ||
                    (this.dir = !0)
              },
              parseZIP64ExtraField: function () {
                if (this.extraFields[1]) {
                  var l = h(this.extraFields[1].value)
                  this.uncompressedSize === d.MAX_VALUE_32BITS &&
                    (this.uncompressedSize = l.readInt(8)),
                    this.compressedSize === d.MAX_VALUE_32BITS &&
                      (this.compressedSize = l.readInt(8)),
                    this.localHeaderOffset === d.MAX_VALUE_32BITS &&
                      (this.localHeaderOffset = l.readInt(8)),
                    this.diskNumberStart === d.MAX_VALUE_32BITS &&
                      (this.diskNumberStart = l.readInt(4))
                }
              },
              readExtraFields: function (l) {
                var g,
                  o,
                  p,
                  f = l.index + this.extraFieldsLength
                for (
                  this.extraFields || (this.extraFields = {});
                  l.index + 4 < f;

                )
                  (g = l.readInt(2)),
                    (o = l.readInt(2)),
                    (p = l.readData(o)),
                    (this.extraFields[g] = { id: g, length: o, value: p })
                l.setIndex(f)
              },
              handleUTF8: function () {
                var l = b.uint8array ? 'uint8array' : 'array'
                if (this.useUTF8())
                  (this.fileNameStr = r.utf8decode(this.fileName)),
                    (this.fileCommentStr = r.utf8decode(this.fileComment))
                else {
                  var g = this.findExtraFieldUnicodePath()
                  if (g !== null) this.fileNameStr = g
                  else {
                    var o = d.transformTo(l, this.fileName)
                    this.fileNameStr = this.loadOptions.decodeFileName(o)
                  }
                  var p = this.findExtraFieldUnicodeComment()
                  if (p !== null) this.fileCommentStr = p
                  else {
                    var f = d.transformTo(l, this.fileComment)
                    this.fileCommentStr = this.loadOptions.decodeFileName(f)
                  }
                }
              },
              findExtraFieldUnicodePath: function () {
                var l = this.extraFields[28789]
                if (l) {
                  var g = h(l.value)
                  return g.readInt(1) !== 1 || _(this.fileName) !== g.readInt(4)
                    ? null
                    : r.utf8decode(g.readData(l.length - 5))
                }
                return null
              },
              findExtraFieldUnicodeComment: function () {
                var l = this.extraFields[25461]
                if (l) {
                  var g = h(l.value)
                  return g.readInt(1) !== 1 ||
                    _(this.fileComment) !== g.readInt(4)
                    ? null
                    : r.utf8decode(g.readData(l.length - 5))
                }
                return null
              }
            }),
              (B.exports = T)
          },
          {
            './compressedObject': 2,
            './compressions': 3,
            './crc32': 4,
            './reader/readerFor': 22,
            './support': 30,
            './utf8': 31,
            './utils': 32
          }
        ],
        35: [
          function (m, B, v) {
            function h(g, o, p) {
              ;(this.name = g),
                (this.dir = p.dir),
                (this.date = p.date),
                (this.comment = p.comment),
                (this.unixPermissions = p.unixPermissions),
                (this.dosPermissions = p.dosPermissions),
                (this._data = o),
                (this._dataBinary = p.binary),
                (this.options = {
                  compression: p.compression,
                  compressionOptions: p.compressionOptions
                })
            }
            var d = m('./stream/StreamHelper'),
              s = m('./stream/DataWorker'),
              _ = m('./utf8'),
              r = m('./compressedObject'),
              L = m('./stream/GenericWorker')
            h.prototype = {
              internalStream: function (g) {
                var o = null,
                  p = 'string'
                try {
                  if (!g) throw new Error('No output type specified.')
                  var f = (p = g.toLowerCase()) === 'string' || p === 'text'
                  ;(p !== 'binarystring' && p !== 'text') || (p = 'string'),
                    (o = this._decompressWorker())
                  var E = !this._dataBinary
                  E && !f && (o = o.pipe(new _.Utf8EncodeWorker())),
                    !E && f && (o = o.pipe(new _.Utf8DecodeWorker()))
                } catch (U) {
                  ;(o = new L('error')).error(U)
                }
                return new d(o, p, '')
              },
              async: function (g, o) {
                return this.internalStream(g).accumulate(o)
              },
              nodeStream: function (g, o) {
                return this.internalStream(g || 'nodebuffer').toNodejsStream(o)
              },
              _compressWorker: function (g, o) {
                if (
                  this._data instanceof r &&
                  this._data.compression.magic === g.magic
                )
                  return this._data.getCompressedWorker()
                var p = this._decompressWorker()
                return (
                  this._dataBinary || (p = p.pipe(new _.Utf8EncodeWorker())),
                  r.createWorkerFrom(p, g, o)
                )
              },
              _decompressWorker: function () {
                return this._data instanceof r
                  ? this._data.getContentWorker()
                  : this._data instanceof L
                  ? this._data
                  : new s(this._data)
              }
            }
            for (
              var b = [
                  'asText',
                  'asBinary',
                  'asNodeBuffer',
                  'asUint8Array',
                  'asArrayBuffer'
                ],
                T = function () {
                  throw new Error(
                    'This method has been removed in JSZip 3.0, please check the upgrade guide.'
                  )
                },
                l = 0;
              l < b.length;
              l++
            )
              h.prototype[b[l]] = T
            B.exports = h
          },
          {
            './compressedObject': 2,
            './stream/DataWorker': 27,
            './stream/GenericWorker': 28,
            './stream/StreamHelper': 29,
            './utf8': 31
          }
        ],
        36: [
          function (m, B, v) {
            ;(function (h) {
              var d,
                s,
                _ = h.MutationObserver || h.WebKitMutationObserver
              if (_) {
                var r = 0,
                  L = new _(g),
                  b = h.document.createTextNode('')
                L.observe(b, { characterData: !0 }),
                  (d = function () {
                    b.data = r = ++r % 2
                  })
              } else if (h.setImmediate || h.MessageChannel === void 0)
                d =
                  'document' in h &&
                  'onreadystatechange' in h.document.createElement('script')
                    ? function () {
                        var o = h.document.createElement('script')
                        ;(o.onreadystatechange = function () {
                          g(),
                            (o.onreadystatechange = null),
                            o.parentNode.removeChild(o),
                            (o = null)
                        }),
                          h.document.documentElement.appendChild(o)
                      }
                    : function () {
                        setTimeout(g, 0)
                      }
              else {
                var T = new h.MessageChannel()
                ;(T.port1.onmessage = g),
                  (d = function () {
                    T.port2.postMessage(0)
                  })
              }
              var l = []
              function g() {
                var o, p
                s = !0
                for (var f = l.length; f; ) {
                  for (p = l, l = [], o = -1; ++o < f; ) p[o]()
                  f = l.length
                }
                s = !1
              }
              B.exports = function (o) {
                l.push(o) !== 1 || s || d()
              }
            }).call(
              this,
              typeof he < 'u'
                ? he
                : typeof self < 'u'
                ? self
                : typeof window < 'u'
                ? window
                : {}
            )
          },
          {}
        ],
        37: [
          function (m, B, v) {
            var h = m('immediate')
            function d() {}
            var s = {},
              _ = ['REJECTED'],
              r = ['FULFILLED'],
              L = ['PENDING']
            function b(f) {
              if (typeof f != 'function')
                throw new TypeError('resolver must be a function')
              ;(this.state = L),
                (this.queue = []),
                (this.outcome = void 0),
                f !== d && o(this, f)
            }
            function T(f, E, U) {
              ;(this.promise = f),
                typeof E == 'function' &&
                  ((this.onFulfilled = E),
                  (this.callFulfilled = this.otherCallFulfilled)),
                typeof U == 'function' &&
                  ((this.onRejected = U),
                  (this.callRejected = this.otherCallRejected))
            }
            function l(f, E, U) {
              h(function () {
                var x
                try {
                  x = E(U)
                } catch (O) {
                  return s.reject(f, O)
                }
                x === f
                  ? s.reject(
                      f,
                      new TypeError('Cannot resolve promise with itself')
                    )
                  : s.resolve(f, x)
              })
            }
            function g(f) {
              var E = f && f.then
              if (
                f &&
                (typeof f == 'object' || typeof f == 'function') &&
                typeof E == 'function'
              )
                return function () {
                  E.apply(f, arguments)
                }
            }
            function o(f, E) {
              var U = !1
              function x(G) {
                U || ((U = !0), s.reject(f, G))
              }
              function O(G) {
                U || ((U = !0), s.resolve(f, G))
              }
              var q = p(function () {
                E(O, x)
              })
              q.status === 'error' && x(q.value)
            }
            function p(f, E) {
              var U = {}
              try {
                ;(U.value = f(E)), (U.status = 'success')
              } catch (x) {
                ;(U.status = 'error'), (U.value = x)
              }
              return U
            }
            ;((B.exports = b).prototype.finally = function (f) {
              if (typeof f != 'function') return this
              var E = this.constructor
              return this.then(
                function (U) {
                  return E.resolve(f()).then(function () {
                    return U
                  })
                },
                function (U) {
                  return E.resolve(f()).then(function () {
                    throw U
                  })
                }
              )
            }),
              (b.prototype.catch = function (f) {
                return this.then(null, f)
              }),
              (b.prototype.then = function (f, E) {
                if (
                  (typeof f != 'function' && this.state === r) ||
                  (typeof E != 'function' && this.state === _)
                )
                  return this
                var U = new this.constructor(d)
                return (
                  this.state !== L
                    ? l(U, this.state === r ? f : E, this.outcome)
                    : this.queue.push(new T(U, f, E)),
                  U
                )
              }),
              (T.prototype.callFulfilled = function (f) {
                s.resolve(this.promise, f)
              }),
              (T.prototype.otherCallFulfilled = function (f) {
                l(this.promise, this.onFulfilled, f)
              }),
              (T.prototype.callRejected = function (f) {
                s.reject(this.promise, f)
              }),
              (T.prototype.otherCallRejected = function (f) {
                l(this.promise, this.onRejected, f)
              }),
              (s.resolve = function (f, E) {
                var U = p(g, E)
                if (U.status === 'error') return s.reject(f, U.value)
                var x = U.value
                if (x) o(f, x)
                else {
                  ;(f.state = r), (f.outcome = E)
                  for (var O = -1, q = f.queue.length; ++O < q; )
                    f.queue[O].callFulfilled(E)
                }
                return f
              }),
              (s.reject = function (f, E) {
                ;(f.state = _), (f.outcome = E)
                for (var U = -1, x = f.queue.length; ++U < x; )
                  f.queue[U].callRejected(E)
                return f
              }),
              (b.resolve = function (f) {
                return f instanceof this ? f : s.resolve(new this(d), f)
              }),
              (b.reject = function (f) {
                var E = new this(d)
                return s.reject(E, f)
              }),
              (b.all = function (f) {
                var E = this
                if (Object.prototype.toString.call(f) !== '[object Array]')
                  return this.reject(new TypeError('must be an array'))
                var U = f.length,
                  x = !1
                if (!U) return this.resolve([])
                for (
                  var O = new Array(U), q = 0, G = -1, Q = new this(d);
                  ++G < U;

                )
                  z(f[G], G)
                return Q
                function z(W, lt) {
                  E.resolve(W).then(
                    function (w) {
                      ;(O[lt] = w),
                        ++q !== U || x || ((x = !0), s.resolve(Q, O))
                    },
                    function (w) {
                      x || ((x = !0), s.reject(Q, w))
                    }
                  )
                }
              }),
              (b.race = function (f) {
                var E = this
                if (Object.prototype.toString.call(f) !== '[object Array]')
                  return this.reject(new TypeError('must be an array'))
                var U = f.length,
                  x = !1
                if (!U) return this.resolve([])
                for (var O = -1, q = new this(d); ++O < U; )
                  (G = f[O]),
                    E.resolve(G).then(
                      function (Q) {
                        x || ((x = !0), s.resolve(q, Q))
                      },
                      function (Q) {
                        x || ((x = !0), s.reject(q, Q))
                      }
                    )
                var G
                return q
              })
          },
          { immediate: 36 }
        ],
        38: [
          function (m, B, v) {
            var h = {}
            ;(0, m('./lib/utils/common').assign)(
              h,
              m('./lib/deflate'),
              m('./lib/inflate'),
              m('./lib/zlib/constants')
            ),
              (B.exports = h)
          },
          {
            './lib/deflate': 39,
            './lib/inflate': 40,
            './lib/utils/common': 41,
            './lib/zlib/constants': 44
          }
        ],
        39: [
          function (m, B, v) {
            var h = m('./zlib/deflate'),
              d = m('./utils/common'),
              s = m('./utils/strings'),
              _ = m('./zlib/messages'),
              r = m('./zlib/zstream'),
              L = Object.prototype.toString,
              b = 0,
              T = -1,
              l = 0,
              g = 8
            function o(f) {
              if (!(this instanceof o)) return new o(f)
              this.options = d.assign(
                {
                  level: T,
                  method: g,
                  chunkSize: 16384,
                  windowBits: 15,
                  memLevel: 8,
                  strategy: l,
                  to: ''
                },
                f || {}
              )
              var E = this.options
              E.raw && 0 < E.windowBits
                ? (E.windowBits = -E.windowBits)
                : E.gzip &&
                  0 < E.windowBits &&
                  E.windowBits < 16 &&
                  (E.windowBits += 16),
                (this.err = 0),
                (this.msg = ''),
                (this.ended = !1),
                (this.chunks = []),
                (this.strm = new r()),
                (this.strm.avail_out = 0)
              var U = h.deflateInit2(
                this.strm,
                E.level,
                E.method,
                E.windowBits,
                E.memLevel,
                E.strategy
              )
              if (U !== b) throw new Error(_[U])
              if (
                (E.header && h.deflateSetHeader(this.strm, E.header),
                E.dictionary)
              ) {
                var x
                if (
                  ((x =
                    typeof E.dictionary == 'string'
                      ? s.string2buf(E.dictionary)
                      : L.call(E.dictionary) === '[object ArrayBuffer]'
                      ? new Uint8Array(E.dictionary)
                      : E.dictionary),
                  (U = h.deflateSetDictionary(this.strm, x)) !== b)
                )
                  throw new Error(_[U])
                this._dict_set = !0
              }
            }
            function p(f, E) {
              var U = new o(E)
              if ((U.push(f, !0), U.err)) throw U.msg || _[U.err]
              return U.result
            }
            ;(o.prototype.push = function (f, E) {
              var U,
                x,
                O = this.strm,
                q = this.options.chunkSize
              if (this.ended) return !1
              ;(x = E === ~~E ? E : E === !0 ? 4 : 0),
                typeof f == 'string'
                  ? (O.input = s.string2buf(f))
                  : L.call(f) === '[object ArrayBuffer]'
                  ? (O.input = new Uint8Array(f))
                  : (O.input = f),
                (O.next_in = 0),
                (O.avail_in = O.input.length)
              do {
                if (
                  (O.avail_out === 0 &&
                    ((O.output = new d.Buf8(q)),
                    (O.next_out = 0),
                    (O.avail_out = q)),
                  (U = h.deflate(O, x)) !== 1 && U !== b)
                )
                  return this.onEnd(U), !(this.ended = !0)
                ;(O.avail_out !== 0 &&
                  (O.avail_in !== 0 || (x !== 4 && x !== 2))) ||
                  (this.options.to === 'string'
                    ? this.onData(
                        s.buf2binstring(d.shrinkBuf(O.output, O.next_out))
                      )
                    : this.onData(d.shrinkBuf(O.output, O.next_out)))
              } while ((0 < O.avail_in || O.avail_out === 0) && U !== 1)
              return x === 4
                ? ((U = h.deflateEnd(this.strm)),
                  this.onEnd(U),
                  (this.ended = !0),
                  U === b)
                : x !== 2 || (this.onEnd(b), !(O.avail_out = 0))
            }),
              (o.prototype.onData = function (f) {
                this.chunks.push(f)
              }),
              (o.prototype.onEnd = function (f) {
                f === b &&
                  (this.options.to === 'string'
                    ? (this.result = this.chunks.join(''))
                    : (this.result = d.flattenChunks(this.chunks))),
                  (this.chunks = []),
                  (this.err = f),
                  (this.msg = this.strm.msg)
              }),
              (v.Deflate = o),
              (v.deflate = p),
              (v.deflateRaw = function (f, E) {
                return ((E = E || {}).raw = !0), p(f, E)
              }),
              (v.gzip = function (f, E) {
                return ((E = E || {}).gzip = !0), p(f, E)
              })
          },
          {
            './utils/common': 41,
            './utils/strings': 42,
            './zlib/deflate': 46,
            './zlib/messages': 51,
            './zlib/zstream': 53
          }
        ],
        40: [
          function (m, B, v) {
            var h = m('./zlib/inflate'),
              d = m('./utils/common'),
              s = m('./utils/strings'),
              _ = m('./zlib/constants'),
              r = m('./zlib/messages'),
              L = m('./zlib/zstream'),
              b = m('./zlib/gzheader'),
              T = Object.prototype.toString
            function l(o) {
              if (!(this instanceof l)) return new l(o)
              this.options = d.assign(
                { chunkSize: 16384, windowBits: 0, to: '' },
                o || {}
              )
              var p = this.options
              p.raw &&
                0 <= p.windowBits &&
                p.windowBits < 16 &&
                ((p.windowBits = -p.windowBits),
                p.windowBits === 0 && (p.windowBits = -15)),
                !(0 <= p.windowBits && p.windowBits < 16) ||
                  (o && o.windowBits) ||
                  (p.windowBits += 32),
                15 < p.windowBits &&
                  p.windowBits < 48 &&
                  !(15 & p.windowBits) &&
                  (p.windowBits |= 15),
                (this.err = 0),
                (this.msg = ''),
                (this.ended = !1),
                (this.chunks = []),
                (this.strm = new L()),
                (this.strm.avail_out = 0)
              var f = h.inflateInit2(this.strm, p.windowBits)
              if (f !== _.Z_OK) throw new Error(r[f])
              ;(this.header = new b()),
                h.inflateGetHeader(this.strm, this.header)
            }
            function g(o, p) {
              var f = new l(p)
              if ((f.push(o, !0), f.err)) throw f.msg || r[f.err]
              return f.result
            }
            ;(l.prototype.push = function (o, p) {
              var f,
                E,
                U,
                x,
                O,
                q,
                G = this.strm,
                Q = this.options.chunkSize,
                z = this.options.dictionary,
                W = !1
              if (this.ended) return !1
              ;(E = p === ~~p ? p : p === !0 ? _.Z_FINISH : _.Z_NO_FLUSH),
                typeof o == 'string'
                  ? (G.input = s.binstring2buf(o))
                  : T.call(o) === '[object ArrayBuffer]'
                  ? (G.input = new Uint8Array(o))
                  : (G.input = o),
                (G.next_in = 0),
                (G.avail_in = G.input.length)
              do {
                if (
                  (G.avail_out === 0 &&
                    ((G.output = new d.Buf8(Q)),
                    (G.next_out = 0),
                    (G.avail_out = Q)),
                  (f = h.inflate(G, _.Z_NO_FLUSH)) === _.Z_NEED_DICT &&
                    z &&
                    ((q =
                      typeof z == 'string'
                        ? s.string2buf(z)
                        : T.call(z) === '[object ArrayBuffer]'
                        ? new Uint8Array(z)
                        : z),
                    (f = h.inflateSetDictionary(this.strm, q))),
                  f === _.Z_BUF_ERROR && W === !0 && ((f = _.Z_OK), (W = !1)),
                  f !== _.Z_STREAM_END && f !== _.Z_OK)
                )
                  return this.onEnd(f), !(this.ended = !0)
                G.next_out &&
                  ((G.avail_out !== 0 &&
                    f !== _.Z_STREAM_END &&
                    (G.avail_in !== 0 ||
                      (E !== _.Z_FINISH && E !== _.Z_SYNC_FLUSH))) ||
                    (this.options.to === 'string'
                      ? ((U = s.utf8border(G.output, G.next_out)),
                        (x = G.next_out - U),
                        (O = s.buf2string(G.output, U)),
                        (G.next_out = x),
                        (G.avail_out = Q - x),
                        x && d.arraySet(G.output, G.output, U, x, 0),
                        this.onData(O))
                      : this.onData(d.shrinkBuf(G.output, G.next_out)))),
                  G.avail_in === 0 && G.avail_out === 0 && (W = !0)
              } while (
                (0 < G.avail_in || G.avail_out === 0) &&
                f !== _.Z_STREAM_END
              )
              return (
                f === _.Z_STREAM_END && (E = _.Z_FINISH),
                E === _.Z_FINISH
                  ? ((f = h.inflateEnd(this.strm)),
                    this.onEnd(f),
                    (this.ended = !0),
                    f === _.Z_OK)
                  : E !== _.Z_SYNC_FLUSH ||
                    (this.onEnd(_.Z_OK), !(G.avail_out = 0))
              )
            }),
              (l.prototype.onData = function (o) {
                this.chunks.push(o)
              }),
              (l.prototype.onEnd = function (o) {
                o === _.Z_OK &&
                  (this.options.to === 'string'
                    ? (this.result = this.chunks.join(''))
                    : (this.result = d.flattenChunks(this.chunks))),
                  (this.chunks = []),
                  (this.err = o),
                  (this.msg = this.strm.msg)
              }),
              (v.Inflate = l),
              (v.inflate = g),
              (v.inflateRaw = function (o, p) {
                return ((p = p || {}).raw = !0), g(o, p)
              }),
              (v.ungzip = g)
          },
          {
            './utils/common': 41,
            './utils/strings': 42,
            './zlib/constants': 44,
            './zlib/gzheader': 47,
            './zlib/inflate': 49,
            './zlib/messages': 51,
            './zlib/zstream': 53
          }
        ],
        41: [
          function (m, B, v) {
            var h =
              typeof Uint8Array < 'u' &&
              typeof Uint16Array < 'u' &&
              typeof Int32Array < 'u'
            ;(v.assign = function (_) {
              for (
                var r = Array.prototype.slice.call(arguments, 1);
                r.length;

              ) {
                var L = r.shift()
                if (L) {
                  if (typeof L != 'object')
                    throw new TypeError(L + 'must be non-object')
                  for (var b in L) L.hasOwnProperty(b) && (_[b] = L[b])
                }
              }
              return _
            }),
              (v.shrinkBuf = function (_, r) {
                return _.length === r
                  ? _
                  : _.subarray
                  ? _.subarray(0, r)
                  : ((_.length = r), _)
              })
            var d = {
                arraySet: function (_, r, L, b, T) {
                  if (r.subarray && _.subarray) _.set(r.subarray(L, L + b), T)
                  else for (var l = 0; l < b; l++) _[T + l] = r[L + l]
                },
                flattenChunks: function (_) {
                  var r, L, b, T, l, g
                  for (r = b = 0, L = _.length; r < L; r++) b += _[r].length
                  for (
                    g = new Uint8Array(b), r = T = 0, L = _.length;
                    r < L;
                    r++
                  )
                    (l = _[r]), g.set(l, T), (T += l.length)
                  return g
                }
              },
              s = {
                arraySet: function (_, r, L, b, T) {
                  for (var l = 0; l < b; l++) _[T + l] = r[L + l]
                },
                flattenChunks: function (_) {
                  return [].concat.apply([], _)
                }
              }
            ;(v.setTyped = function (_) {
              _
                ? ((v.Buf8 = Uint8Array),
                  (v.Buf16 = Uint16Array),
                  (v.Buf32 = Int32Array),
                  v.assign(v, d))
                : ((v.Buf8 = Array),
                  (v.Buf16 = Array),
                  (v.Buf32 = Array),
                  v.assign(v, s))
            }),
              v.setTyped(h)
          },
          {}
        ],
        42: [
          function (m, B, v) {
            var h = m('./common'),
              d = !0,
              s = !0
            try {
              String.fromCharCode.apply(null, [0])
            } catch {
              d = !1
            }
            try {
              String.fromCharCode.apply(null, new Uint8Array(1))
            } catch {
              s = !1
            }
            for (var _ = new h.Buf8(256), r = 0; r < 256; r++)
              _[r] =
                252 <= r
                  ? 6
                  : 248 <= r
                  ? 5
                  : 240 <= r
                  ? 4
                  : 224 <= r
                  ? 3
                  : 192 <= r
                  ? 2
                  : 1
            function L(b, T) {
              if (T < 65537 && ((b.subarray && s) || (!b.subarray && d)))
                return String.fromCharCode.apply(null, h.shrinkBuf(b, T))
              for (var l = '', g = 0; g < T; g++) l += String.fromCharCode(b[g])
              return l
            }
            ;(_[254] = _[254] = 1),
              (v.string2buf = function (b) {
                var T,
                  l,
                  g,
                  o,
                  p,
                  f = b.length,
                  E = 0
                for (o = 0; o < f; o++)
                  (64512 & (l = b.charCodeAt(o))) == 55296 &&
                    o + 1 < f &&
                    (64512 & (g = b.charCodeAt(o + 1))) == 56320 &&
                    ((l = 65536 + ((l - 55296) << 10) + (g - 56320)), o++),
                    (E += l < 128 ? 1 : l < 2048 ? 2 : l < 65536 ? 3 : 4)
                for (T = new h.Buf8(E), o = p = 0; p < E; o++)
                  (64512 & (l = b.charCodeAt(o))) == 55296 &&
                    o + 1 < f &&
                    (64512 & (g = b.charCodeAt(o + 1))) == 56320 &&
                    ((l = 65536 + ((l - 55296) << 10) + (g - 56320)), o++),
                    l < 128
                      ? (T[p++] = l)
                      : (l < 2048
                          ? (T[p++] = 192 | (l >>> 6))
                          : (l < 65536
                              ? (T[p++] = 224 | (l >>> 12))
                              : ((T[p++] = 240 | (l >>> 18)),
                                (T[p++] = 128 | ((l >>> 12) & 63))),
                            (T[p++] = 128 | ((l >>> 6) & 63))),
                        (T[p++] = 128 | (63 & l)))
                return T
              }),
              (v.buf2binstring = function (b) {
                return L(b, b.length)
              }),
              (v.binstring2buf = function (b) {
                for (
                  var T = new h.Buf8(b.length), l = 0, g = T.length;
                  l < g;
                  l++
                )
                  T[l] = b.charCodeAt(l)
                return T
              }),
              (v.buf2string = function (b, T) {
                var l,
                  g,
                  o,
                  p,
                  f = T || b.length,
                  E = new Array(2 * f)
                for (l = g = 0; l < f; )
                  if ((o = b[l++]) < 128) E[g++] = o
                  else if (4 < (p = _[o])) (E[g++] = 65533), (l += p - 1)
                  else {
                    for (o &= p === 2 ? 31 : p === 3 ? 15 : 7; 1 < p && l < f; )
                      (o = (o << 6) | (63 & b[l++])), p--
                    1 < p
                      ? (E[g++] = 65533)
                      : o < 65536
                      ? (E[g++] = o)
                      : ((o -= 65536),
                        (E[g++] = 55296 | ((o >> 10) & 1023)),
                        (E[g++] = 56320 | (1023 & o)))
                  }
                return L(E, g)
              }),
              (v.utf8border = function (b, T) {
                var l
                for (
                  (T = T || b.length) > b.length && (T = b.length), l = T - 1;
                  0 <= l && (192 & b[l]) == 128;

                )
                  l--
                return l < 0 || l === 0 ? T : l + _[b[l]] > T ? l : T
              })
          },
          { './common': 41 }
        ],
        43: [
          function (m, B, v) {
            B.exports = function (h, d, s, _) {
              for (
                var r = (65535 & h) | 0, L = ((h >>> 16) & 65535) | 0, b = 0;
                s !== 0;

              ) {
                for (
                  s -= b = 2e3 < s ? 2e3 : s;
                  (L = (L + (r = (r + d[_++]) | 0)) | 0), --b;

                );
                ;(r %= 65521), (L %= 65521)
              }
              return r | (L << 16) | 0
            }
          },
          {}
        ],
        44: [
          function (m, B, v) {
            B.exports = {
              Z_NO_FLUSH: 0,
              Z_PARTIAL_FLUSH: 1,
              Z_SYNC_FLUSH: 2,
              Z_FULL_FLUSH: 3,
              Z_FINISH: 4,
              Z_BLOCK: 5,
              Z_TREES: 6,
              Z_OK: 0,
              Z_STREAM_END: 1,
              Z_NEED_DICT: 2,
              Z_ERRNO: -1,
              Z_STREAM_ERROR: -2,
              Z_DATA_ERROR: -3,
              Z_BUF_ERROR: -5,
              Z_NO_COMPRESSION: 0,
              Z_BEST_SPEED: 1,
              Z_BEST_COMPRESSION: 9,
              Z_DEFAULT_COMPRESSION: -1,
              Z_FILTERED: 1,
              Z_HUFFMAN_ONLY: 2,
              Z_RLE: 3,
              Z_FIXED: 4,
              Z_DEFAULT_STRATEGY: 0,
              Z_BINARY: 0,
              Z_TEXT: 1,
              Z_UNKNOWN: 2,
              Z_DEFLATED: 8
            }
          },
          {}
        ],
        45: [
          function (m, B, v) {
            var h = (function () {
              for (var d, s = [], _ = 0; _ < 256; _++) {
                d = _
                for (var r = 0; r < 8; r++)
                  d = 1 & d ? 3988292384 ^ (d >>> 1) : d >>> 1
                s[_] = d
              }
              return s
            })()
            B.exports = function (d, s, _, r) {
              var L = h,
                b = r + _
              d ^= -1
              for (var T = r; T < b; T++) d = (d >>> 8) ^ L[255 & (d ^ s[T])]
              return -1 ^ d
            }
          },
          {}
        ],
        46: [
          function (m, B, v) {
            var h,
              d = m('../utils/common'),
              s = m('./trees'),
              _ = m('./adler32'),
              r = m('./crc32'),
              L = m('./messages'),
              b = 0,
              T = 4,
              l = 0,
              g = -2,
              o = -1,
              p = 4,
              f = 2,
              E = 8,
              U = 9,
              x = 286,
              O = 30,
              q = 19,
              G = 2 * x + 1,
              Q = 15,
              z = 3,
              W = 258,
              lt = W + z + 1,
              w = 42,
              k = 113,
              i = 1,
              A = 2,
              rt = 3,
              I = 4
            function $(n, Y) {
              return (n.msg = L[Y]), Y
            }
            function M(n) {
              return (n << 1) - (4 < n ? 9 : 0)
            }
            function H(n) {
              for (var Y = n.length; 0 <= --Y; ) n[Y] = 0
            }
            function D(n) {
              var Y = n.state,
                j = Y.pending
              j > n.avail_out && (j = n.avail_out),
                j !== 0 &&
                  (d.arraySet(
                    n.output,
                    Y.pending_buf,
                    Y.pending_out,
                    j,
                    n.next_out
                  ),
                  (n.next_out += j),
                  (Y.pending_out += j),
                  (n.total_out += j),
                  (n.avail_out -= j),
                  (Y.pending -= j),
                  Y.pending === 0 && (Y.pending_out = 0))
            }
            function F(n, Y) {
              s._tr_flush_block(
                n,
                0 <= n.block_start ? n.block_start : -1,
                n.strstart - n.block_start,
                Y
              ),
                (n.block_start = n.strstart),
                D(n.strm)
            }
            function ot(n, Y) {
              n.pending_buf[n.pending++] = Y
            }
            function et(n, Y) {
              ;(n.pending_buf[n.pending++] = (Y >>> 8) & 255),
                (n.pending_buf[n.pending++] = 255 & Y)
            }
            function K(n, Y) {
              var j,
                N,
                u = n.max_chain_length,
                S = n.strstart,
                V = n.prev_length,
                J = n.nice_match,
                C =
                  n.strstart > n.w_size - lt ? n.strstart - (n.w_size - lt) : 0,
                nt = n.window,
                st = n.w_mask,
                it = n.prev,
                ft = n.strstart + W,
                St = nt[S + V - 1],
                gt = nt[S + V]
              n.prev_length >= n.good_match && (u >>= 2),
                J > n.lookahead && (J = n.lookahead)
              do
                if (
                  nt[(j = Y) + V] === gt &&
                  nt[j + V - 1] === St &&
                  nt[j] === nt[S] &&
                  nt[++j] === nt[S + 1]
                ) {
                  ;(S += 2), j++
                  do;
                  while (
                    nt[++S] === nt[++j] &&
                    nt[++S] === nt[++j] &&
                    nt[++S] === nt[++j] &&
                    nt[++S] === nt[++j] &&
                    nt[++S] === nt[++j] &&
                    nt[++S] === nt[++j] &&
                    nt[++S] === nt[++j] &&
                    nt[++S] === nt[++j] &&
                    S < ft
                  )
                  if (((N = W - (ft - S)), (S = ft - W), V < N)) {
                    if (((n.match_start = Y), J <= (V = N))) break
                    ;(St = nt[S + V - 1]), (gt = nt[S + V])
                  }
                }
              while ((Y = it[Y & st]) > C && --u != 0)
              return V <= n.lookahead ? V : n.lookahead
            }
            function yt(n) {
              var Y,
                j,
                N,
                u,
                S,
                V,
                J,
                C,
                nt,
                st,
                it = n.w_size
              do {
                if (
                  ((u = n.window_size - n.lookahead - n.strstart),
                  n.strstart >= it + (it - lt))
                ) {
                  for (
                    d.arraySet(n.window, n.window, it, it, 0),
                      n.match_start -= it,
                      n.strstart -= it,
                      n.block_start -= it,
                      Y = j = n.hash_size;
                    (N = n.head[--Y]), (n.head[Y] = it <= N ? N - it : 0), --j;

                  );
                  for (
                    Y = j = it;
                    (N = n.prev[--Y]), (n.prev[Y] = it <= N ? N - it : 0), --j;

                  );
                  u += it
                }
                if (n.strm.avail_in === 0) break
                if (
                  ((V = n.strm),
                  (J = n.window),
                  (C = n.strstart + n.lookahead),
                  (nt = u),
                  (st = void 0),
                  (st = V.avail_in),
                  nt < st && (st = nt),
                  (j =
                    st === 0
                      ? 0
                      : ((V.avail_in -= st),
                        d.arraySet(J, V.input, V.next_in, st, C),
                        V.state.wrap === 1
                          ? (V.adler = _(V.adler, J, st, C))
                          : V.state.wrap === 2 &&
                            (V.adler = r(V.adler, J, st, C)),
                        (V.next_in += st),
                        (V.total_in += st),
                        st)),
                  (n.lookahead += j),
                  n.lookahead + n.insert >= z)
                )
                  for (
                    S = n.strstart - n.insert,
                      n.ins_h = n.window[S],
                      n.ins_h =
                        ((n.ins_h << n.hash_shift) ^ n.window[S + 1]) &
                        n.hash_mask;
                    n.insert &&
                    ((n.ins_h =
                      ((n.ins_h << n.hash_shift) ^ n.window[S + z - 1]) &
                      n.hash_mask),
                    (n.prev[S & n.w_mask] = n.head[n.ins_h]),
                    (n.head[n.ins_h] = S),
                    S++,
                    n.insert--,
                    !(n.lookahead + n.insert < z));

                  );
              } while (n.lookahead < lt && n.strm.avail_in !== 0)
            }
            function Tt(n, Y) {
              for (var j, N; ; ) {
                if (n.lookahead < lt) {
                  if ((yt(n), n.lookahead < lt && Y === b)) return i
                  if (n.lookahead === 0) break
                }
                if (
                  ((j = 0),
                  n.lookahead >= z &&
                    ((n.ins_h =
                      ((n.ins_h << n.hash_shift) ^
                        n.window[n.strstart + z - 1]) &
                      n.hash_mask),
                    (j = n.prev[n.strstart & n.w_mask] = n.head[n.ins_h]),
                    (n.head[n.ins_h] = n.strstart)),
                  j !== 0 &&
                    n.strstart - j <= n.w_size - lt &&
                    (n.match_length = K(n, j)),
                  n.match_length >= z)
                )
                  if (
                    ((N = s._tr_tally(
                      n,
                      n.strstart - n.match_start,
                      n.match_length - z
                    )),
                    (n.lookahead -= n.match_length),
                    n.match_length <= n.max_lazy_match && n.lookahead >= z)
                  ) {
                    for (
                      n.match_length--;
                      n.strstart++,
                        (n.ins_h =
                          ((n.ins_h << n.hash_shift) ^
                            n.window[n.strstart + z - 1]) &
                          n.hash_mask),
                        (j = n.prev[n.strstart & n.w_mask] = n.head[n.ins_h]),
                        (n.head[n.ins_h] = n.strstart),
                        --n.match_length != 0;

                    );
                    n.strstart++
                  } else
                    (n.strstart += n.match_length),
                      (n.match_length = 0),
                      (n.ins_h = n.window[n.strstart]),
                      (n.ins_h =
                        ((n.ins_h << n.hash_shift) ^ n.window[n.strstart + 1]) &
                        n.hash_mask)
                else
                  (N = s._tr_tally(n, 0, n.window[n.strstart])),
                    n.lookahead--,
                    n.strstart++
                if (N && (F(n, !1), n.strm.avail_out === 0)) return i
              }
              return (
                (n.insert = n.strstart < z - 1 ? n.strstart : z - 1),
                Y === T
                  ? (F(n, !0), n.strm.avail_out === 0 ? rt : I)
                  : n.last_lit && (F(n, !1), n.strm.avail_out === 0)
                  ? i
                  : A
              )
            }
            function ht(n, Y) {
              for (var j, N, u; ; ) {
                if (n.lookahead < lt) {
                  if ((yt(n), n.lookahead < lt && Y === b)) return i
                  if (n.lookahead === 0) break
                }
                if (
                  ((j = 0),
                  n.lookahead >= z &&
                    ((n.ins_h =
                      ((n.ins_h << n.hash_shift) ^
                        n.window[n.strstart + z - 1]) &
                      n.hash_mask),
                    (j = n.prev[n.strstart & n.w_mask] = n.head[n.ins_h]),
                    (n.head[n.ins_h] = n.strstart)),
                  (n.prev_length = n.match_length),
                  (n.prev_match = n.match_start),
                  (n.match_length = z - 1),
                  j !== 0 &&
                    n.prev_length < n.max_lazy_match &&
                    n.strstart - j <= n.w_size - lt &&
                    ((n.match_length = K(n, j)),
                    n.match_length <= 5 &&
                      (n.strategy === 1 ||
                        (n.match_length === z &&
                          4096 < n.strstart - n.match_start)) &&
                      (n.match_length = z - 1)),
                  n.prev_length >= z && n.match_length <= n.prev_length)
                ) {
                  for (
                    u = n.strstart + n.lookahead - z,
                      N = s._tr_tally(
                        n,
                        n.strstart - 1 - n.prev_match,
                        n.prev_length - z
                      ),
                      n.lookahead -= n.prev_length - 1,
                      n.prev_length -= 2;
                    ++n.strstart <= u &&
                      ((n.ins_h =
                        ((n.ins_h << n.hash_shift) ^
                          n.window[n.strstart + z - 1]) &
                        n.hash_mask),
                      (j = n.prev[n.strstart & n.w_mask] = n.head[n.ins_h]),
                      (n.head[n.ins_h] = n.strstart)),
                      --n.prev_length != 0;

                  );
                  if (
                    ((n.match_available = 0),
                    (n.match_length = z - 1),
                    n.strstart++,
                    N && (F(n, !1), n.strm.avail_out === 0))
                  )
                    return i
                } else if (n.match_available) {
                  if (
                    ((N = s._tr_tally(n, 0, n.window[n.strstart - 1])) &&
                      F(n, !1),
                    n.strstart++,
                    n.lookahead--,
                    n.strm.avail_out === 0)
                  )
                    return i
                } else (n.match_available = 1), n.strstart++, n.lookahead--
              }
              return (
                n.match_available &&
                  ((N = s._tr_tally(n, 0, n.window[n.strstart - 1])),
                  (n.match_available = 0)),
                (n.insert = n.strstart < z - 1 ? n.strstart : z - 1),
                Y === T
                  ? (F(n, !0), n.strm.avail_out === 0 ? rt : I)
                  : n.last_lit && (F(n, !1), n.strm.avail_out === 0)
                  ? i
                  : A
              )
            }
            function dt(n, Y, j, N, u) {
              ;(this.good_length = n),
                (this.max_lazy = Y),
                (this.nice_length = j),
                (this.max_chain = N),
                (this.func = u)
            }
            function Nt() {
              ;(this.strm = null),
                (this.status = 0),
                (this.pending_buf = null),
                (this.pending_buf_size = 0),
                (this.pending_out = 0),
                (this.pending = 0),
                (this.wrap = 0),
                (this.gzhead = null),
                (this.gzindex = 0),
                (this.method = E),
                (this.last_flush = -1),
                (this.w_size = 0),
                (this.w_bits = 0),
                (this.w_mask = 0),
                (this.window = null),
                (this.window_size = 0),
                (this.prev = null),
                (this.head = null),
                (this.ins_h = 0),
                (this.hash_size = 0),
                (this.hash_bits = 0),
                (this.hash_mask = 0),
                (this.hash_shift = 0),
                (this.block_start = 0),
                (this.match_length = 0),
                (this.prev_match = 0),
                (this.match_available = 0),
                (this.strstart = 0),
                (this.match_start = 0),
                (this.lookahead = 0),
                (this.prev_length = 0),
                (this.max_chain_length = 0),
                (this.max_lazy_match = 0),
                (this.level = 0),
                (this.strategy = 0),
                (this.good_match = 0),
                (this.nice_match = 0),
                (this.dyn_ltree = new d.Buf16(2 * G)),
                (this.dyn_dtree = new d.Buf16(2 * (2 * O + 1))),
                (this.bl_tree = new d.Buf16(2 * (2 * q + 1))),
                H(this.dyn_ltree),
                H(this.dyn_dtree),
                H(this.bl_tree),
                (this.l_desc = null),
                (this.d_desc = null),
                (this.bl_desc = null),
                (this.bl_count = new d.Buf16(Q + 1)),
                (this.heap = new d.Buf16(2 * x + 1)),
                H(this.heap),
                (this.heap_len = 0),
                (this.heap_max = 0),
                (this.depth = new d.Buf16(2 * x + 1)),
                H(this.depth),
                (this.l_buf = 0),
                (this.lit_bufsize = 0),
                (this.last_lit = 0),
                (this.d_buf = 0),
                (this.opt_len = 0),
                (this.static_len = 0),
                (this.matches = 0),
                (this.insert = 0),
                (this.bi_buf = 0),
                (this.bi_valid = 0)
            }
            function wt(n) {
              var Y
              return n && n.state
                ? ((n.total_in = n.total_out = 0),
                  (n.data_type = f),
                  ((Y = n.state).pending = 0),
                  (Y.pending_out = 0),
                  Y.wrap < 0 && (Y.wrap = -Y.wrap),
                  (Y.status = Y.wrap ? w : k),
                  (n.adler = Y.wrap === 2 ? 0 : 1),
                  (Y.last_flush = b),
                  s._tr_init(Y),
                  l)
                : $(n, g)
            }
            function At(n) {
              var Y = wt(n)
              return (
                Y === l &&
                  (function (j) {
                    ;(j.window_size = 2 * j.w_size),
                      H(j.head),
                      (j.max_lazy_match = h[j.level].max_lazy),
                      (j.good_match = h[j.level].good_length),
                      (j.nice_match = h[j.level].nice_length),
                      (j.max_chain_length = h[j.level].max_chain),
                      (j.strstart = 0),
                      (j.block_start = 0),
                      (j.lookahead = 0),
                      (j.insert = 0),
                      (j.match_length = j.prev_length = z - 1),
                      (j.match_available = 0),
                      (j.ins_h = 0)
                  })(n.state),
                Y
              )
            }
            function Ot(n, Y, j, N, u, S) {
              if (!n) return g
              var V = 1
              if (
                (Y === o && (Y = 6),
                N < 0 ? ((V = 0), (N = -N)) : 15 < N && ((V = 2), (N -= 16)),
                u < 1 ||
                  U < u ||
                  j !== E ||
                  N < 8 ||
                  15 < N ||
                  Y < 0 ||
                  9 < Y ||
                  S < 0 ||
                  p < S)
              )
                return $(n, g)
              N === 8 && (N = 9)
              var J = new Nt()
              return (
                ((n.state = J).strm = n),
                (J.wrap = V),
                (J.gzhead = null),
                (J.w_bits = N),
                (J.w_size = 1 << J.w_bits),
                (J.w_mask = J.w_size - 1),
                (J.hash_bits = u + 7),
                (J.hash_size = 1 << J.hash_bits),
                (J.hash_mask = J.hash_size - 1),
                (J.hash_shift = ~~((J.hash_bits + z - 1) / z)),
                (J.window = new d.Buf8(2 * J.w_size)),
                (J.head = new d.Buf16(J.hash_size)),
                (J.prev = new d.Buf16(J.w_size)),
                (J.lit_bufsize = 1 << (u + 6)),
                (J.pending_buf_size = 4 * J.lit_bufsize),
                (J.pending_buf = new d.Buf8(J.pending_buf_size)),
                (J.d_buf = 1 * J.lit_bufsize),
                (J.l_buf = 3 * J.lit_bufsize),
                (J.level = Y),
                (J.strategy = S),
                (J.method = j),
                At(n)
              )
            }
            ;(h = [
              new dt(0, 0, 0, 0, function (n, Y) {
                var j = 65535
                for (
                  j > n.pending_buf_size - 5 && (j = n.pending_buf_size - 5);
                  ;

                ) {
                  if (n.lookahead <= 1) {
                    if ((yt(n), n.lookahead === 0 && Y === b)) return i
                    if (n.lookahead === 0) break
                  }
                  ;(n.strstart += n.lookahead), (n.lookahead = 0)
                  var N = n.block_start + j
                  if (
                    ((n.strstart === 0 || n.strstart >= N) &&
                      ((n.lookahead = n.strstart - N),
                      (n.strstart = N),
                      F(n, !1),
                      n.strm.avail_out === 0)) ||
                    (n.strstart - n.block_start >= n.w_size - lt &&
                      (F(n, !1), n.strm.avail_out === 0))
                  )
                    return i
                }
                return (
                  (n.insert = 0),
                  Y === T
                    ? (F(n, !0), n.strm.avail_out === 0 ? rt : I)
                    : (n.strstart > n.block_start &&
                        (F(n, !1), n.strm.avail_out),
                      i)
                )
              }),
              new dt(4, 4, 8, 4, Tt),
              new dt(4, 5, 16, 8, Tt),
              new dt(4, 6, 32, 32, Tt),
              new dt(4, 4, 16, 16, ht),
              new dt(8, 16, 32, 32, ht),
              new dt(8, 16, 128, 128, ht),
              new dt(8, 32, 128, 256, ht),
              new dt(32, 128, 258, 1024, ht),
              new dt(32, 258, 258, 4096, ht)
            ]),
              (v.deflateInit = function (n, Y) {
                return Ot(n, Y, E, 15, 8, 0)
              }),
              (v.deflateInit2 = Ot),
              (v.deflateReset = At),
              (v.deflateResetKeep = wt),
              (v.deflateSetHeader = function (n, Y) {
                return n && n.state
                  ? n.state.wrap !== 2
                    ? g
                    : ((n.state.gzhead = Y), l)
                  : g
              }),
              (v.deflate = function (n, Y) {
                var j, N, u, S
                if (!n || !n.state || 5 < Y || Y < 0) return n ? $(n, g) : g
                if (
                  ((N = n.state),
                  !n.output ||
                    (!n.input && n.avail_in !== 0) ||
                    (N.status === 666 && Y !== T))
                )
                  return $(n, n.avail_out === 0 ? -5 : g)
                if (
                  ((N.strm = n),
                  (j = N.last_flush),
                  (N.last_flush = Y),
                  N.status === w)
                )
                  if (N.wrap === 2)
                    (n.adler = 0),
                      ot(N, 31),
                      ot(N, 139),
                      ot(N, 8),
                      N.gzhead
                        ? (ot(
                            N,
                            (N.gzhead.text ? 1 : 0) +
                              (N.gzhead.hcrc ? 2 : 0) +
                              (N.gzhead.extra ? 4 : 0) +
                              (N.gzhead.name ? 8 : 0) +
                              (N.gzhead.comment ? 16 : 0)
                          ),
                          ot(N, 255 & N.gzhead.time),
                          ot(N, (N.gzhead.time >> 8) & 255),
                          ot(N, (N.gzhead.time >> 16) & 255),
                          ot(N, (N.gzhead.time >> 24) & 255),
                          ot(
                            N,
                            N.level === 9
                              ? 2
                              : 2 <= N.strategy || N.level < 2
                              ? 4
                              : 0
                          ),
                          ot(N, 255 & N.gzhead.os),
                          N.gzhead.extra &&
                            N.gzhead.extra.length &&
                            (ot(N, 255 & N.gzhead.extra.length),
                            ot(N, (N.gzhead.extra.length >> 8) & 255)),
                          N.gzhead.hcrc &&
                            (n.adler = r(n.adler, N.pending_buf, N.pending, 0)),
                          (N.gzindex = 0),
                          (N.status = 69))
                        : (ot(N, 0),
                          ot(N, 0),
                          ot(N, 0),
                          ot(N, 0),
                          ot(N, 0),
                          ot(
                            N,
                            N.level === 9
                              ? 2
                              : 2 <= N.strategy || N.level < 2
                              ? 4
                              : 0
                          ),
                          ot(N, 3),
                          (N.status = k))
                  else {
                    var V = (E + ((N.w_bits - 8) << 4)) << 8
                    ;(V |=
                      (2 <= N.strategy || N.level < 2
                        ? 0
                        : N.level < 6
                        ? 1
                        : N.level === 6
                        ? 2
                        : 3) << 6),
                      N.strstart !== 0 && (V |= 32),
                      (V += 31 - (V % 31)),
                      (N.status = k),
                      et(N, V),
                      N.strstart !== 0 &&
                        (et(N, n.adler >>> 16), et(N, 65535 & n.adler)),
                      (n.adler = 1)
                  }
                if (N.status === 69)
                  if (N.gzhead.extra) {
                    for (
                      u = N.pending;
                      N.gzindex < (65535 & N.gzhead.extra.length) &&
                      (N.pending !== N.pending_buf_size ||
                        (N.gzhead.hcrc &&
                          N.pending > u &&
                          (n.adler = r(
                            n.adler,
                            N.pending_buf,
                            N.pending - u,
                            u
                          )),
                        D(n),
                        (u = N.pending),
                        N.pending !== N.pending_buf_size));

                    )
                      ot(N, 255 & N.gzhead.extra[N.gzindex]), N.gzindex++
                    N.gzhead.hcrc &&
                      N.pending > u &&
                      (n.adler = r(n.adler, N.pending_buf, N.pending - u, u)),
                      N.gzindex === N.gzhead.extra.length &&
                        ((N.gzindex = 0), (N.status = 73))
                  } else N.status = 73
                if (N.status === 73)
                  if (N.gzhead.name) {
                    u = N.pending
                    do {
                      if (
                        N.pending === N.pending_buf_size &&
                        (N.gzhead.hcrc &&
                          N.pending > u &&
                          (n.adler = r(
                            n.adler,
                            N.pending_buf,
                            N.pending - u,
                            u
                          )),
                        D(n),
                        (u = N.pending),
                        N.pending === N.pending_buf_size)
                      ) {
                        S = 1
                        break
                      }
                      ;(S =
                        N.gzindex < N.gzhead.name.length
                          ? 255 & N.gzhead.name.charCodeAt(N.gzindex++)
                          : 0),
                        ot(N, S)
                    } while (S !== 0)
                    N.gzhead.hcrc &&
                      N.pending > u &&
                      (n.adler = r(n.adler, N.pending_buf, N.pending - u, u)),
                      S === 0 && ((N.gzindex = 0), (N.status = 91))
                  } else N.status = 91
                if (N.status === 91)
                  if (N.gzhead.comment) {
                    u = N.pending
                    do {
                      if (
                        N.pending === N.pending_buf_size &&
                        (N.gzhead.hcrc &&
                          N.pending > u &&
                          (n.adler = r(
                            n.adler,
                            N.pending_buf,
                            N.pending - u,
                            u
                          )),
                        D(n),
                        (u = N.pending),
                        N.pending === N.pending_buf_size)
                      ) {
                        S = 1
                        break
                      }
                      ;(S =
                        N.gzindex < N.gzhead.comment.length
                          ? 255 & N.gzhead.comment.charCodeAt(N.gzindex++)
                          : 0),
                        ot(N, S)
                    } while (S !== 0)
                    N.gzhead.hcrc &&
                      N.pending > u &&
                      (n.adler = r(n.adler, N.pending_buf, N.pending - u, u)),
                      S === 0 && (N.status = 103)
                  } else N.status = 103
                if (
                  (N.status === 103 &&
                    (N.gzhead.hcrc
                      ? (N.pending + 2 > N.pending_buf_size && D(n),
                        N.pending + 2 <= N.pending_buf_size &&
                          (ot(N, 255 & n.adler),
                          ot(N, (n.adler >> 8) & 255),
                          (n.adler = 0),
                          (N.status = k)))
                      : (N.status = k)),
                  N.pending !== 0)
                ) {
                  if ((D(n), n.avail_out === 0)) return (N.last_flush = -1), l
                } else if (n.avail_in === 0 && M(Y) <= M(j) && Y !== T)
                  return $(n, -5)
                if (N.status === 666 && n.avail_in !== 0) return $(n, -5)
                if (
                  n.avail_in !== 0 ||
                  N.lookahead !== 0 ||
                  (Y !== b && N.status !== 666)
                ) {
                  var J =
                    N.strategy === 2
                      ? (function (C, nt) {
                          for (var st; ; ) {
                            if (
                              C.lookahead === 0 &&
                              (yt(C), C.lookahead === 0)
                            ) {
                              if (nt === b) return i
                              break
                            }
                            if (
                              ((C.match_length = 0),
                              (st = s._tr_tally(C, 0, C.window[C.strstart])),
                              C.lookahead--,
                              C.strstart++,
                              st && (F(C, !1), C.strm.avail_out === 0))
                            )
                              return i
                          }
                          return (
                            (C.insert = 0),
                            nt === T
                              ? (F(C, !0), C.strm.avail_out === 0 ? rt : I)
                              : C.last_lit && (F(C, !1), C.strm.avail_out === 0)
                              ? i
                              : A
                          )
                        })(N, Y)
                      : N.strategy === 3
                      ? (function (C, nt) {
                          for (var st, it, ft, St, gt = C.window; ; ) {
                            if (C.lookahead <= W) {
                              if ((yt(C), C.lookahead <= W && nt === b))
                                return i
                              if (C.lookahead === 0) break
                            }
                            if (
                              ((C.match_length = 0),
                              C.lookahead >= z &&
                                0 < C.strstart &&
                                (it = gt[(ft = C.strstart - 1)]) === gt[++ft] &&
                                it === gt[++ft] &&
                                it === gt[++ft])
                            ) {
                              St = C.strstart + W
                              do;
                              while (
                                it === gt[++ft] &&
                                it === gt[++ft] &&
                                it === gt[++ft] &&
                                it === gt[++ft] &&
                                it === gt[++ft] &&
                                it === gt[++ft] &&
                                it === gt[++ft] &&
                                it === gt[++ft] &&
                                ft < St
                              )
                              ;(C.match_length = W - (St - ft)),
                                C.match_length > C.lookahead &&
                                  (C.match_length = C.lookahead)
                            }
                            if (
                              (C.match_length >= z
                                ? ((st = s._tr_tally(C, 1, C.match_length - z)),
                                  (C.lookahead -= C.match_length),
                                  (C.strstart += C.match_length),
                                  (C.match_length = 0))
                                : ((st = s._tr_tally(
                                    C,
                                    0,
                                    C.window[C.strstart]
                                  )),
                                  C.lookahead--,
                                  C.strstart++),
                              st && (F(C, !1), C.strm.avail_out === 0))
                            )
                              return i
                          }
                          return (
                            (C.insert = 0),
                            nt === T
                              ? (F(C, !0), C.strm.avail_out === 0 ? rt : I)
                              : C.last_lit && (F(C, !1), C.strm.avail_out === 0)
                              ? i
                              : A
                          )
                        })(N, Y)
                      : h[N.level].func(N, Y)
                  if (
                    ((J !== rt && J !== I) || (N.status = 666),
                    J === i || J === rt)
                  )
                    return n.avail_out === 0 && (N.last_flush = -1), l
                  if (
                    J === A &&
                    (Y === 1
                      ? s._tr_align(N)
                      : Y !== 5 &&
                        (s._tr_stored_block(N, 0, 0, !1),
                        Y === 3 &&
                          (H(N.head),
                          N.lookahead === 0 &&
                            ((N.strstart = 0),
                            (N.block_start = 0),
                            (N.insert = 0)))),
                    D(n),
                    n.avail_out === 0)
                  )
                    return (N.last_flush = -1), l
                }
                return Y !== T
                  ? l
                  : N.wrap <= 0
                  ? 1
                  : (N.wrap === 2
                      ? (ot(N, 255 & n.adler),
                        ot(N, (n.adler >> 8) & 255),
                        ot(N, (n.adler >> 16) & 255),
                        ot(N, (n.adler >> 24) & 255),
                        ot(N, 255 & n.total_in),
                        ot(N, (n.total_in >> 8) & 255),
                        ot(N, (n.total_in >> 16) & 255),
                        ot(N, (n.total_in >> 24) & 255))
                      : (et(N, n.adler >>> 16), et(N, 65535 & n.adler)),
                    D(n),
                    0 < N.wrap && (N.wrap = -N.wrap),
                    N.pending !== 0 ? l : 1)
              }),
              (v.deflateEnd = function (n) {
                var Y
                return n && n.state
                  ? (Y = n.state.status) !== w &&
                    Y !== 69 &&
                    Y !== 73 &&
                    Y !== 91 &&
                    Y !== 103 &&
                    Y !== k &&
                    Y !== 666
                    ? $(n, g)
                    : ((n.state = null), Y === k ? $(n, -3) : l)
                  : g
              }),
              (v.deflateSetDictionary = function (n, Y) {
                var j,
                  N,
                  u,
                  S,
                  V,
                  J,
                  C,
                  nt,
                  st = Y.length
                if (
                  !n ||
                  !n.state ||
                  (S = (j = n.state).wrap) === 2 ||
                  (S === 1 && j.status !== w) ||
                  j.lookahead
                )
                  return g
                for (
                  S === 1 && (n.adler = _(n.adler, Y, st, 0)),
                    j.wrap = 0,
                    st >= j.w_size &&
                      (S === 0 &&
                        (H(j.head),
                        (j.strstart = 0),
                        (j.block_start = 0),
                        (j.insert = 0)),
                      (nt = new d.Buf8(j.w_size)),
                      d.arraySet(nt, Y, st - j.w_size, j.w_size, 0),
                      (Y = nt),
                      (st = j.w_size)),
                    V = n.avail_in,
                    J = n.next_in,
                    C = n.input,
                    n.avail_in = st,
                    n.next_in = 0,
                    n.input = Y,
                    yt(j);
                  j.lookahead >= z;

                ) {
                  for (
                    N = j.strstart, u = j.lookahead - (z - 1);
                    (j.ins_h =
                      ((j.ins_h << j.hash_shift) ^ j.window[N + z - 1]) &
                      j.hash_mask),
                      (j.prev[N & j.w_mask] = j.head[j.ins_h]),
                      (j.head[j.ins_h] = N),
                      N++,
                      --u;

                  );
                  ;(j.strstart = N), (j.lookahead = z - 1), yt(j)
                }
                return (
                  (j.strstart += j.lookahead),
                  (j.block_start = j.strstart),
                  (j.insert = j.lookahead),
                  (j.lookahead = 0),
                  (j.match_length = j.prev_length = z - 1),
                  (j.match_available = 0),
                  (n.next_in = J),
                  (n.input = C),
                  (n.avail_in = V),
                  (j.wrap = S),
                  l
                )
              }),
              (v.deflateInfo = 'pako deflate (from Nodeca project)')
          },
          {
            '../utils/common': 41,
            './adler32': 43,
            './crc32': 45,
            './messages': 51,
            './trees': 52
          }
        ],
        47: [
          function (m, B, v) {
            B.exports = function () {
              ;(this.text = 0),
                (this.time = 0),
                (this.xflags = 0),
                (this.os = 0),
                (this.extra = null),
                (this.extra_len = 0),
                (this.name = ''),
                (this.comment = ''),
                (this.hcrc = 0),
                (this.done = !1)
            }
          },
          {}
        ],
        48: [
          function (m, B, v) {
            B.exports = function (h, d) {
              var s,
                _,
                r,
                L,
                b,
                T,
                l,
                g,
                o,
                p,
                f,
                E,
                U,
                x,
                O,
                q,
                G,
                Q,
                z,
                W,
                lt,
                w,
                k,
                i,
                A
              ;(s = h.state),
                (_ = h.next_in),
                (i = h.input),
                (r = _ + (h.avail_in - 5)),
                (L = h.next_out),
                (A = h.output),
                (b = L - (d - h.avail_out)),
                (T = L + (h.avail_out - 257)),
                (l = s.dmax),
                (g = s.wsize),
                (o = s.whave),
                (p = s.wnext),
                (f = s.window),
                (E = s.hold),
                (U = s.bits),
                (x = s.lencode),
                (O = s.distcode),
                (q = (1 << s.lenbits) - 1),
                (G = (1 << s.distbits) - 1)
              t: do {
                U < 15 &&
                  ((E += i[_++] << U), (U += 8), (E += i[_++] << U), (U += 8)),
                  (Q = x[E & q])
                e: for (;;) {
                  if (
                    ((E >>>= z = Q >>> 24),
                    (U -= z),
                    (z = (Q >>> 16) & 255) === 0)
                  )
                    A[L++] = 65535 & Q
                  else {
                    if (!(16 & z)) {
                      if (!(64 & z)) {
                        Q = x[(65535 & Q) + (E & ((1 << z) - 1))]
                        continue e
                      }
                      if (32 & z) {
                        s.mode = 12
                        break t
                      }
                      ;(h.msg = 'invalid literal/length code'), (s.mode = 30)
                      break t
                    }
                    ;(W = 65535 & Q),
                      (z &= 15) &&
                        (U < z && ((E += i[_++] << U), (U += 8)),
                        (W += E & ((1 << z) - 1)),
                        (E >>>= z),
                        (U -= z)),
                      U < 15 &&
                        ((E += i[_++] << U),
                        (U += 8),
                        (E += i[_++] << U),
                        (U += 8)),
                      (Q = O[E & G])
                    r: for (;;) {
                      if (
                        ((E >>>= z = Q >>> 24),
                        (U -= z),
                        !(16 & (z = (Q >>> 16) & 255)))
                      ) {
                        if (!(64 & z)) {
                          Q = O[(65535 & Q) + (E & ((1 << z) - 1))]
                          continue r
                        }
                        ;(h.msg = 'invalid distance code'), (s.mode = 30)
                        break t
                      }
                      if (
                        ((lt = 65535 & Q),
                        U < (z &= 15) &&
                          ((E += i[_++] << U),
                          (U += 8) < z && ((E += i[_++] << U), (U += 8))),
                        l < (lt += E & ((1 << z) - 1)))
                      ) {
                        ;(h.msg = 'invalid distance too far back'),
                          (s.mode = 30)
                        break t
                      }
                      if (((E >>>= z), (U -= z), (z = L - b) < lt)) {
                        if (o < (z = lt - z) && s.sane) {
                          ;(h.msg = 'invalid distance too far back'),
                            (s.mode = 30)
                          break t
                        }
                        if (((k = f), (w = 0) === p)) {
                          if (((w += g - z), z < W)) {
                            for (W -= z; (A[L++] = f[w++]), --z; );
                            ;(w = L - lt), (k = A)
                          }
                        } else if (p < z) {
                          if (((w += g + p - z), (z -= p) < W)) {
                            for (W -= z; (A[L++] = f[w++]), --z; );
                            if (((w = 0), p < W)) {
                              for (W -= z = p; (A[L++] = f[w++]), --z; );
                              ;(w = L - lt), (k = A)
                            }
                          }
                        } else if (((w += p - z), z < W)) {
                          for (W -= z; (A[L++] = f[w++]), --z; );
                          ;(w = L - lt), (k = A)
                        }
                        for (; 2 < W; )
                          (A[L++] = k[w++]),
                            (A[L++] = k[w++]),
                            (A[L++] = k[w++]),
                            (W -= 3)
                        W && ((A[L++] = k[w++]), 1 < W && (A[L++] = k[w++]))
                      } else {
                        for (
                          w = L - lt;
                          (A[L++] = A[w++]),
                            (A[L++] = A[w++]),
                            (A[L++] = A[w++]),
                            2 < (W -= 3);

                        );
                        W && ((A[L++] = A[w++]), 1 < W && (A[L++] = A[w++]))
                      }
                      break
                    }
                  }
                  break
                }
              } while (_ < r && L < T)
              ;(_ -= W = U >> 3),
                (E &= (1 << (U -= W << 3)) - 1),
                (h.next_in = _),
                (h.next_out = L),
                (h.avail_in = _ < r ? r - _ + 5 : 5 - (_ - r)),
                (h.avail_out = L < T ? T - L + 257 : 257 - (L - T)),
                (s.hold = E),
                (s.bits = U)
            }
          },
          {}
        ],
        49: [
          function (m, B, v) {
            var h = m('../utils/common'),
              d = m('./adler32'),
              s = m('./crc32'),
              _ = m('./inffast'),
              r = m('./inftrees'),
              L = 1,
              b = 2,
              T = 0,
              l = -2,
              g = 1,
              o = 852,
              p = 592
            function f(w) {
              return (
                ((w >>> 24) & 255) +
                ((w >>> 8) & 65280) +
                ((65280 & w) << 8) +
                ((255 & w) << 24)
              )
            }
            function E() {
              ;(this.mode = 0),
                (this.last = !1),
                (this.wrap = 0),
                (this.havedict = !1),
                (this.flags = 0),
                (this.dmax = 0),
                (this.check = 0),
                (this.total = 0),
                (this.head = null),
                (this.wbits = 0),
                (this.wsize = 0),
                (this.whave = 0),
                (this.wnext = 0),
                (this.window = null),
                (this.hold = 0),
                (this.bits = 0),
                (this.length = 0),
                (this.offset = 0),
                (this.extra = 0),
                (this.lencode = null),
                (this.distcode = null),
                (this.lenbits = 0),
                (this.distbits = 0),
                (this.ncode = 0),
                (this.nlen = 0),
                (this.ndist = 0),
                (this.have = 0),
                (this.next = null),
                (this.lens = new h.Buf16(320)),
                (this.work = new h.Buf16(288)),
                (this.lendyn = null),
                (this.distdyn = null),
                (this.sane = 0),
                (this.back = 0),
                (this.was = 0)
            }
            function U(w) {
              var k
              return w && w.state
                ? ((k = w.state),
                  (w.total_in = w.total_out = k.total = 0),
                  (w.msg = ''),
                  k.wrap && (w.adler = 1 & k.wrap),
                  (k.mode = g),
                  (k.last = 0),
                  (k.havedict = 0),
                  (k.dmax = 32768),
                  (k.head = null),
                  (k.hold = 0),
                  (k.bits = 0),
                  (k.lencode = k.lendyn = new h.Buf32(o)),
                  (k.distcode = k.distdyn = new h.Buf32(p)),
                  (k.sane = 1),
                  (k.back = -1),
                  T)
                : l
            }
            function x(w) {
              var k
              return w && w.state
                ? (((k = w.state).wsize = 0),
                  (k.whave = 0),
                  (k.wnext = 0),
                  U(w))
                : l
            }
            function O(w, k) {
              var i, A
              return w && w.state
                ? ((A = w.state),
                  k < 0
                    ? ((i = 0), (k = -k))
                    : ((i = 1 + (k >> 4)), k < 48 && (k &= 15)),
                  k && (k < 8 || 15 < k)
                    ? l
                    : (A.window !== null && A.wbits !== k && (A.window = null),
                      (A.wrap = i),
                      (A.wbits = k),
                      x(w)))
                : l
            }
            function q(w, k) {
              var i, A
              return w
                ? ((A = new E()),
                  ((w.state = A).window = null),
                  (i = O(w, k)) !== T && (w.state = null),
                  i)
                : l
            }
            var G,
              Q,
              z = !0
            function W(w) {
              if (z) {
                var k
                for (
                  G = new h.Buf32(512), Q = new h.Buf32(32), k = 0;
                  k < 144;

                )
                  w.lens[k++] = 8
                for (; k < 256; ) w.lens[k++] = 9
                for (; k < 280; ) w.lens[k++] = 7
                for (; k < 288; ) w.lens[k++] = 8
                for (
                  r(L, w.lens, 0, 288, G, 0, w.work, { bits: 9 }), k = 0;
                  k < 32;

                )
                  w.lens[k++] = 5
                r(b, w.lens, 0, 32, Q, 0, w.work, { bits: 5 }), (z = !1)
              }
              ;(w.lencode = G),
                (w.lenbits = 9),
                (w.distcode = Q),
                (w.distbits = 5)
            }
            function lt(w, k, i, A) {
              var rt,
                I = w.state
              return (
                I.window === null &&
                  ((I.wsize = 1 << I.wbits),
                  (I.wnext = 0),
                  (I.whave = 0),
                  (I.window = new h.Buf8(I.wsize))),
                A >= I.wsize
                  ? (h.arraySet(I.window, k, i - I.wsize, I.wsize, 0),
                    (I.wnext = 0),
                    (I.whave = I.wsize))
                  : (A < (rt = I.wsize - I.wnext) && (rt = A),
                    h.arraySet(I.window, k, i - A, rt, I.wnext),
                    (A -= rt)
                      ? (h.arraySet(I.window, k, i - A, A, 0),
                        (I.wnext = A),
                        (I.whave = I.wsize))
                      : ((I.wnext += rt),
                        I.wnext === I.wsize && (I.wnext = 0),
                        I.whave < I.wsize && (I.whave += rt))),
                0
              )
            }
            ;(v.inflateReset = x),
              (v.inflateReset2 = O),
              (v.inflateResetKeep = U),
              (v.inflateInit = function (w) {
                return q(w, 15)
              }),
              (v.inflateInit2 = q),
              (v.inflate = function (w, k) {
                var i,
                  A,
                  rt,
                  I,
                  $,
                  M,
                  H,
                  D,
                  F,
                  ot,
                  et,
                  K,
                  yt,
                  Tt,
                  ht,
                  dt,
                  Nt,
                  wt,
                  At,
                  Ot,
                  n,
                  Y,
                  j,
                  N,
                  u = 0,
                  S = new h.Buf8(4),
                  V = [
                    16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14,
                    1, 15
                  ]
                if (
                  !w ||
                  !w.state ||
                  !w.output ||
                  (!w.input && w.avail_in !== 0)
                )
                  return l
                ;(i = w.state).mode === 12 && (i.mode = 13),
                  ($ = w.next_out),
                  (rt = w.output),
                  (H = w.avail_out),
                  (I = w.next_in),
                  (A = w.input),
                  (M = w.avail_in),
                  (D = i.hold),
                  (F = i.bits),
                  (ot = M),
                  (et = H),
                  (Y = T)
                t: for (;;)
                  switch (i.mode) {
                    case g:
                      if (i.wrap === 0) {
                        i.mode = 13
                        break
                      }
                      for (; F < 16; ) {
                        if (M === 0) break t
                        M--, (D += A[I++] << F), (F += 8)
                      }
                      if (2 & i.wrap && D === 35615) {
                        ;(S[(i.check = 0)] = 255 & D),
                          (S[1] = (D >>> 8) & 255),
                          (i.check = s(i.check, S, 2, 0)),
                          (F = D = 0),
                          (i.mode = 2)
                        break
                      }
                      if (
                        ((i.flags = 0),
                        i.head && (i.head.done = !1),
                        !(1 & i.wrap) || (((255 & D) << 8) + (D >> 8)) % 31)
                      ) {
                        ;(w.msg = 'incorrect header check'), (i.mode = 30)
                        break
                      }
                      if ((15 & D) != 8) {
                        ;(w.msg = 'unknown compression method'), (i.mode = 30)
                        break
                      }
                      if (
                        ((F -= 4), (n = 8 + (15 & (D >>>= 4))), i.wbits === 0)
                      )
                        i.wbits = n
                      else if (n > i.wbits) {
                        ;(w.msg = 'invalid window size'), (i.mode = 30)
                        break
                      }
                      ;(i.dmax = 1 << n),
                        (w.adler = i.check = 1),
                        (i.mode = 512 & D ? 10 : 12),
                        (F = D = 0)
                      break
                    case 2:
                      for (; F < 16; ) {
                        if (M === 0) break t
                        M--, (D += A[I++] << F), (F += 8)
                      }
                      if (((i.flags = D), (255 & i.flags) != 8)) {
                        ;(w.msg = 'unknown compression method'), (i.mode = 30)
                        break
                      }
                      if (57344 & i.flags) {
                        ;(w.msg = 'unknown header flags set'), (i.mode = 30)
                        break
                      }
                      i.head && (i.head.text = (D >> 8) & 1),
                        512 & i.flags &&
                          ((S[0] = 255 & D),
                          (S[1] = (D >>> 8) & 255),
                          (i.check = s(i.check, S, 2, 0))),
                        (F = D = 0),
                        (i.mode = 3)
                    case 3:
                      for (; F < 32; ) {
                        if (M === 0) break t
                        M--, (D += A[I++] << F), (F += 8)
                      }
                      i.head && (i.head.time = D),
                        512 & i.flags &&
                          ((S[0] = 255 & D),
                          (S[1] = (D >>> 8) & 255),
                          (S[2] = (D >>> 16) & 255),
                          (S[3] = (D >>> 24) & 255),
                          (i.check = s(i.check, S, 4, 0))),
                        (F = D = 0),
                        (i.mode = 4)
                    case 4:
                      for (; F < 16; ) {
                        if (M === 0) break t
                        M--, (D += A[I++] << F), (F += 8)
                      }
                      i.head &&
                        ((i.head.xflags = 255 & D), (i.head.os = D >> 8)),
                        512 & i.flags &&
                          ((S[0] = 255 & D),
                          (S[1] = (D >>> 8) & 255),
                          (i.check = s(i.check, S, 2, 0))),
                        (F = D = 0),
                        (i.mode = 5)
                    case 5:
                      if (1024 & i.flags) {
                        for (; F < 16; ) {
                          if (M === 0) break t
                          M--, (D += A[I++] << F), (F += 8)
                        }
                        ;(i.length = D),
                          i.head && (i.head.extra_len = D),
                          512 & i.flags &&
                            ((S[0] = 255 & D),
                            (S[1] = (D >>> 8) & 255),
                            (i.check = s(i.check, S, 2, 0))),
                          (F = D = 0)
                      } else i.head && (i.head.extra = null)
                      i.mode = 6
                    case 6:
                      if (
                        1024 & i.flags &&
                        (M < (K = i.length) && (K = M),
                        K &&
                          (i.head &&
                            ((n = i.head.extra_len - i.length),
                            i.head.extra ||
                              (i.head.extra = new Array(i.head.extra_len)),
                            h.arraySet(i.head.extra, A, I, K, n)),
                          512 & i.flags && (i.check = s(i.check, A, K, I)),
                          (M -= K),
                          (I += K),
                          (i.length -= K)),
                        i.length)
                      )
                        break t
                      ;(i.length = 0), (i.mode = 7)
                    case 7:
                      if (2048 & i.flags) {
                        if (M === 0) break t
                        for (
                          K = 0;
                          (n = A[I + K++]),
                            i.head &&
                              n &&
                              i.length < 65536 &&
                              (i.head.name += String.fromCharCode(n)),
                            n && K < M;

                        );
                        if (
                          (512 & i.flags && (i.check = s(i.check, A, K, I)),
                          (M -= K),
                          (I += K),
                          n)
                        )
                          break t
                      } else i.head && (i.head.name = null)
                      ;(i.length = 0), (i.mode = 8)
                    case 8:
                      if (4096 & i.flags) {
                        if (M === 0) break t
                        for (
                          K = 0;
                          (n = A[I + K++]),
                            i.head &&
                              n &&
                              i.length < 65536 &&
                              (i.head.comment += String.fromCharCode(n)),
                            n && K < M;

                        );
                        if (
                          (512 & i.flags && (i.check = s(i.check, A, K, I)),
                          (M -= K),
                          (I += K),
                          n)
                        )
                          break t
                      } else i.head && (i.head.comment = null)
                      i.mode = 9
                    case 9:
                      if (512 & i.flags) {
                        for (; F < 16; ) {
                          if (M === 0) break t
                          M--, (D += A[I++] << F), (F += 8)
                        }
                        if (D !== (65535 & i.check)) {
                          ;(w.msg = 'header crc mismatch'), (i.mode = 30)
                          break
                        }
                        F = D = 0
                      }
                      i.head &&
                        ((i.head.hcrc = (i.flags >> 9) & 1),
                        (i.head.done = !0)),
                        (w.adler = i.check = 0),
                        (i.mode = 12)
                      break
                    case 10:
                      for (; F < 32; ) {
                        if (M === 0) break t
                        M--, (D += A[I++] << F), (F += 8)
                      }
                      ;(w.adler = i.check = f(D)), (F = D = 0), (i.mode = 11)
                    case 11:
                      if (i.havedict === 0)
                        return (
                          (w.next_out = $),
                          (w.avail_out = H),
                          (w.next_in = I),
                          (w.avail_in = M),
                          (i.hold = D),
                          (i.bits = F),
                          2
                        )
                      ;(w.adler = i.check = 1), (i.mode = 12)
                    case 12:
                      if (k === 5 || k === 6) break t
                    case 13:
                      if (i.last) {
                        ;(D >>>= 7 & F), (F -= 7 & F), (i.mode = 27)
                        break
                      }
                      for (; F < 3; ) {
                        if (M === 0) break t
                        M--, (D += A[I++] << F), (F += 8)
                      }
                      switch (((i.last = 1 & D), (F -= 1), 3 & (D >>>= 1))) {
                        case 0:
                          i.mode = 14
                          break
                        case 1:
                          if ((W(i), (i.mode = 20), k !== 6)) break
                          ;(D >>>= 2), (F -= 2)
                          break t
                        case 2:
                          i.mode = 17
                          break
                        case 3:
                          ;(w.msg = 'invalid block type'), (i.mode = 30)
                      }
                      ;(D >>>= 2), (F -= 2)
                      break
                    case 14:
                      for (D >>>= 7 & F, F -= 7 & F; F < 32; ) {
                        if (M === 0) break t
                        M--, (D += A[I++] << F), (F += 8)
                      }
                      if ((65535 & D) != ((D >>> 16) ^ 65535)) {
                        ;(w.msg = 'invalid stored block lengths'), (i.mode = 30)
                        break
                      }
                      if (
                        ((i.length = 65535 & D),
                        (F = D = 0),
                        (i.mode = 15),
                        k === 6)
                      )
                        break t
                    case 15:
                      i.mode = 16
                    case 16:
                      if ((K = i.length)) {
                        if ((M < K && (K = M), H < K && (K = H), K === 0))
                          break t
                        h.arraySet(rt, A, I, K, $),
                          (M -= K),
                          (I += K),
                          (H -= K),
                          ($ += K),
                          (i.length -= K)
                        break
                      }
                      i.mode = 12
                      break
                    case 17:
                      for (; F < 14; ) {
                        if (M === 0) break t
                        M--, (D += A[I++] << F), (F += 8)
                      }
                      if (
                        ((i.nlen = 257 + (31 & D)),
                        (D >>>= 5),
                        (F -= 5),
                        (i.ndist = 1 + (31 & D)),
                        (D >>>= 5),
                        (F -= 5),
                        (i.ncode = 4 + (15 & D)),
                        (D >>>= 4),
                        (F -= 4),
                        286 < i.nlen || 30 < i.ndist)
                      ) {
                        ;(w.msg = 'too many length or distance symbols'),
                          (i.mode = 30)
                        break
                      }
                      ;(i.have = 0), (i.mode = 18)
                    case 18:
                      for (; i.have < i.ncode; ) {
                        for (; F < 3; ) {
                          if (M === 0) break t
                          M--, (D += A[I++] << F), (F += 8)
                        }
                        ;(i.lens[V[i.have++]] = 7 & D), (D >>>= 3), (F -= 3)
                      }
                      for (; i.have < 19; ) i.lens[V[i.have++]] = 0
                      if (
                        ((i.lencode = i.lendyn),
                        (i.lenbits = 7),
                        (j = { bits: i.lenbits }),
                        (Y = r(0, i.lens, 0, 19, i.lencode, 0, i.work, j)),
                        (i.lenbits = j.bits),
                        Y)
                      ) {
                        ;(w.msg = 'invalid code lengths set'), (i.mode = 30)
                        break
                      }
                      ;(i.have = 0), (i.mode = 19)
                    case 19:
                      for (; i.have < i.nlen + i.ndist; ) {
                        for (
                          ;
                          (dt =
                            ((u = i.lencode[D & ((1 << i.lenbits) - 1)]) >>>
                              16) &
                            255),
                            (Nt = 65535 & u),
                            !((ht = u >>> 24) <= F);

                        ) {
                          if (M === 0) break t
                          M--, (D += A[I++] << F), (F += 8)
                        }
                        if (Nt < 16)
                          (D >>>= ht), (F -= ht), (i.lens[i.have++] = Nt)
                        else {
                          if (Nt === 16) {
                            for (N = ht + 2; F < N; ) {
                              if (M === 0) break t
                              M--, (D += A[I++] << F), (F += 8)
                            }
                            if (((D >>>= ht), (F -= ht), i.have === 0)) {
                              ;(w.msg = 'invalid bit length repeat'),
                                (i.mode = 30)
                              break
                            }
                            ;(n = i.lens[i.have - 1]),
                              (K = 3 + (3 & D)),
                              (D >>>= 2),
                              (F -= 2)
                          } else if (Nt === 17) {
                            for (N = ht + 3; F < N; ) {
                              if (M === 0) break t
                              M--, (D += A[I++] << F), (F += 8)
                            }
                            ;(F -= ht),
                              (n = 0),
                              (K = 3 + (7 & (D >>>= ht))),
                              (D >>>= 3),
                              (F -= 3)
                          } else {
                            for (N = ht + 7; F < N; ) {
                              if (M === 0) break t
                              M--, (D += A[I++] << F), (F += 8)
                            }
                            ;(F -= ht),
                              (n = 0),
                              (K = 11 + (127 & (D >>>= ht))),
                              (D >>>= 7),
                              (F -= 7)
                          }
                          if (i.have + K > i.nlen + i.ndist) {
                            ;(w.msg = 'invalid bit length repeat'),
                              (i.mode = 30)
                            break
                          }
                          for (; K--; ) i.lens[i.have++] = n
                        }
                      }
                      if (i.mode === 30) break
                      if (i.lens[256] === 0) {
                        ;(w.msg = 'invalid code -- missing end-of-block'),
                          (i.mode = 30)
                        break
                      }
                      if (
                        ((i.lenbits = 9),
                        (j = { bits: i.lenbits }),
                        (Y = r(L, i.lens, 0, i.nlen, i.lencode, 0, i.work, j)),
                        (i.lenbits = j.bits),
                        Y)
                      ) {
                        ;(w.msg = 'invalid literal/lengths set'), (i.mode = 30)
                        break
                      }
                      if (
                        ((i.distbits = 6),
                        (i.distcode = i.distdyn),
                        (j = { bits: i.distbits }),
                        (Y = r(
                          b,
                          i.lens,
                          i.nlen,
                          i.ndist,
                          i.distcode,
                          0,
                          i.work,
                          j
                        )),
                        (i.distbits = j.bits),
                        Y)
                      ) {
                        ;(w.msg = 'invalid distances set'), (i.mode = 30)
                        break
                      }
                      if (((i.mode = 20), k === 6)) break t
                    case 20:
                      i.mode = 21
                    case 21:
                      if (6 <= M && 258 <= H) {
                        ;(w.next_out = $),
                          (w.avail_out = H),
                          (w.next_in = I),
                          (w.avail_in = M),
                          (i.hold = D),
                          (i.bits = F),
                          _(w, et),
                          ($ = w.next_out),
                          (rt = w.output),
                          (H = w.avail_out),
                          (I = w.next_in),
                          (A = w.input),
                          (M = w.avail_in),
                          (D = i.hold),
                          (F = i.bits),
                          i.mode === 12 && (i.back = -1)
                        break
                      }
                      for (
                        i.back = 0;
                        (dt =
                          ((u = i.lencode[D & ((1 << i.lenbits) - 1)]) >>> 16) &
                          255),
                          (Nt = 65535 & u),
                          !((ht = u >>> 24) <= F);

                      ) {
                        if (M === 0) break t
                        M--, (D += A[I++] << F), (F += 8)
                      }
                      if (dt && !(240 & dt)) {
                        for (
                          wt = ht, At = dt, Ot = Nt;
                          (dt =
                            ((u =
                              i.lencode[
                                Ot + ((D & ((1 << (wt + At)) - 1)) >> wt)
                              ]) >>>
                              16) &
                            255),
                            (Nt = 65535 & u),
                            !(wt + (ht = u >>> 24) <= F);

                        ) {
                          if (M === 0) break t
                          M--, (D += A[I++] << F), (F += 8)
                        }
                        ;(D >>>= wt), (F -= wt), (i.back += wt)
                      }
                      if (
                        ((D >>>= ht),
                        (F -= ht),
                        (i.back += ht),
                        (i.length = Nt),
                        dt === 0)
                      ) {
                        i.mode = 26
                        break
                      }
                      if (32 & dt) {
                        ;(i.back = -1), (i.mode = 12)
                        break
                      }
                      if (64 & dt) {
                        ;(w.msg = 'invalid literal/length code'), (i.mode = 30)
                        break
                      }
                      ;(i.extra = 15 & dt), (i.mode = 22)
                    case 22:
                      if (i.extra) {
                        for (N = i.extra; F < N; ) {
                          if (M === 0) break t
                          M--, (D += A[I++] << F), (F += 8)
                        }
                        ;(i.length += D & ((1 << i.extra) - 1)),
                          (D >>>= i.extra),
                          (F -= i.extra),
                          (i.back += i.extra)
                      }
                      ;(i.was = i.length), (i.mode = 23)
                    case 23:
                      for (
                        ;
                        (dt =
                          ((u = i.distcode[D & ((1 << i.distbits) - 1)]) >>>
                            16) &
                          255),
                          (Nt = 65535 & u),
                          !((ht = u >>> 24) <= F);

                      ) {
                        if (M === 0) break t
                        M--, (D += A[I++] << F), (F += 8)
                      }
                      if (!(240 & dt)) {
                        for (
                          wt = ht, At = dt, Ot = Nt;
                          (dt =
                            ((u =
                              i.distcode[
                                Ot + ((D & ((1 << (wt + At)) - 1)) >> wt)
                              ]) >>>
                              16) &
                            255),
                            (Nt = 65535 & u),
                            !(wt + (ht = u >>> 24) <= F);

                        ) {
                          if (M === 0) break t
                          M--, (D += A[I++] << F), (F += 8)
                        }
                        ;(D >>>= wt), (F -= wt), (i.back += wt)
                      }
                      if (((D >>>= ht), (F -= ht), (i.back += ht), 64 & dt)) {
                        ;(w.msg = 'invalid distance code'), (i.mode = 30)
                        break
                      }
                      ;(i.offset = Nt), (i.extra = 15 & dt), (i.mode = 24)
                    case 24:
                      if (i.extra) {
                        for (N = i.extra; F < N; ) {
                          if (M === 0) break t
                          M--, (D += A[I++] << F), (F += 8)
                        }
                        ;(i.offset += D & ((1 << i.extra) - 1)),
                          (D >>>= i.extra),
                          (F -= i.extra),
                          (i.back += i.extra)
                      }
                      if (i.offset > i.dmax) {
                        ;(w.msg = 'invalid distance too far back'),
                          (i.mode = 30)
                        break
                      }
                      i.mode = 25
                    case 25:
                      if (H === 0) break t
                      if (((K = et - H), i.offset > K)) {
                        if ((K = i.offset - K) > i.whave && i.sane) {
                          ;(w.msg = 'invalid distance too far back'),
                            (i.mode = 30)
                          break
                        }
                        ;(yt =
                          K > i.wnext
                            ? ((K -= i.wnext), i.wsize - K)
                            : i.wnext - K),
                          K > i.length && (K = i.length),
                          (Tt = i.window)
                      } else (Tt = rt), (yt = $ - i.offset), (K = i.length)
                      for (
                        H < K && (K = H), H -= K, i.length -= K;
                        (rt[$++] = Tt[yt++]), --K;

                      );
                      i.length === 0 && (i.mode = 21)
                      break
                    case 26:
                      if (H === 0) break t
                      ;(rt[$++] = i.length), H--, (i.mode = 21)
                      break
                    case 27:
                      if (i.wrap) {
                        for (; F < 32; ) {
                          if (M === 0) break t
                          M--, (D |= A[I++] << F), (F += 8)
                        }
                        if (
                          ((et -= H),
                          (w.total_out += et),
                          (i.total += et),
                          et &&
                            (w.adler = i.check =
                              i.flags
                                ? s(i.check, rt, et, $ - et)
                                : d(i.check, rt, et, $ - et)),
                          (et = H),
                          (i.flags ? D : f(D)) !== i.check)
                        ) {
                          ;(w.msg = 'incorrect data check'), (i.mode = 30)
                          break
                        }
                        F = D = 0
                      }
                      i.mode = 28
                    case 28:
                      if (i.wrap && i.flags) {
                        for (; F < 32; ) {
                          if (M === 0) break t
                          M--, (D += A[I++] << F), (F += 8)
                        }
                        if (D !== (4294967295 & i.total)) {
                          ;(w.msg = 'incorrect length check'), (i.mode = 30)
                          break
                        }
                        F = D = 0
                      }
                      i.mode = 29
                    case 29:
                      Y = 1
                      break t
                    case 30:
                      Y = -3
                      break t
                    case 31:
                      return -4
                    case 32:
                    default:
                      return l
                  }
                return (
                  (w.next_out = $),
                  (w.avail_out = H),
                  (w.next_in = I),
                  (w.avail_in = M),
                  (i.hold = D),
                  (i.bits = F),
                  (i.wsize ||
                    (et !== w.avail_out &&
                      i.mode < 30 &&
                      (i.mode < 27 || k !== 4))) &&
                  lt(w, w.output, w.next_out, et - w.avail_out)
                    ? ((i.mode = 31), -4)
                    : ((ot -= w.avail_in),
                      (et -= w.avail_out),
                      (w.total_in += ot),
                      (w.total_out += et),
                      (i.total += et),
                      i.wrap &&
                        et &&
                        (w.adler = i.check =
                          i.flags
                            ? s(i.check, rt, et, w.next_out - et)
                            : d(i.check, rt, et, w.next_out - et)),
                      (w.data_type =
                        i.bits +
                        (i.last ? 64 : 0) +
                        (i.mode === 12 ? 128 : 0) +
                        (i.mode === 20 || i.mode === 15 ? 256 : 0)),
                      ((ot == 0 && et === 0) || k === 4) && Y === T && (Y = -5),
                      Y)
                )
              }),
              (v.inflateEnd = function (w) {
                if (!w || !w.state) return l
                var k = w.state
                return k.window && (k.window = null), (w.state = null), T
              }),
              (v.inflateGetHeader = function (w, k) {
                var i
                return w && w.state && 2 & (i = w.state).wrap
                  ? (((i.head = k).done = !1), T)
                  : l
              }),
              (v.inflateSetDictionary = function (w, k) {
                var i,
                  A = k.length
                return w && w.state
                  ? (i = w.state).wrap !== 0 && i.mode !== 11
                    ? l
                    : i.mode === 11 && d(1, k, A, 0) !== i.check
                    ? -3
                    : lt(w, k, A, A)
                    ? ((i.mode = 31), -4)
                    : ((i.havedict = 1), T)
                  : l
              }),
              (v.inflateInfo = 'pako inflate (from Nodeca project)')
          },
          {
            '../utils/common': 41,
            './adler32': 43,
            './crc32': 45,
            './inffast': 48,
            './inftrees': 50
          }
        ],
        50: [
          function (m, B, v) {
            var h = m('../utils/common'),
              d = [
                3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43,
                51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
              ],
              s = [
                16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
                19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
              ],
              _ = [
                1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257,
                385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289,
                16385, 24577, 0, 0
              ],
              r = [
                16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
                23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64
              ]
            B.exports = function (L, b, T, l, g, o, p, f) {
              var E,
                U,
                x,
                O,
                q,
                G,
                Q,
                z,
                W,
                lt = f.bits,
                w = 0,
                k = 0,
                i = 0,
                A = 0,
                rt = 0,
                I = 0,
                $ = 0,
                M = 0,
                H = 0,
                D = 0,
                F = null,
                ot = 0,
                et = new h.Buf16(16),
                K = new h.Buf16(16),
                yt = null,
                Tt = 0
              for (w = 0; w <= 15; w++) et[w] = 0
              for (k = 0; k < l; k++) et[b[T + k]]++
              for (rt = lt, A = 15; 1 <= A && et[A] === 0; A--);
              if ((A < rt && (rt = A), A === 0))
                return (g[o++] = 20971520), (g[o++] = 20971520), (f.bits = 1), 0
              for (i = 1; i < A && et[i] === 0; i++);
              for (rt < i && (rt = i), w = M = 1; w <= 15; w++)
                if (((M <<= 1), (M -= et[w]) < 0)) return -1
              if (0 < M && (L === 0 || A !== 1)) return -1
              for (K[1] = 0, w = 1; w < 15; w++) K[w + 1] = K[w] + et[w]
              for (k = 0; k < l; k++) b[T + k] !== 0 && (p[K[b[T + k]]++] = k)
              if (
                ((G =
                  L === 0
                    ? ((F = yt = p), 19)
                    : L === 1
                    ? ((F = d), (ot -= 257), (yt = s), (Tt -= 257), 256)
                    : ((F = _), (yt = r), -1)),
                (w = i),
                (q = o),
                ($ = k = D = 0),
                (x = -1),
                (O = (H = 1 << (I = rt)) - 1),
                (L === 1 && 852 < H) || (L === 2 && 592 < H))
              )
                return 1
              for (;;) {
                for (
                  Q = w - $,
                    W =
                      p[k] < G
                        ? ((z = 0), p[k])
                        : p[k] > G
                        ? ((z = yt[Tt + p[k]]), F[ot + p[k]])
                        : ((z = 96), 0),
                    E = 1 << (w - $),
                    i = U = 1 << I;
                  (g[q + (D >> $) + (U -= E)] = (Q << 24) | (z << 16) | W | 0),
                    U !== 0;

                );
                for (E = 1 << (w - 1); D & E; ) E >>= 1
                if (
                  (E !== 0 ? ((D &= E - 1), (D += E)) : (D = 0),
                  k++,
                  --et[w] == 0)
                ) {
                  if (w === A) break
                  w = b[T + p[k]]
                }
                if (rt < w && (D & O) !== x) {
                  for (
                    $ === 0 && ($ = rt), q += i, M = 1 << (I = w - $);
                    I + $ < A && !((M -= et[I + $]) <= 0);

                  )
                    I++, (M <<= 1)
                  if (
                    ((H += 1 << I),
                    (L === 1 && 852 < H) || (L === 2 && 592 < H))
                  )
                    return 1
                  g[(x = D & O)] = (rt << 24) | (I << 16) | (q - o) | 0
                }
              }
              return (
                D !== 0 && (g[q + D] = ((w - $) << 24) | (64 << 16) | 0),
                (f.bits = rt),
                0
              )
            }
          },
          { '../utils/common': 41 }
        ],
        51: [
          function (m, B, v) {
            B.exports = {
              2: 'need dictionary',
              1: 'stream end',
              0: '',
              '-1': 'file error',
              '-2': 'stream error',
              '-3': 'data error',
              '-4': 'insufficient memory',
              '-5': 'buffer error',
              '-6': 'incompatible version'
            }
          },
          {}
        ],
        52: [
          function (m, B, v) {
            var h = m('../utils/common'),
              d = 0,
              s = 1
            function _(u) {
              for (var S = u.length; 0 <= --S; ) u[S] = 0
            }
            var r = 0,
              L = 29,
              b = 256,
              T = b + 1 + L,
              l = 30,
              g = 19,
              o = 2 * T + 1,
              p = 15,
              f = 16,
              E = 7,
              U = 256,
              x = 16,
              O = 17,
              q = 18,
              G = [
                0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4,
                4, 4, 4, 5, 5, 5, 5, 0
              ],
              Q = [
                0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9,
                9, 10, 10, 11, 11, 12, 12, 13, 13
              ],
              z = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
              W = [
                16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15
              ],
              lt = new Array(2 * (T + 2))
            _(lt)
            var w = new Array(2 * l)
            _(w)
            var k = new Array(512)
            _(k)
            var i = new Array(256)
            _(i)
            var A = new Array(L)
            _(A)
            var rt,
              I,
              $,
              M = new Array(l)
            function H(u, S, V, J, C) {
              ;(this.static_tree = u),
                (this.extra_bits = S),
                (this.extra_base = V),
                (this.elems = J),
                (this.max_length = C),
                (this.has_stree = u && u.length)
            }
            function D(u, S) {
              ;(this.dyn_tree = u), (this.max_code = 0), (this.stat_desc = S)
            }
            function F(u) {
              return u < 256 ? k[u] : k[256 + (u >>> 7)]
            }
            function ot(u, S) {
              ;(u.pending_buf[u.pending++] = 255 & S),
                (u.pending_buf[u.pending++] = (S >>> 8) & 255)
            }
            function et(u, S, V) {
              u.bi_valid > f - V
                ? ((u.bi_buf |= (S << u.bi_valid) & 65535),
                  ot(u, u.bi_buf),
                  (u.bi_buf = S >> (f - u.bi_valid)),
                  (u.bi_valid += V - f))
                : ((u.bi_buf |= (S << u.bi_valid) & 65535), (u.bi_valid += V))
            }
            function K(u, S, V) {
              et(u, V[2 * S], V[2 * S + 1])
            }
            function yt(u, S) {
              for (var V = 0; (V |= 1 & u), (u >>>= 1), (V <<= 1), 0 < --S; );
              return V >>> 1
            }
            function Tt(u, S, V) {
              var J,
                C,
                nt = new Array(p + 1),
                st = 0
              for (J = 1; J <= p; J++) nt[J] = st = (st + V[J - 1]) << 1
              for (C = 0; C <= S; C++) {
                var it = u[2 * C + 1]
                it !== 0 && (u[2 * C] = yt(nt[it]++, it))
              }
            }
            function ht(u) {
              var S
              for (S = 0; S < T; S++) u.dyn_ltree[2 * S] = 0
              for (S = 0; S < l; S++) u.dyn_dtree[2 * S] = 0
              for (S = 0; S < g; S++) u.bl_tree[2 * S] = 0
              ;(u.dyn_ltree[2 * U] = 1),
                (u.opt_len = u.static_len = 0),
                (u.last_lit = u.matches = 0)
            }
            function dt(u) {
              8 < u.bi_valid
                ? ot(u, u.bi_buf)
                : 0 < u.bi_valid && (u.pending_buf[u.pending++] = u.bi_buf),
                (u.bi_buf = 0),
                (u.bi_valid = 0)
            }
            function Nt(u, S, V, J) {
              var C = 2 * S,
                nt = 2 * V
              return u[C] < u[nt] || (u[C] === u[nt] && J[S] <= J[V])
            }
            function wt(u, S, V) {
              for (
                var J = u.heap[V], C = V << 1;
                C <= u.heap_len &&
                (C < u.heap_len &&
                  Nt(S, u.heap[C + 1], u.heap[C], u.depth) &&
                  C++,
                !Nt(S, J, u.heap[C], u.depth));

              )
                (u.heap[V] = u.heap[C]), (V = C), (C <<= 1)
              u.heap[V] = J
            }
            function At(u, S, V) {
              var J,
                C,
                nt,
                st,
                it = 0
              if (u.last_lit !== 0)
                for (
                  ;
                  (J =
                    (u.pending_buf[u.d_buf + 2 * it] << 8) |
                    u.pending_buf[u.d_buf + 2 * it + 1]),
                    (C = u.pending_buf[u.l_buf + it]),
                    it++,
                    J === 0
                      ? K(u, C, S)
                      : (K(u, (nt = i[C]) + b + 1, S),
                        (st = G[nt]) !== 0 && et(u, (C -= A[nt]), st),
                        K(u, (nt = F(--J)), V),
                        (st = Q[nt]) !== 0 && et(u, (J -= M[nt]), st)),
                    it < u.last_lit;

                );
              K(u, U, S)
            }
            function Ot(u, S) {
              var V,
                J,
                C,
                nt = S.dyn_tree,
                st = S.stat_desc.static_tree,
                it = S.stat_desc.has_stree,
                ft = S.stat_desc.elems,
                St = -1
              for (u.heap_len = 0, u.heap_max = o, V = 0; V < ft; V++)
                nt[2 * V] !== 0
                  ? ((u.heap[++u.heap_len] = St = V), (u.depth[V] = 0))
                  : (nt[2 * V + 1] = 0)
              for (; u.heap_len < 2; )
                (nt[2 * (C = u.heap[++u.heap_len] = St < 2 ? ++St : 0)] = 1),
                  (u.depth[C] = 0),
                  u.opt_len--,
                  it && (u.static_len -= st[2 * C + 1])
              for (S.max_code = St, V = u.heap_len >> 1; 1 <= V; V--)
                wt(u, nt, V)
              for (
                C = ft;
                (V = u.heap[1]),
                  (u.heap[1] = u.heap[u.heap_len--]),
                  wt(u, nt, 1),
                  (J = u.heap[1]),
                  (u.heap[--u.heap_max] = V),
                  (u.heap[--u.heap_max] = J),
                  (nt[2 * C] = nt[2 * V] + nt[2 * J]),
                  (u.depth[C] =
                    (u.depth[V] >= u.depth[J] ? u.depth[V] : u.depth[J]) + 1),
                  (nt[2 * V + 1] = nt[2 * J + 1] = C),
                  (u.heap[1] = C++),
                  wt(u, nt, 1),
                  2 <= u.heap_len;

              );
              ;(u.heap[--u.heap_max] = u.heap[1]),
                (function (gt, Dt) {
                  var Wt,
                    xt,
                    Kt,
                    kt,
                    te,
                    _t,
                    Rt = Dt.dyn_tree,
                    ne = Dt.max_code,
                    jt = Dt.stat_desc.static_tree,
                    ke = Dt.stat_desc.has_stree,
                    Gt = Dt.stat_desc.extra_bits,
                    ie = Dt.stat_desc.extra_base,
                    X = Dt.stat_desc.max_length,
                    Xt = 0
                  for (kt = 0; kt <= p; kt++) gt.bl_count[kt] = 0
                  for (
                    Rt[2 * gt.heap[gt.heap_max] + 1] = 0, Wt = gt.heap_max + 1;
                    Wt < o;
                    Wt++
                  )
                    X < (kt = Rt[2 * Rt[2 * (xt = gt.heap[Wt]) + 1] + 1] + 1) &&
                      ((kt = X), Xt++),
                      (Rt[2 * xt + 1] = kt),
                      ne < xt ||
                        (gt.bl_count[kt]++,
                        (te = 0),
                        ie <= xt && (te = Gt[xt - ie]),
                        (_t = Rt[2 * xt]),
                        (gt.opt_len += _t * (kt + te)),
                        ke && (gt.static_len += _t * (jt[2 * xt + 1] + te)))
                  if (Xt !== 0) {
                    do {
                      for (kt = X - 1; gt.bl_count[kt] === 0; ) kt--
                      gt.bl_count[kt]--,
                        (gt.bl_count[kt + 1] += 2),
                        gt.bl_count[X]--,
                        (Xt -= 2)
                    } while (0 < Xt)
                    for (kt = X; kt !== 0; kt--)
                      for (xt = gt.bl_count[kt]; xt !== 0; )
                        ne < (Kt = gt.heap[--Wt]) ||
                          (Rt[2 * Kt + 1] !== kt &&
                            ((gt.opt_len += (kt - Rt[2 * Kt + 1]) * Rt[2 * Kt]),
                            (Rt[2 * Kt + 1] = kt)),
                          xt--)
                  }
                })(u, S),
                Tt(nt, St, u.bl_count)
            }
            function n(u, S, V) {
              var J,
                C,
                nt = -1,
                st = S[1],
                it = 0,
                ft = 7,
                St = 4
              for (
                st === 0 && ((ft = 138), (St = 3)),
                  S[2 * (V + 1) + 1] = 65535,
                  J = 0;
                J <= V;
                J++
              )
                (C = st),
                  (st = S[2 * (J + 1) + 1]),
                  (++it < ft && C === st) ||
                    (it < St
                      ? (u.bl_tree[2 * C] += it)
                      : C !== 0
                      ? (C !== nt && u.bl_tree[2 * C]++, u.bl_tree[2 * x]++)
                      : it <= 10
                      ? u.bl_tree[2 * O]++
                      : u.bl_tree[2 * q]++,
                    (nt = C),
                    (St =
                      (it = 0) === st
                        ? ((ft = 138), 3)
                        : C === st
                        ? ((ft = 6), 3)
                        : ((ft = 7), 4)))
            }
            function Y(u, S, V) {
              var J,
                C,
                nt = -1,
                st = S[1],
                it = 0,
                ft = 7,
                St = 4
              for (st === 0 && ((ft = 138), (St = 3)), J = 0; J <= V; J++)
                if (
                  ((C = st),
                  (st = S[2 * (J + 1) + 1]),
                  !(++it < ft && C === st))
                ) {
                  if (it < St) for (; K(u, C, u.bl_tree), --it != 0; );
                  else
                    C !== 0
                      ? (C !== nt && (K(u, C, u.bl_tree), it--),
                        K(u, x, u.bl_tree),
                        et(u, it - 3, 2))
                      : it <= 10
                      ? (K(u, O, u.bl_tree), et(u, it - 3, 3))
                      : (K(u, q, u.bl_tree), et(u, it - 11, 7))
                  ;(nt = C),
                    (St =
                      (it = 0) === st
                        ? ((ft = 138), 3)
                        : C === st
                        ? ((ft = 6), 3)
                        : ((ft = 7), 4))
                }
            }
            _(M)
            var j = !1
            function N(u, S, V, J) {
              et(u, (r << 1) + (J ? 1 : 0), 3),
                (function (C, nt, st, it) {
                  dt(C),
                    it && (ot(C, st), ot(C, ~st)),
                    h.arraySet(C.pending_buf, C.window, nt, st, C.pending),
                    (C.pending += st)
                })(u, S, V, !0)
            }
            ;(v._tr_init = function (u) {
              j ||
                ((function () {
                  var S,
                    V,
                    J,
                    C,
                    nt,
                    st = new Array(p + 1)
                  for (C = J = 0; C < L - 1; C++)
                    for (A[C] = J, S = 0; S < 1 << G[C]; S++) i[J++] = C
                  for (i[J - 1] = C, C = nt = 0; C < 16; C++)
                    for (M[C] = nt, S = 0; S < 1 << Q[C]; S++) k[nt++] = C
                  for (nt >>= 7; C < l; C++)
                    for (M[C] = nt << 7, S = 0; S < 1 << (Q[C] - 7); S++)
                      k[256 + nt++] = C
                  for (V = 0; V <= p; V++) st[V] = 0
                  for (S = 0; S <= 143; ) (lt[2 * S + 1] = 8), S++, st[8]++
                  for (; S <= 255; ) (lt[2 * S + 1] = 9), S++, st[9]++
                  for (; S <= 279; ) (lt[2 * S + 1] = 7), S++, st[7]++
                  for (; S <= 287; ) (lt[2 * S + 1] = 8), S++, st[8]++
                  for (Tt(lt, T + 1, st), S = 0; S < l; S++)
                    (w[2 * S + 1] = 5), (w[2 * S] = yt(S, 5))
                  ;(rt = new H(lt, G, b + 1, T, p)),
                    (I = new H(w, Q, 0, l, p)),
                    ($ = new H(new Array(0), z, 0, g, E))
                })(),
                (j = !0)),
                (u.l_desc = new D(u.dyn_ltree, rt)),
                (u.d_desc = new D(u.dyn_dtree, I)),
                (u.bl_desc = new D(u.bl_tree, $)),
                (u.bi_buf = 0),
                (u.bi_valid = 0),
                ht(u)
            }),
              (v._tr_stored_block = N),
              (v._tr_flush_block = function (u, S, V, J) {
                var C,
                  nt,
                  st = 0
                0 < u.level
                  ? (u.strm.data_type === 2 &&
                      (u.strm.data_type = (function (it) {
                        var ft,
                          St = 4093624447
                        for (ft = 0; ft <= 31; ft++, St >>>= 1)
                          if (1 & St && it.dyn_ltree[2 * ft] !== 0) return d
                        if (
                          it.dyn_ltree[18] !== 0 ||
                          it.dyn_ltree[20] !== 0 ||
                          it.dyn_ltree[26] !== 0
                        )
                          return s
                        for (ft = 32; ft < b; ft++)
                          if (it.dyn_ltree[2 * ft] !== 0) return s
                        return d
                      })(u)),
                    Ot(u, u.l_desc),
                    Ot(u, u.d_desc),
                    (st = (function (it) {
                      var ft
                      for (
                        n(it, it.dyn_ltree, it.l_desc.max_code),
                          n(it, it.dyn_dtree, it.d_desc.max_code),
                          Ot(it, it.bl_desc),
                          ft = g - 1;
                        3 <= ft && it.bl_tree[2 * W[ft] + 1] === 0;
                        ft--
                      );
                      return (it.opt_len += 3 * (ft + 1) + 5 + 5 + 4), ft
                    })(u)),
                    (C = (u.opt_len + 3 + 7) >>> 3),
                    (nt = (u.static_len + 3 + 7) >>> 3) <= C && (C = nt))
                  : (C = nt = V + 5),
                  V + 4 <= C && S !== -1
                    ? N(u, S, V, J)
                    : u.strategy === 4 || nt === C
                    ? (et(u, 2 + (J ? 1 : 0), 3), At(u, lt, w))
                    : (et(u, 4 + (J ? 1 : 0), 3),
                      (function (it, ft, St, gt) {
                        var Dt
                        for (
                          et(it, ft - 257, 5),
                            et(it, St - 1, 5),
                            et(it, gt - 4, 4),
                            Dt = 0;
                          Dt < gt;
                          Dt++
                        )
                          et(it, it.bl_tree[2 * W[Dt] + 1], 3)
                        Y(it, it.dyn_ltree, ft - 1), Y(it, it.dyn_dtree, St - 1)
                      })(
                        u,
                        u.l_desc.max_code + 1,
                        u.d_desc.max_code + 1,
                        st + 1
                      ),
                      At(u, u.dyn_ltree, u.dyn_dtree)),
                  ht(u),
                  J && dt(u)
              }),
              (v._tr_tally = function (u, S, V) {
                return (
                  (u.pending_buf[u.d_buf + 2 * u.last_lit] = (S >>> 8) & 255),
                  (u.pending_buf[u.d_buf + 2 * u.last_lit + 1] = 255 & S),
                  (u.pending_buf[u.l_buf + u.last_lit] = 255 & V),
                  u.last_lit++,
                  S === 0
                    ? u.dyn_ltree[2 * V]++
                    : (u.matches++,
                      S--,
                      u.dyn_ltree[2 * (i[V] + b + 1)]++,
                      u.dyn_dtree[2 * F(S)]++),
                  u.last_lit === u.lit_bufsize - 1
                )
              }),
              (v._tr_align = function (u) {
                et(u, 2, 3),
                  K(u, U, lt),
                  (function (S) {
                    S.bi_valid === 16
                      ? (ot(S, S.bi_buf), (S.bi_buf = 0), (S.bi_valid = 0))
                      : 8 <= S.bi_valid &&
                        ((S.pending_buf[S.pending++] = 255 & S.bi_buf),
                        (S.bi_buf >>= 8),
                        (S.bi_valid -= 8))
                  })(u)
              })
          },
          { '../utils/common': 41 }
        ],
        53: [
          function (m, B, v) {
            B.exports = function () {
              ;(this.input = null),
                (this.next_in = 0),
                (this.avail_in = 0),
                (this.total_in = 0),
                (this.output = null),
                (this.next_out = 0),
                (this.avail_out = 0),
                (this.total_out = 0),
                (this.msg = ''),
                (this.state = null),
                (this.data_type = 2),
                (this.adler = 0)
            }
          },
          {}
        ],
        54: [
          function (m, B, v) {
            ;(function (h) {
              ;(function (d, s) {
                if (!d.setImmediate) {
                  var _,
                    r,
                    L,
                    b,
                    T = 1,
                    l = {},
                    g = !1,
                    o = d.document,
                    p = Object.getPrototypeOf && Object.getPrototypeOf(d)
                  ;(p = p && p.setTimeout ? p : d),
                    (_ =
                      {}.toString.call(d.process) === '[object process]'
                        ? function (x) {
                            process.nextTick(function () {
                              E(x)
                            })
                          }
                        : (function () {
                            if (d.postMessage && !d.importScripts) {
                              var x = !0,
                                O = d.onmessage
                              return (
                                (d.onmessage = function () {
                                  x = !1
                                }),
                                d.postMessage('', '*'),
                                (d.onmessage = O),
                                x
                              )
                            }
                          })()
                        ? ((b = 'setImmediate$' + Math.random() + '$'),
                          d.addEventListener
                            ? d.addEventListener('message', U, !1)
                            : d.attachEvent('onmessage', U),
                          function (x) {
                            d.postMessage(b + x, '*')
                          })
                        : d.MessageChannel
                        ? (((L = new MessageChannel()).port1.onmessage =
                            function (x) {
                              E(x.data)
                            }),
                          function (x) {
                            L.port2.postMessage(x)
                          })
                        : o && 'onreadystatechange' in o.createElement('script')
                        ? ((r = o.documentElement),
                          function (x) {
                            var O = o.createElement('script')
                            ;(O.onreadystatechange = function () {
                              E(x),
                                (O.onreadystatechange = null),
                                r.removeChild(O),
                                (O = null)
                            }),
                              r.appendChild(O)
                          })
                        : function (x) {
                            setTimeout(E, 0, x)
                          }),
                    (p.setImmediate = function (x) {
                      typeof x != 'function' && (x = new Function('' + x))
                      for (
                        var O = new Array(arguments.length - 1), q = 0;
                        q < O.length;
                        q++
                      )
                        O[q] = arguments[q + 1]
                      var G = { callback: x, args: O }
                      return (l[T] = G), _(T), T++
                    }),
                    (p.clearImmediate = f)
                }
                function f(x) {
                  delete l[x]
                }
                function E(x) {
                  if (g) setTimeout(E, 0, x)
                  else {
                    var O = l[x]
                    if (O) {
                      g = !0
                      try {
                        ;(function (q) {
                          var G = q.callback,
                            Q = q.args
                          switch (Q.length) {
                            case 0:
                              G()
                              break
                            case 1:
                              G(Q[0])
                              break
                            case 2:
                              G(Q[0], Q[1])
                              break
                            case 3:
                              G(Q[0], Q[1], Q[2])
                              break
                            default:
                              G.apply(s, Q)
                          }
                        })(O)
                      } finally {
                        f(x), (g = !1)
                      }
                    }
                  }
                }
                function U(x) {
                  x.source === d &&
                    typeof x.data == 'string' &&
                    x.data.indexOf(b) === 0 &&
                    E(+x.data.slice(b.length))
                }
              })(typeof self > 'u' ? (h === void 0 ? this : h) : self)
            }).call(
              this,
              typeof he < 'u'
                ? he
                : typeof self < 'u'
                ? self
                : typeof window < 'u'
                ? window
                : {}
            )
          },
          {}
        ]
      },
      {},
      [10]
    )(10)
  })
})(gn)
const En = qe,
  bn = new En()
class yn {
  static async init(ut) {
    const m = await fetch(ut).then((B) => B.blob())
    return await bn.loadAsync(m)
  }
}
const Ur = {
  task: {
    id: '',
    matter_type: 0,
    title: '',
    detail: '',
    files: null,
    start_time: 0,
    start_time_full_day: 0,
    end_time: '0',
    remind_at: null,
    repeat_type: 0,
    end_repeat_at: 0,
    execute_addr: '',
    widget: null,
    state: 0,
    creator_id: '0',
    complete_at: 0,
    cancel_at: 0,
    create_at: 0,
    update_at: 0,
    cancel_from: 0,
    priority_level: 0
  },
  task_dispatch: {
    id: '',
    dispatch_id: '',
    ref_task_id: '',
    taker_id: '',
    invite_id: '',
    invite_type: '',
    identity: 0,
    state: 0,
    operate_state: 0,
    personal_state: 0,
    reason: '',
    is_admin: 0,
    is_dispatch: 0,
    execute_at: 0,
    personal_remind_at: null,
    accept_at: 0,
    finish_time: 0,
    cancel_at: 0,
    revoke_at: 0,
    exit_at: 0,
    set_admin_at: 0,
    topmost_at: 0,
    create_at: 0,
    update_at: 0,
    delete_at: 0,
    is_view: 0,
    status: 0,
    is_valid: 0
  },
  task_follow: { id: '', user_id: '', task_id: '', create_at: 0 },
  task_config: {
    id: '',
    max_taker_total: 0,
    category: 0,
    parent_id: '',
    level: 0,
    sort: 0,
    is_checkbox: 0,
    ref_meeting_id: '',
    project_id: '',
    import_project_user_id: '',
    import_project_at: 0,
    project_task_sort: 0,
    score: 0,
    last_active_at: 0,
    repeat_change_id: '',
    application_id: '',
    flow_step_id: '',
    application_json: null,
    operate_type: 0,
    creator_id: '',
    create_at: 0,
    update_at: 0
  },
  tag: {
    id: '',
    name: '',
    creator_id: '',
    color: '',
    type: 0,
    state: 0,
    create_at: 0,
    update_at: 0
  },
  tag_bind: {
    id: '',
    tag_id: '',
    user_id: '',
    object_id: '',
    state: 0,
    create_at: 0,
    update_at: 0
  },
  task_repeat: {
    repeat_id: '',
    task_id: '',
    start_time: 0,
    start_time_full_day: 0,
    end_time: 0,
    end_time_full_day: 0,
    remind_at: null,
    cycle: 0,
    cycle_date: null,
    change_id: '',
    complete_at: 0,
    create_at: 0
  },
  task_repeat_finish: {
    id: 0,
    repeat_id: '',
    task_id: '',
    user_id: '',
    finish_time: 0
  },
  task_conclusion: {
    task_id: '',
    content: '',
    files: null,
    creator_id: '',
    updater_id: '',
    create_at: 0,
    update_at: 0,
    delete_at: 0
  },
  workspace_bind: {
    id: '',
    workspace_id: '',
    project_id: '',
    creator_id: '',
    sort: 0,
    state: 0,
    ws_type: 0,
    accept_at: 0,
    refuse_at: 0,
    revoke_at: 0,
    create_at: 0,
    update_at: 0
  },
  workspace: {
    id: '',
    name: '',
    icon: '',
    icon_color: '',
    bg_icon: '',
    creator_id: '',
    ws_desc: '',
    ws_type: 0,
    files: null,
    level: 1,
    create_at: 0,
    update_at: 0,
    state: 1,
    expired_at: 0,
    update_level_at: 0,
    attr_json: null
  },
  workspace_member: {
    id: '',
    workspace_id: '',
    creator_id: '',
    user_id: '',
    invite_id: '',
    identify: 0,
    invite_type: '',
    member_type: 0,
    state: 0,
    approval_state: 0,
    approval_at: 0,
    accept_at: 0,
    refuse_at: 0,
    revoke_at: 0,
    exit_at: 0,
    create_at: 0,
    update_at: 0,
    source: '',
    target_member_type: 0
  },
  project: {
    id: '',
    project_name: '',
    project_desc: '',
    files: null,
    target_time: 0,
    state: 0,
    creator_id: '',
    cancel_at: 0,
    create_at: 0,
    update_at: 0
  },
  task_relation: {
    task_id: '',
    user_id: '',
    taker_total: 0,
    child_total: 0,
    comment_total: 0,
    important_total: 0,
    quote_total: 0,
    file_total: 0,
    note_total: 0,
    record_total: 0,
    gadget_meeting_total: 0,
    gadget_todo_total: 0,
    gadget_time_collect_total: 0,
    gadget_notice_total: 0
  },
  task_flow_step: {
    id: '',
    task_id: '',
    application_flow_step_id: '',
    name: '',
    range_type: 0,
    range_user_ids: null,
    specify_user_ids: null,
    operate_type: 0,
    sort: 0,
    state: 0,
    complete_at: 0,
    back_detail: '',
    creator_id: '',
    create_at: 0,
    update_at: 0
  },
  task_flow_step_relation: {
    id: '',
    task_id: '',
    user_id: '',
    step_id: '',
    is_lock: 0,
    complete_at: 0,
    is_back: 0,
    removed_at: 0,
    back_at: 0,
    create_at: 0,
    update_at: 0,
    delete_at: 0
  }
}
function Ae(at) {
  return new Promise((ut, m) => {
    ;(at.oncomplete = at.onsuccess = () => ut(at.result)),
      (at.onabort = at.onerror = () => m(at.error))
  })
}
function wn(at, ut) {
  const m = indexedDB.open(at)
  m.onupgradeneeded = () => m.result.createObjectStore(ut)
  const B = Ae(m)
  return (v, h) => B.then((d) => h(d.transaction(ut, v).objectStore(ut)))
}
let Pe
function Ye() {
  return Pe || (Pe = wn('keyval-store', 'keyval')), Pe
}
function Ar(at, ut = Ye()) {
  return ut('readonly', (m) => Ae(m.get(at)))
}
function kr(at, ut, m = Ye()) {
  return m('readwrite', (B) => (B.put(ut, at), Ae(B.transaction)))
}
function vn(at, ut = Ye()) {
  return ut('readwrite', (m) => (m.delete(at), Ae(m.transaction)))
}
var We = {},
  Ln = {
    get exports() {
      return We
    },
    set exports(at) {
      We = at
    }
  }
;(function (at, ut) {
  ;(function (m, B) {
    at.exports = B()
  })(he, function () {
    var m = 1e3,
      B = 6e4,
      v = 36e5,
      h = 'millisecond',
      d = 'second',
      s = 'minute',
      _ = 'hour',
      r = 'day',
      L = 'week',
      b = 'month',
      T = 'quarter',
      l = 'year',
      g = 'date',
      o = 'Invalid Date',
      p =
        /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
      f =
        /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
      E = {
        name: 'en',
        weekdays:
          'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        months:
          'January_February_March_April_May_June_July_August_September_October_November_December'.split(
            '_'
          ),
        ordinal: function (k) {
          var i = ['th', 'st', 'nd', 'rd'],
            A = k % 100
          return '[' + k + (i[(A - 20) % 10] || i[A] || i[0]) + ']'
        }
      },
      U = function (k, i, A) {
        var rt = String(k)
        return !rt || rt.length >= i
          ? k
          : '' + Array(i + 1 - rt.length).join(A) + k
      },
      x = {
        s: U,
        z: function (k) {
          var i = -k.utcOffset(),
            A = Math.abs(i),
            rt = Math.floor(A / 60),
            I = A % 60
          return (i <= 0 ? '+' : '-') + U(rt, 2, '0') + ':' + U(I, 2, '0')
        },
        m: function k(i, A) {
          if (i.date() < A.date()) return -k(A, i)
          var rt = 12 * (A.year() - i.year()) + (A.month() - i.month()),
            I = i.clone().add(rt, b),
            $ = A - I < 0,
            M = i.clone().add(rt + ($ ? -1 : 1), b)
          return +(-(rt + (A - I) / ($ ? I - M : M - I)) || 0)
        },
        a: function (k) {
          return k < 0 ? Math.ceil(k) || 0 : Math.floor(k)
        },
        p: function (k) {
          return (
            { M: b, y: l, w: L, d: r, D: g, h: _, m: s, s: d, ms: h, Q: T }[
              k
            ] ||
            String(k || '')
              .toLowerCase()
              .replace(/s$/, '')
          )
        },
        u: function (k) {
          return k === void 0
        }
      },
      O = 'en',
      q = {}
    q[O] = E
    var G = function (k) {
        return k instanceof lt
      },
      Q = function k(i, A, rt) {
        var I
        if (!i) return O
        if (typeof i == 'string') {
          var $ = i.toLowerCase()
          q[$] && (I = $), A && ((q[$] = A), (I = $))
          var M = i.split('-')
          if (!I && M.length > 1) return k(M[0])
        } else {
          var H = i.name
          ;(q[H] = i), (I = H)
        }
        return !rt && I && (O = I), I || (!rt && O)
      },
      z = function (k, i) {
        if (G(k)) return k.clone()
        var A = typeof i == 'object' ? i : {}
        return (A.date = k), (A.args = arguments), new lt(A)
      },
      W = x
    ;(W.l = Q),
      (W.i = G),
      (W.w = function (k, i) {
        return z(k, { locale: i.$L, utc: i.$u, x: i.$x, $offset: i.$offset })
      })
    var lt = (function () {
        function k(A) {
          ;(this.$L = Q(A.locale, null, !0)), this.parse(A)
        }
        var i = k.prototype
        return (
          (i.parse = function (A) {
            ;(this.$d = (function (rt) {
              var I = rt.date,
                $ = rt.utc
              if (I === null) return new Date(NaN)
              if (W.u(I)) return new Date()
              if (I instanceof Date) return new Date(I)
              if (typeof I == 'string' && !/Z$/i.test(I)) {
                var M = I.match(p)
                if (M) {
                  var H = M[2] - 1 || 0,
                    D = (M[7] || '0').substring(0, 3)
                  return $
                    ? new Date(
                        Date.UTC(
                          M[1],
                          H,
                          M[3] || 1,
                          M[4] || 0,
                          M[5] || 0,
                          M[6] || 0,
                          D
                        )
                      )
                    : new Date(
                        M[1],
                        H,
                        M[3] || 1,
                        M[4] || 0,
                        M[5] || 0,
                        M[6] || 0,
                        D
                      )
                }
              }
              return new Date(I)
            })(A)),
              (this.$x = A.x || {}),
              this.init()
          }),
          (i.init = function () {
            var A = this.$d
            ;(this.$y = A.getFullYear()),
              (this.$M = A.getMonth()),
              (this.$D = A.getDate()),
              (this.$W = A.getDay()),
              (this.$H = A.getHours()),
              (this.$m = A.getMinutes()),
              (this.$s = A.getSeconds()),
              (this.$ms = A.getMilliseconds())
          }),
          (i.$utils = function () {
            return W
          }),
          (i.isValid = function () {
            return this.$d.toString() !== o
          }),
          (i.isSame = function (A, rt) {
            var I = z(A)
            return this.startOf(rt) <= I && I <= this.endOf(rt)
          }),
          (i.isAfter = function (A, rt) {
            return z(A) < this.startOf(rt)
          }),
          (i.isBefore = function (A, rt) {
            return this.endOf(rt) < z(A)
          }),
          (i.$g = function (A, rt, I) {
            return W.u(A) ? this[rt] : this.set(I, A)
          }),
          (i.unix = function () {
            return Math.floor(this.valueOf() / 1e3)
          }),
          (i.valueOf = function () {
            return this.$d.getTime()
          }),
          (i.startOf = function (A, rt) {
            var I = this,
              $ = !!W.u(rt) || rt,
              M = W.p(A),
              H = function (ht, dt) {
                var Nt = W.w(
                  I.$u ? Date.UTC(I.$y, dt, ht) : new Date(I.$y, dt, ht),
                  I
                )
                return $ ? Nt : Nt.endOf(r)
              },
              D = function (ht, dt) {
                return W.w(
                  I.toDate()[ht].apply(
                    I.toDate('s'),
                    ($ ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(dt)
                  ),
                  I
                )
              },
              F = this.$W,
              ot = this.$M,
              et = this.$D,
              K = 'set' + (this.$u ? 'UTC' : '')
            switch (M) {
              case l:
                return $ ? H(1, 0) : H(31, 11)
              case b:
                return $ ? H(1, ot) : H(0, ot + 1)
              case L:
                var yt = this.$locale().weekStart || 0,
                  Tt = (F < yt ? F + 7 : F) - yt
                return H($ ? et - Tt : et + (6 - Tt), ot)
              case r:
              case g:
                return D(K + 'Hours', 0)
              case _:
                return D(K + 'Minutes', 1)
              case s:
                return D(K + 'Seconds', 2)
              case d:
                return D(K + 'Milliseconds', 3)
              default:
                return this.clone()
            }
          }),
          (i.endOf = function (A) {
            return this.startOf(A, !1)
          }),
          (i.$set = function (A, rt) {
            var I,
              $ = W.p(A),
              M = 'set' + (this.$u ? 'UTC' : ''),
              H = ((I = {}),
              (I[r] = M + 'Date'),
              (I[g] = M + 'Date'),
              (I[b] = M + 'Month'),
              (I[l] = M + 'FullYear'),
              (I[_] = M + 'Hours'),
              (I[s] = M + 'Minutes'),
              (I[d] = M + 'Seconds'),
              (I[h] = M + 'Milliseconds'),
              I)[$],
              D = $ === r ? this.$D + (rt - this.$W) : rt
            if ($ === b || $ === l) {
              var F = this.clone().set(g, 1)
              F.$d[H](D),
                F.init(),
                (this.$d = F.set(g, Math.min(this.$D, F.daysInMonth())).$d)
            } else H && this.$d[H](D)
            return this.init(), this
          }),
          (i.set = function (A, rt) {
            return this.clone().$set(A, rt)
          }),
          (i.get = function (A) {
            return this[W.p(A)]()
          }),
          (i.add = function (A, rt) {
            var I,
              $ = this
            A = Number(A)
            var M = W.p(rt),
              H = function (ot) {
                var et = z($)
                return W.w(et.date(et.date() + Math.round(ot * A)), $)
              }
            if (M === b) return this.set(b, this.$M + A)
            if (M === l) return this.set(l, this.$y + A)
            if (M === r) return H(1)
            if (M === L) return H(7)
            var D = ((I = {}), (I[s] = B), (I[_] = v), (I[d] = m), I)[M] || 1,
              F = this.$d.getTime() + A * D
            return W.w(F, this)
          }),
          (i.subtract = function (A, rt) {
            return this.add(-1 * A, rt)
          }),
          (i.format = function (A) {
            var rt = this,
              I = this.$locale()
            if (!this.isValid()) return I.invalidDate || o
            var $ = A || 'YYYY-MM-DDTHH:mm:ssZ',
              M = W.z(this),
              H = this.$H,
              D = this.$m,
              F = this.$M,
              ot = I.weekdays,
              et = I.months,
              K = function (dt, Nt, wt, At) {
                return (dt && (dt[Nt] || dt(rt, $))) || wt[Nt].slice(0, At)
              },
              yt = function (dt) {
                return W.s(H % 12 || 12, dt, '0')
              },
              Tt =
                I.meridiem ||
                function (dt, Nt, wt) {
                  var At = dt < 12 ? 'AM' : 'PM'
                  return wt ? At.toLowerCase() : At
                },
              ht = {
                YY: String(this.$y).slice(-2),
                YYYY: this.$y,
                M: F + 1,
                MM: W.s(F + 1, 2, '0'),
                MMM: K(I.monthsShort, F, et, 3),
                MMMM: K(et, F),
                D: this.$D,
                DD: W.s(this.$D, 2, '0'),
                d: String(this.$W),
                dd: K(I.weekdaysMin, this.$W, ot, 2),
                ddd: K(I.weekdaysShort, this.$W, ot, 3),
                dddd: ot[this.$W],
                H: String(H),
                HH: W.s(H, 2, '0'),
                h: yt(1),
                hh: yt(2),
                a: Tt(H, D, !0),
                A: Tt(H, D, !1),
                m: String(D),
                mm: W.s(D, 2, '0'),
                s: String(this.$s),
                ss: W.s(this.$s, 2, '0'),
                SSS: W.s(this.$ms, 3, '0'),
                Z: M
              }
            return $.replace(f, function (dt, Nt) {
              return Nt || ht[dt] || M.replace(':', '')
            })
          }),
          (i.utcOffset = function () {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
          }),
          (i.diff = function (A, rt, I) {
            var $,
              M = W.p(rt),
              H = z(A),
              D = (H.utcOffset() - this.utcOffset()) * B,
              F = this - H,
              ot = W.m(this, H)
            return (
              (ot =
                (($ = {}),
                ($[l] = ot / 12),
                ($[b] = ot),
                ($[T] = ot / 3),
                ($[L] = (F - D) / 6048e5),
                ($[r] = (F - D) / 864e5),
                ($[_] = F / v),
                ($[s] = F / B),
                ($[d] = F / m),
                $)[M] || F),
              I ? ot : W.a(ot)
            )
          }),
          (i.daysInMonth = function () {
            return this.endOf(b).$D
          }),
          (i.$locale = function () {
            return q[this.$L]
          }),
          (i.locale = function (A, rt) {
            if (!A) return this.$L
            var I = this.clone(),
              $ = Q(A, rt, !0)
            return $ && (I.$L = $), I
          }),
          (i.clone = function () {
            return W.w(this.$d, this)
          }),
          (i.toDate = function () {
            return new Date(this.valueOf())
          }),
          (i.toJSON = function () {
            return this.isValid() ? this.toISOString() : null
          }),
          (i.toISOString = function () {
            return this.$d.toISOString()
          }),
          (i.toString = function () {
            return this.$d.toUTCString()
          }),
          k
        )
      })(),
      w = lt.prototype
    return (
      (z.prototype = w),
      [
        ['$ms', h],
        ['$s', d],
        ['$m', s],
        ['$H', _],
        ['$W', r],
        ['$M', b],
        ['$y', l],
        ['$D', g]
      ].forEach(function (k) {
        w[k[1]] = function (i) {
          return this.$g(i, k[0], k[1])
        }
      }),
      (z.extend = function (k, i) {
        return k.$i || (k(i, lt, z), (k.$i = !0)), z
      }),
      (z.locale = Q),
      (z.isDayjs = G),
      (z.unix = function (k) {
        return z(1e3 * k)
      }),
      (z.en = q[O]),
      (z.Ls = q),
      (z.p = {}),
      z
    )
  })
})(Ln)
const Tn = ['widget', 'remind_at', 'tags', 'files'],
  Sn = ['is_follow', 'schedule_hide'],
  Un = (at) => `SELECT taker_id, is_admin, finish_time
   FROM task_dispatch
   WHERE ref_task_id = ${at} AND is_valid = 1
   AND identity NOT IN (10804, 10811)
   AND operate_state = 0`,
  An = ({
    limit: at,
    where: ut,
    order: m,
    user_id: B,
    LeftJoinRepeatAnd: v
  }) => `SELECT * FROM (SELECT a.dispatch_id, a.identity, a.state, a.personal_state, a.operate_state, a.id AS task_id, a.matter_type, a.repeat_type,
a.end_repeat_at, a.create_at, a.category, a.repeat_id, a.cycle, a.cycle_date, a.title, a.detail, a.files,
a.start_time, a.start_time_full_day, a.end_time, a.end_time_full_day, a.remind_at, a.widget, a.project_id,
IFNULL(f.content, '') AS conclusion, a.creator_id, a.priority_level, IFNULL(i.create_at, 0) AS update_at, a.complete_at,
a.finish_time, CASE WHEN j.id > 0 THEN 1 ELSE 0 END AS is_follow,
CASE WHEN a.delete_at > 0 THEN 1 ELSE 0 END AS schedule_hide,
CASE WHEN a.complete_at = 0 AND (a.start_time > STRFTIME('%s', 'now') OR cycle_date > DATE('now')) THEN 1
     WHEN a.complete_at = 0 AND (a.end_time = 0 OR a.end_time > STRFTIME('%s', 'now')) THEN 2
     WHEN a.complete_at = 0 AND (a.end_time > 0 OR a.end_time < STRFTIME('%s', 'now')) THEN 3
     WHEN a.complete_at > 0 AND (a.complete_at <= a.end_time OR a.end_time = 0) THEN 4
     WHEN a.complete_at > 0 AND a.end_time > 0 AND a.complete_at > a.end_time THEN 5 END AS matter_state,
w.project_name, project_creator_id, workspace_id, workspace_name, ws_type, is_external_member,
IFNULL(tags, '[]') AS tags, parent_id, parent_name, IFNULL(k.taker_total, 0) AS taker_total,
IFNULL(k.child_total, 0) AS child_total,
CASE WHEN k.child_total > 0 THEN 1 ELSE 0 END AS has_child,
IFNULL(k.comment_total, 0) AS comment_total,
IFNULL(k.important_total, 0) AS important_total, IFNULL(k.quote_total, 0) AS quote_total,
IFNULL(k.file_total, 0) AS file_total, IFNULL(gadget_meeting_total, 0) AS gadget_meeting_total,
IFNULL(gadget_todo_total, 0) AS gadget_todo_total, flow_step_id, flow_step_name, flow_step_complete_at,
z.user_id, step_user_count, date, timestamp, application_id,
CASE WHEN STRFTIME('%w', date) == '0' THEN '周日'
     WHEN STRFTIME('%w', date) == '1' THEN '周一'
     WHEN STRFTIME('%w', date) == '2' THEN '周二'
     WHEN STRFTIME('%w', date) == '3' THEN '周三'
     WHEN STRFTIME('%w', date) == '4' THEN '周四'
     WHEN STRFTIME('%w', date) == '5' THEN '周五'
     WHEN STRFTIME('%w', date) == '6' THEN '周六' END AS weekday
FROM (SELECT a.dispatch_id, a.identity, a.taker_id, a.state, a.personal_state, a.operate_state, a.delete_at, b.id,
        b.matter_type, b.title, b.detail, b.priority_level, CASE WHEN b.files != '' THEN b.files ELSE '[]' END AS files,
        IFNULL(b.remind_at, '{}') AS remind_at, IFNULL(b.widget, '{}') AS widget, b.repeat_type, b.end_repeat_at,
        b.creator_id, b.create_at, c.category,
        CASE WHEN c.project_id > 0 THEN c.project_id ELSE 0 END AS project_id,
        CASE WHEN c.flow_step_id > 0 THEN c.flow_step_id ELSE 0 END AS flow_step_id,
        CASE WHEN c.application_id > 0 THEN c.application_id ELSE 0 END AS application_id,
        IFNULL(d.repeat_id, '') AS repeat_id, IFNULL(d.cycle, 0) AS cycle,
        CASE WHEN d.cycle_date IS NOT NULL THEN STRFTIME('%Y-%m-%d', d.cycle_date) ELSE '' END AS cycle_date, 
        IFNULL(d.start_time, b.start_time) AS start_time,
        IFNULL(d.start_time_full_day, b.start_time_full_day) AS start_time_full_day,
        IFNULL(d.end_time, b.end_time) AS end_time,
        IFNULL(d.end_time_full_day, b.end_time_full_day) AS end_time_full_day,
        IFNULL(d.complete_at, b.complete_at) AS complete_at, IFNULL(e.finish_time, a.finish_time) AS finish_time,
        CASE WHEN c.flow_step_id > 0 AND b.start_time = 0 AND b.end_time = 0
                 THEN STRFTIME('%Y-%m-%d', DATETIME(b.create_at, 'unixepoch')) + 86399
             WHEN IFNULL(d.start_time, b.start_time) > 0
                 THEN (CASE WHEN IFNULL(d.start_time_full_day, b.start_time_full_day) = 2
                                THEN IFNULL(d.start_time, b.start_time) + 86399
                            ELSE IFNULL(d.start_time, b.start_time) END)
             WHEN IFNULL(d.end_time, b.end_time) > 0 THEN IFNULL(d.end_time, b.end_time)
             ELSE (CASE WHEN d.cycle_date IS NOT NULL THEN STRFTIME('%s', d.cycle_date) + 86399.5
                        ELSE b.create_at + 1000000000 END) END AS timestamp,
        CASE WHEN d.cycle_date IS NOT NULL THEN STRFTIME('%Y-%m-%d', d.cycle_date)
             WHEN d.start_time > 0 THEN STRFTIME('%Y-%m-%d', DATETIME(d.start_time, 'unixepoch'))
             WHEN b.start_time > 0 THEN STRFTIME('%Y-%m-%d', DATETIME(b.start_time, 'unixepoch'))
             WHEN d.end_time > 0 THEN STRFTIME('%Y-%m-%d', DATETIME(d.end_time, 'unixepoch'))
             WHEN b.end_time > 0 THEN STRFTIME('%Y-%m-%d', DATETIME(b.end_time, 'unixepoch'))
             WHEN c.flow_step_id > 0 THEN (CASE WHEN c.flow_step_id > 0
                                                    THEN STRFTIME('%Y-%m-%d', DATETIME(b.create_at, 'unixepoch'))
                                                ELSE STRFTIME('%Y-%m-%d',
                                                              DATETIME(b.create_at + 1000000000, 'unixepoch')) END)
             ELSE '' END AS date, CAST(SUBSTR(c.parent_id, 0, INSTR(c.parent_id, ',')) AS bigint) AS parent_id,
        CASE WHEN b1.id > 0 THEN b1.title ELSE '' END AS parent_name
   FROM (SELECT ref_task_id, dispatch_id, identity, taker_id, state, personal_state, operate_state, delete_at,
                finish_time
           FROM task_dispatch
          WHERE taker_id = ${B}
            AND is_valid = 1
            AND personal_state IN (0, 10409, 10604, 10611)
            AND operate_state = 0) AS a,
        task AS b
            LEFT JOIN task_config AS c
            ON b.id = c.id
            LEFT JOIN task_repeat AS d
            ON c.id = d.task_id AND b.repeat_type > 0 AND ${v}
            LEFT JOIN task_repeat_finish AS e
            ON d.repeat_id = e.repeat_id AND e.user_id = ${B}
            LEFT JOIN task b1
            ON c.category IN (0, 2) AND SUBSTR(c.parent_id, 0, INSTR(c.parent_id, ',')) = b1.id
  WHERE a.ref_task_id = b.id
    AND b.state = 10201
    AND b.matter_type IN (10701, 10702, 10705)) AS a
    LEFT JOIN (SELECT object_id AS task_id, GROUP_CONCAT(tag_id) AS tag_str,
            '[' || GROUP_CONCAT('{"tag_id":"' || CAST(tag_id AS text) || '","name":"' || name || '","color":"' || color || '"}') || ']' AS tags
                 FROM tag ft
                          JOIN tag_bind ftb
                          ON ft.id = ftb.tag_id
                WHERE ftb.user_id = ${B}
                  AND ftb.state = 1
                GROUP BY object_id) ff2
    ON a.id = ff2.task_id
    LEFT JOIN task_conclusion AS f
    ON a.id = f.task_id AND f.delete_at = 0
    LEFT JOIN message_action AS g
    ON a.id = g.ref_id AND g.user_id = ${B} AND g.delete_at = 0
    LEFT JOIN message AS h
    ON a.id = h.ref_id AND h.id = g.last_message_id
    LEFT JOIN comment AS i
    ON h.comment_id = i.id
    LEFT JOIN task_follow AS j
    ON j.user_id = ${B} AND j.task_id = a.id
    LEFT JOIN (SELECT c.id, IFNULL(fp.project_name, '') AS project_name,
                      IFNULL(fp.creator_id, '') AS project_creator_id,
                      IFNULL(fwb.workspace_id, 0) AS workspace_id, IFNULL(fw.name, '') AS workspace_name,
                      IFNULL(fw.ws_type, 0) AS ws_type,
                      CASE WHEN fwm.member_type = 2 THEN 1 ELSE 0 END AS is_external_member
                 FROM task_config c
                          LEFT JOIN project AS fp
                          ON c.project_id = fp.id
                          LEFT JOIN workspace_bind fwb
                          ON c.application_id = fwb.id
                          LEFT JOIN workspace AS fw
                          ON fwb.workspace_id = fw.id
                          LEFT JOIN workspace_member AS fwm
                          ON fw.id = fwm.workspace_id AND fwm.user_id = ${B} AND fwm.state = 10902) w
    ON a.id = w.id
    LEFT JOIN task_relation AS k
    ON a.id = k.task_id AND k.user_id = ${B}
    LEFT JOIN (SELECT tc.id, IFNULL(tfs.name, '') AS flow_step_name,
                      IFNULL(tfsr.complete_at, 0) AS flow_step_complete_at, IFNULL(tfsr.user_id, '') AS user_id,
                      CASE WHEN r.id > 0 THEN COUNT(*) ELSE 0 END AS step_user_count
                 FROM task_config AS tc
                      LEFT JOIN task_flow_step tfs
                      ON tfs.id = tc.flow_step_id
                      LEFT JOIN task_flow_step_relation AS tfsr
                      ON tfsr.step_id = tfs.id AND tfsr.delete_at = 0 AND tfsr.user_id = ${B}
                      LEFT JOIN task_flow_step_relation AS r
                      ON r.step_id = tfs.id AND r.delete_at = 0
                GROUP BY tc.id, tfs.id) z
    ON a.id = z.id)
${ut || ''} 
${m}
${at} `
var Ue = ((at) => ((at.up = 'up'), (at.down = 'down'), at))(Ue || {}),
  qt = ((at) => (
    (at[(at.normal = 0)] = 'normal'),
    (at[(at.unComplete = 1)] = 'unComplete'),
    (at[(at.complete = 2)] = 'complete'),
    (at[(at.dispatch = 3)] = 'dispatch'),
    (at[(at.accepted = 4)] = 'accepted'),
    (at[(at.cooperation = 5)] = 'cooperation'),
    (at[(at.personal = 6)] = 'personal'),
    (at[(at.in_progress = 7)] = 'in_progress'),
    (at[(at.delay = 8)] = 'delay'),
    at
  ))(qt || {}),
  Xe = ((at) => (
    (at.time = 'time'),
    (at.group = 'group'),
    (at.project = 'project'),
    (at.default = 'default'),
    at
  ))(Xe || {})
const He = (at, ut) => {
    const m = at.includes('-1'),
      B = m ? `${ut} = 0` : `${ut} != 0`,
      v = at.filter((_) => _ !== '-1'),
      h = !!v.length
    let d = ''
    m && h ? (d = 'OR') : h && !m && (d = 'AND')
    const s = v.length ? `${ut} IN (${v.join(',')})` : ''
    return `(${B} ${d} ${s})`
  },
  kn = (at) => {
    const {
        user_id: ut,
        direction: m,
        page_number: B,
        timestamp: v,
        page_record: h,
        show_model: d,
        order_by: s,
        filter: _
      } = at,
      {
        keyword: r,
        parent_id: L,
        query_type: b,
        group_by: T,
        is_follow: l,
        schedule_hide: g,
        conclusion: o,
        tags: p,
        priority_levels: f,
        matter_states: E,
        taker_ids: U,
        application_ids: x,
        creator_ids: O,
        admins_ids: q,
        project_ids: G,
        workspace_ids: Q,
        task_at: z,
        create_at: W,
        update_at: lt,
        finish_time: w,
        complete_at: k
      } = _ || {},
      { order_by_key: i, sort: A } = s || {},
      rt = `LIMIT ${(B - 1) * h}, ${h}`
    let I = d
    const $ = [],
      M = ['repeat_id ASC', 'task_id DESC']
    let H = "d.cycle_date <= STRFTIME('%s', 'now')"
    switch (
      (r && ((I = 1), $.push(`(title LIKE '%${r}%' OR detail LIKE '%${r}%')`)),
      I === 2 && !L && $.push(`parent_id IN (${0})`),
      I === 2 && (H = "(d.cycle_date <= STRFTIME('%s', 'now') OR d.cycle = 1)"),
      L && $.push(`parent_id IN (${L})`),
      l && $.push(`is_follow = ${Number(l === 1)}`),
      g && $.push(`schedule_hide = ${Number(g === 1)}`),
      o &&
        (o === 1
          ? $.push("conclusion != ''")
          : o === 2 && $.push("conclusion = ''")),
      T)
    ) {
      case Xe.project: {
        $.unshift('project_id > 0'),
          M.unshift('project_id DESC, timestamp !=0'),
          i && A && M.push(`${i} ${A}`)
        break
      }
      case Xe.time: {
        if (
          (typeof v == 'number' &&
            $.push(`timestamp ${m === Ue.up ? '<' : '>='} ${v}`),
          m)
        ) {
          let et = 'DESC',
            K = 'ASC'
          i === 'timestamp' && A === 'DESC' && ((et = 'ASC'), (K = 'DESC')),
            m === Ue.up
              ? M.unshift(`timestamp ${et}`)
              : M.unshift(`timestamp !=0, timestamp ${K}`)
        }
        break
      }
      default: {
        i ? M.unshift(`${i} ${A}`) : M.unshift('timestamp DESC')
        break
      }
    }
    if (p?.length) {
      const et = p.includes('-1'),
        K = et ? 'tag_str IS NULL' : 'tag_str IS NOT NULL',
        yt = p.filter((Nt) => Nt !== '-1'),
        Tt = !!yt.length
      let ht = ''
      et && Tt ? (ht = 'OR') : Tt && !et && (ht = 'AND')
      const dt = yt.map((Nt) => `INSTR(tag_str, ${Nt})`).join(' or ')
      $.push(`(${K} ${ht} (${dt}))`)
    }
    if (z?.end_time && z.start_time) {
      const { start_time: et, end_time: K } = z
      $.push(`((start_time BETWEEN ${et} AND ${K}) OR (end_time BETWEEN ${et} AND ${K})) OR
    (start_time > 0 AND start_time < ${et} AND end_time > ${K}) OR
    (flow_step_id > 0 AND create_at BETWEEN ${et} AND ${K}))`)
    }
    if (W?.start_time && W.end_time) {
      const { end_time: et, start_time: K } = W
      $.push(`create_at >= ${K} AND create_at <= ${et}`)
    }
    if (lt?.end_time && lt?.start_time) {
      const { end_time: et, start_time: K } = lt
      $.push(`update_at >= ${K} AND update_at <= ${et}`)
    }
    if (k?.end_time && k?.start_time) {
      const { end_time: et, start_time: K } = k
      $.push(`complete_at >= ${K} AND complete_at <= ${et}`)
    }
    if (w?.end_time && w?.start_time) {
      const { end_time: et, start_time: K } = w
      $.push(`finish_time >= ${K} AND finish_time <= ${et}`)
    }
    switch (
      (O?.length && $.push(`creator_id IN (${O.join(',')})`),
      U?.length &&
        $.push(`exists(
        SELECT 1 FROM task_dispatch t WHERE t.ref_task_id = task_id AND t.taker_id IN (${U.join(
          ','
        )}))`),
      q?.length &&
        $.push(`exists(
          SELECT 1 FROM task_dispatch t WHERE t.ref_task_id = task_id AND is_admin > 0 AND t.taker_id IN (${q.join(
            ','
          )}))`),
      E?.length && $.push(`matter_state IN (${E.join(',')})`),
      f?.length && $.push(`priority_level IN (${f.join(',')})`),
      x?.length && $.push(He(x, 'application_id')),
      Q?.length && $.push(He(Q, 'workspace_id')),
      G && $.push(He(G, 'project_id')),
      b)
    ) {
      case qt.unComplete: {
        $.push('finish_time = 0')
        break
      }
      case qt.complete: {
        $.push('finish_time > 0')
        break
      }
      case qt.dispatch: {
        $.push(`creator_id = ${ut}`)
        break
      }
      case qt.accepted: {
        $.push(`creator_id != ${ut}`)
        break
      }
      case qt.cooperation:
        break
      case qt.personal:
        break
      case qt.in_progress: {
        $.push(
          "finish_time = 0 AND (a.start_time <= strftime('%s','now') OR a.cycle_date <= strftime('%Y-%m-%d','now')) AND (a.end_time = 0 OR a.end_time > strftime('%s','now'))"
        )
        break
      }
      case qt.delay: {
        $.push(
          "finish_time = 0 AND end_time > 0 AND end_time < strftime('%s','now')"
        )
        break
      }
    }
    const D = $.length ? `WHERE ${$.join(' AND ')}` : '',
      F = M.length ? `ORDER BY ${M.join(', ')}` : ''
    return An({
      limit: rt,
      user_id: ut,
      where: D,
      order: F,
      LeftJoinRepeatAnd: H
    })
  },
  In = '/sql-wasm.wasm'
class Dn {
  constructor() {
    ;(this.db = null),
      (this.zipObj = null),
      (this.timeDiff = 0),
      (this.host = 'http://localhost:8888/api'),
      (this.userId = ''),
      (this.recordInfo = null),
      (this.dbId = ''),
      (this.recordKey = ''),
      (this.token = '')
  }
  async initDB(ut) {
    console.log('init db params', ut),
      (this.userId = ut.userId),
      this.db && (this.db.close(), (this.db = null)),
      (this.dbId = `${ut.env}-${ut.userId}`),
      (this.recordKey = `${this.dbId}-record`),
      ut.host !== 'https://api.flyele.vip' && (this.host = ut.host),
      (this.token = ut.token)
    const m = await $e({ locateFile: () => In }),
      B = await (await fetch(`${this.host}/userc/v2/system/now`)).json()
    B.data && (this.timeDiff = Math.floor(Date.now() / 1e3) - B.data)
    const v = await Ar(this.dbId)
    this.recordInfo = await Ar(this.recordKey)
    const h = await this.getUserData(),
      d = h[0]
    if (d && d.type === 1) {
      const s = new m.Database()
      ;(this.db = s), s.run(Nn)
      const { sign_url: _, id: r, attach_info: L } = d
      await this.fetchZip(_),
        (this.recordInfo = { id: r, attach_info: L }),
        await this.initTable()
    } else if (v) this.db = new m.Database(v)
    else {
      await vn(this.recordKey), await this.initDB(ut)
      return
    }
    this.updateDiffData(h.filter(({ type: s }) => s === 2))
  }
  updateDiff(ut) {
    Object.entries(ut)
      .map(([m, B]) => (console.log('key', m, B), `${m}=${B.id}`))
      .join('&')
  }
  updateDiffData(ut) {
    console.log('diff packs', ut)
  }
  async request(ut) {
    return await (
      await fetch(`${this.host}/${ut}`, {
        headers: { Authorization: this.token }
      })
    ).json()
  }
  async getUserData() {
    const ut = this.recordInfo?.id || 0
    return (await this.request(`datapandora/v1/packinfo/get?last_id=${ut}`))
      .data
  }
  formatSelectValue({ columns: ut, values: m }) {
    const B = Object.entries(ut)
    return new Array(m.length).fill('').map((h, d) => {
      const s = {}
      for (const [_, r] of B) {
        const L = m[d][Number(_)]
        Tn.includes(r)
          ? (s[r] = JSON.parse(L))
          : Sn.includes(r)
          ? (s[r] = Boolean(L))
          : (s[r] = /^(id)$|_id$/.test(r) ? (L ? String(L) : '') : L)
      }
      return s
    })
  }
  query(ut) {
    const m = We().startOf('day').unix() - this.timeDiff,
      B = this.db.exec(kn({ ...ut, timestamp: m, user_id: this.userId })),
      v = B[0] ? this.formatSelectValue(B[0]) : []
    for (const h of v) {
      const d = this.db.exec(Un(h.task_id))
      h.takers = d[0] ? this.formatSelectValue(d[0]) : []
    }
    return ut.direction === Ue.up ? v.reverse() : v
  }
  async fetchZip(ut) {
    this.zipObj = await yn.init(ut)
  }
  async parseFile(ut) {
    return JSON.parse(await this.zipObj.file(ut).async('string'))
  }
  async initTable() {
    const ut = await this.parseFile('guide')
    for (const [m, B] of Object.entries(ut)) {
      const { data: v } = B
      for (const h of v) {
        const s = (await this.parseFile(h)).map((r) => {
          const L = {}
          return (
            Object.keys(Ur[m]).forEach((b) => {
              L[b] = r[b] || Ur[m][b]
            }),
            L
          )
        })
        let _ = ''
        s.forEach((r) => {
          _ += this.getInsertSql(r, m) + ';'
        }),
          this.db.run(_)
      }
    }
    this.updateDB()
  }
  updateDB() {
    kr(this.dbId, this.db.export()).then(() => {
      console.log('output -->'), kr(this.recordKey, this.recordInfo)
    })
  }
  getInsertSql(ut, m) {
    return `INSERT INTO ${m} (${Object.keys(ut).join(
      ' ,'
    )}) VALUES (${Object.values(ut)
      .map((v) =>
        typeof v == 'number'
          ? v
          : typeof v == 'string'
          ? `'${v.replace(/'/g, "''")}'`
          : v && typeof v == 'object'
          ? `'${JSON.stringify(v)}'`
          : v || 'null'
      )
      .join(' ,')})`
  }
}
const On = new Dn()
var Ir = ((at) => (
  (at.QUERY_FULL_VIEW_LIST = 'QUERY_FULL_VIEW_LIST'),
  (at.INIT_DB = 'INIT_DB'),
  at
))(Ir || {})
class Fn {
  constructor() {
    self.onmessage = ({ data: ut }) => {
      switch ((console.log('from client', ut, ut.data), ut.key)) {
        case Ir.INIT_DB:
          On.initDB(ut.data).then(() => {
            self.postMessage({ uid: ut.uid })
          })
      }
    }
  }
}
new Fn()
