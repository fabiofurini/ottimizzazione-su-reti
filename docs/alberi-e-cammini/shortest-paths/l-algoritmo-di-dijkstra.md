---
title: "L'algoritmo di Dijkstra"
---

# 3.6 L'algoritmo di Dijkstra

<div class="info-capitolo" markdown>

**Parte 2 · Alberi e cammini · Capitolo 3** · [:material-book-open-variant: Capitolo 3: Cammini minimi](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-alberi-e-cammini.pdf) · [:material-presentation: Slide](../../pdf/slide-shortest-paths.pdf) · [:material-pencil: Esercizi: Cammini minimi](../../esercizi/shortest-paths.md) · [:material-gesture-tap: App: Cammini minimi: Dijkstra, Bellman–Ford, grafi aciclici](../../laboratorio/cammini-minimi-dijkstra-bellman-ford.md)

</div>

<a id="sez-sec-sp-dijkstra"></a>

- In questa sezione tutte le lunghezze sono non negative: $d_{ij} \ge 0$ per ogni arco. Allora ogni ciclo ha lunghezza $\ge 0$, e vale (A2).

- I nodi sono <strong>permanenti</strong>, quando la loro etichetta è definitiva, oppure <strong>temporanei</strong>. A ogni iterazione il nodo temporaneo con l'etichetta minima diventa permanente.

!!! algoritmo "Algoritmo: Algoritmo di Dijkstra"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> un grafo orientato <span class="arithmatex">\(G=(N,A)\)</span> con lunghezze <span class="arithmatex">\(d_{ij} \ge 0\)</span>, una sorgente <span class="arithmatex">\(s \in N\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> le distanze <span class="arithmatex">\(d(j)=\tilde{d}(j)\)</span> e i predecessori <span class="arithmatex">\(\mathit{pred}(j)\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Passo 0 (inizializzazione).</strong> Porre <span class="arithmatex">\(d(s):=0\)</span>, <span class="arithmatex">\(d(j):=+\infty\)</span> per <span class="arithmatex">\(j \neq s\)</span>; tutti i nodi sono temporanei.</div><div class="pc" style="--liv:0"><span class="pc-n">2</span><strong>Passo 1 (selezione).</strong> Se nessun nodo temporaneo ha un'etichetta finita, <code>STOP</code>.</div><div class="pc" style="--liv:0"><span class="pc-n">3</span>  Altrimenti rendere permanente il nodo temporaneo <span class="arithmatex">\(i\)</span> con <span class="arithmatex">\(d(i)\)</span> minima (quello di indice minimo, se ce n'è più
    di uno).</div><div class="pc" style="--liv:0"><span class="pc-n">4</span><strong>Passo 2 (aggiornamento).</strong> Per ogni arco <span class="arithmatex">\((i,j) \in \delta^+(i)\)</span> con <span class="arithmatex">\(j\)</span> temporaneo: se <span class="arithmatex">\(d(i)+d_{ij}<d(j)\)</span>, porre
    <span class="arithmatex">\(d(j):=d(i)+d_{ij}\)</span> e <span class="arithmatex">\(\mathit{pred}(j):=i\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">5</span>  Andare al Passo 1.</div></div>

<a id="box-30-sp-th-dijkstra"></a>

!!! teorema "Teorema 3.22: correttezza dell'algoritmo di Dijkstra"

    Se $d_{ij} \ge 0$ per ogni arco, a ogni iterazione dell'algoritmo di Dijkstra:

    - **(a)** ogni nodo permanente $i$ ha $d(i)=\tilde{d}(i)$;

    - **(b)** ogni nodo temporaneo $j$ ha come $d(j)$ la lunghezza minima di un cammino da $s$ a $j$ i cui nodi diversi da $j$ sono tutti permanenti ($+\infty$ se non ce n'è nessuno).

    All'arresto, $d(j)=\tilde{d}(j)$ per ogni $j \in N$.

??? dimostrazione "Dimostrazione"

    Entrambe le proprietà valgono dopo il Passo 0, quando non ci sono nodi permanenti. Sia $i$ il nodo scelto al Passo 1.

    1. <em>$d(i)=\tilde{d}(i)$.</em> Sia $P$ un cammino qualsiasi da $s$ a $i$, e sia $h$ il suo primo nodo temporaneo. Il tratto di $P$ fino a $h$ ha lunghezza $\ge d(h)$ per (b), e il resto ha lunghezza $\ge 0$, perché $d \ge 0$. Quindi $d(P) \ge d(h) \ge d(i)$, e per (b) il valore $d(i)$ è la lunghezza di un cammino: $d(i)=\tilde{d}(i)$.

    2. <em>(b) dopo il Passo 2.</em> Sia $j$ temporaneo e $Q$ un cammino verso $j$ i cui altri nodi sono permanenti, e sia $h$ il nodo che precede $j$. Se $h=i$, allora $d(Q) \ge \tilde{d}(i)+d_{ij}=d(i)+d_{ij}$, il valore controllato al Passo 2.

    3. Se $h \neq i$, allora $h$ è diventato permanente prima di $i$, attraverso un cammino di nodi permanenti di lunghezza $\tilde{d}(h)$; quando $h$ è stato scelto, il Passo 2 ha dato $d(j) \le \tilde{d}(h)+d_{hj} \le d(Q)$.

    Quindi il nuovo minimo è $\min\{d(j),\,d(i)+d_{ij}\}$, realizzato da un cammino, ed è l'etichetta lasciata dal Passo 2. All'arresto, i nodi temporanei hanno $d(j)=+\infty$: per (b) nessun arco va dall'insieme dei nodi permanenti verso di loro, quindi non sono raggiungibili e $\tilde{d}(j)=+\infty$. <span class="qed">□</span>

- Per il problema $s$–$t$ l'algoritmo può fermarsi appena $t$ diventa permanente, per (a).

- Gli archi $(\mathit{pred}(j),j)$ formano un albero dei cammini minimi: $\mathit{pred}(j)$ diventa permanente prima di $j$, e quando viene posto per l'ultima volta vale $d(j)=d(\mathit{pred}(j))+d_{\mathit{pred}(j)\,j}$, con entrambe le etichette definitive.

<a id="box-31-sp-th-dijkstra-time"></a>

!!! teorema "Teorema 3.23: tempo di esecuzione dell'algoritmo di Dijkstra"

    Con le etichette in un vettore, l'algoritmo di Dijkstra richiede tempo $O(n^2)$.

??? dimostrazione "Dimostrazione"

    Le iterazioni sono al più $n$, e il Passo 1 esamina le etichette temporanee in tempo $O(n)$. Il Passo 2 esamina la stella uscente del nodo scelto, e ogni nodo viene scelto una volta, quindi tutti gli aggiornamenti richiedono tempo $O(m)$. Il totale è $O(n^2+m)=O(n^2)$, perché $m \le n(n-1)$. <span class="qed">□</span>

- Con le etichette temporanee in un heap binario, il Passo 1 e ogni diminuzione di un'etichetta richiedono tempo $O(\log n)$: il totale è $O((n+m)\log n)$, migliore di $O(n^2)$ sui grafi sparsi.

### 3.6.1 L'algoritmo di Dijkstra sul grafo di riferimento

<a id="box-32-sp-ex-dijkstra"></a>

!!! esempio "Esempio 3.9: Dijkstra dal nodo $1$"

    Eseguiamo l'algoritmo con le lunghezze dell'<span style="color:#1971c2">[Esempio 3.1](problemi-di-cammino-minimo.md#box-2-sp-ex-ref)</span>. Ogni riga è un'iterazione: il nodo scelto diventa permanente (etichetta in grassetto), e accanto a un'etichetta che è diminuita c'è, tra parentesi, il nuovo predecessore.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>iterazione</th>
    <th>nodo scelto <span class="arithmatex">\(i\)</span></th>
    <th><span class="arithmatex">\(d(1)\)</span></th>
    <th><span class="arithmatex">\(d(2)\)</span></th>
    <th><span class="arithmatex">\(d(3)\)</span></th>
    <th><span class="arithmatex">\(d(4)\)</span></th>
    <th><span class="arithmatex">\(d(5)\)</span></th>
    <th><span class="arithmatex">\(d(6)\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(\mathbf{0}\)</span></td>
    <td><span class="arithmatex">\(7\)</span> (<span class="arithmatex">\(1\)</span>)</td>
    <td><span class="arithmatex">\(2\)</span> (<span class="arithmatex">\(1\)</span>)</td>
    <td><span class="arithmatex">\(\infty\)</span></td>
    <td><span class="arithmatex">\(\infty\)</span></td>
    <td><span class="arithmatex">\(\infty\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(\mathbf{0}\)</span></td>
    <td><span class="arithmatex">\(5\)</span> (<span class="arithmatex">\(3\)</span>)</td>
    <td><span class="arithmatex">\(\mathbf{2}\)</span></td>
    <td><span class="arithmatex">\(\infty\)</span></td>
    <td><span class="arithmatex">\(10\)</span> (<span class="arithmatex">\(3\)</span>)</td>
    <td><span class="arithmatex">\(\infty\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(\mathbf{0}\)</span></td>
    <td><span class="arithmatex">\(\mathbf{5}\)</span></td>
    <td><span class="arithmatex">\(\mathbf{2}\)</span></td>
    <td><span class="arithmatex">\(8\)</span> (<span class="arithmatex">\(2\)</span>)</td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(\infty\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(\mathbf{0}\)</span></td>
    <td><span class="arithmatex">\(\mathbf{5}\)</span></td>
    <td><span class="arithmatex">\(\mathbf{2}\)</span></td>
    <td><span class="arithmatex">\(\mathbf{8}\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(13\)</span> (<span class="arithmatex">\(4\)</span>)</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(\mathbf{0}\)</span></td>
    <td><span class="arithmatex">\(\mathbf{5}\)</span></td>
    <td><span class="arithmatex">\(\mathbf{2}\)</span></td>
    <td><span class="arithmatex">\(\mathbf{8}\)</span></td>
    <td><span class="arithmatex">\(\mathbf{10}\)</span></td>
    <td><span class="arithmatex">\(13\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(\mathbf{0}\)</span></td>
    <td><span class="arithmatex">\(\mathbf{5}\)</span></td>
    <td><span class="arithmatex">\(\mathbf{2}\)</span></td>
    <td><span class="arithmatex">\(\mathbf{8}\)</span></td>
    <td><span class="arithmatex">\(\mathbf{10}\)</span></td>
    <td><span class="arithmatex">\(\mathbf{13}\)</span></td>
    </tr>
    </table></div>

    - Nell'iterazione $2$ l'etichetta del nodo $2$ scende da $7$ a $2+3=5$; nell'iterazione $5$ l'arco $(5,6)$ offre $10+7=17>13$, e l'arco $(5,4)$ termina in un nodo permanente.

    - I nodi diventano permanenti nell'ordine $1,3,2,4,5,6$, con $\tilde{d}=(0,5,2,8,10,13)$; i predecessori danno l'albero dei cammini minimi dell'<span style="color:#1971c2">[Esempio 3.3](problemi-di-cammino-minimo.md#box-9-sp-ex-bellman)</span>.

### 3.6.2 Lunghezze negative

<a id="box-33-sp-ex-counter"></a>

!!! esempio "Esempio 3.10: un arco negativo fa fallire l'algoritmo di Dijkstra"

    Nel grafo qui sotto, con $s=1$, l'algoritmo rende permanente il nodo $2$ con $d(2)=2$, poi il nodo $3$ con $d(3)=3$; l'arco $(3,2)$ termina in un nodo permanente e viene ignorato. Il cammino $1,3,2$ ha lunghezza $3-2=1<2$.

    ![Figura 6](../../img/shortest-paths/fig06.svg){ .fig loading=lazy  }

    Sul grafo di riferimento con le lunghezze $d'$ dell'<span style="color:#1971c2">[Esempio 3.7](l-algoritmo-di-bellmanford.md#box-28-sp-ex-bf)</span> ($d'_{54}=-3$), l'algoritmo di Dijkstra rende permanenti i nodi nell'ordine $1,3,2,4,5,6$ e restituisce $d(4)=8$ e $d(6)=13$: il nodo $4$ diventa permanente prima del nodo $5$, quindi il cammino più corto $1,3,5,4$, di lunghezza $7$, sfugge all'algoritmo, e con esso il cammino verso $6$ di lunghezza $12$.

- La dimostrazione del <span style="color:#1971c2">[Teorema 3.22](#box-30-sp-th-dijkstra)</span> usa $d \ge 0$ in un solo punto: il resto di $P$ dopo il suo primo nodo temporaneo ha lunghezza $\ge 0$. Un arco negativo invalida proprio questo punto.

!!! chiave ""

    Con lunghezze non negative, l'algoritmo di Dijkstra rende permanente, a ogni iterazione, il nodo temporaneo con l'etichetta minima, che da quel momento è definitiva; richiede tempo $O(n^2)$. Con un arco negativo può sbagliare, e si usa invece l'algoritmo di Bellman–Ford.

## 3.7 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Eseguire l'algoritmo di Dijkstra con un arco negativo.</strong> Le sue etichette possono essere sbagliate, come con $d'_{54}=-3$ sul grafo di riferimento; usare Bellman–Ford, oppure l'ordine topologico se il grafo è aciclico.

    - <strong>Sommare una costante a ogni lunghezza.</strong> Rende le lunghezze non negative ma cambia i cammini minimi: un cammino con $k$ archi cresce di $k$ volte la costante.

    - <strong>Invertire il segno dei potenziali.</strong> Con $+1$ nella coda di $\mat{B}$ i vincoli duali sono $\pi_i-\pi_j \le d_{ij}$ e i potenziali ottimi sono $\pi_i=-\tilde{d}(i)$.

    - <strong>Saltare il test della passata $n$.</strong> Dopo $n-1$ passate le etichette sono le distanze solo in assenza di cicli negativi; un cambiamento nella passata $n$ ne rivela uno.

    - <strong>Aspettarsi che Bellman–Ford veda ogni ciclo negativo.</strong> Rileva solo i cicli raggiungibili da $s$, mentre un ciclo negativo in un punto qualsiasi di $G$ rende illimitato il modello LP.

    - <strong>Aggiornare un nodo permanente nell'algoritmo di Dijkstra.</strong> La sua etichetta è definitiva; si aggiornano solo i nodi temporanei.

    - <strong>Cercare un ordine topologico in un grafo con cicli.</strong> Esiste solo nei grafi aciclici: il grafo di riferimento non ne ha.

## 3.8 In sintesi

!!! chiave "In sintesi"

    - La distanza $\tilde{d}(j)$ è la lunghezza di un cammino minimo da $s$ a $j$; è ben definita quando nessun ciclo negativo è raggiungibile da $s$ (A2).

    - I sottocammini dei cammini minimi sono minimi; le distanze soddisfano le equazioni di Bellman, ed esiste un albero dei cammini minimi.

    - Potenziali ammissibili, $\bar{c}_{ij}=d_{ij}-\pi_i+\pi_j \ge 0$, e un cammino di archi stretti certificano l'ottimalità.

    - Il modello LP è un flusso unitario, $\mat{B}\vet{x}=\vet{b}$, $\vet{x} \ge \vet{0}$; il suo duale è $\max\{\pi_s-\pi_t : \pi_i-\pi_j \le d_{ij}\}$, con ottimo in $\pi_i=-\tilde{d}(i)$.

    - Grafi aciclici: ordine topologico, $O(n+m)$, lunghezze qualsiasi. Bellman–Ford: $O(n\,m)$, lunghezze qualsiasi, rileva i cicli negativi. Dijkstra: $O(n^2)$, lunghezze non negative.

    <strong>Il grafo di riferimento in breve.</strong>

    <div class="tabella" markdown="0"><table>
    <tr>
    <td>lunghezze <span class="arithmatex">\(d\)</span> (Dijkstra)</td>
    <td><span class="arithmatex">\(\tilde{d}=(0,5,2,8,10,13)\)</span>, ordine <span class="arithmatex">\(1,3,2,4,5,6\)</span></td>
    </tr>
    <tr>
    <td>modelli LP</td>
    <td><span class="arithmatex">\(z(\mathrm{SP}(1,6))=13\)</span>, <span class="arithmatex">\(z(\mathrm{SP}(1))=38\)</span></td>
    </tr>
    <tr>
    <td>lunghezze <span class="arithmatex">\(d'\)</span>, <span class="arithmatex">\(d'_{54}=-3\)</span> (Bellman–Ford)</td>
    <td><span class="arithmatex">\(\tilde{d}=(0,5,2,7,10,12)\)</span>, <span class="arithmatex">\(5\)</span> passate</td>
    </tr>
    <tr>
    <td>lunghezze <span class="arithmatex">\(d''\)</span>, <span class="arithmatex">\(d''_{54}=-10\)</span></td>
    <td>ciclo negativo <span class="arithmatex">\(3,5,4,3\)</span> di lunghezza <span class="arithmatex">\(-1\)</span></td>
    </tr>
    <tr>
    <td>grafo aciclico, arco <span class="arithmatex">\((3,4)\)</span></td>
    <td>ordine <span class="arithmatex">\(1,3,2,5,4,6\)</span>; <span class="arithmatex">\(\tilde{d}=(0,5,2,3,10,8)\)</span></td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Cammini minimi](../../esercizi/shortest-paths.md)

