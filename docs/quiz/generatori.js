// Domande generate dell'autovalutazione — Ottimizzazione su reti / Network Optimization.
// Ogni generatore crea un'istanza nuova con rng() (deterministico, in [0,1)), calcola la risposta
// esatta e tre distrattori dagli errori tipici delle dispense. Notazione delle dispense:
// arco (i,j) con coda i e testa j, potenziali pi_i, costo ridotto c̄_ij = c_ij - pi_i + pi_j.
// Il campo "dati" (istanza) e "valori" (valori delle 4 opzioni) servono solo ai controlli in verifica/.
(function () {
  "use strict";
  var MOD = "network-optimization";
  window.QUIZ_GEN = window.QUIZ_GEN || {};
  var GEN = (window.QUIZ_GEN[MOD] = window.QUIZ_GEN[MOD] || []);
  var EN = "https://fabiofurini.github.io/network-optimization/";
  var IT = "https://fabiofurini.github.io/ottimizzazione-su-reti/";
  function link(en, it, anc) { return { it: IT + it + "#" + anc, en: EN + en + "#" + anc }; }

  // ------------------------------------------------------------------ utilità
  var INF = Infinity;
  function ri(rng, a, b) { return a + Math.floor(rng() * (b - a + 1)); }
  function shuffle(rng, a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rng() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function range(a, b) { var r = []; for (var i = a; i <= b; i++) r.push(i); return r; }
  function num(v) { return v === INF ? "+\\infty" : (v === -INF ? "-\\infty" : String(v)); }
  function vec(a) { return "(" + a.map(num).join(",") + ")"; }
  function M(s) { return "$" + s + "$"; }
  function arc(a) { return "(" + a[0] + "," + a[1] + ")"; }
  function edge(a) { return "\\{" + a[0] + "," + a[1] + "\\}"; }
  function seq(a) { return a.join(",\\,"); }
  function T(l, it, en) { return l === "it" ? it : en; }
  function key(v) { return JSON.stringify(v, function (k, x) { return x === INF ? "inf" : x; }); }
  function clone(v) { return JSON.parse(JSON.stringify(v)); }

  // valori: valore corretto + candidati distrattori (in ordine di preferenza): prende i primi 3 distinti
  function scegli(rng, corr, cand) {
    var vis = {}; vis[key(corr)] = 1; var d = [];
    for (var i = 0; i < cand.length && d.length < 3; i++) {
      if (cand[i] === null || cand[i] === undefined) continue;
      var k = key(cand[i]);
      if (!vis[k]) { vis[k] = 1; d.push(cand[i]); }
    }
    if (d.length < 3) return null;
    var pos = Math.floor(rng() * 4); var vals = d.slice(); vals.splice(pos, 0, corr);
    return { valori: vals, corretta: pos };
  }
  function riprova(f) {
    for (var t = 0; t < 2000; t++) { var r = f(); if (r) return r; }
    throw new Error("generatore: nessuna istanza valida");
  }
  function pacchetto(sc, fmt, testo, spieg, dati) {
    var op = sc.valori.map(fmt);
    var vis = {};
    for (var i = 0; i < 4; i++) { if (vis[op[i]]) return null; vis[op[i]] = 1; }
    return { testo: testo, opzioni: op, corretta: sc.corretta, spiegazione: spieg, dati: dati, valori: sc.valori };
  }

  // grafi orientati casuali: nodi 1..n, archi distinti senza archi opposti se richiesto
  function digrafo(rng, n, m, opts) {
    opts = opts || {};
    var arcs = [], has = {};
    function add(i, j) {
      if (i === j || has[i + "," + j] || (opts.noOpposti && has[j + "," + i])) return false;
      if (opts.dag && i > j) return false;
      has[i + "," + j] = 1; arcs.push([i, j]); return true;
    }
    // ogni nodo raggiungibile da 1: albero casuale orientato verso l'esterno
    var perm = [1].concat(shuffle(rng, range(2, n)));
    if (opts.dag) perm = range(1, n);
    for (var k = 1; k < n; k++) { var p = perm[ri(rng, 0, k - 1)]; add(p, perm[k]); }
    var guard = 0;
    while (arcs.length < m && guard++ < 1000) add(ri(rng, 1, n), ri(rng, 1, n));
    arcs.sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    return arcs;
  }
  function liste(n, arcs) {
    var L = {}; for (var i = 1; i <= n; i++) L[i] = [];
    arcs.forEach(function (a) { L[a[0]].push(a[1]); });
    for (i = 1; i <= n; i++) L[i].sort(function (a, b) { return a - b; });
    return L;
  }
  function testoListe(n, L) {
    var r = [];
    for (var i = 1; i <= n; i++) r.push(M("L(" + i + ")=" + (L[i].length ? "(" + L[i].join(",") + ")" : "\\emptyset")));
    return r.join(", ");
  }
  // visita generica delle dispense: BFS prende il primo nodo di LIST, DFS l'ultimo;
  // primo arco ammissibile nella lista; si ferma quando LIST è vuota (o, se dato, quando t è etichettato)
  function visita(n, L, s, modo, t) {
    var lab = {}, pred = {}, ord = [s], tolti = [], list = [s]; lab[s] = 1;
    while (list.length) {
      var idx = modo === "bfs" ? 0 : list.length - 1, i = list[idx], j = null;
      for (var k = 0; k < L[i].length; k++) if (!lab[L[i][k]]) { j = L[i][k]; break; }
      if (j !== null) { lab[j] = 1; pred[j] = i; ord.push(j); list.push(j); if (t !== undefined && j === t) break; }
      else { list.splice(idx, 1); tolti.push(i); }
    }
    return { ordine: ord, tolti: tolti, pred: pred, lab: lab };
  }

  // ------------------------------------------------------------------ 1. BFS
  GEN.push({
    id: "no-g-bfs", livello: "facile", capitolo: "graphs",
    link: link("graphs/graphs/graph-search/", "grafi/graphs/visita-di-un-grafo/", "box-32-gr-def-search"),
    genera: function (rng, l) {
      return riprova(function () {
        var n = 6, arcs = digrafo(rng, n, ri(rng, 8, 10)), L = liste(n, arcs);
        var Lr = {}; for (var i = 1; i <= n; i++) Lr[i] = L[i].slice().reverse();
        var bfs = visita(n, L, 1, "bfs").ordine, dfs = visita(n, L, 1, "dfs").ordine;
        var bfsR = visita(n, Lr, 1, "bfs").ordine, indici = range(1, n);
        var sc = scegli(rng, bfs, [dfs, bfsR, indici]);
        if (!sc) return null;
        return pacchetto(sc, function (v) { return M(seq(v)); },
          T(l, "Il grafo orientato con nodi $1,\\dots,6$ ha le liste di adiacenza (ordinate per indice crescente) ",
            "The directed graph with nodes $1,\\dots,6$ has the adjacency lists (sorted by increasing index) ") +
          testoListe(n, L) + T(l, ". La visita generica da $s=1$ tiene in $\\mathit{LIST}$ i nodi etichettati da esaminare: esamina un nodo $i$ di $\\mathit{LIST}$, etichetta la prima testa non etichettata della lista $L(i)$, oppure toglie $i$ da $\\mathit{LIST}$ se non ce ne sono. Nella visita in ampiezza (BFS) $i$ è sempre il primo nodo di $\\mathit{LIST}$ (una coda). In quale ordine la BFS etichetta i nodi?",
            ". The generic search from $s=1$ keeps in $\\mathit{LIST}$ the labelled nodes to be examined: it examines a node $i$ of $\\mathit{LIST}$ and labels the first unlabelled head of the list $L(i)$, or removes $i$ from $\\mathit{LIST}$ if there is none. In the breadth-first search (BFS) $i$ is always the first node of $\\mathit{LIST}$ (a queue). In which order does the BFS label the nodes?"),
          T(l, "La BFS prende sempre il primo nodo di $\\mathit{LIST}$ (una coda) e il primo arco ammissibile della sua lista: ordine " + M(seq(bfs)) + ". L'ordine " + M(seq(dfs)) + " è quello della DFS, che prende l'ultimo nodo.",
            "The BFS always selects the first node of $\\mathit{LIST}$ (a queue) and the first admissible arc of its list: order " + M(seq(bfs)) + ". The order " + M(seq(dfs)) + " is that of the DFS, which selects the last node."),
          { n: n, arcs: arcs });
      });
    }
  });

  // ------------------------------------------------------------------ 2. DFS
  GEN.push({
    id: "no-g-dfs", livello: "facile", capitolo: "graphs",
    link: link("graphs/graphs/graph-search/", "grafi/graphs/visita-di-un-grafo/", "box-32-gr-def-search"),
    genera: function (rng, l) {
      return riprova(function () {
        var n = 6, arcs = digrafo(rng, n, ri(rng, 8, 10)), L = liste(n, arcs);
        var Lr = {}; for (var i = 1; i <= n; i++) Lr[i] = L[i].slice().reverse();
        var v = visita(n, L, 1, "dfs"), dfs = v.ordine, post = v.tolti;
        var bfs = visita(n, L, 1, "bfs").ordine, dfsR = visita(n, Lr, 1, "dfs").ordine;
        var sc = scegli(rng, dfs, [bfs, post, dfsR]);
        if (!sc) return null;
        return pacchetto(sc, function (x) { return M(seq(x)); },
          T(l, "Il grafo orientato con nodi $1,\\dots,6$ ha le liste di adiacenza (ordinate per indice crescente) ",
            "The directed graph with nodes $1,\\dots,6$ has the adjacency lists (sorted by increasing index) ") +
          testoListe(n, L) + T(l, ". La visita generica da $s=1$ tiene in $\\mathit{LIST}$ i nodi etichettati da esaminare: esamina un nodo $i$ di $\\mathit{LIST}$, etichetta la prima testa non etichettata della lista $L(i)$, oppure toglie $i$ da $\\mathit{LIST}$ se non ce ne sono. Nella visita in profondità (DFS) $i$ è sempre l'ultimo nodo di $\\mathit{LIST}$ (una pila). In quale ordine la DFS etichetta i nodi?",
            ". The generic search from $s=1$ keeps in $\\mathit{LIST}$ the labelled nodes to be examined: it examines a node $i$ of $\\mathit{LIST}$ and labels the first unlabelled head of the list $L(i)$, or removes $i$ from $\\mathit{LIST}$ if there is none. In the depth-first search (DFS) $i$ is always the last node of $\\mathit{LIST}$ (a stack). In which order does the DFS label the nodes?"),
          T(l, "La DFS prende sempre l'ultimo nodo di $\\mathit{LIST}$ (una pila) e il primo arco ammissibile della sua lista; un nodo senza archi ammissibili esce da $\\mathit{LIST}$. Ordine di etichettatura " + M(seq(dfs)) + "; " + M(seq(post)) + " è l'ordine in cui i nodi escono da $\\mathit{LIST}$.",
            "The DFS always selects the last node of $\\mathit{LIST}$ (a stack) and the first admissible arc of its list; a node without admissible arcs leaves $\\mathit{LIST}$. Labelling order " + M(seq(dfs)) + "; " + M(seq(post)) + " is the order in which the nodes leave $\\mathit{LIST}$."),
          { n: n, arcs: arcs });
      });
    }
  });

  // ------------------------------------------------------------------ 3. rango della matrice di incidenza
  GEN.push({
    id: "no-g-rank", livello: "facile", capitolo: "graphs",
    link: link("graphs/graphs/the-rank-of-the-incidence-matrix/", "grafi/graphs/il-rango-della-matrice-di-incidenza/", "box-29-gr-th-rank"),
    genera: function (rng, l) {
      return riprova(function () {
        var n = ri(rng, 6, 8), k = ri(rng, 2, 3);
        var nodi = shuffle(rng, range(1, n)), gruppi = [];
        for (var g = 0; g < k; g++) gruppi.push([nodi[g]]);
        for (var t = k; t < n; t++) gruppi[ri(rng, 0, k - 1)].push(nodi[t]);
        var arcs = [], has = {};
        function add(i, j) { if (i === j || has[i + "," + j] || has[j + "," + i]) return; has[i + "," + j] = 1; arcs.push([i, j]); }
        gruppi.forEach(function (G) {
          for (var q = 1; q < G.length; q++) { var p = G[ri(rng, 0, q - 1)]; if (rng() < 0.5) add(p, G[q]); else add(G[q], p); }
          if (G.length >= 3) { var e = shuffle(rng, G); add(e[0], e[1]); }
        });
        arcs.sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
        var m = arcs.length, corr = n - k;
        var sc = scegli(rng, corr, [n - 1, n, m - k, n - k + 1, m]);
        if (!sc) return null;
        return pacchetto(sc, function (v) { return M(v); },
          T(l, "Il grafo orientato con nodi $1,\\dots," + n + "$ ha gli archi ", "The directed graph with nodes $1,\\dots," + n + "$ has the arcs ") +
          arcs.map(function (a) { return M(arc(a)); }).join(", ") +
          T(l, ". Quanto vale il rango della sua matrice di incidenza nodo–arco $\\mat{B}$ (una riga per nodo, una colonna per arco, $+1$ nella coda e $-1$ nella testa)?", ". What is the rank of its node–arc incidence matrix $\\mat{B}$ (one row per node, one column per arc, $+1$ in the tail and $-1$ in the head)?"),
          T(l, "Il grafo non orientato sottostante ha $k=" + k + "$ componenti connesse, quindi $\\rank(\\mat{B})=|N|-k=" + n + "-" + k + "=" + corr + "$. $|N|-1$ vale solo per un grafo connesso.",
            "The underlying undirected graph has $k=" + k + "$ connected components, so $\\rank(\\mat{B})=|N|-k=" + n + "-" + k + "=" + corr + "$. $|N|-1$ holds only for a connected graph."),
          { n: n, arcs: arcs });
      });
    }
  });

  // grafi non orientati pesati connessi: n vertici, m spigoli, pesi distinti
  function grafoPesato(rng, n, m, wmax) {
    var E = [], has = {}, perm = shuffle(rng, range(1, n));
    function add(u, v) { var a = Math.min(u, v), b = Math.max(u, v); if (a === b || has[a + "," + b]) return; has[a + "," + b] = 1; E.push([a, b]); }
    for (var k = 1; k < n; k++) add(perm[ri(rng, 0, k - 1)], perm[k]);
    var g = 0; while (E.length < m && g++ < 1000) add(ri(rng, 1, n), ri(rng, 1, n));
    var W = shuffle(rng, range(1, wmax)).slice(0, E.length);
    E.sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    return E.map(function (e, i) { return [e[0], e[1], W[i]]; });
  }
  function kruskal(n, E) {
    var comp = {}; for (var i = 1; i <= n; i++) comp[i] = i;
    var ord = E.slice().sort(function (a, b) { return a[2] - b[2]; }), F = [];
    ord.forEach(function (e) {
      if (comp[e[0]] !== comp[e[1]]) { var c = comp[e[1]]; for (var v = 1; v <= n; v++) if (comp[v] === c) comp[v] = comp[e[0]]; F.push(e); }
    });
    return F;
  }
  function peso(F) { return F.reduce(function (s, e) { return s + e[2]; }, 0); }
  function adiacenzeND(n, E) {
    var A = {}; for (var i = 1; i <= n; i++) A[i] = [];
    E.forEach(function (e) { A[e[0]].push([e[1], e[2]]); A[e[1]].push([e[0], e[2]]); });
    return A;
  }
  // Prim (path=false) o Dijkstra non orientato (path=true) da s: ordine dei vertici scelti e spigoli dell'albero
  function primLike(n, E, s, path) {
    var A = adiacenzeND(n, E), d = {}, pred = {}, inS = {}, ord = [], F = [];
    for (var i = 1; i <= n; i++) d[i] = INF;
    d[s] = 0; inS[s] = 1;
    A[s].forEach(function (p) { d[p[0]] = p[1]; pred[p[0]] = s; });
    for (var it = 1; it < n; it++) {
      var v = null;
      for (i = 1; i <= n; i++) if (!inS[i] && d[i] < INF && (v === null || d[i] < d[v])) v = i;
      if (v === null) break;
      inS[v] = 1; ord.push(v);
      F.push([Math.min(pred[v], v), Math.max(pred[v], v), E.filter(function (e) { return (e[0] === Math.min(pred[v], v) && e[1] === Math.max(pred[v], v)); })[0][2]]);
      A[v].forEach(function (p) {
        var u = p[0]; if (inS[u]) return;
        var val = path ? d[v] + p[1] : p[1];
        if (val < d[u]) { d[u] = val; pred[u] = v; }
      });
    }
    return { ordine: ord, F: F };
  }
  function testoSpigoli(E) { return E.map(function (e) { return M("w_{" + e[0] + e[1] + "}=" + e[2]); }).join(", "); }

  // ------------------------------------------------------------------ 4. Kruskal: peso dell'albero ricoprente di costo minimo
  GEN.push({
    id: "no-g-kruskal", livello: "facile", capitolo: "minimum-spanning-trees",
    link: link("trees-and-paths/minimum-spanning-trees/kruskal-s-algorithm/", "alberi-e-cammini/minimum-spanning-trees/algoritmo-di-kruskal/", "sez-sec-mst-kruskal"),
    genera: function (rng, l) {
      return riprova(function () {
        var n = 6, E = grafoPesato(rng, n, 9, 15), F = kruskal(n, E), w = peso(F);
        var light = peso(E.slice().sort(function (a, b) { return a[2] - b[2]; }).slice(0, n - 1));
        var spt = peso(primLike(n, E, 1, true).F);
        // secondo miglior albero: miglior scambio e fuori, f nel ciclo fondamentale
        var best = INF;
        E.forEach(function (e) {
          if (F.indexOf(e) >= 0) return;
          F.forEach(function (f) {
            var T2 = F.filter(function (g) { return g !== f; }).concat([e]);
            if (kruskal(n, T2).length === n - 1) best = Math.min(best, w + e[2] - f[2]);
          });
        });
        var sc = scegli(rng, w, [light, spt, best]);
        if (!sc) return null;
        return pacchetto(sc, function (v) { return M(v); },
          T(l, "Il grafo non orientato con vertici $1,\\dots,6$ ha gli spigoli con pesi ", "The undirected graph with vertices $1,\\dots,6$ has the edges with weights ") +
          testoSpigoli(E) + T(l, " (dove $w_{uv}$ è il peso di $\\{u,v\\}$). Quanto pesa un albero ricoprente di costo minimo, cioè di peso totale minimo?", " (where $w_{uv}$ is the weight of $\\{u,v\\}$). What is the weight of a minimum spanning tree, that is, of minimum total weight?"),
          T(l, "Kruskal accetta, per pesi crescenti, gli spigoli che uniscono due componenti: " + F.map(function (e) { return M(edge(e)); }).join(", ") + ", peso $" + w + "$. La somma dei $5$ pesi più piccoli ($" + light + "$) ignora i cicli.",
            "Kruskal accepts, by increasing weight, the edges joining two components: " + F.map(function (e) { return M(edge(e)); }).join(", ") + ", weight $" + w + "$. The sum of the $5$ smallest weights ($" + light + "$) ignores the cycles."),
          { n: n, E: E });
      });
    }
  });

  // ------------------------------------------------------------------ 5. Prim: ordine dei vertici
  GEN.push({
    id: "no-g-prim", livello: "facile", capitolo: "minimum-spanning-trees",
    link: link("trees-and-paths/minimum-spanning-trees/prim-s-algorithm/", "alberi-e-cammini/minimum-spanning-trees/algoritmo-di-prim/", "sez-sec-mst-prim"),
    genera: function (rng, l) {
      return riprova(function () {
        var n = 6, E = grafoPesato(rng, n, 9, 15);
        var prim = primLike(n, E, 1, false).ordine, dij = primLike(n, E, 1, true).ordine;
        // etichette mai aggiornate: ordine per w_{1v} (gli altri dopo, per indice)
        var A = adiacenzeND(n, E), w1 = {};
        A[1].forEach(function (p) { w1[p[0]] = p[1]; });
        var stat = range(2, n).sort(function (a, b) { var x = w1[a] === undefined ? INF : w1[a], y = w1[b] === undefined ? INF : w1[b]; return x - y || a - b; });
        // ordine in cui Kruskal tocca i vertici
        var tocc = [];
        kruskal(n, E).forEach(function (e) { [e[0], e[1]].forEach(function (v) { if (v !== 1 && tocc.indexOf(v) < 0) tocc.push(v); }); });
        var sc = scegli(rng, prim, [dij, tocc, stat]);
        if (!sc) return null;
        return pacchetto(sc, function (v) { return M(seq(v)); },
          T(l, "Il grafo non orientato con vertici $1,\\dots,6$ ha gli spigoli con pesi ", "The undirected graph with vertices $1,\\dots,6$ has the edges with weights ") +
          testoSpigoli(E) + T(l, " ($w_{uv}$ è il peso di $\\{u,v\\}$). L'algoritmo di Prim parte da $S=\\{1\\}$ e a ogni passo inserisce in $S$ il vertice fuori da $S$ collegato a $S$ dallo spigolo più leggero. In quale ordine inserisce gli altri vertici?", " ($w_{uv}$ is the weight of $\\{u,v\\}$). Prim's algorithm starts from $S=\\{1\\}$ and at every step inserts into $S$ the vertex outside $S$ joined to $S$ by the lightest edge. In which order does it insert the other vertices?"),
          T(l, "Prim sceglie il vertice fuori da $S$ con etichetta minima e aggiorna $d(u):=w_{vu}$ se $w_{vu}<d(u)$: ordine " + M(seq(prim)) + ". Con $d(v)+w_{vu}$ (Dijkstra) si otterrebbe " + M(seq(dij)) + ".",
            "Prim selects the vertex outside $S$ with minimum label and updates $d(u):=w_{vu}$ if $w_{vu}<d(u)$: order " + M(seq(prim)) + ". With $d(v)+w_{vu}$ (Dijkstra) one would get " + M(seq(dij)) + "."),
          { n: n, E: E });
      });
    }
  });

  // cammini minimi su grafi orientati
  function dijkstra(n, A, s, modo) { // modo: "giusto" | "primo" (etichetta mai migliorata) | "prim" (d(j):=d_ij)
    var d = {}, perm = {}, ord = [];
    for (var i = 1; i <= n; i++) d[i] = INF;
    d[s] = 0;
    while (true) {
      var v = null;
      for (i = 1; i <= n; i++) if (!perm[i] && d[i] < INF && (v === null || d[i] < d[v])) v = i;
      if (v === null) break;
      perm[v] = 1; ord.push(v);
      A.forEach(function (a) {
        if (a[0] !== v || perm[a[1]]) return;
        var val = modo === "prim" ? a[2] : d[v] + a[2];
        if (modo === "primo") { if (d[a[1]] === INF) d[a[1]] = val; }
        else if (val < d[a[1]]) d[a[1]] = val;
      });
    }
    return { d: range(1, n).map(function (j) { return d[j]; }), ordine: ord };
  }
  function bellmanK(n, A, s, K) { // tabella d^0..d^K (ricorsione di Jacobi)
    var tab = [range(1, n).map(function (j) { return j === s ? 0 : INF; })];
    for (var k = 1; k <= K; k++) {
      var p = tab[k - 1], q = p.slice();
      A.forEach(function (a) { if (p[a[0] - 1] + a[2] < q[a[1] - 1]) q[a[1] - 1] = p[a[0] - 1] + a[2]; });
      tab.push(q);
    }
    return tab;
  }
  function minArchi(n, A, s) { // fra i cammini con il minimo numero di archi, la lunghezza minima
    var lev = {}, d = {}; lev[s] = 0; d[s] = 0; var front = [s], k = 0;
    while (front.length) {
      k++; var nuovo = [];
      A.forEach(function (a) {
        if (front.indexOf(a[0]) >= 0 && lev[a[1]] === undefined) { lev[a[1]] = k; nuovo.push(a[1]); }
      });
      nuovo.forEach(function (j) {
        d[j] = INF;
        A.forEach(function (a) { if (a[1] === j && front.indexOf(a[0]) >= 0) d[j] = Math.min(d[j], d[a[0]] + a[2]); });
      });
      front = nuovo.filter(function (x, i) { return nuovo.indexOf(x) === i; });
    }
    return range(1, n).map(function (j) { return d[j] === undefined ? INF : d[j]; });
  }
  function testoArchiPesati(A, sim) { return A.map(function (a) { return M(sim + "_{" + a[0] + a[1] + "}=" + a[2]); }).join(", "); }

  // ------------------------------------------------------------------ 6. Dijkstra: distanze
  GEN.push({
    id: "no-g-dijkstra", livello: "facile", capitolo: "shortest-paths",
    link: link("trees-and-paths/shortest-paths/dijkstra-s-algorithm/", "alberi-e-cammini/shortest-paths/l-algoritmo-di-dijkstra/", "box-30-sp-th-dijkstra"),
    genera: function (rng, l) {
      return riprova(function () {
        var n = 6, arcs = digrafo(rng, n, ri(rng, 9, 11));
        var A = arcs.map(function (a) { return [a[0], a[1], ri(rng, 1, 9)]; });
        var d = dijkstra(n, A, 1, "giusto").d, primo = dijkstra(n, A, 1, "primo").d, prim = dijkstra(n, A, 1, "prim").d;
        var hop = minArchi(n, A, 1);
        var sc = scegli(rng, d, [primo, hop, prim]);
        if (!sc) return null;
        return pacchetto(sc, function (v) { return M(vec(v)); },
          T(l, "Il grafo orientato con nodi $1,\\dots,6$ ha gli archi con lunghezze ", "The directed graph with nodes $1,\\dots,6$ has the arcs with lengths ") +
          testoArchiPesati(A, "d") + T(l, " ($d_{ij}$ è la lunghezza dell'arco $(i,j)$). La distanza $\\tilde{d}(j)$ è la lunghezza minima di un cammino orientato da $s=1$ a $j$. Quali distanze $\\tilde{d}=(\\tilde{d}(1),\\dots,\\tilde{d}(6))$ calcola l'algoritmo di Dijkstra da $s=1$?", " ($d_{ij}$ is the length of the arc $(i,j)$). The distance $\\tilde{d}(j)$ is the minimum length of a directed path from $s=1$ to $j$. Which distances $\\tilde{d}=(\\tilde{d}(1),\\dots,\\tilde{d}(6))$ does Dijkstra's algorithm from $s=1$ compute?"),
          T(l, "Dijkstra rende permanente il nodo temporaneo con etichetta minima e aggiorna $d(j):=d(i)+d_{ij}$ quando migliora; l'etichetta di un nodo può migliorare più volte prima che diventi permanente. Distanze " + M(vec(d)) + ".",
            "Dijkstra makes permanent the temporary node with the smallest label and updates $d(j):=d(i)+d_{ij}$ when it improves; a label can improve several times before it becomes permanent. Distances " + M(vec(d)) + "."),
          { n: n, A: A });
      });
    }
  });

  // ------------------------------------------------------------------ 7. Bellman–Ford: etichette d^2
  GEN.push({
    id: "no-g-bellman-ford", livello: "media", capitolo: "shortest-paths",
    link: link("trees-and-paths/shortest-paths/the-bellman-ford-algorithm/", "alberi-e-cammini/shortest-paths/l-algoritmo-di-bellmanford/", "box-23-sp-lem-recursion"),
    genera: function (rng, l) {
      return riprova(function () {
        var n = 5, arcs = digrafo(rng, n, ri(rng, 7, 8), { noOpposti: true });
        var A = arcs.map(function (a) { return [a[0], a[1], ri(rng, 1, 9)]; });
        var negs = shuffle(rng, range(0, A.length - 1)).slice(0, ri(rng, 1, 2));
        negs.forEach(function (k) { A[k][2] = -ri(rng, 1, 4); });
        var tab = bellmanK(n, A, 1, n);
        if (key(tab[n]) !== key(tab[n - 1])) return null; // nessun ciclo negativo
        // Gauss–Seidel: due passate sul posto, archi nell'ordine della lista
        var gs = tab[0].slice();
        for (var p = 0; p < 2; p++) A.forEach(function (a) { if (gs[a[0] - 1] + a[2] < gs[a[1] - 1]) gs[a[1] - 1] = gs[a[0] - 1] + a[2]; });
        var sc = scegli(rng, tab[2], [tab[1], gs, tab[3], tab[n]]);
        if (!sc) return null;
        return pacchetto(sc, function (v) { return M(vec(v)); },
          T(l, "Il grafo orientato con nodi $1,\\dots,5$ ha gli archi con lunghezze ", "The directed graph with nodes $1,\\dots,5$ has the arcs with lengths ") +
          testoArchiPesati(A, "d") + T(l, ". L'algoritmo di Bellman–Ford da $s=1$ parte da $d^0=(0,+\\infty,\\dots,+\\infty)$ e nella passata $k$ pone $d^k(j)=\\min\\{d^{k-1}(j),\\min_{(i,j)}(d^{k-1}(i)+d_{ij})\\}$, usando solo le etichette della passata precedente. Quali sono le etichette $d^2=(d^2(1),\\dots,d^2(5))$?",
            ". The Bellman–Ford algorithm from $s=1$ starts from $d^0=(0,+\\infty,\\dots,+\\infty)$ and in pass $k$ sets $d^k(j)=\\min\\{d^{k-1}(j),\\min_{(i,j)}(d^{k-1}(i)+d_{ij})\\}$, using only the labels of the previous pass. What are the labels $d^2=(d^2(1),\\dots,d^2(5))$?"),
          T(l, "$d^k(j)$ è la lunghezza minima di una passeggiata da $s$ a $j$ con al più $k$ archi: $d^k(j)=\\min\\{d^{k-1}(j),\\min_{(i,j)}(d^{k-1}(i)+d_{ij})\\}$, usando solo le etichette della passata precedente. $d^1=" + vec(tab[1]) + "$, $d^2=" + vec(tab[2]) + "$.",
            "$d^k(j)$ is the minimum length of a walk from $s$ to $j$ with at most $k$ arcs: $d^k(j)=\\min\\{d^{k-1}(j),\\min_{(i,j)}(d^{k-1}(i)+d_{ij})\\}$, using only the labels of the previous pass. $d^1=" + vec(tab[1]) + "$, $d^2=" + vec(tab[2]) + "$."),
          { n: n, A: A });
      });
    }
  });

  // ------------------------------------------------------------------ 8. grafo aciclico: distanza con lunghezze di segno qualsiasi
  GEN.push({
    id: "no-g-dag", livello: "facile", capitolo: "shortest-paths",
    link: link("trees-and-paths/shortest-paths/shortest-paths-in-acyclic-graphs/", "alberi-e-cammini/shortest-paths/cammini-minimi-nei-grafi-aciclici/", "box-20-sp-th-dag"),
    genera: function (rng, l) {
      return riprova(function () {
        var n = 6, arcs = digrafo(rng, n, ri(rng, 9, 10), { dag: true });
        var A = arcs.map(function (a) { return [a[0], a[1], ri(rng, -4, 9)]; });
        if (!A.some(function (a) { return a[2] < 0; })) return null;
        var d = range(1, n).map(function () { return INF; }), D = d.slice(); d[0] = 0; D[0] = -INF;
        var lng = range(1, n).map(function () { return -INF; }); lng[0] = 0;
        for (var i = 1; i <= n; i++) A.forEach(function (a) {
          if (a[0] !== i) return;
          if (d[i - 1] + a[2] < d[a[1] - 1]) d[a[1] - 1] = d[i - 1] + a[2];
          if (lng[i - 1] + a[2] > lng[a[1] - 1]) lng[a[1] - 1] = lng[i - 1] + a[2];
        });
        if (d[n - 1] === INF) return null;
        var dj = dijkstra(n, A, 1, "giusto").d[n - 1];
        var gr = 0, v = 1, guard = 0; // goloso: dall'arco uscente più corto
        while (v !== n && guard++ < 10) {
          var out = A.filter(function (a) { return a[0] === v; }).sort(function (a, b) { return a[2] - b[2] || a[1] - b[1]; });
          if (!out.length) { gr = null; break; } gr += out[0][2]; v = out[0][1];
        }
        var hop = minArchi(n, A, 1)[n - 1];
        var sc = scegli(rng, d[n - 1], [dj, gr, lng[n - 1], hop]);
        if (!sc) return null;
        return pacchetto(sc, function (x) { return M(x); },
          T(l, "Il grafo orientato aciclico con nodi $1,\\dots,6$ (ordine topologico $1,2,\\dots,6$) ha gli archi con lunghezze ", "The acyclic directed graph with nodes $1,\\dots,6$ (topological order $1,2,\\dots,6$) has the arcs with lengths ") +
          testoArchiPesati(A, "d") + T(l, ". Quanto vale la distanza $\\tilde{d}(6)$, cioè la lunghezza minima di un cammino orientato da $s=1$ a $6$?", ". What is the distance $\\tilde{d}(6)$, that is, the minimum length of a directed path from $s=1$ to $6$?"),
          T(l, "Nei grafi aciclici si esaminano i nodi in ordine topologico e ogni etichetta è definitiva quando il nodo viene elaborato, con lunghezze di segno qualsiasi: $\\tilde{d}=" + vec(d) + "$. Dijkstra può sbagliare con archi negativi; il massimo dà il cammino più lungo.",
            "In acyclic graphs the nodes are scanned in topological order and each label is final when its node is processed, with lengths of any sign: $\\tilde{d}=" + vec(d) + "$. Dijkstra can fail with negative arcs; the maximum gives the longest path."),
          { n: n, A: A });
      });
    }
  });

  // ------------------------------------------------------------------ 9. rimozione dei limiti inferiori
  GEN.push({
    id: "no-g-lower-bounds", livello: "facile", capitolo: "network-flow-models",
    link: link("flows/network-flow-models/removing-the-lower-bounds/", "flussi/network-flow-models/rimozione-dei-limiti-inferiori/", "box-11-nf-def-subst"),
    genera: function (rng, l) {
      return riprova(function () {
        var n = 5, arcs = digrafo(rng, n, 7, { noOpposti: true });
        var b = [ri(rng, 2, 6), ri(rng, 0, 4), 0, 0, 0];
        b[2] = -ri(rng, 0, 3); b[3] = -ri(rng, 1, 4); b[4] = -(b[0] + b[1] + b[2] + b[3]);
        if (b[4] >= 0) return null;
        var lb = shuffle(rng, range(0, arcs.length - 1)).slice(0, 2).map(function (k) { return [arcs[k][0], arcs[k][1], ri(rng, 1, 3)]; });
        var giusto = b.slice(), inv = b.slice(), code = b.slice(), teste = b.slice();
        lb.forEach(function (a) {
          giusto[a[0] - 1] -= a[2]; giusto[a[1] - 1] += a[2];
          inv[a[0] - 1] += a[2]; inv[a[1] - 1] -= a[2];
          code[a[0] - 1] -= a[2]; teste[a[1] - 1] += a[2];
        });
        var sc = scegli(rng, giusto, [inv, code, teste]);
        if (!sc) return null;
        return pacchetto(sc, function (v) { return M(vec(v)); },
          T(l, "Una rete con nodi $1,\\dots,5$ ha gli archi ", "A network with nodes $1,\\dots,5$ has the arcs ") + arcs.map(function (a) { return M(arc(a)); }).join(", ") +
          T(l, ", bilanci $\\vet{b}=" + vec(b) + "$ e i limiti inferiori ", ", balances $\\vet{b}=" + vec(b) + "$ and the lower bounds ") +
          lb.map(function (a) { return M("l_{" + a[0] + a[1] + "}=" + a[2]); }).join(T(l, " e ", " and ")) +
          T(l, " (gli altri sono nulli). Con la sostituzione $\\vet{x}=\\vet{l}+\\vet{x}'$, quali sono i bilanci $\\vet{b}'=\\vet{b}-\\mat{B}\\vet{l}$ ($\\mat{B}$: matrice di incidenza, $+1$ nella coda e $-1$ nella testa)?",
            " (the others are zero). With the substitution $\\vet{x}=\\vet{l}+\\vet{x}'$, what are the balances $\\vet{b}'=\\vet{b}-\\mat{B}\\vet{l}$ ($\\mat{B}$: incidence matrix, $+1$ in the tail and $-1$ in the head)?"),
          T(l, "La coda di $(i,j)$ perde $l_{ij}$ unità di bilancio e la testa le guadagna: $\\vet{b}'=" + vec(giusto) + "$.",
            "The tail of $(i,j)$ loses $l_{ij}$ units of balance and the head gains them: $\\vet{b}'=" + vec(giusto) + "$."),
          { n: n, arcs: arcs, b: b, lb: lb });
      });
    }
  });

  // ------------------------------------------------------------------ 10. costi ridotti
  GEN.push({
    id: "no-g-reduced-costs", livello: "facile", capitolo: "network-flow-models",
    link: link("flows/network-flow-models/the-dual-model-and-the-reduced-costs/", "flussi/network-flow-models/il-modello-duale-e-i-costi-ridotti/", "box-24-nf-def-reduced"),
    genera: function (rng, l) {
      return riprova(function () {
        var pi = [ri(rng, 3, 15), ri(rng, 2, 12), ri(rng, 1, 10), 0];
        var arcs = shuffle(rng, [[1, 2], [1, 3], [2, 3], [2, 4], [3, 4], [3, 2], [1, 4]]).slice(0, 3);
        var A = arcs.map(function (a) { return [a[0], a[1], ri(rng, 1, 12)]; });
        function f(g) { return A.map(function (a) { return g(a[2], pi[a[0] - 1], pi[a[1] - 1]); }); }
        var giusto = f(function (c, p, q) { return c - p + q; });
        var sc = scegli(rng, giusto, [f(function (c, p, q) { return c + p - q; }), f(function (c, p, q) { return c - p - q; }), f(function (c, p, q) { return p - q - c; })]);
        if (!sc) return null;
        return pacchetto(sc, function (v) { return M(vec(v)); },
          T(l, "I potenziali sono $\\vet{\\pi}=" + vec(pi) + "$ e gli archi ", "The potentials are $\\vet{\\pi}=" + vec(pi) + "$ and the arcs ") +
          A.map(function (a) { return M(arc(a)); }).join(", ") + T(l, " hanno costi ", " have costs ") + testoArchiPesati(A, "c") +
          T(l, ". Quali sono i loro costi ridotti $\\bar{c}_{ij}=c_{ij}-\\pi_i+\\pi_j$ (convenzione del corso), nello stesso ordine?", ". What are their reduced costs $\\bar{c}_{ij}=c_{ij}-\\pi_i+\\pi_j$ (convention of the course), in the same order?"),
          T(l, "$\\bar{c}_{ij}=c_{ij}-\\pi_i+\\pi_j$: $-\\pi$ della coda e $+\\pi$ della testa. Risultato " + M(vec(giusto)) + ".",
            "$\\bar{c}_{ij}=c_{ij}-\\pi_i+\\pi_j$: $-\\pi$ of the tail and $+\\pi$ of the head. Result " + M(vec(giusto)) + "."),
          { pi: pi, A: A });
      });
    }
  });

  // ------------------------------------------------------------------ 11. scarti complementari: quale arco viola le condizioni
  GEN.push({
    id: "no-g-mcf-optimality", livello: "media", capitolo: "min-cost-flow",
    link: link("flows/min-cost-flow/optimality-conditions-with-potentials/", "flussi/min-cost-flow/condizioni-di-ottimalita-con-i-potenziali/", "box-13-mc-cor-cs"),
    genera: function (rng, l) {
      return riprova(function () {
        var pi = [ri(rng, 6, 14), ri(rng, 3, 10), ri(rng, 2, 8), 0];
        var arcs = shuffle(rng, [[1, 2], [1, 3], [2, 3], [2, 4], [3, 4], [3, 2], [1, 4]]).slice(0, 5);
        var A = [], viola = ri(rng, 0, 4);
        for (var k = 0; k < 5; k++) {
          var a = arcs[k], u = ri(rng, 2, 8), cb, x;
          var tipo = k === viola ? (rng() < 0.5 ? "pos" : "neg") : ["pos", "neg", "zero"][ri(rng, 0, 2)];
          if (tipo === "pos") { cb = ri(rng, 1, 4); x = k === viola ? ri(rng, 1, u) : 0; }
          else if (tipo === "neg") { cb = -ri(rng, 1, 4); x = k === viola ? ri(rng, 0, u - 1) : u; }
          else { cb = 0; x = ri(rng, 0, u); }
          var c = cb + pi[a[0] - 1] - pi[a[1] - 1];
          if (c < 1 || c > 15) return null;
          A.push([a[0], a[1], c, u, x]);
        }
        var altri = shuffle(rng, range(0, 4).filter(function (k) { return k !== viola; })).slice(0, 3);
        var sc = scegli(rng, [A[viola][0], A[viola][1]], altri.map(function (k) { return [A[k][0], A[k][1]]; }));
        if (!sc) return null;
        var tab = A.map(function (a) { return M(arc(a) + ":\\ c=" + a[2] + ",\\ u=" + a[3] + ",\\ x=" + a[4]); }).join("; ");
        return pacchetto(sc, function (v) { return M(arc(v)); },
          T(l, "Un flusso $\\vet{x}$ (limiti inferiori nulli) e i potenziali $\\vet{\\pi}=" + vec(pi) + "$ sono dati sugli archi ", "A flow $\\vet{x}$ (zero lower bounds) and the potentials $\\vet{\\pi}=" + vec(pi) + "$ are given on the arcs ") +
          tab + T(l, ". Con i costi ridotti $\\bar{c}_{ij}=c_{ij}-\\pi_i+\\pi_j$, quale arco viola le condizioni degli scarti complementari ($\\bar{c}_{ij}>0 \\Rightarrow x_{ij}=0$, $\\bar{c}_{ij}<0 \\Rightarrow x_{ij}=u_{ij}$)?",
            ". With the reduced costs $\\bar{c}_{ij}=c_{ij}-\\pi_i+\\pi_j$, which arc violates the complementary slackness conditions ($\\bar{c}_{ij}>0 \\Rightarrow x_{ij}=0$, $\\bar{c}_{ij}<0 \\Rightarrow x_{ij}=u_{ij}$)?"),
          T(l, "Costi ridotti $\\bar{c}_{ij}=c_{ij}-\\pi_i+\\pi_j$: ", "Reduced costs $\\bar{c}_{ij}=c_{ij}-\\pi_i+\\pi_j$: ") +
          A.map(function (a) { return M("\\bar{c}_{" + a[0] + a[1] + "}=" + (a[2] - pi[a[0] - 1] + pi[a[1] - 1])); }).join(", ") +
          T(l, ". Solo " + M(arc(A[viola])) + " ha un costo ridotto non nullo senza stare al limite giusto.", ". Only " + M(arc(A[viola])) + " has a nonzero reduced cost without sitting at the right bound."),
          { pi: pi, A: A });
      });
    }
  });

  // reti con capacità (senza archi opposti), s = 1, t = n
  function rete(rng, n, m, umax) {
    var arcs = digrafo(rng, n, m, { noOpposti: true });
    // ogni nodo deve raggiungere t: aggiunge archi verso t se serve
    return arcs.map(function (a) { return [a[0], a[1], ri(rng, 1, umax)]; });
  }
  function residui(A, x) { // archi residui [i,j,r,indice,verso]
    var R = [];
    A.forEach(function (a, k) {
      if (x[k] < a[2]) R.push([a[0], a[1], a[2] - x[k], k, 1]);
      if (x[k] > 0) R.push([a[1], a[0], x[k], k, -1]);
    });
    return R;
  }
  function cercaCammino(n, R, s, t, modo) { // visita generica sulla rete residua, teste per indice crescente
    var L = {}; for (var i = 1; i <= n; i++) L[i] = [];
    R.forEach(function (r) { L[r[0]].push(r); });
    for (i = 1; i <= n; i++) L[i].sort(function (a, b) { return modo.slice(-1) === "R" ? b[1] - a[1] : a[1] - b[1]; });
    var lab = {}, pred = {}, list = [s]; lab[s] = 1;
    while (list.length && !lab[t]) {
      var idx = modo.slice(0, 3) === "dfs" ? list.length - 1 : 0, v = list[idx], r = null;
      for (var k = 0; k < L[v].length; k++) if (!lab[L[v][k][1]]) { r = L[v][k]; break; }
      if (r) { lab[r[1]] = 1; pred[r[1]] = r; list.push(r[1]); } else list.splice(idx, 1);
    }
    if (!lab[t]) return { cammino: null, lab: lab };
    var P = [], w = t; while (w !== s) { P.unshift(pred[w]); w = pred[w][0]; }
    return { cammino: P, lab: lab };
  }
  function fordFulkerson(n, A, modo, soloAvanti) {
    var x = A.map(function () { return 0; }), deltas = [], guard = 0;
    while (guard++ < 200) {
      var R = residui(A, x);
      if (soloAvanti) R = R.filter(function (r) { return r[4] === 1; });
      var c = cercaCammino(n, R, 1, n, modo);
      if (!c.cammino) return { x: x, deltas: deltas, S: c.lab };
      var dl = Math.min.apply(null, c.cammino.map(function (r) { return r[2]; }));
      c.cammino.forEach(function (r) { x[r[3]] += r[4] * dl; });
      deltas.push(dl);
    }
    return null;
  }
  function testoCapacita(A) { return A.map(function (a) { return M("u_{" + a[0] + a[1] + "}=" + a[2]); }).join(", "); }
  function somma(a) { return a.reduce(function (s, v) { return s + v; }, 0); }

  // ------------------------------------------------------------------ 12. capacità di un taglio
  GEN.push({
    id: "no-g-cut-capacity", livello: "facile", capitolo: "maximum-flow",
    link: link("flows/maximum-flow/cuts/", "flussi/maximum-flow/tagli/", "box-3-mf-def-cut"),
    genera: function (rng, l) {
      return riprova(function () {
        var n = 6, A = rete(rng, n, ri(rng, 9, 10), 9);
        var S = [1].concat(shuffle(rng, range(2, n - 1)).slice(0, ri(rng, 1, 3))).sort();
        var inS = {}; S.forEach(function (v) { inS[v] = 1; });
        var av = A.filter(function (a) { return inS[a[0]] && !inS[a[1]]; }), ind = A.filter(function (a) { return !inS[a[0]] && inS[a[1]]; });
        if (!av.length || !ind.length) return null;
        var fw = somma(av.map(function (a) { return a[2]; })), bw = somma(ind.map(function (a) { return a[2]; }));
        var uscS = somma(A.filter(function (a) { return inS[a[0]]; }).map(function (a) { return a[2]; }));
        var sc = scegli(rng, fw, [fw + bw, uscS, fw - bw > 0 ? fw - bw : null]);
        if (!sc) return null;
        return pacchetto(sc, function (v) { return M(v); },
          T(l, "La rete con nodi $1,\\dots,6$, $s=1$ e $t=6$, ha gli archi con capacità ", "The network with nodes $1,\\dots,6$, $s=1$ and $t=6$, has the arcs with capacities ") +
          testoCapacita(A) + T(l, ". Quanto vale la capacità $u(S,N \\setminus S)$ del taglio con $S=\\{" + S.join(",") + "\\}$?", ". What is the capacity $u(S,N \\setminus S)$ of the cut with $S=\\{" + S.join(",") + "\\}$?"),
          T(l, "Si sommano solo gli archi in avanti, da $S$ a $N \\setminus S$: " + av.map(function (a) { return M(arc(a)); }).join(", ") + ", per un totale di $" + fw + "$. Gli archi all'indietro (" + ind.map(function (a) { return M(arc(a)); }).join(", ") + ") non contano.",
            "Only the forward arcs, from $S$ to $N \\setminus S$, are added: " + av.map(function (a) { return M(arc(a)); }).join(", ") + ", for a total of $" + fw + "$. The backward arcs (" + ind.map(function (a) { return M(arc(a)); }).join(", ") + ") do not count."),
          { n: n, A: A, S: S });
      });
    }
  });

  // ------------------------------------------------------------------ 13. rete residua: collo di bottiglia di un cammino aumentante
  GEN.push({
    id: "no-g-residual", livello: "facile", capitolo: "maximum-flow",
    link: link("flows/maximum-flow/the-residual-network/", "flussi/maximum-flow/la-rete-residua/", "box-8-mf-def-augmenting"),
    genera: function (rng, l) {
      return riprova(function () {
        var n = 5, A = rete(rng, n, ri(rng, 7, 8), 9);
        // flusso ammissibile: due cammini da 1 a 5 nel grafo
        var x = A.map(function () { return 0; });
        for (var p = 0; p < 2; p++) {
          var R0 = residui(A, x).filter(function (r) { return r[4] === 1; });
          var c0 = cercaCammino(n, shuffle(rng, R0), 1, n, rng() < 0.5 ? "dfs" : "bfs");
          if (!c0.cammino) break;
          var dl0 = ri(rng, 1, Math.min.apply(null, c0.cammino.map(function (r) { return r[2]; })));
          c0.cammino.forEach(function (r) { x[r[3]] += dl0; });
        }
        // cammini semplici da 1 a 5 nella rete residua con almeno un arco all'indietro
        var R = residui(A, x), cammini = [];
        (function dfs(v, vis, P) {
          if (v === n) { if (P.some(function (r) { return r[4] === -1; })) cammini.push(P.slice()); return; }
          R.forEach(function (r) { if (r[0] === v && !vis[r[1]]) { vis[r[1]] = 1; P.push(r); dfs(r[1], vis, P); P.pop(); vis[r[1]] = 0; } });
        })(1, { 1: 1 }, []);
        if (!cammini.length) return null;
        var P = cammini[ri(rng, 0, cammini.length - 1)];
        var dl = Math.min.apply(null, P.map(function (r) { return r[2]; }));
        var soloU = Math.min.apply(null, P.map(function (r) { return A[r[3]][2]; }));
        var indU = Math.min.apply(null, P.map(function (r) { return r[4] === 1 ? r[2] : A[r[3]][2] - x[r[3]]; }));
        var fw = P.filter(function (r) { return r[4] === 1; });
        var soloAv = fw.length ? Math.min.apply(null, fw.map(function (r) { return r[2]; })) : null;
        if (indU <= 0) indU = null;
        var sc = scegli(rng, dl, [indU, soloU, soloAv]);
        if (!sc) return null;
        var nodiP = [1].concat(P.map(function (r) { return r[1]; }));
        return pacchetto(sc, function (v) { return M(v); },
          T(l, "Nella rete con nodi $1,\\dots,5$ ($s=1$, $t=5$) gli archi hanno capacità e flusso ", "In the network with nodes $1,\\dots,5$ ($s=1$, $t=5$) the arcs have capacity and flow ") +
          A.map(function (a, k) { return M(arc(a) + ":\\ u=" + a[2] + ",\\ x=" + x[k]); }).join("; ") +
          T(l, ". Quanto vale il collo di bottiglia $\\delta$ (minima capacità residua degli archi) del cammino aumentante " + M(seq(nodiP)) + " della rete residua $G(\\vet{x})$?",
            ". What is the bottleneck $\\delta$ (minimum residual capacity of its arcs) of the augmenting path " + M(seq(nodiP)) + " of the residual network $G(\\vet{x})$?"),
          T(l, "Capacità residue lungo il cammino: ", "Residual capacities along the path: ") +
          P.map(function (r) { return M("r_{" + r[0] + r[1] + "}=" + r[2]) + (r[4] === -1 ? T(l, " (all'indietro, $=x_{" + r[1] + r[0] + "}$)", " (backward, $=x_{" + r[1] + r[0] + "}$)") : ""); }).join(", ") +
          T(l, "; il minimo è $\\delta=" + dl + "$. Un arco all'indietro ha $r_{ji}=x_{ij}$, non $u_{ij}$.", "; the minimum is $\\delta=" + dl + "$. A backward arc has $r_{ji}=x_{ij}$, not $u_{ij}$."),
          { n: n, A: A, x: x, P: nodiP });
      });
    }
  });

  // ------------------------------------------------------------------ 14. valore del flusso massimo
  GEN.push({
    id: "no-g-max-flow", livello: "media", capitolo: "maximum-flow",
    link: link("flows/maximum-flow/the-max-flow-min-cut-theorem/", "flussi/maximum-flow/il-teorema-flusso-massimo-taglio-minimo/", "box-12-mf-th-mfmc"),
    genera: function (rng, l) {
      return riprova(function () {
        var n = 6, A = rete(rng, n, ri(rng, 9, 10), 9);
        var ek = fordFulkerson(n, A, "bfs");
        var v = somma(ek.deltas);
        if (v === 0) return null;
        var us = somma(A.filter(function (a) { return a[0] === 1; }).map(function (a) { return a[2]; }));
        var ut = somma(A.filter(function (a) { return a[1] === n; }).map(function (a) { return a[2]; }));
        var sat = somma(A.filter(function (a, k) { return ek.x[k] === a[2]; }).map(function (a) { return a[2]; }));
        var sc = scegli(rng, v, [us, ut, sat]);
        if (!sc) return null;
        var S = range(1, n).filter(function (i) { return ek.S[i]; });
        return pacchetto(sc, function (z) { return M(z); },
          T(l, "La rete con nodi $1,\\dots,6$, $s=1$ e $t=6$, ha gli archi con capacità ", "The network with nodes $1,\\dots,6$, $s=1$ and $t=6$, has the arcs with capacities ") +
          testoCapacita(A) + T(l, ". Quanto vale il flusso massimo $\\tilde{v}$, cioè il massimo flusso netto uscente da $s$ fra i flussi ammissibili?", ". What is the maximum flow value $\\tilde{v}$, that is, the largest net outflow of $s$ over the feasible flows?"),
          T(l, "Un flusso massimo vale $\\tilde{v}=" + v + "$; il taglio minimo $S=\\{" + S.join(",") + "\\}$ (nodi raggiungibili da $s$ nella rete residua finale) ha la stessa capacità. I tagli $\\{s\\}$ e $N \\setminus \\{t\\}$ danno solo limiti superiori, e gli archi saturi non formano in generale un taglio.",
            "A maximum flow has value $\\tilde{v}=" + v + "$; the minimum cut $S=\\{" + S.join(",") + "\\}$ (nodes reachable from $s$ in the final residual network) has the same capacity. The cuts $\\{s\\}$ and $N \\setminus \\{t\\}$ give only upper bounds, and the saturated arcs do not form a cut in general."),
          { n: n, A: A });
      });
    }
  });

  // ------------------------------------------------------------------ 15. Edmonds–Karp: colli di bottiglia
  GEN.push({
    id: "no-g-edmonds-karp", livello: "complessa", capitolo: "maximum-flow",
    link: link("flows/maximum-flow/the-edmonds-karp-algorithm/", "flussi/maximum-flow/l-algoritmo-di-edmondskarp/", "box-19-mf-def-ek"),
    genera: function (rng, l) {
      return riprova(function () {
        var n = 6, A = rete(rng, n, ri(rng, 9, 10), 8);
        var ek = fordFulkerson(n, A, "bfs");
        if (ek.deltas.length < 2 || ek.deltas.length > 4) return null;
        var ff = fordFulkerson(n, A, "dfs"), av = fordFulkerson(n, A, "bfs", true), rev = fordFulkerson(n, A, "bfsR"), ffR = fordFulkerson(n, A, "dfsR");
        if (!ff || ff.deltas.length > 6 || ffR.deltas.length > 6) return null;
        var giu = ek.deltas.slice().sort(function (a, b) { return b - a; });
        var sc = scegli(rng, ek.deltas, [ff.deltas, av.deltas, rev.deltas, ffR.deltas, giu]);
        if (!sc) return null;
        return pacchetto(sc, function (v) { return M("\\delta=" + seq(v)); },
          T(l, "La rete con nodi $1,\\dots,6$, $s=1$ e $t=6$, ha gli archi con capacità ", "The network with nodes $1,\\dots,6$, $s=1$ and $t=6$, has the arcs with capacities ") +
          testoCapacita(A) + T(l, ". Si esegue l'algoritmo di Edmonds–Karp dal flusso nullo (visita in ampiezza della rete residua, archi residui uscenti esaminati per indice crescente della testa, arresto appena $t$ è etichettato). Quali sono, in ordine, i colli di bottiglia $\\delta$ degli aumenti?",
            ". The Edmonds–Karp algorithm is run from the zero flow (breadth-first search of the residual network, residual arcs leaving each node scanned by increasing index of the head, stop as soon as $t$ is labelled). What are, in order, the bottlenecks $\\delta$ of the augmentations?"),
          T(l, "Edmonds–Karp aumenta lungo cammini con il minimo numero di archi, trovati con la visita in ampiezza: $\\delta=" + seq(ek.deltas) + "$, valore $\\tilde{v}=" + somma(ek.deltas) + "$." +
              (key(ff.deltas) !== key(ek.deltas) ? " La sequenza " + M(seq(ff.deltas)) + " è quella di Ford–Fulkerson con la visita in profondità." : "") +
              (somma(av.deltas) < somma(ek.deltas) ? " Senza archi all'indietro ci si fermerebbe a " + M(seq(av.deltas)) + ", con un flusso non massimo." : ""),
            "Edmonds–Karp augments along paths with the fewest arcs, found by the breadth-first search: $\\delta=" + seq(ek.deltas) + "$, value $\\tilde{v}=" + somma(ek.deltas) + "$." +
              (key(ff.deltas) !== key(ek.deltas) ? " The sequence " + M(seq(ff.deltas)) + " is that of Ford–Fulkerson with the depth-first search." : "") +
              (somma(av.deltas) < somma(ek.deltas) ? " Without backward arcs one would stop at " + M(seq(av.deltas)) + ", with a flow that is not maximum." : "")),
          { n: n, A: A });
      });
    }
  });

  // ------------------------------------------------------------------ 16. aumento lungo un ciclo della rete residua
  GEN.push({
    id: "no-g-residual-cycle", livello: "facile", capitolo: "min-cost-flow",
    link: link("flows/min-cost-flow/the-residual-network-with-costs/", "flussi/min-cost-flow/la-rete-residua-con-i-costi/", "box-3-mc-prop-augment"),
    genera: function (rng, l) {
      return riprova(function () {
        var k = ri(rng, 3, 4), nodi = shuffle(rng, range(1, 5)).slice(0, k), W = [], arcsA = [];
        for (var t = 0; t < k; t++) {
          var a = nodi[t], b = nodi[(t + 1) % k], u = ri(rng, 3, 9), c = ri(rng, 1, 9);
          if (rng() < 0.5) { var x = ri(rng, 0, u - 1); arcsA.push([a, b, c, u, x]); W.push({ av: true, r: u - x, c: c, u: u }); }
          else { x = ri(rng, 1, u); arcsA.push([b, a, c, u, x]); W.push({ av: false, r: x, c: -c, u: u, x: x }); }
        }
        if (W.every(function (w) { return w.av; }) || W.every(function (w) { return !w.av; })) return null;
        var cW = somma(W.map(function (w) { return w.c; })), rW = Math.min.apply(null, W.map(function (w) { return w.r; }));
        if (cW >= 0) return null;
        var C0 = ri(rng, 50, 120), corr = C0 + rW * cW;
        var cPiu = somma(W.map(function (w) { return Math.abs(w.c); }));
        var rU = Math.min.apply(null, W.map(function (w) { return w.av ? w.r : w.u; }));
        var sc = scegli(rng, corr, [C0 + cW, C0 + rW * cPiu, C0 + rU * cW, C0 - rW * cW]);
        if (!sc) return null;
        var ciclo = nodi.concat([nodi[0]]);
        return pacchetto(sc, function (v) { return M(v); },
          T(l, "Un flusso ammissibile $\\vet{x}$ costa $" + C0 + "$. Sugli archi ", "A feasible flow $\\vet{x}$ costs $" + C0 + "$. On the arcs ") +
          arcsA.map(function (a) { return M(arc(a) + ":\\ c=" + a[2] + ",\\ u=" + a[3] + ",\\ x=" + a[4]); }).join("; ") +
          T(l, " (limiti inferiori nulli), la rete residua $G(\\vet{x})$ contiene il ciclo $W=" + seq(ciclo) + "$. Quanto costa il flusso aumentato lungo $W$ di $\\theta=r(W)$, la minima capacità residua degli archi di $W$?",
            " (zero lower bounds), the residual network $G(\\vet{x})$ contains the cycle $W=" + seq(ciclo) + "$. What does the flow augmented along $W$ by $\\theta=r(W)$, the minimum residual capacity of the arcs of $W$, cost?"),
          T(l, "Gli archi in avanti hanno costo $c_{ij}$ e capacità residua $u_{ij}-x_{ij}$, quelli all'indietro costo $-c_{ij}$ e capacità residua $x_{ij}$: $c(W)=" + cW + "$, $r(W)=" + rW + "$, nuovo costo $" + C0 + "+" + rW + "\\cdot(" + cW + ")=" + corr + "$.",
            "Forward arcs have cost $c_{ij}$ and residual capacity $u_{ij}-x_{ij}$, backward arcs cost $-c_{ij}$ and residual capacity $x_{ij}$: $c(W)=" + cW + "$, $r(W)=" + rW + "$, new cost $" + C0 + "+" + rW + "\\cdot(" + cW + ")=" + corr + "$."),
          { arcs: arcsA, W: ciclo, C0: C0 });
      });
    }
  });

  // trasporto: origini 1..m, destinazioni m+1..m+n
  function istanzaTrasporto(rng, m, n) {
    var a = range(1, m).map(function () { return 5 * ri(rng, 2, 8); });
    var tot = somma(a), d = [];
    for (var j = 0; j < n - 1; j++) d.push(5 * ri(rng, 1, 6));
    d.push(tot - somma(d));
    if (d[n - 1] <= 0) return null;
    var c = range(1, m).map(function () { return range(1, n).map(function () { return ri(rng, 1, 9); }); });
    return { a: a, d: d, c: c, m: m, n: n };
  }
  function iniziale(I, regola) { // regole: no (nord-ovest), ne (nord-est), rm (minimo della prima riga attiva), cm (costo minimo); restituisce celle [i,j,x] (0-based)
    var m = I.m, n = I.n, ar = I.a.slice(), dr = I.d.slice(), rA = range(0, m - 1), cA = range(0, n - 1), T = [];
    while (cA.length) {
      var i, j;
      if (regola === "no") { i = rA[0]; j = cA[0]; }
      else if (regola === "ne") { i = rA[0]; j = cA[cA.length - 1]; }
      else if (regola === "rm") { i = rA[0]; j = cA.slice().sort(function (p, q) { return I.c[i][p] - I.c[i][q] || p - q; })[0]; }
      else {
        var best = null;
        rA.forEach(function (ii) { cA.forEach(function (jj) { if (best === null || I.c[ii][jj] < I.c[best[0]][best[1]]) best = [ii, jj]; }); });
        i = best[0]; j = best[1];
      }
      var x = Math.min(ar[i], dr[j]); T.push([i, j, x]); ar[i] -= x; dr[j] -= x;
      if (ar[i] === 0 && rA.length > 1) rA.splice(rA.indexOf(i), 1); else cA.splice(cA.indexOf(j), 1);
    }
    return T;
  }
  function costo(I, T) { return somma(T.map(function (t) { return I.c[t[0]][t[1]] * t[2]; })); }
  function testoTrasporto(l, I) {
    var r = [];
    for (var i = 0; i < I.m; i++) r.push(T(l, "riga ", "row ") + (i + 1) + ": " + M(vec(I.c[i])));
    return T(l, "Un'istanza di trasporto ha origini $1,\\dots," + I.m + "$ con offerte $a=" + vec(I.a) + "$, destinazioni $" + (I.m + 1) + ",\\dots," + (I.m + I.n) + "$ con domande $d=" + vec(I.d) + "$, e costi $c_{ij}$ (righe = origini, colonne = destinazioni) ",
      "A transportation instance has origins $1,\\dots," + I.m + "$ with supplies $a=" + vec(I.a) + "$, destinations $" + (I.m + 1) + ",\\dots," + (I.m + I.n) + "$ with demands $d=" + vec(I.d) + "$, and costs $c_{ij}$ (rows = origins, columns = destinations) ") + r.join("; ") + ". ";
  }
  // potenziali di una base (pi_{m+n}=0): indici 0..m-1 origini, m..m+n-1 destinazioni
  function potenzialiTP(I, T) {
    var N = I.m + I.n, pi = range(1, N).map(function () { return null; }); pi[N - 1] = 0;
    for (var it = 0; it < N; it++) T.forEach(function (t) {
      var r = t[0], s = I.m + t[1], c = I.c[t[0]][t[1]];
      if (pi[r] !== null && pi[s] === null) pi[s] = pi[r] - c;
      else if (pi[s] !== null && pi[r] === null) pi[r] = pi[s] + c;
    });
    return pi;
  }

  // ------------------------------------------------------------------ 17. angolo nord-ovest
  GEN.push({
    id: "no-g-northwest", livello: "facile", capitolo: "transportation-and-assignment",
    link: link("flows/transportation-and-assignment/initial-basic-feasible-solutions/", "flussi/transportation-and-assignment/soluzioni-ammissibili-di-base-iniziali/", "sez-ta-sec-initial"),
    genera: function (rng, l) {
      return riprova(function () {
        var I = istanzaTrasporto(rng, 3, 4); if (!I) return null;
        var no = iniziale(I, "no"), v = costo(I, no);
        var sc = scegli(rng, v, [costo(I, iniziale(I, "cm")), costo(I, iniziale(I, "ne")), costo(I, iniziale(I, "rm"))]);
        if (!sc) return null;
        return pacchetto(sc, function (z) { return M(z); },
          testoTrasporto(l, I) + T(l, "Quanto costa la soluzione ammissibile di base iniziale costruita con la regola dell'angolo nord-ovest?", "What does the initial basic feasible solution built with the north-west corner rule cost?"),
          T(l, "L'angolo nord-ovest riempie a ogni passo la cella attiva con $i$ e $j$ minimi, con $\\min\\{\\bar{a}_i,\\bar{d}_j\\}$, senza guardare i costi: ", "The north-west corner fills at every step the active cell with the smallest $i$ and $j$, with $\\min\\{\\bar{a}_i,\\bar{d}_j\\}$, without looking at the costs: ") +
          no.map(function (t) { return M("x_{" + (t[0] + 1) + "," + (I.m + t[1] + 1) + "}=" + t[2]); }).join(", ") + T(l, ", costo $" + v + "$.", ", cost $" + v + "$."),
          I);
      });
    }
  });

  // ------------------------------------------------------------------ 18. potenziali di una base di trasporto
  GEN.push({
    id: "no-g-transport-potentials", livello: "media", capitolo: "transportation-and-assignment",
    link: link("flows/transportation-and-assignment/the-potential-method/", "flussi/transportation-and-assignment/il-metodo-dei-potenziali/", "box-15-ta-def-potentials"),
    genera: function (rng, l) {
      return riprova(function () {
        var I = istanzaTrasporto(rng, 2, 3); if (!I) return null;
        var B = iniziale(I, "no");
        if (B.some(function (t) { return t[2] === 0; })) return null;
        var pi = potenzialiTP(I, B), m = I.m;
        var uv = pi.map(function (p, k) { return k < m ? p : -p; });
        var p1 = pi.map(function (p) { return p - pi[0]; });
        var neg = pi.map(function (p) { return -p; });
        var sc = scegli(rng, pi, [uv, p1, neg]);
        if (!sc) return null;
        return pacchetto(sc, function (v) { return M(vec(v)); },
          testoTrasporto(l, I) + T(l, "La base è quella dell'angolo nord-ovest, con le celle ", "The basis is that of the north-west corner, with the cells ") +
          B.map(function (t) { return M("(" + (t[0] + 1) + "," + (m + t[1] + 1) + ")"); }).join(", ") +
          T(l, ". Quali sono i potenziali $(\\pi_1,\\dots,\\pi_5)$ della base, con $\\bar{c}_{ij}=c_{ij}-\\pi_i+\\pi_j=0$ sulle celle di base e $\\pi_5=0$?",
            ". What are the potentials $(\\pi_1,\\dots,\\pi_5)$ of the basis, with $\\bar{c}_{ij}=c_{ij}-\\pi_i+\\pi_j=0$ on the basic cells and $\\pi_5=0$?"),
          T(l, "Si parte da $\\pi_5=0$ e si usa $\\pi_i-\\pi_j=c_{ij}$ lungo l'albero delle celle di base: $\\vet{\\pi}=" + vec(pi) + "$. Con la convenzione u-v ($u_i+v_j=c_{ij}$) i potenziali delle destinazioni cambiano segno.",
            "Start from $\\pi_5=0$ and use $\\pi_i-\\pi_j=c_{ij}$ along the tree of the basic cells: $\\vet{\\pi}=" + vec(pi) + "$. With the u-v convention ($u_i+v_j=c_{ij}$) the potentials of the destinations change sign."),
          I);
      });
    }
  });

  // ciclo di una cella non di base nell'albero delle celle di base: [[i,j,segno],...] dalla cella entrante
  function cicloCella(I, B, e) {
    var m = I.m, N = I.m + I.n, adj = {};
    for (var v = 0; v < N; v++) adj[v] = [];
    B.forEach(function (t) { adj[t[0]].push(m + t[1]); adj[m + t[1]].push(t[0]); });
    var src = e[0], dst = m + e[1], prev = {}; prev[src] = -1; var coda = [src];
    while (coda.length) { var u = coda.shift(); adj[u].forEach(function (w) { if (prev[w] === undefined) { prev[w] = u; coda.push(w); } }); }
    var path = [], w = dst; while (w !== -1) { path.unshift(w); w = prev[w]; }
    var C = [[e[0], e[1], 1]];
    for (var t = 0; t + 1 < path.length; t++) {
      var a = path[t], b = path[t + 1], i = a < m ? a : b, j = (a < m ? b : a) - m;
      C.push([i, j, t % 2 === 0 ? -1 : 1]);
    }
    return C;
  }
  function pivotTP(I, B, e) {
    var C = cicloCella(I, B, e), val = {};
    B.forEach(function (t) { val[t[0] + "," + t[1]] = t[2]; });
    var meno = C.filter(function (c) { return c[2] === -1; });
    var th = Math.min.apply(null, meno.map(function (c) { return val[c[0] + "," + c[1]]; }));
    var tutte = Math.min.apply(null, C.slice(1).map(function (c) { return val[c[0] + "," + c[1]]; }));
    return { C: C, theta: th, thetaTutte: tutte, esce: meno.filter(function (c) { return val[c[0] + "," + c[1]] === th; }) };
  }

  // ------------------------------------------------------------------ 19. una iterazione del metodo dei potenziali
  GEN.push({
    id: "no-g-transport-pivot", livello: "complessa", capitolo: "transportation-and-assignment",
    link: link("flows/transportation-and-assignment/the-potential-method/", "flussi/transportation-and-assignment/il-metodo-dei-potenziali/", "box-18-ta-th-pivot"),
    genera: function (rng, l) {
      return riprova(function () {
        var I = istanzaTrasporto(rng, 3, 3); if (!I) return null;
        var m = I.m, B = iniziale(I, "no");
        if (B.some(function (t) { return t[2] === 0; })) return null;
        var pi = potenzialiTP(I, B), z = costo(I, B), base = {}, cb = [];
        B.forEach(function (t) { base[t[0] + "," + t[1]] = 1; });
        for (var i = 0; i < m; i++) for (var j = 0; j < I.n; j++) if (!base[i + "," + j]) cb.push([i, j, I.c[i][j] - pi[i] + pi[m + j]]);
        var negs = cb.filter(function (c) { return c[2] < 0; }).sort(function (a, b) { return a[2] - b[2]; });
        if (!negs.length || (negs.length > 1 && negs[0][2] === negs[1][2])) return null;
        var e = negs[0], pv = pivotTP(I, B, e);
        if (pv.esce.length !== 1 || pv.theta === 0) return null;
        function op(ent, th, cc) { return [ent[0] + 1, m + ent[1] + 1, th, z + th * cc]; }
        var corr = op(e, pv.theta, e[2]);
        var cand = [];
        if (pv.thetaTutte !== pv.theta) cand.push(op(e, pv.thetaTutte, e[2]));
        cand.push([corr[0], corr[1], corr[2], z - pv.theta * e[2]]);
        var econ = cb.slice().sort(function (a, b) { return I.c[a[0]][a[1]] - I.c[b[0]][b[1]] || a[0] - b[0] || a[1] - b[1]; })[0];
        if (econ !== e) { var p2 = pivotTP(I, B, econ); cand.push(op(econ, p2.theta, econ[2])); }
        if (negs.length > 1) { var p3 = pivotTP(I, B, negs[1]); cand.push(op(negs[1], p3.theta, negs[1][2])); }
        var sc = scegli(rng, corr, cand);
        if (!sc) return null;
        return pacchetto(sc, function (v) { return T(l, "entra ", "enters ") + M("(" + v[0] + "," + v[1] + ")") + ", " + M("\\theta=" + v[2]) + T(l, ", nuovo costo ", ", new cost ") + M(v[3]); },
          testoTrasporto(l, I) + T(l, "Si parte dalla soluzione dell'angolo nord-ovest (costo $" + z + "$) e si fa una iterazione del metodo dei potenziali ($\\pi_6=0$; entra la cella con il costo ridotto più negativo). Quali sono la cella entrante, il passo $\\theta$ e il nuovo costo?",
            "Start from the north-west corner solution (cost $" + z + "$) and perform one iteration of the potential method ($\\pi_6=0$; the cell with the most negative reduced cost enters). What are the entering cell, the step $\\theta$ and the new cost?"),
          T(l, "Potenziali $\\vet{\\pi}=" + vec(pi) + "$; la cella " + M("(" + corr[0] + "," + corr[1] + ")") + " ha $\\bar{c}=" + e[2] + "$, il minimo. Sul suo ciclo $\\theta$ è il minimo delle sole celle con segno $-$: $\\theta=" + pv.theta + "$, e il costo scende di $\\theta\\,|\\bar{c}_e|$: $" + z + "-" + (pv.theta * -e[2]) + "=" + corr[3] + "$.",
            "Potentials $\\vet{\\pi}=" + vec(pi) + "$; the cell " + M("(" + corr[0] + "," + corr[1] + ")") + " has $\\bar{c}=" + e[2] + "$, the minimum. On its cycle $\\theta$ is the minimum over the $-$ cells only: $\\theta=" + pv.theta + "$, and the cost drops by $\\theta\\,|\\bar{c}_e|$: $" + z + "-" + (pv.theta * -e[2]) + "=" + corr[3] + "$."),
          I);
      });
    }
  });

  function permutazioni(a) {
    if (a.length <= 1) return [a.slice()];
    var r = [];
    a.forEach(function (x, i) { permutazioni(a.slice(0, i).concat(a.slice(i + 1))).forEach(function (p) { r.push([x].concat(p)); }); });
    return r;
  }
  function riduzione(c, primaColonne) {
    var n = c.length, r = c.map(function (row) { return row.slice(); }), val = 0;
    function righe() { for (var i = 0; i < n; i++) { var mn = Math.min.apply(null, r[i]); val += mn; for (var j = 0; j < n; j++) r[i][j] -= mn; } }
    function colonne() { for (var j = 0; j < n; j++) { var mn = INF; for (var i = 0; i < n; i++) mn = Math.min(mn, r[i][j]); val += mn; for (i = 0; i < n; i++) r[i][j] -= mn; } }
    if (primaColonne) { colonne(); righe(); } else { righe(); colonne(); }
    return val;
  }
  function testoMatrice(l, c) {
    var n = c.length;
    return T(l, "I lavoratori sono $1,\\dots," + n + "$ e i lavori $" + (n + 1) + ",\\dots," + 2 * n + "$; la matrice dei costi $c_{ij}$ ha righe ", "The workers are $1,\\dots," + n + "$ and the jobs $" + (n + 1) + ",\\dots," + 2 * n + "$; the cost matrix $c_{ij}$ has rows ") +
      c.map(function (r) { return M(vec(r)); }).join(", ") + ". ";
  }

  // ------------------------------------------------------------------ 20. assegnamento di costo minimo
  GEN.push({
    id: "no-g-assignment", livello: "media", capitolo: "transportation-and-assignment",
    link: link("flows/transportation-and-assignment/the-assignment-problem/", "flussi/transportation-and-assignment/il-problema-di-assegnamento/", "box-22-ta-def-ap"),
    genera: function (rng, l) {
      return riprova(function () {
        var n = 4, c = range(1, n).map(function () { return range(1, n).map(function () { return ri(rng, 1, 9); }); });
        var best = INF, arg = null;
        permutazioni(range(0, n - 1)).forEach(function (p) { var s = somma(p.map(function (j, i) { return c[i][j]; })); if (s < best) { best = s; arg = p; } });
        var usati = {}, gr = 0;
        for (var i = 0; i < n; i++) { var bj = null; for (var j = 0; j < n; j++) if (!usati[j] && (bj === null || c[i][j] < c[i][bj])) bj = j; usati[bj] = 1; gr += c[i][bj]; }
        var lb = riduzione(c, false), rmin = somma(c.map(function (r) { return Math.min.apply(null, r); }));
        var diag = somma(range(0, n - 1).map(function (k) { return c[k][k]; }));
        var sc = scegli(rng, best, [gr, lb, rmin, diag]);
        if (!sc) return null;
        return pacchetto(sc, function (v) { return M(v); },
          testoMatrice(l, c) + T(l, "Quanto costa un assegnamento di costo minimo?", "What does a minimum cost assignment cost?"),
          T(l, "Un assegnamento ottimo è ", "An optimal assignment is ") + arg.map(function (j, k) { return M("(" + (k + 1) + "," + (n + j + 1) + ")"); }).join(", ") +
          T(l, ", di costo $" + best + "$ (lo si ottiene con l'algoritmo ungherese). La scelta golosa riga per riga costa $" + gr + "$; la riduzione del Passo 0 dà solo il limite inferiore $" + lb + "$.",
            ", of cost $" + best + "$ (the Hungarian algorithm finds it). The greedy choice row by row costs $" + gr + "$; the reduction of Step 0 gives only the lower bound $" + lb + "$."),
          { c: c });
      });
    }
  });

  // ------------------------------------------------------------------ 21. limite del Passo 0 dell'algoritmo ungherese
  GEN.push({
    id: "no-g-hungarian-bound", livello: "facile", capitolo: "transportation-and-assignment",
    link: link("flows/transportation-and-assignment/the-assignment-problem/", "flussi/transportation-and-assignment/il-problema-di-assegnamento/", "box-25-ta-lem-reduce"),
    genera: function (rng, l) {
      return riprova(function () {
        var n = 4, c = range(1, n).map(function () { return range(1, n).map(function () { return ri(rng, 1, 9); }); });
        var v = riduzione(c, false), rmin = somma(c.map(function (r) { return Math.min.apply(null, r); }));
        var cmin = somma(range(0, n - 1).map(function (j) { return Math.min.apply(null, c.map(function (r) { return r[j]; })); }));
        var col = riduzione(c, true);
        if (v === rmin) return null;
        var sc = scegli(rng, v, [rmin, col, rmin + cmin, cmin]);
        if (!sc) return null;
        return pacchetto(sc, function (z) { return M(z); },
          testoMatrice(l, c) + T(l, "Al Passo 0 dell'algoritmo ungherese si sottrae a ogni riga il suo minimo, poi a ogni colonna del risultato il suo minimo. Quanto vale il valore duale $\\sum_{i}\\pi_i-\\sum_{j}\\pi_j$ ottenuto, limite inferiore sul costo di ogni assegnamento?",
            "In Step 0 of the Hungarian algorithm each row is reduced by its minimum, then each column of the result by its minimum. What is the resulting dual value $\\sum_{i}\\pi_i-\\sum_{j}\\pi_j$, a lower bound on the cost of every assignment?"),
          T(l, "Somma dei minimi delle righe ($" + rmin + "$) più somma dei minimi delle colonne della matrice già ridotta per righe: $" + v + "$. I minimi delle colonne vanno presi dopo la riduzione per righe.",
            "Sum of the row minima ($" + rmin + "$) plus sum of the column minima of the row-reduced matrix: $" + v + "$. The column minima are taken after the row reduction."),
          { c: c });
      });
    }
  });

  // alberi ricoprenti orientati su nodi 1..n
  function alberoCasuale(rng, n) {
    var perm = shuffle(rng, range(1, n)), T = [];
    for (var k = 1; k < n; k++) { var p = perm[ri(rng, 0, k - 1)]; T.push(rng() < 0.5 ? [p, perm[k]] : [perm[k], p]); }
    T.sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    return T;
  }
  // soluzione ad albero dalle foglie (radice n): x sugli archi di T
  function soluzioneAlbero(n, T, b, variante) {
    var bh = b.slice(), rest = T.map(function (a, k) { return k; }), x = T.map(function () { return 0; }), vivi = {};
    for (var i = 1; i <= n; i++) vivi[i] = 1;
    while (rest.length) {
      var foglia = null, ka = null;
      for (i = 1; i <= n && foglia === null; i++) {
        if (i === n || !vivi[i]) continue;
        var inc = rest.filter(function (k) { return T[k][0] === i || T[k][1] === i; });
        if (inc.length === 1) { foglia = i; ka = inc[0]; }
      }
      var a = T[ka], j = a[0] === foglia ? a[1] : a[0], val = variante === "orig" ? b[foglia - 1] : bh[foglia - 1];
      x[ka] = variante === "abs" ? val : (a[0] === foglia ? val : -val);
      bh[j - 1] += bh[foglia - 1];
      vivi[foglia] = 0; rest.splice(rest.indexOf(ka), 1);
    }
    return x;
  }
  function potenzialiAlbero(n, T, c, radice) {
    var pi = {}; pi[radice] = 0;
    for (var it = 0; it < n; it++) T.forEach(function (a, k) {
      if (pi[a[0]] !== undefined && pi[a[1]] === undefined) pi[a[1]] = pi[a[0]] - c[k];
      else if (pi[a[1]] !== undefined && pi[a[0]] === undefined) pi[a[0]] = pi[a[1]] + c[k];
    });
    return range(1, n).map(function (i) { return pi[i]; });
  }

  // ------------------------------------------------------------------ 22. soluzione ad albero
  GEN.push({
    id: "no-g-tree-solution", livello: "facile", capitolo: "network-simplex",
    link: link("network-simplex/network-simplex/bases-and-spanning-trees/", "simplesso-su-reti/network-simplex/basi-e-alberi-ricoprenti/", "box-7-ns-prop-leaves"),
    genera: function (rng, l) {
      return riprova(function () {
        var n = 5, Tr = alberoCasuale(rng, n);
        var b = [ri(rng, -3, 6), ri(rng, -3, 6), ri(rng, -4, 5), ri(rng, -4, 4), 0];
        b[4] = -somma(b.slice(0, 4));
        if (b.filter(function (v) { return v !== 0; }).length < 4) return null;
        var x = soluzioneAlbero(n, Tr, b, "giusto");
        var sc = scegli(rng, x, [x.map(function (v) { return -v; }), soluzioneAlbero(n, Tr, b, "abs"), soluzioneAlbero(n, Tr, b, "orig")]);
        if (!sc) return null;
        return pacchetto(sc, function (v) { return M(vec(v)); },
          T(l, "Una rete senza capacità ha nodi $1,\\dots,5$ e bilanci $\\vet{b}=" + vec(b) + "$. L'albero $T$ ha gli archi ", "An uncapacitated network has nodes $1,\\dots,5$ and balances $\\vet{b}=" + vec(b) + "$. The tree $T$ has the arcs ") +
          Tr.map(function (a) { return M(arc(a)); }).join(", ") +
          T(l, " (radice $5$), e gli archi fuori dall'albero stanno in $L$ con flusso $0$. Quali sono i flussi sugli archi di $T$, nell'ordine dato?",
            " (root $5$), and the arcs outside the tree are in $L$ with flow $0$. What are the flows on the arcs of $T$, in the given order?"),
          T(l, "Si toglie ripetutamente una foglia $\\ell \\neq 5$: $x_a=\\hat{b}_\\ell$ se l'arco esce da $\\ell$, $x_a=-\\hat{b}_\\ell$ se entra in $\\ell$, e $\\hat{b}_\\ell$ si somma al bilancio del vicino. Risultato " + M(vec(x)) + (x.some(function (v) { return v < 0; }) ? T(l, " (la struttura non è ammissibile).", " (the structure is not feasible).") : "."),
            "Repeatedly remove a leaf $\\ell \\neq 5$: $x_a=\\hat{b}_\\ell$ if the arc leaves $\\ell$, $x_a=-\\hat{b}_\\ell$ if it enters $\\ell$, and $\\hat{b}_\\ell$ is added to the balance of the neighbour. Result " + M(vec(x)) + (x.some(function (v) { return v < 0; }) ? " (the structure is not feasible)." : ".")),
          { n: n, T: Tr, b: b });
      });
    }
  });

  // ------------------------------------------------------------------ 23. potenziali di un albero
  GEN.push({
    id: "no-g-tree-potentials", livello: "facile", capitolo: "network-simplex",
    link: link("network-simplex/network-simplex/potentials-and-optimality/", "simplesso-su-reti/network-simplex/potenziali-e-ottimalita/", "box-9-ns-def-potentials"),
    genera: function (rng, l) {
      return riprova(function () {
        var n = 5, Tr = alberoCasuale(rng, n), c = Tr.map(function () { return ri(rng, 1, 9); });
        var pi = potenzialiAlbero(n, Tr, c, n);
        var p1 = pi.map(function (p) { return p - pi[0]; });
        // ignorando l'orientamento: costo del cammino con tutti i segni +
        var pabs;
        var adj = {}; for (var i = 1; i <= n; i++) adj[i] = [];
        Tr.forEach(function (a, k) { adj[a[0]].push([a[1], c[k]]); adj[a[1]].push([a[0], c[k]]); });
        var ab = {}; ab[n] = 0; var coda = [n];
        while (coda.length) { var u = coda.shift(); adj[u].forEach(function (p) { if (ab[p[0]] === undefined) { ab[p[0]] = ab[u] + p[1]; coda.push(p[0]); } }); }
        pabs = range(1, n).map(function (i) { return ab[i]; });
        var sc = scegli(rng, pi, [pi.map(function (p) { return -p; }), p1, pabs]);
        if (!sc) return null;
        return pacchetto(sc, function (v) { return M(vec(v)); },
          T(l, "L'albero ricoprente $T$ di una rete con nodi $1,\\dots,5$ ha gli archi con costi ", "The spanning tree $T$ of a network with nodes $1,\\dots,5$ has the arcs with costs ") +
          Tr.map(function (a, k) { return M("c_{" + a[0] + a[1] + "}=" + c[k]); }).join(", ") +
          T(l, ". Quali sono i potenziali $\\vet{\\pi}$ dell'albero, con $\\bar{c}_{ij}=c_{ij}-\\pi_i+\\pi_j=0$ sugli archi di $T$ e radice $\\pi_5=0$?",
            ". What are the potentials $\\vet{\\pi}$ of the tree, with $\\bar{c}_{ij}=c_{ij}-\\pi_i+\\pi_j=0$ on the arcs of $T$ and root $\\pi_5=0$?"),
          T(l, "$\\pi_i$ è il costo del cammino nell'albero da $i$ alla radice, con $+c_{ij}$ sugli archi percorsi dalla coda alla testa e $-c_{ij}$ sugli altri: $\\vet{\\pi}=" + vec(pi) + "$.",
            "$\\pi_i$ is the cost of the tree path from $i$ to the root, with $+c_{ij}$ on the arcs traversed from tail to head and $-c_{ij}$ on the others: $\\vet{\\pi}=" + vec(pi) + "$."),
          { n: n, T: Tr, c: c });
      });
    }
  });

  // pivot del simplesso su reti senza capacità; restituisce null se illimitato o con pareggi
  function pivotNS(n, A, T, x, pi, e) { // A: [i,j,c]; T: indici di A nell'albero; x: flussi su A; e: indice entrante (in L)
    var adj = {}; for (var i = 1; i <= n; i++) adj[i] = [];
    T.forEach(function (k) { adj[A[k][0]].push([A[k][1], k]); adj[A[k][1]].push([A[k][0], k]); });
    function versoRadice(v) { var p = {}; p[n] = -1; var q = [n]; while (q.length) { var u = q.shift(); adj[u].forEach(function (w) { if (p[w[0]] === undefined) { p[w[0]] = [u, w[1]]; q.push(w[0]); } }); } var cam = [v]; while (v !== n) { v = p[v][0]; cam.push(v); } return { cam: cam, p: p }; }
    var k0 = A[e][0], l0 = A[e][1], rk = versoRadice(k0), rl = versoRadice(l0);
    var apice = null; for (var t = 0; t < rk.cam.length && apice === null; t++) if (rl.cam.indexOf(rk.cam[t]) >= 0) apice = rk.cam[t];
    // ciclo nella direzione di e, a partire dall'apice: apice -> ... -> k (cammino P), e, l -> ... -> apice (cammino Q)
    var P = rk.cam.slice(0, rk.cam.indexOf(apice) + 1).reverse(), Q = rl.cam.slice(0, rl.cam.indexOf(apice) + 1);
    var ciclo = [], p = rk.p;
    function passo(u, v) { // arco dell'albero fra u e v, percorso da u a v
      var k = null; adj[u].forEach(function (w) { if (w[0] === v) k = w[1]; });
      return { k: k, avanti: A[k][0] === u };
    }
    for (t = 0; t + 1 < P.length; t++) ciclo.push(passo(P[t], P[t + 1]));
    ciclo.push({ k: e, avanti: true });
    for (t = 0; t + 1 < Q.length; t++) ciclo.push(passo(Q[t], Q[t + 1]));
    var ind = ciclo.filter(function (s) { return !s.avanti; });
    if (!ind.length) return null;
    var th = Math.min.apply(null, ind.map(function (s) { return x[s.k]; }));
    var blocc = ciclo.filter(function (s) { return !s.avanti && x[s.k] === th; });
    var esce = blocc[blocc.length - 1].k;
    var cb = A[e][2] - pi[k0 - 1] + pi[l0 - 1];
    return { ciclo: ciclo, theta: th, esce: esce, nblocc: blocc.length, cb: cb };
  }

  // ------------------------------------------------------------------ 24. un pivot del simplesso su reti
  GEN.push({
    id: "no-g-network-simplex-pivot", livello: "complessa", capitolo: "network-simplex",
    link: link("network-simplex/network-simplex/the-pivot/", "simplesso-su-reti/network-simplex/il-pivot/", "box-14-ns-def-pivot"),
    genera: function (rng, l) {
      return riprova(function () {
        var n = 5, Tn = alberoCasuale(rng, n), has = {}, A = [];
        Tn.forEach(function (a) { has[a[0] + "," + a[1]] = 1; has[a[1] + "," + a[0]] = 1; A.push([a[0], a[1], ri(rng, 1, 9)]); });
        var g = 0; while (A.length < 8 && g++ < 200) { var i = ri(rng, 1, n), j = ri(rng, 1, n); if (i !== j && !has[i + "," + j] && !has[j + "," + i]) { has[i + "," + j] = 1; A.push([i, j, ri(rng, 1, 9)]); } }
        var ord = A.map(function (a, k) { return k; }).sort(function (p, q) { return A[p][0] - A[q][0] || A[p][1] - A[q][1]; });
        A = ord.map(function (k) { return A[k]; });
        var Tr = A.map(function (a, k) { return k; }).filter(function (k) { return Tn.some(function (t) { return t[0] === A[k][0] && t[1] === A[k][1]; }); });
        var x = A.map(function () { return 0; });
        Tr.forEach(function (k) { x[k] = ri(rng, 1, 6); });
        var b = range(1, n).map(function () { return 0; });
        A.forEach(function (a, k) { b[a[0] - 1] += x[k]; b[a[1] - 1] -= x[k]; });
        var pi = potenzialiAlbero(n, Tr.map(function (k) { return A[k]; }), Tr.map(function (k) { return A[k][2]; }), n);
        var z = somma(A.map(function (a, k) { return a[2] * x[k]; }));
        var L = A.map(function (a, k) { return k; }).filter(function (k) { return Tr.indexOf(k) < 0; });
        var cb = {}; L.forEach(function (k) { cb[k] = A[k][2] - pi[A[k][0] - 1] + pi[A[k][1] - 1]; });
        var elig = L.filter(function (k) { return cb[k] < 0; }).sort(function (p, q) { return cb[p] - cb[q]; });
        if (!elig.length || (elig.length > 1 && cb[elig[0]] === cb[elig[1]])) return null;
        var e = elig[0], pv = pivotNS(n, A, Tr, x, pi, e);
        if (!pv || pv.nblocc !== 1) return null;
        function op(ent, out, cost) { return [A[ent][0], A[ent][1], A[out][0], A[out][1], cost]; }
        var corr = op(e, pv.esce, z - pv.theta * Math.abs(pv.cb));
        var cand = [];
        // errore: minimo flusso su tutti gli archi dell'albero nel ciclo, senza guardare il verso
        var tutti = pv.ciclo.filter(function (s) { return s.k !== e; });
        var mn = Math.min.apply(null, tutti.map(function (s) { return x[s.k]; }));
        var sm = tutti.filter(function (s) { return x[s.k] === mn; });
        cand.push(op(e, sm[sm.length - 1].k, z - mn * Math.abs(pv.cb)));
        // errore: ciclo orientato contro l'arco entrante (bloccano gli archi in avanti)
        var avanti = tutti.filter(function (s) { return s.avanti; });
        if (avanti.length) { var m2 = Math.min.apply(null, avanti.map(function (s) { return x[s.k]; })); var s2 = avanti.filter(function (s) { return x[s.k] === m2; }); cand.push(op(e, s2[s2.length - 1].k, z + m2 * Math.abs(pv.cb))); }
        cand.push(op(e, pv.esce, z + pv.theta * Math.abs(pv.cb)));
        if (elig.length > 1) { var p2 = pivotNS(n, A, Tr, x, pi, elig[1]); if (p2) cand.push(op(elig[1], p2.esce, z - p2.theta * Math.abs(p2.cb))); }
        var sc = scegli(rng, corr, cand);
        if (!sc) return null;
        return pacchetto(sc, function (v) { return T(l, "entra ", "enters ") + M("(" + v[0] + "," + v[1] + ")") + T(l, ", esce ", ", leaves ") + M("(" + v[2] + "," + v[3] + ")") + T(l, ", costo ", ", cost ") + M(v[4]); },
          T(l, "Una rete senza capacità ha nodi $1,\\dots,5$, bilanci $\\vet{b}=" + vec(b) + "$ e gli archi con costi ", "An uncapacitated network has nodes $1,\\dots,5$, balances $\\vet{b}=" + vec(b) + "$ and the arcs with costs ") +
          A.map(function (a) { return M("c_{" + a[0] + a[1] + "}=" + a[2]); }).join(", ") +
          T(l, ". L'albero corrente è $T=\\{", ". The current tree is $T=\\{") + Tr.map(function (k) { return arc(A[k]); }).join(",") +
          T(l, "\\}$ (radice $5$, gli altri archi in $L$), con soluzione ad albero di costo $" + z + "$. Si fa un pivot del simplesso su reti (potenziali con $\\pi_5=0$, $\\bar{c}_{ij}=c_{ij}-\\pi_i+\\pi_j$; entra, fra gli archi di $L$ con $\\bar{c}_{ij}<0$, quello con il massimo $|\\bar{c}_{ij}|$). Quali sono l'arco entrante, l'arco uscente e il nuovo costo?",
            "\\}$ (root $5$, the other arcs in $L$), with a tree solution of cost $" + z + "$. Perform one pivot of the network simplex (potentials with $\\pi_5=0$, $\\bar{c}_{ij}=c_{ij}-\\pi_i+\\pi_j$; among the arcs of $L$ with $\\bar{c}_{ij}<0$, the one with the largest $|\\bar{c}_{ij}|$ enters). What are the entering arc, the leaving arc and the new cost?"),
          T(l, "Potenziali $\\vet{\\pi}=" + vec(pi) + "$; entra " + M(arc(A[e])) + " con $\\bar{c}=" + pv.cb + "$. Il ciclo, orientato come l'arco entrante, è bloccato solo dagli archi all'indietro: $\\theta=" + pv.theta + "$, esce " + M(arc(A[pv.esce])) + ", e il costo scende di $\\theta\\,|\\bar{c}_{kl}|$ a $" + corr[4] + "$.",
            "Potentials $\\vet{\\pi}=" + vec(pi) + "$; " + M(arc(A[e])) + " enters with $\\bar{c}=" + pv.cb + "$. The cycle, oriented as the entering arc, is blocked only by backward arcs: $\\theta=" + pv.theta + "$, " + M(arc(A[pv.esce])) + " leaves, and the cost drops by $\\theta\\,|\\bar{c}_{kl}|$ to $" + corr[4] + "$."),
          { n: n, A: A, T: Tr, x: x, b: b });
      });
    }
  });

  // progetti: attività 1..n, precedenze (i<j), durate
  function progetto(rng, n) {
    var d = range(1, n).map(function () { return ri(rng, 1, 9); }), pred = {};
    for (var j = 1; j <= n; j++) {
      pred[j] = [];
      for (var i = 1; i < j; i++) if (rng() < (j - i <= 2 ? 0.45 : 0.15)) pred[j].push(i);
    }
    return { n: n, d: d, pred: pred };
  }
  function cpm(P, modoMin) {
    var n = P.n, ES = {}, EF = {}, succ = {};
    for (var j = 1; j <= n; j++) succ[j] = [];
    for (j = 1; j <= n; j++) P.pred[j].forEach(function (i) { succ[i].push(j); });
    for (j = 1; j <= n; j++) {
      var v = P.pred[j].map(function (i) { return EF[i]; });
      ES[j] = v.length ? (modoMin ? Math.min.apply(null, v) : Math.max.apply(null, v)) : 0;
      EF[j] = ES[j] + P.d[j - 1];
    }
    var fine = range(1, n).filter(function (j) { return !succ[j].length; });
    var Tt = Math.max.apply(null, fine.map(function (j) { return EF[j]; }));
    var LS = {}, LF = {}, LFmax = {};
    for (j = n; j >= 1; j--) {
      var w = succ[j].map(function (k) { return LS[k]; });
      LF[j] = w.length ? Math.min.apply(null, w) : Tt; LS[j] = LF[j] - P.d[j - 1];
    }
    var LSm = {};
    for (j = n; j >= 1; j--) { var w2 = succ[j].map(function (k) { return LSm[k]; }); LFmax[j] = w2.length ? Math.max.apply(null, w2) : Tt; LSm[j] = LFmax[j] - P.d[j - 1]; }
    var FS = {};
    for (j = 1; j <= n; j++) FS[j] = (succ[j].length ? Math.min.apply(null, succ[j].map(function (k) { return ES[k]; })) : Tt) - EF[j];
    return { ES: ES, EF: EF, LS: LS, LF: LF, LSmax: LSm, FS: FS, T: Tt, succ: succ, fine: fine };
  }
  function cammini(P, r) { // tutti i cammini START -> FINISH come liste di attività
    var out = [];
    (function go(j, cam) {
      if (!r.succ[j].length) { out.push(cam.slice()); return; }
      r.succ[j].forEach(function (k) { cam.push(k); go(k, cam); cam.pop(); });
    })(0, []);
    return out;
  }
  function testoProgetto(l, P) {
    var righe = range(1, P.n).map(function (j) {
      return M(j) + " (" + M("d_{" + j + "}=" + P.d[j - 1]) + T(l, "; predecessori: ", "; predecessors: ") + (P.pred[j].length ? M(P.pred[j].join(",")) : "—") + ")";
    });
    return T(l, "Un progetto ha le attività (durata; predecessori immediati) ", "A project has the activities (duration; immediate predecessors) ") + righe.join(", ") + ". ";
  }
  function preparaCammini(P, r) {
    // successori di START: attività senza predecessori
    r.succ[0] = range(1, P.n).filter(function (j) { return !P.pred[j].length; });
    return cammini(P, r).map(function (c) { return { c: c, L: somma(c.map(function (j) { return P.d[j - 1]; })) }; });
  }

  // ------------------------------------------------------------------ 25. durata minima del progetto
  GEN.push({
    id: "no-g-project-duration", livello: "media", capitolo: "project-management",
    link: link("project-management/project-management/the-forward-pass-earliest-times/", "gestione-dei-progetti/project-management/la-passata-in-avanti-i-tempi-al-piu-presto/", "box-9-pm-def-earliest"),
    genera: function (rng, l) {
      return riprova(function () {
        var P = progetto(rng, 7), r = cpm(P), rmin = cpm(P, true);
        var cs = preparaCammini(P, r);
        if (cs.length < 3) return null;
        var crit = cs.filter(function (x) { return x.L === r.T; })[0].c, ult = crit[crit.length - 1];
        var piuLungo = cs.slice().sort(function (a, b) { return b.c.length - a.c.length || a.L - b.L; })[0].L;
        var minFine = Math.max.apply(null, range(1, P.n).filter(function (j) { return !r.succ[j].length; }).map(function (j) { return rmin.EF[j]; }));
        var sc = scegli(rng, r.T, [minFine, r.T - P.d[ult - 1], piuLungo, somma(P.d)]);
        if (!sc) return null;
        return pacchetto(sc, function (v) { return M(v); },
          testoProgetto(l, P) + T(l, "Un'attività inizia quando tutti i suoi predecessori immediati sono finiti. Quanto vale la durata minima $T$ del progetto, cioè il minimo istante in cui tutte le attività possono essere finite?", "An activity starts when all its immediate predecessors are finished. What is the minimum project duration $T$, that is, the earliest time by which all the activities can be finished?"),
          T(l, "Passata in avanti: $\\mathit{ES}_j=\\max \\mathit{EF}_i$ sui predecessori immediati, $\\mathit{EF}_j=\\mathit{ES}_j+d_j$; $T=\\mathit{ES}_{\\mathrm{FINISH}}=" + r.T + "$, la lunghezza del cammino critico " + M("\\text{START}," + crit.join(",") + ",\\text{FINISH}") + ". Con il minimo al posto del massimo si ottiene $" + minFine + "$.",
            "Forward pass: $\\mathit{ES}_j=\\max \\mathit{EF}_i$ over the immediate predecessors, $\\mathit{EF}_j=\\mathit{ES}_j+d_j$; $T=\\mathit{ES}_{\\mathrm{FINISH}}=" + r.T + "$, the length of the critical path " + M("\\text{START}," + crit.join(",") + ",\\text{FINISH}") + ". With the minimum instead of the maximum one gets $" + minFine + "$."),
          P);
      });
    }
  });

  // ------------------------------------------------------------------ 26. cammino critico
  GEN.push({
    id: "no-g-critical-path", livello: "media", capitolo: "project-management",
    link: link("project-management/project-management/paths-and-critical-paths/", "gestione-dei-progetti/project-management/cammini-e-cammini-critici/", "box-6-pm-def-critical"),
    genera: function (rng, l) {
      return riprova(function () {
        var P = progetto(rng, 7), r = cpm(P), cs = preparaCammini(P, r);
        var crit = cs.filter(function (x) { return x.L === r.T; });
        if (crit.length !== 1 || cs.length < 4) return null;
        var altri = cs.filter(function (x) { return x.L < r.T; }).sort(function (a, b) { return b.L - a.L; }).map(function (x) { return x.c; });
        var sc = scegli(rng, crit[0].c, altri);
        if (!sc) return null;
        return pacchetto(sc, function (v) { return M("\\text{START}," + v.join(",") + ",\\text{FINISH}"); },
          testoProgetto(l, P) + T(l, "Nella rete delle attività (nodi START e FINISH di durata $0$), qual è il cammino critico, cioè il cammino da START a FINISH di lunghezza (somma delle durate) massima?", "In the project network (nodes START and FINISH of duration $0$), which is the critical path, that is, the path from START to FINISH of maximum length (sum of the durations)?"),
          T(l, "Un cammino critico è un cammino da START a FINISH di lunghezza massima (somma delle durate delle sue attività): qui è unico, lungo $T=" + r.T + "$; i suoi archi sono tutti stretti, $\\mathit{ES}_j=\\mathit{EF}_i$.",
            "A critical path is a path from START to FINISH of maximum length (sum of the durations of its activities): here it is unique, of length $T=" + r.T + "$; all its arcs are tight, $\\mathit{ES}_j=\\mathit{EF}_i$."),
          P);
      });
    }
  });

  // ------------------------------------------------------------------ 27. scorta totale e scorta libera
  GEN.push({
    id: "no-g-slacks", livello: "complessa", capitolo: "project-management",
    link: link("project-management/project-management/slacks-and-critical-activities/", "gestione-dei-progetti/project-management/scorte-e-attivita-critiche/", "box-16-pm-def-slacks"),
    genera: function (rng, l) {
      return riprova(function () {
        var P = progetto(rng, 8), r = cpm(P);
        var cand = range(1, P.n).filter(function (j) { return r.LS[j] - r.ES[j] > 0 && r.FS[j] < r.LS[j] - r.ES[j] && r.succ[j].length; });
        if (!cand.length) return null;
        var j = cand[ri(rng, 0, cand.length - 1)], TS = r.LS[j] - r.ES[j], FS = r.FS[j];
        var TSmax = r.LSmax[j] - r.ES[j];
        var sc = scegli(rng, [TS, FS], [[FS, TS], [TS, TS], [TSmax, FS], [TS, 0]]);
        if (!sc) return null;
        return pacchetto(sc, function (v) { return M("\\mathit{TS}_{" + j + "}=" + v[0] + ",\\ \\mathit{FS}_{" + j + "}=" + v[1]); },
          testoProgetto(l, P) + T(l, "La scorta totale $\\mathit{TS}_{" + j + "}=\\mathit{LS}_{" + j + "}-\\mathit{ES}_{" + j + "}$ è il ritardo massimo dell'attività $" + j + "$ che non allunga il progetto; la scorta libera $\\mathit{FS}_{" + j + "}$ è il ritardo massimo che non sposta l'inizio al più presto di alcun successore. Quanto valgono?",
            "The total slack $\\mathit{TS}_{" + j + "}=\\mathit{LS}_{" + j + "}-\\mathit{ES}_{" + j + "}$ is the largest delay of activity $" + j + "$ that does not lengthen the project; the free slack $\\mathit{FS}_{" + j + "}$ is the largest delay that moves the earliest start of no successor. What are they?"),
          T(l, "Passata in avanti: $\\mathit{ES}_{" + j + "}=" + r.ES[j] + "$, $\\mathit{EF}_{" + j + "}=" + r.EF[j] + "$, $T=" + r.T + "$; passata all'indietro ($\\mathit{LF}_j=\\min \\mathit{LS}_k$): $\\mathit{LS}_{" + j + "}=" + r.LS[j] + "$. Quindi $\\mathit{TS}_{" + j + "}=\\mathit{LS}_{" + j + "}-\\mathit{ES}_{" + j + "}=" + TS + "$ e $\\mathit{FS}_{" + j + "}=\\min_k \\mathit{ES}_k-\\mathit{EF}_{" + j + "}=" + FS + "$.",
            "Forward pass: $\\mathit{ES}_{" + j + "}=" + r.ES[j] + "$, $\\mathit{EF}_{" + j + "}=" + r.EF[j] + "$, $T=" + r.T + "$; backward pass ($\\mathit{LF}_j=\\min \\mathit{LS}_k$): $\\mathit{LS}_{" + j + "}=" + r.LS[j] + "$. Hence $\\mathit{TS}_{" + j + "}=\\mathit{LS}_{" + j + "}-\\mathit{ES}_{" + j + "}=" + TS + "$ and $\\mathit{FS}_{" + j + "}=\\min_k \\mathit{ES}_k-\\mathit{EF}_{" + j + "}=" + FS + "$."),
          { P: P, j: j });
      });
    }
  });
  // ------------------------------------------------------------------ 28. componente fortemente connessa di un nodo
  function raggiungibili(n, arcs, v, indietro) {
    var vis = {}; vis[v] = 1; var q = [v];
    while (q.length) {
      var u = q.shift();
      arcs.forEach(function (a) { var p = indietro ? a[1] : a[0], h = indietro ? a[0] : a[1]; if (p === u && !vis[h]) { vis[h] = 1; q.push(h); } });
    }
    return range(1, n).filter(function (i) { return vis[i]; });
  }
  GEN.push({
    id: "no-g-strong-component", livello: "media", capitolo: "graphs",
    link: link("graphs/graphs/connectivity/", "grafi/graphs/connettivita/", "box-18-gr-ex-components"),
    genera: function (rng, l) {
      return riprova(function () {
        var n = 7, m = ri(rng, 9, 11), arcs = [], has = {}, g = 0;
        while (arcs.length < m && g++ < 500) { var i = ri(rng, 1, n), j = ri(rng, 1, n); if (i !== j && !has[i + "," + j]) { has[i + "," + j] = 1; arcs.push([i, j]); } }
        arcs.sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
        var v = ri(rng, 1, n), R = raggiungibili(n, arcs, v, false), Ri = raggiungibili(n, arcs, v, true);
        var comp = R.filter(function (x) { return Ri.indexOf(x) >= 0; });
        var uni = range(1, n).filter(function (x) { return R.indexOf(x) >= 0 || Ri.indexOf(x) >= 0; });
        if (comp.length < 2 || key(R) === key(comp) || key(Ri) === key(comp)) return null;
        var sc = scegli(rng, comp, [R, Ri, uni]);
        if (!sc) return null;
        function insieme(x) { return M("\\{" + x.join(",") + "\\}"); }
        return pacchetto(sc, insieme,
          T(l, "Il grafo orientato con nodi $1,\\dots,7$ ha gli archi ", "The directed graph with nodes $1,\\dots,7$ has the arcs ") +
          arcs.map(function (a) { return M(arc(a)); }).join(", ") +
          T(l, ". Due nodi $i,j$ sono fortemente connessi se esistono cammini orientati da $i$ a $j$ e da $j$ a $i$. Qual è la componente fortemente connessa del nodo $" + v + "$, cioè l'insieme dei nodi fortemente connessi a $" + v + "$?",
            ". Two nodes $i,j$ are strongly connected if there are directed paths from $i$ to $j$ and from $j$ to $i$. What is the strongly connected component of node $" + v + "$, that is, the set of the nodes strongly connected to $" + v + "$?"),
          T(l, "Nodi raggiungibili da $" + v + "$: $R=" + insieme(R).slice(1, -1) + "$; nodi da cui $" + v + "$ è raggiungibile: $R'=" + insieme(Ri).slice(1, -1) + "$. La componente è $R \\cap R'=" + insieme(comp).slice(1, -1) + "$; $R$ da solo, $R'$ da solo o l'unione contengono nodi da cui non si torna.",
            "Nodes reachable from $" + v + "$: $R=" + insieme(R).slice(1, -1) + "$; nodes from which $" + v + "$ is reachable: $R'=" + insieme(Ri).slice(1, -1) + "$. The component is $R \\cap R'=" + insieme(comp).slice(1, -1) + "$; $R$ alone, $R'$ alone or the union contain nodes with no way back."),
          { n: n, arcs: arcs, v: v });
      });
    }
  });

  // ------------------------------------------------------------------ 29. scambio di uno spigolo in un albero ricoprente
  GEN.push({
    id: "no-g-mst-exchange", livello: "media", capitolo: "minimum-spanning-trees",
    link: link("trees-and-paths/minimum-spanning-trees/cuts-and-cycles/", "alberi-e-cammini/minimum-spanning-trees/tagli-e-cicli/", "box-7-mst-lem-exchange"),
    genera: function (rng, l) {
      return riprova(function () {
        var n = 6, E = grafoPesato(rng, n, 9, 15);
        var Tr = kruskal(n, shuffle(rng, E).map(function (e, k) { return [e[0], e[1], k]; })).map(function (e) {
          return E.filter(function (f) { return f[0] === e[0] && f[1] === e[1]; })[0];
        });
        Tr.sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
        var fuori = E.filter(function (e) { return Tr.indexOf(e) < 0; });
        var e = fuori[ri(rng, 0, fuori.length - 1)], W = peso(Tr);
        var ciclo = Tr.filter(function (f) { return kruskal(n, Tr.filter(function (g) { return g !== f; }).concat([e])).length === n - 1; });
        if (ciclo.length < 2) return null;
        var wc = ciclo.map(function (f) { return f[2]; });
        var corr = W + e[2] - Math.max.apply(null, wc);
        var maxT = Math.max.apply(null, Tr.map(function (f) { return f[2]; }));
        var sc = scegli(rng, corr, [W + e[2] - Math.min.apply(null, wc), W + e[2] - maxT, W, W + e[2]]);
        if (!sc) return null;
        return pacchetto(sc, function (v) { return M(v); },
          T(l, "Il grafo non orientato con vertici $1,\\dots,6$ ha gli spigoli con pesi ", "The undirected graph with vertices $1,\\dots,6$ has the edges with weights ") +
          testoSpigoli(E) + T(l, " ($w_{uv}$ è il peso di $\\{u,v\\}$). L'albero ricoprente $T=\\{", " ($w_{uv}$ is the weight of $\\{u,v\\}$). The spanning tree $T=\\{") +
          Tr.map(function (f) { return edge(f); }).join(",") +
          T(l, "\\}$ pesa $" + W + "$. Si aggiunge a $T$ lo spigolo $" + edge(e) + "$ e si toglie uno spigolo in modo da ottenere ancora un albero ricoprente. Quanto pesa il più leggero degli alberi così ottenuti?",
            "\\}$ weighs $" + W + "$. The edge $" + edge(e) + "$ is added to $T$ and one edge is removed so as to obtain a spanning tree again. What is the weight of the lightest tree obtained in this way?"),
          T(l, "Si può togliere solo uno spigolo del ciclo fondamentale di $" + edge(e) + "$, cioè " + ciclo.map(function (f) { return M(edge(f)); }).join(", ") + " (lemma di scambio); conviene il più pesante: $" + W + "+" + e[2] + "-" + Math.max.apply(null, wc) + "=" + corr + "$. Lo spigolo più pesante di $T$ può stare fuori dal ciclo.",
            "Only an edge of the fundamental cycle of $" + edge(e) + "$ can be removed, that is " + ciclo.map(function (f) { return M(edge(f)); }).join(", ") + " (exchange lemma); the heaviest is the best choice: $" + W + "+" + e[2] + "-" + Math.max.apply(null, wc) + "=" + corr + "$. The heaviest edge of $T$ may lie outside the cycle."),
          { n: n, E: E, T: Tr, e: e });
      });
    }
  });

  // ------------------------------------------------------------------ 30. Dijkstra completo: ordine dei nodi permanenti e distanze
  GEN.push({
    id: "no-g-dijkstra-run", livello: "complessa", capitolo: "shortest-paths",
    link: link("trees-and-paths/shortest-paths/dijkstra-s-algorithm/", "alberi-e-cammini/shortest-paths/l-algoritmo-di-dijkstra/", "box-30-sp-th-dijkstra"),
    genera: function (rng, l) {
      return riprova(function () {
        var n = 6, arcs = digrafo(rng, n, ri(rng, 9, 11));
        var A = arcs.map(function (a) { return [a[0], a[1], ri(rng, 1, 9)]; });
        var g = dijkstra(n, A, 1, "giusto"), p = dijkstra(n, A, 1, "primo"), q = dijkstra(n, A, 1, "prim");
        var hop = minArchi(n, A, 1);
        var corr = [g.ordine, g.d];
        var sc = scegli(rng, corr, [[p.ordine, p.d], [q.ordine, q.d], [g.ordine, hop], [g.ordine, p.d]]);
        if (!sc) return null;
        return pacchetto(sc, function (v) { return T(l, "ordine ", "order ") + M(seq(v[0])) + "; " + M("\\tilde{d}=" + vec(v[1])); },
          T(l, "Il grafo orientato con nodi $1,\\dots,6$ ha gli archi con lunghezze ", "The directed graph with nodes $1,\\dots,6$ has the arcs with lengths ") +
          testoArchiPesati(A, "d") +
          T(l, ". L'algoritmo di Dijkstra da $s=1$ rende permanente a ogni passo il nodo temporaneo con etichetta minima (a parità, quello di indice minore) e aggiorna $d(j):=d(i)+d_{ij}$ sugli archi uscenti dal nodo $i$ appena reso permanente, se migliora. In quale ordine i nodi diventano permanenti, e quali sono le distanze finali $\\tilde{d}=(\\tilde{d}(1),\\dots,\\tilde{d}(6))$?",
            ". Dijkstra's algorithm from $s=1$ makes permanent at every step the temporary node with the smallest label (ties: the smallest index) and updates $d(j):=d(i)+d_{ij}$ on the arcs leaving the node $i$ just made permanent, if it improves. In which order do the nodes become permanent, and what are the final distances $\\tilde{d}=(\\tilde{d}(1),\\dots,\\tilde{d}(6))$?"),
          T(l, "Con lunghezze positive i nodi diventano permanenti in ordine di distanza: ordine " + M(seq(g.ordine)) + ", distanze " + M(vec(g.d)) + ". Un'etichetta può migliorare più volte prima di diventare permanente; tenere la prima etichetta trovata, o usare $d_{ij}$ al posto di $d(i)+d_{ij}$ (come in Prim), dà risultati sbagliati.",
            "With positive lengths the nodes become permanent in order of distance: order " + M(seq(g.ordine)) + ", distances " + M(vec(g.d)) + ". A label can improve several times before becoming permanent; keeping the first label found, or using $d_{ij}$ instead of $d(i)+d_{ij}$ (as in Prim), gives wrong results."),
          { n: n, A: A });
      });
    }
  });

  // ------------------------------------------------------------------ 31. flusso di costo minimo con un limite inferiore
  // A: [i,j,c,l,u]; b bilanci; opzioni: senzaIndietro (niente archi all'indietro nella rete residua)
  function mcfSSP(n, A, b, senzaIndietro) {
    var bp = b.slice();
    A.forEach(function (a) { bp[a[0] - 1] -= a[3]; bp[a[1] - 1] += a[3]; });
    var E = A.map(function (a) { return [a[0], a[1], a[2], a[4] - a[3]]; }), D = 0;
    for (var i = 1; i <= n; i++) {
      if (bp[i - 1] > 0) { E.push([0, i, 0, bp[i - 1]]); D += bp[i - 1]; }
      if (bp[i - 1] < 0) E.push([i, n + 1, 0, -bp[i - 1]]);
    }
    var x = E.map(function () { return 0; }), tot = 0, guard = 0;
    while (tot < D && guard++ < 100) {
      var R = [];
      E.forEach(function (e, k) {
        if (x[k] < e[3]) R.push([e[0], e[1], e[2], e[3] - x[k], k, 1]);
        if (x[k] > 0 && !senzaIndietro) R.push([e[1], e[0], -e[2], x[k], k, -1]);
      });
      var d = {}, pr = {}; for (i = 0; i <= n + 1; i++) d[i] = INF; d[0] = 0;
      for (var it = 0; it <= n + 2; it++) R.forEach(function (r) { if (d[r[0]] + r[2] < d[r[1]]) { d[r[1]] = d[r[0]] + r[2]; pr[r[1]] = r; } });
      if (d[n + 1] === INF) return null;
      var P = [], w = n + 1; while (w !== 0) { P.push(pr[w]); w = pr[w][0]; }
      var dl = Math.min.apply(null, P.map(function (r) { return r[3]; }));
      dl = Math.min(dl, D - tot);
      P.forEach(function (r) { x[r[4]] += r[5] * dl; });
      tot += dl;
    }
    if (tot < D) return null;
    var c = 0; A.forEach(function (a, k) { c += a[2] * (x[k] + a[3]); });
    return c;
  }
  GEN.push({
    id: "no-g-mcf-lower-bound", livello: "media", capitolo: "network-flow-models",
    link: link("flows/network-flow-models/removing-the-lower-bounds/", "flussi/network-flow-models/rimozione-dei-limiti-inferiori/", "box-12-nf-prop-subst"),
    genera: function (rng, l) {
      return riprova(function () {
        var n = 5, arcs = digrafo(rng, n, 7, { noOpposti: true }), k = ri(rng, 3, 6);
        var A = arcs.map(function (a) { var u = ri(rng, 2, 6); return [a[0], a[1], ri(rng, 1, 9), 0, u]; });
        var q = ri(rng, 0, A.length - 1); A[q][3] = ri(rng, 1, Math.min(2, A[q][4] - 1));
        var b = [k, 0, 0, 0, -k];
        var opt = mcfSSP(n, A, b, false);
        if (opt === null) return null;
        var A0 = A.map(function (a) { return [a[0], a[1], a[2], 0, a[4]]; });
        var senzaL = mcfSSP(n, A0, b, false);
        var cl = A[q][2] * A[q][3];
        var gol = mcfSSP(n, A, b, true);
        if (senzaL === null || senzaL === opt) return null;
        var sc = scegli(rng, opt, [senzaL, opt - cl, gol, opt + cl]);
        if (!sc) return null;
        return pacchetto(sc, function (v) { return M(v); },
          T(l, "Una rete con nodi $1,\\dots,5$ ha bilanci $\\vet{b}=" + vec(b) + "$ (flusso uscente meno entrante) e gli archi, con costo $c$, limite inferiore $l$ e capacità $u$: ",
            "A network with nodes $1,\\dots,5$ has balances $\\vet{b}=" + vec(b) + "$ (outflow minus inflow) and the arcs, with cost $c$, lower bound $l$ and capacity $u$: ") +
          A.map(function (a) { return M(arc(a) + ":\\ c=" + a[2] + ",\\ l=" + a[3] + ",\\ u=" + a[4]); }).join("; ") +
          T(l, ". Quanto vale il costo minimo $\\sum c_{ij}x_{ij}$ di un flusso ammissibile ($l_{ij} \\le x_{ij} \\le u_{ij}$ e conservazione in ogni nodo)?",
            ". What is the minimum cost $\\sum c_{ij}x_{ij}$ of a feasible flow ($l_{ij} \\le x_{ij} \\le u_{ij}$ and conservation at every node)?"),
          T(l, "Con $\\vet{x}=\\vet{l}+\\vet{x}'$ l'arco " + M(arc(A[q])) + " parte con $" + A[q][3] + "$ unità (costo fisso $\\vet{c}'\\vet{l}=" + cl + "$) e i bilanci diventano $\\vet{b}-\\mat{B}\\vet{l}$; il problema senza limiti inferiori costa $" + (opt - cl) + "$, quindi l'ottimo è $" + opt + "$. Ignorare il limite inferiore dà $" + senzaL + "$; mandare flusso solo lungo archi in avanti, senza correzioni, può non essere ottimo.",
            "With $\\vet{x}=\\vet{l}+\\vet{x}'$ the arc " + M(arc(A[q])) + " starts with $" + A[q][3] + "$ units (fixed cost $\\vet{c}'\\vet{l}=" + cl + "$) and the balances become $\\vet{b}-\\mat{B}\\vet{l}$; the problem without lower bounds costs $" + (opt - cl) + "$, so the optimum is $" + opt + "$. Ignoring the lower bound gives $" + senzaL + "$; sending flow only along forward arcs, without corrections, may not be optimal."),
          { n: n, A: A, b: b });
      });
    }
  });
})();
