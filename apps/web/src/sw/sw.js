'use strict'
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
  He = ((at) => (
    (at.time = 'time'),
    (at.group = 'group'),
    (at.project = 'project'),
    (at.default = 'default'),
    at
  ))(He || {}),
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
function _n(at) {
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
var qe = {},
  pn = {
    get exports() {
      return qe
    },
    set exports(at) {
      qe = at
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
;(function (at, ut) {
  var m = void 0,
    B = function (v) {
      return (
        m ||
        ((m = new Promise(function (h, f) {
          var s = typeof v < 'u' ? v : {},
            _ = s.onAbort
          ;(s.onAbort = function (t) {
            f(new Error(t)), _ && _(t)
          }),
            (s.postRun = s.postRun || []),
            s.postRun.push(function () {
              h(s)
            }),
            (at = void 0)
          var r
          r || (r = typeof s < 'u' ? s : {}),
            (r.onRuntimeInitialized = function () {
              function t(R, et) {
                switch (typeof et) {
                  case 'boolean':
                    dn(R, et ? 1 : 0)
                    break
                  case 'number':
                    un(R, et)
                    break
                  case 'string':
                    ln(R, et, -1, -1)
                    break
                  case 'object':
                    if (et === null) Sr(R)
                    else if (et.length != null) {
                      var ct = Ge(et)
                      cn(R, ct, et.length, -1), we(ct)
                    } else
                      Le(
                        R,
                        'Wrong API use : tried to return a value of an unknown type (' +
                          et +
                          ').',
                        -1
                      )
                    break
                  default:
                    Sr(R)
                }
              }
              function e(R, et) {
                for (var ct = [], pt = 0; pt < R; pt += 1) {
                  var Et = J(et + 4 * pt, 'i32'),
                    Tt = rn(Et)
                  if (Tt === 1 || Tt === 2) Et = on(Et)
                  else if (Tt === 3) Et = an(Et)
                  else if (Tt === 4) {
                    ;(Tt = Et), (Et = nn(Tt)), (Tt = sn(Tt))
                    for (var $t = new Uint8Array(Et), Ct = 0; Ct < Et; Ct += 1)
                      $t[Ct] = k[Tt + Ct]
                    Et = $t
                  } else Et = null
                  ct.push(Et)
                }
                return ct
              }
              function a(R, et) {
                ;(this.La = R), (this.db = et), (this.Ja = 1), (this.fb = [])
              }
              function c(R, et) {
                if (
                  ((this.db = et),
                  (et = A(R) + 1),
                  (this.Ya = ye(et)),
                  this.Ya === null)
                )
                  throw Error('Unable to allocate memory for the SQL string')
                i(R, $, this.Ya, et),
                  (this.eb = this.Ya),
                  (this.Ua = this.ib = null)
              }
              function y(R) {
                if (
                  ((this.filename =
                    'dbfile_' + ((4294967295 * Math.random()) >>> 0)),
                  R != null)
                ) {
                  var et = this.filename,
                    ct = '/',
                    pt = et
                  if (
                    (ct &&
                      ((ct = typeof ct == 'string' ? ct : ae(ct)),
                      (pt = et ? st(ct + '/' + et) : ct)),
                    (et = hr(!0, !0)),
                    (pt = _e(
                      pt,
                      ((et !== void 0 ? et : 438) & 4095) | 32768,
                      0
                    )),
                    R)
                  ) {
                    if (typeof R == 'string') {
                      ct = Array(R.length)
                      for (var Et = 0, Tt = R.length; Et < Tt; ++Et)
                        ct[Et] = R.charCodeAt(Et)
                      R = ct
                    }
                    me(pt, et | 146),
                      (ct = re(pt, 577)),
                      cr(ct, R, 0, R.length, 0),
                      Fe(ct),
                      me(pt, et)
                  }
                }
                this.handleError(mt(this.filename, P)),
                  (this.db = J(P, 'i32')),
                  fn(this.db),
                  (this.Za = {}),
                  (this.Na = {})
              }
              var P = Zt(4),
                K = r.cwrap,
                mt = K('sqlite3_open', 'number', ['string', 'number']),
                Lt = K('sqlite3_close_v2', 'number', ['number']),
                yt = K('sqlite3_exec', 'number', [
                  'number',
                  'string',
                  'number',
                  'number',
                  'number'
                ]),
                kt = K('sqlite3_changes', 'number', ['number']),
                Ht = K('sqlite3_prepare_v2', 'number', [
                  'number',
                  'string',
                  'number',
                  'number',
                  'number'
                ]),
                yr = K('sqlite3_sql', 'string', ['number']),
                Mr = K('sqlite3_normalized_sql', 'string', ['number']),
                wr = K('sqlite3_prepare_v2', 'number', [
                  'number',
                  'number',
                  'number',
                  'number',
                  'number'
                ]),
                jr = K('sqlite3_bind_text', 'number', [
                  'number',
                  'number',
                  'number',
                  'number',
                  'number'
                ]),
                vr = K('sqlite3_bind_blob', 'number', [
                  'number',
                  'number',
                  'number',
                  'number',
                  'number'
                ]),
                Gr = K('sqlite3_bind_double', 'number', [
                  'number',
                  'number',
                  'number'
                ]),
                Pr = K('sqlite3_bind_int', 'number', [
                  'number',
                  'number',
                  'number'
                ]),
                $r = K('sqlite3_bind_parameter_index', 'number', [
                  'number',
                  'string'
                ]),
                Hr = K('sqlite3_step', 'number', ['number']),
                qr = K('sqlite3_errmsg', 'string', ['number']),
                Wr = K('sqlite3_column_count', 'number', ['number']),
                Xr = K('sqlite3_data_count', 'number', ['number']),
                Yr = K('sqlite3_column_double', 'number', ['number', 'number']),
                Lr = K('sqlite3_column_text', 'string', ['number', 'number']),
                Zr = K('sqlite3_column_blob', 'number', ['number', 'number']),
                Kr = K('sqlite3_column_bytes', 'number', ['number', 'number']),
                Jr = K('sqlite3_column_type', 'number', ['number', 'number']),
                Vr = K('sqlite3_column_name', 'string', ['number', 'number']),
                Qr = K('sqlite3_reset', 'number', ['number']),
                tn = K('sqlite3_clear_bindings', 'number', ['number']),
                en = K('sqlite3_finalize', 'number', ['number']),
                Tr = K(
                  'sqlite3_create_function_v2',
                  'number',
                  'number string number number number number number number number'.split(
                    ' '
                  )
                ),
                rn = K('sqlite3_value_type', 'number', ['number']),
                nn = K('sqlite3_value_bytes', 'number', ['number']),
                an = K('sqlite3_value_text', 'string', ['number']),
                sn = K('sqlite3_value_blob', 'number', ['number']),
                on = K('sqlite3_value_double', 'number', ['number']),
                un = K('sqlite3_result_double', '', ['number', 'number']),
                Sr = K('sqlite3_result_null', '', ['number']),
                ln = K('sqlite3_result_text', '', [
                  'number',
                  'string',
                  'number',
                  'number'
                ]),
                cn = K('sqlite3_result_blob', '', [
                  'number',
                  'number',
                  'number',
                  'number'
                ]),
                dn = K('sqlite3_result_int', '', ['number', 'number']),
                Le = K('sqlite3_result_error', '', [
                  'number',
                  'string',
                  'number'
                ]),
                Ur = K('sqlite3_aggregate_context', 'number', [
                  'number',
                  'number'
                ]),
                fn = K('RegisterExtensionFunctions', 'number', ['number'])
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
                    R == null && ((R = this.Ja), (this.Ja += 1)), Yr(this.La, R)
                  )
                }),
                (a.prototype.Cb = function (R) {
                  if (
                    (R == null && ((R = this.Ja), (this.Ja += 1)),
                    (R = Lr(this.La, R)),
                    typeof BigInt != 'function')
                  )
                    throw Error('BigInt is not supported')
                  return BigInt(R)
                }),
                (a.prototype.Db = function (R) {
                  return (
                    R == null && ((R = this.Ja), (this.Ja += 1)), Lr(this.La, R)
                  )
                }),
                (a.prototype.getBlob = function (R) {
                  R == null && ((R = this.Ja), (this.Ja += 1))
                  var et = Kr(this.La, R)
                  R = Zr(this.La, R)
                  for (var ct = new Uint8Array(et), pt = 0; pt < et; pt += 1)
                    ct[pt] = k[R + pt]
                  return ct
                }),
                (a.prototype.get = function (R, et) {
                  ;(et = et || {}),
                    R != null && this.bind(R) && this.step(),
                    (R = [])
                  for (var ct = Xr(this.La), pt = 0; pt < ct; pt += 1)
                    switch (Jr(this.La, pt)) {
                      case 1:
                        var Et = et.useBigInt ? this.Cb(pt) : this.sb(pt)
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
                  for (var R = [], et = Wr(this.La), ct = 0; ct < et; ct += 1)
                    R.push(Vr(this.La, ct))
                  return R
                }),
                (a.prototype.getAsObject = function (R, et) {
                  ;(R = this.get(R, et)), (et = this.getColumnNames())
                  for (var ct = {}, pt = 0; pt < et.length; pt += 1)
                    ct[et[pt]] = R[pt]
                  return ct
                }),
                (a.prototype.getSQL = function () {
                  return yr(this.La)
                }),
                (a.prototype.getNormalizedSQL = function () {
                  return Mr(this.La)
                }),
                (a.prototype.run = function (R) {
                  return R != null && this.bind(R), this.step(), this.reset()
                }),
                (a.prototype.nb = function (R, et) {
                  et == null && ((et = this.Ja), (this.Ja += 1)), (R = Dt(R))
                  var ct = Ge(R)
                  this.fb.push(ct),
                    this.db.handleError(jr(this.La, et, ct, R.length - 1, 0))
                }),
                (a.prototype.wb = function (R, et) {
                  et == null && ((et = this.Ja), (this.Ja += 1))
                  var ct = Ge(R)
                  this.fb.push(ct),
                    this.db.handleError(vr(this.La, et, ct, R.length, 0))
                }),
                (a.prototype.mb = function (R, et) {
                  et == null && ((et = this.Ja), (this.Ja += 1)),
                    this.db.handleError(
                      (R === (R | 0) ? Pr : Gr)(this.La, et, R)
                    )
                }),
                (a.prototype.zb = function (R) {
                  R == null && ((R = this.Ja), (this.Ja += 1)),
                    vr(this.La, R, 0, 0, 0)
                }),
                (a.prototype.ob = function (R, et) {
                  switch (
                    (et == null && ((et = this.Ja), (this.Ja += 1)), typeof R)
                  ) {
                    case 'string':
                      this.nb(R, et)
                      return
                    case 'number':
                      this.mb(R, et)
                      return
                    case 'bigint':
                      this.nb(R.toString(), et)
                      return
                    case 'boolean':
                      this.mb(R + 0, et)
                      return
                    case 'object':
                      if (R === null) {
                        this.zb(et)
                        return
                      }
                      if (R.length != null) {
                        this.wb(R, et)
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
                  var et = this
                  return (
                    Object.keys(R).forEach(function (ct) {
                      var pt = $r(et.La, ct)
                      pt !== 0 && et.ob(R[ct], pt)
                    }),
                    !0
                  )
                }),
                (a.prototype.xb = function (R) {
                  for (var et = 0; et < R.length; et += 1)
                    this.ob(R[et], et + 1)
                  return !0
                }),
                (a.prototype.reset = function () {
                  return this.freemem(), tn(this.La) === 0 && Qr(this.La) === 0
                }),
                (a.prototype.freemem = function () {
                  for (var R; (R = this.fb.pop()) !== void 0; ) we(R)
                }),
                (a.prototype.free = function () {
                  this.freemem()
                  var R = en(this.La) === 0
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
                    et = Zt(4)
                  C(P), C(et)
                  try {
                    this.db.handleError(wr(this.db.db, this.eb, -1, P, et)),
                      (this.eb = J(et, 'i32'))
                    var ct = J(P, 'i32')
                    return ct === 0
                      ? (this.gb(), { done: !0 })
                      : ((this.Ua = new a(ct, this.db)),
                        (this.db.Za[ct] = this.Ua),
                        { value: this.Ua, done: !1 })
                  } catch (pt) {
                    throw ((this.ib = I(this.eb)), this.gb(), pt)
                  } finally {
                    de(R)
                  }
                }),
                (c.prototype.gb = function () {
                  we(this.Ya), (this.Ya = null)
                }),
                (c.prototype.getRemainingSQL = function () {
                  return this.ib !== null ? this.ib : I(this.eb)
                }),
                typeof Symbol == 'function' &&
                  typeof Symbol.iterator == 'symbol' &&
                  (c.prototype[Symbol.iterator] = function () {
                    return this
                  }),
                (y.prototype.run = function (R, et) {
                  if (!this.db) throw 'Database closed'
                  if (et) {
                    R = this.prepare(R, et)
                    try {
                      R.step()
                    } finally {
                      R.free()
                    }
                  } else this.handleError(yt(this.db, R, 0, 0, P))
                  return this
                }),
                (y.prototype.exec = function (R, et, ct) {
                  if (!this.db) throw 'Database closed'
                  var pt = ce(),
                    Et = null
                  try {
                    var Tt = A(R) + 1,
                      $t = Zt(Tt)
                    i(R, k, $t, Tt)
                    var Ct = $t,
                      zt = Zt(4)
                    for (R = []; J(Ct, 'i8') !== 0; ) {
                      C(P), C(zt), this.handleError(wr(this.db, Ct, -1, P, zt))
                      var Bt = J(P, 'i32')
                      if (((Ct = J(zt, 'i32')), Bt !== 0)) {
                        for (
                          Tt = null,
                            Et = new a(Bt, this),
                            et != null && Et.bind(et);
                          Et.step();

                        )
                          Tt === null &&
                            ((Tt = {
                              columns: Et.getColumnNames(),
                              values: []
                            }),
                            R.push(Tt)),
                            Tt.values.push(Et.get(null, ct))
                        Et.free()
                      }
                    }
                    return R
                  } catch (fe) {
                    throw (Et && Et.free(), fe)
                  } finally {
                    de(pt)
                  }
                }),
                (y.prototype.each = function (R, et, ct, pt, Et) {
                  typeof et == 'function' &&
                    ((pt = ct), (ct = et), (et = void 0)),
                    (R = this.prepare(R, et))
                  try {
                    for (; R.step(); ) ct(R.getAsObject(null, Et))
                  } finally {
                    R.free()
                  }
                  if (typeof pt == 'function') return pt()
                }),
                (y.prototype.prepare = function (R, et) {
                  if (
                    (C(P),
                    this.handleError(Ht(this.db, R, -1, P, 0)),
                    (R = J(P, 'i32')),
                    R === 0)
                  )
                    throw 'Nothing to prepare'
                  var ct = new a(R, this)
                  return et != null && ct.bind(et), (this.Za[R] = ct)
                }),
                (y.prototype.iterateStatements = function (R) {
                  return new c(R, this)
                }),
                (y.prototype.export = function () {
                  Object.values(this.Za).forEach(function (et) {
                    et.free()
                  }),
                    Object.values(this.Na).forEach(le),
                    (this.Na = {}),
                    this.handleError(Lt(this.db))
                  var R = Rr(this.filename)
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
                    this.handleError(Lt(this.db)),
                    ir('/' + this.filename),
                    (this.db = null))
                }),
                (y.prototype.handleError = function (R) {
                  if (R === 0) return null
                  throw ((R = qr(this.db)), Error(R))
                }),
                (y.prototype.getRowsModified = function () {
                  return kt(this.db)
                }),
                (y.prototype.create_function = function (R, et) {
                  Object.prototype.hasOwnProperty.call(this.Na, R) &&
                    (le(this.Na[R]), delete this.Na[R])
                  var ct = je(function (pt, Et, Tt) {
                    Et = e(Et, Tt)
                    try {
                      var $t = et.apply(null, Et)
                    } catch (Ct) {
                      Le(pt, Ct, -1)
                      return
                    }
                    t(pt, $t)
                  }, 'viii')
                  return (
                    (this.Na[R] = ct),
                    this.handleError(
                      Tr(this.db, R, et.length, 1, 0, ct, 0, 0, 0)
                    ),
                    this
                  )
                }),
                (y.prototype.create_aggregate = function (R, et) {
                  var ct =
                      et.init ||
                      function () {
                        return null
                      },
                    pt =
                      et.finalize ||
                      function (zt) {
                        return zt
                      },
                    Et = et.step
                  if (!Et)
                    throw (
                      'An aggregate function must have a step function in ' + R
                    )
                  var Tt = {}
                  Object.hasOwnProperty.call(this.Na, R) &&
                    (le(this.Na[R]), delete this.Na[R]),
                    (et = R + '__finalize'),
                    Object.hasOwnProperty.call(this.Na, et) &&
                      (le(this.Na[et]), delete this.Na[et])
                  var $t = je(function (zt, Bt, fe) {
                      var Qt = Ur(zt, 1)
                      Object.hasOwnProperty.call(Tt, Qt) || (Tt[Qt] = ct()),
                        (Bt = e(Bt, fe)),
                        (Bt = [Tt[Qt]].concat(Bt))
                      try {
                        Tt[Qt] = Et.apply(null, Bt)
                      } catch (hn) {
                        delete Tt[Qt], Le(zt, hn, -1)
                      }
                    }, 'viii'),
                    Ct = je(function (zt) {
                      var Bt = Ur(zt, 1)
                      try {
                        var fe = pt(Tt[Bt])
                      } catch (Qt) {
                        delete Tt[Bt], Le(zt, Qt, -1)
                        return
                      }
                      t(zt, fe), delete Tt[Bt]
                    }, 'vi')
                  return (
                    (this.Na[R] = $t),
                    (this.Na[et] = Ct),
                    this.handleError(
                      Tr(this.db, R, Et.length - 1, 1, 0, 0, $t, Ct, 0)
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
              (d = (t, e, a) => {
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
          var Q
          r.wasmBinary && (Q = r.wasmBinary),
            r.noExitRuntime,
            typeof WebAssembly != 'object' &&
              At('no native wasm support detected')
          var z,
            X = !1,
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
                  var K = t[e++] & 63
                  ;(y =
                    (y & 240) == 224
                      ? ((y & 15) << 12) | (P << 6) | K
                      : ((y & 7) << 18) | (P << 12) | (K << 6) | (t[e++] & 63)),
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
          function I(t, e) {
            return t ? w($, t, e) : ''
          }
          function i(t, e, a, c) {
            if (!(0 < c)) return 0
            var y = a
            c = a + c - 1
            for (var P = 0; P < t.length; ++P) {
              var K = t.charCodeAt(P)
              if (55296 <= K && 57343 >= K) {
                var mt = t.charCodeAt(++P)
                K = (65536 + ((K & 1023) << 10)) | (mt & 1023)
              }
              if (127 >= K) {
                if (a >= c) break
                e[a++] = K
              } else {
                if (2047 >= K) {
                  if (a + 1 >= c) break
                  e[a++] = 192 | (K >> 6)
                } else {
                  if (65535 >= K) {
                    if (a + 2 >= c) break
                    e[a++] = 224 | (K >> 12)
                  } else {
                    if (a + 3 >= c) break
                    ;(e[a++] = 240 | (K >> 18)),
                      (e[a++] = 128 | ((K >> 12) & 63))
                  }
                  e[a++] = 128 | ((K >> 6) & 63)
                }
                e[a++] = 128 | (K & 63)
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
          var rt, k, $, M, H, D, F, ot
          function tt() {
            var t = z.buffer
            ;(rt = t),
              (r.HEAP8 = k = new Int8Array(t)),
              (r.HEAP16 = M = new Int16Array(t)),
              (r.HEAP32 = H = new Int32Array(t)),
              (r.HEAPU8 = $ = new Uint8Array(t)),
              (r.HEAPU16 = new Uint16Array(t)),
              (r.HEAPU32 = D = new Uint32Array(t)),
              (r.HEAPF32 = F = new Float32Array(t)),
              (r.HEAPF64 = ot = new Float64Array(t))
          }
          var W,
            bt = [],
            wt = [],
            ft = []
          function ht() {
            var t = r.preRun.shift()
            bt.unshift(t)
          }
          var Nt = 0,
            vt = null
          function At(t) {
            throw (
              (r.onAbort && r.onAbort(t),
              (t = 'Aborted(' + t + ')'),
              G(t),
              (X = !0),
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
            var Z = n
            n = r.locateFile ? r.locateFile(Z, o) : o + Z
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
          function V(t) {
            for (; 0 < t.length; ) t.shift()(r)
          }
          function J(t, e = 'i8') {
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
            dt = (t) => {
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
                if (!e) throw new Y(43)
                ;(t.tty = e), (t.seekable = !1)
              },
              close: function (t) {
                t.tty.Xa.fsync(t.tty)
              },
              fsync: function (t) {
                t.tty.Xa.fsync(t.tty)
              },
              read: function (t, e, a, c) {
                if (!t.tty || !t.tty.Xa.tb) throw new Y(60)
                for (var y = 0, P = 0; P < c; P++) {
                  try {
                    var K = t.tty.Xa.tb(t.tty)
                  } catch {
                    throw new Y(29)
                  }
                  if (K === void 0 && y === 0) throw new Y(6)
                  if (K == null) break
                  y++, (e[a + P] = K)
                }
                return y && (t.node.timestamp = Date.now()), y
              },
              write: function (t, e, a, c) {
                if (!t.tty || !t.tty.Xa.jb) throw new Y(60)
                try {
                  for (var y = 0; y < c; y++) t.tty.Xa.jb(t.tty, e[a + y])
                } catch {
                  throw new Y(29)
                }
                return c && (t.node.timestamp = Date.now()), y
              }
            },
            It = {
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
                  throw new Y(63)
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
                      pb: { node: { Pa: _t.Ga.Pa, Oa: _t.Ga.Oa }, stream: xr }
                    }),
                  (a = Je(t, e, a, c)),
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
                    if (c) for (var y in c.Ia) throw new Y(55)
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
                  for (c in a.Ia) throw new Y(55)
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
                  if ((t.mode & 61440) !== 40960) throw new Y(28)
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
                  if ((e.buffer === k.buffer && (P = !1), !c)) return 0
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
                    throw new Y(28)
                  return e
                },
                lb: function (t, e, a) {
                  _t.qb(t.node, e + a), (t.node.Ma = Math.max(t.node.Ma, e + a))
                },
                bb: function (t, e, a, c, y) {
                  if ((t.node.mode & 61440) !== 32768) throw new Y(43)
                  if (((t = t.node.Ia), y & 2 || t.buffer !== rt)) {
                    if (
                      ((0 < a || a + e < t.length) &&
                        (t.subarray
                          ? (t = t.subarray(a, a + e))
                          : (t = Array.prototype.slice.call(t, a, a + e))),
                      (a = !0),
                      (e = 65536 * Math.ceil(e / 65536)),
                      (y = Er(65536, e))
                        ? ($.fill(0, y, y + e), (e = y))
                        : (e = 0),
                      !e)
                    )
                      throw new Y(48)
                    k.set(t, e)
                  } else (a = !1), (e = t.byteOffset)
                  return { Fb: e, vb: a }
                },
                cb: function (t, e, a, c, y) {
                  if ((t.node.mode & 61440) !== 32768) throw new Y(43)
                  return y & 2 || _t.Ha.write(t, e, 0, c, a, !1), 0
                }
              }
            },
            Rt = null,
            ne = {},
            jt = [],
            Ie = 1,
            Gt = null,
            ie = !0,
            Y = null,
            Xt = {},
            Ft = (t, e = {}) => {
              if (((t = gt('/', t)), !t)) return { path: '', node: null }
              if (((e = Object.assign({ rb: !0, kb: 0 }, e)), 8 < e.kb))
                throw new Y(32)
              t = nt(
                t.split('/').filter((K) => !!K),
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
                      ((a = ar(c)),
                      (c = gt(it(c), a)),
                      (a = Ft(c, { kb: e.kb + 1 }).node),
                      40 < P++)
                    )
                      throw new Y(32)
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
            ke = (t, e) => {
              for (var a = 0, c = 0; c < e.length; c++)
                a = ((a << 5) - a + e.charCodeAt(c)) | 0
              return ((t + a) >>> 0) % Gt.length
            },
            Ke = (t) => {
              var e = ke(t.parent.id, t.name)
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
                throw new Y(a, t)
              for (a = Gt[ke(t.id, e)]; a; a = a.Wa) {
                var c = a.name
                if (a.parent.id === t.id && c === e) return a
              }
              return t.Ga.lookup(t, e)
            },
            Je = (t, e, a, c) => (
              (t = new Nr(t, e, a, c)),
              (e = ke(t.parent.id, t.name)),
              (t.Wa = Gt[e]),
              (Gt[e] = t)
            ),
            Or = { r: 0, 'r+': 2, w: 577, 'w+': 578, a: 1089, 'a+': 1090 },
            Ve = (t) => {
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
            Qe = (t, e) => {
              try {
                return Jt(t, e), 20
              } catch {}
              return ee(t, 'wx')
            },
            tr = (t, e, a) => {
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
              throw new Y(33)
            },
            er = (t, e) => (
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
                throw new Y(70)
              }
            },
            De = (t, e) => {
              ne[t] = { Ha: e }
            },
            rr = (t, e) => {
              var a = e === '/',
                c = !e
              if (a && Rt) throw new Y(10)
              if (!a && !c) {
                var y = Ft(e, { rb: !1 })
                if (((e = y.path), (y = y.node), y.Va)) throw new Y(10)
                if ((y.mode & 61440) !== 16384) throw new Y(54)
              }
              ;(e = { type: t, Kb: {}, ub: e, Eb: [] }),
                (t = t.Ra(e)),
                (t.Ra = e),
                (e.root = t),
                a ? (Rt = t) : y && ((y.Va = e), y.Ra && y.Ra.Eb.push(e))
            },
            _e = (t, e, a) => {
              var c = Ft(t, { parent: !0 }).node
              if (((t = dt(t)), !t || t === '.' || t === '..')) throw new Y(28)
              var y = Qe(c, t)
              if (y) throw new Y(y)
              if (!c.Ga.ab) throw new Y(63)
              return c.Ga.ab(c, t, e, a)
            },
            Pt = (t, e) => _e(t, ((e !== void 0 ? e : 511) & 1023) | 16384, 0),
            pe = (t, e, a) => {
              typeof a > 'u' && ((a = e), (e = 438)), _e(t, e | 8192, a)
            },
            Oe = (t, e) => {
              if (!gt(t)) throw new Y(44)
              var a = Ft(e, { parent: !0 }).node
              if (!a) throw new Y(44)
              e = dt(e)
              var c = Qe(a, e)
              if (c) throw new Y(c)
              if (!a.Ga.symlink) throw new Y(63)
              a.Ga.symlink(a, e, t)
            },
            nr = (t) => {
              var e = Ft(t, { parent: !0 }).node
              t = dt(t)
              var a = Jt(e, t),
                c = tr(e, t, !0)
              if (c) throw new Y(c)
              if (!e.Ga.rmdir) throw new Y(63)
              if (a.Va) throw new Y(10)
              e.Ga.rmdir(e, t), Ke(a)
            },
            ir = (t) => {
              var e = Ft(t, { parent: !0 }).node
              if (!e) throw new Y(44)
              t = dt(t)
              var a = Jt(e, t),
                c = tr(e, t, !1)
              if (c) throw new Y(c)
              if (!e.Ga.unlink) throw new Y(63)
              if (a.Va) throw new Y(10)
              e.Ga.unlink(e, t), Ke(a)
            },
            ar = (t) => {
              if (((t = Ft(t).node), !t)) throw new Y(44)
              if (!t.Ga.readlink) throw new Y(28)
              return gt(ae(t.parent), t.Ga.readlink(t))
            },
            se = (t, e) => {
              if (((t = Ft(t, { Sa: !e }).node), !t)) throw new Y(44)
              if (!t.Ga.Pa) throw new Y(63)
              return t.Ga.Pa(t)
            },
            sr = (t) => se(t, !0),
            me = (t, e) => {
              if (
                ((t = typeof t == 'string' ? Ft(t, { Sa: !0 }).node : t),
                !t.Ga.Oa)
              )
                throw new Y(63)
              t.Ga.Oa(t, {
                mode: (e & 4095) | (t.mode & -4096),
                timestamp: Date.now()
              })
            },
            or = (t, e) => {
              if (0 > e) throw new Y(28)
              if (
                ((t = typeof t == 'string' ? Ft(t, { Sa: !0 }).node : t),
                !t.Ga.Oa)
              )
                throw new Y(63)
              if ((t.mode & 61440) === 16384) throw new Y(31)
              if ((t.mode & 61440) !== 32768) throw new Y(28)
              var a = ee(t, 'w')
              if (a) throw new Y(a)
              t.Ga.Oa(t, { size: e, timestamp: Date.now() })
            },
            re = (t, e, a) => {
              if (t === '') throw new Y(44)
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
                  if (e & 128) throw new Y(20)
                } else (y = _e(t, a, 0)), (c = !0)
              if (!y) throw new Y(44)
              if (
                ((y.mode & 61440) === 8192 && (e &= -513),
                e & 65536 && (y.mode & 61440) !== 16384)
              )
                throw new Y(54)
              if (
                !c &&
                (a = y
                  ? (y.mode & 61440) === 40960
                    ? 32
                    : (y.mode & 61440) === 16384 && (Ve(e) !== 'r' || e & 512)
                    ? 31
                    : ee(y, Ve(e))
                  : 44)
              )
                throw new Y(a)
              return (
                e & 512 && !c && or(y, 0),
                (e &= -131713),
                (y = er({
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
              if (t.fd === null) throw new Y(8)
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
            ur = (t, e, a) => {
              if (t.fd === null) throw new Y(8)
              if (!t.seekable || !t.Ha.Ta) throw new Y(70)
              if (a != 0 && a != 1 && a != 2) throw new Y(28)
              ;(t.position = t.Ha.Ta(t, e, a)), (t.Ib = [])
            },
            lr = (t, e, a, c, y) => {
              if (0 > c || 0 > y) throw new Y(28)
              if (t.fd === null) throw new Y(8)
              if ((t.flags & 2097155) === 1) throw new Y(8)
              if ((t.node.mode & 61440) === 16384) throw new Y(31)
              if (!t.Ha.read) throw new Y(28)
              var P = typeof y < 'u'
              if (!P) y = t.position
              else if (!t.seekable) throw new Y(70)
              return (e = t.Ha.read(t, e, a, c, y)), P || (t.position += e), e
            },
            cr = (t, e, a, c, y) => {
              if (0 > c || 0 > y) throw new Y(28)
              if (t.fd === null) throw new Y(8)
              if (!(t.flags & 2097155)) throw new Y(8)
              if ((t.node.mode & 61440) === 16384) throw new Y(31)
              if (!t.Ha.write) throw new Y(28)
              t.seekable && t.flags & 1024 && ur(t, 0, 2)
              var P = typeof y < 'u'
              if (!P) y = t.position
              else if (!t.seekable) throw new Y(70)
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
              return lr(a, c, 0, t, 0), (e = c), Fe(a), e
            },
            dr = () => {
              Y ||
                ((Y = function (t, e) {
                  ;(this.node = e),
                    (this.Hb = function (a) {
                      this.Ka = a
                    }),
                    this.Hb(t),
                    (this.message = 'FS error')
                }),
                (Y.prototype = Error()),
                (Y.prototype.constructor = Y),
                [44].forEach((t) => {
                  ;(Xt[t] = new Y(t)),
                    (Xt[t].stack = '<generic error, no stack>')
                }))
            },
            fr,
            hr = (t, e) => {
              var a = 0
              return t && (a |= 365), e && (a |= 146), a
            },
            oe = (t, e, a) => {
              t = st('/dev/' + t)
              var c = hr(!!e, !!a)
              xe || (xe = 64)
              var y = (xe++ << 8) | 0
              De(y, {
                open: (P) => {
                  P.seekable = !1
                },
                close: () => {
                  a && a.buffer && a.buffer.length && a(10)
                },
                read: (P, K, mt, Lt) => {
                  for (var yt = 0, kt = 0; kt < Lt; kt++) {
                    try {
                      var Ht = e()
                    } catch {
                      throw new Y(29)
                    }
                    if (Ht === void 0 && yt === 0) throw new Y(6)
                    if (Ht == null) break
                    yt++, (K[mt + kt] = Ht)
                  }
                  return yt && (P.node.timestamp = Date.now()), yt
                },
                write: (P, K, mt, Lt) => {
                  for (var yt = 0; yt < Lt; yt++)
                    try {
                      a(K[mt + yt])
                    } catch {
                      throw new Y(29)
                    }
                  return Lt && (P.node.timestamp = Date.now()), yt
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
              if (!a) throw new Y(44)
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
            if (((t = jt[t]), !t)) throw new Y(8)
            return t
          }
          function Re(t) {
            return D[t >> 2] + 4294967296 * H[(t + 4) >> 2]
          }
          function _r(t) {
            var e = A(t) + 1,
              a = ye(e)
            return a && i(t, k, a, e), a
          }
          function Cr(t, e, a) {
            function c(Lt) {
              return (Lt = Lt.toTimeString().match(/\(([A-Za-z ]+)\)$/))
                ? Lt[1]
                : 'GMT'
            }
            var y = new Date().getFullYear(),
              P = new Date(y, 0, 1),
              K = new Date(y, 6, 1)
            y = P.getTimezoneOffset()
            var mt = K.getTimezoneOffset()
            ;(H[t >> 2] = 60 * Math.max(y, mt)),
              (H[e >> 2] = Number(y != mt)),
              (t = c(P)),
              (e = c(K)),
              (t = _r(t)),
              (e = _r(e)),
              mt < y
                ? ((D[a >> 2] = t), (D[(a + 4) >> 2] = e))
                : ((D[a >> 2] = e), (D[(a + 4) >> 2] = t))
          }
          function Ce(t, e, a) {
            Ce.Bb || ((Ce.Bb = !0), Cr(t, e, a))
          }
          var pr
          pr = g
            ? () => {
                var t = process.hrtime()
                return 1e3 * t[0] + t[1] / 1e6
              }
            : () => performance.now()
          var ze = {}
          function mr() {
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
              var a = W.length
              if (Yt)
                for (var c = 0; c < 0 + a; c++) {
                  var y = W.get(c)
                  y && Yt.set(y, c)
                }
            }
            if (Yt.has(t)) return Yt.get(t)
            if (Me.length) a = Me.pop()
            else {
              try {
                W.grow(1)
              } catch (mt) {
                throw mt instanceof RangeError
                  ? 'Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.'
                  : mt
              }
              a = W.length - 1
            }
            try {
              W.set(a, t)
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
                    K = 1;
                  K < e.length;
                  ++K
                )
                  P.parameters.push(y[e[K]])
                e = new c(P, t)
              } else {
                for (
                  c = [1, 96],
                    y = e.slice(0, 1),
                    e = e.slice(1),
                    P = { i: 127, p: 127, j: 126, f: 125, d: 124 },
                    K = e.length,
                    128 > K ? c.push(K) : c.push(K % 128 | 128, K >> 7),
                    K = 0;
                  K < e.length;
                  ++K
                )
                  c.push(P[e[K]])
                y == 'v' ? c.push(0) : c.push(1, P[y]),
                  (e = [0, 97, 115, 109, 1, 0, 0, 0, 1]),
                  (y = c.length),
                  128 > y ? e.push(y) : e.push(y % 128 | 128, y >> 7),
                  e.push.apply(e, c),
                  e.push(2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0),
                  (e = new WebAssembly.Module(new Uint8Array(e))),
                  (e = new WebAssembly.Instance(e, { e: { f: t } }).exports.f)
              }
              W.set(a, e)
            }
            return Yt.set(t, a), a
          }
          function le(t) {
            Yt.delete(W.get(t)), Me.push(t)
          }
          function Ge(t) {
            var e = ye(t.length)
            return (
              t.subarray || t.slice || (t = new Uint8Array(t)), $.set(t, e), e
            )
          }
          function zr(t, e, a, c) {
            var y = {
              string: (yt) => {
                var kt = 0
                if (yt != null && yt !== 0) {
                  var Ht = (yt.length << 2) + 1
                  ;(kt = Zt(Ht)), i(yt, $, kt, Ht)
                }
                return kt
              },
              array: (yt) => {
                var kt = Zt(yt.length)
                return k.set(yt, kt), kt
              }
            }
            t = r['_' + t]
            var P = [],
              K = 0
            if (c)
              for (var mt = 0; mt < c.length; mt++) {
                var Lt = y[a[mt]]
                Lt
                  ? (K === 0 && (K = ce()), (P[mt] = Lt(c[mt])))
                  : (P[mt] = c[mt])
              }
            return (
              (a = t.apply(null, P)),
              (a = (function (yt) {
                return (
                  K !== 0 && de(K),
                  e === 'string' ? I(yt) : e === 'boolean' ? !!yt : yt
                )
              })(a))
            )
          }
          function Nr(t, e, a, c) {
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
          Object.defineProperties(Nr.prototype, {
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
            dr(),
            (Gt = Array(4096)),
            rr(_t, '/'),
            Pt('/tmp'),
            Pt('/home'),
            Pt('/home/web_user'),
            (() => {
              Pt('/dev'),
                De(259, { read: () => 0, write: (e, a, c, y) => y }),
                pe('/dev/null', 259),
                xt(1280, It),
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
                rr(
                  {
                    Ra: () => {
                      var e = Je(t, 'fd', 16895, 73)
                      return (
                        (e.Ga = {
                          lookup: (a, c) => {
                            var y = jt[+c]
                            if (!y) throw new Y(8)
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
                return (t = I(t)), me(t, e), 0
              } catch (a) {
                if (typeof Ut > 'u' || !(a instanceof Y)) throw a
                return -a.Ka
              }
            },
            H: function (t, e, a) {
              try {
                if (((e = I(e)), (e = Vt(t, e)), a & -8)) return -28
                var c = Ft(e, { Sa: !0 }).node
                return c
                  ? ((t = ''),
                    a & 4 && (t += 'r'),
                    a & 2 && (t += 'w'),
                    a & 1 && (t += 'x'),
                    t && ee(c, t) ? -2 : 0)
                  : -44
              } catch (y) {
                if (typeof Ut > 'u' || !(y instanceof Y)) throw y
                return -y.Ka
              }
            },
            i: function (t, e) {
              try {
                var a = jt[t]
                if (!a) throw new Y(8)
                return me(a.node, e), 0
              } catch (c) {
                if (typeof Ut > 'u' || !(c instanceof Y)) throw c
                return -c.Ka
              }
            },
            g: function (t) {
              try {
                var e = jt[t]
                if (!e) throw new Y(8)
                var a = e.node,
                  c = typeof a == 'string' ? Ft(a, { Sa: !0 }).node : a
                if (!c.Ga.Oa) throw new Y(63)
                return c.Ga.Oa(c, { timestamp: Date.now() }), 0
              } catch (y) {
                if (typeof Ut > 'u' || !(y instanceof Y)) throw y
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
                    return 0 > y ? -28 : er(c, y).fd
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
                    return (H[gr() >> 2] = 28), -1
                  default:
                    return -28
                }
              } catch (P) {
                if (typeof Ut > 'u' || !(P instanceof Y)) throw P
                return -P.Ka
              }
            },
            G: function (t, e) {
              try {
                var a = Mt(t)
                return ge(se, a.path, e)
              } catch (c) {
                if (typeof Ut > 'u' || !(c instanceof Y)) throw c
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
                if (!c) throw new Y(8)
                if (!(c.flags & 2097155)) throw new Y(28)
                return or(c.node, e), 0
              } catch (y) {
                if (typeof Ut > 'u' || !(y instanceof Y)) throw y
                return -y.Ka
              }
            },
            B: function (t, e) {
              try {
                if (e === 0) return -28
                var a = A('/') + 1
                return e < a ? -68 : (i('/', $, t, e), a)
              } catch (c) {
                if (typeof Ut > 'u' || !(c instanceof Y)) throw c
                return -c.Ka
              }
            },
            E: function (t, e) {
              try {
                return (t = I(t)), ge(sr, t, e)
              } catch (a) {
                if (typeof Ut > 'u' || !(a instanceof Y)) throw a
                return -a.Ka
              }
            },
            y: function (t, e, a) {
              try {
                return (
                  (e = I(e)),
                  (e = Vt(t, e)),
                  (e = st(e)),
                  e[e.length - 1] === '/' && (e = e.substr(0, e.length - 1)),
                  Pt(e, a),
                  0
                )
              } catch (c) {
                if (typeof Ut > 'u' || !(c instanceof Y)) throw c
                return -c.Ka
              }
            },
            D: function (t, e, a, c) {
              try {
                e = I(e)
                var y = c & 256
                return (e = Vt(t, e, c & 4096)), ge(y ? sr : se, e, a)
              } catch (P) {
                if (typeof Ut > 'u' || !(P instanceof Y)) throw P
                return -P.Ka
              }
            },
            v: function (t, e, a, c) {
              Ee = c
              try {
                ;(e = I(e)), (e = Vt(t, e))
                var y = c ? be() : 0
                return re(e, a, y).fd
              } catch (P) {
                if (typeof Ut > 'u' || !(P instanceof Y)) throw P
                return -P.Ka
              }
            },
            t: function (t, e, a, c) {
              try {
                if (((e = I(e)), (e = Vt(t, e)), 0 >= c)) return -28
                var y = ar(e),
                  P = Math.min(c, A(y)),
                  K = k[a + P]
                return i(y, $, a, c + 1), (k[a + P] = K), P
              } catch (mt) {
                if (typeof Ut > 'u' || !(mt instanceof Y)) throw mt
                return -mt.Ka
              }
            },
            s: function (t) {
              try {
                return (t = I(t)), nr(t), 0
              } catch (e) {
                if (typeof Ut > 'u' || !(e instanceof Y)) throw e
                return -e.Ka
              }
            },
            F: function (t, e) {
              try {
                return (t = I(t)), ge(se, t, e)
              } catch (a) {
                if (typeof Ut > 'u' || !(a instanceof Y)) throw a
                return -a.Ka
              }
            },
            p: function (t, e, a) {
              try {
                return (
                  (e = I(e)),
                  (e = Vt(t, e)),
                  a === 0
                    ? ir(e)
                    : a === 512
                    ? nr(e)
                    : At('Invalid flags passed to unlinkat'),
                  0
                )
              } catch (c) {
                if (typeof Ut > 'u' || !(c instanceof Y)) throw c
                return -c.Ka
              }
            },
            o: function (t, e, a) {
              try {
                if (((e = I(e)), (e = Vt(t, e, !0)), a)) {
                  var c = Re(a),
                    y = H[(a + 8) >> 2]
                  ;(P = 1e3 * c + y / 1e6),
                    (a += 16),
                    (c = Re(a)),
                    (y = H[(a + 8) >> 2]),
                    (K = 1e3 * c + y / 1e6)
                } else
                  var P = Date.now(),
                    K = P
                t = P
                var mt = Ft(e, { Sa: !0 }).node
                return mt.Ga.Oa(mt, { timestamp: Math.max(t, K) }), 0
              } catch (Lt) {
                if (typeof Ut > 'u' || !(Lt instanceof Y)) throw Lt
                return -Lt.Ka
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
                var K = Mt(c)
                if (e & 2 && !(a & 2) && (K.flags & 2097155) !== 2)
                  throw new Y(2)
                if ((K.flags & 2097155) === 1) throw new Y(2)
                if (!K.Ha.bb) throw new Y(43)
                var mt = K.Ha.bb(K, t, y, e, a),
                  Lt = mt.Fb
                return (H[P >> 2] = mt.vb), Lt
              } catch (yt) {
                if (typeof Ut > 'u' || !(yt instanceof Y)) throw yt
                return -yt.Ka
              }
            },
            x: function (t, e, a, c, y, P) {
              try {
                var K = Mt(y)
                if (a & 2) {
                  var mt = $.slice(t, t + e)
                  K && K.Ha.cb && K.Ha.cb(K, mt, P, e, c)
                }
              } catch (Lt) {
                if (typeof Ut > 'u' || !(Lt instanceof Y)) throw Lt
                return -Lt.Ka
              }
            },
            n: Ce,
            q: function () {
              return 2147483648
            },
            d: pr,
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
                    z.grow((y - rt.byteLength + 65535) >>> 16), tt()
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
                mr().forEach(function (c, y) {
                  var P = e + a
                  for (y = D[(t + 4 * y) >> 2] = P, P = 0; P < c.length; ++P)
                    k[y++ >> 0] = c.charCodeAt(P)
                  ;(k[y >> 0] = 0), (a += c.length + 1)
                }),
                0
              )
            },
            A: function (t, e) {
              var a = mr()
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
                if (typeof Ut > 'u' || !(a instanceof Y)) throw a
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
                if (typeof Ut > 'u' || !(c instanceof Y)) throw c
                return c.Ka
              }
            },
            u: function (t, e, a, c) {
              try {
                t: {
                  var y = Mt(t)
                  t = e
                  for (var P = (e = 0); P < a; P++) {
                    var K = D[t >> 2],
                      mt = D[(t + 4) >> 2]
                    t += 8
                    var Lt = lr(y, k, K, mt)
                    if (0 > Lt) {
                      var yt = -1
                      break t
                    }
                    if (((e += Lt), Lt < mt)) break
                  }
                  yt = e
                }
                return (D[c >> 2] = yt), 0
              } catch (kt) {
                if (typeof Ut > 'u' || !(kt instanceof Y)) throw kt
                return kt.Ka
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
                  ur(P, e, c),
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
              } catch (K) {
                if (typeof Ut > 'u' || !(K instanceof Y)) throw K
                return K.Ka
              }
            },
            C: function (t) {
              try {
                var e = Mt(t)
                return e.Ha && e.Ha.fsync ? e.Ha.fsync(e) : 0
              } catch (a) {
                if (typeof Ut > 'u' || !(a instanceof Y)) throw a
                return a.Ka
              }
            },
            r: function (t, e, a, c) {
              try {
                t: {
                  var y = Mt(t)
                  t = e
                  for (var P = (e = 0); P < a; P++) {
                    var K = D[t >> 2],
                      mt = D[(t + 4) >> 2]
                    t += 8
                    var Lt = cr(y, k, K, mt)
                    if (0 > Lt) {
                      var yt = -1
                      break t
                    }
                    e += Lt
                  }
                  yt = e
                }
                return (D[c >> 2] = yt), 0
              } catch (kt) {
                if (typeof Ut > 'u' || !(kt instanceof Y)) throw kt
                return kt.Ka
              }
            }
          }
          ;(function () {
            function t(y) {
              ;(r.asm = y.exports),
                (z = r.asm.I),
                tt(),
                (W = r.asm.Aa),
                wt.unshift(r.asm.J),
                Nt--,
                r.monitorRunDependencies && r.monitorRunDependencies(Nt),
                Nt == 0 && vt && ((y = vt), (vt = null), y())
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
            var c = { a: Br }
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
          var gr = (r.___errno_location = function () {
            return (gr = r.___errno_location = r.asm.N).apply(null, arguments)
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
          var Er = (r._emscripten_builtin_memalign = function () {
              return (Er = r._emscripten_builtin_memalign = r.asm.Ca).apply(
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
          ;(r.UTF8ToString = I),
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
          vt = function t() {
            ve || br(), ve || (vt = t)
          }
          function br() {
            function t() {
              if (!ve && ((ve = !0), (r.calledRun = !0), !X)) {
                if (
                  (r.noFSInit ||
                    fr ||
                    ((fr = !0),
                    dr(),
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
                  V(wt),
                  r.onRuntimeInitialized && r.onRuntimeInitialized(),
                  r.postRun)
                )
                  for (
                    typeof r.postRun == 'function' && (r.postRun = [r.postRun]);
                    r.postRun.length;

                  ) {
                    var e = r.postRun.shift()
                    ft.unshift(e)
                  }
                V(ft)
              }
            }
            if (!(0 < Nt)) {
              if (r.preRun)
                for (
                  typeof r.preRun == 'function' && (r.preRun = [r.preRun]);
                  r.preRun.length;

                )
                  ht()
              V(bt),
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
          return br(), s
        })),
        m)
      )
    }
  ;(at.exports = B), (at.exports.default = B)
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
function Se(at) {
  throw new Error(
    'Could not dynamically require "' +
      at +
      '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.'
  )
}
var We = {},
  En = {
    get exports() {
      return We
    },
    set exports(at) {
      We = at
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
      function f(r, L) {
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
              return f(o || g)
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
        f(h[_])
      return f
    })(
      {
        1: [
          function (m, B, v) {
            var h = m('./utils'),
              f = m('./support'),
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
                  x = h.getTypeOf(_) !== 'string';
                d < _.length;

              )
                (U = E - d),
                  (b = x
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
                  E = f.uint8array ? new Uint8Array(0 | U) : new Array(0 | U);
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
              f = m('./stream/DataWorker'),
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
                var L = new f(h.Promise.resolve(this.compressedContent))
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
                return new f(h.Promise.resolve(this.compressedContent))
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
              f = (function () {
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
                      var l = f,
                        g = T + b
                      r ^= -1
                      for (var o = T; o < g; o++)
                        r = (r >>> 8) ^ l[255 & (r ^ L[o])]
                      return -1 ^ r
                    })(0 | _, s, s.length, 0)
                  : (function (r, L, b, T) {
                      var l = f,
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
              f = m('pako'),
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
                this._pako = new f[this._pakoAction]({
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
            function f(l, g, o, p, d, E) {
              var U,
                x,
                O = l.file,
                q = l.compression,
                G = E !== r.utf8encode,
                Q = s.transformTo('string', E(O.name)),
                z = s.transformTo('string', r.utf8encode(O.name)),
                X = O.comment,
                lt = s.transformTo('string', E(X)),
                w = s.transformTo('string', r.utf8encode(X)),
                I = z.length !== O.name.length,
                i = w.length !== X.length,
                A = '',
                rt = '',
                k = '',
                $ = O.dir,
                M = O.date,
                H = { crc32: 0, compressedSize: 0, uncompressedSize: 0 }
              ;(g && !o) ||
                ((H.crc32 = l.crc32),
                (H.compressedSize = l.compressedSize),
                (H.uncompressedSize = l.uncompressedSize))
              var D = 0
              g && (D |= 8), G || (!I && !i) || (D |= 2048)
              var F = 0,
                ot = 0
              $ && (F |= 16),
                d === 'UNIX'
                  ? ((ot = 798),
                    (F |= (function (W, bt) {
                      var wt = W
                      return W || (wt = bt ? 16893 : 33204), (65535 & wt) << 16
                    })(O.unixPermissions, $)))
                  : ((ot = 20),
                    (F |= (function (W) {
                      return 63 & (W || 0)
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
                I &&
                  ((rt = h(1, 1) + h(L(Q), 4) + z),
                  (A += 'up' + h(rt.length, 2) + rt)),
                i &&
                  ((k = h(1, 1) + h(L(lt), 4) + w),
                  (A += 'uc' + h(k.length, 2) + k))
              var tt = ''
              return (
                (tt += `
\0`),
                (tt += h(D, 2)),
                (tt += q.magic),
                (tt += h(U, 2)),
                (tt += h(x, 2)),
                (tt += h(H.crc32, 4)),
                (tt += h(H.compressedSize, 4)),
                (tt += h(H.uncompressedSize, 4)),
                (tt += h(Q.length, 2)),
                (tt += h(A.length, 2)),
                {
                  fileRecord: b.LOCAL_FILE_HEADER + tt + Q + A,
                  dirRecord:
                    b.CENTRAL_FILE_HEADER +
                    h(ot, 2) +
                    tt +
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
                  var o = f(
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
                  o = f(
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
                  p = (function (d, E, U, x, O) {
                    var q = s.transformTo('string', O(x))
                    return (
                      b.CENTRAL_DIRECTORY_END +
                      '\0\0\0\0' +
                      h(d, 2) +
                      h(d, 2) +
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
              f = m('./ZipFileWorker')
            v.generateWorker = function (s, _, r) {
              var L = new f(_.streamFiles, r, _.platform, _.encodeFileName),
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
                  var f = new h()
                  for (var s in this)
                    typeof this[s] != 'function' && (f[s] = this[s])
                  return f
                })
            }
            ;((h.prototype = m('./object')).loadAsync = m('./load')),
              (h.support = m('./support')),
              (h.defaults = m('./defaults')),
              (h.version = '3.10.1'),
              (h.loadAsync = function (f, s) {
                return new h().loadAsync(f, s)
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
              f = m('./external'),
              s = m('./utf8'),
              _ = m('./zipEntries'),
              r = m('./stream/Crc32Probe'),
              L = m('./nodejsUtils')
            function b(T) {
              return new f.Promise(function (l, g) {
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
                  ? f.Promise.reject(
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
                        var p = [f.Promise.resolve(o)],
                          d = o.files
                        if (l.checkCRC32)
                          for (var E = 0; E < d.length; E++) p.push(b(d[E]))
                        return f.Promise.all(p)
                      })
                      .then(function (o) {
                        for (
                          var p = o.shift(), d = p.files, E = 0;
                          E < d.length;
                          E++
                        ) {
                          var U = d[E],
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
              f = m('../stream/GenericWorker')
            function s(_, r) {
              f.call(this, 'Nodejs stream input adapter for ' + _),
                (this._upstreamEnded = !1),
                this._bindStream(r)
            }
            h.inherits(s, f),
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
                  !!f.prototype.pause.call(this) && (this._stream.pause(), !0)
                )
              }),
              (s.prototype.resume = function () {
                return (
                  !!f.prototype.resume.call(this) &&
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
            function f(s, _, r) {
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
            m('../utils').inherits(f, h),
              (f.prototype._read = function () {
                this._helper.resume()
              }),
              (B.exports = f)
          },
          { '../utils': 32, 'readable-stream': 16 }
        ],
        14: [
          function (m, B, v) {
            B.exports = {
              isNode: typeof Buffer < 'u',
              newBufferFrom: function (h, f) {
                if (Buffer.from && Buffer.from !== Uint8Array.from)
                  return Buffer.from(h, f)
                if (typeof h == 'number')
                  throw new Error('The "data" argument must not be a number')
                return new Buffer(h, f)
              },
              allocBuffer: function (h) {
                if (Buffer.alloc) return Buffer.alloc(h)
                var f = new Buffer(h)
                return f.fill(0), f
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
                X = s.extend(G || {}, L)
              ;(X.date = X.date || new Date()),
                X.compression !== null &&
                  (X.compression = X.compression.toUpperCase()),
                typeof X.unixPermissions == 'string' &&
                  (X.unixPermissions = parseInt(X.unixPermissions, 8)),
                X.unixPermissions && 16384 & X.unixPermissions && (X.dir = !0),
                X.dosPermissions && 16 & X.dosPermissions && (X.dir = !0),
                X.dir && (O = d(O)),
                X.createFolders && (Q = p(O)) && E.call(this, Q, !0)
              var lt = z === 'string' && X.binary === !1 && X.base64 === !1
              ;(G && G.binary !== void 0) || (X.binary = !lt),
                ((q instanceof b && q.uncompressedSize === 0) ||
                  X.dir ||
                  !q ||
                  q.length === 0) &&
                  ((X.base64 = !1),
                  (X.binary = !0),
                  (q = ''),
                  (X.compression = 'STORE'),
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
                      X.binary,
                      X.optimizedBinaryString,
                      X.base64
                    )
              var I = new T(O, w, X)
              this.files[O] = I
            }
            var f = m('./utf8'),
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
                  return this.filter(function (X, lt) {
                    return !lt.dir && Q.test(X)
                  })
                }
                var z = this.files[this.root + O]
                return z && !z.dir ? z : null
              },
              folder: function (O) {
                if (!O) return this
                if (U(O))
                  return this.filter(function (z, X) {
                    return X.dir && O.test(z)
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
                    var G = this.filter(function (z, X) {
                        return X.name.slice(0, O.length) === O
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
                      encodeFileName: f.utf8encode
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
            function f(s) {
              h.call(this, s)
              for (var _ = 0; _ < this.data.length; _++) s[_] = 255 & s[_]
            }
            m('../utils').inherits(f, h),
              (f.prototype.byteAt = function (s) {
                return this.data[this.zero + s]
              }),
              (f.prototype.lastIndexOfSignature = function (s) {
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
              (f.prototype.readAndCheckSignature = function (s) {
                var _ = s.charCodeAt(0),
                  r = s.charCodeAt(1),
                  L = s.charCodeAt(2),
                  b = s.charCodeAt(3),
                  T = this.readData(4)
                return _ === T[0] && r === T[1] && L === T[2] && b === T[3]
              }),
              (f.prototype.readData = function (s) {
                if ((this.checkOffset(s), s === 0)) return []
                var _ = this.data.slice(
                  this.zero + this.index,
                  this.zero + this.index + s
                )
                return (this.index += s), _
              }),
              (B.exports = f)
          },
          { '../utils': 32, './DataReader': 18 }
        ],
        18: [
          function (m, B, v) {
            var h = m('../utils')
            function f(s) {
              ;(this.data = s),
                (this.length = s.length),
                (this.index = 0),
                (this.zero = 0)
            }
            ;(f.prototype = {
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
              (B.exports = f)
          },
          { '../utils': 32 }
        ],
        19: [
          function (m, B, v) {
            var h = m('./Uint8ArrayReader')
            function f(s) {
              h.call(this, s)
            }
            m('../utils').inherits(f, h),
              (f.prototype.readData = function (s) {
                this.checkOffset(s)
                var _ = this.data.slice(
                  this.zero + this.index,
                  this.zero + this.index + s
                )
                return (this.index += s), _
              }),
              (B.exports = f)
          },
          { '../utils': 32, './Uint8ArrayReader': 21 }
        ],
        20: [
          function (m, B, v) {
            var h = m('./DataReader')
            function f(s) {
              h.call(this, s)
            }
            m('../utils').inherits(f, h),
              (f.prototype.byteAt = function (s) {
                return this.data.charCodeAt(this.zero + s)
              }),
              (f.prototype.lastIndexOfSignature = function (s) {
                return this.data.lastIndexOf(s) - this.zero
              }),
              (f.prototype.readAndCheckSignature = function (s) {
                return s === this.readData(4)
              }),
              (f.prototype.readData = function (s) {
                this.checkOffset(s)
                var _ = this.data.slice(
                  this.zero + this.index,
                  this.zero + this.index + s
                )
                return (this.index += s), _
              }),
              (B.exports = f)
          },
          { '../utils': 32, './DataReader': 18 }
        ],
        21: [
          function (m, B, v) {
            var h = m('./ArrayReader')
            function f(s) {
              h.call(this, s)
            }
            m('../utils').inherits(f, h),
              (f.prototype.readData = function (s) {
                if ((this.checkOffset(s), s === 0)) return new Uint8Array(0)
                var _ = this.data.subarray(
                  this.zero + this.index,
                  this.zero + this.index + s
                )
                return (this.index += s), _
              }),
              (B.exports = f)
          },
          { '../utils': 32, './ArrayReader': 17 }
        ],
        22: [
          function (m, B, v) {
            var h = m('../utils'),
              f = m('../support'),
              s = m('./ArrayReader'),
              _ = m('./StringReader'),
              r = m('./NodeBufferReader'),
              L = m('./Uint8ArrayReader')
            B.exports = function (b) {
              var T = h.getTypeOf(b)
              return (
                h.checkSupport(T),
                T !== 'string' || f.uint8array
                  ? T === 'nodebuffer'
                    ? new r(b)
                    : f.uint8array
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
              f = m('../utils')
            function s(_) {
              h.call(this, 'ConvertWorker to ' + _), (this.destType = _)
            }
            f.inherits(s, h),
              (s.prototype.processChunk = function (_) {
                this.push({
                  data: f.transformTo(this.destType, _.data),
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
              f = m('../crc32')
            function s() {
              h.call(this, 'Crc32Probe'), this.withStreamInfo('crc32', 0)
            }
            m('../utils').inherits(s, h),
              (s.prototype.processChunk = function (_) {
                ;(this.streamInfo.crc32 = f(
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
              f = m('./GenericWorker')
            function s(_) {
              f.call(this, 'DataLengthProbe for ' + _),
                (this.propName = _),
                this.withStreamInfo(_, 0)
            }
            h.inherits(s, f),
              (s.prototype.processChunk = function (_) {
                if (_) {
                  var r = this.streamInfo[this.propName] || 0
                  this.streamInfo[this.propName] = r + _.data.length
                }
                f.prototype.processChunk.call(this, _)
              }),
              (B.exports = s)
          },
          { '../utils': 32, './GenericWorker': 28 }
        ],
        27: [
          function (m, B, v) {
            var h = m('../utils'),
              f = m('./GenericWorker')
            function s(_) {
              f.call(this, 'DataWorker')
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
            h.inherits(s, f),
              (s.prototype.cleanUp = function () {
                f.prototype.cleanUp.call(this), (this.data = null)
              }),
              (s.prototype.resume = function () {
                return (
                  !!f.prototype.resume.call(this) &&
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
            function h(f) {
              ;(this.name = f || 'default'),
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
              push: function (f) {
                this.emit('data', f)
              },
              end: function () {
                if (this.isFinished) return !1
                this.flush()
                try {
                  this.emit('end'), this.cleanUp(), (this.isFinished = !0)
                } catch (f) {
                  this.emit('error', f)
                }
                return !0
              },
              error: function (f) {
                return (
                  !this.isFinished &&
                  (this.isPaused
                    ? (this.generatedError = f)
                    : ((this.isFinished = !0),
                      this.emit('error', f),
                      this.previous && this.previous.error(f),
                      this.cleanUp()),
                  !0)
                )
              },
              on: function (f, s) {
                return this._listeners[f].push(s), this
              },
              cleanUp: function () {
                ;(this.streamInfo =
                  this.generatedError =
                  this.extraStreamInfo =
                    null),
                  (this._listeners = [])
              },
              emit: function (f, s) {
                if (this._listeners[f])
                  for (var _ = 0; _ < this._listeners[f].length; _++)
                    this._listeners[f][_].call(this, s)
              },
              pipe: function (f) {
                return f.registerPrevious(this)
              },
              registerPrevious: function (f) {
                if (this.isLocked)
                  throw new Error(
                    "The stream '" + this + "' has already been used."
                  )
                ;(this.streamInfo = f.streamInfo),
                  this.mergeStreamInfo(),
                  (this.previous = f)
                var s = this
                return (
                  f.on('data', function (_) {
                    s.processChunk(_)
                  }),
                  f.on('end', function () {
                    s.end()
                  }),
                  f.on('error', function (_) {
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
                var f = (this.isPaused = !1)
                return (
                  this.generatedError &&
                    (this.error(this.generatedError), (f = !0)),
                  this.previous && this.previous.resume(),
                  !f
                )
              },
              flush: function () {},
              processChunk: function (f) {
                this.push(f)
              },
              withStreamInfo: function (f, s) {
                return (
                  (this.extraStreamInfo[f] = s), this.mergeStreamInfo(), this
                )
              },
              mergeStreamInfo: function () {
                for (var f in this.extraStreamInfo)
                  Object.prototype.hasOwnProperty.call(
                    this.extraStreamInfo,
                    f
                  ) && (this.streamInfo[f] = this.extraStreamInfo[f])
              },
              lock: function () {
                if (this.isLocked)
                  throw new Error(
                    "The stream '" + this + "' has already been used."
                  )
                ;(this.isLocked = !0), this.previous && this.previous.lock()
              },
              toString: function () {
                var f = 'Worker ' + this.name
                return this.previous ? this.previous + ' -> ' + f : f
              }
            }),
              (B.exports = h)
          },
          {}
        ],
        29: [
          function (m, B, v) {
            var h = m('../utils'),
              f = m('./ConvertWorker'),
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
                  x = g._outputType,
                  O = g._mimeType
                g.on('data', function (q, G) {
                  E.push(q), o && o(G)
                })
                  .on('error', function (q) {
                    ;(E = []), d(q)
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
                            X = 0,
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
                                lt.set(Q[z], X), (X += Q[z].length)
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
                  h.checkSupport(d),
                  (this._worker = g.pipe(new f(d))),
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
                  var f = new (self.BlobBuilder ||
                    self.WebKitBlobBuilder ||
                    self.MozBlobBuilder ||
                    self.MSBlobBuilder)()
                  f.append(h),
                    (v.blob = f.getBlob('application/zip').size === 0)
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
                f = m('./support'),
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
              return f.nodebuffer
                ? s.newBufferFrom(l, 'utf-8')
                : (function (g) {
                    var o,
                      p,
                      d,
                      E,
                      U,
                      x = g.length,
                      O = 0
                    for (E = 0; E < x; E++)
                      (64512 & (p = g.charCodeAt(E))) == 55296 &&
                        E + 1 < x &&
                        (64512 & (d = g.charCodeAt(E + 1))) == 56320 &&
                        ((p = 65536 + ((p - 55296) << 10) + (d - 56320)), E++),
                        (O += p < 128 ? 1 : p < 2048 ? 2 : p < 65536 ? 3 : 4)
                    for (
                      o = f.uint8array ? new Uint8Array(O) : new Array(O),
                        E = U = 0;
                      U < O;
                      E++
                    )
                      (64512 & (p = g.charCodeAt(E))) == 55296 &&
                        E + 1 < x &&
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
                return f.nodebuffer
                  ? h.transformTo('nodebuffer', l).toString('utf-8')
                  : (function (g) {
                      var o,
                        p,
                        d,
                        E,
                        U = g.length,
                        x = new Array(2 * U)
                      for (o = p = 0; o < U; )
                        if ((d = g[o++]) < 128) x[p++] = d
                        else if (4 < (E = r[d])) (x[p++] = 65533), (o += E - 1)
                        else {
                          for (
                            d &= E === 2 ? 31 : E === 3 ? 15 : 7;
                            1 < E && o < U;

                          )
                            (d = (d << 6) | (63 & g[o++])), E--
                          1 < E
                            ? (x[p++] = 65533)
                            : d < 65536
                            ? (x[p++] = d)
                            : ((d -= 65536),
                              (x[p++] = 55296 | ((d >> 10) & 1023)),
                              (x[p++] = 56320 | (1023 & d)))
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
                        f.uint8array ? 'uint8array' : 'array',
                        l
                      ))
                    )
              }),
              h.inherits(b, _),
              (b.prototype.processChunk = function (l) {
                var g = h.transformTo(
                  f.uint8array ? 'uint8array' : 'array',
                  l.data
                )
                if (this.leftOver && this.leftOver.length) {
                  if (f.uint8array) {
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
                  d = g
                p !== g.length &&
                  (f.uint8array
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
              f = m('./base64'),
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
                  x = o.length
                if (x <= d) return String.fromCharCode.apply(null, o)
                for (; U < x; )
                  p === 'array' || p === 'nodebuffer'
                    ? E.push(
                        String.fromCharCode.apply(
                          null,
                          o.slice(U, Math.min(U + d, x))
                        )
                      )
                    : E.push(
                        String.fromCharCode.apply(
                          null,
                          o.subarray(U, Math.min(U + d, x))
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
                              ? (x = f.decode(x))
                              : d &&
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
              f = m('./utils'),
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
                      f.pretty(T) +
                      ', expected ' +
                      f.pretty(b) +
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
                  l = f.transformTo(T, b)
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
                  this.diskNumber === f.MAX_VALUE_16BITS ||
                    this.diskWithCentralDirStart === f.MAX_VALUE_16BITS ||
                    this.centralDirRecordsOnThisDisk === f.MAX_VALUE_16BITS ||
                    this.centralDirRecords === f.MAX_VALUE_16BITS ||
                    this.centralDirSize === f.MAX_VALUE_32BITS ||
                    this.centralDirOffset === f.MAX_VALUE_32BITS)
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
              f = m('./utils'),
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
                      f.pretty(this.compressionMethod) +
                      ' unknown (inner file : ' +
                      f.transformTo('string', this.fileName) +
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
                  this.uncompressedSize === f.MAX_VALUE_32BITS &&
                    (this.uncompressedSize = l.readInt(8)),
                    this.compressedSize === f.MAX_VALUE_32BITS &&
                      (this.compressedSize = l.readInt(8)),
                    this.localHeaderOffset === f.MAX_VALUE_32BITS &&
                      (this.localHeaderOffset = l.readInt(8)),
                    this.diskNumberStart === f.MAX_VALUE_32BITS &&
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
                    var o = f.transformTo(l, this.fileName)
                    this.fileNameStr = this.loadOptions.decodeFileName(o)
                  }
                  var p = this.findExtraFieldUnicodeComment()
                  if (p !== null) this.fileCommentStr = p
                  else {
                    var d = f.transformTo(l, this.fileComment)
                    this.fileCommentStr = this.loadOptions.decodeFileName(d)
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
            var f = m('./stream/StreamHelper'),
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
                  var d = (p = g.toLowerCase()) === 'string' || p === 'text'
                  ;(p !== 'binarystring' && p !== 'text') || (p = 'string'),
                    (o = this._decompressWorker())
                  var E = !this._dataBinary
                  E && !d && (o = o.pipe(new _.Utf8EncodeWorker())),
                    !E && d && (o = o.pipe(new _.Utf8DecodeWorker()))
                } catch (U) {
                  ;(o = new L('error')).error(U)
                }
                return new f(o, p, '')
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
              var f,
                s,
                _ = h.MutationObserver || h.WebKitMutationObserver
              if (_) {
                var r = 0,
                  L = new _(g),
                  b = h.document.createTextNode('')
                L.observe(b, { characterData: !0 }),
                  (f = function () {
                    b.data = r = ++r % 2
                  })
              } else if (h.setImmediate || h.MessageChannel === void 0)
                f =
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
                  (f = function () {
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
              B.exports = function (o) {
                l.push(o) !== 1 || s || f()
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
            function f() {}
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
                d !== f && o(this, d)
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
              h(function () {
                var x
                try {
                  x = E(U)
                } catch (O) {
                  return s.reject(d, O)
                }
                x === d
                  ? s.reject(
                      d,
                      new TypeError('Cannot resolve promise with itself')
                    )
                  : s.resolve(d, x)
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
              function x(G) {
                U || ((U = !0), s.reject(d, G))
              }
              function O(G) {
                U || ((U = !0), s.resolve(d, G))
              }
              var q = p(function () {
                E(O, x)
              })
              q.status === 'error' && x(q.value)
            }
            function p(d, E) {
              var U = {}
              try {
                ;(U.value = d(E)), (U.status = 'success')
              } catch (x) {
                ;(U.status = 'error'), (U.value = x)
              }
              return U
            }
            ;((B.exports = b).prototype.finally = function (d) {
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
                var U = new this.constructor(f)
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
                var x = U.value
                if (x) o(d, x)
                else {
                  ;(d.state = r), (d.outcome = E)
                  for (var O = -1, q = d.queue.length; ++O < q; )
                    d.queue[O].callFulfilled(E)
                }
                return d
              }),
              (s.reject = function (d, E) {
                ;(d.state = _), (d.outcome = E)
                for (var U = -1, x = d.queue.length; ++U < x; )
                  d.queue[U].callRejected(E)
                return d
              }),
              (b.resolve = function (d) {
                return d instanceof this ? d : s.resolve(new this(f), d)
              }),
              (b.reject = function (d) {
                var E = new this(f)
                return s.reject(E, d)
              }),
              (b.all = function (d) {
                var E = this
                if (Object.prototype.toString.call(d) !== '[object Array]')
                  return this.reject(new TypeError('must be an array'))
                var U = d.length,
                  x = !1
                if (!U) return this.resolve([])
                for (
                  var O = new Array(U), q = 0, G = -1, Q = new this(f);
                  ++G < U;

                )
                  z(d[G], G)
                return Q
                function z(X, lt) {
                  E.resolve(X).then(
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
              (b.race = function (d) {
                var E = this
                if (Object.prototype.toString.call(d) !== '[object Array]')
                  return this.reject(new TypeError('must be an array'))
                var U = d.length,
                  x = !1
                if (!U) return this.resolve([])
                for (var O = -1, q = new this(f); ++O < U; )
                  (G = d[O]),
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
              f = m('./utils/common'),
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
              this.options = f.assign(
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
            function p(d, E) {
              var U = new o(E)
              if ((U.push(d, !0), U.err)) throw U.msg || _[U.err]
              return U.result
            }
            ;(o.prototype.push = function (d, E) {
              var U,
                x,
                O = this.strm,
                q = this.options.chunkSize
              if (this.ended) return !1
              ;(x = E === ~~E ? E : E === !0 ? 4 : 0),
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
                    ((O.output = new f.Buf8(q)),
                    (O.next_out = 0),
                    (O.avail_out = q)),
                  (U = h.deflate(O, x)) !== 1 && U !== b)
                )
                  return this.onEnd(U), !(this.ended = !0)
                ;(O.avail_out !== 0 &&
                  (O.avail_in !== 0 || (x !== 4 && x !== 2))) ||
                  (this.options.to === 'string'
                    ? this.onData(
                        s.buf2binstring(f.shrinkBuf(O.output, O.next_out))
                      )
                    : this.onData(f.shrinkBuf(O.output, O.next_out)))
              } while ((0 < O.avail_in || O.avail_out === 0) && U !== 1)
              return x === 4
                ? ((U = h.deflateEnd(this.strm)),
                  this.onEnd(U),
                  (this.ended = !0),
                  U === b)
                : x !== 2 || (this.onEnd(b), !(O.avail_out = 0))
            }),
              (o.prototype.onData = function (d) {
                this.chunks.push(d)
              }),
              (o.prototype.onEnd = function (d) {
                d === b &&
                  (this.options.to === 'string'
                    ? (this.result = this.chunks.join(''))
                    : (this.result = f.flattenChunks(this.chunks))),
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
          function (m, B, v) {
            var h = m('./zlib/inflate'),
              f = m('./utils/common'),
              s = m('./utils/strings'),
              _ = m('./zlib/constants'),
              r = m('./zlib/messages'),
              L = m('./zlib/zstream'),
              b = m('./zlib/gzheader'),
              T = Object.prototype.toString
            function l(o) {
              if (!(this instanceof l)) return new l(o)
              this.options = f.assign(
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
              var d = h.inflateInit2(this.strm, p.windowBits)
              if (d !== _.Z_OK) throw new Error(r[d])
              ;(this.header = new b()),
                h.inflateGetHeader(this.strm, this.header)
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
                x,
                O,
                q,
                G = this.strm,
                Q = this.options.chunkSize,
                z = this.options.dictionary,
                X = !1
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
                    ((G.output = new f.Buf8(Q)),
                    (G.next_out = 0),
                    (G.avail_out = Q)),
                  (d = h.inflate(G, _.Z_NO_FLUSH)) === _.Z_NEED_DICT &&
                    z &&
                    ((q =
                      typeof z == 'string'
                        ? s.string2buf(z)
                        : T.call(z) === '[object ArrayBuffer]'
                        ? new Uint8Array(z)
                        : z),
                    (d = h.inflateSetDictionary(this.strm, q))),
                  d === _.Z_BUF_ERROR && X === !0 && ((d = _.Z_OK), (X = !1)),
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
                        (x = G.next_out - U),
                        (O = s.buf2string(G.output, U)),
                        (G.next_out = x),
                        (G.avail_out = Q - x),
                        x && f.arraySet(G.output, G.output, U, x, 0),
                        this.onData(O))
                      : this.onData(f.shrinkBuf(G.output, G.next_out)))),
                  G.avail_in === 0 && G.avail_out === 0 && (X = !0)
              } while (
                (0 < G.avail_in || G.avail_out === 0) &&
                d !== _.Z_STREAM_END
              )
              return (
                d === _.Z_STREAM_END && (E = _.Z_FINISH),
                E === _.Z_FINISH
                  ? ((d = h.inflateEnd(this.strm)),
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
                    : (this.result = f.flattenChunks(this.chunks))),
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
            var f = {
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
                  v.assign(v, f))
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
              f = !0,
              s = !0
            try {
              String.fromCharCode.apply(null, [0])
            } catch {
              f = !1
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
              if (T < 65537 && ((b.subarray && s) || (!b.subarray && f)))
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
                  d = b.length,
                  E = 0
                for (o = 0; o < d; o++)
                  (64512 & (l = b.charCodeAt(o))) == 55296 &&
                    o + 1 < d &&
                    (64512 & (g = b.charCodeAt(o + 1))) == 56320 &&
                    ((l = 65536 + ((l - 55296) << 10) + (g - 56320)), o++),
                    (E += l < 128 ? 1 : l < 2048 ? 2 : l < 65536 ? 3 : 4)
                for (T = new h.Buf8(E), o = p = 0; p < E; o++)
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
          function (m, B, v) {
            B.exports = function (h, f, s, _) {
              for (
                var r = (65535 & h) | 0, L = ((h >>> 16) & 65535) | 0, b = 0;
                s !== 0;

              ) {
                for (
                  s -= b = 2e3 < s ? 2e3 : s;
                  (L = (L + (r = (r + f[_++]) | 0)) | 0), --b;

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
              for (var f, s = [], _ = 0; _ < 256; _++) {
                f = _
                for (var r = 0; r < 8; r++)
                  f = 1 & f ? 3988292384 ^ (f >>> 1) : f >>> 1
                s[_] = f
              }
              return s
            })()
            B.exports = function (f, s, _, r) {
              var L = h,
                b = r + _
              f ^= -1
              for (var T = r; T < b; T++) f = (f >>> 8) ^ L[255 & (f ^ s[T])]
              return -1 ^ f
            }
          },
          {}
        ],
        46: [
          function (m, B, v) {
            var h,
              f = m('../utils/common'),
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
              x = 286,
              O = 30,
              q = 19,
              G = 2 * x + 1,
              Q = 15,
              z = 3,
              X = 258,
              lt = X + z + 1,
              w = 42,
              I = 113,
              i = 1,
              A = 2,
              rt = 3,
              k = 4
            function $(n, Z) {
              return (n.msg = L[Z]), Z
            }
            function M(n) {
              return (n << 1) - (4 < n ? 9 : 0)
            }
            function H(n) {
              for (var Z = n.length; 0 <= --Z; ) n[Z] = 0
            }
            function D(n) {
              var Z = n.state,
                j = Z.pending
              j > n.avail_out && (j = n.avail_out),
                j !== 0 &&
                  (f.arraySet(
                    n.output,
                    Z.pending_buf,
                    Z.pending_out,
                    j,
                    n.next_out
                  ),
                  (n.next_out += j),
                  (Z.pending_out += j),
                  (n.total_out += j),
                  (n.avail_out -= j),
                  (Z.pending -= j),
                  Z.pending === 0 && (Z.pending_out = 0))
            }
            function F(n, Z) {
              s._tr_flush_block(
                n,
                0 <= n.block_start ? n.block_start : -1,
                n.strstart - n.block_start,
                Z
              ),
                (n.block_start = n.strstart),
                D(n.strm)
            }
            function ot(n, Z) {
              n.pending_buf[n.pending++] = Z
            }
            function tt(n, Z) {
              ;(n.pending_buf[n.pending++] = (Z >>> 8) & 255),
                (n.pending_buf[n.pending++] = 255 & Z)
            }
            function W(n, Z) {
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
                dt = n.strstart + X,
                St = nt[S + V - 1],
                gt = nt[S + V]
              n.prev_length >= n.good_match && (u >>= 2),
                J > n.lookahead && (J = n.lookahead)
              do
                if (
                  nt[(j = Z) + V] === gt &&
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
                    S < dt
                  )
                  if (((N = X - (dt - S)), (S = dt - X), V < N)) {
                    if (((n.match_start = Z), J <= (V = N))) break
                    ;(St = nt[S + V - 1]), (gt = nt[S + V])
                  }
                }
              while ((Z = it[Z & st]) > C && --u != 0)
              return V <= n.lookahead ? V : n.lookahead
            }
            function bt(n) {
              var Z,
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
                    f.arraySet(n.window, n.window, it, it, 0),
                      n.match_start -= it,
                      n.strstart -= it,
                      n.block_start -= it,
                      Z = j = n.hash_size;
                    (N = n.head[--Z]), (n.head[Z] = it <= N ? N - it : 0), --j;

                  );
                  for (
                    Z = j = it;
                    (N = n.prev[--Z]), (n.prev[Z] = it <= N ? N - it : 0), --j;

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
                        f.arraySet(J, V.input, V.next_in, st, C),
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
            function wt(n, Z) {
              for (var j, N; ; ) {
                if (n.lookahead < lt) {
                  if ((bt(n), n.lookahead < lt && Z === b)) return i
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
                    (n.match_length = W(n, j)),
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
                Z === T
                  ? (F(n, !0), n.strm.avail_out === 0 ? rt : k)
                  : n.last_lit && (F(n, !1), n.strm.avail_out === 0)
                  ? i
                  : A
              )
            }
            function ft(n, Z) {
              for (var j, N, u; ; ) {
                if (n.lookahead < lt) {
                  if ((bt(n), n.lookahead < lt && Z === b)) return i
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
                    ((n.match_length = W(n, j)),
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
                Z === T
                  ? (F(n, !0), n.strm.avail_out === 0 ? rt : k)
                  : n.last_lit && (F(n, !1), n.strm.avail_out === 0)
                  ? i
                  : A
              )
            }
            function ht(n, Z, j, N, u) {
              ;(this.good_length = n),
                (this.max_lazy = Z),
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
                (this.dyn_ltree = new f.Buf16(2 * G)),
                (this.dyn_dtree = new f.Buf16(2 * (2 * O + 1))),
                (this.bl_tree = new f.Buf16(2 * (2 * q + 1))),
                H(this.dyn_ltree),
                H(this.dyn_dtree),
                H(this.bl_tree),
                (this.l_desc = null),
                (this.d_desc = null),
                (this.bl_desc = null),
                (this.bl_count = new f.Buf16(Q + 1)),
                (this.heap = new f.Buf16(2 * x + 1)),
                H(this.heap),
                (this.heap_len = 0),
                (this.heap_max = 0),
                (this.depth = new f.Buf16(2 * x + 1)),
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
            function vt(n) {
              var Z
              return n && n.state
                ? ((n.total_in = n.total_out = 0),
                  (n.data_type = d),
                  ((Z = n.state).pending = 0),
                  (Z.pending_out = 0),
                  Z.wrap < 0 && (Z.wrap = -Z.wrap),
                  (Z.status = Z.wrap ? w : I),
                  (n.adler = Z.wrap === 2 ? 0 : 1),
                  (Z.last_flush = b),
                  s._tr_init(Z),
                  l)
                : $(n, g)
            }
            function At(n) {
              var Z = vt(n)
              return (
                Z === l &&
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
                Z
              )
            }
            function Ot(n, Z, j, N, u, S) {
              if (!n) return g
              var V = 1
              if (
                (Z === o && (Z = 6),
                N < 0 ? ((V = 0), (N = -N)) : 15 < N && ((V = 2), (N -= 16)),
                u < 1 ||
                  U < u ||
                  j !== E ||
                  N < 8 ||
                  15 < N ||
                  Z < 0 ||
                  9 < Z ||
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
                (J.window = new f.Buf8(2 * J.w_size)),
                (J.head = new f.Buf16(J.hash_size)),
                (J.prev = new f.Buf16(J.w_size)),
                (J.lit_bufsize = 1 << (u + 6)),
                (J.pending_buf_size = 4 * J.lit_bufsize),
                (J.pending_buf = new f.Buf8(J.pending_buf_size)),
                (J.d_buf = 1 * J.lit_bufsize),
                (J.l_buf = 3 * J.lit_bufsize),
                (J.level = Z),
                (J.strategy = S),
                (J.method = j),
                At(n)
              )
            }
            ;(h = [
              new ht(0, 0, 0, 0, function (n, Z) {
                var j = 65535
                for (
                  j > n.pending_buf_size - 5 && (j = n.pending_buf_size - 5);
                  ;

                ) {
                  if (n.lookahead <= 1) {
                    if ((bt(n), n.lookahead === 0 && Z === b)) return i
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
                  Z === T
                    ? (F(n, !0), n.strm.avail_out === 0 ? rt : k)
                    : (n.strstart > n.block_start &&
                        (F(n, !1), n.strm.avail_out),
                      i)
                )
              }),
              new ht(4, 4, 8, 4, wt),
              new ht(4, 5, 16, 8, wt),
              new ht(4, 6, 32, 32, wt),
              new ht(4, 4, 16, 16, ft),
              new ht(8, 16, 32, 32, ft),
              new ht(8, 16, 128, 128, ft),
              new ht(8, 32, 128, 256, ft),
              new ht(32, 128, 258, 1024, ft),
              new ht(32, 258, 258, 4096, ft)
            ]),
              (v.deflateInit = function (n, Z) {
                return Ot(n, Z, E, 15, 8, 0)
              }),
              (v.deflateInit2 = Ot),
              (v.deflateReset = At),
              (v.deflateResetKeep = vt),
              (v.deflateSetHeader = function (n, Z) {
                return n && n.state
                  ? n.state.wrap !== 2
                    ? g
                    : ((n.state.gzhead = Z), l)
                  : g
              }),
              (v.deflate = function (n, Z) {
                var j, N, u, S
                if (!n || !n.state || 5 < Z || Z < 0) return n ? $(n, g) : g
                if (
                  ((N = n.state),
                  !n.output ||
                    (!n.input && n.avail_in !== 0) ||
                    (N.status === 666 && Z !== T))
                )
                  return $(n, n.avail_out === 0 ? -5 : g)
                if (
                  ((N.strm = n),
                  (j = N.last_flush),
                  (N.last_flush = Z),
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
                          (N.status = I))
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
                      (N.status = I),
                      tt(N, V),
                      N.strstart !== 0 &&
                        (tt(N, n.adler >>> 16), tt(N, 65535 & n.adler)),
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
                          (N.status = I)))
                      : (N.status = I)),
                  N.pending !== 0)
                ) {
                  if ((D(n), n.avail_out === 0)) return (N.last_flush = -1), l
                } else if (n.avail_in === 0 && M(Z) <= M(j) && Z !== T)
                  return $(n, -5)
                if (N.status === 666 && n.avail_in !== 0) return $(n, -5)
                if (
                  n.avail_in !== 0 ||
                  N.lookahead !== 0 ||
                  (Z !== b && N.status !== 666)
                ) {
                  var J =
                    N.strategy === 2
                      ? (function (C, nt) {
                          for (var st; ; ) {
                            if (
                              C.lookahead === 0 &&
                              (bt(C), C.lookahead === 0)
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
                              ? (F(C, !0), C.strm.avail_out === 0 ? rt : k)
                              : C.last_lit && (F(C, !1), C.strm.avail_out === 0)
                              ? i
                              : A
                          )
                        })(N, Z)
                      : N.strategy === 3
                      ? (function (C, nt) {
                          for (var st, it, dt, St, gt = C.window; ; ) {
                            if (C.lookahead <= X) {
                              if ((bt(C), C.lookahead <= X && nt === b))
                                return i
                              if (C.lookahead === 0) break
                            }
                            if (
                              ((C.match_length = 0),
                              C.lookahead >= z &&
                                0 < C.strstart &&
                                (it = gt[(dt = C.strstart - 1)]) === gt[++dt] &&
                                it === gt[++dt] &&
                                it === gt[++dt])
                            ) {
                              St = C.strstart + X
                              do;
                              while (
                                it === gt[++dt] &&
                                it === gt[++dt] &&
                                it === gt[++dt] &&
                                it === gt[++dt] &&
                                it === gt[++dt] &&
                                it === gt[++dt] &&
                                it === gt[++dt] &&
                                it === gt[++dt] &&
                                dt < St
                              )
                              ;(C.match_length = X - (St - dt)),
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
                              ? (F(C, !0), C.strm.avail_out === 0 ? rt : k)
                              : C.last_lit && (F(C, !1), C.strm.avail_out === 0)
                              ? i
                              : A
                          )
                        })(N, Z)
                      : h[N.level].func(N, Z)
                  if (
                    ((J !== rt && J !== k) || (N.status = 666),
                    J === i || J === rt)
                  )
                    return n.avail_out === 0 && (N.last_flush = -1), l
                  if (
                    J === A &&
                    (Z === 1
                      ? s._tr_align(N)
                      : Z !== 5 &&
                        (s._tr_stored_block(N, 0, 0, !1),
                        Z === 3 &&
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
                return Z !== T
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
                      : (tt(N, n.adler >>> 16), tt(N, 65535 & n.adler)),
                    D(n),
                    0 < N.wrap && (N.wrap = -N.wrap),
                    N.pending !== 0 ? l : 1)
              }),
              (v.deflateEnd = function (n) {
                var Z
                return n && n.state
                  ? (Z = n.state.status) !== w &&
                    Z !== 69 &&
                    Z !== 73 &&
                    Z !== 91 &&
                    Z !== 103 &&
                    Z !== I &&
                    Z !== 666
                    ? $(n, g)
                    : ((n.state = null), Z === I ? $(n, -3) : l)
                  : g
              }),
              (v.deflateSetDictionary = function (n, Z) {
                var j,
                  N,
                  u,
                  S,
                  V,
                  J,
                  C,
                  nt,
                  st = Z.length
                if (
                  !n ||
                  !n.state ||
                  (S = (j = n.state).wrap) === 2 ||
                  (S === 1 && j.status !== w) ||
                  j.lookahead
                )
                  return g
                for (
                  S === 1 && (n.adler = _(n.adler, Z, st, 0)),
                    j.wrap = 0,
                    st >= j.w_size &&
                      (S === 0 &&
                        (H(j.head),
                        (j.strstart = 0),
                        (j.block_start = 0),
                        (j.insert = 0)),
                      (nt = new f.Buf8(j.w_size)),
                      f.arraySet(nt, Z, st - j.w_size, j.w_size, 0),
                      (Z = nt),
                      (st = j.w_size)),
                    V = n.avail_in,
                    J = n.next_in,
                    C = n.input,
                    n.avail_in = st,
                    n.next_in = 0,
                    n.input = Z,
                    bt(j);
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
                  ;(j.strstart = N), (j.lookahead = z - 1), bt(j)
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
            B.exports = function (h, f) {
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
                x,
                O,
                q,
                G,
                Q,
                z,
                X,
                lt,
                w,
                I,
                i,
                A
              ;(s = h.state),
                (_ = h.next_in),
                (i = h.input),
                (r = _ + (h.avail_in - 5)),
                (L = h.next_out),
                (A = h.output),
                (b = L - (f - h.avail_out)),
                (T = L + (h.avail_out - 257)),
                (l = s.dmax),
                (g = s.wsize),
                (o = s.whave),
                (p = s.wnext),
                (d = s.window),
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
                    ;(X = 65535 & Q),
                      (z &= 15) &&
                        (U < z && ((E += i[_++] << U), (U += 8)),
                        (X += E & ((1 << z) - 1)),
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
                        if (((I = d), (w = 0) === p)) {
                          if (((w += g - z), z < X)) {
                            for (X -= z; (A[L++] = d[w++]), --z; );
                            ;(w = L - lt), (I = A)
                          }
                        } else if (p < z) {
                          if (((w += g + p - z), (z -= p) < X)) {
                            for (X -= z; (A[L++] = d[w++]), --z; );
                            if (((w = 0), p < X)) {
                              for (X -= z = p; (A[L++] = d[w++]), --z; );
                              ;(w = L - lt), (I = A)
                            }
                          }
                        } else if (((w += p - z), z < X)) {
                          for (X -= z; (A[L++] = d[w++]), --z; );
                          ;(w = L - lt), (I = A)
                        }
                        for (; 2 < X; )
                          (A[L++] = I[w++]),
                            (A[L++] = I[w++]),
                            (A[L++] = I[w++]),
                            (X -= 3)
                        X && ((A[L++] = I[w++]), 1 < X && (A[L++] = I[w++]))
                      } else {
                        for (
                          w = L - lt;
                          (A[L++] = A[w++]),
                            (A[L++] = A[w++]),
                            (A[L++] = A[w++]),
                            2 < (X -= 3);

                        );
                        X && ((A[L++] = A[w++]), 1 < X && (A[L++] = A[w++]))
                      }
                      break
                    }
                  }
                  break
                }
              } while (_ < r && L < T)
              ;(_ -= X = U >> 3),
                (E &= (1 << (U -= X << 3)) - 1),
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
              f = m('./adler32'),
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
                (this.lens = new h.Buf16(320)),
                (this.work = new h.Buf16(288)),
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
                  (I.mode = g),
                  (I.last = 0),
                  (I.havedict = 0),
                  (I.dmax = 32768),
                  (I.head = null),
                  (I.hold = 0),
                  (I.bits = 0),
                  (I.lencode = I.lendyn = new h.Buf32(o)),
                  (I.distcode = I.distdyn = new h.Buf32(p)),
                  (I.sane = 1),
                  (I.back = -1),
                  T)
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
            function O(w, I) {
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
            function q(w, I) {
              var i, A
              return w
                ? ((A = new E()),
                  ((w.state = A).window = null),
                  (i = O(w, I)) !== T && (w.state = null),
                  i)
                : l
            }
            var G,
              Q,
              z = !0
            function X(w) {
              if (z) {
                var I
                for (
                  G = new h.Buf32(512), Q = new h.Buf32(32), I = 0;
                  I < 144;

                )
                  w.lens[I++] = 8
                for (; I < 256; ) w.lens[I++] = 9
                for (; I < 280; ) w.lens[I++] = 7
                for (; I < 288; ) w.lens[I++] = 8
                for (
                  r(L, w.lens, 0, 288, G, 0, w.work, { bits: 9 }), I = 0;
                  I < 32;

                )
                  w.lens[I++] = 5
                r(b, w.lens, 0, 32, Q, 0, w.work, { bits: 5 }), (z = !1)
              }
              ;(w.lencode = G),
                (w.lenbits = 9),
                (w.distcode = Q),
                (w.distbits = 5)
            }
            function lt(w, I, i, A) {
              var rt,
                k = w.state
              return (
                k.window === null &&
                  ((k.wsize = 1 << k.wbits),
                  (k.wnext = 0),
                  (k.whave = 0),
                  (k.window = new h.Buf8(k.wsize))),
                A >= k.wsize
                  ? (h.arraySet(k.window, I, i - k.wsize, k.wsize, 0),
                    (k.wnext = 0),
                    (k.whave = k.wsize))
                  : (A < (rt = k.wsize - k.wnext) && (rt = A),
                    h.arraySet(k.window, I, i - A, rt, k.wnext),
                    (A -= rt)
                      ? (h.arraySet(k.window, I, i - A, A, 0),
                        (k.wnext = A),
                        (k.whave = k.wsize))
                      : ((k.wnext += rt),
                        k.wnext === k.wsize && (k.wnext = 0),
                        k.whave < k.wsize && (k.whave += rt))),
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
              (v.inflate = function (w, I) {
                var i,
                  A,
                  rt,
                  k,
                  $,
                  M,
                  H,
                  D,
                  F,
                  ot,
                  tt,
                  W,
                  bt,
                  wt,
                  ft,
                  ht,
                  Nt,
                  vt,
                  At,
                  Ot,
                  n,
                  Z,
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
                  (k = w.next_in),
                  (A = w.input),
                  (M = w.avail_in),
                  (D = i.hold),
                  (F = i.bits),
                  (ot = M),
                  (tt = H),
                  (Z = T)
                t: for (;;)
                  switch (i.mode) {
                    case g:
                      if (i.wrap === 0) {
                        i.mode = 13
                        break
                      }
                      for (; F < 16; ) {
                        if (M === 0) break t
                        M--, (D += A[k++] << F), (F += 8)
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
                        M--, (D += A[k++] << F), (F += 8)
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
                        M--, (D += A[k++] << F), (F += 8)
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
                        M--, (D += A[k++] << F), (F += 8)
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
                          M--, (D += A[k++] << F), (F += 8)
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
                        (M < (W = i.length) && (W = M),
                        W &&
                          (i.head &&
                            ((n = i.head.extra_len - i.length),
                            i.head.extra ||
                              (i.head.extra = new Array(i.head.extra_len)),
                            h.arraySet(i.head.extra, A, k, W, n)),
                          512 & i.flags && (i.check = s(i.check, A, W, k)),
                          (M -= W),
                          (k += W),
                          (i.length -= W)),
                        i.length)
                      )
                        break t
                      ;(i.length = 0), (i.mode = 7)
                    case 7:
                      if (2048 & i.flags) {
                        if (M === 0) break t
                        for (
                          W = 0;
                          (n = A[k + W++]),
                            i.head &&
                              n &&
                              i.length < 65536 &&
                              (i.head.name += String.fromCharCode(n)),
                            n && W < M;

                        );
                        if (
                          (512 & i.flags && (i.check = s(i.check, A, W, k)),
                          (M -= W),
                          (k += W),
                          n)
                        )
                          break t
                      } else i.head && (i.head.name = null)
                      ;(i.length = 0), (i.mode = 8)
                    case 8:
                      if (4096 & i.flags) {
                        if (M === 0) break t
                        for (
                          W = 0;
                          (n = A[k + W++]),
                            i.head &&
                              n &&
                              i.length < 65536 &&
                              (i.head.comment += String.fromCharCode(n)),
                            n && W < M;

                        );
                        if (
                          (512 & i.flags && (i.check = s(i.check, A, W, k)),
                          (M -= W),
                          (k += W),
                          n)
                        )
                          break t
                      } else i.head && (i.head.comment = null)
                      i.mode = 9
                    case 9:
                      if (512 & i.flags) {
                        for (; F < 16; ) {
                          if (M === 0) break t
                          M--, (D += A[k++] << F), (F += 8)
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
                        M--, (D += A[k++] << F), (F += 8)
                      }
                      ;(w.adler = i.check = d(D)), (F = D = 0), (i.mode = 11)
                    case 11:
                      if (i.havedict === 0)
                        return (
                          (w.next_out = $),
                          (w.avail_out = H),
                          (w.next_in = k),
                          (w.avail_in = M),
                          (i.hold = D),
                          (i.bits = F),
                          2
                        )
                      ;(w.adler = i.check = 1), (i.mode = 12)
                    case 12:
                      if (I === 5 || I === 6) break t
                    case 13:
                      if (i.last) {
                        ;(D >>>= 7 & F), (F -= 7 & F), (i.mode = 27)
                        break
                      }
                      for (; F < 3; ) {
                        if (M === 0) break t
                        M--, (D += A[k++] << F), (F += 8)
                      }
                      switch (((i.last = 1 & D), (F -= 1), 3 & (D >>>= 1))) {
                        case 0:
                          i.mode = 14
                          break
                        case 1:
                          if ((X(i), (i.mode = 20), I !== 6)) break
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
                        M--, (D += A[k++] << F), (F += 8)
                      }
                      if ((65535 & D) != ((D >>> 16) ^ 65535)) {
                        ;(w.msg = 'invalid stored block lengths'), (i.mode = 30)
                        break
                      }
                      if (
                        ((i.length = 65535 & D),
                        (F = D = 0),
                        (i.mode = 15),
                        I === 6)
                      )
                        break t
                    case 15:
                      i.mode = 16
                    case 16:
                      if ((W = i.length)) {
                        if ((M < W && (W = M), H < W && (W = H), W === 0))
                          break t
                        h.arraySet(rt, A, k, W, $),
                          (M -= W),
                          (k += W),
                          (H -= W),
                          ($ += W),
                          (i.length -= W)
                        break
                      }
                      i.mode = 12
                      break
                    case 17:
                      for (; F < 14; ) {
                        if (M === 0) break t
                        M--, (D += A[k++] << F), (F += 8)
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
                          M--, (D += A[k++] << F), (F += 8)
                        }
                        ;(i.lens[V[i.have++]] = 7 & D), (D >>>= 3), (F -= 3)
                      }
                      for (; i.have < 19; ) i.lens[V[i.have++]] = 0
                      if (
                        ((i.lencode = i.lendyn),
                        (i.lenbits = 7),
                        (j = { bits: i.lenbits }),
                        (Z = r(0, i.lens, 0, 19, i.lencode, 0, i.work, j)),
                        (i.lenbits = j.bits),
                        Z)
                      ) {
                        ;(w.msg = 'invalid code lengths set'), (i.mode = 30)
                        break
                      }
                      ;(i.have = 0), (i.mode = 19)
                    case 19:
                      for (; i.have < i.nlen + i.ndist; ) {
                        for (
                          ;
                          (ht =
                            ((u = i.lencode[D & ((1 << i.lenbits) - 1)]) >>>
                              16) &
                            255),
                            (Nt = 65535 & u),
                            !((ft = u >>> 24) <= F);

                        ) {
                          if (M === 0) break t
                          M--, (D += A[k++] << F), (F += 8)
                        }
                        if (Nt < 16)
                          (D >>>= ft), (F -= ft), (i.lens[i.have++] = Nt)
                        else {
                          if (Nt === 16) {
                            for (N = ft + 2; F < N; ) {
                              if (M === 0) break t
                              M--, (D += A[k++] << F), (F += 8)
                            }
                            if (((D >>>= ft), (F -= ft), i.have === 0)) {
                              ;(w.msg = 'invalid bit length repeat'),
                                (i.mode = 30)
                              break
                            }
                            ;(n = i.lens[i.have - 1]),
                              (W = 3 + (3 & D)),
                              (D >>>= 2),
                              (F -= 2)
                          } else if (Nt === 17) {
                            for (N = ft + 3; F < N; ) {
                              if (M === 0) break t
                              M--, (D += A[k++] << F), (F += 8)
                            }
                            ;(F -= ft),
                              (n = 0),
                              (W = 3 + (7 & (D >>>= ft))),
                              (D >>>= 3),
                              (F -= 3)
                          } else {
                            for (N = ft + 7; F < N; ) {
                              if (M === 0) break t
                              M--, (D += A[k++] << F), (F += 8)
                            }
                            ;(F -= ft),
                              (n = 0),
                              (W = 11 + (127 & (D >>>= ft))),
                              (D >>>= 7),
                              (F -= 7)
                          }
                          if (i.have + W > i.nlen + i.ndist) {
                            ;(w.msg = 'invalid bit length repeat'),
                              (i.mode = 30)
                            break
                          }
                          for (; W--; ) i.lens[i.have++] = n
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
                        (Z = r(L, i.lens, 0, i.nlen, i.lencode, 0, i.work, j)),
                        (i.lenbits = j.bits),
                        Z)
                      ) {
                        ;(w.msg = 'invalid literal/lengths set'), (i.mode = 30)
                        break
                      }
                      if (
                        ((i.distbits = 6),
                        (i.distcode = i.distdyn),
                        (j = { bits: i.distbits }),
                        (Z = r(
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
                        Z)
                      ) {
                        ;(w.msg = 'invalid distances set'), (i.mode = 30)
                        break
                      }
                      if (((i.mode = 20), I === 6)) break t
                    case 20:
                      i.mode = 21
                    case 21:
                      if (6 <= M && 258 <= H) {
                        ;(w.next_out = $),
                          (w.avail_out = H),
                          (w.next_in = k),
                          (w.avail_in = M),
                          (i.hold = D),
                          (i.bits = F),
                          _(w, tt),
                          ($ = w.next_out),
                          (rt = w.output),
                          (H = w.avail_out),
                          (k = w.next_in),
                          (A = w.input),
                          (M = w.avail_in),
                          (D = i.hold),
                          (F = i.bits),
                          i.mode === 12 && (i.back = -1)
                        break
                      }
                      for (
                        i.back = 0;
                        (ht =
                          ((u = i.lencode[D & ((1 << i.lenbits) - 1)]) >>> 16) &
                          255),
                          (Nt = 65535 & u),
                          !((ft = u >>> 24) <= F);

                      ) {
                        if (M === 0) break t
                        M--, (D += A[k++] << F), (F += 8)
                      }
                      if (ht && !(240 & ht)) {
                        for (
                          vt = ft, At = ht, Ot = Nt;
                          (ht =
                            ((u =
                              i.lencode[
                                Ot + ((D & ((1 << (vt + At)) - 1)) >> vt)
                              ]) >>>
                              16) &
                            255),
                            (Nt = 65535 & u),
                            !(vt + (ft = u >>> 24) <= F);

                        ) {
                          if (M === 0) break t
                          M--, (D += A[k++] << F), (F += 8)
                        }
                        ;(D >>>= vt), (F -= vt), (i.back += vt)
                      }
                      if (
                        ((D >>>= ft),
                        (F -= ft),
                        (i.back += ft),
                        (i.length = Nt),
                        ht === 0)
                      ) {
                        i.mode = 26
                        break
                      }
                      if (32 & ht) {
                        ;(i.back = -1), (i.mode = 12)
                        break
                      }
                      if (64 & ht) {
                        ;(w.msg = 'invalid literal/length code'), (i.mode = 30)
                        break
                      }
                      ;(i.extra = 15 & ht), (i.mode = 22)
                    case 22:
                      if (i.extra) {
                        for (N = i.extra; F < N; ) {
                          if (M === 0) break t
                          M--, (D += A[k++] << F), (F += 8)
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
                        (ht =
                          ((u = i.distcode[D & ((1 << i.distbits) - 1)]) >>>
                            16) &
                          255),
                          (Nt = 65535 & u),
                          !((ft = u >>> 24) <= F);

                      ) {
                        if (M === 0) break t
                        M--, (D += A[k++] << F), (F += 8)
                      }
                      if (!(240 & ht)) {
                        for (
                          vt = ft, At = ht, Ot = Nt;
                          (ht =
                            ((u =
                              i.distcode[
                                Ot + ((D & ((1 << (vt + At)) - 1)) >> vt)
                              ]) >>>
                              16) &
                            255),
                            (Nt = 65535 & u),
                            !(vt + (ft = u >>> 24) <= F);

                        ) {
                          if (M === 0) break t
                          M--, (D += A[k++] << F), (F += 8)
                        }
                        ;(D >>>= vt), (F -= vt), (i.back += vt)
                      }
                      if (((D >>>= ft), (F -= ft), (i.back += ft), 64 & ht)) {
                        ;(w.msg = 'invalid distance code'), (i.mode = 30)
                        break
                      }
                      ;(i.offset = Nt), (i.extra = 15 & ht), (i.mode = 24)
                    case 24:
                      if (i.extra) {
                        for (N = i.extra; F < N; ) {
                          if (M === 0) break t
                          M--, (D += A[k++] << F), (F += 8)
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
                      if (((W = tt - H), i.offset > W)) {
                        if ((W = i.offset - W) > i.whave && i.sane) {
                          ;(w.msg = 'invalid distance too far back'),
                            (i.mode = 30)
                          break
                        }
                        ;(bt =
                          W > i.wnext
                            ? ((W -= i.wnext), i.wsize - W)
                            : i.wnext - W),
                          W > i.length && (W = i.length),
                          (wt = i.window)
                      } else (wt = rt), (bt = $ - i.offset), (W = i.length)
                      for (
                        H < W && (W = H), H -= W, i.length -= W;
                        (rt[$++] = wt[bt++]), --W;

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
                          M--, (D |= A[k++] << F), (F += 8)
                        }
                        if (
                          ((tt -= H),
                          (w.total_out += tt),
                          (i.total += tt),
                          tt &&
                            (w.adler = i.check =
                              i.flags
                                ? s(i.check, rt, tt, $ - tt)
                                : f(i.check, rt, tt, $ - tt)),
                          (tt = H),
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
                          if (M === 0) break t
                          M--, (D += A[k++] << F), (F += 8)
                        }
                        if (D !== (4294967295 & i.total)) {
                          ;(w.msg = 'incorrect length check'), (i.mode = 30)
                          break
                        }
                        F = D = 0
                      }
                      i.mode = 29
                    case 29:
                      Z = 1
                      break t
                    case 30:
                      Z = -3
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
                  (w.next_in = k),
                  (w.avail_in = M),
                  (i.hold = D),
                  (i.bits = F),
                  (i.wsize ||
                    (tt !== w.avail_out &&
                      i.mode < 30 &&
                      (i.mode < 27 || I !== 4))) &&
                  lt(w, w.output, w.next_out, tt - w.avail_out)
                    ? ((i.mode = 31), -4)
                    : ((ot -= w.avail_in),
                      (tt -= w.avail_out),
                      (w.total_in += ot),
                      (w.total_out += tt),
                      (i.total += tt),
                      i.wrap &&
                        tt &&
                        (w.adler = i.check =
                          i.flags
                            ? s(i.check, rt, tt, w.next_out - tt)
                            : f(i.check, rt, tt, w.next_out - tt)),
                      (w.data_type =
                        i.bits +
                        (i.last ? 64 : 0) +
                        (i.mode === 12 ? 128 : 0) +
                        (i.mode === 20 || i.mode === 15 ? 256 : 0)),
                      ((ot == 0 && tt === 0) || I === 4) && Z === T && (Z = -5),
                      Z)
                )
              }),
              (v.inflateEnd = function (w) {
                if (!w || !w.state) return l
                var I = w.state
                return I.window && (I.window = null), (w.state = null), T
              }),
              (v.inflateGetHeader = function (w, I) {
                var i
                return w && w.state && 2 & (i = w.state).wrap
                  ? (((i.head = I).done = !1), T)
                  : l
              }),
              (v.inflateSetDictionary = function (w, I) {
                var i,
                  A = I.length
                return w && w.state
                  ? (i = w.state).wrap !== 0 && i.mode !== 11
                    ? l
                    : i.mode === 11 && f(1, I, A, 0) !== i.check
                    ? -3
                    : lt(w, I, A, A)
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
              f = [
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
            B.exports = function (L, b, T, l, g, o, p, d) {
              var E,
                U,
                x,
                O,
                q,
                G,
                Q,
                z,
                X,
                lt = d.bits,
                w = 0,
                I = 0,
                i = 0,
                A = 0,
                rt = 0,
                k = 0,
                $ = 0,
                M = 0,
                H = 0,
                D = 0,
                F = null,
                ot = 0,
                tt = new h.Buf16(16),
                W = new h.Buf16(16),
                bt = null,
                wt = 0
              for (w = 0; w <= 15; w++) tt[w] = 0
              for (I = 0; I < l; I++) tt[b[T + I]]++
              for (rt = lt, A = 15; 1 <= A && tt[A] === 0; A--);
              if ((A < rt && (rt = A), A === 0))
                return (g[o++] = 20971520), (g[o++] = 20971520), (d.bits = 1), 0
              for (i = 1; i < A && tt[i] === 0; i++);
              for (rt < i && (rt = i), w = M = 1; w <= 15; w++)
                if (((M <<= 1), (M -= tt[w]) < 0)) return -1
              if (0 < M && (L === 0 || A !== 1)) return -1
              for (W[1] = 0, w = 1; w < 15; w++) W[w + 1] = W[w] + tt[w]
              for (I = 0; I < l; I++) b[T + I] !== 0 && (p[W[b[T + I]]++] = I)
              if (
                ((G =
                  L === 0
                    ? ((F = bt = p), 19)
                    : L === 1
                    ? ((F = f), (ot -= 257), (bt = s), (wt -= 257), 256)
                    : ((F = _), (bt = r), -1)),
                (w = i),
                (q = o),
                ($ = I = D = 0),
                (x = -1),
                (O = (H = 1 << (k = rt)) - 1),
                (L === 1 && 852 < H) || (L === 2 && 592 < H))
              )
                return 1
              for (;;) {
                for (
                  Q = w - $,
                    X =
                      p[I] < G
                        ? ((z = 0), p[I])
                        : p[I] > G
                        ? ((z = bt[wt + p[I]]), F[ot + p[I]])
                        : ((z = 96), 0),
                    E = 1 << (w - $),
                    i = U = 1 << k;
                  (g[q + (D >> $) + (U -= E)] = (Q << 24) | (z << 16) | X | 0),
                    U !== 0;

                );
                for (E = 1 << (w - 1); D & E; ) E >>= 1
                if (
                  (E !== 0 ? ((D &= E - 1), (D += E)) : (D = 0),
                  I++,
                  --tt[w] == 0)
                ) {
                  if (w === A) break
                  w = b[T + p[I]]
                }
                if (rt < w && (D & O) !== x) {
                  for (
                    $ === 0 && ($ = rt), q += i, M = 1 << (k = w - $);
                    k + $ < A && !((M -= tt[k + $]) <= 0);

                  )
                    k++, (M <<= 1)
                  if (
                    ((H += 1 << k),
                    (L === 1 && 852 < H) || (L === 2 && 592 < H))
                  )
                    return 1
                  g[(x = D & O)] = (rt << 24) | (k << 16) | (q - o) | 0
                }
              }
              return (
                D !== 0 && (g[q + D] = ((w - $) << 24) | (64 << 16) | 0),
                (d.bits = rt),
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
              f = 0,
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
              X = [
                16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15
              ],
              lt = new Array(2 * (T + 2))
            _(lt)
            var w = new Array(2 * l)
            _(w)
            var I = new Array(512)
            _(I)
            var i = new Array(256)
            _(i)
            var A = new Array(L)
            _(A)
            var rt,
              k,
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
              return u < 256 ? I[u] : I[256 + (u >>> 7)]
            }
            function ot(u, S) {
              ;(u.pending_buf[u.pending++] = 255 & S),
                (u.pending_buf[u.pending++] = (S >>> 8) & 255)
            }
            function tt(u, S, V) {
              u.bi_valid > d - V
                ? ((u.bi_buf |= (S << u.bi_valid) & 65535),
                  ot(u, u.bi_buf),
                  (u.bi_buf = S >> (d - u.bi_valid)),
                  (u.bi_valid += V - d))
                : ((u.bi_buf |= (S << u.bi_valid) & 65535), (u.bi_valid += V))
            }
            function W(u, S, V) {
              tt(u, V[2 * S], V[2 * S + 1])
            }
            function bt(u, S) {
              for (var V = 0; (V |= 1 & u), (u >>>= 1), (V <<= 1), 0 < --S; );
              return V >>> 1
            }
            function wt(u, S, V) {
              var J,
                C,
                nt = new Array(p + 1),
                st = 0
              for (J = 1; J <= p; J++) nt[J] = st = (st + V[J - 1]) << 1
              for (C = 0; C <= S; C++) {
                var it = u[2 * C + 1]
                it !== 0 && (u[2 * C] = bt(nt[it]++, it))
              }
            }
            function ft(u) {
              var S
              for (S = 0; S < T; S++) u.dyn_ltree[2 * S] = 0
              for (S = 0; S < l; S++) u.dyn_dtree[2 * S] = 0
              for (S = 0; S < g; S++) u.bl_tree[2 * S] = 0
              ;(u.dyn_ltree[2 * U] = 1),
                (u.opt_len = u.static_len = 0),
                (u.last_lit = u.matches = 0)
            }
            function ht(u) {
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
            function vt(u, S, V) {
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
                      ? W(u, C, S)
                      : (W(u, (nt = i[C]) + b + 1, S),
                        (st = G[nt]) !== 0 && tt(u, (C -= A[nt]), st),
                        W(u, (nt = F(--J)), V),
                        (st = Q[nt]) !== 0 && tt(u, (J -= M[nt]), st)),
                    it < u.last_lit;

                );
              W(u, U, S)
            }
            function Ot(u, S) {
              var V,
                J,
                C,
                nt = S.dyn_tree,
                st = S.stat_desc.static_tree,
                it = S.stat_desc.has_stree,
                dt = S.stat_desc.elems,
                St = -1
              for (u.heap_len = 0, u.heap_max = o, V = 0; V < dt; V++)
                nt[2 * V] !== 0
                  ? ((u.heap[++u.heap_len] = St = V), (u.depth[V] = 0))
                  : (nt[2 * V + 1] = 0)
              for (; u.heap_len < 2; )
                (nt[2 * (C = u.heap[++u.heap_len] = St < 2 ? ++St : 0)] = 1),
                  (u.depth[C] = 0),
                  u.opt_len--,
                  it && (u.static_len -= st[2 * C + 1])
              for (S.max_code = St, V = u.heap_len >> 1; 1 <= V; V--)
                vt(u, nt, V)
              for (
                C = dt;
                (V = u.heap[1]),
                  (u.heap[1] = u.heap[u.heap_len--]),
                  vt(u, nt, 1),
                  (J = u.heap[1]),
                  (u.heap[--u.heap_max] = V),
                  (u.heap[--u.heap_max] = J),
                  (nt[2 * C] = nt[2 * V] + nt[2 * J]),
                  (u.depth[C] =
                    (u.depth[V] >= u.depth[J] ? u.depth[V] : u.depth[J]) + 1),
                  (nt[2 * V + 1] = nt[2 * J + 1] = C),
                  (u.heap[1] = C++),
                  vt(u, nt, 1),
                  2 <= u.heap_len;

              );
              ;(u.heap[--u.heap_max] = u.heap[1]),
                (function (gt, Dt) {
                  var Wt,
                    xt,
                    Kt,
                    It,
                    te,
                    _t,
                    Rt = Dt.dyn_tree,
                    ne = Dt.max_code,
                    jt = Dt.stat_desc.static_tree,
                    Ie = Dt.stat_desc.has_stree,
                    Gt = Dt.stat_desc.extra_bits,
                    ie = Dt.stat_desc.extra_base,
                    Y = Dt.stat_desc.max_length,
                    Xt = 0
                  for (It = 0; It <= p; It++) gt.bl_count[It] = 0
                  for (
                    Rt[2 * gt.heap[gt.heap_max] + 1] = 0, Wt = gt.heap_max + 1;
                    Wt < o;
                    Wt++
                  )
                    Y < (It = Rt[2 * Rt[2 * (xt = gt.heap[Wt]) + 1] + 1] + 1) &&
                      ((It = Y), Xt++),
                      (Rt[2 * xt + 1] = It),
                      ne < xt ||
                        (gt.bl_count[It]++,
                        (te = 0),
                        ie <= xt && (te = Gt[xt - ie]),
                        (_t = Rt[2 * xt]),
                        (gt.opt_len += _t * (It + te)),
                        Ie && (gt.static_len += _t * (jt[2 * xt + 1] + te)))
                  if (Xt !== 0) {
                    do {
                      for (It = Y - 1; gt.bl_count[It] === 0; ) It--
                      gt.bl_count[It]--,
                        (gt.bl_count[It + 1] += 2),
                        gt.bl_count[Y]--,
                        (Xt -= 2)
                    } while (0 < Xt)
                    for (It = Y; It !== 0; It--)
                      for (xt = gt.bl_count[It]; xt !== 0; )
                        ne < (Kt = gt.heap[--Wt]) ||
                          (Rt[2 * Kt + 1] !== It &&
                            ((gt.opt_len += (It - Rt[2 * Kt + 1]) * Rt[2 * Kt]),
                            (Rt[2 * Kt + 1] = It)),
                          xt--)
                  }
                })(u, S),
                wt(nt, St, u.bl_count)
            }
            function n(u, S, V) {
              var J,
                C,
                nt = -1,
                st = S[1],
                it = 0,
                dt = 7,
                St = 4
              for (
                st === 0 && ((dt = 138), (St = 3)),
                  S[2 * (V + 1) + 1] = 65535,
                  J = 0;
                J <= V;
                J++
              )
                (C = st),
                  (st = S[2 * (J + 1) + 1]),
                  (++it < dt && C === st) ||
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
                        ? ((dt = 138), 3)
                        : C === st
                        ? ((dt = 6), 3)
                        : ((dt = 7), 4)))
            }
            function Z(u, S, V) {
              var J,
                C,
                nt = -1,
                st = S[1],
                it = 0,
                dt = 7,
                St = 4
              for (st === 0 && ((dt = 138), (St = 3)), J = 0; J <= V; J++)
                if (
                  ((C = st),
                  (st = S[2 * (J + 1) + 1]),
                  !(++it < dt && C === st))
                ) {
                  if (it < St) for (; W(u, C, u.bl_tree), --it != 0; );
                  else
                    C !== 0
                      ? (C !== nt && (W(u, C, u.bl_tree), it--),
                        W(u, x, u.bl_tree),
                        tt(u, it - 3, 2))
                      : it <= 10
                      ? (W(u, O, u.bl_tree), tt(u, it - 3, 3))
                      : (W(u, q, u.bl_tree), tt(u, it - 11, 7))
                  ;(nt = C),
                    (St =
                      (it = 0) === st
                        ? ((dt = 138), 3)
                        : C === st
                        ? ((dt = 6), 3)
                        : ((dt = 7), 4))
                }
            }
            _(M)
            var j = !1
            function N(u, S, V, J) {
              tt(u, (r << 1) + (J ? 1 : 0), 3),
                (function (C, nt, st, it) {
                  ht(C),
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
                    for (M[C] = nt, S = 0; S < 1 << Q[C]; S++) I[nt++] = C
                  for (nt >>= 7; C < l; C++)
                    for (M[C] = nt << 7, S = 0; S < 1 << (Q[C] - 7); S++)
                      I[256 + nt++] = C
                  for (V = 0; V <= p; V++) st[V] = 0
                  for (S = 0; S <= 143; ) (lt[2 * S + 1] = 8), S++, st[8]++
                  for (; S <= 255; ) (lt[2 * S + 1] = 9), S++, st[9]++
                  for (; S <= 279; ) (lt[2 * S + 1] = 7), S++, st[7]++
                  for (; S <= 287; ) (lt[2 * S + 1] = 8), S++, st[8]++
                  for (wt(lt, T + 1, st), S = 0; S < l; S++)
                    (w[2 * S + 1] = 5), (w[2 * S] = bt(S, 5))
                  ;(rt = new H(lt, G, b + 1, T, p)),
                    (k = new H(w, Q, 0, l, p)),
                    ($ = new H(new Array(0), z, 0, g, E))
                })(),
                (j = !0)),
                (u.l_desc = new D(u.dyn_ltree, rt)),
                (u.d_desc = new D(u.dyn_dtree, k)),
                (u.bl_desc = new D(u.bl_tree, $)),
                (u.bi_buf = 0),
                (u.bi_valid = 0),
                ft(u)
            }),
              (v._tr_stored_block = N),
              (v._tr_flush_block = function (u, S, V, J) {
                var C,
                  nt,
                  st = 0
                0 < u.level
                  ? (u.strm.data_type === 2 &&
                      (u.strm.data_type = (function (it) {
                        var dt,
                          St = 4093624447
                        for (dt = 0; dt <= 31; dt++, St >>>= 1)
                          if (1 & St && it.dyn_ltree[2 * dt] !== 0) return f
                        if (
                          it.dyn_ltree[18] !== 0 ||
                          it.dyn_ltree[20] !== 0 ||
                          it.dyn_ltree[26] !== 0
                        )
                          return s
                        for (dt = 32; dt < b; dt++)
                          if (it.dyn_ltree[2 * dt] !== 0) return s
                        return f
                      })(u)),
                    Ot(u, u.l_desc),
                    Ot(u, u.d_desc),
                    (st = (function (it) {
                      var dt
                      for (
                        n(it, it.dyn_ltree, it.l_desc.max_code),
                          n(it, it.dyn_dtree, it.d_desc.max_code),
                          Ot(it, it.bl_desc),
                          dt = g - 1;
                        3 <= dt && it.bl_tree[2 * X[dt] + 1] === 0;
                        dt--
                      );
                      return (it.opt_len += 3 * (dt + 1) + 5 + 5 + 4), dt
                    })(u)),
                    (C = (u.opt_len + 3 + 7) >>> 3),
                    (nt = (u.static_len + 3 + 7) >>> 3) <= C && (C = nt))
                  : (C = nt = V + 5),
                  V + 4 <= C && S !== -1
                    ? N(u, S, V, J)
                    : u.strategy === 4 || nt === C
                    ? (tt(u, 2 + (J ? 1 : 0), 3), At(u, lt, w))
                    : (tt(u, 4 + (J ? 1 : 0), 3),
                      (function (it, dt, St, gt) {
                        var Dt
                        for (
                          tt(it, dt - 257, 5),
                            tt(it, St - 1, 5),
                            tt(it, gt - 4, 4),
                            Dt = 0;
                          Dt < gt;
                          Dt++
                        )
                          tt(it, it.bl_tree[2 * X[Dt] + 1], 3)
                        Z(it, it.dyn_ltree, dt - 1), Z(it, it.dyn_dtree, St - 1)
                      })(
                        u,
                        u.l_desc.max_code + 1,
                        u.d_desc.max_code + 1,
                        st + 1
                      ),
                      At(u, u.dyn_ltree, u.dyn_dtree)),
                  ft(u),
                  J && ht(u)
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
                tt(u, 2, 3),
                  W(u, U, lt),
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
              ;(function (f, s) {
                if (!f.setImmediate) {
                  var _,
                    r,
                    L,
                    b,
                    T = 1,
                    l = {},
                    g = !1,
                    o = f.document,
                    p = Object.getPrototypeOf && Object.getPrototypeOf(f)
                  ;(p = p && p.setTimeout ? p : f),
                    (_ =
                      {}.toString.call(f.process) === '[object process]'
                        ? function (x) {
                            process.nextTick(function () {
                              E(x)
                            })
                          }
                        : (function () {
                            if (f.postMessage && !f.importScripts) {
                              var x = !0,
                                O = f.onmessage
                              return (
                                (f.onmessage = function () {
                                  x = !1
                                }),
                                f.postMessage('', '*'),
                                (f.onmessage = O),
                                x
                              )
                            }
                          })()
                        ? ((b = 'setImmediate$' + Math.random() + '$'),
                          f.addEventListener
                            ? f.addEventListener('message', U, !1)
                            : f.attachEvent('onmessage', U),
                          function (x) {
                            f.postMessage(b + x, '*')
                          })
                        : f.MessageChannel
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
                    (p.clearImmediate = d)
                }
                function d(x) {
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
                        d(x), (g = !1)
                      }
                    }
                  }
                }
                function U(x) {
                  x.source === f &&
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
})(En)
const bn = We,
  yn = new bn()
class wn {
  static async init(ut) {
    const m = await fetch(ut).then((B) => B.blob())
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
function Ae(at) {
  return new Promise((ut, m) => {
    ;(at.oncomplete = at.onsuccess = () => ut(at.result)),
      (at.onabort = at.onerror = () => m(at.error))
  })
}
function vn(at, ut) {
  const m = indexedDB.open(at)
  m.onupgradeneeded = () => m.result.createObjectStore(ut)
  const B = Ae(m)
  return (v, h) => B.then((f) => h(f.transaction(ut, v).objectStore(ut)))
}
let Pe
function Ze() {
  return Pe || (Pe = vn('keyval-store', 'keyval')), Pe
}
function Ir(at, ut = Ze()) {
  return ut('readonly', (m) => Ae(m.get(at)))
}
function kr(at, ut, m = Ze()) {
  return m('readwrite', (B) => (B.put(ut, at), Ae(B.transaction)))
}
function Ln(at, ut = Ze()) {
  return ut('readwrite', (m) => (m.delete(at), Ae(m.transaction)))
}
var Xe = {},
  Tn = {
    get exports() {
      return Xe
    },
    set exports(at) {
      Xe = at
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
      f = 'second',
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
        ordinal: function (I) {
          var i = ['th', 'st', 'nd', 'rd'],
            A = I % 100
          return '[' + I + (i[(A - 20) % 10] || i[A] || i[0]) + ']'
        }
      },
      U = function (I, i, A) {
        var rt = String(I)
        return !rt || rt.length >= i
          ? I
          : '' + Array(i + 1 - rt.length).join(A) + I
      },
      x = {
        s: U,
        z: function (I) {
          var i = -I.utcOffset(),
            A = Math.abs(i),
            rt = Math.floor(A / 60),
            k = A % 60
          return (i <= 0 ? '+' : '-') + U(rt, 2, '0') + ':' + U(k, 2, '0')
        },
        m: function I(i, A) {
          if (i.date() < A.date()) return -I(A, i)
          var rt = 12 * (A.year() - i.year()) + (A.month() - i.month()),
            k = i.clone().add(rt, b),
            $ = A - k < 0,
            M = i.clone().add(rt + ($ ? -1 : 1), b)
          return +(-(rt + (A - k) / ($ ? k - M : M - k)) || 0)
        },
        a: function (I) {
          return I < 0 ? Math.ceil(I) || 0 : Math.floor(I)
        },
        p: function (I) {
          return (
            { M: b, y: l, w: L, d: r, D: g, h: _, m: s, s: f, ms: h, Q: T }[
              I
            ] ||
            String(I || '')
              .toLowerCase()
              .replace(/s$/, '')
          )
        },
        u: function (I) {
          return I === void 0
        }
      },
      O = 'en',
      q = {}
    q[O] = E
    var G = function (I) {
        return I instanceof lt
      },
      Q = function I(i, A, rt) {
        var k
        if (!i) return O
        if (typeof i == 'string') {
          var $ = i.toLowerCase()
          q[$] && (k = $), A && ((q[$] = A), (k = $))
          var M = i.split('-')
          if (!k && M.length > 1) return I(M[0])
        } else {
          var H = i.name
          ;(q[H] = i), (k = H)
        }
        return !rt && k && (O = k), k || (!rt && O)
      },
      z = function (I, i) {
        if (G(I)) return I.clone()
        var A = typeof i == 'object' ? i : {}
        return (A.date = I), (A.args = arguments), new lt(A)
      },
      X = x
    ;(X.l = Q),
      (X.i = G),
      (X.w = function (I, i) {
        return z(I, { locale: i.$L, utc: i.$u, x: i.$x, $offset: i.$offset })
      })
    var lt = (function () {
        function I(A) {
          ;(this.$L = Q(A.locale, null, !0)), this.parse(A)
        }
        var i = I.prototype
        return (
          (i.parse = function (A) {
            ;(this.$d = (function (rt) {
              var k = rt.date,
                $ = rt.utc
              if (k === null) return new Date(NaN)
              if (X.u(k)) return new Date()
              if (k instanceof Date) return new Date(k)
              if (typeof k == 'string' && !/Z$/i.test(k)) {
                var M = k.match(p)
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
            return X
          }),
          (i.isValid = function () {
            return this.$d.toString() !== o
          }),
          (i.isSame = function (A, rt) {
            var k = z(A)
            return this.startOf(rt) <= k && k <= this.endOf(rt)
          }),
          (i.isAfter = function (A, rt) {
            return z(A) < this.startOf(rt)
          }),
          (i.isBefore = function (A, rt) {
            return this.endOf(rt) < z(A)
          }),
          (i.$g = function (A, rt, k) {
            return X.u(A) ? this[rt] : this.set(k, A)
          }),
          (i.unix = function () {
            return Math.floor(this.valueOf() / 1e3)
          }),
          (i.valueOf = function () {
            return this.$d.getTime()
          }),
          (i.startOf = function (A, rt) {
            var k = this,
              $ = !!X.u(rt) || rt,
              M = X.p(A),
              H = function (ft, ht) {
                var Nt = X.w(
                  k.$u ? Date.UTC(k.$y, ht, ft) : new Date(k.$y, ht, ft),
                  k
                )
                return $ ? Nt : Nt.endOf(r)
              },
              D = function (ft, ht) {
                return X.w(
                  k
                    .toDate()
                    [ft].apply(
                      k.toDate('s'),
                      ($ ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(ht)
                    ),
                  k
                )
              },
              F = this.$W,
              ot = this.$M,
              tt = this.$D,
              W = 'set' + (this.$u ? 'UTC' : '')
            switch (M) {
              case l:
                return $ ? H(1, 0) : H(31, 11)
              case b:
                return $ ? H(1, ot) : H(0, ot + 1)
              case L:
                var bt = this.$locale().weekStart || 0,
                  wt = (F < bt ? F + 7 : F) - bt
                return H($ ? tt - wt : tt + (6 - wt), ot)
              case r:
              case g:
                return D(W + 'Hours', 0)
              case _:
                return D(W + 'Minutes', 1)
              case s:
                return D(W + 'Seconds', 2)
              case f:
                return D(W + 'Milliseconds', 3)
              default:
                return this.clone()
            }
          }),
          (i.endOf = function (A) {
            return this.startOf(A, !1)
          }),
          (i.$set = function (A, rt) {
            var k,
              $ = X.p(A),
              M = 'set' + (this.$u ? 'UTC' : ''),
              H = ((k = {}),
              (k[r] = M + 'Date'),
              (k[g] = M + 'Date'),
              (k[b] = M + 'Month'),
              (k[l] = M + 'FullYear'),
              (k[_] = M + 'Hours'),
              (k[s] = M + 'Minutes'),
              (k[f] = M + 'Seconds'),
              (k[h] = M + 'Milliseconds'),
              k)[$],
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
            return this[X.p(A)]()
          }),
          (i.add = function (A, rt) {
            var k,
              $ = this
            A = Number(A)
            var M = X.p(rt),
              H = function (ot) {
                var tt = z($)
                return X.w(tt.date(tt.date() + Math.round(ot * A)), $)
              }
            if (M === b) return this.set(b, this.$M + A)
            if (M === l) return this.set(l, this.$y + A)
            if (M === r) return H(1)
            if (M === L) return H(7)
            var D = ((k = {}), (k[s] = B), (k[_] = v), (k[f] = m), k)[M] || 1,
              F = this.$d.getTime() + A * D
            return X.w(F, this)
          }),
          (i.subtract = function (A, rt) {
            return this.add(-1 * A, rt)
          }),
          (i.format = function (A) {
            var rt = this,
              k = this.$locale()
            if (!this.isValid()) return k.invalidDate || o
            var $ = A || 'YYYY-MM-DDTHH:mm:ssZ',
              M = X.z(this),
              H = this.$H,
              D = this.$m,
              F = this.$M,
              ot = k.weekdays,
              tt = k.months,
              W = function (ht, Nt, vt, At) {
                return (ht && (ht[Nt] || ht(rt, $))) || vt[Nt].slice(0, At)
              },
              bt = function (ht) {
                return X.s(H % 12 || 12, ht, '0')
              },
              wt =
                k.meridiem ||
                function (ht, Nt, vt) {
                  var At = ht < 12 ? 'AM' : 'PM'
                  return vt ? At.toLowerCase() : At
                },
              ft = {
                YY: String(this.$y).slice(-2),
                YYYY: this.$y,
                M: F + 1,
                MM: X.s(F + 1, 2, '0'),
                MMM: W(k.monthsShort, F, tt, 3),
                MMMM: W(tt, F),
                D: this.$D,
                DD: X.s(this.$D, 2, '0'),
                d: String(this.$W),
                dd: W(k.weekdaysMin, this.$W, ot, 2),
                ddd: W(k.weekdaysShort, this.$W, ot, 3),
                dddd: ot[this.$W],
                H: String(H),
                HH: X.s(H, 2, '0'),
                h: bt(1),
                hh: bt(2),
                a: wt(H, D, !0),
                A: wt(H, D, !1),
                m: String(D),
                mm: X.s(D, 2, '0'),
                s: String(this.$s),
                ss: X.s(this.$s, 2, '0'),
                SSS: X.s(this.$ms, 3, '0'),
                Z: M
              }
            return $.replace(d, function (ht, Nt) {
              return Nt || ft[ht] || M.replace(':', '')
            })
          }),
          (i.utcOffset = function () {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
          }),
          (i.diff = function (A, rt, k) {
            var $,
              M = X.p(rt),
              H = z(A),
              D = (H.utcOffset() - this.utcOffset()) * B,
              F = this - H,
              ot = X.m(this, H)
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
                ($[f] = F / m),
                $)[M] || F),
              k ? ot : X.a(ot)
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
            var k = this.clone(),
              $ = Q(A, rt, !0)
            return $ && (k.$L = $), k
          }),
          (i.clone = function () {
            return X.w(this.$d, this)
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
      w = lt.prototype
    return (
      (z.prototype = w),
      [
        ['$ms', h],
        ['$s', f],
        ['$m', s],
        ['$H', _],
        ['$W', r],
        ['$M', b],
        ['$y', l],
        ['$D', g]
      ].forEach(function (I) {
        w[I[1]] = function (i) {
          return this.$g(i, I[0], I[1])
        }
      }),
      (z.extend = function (I, i) {
        return I.$i || (I(i, lt, z), (I.$i = !0)), z
      }),
      (z.locale = Q),
      (z.isDayjs = G),
      (z.unix = function (I) {
        return z(1e3 * I)
      }),
      (z.en = q[O]),
      (z.Ls = q),
      (z.p = {}),
      z
    )
  })
})(Tn)
const Sn = ['widget', 'remind_at', 'tags', 'files'],
  Un = ['is_follow', 'schedule_hide'],
  An = (at) => `SELECT taker_id, is_admin, finish_time
   FROM task_dispatch
   WHERE ref_task_id = ${at} AND is_valid = 1
   AND identity NOT IN (10804, 10811)
   AND operate_state = 0`,
  In = ({
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
tag_str,  application_id, application_json,
IFNULL(application_name, '') AS application_name,
z.user_id, step_user_count, date, timestamp, application_id, admins, takers,
CASE WHEN STRFTIME('%w', date) == '0' THEN '周日'
     WHEN STRFTIME('%w', date) == '1' THEN '周一'
     WHEN STRFTIME('%w', date) == '2' THEN '周二'
     WHEN STRFTIME('%w', date) == '3' THEN '周三'
     WHEN STRFTIME('%w', date) == '4' THEN '周四'
     WHEN STRFTIME('%w', date) == '5' THEN '周五'
     WHEN STRFTIME('%w', date) == '6' THEN '周六' END AS weekday,
FROM (SELECT a.dispatch_id, a.identity, a.taker_id, a.state, a.personal_state, a.operate_state, a.delete_at, b.id,
        b.matter_type, b.title, b.detail, b.priority_level, CASE WHEN b.files != '' THEN b.files ELSE '[]' END AS files,
        IFNULL(b.remind_at, '{}') AS remind_at, IFNULL(b.widget, '{}') AS widget, b.repeat_type, b.end_repeat_at,
        b.creator_id, b.create_at, c.category,
        CASE WHEN c.project_id > 0 THEN c.project_id ELSE 0 END AS project_id,
        CASE WHEN c.flow_step_id > 0 THEN c.flow_step_id ELSE 0 END AS flow_step_id,
        CASE WHEN c.application_id > 0 THEN c.application_id ELSE 0 END AS application_id,
        CASE WHEN JSON_VALID(c.application_json) == 1 THEN c.application_json ->> '$.name' ELSE '' END AS application_name
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
                    ON c.project_id = fwb.project_id
                    LEFT JOIN workspace AS fw
                    ON fwb.workspace_id = fw.id
                    LEFT JOIN workspace_member AS fwm
                    ON fw.id = fwm.workspace_id AND fwm.user_id = ${B} AND
                    fwm.state = 10902) w
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
${at} `,
  $e = (at, ut) => {
    const m = at.includes('-1'),
      B = m ? `${ut} = 0` : `${ut} != 0`,
      v = at.filter((_) => _ !== '-1'),
      h = !!v.length
    let f = ''
    m && h ? (f = 'OR') : h && !m && (f = 'AND')
    const s = v.length ? `${ut} IN (${v.join(',')})` : ''
    return `(${B} ${f} ${s})`
  },
  kn = (at) => {
    const {
        user_id: ut,
        direction: m,
        page_number: B,
        timestamp: v,
        page_record: h,
        show_model: f,
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
        priority_levels: d,
        matter_states: E,
        taker_ids: U,
        application_ids: x,
        creator_ids: O,
        admins_ids: q,
        project_ids: G,
        workspace_ids: Q,
        task_at: z,
        create_at: X,
        update_at: lt,
        finish_time: w,
        complete_at: I
      } = _ || {},
      { order_by_key: i, sort: A } = s || {},
      rt = `LIMIT ${(B - 1) * h}, ${h}`
    let k = f
    const $ = [],
      M = ['repeat_id ASC', 'task_id DESC']
    let H = "d.cycle_date <= STRFTIME('%s', 'now')"
    switch (
      (r && ((k = 1), $.push(`(title LIKE '%${r}%' OR detail LIKE '%${r}%')`)),
      k === 2 && !L && $.push(`parent_id IN (${0})`),
      k === 2 && (H = "(d.cycle_date <= STRFTIME('%s', 'now') OR d.cycle = 1)"),
      L && $.push(`parent_id IN (${L})`),
      l && $.push(`is_follow = ${Number(l === 1)}`),
      g && $.push(`schedule_hide = ${Number(g === 1)}`),
      o &&
        (o === 1
          ? $.push("conclusion != ''")
          : o === 2 && $.push("conclusion = ''")),
      T)
    ) {
      case He.project: {
        $.unshift('project_id > 0'),
          M.unshift('project_id DESC, timestamp !=0'),
          i && A && M.push(`${i} ${A}`)
        break
      }
      case He.time: {
        if (
          (typeof v == 'number' &&
            $.push(`timestamp ${m === Ue.up ? '<' : '>='} ${v}`),
          m)
        ) {
          let tt = 'DESC',
            W = 'ASC'
          i === 'timestamp' && A === 'DESC' && ((tt = 'ASC'), (W = 'DESC')),
            m === Ue.up
              ? M.unshift(`timestamp ${tt}`)
              : M.unshift(`timestamp !=0, timestamp ${W}`)
        }
        break
      }
      default: {
        i ? M.unshift(`${i} ${A}`) : M.unshift('timestamp DESC')
        break
      }
    }
    if (p?.length) {
      const tt = p.includes('-1'),
        W = tt ? 'tag_str IS NULL' : 'tag_str IS NOT NULL',
        bt = p.filter((Nt) => Nt !== '-1'),
        wt = !!bt.length
      let ft = ''
      tt && wt ? (ft = 'OR') : wt && !tt && (ft = 'AND')
      const ht = bt.map((Nt) => `INSTR(tag_str, ${Nt})`).join(' or ')
      $.push(`(${W} ${ft} (${ht}))`)
    }
    if (z?.end_time && z.start_time) {
      const { start_time: tt, end_time: W } = z
      $.push(`((start_time BETWEEN ${tt} AND ${W}) OR (end_time BETWEEN ${tt} AND ${W})) OR
    (start_time > 0 AND start_time < ${tt} AND end_time > ${W}) OR
    (flow_step_id > 0 AND create_at BETWEEN ${tt} AND ${W}))`)
    }
    if (X?.start_time && X.end_time) {
      const { end_time: tt, start_time: W } = X
      $.push(`create_at >= ${W} AND create_at <= ${tt}`)
    }
    if (lt?.end_time && lt?.start_time) {
      const { end_time: tt, start_time: W } = lt
      $.push(`update_at >= ${W} AND update_at <= ${tt}`)
    }
    if (I?.end_time && I?.start_time) {
      const { end_time: tt, start_time: W } = I
      $.push(`complete_at >= ${W} AND complete_at <= ${tt}`)
    }
    if (w?.end_time && w?.start_time) {
      const { end_time: tt, start_time: W } = w
      $.push(`finish_time >= ${W} AND finish_time <= ${tt}`)
    }
    if ((O?.length && $.push(`creator_id IN (${O.join(',')})`), U?.length)) {
      const tt = U.includes('-1'),
        W = U.filter((ft) => ft !== '-1'),
        bt = tt ? '(takers IS NULL)' : '',
        wt = W.map((ft) => `INSTR(takers, ${ft})`).join(' OR ')
      $.push(`(${bt} ${tt && W.length ? 'OR' : ''} (${wt}))`)
    }
    if (q?.length) {
      const tt = q.includes('-1'),
        W = q.filter((ft) => ft !== '-1'),
        bt = tt ? '(admins IS NULL)' : '',
        wt = W.map((ft) => `INSTR(admins, ${ft})`).join(' OR ')
      $.push(`(${bt} ${tt && W.length ? 'OR' : ''} (${wt}))`)
    }
    switch (
      (E?.length && $.push(`matter_state IN (${E.join(',')})`),
      d?.length && $.push(`priority_level IN (${d.join(',')})`),
      x?.length && $.push($e(x, 'application_id')),
      Q?.length && $.push($e(Q, 'workspace_id')),
      G && $.push($e(G, 'project_id')),
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
      case qt.cooperation: {
        $.unshift(`takers != ${ut}`)
        break
      }
      case qt.personal: {
        $.unshift(`takers = ${ut}`)
        break
      }
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
    return In({
      limit: rt,
      user_id: ut,
      where: D,
      order: F,
      LeftJoinRepeatAnd: H
    })
  },
  Dn = '/sql-wasm.wasm'
class On {
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
    ;(this.userId = ut.userId),
      this.db && (this.db.close(), (this.db = null)),
      (this.dbId = `${ut.env}-${ut.userId}`),
      (this.recordKey = `${this.dbId}-record`),
      ut.host !== 'https://api.flyele.vip' && (this.host = ut.host),
      (this.token = ut.token)
    const m = await qe({ locateFile: () => Dn }),
      B = await (await fetch(`${this.host}/userc/v2/system/now`)).json()
    B.data && (this.timeDiff = Math.floor(Date.now() / 1e3) - B.data)
    const v = await Ir(this.dbId)
    this.recordInfo = await Ir(this.recordKey)
    const h = await this.getUserData(),
      f = h[0]
    if (f && f.type === 1) {
      const s = new m.Database()
      ;(this.db = s), s.run(gn)
      const { sign_url: _, id: r, attach_info: L } = f
      await this.fetchZip(_),
        (this.recordInfo = { id: r, attach_info: L }),
        await this.initTable()
    } else if (v) this.db = new m.Database(v)
    else {
      await Ln(this.recordKey)
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
    return new Array(m.length).fill('').map((h, f) => {
      const s = {}
      for (const [_, r] of B) {
        const L = m[f][Number(_)]
        Sn.includes(r)
          ? (s[r] = JSON.parse(L))
          : Un.includes(r)
          ? (s[r] = Boolean(L))
          : (s[r] = /^(id)$|_id$/.test(r) ? (L ? String(L) : '') : L)
      }
      return s
    })
  }
  query(ut) {
    const m = Xe().startOf('day').unix() - this.timeDiff,
      B = this.db.exec(kn({ ...ut, timestamp: m, user_id: this.userId })),
      v = B[0] ? this.formatSelectValue(B[0]) : []
    for (const h of v) {
      const f = this.db.exec(An(h.task_id))
      h.takers = f[0] ? this.formatSelectValue(f[0]) : []
    }
    return console.log('query', v), ut.direction === Ue.up ? v.reverse() : v
  }
  async fetchZip(ut) {
    this.zipObj = await wn.init(ut)
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
            Object.keys(Ar[m]).forEach((b) => {
              L[b] = r[b] || Ar[m][b]
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
const Dr = new On()
var Ye = ((at) => (
  (at.QUERY_FULL_VIEW_LIST = 'QUERY_FULL_VIEW_LIST'),
  (at.INIT_DB = 'INIT_DB'),
  at
))(Ye || {})
class Fn {
  constructor() {
    self.onmessage = ({ data: ut }) => {
      switch (
        (console.log('from client', ut, ut.data),
        console.log('onmessage'),
        ut.key)
      ) {
        case Ye.INIT_DB: {
          Dr.initDB(ut.data).then(() => {
            self.postMessage({ uid: ut.uid })
          })
          break
        }
        case Ye.QUERY_FULL_VIEW_LIST: {
          const m = Dr.query(ut.data)
          self.postMessage({ uid: ut.uid, data: m })
          break
        }
      }
    }
  }
}
new Fn()
