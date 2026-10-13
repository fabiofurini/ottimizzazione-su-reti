/* Laboratorio di «Ottimizzazione su reti / Network Optimization»: il MOTORE DEI GRAFI, comune a tutte le app.
 *
 * Si carica dopo interattivi.js (window.GI) e gi-comune.js (window.GI_MIP) e prima delle ricette gi-no-a.js,
 * gi-no-b.js, … (ordine alfabetico, genera_sito.py), che lo trovano in window.GI_NO. Verde riservato ai tagli:
 * il motore non lo usa mai. Linee tratteggiate (dash 3), mai a puntini.
 *
 * ================================================================ FORMATO DELLE ISTANZE
 *   I = { nome: "reference graph (Example 1.9)",   // il nome del menu «Istanza» (come nelle dispense)
 *         n: 6,                                      // nodi 1..n
 *         diretto: true,                             // grafo orientato (archi (i,j)) o no (spigoli {i,j})
 *         A: [[1, 2], [1, 3, 7], [2, 4, 5, 0], …],   // archi [i, j, ...valori] (pesi, capacità, costi, flussi:
 *                                                     //   il significato lo dà la ricetta), nodi da 1
 *         P: [[0, 1.2], [2.2, 2.4], …],              // coordinate dei nodi (come nel TikZ: y verso l'alto)
 *         pieghe: { "1-3": 28 },                    // facoltativo: archi curvi, gradi come bend left (+) / bend
 *                                                     //   right (−) del TikZ, da i a j (per non passare su un nodo)
 *         s: 1, t: 6 }                               // facoltativi: sorgente, pozzo, …
 *   grafo(I) -> G = { n, diretto, P, nome, archi, L, Lin, idx }
 *     archi  [{ i, j, v: [valori], k }] in ordine lessicografico (non orientato: i < j), k = 1..m (a_k del capitolo)
 *     L[i]   [{ j, a }] successori di i (non orientato: i vicini) per indice crescente; a = l'arco
 *     Lin[i] [{ j, a }] predecessori di i (orientato), per indice crescente
 *     idx    "i-j" -> arco (non orientato: anche "j-i")
 *   arco(G, i, j) -> l'arco (o undefined)
 *   copia(I), cerchio(n, r = 2, a0 = 90): coordinate su una circonferenza (nodo 1 in alto, senso orario)
 *   testoArchi(I, nv) / leggiArchi(s, n, nv): «1-2:4 1-3:7» <-> [[1, 2, 4], [1, 3, 7]] (nv valori per arco,
 *     separati da «,» dopo «:»); null se il testo non è valido
 *   casuale({ n: [6, 8], p: 0.35, diretto, valori: [[1, 9]], connesso: true, leggibile: true, prova(G) }) -> istanza
 *     a caso (coordinate su una circonferenza; prova(G) = true per accettarla; leggibile(I): nessun arco rasenta un
 *     nodo e nessuna coppia di etichette a metà arco si sovrappone)
 *
 * ================================================================ DISEGNO (pixel, origine in alto a sinistra)
 *   pix(board) -> [W, H]   la board in coordinate pixel;   d = disegno(crea, H): d.rect, d.line, d.text, d.dot,
 *                          d.poly([[x, y], …], attr), d.curva(xs, ys, attr) (crea viene da GI_MIP.ridisegna)
 *   disposizione(G, box, opz) -> { X(i), Y(i), r }: i nodi adattati (stessa scala sui due assi) al riquadro
 *     box = { x, y, w, h }; opz.r raggio (default dalla densità), opz.margine spazio per le etichette esterne
 *   disegnaGrafo(d, G, box, opz, C) -> disposizione: disegna archi, frecce, etichette e nodi.
 *     C = GI_MIP.COL(st). opz (tutto facoltativo):
 *       arco(a)   -> { colore, spessore, dash (0 | 3), opacita, etichetta: "4" | null, colEt, grassetto }
 *       nodo(i)   -> { fondo, bordo, spessore, testo (colore del numero), opacita }
 *       fuori(i)  -> null | { testo, colore }: etichetta esterna al nodo (d = 2, o = 3, π = 5, …), lontana dal
 *                    baricentro dei nodi, così non copre gli archi interni
 *       curva     curvatura degli archi antiparalleli (default 0.18 della lunghezza; 0 = diritti sovrapposti)
 *       fs        corpo delle etichette degli archi
 *     Gli archi antiparalleli (i,j), (j,i) si piegano da parti opposte; l'etichetta di un arco sta a metà, su un
 *     riquadro del colore dello sfondo; la freccia (grafi orientati) tocca il bordo del nodo di testa.
 *   divisione(G, W, H, basso = 96, destra = 290) -> { grafo: box, fascia: box, aDestra }: il grafo e una fascia di
 *     letture sotto (grafi larghi) o a destra (grafi quasi quadrati, che così guadagnano altezza)
 *   cellaLista(d, x, y, valori, opz, C): una fila di caselle (LIST, coda, pila, lista ordinata degli spigoli);
 *     opz = { w, h, evid: indice (o indici) evidenziati, colEvid, titolo, titoloW, perRiga (a capo), vuota: "(empty)" }
 *
 * ================================================================ PASSO PER PASSO E COMANDI
 *   PASSO, parPasso(descr, val): il cursore del passo (chiave "text{step}" / "text{passo}")
 *   stato(st, calcola, extra) -> { D, G (istanza), R, K, k, P }: R = calcola(istanza, st.chiave(), st) si
 *     ricalcola solo quando cambiano istanza, voce di «funzioni» o extra; R.passi = [stato 0, 1, …, K];
 *     k = passo corrente (0..K), P = R.passi[k]. L'istanza corrente è st.dati.g (con id ed es = indice nel menu).
 *   montaIstanze(st, ES, opz) in monta(board, st): pulsanti ◀ ▶ «Esegui» velocità, «Casuale», «Modifica…»,
 *     il menu «Istanza» con le voci ES (le istanze dei capitoli) e #ist=… nell'indirizzo.
 *     opz = { casuale: () => istanza, nv: valori per arco nel «Modifica…» (0, 1, 2), nomiValori: "w" | "u,c",
 *             diretto, nMax: 10, altri: [[testo, titolo, fz], …], ritmo: 900, dopo(istanza) }
 *     Ricarica: st.dati.nuova(istanza, es = -1)
 *   allinea(st, ES) in aggiorna: riallinea il menu «Istanza» dopo «Casuale»/«Modifica…»
 *   menu(st, id, voci, valore, cambia): un altro menu a tendina (es. «Sorgente: 1») sotto quello delle istanze;
 *     voci = [[valore, testo], …]
 *   nuovaVoce(st): al cambio di voce (algoritmo) il passo torna a 0 e «Esegui» si ferma
 *   osservaDimensioni(board, st), dim(board), daIndirizzo(st), chiedi(msg, esempio), istDaIndirizzo(st, ES)
 *   PAL(C): colori dei gruppi (componenti, …) senza verde; i primi quattro evitano arancio (corrente), blu (albero)
 *     e rosso (scartato)
 */
(function () {
  "use strict";
  const GI = window.GI, M = window.GI_MIP, T = GI.T;

  // ------------------------------------------------------------ passo per passo (come gi-oc-0.js di OC)
  const PASSO = T("text{passo}", "text{step}");
  const parPasso = (descr, val = 0) => ({ k: PASSO, nome: "\\" + PASSO, min: 0, max: 20, step: 1, val, colore: "a", cifre: 0, descr });
  const vaiA = (st, v) => { const i = M.inputDi(st, PASSO); if (i) i.value = v; };
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const lista = (A) => A.join(", ");
  let contatore = 0;
  const nuovoId = () => "g" + (++contatore);

  function osservaDimensioni(board, st) {
    if (st.dati.ro) st.dati.ro.disconnect();
    if (!window.ResizeObserver || !board.containerObj) return;
    st.dati.ro = new ResizeObserver(() => {
      if (!document.body.contains(st.el) || st.board !== board) return;
      const [w, h] = [board.containerObj.clientWidth, board.containerObj.clientHeight];
      if (w > 0 && h > 0 && st.dati.roDim !== w + "x" + h) { st.dati.roDim = w + "x" + h; st.aggiorna(); }
    });
    st.dati.ro.observe(board.containerObj);
  }
  function nuovaVoce(st, primo = 0) {
    if (st.dati.voce !== st.chiave()) {
      if (st.dati.voce !== undefined) { vaiA(st, primo); M.ferma(st); }
      st.dati.voce = st.chiave();
    }
  }
  const dim = (board) => {
    const el = board.containerObj, cw = el ? el.clientWidth : 0, ch = el ? el.clientHeight : 0;
    if (cw > 0 && ch > 0 && (Math.abs(cw - board.canvasWidth) > 1 || Math.abs(ch - board.canvasHeight) > 1)) board.resizeContainer(cw, ch, true, true);
    return [Math.round(board.canvasWidth || 600), Math.round(board.canvasHeight || 400)];
  };
  function pix(board) {
    const [W, H] = dim(board);
    board.setBoundingBox([0, H, W, 0], false);
    return [W, H];
  }
  function disegno(crea, H) {
    return {
      rect: (x, y, w, h, a) => M.rett(crea, x, H - y - h, x + w, H - y, a),
      line: (x0, y0, x1, y1, a) => M.linea(crea, x0, H - y0, x1, H - y1, a),
      text: (x, y, s, a) => M.scritta(crea, x, H - y, s, a),
      dot: (x, y, r, a) => crea("point", [x, H - y], Object.assign({ name: "", fixed: true, size: r, highlight: false, showInfobox: false, withLabel: false, strokeWidth: 1.5 }, a)),
      poly: (P, a) => crea("curve", [P.map((p) => p[0]).concat([P[0][0]]), P.map((p) => H - p[1]).concat([H - P[0][1]])],
        Object.assign({ fixed: true, highlight: false, strokeWidth: 1, fillOpacity: 1 }, a)),
      curva: (xs, ys, a) => crea("curve", [xs, ys.map((y) => H - y)], Object.assign({ fixed: true, highlight: false, strokeWidth: 1 }, a)),
    };
  }
  function daIndirizzo(st) {
    if (st.dati.indirizzo) return;
    st.dati.indirizzo = true;
    const h = decodeURIComponent(location.hash || "");
    const v = /voce=([\w-]+)/.exec(h), k = /(?:passo|step)=(\d+)/.exec(h);
    if (!v && !k) return;
    setTimeout(() => {
      if (v && v[1] !== st.chiave()) {
        const R = window.GI_RICETTE[st.el.dataset.grafico], i = Object.keys(R.funzioni || {}).indexOf(v[1]);
        const b = st.el.querySelectorAll(".gi-chip")[i];
        if (b) b.click();
      }
      if (k) setTimeout(() => st.imposta(PASSO, +k[1]), 50);
    }, 30);
  }
  const istDaIndirizzo = (st, voci) => {
    if (st.dati.istLetta) return -1;
    st.dati.istLetta = true;
    const m = /ist=(\d+)/.exec(decodeURIComponent(location.hash || ""));
    return m && +m[1] < voci.length ? +m[1] : -1;
  };
  const chiedi = (msg, esempio) => { try { return window.prompt(msg, esempio); } catch (e) { return null; } };
  /** colori dei gruppi: niente verde (riservato ai tagli) */
  const PAL = (C) => [C.b, C.d, C.e, C.viola, C.a, C.grigio, C.blu, C.rosso];

  // ------------------------------------------------------------ istanze
  const copia = (I) => Object.assign({}, I, { A: I.A.map((a) => a.slice()), P: I.P.map((p) => p.slice()) });
  const cerchio = (n, r = 2, a0 = 90) => Array.from({ length: n }, (_, i) => [r * Math.cos((a0 - 360 / n * i) * Math.PI / 180), r * Math.sin((a0 - 360 / n * i) * Math.PI / 180)]);
  function grafo(I) {
    const n = I.n, dir = !!I.diretto;
    const archi = I.A.map((a) => {
      let [i, j] = a;
      if (!dir && i > j) [i, j] = [j, i];
      return { i, j, v: a.slice(2) };
    }).sort((x, y) => x.i - y.i || x.j - y.j);
    archi.forEach((a, t) => { a.k = t + 1; });
    const L = Array.from({ length: n + 1 }, () => []), Lin = Array.from({ length: n + 1 }, () => []), idx = {};
    for (const a of archi) {
      idx[a.i + "-" + a.j] = a;
      L[a.i].push({ j: a.j, a });
      if (dir) Lin[a.j].push({ j: a.i, a });
      else { idx[a.j + "-" + a.i] = a; L[a.j].push({ j: a.i, a }); }
    }
    for (let i = 1; i <= n; i++) { L[i].sort((x, y) => x.j - y.j); Lin[i].sort((x, y) => x.j - y.j); }
    return { n, diretto: dir, P: I.P, nome: I.nome, archi, L, Lin, idx, I };
  }
  const arco = (G, i, j) => G.idx[i + "-" + j];
  const testoArchi = (I, nv) => I.A.map((a) => `${a[0]}-${a[1]}` + (nv ? ":" + a.slice(2, 2 + nv).join(",") : "")).join(" ");
  function leggiArchi(s, n, nv, diretto) {
    const out = [], visti = new Set();
    for (const tok of String(s).split(/[\s;]+/).filter(Boolean)) {
      const m = /^(\d+)-(\d+)(?::([-\d.,]+))?$/.exec(tok);
      if (!m) return null;
      const i = +m[1], j = +m[2], v = m[3] ? m[3].split(",").map(Number) : [];
      if (i < 1 || j < 1 || i > n || j > n || i === j || v.length !== nv || v.some((x) => !Number.isFinite(x))) return null;
      const key = diretto ? i + "-" + j : Math.min(i, j) + "-" + Math.max(i, j);
      if (visti.has(key)) return null;
      visti.add(key);
      out.push([i, j, ...v]);
    }
    return out.length ? out : null;
  }
  function connesso(n, A) {
    const L = Array.from({ length: n + 1 }, () => []);
    for (const [i, j] of A) { L[i].push(j); L[j].push(i); }
    const vis = new Set([1]), coda = [1];
    while (coda.length) for (const j of L[coda.shift()]) if (!vis.has(j)) { vis.add(j); coda.push(j); }
    return vis.size === n;
  }
  /** disegno leggibile: nessun arco passa vicino a un nodo che non è suo estremo e le metà di due archi (dove
   *  stanno le etichette) non sono troppo vicine; distanze in unità delle coordinate (cerchio di raggio 2) */
  function leggibile(I, dNodo = 0.32, dMeta = 0.5) {
    const P = I.P, A = I.A.map((a) => [P[a[0] - 1], P[a[1] - 1], a[0], a[1]]);
    const dSeg = (p, a, b) => {
      const dx = b[0] - a[0], dy = b[1] - a[1], t = clamp(((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1), 0, 1);
      return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
    };
    for (const [a, b, i, j] of A) for (let v = 1; v <= I.n; v++) if (v !== i && v !== j && dSeg(P[v - 1], a, b) < dNodo) return false;
    const meta = A.map(([a, b]) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]);
    for (let x = 0; x < meta.length; x++) for (let y = x + 1; y < meta.length; y++) if (Math.hypot(meta[x][0] - meta[y][0], meta[x][1] - meta[y][1]) < dMeta) return false;
    return true;
  }
  function casuale(o = {}) {
    const [n0, n1] = o.n || [6, 8], p = o.p || 0.35, vals = o.valori || [];
    for (let tent = 0; tent < 500; tent++) {
      const n = M.casuale(n0, n1), A = [];
      for (let i = 1; i <= n; i++) for (let j = 1; j <= n; j++) {
        if (i === j || (!o.diretto && j < i)) continue;
        if (o.diretto && A.some((a) => a[0] === j && a[1] === i) && !o.antiparalleli) continue;
        if (Math.random() < p) A.push([i, j, ...vals.map(([lo, hi]) => M.casuale(lo, hi))]);
      }
      if (o.connesso !== false && !connesso(n, A)) continue;
      const I = { n, diretto: !!o.diretto, A, P: cerchio(n, 2) };
      if (o.leggibile !== false && !leggibile(I)) continue;
      if (o.prova && !o.prova(grafo(I), I)) continue;
      return I;
    }
    return null;
  }

  // ------------------------------------------------------------ disegno del grafo
  /** i punti più esterni degli archi curvi (le pieghe dell'istanza), da tenere dentro il riquadro */
  function apici(G) {
    const pp = G.I && G.I.pieghe, out = [];
    if (!pp) return out;
    for (const [k, g] of Object.entries(pp)) {
      const [i, j] = k.split("-").map(Number);
      if (!G.P[i - 1] || !G.P[j - 1]) continue;
      const [x0, y0] = G.P[i - 1], [x1, y1] = G.P[j - 1], f = 0.5 * 0.5 * Math.tan(g * Math.PI / 180);
      out.push([(x0 + x1) / 2 - f * (y1 - y0), (y0 + y1) / 2 + f * (x1 - x0)]);
    }
    return out;
  }
  function disposizione(G, box, opz = {}) {
    const P = G.P, Q = P.concat(apici(G)), xs = Q.map((p) => p[0]), ys = Q.map((p) => p[1]);
    const [xa, xb, ya, yb] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    const r = opz.r || clamp(Math.min(box.w, box.h) / (5 + 1.6 * Math.sqrt(G.n)), 11, 19);
    const mg = (opz.margine == null ? 24 : opz.margine) + r;
    const bw = Math.max(10, box.w - 2 * mg), bh = Math.max(10, box.h - 2 * mg);
    const sc = Math.min(bw / Math.max(xb - xa, 1e-6), bh / Math.max(yb - ya, 1e-6));
    const ox = box.x + mg + (bw - sc * (xb - xa)) / 2, oy = box.y + mg + (bh - sc * (yb - ya)) / 2;
    return { X: (i) => ox + sc * (P[i - 1][0] - xa), Y: (i) => oy + sc * (yb - P[i - 1][1]), r, sc };
  }
  /** punti della curva di un arco (diritto o piegato) e la tangente in fondo */
  function geometria(x0, y0, x1, y1, piega) {
    const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1;
    if (!piega) return { pt: (t) => [x0 + t * dx, y0 + t * dy], tan: () => [dx / L, dy / L], L };
    // controllo della quadratica: a sinistra della direzione di percorrenza (in pixel, y verso il basso)
    const cx = (x0 + x1) / 2 + piega * L * (dy / L), cy = (y0 + y1) / 2 - piega * L * (dx / L);
    const pt = (t) => [(1 - t) * (1 - t) * x0 + 2 * t * (1 - t) * cx + t * t * x1, (1 - t) * (1 - t) * y0 + 2 * t * (1 - t) * cy + t * t * y1];
    const tan = (t) => { const tx = 2 * (1 - t) * (cx - x0) + 2 * t * (x1 - cx), ty = 2 * (1 - t) * (cy - y0) + 2 * t * (y1 - cy), l = Math.hypot(tx, ty) || 1; return [tx / l, ty / l]; };
    return { pt, tan, L };
  }
  function disegnaGrafo(d, G, box, opz, C) {
    opz = opz || {};
    if (opz.fuori && opz.margine == null) {      // spazio per le etichette esterne più lunghe
      let lmax = 0;
      for (let i = 1; i <= G.n; i++) { const f = opz.fuori(i); if (f && f.testo != null) lmax = Math.max(lmax, String(f.testo).length); }
      opz = Object.assign({}, opz, { margine: Math.max(24, lmax * 7 + 12) });
    }
    const lay = disposizione(G, box, opz), { X, Y, r } = lay;
    const bg = M.scuro() ? "#1b2636" : "#ffffff";
    const fs = opz.fs || clamp(r * 0.82, 11, 14);
    const etichette = [];
    for (const a of G.archi) {
      const s = Object.assign({ colore: C.muted, spessore: 1.6, dash: 0, opacita: 0.8, etichetta: null }, opz.arco ? opz.arco(a) || {} : {});
      if (s.nascosto) continue;
      const anti = G.diretto && G.idx[a.j + "-" + a.i];
      const pp = G.I && G.I.pieghe, pg = pp ? (pp[a.i + "-" + a.j] != null ? pp[a.i + "-" + a.j] : pp[a.j + "-" + a.i] != null ? -pp[a.j + "-" + a.i] : null) : null;
      const piega = pg != null ? 0.5 * Math.tan(pg * Math.PI / 180) : anti ? (opz.curva == null ? 0.18 : opz.curva) : 0;
      const x0 = X(a.i), y0 = Y(a.i), x1 = X(a.j), y1 = Y(a.j);
      const g = geometria(x0, y0, x1, y1, piega);
      // dal bordo del nodo di coda al bordo del nodo di testa (cercando t sulla curva)
      const fuoriDa = (cx, cy, rr, da, verso) => {
        let t = da;
        for (let q = 0; q < 60; q++) { const [px, py] = g.pt(t); if (Math.hypot(px - cx, py - cy) >= rr) break; t += verso * 0.01; }
        return clamp(t, 0, 1);
      };
      const ta = fuoriDa(x0, y0, r, 0, 1), freccia = G.diretto ? Math.max(9, 5 + 2 * s.spessore) : 0;
      const tb = fuoriDa(x1, y1, r + freccia * 0.85, 1, -1), tbFreccia = fuoriDa(x1, y1, r + 0.5, 1, -1);
      const N = piega ? 24 : 1, xs = [], ys = [];
      for (let q = 0; q <= N; q++) { const [px, py] = g.pt(ta + (tb - ta) * q / N); xs.push(px); ys.push(py); }
      d.curva(xs, ys, { strokeColor: s.colore, strokeWidth: s.spessore, dash: s.dash, strokeOpacity: s.opacita, lineCap: "round" });
      if (G.diretto) {
        const [hx, hy] = g.pt(tbFreccia), [ux, uy] = g.tan(tbFreccia), lw = freccia * 0.5;
        d.poly([[hx, hy], [hx - freccia * ux + lw * uy, hy - freccia * uy - lw * ux], [hx - freccia * ux - lw * uy, hy - freccia * uy + lw * ux]],
          { strokeColor: s.colore, fillColor: s.colore, strokeOpacity: s.opacita, fillOpacity: s.opacita });
      }
      if (s.etichetta != null && s.etichetta !== "") {
        const [mx, my] = g.pt(piega ? 0.5 : (s.posizione || 0.5));
        etichette.push([mx, my, String(s.etichetta), s.colEt || C.testo, s.grassetto]);
      }
    }
    // le etichette degli archi, sopra tutti gli archi: un riquadro del colore dello sfondo
    for (const [mx, my, txt, col, gr] of etichette) {
      const w = txt.length * fs * 0.6 + 7, h = fs + 5;
      d.rect(mx - w / 2, my - h / 2, w, h, { strokeColor: col, strokeOpacity: 0.35, strokeWidth: 1, fillColor: bg, fillOpacity: 0.96 });
      d.text(mx, my, txt, { fontSize: fs, strokeColor: col, cssStyle: "font-weight:" + (gr ? 800 : 600) + ";pointer-events:none" });
    }
    // i nodi
    const cx = G.P.reduce((s, p, i) => s + X(i + 1), 0) / G.n, cy = G.P.reduce((s, p, i) => s + Y(i + 1), 0) / G.n;
    for (let i = 1; i <= G.n; i++) {
      const s = Object.assign({ fondo: bg, bordo: C.muted, spessore: 2, testo: C.testo, opacita: 1 }, opz.nodo ? opz.nodo(i) || {} : {});
      d.dot(X(i), Y(i), r, { fillColor: s.fondo, fillOpacity: s.opacita, strokeColor: s.bordo, strokeWidth: s.spessore });
      d.text(X(i), Y(i), String(i), { fontSize: clamp(r * 0.95, 11, 16), strokeColor: s.testo, cssStyle: "font-weight:800;pointer-events:none" });
      const f = opz.fuori ? opz.fuori(i) : null;
      if (f && f.testo != null) {
        let ux = X(i) - cx, uy = Y(i) - cy;
        const l = Math.hypot(ux, uy);
        if (l < 1) { ux = 0; uy = -1; } else { ux /= l; uy /= l; }
        const dd = r + 6 + fs * 0.35 + Math.abs(ux) * String(f.testo).length * fs * 0.27;
        d.text(X(i) + ux * dd, Y(i) + uy * (r + 4 + fs * 0.7), String(f.testo), { fontSize: fs, strokeColor: f.colore || C.blu, cssStyle: "font-weight:700;pointer-events:none" });
      }
    }
    return lay;
  }
  /** Divide la board fra il grafo e una fascia di letture (LIST, lati ordinati, …): sotto il grafo (alto `basso`
   *  pixel) se il grafo è largo, a destra (largo `destra` pixel) se il grafo, con la sua forma, guadagna altezza.
   *  Restituisce { grafo: box, fascia: box, aDestra } */
  function divisione(G, W, H, basso = 96, destra = 290) {
    const Q = G.P.concat(apici(G)), xs = Q.map((p) => p[0]), ys = Q.map((p) => p[1]);
    const ar = (Math.max(...xs) - Math.min(...xs) + 1) / (Math.max(...ys) - Math.min(...ys) + 1);
    const scSotto = Math.min((W - 16) / ar, H - basso - 6), scLato = Math.min((W - destra - 16) / ar, H - 12);
    if (scLato > scSotto * 1.08 && W - destra > 360)
      return { aDestra: true, grafo: { x: 8, y: 6, w: W - destra - 16, h: H - 12 }, fascia: { x: W - destra, y: 10, w: destra - 12, h: H - 20 } };
    return { aDestra: false, grafo: { x: 8, y: 6, w: W - 16, h: H - basso - 6 }, fascia: { x: 10, y: H - basso + 2, w: W - 20, h: basso - 4 } };
  }
  /** una fila di caselle (LIST, coda, pila…): restituisce la larghezza occupata */
  function cellaLista(d, x, y, valori, opz, C) {
    opz = opz || {};
    const w = opz.w || 30, h = opz.h || 26, bg = M.scuro() ? "#1b2636" : "#ffffff";
    let x0 = x;
    if (opz.titolo) { d.text(x, y + h / 2, opz.titolo, { anchorX: "left", fontSize: 13, strokeColor: C.muted, cssStyle: "font-style:italic" }); x0 += opz.titoloW || 110; }
    if (!valori.length) { d.text(x0, y + h / 2, opz.vuota || T("(vuota)", "(empty)"), { anchorX: "left", fontSize: 13, strokeColor: C.muted }); return x0 - x + 60; }
    const perRiga = opz.perRiga || valori.length;
    valori.forEach((v, q) => {
      const ev = Array.isArray(opz.evid) ? opz.evid.includes(q) : q === opz.evid, col = ev ? (opz.colEvid || C.a) : C.b;
      const xq = x0 + (q % perRiga) * w, yq = y + Math.floor(q / perRiga) * (h + 6);
      d.rect(xq, yq, w - 3, h, { strokeColor: col, strokeWidth: ev ? 2.6 : 1.4, fillColor: ev ? col : bg, fillOpacity: ev ? 0.3 : 1 });
      d.text(xq + (w - 3) / 2, yq + h / 2, String(v), { fontSize: 13.5, strokeColor: C.testo, cssStyle: "font-weight:" + (ev ? 800 : 600) });
    });
    return x0 - x + Math.min(perRiga, valori.length) * w;
  }

  // ------------------------------------------------------------ stato, istanze e menu
  function stato(st, calcola, extra = "") {
    const D = st.dati;
    const firma = [D.g.id, st.chiave(), extra].join("|");
    if (D.firmaR !== firma) { D.firmaR = firma; D.R = calcola(D.g, st.chiave(), st); }
    const K = D.R.passi.length - 1, k = M.passoK(st, K, PASSO);
    return { D, G: D.g, R: D.R, K, k, P: D.R.passi[k] };
  }
  /** menu a tendina generico (una volta per grafico e per id; si riallinea a ogni chiamata) */
  function menu(st, id, voci, valore, cambia) {
    const D = st.dati;
    D.menus = D.menus || {};
    let sel = D.menus[id] && st.el.contains(D.menus[id]) ? D.menus[id] : null;
    const firma = voci.map((v) => v[0] + "=" + v[1]).join("|");
    if (!sel || sel.dataset.voci !== firma) {
      if (sel) sel.remove();
      sel = GI.h("select", { class: "gi-btn", "aria-label": id, title: id, style: "margin:.1em 0 .45em;max-width:100%;display:block" },
        voci.map(([v, t]) => `<option value="${v}">${t}</option>`).join(""));
      sel.dataset.voci = firma;
      sel.onchange = () => { M.ferma(st); cambia(sel.value); };
      const dopo = D.menuIst && st.el.contains(D.menuIst) ? D.menuIst : null;
      const prima = Object.values(D.menus).filter((m) => st.el.contains(m)).pop();
      if (prima) prima.after(sel);
      else if (dopo) dopo.after(sel);
      else if (D.comandi && st.el.contains(D.comandi)) D.comandi.before(sel);
      else M.pannello(st).prepend(sel);
      D.menus[id] = sel;
    }
    sel.value = String(valore);
    return sel;
  }
  function menuIstanze(st, voci, scelta, cambia) {
    const D = st.dati;
    let sel = D.menuIst && st.el.contains(D.menuIst) ? D.menuIst : null;
    if (!sel || sel.dataset.voci !== voci.map((v) => v[0]).join("|")) {
      if (sel) sel.remove();
      sel = GI.h("select", { class: "gi-btn", title: T("istanza", "instance"), "aria-label": T("istanza", "instance"), style: "margin:.1em 0 .45em;max-width:100%;display:block" },
        `<option value="-1" disabled>${T("Istanza: altra", "Instance: other")}</option>` +
        voci.map(([n], i) => `<option value="${i}">${T("Istanza: ", "Instance: ")}${n}</option>`).join(""));
      sel.dataset.voci = voci.map((v) => v[0]).join("|");
      sel.onchange = () => { M.ferma(st); cambia(+sel.value); };
      if (D.comandi && st.el.contains(D.comandi)) D.comandi.before(sel);
      else M.pannello(st).prepend(sel);
      D.menuIst = sel;
    }
    sel.value = String(scelta());
    return sel;
  }
  function montaIstanze(st, ES, opz = {}) {
    const D = st.dati, i0 = istDaIndirizzo(st, ES);
    if (!D.g || i0 >= 0) D.g = Object.assign(copia(ES[Math.max(0, i0)]), { id: nuovoId(), es: Math.max(0, i0) });
    D.nuova = (I, es = -1) => {
      D.g = Object.assign(I, { id: nuovoId(), es });
      if (opz.dopo) opz.dopo(D.g);
      vaiA(st, 0); M.ferma(st); st.aggiorna();
    };
    const nv = opz.nv || 0, nMax = opz.nMax || 10, dir = !!opz.diretto;
    const es = nv ? (dir ? "6 ; 1-2:4 1-3:2 2-4:5 3-2:1" : "5 ; 1-2:4 1-3:2 2-3:5 3-4:1 4-5:3") : "5 ; 1-2 1-3 2-4 3-2 4-5";
    const nomi = opz.nomiValori || "w";
    const altri = [];
    if (opz.casuale) altri.push([T("Casuale", "Random"), T("un'istanza casuale", "a random instance"), () => { const I = opz.casuale(); if (I) D.nuova(I); }]);
    altri.push([T("Modifica…", "Edit…"), T("scrivi il numero di nodi e gli archi", "type the number of nodes and the arcs"), () => {
      const G = D.g, attuale = `${G.n} ; ` + testoArchi(G, nv);
      const s = chiedi(T(`Numero di nodi (da 2 a ${nMax}) e ${dir ? "archi i-j" : "spigoli i-j"}${nv ? `:${nomi}` : ""} separati da spazi, per esempio: ${es}`,
        `Number of nodes (2 to ${nMax}) and ${dir ? "arcs i-j" : "edges i-j"}${nv ? `:${nomi}` : ""} separated by spaces, for example: ${es}`), attuale);
      if (!s) return;
      const [a, b] = s.split(";"), n = Number(String(a).trim()), A = b == null ? null : leggiArchi(b, n, nv, dir);
      if (!(Number.isInteger(n) && n >= 2 && n <= nMax) || !A) {
        window.alert(T(`Dati non validi: n fra 2 e ${nMax}, ${dir ? "archi" : "spigoli"} i-j${nv ? `:${nomi}` : ""} con nodi fra 1 e n, senza ripetizioni.`,
          `Invalid data: n between 2 and ${nMax}, ${dir ? "arcs" : "edges"} i-j${nv ? `:${nomi}` : ""} with nodes between 1 and n, no repetitions.`));
        return;
      }
      const I = Object.assign({}, G, { n, A, P: n === G.n ? G.P.map((p) => p.slice()) : cerchio(n, 2), nome: undefined });
      if (opz.valida) { const err = opz.valida(I); if (err) { window.alert(err); return; } }
      D.nuova(I);
    }]);
    M.comandi(st, altri.concat(opz.altri || []), { k: PASSO, ritmo: opz.ritmo || 900 });
    menuIstanze(st, ES.map((e) => [e.nome]), () => D.g.es, (i) => D.nuova(copia(ES[i]), i));
    if (opz.dopo && i0 >= 0) opz.dopo(D.g);
  }
  const allinea = (st, ES) => { if (st.dati.nuova) menuIstanze(st, ES.map((e) => [e.nome]), () => st.dati.g.es, (i) => st.dati.nuova(copia(ES[i]), i)); };

  window.GI_NO = {
    PASSO, parPasso, vaiA, clamp, lista, nuovoId, osservaDimensioni, nuovaVoce, dim, pix, disegno, daIndirizzo, istDaIndirizzo, chiedi, PAL,
    copia, cerchio, grafo, arco, testoArchi, leggiArchi, casuale, connesso,
    disposizione, geometria, disegnaGrafo, cellaLista, divisione, leggibile,
    stato, menu, menuIstanze, montaIstanze, allinea,
  };
})();
