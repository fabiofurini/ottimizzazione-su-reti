---
title: "L'algoritmo di Bellman–Ford"
---

# 3.5 L'algoritmo di Bellman–Ford { #sez-sec-sp-bf }

<div class="info-capitolo" markdown>

**Parte 2 · Alberi e cammini · Capitolo 3** · [:material-book-open-variant: Capitolo 3: Cammini minimi](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-alberi-e-cammini.pdf) · [:material-presentation: Slide](../../pdf/slide-shortest-paths.pdf) · [:material-pencil: Esercizi: Cammini minimi](../../esercizi/shortest-paths.md) · [:material-gesture-tap: App: Cammini minimi: Dijkstra, Bellman–Ford, grafi aciclici](../../laboratorio/cammini-minimi-dijkstra-bellman-ford.md)

</div>

<a id="box-22-sp-def-dk"></a>

!!! definizione "Definizione 3.16: etichette con al più $k$ archi"

    Per $k \ge 0$ e $j \in N$, $d^k(j)$ è la lunghezza minima di una passeggiata da $s$ a $j$ con al più $k$ archi, e $d^k(j)=+\infty$ se non ce n'è nessuna.

<a id="box-23-sp-lem-recursion"></a>

!!! teorema "Lemma 3.17: ricorsione delle etichette"

    $d^0(s)=0$, $d^0(j)=+\infty$ per $j \neq s$, e per ogni $k \ge 1$

    $$
    d^k(j)=\min\Big\{\, d^{k-1}(j),\; \min_{(i,j) \in \delta^-(j)} \big( d^{k-1}(i)+d_{ij} \big) \Big\},
    \qquad \forall j \in N .
    $$

??? dimostrazione "Dimostrazione"

    L'unica passeggiata con $0$ archi è la passeggiata $s$. Per $k \ge 1$, una passeggiata verso $j$ con al più $k$ archi ha al più $k-1$ archi, con lunghezza minima $d^{k-1}(j)$, oppure ha esattamente $k$ archi e ultimo arco $(i,j)$: è una passeggiata verso $i$ con $k-1$ archi seguita da $(i,j)$, e la sua lunghezza minima è $\min_{(i,j)}\big(d^{k-1}(i)+d_{ij}\big)$. <span class="qed">□</span>

!!! algoritmo "Algoritmo: Algoritmo di Bellman–Ford"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> un grafo orientato <span class="arithmatex">\(G=(N,A)\)</span> con lunghezze <span class="arithmatex">\(d_{ij}\)</span> di qualsiasi segno, una sorgente <span class="arithmatex">\(s \in N\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> le distanze <span class="arithmatex">\(\tilde{d}(j)\)</span> e i predecessori, oppure un ciclo negativo raggiungibile da <span class="arithmatex">\(s\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Passo 0 (inizializzazione).</strong> Porre <span class="arithmatex">\(d^0(s):=0\)</span>, <span class="arithmatex">\(d^0(j):=+\infty\)</span> per <span class="arithmatex">\(j \neq s\)</span>, e <span class="arithmatex">\(k:=1\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">2</span><strong>Passo 1 (passata <span class="arithmatex">\(k\)</span>).</strong> Calcolare <span class="arithmatex">\(d^k(j)\)</span> per ogni <span class="arithmatex">\(j \in N\)</span> con la ricorsione del
    <span style="color:#1971c2">[Lemma 3.17](#box-23-sp-lem-recursion)</span>;</div><div class="pc" style="--liv:0"><span class="pc-n">3</span>  se <span class="arithmatex">\(d^k(j)<d^{k-1}(j)\)</span>, porre <span class="arithmatex">\(\mathit{pred}(j)\)</span> uguale alla coda <span class="arithmatex">\(i\)</span> dell'arco che realizza il minimo.</div><div class="pc" style="--liv:0"><span class="pc-n">4</span><strong>Passo 2 (test).</strong> Se <span class="arithmatex">\(d^k=d^{k-1}\)</span>, <code>STOP</code>: <span class="arithmatex">\(\tilde{d}=d^k\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">5</span>  Se <span class="arithmatex">\(k=n\)</span>, <code>STOP</code>: un ciclo negativo è raggiungibile da <span class="arithmatex">\(s\)</span>. Altrimenti porre <span class="arithmatex">\(k:=k+1\)</span> e andare al Passo 1.</div></div>

- Ogni passata dipende solo dalle etichette della passata precedente: se $d^k=d^{k-1}$, tutte le passate successive ripetono le stesse etichette, e l'algoritmo può fermarsi.

- Negli esempi, i pareggi nel minimo si risolvono con la coda $i$ di indice minimo, e il predecessore cambia solo quando l'etichetta diminuisce strettamente.

<a id="box-24-sp-th-bf"></a>

!!! teorema "Teorema 3.18: correttezza di Bellman–Ford"

    Se nessun ciclo negativo è raggiungibile da $s$, allora $d^{n-1}(j)=\tilde{d}(j)$ per ogni $j \in N$, e l'algoritmo si ferma a una passata $k \le n$ con $d^k=d^{k-1}=\tilde{d}$.

??? dimostrazione "Dimostrazione"

    Un cammino ha al più $n-1$ archi, quindi $d^{n-1}(j) \le \tilde{d}(j)$. Per il <span style="color:#1971c2">[Lemma 3.3](problemi-di-cammino-minimo.md#box-4-sp-lem-walk)</span> (che richiede solo i cicli raggiungibili da $s$) ogni passeggiata da $s$ a $j$ contiene un cammino non più lungo, quindi $d^k(j) \ge \tilde{d}(j)$ per ogni $k$.

    - Quindi $d^{n-1}=d^{n}=\tilde{d}$.

    - Le etichette non aumentano mai, e l'algoritmo si ferma alla prima passata $k$ con $d^k=d^{k-1}$, che è al più $n$; da quella passata in poi le etichette non cambiano più, quindi $d^k=d^{n-1}=\tilde{d}$.

    <p class="qed-riga"><span class="qed">□</span></p>

<a id="box-25-sp-th-bf-cycle"></a>

!!! teorema "Teorema 3.19: rilevamento di un ciclo negativo"

    Un ciclo negativo è raggiungibile da $s$ se e solo se $d^n \neq d^{n-1}$. In tal caso, sia $d^n(j)<d^{n-1}(j)$; leggendo i predecessori all'indietro a partire da $j$, una riga per passata, partendo dalla riga $n$ della tabella, si ottiene una passeggiata da $s$ a $j$ con $n$ archi che contiene un ciclo negativo.

??? dimostrazione "Dimostrazione"

    Se nessun ciclo negativo è raggiungibile da $s$, allora $d^n=d^{n-1}$ per il <span style="color:#1971c2">[Teorema 3.18](#box-24-sp-th-bf)</span>. Viceversa, sia $d^n(j)<d^{n-1}(j)$.

    1. Ogni passeggiata verso $j$ di lunghezza $d^n(j)$ con al più $n$ archi ha esattamente $n$ archi, altrimenti $d^{n-1}(j) \le d^n(j)$.

    2. Sia $i$ il predecessore di $j$ nella riga $n$, quindi $d^n(j)=d^{n-1}(i)+d_{ij}$. Una passeggiata che realizza $d^{n-1}(i)$ seguita da $(i,j)$ realizza $d^n(j)$, quindi ha esattamente $n-1$ archi: $d^{n-1}(i)<d^{n-2}(i)$, e $i$ ha un predecessore nella riga $n-1$.

    3. Ripetendo il ragionamento fino alla riga $1$, il cui predecessore è $s$, si ottiene una passeggiata $W$ da $s$ a $j$ con $n$ archi e $d(W)=d^n(j)$.

    4. $W$ ha $n+1$ nodi, quindi ripete un nodo e contiene un ciclo $C$. Togliendo $C$ si ottiene una passeggiata verso $j$ con meno di $n$ archi, di lunghezza $d(W)-d(C) \ge d^{n-1}(j)>d^n(j)=d(W)$. Quindi $d(C)<0$, e $C$ è raggiungibile da $s$ lungo $W$. <span class="qed">□</span>

<a id="box-26-sp-prop-bf-tree"></a>

!!! teorema "Proposizione 3.20: l'albero dei predecessori di Bellman–Ford"

    Se nessun ciclo negativo è raggiungibile da $s$, all'arresto gli archi $(\mathit{pred}(j),j)$, per i nodi $j \neq s$ con etichetta finita, formano un albero dei cammini minimi dei nodi raggiungibili.

??? dimostrazione "Dimostrazione"

    Siano $d=\tilde{d}$ le etichette finali, e sia $t(j)$ l'ultima passata in cui l'etichetta di $j$ è diminuita; $t(s)=0$, perché $d^k(s)=0$ per ogni $k$. Sia $p=\mathit{pred}(j)$.

    1. Nella passata $t(j)$, $d(j)=d^{t(j)-1}(p)+d_{pj} \ge d(p)+d_{pj}$, perché le etichette non aumentano mai.

    2. Per il <span style="color:#1971c2">[Teorema 3.5](problemi-di-cammino-minimo.md#box-7-sp-th-bellman)</span>, $d(j) \le d(p)+d_{pj}$. Quindi $d(j)=d(p)+d_{pj}$ e $d(p)=d^{t(j)-1}(p)$: l'etichetta di $p$ non è cambiata dopo la passata $t(j)-1$, quindi $t(p)<t(j)$.

    3. Passando al predecessore, $t$ diminuisce strettamente, quindi la sequenza termina in $s$, lungo archi stretti: il cammino dell'albero da $s$ a $j$ ha lunghezza $d(j)$. <span class="qed">□</span>

<a id="box-27-sp-th-bf-time"></a>

!!! teorema "Teorema 3.21: tempo di esecuzione di Bellman–Ford"

    L'algoritmo di Bellman–Ford richiede tempo $O(n\,m)$.

??? dimostrazione "Dimostrazione"

    Una passata calcola $d^k(j)$ per ogni $j$ esaminando la stella entrante $\delta^-(j)$, quindi esamina ogni arco una volta: tempo $O(n+m)$. Le passate sono al più $n$, e il totale è $O(n(n+m))$, cioè $O(n\,m)$ quando $m \ge n-1$, come sotto (A1). <span class="qed">□</span>

## 3.5.1 Bellman–Ford sul grafo di riferimento

<a id="box-28-sp-ex-bf"></a>

!!! esempio "Esempio 3.7: Bellman–Ford con un arco negativo"

    Usiamo le lunghezze $d'$ dell'<span style="color:#1971c2">[Esempio 3.1](problemi-di-cammino-minimo.md#box-2-sp-ex-ref)</span> con $d'_{54}=-3$ al posto di $2$. I due cicli hanno lunghezze $7$ e $8-3+1=6$, quindi non c'è alcun ciclo negativo. Ogni riga è una passata $k$; accanto a un'etichetta che è diminuita, tra parentesi il nuovo predecessore:

    $$
    \begin{array}{c|cccccc}
    \hline {k} & {d^k(1)} & {d^k(2)} & {d^k(3)} & {d^k(4)} & {d^k(5)} & {d^k(6)} \\
    \hline {0} & {0} & {\infty} & {\infty} & {\infty} & {\infty} & {\infty} \\
    {1} & {0} & {7} ({1}) & {2} ({1}) & {\infty} & {\infty} & {\infty} \\
    {2} & {0} & {5} ({3}) & {2} & {10} ({2}) & {10} ({3}) & {\infty} \\
    {3} & {0} & {5} & {2} & {7} ({5}) & {10} & {15} ({4}) \\
    {4} & {0} & {5} & {2} & {7} & {10} & {12} ({4}) \\
    {5} & {0} & {5} & {2} & {7} & {10} & {12} \\
    \hline
    \end{array}
    $$

    - Nella passata $3$, $d^3(4)=\min\{10,\; d^2(2)+3,\; d^2(5)-3\}=\min\{10,8,7\}=7$, con predecessore $5$.

    - La passata $5$ ripete le etichette della passata $4$: l'algoritmo si ferma con $\tilde{d}=(0,5,2,7,10,12)$, dopo $5$ passate invece delle $n=6$ consentite.

    - L'albero dei cammini minimi ha gli archi $(1,3)$, $(3,2)$, $(3,5)$, $(5,4)$, $(4,6)$, e il cammino minimo verso $6$ è $1,3,5,4,6$, di lunghezza $2+8-3+5=12$.

    ![Figura 4](../../img/shortest-paths/fig04.svg){ .fig loading=lazy  }

<a id="box-29-sp-ex-bf-cycle"></a>

!!! esempio "Esempio 3.8: Bellman–Ford rileva un ciclo negativo"

    Con le lunghezze $d''$ dell'<span style="color:#1971c2">[Esempio 3.2](problemi-di-cammino-minimo.md#box-5-sp-ex-negcycle)</span> ($d''_{54}=-10$) l'algoritmo esegue tutte le $n=6$ passate:

    $$
    \begin{array}{c|cccccc}
    \hline {k} & {d^k(1)} & {d^k(2)} & {d^k(3)} & {d^k(4)} & {d^k(5)} & {d^k(6)} \\
    \hline {0} & {0} & {\infty} & {\infty} & {\infty} & {\infty} & {\infty} \\
    {1} & {0} & {7} ({1}) & {\mathbf{2}} ({\mathbf{1}}) & {\infty} & {\infty} & {\infty} \\
    {2} & {0} & {5} ({3}) & {2} & {10} ({2}) & {\mathbf{10}} ({\mathbf{3}}) & {\infty} \\
    {3} & {0} & {5} & {2} & {\mathbf{0}} ({\mathbf{5}}) & {10} & {15} ({4}) \\
    {4} & {0} & {5} & {\mathbf{1}} ({\mathbf{4}}) & {0} & {10} & {5} ({4}) \\
    {5} & {0} & {4} ({3}) & {1} & {0} & {\mathbf{9}} ({\mathbf{3}}) & {5} \\
    {6} & {0} & {4} & {1} & {\mathbf{-1}} ({\mathbf{5}}) & {9} & {5} \\
    \hline
    \end{array}
    $$

    - Nella passata $6$ l'etichetta del nodo $4$ scende da $0$ a $-1$: $d^6 \neq d^5$, e un ciclo negativo è raggiungibile da $1$.

    - Leggendo all'indietro a partire dal nodo $4$ (valori in grassetto): la riga $6$ dà $\mathit{pred}=5$, la riga $5$ per il nodo $5$ dà $3$, la riga $4$ per il nodo $3$ dà $4$, poi $5$, $3$, $1$. La passeggiata è

        $$
        1,\;3,\;5,\;4,\;3,\;5,\;4, \qquad\text{di lunghezza } 2+8-10+1+8-10=-1=d^6(4).
        $$

    - Il nodo $3$ si ripete: la passeggiata contiene il ciclo $3,5,4,3$, di lunghezza $-1$ (in rosso).

    ![Figura 5](../../img/shortest-paths/fig05.svg){ .fig loading=lazy  }

!!! chiave ""

    L'algoritmo di Bellman–Ford calcola $d^k$, le passeggiate minime con al più $k$ archi, in tempo $O(n\,m)$. Senza cicli negativi raggiungibili da $s$ si ferma entro $n$ passate con le distanze; un cambiamento nella passata $n$ rivela un ciclo negativo, che si trova leggendo i predecessori all'indietro.

---

**Avanti:** [3.6 L'algoritmo di Dijkstra](l-algoritmo-di-dijkstra.md)
