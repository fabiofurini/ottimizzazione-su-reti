/* Laboratorio di «Ottimizzazione su reti / Network Optimization»: cammini minimi e flusso massimo.
 *
 *   no-shortest-paths  cammini minimi da s su un grafo orientato con lunghezze d_ij, come nel capitolo «Shortest paths»
 *                      (03_SHORTEST_PATHS/script/verifica.py): Dijkstra (nodi temporanei e permanenti, il minimo con
 *                      l'indice più piccolo a parità, aggiornamento dei soli nodi temporanei), Bellman-Ford per passate
 *                      (d^k(j) dalla riga d^{k-1}, archi entranti per coda crescente, a parità la coda più piccola,
 *                      stop se d^k = d^{k-1}, ciclo negativo se cambia la passata n, letto all'indietro riga per riga) e
 *                      grafi aciclici (ordine topologico con l'indice più piccolo, nodi con d(i) = +∞ saltati); alla
 *                      fine l'albero dei cammini minimi e il certificato dei potenziali π_i = −d(i):
 *                      c̄_ij = d_ij − π_i + π_j ≥ 0, cioè π_i − π_j ≤ d_ij (incidenza +1 in coda, come nel corso)
 *   no-max-flow        flusso massimo da s a t: Ford-Fulkerson (cammino aumentante con la visita in profondità) ed
 *                      Edmonds-Karp (visita in ampiezza: cammino con il minimo numero di archi) sulla rete residua,
 *                      con collo di bottiglia, aggiornamento del flusso e, alla fine, il taglio minimo (S, N∖S).
 *                      Nella rete residua i vicini per indice crescente; aggiornamenti solo se strettamente migliori.
 *                      Istanza: il grafo di riferimento con le capacità del capitolo 5 «Maximum flow»,
 *                      valore massimo 7 controllato con gurobipy.
 *
 * Il disegno dei grafi, le istanze e i comandi vengono dal motore gi-no-0.js (window.GI_NO). Verde riservato ai
 * tagli: qui non si usa. Le funzioni di calcolo sono anche in window.GI_NO_B, per le prove.
 */
(function () {
  "use strict";
  const GI = window.GI, M = window.GI_MIP, N = window.GI_NO, T = GI.T;
  const { PASSO, parPasso, vaiA, clamp, lista, osservaDimensioni, nuovaVoce, dim, pix, disegno, daIndirizzo } = N;
  window.GI_RICETTE = window.GI_RICETTE || {};
  const INF = Infinity;
  const vTxt = (x) => (x === INF ? "∞" : String(x));
  const vTex = (x) => (x === INF ? "+\\infty" : String(x));
  const PRED = "\\mathit{pred}";
  const ordina = (A) => A.map((a) => a.slice()).sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  // il grafo di riferimento del corso (capitolo «Graphs»): N = {1..6}, nove archi, nodi disposti come nelle note
  const RIF = [[0, 1.2], [2.2, 2.4], [2.2, 0], [4.4, 2.4], [4.4, 0], [6.6, 1.2]];
  const ARCHI_RIF = [[1, 2], [1, 3], [2, 4], [3, 2], [3, 5], [4, 3], [4, 6], [5, 4], [5, 6]];
  const conPesi = (arcs, w) => arcs.map(([i, j], q) => [i, j, w[q]]);

  // =================================================================
  // 1. CAMMINI MINIMI: DIJKSTRA, BELLMAN-FORD, GRAFI ACICLICI
  // =================================================================
  // le istanze del capitolo «Shortest paths» (03_SHORTEST_PATHS/script/verifica.py): lunghezze d, d′ (d′₅₄ = −3),
  // d″ (d″₅₄ = −10), il grafo aciclico con (3,4) al posto di (4,3), d₃₄ = 1 e le lunghezze d′
  const D_RIF = [7, 2, 3, 3, 8, 1, 5, 2, 7];
  const SP_ES = [
    { nome: T("lunghezze d (es. 3.1, 3.9)", "lengths d (Ex. 3.1, 3.9)"), A: conPesi(ARCHI_RIF, D_RIF) },
    { nome: T("d′₅₄ = −3 (es. 3.7)", "d′₅₄ = −3 (Ex. 3.7)"), A: conPesi(ARCHI_RIF, [7, 2, 3, 3, 8, 1, 5, -3, 7]) },
    { nome: T("d″₅₄ = −10 (es. 3.8)", "d″₅₄ = −10 (Ex. 3.8)"), A: conPesi(ARCHI_RIF, [7, 2, 3, 3, 8, 1, 5, -10, 7]) },
    { nome: T("grafo aciclico (es. 3.6)", "acyclic graph (Ex. 3.6)"), A: ordina([[1, 2, 7], [1, 3, 2], [2, 4, 3], [3, 2, 3], [3, 4, 1], [3, 5, 8], [4, 6, 5], [5, 4, -3], [5, 6, 7]]) },
    { nome: T("Dijkstra sbaglia (es. 3.10)", "Dijkstra fails (Ex. 3.10)"), n: 3, P: [[0, 0], [2.6, 1.2], [2.6, -1.2]], A: [[1, 2, 2], [1, 3, 3], [3, 2, -2]] },
  ].map((e) => Object.assign({ n: 6, diretto: true, s: 1, P: RIF }, e));
  const SP_DAG = 3;          // l'istanza aciclica del menu

  /** archi uscenti da ogni nodo, per indice crescente della testa: indici in A */
  const uscenti = (n, A) => {
    const L = Array.from({ length: n + 1 }, () => []);
    A.forEach(([i], q) => L[i].push(q));
    for (const l of L) l.sort((p, q) => A[p][1] - A[q][1]);
    return L;
  };
  /** un ciclo orientato (lista di nodi) fra i nodi di `resto` (ognuno ha un predecessore in resto) */
  function cicloIn(A, resto) {
    const pre = {};
    for (const [i, j] of A) if (resto.has(i) && resto.has(j) && pre[j] === undefined) pre[j] = i;
    let x = Math.min(...resto);
    const visti = new Set();
    while (!visti.has(x)) { visti.add(x); x = pre[x]; }
    const C = [x];
    for (let y = pre[x]; y !== x; y = pre[y]) C.push(y);
    return C.reverse();
  }
  /** Tutti i passi di un algoritmo (alg = "dijkstra" | "bellman-ford" | "dag") sull'istanza I da s.
   *  Ogni passo è un'istantanea {tipo, d, p, pa (arco del predecessore), perm, …}; gli archi sono in ordine
   *  lessicografico (q = indice, come a.k − 1 nel motore). */
  function spCalcola(I, s, alg) {
    const n = I.n, A = ordina(I.A), Lout = uscenti(n, A);
    const d = new Array(n + 1).fill(INF), p = new Array(n + 1).fill(0), pa = new Array(n + 1).fill(-1), perm = new Array(n + 1).fill(false);
    d[s] = 0;
    const passi = [];
    const foto = (o) => passi.push(Object.assign({ d: d.slice(), p: p.slice(), pa: pa.slice(), perm: perm.slice() }, o));
    const rilassa = (q, extra) => {
      const [i, j, w] = A[q], prima = d[j], nuovo = d[i] === INF ? INF : d[i] + w, agg = nuovo < prima;
      if (agg) { d[j] = nuovo; p[j] = i; pa[j] = q; }
      foto(Object.assign({ tipo: "rel", q, i, j, w, prima, nuovo, agg }, extra));
      return agg;
    };
    foto({ tipo: "init" });
    let ciclo = null, ord = null;
    if (alg === "dijkstra") {
      let it = 0;
      for (;;) {
        let i = 0;
        for (let v = 1; v <= n; v++) if (!perm[v] && d[v] < INF && (!i || d[v] < d[i])) i = v;
        if (!i) break;
        perm[i] = true; it++;
        foto({ tipo: "sel", i, it });
        for (const q of Lout[i]) {
          const [, j, w] = A[q];
          if (perm[j]) foto({ tipo: "rel", q, i, j, w, prima: d[j], nuovo: d[i] + w, agg: false, permanente: true, it });
          else rilassa(q, { it });
        }
      }
    } else if (alg === "bellman-ford") {
      // passata k: d^k(j) = min{ d^{k-1}(j), min_(i,j) d^{k-1}(i) + d_ij } per j = 1..n (archi entranti per coda
      // crescente; a parità la coda più piccola; il predecessore cambia solo se l'etichetta scende strettamente)
      const Lin = Array.from({ length: n + 1 }, () => []);
      A.forEach(([, j], q) => Lin[j].push(q));
      const predRiga = [{}];
      for (let k = 1; k <= n; k++) {
        const prec = d.slice(), cambio = {};
        let cambi = 0;
        for (let j = 1; j <= n; j++) {
          const entr = Lin[j].map((q) => ({ q, i: A[q][0], w: A[q][2], val: prec[A[q][0]] === INF ? INF : prec[A[q][0]] + A[q][2] }));
          let arg = -1, best = prec[j];
          for (const e of entr) if (e.val < best) { best = e.val; arg = e.q; }
          const agg = arg >= 0;
          if (agg) { d[j] = best; p[j] = A[arg][0]; pa[j] = arg; cambio[j] = A[arg][0]; cambi++; }
          foto({ tipo: "bf", k, j, entr, arg, prec, prima: prec[j], nuovo: d[j], agg });
        }
        predRiga.push(cambio);
        if (!cambi) { foto({ tipo: "pass", k, cambi, prec }); break; }
        if (k === n) {
          // il cammino di n archi letto all'indietro nella tabella, dal nodo cambiato nella passata n, e il suo primo ciclo
          const j0 = +Object.keys(cambio).map(Number).sort((x, y) => x - y)[0];
          const W = [j0];
          for (let r = n; r >= 1; r--) W.push(predRiga[r][W[W.length - 1]]);
          W.reverse();
          const visti = {};
          for (let z = 0; z < W.length && !ciclo; z++) {
            if (W[z] in visti) ciclo = W.slice(visti[W[z]], z);
            else visti[W[z]] = z;
          }
          const lungA = (u, v) => A.find((a) => a[0] === u && a[1] === v)[2];
          const lung = ciclo.reduce((acc, v, z) => acc + lungA(v, ciclo[(z + 1) % ciclo.length]), 0);
          const lungW = W.slice(1).reduce((acc, v, z) => acc + lungA(W[z], v), 0);
          foto({ tipo: "ciclo", k, j: j0, W, lungW, ciclo, lung, prec });
          break;
        }
        foto({ tipo: "pass", k, cambi, prec });
      }
    } else {
      // ordine topologico (Kahn; fra i nodi senza predecessori, l'indice più piccolo)
      const ind = new Array(n + 1).fill(0);
      for (const [, j] of A) ind[j]++;
      ord = [];
      const fatto = new Array(n + 1).fill(false);
      for (;;) {
        let v = 0;
        for (let u = 1; u <= n; u++) if (!fatto[u] && ind[u] === 0) { v = u; break; }
        if (!v) break;
        fatto[v] = true; ord.push(v);
        for (const q of Lout[v]) ind[A[q][1]]--;
      }
      if (ord.length < n) {
        const resto = new Set();
        for (let u = 1; u <= n; u++) if (!fatto[u]) resto.add(u);
        ciclo = cicloIn(A, resto);
        foto({ tipo: "topo", ord: null, ciclo });
        ord = null;
      } else {
        foto({ tipo: "topo", ord });
        ord.forEach((i, pos) => {
          perm[i] = true;
          foto({ tipo: "sel", i, pos, salta: d[i] === INF });
          if (d[i] < INF) for (const q of Lout[i]) rilassa(q, { pos });
        });
      }
    }
    if (!ciclo) {
      // l'albero dei cammini minimi e il certificato dei potenziali π_i = d(i)
      const viol = [];
      A.forEach(([i, j, w], q) => { if (d[i] < INF && d[j] - d[i] > w) viol.push(q); });
      foto({ tipo: "fine", viol });
    }
    return { passi, A, ciclo, ord, alg, s, d: d.slice(), p: p.slice() };
  }

  const SP_FUNZ = {
    dijkstra: { etichetta: "Dijkstra" },
    "bellman-ford": { etichetta: "Bellman–Ford" },
    dag: { etichetta: T("Grafo aciclico", "Acyclic graph") },
  };
  function spStato(st) {
    const D = st.dati;
    if (!D.s || D.s > D.g.n) D.s = D.g.s && D.g.s <= D.g.n ? D.g.s : 1;
    return Object.assign(N.stato(st, (I, alg) => spCalcola(I, D.s, alg), D.s), { s: D.s, alg: st.chiave() });
  }
  const arcoTex = (A, q) => `(${A[q][0]},${A[q][1]})`;
  const cicloTxt = (C) => C.concat(C[0]).join(" → ");
  const somma = (a, w) => `${a} ${w < 0 ? "-" : "+"} ${Math.abs(w)}`;

  window.GI_RICETTE["no-shortest-paths"] = {
    titolo: T("Cammini minimi: Dijkstra, Bellman–Ford, grafi aciclici", "Shortest paths: Dijkstra, Bellman–Ford, acyclic graphs"),
    funzioni: SP_FUNZ,
    etichettaFunzioni: T("Algoritmo", "Algorithm"),
    parametri: [parPasso("", 0)],          // come si usa: nella testata della pagina (interattivi.AIUTO)
    assi: false,
    opzioniBoard: M.OPZ,
    vista: [0, 400, 600, 0],
    legenda: (st) => {
      const C = M.COL(st), alg = st.chiave();
      const L = [[C.a, T("arco esaminato; nodo scelto (bordo)", "arc being examined; node selected (border)"), ""]];
      if (alg === "dijkstra") L.push([C.blu, T("etichetta permanente e arco del suo predecessore", "permanent label and arc of its predecessor"), ""], [C.b, T("etichetta temporanea finita e arco del predecessore", "finite temporary label and arc of the predecessor"), ""]);
      else L.push([C.b, T("etichetta finita e arco del predecessore", "finite label and arc of the predecessor"), ""], [C.blu, alg === "dag" ? T("nodo già elaborato; albero dei cammini minimi", "node already processed; shortest path tree") : T("albero dei cammini minimi (fine)", "shortest path tree (end)"), ""]);
      if (alg === "bellman-ford") L[0] = [C.a, T("nodo della passata (bordo) e archi entranti; pieno: quello del minimo", "node of the pass (border) and entering arcs; solid: the one of the minimum"), ""];
      L.push([C.rosso, T("ciclo negativo; arco con costo ridotto negativo", "negative cycle; arc with a negative reduced cost"), "dashed"]);
      return L;
    },
    monta(board, st) {
      const D = st.dati, alg = st.chiave();
      nuovaVoce(st);
      N.montaIstanze(st, SP_ES, {
        diretto: true, nv: 1, nomiValori: "d", nMax: 9,
        casuale: () => {
          const a = st.chiave(), dag = a === "dag", neg = a === "bellman-ford";
          const I = N.casuale({ n: [5, 7], p: 0.36, diretto: true, valori: [[1, 9]],
            prova: (G) => spCalcola(G.I, 1, "bellman-ford").d.filter((x) => x < INF).length >= G.n - 1 });
          if (!I) return null;
          if (dag) I.A = I.A.map(([i, j, w]) => (i < j ? [i, j, w] : [j, i, w]));
          if (neg) I.A = I.A.map(([i, j, w]) => [i, j, Math.random() < 0.25 ? -M.casuale(1, 4) : w]);
          return Object.assign(I, { s: 1 });
        },
        valida: (I) => (I.A.some((a) => !Number.isInteger(a[2]) || Math.abs(a[2]) > 99)
          ? T("Le lunghezze devono essere intere, fra −99 e 99.", "The lengths must be integers between −99 and 99.") : null),
        dopo: (I) => { D.s = I.s && I.s <= I.n ? I.s : 1; },
      });
      // scelto «Grafo aciclico» su un'istanza del menu con un ciclo: si propone l'istanza aciclica
      // (non se l'istanza viene dall'indirizzo, #ist=…)
      if (D.algIst === undefined) D.istURL = /ist=\d/.test(decodeURIComponent(location.hash || ""));
      if (alg === "dag" && D.algIst !== undefined && D.algIst !== alg && !D.istURL && D.g.es >= 0 && spCalcola(D.g, 1, "dag").ciclo) {
        D.g = Object.assign(N.copia(SP_ES[SP_DAG]), { id: N.nuovoId(), es: SP_DAG });
        D.s = SP_ES[SP_DAG].s;
      }
      D.algIst = alg;
      osservaDimensioni(board, st);
      daIndirizzo(st);
    },
    aggiorna(board, st) {
      const S = spStato(st), D = S.D, C = M.COL(st), [W, H] = dim(board), { R, k, K, P, alg } = S;
      N.allinea(st, SP_ES);
      N.menu(st, T("sorgente", "source"), Array.from({ length: D.g.n }, (_, i) => [i + 1, T("Sorgente: s = ", "Source: s = ") + (i + 1)]), S.s,
        (v) => { D.s = +v; vaiA(st, 0); st.aggiorna(); });
      const G = N.grafo(Object.assign({}, D.g, { A: R.A }));
      M.ridisegna(board, st, [D.g.id, alg, S.s, k, M.scuro(), W, H].join("|"), (crea) => {
        pix(board);
        const d = disegno(crea, H), t = P.tipo, fine = t === "fine", cic = !!(t === "ciclo" || (t === "topo" && P.ciclo));
        const Cset = new Set(cic ? P.ciclo.map((v, z) => v + "-" + P.ciclo[(z + 1) % P.ciclo.length]) : []), Cnod = new Set(cic ? P.ciclo : []);
        const viol = new Set(fine ? P.viol : []);
        const entr = new Set(t === "bf" ? P.entr.map((e) => e.q) : []);
        const strip = alg === "dag" && R.ord ? 46 : 0, fondo = 30 + strip;
        N.disegnaGrafo(d, G, { x: 8, y: 6, w: W - 16, h: H - fondo - 6 }, {
          arco: (a) => {
            const q = a.k - 1, j = a.j, pred = P.pa[j] === q;
            let s = { colore: C.muted, spessore: 1.6, opacita: 0.75, etichetta: String(a.v[0]) };
            if (fine && P.d[a.i] < INF) {
              // il costo ridotto c̄_ij = d_ij − π_i + π_j con π = −d
              const cb = a.v[0] + P.d[a.i] - P.d[j];
              s = Object.assign(s, { etichetta: String(cb), colEt: cb < 0 ? C.rosso : cb === 0 ? C.blu : C.muted, grassetto: cb <= 0 });
            }
            if (pred) s = Object.assign(s, alg === "dijkstra" && P.perm[j] ? { colore: C.blu, spessore: 3.2, opacita: 1 } : { colore: C.b, spessore: 3, opacita: 1 });
            if (fine && pred && !viol.size) s = Object.assign(s, { colore: C.blu, spessore: 4, opacita: 1 });
            if (entr.has(q)) s = Object.assign(s, q === P.arg ? { colore: C.a, spessore: 4.2, opacita: 1, colEt: C.a, grassetto: true } : { colore: C.a, spessore: 2.2, opacita: 1, dash: 3, colEt: C.a });
            if (P.q === q && t === "rel") s = Object.assign(s, { colore: C.a, spessore: 4.2, opacita: 1, colEt: C.a, grassetto: true, dash: P.permanente ? 3 : 0 });
            if (Cset.has(a.i + "-" + a.j)) s = Object.assign(s, { colore: C.rosso, spessore: 4, opacita: 1, colEt: C.rosso, grassetto: true });
            if (viol.has(q)) s = Object.assign(s, { colore: C.rosso, spessore: 3.6, opacita: 1, dash: 3, colEt: C.rosso, grassetto: true });
            return s;
          },
          nodo: (i) => {
            const fin = P.d[i] < INF;
            let s = {};
            if (fin) s = { fondo: C.b, opacita: 0.25, bordo: C.b, spessore: 2.4 };
            if ((alg === "dijkstra" && P.perm[i]) || (fine && fin && !viol.size)) s = { fondo: C.blu, opacita: 0.85, bordo: C.blu, spessore: 2.4, testo: "#ffffff" };
            if (alg === "dag" && P.perm[i] && !fine) s = fin ? { fondo: C.blu, opacita: 0.85, bordo: C.blu, spessore: 2.4, testo: "#ffffff" } : { fondo: C.grigio, opacita: 0.5, bordo: C.grigio, spessore: 2 };
            if (Cnod.has(i)) s = { fondo: C.rosso, opacita: 0.22, bordo: C.rosso, spessore: 3 };
            if (((t === "sel" || t === "rel") && P.i === i) || ((t === "bf" || t === "ciclo") && P.j === i)) s = Object.assign({}, s, { bordo: C.a, spessore: 4.5 });
            return s;
          },
          fuori: (i) => {
            if (t === "topo" && cic) return null;
            const ag = ((t === "rel" || t === "bf") && P.agg && P.j === i) || (t === "ciclo" && P.j === i);
            return { testo: `(${vTxt(P.d[i])}, ${P.p[i] || "–"})`, colore: ag ? C.a : P.d[i] < INF ? C.viola : C.muted };
          },
        }, C);
        d.line(10, H - fondo + 2, W - 10, H - fondo + 2, { strokeColor: C.line, strokeWidth: 1.2 });
        if (strip) {
          const ord = R.ord, bw = clamp((W - 300) / ord.length, 30, 48), x0 = 190, y0 = H - fondo + 10;
          d.text(14, y0 + 14, T("ordine topologico:", "topological order:"), { anchorX: "left", fontSize: 13, strokeColor: C.muted, cssStyle: "font-style:italic" });
          const cur = (t === "sel" || t === "rel") ? ord.indexOf(P.i) : -1;
          ord.forEach((v, z) => {
            const fatto = P.perm[v], att = z === cur;
            d.rect(x0 + z * bw, y0, bw - 4, 28, { strokeColor: att ? C.a : fatto ? C.blu : C.b, strokeWidth: att ? 2.8 : 1.4, fillColor: att ? C.a : fatto ? C.blu : "none", fillOpacity: att ? 0.3 : fatto ? 0.18 : 0 });
            d.text(x0 + z * bw + (bw - 4) / 2, y0 + 14, String(v), { fontSize: 14, strokeColor: C.testo, cssStyle: "font-weight:800" });
          });
        }
        let pie = fine ? T("accanto ai nodi: (d(i), pred(i)); sugli archi: i costi ridotti c̄ᵢⱼ = dᵢⱼ − πᵢ + πⱼ, con π = −d", "next to the nodes: (d(i), pred(i)); on the arcs: the reduced costs c̄ᵢⱼ = dᵢⱼ − πᵢ + πⱼ, with π = −d")
          : T("accanto ai nodi: (d(i), pred(i)); sugli archi: le lunghezze dᵢⱼ", "next to the nodes: (d(i), pred(i)); on the arcs: the lengths dᵢⱼ");
        if (P.k) pie += T(` · passata ${P.k}`, ` · pass ${P.k}`);
        if (P.it) pie += T(` · iterazione ${P.it}`, ` · iteration ${P.it}`);
        d.text(14, H - 12, pie, { anchorX: "left", fontSize: 12, strokeColor: C.muted, cssStyle: "font-style:italic" });
        d.text(W - 14, H - 12, T(`passo ${k} di ${K}`, `step ${k} of ${K}`), { anchorX: "right", fontSize: 12.5, strokeColor: C.muted });
      });
    },
    formula(p, st) {
      const S = spStato(st), { R, P, alg } = S, A = R.A, t = P.tipo;
      if (t === "init") return alg === "bellman-ford" ? `d^0(${S.s}) = 0, \\quad d^0(j) = +\\infty \\ (j \\ne ${S.s})` : `d(${S.s}) = 0, \\quad d(j) = +\\infty \\ (j \\ne ${S.s})`;
      if (t === "sel") {
        if (alg === "dijkstra") return `d(${P.i}) = \\min\\{ d(j) : j \\text{ ${T("temporaneo", "temporary")}} \\} = ${P.d[P.i]} \\;\\Rightarrow\\; ${P.i} \\text{ ${T("diventa permanente", "becomes permanent")}}`;
        return P.salta ? `d(${P.i}) = +\\infty: \\text{ ${T("nodo saltato", "node skipped")}}`
          : `\\text{${T("nodo", "node")} } ${P.i} \\ (${T("posizione", "position")}\\ ${P.pos + 1}): \\ d(${P.i}) = ${P.d[P.i]}`;
      }
      if (t === "rel") {
        const { i, j, w, prima, nuovo, agg } = P;
        if (P.permanente) return `${j} \\text{ ${T("è permanente: l'arco", "is permanent: the arc")} } (${i},${j}) \\text{ ${T("non si usa", "is not used")}}`;
        return `d(${i}) + d_{${i}${j}} = ${somma(P.d[i], w)} = ${nuovo} ` +
          (agg ? `< d(${j}) = ${vTex(prima)} \\;\\Rightarrow\\; d(${j}) := ${nuovo},\\ ${PRED}(${j}) := ${i}` : `\\ge d(${j}) = ${vTex(prima)}`);
      }
      if (t === "bf") {
        const k = P.k, termini = [vTex(P.prima)].concat(P.entr.map((e) => (e.val === INF ? "+\\infty" : `${somma(P.prec[e.i], e.w)}`)));
        return `d^{${k}}(${P.j}) = \\min\\{${termini.join(",\\ ")}\\} = ${vTex(P.nuovo)}` + (P.agg ? `,\\ \\ ${PRED}(${P.j}) := ${A[P.arg][0]}` : "");
      }
      if (t === "pass") return `d^{${P.k}} = d^{${P.k - 1}} \\;\\Rightarrow\\; \\text{STOP}`;
      if (t === "ciclo") return `d^{${P.k}}(${P.j}) < d^{${P.k - 1}}(${P.j}): \\ W = ${P.W.join(",")}, \\ \\ C = ${P.ciclo.concat(P.ciclo[0]).join(",")},\\ d(C) = ${P.lung}`;
      if (t === "topo") return P.ciclo ? `\\text{${T("ciclo", "cycle")} } ${P.ciclo.concat(P.ciclo[0]).join(",")}: \\text{ ${T("nessun ordine topologico", "no topological order")}}`
        : `\\text{${T("ordine topologico", "topological order")}: } ${P.ord.join(",\\ ")}`;
      return P.viol.length ? `\\bar{c}_{ij} = d_{ij} - \\pi_i + \\pi_j < 0 \\text{ ${T("per", "for")} } ${P.viol.map((q) => arcoTex(A, q)).join(",\\ ")}`
        : `\\pi_i = -d(i): \\quad \\bar{c}_{ij} = d_{ij} - \\pi_i + \\pi_j \\ge 0 \\ \\ \\forall (i,j) \\in A` + (R.d.slice(1).some((x) => x === INF) ? T(" \\text{ con } d(i) < +\\infty", " \\text{ with } d(i) < +\\infty") : "");
    },
    letture(p, st) {
      const S = spStato(st), { R, P, alg } = S, A = R.A, C = M.COL(st), n = st.dati.g.n, t = P.tipo;
      let nota = "";
      if (t === "init") {
        nota = { dijkstra: T(`\\(d(${S.s}) = 0\\), le altre etichette \\(+\\infty\\), tutti i nodi temporanei. A ogni iterazione il nodo temporaneo con l'etichetta più piccola diventa ${M.tinta(C.blu, "permanente")} (a parità, l'indice più piccolo); poi si aggiornano i suoi archi verso nodi temporanei. Serve \\(d_{ij} \\ge 0\\).`,
          `\\(d(${S.s}) = 0\\), the other labels \\(+\\infty\\), all nodes temporary. At each iteration the temporary node with the smallest label becomes ${M.tinta(C.blu, "permanent")} (ties: smallest index); then its arcs to temporary nodes are updated. It needs \\(d_{ij} \\ge 0\\).`),
        "bellman-ford": T(`La passata \\(k\\) calcola, per ogni nodo \\(j\\), \\(d^k(j)\\): il cammino più corto con al più \\(k\\) archi, dalle etichette \\(d^{k-1}\\) della passata precedente. Stop se \\(d^k = d^{k-1}\\); un cambiamento nella passata \\(n = ${n}\\) rivela un ciclo negativo.`,
          `Pass \\(k\\) computes, for every node \\(j\\), \\(d^k(j)\\): the shortest walk with at most \\(k\\) arcs, from the labels \\(d^{k-1}\\) of the previous pass. Stop if \\(d^k = d^{k-1}\\); a change in pass \\(n = ${n}\\) reveals a negative cycle.`),
        dag: T(`Passo 0: un ordine topologico (si toglie ogni volta un nodo senza archi entranti, l'indice più piccolo). Poi si elaborano i nodi in quell'ordine, ciascuno con i suoi archi uscenti; le lunghezze possono essere negative.`,
          `Step 0: a topological order (repeatedly remove a node without entering arcs, the smallest index). Then the nodes are processed in that order, each with its leaving arcs; the lengths may be negative.`) }[alg];
      } else if (t === "sel") {
        nota = alg === "dijkstra" ? T(`L'etichetta temporanea più piccola è \\(d(${P.i}) = ${P.d[P.i]}\\): il nodo ${M.tinta(C.a, String(P.i))} diventa ${M.tinta(C.blu, "permanente")}. Poi: i suoi archi uscenti.`,
          `The smallest temporary label is \\(d(${P.i}) = ${P.d[P.i]}\\): node ${M.tinta(C.a, String(P.i))} becomes ${M.tinta(C.blu, "permanent")}. Next: its leaving arcs.`)
          : P.salta ? T(`Il nodo ${P.i} ha \\(d(${P.i}) = +\\infty\\): non è raggiungibile da \\(s\\) e si salta.`, `Node ${P.i} has \\(d(${P.i}) = +\\infty\\): it is not reachable from \\(s\\) and is skipped.`)
            : T(`Nodo ${M.tinta(C.a, String(P.i))}, posizione ${P.pos + 1} dell'ordine: gli archi entranti in ${P.i} sono già stati elaborati, quindi \\(d(${P.i}) = ${P.d[P.i]}\\) è definitiva.`,
              `Node ${M.tinta(C.a, String(P.i))}, position ${P.pos + 1} of the order: the arcs entering ${P.i} have already been processed, so \\(d(${P.i}) = ${P.d[P.i]}\\) is final.`);
      } else if (t === "rel") {
        nota = P.permanente ? T(`Arco \\(${arcoTex(A, P.q)}\\): il nodo ${P.j} è già permanente e la sua etichetta non si aggiorna` + (P.nuovo < P.prima ? `, anche se \\(${P.nuovo} < ${P.prima}\\): con un arco negativo Dijkstra può sbagliare.` : "."),
          `Arc \\(${arcoTex(A, P.q)}\\): node ${P.j} is already permanent and its label is not updated` + (P.nuovo < P.prima ? `, even if \\(${P.nuovo} < ${P.prima}\\): with a negative arc Dijkstra can fail.` : "."))
          : P.agg ? T(`Arco ${M.tinta(C.a, `\\(${arcoTex(A, P.q)}\\)`)}: ${M.tinta(C.a, `\\(d(${P.j}) := ${P.nuovo}\\), \\(${PRED}(${P.j}) := ${P.i}\\)`)}.`, `Arc ${M.tinta(C.a, `\\(${arcoTex(A, P.q)}\\)`)}: ${M.tinta(C.a, `\\(d(${P.j}) := ${P.nuovo}\\), \\(${PRED}(${P.j}) := ${P.i}\\)`)}.`)
            : T(`Arco \\(${arcoTex(A, P.q)}\\): \\(${P.nuovo} \\ge d(${P.j}) = ${vTex(P.prima)}\\), nessun aggiornamento.`, `Arc \\(${arcoTex(A, P.q)}\\): \\(${P.nuovo} \\ge d(${P.j}) = ${vTex(P.prima)}\\), no update.`);
      } else if (t === "bf") {
        nota = (P.entr.length ? T(`Passata ${P.k}, nodo ${M.tinta(C.a, String(P.j))}: si confrontano \\(d^{${P.k - 1}}(${P.j})\\) e gli archi entranti ${P.entr.map((e) => `\\((${e.i},${P.j})\\)`).join(", ")} (tratteggiati). `,
          `Pass ${P.k}, node ${M.tinta(C.a, String(P.j))}: compare \\(d^{${P.k - 1}}(${P.j})\\) with the entering arcs ${P.entr.map((e) => `\\((${e.i},${P.j})\\)`).join(", ")} (dashed). `)
          : T(`Passata ${P.k}, nodo ${P.j}: nessun arco entrante. `, `Pass ${P.k}, node ${P.j}: no entering arc. `))
          + (P.agg ? T(`L'etichetta scende a ${M.tinta(C.a, `\\(${P.nuovo}\\)`)} con l'arco \\(${arcoTex(A, P.arg)}\\).`, `The label drops to ${M.tinta(C.a, `\\(${P.nuovo}\\)`)} with the arc \\(${arcoTex(A, P.arg)}\\).`)
            : T(`Nessun miglioramento: \\(d^{${P.k}}(${P.j}) = ${vTex(P.nuovo)}\\).`, `No improvement: \\(d^{${P.k}}(${P.j}) = ${vTex(P.nuovo)}\\).`));
      } else if (t === "pass") {
        nota = T(`La passata ${P.k} ripete le etichette della passata ${P.k - 1}: STOP, le etichette sono le distanze (${P.k} passate, al più \\(n = ${n}\\)).`, `Pass ${P.k} repeats the labels of pass ${P.k - 1}: STOP, the labels are the distances (${P.k} passes, at most \\(n = ${n}\\)).`);
      } else if (t === "ciclo") {
        nota = T(`Nella passata \\(n = ${n}\\) l'etichetta di ${P.j} scende ancora: un ${M.tinta(C.rosso, "ciclo negativo")} è raggiungibile da \\(s\\). Leggendo i predecessori all'indietro, una riga per passata, si ha il cammino \\(${P.W.join(",")}\\) di \\(n\\) archi e lunghezza \\(${P.lungW}\\); contiene il ciclo ${P.ciclo.concat(P.ciclo[0]).join(", ")}, di lunghezza \\(${P.lung}\\).`,
          `In pass \\(n = ${n}\\) the label of ${P.j} drops again: a ${M.tinta(C.rosso, "negative cycle")} is reachable from \\(s\\). Reading the predecessors backwards, one row per pass, gives the walk \\(${P.W.join(",")}\\) with \\(n\\) arcs and length \\(${P.lungW}\\); it contains the cycle ${P.ciclo.concat(P.ciclo[0]).join(", ")}, of length \\(${P.lung}\\).`);
      } else if (t === "topo") {
        nota = P.ciclo ? T(`Il grafo ha il ciclo ${M.tinta(C.rosso, P.ciclo.concat(P.ciclo[0]).join(", "))}: non ha un ordine topologico. Scegli l'istanza «grafo aciclico».`,
          `The graph has the cycle ${M.tinta(C.rosso, P.ciclo.concat(P.ciclo[0]).join(", "))}: it has no topological order. Choose the instance «acyclic graph».`)
          : T(`Ordine topologico: ${lista(P.ord)}. Ogni arco va avanti nell'ordine.`, `Topological order: ${lista(P.ord)}. Every arc goes forward in the order.`);
      } else {
        nota = P.viol.length ? T(`Le etichette ${M.tinta(C.rosso, "non sono ottime")}: con \\(\\pi = -d\\) l'arco \\(${arcoTex(A, P.viol[0])}\\) ha costo ridotto negativo. Prova Bellman–Ford.`,
          `The labels ${M.tinta(C.rosso, "are not optimal")}: with \\(\\pi = -d\\) the arc \\(${arcoTex(A, P.viol[0])}\\) has a negative reduced cost. Try Bellman–Ford.`)
          : T(`${M.tinta(C.blu, "Albero dei cammini minimi")}: con \\(\\pi_i = -d(i)\\) ogni \\(\\bar{c}_{ij} \\ge 0\\) e gli archi dell'albero sono tesi, il certificato di ottimalità.`,
            `${M.tinta(C.blu, "Shortest path tree")}: with \\(\\pi_i = -d(i)\\) every \\(\\bar{c}_{ij} \\ge 0\\) and the tree arcs are tight, the certificate of optimality.`);
      }
      // tabella trasposta (una colonna per nodo): sta nel pannello senza scorrere
      const hl = t === "sel" || t === "rel" ? (t === "sel" ? P.i : P.j) : (t === "bf" || t === "ciclo") ? P.j : -1;
      const fermo = (i) => (t === "fine" ? P.d[i] < INF && !P.viol.length : alg === "bellman-ford" ? false : P.perm[i]);
      const cella = (i, s) => {
        const sty = (i === hl ? `background:color-mix(in srgb, ${C.a} 20%, transparent);` : "") + (fermo(i) ? `color:${C.blu};font-weight:700;` : "");
        return `<td style="text-align:center;${sty}">${s}</td>`;
      };
      const num = (x) => (x === INF ? "∞" : `\\(${x}\\)`);
      const riga = (nome, f) => `<tr><th style="text-align:left">${nome}</th>` + Array.from({ length: n }, (_, z) => cella(z + 1, f(z + 1))).join("") + "</tr>";
      let tab = `<table class="gi-tabella">` + riga("\\(i\\)", (i) => `<strong>${i}</strong>`);
      if (alg === "bellman-ford" && P.prec) tab += riga(`\\(d^{${P.k - 1}}\\)`, (i) => num(P.prec[i]));
      if (t !== "fine") tab += riga(alg === "bellman-ford" && P.prec ? `\\(d^{${P.k}}\\)` : "\\(d(i)\\)", (i) => (alg === "bellman-ford" && P.prec && t === "bf" && i > P.j ? "" : num(P.d[i])));
      if (t === "fine") tab += riga("\\(\\pi_i\\)", (i) => (P.d[i] === INF ? "" : `\\(${-P.d[i] || 0}\\)`));
      tab += riga(`\\(${PRED}(i)\\)`, (i) => (P.p[i] ? String(P.p[i]) : "–")) + "</table>";
      if (t !== "fine" && alg !== "bellman-ford") tab += `<p style="margin:.2em 0;font-size:.9em;color:${C.muted}">${alg === "dijkstra" ? T("in blu: etichette permanenti", "in blue: permanent labels") : T("in blu: nodi già elaborati", "in blue: nodes already processed")}</p>`;
      return nota + tab;
    },
    domanda: T("Con le lunghezze d′ (d′₅₄ = −3), Dijkstra sbaglia l'etichetta di quali nodi? Quale arco ha costo ridotto negativo alla fine? Esegui Bellman–Ford sulla stessa istanza: dopo quante passate si ferma?",
      "With the lengths d′ (d′₅₄ = −3), which labels does Dijkstra get wrong? Which arc has a negative reduced cost at the end? Run Bellman–Ford on the same instance: after how many passes does it stop?"),
  };

  // =================================================================
  // 2. FLUSSO MASSIMO: FORD-FULKERSON ED EDMONDS-KARP
  // =================================================================
  const MF_ES = [
    { nome: T("grafo di riferimento (s = 1, t = 6)", "reference graph (s = 1, t = 6)"), A: conPesi(ARCHI_RIF, [5, 4, 3, 2, 4, 2, 4, 2, 3]) },
  ].map((e) => Object.assign({ n: 6, diretto: true, s: 1, t: 6, P: RIF }, e));

  /** archi della rete residua per il flusso x: {da, a, r, q (arco di G), dir (+1 avanti, −1 indietro)},
   *  per coda e poi per testa crescente (senza archi opposti in G, al più un arco residuo per coppia) */
  function residua(A, x) {
    const R = [];
    A.forEach(([i, j, u], q) => {
      if (u - x[q] > 0) R.push({ da: i, a: j, r: u - x[q], q, dir: 1 });
      if (x[q] > 0) R.push({ da: j, a: i, r: x[q], q, dir: -1 });
    });
    return R.sort((e, f) => e.da - f.da || e.a - f.a || f.dir - e.dir);
  }
  /** un cammino da s a t nella rete residua: "bfs" (Edmonds-Karp) o "dfs" (Ford-Fulkerson).
   *  {vis (nodi raggiunti, in ordine), albero (archi residui usati), cammino (archi residui) o null} */
  function cerca(n, s, t, Res, modo) {
    const out = Array.from({ length: n + 1 }, () => []);
    Res.forEach((e) => out[e.da].push(e));
    const pre = new Array(n + 1).fill(null), vis = [s], visto = new Array(n + 1).fill(false);
    visto[s] = true;
    if (modo === "bfs") {
      const coda = [s];
      while (coda.length && !visto[t]) {
        const v = coda.shift();
        for (const e of out[v]) if (!visto[e.a]) { visto[e.a] = true; pre[e.a] = e; vis.push(e.a); coda.push(e.a); if (e.a === t) break; }
      }
    } else {
      const dfs = (v) => {
        if (v === t) return true;
        for (const e of out[v]) if (!visto[e.a]) { visto[e.a] = true; pre[e.a] = e; vis.push(e.a); if (dfs(e.a)) return true; }
        return false;
      };
      dfs(s);
    }
    const albero = vis.slice(1).map((v) => pre[v]);
    if (!visto[t]) return { vis, albero, cammino: null };
    const cammino = [];
    for (let v = t; v !== s; v = pre[v].da) cammino.unshift(pre[v]);
    return { vis, albero, cammino };
  }
  /** tutti i passi: per ogni aumento «cammino», «collo», «agg»; alla fine «taglio» */
  function mfCalcola(I, s, t, modo) {
    const A = ordina(I.A), x = new Array(A.length).fill(0), passi = [];
    let v = 0, h = 0;
    passi.push({ tipo: "init", x: x.slice(), v, h, Res: residua(A, x) });
    for (let guard = 0; guard < 500; guard++) {
      const Res = residua(A, x), c = cerca(I.n, s, t, Res, modo);
      if (!c.cammino) {
        const S = new Set(c.vis), avanti = [], indietro = [];
        A.forEach(([i, j], q) => { if (S.has(i) && !S.has(j)) avanti.push(q); if (!S.has(i) && S.has(j)) indietro.push(q); });
        passi.push({ tipo: "taglio", x: x.slice(), v, h, Res, vis: c.vis, albero: c.albero, S: [...S].sort((a, b) => a - b), avanti, indietro, cap: avanti.reduce((acc, q) => acc + A[q][2], 0) });
        break;
      }
      h++;
      passi.push({ tipo: "cammino", x: x.slice(), v, h, Res, vis: c.vis, albero: c.albero, cammino: c.cammino });
      const delta = Math.min(...c.cammino.map((e) => e.r));
      passi.push({ tipo: "collo", x: x.slice(), v, h, Res, cammino: c.cammino, delta });
      const prima = x.slice();
      for (const e of c.cammino) x[e.q] += e.dir * delta;
      v += delta;
      passi.push({ tipo: "agg", x: x.slice(), v, h, Res: residua(A, x), cammino: c.cammino, delta, prima });
    }
    const ult = passi[passi.length - 1];
    return { passi, A, s, t, modo, v: ult.v, aumenti: h, x: ult.x, S: ult.S, cap: ult.cap };
  }
  const MF_FUNZ = {
    "edmonds-karp": { etichetta: T("Edmonds–Karp (ampiezza)", "Edmonds–Karp (BFS)") },
    "ford-fulkerson": { etichetta: T("Ford–Fulkerson (profondità)", "Ford–Fulkerson (DFS)") },
  };
  function mfStato(st) {
    const D = st.dati, n = D.g.n;
    if (!D.s || D.s > n) D.s = D.g.s && D.g.s <= n ? D.g.s : 1;
    if (!D.t || D.t > n || D.t === D.s) D.t = D.g.t && D.g.t <= n && D.g.t !== D.s ? D.g.t : (D.s === n ? 1 : n);
    const modo = st.chiave() === "ford-fulkerson" ? "dfs" : "bfs";
    return Object.assign(N.stato(st, (I) => mfCalcola(I, D.s, D.t, modo), D.s + "-" + D.t), { s: D.s, t: D.t, modo });
  }
  const camminoTxt = (C) => [C[0].da].concat(C.map((e) => e.a)).join(" → ");
  const camminoTex = (C) => [C[0].da].concat(C.map((e) => e.a)).join(" \\to ");

  window.GI_RICETTE["no-max-flow"] = {
    titolo: T("Flusso massimo: Ford–Fulkerson ed Edmonds–Karp", "Maximum flow: Ford–Fulkerson and Edmonds–Karp"),
    funzioni: MF_FUNZ,
    etichettaFunzioni: T("Algoritmo", "Algorithm"),
    parametri: [parPasso("", 0)],          // come si usa: nella testata della pagina (interattivi.AIUTO)
    assi: false,
    opzioniBoard: M.OPZ,
    vista: [0, 400, 600, 0],
    legenda: (st) => {
      const C = M.COL(st);
      return [
        [C.a, T("cammino aumentante; archi aggiornati", "augmenting path; updated arcs"), ""],
        [C.rosso, T("collo di bottiglia; archi del taglio minimo", "bottleneck; arcs of the minimum cut"), ""],
        [C.b, T("archi con flusso; visita della rete residua", "arcs with flow; search of the residual network"), ""],
        [C.blu, T("insieme \\(S\\) del taglio minimo", "set \\(S\\) of the minimum cut"), "punto"],
        [C.muted, T("arco residuo all'indietro, \\(r_{ji} = x_{ij}\\)", "backward residual arc, \\(r_{ji} = x_{ij}\\)"), "dashed"],
      ];
    },
    monta(board, st) {
      const D = st.dati;
      nuovaVoce(st);
      N.montaIstanze(st, MF_ES, {
        diretto: true, nv: 1, nomiValori: "u", nMax: 9, ritmo: 1000,
        casuale: () => {
          const I = N.casuale({ n: [5, 7], p: 0.4, diretto: true, valori: [[1, 9]],
            prova: (G) => { const R = mfCalcola(G.I, 1, G.n, "bfs"); return R.aumenti >= 3 && R.v > 0; } });
          return I ? Object.assign(I, { s: 1, t: I.n }) : null;
        },
        valida: (I) => {
          if (I.A.some((a) => !Number.isInteger(a[2]) || a[2] < 1 || a[2] > 99)) return T("Le capacità devono essere intere, fra 1 e 99.", "The capacities must be integers between 1 and 99.");
          if (I.A.some(([i, j]) => I.A.some(([a, b]) => a === j && b === i))) return T("Niente archi opposti (i,j) e (j,i): la rete residua li confonderebbe.", "No opposite arcs (i,j) and (j,i): the residual network would mix them up.");
          return null;
        },
        dopo: (I) => { D.s = I.s && I.s <= I.n ? I.s : 1; D.t = I.t && I.t <= I.n && I.t !== D.s ? I.t : (D.s === I.n ? 1 : I.n); },
      });
      osservaDimensioni(board, st);
      daIndirizzo(st);
    },
    aggiorna(board, st) {
      const S = mfStato(st), D = S.D, C = M.COL(st), [W, H] = dim(board), { R, k, K, P, modo } = S, n = D.g.n;
      N.allinea(st, MF_ES);
      const nodi = Array.from({ length: n }, (_, i) => i + 1);
      N.menu(st, T("sorgente", "source"), nodi.filter((i) => i !== S.t).map((i) => [i, T("Sorgente: s = ", "Source: s = ") + i]), S.s, (v) => { D.s = +v; vaiA(st, 0); st.aggiorna(); });
      N.menu(st, T("pozzo", "sink"), nodi.filter((i) => i !== S.s).map((i) => [i, T("Pozzo: t = ", "Sink: t = ") + i]), S.t, (v) => { D.t = +v; vaiA(st, 0); st.aggiorna(); });
      const A = R.A, G = N.grafo(Object.assign({}, D.g, { A })), uMax = Math.max(...A.map((a) => a[2]));
      M.ridisegna(board, st, [D.g.id, modo, S.s, S.t, k, M.scuro(), W, H].join("|"), (crea) => {
        pix(board);
        const d = disegno(crea, H), t = P.tipo, taglio = t === "taglio";
        const Sset = new Set(taglio ? P.S : []), visSet = new Set(t === "cammino" ? P.vis : []);
        const chiave = (e) => e.da + "-" + e.a;
        const camm = new Set((P.cammino || []).map(chiave)), sulG = new Set((P.cammino || []).map((e) => e.q));
        const alb = new Set((P.albero || []).map(chiave));
        // registro degli aumenti (sotto le due reti): uno per riga, gli ultimi 6
        const aumenti = R.passi.slice(0, k + 1).filter((x) => x.tipo === "agg");
        const inCorso = t === "cammino" || t === "collo" ? P : null;
        const righeLog = aumenti.map((x) => [T(`iterazione ${x.h}: cammino ${camminoTxt(x.cammino)}, δ = ${x.delta}, v = ${x.v}`, `iteration ${x.h}: path ${camminoTxt(x.cammino)}, δ = ${x.delta}, v = ${x.v}`), x === P ? C.a : C.testo]);
        if (inCorso) righeLog.push([T(`iterazione ${P.h}: cammino ${camminoTxt(P.cammino)}`, `iteration ${P.h}: path ${camminoTxt(P.cammino)}`) + (t === "collo" ? `, δ = ${P.delta}` : ""), C.a]);
        if (taglio) righeLog.push([T(`taglio (S, N∖S) con S = {${P.S.join(", ")}}: u(S, N∖S) = ${P.avanti.map((q) => A[q][2]).join(" + ")} = ${P.cap} = v`, `cut (S, N∖S) with S = {${P.S.join(", ")}}: u(S, N∖S) = ${P.avanti.map((q) => A[q][2]).join(" + ")} = ${P.cap} = v`), C.rosso]);
        const vis6 = righeLog.slice(H < 480 ? -4 : -6), lh = H < 480 ? 18 : 21, logH = 12 + lh * Math.max(1, vis6.length), fondo = 24;
        const hG = H - logH - fondo, w2 = (W - 24) / 2;
        const etST = (i) => (i === S.s ? { testo: "s", colore: C.muted } : i === S.t ? { testo: "t", colore: C.muted } : null);
        const nodoBase = (i) => {
          if (Sset.has(i)) return { fondo: C.blu, opacita: 0.85, bordo: C.blu, spessore: 2.6, testo: "#ffffff" };
          return i === S.s || i === S.t ? { bordo: C.testo, spessore: 3 } : {};
        };
        // --------------------------------------------------- a sinistra: la rete G con il flusso x_ij / u_ij
        d.text(14, 14, T(`rete G: flusso xᵢⱼ / uᵢⱼ, valore v = ${P.v}`, `network G: flow xᵢⱼ / uᵢⱼ, value v = ${P.v}`),
          { anchorX: "left", fontSize: 13.5, strokeColor: C.muted, cssStyle: "font-style:italic;font-weight:600" });
        N.disegnaGrafo(d, G, { x: 6, y: 22, w: w2, h: hG - 22 }, {
          margine: 22,
          arco: (a) => {
            const q = a.k - 1, x = P.x[q], u = a.v[0];
            let s = { colore: C.muted, spessore: 1.6, opacita: 0.75, etichetta: `${x}/${u}` };
            if (x > 0) s = Object.assign(s, { colore: C.b, spessore: 2 + 3 * x / uMax, opacita: 1 });
            if (t === "agg" && sulG.has(q)) s = Object.assign(s, { colore: C.a, spessore: 4.2, opacita: 1, colEt: C.a, grassetto: true });
            if (taglio && P.avanti.includes(q)) s = Object.assign(s, { colore: C.rosso, spessore: 4.2, opacita: 1, colEt: C.rosso, grassetto: true });
            if (taglio && P.indietro.includes(q)) s = Object.assign(s, { colore: C.rosso, spessore: 2.2, opacita: 1, dash: 3, colEt: C.rosso });
            return s;
          },
          nodo: nodoBase, fuori: etST,
        }, C);
        d.line(w2 + 12, 8, w2 + 12, hG - 4, { strokeColor: C.line, strokeWidth: 1.4 });
        // --------------------------------------------------- a destra: la rete residua G(x)
        const Gr = N.grafo({ n, diretto: true, P: D.g.P, A: P.Res.map((e) => [e.da, e.a, e.r, e.dir, e.q]) });
        const nomeV = modo === "bfs" ? T("visita in ampiezza", "breadth-first search") : T("visita in profondità", "depth-first search");
        let cap2 = T("rete residua G(x): rᵢⱼ", "residual network G(x): rᵢⱼ");
        if (t === "cammino" || taglio) cap2 += ` · ${nomeV}`;
        if (t === "collo") cap2 += T(` · collo di bottiglia δ = ${P.delta}`, ` · bottleneck δ = ${P.delta}`);
        d.text(w2 + 26, 14, cap2, { anchorX: "left", fontSize: 13.5, strokeColor: C.muted, cssStyle: "font-style:italic;font-weight:600" });
        N.disegnaGrafo(d, Gr, { x: w2 + 18, y: 22, w: w2, h: hG - 22 }, {
          margine: 22, curva: 0.3,
          arco: (a) => {
            const key = a.i + "-" + a.j, back = a.v[1] < 0;
            let s = { colore: C.muted, spessore: 1.6, opacita: 0.8, dash: back ? 3 : 0, etichetta: String(a.v[0]) };
            if (alb.has(key)) s = Object.assign(s, { colore: C.b, spessore: 3, opacita: 1 });
            if (camm.has(key)) s = Object.assign(s, { colore: C.a, spessore: 4.2, opacita: 1, colEt: C.a, grassetto: true });
            if (t === "collo" && camm.has(key) && a.v[0] === P.delta) s = Object.assign(s, { colore: C.rosso, spessore: 4.6, colEt: C.rosso });
            return s;
          },
          nodo: (i) => {
            const s = nodoBase(i);
            if (visSet.has(i)) return Object.assign({ fondo: C.b, opacita: 0.28 }, s, { bordo: i === S.s || i === S.t ? C.testo : C.b, spessore: i === S.s || i === S.t ? 3 : 2.6 });
            return s;
          },
          fuori: etST,
        }, C);
        // --------------------------------------------------- in basso: il registro degli aumenti
        d.line(10, hG + 2, W - 10, hG + 2, { strokeColor: C.line, strokeWidth: 1.2 });
        if (!vis6.length) d.text(14, hG + 14 + lh / 2, T("nessun aumento ancora: x = 0", "no augmentation yet: x = 0"), { anchorX: "left", fontSize: 13.5, strokeColor: C.muted, cssStyle: "font-style:italic" });
        vis6.forEach(([s, col], z) => d.text(14, hG + 14 + lh * (z + 0.5), s, { anchorX: "left", fontSize: 13.5, strokeColor: col, cssStyle: "font-weight:" + (col === C.testo ? 500 : 700) }));
        d.text(14, H - 10, T("a destra, tratteggiati: archi residui all'indietro", "on the right, dashed: backward residual arcs"), { anchorX: "left", fontSize: 12, strokeColor: C.muted, cssStyle: "font-style:italic" });
        d.text(W - 14, H - 10, T(`passo ${k} di ${K} · aumenti: ${P.h}`, `step ${k} of ${K} · augmentations: ${P.h}`), { anchorX: "right", fontSize: 12.5, strokeColor: C.muted });
      });
    },
    formula(p, st) {
      const S = mfStato(st), { R, P } = S, A = R.A, t = P.tipo;
      if (t === "init") return `x_{ij} = 0 \\ \\ \\forall (i,j) \\in A, \\quad v = 0`;
      if (t === "cammino") return `P = ${camminoTex(P.cammino)}`;
      if (t === "collo") return `\\delta = \\min\\{${P.cammino.map((e) => `r_{${e.da}${e.a}}`).join(",\\ ")}\\} = \\min\\{${P.cammino.map((e) => e.r).join(",\\ ")}\\} = ${P.delta}`;
      if (t === "agg") return P.cammino.map((e) => (e.dir > 0 ? `x_{${e.da}${e.a}} = ${P.prima[e.q]} + ${P.delta}` : `x_{${e.a}${e.da}} = ${P.prima[e.q]} - ${P.delta}`)).join(",\\ ") + `, \\quad v = ${P.v}`;
      return `v = ${P.v} = u(S, N \\setminus S) = ${P.avanti.map((q) => `u_{${A[q][0]}${A[q][1]}}`).join(" + ")} = ${P.cap}`;
    },
    letture(p, st) {
      const S = mfStato(st), { R, P, modo } = S, A = R.A, C = M.COL(st), t = P.tipo;
      let nota;
      if (t === "init") {
        nota = T(`Si parte dal flusso nullo. A ogni iterazione si cerca un cammino da \\(s = ${S.s}\\) a \\(t = ${S.t}\\) nella rete residua \\(G(x)\\): l'arco \\((i,j)\\) dà l'arco in avanti con \\(r_{ij} = u_{ij} - x_{ij}\\) e, se \\(x_{ij} > 0\\), l'arco all'indietro \\((j,i)\\) con \\(r_{ji} = x_{ij}\\). `
          + (modo === "bfs" ? "Edmonds–Karp usa la visita in ampiezza: il cammino con il minimo numero di archi." : "Ford–Fulkerson, qui, usa la visita in profondità (vicini per indice crescente)."),
        `Start from the zero flow. At each iteration, look for a path from \\(s = ${S.s}\\) to \\(t = ${S.t}\\) in the residual network \\(G(x)\\): arc \\((i,j)\\) gives the forward arc with \\(r_{ij} = u_{ij} - x_{ij}\\) and, if \\(x_{ij} > 0\\), the backward arc \\((j,i)\\) with \\(r_{ji} = x_{ij}\\). `
          + (modo === "bfs" ? "Edmonds–Karp uses breadth-first search: the path with the fewest arcs." : "Ford–Fulkerson, here, uses depth-first search (neighbours by increasing index)."));
      } else if (t === "cammino") {
        const ind = P.cammino.filter((e) => e.dir < 0);
        nota = T(`Iterazione ${P.h}: la ${modo === "bfs" ? "visita in ampiezza" : "visita in profondità"} da \\(s\\) raggiunge i nodi ${lista(P.vis)} e trova il ${M.tinta(C.a, "cammino aumentante")} ${camminoTxt(P.cammino)}.`,
          `Iteration ${P.h}: the ${modo === "bfs" ? "breadth-first" : "depth-first"} search from \\(s\\) reaches the nodes ${lista(P.vis)} and finds the ${M.tinta(C.a, "augmenting path")} ${camminoTxt(P.cammino)}.`)
          + (ind.length ? T(` Usa ${ind.length === 1 ? "l'arco all'indietro" : "gli archi all'indietro"} ${ind.map((e) => `\\((${e.da},${e.a})\\)`).join(", ")}: il flusso su ${ind.map((e) => `\\((${e.a},${e.da})\\)`).join(", ")} diminuirà.`,
            ` It uses the backward ${ind.length === 1 ? "arc" : "arcs"} ${ind.map((e) => `\\((${e.da},${e.a})\\)`).join(", ")}: the flow on ${ind.map((e) => `\\((${e.a},${e.da})\\)`).join(", ")} will decrease.`) : "");
      } else if (t === "collo") {
        nota = T(`Il ${M.tinta(C.rosso, "collo di bottiglia")} è la capacità residua più piccola sul cammino: \\(\\delta = ${P.delta}\\).`, `The ${M.tinta(C.rosso, "bottleneck")} is the smallest residual capacity on the path: \\(\\delta = ${P.delta}\\).`);
      } else if (t === "agg") {
        nota = T(`Si inviano \\(\\delta = ${P.delta}\\) unità lungo il cammino: \\(+${P.delta}\\) sugli archi percorsi in avanti, \\(-${P.delta}\\) sugli archi di \\(G\\) percorsi all'indietro. Il valore del flusso diventa ${M.tinta(C.a, `\\(v = ${P.v}\\)`)} e la rete residua cambia.`,
          `Send \\(\\delta = ${P.delta}\\) units along the path: \\(+${P.delta}\\) on the arcs traversed forwards, \\(-${P.delta}\\) on the arcs of \\(G\\) traversed backwards. The flow value becomes ${M.tinta(C.a, `\\(v = ${P.v}\\)`)} and the residual network changes.`);
      } else {
        nota = T(`La visita da \\(s\\) non raggiunge \\(t\\): il flusso è massimo. I nodi raggiunti formano ${M.tinta(C.blu, `\\(S = \\{${P.S.join(",")}\\}\\)`)}. Gli archi da \\(S\\) a \\(N \\setminus S\\) sono saturi e quelli da \\(N \\setminus S\\) a \\(S\\) hanno flusso nullo, quindi ${M.tinta(C.rosso, `\\(v = ${P.v} = u(S, N \\setminus S)\\)`)}: il taglio è minimo (${P.h} aumenti).`,
          `The search from \\(s\\) does not reach \\(t\\): the flow is maximum. The nodes reached form ${M.tinta(C.blu, `\\(S = \\{${P.S.join(",")}\\}\\)`)}. The arcs from \\(S\\) to \\(N \\setminus S\\) are saturated and those from \\(N \\setminus S\\) to \\(S\\) carry no flow, hence ${M.tinta(C.rosso, `\\(v = ${P.v} = u(S, N \\setminus S)\\)`)}: the cut is minimum (${P.h} augmentations).`);
      }
      return nota;
    },
    domanda: T("Confronta Ford–Fulkerson (profondità) ed Edmonds–Karp (ampiezza) sulla stessa istanza: quanti aumenti servono? Il taglio minimo trovato è lo stesso? Con «Modifica…» aumenta la capacità di un arco del taglio: il valore massimo cresce?",
      "Compare Ford–Fulkerson (DFS) and Edmonds–Karp (BFS) on the same instance: how many augmentations are needed? Is the minimum cut found the same? With «Edit…» increase the capacity of an arc of the cut: does the maximum value grow?"),
  };

  window.GI_NO_B = { spCalcola, mfCalcola, residua, cerca, SP_ES, MF_ES };
})();
