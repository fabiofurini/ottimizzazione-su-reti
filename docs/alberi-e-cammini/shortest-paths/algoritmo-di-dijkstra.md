---
title: "Algoritmo di Dijkstra"
---

# 3.6 Algoritmo di Dijkstra

<div class="info-capitolo" markdown>

**Parte 2 · Alberi e cammini · Capitolo 3** · [:material-book-open-variant: Capitolo 3: Cammini minimi](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-alberi-e-cammini.pdf) · [:material-pencil: Esercizi: Cammini minimi](../../esercizi/shortest-paths.md) · [:material-gesture-tap: App: Cammini minimi: Dijkstra, Bellman–Ford, grafi aciclici](../../laboratorio/cammini-minimi-dijkstra-bellman-ford.md)

</div>

<a id="sez-sec-sp-dijkstra"></a>
- In questa sezione tutte le lunghezze sono non negative: $d_{ij} \ge 0$ per ogni arco. Quindi ogni ciclo ha una lunghezza $\ge 0$ e (A2) sono validi.

- I nodi sono <strong>permanente</strong>, quando la loro etichetta è definitiva, o <strong>temporaneo</strong>. Ad ogni iterazione il il nodo temporaneo con l'etichetta più piccola diventa permanente.

!!! algoritmo "Algoritmo: Algoritmo di Dijkstra"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> un grafo diretto <span class="arithmatex">\(G=(N,A)\)</span> con lunghezze <span class="arithmatex">\(d_{ij} \ge 0\)</span>, una sorgente <span class="arithmatex">\(s \in N\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> le distanze <span class="arithmatex">\(d(j)=\tilde{d}(j)\)</span> e i predecessori <span class="arithmatex">\(\mathit{pred}(j)\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Passaggio 0 (inizializzazione).</strong> Imposta <span class="arithmatex">\(d(s):=0\)</span>, <span class="arithmatex">\(d(j):=+\infty\)</span> per <span class="arithmatex">\(j \neq s\)</span>; tutti i nodi sono temporanei.</div><div class="pc" style="--liv:0"><span class="pc-n">2</span><strong>Passaggio 1 (selezione).</strong> Se nessun nodo temporaneo ha un'etichetta finita, <code>STOP</code>.</div><div class="pc" style="--liv:0"><span class="pc-n">3</span>  Altrimenti rendere permanente il nodo temporaneo <span class="arithmatex">\(i\)</span> con il più piccolo <span class="arithmatex">\(d(i)\)</span> (l'indice più piccolo, se superiore a
    uno).</div><div class="pc" style="--liv:0"><span class="pc-n">4</span><strong>Passaggio 2 (aggiornamento).</strong> Per ogni arco <span class="arithmatex">\((i,j) \in \delta^+(i)\)</span> con <span class="arithmatex">\(j\)</span> temporaneo: se <span class="arithmatex">\(d(i)+d_{ij}<d(j)\)</span>, impostare
    <span class="arithmatex">\(d(j):=d(i)+d_{ij}\)</span> e <span class="arithmatex">\(\mathit{pred}(j):=i\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">5</span>  Vai al passaggio 1.</div></div>

<a id="box-30-sp-th-dijkstra"></a>

!!! teorema "Teorema 3.22: correttezza dell'algoritmo di Dijkstra"

    Se $d_{ij} \ge 0$ per ogni arco, ad ogni iterazione dell'algoritmo di Dijkstra:

    - **(a)** ogni nodo permanente $i$ ha $d(i)=\tilde{d}(i)$;

    - **(b)** ogni nodo temporaneo $j$ ha come $d(j)$ la lunghezza minima di un percorso da $s$ a $j$ i cui nodi diversi da $j$ sono tutti permanenti ($+\infty$ se non ce n'è nessuno).

    Alla fermata, $d(j)=\tilde{d}(j)$ per ogni $j \in N$.

??? dimostrazione "Dimostrazione"

    Entrambe le proprietà restano valide dopo il passaggio 0, senza nodo permanente. Lascia che $i$ sia il nodo selezionato nel passaggio 1.

    1. <em>$d(i)=\tilde{d}(i)$.</em> Sia $P$ un percorso qualsiasi da $s$ a $i$ e $h$ sia il suo primo nodo temporaneo. Il parte di $P$ fino a $h$ ha lunghezza $\ge d(h)$ di (b) e il resto ha lunghezza $\ge 0$, a partire da $d \ge 0$. Quindi $d(P) \ge d(h) \ge d(i)$ e per (b) il valore $d(i)$ è la lunghezza di un percorso: $d(i)=\tilde{d}(i)$.

    2. <em>(b) dopo il passo 2.</em> Sia $j$ temporaneo e $Q$ un percorso verso $j$ i cui altri nodi siano permanenti, con $h$ il nodo prima di $j$. Se $h=i$, allora $d(Q) \ge \tilde{d}(i)+d_{ij}=d(i)+d_{ij}$, il valore testato nel passaggio 2.

    3. Se $h \neq i$, allora $h$ diventava permanente prima di $i$, attraverso un percorso di nodi permanenti di lunghezza $\tilde{d}(h)$; quando è stato selezionato $h$, il passaggio 2 ha prodotto $d(j) \le \tilde{d}(h)+d_{hj} \le d(Q)$.

    Quindi il nuovo minimo è $\min\{d(j),\,d(i)+d_{ij}\}$, raggiunto da un percorso, che è l'etichetta lasciata dal passaggio 2. Alla fermata, i nodi temporanei hanno $d(j)=+\infty$: per (b) nessun arco lascia il permanente impostato verso di loro, quindi non sono raggiungibili e $\tilde{d}(j)=+\infty$. <span class="qed">□</span>

- Per il problema $s$–$t$ l'algoritmo può interrompersi non appena $t$ è permanente, mediante (a).

- Gli archi $(\mathit{pred}(j),j)$ formano un albero del percorso più breve: $\mathit{pred}(j)$ è permanente prima di $j$ e quando viene impostato l'ultima volta $d(j)=d(\mathit{pred}(j))+d_{\mathit{pred}(j)\,j}$ con entrambe le etichette finali.

<a id="box-31-sp-th-dijkstra-time"></a>

!!! teorema "Teorema 3.23: tempo di esecuzione dell'algoritmo di Dijkstra"

    Con le etichette in un array, l'algoritmo di Dijkstra viene eseguito nel tempo $O(n^2)$.

??? dimostrazione "Dimostrazione"

    Esistono al massimo le iterazioni $n$ e il passaggio 1 esegue la scansione delle etichette temporanee nel tempo $O(n)$. Il passaggio 2 esegue la scansione dell'inoltro stella del nodo selezionato e ciascun nodo viene selezionato una volta, quindi tutti gli aggiornamenti richiedono tempo $O(m)$. Il totale è $O(n^2+m)=O(n^2)$, da $m \le n(n-1)$. <span class="qed">□</span>

- Con le etichette temporanee in un heap binario, il passaggio 1 e ogni diminuzione di un'etichetta richiedono tempo $O(\log n)$: il il totale è $O((n+m)\log n)$, migliore di $O(n^2)$ su grafi sparsi.

### 3.6.1 Algoritmo di Dijkstra sul grafo di riferimento

<a id="box-32-sp-ex-dijkstra"></a>

!!! esempio "Esempio 3.9: Dijkstra dal nodo $1$"

    Eseguiamo l'algoritmo con le lunghezze <span style="color:#1971c2">[Esempio 3.1](problemi-del-percorso-piu-breve.md#box-2-sp-ex-ref)</span>. Ogni riga è un'iterazione: il nodo selezionato diventa permanente (etichetta in grassetto) e un'etichetta diminuita ha il nuovo predecessore tra parentesi.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>iterazione e <span class="arithmatex">\(i\)</span></th>
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

    - Nell'iterazione $2$ l'etichetta del nodo $2$ scende da $7$ a $2+3=5$; nell'iterazione $5$ l'arco $(5,6)$ offre $10+7=17>13$ e l'arco $(5,4)$ termina con un nodo permanente.

    - I nodi diventano permanenti nell'ordine $1,3,2,4,5,6$, con $\tilde{d}=(0,5,2,8,10,13)$; danno i predecessori l'albero del percorso più breve di <span style="color:#1971c2">[Esempio 3.3](problemi-del-percorso-piu-breve.md#box-9-sp-ex-bellman)</span>.

### 3.6.2 Lunghezze negative

<a id="box-33-sp-ex-counter"></a>

!!! esempio "Esempio 3.10: un arco negativo interrompe l'algoritmo di Dijkstra"

    Nel grafo sottostante, con $s=1$, l'algoritmo rende permanente il nodo $2$ con $d(2)=2$, quindi il nodo $3$ con $d(3)=3$; l'arco $(3,2)$ termina con un nodo permanente e viene ignorato. Il percorso $1,3,2$ ha lunghezza $3-2=1<2$.

    ![Figura 6](../../img/shortest-paths/fig06.svg){ .fig loading=lazy  }

    Sul grafo di riferimento con le lunghezze $d'$ di <span style="color:#1971c2">[Esempio 3.7](l-algoritmo-bellmanford.md#box-28-sp-ex-bf)</span> ($d'_{54}=-3$), l'algoritmo di Dijkstra rende permanenti i nodi nell'ordine $1,3,2,4,5,6$ e restituisce $d(4)=8$ e $d(6)=13$: il nodo $4$ è permanente prima nodo $5$, quindi il percorso più breve $1,3,5,4$ di lunghezza $7$ viene perso e con esso il percorso verso $6$ di lunghezza $12$.

- La dimostrazione di <span style="color:#1971c2">[Teorema 3.22](#box-30-sp-th-dijkstra)</span> utilizza $d \ge 0$ in un punto: il resto di $P$ dopo il suo primo nodo temporaneo ha lunghezza $\ge 0$. Un arco negativo interrompe esattamente questo passaggio.

!!! chiave ""

    Con lunghezze non negative, l'algoritmo di Dijkstra rende permanente, ad ogni iterazione, il nodo temporaneo con il etichetta più piccola, la cui etichetta è quindi definitiva; funziona in tempo $O(n^2)$. Con un arco negativo può fallire e il Viene invece utilizzato l'algoritmo Bellman–Ford.

## 3.7 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Esecuzione dell'algoritmo di Dijkstra con un arco negativo.</strong> Le sue etichette possono essere errate, come con $d'_{54}=-3$ su il grafo di riferimento; utilizzare Bellman–Ford o l'ordine topologico se il grafo è aciclico.

    - <strong>Aggiungere una costante a ogni lunghezza.</strong> Rende le lunghezze non negative ma modifica i percorsi più brevi: un percorso con archi $k$ cresce di $k$ volte la costante.

    - <strong>Scambio di segno dei potenziali.</strong> Con $+1$ nella coda di $\mat{B}$ i vincoli duali sono $\pi_i-\pi_j \le d_{ij}$ e i potenziali ottimali sono $\pi_i=-\tilde{d}(i)$.

    - <strong>Saltare il test di passaggio $n$.</strong> Dopo che $n-1$ ha superato le etichette sono solo le distanze senza negativo cicli; un cambiamento nel passaggio $n$ ne rivela uno.

    - <strong>Mi aspetto che Bellman–Ford veda ogni ciclo negativo.</strong> Rileva solo i cicli raggiungibili da $s$, mentre un ciclo negativo ovunque in $G$ rende il modello LP illimitato.

    - <strong>Aggiornamento di un nodo permanente nell'algoritmo di Dijkstra.</strong> La sua etichetta è definitiva; lo sono solo i nodi temporanei aggiornato.

    - <strong>Ricerca di un ordine topologico in un grafo con cicli.</strong> Esiste solo nei grafi aciclici: il il grafo di riferimento non ne ha nessuno.

## 3.8 In sintesi

!!! chiave "In sintesi"

    - La distanza $\tilde{d}(j)$ è la lunghezza del percorso più breve da $s$ a $j$; è ben definito quando no il ciclo negativo è raggiungibile da $s$ (A2).

    - I sottopercorsi dei percorsi più brevi sono i più brevi; le distanze soddisfano le equazioni di Bellman e un albero dei cammini più brevi esiste.

    - I potenziali fattibili, $\bar{c}_{ij}=d_{ij}-\pi_i+\pi_j \ge 0$ e un percorso di archi stretti certificano l'ottimalità.

    - Il modello LP è un'unità di flusso, $\mat{B}\vet{x}=\vet{b}$, $\vet{x} \ge \vet{0}$; il suo duale è $\max\{\pi_s-\pi_t : \pi_i-\pi_j \le d_{ij}\}$, ottimale su $\pi_i=-\tilde{d}(i)$.

    - Grafi aciclici: ordine topologico, $O(n+m)$, qualsiasi lunghezza. Bellman–Ford: $O(n\,m)$, qualsiasi lunghezza, rileva cicli negativi. Dijkstra: $O(n^2)$, lunghezze non negative.

    <strong>Il grafo di riferimento in sintesi.</strong>

    <div class="tabella" markdown="0"><table>
    <tr>
    <td>lunghezze <span class="arithmatex">\(d\)</span> (Dijkstra) e <span class="arithmatex">\(\tilde{d}=(0,5,2,8,10,13)\)</span>, ordinare <span class="arithmatex">\(1,3,2,4,5,6\)</span></td>
    </tr>
    <tr>
    <td>Modelli LP e <span class="arithmatex">\(z(\mathrm{SP}(1,6))=13\)</span>, <span class="arithmatex">\(z(\mathrm{SP}(1))=38\)</span></td>
    </tr>
    <tr>
    <td>lunghezze <span class="arithmatex">\(d'\)</span>, <span class="arithmatex">\(d'_{54}=-3\)</span> (Bellman–Ford) e <span class="arithmatex">\(\tilde{d}=(0,5,2,7,10,12)\)</span>, <span class="arithmatex">\(5\)</span> passa</td>
    </tr>
    <tr>
    <td>lunghezze <span class="arithmatex">\(d''\)</span>, <span class="arithmatex">\(d''_{54}=-10\)</span> e ciclo negativo <span class="arithmatex">\(3,5,4,3\)</span> della lunghezza <span class="arithmatex">\(-1\)</span></td>
    </tr>
    <tr>
    <td>grafo aciclico, arco <span class="arithmatex">\((3,4)\)</span> e ordine <span class="arithmatex">\(1,3,2,5,4,6\)</span>; <span class="arithmatex">\(\tilde{d}=(0,5,2,3,10,8)\)</span></td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Cammini minimi](../../esercizi/shortest-paths.md)
