'use strict'
var de =
  typeof globalThis < 'u'
    ? globalThis
    : typeof window < 'u'
    ? window
    : typeof global < 'u'
    ? global
    : typeof self < 'u'
    ? self
    : {}
function on(ct) {
  if (ct.__esModule) return ct
  var dt = ct.default
  if (typeof dt == 'function') {
    var g = function B() {
      if (this instanceof B) {
        var v = [null]
        v.push.apply(v, arguments)
        var _ = Function.bind.apply(dt, v)
        return new _()
      }
      return dt.apply(this, arguments)
    }
    g.prototype = dt.prototype
  } else g = {}
  return (
    Object.defineProperty(g, '__esModule', { value: !0 }),
    Object.keys(ct).forEach(function (B) {
      var v = Object.getOwnPropertyDescriptor(ct, B)
      Object.defineProperty(
        g,
        B,
        v.get
          ? v
          : {
              enumerable: !0,
              get: function () {
                return ct[B]
              }
            }
      )
    }),
    g
  )
}
var je = {},
  un = {
    get exports() {
      return je
    },
    set exports(ct) {
      je = ct
    }
  }
const ln = {},
  cn = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: ln },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  Le = on(cn)
;(function (ct, dt) {
  var g = void 0,
    B = function (v) {
      return (
        g ||
        ((g = new Promise(function (_, d) {
          var s = typeof v < 'u' ? v : {},
            h = s.onAbort
          ;(s.onAbort = function (t) {
            d(new Error(t)), h && h(t)
          }),
            (s.postRun = s.postRun || []),
            s.postRun.push(function () {
              _(s)
            }),
            (ct = void 0)
          var r
          r || (r = typeof s < 'u' ? s : {}),
            (r.onRuntimeInitialized = function () {
              function t(R, J) {
                switch (typeof J) {
                  case 'boolean':
                    nn(R, J ? 1 : 0)
                    break
                  case 'number':
                    tn(R, J)
                    break
                  case 'string':
                    en(R, J, -1, -1)
                    break
                  case 'object':
                    if (J === null) br(R)
                    else if (J.length != null) {
                      var ot = Me(J)
                      rn(R, ot, J.length, -1), be(ot)
                    } else
                      ve(
                        R,
                        'Wrong API use : tried to return a value of an unknown type (' +
                          J +
                          ').',
                        -1
                      )
                    break
                  default:
                    br(R)
                }
              }
              function e(R, J) {
                for (var ot = [], _t = 0; _t < R; _t += 1) {
                  var gt = Y(J + 4 * _t, 'i32'),
                    Lt = Yr(gt)
                  if (Lt === 1 || Lt === 2) gt = Qr(gt)
                  else if (Lt === 3) gt = Jr(gt)
                  else if (Lt === 4) {
                    ;(Lt = gt), (gt = Kr(Lt)), (Lt = Vr(Lt))
                    for (var Ht = new Uint8Array(gt), Ct = 0; Ct < gt; Ct += 1)
                      Ht[Ct] = k[Lt + Ct]
                    gt = Ht
                  } else gt = null
                  ot.push(gt)
                }
                return ot
              }
              function a(R, J) {
                ;(this.La = R), (this.db = J), (this.Ja = 1), (this.fb = [])
              }
              function c(R, J) {
                if (
                  ((this.db = J),
                  (J = A(R) + 1),
                  (this.Ya = ye(J)),
                  this.Ya === null)
                )
                  throw Error('Unable to allocate memory for the SQL string')
                i(R, et, this.Ya, J),
                  (this.eb = this.Ya),
                  (this.Ua = this.ib = null)
              }
              function b(R) {
                if (
                  ((this.filename =
                    'dbfile_' + ((4294967295 * Math.random()) >>> 0)),
                  R != null)
                ) {
                  var J = this.filename,
                    ot = '/',
                    _t = J
                  if (
                    (ot &&
                      ((ot = typeof ot == 'string' ? ot : ie(ot)),
                      (_t = J ? at(ot + '/' + J) : ot)),
                    (J = ur(!0, !0)),
                    (_t = he(_t, ((J !== void 0 ? J : 438) & 4095) | 32768, 0)),
                    R)
                  ) {
                    if (typeof R == 'string') {
                      ot = Array(R.length)
                      for (var gt = 0, Lt = R.length; gt < Lt; ++gt)
                        ot[gt] = R.charCodeAt(gt)
                      R = ot
                    }
                    pe(_t, J | 146),
                      (ot = ee(_t, 577)),
                      ar(ot, R, 0, R.length, 0),
                      Oe(ot),
                      pe(_t, J)
                  }
                }
                this.handleError(mt(this.filename, j)),
                  (this.db = Y(j, 'i32')),
                  an(this.db),
                  (this.Za = {}),
                  (this.Na = {})
              }
              var j = Zt(4),
                $ = r.cwrap,
                mt = $('sqlite3_open', 'number', ['string', 'number']),
                wt = $('sqlite3_close_v2', 'number', ['number']),
                yt = $('sqlite3_exec', 'number', [
                  'number',
                  'string',
                  'number',
                  'number',
                  'number'
                ]),
                kt = $('sqlite3_changes', 'number', ['number']),
                qt = $('sqlite3_prepare_v2', 'number', [
                  'number',
                  'string',
                  'number',
                  'number',
                  'number'
                ]),
                mr = $('sqlite3_sql', 'string', ['number']),
                Dr = $('sqlite3_normalized_sql', 'string', ['number']),
                Nr = $('sqlite3_prepare_v2', 'number', [
                  'number',
                  'number',
                  'number',
                  'number',
                  'number'
                ]),
                Fr = $('sqlite3_bind_text', 'number', [
                  'number',
                  'number',
                  'number',
                  'number',
                  'number'
                ]),
                gr = $('sqlite3_bind_blob', 'number', [
                  'number',
                  'number',
                  'number',
                  'number',
                  'number'
                ]),
                xr = $('sqlite3_bind_double', 'number', [
                  'number',
                  'number',
                  'number'
                ]),
                Rr = $('sqlite3_bind_int', 'number', [
                  'number',
                  'number',
                  'number'
                ]),
                Cr = $('sqlite3_bind_parameter_index', 'number', [
                  'number',
                  'string'
                ]),
                zr = $('sqlite3_step', 'number', ['number']),
                Br = $('sqlite3_errmsg', 'string', ['number']),
                Mr = $('sqlite3_column_count', 'number', ['number']),
                Gr = $('sqlite3_data_count', 'number', ['number']),
                jr = $('sqlite3_column_double', 'number', ['number', 'number']),
                Er = $('sqlite3_column_text', 'string', ['number', 'number']),
                Pr = $('sqlite3_column_blob', 'number', ['number', 'number']),
                Hr = $('sqlite3_column_bytes', 'number', ['number', 'number']),
                qr = $('sqlite3_column_type', 'number', ['number', 'number']),
                Wr = $('sqlite3_column_name', 'string', ['number', 'number']),
                Xr = $('sqlite3_reset', 'number', ['number']),
                $r = $('sqlite3_clear_bindings', 'number', ['number']),
                Zr = $('sqlite3_finalize', 'number', ['number']),
                yr = $(
                  'sqlite3_create_function_v2',
                  'number',
                  'number string number number number number number number number'.split(
                    ' '
                  )
                ),
                Yr = $('sqlite3_value_type', 'number', ['number']),
                Kr = $('sqlite3_value_bytes', 'number', ['number']),
                Jr = $('sqlite3_value_text', 'string', ['number']),
                Vr = $('sqlite3_value_blob', 'number', ['number']),
                Qr = $('sqlite3_value_double', 'number', ['number']),
                tn = $('sqlite3_result_double', '', ['number', 'number']),
                br = $('sqlite3_result_null', '', ['number']),
                en = $('sqlite3_result_text', '', [
                  'number',
                  'string',
                  'number',
                  'number'
                ]),
                rn = $('sqlite3_result_blob', '', [
                  'number',
                  'number',
                  'number',
                  'number'
                ]),
                nn = $('sqlite3_result_int', '', ['number', 'number']),
                ve = $('sqlite3_result_error', '', [
                  'number',
                  'string',
                  'number'
                ]),
                wr = $('sqlite3_aggregate_context', 'number', [
                  'number',
                  'number'
                ]),
                an = $('RegisterExtensionFunctions', 'number', ['number'])
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
                  var R = zr(this.La)
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
                    R == null && ((R = this.Ja), (this.Ja += 1)), jr(this.La, R)
                  )
                }),
                (a.prototype.Cb = function (R) {
                  if (
                    (R == null && ((R = this.Ja), (this.Ja += 1)),
                    (R = Er(this.La, R)),
                    typeof BigInt != 'function')
                  )
                    throw Error('BigInt is not supported')
                  return BigInt(R)
                }),
                (a.prototype.Db = function (R) {
                  return (
                    R == null && ((R = this.Ja), (this.Ja += 1)), Er(this.La, R)
                  )
                }),
                (a.prototype.getBlob = function (R) {
                  R == null && ((R = this.Ja), (this.Ja += 1))
                  var J = Hr(this.La, R)
                  R = Pr(this.La, R)
                  for (var ot = new Uint8Array(J), _t = 0; _t < J; _t += 1)
                    ot[_t] = k[R + _t]
                  return ot
                }),
                (a.prototype.get = function (R, J) {
                  ;(J = J || {}),
                    R != null && this.bind(R) && this.step(),
                    (R = [])
                  for (var ot = Gr(this.La), _t = 0; _t < ot; _t += 1)
                    switch (qr(this.La, _t)) {
                      case 1:
                        var gt = J.useBigInt ? this.Cb(_t) : this.sb(_t)
                        R.push(gt)
                        break
                      case 2:
                        R.push(this.sb(_t))
                        break
                      case 3:
                        R.push(this.Db(_t))
                        break
                      case 4:
                        R.push(this.getBlob(_t))
                        break
                      default:
                        R.push(null)
                    }
                  return R
                }),
                (a.prototype.getColumnNames = function () {
                  for (var R = [], J = Mr(this.La), ot = 0; ot < J; ot += 1)
                    R.push(Wr(this.La, ot))
                  return R
                }),
                (a.prototype.getAsObject = function (R, J) {
                  ;(R = this.get(R, J)), (J = this.getColumnNames())
                  for (var ot = {}, _t = 0; _t < J.length; _t += 1)
                    ot[J[_t]] = R[_t]
                  return ot
                }),
                (a.prototype.getSQL = function () {
                  return mr(this.La)
                }),
                (a.prototype.getNormalizedSQL = function () {
                  return Dr(this.La)
                }),
                (a.prototype.run = function (R) {
                  return R != null && this.bind(R), this.step(), this.reset()
                }),
                (a.prototype.nb = function (R, J) {
                  J == null && ((J = this.Ja), (this.Ja += 1)), (R = Ot(R))
                  var ot = Me(R)
                  this.fb.push(ot),
                    this.db.handleError(Fr(this.La, J, ot, R.length - 1, 0))
                }),
                (a.prototype.wb = function (R, J) {
                  J == null && ((J = this.Ja), (this.Ja += 1))
                  var ot = Me(R)
                  this.fb.push(ot),
                    this.db.handleError(gr(this.La, J, ot, R.length, 0))
                }),
                (a.prototype.mb = function (R, J) {
                  J == null && ((J = this.Ja), (this.Ja += 1)),
                    this.db.handleError(
                      (R === (R | 0) ? Rr : xr)(this.La, J, R)
                    )
                }),
                (a.prototype.zb = function (R) {
                  R == null && ((R = this.Ja), (this.Ja += 1)),
                    gr(this.La, R, 0, 0, 0)
                }),
                (a.prototype.ob = function (R, J) {
                  switch (
                    (J == null && ((J = this.Ja), (this.Ja += 1)), typeof R)
                  ) {
                    case 'string':
                      this.nb(R, J)
                      return
                    case 'number':
                      this.mb(R, J)
                      return
                    case 'bigint':
                      this.nb(R.toString(), J)
                      return
                    case 'boolean':
                      this.mb(R + 0, J)
                      return
                    case 'object':
                      if (R === null) {
                        this.zb(J)
                        return
                      }
                      if (R.length != null) {
                        this.wb(R, J)
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
                  var J = this
                  return (
                    Object.keys(R).forEach(function (ot) {
                      var _t = Cr(J.La, ot)
                      _t !== 0 && J.ob(R[ot], _t)
                    }),
                    !0
                  )
                }),
                (a.prototype.xb = function (R) {
                  for (var J = 0; J < R.length; J += 1) this.ob(R[J], J + 1)
                  return !0
                }),
                (a.prototype.reset = function () {
                  return this.freemem(), $r(this.La) === 0 && Xr(this.La) === 0
                }),
                (a.prototype.freemem = function () {
                  for (var R; (R = this.fb.pop()) !== void 0; ) be(R)
                }),
                (a.prototype.free = function () {
                  this.freemem()
                  var R = Zr(this.La) === 0
                  return delete this.db.Za[this.La], (this.La = 0), R
                }),
                (c.prototype.next = function () {
                  if (this.Ya === null) return { done: !0 }
                  if (
                    (this.Ua !== null && (this.Ua.free(), (this.Ua = null)),
                    !this.db.db)
                  )
                    throw (this.gb(), Error('Database closed'))
                  var R = le(),
                    J = Zt(4)
                  C(j), C(J)
                  try {
                    this.db.handleError(Nr(this.db.db, this.eb, -1, j, J)),
                      (this.eb = Y(J, 'i32'))
                    var ot = Y(j, 'i32')
                    return ot === 0
                      ? (this.gb(), { done: !0 })
                      : ((this.Ua = new a(ot, this.db)),
                        (this.db.Za[ot] = this.Ua),
                        { value: this.Ua, done: !1 })
                  } catch (_t) {
                    throw ((this.ib = I(this.eb)), this.gb(), _t)
                  } finally {
                    ce(R)
                  }
                }),
                (c.prototype.gb = function () {
                  be(this.Ya), (this.Ya = null)
                }),
                (c.prototype.getRemainingSQL = function () {
                  return this.ib !== null ? this.ib : I(this.eb)
                }),
                typeof Symbol == 'function' &&
                  typeof Symbol.iterator == 'symbol' &&
                  (c.prototype[Symbol.iterator] = function () {
                    return this
                  }),
                (b.prototype.run = function (R, J) {
                  if (!this.db) throw 'Database closed'
                  if (J) {
                    R = this.prepare(R, J)
                    try {
                      R.step()
                    } finally {
                      R.free()
                    }
                  } else this.handleError(yt(this.db, R, 0, 0, j))
                  return this
                }),
                (b.prototype.exec = function (R, J, ot) {
                  if (!this.db) throw 'Database closed'
                  var _t = le(),
                    gt = null
                  try {
                    var Lt = A(R) + 1,
                      Ht = Zt(Lt)
                    i(R, k, Ht, Lt)
                    var Ct = Ht,
                      zt = Zt(4)
                    for (R = []; Y(Ct, 'i8') !== 0; ) {
                      C(j), C(zt), this.handleError(Nr(this.db, Ct, -1, j, zt))
                      var Bt = Y(j, 'i32')
                      if (((Ct = Y(zt, 'i32')), Bt !== 0)) {
                        for (
                          Lt = null,
                            gt = new a(Bt, this),
                            J != null && gt.bind(J);
                          gt.step();

                        )
                          Lt === null &&
                            ((Lt = {
                              columns: gt.getColumnNames(),
                              values: []
                            }),
                            R.push(Lt)),
                            Lt.values.push(gt.get(null, ot))
                        gt.free()
                      }
                    }
                    return R
                  } catch (fe) {
                    throw (gt && gt.free(), fe)
                  } finally {
                    ce(_t)
                  }
                }),
                (b.prototype.each = function (R, J, ot, _t, gt) {
                  typeof J == 'function' && ((_t = ot), (ot = J), (J = void 0)),
                    (R = this.prepare(R, J))
                  try {
                    for (; R.step(); ) ot(R.getAsObject(null, gt))
                  } finally {
                    R.free()
                  }
                  if (typeof _t == 'function') return _t()
                }),
                (b.prototype.prepare = function (R, J) {
                  if (
                    (C(j),
                    this.handleError(qt(this.db, R, -1, j, 0)),
                    (R = Y(j, 'i32')),
                    R === 0)
                  )
                    throw 'Nothing to prepare'
                  var ot = new a(R, this)
                  return J != null && ot.bind(J), (this.Za[R] = ot)
                }),
                (b.prototype.iterateStatements = function (R) {
                  return new c(R, this)
                }),
                (b.prototype.export = function () {
                  Object.values(this.Za).forEach(function (J) {
                    J.free()
                  }),
                    Object.values(this.Na).forEach(ue),
                    (this.Na = {}),
                    this.handleError(wt(this.db))
                  var R = Ar(this.filename)
                  return (
                    this.handleError(mt(this.filename, j)),
                    (this.db = Y(j, 'i32')),
                    R
                  )
                }),
                (b.prototype.close = function () {
                  this.db !== null &&
                    (Object.values(this.Za).forEach(function (R) {
                      R.free()
                    }),
                    Object.values(this.Na).forEach(ue),
                    (this.Na = {}),
                    this.handleError(wt(this.db)),
                    Qe('/' + this.filename),
                    (this.db = null))
                }),
                (b.prototype.handleError = function (R) {
                  if (R === 0) return null
                  throw ((R = Br(this.db)), Error(R))
                }),
                (b.prototype.getRowsModified = function () {
                  return kt(this.db)
                }),
                (b.prototype.create_function = function (R, J) {
                  Object.prototype.hasOwnProperty.call(this.Na, R) &&
                    (ue(this.Na[R]), delete this.Na[R])
                  var ot = Be(function (_t, gt, Lt) {
                    gt = e(gt, Lt)
                    try {
                      var Ht = J.apply(null, gt)
                    } catch (Ct) {
                      ve(_t, Ct, -1)
                      return
                    }
                    t(_t, Ht)
                  }, 'viii')
                  return (
                    (this.Na[R] = ot),
                    this.handleError(
                      yr(this.db, R, J.length, 1, 0, ot, 0, 0, 0)
                    ),
                    this
                  )
                }),
                (b.prototype.create_aggregate = function (R, J) {
                  var ot =
                      J.init ||
                      function () {
                        return null
                      },
                    _t =
                      J.finalize ||
                      function (zt) {
                        return zt
                      },
                    gt = J.step
                  if (!gt)
                    throw (
                      'An aggregate function must have a step function in ' + R
                    )
                  var Lt = {}
                  Object.hasOwnProperty.call(this.Na, R) &&
                    (ue(this.Na[R]), delete this.Na[R]),
                    (J = R + '__finalize'),
                    Object.hasOwnProperty.call(this.Na, J) &&
                      (ue(this.Na[J]), delete this.Na[J])
                  var Ht = Be(function (zt, Bt, fe) {
                      var Vt = wr(zt, 1)
                      Object.hasOwnProperty.call(Lt, Vt) || (Lt[Vt] = ot()),
                        (Bt = e(Bt, fe)),
                        (Bt = [Lt[Vt]].concat(Bt))
                      try {
                        Lt[Vt] = gt.apply(null, Bt)
                      } catch (sn) {
                        delete Lt[Vt], ve(zt, sn, -1)
                      }
                    }, 'viii'),
                    Ct = Be(function (zt) {
                      var Bt = wr(zt, 1)
                      try {
                        var fe = _t(Lt[Bt])
                      } catch (Vt) {
                        delete Lt[Bt], ve(zt, Vt, -1)
                        return
                      }
                      t(zt, fe), delete Lt[Bt]
                    }, 'vi')
                  return (
                    (this.Na[R] = Ht),
                    (this.Na[J] = Ct),
                    this.handleError(
                      yr(this.db, R, gt.length - 1, 1, 0, 0, Ht, Ct, 0)
                    ),
                    this
                  )
                }),
                (r.Database = b)
            })
          var T = Object.assign({}, r),
            y = './this.program',
            L = typeof window == 'object',
            l = typeof importScripts == 'function',
            N =
              typeof process == 'object' &&
              typeof process.versions == 'object' &&
              typeof process.versions.node == 'string',
            o = '',
            p,
            f,
            E,
            U,
            x,
            F
          N
            ? ((o = l ? Le.dirname(o) + '/' : __dirname + '/'),
              (F = () => {
                x || ((U = Le), (x = Le))
              }),
              (p = function (t, e) {
                return (
                  F(),
                  (t = x.normalize(t)),
                  U.readFileSync(t, e ? void 0 : 'utf8')
                )
              }),
              (E = (t) => (
                (t = p(t, !0)), t.buffer || (t = new Uint8Array(t)), t
              )),
              (f = (t, e, a) => {
                F(),
                  (t = x.normalize(t)),
                  U.readFile(t, function (c, b) {
                    c ? a(c) : e(b.buffer)
                  })
              }),
              1 < process.argv.length &&
                (y = process.argv[1].replace(/\\/g, '/')),
              process.argv.slice(2),
              (ct.exports = r),
              (r.inspect = function () {
                return '[Emscripten Module object]'
              }))
            : (L || l) &&
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
          var W = r.print || console.log.bind(console),
            P = r.printErr || console.warn.bind(console)
          Object.assign(r, T), (T = null), r.thisProgram && (y = r.thisProgram)
          var V
          r.wasmBinary && (V = r.wasmBinary),
            r.noExitRuntime,
            typeof WebAssembly != 'object' &&
              At('no native wasm support detected')
          var z,
            Z = !1,
            ut = typeof TextDecoder < 'u' ? new TextDecoder('utf8') : void 0
          function w(t, e, a) {
            var c = e + a
            for (a = e; t[a] && !(a >= c); ) ++a
            if (16 < a - e && t.buffer && ut) return ut.decode(t.subarray(e, a))
            for (c = ''; e < a; ) {
              var b = t[e++]
              if (b & 128) {
                var j = t[e++] & 63
                if ((b & 224) == 192)
                  c += String.fromCharCode(((b & 31) << 6) | j)
                else {
                  var $ = t[e++] & 63
                  ;(b =
                    (b & 240) == 224
                      ? ((b & 15) << 12) | (j << 6) | $
                      : ((b & 7) << 18) | (j << 12) | ($ << 6) | (t[e++] & 63)),
                    65536 > b
                      ? (c += String.fromCharCode(b))
                      : ((b -= 65536),
                        (c += String.fromCharCode(
                          55296 | (b >> 10),
                          56320 | (b & 1023)
                        )))
                }
              } else c += String.fromCharCode(b)
            }
            return c
          }
          function I(t, e) {
            return t ? w(et, t, e) : ''
          }
          function i(t, e, a, c) {
            if (!(0 < c)) return 0
            var b = a
            c = a + c - 1
            for (var j = 0; j < t.length; ++j) {
              var $ = t.charCodeAt(j)
              if (55296 <= $ && 57343 >= $) {
                var mt = t.charCodeAt(++j)
                $ = (65536 + (($ & 1023) << 10)) | (mt & 1023)
              }
              if (127 >= $) {
                if (a >= c) break
                e[a++] = $
              } else {
                if (2047 >= $) {
                  if (a + 1 >= c) break
                  e[a++] = 192 | ($ >> 6)
                } else {
                  if (65535 >= $) {
                    if (a + 2 >= c) break
                    e[a++] = 224 | ($ >> 12)
                  } else {
                    if (a + 3 >= c) break
                    ;(e[a++] = 240 | ($ >> 18)),
                      (e[a++] = 128 | (($ >> 12) & 63))
                  }
                  e[a++] = 128 | (($ >> 6) & 63)
                }
                e[a++] = 128 | ($ & 63)
              }
            }
            return (e[a] = 0), a - b
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
          var tt, k, et, M, H, O, D, st
          function it() {
            var t = z.buffer
            ;(tt = t),
              (r.HEAP8 = k = new Int8Array(t)),
              (r.HEAP16 = M = new Int16Array(t)),
              (r.HEAP32 = H = new Int32Array(t)),
              (r.HEAPU8 = et = new Uint8Array(t)),
              (r.HEAPU16 = new Uint16Array(t)),
              (r.HEAPU32 = O = new Uint32Array(t)),
              (r.HEAPF32 = D = new Float32Array(t)),
              (r.HEAPF64 = st = new Float64Array(t))
          }
          var Q,
            vt = [],
            St = [],
            pt = []
          function ft() {
            var t = r.preRun.shift()
            vt.unshift(t)
          }
          var Et = 0,
            bt = null
          function At(t) {
            throw (
              (r.onAbort && r.onAbort(t),
              (t = 'Aborted(' + t + ')'),
              P(t),
              (Z = !0),
              new WebAssembly.RuntimeError(
                t + '. Build with -sASSERTIONS for more info.'
              ))
            )
          }
          function Dt() {
            return n.startsWith('data:application/octet-stream;base64,')
          }
          var n
          if (((n = 'sql-wasm.wasm'), !Dt())) {
            var X = n
            n = r.locateFile ? r.locateFile(X, o) : o + X
          }
          function G() {
            var t = n
            try {
              if (t == n && V) return new Uint8Array(V)
              if (E) return E(t)
              throw 'both async and sync fetching of the wasm failed'
            } catch (e) {
              At(e)
            }
          }
          function m() {
            if (!V && (L || l)) {
              if (typeof fetch == 'function' && !n.startsWith('file://'))
                return fetch(n, { credentials: 'same-origin' })
                  .then(function (t) {
                    if (!t.ok)
                      throw "failed to load wasm binary file at '" + n + "'"
                    return t.arrayBuffer()
                  })
                  .catch(function () {
                    return G()
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
              return G()
            })
          }
          var u, S
          function K(t) {
            for (; 0 < t.length; ) t.shift()(r)
          }
          function Y(t, e = 'i8') {
            switch ((e.endsWith('*') && (e = '*'), e)) {
              case 'i1':
                return k[t >> 0]
              case 'i8':
                return k[t >> 0]
              case 'i16':
                return M[t >> 1]
              case 'i32':
                return H[t >> 2]
              case 'i64':
                return H[t >> 2]
              case 'float':
                return D[t >> 2]
              case 'double':
                return st[t >> 3]
              case '*':
                return O[t >> 2]
              default:
                At('invalid type for getValue: ' + e)
            }
            return null
          }
          function C(t) {
            var e = 'i32'
            switch ((e.endsWith('*') && (e = '*'), e)) {
              case 'i1':
                k[t >> 0] = 0
                break
              case 'i8':
                k[t >> 0] = 0
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
                D[t >> 2] = 0
                break
              case 'double':
                st[t >> 3] = 0
                break
              case '*':
                O[t >> 2] = 0
                break
              default:
                At('invalid type for setValue: ' + e)
            }
          }
          var rt = (t, e) => {
              for (var a = 0, c = t.length - 1; 0 <= c; c--) {
                var b = t[c]
                b === '.'
                  ? t.splice(c, 1)
                  : b === '..'
                  ? (t.splice(c, 1), a++)
                  : a && (t.splice(c, 1), a--)
              }
              if (e) for (; a; a--) t.unshift('..')
              return t
            },
            at = (t) => {
              var e = t.charAt(0) === '/',
                a = t.substr(-1) === '/'
              return (
                (t = rt(
                  t.split('/').filter((c) => !!c),
                  !e
                ).join('/')) ||
                  e ||
                  (t = '.'),
                t && a && (t += '/'),
                (e ? '/' : '') + t
              )
            },
            nt = (t) => {
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
            lt = (t) => {
              if (t === '/') return '/'
              ;(t = at(t)), (t = t.replace(/\/$/, ''))
              var e = t.lastIndexOf('/')
              return e === -1 ? t : t.substr(e + 1)
            }
          function Tt() {
            if (
              typeof crypto == 'object' &&
              typeof crypto.getRandomValues == 'function'
            ) {
              var t = new Uint8Array(1)
              return () => (crypto.getRandomValues(t), t[0])
            }
            if (N)
              try {
                var e = Le
                return () => e.randomBytes(1)[0]
              } catch {}
            return () => At('randomDevice')
          }
          function Nt() {
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
              (t = rt(
                t.split('/').filter((c) => !!c),
                !e
              ).join('/')),
              (e ? '/' : '') + t || '.'
            )
          }
          function Ot(t, e) {
            var a = Array(A(t) + 1)
            return (t = i(t, a, 0, a.length)), e && (a.length = t), a
          }
          var Wt = []
          function xt(t, e) {
            ;(Wt[t] = { input: [], output: [], Xa: e }), Ie(t, Yt)
          }
          var Yt = {
              open: function (t) {
                var e = Wt[t.node.rdev]
                if (!e) throw new q(43)
                ;(t.tty = e), (t.seekable = !1)
              },
              close: function (t) {
                t.tty.Xa.fsync(t.tty)
              },
              fsync: function (t) {
                t.tty.Xa.fsync(t.tty)
              },
              read: function (t, e, a, c) {
                if (!t.tty || !t.tty.Xa.tb) throw new q(60)
                for (var b = 0, j = 0; j < c; j++) {
                  try {
                    var $ = t.tty.Xa.tb(t.tty)
                  } catch {
                    throw new q(29)
                  }
                  if ($ === void 0 && b === 0) throw new q(6)
                  if ($ == null) break
                  b++, (e[a + j] = $)
                }
                return b && (t.node.timestamp = Date.now()), b
              },
              write: function (t, e, a, c) {
                if (!t.tty || !t.tty.Xa.jb) throw new q(60)
                try {
                  for (var b = 0; b < c; b++) t.tty.Xa.jb(t.tty, e[a + b])
                } catch {
                  throw new q(29)
                }
                return c && (t.node.timestamp = Date.now()), b
              }
            },
            It = {
              tb: function (t) {
                if (!t.input.length) {
                  var e = null
                  if (N) {
                    var a = Buffer.alloc(256),
                      c = 0
                    try {
                      c = U.readSync(process.stdin.fd, a, 0, 256, -1)
                    } catch (b) {
                      if (b.toString().includes('EOF')) c = 0
                      else throw b
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
                  t.input = Ot(e, !0)
                }
                return t.input.shift()
              },
              jb: function (t, e) {
                e === null || e === 10
                  ? (W(w(t.output, 0)), (t.output = []))
                  : e != 0 && t.output.push(e)
              },
              fsync: function (t) {
                t.output &&
                  0 < t.output.length &&
                  (W(w(t.output, 0)), (t.output = []))
              }
            },
            Qt = {
              jb: function (t, e) {
                e === null || e === 10
                  ? (P(w(t.output, 0)), (t.output = []))
                  : e != 0 && t.output.push(e)
              },
              fsync: function (t) {
                t.output &&
                  0 < t.output.length &&
                  (P(w(t.output, 0)), (t.output = []))
              }
            },
            ht = {
              Qa: null,
              Ra: function () {
                return ht.createNode(null, '/', 16895, 0)
              },
              createNode: function (t, e, a, c) {
                if ((a & 61440) === 24576 || (a & 61440) === 4096)
                  throw new q(63)
                return (
                  ht.Qa ||
                    (ht.Qa = {
                      dir: {
                        node: {
                          Pa: ht.Ga.Pa,
                          Oa: ht.Ga.Oa,
                          lookup: ht.Ga.lookup,
                          ab: ht.Ga.ab,
                          rename: ht.Ga.rename,
                          unlink: ht.Ga.unlink,
                          rmdir: ht.Ga.rmdir,
                          readdir: ht.Ga.readdir,
                          symlink: ht.Ga.symlink
                        },
                        stream: { Ta: ht.Ha.Ta }
                      },
                      file: {
                        node: { Pa: ht.Ga.Pa, Oa: ht.Ga.Oa },
                        stream: {
                          Ta: ht.Ha.Ta,
                          read: ht.Ha.read,
                          write: ht.Ha.write,
                          lb: ht.Ha.lb,
                          bb: ht.Ha.bb,
                          cb: ht.Ha.cb
                        }
                      },
                      link: {
                        node: {
                          Pa: ht.Ga.Pa,
                          Oa: ht.Ga.Oa,
                          readlink: ht.Ga.readlink
                        },
                        stream: {}
                      },
                      pb: { node: { Pa: ht.Ga.Pa, Oa: ht.Ga.Oa }, stream: Ur }
                    }),
                  (a = Xe(t, e, a, c)),
                  (a.mode & 61440) === 16384
                    ? ((a.Ga = ht.Qa.dir.node),
                      (a.Ha = ht.Qa.dir.stream),
                      (a.Ia = {}))
                    : (a.mode & 61440) === 32768
                    ? ((a.Ga = ht.Qa.file.node),
                      (a.Ha = ht.Qa.file.stream),
                      (a.Ma = 0),
                      (a.Ia = null))
                    : (a.mode & 61440) === 40960
                    ? ((a.Ga = ht.Qa.link.node), (a.Ha = ht.Qa.link.stream))
                    : (a.mode & 61440) === 8192 &&
                      ((a.Ga = ht.Qa.pb.node), (a.Ha = ht.Qa.pb.stream)),
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
                    e.size !== void 0 && ht.Gb(t, e.size)
                },
                lookup: function () {
                  throw Xt[44]
                },
                ab: function (t, e, a, c) {
                  return ht.createNode(t, e, a, c)
                },
                rename: function (t, e, a) {
                  if ((t.mode & 61440) === 16384) {
                    try {
                      var c = Kt(e, a)
                    } catch {}
                    if (c) for (var b in c.Ia) throw new q(55)
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
                  var a = Kt(t, e),
                    c
                  for (c in a.Ia) throw new q(55)
                  delete t.Ia[e], (t.timestamp = Date.now())
                },
                readdir: function (t) {
                  var e = ['.', '..'],
                    a
                  for (a in t.Ia) t.Ia.hasOwnProperty(a) && e.push(a)
                  return e
                },
                symlink: function (t, e, a) {
                  return (t = ht.createNode(t, e, 41471, 0)), (t.link = a), t
                },
                readlink: function (t) {
                  if ((t.mode & 61440) !== 40960) throw new q(28)
                  return t.link
                }
              },
              Ha: {
                read: function (t, e, a, c, b) {
                  var j = t.node.Ia
                  if (b >= t.node.Ma) return 0
                  if (((t = Math.min(t.node.Ma - b, c)), 8 < t && j.subarray))
                    e.set(j.subarray(b, b + t), a)
                  else for (c = 0; c < t; c++) e[a + c] = j[b + c]
                  return t
                },
                write: function (t, e, a, c, b, j) {
                  if ((e.buffer === k.buffer && (j = !1), !c)) return 0
                  if (
                    ((t = t.node),
                    (t.timestamp = Date.now()),
                    e.subarray && (!t.Ia || t.Ia.subarray))
                  ) {
                    if (j) return (t.Ia = e.subarray(a, a + c)), (t.Ma = c)
                    if (t.Ma === 0 && b === 0)
                      return (t.Ia = e.slice(a, a + c)), (t.Ma = c)
                    if (b + c <= t.Ma)
                      return t.Ia.set(e.subarray(a, a + c), b), c
                  }
                  if ((ht.qb(t, b + c), t.Ia.subarray && e.subarray))
                    t.Ia.set(e.subarray(a, a + c), b)
                  else for (j = 0; j < c; j++) t.Ia[b + j] = e[a + j]
                  return (t.Ma = Math.max(t.Ma, b + c)), c
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
                    throw new q(28)
                  return e
                },
                lb: function (t, e, a) {
                  ht.qb(t.node, e + a), (t.node.Ma = Math.max(t.node.Ma, e + a))
                },
                bb: function (t, e, a, c, b) {
                  if ((t.node.mode & 61440) !== 32768) throw new q(43)
                  if (((t = t.node.Ia), b & 2 || t.buffer !== tt)) {
                    if (
                      ((0 < a || a + e < t.length) &&
                        (t.subarray
                          ? (t = t.subarray(a, a + e))
                          : (t = Array.prototype.slice.call(t, a, a + e))),
                      (a = !0),
                      (e = 65536 * Math.ceil(e / 65536)),
                      (b = _r(65536, e))
                        ? (et.fill(0, b, b + e), (e = b))
                        : (e = 0),
                      !e)
                    )
                      throw new q(48)
                    k.set(t, e)
                  } else (a = !1), (e = t.byteOffset)
                  return { Fb: e, vb: a }
                },
                cb: function (t, e, a, c, b) {
                  if ((t.node.mode & 61440) !== 32768) throw new q(43)
                  return b & 2 || ht.Ha.write(t, e, 0, c, a, !1), 0
                }
              }
            },
            Rt = null,
            re = {},
            Gt = [],
            Ue = 1,
            jt = null,
            ne = !0,
            q = null,
            Xt = {},
            Ft = (t, e = {}) => {
              if (((t = Nt('/', t)), !t)) return { path: '', node: null }
              if (((e = Object.assign({ rb: !0, kb: 0 }, e)), 8 < e.kb))
                throw new q(32)
              t = rt(
                t.split('/').filter(($) => !!$),
                !1
              )
              for (var a = Rt, c = '/', b = 0; b < t.length; b++) {
                var j = b === t.length - 1
                if (j && e.parent) break
                if (
                  ((a = Kt(a, t[b])),
                  (c = at(c + '/' + t[b])),
                  a.Va && (!j || (j && e.rb)) && (a = a.Va.root),
                  !j || e.Sa)
                ) {
                  for (j = 0; (a.mode & 61440) === 40960; )
                    if (
                      ((a = tr(c)),
                      (c = Nt(nt(c), a)),
                      (a = Ft(c, { kb: e.kb + 1 }).node),
                      40 < j++)
                    )
                      throw new q(32)
                }
              }
              return { path: c, node: a }
            },
            ie = (t) => {
              for (var e; ; ) {
                if (t === t.parent)
                  return (
                    (t = t.Ra.ub),
                    e ? (t[t.length - 1] !== '/' ? t + '/' + e : t + e) : t
                  )
                ;(e = e ? t.name + '/' + e : t.name), (t = t.parent)
              }
            },
            Ae = (t, e) => {
              for (var a = 0, c = 0; c < e.length; c++)
                a = ((a << 5) - a + e.charCodeAt(c)) | 0
              return ((t + a) >>> 0) % jt.length
            },
            We = (t) => {
              var e = Ae(t.parent.id, t.name)
              if (jt[e] === t) jt[e] = t.Wa
              else
                for (e = jt[e]; e; ) {
                  if (e.Wa === t) {
                    e.Wa = t.Wa
                    break
                  }
                  e = e.Wa
                }
            },
            Kt = (t, e) => {
              var a
              if ((a = (a = te(t, 'x')) ? a : t.Ga.lookup ? 0 : 2))
                throw new q(a, t)
              for (a = jt[Ae(t.id, e)]; a; a = a.Wa) {
                var c = a.name
                if (a.parent.id === t.id && c === e) return a
              }
              return t.Ga.lookup(t, e)
            },
            Xe = (t, e, a, c) => (
              (t = new dr(t, e, a, c)),
              (e = Ae(t.parent.id, t.name)),
              (t.Wa = jt[e]),
              (jt[e] = t)
            ),
            Tr = { r: 0, 'r+': 2, w: 577, 'w+': 578, a: 1089, 'a+': 1090 },
            $e = (t) => {
              var e = ['r', 'w', 'rw'][t & 3]
              return t & 512 && (e += 'w'), e
            },
            te = (t, e) => {
              if (ne) return 0
              if (!e.includes('r') || t.mode & 292) {
                if (
                  (e.includes('w') && !(t.mode & 146)) ||
                  (e.includes('x') && !(t.mode & 73))
                )
                  return 2
              } else return 2
              return 0
            },
            Ze = (t, e) => {
              try {
                return Kt(t, e), 20
              } catch {}
              return te(t, 'wx')
            },
            Ye = (t, e, a) => {
              try {
                var c = Kt(t, e)
              } catch (b) {
                return b.Ka
              }
              if ((t = te(t, 'wx'))) return t
              if (a) {
                if ((c.mode & 61440) !== 16384) return 54
                if (c === c.parent || ie(c) === '/') return 10
              } else if ((c.mode & 61440) === 16384) return 31
              return 0
            },
            Sr = (t = 0) => {
              for (; 4096 >= t; t++) if (!Gt[t]) return t
              throw new q(33)
            },
            Ke = (t, e) => (
              oe ||
                ((oe = function () {
                  this.$a = {}
                }),
                (oe.prototype = {}),
                Object.defineProperties(oe.prototype, {
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
              (t = Object.assign(new oe(), t)),
              (e = Sr(e)),
              (t.fd = e),
              (Gt[e] = t)
            ),
            Ur = {
              open: (t) => {
                ;(t.Ha = re[t.node.rdev].Ha), t.Ha.open && t.Ha.open(t)
              },
              Ta: () => {
                throw new q(70)
              }
            },
            Ie = (t, e) => {
              re[t] = { Ha: e }
            },
            Je = (t, e) => {
              var a = e === '/',
                c = !e
              if (a && Rt) throw new q(10)
              if (!a && !c) {
                var b = Ft(e, { rb: !1 })
                if (((e = b.path), (b = b.node), b.Va)) throw new q(10)
                if ((b.mode & 61440) !== 16384) throw new q(54)
              }
              ;(e = { type: t, Kb: {}, ub: e, Eb: [] }),
                (t = t.Ra(e)),
                (t.Ra = e),
                (e.root = t),
                a ? (Rt = t) : b && ((b.Va = e), b.Ra && b.Ra.Eb.push(e))
            },
            he = (t, e, a) => {
              var c = Ft(t, { parent: !0 }).node
              if (((t = lt(t)), !t || t === '.' || t === '..')) throw new q(28)
              var b = Ze(c, t)
              if (b) throw new q(b)
              if (!c.Ga.ab) throw new q(63)
              return c.Ga.ab(c, t, e, a)
            },
            Pt = (t, e) => he(t, ((e !== void 0 ? e : 511) & 1023) | 16384, 0),
            _e = (t, e, a) => {
              typeof a > 'u' && ((a = e), (e = 438)), he(t, e | 8192, a)
            },
            ke = (t, e) => {
              if (!Nt(t)) throw new q(44)
              var a = Ft(e, { parent: !0 }).node
              if (!a) throw new q(44)
              e = lt(e)
              var c = Ze(a, e)
              if (c) throw new q(c)
              if (!a.Ga.symlink) throw new q(63)
              a.Ga.symlink(a, e, t)
            },
            Ve = (t) => {
              var e = Ft(t, { parent: !0 }).node
              t = lt(t)
              var a = Kt(e, t),
                c = Ye(e, t, !0)
              if (c) throw new q(c)
              if (!e.Ga.rmdir) throw new q(63)
              if (a.Va) throw new q(10)
              e.Ga.rmdir(e, t), We(a)
            },
            Qe = (t) => {
              var e = Ft(t, { parent: !0 }).node
              if (!e) throw new q(44)
              t = lt(t)
              var a = Kt(e, t),
                c = Ye(e, t, !1)
              if (c) throw new q(c)
              if (!e.Ga.unlink) throw new q(63)
              if (a.Va) throw new q(10)
              e.Ga.unlink(e, t), We(a)
            },
            tr = (t) => {
              if (((t = Ft(t).node), !t)) throw new q(44)
              if (!t.Ga.readlink) throw new q(28)
              return Nt(ie(t.parent), t.Ga.readlink(t))
            },
            ae = (t, e) => {
              if (((t = Ft(t, { Sa: !e }).node), !t)) throw new q(44)
              if (!t.Ga.Pa) throw new q(63)
              return t.Ga.Pa(t)
            },
            er = (t) => ae(t, !0),
            pe = (t, e) => {
              if (
                ((t = typeof t == 'string' ? Ft(t, { Sa: !0 }).node : t),
                !t.Ga.Oa)
              )
                throw new q(63)
              t.Ga.Oa(t, {
                mode: (e & 4095) | (t.mode & -4096),
                timestamp: Date.now()
              })
            },
            rr = (t, e) => {
              if (0 > e) throw new q(28)
              if (
                ((t = typeof t == 'string' ? Ft(t, { Sa: !0 }).node : t),
                !t.Ga.Oa)
              )
                throw new q(63)
              if ((t.mode & 61440) === 16384) throw new q(31)
              if ((t.mode & 61440) !== 32768) throw new q(28)
              var a = te(t, 'w')
              if (a) throw new q(a)
              t.Ga.Oa(t, { size: e, timestamp: Date.now() })
            },
            ee = (t, e, a) => {
              if (t === '') throw new q(44)
              if (typeof e == 'string') {
                var c = Tr[e]
                if (typeof c > 'u') throw Error('Unknown file open mode: ' + e)
                e = c
              }
              if (
                ((a = e & 64 ? ((typeof a > 'u' ? 438 : a) & 4095) | 32768 : 0),
                typeof t == 'object')
              )
                var b = t
              else {
                t = at(t)
                try {
                  b = Ft(t, { Sa: !(e & 131072) }).node
                } catch {}
              }
              if (((c = !1), e & 64))
                if (b) {
                  if (e & 128) throw new q(20)
                } else (b = he(t, a, 0)), (c = !0)
              if (!b) throw new q(44)
              if (
                ((b.mode & 61440) === 8192 && (e &= -513),
                e & 65536 && (b.mode & 61440) !== 16384)
              )
                throw new q(54)
              if (
                !c &&
                (a = b
                  ? (b.mode & 61440) === 40960
                    ? 32
                    : (b.mode & 61440) === 16384 && ($e(e) !== 'r' || e & 512)
                    ? 31
                    : te(b, $e(e))
                  : 44)
              )
                throw new q(a)
              return (
                e & 512 && !c && rr(b, 0),
                (e &= -131713),
                (b = Ke({
                  node: b,
                  path: ie(b),
                  flags: e,
                  seekable: !0,
                  position: 0,
                  Ha: b.Ha,
                  Ib: [],
                  error: !1
                })),
                b.Ha.open && b.Ha.open(b),
                !r.logReadFiles ||
                  e & 1 ||
                  (me || (me = {}), t in me || (me[t] = 1)),
                b
              )
            },
            Oe = (t) => {
              if (t.fd === null) throw new q(8)
              t.hb && (t.hb = null)
              try {
                t.Ha.close && t.Ha.close(t)
              } catch (e) {
                throw e
              } finally {
                Gt[t.fd] = null
              }
              t.fd = null
            },
            nr = (t, e, a) => {
              if (t.fd === null) throw new q(8)
              if (!t.seekable || !t.Ha.Ta) throw new q(70)
              if (a != 0 && a != 1 && a != 2) throw new q(28)
              ;(t.position = t.Ha.Ta(t, e, a)), (t.Ib = [])
            },
            ir = (t, e, a, c, b) => {
              if (0 > c || 0 > b) throw new q(28)
              if (t.fd === null) throw new q(8)
              if ((t.flags & 2097155) === 1) throw new q(8)
              if ((t.node.mode & 61440) === 16384) throw new q(31)
              if (!t.Ha.read) throw new q(28)
              var j = typeof b < 'u'
              if (!j) b = t.position
              else if (!t.seekable) throw new q(70)
              return (e = t.Ha.read(t, e, a, c, b)), j || (t.position += e), e
            },
            ar = (t, e, a, c, b) => {
              if (0 > c || 0 > b) throw new q(28)
              if (t.fd === null) throw new q(8)
              if (!(t.flags & 2097155)) throw new q(8)
              if ((t.node.mode & 61440) === 16384) throw new q(31)
              if (!t.Ha.write) throw new q(28)
              t.seekable && t.flags & 1024 && nr(t, 0, 2)
              var j = typeof b < 'u'
              if (!j) b = t.position
              else if (!t.seekable) throw new q(70)
              return (
                (e = t.Ha.write(t, e, a, c, b, void 0)),
                j || (t.position += e),
                e
              )
            },
            Ar = (t) => {
              var e,
                a = ee(t, a || 0)
              t = ae(t).size
              var c = new Uint8Array(t)
              return ir(a, c, 0, t, 0), (e = c), Oe(a), e
            },
            sr = () => {
              q ||
                ((q = function (t, e) {
                  ;(this.node = e),
                    (this.Hb = function (a) {
                      this.Ka = a
                    }),
                    this.Hb(t),
                    (this.message = 'FS error')
                }),
                (q.prototype = Error()),
                (q.prototype.constructor = q),
                [44].forEach((t) => {
                  ;(Xt[t] = new q(t)),
                    (Xt[t].stack = '<generic error, no stack>')
                }))
            },
            or,
            ur = (t, e) => {
              var a = 0
              return t && (a |= 365), e && (a |= 146), a
            },
            se = (t, e, a) => {
              t = at('/dev/' + t)
              var c = ur(!!e, !!a)
              De || (De = 64)
              var b = (De++ << 8) | 0
              Ie(b, {
                open: (j) => {
                  j.seekable = !1
                },
                close: () => {
                  a && a.buffer && a.buffer.length && a(10)
                },
                read: (j, $, mt, wt) => {
                  for (var yt = 0, kt = 0; kt < wt; kt++) {
                    try {
                      var qt = e()
                    } catch {
                      throw new q(29)
                    }
                    if (qt === void 0 && yt === 0) throw new q(6)
                    if (qt == null) break
                    yt++, ($[mt + kt] = qt)
                  }
                  return yt && (j.node.timestamp = Date.now()), yt
                },
                write: (j, $, mt, wt) => {
                  for (var yt = 0; yt < wt; yt++)
                    try {
                      a($[mt + yt])
                    } catch {
                      throw new q(29)
                    }
                  return wt && (j.node.timestamp = Date.now()), yt
                }
              }),
                _e(t, c, b)
            },
            De,
            Ut = {},
            oe,
            me
          function Jt(t, e, a) {
            if (e.charAt(0) === '/') return e
            if (((t = t === -100 ? '/' : Mt(t).path), e.length == 0)) {
              if (!a) throw new q(44)
              return t
            }
            return at(t + '/' + e)
          }
          function Ne(t, e, a) {
            try {
              var c = t(e)
            } catch (b) {
              if (b && b.node && at(e) !== at(ie(b.node))) return -54
              throw b
            }
            return (
              (H[a >> 2] = c.dev),
              (H[(a + 8) >> 2] = c.ino),
              (H[(a + 12) >> 2] = c.mode),
              (O[(a + 16) >> 2] = c.nlink),
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
              (O[(a + 64) >> 2] = 0),
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
              (O[(a + 80) >> 2] = 0),
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
              (O[(a + 96) >> 2] = 0),
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
          var ge = void 0
          function Ee() {
            return (ge += 4), H[(ge - 4) >> 2]
          }
          function Mt(t) {
            if (((t = Gt[t]), !t)) throw new q(8)
            return t
          }
          function Fe(t) {
            return O[t >> 2] + 4294967296 * H[(t + 4) >> 2]
          }
          function lr(t) {
            var e = A(t) + 1,
              a = ye(e)
            return a && i(t, k, a, e), a
          }
          function Ir(t, e, a) {
            function c(wt) {
              return (wt = wt.toTimeString().match(/\(([A-Za-z ]+)\)$/))
                ? wt[1]
                : 'GMT'
            }
            var b = new Date().getFullYear(),
              j = new Date(b, 0, 1),
              $ = new Date(b, 6, 1)
            b = j.getTimezoneOffset()
            var mt = $.getTimezoneOffset()
            ;(H[t >> 2] = 60 * Math.max(b, mt)),
              (H[e >> 2] = Number(b != mt)),
              (t = c(j)),
              (e = c($)),
              (t = lr(t)),
              (e = lr(e)),
              mt < b
                ? ((O[a >> 2] = t), (O[(a + 4) >> 2] = e))
                : ((O[a >> 2] = e), (O[(a + 4) >> 2] = t))
          }
          function xe(t, e, a) {
            xe.Bb || ((xe.Bb = !0), Ir(t, e, a))
          }
          var cr
          cr = N
            ? () => {
                var t = process.hrtime()
                return 1e3 * t[0] + t[1] / 1e6
              }
            : () => performance.now()
          var Re = {}
          function fr() {
            if (!Ce) {
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
                  _: y || './this.program'
                },
                e
              for (e in Re) Re[e] === void 0 ? delete t[e] : (t[e] = Re[e])
              var a = []
              for (e in t) a.push(e + '=' + t[e])
              Ce = a
            }
            return Ce
          }
          var Ce,
            $t = void 0,
            ze = []
          function Be(t, e) {
            if (!$t) {
              $t = new WeakMap()
              var a = Q.length
              if ($t)
                for (var c = 0; c < 0 + a; c++) {
                  var b = Q.get(c)
                  b && $t.set(b, c)
                }
            }
            if ($t.has(t)) return $t.get(t)
            if (ze.length) a = ze.pop()
            else {
              try {
                Q.grow(1)
              } catch (mt) {
                throw mt instanceof RangeError
                  ? 'Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.'
                  : mt
              }
              a = Q.length - 1
            }
            try {
              Q.set(a, t)
            } catch (mt) {
              if (!(mt instanceof TypeError)) throw mt
              if (typeof WebAssembly.Function == 'function') {
                ;(c = WebAssembly.Function),
                  (b = { i: 'i32', j: 'i64', f: 'f32', d: 'f64', p: 'i32' })
                for (
                  var j = {
                      parameters: [],
                      results: e[0] == 'v' ? [] : [b[e[0]]]
                    },
                    $ = 1;
                  $ < e.length;
                  ++$
                )
                  j.parameters.push(b[e[$]])
                e = new c(j, t)
              } else {
                for (
                  c = [1, 96],
                    b = e.slice(0, 1),
                    e = e.slice(1),
                    j = { i: 127, p: 127, j: 126, f: 125, d: 124 },
                    $ = e.length,
                    128 > $ ? c.push($) : c.push($ % 128 | 128, $ >> 7),
                    $ = 0;
                  $ < e.length;
                  ++$
                )
                  c.push(j[e[$]])
                b == 'v' ? c.push(0) : c.push(1, j[b]),
                  (e = [0, 97, 115, 109, 1, 0, 0, 0, 1]),
                  (b = c.length),
                  128 > b ? e.push(b) : e.push(b % 128 | 128, b >> 7),
                  e.push.apply(e, c),
                  e.push(2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0),
                  (e = new WebAssembly.Module(new Uint8Array(e))),
                  (e = new WebAssembly.Instance(e, { e: { f: t } }).exports.f)
              }
              Q.set(a, e)
            }
            return $t.set(t, a), a
          }
          function ue(t) {
            $t.delete(Q.get(t)), ze.push(t)
          }
          function Me(t) {
            var e = ye(t.length)
            return (
              t.subarray || t.slice || (t = new Uint8Array(t)), et.set(t, e), e
            )
          }
          function kr(t, e, a, c) {
            var b = {
              string: (yt) => {
                var kt = 0
                if (yt != null && yt !== 0) {
                  var qt = (yt.length << 2) + 1
                  ;(kt = Zt(qt)), i(yt, et, kt, qt)
                }
                return kt
              },
              array: (yt) => {
                var kt = Zt(yt.length)
                return k.set(yt, kt), kt
              }
            }
            t = r['_' + t]
            var j = [],
              $ = 0
            if (c)
              for (var mt = 0; mt < c.length; mt++) {
                var wt = b[a[mt]]
                wt
                  ? ($ === 0 && ($ = le()), (j[mt] = wt(c[mt])))
                  : (j[mt] = c[mt])
              }
            return (
              (a = t.apply(null, j)),
              (a = (function (yt) {
                return (
                  $ !== 0 && ce($),
                  e === 'string' ? I(yt) : e === 'boolean' ? !!yt : yt
                )
              })(a))
            )
          }
          function dr(t, e, a, c) {
            t || (t = this),
              (this.parent = t),
              (this.Ra = t.Ra),
              (this.Va = null),
              (this.id = Ue++),
              (this.name = e),
              (this.mode = a),
              (this.Ga = {}),
              (this.Ha = {}),
              (this.rdev = c)
          }
          Object.defineProperties(dr.prototype, {
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
            sr(),
            (jt = Array(4096)),
            Je(ht, '/'),
            Pt('/tmp'),
            Pt('/home'),
            Pt('/home/web_user'),
            (() => {
              Pt('/dev'),
                Ie(259, { read: () => 0, write: (e, a, c, b) => b }),
                _e('/dev/null', 259),
                xt(1280, It),
                xt(1536, Qt),
                _e('/dev/tty', 1280),
                _e('/dev/tty1', 1536)
              var t = Tt()
              se('random', t),
                se('urandom', t),
                Pt('/dev/shm'),
                Pt('/dev/shm/tmp')
            })(),
            (() => {
              Pt('/proc')
              var t = Pt('/proc/self')
              Pt('/proc/self/fd'),
                Je(
                  {
                    Ra: () => {
                      var e = Xe(t, 'fd', 16895, 73)
                      return (
                        (e.Ga = {
                          lookup: (a, c) => {
                            var b = Gt[+c]
                            if (!b) throw new q(8)
                            return (
                              (a = {
                                parent: null,
                                Ra: { ub: 'fake' },
                                Ga: { readlink: () => b.path }
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
          var Or = {
            a: function (t, e, a, c) {
              At(
                'Assertion failed: ' +
                  I(t) +
                  ', at: ' +
                  [
                    e ? I(e) : 'unknown filename',
                    a,
                    c ? I(c) : 'unknown function'
                  ]
              )
            },
            h: function (t, e) {
              try {
                return (t = I(t)), pe(t, e), 0
              } catch (a) {
                if (typeof Ut > 'u' || !(a instanceof q)) throw a
                return -a.Ka
              }
            },
            H: function (t, e, a) {
              try {
                if (((e = I(e)), (e = Jt(t, e)), a & -8)) return -28
                var c = Ft(e, { Sa: !0 }).node
                return c
                  ? ((t = ''),
                    a & 4 && (t += 'r'),
                    a & 2 && (t += 'w'),
                    a & 1 && (t += 'x'),
                    t && te(c, t) ? -2 : 0)
                  : -44
              } catch (b) {
                if (typeof Ut > 'u' || !(b instanceof q)) throw b
                return -b.Ka
              }
            },
            i: function (t, e) {
              try {
                var a = Gt[t]
                if (!a) throw new q(8)
                return pe(a.node, e), 0
              } catch (c) {
                if (typeof Ut > 'u' || !(c instanceof q)) throw c
                return -c.Ka
              }
            },
            g: function (t) {
              try {
                var e = Gt[t]
                if (!e) throw new q(8)
                var a = e.node,
                  c = typeof a == 'string' ? Ft(a, { Sa: !0 }).node : a
                if (!c.Ga.Oa) throw new q(63)
                return c.Ga.Oa(c, { timestamp: Date.now() }), 0
              } catch (b) {
                if (typeof Ut > 'u' || !(b instanceof q)) throw b
                return -b.Ka
              }
            },
            b: function (t, e, a) {
              ge = a
              try {
                var c = Mt(t)
                switch (e) {
                  case 0:
                    var b = Ee()
                    return 0 > b ? -28 : Ke(c, b).fd
                  case 1:
                  case 2:
                    return 0
                  case 3:
                    return c.flags
                  case 4:
                    return (b = Ee()), (c.flags |= b), 0
                  case 5:
                    return (b = Ee()), (M[(b + 0) >> 1] = 2), 0
                  case 6:
                  case 7:
                    return 0
                  case 16:
                  case 8:
                    return -28
                  case 9:
                    return (H[hr() >> 2] = 28), -1
                  default:
                    return -28
                }
              } catch (j) {
                if (typeof Ut > 'u' || !(j instanceof q)) throw j
                return -j.Ka
              }
            },
            G: function (t, e) {
              try {
                var a = Mt(t)
                return Ne(ae, a.path, e)
              } catch (c) {
                if (typeof Ut > 'u' || !(c instanceof q)) throw c
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
                var c = Gt[t]
                if (!c) throw new q(8)
                if (!(c.flags & 2097155)) throw new q(28)
                return rr(c.node, e), 0
              } catch (b) {
                if (typeof Ut > 'u' || !(b instanceof q)) throw b
                return -b.Ka
              }
            },
            B: function (t, e) {
              try {
                if (e === 0) return -28
                var a = A('/') + 1
                return e < a ? -68 : (i('/', et, t, e), a)
              } catch (c) {
                if (typeof Ut > 'u' || !(c instanceof q)) throw c
                return -c.Ka
              }
            },
            E: function (t, e) {
              try {
                return (t = I(t)), Ne(er, t, e)
              } catch (a) {
                if (typeof Ut > 'u' || !(a instanceof q)) throw a
                return -a.Ka
              }
            },
            y: function (t, e, a) {
              try {
                return (
                  (e = I(e)),
                  (e = Jt(t, e)),
                  (e = at(e)),
                  e[e.length - 1] === '/' && (e = e.substr(0, e.length - 1)),
                  Pt(e, a),
                  0
                )
              } catch (c) {
                if (typeof Ut > 'u' || !(c instanceof q)) throw c
                return -c.Ka
              }
            },
            D: function (t, e, a, c) {
              try {
                e = I(e)
                var b = c & 256
                return (e = Jt(t, e, c & 4096)), Ne(b ? er : ae, e, a)
              } catch (j) {
                if (typeof Ut > 'u' || !(j instanceof q)) throw j
                return -j.Ka
              }
            },
            v: function (t, e, a, c) {
              ge = c
              try {
                ;(e = I(e)), (e = Jt(t, e))
                var b = c ? Ee() : 0
                return ee(e, a, b).fd
              } catch (j) {
                if (typeof Ut > 'u' || !(j instanceof q)) throw j
                return -j.Ka
              }
            },
            t: function (t, e, a, c) {
              try {
                if (((e = I(e)), (e = Jt(t, e)), 0 >= c)) return -28
                var b = tr(e),
                  j = Math.min(c, A(b)),
                  $ = k[a + j]
                return i(b, et, a, c + 1), (k[a + j] = $), j
              } catch (mt) {
                if (typeof Ut > 'u' || !(mt instanceof q)) throw mt
                return -mt.Ka
              }
            },
            s: function (t) {
              try {
                return (t = I(t)), Ve(t), 0
              } catch (e) {
                if (typeof Ut > 'u' || !(e instanceof q)) throw e
                return -e.Ka
              }
            },
            F: function (t, e) {
              try {
                return (t = I(t)), Ne(ae, t, e)
              } catch (a) {
                if (typeof Ut > 'u' || !(a instanceof q)) throw a
                return -a.Ka
              }
            },
            p: function (t, e, a) {
              try {
                return (
                  (e = I(e)),
                  (e = Jt(t, e)),
                  a === 0
                    ? Qe(e)
                    : a === 512
                    ? Ve(e)
                    : At('Invalid flags passed to unlinkat'),
                  0
                )
              } catch (c) {
                if (typeof Ut > 'u' || !(c instanceof q)) throw c
                return -c.Ka
              }
            },
            o: function (t, e, a) {
              try {
                if (((e = I(e)), (e = Jt(t, e, !0)), a)) {
                  var c = Fe(a),
                    b = H[(a + 8) >> 2]
                  ;(j = 1e3 * c + b / 1e6),
                    (a += 16),
                    (c = Fe(a)),
                    (b = H[(a + 8) >> 2]),
                    ($ = 1e3 * c + b / 1e6)
                } else
                  var j = Date.now(),
                    $ = j
                t = j
                var mt = Ft(e, { Sa: !0 }).node
                return mt.Ga.Oa(mt, { timestamp: Math.max(t, $) }), 0
              } catch (wt) {
                if (typeof Ut > 'u' || !(wt instanceof q)) throw wt
                return -wt.Ka
              }
            },
            e: function () {
              return Date.now()
            },
            j: function (t, e) {
              ;(t = new Date(1e3 * Fe(t))),
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
            w: function (t, e, a, c, b, j) {
              try {
                var $ = Mt(c)
                if (e & 2 && !(a & 2) && ($.flags & 2097155) !== 2)
                  throw new q(2)
                if (($.flags & 2097155) === 1) throw new q(2)
                if (!$.Ha.bb) throw new q(43)
                var mt = $.Ha.bb($, t, b, e, a),
                  wt = mt.Fb
                return (H[j >> 2] = mt.vb), wt
              } catch (yt) {
                if (typeof Ut > 'u' || !(yt instanceof q)) throw yt
                return -yt.Ka
              }
            },
            x: function (t, e, a, c, b, j) {
              try {
                var $ = Mt(b)
                if (a & 2) {
                  var mt = et.slice(t, t + e)
                  $ && $.Ha.cb && $.Ha.cb($, mt, j, e, c)
                }
              } catch (wt) {
                if (typeof Ut > 'u' || !(wt instanceof q)) throw wt
                return -wt.Ka
              }
            },
            n: xe,
            q: function () {
              return 2147483648
            },
            d: cr,
            c: function (t) {
              var e = et.length
              if (((t >>>= 0), 2147483648 < t)) return !1
              for (var a = 1; 4 >= a; a *= 2) {
                var c = e * (1 + 0.2 / a)
                c = Math.min(c, t + 100663296)
                var b = Math
                ;(c = Math.max(t, c)),
                  (b = b.min.call(
                    b,
                    2147483648,
                    c + ((65536 - (c % 65536)) % 65536)
                  ))
                t: {
                  try {
                    z.grow((b - tt.byteLength + 65535) >>> 16), it()
                    var j = 1
                    break t
                  } catch {}
                  j = void 0
                }
                if (j) return !0
              }
              return !1
            },
            z: function (t, e) {
              var a = 0
              return (
                fr().forEach(function (c, b) {
                  var j = e + a
                  for (b = O[(t + 4 * b) >> 2] = j, j = 0; j < c.length; ++j)
                    k[b++ >> 0] = c.charCodeAt(j)
                  ;(k[b >> 0] = 0), (a += c.length + 1)
                }),
                0
              )
            },
            A: function (t, e) {
              var a = fr()
              O[t >> 2] = a.length
              var c = 0
              return (
                a.forEach(function (b) {
                  c += b.length + 1
                }),
                (O[e >> 2] = c),
                0
              )
            },
            f: function (t) {
              try {
                var e = Mt(t)
                return Oe(e), 0
              } catch (a) {
                if (typeof Ut > 'u' || !(a instanceof q)) throw a
                return a.Ka
              }
            },
            m: function (t, e) {
              try {
                var a = Mt(t)
                return (
                  (k[e >> 0] = a.tty
                    ? 2
                    : (a.mode & 61440) === 16384
                    ? 3
                    : (a.mode & 61440) === 40960
                    ? 7
                    : 4),
                  0
                )
              } catch (c) {
                if (typeof Ut > 'u' || !(c instanceof q)) throw c
                return c.Ka
              }
            },
            u: function (t, e, a, c) {
              try {
                t: {
                  var b = Mt(t)
                  t = e
                  for (var j = (e = 0); j < a; j++) {
                    var $ = O[t >> 2],
                      mt = O[(t + 4) >> 2]
                    t += 8
                    var wt = ir(b, k, $, mt)
                    if (0 > wt) {
                      var yt = -1
                      break t
                    }
                    if (((e += wt), wt < mt)) break
                  }
                  yt = e
                }
                return (O[c >> 2] = yt), 0
              } catch (kt) {
                if (typeof Ut > 'u' || !(kt instanceof q)) throw kt
                return kt.Ka
              }
            },
            k: function (t, e, a, c, b) {
              try {
                if (
                  ((e =
                    (a + 2097152) >>> 0 < 4194305 - !!e
                      ? (e >>> 0) + 4294967296 * a
                      : NaN),
                  isNaN(e))
                )
                  return 61
                var j = Mt(t)
                return (
                  nr(j, e, c),
                  (S = [
                    j.position >>> 0,
                    ((u = j.position),
                    1 <= +Math.abs(u)
                      ? 0 < u
                        ? (Math.min(+Math.floor(u / 4294967296), 4294967295) |
                            0) >>>
                          0
                        : ~~+Math.ceil((u - +(~~u >>> 0)) / 4294967296) >>> 0
                      : 0)
                  ]),
                  (H[b >> 2] = S[0]),
                  (H[(b + 4) >> 2] = S[1]),
                  j.hb && e === 0 && c === 0 && (j.hb = null),
                  0
                )
              } catch ($) {
                if (typeof Ut > 'u' || !($ instanceof q)) throw $
                return $.Ka
              }
            },
            C: function (t) {
              try {
                var e = Mt(t)
                return e.Ha && e.Ha.fsync ? e.Ha.fsync(e) : 0
              } catch (a) {
                if (typeof Ut > 'u' || !(a instanceof q)) throw a
                return a.Ka
              }
            },
            r: function (t, e, a, c) {
              try {
                t: {
                  var b = Mt(t)
                  t = e
                  for (var j = (e = 0); j < a; j++) {
                    var $ = O[t >> 2],
                      mt = O[(t + 4) >> 2]
                    t += 8
                    var wt = ar(b, k, $, mt)
                    if (0 > wt) {
                      var yt = -1
                      break t
                    }
                    e += wt
                  }
                  yt = e
                }
                return (O[c >> 2] = yt), 0
              } catch (kt) {
                if (typeof Ut > 'u' || !(kt instanceof q)) throw kt
                return kt.Ka
              }
            }
          }
          ;(function () {
            function t(b) {
              ;(r.asm = b.exports),
                (z = r.asm.I),
                it(),
                (Q = r.asm.Aa),
                St.unshift(r.asm.J),
                Et--,
                r.monitorRunDependencies && r.monitorRunDependencies(Et),
                Et == 0 && bt && ((b = bt), (bt = null), b())
            }
            function e(b) {
              t(b.instance)
            }
            function a(b) {
              return m()
                .then(function (j) {
                  return WebAssembly.instantiate(j, c)
                })
                .then(function (j) {
                  return j
                })
                .then(b, function (j) {
                  P('failed to asynchronously prepare wasm: ' + j), At(j)
                })
            }
            var c = { a: Or }
            if (
              (Et++,
              r.monitorRunDependencies && r.monitorRunDependencies(Et),
              r.instantiateWasm)
            )
              try {
                return r.instantiateWasm(c, t)
              } catch (b) {
                return (
                  P('Module.instantiateWasm callback failed with error: ' + b),
                  !1
                )
              }
            return (
              (function () {
                return V ||
                  typeof WebAssembly.instantiateStreaming != 'function' ||
                  Dt() ||
                  n.startsWith('file://') ||
                  N ||
                  typeof fetch != 'function'
                  ? a(e)
                  : fetch(n, { credentials: 'same-origin' }).then(function (b) {
                      return WebAssembly.instantiateStreaming(b, c).then(
                        e,
                        function (j) {
                          return (
                            P('wasm streaming compile failed: ' + j),
                            P('falling back to ArrayBuffer instantiation'),
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
          var hr = (r.___errno_location = function () {
            return (hr = r.___errno_location = r.asm.N).apply(null, arguments)
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
            be = (r._free = function () {
              return (be = r._free = r.asm.za).apply(null, arguments)
            })
          r._RegisterExtensionFunctions = function () {
            return (r._RegisterExtensionFunctions = r.asm.Ba).apply(
              null,
              arguments
            )
          }
          var _r = (r._emscripten_builtin_memalign = function () {
              return (_r = r._emscripten_builtin_memalign = r.asm.Ca).apply(
                null,
                arguments
              )
            }),
            le = (r.stackSave = function () {
              return (le = r.stackSave = r.asm.Da).apply(null, arguments)
            }),
            ce = (r.stackRestore = function () {
              return (ce = r.stackRestore = r.asm.Ea).apply(null, arguments)
            }),
            Zt = (r.stackAlloc = function () {
              return (Zt = r.stackAlloc = r.asm.Fa).apply(null, arguments)
            })
          ;(r.UTF8ToString = I),
            (r.stackAlloc = Zt),
            (r.stackSave = le),
            (r.stackRestore = ce),
            (r.cwrap = function (t, e, a, c) {
              a = a || []
              var b = a.every((j) => j === 'number' || j === 'boolean')
              return e !== 'string' && b && !c
                ? r['_' + t]
                : function () {
                    return kr(t, e, a, arguments)
                  }
            })
          var we
          bt = function t() {
            we || pr(), we || (bt = t)
          }
          function pr() {
            function t() {
              if (!we && ((we = !0), (r.calledRun = !0), !Z)) {
                if (
                  (r.noFSInit ||
                    or ||
                    ((or = !0),
                    sr(),
                    (r.stdin = r.stdin),
                    (r.stdout = r.stdout),
                    (r.stderr = r.stderr),
                    r.stdin
                      ? se('stdin', r.stdin)
                      : ke('/dev/tty', '/dev/stdin'),
                    r.stdout
                      ? se('stdout', null, r.stdout)
                      : ke('/dev/tty', '/dev/stdout'),
                    r.stderr
                      ? se('stderr', null, r.stderr)
                      : ke('/dev/tty1', '/dev/stderr'),
                    ee('/dev/stdin', 0),
                    ee('/dev/stdout', 1),
                    ee('/dev/stderr', 1)),
                  (ne = !1),
                  K(St),
                  r.onRuntimeInitialized && r.onRuntimeInitialized(),
                  r.postRun)
                )
                  for (
                    typeof r.postRun == 'function' && (r.postRun = [r.postRun]);
                    r.postRun.length;

                  ) {
                    var e = r.postRun.shift()
                    pt.unshift(e)
                  }
                K(pt)
              }
            }
            if (!(0 < Et)) {
              if (r.preRun)
                for (
                  typeof r.preRun == 'function' && (r.preRun = [r.preRun]);
                  r.preRun.length;

                )
                  ft()
              K(vt),
                0 < Et ||
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
          return pr(), s
        })),
        g)
      )
    }
  ;(ct.exports = B), (ct.exports.default = B)
})(un)
const fn = `DROP TABLE IF EXISTS comment;
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
        cancel_from tinyint UNSIGNED DEFAULT 0 NOT NULL
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
function Te(ct) {
  throw new Error(
    'Could not dynamically require "' +
      ct +
      '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.'
  )
}
var Pe = {},
  dn = {
    get exports() {
      return Pe
    },
    set exports(ct) {
      Pe = ct
    }
  }
/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/ ;(function (ct, dt) {
  ;(function (g) {
    ct.exports = g()
  })(function () {
    return (function g(B, v, _) {
      function d(r, T) {
        if (!v[r]) {
          if (!B[r]) {
            var y = typeof Te == 'function' && Te
            if (!T && y) return y(r, !0)
            if (s) return s(r, !0)
            var L = new Error("Cannot find module '" + r + "'")
            throw ((L.code = 'MODULE_NOT_FOUND'), L)
          }
          var l = (v[r] = { exports: {} })
          B[r][0].call(
            l.exports,
            function (N) {
              var o = B[r][1][N]
              return d(o || N)
            },
            l,
            l.exports,
            g,
            B,
            v,
            _
          )
        }
        return v[r].exports
      }
      for (var s = typeof Te == 'function' && Te, h = 0; h < _.length; h++)
        d(_[h])
      return d
    })(
      {
        1: [
          function (g, B, v) {
            var _ = g('./utils'),
              d = g('./support'),
              s =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
            ;(v.encode = function (h) {
              for (
                var r,
                  T,
                  y,
                  L,
                  l,
                  N,
                  o,
                  p = [],
                  f = 0,
                  E = h.length,
                  U = E,
                  x = _.getTypeOf(h) !== 'string';
                f < h.length;

              )
                (U = E - f),
                  (y = x
                    ? ((r = h[f++]),
                      (T = f < E ? h[f++] : 0),
                      f < E ? h[f++] : 0)
                    : ((r = h.charCodeAt(f++)),
                      (T = f < E ? h.charCodeAt(f++) : 0),
                      f < E ? h.charCodeAt(f++) : 0)),
                  (L = r >> 2),
                  (l = ((3 & r) << 4) | (T >> 4)),
                  (N = 1 < U ? ((15 & T) << 2) | (y >> 6) : 64),
                  (o = 2 < U ? 63 & y : 64),
                  p.push(s.charAt(L) + s.charAt(l) + s.charAt(N) + s.charAt(o))
              return p.join('')
            }),
              (v.decode = function (h) {
                var r,
                  T,
                  y,
                  L,
                  l,
                  N,
                  o = 0,
                  p = 0,
                  f = 'data:'
                if (h.substr(0, f.length) === f)
                  throw new Error(
                    'Invalid base64 input, it looks like a data url.'
                  )
                var E,
                  U = (3 * (h = h.replace(/[^A-Za-z0-9+/=]/g, '')).length) / 4
                if (
                  (h.charAt(h.length - 1) === s.charAt(64) && U--,
                  h.charAt(h.length - 2) === s.charAt(64) && U--,
                  U % 1 != 0)
                )
                  throw new Error('Invalid base64 input, bad content length.')
                for (
                  E = d.uint8array ? new Uint8Array(0 | U) : new Array(0 | U);
                  o < h.length;

                )
                  (r =
                    (s.indexOf(h.charAt(o++)) << 2) |
                    ((L = s.indexOf(h.charAt(o++))) >> 4)),
                    (T =
                      ((15 & L) << 4) | ((l = s.indexOf(h.charAt(o++))) >> 2)),
                    (y = ((3 & l) << 6) | (N = s.indexOf(h.charAt(o++)))),
                    (E[p++] = r),
                    l !== 64 && (E[p++] = T),
                    N !== 64 && (E[p++] = y)
                return E
              })
          },
          { './support': 30, './utils': 32 }
        ],
        2: [
          function (g, B, v) {
            var _ = g('./external'),
              d = g('./stream/DataWorker'),
              s = g('./stream/Crc32Probe'),
              h = g('./stream/DataLengthProbe')
            function r(T, y, L, l, N) {
              ;(this.compressedSize = T),
                (this.uncompressedSize = y),
                (this.crc32 = L),
                (this.compression = l),
                (this.compressedContent = N)
            }
            ;(r.prototype = {
              getContentWorker: function () {
                var T = new d(_.Promise.resolve(this.compressedContent))
                    .pipe(this.compression.uncompressWorker())
                    .pipe(new h('data_length')),
                  y = this
                return (
                  T.on('end', function () {
                    if (this.streamInfo.data_length !== y.uncompressedSize)
                      throw new Error('Bug : uncompressed data size mismatch')
                  }),
                  T
                )
              },
              getCompressedWorker: function () {
                return new d(_.Promise.resolve(this.compressedContent))
                  .withStreamInfo('compressedSize', this.compressedSize)
                  .withStreamInfo('uncompressedSize', this.uncompressedSize)
                  .withStreamInfo('crc32', this.crc32)
                  .withStreamInfo('compression', this.compression)
              }
            }),
              (r.createWorkerFrom = function (T, y, L) {
                return T.pipe(new s())
                  .pipe(new h('uncompressedSize'))
                  .pipe(y.compressWorker(L))
                  .pipe(new h('compressedSize'))
                  .withStreamInfo('compression', y)
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
          function (g, B, v) {
            var _ = g('./stream/GenericWorker')
            ;(v.STORE = {
              magic: '\0\0',
              compressWorker: function () {
                return new _('STORE compression')
              },
              uncompressWorker: function () {
                return new _('STORE decompression')
              }
            }),
              (v.DEFLATE = g('./flate'))
          },
          { './flate': 7, './stream/GenericWorker': 28 }
        ],
        4: [
          function (g, B, v) {
            var _ = g('./utils'),
              d = (function () {
                for (var s, h = [], r = 0; r < 256; r++) {
                  s = r
                  for (var T = 0; T < 8; T++)
                    s = 1 & s ? 3988292384 ^ (s >>> 1) : s >>> 1
                  h[r] = s
                }
                return h
              })()
            B.exports = function (s, h) {
              return s !== void 0 && s.length
                ? _.getTypeOf(s) !== 'string'
                  ? (function (r, T, y, L) {
                      var l = d,
                        N = L + y
                      r ^= -1
                      for (var o = L; o < N; o++)
                        r = (r >>> 8) ^ l[255 & (r ^ T[o])]
                      return -1 ^ r
                    })(0 | h, s, s.length, 0)
                  : (function (r, T, y, L) {
                      var l = d,
                        N = L + y
                      r ^= -1
                      for (var o = L; o < N; o++)
                        r = (r >>> 8) ^ l[255 & (r ^ T.charCodeAt(o))]
                      return -1 ^ r
                    })(0 | h, s, s.length, 0)
                : 0
            }
          },
          { './utils': 32 }
        ],
        5: [
          function (g, B, v) {
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
          function (g, B, v) {
            var _ = null
            ;(_ = typeof Promise < 'u' ? Promise : g('lie')),
              (B.exports = { Promise: _ })
          },
          { lie: 37 }
        ],
        7: [
          function (g, B, v) {
            var _ =
                typeof Uint8Array < 'u' &&
                typeof Uint16Array < 'u' &&
                typeof Uint32Array < 'u',
              d = g('pako'),
              s = g('./utils'),
              h = g('./stream/GenericWorker'),
              r = _ ? 'uint8array' : 'array'
            function T(y, L) {
              h.call(this, 'FlateWorker/' + y),
                (this._pako = null),
                (this._pakoAction = y),
                (this._pakoOptions = L),
                (this.meta = {})
            }
            ;(v.magic = '\b\0'),
              s.inherits(T, h),
              (T.prototype.processChunk = function (y) {
                ;(this.meta = y.meta),
                  this._pako === null && this._createPako(),
                  this._pako.push(s.transformTo(r, y.data), !1)
              }),
              (T.prototype.flush = function () {
                h.prototype.flush.call(this),
                  this._pako === null && this._createPako(),
                  this._pako.push([], !0)
              }),
              (T.prototype.cleanUp = function () {
                h.prototype.cleanUp.call(this), (this._pako = null)
              }),
              (T.prototype._createPako = function () {
                this._pako = new d[this._pakoAction]({
                  raw: !0,
                  level: this._pakoOptions.level || -1
                })
                var y = this
                this._pako.onData = function (L) {
                  y.push({ data: L, meta: y.meta })
                }
              }),
              (v.compressWorker = function (y) {
                return new T('Deflate', y)
              }),
              (v.uncompressWorker = function () {
                return new T('Inflate', {})
              })
          },
          { './stream/GenericWorker': 28, './utils': 32, pako: 38 }
        ],
        8: [
          function (g, B, v) {
            function _(l, N) {
              var o,
                p = ''
              for (o = 0; o < N; o++)
                (p += String.fromCharCode(255 & l)), (l >>>= 8)
              return p
            }
            function d(l, N, o, p, f, E) {
              var U,
                x,
                F = l.file,
                W = l.compression,
                P = E !== r.utf8encode,
                V = s.transformTo('string', E(F.name)),
                z = s.transformTo('string', r.utf8encode(F.name)),
                Z = F.comment,
                ut = s.transformTo('string', E(Z)),
                w = s.transformTo('string', r.utf8encode(Z)),
                I = z.length !== F.name.length,
                i = w.length !== Z.length,
                A = '',
                tt = '',
                k = '',
                et = F.dir,
                M = F.date,
                H = { crc32: 0, compressedSize: 0, uncompressedSize: 0 }
              ;(N && !o) ||
                ((H.crc32 = l.crc32),
                (H.compressedSize = l.compressedSize),
                (H.uncompressedSize = l.uncompressedSize))
              var O = 0
              N && (O |= 8), P || (!I && !i) || (O |= 2048)
              var D = 0,
                st = 0
              et && (D |= 16),
                f === 'UNIX'
                  ? ((st = 798),
                    (D |= (function (Q, vt) {
                      var St = Q
                      return Q || (St = vt ? 16893 : 33204), (65535 & St) << 16
                    })(F.unixPermissions, et)))
                  : ((st = 20),
                    (D |= (function (Q) {
                      return 63 & (Q || 0)
                    })(F.dosPermissions))),
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
                I &&
                  ((tt = _(1, 1) + _(T(V), 4) + z),
                  (A += 'up' + _(tt.length, 2) + tt)),
                i &&
                  ((k = _(1, 1) + _(T(ut), 4) + w),
                  (A += 'uc' + _(k.length, 2) + k))
              var it = ''
              return (
                (it += `
\0`),
                (it += _(O, 2)),
                (it += W.magic),
                (it += _(U, 2)),
                (it += _(x, 2)),
                (it += _(H.crc32, 4)),
                (it += _(H.compressedSize, 4)),
                (it += _(H.uncompressedSize, 4)),
                (it += _(V.length, 2)),
                (it += _(A.length, 2)),
                {
                  fileRecord: y.LOCAL_FILE_HEADER + it + V + A,
                  dirRecord:
                    y.CENTRAL_FILE_HEADER +
                    _(st, 2) +
                    it +
                    _(ut.length, 2) +
                    '\0\0\0\0' +
                    _(D, 4) +
                    _(p, 4) +
                    V +
                    A +
                    ut
                }
              )
            }
            var s = g('../utils'),
              h = g('../stream/GenericWorker'),
              r = g('../utf8'),
              T = g('../crc32'),
              y = g('../signature')
            function L(l, N, o, p) {
              h.call(this, 'ZipFileWorker'),
                (this.bytesWritten = 0),
                (this.zipComment = N),
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
            s.inherits(L, h),
              (L.prototype.push = function (l) {
                var N = l.meta.percent || 0,
                  o = this.entriesCount,
                  p = this._sources.length
                this.accumulate
                  ? this.contentBuffer.push(l)
                  : ((this.bytesWritten += l.data.length),
                    h.prototype.push.call(this, {
                      data: l.data,
                      meta: {
                        currentFile: this.currentFile,
                        percent: o ? (N + 100 * (o - p - 1)) / o : 100
                      }
                    }))
              }),
              (L.prototype.openedSource = function (l) {
                ;(this.currentSourceOffset = this.bytesWritten),
                  (this.currentFile = l.file.name)
                var N = this.streamFiles && !l.file.dir
                if (N) {
                  var o = d(
                    l,
                    N,
                    !1,
                    this.currentSourceOffset,
                    this.zipPlatform,
                    this.encodeFileName
                  )
                  this.push({ data: o.fileRecord, meta: { percent: 0 } })
                } else this.accumulate = !0
              }),
              (L.prototype.closedSource = function (l) {
                this.accumulate = !1
                var N = this.streamFiles && !l.file.dir,
                  o = d(
                    l,
                    N,
                    !0,
                    this.currentSourceOffset,
                    this.zipPlatform,
                    this.encodeFileName
                  )
                if ((this.dirRecords.push(o.dirRecord), N))
                  this.push({
                    data: (function (p) {
                      return (
                        y.DATA_DESCRIPTOR +
                        _(p.crc32, 4) +
                        _(p.compressedSize, 4) +
                        _(p.uncompressedSize, 4)
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
              (L.prototype.flush = function () {
                for (
                  var l = this.bytesWritten, N = 0;
                  N < this.dirRecords.length;
                  N++
                )
                  this.push({
                    data: this.dirRecords[N],
                    meta: { percent: 100 }
                  })
                var o = this.bytesWritten - l,
                  p = (function (f, E, U, x, F) {
                    var W = s.transformTo('string', F(x))
                    return (
                      y.CENTRAL_DIRECTORY_END +
                      '\0\0\0\0' +
                      _(f, 2) +
                      _(f, 2) +
                      _(E, 4) +
                      _(U, 4) +
                      _(W.length, 2) +
                      W
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
              (L.prototype.prepareNextSource = function () {
                ;(this.previous = this._sources.shift()),
                  this.openedSource(this.previous.streamInfo),
                  this.isPaused ? this.previous.pause() : this.previous.resume()
              }),
              (L.prototype.registerPrevious = function (l) {
                this._sources.push(l)
                var N = this
                return (
                  l.on('data', function (o) {
                    N.processChunk(o)
                  }),
                  l.on('end', function () {
                    N.closedSource(N.previous.streamInfo),
                      N._sources.length ? N.prepareNextSource() : N.end()
                  }),
                  l.on('error', function (o) {
                    N.error(o)
                  }),
                  this
                )
              }),
              (L.prototype.resume = function () {
                return (
                  !!h.prototype.resume.call(this) &&
                  (!this.previous && this._sources.length
                    ? (this.prepareNextSource(), !0)
                    : this.previous ||
                      this._sources.length ||
                      this.generatedError
                    ? void 0
                    : (this.end(), !0))
                )
              }),
              (L.prototype.error = function (l) {
                var N = this._sources
                if (!h.prototype.error.call(this, l)) return !1
                for (var o = 0; o < N.length; o++)
                  try {
                    N[o].error(l)
                  } catch {}
                return !0
              }),
              (L.prototype.lock = function () {
                h.prototype.lock.call(this)
                for (var l = this._sources, N = 0; N < l.length; N++)
                  l[N].lock()
              }),
              (B.exports = L)
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
          function (g, B, v) {
            var _ = g('../compressions'),
              d = g('./ZipFileWorker')
            v.generateWorker = function (s, h, r) {
              var T = new d(h.streamFiles, r, h.platform, h.encodeFileName),
                y = 0
              try {
                s.forEach(function (L, l) {
                  y++
                  var N = (function (E, U) {
                      var x = E || U,
                        F = _[x]
                      if (!F)
                        throw new Error(
                          x + ' is not a valid compression method !'
                        )
                      return F
                    })(l.options.compression, h.compression),
                    o =
                      l.options.compressionOptions ||
                      h.compressionOptions ||
                      {},
                    p = l.dir,
                    f = l.date
                  l._compressWorker(N, o)
                    .withStreamInfo('file', {
                      name: L,
                      dir: p,
                      date: f,
                      comment: l.comment || '',
                      unixPermissions: l.unixPermissions,
                      dosPermissions: l.dosPermissions
                    })
                    .pipe(T)
                }),
                  (T.entriesCount = y)
              } catch (L) {
                T.error(L)
              }
              return T
            }
          },
          { '../compressions': 3, './ZipFileWorker': 8 }
        ],
        10: [
          function (g, B, v) {
            function _() {
              if (!(this instanceof _)) return new _()
              if (arguments.length)
                throw new Error(
                  'The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.'
                )
              ;(this.files = Object.create(null)),
                (this.comment = null),
                (this.root = ''),
                (this.clone = function () {
                  var d = new _()
                  for (var s in this)
                    typeof this[s] != 'function' && (d[s] = this[s])
                  return d
                })
            }
            ;((_.prototype = g('./object')).loadAsync = g('./load')),
              (_.support = g('./support')),
              (_.defaults = g('./defaults')),
              (_.version = '3.10.1'),
              (_.loadAsync = function (d, s) {
                return new _().loadAsync(d, s)
              }),
              (_.external = g('./external')),
              (B.exports = _)
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
          function (g, B, v) {
            var _ = g('./utils'),
              d = g('./external'),
              s = g('./utf8'),
              h = g('./zipEntries'),
              r = g('./stream/Crc32Probe'),
              T = g('./nodejsUtils')
            function y(L) {
              return new d.Promise(function (l, N) {
                var o = L.decompressed.getContentWorker().pipe(new r())
                o.on('error', function (p) {
                  N(p)
                })
                  .on('end', function () {
                    o.streamInfo.crc32 !== L.decompressed.crc32
                      ? N(new Error('Corrupted zip : CRC32 mismatch'))
                      : l()
                  })
                  .resume()
              })
            }
            B.exports = function (L, l) {
              var N = this
              return (
                (l = _.extend(l || {}, {
                  base64: !1,
                  checkCRC32: !1,
                  optimizedBinaryString: !1,
                  createFolders: !1,
                  decodeFileName: s.utf8decode
                })),
                T.isNode && T.isStream(L)
                  ? d.Promise.reject(
                      new Error(
                        "JSZip can't accept a stream when loading a zip file."
                      )
                    )
                  : _.prepareContent(
                      'the loaded zip file',
                      L,
                      !0,
                      l.optimizedBinaryString,
                      l.base64
                    )
                      .then(function (o) {
                        var p = new h(l)
                        return p.load(o), p
                      })
                      .then(function (o) {
                        var p = [d.Promise.resolve(o)],
                          f = o.files
                        if (l.checkCRC32)
                          for (var E = 0; E < f.length; E++) p.push(y(f[E]))
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
                            F = _.resolve(U.fileNameStr)
                          N.file(F, U.decompressed, {
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
                            U.dir || (N.file(F).unsafeOriginalName = x)
                        }
                        return (
                          p.zipComment.length && (N.comment = p.zipComment), N
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
          function (g, B, v) {
            var _ = g('../utils'),
              d = g('../stream/GenericWorker')
            function s(h, r) {
              d.call(this, 'Nodejs stream input adapter for ' + h),
                (this._upstreamEnded = !1),
                this._bindStream(r)
            }
            _.inherits(s, d),
              (s.prototype._bindStream = function (h) {
                var r = this
                ;(this._stream = h).pause(),
                  h
                    .on('data', function (T) {
                      r.push({ data: T, meta: { percent: 0 } })
                    })
                    .on('error', function (T) {
                      r.isPaused ? (this.generatedError = T) : r.error(T)
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
          function (g, B, v) {
            var _ = g('readable-stream').Readable
            function d(s, h, r) {
              _.call(this, h), (this._helper = s)
              var T = this
              s.on('data', function (y, L) {
                T.push(y) || T._helper.pause(), r && r(L)
              })
                .on('error', function (y) {
                  T.emit('error', y)
                })
                .on('end', function () {
                  T.push(null)
                })
            }
            g('../utils').inherits(d, _),
              (d.prototype._read = function () {
                this._helper.resume()
              }),
              (B.exports = d)
          },
          { '../utils': 32, 'readable-stream': 16 }
        ],
        14: [
          function (g, B, v) {
            B.exports = {
              isNode: typeof Buffer < 'u',
              newBufferFrom: function (_, d) {
                if (Buffer.from && Buffer.from !== Uint8Array.from)
                  return Buffer.from(_, d)
                if (typeof _ == 'number')
                  throw new Error('The "data" argument must not be a number')
                return new Buffer(_, d)
              },
              allocBuffer: function (_) {
                if (Buffer.alloc) return Buffer.alloc(_)
                var d = new Buffer(_)
                return d.fill(0), d
              },
              isBuffer: function (_) {
                return Buffer.isBuffer(_)
              },
              isStream: function (_) {
                return (
                  _ &&
                  typeof _.on == 'function' &&
                  typeof _.pause == 'function' &&
                  typeof _.resume == 'function'
                )
              }
            }
          },
          {}
        ],
        15: [
          function (g, B, v) {
            function _(F, W, P) {
              var V,
                z = s.getTypeOf(W),
                Z = s.extend(P || {}, T)
              ;(Z.date = Z.date || new Date()),
                Z.compression !== null &&
                  (Z.compression = Z.compression.toUpperCase()),
                typeof Z.unixPermissions == 'string' &&
                  (Z.unixPermissions = parseInt(Z.unixPermissions, 8)),
                Z.unixPermissions && 16384 & Z.unixPermissions && (Z.dir = !0),
                Z.dosPermissions && 16 & Z.dosPermissions && (Z.dir = !0),
                Z.dir && (F = f(F)),
                Z.createFolders && (V = p(F)) && E.call(this, V, !0)
              var ut = z === 'string' && Z.binary === !1 && Z.base64 === !1
              ;(P && P.binary !== void 0) || (Z.binary = !ut),
                ((W instanceof y && W.uncompressedSize === 0) ||
                  Z.dir ||
                  !W ||
                  W.length === 0) &&
                  ((Z.base64 = !1),
                  (Z.binary = !0),
                  (W = ''),
                  (Z.compression = 'STORE'),
                  (z = 'string'))
              var w = null
              w =
                W instanceof y || W instanceof h
                  ? W
                  : N.isNode && N.isStream(W)
                  ? new o(F, W)
                  : s.prepareContent(
                      F,
                      W,
                      Z.binary,
                      Z.optimizedBinaryString,
                      Z.base64
                    )
              var I = new L(F, w, Z)
              this.files[F] = I
            }
            var d = g('./utf8'),
              s = g('./utils'),
              h = g('./stream/GenericWorker'),
              r = g('./stream/StreamHelper'),
              T = g('./defaults'),
              y = g('./compressedObject'),
              L = g('./zipObject'),
              l = g('./generate'),
              N = g('./nodejsUtils'),
              o = g('./nodejs/NodejsStreamInputAdapter'),
              p = function (F) {
                F.slice(-1) === '/' && (F = F.substring(0, F.length - 1))
                var W = F.lastIndexOf('/')
                return 0 < W ? F.substring(0, W) : ''
              },
              f = function (F) {
                return F.slice(-1) !== '/' && (F += '/'), F
              },
              E = function (F, W) {
                return (
                  (W = W !== void 0 ? W : T.createFolders),
                  (F = f(F)),
                  this.files[F] ||
                    _.call(this, F, null, { dir: !0, createFolders: W }),
                  this.files[F]
                )
              }
            function U(F) {
              return Object.prototype.toString.call(F) === '[object RegExp]'
            }
            var x = {
              load: function () {
                throw new Error(
                  'This method has been removed in JSZip 3.0, please check the upgrade guide.'
                )
              },
              forEach: function (F) {
                var W, P, V
                for (W in this.files)
                  (V = this.files[W]),
                    (P = W.slice(this.root.length, W.length)) &&
                      W.slice(0, this.root.length) === this.root &&
                      F(P, V)
              },
              filter: function (F) {
                var W = []
                return (
                  this.forEach(function (P, V) {
                    F(P, V) && W.push(V)
                  }),
                  W
                )
              },
              file: function (F, W, P) {
                if (arguments.length !== 1)
                  return (F = this.root + F), _.call(this, F, W, P), this
                if (U(F)) {
                  var V = F
                  return this.filter(function (Z, ut) {
                    return !ut.dir && V.test(Z)
                  })
                }
                var z = this.files[this.root + F]
                return z && !z.dir ? z : null
              },
              folder: function (F) {
                if (!F) return this
                if (U(F))
                  return this.filter(function (z, Z) {
                    return Z.dir && F.test(z)
                  })
                var W = this.root + F,
                  P = E.call(this, W),
                  V = this.clone()
                return (V.root = P.name), V
              },
              remove: function (F) {
                F = this.root + F
                var W = this.files[F]
                if (
                  (W ||
                    (F.slice(-1) !== '/' && (F += '/'), (W = this.files[F])),
                  W && !W.dir)
                )
                  delete this.files[F]
                else
                  for (
                    var P = this.filter(function (z, Z) {
                        return Z.name.slice(0, F.length) === F
                      }),
                      V = 0;
                    V < P.length;
                    V++
                  )
                    delete this.files[P[V].name]
                return this
              },
              generate: function () {
                throw new Error(
                  'This method has been removed in JSZip 3.0, please check the upgrade guide.'
                )
              },
              generateInternalStream: function (F) {
                var W,
                  P = {}
                try {
                  if (
                    (((P = s.extend(F || {}, {
                      streamFiles: !1,
                      compression: 'STORE',
                      compressionOptions: null,
                      type: '',
                      platform: 'DOS',
                      comment: null,
                      mimeType: 'application/zip',
                      encodeFileName: d.utf8encode
                    })).type = P.type.toLowerCase()),
                    (P.compression = P.compression.toUpperCase()),
                    P.type === 'binarystring' && (P.type = 'string'),
                    !P.type)
                  )
                    throw new Error('No output type specified.')
                  s.checkSupport(P.type),
                    (P.platform !== 'darwin' &&
                      P.platform !== 'freebsd' &&
                      P.platform !== 'linux' &&
                      P.platform !== 'sunos') ||
                      (P.platform = 'UNIX'),
                    P.platform === 'win32' && (P.platform = 'DOS')
                  var V = P.comment || this.comment || ''
                  W = l.generateWorker(this, P, V)
                } catch (z) {
                  ;(W = new h('error')).error(z)
                }
                return new r(W, P.type || 'string', P.mimeType)
              },
              generateAsync: function (F, W) {
                return this.generateInternalStream(F).accumulate(W)
              },
              generateNodeStream: function (F, W) {
                return (
                  (F = F || {}).type || (F.type = 'nodebuffer'),
                  this.generateInternalStream(F).toNodejsStream(W)
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
          function (g, B, v) {
            B.exports = g('stream')
          },
          { stream: void 0 }
        ],
        17: [
          function (g, B, v) {
            var _ = g('./DataReader')
            function d(s) {
              _.call(this, s)
              for (var h = 0; h < this.data.length; h++) s[h] = 255 & s[h]
            }
            g('../utils').inherits(d, _),
              (d.prototype.byteAt = function (s) {
                return this.data[this.zero + s]
              }),
              (d.prototype.lastIndexOfSignature = function (s) {
                for (
                  var h = s.charCodeAt(0),
                    r = s.charCodeAt(1),
                    T = s.charCodeAt(2),
                    y = s.charCodeAt(3),
                    L = this.length - 4;
                  0 <= L;
                  --L
                )
                  if (
                    this.data[L] === h &&
                    this.data[L + 1] === r &&
                    this.data[L + 2] === T &&
                    this.data[L + 3] === y
                  )
                    return L - this.zero
                return -1
              }),
              (d.prototype.readAndCheckSignature = function (s) {
                var h = s.charCodeAt(0),
                  r = s.charCodeAt(1),
                  T = s.charCodeAt(2),
                  y = s.charCodeAt(3),
                  L = this.readData(4)
                return h === L[0] && r === L[1] && T === L[2] && y === L[3]
              }),
              (d.prototype.readData = function (s) {
                if ((this.checkOffset(s), s === 0)) return []
                var h = this.data.slice(
                  this.zero + this.index,
                  this.zero + this.index + s
                )
                return (this.index += s), h
              }),
              (B.exports = d)
          },
          { '../utils': 32, './DataReader': 18 }
        ],
        18: [
          function (g, B, v) {
            var _ = g('../utils')
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
                var h,
                  r = 0
                for (
                  this.checkOffset(s), h = this.index + s - 1;
                  h >= this.index;
                  h--
                )
                  r = (r << 8) + this.byteAt(h)
                return (this.index += s), r
              },
              readString: function (s) {
                return _.transformTo('string', this.readData(s))
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
          function (g, B, v) {
            var _ = g('./Uint8ArrayReader')
            function d(s) {
              _.call(this, s)
            }
            g('../utils').inherits(d, _),
              (d.prototype.readData = function (s) {
                this.checkOffset(s)
                var h = this.data.slice(
                  this.zero + this.index,
                  this.zero + this.index + s
                )
                return (this.index += s), h
              }),
              (B.exports = d)
          },
          { '../utils': 32, './Uint8ArrayReader': 21 }
        ],
        20: [
          function (g, B, v) {
            var _ = g('./DataReader')
            function d(s) {
              _.call(this, s)
            }
            g('../utils').inherits(d, _),
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
                var h = this.data.slice(
                  this.zero + this.index,
                  this.zero + this.index + s
                )
                return (this.index += s), h
              }),
              (B.exports = d)
          },
          { '../utils': 32, './DataReader': 18 }
        ],
        21: [
          function (g, B, v) {
            var _ = g('./ArrayReader')
            function d(s) {
              _.call(this, s)
            }
            g('../utils').inherits(d, _),
              (d.prototype.readData = function (s) {
                if ((this.checkOffset(s), s === 0)) return new Uint8Array(0)
                var h = this.data.subarray(
                  this.zero + this.index,
                  this.zero + this.index + s
                )
                return (this.index += s), h
              }),
              (B.exports = d)
          },
          { '../utils': 32, './ArrayReader': 17 }
        ],
        22: [
          function (g, B, v) {
            var _ = g('../utils'),
              d = g('../support'),
              s = g('./ArrayReader'),
              h = g('./StringReader'),
              r = g('./NodeBufferReader'),
              T = g('./Uint8ArrayReader')
            B.exports = function (y) {
              var L = _.getTypeOf(y)
              return (
                _.checkSupport(L),
                L !== 'string' || d.uint8array
                  ? L === 'nodebuffer'
                    ? new r(y)
                    : d.uint8array
                    ? new T(_.transformTo('uint8array', y))
                    : new s(_.transformTo('array', y))
                  : new h(y)
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
          function (g, B, v) {
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
          function (g, B, v) {
            var _ = g('./GenericWorker'),
              d = g('../utils')
            function s(h) {
              _.call(this, 'ConvertWorker to ' + h), (this.destType = h)
            }
            d.inherits(s, _),
              (s.prototype.processChunk = function (h) {
                this.push({
                  data: d.transformTo(this.destType, h.data),
                  meta: h.meta
                })
              }),
              (B.exports = s)
          },
          { '../utils': 32, './GenericWorker': 28 }
        ],
        25: [
          function (g, B, v) {
            var _ = g('./GenericWorker'),
              d = g('../crc32')
            function s() {
              _.call(this, 'Crc32Probe'), this.withStreamInfo('crc32', 0)
            }
            g('../utils').inherits(s, _),
              (s.prototype.processChunk = function (h) {
                ;(this.streamInfo.crc32 = d(
                  h.data,
                  this.streamInfo.crc32 || 0
                )),
                  this.push(h)
              }),
              (B.exports = s)
          },
          { '../crc32': 4, '../utils': 32, './GenericWorker': 28 }
        ],
        26: [
          function (g, B, v) {
            var _ = g('../utils'),
              d = g('./GenericWorker')
            function s(h) {
              d.call(this, 'DataLengthProbe for ' + h),
                (this.propName = h),
                this.withStreamInfo(h, 0)
            }
            _.inherits(s, d),
              (s.prototype.processChunk = function (h) {
                if (h) {
                  var r = this.streamInfo[this.propName] || 0
                  this.streamInfo[this.propName] = r + h.data.length
                }
                d.prototype.processChunk.call(this, h)
              }),
              (B.exports = s)
          },
          { '../utils': 32, './GenericWorker': 28 }
        ],
        27: [
          function (g, B, v) {
            var _ = g('../utils'),
              d = g('./GenericWorker')
            function s(h) {
              d.call(this, 'DataWorker')
              var r = this
              ;(this.dataIsReady = !1),
                (this.index = 0),
                (this.max = 0),
                (this.data = null),
                (this.type = ''),
                (this._tickScheduled = !1),
                h.then(
                  function (T) {
                    ;(r.dataIsReady = !0),
                      (r.data = T),
                      (r.max = (T && T.length) || 0),
                      (r.type = _.getTypeOf(T)),
                      r.isPaused || r._tickAndRepeat()
                  },
                  function (T) {
                    r.error(T)
                  }
                )
            }
            _.inherits(s, d),
              (s.prototype.cleanUp = function () {
                d.prototype.cleanUp.call(this), (this.data = null)
              }),
              (s.prototype.resume = function () {
                return (
                  !!d.prototype.resume.call(this) &&
                  (!this._tickScheduled &&
                    this.dataIsReady &&
                    ((this._tickScheduled = !0),
                    _.delay(this._tickAndRepeat, [], this)),
                  !0)
                )
              }),
              (s.prototype._tickAndRepeat = function () {
                ;(this._tickScheduled = !1),
                  this.isPaused ||
                    this.isFinished ||
                    (this._tick(),
                    this.isFinished ||
                      (_.delay(this._tickAndRepeat, [], this),
                      (this._tickScheduled = !0)))
              }),
              (s.prototype._tick = function () {
                if (this.isPaused || this.isFinished) return !1
                var h = null,
                  r = Math.min(this.max, this.index + 16384)
                if (this.index >= this.max) return this.end()
                switch (this.type) {
                  case 'string':
                    h = this.data.substring(this.index, r)
                    break
                  case 'uint8array':
                    h = this.data.subarray(this.index, r)
                    break
                  case 'array':
                  case 'nodebuffer':
                    h = this.data.slice(this.index, r)
                }
                return (
                  (this.index = r),
                  this.push({
                    data: h,
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
          function (g, B, v) {
            function _(d) {
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
            ;(_.prototype = {
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
                  for (var h = 0; h < this._listeners[d].length; h++)
                    this._listeners[d][h].call(this, s)
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
                  d.on('data', function (h) {
                    s.processChunk(h)
                  }),
                  d.on('end', function () {
                    s.end()
                  }),
                  d.on('error', function (h) {
                    s.error(h)
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
              (B.exports = _)
          },
          {}
        ],
        29: [
          function (g, B, v) {
            var _ = g('../utils'),
              d = g('./ConvertWorker'),
              s = g('./GenericWorker'),
              h = g('../base64'),
              r = g('../support'),
              T = g('../external'),
              y = null
            if (r.nodestream)
              try {
                y = g('../nodejs/NodejsStreamOutputAdapter')
              } catch {}
            function L(N, o) {
              return new T.Promise(function (p, f) {
                var E = [],
                  U = N._internalType,
                  x = N._outputType,
                  F = N._mimeType
                N.on('data', function (W, P) {
                  E.push(W), o && o(P)
                })
                  .on('error', function (W) {
                    ;(E = []), f(W)
                  })
                  .on('end', function () {
                    try {
                      var W = (function (P, V, z) {
                        switch (P) {
                          case 'blob':
                            return _.newBlob(_.transformTo('arraybuffer', V), z)
                          case 'base64':
                            return h.encode(V)
                          default:
                            return _.transformTo(P, V)
                        }
                      })(
                        x,
                        (function (P, V) {
                          var z,
                            Z = 0,
                            ut = null,
                            w = 0
                          for (z = 0; z < V.length; z++) w += V[z].length
                          switch (P) {
                            case 'string':
                              return V.join('')
                            case 'array':
                              return Array.prototype.concat.apply([], V)
                            case 'uint8array':
                              for (
                                ut = new Uint8Array(w), z = 0;
                                z < V.length;
                                z++
                              )
                                ut.set(V[z], Z), (Z += V[z].length)
                              return ut
                            case 'nodebuffer':
                              return Buffer.concat(V)
                            default:
                              throw new Error(
                                "concat : unsupported type '" + P + "'"
                              )
                          }
                        })(U, E),
                        F
                      )
                      p(W)
                    } catch (P) {
                      f(P)
                    }
                    E = []
                  })
                  .resume()
              })
            }
            function l(N, o, p) {
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
                  _.checkSupport(f),
                  (this._worker = N.pipe(new d(f))),
                  N.lock()
              } catch (E) {
                ;(this._worker = new s('error')), this._worker.error(E)
              }
            }
            ;(l.prototype = {
              accumulate: function (N) {
                return L(this, N)
              },
              on: function (N, o) {
                var p = this
                return (
                  N === 'data'
                    ? this._worker.on(N, function (f) {
                        o.call(p, f.data, f.meta)
                      })
                    : this._worker.on(N, function () {
                        _.delay(o, arguments, p)
                      }),
                  this
                )
              },
              resume: function () {
                return _.delay(this._worker.resume, [], this._worker), this
              },
              pause: function () {
                return this._worker.pause(), this
              },
              toNodejsStream: function (N) {
                if (
                  (_.checkSupport('nodestream'),
                  this._outputType !== 'nodebuffer')
                )
                  throw new Error(
                    this._outputType + ' is not supported by this method'
                  )
                return new y(
                  this,
                  { objectMode: this._outputType !== 'nodebuffer' },
                  N
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
          function (g, B, v) {
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
              var _ = new ArrayBuffer(0)
              try {
                v.blob = new Blob([_], { type: 'application/zip' }).size === 0
              } catch {
                try {
                  var d = new (self.BlobBuilder ||
                    self.WebKitBlobBuilder ||
                    self.MozBlobBuilder ||
                    self.MSBlobBuilder)()
                  d.append(_),
                    (v.blob = d.getBlob('application/zip').size === 0)
                } catch {
                  v.blob = !1
                }
              }
            }
            try {
              v.nodestream = !!g('readable-stream').Readable
            } catch {
              v.nodestream = !1
            }
          },
          { 'readable-stream': 16 }
        ],
        31: [
          function (g, B, v) {
            for (
              var _ = g('./utils'),
                d = g('./support'),
                s = g('./nodejsUtils'),
                h = g('./stream/GenericWorker'),
                r = new Array(256),
                T = 0;
              T < 256;
              T++
            )
              r[T] =
                252 <= T
                  ? 6
                  : 248 <= T
                  ? 5
                  : 240 <= T
                  ? 4
                  : 224 <= T
                  ? 3
                  : 192 <= T
                  ? 2
                  : 1
            r[254] = r[254] = 1
            function y() {
              h.call(this, 'utf-8 decode'), (this.leftOver = null)
            }
            function L() {
              h.call(this, 'utf-8 encode')
            }
            ;(v.utf8encode = function (l) {
              return d.nodebuffer
                ? s.newBufferFrom(l, 'utf-8')
                : (function (N) {
                    var o,
                      p,
                      f,
                      E,
                      U,
                      x = N.length,
                      F = 0
                    for (E = 0; E < x; E++)
                      (64512 & (p = N.charCodeAt(E))) == 55296 &&
                        E + 1 < x &&
                        (64512 & (f = N.charCodeAt(E + 1))) == 56320 &&
                        ((p = 65536 + ((p - 55296) << 10) + (f - 56320)), E++),
                        (F += p < 128 ? 1 : p < 2048 ? 2 : p < 65536 ? 3 : 4)
                    for (
                      o = d.uint8array ? new Uint8Array(F) : new Array(F),
                        E = U = 0;
                      U < F;
                      E++
                    )
                      (64512 & (p = N.charCodeAt(E))) == 55296 &&
                        E + 1 < x &&
                        (64512 & (f = N.charCodeAt(E + 1))) == 56320 &&
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
                  ? _.transformTo('nodebuffer', l).toString('utf-8')
                  : (function (N) {
                      var o,
                        p,
                        f,
                        E,
                        U = N.length,
                        x = new Array(2 * U)
                      for (o = p = 0; o < U; )
                        if ((f = N[o++]) < 128) x[p++] = f
                        else if (4 < (E = r[f])) (x[p++] = 65533), (o += E - 1)
                        else {
                          for (
                            f &= E === 2 ? 31 : E === 3 ? 15 : 7;
                            1 < E && o < U;

                          )
                            (f = (f << 6) | (63 & N[o++])), E--
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
                        _.applyFromCharCode(x)
                      )
                    })(
                      (l = _.transformTo(
                        d.uint8array ? 'uint8array' : 'array',
                        l
                      ))
                    )
              }),
              _.inherits(y, h),
              (y.prototype.processChunk = function (l) {
                var N = _.transformTo(
                  d.uint8array ? 'uint8array' : 'array',
                  l.data
                )
                if (this.leftOver && this.leftOver.length) {
                  if (d.uint8array) {
                    var o = N
                    ;(N = new Uint8Array(o.length + this.leftOver.length)).set(
                      this.leftOver,
                      0
                    ),
                      N.set(o, this.leftOver.length)
                  } else N = this.leftOver.concat(N)
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
                  })(N),
                  f = N
                p !== N.length &&
                  (d.uint8array
                    ? ((f = N.subarray(0, p)),
                      (this.leftOver = N.subarray(p, N.length)))
                    : ((f = N.slice(0, p)),
                      (this.leftOver = N.slice(p, N.length)))),
                  this.push({ data: v.utf8decode(f), meta: l.meta })
              }),
              (y.prototype.flush = function () {
                this.leftOver &&
                  this.leftOver.length &&
                  (this.push({ data: v.utf8decode(this.leftOver), meta: {} }),
                  (this.leftOver = null))
              }),
              (v.Utf8DecodeWorker = y),
              _.inherits(L, h),
              (L.prototype.processChunk = function (l) {
                this.push({ data: v.utf8encode(l.data), meta: l.meta })
              }),
              (v.Utf8EncodeWorker = L)
          },
          {
            './nodejsUtils': 14,
            './stream/GenericWorker': 28,
            './support': 30,
            './utils': 32
          }
        ],
        32: [
          function (g, B, v) {
            var _ = g('./support'),
              d = g('./base64'),
              s = g('./nodejsUtils'),
              h = g('./external')
            function r(o) {
              return o
            }
            function T(o, p) {
              for (var f = 0; f < o.length; ++f) p[f] = 255 & o.charCodeAt(f)
              return p
            }
            g('setimmediate'),
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
            var y = {
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
                      _.uint8array &&
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
                      _.nodebuffer &&
                      String.fromCharCode.apply(null, s.allocBuffer(1))
                        .length === 1
                    )
                  } catch {
                    return !1
                  }
                })()
              }
            }
            function L(o) {
              var p = 65536,
                f = v.getTypeOf(o),
                E = !0
              if (
                (f === 'uint8array'
                  ? (E = y.applyCanBeUsed.uint8array)
                  : f === 'nodebuffer' && (E = y.applyCanBeUsed.nodebuffer),
                E)
              )
                for (; 1 < p; )
                  try {
                    return y.stringifyByChunk(o, f, p)
                  } catch {
                    p = Math.floor(p / 2)
                  }
              return y.stringifyByChar(o)
            }
            function l(o, p) {
              for (var f = 0; f < o.length; f++) p[f] = o[f]
              return p
            }
            v.applyFromCharCode = L
            var N = {}
            ;(N.string = {
              string: r,
              array: function (o) {
                return T(o, new Array(o.length))
              },
              arraybuffer: function (o) {
                return N.string.uint8array(o).buffer
              },
              uint8array: function (o) {
                return T(o, new Uint8Array(o.length))
              },
              nodebuffer: function (o) {
                return T(o, s.allocBuffer(o.length))
              }
            }),
              (N.array = {
                string: L,
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
              (N.arraybuffer = {
                string: function (o) {
                  return L(new Uint8Array(o))
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
              (N.uint8array = {
                string: L,
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
              (N.nodebuffer = {
                string: L,
                array: function (o) {
                  return l(o, new Array(o.length))
                },
                arraybuffer: function (o) {
                  return N.nodebuffer.uint8array(o).buffer
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
                return N[f][o](p)
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
                  : _.nodebuffer && s.isBuffer(o)
                  ? 'nodebuffer'
                  : _.uint8array && o instanceof Uint8Array
                  ? 'uint8array'
                  : _.arraybuffer && o instanceof ArrayBuffer
                  ? 'arraybuffer'
                  : void 0
              }),
              (v.checkSupport = function (o) {
                if (!_[o.toLowerCase()])
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
                return h.Promise.resolve(p)
                  .then(function (x) {
                    return _.blob &&
                      (x instanceof Blob ||
                        ['[object File]', '[object Blob]'].indexOf(
                          Object.prototype.toString.call(x)
                        ) !== -1) &&
                      typeof FileReader < 'u'
                      ? new h.Promise(function (F, W) {
                          var P = new FileReader()
                          ;(P.onload = function (V) {
                            F(V.target.result)
                          }),
                            (P.onerror = function (V) {
                              W(V.target.error)
                            }),
                            P.readAsArrayBuffer(x)
                        })
                      : x
                  })
                  .then(function (x) {
                    var F = v.getTypeOf(x)
                    return F
                      ? (F === 'arraybuffer'
                          ? (x = v.transformTo('uint8array', x))
                          : F === 'string' &&
                            (U
                              ? (x = d.decode(x))
                              : f &&
                                E !== !0 &&
                                (x = (function (W) {
                                  return T(
                                    W,
                                    _.uint8array
                                      ? new Uint8Array(W.length)
                                      : new Array(W.length)
                                  )
                                })(x))),
                        x)
                      : h.Promise.reject(
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
          function (g, B, v) {
            var _ = g('./reader/readerFor'),
              d = g('./utils'),
              s = g('./signature'),
              h = g('./zipEntry'),
              r = g('./support')
            function T(y) {
              ;(this.files = []), (this.loadOptions = y)
            }
            ;(T.prototype = {
              checkSignature: function (y) {
                if (!this.reader.readAndCheckSignature(y)) {
                  this.reader.index -= 4
                  var L = this.reader.readString(4)
                  throw new Error(
                    'Corrupted zip or bug: unexpected signature (' +
                      d.pretty(L) +
                      ', expected ' +
                      d.pretty(y) +
                      ')'
                  )
                }
              },
              isSignature: function (y, L) {
                var l = this.reader.index
                this.reader.setIndex(y)
                var N = this.reader.readString(4) === L
                return this.reader.setIndex(l), N
              },
              readBlockEndOfCentral: function () {
                ;(this.diskNumber = this.reader.readInt(2)),
                  (this.diskWithCentralDirStart = this.reader.readInt(2)),
                  (this.centralDirRecordsOnThisDisk = this.reader.readInt(2)),
                  (this.centralDirRecords = this.reader.readInt(2)),
                  (this.centralDirSize = this.reader.readInt(4)),
                  (this.centralDirOffset = this.reader.readInt(4)),
                  (this.zipCommentLength = this.reader.readInt(2))
                var y = this.reader.readData(this.zipCommentLength),
                  L = r.uint8array ? 'uint8array' : 'array',
                  l = d.transformTo(L, y)
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
                for (var y, L, l, N = this.zip64EndOfCentralSize - 44; 0 < N; )
                  (y = this.reader.readInt(2)),
                    (L = this.reader.readInt(4)),
                    (l = this.reader.readData(L)),
                    (this.zip64ExtensibleData[y] = {
                      id: y,
                      length: L,
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
                var y, L
                for (y = 0; y < this.files.length; y++)
                  (L = this.files[y]),
                    this.reader.setIndex(L.localHeaderOffset),
                    this.checkSignature(s.LOCAL_FILE_HEADER),
                    L.readLocalPart(this.reader),
                    L.handleUTF8(),
                    L.processAttributes()
              },
              readCentralDir: function () {
                var y
                for (
                  this.reader.setIndex(this.centralDirOffset);
                  this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);

                )
                  (y = new h(
                    { zip64: this.zip64 },
                    this.loadOptions
                  )).readCentralPart(this.reader),
                    this.files.push(y)
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
                var y = this.reader.lastIndexOfSignature(
                  s.CENTRAL_DIRECTORY_END
                )
                if (y < 0)
                  throw this.isSignature(0, s.LOCAL_FILE_HEADER)
                    ? new Error(
                        "Corrupted zip: can't find end of central directory"
                      )
                    : new Error(
                        "Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"
                      )
                this.reader.setIndex(y)
                var L = y
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
                    (y = this.reader.lastIndexOfSignature(
                      s.ZIP64_CENTRAL_DIRECTORY_LOCATOR
                    )) < 0)
                  )
                    throw new Error(
                      "Corrupted zip: can't find the ZIP64 end of central directory locator"
                    )
                  if (
                    (this.reader.setIndex(y),
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
                var N = L - l
                if (0 < N)
                  this.isSignature(L, s.CENTRAL_FILE_HEADER) ||
                    (this.reader.zero = N)
                else if (N < 0)
                  throw new Error(
                    'Corrupted zip: missing ' + Math.abs(N) + ' bytes.'
                  )
              },
              prepareReader: function (y) {
                this.reader = _(y)
              },
              load: function (y) {
                this.prepareReader(y),
                  this.readEndOfCentral(),
                  this.readCentralDir(),
                  this.readLocalFiles()
              }
            }),
              (B.exports = T)
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
          function (g, B, v) {
            var _ = g('./reader/readerFor'),
              d = g('./utils'),
              s = g('./compressedObject'),
              h = g('./crc32'),
              r = g('./utf8'),
              T = g('./compressions'),
              y = g('./support')
            function L(l, N) {
              ;(this.options = l), (this.loadOptions = N)
            }
            ;(L.prototype = {
              isEncrypted: function () {
                return (1 & this.bitFlag) == 1
              },
              useUTF8: function () {
                return (2048 & this.bitFlag) == 2048
              },
              readLocalPart: function (l) {
                var N, o
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
                  (N = (function (p) {
                    for (var f in T)
                      if (
                        Object.prototype.hasOwnProperty.call(T, f) &&
                        T[f].magic === p
                      )
                        return T[f]
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
                  N,
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
                var N = l.readInt(2)
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
                l.skip(N),
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
                  var l = _(this.extraFields[1].value)
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
                var N,
                  o,
                  p,
                  f = l.index + this.extraFieldsLength
                for (
                  this.extraFields || (this.extraFields = {});
                  l.index + 4 < f;

                )
                  (N = l.readInt(2)),
                    (o = l.readInt(2)),
                    (p = l.readData(o)),
                    (this.extraFields[N] = { id: N, length: o, value: p })
                l.setIndex(f)
              },
              handleUTF8: function () {
                var l = y.uint8array ? 'uint8array' : 'array'
                if (this.useUTF8())
                  (this.fileNameStr = r.utf8decode(this.fileName)),
                    (this.fileCommentStr = r.utf8decode(this.fileComment))
                else {
                  var N = this.findExtraFieldUnicodePath()
                  if (N !== null) this.fileNameStr = N
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
                  var N = _(l.value)
                  return N.readInt(1) !== 1 || h(this.fileName) !== N.readInt(4)
                    ? null
                    : r.utf8decode(N.readData(l.length - 5))
                }
                return null
              },
              findExtraFieldUnicodeComment: function () {
                var l = this.extraFields[25461]
                if (l) {
                  var N = _(l.value)
                  return N.readInt(1) !== 1 ||
                    h(this.fileComment) !== N.readInt(4)
                    ? null
                    : r.utf8decode(N.readData(l.length - 5))
                }
                return null
              }
            }),
              (B.exports = L)
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
          function (g, B, v) {
            function _(N, o, p) {
              ;(this.name = N),
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
            var d = g('./stream/StreamHelper'),
              s = g('./stream/DataWorker'),
              h = g('./utf8'),
              r = g('./compressedObject'),
              T = g('./stream/GenericWorker')
            _.prototype = {
              internalStream: function (N) {
                var o = null,
                  p = 'string'
                try {
                  if (!N) throw new Error('No output type specified.')
                  var f = (p = N.toLowerCase()) === 'string' || p === 'text'
                  ;(p !== 'binarystring' && p !== 'text') || (p = 'string'),
                    (o = this._decompressWorker())
                  var E = !this._dataBinary
                  E && !f && (o = o.pipe(new h.Utf8EncodeWorker())),
                    !E && f && (o = o.pipe(new h.Utf8DecodeWorker()))
                } catch (U) {
                  ;(o = new T('error')).error(U)
                }
                return new d(o, p, '')
              },
              async: function (N, o) {
                return this.internalStream(N).accumulate(o)
              },
              nodeStream: function (N, o) {
                return this.internalStream(N || 'nodebuffer').toNodejsStream(o)
              },
              _compressWorker: function (N, o) {
                if (
                  this._data instanceof r &&
                  this._data.compression.magic === N.magic
                )
                  return this._data.getCompressedWorker()
                var p = this._decompressWorker()
                return (
                  this._dataBinary || (p = p.pipe(new h.Utf8EncodeWorker())),
                  r.createWorkerFrom(p, N, o)
                )
              },
              _decompressWorker: function () {
                return this._data instanceof r
                  ? this._data.getContentWorker()
                  : this._data instanceof T
                  ? this._data
                  : new s(this._data)
              }
            }
            for (
              var y = [
                  'asText',
                  'asBinary',
                  'asNodeBuffer',
                  'asUint8Array',
                  'asArrayBuffer'
                ],
                L = function () {
                  throw new Error(
                    'This method has been removed in JSZip 3.0, please check the upgrade guide.'
                  )
                },
                l = 0;
              l < y.length;
              l++
            )
              _.prototype[y[l]] = L
            B.exports = _
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
          function (g, B, v) {
            ;(function (_) {
              var d,
                s,
                h = _.MutationObserver || _.WebKitMutationObserver
              if (h) {
                var r = 0,
                  T = new h(N),
                  y = _.document.createTextNode('')
                T.observe(y, { characterData: !0 }),
                  (d = function () {
                    y.data = r = ++r % 2
                  })
              } else if (_.setImmediate || _.MessageChannel === void 0)
                d =
                  'document' in _ &&
                  'onreadystatechange' in _.document.createElement('script')
                    ? function () {
                        var o = _.document.createElement('script')
                        ;(o.onreadystatechange = function () {
                          N(),
                            (o.onreadystatechange = null),
                            o.parentNode.removeChild(o),
                            (o = null)
                        }),
                          _.document.documentElement.appendChild(o)
                      }
                    : function () {
                        setTimeout(N, 0)
                      }
              else {
                var L = new _.MessageChannel()
                ;(L.port1.onmessage = N),
                  (d = function () {
                    L.port2.postMessage(0)
                  })
              }
              var l = []
              function N() {
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
              typeof de < 'u'
                ? de
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
          function (g, B, v) {
            var _ = g('immediate')
            function d() {}
            var s = {},
              h = ['REJECTED'],
              r = ['FULFILLED'],
              T = ['PENDING']
            function y(f) {
              if (typeof f != 'function')
                throw new TypeError('resolver must be a function')
              ;(this.state = T),
                (this.queue = []),
                (this.outcome = void 0),
                f !== d && o(this, f)
            }
            function L(f, E, U) {
              ;(this.promise = f),
                typeof E == 'function' &&
                  ((this.onFulfilled = E),
                  (this.callFulfilled = this.otherCallFulfilled)),
                typeof U == 'function' &&
                  ((this.onRejected = U),
                  (this.callRejected = this.otherCallRejected))
            }
            function l(f, E, U) {
              _(function () {
                var x
                try {
                  x = E(U)
                } catch (F) {
                  return s.reject(f, F)
                }
                x === f
                  ? s.reject(
                      f,
                      new TypeError('Cannot resolve promise with itself')
                    )
                  : s.resolve(f, x)
              })
            }
            function N(f) {
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
              function x(P) {
                U || ((U = !0), s.reject(f, P))
              }
              function F(P) {
                U || ((U = !0), s.resolve(f, P))
              }
              var W = p(function () {
                E(F, x)
              })
              W.status === 'error' && x(W.value)
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
            ;((B.exports = y).prototype.finally = function (f) {
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
              (y.prototype.catch = function (f) {
                return this.then(null, f)
              }),
              (y.prototype.then = function (f, E) {
                if (
                  (typeof f != 'function' && this.state === r) ||
                  (typeof E != 'function' && this.state === h)
                )
                  return this
                var U = new this.constructor(d)
                return (
                  this.state !== T
                    ? l(U, this.state === r ? f : E, this.outcome)
                    : this.queue.push(new L(U, f, E)),
                  U
                )
              }),
              (L.prototype.callFulfilled = function (f) {
                s.resolve(this.promise, f)
              }),
              (L.prototype.otherCallFulfilled = function (f) {
                l(this.promise, this.onFulfilled, f)
              }),
              (L.prototype.callRejected = function (f) {
                s.reject(this.promise, f)
              }),
              (L.prototype.otherCallRejected = function (f) {
                l(this.promise, this.onRejected, f)
              }),
              (s.resolve = function (f, E) {
                var U = p(N, E)
                if (U.status === 'error') return s.reject(f, U.value)
                var x = U.value
                if (x) o(f, x)
                else {
                  ;(f.state = r), (f.outcome = E)
                  for (var F = -1, W = f.queue.length; ++F < W; )
                    f.queue[F].callFulfilled(E)
                }
                return f
              }),
              (s.reject = function (f, E) {
                ;(f.state = h), (f.outcome = E)
                for (var U = -1, x = f.queue.length; ++U < x; )
                  f.queue[U].callRejected(E)
                return f
              }),
              (y.resolve = function (f) {
                return f instanceof this ? f : s.resolve(new this(d), f)
              }),
              (y.reject = function (f) {
                var E = new this(d)
                return s.reject(E, f)
              }),
              (y.all = function (f) {
                var E = this
                if (Object.prototype.toString.call(f) !== '[object Array]')
                  return this.reject(new TypeError('must be an array'))
                var U = f.length,
                  x = !1
                if (!U) return this.resolve([])
                for (
                  var F = new Array(U), W = 0, P = -1, V = new this(d);
                  ++P < U;

                )
                  z(f[P], P)
                return V
                function z(Z, ut) {
                  E.resolve(Z).then(
                    function (w) {
                      ;(F[ut] = w),
                        ++W !== U || x || ((x = !0), s.resolve(V, F))
                    },
                    function (w) {
                      x || ((x = !0), s.reject(V, w))
                    }
                  )
                }
              }),
              (y.race = function (f) {
                var E = this
                if (Object.prototype.toString.call(f) !== '[object Array]')
                  return this.reject(new TypeError('must be an array'))
                var U = f.length,
                  x = !1
                if (!U) return this.resolve([])
                for (var F = -1, W = new this(d); ++F < U; )
                  (P = f[F]),
                    E.resolve(P).then(
                      function (V) {
                        x || ((x = !0), s.resolve(W, V))
                      },
                      function (V) {
                        x || ((x = !0), s.reject(W, V))
                      }
                    )
                var P
                return W
              })
          },
          { immediate: 36 }
        ],
        38: [
          function (g, B, v) {
            var _ = {}
            ;(0, g('./lib/utils/common').assign)(
              _,
              g('./lib/deflate'),
              g('./lib/inflate'),
              g('./lib/zlib/constants')
            ),
              (B.exports = _)
          },
          {
            './lib/deflate': 39,
            './lib/inflate': 40,
            './lib/utils/common': 41,
            './lib/zlib/constants': 44
          }
        ],
        39: [
          function (g, B, v) {
            var _ = g('./zlib/deflate'),
              d = g('./utils/common'),
              s = g('./utils/strings'),
              h = g('./zlib/messages'),
              r = g('./zlib/zstream'),
              T = Object.prototype.toString,
              y = 0,
              L = -1,
              l = 0,
              N = 8
            function o(f) {
              if (!(this instanceof o)) return new o(f)
              this.options = d.assign(
                {
                  level: L,
                  method: N,
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
              var U = _.deflateInit2(
                this.strm,
                E.level,
                E.method,
                E.windowBits,
                E.memLevel,
                E.strategy
              )
              if (U !== y) throw new Error(h[U])
              if (
                (E.header && _.deflateSetHeader(this.strm, E.header),
                E.dictionary)
              ) {
                var x
                if (
                  ((x =
                    typeof E.dictionary == 'string'
                      ? s.string2buf(E.dictionary)
                      : T.call(E.dictionary) === '[object ArrayBuffer]'
                      ? new Uint8Array(E.dictionary)
                      : E.dictionary),
                  (U = _.deflateSetDictionary(this.strm, x)) !== y)
                )
                  throw new Error(h[U])
                this._dict_set = !0
              }
            }
            function p(f, E) {
              var U = new o(E)
              if ((U.push(f, !0), U.err)) throw U.msg || h[U.err]
              return U.result
            }
            ;(o.prototype.push = function (f, E) {
              var U,
                x,
                F = this.strm,
                W = this.options.chunkSize
              if (this.ended) return !1
              ;(x = E === ~~E ? E : E === !0 ? 4 : 0),
                typeof f == 'string'
                  ? (F.input = s.string2buf(f))
                  : T.call(f) === '[object ArrayBuffer]'
                  ? (F.input = new Uint8Array(f))
                  : (F.input = f),
                (F.next_in = 0),
                (F.avail_in = F.input.length)
              do {
                if (
                  (F.avail_out === 0 &&
                    ((F.output = new d.Buf8(W)),
                    (F.next_out = 0),
                    (F.avail_out = W)),
                  (U = _.deflate(F, x)) !== 1 && U !== y)
                )
                  return this.onEnd(U), !(this.ended = !0)
                ;(F.avail_out !== 0 &&
                  (F.avail_in !== 0 || (x !== 4 && x !== 2))) ||
                  (this.options.to === 'string'
                    ? this.onData(
                        s.buf2binstring(d.shrinkBuf(F.output, F.next_out))
                      )
                    : this.onData(d.shrinkBuf(F.output, F.next_out)))
              } while ((0 < F.avail_in || F.avail_out === 0) && U !== 1)
              return x === 4
                ? ((U = _.deflateEnd(this.strm)),
                  this.onEnd(U),
                  (this.ended = !0),
                  U === y)
                : x !== 2 || (this.onEnd(y), !(F.avail_out = 0))
            }),
              (o.prototype.onData = function (f) {
                this.chunks.push(f)
              }),
              (o.prototype.onEnd = function (f) {
                f === y &&
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
          function (g, B, v) {
            var _ = g('./zlib/inflate'),
              d = g('./utils/common'),
              s = g('./utils/strings'),
              h = g('./zlib/constants'),
              r = g('./zlib/messages'),
              T = g('./zlib/zstream'),
              y = g('./zlib/gzheader'),
              L = Object.prototype.toString
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
                (this.strm = new T()),
                (this.strm.avail_out = 0)
              var f = _.inflateInit2(this.strm, p.windowBits)
              if (f !== h.Z_OK) throw new Error(r[f])
              ;(this.header = new y()),
                _.inflateGetHeader(this.strm, this.header)
            }
            function N(o, p) {
              var f = new l(p)
              if ((f.push(o, !0), f.err)) throw f.msg || r[f.err]
              return f.result
            }
            ;(l.prototype.push = function (o, p) {
              var f,
                E,
                U,
                x,
                F,
                W,
                P = this.strm,
                V = this.options.chunkSize,
                z = this.options.dictionary,
                Z = !1
              if (this.ended) return !1
              ;(E = p === ~~p ? p : p === !0 ? h.Z_FINISH : h.Z_NO_FLUSH),
                typeof o == 'string'
                  ? (P.input = s.binstring2buf(o))
                  : L.call(o) === '[object ArrayBuffer]'
                  ? (P.input = new Uint8Array(o))
                  : (P.input = o),
                (P.next_in = 0),
                (P.avail_in = P.input.length)
              do {
                if (
                  (P.avail_out === 0 &&
                    ((P.output = new d.Buf8(V)),
                    (P.next_out = 0),
                    (P.avail_out = V)),
                  (f = _.inflate(P, h.Z_NO_FLUSH)) === h.Z_NEED_DICT &&
                    z &&
                    ((W =
                      typeof z == 'string'
                        ? s.string2buf(z)
                        : L.call(z) === '[object ArrayBuffer]'
                        ? new Uint8Array(z)
                        : z),
                    (f = _.inflateSetDictionary(this.strm, W))),
                  f === h.Z_BUF_ERROR && Z === !0 && ((f = h.Z_OK), (Z = !1)),
                  f !== h.Z_STREAM_END && f !== h.Z_OK)
                )
                  return this.onEnd(f), !(this.ended = !0)
                P.next_out &&
                  ((P.avail_out !== 0 &&
                    f !== h.Z_STREAM_END &&
                    (P.avail_in !== 0 ||
                      (E !== h.Z_FINISH && E !== h.Z_SYNC_FLUSH))) ||
                    (this.options.to === 'string'
                      ? ((U = s.utf8border(P.output, P.next_out)),
                        (x = P.next_out - U),
                        (F = s.buf2string(P.output, U)),
                        (P.next_out = x),
                        (P.avail_out = V - x),
                        x && d.arraySet(P.output, P.output, U, x, 0),
                        this.onData(F))
                      : this.onData(d.shrinkBuf(P.output, P.next_out)))),
                  P.avail_in === 0 && P.avail_out === 0 && (Z = !0)
              } while (
                (0 < P.avail_in || P.avail_out === 0) &&
                f !== h.Z_STREAM_END
              )
              return (
                f === h.Z_STREAM_END && (E = h.Z_FINISH),
                E === h.Z_FINISH
                  ? ((f = _.inflateEnd(this.strm)),
                    this.onEnd(f),
                    (this.ended = !0),
                    f === h.Z_OK)
                  : E !== h.Z_SYNC_FLUSH ||
                    (this.onEnd(h.Z_OK), !(P.avail_out = 0))
              )
            }),
              (l.prototype.onData = function (o) {
                this.chunks.push(o)
              }),
              (l.prototype.onEnd = function (o) {
                o === h.Z_OK &&
                  (this.options.to === 'string'
                    ? (this.result = this.chunks.join(''))
                    : (this.result = d.flattenChunks(this.chunks))),
                  (this.chunks = []),
                  (this.err = o),
                  (this.msg = this.strm.msg)
              }),
              (v.Inflate = l),
              (v.inflate = N),
              (v.inflateRaw = function (o, p) {
                return ((p = p || {}).raw = !0), N(o, p)
              }),
              (v.ungzip = N)
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
          function (g, B, v) {
            var _ =
              typeof Uint8Array < 'u' &&
              typeof Uint16Array < 'u' &&
              typeof Int32Array < 'u'
            ;(v.assign = function (h) {
              for (
                var r = Array.prototype.slice.call(arguments, 1);
                r.length;

              ) {
                var T = r.shift()
                if (T) {
                  if (typeof T != 'object')
                    throw new TypeError(T + 'must be non-object')
                  for (var y in T) T.hasOwnProperty(y) && (h[y] = T[y])
                }
              }
              return h
            }),
              (v.shrinkBuf = function (h, r) {
                return h.length === r
                  ? h
                  : h.subarray
                  ? h.subarray(0, r)
                  : ((h.length = r), h)
              })
            var d = {
                arraySet: function (h, r, T, y, L) {
                  if (r.subarray && h.subarray) h.set(r.subarray(T, T + y), L)
                  else for (var l = 0; l < y; l++) h[L + l] = r[T + l]
                },
                flattenChunks: function (h) {
                  var r, T, y, L, l, N
                  for (r = y = 0, T = h.length; r < T; r++) y += h[r].length
                  for (
                    N = new Uint8Array(y), r = L = 0, T = h.length;
                    r < T;
                    r++
                  )
                    (l = h[r]), N.set(l, L), (L += l.length)
                  return N
                }
              },
              s = {
                arraySet: function (h, r, T, y, L) {
                  for (var l = 0; l < y; l++) h[L + l] = r[T + l]
                },
                flattenChunks: function (h) {
                  return [].concat.apply([], h)
                }
              }
            ;(v.setTyped = function (h) {
              h
                ? ((v.Buf8 = Uint8Array),
                  (v.Buf16 = Uint16Array),
                  (v.Buf32 = Int32Array),
                  v.assign(v, d))
                : ((v.Buf8 = Array),
                  (v.Buf16 = Array),
                  (v.Buf32 = Array),
                  v.assign(v, s))
            }),
              v.setTyped(_)
          },
          {}
        ],
        42: [
          function (g, B, v) {
            var _ = g('./common'),
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
            for (var h = new _.Buf8(256), r = 0; r < 256; r++)
              h[r] =
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
            function T(y, L) {
              if (L < 65537 && ((y.subarray && s) || (!y.subarray && d)))
                return String.fromCharCode.apply(null, _.shrinkBuf(y, L))
              for (var l = '', N = 0; N < L; N++) l += String.fromCharCode(y[N])
              return l
            }
            ;(h[254] = h[254] = 1),
              (v.string2buf = function (y) {
                var L,
                  l,
                  N,
                  o,
                  p,
                  f = y.length,
                  E = 0
                for (o = 0; o < f; o++)
                  (64512 & (l = y.charCodeAt(o))) == 55296 &&
                    o + 1 < f &&
                    (64512 & (N = y.charCodeAt(o + 1))) == 56320 &&
                    ((l = 65536 + ((l - 55296) << 10) + (N - 56320)), o++),
                    (E += l < 128 ? 1 : l < 2048 ? 2 : l < 65536 ? 3 : 4)
                for (L = new _.Buf8(E), o = p = 0; p < E; o++)
                  (64512 & (l = y.charCodeAt(o))) == 55296 &&
                    o + 1 < f &&
                    (64512 & (N = y.charCodeAt(o + 1))) == 56320 &&
                    ((l = 65536 + ((l - 55296) << 10) + (N - 56320)), o++),
                    l < 128
                      ? (L[p++] = l)
                      : (l < 2048
                          ? (L[p++] = 192 | (l >>> 6))
                          : (l < 65536
                              ? (L[p++] = 224 | (l >>> 12))
                              : ((L[p++] = 240 | (l >>> 18)),
                                (L[p++] = 128 | ((l >>> 12) & 63))),
                            (L[p++] = 128 | ((l >>> 6) & 63))),
                        (L[p++] = 128 | (63 & l)))
                return L
              }),
              (v.buf2binstring = function (y) {
                return T(y, y.length)
              }),
              (v.binstring2buf = function (y) {
                for (
                  var L = new _.Buf8(y.length), l = 0, N = L.length;
                  l < N;
                  l++
                )
                  L[l] = y.charCodeAt(l)
                return L
              }),
              (v.buf2string = function (y, L) {
                var l,
                  N,
                  o,
                  p,
                  f = L || y.length,
                  E = new Array(2 * f)
                for (l = N = 0; l < f; )
                  if ((o = y[l++]) < 128) E[N++] = o
                  else if (4 < (p = h[o])) (E[N++] = 65533), (l += p - 1)
                  else {
                    for (o &= p === 2 ? 31 : p === 3 ? 15 : 7; 1 < p && l < f; )
                      (o = (o << 6) | (63 & y[l++])), p--
                    1 < p
                      ? (E[N++] = 65533)
                      : o < 65536
                      ? (E[N++] = o)
                      : ((o -= 65536),
                        (E[N++] = 55296 | ((o >> 10) & 1023)),
                        (E[N++] = 56320 | (1023 & o)))
                  }
                return T(E, N)
              }),
              (v.utf8border = function (y, L) {
                var l
                for (
                  (L = L || y.length) > y.length && (L = y.length), l = L - 1;
                  0 <= l && (192 & y[l]) == 128;

                )
                  l--
                return l < 0 || l === 0 ? L : l + h[y[l]] > L ? l : L
              })
          },
          { './common': 41 }
        ],
        43: [
          function (g, B, v) {
            B.exports = function (_, d, s, h) {
              for (
                var r = (65535 & _) | 0, T = ((_ >>> 16) & 65535) | 0, y = 0;
                s !== 0;

              ) {
                for (
                  s -= y = 2e3 < s ? 2e3 : s;
                  (T = (T + (r = (r + d[h++]) | 0)) | 0), --y;

                );
                ;(r %= 65521), (T %= 65521)
              }
              return r | (T << 16) | 0
            }
          },
          {}
        ],
        44: [
          function (g, B, v) {
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
          function (g, B, v) {
            var _ = (function () {
              for (var d, s = [], h = 0; h < 256; h++) {
                d = h
                for (var r = 0; r < 8; r++)
                  d = 1 & d ? 3988292384 ^ (d >>> 1) : d >>> 1
                s[h] = d
              }
              return s
            })()
            B.exports = function (d, s, h, r) {
              var T = _,
                y = r + h
              d ^= -1
              for (var L = r; L < y; L++) d = (d >>> 8) ^ T[255 & (d ^ s[L])]
              return -1 ^ d
            }
          },
          {}
        ],
        46: [
          function (g, B, v) {
            var _,
              d = g('../utils/common'),
              s = g('./trees'),
              h = g('./adler32'),
              r = g('./crc32'),
              T = g('./messages'),
              y = 0,
              L = 4,
              l = 0,
              N = -2,
              o = -1,
              p = 4,
              f = 2,
              E = 8,
              U = 9,
              x = 286,
              F = 30,
              W = 19,
              P = 2 * x + 1,
              V = 15,
              z = 3,
              Z = 258,
              ut = Z + z + 1,
              w = 42,
              I = 113,
              i = 1,
              A = 2,
              tt = 3,
              k = 4
            function et(n, X) {
              return (n.msg = T[X]), X
            }
            function M(n) {
              return (n << 1) - (4 < n ? 9 : 0)
            }
            function H(n) {
              for (var X = n.length; 0 <= --X; ) n[X] = 0
            }
            function O(n) {
              var X = n.state,
                G = X.pending
              G > n.avail_out && (G = n.avail_out),
                G !== 0 &&
                  (d.arraySet(
                    n.output,
                    X.pending_buf,
                    X.pending_out,
                    G,
                    n.next_out
                  ),
                  (n.next_out += G),
                  (X.pending_out += G),
                  (n.total_out += G),
                  (n.avail_out -= G),
                  (X.pending -= G),
                  X.pending === 0 && (X.pending_out = 0))
            }
            function D(n, X) {
              s._tr_flush_block(
                n,
                0 <= n.block_start ? n.block_start : -1,
                n.strstart - n.block_start,
                X
              ),
                (n.block_start = n.strstart),
                O(n.strm)
            }
            function st(n, X) {
              n.pending_buf[n.pending++] = X
            }
            function it(n, X) {
              ;(n.pending_buf[n.pending++] = (X >>> 8) & 255),
                (n.pending_buf[n.pending++] = 255 & X)
            }
            function Q(n, X) {
              var G,
                m,
                u = n.max_chain_length,
                S = n.strstart,
                K = n.prev_length,
                Y = n.nice_match,
                C =
                  n.strstart > n.w_size - ut ? n.strstart - (n.w_size - ut) : 0,
                rt = n.window,
                at = n.w_mask,
                nt = n.prev,
                lt = n.strstart + Z,
                Tt = rt[S + K - 1],
                Nt = rt[S + K]
              n.prev_length >= n.good_match && (u >>= 2),
                Y > n.lookahead && (Y = n.lookahead)
              do
                if (
                  rt[(G = X) + K] === Nt &&
                  rt[G + K - 1] === Tt &&
                  rt[G] === rt[S] &&
                  rt[++G] === rt[S + 1]
                ) {
                  ;(S += 2), G++
                  do;
                  while (
                    rt[++S] === rt[++G] &&
                    rt[++S] === rt[++G] &&
                    rt[++S] === rt[++G] &&
                    rt[++S] === rt[++G] &&
                    rt[++S] === rt[++G] &&
                    rt[++S] === rt[++G] &&
                    rt[++S] === rt[++G] &&
                    rt[++S] === rt[++G] &&
                    S < lt
                  )
                  if (((m = Z - (lt - S)), (S = lt - Z), K < m)) {
                    if (((n.match_start = X), Y <= (K = m))) break
                    ;(Tt = rt[S + K - 1]), (Nt = rt[S + K])
                  }
                }
              while ((X = nt[X & at]) > C && --u != 0)
              return K <= n.lookahead ? K : n.lookahead
            }
            function vt(n) {
              var X,
                G,
                m,
                u,
                S,
                K,
                Y,
                C,
                rt,
                at,
                nt = n.w_size
              do {
                if (
                  ((u = n.window_size - n.lookahead - n.strstart),
                  n.strstart >= nt + (nt - ut))
                ) {
                  for (
                    d.arraySet(n.window, n.window, nt, nt, 0),
                      n.match_start -= nt,
                      n.strstart -= nt,
                      n.block_start -= nt,
                      X = G = n.hash_size;
                    (m = n.head[--X]), (n.head[X] = nt <= m ? m - nt : 0), --G;

                  );
                  for (
                    X = G = nt;
                    (m = n.prev[--X]), (n.prev[X] = nt <= m ? m - nt : 0), --G;

                  );
                  u += nt
                }
                if (n.strm.avail_in === 0) break
                if (
                  ((K = n.strm),
                  (Y = n.window),
                  (C = n.strstart + n.lookahead),
                  (rt = u),
                  (at = void 0),
                  (at = K.avail_in),
                  rt < at && (at = rt),
                  (G =
                    at === 0
                      ? 0
                      : ((K.avail_in -= at),
                        d.arraySet(Y, K.input, K.next_in, at, C),
                        K.state.wrap === 1
                          ? (K.adler = h(K.adler, Y, at, C))
                          : K.state.wrap === 2 &&
                            (K.adler = r(K.adler, Y, at, C)),
                        (K.next_in += at),
                        (K.total_in += at),
                        at)),
                  (n.lookahead += G),
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
              } while (n.lookahead < ut && n.strm.avail_in !== 0)
            }
            function St(n, X) {
              for (var G, m; ; ) {
                if (n.lookahead < ut) {
                  if ((vt(n), n.lookahead < ut && X === y)) return i
                  if (n.lookahead === 0) break
                }
                if (
                  ((G = 0),
                  n.lookahead >= z &&
                    ((n.ins_h =
                      ((n.ins_h << n.hash_shift) ^
                        n.window[n.strstart + z - 1]) &
                      n.hash_mask),
                    (G = n.prev[n.strstart & n.w_mask] = n.head[n.ins_h]),
                    (n.head[n.ins_h] = n.strstart)),
                  G !== 0 &&
                    n.strstart - G <= n.w_size - ut &&
                    (n.match_length = Q(n, G)),
                  n.match_length >= z)
                )
                  if (
                    ((m = s._tr_tally(
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
                        (G = n.prev[n.strstart & n.w_mask] = n.head[n.ins_h]),
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
                  (m = s._tr_tally(n, 0, n.window[n.strstart])),
                    n.lookahead--,
                    n.strstart++
                if (m && (D(n, !1), n.strm.avail_out === 0)) return i
              }
              return (
                (n.insert = n.strstart < z - 1 ? n.strstart : z - 1),
                X === L
                  ? (D(n, !0), n.strm.avail_out === 0 ? tt : k)
                  : n.last_lit && (D(n, !1), n.strm.avail_out === 0)
                  ? i
                  : A
              )
            }
            function pt(n, X) {
              for (var G, m, u; ; ) {
                if (n.lookahead < ut) {
                  if ((vt(n), n.lookahead < ut && X === y)) return i
                  if (n.lookahead === 0) break
                }
                if (
                  ((G = 0),
                  n.lookahead >= z &&
                    ((n.ins_h =
                      ((n.ins_h << n.hash_shift) ^
                        n.window[n.strstart + z - 1]) &
                      n.hash_mask),
                    (G = n.prev[n.strstart & n.w_mask] = n.head[n.ins_h]),
                    (n.head[n.ins_h] = n.strstart)),
                  (n.prev_length = n.match_length),
                  (n.prev_match = n.match_start),
                  (n.match_length = z - 1),
                  G !== 0 &&
                    n.prev_length < n.max_lazy_match &&
                    n.strstart - G <= n.w_size - ut &&
                    ((n.match_length = Q(n, G)),
                    n.match_length <= 5 &&
                      (n.strategy === 1 ||
                        (n.match_length === z &&
                          4096 < n.strstart - n.match_start)) &&
                      (n.match_length = z - 1)),
                  n.prev_length >= z && n.match_length <= n.prev_length)
                ) {
                  for (
                    u = n.strstart + n.lookahead - z,
                      m = s._tr_tally(
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
                      (G = n.prev[n.strstart & n.w_mask] = n.head[n.ins_h]),
                      (n.head[n.ins_h] = n.strstart)),
                      --n.prev_length != 0;

                  );
                  if (
                    ((n.match_available = 0),
                    (n.match_length = z - 1),
                    n.strstart++,
                    m && (D(n, !1), n.strm.avail_out === 0))
                  )
                    return i
                } else if (n.match_available) {
                  if (
                    ((m = s._tr_tally(n, 0, n.window[n.strstart - 1])) &&
                      D(n, !1),
                    n.strstart++,
                    n.lookahead--,
                    n.strm.avail_out === 0)
                  )
                    return i
                } else (n.match_available = 1), n.strstart++, n.lookahead--
              }
              return (
                n.match_available &&
                  ((m = s._tr_tally(n, 0, n.window[n.strstart - 1])),
                  (n.match_available = 0)),
                (n.insert = n.strstart < z - 1 ? n.strstart : z - 1),
                X === L
                  ? (D(n, !0), n.strm.avail_out === 0 ? tt : k)
                  : n.last_lit && (D(n, !1), n.strm.avail_out === 0)
                  ? i
                  : A
              )
            }
            function ft(n, X, G, m, u) {
              ;(this.good_length = n),
                (this.max_lazy = X),
                (this.nice_length = G),
                (this.max_chain = m),
                (this.func = u)
            }
            function Et() {
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
                (this.dyn_ltree = new d.Buf16(2 * P)),
                (this.dyn_dtree = new d.Buf16(2 * (2 * F + 1))),
                (this.bl_tree = new d.Buf16(2 * (2 * W + 1))),
                H(this.dyn_ltree),
                H(this.dyn_dtree),
                H(this.bl_tree),
                (this.l_desc = null),
                (this.d_desc = null),
                (this.bl_desc = null),
                (this.bl_count = new d.Buf16(V + 1)),
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
            function bt(n) {
              var X
              return n && n.state
                ? ((n.total_in = n.total_out = 0),
                  (n.data_type = f),
                  ((X = n.state).pending = 0),
                  (X.pending_out = 0),
                  X.wrap < 0 && (X.wrap = -X.wrap),
                  (X.status = X.wrap ? w : I),
                  (n.adler = X.wrap === 2 ? 0 : 1),
                  (X.last_flush = y),
                  s._tr_init(X),
                  l)
                : et(n, N)
            }
            function At(n) {
              var X = bt(n)
              return (
                X === l &&
                  (function (G) {
                    ;(G.window_size = 2 * G.w_size),
                      H(G.head),
                      (G.max_lazy_match = _[G.level].max_lazy),
                      (G.good_match = _[G.level].good_length),
                      (G.nice_match = _[G.level].nice_length),
                      (G.max_chain_length = _[G.level].max_chain),
                      (G.strstart = 0),
                      (G.block_start = 0),
                      (G.lookahead = 0),
                      (G.insert = 0),
                      (G.match_length = G.prev_length = z - 1),
                      (G.match_available = 0),
                      (G.ins_h = 0)
                  })(n.state),
                X
              )
            }
            function Dt(n, X, G, m, u, S) {
              if (!n) return N
              var K = 1
              if (
                (X === o && (X = 6),
                m < 0 ? ((K = 0), (m = -m)) : 15 < m && ((K = 2), (m -= 16)),
                u < 1 ||
                  U < u ||
                  G !== E ||
                  m < 8 ||
                  15 < m ||
                  X < 0 ||
                  9 < X ||
                  S < 0 ||
                  p < S)
              )
                return et(n, N)
              m === 8 && (m = 9)
              var Y = new Et()
              return (
                ((n.state = Y).strm = n),
                (Y.wrap = K),
                (Y.gzhead = null),
                (Y.w_bits = m),
                (Y.w_size = 1 << Y.w_bits),
                (Y.w_mask = Y.w_size - 1),
                (Y.hash_bits = u + 7),
                (Y.hash_size = 1 << Y.hash_bits),
                (Y.hash_mask = Y.hash_size - 1),
                (Y.hash_shift = ~~((Y.hash_bits + z - 1) / z)),
                (Y.window = new d.Buf8(2 * Y.w_size)),
                (Y.head = new d.Buf16(Y.hash_size)),
                (Y.prev = new d.Buf16(Y.w_size)),
                (Y.lit_bufsize = 1 << (u + 6)),
                (Y.pending_buf_size = 4 * Y.lit_bufsize),
                (Y.pending_buf = new d.Buf8(Y.pending_buf_size)),
                (Y.d_buf = 1 * Y.lit_bufsize),
                (Y.l_buf = 3 * Y.lit_bufsize),
                (Y.level = X),
                (Y.strategy = S),
                (Y.method = G),
                At(n)
              )
            }
            ;(_ = [
              new ft(0, 0, 0, 0, function (n, X) {
                var G = 65535
                for (
                  G > n.pending_buf_size - 5 && (G = n.pending_buf_size - 5);
                  ;

                ) {
                  if (n.lookahead <= 1) {
                    if ((vt(n), n.lookahead === 0 && X === y)) return i
                    if (n.lookahead === 0) break
                  }
                  ;(n.strstart += n.lookahead), (n.lookahead = 0)
                  var m = n.block_start + G
                  if (
                    ((n.strstart === 0 || n.strstart >= m) &&
                      ((n.lookahead = n.strstart - m),
                      (n.strstart = m),
                      D(n, !1),
                      n.strm.avail_out === 0)) ||
                    (n.strstart - n.block_start >= n.w_size - ut &&
                      (D(n, !1), n.strm.avail_out === 0))
                  )
                    return i
                }
                return (
                  (n.insert = 0),
                  X === L
                    ? (D(n, !0), n.strm.avail_out === 0 ? tt : k)
                    : (n.strstart > n.block_start &&
                        (D(n, !1), n.strm.avail_out),
                      i)
                )
              }),
              new ft(4, 4, 8, 4, St),
              new ft(4, 5, 16, 8, St),
              new ft(4, 6, 32, 32, St),
              new ft(4, 4, 16, 16, pt),
              new ft(8, 16, 32, 32, pt),
              new ft(8, 16, 128, 128, pt),
              new ft(8, 32, 128, 256, pt),
              new ft(32, 128, 258, 1024, pt),
              new ft(32, 258, 258, 4096, pt)
            ]),
              (v.deflateInit = function (n, X) {
                return Dt(n, X, E, 15, 8, 0)
              }),
              (v.deflateInit2 = Dt),
              (v.deflateReset = At),
              (v.deflateResetKeep = bt),
              (v.deflateSetHeader = function (n, X) {
                return n && n.state
                  ? n.state.wrap !== 2
                    ? N
                    : ((n.state.gzhead = X), l)
                  : N
              }),
              (v.deflate = function (n, X) {
                var G, m, u, S
                if (!n || !n.state || 5 < X || X < 0) return n ? et(n, N) : N
                if (
                  ((m = n.state),
                  !n.output ||
                    (!n.input && n.avail_in !== 0) ||
                    (m.status === 666 && X !== L))
                )
                  return et(n, n.avail_out === 0 ? -5 : N)
                if (
                  ((m.strm = n),
                  (G = m.last_flush),
                  (m.last_flush = X),
                  m.status === w)
                )
                  if (m.wrap === 2)
                    (n.adler = 0),
                      st(m, 31),
                      st(m, 139),
                      st(m, 8),
                      m.gzhead
                        ? (st(
                            m,
                            (m.gzhead.text ? 1 : 0) +
                              (m.gzhead.hcrc ? 2 : 0) +
                              (m.gzhead.extra ? 4 : 0) +
                              (m.gzhead.name ? 8 : 0) +
                              (m.gzhead.comment ? 16 : 0)
                          ),
                          st(m, 255 & m.gzhead.time),
                          st(m, (m.gzhead.time >> 8) & 255),
                          st(m, (m.gzhead.time >> 16) & 255),
                          st(m, (m.gzhead.time >> 24) & 255),
                          st(
                            m,
                            m.level === 9
                              ? 2
                              : 2 <= m.strategy || m.level < 2
                              ? 4
                              : 0
                          ),
                          st(m, 255 & m.gzhead.os),
                          m.gzhead.extra &&
                            m.gzhead.extra.length &&
                            (st(m, 255 & m.gzhead.extra.length),
                            st(m, (m.gzhead.extra.length >> 8) & 255)),
                          m.gzhead.hcrc &&
                            (n.adler = r(n.adler, m.pending_buf, m.pending, 0)),
                          (m.gzindex = 0),
                          (m.status = 69))
                        : (st(m, 0),
                          st(m, 0),
                          st(m, 0),
                          st(m, 0),
                          st(m, 0),
                          st(
                            m,
                            m.level === 9
                              ? 2
                              : 2 <= m.strategy || m.level < 2
                              ? 4
                              : 0
                          ),
                          st(m, 3),
                          (m.status = I))
                  else {
                    var K = (E + ((m.w_bits - 8) << 4)) << 8
                    ;(K |=
                      (2 <= m.strategy || m.level < 2
                        ? 0
                        : m.level < 6
                        ? 1
                        : m.level === 6
                        ? 2
                        : 3) << 6),
                      m.strstart !== 0 && (K |= 32),
                      (K += 31 - (K % 31)),
                      (m.status = I),
                      it(m, K),
                      m.strstart !== 0 &&
                        (it(m, n.adler >>> 16), it(m, 65535 & n.adler)),
                      (n.adler = 1)
                  }
                if (m.status === 69)
                  if (m.gzhead.extra) {
                    for (
                      u = m.pending;
                      m.gzindex < (65535 & m.gzhead.extra.length) &&
                      (m.pending !== m.pending_buf_size ||
                        (m.gzhead.hcrc &&
                          m.pending > u &&
                          (n.adler = r(
                            n.adler,
                            m.pending_buf,
                            m.pending - u,
                            u
                          )),
                        O(n),
                        (u = m.pending),
                        m.pending !== m.pending_buf_size));

                    )
                      st(m, 255 & m.gzhead.extra[m.gzindex]), m.gzindex++
                    m.gzhead.hcrc &&
                      m.pending > u &&
                      (n.adler = r(n.adler, m.pending_buf, m.pending - u, u)),
                      m.gzindex === m.gzhead.extra.length &&
                        ((m.gzindex = 0), (m.status = 73))
                  } else m.status = 73
                if (m.status === 73)
                  if (m.gzhead.name) {
                    u = m.pending
                    do {
                      if (
                        m.pending === m.pending_buf_size &&
                        (m.gzhead.hcrc &&
                          m.pending > u &&
                          (n.adler = r(
                            n.adler,
                            m.pending_buf,
                            m.pending - u,
                            u
                          )),
                        O(n),
                        (u = m.pending),
                        m.pending === m.pending_buf_size)
                      ) {
                        S = 1
                        break
                      }
                      ;(S =
                        m.gzindex < m.gzhead.name.length
                          ? 255 & m.gzhead.name.charCodeAt(m.gzindex++)
                          : 0),
                        st(m, S)
                    } while (S !== 0)
                    m.gzhead.hcrc &&
                      m.pending > u &&
                      (n.adler = r(n.adler, m.pending_buf, m.pending - u, u)),
                      S === 0 && ((m.gzindex = 0), (m.status = 91))
                  } else m.status = 91
                if (m.status === 91)
                  if (m.gzhead.comment) {
                    u = m.pending
                    do {
                      if (
                        m.pending === m.pending_buf_size &&
                        (m.gzhead.hcrc &&
                          m.pending > u &&
                          (n.adler = r(
                            n.adler,
                            m.pending_buf,
                            m.pending - u,
                            u
                          )),
                        O(n),
                        (u = m.pending),
                        m.pending === m.pending_buf_size)
                      ) {
                        S = 1
                        break
                      }
                      ;(S =
                        m.gzindex < m.gzhead.comment.length
                          ? 255 & m.gzhead.comment.charCodeAt(m.gzindex++)
                          : 0),
                        st(m, S)
                    } while (S !== 0)
                    m.gzhead.hcrc &&
                      m.pending > u &&
                      (n.adler = r(n.adler, m.pending_buf, m.pending - u, u)),
                      S === 0 && (m.status = 103)
                  } else m.status = 103
                if (
                  (m.status === 103 &&
                    (m.gzhead.hcrc
                      ? (m.pending + 2 > m.pending_buf_size && O(n),
                        m.pending + 2 <= m.pending_buf_size &&
                          (st(m, 255 & n.adler),
                          st(m, (n.adler >> 8) & 255),
                          (n.adler = 0),
                          (m.status = I)))
                      : (m.status = I)),
                  m.pending !== 0)
                ) {
                  if ((O(n), n.avail_out === 0)) return (m.last_flush = -1), l
                } else if (n.avail_in === 0 && M(X) <= M(G) && X !== L)
                  return et(n, -5)
                if (m.status === 666 && n.avail_in !== 0) return et(n, -5)
                if (
                  n.avail_in !== 0 ||
                  m.lookahead !== 0 ||
                  (X !== y && m.status !== 666)
                ) {
                  var Y =
                    m.strategy === 2
                      ? (function (C, rt) {
                          for (var at; ; ) {
                            if (
                              C.lookahead === 0 &&
                              (vt(C), C.lookahead === 0)
                            ) {
                              if (rt === y) return i
                              break
                            }
                            if (
                              ((C.match_length = 0),
                              (at = s._tr_tally(C, 0, C.window[C.strstart])),
                              C.lookahead--,
                              C.strstart++,
                              at && (D(C, !1), C.strm.avail_out === 0))
                            )
                              return i
                          }
                          return (
                            (C.insert = 0),
                            rt === L
                              ? (D(C, !0), C.strm.avail_out === 0 ? tt : k)
                              : C.last_lit && (D(C, !1), C.strm.avail_out === 0)
                              ? i
                              : A
                          )
                        })(m, X)
                      : m.strategy === 3
                      ? (function (C, rt) {
                          for (var at, nt, lt, Tt, Nt = C.window; ; ) {
                            if (C.lookahead <= Z) {
                              if ((vt(C), C.lookahead <= Z && rt === y))
                                return i
                              if (C.lookahead === 0) break
                            }
                            if (
                              ((C.match_length = 0),
                              C.lookahead >= z &&
                                0 < C.strstart &&
                                (nt = Nt[(lt = C.strstart - 1)]) === Nt[++lt] &&
                                nt === Nt[++lt] &&
                                nt === Nt[++lt])
                            ) {
                              Tt = C.strstart + Z
                              do;
                              while (
                                nt === Nt[++lt] &&
                                nt === Nt[++lt] &&
                                nt === Nt[++lt] &&
                                nt === Nt[++lt] &&
                                nt === Nt[++lt] &&
                                nt === Nt[++lt] &&
                                nt === Nt[++lt] &&
                                nt === Nt[++lt] &&
                                lt < Tt
                              )
                              ;(C.match_length = Z - (Tt - lt)),
                                C.match_length > C.lookahead &&
                                  (C.match_length = C.lookahead)
                            }
                            if (
                              (C.match_length >= z
                                ? ((at = s._tr_tally(C, 1, C.match_length - z)),
                                  (C.lookahead -= C.match_length),
                                  (C.strstart += C.match_length),
                                  (C.match_length = 0))
                                : ((at = s._tr_tally(
                                    C,
                                    0,
                                    C.window[C.strstart]
                                  )),
                                  C.lookahead--,
                                  C.strstart++),
                              at && (D(C, !1), C.strm.avail_out === 0))
                            )
                              return i
                          }
                          return (
                            (C.insert = 0),
                            rt === L
                              ? (D(C, !0), C.strm.avail_out === 0 ? tt : k)
                              : C.last_lit && (D(C, !1), C.strm.avail_out === 0)
                              ? i
                              : A
                          )
                        })(m, X)
                      : _[m.level].func(m, X)
                  if (
                    ((Y !== tt && Y !== k) || (m.status = 666),
                    Y === i || Y === tt)
                  )
                    return n.avail_out === 0 && (m.last_flush = -1), l
                  if (
                    Y === A &&
                    (X === 1
                      ? s._tr_align(m)
                      : X !== 5 &&
                        (s._tr_stored_block(m, 0, 0, !1),
                        X === 3 &&
                          (H(m.head),
                          m.lookahead === 0 &&
                            ((m.strstart = 0),
                            (m.block_start = 0),
                            (m.insert = 0)))),
                    O(n),
                    n.avail_out === 0)
                  )
                    return (m.last_flush = -1), l
                }
                return X !== L
                  ? l
                  : m.wrap <= 0
                  ? 1
                  : (m.wrap === 2
                      ? (st(m, 255 & n.adler),
                        st(m, (n.adler >> 8) & 255),
                        st(m, (n.adler >> 16) & 255),
                        st(m, (n.adler >> 24) & 255),
                        st(m, 255 & n.total_in),
                        st(m, (n.total_in >> 8) & 255),
                        st(m, (n.total_in >> 16) & 255),
                        st(m, (n.total_in >> 24) & 255))
                      : (it(m, n.adler >>> 16), it(m, 65535 & n.adler)),
                    O(n),
                    0 < m.wrap && (m.wrap = -m.wrap),
                    m.pending !== 0 ? l : 1)
              }),
              (v.deflateEnd = function (n) {
                var X
                return n && n.state
                  ? (X = n.state.status) !== w &&
                    X !== 69 &&
                    X !== 73 &&
                    X !== 91 &&
                    X !== 103 &&
                    X !== I &&
                    X !== 666
                    ? et(n, N)
                    : ((n.state = null), X === I ? et(n, -3) : l)
                  : N
              }),
              (v.deflateSetDictionary = function (n, X) {
                var G,
                  m,
                  u,
                  S,
                  K,
                  Y,
                  C,
                  rt,
                  at = X.length
                if (
                  !n ||
                  !n.state ||
                  (S = (G = n.state).wrap) === 2 ||
                  (S === 1 && G.status !== w) ||
                  G.lookahead
                )
                  return N
                for (
                  S === 1 && (n.adler = h(n.adler, X, at, 0)),
                    G.wrap = 0,
                    at >= G.w_size &&
                      (S === 0 &&
                        (H(G.head),
                        (G.strstart = 0),
                        (G.block_start = 0),
                        (G.insert = 0)),
                      (rt = new d.Buf8(G.w_size)),
                      d.arraySet(rt, X, at - G.w_size, G.w_size, 0),
                      (X = rt),
                      (at = G.w_size)),
                    K = n.avail_in,
                    Y = n.next_in,
                    C = n.input,
                    n.avail_in = at,
                    n.next_in = 0,
                    n.input = X,
                    vt(G);
                  G.lookahead >= z;

                ) {
                  for (
                    m = G.strstart, u = G.lookahead - (z - 1);
                    (G.ins_h =
                      ((G.ins_h << G.hash_shift) ^ G.window[m + z - 1]) &
                      G.hash_mask),
                      (G.prev[m & G.w_mask] = G.head[G.ins_h]),
                      (G.head[G.ins_h] = m),
                      m++,
                      --u;

                  );
                  ;(G.strstart = m), (G.lookahead = z - 1), vt(G)
                }
                return (
                  (G.strstart += G.lookahead),
                  (G.block_start = G.strstart),
                  (G.insert = G.lookahead),
                  (G.lookahead = 0),
                  (G.match_length = G.prev_length = z - 1),
                  (G.match_available = 0),
                  (n.next_in = Y),
                  (n.input = C),
                  (n.avail_in = K),
                  (G.wrap = S),
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
          function (g, B, v) {
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
          function (g, B, v) {
            B.exports = function (_, d) {
              var s,
                h,
                r,
                T,
                y,
                L,
                l,
                N,
                o,
                p,
                f,
                E,
                U,
                x,
                F,
                W,
                P,
                V,
                z,
                Z,
                ut,
                w,
                I,
                i,
                A
              ;(s = _.state),
                (h = _.next_in),
                (i = _.input),
                (r = h + (_.avail_in - 5)),
                (T = _.next_out),
                (A = _.output),
                (y = T - (d - _.avail_out)),
                (L = T + (_.avail_out - 257)),
                (l = s.dmax),
                (N = s.wsize),
                (o = s.whave),
                (p = s.wnext),
                (f = s.window),
                (E = s.hold),
                (U = s.bits),
                (x = s.lencode),
                (F = s.distcode),
                (W = (1 << s.lenbits) - 1),
                (P = (1 << s.distbits) - 1)
              t: do {
                U < 15 &&
                  ((E += i[h++] << U), (U += 8), (E += i[h++] << U), (U += 8)),
                  (V = x[E & W])
                e: for (;;) {
                  if (
                    ((E >>>= z = V >>> 24),
                    (U -= z),
                    (z = (V >>> 16) & 255) === 0)
                  )
                    A[T++] = 65535 & V
                  else {
                    if (!(16 & z)) {
                      if (!(64 & z)) {
                        V = x[(65535 & V) + (E & ((1 << z) - 1))]
                        continue e
                      }
                      if (32 & z) {
                        s.mode = 12
                        break t
                      }
                      ;(_.msg = 'invalid literal/length code'), (s.mode = 30)
                      break t
                    }
                    ;(Z = 65535 & V),
                      (z &= 15) &&
                        (U < z && ((E += i[h++] << U), (U += 8)),
                        (Z += E & ((1 << z) - 1)),
                        (E >>>= z),
                        (U -= z)),
                      U < 15 &&
                        ((E += i[h++] << U),
                        (U += 8),
                        (E += i[h++] << U),
                        (U += 8)),
                      (V = F[E & P])
                    r: for (;;) {
                      if (
                        ((E >>>= z = V >>> 24),
                        (U -= z),
                        !(16 & (z = (V >>> 16) & 255)))
                      ) {
                        if (!(64 & z)) {
                          V = F[(65535 & V) + (E & ((1 << z) - 1))]
                          continue r
                        }
                        ;(_.msg = 'invalid distance code'), (s.mode = 30)
                        break t
                      }
                      if (
                        ((ut = 65535 & V),
                        U < (z &= 15) &&
                          ((E += i[h++] << U),
                          (U += 8) < z && ((E += i[h++] << U), (U += 8))),
                        l < (ut += E & ((1 << z) - 1)))
                      ) {
                        ;(_.msg = 'invalid distance too far back'),
                          (s.mode = 30)
                        break t
                      }
                      if (((E >>>= z), (U -= z), (z = T - y) < ut)) {
                        if (o < (z = ut - z) && s.sane) {
                          ;(_.msg = 'invalid distance too far back'),
                            (s.mode = 30)
                          break t
                        }
                        if (((I = f), (w = 0) === p)) {
                          if (((w += N - z), z < Z)) {
                            for (Z -= z; (A[T++] = f[w++]), --z; );
                            ;(w = T - ut), (I = A)
                          }
                        } else if (p < z) {
                          if (((w += N + p - z), (z -= p) < Z)) {
                            for (Z -= z; (A[T++] = f[w++]), --z; );
                            if (((w = 0), p < Z)) {
                              for (Z -= z = p; (A[T++] = f[w++]), --z; );
                              ;(w = T - ut), (I = A)
                            }
                          }
                        } else if (((w += p - z), z < Z)) {
                          for (Z -= z; (A[T++] = f[w++]), --z; );
                          ;(w = T - ut), (I = A)
                        }
                        for (; 2 < Z; )
                          (A[T++] = I[w++]),
                            (A[T++] = I[w++]),
                            (A[T++] = I[w++]),
                            (Z -= 3)
                        Z && ((A[T++] = I[w++]), 1 < Z && (A[T++] = I[w++]))
                      } else {
                        for (
                          w = T - ut;
                          (A[T++] = A[w++]),
                            (A[T++] = A[w++]),
                            (A[T++] = A[w++]),
                            2 < (Z -= 3);

                        );
                        Z && ((A[T++] = A[w++]), 1 < Z && (A[T++] = A[w++]))
                      }
                      break
                    }
                  }
                  break
                }
              } while (h < r && T < L)
              ;(h -= Z = U >> 3),
                (E &= (1 << (U -= Z << 3)) - 1),
                (_.next_in = h),
                (_.next_out = T),
                (_.avail_in = h < r ? r - h + 5 : 5 - (h - r)),
                (_.avail_out = T < L ? L - T + 257 : 257 - (T - L)),
                (s.hold = E),
                (s.bits = U)
            }
          },
          {}
        ],
        49: [
          function (g, B, v) {
            var _ = g('../utils/common'),
              d = g('./adler32'),
              s = g('./crc32'),
              h = g('./inffast'),
              r = g('./inftrees'),
              T = 1,
              y = 2,
              L = 0,
              l = -2,
              N = 1,
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
                (this.lens = new _.Buf16(320)),
                (this.work = new _.Buf16(288)),
                (this.lendyn = null),
                (this.distdyn = null),
                (this.sane = 0),
                (this.back = 0),
                (this.was = 0)
            }
            function U(w) {
              var I
              return w && w.state
                ? ((I = w.state),
                  (w.total_in = w.total_out = I.total = 0),
                  (w.msg = ''),
                  I.wrap && (w.adler = 1 & I.wrap),
                  (I.mode = N),
                  (I.last = 0),
                  (I.havedict = 0),
                  (I.dmax = 32768),
                  (I.head = null),
                  (I.hold = 0),
                  (I.bits = 0),
                  (I.lencode = I.lendyn = new _.Buf32(o)),
                  (I.distcode = I.distdyn = new _.Buf32(p)),
                  (I.sane = 1),
                  (I.back = -1),
                  L)
                : l
            }
            function x(w) {
              var I
              return w && w.state
                ? (((I = w.state).wsize = 0),
                  (I.whave = 0),
                  (I.wnext = 0),
                  U(w))
                : l
            }
            function F(w, I) {
              var i, A
              return w && w.state
                ? ((A = w.state),
                  I < 0
                    ? ((i = 0), (I = -I))
                    : ((i = 1 + (I >> 4)), I < 48 && (I &= 15)),
                  I && (I < 8 || 15 < I)
                    ? l
                    : (A.window !== null && A.wbits !== I && (A.window = null),
                      (A.wrap = i),
                      (A.wbits = I),
                      x(w)))
                : l
            }
            function W(w, I) {
              var i, A
              return w
                ? ((A = new E()),
                  ((w.state = A).window = null),
                  (i = F(w, I)) !== L && (w.state = null),
                  i)
                : l
            }
            var P,
              V,
              z = !0
            function Z(w) {
              if (z) {
                var I
                for (
                  P = new _.Buf32(512), V = new _.Buf32(32), I = 0;
                  I < 144;

                )
                  w.lens[I++] = 8
                for (; I < 256; ) w.lens[I++] = 9
                for (; I < 280; ) w.lens[I++] = 7
                for (; I < 288; ) w.lens[I++] = 8
                for (
                  r(T, w.lens, 0, 288, P, 0, w.work, { bits: 9 }), I = 0;
                  I < 32;

                )
                  w.lens[I++] = 5
                r(y, w.lens, 0, 32, V, 0, w.work, { bits: 5 }), (z = !1)
              }
              ;(w.lencode = P),
                (w.lenbits = 9),
                (w.distcode = V),
                (w.distbits = 5)
            }
            function ut(w, I, i, A) {
              var tt,
                k = w.state
              return (
                k.window === null &&
                  ((k.wsize = 1 << k.wbits),
                  (k.wnext = 0),
                  (k.whave = 0),
                  (k.window = new _.Buf8(k.wsize))),
                A >= k.wsize
                  ? (_.arraySet(k.window, I, i - k.wsize, k.wsize, 0),
                    (k.wnext = 0),
                    (k.whave = k.wsize))
                  : (A < (tt = k.wsize - k.wnext) && (tt = A),
                    _.arraySet(k.window, I, i - A, tt, k.wnext),
                    (A -= tt)
                      ? (_.arraySet(k.window, I, i - A, A, 0),
                        (k.wnext = A),
                        (k.whave = k.wsize))
                      : ((k.wnext += tt),
                        k.wnext === k.wsize && (k.wnext = 0),
                        k.whave < k.wsize && (k.whave += tt))),
                0
              )
            }
            ;(v.inflateReset = x),
              (v.inflateReset2 = F),
              (v.inflateResetKeep = U),
              (v.inflateInit = function (w) {
                return W(w, 15)
              }),
              (v.inflateInit2 = W),
              (v.inflate = function (w, I) {
                var i,
                  A,
                  tt,
                  k,
                  et,
                  M,
                  H,
                  O,
                  D,
                  st,
                  it,
                  Q,
                  vt,
                  St,
                  pt,
                  ft,
                  Et,
                  bt,
                  At,
                  Dt,
                  n,
                  X,
                  G,
                  m,
                  u = 0,
                  S = new _.Buf8(4),
                  K = [
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
                  (et = w.next_out),
                  (tt = w.output),
                  (H = w.avail_out),
                  (k = w.next_in),
                  (A = w.input),
                  (M = w.avail_in),
                  (O = i.hold),
                  (D = i.bits),
                  (st = M),
                  (it = H),
                  (X = L)
                t: for (;;)
                  switch (i.mode) {
                    case N:
                      if (i.wrap === 0) {
                        i.mode = 13
                        break
                      }
                      for (; D < 16; ) {
                        if (M === 0) break t
                        M--, (O += A[k++] << D), (D += 8)
                      }
                      if (2 & i.wrap && O === 35615) {
                        ;(S[(i.check = 0)] = 255 & O),
                          (S[1] = (O >>> 8) & 255),
                          (i.check = s(i.check, S, 2, 0)),
                          (D = O = 0),
                          (i.mode = 2)
                        break
                      }
                      if (
                        ((i.flags = 0),
                        i.head && (i.head.done = !1),
                        !(1 & i.wrap) || (((255 & O) << 8) + (O >> 8)) % 31)
                      ) {
                        ;(w.msg = 'incorrect header check'), (i.mode = 30)
                        break
                      }
                      if ((15 & O) != 8) {
                        ;(w.msg = 'unknown compression method'), (i.mode = 30)
                        break
                      }
                      if (
                        ((D -= 4), (n = 8 + (15 & (O >>>= 4))), i.wbits === 0)
                      )
                        i.wbits = n
                      else if (n > i.wbits) {
                        ;(w.msg = 'invalid window size'), (i.mode = 30)
                        break
                      }
                      ;(i.dmax = 1 << n),
                        (w.adler = i.check = 1),
                        (i.mode = 512 & O ? 10 : 12),
                        (D = O = 0)
                      break
                    case 2:
                      for (; D < 16; ) {
                        if (M === 0) break t
                        M--, (O += A[k++] << D), (D += 8)
                      }
                      if (((i.flags = O), (255 & i.flags) != 8)) {
                        ;(w.msg = 'unknown compression method'), (i.mode = 30)
                        break
                      }
                      if (57344 & i.flags) {
                        ;(w.msg = 'unknown header flags set'), (i.mode = 30)
                        break
                      }
                      i.head && (i.head.text = (O >> 8) & 1),
                        512 & i.flags &&
                          ((S[0] = 255 & O),
                          (S[1] = (O >>> 8) & 255),
                          (i.check = s(i.check, S, 2, 0))),
                        (D = O = 0),
                        (i.mode = 3)
                    case 3:
                      for (; D < 32; ) {
                        if (M === 0) break t
                        M--, (O += A[k++] << D), (D += 8)
                      }
                      i.head && (i.head.time = O),
                        512 & i.flags &&
                          ((S[0] = 255 & O),
                          (S[1] = (O >>> 8) & 255),
                          (S[2] = (O >>> 16) & 255),
                          (S[3] = (O >>> 24) & 255),
                          (i.check = s(i.check, S, 4, 0))),
                        (D = O = 0),
                        (i.mode = 4)
                    case 4:
                      for (; D < 16; ) {
                        if (M === 0) break t
                        M--, (O += A[k++] << D), (D += 8)
                      }
                      i.head &&
                        ((i.head.xflags = 255 & O), (i.head.os = O >> 8)),
                        512 & i.flags &&
                          ((S[0] = 255 & O),
                          (S[1] = (O >>> 8) & 255),
                          (i.check = s(i.check, S, 2, 0))),
                        (D = O = 0),
                        (i.mode = 5)
                    case 5:
                      if (1024 & i.flags) {
                        for (; D < 16; ) {
                          if (M === 0) break t
                          M--, (O += A[k++] << D), (D += 8)
                        }
                        ;(i.length = O),
                          i.head && (i.head.extra_len = O),
                          512 & i.flags &&
                            ((S[0] = 255 & O),
                            (S[1] = (O >>> 8) & 255),
                            (i.check = s(i.check, S, 2, 0))),
                          (D = O = 0)
                      } else i.head && (i.head.extra = null)
                      i.mode = 6
                    case 6:
                      if (
                        1024 & i.flags &&
                        (M < (Q = i.length) && (Q = M),
                        Q &&
                          (i.head &&
                            ((n = i.head.extra_len - i.length),
                            i.head.extra ||
                              (i.head.extra = new Array(i.head.extra_len)),
                            _.arraySet(i.head.extra, A, k, Q, n)),
                          512 & i.flags && (i.check = s(i.check, A, Q, k)),
                          (M -= Q),
                          (k += Q),
                          (i.length -= Q)),
                        i.length)
                      )
                        break t
                      ;(i.length = 0), (i.mode = 7)
                    case 7:
                      if (2048 & i.flags) {
                        if (M === 0) break t
                        for (
                          Q = 0;
                          (n = A[k + Q++]),
                            i.head &&
                              n &&
                              i.length < 65536 &&
                              (i.head.name += String.fromCharCode(n)),
                            n && Q < M;

                        );
                        if (
                          (512 & i.flags && (i.check = s(i.check, A, Q, k)),
                          (M -= Q),
                          (k += Q),
                          n)
                        )
                          break t
                      } else i.head && (i.head.name = null)
                      ;(i.length = 0), (i.mode = 8)
                    case 8:
                      if (4096 & i.flags) {
                        if (M === 0) break t
                        for (
                          Q = 0;
                          (n = A[k + Q++]),
                            i.head &&
                              n &&
                              i.length < 65536 &&
                              (i.head.comment += String.fromCharCode(n)),
                            n && Q < M;

                        );
                        if (
                          (512 & i.flags && (i.check = s(i.check, A, Q, k)),
                          (M -= Q),
                          (k += Q),
                          n)
                        )
                          break t
                      } else i.head && (i.head.comment = null)
                      i.mode = 9
                    case 9:
                      if (512 & i.flags) {
                        for (; D < 16; ) {
                          if (M === 0) break t
                          M--, (O += A[k++] << D), (D += 8)
                        }
                        if (O !== (65535 & i.check)) {
                          ;(w.msg = 'header crc mismatch'), (i.mode = 30)
                          break
                        }
                        D = O = 0
                      }
                      i.head &&
                        ((i.head.hcrc = (i.flags >> 9) & 1),
                        (i.head.done = !0)),
                        (w.adler = i.check = 0),
                        (i.mode = 12)
                      break
                    case 10:
                      for (; D < 32; ) {
                        if (M === 0) break t
                        M--, (O += A[k++] << D), (D += 8)
                      }
                      ;(w.adler = i.check = f(O)), (D = O = 0), (i.mode = 11)
                    case 11:
                      if (i.havedict === 0)
                        return (
                          (w.next_out = et),
                          (w.avail_out = H),
                          (w.next_in = k),
                          (w.avail_in = M),
                          (i.hold = O),
                          (i.bits = D),
                          2
                        )
                      ;(w.adler = i.check = 1), (i.mode = 12)
                    case 12:
                      if (I === 5 || I === 6) break t
                    case 13:
                      if (i.last) {
                        ;(O >>>= 7 & D), (D -= 7 & D), (i.mode = 27)
                        break
                      }
                      for (; D < 3; ) {
                        if (M === 0) break t
                        M--, (O += A[k++] << D), (D += 8)
                      }
                      switch (((i.last = 1 & O), (D -= 1), 3 & (O >>>= 1))) {
                        case 0:
                          i.mode = 14
                          break
                        case 1:
                          if ((Z(i), (i.mode = 20), I !== 6)) break
                          ;(O >>>= 2), (D -= 2)
                          break t
                        case 2:
                          i.mode = 17
                          break
                        case 3:
                          ;(w.msg = 'invalid block type'), (i.mode = 30)
                      }
                      ;(O >>>= 2), (D -= 2)
                      break
                    case 14:
                      for (O >>>= 7 & D, D -= 7 & D; D < 32; ) {
                        if (M === 0) break t
                        M--, (O += A[k++] << D), (D += 8)
                      }
                      if ((65535 & O) != ((O >>> 16) ^ 65535)) {
                        ;(w.msg = 'invalid stored block lengths'), (i.mode = 30)
                        break
                      }
                      if (
                        ((i.length = 65535 & O),
                        (D = O = 0),
                        (i.mode = 15),
                        I === 6)
                      )
                        break t
                    case 15:
                      i.mode = 16
                    case 16:
                      if ((Q = i.length)) {
                        if ((M < Q && (Q = M), H < Q && (Q = H), Q === 0))
                          break t
                        _.arraySet(tt, A, k, Q, et),
                          (M -= Q),
                          (k += Q),
                          (H -= Q),
                          (et += Q),
                          (i.length -= Q)
                        break
                      }
                      i.mode = 12
                      break
                    case 17:
                      for (; D < 14; ) {
                        if (M === 0) break t
                        M--, (O += A[k++] << D), (D += 8)
                      }
                      if (
                        ((i.nlen = 257 + (31 & O)),
                        (O >>>= 5),
                        (D -= 5),
                        (i.ndist = 1 + (31 & O)),
                        (O >>>= 5),
                        (D -= 5),
                        (i.ncode = 4 + (15 & O)),
                        (O >>>= 4),
                        (D -= 4),
                        286 < i.nlen || 30 < i.ndist)
                      ) {
                        ;(w.msg = 'too many length or distance symbols'),
                          (i.mode = 30)
                        break
                      }
                      ;(i.have = 0), (i.mode = 18)
                    case 18:
                      for (; i.have < i.ncode; ) {
                        for (; D < 3; ) {
                          if (M === 0) break t
                          M--, (O += A[k++] << D), (D += 8)
                        }
                        ;(i.lens[K[i.have++]] = 7 & O), (O >>>= 3), (D -= 3)
                      }
                      for (; i.have < 19; ) i.lens[K[i.have++]] = 0
                      if (
                        ((i.lencode = i.lendyn),
                        (i.lenbits = 7),
                        (G = { bits: i.lenbits }),
                        (X = r(0, i.lens, 0, 19, i.lencode, 0, i.work, G)),
                        (i.lenbits = G.bits),
                        X)
                      ) {
                        ;(w.msg = 'invalid code lengths set'), (i.mode = 30)
                        break
                      }
                      ;(i.have = 0), (i.mode = 19)
                    case 19:
                      for (; i.have < i.nlen + i.ndist; ) {
                        for (
                          ;
                          (ft =
                            ((u = i.lencode[O & ((1 << i.lenbits) - 1)]) >>>
                              16) &
                            255),
                            (Et = 65535 & u),
                            !((pt = u >>> 24) <= D);

                        ) {
                          if (M === 0) break t
                          M--, (O += A[k++] << D), (D += 8)
                        }
                        if (Et < 16)
                          (O >>>= pt), (D -= pt), (i.lens[i.have++] = Et)
                        else {
                          if (Et === 16) {
                            for (m = pt + 2; D < m; ) {
                              if (M === 0) break t
                              M--, (O += A[k++] << D), (D += 8)
                            }
                            if (((O >>>= pt), (D -= pt), i.have === 0)) {
                              ;(w.msg = 'invalid bit length repeat'),
                                (i.mode = 30)
                              break
                            }
                            ;(n = i.lens[i.have - 1]),
                              (Q = 3 + (3 & O)),
                              (O >>>= 2),
                              (D -= 2)
                          } else if (Et === 17) {
                            for (m = pt + 3; D < m; ) {
                              if (M === 0) break t
                              M--, (O += A[k++] << D), (D += 8)
                            }
                            ;(D -= pt),
                              (n = 0),
                              (Q = 3 + (7 & (O >>>= pt))),
                              (O >>>= 3),
                              (D -= 3)
                          } else {
                            for (m = pt + 7; D < m; ) {
                              if (M === 0) break t
                              M--, (O += A[k++] << D), (D += 8)
                            }
                            ;(D -= pt),
                              (n = 0),
                              (Q = 11 + (127 & (O >>>= pt))),
                              (O >>>= 7),
                              (D -= 7)
                          }
                          if (i.have + Q > i.nlen + i.ndist) {
                            ;(w.msg = 'invalid bit length repeat'),
                              (i.mode = 30)
                            break
                          }
                          for (; Q--; ) i.lens[i.have++] = n
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
                        (G = { bits: i.lenbits }),
                        (X = r(T, i.lens, 0, i.nlen, i.lencode, 0, i.work, G)),
                        (i.lenbits = G.bits),
                        X)
                      ) {
                        ;(w.msg = 'invalid literal/lengths set'), (i.mode = 30)
                        break
                      }
                      if (
                        ((i.distbits = 6),
                        (i.distcode = i.distdyn),
                        (G = { bits: i.distbits }),
                        (X = r(
                          y,
                          i.lens,
                          i.nlen,
                          i.ndist,
                          i.distcode,
                          0,
                          i.work,
                          G
                        )),
                        (i.distbits = G.bits),
                        X)
                      ) {
                        ;(w.msg = 'invalid distances set'), (i.mode = 30)
                        break
                      }
                      if (((i.mode = 20), I === 6)) break t
                    case 20:
                      i.mode = 21
                    case 21:
                      if (6 <= M && 258 <= H) {
                        ;(w.next_out = et),
                          (w.avail_out = H),
                          (w.next_in = k),
                          (w.avail_in = M),
                          (i.hold = O),
                          (i.bits = D),
                          h(w, it),
                          (et = w.next_out),
                          (tt = w.output),
                          (H = w.avail_out),
                          (k = w.next_in),
                          (A = w.input),
                          (M = w.avail_in),
                          (O = i.hold),
                          (D = i.bits),
                          i.mode === 12 && (i.back = -1)
                        break
                      }
                      for (
                        i.back = 0;
                        (ft =
                          ((u = i.lencode[O & ((1 << i.lenbits) - 1)]) >>> 16) &
                          255),
                          (Et = 65535 & u),
                          !((pt = u >>> 24) <= D);

                      ) {
                        if (M === 0) break t
                        M--, (O += A[k++] << D), (D += 8)
                      }
                      if (ft && !(240 & ft)) {
                        for (
                          bt = pt, At = ft, Dt = Et;
                          (ft =
                            ((u =
                              i.lencode[
                                Dt + ((O & ((1 << (bt + At)) - 1)) >> bt)
                              ]) >>>
                              16) &
                            255),
                            (Et = 65535 & u),
                            !(bt + (pt = u >>> 24) <= D);

                        ) {
                          if (M === 0) break t
                          M--, (O += A[k++] << D), (D += 8)
                        }
                        ;(O >>>= bt), (D -= bt), (i.back += bt)
                      }
                      if (
                        ((O >>>= pt),
                        (D -= pt),
                        (i.back += pt),
                        (i.length = Et),
                        ft === 0)
                      ) {
                        i.mode = 26
                        break
                      }
                      if (32 & ft) {
                        ;(i.back = -1), (i.mode = 12)
                        break
                      }
                      if (64 & ft) {
                        ;(w.msg = 'invalid literal/length code'), (i.mode = 30)
                        break
                      }
                      ;(i.extra = 15 & ft), (i.mode = 22)
                    case 22:
                      if (i.extra) {
                        for (m = i.extra; D < m; ) {
                          if (M === 0) break t
                          M--, (O += A[k++] << D), (D += 8)
                        }
                        ;(i.length += O & ((1 << i.extra) - 1)),
                          (O >>>= i.extra),
                          (D -= i.extra),
                          (i.back += i.extra)
                      }
                      ;(i.was = i.length), (i.mode = 23)
                    case 23:
                      for (
                        ;
                        (ft =
                          ((u = i.distcode[O & ((1 << i.distbits) - 1)]) >>>
                            16) &
                          255),
                          (Et = 65535 & u),
                          !((pt = u >>> 24) <= D);

                      ) {
                        if (M === 0) break t
                        M--, (O += A[k++] << D), (D += 8)
                      }
                      if (!(240 & ft)) {
                        for (
                          bt = pt, At = ft, Dt = Et;
                          (ft =
                            ((u =
                              i.distcode[
                                Dt + ((O & ((1 << (bt + At)) - 1)) >> bt)
                              ]) >>>
                              16) &
                            255),
                            (Et = 65535 & u),
                            !(bt + (pt = u >>> 24) <= D);

                        ) {
                          if (M === 0) break t
                          M--, (O += A[k++] << D), (D += 8)
                        }
                        ;(O >>>= bt), (D -= bt), (i.back += bt)
                      }
                      if (((O >>>= pt), (D -= pt), (i.back += pt), 64 & ft)) {
                        ;(w.msg = 'invalid distance code'), (i.mode = 30)
                        break
                      }
                      ;(i.offset = Et), (i.extra = 15 & ft), (i.mode = 24)
                    case 24:
                      if (i.extra) {
                        for (m = i.extra; D < m; ) {
                          if (M === 0) break t
                          M--, (O += A[k++] << D), (D += 8)
                        }
                        ;(i.offset += O & ((1 << i.extra) - 1)),
                          (O >>>= i.extra),
                          (D -= i.extra),
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
                      if (((Q = it - H), i.offset > Q)) {
                        if ((Q = i.offset - Q) > i.whave && i.sane) {
                          ;(w.msg = 'invalid distance too far back'),
                            (i.mode = 30)
                          break
                        }
                        ;(vt =
                          Q > i.wnext
                            ? ((Q -= i.wnext), i.wsize - Q)
                            : i.wnext - Q),
                          Q > i.length && (Q = i.length),
                          (St = i.window)
                      } else (St = tt), (vt = et - i.offset), (Q = i.length)
                      for (
                        H < Q && (Q = H), H -= Q, i.length -= Q;
                        (tt[et++] = St[vt++]), --Q;

                      );
                      i.length === 0 && (i.mode = 21)
                      break
                    case 26:
                      if (H === 0) break t
                      ;(tt[et++] = i.length), H--, (i.mode = 21)
                      break
                    case 27:
                      if (i.wrap) {
                        for (; D < 32; ) {
                          if (M === 0) break t
                          M--, (O |= A[k++] << D), (D += 8)
                        }
                        if (
                          ((it -= H),
                          (w.total_out += it),
                          (i.total += it),
                          it &&
                            (w.adler = i.check =
                              i.flags
                                ? s(i.check, tt, it, et - it)
                                : d(i.check, tt, it, et - it)),
                          (it = H),
                          (i.flags ? O : f(O)) !== i.check)
                        ) {
                          ;(w.msg = 'incorrect data check'), (i.mode = 30)
                          break
                        }
                        D = O = 0
                      }
                      i.mode = 28
                    case 28:
                      if (i.wrap && i.flags) {
                        for (; D < 32; ) {
                          if (M === 0) break t
                          M--, (O += A[k++] << D), (D += 8)
                        }
                        if (O !== (4294967295 & i.total)) {
                          ;(w.msg = 'incorrect length check'), (i.mode = 30)
                          break
                        }
                        D = O = 0
                      }
                      i.mode = 29
                    case 29:
                      X = 1
                      break t
                    case 30:
                      X = -3
                      break t
                    case 31:
                      return -4
                    case 32:
                    default:
                      return l
                  }
                return (
                  (w.next_out = et),
                  (w.avail_out = H),
                  (w.next_in = k),
                  (w.avail_in = M),
                  (i.hold = O),
                  (i.bits = D),
                  (i.wsize ||
                    (it !== w.avail_out &&
                      i.mode < 30 &&
                      (i.mode < 27 || I !== 4))) &&
                  ut(w, w.output, w.next_out, it - w.avail_out)
                    ? ((i.mode = 31), -4)
                    : ((st -= w.avail_in),
                      (it -= w.avail_out),
                      (w.total_in += st),
                      (w.total_out += it),
                      (i.total += it),
                      i.wrap &&
                        it &&
                        (w.adler = i.check =
                          i.flags
                            ? s(i.check, tt, it, w.next_out - it)
                            : d(i.check, tt, it, w.next_out - it)),
                      (w.data_type =
                        i.bits +
                        (i.last ? 64 : 0) +
                        (i.mode === 12 ? 128 : 0) +
                        (i.mode === 20 || i.mode === 15 ? 256 : 0)),
                      ((st == 0 && it === 0) || I === 4) && X === L && (X = -5),
                      X)
                )
              }),
              (v.inflateEnd = function (w) {
                if (!w || !w.state) return l
                var I = w.state
                return I.window && (I.window = null), (w.state = null), L
              }),
              (v.inflateGetHeader = function (w, I) {
                var i
                return w && w.state && 2 & (i = w.state).wrap
                  ? (((i.head = I).done = !1), L)
                  : l
              }),
              (v.inflateSetDictionary = function (w, I) {
                var i,
                  A = I.length
                return w && w.state
                  ? (i = w.state).wrap !== 0 && i.mode !== 11
                    ? l
                    : i.mode === 11 && d(1, I, A, 0) !== i.check
                    ? -3
                    : ut(w, I, A, A)
                    ? ((i.mode = 31), -4)
                    : ((i.havedict = 1), L)
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
          function (g, B, v) {
            var _ = g('../utils/common'),
              d = [
                3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43,
                51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
              ],
              s = [
                16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
                19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
              ],
              h = [
                1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257,
                385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289,
                16385, 24577, 0, 0
              ],
              r = [
                16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
                23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64
              ]
            B.exports = function (T, y, L, l, N, o, p, f) {
              var E,
                U,
                x,
                F,
                W,
                P,
                V,
                z,
                Z,
                ut = f.bits,
                w = 0,
                I = 0,
                i = 0,
                A = 0,
                tt = 0,
                k = 0,
                et = 0,
                M = 0,
                H = 0,
                O = 0,
                D = null,
                st = 0,
                it = new _.Buf16(16),
                Q = new _.Buf16(16),
                vt = null,
                St = 0
              for (w = 0; w <= 15; w++) it[w] = 0
              for (I = 0; I < l; I++) it[y[L + I]]++
              for (tt = ut, A = 15; 1 <= A && it[A] === 0; A--);
              if ((A < tt && (tt = A), A === 0))
                return (N[o++] = 20971520), (N[o++] = 20971520), (f.bits = 1), 0
              for (i = 1; i < A && it[i] === 0; i++);
              for (tt < i && (tt = i), w = M = 1; w <= 15; w++)
                if (((M <<= 1), (M -= it[w]) < 0)) return -1
              if (0 < M && (T === 0 || A !== 1)) return -1
              for (Q[1] = 0, w = 1; w < 15; w++) Q[w + 1] = Q[w] + it[w]
              for (I = 0; I < l; I++) y[L + I] !== 0 && (p[Q[y[L + I]]++] = I)
              if (
                ((P =
                  T === 0
                    ? ((D = vt = p), 19)
                    : T === 1
                    ? ((D = d), (st -= 257), (vt = s), (St -= 257), 256)
                    : ((D = h), (vt = r), -1)),
                (w = i),
                (W = o),
                (et = I = O = 0),
                (x = -1),
                (F = (H = 1 << (k = tt)) - 1),
                (T === 1 && 852 < H) || (T === 2 && 592 < H))
              )
                return 1
              for (;;) {
                for (
                  V = w - et,
                    Z =
                      p[I] < P
                        ? ((z = 0), p[I])
                        : p[I] > P
                        ? ((z = vt[St + p[I]]), D[st + p[I]])
                        : ((z = 96), 0),
                    E = 1 << (w - et),
                    i = U = 1 << k;
                  (N[W + (O >> et) + (U -= E)] = (V << 24) | (z << 16) | Z | 0),
                    U !== 0;

                );
                for (E = 1 << (w - 1); O & E; ) E >>= 1
                if (
                  (E !== 0 ? ((O &= E - 1), (O += E)) : (O = 0),
                  I++,
                  --it[w] == 0)
                ) {
                  if (w === A) break
                  w = y[L + p[I]]
                }
                if (tt < w && (O & F) !== x) {
                  for (
                    et === 0 && (et = tt), W += i, M = 1 << (k = w - et);
                    k + et < A && !((M -= it[k + et]) <= 0);

                  )
                    k++, (M <<= 1)
                  if (
                    ((H += 1 << k),
                    (T === 1 && 852 < H) || (T === 2 && 592 < H))
                  )
                    return 1
                  N[(x = O & F)] = (tt << 24) | (k << 16) | (W - o) | 0
                }
              }
              return (
                O !== 0 && (N[W + O] = ((w - et) << 24) | (64 << 16) | 0),
                (f.bits = tt),
                0
              )
            }
          },
          { '../utils/common': 41 }
        ],
        51: [
          function (g, B, v) {
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
          function (g, B, v) {
            var _ = g('../utils/common'),
              d = 0,
              s = 1
            function h(u) {
              for (var S = u.length; 0 <= --S; ) u[S] = 0
            }
            var r = 0,
              T = 29,
              y = 256,
              L = y + 1 + T,
              l = 30,
              N = 19,
              o = 2 * L + 1,
              p = 15,
              f = 16,
              E = 7,
              U = 256,
              x = 16,
              F = 17,
              W = 18,
              P = [
                0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4,
                4, 4, 4, 5, 5, 5, 5, 0
              ],
              V = [
                0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9,
                9, 10, 10, 11, 11, 12, 12, 13, 13
              ],
              z = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
              Z = [
                16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15
              ],
              ut = new Array(2 * (L + 2))
            h(ut)
            var w = new Array(2 * l)
            h(w)
            var I = new Array(512)
            h(I)
            var i = new Array(256)
            h(i)
            var A = new Array(T)
            h(A)
            var tt,
              k,
              et,
              M = new Array(l)
            function H(u, S, K, Y, C) {
              ;(this.static_tree = u),
                (this.extra_bits = S),
                (this.extra_base = K),
                (this.elems = Y),
                (this.max_length = C),
                (this.has_stree = u && u.length)
            }
            function O(u, S) {
              ;(this.dyn_tree = u), (this.max_code = 0), (this.stat_desc = S)
            }
            function D(u) {
              return u < 256 ? I[u] : I[256 + (u >>> 7)]
            }
            function st(u, S) {
              ;(u.pending_buf[u.pending++] = 255 & S),
                (u.pending_buf[u.pending++] = (S >>> 8) & 255)
            }
            function it(u, S, K) {
              u.bi_valid > f - K
                ? ((u.bi_buf |= (S << u.bi_valid) & 65535),
                  st(u, u.bi_buf),
                  (u.bi_buf = S >> (f - u.bi_valid)),
                  (u.bi_valid += K - f))
                : ((u.bi_buf |= (S << u.bi_valid) & 65535), (u.bi_valid += K))
            }
            function Q(u, S, K) {
              it(u, K[2 * S], K[2 * S + 1])
            }
            function vt(u, S) {
              for (var K = 0; (K |= 1 & u), (u >>>= 1), (K <<= 1), 0 < --S; );
              return K >>> 1
            }
            function St(u, S, K) {
              var Y,
                C,
                rt = new Array(p + 1),
                at = 0
              for (Y = 1; Y <= p; Y++) rt[Y] = at = (at + K[Y - 1]) << 1
              for (C = 0; C <= S; C++) {
                var nt = u[2 * C + 1]
                nt !== 0 && (u[2 * C] = vt(rt[nt]++, nt))
              }
            }
            function pt(u) {
              var S
              for (S = 0; S < L; S++) u.dyn_ltree[2 * S] = 0
              for (S = 0; S < l; S++) u.dyn_dtree[2 * S] = 0
              for (S = 0; S < N; S++) u.bl_tree[2 * S] = 0
              ;(u.dyn_ltree[2 * U] = 1),
                (u.opt_len = u.static_len = 0),
                (u.last_lit = u.matches = 0)
            }
            function ft(u) {
              8 < u.bi_valid
                ? st(u, u.bi_buf)
                : 0 < u.bi_valid && (u.pending_buf[u.pending++] = u.bi_buf),
                (u.bi_buf = 0),
                (u.bi_valid = 0)
            }
            function Et(u, S, K, Y) {
              var C = 2 * S,
                rt = 2 * K
              return u[C] < u[rt] || (u[C] === u[rt] && Y[S] <= Y[K])
            }
            function bt(u, S, K) {
              for (
                var Y = u.heap[K], C = K << 1;
                C <= u.heap_len &&
                (C < u.heap_len &&
                  Et(S, u.heap[C + 1], u.heap[C], u.depth) &&
                  C++,
                !Et(S, Y, u.heap[C], u.depth));

              )
                (u.heap[K] = u.heap[C]), (K = C), (C <<= 1)
              u.heap[K] = Y
            }
            function At(u, S, K) {
              var Y,
                C,
                rt,
                at,
                nt = 0
              if (u.last_lit !== 0)
                for (
                  ;
                  (Y =
                    (u.pending_buf[u.d_buf + 2 * nt] << 8) |
                    u.pending_buf[u.d_buf + 2 * nt + 1]),
                    (C = u.pending_buf[u.l_buf + nt]),
                    nt++,
                    Y === 0
                      ? Q(u, C, S)
                      : (Q(u, (rt = i[C]) + y + 1, S),
                        (at = P[rt]) !== 0 && it(u, (C -= A[rt]), at),
                        Q(u, (rt = D(--Y)), K),
                        (at = V[rt]) !== 0 && it(u, (Y -= M[rt]), at)),
                    nt < u.last_lit;

                );
              Q(u, U, S)
            }
            function Dt(u, S) {
              var K,
                Y,
                C,
                rt = S.dyn_tree,
                at = S.stat_desc.static_tree,
                nt = S.stat_desc.has_stree,
                lt = S.stat_desc.elems,
                Tt = -1
              for (u.heap_len = 0, u.heap_max = o, K = 0; K < lt; K++)
                rt[2 * K] !== 0
                  ? ((u.heap[++u.heap_len] = Tt = K), (u.depth[K] = 0))
                  : (rt[2 * K + 1] = 0)
              for (; u.heap_len < 2; )
                (rt[2 * (C = u.heap[++u.heap_len] = Tt < 2 ? ++Tt : 0)] = 1),
                  (u.depth[C] = 0),
                  u.opt_len--,
                  nt && (u.static_len -= at[2 * C + 1])
              for (S.max_code = Tt, K = u.heap_len >> 1; 1 <= K; K--)
                bt(u, rt, K)
              for (
                C = lt;
                (K = u.heap[1]),
                  (u.heap[1] = u.heap[u.heap_len--]),
                  bt(u, rt, 1),
                  (Y = u.heap[1]),
                  (u.heap[--u.heap_max] = K),
                  (u.heap[--u.heap_max] = Y),
                  (rt[2 * C] = rt[2 * K] + rt[2 * Y]),
                  (u.depth[C] =
                    (u.depth[K] >= u.depth[Y] ? u.depth[K] : u.depth[Y]) + 1),
                  (rt[2 * K + 1] = rt[2 * Y + 1] = C),
                  (u.heap[1] = C++),
                  bt(u, rt, 1),
                  2 <= u.heap_len;

              );
              ;(u.heap[--u.heap_max] = u.heap[1]),
                (function (Nt, Ot) {
                  var Wt,
                    xt,
                    Yt,
                    It,
                    Qt,
                    ht,
                    Rt = Ot.dyn_tree,
                    re = Ot.max_code,
                    Gt = Ot.stat_desc.static_tree,
                    Ue = Ot.stat_desc.has_stree,
                    jt = Ot.stat_desc.extra_bits,
                    ne = Ot.stat_desc.extra_base,
                    q = Ot.stat_desc.max_length,
                    Xt = 0
                  for (It = 0; It <= p; It++) Nt.bl_count[It] = 0
                  for (
                    Rt[2 * Nt.heap[Nt.heap_max] + 1] = 0, Wt = Nt.heap_max + 1;
                    Wt < o;
                    Wt++
                  )
                    q < (It = Rt[2 * Rt[2 * (xt = Nt.heap[Wt]) + 1] + 1] + 1) &&
                      ((It = q), Xt++),
                      (Rt[2 * xt + 1] = It),
                      re < xt ||
                        (Nt.bl_count[It]++,
                        (Qt = 0),
                        ne <= xt && (Qt = jt[xt - ne]),
                        (ht = Rt[2 * xt]),
                        (Nt.opt_len += ht * (It + Qt)),
                        Ue && (Nt.static_len += ht * (Gt[2 * xt + 1] + Qt)))
                  if (Xt !== 0) {
                    do {
                      for (It = q - 1; Nt.bl_count[It] === 0; ) It--
                      Nt.bl_count[It]--,
                        (Nt.bl_count[It + 1] += 2),
                        Nt.bl_count[q]--,
                        (Xt -= 2)
                    } while (0 < Xt)
                    for (It = q; It !== 0; It--)
                      for (xt = Nt.bl_count[It]; xt !== 0; )
                        re < (Yt = Nt.heap[--Wt]) ||
                          (Rt[2 * Yt + 1] !== It &&
                            ((Nt.opt_len += (It - Rt[2 * Yt + 1]) * Rt[2 * Yt]),
                            (Rt[2 * Yt + 1] = It)),
                          xt--)
                  }
                })(u, S),
                St(rt, Tt, u.bl_count)
            }
            function n(u, S, K) {
              var Y,
                C,
                rt = -1,
                at = S[1],
                nt = 0,
                lt = 7,
                Tt = 4
              for (
                at === 0 && ((lt = 138), (Tt = 3)),
                  S[2 * (K + 1) + 1] = 65535,
                  Y = 0;
                Y <= K;
                Y++
              )
                (C = at),
                  (at = S[2 * (Y + 1) + 1]),
                  (++nt < lt && C === at) ||
                    (nt < Tt
                      ? (u.bl_tree[2 * C] += nt)
                      : C !== 0
                      ? (C !== rt && u.bl_tree[2 * C]++, u.bl_tree[2 * x]++)
                      : nt <= 10
                      ? u.bl_tree[2 * F]++
                      : u.bl_tree[2 * W]++,
                    (rt = C),
                    (Tt =
                      (nt = 0) === at
                        ? ((lt = 138), 3)
                        : C === at
                        ? ((lt = 6), 3)
                        : ((lt = 7), 4)))
            }
            function X(u, S, K) {
              var Y,
                C,
                rt = -1,
                at = S[1],
                nt = 0,
                lt = 7,
                Tt = 4
              for (at === 0 && ((lt = 138), (Tt = 3)), Y = 0; Y <= K; Y++)
                if (
                  ((C = at),
                  (at = S[2 * (Y + 1) + 1]),
                  !(++nt < lt && C === at))
                ) {
                  if (nt < Tt) for (; Q(u, C, u.bl_tree), --nt != 0; );
                  else
                    C !== 0
                      ? (C !== rt && (Q(u, C, u.bl_tree), nt--),
                        Q(u, x, u.bl_tree),
                        it(u, nt - 3, 2))
                      : nt <= 10
                      ? (Q(u, F, u.bl_tree), it(u, nt - 3, 3))
                      : (Q(u, W, u.bl_tree), it(u, nt - 11, 7))
                  ;(rt = C),
                    (Tt =
                      (nt = 0) === at
                        ? ((lt = 138), 3)
                        : C === at
                        ? ((lt = 6), 3)
                        : ((lt = 7), 4))
                }
            }
            h(M)
            var G = !1
            function m(u, S, K, Y) {
              it(u, (r << 1) + (Y ? 1 : 0), 3),
                (function (C, rt, at, nt) {
                  ft(C),
                    nt && (st(C, at), st(C, ~at)),
                    _.arraySet(C.pending_buf, C.window, rt, at, C.pending),
                    (C.pending += at)
                })(u, S, K, !0)
            }
            ;(v._tr_init = function (u) {
              G ||
                ((function () {
                  var S,
                    K,
                    Y,
                    C,
                    rt,
                    at = new Array(p + 1)
                  for (C = Y = 0; C < T - 1; C++)
                    for (A[C] = Y, S = 0; S < 1 << P[C]; S++) i[Y++] = C
                  for (i[Y - 1] = C, C = rt = 0; C < 16; C++)
                    for (M[C] = rt, S = 0; S < 1 << V[C]; S++) I[rt++] = C
                  for (rt >>= 7; C < l; C++)
                    for (M[C] = rt << 7, S = 0; S < 1 << (V[C] - 7); S++)
                      I[256 + rt++] = C
                  for (K = 0; K <= p; K++) at[K] = 0
                  for (S = 0; S <= 143; ) (ut[2 * S + 1] = 8), S++, at[8]++
                  for (; S <= 255; ) (ut[2 * S + 1] = 9), S++, at[9]++
                  for (; S <= 279; ) (ut[2 * S + 1] = 7), S++, at[7]++
                  for (; S <= 287; ) (ut[2 * S + 1] = 8), S++, at[8]++
                  for (St(ut, L + 1, at), S = 0; S < l; S++)
                    (w[2 * S + 1] = 5), (w[2 * S] = vt(S, 5))
                  ;(tt = new H(ut, P, y + 1, L, p)),
                    (k = new H(w, V, 0, l, p)),
                    (et = new H(new Array(0), z, 0, N, E))
                })(),
                (G = !0)),
                (u.l_desc = new O(u.dyn_ltree, tt)),
                (u.d_desc = new O(u.dyn_dtree, k)),
                (u.bl_desc = new O(u.bl_tree, et)),
                (u.bi_buf = 0),
                (u.bi_valid = 0),
                pt(u)
            }),
              (v._tr_stored_block = m),
              (v._tr_flush_block = function (u, S, K, Y) {
                var C,
                  rt,
                  at = 0
                0 < u.level
                  ? (u.strm.data_type === 2 &&
                      (u.strm.data_type = (function (nt) {
                        var lt,
                          Tt = 4093624447
                        for (lt = 0; lt <= 31; lt++, Tt >>>= 1)
                          if (1 & Tt && nt.dyn_ltree[2 * lt] !== 0) return d
                        if (
                          nt.dyn_ltree[18] !== 0 ||
                          nt.dyn_ltree[20] !== 0 ||
                          nt.dyn_ltree[26] !== 0
                        )
                          return s
                        for (lt = 32; lt < y; lt++)
                          if (nt.dyn_ltree[2 * lt] !== 0) return s
                        return d
                      })(u)),
                    Dt(u, u.l_desc),
                    Dt(u, u.d_desc),
                    (at = (function (nt) {
                      var lt
                      for (
                        n(nt, nt.dyn_ltree, nt.l_desc.max_code),
                          n(nt, nt.dyn_dtree, nt.d_desc.max_code),
                          Dt(nt, nt.bl_desc),
                          lt = N - 1;
                        3 <= lt && nt.bl_tree[2 * Z[lt] + 1] === 0;
                        lt--
                      );
                      return (nt.opt_len += 3 * (lt + 1) + 5 + 5 + 4), lt
                    })(u)),
                    (C = (u.opt_len + 3 + 7) >>> 3),
                    (rt = (u.static_len + 3 + 7) >>> 3) <= C && (C = rt))
                  : (C = rt = K + 5),
                  K + 4 <= C && S !== -1
                    ? m(u, S, K, Y)
                    : u.strategy === 4 || rt === C
                    ? (it(u, 2 + (Y ? 1 : 0), 3), At(u, ut, w))
                    : (it(u, 4 + (Y ? 1 : 0), 3),
                      (function (nt, lt, Tt, Nt) {
                        var Ot
                        for (
                          it(nt, lt - 257, 5),
                            it(nt, Tt - 1, 5),
                            it(nt, Nt - 4, 4),
                            Ot = 0;
                          Ot < Nt;
                          Ot++
                        )
                          it(nt, nt.bl_tree[2 * Z[Ot] + 1], 3)
                        X(nt, nt.dyn_ltree, lt - 1), X(nt, nt.dyn_dtree, Tt - 1)
                      })(
                        u,
                        u.l_desc.max_code + 1,
                        u.d_desc.max_code + 1,
                        at + 1
                      ),
                      At(u, u.dyn_ltree, u.dyn_dtree)),
                  pt(u),
                  Y && ft(u)
              }),
              (v._tr_tally = function (u, S, K) {
                return (
                  (u.pending_buf[u.d_buf + 2 * u.last_lit] = (S >>> 8) & 255),
                  (u.pending_buf[u.d_buf + 2 * u.last_lit + 1] = 255 & S),
                  (u.pending_buf[u.l_buf + u.last_lit] = 255 & K),
                  u.last_lit++,
                  S === 0
                    ? u.dyn_ltree[2 * K]++
                    : (u.matches++,
                      S--,
                      u.dyn_ltree[2 * (i[K] + y + 1)]++,
                      u.dyn_dtree[2 * D(S)]++),
                  u.last_lit === u.lit_bufsize - 1
                )
              }),
              (v._tr_align = function (u) {
                it(u, 2, 3),
                  Q(u, U, ut),
                  (function (S) {
                    S.bi_valid === 16
                      ? (st(S, S.bi_buf), (S.bi_buf = 0), (S.bi_valid = 0))
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
          function (g, B, v) {
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
          function (g, B, v) {
            ;(function (_) {
              ;(function (d, s) {
                if (!d.setImmediate) {
                  var h,
                    r,
                    T,
                    y,
                    L = 1,
                    l = {},
                    N = !1,
                    o = d.document,
                    p = Object.getPrototypeOf && Object.getPrototypeOf(d)
                  ;(p = p && p.setTimeout ? p : d),
                    (h =
                      {}.toString.call(d.process) === '[object process]'
                        ? function (x) {
                            process.nextTick(function () {
                              E(x)
                            })
                          }
                        : (function () {
                            if (d.postMessage && !d.importScripts) {
                              var x = !0,
                                F = d.onmessage
                              return (
                                (d.onmessage = function () {
                                  x = !1
                                }),
                                d.postMessage('', '*'),
                                (d.onmessage = F),
                                x
                              )
                            }
                          })()
                        ? ((y = 'setImmediate$' + Math.random() + '$'),
                          d.addEventListener
                            ? d.addEventListener('message', U, !1)
                            : d.attachEvent('onmessage', U),
                          function (x) {
                            d.postMessage(y + x, '*')
                          })
                        : d.MessageChannel
                        ? (((T = new MessageChannel()).port1.onmessage =
                            function (x) {
                              E(x.data)
                            }),
                          function (x) {
                            T.port2.postMessage(x)
                          })
                        : o && 'onreadystatechange' in o.createElement('script')
                        ? ((r = o.documentElement),
                          function (x) {
                            var F = o.createElement('script')
                            ;(F.onreadystatechange = function () {
                              E(x),
                                (F.onreadystatechange = null),
                                r.removeChild(F),
                                (F = null)
                            }),
                              r.appendChild(F)
                          })
                        : function (x) {
                            setTimeout(E, 0, x)
                          }),
                    (p.setImmediate = function (x) {
                      typeof x != 'function' && (x = new Function('' + x))
                      for (
                        var F = new Array(arguments.length - 1), W = 0;
                        W < F.length;
                        W++
                      )
                        F[W] = arguments[W + 1]
                      var P = { callback: x, args: F }
                      return (l[L] = P), h(L), L++
                    }),
                    (p.clearImmediate = f)
                }
                function f(x) {
                  delete l[x]
                }
                function E(x) {
                  if (N) setTimeout(E, 0, x)
                  else {
                    var F = l[x]
                    if (F) {
                      N = !0
                      try {
                        ;(function (W) {
                          var P = W.callback,
                            V = W.args
                          switch (V.length) {
                            case 0:
                              P()
                              break
                            case 1:
                              P(V[0])
                              break
                            case 2:
                              P(V[0], V[1])
                              break
                            case 3:
                              P(V[0], V[1], V[2])
                              break
                            default:
                              P.apply(s, V)
                          }
                        })(F)
                      } finally {
                        f(x), (N = !1)
                      }
                    }
                  }
                }
                function U(x) {
                  x.source === d &&
                    typeof x.data == 'string' &&
                    x.data.indexOf(y) === 0 &&
                    E(+x.data.slice(y.length))
                }
              })(typeof self > 'u' ? (_ === void 0 ? this : _) : self)
            }).call(
              this,
              typeof de < 'u'
                ? de
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
})(dn)
const hn = Pe,
  _n = new hn()
class pn {
  static async init(dt) {
    const g = await fetch(dt).then((B) => B.blob())
    return await _n.loadAsync(g)
  }
}
const vr = {
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
    cancel_from: 0
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
function qe(ct) {
  return new Promise((dt, g) => {
    ;(ct.oncomplete = ct.onsuccess = () => dt(ct.result)),
      (ct.onabort = ct.onerror = () => g(ct.error))
  })
}
function mn(ct, dt) {
  const g = indexedDB.open(ct)
  g.onupgradeneeded = () => g.result.createObjectStore(dt)
  const B = qe(g)
  return (v, _) => B.then((d) => _(d.transaction(dt, v).objectStore(dt)))
}
let Ge
function Lr() {
  return Ge || (Ge = mn('keyval-store', 'keyval')), Ge
}
function Nn(ct, dt = Lr()) {
  return dt('readonly', (g) => qe(g.get(ct)))
}
function gn(ct, dt, g = Lr()) {
  return g('readwrite', (B) => (B.put(dt, ct), qe(B.transaction)))
}
var He = {},
  En = {
    get exports() {
      return He
    },
    set exports(ct) {
      He = ct
    }
  }
;(function (ct, dt) {
  ;(function (g, B) {
    ct.exports = B()
  })(de, function () {
    var g = 1e3,
      B = 6e4,
      v = 36e5,
      _ = 'millisecond',
      d = 'second',
      s = 'minute',
      h = 'hour',
      r = 'day',
      T = 'week',
      y = 'month',
      L = 'quarter',
      l = 'year',
      N = 'date',
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
        ordinal: function (I) {
          var i = ['th', 'st', 'nd', 'rd'],
            A = I % 100
          return '[' + I + (i[(A - 20) % 10] || i[A] || i[0]) + ']'
        }
      },
      U = function (I, i, A) {
        var tt = String(I)
        return !tt || tt.length >= i
          ? I
          : '' + Array(i + 1 - tt.length).join(A) + I
      },
      x = {
        s: U,
        z: function (I) {
          var i = -I.utcOffset(),
            A = Math.abs(i),
            tt = Math.floor(A / 60),
            k = A % 60
          return (i <= 0 ? '+' : '-') + U(tt, 2, '0') + ':' + U(k, 2, '0')
        },
        m: function I(i, A) {
          if (i.date() < A.date()) return -I(A, i)
          var tt = 12 * (A.year() - i.year()) + (A.month() - i.month()),
            k = i.clone().add(tt, y),
            et = A - k < 0,
            M = i.clone().add(tt + (et ? -1 : 1), y)
          return +(-(tt + (A - k) / (et ? k - M : M - k)) || 0)
        },
        a: function (I) {
          return I < 0 ? Math.ceil(I) || 0 : Math.floor(I)
        },
        p: function (I) {
          return (
            { M: y, y: l, w: T, d: r, D: N, h, m: s, s: d, ms: _, Q: L }[I] ||
            String(I || '')
              .toLowerCase()
              .replace(/s$/, '')
          )
        },
        u: function (I) {
          return I === void 0
        }
      },
      F = 'en',
      W = {}
    W[F] = E
    var P = function (I) {
        return I instanceof ut
      },
      V = function I(i, A, tt) {
        var k
        if (!i) return F
        if (typeof i == 'string') {
          var et = i.toLowerCase()
          W[et] && (k = et), A && ((W[et] = A), (k = et))
          var M = i.split('-')
          if (!k && M.length > 1) return I(M[0])
        } else {
          var H = i.name
          ;(W[H] = i), (k = H)
        }
        return !tt && k && (F = k), k || (!tt && F)
      },
      z = function (I, i) {
        if (P(I)) return I.clone()
        var A = typeof i == 'object' ? i : {}
        return (A.date = I), (A.args = arguments), new ut(A)
      },
      Z = x
    ;(Z.l = V),
      (Z.i = P),
      (Z.w = function (I, i) {
        return z(I, { locale: i.$L, utc: i.$u, x: i.$x, $offset: i.$offset })
      })
    var ut = (function () {
        function I(A) {
          ;(this.$L = V(A.locale, null, !0)), this.parse(A)
        }
        var i = I.prototype
        return (
          (i.parse = function (A) {
            ;(this.$d = (function (tt) {
              var k = tt.date,
                et = tt.utc
              if (k === null) return new Date(NaN)
              if (Z.u(k)) return new Date()
              if (k instanceof Date) return new Date(k)
              if (typeof k == 'string' && !/Z$/i.test(k)) {
                var M = k.match(p)
                if (M) {
                  var H = M[2] - 1 || 0,
                    O = (M[7] || '0').substring(0, 3)
                  return et
                    ? new Date(
                        Date.UTC(
                          M[1],
                          H,
                          M[3] || 1,
                          M[4] || 0,
                          M[5] || 0,
                          M[6] || 0,
                          O
                        )
                      )
                    : new Date(
                        M[1],
                        H,
                        M[3] || 1,
                        M[4] || 0,
                        M[5] || 0,
                        M[6] || 0,
                        O
                      )
                }
              }
              return new Date(k)
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
            return Z
          }),
          (i.isValid = function () {
            return this.$d.toString() !== o
          }),
          (i.isSame = function (A, tt) {
            var k = z(A)
            return this.startOf(tt) <= k && k <= this.endOf(tt)
          }),
          (i.isAfter = function (A, tt) {
            return z(A) < this.startOf(tt)
          }),
          (i.isBefore = function (A, tt) {
            return this.endOf(tt) < z(A)
          }),
          (i.$g = function (A, tt, k) {
            return Z.u(A) ? this[tt] : this.set(k, A)
          }),
          (i.unix = function () {
            return Math.floor(this.valueOf() / 1e3)
          }),
          (i.valueOf = function () {
            return this.$d.getTime()
          }),
          (i.startOf = function (A, tt) {
            var k = this,
              et = !!Z.u(tt) || tt,
              M = Z.p(A),
              H = function (pt, ft) {
                var Et = Z.w(
                  k.$u ? Date.UTC(k.$y, ft, pt) : new Date(k.$y, ft, pt),
                  k
                )
                return et ? Et : Et.endOf(r)
              },
              O = function (pt, ft) {
                return Z.w(
                  k
                    .toDate()
                    [pt].apply(
                      k.toDate('s'),
                      (et ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(ft)
                    ),
                  k
                )
              },
              D = this.$W,
              st = this.$M,
              it = this.$D,
              Q = 'set' + (this.$u ? 'UTC' : '')
            switch (M) {
              case l:
                return et ? H(1, 0) : H(31, 11)
              case y:
                return et ? H(1, st) : H(0, st + 1)
              case T:
                var vt = this.$locale().weekStart || 0,
                  St = (D < vt ? D + 7 : D) - vt
                return H(et ? it - St : it + (6 - St), st)
              case r:
              case N:
                return O(Q + 'Hours', 0)
              case h:
                return O(Q + 'Minutes', 1)
              case s:
                return O(Q + 'Seconds', 2)
              case d:
                return O(Q + 'Milliseconds', 3)
              default:
                return this.clone()
            }
          }),
          (i.endOf = function (A) {
            return this.startOf(A, !1)
          }),
          (i.$set = function (A, tt) {
            var k,
              et = Z.p(A),
              M = 'set' + (this.$u ? 'UTC' : ''),
              H = ((k = {}),
              (k[r] = M + 'Date'),
              (k[N] = M + 'Date'),
              (k[y] = M + 'Month'),
              (k[l] = M + 'FullYear'),
              (k[h] = M + 'Hours'),
              (k[s] = M + 'Minutes'),
              (k[d] = M + 'Seconds'),
              (k[_] = M + 'Milliseconds'),
              k)[et],
              O = et === r ? this.$D + (tt - this.$W) : tt
            if (et === y || et === l) {
              var D = this.clone().set(N, 1)
              D.$d[H](O),
                D.init(),
                (this.$d = D.set(N, Math.min(this.$D, D.daysInMonth())).$d)
            } else H && this.$d[H](O)
            return this.init(), this
          }),
          (i.set = function (A, tt) {
            return this.clone().$set(A, tt)
          }),
          (i.get = function (A) {
            return this[Z.p(A)]()
          }),
          (i.add = function (A, tt) {
            var k,
              et = this
            A = Number(A)
            var M = Z.p(tt),
              H = function (st) {
                var it = z(et)
                return Z.w(it.date(it.date() + Math.round(st * A)), et)
              }
            if (M === y) return this.set(y, this.$M + A)
            if (M === l) return this.set(l, this.$y + A)
            if (M === r) return H(1)
            if (M === T) return H(7)
            var O = ((k = {}), (k[s] = B), (k[h] = v), (k[d] = g), k)[M] || 1,
              D = this.$d.getTime() + A * O
            return Z.w(D, this)
          }),
          (i.subtract = function (A, tt) {
            return this.add(-1 * A, tt)
          }),
          (i.format = function (A) {
            var tt = this,
              k = this.$locale()
            if (!this.isValid()) return k.invalidDate || o
            var et = A || 'YYYY-MM-DDTHH:mm:ssZ',
              M = Z.z(this),
              H = this.$H,
              O = this.$m,
              D = this.$M,
              st = k.weekdays,
              it = k.months,
              Q = function (ft, Et, bt, At) {
                return (ft && (ft[Et] || ft(tt, et))) || bt[Et].slice(0, At)
              },
              vt = function (ft) {
                return Z.s(H % 12 || 12, ft, '0')
              },
              St =
                k.meridiem ||
                function (ft, Et, bt) {
                  var At = ft < 12 ? 'AM' : 'PM'
                  return bt ? At.toLowerCase() : At
                },
              pt = {
                YY: String(this.$y).slice(-2),
                YYYY: this.$y,
                M: D + 1,
                MM: Z.s(D + 1, 2, '0'),
                MMM: Q(k.monthsShort, D, it, 3),
                MMMM: Q(it, D),
                D: this.$D,
                DD: Z.s(this.$D, 2, '0'),
                d: String(this.$W),
                dd: Q(k.weekdaysMin, this.$W, st, 2),
                ddd: Q(k.weekdaysShort, this.$W, st, 3),
                dddd: st[this.$W],
                H: String(H),
                HH: Z.s(H, 2, '0'),
                h: vt(1),
                hh: vt(2),
                a: St(H, O, !0),
                A: St(H, O, !1),
                m: String(O),
                mm: Z.s(O, 2, '0'),
                s: String(this.$s),
                ss: Z.s(this.$s, 2, '0'),
                SSS: Z.s(this.$ms, 3, '0'),
                Z: M
              }
            return et.replace(f, function (ft, Et) {
              return Et || pt[ft] || M.replace(':', '')
            })
          }),
          (i.utcOffset = function () {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
          }),
          (i.diff = function (A, tt, k) {
            var et,
              M = Z.p(tt),
              H = z(A),
              O = (H.utcOffset() - this.utcOffset()) * B,
              D = this - H,
              st = Z.m(this, H)
            return (
              (st =
                ((et = {}),
                (et[l] = st / 12),
                (et[y] = st),
                (et[L] = st / 3),
                (et[T] = (D - O) / 6048e5),
                (et[r] = (D - O) / 864e5),
                (et[h] = D / v),
                (et[s] = D / B),
                (et[d] = D / g),
                et)[M] || D),
              k ? st : Z.a(st)
            )
          }),
          (i.daysInMonth = function () {
            return this.endOf(y).$D
          }),
          (i.$locale = function () {
            return W[this.$L]
          }),
          (i.locale = function (A, tt) {
            if (!A) return this.$L
            var k = this.clone(),
              et = V(A, tt, !0)
            return et && (k.$L = et), k
          }),
          (i.clone = function () {
            return Z.w(this.$d, this)
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
          I
        )
      })(),
      w = ut.prototype
    return (
      (z.prototype = w),
      [
        ['$ms', _],
        ['$s', d],
        ['$m', s],
        ['$H', h],
        ['$W', r],
        ['$M', y],
        ['$y', l],
        ['$D', N]
      ].forEach(function (I) {
        w[I[1]] = function (i) {
          return this.$g(i, I[0], I[1])
        }
      }),
      (z.extend = function (I, i) {
        return I.$i || (I(i, ut, z), (I.$i = !0)), z
      }),
      (z.locale = V),
      (z.isDayjs = P),
      (z.unix = function (I) {
        return z(1e3 * I)
      }),
      (z.en = W[F]),
      (z.Ls = W),
      (z.p = {}),
      z
    )
  })
})(En)
const yn = ['widget', 'remind_at', 'tags', 'files'],
  bn = ({
    limit: ct,
    where: dt,
    order: g,
    user_id: B
  }) => `SELECT a.dispatch_id, a.identity, a.state, a.personal_state, a.operate_state, a.id AS task_id, a.matter_type, a.repeat_type,
a.end_repeat_at, a.create_at, a.category, a.repeat_id, a.cycle, a.cycle_date, a.title, a.detail, a.files,
a.start_time, a.start_time_full_day, a.end_time, a.end_time_full_day, a.remind_at, a.widget, a.project_id,
IFNULL(f.content, '') AS conclusion, a.creator_id, IFNULL(i.create_at, 0) AS update_at, a.complete_at,
a.finish_time, CASE WHEN j.id > 0 THEN 1 ELSE 2 END AS is_follow,
CASE WHEN a.delete_at > 0 THEN 2 ELSE 1 END AS schedule_hide,
CASE WHEN a.complete_at = 0 AND (a.start_time > STRFTIME('%s', 'now') OR cycle_date > DATE('now')) THEN 1
     WHEN a.complete_at = 0 AND (a.end_time = 0 OR a.end_time > STRFTIME('%s', 'now')) THEN 2
     WHEN a.complete_at = 0 AND (a.end_time > 0 OR a.end_time < STRFTIME('%s', 'now')) THEN 3
     WHEN a.complete_at > 0 AND (a.complete_at <= a.end_time OR a.end_time = 0) THEN 4
     WHEN a.complete_at > 0 AND a.end_time > 0 AND a.complete_at > a.end_time THEN 5 END AS matter_state,
w.project_name, project_creator_id, workspace_id, workspace_name, ws_type, is_external_member,
IFNULL(tags, '[]') AS tags, parent_id, parent_name, IFNULL(k.taker_total, 0) AS taker_total,
IFNULL(k.child_total, 0) AS child_total, IFNULL(k.comment_total, 0) AS comment_total,
IFNULL(k.important_total, 0) AS important_total, IFNULL(k.quote_total, 0) AS quote_total,
IFNULL(k.file_total, 0) AS file_total, IFNULL(gadget_meeting_total, 0) AS gadget_meeting_total,
IFNULL(gadget_todo_total, 0) AS gadget_todo_total, flow_step_id, flow_step_name, flow_step_complete_at,
z.user_id, step_user_count, IFNULL(i.create_at, 0) AS update_at, date,
CASE WHEN STRFTIME('%w', date) == '0' THEN '周日'
     WHEN STRFTIME('%w', date) == '1' THEN '周一'
     WHEN STRFTIME('%w', date) == '2' THEN '周二'
     WHEN STRFTIME('%w', date) == '3' THEN '周三'
     WHEN STRFTIME('%w', date) == '4' THEN '周四'
     WHEN STRFTIME('%w', date) == '5' THEN '周五'
     WHEN STRFTIME('%w', date) == '6' THEN '周六' END AS weekday
FROM (SELECT a.dispatch_id, a.identity, a.taker_id, a.state, a.personal_state, a.operate_state, a.delete_at, b.id,
        b.matter_type, b.title, b.detail, CASE WHEN b.files != '' THEN b.files ELSE '[]' END AS files,
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
            ON c.id = d.task_id AND b.repeat_type > 0
            LEFT JOIN task_repeat_finish AS e
            ON d.repeat_id = e.repeat_id AND e.user_id = ${B}
            LEFT JOIN task b1
            ON c.category IN (0, 2) AND SUBSTR(c.parent_id, 0, INSTR(c.parent_id, ',')) = b1.id
  WHERE a.ref_task_id = b.id
    AND b.state = 10201
    AND b.matter_type IN (10701, 10702, 10705)) AS a
    LEFT JOIN (SELECT object_id AS task_id, '[' ||
                                            GROUP_CONCAT('{"tag_id:"' || CAST(tag_id AS text) || '"name":' ||
                                                         name || '"color":' || color || '}') || ']' AS tags
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
    ON a.id = z.id
${dt || ''} 
${g}
${ct} `
var Se = ((ct) => ((ct.up = 'up'), (ct.down = 'down'), ct))(Se || {})
const wn = (ct) => {
    const {
        user_id: dt,
        page_number: g,
        parent_id: B,
        page_record: v,
        timestamp: _,
        direction: d
      } = ct,
      s = `LIMIT ${(g - 1) * v}, ${v}`,
      h = [],
      r = ['a.repeat_id ASC', 'a.id DESC']
    B && h.push(`parent_id IN (${B})`),
      typeof _ == 'number' &&
        h.push(`timestamp ${d === Se.up ? '<' : '>='} ${_}`),
      d &&
        (d === Se.up
          ? r.push('timestamp DESC')
          : r.push('timestamp !=0, timestamp ASC'))
    const T = h.length ? `WHERE ${h.join(' AND ')}` : '',
      y = r.length ? `ORDER BY ${r.join(', ')}` : ''
    return bn({ limit: s, user_id: dt, where: T, order: y })
  },
  vn =
    'http://flyele-dev.oss-cn-shenzhen.aliyuncs.com/middlestation%2F1097162630889616%2F1487318895218688.zip?Expires=1680157153&OSSAccessKeyId=LTAI5tNRFh75VpujzNxcSMxq&Signature=drhJj8F0LoIDe7I%2Fo8rnimBMBYw%3D',
  Ln = '/sql-wasm.wasm'
class Tn {
  constructor() {
    ;(this.db = null), (this.zipObj = null), (this.timeDiff = 0)
  }
  async initDB() {
    const dt = await je({ locateFile: () => Ln }),
      g = await (
        await fetch('https://api.feixiang.cn/userc/v2/system/now')
      ).json()
    g.data && (this.timeDiff = Math.floor(Date.now() / 1e3) - g.data)
    const B = await Nn('database-fly')
    if (B) return (this.db = new dt.Database(B)), this.getTable()
    const v = new dt.Database()
    return (
      (this.db = v),
      v.run(fn),
      await this.fetchZip(vn),
      await this.initTable(),
      this.getTable()
    )
  }
  formatSelectValue({ columns: dt, values: g }) {
    const B = Object.entries(dt)
    return new Array(g.length).fill('').map((_, d) => {
      const s = {}
      for (const [h, r] of B) {
        const T = g[d][Number(h)]
        yn.includes(r)
          ? (s[r] = JSON.parse(T))
          : (s[r] = /^(id)$|_id$/.test(r) ? (T ? String(T) : '') : T)
      }
      return s
    })
  }
  query(dt) {
    const g = He().startOf('day').unix() - this.timeDiff,
      B = wn({ ...dt, timestamp: g }),
      v = this.db.exec(B),
      _ = v[0] ? this.formatSelectValue(v[0]) : []
    return dt.direction === Se.up ? _.reverse() : _
  }
  getTable() {
    return this.db.exec('SELECT * FROM tag_bind')
  }
  async fetchZip(dt) {
    this.zipObj = await pn.init(dt)
  }
  async parseFile(dt) {
    return JSON.parse(await this.zipObj.file(dt).async('string'))
  }
  async initTable() {
    console.log('begin')
    const dt = await this.parseFile('guide')
    for (const [g, B] of Object.entries(dt)) {
      const { data: v } = B
      for (const _ of v) {
        const s = (await this.parseFile(_)).map((r) => {
          const T = {}
          return (
            Object.keys(vr[g]).forEach((y) => {
              T[y] = r[y] || vr[g][y]
            }),
            T
          )
        })
        let h = ''
        s.forEach((r) => {
          h += this.getInsertSql(r, g) + ';'
        }),
          this.db.run(h)
      }
    }
    console.log('done'),
      gn('database-fly', this.db.export()).then(() => {
        console.log('output -->')
      })
  }
  getInsertSql(dt, g) {
    return `INSERT INTO ${g} (${Object.keys(dt).join(
      ' ,'
    )}) VALUES (${Object.values(dt)
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
const Sn = new Tn(),
  Un = 'INIT_DB'
class An {
  constructor() {
    self.onmessage = ({ data: dt }) => {
      console.log('from client', dt), dt === Un && this.initDB()
    }
  }
  initDB() {
    Sn.initDB().then((dt) => {
      self.postMessage({ initData: dt })
    })
  }
}
new An()
