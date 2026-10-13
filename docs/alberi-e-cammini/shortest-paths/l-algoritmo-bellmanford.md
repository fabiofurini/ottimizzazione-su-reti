---
title: "L'algoritmo Bellman–Ford"
---

# 3.5 L'algoritmo Bellman–Ford { #sez-sec-sp-bf }

<div class="info-capitolo" markdown>

**Parte 2 · Alberi e cammini · Capitolo 3** · [:material-book-open-variant: Capitolo 3: Cammini minimi](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-alberi-e-cammini.pdf) · [:material-pencil: Esercizi: Cammini minimi](../../esercizi/shortest-paths.md) · [:material-gesture-tap: App: Cammini minimi: Dijkstra, Bellman–Ford, grafi aciclici](../../laboratorio/cammini-minimi-dijkstra-bellman-ford.md)

</div>

<a id="box-22-sp-def-dk"></a>

!!! definizione "Definizione 3.16: etichette con al massimo $k$ archi"

    Per $k \ge 0$ e $j \in N$, $d^k(j)$ è la lunghezza minima di un percorso da $s$ a $j$ con al massimo $k$ archi e $d^k(j)=+\infty$ se non ce n'è.

<a id="box-23-sp-lem-recursion"></a>

!!! teorema "Lemma 3.17: ricorsione delle etichette"

    $d^0(s)=0$, $d^0(j)=+\infty$ per $j \neq s$ e per ogni $k \ge 1$

    $$
    d^k(j)=\min\Big\{\, d^{k-1}(j),\; \min_{(i,j) \in \delta^-(j)} \big( d^{k-1}(i)+d_{ij} \big) \Big\},
    \qquad \forall j \in N .
    $$

??? dimostrazione "Dimostrazione"

    L'unica cammino con archi $0$ è la cammino $s$. Per $k \ge 1$, una cammino verso $j$ con al massimo archi $k$ ha al massimo Archi $k-1$, con lunghezza minima $d^{k-1}(j)$, oppure ha esattamente archi $k$ e ultimo arco $(i,j)$: è una passeggiata fino a $i$ con $k-1$ archi seguiti da $(i,j)$ e la sua lunghezza minima è $\min_{(i,j)}\big(d^{k-1}(i)+d_{ij}\big)$. <span class="qed">□</span>

!!! algoritmo "Algoritmo: Algoritmo Bellman–Ford"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> un grafo diretto <span class="arithmatex">\(G=(N,A)\)</span> con lunghezze <span class="arithmatex">\(d_{ij}\)</span> di qualsiasi segno, una sorgente <span class="arithmatex">\(s \in N\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> le distanze <span class="arithmatex">\(\tilde{d}(j)\)</span> e i predecessori, oppure un ciclo negativo raggiungibile da <span class="arithmatex">\(s\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Passaggio 0 (inizializzazione).</strong> Imposta <span class="arithmatex">\(d^0(s):=0\)</span>, <span class="arithmatex">\(d^0(j):=+\infty\)</span> per <span class="arithmatex">\(j \neq s\)</span> e <span class="arithmatex">\(k:=1\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">2</span><strong>Passaggio 1 (passa <span class="arithmatex">\(k\)</span>).</strong> Calcola <span class="arithmatex">\(d^k(j)\)</span> per ogni <span class="arithmatex">\(j \in N\)</span> con la ricorsione di
    <span style="color:#1971c2">[Lemma 3.17](#box-23-sp-lem-recursion)</span>;</div><div class="pc" style="--liv:0"><span class="pc-n">3</span>  se <span class="arithmatex">\(d^k(j)<d^{k-1}(j)\)</span>, imposta <span class="arithmatex">\(\mathit{pred}(j)\)</span> alla coda <span class="arithmatex">\(i\)</span> dell'arco che raggiunge il minimo.</div><div class="pc" style="--liv:0"><span class="pc-n">4</span><strong>Passaggio 2 (test).</strong> Se <span class="arithmatex">\(d^k=d^{k-1}\)</span>, <code>STOP</code>: <span class="arithmatex">\(\tilde{d}=d^k\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">5</span>  Se <span class="arithmatex">\(k=n\)</span>, <code>STOP</code>: un ciclo negativo è raggiungibile da <span class="arithmatex">\(s\)</span>. Altrimenti imposta <span class="arithmatex">\(k:=k+1\)</span> e vai al passo 1.</div></div>

- Ogni passaggio dipende solo dalle etichette del passaggio precedente: se $d^k=d^{k-1}$, tutti i passaggi successivi si ripetono le stesse etichette e l'algoritmo può fermarsi.

- Negli esempi, i pari merito nel minimo vengono interrotti dalla coda più piccola $i$ e il predecessore cambia solo quando l'etichetta diminuisce rigorosamente.

<a id="box-24-sp-th-bf"></a>

!!! teorema "Teorema 3.18: correttezza di Bellman–Ford"

    Se non è raggiungibile alcun ciclo negativo da $s$, allora $d^{n-1}(j)=\tilde{d}(j)$ per ogni $j \in N$ e l'algoritmo si ferma al passaggio $k \le n$ con $d^k=d^{k-1}=\tilde{d}$.

??? dimostrazione "Dimostrazione"

    Un percorso ha al massimo $n-1$ archi, quindi $d^{n-1}(j) \le \tilde{d}(j)$. Di <span style="color:#1971c2">[Lemma 3.3](problemi-del-percorso-piu-breve.md#box-4-sp-lem-walk)</span> (che necessita solo dei cicli raggiungibili da $s$) ogni cammino da $s$ a $j$ contiene un percorso non più lungo, quindi $d^k(j) \ge \tilde{d}(j)$ per ogni $k$.

    - Quindi $d^{n-1}=d^{n}=\tilde{d}$.

    - Le etichette non aumentano mai e l'algoritmo si ferma al primo passaggio $k$ con $d^k=d^{k-1}$, che è al massimo $n$; da quel passaggio in poi le etichette non cambiano più, quindi $d^k=d^{n-1}=\tilde{d}$.

    <p class="qed-riga"><span class="qed">□</span></p>

<a id="box-25-sp-th-bf-cycle"></a>

!!! teorema "Teorema 3.19: rilevamento di un ciclo negativo"

    Un ciclo negativo è raggiungibile da $s$ se e solo se $d^n \neq d^{n-1}$. In tal caso, lascia che $d^n(j)<d^{n-1}(j)$; leggendo i predecessori all'indietro da $j$, una riga per passaggio, partendo dalla riga $n$ della tabella, dà una passeggiata da $s$ a $j$ con archi $n$ che contengono un ciclo negativo.

??? dimostrazione "Dimostrazione"

    Se non è possibile raggiungere alcun ciclo negativo da $s$, allora $d^n=d^{n-1}$ mediante <span style="color:#1971c2">[Teorema 3.18](#box-24-sp-th-bf)</span>. Al contrario, lascia che $d^n(j)<d^{n-1}(j)$.

    1. Ogni cammino verso $j$ di lunghezza $d^n(j)$ con al massimo $n$ archi ha esattamente $n$ archi, altrimenti $d^{n-1}(j) \le d^n(j)$.

    2. Lascia che $i$ sia il predecessore di $j$ nella riga $n$, quindi $d^n(j)=d^{n-1}(i)+d_{ij}$. Una passeggiata realizzando $d^{n-1}(i)$ seguito da $(i,j)$ realizza $d^n(j)$, quindi ha esattamente archi $n-1$: $d^{n-1}(i)<d^{n-2}(i)$, e $i$ ha un predecessore nella riga $n-1$.

    3. Ripetendo l'argomento fino alla riga $1$, il cui predecessore è $s$, si ottiene una passeggiata $W$ da $s$ a $j$ con $n$ archi e $d(W)=d^n(j)$.

    4. $W$ ha nodi $n+1$, quindi ripete un nodo e contiene un ciclo $C$. L'eliminazione di $C$ dà una passeggiata a $j$ con meno rispetto agli archi $n$, di lunghezza $d(W)-d(C) \ge d^{n-1}(j)>d^n(j)=d(W)$. Pertanto $d(C)<0$ e $C$ sono raggiungibili da $s$ lungo $W$. <span class="qed">□</span>

<a id="box-26-sp-prop-bf-tree"></a>

!!! teorema "Proposizione 3.20: l'albero predecessore di Bellman–Ford"

    Se nessun ciclo negativo è raggiungibile da $s$, alla fermata gli archi $(\mathit{pred}(j),j)$, per i nodi $j \neq s$ con finito etichetta, forma un albero dei percorsi più brevi dei nodi raggiungibili.

??? dimostrazione "Dimostrazione"

    Sia $d=\tilde{d}$ l'etichetta finale, e sia $t(j)$ l'ultimo passaggio in cui l'etichetta di $j$ è diminuita; $t(s)=0$, da $d^k(s)=0$ per tutti gli $k$. Lascia che $p=\mathit{pred}(j)$.

    1. Nel passaggio $t(j)$, $d(j)=d^{t(j)-1}(p)+d_{pj} \ge d(p)+d_{pj}$, poiché le etichette non aumentano mai.

    2. Di <span style="color:#1971c2">[Teorema 3.5](problemi-del-percorso-piu-breve.md#box-7-sp-th-bellman)</span>, $d(j) \le d(p)+d_{pj}$. Quindi $d(j)=d(p)+d_{pj}$ e $d(p)=d^{t(j)-1}(p)$: l'etichetta di $p$ non è cambiata dopo il passaggio $t(j)-1$, quindi $t(p)<t(j)$.

    3. Passando al predecessore $t$ diminuisce rigorosamente, quindi la sequenza termina in $s$, lungo archi stretti: il percorso dell'albero da $s$ a $j$ ha lunghezza $d(j)$. <span class="qed">□</span>

<a id="box-27-sp-th-bf-time"></a>

!!! teorema "Teorema 3.21: tempo di esecuzione di Bellman–Ford"

    L'algoritmo Bellman–Ford viene eseguito nel tempo $O(n\,m)$.

??? dimostrazione "Dimostrazione"

    Un passaggio calcola $d^k(j)$ per ogni $j$ scansionando la stella all'indietro $\delta^-(j)$, quindi scansiona ogni arco una volta: $O(n+m)$ tempo. Sono disponibili al massimo $n$ passaggi e il totale è $O(n(n+m))$, che è $O(n\,m)$ quando $m \ge n-1$, come sotto (A1). <span class="qed">□</span>

## 3.5.1 Bellman–Ford sul grafo di riferimento

<a id="box-28-sp-ex-bf"></a>

!!! esempio "Esempio 3.7: Bellman–Ford con un arco negativo"

    Utilizziamo le lunghezze $d'$ di <span style="color:#1971c2">[Esempio 3.1](problemi-del-percorso-piu-breve.md#box-2-sp-ex-ref)</span> con $d'_{54}=-3$ al posto di $2$. I due cicli hanno lunghezze $7$ e $8-3+1=6$, quindi non esiste un ciclo negativo. Ogni riga è un passaggio $k$; accanto a un'etichetta diminuita, tra parentesi il nuovo predecessore:

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

    - In passaggio $3$, $d^3(4)=\min\{10,\; d^2(2)+3,\; d^2(5)-3\}=\min\{10,8,7\}=7$, con il predecessore $5$.

    - Passaggio $5$ ripete le etichette del passaggio $4$: l'algoritmo si ferma con $\tilde{d}=(0,5,2,7,10,12)$, dopo $5$ passaggi consentiti invece dello $n=6$.

    - L'albero del percorso più breve ha gli archi $(1,3)$, $(3,2)$, $(3,5)$, $(5,4)$, $(4,6)$ e il percorso più breve per $6$ è $1,3,5,4,6$, di lunghezza $2+8-3+5=12$.

    ![Figura 4](../../img/shortest-paths/fig04.svg){ .fig loading=lazy  }

<a id="box-29-sp-ex-bf-cycle"></a>

!!! esempio "Esempio 3.8: Bellman–Ford rileva un ciclo negativo"

    Con le lunghezze $d''$ di <span style="color:#1971c2">[Esempio 3.2](problemi-del-percorso-piu-breve.md#box-5-sp-ex-negcycle)</span> ($d''_{54}=-10$) l'algoritmo esegue tutti i $n=6$ passa:

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

    - Nel passaggio $6$ l'etichetta del nodo $4$ diminuisce da $0$ a $-1$: $d^6 \neq d^5$ e viene generato un ciclo negativo raggiungibile da $1$.

    - Lettura all'indietro dal nodo $4$ (voci in grassetto): la riga $6$ restituisce $\mathit{pred}=5$, la riga $5$ per il nodo $5$ restituisce $3$, la riga $4$ per il nodo $3$ restituisce $4$, quindi $5$, $3$, $1$. La passeggiata è

        $$
        1,\;3,\;5,\;4,\;3,\;5,\;4, \qquad\text{di lunghezza } 2+8-10+1+8-10=-1=d^6(4).
        $$

    - Nodo $3$ ripete: la passeggiata contiene il ciclo $3,5,4,3$, di lunghezza $-1$ (rosso).

    ![Figura 5](../../img/shortest-paths/fig05.svg){ .fig loading=lazy  }

!!! chiave ""

    L'algoritmo Bellman–Ford calcola $d^k$, i percorsi più brevi con al massimo archi $k$, nel tempo $O(n\,m)$. Senza cicli negativi raggiungibili da $s$ si ferma entro $n$ passa con le distanze; un cambiamento nel passaggio $n$ rivela a ciclo negativo, trovato leggendo i predecessori all’indietro.

---

**Avanti:** [3.6 Algoritmo di Dijkstra](algoritmo-di-dijkstra.md)
