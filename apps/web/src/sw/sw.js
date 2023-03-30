'use strict'
function wr(lt, _t) {
  for (var N = 0; N < _t.length; N++) {
    const C = _t[N]
    if (typeof C != 'string' && !Array.isArray(C)) {
      for (const v in C)
        if (v !== 'default' && !(v in lt)) {
          const d = Object.getOwnPropertyDescriptor(C, v)
          d &&
            Object.defineProperty(
              lt,
              v,
              d.get ? d : { enumerable: !0, get: () => C[v] }
            )
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(lt, Symbol.toStringTag, { value: 'Module' })
  )
}
var ve =
  typeof globalThis < 'u'
    ? globalThis
    : typeof window < 'u'
    ? window
    : typeof global < 'u'
    ? global
    : typeof self < 'u'
    ? self
    : {}
function sn(lt) {
  if (lt.__esModule) return lt
  var _t = lt.default
  if (typeof _t == 'function') {
    var N = function C() {
      if (this instanceof C) {
        var v = [null]
        v.push.apply(v, arguments)
        var d = Function.bind.apply(_t, v)
        return new d()
      }
      return _t.apply(this, arguments)
    }
    N.prototype = _t.prototype
  } else N = {}
  return (
    Object.defineProperty(N, '__esModule', { value: !0 }),
    Object.keys(lt).forEach(function (C) {
      var v = Object.getOwnPropertyDescriptor(lt, C)
      Object.defineProperty(
        N,
        C,
        v.get
          ? v
          : {
              enumerable: !0,
              get: function () {
                return lt[C]
              }
            }
      )
    }),
    N
  )
}
var Ue = {},
  on = {
    get exports() {
      return Ue
    },
    set exports(lt) {
      Ue = lt
    }
  }
const un = {},
  ln = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: un },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  Le = sn(ln)
;(function (lt, _t) {
  var N = void 0,
    C = function (v) {
      return (
        N ||
        ((N = new Promise(function (d, h) {
          var o = typeof v < 'u' ? v : {},
            _ = o.onAbort
          ;(o.onAbort = function (t) {
            h(new Error(t)), _ && _(t)
          }),
            (o.postRun = o.postRun || []),
            o.postRun.push(function () {
              d(o)
            }),
            (lt = void 0)
          var n
          n || (n = typeof o < 'u' ? o : {}),
            (n.onRuntimeInitialized = function () {
              function t(k, Y) {
                switch (typeof Y) {
                  case 'boolean':
                    rn(k, Y ? 1 : 0)
                    break
                  case 'number':
                    Qr(k, Y)
                    break
                  case 'string':
                    tn(k, Y, -1, -1)
                    break
                  case 'object':
                    if (Y === null) Er(k)
                    else if (Y.length != null) {
                      var it = je(Y)
                      en(k, it, Y.length, -1), be(it)
                    } else
                      we(
                        k,
                        'Wrong API use : tried to return a value of an unknown type (' +
                          Y +
                          ').',
                        -1
                      )
                    break
                  default:
                    Er(k)
                }
              }
              function e(k, Y) {
                for (var it = [], dt = 0; dt < k; dt += 1) {
                  var mt = W(Y + 4 * dt, 'i32'),
                    yt = Yr(mt)
                  if (yt === 1 || yt === 2) mt = Vr(mt)
                  else if (yt === 3) mt = Jr(mt)
                  else if (yt === 4) {
                    ;(yt = mt), (mt = Kr(yt)), (yt = $r(yt))
                    for (var qt = new Uint8Array(mt), Ct = 0; Ct < mt; Ct += 1)
                      qt[Ct] = H[yt + Ct]
                    mt = qt
                  } else mt = null
                  it.push(mt)
                }
                return it
              }
              function i(k, Y) {
                ;(this.La = k), (this.db = Y), (this.Ja = 1), (this.fb = [])
              }
              function c(k, Y) {
                if (
                  ((this.db = Y),
                  (Y = P(k) + 1),
                  (this.Ya = Ee(Y)),
                  this.Ya === null)
                )
                  throw Error('Unable to allocate memory for the SQL string')
                a(k, ut, this.Ya, Y),
                  (this.eb = this.Ya),
                  (this.Ua = this.ib = null)
              }
              function b(k) {
                if (
                  ((this.filename =
                    'dbfile_' + ((4294967295 * Math.random()) >>> 0)),
                  k != null)
                ) {
                  var Y = this.filename,
                    it = '/',
                    dt = Y
                  if (
                    (it &&
                      ((it = typeof it == 'string' ? it : ie(it)),
                      (dt = Y ? rt(it + '/' + Y) : it)),
                    (Y = sr(!0, !0)),
                    (dt = de(dt, ((Y !== void 0 ? Y : 438) & 4095) | 32768, 0)),
                    k)
                  ) {
                    if (typeof k == 'string') {
                      it = Array(k.length)
                      for (var mt = 0, yt = k.length; mt < yt; ++mt)
                        it[mt] = k.charCodeAt(mt)
                      k = it
                    }
                    _e(dt, Y | 146),
                      (it = ee(dt, 577)),
                      nr(it, k, 0, k.length, 0),
                      De(it),
                      _e(dt, Y)
                  }
                }
                this.handleError(ht(this.filename, z)),
                  (this.db = W(z, 'i32')),
                  nn(this.db),
                  (this.Za = {}),
                  (this.Na = {})
              }
              var z = Yt(4),
                q = n.cwrap,
                ht = q('sqlite3_open', 'number', ['string', 'number']),
                bt = q('sqlite3_close_v2', 'number', ['number']),
                gt = q('sqlite3_exec', 'number', [
                  'number',
                  'string',
                  'number',
                  'number',
                  'number'
                ]),
                At = q('sqlite3_changes', 'number', ['number']),
                Ht = q('sqlite3_prepare_v2', 'number', [
                  'number',
                  'string',
                  'number',
                  'number',
                  'number'
                ]),
                _r = q('sqlite3_sql', 'string', ['number']),
                Or = q('sqlite3_normalized_sql', 'string', ['number']),
                pr = q('sqlite3_prepare_v2', 'number', [
                  'number',
                  'number',
                  'number',
                  'number',
                  'number'
                ]),
                Dr = q('sqlite3_bind_text', 'number', [
                  'number',
                  'number',
                  'number',
                  'number',
                  'number'
                ]),
                mr = q('sqlite3_bind_blob', 'number', [
                  'number',
                  'number',
                  'number',
                  'number',
                  'number'
                ]),
                Fr = q('sqlite3_bind_double', 'number', [
                  'number',
                  'number',
                  'number'
                ]),
                xr = q('sqlite3_bind_int', 'number', [
                  'number',
                  'number',
                  'number'
                ]),
                Rr = q('sqlite3_bind_parameter_index', 'number', [
                  'number',
                  'string'
                ]),
                Cr = q('sqlite3_step', 'number', ['number']),
                zr = q('sqlite3_errmsg', 'string', ['number']),
                Br = q('sqlite3_column_count', 'number', ['number']),
                Gr = q('sqlite3_data_count', 'number', ['number']),
                jr = q('sqlite3_column_double', 'number', ['number', 'number']),
                Nr = q('sqlite3_column_text', 'string', ['number', 'number']),
                Mr = q('sqlite3_column_blob', 'number', ['number', 'number']),
                Pr = q('sqlite3_column_bytes', 'number', ['number', 'number']),
                qr = q('sqlite3_column_type', 'number', ['number', 'number']),
                Hr = q('sqlite3_column_name', 'string', ['number', 'number']),
                Wr = q('sqlite3_reset', 'number', ['number']),
                Xr = q('sqlite3_clear_bindings', 'number', ['number']),
                Zr = q('sqlite3_finalize', 'number', ['number']),
                gr = q(
                  'sqlite3_create_function_v2',
                  'number',
                  'number string number number number number number number number'.split(
                    ' '
                  )
                ),
                Yr = q('sqlite3_value_type', 'number', ['number']),
                Kr = q('sqlite3_value_bytes', 'number', ['number']),
                Jr = q('sqlite3_value_text', 'string', ['number']),
                $r = q('sqlite3_value_blob', 'number', ['number']),
                Vr = q('sqlite3_value_double', 'number', ['number']),
                Qr = q('sqlite3_result_double', '', ['number', 'number']),
                Er = q('sqlite3_result_null', '', ['number']),
                tn = q('sqlite3_result_text', '', [
                  'number',
                  'string',
                  'number',
                  'number'
                ]),
                en = q('sqlite3_result_blob', '', [
                  'number',
                  'number',
                  'number',
                  'number'
                ]),
                rn = q('sqlite3_result_int', '', ['number', 'number']),
                we = q('sqlite3_result_error', '', [
                  'number',
                  'string',
                  'number'
                ]),
                br = q('sqlite3_aggregate_context', 'number', [
                  'number',
                  'number'
                ]),
                nn = q('RegisterExtensionFunctions', 'number', ['number'])
              ;(i.prototype.bind = function (k) {
                if (!this.La) throw 'Statement closed'
                return (
                  this.reset(),
                  Array.isArray(k)
                    ? this.xb(k)
                    : k != null && typeof k == 'object'
                    ? this.yb(k)
                    : !0
                )
              }),
                (i.prototype.step = function () {
                  if (!this.La) throw 'Statement closed'
                  this.Ja = 1
                  var k = Cr(this.La)
                  switch (k) {
                    case 100:
                      return !0
                    case 101:
                      return !1
                    default:
                      throw this.db.handleError(k)
                  }
                }),
                (i.prototype.sb = function (k) {
                  return (
                    k == null && ((k = this.Ja), (this.Ja += 1)), jr(this.La, k)
                  )
                }),
                (i.prototype.Cb = function (k) {
                  if (
                    (k == null && ((k = this.Ja), (this.Ja += 1)),
                    (k = Nr(this.La, k)),
                    typeof BigInt != 'function')
                  )
                    throw Error('BigInt is not supported')
                  return BigInt(k)
                }),
                (i.prototype.Db = function (k) {
                  return (
                    k == null && ((k = this.Ja), (this.Ja += 1)), Nr(this.La, k)
                  )
                }),
                (i.prototype.getBlob = function (k) {
                  k == null && ((k = this.Ja), (this.Ja += 1))
                  var Y = Pr(this.La, k)
                  k = Mr(this.La, k)
                  for (var it = new Uint8Array(Y), dt = 0; dt < Y; dt += 1)
                    it[dt] = H[k + dt]
                  return it
                }),
                (i.prototype.get = function (k, Y) {
                  ;(Y = Y || {}),
                    k != null && this.bind(k) && this.step(),
                    (k = [])
                  for (var it = Gr(this.La), dt = 0; dt < it; dt += 1)
                    switch (qr(this.La, dt)) {
                      case 1:
                        var mt = Y.useBigInt ? this.Cb(dt) : this.sb(dt)
                        k.push(mt)
                        break
                      case 2:
                        k.push(this.sb(dt))
                        break
                      case 3:
                        k.push(this.Db(dt))
                        break
                      case 4:
                        k.push(this.getBlob(dt))
                        break
                      default:
                        k.push(null)
                    }
                  return k
                }),
                (i.prototype.getColumnNames = function () {
                  for (var k = [], Y = Br(this.La), it = 0; it < Y; it += 1)
                    k.push(Hr(this.La, it))
                  return k
                }),
                (i.prototype.getAsObject = function (k, Y) {
                  ;(k = this.get(k, Y)), (Y = this.getColumnNames())
                  for (var it = {}, dt = 0; dt < Y.length; dt += 1)
                    it[Y[dt]] = k[dt]
                  return it
                }),
                (i.prototype.getSQL = function () {
                  return _r(this.La)
                }),
                (i.prototype.getNormalizedSQL = function () {
                  return Or(this.La)
                }),
                (i.prototype.run = function (k) {
                  return k != null && this.bind(k), this.step(), this.reset()
                }),
                (i.prototype.nb = function (k, Y) {
                  Y == null && ((Y = this.Ja), (this.Ja += 1)), (k = Ot(k))
                  var it = je(k)
                  this.fb.push(it),
                    this.db.handleError(Dr(this.La, Y, it, k.length - 1, 0))
                }),
                (i.prototype.wb = function (k, Y) {
                  Y == null && ((Y = this.Ja), (this.Ja += 1))
                  var it = je(k)
                  this.fb.push(it),
                    this.db.handleError(mr(this.La, Y, it, k.length, 0))
                }),
                (i.prototype.mb = function (k, Y) {
                  Y == null && ((Y = this.Ja), (this.Ja += 1)),
                    this.db.handleError(
                      (k === (k | 0) ? xr : Fr)(this.La, Y, k)
                    )
                }),
                (i.prototype.zb = function (k) {
                  k == null && ((k = this.Ja), (this.Ja += 1)),
                    mr(this.La, k, 0, 0, 0)
                }),
                (i.prototype.ob = function (k, Y) {
                  switch (
                    (Y == null && ((Y = this.Ja), (this.Ja += 1)), typeof k)
                  ) {
                    case 'string':
                      this.nb(k, Y)
                      return
                    case 'number':
                      this.mb(k, Y)
                      return
                    case 'bigint':
                      this.nb(k.toString(), Y)
                      return
                    case 'boolean':
                      this.mb(k + 0, Y)
                      return
                    case 'object':
                      if (k === null) {
                        this.zb(Y)
                        return
                      }
                      if (k.length != null) {
                        this.wb(k, Y)
                        return
                      }
                  }
                  throw (
                    'Wrong API use : tried to bind a value of an unknown type (' +
                    k +
                    ').'
                  )
                }),
                (i.prototype.yb = function (k) {
                  var Y = this
                  return (
                    Object.keys(k).forEach(function (it) {
                      var dt = Rr(Y.La, it)
                      dt !== 0 && Y.ob(k[it], dt)
                    }),
                    !0
                  )
                }),
                (i.prototype.xb = function (k) {
                  for (var Y = 0; Y < k.length; Y += 1) this.ob(k[Y], Y + 1)
                  return !0
                }),
                (i.prototype.reset = function () {
                  return this.freemem(), Xr(this.La) === 0 && Wr(this.La) === 0
                }),
                (i.prototype.freemem = function () {
                  for (var k; (k = this.fb.pop()) !== void 0; ) be(k)
                }),
                (i.prototype.free = function () {
                  this.freemem()
                  var k = Zr(this.La) === 0
                  return delete this.db.Za[this.La], (this.La = 0), k
                }),
                (c.prototype.next = function () {
                  if (this.Ya === null) return { done: !0 }
                  if (
                    (this.Ua !== null && (this.Ua.free(), (this.Ua = null)),
                    !this.db.db)
                  )
                    throw (this.gb(), Error('Database closed'))
                  var k = le(),
                    Y = Yt(4)
                  D(z), D(Y)
                  try {
                    this.db.handleError(pr(this.db.db, this.eb, -1, z, Y)),
                      (this.eb = W(Y, 'i32'))
                    var it = W(z, 'i32')
                    return it === 0
                      ? (this.gb(), { done: !0 })
                      : ((this.Ua = new i(it, this.db)),
                        (this.db.Za[it] = this.Ua),
                        { value: this.Ua, done: !1 })
                  } catch (dt) {
                    throw ((this.ib = x(this.eb)), this.gb(), dt)
                  } finally {
                    ce(k)
                  }
                }),
                (c.prototype.gb = function () {
                  be(this.Ya), (this.Ya = null)
                }),
                (c.prototype.getRemainingSQL = function () {
                  return this.ib !== null ? this.ib : x(this.eb)
                }),
                typeof Symbol == 'function' &&
                  typeof Symbol.iterator == 'symbol' &&
                  (c.prototype[Symbol.iterator] = function () {
                    return this
                  }),
                (b.prototype.run = function (k, Y) {
                  if (!this.db) throw 'Database closed'
                  if (Y) {
                    k = this.prepare(k, Y)
                    try {
                      k.step()
                    } finally {
                      k.free()
                    }
                  } else this.handleError(gt(this.db, k, 0, 0, z))
                  return this
                }),
                (b.prototype.exec = function (k, Y, it) {
                  if (!this.db) throw 'Database closed'
                  var dt = le(),
                    mt = null
                  try {
                    var yt = P(k) + 1,
                      qt = Yt(yt)
                    a(k, H, qt, yt)
                    var Ct = qt,
                      zt = Yt(4)
                    for (k = []; W(Ct, 'i8') !== 0; ) {
                      D(z), D(zt), this.handleError(pr(this.db, Ct, -1, z, zt))
                      var Bt = W(z, 'i32')
                      if (((Ct = W(zt, 'i32')), Bt !== 0)) {
                        for (
                          yt = null,
                            mt = new i(Bt, this),
                            Y != null && mt.bind(Y);
                          mt.step();

                        )
                          yt === null &&
                            ((yt = {
                              columns: mt.getColumnNames(),
                              values: []
                            }),
                            k.push(yt)),
                            yt.values.push(mt.get(null, it))
                        mt.free()
                      }
                    }
                    return k
                  } catch (fe) {
                    throw (mt && mt.free(), fe)
                  } finally {
                    ce(dt)
                  }
                }),
                (b.prototype.each = function (k, Y, it, dt, mt) {
                  typeof Y == 'function' && ((dt = it), (it = Y), (Y = void 0)),
                    (k = this.prepare(k, Y))
                  try {
                    for (; k.step(); ) it(k.getAsObject(null, mt))
                  } finally {
                    k.free()
                  }
                  if (typeof dt == 'function') return dt()
                }),
                (b.prototype.prepare = function (k, Y) {
                  if (
                    (D(z),
                    this.handleError(Ht(this.db, k, -1, z, 0)),
                    (k = W(z, 'i32')),
                    k === 0)
                  )
                    throw 'Nothing to prepare'
                  var it = new i(k, this)
                  return Y != null && it.bind(Y), (this.Za[k] = it)
                }),
                (b.prototype.iterateStatements = function (k) {
                  return new c(k, this)
                }),
                (b.prototype.export = function () {
                  Object.values(this.Za).forEach(function (Y) {
                    Y.free()
                  }),
                    Object.values(this.Na).forEach(ue),
                    (this.Na = {}),
                    this.handleError(bt(this.db))
                  var k = Sr(this.filename)
                  return (
                    this.handleError(ht(this.filename, z)),
                    (this.db = W(z, 'i32')),
                    k
                  )
                }),
                (b.prototype.close = function () {
                  this.db !== null &&
                    (Object.values(this.Za).forEach(function (k) {
                      k.free()
                    }),
                    Object.values(this.Na).forEach(ue),
                    (this.Na = {}),
                    this.handleError(bt(this.db)),
                    $e('/' + this.filename),
                    (this.db = null))
                }),
                (b.prototype.handleError = function (k) {
                  if (k === 0) return null
                  throw ((k = zr(this.db)), Error(k))
                }),
                (b.prototype.getRowsModified = function () {
                  return At(this.db)
                }),
                (b.prototype.create_function = function (k, Y) {
                  Object.prototype.hasOwnProperty.call(this.Na, k) &&
                    (ue(this.Na[k]), delete this.Na[k])
                  var it = Ge(function (dt, mt, yt) {
                    mt = e(mt, yt)
                    try {
                      var qt = Y.apply(null, mt)
                    } catch (Ct) {
                      we(dt, Ct, -1)
                      return
                    }
                    t(dt, qt)
                  }, 'viii')
                  return (
                    (this.Na[k] = it),
                    this.handleError(
                      gr(this.db, k, Y.length, 1, 0, it, 0, 0, 0)
                    ),
                    this
                  )
                }),
                (b.prototype.create_aggregate = function (k, Y) {
                  var it =
                      Y.init ||
                      function () {
                        return null
                      },
                    dt =
                      Y.finalize ||
                      function (zt) {
                        return zt
                      },
                    mt = Y.step
                  if (!mt)
                    throw (
                      'An aggregate function must have a step function in ' + k
                    )
                  var yt = {}
                  Object.hasOwnProperty.call(this.Na, k) &&
                    (ue(this.Na[k]), delete this.Na[k]),
                    (Y = k + '__finalize'),
                    Object.hasOwnProperty.call(this.Na, Y) &&
                      (ue(this.Na[Y]), delete this.Na[Y])
                  var qt = Ge(function (zt, Bt, fe) {
                      var Vt = br(zt, 1)
                      Object.hasOwnProperty.call(yt, Vt) || (yt[Vt] = it()),
                        (Bt = e(Bt, fe)),
                        (Bt = [yt[Vt]].concat(Bt))
                      try {
                        yt[Vt] = mt.apply(null, Bt)
                      } catch (an) {
                        delete yt[Vt], we(zt, an, -1)
                      }
                    }, 'viii'),
                    Ct = Ge(function (zt) {
                      var Bt = br(zt, 1)
                      try {
                        var fe = dt(yt[Bt])
                      } catch (Vt) {
                        delete yt[Bt], we(zt, Vt, -1)
                        return
                      }
                      t(zt, fe), delete yt[Bt]
                    }, 'vi')
                  return (
                    (this.Na[k] = qt),
                    (this.Na[Y] = Ct),
                    this.handleError(
                      gr(this.db, k, mt.length - 1, 1, 0, 0, qt, Ct, 0)
                    ),
                    this
                  )
                }),
                (n.Database = b)
            })
          var U = Object.assign({}, n),
            y = './this.program',
            L = typeof window == 'object',
            l = typeof importScripts == 'function',
            g =
              typeof process == 'object' &&
              typeof process.versions == 'object' &&
              typeof process.versions.node == 'string',
            s = '',
            p,
            f,
            E,
            S,
            I,
            A
          g
            ? ((s = l ? Le.dirname(s) + '/' : __dirname + '/'),
              (A = () => {
                I || ((S = Le), (I = Le))
              }),
              (p = function (t, e) {
                return (
                  A(),
                  (t = I.normalize(t)),
                  S.readFileSync(t, e ? void 0 : 'utf8')
                )
              }),
              (E = (t) => (
                (t = p(t, !0)), t.buffer || (t = new Uint8Array(t)), t
              )),
              (f = (t, e, i) => {
                A(),
                  (t = I.normalize(t)),
                  S.readFile(t, function (c, b) {
                    c ? i(c) : e(b.buffer)
                  })
              }),
              1 < process.argv.length &&
                (y = process.argv[1].replace(/\\/g, '/')),
              process.argv.slice(2),
              (lt.exports = n),
              (n.inspect = function () {
                return '[Emscripten Module object]'
              }))
            : (L || l) &&
              (l
                ? (s = self.location.href)
                : typeof document < 'u' &&
                  document.currentScript &&
                  (s = document.currentScript.src),
              (s =
                s.indexOf('blob:') !== 0
                  ? s.substr(0, s.replace(/[?#].*/, '').lastIndexOf('/') + 1)
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
              (f = (t, e, i) => {
                var c = new XMLHttpRequest()
                c.open('GET', t, !0),
                  (c.responseType = 'arraybuffer'),
                  (c.onload = () => {
                    c.status == 200 || (c.status == 0 && c.response)
                      ? e(c.response)
                      : i()
                  }),
                  (c.onerror = i),
                  c.send(null)
              }))
          var X = n.print || console.log.bind(console),
            G = n.printErr || console.warn.bind(console)
          Object.assign(n, U), (U = null), n.thisProgram && (y = n.thisProgram)
          var K
          n.wasmBinary && (K = n.wasmBinary),
            n.noExitRuntime,
            typeof WebAssembly != 'object' &&
              It('no native wasm support detected')
          var B,
            Q = !1,
            ot = typeof TextDecoder < 'u' ? new TextDecoder('utf8') : void 0
          function w(t, e, i) {
            var c = e + i
            for (i = e; t[i] && !(i >= c); ) ++i
            if (16 < i - e && t.buffer && ot) return ot.decode(t.subarray(e, i))
            for (c = ''; e < i; ) {
              var b = t[e++]
              if (b & 128) {
                var z = t[e++] & 63
                if ((b & 224) == 192)
                  c += String.fromCharCode(((b & 31) << 6) | z)
                else {
                  var q = t[e++] & 63
                  ;(b =
                    (b & 240) == 224
                      ? ((b & 15) << 12) | (z << 6) | q
                      : ((b & 7) << 18) | (z << 12) | (q << 6) | (t[e++] & 63)),
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
          function x(t, e) {
            return t ? w(ut, t, e) : ''
          }
          function a(t, e, i, c) {
            if (!(0 < c)) return 0
            var b = i
            c = i + c - 1
            for (var z = 0; z < t.length; ++z) {
              var q = t.charCodeAt(z)
              if (55296 <= q && 57343 >= q) {
                var ht = t.charCodeAt(++z)
                q = (65536 + ((q & 1023) << 10)) | (ht & 1023)
              }
              if (127 >= q) {
                if (i >= c) break
                e[i++] = q
              } else {
                if (2047 >= q) {
                  if (i + 1 >= c) break
                  e[i++] = 192 | (q >> 6)
                } else {
                  if (65535 >= q) {
                    if (i + 2 >= c) break
                    e[i++] = 224 | (q >> 12)
                  } else {
                    if (i + 3 >= c) break
                    ;(e[i++] = 240 | (q >> 18)),
                      (e[i++] = 128 | ((q >> 12) & 63))
                  }
                  e[i++] = 128 | ((q >> 6) & 63)
                }
                e[i++] = 128 | (q & 63)
              }
            }
            return (e[i] = 0), i - b
          }
          function P(t) {
            for (var e = 0, i = 0; i < t.length; ++i) {
              var c = t.charCodeAt(i)
              127 >= c
                ? e++
                : 2047 >= c
                ? (e += 2)
                : 55296 <= c && 57343 >= c
                ? ((e += 4), ++i)
                : (e += 3)
            }
            return e
          }
          var ct, H, ut, J, $, O, F, st
          function nt() {
            var t = B.buffer
            ;(ct = t),
              (n.HEAP8 = H = new Int8Array(t)),
              (n.HEAP16 = J = new Int16Array(t)),
              (n.HEAP32 = $ = new Int32Array(t)),
              (n.HEAPU8 = ut = new Uint8Array(t)),
              (n.HEAPU16 = new Uint16Array(t)),
              (n.HEAPU32 = O = new Uint32Array(t)),
              (n.HEAPF32 = F = new Float32Array(t)),
              (n.HEAPF64 = st = new Float64Array(t))
          }
          var tt,
            Ut = [],
            kt = [],
            Nt = []
          function Et() {
            var t = n.preRun.shift()
            Ut.unshift(t)
          }
          var Lt = 0,
            vt = null
          function It(t) {
            throw (
              (n.onAbort && n.onAbort(t),
              (t = 'Aborted(' + t + ')'),
              G(t),
              (Q = !0),
              new WebAssembly.RuntimeError(
                t + '. Build with -sASSERTIONS for more info.'
              ))
            )
          }
          function Dt() {
            return r.startsWith('data:application/octet-stream;base64,')
          }
          var r
          if (((r = 'sql-wasm.wasm'), !Dt())) {
            var M = r
            r = n.locateFile ? n.locateFile(M, s) : s + M
          }
          function R() {
            var t = r
            try {
              if (t == r && K) return new Uint8Array(K)
              if (E) return E(t)
              throw 'both async and sync fetching of the wasm failed'
            } catch (e) {
              It(e)
            }
          }
          function m() {
            if (!K && (L || l)) {
              if (typeof fetch == 'function' && !r.startsWith('file://'))
                return fetch(r, { credentials: 'same-origin' })
                  .then(function (t) {
                    if (!t.ok)
                      throw "failed to load wasm binary file at '" + r + "'"
                    return t.arrayBuffer()
                  })
                  .catch(function () {
                    return R()
                  })
              if (f)
                return new Promise(function (t, e) {
                  f(
                    r,
                    function (i) {
                      t(new Uint8Array(i))
                    },
                    e
                  )
                })
            }
            return Promise.resolve().then(function () {
              return R()
            })
          }
          var u, T
          function Z(t) {
            for (; 0 < t.length; ) t.shift()(n)
          }
          function W(t, e = 'i8') {
            switch ((e.endsWith('*') && (e = '*'), e)) {
              case 'i1':
                return H[t >> 0]
              case 'i8':
                return H[t >> 0]
              case 'i16':
                return J[t >> 1]
              case 'i32':
                return $[t >> 2]
              case 'i64':
                return $[t >> 2]
              case 'float':
                return F[t >> 2]
              case 'double':
                return st[t >> 3]
              case '*':
                return O[t >> 2]
              default:
                It('invalid type for getValue: ' + e)
            }
            return null
          }
          function D(t) {
            var e = 'i32'
            switch ((e.endsWith('*') && (e = '*'), e)) {
              case 'i1':
                H[t >> 0] = 0
                break
              case 'i8':
                H[t >> 0] = 0
                break
              case 'i16':
                J[t >> 1] = 0
                break
              case 'i32':
                $[t >> 2] = 0
                break
              case 'i64':
                ;(T = [
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
                  ($[t >> 2] = T[0]),
                  ($[(t + 4) >> 2] = T[1])
                break
              case 'float':
                F[t >> 2] = 0
                break
              case 'double':
                st[t >> 3] = 0
                break
              case '*':
                O[t >> 2] = 0
                break
              default:
                It('invalid type for setValue: ' + e)
            }
          }
          var V = (t, e) => {
              for (var i = 0, c = t.length - 1; 0 <= c; c--) {
                var b = t[c]
                b === '.'
                  ? t.splice(c, 1)
                  : b === '..'
                  ? (t.splice(c, 1), i++)
                  : i && (t.splice(c, 1), i--)
              }
              if (e) for (; i; i--) t.unshift('..')
              return t
            },
            rt = (t) => {
              var e = t.charAt(0) === '/',
                i = t.substr(-1) === '/'
              return (
                (t = V(
                  t.split('/').filter((c) => !!c),
                  !e
                ).join('/')) ||
                  e ||
                  (t = '.'),
                t && i && (t += '/'),
                (e ? '/' : '') + t
              )
            },
            et = (t) => {
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
            at = (t) => {
              if (t === '/') return '/'
              ;(t = rt(t)), (t = t.replace(/\/$/, ''))
              var e = t.lastIndexOf('/')
              return e === -1 ? t : t.substr(e + 1)
            }
          function wt() {
            if (
              typeof crypto == 'object' &&
              typeof crypto.getRandomValues == 'function'
            ) {
              var t = new Uint8Array(1)
              return () => (crypto.getRandomValues(t), t[0])
            }
            if (g)
              try {
                var e = Le
                return () => e.randomBytes(1)[0]
              } catch {}
            return () => It('randomDevice')
          }
          function pt() {
            for (
              var t = '', e = !1, i = arguments.length - 1;
              -1 <= i && !e;
              i--
            ) {
              if (((e = 0 <= i ? arguments[i] : '/'), typeof e != 'string'))
                throw new TypeError('Arguments to path.resolve must be strings')
              if (!e) return ''
              ;(t = e + '/' + t), (e = e.charAt(0) === '/')
            }
            return (
              (t = V(
                t.split('/').filter((c) => !!c),
                !e
              ).join('/')),
              (e ? '/' : '') + t || '.'
            )
          }
          function Ot(t, e) {
            var i = Array(P(t) + 1)
            return (t = a(t, i, 0, i.length)), e && (i.length = t), i
          }
          var Wt = []
          function xt(t, e) {
            ;(Wt[t] = { input: [], output: [], Xa: e }), Ie(t, Kt)
          }
          var Kt = {
              open: function (t) {
                var e = Wt[t.node.rdev]
                if (!e) throw new j(43)
                ;(t.tty = e), (t.seekable = !1)
              },
              close: function (t) {
                t.tty.Xa.fsync(t.tty)
              },
              fsync: function (t) {
                t.tty.Xa.fsync(t.tty)
              },
              read: function (t, e, i, c) {
                if (!t.tty || !t.tty.Xa.tb) throw new j(60)
                for (var b = 0, z = 0; z < c; z++) {
                  try {
                    var q = t.tty.Xa.tb(t.tty)
                  } catch {
                    throw new j(29)
                  }
                  if (q === void 0 && b === 0) throw new j(6)
                  if (q == null) break
                  b++, (e[i + z] = q)
                }
                return b && (t.node.timestamp = Date.now()), b
              },
              write: function (t, e, i, c) {
                if (!t.tty || !t.tty.Xa.jb) throw new j(60)
                try {
                  for (var b = 0; b < c; b++) t.tty.Xa.jb(t.tty, e[i + b])
                } catch {
                  throw new j(29)
                }
                return c && (t.node.timestamp = Date.now()), b
              }
            },
            St = {
              tb: function (t) {
                if (!t.input.length) {
                  var e = null
                  if (g) {
                    var i = Buffer.alloc(256),
                      c = 0
                    try {
                      c = S.readSync(process.stdin.fd, i, 0, 256, -1)
                    } catch (b) {
                      if (b.toString().includes('EOF')) c = 0
                      else throw b
                    }
                    0 < c ? (e = i.slice(0, c).toString('utf-8')) : (e = null)
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
                  ? (X(w(t.output, 0)), (t.output = []))
                  : e != 0 && t.output.push(e)
              },
              fsync: function (t) {
                t.output &&
                  0 < t.output.length &&
                  (X(w(t.output, 0)), (t.output = []))
              }
            },
            Qt = {
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
            ft = {
              Qa: null,
              Ra: function () {
                return ft.createNode(null, '/', 16895, 0)
              },
              createNode: function (t, e, i, c) {
                if ((i & 61440) === 24576 || (i & 61440) === 4096)
                  throw new j(63)
                return (
                  ft.Qa ||
                    (ft.Qa = {
                      dir: {
                        node: {
                          Pa: ft.Ga.Pa,
                          Oa: ft.Ga.Oa,
                          lookup: ft.Ga.lookup,
                          ab: ft.Ga.ab,
                          rename: ft.Ga.rename,
                          unlink: ft.Ga.unlink,
                          rmdir: ft.Ga.rmdir,
                          readdir: ft.Ga.readdir,
                          symlink: ft.Ga.symlink
                        },
                        stream: { Ta: ft.Ha.Ta }
                      },
                      file: {
                        node: { Pa: ft.Ga.Pa, Oa: ft.Ga.Oa },
                        stream: {
                          Ta: ft.Ha.Ta,
                          read: ft.Ha.read,
                          write: ft.Ha.write,
                          lb: ft.Ha.lb,
                          bb: ft.Ha.bb,
                          cb: ft.Ha.cb
                        }
                      },
                      link: {
                        node: {
                          Pa: ft.Ga.Pa,
                          Oa: ft.Ga.Oa,
                          readlink: ft.Ga.readlink
                        },
                        stream: {}
                      },
                      pb: { node: { Pa: ft.Ga.Pa, Oa: ft.Ga.Oa }, stream: Ur }
                    }),
                  (i = He(t, e, i, c)),
                  (i.mode & 61440) === 16384
                    ? ((i.Ga = ft.Qa.dir.node),
                      (i.Ha = ft.Qa.dir.stream),
                      (i.Ia = {}))
                    : (i.mode & 61440) === 32768
                    ? ((i.Ga = ft.Qa.file.node),
                      (i.Ha = ft.Qa.file.stream),
                      (i.Ma = 0),
                      (i.Ia = null))
                    : (i.mode & 61440) === 40960
                    ? ((i.Ga = ft.Qa.link.node), (i.Ha = ft.Qa.link.stream))
                    : (i.mode & 61440) === 8192 &&
                      ((i.Ga = ft.Qa.pb.node), (i.Ha = ft.Qa.pb.stream)),
                  (i.timestamp = Date.now()),
                  t && ((t.Ia[e] = i), (t.timestamp = i.timestamp)),
                  i
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
                var i = t.Ia ? t.Ia.length : 0
                i >= e ||
                  ((e = Math.max(e, (i * (1048576 > i ? 2 : 1.125)) >>> 0)),
                  i != 0 && (e = Math.max(e, 256)),
                  (i = t.Ia),
                  (t.Ia = new Uint8Array(e)),
                  0 < t.Ma && t.Ia.set(i.subarray(0, t.Ma), 0))
              },
              Gb: function (t, e) {
                if (t.Ma != e)
                  if (e == 0) (t.Ia = null), (t.Ma = 0)
                  else {
                    var i = t.Ia
                    ;(t.Ia = new Uint8Array(e)),
                      i && t.Ia.set(i.subarray(0, Math.min(e, t.Ma))),
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
                    e.size !== void 0 && ft.Gb(t, e.size)
                },
                lookup: function () {
                  throw Xt[44]
                },
                ab: function (t, e, i, c) {
                  return ft.createNode(t, e, i, c)
                },
                rename: function (t, e, i) {
                  if ((t.mode & 61440) === 16384) {
                    try {
                      var c = Jt(e, i)
                    } catch {}
                    if (c) for (var b in c.Ia) throw new j(55)
                  }
                  delete t.parent.Ia[t.name],
                    (t.parent.timestamp = Date.now()),
                    (t.name = i),
                    (e.Ia[i] = t),
                    (e.timestamp = t.parent.timestamp),
                    (t.parent = e)
                },
                unlink: function (t, e) {
                  delete t.Ia[e], (t.timestamp = Date.now())
                },
                rmdir: function (t, e) {
                  var i = Jt(t, e),
                    c
                  for (c in i.Ia) throw new j(55)
                  delete t.Ia[e], (t.timestamp = Date.now())
                },
                readdir: function (t) {
                  var e = ['.', '..'],
                    i
                  for (i in t.Ia) t.Ia.hasOwnProperty(i) && e.push(i)
                  return e
                },
                symlink: function (t, e, i) {
                  return (t = ft.createNode(t, e, 41471, 0)), (t.link = i), t
                },
                readlink: function (t) {
                  if ((t.mode & 61440) !== 40960) throw new j(28)
                  return t.link
                }
              },
              Ha: {
                read: function (t, e, i, c, b) {
                  var z = t.node.Ia
                  if (b >= t.node.Ma) return 0
                  if (((t = Math.min(t.node.Ma - b, c)), 8 < t && z.subarray))
                    e.set(z.subarray(b, b + t), i)
                  else for (c = 0; c < t; c++) e[i + c] = z[b + c]
                  return t
                },
                write: function (t, e, i, c, b, z) {
                  if ((e.buffer === H.buffer && (z = !1), !c)) return 0
                  if (
                    ((t = t.node),
                    (t.timestamp = Date.now()),
                    e.subarray && (!t.Ia || t.Ia.subarray))
                  ) {
                    if (z) return (t.Ia = e.subarray(i, i + c)), (t.Ma = c)
                    if (t.Ma === 0 && b === 0)
                      return (t.Ia = e.slice(i, i + c)), (t.Ma = c)
                    if (b + c <= t.Ma)
                      return t.Ia.set(e.subarray(i, i + c), b), c
                  }
                  if ((ft.qb(t, b + c), t.Ia.subarray && e.subarray))
                    t.Ia.set(e.subarray(i, i + c), b)
                  else for (z = 0; z < c; z++) t.Ia[b + z] = e[i + z]
                  return (t.Ma = Math.max(t.Ma, b + c)), c
                },
                Ta: function (t, e, i) {
                  if (
                    (i === 1
                      ? (e += t.position)
                      : i === 2 &&
                        (t.node.mode & 61440) === 32768 &&
                        (e += t.node.Ma),
                    0 > e)
                  )
                    throw new j(28)
                  return e
                },
                lb: function (t, e, i) {
                  ft.qb(t.node, e + i), (t.node.Ma = Math.max(t.node.Ma, e + i))
                },
                bb: function (t, e, i, c, b) {
                  if ((t.node.mode & 61440) !== 32768) throw new j(43)
                  if (((t = t.node.Ia), b & 2 || t.buffer !== ct)) {
                    if (
                      ((0 < i || i + e < t.length) &&
                        (t.subarray
                          ? (t = t.subarray(i, i + e))
                          : (t = Array.prototype.slice.call(t, i, i + e))),
                      (i = !0),
                      (e = 65536 * Math.ceil(e / 65536)),
                      (b = dr(65536, e))
                        ? (ut.fill(0, b, b + e), (e = b))
                        : (e = 0),
                      !e)
                    )
                      throw new j(48)
                    H.set(t, e)
                  } else (i = !1), (e = t.byteOffset)
                  return { Fb: e, vb: i }
                },
                cb: function (t, e, i, c, b) {
                  if ((t.node.mode & 61440) !== 32768) throw new j(43)
                  return b & 2 || ft.Ha.write(t, e, 0, c, i, !1), 0
                }
              }
            },
            Rt = null,
            re = {},
            jt = [],
            Ae = 1,
            Mt = null,
            ne = !0,
            j = null,
            Xt = {},
            Ft = (t, e = {}) => {
              if (((t = pt('/', t)), !t)) return { path: '', node: null }
              if (((e = Object.assign({ rb: !0, kb: 0 }, e)), 8 < e.kb))
                throw new j(32)
              t = V(
                t.split('/').filter((q) => !!q),
                !1
              )
              for (var i = Rt, c = '/', b = 0; b < t.length; b++) {
                var z = b === t.length - 1
                if (z && e.parent) break
                if (
                  ((i = Jt(i, t[b])),
                  (c = rt(c + '/' + t[b])),
                  i.Va && (!z || (z && e.rb)) && (i = i.Va.root),
                  !z || e.Sa)
                ) {
                  for (z = 0; (i.mode & 61440) === 40960; )
                    if (
                      ((i = Ve(c)),
                      (c = pt(et(c), i)),
                      (i = Ft(c, { kb: e.kb + 1 }).node),
                      40 < z++)
                    )
                      throw new j(32)
                }
              }
              return { path: c, node: i }
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
            ke = (t, e) => {
              for (var i = 0, c = 0; c < e.length; c++)
                i = ((i << 5) - i + e.charCodeAt(c)) | 0
              return ((t + i) >>> 0) % Mt.length
            },
            qe = (t) => {
              var e = ke(t.parent.id, t.name)
              if (Mt[e] === t) Mt[e] = t.Wa
              else
                for (e = Mt[e]; e; ) {
                  if (e.Wa === t) {
                    e.Wa = t.Wa
                    break
                  }
                  e = e.Wa
                }
            },
            Jt = (t, e) => {
              var i
              if ((i = (i = te(t, 'x')) ? i : t.Ga.lookup ? 0 : 2))
                throw new j(i, t)
              for (i = Mt[ke(t.id, e)]; i; i = i.Wa) {
                var c = i.name
                if (i.parent.id === t.id && c === e) return i
              }
              return t.Ga.lookup(t, e)
            },
            He = (t, e, i, c) => (
              (t = new cr(t, e, i, c)),
              (e = ke(t.parent.id, t.name)),
              (t.Wa = Mt[e]),
              (Mt[e] = t)
            ),
            Lr = { r: 0, 'r+': 2, w: 577, 'w+': 578, a: 1089, 'a+': 1090 },
            We = (t) => {
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
            Xe = (t, e) => {
              try {
                return Jt(t, e), 20
              } catch {}
              return te(t, 'wx')
            },
            Ze = (t, e, i) => {
              try {
                var c = Jt(t, e)
              } catch (b) {
                return b.Ka
              }
              if ((t = te(t, 'wx'))) return t
              if (i) {
                if ((c.mode & 61440) !== 16384) return 54
                if (c === c.parent || ie(c) === '/') return 10
              } else if ((c.mode & 61440) === 16384) return 31
              return 0
            },
            Tr = (t = 0) => {
              for (; 4096 >= t; t++) if (!jt[t]) return t
              throw new j(33)
            },
            Ye = (t, e) => (
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
                    set: function (i) {
                      this.node = i
                    }
                  },
                  flags: {
                    get: function () {
                      return this.$a.flags
                    },
                    set: function (i) {
                      this.$a.flags = i
                    }
                  },
                  position: {
                    get: function () {
                      return this.$a.position
                    },
                    set: function (i) {
                      this.$a.position = i
                    }
                  }
                })),
              (t = Object.assign(new oe(), t)),
              (e = Tr(e)),
              (t.fd = e),
              (jt[e] = t)
            ),
            Ur = {
              open: (t) => {
                ;(t.Ha = re[t.node.rdev].Ha), t.Ha.open && t.Ha.open(t)
              },
              Ta: () => {
                throw new j(70)
              }
            },
            Ie = (t, e) => {
              re[t] = { Ha: e }
            },
            Ke = (t, e) => {
              var i = e === '/',
                c = !e
              if (i && Rt) throw new j(10)
              if (!i && !c) {
                var b = Ft(e, { rb: !1 })
                if (((e = b.path), (b = b.node), b.Va)) throw new j(10)
                if ((b.mode & 61440) !== 16384) throw new j(54)
              }
              ;(e = { type: t, Kb: {}, ub: e, Eb: [] }),
                (t = t.Ra(e)),
                (t.Ra = e),
                (e.root = t),
                i ? (Rt = t) : b && ((b.Va = e), b.Ra && b.Ra.Eb.push(e))
            },
            de = (t, e, i) => {
              var c = Ft(t, { parent: !0 }).node
              if (((t = at(t)), !t || t === '.' || t === '..')) throw new j(28)
              var b = Xe(c, t)
              if (b) throw new j(b)
              if (!c.Ga.ab) throw new j(63)
              return c.Ga.ab(c, t, e, i)
            },
            Pt = (t, e) => de(t, ((e !== void 0 ? e : 511) & 1023) | 16384, 0),
            he = (t, e, i) => {
              typeof i > 'u' && ((i = e), (e = 438)), de(t, e | 8192, i)
            },
            Oe = (t, e) => {
              if (!pt(t)) throw new j(44)
              var i = Ft(e, { parent: !0 }).node
              if (!i) throw new j(44)
              e = at(e)
              var c = Xe(i, e)
              if (c) throw new j(c)
              if (!i.Ga.symlink) throw new j(63)
              i.Ga.symlink(i, e, t)
            },
            Je = (t) => {
              var e = Ft(t, { parent: !0 }).node
              t = at(t)
              var i = Jt(e, t),
                c = Ze(e, t, !0)
              if (c) throw new j(c)
              if (!e.Ga.rmdir) throw new j(63)
              if (i.Va) throw new j(10)
              e.Ga.rmdir(e, t), qe(i)
            },
            $e = (t) => {
              var e = Ft(t, { parent: !0 }).node
              if (!e) throw new j(44)
              t = at(t)
              var i = Jt(e, t),
                c = Ze(e, t, !1)
              if (c) throw new j(c)
              if (!e.Ga.unlink) throw new j(63)
              if (i.Va) throw new j(10)
              e.Ga.unlink(e, t), qe(i)
            },
            Ve = (t) => {
              if (((t = Ft(t).node), !t)) throw new j(44)
              if (!t.Ga.readlink) throw new j(28)
              return pt(ie(t.parent), t.Ga.readlink(t))
            },
            ae = (t, e) => {
              if (((t = Ft(t, { Sa: !e }).node), !t)) throw new j(44)
              if (!t.Ga.Pa) throw new j(63)
              return t.Ga.Pa(t)
            },
            Qe = (t) => ae(t, !0),
            _e = (t, e) => {
              if (
                ((t = typeof t == 'string' ? Ft(t, { Sa: !0 }).node : t),
                !t.Ga.Oa)
              )
                throw new j(63)
              t.Ga.Oa(t, {
                mode: (e & 4095) | (t.mode & -4096),
                timestamp: Date.now()
              })
            },
            tr = (t, e) => {
              if (0 > e) throw new j(28)
              if (
                ((t = typeof t == 'string' ? Ft(t, { Sa: !0 }).node : t),
                !t.Ga.Oa)
              )
                throw new j(63)
              if ((t.mode & 61440) === 16384) throw new j(31)
              if ((t.mode & 61440) !== 32768) throw new j(28)
              var i = te(t, 'w')
              if (i) throw new j(i)
              t.Ga.Oa(t, { size: e, timestamp: Date.now() })
            },
            ee = (t, e, i) => {
              if (t === '') throw new j(44)
              if (typeof e == 'string') {
                var c = Lr[e]
                if (typeof c > 'u') throw Error('Unknown file open mode: ' + e)
                e = c
              }
              if (
                ((i = e & 64 ? ((typeof i > 'u' ? 438 : i) & 4095) | 32768 : 0),
                typeof t == 'object')
              )
                var b = t
              else {
                t = rt(t)
                try {
                  b = Ft(t, { Sa: !(e & 131072) }).node
                } catch {}
              }
              if (((c = !1), e & 64))
                if (b) {
                  if (e & 128) throw new j(20)
                } else (b = de(t, i, 0)), (c = !0)
              if (!b) throw new j(44)
              if (
                ((b.mode & 61440) === 8192 && (e &= -513),
                e & 65536 && (b.mode & 61440) !== 16384)
              )
                throw new j(54)
              if (
                !c &&
                (i = b
                  ? (b.mode & 61440) === 40960
                    ? 32
                    : (b.mode & 61440) === 16384 && (We(e) !== 'r' || e & 512)
                    ? 31
                    : te(b, We(e))
                  : 44)
              )
                throw new j(i)
              return (
                e & 512 && !c && tr(b, 0),
                (e &= -131713),
                (b = Ye({
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
                !n.logReadFiles ||
                  e & 1 ||
                  (pe || (pe = {}), t in pe || (pe[t] = 1)),
                b
              )
            },
            De = (t) => {
              if (t.fd === null) throw new j(8)
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
            er = (t, e, i) => {
              if (t.fd === null) throw new j(8)
              if (!t.seekable || !t.Ha.Ta) throw new j(70)
              if (i != 0 && i != 1 && i != 2) throw new j(28)
              ;(t.position = t.Ha.Ta(t, e, i)), (t.Ib = [])
            },
            rr = (t, e, i, c, b) => {
              if (0 > c || 0 > b) throw new j(28)
              if (t.fd === null) throw new j(8)
              if ((t.flags & 2097155) === 1) throw new j(8)
              if ((t.node.mode & 61440) === 16384) throw new j(31)
              if (!t.Ha.read) throw new j(28)
              var z = typeof b < 'u'
              if (!z) b = t.position
              else if (!t.seekable) throw new j(70)
              return (e = t.Ha.read(t, e, i, c, b)), z || (t.position += e), e
            },
            nr = (t, e, i, c, b) => {
              if (0 > c || 0 > b) throw new j(28)
              if (t.fd === null) throw new j(8)
              if (!(t.flags & 2097155)) throw new j(8)
              if ((t.node.mode & 61440) === 16384) throw new j(31)
              if (!t.Ha.write) throw new j(28)
              t.seekable && t.flags & 1024 && er(t, 0, 2)
              var z = typeof b < 'u'
              if (!z) b = t.position
              else if (!t.seekable) throw new j(70)
              return (
                (e = t.Ha.write(t, e, i, c, b, void 0)),
                z || (t.position += e),
                e
              )
            },
            Sr = (t) => {
              var e,
                i = ee(t, i || 0)
              t = ae(t).size
              var c = new Uint8Array(t)
              return rr(i, c, 0, t, 0), (e = c), De(i), e
            },
            ir = () => {
              j ||
                ((j = function (t, e) {
                  ;(this.node = e),
                    (this.Hb = function (i) {
                      this.Ka = i
                    }),
                    this.Hb(t),
                    (this.message = 'FS error')
                }),
                (j.prototype = Error()),
                (j.prototype.constructor = j),
                [44].forEach((t) => {
                  ;(Xt[t] = new j(t)),
                    (Xt[t].stack = '<generic error, no stack>')
                }))
            },
            ar,
            sr = (t, e) => {
              var i = 0
              return t && (i |= 365), e && (i |= 146), i
            },
            se = (t, e, i) => {
              t = rt('/dev/' + t)
              var c = sr(!!e, !!i)
              Fe || (Fe = 64)
              var b = (Fe++ << 8) | 0
              Ie(b, {
                open: (z) => {
                  z.seekable = !1
                },
                close: () => {
                  i && i.buffer && i.buffer.length && i(10)
                },
                read: (z, q, ht, bt) => {
                  for (var gt = 0, At = 0; At < bt; At++) {
                    try {
                      var Ht = e()
                    } catch {
                      throw new j(29)
                    }
                    if (Ht === void 0 && gt === 0) throw new j(6)
                    if (Ht == null) break
                    gt++, (q[ht + At] = Ht)
                  }
                  return gt && (z.node.timestamp = Date.now()), gt
                },
                write: (z, q, ht, bt) => {
                  for (var gt = 0; gt < bt; gt++)
                    try {
                      i(q[ht + gt])
                    } catch {
                      throw new j(29)
                    }
                  return bt && (z.node.timestamp = Date.now()), gt
                }
              }),
                he(t, c, b)
            },
            Fe,
            Tt = {},
            oe,
            pe
          function $t(t, e, i) {
            if (e.charAt(0) === '/') return e
            if (((t = t === -100 ? '/' : Gt(t).path), e.length == 0)) {
              if (!i) throw new j(44)
              return t
            }
            return rt(t + '/' + e)
          }
          function me(t, e, i) {
            try {
              var c = t(e)
            } catch (b) {
              if (b && b.node && rt(e) !== rt(ie(b.node))) return -54
              throw b
            }
            return (
              ($[i >> 2] = c.dev),
              ($[(i + 8) >> 2] = c.ino),
              ($[(i + 12) >> 2] = c.mode),
              (O[(i + 16) >> 2] = c.nlink),
              ($[(i + 20) >> 2] = c.uid),
              ($[(i + 24) >> 2] = c.gid),
              ($[(i + 28) >> 2] = c.rdev),
              (T = [
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
              ($[(i + 40) >> 2] = T[0]),
              ($[(i + 44) >> 2] = T[1]),
              ($[(i + 48) >> 2] = 4096),
              ($[(i + 52) >> 2] = c.blocks),
              (T = [
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
              ($[(i + 56) >> 2] = T[0]),
              ($[(i + 60) >> 2] = T[1]),
              (O[(i + 64) >> 2] = 0),
              (T = [
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
              ($[(i + 72) >> 2] = T[0]),
              ($[(i + 76) >> 2] = T[1]),
              (O[(i + 80) >> 2] = 0),
              (T = [
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
              ($[(i + 88) >> 2] = T[0]),
              ($[(i + 92) >> 2] = T[1]),
              (O[(i + 96) >> 2] = 0),
              (T = [
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
              ($[(i + 104) >> 2] = T[0]),
              ($[(i + 108) >> 2] = T[1]),
              0
            )
          }
          var Ne = void 0
          function ge() {
            return (Ne += 4), $[(Ne - 4) >> 2]
          }
          function Gt(t) {
            if (((t = jt[t]), !t)) throw new j(8)
            return t
          }
          function xe(t) {
            return O[t >> 2] + 4294967296 * $[(t + 4) >> 2]
          }
          function or(t) {
            var e = P(t) + 1,
              i = Ee(e)
            return i && a(t, H, i, e), i
          }
          function Ar(t, e, i) {
            function c(bt) {
              return (bt = bt.toTimeString().match(/\(([A-Za-z ]+)\)$/))
                ? bt[1]
                : 'GMT'
            }
            var b = new Date().getFullYear(),
              z = new Date(b, 0, 1),
              q = new Date(b, 6, 1)
            b = z.getTimezoneOffset()
            var ht = q.getTimezoneOffset()
            ;($[t >> 2] = 60 * Math.max(b, ht)),
              ($[e >> 2] = Number(b != ht)),
              (t = c(z)),
              (e = c(q)),
              (t = or(t)),
              (e = or(e)),
              ht < b
                ? ((O[i >> 2] = t), (O[(i + 4) >> 2] = e))
                : ((O[i >> 2] = e), (O[(i + 4) >> 2] = t))
          }
          function Re(t, e, i) {
            Re.Bb || ((Re.Bb = !0), Ar(t, e, i))
          }
          var ur
          ur = g
            ? () => {
                var t = process.hrtime()
                return 1e3 * t[0] + t[1] / 1e6
              }
            : () => performance.now()
          var Ce = {}
          function lr() {
            if (!ze) {
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
              for (e in Ce) Ce[e] === void 0 ? delete t[e] : (t[e] = Ce[e])
              var i = []
              for (e in t) i.push(e + '=' + t[e])
              ze = i
            }
            return ze
          }
          var ze,
            Zt = void 0,
            Be = []
          function Ge(t, e) {
            if (!Zt) {
              Zt = new WeakMap()
              var i = tt.length
              if (Zt)
                for (var c = 0; c < 0 + i; c++) {
                  var b = tt.get(c)
                  b && Zt.set(b, c)
                }
            }
            if (Zt.has(t)) return Zt.get(t)
            if (Be.length) i = Be.pop()
            else {
              try {
                tt.grow(1)
              } catch (ht) {
                throw ht instanceof RangeError
                  ? 'Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.'
                  : ht
              }
              i = tt.length - 1
            }
            try {
              tt.set(i, t)
            } catch (ht) {
              if (!(ht instanceof TypeError)) throw ht
              if (typeof WebAssembly.Function == 'function') {
                ;(c = WebAssembly.Function),
                  (b = { i: 'i32', j: 'i64', f: 'f32', d: 'f64', p: 'i32' })
                for (
                  var z = {
                      parameters: [],
                      results: e[0] == 'v' ? [] : [b[e[0]]]
                    },
                    q = 1;
                  q < e.length;
                  ++q
                )
                  z.parameters.push(b[e[q]])
                e = new c(z, t)
              } else {
                for (
                  c = [1, 96],
                    b = e.slice(0, 1),
                    e = e.slice(1),
                    z = { i: 127, p: 127, j: 126, f: 125, d: 124 },
                    q = e.length,
                    128 > q ? c.push(q) : c.push(q % 128 | 128, q >> 7),
                    q = 0;
                  q < e.length;
                  ++q
                )
                  c.push(z[e[q]])
                b == 'v' ? c.push(0) : c.push(1, z[b]),
                  (e = [0, 97, 115, 109, 1, 0, 0, 0, 1]),
                  (b = c.length),
                  128 > b ? e.push(b) : e.push(b % 128 | 128, b >> 7),
                  e.push.apply(e, c),
                  e.push(2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0),
                  (e = new WebAssembly.Module(new Uint8Array(e))),
                  (e = new WebAssembly.Instance(e, { e: { f: t } }).exports.f)
              }
              tt.set(i, e)
            }
            return Zt.set(t, i), i
          }
          function ue(t) {
            Zt.delete(tt.get(t)), Be.push(t)
          }
          function je(t) {
            var e = Ee(t.length)
            return (
              t.subarray || t.slice || (t = new Uint8Array(t)), ut.set(t, e), e
            )
          }
          function kr(t, e, i, c) {
            var b = {
              string: (gt) => {
                var At = 0
                if (gt != null && gt !== 0) {
                  var Ht = (gt.length << 2) + 1
                  ;(At = Yt(Ht)), a(gt, ut, At, Ht)
                }
                return At
              },
              array: (gt) => {
                var At = Yt(gt.length)
                return H.set(gt, At), At
              }
            }
            t = n['_' + t]
            var z = [],
              q = 0
            if (c)
              for (var ht = 0; ht < c.length; ht++) {
                var bt = b[i[ht]]
                bt
                  ? (q === 0 && (q = le()), (z[ht] = bt(c[ht])))
                  : (z[ht] = c[ht])
              }
            return (
              (i = t.apply(null, z)),
              (i = (function (gt) {
                return (
                  q !== 0 && ce(q),
                  e === 'string' ? x(gt) : e === 'boolean' ? !!gt : gt
                )
              })(i))
            )
          }
          function cr(t, e, i, c) {
            t || (t = this),
              (this.parent = t),
              (this.Ra = t.Ra),
              (this.Va = null),
              (this.id = Ae++),
              (this.name = e),
              (this.mode = i),
              (this.Ga = {}),
              (this.Ha = {}),
              (this.rdev = c)
          }
          Object.defineProperties(cr.prototype, {
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
            ir(),
            (Mt = Array(4096)),
            Ke(ft, '/'),
            Pt('/tmp'),
            Pt('/home'),
            Pt('/home/web_user'),
            (() => {
              Pt('/dev'),
                Ie(259, { read: () => 0, write: (e, i, c, b) => b }),
                he('/dev/null', 259),
                xt(1280, St),
                xt(1536, Qt),
                he('/dev/tty', 1280),
                he('/dev/tty1', 1536)
              var t = wt()
              se('random', t),
                se('urandom', t),
                Pt('/dev/shm'),
                Pt('/dev/shm/tmp')
            })(),
            (() => {
              Pt('/proc')
              var t = Pt('/proc/self')
              Pt('/proc/self/fd'),
                Ke(
                  {
                    Ra: () => {
                      var e = He(t, 'fd', 16895, 73)
                      return (
                        (e.Ga = {
                          lookup: (i, c) => {
                            var b = jt[+c]
                            if (!b) throw new j(8)
                            return (
                              (i = {
                                parent: null,
                                Ra: { ub: 'fake' },
                                Ga: { readlink: () => b.path }
                              }),
                              (i.parent = i)
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
          var Ir = {
            a: function (t, e, i, c) {
              It(
                'Assertion failed: ' +
                  x(t) +
                  ', at: ' +
                  [
                    e ? x(e) : 'unknown filename',
                    i,
                    c ? x(c) : 'unknown function'
                  ]
              )
            },
            h: function (t, e) {
              try {
                return (t = x(t)), _e(t, e), 0
              } catch (i) {
                if (typeof Tt > 'u' || !(i instanceof j)) throw i
                return -i.Ka
              }
            },
            H: function (t, e, i) {
              try {
                if (((e = x(e)), (e = $t(t, e)), i & -8)) return -28
                var c = Ft(e, { Sa: !0 }).node
                return c
                  ? ((t = ''),
                    i & 4 && (t += 'r'),
                    i & 2 && (t += 'w'),
                    i & 1 && (t += 'x'),
                    t && te(c, t) ? -2 : 0)
                  : -44
              } catch (b) {
                if (typeof Tt > 'u' || !(b instanceof j)) throw b
                return -b.Ka
              }
            },
            i: function (t, e) {
              try {
                var i = jt[t]
                if (!i) throw new j(8)
                return _e(i.node, e), 0
              } catch (c) {
                if (typeof Tt > 'u' || !(c instanceof j)) throw c
                return -c.Ka
              }
            },
            g: function (t) {
              try {
                var e = jt[t]
                if (!e) throw new j(8)
                var i = e.node,
                  c = typeof i == 'string' ? Ft(i, { Sa: !0 }).node : i
                if (!c.Ga.Oa) throw new j(63)
                return c.Ga.Oa(c, { timestamp: Date.now() }), 0
              } catch (b) {
                if (typeof Tt > 'u' || !(b instanceof j)) throw b
                return -b.Ka
              }
            },
            b: function (t, e, i) {
              Ne = i
              try {
                var c = Gt(t)
                switch (e) {
                  case 0:
                    var b = ge()
                    return 0 > b ? -28 : Ye(c, b).fd
                  case 1:
                  case 2:
                    return 0
                  case 3:
                    return c.flags
                  case 4:
                    return (b = ge()), (c.flags |= b), 0
                  case 5:
                    return (b = ge()), (J[(b + 0) >> 1] = 2), 0
                  case 6:
                  case 7:
                    return 0
                  case 16:
                  case 8:
                    return -28
                  case 9:
                    return ($[fr() >> 2] = 28), -1
                  default:
                    return -28
                }
              } catch (z) {
                if (typeof Tt > 'u' || !(z instanceof j)) throw z
                return -z.Ka
              }
            },
            G: function (t, e) {
              try {
                var i = Gt(t)
                return me(ae, i.path, e)
              } catch (c) {
                if (typeof Tt > 'u' || !(c instanceof j)) throw c
                return -c.Ka
              }
            },
            l: function (t, e, i) {
              try {
                if (
                  ((e =
                    (i + 2097152) >>> 0 < 4194305 - !!e
                      ? (e >>> 0) + 4294967296 * i
                      : NaN),
                  isNaN(e))
                )
                  return -61
                var c = jt[t]
                if (!c) throw new j(8)
                if (!(c.flags & 2097155)) throw new j(28)
                return tr(c.node, e), 0
              } catch (b) {
                if (typeof Tt > 'u' || !(b instanceof j)) throw b
                return -b.Ka
              }
            },
            B: function (t, e) {
              try {
                if (e === 0) return -28
                var i = P('/') + 1
                return e < i ? -68 : (a('/', ut, t, e), i)
              } catch (c) {
                if (typeof Tt > 'u' || !(c instanceof j)) throw c
                return -c.Ka
              }
            },
            E: function (t, e) {
              try {
                return (t = x(t)), me(Qe, t, e)
              } catch (i) {
                if (typeof Tt > 'u' || !(i instanceof j)) throw i
                return -i.Ka
              }
            },
            y: function (t, e, i) {
              try {
                return (
                  (e = x(e)),
                  (e = $t(t, e)),
                  (e = rt(e)),
                  e[e.length - 1] === '/' && (e = e.substr(0, e.length - 1)),
                  Pt(e, i),
                  0
                )
              } catch (c) {
                if (typeof Tt > 'u' || !(c instanceof j)) throw c
                return -c.Ka
              }
            },
            D: function (t, e, i, c) {
              try {
                e = x(e)
                var b = c & 256
                return (e = $t(t, e, c & 4096)), me(b ? Qe : ae, e, i)
              } catch (z) {
                if (typeof Tt > 'u' || !(z instanceof j)) throw z
                return -z.Ka
              }
            },
            v: function (t, e, i, c) {
              Ne = c
              try {
                ;(e = x(e)), (e = $t(t, e))
                var b = c ? ge() : 0
                return ee(e, i, b).fd
              } catch (z) {
                if (typeof Tt > 'u' || !(z instanceof j)) throw z
                return -z.Ka
              }
            },
            t: function (t, e, i, c) {
              try {
                if (((e = x(e)), (e = $t(t, e)), 0 >= c)) return -28
                var b = Ve(e),
                  z = Math.min(c, P(b)),
                  q = H[i + z]
                return a(b, ut, i, c + 1), (H[i + z] = q), z
              } catch (ht) {
                if (typeof Tt > 'u' || !(ht instanceof j)) throw ht
                return -ht.Ka
              }
            },
            s: function (t) {
              try {
                return (t = x(t)), Je(t), 0
              } catch (e) {
                if (typeof Tt > 'u' || !(e instanceof j)) throw e
                return -e.Ka
              }
            },
            F: function (t, e) {
              try {
                return (t = x(t)), me(ae, t, e)
              } catch (i) {
                if (typeof Tt > 'u' || !(i instanceof j)) throw i
                return -i.Ka
              }
            },
            p: function (t, e, i) {
              try {
                return (
                  (e = x(e)),
                  (e = $t(t, e)),
                  i === 0
                    ? $e(e)
                    : i === 512
                    ? Je(e)
                    : It('Invalid flags passed to unlinkat'),
                  0
                )
              } catch (c) {
                if (typeof Tt > 'u' || !(c instanceof j)) throw c
                return -c.Ka
              }
            },
            o: function (t, e, i) {
              try {
                if (((e = x(e)), (e = $t(t, e, !0)), i)) {
                  var c = xe(i),
                    b = $[(i + 8) >> 2]
                  ;(z = 1e3 * c + b / 1e6),
                    (i += 16),
                    (c = xe(i)),
                    (b = $[(i + 8) >> 2]),
                    (q = 1e3 * c + b / 1e6)
                } else
                  var z = Date.now(),
                    q = z
                t = z
                var ht = Ft(e, { Sa: !0 }).node
                return ht.Ga.Oa(ht, { timestamp: Math.max(t, q) }), 0
              } catch (bt) {
                if (typeof Tt > 'u' || !(bt instanceof j)) throw bt
                return -bt.Ka
              }
            },
            e: function () {
              return Date.now()
            },
            j: function (t, e) {
              ;(t = new Date(1e3 * xe(t))),
                ($[e >> 2] = t.getSeconds()),
                ($[(e + 4) >> 2] = t.getMinutes()),
                ($[(e + 8) >> 2] = t.getHours()),
                ($[(e + 12) >> 2] = t.getDate()),
                ($[(e + 16) >> 2] = t.getMonth()),
                ($[(e + 20) >> 2] = t.getFullYear() - 1900),
                ($[(e + 24) >> 2] = t.getDay())
              var i = new Date(t.getFullYear(), 0, 1)
              ;($[(e + 28) >> 2] = ((t.getTime() - i.getTime()) / 864e5) | 0),
                ($[(e + 36) >> 2] = -(60 * t.getTimezoneOffset()))
              var c = new Date(t.getFullYear(), 6, 1).getTimezoneOffset()
              ;(i = i.getTimezoneOffset()),
                ($[(e + 32) >> 2] =
                  (c != i && t.getTimezoneOffset() == Math.min(i, c)) | 0)
            },
            w: function (t, e, i, c, b, z) {
              try {
                var q = Gt(c)
                if (e & 2 && !(i & 2) && (q.flags & 2097155) !== 2)
                  throw new j(2)
                if ((q.flags & 2097155) === 1) throw new j(2)
                if (!q.Ha.bb) throw new j(43)
                var ht = q.Ha.bb(q, t, b, e, i),
                  bt = ht.Fb
                return ($[z >> 2] = ht.vb), bt
              } catch (gt) {
                if (typeof Tt > 'u' || !(gt instanceof j)) throw gt
                return -gt.Ka
              }
            },
            x: function (t, e, i, c, b, z) {
              try {
                var q = Gt(b)
                if (i & 2) {
                  var ht = ut.slice(t, t + e)
                  q && q.Ha.cb && q.Ha.cb(q, ht, z, e, c)
                }
              } catch (bt) {
                if (typeof Tt > 'u' || !(bt instanceof j)) throw bt
                return -bt.Ka
              }
            },
            n: Re,
            q: function () {
              return 2147483648
            },
            d: ur,
            c: function (t) {
              var e = ut.length
              if (((t >>>= 0), 2147483648 < t)) return !1
              for (var i = 1; 4 >= i; i *= 2) {
                var c = e * (1 + 0.2 / i)
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
                    B.grow((b - ct.byteLength + 65535) >>> 16), nt()
                    var z = 1
                    break t
                  } catch {}
                  z = void 0
                }
                if (z) return !0
              }
              return !1
            },
            z: function (t, e) {
              var i = 0
              return (
                lr().forEach(function (c, b) {
                  var z = e + i
                  for (b = O[(t + 4 * b) >> 2] = z, z = 0; z < c.length; ++z)
                    H[b++ >> 0] = c.charCodeAt(z)
                  ;(H[b >> 0] = 0), (i += c.length + 1)
                }),
                0
              )
            },
            A: function (t, e) {
              var i = lr()
              O[t >> 2] = i.length
              var c = 0
              return (
                i.forEach(function (b) {
                  c += b.length + 1
                }),
                (O[e >> 2] = c),
                0
              )
            },
            f: function (t) {
              try {
                var e = Gt(t)
                return De(e), 0
              } catch (i) {
                if (typeof Tt > 'u' || !(i instanceof j)) throw i
                return i.Ka
              }
            },
            m: function (t, e) {
              try {
                var i = Gt(t)
                return (
                  (H[e >> 0] = i.tty
                    ? 2
                    : (i.mode & 61440) === 16384
                    ? 3
                    : (i.mode & 61440) === 40960
                    ? 7
                    : 4),
                  0
                )
              } catch (c) {
                if (typeof Tt > 'u' || !(c instanceof j)) throw c
                return c.Ka
              }
            },
            u: function (t, e, i, c) {
              try {
                t: {
                  var b = Gt(t)
                  t = e
                  for (var z = (e = 0); z < i; z++) {
                    var q = O[t >> 2],
                      ht = O[(t + 4) >> 2]
                    t += 8
                    var bt = rr(b, H, q, ht)
                    if (0 > bt) {
                      var gt = -1
                      break t
                    }
                    if (((e += bt), bt < ht)) break
                  }
                  gt = e
                }
                return (O[c >> 2] = gt), 0
              } catch (At) {
                if (typeof Tt > 'u' || !(At instanceof j)) throw At
                return At.Ka
              }
            },
            k: function (t, e, i, c, b) {
              try {
                if (
                  ((e =
                    (i + 2097152) >>> 0 < 4194305 - !!e
                      ? (e >>> 0) + 4294967296 * i
                      : NaN),
                  isNaN(e))
                )
                  return 61
                var z = Gt(t)
                return (
                  er(z, e, c),
                  (T = [
                    z.position >>> 0,
                    ((u = z.position),
                    1 <= +Math.abs(u)
                      ? 0 < u
                        ? (Math.min(+Math.floor(u / 4294967296), 4294967295) |
                            0) >>>
                          0
                        : ~~+Math.ceil((u - +(~~u >>> 0)) / 4294967296) >>> 0
                      : 0)
                  ]),
                  ($[b >> 2] = T[0]),
                  ($[(b + 4) >> 2] = T[1]),
                  z.hb && e === 0 && c === 0 && (z.hb = null),
                  0
                )
              } catch (q) {
                if (typeof Tt > 'u' || !(q instanceof j)) throw q
                return q.Ka
              }
            },
            C: function (t) {
              try {
                var e = Gt(t)
                return e.Ha && e.Ha.fsync ? e.Ha.fsync(e) : 0
              } catch (i) {
                if (typeof Tt > 'u' || !(i instanceof j)) throw i
                return i.Ka
              }
            },
            r: function (t, e, i, c) {
              try {
                t: {
                  var b = Gt(t)
                  t = e
                  for (var z = (e = 0); z < i; z++) {
                    var q = O[t >> 2],
                      ht = O[(t + 4) >> 2]
                    t += 8
                    var bt = nr(b, H, q, ht)
                    if (0 > bt) {
                      var gt = -1
                      break t
                    }
                    e += bt
                  }
                  gt = e
                }
                return (O[c >> 2] = gt), 0
              } catch (At) {
                if (typeof Tt > 'u' || !(At instanceof j)) throw At
                return At.Ka
              }
            }
          }
          ;(function () {
            function t(b) {
              ;(n.asm = b.exports),
                (B = n.asm.I),
                nt(),
                (tt = n.asm.Aa),
                kt.unshift(n.asm.J),
                Lt--,
                n.monitorRunDependencies && n.monitorRunDependencies(Lt),
                Lt == 0 && vt && ((b = vt), (vt = null), b())
            }
            function e(b) {
              t(b.instance)
            }
            function i(b) {
              return m()
                .then(function (z) {
                  return WebAssembly.instantiate(z, c)
                })
                .then(function (z) {
                  return z
                })
                .then(b, function (z) {
                  G('failed to asynchronously prepare wasm: ' + z), It(z)
                })
            }
            var c = { a: Ir }
            if (
              (Lt++,
              n.monitorRunDependencies && n.monitorRunDependencies(Lt),
              n.instantiateWasm)
            )
              try {
                return n.instantiateWasm(c, t)
              } catch (b) {
                return (
                  G('Module.instantiateWasm callback failed with error: ' + b),
                  !1
                )
              }
            return (
              (function () {
                return K ||
                  typeof WebAssembly.instantiateStreaming != 'function' ||
                  Dt() ||
                  r.startsWith('file://') ||
                  g ||
                  typeof fetch != 'function'
                  ? i(e)
                  : fetch(r, { credentials: 'same-origin' }).then(function (b) {
                      return WebAssembly.instantiateStreaming(b, c).then(
                        e,
                        function (z) {
                          return (
                            G('wasm streaming compile failed: ' + z),
                            G('falling back to ArrayBuffer instantiation'),
                            i(e)
                          )
                        }
                      )
                    })
              })(),
              {}
            )
          })(),
            (n.___wasm_call_ctors = function () {
              return (n.___wasm_call_ctors = n.asm.J).apply(null, arguments)
            }),
            (n._sqlite3_free = function () {
              return (n._sqlite3_free = n.asm.K).apply(null, arguments)
            }),
            (n._sqlite3_value_double = function () {
              return (n._sqlite3_value_double = n.asm.L).apply(null, arguments)
            }),
            (n._sqlite3_value_text = function () {
              return (n._sqlite3_value_text = n.asm.M).apply(null, arguments)
            })
          var fr = (n.___errno_location = function () {
            return (fr = n.___errno_location = n.asm.N).apply(null, arguments)
          })
          ;(n._sqlite3_prepare_v2 = function () {
            return (n._sqlite3_prepare_v2 = n.asm.O).apply(null, arguments)
          }),
            (n._sqlite3_step = function () {
              return (n._sqlite3_step = n.asm.P).apply(null, arguments)
            }),
            (n._sqlite3_finalize = function () {
              return (n._sqlite3_finalize = n.asm.Q).apply(null, arguments)
            }),
            (n._sqlite3_reset = function () {
              return (n._sqlite3_reset = n.asm.R).apply(null, arguments)
            }),
            (n._sqlite3_value_int = function () {
              return (n._sqlite3_value_int = n.asm.S).apply(null, arguments)
            }),
            (n._sqlite3_clear_bindings = function () {
              return (n._sqlite3_clear_bindings = n.asm.T).apply(
                null,
                arguments
              )
            }),
            (n._sqlite3_value_blob = function () {
              return (n._sqlite3_value_blob = n.asm.U).apply(null, arguments)
            }),
            (n._sqlite3_value_bytes = function () {
              return (n._sqlite3_value_bytes = n.asm.V).apply(null, arguments)
            }),
            (n._sqlite3_value_type = function () {
              return (n._sqlite3_value_type = n.asm.W).apply(null, arguments)
            }),
            (n._sqlite3_result_blob = function () {
              return (n._sqlite3_result_blob = n.asm.X).apply(null, arguments)
            }),
            (n._sqlite3_result_double = function () {
              return (n._sqlite3_result_double = n.asm.Y).apply(null, arguments)
            }),
            (n._sqlite3_result_error = function () {
              return (n._sqlite3_result_error = n.asm.Z).apply(null, arguments)
            }),
            (n._sqlite3_result_int = function () {
              return (n._sqlite3_result_int = n.asm._).apply(null, arguments)
            }),
            (n._sqlite3_result_int64 = function () {
              return (n._sqlite3_result_int64 = n.asm.$).apply(null, arguments)
            }),
            (n._sqlite3_result_null = function () {
              return (n._sqlite3_result_null = n.asm.aa).apply(null, arguments)
            }),
            (n._sqlite3_result_text = function () {
              return (n._sqlite3_result_text = n.asm.ba).apply(null, arguments)
            }),
            (n._sqlite3_sql = function () {
              return (n._sqlite3_sql = n.asm.ca).apply(null, arguments)
            }),
            (n._sqlite3_aggregate_context = function () {
              return (n._sqlite3_aggregate_context = n.asm.da).apply(
                null,
                arguments
              )
            }),
            (n._sqlite3_column_count = function () {
              return (n._sqlite3_column_count = n.asm.ea).apply(null, arguments)
            }),
            (n._sqlite3_data_count = function () {
              return (n._sqlite3_data_count = n.asm.fa).apply(null, arguments)
            }),
            (n._sqlite3_column_blob = function () {
              return (n._sqlite3_column_blob = n.asm.ga).apply(null, arguments)
            }),
            (n._sqlite3_column_bytes = function () {
              return (n._sqlite3_column_bytes = n.asm.ha).apply(null, arguments)
            }),
            (n._sqlite3_column_double = function () {
              return (n._sqlite3_column_double = n.asm.ia).apply(
                null,
                arguments
              )
            }),
            (n._sqlite3_column_text = function () {
              return (n._sqlite3_column_text = n.asm.ja).apply(null, arguments)
            }),
            (n._sqlite3_column_type = function () {
              return (n._sqlite3_column_type = n.asm.ka).apply(null, arguments)
            }),
            (n._sqlite3_column_name = function () {
              return (n._sqlite3_column_name = n.asm.la).apply(null, arguments)
            }),
            (n._sqlite3_bind_blob = function () {
              return (n._sqlite3_bind_blob = n.asm.ma).apply(null, arguments)
            }),
            (n._sqlite3_bind_double = function () {
              return (n._sqlite3_bind_double = n.asm.na).apply(null, arguments)
            }),
            (n._sqlite3_bind_int = function () {
              return (n._sqlite3_bind_int = n.asm.oa).apply(null, arguments)
            }),
            (n._sqlite3_bind_text = function () {
              return (n._sqlite3_bind_text = n.asm.pa).apply(null, arguments)
            }),
            (n._sqlite3_bind_parameter_index = function () {
              return (n._sqlite3_bind_parameter_index = n.asm.qa).apply(
                null,
                arguments
              )
            }),
            (n._sqlite3_normalized_sql = function () {
              return (n._sqlite3_normalized_sql = n.asm.ra).apply(
                null,
                arguments
              )
            }),
            (n._sqlite3_errmsg = function () {
              return (n._sqlite3_errmsg = n.asm.sa).apply(null, arguments)
            }),
            (n._sqlite3_exec = function () {
              return (n._sqlite3_exec = n.asm.ta).apply(null, arguments)
            }),
            (n._sqlite3_changes = function () {
              return (n._sqlite3_changes = n.asm.ua).apply(null, arguments)
            }),
            (n._sqlite3_close_v2 = function () {
              return (n._sqlite3_close_v2 = n.asm.va).apply(null, arguments)
            }),
            (n._sqlite3_create_function_v2 = function () {
              return (n._sqlite3_create_function_v2 = n.asm.wa).apply(
                null,
                arguments
              )
            }),
            (n._sqlite3_open = function () {
              return (n._sqlite3_open = n.asm.xa).apply(null, arguments)
            })
          var Ee = (n._malloc = function () {
              return (Ee = n._malloc = n.asm.ya).apply(null, arguments)
            }),
            be = (n._free = function () {
              return (be = n._free = n.asm.za).apply(null, arguments)
            })
          n._RegisterExtensionFunctions = function () {
            return (n._RegisterExtensionFunctions = n.asm.Ba).apply(
              null,
              arguments
            )
          }
          var dr = (n._emscripten_builtin_memalign = function () {
              return (dr = n._emscripten_builtin_memalign = n.asm.Ca).apply(
                null,
                arguments
              )
            }),
            le = (n.stackSave = function () {
              return (le = n.stackSave = n.asm.Da).apply(null, arguments)
            }),
            ce = (n.stackRestore = function () {
              return (ce = n.stackRestore = n.asm.Ea).apply(null, arguments)
            }),
            Yt = (n.stackAlloc = function () {
              return (Yt = n.stackAlloc = n.asm.Fa).apply(null, arguments)
            })
          ;(n.UTF8ToString = x),
            (n.stackAlloc = Yt),
            (n.stackSave = le),
            (n.stackRestore = ce),
            (n.cwrap = function (t, e, i, c) {
              i = i || []
              var b = i.every((z) => z === 'number' || z === 'boolean')
              return e !== 'string' && b && !c
                ? n['_' + t]
                : function () {
                    return kr(t, e, i, arguments)
                  }
            })
          var ye
          vt = function t() {
            ye || hr(), ye || (vt = t)
          }
          function hr() {
            function t() {
              if (!ye && ((ye = !0), (n.calledRun = !0), !Q)) {
                if (
                  (n.noFSInit ||
                    ar ||
                    ((ar = !0),
                    ir(),
                    (n.stdin = n.stdin),
                    (n.stdout = n.stdout),
                    (n.stderr = n.stderr),
                    n.stdin
                      ? se('stdin', n.stdin)
                      : Oe('/dev/tty', '/dev/stdin'),
                    n.stdout
                      ? se('stdout', null, n.stdout)
                      : Oe('/dev/tty', '/dev/stdout'),
                    n.stderr
                      ? se('stderr', null, n.stderr)
                      : Oe('/dev/tty1', '/dev/stderr'),
                    ee('/dev/stdin', 0),
                    ee('/dev/stdout', 1),
                    ee('/dev/stderr', 1)),
                  (ne = !1),
                  Z(kt),
                  n.onRuntimeInitialized && n.onRuntimeInitialized(),
                  n.postRun)
                )
                  for (
                    typeof n.postRun == 'function' && (n.postRun = [n.postRun]);
                    n.postRun.length;

                  ) {
                    var e = n.postRun.shift()
                    Nt.unshift(e)
                  }
                Z(Nt)
              }
            }
            if (!(0 < Lt)) {
              if (n.preRun)
                for (
                  typeof n.preRun == 'function' && (n.preRun = [n.preRun]);
                  n.preRun.length;

                )
                  Et()
              Z(Ut),
                0 < Lt ||
                  (n.setStatus
                    ? (n.setStatus('Running...'),
                      setTimeout(function () {
                        setTimeout(function () {
                          n.setStatus('')
                        }, 1),
                          t()
                      }, 1))
                    : t())
            }
          }
          if (n.preInit)
            for (
              typeof n.preInit == 'function' && (n.preInit = [n.preInit]);
              0 < n.preInit.length;

            )
              n.preInit.pop()()
          return hr(), o
        })),
        N)
      )
    }
  ;(lt.exports = C), (lt.exports.default = C)
})(on)
const cn = Ue,
  fn = wr({ __proto__: null, default: cn }, [Ue]),
  dn = `DROP TABLE IF EXISTS comment;
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
function Te(lt) {
  throw new Error(
    'Could not dynamically require "' +
      lt +
      '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.'
  )
}
var Se = {},
  hn = {
    get exports() {
      return Se
    },
    set exports(lt) {
      Se = lt
    }
  }
/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/ ;(function (lt, _t) {
  ;(function (N) {
    lt.exports = N()
  })(function () {
    return (function N(C, v, d) {
      function h(n, U) {
        if (!v[n]) {
          if (!C[n]) {
            var y = typeof Te == 'function' && Te
            if (!U && y) return y(n, !0)
            if (o) return o(n, !0)
            var L = new Error("Cannot find module '" + n + "'")
            throw ((L.code = 'MODULE_NOT_FOUND'), L)
          }
          var l = (v[n] = { exports: {} })
          C[n][0].call(
            l.exports,
            function (g) {
              var s = C[n][1][g]
              return h(s || g)
            },
            l,
            l.exports,
            N,
            C,
            v,
            d
          )
        }
        return v[n].exports
      }
      for (var o = typeof Te == 'function' && Te, _ = 0; _ < d.length; _++)
        h(d[_])
      return h
    })(
      {
        1: [
          function (N, C, v) {
            var d = N('./utils'),
              h = N('./support'),
              o =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
            ;(v.encode = function (_) {
              for (
                var n,
                  U,
                  y,
                  L,
                  l,
                  g,
                  s,
                  p = [],
                  f = 0,
                  E = _.length,
                  S = E,
                  I = d.getTypeOf(_) !== 'string';
                f < _.length;

              )
                (S = E - f),
                  (y = I
                    ? ((n = _[f++]),
                      (U = f < E ? _[f++] : 0),
                      f < E ? _[f++] : 0)
                    : ((n = _.charCodeAt(f++)),
                      (U = f < E ? _.charCodeAt(f++) : 0),
                      f < E ? _.charCodeAt(f++) : 0)),
                  (L = n >> 2),
                  (l = ((3 & n) << 4) | (U >> 4)),
                  (g = 1 < S ? ((15 & U) << 2) | (y >> 6) : 64),
                  (s = 2 < S ? 63 & y : 64),
                  p.push(o.charAt(L) + o.charAt(l) + o.charAt(g) + o.charAt(s))
              return p.join('')
            }),
              (v.decode = function (_) {
                var n,
                  U,
                  y,
                  L,
                  l,
                  g,
                  s = 0,
                  p = 0,
                  f = 'data:'
                if (_.substr(0, f.length) === f)
                  throw new Error(
                    'Invalid base64 input, it looks like a data url.'
                  )
                var E,
                  S = (3 * (_ = _.replace(/[^A-Za-z0-9+/=]/g, '')).length) / 4
                if (
                  (_.charAt(_.length - 1) === o.charAt(64) && S--,
                  _.charAt(_.length - 2) === o.charAt(64) && S--,
                  S % 1 != 0)
                )
                  throw new Error('Invalid base64 input, bad content length.')
                for (
                  E = h.uint8array ? new Uint8Array(0 | S) : new Array(0 | S);
                  s < _.length;

                )
                  (n =
                    (o.indexOf(_.charAt(s++)) << 2) |
                    ((L = o.indexOf(_.charAt(s++))) >> 4)),
                    (U =
                      ((15 & L) << 4) | ((l = o.indexOf(_.charAt(s++))) >> 2)),
                    (y = ((3 & l) << 6) | (g = o.indexOf(_.charAt(s++)))),
                    (E[p++] = n),
                    l !== 64 && (E[p++] = U),
                    g !== 64 && (E[p++] = y)
                return E
              })
          },
          { './support': 30, './utils': 32 }
        ],
        2: [
          function (N, C, v) {
            var d = N('./external'),
              h = N('./stream/DataWorker'),
              o = N('./stream/Crc32Probe'),
              _ = N('./stream/DataLengthProbe')
            function n(U, y, L, l, g) {
              ;(this.compressedSize = U),
                (this.uncompressedSize = y),
                (this.crc32 = L),
                (this.compression = l),
                (this.compressedContent = g)
            }
            ;(n.prototype = {
              getContentWorker: function () {
                var U = new h(d.Promise.resolve(this.compressedContent))
                    .pipe(this.compression.uncompressWorker())
                    .pipe(new _('data_length')),
                  y = this
                return (
                  U.on('end', function () {
                    if (this.streamInfo.data_length !== y.uncompressedSize)
                      throw new Error('Bug : uncompressed data size mismatch')
                  }),
                  U
                )
              },
              getCompressedWorker: function () {
                return new h(d.Promise.resolve(this.compressedContent))
                  .withStreamInfo('compressedSize', this.compressedSize)
                  .withStreamInfo('uncompressedSize', this.uncompressedSize)
                  .withStreamInfo('crc32', this.crc32)
                  .withStreamInfo('compression', this.compression)
              }
            }),
              (n.createWorkerFrom = function (U, y, L) {
                return U.pipe(new o())
                  .pipe(new _('uncompressedSize'))
                  .pipe(y.compressWorker(L))
                  .pipe(new _('compressedSize'))
                  .withStreamInfo('compression', y)
              }),
              (C.exports = n)
          },
          {
            './external': 6,
            './stream/Crc32Probe': 25,
            './stream/DataLengthProbe': 26,
            './stream/DataWorker': 27
          }
        ],
        3: [
          function (N, C, v) {
            var d = N('./stream/GenericWorker')
            ;(v.STORE = {
              magic: '\0\0',
              compressWorker: function () {
                return new d('STORE compression')
              },
              uncompressWorker: function () {
                return new d('STORE decompression')
              }
            }),
              (v.DEFLATE = N('./flate'))
          },
          { './flate': 7, './stream/GenericWorker': 28 }
        ],
        4: [
          function (N, C, v) {
            var d = N('./utils'),
              h = (function () {
                for (var o, _ = [], n = 0; n < 256; n++) {
                  o = n
                  for (var U = 0; U < 8; U++)
                    o = 1 & o ? 3988292384 ^ (o >>> 1) : o >>> 1
                  _[n] = o
                }
                return _
              })()
            C.exports = function (o, _) {
              return o !== void 0 && o.length
                ? d.getTypeOf(o) !== 'string'
                  ? (function (n, U, y, L) {
                      var l = h,
                        g = L + y
                      n ^= -1
                      for (var s = L; s < g; s++)
                        n = (n >>> 8) ^ l[255 & (n ^ U[s])]
                      return -1 ^ n
                    })(0 | _, o, o.length, 0)
                  : (function (n, U, y, L) {
                      var l = h,
                        g = L + y
                      n ^= -1
                      for (var s = L; s < g; s++)
                        n = (n >>> 8) ^ l[255 & (n ^ U.charCodeAt(s))]
                      return -1 ^ n
                    })(0 | _, o, o.length, 0)
                : 0
            }
          },
          { './utils': 32 }
        ],
        5: [
          function (N, C, v) {
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
          function (N, C, v) {
            var d = null
            ;(d = typeof Promise < 'u' ? Promise : N('lie')),
              (C.exports = { Promise: d })
          },
          { lie: 37 }
        ],
        7: [
          function (N, C, v) {
            var d =
                typeof Uint8Array < 'u' &&
                typeof Uint16Array < 'u' &&
                typeof Uint32Array < 'u',
              h = N('pako'),
              o = N('./utils'),
              _ = N('./stream/GenericWorker'),
              n = d ? 'uint8array' : 'array'
            function U(y, L) {
              _.call(this, 'FlateWorker/' + y),
                (this._pako = null),
                (this._pakoAction = y),
                (this._pakoOptions = L),
                (this.meta = {})
            }
            ;(v.magic = '\b\0'),
              o.inherits(U, _),
              (U.prototype.processChunk = function (y) {
                ;(this.meta = y.meta),
                  this._pako === null && this._createPako(),
                  this._pako.push(o.transformTo(n, y.data), !1)
              }),
              (U.prototype.flush = function () {
                _.prototype.flush.call(this),
                  this._pako === null && this._createPako(),
                  this._pako.push([], !0)
              }),
              (U.prototype.cleanUp = function () {
                _.prototype.cleanUp.call(this), (this._pako = null)
              }),
              (U.prototype._createPako = function () {
                this._pako = new h[this._pakoAction]({
                  raw: !0,
                  level: this._pakoOptions.level || -1
                })
                var y = this
                this._pako.onData = function (L) {
                  y.push({ data: L, meta: y.meta })
                }
              }),
              (v.compressWorker = function (y) {
                return new U('Deflate', y)
              }),
              (v.uncompressWorker = function () {
                return new U('Inflate', {})
              })
          },
          { './stream/GenericWorker': 28, './utils': 32, pako: 38 }
        ],
        8: [
          function (N, C, v) {
            function d(l, g) {
              var s,
                p = ''
              for (s = 0; s < g; s++)
                (p += String.fromCharCode(255 & l)), (l >>>= 8)
              return p
            }
            function h(l, g, s, p, f, E) {
              var S,
                I,
                A = l.file,
                X = l.compression,
                G = E !== n.utf8encode,
                K = o.transformTo('string', E(A.name)),
                B = o.transformTo('string', n.utf8encode(A.name)),
                Q = A.comment,
                ot = o.transformTo('string', E(Q)),
                w = o.transformTo('string', n.utf8encode(Q)),
                x = B.length !== A.name.length,
                a = w.length !== Q.length,
                P = '',
                ct = '',
                H = '',
                ut = A.dir,
                J = A.date,
                $ = { crc32: 0, compressedSize: 0, uncompressedSize: 0 }
              ;(g && !s) ||
                (($.crc32 = l.crc32),
                ($.compressedSize = l.compressedSize),
                ($.uncompressedSize = l.uncompressedSize))
              var O = 0
              g && (O |= 8), G || (!x && !a) || (O |= 2048)
              var F = 0,
                st = 0
              ut && (F |= 16),
                f === 'UNIX'
                  ? ((st = 798),
                    (F |= (function (tt, Ut) {
                      var kt = tt
                      return tt || (kt = Ut ? 16893 : 33204), (65535 & kt) << 16
                    })(A.unixPermissions, ut)))
                  : ((st = 20),
                    (F |= (function (tt) {
                      return 63 & (tt || 0)
                    })(A.dosPermissions))),
                (S = J.getUTCHours()),
                (S <<= 6),
                (S |= J.getUTCMinutes()),
                (S <<= 5),
                (S |= J.getUTCSeconds() / 2),
                (I = J.getUTCFullYear() - 1980),
                (I <<= 4),
                (I |= J.getUTCMonth() + 1),
                (I <<= 5),
                (I |= J.getUTCDate()),
                x &&
                  ((ct = d(1, 1) + d(U(K), 4) + B),
                  (P += 'up' + d(ct.length, 2) + ct)),
                a &&
                  ((H = d(1, 1) + d(U(ot), 4) + w),
                  (P += 'uc' + d(H.length, 2) + H))
              var nt = ''
              return (
                (nt += `
\0`),
                (nt += d(O, 2)),
                (nt += X.magic),
                (nt += d(S, 2)),
                (nt += d(I, 2)),
                (nt += d($.crc32, 4)),
                (nt += d($.compressedSize, 4)),
                (nt += d($.uncompressedSize, 4)),
                (nt += d(K.length, 2)),
                (nt += d(P.length, 2)),
                {
                  fileRecord: y.LOCAL_FILE_HEADER + nt + K + P,
                  dirRecord:
                    y.CENTRAL_FILE_HEADER +
                    d(st, 2) +
                    nt +
                    d(ot.length, 2) +
                    '\0\0\0\0' +
                    d(F, 4) +
                    d(p, 4) +
                    K +
                    P +
                    ot
                }
              )
            }
            var o = N('../utils'),
              _ = N('../stream/GenericWorker'),
              n = N('../utf8'),
              U = N('../crc32'),
              y = N('../signature')
            function L(l, g, s, p) {
              _.call(this, 'ZipFileWorker'),
                (this.bytesWritten = 0),
                (this.zipComment = g),
                (this.zipPlatform = s),
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
            o.inherits(L, _),
              (L.prototype.push = function (l) {
                var g = l.meta.percent || 0,
                  s = this.entriesCount,
                  p = this._sources.length
                this.accumulate
                  ? this.contentBuffer.push(l)
                  : ((this.bytesWritten += l.data.length),
                    _.prototype.push.call(this, {
                      data: l.data,
                      meta: {
                        currentFile: this.currentFile,
                        percent: s ? (g + 100 * (s - p - 1)) / s : 100
                      }
                    }))
              }),
              (L.prototype.openedSource = function (l) {
                ;(this.currentSourceOffset = this.bytesWritten),
                  (this.currentFile = l.file.name)
                var g = this.streamFiles && !l.file.dir
                if (g) {
                  var s = h(
                    l,
                    g,
                    !1,
                    this.currentSourceOffset,
                    this.zipPlatform,
                    this.encodeFileName
                  )
                  this.push({ data: s.fileRecord, meta: { percent: 0 } })
                } else this.accumulate = !0
              }),
              (L.prototype.closedSource = function (l) {
                this.accumulate = !1
                var g = this.streamFiles && !l.file.dir,
                  s = h(
                    l,
                    g,
                    !0,
                    this.currentSourceOffset,
                    this.zipPlatform,
                    this.encodeFileName
                  )
                if ((this.dirRecords.push(s.dirRecord), g))
                  this.push({
                    data: (function (p) {
                      return (
                        y.DATA_DESCRIPTOR +
                        d(p.crc32, 4) +
                        d(p.compressedSize, 4) +
                        d(p.uncompressedSize, 4)
                      )
                    })(l),
                    meta: { percent: 100 }
                  })
                else
                  for (
                    this.push({ data: s.fileRecord, meta: { percent: 0 } });
                    this.contentBuffer.length;

                  )
                    this.push(this.contentBuffer.shift())
                this.currentFile = null
              }),
              (L.prototype.flush = function () {
                for (
                  var l = this.bytesWritten, g = 0;
                  g < this.dirRecords.length;
                  g++
                )
                  this.push({
                    data: this.dirRecords[g],
                    meta: { percent: 100 }
                  })
                var s = this.bytesWritten - l,
                  p = (function (f, E, S, I, A) {
                    var X = o.transformTo('string', A(I))
                    return (
                      y.CENTRAL_DIRECTORY_END +
                      '\0\0\0\0' +
                      d(f, 2) +
                      d(f, 2) +
                      d(E, 4) +
                      d(S, 4) +
                      d(X.length, 2) +
                      X
                    )
                  })(
                    this.dirRecords.length,
                    s,
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
                var g = this
                return (
                  l.on('data', function (s) {
                    g.processChunk(s)
                  }),
                  l.on('end', function () {
                    g.closedSource(g.previous.streamInfo),
                      g._sources.length ? g.prepareNextSource() : g.end()
                  }),
                  l.on('error', function (s) {
                    g.error(s)
                  }),
                  this
                )
              }),
              (L.prototype.resume = function () {
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
              (L.prototype.error = function (l) {
                var g = this._sources
                if (!_.prototype.error.call(this, l)) return !1
                for (var s = 0; s < g.length; s++)
                  try {
                    g[s].error(l)
                  } catch {}
                return !0
              }),
              (L.prototype.lock = function () {
                _.prototype.lock.call(this)
                for (var l = this._sources, g = 0; g < l.length; g++)
                  l[g].lock()
              }),
              (C.exports = L)
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
          function (N, C, v) {
            var d = N('../compressions'),
              h = N('./ZipFileWorker')
            v.generateWorker = function (o, _, n) {
              var U = new h(_.streamFiles, n, _.platform, _.encodeFileName),
                y = 0
              try {
                o.forEach(function (L, l) {
                  y++
                  var g = (function (E, S) {
                      var I = E || S,
                        A = d[I]
                      if (!A)
                        throw new Error(
                          I + ' is not a valid compression method !'
                        )
                      return A
                    })(l.options.compression, _.compression),
                    s =
                      l.options.compressionOptions ||
                      _.compressionOptions ||
                      {},
                    p = l.dir,
                    f = l.date
                  l._compressWorker(g, s)
                    .withStreamInfo('file', {
                      name: L,
                      dir: p,
                      date: f,
                      comment: l.comment || '',
                      unixPermissions: l.unixPermissions,
                      dosPermissions: l.dosPermissions
                    })
                    .pipe(U)
                }),
                  (U.entriesCount = y)
              } catch (L) {
                U.error(L)
              }
              return U
            }
          },
          { '../compressions': 3, './ZipFileWorker': 8 }
        ],
        10: [
          function (N, C, v) {
            function d() {
              if (!(this instanceof d)) return new d()
              if (arguments.length)
                throw new Error(
                  'The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.'
                )
              ;(this.files = Object.create(null)),
                (this.comment = null),
                (this.root = ''),
                (this.clone = function () {
                  var h = new d()
                  for (var o in this)
                    typeof this[o] != 'function' && (h[o] = this[o])
                  return h
                })
            }
            ;((d.prototype = N('./object')).loadAsync = N('./load')),
              (d.support = N('./support')),
              (d.defaults = N('./defaults')),
              (d.version = '3.10.1'),
              (d.loadAsync = function (h, o) {
                return new d().loadAsync(h, o)
              }),
              (d.external = N('./external')),
              (C.exports = d)
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
          function (N, C, v) {
            var d = N('./utils'),
              h = N('./external'),
              o = N('./utf8'),
              _ = N('./zipEntries'),
              n = N('./stream/Crc32Probe'),
              U = N('./nodejsUtils')
            function y(L) {
              return new h.Promise(function (l, g) {
                var s = L.decompressed.getContentWorker().pipe(new n())
                s.on('error', function (p) {
                  g(p)
                })
                  .on('end', function () {
                    s.streamInfo.crc32 !== L.decompressed.crc32
                      ? g(new Error('Corrupted zip : CRC32 mismatch'))
                      : l()
                  })
                  .resume()
              })
            }
            C.exports = function (L, l) {
              var g = this
              return (
                (l = d.extend(l || {}, {
                  base64: !1,
                  checkCRC32: !1,
                  optimizedBinaryString: !1,
                  createFolders: !1,
                  decodeFileName: o.utf8decode
                })),
                U.isNode && U.isStream(L)
                  ? h.Promise.reject(
                      new Error(
                        "JSZip can't accept a stream when loading a zip file."
                      )
                    )
                  : d
                      .prepareContent(
                        'the loaded zip file',
                        L,
                        !0,
                        l.optimizedBinaryString,
                        l.base64
                      )
                      .then(function (s) {
                        var p = new _(l)
                        return p.load(s), p
                      })
                      .then(function (s) {
                        var p = [h.Promise.resolve(s)],
                          f = s.files
                        if (l.checkCRC32)
                          for (var E = 0; E < f.length; E++) p.push(y(f[E]))
                        return h.Promise.all(p)
                      })
                      .then(function (s) {
                        for (
                          var p = s.shift(), f = p.files, E = 0;
                          E < f.length;
                          E++
                        ) {
                          var S = f[E],
                            I = S.fileNameStr,
                            A = d.resolve(S.fileNameStr)
                          g.file(A, S.decompressed, {
                            binary: !0,
                            optimizedBinaryString: !0,
                            date: S.date,
                            dir: S.dir,
                            comment: S.fileCommentStr.length
                              ? S.fileCommentStr
                              : null,
                            unixPermissions: S.unixPermissions,
                            dosPermissions: S.dosPermissions,
                            createFolders: l.createFolders
                          }),
                            S.dir || (g.file(A).unsafeOriginalName = I)
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
          function (N, C, v) {
            var d = N('../utils'),
              h = N('../stream/GenericWorker')
            function o(_, n) {
              h.call(this, 'Nodejs stream input adapter for ' + _),
                (this._upstreamEnded = !1),
                this._bindStream(n)
            }
            d.inherits(o, h),
              (o.prototype._bindStream = function (_) {
                var n = this
                ;(this._stream = _).pause(),
                  _.on('data', function (U) {
                    n.push({ data: U, meta: { percent: 0 } })
                  })
                    .on('error', function (U) {
                      n.isPaused ? (this.generatedError = U) : n.error(U)
                    })
                    .on('end', function () {
                      n.isPaused ? (n._upstreamEnded = !0) : n.end()
                    })
              }),
              (o.prototype.pause = function () {
                return (
                  !!h.prototype.pause.call(this) && (this._stream.pause(), !0)
                )
              }),
              (o.prototype.resume = function () {
                return (
                  !!h.prototype.resume.call(this) &&
                  (this._upstreamEnded ? this.end() : this._stream.resume(), !0)
                )
              }),
              (C.exports = o)
          },
          { '../stream/GenericWorker': 28, '../utils': 32 }
        ],
        13: [
          function (N, C, v) {
            var d = N('readable-stream').Readable
            function h(o, _, n) {
              d.call(this, _), (this._helper = o)
              var U = this
              o.on('data', function (y, L) {
                U.push(y) || U._helper.pause(), n && n(L)
              })
                .on('error', function (y) {
                  U.emit('error', y)
                })
                .on('end', function () {
                  U.push(null)
                })
            }
            N('../utils').inherits(h, d),
              (h.prototype._read = function () {
                this._helper.resume()
              }),
              (C.exports = h)
          },
          { '../utils': 32, 'readable-stream': 16 }
        ],
        14: [
          function (N, C, v) {
            C.exports = {
              isNode: typeof Buffer < 'u',
              newBufferFrom: function (d, h) {
                if (Buffer.from && Buffer.from !== Uint8Array.from)
                  return Buffer.from(d, h)
                if (typeof d == 'number')
                  throw new Error('The "data" argument must not be a number')
                return new Buffer(d, h)
              },
              allocBuffer: function (d) {
                if (Buffer.alloc) return Buffer.alloc(d)
                var h = new Buffer(d)
                return h.fill(0), h
              },
              isBuffer: function (d) {
                return Buffer.isBuffer(d)
              },
              isStream: function (d) {
                return (
                  d &&
                  typeof d.on == 'function' &&
                  typeof d.pause == 'function' &&
                  typeof d.resume == 'function'
                )
              }
            }
          },
          {}
        ],
        15: [
          function (N, C, v) {
            function d(A, X, G) {
              var K,
                B = o.getTypeOf(X),
                Q = o.extend(G || {}, U)
              ;(Q.date = Q.date || new Date()),
                Q.compression !== null &&
                  (Q.compression = Q.compression.toUpperCase()),
                typeof Q.unixPermissions == 'string' &&
                  (Q.unixPermissions = parseInt(Q.unixPermissions, 8)),
                Q.unixPermissions && 16384 & Q.unixPermissions && (Q.dir = !0),
                Q.dosPermissions && 16 & Q.dosPermissions && (Q.dir = !0),
                Q.dir && (A = f(A)),
                Q.createFolders && (K = p(A)) && E.call(this, K, !0)
              var ot = B === 'string' && Q.binary === !1 && Q.base64 === !1
              ;(G && G.binary !== void 0) || (Q.binary = !ot),
                ((X instanceof y && X.uncompressedSize === 0) ||
                  Q.dir ||
                  !X ||
                  X.length === 0) &&
                  ((Q.base64 = !1),
                  (Q.binary = !0),
                  (X = ''),
                  (Q.compression = 'STORE'),
                  (B = 'string'))
              var w = null
              w =
                X instanceof y || X instanceof _
                  ? X
                  : g.isNode && g.isStream(X)
                  ? new s(A, X)
                  : o.prepareContent(
                      A,
                      X,
                      Q.binary,
                      Q.optimizedBinaryString,
                      Q.base64
                    )
              var x = new L(A, w, Q)
              this.files[A] = x
            }
            var h = N('./utf8'),
              o = N('./utils'),
              _ = N('./stream/GenericWorker'),
              n = N('./stream/StreamHelper'),
              U = N('./defaults'),
              y = N('./compressedObject'),
              L = N('./zipObject'),
              l = N('./generate'),
              g = N('./nodejsUtils'),
              s = N('./nodejs/NodejsStreamInputAdapter'),
              p = function (A) {
                A.slice(-1) === '/' && (A = A.substring(0, A.length - 1))
                var X = A.lastIndexOf('/')
                return 0 < X ? A.substring(0, X) : ''
              },
              f = function (A) {
                return A.slice(-1) !== '/' && (A += '/'), A
              },
              E = function (A, X) {
                return (
                  (X = X !== void 0 ? X : U.createFolders),
                  (A = f(A)),
                  this.files[A] ||
                    d.call(this, A, null, { dir: !0, createFolders: X }),
                  this.files[A]
                )
              }
            function S(A) {
              return Object.prototype.toString.call(A) === '[object RegExp]'
            }
            var I = {
              load: function () {
                throw new Error(
                  'This method has been removed in JSZip 3.0, please check the upgrade guide.'
                )
              },
              forEach: function (A) {
                var X, G, K
                for (X in this.files)
                  (K = this.files[X]),
                    (G = X.slice(this.root.length, X.length)) &&
                      X.slice(0, this.root.length) === this.root &&
                      A(G, K)
              },
              filter: function (A) {
                var X = []
                return (
                  this.forEach(function (G, K) {
                    A(G, K) && X.push(K)
                  }),
                  X
                )
              },
              file: function (A, X, G) {
                if (arguments.length !== 1)
                  return (A = this.root + A), d.call(this, A, X, G), this
                if (S(A)) {
                  var K = A
                  return this.filter(function (Q, ot) {
                    return !ot.dir && K.test(Q)
                  })
                }
                var B = this.files[this.root + A]
                return B && !B.dir ? B : null
              },
              folder: function (A) {
                if (!A) return this
                if (S(A))
                  return this.filter(function (B, Q) {
                    return Q.dir && A.test(B)
                  })
                var X = this.root + A,
                  G = E.call(this, X),
                  K = this.clone()
                return (K.root = G.name), K
              },
              remove: function (A) {
                A = this.root + A
                var X = this.files[A]
                if (
                  (X ||
                    (A.slice(-1) !== '/' && (A += '/'), (X = this.files[A])),
                  X && !X.dir)
                )
                  delete this.files[A]
                else
                  for (
                    var G = this.filter(function (B, Q) {
                        return Q.name.slice(0, A.length) === A
                      }),
                      K = 0;
                    K < G.length;
                    K++
                  )
                    delete this.files[G[K].name]
                return this
              },
              generate: function () {
                throw new Error(
                  'This method has been removed in JSZip 3.0, please check the upgrade guide.'
                )
              },
              generateInternalStream: function (A) {
                var X,
                  G = {}
                try {
                  if (
                    (((G = o.extend(A || {}, {
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
                  o.checkSupport(G.type),
                    (G.platform !== 'darwin' &&
                      G.platform !== 'freebsd' &&
                      G.platform !== 'linux' &&
                      G.platform !== 'sunos') ||
                      (G.platform = 'UNIX'),
                    G.platform === 'win32' && (G.platform = 'DOS')
                  var K = G.comment || this.comment || ''
                  X = l.generateWorker(this, G, K)
                } catch (B) {
                  ;(X = new _('error')).error(B)
                }
                return new n(X, G.type || 'string', G.mimeType)
              },
              generateAsync: function (A, X) {
                return this.generateInternalStream(A).accumulate(X)
              },
              generateNodeStream: function (A, X) {
                return (
                  (A = A || {}).type || (A.type = 'nodebuffer'),
                  this.generateInternalStream(A).toNodejsStream(X)
                )
              }
            }
            C.exports = I
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
          function (N, C, v) {
            C.exports = N('stream')
          },
          { stream: void 0 }
        ],
        17: [
          function (N, C, v) {
            var d = N('./DataReader')
            function h(o) {
              d.call(this, o)
              for (var _ = 0; _ < this.data.length; _++) o[_] = 255 & o[_]
            }
            N('../utils').inherits(h, d),
              (h.prototype.byteAt = function (o) {
                return this.data[this.zero + o]
              }),
              (h.prototype.lastIndexOfSignature = function (o) {
                for (
                  var _ = o.charCodeAt(0),
                    n = o.charCodeAt(1),
                    U = o.charCodeAt(2),
                    y = o.charCodeAt(3),
                    L = this.length - 4;
                  0 <= L;
                  --L
                )
                  if (
                    this.data[L] === _ &&
                    this.data[L + 1] === n &&
                    this.data[L + 2] === U &&
                    this.data[L + 3] === y
                  )
                    return L - this.zero
                return -1
              }),
              (h.prototype.readAndCheckSignature = function (o) {
                var _ = o.charCodeAt(0),
                  n = o.charCodeAt(1),
                  U = o.charCodeAt(2),
                  y = o.charCodeAt(3),
                  L = this.readData(4)
                return _ === L[0] && n === L[1] && U === L[2] && y === L[3]
              }),
              (h.prototype.readData = function (o) {
                if ((this.checkOffset(o), o === 0)) return []
                var _ = this.data.slice(
                  this.zero + this.index,
                  this.zero + this.index + o
                )
                return (this.index += o), _
              }),
              (C.exports = h)
          },
          { '../utils': 32, './DataReader': 18 }
        ],
        18: [
          function (N, C, v) {
            var d = N('../utils')
            function h(o) {
              ;(this.data = o),
                (this.length = o.length),
                (this.index = 0),
                (this.zero = 0)
            }
            ;(h.prototype = {
              checkOffset: function (o) {
                this.checkIndex(this.index + o)
              },
              checkIndex: function (o) {
                if (this.length < this.zero + o || o < 0)
                  throw new Error(
                    'End of data reached (data length = ' +
                      this.length +
                      ', asked index = ' +
                      o +
                      '). Corrupted zip ?'
                  )
              },
              setIndex: function (o) {
                this.checkIndex(o), (this.index = o)
              },
              skip: function (o) {
                this.setIndex(this.index + o)
              },
              byteAt: function () {},
              readInt: function (o) {
                var _,
                  n = 0
                for (
                  this.checkOffset(o), _ = this.index + o - 1;
                  _ >= this.index;
                  _--
                )
                  n = (n << 8) + this.byteAt(_)
                return (this.index += o), n
              },
              readString: function (o) {
                return d.transformTo('string', this.readData(o))
              },
              readData: function () {},
              lastIndexOfSignature: function () {},
              readAndCheckSignature: function () {},
              readDate: function () {
                var o = this.readInt(4)
                return new Date(
                  Date.UTC(
                    1980 + ((o >> 25) & 127),
                    ((o >> 21) & 15) - 1,
                    (o >> 16) & 31,
                    (o >> 11) & 31,
                    (o >> 5) & 63,
                    (31 & o) << 1
                  )
                )
              }
            }),
              (C.exports = h)
          },
          { '../utils': 32 }
        ],
        19: [
          function (N, C, v) {
            var d = N('./Uint8ArrayReader')
            function h(o) {
              d.call(this, o)
            }
            N('../utils').inherits(h, d),
              (h.prototype.readData = function (o) {
                this.checkOffset(o)
                var _ = this.data.slice(
                  this.zero + this.index,
                  this.zero + this.index + o
                )
                return (this.index += o), _
              }),
              (C.exports = h)
          },
          { '../utils': 32, './Uint8ArrayReader': 21 }
        ],
        20: [
          function (N, C, v) {
            var d = N('./DataReader')
            function h(o) {
              d.call(this, o)
            }
            N('../utils').inherits(h, d),
              (h.prototype.byteAt = function (o) {
                return this.data.charCodeAt(this.zero + o)
              }),
              (h.prototype.lastIndexOfSignature = function (o) {
                return this.data.lastIndexOf(o) - this.zero
              }),
              (h.prototype.readAndCheckSignature = function (o) {
                return o === this.readData(4)
              }),
              (h.prototype.readData = function (o) {
                this.checkOffset(o)
                var _ = this.data.slice(
                  this.zero + this.index,
                  this.zero + this.index + o
                )
                return (this.index += o), _
              }),
              (C.exports = h)
          },
          { '../utils': 32, './DataReader': 18 }
        ],
        21: [
          function (N, C, v) {
            var d = N('./ArrayReader')
            function h(o) {
              d.call(this, o)
            }
            N('../utils').inherits(h, d),
              (h.prototype.readData = function (o) {
                if ((this.checkOffset(o), o === 0)) return new Uint8Array(0)
                var _ = this.data.subarray(
                  this.zero + this.index,
                  this.zero + this.index + o
                )
                return (this.index += o), _
              }),
              (C.exports = h)
          },
          { '../utils': 32, './ArrayReader': 17 }
        ],
        22: [
          function (N, C, v) {
            var d = N('../utils'),
              h = N('../support'),
              o = N('./ArrayReader'),
              _ = N('./StringReader'),
              n = N('./NodeBufferReader'),
              U = N('./Uint8ArrayReader')
            C.exports = function (y) {
              var L = d.getTypeOf(y)
              return (
                d.checkSupport(L),
                L !== 'string' || h.uint8array
                  ? L === 'nodebuffer'
                    ? new n(y)
                    : h.uint8array
                    ? new U(d.transformTo('uint8array', y))
                    : new o(d.transformTo('array', y))
                  : new _(y)
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
          function (N, C, v) {
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
          function (N, C, v) {
            var d = N('./GenericWorker'),
              h = N('../utils')
            function o(_) {
              d.call(this, 'ConvertWorker to ' + _), (this.destType = _)
            }
            h.inherits(o, d),
              (o.prototype.processChunk = function (_) {
                this.push({
                  data: h.transformTo(this.destType, _.data),
                  meta: _.meta
                })
              }),
              (C.exports = o)
          },
          { '../utils': 32, './GenericWorker': 28 }
        ],
        25: [
          function (N, C, v) {
            var d = N('./GenericWorker'),
              h = N('../crc32')
            function o() {
              d.call(this, 'Crc32Probe'), this.withStreamInfo('crc32', 0)
            }
            N('../utils').inherits(o, d),
              (o.prototype.processChunk = function (_) {
                ;(this.streamInfo.crc32 = h(
                  _.data,
                  this.streamInfo.crc32 || 0
                )),
                  this.push(_)
              }),
              (C.exports = o)
          },
          { '../crc32': 4, '../utils': 32, './GenericWorker': 28 }
        ],
        26: [
          function (N, C, v) {
            var d = N('../utils'),
              h = N('./GenericWorker')
            function o(_) {
              h.call(this, 'DataLengthProbe for ' + _),
                (this.propName = _),
                this.withStreamInfo(_, 0)
            }
            d.inherits(o, h),
              (o.prototype.processChunk = function (_) {
                if (_) {
                  var n = this.streamInfo[this.propName] || 0
                  this.streamInfo[this.propName] = n + _.data.length
                }
                h.prototype.processChunk.call(this, _)
              }),
              (C.exports = o)
          },
          { '../utils': 32, './GenericWorker': 28 }
        ],
        27: [
          function (N, C, v) {
            var d = N('../utils'),
              h = N('./GenericWorker')
            function o(_) {
              h.call(this, 'DataWorker')
              var n = this
              ;(this.dataIsReady = !1),
                (this.index = 0),
                (this.max = 0),
                (this.data = null),
                (this.type = ''),
                (this._tickScheduled = !1),
                _.then(
                  function (U) {
                    ;(n.dataIsReady = !0),
                      (n.data = U),
                      (n.max = (U && U.length) || 0),
                      (n.type = d.getTypeOf(U)),
                      n.isPaused || n._tickAndRepeat()
                  },
                  function (U) {
                    n.error(U)
                  }
                )
            }
            d.inherits(o, h),
              (o.prototype.cleanUp = function () {
                h.prototype.cleanUp.call(this), (this.data = null)
              }),
              (o.prototype.resume = function () {
                return (
                  !!h.prototype.resume.call(this) &&
                  (!this._tickScheduled &&
                    this.dataIsReady &&
                    ((this._tickScheduled = !0),
                    d.delay(this._tickAndRepeat, [], this)),
                  !0)
                )
              }),
              (o.prototype._tickAndRepeat = function () {
                ;(this._tickScheduled = !1),
                  this.isPaused ||
                    this.isFinished ||
                    (this._tick(),
                    this.isFinished ||
                      (d.delay(this._tickAndRepeat, [], this),
                      (this._tickScheduled = !0)))
              }),
              (o.prototype._tick = function () {
                if (this.isPaused || this.isFinished) return !1
                var _ = null,
                  n = Math.min(this.max, this.index + 16384)
                if (this.index >= this.max) return this.end()
                switch (this.type) {
                  case 'string':
                    _ = this.data.substring(this.index, n)
                    break
                  case 'uint8array':
                    _ = this.data.subarray(this.index, n)
                    break
                  case 'array':
                  case 'nodebuffer':
                    _ = this.data.slice(this.index, n)
                }
                return (
                  (this.index = n),
                  this.push({
                    data: _,
                    meta: {
                      percent: this.max ? (this.index / this.max) * 100 : 0
                    }
                  })
                )
              }),
              (C.exports = o)
          },
          { '../utils': 32, './GenericWorker': 28 }
        ],
        28: [
          function (N, C, v) {
            function d(h) {
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
            ;(d.prototype = {
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
              on: function (h, o) {
                return this._listeners[h].push(o), this
              },
              cleanUp: function () {
                ;(this.streamInfo =
                  this.generatedError =
                  this.extraStreamInfo =
                    null),
                  (this._listeners = [])
              },
              emit: function (h, o) {
                if (this._listeners[h])
                  for (var _ = 0; _ < this._listeners[h].length; _++)
                    this._listeners[h][_].call(this, o)
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
                var o = this
                return (
                  h.on('data', function (_) {
                    o.processChunk(_)
                  }),
                  h.on('end', function () {
                    o.end()
                  }),
                  h.on('error', function (_) {
                    o.error(_)
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
              withStreamInfo: function (h, o) {
                return (
                  (this.extraStreamInfo[h] = o), this.mergeStreamInfo(), this
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
              (C.exports = d)
          },
          {}
        ],
        29: [
          function (N, C, v) {
            var d = N('../utils'),
              h = N('./ConvertWorker'),
              o = N('./GenericWorker'),
              _ = N('../base64'),
              n = N('../support'),
              U = N('../external'),
              y = null
            if (n.nodestream)
              try {
                y = N('../nodejs/NodejsStreamOutputAdapter')
              } catch {}
            function L(g, s) {
              return new U.Promise(function (p, f) {
                var E = [],
                  S = g._internalType,
                  I = g._outputType,
                  A = g._mimeType
                g.on('data', function (X, G) {
                  E.push(X), s && s(G)
                })
                  .on('error', function (X) {
                    ;(E = []), f(X)
                  })
                  .on('end', function () {
                    try {
                      var X = (function (G, K, B) {
                        switch (G) {
                          case 'blob':
                            return d.newBlob(d.transformTo('arraybuffer', K), B)
                          case 'base64':
                            return _.encode(K)
                          default:
                            return d.transformTo(G, K)
                        }
                      })(
                        I,
                        (function (G, K) {
                          var B,
                            Q = 0,
                            ot = null,
                            w = 0
                          for (B = 0; B < K.length; B++) w += K[B].length
                          switch (G) {
                            case 'string':
                              return K.join('')
                            case 'array':
                              return Array.prototype.concat.apply([], K)
                            case 'uint8array':
                              for (
                                ot = new Uint8Array(w), B = 0;
                                B < K.length;
                                B++
                              )
                                ot.set(K[B], Q), (Q += K[B].length)
                              return ot
                            case 'nodebuffer':
                              return Buffer.concat(K)
                            default:
                              throw new Error(
                                "concat : unsupported type '" + G + "'"
                              )
                          }
                        })(S, E),
                        A
                      )
                      p(X)
                    } catch (G) {
                      f(G)
                    }
                    E = []
                  })
                  .resume()
              })
            }
            function l(g, s, p) {
              var f = s
              switch (s) {
                case 'blob':
                case 'arraybuffer':
                  f = 'uint8array'
                  break
                case 'base64':
                  f = 'string'
              }
              try {
                ;(this._internalType = f),
                  (this._outputType = s),
                  (this._mimeType = p),
                  d.checkSupport(f),
                  (this._worker = g.pipe(new h(f))),
                  g.lock()
              } catch (E) {
                ;(this._worker = new o('error')), this._worker.error(E)
              }
            }
            ;(l.prototype = {
              accumulate: function (g) {
                return L(this, g)
              },
              on: function (g, s) {
                var p = this
                return (
                  g === 'data'
                    ? this._worker.on(g, function (f) {
                        s.call(p, f.data, f.meta)
                      })
                    : this._worker.on(g, function () {
                        d.delay(s, arguments, p)
                      }),
                  this
                )
              },
              resume: function () {
                return d.delay(this._worker.resume, [], this._worker), this
              },
              pause: function () {
                return this._worker.pause(), this
              },
              toNodejsStream: function (g) {
                if (
                  (d.checkSupport('nodestream'),
                  this._outputType !== 'nodebuffer')
                )
                  throw new Error(
                    this._outputType + ' is not supported by this method'
                  )
                return new y(
                  this,
                  { objectMode: this._outputType !== 'nodebuffer' },
                  g
                )
              }
            }),
              (C.exports = l)
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
          function (N, C, v) {
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
              var d = new ArrayBuffer(0)
              try {
                v.blob = new Blob([d], { type: 'application/zip' }).size === 0
              } catch {
                try {
                  var h = new (self.BlobBuilder ||
                    self.WebKitBlobBuilder ||
                    self.MozBlobBuilder ||
                    self.MSBlobBuilder)()
                  h.append(d),
                    (v.blob = h.getBlob('application/zip').size === 0)
                } catch {
                  v.blob = !1
                }
              }
            }
            try {
              v.nodestream = !!N('readable-stream').Readable
            } catch {
              v.nodestream = !1
            }
          },
          { 'readable-stream': 16 }
        ],
        31: [
          function (N, C, v) {
            for (
              var d = N('./utils'),
                h = N('./support'),
                o = N('./nodejsUtils'),
                _ = N('./stream/GenericWorker'),
                n = new Array(256),
                U = 0;
              U < 256;
              U++
            )
              n[U] =
                252 <= U
                  ? 6
                  : 248 <= U
                  ? 5
                  : 240 <= U
                  ? 4
                  : 224 <= U
                  ? 3
                  : 192 <= U
                  ? 2
                  : 1
            n[254] = n[254] = 1
            function y() {
              _.call(this, 'utf-8 decode'), (this.leftOver = null)
            }
            function L() {
              _.call(this, 'utf-8 encode')
            }
            ;(v.utf8encode = function (l) {
              return h.nodebuffer
                ? o.newBufferFrom(l, 'utf-8')
                : (function (g) {
                    var s,
                      p,
                      f,
                      E,
                      S,
                      I = g.length,
                      A = 0
                    for (E = 0; E < I; E++)
                      (64512 & (p = g.charCodeAt(E))) == 55296 &&
                        E + 1 < I &&
                        (64512 & (f = g.charCodeAt(E + 1))) == 56320 &&
                        ((p = 65536 + ((p - 55296) << 10) + (f - 56320)), E++),
                        (A += p < 128 ? 1 : p < 2048 ? 2 : p < 65536 ? 3 : 4)
                    for (
                      s = h.uint8array ? new Uint8Array(A) : new Array(A),
                        E = S = 0;
                      S < A;
                      E++
                    )
                      (64512 & (p = g.charCodeAt(E))) == 55296 &&
                        E + 1 < I &&
                        (64512 & (f = g.charCodeAt(E + 1))) == 56320 &&
                        ((p = 65536 + ((p - 55296) << 10) + (f - 56320)), E++),
                        p < 128
                          ? (s[S++] = p)
                          : (p < 2048
                              ? (s[S++] = 192 | (p >>> 6))
                              : (p < 65536
                                  ? (s[S++] = 224 | (p >>> 12))
                                  : ((s[S++] = 240 | (p >>> 18)),
                                    (s[S++] = 128 | ((p >>> 12) & 63))),
                                (s[S++] = 128 | ((p >>> 6) & 63))),
                            (s[S++] = 128 | (63 & p)))
                    return s
                  })(l)
            }),
              (v.utf8decode = function (l) {
                return h.nodebuffer
                  ? d.transformTo('nodebuffer', l).toString('utf-8')
                  : (function (g) {
                      var s,
                        p,
                        f,
                        E,
                        S = g.length,
                        I = new Array(2 * S)
                      for (s = p = 0; s < S; )
                        if ((f = g[s++]) < 128) I[p++] = f
                        else if (4 < (E = n[f])) (I[p++] = 65533), (s += E - 1)
                        else {
                          for (
                            f &= E === 2 ? 31 : E === 3 ? 15 : 7;
                            1 < E && s < S;

                          )
                            (f = (f << 6) | (63 & g[s++])), E--
                          1 < E
                            ? (I[p++] = 65533)
                            : f < 65536
                            ? (I[p++] = f)
                            : ((f -= 65536),
                              (I[p++] = 55296 | ((f >> 10) & 1023)),
                              (I[p++] = 56320 | (1023 & f)))
                        }
                      return (
                        I.length !== p &&
                          (I.subarray
                            ? (I = I.subarray(0, p))
                            : (I.length = p)),
                        d.applyFromCharCode(I)
                      )
                    })(
                      (l = d.transformTo(
                        h.uint8array ? 'uint8array' : 'array',
                        l
                      ))
                    )
              }),
              d.inherits(y, _),
              (y.prototype.processChunk = function (l) {
                var g = d.transformTo(
                  h.uint8array ? 'uint8array' : 'array',
                  l.data
                )
                if (this.leftOver && this.leftOver.length) {
                  if (h.uint8array) {
                    var s = g
                    ;(g = new Uint8Array(s.length + this.leftOver.length)).set(
                      this.leftOver,
                      0
                    ),
                      g.set(s, this.leftOver.length)
                  } else g = this.leftOver.concat(g)
                  this.leftOver = null
                }
                var p = (function (E, S) {
                    var I
                    for (
                      (S = S || E.length) > E.length && (S = E.length),
                        I = S - 1;
                      0 <= I && (192 & E[I]) == 128;

                    )
                      I--
                    return I < 0 || I === 0 ? S : I + n[E[I]] > S ? I : S
                  })(g),
                  f = g
                p !== g.length &&
                  (h.uint8array
                    ? ((f = g.subarray(0, p)),
                      (this.leftOver = g.subarray(p, g.length)))
                    : ((f = g.slice(0, p)),
                      (this.leftOver = g.slice(p, g.length)))),
                  this.push({ data: v.utf8decode(f), meta: l.meta })
              }),
              (y.prototype.flush = function () {
                this.leftOver &&
                  this.leftOver.length &&
                  (this.push({ data: v.utf8decode(this.leftOver), meta: {} }),
                  (this.leftOver = null))
              }),
              (v.Utf8DecodeWorker = y),
              d.inherits(L, _),
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
          function (N, C, v) {
            var d = N('./support'),
              h = N('./base64'),
              o = N('./nodejsUtils'),
              _ = N('./external')
            function n(s) {
              return s
            }
            function U(s, p) {
              for (var f = 0; f < s.length; ++f) p[f] = 255 & s.charCodeAt(f)
              return p
            }
            N('setimmediate'),
              (v.newBlob = function (s, p) {
                v.checkSupport('blob')
                try {
                  return new Blob([s], { type: p })
                } catch {
                  try {
                    var f = new (self.BlobBuilder ||
                      self.WebKitBlobBuilder ||
                      self.MozBlobBuilder ||
                      self.MSBlobBuilder)()
                    return f.append(s), f.getBlob(p)
                  } catch {
                    throw new Error("Bug : can't construct the Blob.")
                  }
                }
              })
            var y = {
              stringifyByChunk: function (s, p, f) {
                var E = [],
                  S = 0,
                  I = s.length
                if (I <= f) return String.fromCharCode.apply(null, s)
                for (; S < I; )
                  p === 'array' || p === 'nodebuffer'
                    ? E.push(
                        String.fromCharCode.apply(
                          null,
                          s.slice(S, Math.min(S + f, I))
                        )
                      )
                    : E.push(
                        String.fromCharCode.apply(
                          null,
                          s.subarray(S, Math.min(S + f, I))
                        )
                      ),
                    (S += f)
                return E.join('')
              },
              stringifyByChar: function (s) {
                for (var p = '', f = 0; f < s.length; f++)
                  p += String.fromCharCode(s[f])
                return p
              },
              applyCanBeUsed: {
                uint8array: (function () {
                  try {
                    return (
                      d.uint8array &&
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
                      d.nodebuffer &&
                      String.fromCharCode.apply(null, o.allocBuffer(1))
                        .length === 1
                    )
                  } catch {
                    return !1
                  }
                })()
              }
            }
            function L(s) {
              var p = 65536,
                f = v.getTypeOf(s),
                E = !0
              if (
                (f === 'uint8array'
                  ? (E = y.applyCanBeUsed.uint8array)
                  : f === 'nodebuffer' && (E = y.applyCanBeUsed.nodebuffer),
                E)
              )
                for (; 1 < p; )
                  try {
                    return y.stringifyByChunk(s, f, p)
                  } catch {
                    p = Math.floor(p / 2)
                  }
              return y.stringifyByChar(s)
            }
            function l(s, p) {
              for (var f = 0; f < s.length; f++) p[f] = s[f]
              return p
            }
            v.applyFromCharCode = L
            var g = {}
            ;(g.string = {
              string: n,
              array: function (s) {
                return U(s, new Array(s.length))
              },
              arraybuffer: function (s) {
                return g.string.uint8array(s).buffer
              },
              uint8array: function (s) {
                return U(s, new Uint8Array(s.length))
              },
              nodebuffer: function (s) {
                return U(s, o.allocBuffer(s.length))
              }
            }),
              (g.array = {
                string: L,
                array: n,
                arraybuffer: function (s) {
                  return new Uint8Array(s).buffer
                },
                uint8array: function (s) {
                  return new Uint8Array(s)
                },
                nodebuffer: function (s) {
                  return o.newBufferFrom(s)
                }
              }),
              (g.arraybuffer = {
                string: function (s) {
                  return L(new Uint8Array(s))
                },
                array: function (s) {
                  return l(new Uint8Array(s), new Array(s.byteLength))
                },
                arraybuffer: n,
                uint8array: function (s) {
                  return new Uint8Array(s)
                },
                nodebuffer: function (s) {
                  return o.newBufferFrom(new Uint8Array(s))
                }
              }),
              (g.uint8array = {
                string: L,
                array: function (s) {
                  return l(s, new Array(s.length))
                },
                arraybuffer: function (s) {
                  return s.buffer
                },
                uint8array: n,
                nodebuffer: function (s) {
                  return o.newBufferFrom(s)
                }
              }),
              (g.nodebuffer = {
                string: L,
                array: function (s) {
                  return l(s, new Array(s.length))
                },
                arraybuffer: function (s) {
                  return g.nodebuffer.uint8array(s).buffer
                },
                uint8array: function (s) {
                  return l(s, new Uint8Array(s.length))
                },
                nodebuffer: n
              }),
              (v.transformTo = function (s, p) {
                if (((p = p || ''), !s)) return p
                v.checkSupport(s)
                var f = v.getTypeOf(p)
                return g[f][s](p)
              }),
              (v.resolve = function (s) {
                for (var p = s.split('/'), f = [], E = 0; E < p.length; E++) {
                  var S = p[E]
                  S === '.' ||
                    (S === '' && E !== 0 && E !== p.length - 1) ||
                    (S === '..' ? f.pop() : f.push(S))
                }
                return f.join('/')
              }),
              (v.getTypeOf = function (s) {
                return typeof s == 'string'
                  ? 'string'
                  : Object.prototype.toString.call(s) === '[object Array]'
                  ? 'array'
                  : d.nodebuffer && o.isBuffer(s)
                  ? 'nodebuffer'
                  : d.uint8array && s instanceof Uint8Array
                  ? 'uint8array'
                  : d.arraybuffer && s instanceof ArrayBuffer
                  ? 'arraybuffer'
                  : void 0
              }),
              (v.checkSupport = function (s) {
                if (!d[s.toLowerCase()])
                  throw new Error(s + ' is not supported by this platform')
              }),
              (v.MAX_VALUE_16BITS = 65535),
              (v.MAX_VALUE_32BITS = -1),
              (v.pretty = function (s) {
                var p,
                  f,
                  E = ''
                for (f = 0; f < (s || '').length; f++)
                  E +=
                    '\\x' +
                    ((p = s.charCodeAt(f)) < 16 ? '0' : '') +
                    p.toString(16).toUpperCase()
                return E
              }),
              (v.delay = function (s, p, f) {
                setImmediate(function () {
                  s.apply(f || null, p || [])
                })
              }),
              (v.inherits = function (s, p) {
                function f() {}
                ;(f.prototype = p.prototype), (s.prototype = new f())
              }),
              (v.extend = function () {
                var s,
                  p,
                  f = {}
                for (s = 0; s < arguments.length; s++)
                  for (p in arguments[s])
                    Object.prototype.hasOwnProperty.call(arguments[s], p) &&
                      f[p] === void 0 &&
                      (f[p] = arguments[s][p])
                return f
              }),
              (v.prepareContent = function (s, p, f, E, S) {
                return _.Promise.resolve(p)
                  .then(function (I) {
                    return d.blob &&
                      (I instanceof Blob ||
                        ['[object File]', '[object Blob]'].indexOf(
                          Object.prototype.toString.call(I)
                        ) !== -1) &&
                      typeof FileReader < 'u'
                      ? new _.Promise(function (A, X) {
                          var G = new FileReader()
                          ;(G.onload = function (K) {
                            A(K.target.result)
                          }),
                            (G.onerror = function (K) {
                              X(K.target.error)
                            }),
                            G.readAsArrayBuffer(I)
                        })
                      : I
                  })
                  .then(function (I) {
                    var A = v.getTypeOf(I)
                    return A
                      ? (A === 'arraybuffer'
                          ? (I = v.transformTo('uint8array', I))
                          : A === 'string' &&
                            (S
                              ? (I = h.decode(I))
                              : f &&
                                E !== !0 &&
                                (I = (function (X) {
                                  return U(
                                    X,
                                    d.uint8array
                                      ? new Uint8Array(X.length)
                                      : new Array(X.length)
                                  )
                                })(I))),
                        I)
                      : _.Promise.reject(
                          new Error(
                            "Can't read the data of '" +
                              s +
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
          function (N, C, v) {
            var d = N('./reader/readerFor'),
              h = N('./utils'),
              o = N('./signature'),
              _ = N('./zipEntry'),
              n = N('./support')
            function U(y) {
              ;(this.files = []), (this.loadOptions = y)
            }
            ;(U.prototype = {
              checkSignature: function (y) {
                if (!this.reader.readAndCheckSignature(y)) {
                  this.reader.index -= 4
                  var L = this.reader.readString(4)
                  throw new Error(
                    'Corrupted zip or bug: unexpected signature (' +
                      h.pretty(L) +
                      ', expected ' +
                      h.pretty(y) +
                      ')'
                  )
                }
              },
              isSignature: function (y, L) {
                var l = this.reader.index
                this.reader.setIndex(y)
                var g = this.reader.readString(4) === L
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
                var y = this.reader.readData(this.zipCommentLength),
                  L = n.uint8array ? 'uint8array' : 'array',
                  l = h.transformTo(L, y)
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
                for (var y, L, l, g = this.zip64EndOfCentralSize - 44; 0 < g; )
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
                    this.checkSignature(o.LOCAL_FILE_HEADER),
                    L.readLocalPart(this.reader),
                    L.handleUTF8(),
                    L.processAttributes()
              },
              readCentralDir: function () {
                var y
                for (
                  this.reader.setIndex(this.centralDirOffset);
                  this.reader.readAndCheckSignature(o.CENTRAL_FILE_HEADER);

                )
                  (y = new _(
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
                  o.CENTRAL_DIRECTORY_END
                )
                if (y < 0)
                  throw this.isSignature(0, o.LOCAL_FILE_HEADER)
                    ? new Error(
                        "Corrupted zip: can't find end of central directory"
                      )
                    : new Error(
                        "Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"
                      )
                this.reader.setIndex(y)
                var L = y
                if (
                  (this.checkSignature(o.CENTRAL_DIRECTORY_END),
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
                    (y = this.reader.lastIndexOfSignature(
                      o.ZIP64_CENTRAL_DIRECTORY_LOCATOR
                    )) < 0)
                  )
                    throw new Error(
                      "Corrupted zip: can't find the ZIP64 end of central directory locator"
                    )
                  if (
                    (this.reader.setIndex(y),
                    this.checkSignature(o.ZIP64_CENTRAL_DIRECTORY_LOCATOR),
                    this.readBlockZip64EndOfCentralLocator(),
                    !this.isSignature(
                      this.relativeOffsetEndOfZip64CentralDir,
                      o.ZIP64_CENTRAL_DIRECTORY_END
                    ) &&
                      ((this.relativeOffsetEndOfZip64CentralDir =
                        this.reader.lastIndexOfSignature(
                          o.ZIP64_CENTRAL_DIRECTORY_END
                        )),
                      this.relativeOffsetEndOfZip64CentralDir < 0))
                  )
                    throw new Error(
                      "Corrupted zip: can't find the ZIP64 end of central directory"
                    )
                  this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),
                    this.checkSignature(o.ZIP64_CENTRAL_DIRECTORY_END),
                    this.readBlockZip64EndOfCentral()
                }
                var l = this.centralDirOffset + this.centralDirSize
                this.zip64 &&
                  ((l += 20), (l += 12 + this.zip64EndOfCentralSize))
                var g = L - l
                if (0 < g)
                  this.isSignature(L, o.CENTRAL_FILE_HEADER) ||
                    (this.reader.zero = g)
                else if (g < 0)
                  throw new Error(
                    'Corrupted zip: missing ' + Math.abs(g) + ' bytes.'
                  )
              },
              prepareReader: function (y) {
                this.reader = d(y)
              },
              load: function (y) {
                this.prepareReader(y),
                  this.readEndOfCentral(),
                  this.readCentralDir(),
                  this.readLocalFiles()
              }
            }),
              (C.exports = U)
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
          function (N, C, v) {
            var d = N('./reader/readerFor'),
              h = N('./utils'),
              o = N('./compressedObject'),
              _ = N('./crc32'),
              n = N('./utf8'),
              U = N('./compressions'),
              y = N('./support')
            function L(l, g) {
              ;(this.options = l), (this.loadOptions = g)
            }
            ;(L.prototype = {
              isEncrypted: function () {
                return (1 & this.bitFlag) == 1
              },
              useUTF8: function () {
                return (2048 & this.bitFlag) == 2048
              },
              readLocalPart: function (l) {
                var g, s
                if (
                  (l.skip(22),
                  (this.fileNameLength = l.readInt(2)),
                  (s = l.readInt(2)),
                  (this.fileName = l.readData(this.fileNameLength)),
                  l.skip(s),
                  this.compressedSize === -1 || this.uncompressedSize === -1)
                )
                  throw new Error(
                    "Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)"
                  )
                if (
                  (g = (function (p) {
                    for (var f in U)
                      if (
                        Object.prototype.hasOwnProperty.call(U, f) &&
                        U[f].magic === p
                      )
                        return U[f]
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
                this.decompressed = new o(
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
                  var l = d(this.extraFields[1].value)
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
                  s,
                  p,
                  f = l.index + this.extraFieldsLength
                for (
                  this.extraFields || (this.extraFields = {});
                  l.index + 4 < f;

                )
                  (g = l.readInt(2)),
                    (s = l.readInt(2)),
                    (p = l.readData(s)),
                    (this.extraFields[g] = { id: g, length: s, value: p })
                l.setIndex(f)
              },
              handleUTF8: function () {
                var l = y.uint8array ? 'uint8array' : 'array'
                if (this.useUTF8())
                  (this.fileNameStr = n.utf8decode(this.fileName)),
                    (this.fileCommentStr = n.utf8decode(this.fileComment))
                else {
                  var g = this.findExtraFieldUnicodePath()
                  if (g !== null) this.fileNameStr = g
                  else {
                    var s = h.transformTo(l, this.fileName)
                    this.fileNameStr = this.loadOptions.decodeFileName(s)
                  }
                  var p = this.findExtraFieldUnicodeComment()
                  if (p !== null) this.fileCommentStr = p
                  else {
                    var f = h.transformTo(l, this.fileComment)
                    this.fileCommentStr = this.loadOptions.decodeFileName(f)
                  }
                }
              },
              findExtraFieldUnicodePath: function () {
                var l = this.extraFields[28789]
                if (l) {
                  var g = d(l.value)
                  return g.readInt(1) !== 1 || _(this.fileName) !== g.readInt(4)
                    ? null
                    : n.utf8decode(g.readData(l.length - 5))
                }
                return null
              },
              findExtraFieldUnicodeComment: function () {
                var l = this.extraFields[25461]
                if (l) {
                  var g = d(l.value)
                  return g.readInt(1) !== 1 ||
                    _(this.fileComment) !== g.readInt(4)
                    ? null
                    : n.utf8decode(g.readData(l.length - 5))
                }
                return null
              }
            }),
              (C.exports = L)
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
          function (N, C, v) {
            function d(g, s, p) {
              ;(this.name = g),
                (this.dir = p.dir),
                (this.date = p.date),
                (this.comment = p.comment),
                (this.unixPermissions = p.unixPermissions),
                (this.dosPermissions = p.dosPermissions),
                (this._data = s),
                (this._dataBinary = p.binary),
                (this.options = {
                  compression: p.compression,
                  compressionOptions: p.compressionOptions
                })
            }
            var h = N('./stream/StreamHelper'),
              o = N('./stream/DataWorker'),
              _ = N('./utf8'),
              n = N('./compressedObject'),
              U = N('./stream/GenericWorker')
            d.prototype = {
              internalStream: function (g) {
                var s = null,
                  p = 'string'
                try {
                  if (!g) throw new Error('No output type specified.')
                  var f = (p = g.toLowerCase()) === 'string' || p === 'text'
                  ;(p !== 'binarystring' && p !== 'text') || (p = 'string'),
                    (s = this._decompressWorker())
                  var E = !this._dataBinary
                  E && !f && (s = s.pipe(new _.Utf8EncodeWorker())),
                    !E && f && (s = s.pipe(new _.Utf8DecodeWorker()))
                } catch (S) {
                  ;(s = new U('error')).error(S)
                }
                return new h(s, p, '')
              },
              async: function (g, s) {
                return this.internalStream(g).accumulate(s)
              },
              nodeStream: function (g, s) {
                return this.internalStream(g || 'nodebuffer').toNodejsStream(s)
              },
              _compressWorker: function (g, s) {
                if (
                  this._data instanceof n &&
                  this._data.compression.magic === g.magic
                )
                  return this._data.getCompressedWorker()
                var p = this._decompressWorker()
                return (
                  this._dataBinary || (p = p.pipe(new _.Utf8EncodeWorker())),
                  n.createWorkerFrom(p, g, s)
                )
              },
              _decompressWorker: function () {
                return this._data instanceof n
                  ? this._data.getContentWorker()
                  : this._data instanceof U
                  ? this._data
                  : new o(this._data)
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
              d.prototype[y[l]] = L
            C.exports = d
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
          function (N, C, v) {
            ;(function (d) {
              var h,
                o,
                _ = d.MutationObserver || d.WebKitMutationObserver
              if (_) {
                var n = 0,
                  U = new _(g),
                  y = d.document.createTextNode('')
                U.observe(y, { characterData: !0 }),
                  (h = function () {
                    y.data = n = ++n % 2
                  })
              } else if (d.setImmediate || d.MessageChannel === void 0)
                h =
                  'document' in d &&
                  'onreadystatechange' in d.document.createElement('script')
                    ? function () {
                        var s = d.document.createElement('script')
                        ;(s.onreadystatechange = function () {
                          g(),
                            (s.onreadystatechange = null),
                            s.parentNode.removeChild(s),
                            (s = null)
                        }),
                          d.document.documentElement.appendChild(s)
                      }
                    : function () {
                        setTimeout(g, 0)
                      }
              else {
                var L = new d.MessageChannel()
                ;(L.port1.onmessage = g),
                  (h = function () {
                    L.port2.postMessage(0)
                  })
              }
              var l = []
              function g() {
                var s, p
                o = !0
                for (var f = l.length; f; ) {
                  for (p = l, l = [], s = -1; ++s < f; ) p[s]()
                  f = l.length
                }
                o = !1
              }
              C.exports = function (s) {
                l.push(s) !== 1 || o || h()
              }
            }).call(
              this,
              typeof ve < 'u'
                ? ve
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
          function (N, C, v) {
            var d = N('immediate')
            function h() {}
            var o = {},
              _ = ['REJECTED'],
              n = ['FULFILLED'],
              U = ['PENDING']
            function y(f) {
              if (typeof f != 'function')
                throw new TypeError('resolver must be a function')
              ;(this.state = U),
                (this.queue = []),
                (this.outcome = void 0),
                f !== h && s(this, f)
            }
            function L(f, E, S) {
              ;(this.promise = f),
                typeof E == 'function' &&
                  ((this.onFulfilled = E),
                  (this.callFulfilled = this.otherCallFulfilled)),
                typeof S == 'function' &&
                  ((this.onRejected = S),
                  (this.callRejected = this.otherCallRejected))
            }
            function l(f, E, S) {
              d(function () {
                var I
                try {
                  I = E(S)
                } catch (A) {
                  return o.reject(f, A)
                }
                I === f
                  ? o.reject(
                      f,
                      new TypeError('Cannot resolve promise with itself')
                    )
                  : o.resolve(f, I)
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
            function s(f, E) {
              var S = !1
              function I(G) {
                S || ((S = !0), o.reject(f, G))
              }
              function A(G) {
                S || ((S = !0), o.resolve(f, G))
              }
              var X = p(function () {
                E(A, I)
              })
              X.status === 'error' && I(X.value)
            }
            function p(f, E) {
              var S = {}
              try {
                ;(S.value = f(E)), (S.status = 'success')
              } catch (I) {
                ;(S.status = 'error'), (S.value = I)
              }
              return S
            }
            ;((C.exports = y).prototype.finally = function (f) {
              if (typeof f != 'function') return this
              var E = this.constructor
              return this.then(
                function (S) {
                  return E.resolve(f()).then(function () {
                    return S
                  })
                },
                function (S) {
                  return E.resolve(f()).then(function () {
                    throw S
                  })
                }
              )
            }),
              (y.prototype.catch = function (f) {
                return this.then(null, f)
              }),
              (y.prototype.then = function (f, E) {
                if (
                  (typeof f != 'function' && this.state === n) ||
                  (typeof E != 'function' && this.state === _)
                )
                  return this
                var S = new this.constructor(h)
                return (
                  this.state !== U
                    ? l(S, this.state === n ? f : E, this.outcome)
                    : this.queue.push(new L(S, f, E)),
                  S
                )
              }),
              (L.prototype.callFulfilled = function (f) {
                o.resolve(this.promise, f)
              }),
              (L.prototype.otherCallFulfilled = function (f) {
                l(this.promise, this.onFulfilled, f)
              }),
              (L.prototype.callRejected = function (f) {
                o.reject(this.promise, f)
              }),
              (L.prototype.otherCallRejected = function (f) {
                l(this.promise, this.onRejected, f)
              }),
              (o.resolve = function (f, E) {
                var S = p(g, E)
                if (S.status === 'error') return o.reject(f, S.value)
                var I = S.value
                if (I) s(f, I)
                else {
                  ;(f.state = n), (f.outcome = E)
                  for (var A = -1, X = f.queue.length; ++A < X; )
                    f.queue[A].callFulfilled(E)
                }
                return f
              }),
              (o.reject = function (f, E) {
                ;(f.state = _), (f.outcome = E)
                for (var S = -1, I = f.queue.length; ++S < I; )
                  f.queue[S].callRejected(E)
                return f
              }),
              (y.resolve = function (f) {
                return f instanceof this ? f : o.resolve(new this(h), f)
              }),
              (y.reject = function (f) {
                var E = new this(h)
                return o.reject(E, f)
              }),
              (y.all = function (f) {
                var E = this
                if (Object.prototype.toString.call(f) !== '[object Array]')
                  return this.reject(new TypeError('must be an array'))
                var S = f.length,
                  I = !1
                if (!S) return this.resolve([])
                for (
                  var A = new Array(S), X = 0, G = -1, K = new this(h);
                  ++G < S;

                )
                  B(f[G], G)
                return K
                function B(Q, ot) {
                  E.resolve(Q).then(
                    function (w) {
                      ;(A[ot] = w),
                        ++X !== S || I || ((I = !0), o.resolve(K, A))
                    },
                    function (w) {
                      I || ((I = !0), o.reject(K, w))
                    }
                  )
                }
              }),
              (y.race = function (f) {
                var E = this
                if (Object.prototype.toString.call(f) !== '[object Array]')
                  return this.reject(new TypeError('must be an array'))
                var S = f.length,
                  I = !1
                if (!S) return this.resolve([])
                for (var A = -1, X = new this(h); ++A < S; )
                  (G = f[A]),
                    E.resolve(G).then(
                      function (K) {
                        I || ((I = !0), o.resolve(X, K))
                      },
                      function (K) {
                        I || ((I = !0), o.reject(X, K))
                      }
                    )
                var G
                return X
              })
          },
          { immediate: 36 }
        ],
        38: [
          function (N, C, v) {
            var d = {}
            ;(0, N('./lib/utils/common').assign)(
              d,
              N('./lib/deflate'),
              N('./lib/inflate'),
              N('./lib/zlib/constants')
            ),
              (C.exports = d)
          },
          {
            './lib/deflate': 39,
            './lib/inflate': 40,
            './lib/utils/common': 41,
            './lib/zlib/constants': 44
          }
        ],
        39: [
          function (N, C, v) {
            var d = N('./zlib/deflate'),
              h = N('./utils/common'),
              o = N('./utils/strings'),
              _ = N('./zlib/messages'),
              n = N('./zlib/zstream'),
              U = Object.prototype.toString,
              y = 0,
              L = -1,
              l = 0,
              g = 8
            function s(f) {
              if (!(this instanceof s)) return new s(f)
              this.options = h.assign(
                {
                  level: L,
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
                (this.strm = new n()),
                (this.strm.avail_out = 0)
              var S = d.deflateInit2(
                this.strm,
                E.level,
                E.method,
                E.windowBits,
                E.memLevel,
                E.strategy
              )
              if (S !== y) throw new Error(_[S])
              if (
                (E.header && d.deflateSetHeader(this.strm, E.header),
                E.dictionary)
              ) {
                var I
                if (
                  ((I =
                    typeof E.dictionary == 'string'
                      ? o.string2buf(E.dictionary)
                      : U.call(E.dictionary) === '[object ArrayBuffer]'
                      ? new Uint8Array(E.dictionary)
                      : E.dictionary),
                  (S = d.deflateSetDictionary(this.strm, I)) !== y)
                )
                  throw new Error(_[S])
                this._dict_set = !0
              }
            }
            function p(f, E) {
              var S = new s(E)
              if ((S.push(f, !0), S.err)) throw S.msg || _[S.err]
              return S.result
            }
            ;(s.prototype.push = function (f, E) {
              var S,
                I,
                A = this.strm,
                X = this.options.chunkSize
              if (this.ended) return !1
              ;(I = E === ~~E ? E : E === !0 ? 4 : 0),
                typeof f == 'string'
                  ? (A.input = o.string2buf(f))
                  : U.call(f) === '[object ArrayBuffer]'
                  ? (A.input = new Uint8Array(f))
                  : (A.input = f),
                (A.next_in = 0),
                (A.avail_in = A.input.length)
              do {
                if (
                  (A.avail_out === 0 &&
                    ((A.output = new h.Buf8(X)),
                    (A.next_out = 0),
                    (A.avail_out = X)),
                  (S = d.deflate(A, I)) !== 1 && S !== y)
                )
                  return this.onEnd(S), !(this.ended = !0)
                ;(A.avail_out !== 0 &&
                  (A.avail_in !== 0 || (I !== 4 && I !== 2))) ||
                  (this.options.to === 'string'
                    ? this.onData(
                        o.buf2binstring(h.shrinkBuf(A.output, A.next_out))
                      )
                    : this.onData(h.shrinkBuf(A.output, A.next_out)))
              } while ((0 < A.avail_in || A.avail_out === 0) && S !== 1)
              return I === 4
                ? ((S = d.deflateEnd(this.strm)),
                  this.onEnd(S),
                  (this.ended = !0),
                  S === y)
                : I !== 2 || (this.onEnd(y), !(A.avail_out = 0))
            }),
              (s.prototype.onData = function (f) {
                this.chunks.push(f)
              }),
              (s.prototype.onEnd = function (f) {
                f === y &&
                  (this.options.to === 'string'
                    ? (this.result = this.chunks.join(''))
                    : (this.result = h.flattenChunks(this.chunks))),
                  (this.chunks = []),
                  (this.err = f),
                  (this.msg = this.strm.msg)
              }),
              (v.Deflate = s),
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
          function (N, C, v) {
            var d = N('./zlib/inflate'),
              h = N('./utils/common'),
              o = N('./utils/strings'),
              _ = N('./zlib/constants'),
              n = N('./zlib/messages'),
              U = N('./zlib/zstream'),
              y = N('./zlib/gzheader'),
              L = Object.prototype.toString
            function l(s) {
              if (!(this instanceof l)) return new l(s)
              this.options = h.assign(
                { chunkSize: 16384, windowBits: 0, to: '' },
                s || {}
              )
              var p = this.options
              p.raw &&
                0 <= p.windowBits &&
                p.windowBits < 16 &&
                ((p.windowBits = -p.windowBits),
                p.windowBits === 0 && (p.windowBits = -15)),
                !(0 <= p.windowBits && p.windowBits < 16) ||
                  (s && s.windowBits) ||
                  (p.windowBits += 32),
                15 < p.windowBits &&
                  p.windowBits < 48 &&
                  !(15 & p.windowBits) &&
                  (p.windowBits |= 15),
                (this.err = 0),
                (this.msg = ''),
                (this.ended = !1),
                (this.chunks = []),
                (this.strm = new U()),
                (this.strm.avail_out = 0)
              var f = d.inflateInit2(this.strm, p.windowBits)
              if (f !== _.Z_OK) throw new Error(n[f])
              ;(this.header = new y()),
                d.inflateGetHeader(this.strm, this.header)
            }
            function g(s, p) {
              var f = new l(p)
              if ((f.push(s, !0), f.err)) throw f.msg || n[f.err]
              return f.result
            }
            ;(l.prototype.push = function (s, p) {
              var f,
                E,
                S,
                I,
                A,
                X,
                G = this.strm,
                K = this.options.chunkSize,
                B = this.options.dictionary,
                Q = !1
              if (this.ended) return !1
              ;(E = p === ~~p ? p : p === !0 ? _.Z_FINISH : _.Z_NO_FLUSH),
                typeof s == 'string'
                  ? (G.input = o.binstring2buf(s))
                  : L.call(s) === '[object ArrayBuffer]'
                  ? (G.input = new Uint8Array(s))
                  : (G.input = s),
                (G.next_in = 0),
                (G.avail_in = G.input.length)
              do {
                if (
                  (G.avail_out === 0 &&
                    ((G.output = new h.Buf8(K)),
                    (G.next_out = 0),
                    (G.avail_out = K)),
                  (f = d.inflate(G, _.Z_NO_FLUSH)) === _.Z_NEED_DICT &&
                    B &&
                    ((X =
                      typeof B == 'string'
                        ? o.string2buf(B)
                        : L.call(B) === '[object ArrayBuffer]'
                        ? new Uint8Array(B)
                        : B),
                    (f = d.inflateSetDictionary(this.strm, X))),
                  f === _.Z_BUF_ERROR && Q === !0 && ((f = _.Z_OK), (Q = !1)),
                  f !== _.Z_STREAM_END && f !== _.Z_OK)
                )
                  return this.onEnd(f), !(this.ended = !0)
                G.next_out &&
                  ((G.avail_out !== 0 &&
                    f !== _.Z_STREAM_END &&
                    (G.avail_in !== 0 ||
                      (E !== _.Z_FINISH && E !== _.Z_SYNC_FLUSH))) ||
                    (this.options.to === 'string'
                      ? ((S = o.utf8border(G.output, G.next_out)),
                        (I = G.next_out - S),
                        (A = o.buf2string(G.output, S)),
                        (G.next_out = I),
                        (G.avail_out = K - I),
                        I && h.arraySet(G.output, G.output, S, I, 0),
                        this.onData(A))
                      : this.onData(h.shrinkBuf(G.output, G.next_out)))),
                  G.avail_in === 0 && G.avail_out === 0 && (Q = !0)
              } while (
                (0 < G.avail_in || G.avail_out === 0) &&
                f !== _.Z_STREAM_END
              )
              return (
                f === _.Z_STREAM_END && (E = _.Z_FINISH),
                E === _.Z_FINISH
                  ? ((f = d.inflateEnd(this.strm)),
                    this.onEnd(f),
                    (this.ended = !0),
                    f === _.Z_OK)
                  : E !== _.Z_SYNC_FLUSH ||
                    (this.onEnd(_.Z_OK), !(G.avail_out = 0))
              )
            }),
              (l.prototype.onData = function (s) {
                this.chunks.push(s)
              }),
              (l.prototype.onEnd = function (s) {
                s === _.Z_OK &&
                  (this.options.to === 'string'
                    ? (this.result = this.chunks.join(''))
                    : (this.result = h.flattenChunks(this.chunks))),
                  (this.chunks = []),
                  (this.err = s),
                  (this.msg = this.strm.msg)
              }),
              (v.Inflate = l),
              (v.inflate = g),
              (v.inflateRaw = function (s, p) {
                return ((p = p || {}).raw = !0), g(s, p)
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
          function (N, C, v) {
            var d =
              typeof Uint8Array < 'u' &&
              typeof Uint16Array < 'u' &&
              typeof Int32Array < 'u'
            ;(v.assign = function (_) {
              for (
                var n = Array.prototype.slice.call(arguments, 1);
                n.length;

              ) {
                var U = n.shift()
                if (U) {
                  if (typeof U != 'object')
                    throw new TypeError(U + 'must be non-object')
                  for (var y in U) U.hasOwnProperty(y) && (_[y] = U[y])
                }
              }
              return _
            }),
              (v.shrinkBuf = function (_, n) {
                return _.length === n
                  ? _
                  : _.subarray
                  ? _.subarray(0, n)
                  : ((_.length = n), _)
              })
            var h = {
                arraySet: function (_, n, U, y, L) {
                  if (n.subarray && _.subarray) _.set(n.subarray(U, U + y), L)
                  else for (var l = 0; l < y; l++) _[L + l] = n[U + l]
                },
                flattenChunks: function (_) {
                  var n, U, y, L, l, g
                  for (n = y = 0, U = _.length; n < U; n++) y += _[n].length
                  for (
                    g = new Uint8Array(y), n = L = 0, U = _.length;
                    n < U;
                    n++
                  )
                    (l = _[n]), g.set(l, L), (L += l.length)
                  return g
                }
              },
              o = {
                arraySet: function (_, n, U, y, L) {
                  for (var l = 0; l < y; l++) _[L + l] = n[U + l]
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
                  v.assign(v, o))
            }),
              v.setTyped(d)
          },
          {}
        ],
        42: [
          function (N, C, v) {
            var d = N('./common'),
              h = !0,
              o = !0
            try {
              String.fromCharCode.apply(null, [0])
            } catch {
              h = !1
            }
            try {
              String.fromCharCode.apply(null, new Uint8Array(1))
            } catch {
              o = !1
            }
            for (var _ = new d.Buf8(256), n = 0; n < 256; n++)
              _[n] =
                252 <= n
                  ? 6
                  : 248 <= n
                  ? 5
                  : 240 <= n
                  ? 4
                  : 224 <= n
                  ? 3
                  : 192 <= n
                  ? 2
                  : 1
            function U(y, L) {
              if (L < 65537 && ((y.subarray && o) || (!y.subarray && h)))
                return String.fromCharCode.apply(null, d.shrinkBuf(y, L))
              for (var l = '', g = 0; g < L; g++) l += String.fromCharCode(y[g])
              return l
            }
            ;(_[254] = _[254] = 1),
              (v.string2buf = function (y) {
                var L,
                  l,
                  g,
                  s,
                  p,
                  f = y.length,
                  E = 0
                for (s = 0; s < f; s++)
                  (64512 & (l = y.charCodeAt(s))) == 55296 &&
                    s + 1 < f &&
                    (64512 & (g = y.charCodeAt(s + 1))) == 56320 &&
                    ((l = 65536 + ((l - 55296) << 10) + (g - 56320)), s++),
                    (E += l < 128 ? 1 : l < 2048 ? 2 : l < 65536 ? 3 : 4)
                for (L = new d.Buf8(E), s = p = 0; p < E; s++)
                  (64512 & (l = y.charCodeAt(s))) == 55296 &&
                    s + 1 < f &&
                    (64512 & (g = y.charCodeAt(s + 1))) == 56320 &&
                    ((l = 65536 + ((l - 55296) << 10) + (g - 56320)), s++),
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
                return U(y, y.length)
              }),
              (v.binstring2buf = function (y) {
                for (
                  var L = new d.Buf8(y.length), l = 0, g = L.length;
                  l < g;
                  l++
                )
                  L[l] = y.charCodeAt(l)
                return L
              }),
              (v.buf2string = function (y, L) {
                var l,
                  g,
                  s,
                  p,
                  f = L || y.length,
                  E = new Array(2 * f)
                for (l = g = 0; l < f; )
                  if ((s = y[l++]) < 128) E[g++] = s
                  else if (4 < (p = _[s])) (E[g++] = 65533), (l += p - 1)
                  else {
                    for (s &= p === 2 ? 31 : p === 3 ? 15 : 7; 1 < p && l < f; )
                      (s = (s << 6) | (63 & y[l++])), p--
                    1 < p
                      ? (E[g++] = 65533)
                      : s < 65536
                      ? (E[g++] = s)
                      : ((s -= 65536),
                        (E[g++] = 55296 | ((s >> 10) & 1023)),
                        (E[g++] = 56320 | (1023 & s)))
                  }
                return U(E, g)
              }),
              (v.utf8border = function (y, L) {
                var l
                for (
                  (L = L || y.length) > y.length && (L = y.length), l = L - 1;
                  0 <= l && (192 & y[l]) == 128;

                )
                  l--
                return l < 0 || l === 0 ? L : l + _[y[l]] > L ? l : L
              })
          },
          { './common': 41 }
        ],
        43: [
          function (N, C, v) {
            C.exports = function (d, h, o, _) {
              for (
                var n = (65535 & d) | 0, U = ((d >>> 16) & 65535) | 0, y = 0;
                o !== 0;

              ) {
                for (
                  o -= y = 2e3 < o ? 2e3 : o;
                  (U = (U + (n = (n + h[_++]) | 0)) | 0), --y;

                );
                ;(n %= 65521), (U %= 65521)
              }
              return n | (U << 16) | 0
            }
          },
          {}
        ],
        44: [
          function (N, C, v) {
            C.exports = {
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
          function (N, C, v) {
            var d = (function () {
              for (var h, o = [], _ = 0; _ < 256; _++) {
                h = _
                for (var n = 0; n < 8; n++)
                  h = 1 & h ? 3988292384 ^ (h >>> 1) : h >>> 1
                o[_] = h
              }
              return o
            })()
            C.exports = function (h, o, _, n) {
              var U = d,
                y = n + _
              h ^= -1
              for (var L = n; L < y; L++) h = (h >>> 8) ^ U[255 & (h ^ o[L])]
              return -1 ^ h
            }
          },
          {}
        ],
        46: [
          function (N, C, v) {
            var d,
              h = N('../utils/common'),
              o = N('./trees'),
              _ = N('./adler32'),
              n = N('./crc32'),
              U = N('./messages'),
              y = 0,
              L = 4,
              l = 0,
              g = -2,
              s = -1,
              p = 4,
              f = 2,
              E = 8,
              S = 9,
              I = 286,
              A = 30,
              X = 19,
              G = 2 * I + 1,
              K = 15,
              B = 3,
              Q = 258,
              ot = Q + B + 1,
              w = 42,
              x = 113,
              a = 1,
              P = 2,
              ct = 3,
              H = 4
            function ut(r, M) {
              return (r.msg = U[M]), M
            }
            function J(r) {
              return (r << 1) - (4 < r ? 9 : 0)
            }
            function $(r) {
              for (var M = r.length; 0 <= --M; ) r[M] = 0
            }
            function O(r) {
              var M = r.state,
                R = M.pending
              R > r.avail_out && (R = r.avail_out),
                R !== 0 &&
                  (h.arraySet(
                    r.output,
                    M.pending_buf,
                    M.pending_out,
                    R,
                    r.next_out
                  ),
                  (r.next_out += R),
                  (M.pending_out += R),
                  (r.total_out += R),
                  (r.avail_out -= R),
                  (M.pending -= R),
                  M.pending === 0 && (M.pending_out = 0))
            }
            function F(r, M) {
              o._tr_flush_block(
                r,
                0 <= r.block_start ? r.block_start : -1,
                r.strstart - r.block_start,
                M
              ),
                (r.block_start = r.strstart),
                O(r.strm)
            }
            function st(r, M) {
              r.pending_buf[r.pending++] = M
            }
            function nt(r, M) {
              ;(r.pending_buf[r.pending++] = (M >>> 8) & 255),
                (r.pending_buf[r.pending++] = 255 & M)
            }
            function tt(r, M) {
              var R,
                m,
                u = r.max_chain_length,
                T = r.strstart,
                Z = r.prev_length,
                W = r.nice_match,
                D =
                  r.strstart > r.w_size - ot ? r.strstart - (r.w_size - ot) : 0,
                V = r.window,
                rt = r.w_mask,
                et = r.prev,
                at = r.strstart + Q,
                wt = V[T + Z - 1],
                pt = V[T + Z]
              r.prev_length >= r.good_match && (u >>= 2),
                W > r.lookahead && (W = r.lookahead)
              do
                if (
                  V[(R = M) + Z] === pt &&
                  V[R + Z - 1] === wt &&
                  V[R] === V[T] &&
                  V[++R] === V[T + 1]
                ) {
                  ;(T += 2), R++
                  do;
                  while (
                    V[++T] === V[++R] &&
                    V[++T] === V[++R] &&
                    V[++T] === V[++R] &&
                    V[++T] === V[++R] &&
                    V[++T] === V[++R] &&
                    V[++T] === V[++R] &&
                    V[++T] === V[++R] &&
                    V[++T] === V[++R] &&
                    T < at
                  )
                  if (((m = Q - (at - T)), (T = at - Q), Z < m)) {
                    if (((r.match_start = M), W <= (Z = m))) break
                    ;(wt = V[T + Z - 1]), (pt = V[T + Z])
                  }
                }
              while ((M = et[M & rt]) > D && --u != 0)
              return Z <= r.lookahead ? Z : r.lookahead
            }
            function Ut(r) {
              var M,
                R,
                m,
                u,
                T,
                Z,
                W,
                D,
                V,
                rt,
                et = r.w_size
              do {
                if (
                  ((u = r.window_size - r.lookahead - r.strstart),
                  r.strstart >= et + (et - ot))
                ) {
                  for (
                    h.arraySet(r.window, r.window, et, et, 0),
                      r.match_start -= et,
                      r.strstart -= et,
                      r.block_start -= et,
                      M = R = r.hash_size;
                    (m = r.head[--M]), (r.head[M] = et <= m ? m - et : 0), --R;

                  );
                  for (
                    M = R = et;
                    (m = r.prev[--M]), (r.prev[M] = et <= m ? m - et : 0), --R;

                  );
                  u += et
                }
                if (r.strm.avail_in === 0) break
                if (
                  ((Z = r.strm),
                  (W = r.window),
                  (D = r.strstart + r.lookahead),
                  (V = u),
                  (rt = void 0),
                  (rt = Z.avail_in),
                  V < rt && (rt = V),
                  (R =
                    rt === 0
                      ? 0
                      : ((Z.avail_in -= rt),
                        h.arraySet(W, Z.input, Z.next_in, rt, D),
                        Z.state.wrap === 1
                          ? (Z.adler = _(Z.adler, W, rt, D))
                          : Z.state.wrap === 2 &&
                            (Z.adler = n(Z.adler, W, rt, D)),
                        (Z.next_in += rt),
                        (Z.total_in += rt),
                        rt)),
                  (r.lookahead += R),
                  r.lookahead + r.insert >= B)
                )
                  for (
                    T = r.strstart - r.insert,
                      r.ins_h = r.window[T],
                      r.ins_h =
                        ((r.ins_h << r.hash_shift) ^ r.window[T + 1]) &
                        r.hash_mask;
                    r.insert &&
                    ((r.ins_h =
                      ((r.ins_h << r.hash_shift) ^ r.window[T + B - 1]) &
                      r.hash_mask),
                    (r.prev[T & r.w_mask] = r.head[r.ins_h]),
                    (r.head[r.ins_h] = T),
                    T++,
                    r.insert--,
                    !(r.lookahead + r.insert < B));

                  );
              } while (r.lookahead < ot && r.strm.avail_in !== 0)
            }
            function kt(r, M) {
              for (var R, m; ; ) {
                if (r.lookahead < ot) {
                  if ((Ut(r), r.lookahead < ot && M === y)) return a
                  if (r.lookahead === 0) break
                }
                if (
                  ((R = 0),
                  r.lookahead >= B &&
                    ((r.ins_h =
                      ((r.ins_h << r.hash_shift) ^
                        r.window[r.strstart + B - 1]) &
                      r.hash_mask),
                    (R = r.prev[r.strstart & r.w_mask] = r.head[r.ins_h]),
                    (r.head[r.ins_h] = r.strstart)),
                  R !== 0 &&
                    r.strstart - R <= r.w_size - ot &&
                    (r.match_length = tt(r, R)),
                  r.match_length >= B)
                )
                  if (
                    ((m = o._tr_tally(
                      r,
                      r.strstart - r.match_start,
                      r.match_length - B
                    )),
                    (r.lookahead -= r.match_length),
                    r.match_length <= r.max_lazy_match && r.lookahead >= B)
                  ) {
                    for (
                      r.match_length--;
                      r.strstart++,
                        (r.ins_h =
                          ((r.ins_h << r.hash_shift) ^
                            r.window[r.strstart + B - 1]) &
                          r.hash_mask),
                        (R = r.prev[r.strstart & r.w_mask] = r.head[r.ins_h]),
                        (r.head[r.ins_h] = r.strstart),
                        --r.match_length != 0;

                    );
                    r.strstart++
                  } else
                    (r.strstart += r.match_length),
                      (r.match_length = 0),
                      (r.ins_h = r.window[r.strstart]),
                      (r.ins_h =
                        ((r.ins_h << r.hash_shift) ^ r.window[r.strstart + 1]) &
                        r.hash_mask)
                else
                  (m = o._tr_tally(r, 0, r.window[r.strstart])),
                    r.lookahead--,
                    r.strstart++
                if (m && (F(r, !1), r.strm.avail_out === 0)) return a
              }
              return (
                (r.insert = r.strstart < B - 1 ? r.strstart : B - 1),
                M === L
                  ? (F(r, !0), r.strm.avail_out === 0 ? ct : H)
                  : r.last_lit && (F(r, !1), r.strm.avail_out === 0)
                  ? a
                  : P
              )
            }
            function Nt(r, M) {
              for (var R, m, u; ; ) {
                if (r.lookahead < ot) {
                  if ((Ut(r), r.lookahead < ot && M === y)) return a
                  if (r.lookahead === 0) break
                }
                if (
                  ((R = 0),
                  r.lookahead >= B &&
                    ((r.ins_h =
                      ((r.ins_h << r.hash_shift) ^
                        r.window[r.strstart + B - 1]) &
                      r.hash_mask),
                    (R = r.prev[r.strstart & r.w_mask] = r.head[r.ins_h]),
                    (r.head[r.ins_h] = r.strstart)),
                  (r.prev_length = r.match_length),
                  (r.prev_match = r.match_start),
                  (r.match_length = B - 1),
                  R !== 0 &&
                    r.prev_length < r.max_lazy_match &&
                    r.strstart - R <= r.w_size - ot &&
                    ((r.match_length = tt(r, R)),
                    r.match_length <= 5 &&
                      (r.strategy === 1 ||
                        (r.match_length === B &&
                          4096 < r.strstart - r.match_start)) &&
                      (r.match_length = B - 1)),
                  r.prev_length >= B && r.match_length <= r.prev_length)
                ) {
                  for (
                    u = r.strstart + r.lookahead - B,
                      m = o._tr_tally(
                        r,
                        r.strstart - 1 - r.prev_match,
                        r.prev_length - B
                      ),
                      r.lookahead -= r.prev_length - 1,
                      r.prev_length -= 2;
                    ++r.strstart <= u &&
                      ((r.ins_h =
                        ((r.ins_h << r.hash_shift) ^
                          r.window[r.strstart + B - 1]) &
                        r.hash_mask),
                      (R = r.prev[r.strstart & r.w_mask] = r.head[r.ins_h]),
                      (r.head[r.ins_h] = r.strstart)),
                      --r.prev_length != 0;

                  );
                  if (
                    ((r.match_available = 0),
                    (r.match_length = B - 1),
                    r.strstart++,
                    m && (F(r, !1), r.strm.avail_out === 0))
                  )
                    return a
                } else if (r.match_available) {
                  if (
                    ((m = o._tr_tally(r, 0, r.window[r.strstart - 1])) &&
                      F(r, !1),
                    r.strstart++,
                    r.lookahead--,
                    r.strm.avail_out === 0)
                  )
                    return a
                } else (r.match_available = 1), r.strstart++, r.lookahead--
              }
              return (
                r.match_available &&
                  ((m = o._tr_tally(r, 0, r.window[r.strstart - 1])),
                  (r.match_available = 0)),
                (r.insert = r.strstart < B - 1 ? r.strstart : B - 1),
                M === L
                  ? (F(r, !0), r.strm.avail_out === 0 ? ct : H)
                  : r.last_lit && (F(r, !1), r.strm.avail_out === 0)
                  ? a
                  : P
              )
            }
            function Et(r, M, R, m, u) {
              ;(this.good_length = r),
                (this.max_lazy = M),
                (this.nice_length = R),
                (this.max_chain = m),
                (this.func = u)
            }
            function Lt() {
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
                (this.dyn_dtree = new h.Buf16(2 * (2 * A + 1))),
                (this.bl_tree = new h.Buf16(2 * (2 * X + 1))),
                $(this.dyn_ltree),
                $(this.dyn_dtree),
                $(this.bl_tree),
                (this.l_desc = null),
                (this.d_desc = null),
                (this.bl_desc = null),
                (this.bl_count = new h.Buf16(K + 1)),
                (this.heap = new h.Buf16(2 * I + 1)),
                $(this.heap),
                (this.heap_len = 0),
                (this.heap_max = 0),
                (this.depth = new h.Buf16(2 * I + 1)),
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
            function vt(r) {
              var M
              return r && r.state
                ? ((r.total_in = r.total_out = 0),
                  (r.data_type = f),
                  ((M = r.state).pending = 0),
                  (M.pending_out = 0),
                  M.wrap < 0 && (M.wrap = -M.wrap),
                  (M.status = M.wrap ? w : x),
                  (r.adler = M.wrap === 2 ? 0 : 1),
                  (M.last_flush = y),
                  o._tr_init(M),
                  l)
                : ut(r, g)
            }
            function It(r) {
              var M = vt(r)
              return (
                M === l &&
                  (function (R) {
                    ;(R.window_size = 2 * R.w_size),
                      $(R.head),
                      (R.max_lazy_match = d[R.level].max_lazy),
                      (R.good_match = d[R.level].good_length),
                      (R.nice_match = d[R.level].nice_length),
                      (R.max_chain_length = d[R.level].max_chain),
                      (R.strstart = 0),
                      (R.block_start = 0),
                      (R.lookahead = 0),
                      (R.insert = 0),
                      (R.match_length = R.prev_length = B - 1),
                      (R.match_available = 0),
                      (R.ins_h = 0)
                  })(r.state),
                M
              )
            }
            function Dt(r, M, R, m, u, T) {
              if (!r) return g
              var Z = 1
              if (
                (M === s && (M = 6),
                m < 0 ? ((Z = 0), (m = -m)) : 15 < m && ((Z = 2), (m -= 16)),
                u < 1 ||
                  S < u ||
                  R !== E ||
                  m < 8 ||
                  15 < m ||
                  M < 0 ||
                  9 < M ||
                  T < 0 ||
                  p < T)
              )
                return ut(r, g)
              m === 8 && (m = 9)
              var W = new Lt()
              return (
                ((r.state = W).strm = r),
                (W.wrap = Z),
                (W.gzhead = null),
                (W.w_bits = m),
                (W.w_size = 1 << W.w_bits),
                (W.w_mask = W.w_size - 1),
                (W.hash_bits = u + 7),
                (W.hash_size = 1 << W.hash_bits),
                (W.hash_mask = W.hash_size - 1),
                (W.hash_shift = ~~((W.hash_bits + B - 1) / B)),
                (W.window = new h.Buf8(2 * W.w_size)),
                (W.head = new h.Buf16(W.hash_size)),
                (W.prev = new h.Buf16(W.w_size)),
                (W.lit_bufsize = 1 << (u + 6)),
                (W.pending_buf_size = 4 * W.lit_bufsize),
                (W.pending_buf = new h.Buf8(W.pending_buf_size)),
                (W.d_buf = 1 * W.lit_bufsize),
                (W.l_buf = 3 * W.lit_bufsize),
                (W.level = M),
                (W.strategy = T),
                (W.method = R),
                It(r)
              )
            }
            ;(d = [
              new Et(0, 0, 0, 0, function (r, M) {
                var R = 65535
                for (
                  R > r.pending_buf_size - 5 && (R = r.pending_buf_size - 5);
                  ;

                ) {
                  if (r.lookahead <= 1) {
                    if ((Ut(r), r.lookahead === 0 && M === y)) return a
                    if (r.lookahead === 0) break
                  }
                  ;(r.strstart += r.lookahead), (r.lookahead = 0)
                  var m = r.block_start + R
                  if (
                    ((r.strstart === 0 || r.strstart >= m) &&
                      ((r.lookahead = r.strstart - m),
                      (r.strstart = m),
                      F(r, !1),
                      r.strm.avail_out === 0)) ||
                    (r.strstart - r.block_start >= r.w_size - ot &&
                      (F(r, !1), r.strm.avail_out === 0))
                  )
                    return a
                }
                return (
                  (r.insert = 0),
                  M === L
                    ? (F(r, !0), r.strm.avail_out === 0 ? ct : H)
                    : (r.strstart > r.block_start &&
                        (F(r, !1), r.strm.avail_out),
                      a)
                )
              }),
              new Et(4, 4, 8, 4, kt),
              new Et(4, 5, 16, 8, kt),
              new Et(4, 6, 32, 32, kt),
              new Et(4, 4, 16, 16, Nt),
              new Et(8, 16, 32, 32, Nt),
              new Et(8, 16, 128, 128, Nt),
              new Et(8, 32, 128, 256, Nt),
              new Et(32, 128, 258, 1024, Nt),
              new Et(32, 258, 258, 4096, Nt)
            ]),
              (v.deflateInit = function (r, M) {
                return Dt(r, M, E, 15, 8, 0)
              }),
              (v.deflateInit2 = Dt),
              (v.deflateReset = It),
              (v.deflateResetKeep = vt),
              (v.deflateSetHeader = function (r, M) {
                return r && r.state
                  ? r.state.wrap !== 2
                    ? g
                    : ((r.state.gzhead = M), l)
                  : g
              }),
              (v.deflate = function (r, M) {
                var R, m, u, T
                if (!r || !r.state || 5 < M || M < 0) return r ? ut(r, g) : g
                if (
                  ((m = r.state),
                  !r.output ||
                    (!r.input && r.avail_in !== 0) ||
                    (m.status === 666 && M !== L))
                )
                  return ut(r, r.avail_out === 0 ? -5 : g)
                if (
                  ((m.strm = r),
                  (R = m.last_flush),
                  (m.last_flush = M),
                  m.status === w)
                )
                  if (m.wrap === 2)
                    (r.adler = 0),
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
                            (r.adler = n(r.adler, m.pending_buf, m.pending, 0)),
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
                          (m.status = x))
                  else {
                    var Z = (E + ((m.w_bits - 8) << 4)) << 8
                    ;(Z |=
                      (2 <= m.strategy || m.level < 2
                        ? 0
                        : m.level < 6
                        ? 1
                        : m.level === 6
                        ? 2
                        : 3) << 6),
                      m.strstart !== 0 && (Z |= 32),
                      (Z += 31 - (Z % 31)),
                      (m.status = x),
                      nt(m, Z),
                      m.strstart !== 0 &&
                        (nt(m, r.adler >>> 16), nt(m, 65535 & r.adler)),
                      (r.adler = 1)
                  }
                if (m.status === 69)
                  if (m.gzhead.extra) {
                    for (
                      u = m.pending;
                      m.gzindex < (65535 & m.gzhead.extra.length) &&
                      (m.pending !== m.pending_buf_size ||
                        (m.gzhead.hcrc &&
                          m.pending > u &&
                          (r.adler = n(
                            r.adler,
                            m.pending_buf,
                            m.pending - u,
                            u
                          )),
                        O(r),
                        (u = m.pending),
                        m.pending !== m.pending_buf_size));

                    )
                      st(m, 255 & m.gzhead.extra[m.gzindex]), m.gzindex++
                    m.gzhead.hcrc &&
                      m.pending > u &&
                      (r.adler = n(r.adler, m.pending_buf, m.pending - u, u)),
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
                          (r.adler = n(
                            r.adler,
                            m.pending_buf,
                            m.pending - u,
                            u
                          )),
                        O(r),
                        (u = m.pending),
                        m.pending === m.pending_buf_size)
                      ) {
                        T = 1
                        break
                      }
                      ;(T =
                        m.gzindex < m.gzhead.name.length
                          ? 255 & m.gzhead.name.charCodeAt(m.gzindex++)
                          : 0),
                        st(m, T)
                    } while (T !== 0)
                    m.gzhead.hcrc &&
                      m.pending > u &&
                      (r.adler = n(r.adler, m.pending_buf, m.pending - u, u)),
                      T === 0 && ((m.gzindex = 0), (m.status = 91))
                  } else m.status = 91
                if (m.status === 91)
                  if (m.gzhead.comment) {
                    u = m.pending
                    do {
                      if (
                        m.pending === m.pending_buf_size &&
                        (m.gzhead.hcrc &&
                          m.pending > u &&
                          (r.adler = n(
                            r.adler,
                            m.pending_buf,
                            m.pending - u,
                            u
                          )),
                        O(r),
                        (u = m.pending),
                        m.pending === m.pending_buf_size)
                      ) {
                        T = 1
                        break
                      }
                      ;(T =
                        m.gzindex < m.gzhead.comment.length
                          ? 255 & m.gzhead.comment.charCodeAt(m.gzindex++)
                          : 0),
                        st(m, T)
                    } while (T !== 0)
                    m.gzhead.hcrc &&
                      m.pending > u &&
                      (r.adler = n(r.adler, m.pending_buf, m.pending - u, u)),
                      T === 0 && (m.status = 103)
                  } else m.status = 103
                if (
                  (m.status === 103 &&
                    (m.gzhead.hcrc
                      ? (m.pending + 2 > m.pending_buf_size && O(r),
                        m.pending + 2 <= m.pending_buf_size &&
                          (st(m, 255 & r.adler),
                          st(m, (r.adler >> 8) & 255),
                          (r.adler = 0),
                          (m.status = x)))
                      : (m.status = x)),
                  m.pending !== 0)
                ) {
                  if ((O(r), r.avail_out === 0)) return (m.last_flush = -1), l
                } else if (r.avail_in === 0 && J(M) <= J(R) && M !== L)
                  return ut(r, -5)
                if (m.status === 666 && r.avail_in !== 0) return ut(r, -5)
                if (
                  r.avail_in !== 0 ||
                  m.lookahead !== 0 ||
                  (M !== y && m.status !== 666)
                ) {
                  var W =
                    m.strategy === 2
                      ? (function (D, V) {
                          for (var rt; ; ) {
                            if (
                              D.lookahead === 0 &&
                              (Ut(D), D.lookahead === 0)
                            ) {
                              if (V === y) return a
                              break
                            }
                            if (
                              ((D.match_length = 0),
                              (rt = o._tr_tally(D, 0, D.window[D.strstart])),
                              D.lookahead--,
                              D.strstart++,
                              rt && (F(D, !1), D.strm.avail_out === 0))
                            )
                              return a
                          }
                          return (
                            (D.insert = 0),
                            V === L
                              ? (F(D, !0), D.strm.avail_out === 0 ? ct : H)
                              : D.last_lit && (F(D, !1), D.strm.avail_out === 0)
                              ? a
                              : P
                          )
                        })(m, M)
                      : m.strategy === 3
                      ? (function (D, V) {
                          for (var rt, et, at, wt, pt = D.window; ; ) {
                            if (D.lookahead <= Q) {
                              if ((Ut(D), D.lookahead <= Q && V === y)) return a
                              if (D.lookahead === 0) break
                            }
                            if (
                              ((D.match_length = 0),
                              D.lookahead >= B &&
                                0 < D.strstart &&
                                (et = pt[(at = D.strstart - 1)]) === pt[++at] &&
                                et === pt[++at] &&
                                et === pt[++at])
                            ) {
                              wt = D.strstart + Q
                              do;
                              while (
                                et === pt[++at] &&
                                et === pt[++at] &&
                                et === pt[++at] &&
                                et === pt[++at] &&
                                et === pt[++at] &&
                                et === pt[++at] &&
                                et === pt[++at] &&
                                et === pt[++at] &&
                                at < wt
                              )
                              ;(D.match_length = Q - (wt - at)),
                                D.match_length > D.lookahead &&
                                  (D.match_length = D.lookahead)
                            }
                            if (
                              (D.match_length >= B
                                ? ((rt = o._tr_tally(D, 1, D.match_length - B)),
                                  (D.lookahead -= D.match_length),
                                  (D.strstart += D.match_length),
                                  (D.match_length = 0))
                                : ((rt = o._tr_tally(
                                    D,
                                    0,
                                    D.window[D.strstart]
                                  )),
                                  D.lookahead--,
                                  D.strstart++),
                              rt && (F(D, !1), D.strm.avail_out === 0))
                            )
                              return a
                          }
                          return (
                            (D.insert = 0),
                            V === L
                              ? (F(D, !0), D.strm.avail_out === 0 ? ct : H)
                              : D.last_lit && (F(D, !1), D.strm.avail_out === 0)
                              ? a
                              : P
                          )
                        })(m, M)
                      : d[m.level].func(m, M)
                  if (
                    ((W !== ct && W !== H) || (m.status = 666),
                    W === a || W === ct)
                  )
                    return r.avail_out === 0 && (m.last_flush = -1), l
                  if (
                    W === P &&
                    (M === 1
                      ? o._tr_align(m)
                      : M !== 5 &&
                        (o._tr_stored_block(m, 0, 0, !1),
                        M === 3 &&
                          ($(m.head),
                          m.lookahead === 0 &&
                            ((m.strstart = 0),
                            (m.block_start = 0),
                            (m.insert = 0)))),
                    O(r),
                    r.avail_out === 0)
                  )
                    return (m.last_flush = -1), l
                }
                return M !== L
                  ? l
                  : m.wrap <= 0
                  ? 1
                  : (m.wrap === 2
                      ? (st(m, 255 & r.adler),
                        st(m, (r.adler >> 8) & 255),
                        st(m, (r.adler >> 16) & 255),
                        st(m, (r.adler >> 24) & 255),
                        st(m, 255 & r.total_in),
                        st(m, (r.total_in >> 8) & 255),
                        st(m, (r.total_in >> 16) & 255),
                        st(m, (r.total_in >> 24) & 255))
                      : (nt(m, r.adler >>> 16), nt(m, 65535 & r.adler)),
                    O(r),
                    0 < m.wrap && (m.wrap = -m.wrap),
                    m.pending !== 0 ? l : 1)
              }),
              (v.deflateEnd = function (r) {
                var M
                return r && r.state
                  ? (M = r.state.status) !== w &&
                    M !== 69 &&
                    M !== 73 &&
                    M !== 91 &&
                    M !== 103 &&
                    M !== x &&
                    M !== 666
                    ? ut(r, g)
                    : ((r.state = null), M === x ? ut(r, -3) : l)
                  : g
              }),
              (v.deflateSetDictionary = function (r, M) {
                var R,
                  m,
                  u,
                  T,
                  Z,
                  W,
                  D,
                  V,
                  rt = M.length
                if (
                  !r ||
                  !r.state ||
                  (T = (R = r.state).wrap) === 2 ||
                  (T === 1 && R.status !== w) ||
                  R.lookahead
                )
                  return g
                for (
                  T === 1 && (r.adler = _(r.adler, M, rt, 0)),
                    R.wrap = 0,
                    rt >= R.w_size &&
                      (T === 0 &&
                        ($(R.head),
                        (R.strstart = 0),
                        (R.block_start = 0),
                        (R.insert = 0)),
                      (V = new h.Buf8(R.w_size)),
                      h.arraySet(V, M, rt - R.w_size, R.w_size, 0),
                      (M = V),
                      (rt = R.w_size)),
                    Z = r.avail_in,
                    W = r.next_in,
                    D = r.input,
                    r.avail_in = rt,
                    r.next_in = 0,
                    r.input = M,
                    Ut(R);
                  R.lookahead >= B;

                ) {
                  for (
                    m = R.strstart, u = R.lookahead - (B - 1);
                    (R.ins_h =
                      ((R.ins_h << R.hash_shift) ^ R.window[m + B - 1]) &
                      R.hash_mask),
                      (R.prev[m & R.w_mask] = R.head[R.ins_h]),
                      (R.head[R.ins_h] = m),
                      m++,
                      --u;

                  );
                  ;(R.strstart = m), (R.lookahead = B - 1), Ut(R)
                }
                return (
                  (R.strstart += R.lookahead),
                  (R.block_start = R.strstart),
                  (R.insert = R.lookahead),
                  (R.lookahead = 0),
                  (R.match_length = R.prev_length = B - 1),
                  (R.match_available = 0),
                  (r.next_in = W),
                  (r.input = D),
                  (r.avail_in = Z),
                  (R.wrap = T),
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
          function (N, C, v) {
            C.exports = function () {
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
          function (N, C, v) {
            C.exports = function (d, h) {
              var o,
                _,
                n,
                U,
                y,
                L,
                l,
                g,
                s,
                p,
                f,
                E,
                S,
                I,
                A,
                X,
                G,
                K,
                B,
                Q,
                ot,
                w,
                x,
                a,
                P
              ;(o = d.state),
                (_ = d.next_in),
                (a = d.input),
                (n = _ + (d.avail_in - 5)),
                (U = d.next_out),
                (P = d.output),
                (y = U - (h - d.avail_out)),
                (L = U + (d.avail_out - 257)),
                (l = o.dmax),
                (g = o.wsize),
                (s = o.whave),
                (p = o.wnext),
                (f = o.window),
                (E = o.hold),
                (S = o.bits),
                (I = o.lencode),
                (A = o.distcode),
                (X = (1 << o.lenbits) - 1),
                (G = (1 << o.distbits) - 1)
              t: do {
                S < 15 &&
                  ((E += a[_++] << S), (S += 8), (E += a[_++] << S), (S += 8)),
                  (K = I[E & X])
                e: for (;;) {
                  if (
                    ((E >>>= B = K >>> 24),
                    (S -= B),
                    (B = (K >>> 16) & 255) === 0)
                  )
                    P[U++] = 65535 & K
                  else {
                    if (!(16 & B)) {
                      if (!(64 & B)) {
                        K = I[(65535 & K) + (E & ((1 << B) - 1))]
                        continue e
                      }
                      if (32 & B) {
                        o.mode = 12
                        break t
                      }
                      ;(d.msg = 'invalid literal/length code'), (o.mode = 30)
                      break t
                    }
                    ;(Q = 65535 & K),
                      (B &= 15) &&
                        (S < B && ((E += a[_++] << S), (S += 8)),
                        (Q += E & ((1 << B) - 1)),
                        (E >>>= B),
                        (S -= B)),
                      S < 15 &&
                        ((E += a[_++] << S),
                        (S += 8),
                        (E += a[_++] << S),
                        (S += 8)),
                      (K = A[E & G])
                    r: for (;;) {
                      if (
                        ((E >>>= B = K >>> 24),
                        (S -= B),
                        !(16 & (B = (K >>> 16) & 255)))
                      ) {
                        if (!(64 & B)) {
                          K = A[(65535 & K) + (E & ((1 << B) - 1))]
                          continue r
                        }
                        ;(d.msg = 'invalid distance code'), (o.mode = 30)
                        break t
                      }
                      if (
                        ((ot = 65535 & K),
                        S < (B &= 15) &&
                          ((E += a[_++] << S),
                          (S += 8) < B && ((E += a[_++] << S), (S += 8))),
                        l < (ot += E & ((1 << B) - 1)))
                      ) {
                        ;(d.msg = 'invalid distance too far back'),
                          (o.mode = 30)
                        break t
                      }
                      if (((E >>>= B), (S -= B), (B = U - y) < ot)) {
                        if (s < (B = ot - B) && o.sane) {
                          ;(d.msg = 'invalid distance too far back'),
                            (o.mode = 30)
                          break t
                        }
                        if (((x = f), (w = 0) === p)) {
                          if (((w += g - B), B < Q)) {
                            for (Q -= B; (P[U++] = f[w++]), --B; );
                            ;(w = U - ot), (x = P)
                          }
                        } else if (p < B) {
                          if (((w += g + p - B), (B -= p) < Q)) {
                            for (Q -= B; (P[U++] = f[w++]), --B; );
                            if (((w = 0), p < Q)) {
                              for (Q -= B = p; (P[U++] = f[w++]), --B; );
                              ;(w = U - ot), (x = P)
                            }
                          }
                        } else if (((w += p - B), B < Q)) {
                          for (Q -= B; (P[U++] = f[w++]), --B; );
                          ;(w = U - ot), (x = P)
                        }
                        for (; 2 < Q; )
                          (P[U++] = x[w++]),
                            (P[U++] = x[w++]),
                            (P[U++] = x[w++]),
                            (Q -= 3)
                        Q && ((P[U++] = x[w++]), 1 < Q && (P[U++] = x[w++]))
                      } else {
                        for (
                          w = U - ot;
                          (P[U++] = P[w++]),
                            (P[U++] = P[w++]),
                            (P[U++] = P[w++]),
                            2 < (Q -= 3);

                        );
                        Q && ((P[U++] = P[w++]), 1 < Q && (P[U++] = P[w++]))
                      }
                      break
                    }
                  }
                  break
                }
              } while (_ < n && U < L)
              ;(_ -= Q = S >> 3),
                (E &= (1 << (S -= Q << 3)) - 1),
                (d.next_in = _),
                (d.next_out = U),
                (d.avail_in = _ < n ? n - _ + 5 : 5 - (_ - n)),
                (d.avail_out = U < L ? L - U + 257 : 257 - (U - L)),
                (o.hold = E),
                (o.bits = S)
            }
          },
          {}
        ],
        49: [
          function (N, C, v) {
            var d = N('../utils/common'),
              h = N('./adler32'),
              o = N('./crc32'),
              _ = N('./inffast'),
              n = N('./inftrees'),
              U = 1,
              y = 2,
              L = 0,
              l = -2,
              g = 1,
              s = 852,
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
                (this.lens = new d.Buf16(320)),
                (this.work = new d.Buf16(288)),
                (this.lendyn = null),
                (this.distdyn = null),
                (this.sane = 0),
                (this.back = 0),
                (this.was = 0)
            }
            function S(w) {
              var x
              return w && w.state
                ? ((x = w.state),
                  (w.total_in = w.total_out = x.total = 0),
                  (w.msg = ''),
                  x.wrap && (w.adler = 1 & x.wrap),
                  (x.mode = g),
                  (x.last = 0),
                  (x.havedict = 0),
                  (x.dmax = 32768),
                  (x.head = null),
                  (x.hold = 0),
                  (x.bits = 0),
                  (x.lencode = x.lendyn = new d.Buf32(s)),
                  (x.distcode = x.distdyn = new d.Buf32(p)),
                  (x.sane = 1),
                  (x.back = -1),
                  L)
                : l
            }
            function I(w) {
              var x
              return w && w.state
                ? (((x = w.state).wsize = 0),
                  (x.whave = 0),
                  (x.wnext = 0),
                  S(w))
                : l
            }
            function A(w, x) {
              var a, P
              return w && w.state
                ? ((P = w.state),
                  x < 0
                    ? ((a = 0), (x = -x))
                    : ((a = 1 + (x >> 4)), x < 48 && (x &= 15)),
                  x && (x < 8 || 15 < x)
                    ? l
                    : (P.window !== null && P.wbits !== x && (P.window = null),
                      (P.wrap = a),
                      (P.wbits = x),
                      I(w)))
                : l
            }
            function X(w, x) {
              var a, P
              return w
                ? ((P = new E()),
                  ((w.state = P).window = null),
                  (a = A(w, x)) !== L && (w.state = null),
                  a)
                : l
            }
            var G,
              K,
              B = !0
            function Q(w) {
              if (B) {
                var x
                for (
                  G = new d.Buf32(512), K = new d.Buf32(32), x = 0;
                  x < 144;

                )
                  w.lens[x++] = 8
                for (; x < 256; ) w.lens[x++] = 9
                for (; x < 280; ) w.lens[x++] = 7
                for (; x < 288; ) w.lens[x++] = 8
                for (
                  n(U, w.lens, 0, 288, G, 0, w.work, { bits: 9 }), x = 0;
                  x < 32;

                )
                  w.lens[x++] = 5
                n(y, w.lens, 0, 32, K, 0, w.work, { bits: 5 }), (B = !1)
              }
              ;(w.lencode = G),
                (w.lenbits = 9),
                (w.distcode = K),
                (w.distbits = 5)
            }
            function ot(w, x, a, P) {
              var ct,
                H = w.state
              return (
                H.window === null &&
                  ((H.wsize = 1 << H.wbits),
                  (H.wnext = 0),
                  (H.whave = 0),
                  (H.window = new d.Buf8(H.wsize))),
                P >= H.wsize
                  ? (d.arraySet(H.window, x, a - H.wsize, H.wsize, 0),
                    (H.wnext = 0),
                    (H.whave = H.wsize))
                  : (P < (ct = H.wsize - H.wnext) && (ct = P),
                    d.arraySet(H.window, x, a - P, ct, H.wnext),
                    (P -= ct)
                      ? (d.arraySet(H.window, x, a - P, P, 0),
                        (H.wnext = P),
                        (H.whave = H.wsize))
                      : ((H.wnext += ct),
                        H.wnext === H.wsize && (H.wnext = 0),
                        H.whave < H.wsize && (H.whave += ct))),
                0
              )
            }
            ;(v.inflateReset = I),
              (v.inflateReset2 = A),
              (v.inflateResetKeep = S),
              (v.inflateInit = function (w) {
                return X(w, 15)
              }),
              (v.inflateInit2 = X),
              (v.inflate = function (w, x) {
                var a,
                  P,
                  ct,
                  H,
                  ut,
                  J,
                  $,
                  O,
                  F,
                  st,
                  nt,
                  tt,
                  Ut,
                  kt,
                  Nt,
                  Et,
                  Lt,
                  vt,
                  It,
                  Dt,
                  r,
                  M,
                  R,
                  m,
                  u = 0,
                  T = new d.Buf8(4),
                  Z = [
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
                ;(a = w.state).mode === 12 && (a.mode = 13),
                  (ut = w.next_out),
                  (ct = w.output),
                  ($ = w.avail_out),
                  (H = w.next_in),
                  (P = w.input),
                  (J = w.avail_in),
                  (O = a.hold),
                  (F = a.bits),
                  (st = J),
                  (nt = $),
                  (M = L)
                t: for (;;)
                  switch (a.mode) {
                    case g:
                      if (a.wrap === 0) {
                        a.mode = 13
                        break
                      }
                      for (; F < 16; ) {
                        if (J === 0) break t
                        J--, (O += P[H++] << F), (F += 8)
                      }
                      if (2 & a.wrap && O === 35615) {
                        ;(T[(a.check = 0)] = 255 & O),
                          (T[1] = (O >>> 8) & 255),
                          (a.check = o(a.check, T, 2, 0)),
                          (F = O = 0),
                          (a.mode = 2)
                        break
                      }
                      if (
                        ((a.flags = 0),
                        a.head && (a.head.done = !1),
                        !(1 & a.wrap) || (((255 & O) << 8) + (O >> 8)) % 31)
                      ) {
                        ;(w.msg = 'incorrect header check'), (a.mode = 30)
                        break
                      }
                      if ((15 & O) != 8) {
                        ;(w.msg = 'unknown compression method'), (a.mode = 30)
                        break
                      }
                      if (
                        ((F -= 4), (r = 8 + (15 & (O >>>= 4))), a.wbits === 0)
                      )
                        a.wbits = r
                      else if (r > a.wbits) {
                        ;(w.msg = 'invalid window size'), (a.mode = 30)
                        break
                      }
                      ;(a.dmax = 1 << r),
                        (w.adler = a.check = 1),
                        (a.mode = 512 & O ? 10 : 12),
                        (F = O = 0)
                      break
                    case 2:
                      for (; F < 16; ) {
                        if (J === 0) break t
                        J--, (O += P[H++] << F), (F += 8)
                      }
                      if (((a.flags = O), (255 & a.flags) != 8)) {
                        ;(w.msg = 'unknown compression method'), (a.mode = 30)
                        break
                      }
                      if (57344 & a.flags) {
                        ;(w.msg = 'unknown header flags set'), (a.mode = 30)
                        break
                      }
                      a.head && (a.head.text = (O >> 8) & 1),
                        512 & a.flags &&
                          ((T[0] = 255 & O),
                          (T[1] = (O >>> 8) & 255),
                          (a.check = o(a.check, T, 2, 0))),
                        (F = O = 0),
                        (a.mode = 3)
                    case 3:
                      for (; F < 32; ) {
                        if (J === 0) break t
                        J--, (O += P[H++] << F), (F += 8)
                      }
                      a.head && (a.head.time = O),
                        512 & a.flags &&
                          ((T[0] = 255 & O),
                          (T[1] = (O >>> 8) & 255),
                          (T[2] = (O >>> 16) & 255),
                          (T[3] = (O >>> 24) & 255),
                          (a.check = o(a.check, T, 4, 0))),
                        (F = O = 0),
                        (a.mode = 4)
                    case 4:
                      for (; F < 16; ) {
                        if (J === 0) break t
                        J--, (O += P[H++] << F), (F += 8)
                      }
                      a.head &&
                        ((a.head.xflags = 255 & O), (a.head.os = O >> 8)),
                        512 & a.flags &&
                          ((T[0] = 255 & O),
                          (T[1] = (O >>> 8) & 255),
                          (a.check = o(a.check, T, 2, 0))),
                        (F = O = 0),
                        (a.mode = 5)
                    case 5:
                      if (1024 & a.flags) {
                        for (; F < 16; ) {
                          if (J === 0) break t
                          J--, (O += P[H++] << F), (F += 8)
                        }
                        ;(a.length = O),
                          a.head && (a.head.extra_len = O),
                          512 & a.flags &&
                            ((T[0] = 255 & O),
                            (T[1] = (O >>> 8) & 255),
                            (a.check = o(a.check, T, 2, 0))),
                          (F = O = 0)
                      } else a.head && (a.head.extra = null)
                      a.mode = 6
                    case 6:
                      if (
                        1024 & a.flags &&
                        (J < (tt = a.length) && (tt = J),
                        tt &&
                          (a.head &&
                            ((r = a.head.extra_len - a.length),
                            a.head.extra ||
                              (a.head.extra = new Array(a.head.extra_len)),
                            d.arraySet(a.head.extra, P, H, tt, r)),
                          512 & a.flags && (a.check = o(a.check, P, tt, H)),
                          (J -= tt),
                          (H += tt),
                          (a.length -= tt)),
                        a.length)
                      )
                        break t
                      ;(a.length = 0), (a.mode = 7)
                    case 7:
                      if (2048 & a.flags) {
                        if (J === 0) break t
                        for (
                          tt = 0;
                          (r = P[H + tt++]),
                            a.head &&
                              r &&
                              a.length < 65536 &&
                              (a.head.name += String.fromCharCode(r)),
                            r && tt < J;

                        );
                        if (
                          (512 & a.flags && (a.check = o(a.check, P, tt, H)),
                          (J -= tt),
                          (H += tt),
                          r)
                        )
                          break t
                      } else a.head && (a.head.name = null)
                      ;(a.length = 0), (a.mode = 8)
                    case 8:
                      if (4096 & a.flags) {
                        if (J === 0) break t
                        for (
                          tt = 0;
                          (r = P[H + tt++]),
                            a.head &&
                              r &&
                              a.length < 65536 &&
                              (a.head.comment += String.fromCharCode(r)),
                            r && tt < J;

                        );
                        if (
                          (512 & a.flags && (a.check = o(a.check, P, tt, H)),
                          (J -= tt),
                          (H += tt),
                          r)
                        )
                          break t
                      } else a.head && (a.head.comment = null)
                      a.mode = 9
                    case 9:
                      if (512 & a.flags) {
                        for (; F < 16; ) {
                          if (J === 0) break t
                          J--, (O += P[H++] << F), (F += 8)
                        }
                        if (O !== (65535 & a.check)) {
                          ;(w.msg = 'header crc mismatch'), (a.mode = 30)
                          break
                        }
                        F = O = 0
                      }
                      a.head &&
                        ((a.head.hcrc = (a.flags >> 9) & 1),
                        (a.head.done = !0)),
                        (w.adler = a.check = 0),
                        (a.mode = 12)
                      break
                    case 10:
                      for (; F < 32; ) {
                        if (J === 0) break t
                        J--, (O += P[H++] << F), (F += 8)
                      }
                      ;(w.adler = a.check = f(O)), (F = O = 0), (a.mode = 11)
                    case 11:
                      if (a.havedict === 0)
                        return (
                          (w.next_out = ut),
                          (w.avail_out = $),
                          (w.next_in = H),
                          (w.avail_in = J),
                          (a.hold = O),
                          (a.bits = F),
                          2
                        )
                      ;(w.adler = a.check = 1), (a.mode = 12)
                    case 12:
                      if (x === 5 || x === 6) break t
                    case 13:
                      if (a.last) {
                        ;(O >>>= 7 & F), (F -= 7 & F), (a.mode = 27)
                        break
                      }
                      for (; F < 3; ) {
                        if (J === 0) break t
                        J--, (O += P[H++] << F), (F += 8)
                      }
                      switch (((a.last = 1 & O), (F -= 1), 3 & (O >>>= 1))) {
                        case 0:
                          a.mode = 14
                          break
                        case 1:
                          if ((Q(a), (a.mode = 20), x !== 6)) break
                          ;(O >>>= 2), (F -= 2)
                          break t
                        case 2:
                          a.mode = 17
                          break
                        case 3:
                          ;(w.msg = 'invalid block type'), (a.mode = 30)
                      }
                      ;(O >>>= 2), (F -= 2)
                      break
                    case 14:
                      for (O >>>= 7 & F, F -= 7 & F; F < 32; ) {
                        if (J === 0) break t
                        J--, (O += P[H++] << F), (F += 8)
                      }
                      if ((65535 & O) != ((O >>> 16) ^ 65535)) {
                        ;(w.msg = 'invalid stored block lengths'), (a.mode = 30)
                        break
                      }
                      if (
                        ((a.length = 65535 & O),
                        (F = O = 0),
                        (a.mode = 15),
                        x === 6)
                      )
                        break t
                    case 15:
                      a.mode = 16
                    case 16:
                      if ((tt = a.length)) {
                        if ((J < tt && (tt = J), $ < tt && (tt = $), tt === 0))
                          break t
                        d.arraySet(ct, P, H, tt, ut),
                          (J -= tt),
                          (H += tt),
                          ($ -= tt),
                          (ut += tt),
                          (a.length -= tt)
                        break
                      }
                      a.mode = 12
                      break
                    case 17:
                      for (; F < 14; ) {
                        if (J === 0) break t
                        J--, (O += P[H++] << F), (F += 8)
                      }
                      if (
                        ((a.nlen = 257 + (31 & O)),
                        (O >>>= 5),
                        (F -= 5),
                        (a.ndist = 1 + (31 & O)),
                        (O >>>= 5),
                        (F -= 5),
                        (a.ncode = 4 + (15 & O)),
                        (O >>>= 4),
                        (F -= 4),
                        286 < a.nlen || 30 < a.ndist)
                      ) {
                        ;(w.msg = 'too many length or distance symbols'),
                          (a.mode = 30)
                        break
                      }
                      ;(a.have = 0), (a.mode = 18)
                    case 18:
                      for (; a.have < a.ncode; ) {
                        for (; F < 3; ) {
                          if (J === 0) break t
                          J--, (O += P[H++] << F), (F += 8)
                        }
                        ;(a.lens[Z[a.have++]] = 7 & O), (O >>>= 3), (F -= 3)
                      }
                      for (; a.have < 19; ) a.lens[Z[a.have++]] = 0
                      if (
                        ((a.lencode = a.lendyn),
                        (a.lenbits = 7),
                        (R = { bits: a.lenbits }),
                        (M = n(0, a.lens, 0, 19, a.lencode, 0, a.work, R)),
                        (a.lenbits = R.bits),
                        M)
                      ) {
                        ;(w.msg = 'invalid code lengths set'), (a.mode = 30)
                        break
                      }
                      ;(a.have = 0), (a.mode = 19)
                    case 19:
                      for (; a.have < a.nlen + a.ndist; ) {
                        for (
                          ;
                          (Et =
                            ((u = a.lencode[O & ((1 << a.lenbits) - 1)]) >>>
                              16) &
                            255),
                            (Lt = 65535 & u),
                            !((Nt = u >>> 24) <= F);

                        ) {
                          if (J === 0) break t
                          J--, (O += P[H++] << F), (F += 8)
                        }
                        if (Lt < 16)
                          (O >>>= Nt), (F -= Nt), (a.lens[a.have++] = Lt)
                        else {
                          if (Lt === 16) {
                            for (m = Nt + 2; F < m; ) {
                              if (J === 0) break t
                              J--, (O += P[H++] << F), (F += 8)
                            }
                            if (((O >>>= Nt), (F -= Nt), a.have === 0)) {
                              ;(w.msg = 'invalid bit length repeat'),
                                (a.mode = 30)
                              break
                            }
                            ;(r = a.lens[a.have - 1]),
                              (tt = 3 + (3 & O)),
                              (O >>>= 2),
                              (F -= 2)
                          } else if (Lt === 17) {
                            for (m = Nt + 3; F < m; ) {
                              if (J === 0) break t
                              J--, (O += P[H++] << F), (F += 8)
                            }
                            ;(F -= Nt),
                              (r = 0),
                              (tt = 3 + (7 & (O >>>= Nt))),
                              (O >>>= 3),
                              (F -= 3)
                          } else {
                            for (m = Nt + 7; F < m; ) {
                              if (J === 0) break t
                              J--, (O += P[H++] << F), (F += 8)
                            }
                            ;(F -= Nt),
                              (r = 0),
                              (tt = 11 + (127 & (O >>>= Nt))),
                              (O >>>= 7),
                              (F -= 7)
                          }
                          if (a.have + tt > a.nlen + a.ndist) {
                            ;(w.msg = 'invalid bit length repeat'),
                              (a.mode = 30)
                            break
                          }
                          for (; tt--; ) a.lens[a.have++] = r
                        }
                      }
                      if (a.mode === 30) break
                      if (a.lens[256] === 0) {
                        ;(w.msg = 'invalid code -- missing end-of-block'),
                          (a.mode = 30)
                        break
                      }
                      if (
                        ((a.lenbits = 9),
                        (R = { bits: a.lenbits }),
                        (M = n(U, a.lens, 0, a.nlen, a.lencode, 0, a.work, R)),
                        (a.lenbits = R.bits),
                        M)
                      ) {
                        ;(w.msg = 'invalid literal/lengths set'), (a.mode = 30)
                        break
                      }
                      if (
                        ((a.distbits = 6),
                        (a.distcode = a.distdyn),
                        (R = { bits: a.distbits }),
                        (M = n(
                          y,
                          a.lens,
                          a.nlen,
                          a.ndist,
                          a.distcode,
                          0,
                          a.work,
                          R
                        )),
                        (a.distbits = R.bits),
                        M)
                      ) {
                        ;(w.msg = 'invalid distances set'), (a.mode = 30)
                        break
                      }
                      if (((a.mode = 20), x === 6)) break t
                    case 20:
                      a.mode = 21
                    case 21:
                      if (6 <= J && 258 <= $) {
                        ;(w.next_out = ut),
                          (w.avail_out = $),
                          (w.next_in = H),
                          (w.avail_in = J),
                          (a.hold = O),
                          (a.bits = F),
                          _(w, nt),
                          (ut = w.next_out),
                          (ct = w.output),
                          ($ = w.avail_out),
                          (H = w.next_in),
                          (P = w.input),
                          (J = w.avail_in),
                          (O = a.hold),
                          (F = a.bits),
                          a.mode === 12 && (a.back = -1)
                        break
                      }
                      for (
                        a.back = 0;
                        (Et =
                          ((u = a.lencode[O & ((1 << a.lenbits) - 1)]) >>> 16) &
                          255),
                          (Lt = 65535 & u),
                          !((Nt = u >>> 24) <= F);

                      ) {
                        if (J === 0) break t
                        J--, (O += P[H++] << F), (F += 8)
                      }
                      if (Et && !(240 & Et)) {
                        for (
                          vt = Nt, It = Et, Dt = Lt;
                          (Et =
                            ((u =
                              a.lencode[
                                Dt + ((O & ((1 << (vt + It)) - 1)) >> vt)
                              ]) >>>
                              16) &
                            255),
                            (Lt = 65535 & u),
                            !(vt + (Nt = u >>> 24) <= F);

                        ) {
                          if (J === 0) break t
                          J--, (O += P[H++] << F), (F += 8)
                        }
                        ;(O >>>= vt), (F -= vt), (a.back += vt)
                      }
                      if (
                        ((O >>>= Nt),
                        (F -= Nt),
                        (a.back += Nt),
                        (a.length = Lt),
                        Et === 0)
                      ) {
                        a.mode = 26
                        break
                      }
                      if (32 & Et) {
                        ;(a.back = -1), (a.mode = 12)
                        break
                      }
                      if (64 & Et) {
                        ;(w.msg = 'invalid literal/length code'), (a.mode = 30)
                        break
                      }
                      ;(a.extra = 15 & Et), (a.mode = 22)
                    case 22:
                      if (a.extra) {
                        for (m = a.extra; F < m; ) {
                          if (J === 0) break t
                          J--, (O += P[H++] << F), (F += 8)
                        }
                        ;(a.length += O & ((1 << a.extra) - 1)),
                          (O >>>= a.extra),
                          (F -= a.extra),
                          (a.back += a.extra)
                      }
                      ;(a.was = a.length), (a.mode = 23)
                    case 23:
                      for (
                        ;
                        (Et =
                          ((u = a.distcode[O & ((1 << a.distbits) - 1)]) >>>
                            16) &
                          255),
                          (Lt = 65535 & u),
                          !((Nt = u >>> 24) <= F);

                      ) {
                        if (J === 0) break t
                        J--, (O += P[H++] << F), (F += 8)
                      }
                      if (!(240 & Et)) {
                        for (
                          vt = Nt, It = Et, Dt = Lt;
                          (Et =
                            ((u =
                              a.distcode[
                                Dt + ((O & ((1 << (vt + It)) - 1)) >> vt)
                              ]) >>>
                              16) &
                            255),
                            (Lt = 65535 & u),
                            !(vt + (Nt = u >>> 24) <= F);

                        ) {
                          if (J === 0) break t
                          J--, (O += P[H++] << F), (F += 8)
                        }
                        ;(O >>>= vt), (F -= vt), (a.back += vt)
                      }
                      if (((O >>>= Nt), (F -= Nt), (a.back += Nt), 64 & Et)) {
                        ;(w.msg = 'invalid distance code'), (a.mode = 30)
                        break
                      }
                      ;(a.offset = Lt), (a.extra = 15 & Et), (a.mode = 24)
                    case 24:
                      if (a.extra) {
                        for (m = a.extra; F < m; ) {
                          if (J === 0) break t
                          J--, (O += P[H++] << F), (F += 8)
                        }
                        ;(a.offset += O & ((1 << a.extra) - 1)),
                          (O >>>= a.extra),
                          (F -= a.extra),
                          (a.back += a.extra)
                      }
                      if (a.offset > a.dmax) {
                        ;(w.msg = 'invalid distance too far back'),
                          (a.mode = 30)
                        break
                      }
                      a.mode = 25
                    case 25:
                      if ($ === 0) break t
                      if (((tt = nt - $), a.offset > tt)) {
                        if ((tt = a.offset - tt) > a.whave && a.sane) {
                          ;(w.msg = 'invalid distance too far back'),
                            (a.mode = 30)
                          break
                        }
                        ;(Ut =
                          tt > a.wnext
                            ? ((tt -= a.wnext), a.wsize - tt)
                            : a.wnext - tt),
                          tt > a.length && (tt = a.length),
                          (kt = a.window)
                      } else (kt = ct), (Ut = ut - a.offset), (tt = a.length)
                      for (
                        $ < tt && (tt = $), $ -= tt, a.length -= tt;
                        (ct[ut++] = kt[Ut++]), --tt;

                      );
                      a.length === 0 && (a.mode = 21)
                      break
                    case 26:
                      if ($ === 0) break t
                      ;(ct[ut++] = a.length), $--, (a.mode = 21)
                      break
                    case 27:
                      if (a.wrap) {
                        for (; F < 32; ) {
                          if (J === 0) break t
                          J--, (O |= P[H++] << F), (F += 8)
                        }
                        if (
                          ((nt -= $),
                          (w.total_out += nt),
                          (a.total += nt),
                          nt &&
                            (w.adler = a.check =
                              a.flags
                                ? o(a.check, ct, nt, ut - nt)
                                : h(a.check, ct, nt, ut - nt)),
                          (nt = $),
                          (a.flags ? O : f(O)) !== a.check)
                        ) {
                          ;(w.msg = 'incorrect data check'), (a.mode = 30)
                          break
                        }
                        F = O = 0
                      }
                      a.mode = 28
                    case 28:
                      if (a.wrap && a.flags) {
                        for (; F < 32; ) {
                          if (J === 0) break t
                          J--, (O += P[H++] << F), (F += 8)
                        }
                        if (O !== (4294967295 & a.total)) {
                          ;(w.msg = 'incorrect length check'), (a.mode = 30)
                          break
                        }
                        F = O = 0
                      }
                      a.mode = 29
                    case 29:
                      M = 1
                      break t
                    case 30:
                      M = -3
                      break t
                    case 31:
                      return -4
                    case 32:
                    default:
                      return l
                  }
                return (
                  (w.next_out = ut),
                  (w.avail_out = $),
                  (w.next_in = H),
                  (w.avail_in = J),
                  (a.hold = O),
                  (a.bits = F),
                  (a.wsize ||
                    (nt !== w.avail_out &&
                      a.mode < 30 &&
                      (a.mode < 27 || x !== 4))) &&
                  ot(w, w.output, w.next_out, nt - w.avail_out)
                    ? ((a.mode = 31), -4)
                    : ((st -= w.avail_in),
                      (nt -= w.avail_out),
                      (w.total_in += st),
                      (w.total_out += nt),
                      (a.total += nt),
                      a.wrap &&
                        nt &&
                        (w.adler = a.check =
                          a.flags
                            ? o(a.check, ct, nt, w.next_out - nt)
                            : h(a.check, ct, nt, w.next_out - nt)),
                      (w.data_type =
                        a.bits +
                        (a.last ? 64 : 0) +
                        (a.mode === 12 ? 128 : 0) +
                        (a.mode === 20 || a.mode === 15 ? 256 : 0)),
                      ((st == 0 && nt === 0) || x === 4) && M === L && (M = -5),
                      M)
                )
              }),
              (v.inflateEnd = function (w) {
                if (!w || !w.state) return l
                var x = w.state
                return x.window && (x.window = null), (w.state = null), L
              }),
              (v.inflateGetHeader = function (w, x) {
                var a
                return w && w.state && 2 & (a = w.state).wrap
                  ? (((a.head = x).done = !1), L)
                  : l
              }),
              (v.inflateSetDictionary = function (w, x) {
                var a,
                  P = x.length
                return w && w.state
                  ? (a = w.state).wrap !== 0 && a.mode !== 11
                    ? l
                    : a.mode === 11 && h(1, x, P, 0) !== a.check
                    ? -3
                    : ot(w, x, P, P)
                    ? ((a.mode = 31), -4)
                    : ((a.havedict = 1), L)
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
          function (N, C, v) {
            var d = N('../utils/common'),
              h = [
                3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43,
                51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
              ],
              o = [
                16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
                19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
              ],
              _ = [
                1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257,
                385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289,
                16385, 24577, 0, 0
              ],
              n = [
                16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
                23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64
              ]
            C.exports = function (U, y, L, l, g, s, p, f) {
              var E,
                S,
                I,
                A,
                X,
                G,
                K,
                B,
                Q,
                ot = f.bits,
                w = 0,
                x = 0,
                a = 0,
                P = 0,
                ct = 0,
                H = 0,
                ut = 0,
                J = 0,
                $ = 0,
                O = 0,
                F = null,
                st = 0,
                nt = new d.Buf16(16),
                tt = new d.Buf16(16),
                Ut = null,
                kt = 0
              for (w = 0; w <= 15; w++) nt[w] = 0
              for (x = 0; x < l; x++) nt[y[L + x]]++
              for (ct = ot, P = 15; 1 <= P && nt[P] === 0; P--);
              if ((P < ct && (ct = P), P === 0))
                return (g[s++] = 20971520), (g[s++] = 20971520), (f.bits = 1), 0
              for (a = 1; a < P && nt[a] === 0; a++);
              for (ct < a && (ct = a), w = J = 1; w <= 15; w++)
                if (((J <<= 1), (J -= nt[w]) < 0)) return -1
              if (0 < J && (U === 0 || P !== 1)) return -1
              for (tt[1] = 0, w = 1; w < 15; w++) tt[w + 1] = tt[w] + nt[w]
              for (x = 0; x < l; x++) y[L + x] !== 0 && (p[tt[y[L + x]]++] = x)
              if (
                ((G =
                  U === 0
                    ? ((F = Ut = p), 19)
                    : U === 1
                    ? ((F = h), (st -= 257), (Ut = o), (kt -= 257), 256)
                    : ((F = _), (Ut = n), -1)),
                (w = a),
                (X = s),
                (ut = x = O = 0),
                (I = -1),
                (A = ($ = 1 << (H = ct)) - 1),
                (U === 1 && 852 < $) || (U === 2 && 592 < $))
              )
                return 1
              for (;;) {
                for (
                  K = w - ut,
                    Q =
                      p[x] < G
                        ? ((B = 0), p[x])
                        : p[x] > G
                        ? ((B = Ut[kt + p[x]]), F[st + p[x]])
                        : ((B = 96), 0),
                    E = 1 << (w - ut),
                    a = S = 1 << H;
                  (g[X + (O >> ut) + (S -= E)] = (K << 24) | (B << 16) | Q | 0),
                    S !== 0;

                );
                for (E = 1 << (w - 1); O & E; ) E >>= 1
                if (
                  (E !== 0 ? ((O &= E - 1), (O += E)) : (O = 0),
                  x++,
                  --nt[w] == 0)
                ) {
                  if (w === P) break
                  w = y[L + p[x]]
                }
                if (ct < w && (O & A) !== I) {
                  for (
                    ut === 0 && (ut = ct), X += a, J = 1 << (H = w - ut);
                    H + ut < P && !((J -= nt[H + ut]) <= 0);

                  )
                    H++, (J <<= 1)
                  if (
                    (($ += 1 << H),
                    (U === 1 && 852 < $) || (U === 2 && 592 < $))
                  )
                    return 1
                  g[(I = O & A)] = (ct << 24) | (H << 16) | (X - s) | 0
                }
              }
              return (
                O !== 0 && (g[X + O] = ((w - ut) << 24) | (64 << 16) | 0),
                (f.bits = ct),
                0
              )
            }
          },
          { '../utils/common': 41 }
        ],
        51: [
          function (N, C, v) {
            C.exports = {
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
          function (N, C, v) {
            var d = N('../utils/common'),
              h = 0,
              o = 1
            function _(u) {
              for (var T = u.length; 0 <= --T; ) u[T] = 0
            }
            var n = 0,
              U = 29,
              y = 256,
              L = y + 1 + U,
              l = 30,
              g = 19,
              s = 2 * L + 1,
              p = 15,
              f = 16,
              E = 7,
              S = 256,
              I = 16,
              A = 17,
              X = 18,
              G = [
                0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4,
                4, 4, 4, 5, 5, 5, 5, 0
              ],
              K = [
                0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9,
                9, 10, 10, 11, 11, 12, 12, 13, 13
              ],
              B = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
              Q = [
                16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15
              ],
              ot = new Array(2 * (L + 2))
            _(ot)
            var w = new Array(2 * l)
            _(w)
            var x = new Array(512)
            _(x)
            var a = new Array(256)
            _(a)
            var P = new Array(U)
            _(P)
            var ct,
              H,
              ut,
              J = new Array(l)
            function $(u, T, Z, W, D) {
              ;(this.static_tree = u),
                (this.extra_bits = T),
                (this.extra_base = Z),
                (this.elems = W),
                (this.max_length = D),
                (this.has_stree = u && u.length)
            }
            function O(u, T) {
              ;(this.dyn_tree = u), (this.max_code = 0), (this.stat_desc = T)
            }
            function F(u) {
              return u < 256 ? x[u] : x[256 + (u >>> 7)]
            }
            function st(u, T) {
              ;(u.pending_buf[u.pending++] = 255 & T),
                (u.pending_buf[u.pending++] = (T >>> 8) & 255)
            }
            function nt(u, T, Z) {
              u.bi_valid > f - Z
                ? ((u.bi_buf |= (T << u.bi_valid) & 65535),
                  st(u, u.bi_buf),
                  (u.bi_buf = T >> (f - u.bi_valid)),
                  (u.bi_valid += Z - f))
                : ((u.bi_buf |= (T << u.bi_valid) & 65535), (u.bi_valid += Z))
            }
            function tt(u, T, Z) {
              nt(u, Z[2 * T], Z[2 * T + 1])
            }
            function Ut(u, T) {
              for (var Z = 0; (Z |= 1 & u), (u >>>= 1), (Z <<= 1), 0 < --T; );
              return Z >>> 1
            }
            function kt(u, T, Z) {
              var W,
                D,
                V = new Array(p + 1),
                rt = 0
              for (W = 1; W <= p; W++) V[W] = rt = (rt + Z[W - 1]) << 1
              for (D = 0; D <= T; D++) {
                var et = u[2 * D + 1]
                et !== 0 && (u[2 * D] = Ut(V[et]++, et))
              }
            }
            function Nt(u) {
              var T
              for (T = 0; T < L; T++) u.dyn_ltree[2 * T] = 0
              for (T = 0; T < l; T++) u.dyn_dtree[2 * T] = 0
              for (T = 0; T < g; T++) u.bl_tree[2 * T] = 0
              ;(u.dyn_ltree[2 * S] = 1),
                (u.opt_len = u.static_len = 0),
                (u.last_lit = u.matches = 0)
            }
            function Et(u) {
              8 < u.bi_valid
                ? st(u, u.bi_buf)
                : 0 < u.bi_valid && (u.pending_buf[u.pending++] = u.bi_buf),
                (u.bi_buf = 0),
                (u.bi_valid = 0)
            }
            function Lt(u, T, Z, W) {
              var D = 2 * T,
                V = 2 * Z
              return u[D] < u[V] || (u[D] === u[V] && W[T] <= W[Z])
            }
            function vt(u, T, Z) {
              for (
                var W = u.heap[Z], D = Z << 1;
                D <= u.heap_len &&
                (D < u.heap_len &&
                  Lt(T, u.heap[D + 1], u.heap[D], u.depth) &&
                  D++,
                !Lt(T, W, u.heap[D], u.depth));

              )
                (u.heap[Z] = u.heap[D]), (Z = D), (D <<= 1)
              u.heap[Z] = W
            }
            function It(u, T, Z) {
              var W,
                D,
                V,
                rt,
                et = 0
              if (u.last_lit !== 0)
                for (
                  ;
                  (W =
                    (u.pending_buf[u.d_buf + 2 * et] << 8) |
                    u.pending_buf[u.d_buf + 2 * et + 1]),
                    (D = u.pending_buf[u.l_buf + et]),
                    et++,
                    W === 0
                      ? tt(u, D, T)
                      : (tt(u, (V = a[D]) + y + 1, T),
                        (rt = G[V]) !== 0 && nt(u, (D -= P[V]), rt),
                        tt(u, (V = F(--W)), Z),
                        (rt = K[V]) !== 0 && nt(u, (W -= J[V]), rt)),
                    et < u.last_lit;

                );
              tt(u, S, T)
            }
            function Dt(u, T) {
              var Z,
                W,
                D,
                V = T.dyn_tree,
                rt = T.stat_desc.static_tree,
                et = T.stat_desc.has_stree,
                at = T.stat_desc.elems,
                wt = -1
              for (u.heap_len = 0, u.heap_max = s, Z = 0; Z < at; Z++)
                V[2 * Z] !== 0
                  ? ((u.heap[++u.heap_len] = wt = Z), (u.depth[Z] = 0))
                  : (V[2 * Z + 1] = 0)
              for (; u.heap_len < 2; )
                (V[2 * (D = u.heap[++u.heap_len] = wt < 2 ? ++wt : 0)] = 1),
                  (u.depth[D] = 0),
                  u.opt_len--,
                  et && (u.static_len -= rt[2 * D + 1])
              for (T.max_code = wt, Z = u.heap_len >> 1; 1 <= Z; Z--)
                vt(u, V, Z)
              for (
                D = at;
                (Z = u.heap[1]),
                  (u.heap[1] = u.heap[u.heap_len--]),
                  vt(u, V, 1),
                  (W = u.heap[1]),
                  (u.heap[--u.heap_max] = Z),
                  (u.heap[--u.heap_max] = W),
                  (V[2 * D] = V[2 * Z] + V[2 * W]),
                  (u.depth[D] =
                    (u.depth[Z] >= u.depth[W] ? u.depth[Z] : u.depth[W]) + 1),
                  (V[2 * Z + 1] = V[2 * W + 1] = D),
                  (u.heap[1] = D++),
                  vt(u, V, 1),
                  2 <= u.heap_len;

              );
              ;(u.heap[--u.heap_max] = u.heap[1]),
                (function (pt, Ot) {
                  var Wt,
                    xt,
                    Kt,
                    St,
                    Qt,
                    ft,
                    Rt = Ot.dyn_tree,
                    re = Ot.max_code,
                    jt = Ot.stat_desc.static_tree,
                    Ae = Ot.stat_desc.has_stree,
                    Mt = Ot.stat_desc.extra_bits,
                    ne = Ot.stat_desc.extra_base,
                    j = Ot.stat_desc.max_length,
                    Xt = 0
                  for (St = 0; St <= p; St++) pt.bl_count[St] = 0
                  for (
                    Rt[2 * pt.heap[pt.heap_max] + 1] = 0, Wt = pt.heap_max + 1;
                    Wt < s;
                    Wt++
                  )
                    j < (St = Rt[2 * Rt[2 * (xt = pt.heap[Wt]) + 1] + 1] + 1) &&
                      ((St = j), Xt++),
                      (Rt[2 * xt + 1] = St),
                      re < xt ||
                        (pt.bl_count[St]++,
                        (Qt = 0),
                        ne <= xt && (Qt = Mt[xt - ne]),
                        (ft = Rt[2 * xt]),
                        (pt.opt_len += ft * (St + Qt)),
                        Ae && (pt.static_len += ft * (jt[2 * xt + 1] + Qt)))
                  if (Xt !== 0) {
                    do {
                      for (St = j - 1; pt.bl_count[St] === 0; ) St--
                      pt.bl_count[St]--,
                        (pt.bl_count[St + 1] += 2),
                        pt.bl_count[j]--,
                        (Xt -= 2)
                    } while (0 < Xt)
                    for (St = j; St !== 0; St--)
                      for (xt = pt.bl_count[St]; xt !== 0; )
                        re < (Kt = pt.heap[--Wt]) ||
                          (Rt[2 * Kt + 1] !== St &&
                            ((pt.opt_len += (St - Rt[2 * Kt + 1]) * Rt[2 * Kt]),
                            (Rt[2 * Kt + 1] = St)),
                          xt--)
                  }
                })(u, T),
                kt(V, wt, u.bl_count)
            }
            function r(u, T, Z) {
              var W,
                D,
                V = -1,
                rt = T[1],
                et = 0,
                at = 7,
                wt = 4
              for (
                rt === 0 && ((at = 138), (wt = 3)),
                  T[2 * (Z + 1) + 1] = 65535,
                  W = 0;
                W <= Z;
                W++
              )
                (D = rt),
                  (rt = T[2 * (W + 1) + 1]),
                  (++et < at && D === rt) ||
                    (et < wt
                      ? (u.bl_tree[2 * D] += et)
                      : D !== 0
                      ? (D !== V && u.bl_tree[2 * D]++, u.bl_tree[2 * I]++)
                      : et <= 10
                      ? u.bl_tree[2 * A]++
                      : u.bl_tree[2 * X]++,
                    (V = D),
                    (wt =
                      (et = 0) === rt
                        ? ((at = 138), 3)
                        : D === rt
                        ? ((at = 6), 3)
                        : ((at = 7), 4)))
            }
            function M(u, T, Z) {
              var W,
                D,
                V = -1,
                rt = T[1],
                et = 0,
                at = 7,
                wt = 4
              for (rt === 0 && ((at = 138), (wt = 3)), W = 0; W <= Z; W++)
                if (
                  ((D = rt),
                  (rt = T[2 * (W + 1) + 1]),
                  !(++et < at && D === rt))
                ) {
                  if (et < wt) for (; tt(u, D, u.bl_tree), --et != 0; );
                  else
                    D !== 0
                      ? (D !== V && (tt(u, D, u.bl_tree), et--),
                        tt(u, I, u.bl_tree),
                        nt(u, et - 3, 2))
                      : et <= 10
                      ? (tt(u, A, u.bl_tree), nt(u, et - 3, 3))
                      : (tt(u, X, u.bl_tree), nt(u, et - 11, 7))
                  ;(V = D),
                    (wt =
                      (et = 0) === rt
                        ? ((at = 138), 3)
                        : D === rt
                        ? ((at = 6), 3)
                        : ((at = 7), 4))
                }
            }
            _(J)
            var R = !1
            function m(u, T, Z, W) {
              nt(u, (n << 1) + (W ? 1 : 0), 3),
                (function (D, V, rt, et) {
                  Et(D),
                    et && (st(D, rt), st(D, ~rt)),
                    d.arraySet(D.pending_buf, D.window, V, rt, D.pending),
                    (D.pending += rt)
                })(u, T, Z, !0)
            }
            ;(v._tr_init = function (u) {
              R ||
                ((function () {
                  var T,
                    Z,
                    W,
                    D,
                    V,
                    rt = new Array(p + 1)
                  for (D = W = 0; D < U - 1; D++)
                    for (P[D] = W, T = 0; T < 1 << G[D]; T++) a[W++] = D
                  for (a[W - 1] = D, D = V = 0; D < 16; D++)
                    for (J[D] = V, T = 0; T < 1 << K[D]; T++) x[V++] = D
                  for (V >>= 7; D < l; D++)
                    for (J[D] = V << 7, T = 0; T < 1 << (K[D] - 7); T++)
                      x[256 + V++] = D
                  for (Z = 0; Z <= p; Z++) rt[Z] = 0
                  for (T = 0; T <= 143; ) (ot[2 * T + 1] = 8), T++, rt[8]++
                  for (; T <= 255; ) (ot[2 * T + 1] = 9), T++, rt[9]++
                  for (; T <= 279; ) (ot[2 * T + 1] = 7), T++, rt[7]++
                  for (; T <= 287; ) (ot[2 * T + 1] = 8), T++, rt[8]++
                  for (kt(ot, L + 1, rt), T = 0; T < l; T++)
                    (w[2 * T + 1] = 5), (w[2 * T] = Ut(T, 5))
                  ;(ct = new $(ot, G, y + 1, L, p)),
                    (H = new $(w, K, 0, l, p)),
                    (ut = new $(new Array(0), B, 0, g, E))
                })(),
                (R = !0)),
                (u.l_desc = new O(u.dyn_ltree, ct)),
                (u.d_desc = new O(u.dyn_dtree, H)),
                (u.bl_desc = new O(u.bl_tree, ut)),
                (u.bi_buf = 0),
                (u.bi_valid = 0),
                Nt(u)
            }),
              (v._tr_stored_block = m),
              (v._tr_flush_block = function (u, T, Z, W) {
                var D,
                  V,
                  rt = 0
                0 < u.level
                  ? (u.strm.data_type === 2 &&
                      (u.strm.data_type = (function (et) {
                        var at,
                          wt = 4093624447
                        for (at = 0; at <= 31; at++, wt >>>= 1)
                          if (1 & wt && et.dyn_ltree[2 * at] !== 0) return h
                        if (
                          et.dyn_ltree[18] !== 0 ||
                          et.dyn_ltree[20] !== 0 ||
                          et.dyn_ltree[26] !== 0
                        )
                          return o
                        for (at = 32; at < y; at++)
                          if (et.dyn_ltree[2 * at] !== 0) return o
                        return h
                      })(u)),
                    Dt(u, u.l_desc),
                    Dt(u, u.d_desc),
                    (rt = (function (et) {
                      var at
                      for (
                        r(et, et.dyn_ltree, et.l_desc.max_code),
                          r(et, et.dyn_dtree, et.d_desc.max_code),
                          Dt(et, et.bl_desc),
                          at = g - 1;
                        3 <= at && et.bl_tree[2 * Q[at] + 1] === 0;
                        at--
                      );
                      return (et.opt_len += 3 * (at + 1) + 5 + 5 + 4), at
                    })(u)),
                    (D = (u.opt_len + 3 + 7) >>> 3),
                    (V = (u.static_len + 3 + 7) >>> 3) <= D && (D = V))
                  : (D = V = Z + 5),
                  Z + 4 <= D && T !== -1
                    ? m(u, T, Z, W)
                    : u.strategy === 4 || V === D
                    ? (nt(u, 2 + (W ? 1 : 0), 3), It(u, ot, w))
                    : (nt(u, 4 + (W ? 1 : 0), 3),
                      (function (et, at, wt, pt) {
                        var Ot
                        for (
                          nt(et, at - 257, 5),
                            nt(et, wt - 1, 5),
                            nt(et, pt - 4, 4),
                            Ot = 0;
                          Ot < pt;
                          Ot++
                        )
                          nt(et, et.bl_tree[2 * Q[Ot] + 1], 3)
                        M(et, et.dyn_ltree, at - 1), M(et, et.dyn_dtree, wt - 1)
                      })(
                        u,
                        u.l_desc.max_code + 1,
                        u.d_desc.max_code + 1,
                        rt + 1
                      ),
                      It(u, u.dyn_ltree, u.dyn_dtree)),
                  Nt(u),
                  W && Et(u)
              }),
              (v._tr_tally = function (u, T, Z) {
                return (
                  (u.pending_buf[u.d_buf + 2 * u.last_lit] = (T >>> 8) & 255),
                  (u.pending_buf[u.d_buf + 2 * u.last_lit + 1] = 255 & T),
                  (u.pending_buf[u.l_buf + u.last_lit] = 255 & Z),
                  u.last_lit++,
                  T === 0
                    ? u.dyn_ltree[2 * Z]++
                    : (u.matches++,
                      T--,
                      u.dyn_ltree[2 * (a[Z] + y + 1)]++,
                      u.dyn_dtree[2 * F(T)]++),
                  u.last_lit === u.lit_bufsize - 1
                )
              }),
              (v._tr_align = function (u) {
                nt(u, 2, 3),
                  tt(u, S, ot),
                  (function (T) {
                    T.bi_valid === 16
                      ? (st(T, T.bi_buf), (T.bi_buf = 0), (T.bi_valid = 0))
                      : 8 <= T.bi_valid &&
                        ((T.pending_buf[T.pending++] = 255 & T.bi_buf),
                        (T.bi_buf >>= 8),
                        (T.bi_valid -= 8))
                  })(u)
              })
          },
          { '../utils/common': 41 }
        ],
        53: [
          function (N, C, v) {
            C.exports = function () {
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
          function (N, C, v) {
            ;(function (d) {
              ;(function (h, o) {
                if (!h.setImmediate) {
                  var _,
                    n,
                    U,
                    y,
                    L = 1,
                    l = {},
                    g = !1,
                    s = h.document,
                    p = Object.getPrototypeOf && Object.getPrototypeOf(h)
                  ;(p = p && p.setTimeout ? p : h),
                    (_ =
                      {}.toString.call(h.process) === '[object process]'
                        ? function (I) {
                            process.nextTick(function () {
                              E(I)
                            })
                          }
                        : (function () {
                            if (h.postMessage && !h.importScripts) {
                              var I = !0,
                                A = h.onmessage
                              return (
                                (h.onmessage = function () {
                                  I = !1
                                }),
                                h.postMessage('', '*'),
                                (h.onmessage = A),
                                I
                              )
                            }
                          })()
                        ? ((y = 'setImmediate$' + Math.random() + '$'),
                          h.addEventListener
                            ? h.addEventListener('message', S, !1)
                            : h.attachEvent('onmessage', S),
                          function (I) {
                            h.postMessage(y + I, '*')
                          })
                        : h.MessageChannel
                        ? (((U = new MessageChannel()).port1.onmessage =
                            function (I) {
                              E(I.data)
                            }),
                          function (I) {
                            U.port2.postMessage(I)
                          })
                        : s && 'onreadystatechange' in s.createElement('script')
                        ? ((n = s.documentElement),
                          function (I) {
                            var A = s.createElement('script')
                            ;(A.onreadystatechange = function () {
                              E(I),
                                (A.onreadystatechange = null),
                                n.removeChild(A),
                                (A = null)
                            }),
                              n.appendChild(A)
                          })
                        : function (I) {
                            setTimeout(E, 0, I)
                          }),
                    (p.setImmediate = function (I) {
                      typeof I != 'function' && (I = new Function('' + I))
                      for (
                        var A = new Array(arguments.length - 1), X = 0;
                        X < A.length;
                        X++
                      )
                        A[X] = arguments[X + 1]
                      var G = { callback: I, args: A }
                      return (l[L] = G), _(L), L++
                    }),
                    (p.clearImmediate = f)
                }
                function f(I) {
                  delete l[I]
                }
                function E(I) {
                  if (g) setTimeout(E, 0, I)
                  else {
                    var A = l[I]
                    if (A) {
                      g = !0
                      try {
                        ;(function (X) {
                          var G = X.callback,
                            K = X.args
                          switch (K.length) {
                            case 0:
                              G()
                              break
                            case 1:
                              G(K[0])
                              break
                            case 2:
                              G(K[0], K[1])
                              break
                            case 3:
                              G(K[0], K[1], K[2])
                              break
                            default:
                              G.apply(o, K)
                          }
                        })(A)
                      } finally {
                        f(I), (g = !1)
                      }
                    }
                  }
                }
                function S(I) {
                  I.source === h &&
                    typeof I.data == 'string' &&
                    I.data.indexOf(y) === 0 &&
                    E(+I.data.slice(y.length))
                }
              })(typeof self > 'u' ? (d === void 0 ? this : d) : self)
            }).call(
              this,
              typeof ve < 'u'
                ? ve
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
})(hn)
const _n = Se,
  pn = wr({ __proto__: null, default: _n }, [Se]),
  mn = new pn()
class Nn {
  static async init(_t) {
    const N = await fetch(_t).then((C) => C.blob())
    return await mn.loadAsync(N)
  }
}
const yr = {
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
function Pe(lt) {
  return new Promise((_t, N) => {
    ;(lt.oncomplete = lt.onsuccess = () => _t(lt.result)),
      (lt.onabort = lt.onerror = () => N(lt.error))
  })
}
function gn(lt, _t) {
  const N = indexedDB.open(lt)
  N.onupgradeneeded = () => N.result.createObjectStore(_t)
  const C = Pe(N)
  return (v, d) => C.then((h) => d(h.transaction(_t, v).objectStore(_t)))
}
let Me
function vr() {
  return Me || (Me = gn('keyval-store', 'keyval')), Me
}
function En(lt, _t = vr()) {
  return _t('readonly', (N) => Pe(N.get(lt)))
}
function bn(lt, _t, N = vr()) {
  return N('readwrite', (C) => (C.put(_t, lt), Pe(C.transaction)))
}
const yn = ['widget', 'remind_at', 'tags', 'files'],
  wn = ({
    limit: lt,
    where: _t,
    user_id: N
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
          WHERE taker_id = ${N}
            AND is_valid = 1
            AND personal_state IN (0, 10409, 10604, 10611)
            AND operate_state = 0) AS a,
        task AS b
            LEFT JOIN task_config AS c
            ON b.id = c.id
            LEFT JOIN task_repeat AS d
            ON c.id = d.task_id AND b.repeat_type > 0
            LEFT JOIN task_repeat_finish AS e
            ON d.repeat_id = e.repeat_id AND e.user_id = ${N}
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
                WHERE ftb.user_id = ${N}
                  AND ftb.state = 1
                GROUP BY object_id) ff2
    ON a.id = ff2.task_id
    LEFT JOIN task_conclusion AS f
    ON a.id = f.task_id AND f.delete_at = 0
    LEFT JOIN message_action AS g
    ON a.id = g.ref_id AND g.user_id = ${N} AND g.delete_at = 0
    LEFT JOIN message AS h
    ON a.id = h.ref_id AND h.id = g.last_message_id
    LEFT JOIN comment AS i
    ON h.comment_id = i.id
    LEFT JOIN task_follow AS j
    ON j.user_id = ${N} AND j.task_id = a.id
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
                          ON fw.id = fwm.workspace_id AND fwm.user_id = ${N} AND fwm.state = 10902) w
    ON a.id = w.id
    LEFT JOIN task_relation AS k
    ON a.id = k.task_id AND k.user_id = ${N}
    LEFT JOIN (SELECT tc.id, IFNULL(tfs.name, '') AS flow_step_name,
                      IFNULL(tfsr.complete_at, 0) AS flow_step_complete_at, IFNULL(tfsr.user_id, '') AS user_id,
                      CASE WHEN r.id > 0 THEN COUNT(*) ELSE 0 END AS step_user_count
                 FROM task_config AS tc
                          LEFT JOIN task_flow_step tfs
                          ON tfs.id = tc.flow_step_id
                          LEFT JOIN task_flow_step_relation AS tfsr
                          ON tfsr.step_id = tfs.id AND tfsr.delete_at = 0 AND tfsr.user_id = ${N}
                          LEFT JOIN task_flow_step_relation AS r
                          ON r.step_id = tfs.id AND r.delete_at = 0

                GROUP BY tc.id, tfs.id) z
    ON a.id = z.id
${_t || ''} 
ORDER BY timestamp ASC, a.repeat_id ASC, a.id DESC 
${lt} `,
  vn = (lt) => {
    const { user_id: _t, page_number: N, parent_id: C, page_record: v } = lt,
      d = `LIMIT ${(N - 1) * v}, ${v}`,
      h = []
    C && h.push(`parent_id IN (${C})`)
    const o = h.length ? `WHERE ${h.join(' AND ')}` : ''
    return wn({ limit: d, user_id: _t, where: o })
  },
  Ln =
    'http://flyele-dev.oss-cn-shenzhen.aliyuncs.com/middlestation%2F1097162630889616%2F1487318895218688.zip?Expires=1680157153&OSSAccessKeyId=LTAI5tNRFh75VpujzNxcSMxq&Signature=drhJj8F0LoIDe7I%2Fo8rnimBMBYw%3D',
  Tn =
    process.env.NODE_ENV === 'dev'
      ? 'https://sql.js.org/dist/sql-wasm.wasm'
      : 'https://cdn.flyele.net/wasm/sql-wasm.wasm'
class Un {
  constructor() {
    ;(this.db = null), (this.zipObj = null)
  }
  async initDB() {
    const _t = await fn({ locateFile: () => Tn }),
      N = await En('database-fly')
    if (N) return (this.db = new _t.Database(N)), this.getTable()
    const C = new _t.Database()
    return (
      (this.db = C),
      C.run(dn),
      await this.fetchZip(Ln),
      await this.initTable(),
      this.getTable()
    )
  }
  formatSelectValue({ columns: _t, values: N }) {
    const C = Object.entries(_t)
    return new Array(N.length).fill({}).map((d, h) => {
      for (const [o, _] of C) {
        const n = N[h][Number(o)]
        yn.includes(_)
          ? (d[_] = JSON.parse(n))
          : (d[_] = /^(id)$|_id$/.test(_) ? (n ? String(n) : '') : n)
      }
      return d
    })
  }
  query(_t) {
    const N = vn(_t),
      C = this.db.exec(N)
    return C[0] ? this.formatSelectValue(C[0]) : []
  }
  getTable() {
    return this.db.exec('SELECT * FROM tag_bind')
  }
  async fetchZip(_t) {
    this.zipObj = await Nn.init(_t)
  }
  async parseFile(_t) {
    return JSON.parse(await this.zipObj.file(_t).async('string'))
  }
  async initTable() {
    console.log('begin')
    const _t = await this.parseFile('guide')
    for (const [N, C] of Object.entries(_t)) {
      const { data: v } = C
      for (const d of v) {
        const o = (await this.parseFile(d)).map((n) => {
          const U = {}
          return (
            Object.keys(yr[N]).forEach((y) => {
              U[y] = n[y] || yr[N][y]
            }),
            U
          )
        })
        let _ = ''
        o.forEach((n) => {
          _ += this.getInsertSql(n, N) + ';'
        }),
          this.db.run(_)
      }
    }
    console.log('done'),
      bn('database-fly', this.db.export()).then(() => {
        console.log('output -->')
      })
  }
  getInsertSql(_t, N) {
    return `INSERT INTO ${N} (${Object.keys(_t).join(
      ' ,'
    )}) VALUES (${Object.values(_t)
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
const Sn = new Un()
self.postMessage('init ws ok')
Sn.initDB().then((lt) => {
  console.log('init from sw', lt), self.postMessage({ initData: lt })
})
self.onmessage = (lt) => {
  console.log('get event from client', lt)
}
