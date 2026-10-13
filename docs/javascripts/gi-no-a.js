/* Laboratorio di «Ottimizzazione su reti / Network Optimization»: ricerca su grafo e alberi ricoprenti minimi.
 *
 *   no-search  la ricerca generica del capitolo «Graphs» (BFS: LIST è una coda; DFS: LIST è una pila), un'iterazione
 *              alla volta come nelle tabelle del capitolo: nodo selezionato, nodo etichettato o rimosso, LIST, ordine
 *              di etichettatura, albero dei predecessori, livelli d(j) della BFS (riferimento: 01_GRAPHS/script/
 *              verifica.py, funzione ricerca: liste di adiacenza per indice crescente, un nodo per iterazione)
 *   no-mst     Kruskal (lati per peso non decrescente, pari merito in ordine lessicografico, etichette di componente
 *              con unione per dimensione, stop a n−1 lati) e Prim (da un vertice scelto, etichette d(v), pred(v),
 *              minimo d(v) con pari merito all'indice più piccolo, aggiornamento solo se strettamente minore)
 *              (riferimento: 02_MINIMUM_SPANNING_TREES/script/verifica.py)
 *
 * Il disegno dei grafi, le istanze e i comandi vengono dal motore gi-no-0.js (window.GI_NO). Verde riservato ai
 * tagli: qui non si usa. Le funzioni di calcolo sono in window.GI_NO_A (per i controlli).
 */
(function () {
  "use strict";
  const GI = window.GI, M = window.GI_MIP, N = window.GI_NO;
  const T = GI.T;
  const { PASSO, parPasso, vaiA, clamp, lista, osservaDimensioni, nuovaVoce, dim, pix, disegno, daIndirizzo } = N;
  window.GI_RICETTE = window.GI_RICETTE || {};
  const LIST = "\\mathit{LIST}", PRED = "\\mathit{pred}";
  const bg = () => (M.scuro() ? "#1b2636" : "#ffffff");

  // =================================================================
  // 1. RICERCA SU GRAFO: BFS E DFS
  // =================================================================
  const RIF = [[0, 1.2], [2.2, 2.4], [2.2, 0], [4.4, 2.4], [4.4, 0], [6.6, 1.2]];
  const C7 = [[0.0, 2.9], [2.267, 1.808], [2.827, -0.645], [1.258, -2.613], [-1.258, -2.613], [-2.827, -0.645], [-2.267, 1.808]];
  const RIC_ES = [
    { nome: T("grafo di riferimento", "reference graph"), n: 6, diretto: true, s: 1,
      A: [[1, 2], [1, 3], [2, 4], [3, 2], [3, 5], [4, 3], [4, 6], [5, 4], [5, 6]], P: RIF },
    { nome: T("esercizio 1.1", "Exercise 1.1"), n: 5, diretto: true, s: 1,
      A: [[1, 2], [1, 3], [2, 3], [2, 4], [5, 1], [5, 3], [5, 4]], P: [[0.0, 2.2], [2.092, 0.68], [1.293, -1.78], [-1.293, -1.78], [-2.092, 0.68]] },
    { nome: T("esercizio 1.2", "Exercise 1.2"), n: 8, diretto: true, s: 1,
      A: [[1, 7], [2, 3], [2, 7], [3, 1], [3, 6], [4, 5], [6, 2], [6, 7], [6, 8], [7, 8], [8, 1]],
      P: [[0.0, 2.9], [2.051, 2.051], [2.9, 0.0], [2.051, -2.051], [0.0, -2.9], [-2.051, -2.051], [-2.9, 0], [-2.051, 2.051]] },
    { nome: T("esercizio 1.3", "Exercise 1.3"), n: 6, diretto: true, s: 1,
      A: [[1, 2], [2, 5], [2, 6], [3, 5], [4, 2], [5, 1], [5, 4], [6, 1], [6, 3]],
      P: [[0.0, 2.2], [1.905, 1.1], [1.905, -1.1], [0.0, -2.2], [-1.905, -1.1], [-1.905, 1.1]] },
    { nome: T("esercizio 1.4 (BFS)", "Exercise 1.4 (BFS)"), n: 7, diretto: true, s: 1, regola: "bfs",
      A: [[1, 4], [1, 5], [2, 1], [2, 6], [3, 1], [3, 6], [5, 3], [5, 4], [5, 7], [6, 1], [7, 6]], P: C7 },
    { nome: T("esercizio 1.5 (DFS)", "Exercise 1.5 (DFS)"), n: 7, diretto: true, s: 1, regola: "dfs",
      A: [[1, 2], [1, 5], [2, 3], [2, 7], [3, 6], [3, 7], [4, 1], [4, 3], [6, 1], [6, 2], [7, 5]], P: C7 },
  ];
  /** la ricerca generica, come ricerca() di verifica.py: un passo per iterazione */
  function ricerca(I, s, regola) {
    const G = N.grafo(I), n = G.n;
    const pred = { [s]: null }, ordine = [s], L = [s], ptr = new Array(n + 1).fill(0), d = { [s]: 0 };
    const esaminati = new Set(), rimossi = [];
    const passi = [{ it: 0, i: null, j: null, saltati: [], gia: [], giaNodi: [], LIST: [s], pred: Object.assign({}, pred), ordine: [s], d: Object.assign({}, d), esaminati: new Set(), rimossi: [], usato: null }];
    while (L.length) {
      const i = regola === "bfs" ? L[0] : L[L.length - 1], saltati = [];
      while (ptr[i] < G.L[i].length && G.L[i][ptr[i]].j in pred) { saltati.push(G.L[i][ptr[i]].a); esaminati.add(G.L[i][ptr[i]].a.k); ptr[i]++; }
      let j = null, usato = null;
      if (ptr[i] < G.L[i].length) {
        j = G.L[i][ptr[i]].j; usato = G.L[i][ptr[i]].a; esaminati.add(usato.k);
        pred[j] = i; d[j] = d[i] + 1; ordine.push(j); L.push(j);
      } else {
        if (regola === "bfs") L.shift(); else L.pop();
        rimossi.push(i);
      }
      // come le tabelle degli esercizi: i nodi di L(i) prima di j (o tutta L(i) se i esce), tutti già etichettati
      const gia = j != null ? G.L[i].slice(0, G.L[i].findIndex((x) => x.j === j)) : G.L[i].slice();
      passi.push({ it: passi.length, i, j, saltati, gia: gia.map((x) => x.a), giaNodi: gia.map((x) => x.j), usato, LIST: L.slice(), pred: Object.assign({}, pred), ordine: ordine.slice(), d: Object.assign({}, d), esaminati: new Set(esaminati), rimossi: rimossi.slice() });
    }
    return { G, s, regola, passi, ordine, pred, d, R: ordine.slice().sort((a, b) => a - b) };
  }
  const RIC_FUNZ = {
    bfs: { etichetta: T("BFS (coda)", "BFS (queue)") },
    dfs: { etichetta: T("DFS (pila)", "DFS (stack)") },
  };
  function ricStato(st) {
    const D = st.dati;
    if (!D.s || D.s > D.g.n) D.s = D.g.s && D.g.s <= D.g.n ? D.g.s : 1;
    return Object.assign(N.stato(st, (I, regola) => ricerca(I, D.s, regola), D.s), { s: D.s });
  }
  /** il testo dell'azione di un'iterazione, come nelle tabelle del capitolo */
  const azione = (p) => {
    const gia = p.giaNodi;
    const tra = gia.length ? T(` (${lista(gia)} ${gia.length > 1 ? "sono etichettati" : "è etichettato"})`, ` (${lista(gia)} ${gia.length > 1 ? "are" : "is"} labelled)`) : "";
    return p.j != null ? T(`etichetta ${p.j}, \\(${PRED}(${p.j})=${p.i}\\)`, `label ${p.j}, \\(${PRED}(${p.j})=${p.i}\\)`) + tra
      : T(`rimuovi ${p.i}`, `remove ${p.i}`) + tra;
  };

  window.GI_RICETTE["no-search"] = {
    titolo: T("Ricerca su grafo: BFS e DFS", "Graph search: BFS and DFS"),
    funzioni: RIC_FUNZ,
    etichettaFunzioni: T("Ricerca", "Search"),
    parametri: [parPasso(T("◀ ▶ un'iterazione alla volta, «Esegui» per vederle tutte", "◀ ▶ one iteration at a time, «Run» to watch them all"), 0)],
    assi: false,
    opzioniBoard: M.OPZ,
    vista: [0, 400, 600, 0],
    legenda: (st) => {
      const C = M.COL(st);
      return [
        [C.a, T("selezionato \\(i\\) (bordo), appena etichettato", "selected \\(i\\) (border), just labelled"), "punto"],
        [C.b, T("etichettato, in \\(" + LIST + "\\)", "labelled, in \\(" + LIST + "\\)"), "punto"],
        [C.grigio, T("uscito da \\(" + LIST + "\\)", "removed from \\(" + LIST + "\\)"), "punto"],
        [C.blu, T("albero dei predecessori", "predecessor tree"), ""],
        [C.grigio, T("arco verso un nodo etichettato", "arc to a labelled node"), "dashed"],
      ];
    },
    monta(board, st) {
      const D = st.dati;
      nuovaVoce(st);
      N.montaIstanze(st, RIC_ES, {
        diretto: true, nv: 0, nMax: 10,
        casuale: () => N.casuale({ n: [5, 8], p: 0.3, diretto: true, prova: (G) => ricerca(G.I, 1, "bfs").ordine.length >= G.n - 2 }),
        dopo: (I) => {
          D.s = I.s || 1;
          if (I.regola && I.regola !== st.chiave()) {
            const b = st.el.querySelectorAll(".gi-chip")[Object.keys(RIC_FUNZ).indexOf(I.regola)];
            if (b) setTimeout(() => b.click(), 0);
          }
        },
      });
      osservaDimensioni(board, st);
      daIndirizzo(st);
    },
    aggiorna(board, st) {
      const S = ricStato(st), D = S.D, C = M.COL(st), [W, H] = dim(board), { R, k, K, P } = S, G = R.G, bfs = R.regola === "bfs";
      N.allinea(st, RIC_ES);
      N.menu(st, T("sorgente", "source"), Array.from({ length: G.n }, (_, i) => [i + 1, T("Sorgente: s = ", "Source: s = ") + (i + 1)]), S.s,
        (v) => { D.s = +v; vaiA(st, 0); st.aggiorna(); });
      M.ridisegna(board, st, [D.g.id, R.regola, S.s, k, M.scuro(), W, H].join("|"), (crea) => {
        pix(board);
        const d = disegno(crea, H);
        const inL = new Set(P.LIST), rim = new Set(P.rimossi), albero = new Set(Object.entries(P.pred).filter(([, p]) => p != null).map(([j, p]) => p + "-" + j));
        const salt = new Set(P.i != null ? P.gia.map((a) => a.k) : []);
        const Z = N.divisione(G, W, H, 96, 270), F = Z.fascia;
        N.disegnaGrafo(d, G, Z.grafo, {
          arco: (a) => {
            if (P.usato && a.k === P.usato.k) return { colore: C.a, spessore: 3.6, opacita: 1 };
            if (albero.has(a.i + "-" + a.j) || (!G.diretto && albero.has(a.j + "-" + a.i))) return { colore: C.blu, spessore: 3.2, opacita: 1 };
            if (salt.has(a.k)) return { colore: C.a, spessore: 2.4, dash: 3, opacita: 1 };
            if (P.esaminati.has(a.k)) return { colore: C.grigio, spessore: 1.8, dash: 3, opacita: 0.9 };
            return { colore: C.muted, spessore: 1.6, opacita: 0.75 };
          },
          nodo: (i) => {
            const sel = i === P.i, nuovo = i === P.j;
            if (nuovo) return { fondo: C.a, opacita: 0.4, bordo: C.a, spessore: 3 };
            const base = inL.has(i) ? { fondo: C.b, opacita: 0.22, bordo: C.b, spessore: 2.4 }
              : rim.has(i) ? { fondo: C.grigio, opacita: 0.45, bordo: C.grigio, spessore: 2 } : {};
            return sel ? Object.assign(base, { bordo: C.a, spessore: 4.5 }) : base;
          },
          fuori: (i) => (i in P.pred ? { testo: bfs ? `d=${P.d[i]}` : `o=${P.ordine.indexOf(i) + 1}`, colore: C.blu } : null),
        }, C);
        // LIST e ordine di etichettatura, sotto il grafo o a destra
        const tit = bfs ? T("LIST (coda):", "LIST (queue):") : T("LIST (pila):", "LIST (stack):");
        const qi = P.i != null && inL.has(P.i) ? P.LIST.indexOf(P.i) : -1;
        const nuovo = P.j != null ? P.LIST.length - 1 : -1;
        const evid = [qi, nuovo].filter((q) => q >= 0), vuota = T("(vuota): la ricerca è finita", "(empty): the search is over");
        const ordTxt = T("ordine di etichettatura: ", "labelling order: ") + lista(P.ordine), itTxt = T(`iterazione ${k} di ${K}`, `iteration ${k} of ${K}`);
        const rimTxt = P.i != null && !inL.has(P.i) ? T(`${P.i} rimosso da LIST`, `${P.i} removed from LIST`) : "";
        if (!Z.aDestra) {
          d.line(F.x, F.y, F.x + F.w, F.y, { strokeColor: C.line, strokeWidth: 1.2 });
          const yL = F.y + 20, wC = clamp((W - 160) / Math.max(8, P.LIST.length + 1), 22, 34);
          N.cellaLista(d, 14, yL, P.LIST, { w: wC, h: 26, titolo: tit, titoloW: 118, evid, colEvid: C.a, vuota }, C);
          if (P.LIST.length) {
            const x0 = 14 + 118, xEnd = x0 + P.LIST.length * wC - 3;
            if (bfs) d.text(x0 + (wC - 3) / 2, yL - 9, T("prima", "first"), { fontSize: 10.5, strokeColor: C.muted });
            d.text(xEnd - (wC - 3) / 2, yL + 26 + 9, bfs ? T("ultima", "last") : T("ultima (cima)", "last (top)"), { fontSize: 10.5, strokeColor: C.muted });
          }
          if (rimTxt) d.text(W - 14, yL + 13, rimTxt, { anchorX: "right", fontSize: 13, strokeColor: C.muted, cssStyle: "font-style:italic" });
          d.text(14, H - 18, ordTxt, { anchorX: "left", fontSize: 13.5, strokeColor: C.testo, cssStyle: "font-weight:600" });
          d.text(W - 14, H - 18, itTxt, { anchorX: "right", fontSize: 12.5, strokeColor: C.muted });
        } else {
          d.line(F.x - 6, F.y, F.x - 6, F.y + F.h, { strokeColor: C.line, strokeWidth: 1.2 });
          const wC = 32, perRiga = Math.max(4, Math.floor((F.w - 8) / wC)), x0 = F.x + 6;
          d.text(x0, F.y + 14, tit, { anchorX: "left", fontSize: 13, strokeColor: C.muted, cssStyle: "font-style:italic" });
          const yL = F.y + 40;
          N.cellaLista(d, x0, yL, P.LIST, { w: wC, h: 26, perRiga, evid, colEvid: C.a, vuota }, C);
          const righe = Math.max(1, Math.ceil(P.LIST.length / perRiga));
          if (P.LIST.length) {
            const q = P.LIST.length - 1;
            if (bfs) d.text(x0 + (wC - 3) / 2, yL - 9, T("prima", "first"), { fontSize: 10.5, strokeColor: C.muted });
            d.text(x0 + (q % perRiga) * wC + (wC - 3) / 2, yL + Math.floor(q / perRiga) * 32 + 26 + 9, bfs ? T("ultima", "last") : T("ultima (cima)", "last (top)"), { fontSize: 10.5, strokeColor: C.muted });
          }
          let y = yL + righe * 32 + 30;
          if (rimTxt) { d.text(x0, y, rimTxt, { anchorX: "left", fontSize: 13, strokeColor: C.muted, cssStyle: "font-style:italic" }); y += 28; }
          d.text(x0, y, T("ordine di etichettatura:", "labelling order:"), { anchorX: "left", fontSize: 13, strokeColor: C.muted, cssStyle: "font-style:italic" });
          d.text(x0, y + 22, lista(P.ordine), { anchorX: "left", fontSize: 14.5, strokeColor: C.testo, cssStyle: "font-weight:700" });
          d.text(x0, F.y + F.h - 8, itTxt, { anchorX: "left", fontSize: 12.5, strokeColor: C.muted });
        }
      });
    },
    formula(p, st) {
      const S = ricStato(st), { R, k, K, P } = S, nome = R.regola === "bfs" ? "BFS" : "DFS";
      if (k === 0) return `\\text{${nome}}:\\ s = ${S.s},\\quad ${LIST} = \\{${S.s}\\}`;
      const pos = R.regola === "bfs" ? T("prima", "first") : T("ultima", "last");
      const az = P.j != null ? T(`\\text{etichetta } ${P.j},\\ ${PRED}(${P.j}) = ${P.i}`, `\\text{label } ${P.j},\\ ${PRED}(${P.j}) = ${P.i}`) : T(`\\text{rimuovi } ${P.i}`, `\\text{remove } ${P.i}`);
      return T(`\\text{iterazione } ${k}/${K}:\\ i = ${P.i}\\ \\text{(la ${pos} di } ${LIST}),\\quad `, `\\text{iteration } ${k}/${K}:\\ i = ${P.i}\\ \\text{(the ${pos} of } ${LIST}),\\quad `) + az
        + (k === K ? T(`\\quad R(${S.s}) = \\{${R.R.join(",")}\\}`, `\\quad R(${S.s}) = \\{${R.R.join(",")}\\}`) : "");
    },
    letture(p, st) {
      const S = ricStato(st), { R, k, K, P } = S, G = R.G, C = M.COL(st), bfs = R.regola === "bfs";
      let nota;
      if (k === 0) nota = T(`Passo 0: si etichetta la sorgente \\(s = ${S.s}\\) e \\(${LIST} = \\{${S.s}\\}\\). ${bfs ? "Nella BFS si seleziona sempre il <strong>primo</strong> nodo di LIST (coda)." : "Nella DFS si seleziona sempre l'<strong>ultimo</strong> nodo di LIST (pila)."} Il nodo selezionato etichetta il primo successore non etichettato della sua lista \\(L(i)\\), oppure esce da LIST.`,
        `Step 0: the source \\(s = ${S.s}\\) is labelled and \\(${LIST} = \\{${S.s}\\}\\). ${bfs ? "The BFS always selects the <strong>first</strong> node of LIST (queue)." : "The DFS always selects the <strong>last</strong> node of LIST (stack)."} The selected node labels the first unlabelled successor in its list \\(L(i)\\), or leaves LIST.`);
      else {
        nota = T(`Iterazione ${k}: si seleziona ${M.tinta(C.a, "i = " + P.i)}; `, `Iteration ${k}: the selected node is ${M.tinta(C.a, "i = " + P.i)}; `);
        if (P.giaNodi.length) nota += T(`in \\(L(${P.i})\\) ${lista(P.giaNodi)} ${P.giaNodi.length > 1 ? "sono già etichettati" : "è già etichettato"}; `, `in \\(L(${P.i})\\) ${lista(P.giaNodi)} ${P.giaNodi.length > 1 ? "are" : "is"} already labelled; `);
        nota += P.j != null ? T(`l'arco \\((${P.i},${P.j})\\) è ammissibile: si etichetta ${M.tinta(C.a, String(P.j))} con \\(${PRED}(${P.j}) = ${P.i}\\)${bfs ? ` e \\(d(${P.j}) = d(${P.i}) + 1 = ${P.d[P.j]}\\)` : ""}.`, `the arc \\((${P.i},${P.j})\\) is admissible: ${M.tinta(C.a, String(P.j))} is labelled with \\(${PRED}(${P.j}) = ${P.i}\\)${bfs ? ` and \\(d(${P.j}) = d(${P.i}) + 1 = ${P.d[P.j]}\\)` : ""}.`)
          : T(`nessun arco ammissibile: ${P.i} esce da LIST.`, `no admissible arc: ${P.i} leaves LIST.`);
        if (k === K) {
          const non = Array.from({ length: G.n }, (_, i) => i + 1).filter((v) => !(v in R.pred));
          nota += T(` LIST è vuota: STOP. I nodi etichettati sono \\(R(${S.s}) = \\{${R.R.join(",")}\\}\\)`, ` LIST is empty: STOP. The labelled nodes are \\(R(${S.s}) = \\{${R.R.join(",")}\\}\\)`)
            + (non.length ? T(`; non raggiungibili: ${lista(non)}.`, `; not reachable: ${lista(non)}.`) : T(": tutti i nodi sono raggiungibili.", ": every node is reachable."));
          if (bfs) nota += T(" I valori \\(d(j)\\) sono i numeri minimi di archi da \\(s\\).", " The values \\(d(j)\\) are the minimum numbers of arcs from \\(s\\).");
        }
      }
      const tracce = R.passi.slice(1, k + 1).map((q) => [String(q.it), String(q.i), azione(q), q.LIST.length ? lista(q.LIST) : T("(vuota)", "(empty)")]);
      const tab1 = tracce.length ? M.tab([T("iter.", "iter."), "\\(i\\)", T("azione", "action"), `\\(${LIST}\\)`], tracce, tracce.length - 1, C.a) : "";
      const nodi = Array.from({ length: G.n }, (_, q) => q + 1);
      const tab2 = M.tab(["\\(j\\)", `\\(${PRED}(j)\\)`, bfs ? "\\(d(j)\\)" : "\\(o(j)\\)", "\\(L(j)\\)"], nodi.map((j) => [String(j),
        j in P.pred ? (P.pred[j] == null ? "—" : String(P.pred[j])) : "", j in P.pred ? String(bfs ? P.d[j] : P.ordine.indexOf(j) + 1) : "",
        G.L[j].length ? lista(G.L[j].map((x) => x.j)) : T("(vuota)", "(empty)")]), P.i != null ? P.i - 1 : -1, C.a);
      return nota + `<div style="margin:.5em 0 .2em"><strong>${T("Iterazioni", "Iterations")}</strong></div>` + tab1
        + `<div style="margin:.6em 0 .2em"><strong>${T("Nodi", "Nodes")}</strong></div>` + tab2;
    },
    domanda: T("Sul grafo di riferimento la BFS da 1 dà \\(d = (0,1,1,2,2,3)\\), la DFS raggiunge 6 con 5 archi: perché? Cambia la sorgente in 2: quali nodi restano senza etichetta? Nell'esercizio 1.2 confronta \\(R(1)\\) e \\(R(2)\\).",
      "On the reference graph the BFS from 1 gives \\(d = (0,1,1,2,2,3)\\), while the DFS reaches 6 with 5 arcs: why? Change the source to 2: which nodes stay unlabelled? In Exercise 1.2 compare \\(R(1)\\) and \\(R(2)\\)."),
  };

  // =================================================================
  // 2. ALBERI RICOPRENTI MINIMI: KRUSKAL E PRIM
  // =================================================================
  const RIF_E = [[1, 2, 4], [1, 3, 1], [2, 3, 3], [2, 4, 6], [3, 4, 5], [3, 5, 8], [4, 5, 2], [4, 6, 9], [5, 6, 7]];
  const RIF2 = [[0, 1.5], [2.6, 3], [2.6, 0], [5.2, 3], [5.2, 0], [7.8, 1.5]];
  const P7 = [[0, 2.6], [2.6, 2.6], [5.2, 2.6], [7.8, 2.6], [1.3, 0], [3.9, 0], [6.5, 0]];
  const P6 = [[0, 2.6], [3, 2.6], [6, 2.6], [0, 0], [3, 0], [6, 0]];
  // pieghe: «i-j» -> gradi, come bend left (positivo) / bend right (negativo) del TikZ, da i a j
  const MST_ES = [
    { nome: T("grafo di riferimento pesato", "weighted reference graph"), n: 6, diretto: false, A: RIF_E, P: RIF2 },
    { nome: T("pari merito: w₁₂ = w₂₃ = 3", "ties: w₁₂ = w₂₃ = 3"), n: 6, diretto: false, A: RIF_E.map((e) => (e[0] === 1 && e[1] === 2 ? [1, 2, 3] : e.slice())), P: RIF2 },
    { nome: T("esercizio 2.1 (Kruskal)", "Exercise 2.1 (Kruskal)"), n: 7, diretto: false, alg: "kruskal", P: P7, pieghe: { "5-7": -28 },
      A: [[1, 2, 5], [1, 5, 10], [2, 3, 1], [2, 5, 4], [2, 6, 8], [3, 6, 9], [3, 7, 7], [4, 7, 16], [5, 6, 15], [5, 7, 14], [6, 7, 18]] },
    { nome: T("esercizio 2.2 (Prim)", "Exercise 2.2 (Prim)"), n: 7, diretto: false, alg: "prim", P: P7, pieghe: { "1-3": 28, "5-7": -28 },
      A: [[1, 2, 6], [1, 3, 4], [1, 5, 8], [2, 3, 1], [2, 5, 18], [2, 6, 7], [3, 6, 15], [4, 7, 2], [5, 6, 17], [5, 7, 20], [6, 7, 16]] },
    { nome: T("esercizio 2.3", "Exercise 2.3"), n: 6, diretto: false, P: P6, pieghe: { "1-3": 28, "4-6": -28 },
      A: [[1, 2, 6], [1, 3, 14], [1, 4, 1], [1, 5, 5], [2, 3, 9], [2, 5, 8], [2, 6, 11], [3, 6, 15], [4, 5, 4], [4, 6, 13]] },
    { nome: T("esercizio 2.4 (pari merito)", "Exercise 2.4 (ties)"), n: 6, diretto: false, alg: "kruskal", P: P6, pieghe: { "1-3": 28, "4-6": -28 },
      A: [[1, 2, 5], [1, 3, 3], [1, 4, 1], [2, 3, 4], [2, 5, 1], [2, 6, 4], [4, 5, 1], [4, 6, 4], [5, 6, 5]] },
    { nome: T("esercizio 2.5 (rete in fibra)", "Exercise 2.5 (fibre network)"), n: 6, diretto: false, P: P6, pieghe: { "1-3": 28 },
      A: [[1, 2, 7], [1, 3, 29], [1, 4, 16], [1, 5, 13], [2, 3, 8], [2, 5, 26], [2, 6, 15], [3, 6, 12], [4, 5, 22], [5, 6, 19]] },
  ];
  /** Kruskal come kruskal() di verifica.py: etichette di componente, unione per dimensione, stop a n−1 lati */
  function kruskal(I) {
    const G = N.grafo(I), n = G.n;
    const ord = G.archi.slice().sort((a, b) => a.v[0] - b.v[0] || a.i - b.i || a.j - b.j);
    const comp = Array.from({ length: n + 1 }, (_, v) => v), membri = {};
    for (let v = 1; v <= n; v++) membri[v] = [v];
    const gruppi = () => Object.values(membri).map((m) => m.slice().sort((a, b) => a - b)).sort((a, b) => a[0] - b[0]);
    const F = [], passi = [{ e: null, ord, comp: comp.slice(), gruppi: gruppi(), F: [], esiti: [], z: 0 }];
    let z = 0;
    const esiti = [];
    for (const e of ord) {
      if (F.length === n - 1) break;
      let a = comp[e.i], b = comp[e.j], ok = false, rietichettati = [];
      if (a !== b) {
        if (membri[a].length < membri[b].length) [a, b] = [b, a];
        rietichettati = membri[b].slice();
        for (const x of membri[b]) comp[x] = a;
        membri[a] = membri[a].concat(membri[b]);
        delete membri[b];
        F.push(e); z += e.v[0]; ok = true;
      }
      esiti.push(ok);
      passi.push({ e, ok, ord, comp: comp.slice(), gruppi: gruppi(), F: F.slice(), esiti: esiti.slice(), z, rietichettati, a, b, cu: passi[passi.length - 1].comp[e.i], cv: passi[passi.length - 1].comp[e.j] });
    }
    return { G, passi, F, z, connesso: F.length === n - 1 };
  }
  /** Prim come prim() di verifica.py: etichette d(v), pred(v); minimo d con pari merito all'indice più piccolo */
  function prim(I, s) {
    const G = N.grafo(I), n = G.n, Sset = new Set([s]);
    const d = new Array(n + 1).fill(Infinity), pred = new Array(n + 1).fill(null);
    for (const { j, a } of G.L[s]) { d[j] = a.v[0]; pred[j] = s; }
    const F = [];
    let z = 0;
    const foto = (v, e, aggiornati) => ({ v, e, S: [...Sset], d: d.slice(), pred: pred.slice(), F: F.slice(), z, aggiornati });
    const passi = [foto(s, null, G.L[s].map((x) => x.j))];
    while (Sset.size < n) {
      let v = null;
      for (let x = 1; x <= n; x++) if (!Sset.has(x) && (v === null || d[x] < d[v])) v = x;
      if (d[v] === Infinity) break;          // grafo non connesso
      Sset.add(v);
      const e = N.arco(G, pred[v], v);
      F.push(e); z += e.v[0];
      const dv = d[v], pv = pred[v], agg = [];
      for (const { j, a } of G.L[v]) if (!Sset.has(j) && a.v[0] < d[j]) { d[j] = a.v[0]; pred[j] = v; agg.push(j); }
      passi.push(Object.assign(foto(v, e, agg), { dv, pv }));
    }
    return { G, s, passi, F, z, connesso: F.length === n - 1 };
  }
  const MST_FUNZ = { kruskal: { etichetta: "Kruskal" }, prim: { etichetta: "Prim" } };
  const lato = (e) => `\\{${e.i},${e.j}\\}`;
  const latoTxt = (e) => `{${e.i},${e.j}}`;
  const INF = "\\infty";
  const COMP = "\\mathit{comp}";
  const dTxt = (x) => (x === Infinity ? "∞" : String(x));
  const gruppiTex = (g) => g.map((c) => `\\{${c.join(",")}\\}`).join(",");
  function mstStato(st) {
    const D = st.dati;
    if (!D.r || D.r > D.g.n) D.r = 1;
    return Object.assign(N.stato(st, (I, alg) => (alg === "prim" ? prim(I, D.r) : kruskal(I)), D.r), { r: D.r });
  }
  const scelto = (st, alg) => {
    if (alg && alg !== st.chiave()) {
      const b = st.el.querySelectorAll(".gi-chip")[Object.keys(MST_FUNZ).indexOf(alg)];
      if (b) setTimeout(() => b.click(), 0);
    }
  };

  window.GI_RICETTE["no-mst"] = {
    titolo: T("Alberi ricoprenti minimi: Kruskal e Prim", "Minimum spanning trees: Kruskal and Prim"),
    funzioni: MST_FUNZ,
    etichettaFunzioni: T("Algoritmo", "Algorithm"),
    parametri: [parPasso(T("◀ ▶ un passo alla volta, «Esegui» per vederli tutti", "◀ ▶ one step at a time, «Run» to watch them all"), 0)],
    assi: false,
    opzioniBoard: M.OPZ,
    vista: [0, 400, 600, 0],
    legenda: (st) => {
      const C = M.COL(st);
      return st.chiave() === "prim" ? [
        [C.blu, T("vertici di \\(S\\) e lati di \\(F\\)", "vertices of \\(S\\) and edges of \\(F\\)"), ""],
        [C.a, T("lato appena aggiunto", "edge just added"), ""],
        [C.viola, T("lati \\(\\{\\mathit{pred}(v), v\\}\\) delle etichette", "label edges \\(\\{\\mathit{pred}(v), v\\}\\)"), ""],
        [C.viola, T("altri lati del taglio \\(\\delta(S)\\)", "other edges of the cut \\(\\delta(S)\\)"), "dashed"],
      ] : [
        [C.blu, T("lati di \\(F\\) (accettati)", "edges of \\(F\\) (accepted)"), ""],
        [C.a, T("lato esaminato", "edge being scanned"), ""],
        [C.rosso, T("rifiutato: chiuderebbe un ciclo", "rejected: it would close a cycle"), "dashed"],
        [C.b, T("componenti di \\((V,F)\\) (colore dei vertici)", "components of \\((V,F)\\) (vertex colour)"), "punto"],
      ];
    },
    monta(board, st) {
      const D = st.dati;
      nuovaVoce(st);
      N.montaIstanze(st, MST_ES, {
        diretto: false, nv: 1, nomiValori: "w", nMax: 10,
        casuale: () => N.casuale({ n: [5, 7], p: 0.42, diretto: false, valori: [[1, 9]] }),
        valida: (I) => (N.connesso(I.n, I.A) ? null : T("Il grafo deve essere connesso.", "The graph must be connected.")),
        dopo: (I) => { D.r = 1; scelto(st, I.alg); },
      });
      osservaDimensioni(board, st);
      daIndirizzo(st);
    },
    aggiorna(board, st) {
      const S = mstStato(st), D = S.D, C = M.COL(st), [W, H] = dim(board), { R, k, K, P } = S, G = R.G, isPrim = st.chiave() === "prim";
      N.allinea(st, MST_ES);
      const sel = N.menu(st, T("vertice iniziale", "start vertex"), Array.from({ length: G.n }, (_, i) => [i + 1, T("Prim parte da: s = ", "Prim starts from: s = ") + (i + 1)]), S.r,
        (v) => { D.r = +v; vaiA(st, 0); st.aggiorna(); });
      sel.style.display = isPrim ? "block" : "none";
      M.ridisegna(board, st, [D.g.id, st.chiave(), S.r, k, M.scuro(), W, H].join("|"), (crea) => {
        pix(board);
        const d = disegno(crea, H), PAL = N.PAL(C), inF = new Set(P.F.map((e) => e.k));
        const pesoTxt = T(`peso di F: ${P.z}`, `weight of F: ${P.z}`) + (k === K && R.connesso ? T(" (minimo)", " (minimum)") : "");
        let opz;
        if (!isPrim) {
          const rif = new Set(P.esiti.map((ok, q) => (ok ? null : R.passi[q + 1].e.k)).filter((x) => x != null));
          const colG = {};
          P.gruppi.filter((g) => g.length > 1).forEach((g, q) => g.forEach((v) => { colG[v] = PAL[q % PAL.length]; }));
          opz = {
            arco: (a) => {
              if (P.e && a.k === P.e.k) return { colore: P.ok ? C.a : C.rosso, spessore: 3.8, dash: P.ok ? 0 : 3, opacita: 1, etichetta: a.v[0], colEt: P.ok ? C.a : C.rosso, grassetto: true };
              if (inF.has(a.k)) return { colore: C.blu, spessore: 3.4, opacita: 1, etichetta: a.v[0], colEt: C.blu, grassetto: true };
              if (rif.has(a.k)) return { colore: C.rosso, spessore: 1.8, dash: 3, opacita: 0.85, etichetta: a.v[0], colEt: C.rosso };
              return { colore: C.muted, spessore: 1.6, opacita: 0.7, etichetta: a.v[0], colEt: C.muted };
            },
            nodo: (v) => (colG[v] ? { fondo: colG[v], opacita: 0.3, bordo: colG[v], spessore: 2.6 } : {}),
            fuori: (v) => ({ testo: `comp=${P.comp[v]}`, colore: colG[v] || C.muted }),
          };
        } else {
          const inS = new Set(P.S), etich = new Set();
          for (let v = 1; v <= G.n; v++) if (!inS.has(v) && P.pred[v] != null) etich.add(N.arco(G, P.pred[v], v).k);
          opz = {
            arco: (a) => {
              if (P.e && a.k === P.e.k) return { colore: C.a, spessore: 3.8, opacita: 1, etichetta: a.v[0], colEt: C.a, grassetto: true };
              if (inF.has(a.k)) return { colore: C.blu, spessore: 3.4, opacita: 1, etichetta: a.v[0], colEt: C.blu, grassetto: true };
              const taglio = inS.has(a.i) !== inS.has(a.j);
              if (taglio && etich.has(a.k)) return { colore: C.viola, spessore: 2.6, opacita: 1, etichetta: a.v[0], colEt: C.viola, grassetto: true };
              if (taglio) return { colore: C.viola, spessore: 1.8, dash: 3, opacita: 0.9, etichetta: a.v[0], colEt: C.viola };
              return { colore: C.muted, spessore: 1.6, opacita: 0.7, etichetta: a.v[0], colEt: C.muted };
            },
            nodo: (v) => (inS.has(v) ? { fondo: C.blu, opacita: 0.85, bordo: v === P.v ? C.a : C.blu, spessore: v === P.v ? 4.5 : 2.4, testo: "#ffffff" } : {}),
            fuori: (v) => (inS.has(v) ? null : { testo: `d=${dTxt(P.d[v])}` + (P.pred[v] == null ? "" : ` (${P.pred[v]})`), colore: P.aggiornati.includes(v) ? C.a : C.viola }),
          };
        }
        const Z = N.divisione(G, W, H, isPrim ? 50 : 104, isPrim ? 220 : 250), F = Z.fascia;
        N.disegnaGrafo(d, G, Z.grafo, opz, C);
        if (Z.aDestra) d.line(F.x - 6, F.y, F.x - 6, F.y + F.h, { strokeColor: C.line, strokeWidth: 1.2 });
        else d.line(F.x, F.y, F.x + F.w, F.y, { strokeColor: C.line, strokeWidth: 1.2 });
        if (!isPrim) {
          // i lati ordinati: esaminato, accettato, rifiutato, mai esaminato
          const ord = P.ord, m = ord.length, fine = k === K;
          const stile = (q) => {
            const es = q < P.esiti.length ? (P.esiti[q] ? "ok" : "no") : fine ? "mai" : "", cur = q === P.esiti.length - 1 && P.e;
            return { es, cur, col: es === "ok" ? C.blu : es === "no" ? C.rosso : C.muted };
          };
          const segno = (es) => (es === "ok" ? " ✓" : es === "no" ? " ✗" : "");
          const tit = T("lati per peso non decrescente:", "edges by non-decreasing weight:");
          if (!Z.aDestra) {
            const x0 = 14, wC = clamp((W - 28) / m, 38, 70), hC = 40, y0 = F.y + 12;
            d.text(x0, y0 - 2, tit, { anchorX: "left", fontSize: 12, strokeColor: C.muted, cssStyle: "font-style:italic" });
            ord.forEach((e, q) => {
              const { es, cur, col } = stile(q), x = x0 + q * wC, y = y0 + 8;
              d.rect(x, y, wC - 4, hC, { strokeColor: cur ? (P.ok ? C.a : C.rosso) : col, strokeWidth: cur ? 3 : 1.4, dash: es === "no" ? 3 : 0, fillColor: es === "ok" ? C.blu : cur ? C.a : bg(), fillOpacity: es === "ok" ? 0.16 : cur ? 0.18 : 1, strokeOpacity: es === "mai" ? 0.5 : 1 });
              d.text(x + (wC - 4) / 2, y + 13, latoTxt(e), { fontSize: 12, strokeColor: es === "mai" ? C.muted : C.testo, cssStyle: "font-weight:700" });
              d.text(x + (wC - 4) / 2, y + 29, `w=${e.v[0]}` + segno(es), { fontSize: 11.5, strokeColor: col });
            });
            d.text(W - 14, H - 12, pesoTxt, { anchorX: "right", fontSize: 13.5, strokeColor: C.blu, cssStyle: "font-weight:700" });
            d.text(14, H - 12, T("componenti: ", "components: ") + P.gruppi.map((g) => "{" + g.join(",") + "}").join(" "), { anchorX: "left", fontSize: 12.5, strokeColor: C.testo });
          } else {
            const x0 = F.x + 6, hR = clamp((F.h - 110) / m, 16, 26);
            d.text(x0, F.y + 12, tit, { anchorX: "left", fontSize: 12, strokeColor: C.muted, cssStyle: "font-style:italic" });
            ord.forEach((e, q) => {
              const { es, cur, col } = stile(q), y = F.y + 28 + q * hR;
              d.rect(x0, y, F.w - 12, hR - 3, { strokeColor: cur ? (P.ok ? C.a : C.rosso) : col, strokeWidth: cur ? 2.6 : 1.2, dash: es === "no" ? 3 : 0, fillColor: es === "ok" ? C.blu : cur ? C.a : bg(), fillOpacity: es === "ok" ? 0.16 : cur ? 0.18 : 1, strokeOpacity: es === "mai" ? 0.5 : 1 });
              d.text(x0 + 10, y + (hR - 3) / 2, latoTxt(e), { anchorX: "left", fontSize: 12.5, strokeColor: es === "mai" ? C.muted : C.testo, cssStyle: "font-weight:700" });
              d.text(x0 + F.w - 22, y + (hR - 3) / 2, `w=${e.v[0]}` + segno(es), { anchorX: "right", fontSize: 12, strokeColor: col });
            });
            d.text(x0, F.y + F.h - 30, T("componenti: ", "components: ") + P.gruppi.map((g) => "{" + g.join(",") + "}").join(" "), { anchorX: "left", fontSize: 12, strokeColor: C.testo });
            d.text(x0, F.y + F.h - 8, pesoTxt, { anchorX: "left", fontSize: 13.5, strokeColor: C.blu, cssStyle: "font-weight:700" });
          }
        } else if (!Z.aDestra) {
          d.text(14, H - 26, `S = {${P.S.join(", ")}}`, { anchorX: "left", fontSize: 14, strokeColor: C.blu, cssStyle: "font-weight:700" });
          d.text(14, H - 8, T("accanto ai vertici fuori da S: d(v) e, fra parentesi, pred(v)", "next to the vertices outside S: d(v) and, in brackets, pred(v)"), { anchorX: "left", fontSize: 11.5, strokeColor: C.muted, cssStyle: "font-style:italic" });
          d.text(W - 14, H - 18, pesoTxt, { anchorX: "right", fontSize: 13.5, strokeColor: C.blu, cssStyle: "font-weight:700" });
        } else {
          const x0 = F.x + 6;
          d.text(x0, F.y + 14, `S = {${P.S.join(", ")}}`, { anchorX: "left", fontSize: 14, strokeColor: C.blu, cssStyle: "font-weight:700" });
          d.text(x0, F.y + 38, T("accanto ai vertici fuori da S:", "next to the vertices outside S:"), { anchorX: "left", fontSize: 11.5, strokeColor: C.muted, cssStyle: "font-style:italic" });
          d.text(x0, F.y + 54, T("d(v) e, fra parentesi, pred(v)", "d(v) and, in brackets, pred(v)"), { anchorX: "left", fontSize: 11.5, strokeColor: C.muted, cssStyle: "font-style:italic" });
          d.text(x0, F.y + F.h - 8, pesoTxt, { anchorX: "left", fontSize: 13.5, strokeColor: C.blu, cssStyle: "font-weight:700" });
        }
      });
    },
    formula(p, st) {
      const S = mstStato(st), { R, k, K, P } = S, isPrim = st.chiave() === "prim";
      if (isPrim) {
        if (k === 0) return `S = \\{${S.r}\\},\\quad F = \\emptyset`;
        return T(`\\text{iterazione } ${k}:\\ v = ${P.v},\\ d(${P.v}) = ${P.dv},\\quad F \\leftarrow F \\cup \\{${lato(P.e)}\\},\\quad w(F) = ${P.z}`,
          `\\text{iteration } ${k}:\\ v = ${P.v},\\ d(${P.v}) = ${P.dv},\\quad F \\leftarrow F \\cup \\{${lato(P.e)}\\},\\quad w(F) = ${P.z}`);
      }
      if (k === 0) return T(`\\text{${R.G.archi.length} lati ordinati per peso},\\quad F = \\emptyset`, `\\text{${R.G.archi.length} edges sorted by weight},\\quad F = \\emptyset`);
      const es = P.ok ? T("\\text{accetta}", "\\text{accept}") : T("\\text{rifiuta}", "\\text{reject}");
      return `k = ${k}:\\ e_k = ${lato(P.e)},\\ w_{e_k} = ${P.e.v[0]}:\\ ${es},\\quad |F| = ${P.F.length},\\ w(F) = ${P.z}` + (k === K && R.connesso ? `\\quad (|F| = n - 1 = ${R.G.n - 1})` : "");
    },
    letture(p, st) {
      const S = mstStato(st), { R, k, K, P } = S, G = R.G, C = M.COL(st), isPrim = st.chiave() === "prim";
      let nota = "";
      if (!isPrim) {
        if (k === 0) nota = T(`Kruskal esamina i lati per peso non decrescente (a pari peso in ordine lessicografico). Un lato è accettato se unisce due componenti diverse di \\((V,F)\\), cioè se \\(${COMP}(u) \\neq ${COMP}(v)\\); altrimenti chiuderebbe un ciclo ed è rifiutato. All'inizio \\(${COMP}(v) = v\\); unendo due componenti si rietichettano i vertici della più piccola.`,
          `Kruskal scans the edges by non-decreasing weight (ties in lexicographic order). An edge is accepted if it joins two different components of \\((V,F)\\), that is, if \\(${COMP}(u) \\neq ${COMP}(v)\\); otherwise it would close a cycle and is rejected. At the start \\(${COMP}(v) = v\\); merging two components relabels the vertices of the smaller one.`);
        else {
          const e = P.e, gr = P.gruppi.find((g) => g.includes(e.i));
          nota = T(`Passo ${k}: lato ${M.tinta(C.a, latoTxt(e))}, \\(w = ${e.v[0]}\\), con \\(${COMP}(${e.i}) = ${P.cu}\\) e \\(${COMP}(${e.j}) = ${P.cv}\\). `, `Step ${k}: edge ${M.tinta(C.a, latoTxt(e))}, \\(w = ${e.v[0]}\\), with \\(${COMP}(${e.i}) = ${P.cu}\\) and \\(${COMP}(${e.j}) = ${P.cv}\\). `);
          nota += P.ok ? T(`Componenti diverse: ${M.tinta(C.blu, "accetta")}; i vertici ${lista(P.rietichettati)} prendono l'etichetta ${P.a}. Componenti: \\(${gruppiTex(P.gruppi)}\\).`, `Different components: ${M.tinta(C.blu, "accept")}; the vertices ${lista(P.rietichettati)} take the label ${P.a}. Components: \\(${gruppiTex(P.gruppi)}\\).`)
            : T(`${M.tinta(C.rosso, "Rifiuta")}: ${e.i} e ${e.j} sono entrambi in \\(\\{${gr.join(",")}\\}\\).`, `${M.tinta(C.rosso, "Reject")}: ${e.i} and ${e.j} are both in \\(\\{${gr.join(",")}\\}\\).`);
          if (k === K) nota += R.connesso ? T(` \\(|F| = ${G.n - 1}\\): STOP dopo ${P.esiti.length} dei ${P.ord.length} lati. ${M.tinta(C.blu, `Peso minimo \\(${R.z}\\)`)}.`, ` \\(|F| = ${G.n - 1}\\): STOP after ${P.esiti.length} of the ${P.ord.length} edges. ${M.tinta(C.blu, `Minimum weight \\(${R.z}\\)`)}.`)
            : T(" Il grafo non è connesso: si ottiene una foresta.", " The graph is not connected: the result is a forest.");
        }
        const righe = P.ord.map((e, q) => [String(q + 1), `\\(${lato(e)}\\)`, `\\(${e.v[0]}\\)`,
          q < P.esiti.length ? (P.esiti[q] ? T("accetta", "accept") : T("rifiuta (ciclo)", "reject (cycle)")) : k === K ? T("mai esaminato", "never scanned") : ""]);
        const tabc = M.tab(["\\(v\\)", ...Array.from({ length: G.n }, (_, v) => `\\(${v + 1}\\)`)], [[`\\(${COMP}(v)\\)`, ...P.comp.slice(1).map(String)]], -1, C.a);
        return nota + `<div style="margin:.5em 0 .2em"><strong>${T("Lati ordinati", "Sorted edges")}</strong></div>` + M.tab(["\\(k\\)", T("lato \\(e_k\\)", "edge \\(e_k\\)"), "\\(w_{e_k}\\)", T("decisione", "decision")], righe, P.esiti.length - 1, C.a)
          + `<div style="margin:.6em 0 .2em"><strong>${T("Etichette di componente", "Component labels")}</strong></div>` + tabc
          + `<p style="margin:.4em 0">\\(w(F) = ${P.z}\\)</p>`;
      }
      // Prim
      if (k === 0) nota = T(`Passo 0: \\(S = \\{${S.r}\\}\\), \\(F = \\emptyset\\); \\(d(v) = w_{${S.r}v}\\) e \\(\\mathit{pred}(v) = ${S.r}\\) per i vicini di ${S.r}, \\(d(v) = +\\infty\\) per gli altri. A ogni iterazione entra in \\(S\\) il vertice con \\(d(v)\\) minimo (a pari merito l'indice più piccolo), con il lato \\(\\{\\mathit{pred}(v), v\\}\\), il più leggero del taglio \\(\\delta(S)\\).`,
        `Step 0: \\(S = \\{${S.r}\\}\\), \\(F = \\emptyset\\); \\(d(v) = w_{${S.r}v}\\) and \\(\\mathit{pred}(v) = ${S.r}\\) for the neighbours of ${S.r}, \\(d(v) = +\\infty\\) for the others. At each iteration the vertex with minimum \\(d(v)\\) (ties: smallest index) enters \\(S\\), with the edge \\(\\{\\mathit{pred}(v), v\\}\\), the lightest of the cut \\(\\delta(S)\\).`);
      else {
        nota = T(`Iterazione ${k}: il minimo fuori da \\(S\\) è \\(d(${P.v}) = ${P.dv}\\): ${M.tinta(C.a, String(P.v))} entra in \\(S\\) e \\(F\\) riceve ${M.tinta(C.a, latoTxt(P.e))}. `, `Iteration ${k}: the minimum outside \\(S\\) is \\(d(${P.v}) = ${P.dv}\\): ${M.tinta(C.a, String(P.v))} enters \\(S\\) and \\(F\\) receives ${M.tinta(C.a, latoTxt(P.e))}. `);
        nota += P.aggiornati.length ? T(`Etichette che scendono (\\(w_{${P.v}u} < d(u)\\)): ${P.aggiornati.map((v) => `\\(d(${v}) = ${P.d[v]}\\)`).join(", ")}, con \\(\\mathit{pred} = ${P.v}\\).`, `Labels that drop (\\(w_{${P.v}u} < d(u)\\)): ${P.aggiornati.map((v) => `\\(d(${v}) = ${P.d[v]}\\)`).join(", ")}, with \\(\\mathit{pred} = ${P.v}\\).`)
          : T("Nessuna etichetta scende.", "No label drops.");
        if (k === K) nota += R.connesso ? T(` \\(S = V\\): STOP. ${M.tinta(C.blu, `Peso minimo \\(${R.z}\\)`)}.`, ` \\(S = V\\): STOP. ${M.tinta(C.blu, `Minimum weight \\(${R.z}\\)`)}.`) : T(" Restano vertici con \\(d = \\infty\\): il grafo non è connesso.", " Some vertices keep \\(d = \\infty\\): the graph is not connected.");
      }
      // la tabella del capitolo: una riga per iterazione, d(v) (pred) dei vertici fuori da S
      const altri = Array.from({ length: G.n }, (_, q) => q + 1).filter((v) => v !== S.r);
      const righe = R.passi.slice(0, k + 1).map((q, t) => [String(t), String(q.v), q.e ? `\\(${lato(q.e)}\\)` : "–",
        ...altri.map((v) => (q.S.includes(v) ? "–" : q.d[v] === Infinity ? "\\(\\infty\\)" : `${q.d[v]} (${q.pred[v]})`))]);
      const taglio = G.archi.filter((a) => P.S.includes(a.i) !== P.S.includes(a.j));
      return nota + `<div style="margin:.5em 0 .2em"><strong>${T("Iterazioni ed etichette", "Iterations and labels")}</strong></div>`
        + M.tab([T("it.", "it."), "\\(v\\)", T("lato", "edge"), ...altri.map((v) => `\\(d(${v})\\)`)], righe, k, C.a)
        + `<p style="margin:.4em 0">\\(S = \\{${P.S.join(",")}\\}\\)` + (taglio.length ? T(`; taglio \\(\\delta(S)\\): ${taglio.map((a) => `\\(${lato(a)}\\)`).join(", ")}`, `; cut \\(\\delta(S)\\): ${taglio.map((a) => `\\(${lato(a)}\\)`).join(", ")}`) : "") + "</p>"
        + `<p style="margin:.4em 0">\\(F\\): ${P.F.length ? P.F.map((e) => `\\(${lato(e)}\\)`).join(", ") : "\\(\\emptyset\\)"}; \\(w(F) = ${P.z}\\)</p>`;
    },
    domanda: T("Sul grafo di riferimento Kruskal e Prim danno lo stesso albero di peso 18: in che ordine entrano i lati? Perché Kruskal non esamina mai \\(\\{3,5\\}\\) e \\(\\{4,6\\}\\)? Con i pari merito \\(w_{12} = w_{23} = 3\\) quale albero sceglie ciascun algoritmo?",
      "On the reference graph Kruskal and Prim give the same tree of weight 18: in which order do the edges enter? Why does Kruskal never scan \\(\\{3,5\\}\\) and \\(\\{4,6\\}\\)? With the ties \\(w_{12} = w_{23} = 3\\), which tree does each algorithm pick?"),
  };

  window.GI_NO_A = { ricerca, RIC_ES, kruskal, prim, MST_ES };
})();
