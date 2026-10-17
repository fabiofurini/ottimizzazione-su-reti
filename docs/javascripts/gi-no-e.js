/* Laboratorio di «Ottimizzazione su reti / Network Optimization»: il simplesso su reti e il cammino critico.
 *
 *   no-network-simplex  il simplesso su reti come nel capitolo 8 «The network simplex»
 *                       (08_NETWORK_SIMPLEX/script/verifica.py, stesse regole): nodi 1..n, archi in ordine
 *                       lessicografico; la RADICE di ogni albero è l'ultimo nodo (n, o n+1 nella rete ausiliaria
 *                       della Fase 0) e i potenziali hanno c̄_ij = c_ij − π_i + π_j = 0 sugli archi dell'albero e
 *                       π_radice = 0 (vincoli duali π_i − π_j ≤ c_ij); soluzione dell'albero dalle foglie, sempre
 *                       la foglia di indice più piccolo diversa dalla radice; arco entrante: fra gli archi di L con
 *                       c̄ < 0 e di U con c̄ > 0 quello con |c̄| massimo (a parità il primo in ordine
 *                       lessicografico); ciclo del pivot orientato come e (e ∈ L) o contro e (e ∈ U), percorso
 *                       dall'APICE; passo θ = minima capacità residua; arco uscente = l'ULTIMO arco bloccante
 *                       dall'apice (va in U se è in avanti, in L se è all'indietro): con un albero iniziale
 *                       fortemente ammissibile il simplesso non cicla. Fase 0: nodo artificiale r = n+1, archi
 *                       (i,r) se b_i ≥ 0 e (r,i) se b_i < 0, capacità +∞, costo 1 (0 sugli archi di A); poi i
 *                       costi c (0 sugli artificiali) e possono entrare solo gli archi con c̄⁰ = 0 (gli altri sono
 *                       «congelati»). Ciclo del pivot in viola, come nelle figure del capitolo.
 *                       Voci: «albero iniziale dato» (le strutture degli esempi 8.5 e 8.7) e «Fase 0» (es. 8.8).
 *   no-cpm              il metodo del cammino critico come nel capitolo 9 «Project management»
 *                       (09_PROJECT_MANAGEMENT/script/verifica.py): attività 1..n, START = 0 e FINISH = n+1 con
 *                       durata 0; archi (i,j) per ogni predecessore immediato, (0,j) e (j,n+1); l'arco (i,j) ha
 *                       lunghezza d_i; ordine topologico con il nodo di indice più piccolo; passaggio in avanti
 *                       (ES, EF), T = ES_{n+1}, passaggio all'indietro (LF, LS), margini totali e liberi, archi tesi
 *                       (ES_j = EF_i) e cammini critici (cammini START–FINISH di archi tesi, in ordine
 *                       lessicografico); alla fine il diagramma di Gantt. Istanze: il caso di studio (14 attività,
 *                       lettere A…N diventate 1…14) e il secondo esempio (due cammini critici), più lo stesso con
 *                       un ciclo nelle precedenze (3 dopo 8), che ferma il metodo al passo 0.
 *
 * Il disegno dei grafi, i comandi e il menu delle istanze vengono dal motore gi-no-0.js (window.GI_NO); la rete
 * di progetto la disegna questo file (nodi START e FINISH rettangolari, durate e tempi accanto ai nodi). Verde
 * riservato ai tagli: qui non si usa. Le funzioni di calcolo sono anche in window.GI_NO_E, per le prove
 * (python/test/controlla_app_no_e.py).
 */
(function () {
  "use strict";
  const GI = window.GI, M = window.GI_MIP, N = window.GI_NO, T = GI.T;
  const { parPasso, vaiA, clamp, lista, osservaDimensioni, nuovaVoce, dim, pix, disegno, daIndirizzo } = N;
  window.GI_RICETTE = window.GI_RICETTE || {};
  const meno = (v) => (v < 0 ? "−" + -v : String(v));          // segno meno tipografico nelle scritte SVG
  const chiave = (a) => a[0] + "-" + a[1];
  const lex = (a, b) => a[0] - b[0] || a[1] - b[1];
  const ordinaArchi = (L) => L.map((a) => [a[0], a[1]]).sort(lex);
  const uguale = (a, b) => !!a && !!b && a[0] === b[0] && a[1] === b[1];
  const arcoTxt = (a) => `(${a[0]},${a[1]})`;
  const arcoTex = (a) => `(${a[0]},${a[1]})`;
  const insiemeTex = (L) => (L.length ? `\\{${L.map(arcoTex).join(",")}\\}` : "\\emptyset");
  const range = (a, b) => Array.from({ length: b - a + 1 }, (_, q) => a + q);
  const bgSel = (c, p = 20) => `background:color-mix(in srgb, ${c} ${p}%, transparent);`;

  // =================================================================
  // 1. IL SIMPLESSO SU RETI
  // =================================================================
  // la rete di riferimento del capitolo 4 (b, c, u) con le posizioni delle figure del capitolo 8
  const POS_RIF = [[0, 1.5], [3, 3], [3, 0], [6, 3], [6, 0], [9, 1.5]];
  const ARCHI_RIF = [[1, 2], [1, 3], [2, 4], [3, 2], [3, 5], [4, 3], [4, 6], [5, 4], [5, 6]];
  const C_RIF = [2, 2, 5, 2, 3, 3, 5, 5, 3], U_RIF = [4, 4, 4, 2, 4, 3, 5, 3, 2], B_RIF = [5, 2, 0, -3, 0, -4];
  // archi [i, j, c, u] con u = 0 per «senza capacità» (u = +∞); T0, U0: la struttura iniziale degli esempi
  const NS_ES = [
    { nome: T("rete di riferimento senza capacità (es. 8.5)", "reference network without capacities (Ex. 8.5)"),
      A: ARCHI_RIF.map(([i, j], q) => [i, j, C_RIF[q], 0]), T0: [[1, 3], [2, 4], [3, 5], [4, 6], [5, 4]], U0: [] },
    { nome: T("rete di riferimento con capacità, da x̄ (es. 8.7, 8.8)", "reference network with capacities, from x̄ (Ex. 8.7, 8.8)"),
      A: ARCHI_RIF.map(([i, j], q) => [i, j, C_RIF[q], U_RIF[q]]), T0: [[1, 2], [2, 4], [3, 2], [4, 6], [5, 4]], U0: [[1, 3], [3, 5], [5, 6]] },
  ].map((e) => Object.assign({ n: 6, diretto: true, b: B_RIF.slice(), P: POS_RIF }, e));

  /** L'albero T radicato in `radice`: pred[v] (nodo successivo verso la radice), arco[v] (l'arco fra v e pred[v]) e
   *  prof[v] (numero di archi fino alla radice); solo i nodi collegati alla radice. Come radica() di verifica.py. */
  function radica(T, radice) {
    const adj = {};
    for (const a of T) {
      (adj[a[0]] = adj[a[0]] || []).push([a[1], a]);
      (adj[a[1]] = adj[a[1]] || []).push([a[0], a]);
    }
    const pred = { [radice]: null }, arco = { [radice]: null }, prof = { [radice]: 0 }, coda = [radice];
    while (coda.length) {
      const v = coda.shift();
      const vic = (adj[v] || []).slice().sort((p, q) => p[0] - q[0] || lex(p[1], q[1]));
      for (const [w, a] of vic) if (!(w in pred)) { pred[w] = v; arco[w] = a; prof[w] = prof[v] + 1; coda.push(w); }
    }
    return { pred, arco, prof };
  }
  const eAlberoRicoprente = (n, T) => T.length === n - 1 && Object.keys(radica(T, n).pred).length === n;

  /** Soluzione dell'albero di (T, L, U): x = 0 su L, x = u su U, poi gli archi dell'albero dalle foglie (sempre la
   *  foglia di indice più piccolo diversa dalla radice n, che passa il suo bilancio residuo al vicino).
   *  b: array 1..n; u: chiave -> capacità o null (+∞). Restituisce { x, foglie, bU (bilanci residui dopo U) }. */
  function soluzioneAlbero(n, A, b, u, T, U) {
    const x = {};
    for (const a of A) x[chiave(a)] = 0;
    const bh = b.slice();
    for (const a of U) { const k = chiave(a); x[k] = u[k]; bh[a[0]] -= u[k]; bh[a[1]] += u[k]; }
    const bU = bh.slice(), resto = T.map((a) => a.slice()), vivi = new Set(range(1, n)), foglie = [];
    while (resto.length) {
      const grado = {};
      for (const v of vivi) grado[v] = 0;
      for (const [i, j] of resto) { grado[i]++; grado[j]++; }
      let foglia = Infinity;
      for (const v of vivi) if (grado[v] === 1 && v !== n && v < foglia) foglia = v;
      const q = resto.findIndex((a) => a[0] === foglia || a[1] === foglia), a = resto[q], k = chiave(a);
      x[k] = a[0] === foglia ? bh[foglia] : -bh[foglia];
      foglie.push({ foglia, a, flusso: x[k], bh: bh.slice() });
      const altro = a[0] === foglia ? a[1] : a[0];
      bh[altro] += bh[foglia];
      bh[foglia] = 0;
      resto.splice(q, 1);
      vivi.delete(foglia);
    }
    return { x, foglie, bU };
  }
  /** potenziali dell'albero: c_ij − π_i + π_j = 0 sugli archi di T e π_n = 0 (radice n); array 1..n */
  function potenziali(n, T, c) {
    const { pred, arco, prof } = radica(T, n), pi = new Array(n + 1).fill(0);
    const nodi = Object.keys(pred).map(Number).sort((a, b) => prof[a] - prof[b]);
    for (const v of nodi) {
      if (v === n) continue;
      const a = arco[v], k = chiave(a);
      pi[v] = v === a[1] ? pi[pred[v]] - c[k] : pi[pred[v]] + c[k];
    }
    return pi;
  }
  const costiRidotti = (A, c, pi) => Object.fromEntries(A.map((a) => [chiave(a), c[chiave(a)] - pi[a[0]] + pi[a[1]]]));
  const costo = (A, c, x) => A.reduce((s, a) => s + c[chiave(a)] * x[chiave(a)], 0);
  const ammissibile = (A, u, x) => A.every((a) => x[chiave(a)] >= 0 && (u[chiave(a)] === null || x[chiave(a)] <= u[chiave(a)]));
  /** albero fortemente ammissibile: ogni arco dell'albero verso la radice ha x < u, ogni arco che si allontana
   *  dalla radice ha x > 0 (da ogni nodo si può mandare flusso positivo alla radice) */
  function forte(n, T, x, u) {
    const { pred, arco } = radica(T, n);
    for (const vs of Object.keys(pred)) {
      const v = +vs;
      if (v === n) continue;
      const a = arco[v], k = chiave(a);
      if (a[0] === v && a[1] === pred[v]) { if (u[k] !== null && x[k] >= u[k]) return false; }
      else if (x[k] <= 0) return false;
    }
    return true;
  }
  /** apice w e ciclo fondamentale di e orientato come e (e ∈ L) o contro e (e ∈ U): [{ a, s (+1 avanti, −1
   *  indietro) }] nell'ordine in cui si incontrano percorrendolo dall'apice */
  function cicloOrientato(n, T, e, inL) {
    const { pred, arco, prof } = radica(T, n);
    const [p, q] = inL ? [e[0], e[1]] : [e[1], e[0]];
    let a = p, bq = q;
    const pa = [], pb = [];
    while (prof[a] > prof[bq]) { pa.push(a); a = pred[a]; }
    while (prof[bq] > prof[a]) { pb.push(bq); bq = pred[bq]; }
    while (a !== bq) { pa.push(a); a = pred[a]; pb.push(bq); bq = pred[bq]; }
    const C = [];
    for (const v of pa.slice().reverse()) C.push({ a: arco[v], s: arco[v][0] === pred[v] && arco[v][1] === v ? 1 : -1 });
    C.push({ a: [e[0], e[1]], s: inL ? 1 : -1 });
    for (const v of pb) C.push({ a: arco[v], s: arco[v][0] === v && arco[v][1] === pred[v] ? 1 : -1 });
    return { w: a, C };
  }
  function nodiCiclo(w, C) {
    const seq = [w];
    let v = w;
    for (const { a, s } of C) { v = s > 0 && v === a[0] ? a[1] : s < 0 && v === a[1] ? a[0] : null; seq.push(v); }
    return seq;
  }
  /** capacità residua nel verso del ciclo (null = +∞) */
  const residuo = (a, s, x, u) => (s > 0 ? (u[chiave(a)] === null ? null : u[chiave(a)] - x[chiave(a)]) : x[chiave(a)]);
  /** l'arco idoneo con |c̄| massimo (a parità il primo in ordine lessicografico), e la lista degli idonei */
  function arcoEntrante(A, Ls, Us, cb, ammessi) {
    let idonei = A.filter((a) => (Ls.has(chiave(a)) && cb[chiave(a)] < 0) || (Us.has(chiave(a)) && cb[chiave(a)] > 0));
    if (ammessi) idonei = idonei.filter((a) => ammessi.has(chiave(a)));
    if (!idonei.length) return [null, idonei];
    const mx = Math.max(...idonei.map((a) => Math.abs(cb[chiave(a)])));
    return [idonei.find((a) => Math.abs(cb[chiave(a)]) === mx), idonei];
  }
  /** Il simplesso su reti dalla struttura ammissibile (T, L, U), come simplesso_su_reti() di verifica.py: una voce
   *  per ogni struttura incontrata, con il pivot fatto da lì (nessun e nell'ultima, ottima; illimitato = true se il
   *  problema è illimitato). ammessi: Set delle chiavi degli archi che possono entrare (dopo la Fase 0). */
  function simplesso(n, A, b, c, u, T, L, U, ammessi, maxPivot = 500) {
    T = ordinaArchi(T); L = ordinaArchi(L); U = ordinaArchi(U);
    const tr = [];
    for (;;) {
      const { x, foglie, bU } = soluzioneAlbero(n, A, b, u, T, U);
      const pi = potenziali(n, T, c), cb = costiRidotti(A, c, pi);
      const it = { T: T.slice(), L: L.slice(), U: U.slice(), x, foglie, bU, pi, cb, z: costo(A, c, x), forte: forte(n, T, x, u) };
      tr.push(it);
      const Ls = new Set(L.map(chiave)), Us = new Set(U.map(chiave));
      const [e, idonei] = arcoEntrante(A, Ls, Us, cb, ammessi);
      it.idonei = idonei;
      if (!e) return tr;
      const ke = chiave(e), inL = Ls.has(ke);
      const { w, C } = cicloOrientato(n, T, e, inL);
      const res = C.map(({ a, s }) => residuo(a, s, x, u));
      Object.assign(it, { e, inL, apice: w, C, nodi: nodiCiclo(w, C), residui: res });
      if (res.every((r) => r === null)) { it.illimitato = true; return tr; }
      const theta = Math.min(...res.filter((r) => r !== null));
      const bloccanti = C.filter((_, q) => res[q] === theta).map(({ a }) => a);
      const f = bloccanti[bloccanti.length - 1], kf = chiave(f), versoF = C.find(({ a }) => uguale(a, f)).s;
      const xN = Object.assign({}, x);
      for (const { a, s } of C) xN[chiave(a)] += s * theta;
      let S = [], delta = 0;
      if (kf === ke) {
        if (inL) { L = L.filter((a) => chiave(a) !== ke); U = ordinaArchi(U.concat([e])); }
        else { L = ordinaArchi(L.concat([e])); U = U.filter((a) => chiave(a) !== ke); }
      } else {
        const lato = new Set(Object.keys(radica(T.filter((a) => chiave(a) !== kf), n).pred).map(Number));
        S = range(1, n).filter((v) => !lato.has(v));
        delta = S.includes(e[1]) ? -cb[ke] : cb[ke];
        T = ordinaArchi(T.filter((a) => chiave(a) !== kf).concat([e]));
        L = ordinaArchi(L.filter((a) => chiave(a) !== ke).concat(versoF < 0 ? [f] : []));
        U = ordinaArchi(U.filter((a) => chiave(a) !== ke).concat(versoF > 0 ? [f] : []));
      }
      Object.assign(it, { theta, bloccanti, f, fIn: versoF > 0 ? "U" : "L", S, delta, zNuovo: it.z - theta * Math.abs(cb[ke]), xNuovo: xN });
      if (tr.length > maxPivot) throw new Error("GI_NO_E: too many pivots");
    }
  }
  /** la rete ausiliaria della Fase 0: nodo r = n+1 con b_r = 0, arco (i,r) se b_i ≥ 0 e (r,i) se b_i < 0, capacità
   *  +∞, costo 1 (0 sugli archi di A) */
  function reteAusiliaria(n, A, b, u) {
    const r = n + 1, art = range(1, n).map((i) => (b[i] >= 0 ? [i, r] : [r, i]));
    const artS = new Set(art.map(chiave)), A0 = ordinaArchi(A.concat(art)), b0 = b.slice();
    b0[r] = 0;
    const c0 = {}, u0 = Object.assign({}, u);
    for (const a of A0) c0[chiave(a)] = artS.has(chiave(a)) ? 1 : 0;
    for (const a of art) u0[chiave(a)] = null;
    return { r, art, artS, A0, b0, c0, u0 };
  }
  /** Fase 0, poi il simplesso sulla rete ausiliaria con i costi c (0 sugli artificiali) e i soli archi con
   *  c̄⁰ = 0 ammessi a entrare: { tr0, tr1 (null se la rete non ha flussi ammissibili), X (la rete ausiliaria) } */
  function faseZero(n, A, b, c, u) {
    const X = reteAusiliaria(n, A, b, u);
    const tr0 = simplesso(X.r, X.A0, X.b0, X.c0, X.u0, X.art, X.A0.filter((a) => !X.artS.has(chiave(a))), []);
    const fine = tr0[tr0.length - 1];
    if (fine.z > 0) return { tr0, tr1: null, X };
    X.ammessi = new Set(X.A0.filter((a) => fine.cb[chiave(a)] === 0).map(chiave));
    X.c1 = {};
    for (const a of X.A0) X.c1[chiave(a)] = X.artS.has(chiave(a)) ? 0 : c[chiave(a)];
    const tr1 = simplesso(X.r, X.A0, X.b0, X.c1, X.u0, fine.T, fine.L, fine.U, X.ammessi);
    return { tr0, tr1, X };
  }

  /** I dati di un'istanza dell'app: archi ordinati, c, u (null = +∞), b (array 1..n) */
  function datiIstanza(I) {
    const A = ordinaArchi(I.A), c = {}, u = {};
    for (const r of I.A) { c[chiave(r)] = r[2]; u[chiave(r)] = r[3] > 0 ? r[3] : null; }
    return { n: I.n, A, c, u, b: [0].concat(I.b) };
  }
  /** la struttura iniziale data è un albero ricoprente con soluzione ammissibile? */
  function strutturaData(I, Dt) {
    if (!I.T0) return null;
    const T0 = ordinaArchi(I.T0), U0 = ordinaArchi(I.U0 || []), ks = new Set(Dt.A.map(chiave));
    if (!T0.concat(U0).every((a) => ks.has(chiave(a))) || !eAlberoRicoprente(Dt.n, T0) || U0.some((a) => Dt.u[chiave(a)] === null)) return null;
    const dentro = new Set(T0.concat(U0).map(chiave)), L0 = Dt.A.filter((a) => !dentro.has(chiave(a)));
    const { x } = soluzioneAlbero(Dt.n, Dt.A, Dt.b, Dt.u, T0, U0);
    return ammissibile(Dt.A, Dt.u, x) ? { T0, L0, U0 } : null;
  }
  /** il disegno di una rete (originale o ausiliaria): il nodo artificiale sta nel baricentro, e gli archi che gli
   *  passano vicino si piegano */
  function grafoRete(n, A, P0, aux) {
    let P = P0.map((p) => p.slice());
    const pieghe = {};
    if (aux) {
      const cx = P.reduce((s, p) => s + p[0], 0) / P.length, cy = P.reduce((s, p) => s + p[1], 0) / P.length;
      let dmin = Infinity;
      P.forEach((p, i) => P.forEach((q, j) => { if (i < j) dmin = Math.min(dmin, Math.hypot(p[0] - q[0], p[1] - q[1])); }));
      const soglia = 0.45 * dmin;           // un arco che passa così vicino al baricentro si piega
      for (const [i, j] of A) {
        if (i > n - 1 || j > n - 1) continue;
        const [ax, ay] = P[i - 1], [bx, by] = P[j - 1], dx = bx - ax, dy = by - ay;
        const t = clamp(((cx - ax) * dx + (cy - ay) * dy) / (dx * dx + dy * dy || 1), 0, 1);
        if (Math.hypot(cx - ax - t * dx, cy - ay - t * dy) < soglia) pieghe[i + "-" + j] = 30;
      }
      P = P.concat([[cx, cy]]);
    }
    // dove mettere l'etichetta di ogni arco diritto: a metà, oppure più vicino a un estremo se la metà cade su un
    // altro arco o sull'etichetta di un altro arco (come pos=0.3 nelle figure del capitolo)
    const ext = Math.max(...P.map((p) => p[0])) - Math.min(...P.map((p) => p[0])), eyt = Math.max(...P.map((p) => p[1])) - Math.min(...P.map((p) => p[1]));
    const soglia2 = 0.06 * Math.max(ext, eyt, 1), posEt = {}, presi = [];
    const dSeg = (p, a, b) => {
      const dx = b[0] - a[0], dy = b[1] - a[1], t = clamp(((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1), 0, 1);
      return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
    };
    for (const [i, j] of A) {
      if (pieghe[i + "-" + j]) continue;
      const a = P[i - 1], b = P[j - 1];
      const altri = A.filter(([h, k]) => !(h === i && k === j) && !pieghe[h + "-" + k]);
      const voto = (t) => {          // >= 1: lontano abbastanza dagli altri archi e dalle altre etichette
        const q = [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])];
        return Math.min(...altri.map(([h, k]) => dSeg(q, P[h - 1], P[k - 1]) / soglia2), ...presi.map((r) => Math.hypot(q[0] - r[0], q[1] - r[1]) / (1.4 * soglia2)), 9);
      };
      const cand = [0.5, 0.36, 0.64, 0.28, 0.72];
      const t = cand.find((t) => voto(t) >= 1) || cand.reduce((m, t) => (voto(t) > voto(m) ? t : m), 0.5);
      posEt[i + "-" + j] = t;
      presi.push([a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])]);
    }
    const G = N.grafo({ n, diretto: true, A: A.map((a) => [a[0], a[1]]), P, pieghe });
    G.posEt = posEt;
    return G;
  }

  /** Tutti i passi dell'app sull'istanza I: voce "albero" (dalla struttura iniziale data, se c'è) o "fase0".
   *  Passi: init, foglia (una per foglia), pot, poi per ogni struttura costi, entra, theta, agg (oppure ottimo /
   *  fine0 / illimitato); con la Fase 0 dopo fine0 si ricomincia da pot con i costi c. */
  function nsCalcola(I, voce) {
    const Dt = datiIstanza(I), { n, A, c, u, b } = Dt, passi = [];
    const capac = A.some((a) => u[chiave(a)] !== null);
    const dato = voce === "albero" ? strutturaData(I, Dt) : null;
    const aggiungi = (rete, tr, fase, conFoglie) => {
      const p0 = tr[0];
      let piv = 0;
      if (conFoglie) {
        passi.push({ tipo: "init", fase, rete, it: p0, k: 0 });
        p0.foglie.forEach((_, q) => passi.push({ tipo: "foglia", fase, rete, it: p0, k: 0, q }));
      }
      passi.push({ tipo: "pot", fase, rete, it: p0, k: 0 });
      tr.forEach((it, k) => {
        if (!it.e) { passi.push({ tipo: fase === 0 ? "fine0" : "ottimo", fase, rete, it, k }); return; }
        piv++;
        passi.push({ tipo: "costi", fase, rete, it, k, piv });
        passi.push({ tipo: "entra", fase, rete, it, k, piv });
        if (it.illimitato) { passi.push({ tipo: "illimitato", fase, rete, it, k, piv }); return; }
        passi.push({ tipo: "theta", fase, rete, it, k, piv });
        passi.push({ tipo: "agg", fase, rete, it, k, piv, nuovo: tr[k + 1] });
      });
    };
    if (dato) {
      const rete = { n, A, c, u, b, radice: n, art: new Set(), congelati: new Set(), G: grafoRete(n, A, I.P, false), capac };
      const tr = simplesso(n, A, b, c, u, dato.T0, dato.L0, dato.U0);
      aggiungi(rete, tr, "s", true);
      const ult = tr[tr.length - 1];
      return { passi, voce, dato: true, n, A, tr, esito: ult.illimitato ? "illimitato" : "ottimo", capac };
    }
    const F = faseZero(n, A, b, c, u), X = F.X, G = grafoRete(X.r, X.A0, I.P, true);
    const rete0 = { n: X.r, A: X.A0, c: X.c0, u: X.u0, b: X.b0, radice: X.r, art: X.artS, congelati: new Set(), G, capac, orig: n };
    aggiungi(rete0, F.tr0, 0, true);
    if (!F.tr1) return { passi, voce, dato: false, n, A, tr0: F.tr0, tr1: null, art: X.art, esito: "inammissibile", capac };
    const cong = new Set(X.A0.filter((a) => !X.ammessi.has(chiave(a))).map(chiave));
    const rete2 = Object.assign({}, rete0, { c: X.c1, congelati: cong });
    aggiungi(rete2, F.tr1, 2, false);
    const ult = F.tr1[F.tr1.length - 1];
    return { passi, voce, dato: false, n, A, tr0: F.tr0, tr1: F.tr1, art: X.art, esito: ult.illimitato ? "illimitato" : "ottimo", capac };
  }

  /** che cosa si vede al passo P: struttura, flussi (null = non ancora noto), potenziali, costi ridotti */
  function vistaNS(P) {
    const it = P.it, t = P.tipo, rete = P.rete;
    let T = it.T, L = it.L, U = it.U, x = it.x, pi = it.pi, cb = null;
    if (t === "agg") { T = P.nuovo.T; L = P.nuovo.L; U = P.nuovo.U; x = it.xNuovo; pi = P.nuovo.pi; }
    if (t === "init" || t === "foglia") {
      pi = null;
      x = {};
      for (const a of rete.A) x[chiave(a)] = 0;
      for (const a of U) x[chiave(a)] = rete.u[chiave(a)];
      for (const a of T) x[chiave(a)] = null;
      if (t === "foglia") for (let q = 0; q <= P.q; q++) x[chiave(it.foglie[q].a)] = it.foglie[q].flusso;
    }
    if (["costi", "entra", "theta", "illimitato", "ottimo", "fine0"].includes(t)) cb = it.cb;
    return { T, L, U, Ts: new Set(T.map(chiave)), Ls: new Set(L.map(chiave)), Us: new Set(U.map(chiave)), x, pi, cb };
  }
  /** i bilanci residui dopo il passo «foglia» q (prima: dopo gli archi di U) */
  function bilanciFoglia(it, q) {
    if (q < 0) return it.bU;
    const f = it.foglie[q], bh = f.bh.slice(), altro = f.a[0] === f.foglia ? f.a[1] : f.a[0];
    bh[altro] += bh[f.foglia];
    bh[f.foglia] = 0;
    return bh;
  }
  const NS_FUNZ = {
    albero: { etichetta: T("Dall'albero iniziale", "From the initial tree") },
    fase0: { etichetta: T("Fase 0, poi simplesso", "Phase 0, then simplex") },
  };
  const nsStato = (st) => N.stato(st, (I, voce) => nsCalcola(I, voce));
  const xTxt = (x, u) => (x === null ? "?" : meno(x)) + (u !== null && u !== undefined ? "/" + u : "");
  const nomeFase = (f) => (f === 0 ? T("Fase 0", "Phase 0") : f === 2 ? T("dopo la Fase 0", "after Phase 0") : "");

  /** una rete a caso: n = 5..6, costi 1..9, capacità 2..6 (o nessuna), bilanci di un flusso a caso; serve un
   *  flusso ammissibile e almeno due pivot dopo la Fase 0 */
  function nsCasuale() {
    for (let tent = 0; tent < 300; tent++) {
      const cap = Math.random() < 0.6;
      const I = N.casuale({ n: [5, 6], p: 0.42, diretto: true, valori: [[1, 9], [2, 6]] });
      if (!I) continue;
      I.A = I.A.map(([i, j, cc, uu]) => [i, j, cc, cap ? uu : 0]);
      const b = new Array(I.n).fill(0);
      for (const [i, j, , uu] of I.A) { const x = M.casuale(0, cap ? uu : 4); b[i - 1] += x; b[j - 1] -= x; }
      if (b.filter((v) => v !== 0).length < 3 || Math.max(...b.map(Math.abs)) > 9) continue;
      I.b = b;
      try {
        const R = nsCalcola(I, "fase0");
        if (R.esito !== "ottimo" || R.tr1.length < 3) continue;
      } catch (e) { continue; }
      return I;
    }
    return null;
  }
  function leggiBilanci(s, n) {
    const v = String(s || "").trim().split(/[\s,;]+/).filter(Boolean).map(Number);
    if (v.length !== n || v.some((x) => !Number.isInteger(x) || Math.abs(x) > 99)) return null;
    return v.reduce((a, x) => a + x, 0) === 0 ? v : null;
  }
  const chiediBilanci = (n, attuale) => N.chiedi(T(`Bilanci b₁ … b${n > 9 ? "ₙ" : "₁₂₃₄₅₆₇₈₉"[n - 1]} (${n} interi, separati da spazi, di somma 0; b > 0 offerta, b < 0 domanda):`,
    `Balances b₁ … b${n > 9 ? "ₙ" : "₁₂₃₄₅₆₇₈₉"[n - 1]} (${n} integers, separated by spaces, summing to 0; b > 0 supply, b < 0 demand):`), attuale);

  window.GI_RICETTE["no-network-simplex"] = {
    titolo: T("Il simplesso su reti, pivot per pivot", "The network simplex, pivot by pivot"),
    funzioni: NS_FUNZ,
    etichettaFunzioni: T("Struttura iniziale", "Initial structure"),
    parametri: [parPasso("", 0)],
    assi: false,
    opzioniBoard: M.OPZ,
    vista: [0, 400, 600, 0],
    legenda: (st) => {
      const C = M.COL(st);
      return [
        [C.blu, T("albero \\(T\\)", "tree \\(T\\)"), ""],
        [C.rosso, T("\\(U\\): a capacità", "\\(U\\): at capacity"), ""],
        [C.grigio, T("\\(L\\): flusso nullo", "\\(L\\): zero flow"), "dashed"],
        [C.viola, T("ciclo (tratteggiato: arco entrante)", "cycle (dashed: entering arc)"), ""],
        [C.a, T("archi ammissibili per l'ingresso; arco uscente", "eligible arcs; leaving arc"), ""],
        [C.b, T("sottoalbero \\(S\\)", "subtree \\(S\\)"), "punto"],
      ];
    },
    monta(board, st) {
      const D = st.dati;
      nuovaVoce(st);
      N.montaIstanze(st, NS_ES, {
        diretto: true, nv: 2, nomiValori: T("c,u (u = 0: senza capacità)", "c,u (u = 0: no capacity)"), nMax: 8, ritmo: 1000,
        casuale: nsCasuale,
        valida: (I) => {
          delete I.T0; delete I.U0;
          if (I.A.some((a) => !Number.isInteger(a[2]) || Math.abs(a[2]) > 99)) return T("I costi devono essere interi, fra −99 e 99.", "The costs must be integers between −99 and 99.");
          if (I.A.some((a) => !Number.isInteger(a[3]) || a[3] < 0 || a[3] > 99)) return T("Le capacità devono essere intere, fra 1 e 99 (0 = senza capacità).", "The capacities must be integers between 1 and 99 (0 = no capacity).");
          if (!N.connesso(I.n, I.A)) return T("La rete (senza versi) deve essere connessa.", "The network (ignoring directions) must be connected.");
          if (!I.b || I.b.length !== I.n) {
            const b = leggiBilanci(chiediBilanci(I.n, new Array(I.n).fill(0).join(" ")), I.n);
            if (!b) return T("Bilanci non validi: servono n interi di somma 0.", "Invalid balances: n integers summing to 0 are needed.");
            I.b = b;
          }
          return null;
        },
        altri: [[T("Bilanci…", "Balances…"), T("cambia i bilanci dei nodi", "change the balances of the nodes"), () => {
          const G = D.g, b = leggiBilanci(chiediBilanci(G.n, G.b.join(" ")), G.n);
          if (b === null) { window.alert(T("Bilanci non validi: servono n interi di somma 0.", "Invalid balances: n integers summing to 0 are needed.")); return; }
          const I = N.copia(G);
          delete I.T0; delete I.U0;
          D.nuova(Object.assign(I, { b, nome: undefined }));
        }]],
      });
      osservaDimensioni(board, st);
      daIndirizzo(st);
    },
    aggiorna(board, st) {
      const S = nsStato(st), D = S.D, C = M.COL(st), [W, H] = dim(board), { R, k, K, P } = S;
      N.allinea(st, NS_ES);
      M.ridisegna(board, st, [D.g.id, st.chiave(), k, M.scuro(), W, H].join("|"), (crea) => {
        pix(board);
        const d = disegno(crea, H), t = P.tipo, rete = P.rete, V = vistaNS(P), it = P.it;
        const ciclo = ["entra", "theta", "illimitato"].includes(t) ? new Set(it.C.map(({ a }) => chiave(a))) : new Set();
        const ke = it.e ? chiave(it.e) : null, kf = it.f ? chiave(it.f) : null;
        const bloc = t === "theta" ? new Set(it.bloccanti.map(chiave)) : new Set();
        const idonei = t === "costi" ? new Set(it.idonei.map(chiave)) : new Set();
        const Sset = new Set(t === "agg" ? it.S : []);
        const cambiati = t === "agg" && it.theta > 0 ? new Set(it.C.map(({ a }) => chiave(a))) : new Set();
        const conCb = V.cb !== null, cp = W < 600;          // cp: telefono, disegno compatto
        // registro dei pivot (sotto il grafo): uno per riga, gli ultimi
        const righe = [];
        for (const Q of R.passi.slice(0, k + 1)) {
          const pre = Q.fase === 0 && !cp ? T("Fase 0 · ", "Phase 0 · ") : "";
          const zn = Q.fase === 0 ? "z₀" : "z";
          if (Q.tipo === "agg") righe.push([pre + T(`pivot ${Q.piv}: e = ${arcoTxt(Q.it.e)}, θ = ${Q.it.theta}, f = ${arcoTxt(Q.it.f)} → ${Q.it.fIn}, ${zn}: ${meno(Q.it.z)} → ${meno(Q.it.zNuovo)}`,
            `pivot ${Q.piv}: e = ${arcoTxt(Q.it.e)}, θ = ${Q.it.theta}, f = ${arcoTxt(Q.it.f)} → ${Q.it.fIn}, ${zn}: ${meno(Q.it.z)} → ${meno(Q.it.zNuovo)}`) + (Q.it.theta === 0 ? T(" (degenere)", " (degenerate)") : ""), Q === P ? C.a : C.testo]);
          if (Q.tipo === "fine0") righe.push([Q.it.z > 0 ? T(`fine della Fase 0: z₀ = ${Q.it.z} > 0, nessun flusso ammissibile`, `end of Phase 0: z₀ = ${Q.it.z} > 0, no feasible flow`)
            : T("fine della Fase 0: z₀ = 0; ora i costi c", "end of Phase 0: z₀ = 0; now the costs c"), Q === P ? C.a : C.testo]);
          if (Q.tipo === "ottimo") righe.push([T(`ottimo: z = ${meno(Q.it.z)}`, `optimal: z = ${meno(Q.it.z)}`), C.blu]);
          if (Q.tipo === "illimitato") righe.push([T("θ = +∞: problema illimitato", "θ = +∞: unbounded problem"), C.rosso]);
        }
        const nr = H < 360 ? 1 : cp || H < 480 ? 2 : 5, vis = righe.slice(-nr), lh = H < 480 ? 18 : 20, logH = 10 + lh * Math.max(1, vis.length), fondo = 24;
        const hG = H - logH - fondo;
        N.disegnaGrafo(d, rete.G, { x: 8, y: 6, w: W - 16, h: hG - 6 }, {
          r: cp ? 11 : undefined, fs: cp ? 10 : undefined, margine: !cp && hG < 360 ? 22 : undefined,   // board bassa: margini stretti in verticale
          arco: (a) => {
            const kk = a.i + "-" + a.j, u = rete.u[kk], inT = V.Ts.has(kk), inU = V.Us.has(kk), cong = rete.congelati.has(kk);
            let s = inT ? { colore: C.blu, spessore: 3.4, opacita: 1 } : inU ? { colore: C.rosso, spessore: 3, opacita: 1 }
              : { colore: C.grigio, spessore: 1.6, opacita: cong ? 0.3 : 0.75, dash: 3 };
            s.posizione = rete.G.posEt[kk];
            if (inT || inU) s.etichetta = xTxt(V.x[kk], u);
            // i costi ridotti fuori dall'albero (non quelli nulli di L né quelli degli archi congelati: sono nella tabella)
            if (conCb && !inT) s = Object.assign(s, { etichetta: cp || cong || (!inU && V.cb[kk] === 0) ? null : "c̄=" + meno(V.cb[kk]), colEt: C.muted });
            if (idonei.has(kk)) s = Object.assign(s, { colore: C.a, spessore: 3.4, opacita: 1, colEt: C.a, grassetto: true });
            if (ciclo.has(kk)) s = Object.assign(s, { colore: C.viola, spessore: 4.2, opacita: 1, dash: kk === ke ? 3 : 0, etichetta: xTxt(V.x[kk], u), colEt: C.viola, grassetto: true });
            if (bloc.has(kk)) s = Object.assign(s, { colEt: C.a, grassetto: true });
            if (t === "theta" && kk === kf) s = Object.assign(s, { colore: C.a, spessore: 4.8 });
            if (t === "foglia" && kk === chiave(it.foglie[P.q].a)) s = Object.assign(s, { colore: C.a, spessore: 4.4, colEt: C.a, grassetto: true });
            if (cambiati.has(kk) && (inT || inU)) s = Object.assign(s, { colEt: C.a, grassetto: true });
            if (t === "agg" && kk === kf && !inT) s = Object.assign(s, inU ? { colEt: C.a, grassetto: true } : { colore: C.a, opacita: 1, spessore: 2.4, colEt: C.a, etichetta: T("uscito", "left"), grassetto: true });
            return s;
          },
          nodo: (i) => {
            let s = {};
            if (i === rete.radice) s = { bordo: rete.art.size ? C.rosso : C.testo, spessore: 3.6 };
            else if (rete.art.size && i === rete.n) s = { bordo: C.rosso, spessore: 2.6 };
            if (t === "foglia") {
              const fatte = it.foglie.slice(0, P.q).map((f) => f.foglia);
              if (fatte.includes(i)) s = Object.assign({}, s, { fondo: C.grigio, opacita: 0.35 });
              if (it.foglie[P.q].foglia === i) s = Object.assign({}, s, { fondo: C.a, opacita: 0.3, bordo: C.a, spessore: 3.6 });
            }
            if (["entra", "theta", "illimitato"].includes(t) && i === it.apice) s = Object.assign({}, s, { fondo: C.viola, opacita: 0.3, bordo: C.viola, spessore: 3.6 });
            if (Sset.has(i)) s = Object.assign({}, s, { fondo: C.b, opacita: 0.3, bordo: C.b, spessore: 3.2 });
            return s;
          },
          fuori: (i) => {
            if (t === "init") return { testo: "b=" + meno(rete.b[i]), colore: C.muted };
            if (t === "foglia") {
              const bh = bilanciFoglia(it, P.q), fatte = it.foglie.slice(0, P.q + 1).map((f) => f.foglia);
              if (fatte.includes(i) && i !== it.foglie[P.q].foglia) return null;
              const f = it.foglie[P.q], vicino = f.a[0] === f.foglia ? f.a[1] : f.a[0];
              return { testo: "b̂=" + meno(i === f.foglia ? f.bh[i] : bh[i]), colore: i === vicino || i === f.foglia ? C.a : C.muted };
            }
            return { testo: "π=" + meno(V.pi[i]), colore: Sset.has(i) ? C.a : C.blu };
          },
        }, C);
        // in basso: il registro dei pivot
        d.line(10, hG + 2, W - 10, hG + 2, { strokeColor: C.line, strokeWidth: 1.2 });
        if (!vis.length) d.text(14, hG + 10 + lh / 2, R.dato ? T("nessun pivot ancora", "no pivot yet") : T("nessun pivot ancora · Fase 0 sulla rete ausiliaria", "no pivot yet · Phase 0 on the auxiliary network"), { anchorX: "left", fontSize: 13, strokeColor: C.muted, cssStyle: "font-style:italic" });
        vis.forEach(([s, col], z) => d.text(cp ? 8 : 14, hG + 10 + lh * (z + 0.5), cp ? s.replace(/ \((degenere|degenerate)\)/, "").replace(/ = /g, "=") : s, { anchorX: "left", fontSize: cp ? 11 : 13, strokeColor: col, cssStyle: "font-weight:" + (col === C.testo ? 500 : 700) }));
        const etArchi = conCb ? T("sugli archi di T, U: x", "on the arcs of T, U: x") : T("sugli archi: x", "on the arcs: x");
        let pie = etArchi + (rete.capac ? T("ᵢⱼ/uᵢⱼ", "ᵢⱼ/uᵢⱼ") : "ᵢⱼ") + (conCb ? T(", sugli altri c̄ᵢⱼ", ", on the others c̄ᵢⱼ") : "") + T(` · radice ${rete.radice} (bordo spesso)`, ` · root ${rete.radice} (thick border)`);
        if (rete.congelati.size) pie += T(" · chiari: fissati", " · faint: frozen");
        if (!cp) d.text(14, H - 10, pie, { anchorX: "left", fontSize: 12, strokeColor: C.muted, cssStyle: "font-style:italic" });
        d.text(W - 14, H - 10, (P.fase === "s" || cp ? "" : nomeFase(P.fase) + " · ") + T(`passo ${k} di ${K}`, `step ${k} of ${K}`), { anchorX: "right", fontSize: 12.5, strokeColor: C.muted });
      });
    },
    formula(p, st) {
      const S = nsStato(st), { P } = S, t = P.tipo, it = P.it, rete = P.rete, rad = rete.radice;
      const vet = (v) => `(${range(1, rete.n).map((i) => v[i]).join(",")})`;
      if (window.innerWidth < 600) {           // telefono: la riga corta (il resto è nel riquadro)
        if (t === "init") return `\\hat{b} = ${vet(it.bU)}`;
        if (t === "pot") return `\\pi = ${vet(it.pi)},\\ z = ${it.z}`;
        if (t === "costi") return `e = ${arcoTex(it.e)},\\ \\bar{c}_e = ${it.cb[chiave(it.e)]}`;
        if (t === "entra") return `w = ${it.apice},\\ C = ${it.nodi.join(",")}`;
        if (t === "theta") return `\\theta = ${it.theta},\\ f = ${arcoTex(it.f)} \\to ${it.fIn}`;
        if (t === "agg") return `z = ${it.zNuovo}` + (uguale(it.f, it.e) ? "" : `,\\ \\delta = ${it.delta}`);
      }
      if (t === "init") return `T = ${insiemeTex(it.T)},\\quad U = ${insiemeTex(it.U)},\\quad \\hat{b} = ${vet(it.bU)}`;
      if (t === "foglia") {
        const f = it.foglie[P.q], a = f.a, alt = a[0] === f.foglia ? a[1] : a[0], seg = a[0] === f.foglia ? "" : "-";
        return `\\ell = ${f.foglia}:\\ x_{${a[0]}${a[1]}} = ${seg}\\hat{b}_{${f.foglia}} = ${f.flusso},\\quad \\hat{b}_{${alt}} = ${f.bh[alt]} ${f.bh[f.foglia] < 0 ? "-" : "+"} ${Math.abs(f.bh[f.foglia])} = ${f.bh[alt] + f.bh[f.foglia]}`;
      }
      if (t === "pot") return `\\pi_{${rad}} = 0,\\ \\ \\pi_i - \\pi_j = c_{ij} \\ \\ \\forall (i,j) \\in T:\\quad \\pi = ${vet(it.pi)},\\ \\ z = ${it.z}`;
      if (t === "costi") return `\\bar{c}_{ij} = c_{ij} - \\pi_i + \\pi_j:\\quad ` + it.idonei.map((a) => `\\bar{c}_{${a[0]}${a[1]}} = ${it.cb[chiave(a)]}`).join(",\\ ") + `\\ \\Rightarrow\\ e = ${arcoTex(it.e)}`;
      if (t === "entra") return `e = ${arcoTex(it.e)} \\in ${it.inL ? "L" : "U"},\\ \\ w = ${it.apice},\\ \\ C = ${it.nodi.join(",")}`;
      if (t === "illimitato") return `\\theta = \\min\\{${it.residui.map(() => "+\\infty").join(",")}\\} = +\\infty`;
      if (t === "theta") return `\\theta = \\min\\{${it.residui.map((r) => (r === null ? "+\\infty" : r)).join(",")}\\} = ${it.theta},\\ \\ f = ${arcoTex(it.f)} \\to ${it.fIn}`;
      if (t === "agg") {
        const zz = `z = ${it.z} - ${it.theta} \\cdot ${Math.abs(it.cb[chiave(it.e)])} = ${it.zNuovo}`;
        return uguale(it.f, it.e) ? zz + `,\\ \\ T' = T` : zz + `,\\ \\ S = \\{${it.S.join(",")}\\},\\ \\ \\pi_i := \\pi_i ${it.delta < 0 ? "-" : "+"} ${Math.abs(it.delta)} \\ (i \\in S)`;
      }
      if (t === "fine0") return it.z > 0 ? `z_0 = ${it.z} > 0:\\ \\text{${T("nessun flusso ammissibile", "no feasible flow")}}` : `z_0 = 0`;
      return `\\bar{c}_{ij} \\ge 0 \\ \\forall (i,j) \\in L,\\ \\ \\bar{c}_{ij} \\le 0 \\ \\forall (i,j) \\in U:\\ \\ z = ${it.z}`;
    },
    letture(p, st) {
      const S = nsStato(st), { R, P } = S, C = M.COL(st), t = P.tipo, it = P.it, rete = P.rete, V = vistaNS(P), rad = rete.radice;
      const tin = M.tinta, inS = (a) => (V.Us.has(chiave(a)) ? "U" : V.Ts.has(chiave(a)) ? "T" : "L");
      const elenco = (L) => L.map((a) => `\\(${arcoTex(a)}\\)`).join(", ");
      let nota = "";
      if (t === "init") {
        if (P.fase === 0) {
          nota = (R.voce === "albero" ? T("Questa istanza non ha un albero iniziale dato: si parte dalla Fase 0. ", "This instance has no given initial tree: we start with Phase 0. ") : "")
            + T(`Fase 0: alla rete si aggiungono il ${tin(C.rosso, "nodo artificiale " + rad)}, con \\(b_{${rad}} = 0\\), e un arco artificiale per ogni nodo, \\((i,${rad})\\) se \\(b_i \\ge 0\\) e \\((${rad},i)\\) se \\(b_i < 0\\), con capacità \\(+\\infty\\) e costo 1 (gli archi della rete costano 0). L'albero iniziale è la stella degli archi artificiali, con radice ${rad}; tutti gli altri archi sono in \\(L\\).`,
              `Phase 0: the network gets the ${tin(C.rosso, "artificial node " + rad)}, with \\(b_{${rad}} = 0\\), and one artificial arc for every node, \\((i,${rad})\\) if \\(b_i \\ge 0\\) and \\((${rad},i)\\) if \\(b_i < 0\\), with capacity \\(+\\infty\\) and cost 1 (the arcs of the network cost 0). The initial tree is the star of the artificial arcs, with root ${rad}; all the other arcs are in \\(L\\).`);
        } else {
          nota = T(`La struttura iniziale: l'albero ${tin(C.blu, "\\(T\\)")} (la base), gli archi di ${tin(C.rosso, "\\(U\\)")} fissati alla capacità e quelli di \\(L\\) a zero. La radice è il nodo ${rad}. I flussi di \\(U\\) passano nei ${tin(C.a, "bilanci residui")} \\(\\hat{b}\\); poi i flussi dell'albero si calcolano dalle foglie.`,
            `The initial structure: the tree ${tin(C.blu, "\\(T\\)")} (the basis), the arcs of ${tin(C.rosso, "\\(U\\)")} fixed at capacity and those of \\(L\\) at zero. The root is node ${rad}. The flows of \\(U\\) go into the ${tin(C.a, "residual balances")} \\(\\hat{b}\\); then the flows of the tree are computed from the leaves.`);
        }
      } else if (t === "foglia") {
        const f = it.foglie[P.q], alt = f.a[0] === f.foglia ? f.a[1] : f.a[0];
        nota = T(`La foglia di indice più piccolo diversa dalla radice è ${tin(C.a, String(f.foglia))}: il suo arco \\(${arcoTex(f.a)}\\) è l'unica incognita del suo vincolo, quindi \\(x_{${f.a[0]}${f.a[1]}} = ${f.flusso}\\). Il bilancio residuo passa al vicino ${alt}; poi la foglia si toglie.`,
          `The leaf of smallest index other than the root is ${tin(C.a, String(f.foglia))}: its arc \\(${arcoTex(f.a)}\\) is the only unknown of its constraint, hence \\(x_{${f.a[0]}${f.a[1]}} = ${f.flusso}\\). The residual balance goes to the neighbour ${alt}; then the leaf is removed.`);
        if (P.q === it.foglie.length - 1) nota += T(` Resta solo la radice: la soluzione dell'albero è completa, ${it.T.some((a) => it.x[chiave(a)] === 0 || it.x[chiave(a)] === rete.u[chiave(a)]) ? "degenere (un arco dell'albero è a un limite)" : "non degenere"}.`,
          ` Only the root is left: the tree solution is complete, ${it.T.some((a) => it.x[chiave(a)] === 0 || it.x[chiave(a)] === rete.u[chiave(a)]) ? "degenerate (a tree arc is at a bound)" : "nondegenerate"}.`);
      } else if (t === "pot") {
        nota = P.fase === 2 ? T(`Ora i costi sono \\(c_{ij}\\) sugli archi della rete e 0 su quelli artificiali; l'albero e il flusso sono quelli della fine della Fase 0, i potenziali si ricalcolano. Possono entrare solo gli archi con \\(\\bar{c}^0_{ij} = 0\\); gli altri sono ${tin(C.grigio, "fissati")}.`,
          `Now the costs are \\(c_{ij}\\) on the arcs of the network and 0 on the artificial ones; the tree and the flow are those at the end of Phase 0, the potentials are computed again. Only the arcs with \\(\\bar{c}^0_{ij} = 0\\) may enter; the others are ${tin(C.grigio, "frozen")}.`) + " " : "";
        nota += T(`Potenziali dalla radice: \\(\\pi_{${rad}} = 0\\) e \\(\\bar{c}_{ij} = c_{ij} - \\pi_i + \\pi_j = 0\\) sugli archi dell'albero, quindi \\(\\pi_i\\) è il costo del cammino dell'albero da \\(i\\) alla radice. Costo: \\(z = ${it.z}\\); la struttura è ${it.forte ? tin(C.blu, "fortemente ammissibile") : tin(C.rosso, "non fortemente ammissibile")}.`,
          `Potentials from the root: \\(\\pi_{${rad}} = 0\\) and \\(\\bar{c}_{ij} = c_{ij} - \\pi_i + \\pi_j = 0\\) on the tree arcs, so \\(\\pi_i\\) is the cost of the tree path from \\(i\\) to the root. Cost: \\(z = ${it.z}\\); the structure is ${it.forte ? tin(C.blu, "strongly feasible") : tin(C.rosso, "not strongly feasible")}.`);
      } else if (t === "costi") {
        nota = T(`Sono ${tin(C.a, "ammissibili per l'ingresso")} gli archi di \\(L\\) con \\(\\bar{c}_{ij} < 0\\) e quelli di \\(U\\) con \\(\\bar{c}_{ij} > 0\\): ${elenco(it.idonei)}. Entra quello con \\(|\\bar{c}_{ij}|\\) massimo (a parità il primo in ordine lessicografico): \\(e = ${arcoTex(it.e)}\\), con \\(\\bar{c} = ${it.cb[chiave(it.e)]}\\).`,
          `The ${tin(C.a, "eligible")} arcs are those of \\(L\\) with \\(\\bar{c}_{ij} < 0\\) and those of \\(U\\) with \\(\\bar{c}_{ij} > 0\\): ${elenco(it.idonei)}. The one with the largest \\(|\\bar{c}_{ij}|\\) enters (ties: the first in lexicographic order): \\(e = ${arcoTex(it.e)}\\), with \\(\\bar{c} = ${it.cb[chiave(it.e)]}\\).`);
        if (rete.congelati.size) {
          const cg = rete.A.filter((a) => rete.congelati.has(chiave(a)) && ((V.Ls.has(chiave(a)) && it.cb[chiave(a)] < 0) || (V.Us.has(chiave(a)) && it.cb[chiave(a)] > 0)));
          if (cg.length) nota += T(` Gli archi fissati ${elenco(cg)} non possono entrare.`, ` The frozen arcs ${elenco(cg)} may not enter.`);
        }
      } else if (t === "entra" || t === "illimitato") {
        const [k0, l0] = it.e;
        nota = it.inL ? T(`\\(e = ${arcoTex(it.e)} \\in L\\): il suo flusso deve crescere, e il ${tin(C.viola, "ciclo")} lo percorre nel suo verso.`, `\\(e = ${arcoTex(it.e)} \\in L\\): its flow must increase, and the ${tin(C.viola, "cycle")} follows its direction.`)
          : T(`\\(e = ${arcoTex(it.e)} \\in U\\): il suo flusso deve diminuire, e il ${tin(C.viola, "ciclo")} lo percorre al contrario.`, `\\(e = ${arcoTex(it.e)} \\in U\\): its flow must decrease, and the ${tin(C.viola, "cycle")} goes against it.`);
        nota += T(` L'${tin(C.viola, "apice")} \\(w = ${it.apice}\\) è il primo nodo comune ai cammini dell'albero da ${k0} e da ${l0} alla radice; da lì \\(C = ${it.nodi.join(",")}\\).`,
          ` The ${tin(C.viola, "apex")} \\(w = ${it.apice}\\) is the first node shared by the tree paths from ${k0} and from ${l0} to the root; from there \\(C = ${it.nodi.join(",")}\\).`);
        if (t === "illimitato") nota += T(` Nessun arco del ciclo blocca: \\(\\theta = +\\infty\\). \\(C\\) è un ciclo orientato di archi senza capacità, di costo \\(-|\\bar{c}_e| < 0\\): il problema è ${tin(C.rosso, "illimitato")}. STOP.`,
          ` No arc of the cycle blocks: \\(\\theta = +\\infty\\). \\(C\\) is a directed cycle of arcs without capacity, with cost \\(-|\\bar{c}_e| < 0\\): the problem is ${tin(C.rosso, "unbounded")}. STOP.`);
      } else if (t === "theta") {
        nota = T(`Capacità residua lungo \\(C\\): \\(u_{ij} - x_{ij}\\) sugli archi in avanti, \\(x_{ij}\\) su quelli all'indietro. \\(\\theta = ${it.theta}\\)${it.theta === 0 ? " (pivot " + tin(C.rosso, "degenere") + ")" : ""}; ${it.bloccanti.length > 1 ? "archi bloccanti " + elenco(it.bloccanti) + ": esce l'ultimo incontrato dall'apice," : "l'unico arco bloccante"} ${tin(C.a, `\\(f = ${arcoTex(it.f)}\\)`)}, che è ${it.fIn === "U" ? "in avanti e va in \\(U\\)" : "all'indietro e va in \\(L\\)"}.`,
          `Residual capacity along \\(C\\): \\(u_{ij} - x_{ij}\\) on the forward arcs, \\(x_{ij}\\) on the backward ones. \\(\\theta = ${it.theta}\\)${it.theta === 0 ? " (" + tin(C.rosso, "degenerate") + " pivot)" : ""}; ${it.bloccanti.length > 1 ? "blocking arcs " + elenco(it.bloccanti) + ": the last one met from the apex leaves," : "the only blocking arc"} ${tin(C.a, `\\(f = ${arcoTex(it.f)}\\)`)}, which is ${it.fIn === "U" ? "forward and goes to \\(U\\)" : "backward and goes to \\(L\\)"}.`);
        if (uguale(it.f, it.e)) nota += T(" È l'arco entrante stesso: l'albero non cambia.", " It is the entering arc itself: the tree does not change.");
        if (it.bloccanti.length > 1) nota += T(" Con l'ultimo arco bloccante l'albero resta fortemente ammissibile: niente cicli.", " With the last blocking arc the tree stays strongly feasible: no cycling.");
      } else if (t === "agg") {
        nota = T(`Si mandano \\(\\theta = ${it.theta}\\) unità lungo \\(C\\) (\\(+\\theta\\) in avanti, \\(-\\theta\\) all'indietro): il costo scende di \\(\\theta|\\bar{c}_e|\\) e diventa \\(${it.zNuovo}\\).`,
          `Send \\(\\theta = ${it.theta}\\) units along \\(C\\) (\\(+\\theta\\) forward, \\(-\\theta\\) backward): the cost decreases by \\(\\theta|\\bar{c}_e|\\) and becomes \\(${it.zNuovo}\\).`);
        if (uguale(it.f, it.e)) nota += T(` \\(e = ${arcoTex(it.e)}\\) passa in \\(${it.fIn}\\); l'albero e i potenziali non cambiano.`, ` \\(e = ${arcoTex(it.e)}\\) moves to \\(${it.fIn}\\); the tree and the potentials do not change.`);
        else {
          const lIn = it.S.includes(it.e[1]);
          nota += T(` Nuovo albero \\(T \\cup \\{${arcoTex(it.e)}\\} \\setminus \\{${arcoTex(it.f)}\\}\\). Togliendo \\(f\\) si stacca il ${tin(C.b, "sottoalbero")} \\(S = \\{${it.S.join(",")}\\}\\), che contiene \\(${lIn ? "l = " + it.e[1] : "k = " + it.e[0]}\\): i suoi potenziali cambiano di \\(${lIn ? "-\\bar{c}_e" : "\\bar{c}_e"} = ${it.delta}\\), gli altri restano.`,
            ` New tree \\(T \\cup \\{${arcoTex(it.e)}\\} \\setminus \\{${arcoTex(it.f)}\\}\\). Removing \\(f\\) cuts off the ${tin(C.b, "subtree")} \\(S = \\{${it.S.join(",")}\\}\\), which contains \\(${lIn ? "l = " + it.e[1] : "k = " + it.e[0]}\\): its potentials change by \\(${lIn ? "-\\bar{c}_e" : "\\bar{c}_e"} = ${it.delta}\\), the others stay.`);
        }
        if (P.nuovo) nota += P.nuovo.forte ? T(" La nuova struttura è fortemente ammissibile.", " The new structure is strongly feasible.") : T(" La nuova struttura non è fortemente ammissibile.", " The new structure is not strongly feasible.");
      } else if (t === "fine0") {
        const cg = rete.A.filter((a) => it.cb[chiave(a)] !== 0);
        nota = it.z > 0 ? T(`La Fase 0 finisce con \\(z_0 = ${it.z} > 0\\): resta flusso sugli archi artificiali, e la rete ${tin(C.rosso, "non ha flussi ammissibili")}. STOP.`, `Phase 0 ends with \\(z_0 = ${it.z} > 0\\): some flow is left on the artificial arcs, and the network ${tin(C.rosso, "has no feasible flow")}. STOP.`)
          : T(`La Fase 0 finisce con \\(z_0 = 0\\): nessun flusso sugli archi artificiali, quindi la rete ha un flusso ammissibile. ${cg.length ? "Gli archi con \\(\\bar{c}^0_{ij} \\neq 0\\), " + elenco(cg) + ", sono " + tin(C.grigio, "fissati") + ": d'ora in poi non possono entrare." : "Tutti gli archi hanno \\(\\bar{c}^0_{ij} = 0\\): nessuno è fissato."}`,
            `Phase 0 ends with \\(z_0 = 0\\): no flow on the artificial arcs, so the network has a feasible flow. ${cg.length ? "The arcs with \\(\\bar{c}^0_{ij} \\neq 0\\), " + elenco(cg) + ", are " + tin(C.grigio, "frozen") + ": from now on they may not enter." : "Every arc has \\(\\bar{c}^0_{ij} = 0\\): none is frozen."}`);
      } else {
        const stretti = rete.A.filter((a) => !V.Ts.has(chiave(a))).every((a) => (V.Ls.has(chiave(a)) ? it.cb[chiave(a)] > 0 : it.cb[chiave(a)] < 0));
        nota = T(`Nessun arco ammissibile per l'ingresso${rete.fissati.size ? " (fra quelli non fissati)" : ""}: ${tin(C.blu, "STOP")}, la soluzione dell'albero è ottima, \\(z = ${it.z}\\).${stretti && !rete.fissati.size ? " Le disuguaglianze sono strette: l'ottimo è unico." : ""}`,
          `No eligible arc${rete.congelati.size ? " (among those not frozen)" : ""}: ${tin(C.blu, "STOP")}, the tree solution is optimal, \\(z = ${it.z}\\).${stretti && !rete.congelati.size ? " The inequalities are strict: the optimum is unique." : ""}`);
        if (P.fase !== 2) nota += T(" I potenziali sono il certificato: \\(\\bar{c}_{ij} \\ge 0\\), cioè \\(\\pi_i - \\pi_j \\le c_{ij}\\), sugli archi di \\(L\\) e \\(\\bar{c}_{ij} \\le 0\\) su quelli di \\(U\\).",
          " The potentials are the certificate: \\(\\bar{c}_{ij} \\ge 0\\), that is \\(\\pi_i - \\pi_j \\le c_{ij}\\), on the arcs of \\(L\\) and \\(\\bar{c}_{ij} \\le 0\\) on those of \\(U\\).");
        else {
          const n0 = rete.orig, sp = range(1, n0).map((i) => it.pi[i] - it.pi[n0]);
          const orig = rete.A.filter((a) => !rete.art.has(chiave(a)) && !V.Ts.has(chiave(a)));
          const cert = orig.every((a) => (V.Ls.has(chiave(a)) ? it.cb[chiave(a)] >= 0 : it.cb[chiave(a)] <= 0));
          nota += T(` Ristretto agli archi della rete è un flusso ottimo. Spostati in modo che \\(\\pi_{${n0}} = 0\\), i potenziali dei nodi \\(1,\\dots,${n0}\\) sono \\((${sp.join(",")})\\)` + (cert ? ": sugli archi della rete sono il certificato di ottimalità." : "; gli archi congelati della rete tengono il loro valore, come nella dimostrazione del capitolo."),
            ` Restricted to the arcs of the network it is an optimal flow. Shifted so that \\(\\pi_{${n0}} = 0\\), the potentials of the nodes \\(1,\\dots,${n0}\\) are \\((${sp.join(",")})\\)` + (cert ? ": on the arcs of the network they are the optimality certificate." : "; the frozen arcs of the network keep their value, as in the proof of the chapter."));
        }
      }
      // la tabella degli archi (una riga per arco, come le tabelle delle iterazioni del capitolo)
      const conU = rete.A.some((a) => rete.u[chiave(a)] !== null);
      const ke = it.e ? chiave(it.e) : null, kf = it.f ? chiave(it.f) : null;
      const ciclo = ["entra", "theta", "illimitato"].includes(t) ? new Map(it.C.map(({ a, s }, q) => [chiave(a), q])) : new Map();
      let tab = `<table class="gi-tabella"><tr><th style="text-align:left">${T("arco", "arc")}</th><th>\\(c\\)</th>${conU ? "<th>\\(u\\)</th>" : ""}<th>${T("stato", "state")}</th><th>\\(x\\)</th><th>\\(\\bar{c}\\)</th></tr>`;
      for (const a of rete.A) {
        const kk = chiave(a), st0 = inS(a), uu = rete.u[kk];
        let sty = "";
        if (ciclo.has(kk)) sty = bgSel(C.viola, 16);
        if (kk === ke && ["costi", "entra", "theta", "illimitato"].includes(t)) sty = bgSel(C.viola, 30) + "font-weight:700;";
        if (kk === kf && (t === "theta" || t === "agg")) sty = bgSel(C.a, 28) + "font-weight:700;";
        if (t === "foglia" && kk === chiave(it.foglie[P.q].a)) sty = bgSel(C.a, 28) + "font-weight:700;";
        const colS = st0 === "T" ? C.blu : st0 === "U" ? C.rosso : C.muted;
        const cg = rete.congelati.has(kk) ? "*" : "";
        const cbv = V.cb ? V.cb[kk] : null;
        const cbSty = V.cb && st0 !== "T" && ((st0 === "L" && cbv < 0) || (st0 === "U" && cbv > 0)) ? `color:${cg ? C.muted : C.a};font-weight:700` : "";
        tab += `<tr style="${sty}"><td style="text-align:left">\\(${arcoTex(a)}\\)${rete.art.has(kk) ? "<sup>a</sup>" : ""}</td><td>${rete.c[kk]}</td>${conU ? `<td>${uu === null ? "∞" : uu}</td>` : ""}`
          + `<td style="color:${colS};font-weight:700">${st0}${cg}</td><td>${V.x[kk] === null ? "?" : V.x[kk]}</td><td style="${cbSty}">${cbv === null ? "" : cbv}</td></tr>`;
      }
      tab += "</table>";
      const nota2 = [];
      if (rete.art.size) nota2.push(T("<sup>a</sup> arco artificiale", "<sup>a</sup> artificial arc"));
      if (rete.congelati.size) nota2.push(T("* fissato", "* frozen"));
      if (nota2.length) tab += `<p style="margin:.2em 0;font-size:.85em;color:${C.muted}">${nota2.join(" · ")}</p>`;
      // la tabella del ciclo, come nel capitolo: archi dall'apice, verso, capacità residua
      let cic = "";
      if (["entra", "theta", "illimitato"].includes(t)) {
        const sty = (q) => (t === "theta" && it.bloccanti.some((a) => uguale(a, it.C[q].a)) ? `color:${C.a};font-weight:700` : "");
        cic = `<table class="gi-tabella" style="margin:.3em 0 .6em"><tr><th style="text-align:left">${T("\\(C\\) dall'apice", "\\(C\\) from the apex")}</th><th>${T("verso", "direction")}</th>${t === "entra" ? "" : `<th>${T("residua", "residual")}</th>`}</tr>`
          + it.C.map(({ a, s }, q) => `<tr style="${sty(q)}"><td style="text-align:left">\\(${arcoTex(a)}\\)</td><td>${s > 0 ? "+" : "−"}</td>${t === "entra" ? "" : `<td>${it.residui[q] === null ? "∞" : it.residui[q]}</td>`}</tr>`).join("") + "</table>";
      }
      return `<p style="margin:0 0 .4em">${nota}</p>` + cic + tab;
    },
    domanda: T("Con capacità, dall'albero di x̄ il primo pivot è degenere: il costo resta 63, ma quale potenziale scende? Scegli «Fase 0»: nel pivot 6 ci sono tre archi bloccanti; perché esce (7,6) e non (1,7)? Togli le capacità (prima istanza): quanto vale l'ottimo, e perché x₅₆ = 4 non va bene con u₅₆ = 2?",
      "With capacities, from the tree of x̄ the first pivot is degenerate: the cost stays 63, but which potential decreases? Choose «Phase 0»: pivot 6 has three blocking arcs; why does (7,6) leave and not (1,7)? Without capacities (first instance): what is the optimum, and why is x₅₆ = 4 not allowed with u₅₆ = 2?"),
  };

  // =================================================================
  // 2. IL METODO DEL CAMMINO CRITICO (CPM)
  // =================================================================
  // il caso di studio della nota originale (attività A…N = 1…14) e il secondo esempio del capitolo 9;
  // posizioni delle figure del capitolo (il caso di studio ruotato: START a sinistra, FINISH a destra)
  const CASO_NOMI = [null, ["Scavo", "Excavate"], ["Fondazioni", "Foundation"], ["Muri grezzi", "Rough wall"], ["Tetto", "Roof"],
    ["Impianto idraulico esterno", "Exterior plumbing"], ["Impianto idraulico interno", "Interior plumbing"], ["Rivestimento esterno", "Exterior siding"],
    ["Tinteggiatura esterna", "Exterior painting"], ["Impianto elettrico", "Electrical work"], ["Pannelli delle pareti", "Wallboard"],
    ["Pavimenti", "Flooring"], ["Tinteggiatura interna", "Interior painting"], ["Finiture esterne", "Exterior fixtures"], ["Finiture interne", "Interior fixtures"]];
  const POS_CASO = { 0: [3.2, 0.0], 1: [3.2, -1.3], 2: [3.2, -2.6], 3: [3.2, -3.9], 4: [0.0, -5.8], 5: [3.2, -5.8], 9: [7.4, -5.8], 7: [0.0, -7.6],
    6: [4.7, -7.6], 8: [1.4, -9.4], 10: [7.4, -9.1], 11: [6.2, -10.7], 12: [9.4, -10.7], 13: [2.4, -11.3], 14: [7.4, -12.5], 15: [3.2, -13.9] };
  const POS_DUE = { 0: [0.0, 0.0], 1: [2.0, 1.0], 3: [2.0, -1.6], 5: [4.0, 2.2], 4: [4.0, 0.4], 2: [4.0, -2.6], 7: [6.0, 1.3], 6: [6.0, -0.6], 8: [8.0, 0.8], 9: [10.0, 0.0] };
  // il disegno «orizzontale» di riferimento (START a sinistra): (x, y) del TikZ verticale -> (−y, −x)
  const orizzontale = (pos, n) => range(0, n + 1).map((v) => [-pos[v][1], -pos[v][0]]);
  const daTikz = (pos, n) => range(0, n + 1).map((v) => pos[v].slice());
  const CPM_ES = [
    { nome: T("caso di studio, 14 attività (es. 9.1–9.6)", "case study, 14 activities (Ex. 9.1–9.6)"), n: 14,
      d: [0, 2, 4, 10, 6, 4, 5, 7, 9, 7, 8, 4, 5, 2, 6],
      pred: [null, [], [1], [2], [3], [3], [5], [4], [5, 7], [3], [6, 9], [10], [10], [8], [11, 12]],
      P: orizzontale(POS_CASO, 14), unita: T("settimane", "weeks"), nomi: CASO_NOMI },
    { nome: T("due cammini critici (es. 9.8)", "two critical paths (Ex. 9.8)"), n: 8,
      d: [0, 2, 2, 4, 3, 5, 5, 3, 3], pred: [null, [], [3], [], [1], [1], [3, 4], [4, 5], [6, 7]],
      P: daTikz(POS_DUE, 8), unita: T("giorni", "days") },
    { nome: T("con un ciclo: 3 dopo 8", "with a cycle: 3 after 8"), n: 8,
      d: [0, 2, 2, 4, 3, 5, 5, 3, 3], pred: [null, [], [3], [8], [1], [1], [3, 4], [4, 5], [6, 7]],
      P: daTikz(POS_DUE, 8), unita: T("giorni", "days") },
  ];
  const copiaProgetto = (I) => Object.assign({}, I, { d: I.d.slice(), pred: I.pred.map((p) => (p ? p.slice() : p)), P: I.P.map((p) => p.slice()) });

  /** la rete di progetto: nodi 0..n+1, archi in ordine lessicografico, durate (d_0 = d_{n+1} = 0) */
  function reteProgetto(n, d, pred) {
    const A = new Set();
    for (let j = 1; j <= n; j++) {
      if (pred[j].length) for (const i of pred[j]) A.add(i + "-" + j);
      else A.add("0-" + j);
    }
    for (let j = 1; j <= n; j++) if (![...A].some((s) => +s.split("-")[0] === j)) A.add(j + "-" + (n + 1));
    const arcs = [...A].map((s) => s.split("-").map(Number)).sort(lex), dur = [0].concat(range(1, n).map((j) => d[j]), [0]);
    return { nodi: range(0, n + 1), A: arcs, dur };
  }
  const successori = (A, j) => A.filter((a) => a[0] === j).map((a) => a[1]).sort((x, y) => x - y);
  const predecessori = (A, j) => A.filter((a) => a[1] === j).map((a) => a[0]).sort((x, y) => x - y);
  /** ordine topologico con il nodo di indice più piccolo; { ordine, restanti (null se aciclico) } */
  function ordineTopologico(nodi, A) {
    const ingr = {};
    for (const v of nodi) ingr[v] = 0;
    for (const a of A) ingr[a[1]]++;
    const ordine = [], liberi = nodi.filter((v) => ingr[v] === 0).sort((x, y) => x - y);
    while (liberi.length) {
      const v = liberi.shift();
      ordine.push(v);
      for (const k of successori(A, v)) if (--ingr[k] === 0) liberi.push(k);
      liberi.sort((x, y) => x - y);
    }
    return { ordine, restanti: ordine.length === nodi.length ? null : nodi.filter((v) => !ordine.includes(v)) };
  }
  /** un ciclo fra i nodi restanti: dal più piccolo all'indietro lungo l'arco entrante di coda più piccola; scritto
   *  dal suo nodo più piccolo, con il primo nodo ripetuto in fondo (come ciclo_restante() di verifica.py) */
  function cicloRestante(A, restanti) {
    const R = new Set(restanti), visti = [];
    let v = Math.min(...restanti);
    while (!visti.includes(v)) { visti.push(v); v = Math.min(...A.filter((a) => a[1] === v && R.has(a[0])).map((a) => a[0])); }
    let C = visti.slice(visti.indexOf(v)).reverse();
    const k = C.indexOf(Math.min(...C));
    C = C.slice(k).concat(C.slice(0, k));
    return C.concat([C[0]]);
  }
  /** tutti i cammini da s a t (in profondità, successori per indice crescente) */
  function cammini(A, s, t) {
    const out = [];
    const visita = (P) => {
      if (P[P.length - 1] === t) { out.push(P.slice()); return; }
      for (const k of successori(A, P[P.length - 1])) if (!P.includes(k)) visita(P.concat([k]));
    };
    visita([s]);
    return out;
  }
  /** Il metodo del cammino critico sul progetto I, con i passi dell'app: rete, topo, avanti (uno per nodo),
   *  indietro (uno per nodo), margini, critico, gantt; con un ciclo nelle precedenze si ferma a «topo». */
  function cpmCalcola(I) {
    const n = I.n, { nodi, A, dur } = reteProgetto(n, I.d, I.pred), { ordine, restanti } = ordineTopologico(nodi, A);
    const passi = [{ tipo: "rete" }];
    const R = { n, nodi, A, dur, ordine, restanti, passi, unita: I.unita || "" };
    if (restanti) {
      R.ciclo = cicloRestante(A, restanti);
      passi.push({ tipo: "topo" });
      return R;
    }
    passi.push({ tipo: "topo" });
    const ES = new Array(n + 2).fill(null), EF = new Array(n + 2).fill(null), LS = new Array(n + 2).fill(null), LF = new Array(n + 2).fill(null);
    ordine.forEach((j, q) => {
      const P = predecessori(A, j);
      ES[j] = P.length ? Math.max(...P.map((i) => EF[i])) : 0;
      EF[j] = ES[j] + dur[j];
      passi.push({ tipo: "avanti", j, q, P });
    });
    const T0 = ES[n + 1];
    ordine.slice().reverse().forEach((j, q) => {
      const S = successori(A, j);
      LF[j] = S.length ? Math.min(...S.map((k) => LS[k])) : T0;
      LS[j] = LF[j] - dur[j];
      passi.push({ tipo: "indietro", j, q, S });
    });
    const TS = new Array(n + 2).fill(null), FS = new Array(n + 2).fill(null);
    for (let j = 1; j <= n; j++) { TS[j] = LS[j] - ES[j]; FS[j] = Math.min(...successori(A, j).map((k) => ES[k])) - EF[j]; }
    const tesi = A.filter(([i, j]) => ES[j] === EF[i]);
    const critici = cammini(tesi, 0, n + 1);
    passi.push({ tipo: "margini" }, { tipo: "critico" }, { tipo: "gantt" });
    return Object.assign(R, { ES, EF, LS, LF, T: T0, TS, FS, tesi, critici, attivitaCritiche: range(1, n).filter((j) => TS[j] === 0) });
  }
  /** disegno orizzontale a livelli (come posizioni() di EXERCISES/script/genera_esercizi.py del capitolo 9): x per
   *  livello (massimo numero di archi da START), y per baricentro dei predecessori; con un ciclo i nodi restanti
   *  vanno nei livelli successivi */
  function posizioniProgetto(n, d, pred, dx = 1.9, dy = 1.45) {
    const { nodi, A } = reteProgetto(n, d, pred), { ordine, restanti } = ordineTopologico(nodi, A);
    const liv = {};
    for (const v of ordine) { const P = predecessori(A, v); liv[v] = P.length ? Math.max(...P.map((i) => liv[i] + 1)) : 0; }
    if (restanti) for (const v of restanti.filter((v) => v !== n + 1)) liv[v] = 1 + Math.max(0, ...predecessori(A, v).map((i) => (i in liv ? liv[i] : 0)));
    liv[n + 1] = Math.max(...range(0, n).map((v) => liv[v])) + 1;
    const pos = {};
    for (let lv = 0; lv <= liv[n + 1]; lv++) {
      const ns = nodi.filter((v) => liv[v] === lv);
      const ch = (v) => { const P = predecessori(A, v).filter((i) => pos[i]); return -P.reduce((s, i) => s + pos[i][1], 0) / Math.max(1, P.length); };
      ns.sort((a, b) => ch(a) - ch(b) || a - b);
      ns.forEach((v, s) => { pos[v] = [lv * dx, ((ns.length - 1) / 2 - s) * dy]; });
    }
    return range(0, n + 1).map((v) => pos[v]);
  }
  /** un progetto a caso, come progetto_casuale() degli esercizi: ogni attività di un ordine nascosto ha 0, 1 o 2
   *  predecessori fra le tre precedenti; numerazione a caso */
  function progettoCasuale(n, rnd = Math.random) {
    const pick = (L) => L[Math.floor(rnd() * L.length)];
    const predH = { 1: [] };
    for (let k = 2; k <= n; k++) {
      const cand = range(Math.max(1, k - 3), k - 1), q = Math.min(cand.length, pick([0, 1, 1, 2, 2]));
      const sc = cand.slice();
      for (let i = sc.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [sc[i], sc[j]] = [sc[j], sc[i]]; }
      predH[k] = sc.slice(0, q).sort((a, b) => a - b);
    }
    const nome = range(1, n);
    for (let i = n - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [nome[i], nome[j]] = [nome[j], nome[i]]; }
    const pred = new Array(n + 1).fill(null), d = [0];
    for (let k = 1; k <= n; k++) pred[nome[k - 1]] = predH[k].map((i) => nome[i - 1]).sort((a, b) => a - b);
    for (let j = 1; j <= n; j++) d.push(2 + Math.floor(rnd() * 8));
    return { n, d, pred };
  }
  function cpmCasuale() {
    for (let t = 0; t < 200; t++) {
      const n = M.casuale(7, 10), I = progettoCasuale(n);
      const R = cpmCalcola(I);
      if (R.restanti || R.attivitaCritiche.length === n) continue;
      return Object.assign(I, { P: posizioniProgetto(n, I.d, I.pred), unita: T("giorni", "days") });
    }
    return null;
  }
  const progettoTxt = (I) => `${I.n} ; ` + range(1, I.n).map((j) => `${j}:${I.d[j]}` + (I.pred[j].length ? ":" + I.pred[j].join(",") : "")).join(" ");
  function leggiProgetto(s) {
    const [a, b] = String(s || "").split(";"), n = Number(String(a).trim());
    if (!Number.isInteger(n) || n < 1 || n > 16 || b == null) return null;
    const d = new Array(n + 1).fill(null), pred = new Array(n + 1).fill(null);
    for (const tok of b.split(/\s+/).filter(Boolean)) {
      const m = /^(\d+):(\d+)(?::([\d,]+))?$/.exec(tok);
      if (!m) return null;
      const j = +m[1], dj = +m[2], P = m[3] ? m[3].split(",").filter(Boolean).map(Number) : [];
      if (j < 1 || j > n || d[j] !== null || dj < 1 || dj > 99 || P.some((i) => i < 1 || i > n || i === j) || new Set(P).size !== P.length) return null;
      d[j] = dj;
      pred[j] = P.sort((x, y) => x - y);
    }
    if (d.slice(1).some((x) => x === null)) return null;
    d[0] = 0;
    return { n, d, pred };
  }

  const NOME = (R, v) => (v === 0 ? "START" : v === R.n + 1 ? "FINISH" : String(v));
  const NOMEtex = (R, v) => (v === 0 ? "\\text{START}" : v === R.n + 1 ? "\\text{FINISH}" : String(v));
  const camminoTxt = (R, P) => P.map((v) => NOME(R, v)).join(" → ");
  /** quanti nodi del passaggio in avanti / all'indietro sono già fatti al passo P */
  function fatti(R, k) {
    let av = 0, ind = 0;
    for (const Q of R.passi.slice(0, k + 1)) { if (Q.tipo === "avanti") av++; if (Q.tipo === "indietro") ind++; }
    const fa = new Set(R.ordine.slice(0, av)), fi = new Set(R.ordine.slice().reverse().slice(0, ind));
    return { fa, fi, tutto: ["margini", "critico", "gantt"].includes(R.passi[k].tipo) };
  }
  /** la rete di progetto: nodi (cerchi; START e FINISH rettangoli), archi con freccia, durata sopra il nodo e righe
   *  di testo sotto (o accanto); opz.arco([i,j]) -> stile, opz.nodo(v) -> stile, opz.testi(v) -> [[testo, colore]] */
  function disegnaProgetto(d, R, Pv, box, opz, C, verticale, pieghe) {
    const n = R.n, bg = M.scuro() ? "#1b2636" : "#ffffff";
    // scale diverse sui due assi (la rete di progetto è uno schema): riempie il riquadro, con lo spazio per le
    // durate sopra i nodi e per le due righe dei tempi sotto (o accanto, nel disegno verticale)
    const r = opz.r, fs = clamp(r * 0.82, 10.5, 13);
    const xs = Pv.map((p) => p[0]), ys = Pv.map((p) => p[1]);
    const [xa, xb, ya, yb] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    const cp = !!opz.compatto, ml = verticale ? r + 8 : 2.2 * r + (cp ? 4 : 34), mr = verticale ? r + fs * (cp ? 2 : 7.5) : 2.2 * r + (cp ? 4 : 34);
    const mt = verticale ? r + 14 : r + fs + 10, mb = verticale ? r + 14 : r + 2.5 * fs + 10;
    const sx = (box.w - ml - mr) / Math.max(xb - xa, 1e-6), sy = (box.h - mt - mb) / Math.max(yb - ya, 1e-6);
    const X = (v) => box.x + ml + sx * (Pv[v][0] - xa), Y = (v) => box.y + mt + sy * (yb - Pv[v][1]);
    const semi = (v) => (v === 0 || v === n + 1 ? [r * 2.1, r * 0.95] : [r, r]);
    const esce = (v, ux, uy) => {         // distanza dal centro al bordo del nodo nella direzione (ux, uy)
      if (v !== 0 && v !== n + 1) return r;
      const [hw, hh] = semi(v);
      return Math.min(Math.abs(ux) > 1e-9 ? hw / Math.abs(ux) : 1e9, Math.abs(uy) > 1e-9 ? hh / Math.abs(uy) : 1e9);
    };
    for (const a of R.A) {
      const s = Object.assign({ colore: C.muted, spessore: 1.5, dash: 0, opacita: 0.75 }, opz.arco(a) || {});
      const pg = pieghe && pieghe[a[0] + "-" + a[1]] ? pieghe[a[0] + "-" + a[1]] : 0;
      const g = N.geometria(X(a[0]), Y(a[0]), X(a[1]), Y(a[1]), pg);
      const fuori = (cx, cy, v, da, verso, extra) => {
        let t = da;
        for (let q = 0; q < 100; q++) {
          const [px, py] = g.pt(t), dx = px - cx, dy = py - cy, l = Math.hypot(dx, dy) || 1;
          if (l >= esce(v, dx / l, dy / l) + extra) break;
          t += verso * 0.01;
        }
        return clamp(t, 0, 1);
      };
      const fr = Math.max(8, 5 + 2 * s.spessore);
      const ta = fuori(X(a[0]), Y(a[0]), a[0], 0, 1, 0), tb = fuori(X(a[1]), Y(a[1]), a[1], 1, -1, fr * 0.85), tbF = fuori(X(a[1]), Y(a[1]), a[1], 1, -1, 0.5);
      const Np = pg ? 24 : 1, xs = [], ys = [];
      for (let q = 0; q <= Np; q++) { const [px, py] = g.pt(ta + (tb - ta) * q / Np); xs.push(px); ys.push(py); }
      d.curva(xs, ys, { strokeColor: s.colore, strokeWidth: s.spessore, dash: s.dash, strokeOpacity: s.opacita, lineCap: "round" });
      const [hx, hy] = g.pt(tbF), [ux, uy] = g.tan(tbF), lw = fr * 0.5;
      d.poly([[hx, hy], [hx - fr * ux + lw * uy, hy - fr * uy - lw * ux], [hx - fr * ux - lw * uy, hy - fr * uy + lw * ux]],
        { strokeColor: s.colore, fillColor: s.colore, strokeOpacity: s.opacita, fillOpacity: s.opacita });
    }
    for (const v of R.nodi) {
      const s = Object.assign({ fondo: bg, bordo: C.muted, spessore: 2, testo: C.testo, opacita: 1 }, opz.nodo(v) || {});
      if (v === 0 || v === n + 1) {
        const [hw, hh] = semi(v);
        d.rect(X(v) - hw, Y(v) - hh, 2 * hw, 2 * hh, { strokeColor: s.bordo, strokeWidth: s.spessore, fillColor: s.fondo, fillOpacity: s.opacita });
        d.text(X(v), Y(v), NOME(R, v), { fontSize: clamp(r * 0.62, 9, 12), strokeColor: s.testo, cssStyle: "font-weight:800;pointer-events:none" });
      } else {
        d.dot(X(v), Y(v), r, { fillColor: s.fondo, fillOpacity: s.opacita, strokeColor: s.bordo, strokeWidth: s.spessore });
        d.text(X(v), Y(v), String(v), { fontSize: clamp(r * 0.95, 11, 16), strokeColor: s.testo, cssStyle: "font-weight:800;pointer-events:none" });
      }
      // durata (sopra) e righe di testo (sotto); nel disegno verticale tutto a destra
      const tt = opz.testi(v), du = v === 0 || v === n + 1 ? null : String(R.dur[v]);
      const [hw, hh] = semi(v);
      // sotto il nodo, oppure a destra se sotto c'è un altro nodo (con la sua durata)
      const lw0 = tt.length ? Math.max(...tt.map(([s]) => s.length)) * fs * 0.58 + 6 : 0, hl0 = fs * 1.15 * tt.length + 2;
      const urta = (bx) => R.nodi.some((u) => {
        if (u === v) return false;
        const [w2, h2] = semi(u), ux = X(u) - w2, uy = Y(u) - h2 - fs * 1.3;
        return bx[0] < ux + 2 * w2 && ux < bx[0] + bx[2] && bx[1] < uy + 2 * h2 + fs * 1.3 && uy < bx[1] + bx[3];
      });
      const aDestra = !verticale && tt.length && urta([X(v) - lw0 / 2, Y(v) + hh + 2, lw0, hl0]);
      if (!verticale) {
        if (du !== null) d.text(X(v), Y(v) - hh - fs * 0.75, du, { fontSize: fs + 1, strokeColor: C.blu, cssStyle: "font-weight:800;pointer-events:none" });
        if (aDestra) {
          const x0 = X(v) + hw + 4;
          d.rect(x0 - 2, Y(v) - hl0 / 2 - 1, lw0, hl0 + 2, { strokeWidth: 0, strokeOpacity: 0, fillColor: bg, fillOpacity: 0.85 });
          tt.forEach(([s, col], z) => d.text(x0, Y(v) + fs * 1.15 * (z - (tt.length - 1) / 2), s, { anchorX: "left", fontSize: fs, strokeColor: col, cssStyle: "font-weight:600;pointer-events:none" }));
        } else if (tt.length) {
          const lw = Math.max(...tt.map(([s]) => s.length)) * fs * 0.58 + 6;
          d.rect(X(v) - lw / 2, Y(v) + hh + 2, lw, fs * 1.15 * tt.length + 2, { strokeWidth: 0, strokeOpacity: 0, fillColor: bg, fillOpacity: 0.85 });
        }
        if (!aDestra) tt.forEach(([s, col], z) => d.text(X(v), Y(v) + hh + fs * (0.8 + 1.15 * z), s, { fontSize: fs, strokeColor: col, cssStyle: "font-weight:600;pointer-events:none" }));
      } else {
        let x0 = X(v) + hw + 4;
        if (tt.length) {
          const lw = Math.max(...tt.map(([s]) => s.length)) * fs * 0.58 + fs * 1.4 + 6;
          d.rect(x0 - 2, Y(v) - fs * 0.6 * tt.length - 2, lw, fs * 1.15 * tt.length + 4, { strokeWidth: 0, strokeOpacity: 0, fillColor: bg, fillOpacity: 0.85 });
        }
        if (du !== null) { d.text(x0, Y(v), du, { anchorX: "left", fontSize: fs + 1, strokeColor: C.blu, cssStyle: "font-weight:800;pointer-events:none" }); x0 += fs * 1.4; }
        tt.forEach(([s, col], z) => d.text(x0, Y(v) + fs * 1.1 * (z - (tt.length - 1) / 2), s, { anchorX: "left", fontSize: fs, strokeColor: col, cssStyle: "font-weight:600;pointer-events:none" }));
      }
    }
  }
  /** diagramma di Gantt del calendario al più presto: barre [ES_j, EF_j] (critiche in blu), margine totale
   *  tratteggiato [EF_j, LF_j], la durata T in rosso tratteggiata */
  function disegnaGantt(d, R, box, C) {
    const n = R.n, Tt = R.T, sx = 34, fondo = 26;
    const w = box.w - sx - 64, h = box.h - fondo, rh = Math.min(30, h / n), x = (t) => box.x + sx + w * t / Math.max(Tt, 1);
    const passo = [1, 2, 4, 5, 10, 20, 25, 50].find((p) => Tt / p <= 12) || 100;
    for (let j = 1; j <= n; j++) {
      const y = box.y + (j - 0.5) * rh, cr = R.TS[j] === 0, hb = Math.min(rh * 0.62, 20);
      d.text(box.x + sx - 8, y, String(j), { anchorX: "right", fontSize: 12.5, strokeColor: cr ? C.blu : C.testo, cssStyle: "font-weight:700" });
      if (R.TS[j] > 0) d.rect(x(R.EF[j]), y - hb / 2, x(R.LF[j]) - x(R.EF[j]), hb, { strokeColor: C.muted, strokeWidth: 1.3, dash: 3, fillColor: "none" });
      d.rect(x(R.ES[j]), y - hb / 2, x(R.EF[j]) - x(R.ES[j]), hb, { strokeColor: cr ? C.blu : C.grigio, strokeWidth: 1.2, fillColor: cr ? C.blu : C.grigio, fillOpacity: cr ? 0.85 : 0.55 });
      if (x(R.EF[j]) - x(R.ES[j]) > 18) d.text((x(R.ES[j]) + x(R.EF[j])) / 2, y, String(R.dur[j]), { fontSize: 11, strokeColor: cr ? "#ffffff" : C.testo, cssStyle: "font-weight:700;pointer-events:none" });
    }
    const yb = box.y + n * rh + 4;
    d.line(x(0), yb, x(Tt) + 18, yb, { strokeColor: C.muted, strokeWidth: 1.3 });
    for (let t = 0; t <= Tt; t += passo) {
      d.line(x(t), yb, x(t), yb + 5, { strokeColor: C.muted, strokeWidth: 1.2 });
      d.text(x(t), yb + 13, String(t), { fontSize: 11.5, strokeColor: C.muted });
    }
    d.line(x(Tt), box.y - 2, x(Tt), yb, { strokeColor: C.rosso, strokeWidth: 1.8, dash: 3 });
    d.text(x(Tt) + 4, box.y + 6, `T = ${Tt}`, { anchorX: "left", fontSize: 12.5, strokeColor: C.rosso, cssStyle: "font-weight:700" });
    if (R.unita) d.text(x(Tt) + 22, yb, R.unita, { anchorX: "left", fontSize: 11.5, strokeColor: C.muted, cssStyle: "font-style:italic" });
  }

  const cpmStato = (st) => N.stato(st, (I) => cpmCalcola(I));
  /** il menu delle istanze e i comandi (il «Modifica…» del motore è per i grafi: qui si scrivono le attività) */
  function montaProgetti(st) {
    const D = st.dati, i0 = N.istDaIndirizzo(st, CPM_ES);
    if (!D.g || i0 >= 0) D.g = Object.assign(copiaProgetto(CPM_ES[Math.max(0, i0)]), { id: N.nuovoId(), es: Math.max(0, i0) });
    D.nuova = (I, es = -1) => { D.g = Object.assign(I, { id: N.nuovoId(), es }); vaiA(st, 0); M.ferma(st); st.aggiorna(); };
    M.comandi(st, [
      [T("Casuale", "Random"), T("un progetto a caso", "a random project"), () => { const I = cpmCasuale(); if (I) D.nuova(I); }],
      [T("Modifica…", "Edit…"), T("scrivi le attività: j:durata:predecessori", "type the activities: j:duration:predecessors"), () => {
        const s = N.chiedi(T("Numero di attività (da 1 a 16), poi per ogni attività j:dⱼ:predecessori (separati da virgole; niente dopo dⱼ se non ne ha), per esempio: 4 ; 1:3 2:2:1 3:4:1 4:2:2,3",
          "Number of activities (1 to 16), then for every activity j:dⱼ:predecessors (comma separated; nothing after dⱼ if it has none), for example: 4 ; 1:3 2:2:1 3:4:1 4:2:2,3"), progettoTxt(D.g));
        if (!s) return;
        const I = leggiProgetto(s);
        if (!I) { window.alert(T("Dati non validi: ogni attività 1…n una volta, durate intere fra 1 e 99, predecessori fra 1 e n diversi dall'attività.", "Invalid data: every activity 1…n once, integer durations between 1 and 99, predecessors between 1 and n other than the activity.")); return; }
        D.nuova(Object.assign(I, { P: posizioniProgetto(I.n, I.d, I.pred), unita: D.g.unita }));
      }],
    ], { k: N.PASSO, ritmo: 900 });
    N.menuIstanze(st, CPM_ES.map((e) => [e.nome]), () => D.g.es, (i) => D.nuova(copiaProgetto(CPM_ES[i]), i));
  }

  window.GI_RICETTE["no-cpm"] = {
    titolo: T("Il metodo del cammino critico (CPM)", "The critical path method (CPM)"),
    parametri: [parPasso("", 0)],
    assi: false,
    opzioniBoard: M.OPZ,
    vista: [0, 400, 600, 0],
    legenda: (st) => {
      const C = M.COL(st);
      return [
        [C.a, T("nodo corrente; archi esaminati (pieni: max o min)", "current node; arcs examined (solid: max or min)"), ""],
        [C.blu, T("durate \\(d_j\\); cammino critico", "durations \\(d_j\\); critical path"), ""],
        [C.b, T("nodi elaborati; altri archi stretti", "processed nodes; other tight arcs"), ""],
        [C.rosso, T("ciclo; durata \\(T\\)", "cycle; duration \\(T\\)"), "dashed"],
      ];
    },
    monta(board, st) {
      nuovaVoce(st);
      montaProgetti(st);
      osservaDimensioni(board, st);
      daIndirizzo(st);
    },
    aggiorna(board, st) {
      const S = cpmStato(st), D = S.D, C = M.COL(st), [W, H] = dim(board), { R, k, K, P } = S, I = D.g;
      N.menuIstanze(st, CPM_ES.map((e) => [e.nome]), () => D.g.es, (i) => D.nuova(copiaProgetto(CPM_ES[i]), i));
      M.ridisegna(board, st, [I.id, k, M.scuro(), W, H].join("|"), (crea) => {
        pix(board);
        const d = disegno(crea, H), t = P.tipo, n = R.n, fondo = 24;
        if (t === "gantt") {
          d.text(14, 14, T(`diagramma di Gantt del calendario al più presto (${R.unita})`, `Gantt chart of the earliest schedule (${R.unita})`), { anchorX: "left", fontSize: 13.5, strokeColor: C.muted, cssStyle: "font-style:italic;font-weight:600" });
          disegnaGantt(d, R, { x: 10, y: 32, w: W - 20, h: H - 32 - fondo - 8 }, C);
        } else {
          const compatto = W < 600, verticale = compatto || W < H * 0.95;
          const Pv = verticale ? I.P.map(([x, y]) => [-y, -x]) : I.P;
          const pieghe = verticale && I.pieghe ? Object.fromEntries(Object.entries(I.pieghe).map(([q, v]) => [q, -v])) : I.pieghe;
          const { fa, fi, tutto } = fatti(R, k);
          const avanti = t === "avanti", indietro = t === "indietro";
          const esaminati = new Set(avanti ? P.P.map((i) => i + "-" + P.j) : indietro ? P.S.map((s) => P.j + "-" + s) : []);
          const migliori = new Set(avanti ? P.P.filter((i) => R.EF[i] === R.ES[P.j]).map((i) => i + "-" + P.j) : indietro ? P.S.filter((s) => R.LS[s] === R.LF[P.j]).map((s) => P.j + "-" + s) : []);
          const tesi = new Set(t === "critico" ? R.tesi.map((a) => a[0] + "-" + a[1]) : []);
          const crit = new Set(t === "critico" ? R.critici.flatMap((Q) => Q.slice(1).map((v, z) => Q[z] + "-" + v)) : []);
          const cic = new Set(R.ciclo ? R.ciclo.slice(1).map((v, z) => R.ciclo[z] + "-" + v) : []);
          const box = { x: 8, y: 6, w: W - 16, h: H - fondo - 10 };
          disegnaProgetto(d, R, Pv, box, {
            r: compatto ? 10 : clamp(Math.min(W, H) / 28, 12, 17), compatto,
            arco: (a) => {
              const q = a[0] + "-" + a[1];
              if (cic.has(q)) return { colore: C.rosso, spessore: 3.6, opacita: 1, dash: 3 };
              if (crit.has(q)) return { colore: C.blu, spessore: 3.8, opacita: 1 };
              if (tesi.has(q)) return { colore: C.b, spessore: 2.4, opacita: 1 };
              if (migliori.has(q)) return { colore: C.a, spessore: 3.6, opacita: 1 };
              if (esaminati.has(q)) return { colore: C.a, spessore: 2.2, opacita: 1, dash: 3 };
              return {};
            },
            nodo: (v) => {
              if (R.ciclo && R.ciclo.includes(v)) return { fondo: C.rosso, opacita: 0.2, bordo: C.rosso, spessore: 3 };
              if ((avanti || indietro) && v === P.j) return { fondo: C.a, opacita: 0.3, bordo: C.a, spessore: 3.8 };
              if ((t === "margini" || t === "critico") && (v === 0 || v === n + 1 || R.TS[v] === 0)) return { fondo: C.blu, opacita: 0.85, bordo: C.blu, spessore: 2.4, testo: "#ffffff" };
              if (t === "topo" && R.restanti && !R.restanti.includes(v)) return { fondo: C.grigio, opacita: 0.35 };
              if ((avanti && fa.has(v)) || (indietro && fi.has(v))) return { fondo: C.b, opacita: 0.22, bordo: C.b, spessore: 2.4 };
              return {};
            },
            testi: (v) => {
              if (!R.ES || t === "rete" || t === "topo") return [];
              if (compatto && !((avanti || indietro) && v === P.j)) return [];     // telefono: i tempi stanno nella tabella
              const cur = (avanti || indietro) && v === P.j ? C.a : C.testo;
              if (avanti) return fa.has(v) ? [[`ES=${R.ES[v]}`, cur], [`EF=${R.EF[v]}`, cur]] : [];
              const ls = fi.has(v) || tutto ? R.LS[v] : "·", lf = fi.has(v) || tutto ? R.LF[v] : "·";
              return [[`S=(${R.ES[v]},${ls})`, cur], [`F=(${R.EF[v]},${lf})`, cur]];
            },
          }, C, verticale, pieghe);
          if ((t === "topo" || t === "rete") && !compatto) {
            const s = R.restanti ? T(`ordine parziale: ${R.ordine.map((v) => NOME(R, v)).join(", ")} · ciclo: ${R.ciclo.join(" → ")}`, `partial order: ${R.ordine.map((v) => NOME(R, v)).join(", ")} · cycle: ${R.ciclo.join(" → ")}`)
              : t === "topo" ? T(`ordine topologico: ${R.ordine.map((v) => NOME(R, v)).join(", ")}`, `topological order: ${R.ordine.map((v) => NOME(R, v)).join(", ")}`) : "";
            if (s) d.text(14, 16, s, { anchorX: "left", fontSize: 13, strokeColor: R.restanti ? C.rosso : C.muted, cssStyle: "font-weight:600" });
          }
        }
        let pie = t === "gantt" ? T("barre da ESⱼ a EFⱼ (blu: critiche); tratteggiato: scorta totale fino a LFⱼ", "bars from ESⱼ to EFⱼ (blue: critical); dashed: total slack up to LFⱼ")
          : t === "avanti" ? T("in blu sopra i nodi: le durate dⱼ; l'arco (i,j) ha lunghezza dᵢ", "in blue above the nodes: the durations dⱼ; arc (i,j) has length dᵢ")
            : R.ES && t !== "rete" && t !== "topo" ? T("S = (ES, LS), F = (EF, LF); in blu le durate dⱼ", "S = (ES, LS), F = (EF, LF); in blue the durations dⱼ")
              : T("in blu: le durate dⱼ; l'arco (i,j) ha lunghezza dᵢ", "in blue: the durations dⱼ; arc (i,j) has length dᵢ");
        d.text(14, H - 10, pie, { anchorX: "left", fontSize: 12, strokeColor: C.muted, cssStyle: "font-style:italic" });
        d.text(W - 14, H - 10, T(`passo ${k} di ${K}`, `step ${k} of ${K}`), { anchorX: "right", fontSize: 12.5, strokeColor: C.muted });
      });
    },
    formula(p, st) {
      const S = cpmStato(st), { R, P } = S, t = P.tipo, n = R.n;
      const ES = "\\mathit{ES}", EF = "\\mathit{EF}", LS = "\\mathit{LS}", LF = "\\mathit{LF}";
      if (t === "rete") return `N = \\{0,1,\\dots,${n + 1}\\},\\ \\ |A| = ${R.A.length}`;
      if (t === "topo") return R.restanti ? `\\text{${T("ciclo", "cycle")}}\\ ${R.ciclo.join(",")}:\\ \\text{STOP}` : `${T("\\text{ordine topologico: }", "\\text{topological order: }")} ${R.ordine.join(",")}`;
      if (t === "avanti") {
        const j = P.j;
        if (!P.P.length) return `${ES}_{0} = 0,\\ \\ ${EF}_{0} = 0`;
        const mx = P.P.length > 1 ? `\\max\\{${P.P.map((i) => R.EF[i]).join(",")}\\} = ` : "";
        return `${ES}_{${j}} = ${mx}${R.ES[j]},\\ \\ ${EF}_{${j}} = ${R.ES[j]} + ${R.dur[j]} = ${R.EF[j]}` + (j === n + 1 ? `,\\ \\ T = ${R.T}` : "");
      }
      if (t === "indietro") {
        const j = P.j;
        if (!P.S.length) return `${LF}_{${j}} = T = ${R.T},\\ \\ ${LS}_{${j}} = ${R.LS[j]}`;
        const mn = P.S.length > 1 ? `\\min\\{${P.S.map((k2) => R.LS[k2]).join(",")}\\} = ` : "";
        return `${LF}_{${j}} = ${mn}${R.LF[j]},\\ \\ ${LS}_{${j}} = ${R.LF[j]} - ${R.dur[j]} = ${R.LS[j]}`;
      }
      if (t === "margini") return `\\mathit{TS}_j = ${LS}_j - ${ES}_j,\\ \\ \\mathit{FS}_j = \\min_{(j,k) \\in A} ${ES}_k - ${EF}_j`;
      if (t === "critico" && window.innerWidth < 600) return `T = ${R.T}`;
      if (t === "critico") return R.critici.map((Q) => Q.map((v) => NOMEtex(R, v)).join(",")).join(";\\ \\ ") + `\\ \\ (T = ${R.T})`;
      return `T = ${R.T}`;
    },
    letture(p, st) {
      const S = cpmStato(st), { R, P, k } = S, C = M.COL(st), t = P.tipo, n = R.n, I = st.dati.g, tin = M.tinta;
      const nome = (j) => (I.nomi && I.nomi[j] ? ` (${T(I.nomi[j][0], I.nomi[j][1])})` : "");
      let nota = "";
      if (t === "rete") {
        const da = R.A.filter((a) => a[0] === 0).map((a) => a[1]), a2 = R.A.filter((a) => a[1] === n + 1).map((a) => a[0]);
        nota = T(`La rete di progetto: un nodo per attività, START = 0 e FINISH = ${n + 1} (durata 0); un arco \\((i,j)\\) per ogni predecessore immediato \\(i\\) di \\(j\\), gli archi da START alle attività senza predecessori (${lista(da)}) e da quelle che non precedono nessuno (${lista(a2)}) a FINISH. L'arco \\((i,j)\\) ha lunghezza \\(d_i\\).`,
          `The project network: one node per activity, START = 0 and FINISH = ${n + 1} (duration 0); an arc \\((i,j)\\) for every immediate predecessor \\(i\\) of \\(j\\), the arcs from START to the activities without predecessors (${lista(da)}) and from those that precede no activity (${lista(a2)}) to FINISH. Arc \\((i,j)\\) has length \\(d_i\\).`);
      } else if (t === "topo") {
        nota = R.restanti ? T(`Passo 0: si toglie ogni volta il nodo senza archi entranti di indice più piccolo: ${lista(R.ordine.map((v) => NOME(R, v)))}. Poi restano i nodi ${lista(R.restanti.map((v) => NOME(R, v)))}, tutti con archi entranti: le precedenze contengono il ${tin(C.rosso, "ciclo " + R.ciclo.join(", "))}. ${tin(C.rosso, "STOP")}: un'attività dovrebbe finire prima di cominciare, e non c'è nessun calendario.`,
          `Step 0: repeatedly remove the node without entering arcs of smallest index: ${lista(R.ordine.map((v) => NOME(R, v)))}. Then the nodes ${lista(R.restanti.map((v) => NOME(R, v)))} are left, all with entering arcs: the precedences contain the ${tin(C.rosso, "cycle " + R.ciclo.join(", "))}. ${tin(C.rosso, "STOP")}: an activity would have to finish before it starts, and there is no schedule.`)
          : T(`Passo 0: l'ordine topologico toglie ogni volta il nodo senza archi entranti di indice più piccolo: ${lista(R.ordine)}. Ogni arco va avanti nell'ordine, quindi i passaggi possono procedere nodo per nodo.`,
            `Step 0: the topological order repeatedly removes the node without entering arcs of smallest index: ${lista(R.ordine)}. Every arc goes forward in the order, so the passes can proceed node by node.`);
      } else if (t === "avanti") {
        const j = P.j;
        nota = !P.P.length ? T(`Passaggio in avanti, nell'ordine topologico. START: \\(\\mathit{ES}_0 = 0\\).`, `Forward pass, in topological order. START: \\(\\mathit{ES}_0 = 0\\).`)
          : T(`Nodo ${tin(C.a, NOME(R, j))}${nome(j)}: i predecessori ${lista(P.P.map((i) => NOME(R, i)))} sono già elaborati. \\(\\mathit{ES}_{${j}}\\) è il più grande \\(\\mathit{EF}_i\\) dei predecessori, \\(${R.ES[j]}\\) (archi pieni); \\(\\mathit{EF}_{${j}} = \\mathit{ES}_{${j}} + d_{${j}} = ${R.EF[j]}\\).`,
            `Node ${tin(C.a, NOME(R, j))}${nome(j)}: the predecessors ${lista(P.P.map((i) => NOME(R, i)))} are already processed. \\(\\mathit{ES}_{${j}}\\) is the largest \\(\\mathit{EF}_i\\) of the predecessors, \\(${R.ES[j]}\\) (solid arcs); \\(\\mathit{EF}_{${j}} = \\mathit{ES}_{${j}} + d_{${j}} = ${R.EF[j]}\\).`);
        if (j === n + 1) nota += T(` La durata minima del progetto è ${tin(C.blu, `\\(T = \\mathit{ES}_{${n + 1}} = ${R.T}\\)`)} ${R.unita}: la lunghezza di un cammino più lungo da START a FINISH.`,
          ` The minimum project duration is ${tin(C.blu, `\\(T = \\mathit{ES}_{${n + 1}} = ${R.T}\\)`)} ${R.unita}: the length of a longest path from START to FINISH.`);
      } else if (t === "indietro") {
        const j = P.j;
        nota = !P.S.length ? T(`Passaggio all'indietro, nell'ordine topologico rovesciato. FINISH: \\(\\mathit{LF}_{${j}} = T = ${R.T}\\).`, `Backward pass, in reverse topological order. FINISH: \\(\\mathit{LF}_{${j}} = T = ${R.T}\\).`)
          : T(`Nodo ${tin(C.a, NOME(R, j))}${nome(j)}: \\(\\mathit{LF}_{${j}}\\) è il più piccolo \\(\\mathit{LS}_k\\) dei successori ${lista(P.S.map((s) => NOME(R, s)))}, \\(${R.LF[j]}\\) (archi pieni); \\(\\mathit{LS}_{${j}} = \\mathit{LF}_{${j}} - d_{${j}} = ${R.LS[j]}\\).`,
            `Node ${tin(C.a, NOME(R, j))}${nome(j)}: \\(\\mathit{LF}_{${j}}\\) is the smallest \\(\\mathit{LS}_k\\) of the successors ${lista(P.S.map((s) => NOME(R, s)))}, \\(${R.LF[j]}\\) (solid arcs); \\(\\mathit{LS}_{${j}} = \\mathit{LF}_{${j}} - d_{${j}} = ${R.LS[j]}\\).`);
        if (j === 0) nota += T(" Come deve essere, \\(\\mathit{LS}_0 = 0\\).", " As it must be, \\(\\mathit{LS}_0 = 0\\).");
      } else if (t === "margini") {
        const nc = range(1, n).filter((j) => R.TS[j] > 0);
        nota = T(`${tin(C.a, "Margine totale")} \\(\\mathit{TS}_j = \\mathit{LS}_j - \\mathit{ES}_j\\): il ritardo di \\(j\\) che non ritarda il progetto. ${tin(C.a, "Margine libero")} \\(\\mathit{FS}_j = \\min \\mathit{ES}_k - \\mathit{EF}_j\\) sui successori: il ritardo che non sposta nessun'altra attività. Le attività ${tin(C.blu, "critiche")}, con \\(\\mathit{TS}_j = 0\\), sono ${lista(R.attivitaCritiche)}.`,
          `${tin(C.a, "Total slack")} \\(\\mathit{TS}_j = \\mathit{LS}_j - \\mathit{ES}_j\\): the delay of \\(j\\) that does not delay the project. ${tin(C.a, "Free slack")} \\(\\mathit{FS}_j = \\min \\mathit{ES}_k - \\mathit{EF}_j\\) over the successors: the delay that moves no other activity. The ${tin(C.blu, "critical")} activities, with \\(\\mathit{TS}_j = 0\\), are ${lista(R.attivitaCritiche)}.`);
        const fsd = nc.filter((j) => R.FS[j] < R.TS[j]);
        if (fsd.length) nota += T(` Per ${lista(fsd)} il scorta libera è più piccolo del totale: il scorta totale è in comune con altre attività.`, ` For ${lista(fsd)} the free slack is smaller than the total: the total slack is shared with other activities.`);
      } else if (t === "critico") {
        const crA = new Set(R.critici.flatMap((Q) => Q.slice(1).map((v, z) => Q[z] + "-" + v)));
        const altri = R.tesi.filter((a) => !crA.has(a[0] + "-" + a[1]));
        nota = T(`L'arco \\((i,j)\\) è ${tin(C.b, "stretto")} se \\(\\mathit{ES}_j = \\mathit{EF}_i\\). I ${tin(C.blu, "cammini critici")} sono i cammini da START a FINISH fatti di archi stretti, lunghi \\(T = ${R.T}\\): ${R.critici.map((Q) => camminoTxt(R, Q)).join("; ")}.`,
          `Arc \\((i,j)\\) is ${tin(C.b, "tight")} if \\(\\mathit{ES}_j = \\mathit{EF}_i\\). The ${tin(C.blu, "critical paths")} are the paths from START to FINISH made of tight arcs, of length \\(T = ${R.T}\\): ${R.critici.map((Q) => camminoTxt(R, Q)).join("; ")}.`);
        if (altri.length) nota += T(` Gli archi stretti ${altri.map((a) => `\\((${a[0]},${a[1]})\\)`).join(", ")} non stanno su un cammino critico.`, ` The tight arcs ${altri.map((a) => `\\((${a[0]},${a[1]})\\)`).join(", ")} are not on a critical path.`);
      } else {
        nota = T(`Il diagramma di Gantt del calendario \\(\\mathit{ES}\\): una barra da \\(\\mathit{ES}_j\\) a \\(\\mathit{EF}_j\\) per attività, in ${tin(C.blu, "blu")} le critiche, che si susseguono senza pause fino a \\(T = ${R.T}\\); il riquadro tratteggiato, da \\(\\mathit{EF}_j\\) a \\(\\mathit{LF}_j\\), è il scorta totale.`,
          `The Gantt chart of the schedule \\(\\mathit{ES}\\): one bar from \\(\\mathit{ES}_j\\) to \\(\\mathit{EF}_j\\) per activity, the critical ones in ${tin(C.blu, "blue")}, which follow one another without gaps up to \\(T = ${R.T}\\); the dashed box, from \\(\\mathit{EF}_j\\) to \\(\\mathit{LF}_j\\), is the total slack.`);
      }
      // la tabella dei tempi (una riga per nodo), riempita man mano
      if (!R.ES || t === "rete" || t === "topo") {
        const righe = range(1, n).map((j) => `<tr${R.ciclo && R.ciclo.includes(j) ? ` style="color:${C.rosso};font-weight:700"` : ""}><td>${j}</td><td>${R.dur[j]}</td><td style="text-align:left">${I.pred[j].length ? I.pred[j].join(", ") : "—"}</td></tr>`);
        return `<p style="margin:0 0 .4em">${nota}</p><table class="gi-tabella"><tr><th>\\(j\\)</th><th>\\(d_j\\)</th><th style="text-align:left">${T("predecessori", "predecessors")}</th></tr>${righe.join("")}</table>`;
      }
      const { fa, fi, tutto } = fatti(R, k), dopoAvanti = ["indietro", "margini", "critico", "gantt"].includes(t);
      const conInd = t === "indietro" || tutto, conM = tutto;
      let tab = `<table class="gi-tabella"><tr><th>\\(j\\)</th><th>\\(d_j\\)</th><th>ES</th><th>EF</th><th>LS</th><th>LF</th><th>TS</th><th>FS</th></tr>`;
      for (const v of R.nodi) {
        const cur = (t === "avanti" || t === "indietro") && v === P.j, cr = conM && v >= 1 && v <= n && R.TS[v] === 0;
        const sty = (cur ? bgSel(C.a, 20) + "font-weight:700;" : "") + (cr ? `color:${C.blu};font-weight:700;` : "");
        const f1 = t === "avanti" ? fa.has(v) : dopoAvanti || t === "indietro";
        const f2 = t === "indietro" ? fi.has(v) : tutto;
        const att = v >= 1 && v <= n;
        tab += `<tr style="${sty}"><td>${v === 0 ? "S" : v === n + 1 ? "F" : v}</td><td>${R.dur[v]}</td><td>${f1 ? R.ES[v] : ""}</td><td>${f1 ? R.EF[v] : ""}</td>`
          + `<td>${f2 && conInd ? R.LS[v] : ""}</td><td>${f2 && conInd ? R.LF[v] : ""}</td><td>${conM && att ? R.TS[v] : ""}</td><td>${conM && att ? R.FS[v] : ""}</td></tr>`;
      }
      tab += `</table><p style="margin:.2em 0;font-size:.85em;color:${C.muted}">S = START, F = FINISH${conM ? T("; in blu le attività critiche", "; in blue the critical activities") : ""}</p>`;
      return `<p style="margin:0 0 .4em">${nota}</p>` + tab;
    },
    domanda: T("Nel caso di studio la catena 4, 7, 8, 13 ha scorta totale 4 per ogni attività, ma scorta libera 0, 0, 0, 4: che cosa vuol dire? Con «Modifica…» porta d₄ a 9 e d₈ a 11: quanto diventa T? Nel secondo esempio il cammino START, 1, 4, 7, 8, FINISH ha solo attività critiche: è critico?",
      "In the case study the chain 4, 7, 8, 13 has total slack 4 for every activity, but free slack 0, 0, 0, 4: what does it mean? With «Edit…» set d₄ to 9 and d₈ to 11: what is T now? In the second example the path START, 1, 4, 7, 8, FINISH has only critical activities: is it critical?"),
  };

  window.GI_NO_E = {
    radica, soluzioneAlbero, potenziali, costiRidotti, forte, cicloOrientato, simplesso, reteAusiliaria, faseZero,
    nsCalcola, NS_ES, reteProgetto, ordineTopologico, cicloRestante, cammini, cpmCalcola, posizioniProgetto,
    progettoCasuale, leggiProgetto, CPM_ES,
  };
})();
