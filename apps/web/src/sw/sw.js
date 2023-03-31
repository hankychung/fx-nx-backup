'use strict'
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
function an(_t) {
  if (_t.__esModule) return _t
  var lt = _t.default
  if (typeof lt == 'function') {
    var N = function B() {
      if (this instanceof B) {
        var v = [null]
        v.push.apply(v, arguments)
        var _ = Function.bind.apply(lt, v)
        return new _()
      }
      return lt.apply(this, arguments)
    }
    N.prototype = lt.prototype
  } else N = {}
  return (
    Object.defineProperty(N, '__esModule', { value: !0 }),
    Object.keys(_t).forEach(function (B) {
      var v = Object.getOwnPropertyDescriptor(_t, B)
      Object.defineProperty(
        N,
        B,
        v.get
          ? v
          : {
              enumerable: !0,
              get: function () {
                return _t[B]
              }
            }
      )
    }),
    N
  )
}
var je = {},
  sn = {
    get exports() {
      return je
    },
    set exports(_t) {
      je = _t
    }
  }
const on = {},
  un = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: on },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  Le = an(un)
;(function (_t, lt) {
  var N = void 0,
    B = function (v) {
      return (
        N ||
        ((N = new Promise(function (_, d) {
          var o = typeof v < 'u' ? v : {},
            h = o.onAbort
          ;(o.onAbort = function (t) {
            d(new Error(t)), h && h(t)
          }),
            (o.postRun = o.postRun || []),
            o.postRun.push(function () {
              _(o)
            }),
            (_t = void 0)
          var n
          n || (n = typeof o < 'u' ? o : {}),
            (n.onRuntimeInitialized = function () {
              function t(k, Y) {
                switch (typeof Y) {
                  case 'boolean':
                    en(k, Y ? 1 : 0)
                    break
                  case 'number':
                    Vr(k, Y)
                    break
                  case 'string':
                    Qr(k, Y, -1, -1)
                    break
                  case 'object':
                    if (Y === null) gr(k)
                    else if (Y.length != null) {
                      var it = Be(Y)
                      tn(k, it, Y.length, -1), be(it)
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
                    gr(k)
                }
              }
              function e(k, Y) {
                for (var it = [], dt = 0; dt < k; dt += 1) {
                  var mt = W(Y + 4 * dt, 'i32'),
                    yt = Zr(mt)
                  if (yt === 1 || yt === 2) mt = $r(mt)
                  else if (yt === 3) mt = Kr(mt)
                  else if (yt === 4) {
                    ;(yt = mt), (mt = Yr(yt)), (yt = Jr(yt))
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
                  (this.Ya = ge(Y)),
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
                      Ie(it),
                      _e(dt, Y)
                  }
                }
                this.handleError(ht(this.filename, C)),
                  (this.db = W(C, 'i32')),
                  rn(this.db),
                  (this.Za = {}),
                  (this.Na = {})
              }
              var C = Yt(4),
                q = n.cwrap,
                ht = q('sqlite3_open', 'number', ['string', 'number']),
                bt = q('sqlite3_close_v2', 'number', ['number']),
                Et = q('sqlite3_exec', 'number', [
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
                Ir = q('sqlite3_normalized_sql', 'string', ['number']),
                pr = q('sqlite3_prepare_v2', 'number', [
                  'number',
                  'number',
                  'number',
                  'number',
                  'number'
                ]),
                Or = q('sqlite3_bind_text', 'number', [
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
                Dr = q('sqlite3_bind_double', 'number', [
                  'number',
                  'number',
                  'number'
                ]),
                Fr = q('sqlite3_bind_int', 'number', [
                  'number',
                  'number',
                  'number'
                ]),
                xr = q('sqlite3_bind_parameter_index', 'number', [
                  'number',
                  'string'
                ]),
                Rr = q('sqlite3_step', 'number', ['number']),
                Cr = q('sqlite3_errmsg', 'string', ['number']),
                zr = q('sqlite3_column_count', 'number', ['number']),
                Br = q('sqlite3_data_count', 'number', ['number']),
                Gr = q('sqlite3_column_double', 'number', ['number', 'number']),
                Nr = q('sqlite3_column_text', 'string', ['number', 'number']),
                jr = q('sqlite3_column_blob', 'number', ['number', 'number']),
                Mr = q('sqlite3_column_bytes', 'number', ['number', 'number']),
                Pr = q('sqlite3_column_type', 'number', ['number', 'number']),
                qr = q('sqlite3_column_name', 'string', ['number', 'number']),
                Hr = q('sqlite3_reset', 'number', ['number']),
                Wr = q('sqlite3_clear_bindings', 'number', ['number']),
                Xr = q('sqlite3_finalize', 'number', ['number']),
                Er = q(
                  'sqlite3_create_function_v2',
                  'number',
                  'number string number number number number number number number'.split(
                    ' '
                  )
                ),
                Zr = q('sqlite3_value_type', 'number', ['number']),
                Yr = q('sqlite3_value_bytes', 'number', ['number']),
                Kr = q('sqlite3_value_text', 'string', ['number']),
                Jr = q('sqlite3_value_blob', 'number', ['number']),
                $r = q('sqlite3_value_double', 'number', ['number']),
                Vr = q('sqlite3_result_double', '', ['number', 'number']),
                gr = q('sqlite3_result_null', '', ['number']),
                Qr = q('sqlite3_result_text', '', [
                  'number',
                  'string',
                  'number',
                  'number'
                ]),
                tn = q('sqlite3_result_blob', '', [
                  'number',
                  'number',
                  'number',
                  'number'
                ]),
                en = q('sqlite3_result_int', '', ['number', 'number']),
                we = q('sqlite3_result_error', '', [
                  'number',
                  'string',
                  'number'
                ]),
                br = q('sqlite3_aggregate_context', 'number', [
                  'number',
                  'number'
                ]),
                rn = q('RegisterExtensionFunctions', 'number', ['number'])
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
                  var k = Rr(this.La)
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
                    k == null && ((k = this.Ja), (this.Ja += 1)), Gr(this.La, k)
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
                  var Y = Mr(this.La, k)
                  k = jr(this.La, k)
                  for (var it = new Uint8Array(Y), dt = 0; dt < Y; dt += 1)
                    it[dt] = H[k + dt]
                  return it
                }),
                (i.prototype.get = function (k, Y) {
                  ;(Y = Y || {}),
                    k != null && this.bind(k) && this.step(),
                    (k = [])
                  for (var it = Br(this.La), dt = 0; dt < it; dt += 1)
                    switch (Pr(this.La, dt)) {
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
                  for (var k = [], Y = zr(this.La), it = 0; it < Y; it += 1)
                    k.push(qr(this.La, it))
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
                  return Ir(this.La)
                }),
                (i.prototype.run = function (k) {
                  return k != null && this.bind(k), this.step(), this.reset()
                }),
                (i.prototype.nb = function (k, Y) {
                  Y == null && ((Y = this.Ja), (this.Ja += 1)), (k = Ot(k))
                  var it = Be(k)
                  this.fb.push(it),
                    this.db.handleError(Or(this.La, Y, it, k.length - 1, 0))
                }),
                (i.prototype.wb = function (k, Y) {
                  Y == null && ((Y = this.Ja), (this.Ja += 1))
                  var it = Be(k)
                  this.fb.push(it),
                    this.db.handleError(mr(this.La, Y, it, k.length, 0))
                }),
                (i.prototype.mb = function (k, Y) {
                  Y == null && ((Y = this.Ja), (this.Ja += 1)),
                    this.db.handleError(
                      (k === (k | 0) ? Fr : Dr)(this.La, Y, k)
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
                      var dt = xr(Y.La, it)
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
                  return this.freemem(), Wr(this.La) === 0 && Hr(this.La) === 0
                }),
                (i.prototype.freemem = function () {
                  for (var k; (k = this.fb.pop()) !== void 0; ) be(k)
                }),
                (i.prototype.free = function () {
                  this.freemem()
                  var k = Xr(this.La) === 0
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
                  D(C), D(Y)
                  try {
                    this.db.handleError(pr(this.db.db, this.eb, -1, C, Y)),
                      (this.eb = W(Y, 'i32'))
                    var it = W(C, 'i32')
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
                  } else this.handleError(Et(this.db, k, 0, 0, C))
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
                      D(C), D(zt), this.handleError(pr(this.db, Ct, -1, C, zt))
                      var Bt = W(C, 'i32')
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
                    (D(C),
                    this.handleError(Ht(this.db, k, -1, C, 0)),
                    (k = W(C, 'i32')),
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
                    this.handleError(ht(this.filename, C)),
                    (this.db = W(C, 'i32')),
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
                  throw ((k = Cr(this.db)), Error(k))
                }),
                (b.prototype.getRowsModified = function () {
                  return At(this.db)
                }),
                (b.prototype.create_function = function (k, Y) {
                  Object.prototype.hasOwnProperty.call(this.Na, k) &&
                    (ue(this.Na[k]), delete this.Na[k])
                  var it = ze(function (dt, mt, yt) {
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
                      Er(this.db, k, Y.length, 1, 0, it, 0, 0, 0)
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
                  var qt = ze(function (zt, Bt, fe) {
                      var Vt = br(zt, 1)
                      Object.hasOwnProperty.call(yt, Vt) || (yt[Vt] = it()),
                        (Bt = e(Bt, fe)),
                        (Bt = [yt[Vt]].concat(Bt))
                      try {
                        yt[Vt] = mt.apply(null, Bt)
                      } catch (nn) {
                        delete yt[Vt], we(zt, nn, -1)
                      }
                    }, 'viii'),
                    Ct = ze(function (zt) {
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
                      Er(this.db, k, mt.length - 1, 1, 0, 0, qt, Ct, 0)
                    ),
                    this
                  )
                }),
                (n.Database = b)
            })
          var S = Object.assign({}, n),
            y = './this.program',
            L = typeof window == 'object',
            l = typeof importScripts == 'function',
            E =
              typeof process == 'object' &&
              typeof process.versions == 'object' &&
              typeof process.versions.node == 'string',
            s = '',
            p,
            f,
            g,
            U,
            I,
            A
          E
            ? ((s = l ? Le.dirname(s) + '/' : __dirname + '/'),
              (A = () => {
                I || ((U = Le), (I = Le))
              }),
              (p = function (t, e) {
                return (
                  A(),
                  (t = I.normalize(t)),
                  U.readFileSync(t, e ? void 0 : 'utf8')
                )
              }),
              (g = (t) => (
                (t = p(t, !0)), t.buffer || (t = new Uint8Array(t)), t
              )),
              (f = (t, e, i) => {
                A(),
                  (t = I.normalize(t)),
                  U.readFile(t, function (c, b) {
                    c ? i(c) : e(b.buffer)
                  })
              }),
              1 < process.argv.length &&
                (y = process.argv[1].replace(/\\/g, '/')),
              process.argv.slice(2),
              (_t.exports = n),
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
                (g = (t) => {
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
          Object.assign(n, S), (S = null), n.thisProgram && (y = n.thisProgram)
          var K
          n.wasmBinary && (K = n.wasmBinary),
            n.noExitRuntime,
            typeof WebAssembly != 'object' &&
              It('no native wasm support detected')
          var z,
            Q = !1,
            ot = typeof TextDecoder < 'u' ? new TextDecoder('utf8') : void 0
          function w(t, e, i) {
            var c = e + i
            for (i = e; t[i] && !(i >= c); ) ++i
            if (16 < i - e && t.buffer && ot) return ot.decode(t.subarray(e, i))
            for (c = ''; e < i; ) {
              var b = t[e++]
              if (b & 128) {
                var C = t[e++] & 63
                if ((b & 224) == 192)
                  c += String.fromCharCode(((b & 31) << 6) | C)
                else {
                  var q = t[e++] & 63
                  ;(b =
                    (b & 240) == 224
                      ? ((b & 15) << 12) | (C << 6) | q
                      : ((b & 7) << 18) | (C << 12) | (q << 6) | (t[e++] & 63)),
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
            for (var C = 0; C < t.length; ++C) {
              var q = t.charCodeAt(C)
              if (55296 <= q && 57343 >= q) {
                var ht = t.charCodeAt(++C)
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
            var t = z.buffer
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
            St = [],
            kt = [],
            Nt = []
          function gt() {
            var t = n.preRun.shift()
            St.unshift(t)
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
              if (g) return g(t)
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
            if (E)
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
            ;(Wt[t] = { input: [], output: [], Xa: e }), Ae(t, Kt)
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
                for (var b = 0, C = 0; C < c; C++) {
                  try {
                    var q = t.tty.Xa.tb(t.tty)
                  } catch {
                    throw new j(29)
                  }
                  if (q === void 0 && b === 0) throw new j(6)
                  if (q == null) break
                  b++, (e[i + C] = q)
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
            Ut = {
              tb: function (t) {
                if (!t.input.length) {
                  var e = null
                  if (E) {
                    var i = Buffer.alloc(256),
                      c = 0
                    try {
                      c = U.readSync(process.stdin.fd, i, 0, 256, -1)
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
                      pb: { node: { Pa: ft.Ga.Pa, Oa: ft.Ga.Oa }, stream: Tr }
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
                  var C = t.node.Ia
                  if (b >= t.node.Ma) return 0
                  if (((t = Math.min(t.node.Ma - b, c)), 8 < t && C.subarray))
                    e.set(C.subarray(b, b + t), i)
                  else for (c = 0; c < t; c++) e[i + c] = C[b + c]
                  return t
                },
                write: function (t, e, i, c, b, C) {
                  if ((e.buffer === H.buffer && (C = !1), !c)) return 0
                  if (
                    ((t = t.node),
                    (t.timestamp = Date.now()),
                    e.subarray && (!t.Ia || t.Ia.subarray))
                  ) {
                    if (C) return (t.Ia = e.subarray(i, i + c)), (t.Ma = c)
                    if (t.Ma === 0 && b === 0)
                      return (t.Ia = e.slice(i, i + c)), (t.Ma = c)
                    if (b + c <= t.Ma)
                      return t.Ia.set(e.subarray(i, i + c), b), c
                  }
                  if ((ft.qb(t, b + c), t.Ia.subarray && e.subarray))
                    t.Ia.set(e.subarray(i, i + c), b)
                  else for (C = 0; C < c; C++) t.Ia[b + C] = e[i + C]
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
            Se = 1,
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
                var C = b === t.length - 1
                if (C && e.parent) break
                if (
                  ((i = Jt(i, t[b])),
                  (c = rt(c + '/' + t[b])),
                  i.Va && (!C || (C && e.rb)) && (i = i.Va.root),
                  !C || e.Sa)
                ) {
                  for (C = 0; (i.mode & 61440) === 40960; )
                    if (
                      ((i = Ve(c)),
                      (c = pt(et(c), i)),
                      (i = Ft(c, { kb: e.kb + 1 }).node),
                      40 < C++)
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
            Ue = (t, e) => {
              for (var i = 0, c = 0; c < e.length; c++)
                i = ((i << 5) - i + e.charCodeAt(c)) | 0
              return ((t + i) >>> 0) % Mt.length
            },
            qe = (t) => {
              var e = Ue(t.parent.id, t.name)
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
              for (i = Mt[Ue(t.id, e)]; i; i = i.Wa) {
                var c = i.name
                if (i.parent.id === t.id && c === e) return i
              }
              return t.Ga.lookup(t, e)
            },
            He = (t, e, i, c) => (
              (t = new cr(t, e, i, c)),
              (e = Ue(t.parent.id, t.name)),
              (t.Wa = Mt[e]),
              (Mt[e] = t)
            ),
            vr = { r: 0, 'r+': 2, w: 577, 'w+': 578, a: 1089, 'a+': 1090 },
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
            Lr = (t = 0) => {
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
              (e = Lr(e)),
              (t.fd = e),
              (jt[e] = t)
            ),
            Tr = {
              open: (t) => {
                ;(t.Ha = re[t.node.rdev].Ha), t.Ha.open && t.Ha.open(t)
              },
              Ta: () => {
                throw new j(70)
              }
            },
            Ae = (t, e) => {
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
            ke = (t, e) => {
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
                var c = vr[e]
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
            Ie = (t) => {
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
              var C = typeof b < 'u'
              if (!C) b = t.position
              else if (!t.seekable) throw new j(70)
              return (e = t.Ha.read(t, e, i, c, b)), C || (t.position += e), e
            },
            nr = (t, e, i, c, b) => {
              if (0 > c || 0 > b) throw new j(28)
              if (t.fd === null) throw new j(8)
              if (!(t.flags & 2097155)) throw new j(8)
              if ((t.node.mode & 61440) === 16384) throw new j(31)
              if (!t.Ha.write) throw new j(28)
              t.seekable && t.flags & 1024 && er(t, 0, 2)
              var C = typeof b < 'u'
              if (!C) b = t.position
              else if (!t.seekable) throw new j(70)
              return (
                (e = t.Ha.write(t, e, i, c, b, void 0)),
                C || (t.position += e),
                e
              )
            },
            Sr = (t) => {
              var e,
                i = ee(t, i || 0)
              t = ae(t).size
              var c = new Uint8Array(t)
              return rr(i, c, 0, t, 0), (e = c), Ie(i), e
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
              Oe || (Oe = 64)
              var b = (Oe++ << 8) | 0
              Ae(b, {
                open: (C) => {
                  C.seekable = !1
                },
                close: () => {
                  i && i.buffer && i.buffer.length && i(10)
                },
                read: (C, q, ht, bt) => {
                  for (var Et = 0, At = 0; At < bt; At++) {
                    try {
                      var Ht = e()
                    } catch {
                      throw new j(29)
                    }
                    if (Ht === void 0 && Et === 0) throw new j(6)
                    if (Ht == null) break
                    Et++, (q[ht + At] = Ht)
                  }
                  return Et && (C.node.timestamp = Date.now()), Et
                },
                write: (C, q, ht, bt) => {
                  for (var Et = 0; Et < bt; Et++)
                    try {
                      i(q[ht + Et])
                    } catch {
                      throw new j(29)
                    }
                  return bt && (C.node.timestamp = Date.now()), Et
                }
              }),
                he(t, c, b)
            },
            Oe,
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
          function Ee() {
            return (Ne += 4), $[(Ne - 4) >> 2]
          }
          function Gt(t) {
            if (((t = jt[t]), !t)) throw new j(8)
            return t
          }
          function De(t) {
            return O[t >> 2] + 4294967296 * $[(t + 4) >> 2]
          }
          function or(t) {
            var e = P(t) + 1,
              i = ge(e)
            return i && a(t, H, i, e), i
          }
          function Ur(t, e, i) {
            function c(bt) {
              return (bt = bt.toTimeString().match(/\(([A-Za-z ]+)\)$/))
                ? bt[1]
                : 'GMT'
            }
            var b = new Date().getFullYear(),
              C = new Date(b, 0, 1),
              q = new Date(b, 6, 1)
            b = C.getTimezoneOffset()
            var ht = q.getTimezoneOffset()
            ;($[t >> 2] = 60 * Math.max(b, ht)),
              ($[e >> 2] = Number(b != ht)),
              (t = c(C)),
              (e = c(q)),
              (t = or(t)),
              (e = or(e)),
              ht < b
                ? ((O[i >> 2] = t), (O[(i + 4) >> 2] = e))
                : ((O[i >> 2] = e), (O[(i + 4) >> 2] = t))
          }
          function Fe(t, e, i) {
            Fe.Bb || ((Fe.Bb = !0), Ur(t, e, i))
          }
          var ur
          ur = E
            ? () => {
                var t = process.hrtime()
                return 1e3 * t[0] + t[1] / 1e6
              }
            : () => performance.now()
          var xe = {}
          function lr() {
            if (!Re) {
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
              for (e in xe) xe[e] === void 0 ? delete t[e] : (t[e] = xe[e])
              var i = []
              for (e in t) i.push(e + '=' + t[e])
              Re = i
            }
            return Re
          }
          var Re,
            Zt = void 0,
            Ce = []
          function ze(t, e) {
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
            if (Ce.length) i = Ce.pop()
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
                  var C = {
                      parameters: [],
                      results: e[0] == 'v' ? [] : [b[e[0]]]
                    },
                    q = 1;
                  q < e.length;
                  ++q
                )
                  C.parameters.push(b[e[q]])
                e = new c(C, t)
              } else {
                for (
                  c = [1, 96],
                    b = e.slice(0, 1),
                    e = e.slice(1),
                    C = { i: 127, p: 127, j: 126, f: 125, d: 124 },
                    q = e.length,
                    128 > q ? c.push(q) : c.push(q % 128 | 128, q >> 7),
                    q = 0;
                  q < e.length;
                  ++q
                )
                  c.push(C[e[q]])
                b == 'v' ? c.push(0) : c.push(1, C[b]),
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
            Zt.delete(tt.get(t)), Ce.push(t)
          }
          function Be(t) {
            var e = ge(t.length)
            return (
              t.subarray || t.slice || (t = new Uint8Array(t)), ut.set(t, e), e
            )
          }
          function Ar(t, e, i, c) {
            var b = {
              string: (Et) => {
                var At = 0
                if (Et != null && Et !== 0) {
                  var Ht = (Et.length << 2) + 1
                  ;(At = Yt(Ht)), a(Et, ut, At, Ht)
                }
                return At
              },
              array: (Et) => {
                var At = Yt(Et.length)
                return H.set(Et, At), At
              }
            }
            t = n['_' + t]
            var C = [],
              q = 0
            if (c)
              for (var ht = 0; ht < c.length; ht++) {
                var bt = b[i[ht]]
                bt
                  ? (q === 0 && (q = le()), (C[ht] = bt(c[ht])))
                  : (C[ht] = c[ht])
              }
            return (
              (i = t.apply(null, C)),
              (i = (function (Et) {
                return (
                  q !== 0 && ce(q),
                  e === 'string' ? x(Et) : e === 'boolean' ? !!Et : Et
                )
              })(i))
            )
          }
          function cr(t, e, i, c) {
            t || (t = this),
              (this.parent = t),
              (this.Ra = t.Ra),
              (this.Va = null),
              (this.id = Se++),
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
                Ae(259, { read: () => 0, write: (e, i, c, b) => b }),
                he('/dev/null', 259),
                xt(1280, Ut),
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
          var kr = {
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
                    var b = Ee()
                    return 0 > b ? -28 : Ye(c, b).fd
                  case 1:
                  case 2:
                    return 0
                  case 3:
                    return c.flags
                  case 4:
                    return (b = Ee()), (c.flags |= b), 0
                  case 5:
                    return (b = Ee()), (J[(b + 0) >> 1] = 2), 0
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
              } catch (C) {
                if (typeof Tt > 'u' || !(C instanceof j)) throw C
                return -C.Ka
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
              } catch (C) {
                if (typeof Tt > 'u' || !(C instanceof j)) throw C
                return -C.Ka
              }
            },
            v: function (t, e, i, c) {
              Ne = c
              try {
                ;(e = x(e)), (e = $t(t, e))
                var b = c ? Ee() : 0
                return ee(e, i, b).fd
              } catch (C) {
                if (typeof Tt > 'u' || !(C instanceof j)) throw C
                return -C.Ka
              }
            },
            t: function (t, e, i, c) {
              try {
                if (((e = x(e)), (e = $t(t, e)), 0 >= c)) return -28
                var b = Ve(e),
                  C = Math.min(c, P(b)),
                  q = H[i + C]
                return a(b, ut, i, c + 1), (H[i + C] = q), C
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
                  var c = De(i),
                    b = $[(i + 8) >> 2]
                  ;(C = 1e3 * c + b / 1e6),
                    (i += 16),
                    (c = De(i)),
                    (b = $[(i + 8) >> 2]),
                    (q = 1e3 * c + b / 1e6)
                } else
                  var C = Date.now(),
                    q = C
                t = C
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
              ;(t = new Date(1e3 * De(t))),
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
            w: function (t, e, i, c, b, C) {
              try {
                var q = Gt(c)
                if (e & 2 && !(i & 2) && (q.flags & 2097155) !== 2)
                  throw new j(2)
                if ((q.flags & 2097155) === 1) throw new j(2)
                if (!q.Ha.bb) throw new j(43)
                var ht = q.Ha.bb(q, t, b, e, i),
                  bt = ht.Fb
                return ($[C >> 2] = ht.vb), bt
              } catch (Et) {
                if (typeof Tt > 'u' || !(Et instanceof j)) throw Et
                return -Et.Ka
              }
            },
            x: function (t, e, i, c, b, C) {
              try {
                var q = Gt(b)
                if (i & 2) {
                  var ht = ut.slice(t, t + e)
                  q && q.Ha.cb && q.Ha.cb(q, ht, C, e, c)
                }
              } catch (bt) {
                if (typeof Tt > 'u' || !(bt instanceof j)) throw bt
                return -bt.Ka
              }
            },
            n: Fe,
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
                    z.grow((b - ct.byteLength + 65535) >>> 16), nt()
                    var C = 1
                    break t
                  } catch {}
                  C = void 0
                }
                if (C) return !0
              }
              return !1
            },
            z: function (t, e) {
              var i = 0
              return (
                lr().forEach(function (c, b) {
                  var C = e + i
                  for (b = O[(t + 4 * b) >> 2] = C, C = 0; C < c.length; ++C)
                    H[b++ >> 0] = c.charCodeAt(C)
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
                return Ie(e), 0
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
                  for (var C = (e = 0); C < i; C++) {
                    var q = O[t >> 2],
                      ht = O[(t + 4) >> 2]
                    t += 8
                    var bt = rr(b, H, q, ht)
                    if (0 > bt) {
                      var Et = -1
                      break t
                    }
                    if (((e += bt), bt < ht)) break
                  }
                  Et = e
                }
                return (O[c >> 2] = Et), 0
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
                var C = Gt(t)
                return (
                  er(C, e, c),
                  (T = [
                    C.position >>> 0,
                    ((u = C.position),
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
                  C.hb && e === 0 && c === 0 && (C.hb = null),
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
                  for (var C = (e = 0); C < i; C++) {
                    var q = O[t >> 2],
                      ht = O[(t + 4) >> 2]
                    t += 8
                    var bt = nr(b, H, q, ht)
                    if (0 > bt) {
                      var Et = -1
                      break t
                    }
                    e += bt
                  }
                  Et = e
                }
                return (O[c >> 2] = Et), 0
              } catch (At) {
                if (typeof Tt > 'u' || !(At instanceof j)) throw At
                return At.Ka
              }
            }
          }
          ;(function () {
            function t(b) {
              ;(n.asm = b.exports),
                (z = n.asm.I),
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
                .then(function (C) {
                  return WebAssembly.instantiate(C, c)
                })
                .then(function (C) {
                  return C
                })
                .then(b, function (C) {
                  G('failed to asynchronously prepare wasm: ' + C), It(C)
                })
            }
            var c = { a: kr }
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
                  E ||
                  typeof fetch != 'function'
                  ? i(e)
                  : fetch(r, { credentials: 'same-origin' }).then(function (b) {
                      return WebAssembly.instantiateStreaming(b, c).then(
                        e,
                        function (C) {
                          return (
                            G('wasm streaming compile failed: ' + C),
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
          var ge = (n._malloc = function () {
              return (ge = n._malloc = n.asm.ya).apply(null, arguments)
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
              var b = i.every((C) => C === 'number' || C === 'boolean')
              return e !== 'string' && b && !c
                ? n['_' + t]
                : function () {
                    return Ar(t, e, i, arguments)
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
                      : ke('/dev/tty', '/dev/stdin'),
                    n.stdout
                      ? se('stdout', null, n.stdout)
                      : ke('/dev/tty', '/dev/stdout'),
                    n.stderr
                      ? se('stderr', null, n.stderr)
                      : ke('/dev/tty1', '/dev/stderr'),
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
                  gt()
              Z(St),
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
  ;(_t.exports = B), (_t.exports.default = B)
})(sn)
const ln = `DROP TABLE IF EXISTS comment;
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
function Te(_t) {
  throw new Error(
    'Could not dynamically require "' +
      _t +
      '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.'
  )
}
var Me = {},
  cn = {
    get exports() {
      return Me
    },
    set exports(_t) {
      Me = _t
    }
  }
/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/ ;(function (_t, lt) {
  ;(function (N) {
    _t.exports = N()
  })(function () {
    return (function N(B, v, _) {
      function d(n, S) {
        if (!v[n]) {
          if (!B[n]) {
            var y = typeof Te == 'function' && Te
            if (!S && y) return y(n, !0)
            if (o) return o(n, !0)
            var L = new Error("Cannot find module '" + n + "'")
            throw ((L.code = 'MODULE_NOT_FOUND'), L)
          }
          var l = (v[n] = { exports: {} })
          B[n][0].call(
            l.exports,
            function (E) {
              var s = B[n][1][E]
              return d(s || E)
            },
            l,
            l.exports,
            N,
            B,
            v,
            _
          )
        }
        return v[n].exports
      }
      for (var o = typeof Te == 'function' && Te, h = 0; h < _.length; h++)
        d(_[h])
      return d
    })(
      {
        1: [
          function (N, B, v) {
            var _ = N('./utils'),
              d = N('./support'),
              o =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
            ;(v.encode = function (h) {
              for (
                var n,
                  S,
                  y,
                  L,
                  l,
                  E,
                  s,
                  p = [],
                  f = 0,
                  g = h.length,
                  U = g,
                  I = _.getTypeOf(h) !== 'string';
                f < h.length;

              )
                (U = g - f),
                  (y = I
                    ? ((n = h[f++]),
                      (S = f < g ? h[f++] : 0),
                      f < g ? h[f++] : 0)
                    : ((n = h.charCodeAt(f++)),
                      (S = f < g ? h.charCodeAt(f++) : 0),
                      f < g ? h.charCodeAt(f++) : 0)),
                  (L = n >> 2),
                  (l = ((3 & n) << 4) | (S >> 4)),
                  (E = 1 < U ? ((15 & S) << 2) | (y >> 6) : 64),
                  (s = 2 < U ? 63 & y : 64),
                  p.push(o.charAt(L) + o.charAt(l) + o.charAt(E) + o.charAt(s))
              return p.join('')
            }),
              (v.decode = function (h) {
                var n,
                  S,
                  y,
                  L,
                  l,
                  E,
                  s = 0,
                  p = 0,
                  f = 'data:'
                if (h.substr(0, f.length) === f)
                  throw new Error(
                    'Invalid base64 input, it looks like a data url.'
                  )
                var g,
                  U = (3 * (h = h.replace(/[^A-Za-z0-9+/=]/g, '')).length) / 4
                if (
                  (h.charAt(h.length - 1) === o.charAt(64) && U--,
                  h.charAt(h.length - 2) === o.charAt(64) && U--,
                  U % 1 != 0)
                )
                  throw new Error('Invalid base64 input, bad content length.')
                for (
                  g = d.uint8array ? new Uint8Array(0 | U) : new Array(0 | U);
                  s < h.length;

                )
                  (n =
                    (o.indexOf(h.charAt(s++)) << 2) |
                    ((L = o.indexOf(h.charAt(s++))) >> 4)),
                    (S =
                      ((15 & L) << 4) | ((l = o.indexOf(h.charAt(s++))) >> 2)),
                    (y = ((3 & l) << 6) | (E = o.indexOf(h.charAt(s++)))),
                    (g[p++] = n),
                    l !== 64 && (g[p++] = S),
                    E !== 64 && (g[p++] = y)
                return g
              })
          },
          { './support': 30, './utils': 32 }
        ],
        2: [
          function (N, B, v) {
            var _ = N('./external'),
              d = N('./stream/DataWorker'),
              o = N('./stream/Crc32Probe'),
              h = N('./stream/DataLengthProbe')
            function n(S, y, L, l, E) {
              ;(this.compressedSize = S),
                (this.uncompressedSize = y),
                (this.crc32 = L),
                (this.compression = l),
                (this.compressedContent = E)
            }
            ;(n.prototype = {
              getContentWorker: function () {
                var S = new d(_.Promise.resolve(this.compressedContent))
                    .pipe(this.compression.uncompressWorker())
                    .pipe(new h('data_length')),
                  y = this
                return (
                  S.on('end', function () {
                    if (this.streamInfo.data_length !== y.uncompressedSize)
                      throw new Error('Bug : uncompressed data size mismatch')
                  }),
                  S
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
              (n.createWorkerFrom = function (S, y, L) {
                return S.pipe(new o())
                  .pipe(new h('uncompressedSize'))
                  .pipe(y.compressWorker(L))
                  .pipe(new h('compressedSize'))
                  .withStreamInfo('compression', y)
              }),
              (B.exports = n)
          },
          {
            './external': 6,
            './stream/Crc32Probe': 25,
            './stream/DataLengthProbe': 26,
            './stream/DataWorker': 27
          }
        ],
        3: [
          function (N, B, v) {
            var _ = N('./stream/GenericWorker')
            ;(v.STORE = {
              magic: '\0\0',
              compressWorker: function () {
                return new _('STORE compression')
              },
              uncompressWorker: function () {
                return new _('STORE decompression')
              }
            }),
              (v.DEFLATE = N('./flate'))
          },
          { './flate': 7, './stream/GenericWorker': 28 }
        ],
        4: [
          function (N, B, v) {
            var _ = N('./utils'),
              d = (function () {
                for (var o, h = [], n = 0; n < 256; n++) {
                  o = n
                  for (var S = 0; S < 8; S++)
                    o = 1 & o ? 3988292384 ^ (o >>> 1) : o >>> 1
                  h[n] = o
                }
                return h
              })()
            B.exports = function (o, h) {
              return o !== void 0 && o.length
                ? _.getTypeOf(o) !== 'string'
                  ? (function (n, S, y, L) {
                      var l = d,
                        E = L + y
                      n ^= -1
                      for (var s = L; s < E; s++)
                        n = (n >>> 8) ^ l[255 & (n ^ S[s])]
                      return -1 ^ n
                    })(0 | h, o, o.length, 0)
                  : (function (n, S, y, L) {
                      var l = d,
                        E = L + y
                      n ^= -1
                      for (var s = L; s < E; s++)
                        n = (n >>> 8) ^ l[255 & (n ^ S.charCodeAt(s))]
                      return -1 ^ n
                    })(0 | h, o, o.length, 0)
                : 0
            }
          },
          { './utils': 32 }
        ],
        5: [
          function (N, B, v) {
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
          function (N, B, v) {
            var _ = null
            ;(_ = typeof Promise < 'u' ? Promise : N('lie')),
              (B.exports = { Promise: _ })
          },
          { lie: 37 }
        ],
        7: [
          function (N, B, v) {
            var _ =
                typeof Uint8Array < 'u' &&
                typeof Uint16Array < 'u' &&
                typeof Uint32Array < 'u',
              d = N('pako'),
              o = N('./utils'),
              h = N('./stream/GenericWorker'),
              n = _ ? 'uint8array' : 'array'
            function S(y, L) {
              h.call(this, 'FlateWorker/' + y),
                (this._pako = null),
                (this._pakoAction = y),
                (this._pakoOptions = L),
                (this.meta = {})
            }
            ;(v.magic = '\b\0'),
              o.inherits(S, h),
              (S.prototype.processChunk = function (y) {
                ;(this.meta = y.meta),
                  this._pako === null && this._createPako(),
                  this._pako.push(o.transformTo(n, y.data), !1)
              }),
              (S.prototype.flush = function () {
                h.prototype.flush.call(this),
                  this._pako === null && this._createPako(),
                  this._pako.push([], !0)
              }),
              (S.prototype.cleanUp = function () {
                h.prototype.cleanUp.call(this), (this._pako = null)
              }),
              (S.prototype._createPako = function () {
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
                return new S('Deflate', y)
              }),
              (v.uncompressWorker = function () {
                return new S('Inflate', {})
              })
          },
          { './stream/GenericWorker': 28, './utils': 32, pako: 38 }
        ],
        8: [
          function (N, B, v) {
            function _(l, E) {
              var s,
                p = ''
              for (s = 0; s < E; s++)
                (p += String.fromCharCode(255 & l)), (l >>>= 8)
              return p
            }
            function d(l, E, s, p, f, g) {
              var U,
                I,
                A = l.file,
                X = l.compression,
                G = g !== n.utf8encode,
                K = o.transformTo('string', g(A.name)),
                z = o.transformTo('string', n.utf8encode(A.name)),
                Q = A.comment,
                ot = o.transformTo('string', g(Q)),
                w = o.transformTo('string', n.utf8encode(Q)),
                x = z.length !== A.name.length,
                a = w.length !== Q.length,
                P = '',
                ct = '',
                H = '',
                ut = A.dir,
                J = A.date,
                $ = { crc32: 0, compressedSize: 0, uncompressedSize: 0 }
              ;(E && !s) ||
                (($.crc32 = l.crc32),
                ($.compressedSize = l.compressedSize),
                ($.uncompressedSize = l.uncompressedSize))
              var O = 0
              E && (O |= 8), G || (!x && !a) || (O |= 2048)
              var F = 0,
                st = 0
              ut && (F |= 16),
                f === 'UNIX'
                  ? ((st = 798),
                    (F |= (function (tt, St) {
                      var kt = tt
                      return tt || (kt = St ? 16893 : 33204), (65535 & kt) << 16
                    })(A.unixPermissions, ut)))
                  : ((st = 20),
                    (F |= (function (tt) {
                      return 63 & (tt || 0)
                    })(A.dosPermissions))),
                (U = J.getUTCHours()),
                (U <<= 6),
                (U |= J.getUTCMinutes()),
                (U <<= 5),
                (U |= J.getUTCSeconds() / 2),
                (I = J.getUTCFullYear() - 1980),
                (I <<= 4),
                (I |= J.getUTCMonth() + 1),
                (I <<= 5),
                (I |= J.getUTCDate()),
                x &&
                  ((ct = _(1, 1) + _(S(K), 4) + z),
                  (P += 'up' + _(ct.length, 2) + ct)),
                a &&
                  ((H = _(1, 1) + _(S(ot), 4) + w),
                  (P += 'uc' + _(H.length, 2) + H))
              var nt = ''
              return (
                (nt += `
\0`),
                (nt += _(O, 2)),
                (nt += X.magic),
                (nt += _(U, 2)),
                (nt += _(I, 2)),
                (nt += _($.crc32, 4)),
                (nt += _($.compressedSize, 4)),
                (nt += _($.uncompressedSize, 4)),
                (nt += _(K.length, 2)),
                (nt += _(P.length, 2)),
                {
                  fileRecord: y.LOCAL_FILE_HEADER + nt + K + P,
                  dirRecord:
                    y.CENTRAL_FILE_HEADER +
                    _(st, 2) +
                    nt +
                    _(ot.length, 2) +
                    '\0\0\0\0' +
                    _(F, 4) +
                    _(p, 4) +
                    K +
                    P +
                    ot
                }
              )
            }
            var o = N('../utils'),
              h = N('../stream/GenericWorker'),
              n = N('../utf8'),
              S = N('../crc32'),
              y = N('../signature')
            function L(l, E, s, p) {
              h.call(this, 'ZipFileWorker'),
                (this.bytesWritten = 0),
                (this.zipComment = E),
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
            o.inherits(L, h),
              (L.prototype.push = function (l) {
                var E = l.meta.percent || 0,
                  s = this.entriesCount,
                  p = this._sources.length
                this.accumulate
                  ? this.contentBuffer.push(l)
                  : ((this.bytesWritten += l.data.length),
                    h.prototype.push.call(this, {
                      data: l.data,
                      meta: {
                        currentFile: this.currentFile,
                        percent: s ? (E + 100 * (s - p - 1)) / s : 100
                      }
                    }))
              }),
              (L.prototype.openedSource = function (l) {
                ;(this.currentSourceOffset = this.bytesWritten),
                  (this.currentFile = l.file.name)
                var E = this.streamFiles && !l.file.dir
                if (E) {
                  var s = d(
                    l,
                    E,
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
                var E = this.streamFiles && !l.file.dir,
                  s = d(
                    l,
                    E,
                    !0,
                    this.currentSourceOffset,
                    this.zipPlatform,
                    this.encodeFileName
                  )
                if ((this.dirRecords.push(s.dirRecord), E))
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
                    this.push({ data: s.fileRecord, meta: { percent: 0 } });
                    this.contentBuffer.length;

                  )
                    this.push(this.contentBuffer.shift())
                this.currentFile = null
              }),
              (L.prototype.flush = function () {
                for (
                  var l = this.bytesWritten, E = 0;
                  E < this.dirRecords.length;
                  E++
                )
                  this.push({
                    data: this.dirRecords[E],
                    meta: { percent: 100 }
                  })
                var s = this.bytesWritten - l,
                  p = (function (f, g, U, I, A) {
                    var X = o.transformTo('string', A(I))
                    return (
                      y.CENTRAL_DIRECTORY_END +
                      '\0\0\0\0' +
                      _(f, 2) +
                      _(f, 2) +
                      _(g, 4) +
                      _(U, 4) +
                      _(X.length, 2) +
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
                var E = this
                return (
                  l.on('data', function (s) {
                    E.processChunk(s)
                  }),
                  l.on('end', function () {
                    E.closedSource(E.previous.streamInfo),
                      E._sources.length ? E.prepareNextSource() : E.end()
                  }),
                  l.on('error', function (s) {
                    E.error(s)
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
                var E = this._sources
                if (!h.prototype.error.call(this, l)) return !1
                for (var s = 0; s < E.length; s++)
                  try {
                    E[s].error(l)
                  } catch {}
                return !0
              }),
              (L.prototype.lock = function () {
                h.prototype.lock.call(this)
                for (var l = this._sources, E = 0; E < l.length; E++)
                  l[E].lock()
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
          function (N, B, v) {
            var _ = N('../compressions'),
              d = N('./ZipFileWorker')
            v.generateWorker = function (o, h, n) {
              var S = new d(h.streamFiles, n, h.platform, h.encodeFileName),
                y = 0
              try {
                o.forEach(function (L, l) {
                  y++
                  var E = (function (g, U) {
                      var I = g || U,
                        A = _[I]
                      if (!A)
                        throw new Error(
                          I + ' is not a valid compression method !'
                        )
                      return A
                    })(l.options.compression, h.compression),
                    s =
                      l.options.compressionOptions ||
                      h.compressionOptions ||
                      {},
                    p = l.dir,
                    f = l.date
                  l._compressWorker(E, s)
                    .withStreamInfo('file', {
                      name: L,
                      dir: p,
                      date: f,
                      comment: l.comment || '',
                      unixPermissions: l.unixPermissions,
                      dosPermissions: l.dosPermissions
                    })
                    .pipe(S)
                }),
                  (S.entriesCount = y)
              } catch (L) {
                S.error(L)
              }
              return S
            }
          },
          { '../compressions': 3, './ZipFileWorker': 8 }
        ],
        10: [
          function (N, B, v) {
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
                  for (var o in this)
                    typeof this[o] != 'function' && (d[o] = this[o])
                  return d
                })
            }
            ;((_.prototype = N('./object')).loadAsync = N('./load')),
              (_.support = N('./support')),
              (_.defaults = N('./defaults')),
              (_.version = '3.10.1'),
              (_.loadAsync = function (d, o) {
                return new _().loadAsync(d, o)
              }),
              (_.external = N('./external')),
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
          function (N, B, v) {
            var _ = N('./utils'),
              d = N('./external'),
              o = N('./utf8'),
              h = N('./zipEntries'),
              n = N('./stream/Crc32Probe'),
              S = N('./nodejsUtils')
            function y(L) {
              return new d.Promise(function (l, E) {
                var s = L.decompressed.getContentWorker().pipe(new n())
                s.on('error', function (p) {
                  E(p)
                })
                  .on('end', function () {
                    s.streamInfo.crc32 !== L.decompressed.crc32
                      ? E(new Error('Corrupted zip : CRC32 mismatch'))
                      : l()
                  })
                  .resume()
              })
            }
            B.exports = function (L, l) {
              var E = this
              return (
                (l = _.extend(l || {}, {
                  base64: !1,
                  checkCRC32: !1,
                  optimizedBinaryString: !1,
                  createFolders: !1,
                  decodeFileName: o.utf8decode
                })),
                S.isNode && S.isStream(L)
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
                      .then(function (s) {
                        var p = new h(l)
                        return p.load(s), p
                      })
                      .then(function (s) {
                        var p = [d.Promise.resolve(s)],
                          f = s.files
                        if (l.checkCRC32)
                          for (var g = 0; g < f.length; g++) p.push(y(f[g]))
                        return d.Promise.all(p)
                      })
                      .then(function (s) {
                        for (
                          var p = s.shift(), f = p.files, g = 0;
                          g < f.length;
                          g++
                        ) {
                          var U = f[g],
                            I = U.fileNameStr,
                            A = _.resolve(U.fileNameStr)
                          E.file(A, U.decompressed, {
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
                            U.dir || (E.file(A).unsafeOriginalName = I)
                        }
                        return (
                          p.zipComment.length && (E.comment = p.zipComment), E
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
          function (N, B, v) {
            var _ = N('../utils'),
              d = N('../stream/GenericWorker')
            function o(h, n) {
              d.call(this, 'Nodejs stream input adapter for ' + h),
                (this._upstreamEnded = !1),
                this._bindStream(n)
            }
            _.inherits(o, d),
              (o.prototype._bindStream = function (h) {
                var n = this
                ;(this._stream = h).pause(),
                  h
                    .on('data', function (S) {
                      n.push({ data: S, meta: { percent: 0 } })
                    })
                    .on('error', function (S) {
                      n.isPaused ? (this.generatedError = S) : n.error(S)
                    })
                    .on('end', function () {
                      n.isPaused ? (n._upstreamEnded = !0) : n.end()
                    })
              }),
              (o.prototype.pause = function () {
                return (
                  !!d.prototype.pause.call(this) && (this._stream.pause(), !0)
                )
              }),
              (o.prototype.resume = function () {
                return (
                  !!d.prototype.resume.call(this) &&
                  (this._upstreamEnded ? this.end() : this._stream.resume(), !0)
                )
              }),
              (B.exports = o)
          },
          { '../stream/GenericWorker': 28, '../utils': 32 }
        ],
        13: [
          function (N, B, v) {
            var _ = N('readable-stream').Readable
            function d(o, h, n) {
              _.call(this, h), (this._helper = o)
              var S = this
              o.on('data', function (y, L) {
                S.push(y) || S._helper.pause(), n && n(L)
              })
                .on('error', function (y) {
                  S.emit('error', y)
                })
                .on('end', function () {
                  S.push(null)
                })
            }
            N('../utils').inherits(d, _),
              (d.prototype._read = function () {
                this._helper.resume()
              }),
              (B.exports = d)
          },
          { '../utils': 32, 'readable-stream': 16 }
        ],
        14: [
          function (N, B, v) {
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
          function (N, B, v) {
            function _(A, X, G) {
              var K,
                z = o.getTypeOf(X),
                Q = o.extend(G || {}, S)
              ;(Q.date = Q.date || new Date()),
                Q.compression !== null &&
                  (Q.compression = Q.compression.toUpperCase()),
                typeof Q.unixPermissions == 'string' &&
                  (Q.unixPermissions = parseInt(Q.unixPermissions, 8)),
                Q.unixPermissions && 16384 & Q.unixPermissions && (Q.dir = !0),
                Q.dosPermissions && 16 & Q.dosPermissions && (Q.dir = !0),
                Q.dir && (A = f(A)),
                Q.createFolders && (K = p(A)) && g.call(this, K, !0)
              var ot = z === 'string' && Q.binary === !1 && Q.base64 === !1
              ;(G && G.binary !== void 0) || (Q.binary = !ot),
                ((X instanceof y && X.uncompressedSize === 0) ||
                  Q.dir ||
                  !X ||
                  X.length === 0) &&
                  ((Q.base64 = !1),
                  (Q.binary = !0),
                  (X = ''),
                  (Q.compression = 'STORE'),
                  (z = 'string'))
              var w = null
              w =
                X instanceof y || X instanceof h
                  ? X
                  : E.isNode && E.isStream(X)
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
            var d = N('./utf8'),
              o = N('./utils'),
              h = N('./stream/GenericWorker'),
              n = N('./stream/StreamHelper'),
              S = N('./defaults'),
              y = N('./compressedObject'),
              L = N('./zipObject'),
              l = N('./generate'),
              E = N('./nodejsUtils'),
              s = N('./nodejs/NodejsStreamInputAdapter'),
              p = function (A) {
                A.slice(-1) === '/' && (A = A.substring(0, A.length - 1))
                var X = A.lastIndexOf('/')
                return 0 < X ? A.substring(0, X) : ''
              },
              f = function (A) {
                return A.slice(-1) !== '/' && (A += '/'), A
              },
              g = function (A, X) {
                return (
                  (X = X !== void 0 ? X : S.createFolders),
                  (A = f(A)),
                  this.files[A] ||
                    _.call(this, A, null, { dir: !0, createFolders: X }),
                  this.files[A]
                )
              }
            function U(A) {
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
                  return (A = this.root + A), _.call(this, A, X, G), this
                if (U(A)) {
                  var K = A
                  return this.filter(function (Q, ot) {
                    return !ot.dir && K.test(Q)
                  })
                }
                var z = this.files[this.root + A]
                return z && !z.dir ? z : null
              },
              folder: function (A) {
                if (!A) return this
                if (U(A))
                  return this.filter(function (z, Q) {
                    return Q.dir && A.test(z)
                  })
                var X = this.root + A,
                  G = g.call(this, X),
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
                    var G = this.filter(function (z, Q) {
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
                      encodeFileName: d.utf8encode
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
                } catch (z) {
                  ;(X = new h('error')).error(z)
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
            B.exports = I
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
          function (N, B, v) {
            B.exports = N('stream')
          },
          { stream: void 0 }
        ],
        17: [
          function (N, B, v) {
            var _ = N('./DataReader')
            function d(o) {
              _.call(this, o)
              for (var h = 0; h < this.data.length; h++) o[h] = 255 & o[h]
            }
            N('../utils').inherits(d, _),
              (d.prototype.byteAt = function (o) {
                return this.data[this.zero + o]
              }),
              (d.prototype.lastIndexOfSignature = function (o) {
                for (
                  var h = o.charCodeAt(0),
                    n = o.charCodeAt(1),
                    S = o.charCodeAt(2),
                    y = o.charCodeAt(3),
                    L = this.length - 4;
                  0 <= L;
                  --L
                )
                  if (
                    this.data[L] === h &&
                    this.data[L + 1] === n &&
                    this.data[L + 2] === S &&
                    this.data[L + 3] === y
                  )
                    return L - this.zero
                return -1
              }),
              (d.prototype.readAndCheckSignature = function (o) {
                var h = o.charCodeAt(0),
                  n = o.charCodeAt(1),
                  S = o.charCodeAt(2),
                  y = o.charCodeAt(3),
                  L = this.readData(4)
                return h === L[0] && n === L[1] && S === L[2] && y === L[3]
              }),
              (d.prototype.readData = function (o) {
                if ((this.checkOffset(o), o === 0)) return []
                var h = this.data.slice(
                  this.zero + this.index,
                  this.zero + this.index + o
                )
                return (this.index += o), h
              }),
              (B.exports = d)
          },
          { '../utils': 32, './DataReader': 18 }
        ],
        18: [
          function (N, B, v) {
            var _ = N('../utils')
            function d(o) {
              ;(this.data = o),
                (this.length = o.length),
                (this.index = 0),
                (this.zero = 0)
            }
            ;(d.prototype = {
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
                var h,
                  n = 0
                for (
                  this.checkOffset(o), h = this.index + o - 1;
                  h >= this.index;
                  h--
                )
                  n = (n << 8) + this.byteAt(h)
                return (this.index += o), n
              },
              readString: function (o) {
                return _.transformTo('string', this.readData(o))
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
              (B.exports = d)
          },
          { '../utils': 32 }
        ],
        19: [
          function (N, B, v) {
            var _ = N('./Uint8ArrayReader')
            function d(o) {
              _.call(this, o)
            }
            N('../utils').inherits(d, _),
              (d.prototype.readData = function (o) {
                this.checkOffset(o)
                var h = this.data.slice(
                  this.zero + this.index,
                  this.zero + this.index + o
                )
                return (this.index += o), h
              }),
              (B.exports = d)
          },
          { '../utils': 32, './Uint8ArrayReader': 21 }
        ],
        20: [
          function (N, B, v) {
            var _ = N('./DataReader')
            function d(o) {
              _.call(this, o)
            }
            N('../utils').inherits(d, _),
              (d.prototype.byteAt = function (o) {
                return this.data.charCodeAt(this.zero + o)
              }),
              (d.prototype.lastIndexOfSignature = function (o) {
                return this.data.lastIndexOf(o) - this.zero
              }),
              (d.prototype.readAndCheckSignature = function (o) {
                return o === this.readData(4)
              }),
              (d.prototype.readData = function (o) {
                this.checkOffset(o)
                var h = this.data.slice(
                  this.zero + this.index,
                  this.zero + this.index + o
                )
                return (this.index += o), h
              }),
              (B.exports = d)
          },
          { '../utils': 32, './DataReader': 18 }
        ],
        21: [
          function (N, B, v) {
            var _ = N('./ArrayReader')
            function d(o) {
              _.call(this, o)
            }
            N('../utils').inherits(d, _),
              (d.prototype.readData = function (o) {
                if ((this.checkOffset(o), o === 0)) return new Uint8Array(0)
                var h = this.data.subarray(
                  this.zero + this.index,
                  this.zero + this.index + o
                )
                return (this.index += o), h
              }),
              (B.exports = d)
          },
          { '../utils': 32, './ArrayReader': 17 }
        ],
        22: [
          function (N, B, v) {
            var _ = N('../utils'),
              d = N('../support'),
              o = N('./ArrayReader'),
              h = N('./StringReader'),
              n = N('./NodeBufferReader'),
              S = N('./Uint8ArrayReader')
            B.exports = function (y) {
              var L = _.getTypeOf(y)
              return (
                _.checkSupport(L),
                L !== 'string' || d.uint8array
                  ? L === 'nodebuffer'
                    ? new n(y)
                    : d.uint8array
                    ? new S(_.transformTo('uint8array', y))
                    : new o(_.transformTo('array', y))
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
          function (N, B, v) {
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
          function (N, B, v) {
            var _ = N('./GenericWorker'),
              d = N('../utils')
            function o(h) {
              _.call(this, 'ConvertWorker to ' + h), (this.destType = h)
            }
            d.inherits(o, _),
              (o.prototype.processChunk = function (h) {
                this.push({
                  data: d.transformTo(this.destType, h.data),
                  meta: h.meta
                })
              }),
              (B.exports = o)
          },
          { '../utils': 32, './GenericWorker': 28 }
        ],
        25: [
          function (N, B, v) {
            var _ = N('./GenericWorker'),
              d = N('../crc32')
            function o() {
              _.call(this, 'Crc32Probe'), this.withStreamInfo('crc32', 0)
            }
            N('../utils').inherits(o, _),
              (o.prototype.processChunk = function (h) {
                ;(this.streamInfo.crc32 = d(
                  h.data,
                  this.streamInfo.crc32 || 0
                )),
                  this.push(h)
              }),
              (B.exports = o)
          },
          { '../crc32': 4, '../utils': 32, './GenericWorker': 28 }
        ],
        26: [
          function (N, B, v) {
            var _ = N('../utils'),
              d = N('./GenericWorker')
            function o(h) {
              d.call(this, 'DataLengthProbe for ' + h),
                (this.propName = h),
                this.withStreamInfo(h, 0)
            }
            _.inherits(o, d),
              (o.prototype.processChunk = function (h) {
                if (h) {
                  var n = this.streamInfo[this.propName] || 0
                  this.streamInfo[this.propName] = n + h.data.length
                }
                d.prototype.processChunk.call(this, h)
              }),
              (B.exports = o)
          },
          { '../utils': 32, './GenericWorker': 28 }
        ],
        27: [
          function (N, B, v) {
            var _ = N('../utils'),
              d = N('./GenericWorker')
            function o(h) {
              d.call(this, 'DataWorker')
              var n = this
              ;(this.dataIsReady = !1),
                (this.index = 0),
                (this.max = 0),
                (this.data = null),
                (this.type = ''),
                (this._tickScheduled = !1),
                h.then(
                  function (S) {
                    ;(n.dataIsReady = !0),
                      (n.data = S),
                      (n.max = (S && S.length) || 0),
                      (n.type = _.getTypeOf(S)),
                      n.isPaused || n._tickAndRepeat()
                  },
                  function (S) {
                    n.error(S)
                  }
                )
            }
            _.inherits(o, d),
              (o.prototype.cleanUp = function () {
                d.prototype.cleanUp.call(this), (this.data = null)
              }),
              (o.prototype.resume = function () {
                return (
                  !!d.prototype.resume.call(this) &&
                  (!this._tickScheduled &&
                    this.dataIsReady &&
                    ((this._tickScheduled = !0),
                    _.delay(this._tickAndRepeat, [], this)),
                  !0)
                )
              }),
              (o.prototype._tickAndRepeat = function () {
                ;(this._tickScheduled = !1),
                  this.isPaused ||
                    this.isFinished ||
                    (this._tick(),
                    this.isFinished ||
                      (_.delay(this._tickAndRepeat, [], this),
                      (this._tickScheduled = !0)))
              }),
              (o.prototype._tick = function () {
                if (this.isPaused || this.isFinished) return !1
                var h = null,
                  n = Math.min(this.max, this.index + 16384)
                if (this.index >= this.max) return this.end()
                switch (this.type) {
                  case 'string':
                    h = this.data.substring(this.index, n)
                    break
                  case 'uint8array':
                    h = this.data.subarray(this.index, n)
                    break
                  case 'array':
                  case 'nodebuffer':
                    h = this.data.slice(this.index, n)
                }
                return (
                  (this.index = n),
                  this.push({
                    data: h,
                    meta: {
                      percent: this.max ? (this.index / this.max) * 100 : 0
                    }
                  })
                )
              }),
              (B.exports = o)
          },
          { '../utils': 32, './GenericWorker': 28 }
        ],
        28: [
          function (N, B, v) {
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
              on: function (d, o) {
                return this._listeners[d].push(o), this
              },
              cleanUp: function () {
                ;(this.streamInfo =
                  this.generatedError =
                  this.extraStreamInfo =
                    null),
                  (this._listeners = [])
              },
              emit: function (d, o) {
                if (this._listeners[d])
                  for (var h = 0; h < this._listeners[d].length; h++)
                    this._listeners[d][h].call(this, o)
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
                var o = this
                return (
                  d.on('data', function (h) {
                    o.processChunk(h)
                  }),
                  d.on('end', function () {
                    o.end()
                  }),
                  d.on('error', function (h) {
                    o.error(h)
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
              withStreamInfo: function (d, o) {
                return (
                  (this.extraStreamInfo[d] = o), this.mergeStreamInfo(), this
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
          function (N, B, v) {
            var _ = N('../utils'),
              d = N('./ConvertWorker'),
              o = N('./GenericWorker'),
              h = N('../base64'),
              n = N('../support'),
              S = N('../external'),
              y = null
            if (n.nodestream)
              try {
                y = N('../nodejs/NodejsStreamOutputAdapter')
              } catch {}
            function L(E, s) {
              return new S.Promise(function (p, f) {
                var g = [],
                  U = E._internalType,
                  I = E._outputType,
                  A = E._mimeType
                E.on('data', function (X, G) {
                  g.push(X), s && s(G)
                })
                  .on('error', function (X) {
                    ;(g = []), f(X)
                  })
                  .on('end', function () {
                    try {
                      var X = (function (G, K, z) {
                        switch (G) {
                          case 'blob':
                            return _.newBlob(_.transformTo('arraybuffer', K), z)
                          case 'base64':
                            return h.encode(K)
                          default:
                            return _.transformTo(G, K)
                        }
                      })(
                        I,
                        (function (G, K) {
                          var z,
                            Q = 0,
                            ot = null,
                            w = 0
                          for (z = 0; z < K.length; z++) w += K[z].length
                          switch (G) {
                            case 'string':
                              return K.join('')
                            case 'array':
                              return Array.prototype.concat.apply([], K)
                            case 'uint8array':
                              for (
                                ot = new Uint8Array(w), z = 0;
                                z < K.length;
                                z++
                              )
                                ot.set(K[z], Q), (Q += K[z].length)
                              return ot
                            case 'nodebuffer':
                              return Buffer.concat(K)
                            default:
                              throw new Error(
                                "concat : unsupported type '" + G + "'"
                              )
                          }
                        })(U, g),
                        A
                      )
                      p(X)
                    } catch (G) {
                      f(G)
                    }
                    g = []
                  })
                  .resume()
              })
            }
            function l(E, s, p) {
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
                  _.checkSupport(f),
                  (this._worker = E.pipe(new d(f))),
                  E.lock()
              } catch (g) {
                ;(this._worker = new o('error')), this._worker.error(g)
              }
            }
            ;(l.prototype = {
              accumulate: function (E) {
                return L(this, E)
              },
              on: function (E, s) {
                var p = this
                return (
                  E === 'data'
                    ? this._worker.on(E, function (f) {
                        s.call(p, f.data, f.meta)
                      })
                    : this._worker.on(E, function () {
                        _.delay(s, arguments, p)
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
              toNodejsStream: function (E) {
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
                  E
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
          function (N, B, v) {
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
              v.nodestream = !!N('readable-stream').Readable
            } catch {
              v.nodestream = !1
            }
          },
          { 'readable-stream': 16 }
        ],
        31: [
          function (N, B, v) {
            for (
              var _ = N('./utils'),
                d = N('./support'),
                o = N('./nodejsUtils'),
                h = N('./stream/GenericWorker'),
                n = new Array(256),
                S = 0;
              S < 256;
              S++
            )
              n[S] =
                252 <= S
                  ? 6
                  : 248 <= S
                  ? 5
                  : 240 <= S
                  ? 4
                  : 224 <= S
                  ? 3
                  : 192 <= S
                  ? 2
                  : 1
            n[254] = n[254] = 1
            function y() {
              h.call(this, 'utf-8 decode'), (this.leftOver = null)
            }
            function L() {
              h.call(this, 'utf-8 encode')
            }
            ;(v.utf8encode = function (l) {
              return d.nodebuffer
                ? o.newBufferFrom(l, 'utf-8')
                : (function (E) {
                    var s,
                      p,
                      f,
                      g,
                      U,
                      I = E.length,
                      A = 0
                    for (g = 0; g < I; g++)
                      (64512 & (p = E.charCodeAt(g))) == 55296 &&
                        g + 1 < I &&
                        (64512 & (f = E.charCodeAt(g + 1))) == 56320 &&
                        ((p = 65536 + ((p - 55296) << 10) + (f - 56320)), g++),
                        (A += p < 128 ? 1 : p < 2048 ? 2 : p < 65536 ? 3 : 4)
                    for (
                      s = d.uint8array ? new Uint8Array(A) : new Array(A),
                        g = U = 0;
                      U < A;
                      g++
                    )
                      (64512 & (p = E.charCodeAt(g))) == 55296 &&
                        g + 1 < I &&
                        (64512 & (f = E.charCodeAt(g + 1))) == 56320 &&
                        ((p = 65536 + ((p - 55296) << 10) + (f - 56320)), g++),
                        p < 128
                          ? (s[U++] = p)
                          : (p < 2048
                              ? (s[U++] = 192 | (p >>> 6))
                              : (p < 65536
                                  ? (s[U++] = 224 | (p >>> 12))
                                  : ((s[U++] = 240 | (p >>> 18)),
                                    (s[U++] = 128 | ((p >>> 12) & 63))),
                                (s[U++] = 128 | ((p >>> 6) & 63))),
                            (s[U++] = 128 | (63 & p)))
                    return s
                  })(l)
            }),
              (v.utf8decode = function (l) {
                return d.nodebuffer
                  ? _.transformTo('nodebuffer', l).toString('utf-8')
                  : (function (E) {
                      var s,
                        p,
                        f,
                        g,
                        U = E.length,
                        I = new Array(2 * U)
                      for (s = p = 0; s < U; )
                        if ((f = E[s++]) < 128) I[p++] = f
                        else if (4 < (g = n[f])) (I[p++] = 65533), (s += g - 1)
                        else {
                          for (
                            f &= g === 2 ? 31 : g === 3 ? 15 : 7;
                            1 < g && s < U;

                          )
                            (f = (f << 6) | (63 & E[s++])), g--
                          1 < g
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
                        _.applyFromCharCode(I)
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
                var E = _.transformTo(
                  d.uint8array ? 'uint8array' : 'array',
                  l.data
                )
                if (this.leftOver && this.leftOver.length) {
                  if (d.uint8array) {
                    var s = E
                    ;(E = new Uint8Array(s.length + this.leftOver.length)).set(
                      this.leftOver,
                      0
                    ),
                      E.set(s, this.leftOver.length)
                  } else E = this.leftOver.concat(E)
                  this.leftOver = null
                }
                var p = (function (g, U) {
                    var I
                    for (
                      (U = U || g.length) > g.length && (U = g.length),
                        I = U - 1;
                      0 <= I && (192 & g[I]) == 128;

                    )
                      I--
                    return I < 0 || I === 0 ? U : I + n[g[I]] > U ? I : U
                  })(E),
                  f = E
                p !== E.length &&
                  (d.uint8array
                    ? ((f = E.subarray(0, p)),
                      (this.leftOver = E.subarray(p, E.length)))
                    : ((f = E.slice(0, p)),
                      (this.leftOver = E.slice(p, E.length)))),
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
          function (N, B, v) {
            var _ = N('./support'),
              d = N('./base64'),
              o = N('./nodejsUtils'),
              h = N('./external')
            function n(s) {
              return s
            }
            function S(s, p) {
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
                var g = [],
                  U = 0,
                  I = s.length
                if (I <= f) return String.fromCharCode.apply(null, s)
                for (; U < I; )
                  p === 'array' || p === 'nodebuffer'
                    ? g.push(
                        String.fromCharCode.apply(
                          null,
                          s.slice(U, Math.min(U + f, I))
                        )
                      )
                    : g.push(
                        String.fromCharCode.apply(
                          null,
                          s.subarray(U, Math.min(U + f, I))
                        )
                      ),
                    (U += f)
                return g.join('')
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
                g = !0
              if (
                (f === 'uint8array'
                  ? (g = y.applyCanBeUsed.uint8array)
                  : f === 'nodebuffer' && (g = y.applyCanBeUsed.nodebuffer),
                g)
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
            var E = {}
            ;(E.string = {
              string: n,
              array: function (s) {
                return S(s, new Array(s.length))
              },
              arraybuffer: function (s) {
                return E.string.uint8array(s).buffer
              },
              uint8array: function (s) {
                return S(s, new Uint8Array(s.length))
              },
              nodebuffer: function (s) {
                return S(s, o.allocBuffer(s.length))
              }
            }),
              (E.array = {
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
              (E.arraybuffer = {
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
              (E.uint8array = {
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
              (E.nodebuffer = {
                string: L,
                array: function (s) {
                  return l(s, new Array(s.length))
                },
                arraybuffer: function (s) {
                  return E.nodebuffer.uint8array(s).buffer
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
                return E[f][s](p)
              }),
              (v.resolve = function (s) {
                for (var p = s.split('/'), f = [], g = 0; g < p.length; g++) {
                  var U = p[g]
                  U === '.' ||
                    (U === '' && g !== 0 && g !== p.length - 1) ||
                    (U === '..' ? f.pop() : f.push(U))
                }
                return f.join('/')
              }),
              (v.getTypeOf = function (s) {
                return typeof s == 'string'
                  ? 'string'
                  : Object.prototype.toString.call(s) === '[object Array]'
                  ? 'array'
                  : _.nodebuffer && o.isBuffer(s)
                  ? 'nodebuffer'
                  : _.uint8array && s instanceof Uint8Array
                  ? 'uint8array'
                  : _.arraybuffer && s instanceof ArrayBuffer
                  ? 'arraybuffer'
                  : void 0
              }),
              (v.checkSupport = function (s) {
                if (!_[s.toLowerCase()])
                  throw new Error(s + ' is not supported by this platform')
              }),
              (v.MAX_VALUE_16BITS = 65535),
              (v.MAX_VALUE_32BITS = -1),
              (v.pretty = function (s) {
                var p,
                  f,
                  g = ''
                for (f = 0; f < (s || '').length; f++)
                  g +=
                    '\\x' +
                    ((p = s.charCodeAt(f)) < 16 ? '0' : '') +
                    p.toString(16).toUpperCase()
                return g
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
              (v.prepareContent = function (s, p, f, g, U) {
                return h.Promise.resolve(p)
                  .then(function (I) {
                    return _.blob &&
                      (I instanceof Blob ||
                        ['[object File]', '[object Blob]'].indexOf(
                          Object.prototype.toString.call(I)
                        ) !== -1) &&
                      typeof FileReader < 'u'
                      ? new h.Promise(function (A, X) {
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
                            (U
                              ? (I = d.decode(I))
                              : f &&
                                g !== !0 &&
                                (I = (function (X) {
                                  return S(
                                    X,
                                    _.uint8array
                                      ? new Uint8Array(X.length)
                                      : new Array(X.length)
                                  )
                                })(I))),
                        I)
                      : h.Promise.reject(
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
          function (N, B, v) {
            var _ = N('./reader/readerFor'),
              d = N('./utils'),
              o = N('./signature'),
              h = N('./zipEntry'),
              n = N('./support')
            function S(y) {
              ;(this.files = []), (this.loadOptions = y)
            }
            ;(S.prototype = {
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
                var E = this.reader.readString(4) === L
                return this.reader.setIndex(l), E
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
                for (var y, L, l, E = this.zip64EndOfCentralSize - 44; 0 < E; )
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
                var E = L - l
                if (0 < E)
                  this.isSignature(L, o.CENTRAL_FILE_HEADER) ||
                    (this.reader.zero = E)
                else if (E < 0)
                  throw new Error(
                    'Corrupted zip: missing ' + Math.abs(E) + ' bytes.'
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
              (B.exports = S)
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
          function (N, B, v) {
            var _ = N('./reader/readerFor'),
              d = N('./utils'),
              o = N('./compressedObject'),
              h = N('./crc32'),
              n = N('./utf8'),
              S = N('./compressions'),
              y = N('./support')
            function L(l, E) {
              ;(this.options = l), (this.loadOptions = E)
            }
            ;(L.prototype = {
              isEncrypted: function () {
                return (1 & this.bitFlag) == 1
              },
              useUTF8: function () {
                return (2048 & this.bitFlag) == 2048
              },
              readLocalPart: function (l) {
                var E, s
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
                  (E = (function (p) {
                    for (var f in S)
                      if (
                        Object.prototype.hasOwnProperty.call(S, f) &&
                        S[f].magic === p
                      )
                        return S[f]
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
                this.decompressed = new o(
                  this.compressedSize,
                  this.uncompressedSize,
                  this.crc32,
                  E,
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
                var E = l.readInt(2)
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
                l.skip(E),
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
                var E,
                  s,
                  p,
                  f = l.index + this.extraFieldsLength
                for (
                  this.extraFields || (this.extraFields = {});
                  l.index + 4 < f;

                )
                  (E = l.readInt(2)),
                    (s = l.readInt(2)),
                    (p = l.readData(s)),
                    (this.extraFields[E] = { id: E, length: s, value: p })
                l.setIndex(f)
              },
              handleUTF8: function () {
                var l = y.uint8array ? 'uint8array' : 'array'
                if (this.useUTF8())
                  (this.fileNameStr = n.utf8decode(this.fileName)),
                    (this.fileCommentStr = n.utf8decode(this.fileComment))
                else {
                  var E = this.findExtraFieldUnicodePath()
                  if (E !== null) this.fileNameStr = E
                  else {
                    var s = d.transformTo(l, this.fileName)
                    this.fileNameStr = this.loadOptions.decodeFileName(s)
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
                  var E = _(l.value)
                  return E.readInt(1) !== 1 || h(this.fileName) !== E.readInt(4)
                    ? null
                    : n.utf8decode(E.readData(l.length - 5))
                }
                return null
              },
              findExtraFieldUnicodeComment: function () {
                var l = this.extraFields[25461]
                if (l) {
                  var E = _(l.value)
                  return E.readInt(1) !== 1 ||
                    h(this.fileComment) !== E.readInt(4)
                    ? null
                    : n.utf8decode(E.readData(l.length - 5))
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
          function (N, B, v) {
            function _(E, s, p) {
              ;(this.name = E),
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
            var d = N('./stream/StreamHelper'),
              o = N('./stream/DataWorker'),
              h = N('./utf8'),
              n = N('./compressedObject'),
              S = N('./stream/GenericWorker')
            _.prototype = {
              internalStream: function (E) {
                var s = null,
                  p = 'string'
                try {
                  if (!E) throw new Error('No output type specified.')
                  var f = (p = E.toLowerCase()) === 'string' || p === 'text'
                  ;(p !== 'binarystring' && p !== 'text') || (p = 'string'),
                    (s = this._decompressWorker())
                  var g = !this._dataBinary
                  g && !f && (s = s.pipe(new h.Utf8EncodeWorker())),
                    !g && f && (s = s.pipe(new h.Utf8DecodeWorker()))
                } catch (U) {
                  ;(s = new S('error')).error(U)
                }
                return new d(s, p, '')
              },
              async: function (E, s) {
                return this.internalStream(E).accumulate(s)
              },
              nodeStream: function (E, s) {
                return this.internalStream(E || 'nodebuffer').toNodejsStream(s)
              },
              _compressWorker: function (E, s) {
                if (
                  this._data instanceof n &&
                  this._data.compression.magic === E.magic
                )
                  return this._data.getCompressedWorker()
                var p = this._decompressWorker()
                return (
                  this._dataBinary || (p = p.pipe(new h.Utf8EncodeWorker())),
                  n.createWorkerFrom(p, E, s)
                )
              },
              _decompressWorker: function () {
                return this._data instanceof n
                  ? this._data.getContentWorker()
                  : this._data instanceof S
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
          function (N, B, v) {
            ;(function (_) {
              var d,
                o,
                h = _.MutationObserver || _.WebKitMutationObserver
              if (h) {
                var n = 0,
                  S = new h(E),
                  y = _.document.createTextNode('')
                S.observe(y, { characterData: !0 }),
                  (d = function () {
                    y.data = n = ++n % 2
                  })
              } else if (_.setImmediate || _.MessageChannel === void 0)
                d =
                  'document' in _ &&
                  'onreadystatechange' in _.document.createElement('script')
                    ? function () {
                        var s = _.document.createElement('script')
                        ;(s.onreadystatechange = function () {
                          E(),
                            (s.onreadystatechange = null),
                            s.parentNode.removeChild(s),
                            (s = null)
                        }),
                          _.document.documentElement.appendChild(s)
                      }
                    : function () {
                        setTimeout(E, 0)
                      }
              else {
                var L = new _.MessageChannel()
                ;(L.port1.onmessage = E),
                  (d = function () {
                    L.port2.postMessage(0)
                  })
              }
              var l = []
              function E() {
                var s, p
                o = !0
                for (var f = l.length; f; ) {
                  for (p = l, l = [], s = -1; ++s < f; ) p[s]()
                  f = l.length
                }
                o = !1
              }
              B.exports = function (s) {
                l.push(s) !== 1 || o || d()
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
          function (N, B, v) {
            var _ = N('immediate')
            function d() {}
            var o = {},
              h = ['REJECTED'],
              n = ['FULFILLED'],
              S = ['PENDING']
            function y(f) {
              if (typeof f != 'function')
                throw new TypeError('resolver must be a function')
              ;(this.state = S),
                (this.queue = []),
                (this.outcome = void 0),
                f !== d && s(this, f)
            }
            function L(f, g, U) {
              ;(this.promise = f),
                typeof g == 'function' &&
                  ((this.onFulfilled = g),
                  (this.callFulfilled = this.otherCallFulfilled)),
                typeof U == 'function' &&
                  ((this.onRejected = U),
                  (this.callRejected = this.otherCallRejected))
            }
            function l(f, g, U) {
              _(function () {
                var I
                try {
                  I = g(U)
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
            function E(f) {
              var g = f && f.then
              if (
                f &&
                (typeof f == 'object' || typeof f == 'function') &&
                typeof g == 'function'
              )
                return function () {
                  g.apply(f, arguments)
                }
            }
            function s(f, g) {
              var U = !1
              function I(G) {
                U || ((U = !0), o.reject(f, G))
              }
              function A(G) {
                U || ((U = !0), o.resolve(f, G))
              }
              var X = p(function () {
                g(A, I)
              })
              X.status === 'error' && I(X.value)
            }
            function p(f, g) {
              var U = {}
              try {
                ;(U.value = f(g)), (U.status = 'success')
              } catch (I) {
                ;(U.status = 'error'), (U.value = I)
              }
              return U
            }
            ;((B.exports = y).prototype.finally = function (f) {
              if (typeof f != 'function') return this
              var g = this.constructor
              return this.then(
                function (U) {
                  return g.resolve(f()).then(function () {
                    return U
                  })
                },
                function (U) {
                  return g.resolve(f()).then(function () {
                    throw U
                  })
                }
              )
            }),
              (y.prototype.catch = function (f) {
                return this.then(null, f)
              }),
              (y.prototype.then = function (f, g) {
                if (
                  (typeof f != 'function' && this.state === n) ||
                  (typeof g != 'function' && this.state === h)
                )
                  return this
                var U = new this.constructor(d)
                return (
                  this.state !== S
                    ? l(U, this.state === n ? f : g, this.outcome)
                    : this.queue.push(new L(U, f, g)),
                  U
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
              (o.resolve = function (f, g) {
                var U = p(E, g)
                if (U.status === 'error') return o.reject(f, U.value)
                var I = U.value
                if (I) s(f, I)
                else {
                  ;(f.state = n), (f.outcome = g)
                  for (var A = -1, X = f.queue.length; ++A < X; )
                    f.queue[A].callFulfilled(g)
                }
                return f
              }),
              (o.reject = function (f, g) {
                ;(f.state = h), (f.outcome = g)
                for (var U = -1, I = f.queue.length; ++U < I; )
                  f.queue[U].callRejected(g)
                return f
              }),
              (y.resolve = function (f) {
                return f instanceof this ? f : o.resolve(new this(d), f)
              }),
              (y.reject = function (f) {
                var g = new this(d)
                return o.reject(g, f)
              }),
              (y.all = function (f) {
                var g = this
                if (Object.prototype.toString.call(f) !== '[object Array]')
                  return this.reject(new TypeError('must be an array'))
                var U = f.length,
                  I = !1
                if (!U) return this.resolve([])
                for (
                  var A = new Array(U), X = 0, G = -1, K = new this(d);
                  ++G < U;

                )
                  z(f[G], G)
                return K
                function z(Q, ot) {
                  g.resolve(Q).then(
                    function (w) {
                      ;(A[ot] = w),
                        ++X !== U || I || ((I = !0), o.resolve(K, A))
                    },
                    function (w) {
                      I || ((I = !0), o.reject(K, w))
                    }
                  )
                }
              }),
              (y.race = function (f) {
                var g = this
                if (Object.prototype.toString.call(f) !== '[object Array]')
                  return this.reject(new TypeError('must be an array'))
                var U = f.length,
                  I = !1
                if (!U) return this.resolve([])
                for (var A = -1, X = new this(d); ++A < U; )
                  (G = f[A]),
                    g.resolve(G).then(
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
          function (N, B, v) {
            var _ = {}
            ;(0, N('./lib/utils/common').assign)(
              _,
              N('./lib/deflate'),
              N('./lib/inflate'),
              N('./lib/zlib/constants')
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
          function (N, B, v) {
            var _ = N('./zlib/deflate'),
              d = N('./utils/common'),
              o = N('./utils/strings'),
              h = N('./zlib/messages'),
              n = N('./zlib/zstream'),
              S = Object.prototype.toString,
              y = 0,
              L = -1,
              l = 0,
              E = 8
            function s(f) {
              if (!(this instanceof s)) return new s(f)
              this.options = d.assign(
                {
                  level: L,
                  method: E,
                  chunkSize: 16384,
                  windowBits: 15,
                  memLevel: 8,
                  strategy: l,
                  to: ''
                },
                f || {}
              )
              var g = this.options
              g.raw && 0 < g.windowBits
                ? (g.windowBits = -g.windowBits)
                : g.gzip &&
                  0 < g.windowBits &&
                  g.windowBits < 16 &&
                  (g.windowBits += 16),
                (this.err = 0),
                (this.msg = ''),
                (this.ended = !1),
                (this.chunks = []),
                (this.strm = new n()),
                (this.strm.avail_out = 0)
              var U = _.deflateInit2(
                this.strm,
                g.level,
                g.method,
                g.windowBits,
                g.memLevel,
                g.strategy
              )
              if (U !== y) throw new Error(h[U])
              if (
                (g.header && _.deflateSetHeader(this.strm, g.header),
                g.dictionary)
              ) {
                var I
                if (
                  ((I =
                    typeof g.dictionary == 'string'
                      ? o.string2buf(g.dictionary)
                      : S.call(g.dictionary) === '[object ArrayBuffer]'
                      ? new Uint8Array(g.dictionary)
                      : g.dictionary),
                  (U = _.deflateSetDictionary(this.strm, I)) !== y)
                )
                  throw new Error(h[U])
                this._dict_set = !0
              }
            }
            function p(f, g) {
              var U = new s(g)
              if ((U.push(f, !0), U.err)) throw U.msg || h[U.err]
              return U.result
            }
            ;(s.prototype.push = function (f, g) {
              var U,
                I,
                A = this.strm,
                X = this.options.chunkSize
              if (this.ended) return !1
              ;(I = g === ~~g ? g : g === !0 ? 4 : 0),
                typeof f == 'string'
                  ? (A.input = o.string2buf(f))
                  : S.call(f) === '[object ArrayBuffer]'
                  ? (A.input = new Uint8Array(f))
                  : (A.input = f),
                (A.next_in = 0),
                (A.avail_in = A.input.length)
              do {
                if (
                  (A.avail_out === 0 &&
                    ((A.output = new d.Buf8(X)),
                    (A.next_out = 0),
                    (A.avail_out = X)),
                  (U = _.deflate(A, I)) !== 1 && U !== y)
                )
                  return this.onEnd(U), !(this.ended = !0)
                ;(A.avail_out !== 0 &&
                  (A.avail_in !== 0 || (I !== 4 && I !== 2))) ||
                  (this.options.to === 'string'
                    ? this.onData(
                        o.buf2binstring(d.shrinkBuf(A.output, A.next_out))
                      )
                    : this.onData(d.shrinkBuf(A.output, A.next_out)))
              } while ((0 < A.avail_in || A.avail_out === 0) && U !== 1)
              return I === 4
                ? ((U = _.deflateEnd(this.strm)),
                  this.onEnd(U),
                  (this.ended = !0),
                  U === y)
                : I !== 2 || (this.onEnd(y), !(A.avail_out = 0))
            }),
              (s.prototype.onData = function (f) {
                this.chunks.push(f)
              }),
              (s.prototype.onEnd = function (f) {
                f === y &&
                  (this.options.to === 'string'
                    ? (this.result = this.chunks.join(''))
                    : (this.result = d.flattenChunks(this.chunks))),
                  (this.chunks = []),
                  (this.err = f),
                  (this.msg = this.strm.msg)
              }),
              (v.Deflate = s),
              (v.deflate = p),
              (v.deflateRaw = function (f, g) {
                return ((g = g || {}).raw = !0), p(f, g)
              }),
              (v.gzip = function (f, g) {
                return ((g = g || {}).gzip = !0), p(f, g)
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
          function (N, B, v) {
            var _ = N('./zlib/inflate'),
              d = N('./utils/common'),
              o = N('./utils/strings'),
              h = N('./zlib/constants'),
              n = N('./zlib/messages'),
              S = N('./zlib/zstream'),
              y = N('./zlib/gzheader'),
              L = Object.prototype.toString
            function l(s) {
              if (!(this instanceof l)) return new l(s)
              this.options = d.assign(
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
                (this.strm = new S()),
                (this.strm.avail_out = 0)
              var f = _.inflateInit2(this.strm, p.windowBits)
              if (f !== h.Z_OK) throw new Error(n[f])
              ;(this.header = new y()),
                _.inflateGetHeader(this.strm, this.header)
            }
            function E(s, p) {
              var f = new l(p)
              if ((f.push(s, !0), f.err)) throw f.msg || n[f.err]
              return f.result
            }
            ;(l.prototype.push = function (s, p) {
              var f,
                g,
                U,
                I,
                A,
                X,
                G = this.strm,
                K = this.options.chunkSize,
                z = this.options.dictionary,
                Q = !1
              if (this.ended) return !1
              ;(g = p === ~~p ? p : p === !0 ? h.Z_FINISH : h.Z_NO_FLUSH),
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
                    ((G.output = new d.Buf8(K)),
                    (G.next_out = 0),
                    (G.avail_out = K)),
                  (f = _.inflate(G, h.Z_NO_FLUSH)) === h.Z_NEED_DICT &&
                    z &&
                    ((X =
                      typeof z == 'string'
                        ? o.string2buf(z)
                        : L.call(z) === '[object ArrayBuffer]'
                        ? new Uint8Array(z)
                        : z),
                    (f = _.inflateSetDictionary(this.strm, X))),
                  f === h.Z_BUF_ERROR && Q === !0 && ((f = h.Z_OK), (Q = !1)),
                  f !== h.Z_STREAM_END && f !== h.Z_OK)
                )
                  return this.onEnd(f), !(this.ended = !0)
                G.next_out &&
                  ((G.avail_out !== 0 &&
                    f !== h.Z_STREAM_END &&
                    (G.avail_in !== 0 ||
                      (g !== h.Z_FINISH && g !== h.Z_SYNC_FLUSH))) ||
                    (this.options.to === 'string'
                      ? ((U = o.utf8border(G.output, G.next_out)),
                        (I = G.next_out - U),
                        (A = o.buf2string(G.output, U)),
                        (G.next_out = I),
                        (G.avail_out = K - I),
                        I && d.arraySet(G.output, G.output, U, I, 0),
                        this.onData(A))
                      : this.onData(d.shrinkBuf(G.output, G.next_out)))),
                  G.avail_in === 0 && G.avail_out === 0 && (Q = !0)
              } while (
                (0 < G.avail_in || G.avail_out === 0) &&
                f !== h.Z_STREAM_END
              )
              return (
                f === h.Z_STREAM_END && (g = h.Z_FINISH),
                g === h.Z_FINISH
                  ? ((f = _.inflateEnd(this.strm)),
                    this.onEnd(f),
                    (this.ended = !0),
                    f === h.Z_OK)
                  : g !== h.Z_SYNC_FLUSH ||
                    (this.onEnd(h.Z_OK), !(G.avail_out = 0))
              )
            }),
              (l.prototype.onData = function (s) {
                this.chunks.push(s)
              }),
              (l.prototype.onEnd = function (s) {
                s === h.Z_OK &&
                  (this.options.to === 'string'
                    ? (this.result = this.chunks.join(''))
                    : (this.result = d.flattenChunks(this.chunks))),
                  (this.chunks = []),
                  (this.err = s),
                  (this.msg = this.strm.msg)
              }),
              (v.Inflate = l),
              (v.inflate = E),
              (v.inflateRaw = function (s, p) {
                return ((p = p || {}).raw = !0), E(s, p)
              }),
              (v.ungzip = E)
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
          function (N, B, v) {
            var _ =
              typeof Uint8Array < 'u' &&
              typeof Uint16Array < 'u' &&
              typeof Int32Array < 'u'
            ;(v.assign = function (h) {
              for (
                var n = Array.prototype.slice.call(arguments, 1);
                n.length;

              ) {
                var S = n.shift()
                if (S) {
                  if (typeof S != 'object')
                    throw new TypeError(S + 'must be non-object')
                  for (var y in S) S.hasOwnProperty(y) && (h[y] = S[y])
                }
              }
              return h
            }),
              (v.shrinkBuf = function (h, n) {
                return h.length === n
                  ? h
                  : h.subarray
                  ? h.subarray(0, n)
                  : ((h.length = n), h)
              })
            var d = {
                arraySet: function (h, n, S, y, L) {
                  if (n.subarray && h.subarray) h.set(n.subarray(S, S + y), L)
                  else for (var l = 0; l < y; l++) h[L + l] = n[S + l]
                },
                flattenChunks: function (h) {
                  var n, S, y, L, l, E
                  for (n = y = 0, S = h.length; n < S; n++) y += h[n].length
                  for (
                    E = new Uint8Array(y), n = L = 0, S = h.length;
                    n < S;
                    n++
                  )
                    (l = h[n]), E.set(l, L), (L += l.length)
                  return E
                }
              },
              o = {
                arraySet: function (h, n, S, y, L) {
                  for (var l = 0; l < y; l++) h[L + l] = n[S + l]
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
                  v.assign(v, o))
            }),
              v.setTyped(_)
          },
          {}
        ],
        42: [
          function (N, B, v) {
            var _ = N('./common'),
              d = !0,
              o = !0
            try {
              String.fromCharCode.apply(null, [0])
            } catch {
              d = !1
            }
            try {
              String.fromCharCode.apply(null, new Uint8Array(1))
            } catch {
              o = !1
            }
            for (var h = new _.Buf8(256), n = 0; n < 256; n++)
              h[n] =
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
            function S(y, L) {
              if (L < 65537 && ((y.subarray && o) || (!y.subarray && d)))
                return String.fromCharCode.apply(null, _.shrinkBuf(y, L))
              for (var l = '', E = 0; E < L; E++) l += String.fromCharCode(y[E])
              return l
            }
            ;(h[254] = h[254] = 1),
              (v.string2buf = function (y) {
                var L,
                  l,
                  E,
                  s,
                  p,
                  f = y.length,
                  g = 0
                for (s = 0; s < f; s++)
                  (64512 & (l = y.charCodeAt(s))) == 55296 &&
                    s + 1 < f &&
                    (64512 & (E = y.charCodeAt(s + 1))) == 56320 &&
                    ((l = 65536 + ((l - 55296) << 10) + (E - 56320)), s++),
                    (g += l < 128 ? 1 : l < 2048 ? 2 : l < 65536 ? 3 : 4)
                for (L = new _.Buf8(g), s = p = 0; p < g; s++)
                  (64512 & (l = y.charCodeAt(s))) == 55296 &&
                    s + 1 < f &&
                    (64512 & (E = y.charCodeAt(s + 1))) == 56320 &&
                    ((l = 65536 + ((l - 55296) << 10) + (E - 56320)), s++),
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
                return S(y, y.length)
              }),
              (v.binstring2buf = function (y) {
                for (
                  var L = new _.Buf8(y.length), l = 0, E = L.length;
                  l < E;
                  l++
                )
                  L[l] = y.charCodeAt(l)
                return L
              }),
              (v.buf2string = function (y, L) {
                var l,
                  E,
                  s,
                  p,
                  f = L || y.length,
                  g = new Array(2 * f)
                for (l = E = 0; l < f; )
                  if ((s = y[l++]) < 128) g[E++] = s
                  else if (4 < (p = h[s])) (g[E++] = 65533), (l += p - 1)
                  else {
                    for (s &= p === 2 ? 31 : p === 3 ? 15 : 7; 1 < p && l < f; )
                      (s = (s << 6) | (63 & y[l++])), p--
                    1 < p
                      ? (g[E++] = 65533)
                      : s < 65536
                      ? (g[E++] = s)
                      : ((s -= 65536),
                        (g[E++] = 55296 | ((s >> 10) & 1023)),
                        (g[E++] = 56320 | (1023 & s)))
                  }
                return S(g, E)
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
          function (N, B, v) {
            B.exports = function (_, d, o, h) {
              for (
                var n = (65535 & _) | 0, S = ((_ >>> 16) & 65535) | 0, y = 0;
                o !== 0;

              ) {
                for (
                  o -= y = 2e3 < o ? 2e3 : o;
                  (S = (S + (n = (n + d[h++]) | 0)) | 0), --y;

                );
                ;(n %= 65521), (S %= 65521)
              }
              return n | (S << 16) | 0
            }
          },
          {}
        ],
        44: [
          function (N, B, v) {
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
          function (N, B, v) {
            var _ = (function () {
              for (var d, o = [], h = 0; h < 256; h++) {
                d = h
                for (var n = 0; n < 8; n++)
                  d = 1 & d ? 3988292384 ^ (d >>> 1) : d >>> 1
                o[h] = d
              }
              return o
            })()
            B.exports = function (d, o, h, n) {
              var S = _,
                y = n + h
              d ^= -1
              for (var L = n; L < y; L++) d = (d >>> 8) ^ S[255 & (d ^ o[L])]
              return -1 ^ d
            }
          },
          {}
        ],
        46: [
          function (N, B, v) {
            var _,
              d = N('../utils/common'),
              o = N('./trees'),
              h = N('./adler32'),
              n = N('./crc32'),
              S = N('./messages'),
              y = 0,
              L = 4,
              l = 0,
              E = -2,
              s = -1,
              p = 4,
              f = 2,
              g = 8,
              U = 9,
              I = 286,
              A = 30,
              X = 19,
              G = 2 * I + 1,
              K = 15,
              z = 3,
              Q = 258,
              ot = Q + z + 1,
              w = 42,
              x = 113,
              a = 1,
              P = 2,
              ct = 3,
              H = 4
            function ut(r, M) {
              return (r.msg = S[M]), M
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
                  (d.arraySet(
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
            function St(r) {
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
                    d.arraySet(r.window, r.window, et, et, 0),
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
                        d.arraySet(W, Z.input, Z.next_in, rt, D),
                        Z.state.wrap === 1
                          ? (Z.adler = h(Z.adler, W, rt, D))
                          : Z.state.wrap === 2 &&
                            (Z.adler = n(Z.adler, W, rt, D)),
                        (Z.next_in += rt),
                        (Z.total_in += rt),
                        rt)),
                  (r.lookahead += R),
                  r.lookahead + r.insert >= z)
                )
                  for (
                    T = r.strstart - r.insert,
                      r.ins_h = r.window[T],
                      r.ins_h =
                        ((r.ins_h << r.hash_shift) ^ r.window[T + 1]) &
                        r.hash_mask;
                    r.insert &&
                    ((r.ins_h =
                      ((r.ins_h << r.hash_shift) ^ r.window[T + z - 1]) &
                      r.hash_mask),
                    (r.prev[T & r.w_mask] = r.head[r.ins_h]),
                    (r.head[r.ins_h] = T),
                    T++,
                    r.insert--,
                    !(r.lookahead + r.insert < z));

                  );
              } while (r.lookahead < ot && r.strm.avail_in !== 0)
            }
            function kt(r, M) {
              for (var R, m; ; ) {
                if (r.lookahead < ot) {
                  if ((St(r), r.lookahead < ot && M === y)) return a
                  if (r.lookahead === 0) break
                }
                if (
                  ((R = 0),
                  r.lookahead >= z &&
                    ((r.ins_h =
                      ((r.ins_h << r.hash_shift) ^
                        r.window[r.strstart + z - 1]) &
                      r.hash_mask),
                    (R = r.prev[r.strstart & r.w_mask] = r.head[r.ins_h]),
                    (r.head[r.ins_h] = r.strstart)),
                  R !== 0 &&
                    r.strstart - R <= r.w_size - ot &&
                    (r.match_length = tt(r, R)),
                  r.match_length >= z)
                )
                  if (
                    ((m = o._tr_tally(
                      r,
                      r.strstart - r.match_start,
                      r.match_length - z
                    )),
                    (r.lookahead -= r.match_length),
                    r.match_length <= r.max_lazy_match && r.lookahead >= z)
                  ) {
                    for (
                      r.match_length--;
                      r.strstart++,
                        (r.ins_h =
                          ((r.ins_h << r.hash_shift) ^
                            r.window[r.strstart + z - 1]) &
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
                (r.insert = r.strstart < z - 1 ? r.strstart : z - 1),
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
                  if ((St(r), r.lookahead < ot && M === y)) return a
                  if (r.lookahead === 0) break
                }
                if (
                  ((R = 0),
                  r.lookahead >= z &&
                    ((r.ins_h =
                      ((r.ins_h << r.hash_shift) ^
                        r.window[r.strstart + z - 1]) &
                      r.hash_mask),
                    (R = r.prev[r.strstart & r.w_mask] = r.head[r.ins_h]),
                    (r.head[r.ins_h] = r.strstart)),
                  (r.prev_length = r.match_length),
                  (r.prev_match = r.match_start),
                  (r.match_length = z - 1),
                  R !== 0 &&
                    r.prev_length < r.max_lazy_match &&
                    r.strstart - R <= r.w_size - ot &&
                    ((r.match_length = tt(r, R)),
                    r.match_length <= 5 &&
                      (r.strategy === 1 ||
                        (r.match_length === z &&
                          4096 < r.strstart - r.match_start)) &&
                      (r.match_length = z - 1)),
                  r.prev_length >= z && r.match_length <= r.prev_length)
                ) {
                  for (
                    u = r.strstart + r.lookahead - z,
                      m = o._tr_tally(
                        r,
                        r.strstart - 1 - r.prev_match,
                        r.prev_length - z
                      ),
                      r.lookahead -= r.prev_length - 1,
                      r.prev_length -= 2;
                    ++r.strstart <= u &&
                      ((r.ins_h =
                        ((r.ins_h << r.hash_shift) ^
                          r.window[r.strstart + z - 1]) &
                        r.hash_mask),
                      (R = r.prev[r.strstart & r.w_mask] = r.head[r.ins_h]),
                      (r.head[r.ins_h] = r.strstart)),
                      --r.prev_length != 0;

                  );
                  if (
                    ((r.match_available = 0),
                    (r.match_length = z - 1),
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
                (r.insert = r.strstart < z - 1 ? r.strstart : z - 1),
                M === L
                  ? (F(r, !0), r.strm.avail_out === 0 ? ct : H)
                  : r.last_lit && (F(r, !1), r.strm.avail_out === 0)
                  ? a
                  : P
              )
            }
            function gt(r, M, R, m, u) {
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
                (this.method = g),
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
                (this.dyn_dtree = new d.Buf16(2 * (2 * A + 1))),
                (this.bl_tree = new d.Buf16(2 * (2 * X + 1))),
                $(this.dyn_ltree),
                $(this.dyn_dtree),
                $(this.bl_tree),
                (this.l_desc = null),
                (this.d_desc = null),
                (this.bl_desc = null),
                (this.bl_count = new d.Buf16(K + 1)),
                (this.heap = new d.Buf16(2 * I + 1)),
                $(this.heap),
                (this.heap_len = 0),
                (this.heap_max = 0),
                (this.depth = new d.Buf16(2 * I + 1)),
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
                : ut(r, E)
            }
            function It(r) {
              var M = vt(r)
              return (
                M === l &&
                  (function (R) {
                    ;(R.window_size = 2 * R.w_size),
                      $(R.head),
                      (R.max_lazy_match = _[R.level].max_lazy),
                      (R.good_match = _[R.level].good_length),
                      (R.nice_match = _[R.level].nice_length),
                      (R.max_chain_length = _[R.level].max_chain),
                      (R.strstart = 0),
                      (R.block_start = 0),
                      (R.lookahead = 0),
                      (R.insert = 0),
                      (R.match_length = R.prev_length = z - 1),
                      (R.match_available = 0),
                      (R.ins_h = 0)
                  })(r.state),
                M
              )
            }
            function Dt(r, M, R, m, u, T) {
              if (!r) return E
              var Z = 1
              if (
                (M === s && (M = 6),
                m < 0 ? ((Z = 0), (m = -m)) : 15 < m && ((Z = 2), (m -= 16)),
                u < 1 ||
                  U < u ||
                  R !== g ||
                  m < 8 ||
                  15 < m ||
                  M < 0 ||
                  9 < M ||
                  T < 0 ||
                  p < T)
              )
                return ut(r, E)
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
                (W.hash_shift = ~~((W.hash_bits + z - 1) / z)),
                (W.window = new d.Buf8(2 * W.w_size)),
                (W.head = new d.Buf16(W.hash_size)),
                (W.prev = new d.Buf16(W.w_size)),
                (W.lit_bufsize = 1 << (u + 6)),
                (W.pending_buf_size = 4 * W.lit_bufsize),
                (W.pending_buf = new d.Buf8(W.pending_buf_size)),
                (W.d_buf = 1 * W.lit_bufsize),
                (W.l_buf = 3 * W.lit_bufsize),
                (W.level = M),
                (W.strategy = T),
                (W.method = R),
                It(r)
              )
            }
            ;(_ = [
              new gt(0, 0, 0, 0, function (r, M) {
                var R = 65535
                for (
                  R > r.pending_buf_size - 5 && (R = r.pending_buf_size - 5);
                  ;

                ) {
                  if (r.lookahead <= 1) {
                    if ((St(r), r.lookahead === 0 && M === y)) return a
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
              new gt(4, 4, 8, 4, kt),
              new gt(4, 5, 16, 8, kt),
              new gt(4, 6, 32, 32, kt),
              new gt(4, 4, 16, 16, Nt),
              new gt(8, 16, 32, 32, Nt),
              new gt(8, 16, 128, 128, Nt),
              new gt(8, 32, 128, 256, Nt),
              new gt(32, 128, 258, 1024, Nt),
              new gt(32, 258, 258, 4096, Nt)
            ]),
              (v.deflateInit = function (r, M) {
                return Dt(r, M, g, 15, 8, 0)
              }),
              (v.deflateInit2 = Dt),
              (v.deflateReset = It),
              (v.deflateResetKeep = vt),
              (v.deflateSetHeader = function (r, M) {
                return r && r.state
                  ? r.state.wrap !== 2
                    ? E
                    : ((r.state.gzhead = M), l)
                  : E
              }),
              (v.deflate = function (r, M) {
                var R, m, u, T
                if (!r || !r.state || 5 < M || M < 0) return r ? ut(r, E) : E
                if (
                  ((m = r.state),
                  !r.output ||
                    (!r.input && r.avail_in !== 0) ||
                    (m.status === 666 && M !== L))
                )
                  return ut(r, r.avail_out === 0 ? -5 : E)
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
                    var Z = (g + ((m.w_bits - 8) << 4)) << 8
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
                              (St(D), D.lookahead === 0)
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
                              if ((St(D), D.lookahead <= Q && V === y)) return a
                              if (D.lookahead === 0) break
                            }
                            if (
                              ((D.match_length = 0),
                              D.lookahead >= z &&
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
                              (D.match_length >= z
                                ? ((rt = o._tr_tally(D, 1, D.match_length - z)),
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
                      : _[m.level].func(m, M)
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
                    ? ut(r, E)
                    : ((r.state = null), M === x ? ut(r, -3) : l)
                  : E
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
                  return E
                for (
                  T === 1 && (r.adler = h(r.adler, M, rt, 0)),
                    R.wrap = 0,
                    rt >= R.w_size &&
                      (T === 0 &&
                        ($(R.head),
                        (R.strstart = 0),
                        (R.block_start = 0),
                        (R.insert = 0)),
                      (V = new d.Buf8(R.w_size)),
                      d.arraySet(V, M, rt - R.w_size, R.w_size, 0),
                      (M = V),
                      (rt = R.w_size)),
                    Z = r.avail_in,
                    W = r.next_in,
                    D = r.input,
                    r.avail_in = rt,
                    r.next_in = 0,
                    r.input = M,
                    St(R);
                  R.lookahead >= z;

                ) {
                  for (
                    m = R.strstart, u = R.lookahead - (z - 1);
                    (R.ins_h =
                      ((R.ins_h << R.hash_shift) ^ R.window[m + z - 1]) &
                      R.hash_mask),
                      (R.prev[m & R.w_mask] = R.head[R.ins_h]),
                      (R.head[R.ins_h] = m),
                      m++,
                      --u;

                  );
                  ;(R.strstart = m), (R.lookahead = z - 1), St(R)
                }
                return (
                  (R.strstart += R.lookahead),
                  (R.block_start = R.strstart),
                  (R.insert = R.lookahead),
                  (R.lookahead = 0),
                  (R.match_length = R.prev_length = z - 1),
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
          function (N, B, v) {
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
          function (N, B, v) {
            B.exports = function (_, d) {
              var o,
                h,
                n,
                S,
                y,
                L,
                l,
                E,
                s,
                p,
                f,
                g,
                U,
                I,
                A,
                X,
                G,
                K,
                z,
                Q,
                ot,
                w,
                x,
                a,
                P
              ;(o = _.state),
                (h = _.next_in),
                (a = _.input),
                (n = h + (_.avail_in - 5)),
                (S = _.next_out),
                (P = _.output),
                (y = S - (d - _.avail_out)),
                (L = S + (_.avail_out - 257)),
                (l = o.dmax),
                (E = o.wsize),
                (s = o.whave),
                (p = o.wnext),
                (f = o.window),
                (g = o.hold),
                (U = o.bits),
                (I = o.lencode),
                (A = o.distcode),
                (X = (1 << o.lenbits) - 1),
                (G = (1 << o.distbits) - 1)
              t: do {
                U < 15 &&
                  ((g += a[h++] << U), (U += 8), (g += a[h++] << U), (U += 8)),
                  (K = I[g & X])
                e: for (;;) {
                  if (
                    ((g >>>= z = K >>> 24),
                    (U -= z),
                    (z = (K >>> 16) & 255) === 0)
                  )
                    P[S++] = 65535 & K
                  else {
                    if (!(16 & z)) {
                      if (!(64 & z)) {
                        K = I[(65535 & K) + (g & ((1 << z) - 1))]
                        continue e
                      }
                      if (32 & z) {
                        o.mode = 12
                        break t
                      }
                      ;(_.msg = 'invalid literal/length code'), (o.mode = 30)
                      break t
                    }
                    ;(Q = 65535 & K),
                      (z &= 15) &&
                        (U < z && ((g += a[h++] << U), (U += 8)),
                        (Q += g & ((1 << z) - 1)),
                        (g >>>= z),
                        (U -= z)),
                      U < 15 &&
                        ((g += a[h++] << U),
                        (U += 8),
                        (g += a[h++] << U),
                        (U += 8)),
                      (K = A[g & G])
                    r: for (;;) {
                      if (
                        ((g >>>= z = K >>> 24),
                        (U -= z),
                        !(16 & (z = (K >>> 16) & 255)))
                      ) {
                        if (!(64 & z)) {
                          K = A[(65535 & K) + (g & ((1 << z) - 1))]
                          continue r
                        }
                        ;(_.msg = 'invalid distance code'), (o.mode = 30)
                        break t
                      }
                      if (
                        ((ot = 65535 & K),
                        U < (z &= 15) &&
                          ((g += a[h++] << U),
                          (U += 8) < z && ((g += a[h++] << U), (U += 8))),
                        l < (ot += g & ((1 << z) - 1)))
                      ) {
                        ;(_.msg = 'invalid distance too far back'),
                          (o.mode = 30)
                        break t
                      }
                      if (((g >>>= z), (U -= z), (z = S - y) < ot)) {
                        if (s < (z = ot - z) && o.sane) {
                          ;(_.msg = 'invalid distance too far back'),
                            (o.mode = 30)
                          break t
                        }
                        if (((x = f), (w = 0) === p)) {
                          if (((w += E - z), z < Q)) {
                            for (Q -= z; (P[S++] = f[w++]), --z; );
                            ;(w = S - ot), (x = P)
                          }
                        } else if (p < z) {
                          if (((w += E + p - z), (z -= p) < Q)) {
                            for (Q -= z; (P[S++] = f[w++]), --z; );
                            if (((w = 0), p < Q)) {
                              for (Q -= z = p; (P[S++] = f[w++]), --z; );
                              ;(w = S - ot), (x = P)
                            }
                          }
                        } else if (((w += p - z), z < Q)) {
                          for (Q -= z; (P[S++] = f[w++]), --z; );
                          ;(w = S - ot), (x = P)
                        }
                        for (; 2 < Q; )
                          (P[S++] = x[w++]),
                            (P[S++] = x[w++]),
                            (P[S++] = x[w++]),
                            (Q -= 3)
                        Q && ((P[S++] = x[w++]), 1 < Q && (P[S++] = x[w++]))
                      } else {
                        for (
                          w = S - ot;
                          (P[S++] = P[w++]),
                            (P[S++] = P[w++]),
                            (P[S++] = P[w++]),
                            2 < (Q -= 3);

                        );
                        Q && ((P[S++] = P[w++]), 1 < Q && (P[S++] = P[w++]))
                      }
                      break
                    }
                  }
                  break
                }
              } while (h < n && S < L)
              ;(h -= Q = U >> 3),
                (g &= (1 << (U -= Q << 3)) - 1),
                (_.next_in = h),
                (_.next_out = S),
                (_.avail_in = h < n ? n - h + 5 : 5 - (h - n)),
                (_.avail_out = S < L ? L - S + 257 : 257 - (S - L)),
                (o.hold = g),
                (o.bits = U)
            }
          },
          {}
        ],
        49: [
          function (N, B, v) {
            var _ = N('../utils/common'),
              d = N('./adler32'),
              o = N('./crc32'),
              h = N('./inffast'),
              n = N('./inftrees'),
              S = 1,
              y = 2,
              L = 0,
              l = -2,
              E = 1,
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
            function g() {
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
              var x
              return w && w.state
                ? ((x = w.state),
                  (w.total_in = w.total_out = x.total = 0),
                  (w.msg = ''),
                  x.wrap && (w.adler = 1 & x.wrap),
                  (x.mode = E),
                  (x.last = 0),
                  (x.havedict = 0),
                  (x.dmax = 32768),
                  (x.head = null),
                  (x.hold = 0),
                  (x.bits = 0),
                  (x.lencode = x.lendyn = new _.Buf32(s)),
                  (x.distcode = x.distdyn = new _.Buf32(p)),
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
                  U(w))
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
                ? ((P = new g()),
                  ((w.state = P).window = null),
                  (a = A(w, x)) !== L && (w.state = null),
                  a)
                : l
            }
            var G,
              K,
              z = !0
            function Q(w) {
              if (z) {
                var x
                for (
                  G = new _.Buf32(512), K = new _.Buf32(32), x = 0;
                  x < 144;

                )
                  w.lens[x++] = 8
                for (; x < 256; ) w.lens[x++] = 9
                for (; x < 280; ) w.lens[x++] = 7
                for (; x < 288; ) w.lens[x++] = 8
                for (
                  n(S, w.lens, 0, 288, G, 0, w.work, { bits: 9 }), x = 0;
                  x < 32;

                )
                  w.lens[x++] = 5
                n(y, w.lens, 0, 32, K, 0, w.work, { bits: 5 }), (z = !1)
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
                  (H.window = new _.Buf8(H.wsize))),
                P >= H.wsize
                  ? (_.arraySet(H.window, x, a - H.wsize, H.wsize, 0),
                    (H.wnext = 0),
                    (H.whave = H.wsize))
                  : (P < (ct = H.wsize - H.wnext) && (ct = P),
                    _.arraySet(H.window, x, a - P, ct, H.wnext),
                    (P -= ct)
                      ? (_.arraySet(H.window, x, a - P, P, 0),
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
              (v.inflateResetKeep = U),
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
                  St,
                  kt,
                  Nt,
                  gt,
                  Lt,
                  vt,
                  It,
                  Dt,
                  r,
                  M,
                  R,
                  m,
                  u = 0,
                  T = new _.Buf8(4),
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
                    case E:
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
                            _.arraySet(a.head.extra, P, H, tt, r)),
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
                        _.arraySet(ct, P, H, tt, ut),
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
                          (gt =
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
                        (M = n(S, a.lens, 0, a.nlen, a.lencode, 0, a.work, R)),
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
                          h(w, nt),
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
                        (gt =
                          ((u = a.lencode[O & ((1 << a.lenbits) - 1)]) >>> 16) &
                          255),
                          (Lt = 65535 & u),
                          !((Nt = u >>> 24) <= F);

                      ) {
                        if (J === 0) break t
                        J--, (O += P[H++] << F), (F += 8)
                      }
                      if (gt && !(240 & gt)) {
                        for (
                          vt = Nt, It = gt, Dt = Lt;
                          (gt =
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
                        gt === 0)
                      ) {
                        a.mode = 26
                        break
                      }
                      if (32 & gt) {
                        ;(a.back = -1), (a.mode = 12)
                        break
                      }
                      if (64 & gt) {
                        ;(w.msg = 'invalid literal/length code'), (a.mode = 30)
                        break
                      }
                      ;(a.extra = 15 & gt), (a.mode = 22)
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
                        (gt =
                          ((u = a.distcode[O & ((1 << a.distbits) - 1)]) >>>
                            16) &
                          255),
                          (Lt = 65535 & u),
                          !((Nt = u >>> 24) <= F);

                      ) {
                        if (J === 0) break t
                        J--, (O += P[H++] << F), (F += 8)
                      }
                      if (!(240 & gt)) {
                        for (
                          vt = Nt, It = gt, Dt = Lt;
                          (gt =
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
                      if (((O >>>= Nt), (F -= Nt), (a.back += Nt), 64 & gt)) {
                        ;(w.msg = 'invalid distance code'), (a.mode = 30)
                        break
                      }
                      ;(a.offset = Lt), (a.extra = 15 & gt), (a.mode = 24)
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
                        ;(St =
                          tt > a.wnext
                            ? ((tt -= a.wnext), a.wsize - tt)
                            : a.wnext - tt),
                          tt > a.length && (tt = a.length),
                          (kt = a.window)
                      } else (kt = ct), (St = ut - a.offset), (tt = a.length)
                      for (
                        $ < tt && (tt = $), $ -= tt, a.length -= tt;
                        (ct[ut++] = kt[St++]), --tt;

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
                                : d(a.check, ct, nt, ut - nt)),
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
                            : d(a.check, ct, nt, w.next_out - nt)),
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
                    : a.mode === 11 && d(1, x, P, 0) !== a.check
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
          function (N, B, v) {
            var _ = N('../utils/common'),
              d = [
                3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43,
                51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
              ],
              o = [
                16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
                19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
              ],
              h = [
                1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257,
                385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289,
                16385, 24577, 0, 0
              ],
              n = [
                16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
                23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64
              ]
            B.exports = function (S, y, L, l, E, s, p, f) {
              var g,
                U,
                I,
                A,
                X,
                G,
                K,
                z,
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
                nt = new _.Buf16(16),
                tt = new _.Buf16(16),
                St = null,
                kt = 0
              for (w = 0; w <= 15; w++) nt[w] = 0
              for (x = 0; x < l; x++) nt[y[L + x]]++
              for (ct = ot, P = 15; 1 <= P && nt[P] === 0; P--);
              if ((P < ct && (ct = P), P === 0))
                return (E[s++] = 20971520), (E[s++] = 20971520), (f.bits = 1), 0
              for (a = 1; a < P && nt[a] === 0; a++);
              for (ct < a && (ct = a), w = J = 1; w <= 15; w++)
                if (((J <<= 1), (J -= nt[w]) < 0)) return -1
              if (0 < J && (S === 0 || P !== 1)) return -1
              for (tt[1] = 0, w = 1; w < 15; w++) tt[w + 1] = tt[w] + nt[w]
              for (x = 0; x < l; x++) y[L + x] !== 0 && (p[tt[y[L + x]]++] = x)
              if (
                ((G =
                  S === 0
                    ? ((F = St = p), 19)
                    : S === 1
                    ? ((F = d), (st -= 257), (St = o), (kt -= 257), 256)
                    : ((F = h), (St = n), -1)),
                (w = a),
                (X = s),
                (ut = x = O = 0),
                (I = -1),
                (A = ($ = 1 << (H = ct)) - 1),
                (S === 1 && 852 < $) || (S === 2 && 592 < $))
              )
                return 1
              for (;;) {
                for (
                  K = w - ut,
                    Q =
                      p[x] < G
                        ? ((z = 0), p[x])
                        : p[x] > G
                        ? ((z = St[kt + p[x]]), F[st + p[x]])
                        : ((z = 96), 0),
                    g = 1 << (w - ut),
                    a = U = 1 << H;
                  (E[X + (O >> ut) + (U -= g)] = (K << 24) | (z << 16) | Q | 0),
                    U !== 0;

                );
                for (g = 1 << (w - 1); O & g; ) g >>= 1
                if (
                  (g !== 0 ? ((O &= g - 1), (O += g)) : (O = 0),
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
                    (S === 1 && 852 < $) || (S === 2 && 592 < $))
                  )
                    return 1
                  E[(I = O & A)] = (ct << 24) | (H << 16) | (X - s) | 0
                }
              }
              return (
                O !== 0 && (E[X + O] = ((w - ut) << 24) | (64 << 16) | 0),
                (f.bits = ct),
                0
              )
            }
          },
          { '../utils/common': 41 }
        ],
        51: [
          function (N, B, v) {
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
          function (N, B, v) {
            var _ = N('../utils/common'),
              d = 0,
              o = 1
            function h(u) {
              for (var T = u.length; 0 <= --T; ) u[T] = 0
            }
            var n = 0,
              S = 29,
              y = 256,
              L = y + 1 + S,
              l = 30,
              E = 19,
              s = 2 * L + 1,
              p = 15,
              f = 16,
              g = 7,
              U = 256,
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
              z = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
              Q = [
                16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15
              ],
              ot = new Array(2 * (L + 2))
            h(ot)
            var w = new Array(2 * l)
            h(w)
            var x = new Array(512)
            h(x)
            var a = new Array(256)
            h(a)
            var P = new Array(S)
            h(P)
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
            function St(u, T) {
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
                et !== 0 && (u[2 * D] = St(V[et]++, et))
              }
            }
            function Nt(u) {
              var T
              for (T = 0; T < L; T++) u.dyn_ltree[2 * T] = 0
              for (T = 0; T < l; T++) u.dyn_dtree[2 * T] = 0
              for (T = 0; T < E; T++) u.bl_tree[2 * T] = 0
              ;(u.dyn_ltree[2 * U] = 1),
                (u.opt_len = u.static_len = 0),
                (u.last_lit = u.matches = 0)
            }
            function gt(u) {
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
              tt(u, U, T)
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
                    Ut,
                    Qt,
                    ft,
                    Rt = Ot.dyn_tree,
                    re = Ot.max_code,
                    jt = Ot.stat_desc.static_tree,
                    Se = Ot.stat_desc.has_stree,
                    Mt = Ot.stat_desc.extra_bits,
                    ne = Ot.stat_desc.extra_base,
                    j = Ot.stat_desc.max_length,
                    Xt = 0
                  for (Ut = 0; Ut <= p; Ut++) pt.bl_count[Ut] = 0
                  for (
                    Rt[2 * pt.heap[pt.heap_max] + 1] = 0, Wt = pt.heap_max + 1;
                    Wt < s;
                    Wt++
                  )
                    j < (Ut = Rt[2 * Rt[2 * (xt = pt.heap[Wt]) + 1] + 1] + 1) &&
                      ((Ut = j), Xt++),
                      (Rt[2 * xt + 1] = Ut),
                      re < xt ||
                        (pt.bl_count[Ut]++,
                        (Qt = 0),
                        ne <= xt && (Qt = Mt[xt - ne]),
                        (ft = Rt[2 * xt]),
                        (pt.opt_len += ft * (Ut + Qt)),
                        Se && (pt.static_len += ft * (jt[2 * xt + 1] + Qt)))
                  if (Xt !== 0) {
                    do {
                      for (Ut = j - 1; pt.bl_count[Ut] === 0; ) Ut--
                      pt.bl_count[Ut]--,
                        (pt.bl_count[Ut + 1] += 2),
                        pt.bl_count[j]--,
                        (Xt -= 2)
                    } while (0 < Xt)
                    for (Ut = j; Ut !== 0; Ut--)
                      for (xt = pt.bl_count[Ut]; xt !== 0; )
                        re < (Kt = pt.heap[--Wt]) ||
                          (Rt[2 * Kt + 1] !== Ut &&
                            ((pt.opt_len += (Ut - Rt[2 * Kt + 1]) * Rt[2 * Kt]),
                            (Rt[2 * Kt + 1] = Ut)),
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
            h(J)
            var R = !1
            function m(u, T, Z, W) {
              nt(u, (n << 1) + (W ? 1 : 0), 3),
                (function (D, V, rt, et) {
                  gt(D),
                    et && (st(D, rt), st(D, ~rt)),
                    _.arraySet(D.pending_buf, D.window, V, rt, D.pending),
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
                  for (D = W = 0; D < S - 1; D++)
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
                    (w[2 * T + 1] = 5), (w[2 * T] = St(T, 5))
                  ;(ct = new $(ot, G, y + 1, L, p)),
                    (H = new $(w, K, 0, l, p)),
                    (ut = new $(new Array(0), z, 0, E, g))
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
                          if (1 & wt && et.dyn_ltree[2 * at] !== 0) return d
                        if (
                          et.dyn_ltree[18] !== 0 ||
                          et.dyn_ltree[20] !== 0 ||
                          et.dyn_ltree[26] !== 0
                        )
                          return o
                        for (at = 32; at < y; at++)
                          if (et.dyn_ltree[2 * at] !== 0) return o
                        return d
                      })(u)),
                    Dt(u, u.l_desc),
                    Dt(u, u.d_desc),
                    (rt = (function (et) {
                      var at
                      for (
                        r(et, et.dyn_ltree, et.l_desc.max_code),
                          r(et, et.dyn_dtree, et.d_desc.max_code),
                          Dt(et, et.bl_desc),
                          at = E - 1;
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
                  W && gt(u)
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
                  tt(u, U, ot),
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
          function (N, B, v) {
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
          function (N, B, v) {
            ;(function (_) {
              ;(function (d, o) {
                if (!d.setImmediate) {
                  var h,
                    n,
                    S,
                    y,
                    L = 1,
                    l = {},
                    E = !1,
                    s = d.document,
                    p = Object.getPrototypeOf && Object.getPrototypeOf(d)
                  ;(p = p && p.setTimeout ? p : d),
                    (h =
                      {}.toString.call(d.process) === '[object process]'
                        ? function (I) {
                            process.nextTick(function () {
                              g(I)
                            })
                          }
                        : (function () {
                            if (d.postMessage && !d.importScripts) {
                              var I = !0,
                                A = d.onmessage
                              return (
                                (d.onmessage = function () {
                                  I = !1
                                }),
                                d.postMessage('', '*'),
                                (d.onmessage = A),
                                I
                              )
                            }
                          })()
                        ? ((y = 'setImmediate$' + Math.random() + '$'),
                          d.addEventListener
                            ? d.addEventListener('message', U, !1)
                            : d.attachEvent('onmessage', U),
                          function (I) {
                            d.postMessage(y + I, '*')
                          })
                        : d.MessageChannel
                        ? (((S = new MessageChannel()).port1.onmessage =
                            function (I) {
                              g(I.data)
                            }),
                          function (I) {
                            S.port2.postMessage(I)
                          })
                        : s && 'onreadystatechange' in s.createElement('script')
                        ? ((n = s.documentElement),
                          function (I) {
                            var A = s.createElement('script')
                            ;(A.onreadystatechange = function () {
                              g(I),
                                (A.onreadystatechange = null),
                                n.removeChild(A),
                                (A = null)
                            }),
                              n.appendChild(A)
                          })
                        : function (I) {
                            setTimeout(g, 0, I)
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
                      return (l[L] = G), h(L), L++
                    }),
                    (p.clearImmediate = f)
                }
                function f(I) {
                  delete l[I]
                }
                function g(I) {
                  if (E) setTimeout(g, 0, I)
                  else {
                    var A = l[I]
                    if (A) {
                      E = !0
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
                        f(I), (E = !1)
                      }
                    }
                  }
                }
                function U(I) {
                  I.source === d &&
                    typeof I.data == 'string' &&
                    I.data.indexOf(y) === 0 &&
                    g(+I.data.slice(y.length))
                }
              })(typeof self > 'u' ? (_ === void 0 ? this : _) : self)
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
})(cn)
const fn = Me,
  dn = new fn()
class hn {
  static async init(lt) {
    const N = await fetch(lt).then((B) => B.blob())
    return await dn.loadAsync(N)
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
function Pe(_t) {
  return new Promise((lt, N) => {
    ;(_t.oncomplete = _t.onsuccess = () => lt(_t.result)),
      (_t.onabort = _t.onerror = () => N(_t.error))
  })
}
function _n(_t, lt) {
  const N = indexedDB.open(_t)
  N.onupgradeneeded = () => N.result.createObjectStore(lt)
  const B = Pe(N)
  return (v, _) => B.then((d) => _(d.transaction(lt, v).objectStore(lt)))
}
let Ge
function wr() {
  return Ge || (Ge = _n('keyval-store', 'keyval')), Ge
}
function pn(_t, lt = wr()) {
  return lt('readonly', (N) => Pe(N.get(_t)))
}
function mn(_t, lt, N = wr()) {
  return N('readwrite', (B) => (B.put(lt, _t), Pe(B.transaction)))
}
const Nn = ['widget', 'remind_at', 'tags', 'files'],
  En = ({
    limit: _t,
    where: lt,
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
${lt || ''} 
ORDER BY timestamp ASC, a.repeat_id ASC, a.id DESC 
${_t} `,
  gn = (_t) => {
    const { user_id: lt, page_number: N, parent_id: B, page_record: v } = _t,
      _ = `LIMIT ${(N - 1) * v}, ${v}`,
      d = []
    B && d.push(`parent_id IN (${B})`)
    const o = d.length ? `WHERE ${d.join(' AND ')}` : ''
    return En({ limit: _, user_id: lt, where: o })
  },
  bn =
    'http://flyele-dev.oss-cn-shenzhen.aliyuncs.com/middlestation%2F1097162630889616%2F1487318895218688.zip?Expires=1680157153&OSSAccessKeyId=LTAI5tNRFh75VpujzNxcSMxq&Signature=drhJj8F0LoIDe7I%2Fo8rnimBMBYw%3D',
  yn = '/sql-wasm.wasm'
class wn {
  constructor() {
    ;(this.db = null), (this.zipObj = null)
  }
  async initDB() {
    const lt = await je({ locateFile: () => yn }),
      N = await pn('database-fly')
    if (N) return (this.db = new lt.Database(N)), this.getTable()
    const B = new lt.Database()
    return (
      (this.db = B),
      B.run(ln),
      await this.fetchZip(bn),
      await this.initTable(),
      this.getTable()
    )
  }
  formatSelectValue({ columns: lt, values: N }) {
    const B = Object.entries(lt)
    return new Array(N.length).fill({}).map((_, d) => {
      for (const [o, h] of B) {
        const n = N[d][Number(o)]
        Nn.includes(h)
          ? (_[h] = JSON.parse(n))
          : (_[h] = /^(id)$|_id$/.test(h) ? (n ? String(n) : '') : n)
      }
      return _
    })
  }
  query(lt) {
    const N = gn(lt),
      B = this.db.exec(N)
    return B[0] ? this.formatSelectValue(B[0]) : []
  }
  getTable() {
    return this.db.exec('SELECT * FROM tag_bind')
  }
  async fetchZip(lt) {
    this.zipObj = await hn.init(lt)
  }
  async parseFile(lt) {
    return JSON.parse(await this.zipObj.file(lt).async('string'))
  }
  async initTable() {
    console.log('begin')
    const lt = await this.parseFile('guide')
    for (const [N, B] of Object.entries(lt)) {
      const { data: v } = B
      for (const _ of v) {
        const o = (await this.parseFile(_)).map((n) => {
          const S = {}
          return (
            Object.keys(yr[N]).forEach((y) => {
              S[y] = n[y] || yr[N][y]
            }),
            S
          )
        })
        let h = ''
        o.forEach((n) => {
          h += this.getInsertSql(n, N) + ';'
        }),
          this.db.run(h)
      }
    }
    console.log('done'),
      mn('database-fly', this.db.export()).then(() => {
        console.log('output -->')
      })
  }
  getInsertSql(lt, N) {
    return `INSERT INTO ${N} (${Object.keys(lt).join(
      ' ,'
    )}) VALUES (${Object.values(lt)
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
const vn = new wn()
class Ln {
  constructor() {
    ;(this.sqlStore = null),
      (self.onmessage = ({ data: lt }) => {
        if ((console.log('from client', lt), lt.initSql)) {
          const N = lt.initSql
          console.log('check this', this), this.initDB(N), (this.sqlStore = N)
        }
      }),
      vn.initDB().then((lt) => {
        console.log('data from worker!!', lt)
      })
  }
  initDB(lt) {
    console.log('check store', lt),
      lt.initDB().then((N) => {
        self.postMessage({ initData: N })
      })
  }
}
new Ln()
