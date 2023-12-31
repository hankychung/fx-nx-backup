'use strict'
var ke = ((nt) => ((nt.up = 'up'), (nt.down = 'down'), nt))(ke || {}),
  qt = ((nt) => (
    (nt[(nt.normal = 0)] = 'normal'),
    (nt[(nt.unComplete = 1)] = 'unComplete'),
    (nt[(nt.complete = 2)] = 'complete'),
    (nt[(nt.dispatch = 3)] = 'dispatch'),
    (nt[(nt.accepted = 4)] = 'accepted'),
    (nt[(nt.cooperation = 5)] = 'cooperation'),
    (nt[(nt.personal = 6)] = 'personal'),
    (nt[(nt.in_progress = 7)] = 'in_progress'),
    (nt[(nt.delay = 8)] = 'delay'),
    nt
  ))(qt || {}),
  We = ((nt) => (
    (nt.time = 'time'),
    (nt.group = 'group'),
    (nt.project = 'project'),
    (nt.default = 'default'),
    nt
  ))(We || {}),
  he =
    typeof globalThis < 'u'
      ? globalThis
      : typeof window < 'u'
      ? window
      : typeof global < 'u'
      ? global
      : typeof self < 'u'
      ? self
      : {}
function _n(nt) {
  if (nt.__esModule) return nt
  var ot = nt.default
  if (typeof ot == 'function') {
    var m = function M() {
      if (this instanceof M) {
        var v = [null]
        v.push.apply(v, arguments)
        var f = Function.bind.apply(ot, v)
        return new f()
      }
      return ot.apply(this, arguments)
    }
    m.prototype = ot.prototype
  } else m = {}
  return (
    Object.defineProperty(m, '__esModule', { value: !0 }),
    Object.keys(nt).forEach(function (M) {
      var v = Object.getOwnPropertyDescriptor(nt, M)
      Object.defineProperty(
        m,
        M,
        v.get
          ? v
          : {
              enumerable: !0,
              get: function () {
                return nt[M]
              }
            }
      )
    }),
    m
  )
}
var Xe = {},
  pn = {
    get exports() {
      return Xe
    },
    set exports(nt) {
      Xe = nt
    }
  }
const mn = {},
  Nn = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: mn },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  Te = _n(Nn)
;(function (nt, ot) {
  var m = void 0,
    M = function (v) {
      return (
        m ||
        ((m = new Promise(function (f, h) {
          var s = typeof v < 'u' ? v : {},
            _ = s.onAbort
          ;(s.onAbort = function (t) {
            h(new Error(t)), _ && _(t)
          }),
            (s.postRun = s.postRun || []),
            s.postRun.push(function () {
              f(s)
            }),
            (nt = void 0)
          var r
          r || (r = typeof s < 'u' ? s : {}),
            (r.onRuntimeInitialized = function () {
              function t(C, Q) {
                switch (typeof Q) {
                  case 'boolean':
                    dn(C, Q ? 1 : 0)
                    break
                  case 'number':
                    un(C, Q)
                    break
                  case 'string':
                    ln(C, Q, -1, -1)
                    break
                  case 'object':
                    if (Q === null) Ur(C)
                    else if (Q.length != null) {
                      var ft = Pe(Q)
                      cn(C, ft, Q.length, -1), we(ft)
                    } else
                      Le(
                        C,
                        'Wrong API use : tried to return a value of an unknown type (' +
                          Q +
                          ').',
                        -1
                      )
                    break
                  default:
                    Ur(C)
                }
              }
              function e(C, Q) {
                for (var ft = [], mt = 0; mt < C; mt += 1) {
                  var Et = K(Q + 4 * mt, 'i32'),
                    Tt = rn(Et)
                  if (Tt === 1 || Tt === 2) Et = on(Et)
                  else if (Tt === 3) Et = an(Et)
                  else if (Tt === 4) {
                    ;(Tt = Et), (Et = nn(Tt)), (Tt = sn(Tt))
                    for (var $t = new Uint8Array(Et), Ct = 0; Ct < Et; Ct += 1)
                      $t[Ct] = I[Tt + Ct]
                    Et = $t
                  } else Et = null
                  ft.push(Et)
                }
                return ft
              }
              function a(C, Q) {
                ;(this.La = C), (this.db = Q), (this.Ja = 1), (this.fb = [])
              }
              function c(C, Q) {
                if (
                  ((this.db = Q),
                  (Q = k(C) + 1),
                  (this.Ya = ye(Q)),
                  this.Ya === null)
                )
                  throw Error('Unable to allocate memory for the SQL string')
                i(C, et, this.Ya, Q),
                  (this.eb = this.Ya),
                  (this.Ua = this.ib = null)
              }
              function y(C) {
                if (
                  ((this.filename =
                    'dbfile_' + ((4294967295 * Math.random()) >>> 0)),
                  C != null)
                ) {
                  var Q = this.filename,
                    ft = '/',
                    mt = Q
                  if (
                    (ft &&
                      ((ft = typeof ft == 'string' ? ft : ae(ft)),
                      (mt = Q ? st(ft + '/' + Q) : ft)),
                    (Q = _r(!0, !0)),
                    (mt = _e(mt, ((Q !== void 0 ? Q : 438) & 4095) | 32768, 0)),
                    C)
                  ) {
                    if (typeof C == 'string') {
                      ft = Array(C.length)
                      for (var Et = 0, Tt = C.length; Et < Tt; ++Et)
                        ft[Et] = C.charCodeAt(Et)
                      C = ft
                    }
                    me(mt, Q | 146),
                      (ft = re(mt, 577)),
                      dr(ft, C, 0, C.length, 0),
                      xe(ft),
                      me(mt, Q)
                  }
                }
                this.handleError(Nt(this.filename, P)),
                  (this.db = K(P, 'i32')),
                  fn(this.db),
                  (this.Za = {}),
                  (this.Na = {})
              }
              var P = Zt(4),
                Z = r.cwrap,
                Nt = Z('sqlite3_open', 'number', ['string', 'number']),
                Lt = Z('sqlite3_close_v2', 'number', ['number']),
                vt = Z('sqlite3_exec', 'number', [
                  'number',
                  'string',
                  'number',
                  'number',
                  'number'
                ]),
                It = Z('sqlite3_changes', 'number', ['number']),
                Ht = Z('sqlite3_prepare_v2', 'number', [
                  'number',
                  'string',
                  'number',
                  'number',
                  'number'
                ]),
                wr = Z('sqlite3_sql', 'string', ['number']),
                Mr = Z('sqlite3_normalized_sql', 'string', ['number']),
                vr = Z('sqlite3_prepare_v2', 'number', [
                  'number',
                  'number',
                  'number',
                  'number',
                  'number'
                ]),
                jr = Z('sqlite3_bind_text', 'number', [
                  'number',
                  'number',
                  'number',
                  'number',
                  'number'
                ]),
                Lr = Z('sqlite3_bind_blob', 'number', [
                  'number',
                  'number',
                  'number',
                  'number',
                  'number'
                ]),
                Gr = Z('sqlite3_bind_double', 'number', [
                  'number',
                  'number',
                  'number'
                ]),
                Pr = Z('sqlite3_bind_int', 'number', [
                  'number',
                  'number',
                  'number'
                ]),
                $r = Z('sqlite3_bind_parameter_index', 'number', [
                  'number',
                  'string'
                ]),
                Hr = Z('sqlite3_step', 'number', ['number']),
                qr = Z('sqlite3_errmsg', 'string', ['number']),
                Wr = Z('sqlite3_column_count', 'number', ['number']),
                Xr = Z('sqlite3_data_count', 'number', ['number']),
                Yr = Z('sqlite3_column_double', 'number', ['number', 'number']),
                Tr = Z('sqlite3_column_text', 'string', ['number', 'number']),
                Zr = Z('sqlite3_column_blob', 'number', ['number', 'number']),
                Kr = Z('sqlite3_column_bytes', 'number', ['number', 'number']),
                Jr = Z('sqlite3_column_type', 'number', ['number', 'number']),
                Vr = Z('sqlite3_column_name', 'string', ['number', 'number']),
                Qr = Z('sqlite3_reset', 'number', ['number']),
                tn = Z('sqlite3_clear_bindings', 'number', ['number']),
                en = Z('sqlite3_finalize', 'number', ['number']),
                Sr = Z(
                  'sqlite3_create_function_v2',
                  'number',
                  'number string number number number number number number number'.split(
                    ' '
                  )
                ),
                rn = Z('sqlite3_value_type', 'number', ['number']),
                nn = Z('sqlite3_value_bytes', 'number', ['number']),
                an = Z('sqlite3_value_text', 'string', ['number']),
                sn = Z('sqlite3_value_blob', 'number', ['number']),
                on = Z('sqlite3_value_double', 'number', ['number']),
                un = Z('sqlite3_result_double', '', ['number', 'number']),
                Ur = Z('sqlite3_result_null', '', ['number']),
                ln = Z('sqlite3_result_text', '', [
                  'number',
                  'string',
                  'number',
                  'number'
                ]),
                cn = Z('sqlite3_result_blob', '', [
                  'number',
                  'number',
                  'number',
                  'number'
                ]),
                dn = Z('sqlite3_result_int', '', ['number', 'number']),
                Le = Z('sqlite3_result_error', '', [
                  'number',
                  'string',
                  'number'
                ]),
                kr = Z('sqlite3_aggregate_context', 'number', [
                  'number',
                  'number'
                ]),
                fn = Z('RegisterExtensionFunctions', 'number', ['number'])
              ;(a.prototype.bind = function (C) {
                if (!this.La) throw 'Statement closed'
                return (
                  this.reset(),
                  Array.isArray(C)
                    ? this.xb(C)
                    : C != null && typeof C == 'object'
                    ? this.yb(C)
                    : !0
                )
              }),
                (a.prototype.step = function () {
                  if (!this.La) throw 'Statement closed'
                  this.Ja = 1
                  var C = Hr(this.La)
                  switch (C) {
                    case 100:
                      return !0
                    case 101:
                      return !1
                    default:
                      throw this.db.handleError(C)
                  }
                }),
                (a.prototype.sb = function (C) {
                  return (
                    C == null && ((C = this.Ja), (this.Ja += 1)), Yr(this.La, C)
                  )
                }),
                (a.prototype.Cb = function (C) {
                  if (
                    (C == null && ((C = this.Ja), (this.Ja += 1)),
                    (C = Tr(this.La, C)),
                    typeof BigInt != 'function')
                  )
                    throw Error('BigInt is not supported')
                  return BigInt(C)
                }),
                (a.prototype.Db = function (C) {
                  return (
                    C == null && ((C = this.Ja), (this.Ja += 1)), Tr(this.La, C)
                  )
                }),
                (a.prototype.getBlob = function (C) {
                  C == null && ((C = this.Ja), (this.Ja += 1))
                  var Q = Kr(this.La, C)
                  C = Zr(this.La, C)
                  for (var ft = new Uint8Array(Q), mt = 0; mt < Q; mt += 1)
                    ft[mt] = I[C + mt]
                  return ft
                }),
                (a.prototype.get = function (C, Q) {
                  ;(Q = Q || {}),
                    C != null && this.bind(C) && this.step(),
                    (C = [])
                  for (var ft = Xr(this.La), mt = 0; mt < ft; mt += 1)
                    switch (Jr(this.La, mt)) {
                      case 1:
                        var Et = Q.useBigInt ? this.Cb(mt) : this.sb(mt)
                        C.push(Et)
                        break
                      case 2:
                        C.push(this.sb(mt))
                        break
                      case 3:
                        C.push(this.Db(mt))
                        break
                      case 4:
                        C.push(this.getBlob(mt))
                        break
                      default:
                        C.push(null)
                    }
                  return C
                }),
                (a.prototype.getColumnNames = function () {
                  for (var C = [], Q = Wr(this.La), ft = 0; ft < Q; ft += 1)
                    C.push(Vr(this.La, ft))
                  return C
                }),
                (a.prototype.getAsObject = function (C, Q) {
                  ;(C = this.get(C, Q)), (Q = this.getColumnNames())
                  for (var ft = {}, mt = 0; mt < Q.length; mt += 1)
                    ft[Q[mt]] = C[mt]
                  return ft
                }),
                (a.prototype.getSQL = function () {
                  return wr(this.La)
                }),
                (a.prototype.getNormalizedSQL = function () {
                  return Mr(this.La)
                }),
                (a.prototype.run = function (C) {
                  return C != null && this.bind(C), this.step(), this.reset()
                }),
                (a.prototype.nb = function (C, Q) {
                  Q == null && ((Q = this.Ja), (this.Ja += 1)), (C = Dt(C))
                  var ft = Pe(C)
                  this.fb.push(ft),
                    this.db.handleError(jr(this.La, Q, ft, C.length - 1, 0))
                }),
                (a.prototype.wb = function (C, Q) {
                  Q == null && ((Q = this.Ja), (this.Ja += 1))
                  var ft = Pe(C)
                  this.fb.push(ft),
                    this.db.handleError(Lr(this.La, Q, ft, C.length, 0))
                }),
                (a.prototype.mb = function (C, Q) {
                  Q == null && ((Q = this.Ja), (this.Ja += 1)),
                    this.db.handleError(
                      (C === (C | 0) ? Pr : Gr)(this.La, Q, C)
                    )
                }),
                (a.prototype.zb = function (C) {
                  C == null && ((C = this.Ja), (this.Ja += 1)),
                    Lr(this.La, C, 0, 0, 0)
                }),
                (a.prototype.ob = function (C, Q) {
                  switch (
                    (Q == null && ((Q = this.Ja), (this.Ja += 1)), typeof C)
                  ) {
                    case 'string':
                      this.nb(C, Q)
                      return
                    case 'number':
                      this.mb(C, Q)
                      return
                    case 'bigint':
                      this.nb(C.toString(), Q)
                      return
                    case 'boolean':
                      this.mb(C + 0, Q)
                      return
                    case 'object':
                      if (C === null) {
                        this.zb(Q)
                        return
                      }
                      if (C.length != null) {
                        this.wb(C, Q)
                        return
                      }
                  }
                  throw (
                    'Wrong API use : tried to bind a value of an unknown type (' +
                    C +
                    ').'
                  )
                }),
                (a.prototype.yb = function (C) {
                  var Q = this
                  return (
                    Object.keys(C).forEach(function (ft) {
                      var mt = $r(Q.La, ft)
                      mt !== 0 && Q.ob(C[ft], mt)
                    }),
                    !0
                  )
                }),
                (a.prototype.xb = function (C) {
                  for (var Q = 0; Q < C.length; Q += 1) this.ob(C[Q], Q + 1)
                  return !0
                }),
                (a.prototype.reset = function () {
                  return this.freemem(), tn(this.La) === 0 && Qr(this.La) === 0
                }),
                (a.prototype.freemem = function () {
                  for (var C; (C = this.fb.pop()) !== void 0; ) we(C)
                }),
                (a.prototype.free = function () {
                  this.freemem()
                  var C = en(this.La) === 0
                  return delete this.db.Za[this.La], (this.La = 0), C
                }),
                (c.prototype.next = function () {
                  if (this.Ya === null) return { done: !0 }
                  if (
                    (this.Ua !== null && (this.Ua.free(), (this.Ua = null)),
                    !this.db.db)
                  )
                    throw (this.gb(), Error('Database closed'))
                  var C = ce(),
                    Q = Zt(4)
                  z(P), z(Q)
                  try {
                    this.db.handleError(vr(this.db.db, this.eb, -1, P, Q)),
                      (this.eb = K(Q, 'i32'))
                    var ft = K(P, 'i32')
                    return ft === 0
                      ? (this.gb(), { done: !0 })
                      : ((this.Ua = new a(ft, this.db)),
                        (this.db.Za[ft] = this.Ua),
                        { value: this.Ua, done: !1 })
                  } catch (mt) {
                    throw ((this.ib = A(this.eb)), this.gb(), mt)
                  } finally {
                    de(C)
                  }
                }),
                (c.prototype.gb = function () {
                  we(this.Ya), (this.Ya = null)
                }),
                (c.prototype.getRemainingSQL = function () {
                  return this.ib !== null ? this.ib : A(this.eb)
                }),
                typeof Symbol == 'function' &&
                  typeof Symbol.iterator == 'symbol' &&
                  (c.prototype[Symbol.iterator] = function () {
                    return this
                  }),
                (y.prototype.run = function (C, Q) {
                  if (!this.db) throw 'Database closed'
                  if (Q) {
                    C = this.prepare(C, Q)
                    try {
                      C.step()
                    } finally {
                      C.free()
                    }
                  } else this.handleError(vt(this.db, C, 0, 0, P))
                  return this
                }),
                (y.prototype.exec = function (C, Q, ft) {
                  if (!this.db) throw 'Database closed'
                  var mt = ce(),
                    Et = null
                  try {
                    var Tt = k(C) + 1,
                      $t = Zt(Tt)
                    i(C, I, $t, Tt)
                    var Ct = $t,
                      zt = Zt(4)
                    for (C = []; K(Ct, 'i8') !== 0; ) {
                      z(P), z(zt), this.handleError(vr(this.db, Ct, -1, P, zt))
                      var Bt = K(P, 'i32')
                      if (((Ct = K(zt, 'i32')), Bt !== 0)) {
                        for (
                          Tt = null,
                            Et = new a(Bt, this),
                            Q != null && Et.bind(Q);
                          Et.step();

                        )
                          Tt === null &&
                            ((Tt = {
                              columns: Et.getColumnNames(),
                              values: []
                            }),
                            C.push(Tt)),
                            Tt.values.push(Et.get(null, ft))
                        Et.free()
                      }
                    }
                    return C
                  } catch (fe) {
                    throw (Et && Et.free(), fe)
                  } finally {
                    de(mt)
                  }
                }),
                (y.prototype.each = function (C, Q, ft, mt, Et) {
                  typeof Q == 'function' && ((mt = ft), (ft = Q), (Q = void 0)),
                    (C = this.prepare(C, Q))
                  try {
                    for (; C.step(); ) ft(C.getAsObject(null, Et))
                  } finally {
                    C.free()
                  }
                  if (typeof mt == 'function') return mt()
                }),
                (y.prototype.prepare = function (C, Q) {
                  if (
                    (z(P),
                    this.handleError(Ht(this.db, C, -1, P, 0)),
                    (C = K(P, 'i32')),
                    C === 0)
                  )
                    throw 'Nothing to prepare'
                  var ft = new a(C, this)
                  return Q != null && ft.bind(Q), (this.Za[C] = ft)
                }),
                (y.prototype.iterateStatements = function (C) {
                  return new c(C, this)
                }),
                (y.prototype.export = function () {
                  Object.values(this.Za).forEach(function (Q) {
                    Q.free()
                  }),
                    Object.values(this.Na).forEach(le),
                    (this.Na = {}),
                    this.handleError(Lt(this.db))
                  var C = Rr(this.filename)
                  return (
                    this.handleError(Nt(this.filename, P)),
                    (this.db = K(P, 'i32')),
                    C
                  )
                }),
                (y.prototype.close = function () {
                  this.db !== null &&
                    (Object.values(this.Za).forEach(function (C) {
                      C.free()
                    }),
                    Object.values(this.Na).forEach(le),
                    (this.Na = {}),
                    this.handleError(Lt(this.db)),
                    ar('/' + this.filename),
                    (this.db = null))
                }),
                (y.prototype.handleError = function (C) {
                  if (C === 0) return null
                  throw ((C = qr(this.db)), Error(C))
                }),
                (y.prototype.getRowsModified = function () {
                  return It(this.db)
                }),
                (y.prototype.create_function = function (C, Q) {
                  Object.prototype.hasOwnProperty.call(this.Na, C) &&
                    (le(this.Na[C]), delete this.Na[C])
                  var ft = Ge(function (mt, Et, Tt) {
                    Et = e(Et, Tt)
                    try {
                      var $t = Q.apply(null, Et)
                    } catch (Ct) {
                      Le(mt, Ct, -1)
                      return
                    }
                    t(mt, $t)
                  }, 'viii')
                  return (
                    (this.Na[C] = ft),
                    this.handleError(
                      Sr(this.db, C, Q.length, 1, 0, ft, 0, 0, 0)
                    ),
                    this
                  )
                }),
                (y.prototype.create_aggregate = function (C, Q) {
                  var ft =
                      Q.init ||
                      function () {
                        return null
                      },
                    mt =
                      Q.finalize ||
                      function (zt) {
                        return zt
                      },
                    Et = Q.step
                  if (!Et)
                    throw (
                      'An aggregate function must have a step function in ' + C
                    )
                  var Tt = {}
                  Object.hasOwnProperty.call(this.Na, C) &&
                    (le(this.Na[C]), delete this.Na[C]),
                    (Q = C + '__finalize'),
                    Object.hasOwnProperty.call(this.Na, Q) &&
                      (le(this.Na[Q]), delete this.Na[Q])
                  var $t = Ge(function (zt, Bt, fe) {
                      var Qt = kr(zt, 1)
                      Object.hasOwnProperty.call(Tt, Qt) || (Tt[Qt] = ft()),
                        (Bt = e(Bt, fe)),
                        (Bt = [Tt[Qt]].concat(Bt))
                      try {
                        Tt[Qt] = Et.apply(null, Bt)
                      } catch (hn) {
                        delete Tt[Qt], Le(zt, hn, -1)
                      }
                    }, 'viii'),
                    Ct = Ge(function (zt) {
                      var Bt = kr(zt, 1)
                      try {
                        var fe = mt(Tt[Bt])
                      } catch (Qt) {
                        delete Tt[Bt], Le(zt, Qt, -1)
                        return
                      }
                      t(zt, fe), delete Tt[Bt]
                    }, 'vi')
                  return (
                    (this.Na[C] = $t),
                    (this.Na[Q] = Ct),
                    this.handleError(
                      Sr(this.db, C, Et.length - 1, 1, 0, 0, $t, Ct, 0)
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
            d,
            E,
            U,
            R,
            O
          g
            ? ((o = l ? Te.dirname(o) + '/' : __dirname + '/'),
              (O = () => {
                R || ((U = Te), (R = Te))
              }),
              (p = function (t, e) {
                return (
                  O(),
                  (t = R.normalize(t)),
                  U.readFileSync(t, e ? void 0 : 'utf8')
                )
              }),
              (E = (t) => (
                (t = p(t, !0)), t.buffer || (t = new Uint8Array(t)), t
              )),
              (d = (t, e, a) => {
                O(),
                  (t = R.normalize(t)),
                  U.readFile(t, function (c, y) {
                    c ? a(c) : e(y.buffer)
                  })
              }),
              1 < process.argv.length &&
                (b = process.argv[1].replace(/\\/g, '/')),
              process.argv.slice(2),
              (nt.exports = r),
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
              (d = (t, e, a) => {
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
          var V
          r.wasmBinary && (V = r.wasmBinary),
            r.noExitRuntime,
            typeof WebAssembly != 'object' &&
              kt('no native wasm support detected')
          var B,
            W = !1,
            dt = typeof TextDecoder < 'u' ? new TextDecoder('utf8') : void 0
          function w(t, e, a) {
            var c = e + a
            for (a = e; t[a] && !(a >= c); ) ++a
            if (16 < a - e && t.buffer && dt) return dt.decode(t.subarray(e, a))
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
          function A(t, e) {
            return t ? w(et, t, e) : ''
          }
          function i(t, e, a, c) {
            if (!(0 < c)) return 0
            var y = a
            c = a + c - 1
            for (var P = 0; P < t.length; ++P) {
              var Z = t.charCodeAt(P)
              if (55296 <= Z && 57343 >= Z) {
                var Nt = t.charCodeAt(++P)
                Z = (65536 + ((Z & 1023) << 10)) | (Nt & 1023)
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
          function k(t) {
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
          var tt, I, et, x, $, D, F, ut
          function at() {
            var t = B.buffer
            ;(tt = t),
              (r.HEAP8 = I = new Int8Array(t)),
              (r.HEAP16 = x = new Int16Array(t)),
              (r.HEAP32 = $ = new Int32Array(t)),
              (r.HEAPU8 = et = new Uint8Array(t)),
              (r.HEAPU16 = new Uint16Array(t)),
              (r.HEAPU32 = D = new Uint32Array(t)),
              (r.HEAPF32 = F = new Float32Array(t)),
              (r.HEAPF64 = ut = new Float64Array(t))
          }
          var H,
            lt = [],
            bt = [],
            _t = []
          function ct() {
            var t = r.preRun.shift()
            lt.unshift(t)
          }
          var yt = 0,
            wt = null
          function kt(t) {
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
              if (t == n && V) return new Uint8Array(V)
              if (E) return E(t)
              throw 'both async and sync fetching of the wasm failed'
            } catch (e) {
              kt(e)
            }
          }
          function N() {
            if (!V && (T || l)) {
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
              if (d)
                return new Promise(function (t, e) {
                  d(
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
          function J(t) {
            for (; 0 < t.length; ) t.shift()(r)
          }
          function K(t, e = 'i8') {
            switch ((e.endsWith('*') && (e = '*'), e)) {
              case 'i1':
                return I[t >> 0]
              case 'i8':
                return I[t >> 0]
              case 'i16':
                return x[t >> 1]
              case 'i32':
                return $[t >> 2]
              case 'i64':
                return $[t >> 2]
              case 'float':
                return F[t >> 2]
              case 'double':
                return ut[t >> 3]
              case '*':
                return D[t >> 2]
              default:
                kt('invalid type for getValue: ' + e)
            }
            return null
          }
          function z(t) {
            var e = 'i32'
            switch ((e.endsWith('*') && (e = '*'), e)) {
              case 'i1':
                I[t >> 0] = 0
                break
              case 'i8':
                I[t >> 0] = 0
                break
              case 'i16':
                x[t >> 1] = 0
                break
              case 'i32':
                $[t >> 2] = 0
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
                  ($[t >> 2] = S[0]),
                  ($[(t + 4) >> 2] = S[1])
                break
              case 'float':
                F[t >> 2] = 0
                break
              case 'double':
                ut[t >> 3] = 0
                break
              case '*':
                D[t >> 2] = 0
                break
              default:
                kt('invalid type for setValue: ' + e)
            }
          }
          var rt = (t, e) => {
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
            ht = (t) => {
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
            return () => kt('randomDevice')
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
              (t = rt(
                t.split('/').filter((c) => !!c),
                !e
              ).join('/')),
              (e ? '/' : '') + t || '.'
            )
          }
          function Dt(t, e) {
            var a = Array(k(t) + 1)
            return (t = i(t, a, 0, a.length)), e && (a.length = t), a
          }
          var Wt = []
          function xt(t, e) {
            ;(Wt[t] = { input: [], output: [], Xa: e }), Oe(t, Kt)
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
            At = {
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
            pt = {
              Qa: null,
              Ra: function () {
                return pt.createNode(null, '/', 16895, 0)
              },
              createNode: function (t, e, a, c) {
                if ((a & 61440) === 24576 || (a & 61440) === 4096)
                  throw new X(63)
                return (
                  pt.Qa ||
                    (pt.Qa = {
                      dir: {
                        node: {
                          Pa: pt.Ga.Pa,
                          Oa: pt.Ga.Oa,
                          lookup: pt.Ga.lookup,
                          ab: pt.Ga.ab,
                          rename: pt.Ga.rename,
                          unlink: pt.Ga.unlink,
                          rmdir: pt.Ga.rmdir,
                          readdir: pt.Ga.readdir,
                          symlink: pt.Ga.symlink
                        },
                        stream: { Ta: pt.Ha.Ta }
                      },
                      file: {
                        node: { Pa: pt.Ga.Pa, Oa: pt.Ga.Oa },
                        stream: {
                          Ta: pt.Ha.Ta,
                          read: pt.Ha.read,
                          write: pt.Ha.write,
                          lb: pt.Ha.lb,
                          bb: pt.Ha.bb,
                          cb: pt.Ha.cb
                        }
                      },
                      link: {
                        node: {
                          Pa: pt.Ga.Pa,
                          Oa: pt.Ga.Oa,
                          readlink: pt.Ga.readlink
                        },
                        stream: {}
                      },
                      pb: { node: { Pa: pt.Ga.Pa, Oa: pt.Ga.Oa }, stream: xr }
                    }),
                  (a = Ve(t, e, a, c)),
                  (a.mode & 61440) === 16384
                    ? ((a.Ga = pt.Qa.dir.node),
                      (a.Ha = pt.Qa.dir.stream),
                      (a.Ia = {}))
                    : (a.mode & 61440) === 32768
                    ? ((a.Ga = pt.Qa.file.node),
                      (a.Ha = pt.Qa.file.stream),
                      (a.Ma = 0),
                      (a.Ia = null))
                    : (a.mode & 61440) === 40960
                    ? ((a.Ga = pt.Qa.link.node), (a.Ha = pt.Qa.link.stream))
                    : (a.mode & 61440) === 8192 &&
                      ((a.Ga = pt.Qa.pb.node), (a.Ha = pt.Qa.pb.stream)),
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
                    e.size !== void 0 && pt.Gb(t, e.size)
                },
                lookup: function () {
                  throw Xt[44]
                },
                ab: function (t, e, a, c) {
                  return pt.createNode(t, e, a, c)
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
                  return (t = pt.createNode(t, e, 41471, 0)), (t.link = a), t
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
                  if ((pt.qb(t, y + c), t.Ia.subarray && e.subarray))
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
                  pt.qb(t.node, e + a), (t.node.Ma = Math.max(t.node.Ma, e + a))
                },
                bb: function (t, e, a, c, y) {
                  if ((t.node.mode & 61440) !== 32768) throw new X(43)
                  if (((t = t.node.Ia), y & 2 || t.buffer !== tt)) {
                    if (
                      ((0 < a || a + e < t.length) &&
                        (t.subarray
                          ? (t = t.subarray(a, a + e))
                          : (t = Array.prototype.slice.call(t, a, a + e))),
                      (a = !0),
                      (e = 65536 * Math.ceil(e / 65536)),
                      (y = br(65536, e))
                        ? (et.fill(0, y, y + e), (e = y))
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
                  return y & 2 || pt.Ha.write(t, e, 0, c, a, !1), 0
                }
              }
            },
            Rt = null,
            ne = {},
            jt = [],
            Ie = 1,
            Gt = null,
            ie = !0,
            X = null,
            Xt = {},
            Ft = (t, e = {}) => {
              if (((t = gt('/', t)), !t)) return { path: '', node: null }
              if (((e = Object.assign({ rb: !0, kb: 0 }, e)), 8 < e.kb))
                throw new X(32)
              t = rt(
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
                      ((a = sr(c)),
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
            De = (t, e) => {
              for (var a = 0, c = 0; c < e.length; c++)
                a = ((a << 5) - a + e.charCodeAt(c)) | 0
              return ((t + a) >>> 0) % Gt.length
            },
            Je = (t) => {
              var e = De(t.parent.id, t.name)
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
              for (a = Gt[De(t.id, e)]; a; a = a.Wa) {
                var c = a.name
                if (a.parent.id === t.id && c === e) return a
              }
              return t.Ga.lookup(t, e)
            },
            Ve = (t, e, a, c) => (
              (t = new gr(t, e, a, c)),
              (e = De(t.parent.id, t.name)),
              (t.Wa = Gt[e]),
              (Gt[e] = t)
            ),
            Or = { r: 0, 'r+': 2, w: 577, 'w+': 578, a: 1089, 'a+': 1090 },
            Qe = (t) => {
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
            tr = (t, e) => {
              try {
                return Jt(t, e), 20
              } catch {}
              return ee(t, 'wx')
            },
            er = (t, e, a) => {
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
            Fr = (t = 0) => {
              for (; 4096 >= t; t++) if (!jt[t]) return t
              throw new X(33)
            },
            rr = (t, e) => (
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
              (e = Fr(e)),
              (t.fd = e),
              (jt[e] = t)
            ),
            xr = {
              open: (t) => {
                ;(t.Ha = ne[t.node.rdev].Ha), t.Ha.open && t.Ha.open(t)
              },
              Ta: () => {
                throw new X(70)
              }
            },
            Oe = (t, e) => {
              ne[t] = { Ha: e }
            },
            nr = (t, e) => {
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
              if (((t = ht(t)), !t || t === '.' || t === '..')) throw new X(28)
              var y = tr(c, t)
              if (y) throw new X(y)
              if (!c.Ga.ab) throw new X(63)
              return c.Ga.ab(c, t, e, a)
            },
            Pt = (t, e) => _e(t, ((e !== void 0 ? e : 511) & 1023) | 16384, 0),
            pe = (t, e, a) => {
              typeof a > 'u' && ((a = e), (e = 438)), _e(t, e | 8192, a)
            },
            Fe = (t, e) => {
              if (!gt(t)) throw new X(44)
              var a = Ft(e, { parent: !0 }).node
              if (!a) throw new X(44)
              e = ht(e)
              var c = tr(a, e)
              if (c) throw new X(c)
              if (!a.Ga.symlink) throw new X(63)
              a.Ga.symlink(a, e, t)
            },
            ir = (t) => {
              var e = Ft(t, { parent: !0 }).node
              t = ht(t)
              var a = Jt(e, t),
                c = er(e, t, !0)
              if (c) throw new X(c)
              if (!e.Ga.rmdir) throw new X(63)
              if (a.Va) throw new X(10)
              e.Ga.rmdir(e, t), Je(a)
            },
            ar = (t) => {
              var e = Ft(t, { parent: !0 }).node
              if (!e) throw new X(44)
              t = ht(t)
              var a = Jt(e, t),
                c = er(e, t, !1)
              if (c) throw new X(c)
              if (!e.Ga.unlink) throw new X(63)
              if (a.Va) throw new X(10)
              e.Ga.unlink(e, t), Je(a)
            },
            sr = (t) => {
              if (((t = Ft(t).node), !t)) throw new X(44)
              if (!t.Ga.readlink) throw new X(28)
              return gt(ae(t.parent), t.Ga.readlink(t))
            },
            se = (t, e) => {
              if (((t = Ft(t, { Sa: !e }).node), !t)) throw new X(44)
              if (!t.Ga.Pa) throw new X(63)
              return t.Ga.Pa(t)
            },
            or = (t) => se(t, !0),
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
            ur = (t, e) => {
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
                var c = Or[e]
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
                    : (y.mode & 61440) === 16384 && (Qe(e) !== 'r' || e & 512)
                    ? 31
                    : ee(y, Qe(e))
                  : 44)
              )
                throw new X(a)
              return (
                e & 512 && !c && ur(y, 0),
                (e &= -131713),
                (y = rr({
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
            xe = (t) => {
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
            lr = (t, e, a) => {
              if (t.fd === null) throw new X(8)
              if (!t.seekable || !t.Ha.Ta) throw new X(70)
              if (a != 0 && a != 1 && a != 2) throw new X(28)
              ;(t.position = t.Ha.Ta(t, e, a)), (t.Ib = [])
            },
            cr = (t, e, a, c, y) => {
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
            dr = (t, e, a, c, y) => {
              if (0 > c || 0 > y) throw new X(28)
              if (t.fd === null) throw new X(8)
              if (!(t.flags & 2097155)) throw new X(8)
              if ((t.node.mode & 61440) === 16384) throw new X(31)
              if (!t.Ha.write) throw new X(28)
              t.seekable && t.flags & 1024 && lr(t, 0, 2)
              var P = typeof y < 'u'
              if (!P) y = t.position
              else if (!t.seekable) throw new X(70)
              return (
                (e = t.Ha.write(t, e, a, c, y, void 0)),
                P || (t.position += e),
                e
              )
            },
            Rr = (t) => {
              var e,
                a = re(t, a || 0)
              t = se(t).size
              var c = new Uint8Array(t)
              return cr(a, c, 0, t, 0), (e = c), xe(a), e
            },
            fr = () => {
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
            hr,
            _r = (t, e) => {
              var a = 0
              return t && (a |= 365), e && (a |= 146), a
            },
            oe = (t, e, a) => {
              t = st('/dev/' + t)
              var c = _r(!!e, !!a)
              Re || (Re = 64)
              var y = (Re++ << 8) | 0
              Oe(y, {
                open: (P) => {
                  P.seekable = !1
                },
                close: () => {
                  a && a.buffer && a.buffer.length && a(10)
                },
                read: (P, Z, Nt, Lt) => {
                  for (var vt = 0, It = 0; It < Lt; It++) {
                    try {
                      var Ht = e()
                    } catch {
                      throw new X(29)
                    }
                    if (Ht === void 0 && vt === 0) throw new X(6)
                    if (Ht == null) break
                    vt++, (Z[Nt + It] = Ht)
                  }
                  return vt && (P.node.timestamp = Date.now()), vt
                },
                write: (P, Z, Nt, Lt) => {
                  for (var vt = 0; vt < Lt; vt++)
                    try {
                      a(Z[Nt + vt])
                    } catch {
                      throw new X(29)
                    }
                  return Lt && (P.node.timestamp = Date.now()), vt
                }
              }),
                pe(t, c, y)
            },
            Re,
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
              ($[a >> 2] = c.dev),
              ($[(a + 8) >> 2] = c.ino),
              ($[(a + 12) >> 2] = c.mode),
              (D[(a + 16) >> 2] = c.nlink),
              ($[(a + 20) >> 2] = c.uid),
              ($[(a + 24) >> 2] = c.gid),
              ($[(a + 28) >> 2] = c.rdev),
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
              ($[(a + 40) >> 2] = S[0]),
              ($[(a + 44) >> 2] = S[1]),
              ($[(a + 48) >> 2] = 4096),
              ($[(a + 52) >> 2] = c.blocks),
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
              ($[(a + 56) >> 2] = S[0]),
              ($[(a + 60) >> 2] = S[1]),
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
              ($[(a + 72) >> 2] = S[0]),
              ($[(a + 76) >> 2] = S[1]),
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
              ($[(a + 88) >> 2] = S[0]),
              ($[(a + 92) >> 2] = S[1]),
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
              ($[(a + 104) >> 2] = S[0]),
              ($[(a + 108) >> 2] = S[1]),
              0
            )
          }
          var Ee = void 0
          function be() {
            return (Ee += 4), $[(Ee - 4) >> 2]
          }
          function Mt(t) {
            if (((t = jt[t]), !t)) throw new X(8)
            return t
          }
          function Ce(t) {
            return D[t >> 2] + 4294967296 * $[(t + 4) >> 2]
          }
          function pr(t) {
            var e = k(t) + 1,
              a = ye(e)
            return a && i(t, I, a, e), a
          }
          function Cr(t, e, a) {
            function c(Lt) {
              return (Lt = Lt.toTimeString().match(/\(([A-Za-z ]+)\)$/))
                ? Lt[1]
                : 'GMT'
            }
            var y = new Date().getFullYear(),
              P = new Date(y, 0, 1),
              Z = new Date(y, 6, 1)
            y = P.getTimezoneOffset()
            var Nt = Z.getTimezoneOffset()
            ;($[t >> 2] = 60 * Math.max(y, Nt)),
              ($[e >> 2] = Number(y != Nt)),
              (t = c(P)),
              (e = c(Z)),
              (t = pr(t)),
              (e = pr(e)),
              Nt < y
                ? ((D[a >> 2] = t), (D[(a + 4) >> 2] = e))
                : ((D[a >> 2] = e), (D[(a + 4) >> 2] = t))
          }
          function ze(t, e, a) {
            ze.Bb || ((ze.Bb = !0), Cr(t, e, a))
          }
          var mr
          mr = g
            ? () => {
                var t = process.hrtime()
                return 1e3 * t[0] + t[1] / 1e6
              }
            : () => performance.now()
          var Be = {}
          function Nr() {
            if (!Me) {
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
              for (e in Be) Be[e] === void 0 ? delete t[e] : (t[e] = Be[e])
              var a = []
              for (e in t) a.push(e + '=' + t[e])
              Me = a
            }
            return Me
          }
          var Me,
            Yt = void 0,
            je = []
          function Ge(t, e) {
            if (!Yt) {
              Yt = new WeakMap()
              var a = H.length
              if (Yt)
                for (var c = 0; c < 0 + a; c++) {
                  var y = H.get(c)
                  y && Yt.set(y, c)
                }
            }
            if (Yt.has(t)) return Yt.get(t)
            if (je.length) a = je.pop()
            else {
              try {
                H.grow(1)
              } catch (Nt) {
                throw Nt instanceof RangeError
                  ? 'Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.'
                  : Nt
              }
              a = H.length - 1
            }
            try {
              H.set(a, t)
            } catch (Nt) {
              if (!(Nt instanceof TypeError)) throw Nt
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
              H.set(a, e)
            }
            return Yt.set(t, a), a
          }
          function le(t) {
            Yt.delete(H.get(t)), je.push(t)
          }
          function Pe(t) {
            var e = ye(t.length)
            return (
              t.subarray || t.slice || (t = new Uint8Array(t)), et.set(t, e), e
            )
          }
          function zr(t, e, a, c) {
            var y = {
              string: (vt) => {
                var It = 0
                if (vt != null && vt !== 0) {
                  var Ht = (vt.length << 2) + 1
                  ;(It = Zt(Ht)), i(vt, et, It, Ht)
                }
                return It
              },
              array: (vt) => {
                var It = Zt(vt.length)
                return I.set(vt, It), It
              }
            }
            t = r['_' + t]
            var P = [],
              Z = 0
            if (c)
              for (var Nt = 0; Nt < c.length; Nt++) {
                var Lt = y[a[Nt]]
                Lt
                  ? (Z === 0 && (Z = ce()), (P[Nt] = Lt(c[Nt])))
                  : (P[Nt] = c[Nt])
              }
            return (
              (a = t.apply(null, P)),
              (a = (function (vt) {
                return (
                  Z !== 0 && de(Z),
                  e === 'string' ? A(vt) : e === 'boolean' ? !!vt : vt
                )
              })(a))
            )
          }
          function gr(t, e, a, c) {
            t || (t = this),
              (this.parent = t),
              (this.Ra = t.Ra),
              (this.Va = null),
              (this.id = Ie++),
              (this.name = e),
              (this.mode = a),
              (this.Ga = {}),
              (this.Ha = {}),
              (this.rdev = c)
          }
          Object.defineProperties(gr.prototype, {
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
            fr(),
            (Gt = Array(4096)),
            nr(pt, '/'),
            Pt('/tmp'),
            Pt('/home'),
            Pt('/home/web_user'),
            (() => {
              Pt('/dev'),
                Oe(259, { read: () => 0, write: (e, a, c, y) => y }),
                pe('/dev/null', 259),
                xt(1280, At),
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
                nr(
                  {
                    Ra: () => {
                      var e = Ve(t, 'fd', 16895, 73)
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
          var Br = {
            a: function (t, e, a, c) {
              kt(
                'Assertion failed: ' +
                  A(t) +
                  ', at: ' +
                  [
                    e ? A(e) : 'unknown filename',
                    a,
                    c ? A(c) : 'unknown function'
                  ]
              )
            },
            h: function (t, e) {
              try {
                return (t = A(t)), me(t, e), 0
              } catch (a) {
                if (typeof Ut > 'u' || !(a instanceof X)) throw a
                return -a.Ka
              }
            },
            H: function (t, e, a) {
              try {
                if (((e = A(e)), (e = Vt(t, e)), a & -8)) return -28
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
                    return 0 > y ? -28 : rr(c, y).fd
                  case 1:
                  case 2:
                    return 0
                  case 3:
                    return c.flags
                  case 4:
                    return (y = be()), (c.flags |= y), 0
                  case 5:
                    return (y = be()), (x[(y + 0) >> 1] = 2), 0
                  case 6:
                  case 7:
                    return 0
                  case 16:
                  case 8:
                    return -28
                  case 9:
                    return ($[Er() >> 2] = 28), -1
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
                return ur(c.node, e), 0
              } catch (y) {
                if (typeof Ut > 'u' || !(y instanceof X)) throw y
                return -y.Ka
              }
            },
            B: function (t, e) {
              try {
                if (e === 0) return -28
                var a = k('/') + 1
                return e < a ? -68 : (i('/', et, t, e), a)
              } catch (c) {
                if (typeof Ut > 'u' || !(c instanceof X)) throw c
                return -c.Ka
              }
            },
            E: function (t, e) {
              try {
                return (t = A(t)), ge(or, t, e)
              } catch (a) {
                if (typeof Ut > 'u' || !(a instanceof X)) throw a
                return -a.Ka
              }
            },
            y: function (t, e, a) {
              try {
                return (
                  (e = A(e)),
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
                e = A(e)
                var y = c & 256
                return (e = Vt(t, e, c & 4096)), ge(y ? or : se, e, a)
              } catch (P) {
                if (typeof Ut > 'u' || !(P instanceof X)) throw P
                return -P.Ka
              }
            },
            v: function (t, e, a, c) {
              Ee = c
              try {
                ;(e = A(e)), (e = Vt(t, e))
                var y = c ? be() : 0
                return re(e, a, y).fd
              } catch (P) {
                if (typeof Ut > 'u' || !(P instanceof X)) throw P
                return -P.Ka
              }
            },
            t: function (t, e, a, c) {
              try {
                if (((e = A(e)), (e = Vt(t, e)), 0 >= c)) return -28
                var y = sr(e),
                  P = Math.min(c, k(y)),
                  Z = I[a + P]
                return i(y, et, a, c + 1), (I[a + P] = Z), P
              } catch (Nt) {
                if (typeof Ut > 'u' || !(Nt instanceof X)) throw Nt
                return -Nt.Ka
              }
            },
            s: function (t) {
              try {
                return (t = A(t)), ir(t), 0
              } catch (e) {
                if (typeof Ut > 'u' || !(e instanceof X)) throw e
                return -e.Ka
              }
            },
            F: function (t, e) {
              try {
                return (t = A(t)), ge(se, t, e)
              } catch (a) {
                if (typeof Ut > 'u' || !(a instanceof X)) throw a
                return -a.Ka
              }
            },
            p: function (t, e, a) {
              try {
                return (
                  (e = A(e)),
                  (e = Vt(t, e)),
                  a === 0
                    ? ar(e)
                    : a === 512
                    ? ir(e)
                    : kt('Invalid flags passed to unlinkat'),
                  0
                )
              } catch (c) {
                if (typeof Ut > 'u' || !(c instanceof X)) throw c
                return -c.Ka
              }
            },
            o: function (t, e, a) {
              try {
                if (((e = A(e)), (e = Vt(t, e, !0)), a)) {
                  var c = Ce(a),
                    y = $[(a + 8) >> 2]
                  ;(P = 1e3 * c + y / 1e6),
                    (a += 16),
                    (c = Ce(a)),
                    (y = $[(a + 8) >> 2]),
                    (Z = 1e3 * c + y / 1e6)
                } else
                  var P = Date.now(),
                    Z = P
                t = P
                var Nt = Ft(e, { Sa: !0 }).node
                return Nt.Ga.Oa(Nt, { timestamp: Math.max(t, Z) }), 0
              } catch (Lt) {
                if (typeof Ut > 'u' || !(Lt instanceof X)) throw Lt
                return -Lt.Ka
              }
            },
            e: function () {
              return Date.now()
            },
            j: function (t, e) {
              ;(t = new Date(1e3 * Ce(t))),
                ($[e >> 2] = t.getSeconds()),
                ($[(e + 4) >> 2] = t.getMinutes()),
                ($[(e + 8) >> 2] = t.getHours()),
                ($[(e + 12) >> 2] = t.getDate()),
                ($[(e + 16) >> 2] = t.getMonth()),
                ($[(e + 20) >> 2] = t.getFullYear() - 1900),
                ($[(e + 24) >> 2] = t.getDay())
              var a = new Date(t.getFullYear(), 0, 1)
              ;($[(e + 28) >> 2] = ((t.getTime() - a.getTime()) / 864e5) | 0),
                ($[(e + 36) >> 2] = -(60 * t.getTimezoneOffset()))
              var c = new Date(t.getFullYear(), 6, 1).getTimezoneOffset()
              ;(a = a.getTimezoneOffset()),
                ($[(e + 32) >> 2] =
                  (c != a && t.getTimezoneOffset() == Math.min(a, c)) | 0)
            },
            w: function (t, e, a, c, y, P) {
              try {
                var Z = Mt(c)
                if (e & 2 && !(a & 2) && (Z.flags & 2097155) !== 2)
                  throw new X(2)
                if ((Z.flags & 2097155) === 1) throw new X(2)
                if (!Z.Ha.bb) throw new X(43)
                var Nt = Z.Ha.bb(Z, t, y, e, a),
                  Lt = Nt.Fb
                return ($[P >> 2] = Nt.vb), Lt
              } catch (vt) {
                if (typeof Ut > 'u' || !(vt instanceof X)) throw vt
                return -vt.Ka
              }
            },
            x: function (t, e, a, c, y, P) {
              try {
                var Z = Mt(y)
                if (a & 2) {
                  var Nt = et.slice(t, t + e)
                  Z && Z.Ha.cb && Z.Ha.cb(Z, Nt, P, e, c)
                }
              } catch (Lt) {
                if (typeof Ut > 'u' || !(Lt instanceof X)) throw Lt
                return -Lt.Ka
              }
            },
            n: ze,
            q: function () {
              return 2147483648
            },
            d: mr,
            c: function (t) {
              var e = et.length
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
                    B.grow((y - tt.byteLength + 65535) >>> 16), at()
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
                Nr().forEach(function (c, y) {
                  var P = e + a
                  for (y = D[(t + 4 * y) >> 2] = P, P = 0; P < c.length; ++P)
                    I[y++ >> 0] = c.charCodeAt(P)
                  ;(I[y >> 0] = 0), (a += c.length + 1)
                }),
                0
              )
            },
            A: function (t, e) {
              var a = Nr()
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
                return xe(e), 0
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
                      Nt = D[(t + 4) >> 2]
                    t += 8
                    var Lt = cr(y, I, Z, Nt)
                    if (0 > Lt) {
                      var vt = -1
                      break t
                    }
                    if (((e += Lt), Lt < Nt)) break
                  }
                  vt = e
                }
                return (D[c >> 2] = vt), 0
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
                  lr(P, e, c),
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
                  ($[y >> 2] = S[0]),
                  ($[(y + 4) >> 2] = S[1]),
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
                      Nt = D[(t + 4) >> 2]
                    t += 8
                    var Lt = dr(y, I, Z, Nt)
                    if (0 > Lt) {
                      var vt = -1
                      break t
                    }
                    e += Lt
                  }
                  vt = e
                }
                return (D[c >> 2] = vt), 0
              } catch (It) {
                if (typeof Ut > 'u' || !(It instanceof X)) throw It
                return It.Ka
              }
            }
          }
          ;(function () {
            function t(y) {
              ;(r.asm = y.exports),
                (B = r.asm.I),
                at(),
                (H = r.asm.Aa),
                bt.unshift(r.asm.J),
                yt--,
                r.monitorRunDependencies && r.monitorRunDependencies(yt),
                yt == 0 && wt && ((y = wt), (wt = null), y())
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
                  G('failed to asynchronously prepare wasm: ' + P), kt(P)
                })
            }
            var c = { a: Br }
            if (
              (yt++,
              r.monitorRunDependencies && r.monitorRunDependencies(yt),
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
                return V ||
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
          var Er = (r.___errno_location = function () {
            return (Er = r.___errno_location = r.asm.N).apply(null, arguments)
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
          var br = (r._emscripten_builtin_memalign = function () {
              return (br = r._emscripten_builtin_memalign = r.asm.Ca).apply(
                null,
                arguments
              )
            }),
            ce = (r.stackSave = function () {
              return (ce = r.stackSave = r.asm.Da).apply(null, arguments)
            }),
            de = (r.stackRestore = function () {
              return (de = r.stackRestore = r.asm.Ea).apply(null, arguments)
            }),
            Zt = (r.stackAlloc = function () {
              return (Zt = r.stackAlloc = r.asm.Fa).apply(null, arguments)
            })
          ;(r.UTF8ToString = A),
            (r.stackAlloc = Zt),
            (r.stackSave = ce),
            (r.stackRestore = de),
            (r.cwrap = function (t, e, a, c) {
              a = a || []
              var y = a.every((P) => P === 'number' || P === 'boolean')
              return e !== 'string' && y && !c
                ? r['_' + t]
                : function () {
                    return zr(t, e, a, arguments)
                  }
            })
          var ve
          wt = function t() {
            ve || yr(), ve || (wt = t)
          }
          function yr() {
            function t() {
              if (!ve && ((ve = !0), (r.calledRun = !0), !W)) {
                if (
                  (r.noFSInit ||
                    hr ||
                    ((hr = !0),
                    fr(),
                    (r.stdin = r.stdin),
                    (r.stdout = r.stdout),
                    (r.stderr = r.stderr),
                    r.stdin
                      ? oe('stdin', r.stdin)
                      : Fe('/dev/tty', '/dev/stdin'),
                    r.stdout
                      ? oe('stdout', null, r.stdout)
                      : Fe('/dev/tty', '/dev/stdout'),
                    r.stderr
                      ? oe('stderr', null, r.stderr)
                      : Fe('/dev/tty1', '/dev/stderr'),
                    re('/dev/stdin', 0),
                    re('/dev/stdout', 1),
                    re('/dev/stderr', 1)),
                  (ie = !1),
                  J(bt),
                  r.onRuntimeInitialized && r.onRuntimeInitialized(),
                  r.postRun)
                )
                  for (
                    typeof r.postRun == 'function' && (r.postRun = [r.postRun]);
                    r.postRun.length;

                  ) {
                    var e = r.postRun.shift()
                    _t.unshift(e)
                  }
                J(_t)
              }
            }
            if (!(0 < yt)) {
              if (r.preRun)
                for (
                  typeof r.preRun == 'function' && (r.preRun = [r.preRun]);
                  r.preRun.length;

                )
                  ct()
              J(lt),
                0 < yt ||
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
          return yr(), s
        })),
        m)
      )
    }
  ;(nt.exports = M), (nt.exports.default = M)
})(pn)
const gn = `DROP TABLE IF EXISTS comment;
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
function Se(nt) {
  throw new Error(
    'Could not dynamically require "' +
      nt +
      '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.'
  )
}
var Ye = {},
  En = {
    get exports() {
      return Ye
    },
    set exports(nt) {
      Ye = nt
    }
  }
/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/ ;(function (nt, ot) {
  ;(function (m) {
    nt.exports = m()
  })(function () {
    return (function m(M, v, f) {
      function h(r, L) {
        if (!v[r]) {
          if (!M[r]) {
            var b = typeof Se == 'function' && Se
            if (!L && b) return b(r, !0)
            if (s) return s(r, !0)
            var T = new Error("Cannot find module '" + r + "'")
            throw ((T.code = 'MODULE_NOT_FOUND'), T)
          }
          var l = (v[r] = { exports: {} })
          M[r][0].call(
            l.exports,
            function (g) {
              var o = M[r][1][g]
              return h(o || g)
            },
            l,
            l.exports,
            m,
            M,
            v,
            f
          )
        }
        return v[r].exports
      }
      for (var s = typeof Se == 'function' && Se, _ = 0; _ < f.length; _++)
        h(f[_])
      return h
    })(
      {
        1: [
          function (m, M, v) {
            var f = m('./utils'),
              h = m('./support'),
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
                  d = 0,
                  E = _.length,
                  U = E,
                  R = f.getTypeOf(_) !== 'string';
                d < _.length;

              )
                (U = E - d),
                  (b = R
                    ? ((r = _[d++]),
                      (L = d < E ? _[d++] : 0),
                      d < E ? _[d++] : 0)
                    : ((r = _.charCodeAt(d++)),
                      (L = d < E ? _.charCodeAt(d++) : 0),
                      d < E ? _.charCodeAt(d++) : 0)),
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
                  d = 'data:'
                if (_.substr(0, d.length) === d)
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
                  E = h.uint8array ? new Uint8Array(0 | U) : new Array(0 | U);
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
          function (m, M, v) {
            var f = m('./external'),
              h = m('./stream/DataWorker'),
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
                var L = new h(f.Promise.resolve(this.compressedContent))
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
                return new h(f.Promise.resolve(this.compressedContent))
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
              (M.exports = r)
          },
          {
            './external': 6,
            './stream/Crc32Probe': 25,
            './stream/DataLengthProbe': 26,
            './stream/DataWorker': 27
          }
        ],
        3: [
          function (m, M, v) {
            var f = m('./stream/GenericWorker')
            ;(v.STORE = {
              magic: '\0\0',
              compressWorker: function () {
                return new f('STORE compression')
              },
              uncompressWorker: function () {
                return new f('STORE decompression')
              }
            }),
              (v.DEFLATE = m('./flate'))
          },
          { './flate': 7, './stream/GenericWorker': 28 }
        ],
        4: [
          function (m, M, v) {
            var f = m('./utils'),
              h = (function () {
                for (var s, _ = [], r = 0; r < 256; r++) {
                  s = r
                  for (var L = 0; L < 8; L++)
                    s = 1 & s ? 3988292384 ^ (s >>> 1) : s >>> 1
                  _[r] = s
                }
                return _
              })()
            M.exports = function (s, _) {
              return s !== void 0 && s.length
                ? f.getTypeOf(s) !== 'string'
                  ? (function (r, L, b, T) {
                      var l = h,
                        g = T + b
                      r ^= -1
                      for (var o = T; o < g; o++)
                        r = (r >>> 8) ^ l[255 & (r ^ L[o])]
                      return -1 ^ r
                    })(0 | _, s, s.length, 0)
                  : (function (r, L, b, T) {
                      var l = h,
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
          function (m, M, v) {
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
          function (m, M, v) {
            var f = null
            ;(f = typeof Promise < 'u' ? Promise : m('lie')),
              (M.exports = { Promise: f })
          },
          { lie: 37 }
        ],
        7: [
          function (m, M, v) {
            var f =
                typeof Uint8Array < 'u' &&
                typeof Uint16Array < 'u' &&
                typeof Uint32Array < 'u',
              h = m('pako'),
              s = m('./utils'),
              _ = m('./stream/GenericWorker'),
              r = f ? 'uint8array' : 'array'
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
                this._pako = new h[this._pakoAction]({
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
          function (m, M, v) {
            function f(l, g) {
              var o,
                p = ''
              for (o = 0; o < g; o++)
                (p += String.fromCharCode(255 & l)), (l >>>= 8)
              return p
            }
            function h(l, g, o, p, d, E) {
              var U,
                R,
                O = l.file,
                q = l.compression,
                G = E !== r.utf8encode,
                V = s.transformTo('string', E(O.name)),
                B = s.transformTo('string', r.utf8encode(O.name)),
                W = O.comment,
                dt = s.transformTo('string', E(W)),
                w = s.transformTo('string', r.utf8encode(W)),
                A = B.length !== O.name.length,
                i = w.length !== W.length,
                k = '',
                tt = '',
                I = '',
                et = O.dir,
                x = O.date,
                $ = { crc32: 0, compressedSize: 0, uncompressedSize: 0 }
              ;(g && !o) ||
                (($.crc32 = l.crc32),
                ($.compressedSize = l.compressedSize),
                ($.uncompressedSize = l.uncompressedSize))
              var D = 0
              g && (D |= 8), G || (!A && !i) || (D |= 2048)
              var F = 0,
                ut = 0
              et && (F |= 16),
                d === 'UNIX'
                  ? ((ut = 798),
                    (F |= (function (H, lt) {
                      var bt = H
                      return H || (bt = lt ? 16893 : 33204), (65535 & bt) << 16
                    })(O.unixPermissions, et)))
                  : ((ut = 20),
                    (F |= (function (H) {
                      return 63 & (H || 0)
                    })(O.dosPermissions))),
                (U = x.getUTCHours()),
                (U <<= 6),
                (U |= x.getUTCMinutes()),
                (U <<= 5),
                (U |= x.getUTCSeconds() / 2),
                (R = x.getUTCFullYear() - 1980),
                (R <<= 4),
                (R |= x.getUTCMonth() + 1),
                (R <<= 5),
                (R |= x.getUTCDate()),
                A &&
                  ((tt = f(1, 1) + f(L(V), 4) + B),
                  (k += 'up' + f(tt.length, 2) + tt)),
                i &&
                  ((I = f(1, 1) + f(L(dt), 4) + w),
                  (k += 'uc' + f(I.length, 2) + I))
              var at = ''
              return (
                (at += `
\0`),
                (at += f(D, 2)),
                (at += q.magic),
                (at += f(U, 2)),
                (at += f(R, 2)),
                (at += f($.crc32, 4)),
                (at += f($.compressedSize, 4)),
                (at += f($.uncompressedSize, 4)),
                (at += f(V.length, 2)),
                (at += f(k.length, 2)),
                {
                  fileRecord: b.LOCAL_FILE_HEADER + at + V + k,
                  dirRecord:
                    b.CENTRAL_FILE_HEADER +
                    f(ut, 2) +
                    at +
                    f(dt.length, 2) +
                    '\0\0\0\0' +
                    f(F, 4) +
                    f(p, 4) +
                    V +
                    k +
                    dt
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
                  var o = h(
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
                  o = h(
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
                        f(p.crc32, 4) +
                        f(p.compressedSize, 4) +
                        f(p.uncompressedSize, 4)
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
                  p = (function (d, E, U, R, O) {
                    var q = s.transformTo('string', O(R))
                    return (
                      b.CENTRAL_DIRECTORY_END +
                      '\0\0\0\0' +
                      f(d, 2) +
                      f(d, 2) +
                      f(E, 4) +
                      f(U, 4) +
                      f(q.length, 2) +
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
              (M.exports = T)
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
          function (m, M, v) {
            var f = m('../compressions'),
              h = m('./ZipFileWorker')
            v.generateWorker = function (s, _, r) {
              var L = new h(_.streamFiles, r, _.platform, _.encodeFileName),
                b = 0
              try {
                s.forEach(function (T, l) {
                  b++
                  var g = (function (E, U) {
                      var R = E || U,
                        O = f[R]
                      if (!O)
                        throw new Error(
                          R + ' is not a valid compression method !'
                        )
                      return O
                    })(l.options.compression, _.compression),
                    o =
                      l.options.compressionOptions ||
                      _.compressionOptions ||
                      {},
                    p = l.dir,
                    d = l.date
                  l._compressWorker(g, o)
                    .withStreamInfo('file', {
                      name: T,
                      dir: p,
                      date: d,
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
          function (m, M, v) {
            function f() {
              if (!(this instanceof f)) return new f()
              if (arguments.length)
                throw new Error(
                  'The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.'
                )
              ;(this.files = Object.create(null)),
                (this.comment = null),
                (this.root = ''),
                (this.clone = function () {
                  var h = new f()
                  for (var s in this)
                    typeof this[s] != 'function' && (h[s] = this[s])
                  return h
                })
            }
            ;((f.prototype = m('./object')).loadAsync = m('./load')),
              (f.support = m('./support')),
              (f.defaults = m('./defaults')),
              (f.version = '3.10.1'),
              (f.loadAsync = function (h, s) {
                return new f().loadAsync(h, s)
              }),
              (f.external = m('./external')),
              (M.exports = f)
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
          function (m, M, v) {
            var f = m('./utils'),
              h = m('./external'),
              s = m('./utf8'),
              _ = m('./zipEntries'),
              r = m('./stream/Crc32Probe'),
              L = m('./nodejsUtils')
            function b(T) {
              return new h.Promise(function (l, g) {
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
            M.exports = function (T, l) {
              var g = this
              return (
                (l = f.extend(l || {}, {
                  base64: !1,
                  checkCRC32: !1,
                  optimizedBinaryString: !1,
                  createFolders: !1,
                  decodeFileName: s.utf8decode
                })),
                L.isNode && L.isStream(T)
                  ? h.Promise.reject(
                      new Error(
                        "JSZip can't accept a stream when loading a zip file."
                      )
                    )
                  : f
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
                        var p = [h.Promise.resolve(o)],
                          d = o.files
                        if (l.checkCRC32)
                          for (var E = 0; E < d.length; E++) p.push(b(d[E]))
                        return h.Promise.all(p)
                      })
                      .then(function (o) {
                        for (
                          var p = o.shift(), d = p.files, E = 0;
                          E < d.length;
                          E++
                        ) {
                          var U = d[E],
                            R = U.fileNameStr,
                            O = f.resolve(U.fileNameStr)
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
                            U.dir || (g.file(O).unsafeOriginalName = R)
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
          function (m, M, v) {
            var f = m('../utils'),
              h = m('../stream/GenericWorker')
            function s(_, r) {
              h.call(this, 'Nodejs stream input adapter for ' + _),
                (this._upstreamEnded = !1),
                this._bindStream(r)
            }
            f.inherits(s, h),
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
                  !!h.prototype.pause.call(this) && (this._stream.pause(), !0)
                )
              }),
              (s.prototype.resume = function () {
                return (
                  !!h.prototype.resume.call(this) &&
                  (this._upstreamEnded ? this.end() : this._stream.resume(), !0)
                )
              }),
              (M.exports = s)
          },
          { '../stream/GenericWorker': 28, '../utils': 32 }
        ],
        13: [
          function (m, M, v) {
            var f = m('readable-stream').Readable
            function h(s, _, r) {
              f.call(this, _), (this._helper = s)
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
            m('../utils').inherits(h, f),
              (h.prototype._read = function () {
                this._helper.resume()
              }),
              (M.exports = h)
          },
          { '../utils': 32, 'readable-stream': 16 }
        ],
        14: [
          function (m, M, v) {
            M.exports = {
              isNode: typeof Buffer < 'u',
              newBufferFrom: function (f, h) {
                if (Buffer.from && Buffer.from !== Uint8Array.from)
                  return Buffer.from(f, h)
                if (typeof f == 'number')
                  throw new Error('The "data" argument must not be a number')
                return new Buffer(f, h)
              },
              allocBuffer: function (f) {
                if (Buffer.alloc) return Buffer.alloc(f)
                var h = new Buffer(f)
                return h.fill(0), h
              },
              isBuffer: function (f) {
                return Buffer.isBuffer(f)
              },
              isStream: function (f) {
                return (
                  f &&
                  typeof f.on == 'function' &&
                  typeof f.pause == 'function' &&
                  typeof f.resume == 'function'
                )
              }
            }
          },
          {}
        ],
        15: [
          function (m, M, v) {
            function f(O, q, G) {
              var V,
                B = s.getTypeOf(q),
                W = s.extend(G || {}, L)
              ;(W.date = W.date || new Date()),
                W.compression !== null &&
                  (W.compression = W.compression.toUpperCase()),
                typeof W.unixPermissions == 'string' &&
                  (W.unixPermissions = parseInt(W.unixPermissions, 8)),
                W.unixPermissions && 16384 & W.unixPermissions && (W.dir = !0),
                W.dosPermissions && 16 & W.dosPermissions && (W.dir = !0),
                W.dir && (O = d(O)),
                W.createFolders && (V = p(O)) && E.call(this, V, !0)
              var dt = B === 'string' && W.binary === !1 && W.base64 === !1
              ;(G && G.binary !== void 0) || (W.binary = !dt),
                ((q instanceof b && q.uncompressedSize === 0) ||
                  W.dir ||
                  !q ||
                  q.length === 0) &&
                  ((W.base64 = !1),
                  (W.binary = !0),
                  (q = ''),
                  (W.compression = 'STORE'),
                  (B = 'string'))
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
              var A = new T(O, w, W)
              this.files[O] = A
            }
            var h = m('./utf8'),
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
              d = function (O) {
                return O.slice(-1) !== '/' && (O += '/'), O
              },
              E = function (O, q) {
                return (
                  (q = q !== void 0 ? q : L.createFolders),
                  (O = d(O)),
                  this.files[O] ||
                    f.call(this, O, null, { dir: !0, createFolders: q }),
                  this.files[O]
                )
              }
            function U(O) {
              return Object.prototype.toString.call(O) === '[object RegExp]'
            }
            var R = {
              load: function () {
                throw new Error(
                  'This method has been removed in JSZip 3.0, please check the upgrade guide.'
                )
              },
              forEach: function (O) {
                var q, G, V
                for (q in this.files)
                  (V = this.files[q]),
                    (G = q.slice(this.root.length, q.length)) &&
                      q.slice(0, this.root.length) === this.root &&
                      O(G, V)
              },
              filter: function (O) {
                var q = []
                return (
                  this.forEach(function (G, V) {
                    O(G, V) && q.push(V)
                  }),
                  q
                )
              },
              file: function (O, q, G) {
                if (arguments.length !== 1)
                  return (O = this.root + O), f.call(this, O, q, G), this
                if (U(O)) {
                  var V = O
                  return this.filter(function (W, dt) {
                    return !dt.dir && V.test(W)
                  })
                }
                var B = this.files[this.root + O]
                return B && !B.dir ? B : null
              },
              folder: function (O) {
                if (!O) return this
                if (U(O))
                  return this.filter(function (B, W) {
                    return W.dir && O.test(B)
                  })
                var q = this.root + O,
                  G = E.call(this, q),
                  V = this.clone()
                return (V.root = G.name), V
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
                    var G = this.filter(function (B, W) {
                        return W.name.slice(0, O.length) === O
                      }),
                      V = 0;
                    V < G.length;
                    V++
                  )
                    delete this.files[G[V].name]
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
                      encodeFileName: h.utf8encode
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
                  var V = G.comment || this.comment || ''
                  q = l.generateWorker(this, G, V)
                } catch (B) {
                  ;(q = new _('error')).error(B)
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
            M.exports = R
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
          function (m, M, v) {
            M.exports = m('stream')
          },
          { stream: void 0 }
        ],
        17: [
          function (m, M, v) {
            var f = m('./DataReader')
            function h(s) {
              f.call(this, s)
              for (var _ = 0; _ < this.data.length; _++) s[_] = 255 & s[_]
            }
            m('../utils').inherits(h, f),
              (h.prototype.byteAt = function (s) {
                return this.data[this.zero + s]
              }),
              (h.prototype.lastIndexOfSignature = function (s) {
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
              (h.prototype.readAndCheckSignature = function (s) {
                var _ = s.charCodeAt(0),
                  r = s.charCodeAt(1),
                  L = s.charCodeAt(2),
                  b = s.charCodeAt(3),
                  T = this.readData(4)
                return _ === T[0] && r === T[1] && L === T[2] && b === T[3]
              }),
              (h.prototype.readData = function (s) {
                if ((this.checkOffset(s), s === 0)) return []
                var _ = this.data.slice(
                  this.zero + this.index,
                  this.zero + this.index + s
                )
                return (this.index += s), _
              }),
              (M.exports = h)
          },
          { '../utils': 32, './DataReader': 18 }
        ],
        18: [
          function (m, M, v) {
            var f = m('../utils')
            function h(s) {
              ;(this.data = s),
                (this.length = s.length),
                (this.index = 0),
                (this.zero = 0)
            }
            ;(h.prototype = {
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
                return f.transformTo('string', this.readData(s))
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
              (M.exports = h)
          },
          { '../utils': 32 }
        ],
        19: [
          function (m, M, v) {
            var f = m('./Uint8ArrayReader')
            function h(s) {
              f.call(this, s)
            }
            m('../utils').inherits(h, f),
              (h.prototype.readData = function (s) {
                this.checkOffset(s)
                var _ = this.data.slice(
                  this.zero + this.index,
                  this.zero + this.index + s
                )
                return (this.index += s), _
              }),
              (M.exports = h)
          },
          { '../utils': 32, './Uint8ArrayReader': 21 }
        ],
        20: [
          function (m, M, v) {
            var f = m('./DataReader')
            function h(s) {
              f.call(this, s)
            }
            m('../utils').inherits(h, f),
              (h.prototype.byteAt = function (s) {
                return this.data.charCodeAt(this.zero + s)
              }),
              (h.prototype.lastIndexOfSignature = function (s) {
                return this.data.lastIndexOf(s) - this.zero
              }),
              (h.prototype.readAndCheckSignature = function (s) {
                return s === this.readData(4)
              }),
              (h.prototype.readData = function (s) {
                this.checkOffset(s)
                var _ = this.data.slice(
                  this.zero + this.index,
                  this.zero + this.index + s
                )
                return (this.index += s), _
              }),
              (M.exports = h)
          },
          { '../utils': 32, './DataReader': 18 }
        ],
        21: [
          function (m, M, v) {
            var f = m('./ArrayReader')
            function h(s) {
              f.call(this, s)
            }
            m('../utils').inherits(h, f),
              (h.prototype.readData = function (s) {
                if ((this.checkOffset(s), s === 0)) return new Uint8Array(0)
                var _ = this.data.subarray(
                  this.zero + this.index,
                  this.zero + this.index + s
                )
                return (this.index += s), _
              }),
              (M.exports = h)
          },
          { '../utils': 32, './ArrayReader': 17 }
        ],
        22: [
          function (m, M, v) {
            var f = m('../utils'),
              h = m('../support'),
              s = m('./ArrayReader'),
              _ = m('./StringReader'),
              r = m('./NodeBufferReader'),
              L = m('./Uint8ArrayReader')
            M.exports = function (b) {
              var T = f.getTypeOf(b)
              return (
                f.checkSupport(T),
                T !== 'string' || h.uint8array
                  ? T === 'nodebuffer'
                    ? new r(b)
                    : h.uint8array
                    ? new L(f.transformTo('uint8array', b))
                    : new s(f.transformTo('array', b))
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
          function (m, M, v) {
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
          function (m, M, v) {
            var f = m('./GenericWorker'),
              h = m('../utils')
            function s(_) {
              f.call(this, 'ConvertWorker to ' + _), (this.destType = _)
            }
            h.inherits(s, f),
              (s.prototype.processChunk = function (_) {
                this.push({
                  data: h.transformTo(this.destType, _.data),
                  meta: _.meta
                })
              }),
              (M.exports = s)
          },
          { '../utils': 32, './GenericWorker': 28 }
        ],
        25: [
          function (m, M, v) {
            var f = m('./GenericWorker'),
              h = m('../crc32')
            function s() {
              f.call(this, 'Crc32Probe'), this.withStreamInfo('crc32', 0)
            }
            m('../utils').inherits(s, f),
              (s.prototype.processChunk = function (_) {
                ;(this.streamInfo.crc32 = h(
                  _.data,
                  this.streamInfo.crc32 || 0
                )),
                  this.push(_)
              }),
              (M.exports = s)
          },
          { '../crc32': 4, '../utils': 32, './GenericWorker': 28 }
        ],
        26: [
          function (m, M, v) {
            var f = m('../utils'),
              h = m('./GenericWorker')
            function s(_) {
              h.call(this, 'DataLengthProbe for ' + _),
                (this.propName = _),
                this.withStreamInfo(_, 0)
            }
            f.inherits(s, h),
              (s.prototype.processChunk = function (_) {
                if (_) {
                  var r = this.streamInfo[this.propName] || 0
                  this.streamInfo[this.propName] = r + _.data.length
                }
                h.prototype.processChunk.call(this, _)
              }),
              (M.exports = s)
          },
          { '../utils': 32, './GenericWorker': 28 }
        ],
        27: [
          function (m, M, v) {
            var f = m('../utils'),
              h = m('./GenericWorker')
            function s(_) {
              h.call(this, 'DataWorker')
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
                      (r.type = f.getTypeOf(L)),
                      r.isPaused || r._tickAndRepeat()
                  },
                  function (L) {
                    r.error(L)
                  }
                )
            }
            f.inherits(s, h),
              (s.prototype.cleanUp = function () {
                h.prototype.cleanUp.call(this), (this.data = null)
              }),
              (s.prototype.resume = function () {
                return (
                  !!h.prototype.resume.call(this) &&
                  (!this._tickScheduled &&
                    this.dataIsReady &&
                    ((this._tickScheduled = !0),
                    f.delay(this._tickAndRepeat, [], this)),
                  !0)
                )
              }),
              (s.prototype._tickAndRepeat = function () {
                ;(this._tickScheduled = !1),
                  this.isPaused ||
                    this.isFinished ||
                    (this._tick(),
                    this.isFinished ||
                      (f.delay(this._tickAndRepeat, [], this),
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
              (M.exports = s)
          },
          { '../utils': 32, './GenericWorker': 28 }
        ],
        28: [
          function (m, M, v) {
            function f(h) {
              ;(this.name = h || 'default'),
                (this.streamInfo = {}),
                (this.generatedError = null),
                (this.extraStreamInfo = {}),
                (this.isPaused = !0),
                (this.isFinished = !1),
                (this.isLocked = !1),
                (this._listeners = { data: [], end: [], error: [] }),
                (this.previous = null)
            }
            ;(f.prototype = {
              push: function (h) {
                this.emit('data', h)
              },
              end: function () {
                if (this.isFinished) return !1
                this.flush()
                try {
                  this.emit('end'), this.cleanUp(), (this.isFinished = !0)
                } catch (h) {
                  this.emit('error', h)
                }
                return !0
              },
              error: function (h) {
                return (
                  !this.isFinished &&
                  (this.isPaused
                    ? (this.generatedError = h)
                    : ((this.isFinished = !0),
                      this.emit('error', h),
                      this.previous && this.previous.error(h),
                      this.cleanUp()),
                  !0)
                )
              },
              on: function (h, s) {
                return this._listeners[h].push(s), this
              },
              cleanUp: function () {
                ;(this.streamInfo =
                  this.generatedError =
                  this.extraStreamInfo =
                    null),
                  (this._listeners = [])
              },
              emit: function (h, s) {
                if (this._listeners[h])
                  for (var _ = 0; _ < this._listeners[h].length; _++)
                    this._listeners[h][_].call(this, s)
              },
              pipe: function (h) {
                return h.registerPrevious(this)
              },
              registerPrevious: function (h) {
                if (this.isLocked)
                  throw new Error(
                    "The stream '" + this + "' has already been used."
                  )
                ;(this.streamInfo = h.streamInfo),
                  this.mergeStreamInfo(),
                  (this.previous = h)
                var s = this
                return (
                  h.on('data', function (_) {
                    s.processChunk(_)
                  }),
                  h.on('end', function () {
                    s.end()
                  }),
                  h.on('error', function (_) {
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
                var h = (this.isPaused = !1)
                return (
                  this.generatedError &&
                    (this.error(this.generatedError), (h = !0)),
                  this.previous && this.previous.resume(),
                  !h
                )
              },
              flush: function () {},
              processChunk: function (h) {
                this.push(h)
              },
              withStreamInfo: function (h, s) {
                return (
                  (this.extraStreamInfo[h] = s), this.mergeStreamInfo(), this
                )
              },
              mergeStreamInfo: function () {
                for (var h in this.extraStreamInfo)
                  Object.prototype.hasOwnProperty.call(
                    this.extraStreamInfo,
                    h
                  ) && (this.streamInfo[h] = this.extraStreamInfo[h])
              },
              lock: function () {
                if (this.isLocked)
                  throw new Error(
                    "The stream '" + this + "' has already been used."
                  )
                ;(this.isLocked = !0), this.previous && this.previous.lock()
              },
              toString: function () {
                var h = 'Worker ' + this.name
                return this.previous ? this.previous + ' -> ' + h : h
              }
            }),
              (M.exports = f)
          },
          {}
        ],
        29: [
          function (m, M, v) {
            var f = m('../utils'),
              h = m('./ConvertWorker'),
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
              return new L.Promise(function (p, d) {
                var E = [],
                  U = g._internalType,
                  R = g._outputType,
                  O = g._mimeType
                g.on('data', function (q, G) {
                  E.push(q), o && o(G)
                })
                  .on('error', function (q) {
                    ;(E = []), d(q)
                  })
                  .on('end', function () {
                    try {
                      var q = (function (G, V, B) {
                        switch (G) {
                          case 'blob':
                            return f.newBlob(f.transformTo('arraybuffer', V), B)
                          case 'base64':
                            return _.encode(V)
                          default:
                            return f.transformTo(G, V)
                        }
                      })(
                        R,
                        (function (G, V) {
                          var B,
                            W = 0,
                            dt = null,
                            w = 0
                          for (B = 0; B < V.length; B++) w += V[B].length
                          switch (G) {
                            case 'string':
                              return V.join('')
                            case 'array':
                              return Array.prototype.concat.apply([], V)
                            case 'uint8array':
                              for (
                                dt = new Uint8Array(w), B = 0;
                                B < V.length;
                                B++
                              )
                                dt.set(V[B], W), (W += V[B].length)
                              return dt
                            case 'nodebuffer':
                              return Buffer.concat(V)
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
                      d(G)
                    }
                    E = []
                  })
                  .resume()
              })
            }
            function l(g, o, p) {
              var d = o
              switch (o) {
                case 'blob':
                case 'arraybuffer':
                  d = 'uint8array'
                  break
                case 'base64':
                  d = 'string'
              }
              try {
                ;(this._internalType = d),
                  (this._outputType = o),
                  (this._mimeType = p),
                  f.checkSupport(d),
                  (this._worker = g.pipe(new h(d))),
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
                    ? this._worker.on(g, function (d) {
                        o.call(p, d.data, d.meta)
                      })
                    : this._worker.on(g, function () {
                        f.delay(o, arguments, p)
                      }),
                  this
                )
              },
              resume: function () {
                return f.delay(this._worker.resume, [], this._worker), this
              },
              pause: function () {
                return this._worker.pause(), this
              },
              toNodejsStream: function (g) {
                if (
                  (f.checkSupport('nodestream'),
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
              (M.exports = l)
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
          function (m, M, v) {
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
              var f = new ArrayBuffer(0)
              try {
                v.blob = new Blob([f], { type: 'application/zip' }).size === 0
              } catch {
                try {
                  var h = new (self.BlobBuilder ||
                    self.WebKitBlobBuilder ||
                    self.MozBlobBuilder ||
                    self.MSBlobBuilder)()
                  h.append(f),
                    (v.blob = h.getBlob('application/zip').size === 0)
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
          function (m, M, v) {
            for (
              var f = m('./utils'),
                h = m('./support'),
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
              return h.nodebuffer
                ? s.newBufferFrom(l, 'utf-8')
                : (function (g) {
                    var o,
                      p,
                      d,
                      E,
                      U,
                      R = g.length,
                      O = 0
                    for (E = 0; E < R; E++)
                      (64512 & (p = g.charCodeAt(E))) == 55296 &&
                        E + 1 < R &&
                        (64512 & (d = g.charCodeAt(E + 1))) == 56320 &&
                        ((p = 65536 + ((p - 55296) << 10) + (d - 56320)), E++),
                        (O += p < 128 ? 1 : p < 2048 ? 2 : p < 65536 ? 3 : 4)
                    for (
                      o = h.uint8array ? new Uint8Array(O) : new Array(O),
                        E = U = 0;
                      U < O;
                      E++
                    )
                      (64512 & (p = g.charCodeAt(E))) == 55296 &&
                        E + 1 < R &&
                        (64512 & (d = g.charCodeAt(E + 1))) == 56320 &&
                        ((p = 65536 + ((p - 55296) << 10) + (d - 56320)), E++),
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
                return h.nodebuffer
                  ? f.transformTo('nodebuffer', l).toString('utf-8')
                  : (function (g) {
                      var o,
                        p,
                        d,
                        E,
                        U = g.length,
                        R = new Array(2 * U)
                      for (o = p = 0; o < U; )
                        if ((d = g[o++]) < 128) R[p++] = d
                        else if (4 < (E = r[d])) (R[p++] = 65533), (o += E - 1)
                        else {
                          for (
                            d &= E === 2 ? 31 : E === 3 ? 15 : 7;
                            1 < E && o < U;

                          )
                            (d = (d << 6) | (63 & g[o++])), E--
                          1 < E
                            ? (R[p++] = 65533)
                            : d < 65536
                            ? (R[p++] = d)
                            : ((d -= 65536),
                              (R[p++] = 55296 | ((d >> 10) & 1023)),
                              (R[p++] = 56320 | (1023 & d)))
                        }
                      return (
                        R.length !== p &&
                          (R.subarray
                            ? (R = R.subarray(0, p))
                            : (R.length = p)),
                        f.applyFromCharCode(R)
                      )
                    })(
                      (l = f.transformTo(
                        h.uint8array ? 'uint8array' : 'array',
                        l
                      ))
                    )
              }),
              f.inherits(b, _),
              (b.prototype.processChunk = function (l) {
                var g = f.transformTo(
                  h.uint8array ? 'uint8array' : 'array',
                  l.data
                )
                if (this.leftOver && this.leftOver.length) {
                  if (h.uint8array) {
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
                    var R
                    for (
                      (U = U || E.length) > E.length && (U = E.length),
                        R = U - 1;
                      0 <= R && (192 & E[R]) == 128;

                    )
                      R--
                    return R < 0 || R === 0 ? U : R + r[E[R]] > U ? R : U
                  })(g),
                  d = g
                p !== g.length &&
                  (h.uint8array
                    ? ((d = g.subarray(0, p)),
                      (this.leftOver = g.subarray(p, g.length)))
                    : ((d = g.slice(0, p)),
                      (this.leftOver = g.slice(p, g.length)))),
                  this.push({ data: v.utf8decode(d), meta: l.meta })
              }),
              (b.prototype.flush = function () {
                this.leftOver &&
                  this.leftOver.length &&
                  (this.push({ data: v.utf8decode(this.leftOver), meta: {} }),
                  (this.leftOver = null))
              }),
              (v.Utf8DecodeWorker = b),
              f.inherits(T, _),
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
          function (m, M, v) {
            var f = m('./support'),
              h = m('./base64'),
              s = m('./nodejsUtils'),
              _ = m('./external')
            function r(o) {
              return o
            }
            function L(o, p) {
              for (var d = 0; d < o.length; ++d) p[d] = 255 & o.charCodeAt(d)
              return p
            }
            m('setimmediate'),
              (v.newBlob = function (o, p) {
                v.checkSupport('blob')
                try {
                  return new Blob([o], { type: p })
                } catch {
                  try {
                    var d = new (self.BlobBuilder ||
                      self.WebKitBlobBuilder ||
                      self.MozBlobBuilder ||
                      self.MSBlobBuilder)()
                    return d.append(o), d.getBlob(p)
                  } catch {
                    throw new Error("Bug : can't construct the Blob.")
                  }
                }
              })
            var b = {
              stringifyByChunk: function (o, p, d) {
                var E = [],
                  U = 0,
                  R = o.length
                if (R <= d) return String.fromCharCode.apply(null, o)
                for (; U < R; )
                  p === 'array' || p === 'nodebuffer'
                    ? E.push(
                        String.fromCharCode.apply(
                          null,
                          o.slice(U, Math.min(U + d, R))
                        )
                      )
                    : E.push(
                        String.fromCharCode.apply(
                          null,
                          o.subarray(U, Math.min(U + d, R))
                        )
                      ),
                    (U += d)
                return E.join('')
              },
              stringifyByChar: function (o) {
                for (var p = '', d = 0; d < o.length; d++)
                  p += String.fromCharCode(o[d])
                return p
              },
              applyCanBeUsed: {
                uint8array: (function () {
                  try {
                    return (
                      f.uint8array &&
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
                      f.nodebuffer &&
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
                d = v.getTypeOf(o),
                E = !0
              if (
                (d === 'uint8array'
                  ? (E = b.applyCanBeUsed.uint8array)
                  : d === 'nodebuffer' && (E = b.applyCanBeUsed.nodebuffer),
                E)
              )
                for (; 1 < p; )
                  try {
                    return b.stringifyByChunk(o, d, p)
                  } catch {
                    p = Math.floor(p / 2)
                  }
              return b.stringifyByChar(o)
            }
            function l(o, p) {
              for (var d = 0; d < o.length; d++) p[d] = o[d]
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
                var d = v.getTypeOf(p)
                return g[d][o](p)
              }),
              (v.resolve = function (o) {
                for (var p = o.split('/'), d = [], E = 0; E < p.length; E++) {
                  var U = p[E]
                  U === '.' ||
                    (U === '' && E !== 0 && E !== p.length - 1) ||
                    (U === '..' ? d.pop() : d.push(U))
                }
                return d.join('/')
              }),
              (v.getTypeOf = function (o) {
                return typeof o == 'string'
                  ? 'string'
                  : Object.prototype.toString.call(o) === '[object Array]'
                  ? 'array'
                  : f.nodebuffer && s.isBuffer(o)
                  ? 'nodebuffer'
                  : f.uint8array && o instanceof Uint8Array
                  ? 'uint8array'
                  : f.arraybuffer && o instanceof ArrayBuffer
                  ? 'arraybuffer'
                  : void 0
              }),
              (v.checkSupport = function (o) {
                if (!f[o.toLowerCase()])
                  throw new Error(o + ' is not supported by this platform')
              }),
              (v.MAX_VALUE_16BITS = 65535),
              (v.MAX_VALUE_32BITS = -1),
              (v.pretty = function (o) {
                var p,
                  d,
                  E = ''
                for (d = 0; d < (o || '').length; d++)
                  E +=
                    '\\x' +
                    ((p = o.charCodeAt(d)) < 16 ? '0' : '') +
                    p.toString(16).toUpperCase()
                return E
              }),
              (v.delay = function (o, p, d) {
                setImmediate(function () {
                  o.apply(d || null, p || [])
                })
              }),
              (v.inherits = function (o, p) {
                function d() {}
                ;(d.prototype = p.prototype), (o.prototype = new d())
              }),
              (v.extend = function () {
                var o,
                  p,
                  d = {}
                for (o = 0; o < arguments.length; o++)
                  for (p in arguments[o])
                    Object.prototype.hasOwnProperty.call(arguments[o], p) &&
                      d[p] === void 0 &&
                      (d[p] = arguments[o][p])
                return d
              }),
              (v.prepareContent = function (o, p, d, E, U) {
                return _.Promise.resolve(p)
                  .then(function (R) {
                    return f.blob &&
                      (R instanceof Blob ||
                        ['[object File]', '[object Blob]'].indexOf(
                          Object.prototype.toString.call(R)
                        ) !== -1) &&
                      typeof FileReader < 'u'
                      ? new _.Promise(function (O, q) {
                          var G = new FileReader()
                          ;(G.onload = function (V) {
                            O(V.target.result)
                          }),
                            (G.onerror = function (V) {
                              q(V.target.error)
                            }),
                            G.readAsArrayBuffer(R)
                        })
                      : R
                  })
                  .then(function (R) {
                    var O = v.getTypeOf(R)
                    return O
                      ? (O === 'arraybuffer'
                          ? (R = v.transformTo('uint8array', R))
                          : O === 'string' &&
                            (U
                              ? (R = h.decode(R))
                              : d &&
                                E !== !0 &&
                                (R = (function (q) {
                                  return L(
                                    q,
                                    f.uint8array
                                      ? new Uint8Array(q.length)
                                      : new Array(q.length)
                                  )
                                })(R))),
                        R)
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
          function (m, M, v) {
            var f = m('./reader/readerFor'),
              h = m('./utils'),
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
                      h.pretty(T) +
                      ', expected ' +
                      h.pretty(b) +
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
                  l = h.transformTo(T, b)
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
                  this.diskNumber === h.MAX_VALUE_16BITS ||
                    this.diskWithCentralDirStart === h.MAX_VALUE_16BITS ||
                    this.centralDirRecordsOnThisDisk === h.MAX_VALUE_16BITS ||
                    this.centralDirRecords === h.MAX_VALUE_16BITS ||
                    this.centralDirSize === h.MAX_VALUE_32BITS ||
                    this.centralDirOffset === h.MAX_VALUE_32BITS)
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
                this.reader = f(b)
              },
              load: function (b) {
                this.prepareReader(b),
                  this.readEndOfCentral(),
                  this.readCentralDir(),
                  this.readLocalFiles()
              }
            }),
              (M.exports = L)
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
          function (m, M, v) {
            var f = m('./reader/readerFor'),
              h = m('./utils'),
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
                    for (var d in L)
                      if (
                        Object.prototype.hasOwnProperty.call(L, d) &&
                        L[d].magic === p
                      )
                        return L[d]
                    return null
                  })(this.compressionMethod)) === null
                )
                  throw new Error(
                    'Corrupted zip : compression ' +
                      h.pretty(this.compressionMethod) +
                      ' unknown (inner file : ' +
                      h.transformTo('string', this.fileName) +
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
                  var l = f(this.extraFields[1].value)
                  this.uncompressedSize === h.MAX_VALUE_32BITS &&
                    (this.uncompressedSize = l.readInt(8)),
                    this.compressedSize === h.MAX_VALUE_32BITS &&
                      (this.compressedSize = l.readInt(8)),
                    this.localHeaderOffset === h.MAX_VALUE_32BITS &&
                      (this.localHeaderOffset = l.readInt(8)),
                    this.diskNumberStart === h.MAX_VALUE_32BITS &&
                      (this.diskNumberStart = l.readInt(4))
                }
              },
              readExtraFields: function (l) {
                var g,
                  o,
                  p,
                  d = l.index + this.extraFieldsLength
                for (
                  this.extraFields || (this.extraFields = {});
                  l.index + 4 < d;

                )
                  (g = l.readInt(2)),
                    (o = l.readInt(2)),
                    (p = l.readData(o)),
                    (this.extraFields[g] = { id: g, length: o, value: p })
                l.setIndex(d)
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
                    var o = h.transformTo(l, this.fileName)
                    this.fileNameStr = this.loadOptions.decodeFileName(o)
                  }
                  var p = this.findExtraFieldUnicodeComment()
                  if (p !== null) this.fileCommentStr = p
                  else {
                    var d = h.transformTo(l, this.fileComment)
                    this.fileCommentStr = this.loadOptions.decodeFileName(d)
                  }
                }
              },
              findExtraFieldUnicodePath: function () {
                var l = this.extraFields[28789]
                if (l) {
                  var g = f(l.value)
                  return g.readInt(1) !== 1 || _(this.fileName) !== g.readInt(4)
                    ? null
                    : r.utf8decode(g.readData(l.length - 5))
                }
                return null
              },
              findExtraFieldUnicodeComment: function () {
                var l = this.extraFields[25461]
                if (l) {
                  var g = f(l.value)
                  return g.readInt(1) !== 1 ||
                    _(this.fileComment) !== g.readInt(4)
                    ? null
                    : r.utf8decode(g.readData(l.length - 5))
                }
                return null
              }
            }),
              (M.exports = T)
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
          function (m, M, v) {
            function f(g, o, p) {
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
            var h = m('./stream/StreamHelper'),
              s = m('./stream/DataWorker'),
              _ = m('./utf8'),
              r = m('./compressedObject'),
              L = m('./stream/GenericWorker')
            f.prototype = {
              internalStream: function (g) {
                var o = null,
                  p = 'string'
                try {
                  if (!g) throw new Error('No output type specified.')
                  var d = (p = g.toLowerCase()) === 'string' || p === 'text'
                  ;(p !== 'binarystring' && p !== 'text') || (p = 'string'),
                    (o = this._decompressWorker())
                  var E = !this._dataBinary
                  E && !d && (o = o.pipe(new _.Utf8EncodeWorker())),
                    !E && d && (o = o.pipe(new _.Utf8DecodeWorker()))
                } catch (U) {
                  ;(o = new L('error')).error(U)
                }
                return new h(o, p, '')
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
              f.prototype[b[l]] = T
            M.exports = f
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
          function (m, M, v) {
            ;(function (f) {
              var h,
                s,
                _ = f.MutationObserver || f.WebKitMutationObserver
              if (_) {
                var r = 0,
                  L = new _(g),
                  b = f.document.createTextNode('')
                L.observe(b, { characterData: !0 }),
                  (h = function () {
                    b.data = r = ++r % 2
                  })
              } else if (f.setImmediate || f.MessageChannel === void 0)
                h =
                  'document' in f &&
                  'onreadystatechange' in f.document.createElement('script')
                    ? function () {
                        var o = f.document.createElement('script')
                        ;(o.onreadystatechange = function () {
                          g(),
                            (o.onreadystatechange = null),
                            o.parentNode.removeChild(o),
                            (o = null)
                        }),
                          f.document.documentElement.appendChild(o)
                      }
                    : function () {
                        setTimeout(g, 0)
                      }
              else {
                var T = new f.MessageChannel()
                ;(T.port1.onmessage = g),
                  (h = function () {
                    T.port2.postMessage(0)
                  })
              }
              var l = []
              function g() {
                var o, p
                s = !0
                for (var d = l.length; d; ) {
                  for (p = l, l = [], o = -1; ++o < d; ) p[o]()
                  d = l.length
                }
                s = !1
              }
              M.exports = function (o) {
                l.push(o) !== 1 || s || h()
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
          function (m, M, v) {
            var f = m('immediate')
            function h() {}
            var s = {},
              _ = ['REJECTED'],
              r = ['FULFILLED'],
              L = ['PENDING']
            function b(d) {
              if (typeof d != 'function')
                throw new TypeError('resolver must be a function')
              ;(this.state = L),
                (this.queue = []),
                (this.outcome = void 0),
                d !== h && o(this, d)
            }
            function T(d, E, U) {
              ;(this.promise = d),
                typeof E == 'function' &&
                  ((this.onFulfilled = E),
                  (this.callFulfilled = this.otherCallFulfilled)),
                typeof U == 'function' &&
                  ((this.onRejected = U),
                  (this.callRejected = this.otherCallRejected))
            }
            function l(d, E, U) {
              f(function () {
                var R
                try {
                  R = E(U)
                } catch (O) {
                  return s.reject(d, O)
                }
                R === d
                  ? s.reject(
                      d,
                      new TypeError('Cannot resolve promise with itself')
                    )
                  : s.resolve(d, R)
              })
            }
            function g(d) {
              var E = d && d.then
              if (
                d &&
                (typeof d == 'object' || typeof d == 'function') &&
                typeof E == 'function'
              )
                return function () {
                  E.apply(d, arguments)
                }
            }
            function o(d, E) {
              var U = !1
              function R(G) {
                U || ((U = !0), s.reject(d, G))
              }
              function O(G) {
                U || ((U = !0), s.resolve(d, G))
              }
              var q = p(function () {
                E(O, R)
              })
              q.status === 'error' && R(q.value)
            }
            function p(d, E) {
              var U = {}
              try {
                ;(U.value = d(E)), (U.status = 'success')
              } catch (R) {
                ;(U.status = 'error'), (U.value = R)
              }
              return U
            }
            ;((M.exports = b).prototype.finally = function (d) {
              if (typeof d != 'function') return this
              var E = this.constructor
              return this.then(
                function (U) {
                  return E.resolve(d()).then(function () {
                    return U
                  })
                },
                function (U) {
                  return E.resolve(d()).then(function () {
                    throw U
                  })
                }
              )
            }),
              (b.prototype.catch = function (d) {
                return this.then(null, d)
              }),
              (b.prototype.then = function (d, E) {
                if (
                  (typeof d != 'function' && this.state === r) ||
                  (typeof E != 'function' && this.state === _)
                )
                  return this
                var U = new this.constructor(h)
                return (
                  this.state !== L
                    ? l(U, this.state === r ? d : E, this.outcome)
                    : this.queue.push(new T(U, d, E)),
                  U
                )
              }),
              (T.prototype.callFulfilled = function (d) {
                s.resolve(this.promise, d)
              }),
              (T.prototype.otherCallFulfilled = function (d) {
                l(this.promise, this.onFulfilled, d)
              }),
              (T.prototype.callRejected = function (d) {
                s.reject(this.promise, d)
              }),
              (T.prototype.otherCallRejected = function (d) {
                l(this.promise, this.onRejected, d)
              }),
              (s.resolve = function (d, E) {
                var U = p(g, E)
                if (U.status === 'error') return s.reject(d, U.value)
                var R = U.value
                if (R) o(d, R)
                else {
                  ;(d.state = r), (d.outcome = E)
                  for (var O = -1, q = d.queue.length; ++O < q; )
                    d.queue[O].callFulfilled(E)
                }
                return d
              }),
              (s.reject = function (d, E) {
                ;(d.state = _), (d.outcome = E)
                for (var U = -1, R = d.queue.length; ++U < R; )
                  d.queue[U].callRejected(E)
                return d
              }),
              (b.resolve = function (d) {
                return d instanceof this ? d : s.resolve(new this(h), d)
              }),
              (b.reject = function (d) {
                var E = new this(h)
                return s.reject(E, d)
              }),
              (b.all = function (d) {
                var E = this
                if (Object.prototype.toString.call(d) !== '[object Array]')
                  return this.reject(new TypeError('must be an array'))
                var U = d.length,
                  R = !1
                if (!U) return this.resolve([])
                for (
                  var O = new Array(U), q = 0, G = -1, V = new this(h);
                  ++G < U;

                )
                  B(d[G], G)
                return V
                function B(W, dt) {
                  E.resolve(W).then(
                    function (w) {
                      ;(O[dt] = w),
                        ++q !== U || R || ((R = !0), s.resolve(V, O))
                    },
                    function (w) {
                      R || ((R = !0), s.reject(V, w))
                    }
                  )
                }
              }),
              (b.race = function (d) {
                var E = this
                if (Object.prototype.toString.call(d) !== '[object Array]')
                  return this.reject(new TypeError('must be an array'))
                var U = d.length,
                  R = !1
                if (!U) return this.resolve([])
                for (var O = -1, q = new this(h); ++O < U; )
                  (G = d[O]),
                    E.resolve(G).then(
                      function (V) {
                        R || ((R = !0), s.resolve(q, V))
                      },
                      function (V) {
                        R || ((R = !0), s.reject(q, V))
                      }
                    )
                var G
                return q
              })
          },
          { immediate: 36 }
        ],
        38: [
          function (m, M, v) {
            var f = {}
            ;(0, m('./lib/utils/common').assign)(
              f,
              m('./lib/deflate'),
              m('./lib/inflate'),
              m('./lib/zlib/constants')
            ),
              (M.exports = f)
          },
          {
            './lib/deflate': 39,
            './lib/inflate': 40,
            './lib/utils/common': 41,
            './lib/zlib/constants': 44
          }
        ],
        39: [
          function (m, M, v) {
            var f = m('./zlib/deflate'),
              h = m('./utils/common'),
              s = m('./utils/strings'),
              _ = m('./zlib/messages'),
              r = m('./zlib/zstream'),
              L = Object.prototype.toString,
              b = 0,
              T = -1,
              l = 0,
              g = 8
            function o(d) {
              if (!(this instanceof o)) return new o(d)
              this.options = h.assign(
                {
                  level: T,
                  method: g,
                  chunkSize: 16384,
                  windowBits: 15,
                  memLevel: 8,
                  strategy: l,
                  to: ''
                },
                d || {}
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
              var U = f.deflateInit2(
                this.strm,
                E.level,
                E.method,
                E.windowBits,
                E.memLevel,
                E.strategy
              )
              if (U !== b) throw new Error(_[U])
              if (
                (E.header && f.deflateSetHeader(this.strm, E.header),
                E.dictionary)
              ) {
                var R
                if (
                  ((R =
                    typeof E.dictionary == 'string'
                      ? s.string2buf(E.dictionary)
                      : L.call(E.dictionary) === '[object ArrayBuffer]'
                      ? new Uint8Array(E.dictionary)
                      : E.dictionary),
                  (U = f.deflateSetDictionary(this.strm, R)) !== b)
                )
                  throw new Error(_[U])
                this._dict_set = !0
              }
            }
            function p(d, E) {
              var U = new o(E)
              if ((U.push(d, !0), U.err)) throw U.msg || _[U.err]
              return U.result
            }
            ;(o.prototype.push = function (d, E) {
              var U,
                R,
                O = this.strm,
                q = this.options.chunkSize
              if (this.ended) return !1
              ;(R = E === ~~E ? E : E === !0 ? 4 : 0),
                typeof d == 'string'
                  ? (O.input = s.string2buf(d))
                  : L.call(d) === '[object ArrayBuffer]'
                  ? (O.input = new Uint8Array(d))
                  : (O.input = d),
                (O.next_in = 0),
                (O.avail_in = O.input.length)
              do {
                if (
                  (O.avail_out === 0 &&
                    ((O.output = new h.Buf8(q)),
                    (O.next_out = 0),
                    (O.avail_out = q)),
                  (U = f.deflate(O, R)) !== 1 && U !== b)
                )
                  return this.onEnd(U), !(this.ended = !0)
                ;(O.avail_out !== 0 &&
                  (O.avail_in !== 0 || (R !== 4 && R !== 2))) ||
                  (this.options.to === 'string'
                    ? this.onData(
                        s.buf2binstring(h.shrinkBuf(O.output, O.next_out))
                      )
                    : this.onData(h.shrinkBuf(O.output, O.next_out)))
              } while ((0 < O.avail_in || O.avail_out === 0) && U !== 1)
              return R === 4
                ? ((U = f.deflateEnd(this.strm)),
                  this.onEnd(U),
                  (this.ended = !0),
                  U === b)
                : R !== 2 || (this.onEnd(b), !(O.avail_out = 0))
            }),
              (o.prototype.onData = function (d) {
                this.chunks.push(d)
              }),
              (o.prototype.onEnd = function (d) {
                d === b &&
                  (this.options.to === 'string'
                    ? (this.result = this.chunks.join(''))
                    : (this.result = h.flattenChunks(this.chunks))),
                  (this.chunks = []),
                  (this.err = d),
                  (this.msg = this.strm.msg)
              }),
              (v.Deflate = o),
              (v.deflate = p),
              (v.deflateRaw = function (d, E) {
                return ((E = E || {}).raw = !0), p(d, E)
              }),
              (v.gzip = function (d, E) {
                return ((E = E || {}).gzip = !0), p(d, E)
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
          function (m, M, v) {
            var f = m('./zlib/inflate'),
              h = m('./utils/common'),
              s = m('./utils/strings'),
              _ = m('./zlib/constants'),
              r = m('./zlib/messages'),
              L = m('./zlib/zstream'),
              b = m('./zlib/gzheader'),
              T = Object.prototype.toString
            function l(o) {
              if (!(this instanceof l)) return new l(o)
              this.options = h.assign(
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
              var d = f.inflateInit2(this.strm, p.windowBits)
              if (d !== _.Z_OK) throw new Error(r[d])
              ;(this.header = new b()),
                f.inflateGetHeader(this.strm, this.header)
            }
            function g(o, p) {
              var d = new l(p)
              if ((d.push(o, !0), d.err)) throw d.msg || r[d.err]
              return d.result
            }
            ;(l.prototype.push = function (o, p) {
              var d,
                E,
                U,
                R,
                O,
                q,
                G = this.strm,
                V = this.options.chunkSize,
                B = this.options.dictionary,
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
                    ((G.output = new h.Buf8(V)),
                    (G.next_out = 0),
                    (G.avail_out = V)),
                  (d = f.inflate(G, _.Z_NO_FLUSH)) === _.Z_NEED_DICT &&
                    B &&
                    ((q =
                      typeof B == 'string'
                        ? s.string2buf(B)
                        : T.call(B) === '[object ArrayBuffer]'
                        ? new Uint8Array(B)
                        : B),
                    (d = f.inflateSetDictionary(this.strm, q))),
                  d === _.Z_BUF_ERROR && W === !0 && ((d = _.Z_OK), (W = !1)),
                  d !== _.Z_STREAM_END && d !== _.Z_OK)
                )
                  return this.onEnd(d), !(this.ended = !0)
                G.next_out &&
                  ((G.avail_out !== 0 &&
                    d !== _.Z_STREAM_END &&
                    (G.avail_in !== 0 ||
                      (E !== _.Z_FINISH && E !== _.Z_SYNC_FLUSH))) ||
                    (this.options.to === 'string'
                      ? ((U = s.utf8border(G.output, G.next_out)),
                        (R = G.next_out - U),
                        (O = s.buf2string(G.output, U)),
                        (G.next_out = R),
                        (G.avail_out = V - R),
                        R && h.arraySet(G.output, G.output, U, R, 0),
                        this.onData(O))
                      : this.onData(h.shrinkBuf(G.output, G.next_out)))),
                  G.avail_in === 0 && G.avail_out === 0 && (W = !0)
              } while (
                (0 < G.avail_in || G.avail_out === 0) &&
                d !== _.Z_STREAM_END
              )
              return (
                d === _.Z_STREAM_END && (E = _.Z_FINISH),
                E === _.Z_FINISH
                  ? ((d = f.inflateEnd(this.strm)),
                    this.onEnd(d),
                    (this.ended = !0),
                    d === _.Z_OK)
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
                    : (this.result = h.flattenChunks(this.chunks))),
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
          function (m, M, v) {
            var f =
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
            var h = {
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
                  v.assign(v, h))
                : ((v.Buf8 = Array),
                  (v.Buf16 = Array),
                  (v.Buf32 = Array),
                  v.assign(v, s))
            }),
              v.setTyped(f)
          },
          {}
        ],
        42: [
          function (m, M, v) {
            var f = m('./common'),
              h = !0,
              s = !0
            try {
              String.fromCharCode.apply(null, [0])
            } catch {
              h = !1
            }
            try {
              String.fromCharCode.apply(null, new Uint8Array(1))
            } catch {
              s = !1
            }
            for (var _ = new f.Buf8(256), r = 0; r < 256; r++)
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
              if (T < 65537 && ((b.subarray && s) || (!b.subarray && h)))
                return String.fromCharCode.apply(null, f.shrinkBuf(b, T))
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
                  d = b.length,
                  E = 0
                for (o = 0; o < d; o++)
                  (64512 & (l = b.charCodeAt(o))) == 55296 &&
                    o + 1 < d &&
                    (64512 & (g = b.charCodeAt(o + 1))) == 56320 &&
                    ((l = 65536 + ((l - 55296) << 10) + (g - 56320)), o++),
                    (E += l < 128 ? 1 : l < 2048 ? 2 : l < 65536 ? 3 : 4)
                for (T = new f.Buf8(E), o = p = 0; p < E; o++)
                  (64512 & (l = b.charCodeAt(o))) == 55296 &&
                    o + 1 < d &&
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
                  var T = new f.Buf8(b.length), l = 0, g = T.length;
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
                  d = T || b.length,
                  E = new Array(2 * d)
                for (l = g = 0; l < d; )
                  if ((o = b[l++]) < 128) E[g++] = o
                  else if (4 < (p = _[o])) (E[g++] = 65533), (l += p - 1)
                  else {
                    for (o &= p === 2 ? 31 : p === 3 ? 15 : 7; 1 < p && l < d; )
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
          function (m, M, v) {
            M.exports = function (f, h, s, _) {
              for (
                var r = (65535 & f) | 0, L = ((f >>> 16) & 65535) | 0, b = 0;
                s !== 0;

              ) {
                for (
                  s -= b = 2e3 < s ? 2e3 : s;
                  (L = (L + (r = (r + h[_++]) | 0)) | 0), --b;

                );
                ;(r %= 65521), (L %= 65521)
              }
              return r | (L << 16) | 0
            }
          },
          {}
        ],
        44: [
          function (m, M, v) {
            M.exports = {
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
          function (m, M, v) {
            var f = (function () {
              for (var h, s = [], _ = 0; _ < 256; _++) {
                h = _
                for (var r = 0; r < 8; r++)
                  h = 1 & h ? 3988292384 ^ (h >>> 1) : h >>> 1
                s[_] = h
              }
              return s
            })()
            M.exports = function (h, s, _, r) {
              var L = f,
                b = r + _
              h ^= -1
              for (var T = r; T < b; T++) h = (h >>> 8) ^ L[255 & (h ^ s[T])]
              return -1 ^ h
            }
          },
          {}
        ],
        46: [
          function (m, M, v) {
            var f,
              h = m('../utils/common'),
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
              d = 2,
              E = 8,
              U = 9,
              R = 286,
              O = 30,
              q = 19,
              G = 2 * R + 1,
              V = 15,
              B = 3,
              W = 258,
              dt = W + B + 1,
              w = 42,
              A = 113,
              i = 1,
              k = 2,
              tt = 3,
              I = 4
            function et(n, Y) {
              return (n.msg = L[Y]), Y
            }
            function x(n) {
              return (n << 1) - (4 < n ? 9 : 0)
            }
            function $(n) {
              for (var Y = n.length; 0 <= --Y; ) n[Y] = 0
            }
            function D(n) {
              var Y = n.state,
                j = Y.pending
              j > n.avail_out && (j = n.avail_out),
                j !== 0 &&
                  (h.arraySet(
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
            function ut(n, Y) {
              n.pending_buf[n.pending++] = Y
            }
            function at(n, Y) {
              ;(n.pending_buf[n.pending++] = (Y >>> 8) & 255),
                (n.pending_buf[n.pending++] = 255 & Y)
            }
            function H(n, Y) {
              var j,
                N,
                u = n.max_chain_length,
                S = n.strstart,
                J = n.prev_length,
                K = n.nice_match,
                z =
                  n.strstart > n.w_size - dt ? n.strstart - (n.w_size - dt) : 0,
                rt = n.window,
                st = n.w_mask,
                it = n.prev,
                ht = n.strstart + W,
                St = rt[S + J - 1],
                gt = rt[S + J]
              n.prev_length >= n.good_match && (u >>= 2),
                K > n.lookahead && (K = n.lookahead)
              do
                if (
                  rt[(j = Y) + J] === gt &&
                  rt[j + J - 1] === St &&
                  rt[j] === rt[S] &&
                  rt[++j] === rt[S + 1]
                ) {
                  ;(S += 2), j++
                  do;
                  while (
                    rt[++S] === rt[++j] &&
                    rt[++S] === rt[++j] &&
                    rt[++S] === rt[++j] &&
                    rt[++S] === rt[++j] &&
                    rt[++S] === rt[++j] &&
                    rt[++S] === rt[++j] &&
                    rt[++S] === rt[++j] &&
                    rt[++S] === rt[++j] &&
                    S < ht
                  )
                  if (((N = W - (ht - S)), (S = ht - W), J < N)) {
                    if (((n.match_start = Y), K <= (J = N))) break
                    ;(St = rt[S + J - 1]), (gt = rt[S + J])
                  }
                }
              while ((Y = it[Y & st]) > z && --u != 0)
              return J <= n.lookahead ? J : n.lookahead
            }
            function lt(n) {
              var Y,
                j,
                N,
                u,
                S,
                J,
                K,
                z,
                rt,
                st,
                it = n.w_size
              do {
                if (
                  ((u = n.window_size - n.lookahead - n.strstart),
                  n.strstart >= it + (it - dt))
                ) {
                  for (
                    h.arraySet(n.window, n.window, it, it, 0),
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
                  ((J = n.strm),
                  (K = n.window),
                  (z = n.strstart + n.lookahead),
                  (rt = u),
                  (st = void 0),
                  (st = J.avail_in),
                  rt < st && (st = rt),
                  (j =
                    st === 0
                      ? 0
                      : ((J.avail_in -= st),
                        h.arraySet(K, J.input, J.next_in, st, z),
                        J.state.wrap === 1
                          ? (J.adler = _(J.adler, K, st, z))
                          : J.state.wrap === 2 &&
                            (J.adler = r(J.adler, K, st, z)),
                        (J.next_in += st),
                        (J.total_in += st),
                        st)),
                  (n.lookahead += j),
                  n.lookahead + n.insert >= B)
                )
                  for (
                    S = n.strstart - n.insert,
                      n.ins_h = n.window[S],
                      n.ins_h =
                        ((n.ins_h << n.hash_shift) ^ n.window[S + 1]) &
                        n.hash_mask;
                    n.insert &&
                    ((n.ins_h =
                      ((n.ins_h << n.hash_shift) ^ n.window[S + B - 1]) &
                      n.hash_mask),
                    (n.prev[S & n.w_mask] = n.head[n.ins_h]),
                    (n.head[n.ins_h] = S),
                    S++,
                    n.insert--,
                    !(n.lookahead + n.insert < B));

                  );
              } while (n.lookahead < dt && n.strm.avail_in !== 0)
            }
            function bt(n, Y) {
              for (var j, N; ; ) {
                if (n.lookahead < dt) {
                  if ((lt(n), n.lookahead < dt && Y === b)) return i
                  if (n.lookahead === 0) break
                }
                if (
                  ((j = 0),
                  n.lookahead >= B &&
                    ((n.ins_h =
                      ((n.ins_h << n.hash_shift) ^
                        n.window[n.strstart + B - 1]) &
                      n.hash_mask),
                    (j = n.prev[n.strstart & n.w_mask] = n.head[n.ins_h]),
                    (n.head[n.ins_h] = n.strstart)),
                  j !== 0 &&
                    n.strstart - j <= n.w_size - dt &&
                    (n.match_length = H(n, j)),
                  n.match_length >= B)
                )
                  if (
                    ((N = s._tr_tally(
                      n,
                      n.strstart - n.match_start,
                      n.match_length - B
                    )),
                    (n.lookahead -= n.match_length),
                    n.match_length <= n.max_lazy_match && n.lookahead >= B)
                  ) {
                    for (
                      n.match_length--;
                      n.strstart++,
                        (n.ins_h =
                          ((n.ins_h << n.hash_shift) ^
                            n.window[n.strstart + B - 1]) &
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
                (n.insert = n.strstart < B - 1 ? n.strstart : B - 1),
                Y === T
                  ? (F(n, !0), n.strm.avail_out === 0 ? tt : I)
                  : n.last_lit && (F(n, !1), n.strm.avail_out === 0)
                  ? i
                  : k
              )
            }
            function _t(n, Y) {
              for (var j, N, u; ; ) {
                if (n.lookahead < dt) {
                  if ((lt(n), n.lookahead < dt && Y === b)) return i
                  if (n.lookahead === 0) break
                }
                if (
                  ((j = 0),
                  n.lookahead >= B &&
                    ((n.ins_h =
                      ((n.ins_h << n.hash_shift) ^
                        n.window[n.strstart + B - 1]) &
                      n.hash_mask),
                    (j = n.prev[n.strstart & n.w_mask] = n.head[n.ins_h]),
                    (n.head[n.ins_h] = n.strstart)),
                  (n.prev_length = n.match_length),
                  (n.prev_match = n.match_start),
                  (n.match_length = B - 1),
                  j !== 0 &&
                    n.prev_length < n.max_lazy_match &&
                    n.strstart - j <= n.w_size - dt &&
                    ((n.match_length = H(n, j)),
                    n.match_length <= 5 &&
                      (n.strategy === 1 ||
                        (n.match_length === B &&
                          4096 < n.strstart - n.match_start)) &&
                      (n.match_length = B - 1)),
                  n.prev_length >= B && n.match_length <= n.prev_length)
                ) {
                  for (
                    u = n.strstart + n.lookahead - B,
                      N = s._tr_tally(
                        n,
                        n.strstart - 1 - n.prev_match,
                        n.prev_length - B
                      ),
                      n.lookahead -= n.prev_length - 1,
                      n.prev_length -= 2;
                    ++n.strstart <= u &&
                      ((n.ins_h =
                        ((n.ins_h << n.hash_shift) ^
                          n.window[n.strstart + B - 1]) &
                        n.hash_mask),
                      (j = n.prev[n.strstart & n.w_mask] = n.head[n.ins_h]),
                      (n.head[n.ins_h] = n.strstart)),
                      --n.prev_length != 0;

                  );
                  if (
                    ((n.match_available = 0),
                    (n.match_length = B - 1),
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
                (n.insert = n.strstart < B - 1 ? n.strstart : B - 1),
                Y === T
                  ? (F(n, !0), n.strm.avail_out === 0 ? tt : I)
                  : n.last_lit && (F(n, !1), n.strm.avail_out === 0)
                  ? i
                  : k
              )
            }
            function ct(n, Y, j, N, u) {
              ;(this.good_length = n),
                (this.max_lazy = Y),
                (this.nice_length = j),
                (this.max_chain = N),
                (this.func = u)
            }
            function yt() {
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
                (this.dyn_ltree = new h.Buf16(2 * G)),
                (this.dyn_dtree = new h.Buf16(2 * (2 * O + 1))),
                (this.bl_tree = new h.Buf16(2 * (2 * q + 1))),
                $(this.dyn_ltree),
                $(this.dyn_dtree),
                $(this.bl_tree),
                (this.l_desc = null),
                (this.d_desc = null),
                (this.bl_desc = null),
                (this.bl_count = new h.Buf16(V + 1)),
                (this.heap = new h.Buf16(2 * R + 1)),
                $(this.heap),
                (this.heap_len = 0),
                (this.heap_max = 0),
                (this.depth = new h.Buf16(2 * R + 1)),
                $(this.depth),
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
                  (n.data_type = d),
                  ((Y = n.state).pending = 0),
                  (Y.pending_out = 0),
                  Y.wrap < 0 && (Y.wrap = -Y.wrap),
                  (Y.status = Y.wrap ? w : A),
                  (n.adler = Y.wrap === 2 ? 0 : 1),
                  (Y.last_flush = b),
                  s._tr_init(Y),
                  l)
                : et(n, g)
            }
            function kt(n) {
              var Y = wt(n)
              return (
                Y === l &&
                  (function (j) {
                    ;(j.window_size = 2 * j.w_size),
                      $(j.head),
                      (j.max_lazy_match = f[j.level].max_lazy),
                      (j.good_match = f[j.level].good_length),
                      (j.nice_match = f[j.level].nice_length),
                      (j.max_chain_length = f[j.level].max_chain),
                      (j.strstart = 0),
                      (j.block_start = 0),
                      (j.lookahead = 0),
                      (j.insert = 0),
                      (j.match_length = j.prev_length = B - 1),
                      (j.match_available = 0),
                      (j.ins_h = 0)
                  })(n.state),
                Y
              )
            }
            function Ot(n, Y, j, N, u, S) {
              if (!n) return g
              var J = 1
              if (
                (Y === o && (Y = 6),
                N < 0 ? ((J = 0), (N = -N)) : 15 < N && ((J = 2), (N -= 16)),
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
                return et(n, g)
              N === 8 && (N = 9)
              var K = new yt()
              return (
                ((n.state = K).strm = n),
                (K.wrap = J),
                (K.gzhead = null),
                (K.w_bits = N),
                (K.w_size = 1 << K.w_bits),
                (K.w_mask = K.w_size - 1),
                (K.hash_bits = u + 7),
                (K.hash_size = 1 << K.hash_bits),
                (K.hash_mask = K.hash_size - 1),
                (K.hash_shift = ~~((K.hash_bits + B - 1) / B)),
                (K.window = new h.Buf8(2 * K.w_size)),
                (K.head = new h.Buf16(K.hash_size)),
                (K.prev = new h.Buf16(K.w_size)),
                (K.lit_bufsize = 1 << (u + 6)),
                (K.pending_buf_size = 4 * K.lit_bufsize),
                (K.pending_buf = new h.Buf8(K.pending_buf_size)),
                (K.d_buf = 1 * K.lit_bufsize),
                (K.l_buf = 3 * K.lit_bufsize),
                (K.level = Y),
                (K.strategy = S),
                (K.method = j),
                kt(n)
              )
            }
            ;(f = [
              new ct(0, 0, 0, 0, function (n, Y) {
                var j = 65535
                for (
                  j > n.pending_buf_size - 5 && (j = n.pending_buf_size - 5);
                  ;

                ) {
                  if (n.lookahead <= 1) {
                    if ((lt(n), n.lookahead === 0 && Y === b)) return i
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
                    (n.strstart - n.block_start >= n.w_size - dt &&
                      (F(n, !1), n.strm.avail_out === 0))
                  )
                    return i
                }
                return (
                  (n.insert = 0),
                  Y === T
                    ? (F(n, !0), n.strm.avail_out === 0 ? tt : I)
                    : (n.strstart > n.block_start &&
                        (F(n, !1), n.strm.avail_out),
                      i)
                )
              }),
              new ct(4, 4, 8, 4, bt),
              new ct(4, 5, 16, 8, bt),
              new ct(4, 6, 32, 32, bt),
              new ct(4, 4, 16, 16, _t),
              new ct(8, 16, 32, 32, _t),
              new ct(8, 16, 128, 128, _t),
              new ct(8, 32, 128, 256, _t),
              new ct(32, 128, 258, 1024, _t),
              new ct(32, 258, 258, 4096, _t)
            ]),
              (v.deflateInit = function (n, Y) {
                return Ot(n, Y, E, 15, 8, 0)
              }),
              (v.deflateInit2 = Ot),
              (v.deflateReset = kt),
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
                if (!n || !n.state || 5 < Y || Y < 0) return n ? et(n, g) : g
                if (
                  ((N = n.state),
                  !n.output ||
                    (!n.input && n.avail_in !== 0) ||
                    (N.status === 666 && Y !== T))
                )
                  return et(n, n.avail_out === 0 ? -5 : g)
                if (
                  ((N.strm = n),
                  (j = N.last_flush),
                  (N.last_flush = Y),
                  N.status === w)
                )
                  if (N.wrap === 2)
                    (n.adler = 0),
                      ut(N, 31),
                      ut(N, 139),
                      ut(N, 8),
                      N.gzhead
                        ? (ut(
                            N,
                            (N.gzhead.text ? 1 : 0) +
                              (N.gzhead.hcrc ? 2 : 0) +
                              (N.gzhead.extra ? 4 : 0) +
                              (N.gzhead.name ? 8 : 0) +
                              (N.gzhead.comment ? 16 : 0)
                          ),
                          ut(N, 255 & N.gzhead.time),
                          ut(N, (N.gzhead.time >> 8) & 255),
                          ut(N, (N.gzhead.time >> 16) & 255),
                          ut(N, (N.gzhead.time >> 24) & 255),
                          ut(
                            N,
                            N.level === 9
                              ? 2
                              : 2 <= N.strategy || N.level < 2
                              ? 4
                              : 0
                          ),
                          ut(N, 255 & N.gzhead.os),
                          N.gzhead.extra &&
                            N.gzhead.extra.length &&
                            (ut(N, 255 & N.gzhead.extra.length),
                            ut(N, (N.gzhead.extra.length >> 8) & 255)),
                          N.gzhead.hcrc &&
                            (n.adler = r(n.adler, N.pending_buf, N.pending, 0)),
                          (N.gzindex = 0),
                          (N.status = 69))
                        : (ut(N, 0),
                          ut(N, 0),
                          ut(N, 0),
                          ut(N, 0),
                          ut(N, 0),
                          ut(
                            N,
                            N.level === 9
                              ? 2
                              : 2 <= N.strategy || N.level < 2
                              ? 4
                              : 0
                          ),
                          ut(N, 3),
                          (N.status = A))
                  else {
                    var J = (E + ((N.w_bits - 8) << 4)) << 8
                    ;(J |=
                      (2 <= N.strategy || N.level < 2
                        ? 0
                        : N.level < 6
                        ? 1
                        : N.level === 6
                        ? 2
                        : 3) << 6),
                      N.strstart !== 0 && (J |= 32),
                      (J += 31 - (J % 31)),
                      (N.status = A),
                      at(N, J),
                      N.strstart !== 0 &&
                        (at(N, n.adler >>> 16), at(N, 65535 & n.adler)),
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
                      ut(N, 255 & N.gzhead.extra[N.gzindex]), N.gzindex++
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
                        ut(N, S)
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
                        ut(N, S)
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
                          (ut(N, 255 & n.adler),
                          ut(N, (n.adler >> 8) & 255),
                          (n.adler = 0),
                          (N.status = A)))
                      : (N.status = A)),
                  N.pending !== 0)
                ) {
                  if ((D(n), n.avail_out === 0)) return (N.last_flush = -1), l
                } else if (n.avail_in === 0 && x(Y) <= x(j) && Y !== T)
                  return et(n, -5)
                if (N.status === 666 && n.avail_in !== 0) return et(n, -5)
                if (
                  n.avail_in !== 0 ||
                  N.lookahead !== 0 ||
                  (Y !== b && N.status !== 666)
                ) {
                  var K =
                    N.strategy === 2
                      ? (function (z, rt) {
                          for (var st; ; ) {
                            if (
                              z.lookahead === 0 &&
                              (lt(z), z.lookahead === 0)
                            ) {
                              if (rt === b) return i
                              break
                            }
                            if (
                              ((z.match_length = 0),
                              (st = s._tr_tally(z, 0, z.window[z.strstart])),
                              z.lookahead--,
                              z.strstart++,
                              st && (F(z, !1), z.strm.avail_out === 0))
                            )
                              return i
                          }
                          return (
                            (z.insert = 0),
                            rt === T
                              ? (F(z, !0), z.strm.avail_out === 0 ? tt : I)
                              : z.last_lit && (F(z, !1), z.strm.avail_out === 0)
                              ? i
                              : k
                          )
                        })(N, Y)
                      : N.strategy === 3
                      ? (function (z, rt) {
                          for (var st, it, ht, St, gt = z.window; ; ) {
                            if (z.lookahead <= W) {
                              if ((lt(z), z.lookahead <= W && rt === b))
                                return i
                              if (z.lookahead === 0) break
                            }
                            if (
                              ((z.match_length = 0),
                              z.lookahead >= B &&
                                0 < z.strstart &&
                                (it = gt[(ht = z.strstart - 1)]) === gt[++ht] &&
                                it === gt[++ht] &&
                                it === gt[++ht])
                            ) {
                              St = z.strstart + W
                              do;
                              while (
                                it === gt[++ht] &&
                                it === gt[++ht] &&
                                it === gt[++ht] &&
                                it === gt[++ht] &&
                                it === gt[++ht] &&
                                it === gt[++ht] &&
                                it === gt[++ht] &&
                                it === gt[++ht] &&
                                ht < St
                              )
                              ;(z.match_length = W - (St - ht)),
                                z.match_length > z.lookahead &&
                                  (z.match_length = z.lookahead)
                            }
                            if (
                              (z.match_length >= B
                                ? ((st = s._tr_tally(z, 1, z.match_length - B)),
                                  (z.lookahead -= z.match_length),
                                  (z.strstart += z.match_length),
                                  (z.match_length = 0))
                                : ((st = s._tr_tally(
                                    z,
                                    0,
                                    z.window[z.strstart]
                                  )),
                                  z.lookahead--,
                                  z.strstart++),
                              st && (F(z, !1), z.strm.avail_out === 0))
                            )
                              return i
                          }
                          return (
                            (z.insert = 0),
                            rt === T
                              ? (F(z, !0), z.strm.avail_out === 0 ? tt : I)
                              : z.last_lit && (F(z, !1), z.strm.avail_out === 0)
                              ? i
                              : k
                          )
                        })(N, Y)
                      : f[N.level].func(N, Y)
                  if (
                    ((K !== tt && K !== I) || (N.status = 666),
                    K === i || K === tt)
                  )
                    return n.avail_out === 0 && (N.last_flush = -1), l
                  if (
                    K === k &&
                    (Y === 1
                      ? s._tr_align(N)
                      : Y !== 5 &&
                        (s._tr_stored_block(N, 0, 0, !1),
                        Y === 3 &&
                          ($(N.head),
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
                      ? (ut(N, 255 & n.adler),
                        ut(N, (n.adler >> 8) & 255),
                        ut(N, (n.adler >> 16) & 255),
                        ut(N, (n.adler >> 24) & 255),
                        ut(N, 255 & n.total_in),
                        ut(N, (n.total_in >> 8) & 255),
                        ut(N, (n.total_in >> 16) & 255),
                        ut(N, (n.total_in >> 24) & 255))
                      : (at(N, n.adler >>> 16), at(N, 65535 & n.adler)),
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
                    Y !== A &&
                    Y !== 666
                    ? et(n, g)
                    : ((n.state = null), Y === A ? et(n, -3) : l)
                  : g
              }),
              (v.deflateSetDictionary = function (n, Y) {
                var j,
                  N,
                  u,
                  S,
                  J,
                  K,
                  z,
                  rt,
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
                        ($(j.head),
                        (j.strstart = 0),
                        (j.block_start = 0),
                        (j.insert = 0)),
                      (rt = new h.Buf8(j.w_size)),
                      h.arraySet(rt, Y, st - j.w_size, j.w_size, 0),
                      (Y = rt),
                      (st = j.w_size)),
                    J = n.avail_in,
                    K = n.next_in,
                    z = n.input,
                    n.avail_in = st,
                    n.next_in = 0,
                    n.input = Y,
                    lt(j);
                  j.lookahead >= B;

                ) {
                  for (
                    N = j.strstart, u = j.lookahead - (B - 1);
                    (j.ins_h =
                      ((j.ins_h << j.hash_shift) ^ j.window[N + B - 1]) &
                      j.hash_mask),
                      (j.prev[N & j.w_mask] = j.head[j.ins_h]),
                      (j.head[j.ins_h] = N),
                      N++,
                      --u;

                  );
                  ;(j.strstart = N), (j.lookahead = B - 1), lt(j)
                }
                return (
                  (j.strstart += j.lookahead),
                  (j.block_start = j.strstart),
                  (j.insert = j.lookahead),
                  (j.lookahead = 0),
                  (j.match_length = j.prev_length = B - 1),
                  (j.match_available = 0),
                  (n.next_in = K),
                  (n.input = z),
                  (n.avail_in = J),
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
          function (m, M, v) {
            M.exports = function () {
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
          function (m, M, v) {
            M.exports = function (f, h) {
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
                d,
                E,
                U,
                R,
                O,
                q,
                G,
                V,
                B,
                W,
                dt,
                w,
                A,
                i,
                k
              ;(s = f.state),
                (_ = f.next_in),
                (i = f.input),
                (r = _ + (f.avail_in - 5)),
                (L = f.next_out),
                (k = f.output),
                (b = L - (h - f.avail_out)),
                (T = L + (f.avail_out - 257)),
                (l = s.dmax),
                (g = s.wsize),
                (o = s.whave),
                (p = s.wnext),
                (d = s.window),
                (E = s.hold),
                (U = s.bits),
                (R = s.lencode),
                (O = s.distcode),
                (q = (1 << s.lenbits) - 1),
                (G = (1 << s.distbits) - 1)
              t: do {
                U < 15 &&
                  ((E += i[_++] << U), (U += 8), (E += i[_++] << U), (U += 8)),
                  (V = R[E & q])
                e: for (;;) {
                  if (
                    ((E >>>= B = V >>> 24),
                    (U -= B),
                    (B = (V >>> 16) & 255) === 0)
                  )
                    k[L++] = 65535 & V
                  else {
                    if (!(16 & B)) {
                      if (!(64 & B)) {
                        V = R[(65535 & V) + (E & ((1 << B) - 1))]
                        continue e
                      }
                      if (32 & B) {
                        s.mode = 12
                        break t
                      }
                      ;(f.msg = 'invalid literal/length code'), (s.mode = 30)
                      break t
                    }
                    ;(W = 65535 & V),
                      (B &= 15) &&
                        (U < B && ((E += i[_++] << U), (U += 8)),
                        (W += E & ((1 << B) - 1)),
                        (E >>>= B),
                        (U -= B)),
                      U < 15 &&
                        ((E += i[_++] << U),
                        (U += 8),
                        (E += i[_++] << U),
                        (U += 8)),
                      (V = O[E & G])
                    r: for (;;) {
                      if (
                        ((E >>>= B = V >>> 24),
                        (U -= B),
                        !(16 & (B = (V >>> 16) & 255)))
                      ) {
                        if (!(64 & B)) {
                          V = O[(65535 & V) + (E & ((1 << B) - 1))]
                          continue r
                        }
                        ;(f.msg = 'invalid distance code'), (s.mode = 30)
                        break t
                      }
                      if (
                        ((dt = 65535 & V),
                        U < (B &= 15) &&
                          ((E += i[_++] << U),
                          (U += 8) < B && ((E += i[_++] << U), (U += 8))),
                        l < (dt += E & ((1 << B) - 1)))
                      ) {
                        ;(f.msg = 'invalid distance too far back'),
                          (s.mode = 30)
                        break t
                      }
                      if (((E >>>= B), (U -= B), (B = L - b) < dt)) {
                        if (o < (B = dt - B) && s.sane) {
                          ;(f.msg = 'invalid distance too far back'),
                            (s.mode = 30)
                          break t
                        }
                        if (((A = d), (w = 0) === p)) {
                          if (((w += g - B), B < W)) {
                            for (W -= B; (k[L++] = d[w++]), --B; );
                            ;(w = L - dt), (A = k)
                          }
                        } else if (p < B) {
                          if (((w += g + p - B), (B -= p) < W)) {
                            for (W -= B; (k[L++] = d[w++]), --B; );
                            if (((w = 0), p < W)) {
                              for (W -= B = p; (k[L++] = d[w++]), --B; );
                              ;(w = L - dt), (A = k)
                            }
                          }
                        } else if (((w += p - B), B < W)) {
                          for (W -= B; (k[L++] = d[w++]), --B; );
                          ;(w = L - dt), (A = k)
                        }
                        for (; 2 < W; )
                          (k[L++] = A[w++]),
                            (k[L++] = A[w++]),
                            (k[L++] = A[w++]),
                            (W -= 3)
                        W && ((k[L++] = A[w++]), 1 < W && (k[L++] = A[w++]))
                      } else {
                        for (
                          w = L - dt;
                          (k[L++] = k[w++]),
                            (k[L++] = k[w++]),
                            (k[L++] = k[w++]),
                            2 < (W -= 3);

                        );
                        W && ((k[L++] = k[w++]), 1 < W && (k[L++] = k[w++]))
                      }
                      break
                    }
                  }
                  break
                }
              } while (_ < r && L < T)
              ;(_ -= W = U >> 3),
                (E &= (1 << (U -= W << 3)) - 1),
                (f.next_in = _),
                (f.next_out = L),
                (f.avail_in = _ < r ? r - _ + 5 : 5 - (_ - r)),
                (f.avail_out = L < T ? T - L + 257 : 257 - (L - T)),
                (s.hold = E),
                (s.bits = U)
            }
          },
          {}
        ],
        49: [
          function (m, M, v) {
            var f = m('../utils/common'),
              h = m('./adler32'),
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
            function d(w) {
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
                (this.lens = new f.Buf16(320)),
                (this.work = new f.Buf16(288)),
                (this.lendyn = null),
                (this.distdyn = null),
                (this.sane = 0),
                (this.back = 0),
                (this.was = 0)
            }
            function U(w) {
              var A
              return w && w.state
                ? ((A = w.state),
                  (w.total_in = w.total_out = A.total = 0),
                  (w.msg = ''),
                  A.wrap && (w.adler = 1 & A.wrap),
                  (A.mode = g),
                  (A.last = 0),
                  (A.havedict = 0),
                  (A.dmax = 32768),
                  (A.head = null),
                  (A.hold = 0),
                  (A.bits = 0),
                  (A.lencode = A.lendyn = new f.Buf32(o)),
                  (A.distcode = A.distdyn = new f.Buf32(p)),
                  (A.sane = 1),
                  (A.back = -1),
                  T)
                : l
            }
            function R(w) {
              var A
              return w && w.state
                ? (((A = w.state).wsize = 0),
                  (A.whave = 0),
                  (A.wnext = 0),
                  U(w))
                : l
            }
            function O(w, A) {
              var i, k
              return w && w.state
                ? ((k = w.state),
                  A < 0
                    ? ((i = 0), (A = -A))
                    : ((i = 1 + (A >> 4)), A < 48 && (A &= 15)),
                  A && (A < 8 || 15 < A)
                    ? l
                    : (k.window !== null && k.wbits !== A && (k.window = null),
                      (k.wrap = i),
                      (k.wbits = A),
                      R(w)))
                : l
            }
            function q(w, A) {
              var i, k
              return w
                ? ((k = new E()),
                  ((w.state = k).window = null),
                  (i = O(w, A)) !== T && (w.state = null),
                  i)
                : l
            }
            var G,
              V,
              B = !0
            function W(w) {
              if (B) {
                var A
                for (
                  G = new f.Buf32(512), V = new f.Buf32(32), A = 0;
                  A < 144;

                )
                  w.lens[A++] = 8
                for (; A < 256; ) w.lens[A++] = 9
                for (; A < 280; ) w.lens[A++] = 7
                for (; A < 288; ) w.lens[A++] = 8
                for (
                  r(L, w.lens, 0, 288, G, 0, w.work, { bits: 9 }), A = 0;
                  A < 32;

                )
                  w.lens[A++] = 5
                r(b, w.lens, 0, 32, V, 0, w.work, { bits: 5 }), (B = !1)
              }
              ;(w.lencode = G),
                (w.lenbits = 9),
                (w.distcode = V),
                (w.distbits = 5)
            }
            function dt(w, A, i, k) {
              var tt,
                I = w.state
              return (
                I.window === null &&
                  ((I.wsize = 1 << I.wbits),
                  (I.wnext = 0),
                  (I.whave = 0),
                  (I.window = new f.Buf8(I.wsize))),
                k >= I.wsize
                  ? (f.arraySet(I.window, A, i - I.wsize, I.wsize, 0),
                    (I.wnext = 0),
                    (I.whave = I.wsize))
                  : (k < (tt = I.wsize - I.wnext) && (tt = k),
                    f.arraySet(I.window, A, i - k, tt, I.wnext),
                    (k -= tt)
                      ? (f.arraySet(I.window, A, i - k, k, 0),
                        (I.wnext = k),
                        (I.whave = I.wsize))
                      : ((I.wnext += tt),
                        I.wnext === I.wsize && (I.wnext = 0),
                        I.whave < I.wsize && (I.whave += tt))),
                0
              )
            }
            ;(v.inflateReset = R),
              (v.inflateReset2 = O),
              (v.inflateResetKeep = U),
              (v.inflateInit = function (w) {
                return q(w, 15)
              }),
              (v.inflateInit2 = q),
              (v.inflate = function (w, A) {
                var i,
                  k,
                  tt,
                  I,
                  et,
                  x,
                  $,
                  D,
                  F,
                  ut,
                  at,
                  H,
                  lt,
                  bt,
                  _t,
                  ct,
                  yt,
                  wt,
                  kt,
                  Ot,
                  n,
                  Y,
                  j,
                  N,
                  u = 0,
                  S = new f.Buf8(4),
                  J = [
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
                  ($ = w.avail_out),
                  (I = w.next_in),
                  (k = w.input),
                  (x = w.avail_in),
                  (D = i.hold),
                  (F = i.bits),
                  (ut = x),
                  (at = $),
                  (Y = T)
                t: for (;;)
                  switch (i.mode) {
                    case g:
                      if (i.wrap === 0) {
                        i.mode = 13
                        break
                      }
                      for (; F < 16; ) {
                        if (x === 0) break t
                        x--, (D += k[I++] << F), (F += 8)
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
                        if (x === 0) break t
                        x--, (D += k[I++] << F), (F += 8)
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
                        if (x === 0) break t
                        x--, (D += k[I++] << F), (F += 8)
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
                        if (x === 0) break t
                        x--, (D += k[I++] << F), (F += 8)
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
                          if (x === 0) break t
                          x--, (D += k[I++] << F), (F += 8)
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
                        (x < (H = i.length) && (H = x),
                        H &&
                          (i.head &&
                            ((n = i.head.extra_len - i.length),
                            i.head.extra ||
                              (i.head.extra = new Array(i.head.extra_len)),
                            f.arraySet(i.head.extra, k, I, H, n)),
                          512 & i.flags && (i.check = s(i.check, k, H, I)),
                          (x -= H),
                          (I += H),
                          (i.length -= H)),
                        i.length)
                      )
                        break t
                      ;(i.length = 0), (i.mode = 7)
                    case 7:
                      if (2048 & i.flags) {
                        if (x === 0) break t
                        for (
                          H = 0;
                          (n = k[I + H++]),
                            i.head &&
                              n &&
                              i.length < 65536 &&
                              (i.head.name += String.fromCharCode(n)),
                            n && H < x;

                        );
                        if (
                          (512 & i.flags && (i.check = s(i.check, k, H, I)),
                          (x -= H),
                          (I += H),
                          n)
                        )
                          break t
                      } else i.head && (i.head.name = null)
                      ;(i.length = 0), (i.mode = 8)
                    case 8:
                      if (4096 & i.flags) {
                        if (x === 0) break t
                        for (
                          H = 0;
                          (n = k[I + H++]),
                            i.head &&
                              n &&
                              i.length < 65536 &&
                              (i.head.comment += String.fromCharCode(n)),
                            n && H < x;

                        );
                        if (
                          (512 & i.flags && (i.check = s(i.check, k, H, I)),
                          (x -= H),
                          (I += H),
                          n)
                        )
                          break t
                      } else i.head && (i.head.comment = null)
                      i.mode = 9
                    case 9:
                      if (512 & i.flags) {
                        for (; F < 16; ) {
                          if (x === 0) break t
                          x--, (D += k[I++] << F), (F += 8)
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
                        if (x === 0) break t
                        x--, (D += k[I++] << F), (F += 8)
                      }
                      ;(w.adler = i.check = d(D)), (F = D = 0), (i.mode = 11)
                    case 11:
                      if (i.havedict === 0)
                        return (
                          (w.next_out = et),
                          (w.avail_out = $),
                          (w.next_in = I),
                          (w.avail_in = x),
                          (i.hold = D),
                          (i.bits = F),
                          2
                        )
                      ;(w.adler = i.check = 1), (i.mode = 12)
                    case 12:
                      if (A === 5 || A === 6) break t
                    case 13:
                      if (i.last) {
                        ;(D >>>= 7 & F), (F -= 7 & F), (i.mode = 27)
                        break
                      }
                      for (; F < 3; ) {
                        if (x === 0) break t
                        x--, (D += k[I++] << F), (F += 8)
                      }
                      switch (((i.last = 1 & D), (F -= 1), 3 & (D >>>= 1))) {
                        case 0:
                          i.mode = 14
                          break
                        case 1:
                          if ((W(i), (i.mode = 20), A !== 6)) break
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
                        if (x === 0) break t
                        x--, (D += k[I++] << F), (F += 8)
                      }
                      if ((65535 & D) != ((D >>> 16) ^ 65535)) {
                        ;(w.msg = 'invalid stored block lengths'), (i.mode = 30)
                        break
                      }
                      if (
                        ((i.length = 65535 & D),
                        (F = D = 0),
                        (i.mode = 15),
                        A === 6)
                      )
                        break t
                    case 15:
                      i.mode = 16
                    case 16:
                      if ((H = i.length)) {
                        if ((x < H && (H = x), $ < H && (H = $), H === 0))
                          break t
                        f.arraySet(tt, k, I, H, et),
                          (x -= H),
                          (I += H),
                          ($ -= H),
                          (et += H),
                          (i.length -= H)
                        break
                      }
                      i.mode = 12
                      break
                    case 17:
                      for (; F < 14; ) {
                        if (x === 0) break t
                        x--, (D += k[I++] << F), (F += 8)
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
                          if (x === 0) break t
                          x--, (D += k[I++] << F), (F += 8)
                        }
                        ;(i.lens[J[i.have++]] = 7 & D), (D >>>= 3), (F -= 3)
                      }
                      for (; i.have < 19; ) i.lens[J[i.have++]] = 0
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
                          (ct =
                            ((u = i.lencode[D & ((1 << i.lenbits) - 1)]) >>>
                              16) &
                            255),
                            (yt = 65535 & u),
                            !((_t = u >>> 24) <= F);

                        ) {
                          if (x === 0) break t
                          x--, (D += k[I++] << F), (F += 8)
                        }
                        if (yt < 16)
                          (D >>>= _t), (F -= _t), (i.lens[i.have++] = yt)
                        else {
                          if (yt === 16) {
                            for (N = _t + 2; F < N; ) {
                              if (x === 0) break t
                              x--, (D += k[I++] << F), (F += 8)
                            }
                            if (((D >>>= _t), (F -= _t), i.have === 0)) {
                              ;(w.msg = 'invalid bit length repeat'),
                                (i.mode = 30)
                              break
                            }
                            ;(n = i.lens[i.have - 1]),
                              (H = 3 + (3 & D)),
                              (D >>>= 2),
                              (F -= 2)
                          } else if (yt === 17) {
                            for (N = _t + 3; F < N; ) {
                              if (x === 0) break t
                              x--, (D += k[I++] << F), (F += 8)
                            }
                            ;(F -= _t),
                              (n = 0),
                              (H = 3 + (7 & (D >>>= _t))),
                              (D >>>= 3),
                              (F -= 3)
                          } else {
                            for (N = _t + 7; F < N; ) {
                              if (x === 0) break t
                              x--, (D += k[I++] << F), (F += 8)
                            }
                            ;(F -= _t),
                              (n = 0),
                              (H = 11 + (127 & (D >>>= _t))),
                              (D >>>= 7),
                              (F -= 7)
                          }
                          if (i.have + H > i.nlen + i.ndist) {
                            ;(w.msg = 'invalid bit length repeat'),
                              (i.mode = 30)
                            break
                          }
                          for (; H--; ) i.lens[i.have++] = n
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
                      if (((i.mode = 20), A === 6)) break t
                    case 20:
                      i.mode = 21
                    case 21:
                      if (6 <= x && 258 <= $) {
                        ;(w.next_out = et),
                          (w.avail_out = $),
                          (w.next_in = I),
                          (w.avail_in = x),
                          (i.hold = D),
                          (i.bits = F),
                          _(w, at),
                          (et = w.next_out),
                          (tt = w.output),
                          ($ = w.avail_out),
                          (I = w.next_in),
                          (k = w.input),
                          (x = w.avail_in),
                          (D = i.hold),
                          (F = i.bits),
                          i.mode === 12 && (i.back = -1)
                        break
                      }
                      for (
                        i.back = 0;
                        (ct =
                          ((u = i.lencode[D & ((1 << i.lenbits) - 1)]) >>> 16) &
                          255),
                          (yt = 65535 & u),
                          !((_t = u >>> 24) <= F);

                      ) {
                        if (x === 0) break t
                        x--, (D += k[I++] << F), (F += 8)
                      }
                      if (ct && !(240 & ct)) {
                        for (
                          wt = _t, kt = ct, Ot = yt;
                          (ct =
                            ((u =
                              i.lencode[
                                Ot + ((D & ((1 << (wt + kt)) - 1)) >> wt)
                              ]) >>>
                              16) &
                            255),
                            (yt = 65535 & u),
                            !(wt + (_t = u >>> 24) <= F);

                        ) {
                          if (x === 0) break t
                          x--, (D += k[I++] << F), (F += 8)
                        }
                        ;(D >>>= wt), (F -= wt), (i.back += wt)
                      }
                      if (
                        ((D >>>= _t),
                        (F -= _t),
                        (i.back += _t),
                        (i.length = yt),
                        ct === 0)
                      ) {
                        i.mode = 26
                        break
                      }
                      if (32 & ct) {
                        ;(i.back = -1), (i.mode = 12)
                        break
                      }
                      if (64 & ct) {
                        ;(w.msg = 'invalid literal/length code'), (i.mode = 30)
                        break
                      }
                      ;(i.extra = 15 & ct), (i.mode = 22)
                    case 22:
                      if (i.extra) {
                        for (N = i.extra; F < N; ) {
                          if (x === 0) break t
                          x--, (D += k[I++] << F), (F += 8)
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
                        (ct =
                          ((u = i.distcode[D & ((1 << i.distbits) - 1)]) >>>
                            16) &
                          255),
                          (yt = 65535 & u),
                          !((_t = u >>> 24) <= F);

                      ) {
                        if (x === 0) break t
                        x--, (D += k[I++] << F), (F += 8)
                      }
                      if (!(240 & ct)) {
                        for (
                          wt = _t, kt = ct, Ot = yt;
                          (ct =
                            ((u =
                              i.distcode[
                                Ot + ((D & ((1 << (wt + kt)) - 1)) >> wt)
                              ]) >>>
                              16) &
                            255),
                            (yt = 65535 & u),
                            !(wt + (_t = u >>> 24) <= F);

                        ) {
                          if (x === 0) break t
                          x--, (D += k[I++] << F), (F += 8)
                        }
                        ;(D >>>= wt), (F -= wt), (i.back += wt)
                      }
                      if (((D >>>= _t), (F -= _t), (i.back += _t), 64 & ct)) {
                        ;(w.msg = 'invalid distance code'), (i.mode = 30)
                        break
                      }
                      ;(i.offset = yt), (i.extra = 15 & ct), (i.mode = 24)
                    case 24:
                      if (i.extra) {
                        for (N = i.extra; F < N; ) {
                          if (x === 0) break t
                          x--, (D += k[I++] << F), (F += 8)
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
                      if ($ === 0) break t
                      if (((H = at - $), i.offset > H)) {
                        if ((H = i.offset - H) > i.whave && i.sane) {
                          ;(w.msg = 'invalid distance too far back'),
                            (i.mode = 30)
                          break
                        }
                        ;(lt =
                          H > i.wnext
                            ? ((H -= i.wnext), i.wsize - H)
                            : i.wnext - H),
                          H > i.length && (H = i.length),
                          (bt = i.window)
                      } else (bt = tt), (lt = et - i.offset), (H = i.length)
                      for (
                        $ < H && (H = $), $ -= H, i.length -= H;
                        (tt[et++] = bt[lt++]), --H;

                      );
                      i.length === 0 && (i.mode = 21)
                      break
                    case 26:
                      if ($ === 0) break t
                      ;(tt[et++] = i.length), $--, (i.mode = 21)
                      break
                    case 27:
                      if (i.wrap) {
                        for (; F < 32; ) {
                          if (x === 0) break t
                          x--, (D |= k[I++] << F), (F += 8)
                        }
                        if (
                          ((at -= $),
                          (w.total_out += at),
                          (i.total += at),
                          at &&
                            (w.adler = i.check =
                              i.flags
                                ? s(i.check, tt, at, et - at)
                                : h(i.check, tt, at, et - at)),
                          (at = $),
                          (i.flags ? D : d(D)) !== i.check)
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
                          if (x === 0) break t
                          x--, (D += k[I++] << F), (F += 8)
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
                  (w.next_out = et),
                  (w.avail_out = $),
                  (w.next_in = I),
                  (w.avail_in = x),
                  (i.hold = D),
                  (i.bits = F),
                  (i.wsize ||
                    (at !== w.avail_out &&
                      i.mode < 30 &&
                      (i.mode < 27 || A !== 4))) &&
                  dt(w, w.output, w.next_out, at - w.avail_out)
                    ? ((i.mode = 31), -4)
                    : ((ut -= w.avail_in),
                      (at -= w.avail_out),
                      (w.total_in += ut),
                      (w.total_out += at),
                      (i.total += at),
                      i.wrap &&
                        at &&
                        (w.adler = i.check =
                          i.flags
                            ? s(i.check, tt, at, w.next_out - at)
                            : h(i.check, tt, at, w.next_out - at)),
                      (w.data_type =
                        i.bits +
                        (i.last ? 64 : 0) +
                        (i.mode === 12 ? 128 : 0) +
                        (i.mode === 20 || i.mode === 15 ? 256 : 0)),
                      ((ut == 0 && at === 0) || A === 4) && Y === T && (Y = -5),
                      Y)
                )
              }),
              (v.inflateEnd = function (w) {
                if (!w || !w.state) return l
                var A = w.state
                return A.window && (A.window = null), (w.state = null), T
              }),
              (v.inflateGetHeader = function (w, A) {
                var i
                return w && w.state && 2 & (i = w.state).wrap
                  ? (((i.head = A).done = !1), T)
                  : l
              }),
              (v.inflateSetDictionary = function (w, A) {
                var i,
                  k = A.length
                return w && w.state
                  ? (i = w.state).wrap !== 0 && i.mode !== 11
                    ? l
                    : i.mode === 11 && h(1, A, k, 0) !== i.check
                    ? -3
                    : dt(w, A, k, k)
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
          function (m, M, v) {
            var f = m('../utils/common'),
              h = [
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
            M.exports = function (L, b, T, l, g, o, p, d) {
              var E,
                U,
                R,
                O,
                q,
                G,
                V,
                B,
                W,
                dt = d.bits,
                w = 0,
                A = 0,
                i = 0,
                k = 0,
                tt = 0,
                I = 0,
                et = 0,
                x = 0,
                $ = 0,
                D = 0,
                F = null,
                ut = 0,
                at = new f.Buf16(16),
                H = new f.Buf16(16),
                lt = null,
                bt = 0
              for (w = 0; w <= 15; w++) at[w] = 0
              for (A = 0; A < l; A++) at[b[T + A]]++
              for (tt = dt, k = 15; 1 <= k && at[k] === 0; k--);
              if ((k < tt && (tt = k), k === 0))
                return (g[o++] = 20971520), (g[o++] = 20971520), (d.bits = 1), 0
              for (i = 1; i < k && at[i] === 0; i++);
              for (tt < i && (tt = i), w = x = 1; w <= 15; w++)
                if (((x <<= 1), (x -= at[w]) < 0)) return -1
              if (0 < x && (L === 0 || k !== 1)) return -1
              for (H[1] = 0, w = 1; w < 15; w++) H[w + 1] = H[w] + at[w]
              for (A = 0; A < l; A++) b[T + A] !== 0 && (p[H[b[T + A]]++] = A)
              if (
                ((G =
                  L === 0
                    ? ((F = lt = p), 19)
                    : L === 1
                    ? ((F = h), (ut -= 257), (lt = s), (bt -= 257), 256)
                    : ((F = _), (lt = r), -1)),
                (w = i),
                (q = o),
                (et = A = D = 0),
                (R = -1),
                (O = ($ = 1 << (I = tt)) - 1),
                (L === 1 && 852 < $) || (L === 2 && 592 < $))
              )
                return 1
              for (;;) {
                for (
                  V = w - et,
                    W =
                      p[A] < G
                        ? ((B = 0), p[A])
                        : p[A] > G
                        ? ((B = lt[bt + p[A]]), F[ut + p[A]])
                        : ((B = 96), 0),
                    E = 1 << (w - et),
                    i = U = 1 << I;
                  (g[q + (D >> et) + (U -= E)] = (V << 24) | (B << 16) | W | 0),
                    U !== 0;

                );
                for (E = 1 << (w - 1); D & E; ) E >>= 1
                if (
                  (E !== 0 ? ((D &= E - 1), (D += E)) : (D = 0),
                  A++,
                  --at[w] == 0)
                ) {
                  if (w === k) break
                  w = b[T + p[A]]
                }
                if (tt < w && (D & O) !== R) {
                  for (
                    et === 0 && (et = tt), q += i, x = 1 << (I = w - et);
                    I + et < k && !((x -= at[I + et]) <= 0);

                  )
                    I++, (x <<= 1)
                  if (
                    (($ += 1 << I),
                    (L === 1 && 852 < $) || (L === 2 && 592 < $))
                  )
                    return 1
                  g[(R = D & O)] = (tt << 24) | (I << 16) | (q - o) | 0
                }
              }
              return (
                D !== 0 && (g[q + D] = ((w - et) << 24) | (64 << 16) | 0),
                (d.bits = tt),
                0
              )
            }
          },
          { '../utils/common': 41 }
        ],
        51: [
          function (m, M, v) {
            M.exports = {
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
          function (m, M, v) {
            var f = m('../utils/common'),
              h = 0,
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
              d = 16,
              E = 7,
              U = 256,
              R = 16,
              O = 17,
              q = 18,
              G = [
                0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4,
                4, 4, 4, 5, 5, 5, 5, 0
              ],
              V = [
                0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9,
                9, 10, 10, 11, 11, 12, 12, 13, 13
              ],
              B = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
              W = [
                16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15
              ],
              dt = new Array(2 * (T + 2))
            _(dt)
            var w = new Array(2 * l)
            _(w)
            var A = new Array(512)
            _(A)
            var i = new Array(256)
            _(i)
            var k = new Array(L)
            _(k)
            var tt,
              I,
              et,
              x = new Array(l)
            function $(u, S, J, K, z) {
              ;(this.static_tree = u),
                (this.extra_bits = S),
                (this.extra_base = J),
                (this.elems = K),
                (this.max_length = z),
                (this.has_stree = u && u.length)
            }
            function D(u, S) {
              ;(this.dyn_tree = u), (this.max_code = 0), (this.stat_desc = S)
            }
            function F(u) {
              return u < 256 ? A[u] : A[256 + (u >>> 7)]
            }
            function ut(u, S) {
              ;(u.pending_buf[u.pending++] = 255 & S),
                (u.pending_buf[u.pending++] = (S >>> 8) & 255)
            }
            function at(u, S, J) {
              u.bi_valid > d - J
                ? ((u.bi_buf |= (S << u.bi_valid) & 65535),
                  ut(u, u.bi_buf),
                  (u.bi_buf = S >> (d - u.bi_valid)),
                  (u.bi_valid += J - d))
                : ((u.bi_buf |= (S << u.bi_valid) & 65535), (u.bi_valid += J))
            }
            function H(u, S, J) {
              at(u, J[2 * S], J[2 * S + 1])
            }
            function lt(u, S) {
              for (var J = 0; (J |= 1 & u), (u >>>= 1), (J <<= 1), 0 < --S; );
              return J >>> 1
            }
            function bt(u, S, J) {
              var K,
                z,
                rt = new Array(p + 1),
                st = 0
              for (K = 1; K <= p; K++) rt[K] = st = (st + J[K - 1]) << 1
              for (z = 0; z <= S; z++) {
                var it = u[2 * z + 1]
                it !== 0 && (u[2 * z] = lt(rt[it]++, it))
              }
            }
            function _t(u) {
              var S
              for (S = 0; S < T; S++) u.dyn_ltree[2 * S] = 0
              for (S = 0; S < l; S++) u.dyn_dtree[2 * S] = 0
              for (S = 0; S < g; S++) u.bl_tree[2 * S] = 0
              ;(u.dyn_ltree[2 * U] = 1),
                (u.opt_len = u.static_len = 0),
                (u.last_lit = u.matches = 0)
            }
            function ct(u) {
              8 < u.bi_valid
                ? ut(u, u.bi_buf)
                : 0 < u.bi_valid && (u.pending_buf[u.pending++] = u.bi_buf),
                (u.bi_buf = 0),
                (u.bi_valid = 0)
            }
            function yt(u, S, J, K) {
              var z = 2 * S,
                rt = 2 * J
              return u[z] < u[rt] || (u[z] === u[rt] && K[S] <= K[J])
            }
            function wt(u, S, J) {
              for (
                var K = u.heap[J], z = J << 1;
                z <= u.heap_len &&
                (z < u.heap_len &&
                  yt(S, u.heap[z + 1], u.heap[z], u.depth) &&
                  z++,
                !yt(S, K, u.heap[z], u.depth));

              )
                (u.heap[J] = u.heap[z]), (J = z), (z <<= 1)
              u.heap[J] = K
            }
            function kt(u, S, J) {
              var K,
                z,
                rt,
                st,
                it = 0
              if (u.last_lit !== 0)
                for (
                  ;
                  (K =
                    (u.pending_buf[u.d_buf + 2 * it] << 8) |
                    u.pending_buf[u.d_buf + 2 * it + 1]),
                    (z = u.pending_buf[u.l_buf + it]),
                    it++,
                    K === 0
                      ? H(u, z, S)
                      : (H(u, (rt = i[z]) + b + 1, S),
                        (st = G[rt]) !== 0 && at(u, (z -= k[rt]), st),
                        H(u, (rt = F(--K)), J),
                        (st = V[rt]) !== 0 && at(u, (K -= x[rt]), st)),
                    it < u.last_lit;

                );
              H(u, U, S)
            }
            function Ot(u, S) {
              var J,
                K,
                z,
                rt = S.dyn_tree,
                st = S.stat_desc.static_tree,
                it = S.stat_desc.has_stree,
                ht = S.stat_desc.elems,
                St = -1
              for (u.heap_len = 0, u.heap_max = o, J = 0; J < ht; J++)
                rt[2 * J] !== 0
                  ? ((u.heap[++u.heap_len] = St = J), (u.depth[J] = 0))
                  : (rt[2 * J + 1] = 0)
              for (; u.heap_len < 2; )
                (rt[2 * (z = u.heap[++u.heap_len] = St < 2 ? ++St : 0)] = 1),
                  (u.depth[z] = 0),
                  u.opt_len--,
                  it && (u.static_len -= st[2 * z + 1])
              for (S.max_code = St, J = u.heap_len >> 1; 1 <= J; J--)
                wt(u, rt, J)
              for (
                z = ht;
                (J = u.heap[1]),
                  (u.heap[1] = u.heap[u.heap_len--]),
                  wt(u, rt, 1),
                  (K = u.heap[1]),
                  (u.heap[--u.heap_max] = J),
                  (u.heap[--u.heap_max] = K),
                  (rt[2 * z] = rt[2 * J] + rt[2 * K]),
                  (u.depth[z] =
                    (u.depth[J] >= u.depth[K] ? u.depth[J] : u.depth[K]) + 1),
                  (rt[2 * J + 1] = rt[2 * K + 1] = z),
                  (u.heap[1] = z++),
                  wt(u, rt, 1),
                  2 <= u.heap_len;

              );
              ;(u.heap[--u.heap_max] = u.heap[1]),
                (function (gt, Dt) {
                  var Wt,
                    xt,
                    Kt,
                    At,
                    te,
                    pt,
                    Rt = Dt.dyn_tree,
                    ne = Dt.max_code,
                    jt = Dt.stat_desc.static_tree,
                    Ie = Dt.stat_desc.has_stree,
                    Gt = Dt.stat_desc.extra_bits,
                    ie = Dt.stat_desc.extra_base,
                    X = Dt.stat_desc.max_length,
                    Xt = 0
                  for (At = 0; At <= p; At++) gt.bl_count[At] = 0
                  for (
                    Rt[2 * gt.heap[gt.heap_max] + 1] = 0, Wt = gt.heap_max + 1;
                    Wt < o;
                    Wt++
                  )
                    X < (At = Rt[2 * Rt[2 * (xt = gt.heap[Wt]) + 1] + 1] + 1) &&
                      ((At = X), Xt++),
                      (Rt[2 * xt + 1] = At),
                      ne < xt ||
                        (gt.bl_count[At]++,
                        (te = 0),
                        ie <= xt && (te = Gt[xt - ie]),
                        (pt = Rt[2 * xt]),
                        (gt.opt_len += pt * (At + te)),
                        Ie && (gt.static_len += pt * (jt[2 * xt + 1] + te)))
                  if (Xt !== 0) {
                    do {
                      for (At = X - 1; gt.bl_count[At] === 0; ) At--
                      gt.bl_count[At]--,
                        (gt.bl_count[At + 1] += 2),
                        gt.bl_count[X]--,
                        (Xt -= 2)
                    } while (0 < Xt)
                    for (At = X; At !== 0; At--)
                      for (xt = gt.bl_count[At]; xt !== 0; )
                        ne < (Kt = gt.heap[--Wt]) ||
                          (Rt[2 * Kt + 1] !== At &&
                            ((gt.opt_len += (At - Rt[2 * Kt + 1]) * Rt[2 * Kt]),
                            (Rt[2 * Kt + 1] = At)),
                          xt--)
                  }
                })(u, S),
                bt(rt, St, u.bl_count)
            }
            function n(u, S, J) {
              var K,
                z,
                rt = -1,
                st = S[1],
                it = 0,
                ht = 7,
                St = 4
              for (
                st === 0 && ((ht = 138), (St = 3)),
                  S[2 * (J + 1) + 1] = 65535,
                  K = 0;
                K <= J;
                K++
              )
                (z = st),
                  (st = S[2 * (K + 1) + 1]),
                  (++it < ht && z === st) ||
                    (it < St
                      ? (u.bl_tree[2 * z] += it)
                      : z !== 0
                      ? (z !== rt && u.bl_tree[2 * z]++, u.bl_tree[2 * R]++)
                      : it <= 10
                      ? u.bl_tree[2 * O]++
                      : u.bl_tree[2 * q]++,
                    (rt = z),
                    (St =
                      (it = 0) === st
                        ? ((ht = 138), 3)
                        : z === st
                        ? ((ht = 6), 3)
                        : ((ht = 7), 4)))
            }
            function Y(u, S, J) {
              var K,
                z,
                rt = -1,
                st = S[1],
                it = 0,
                ht = 7,
                St = 4
              for (st === 0 && ((ht = 138), (St = 3)), K = 0; K <= J; K++)
                if (
                  ((z = st),
                  (st = S[2 * (K + 1) + 1]),
                  !(++it < ht && z === st))
                ) {
                  if (it < St) for (; H(u, z, u.bl_tree), --it != 0; );
                  else
                    z !== 0
                      ? (z !== rt && (H(u, z, u.bl_tree), it--),
                        H(u, R, u.bl_tree),
                        at(u, it - 3, 2))
                      : it <= 10
                      ? (H(u, O, u.bl_tree), at(u, it - 3, 3))
                      : (H(u, q, u.bl_tree), at(u, it - 11, 7))
                  ;(rt = z),
                    (St =
                      (it = 0) === st
                        ? ((ht = 138), 3)
                        : z === st
                        ? ((ht = 6), 3)
                        : ((ht = 7), 4))
                }
            }
            _(x)
            var j = !1
            function N(u, S, J, K) {
              at(u, (r << 1) + (K ? 1 : 0), 3),
                (function (z, rt, st, it) {
                  ct(z),
                    it && (ut(z, st), ut(z, ~st)),
                    f.arraySet(z.pending_buf, z.window, rt, st, z.pending),
                    (z.pending += st)
                })(u, S, J, !0)
            }
            ;(v._tr_init = function (u) {
              j ||
                ((function () {
                  var S,
                    J,
                    K,
                    z,
                    rt,
                    st = new Array(p + 1)
                  for (z = K = 0; z < L - 1; z++)
                    for (k[z] = K, S = 0; S < 1 << G[z]; S++) i[K++] = z
                  for (i[K - 1] = z, z = rt = 0; z < 16; z++)
                    for (x[z] = rt, S = 0; S < 1 << V[z]; S++) A[rt++] = z
                  for (rt >>= 7; z < l; z++)
                    for (x[z] = rt << 7, S = 0; S < 1 << (V[z] - 7); S++)
                      A[256 + rt++] = z
                  for (J = 0; J <= p; J++) st[J] = 0
                  for (S = 0; S <= 143; ) (dt[2 * S + 1] = 8), S++, st[8]++
                  for (; S <= 255; ) (dt[2 * S + 1] = 9), S++, st[9]++
                  for (; S <= 279; ) (dt[2 * S + 1] = 7), S++, st[7]++
                  for (; S <= 287; ) (dt[2 * S + 1] = 8), S++, st[8]++
                  for (bt(dt, T + 1, st), S = 0; S < l; S++)
                    (w[2 * S + 1] = 5), (w[2 * S] = lt(S, 5))
                  ;(tt = new $(dt, G, b + 1, T, p)),
                    (I = new $(w, V, 0, l, p)),
                    (et = new $(new Array(0), B, 0, g, E))
                })(),
                (j = !0)),
                (u.l_desc = new D(u.dyn_ltree, tt)),
                (u.d_desc = new D(u.dyn_dtree, I)),
                (u.bl_desc = new D(u.bl_tree, et)),
                (u.bi_buf = 0),
                (u.bi_valid = 0),
                _t(u)
            }),
              (v._tr_stored_block = N),
              (v._tr_flush_block = function (u, S, J, K) {
                var z,
                  rt,
                  st = 0
                0 < u.level
                  ? (u.strm.data_type === 2 &&
                      (u.strm.data_type = (function (it) {
                        var ht,
                          St = 4093624447
                        for (ht = 0; ht <= 31; ht++, St >>>= 1)
                          if (1 & St && it.dyn_ltree[2 * ht] !== 0) return h
                        if (
                          it.dyn_ltree[18] !== 0 ||
                          it.dyn_ltree[20] !== 0 ||
                          it.dyn_ltree[26] !== 0
                        )
                          return s
                        for (ht = 32; ht < b; ht++)
                          if (it.dyn_ltree[2 * ht] !== 0) return s
                        return h
                      })(u)),
                    Ot(u, u.l_desc),
                    Ot(u, u.d_desc),
                    (st = (function (it) {
                      var ht
                      for (
                        n(it, it.dyn_ltree, it.l_desc.max_code),
                          n(it, it.dyn_dtree, it.d_desc.max_code),
                          Ot(it, it.bl_desc),
                          ht = g - 1;
                        3 <= ht && it.bl_tree[2 * W[ht] + 1] === 0;
                        ht--
                      );
                      return (it.opt_len += 3 * (ht + 1) + 5 + 5 + 4), ht
                    })(u)),
                    (z = (u.opt_len + 3 + 7) >>> 3),
                    (rt = (u.static_len + 3 + 7) >>> 3) <= z && (z = rt))
                  : (z = rt = J + 5),
                  J + 4 <= z && S !== -1
                    ? N(u, S, J, K)
                    : u.strategy === 4 || rt === z
                    ? (at(u, 2 + (K ? 1 : 0), 3), kt(u, dt, w))
                    : (at(u, 4 + (K ? 1 : 0), 3),
                      (function (it, ht, St, gt) {
                        var Dt
                        for (
                          at(it, ht - 257, 5),
                            at(it, St - 1, 5),
                            at(it, gt - 4, 4),
                            Dt = 0;
                          Dt < gt;
                          Dt++
                        )
                          at(it, it.bl_tree[2 * W[Dt] + 1], 3)
                        Y(it, it.dyn_ltree, ht - 1), Y(it, it.dyn_dtree, St - 1)
                      })(
                        u,
                        u.l_desc.max_code + 1,
                        u.d_desc.max_code + 1,
                        st + 1
                      ),
                      kt(u, u.dyn_ltree, u.dyn_dtree)),
                  _t(u),
                  K && ct(u)
              }),
              (v._tr_tally = function (u, S, J) {
                return (
                  (u.pending_buf[u.d_buf + 2 * u.last_lit] = (S >>> 8) & 255),
                  (u.pending_buf[u.d_buf + 2 * u.last_lit + 1] = 255 & S),
                  (u.pending_buf[u.l_buf + u.last_lit] = 255 & J),
                  u.last_lit++,
                  S === 0
                    ? u.dyn_ltree[2 * J]++
                    : (u.matches++,
                      S--,
                      u.dyn_ltree[2 * (i[J] + b + 1)]++,
                      u.dyn_dtree[2 * F(S)]++),
                  u.last_lit === u.lit_bufsize - 1
                )
              }),
              (v._tr_align = function (u) {
                at(u, 2, 3),
                  H(u, U, dt),
                  (function (S) {
                    S.bi_valid === 16
                      ? (ut(S, S.bi_buf), (S.bi_buf = 0), (S.bi_valid = 0))
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
          function (m, M, v) {
            M.exports = function () {
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
          function (m, M, v) {
            ;(function (f) {
              ;(function (h, s) {
                if (!h.setImmediate) {
                  var _,
                    r,
                    L,
                    b,
                    T = 1,
                    l = {},
                    g = !1,
                    o = h.document,
                    p = Object.getPrototypeOf && Object.getPrototypeOf(h)
                  ;(p = p && p.setTimeout ? p : h),
                    (_ =
                      {}.toString.call(h.process) === '[object process]'
                        ? function (R) {
                            process.nextTick(function () {
                              E(R)
                            })
                          }
                        : (function () {
                            if (h.postMessage && !h.importScripts) {
                              var R = !0,
                                O = h.onmessage
                              return (
                                (h.onmessage = function () {
                                  R = !1
                                }),
                                h.postMessage('', '*'),
                                (h.onmessage = O),
                                R
                              )
                            }
                          })()
                        ? ((b = 'setImmediate$' + Math.random() + '$'),
                          h.addEventListener
                            ? h.addEventListener('message', U, !1)
                            : h.attachEvent('onmessage', U),
                          function (R) {
                            h.postMessage(b + R, '*')
                          })
                        : h.MessageChannel
                        ? (((L = new MessageChannel()).port1.onmessage =
                            function (R) {
                              E(R.data)
                            }),
                          function (R) {
                            L.port2.postMessage(R)
                          })
                        : o && 'onreadystatechange' in o.createElement('script')
                        ? ((r = o.documentElement),
                          function (R) {
                            var O = o.createElement('script')
                            ;(O.onreadystatechange = function () {
                              E(R),
                                (O.onreadystatechange = null),
                                r.removeChild(O),
                                (O = null)
                            }),
                              r.appendChild(O)
                          })
                        : function (R) {
                            setTimeout(E, 0, R)
                          }),
                    (p.setImmediate = function (R) {
                      typeof R != 'function' && (R = new Function('' + R))
                      for (
                        var O = new Array(arguments.length - 1), q = 0;
                        q < O.length;
                        q++
                      )
                        O[q] = arguments[q + 1]
                      var G = { callback: R, args: O }
                      return (l[T] = G), _(T), T++
                    }),
                    (p.clearImmediate = d)
                }
                function d(R) {
                  delete l[R]
                }
                function E(R) {
                  if (g) setTimeout(E, 0, R)
                  else {
                    var O = l[R]
                    if (O) {
                      g = !0
                      try {
                        ;(function (q) {
                          var G = q.callback,
                            V = q.args
                          switch (V.length) {
                            case 0:
                              G()
                              break
                            case 1:
                              G(V[0])
                              break
                            case 2:
                              G(V[0], V[1])
                              break
                            case 3:
                              G(V[0], V[1], V[2])
                              break
                            default:
                              G.apply(s, V)
                          }
                        })(O)
                      } finally {
                        d(R), (g = !1)
                      }
                    }
                  }
                }
                function U(R) {
                  R.source === h &&
                    typeof R.data == 'string' &&
                    R.data.indexOf(b) === 0 &&
                    E(+R.data.slice(b.length))
                }
              })(typeof self > 'u' ? (f === void 0 ? this : f) : self)
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
})(En)
const bn = Ye,
  yn = new bn()
class wn {
  static async init(ot) {
    const m = await fetch(ot).then((M) => M.blob())
    return await yn.loadAsync(m)
  }
}
const Ar = {
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
function Ae(nt) {
  return new Promise((ot, m) => {
    ;(nt.oncomplete = nt.onsuccess = () => ot(nt.result)),
      (nt.onabort = nt.onerror = () => m(nt.error))
  })
}
function vn(nt, ot) {
  const m = indexedDB.open(nt)
  m.onupgradeneeded = () => m.result.createObjectStore(ot)
  const M = Ae(m)
  return (v, f) => M.then((h) => f(h.transaction(ot, v).objectStore(ot)))
}
let $e
function Ke() {
  return $e || ($e = vn('keyval-store', 'keyval')), $e
}
function Ir(nt, ot = Ke()) {
  return ot('readonly', (m) => Ae(m.get(nt)))
}
function Dr(nt, ot, m = Ke()) {
  return m('readwrite', (M) => (M.put(ot, nt), Ae(M.transaction)))
}
function Ln(nt, ot = Ke()) {
  return ot('readwrite', (m) => (m.delete(nt), Ae(m.transaction)))
}
var Ze = {},
  Tn = {
    get exports() {
      return Ze
    },
    set exports(nt) {
      Ze = nt
    }
  }
;(function (nt, ot) {
  ;(function (m, M) {
    nt.exports = M()
  })(he, function () {
    var m = 1e3,
      M = 6e4,
      v = 36e5,
      f = 'millisecond',
      h = 'second',
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
      d =
        /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
      E = {
        name: 'en',
        weekdays:
          'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        months:
          'January_February_March_April_May_June_July_August_September_October_November_December'.split(
            '_'
          ),
        ordinal: function (A) {
          var i = ['th', 'st', 'nd', 'rd'],
            k = A % 100
          return '[' + A + (i[(k - 20) % 10] || i[k] || i[0]) + ']'
        }
      },
      U = function (A, i, k) {
        var tt = String(A)
        return !tt || tt.length >= i
          ? A
          : '' + Array(i + 1 - tt.length).join(k) + A
      },
      R = {
        s: U,
        z: function (A) {
          var i = -A.utcOffset(),
            k = Math.abs(i),
            tt = Math.floor(k / 60),
            I = k % 60
          return (i <= 0 ? '+' : '-') + U(tt, 2, '0') + ':' + U(I, 2, '0')
        },
        m: function A(i, k) {
          if (i.date() < k.date()) return -A(k, i)
          var tt = 12 * (k.year() - i.year()) + (k.month() - i.month()),
            I = i.clone().add(tt, b),
            et = k - I < 0,
            x = i.clone().add(tt + (et ? -1 : 1), b)
          return +(-(tt + (k - I) / (et ? I - x : x - I)) || 0)
        },
        a: function (A) {
          return A < 0 ? Math.ceil(A) || 0 : Math.floor(A)
        },
        p: function (A) {
          return (
            { M: b, y: l, w: L, d: r, D: g, h: _, m: s, s: h, ms: f, Q: T }[
              A
            ] ||
            String(A || '')
              .toLowerCase()
              .replace(/s$/, '')
          )
        },
        u: function (A) {
          return A === void 0
        }
      },
      O = 'en',
      q = {}
    q[O] = E
    var G = function (A) {
        return A instanceof dt
      },
      V = function A(i, k, tt) {
        var I
        if (!i) return O
        if (typeof i == 'string') {
          var et = i.toLowerCase()
          q[et] && (I = et), k && ((q[et] = k), (I = et))
          var x = i.split('-')
          if (!I && x.length > 1) return A(x[0])
        } else {
          var $ = i.name
          ;(q[$] = i), (I = $)
        }
        return !tt && I && (O = I), I || (!tt && O)
      },
      B = function (A, i) {
        if (G(A)) return A.clone()
        var k = typeof i == 'object' ? i : {}
        return (k.date = A), (k.args = arguments), new dt(k)
      },
      W = R
    ;(W.l = V),
      (W.i = G),
      (W.w = function (A, i) {
        return B(A, { locale: i.$L, utc: i.$u, x: i.$x, $offset: i.$offset })
      })
    var dt = (function () {
        function A(k) {
          ;(this.$L = V(k.locale, null, !0)), this.parse(k)
        }
        var i = A.prototype
        return (
          (i.parse = function (k) {
            ;(this.$d = (function (tt) {
              var I = tt.date,
                et = tt.utc
              if (I === null) return new Date(NaN)
              if (W.u(I)) return new Date()
              if (I instanceof Date) return new Date(I)
              if (typeof I == 'string' && !/Z$/i.test(I)) {
                var x = I.match(p)
                if (x) {
                  var $ = x[2] - 1 || 0,
                    D = (x[7] || '0').substring(0, 3)
                  return et
                    ? new Date(
                        Date.UTC(
                          x[1],
                          $,
                          x[3] || 1,
                          x[4] || 0,
                          x[5] || 0,
                          x[6] || 0,
                          D
                        )
                      )
                    : new Date(
                        x[1],
                        $,
                        x[3] || 1,
                        x[4] || 0,
                        x[5] || 0,
                        x[6] || 0,
                        D
                      )
                }
              }
              return new Date(I)
            })(k)),
              (this.$x = k.x || {}),
              this.init()
          }),
          (i.init = function () {
            var k = this.$d
            ;(this.$y = k.getFullYear()),
              (this.$M = k.getMonth()),
              (this.$D = k.getDate()),
              (this.$W = k.getDay()),
              (this.$H = k.getHours()),
              (this.$m = k.getMinutes()),
              (this.$s = k.getSeconds()),
              (this.$ms = k.getMilliseconds())
          }),
          (i.$utils = function () {
            return W
          }),
          (i.isValid = function () {
            return this.$d.toString() !== o
          }),
          (i.isSame = function (k, tt) {
            var I = B(k)
            return this.startOf(tt) <= I && I <= this.endOf(tt)
          }),
          (i.isAfter = function (k, tt) {
            return B(k) < this.startOf(tt)
          }),
          (i.isBefore = function (k, tt) {
            return this.endOf(tt) < B(k)
          }),
          (i.$g = function (k, tt, I) {
            return W.u(k) ? this[tt] : this.set(I, k)
          }),
          (i.unix = function () {
            return Math.floor(this.valueOf() / 1e3)
          }),
          (i.valueOf = function () {
            return this.$d.getTime()
          }),
          (i.startOf = function (k, tt) {
            var I = this,
              et = !!W.u(tt) || tt,
              x = W.p(k),
              $ = function (_t, ct) {
                var yt = W.w(
                  I.$u ? Date.UTC(I.$y, ct, _t) : new Date(I.$y, ct, _t),
                  I
                )
                return et ? yt : yt.endOf(r)
              },
              D = function (_t, ct) {
                return W.w(
                  I.toDate()[_t].apply(
                    I.toDate('s'),
                    (et ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(ct)
                  ),
                  I
                )
              },
              F = this.$W,
              ut = this.$M,
              at = this.$D,
              H = 'set' + (this.$u ? 'UTC' : '')
            switch (x) {
              case l:
                return et ? $(1, 0) : $(31, 11)
              case b:
                return et ? $(1, ut) : $(0, ut + 1)
              case L:
                var lt = this.$locale().weekStart || 0,
                  bt = (F < lt ? F + 7 : F) - lt
                return $(et ? at - bt : at + (6 - bt), ut)
              case r:
              case g:
                return D(H + 'Hours', 0)
              case _:
                return D(H + 'Minutes', 1)
              case s:
                return D(H + 'Seconds', 2)
              case h:
                return D(H + 'Milliseconds', 3)
              default:
                return this.clone()
            }
          }),
          (i.endOf = function (k) {
            return this.startOf(k, !1)
          }),
          (i.$set = function (k, tt) {
            var I,
              et = W.p(k),
              x = 'set' + (this.$u ? 'UTC' : ''),
              $ = ((I = {}),
              (I[r] = x + 'Date'),
              (I[g] = x + 'Date'),
              (I[b] = x + 'Month'),
              (I[l] = x + 'FullYear'),
              (I[_] = x + 'Hours'),
              (I[s] = x + 'Minutes'),
              (I[h] = x + 'Seconds'),
              (I[f] = x + 'Milliseconds'),
              I)[et],
              D = et === r ? this.$D + (tt - this.$W) : tt
            if (et === b || et === l) {
              var F = this.clone().set(g, 1)
              F.$d[$](D),
                F.init(),
                (this.$d = F.set(g, Math.min(this.$D, F.daysInMonth())).$d)
            } else $ && this.$d[$](D)
            return this.init(), this
          }),
          (i.set = function (k, tt) {
            return this.clone().$set(k, tt)
          }),
          (i.get = function (k) {
            return this[W.p(k)]()
          }),
          (i.add = function (k, tt) {
            var I,
              et = this
            k = Number(k)
            var x = W.p(tt),
              $ = function (ut) {
                var at = B(et)
                return W.w(at.date(at.date() + Math.round(ut * k)), et)
              }
            if (x === b) return this.set(b, this.$M + k)
            if (x === l) return this.set(l, this.$y + k)
            if (x === r) return $(1)
            if (x === L) return $(7)
            var D = ((I = {}), (I[s] = M), (I[_] = v), (I[h] = m), I)[x] || 1,
              F = this.$d.getTime() + k * D
            return W.w(F, this)
          }),
          (i.subtract = function (k, tt) {
            return this.add(-1 * k, tt)
          }),
          (i.format = function (k) {
            var tt = this,
              I = this.$locale()
            if (!this.isValid()) return I.invalidDate || o
            var et = k || 'YYYY-MM-DDTHH:mm:ssZ',
              x = W.z(this),
              $ = this.$H,
              D = this.$m,
              F = this.$M,
              ut = I.weekdays,
              at = I.months,
              H = function (ct, yt, wt, kt) {
                return (ct && (ct[yt] || ct(tt, et))) || wt[yt].slice(0, kt)
              },
              lt = function (ct) {
                return W.s($ % 12 || 12, ct, '0')
              },
              bt =
                I.meridiem ||
                function (ct, yt, wt) {
                  var kt = ct < 12 ? 'AM' : 'PM'
                  return wt ? kt.toLowerCase() : kt
                },
              _t = {
                YY: String(this.$y).slice(-2),
                YYYY: this.$y,
                M: F + 1,
                MM: W.s(F + 1, 2, '0'),
                MMM: H(I.monthsShort, F, at, 3),
                MMMM: H(at, F),
                D: this.$D,
                DD: W.s(this.$D, 2, '0'),
                d: String(this.$W),
                dd: H(I.weekdaysMin, this.$W, ut, 2),
                ddd: H(I.weekdaysShort, this.$W, ut, 3),
                dddd: ut[this.$W],
                H: String($),
                HH: W.s($, 2, '0'),
                h: lt(1),
                hh: lt(2),
                a: bt($, D, !0),
                A: bt($, D, !1),
                m: String(D),
                mm: W.s(D, 2, '0'),
                s: String(this.$s),
                ss: W.s(this.$s, 2, '0'),
                SSS: W.s(this.$ms, 3, '0'),
                Z: x
              }
            return et.replace(d, function (ct, yt) {
              return yt || _t[ct] || x.replace(':', '')
            })
          }),
          (i.utcOffset = function () {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
          }),
          (i.diff = function (k, tt, I) {
            var et,
              x = W.p(tt),
              $ = B(k),
              D = ($.utcOffset() - this.utcOffset()) * M,
              F = this - $,
              ut = W.m(this, $)
            return (
              (ut =
                ((et = {}),
                (et[l] = ut / 12),
                (et[b] = ut),
                (et[T] = ut / 3),
                (et[L] = (F - D) / 6048e5),
                (et[r] = (F - D) / 864e5),
                (et[_] = F / v),
                (et[s] = F / M),
                (et[h] = F / m),
                et)[x] || F),
              I ? ut : W.a(ut)
            )
          }),
          (i.daysInMonth = function () {
            return this.endOf(b).$D
          }),
          (i.$locale = function () {
            return q[this.$L]
          }),
          (i.locale = function (k, tt) {
            if (!k) return this.$L
            var I = this.clone(),
              et = V(k, tt, !0)
            return et && (I.$L = et), I
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
          A
        )
      })(),
      w = dt.prototype
    return (
      (B.prototype = w),
      [
        ['$ms', f],
        ['$s', h],
        ['$m', s],
        ['$H', _],
        ['$W', r],
        ['$M', b],
        ['$y', l],
        ['$D', g]
      ].forEach(function (A) {
        w[A[1]] = function (i) {
          return this.$g(i, A[0], A[1])
        }
      }),
      (B.extend = function (A, i) {
        return A.$i || (A(i, dt, B), (A.$i = !0)), B
      }),
      (B.locale = V),
      (B.isDayjs = G),
      (B.unix = function (A) {
        return B(1e3 * A)
      }),
      (B.en = q[O]),
      (B.Ls = q),
      (B.p = {}),
      B
    )
  })
})(Tn)
const Sn = ['widget', 'remind_at', 'tags', 'files'],
  Un = ['is_follow', 'schedule_hide'],
  kn = (nt) => `SELECT taker_id, is_admin, finish_time
   FROM task_dispatch
   WHERE ref_task_id = ${nt} AND is_valid = 1
   AND identity NOT IN (10804, 10811)
   AND operate_state = 0`,
  An = (
    nt
  ) => `SELECT t.id, COUNT(*) AS task_tree_total, COUNT(CASE WHEN complete_at > 0 THEN t.id END) AS task_tree_complete_total
  FROM task t
  JOIN task_config tc
  ON t.id = tc.id
  WHERE t.state = 10201
  AND t.matter_type IN (10701, 10702, 10705)
  AND INSTR(tc.parent_id, ${nt})`,
  In = ({
    limit: nt,
    where: ot,
    order: m,
    user_id: M,
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
tag_str,  application_id,
IFNULL(application_name, '') AS application_name,
case WHEN start_time = 0 AND end_time = 0 AND repeat_type = 0 AND flow_step_id = 0 THEN 1 ELSE 0 END as is_no_work,
z.user_id, step_user_count, date, timestamp, application_id, admins, takers,
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
        CASE WHEN JSON_VALID(c.application_json) == 1 THEN c.application_json ->> '$.name' ELSE '' END AS application_name,
        IFNULL(d.repeat_id, '') AS repeat_id, 
        IFNULL(d.cycle, 0) AS cycle,
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
             ELSE '' END AS date, parent_id, CASE WHEN b1.id > 0 THEN b1.title ELSE '' END AS parent_name
   FROM (SELECT ref_task_id, dispatch_id, identity, taker_id, state, personal_state, operate_state, delete_at,
                finish_time
           FROM task_dispatch
          WHERE taker_id = ${M}
            AND is_valid = 1
            AND personal_state IN (0, 10409, 10604, 10611)
            AND operate_state = 0) AS a,
        task AS b
            LEFT JOIN task_config AS c
            ON b.id = c.id
            LEFT JOIN task_repeat AS d
            ON c.id = d.task_id AND b.repeat_type > 0 AND ${v}
            LEFT JOIN task_repeat_finish AS e
            ON d.repeat_id = e.repeat_id AND e.user_id = ${M}
            LEFT JOIN task b1
            ON c.category IN (0, 2) AND SUBSTR(c.parent_id, 0, INSTR(c.parent_id, ',')) = b1.id
  WHERE a.ref_task_id = b.id
    AND b.state = 10201
    AND b.matter_type IN (10701, 10702, 10705)) AS a

    LEFT JOIN (SELECT GROUP_CONCAT(taker_id) AS takers, ref_task_id
                                FROM task_dispatch
                               WHERE is_valid = 1
                                 AND personal_state IN (0, 10409, 10604, 10611)
                                 AND operate_state = 0
                               GROUP BY ref_task_id) aa ON a.id = aa.ref_task_id

    LEFT JOIN (SELECT GROUP_CONCAT(taker_id) AS admins, ref_task_id
                                FROM task_dispatch
                               WHERE is_valid = 1
                                 AND is_admin = 1
                                 AND personal_state IN (0, 10409, 10604, 10611)
                                 AND operate_state = 0
                               GROUP BY ref_task_id) ab ON a.id = ab.ref_task_id

    LEFT JOIN (SELECT object_id AS task_id, GROUP_CONCAT(tag_id) AS tag_str,
            '[' || GROUP_CONCAT('{"tag_id":"' || CAST(tag_id AS text) || '","name":"' || name || '","color":"' || color || '"}') || ']' AS tags
                 FROM tag ft
                          JOIN tag_bind ftb
                          ON ft.id = ftb.tag_id
                WHERE ftb.user_id = ${M}
                  AND ftb.state = 1
                GROUP BY object_id) ff2
    ON a.id = ff2.task_id
    LEFT JOIN task_conclusion AS f
    ON a.id = f.task_id AND f.delete_at = 0
    LEFT JOIN message_action AS g
    ON a.id = g.ref_id AND g.user_id = ${M} AND g.delete_at = 0
    LEFT JOIN message AS h
    ON a.id = h.ref_id AND h.id = g.last_message_id
    LEFT JOIN comment AS i
    ON h.comment_id = i.id
    LEFT JOIN task_follow AS j
    ON j.user_id = ${M} AND j.task_id = a.id
    LEFT JOIN (SELECT c.id, IFNULL(fp.project_name, '') AS project_name,
                      IFNULL(fp.creator_id, '') AS project_creator_id,
                      IFNULL(fwb.workspace_id, 0) AS workspace_id, IFNULL(fw.name, '') AS workspace_name,
                      IFNULL(fw.ws_type, 0) AS ws_type,
                      CASE WHEN fwm.member_type = 2 THEN 1 ELSE 0 END AS is_external_member
               FROM task_config c
                    LEFT JOIN project AS fp
                    ON c.project_id = fp.id
                    LEFT JOIN workspace_bind fwb
                    ON c.project_id = fwb.project_id
                    LEFT JOIN workspace AS fw
                    ON fwb.workspace_id = fw.id
                    LEFT JOIN workspace_member AS fwm
                    ON fw.id = fwm.workspace_id AND fwm.user_id = ${M} AND
                    fwm.state = 10902) w
    ON a.id = w.id
    LEFT JOIN task_relation AS k
    ON a.id = k.task_id AND k.user_id = ${M}
    LEFT JOIN (SELECT tc.id, IFNULL(tfs.name, '') AS flow_step_name,
                      IFNULL(tfsr.complete_at, 0) AS flow_step_complete_at, IFNULL(tfsr.user_id, '') AS user_id,
                      CASE WHEN r.id > 0 THEN COUNT(*) ELSE 0 END AS step_user_count
                 FROM task_config AS tc
                      LEFT JOIN task_flow_step tfs
                      ON tfs.id = tc.flow_step_id
                      LEFT JOIN task_flow_step_relation AS tfsr
                      ON tfsr.step_id = tfs.id AND tfsr.delete_at = 0 AND tfsr.user_id = ${M}
                      LEFT JOIN task_flow_step_relation AS r
                      ON r.step_id = tfs.id AND r.delete_at = 0
                GROUP BY tc.id, tfs.id) z
    ON a.id = z.id)
${ot || ''} 
${m}
${nt} `,
  He = (nt, ot) => {
    const m = nt.includes('-1'),
      M = m ? `${ot} = 0` : `${ot} != 0`,
      v = nt.filter((_) => _ !== '-1'),
      f = !!v.length
    let h = ''
    m && f ? (h = 'OR') : f && !m && (h = 'AND')
    const s = v.length ? `${ot} IN (${v.join(',')})` : ''
    return `(${M} ${h} ${s})`
  },
  Dn = (nt) => {
    const {
        user_id: ot,
        direction: m,
        page_number: M,
        timestamp: v,
        page_record: f,
        show_model: h,
        order_by: s,
        filter: _
      } = nt,
      {
        keyword: r,
        parent_id: L,
        query_type: b,
        group_by: T,
        is_follow: l,
        schedule_hide: g,
        conclusion: o,
        tags: p,
        priority_levels: d,
        matter_states: E,
        taker_ids: U,
        application_ids: R,
        creator_ids: O,
        admins_ids: q,
        project_ids: G,
        workspace_ids: V,
        parent_ids: B,
        task_at: W,
        create_at: dt,
        update_at: w,
        finish_time: A,
        complete_at: i
      } = _ || {},
      { order_by_key: k, sort: tt } = s || {}
    let I = `LIMIT ${(M - 1) * f}, ${f}`,
      et = h
    const x = [],
      $ = ['repeat_id ASC', 'task_id DESC']
    let D = "d.cycle_date <= STRFTIME('%s', 'now')"
    if (
      (r && ((et = 1), x.push(`(title LIKE '%${r}%' OR detail LIKE '%${r}%')`)),
      et === 2 && !L && x.push("parent_id = ''"),
      et === 2 &&
        (D = "(d.cycle_date <= STRFTIME('%s', 'now') OR d.cycle = 1)"),
      L && ((I = ''), x.push(`parent_id = ${L}`)),
      B)
    ) {
      const H = B.includes('-1'),
        lt = B.filter((ct) => ct !== '-1'),
        bt = H ? "(parent_id = '')" : '',
        _t = lt.map((ct) => `INSTR(parent_id, ${ct})`).join(' OR ')
      x.push(`(${bt} ${H && lt.length ? 'OR' : ''} (${_t}))`)
    }
    switch (
      (l && x.push(`is_follow = ${Number(l === 1)}`),
      g && x.push(`schedule_hide = ${Number(g === 1)}`),
      o &&
        (o === 1
          ? x.push("conclusion != ''")
          : o === 2 && x.push("conclusion = ''")),
      T)
    ) {
      case We.project: {
        x.unshift('project_id > 0'),
          $.unshift('project_id DESC, timestamp !=0'),
          k && tt && $.push(`${k} ${tt}`)
        break
      }
      case We.time: {
        const H = k === 'timestamp' && tt === 'DESC'
        if (typeof v == 'number' && !L)
          if (m === ke.up) {
            let lt = '<'
            H && (lt = '>='),
              x.push(`(timestamp ${lt} ${v} AND is_no_work = 0)`)
          } else {
            let lt = '>='
            H && (lt = '<'), x.push(`(timestamp ${lt} ${v} OR is_no_work = 1)`)
          }
        if (m) {
          let lt = 'DESC',
            bt = 'ASC'
          k === 'timestamp' && tt === 'DESC' && ((lt = 'ASC'), (bt = 'DESC')),
            m === ke.up
              ? $.unshift(`timestamp ${lt}`)
              : $.unshift(`is_no_work ASC, timestamp ${bt}`)
        }
        break
      }
      default: {
        k ? $.unshift(`${k} ${tt}`) : $.unshift('timestamp DESC')
        break
      }
    }
    if (p?.length) {
      const H = p.includes('-1'),
        lt = H ? 'tag_str IS NULL' : 'tag_str IS NOT NULL',
        bt = p.filter((wt) => wt !== '-1'),
        _t = !!bt.length
      let ct = ''
      H && _t ? (ct = 'OR') : _t && !H && (ct = 'AND')
      const yt = bt.map((wt) => `INSTR(tag_str, ${wt})`).join(' or ')
      x.push(`(${lt} ${ct} (${yt}))`)
    }
    if (W?.end_time && W.start_time) {
      const { start_time: H, end_time: lt } = W
      x.push(`((start_time BETWEEN ${H} AND ${lt}) OR (end_time BETWEEN ${H} AND ${lt})) OR
    (start_time > 0 AND start_time < ${H} AND end_time > ${lt}) OR
    (flow_step_id > 0 AND create_at BETWEEN ${H} AND ${lt}))`)
    }
    if (dt?.start_time && dt.end_time) {
      const { end_time: H, start_time: lt } = dt
      x.push(`create_at >= ${lt} AND create_at <= ${H}`)
    }
    if (w?.end_time && w?.start_time) {
      const { end_time: H, start_time: lt } = w
      x.push(`update_at >= ${lt} AND update_at <= ${H}`)
    }
    if (i?.end_time && i?.start_time) {
      const { end_time: H, start_time: lt } = i
      x.push(`complete_at >= ${lt} AND complete_at <= ${H}`)
    }
    if (A?.end_time && A?.start_time) {
      const { end_time: H, start_time: lt } = A
      x.push(`finish_time >= ${lt} AND finish_time <= ${H}`)
    }
    if ((O?.length && x.push(`creator_id IN (${O.join(',')})`), U?.length)) {
      const H = U.includes('-1'),
        lt = U.filter((ct) => ct !== '-1'),
        bt = H ? '(takers IS NULL)' : '',
        _t = lt.map((ct) => `INSTR(takers, ${ct})`).join(' OR ')
      x.push(`(${bt} ${H && lt.length ? 'OR' : ''} (${_t}))`)
    }
    if (q?.length) {
      const H = q.includes('-1'),
        lt = q.filter((ct) => ct !== '-1'),
        bt = H ? '(admins IS NULL)' : '',
        _t = lt.map((ct) => `INSTR(admins, ${ct})`).join(' OR ')
      x.push(`(${bt} ${H && lt.length ? 'OR' : ''} (${_t}))`)
    }
    switch (
      (E?.length && x.push(`matter_state IN (${E.join(',')})`),
      d?.length && x.push(`priority_level IN (${d.join(',')})`),
      R?.length && x.push(He(R, 'application_id')),
      V?.length && x.push(He(V, 'workspace_id')),
      G && x.push(He(G, 'project_id')),
      b)
    ) {
      case qt.unComplete: {
        x.push('finish_time = 0')
        break
      }
      case qt.complete: {
        x.push('finish_time > 0')
        break
      }
      case qt.dispatch: {
        x.push(`creator_id = ${ot}`)
        break
      }
      case qt.accepted: {
        x.push(`creator_id != ${ot}`)
        break
      }
      case qt.cooperation: {
        x.unshift(`takers != ${ot}`)
        break
      }
      case qt.personal: {
        x.unshift(`takers = ${ot}`)
        break
      }
      case qt.in_progress: {
        x.push(
          "finish_time = 0 AND (a.start_time <= strftime('%s','now') OR a.cycle_date <= strftime('%Y-%m-%d','now')) AND (a.end_time = 0 OR a.end_time > strftime('%s','now'))"
        )
        break
      }
      case qt.delay: {
        x.push(
          "finish_time = 0 AND end_time > 0 AND end_time < strftime('%s','now')"
        )
        break
      }
    }
    const F = x.length ? `WHERE ${x.join(' AND ')}` : '',
      ut = $.length ? `ORDER BY ${$.join(', ')}` : '',
      at = In({
        limit: I,
        user_id: ot,
        where: F,
        order: ut,
        LeftJoinRepeatAnd: D
      })
    return console.log(at), at
  },
  On = '/sql-wasm.wasm'
class Fn {
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
  async initDB(ot) {
    console.log('initDB'), (this.userId = ot.userId)
    const m = ot.wasmUrl || On
    this.db && (this.db.close(), (this.db = null)),
      (this.dbId = `${ot.env}-${ot.userId}`),
      (this.recordKey = `${this.dbId}-record`),
      ot.host !== 'https://api.flyele.vip' && (this.host = ot.host),
      (this.token = ot.token)
    const M = await Xe({ locateFile: () => m }),
      v = await (await fetch(`${this.host}/userc/v2/system/now`)).json()
    v.data && (this.timeDiff = Math.floor(Date.now() / 1e3) - v.data)
    const f = await Ir(this.dbId)
    this.recordInfo = await Ir(this.recordKey)
    const h = await this.getUserData(),
      s = h[0]
    if (s && s.type === 1) {
      const _ = new M.Database()
      ;(this.db = _), _.run(gn)
      const { sign_url: r, id: L, attach_info: b } = s
      await this.fetchZip(r),
        (this.recordInfo = { id: L, attach_info: b }),
        await this.initTable()
    } else if (f) this.db = new M.Database(f)
    else {
      await Ln(this.recordKey)
      return
    }
    this.updateDiffData(h.filter(({ type: _ }) => _ === 2))
  }
  updateToken(ot) {
    this.token = ot
  }
  updateDiff(ot) {
    Object.entries(ot)
      .map(([m, M]) => (console.log('key', m, M), `${m}=${M.id}`))
      .join('&')
  }
  updateDiffData(ot) {
    console.log('diff packs', ot)
  }
  async request(ot) {
    return await (
      await fetch(`${this.host}/${ot}`, {
        headers: { Authorization: this.token }
      })
    ).json()
  }
  async getUserData() {
    const ot = this.recordInfo?.id || 0
    return (await this.request(`datapandora/v1/packinfo/get?last_id=${ot}`))
      .data
  }
  formatSelectValue({ columns: ot, values: m }) {
    const M = Object.entries(ot)
    return new Array(m.length).fill('').map((f, h) => {
      const s = {}
      for (const [_, r] of M) {
        const L = m[h][Number(_)]
        Sn.includes(r)
          ? (s[r] = JSON.parse(L))
          : Un.includes(r)
          ? (s[r] = Boolean(L))
          : (s[r] = /^(id)$|_id$/.test(r) ? (L ? String(L) : '') : L)
      }
      return s
    })
  }
  query(ot) {
    const m = Ze().startOf('day').unix() - this.timeDiff,
      M = this.db.exec(Dn({ ...ot, timestamp: m, user_id: this.userId })),
      v = M[0] ? this.formatSelectValue(M[0]) : []
    for (const f of v) {
      const h = f.task_id,
        s = this.db.exec(kn(h)),
        _ = this.db.exec(An(h)),
        r = _[0] ? this.formatSelectValue(_[0])[0] : {}
      Object.assign(f, {
        task_tree_total: r.task_tree_total,
        task_tree_complete_total: r.task_tree_complete_total,
        interact_process: {
          child_total: f.child_total,
          comment_total: f.comment_total,
          file_total: f.file_total,
          gadget_meeting_total: f.gadget_meeting_total,
          gadget_todo_total: f.gadget_todo_total,
          important_total: f.important_total,
          quote_total: f.quote_total
        }
      }),
        f.task_tree_total > 0 &&
          console.log('task_tree_total', f.task_tree_total, h),
        (f.takers = s[0] ? this.formatSelectValue(s[0]) : [])
    }
    return ot.direction === ke.up ? v.reverse() : v
  }
  async fetchZip(ot) {
    this.zipObj = await wn.init(ot)
  }
  async parseFile(ot) {
    return JSON.parse(await this.zipObj.file(ot).async('string'))
  }
  async initTable() {
    const ot = await this.parseFile('guide')
    for (const [M, v] of Object.entries(ot)) {
      const { data: f } = v
      for (const h of f) {
        const _ = (await this.parseFile(h)).map((L) => {
          const b = {}
          return (
            Object.keys(Ar[M]).forEach((T) => {
              b[T] = L[T] || Ar[M][T]
            }),
            b
          )
        })
        let r = ''
        _.forEach((L) => {
          r += this.getInsertSql(L, M) + ';'
        }),
          this.db.run(r)
      }
    }
    const m = this.db?.exec('select * from task_dispatch')
    console.log(m), this.updateDB()
  }
  updateDB() {
    Dr(this.dbId, this.db.export()).then(() => {
      console.log('output -->'), Dr(this.recordKey, this.recordInfo)
    })
  }
  getInsertSql(ot, m) {
    return `INSERT INTO ${m} (${Object.keys(ot).join(
      ' ,'
    )}) VALUES (${Object.values(ot)
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
const qe = new Fn()
var Ue = ((nt) => (
  (nt.QUERY_FULL_VIEW_LIST = 'QUERY_FULL_VIEW_LIST'),
  (nt.INIT_DB = 'INIT_DB'),
  (nt.UPDATE_TOKEN = 'UPDATE_TOKEN'),
  nt
))(Ue || {})
class xn {
  constructor() {
    self.onmessage = async ({ data: ot }) => {
      console.log('from client', ot, ot.data)
      let m = null
      switch ((console.log('onmessage'), ot.key)) {
        case Ue.INIT_DB: {
          await qe.initDB(ot.data)
          break
        }
        case Ue.QUERY_FULL_VIEW_LIST: {
          m = qe.query(ot.data)
          break
        }
        case Ue.UPDATE_TOKEN: {
          qe.updateToken(ot.data)
          break
        }
      }
      self.postMessage({ uid: ot.uid, data: m })
    }
  }
}
new xn()
