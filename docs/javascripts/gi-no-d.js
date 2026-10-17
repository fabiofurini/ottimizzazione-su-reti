/* Laboratorio di «Ottimizzazione su reti / Network Optimization»: trasporto e assegnamento (capitolo 7).
 *
 *   no-transportation  la tabella dei trasporti: soluzione iniziale con la regola dell'angolo nord-ovest o del costo
 *                      minimo (una cella per passo, una linea cancellata per passo: se ā_i = 0 e c'è un'altra riga
 *                      attiva si cancella la riga, anche se la colonna è esaurita; altrimenti la colonna), poi il
 *                      metodo dei potenziali: potenziali della base (c̄_ij = 0 sulle celle di base, π_{m+n} = 0,
 *                      ricavati scorrendo le celle di base in ordine riga-colonna), costi ridotti
 *                      c̄_ij = c_ij − π_i + π_j, cella entrante con il c̄ più negativo (a parità i, poi j più piccoli),
 *                      ciclo scritto dalla cella entrante muovendosi prima lungo la sua riga (segni +, −, +, …),
 *                      θ = minimo di x̄ sulle celle «−», cella uscente = la prima «−» con x̄ = θ in ordine
 *                      riga-colonna. A destra la rete bipartita: le celle di base formano un albero.
 *   no-assignment      l'algoritmo ungherese: riduzione per righe e per colonne (potenziali π_i = sottratto alla riga,
 *                      π_j = meno il sottratto alla colonna), insieme massimo di zeri indipendenti con i cammini
 *                      aumentanti (righe in ordine crescente, colonne in ordine crescente, in profondità), linee della
 *                      costruzione di König (righe non raggiunte, colonne raggiunte dai cammini alternanti),
 *                      δ = minimo scoperto (cella: la prima in ordine riga-colonna), aggiustamento.
 *                      A destra gli zeri come archi di un grafo bipartito: gli zeri indipendenti sono un abbinamento.
 *
 * Numerazione del capitolo: origini 1..m, destinazioni m+1..m+n (m, n = numero di origini e di destinazioni).
 * Istanze, regole di parità e tracce: 07_TRANSPORTATION_AND_ASSIGNMENT/script/verifica.py (test:
 * python/test/controlla_app_no_d.py). Il disegno dei grafi e i comandi vengono dal motore gi-no-0.js (window.GI_NO).
 * Verde riservato ai tagli: qui non si usa. Le funzioni di calcolo sono anche in window.GI_NO_D, per le prove.
 */
(function () {
  "use strict";
  const GI = window.GI, M = window.GI_MIP, N = window.GI_NO, T = GI.T;
  const { PASSO, parPasso, vaiA, clamp, osservaDimensioni, nuovaVoce, dim, pix, disegno, daIndirizzo } = N;
  window.GI_RICETTE = window.GI_RICETTE || {};
  const bg = () => (M.scuro() ? "#1b2636" : "#ffffff");
  const intervallo = (a, b) => Array.from({ length: b - a + 1 }, (_, t) => a + t);
  const chiave = (i, j) => i + "-" + j;
  const cella = (k) => k.split("-").map(Number);
  const lex = (p, q) => { const [a, b] = cella(p), [c, d] = cella(q); return a - c || b - d; };
  /** pedici: «35», oppure «3,10» se un indice ha due cifre */
  const ij = (i, j) => (i > 9 || j > 9 ? `${i},${j}` : `${i}${j}`);
  const cTex = (k) => { const [i, j] = cella(k); return `(${i},${j})`; };
  const cTxt = cTex;
  const somma = (v) => v.reduce((s, x) => s + x, 0);
  /** «a − b + c» in TeX con i segni giusti: termini [[segno, valore], …] */
  const espr = (termini) => termini.map(([s, v], q) => {
    const neg = (s < 0) !== (v < 0), a = Math.abs(v);
    return q === 0 ? (neg ? `-${a}` : `${a}`) : (neg ? ` - ${a}` : ` + ${a}`);
  }).join("");
  const elenco = (v, e = T(" e ", " and ")) => (v.length < 2 ? v.join("") : v.slice(0, -1).join(", ") + e + v[v.length - 1]);
  const copiaDati = (I) => JSON.parse(JSON.stringify(I));

  // ------------------------------------------------------------ istanze, menu e comandi (tabelle, non grafi)
  /** come N.montaIstanze, per istanze date da tabelle: menu «Istanza», ◀ ▶ Esegui, «Casuale», «Modifica…» */
  function montaDati(st, ES, opz) {
    const D = st.dati, i0 = N.istDaIndirizzo(st, ES);
    if (!D.g || i0 >= 0) D.g = Object.assign(copiaDati(ES[Math.max(0, i0)]), { id: N.nuovoId(), es: Math.max(0, i0) });
    D.nuova = (I, es = -1) => { D.g = Object.assign(I, { id: N.nuovoId(), es }); vaiA(st, 0); M.ferma(st); st.aggiorna(); };
    M.comandi(st, [
      [T("Casuale", "Random"), T("un'istanza casuale", "a random instance"), () => { const I = opz.casuale(); if (I) D.nuova(I); }],
      [T("Modifica…", "Edit…"), opz.titolo, () => {
        const s = N.chiedi(opz.messaggio, opz.testo(D.g));
        if (!s) return;
        const I = opz.leggi(s);
        if (typeof I === "string") { window.alert(I); return; }
        D.nuova(I);
      }],
    ], { k: PASSO, ritmo: opz.ritmo || 900 });
    allineaDati(st, ES);
  }
  const allineaDati = (st, ES) => N.menuIstanze(st, ES.map((e) => [e.nome]), () => st.dati.g.es, (i) => st.dati.nuova(copiaDati(ES[i]), i));

  // ------------------------------------------------------------ disegno di una tabella (pixel, y verso il basso)
  /** geometria di una tabella: colonna delle etichette, nc colonne di dati, nm colonne di margine; riga di
   *  intestazione e nr righe (dati e piede). X(c), XM(t) = bordo sinistro; Y(r) = bordo superiore. */
  function geometria(box, nc, nm, nr, rhMax = 50) {
    const labW = clamp(box.w * 0.08, 28, 46);
    const rh = clamp((box.h - 2) / (nr + 0.8), 20, rhMax);
    const cw = clamp((box.w - labW - 2) / (nc + 0.92 * nm), 28, Math.max(rh * 1.9, 46));
    const mw = cw * 0.92, hh = rh * 0.8;
    const totW = labW + nc * cw + nm * mw, totH = hh + nr * rh;
    const x0 = box.x + Math.max(0, (box.w - totW) / 2), y0 = box.y + Math.max(0, (box.h - totH) / 2) * 0.4;
    const fs = clamp(Math.min(rh * 0.42, cw * 0.3), 11.5, 17), fp = clamp(Math.min(rh * 0.29, cw * 0.22), 9.5, 12.5);
    return { labW, rh, cw, mw, hh, totW, totH, x0, y0, fs, fp, nc, nm, nr,
      X: (c) => x0 + labW + c * cw, XM: (t) => x0 + labW + nc * cw + t * mw, Y: (r) => y0 + hh + r * rh };
  }
  /** la griglia: linee sottili fra le celle, più marcate fra etichette, dati, margini e piede (riga `piede`) */
  function griglia(d, g, piede, C) {
    const xA = g.x0, xB = g.x0 + g.totW, yA = g.y0, yB = g.y0 + g.totH, xD = g.X(g.nc);
    for (let r = 0; r <= g.nr; r++) {
      const forte = r === 0 || r === piede;
      d.line(xA, g.Y(r), xB, g.Y(r), { strokeColor: forte ? C.muted : C.line, strokeWidth: forte ? 1.4 : 1, strokeOpacity: forte ? 0.55 : 1 });
    }
    for (let c = 0; c <= g.nc; c++) {
      const forte = c === 0 || c === g.nc;
      d.line(g.X(c), yA, g.X(c), yB, { strokeColor: forte ? C.muted : C.line, strokeWidth: forte ? 1.4 : 1, strokeOpacity: forte ? 0.55 : 1 });
    }
    for (let t = 1; t <= g.nm; t++) d.line(g.XM(t), yA, g.XM(t), yB, { strokeColor: C.line, strokeWidth: 1 });
    d.line(xA, yB, xB, yB, { strokeColor: C.muted, strokeWidth: 1.4, strokeOpacity: 0.55 });
    return { xA, xB, yA, yB, xD };
  }
  /** numeri sul disegno con il segno meno tipografico */
  const num = (v) => (typeof v === "number" && v < 0 ? "−" + -v : String(v));
  const testo = (d, x, y, s, fs, col, peso = 600, extra = "") => d.text(x, y, num(s), { fontSize: fs, strokeColor: col, cssStyle: `font-weight:${peso};pointer-events:none;${extra}` });

  // =================================================================
  // 1. TRASPORTO: SOLUZIONE INIZIALE E METODO DEI POTENZIALI
  // =================================================================
  // le istanze del capitolo (verifica.py: A_P, D_P, C_P; A_G, D_G, C_G; A_U con la destinazione fittizia 8; C_ASS con
  // offerte e domande unitarie) e degli esercizi 7.1, 7.2, 7.3, 7.5 (EXERCISES/EX_k). fitt: "d" = l'ultima
  // destinazione è fittizia, "o" = l'ultima origine è fittizia (costi 0)
  const C_ASS = [[2, 4, 3, 5], [4, 8, 1, 1], [2, 6, 9, 6], [1, 9, 8, 6]];
  const TR_ES = [
    { nome: T("magazzini e negozi (es. 7.1)", "warehouses and stores (Ex. 7.1)"),
      a: [30, 30, 30], d: [10, 25, 15, 40], c: [[1, 9, 2, 3], [3, 4, 2, 2], [9, 1, 4, 6]] },
    { nome: T("pivot degenere (es. 7.8)", "degenerate pivot (Ex. 7.8)"),
      a: [30, 25, 30], d: [30, 30, 25], c: [[1, 4, 7], [6, 2, 5], [3, 9, 5]] },
    { nome: T("destinazione fittizia, a₁ = 40 (es. 7.2)", "dummy destination, a₁ = 40 (Ex. 7.2)"),
      a: [40, 30, 30], d: [10, 25, 15, 40, 10], c: [[1, 9, 2, 3, 0], [3, 4, 2, 2, 0], [9, 1, 4, 6, 0]], fitt: "d" },
    { nome: T("assegnamento come trasporto (es. 7.9)", "assignment as transportation (Ex. 7.9)"),
      a: [1, 1, 1, 1], d: [1, 1, 1, 1], c: C_ASS },
    { nome: T("esercizio 7.1 (destinazione fittizia 7)", "Exercise 7.1 (dummy destination 7)"),
      a: [30, 40, 20], d: [15, 25, 40, 10], c: [[7, 4, 7, 0], [1, 6, 8, 0], [9, 9, 6, 0]], fitt: "d" },
    { nome: T("esercizio 7.2", "Exercise 7.2"), a: [30, 15, 25], d: [15, 5, 45, 5], c: [[4, 6, 8, 8], [2, 2, 7, 7], [8, 7, 3, 2]] },
    { nome: T("esercizio 7.3", "Exercise 7.3"), a: [20, 10, 25], d: [10, 10, 35], c: [[7, 3, 7], [5, 3, 1], [6, 7, 8]] },
    { nome: T("esercizio 7.5", "Exercise 7.5"), a: [30, 20, 15], d: [35, 10, 20], c: [[2, 4, 1], [4, 8, 5], [9, 1, 1]] },
  ].map((e) => Object.assign({ m: e.a.length, n: e.d.length, fitt: null }, e));

  /** i potenziali della base T (chiavi "i-j"): π_{m+n} = 0, poi si scorrono le celle di base in ordine riga-colonna
   *  finché ogni nodo ha il suo potenziale (come verifica.potenziali). ordine = [[nodo, cella da cui viene]] */
  function potenziali(m, n, T, c) {
    const pi = { [m + n]: 0 }, ordine = [[m + n, null]], Ts = T.slice().sort(lex);
    let noti = 1;
    while (noti < m + n) {
      let avanti = false;
      for (const k of Ts) {
        const [i, j] = cella(k);
        if (j in pi && !(i in pi)) { pi[i] = pi[j] + c(i, j); ordine.push([i, k]); noti++; avanti = true; }
        else if (i in pi && !(j in pi)) { pi[j] = pi[i] - c(i, j); ordine.push([j, k]); noti++; avanti = true; }
      }
      if (!avanti) throw new Error("T is not a spanning tree");
    }
    return { pi, ordine };
  }
  /** il ciclo di T + e: e, poi le celle del cammino da k a l nell'albero (prima lungo la riga k) */
  function cicloDi(T, e) {
    const [k, l] = cella(e), adj = {};
    for (const f of T) {
      const [i, j] = cella(f);
      (adj[i] = adj[i] || []).push(j);
      (adj[j] = adj[j] || []).push(i);
    }
    const pred = { [k]: null }, pila = [k];
    while (pila.length) {
      const w = pila.pop();
      for (const z of (adj[w] || []).slice().sort((p, q) => p - q)) if (!(z in pred)) { pred[z] = w; pila.push(z); }
    }
    const P = [l];
    while (P[P.length - 1] !== k) P.push(pred[P[P.length - 1]]);
    P.reverse();                                 // k, j1, i1, j2, …, l
    const C = [e];
    for (let t = 0; t + 1 < P.length; t++) C.push(chiave(Math.min(P[t], P[t + 1]), Math.max(P[t], P[t + 1])));
    return C;
  }
  const costoDi = (x, c) => somma(Object.keys(x).map((k) => { const [i, j] = cella(k); return c(i, j) * x[k]; }));

  /** Tutti i passi: «dati», un «sel» per ogni cella della regola iniziale, poi per ogni iterazione del metodo dei
   *  potenziali «pot», «rid», «ciclo», «pivot», e alla fine «pot», «ottimo». Restituisce anche la traccia nella forma
   *  di verifica.py (ini: celle, quantità e linee cancellate; tr: base, x, pi, cb, z, entrante, ciclo, θ, uscente). */
  function trCalcola(I, regola) {
    const m = I.m, n = I.n, c = (i, j) => I.c[i - 1][j - m - 1];
    const O = intervallo(1, m), Dn = intervallo(m + 1, m + n), tutte = [];
    for (const i of O) for (const j of Dn) tutte.push(chiave(i, j));
    const ra = {}, rd = {};
    O.forEach((i) => { ra[i] = I.a[i - 1]; });
    Dn.forEach((j) => { rd[j] = I.d[j - m - 1]; });
    let righe = O.slice(), colonne = Dn.slice();
    const x = {}, base = [], passi = [], ini = [], canc = { r: [], c: [] };
    const foto = (o) => passi.push(Object.assign({ fase: "ini", x: Object.assign({}, x), base: base.slice(), ra: Object.assign({}, ra), rd: Object.assign({}, rd),
      cancR: canc.r.slice(), cancC: canc.c.slice() }, o));
    foto({ tipo: "dati" });
    while (colonne.length) {
      let e, pari = [];
      if (regola === "costo-minimo") {
        let best = null;
        for (const i of righe) for (const j of colonne) if (best === null || c(i, j) < c(best[0], best[1])) best = [i, j];
        e = best;
        for (const i of righe) for (const j of colonne) if (c(i, j) === c(e[0], e[1])) pari.push(chiave(i, j));
      } else e = [righe[0], colonne[0]];
      const [i, j] = e, prima = { a: ra[i], d: rd[j] }, q = Math.min(ra[i], rd[j]);
      x[chiave(i, j)] = q;
      base.push(chiave(i, j));
      ra[i] -= q; rd[j] -= q;
      let linea;
      if (ra[i] === 0 && righe.length > 1) { righe = righe.filter((r) => r !== i); canc.r.push(i); linea = { riga: i }; }
      else {
        colonne = colonne.filter((cc) => cc !== j); canc.c.push(j);
        if (colonne.length) linea = { colonna: j };
        else { linea = { riga: i, colonna: j }; canc.r.push(i); }
      }
      ini.push({ cella: chiave(i, j), q, linea });
      foto({ tipo: "sel", s: ini.length, cella: chiave(i, j), q, linea, prima, pari, doppia: prima.a === prima.d, fine: !colonne.length, z: costoDi(x, c) });
    }
    // il metodo dei potenziali dalla base trovata
    let Tb = base.slice().sort(lex), X = {};
    Tb.forEach((k) => { X[k] = x[k] || 0; });
    const tr = [];
    let stop = false;
    for (let it = 1; ; it++) {
      if (it > 100) { stop = true; break; }
      const { pi, ordine } = potenziali(m, n, Tb, c), cb = {};
      for (const k of tutte) { const [i, j] = cella(k); cb[k] = c(i, j) - pi[i] + pi[j]; }
      const z = costoDi(X, c), comune = { fase: "pot", it, base: Tb.slice(), x: Object.assign({}, X), pi, cb, z, cancR: [], cancC: [] };
      const neg = tutte.filter((k) => cb[k] < 0).sort((p, q) => cb[p] - cb[q] || lex(p, q));
      const voce = { base: Tb.slice(), x: Object.assign({}, X), pi, cb, z, entrante: null };
      tr.push(voce);
      passi.push(Object.assign({ tipo: "pot", ordine }, comune));
      if (!neg.length) {
        const unico = tutte.every((k) => Tb.includes(k) || cb[k] > 0) && Tb.every((k) => X[k] > 0);
        const sa = somma(O.map((i) => I.a[i - 1] * pi[i])), sd = somma(Dn.map((j) => I.d[j - m - 1] * pi[j]));
        passi.push(Object.assign({ tipo: "ottimo", unico, sa, sd, duale: sa - sd }, comune));
        break;
      }
      const e = neg[0];
      passi.push(Object.assign({ tipo: "rid", neg, entrante: e }, comune));
      const C = cicloDi(Tb, e), meno = C.filter((_, t) => t % 2 === 1), theta = Math.min(...meno.map((f) => X[f]));
      const uscente = meno.filter((f) => X[f] === theta).sort(lex)[0];
      Object.assign(voce, { entrante: e, ciclo: C, theta, uscente });
      passi.push(Object.assign({ tipo: "ciclo", entrante: e, ciclo: C, meno, theta, uscente }, comune));
      const prima = Object.assign({}, X);
      C.forEach((f, t) => { X[f] = f === e ? theta : X[f] + (t % 2 === 0 ? theta : -theta); });
      delete X[uscente];
      Tb = Tb.filter((f) => f !== uscente).concat([e]).sort(lex);
      passi.push({ tipo: "pivot", fase: "pot", it, base: Tb.slice(), x: Object.assign({}, X), prima, entrante: e, ciclo: C, uscente, theta, cbE: cb[e],
        z, zDopo: z + theta * cb[e], pi, cb, cancR: [], cancC: [] });
    }
    return { passi, m, n, regola, ini, tr, stop, x: X, base: Tb, z: costoDi(X, c) };
  }

  const TR_FUNZ = {
    "nord-ovest": { etichetta: T("Angolo nord-ovest", "North-west corner") },
    "costo-minimo": { etichetta: T("Costo minimo", "Minimum cost") },
  };
  function trStato(st) {
    return Object.assign(N.stato(st, (I, regola) => trCalcola(I, regola)), { regola: st.chiave() });
  }

  /** «Modifica…»: «a = 30 30 30 ; d = 10 25 15 40 ; c = 1 9 2 3 / 3 4 2 2 / 9 1 4 6»; se l'offerta totale e la
   *  domanda totale differiscono si aggiunge una destinazione (o un'origine) fittizia con costi 0 */
  function leggiTrasporto(s) {
    const parte = (k) => { const r = new RegExp("\\b" + k + "\\s*=\\s*([^;]*)", "i").exec(s); return r ? r[1].trim() : null; };
    const numeri = (t) => t.split(/[\s,]+/).filter(Boolean).map(Number);
    const err = T("Dati non validi. Scrivi offerte, domande e costi (righe separate da «/»), per esempio: a = 30 30 30 ; d = 10 25 15 40 ; c = 1 9 2 3 / 3 4 2 2 / 9 1 4 6. Da 1 a 6 origini e destinazioni, offerte e domande intere fra 1 e 999, costi interi fra −99 e 99.",
      "Invalid data. Write supplies, demands and costs (rows separated by «/»), for example: a = 30 30 30 ; d = 10 25 15 40 ; c = 1 9 2 3 / 3 4 2 2 / 9 1 4 6. From 1 to 6 origins and destinations, integer supplies and demands between 1 and 999, integer costs between −99 and 99.");
    const pa = parte("a"), pd = parte("d"), pc = parte("c");
    if (!pa || !pd || !pc) return err;
    const a = numeri(pa), d = numeri(pd), c = pc.split("/").map(numeri);
    const m = a.length, n = d.length;
    if (m < 1 || m > 6 || n < 1 || n > 6 || m + n < 3 || c.length !== m || c.some((r) => r.length !== n)) return err;
    if (a.concat(d).some((v) => !Number.isInteger(v) || v < 1 || v > 999)) return err;
    if (c.flat().some((v) => !Number.isInteger(v) || Math.abs(v) > 99)) return err;
    const sa = somma(a), sd = somma(d);
    const I = { m, n, a, d, c, fitt: null };
    if (sa > sd) { I.d = d.concat([sa - sd]); I.c = c.map((r) => r.concat([0])); I.n = n + 1; I.fitt = "d"; }
    if (sd > sa) { I.a = a.concat([sd - sa]); I.c = c.concat([d.map(() => 0)]); I.m = m + 1; I.fitt = "o"; }
    return I;
  }
  const testoTrasporto = (I) => `a = ${I.a.join(" ")} ; d = ${I.d.join(" ")} ; c = ${I.c.map((r) => r.join(" ")).join(" / ")}`;
  function casualeTrasporto(regola) {
    for (let tent = 0; tent < 400; tent++) {
      const m = M.casuale(2, 4), n = M.casuale(3, 5);
      const a = intervallo(1, m).map(() => 5 * M.casuale(2, 8)), tot = somma(a) / 5;
      if (tot < n + 1) continue;
      const tagli = new Set();
      while (tagli.size < n - 1) tagli.add(M.casuale(1, tot - 1));
      const t = [0, ...[...tagli].sort((p, q) => p - q), tot], d = intervallo(1, n).map((q) => 5 * (t[q] - t[q - 1]));
      const c = intervallo(1, m).map(() => intervallo(1, n).map(() => M.casuale(1, 9)));
      const I = { m, n, a, d, c, fitt: null };
      const R = trCalcola(I, regola), piv = R.tr.length - 1;
      if (!R.stop && piv >= 1 && piv <= 6) return I;
    }
    return null;
  }

  // ------------------------------------------------------------ disegno: la tabella dei trasporti
  function disegnaTableau(d, box, I, P, R, C) {
    const m = I.m, n = I.n, pot = P.fase === "pot", conPi = pot && P.tipo !== "pivot";
    const nm = conPi ? 2 : 1, nr = m + 1 + (conPi ? 1 : 0);
    const g = geometria(box, n, nm, nr);
    const { X, XM, Y, cw, mw, rh, fs, fp } = g;
    const cx = (j) => X(j - m - 1) + cw / 2, cy = (i) => Y(i - 1) + rh / 2;
    const inBase = new Set(P.base), sel = P.tipo === "sel" ? P.cella : null;
    const ent = P.tipo === "rid" || P.tipo === "ciclo" ? P.entrante : null;
    const segni = {};
    if (P.tipo === "ciclo") P.ciclo.forEach((f, t) => { segni[f] = t % 2 === 0 ? "⊕" : "⊖"; });
    const cambiate = new Set(P.tipo === "pivot" ? P.ciclo : []);
    const sotto = new Set();                     // celle sotto la spezzata del ciclo: il numero va su un fondo pieno
    if (P.tipo === "ciclo") P.ciclo.forEach((f, t) => {
      const [i1, j1] = cella(f), [i2, j2] = cella(P.ciclo[(t + 1) % P.ciclo.length]);
      for (let i = Math.min(i1, i2); i <= Math.max(i1, i2); i++) for (let j = Math.min(j1, j2); j <= Math.max(j1, j2); j++) sotto.add(chiave(i, j));
    });
    const mostraCb = P.tipo === "rid" || P.tipo === "ciclo" || P.tipo === "ottimo";
    // righe e colonne cancellate (fase iniziale): velatura grigia su tutta la linea, etichetta e residuo compresi
    for (const i of P.cancR) d.rect(g.x0, Y(i - 1), g.totW, rh, { strokeColor: "none", strokeWidth: 0, fillColor: C.grigio, fillOpacity: 0.2 });
    for (const j of P.cancC) d.rect(X(j - m - 1), g.y0, cw, g.totH, { strokeColor: "none", strokeWidth: 0, fillColor: C.grigio, fillOpacity: 0.2 });
    // fondi delle celle
    for (let i = 1; i <= m; i++) for (let j = m + 1; j <= m + n; j++) {
      const k = chiave(i, j), x0 = X(j - m - 1), y0 = Y(i - 1);
      let f = null;
      if (inBase.has(k)) f = [C.blu, 0.16];
      if (k === ent) f = [C.rosso, 0.2];
      if (k === sel) f = [C.a, 0.26];
      if (f) d.rect(x0 + 1, y0 + 1, cw - 2, rh - 2, { strokeColor: "none", strokeWidth: 0, fillColor: f[0], fillOpacity: f[1] });
    }
    const L = griglia(d, g, m, C);
    // il ciclo (passo «ciclo»): spezzata chiusa fra i centri delle celle
    if (P.tipo === "ciclo") {
      const pts = P.ciclo.concat([P.ciclo[0]]).map((f) => { const [i, j] = cella(f); return [cx(j), cy(i)]; });
      d.curva(pts.map((p) => p[0]), pts.map((p) => p[1]), { strokeColor: C.a, strokeWidth: 3, strokeOpacity: 0.75, lineCap: "round" });
    }
    // bordi: cella scelta, entrante, uscente
    const bordo = (k, col, sp, dash = 0) => { const [i, j] = cella(k); d.rect(X(j - m - 1) + 2, Y(i - 1) + 2, cw - 4, rh - 4, { strokeColor: col, strokeWidth: sp, dash, fillColor: "none" }); };
    if (sel) bordo(sel, C.a, 2.6);
    if (ent) bordo(ent, C.rosso, 2.4);
    if (P.tipo === "ciclo") bordo(P.uscente, C.a, 3, 3);
    if (P.tipo === "pivot") bordo(P.uscente, C.muted, 1.6, 3);
    // contenuti
    const fondoNumero = (xc, yc, s) => {
      const w = String(s).length * fs * 0.62 + 6, h = fs + 4;
      d.rect(xc - w / 2, yc - h / 2, w, h, { strokeColor: "none", strokeWidth: 0, fillColor: bg(), fillOpacity: 0.92 });
    };
    for (let i = 1; i <= m; i++) for (let j = m + 1; j <= m + n; j++) {
      const k = chiave(i, j), x0 = X(j - m - 1), y0 = Y(i - 1), xc = x0 + cw * 0.44, yc = y0 + rh * 0.56;
      // il costo nell'angolo in alto a destra
      const sc = String(I.c[i - 1][j - m - 1]), wc = sc.length * fp * 0.62 + 5, hc = fp + 3;
      d.rect(x0 + cw - wc - 1.5, y0 + 1.5, wc, hc, { strokeColor: C.muted, strokeOpacity: 0.45, strokeWidth: 1, fillColor: bg(), fillOpacity: 0.85 });
      d.text(x0 + cw - wc / 2 - 1.5, y0 + 1.5 + hc / 2, sc, { fontSize: fp, strokeColor: C.muted, cssStyle: "font-weight:500;pointer-events:none" });
      let s = null, col = C.testo, peso = 600;
      if (inBase.has(k)) { s = P.x[k]; peso = 800; if (cambiate.has(k) || k === sel) col = C.a; }
      else if (mostraCb) { s = P.cb[k]; col = s < 0 ? C.rosso : C.muted; peso = s < 0 ? 800 : 500; }
      if (s !== null) {
        if (sotto.has(k)) fondoNumero(xc, yc, num(s));
        testo(d, xc, yc, s, fs, col, peso);
      }
      if (segni[k]) testo(d, x0 + fp * 0.75 + 2, y0 + rh - fp * 0.75 - 1, segni[k], fp + 3, k === ent ? C.rosso : C.a, 800);
    }
    // intestazioni, etichette e margini
    const fitD = I.fitt === "d" ? m + n : -1, fitO = I.fitt === "o" ? m : -1;
    for (let j = m + 1; j <= m + n; j++) testo(d, cx(j), g.y0 + g.hh / 2, j === fitD ? j + "*" : j, fs * 0.95, j === fitD ? C.muted : C.testo, 800);
    for (let i = 1; i <= m; i++) testo(d, g.x0 + g.labW / 2, cy(i), i === fitO ? i + "*" : i, fs * 0.95, i === fitO ? C.muted : C.testo, 800);
    const ini = P.fase === "ini";
    testo(d, XM(0) + mw / 2, g.y0 + g.hh / 2, ini ? "āᵢ" : "aᵢ", fs * 0.9, C.muted, 600, "font-style:italic");
    testo(d, g.x0 + g.labW / 2, Y(m) + rh / 2, ini ? "d̄ⱼ" : "dⱼ", fs * 0.9, C.muted, 600, "font-style:italic");
    const valR = (i) => (ini ? P.ra[i] : I.a[i - 1]), valC = (j) => (ini ? P.rd[j] : I.d[j - m - 1]);
    for (let i = 1; i <= m; i++) {
      const cambia = sel && cella(sel)[0] === i;
      testo(d, XM(0) + mw / 2, cy(i), valR(i), fs * 0.92, cambia ? C.a : P.cancR.includes(i) ? C.muted : C.viola, cambia ? 800 : 700);
    }
    for (let j = m + 1; j <= m + n; j++) {
      const cambia = sel && cella(sel)[1] === j;
      testo(d, cx(j), Y(m) + rh / 2, valC(j), fs * 0.92, cambia ? C.a : P.cancC.includes(j) ? C.muted : C.viola, cambia ? 800 : 700);
    }
    if (conPi) {
      testo(d, XM(1) + mw / 2, g.y0 + g.hh / 2, "πᵢ", fs * 0.9, C.muted, 600, "font-style:italic");
      testo(d, g.x0 + g.labW / 2, Y(m + 1) + rh / 2, "πⱼ", fs * 0.9, C.muted, 600, "font-style:italic");
      for (let i = 1; i <= m; i++) testo(d, XM(1) + mw / 2, cy(i), P.pi[i], fs * 0.92, C.blu, 800);
      for (let j = m + 1; j <= m + n; j++) testo(d, cx(j), Y(m + 1) + rh / 2, P.pi[j], fs * 0.92, C.blu, 800);
    }
    return { g, L };
  }

  // ------------------------------------------------------------ disegno: la rete bipartita (l'albero della base)
  function posBipartita(m, n, dx = 5.5) {
    const alto = 1.3 * (Math.max(m, n) - 1) || 1.3, P = [];
    for (let i = 1; i <= m; i++) P.push([0, m > 1 ? alto - (i - 1) * alto / (m - 1) : alto / 2]);
    for (let j = 1; j <= n; j++) P.push([dx, n > 1 ? alto - (j - 1) * alto / (n - 1) : alto / 2]);
    return P;
  }
  /** raggio dei nodi e margine della rete bipartita: se il riquadro è basso, nodi più piccoli e meno margine in
   *  verticale (le etichette esterne stanno a sinistra e a destra, dove c'è spazio) */
  function misureRete(box, m, n, dx) {
    const k = Math.max(m, n) - 1 || 1, basso = box.w / box.h > dx / (1.3 * k) * 1.15;
    const sp = (box.h - 2 * ((basso ? 10 : 24) + 14)) / k;
    return { margine: basso ? 10 : undefined, r: clamp(sp * 0.3, 9, 17) };     // undefined: il motore lo calcola dalle etichette
  }
  function disegnaRete(d, box, I, P, C) {
    const m = I.m, n = I.n, stili = [], A = [];
    const arco = (k, s) => { const [i, j] = cella(k); A.push([i, j, stili.length]); stili.push(s); };
    const segno = {};
    if (P.tipo === "ciclo") P.ciclo.forEach((f, t) => { segno[f] = t % 2 === 0 ? "⊕" : "⊖"; });
    const inC = new Set(P.tipo === "ciclo" || P.tipo === "pivot" ? P.ciclo : []);
    for (const k of P.base) {
      // etichette sfalsate secondo l'origine, così quelle di archi vicini non si sovrappongono
      let s = { colore: C.blu, spessore: 3, opacita: 1, etichetta: String(P.x[k]), colEt: C.blu, posizione: 0.56 + 0.11 * ((cella(k)[0] - 1) % 3) };
      if (k === P.cella && P.tipo === "sel") s = Object.assign(s, { colore: C.a, spessore: 4, colEt: C.a, grassetto: true });
      if (inC.has(k)) s = Object.assign(s, { colore: C.a, spessore: 3.6, colEt: C.a, grassetto: true, etichetta: String(P.x[k]) });
      arco(k, s);
    }
    if (P.tipo === "rid" || P.tipo === "ciclo") arco(P.entrante, { colore: C.rosso, spessore: 3, dash: 3, opacita: 1, etichetta: P.tipo === "rid" ? num(P.cb[P.entrante]) : "⊕", colEt: C.rosso, grassetto: true, posizione: 0.3 });
    if (P.tipo === "pivot") arco(P.uscente, { colore: C.muted, spessore: 1.6, dash: 3, opacita: 0.7, etichetta: "0", colEt: C.muted, posizione: 0.7 });
    const G = N.grafo({ n: m + n, diretto: true, P: posBipartita(m, n), A });
    const conPi = P.fase === "pot" && P.tipo !== "pivot";
    const lay = N.disegnaGrafo(d, G, box, Object.assign(misureRete(box, m, n, 5.5), {
      arco: (a) => stili[a.v[0]],
      nodo: (v) => (v <= m ? { bordo: C.testo, spessore: 2.2 } : { bordo: C.muted, spessore: 2.2 }),
      fuori: (v) => {
        if (conPi) return { testo: `π=${num(P.pi[v])}`, colore: C.blu };
        return { testo: v <= m ? `a=${I.a[v - 1]}` : `d=${I.d[v - m - 1]}`, colore: C.viola };
      },
    }), C);
    // i segni ⊕ ⊖ del ciclo, a metà degli archi (le etichette con x̄ stanno più avanti, verso la destinazione)
    for (const [f, sg] of Object.entries(segno)) {
      if (f === P.entrante) continue;
      const [i, j] = cella(f), t = 0.42, px = lay.X(i) + t * (lay.X(j) - lay.X(i)), py = lay.Y(i) + t * (lay.Y(j) - lay.Y(i));
      const L = Math.hypot(lay.X(j) - lay.X(i), lay.Y(j) - lay.Y(i)) || 1, ox = (lay.Y(j) - lay.Y(i)) / L * 11, oy = -(lay.X(j) - lay.X(i)) / L * 11;
      testo(d, px + ox, py + oy, sg, 17, C.a, 800);
    }
  }

  window.GI_RICETTE["no-transportation"] = {
    titolo: T("Trasporto: soluzione iniziale e metodo dei potenziali", "Transportation: initial solution and potentials method"),
    funzioni: TR_FUNZ,
    etichettaFunzioni: T("Soluzione iniziale", "Initial solution"),
    parametri: [parPasso("", 0)],
    assi: false,
    opzioniBoard: M.OPZ,
    vista: [0, 400, 600, 0],
    legenda: (st) => {
      const C = M.COL(st);
      return [
        [C.blu, T("cella di base, \\(\\bar{x}_{ij}\\) in grassetto; albero della base; potenziali", "basic cell, \\(\\bar{x}_{ij}\\) in bold; basis tree; potentials"), "pieno"],
        [C.a, T("cella scelta; ciclo con i segni ⊕ ⊖; cella uscente (bordo tratteggiato)", "chosen cell; cycle with the signs ⊕ ⊖; leaving cell (dashed border)"), ""],
        [C.rosso, T("cella entrante; costi ridotti negativi", "entering cell; negative reduced costs"), "pieno"],
        [C.grigio, T("riga o colonna cancellata", "crossed out row or column"), "pieno"],
      ];
    },
    monta(board, st) {
      nuovaVoce(st);
      montaDati(st, TR_ES, {
        casuale: () => casualeTrasporto(st.chiave()),
        titolo: T("scrivi offerte, domande e costi", "type the supplies, the demands and the costs"),
        messaggio: T("Offerte a, domande d e costi c (righe separate da «/»), per esempio: a = 30 30 30 ; d = 10 25 15 40 ; c = 1 9 2 3 / 3 4 2 2 / 9 1 4 6. Se l'offerta totale e la domanda totale sono diverse, si aggiunge una destinazione (o un'origine) fittizia con costi 0.",
          "Supplies a, demands d and costs c (rows separated by «/»), for example: a = 30 30 30 ; d = 10 25 15 40 ; c = 1 9 2 3 / 3 4 2 2 / 9 1 4 6. If the total supply and the total demand differ, a dummy destination (or origin) with zero costs is added."),
        testo: testoTrasporto, leggi: leggiTrasporto, ritmo: 1000,
      });
      osservaDimensioni(board, st);
      daIndirizzo(st);
    },
    aggiorna(board, st) {
      const S = trStato(st), C = M.COL(st), [W, H] = dim(board), { R, k, K, P } = S, I = S.G;
      allineaDati(st, TR_ES);
      M.ridisegna(board, st, [I.id, S.regola, k, M.scuro(), W, H].join("|"), (crea) => {
        pix(board);
        const d = disegno(crea, H), fondo = 24, cap = 22, Hu = H - fondo;
        const nr = I.m + 2 + (P.fase === "pot" ? 1 : 0);
        // affiancati se c'è larghezza, altrimenti la rete sotto la tabella (se resta spazio)
        let bT, bR = null;
        if (W >= 660) {
          const wT = clamp(W * 0.58, 330, W - 250);
          bT = { x: 8, y: cap + 4, w: wT - 12, h: Hu - cap - 8 };
          bR = { x: wT + 8, y: cap + 4, w: W - wT - 14, h: Hu - cap - 8 };
        } else {
          const hT = Math.min(Hu - cap - 8, (nr + 0.8) * 44);
          bT = { x: 6, y: cap + 4, w: W - 12, h: hT };
          if (Hu - hT - cap - 2 * cap >= 140) bR = { x: 6, y: cap * 2 + hT + 10, w: W - 12, h: Hu - hT - 2 * cap - 14 };
        }
        const nomeR = S.regola === "costo-minimo" ? T("costo minimo", "minimum cost") : T("angolo nord-ovest", "north-west corner");
        let capT = P.fase === "ini" ? T(`soluzione iniziale (${nomeR})`, `initial solution (${nomeR})`) + (P.tipo === "sel" ? T(` · passo ${P.s}`, ` · step ${P.s}`) : "")
          : T(`metodo dei potenziali · iterazione ${P.it}`, `potential method · iteration ${P.it}`);
        if (P.fase === "pot") capT += ` · z = ${P.tipo === "pivot" ? P.zDopo : P.z}`;
        else if (P.tipo === "sel" && P.fine) capT += ` · z = ${P.z}`;
        d.text(14, 14, capT, { anchorX: "left", fontSize: 13.5, strokeColor: C.muted, cssStyle: "font-style:italic;font-weight:600" });
        disegnaTableau(d, bT, I, P, R, C);
        if (bR) {
          const yCap = W >= 660 ? 14 : bR.y - 8;
          const xCap = W >= 660 ? bR.x + 4 : 14;
          if (W >= 660) d.line(bR.x - 6, 8, bR.x - 6, Hu - 4, { strokeColor: C.line, strokeWidth: 1.4 });
          d.text(xCap, yCap, T("rete bipartita: le celle di base formano un albero", "bipartite network: the basic cells form a tree"), { anchorX: "left", fontSize: 13, strokeColor: C.muted, cssStyle: "font-style:italic;font-weight:600" });
          disegnaRete(d, bR, I, P, C);
        }
        d.line(10, H - fondo + 2, W - 10, H - fondo + 2, { strokeColor: C.line, strokeWidth: 1.2 });
        let pie = T("nell'angolo: cᵢⱼ · al centro: x̄ᵢⱼ", "in the corner: cᵢⱼ · in the centre: x̄ᵢⱼ") + (P.tipo === "rid" || P.tipo === "ciclo" || P.tipo === "ottimo" ? T(" o c̄ᵢⱼ", " or c̄ᵢⱼ") : "");
        if (I.fitt) pie = (W < 560 ? "" : pie + " · ") + (I.fitt === "d" ? T("* destinazione fittizia", "* dummy destination") : T("* origine fittizia", "* dummy origin"));
        d.text(14, H - 10, pie, { anchorX: "left", fontSize: 12, strokeColor: C.muted, cssStyle: "font-style:italic" });
        d.text(W - 14, H - 10, T(`passo ${k} di ${K}`, `step ${k} of ${K}`), { anchorX: "right", fontSize: 12.5, strokeColor: C.muted });
      });
    },
    formula(p, st) {
      const S = trStato(st), P = S.P, I = S.G, m = I.m, n = I.n, t = P.tipo, c = (i, j) => I.c[i - 1][j - m - 1];
      if (t === "dati") return `\\sum_{i} a_i = ${somma(I.a)} = \\sum_{j} d_j, \\quad |T| = m + n - 1 = ${m + n - 1}`;
      if (t === "sel") {
        const [i, j] = cella(P.cella), l = P.linea;
        const canc = "riga" in l && "colonna" in l ? T(`riga ${l.riga}, colonna ${l.colonna}`, `row ${l.riga}, column ${l.colonna}`) : "riga" in l ? T(`riga ${l.riga}`, `row ${l.riga}`) : T(`colonna ${l.colonna}`, `column ${l.colonna}`);
        return `\\bar{x}_{${ij(i, j)}} = \\min\\{\\bar{a}_{${i}}, \\bar{d}_{${j}}\\} = \\min\\{${P.prima.a}, ${P.prima.d}\\} = ${P.q} \\qquad \\text{${T("cancellata", "crossed out")}: ${canc}}`;
      }
      if (t === "pot") return `\\bar{c}_{ij} = c_{ij} - \\pi_i + \\pi_j = 0 \\ \\ \\forall (i,j) \\in T, \\qquad \\pi_{${m + n}} = 0`;
      if (t === "rid") {
        const [i, j] = cella(P.entrante);
        return `\\bar{c}_{${ij(i, j)}} = c_{${ij(i, j)}} - \\pi_{${i}} + \\pi_{${j}} = ${espr([[1, c(i, j)], [-1, P.pi[i]], [1, P.pi[j]]])} = ${P.cb[P.entrante]}`;
      }
      if (t === "ciclo") return `\\theta = \\min\\{${P.meno.map((f) => { const [i, j] = cella(f); return `\\bar{x}_{${ij(i, j)}}`; }).join(", ")}\\} = \\min\\{${P.meno.map((f) => P.x[f]).join(", ")}\\} = ${P.theta}`;
      if (t === "pivot") return `z = ${P.z} + \\theta\\,\\bar{c}_{${ij(...cella(P.entrante))}} = ${P.z} + ${P.theta} \\cdot (${P.cbE}) = ${P.zDopo}`;
      return `\\bar{c}_{ij} \\ge 0 \\ \\forall (i,j): \\quad z = ${P.z} = \\sum_i a_i \\pi_i - \\sum_j d_j \\pi_j = ${P.sa} - ${P.sd < 0 ? `(${P.sd})` : P.sd}`;
    },
    letture(p, st) {
      const S = trStato(st), P = S.P, I = S.G, R = S.R, C = M.COL(st), m = I.m, n = I.n, t = P.tipo, c = (i, j) => I.c[i - 1][j - m - 1];
      const NO = S.regola !== "costo-minimo";
      if (t === "dati") {
        const tot = somma(I.a), td = somma(I.d);
        return T(`Istanza bilanciata: offerta totale ${tot} = domanda totale ${td}. Una riga per ogni origine \\(1,\\dots,${m}\\), una colonna per ogni destinazione \\(${m + 1},\\dots,${m + n}\\); nell'angolo di ogni cella il costo \\(c_{ij}\\).`,
          `Balanced instance: total supply ${tot} = total demand ${td}. One row for each origin \\(1,\\dots,${m}\\), one column for each destination \\(${m + 1},\\dots,${m + n}\\); in the corner of each cell the cost \\(c_{ij}\\).`)
          + (I.fitt ? T(` La ${I.fitt === "d" ? `destinazione ${m + n}` : `origine ${m}`} (*) è fittizia, con costi 0: assorbe la differenza fra offerta e domanda.`, ` The ${I.fitt === "d" ? `destination ${m + n}` : `origin ${m}`} (*) is a dummy one, with zero costs: it absorbs the difference between supply and demand.`) : "")
          + "<br>" + (NO ? T("<b>Regola dell'angolo nord-ovest</b>: la cella in alto a sinistra fra le righe e le colonne attive, senza guardare i costi.", "<b>North-west corner rule</b>: the top-left cell of the active rows and columns, regardless of the costs.")
            : T("<b>Regola del costo minimo</b>: la cella più economica fra le righe e le colonne attive (a parità, la \\(i\\) più piccola, poi la \\(j\\)).", "<b>Minimum cost rule</b>: the cheapest cell of the active rows and columns (ties: the smallest \\(i\\), then \\(j\\))."))
          + T(" A ogni passo la cella riceve \\(\\min\\{\\bar{a}_i, \\bar{d}_j\\}\\) e si cancella una linea: la riga se \\(\\bar{a}_i = 0\\) e c'è un'altra riga attiva, altrimenti la colonna.", " At each step the cell receives \\(\\min\\{\\bar{a}_i, \\bar{d}_j\\}\\) and one line is crossed out: the row if \\(\\bar{a}_i = 0\\) and another row is active, otherwise the column.");
      }
      if (t === "sel") {
        const [i, j] = cella(P.cella), l = P.linea;
        let perche = NO ? T(`Passo ${P.s}: la cella in alto a sinistra fra le linee attive è ${M.tinta(C.a, `\\(${cTex(P.cella)}\\)`)}.`, `Step ${P.s}: the top-left cell of the active lines is ${M.tinta(C.a, `\\(${cTex(P.cella)}\\)`)}.`)
          : T(`Passo ${P.s}: la cella più economica fra le linee attive è ${M.tinta(C.a, `\\(${cTex(P.cella)}\\)`)}, con \\(c_{${ij(i, j)}} = ${c(i, j)}\\)`, `Step ${P.s}: the cheapest cell of the active lines is ${M.tinta(C.a, `\\(${cTex(P.cella)}\\)`)}, with \\(c_{${ij(i, j)}} = ${c(i, j)}\\)`)
            + (P.pari.length > 1 ? T(` (a parità con ${elenco(P.pari.filter((f) => f !== P.cella).map((f) => `\\(${cTex(f)}\\)`))}: prima la riga più piccola, poi la colonna).`, ` (tied with ${elenco(P.pari.filter((f) => f !== P.cella).map((f) => `\\(${cTex(f)}\\)`))}: first the smallest row, then the column).`) : ".");
        perche += T(` Riceve \\(\\min\\{${P.prima.a}, ${P.prima.d}\\} = ${P.q}\\).`, ` It receives \\(\\min\\{${P.prima.a}, ${P.prima.d}\\} = ${P.q}\\).`);
        let linea;
        if ("riga" in l && "colonna" in l) linea = T(`È l'ultima colonna attiva: si cancellano la riga ${i} e la colonna ${j}. <b>STOP</b>: ${P.s} \\(= m + n - 1\\) celle di base, che formano un albero.`, `It is the last active column: row ${i} and column ${j} are crossed out. <b>STOP</b>: ${P.s} \\(= m + n - 1\\) basic cells, forming a tree.`);
        else if ("riga" in l) linea = P.doppia ? T(`Riga ${i} e colonna ${j} si esauriscono insieme: si cancella solo la riga; la colonna ${j} resta attiva con \\(\\bar{d}_{${j}} = 0\\), e una sua cella riceverà la quantità 0 (soluzione degenere).`, `Row ${i} and column ${j} are exhausted together: only the row is crossed out; column ${j} stays active with \\(\\bar{d}_{${j}} = 0\\), and one of its cells will receive the amount 0 (degenerate solution).`)
          : T(`La riga ${i} è esaurita: si cancella.`, `Row ${i} is exhausted: it is crossed out.`);
        // colonna cancellata: o la riga ha ancora offerta, o è l'unica riga attiva (e allora riga e colonna si esauriscono insieme)
        else linea = P.prima.a === P.q ? T(`Anche la riga ${i} è esaurita, ma è l'unica riga attiva: si cancella la colonna ${j}.`, `Row ${i} is exhausted too, but it is the only active row: column ${j} is crossed out.`)
          : T(`La colonna ${j} è esaurita: si cancella.`, `Column ${j} is exhausted: it is crossed out.`);
        let out = perche + " " + linea;
        if (P.fine) {
          const termini = P.base.slice().sort(lex).map((f) => { const [a, b] = cella(f); return `${c(a, b)} \\cdot ${P.x[f]}`; });
          out += "<br>" + T(`Costo della soluzione iniziale: \\(${termini.join(" + ")} = ${P.z}\\).`, `Cost of the initial solution: \\(${termini.join(" + ")} = ${P.z}\\).`);
        }
        return out;
      }
      if (t === "pot") {
        const righe = P.ordine.map(([v, f]) => {
          if (!f) return `\\(\\pi_{${v}} = 0\\)`;
          const [i, j] = cella(f);
          return v === i ? `\\(\\pi_{${i}} = \\pi_{${j}} + c_{${ij(i, j)}} = ${espr([[1, P.pi[j]], [1, c(i, j)]])} = ${P.pi[i]}\\)`
            : `\\(\\pi_{${j}} = \\pi_{${i}} - c_{${ij(i, j)}} = ${espr([[1, P.pi[i]], [-1, c(i, j)]])} = ${P.pi[j]}\\)`;
        });
        return T(`Iterazione ${P.it}. I ${M.tinta(C.blu, "potenziali")} della base: \\(\\bar{c}_{ij} = 0\\) sulle celle di base, partendo da \\(\\pi_{${m + n}} = 0\\) lungo l'albero (celle di base in ordine riga-colonna):`,
          `Iteration ${P.it}. The ${M.tinta(C.blu, "potentials")} of the basis: \\(\\bar{c}_{ij} = 0\\) on the basic cells, starting from \\(\\pi_{${m + n}} = 0\\) along the tree (basic cells in row-column order):`)
          + `<div style="margin:.2em 0 0 .6em;line-height:1.75">${righe.join("<br>")}</div>`;
      }
      if (t === "rid") {
        const neg = P.neg.map((f) => `\\(\\bar{c}_{${ij(...cella(f))}} = ${P.cb[f]}\\)`);
        return (P.neg.length > 1 ? T(`Costi ridotti negativi: ${elenco(neg)}.`, `Negative reduced costs: ${elenco(neg)}.`) : T(`L'unico costo ridotto negativo è ${neg[0]}.`, `The only negative reduced cost is ${neg[0]}.`))
          + T(` La soluzione non è ottima: la cella ${M.tinta(C.rosso, `\\(${cTex(P.entrante)}\\)`)}, con il \\(\\bar{c}\\) più negativo, entra nella base. Ogni unità spostata su di essa lungo il suo ciclo cambia il costo di \\(${P.cb[P.entrante]}\\).`,
            ` The solution is not optimal: the cell ${M.tinta(C.rosso, `\\(${cTex(P.entrante)}\\)`)}, with the most negative \\(\\bar{c}\\), enters the basis. Each unit moved onto it along its cycle changes the cost by \\(${P.cb[P.entrante]}\\).`);
      }
      if (t === "ciclo") {
        const seq = P.ciclo.map((f, q) => `${cTxt(f)}${q % 2 === 0 ? "⁺" : "⁻"}`).join(", ");
        return T(`Il ${M.tinta(C.a, "ciclo")} della cella entrante, muovendosi prima lungo la sua riga: \\(\\,\\)${seq}. Ogni riga e ogni colonna del ciclo ha una cella «+» e una «−», quindi le somme non cambiano.`,
          `The ${M.tinta(C.a, "cycle")} of the entering cell, moving first along its row: \\(\\,\\)${seq}. Every row and column of the cycle has one «+» cell and one «−» cell, so the sums do not change.`)
          + T(` \\(\\theta = ${P.theta}\\): la cella ${M.tinta(C.a, `\\(${cTex(P.uscente)}\\)`)} (bordo tratteggiato) esce dalla base.`, ` \\(\\theta = ${P.theta}\\): the cell ${M.tinta(C.a, `\\(${cTex(P.uscente)}\\)`)} (dashed border) leaves the basis.`)
          + (P.meno.filter((f) => P.x[f] === P.theta).length > 1 ? T(" A parità, la prima in ordine riga-colonna.", " On ties, the first one in row-column order.") : "");
      }
      if (t === "pivot") {
        return T(`Si aggiungono \\(\\theta = ${P.theta}\\) unità sulle celle «+» e si tolgono dalle celle «−» (valori ${M.tinta(C.a, "in arancio")}); \\(${cTex(P.entrante)}\\) entra nella base, \\(${cTex(P.uscente)}\\) esce.`,
          `Add \\(\\theta = ${P.theta}\\) units on the «+» cells and remove them from the «−» cells (values ${M.tinta(C.a, "in orange")}); \\(${cTex(P.entrante)}\\) enters the basis, \\(${cTex(P.uscente)}\\) leaves.`)
          + (P.theta === 0 ? T(` Il pivot è ${M.tinta(C.rosso, "degenere")}: la soluzione e il suo costo \\(z = ${P.z}\\) non cambiano, cambia solo la base (e con essa i potenziali).`, ` The pivot is ${M.tinta(C.rosso, "degenerate")}: the solution and its cost \\(z = ${P.z}\\) do not change, only the basis does (and with it the potentials).`)
            : T(` Il costo scende da ${P.z} a ${P.zDopo}.`, ` The cost drops from ${P.z} to ${P.zDopo}.`));
      }
      // ottimo
      const piv = R.tr.length - 1, deg = R.tr.slice(0, -1).filter((v) => v.theta === 0).length;
      return T(`Tutti i costi ridotti sono \\(\\ge 0\\): la soluzione è ${M.tinta(C.blu, "ottima")}, con costo \\(z = ${P.z}\\), e i potenziali \\(\\tilde{\\pi} = (${intervallo(1, m + n).map((v) => P.pi[v]).join(", ")})\\) sono ottimi per il duale, con lo stesso valore.`,
        `All the reduced costs are \\(\\ge 0\\): the solution is ${M.tinta(C.blu, "optimal")}, with cost \\(z = ${P.z}\\), and the potentials \\(\\tilde{\\pi} = (${intervallo(1, m + n).map((v) => P.pi[v]).join(", ")})\\) are optimal for the dual, with the same value.`)
        + (P.unico ? T(" Fuori dalla base ogni \\(\\bar{c}_{ij} > 0\\) e ogni cella di base ha \\(\\bar{x}_{ij} > 0\\): l'ottimo è unico.", " Outside the basis every \\(\\bar{c}_{ij} > 0\\) and every basic cell has \\(\\bar{x}_{ij} > 0\\): the optimum is unique.")
          : T(" Qualche cella fuori dalla base ha \\(\\bar{c}_{ij} = 0\\) (o qualche cella di base ha \\(\\bar{x}_{ij} = 0\\)): l'ottimo può non essere unico.", " Some cell outside the basis has \\(\\bar{c}_{ij} = 0\\) (or some basic cell has \\(\\bar{x}_{ij} = 0\\)): the optimum may not be unique."))
        + T(` Pivot: ${piv}` + (deg ? `, di cui ${deg} degeneri.` : "."), ` Pivots: ${piv}` + (deg ? `, ${deg} of them degenerate.` : "."))
        + (R.stop ? T(" (Interrotto dopo 100 iterazioni.)", " (Stopped after 100 iterations.)") : "");
    },
    domanda: T("Sull'istanza dei magazzini confronta le due regole iniziali: quanti pivot servono partendo dall'angolo nord-ovest e quanti dal costo minimo? Nell'istanza «pivot degenere» trova il passo con \\(\\theta = 0\\): che cosa cambia e che cosa no? Perché la cella di base con \\(\\bar{x}_{ij} = 0\\) non si può togliere?",
      "On the warehouses instance compare the two initial rules: how many pivots are needed from the north-west corner, and how many from the minimum cost rule? In the «degenerate pivot» instance find the step with \\(\\theta = 0\\): what changes and what does not? Why can the basic cell with \\(\\bar{x}_{ij} = 0\\) not be removed?"),
  };

  // =================================================================
  // 2. ASSEGNAMENTO: L'ALGORITMO UNGHERESE
  // =================================================================
  // verifica.C_ASS ed esercizi 7.4 (5 × 5) e 7.6 (profitti p, costi c = 9 − p)
  const AS_ES = [
    { nome: T("4 lavoratori, 4 lavori (es. 7.9)", "4 workers, 4 jobs (Ex. 7.9)"), C: C_ASS },
    { nome: T("esercizio 7.4", "Exercise 7.4"), C: [[6, 10, 10, 5, 3], [11, 12, 9, 7, 7], [8, 1, 12, 6, 11], [12, 7, 10, 8, 2], [3, 4, 11, 6, 1]] },
    { nome: T("esercizio 7.6 (profitti, cᵢⱼ = 9 − pᵢⱼ)", "Exercise 7.6 (profits, cᵢⱼ = 9 − pᵢⱼ)"), pmax: 9,
      C: [[9, 4, 5, 1], [8, 5, 3, 3], [2, 1, 1, 1], [2, 2, 6, 8]].map((r) => r.map((v) => 9 - v)) },
  ].map((e) => Object.assign({ n: e.C.length }, e));

  /** insieme massimo di zeri indipendenti di Z (0/1) con i cammini aumentanti: righe in ordine crescente, colonne in
   *  ordine crescente, in profondità. {riga: colonna} (da 0), per riga crescente (come verifica.abbinamento_massimo) */
  function abbinamento(Z) {
    const n = Z.length, colDi = {};
    const prova = (r, visti) => {
      for (let k = 0; k < n; k++) if (Z[r][k] && !visti.has(k)) {
        visti.add(k);
        if (!(k in colDi) || prova(colDi[k], visti)) { colDi[k] = r; return true; }
      }
      return false;
    };
    for (let r = 0; r < n; r++) prova(r, new Set());
    const M0 = {};
    Object.keys(colDi).map(Number).sort((p, q) => colDi[p] - colDi[q]).forEach((k) => { M0[colDi[k]] = k; });
    return M0;
  }
  /** costruzione di König: Zr, Zc = righe e colonne raggiunte dai cammini alternanti dalle righe non abbinate.
   *  Linee: righe non in Zr, colonne in Zc (da 0, ordinate) */
  function copertura(Z, M0) {
    const n = Z.length, rigaDi = {};
    Object.entries(M0).forEach(([r, k]) => { rigaDi[k] = +r; });
    const Zr = new Set(), Zc = new Set();
    for (let r = 0; r < n; r++) if (!(r in M0)) Zr.add(r);
    const coda = [...Zr].sort((p, q) => p - q);
    while (coda.length) {
      const r = coda.shift();
      for (let k = 0; k < n; k++) if (Z[r][k] && !Zc.has(k)) {
        Zc.add(k);
        if (k in rigaDi && !Zr.has(rigaDi[k])) { Zr.add(rigaDi[k]); coda.push(rigaDi[k]); }
      }
    }
    const ord = (s) => [...s].sort((p, q) => p - q);
    return { righe: intervallo(0, n - 1).filter((r) => !Zr.has(r)), colonne: ord(Zc), Zr: ord(Zr), Zc: ord(Zc) };
  }
  /** Tutti i passi dell'algoritmo ungherese sulla matrice C (n × n): «dati», «righe», «colonne», poi per ogni iterazione
   *  «zeri», «linee», «delta», «aggiusta», e alla fine «zeri», «fine». Indici da 0. */
  function ugCalcola(Cm) {
    const n = Cm.length, passi = [], cp = (A) => A.map((r) => r.slice());
    const rmin = Cm.map((r) => Math.min(...r));
    const dopoRighe = Cm.map((r, i) => r.map((v) => v - rmin[i]));
    const cmin = intervallo(0, n - 1).map((k) => Math.min(...dopoRighe.map((r) => r[k])));
    let R = dopoRighe.map((r) => r.map((v, k) => v - cmin[k]));
    const piR = rmin.slice(), piC = cmin.map((v) => -v || 0);
    const duale = () => somma(piR) - somma(piC);
    const zeri = (A) => A.map((r) => r.map((v) => (v === 0 ? 1 : 0)));
    passi.push({ tipo: "dati", mat: cp(Cm), piR: Array(n).fill(0), piC: Array(n).fill(0), duale: 0 });
    passi.push({ tipo: "righe", mat: cp(dopoRighe), rmin, piR: rmin.slice(), piC: Array(n).fill(0), duale: somma(rmin), prima: cp(Cm) });
    passi.push({ tipo: "colonne", mat: cp(R), cmin, piR: piR.slice(), piC: piC.slice(), duale: duale(), prima: cp(dopoRighe) });
    const iterazioni = [];
    let M0;
    for (let it = 1; it <= 60; it++) {
      const Z = zeri(R);
      M0 = abbinamento(Z);
      const cop = copertura(Z, M0), nM = Object.keys(M0).length;
      const base = { it, mat: cp(R), M: Object.assign({}, M0), piR: piR.slice(), piC: piC.slice(), duale: duale() };
      const voce = { matrice: cp(R), abbinamento: Object.assign({}, M0), righe: cop.righe, colonne: cop.colonne, pi_r: piR.slice(), pi_c: piC.slice(), duale: duale() };
      iterazioni.push(voce);
      passi.push(Object.assign({ tipo: "zeri", nM }, base));
      if (nM === n) {
        const costo = somma(Object.entries(M0).map(([r, k]) => Cm[r][k]));
        passi.push(Object.assign({ tipo: "fine", costo, righe: cop.righe, colonne: cop.colonne }, base));
        break;
      }
      passi.push(Object.assign({ tipo: "linee", nM, righe: cop.righe, colonne: cop.colonne, Zr: cop.Zr, Zc: cop.Zc }, base));
      let delta = Infinity, cellaD = null;
      for (let r = 0; r < n; r++) for (let k = 0; k < n; k++) {
        if (cop.righe.includes(r) || cop.colonne.includes(k)) continue;
        if (R[r][k] < delta) { delta = R[r][k]; cellaD = [r, k]; }
      }
      voce.delta = delta; voce.cella_delta = cellaD;
      passi.push(Object.assign({ tipo: "delta", righe: cop.righe, colonne: cop.colonne, delta, cella: cellaD }, base));
      const prima = cp(R), dualePrima = duale();
      for (let r = 0; r < n; r++) for (let k = 0; k < n; k++) {
        const cr = cop.righe.includes(r), cc = cop.colonne.includes(k);
        if (!cr && !cc) R[r][k] -= delta;
        else if (cr && cc) R[r][k] += delta;
      }
      for (let r = 0; r < n; r++) if (!cop.righe.includes(r)) piR[r] += delta;
      for (const k of cop.colonne) piC[k] += delta;
      passi.push({ tipo: "aggiusta", it, mat: cp(R), prima, righe: cop.righe, colonne: cop.colonne, delta, cella: cellaD, M: Object.assign({}, M0),
        piR: piR.slice(), piC: piC.slice(), duale: duale(), dualePrima, linee: cop.righe.length + cop.colonne.length });
    }
    const costo = somma(Object.entries(M0).map(([r, k]) => Cm[r][k]));
    return { passi, n, iterazioni, righe_min: rmin, dopo_righe: dopoRighe, colonne_min: cmin, assegnamento: M0, pi_r: piR, pi_c: piC, costo, duale: duale() };
  }
  const ugStato = (st) => N.stato(st, (I) => ugCalcola(I.C));

  function leggiAssegnamento(s) {
    const err = T("Dati non validi. Scrivi i costi riga per riga, separati da «/», per esempio: c = 2 4 3 5 / 4 8 1 1 / 2 6 9 6 / 1 9 8 6. Matrice quadrata da 2 × 2 a 6 × 6, costi interi fra 0 e 99.",
      "Invalid data. Write the costs row by row, separated by «/», for example: c = 2 4 3 5 / 4 8 1 1 / 2 6 9 6 / 1 9 8 6. Square matrix from 2 × 2 to 6 × 6, integer costs between 0 and 99.");
    const t = String(s).replace(/^\s*c\s*=\s*/i, "");
    const C = t.split("/").map((r) => r.split(/[\s,;]+/).filter(Boolean).map(Number));
    const n = C.length;
    if (n < 2 || n > 6 || C.some((r) => r.length !== n) || C.flat().some((v) => !Number.isInteger(v) || v < 0 || v > 99)) return err;
    return { n, C };
  }
  const testoAssegnamento = (I) => "c = " + I.C.map((r) => r.join(" ")).join(" / ");
  function casualeAssegnamento() {
    for (let tent = 0; tent < 400; tent++) {
      const n = M.casuale(3, 5), C = intervallo(1, n).map(() => intervallo(1, n).map(() => M.casuale(1, 12)));
      const it = ugCalcola(C).iterazioni.length;
      if (it >= 2 && it <= 4) return { n, C };
    }
    return null;
  }

  // ------------------------------------------------------------ disegno: la matrice ridotta
  function disegnaMatrice(d, box, I, P, C) {
    const n = I.n, g = geometria(box, n, 1, n + 1, 54), { X, XM, Y, cw, mw, rh, fs } = g;
    const cx = (k) => X(k) + cw / 2, cy = (r) => Y(r) + rh / 2;
    const linee = P.tipo === "linee" || P.tipo === "delta" || P.tipo === "aggiusta";
    const lR = linee ? P.righe : [], lC = linee ? P.colonne : [];
    const fine = P.tipo === "fine", Mv = P.M || {};
    // fondi: linee (blu; coperte due volte: più scure), cella di δ, assegnamento finale
    // una linea = una fascia blu sulla riga o sulla colonna (nel passo «aggiusta»: solo il bordo tratteggiato)
    const ag = P.tipo === "aggiusta";
    const fascia = (x, y, w, h) => d.rect(x + 2, y + 2, w - 4, h - 4, { strokeColor: C.blu, strokeWidth: 2, strokeOpacity: 0.75, dash: ag ? 3 : 0,
      fillColor: ag ? "none" : C.blu, fillOpacity: ag ? 0 : 0.15 });
    for (const r of lR) fascia(X(0), Y(r), n * cw, rh);
    for (const k of lC) fascia(X(k), Y(0), cw, n * rh);
    if (P.tipo === "delta") d.rect(X(P.cella[1]) + 1, Y(P.cella[0]) + 1, cw - 2, rh - 2, { strokeColor: C.rosso, strokeWidth: 2.4, fillColor: C.rosso, fillOpacity: 0.22 });
    if (fine) Object.entries(Mv).forEach(([r, k]) => d.rect(X(k) + 1, Y(+r) + 1, cw - 2, rh - 2, { strokeColor: "none", strokeWidth: 0, fillColor: C.blu, fillOpacity: 0.28 }));
    griglia(d, g, n, C);
    for (let r = 0; r < n; r++) for (let k = 0; k < n; k++) {
      const v = P.mat[r][k], box0 = Mv[r] === k && (P.tipo === "zeri" || linee || fine) && P.tipo !== "aggiusta";
      let col = C.testo, peso = v === 0 ? 800 : 500;
      let nota = null;
      if (P.prima && P.prima[r][k] !== v) {
        col = C.a; peso = 800;
        if (P.tipo === "aggiusta") nota = v < P.prima[r][k] ? `−${P.delta}` : `+${P.delta}`;
      }
      if (P.tipo === "dati") { col = C.testo; peso = 600; }
      if (P.tipo === "delta" && P.cella[0] === r && P.cella[1] === k) { col = C.rosso; peso = 800; }
      if (box0) {
        const w = Math.max(fs * 1.5, String(v).length * fs * 0.62 + 10), h = fs * 1.55;
        d.rect(cx(k) - w / 2, cy(r) - h / 2, w, h, { strokeColor: fine ? C.blu : C.testo, strokeWidth: 2, fillColor: bg(), fillOpacity: 0.9 });
      }
      testo(d, cx(k), cy(r), v, fs, col, peso);
      if (nota) d.text(X(k) + cw - 4, Y(r) + g.fp * 0.85, nota, { anchorX: "right", fontSize: g.fp, strokeColor: C.a, cssStyle: "font-weight:700;pointer-events:none" });
    }
    // intestazioni e potenziali
    testo(d, g.x0 + g.labW / 2, g.y0 + g.hh / 2, { dati: "cᵢⱼ", righe: "cᵢⱼ−πᵢ" }[P.tipo] || "c̄ᵢⱼ", g.fp + 1, C.muted, 600, "font-style:italic");
    for (let k = 0; k < n; k++) testo(d, cx(k), g.y0 + g.hh / 2, n + 1 + k, fs * 0.95, P.tipo === "colonne" && P.cmin[k] ? C.a : C.testo, 800);
    for (let r = 0; r < n; r++) testo(d, g.x0 + g.labW / 2, cy(r), r + 1, fs * 0.95, C.testo, 800);
    testo(d, XM(0) + mw / 2, g.y0 + g.hh / 2, "πᵢ", fs * 0.9, C.muted, 600, "font-style:italic");
    testo(d, g.x0 + g.labW / 2, Y(n) + rh / 2, "πⱼ", fs * 0.9, C.muted, 600, "font-style:italic");
    for (let r = 0; r < n; r++) testo(d, XM(0) + mw / 2, cy(r), P.piR[r], fs * 0.92, (ag && !P.righe.includes(r)) || P.tipo === "righe" ? C.a : C.blu, 800);
    for (let k = 0; k < n; k++) testo(d, cx(k), Y(n) + rh / 2, P.piC[k], fs * 0.92, (ag && P.colonne.includes(k)) || (P.tipo === "colonne" && P.cmin[k]) ? C.a : C.blu, 800);
  }
  /** gli zeri della matrice come archi del grafo bipartito righe – colonne */
  function disegnaZeri(d, box, I, P, C) {
    const n = I.n, A = [], stili = [], Mv = P.M || {};
    const linee = P.tipo === "linee" || P.tipo === "delta";
    for (let r = 0; r < n; r++) for (let k = 0; k < n; k++) {
      if (P.mat[r][k] !== 0) continue;
      const nel = Mv[r] === k && P.tipo !== "aggiusta" && P.tipo !== "dati" && P.tipo !== "righe" && P.tipo !== "colonne";
      let s = { colore: C.muted, spessore: 1.6, opacita: 0.7 };
      if (P.prima && P.prima[r][k] !== 0) s = { colore: C.a, spessore: 2.6, opacita: 1 };
      if (nel) s = { colore: C.blu, spessore: 4, opacita: 1 };
      if (P.tipo === "fine" && nel) Object.assign(s, { etichetta: String(I.C[r][k]), colEt: C.blu, grassetto: true, posizione: 0.2 });
      A.push([r + 1, n + 1 + k, stili.length]); stili.push(s);
    }
    const G = N.grafo({ n: 2 * n, diretto: false, P: posBipartita(n, n, 4.6), A });
    const Zr = new Set(linee ? P.Zr || [] : []), Zc = new Set(linee ? P.Zc || [] : []);
    const cop = (v) => (linee ? (v <= n ? P.righe.includes(v - 1) : P.colonne.includes(v - n - 1)) : false);
    const raggiunto = (v) => (v <= n ? Zr.has(v - 1) : Zc.has(v - n - 1));
    N.disegnaGrafo(d, G, box, Object.assign(misureRete(box, n, n, 4.6), {
      arco: (a) => stili[a.v[0]],
      nodo: (v) => {
        let s = v <= n ? { bordo: C.testo, spessore: 2.2 } : { bordo: C.muted, spessore: 2.2 };
        if (cop(v)) s = { fondo: C.blu, opacita: 0.85, bordo: C.blu, spessore: 2.4, testo: "#ffffff" };
        if (P.tipo === "linee" && raggiunto(v)) s = Object.assign({}, s, { bordo: C.a, spessore: 4 });
        return s;
      },
      fuori: (v) => (v <= n && !(v - 1 in Mv) && P.tipo !== "dati" && P.tipo !== "righe" && P.tipo !== "colonne" && P.tipo !== "aggiusta" ? { testo: T("libera", "free"), colore: C.a } : null),
    }), C);
  }

  window.GI_RICETTE["no-assignment"] = {
    titolo: T("Assegnamento: l'algoritmo ungherese", "Assignment: the Hungarian algorithm"),
    parametri: [parPasso("", 0)],
    assi: false,
    opzioniBoard: M.OPZ,
    vista: [0, 400, 600, 0],
    legenda: (st) => {
      const C = M.COL(st);
      return [
        [C.blu, T("linee della copertura; zeri indipendenti (abbinamento); assegnamento finale", "lines of the cover; independent zeros (matching); final assignment"), "pieno"],
        [C.rosso, T("cella di \\(\\delta\\), il minimo scoperto", "cell of \\(\\delta\\), the minimum uncovered entry"), "pieno"],
        [C.a, T("valori cambiati; nodi raggiunti dai cammini alternanti", "changed entries; nodes reached by alternating paths"), ""],
      ];
    },
    monta(board, st) {
      montaDati(st, AS_ES, {
        casuale: casualeAssegnamento,
        titolo: T("scrivi la matrice dei costi", "type the cost matrix"),
        messaggio: T("Costi riga per riga, separati da «/» (da 2 × 2 a 6 × 6), per esempio: c = 2 4 3 5 / 4 8 1 1 / 2 6 9 6 / 1 9 8 6",
          "Costs row by row, separated by «/» (from 2 × 2 to 6 × 6), for example: c = 2 4 3 5 / 4 8 1 1 / 2 6 9 6 / 1 9 8 6"),
        testo: testoAssegnamento, leggi: leggiAssegnamento, ritmo: 1100,
      });
      osservaDimensioni(board, st);
      daIndirizzo(st);
    },
    aggiorna(board, st) {
      const S = ugStato(st), C = M.COL(st), [W, H] = dim(board), { k, K, P } = S, I = S.G, n = I.n;
      allineaDati(st, AS_ES);
      M.ridisegna(board, st, [I.id, k, M.scuro(), W, H].join("|"), (crea) => {
        pix(board);
        const d = disegno(crea, H), fondo = 24, cap = 22, Hu = H - fondo;
        let bT, bR = null;
        if (W >= 640) {
          const wT = clamp(W * 0.58, 320, W - 230);
          bT = { x: 8, y: cap + 4, w: wT - 12, h: Hu - cap - 8 };
          bR = { x: wT + 8, y: cap + 4, w: W - wT - 14, h: Hu - cap - 8 };
        } else {
          const hT = Math.min(Hu - cap - 8, (n + 1.8) * 46);
          bT = { x: 6, y: cap + 4, w: W - 12, h: hT };
          if (Hu - hT - 2 * cap >= 150) bR = { x: 6, y: cap * 2 + hT + 10, w: W - 12, h: Hu - hT - 2 * cap - 14 };
        }
        const nomi = { dati: T("matrice dei costi", "cost matrix"), righe: T("riduzione per righe", "row reduction"), colonne: T("riduzione per colonne", "column reduction") };
        let capT = nomi[P.tipo] || T(`iterazione ${P.it}`, `iteration ${P.it}`);
        capT += T(` · valore duale ${P.duale}`, ` · dual value ${P.duale}`);
        d.text(14, 14, capT, { anchorX: "left", fontSize: 13.5, strokeColor: C.muted, cssStyle: "font-style:italic;font-weight:600" });
        disegnaMatrice(d, bT, I, P, C);
        if (bR) {
          if (W >= 640) d.line(bR.x - 6, 8, bR.x - 6, Hu - 4, { strokeColor: C.line, strokeWidth: 1.4 });
          d.text(W >= 640 ? bR.x + 4 : 14, W >= 640 ? 14 : bR.y - 8, T("gli zeri come archi: righe a sinistra, colonne a destra", "the zeros as arcs: rows on the left, columns on the right"),
            { anchorX: "left", fontSize: 13, strokeColor: C.muted, cssStyle: "font-style:italic;font-weight:600" });
          disegnaZeri(d, bR, I, P, C);
        }
        d.line(10, H - fondo + 2, W - 10, H - fondo + 2, { strokeColor: C.line, strokeWidth: 1.2 });
        d.text(14, H - 10, T("riquadrati: zeri indipendenti", "boxed: independent zeros") + (W < 560 ? "" : T(" · sui margini: i potenziali", " · on the margins: the potentials")), { anchorX: "left", fontSize: 12, strokeColor: C.muted, cssStyle: "font-style:italic" });
        d.text(W - 14, H - 10, T(`passo ${k} di ${K}`, `step ${k} of ${K}`), { anchorX: "right", fontSize: 12.5, strokeColor: C.muted });
      });
    },
    formula(p, st) {
      const S = ugStato(st), P = S.P, I = S.G, n = I.n, t = P.tipo;
      const nr = (r) => r + 1, nc = (k) => n + 1 + k;
      if (t === "dati") return `\\min \\sum_{i}\\sum_{j} c_{ij}\\,x_{ij}: \\quad ${n}! = ${intervallo(1, n).reduce((a, b) => a * b, 1)} \\text{ ${T("assegnamenti", "assignments")}}`;
      if (t === "righe") return `\\pi_i = \\min_j c_{ij}: \\quad ${P.rmin.map((v, r) => `\\pi_{${nr(r)}} = ${v}`).join(",\\ ")}`;
      if (t === "colonne") {
        const ch = P.cmin.map((v, k) => [v, k]).filter(([v]) => v);
        return `-\\pi_j = \\min_i (c_{ij} - \\pi_i) = ${P.cmin.join(", ")}` + (ch.length ? `: \\ ${ch.map(([v, k]) => `\\pi_{${nc(k)}} = ${-v}`).join(",\\ ")}` : "") + `, \\quad \\sum_i \\pi_i - \\sum_j \\pi_j = ${P.duale}`;
      }
      if (t === "zeri") return `|M| = ${P.nM} ${P.nM < n ? "<" : "="} n = ${n}`;
      if (t === "linee") return `${P.righe.length + P.colonne.length} \\text{ ${T("linee", "lines")}} = |M| < n = ${n}`;
      if (t === "delta") return `\\delta = \\min\\{\\bar{c}_{ij} : (i,j) \\text{ ${T("scoperta", "uncovered")}}\\} = \\bar{c}_{${ij(nr(P.cella[0]), nc(P.cella[1]))}} = ${P.delta}`;
      if (t === "aggiusta") return `\\sum_i \\pi_i - \\sum_j \\pi_j = ${P.dualePrima} + ${P.delta} \\cdot (${n} - ${P.linee}) = ${P.duale}`;
      const Ms = Object.entries(P.M).map(([r, k]) => [+r, k]).sort((a, b) => a[0] - b[0]);
      return `z = ${Ms.map(([r, k]) => `c_{${ij(nr(r), nc(k))}}`).join(" + ")} = ${Ms.map(([r, k]) => I.C[r][k]).join(" + ")} = ${P.costo} = \\sum_i \\pi_i - \\sum_j \\pi_j`;
    },
    letture(p, st) {
      const S = ugStato(st), P = S.P, I = S.G, C = M.COL(st), n = I.n, t = P.tipo;
      const nr = (r) => r + 1, nc = (k) => n + 1 + k;
      const zTex = (r, k) => `\\((${nr(r)},${nc(k)})\\)`;
      const Ms = Object.entries(P.M || {}).map(([r, k]) => [+r, k]).sort((a, b) => a[0] - b[0]);
      if (t === "dati") return T(`Le righe \\(1,\\dots,${n}\\) sono i lavoratori, le colonne \\(${n + 1},\\dots,${2 * n}\\) i lavori: ogni riga riceve una colonna e ogni colonna una riga.`, `The rows \\(1,\\dots,${n}\\) are the workers, the columns \\(${n + 1},\\dots,${2 * n}\\) the jobs: every row gets one column and every column one row.`)
        + (I.pmax ? T(` Qui si massimizza il profitto: con \\(c_{ij} = ${I.pmax} - p_{ij}\\) ogni assegnamento costa \\(${n} \\cdot ${I.pmax}\\) meno il suo profitto.`, ` Here the profit is maximized: with \\(c_{ij} = ${I.pmax} - p_{ij}\\) every assignment costs \\(${n} \\cdot ${I.pmax}\\) minus its profit.`) : "")
        + T(" Passo 0: si sottrae a ogni riga il suo minimo, poi a ogni colonna il suo minimo. Sottrarre una costante da una riga o da una colonna cambia della stessa costante il costo di ogni assegnamento.", " Step 0: subtract from each row its minimum, then from each column its minimum. Subtracting a constant from a row or a column changes the cost of every assignment by the same constant.");
      if (t === "righe") return T(`Minimi di riga: ${P.rmin.join(", ")}; diventano i potenziali \\(\\pi_i\\) ${M.tinta(C.a, "(in arancio)")}. Ora ogni riga ha almeno uno zero.`, `Row minima: ${P.rmin.join(", ")}; they become the potentials \\(\\pi_i\\) ${M.tinta(C.a, "(in orange)")}. Now every row has at least one zero.`);
      if (t === "colonne") {
        const ch = P.cmin.map((v, k) => [v, k]).filter(([v]) => v);
        return T(`Minimi di colonna: ${P.cmin.join(", ")}.`, `Column minima: ${P.cmin.join(", ")}.`)
          + (ch.length ? T(` Cambia${ch.length > 1 ? "no le colonne" : " solo la colonna"} ${elenco(ch.map(([, k]) => String(nc(k))))}: \\(\\pi_j\\) = meno il minimo sottratto.`, ` Only column${ch.length > 1 ? "s" : ""} ${elenco(ch.map(([, k]) => String(nc(k))))} change${ch.length > 1 ? "" : "s"}: \\(\\pi_j\\) = minus the subtracted minimum.`) : T(" Nessuna colonna cambia: ogni colonna ha già uno zero.", " No column changes: every column already has a zero."))
          + T(` La matrice è \\(\\bar{c}_{ij} = c_{ij} - \\pi_i + \\pi_j \\ge 0\\), e il valore duale \\(\\sum_i \\pi_i - \\sum_j \\pi_j = ${P.duale}\\) è un limite inferiore al costo di ogni assegnamento.`, ` The matrix is \\(\\bar{c}_{ij} = c_{ij} - \\pi_i + \\pi_j \\ge 0\\), and the dual value \\(\\sum_i \\pi_i - \\sum_j \\pi_j = ${P.duale}\\) is a lower bound on the cost of every assignment.`);
      }
      if (t === "zeri") return T(`Iterazione ${P.it}. Un insieme massimo di ${M.tinta(C.blu, "zeri indipendenti")} (riquadrati), costruito riga per riga con i cammini aumentanti (colonne in ordine crescente): ${Ms.map(([r, k]) => zTex(r, k)).join(", ")}.`, `Iteration ${P.it}. A maximum set of ${M.tinta(C.blu, "independent zeros")} (boxed), built row by row with augmenting paths (columns in increasing order): ${Ms.map(([r, k]) => zTex(r, k)).join(", ")}.`)
        + (P.nM === n ? T(" Sono \\(n\\): l'algoritmo si ferma.", " They are \\(n\\): the algorithm stops.") : T(` Sono ${P.nM} < ${n}: non c'è ancora un assegnamento di costo ridotto zero.`, ` They are ${P.nM} < ${n}: there is no assignment of zero reduced cost yet.`));
      if (t === "linee") {
        const libere = intervallo(0, n - 1).filter((r) => !(r in P.M)).map(nr);
        const lin = [];
        if (P.righe.length) lin.push(T(`le righe ${elenco(P.righe.map((r) => String(nr(r))))}`, `the rows ${elenco(P.righe.map((r) => String(nr(r))))}`).replace(/^(le righe|the rows) (\d+)$/, (s, a, b) => (a === "le righe" ? "la riga " : "the row ") + b));
        if (P.colonne.length) lin.push(T(`le colonne ${elenco(P.colonne.map((k) => String(nc(k))))}`, `the columns ${elenco(P.colonne.map((k) => String(nc(k))))}`).replace(/^(le colonne|the columns) (\d+)$/, (s, a, b) => (a === "le colonne" ? "la colonna " : "the column ") + b));
        return T(`Le linee della costruzione di König: dalle righe libere (${libere.join(", ")}) si seguono i ${M.tinta(C.a, "cammini alternanti")} (uno zero porta dalla riga alla colonna, lo zero riquadrato della colonna riporta a una riga). Raggiunte: \\(R = \\{${P.Zr.map(nr).join(",")}\\}\\), \\(K = \\{${P.Zc.map(nc).join(",")}\\}\\).`,
          `The lines of König's construction: from the free rows (${libere.join(", ")}) follow the ${M.tinta(C.a, "alternating paths")} (a zero leads from the row to the column, the boxed zero of the column leads back to a row). Reached: \\(R = \\{${P.Zr.map(nr).join(",")}\\}\\), \\(K = \\{${P.Zc.map(nc).join(",")}\\}\\).`)
          + T(` Le ${M.tinta(C.blu, "linee")} sono le righe fuori da \\(R\\) e le colonne in \\(K\\): ${elenco(lin)}, ${P.righe.length + P.colonne.length} linee \\(= |M|\\), e coprono tutti gli zeri.`, ` The ${M.tinta(C.blu, "lines")} are the rows outside \\(R\\) and the columns in \\(K\\): ${elenco(lin)}, ${P.righe.length + P.colonne.length} lines \\(= |M|\\), and they cover all the zeros.`);
      }
      if (t === "delta") return T(`Il più piccolo valore scoperto è ${M.tinta(C.rosso, `\\(\\delta = ${P.delta}\\)`)}, nella cella ${zTex(P.cella[0], P.cella[1])}` + ". È positivo: tutti gli zeri sono coperti.", `The minimum uncovered entry is ${M.tinta(C.rosso, `\\(\\delta = ${P.delta}\\)`)}, in the cell ${zTex(P.cella[0], P.cella[1])}` + ". It is positive: all the zeros are covered.");
      if (t === "aggiusta") {
        const scop = intervallo(0, n - 1).filter((r) => !P.righe.includes(r)).map(nr);
        return T(`Si sottrae \\(\\delta = ${P.delta}\\) ai valori scoperti e lo si aggiunge a quelli coperti due volte (${M.tinta(C.a, "in arancio")}): \\(\\pi_i\\) cresce di ${P.delta} per le righe scoperte ${elenco(scop.map(String))}` + (P.colonne.length ? ` e \\(\\pi_j\\) per le colonne coperte ${elenco(P.colonne.map((k) => String(nc(k))))}` : "") + `. Il valore duale cresce di \\(\\delta\\,(n - ${P.linee}) = ${P.delta * (n - P.linee)}\\).`,
          `Subtract \\(\\delta = ${P.delta}\\) from the uncovered entries and add it to the entries covered twice (${M.tinta(C.a, "in orange")}): \\(\\pi_i\\) grows by ${P.delta} for the uncovered rows ${elenco(scop.map(String))}` + (P.colonne.length ? ` and \\(\\pi_j\\) for the covered columns ${elenco(P.colonne.map((k) => String(nc(k))))}` : "") + `. The dual value grows by \\(\\delta\\,(n - ${P.linee}) = ${P.delta * (n - P.linee)}\\).`);
      }
      const asse = Ms.map(([r, k]) => `${nr(r)} → ${nc(k)}`).join(", ");
      return T(`${n} zeri indipendenti: l'${M.tinta(C.blu, "assegnamento")} ${asse} ha costo ridotto 0 ed è ottimo. Costo \\(${P.costo}\\) = valore duale: i potenziali sui margini sono una soluzione duale ottima.`,
        `${n} independent zeros: the ${M.tinta(C.blu, "assignment")} ${asse} has zero reduced cost and is optimal. Cost \\(${P.costo}\\) = dual value: the potentials on the margins are an optimal dual solution.`)
        + (I.pmax ? T(` Profitto massimo: \\(${n} \\cdot ${I.pmax} - ${P.costo} = ${n * I.pmax - P.costo}\\).`, ` Maximum profit: \\(${n} \\cdot ${I.pmax} - ${P.costo} = ${n * I.pmax - P.costo}\\).`) : "");
    },
    domanda: T("Nell'iterazione 1 perché le linee sono le righe 1, 2 e la colonna 5? Segui i cammini alternanti dalla riga libera. Di quanto cresce il valore duale a ogni aggiustamento, e perché non supera mai il costo ottimo? Nell'esercizio 7.6 qual è il profitto massimo?",
      "In iteration 1, why are the lines the rows 1, 2 and the column 5? Follow the alternating paths from the free row. By how much does the dual value grow at each adjustment, and why does it never exceed the optimal cost? In Exercise 7.6, what is the maximum profit?"),
  };

  window.GI_NO_D = { trCalcola, potenziali, cicloDi, ugCalcola, abbinamento, copertura, leggiTrasporto, leggiAssegnamento, casualeTrasporto, casualeAssegnamento, TR_ES, AS_ES };
})();
