---
title: "Ricerca su grafi"
---

# 1.6 Ricerca su grafi

<div class="info-capitolo" markdown>

**Parte 1 · Grafi · Capitolo 1** · [:material-book-open-variant: Capitolo 1: Grafi](index.md) · [:material-file-pdf-box: Dispensa, volume 1 (PDF)](../../pdf/dispensa-1-grafi.pdf) · [:material-pencil: Esercizi: Grafi](../../esercizi/graphs.md) · [:material-gesture-tap: App: Ricerca su grafo: BFS e DFS](../../laboratorio/ricerca-bfs-dfs.md)

</div>

<a id="sez-sec-gr-search"></a>
<a id="box-32-gr-def-search"></a>

!!! definizione "Definizione 1.24: ricerca grafo"

    Dato un grafo diretto $G=(N,A)$ e un nodo $s \in N$, <strong>source</strong>, una <strong>graph search</strong> trova l'insieme $R(s)$ dei nodi raggiungibili da $s$. Durante la ricerca:

    - un nodo è <strong>etichettato</strong> quando la ricerca lo raggiunge e rimane etichettato;

    - ogni nodo etichettato $j \neq s$ registra il suo <strong>predecessore</strong> $\mathit{pred}(j)$, il nodo da cui è stato raggiunto;

    - i nodi etichettati ancora da elaborare vengono mantenuti in una lista, $\mathit{LIST}$;

    - un arco $(i,j)$ è <strong>ammissibile</strong> se $i$ è etichettato e $j$ non lo è.

!!! algoritmo "Algoritmo: Ricerca generica nel grafo"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> un grafo diretto <span class="arithmatex">\(G=(N,A)\)</span> dato dalle sue liste di adiacenza, una fonte <span class="arithmatex">\(s \in N\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> i nodi etichettati, uguali a <span class="arithmatex">\(R(s)\)</span>, e i predecessori <span class="arithmatex">\(\mathit{pred}(j)\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Passaggio 0 (inizializzazione).</strong> Etichetta <span class="arithmatex">\(s\)</span> e imposta <span class="arithmatex">\(\mathit{LIST}:=\{s\}\)</span>; tutti gli altri nodi non sono etichettati.</div><div class="pc" style="--liv:0"><span class="pc-n">2</span><strong>Passaggio 1 (selezione).</strong> Se <span class="arithmatex">\(\mathit{LIST}=\emptyset\)</span>, <code>STOP</code>. Altrimenti seleziona un nodo <span class="arithmatex">\(i \in \mathit{LIST}\)</span>:</div><div class="pc" style="--liv:0"><span class="pc-n">3</span>  il nodo <em>primo</em> di <span class="arithmatex">\(\mathit{LIST}\)</span> nella ricerca in ampiezza (BFS),</div><div class="pc" style="--liv:0"><span class="pc-n">4</span>  il nodo <em>ultimo</em> di <span class="arithmatex">\(\mathit{LIST}\)</span> nella ricerca approfondita (DFS).</div><div class="pc" style="--liv:0"><span class="pc-n">5</span><strong>Passaggio 2 (etichettatura).</strong> Se <span class="arithmatex">\(i\)</span> ha un arco ammissibile <span class="arithmatex">\((i,j)\)</span>, prendi il primo in <span class="arithmatex">\(L(i)\)</span>:</div><div class="pc" style="--liv:0"><span class="pc-n">6</span>  etichetta <span class="arithmatex">\(j\)</span>, imposta <span class="arithmatex">\(\mathit{pred}(j):=i\)</span> e aggiungi <span class="arithmatex">\(j\)</span> alla fine di <span class="arithmatex">\(\mathit{LIST}\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">7</span>  Altrimenti rimuovere <span class="arithmatex">\(i\)</span> da <span class="arithmatex">\(\mathit{LIST}\)</span>. Vai al passaggio 1.</div></div>

- Nel BFS la lista $\mathit{LIST}$ è una <strong>queue</strong> (first in, first out): i nodi vengono elaborati nell'ordine in cui sono etichettati.

- Nel DFS la lista $\mathit{LIST}$ è un <strong>stack</strong> (last in, first out): la ricerca parte sempre dal più nodo recentemente etichettato ancora in $\mathit{LIST}$ e torna indietro solo quando quel nodo non ha archi ammissibili.

- L'ordine degli elenchi di adiacenza decide quale arco ammissibile viene preso per primo; con elenchi ordinati in ordine crescente indice, come in questo modulo, il risultato è unico.

### 1.6.1 L'albero predecessore

<a id="box-33-gr-prop-predtree"></a>

!!! teorema "Proposizione 1.25: albero predecessore"

    Ad ogni iterazione, gli archi $(\mathit{pred}(j),j)$, per i nodi etichettati $j \neq s$, formano un albero sui nodi etichettati, <strong>albero predecessore</strong>. Per ogni nodo etichettato $j$ contiene un percorso diretto da $s$ a $j$.

??? dimostrazione "Dimostrazione"

    Sia $r$ il numero di nodi etichettati.

    1. Ogni nodo etichettato $j \neq s$ ha un predecessore, etichettato prima di $j$. A partire da $j$ e passando a predecessore, i nodi sono etichettati sempre prima, quindi la sequenza termina con $s$.

    2. Letto al contrario, è un percorso diretto da $s$ a $j$ lungo gli archi $(\mathit{pred}(h),h)$.

    3. Quindi gli archi $r-1$ collegano i nodi etichettati $r$ e formano un albero per <span style="color:#1971c2">[Teorema 1.17](alberi-e-foreste.md#box-23-gr-th-tree)</span>(b). <span class="qed">□</span>

<a id="box-34-gr-th-search"></a>

!!! teorema "Teorema 1.26: correttezza della ricerca"

    Al termine della ricerca generica, BFS e DFS inclusi, i nodi etichettati sono esattamente i nodi di $R(s)$.

??? dimostrazione "Dimostrazione"

    Ogni nodo etichettato è raggiungibile da $s$, da <span style="color:#1971c2">[Proposizione 1.25](#box-33-gr-prop-predtree)</span>. Viceversa, lasciamo $j \in R(s)$ e lascia che $s=i_0,i_1,\dots,i_k=j$ sia un percorso diretto; presupponiamo per assurdo che $j$ non sia etichettato.

    1. Sia $i_t$ il primo nodo senza etichetta del percorso; $t \ge 1$, poiché $s$ è etichettato.

    2. Il nodo $i_{t-1}$ è etichettato, quindi è entrato in $\mathit{LIST}$, e alla fine lo ha lasciato.

    3. Un nodo esce da $\mathit{LIST}$ solo quando non ha arco ammissibile. Ma $(i_{t-1},i_t)$ è ammissibile fino alla fine, perché le etichette non si tolgono mai: un controsenso. <span class="qed">□</span>

<a id="box-35-gr-th-time"></a>

!!! teorema "Teorema 1.27: tempo di esecuzione della ricerca"

    Con gli elenchi di adiacenza, la ricerca generica viene eseguita nel tempo $O(|N|+|A|)$.

??? dimostrazione "Dimostrazione"

    Ogni nodo mantiene un puntatore alla posizione corrente nella sua lista $L(i)$; il puntatore si sposta in avanti oltre l'etica successori e non torna mai indietro, poiché le etichette non vengono mai rimosse.

    - Ogni iterazione etichetta un nodo o rimuove un nodo da $\mathit{LIST}$. Ogni nodo viene etichettato al massimo una volta e rimosso a più una volta, quindi ci sono al massimo $2n$ iterazioni, ciascuna con $O(1)$ che funziona oltre al puntatore.

    - Il puntatore del nodo $i$ si sposta al massimo $\deg^+(i)$ volte in totale e $\sum_{i \in N} \deg^+(i)=m$.

    Il tempo totale è $O(n+m)=O(|N|+|A|)$. <span class="qed">□</span>

- Con la matrice di adiacenza i successori di un nodo si trovano scansionando una riga di lunghezza $n$, e la ricerca richiede tempo $O(n^2)$.

### 1.6.2 La visita in ampiezza sul grafo di riferimento

<a id="box-36-gr-ex-bfs"></a>

!!! esempio "Esempio 1.9: BFS dal nodo $1$"

    Eseguiamo il BFS sul grafo di riferimento da $s=1$, con gli elenchi di adiacenza di <span style="color:#1971c2">[Esempio 1.5](rappresentazioni-di-un-grafo.md#box-14-gr-ex-lists)</span>. Ogni riga rappresenta un'iterazione e dopo di essa viene visualizzato $\mathit{LIST}$:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>iterazione e <span class="arithmatex">\(i\)</span> selezionato e azione</th>
    <th><span class="arithmatex">\(\mathit{LIST}\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td>etichetta <span class="arithmatex">\(2\)</span>, <span class="arithmatex">\(\mathit{pred}(2)=1\)</span></td>
    <td><span class="arithmatex">\(1,2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td>etichetta <span class="arithmatex">\(3\)</span>, <span class="arithmatex">\(\mathit{pred}(3)=1\)</span></td>
    <td><span class="arithmatex">\(1,2,3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td>rimuovi <span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(2,3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td>etichetta <span class="arithmatex">\(4\)</span>, <span class="arithmatex">\(\mathit{pred}(4)=2\)</span></td>
    <td><span class="arithmatex">\(2,3,4\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td>rimuovi <span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3,4\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td>etichetta <span class="arithmatex">\(5\)</span>, <span class="arithmatex">\(\mathit{pred}(5)=3\)</span> (<span class="arithmatex">\(2\)</span> è etichettato)</td>
    <td><span class="arithmatex">\(3,4,5\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td>rimuovi <span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(4,5\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(8\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td>etichetta <span class="arithmatex">\(6\)</span>, <span class="arithmatex">\(\mathit{pred}(6)=4\)</span> (<span class="arithmatex">\(3\)</span> è etichettato)</td>
    <td><span class="arithmatex">\(4,5,6\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(9\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td>rimuovi <span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(5,6\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td>rimuovi <span class="arithmatex">\(5\)</span> (<span class="arithmatex">\(4\)</span> e <span class="arithmatex">\(6\)</span> sono etichettati)</td>
    <td><span class="arithmatex">\(6\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(11\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td>rimuovi <span class="arithmatex">\(6\)</span></td>
    <td>(vuoto)</td>
    </tr>
    </table></div>

    L'ordine di etichettatura è $1,2,3,4,5,6$: ogni nodo è raggiungibile da $1$. L'albero precedente ha gli archi $(1,2)$, $(1,3)$, $(2,4)$, $(3,5)$, $(4,6)$; è lo albero ricoprente di <span style="color:#1971c2">[Esempio 1.7](alberi-e-foreste.md#box-26-gr-ex-tree)</span>. Accanto a ciascuno nodo, in figura è riportato il numero $d(j)$ di archi del percorso dell'albero da $1$ a $j$.

    ![Figura 6](../../img/graphs/fig06.svg){ .fig loading=lazy  }

<a id="box-37-gr-prop-bfs"></a>

!!! teorema "Proposizione 1.28: BFS trova i percorsi più brevi in numero di archi"

    Nell'albero precedente del BFS, lasciare $d(s)=0$ e $d(j)=d(\mathit{pred}(j))+1$ per ogni $j \neq s$ etichettato. Quindi, per ogni $j \in R(s)$, $d(j)$ è il numero minimo di archi di un percorso diretto da $s$ a $j$.

??? dimostrazione "Dimostrazione"

    Dimostriamo tre fatti.

    1. <em>Se $\mathit{LIST}=u_1,u_2,\dots,u_r$, allora $d(u_1) \le d(u_2) \le \dots \le d(u_r) \le d(u_1)+1$.</em> Vale a Passaggio 0. Un nuovo nodo $j$ viene etichettato da $u_1$ e aggiunto con $d(j)=d(u_1)+1$; rimuovendo $u_1$ si mantiene la proprietà, perché $d(u_r) \le d(u_1)+1 \le d(u_2)+1$.

    2. <em>I nodi sono etichettati in ordine non decrescente di $d$.</em> Ogni nuovo nodo ha $d(j)=d(u_1)+1 \ge d(u_r)$, e $u_r$ è l'ultimo nodo etichettato prima di $j$.

    3. <em>Per ogni arco $(i,j)$ con $i$ etichettato, $d(j) \le d(i)+1$.</em> Se $j$ è etichettato dopo $i$, allora $j$ è etichettato prima che $i$ lasci $\mathit{LIST}$, da un nodo $u$ nella parte anteriore di $\mathit{LIST}$, etichettato non più tardi di $i$: $d(j)=d(u)+1 \le d(i)+1$. If $j$ is labelled before $i$, then $d(j) \le d(i)$ di fatto 2.

    Sia $s=i_0,i_1,\dots,i_k=j$ un percorso diretto con il numero minimo $k$ di archi. I suoi nodi sono etichettati (<span style="color:#1971c2">[Teorema 1.26](#box-34-gr-th-search)</span>), e di fatto 3, $d(j) \le d(i_{k-1})+1 \le \dots \le d(s)+k=k$. L'albero il percorso da $s$ a $j$ è un percorso diretto con archi $d(j)$, quindi $d(j) \ge k$. <span class="qed">□</span>

- In <span style="color:#1971c2">[Esempio 1.9](#box-36-gr-ex-bfs)</span>, i valori $d=(0,1,1,2,2,3)$ sono il numero minimo di archi dal nodo $1$: ad esempio, i percorsi diretti più brevi al nodo $6$ hanno archi $3$, come $1,2,4,6$.

### 1.6.3 La ricerca approfondita sul grafo di riferimento

<a id="box-38-gr-ex-dfs"></a>

!!! esempio "Esempio 1.10: DFS dal nodo $1$"

    Eseguiamo il DFS sul grafo di riferimento da $s=1$: il nodo selezionato è sempre l'ultimo di $\mathit{LIST}$.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>iterazione e <span class="arithmatex">\(i\)</span> selezionato e azione</th>
    <th><span class="arithmatex">\(\mathit{LIST}\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td>etichetta <span class="arithmatex">\(2\)</span>, <span class="arithmatex">\(\mathit{pred}(2)=1\)</span></td>
    <td><span class="arithmatex">\(1,2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td>etichetta <span class="arithmatex">\(4\)</span>, <span class="arithmatex">\(\mathit{pred}(4)=2\)</span></td>
    <td><span class="arithmatex">\(1,2,4\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td>etichetta <span class="arithmatex">\(3\)</span>, <span class="arithmatex">\(\mathit{pred}(3)=4\)</span></td>
    <td><span class="arithmatex">\(1,2,4,3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td>etichetta <span class="arithmatex">\(5\)</span>, <span class="arithmatex">\(\mathit{pred}(5)=3\)</span> (<span class="arithmatex">\(2\)</span> è etichettato)</td>
    <td><span class="arithmatex">\(1,2,4,3,5\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td>etichetta <span class="arithmatex">\(6\)</span>, <span class="arithmatex">\(\mathit{pred}(6)=5\)</span> (<span class="arithmatex">\(4\)</span> è etichettato)</td>
    <td><span class="arithmatex">\(1,2,4,3,5,6\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td>rimuovi <span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(1,2,4,3,5\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td>rimuovi <span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(1,2,4,3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(8\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td>rimuovi <span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(1,2,4\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(9\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td>rimuovi <span class="arithmatex">\(4\)</span> (<span class="arithmatex">\(3\)</span> e <span class="arithmatex">\(6\)</span> sono etichettati)</td>
    <td><span class="arithmatex">\(1,2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td>rimuovi <span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(11\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td>rimuovi <span class="arithmatex">\(1\)</span> (<span class="arithmatex">\(2\)</span> e <span class="arithmatex">\(3\)</span> sono etichettati)</td>
    <td>(vuoto)</td>
    </tr>
    </table></div>

    L'ordine di etichettatura è $1,2,4,3,5,6$ e l'albero precedente ha gli archi $(1,2)$, $(2,4)$, $(4,3)$, $(3,5)$, $(5,6)$: un unico percorso diretto. Accanto a ciascun nodo, la figura mostra la sua posizione $o(j)$ nell'ordine di etichettatura.

    ![Figura 7](../../img/graphs/fig07.svg){ .fig loading=lazy  }

- Entrambe le ricerche etichettano tutti i nodi, come garantisce <span style="color:#1971c2">[Teorema 1.26](#box-34-gr-th-search)</span>, ma i loro alberi differire. L'albero DFS raggiunge il nodo $6$ con archi $5$, mentre l'albero BFS utilizza $3$.

### 1.6.4 Utilizzo della ricerca

- <strong>Componenti connessi.</strong> In un grafo non orientato, una ricerca da un vertice senza etichetta ne etichetta l'intero componente; ripetendolo da ogni vertice ancora non etichettato si trovano tutti i componenti in tempo $O(n+m)$.

- <strong>Componenti fortemente connessi.</strong> Una ricerca in $G$ e una nel grafo invertito $G'$ restituiscono $R(i)$ e $R'(i)$, quindi $S(i)=R(i) \cap R'(i)$; ripeterlo per un nodo di ogni componente ancora sconosciuto richiede $O(n(n+m))$ ora.

- <strong>Spanning tree.</strong> Su un grafo connesso non orientato, l'albero predecessore di una ricerca da qualsiasi vertice è un albero di copertura.

!!! chiave ""

    Una ricerca sul grafo etichetta esattamente i nodi raggiungibili dalla sorgente, in tempo $O(|N|+|A|)$, e i suoi predecessori formano un albero. Il BFS (una coda) fornisce percorsi con il numero minimo di archi; il DFS (uno stack) va prima in profondità.

## 1.7 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Scambio dei segni della matrice di incidenza.</strong> La voce è $+1$ in coda e $-1$ in testa: il la colonna di $(4,3)$ ha $+1$ nella riga $4$.

    - <strong>Chiamare una passeggiata un percorso.</strong> Un percorso ha vertici distinti; una passeggiata può ripeterli e contiene sempre a percorso con gli stessi punti finali.

    - <strong>Confusione tra connettività debole e forte.</strong> Il grafo di riferimento è debolmente connesso, ma ha tre componenti fortemente connessi.

    - <strong>Conteggio solo degli lati.</strong> Un grafo con lati $n-1$ non deve essere un albero: deve anche essere connesso, oppure aciclico.

    - <strong>Credere che la matrice di incidenza abbia rango di riga completo.</strong> Il suo rango è $|N|-k$: in un grafo connesso uno la riga è sempre ridondante.

    - <strong>Percorsi più brevi previsti dal DFS.</strong> Solo l'albero BFS fornisce il numero minimo di archi e solo quando ogni arco conta uno.

    - <strong>Dimenticare l'ordine degli elenchi.</strong> L'ordine di etichettatura e l'albero precedente dipendono dall'ordine in cui vengono scansionati i successori.

## 1.8 In sintesi

!!! chiave "In sintesi"

    - Un grafo non orientato $G=(V,E)$ ha archi $\{u,v\}$, un grafo diretto $G=(N,A)$ ha archi $(i,j)$; i gradi sommare a $2m$, i gradi in uscita e in entrata a $m$.

    - Le liste di adiacenza necessitano di spazio $n+m$; la matrice di incidenza nodo-arco ha $+1$ in coda e $-1$ in testa, e la riga $i$ di $\mat{B}\vet{x}$ è il deflusso meno l'afflusso del nodo $i$.

    - Le componenti connesse e fortemente connesse sono classi di equivalenza; $S(i)=R(i) \cap R'(i)$.

    - Un albero è connesso e aciclico, con lati $n-1$ e un percorso unico tra ogni due vertici; un lato esterno uno albero ricoprente chiude un ciclo fondamentale.

    - $\rank(\mat{B})=|N|-k$, e in un grafo connesso le basi di $\mat{B}$ sono gli albero ricoprente.

    - La ricerca generica trova $R(s)$ nel tempo $O(|N|+|A|)$; il BFS fornisce il numero minimo di archi.

    <strong>Il grafo di riferimento in sintesi.</strong>

    <div class="tabella" markdown="0"><table>
    <tr>
    <td>nodi e archi</td>
    <td><span class="arithmatex">\(n=6\)</span>, <span class="arithmatex">\(m=9\)</span></td>
    </tr>
    <tr>
    <td>componenti collegati</td>
    <td><span class="arithmatex">\(1\)</span></td>
    </tr>
    <tr>
    <td>componenti fortemente collegati</td>
    <td><span class="arithmatex">\(\{1\}\)</span>, <span class="arithmatex">\(\{2,3,4,5\}\)</span>, <span class="arithmatex">\(\{6\}\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\rank(\mat{B})\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    </tr>
    <tr>
    <td>BFS da <span class="arithmatex">\(1\)</span> e ordina <span class="arithmatex">\(1,2,3,4,5,6\)</span>; <span class="arithmatex">\(d=(0,1,1,2,2,3)\)</span></td>
    </tr>
    <tr>
    <td>DFS da <span class="arithmatex">\(1\)</span> e ordina <span class="arithmatex">\(1,2,4,3,5,6\)</span></td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Grafi](../../esercizi/graphs.md)
