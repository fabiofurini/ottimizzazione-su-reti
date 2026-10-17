/* Laboratorio di «Ottimizzazione su reti / Network Optimization»: flusso di costo minimo.
 *
 *   no-min-cost-flow  come nel capitolo 6 «Minimum cost flow» (06_MIN_COST_FLOW/script/verifica.py), su una rete
 *                     bilanciata con limiti inferiori nulli, capacità u_ij finite e costi c_ij; nessuna coppia di
 *                     archi opposti (i,j), (j,i).
 *     Rete residua G(x): l'arco in avanti (i,j) con r_ij = u_ij − x_ij e costo c_ij se x_ij < u_ij, l'arco
 *       all'indietro (j,i) con r_ji = x_ij e costo −c_ij se x_ij > 0, ordinati per (coda, testa).
 *     Cancellazione dei cicli: dal flusso x⁰ dell'istanza (sulla rete di riferimento il flusso più costoso, costo
 *       80) oppure dal flusso del passo 0 (flusso massimo dalla super-sorgente 0 al super-pozzo n+1 con
 *       Edmonds-Karp: visita in ampiezza, archi uscenti per testa crescente). Bellman-Ford su G(x) da d⁰ = 0, una
 *       passata alla volta: archi entranti per coda crescente, a parità la coda più piccola, il predecessore cambia
 *       solo se l'etichetta scende strettamente; stop se d^k = d^{k−1} (π = −d^k traslati con π_n = 0); altrimenti,
 *       dopo la passata n, j = il nodo più piccolo con d^n(j) < d^{n−1}(j), il cammino letto all'indietro (righe
 *       n, …, 1) e il ciclo W fra le due occorrenze del primo nodo ripetuto; aumento di θ = r(W).
 *     Cammini minimi successivi: x = 0, π = 0, e = b; s = il nodo di indice minimo con e_s > 0; Dijkstra da s sui
 *       costi ridotti c^x_ij − π_i + π_j (a parità l'indice più piccolo); t = il nodo con e_t < 0 più vicino (a
 *       parità l'indice più piccolo); π_i := π_i − min{d(i), d(t)}; δ = min{e_s, −e_t, r(P)}. Servono c_ij ≥ 0.
 *
 * Istanze: I = { n, diretto: true, A: [[i, j, u, c], …], b: [b_1, …, b_n], x0: { "i-j": x⁰_ij } (facoltativo), P }.
 * Le istanze nuove («Casuale», «Modifica…», «Bilanci…») ricevono come x⁰ il flusso ammissibile più costoso
 * (cancellazione dei cicli con i costi −c dal flusso del passo 0).
 * Il disegno dei grafi, le istanze e i comandi vengono dal motore gi-no-0.js (window.GI_NO). Verde riservato ai
 * tagli: qui non si usa. Le funzioni di calcolo sono anche in window.GI_NO_C, per le prove.
 */
(function () {
  "use strict";
  const GI = window.GI, M = window.GI_MIP, N = window.GI_NO, T = GI.T;
  const { parPasso, vaiA, lista, osservaDimensioni, nuovaVoce, dim, pix, disegno, daIndirizzo } = N;
  window.GI_RICETTE = window.GI_RICETTE || {};
  const INF = Infinity;
  const ordina = (A) => A.map((a) => a.slice()).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const meno = (v) => (v === INF ? "∞" : v < 0 ? "−" + -v : String(v));        // testo dei disegni (segno tipografico)
  const vTex = (v) => (v === INF ? "+\\infty" : String(v));
  const vet = (v, da = 1) => "(" + v.slice(da).map(vTex).join(",") + ")";
  const somma = (xs) => xs.reduce((s, v) => s + v, 0);
  const costo = (A, x) => somma(A.map((a, q) => a[3] * x[q]));

  // =================================================================
  // le istanze del capitolo e degli esercizi (06_MIN_COST_FLOW)
  // =================================================================
  const RIF = [[0, 2.2], [3.8, 4.4], [3.8, 0], [7.6, 4.4], [7.6, 0], [11.4, 2.2]];          // come nel TikZ del capitolo
  const P5 = [[0, 2.4], [2.283, 0.742], [1.411, -1.942], [-1.411, -1.942], [-2.283, 0.742]];  // esercizi 6.1–6.5
  const P6 = [[0, 2.2], [0, 0], [3.4, 2.2], [3.4, 0], [6.8, 1.1]];                            // esercizio 6.6
  const conX = (A, x) => Object.fromEntries(A.map(([i, j], q) => [i + "-" + j, x[q]]));
  const A_RIF = [[1, 2, 4, 2], [1, 3, 4, 2], [2, 4, 4, 5], [3, 2, 2, 2], [3, 5, 4, 3], [4, 3, 3, 3], [4, 6, 5, 5], [5, 4, 3, 5], [5, 6, 2, 3]];
  const A_EX3 = [[1, 2, 1, 2], [1, 3, 1, 6], [1, 4, 1, 7], [1, 5, 4, 1], [2, 4, 3, 2], [3, 2, 1, 1], [4, 5, 2, 1], [5, 2, 1, 5]];
  const MCF_ES = [
    { nome: T("rete di riferimento (es. 6.6, 6.7)", "reference network (Ex. 6.6, 6.7)"), n: 6, P: RIF,
      A: A_RIF, b: [5, 2, 0, -3, 0, -4], x0: conX(A_RIF, [1, 4, 4, 1, 4, 1, 3, 3, 1]) },
    { nome: T("esercizio 6.3 (cancellazione)", "Exercise 6.3 (cycle canceling)"), n: 5, P: P5, alg: "cycle-canceling",
      A: A_EX3, b: [5, -2, 1, 0, -4], x0: conX(A_EX3, [1, 0, 1, 3, 1, 1, 2, 1]) },
    { nome: T("esercizio 6.4 (cammini successivi)", "Exercise 6.4 (successive paths)"), n: 5, P: P5, alg: "successive-shortest-paths",
      A: [[2, 4, 2, 4], [2, 5, 3, 4], [3, 2, 2, 5], [3, 5, 2, 5], [4, 1, 2, 6], [4, 3, 3, 1], [5, 1, 3, 4], [5, 4, 1, 1]], b: [-3, 3, -3, 3, 0] },
    { nome: T("esercizio 6.5 (passo 0)", "Exercise 6.5 (Step 0)"), n: 5, P: P5, alg: "cycle-canceling",
      A: [[1, 3, 1, 6], [2, 1, 3, 6], [2, 4, 1, 2], [3, 2, 4, 1], [3, 4, 2, 7], [4, 1, 4, 1], [5, 2, 3, 3], [5, 4, 4, 4]], b: [-4, -3, 4, -1, 4] },
    { nome: T("esercizio 6.6 (costi ridotti)", "Exercise 6.6 (reduced costs)"), n: 5, P: P6, alg: "successive-shortest-paths",
      A: [[1, 3, 1, 1], [2, 3, 1, 2], [2, 4, 1, 3], [3, 4, 1, 2], [3, 5, 1, 5], [4, 5, 1, 1]], b: [1, 1, 0, 0, -2] },
  ].map((e) => Object.assign({ diretto: true }, e));

  // =================================================================
  // 1. CALCOLI (come verifica.py del capitolo)
  // =================================================================
  /** gli archi di G(x), A = [[i, j, u, c]] ordinati, x allineato ad A: {i, j, r, c, q (arco di A), verso (±1)} */
  function residua(A, x) {
    const R = [];
    A.forEach(([i, j, u, c], q) => {
      if (x[q] < u) R.push({ i, j, r: u - x[q], c, q, verso: 1 });
      if (x[q] > 0) R.push({ i: j, j: i, r: x[q], c: -c, q, verso: -1 });
    });
    return R.sort((e, f) => e.i - f.i || e.j - f.j);
  }
  /** squilibri e_i = b_i − (uscente − entrante), indici 1..n */
  function squilibri(n, A, b, x) {
    const e = [0].concat(b.slice(0, n));
    A.forEach(([i, j], q) => { e[i] -= x[q]; e[j] += x[q]; });
    return e;
  }
  const aumenta = (x, archi, th) => { const y = x.slice(); for (const e of archi) y[e.q] += e.verso * th; return y; };
  /** il pezzo di W fra le due occorrenze del primo nodo ripetuto (leggendo dall'inizio), primo = ultimo */
  function primoCiclo(W) {
    const visti = {};
    for (let t = 0; t < W.length; t++) {
      if (W[t] in visti) return W.slice(visti[W[t]], t + 1);
      visti[W[t]] = t;
    }
    return [];
  }
  /** Bellman-Ford su G(x) da d⁰ = 0: { righe [d^0, …] (indici 1..n), preds [{nodo: nuovo pred}], j, walk, W } */
  function bellmanFord(n, R) {
    const righe = [new Array(n + 1).fill(0)], preds = [{}];
    const entr = Array.from({ length: n + 1 }, () => []);
    for (const e of R) entr[e.j].push(e);                // R ordinato per coda: archi entranti per coda crescente
    for (let k = 1; k <= n; k++) {
      const vec = righe[k - 1], nuova = vec.slice(), cambio = {};
      for (let j = 1; j <= n; j++) for (const e of entr[j]) if (vec[e.i] + e.c < nuova[j]) { nuova[j] = vec[e.i] + e.c; cambio[j] = e.i; }
      righe.push(nuova); preds.push(cambio);
      if (nuova.every((v, z) => v === vec[z])) return { righe, preds, j: null, walk: null, W: null };
    }
    let j = 1;
    while (!(righe[n][j] < righe[n - 1][j])) j++;
    const walk = [j];
    for (let k = n; k >= 1; k--) walk.push(preds[k][walk[walk.length - 1]]);
    walk.reverse();
    return { righe, preds, j, walk, W: primoCiclo(walk) };
  }
  const archiCammino = (R, W) => W.slice(1).map((v, t) => R.find((e) => e.i === W[t] && e.j === v));
  /** cancellazione dei cicli da x0: { iterazioni: [{x, z, R, bf, archi, cW, rW, xDopo, zDopo}], fine: {x, z, R, bf, pi} } */
  function cancellazione(n, A, x0, maxIt = 1000) {
    let x = x0.slice();
    const iterazioni = [];
    for (let it = 0; it < maxIt; it++) {
      const R = residua(A, x), bf = bellmanFord(n, R), z = costo(A, x);
      if (!bf.W) {
        const d = bf.righe[bf.righe.length - 1];
        return { iterazioni, fine: { x, z, R, bf, pi: d.map((v, i) => (i ? d[n] - v : 0)) } };
      }
      const archi = archiCammino(R, bf.W), cW = somma(archi.map((e) => e.c)), rW = Math.min(...archi.map((e) => e.r));
      const xDopo = aumenta(x, archi, rW);
      iterazioni.push({ x, z, R, bf, archi, cW, rW, xDopo, zDopo: costo(A, xDopo) });
      x = xDopo;
    }
    throw new Error("too many iterations");
  }
  /** passo 0: flusso massimo (Edmonds-Karp) da 0 a n+1 sulla rete ausiliaria.
   *  { ok, x (su A), v, D, cammini: [[nodi], delta], Aa (archi ausiliari [i, j, u, 0]) } */
  function flussoAmmissibile(n, A, b) {
    const Aa = ordina(A.map(([i, j, u]) => [i, j, u, 0])
      .concat(b.map((v, z) => [0, z + 1, v, 0]).filter((a) => a[2] > 0))
      .concat(b.map((v, z) => [z + 1, n + 1, -v, 0]).filter((a) => a[2] > 0)));
    const D = somma(b.filter((v) => v > 0)), cammini = [];
    let xa = new Array(Aa.length).fill(0), v = 0;
    for (let guard = 0; guard < 10000; guard++) {
      const R = residua(Aa, xa), usc = Array.from({ length: n + 2 }, () => []);
      for (const e of R) usc[e.i].push(e);
      const pred = { 0: null }, coda = [0];
      while (coda.length && !((n + 1) in pred)) {
        const w = coda.shift();
        for (const e of usc[w]) if (!(e.j in pred)) { pred[e.j] = e; coda.push(e.j); }
      }
      if (!((n + 1) in pred)) break;
      const P = [];
      for (let w = n + 1; w !== 0; w = pred[w].i) P.unshift(pred[w]);
      const delta = Math.min(...P.map((e) => e.r));
      xa = aumenta(xa, P, delta);
      v += delta;
      cammini.push([[0].concat(P.map((e) => e.j)), delta]);
    }
    const idx = Object.fromEntries(Aa.map(([i, j], q) => [i + "-" + j, q]));
    return { ok: v === D, x: A.map(([i, j]) => xa[idx[i + "-" + j]]), v, D, cammini, Aa, xa };
  }
  /** Dijkstra da s sui costi ridotti cb (cb[q] per l'arco R[q]): { d, pred (arco residuo), perm } */
  function dijkstraRidotti(n, R, cb, s) {
    const d = new Array(n + 1).fill(INF), pred = {}, perm = [], usc = Array.from({ length: n + 1 }, () => []);
    R.forEach((e, q) => usc[e.i].push(q));
    d[s] = 0;
    for (;;) {
      let i = 0;
      for (let v = 1; v <= n; v++) if (!perm.includes(v) && d[v] < INF && (!i || d[v] < d[i])) i = v;
      if (!i) return { d, pred, perm };
      perm.push(i);
      for (const q of usc[i]) { const e = R[q]; if (!perm.includes(e.j) && d[i] + cb[q] < d[e.j]) { d[e.j] = d[i] + cb[q]; pred[e.j] = e; } }
    }
  }
  /** cammini minimi successivi: { iterazioni: [{s, x, e, pi, R, cb, d, pred, perm, t, P, archi, cbP, cP, delta,
   *  xDopo, eDopo, piDopo, zDopo}], fine: {x, pi, z, R, inammissibile, s, S} } oppure { negativi: true } */
  function ssp(n, A, b, maxIt = 1000) {
    if (A.some((a) => a[3] < 0)) return { negativi: true, iterazioni: [], fine: null };
    let x = new Array(A.length).fill(0), pi = new Array(n + 1).fill(0);
    const iterazioni = [];
    for (let it = 0; it < maxIt; it++) {
      const e = squilibri(n, A, b, x), R = residua(A, x), cb = R.map((a) => a.c - pi[a.i] + pi[a.j]);
      if (e.every((v) => v === 0)) return { iterazioni, fine: { x, pi, z: costo(A, x), R, cb, inammissibile: false } };
      let s = 1;
      while (!(e[s] > 0)) s++;
      const { d, pred, perm } = dijkstraRidotti(n, R, cb, s);
      let t = 0;
      for (let v = 1; v <= n; v++) if (e[v] < 0 && d[v] < INF && (!t || d[v] < d[t])) t = v;
      if (!t) return { iterazioni, fine: { x, pi, z: costo(A, x), R, cb, inammissibile: true, s, e, d, perm, pred: Object.fromEntries(Object.entries(pred).map(([v, a]) => [v, a.i])), S: perm.slice().sort((p, q) => p - q) } };
      const archi = [];
      for (let v = t; v !== s; v = pred[v].i) archi.unshift(pred[v]);
      const delta = Math.min(e[s], -e[t], ...archi.map((a) => a.r));
      const xDopo = aumenta(x, archi, delta), piDopo = pi.map((p, i) => (i ? p - Math.min(d[i], d[t]) : 0));
      iterazioni.push({ s, x, e, pi, R, cb, d, pred: Object.fromEntries(Object.entries(pred).map(([v, a]) => [v, a.i])), perm, t,
        P: [s].concat(archi.map((a) => a.j)), archi, cbP: d[t], cP: somma(archi.map((a) => a.c)), delta,
        xDopo, eDopo: squilibri(n, A, b, xDopo), piDopo, zDopo: costo(A, xDopo) });
      x = xDopo; pi = piDopo;
    }
    throw new Error("too many iterations");
  }
  /** il flusso ammissibile più costoso (cancellazione con i costi −c dal flusso del passo 0), o null */
  function piuCostoso(I) {
    const A = ordina(I.A), fa = flussoAmmissibile(I.n, A, I.b);
    if (!fa.ok) return null;
    return conX(A, cancellazione(I.n, A.map(([i, j, u, c]) => [i, j, u, -c]), fa.x).fine.x);
  }

  /** Tutti i passi dell'app: alg = "cycle-canceling" (inizio = "x0" | "passo0") | "successive-shortest-paths".
   *  Ogni passo: {tipo, h (iterazione), x, z, R (rete residua disegnata), …} */
  function mcfCalcola(I, alg, inizio = "x0") {
    const n = I.n, A = ordina(I.A), b = I.b.slice(0, n), passi = [];
    if (alg === "cycle-canceling") {
      let x0, fa = null;
      if (inizio === "x0" && I.x0) x0 = A.map(([i, j]) => I.x0[i + "-" + j] || 0);
      else {
        fa = flussoAmmissibile(n, A, b);
        if (!fa.ok) {
          passi.push({ tipo: "avvio", h: 1, x: fa.x, z: costo(A, fa.x), R: residua(A, fa.x), fa, ok: false });
          return { passi, A, n, b, alg, inizio: "passo0", ok: false };
        }
        x0 = fa.x;
      }
      const CC = cancellazione(n, A, x0);
      passi.push({ tipo: "avvio", h: 1, x: x0, z: costo(A, x0), R: residua(A, x0), fa, ok: true, da: fa ? "passo0" : "x0" });
      const run = (h, it, fin) => {
        const bf = (it || fin).bf, K = bf.righe.length - 1, base = { h, x: (it || fin).x, z: (it || fin).z, R: (it || fin).R, bf };
        for (let k = 1; k <= K; k++) passi.push(Object.assign({ tipo: "bf", k }, base));
        if (fin) { passi.push(Object.assign({ tipo: "fine", k: K, pi: fin.pi }, base)); return; }
        passi.push(Object.assign({ tipo: "ciclo", k: K, archi: it.archi, cW: it.cW, rW: it.rW }, base));
        passi.push({ tipo: "aumento", h, x: it.xDopo, z: it.zDopo, prima: it.x, zPrima: it.z, R: residua(A, it.xDopo), bf, archi: it.archi, cW: it.cW, rW: it.rW });
      };
      CC.iterazioni.forEach((it, z) => run(z + 1, it, null));
      run(CC.iterazioni.length + 1, null, CC.fine);
      return { passi, A, n, b, alg, inizio: fa ? "passo0" : "x0", ok: true, x0, cc: CC, x: CC.fine.x, z: CC.fine.z, pi: CC.fine.pi };
    }
    const S = ssp(n, A, b), x0 = new Array(A.length).fill(0), e0 = squilibri(n, A, b, x0), pi0 = new Array(n + 1).fill(0);
    if (S.negativi) {
      passi.push({ tipo: "negativi", h: 0, x: x0, z: 0, e: e0, pi: pi0, R: residua(A, x0), cb: residua(A, x0).map((a) => a.c) });
      return { passi, A, n, b, alg, negativi: true };
    }
    const R0 = residua(A, x0);
    passi.push({ tipo: "avvio", h: 0, x: x0, z: 0, e: e0, pi: pi0, R: R0, cb: R0.map((a) => a.c) });
    S.iterazioni.forEach((it, z) => {
      const base = { h: z + 1, x: it.x, z: costo(A, it.x), e: it.e, pi: it.pi, R: it.R, cb: it.cb, s: it.s, d: it.d, pred: it.pred, perm: it.perm };
      passi.push(Object.assign({ tipo: "dijkstra" }, base));
      passi.push(Object.assign({ tipo: "cammino", t: it.t, P: it.P, archi: it.archi, cbP: it.cbP, cP: it.cP, delta: it.delta }, base));
      const R2 = residua(A, it.xDopo);
      passi.push({ tipo: "aumento", h: z + 1, x: it.xDopo, z: it.zDopo, prima: it.x, e: it.eDopo, pi: it.piDopo, piPrima: it.pi, R: R2,
        cb: R2.map((a) => a.c - it.piDopo[a.i] + it.piDopo[a.j]), s: it.s, t: it.t, P: it.P, archi: it.archi, d: it.d, delta: it.delta, cP: it.cP });
    });
    const F = S.fine, h = S.iterazioni.length + 1;
    if (F.inammissibile) {
      passi.push({ tipo: "dijkstra", h, x: F.x, z: F.z, e: F.e, pi: F.pi, R: F.R, cb: F.cb, s: F.s, d: F.d, perm: F.perm, pred: F.pred });
      passi.push({ tipo: "inammissibile", h, x: F.x, z: F.z, e: F.e, pi: F.pi, R: F.R, cb: F.cb, s: F.s, d: F.d, S: F.S });
    } else {
      passi.push({ tipo: "fine", h, x: F.x, z: F.z, e: squilibri(n, A, b, F.x), pi: F.pi, R: F.R, cb: F.cb, piN: F.pi.map((p, i) => (i ? p - F.pi[n] : 0)) });
    }
    return { passi, A, n, b, alg, ssp: S, x: F.x, z: F.z, pi: F.pi, inammissibile: F.inammissibile };
  }

  // =================================================================
  // 2. LA RICETTA
  // =================================================================
  const FUNZ = {
    "cycle-canceling": { etichetta: T("Cancellazione dei cicli", "Cycle canceling") },
    "successive-shortest-paths": { etichetta: T("Cammini minimi successivi", "Successive shortest paths") },
  };
  const INIZIO = T("flusso iniziale", "initial flow");
  function mcfStato(st) {
    const D = st.dati;
    if (D.inizio === undefined || (D.inizio === "x0" && !D.g.x0)) D.inizio = D.g.x0 ? "x0" : "passo0";
    return Object.assign(N.stato(st, (I, alg) => mcfCalcola(I, alg, D.inizio), D.inizio), { alg: st.chiave() });
  }
  const scelto = (st, alg) => {
    if (alg && alg !== st.chiave()) {
      const b = st.el.querySelectorAll(".gi-chip")[Object.keys(FUNZ).indexOf(alg)];
      if (b) setTimeout(() => b.click(), 0);
    }
  };
  const nodi = (W) => W.join(",");                // un cammino o un ciclo: «4,5,3,4» (come nelle note)
  const camminoAux = (P, n) => P.map((v) => (v === 0 ? "s" : v === n + 1 ? "t" : String(v))).join(",");
  const archiTex = (archi) => archi.map((e) => `(${e.i},${e.j})`).join(",\\ ");
  const sommaTex = (vs) => vs.map((v, z) => (z === 0 ? String(v) : v < 0 ? `- ${-v}` : `+ ${v}`)).join(" ");
  /** bilanci da testo «5 2 0 -3 0 -4»: array di n interi con somma 0, o un messaggio d'errore */
  function leggiBilanci(s, n) {
    const v = String(s || "").trim().split(/[\s,;]+/).filter(Boolean).map(Number);
    if (v.length !== n || v.some((x) => !Number.isInteger(x) || Math.abs(x) > 99)) return T(`Servono ${n} bilanci interi fra −99 e 99.`, `${n} integer balances between −99 and 99 are needed.`);
    if (somma(v) !== 0) return T(`I bilanci devono avere somma 0 (ora ${somma(v)}).`, `The balances must add up to 0 (now ${somma(v)}).`);
    return v;
  }
  /** un'istanza casuale: archi con u in [1,4] e c in [1,9]; bilanci b = Bx di un flusso a caso (quindi ammissibile) */
  function casualeMcf() {
    for (let tent = 0; tent < 60; tent++) {
      const I = N.casuale({ n: [5, 6], p: 0.42, diretto: true, valori: [[1, 4], [1, 9]],
        prova: (G, J) => {
          const A = ordina(J.A), x = A.map(([, , u]) => (Math.random() < 0.45 ? 0 : M.casuale(1, u))), e = squilibri(J.n, A, new Array(J.n).fill(0), x);
          J.b = e.slice(1).map((v) => -v);
          const D = somma(J.b.filter((v) => v > 0));
          if (D < 3 || D > 8) return false;
          const S = ssp(J.n, A, J.b);
          if (S.iterazioni.length < 2 || S.fine.inammissibile) return false;
          J.x0 = piuCostoso(J);
          return !!J.x0 && mcfCalcola(J, "cycle-canceling", "x0").cc.iterazioni.length >= 2;
        } });
      if (I) return I;
    }
    return null;
  }

  window.GI_RICETTE["no-min-cost-flow"] = {
    titolo: T("Flusso di costo minimo: cancellazione dei cicli e cammini minimi successivi", "Minimum cost flow: cycle canceling and successive shortest paths"),
    funzioni: FUNZ,
    etichettaFunzioni: T("Algoritmo", "Algorithm"),
    parametri: [parPasso("", 0)],          // come si usa: nella testata della pagina (interattivi.AIUTO)
    assi: false,
    opzioniBoard: M.OPZ,
    vista: [0, 400, 600, 0],
    legenda: (st) => {
      const C = M.COL(st);
      return st.chiave() === "cycle-canceling" ? [
        [C.b, T("archi con flusso (rete \\(G\\))", "arcs with flow (network \\(G\\))"), ""],
        [C.a, T("etichette scese nella passata; archi aggiornati", "labels decreased in the pass; updated arcs"), ""],
        [C.rosso, T("ciclo negativo \\(W\\)", "negative cycle \\(W\\)"), ""],
        [C.blu, T("certificato: potenziali \\(\\pi\\) e costi ridotti", "certificate: potentials \\(\\pi\\) and reduced costs"), ""],
        [C.muted, T("arco residuo all'indietro, costo \\(-c_{ij}\\)", "backward residual arc, cost \\(-c_{ij}\\)"), "dashed"],
      ] : [
        [C.b, T("archi con flusso; albero di Dijkstra", "arcs with flow; Dijkstra's tree"), ""],
        [C.a, T("cammino \\(P\\) da \\(s\\) a \\(t\\); archi aggiornati", "path \\(P\\) from \\(s\\) to \\(t\\); updated arcs"), ""],
        [C.e, T("eccesso \\(e_i > 0\\)", "excess \\(e_i > 0\\)"), "punto"],
        [C.viola, T("deficit \\(e_i < 0\\)", "deficit \\(e_i < 0\\)"), "punto"],
        [C.blu, T("potenziali \\(\\pi\\)", "potentials \\(\\pi\\)"), ""],
        [C.muted, T("arco residuo all'indietro", "backward residual arc"), "dashed"],
      ];
    },
    monta(board, st) {
      const D = st.dati;
      nuovaVoce(st);
      const nuovaConBilanci = (I) => { I.x0 = piuCostoso(I); return I; };
      N.montaIstanze(st, MCF_ES, {
        diretto: true, nv: 2, nomiValori: "u,c", nMax: 8, ritmo: 1000,
        casuale: () => casualeMcf(),
        valida: (I) => {
          if (I.A.some((a) => !Number.isInteger(a[2]) || a[2] < 1 || a[2] > 99)) return T("Le capacità devono essere intere, fra 1 e 99.", "The capacities must be integers between 1 and 99.");
          if (I.A.some((a) => !Number.isInteger(a[3]) || Math.abs(a[3]) > 99)) return T("I costi devono essere interi, fra −99 e 99.", "The costs must be integers between −99 and 99.");
          if (I.A.some(([i, j]) => I.A.some(([a, b]) => a === j && b === i))) return T("Niente archi opposti (i,j) e (j,i): la rete residua li confonderebbe.", "No opposite arcs (i,j) and (j,i): the residual network would mix them up.");
          if (!Array.isArray(I.b) || I.b.length !== I.n) {
            const s = N.chiedi(T(`Bilanci b₁ … b${I.n} separati da spazi, con somma 0:`, `Balances b₁ … b${I.n} separated by spaces, adding up to 0:`), new Array(I.n).fill(0).join(" "));
            const b = leggiBilanci(s, I.n);
            if (typeof b === "string") return b;
            I.b = b;
          }
          nuovaConBilanci(I);
          return null;
        },
        altri: [[T("Bilanci…", "Balances…"), T("scrivi i bilanci dei nodi", "type the balances of the nodes"), () => {
          const s = N.chiedi(T(`Bilanci b₁ … b${D.g.n} separati da spazi, con somma 0:`, `Balances b₁ … b${D.g.n} separated by spaces, adding up to 0:`), D.g.b.join(" "));
          if (s == null) return;
          const b = leggiBilanci(s, D.g.n);
          if (typeof b === "string") { window.alert(b); return; }
          D.nuova(nuovaConBilanci(Object.assign(N.copia(D.g), { b, nome: undefined })));
        }]],
        dopo: (I) => { D.inizio = I.x0 ? "x0" : "passo0"; scelto(st, I.alg); },
      });
      osservaDimensioni(board, st);
      daIndirizzo(st);
    },
    aggiorna(board, st) {
      const S = mcfStato(st), D = S.D, C = M.COL(st), [W, H] = dim(board), { R, k, K, P } = S, n = D.g.n, cc = S.alg === "cycle-canceling";
      N.allinea(st, MCF_ES);
      const z0 = D.g.x0 ? costo(ordina(D.g.A), ordina(D.g.A).map(([i, j]) => D.g.x0[i + "-" + j] || 0)) : null;
      const voci = (D.g.x0 ? [["x0", T(`Flusso iniziale: x⁰, costo ${z0}`, `Initial flow: x⁰, cost ${z0}`)]] : [])
        .concat([["passo0", T("Flusso iniziale: passo 0 (flusso massimo)", "Initial flow: Step 0 (maximum flow)")]]);
      const sel = N.menu(st, INIZIO, voci, D.inizio, (v) => { D.inizio = v; vaiA(st, 0); st.aggiorna(); });
      sel.style.display = cc ? "block" : "none";
      const A = R.A, G = N.grafo(Object.assign({}, D.g, { A })), uMax = Math.max(...A.map((a) => a[2]));
      M.ridisegna(board, st, [D.g.id, S.alg, D.inizio, k, M.scuro(), W, H].join("|"), (crea) => {
        pix(board);
        const d = disegno(crea, H), t = P.tipo, fine = t === "fine";
        // --------------------------------------------------- il registro delle iterazioni, in basso
        const righe = [];
        for (const Q of R.passi.slice(0, k + 1)) {
          if (Q.tipo !== "aumento") continue;
          righe.push([cc ? T(`iterazione ${Q.h}: W = ${nodi(Q.bf.W)}, c(W) = ${meno(Q.cW)}, r(W) = ${Q.rW}, costo ${Q.zPrima} → ${Q.z}`, `iteration ${Q.h}: W = ${nodi(Q.bf.W)}, c(W) = ${meno(Q.cW)}, r(W) = ${Q.rW}, cost ${Q.zPrima} → ${Q.z}`)
            : T(`iterazione ${Q.h}: s = ${Q.s}, t = ${Q.t}, P = ${nodi(Q.P)}, δ = ${Q.delta}, costo ${Q.z}`, `iteration ${Q.h}: s = ${Q.s}, t = ${Q.t}, P = ${nodi(Q.P)}, δ = ${Q.delta}, cost ${Q.z}`), Q === P ? C.a : C.testo]);
        }
        if (t === "ciclo") righe.push([T(`iterazione ${P.h}: W = ${nodi(P.bf.W)}, c(W) = ${meno(P.cW)}, r(W) = ${P.rW}`, `iteration ${P.h}: W = ${nodi(P.bf.W)}, c(W) = ${meno(P.cW)}, r(W) = ${P.rW}`), C.rosso]);
        if (t === "cammino") righe.push([T(`iterazione ${P.h}: s = ${P.s}, t = ${P.t}, P = ${nodi(P.P)}, δ = ${P.delta}`, `iteration ${P.h}: s = ${P.s}, t = ${P.t}, P = ${nodi(P.P)}, δ = ${P.delta}`), C.a]);
        if (fine) righe.push([cc ? T(`nessun ciclo negativo: x ottimo, costo ${P.z}`, `no negative cycle: x optimal, cost ${P.z}`)
          : T(`e = 0: x ottimo, costo ${P.z}`, `e = 0: x optimal, cost ${P.z}`), C.blu]);
        if (t === "inammissibile" || (t === "avvio" && P.ok === false)) righe.push([T("nessun flusso ammissibile", "no feasible flow"), C.rosso]);
        // board bassa (1366×768): una sola riga di registro, con il numero del passo accanto, e niente piè di pagina
        const bassa = H < 420, vis = righe.slice(bassa ? -1 : H < 480 ? -3 : -5), lh = H < 480 ? 18 : 20, logH = 12 + lh * Math.max(1, vis.length), fondo = bassa ? 4 : 24;
        // tre disposizioni: le due reti affiancate (schermi larghi), una sopra l'altra (stretti e alti), solo la rete
        // residua (telefono: la board è bassa; il flusso x e gli squilibri restano nelle tabelle del riquadro)
        const hG = H - logH - fondo, impila = W < 640 && hG >= 520, solo = W < 640 && !impila;
        const boxL = impila ? { x: 6, y: 22, w: W - 12, h: (hG - 44) / 2 } : { x: 6, y: 22, w: (W - 24) / 2, h: hG - 22 };
        const boxR = solo ? { x: 6, y: 22, w: W - 12, h: hG - 22 } : impila ? { x: 6, y: 22 + (hG - 44) / 2 + 22, w: W - 12, h: (hG - 44) / 2 } : { x: (W - 24) / 2 + 18, y: 22, w: (W - 24) / 2, h: hG - 22 };
        const titolo = (box, s) => d.text(box.x + 8, box.y - 8, s, { anchorX: "left", fontSize: 13.5, strokeColor: C.muted, cssStyle: "font-style:italic;font-weight:600" });
        // --------------------------------------------------- a sinistra: la rete G con x_ij / u_ij
        const cambiati = new Set(t === "aumento" ? P.archi.map((e) => e.q) : []);
        const sulP = new Set(t === "cammino" ? P.archi.map((e) => e.q) : []);
        if (!solo) titolo(boxL, cc ? T(`rete G: xᵢⱼ/uᵢⱼ, costo ${P.z}`, `network G: xᵢⱼ/uᵢⱼ, cost ${P.z}`)
          : T(`rete G: xᵢⱼ/uᵢⱼ, squilibri e, costo ${P.z}`, `network G: xᵢⱼ/uᵢⱼ, imbalances e, cost ${P.z}`));
        // il motore lascia per le etichette esterne lo stesso margine in orizzontale e in verticale: con le reti
        // basse (1366×768) il grafo diventerebbe minuscolo. Qui il margine verticale è fisso e quello orizzontale
        // si ottiene restringendo il riquadro secondo la lunghezza delle etichette.
        const grafoIn = (Gx, box, opz) => {
          let lmax = 0;
          for (let i = 1; i <= Gx.n; i++) { const f = opz.fuori(i); if (f && f.testo != null) lmax = Math.max(lmax, String(f.testo).length); }
          const m = 20, ex = lmax ? Math.max(0, 11 + 0.6 * 13 * lmax - m) : 0;          // 6 px sotto il titolo del riquadro
          return N.disegnaGrafo(d, Gx, { x: box.x + ex, y: box.y + 6, w: box.w - 2 * ex, h: box.h - 6 }, Object.assign({ margine: m }, opz), C);
        };
        if (!solo) grafoIn(G, boxL, {
          arco: (a) => {
            const q = a.k - 1, x = P.x[q], u = a.v[0];
            let s = { colore: C.muted, spessore: 1.6, opacita: 0.75, etichetta: `${x}/${u}` };
            if (x > 0) s = Object.assign(s, { colore: fine ? C.blu : C.b, spessore: 2 + 3 * x / uMax, opacita: 1 });
            if (cambiati.has(q) || sulP.has(q)) s = Object.assign(s, { colore: C.a, spessore: 4.2, opacita: 1, colEt: C.a, grassetto: true });
            return s;
          },
          nodo: (i) => {
            if (cc) return {};
            const e = P.e[i], s = e > 0 ? { fondo: C.e, opacita: 0.4, bordo: C.e, spessore: 2.6 } : e < 0 ? { fondo: C.viola, opacita: 0.25, bordo: C.viola, spessore: 2.6 } : {};
            if ((t === "dijkstra" || t === "cammino" || t === "inammissibile") && i === P.s) return Object.assign({}, s, { bordo: C.a, spessore: 4.5 });
            if (t === "cammino" && i === P.t) return Object.assign({}, s, { bordo: C.a, spessore: 4.5 });
            return s;
          },
          fuori: (i) => (cc ? { testo: `b=${meno(R.b[i - 1])}`, colore: C.muted }
            : { testo: `e=${meno(P.e[i])}`, colore: P.e[i] > 0 ? C.e : P.e[i] < 0 ? C.viola : C.muted }),
        });
        if (impila) d.line(10, boxR.y - 26, W - 10, boxR.y - 26, { strokeColor: C.line, strokeWidth: 1.4 });
        else if (!solo) d.line(boxR.x - 6, 8, boxR.x - 6, hG - 4, { strokeColor: C.line, strokeWidth: 1.4 });
        // --------------------------------------------------- a destra: la rete residua G(x)
        const Gr = N.grafo({ n, diretto: true, P: D.g.P, A: P.R.map((e, q) => [e.i, e.j, e.r, e.c, e.verso, e.q, q]) });
        const chiave = (e) => e.i + "-" + e.j;
        const Wset = new Set(t === "ciclo" ? P.archi.map(chiave) : []), Wnodi = new Set(t === "ciclo" ? P.bf.W : []);
        const Pset = new Set(t === "cammino" ? P.archi.map(chiave) : []);
        const nuoviCambi = t === "bf" ? P.bf.preds[P.k] : {};
        const albero = new Set((t === "dijkstra" || t === "cammino") && P.pred ? Object.entries(P.pred).map(([v, u]) => u + "-" + v) : []);
        const ridotti = !cc || fine;
        const cbar = (a) => (cc ? a.v[1] - P.pi[a.i] + P.pi[a.j] : P.cb[a.v[4]]);
        let cap2 = cc ? (fine ? T("G(x): rᵢⱼ, costo ridotto cˣᵢⱼ − πᵢ + πⱼ", "G(x): rᵢⱼ, reduced cost cˣᵢⱼ − πᵢ + πⱼ") : T("rete residua G(x): rᵢⱼ, cˣᵢⱼ", "residual network G(x): rᵢⱼ, cˣᵢⱼ"))
          : T("rete residua G(x): rᵢⱼ, cˣᵢⱼ − πᵢ + πⱼ", "residual network G(x): rᵢⱼ, cˣᵢⱼ − πᵢ + πⱼ");
        if (cc && (t === "bf" || t === "ciclo")) cap2 += T(` · d${"⁰¹²³⁴⁵⁶⁷⁸⁹"[P.k] || "^" + P.k} accanto ai nodi`, ` · d${"⁰¹²³⁴⁵⁶⁷⁸⁹"[P.k] || "^" + P.k} next to the nodes`);
        if (!cc && (t === "dijkstra" || t === "cammino")) cap2 += T(" · d(i) accanto ai nodi", " · d(i) next to the nodes");
        if (solo) cap2 = T(`rete residua G(x) · costo ${P.z}`, `residual network G(x) · cost ${P.z}`);
        titolo(boxR, cap2);
        grafoIn(Gr, boxR, {
          curva: 0.24,
          arco: (a) => {
            const key = a.i + "-" + a.j, back = a.v[2] < 0, cb = ridotti ? cbar(a) : null;
            let s = { colore: C.muted, spessore: 1.6, opacita: 0.8, dash: back ? 3 : 0, etichetta: `${a.v[0]},${meno(ridotti ? cb : a.v[1])}` };
            if (fine && cb === 0) s = Object.assign(s, { colEt: C.blu, grassetto: true });
            if (fine && cb < 0) s = Object.assign(s, { colore: C.rosso, colEt: C.rosso, grassetto: true });
            if (albero.has(key)) s = Object.assign(s, { colore: C.b, spessore: 3, opacita: 1 });
            if (t === "bf" && nuoviCambi[a.j] === a.i) s = Object.assign(s, { colore: C.a, spessore: 3.4, opacita: 1, colEt: C.a });
            if (t === "aumento" && cambiati.has(a.v[3])) s = Object.assign(s, { colore: C.a, spessore: 3.4, opacita: 1, colEt: C.a, grassetto: true });
            if (Pset.has(key)) s = Object.assign(s, { colore: C.a, spessore: 4.2, opacita: 1, colEt: C.a, grassetto: true });
            if (Wset.has(key)) s = Object.assign(s, { colore: C.rosso, spessore: 4.4, opacita: 1, colEt: C.rosso, grassetto: true });
            return s;
          },
          nodo: (i) => {
            if (Wnodi.has(i)) return { fondo: C.rosso, opacita: 0.22, bordo: C.rosso, spessore: 3 };
            if (t === "bf" && nuoviCambi[i] !== undefined) return { bordo: C.a, spessore: 4 };
            if (!cc && (t === "dijkstra" || t === "cammino" || t === "inammissibile")) {
              const s = P.d[i] < INF ? { fondo: C.b, opacita: 0.22, bordo: C.b, spessore: 2.4 } : { fondo: C.grigio, opacita: 0.3, bordo: C.grigio, spessore: 2 };
              if (i === P.s || (t === "cammino" && i === P.t)) return Object.assign(s, { bordo: C.a, spessore: 4.5 });
              return s;
            }
            if (fine) return { fondo: C.blu, opacita: 0.18, bordo: C.blu, spessore: 2.4 };
            return {};
          },
          fuori: (i) => {
            if (cc && (t === "bf" || t === "ciclo")) return { testo: meno(P.bf.righe[P.k][i]), colore: nuoviCambi[i] !== undefined ? C.a : C.viola };
            if (cc && fine) return { testo: `π=${meno(P.pi[i])}`, colore: C.blu };
            if (!cc && (t === "dijkstra" || t === "cammino" || t === "inammissibile")) return { testo: meno(P.d[i]), colore: C.b };
            if (!cc && (t === "aumento" || fine || t === "avvio")) return { testo: `π=${meno(fine ? P.piN[i] : P.pi[i])}`, colore: C.blu };
            return null;
          },
        });
        // --------------------------------------------------- in basso: il registro
        d.line(10, hG + 2, W - 10, hG + 2, { strokeColor: C.line, strokeWidth: 1.2 });
        if (!vis.length) d.text(14, hG + 14 + lh / 2, cc ? T("nessun ciclo cancellato ancora", "no cycle canceled yet") : T("nessun cammino ancora: x = 0", "no path yet: x = 0"), { anchorX: "left", fontSize: 13.5, strokeColor: C.muted, cssStyle: "font-style:italic" });
        vis.forEach(([s, col], z) => d.text(14, hG + 14 + lh * (z + 0.5), s, { anchorX: "left", fontSize: 13.5, strokeColor: col, cssStyle: "font-weight:" + (col === C.testo ? 500 : 700) }));
        if ((W > 520 || solo) && !bassa) d.text(14, H - 10, solo ? T("tratteggiati: archi all'indietro", "dashed: backward arcs") : impila ? T("sotto, tratteggiati: archi residui all'indietro", "below, dashed: backward residual arcs")
          : T("a destra, tratteggiati: archi residui all'indietro", "on the right, dashed: backward residual arcs"), { anchorX: "left", fontSize: 12, strokeColor: C.muted, cssStyle: "font-style:italic" });
        d.text(W - 14, bassa ? hG + 14 + lh / 2 : H - 10, T(`passo ${k} di ${K}`, `step ${k} of ${K}`) + (P.h ? T(` · iterazione ${P.h}`, ` · iteration ${P.h}`) : ""), { anchorX: "right", fontSize: 12.5, strokeColor: C.muted });
      });
    },
    formula(p, st) {
      const S = mcfStato(st), { R, P } = S, t = P.tipo, n = R.n;
      if (S.alg === "cycle-canceling") {
        if (t === "avvio") return P.ok === false ? `v = ${P.fa.v} < D = ${P.fa.D} \\;\\Rightarrow\\; \\text{${T("nessun flusso ammissibile", "no feasible flow")}}`
          : (P.fa ? `v = ${P.fa.v} = D: \\quad ` : "") + `\\vet{x}^0 = ${vet(P.x, 0)}, \\quad \\vet{c}\\T\\vet{x}^0 = ${P.z}`;
        if (t === "bf") return `\\vet{d}^{${P.k}} = ${vet(P.bf.righe[P.k])}` + (P.k === P.bf.righe.length - 1 && !P.bf.W ? ` = \\vet{d}^{${P.k - 1}}` : "");
        if (t === "ciclo") return `W = ${nodi(P.bf.W)}: \\quad c(W) = ${sommaTex(P.archi.map((e) => e.c))} = ${P.cW}, \\quad r(W) = \\min\\{${P.archi.map((e) => e.r).join(",")}\\} = ${P.rW}`;
        if (t === "aumento") return `\\theta = ${P.rW}: \\quad \\vet{c}\\T\\vet{x} = ${P.zPrima} + ${P.rW} \\cdot (${P.cW}) = ${P.z}`;
        return `\\vet{\\pi} = -\\vet{d}^{${P.k}} = ${vet(P.pi)}, \\quad c^x_{ij} - \\pi_i + \\pi_j \\ge 0 \\ \\ \\forall (i,j) \\in A(\\vet{x}), \\quad \\vet{c}\\T\\vet{x} = ${P.z}`;
      }
      if (t === "negativi") return `\\exists\\, c_{ij} < 0: \\ \\text{${T("servono costi non negativi", "non-negative costs are needed")}}`;
      if (t === "avvio") return `\\vet{x} = \\vet{0}, \\quad \\vet{\\pi} = \\vet{0}, \\quad \\vet{e} = \\vet{b} = ${vet(P.e)}`;
      if (t === "dijkstra") return `s = ${P.s}: \\quad \\vet{d} = ${vet(P.d)}`;
      if (t === "cammino") return `t = ${P.t},\\ P = ${nodi(P.P)}: \\quad \\delta = \\min\\{e_s, -e_t, r(P)\\} = \\min\\{${[P.e[P.s], -P.e[P.t]].concat(P.archi.map((e) => e.r)).join(",")}\\} = ${P.delta}`;
      if (t === "aumento") return `\\vet{\\pi} = ${vet(P.pi)}, \\quad \\vet{e} = ${vet(P.e)}, \\quad \\vet{c}\\T\\vet{x} = ${P.z}`;
      if (t === "inammissibile") return `S = \\{${P.S.join(",")}\\}: \\ \\text{${T("nessun nodo in deficit raggiungibile da", "no deficit node reachable from")} } s = ${P.s}`;
      return `\\vet{e} = \\vet{0}: \\quad \\vet{c}\\T\\vet{x} = ${P.z}, \\quad \\vet{\\pi} ${P.pi[n] ? `+ ${-P.pi[n]}` : ""} = ${vet(P.piN)}`;
    },
    letture(p, st) {
      const S = mcfStato(st), { R, P } = S, C = M.COL(st), t = P.tipo, A = R.A, n = R.n, cc = S.alg === "cycle-canceling";
      const pic = (s) => `<p style="margin:.2em 0;font-size:.9em;color:${C.muted}">${s}</p>`;
      const tabArchi = (cols) => `<table class="gi-tabella"><tr><th>\\((i,j)\\)</th>${cols.map((c) => `<th>${c[0]}</th>`).join("")}</tr>` +
        A.map((a, q) => `<tr><td>\\((${a[0]},${a[1]})\\)</td>${cols.map((c) => `<td style="text-align:center">${c[1](a, q)}</td>`).join("")}</tr>`).join("") + "</table>";
      const evid = (s, si) => (si ? `<strong style="color:${C.a}">${s}</strong>` : s);
      let nota = "", tab = "";
      if (cc) {
        if (t === "avvio") {
          if (P.ok === false) nota = T(`Passo 0: il flusso massimo dalla super-sorgente \\(s\\) al super-pozzo \\(t\\) vale \\(v = ${P.fa.v} < D = ${P.fa.D}\\): ${M.tinta(C.rosso, "la rete non ha flussi ammissibili")}. STOP.`,
            `Step 0: the maximum flow from the super source \\(s\\) to the super sink \\(t\\) has value \\(v = ${P.fa.v} < D = ${P.fa.D}\\): ${M.tinta(C.rosso, "the network has no feasible flow")}. STOP.`);
          else nota = (P.fa ? T(`Passo 0: archi \\((s,i)\\) di capacità \\(b_i > 0\\) e \\((i,t)\\) di capacità \\(-b_i\\); Edmonds–Karp trova i cammini ${P.fa.cammini.map(([Q, dl]) => `\\(${camminoAux(Q, n)}\\) (${dl})`).join(", ")}, valore \\(${P.fa.v} = D\\). Sugli archi di \\(A\\) è il flusso ammissibile \\(\\vet{x}^0\\), di costo ${P.z}. `,
            `Step 0: arcs \\((s,i)\\) with capacity \\(b_i > 0\\) and \\((i,t)\\) with capacity \\(-b_i\\); Edmonds–Karp finds the paths ${P.fa.cammini.map(([Q, dl]) => `\\(${camminoAux(Q, n)}\\) (${dl})`).join(", ")}, value \\(${P.fa.v} = D\\). On the arcs of \\(A\\) it is the feasible flow \\(\\vet{x}^0\\), of cost ${P.z}. `)
            : T(`Si parte dal flusso ammissibile \\(\\vet{x}^0\\), di costo ${P.z}. `, `Start from the feasible flow \\(\\vet{x}^0\\), of cost ${P.z}. `))
            + T(`La rete residua \\(G(\\vet{x})\\) ha l'arco in avanti \\((i,j)\\) con \\(r_{ij} = u_{ij} - x_{ij}\\) e costo \\(c_{ij}\\) se \\(x_{ij} < u_{ij}\\), l'arco all'indietro \\((j,i)\\) con \\(r_{ji} = x_{ij}\\) e costo \\(-c_{ij}\\) se \\(x_{ij} > 0\\). Bellman–Ford parte da \\(d^0(j) = 0\\) per ogni nodo, così trova un ciclo negativo ovunque sia.`,
              `The residual network \\(G(\\vet{x})\\) has the forward arc \\((i,j)\\) with \\(r_{ij} = u_{ij} - x_{ij}\\) and cost \\(c_{ij}\\) if \\(x_{ij} < u_{ij}\\), the backward arc \\((j,i)\\) with \\(r_{ji} = x_{ij}\\) and cost \\(-c_{ij}\\) if \\(x_{ij} > 0\\). Bellman–Ford starts from \\(d^0(j) = 0\\) at every node, so it finds a negative cycle wherever it is.`);
          tab = tabArchi([["\\(c_{ij}\\)", (a) => `\\(${a[3]}\\)`], ["\\(u_{ij}\\)", (a) => `\\(${a[2]}\\)`], ["\\(x^0_{ij}\\)", (a, q) => `\\(${P.x[q]}\\)`]]);
        } else if (t === "bf" || t === "ciclo" || t === "fine") {
          const cambi = Object.keys(P.bf.preds[P.k]).map(Number), ultima = P.k === P.bf.righe.length - 1;
          if (t === "bf") nota = T(`Iterazione ${P.h}, passata ${P.k} di Bellman–Ford su \\(G(\\vet{x})\\): \\(d^{${P.k}}(j) = \\min\\{d^{${P.k - 1}}(j),\\ \\min_{(i,j)} d^{${P.k - 1}}(i) + c^x_{ij}\\}\\). `,
            `Iteration ${P.h}, pass ${P.k} of Bellman–Ford on \\(G(\\vet{x})\\): \\(d^{${P.k}}(j) = \\min\\{d^{${P.k - 1}}(j),\\ \\min_{(i,j)} d^{${P.k - 1}}(i) + c^x_{ij}\\}\\). `)
            + (cambi.length ? T(`Scendono le etichette ${cambi.length === 1 ? "del nodo" : "dei nodi"} ${M.tinta(C.a, lista(cambi))}, con il nuovo predecessore fra parentesi.`, `The ${cambi.length === 1 ? "label of node" : "labels of nodes"} ${M.tinta(C.a, lista(cambi))} decrease, with the new predecessor in brackets.`)
              : T(`Nessuna etichetta scende: \\(d^{${P.k}} = d^{${P.k - 1}}\\), STOP: \\(G(\\vet{x})\\) non ha cicli negativi.`, `No label decreases: \\(d^{${P.k}} = d^{${P.k - 1}}\\), STOP: \\(G(\\vet{x})\\) has no negative cycle.`))
            + (ultima && P.bf.W ? T(` È la passata \\(n = ${n}\\): \\(d^{${n}} \\ne d^{${n - 1}}\\), c'è un ciclo negativo.`, ` This is pass \\(n = ${n}\\): \\(d^{${n}} \\ne d^{${n - 1}}\\), there is a negative cycle.`) : "");
          else if (t === "ciclo") nota = T(`\\(j = ${P.bf.j}\\), il nodo più piccolo con \\(d^{${n}}(j) < d^{${n - 1}}(j)\\). Leggendo i predecessori all'indietro, una riga per passata (in grassetto), si ha il cammino \\(${nodi(P.bf.walk)}\\); il primo nodo ripetuto chiude il ${M.tinta(C.rosso, "ciclo negativo")} \\(W = ${nodi(P.bf.W)}\\), con gli archi \\(${archiTex(P.archi)}\\): \\(c(W) = ${P.cW}\\), \\(r(W) = ${P.rW}\\).`,
            `\\(j = ${P.bf.j}\\), the smallest node with \\(d^{${n}}(j) < d^{${n - 1}}(j)\\). Reading the predecessors backwards, one row per pass (in bold), gives the walk \\(${nodi(P.bf.walk)}\\); the first repeated node closes the ${M.tinta(C.rosso, "negative cycle")} \\(W = ${nodi(P.bf.W)}\\), with the arcs \\(${archiTex(P.archi)}\\): \\(c(W) = ${P.cW}\\), \\(r(W) = ${P.rW}\\).`);
          else nota = T(`La passata ${P.k} ripete le etichette: \\(G(\\vet{x})\\) non ha cicli negativi e ${M.tinta(C.blu, `\\(\\vet{x}\\) è ottimo, di costo ${P.z}`)}. Con \\(\\pi_i = -d^{${P.k}}(i)\\), traslati in modo che \\(\\pi_{${n}} = 0\\), ogni arco di \\(G(\\vet{x})\\) ha costo ridotto \\(c^x_{ij} - \\pi_i + \\pi_j \\ge 0\\) (scritto sugli archi): il certificato di ottimalità.`,
            `Pass ${P.k} repeats the labels: \\(G(\\vet{x})\\) has no negative cycle and ${M.tinta(C.blu, `\\(\\vet{x}\\) is optimal, of cost ${P.z}`)}. With \\(\\pi_i = -d^{${P.k}}(i)\\), shifted so that \\(\\pi_{${n}} = 0\\), every arc of \\(G(\\vet{x})\\) has reduced cost \\(c^x_{ij} - \\pi_i + \\pi_j \\ge 0\\) (written on the arcs): the certificate of optimality.`);
          // la tabella di Bellman-Ford fino alla passata corrente
          const gr = t === "ciclo" ? (kk, i) => kk >= 1 && P.bf.walk[kk] === i : () => false;
          // compatta (testo semplice, non MathJax): sta nella colonna dei comandi anche con 8 nodi
          tab = pic(T("Righe \\(d^k(i)\\) di Bellman–Ford (una colonna per nodo \\(i\\)); fra parentesi il nuovo predecessore.", "Rows \\(d^k(i)\\) of Bellman–Ford (one column per node \\(i\\)); in brackets the new predecessor."))
            + `<table class="gi-tabella" style="font-size:.86em"><tr><th style="text-align:center">\\(k\\)</th>${Array.from({ length: n }, (_, z) => `<th style="text-align:center">${z + 1}</th>`).join("")}</tr>` +
            P.bf.righe.slice(0, P.k + 1).map((r, kk) => `<tr${kk === P.k && t === "bf" ? ` style="background:color-mix(in srgb, ${C.a} 14%, transparent)"` : ""}><td style="text-align:center">${kk}</td>` +
              r.slice(1).map((v, z) => { const pr = P.bf.preds[kk][z + 1], g = gr(kk, z + 1), s = meno(v) + (pr !== undefined ? `<small style="opacity:.8">(${pr})</small>` : "");
                return `<td style="text-align:right;white-space:nowrap;padding:.1em .25em">${g ? `<strong style="color:${C.rosso}">${s}</strong>` : s}</td>`; }).join("") + "</tr>").join("") + "</table>";
          if (t === "fine") tab += pic(T("Sugli archi di \\(A\\): \\(\\bar{c}_{ij} > 0 \\Rightarrow x_{ij} = 0\\), \\(\\bar{c}_{ij} < 0 \\Rightarrow x_{ij} = u_{ij}\\).", "On the arcs of \\(A\\): \\(\\bar{c}_{ij} > 0 \\Rightarrow x_{ij} = 0\\), \\(\\bar{c}_{ij} < 0 \\Rightarrow x_{ij} = u_{ij}\\)."))
            + tabArchi([["\\(\\tilde{x}_{ij}\\)", (a, q) => `\\(${P.x[q]}\\)`], ["\\(u_{ij}\\)", (a) => `\\(${a[2]}\\)`], ["\\(\\bar{c}_{ij}\\)", (a) => `\\(${a[3] - P.pi[a[0]] + P.pi[a[1]]}\\)`]]);
        } else if (t === "aumento") {
          nota = T(`Si aumenta \\(\\vet{x}\\) lungo \\(W\\) di \\(\\theta = r(W) = ${P.rW}\\): \\(+\\theta\\) sugli archi in avanti, \\(-\\theta\\) sugli archi di \\(A\\) percorsi all'indietro. Il costo scende di \\(\\theta\\,|c(W)| = ${-P.rW * P.cW}\\), da ${P.zPrima} a ${M.tinta(C.a, String(P.z))}; un arco di \\(W\\) si satura e lascia \\(G(\\vet{x})\\): il ciclo è cancellato. La rete residua cambia sugli archi di \\(W\\) (in arancione); poi Bellman–Ford riparte da \\(d^0 = 0\\).`,
            `Augment \\(\\vet{x}\\) along \\(W\\) by \\(\\theta = r(W) = ${P.rW}\\): \\(+\\theta\\) on the forward arcs, \\(-\\theta\\) on the arcs of \\(A\\) traversed backwards. The cost decreases by \\(\\theta\\,|c(W)| = ${-P.rW * P.cW}\\), from ${P.zPrima} to ${M.tinta(C.a, String(P.z))}; an arc of \\(W\\) is saturated and leaves \\(G(\\vet{x})\\): the cycle is canceled. The residual network changes on the arcs of \\(W\\) (in orange); then Bellman–Ford restarts from \\(d^0 = 0\\).`);
          const ch = new Set(P.archi.map((e) => e.q));
          tab = tabArchi([["\\(c_{ij}\\)", (a) => `\\(${a[3]}\\)`], ["\\(u_{ij}\\)", (a) => `\\(${a[2]}\\)`], [T("prima", "before"), (a, q) => `\\(${P.prima[q]}\\)`], [T("dopo", "after"), (a, q) => evid(`\\(${P.x[q]}\\)`, ch.has(q))]]);
        }
        return nota + tab;
      }
      // ------------------------------------------------ cammini minimi successivi
      const tabNodi = (righe) => `<table class="gi-tabella"><tr><th>\\(i\\)</th>${Array.from({ length: n }, (_, z) => `<th style="text-align:center">${z + 1}</th>`).join("")}</tr>` +
        righe.map(([nome, f]) => `<tr><th style="text-align:left">${nome}</th>` + Array.from({ length: n }, (_, z) => `<td style="text-align:center">${f(z + 1)}</td>`).join("") + "</tr>").join("") + "</table>";
      const num = (v) => (v === INF ? "∞" : `\\(${v}\\)`);
      if (t === "negativi") {
        nota = T(`I cammini minimi successivi partono da \\(\\vet{x} = \\vet{0}\\), \\(\\vet{\\pi} = \\vet{0}\\) e servono costi \\(c_{ij} \\ge 0\\) (per Dijkstra); questa istanza ha ${M.tinta(C.rosso, "costi negativi")}. Usa la cancellazione dei cicli.`,
          `Successive shortest paths start from \\(\\vet{x} = \\vet{0}\\), \\(\\vet{\\pi} = \\vet{0}\\) and need costs \\(c_{ij} \\ge 0\\) (for Dijkstra); this instance has ${M.tinta(C.rosso, "negative costs")}. Use cycle canceling.`);
        return nota;
      }
      if (t === "avvio") nota = T(`Si parte da \\(\\vet{x} = \\vet{0}\\), \\(\\vet{\\pi} = \\vet{0}\\), \\(\\vet{e} = \\vet{b}\\): con \\(c_{ij} \\ge 0\\) i costi ridotti di \\(G(\\vet{0})\\) sono non negativi. A ogni iterazione \\(s\\) è il nodo di indice minimo con \\(e_s > 0\\); Dijkstra da \\(s\\) usa le lunghezze \\(c^x_{ij} - \\pi_i + \\pi_j\\) (scritte sugli archi della rete residua); \\(t\\) è il nodo in deficit più vicino.`,
        `Start from \\(\\vet{x} = \\vet{0}\\), \\(\\vet{\\pi} = \\vet{0}\\), \\(\\vet{e} = \\vet{b}\\): with \\(c_{ij} \\ge 0\\) the reduced costs of \\(G(\\vet{0})\\) are non-negative. At each iteration \\(s\\) is the node of smallest index with \\(e_s > 0\\); Dijkstra from \\(s\\) uses the lengths \\(c^x_{ij} - \\pi_i + \\pi_j\\) (written on the arcs of the residual network); \\(t\\) is the nearest deficit node.`);
      else if (t === "dijkstra") nota = T(`Iterazione ${P.h}: \\(s = ${P.s}\\), il nodo di indice minimo con \\(e_s > 0\\) (\\(e_{${P.s}} = ${P.e[P.s]}\\)). Dijkstra da \\(s\\) sui costi ridotti rende permanenti i nodi nell'ordine ${lista(P.perm)}; le distanze \\(d(i)\\) sono accanto ai nodi, gli archi dei predecessori in evidenza.`,
        `Iteration ${P.h}: \\(s = ${P.s}\\), the node of smallest index with \\(e_s > 0\\) (\\(e_{${P.s}} = ${P.e[P.s]}\\)). Dijkstra from \\(s\\) on the reduced costs makes the nodes permanent in the order ${lista(P.perm)}; the distances \\(d(i)\\) are next to the nodes, the predecessor arcs highlighted.`);
      else if (t === "cammino") {
        const def = Array.from({ length: n }, (_, z) => z + 1).filter((v) => P.e[v] < 0 && P.d[v] < INF);
        nota = T(`${def.length === 1 ? "Il nodo in deficit raggiungibile è" : "I nodi in deficit raggiungibili sono"} ${lista(def)}; il più vicino è ${M.tinta(C.a, `\\(t = ${P.t}\\)`)}, con \\(d(t) = ${P.cbP}\\). Il ${M.tinta(C.a, "cammino")} \\(P = ${nodi(P.P)}\\) ha costo ridotto \\(${P.cbP}\\) e costo \\(c(P) = ${sommaTex(P.archi.map((e) => e.c))} = ${P.cP}\\); si inviano \\(\\delta = ${P.delta}\\) unità.`,
          `${def.length === 1 ? "The reachable deficit node is" : "The reachable deficit nodes are"} ${lista(def)}; the nearest is ${M.tinta(C.a, `\\(t = ${P.t}\\)`)}, with \\(d(t) = ${P.cbP}\\). The ${M.tinta(C.a, "path")} \\(P = ${nodi(P.P)}\\) has reduced cost \\(${P.cbP}\\) and cost \\(c(P) = ${sommaTex(P.archi.map((e) => e.c))} = ${P.cP}\\); \\(\\delta = ${P.delta}\\) units are sent.`);
      } else if (t === "aumento") nota = T(`Potenziali: \\(\\pi_i := \\pi_i - \\min\\{d(i), d(t)\\}\\) con \\(d(t) = ${P.d[P.t]}\\) (i nodi più lontani di \\(t\\) scendono solo di \\(d(t)\\)). Poi \\(\\vet{x}\\) aumenta di \\(\\delta = ${P.delta}\\) lungo \\(P\\): \\(e_{${P.s}}\\) scende e \\(e_{${P.t}}\\) sale di ${P.delta}, il costo cresce di \\(\\delta\\,c(P) = ${P.delta * P.cP}\\) e diventa ${M.tinta(C.a, String(P.z))}. Nella rete residua i nuovi costi ridotti: tutti \\(\\ge 0\\), nulli sugli archi di \\(P\\) e sui loro inversi.`,
        `Potentials: \\(\\pi_i := \\pi_i - \\min\\{d(i), d(t)\\}\\) with \\(d(t) = ${P.d[P.t]}\\) (the nodes farther than \\(t\\) decrease by \\(d(t)\\) only). Then \\(\\vet{x}\\) grows by \\(\\delta = ${P.delta}\\) along \\(P\\): \\(e_{${P.s}}\\) decreases and \\(e_{${P.t}}\\) increases by ${P.delta}, the cost grows by \\(\\delta\\,c(P) = ${P.delta * P.cP}\\) and becomes ${M.tinta(C.a, String(P.z))}. In the residual network the new reduced costs: all \\(\\ge 0\\), zero on the arcs of \\(P\\) and on their reverses.`);
      else if (t === "inammissibile") nota = T(`Nessun nodo in deficit è raggiungibile da \\(s = ${P.s}\\): nessun arco di \\(G(\\vet{x})\\) esce da \\(S = \\{${P.S.join(",")}\\}\\), e la somma dei bilanci in \\(S\\) supera la capacità del taglio. ${M.tinta(C.rosso, "La rete non ha flussi ammissibili")}. STOP.`,
        `No deficit node is reachable from \\(s = ${P.s}\\): no arc of \\(G(\\vet{x})\\) leaves \\(S = \\{${P.S.join(",")}\\}\\), and the balances in \\(S\\) add up to more than the capacity of the cut. ${M.tinta(C.rosso, "The network has no feasible flow")}. STOP.`);
      else nota = T(`\\(\\vet{e} = \\vet{0}\\): ${M.tinta(C.blu, `\\(\\vet{x}\\) è un flusso ammissibile e ottimo, di costo ${P.z}`)}, perché i costi ridotti su \\(G(\\vet{x})\\) sono \\(\\ge 0\\). Traslati in modo che \\(\\pi_{${n}} = 0\\), i potenziali sono \\(\\vet{\\pi} = ${vet(P.piN)}\\).`,
        `\\(\\vet{e} = \\vet{0}\\): ${M.tinta(C.blu, `\\(\\vet{x}\\) is a feasible and optimal flow, of cost ${P.z}`)}, because the reduced costs on \\(G(\\vet{x})\\) are \\(\\ge 0\\). Shifted so that \\(\\pi_{${n}} = 0\\), the potentials are \\(\\vet{\\pi} = ${vet(P.piN)}\\).`);
      const righe = [["\\(e_i\\)", (i) => num(P.e[i])], ["\\(\\pi_i\\)", (i) => num(t === "fine" ? P.piN[i] : P.pi[i])]];
      if (t === "dijkstra" || t === "cammino" || t === "inammissibile") righe.push(["\\(d(i)\\)", (i) => num(P.d[i])]);
      if (t === "aumento") righe.splice(1, 0, [T("\\(\\pi_i\\) prima", "\\(\\pi_i\\) before"), (i) => num(P.piPrima[i])]);
      tab = tabNodi(righe);
      if (t === "fine") tab += pic(T("Sugli archi di \\(A\\): \\(\\bar{c}_{ij} > 0 \\Rightarrow x_{ij} = 0\\), \\(\\bar{c}_{ij} < 0 \\Rightarrow x_{ij} = u_{ij}\\).", "On the arcs of \\(A\\): \\(\\bar{c}_{ij} > 0 \\Rightarrow x_{ij} = 0\\), \\(\\bar{c}_{ij} < 0 \\Rightarrow x_{ij} = u_{ij}\\)."))
        + tabArchi([["\\(\\tilde{x}_{ij}\\)", (a, q) => `\\(${P.x[q]}\\)`], ["\\(u_{ij}\\)", (a) => `\\(${a[2]}\\)`], ["\\(\\bar{c}_{ij}\\)", (a) => `\\(${a[3] - P.piN[a[0]] + P.piN[a[1]]}\\)`]]);
      return nota + tab;
    },
    domanda: T("Sulla rete di riferimento, quanti cicli cancella l'algoritmo partendo da x⁰ (costo 80)? E partendo dal flusso del passo 0? Confronta i potenziali finali dei due algoritmi: dopo la traslazione con π₆ = 0 coincidono?",
      "On the reference network, how many cycles does the algorithm cancel starting from x⁰ (cost 80)? And starting from the flow of Step 0? Compare the final potentials of the two algorithms: after the shift with π₆ = 0, do they coincide?"),
  };

  window.GI_NO_C = { residua, squilibri, bellmanFord, primoCiclo, cancellazione, flussoAmmissibile, dijkstraRidotti, ssp, piuCostoso, mcfCalcola, MCF_ES };
})();
