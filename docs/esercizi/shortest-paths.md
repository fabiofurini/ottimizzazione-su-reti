---
title: "Esercizi · Cammini minimi"
---

# Esercizi · Cammini minimi

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 3** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 3: Cammini minimi](../alberi-e-cammini/shortest-paths/index.md) · [:material-file-pdf-box: Eserciziario, volume 2 (PDF)](../pdf/esercizi-2-alberi-e-cammini.pdf)

</div>

!!! formula "Regole usate in questi esercizi"

    Le definizioni e gli algoritmi del capitolo [«Cammini minimi»](../alberi-e-cammini/shortest-paths/index.md), per un grafo orientato $G=(N,A)$ con lunghezze $d_{ij}$, $n=|N|$, $m=|A|$ e sorgente $s=1$.

    - **(S1)** <strong>Dijkstra</strong> ($d_{ij} \ge 0$). Il nodo temporaneo con l'etichetta minima diventa permanente (indice minimo in caso di pareggio); per ogni arco $(i,j)$ con $j$ temporaneo, se $d(i)+d_{ij}<d(j)$ allora $d(j):=d(i)+d_{ij}$ e $\mathit{pred}(j):=i$.

    - **(S2)** <strong>Bellman–Ford.</strong> La passata $k$ calcola

        $$
        d^k(j)=\min\Big\{ d^{k-1}(j),\ \min_{(i,j) \in A} \big(d^{k-1}(i)+d_{ij}\big)\Big\};
        $$

        il predecessore cambia solo se l'etichetta diminuisce strettamente ($i$ minimo in caso di pareggio). Ci si ferma quando $d^k=d^{k-1}$; un cambiamento nella passata $n$ indica un ciclo negativo raggiungibile da $s$.

    - **(S3)** <strong>Ciclo negativo.</strong> Se $d^n(j)<d^{n-1}(j)$, i predecessori letti all'indietro a partire da $j$, una riga per passata a partire dalla riga $n$, danno una passeggiata con $n$ archi che contiene un ciclo negativo.

    - **(S4)** <strong>Grafi aciclici.</strong> Ordine topologico togliendo un nodo senza archi entranti (indice minimo); i nodi si elaborano in quest'ordine, e ciascuno aggiorna le etichette lungo i suoi archi uscenti. Le lunghezze $-d_{ij}$ danno i cammini massimi.

    - **(S5)** <strong>Potenziali.</strong> $\bar{c}_{ij}=d_{ij}-\pi_i+\pi_j$; con le etichette, $\pi_i=-d(i)$. Potenziali ammissibili ($\bar{c} \ge 0$) e un cammino da $s$ a $t$ di archi stretti ($\bar{c}=0$) dimostrano che il cammino è minimo, di lunghezza $\pi_s-\pi_t$. Il duale di $\mathrm{SP}(s,t)$ è $\max\{\pi_s-\pi_t : \pi_i-\pi_j \le d_{ij}\}$.

<a id="esercizio-3-1"></a>

!!! esercizio "Esercizio 3.1: Algoritmo di Dijkstra"

    !!! esercizio "Esercizio"

        Consideriamo il grafo orientato $G=(N,A)$ con $N=\{1,2,\dots,7\}$, gli $11$ archi e le lunghezze $d_{ij}$ della tabella, disegnato qui sotto; la sorgente è $s=1$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,3)\)</span></th>
        <th><span class="arithmatex">\((1,6)\)</span></th>
        <th><span class="arithmatex">\((2,3)\)</span></th>
        <th><span class="arithmatex">\((3,4)\)</span></th>
        <th><span class="arithmatex">\((3,5)\)</span></th>
        <th><span class="arithmatex">\((4,2)\)</span></th>
        <th><span class="arithmatex">\((4,5)\)</span></th>
        <th><span class="arithmatex">\((5,7)\)</span></th>
        <th><span class="arithmatex">\((6,4)\)</span></th>
        <th><span class="arithmatex">\((7,1)\)</span></th>
        <th><span class="arithmatex">\((7,2)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(d_{ij}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        </table></div>

        ![Figura 1](../img/es-shortest-paths/fig01.svg){ .fig loading=lazy  }

    **Domande**

    1. Eseguire l'algoritmo di Dijkstra da $s=1$: dare le etichette dopo ogni iterazione e l'ordine in cui i nodi diventano permanenti.

    2. Disegnare l'albero dei cammini minimi e dare un cammino minimo da $1$ a $7$ con la sua lunghezza.

    3. Con i potenziali $\pi_i=-\tilde{d}(i)$, calcolare i costi ridotti ed elencare gli archi stretti.

??? soluzione "Soluzione"

    Usiamo le regole (S1)–(S5) del riquadro all'inizio di questi esercizi.

    1. Ogni riga è un'iterazione; le etichette permanenti sono in grassetto, e accanto a un'etichetta che è diminuita c'è, tra parentesi, il nuovo predecessore:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>it.</th>
        <th><span class="arithmatex">\(i\)</span></th>
        <th><span class="arithmatex">\(d(1)\)</span></th>
        <th><span class="arithmatex">\(d(2)\)</span></th>
        <th><span class="arithmatex">\(d(3)\)</span></th>
        <th><span class="arithmatex">\(d(4)\)</span></th>
        <th><span class="arithmatex">\(d(5)\)</span></th>
        <th><span class="arithmatex">\(d(6)\)</span></th>
        <th><span class="arithmatex">\(d(7)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\mathbf{0}\)</span></td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        <td><span class="arithmatex">\(5\)</span> (<span class="arithmatex">\(1\)</span>)</td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        <td><span class="arithmatex">\(8\)</span> (<span class="arithmatex">\(1\)</span>)</td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\mathbf{0}\)</span></td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        <td><span class="arithmatex">\(\mathbf{5}\)</span></td>
        <td><span class="arithmatex">\(13\)</span> (<span class="arithmatex">\(3\)</span>)</td>
        <td><span class="arithmatex">\(14\)</span> (<span class="arithmatex">\(3\)</span>)</td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\mathbf{0}\)</span></td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        <td><span class="arithmatex">\(\mathbf{5}\)</span></td>
        <td><span class="arithmatex">\(11\)</span> (<span class="arithmatex">\(6\)</span>)</td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(\mathbf{8}\)</span></td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\mathbf{0}\)</span></td>
        <td><span class="arithmatex">\(16\)</span> (<span class="arithmatex">\(4\)</span>)</td>
        <td><span class="arithmatex">\(\mathbf{5}\)</span></td>
        <td><span class="arithmatex">\(\mathbf{11}\)</span></td>
        <td><span class="arithmatex">\(12\)</span> (<span class="arithmatex">\(4\)</span>)</td>
        <td><span class="arithmatex">\(\mathbf{8}\)</span></td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\mathbf{0}\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(\mathbf{5}\)</span></td>
        <td><span class="arithmatex">\(\mathbf{11}\)</span></td>
        <td><span class="arithmatex">\(\mathbf{12}\)</span></td>
        <td><span class="arithmatex">\(\mathbf{8}\)</span></td>
        <td><span class="arithmatex">\(17\)</span> (<span class="arithmatex">\(5\)</span>)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\mathbf{0}\)</span></td>
        <td><span class="arithmatex">\(\mathbf{16}\)</span></td>
        <td><span class="arithmatex">\(\mathbf{5}\)</span></td>
        <td><span class="arithmatex">\(\mathbf{11}\)</span></td>
        <td><span class="arithmatex">\(\mathbf{12}\)</span></td>
        <td><span class="arithmatex">\(\mathbf{8}\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\mathbf{0}\)</span></td>
        <td><span class="arithmatex">\(\mathbf{16}\)</span></td>
        <td><span class="arithmatex">\(\mathbf{5}\)</span></td>
        <td><span class="arithmatex">\(\mathbf{11}\)</span></td>
        <td><span class="arithmatex">\(\mathbf{12}\)</span></td>
        <td><span class="arithmatex">\(\mathbf{8}\)</span></td>
        <td><span class="arithmatex">\(\mathbf{17}\)</span></td>
        </tr>
        </table></div>

        I nodi diventano permanenti nell'ordine $1,3,6,4,5,2,7$, e $\tilde{\vet{d}}=(0,\,16,\,5,\,11,\,12,\,8,\,17)$.

    2. Gli archi $(\mathit{pred}(j),j)$ sono $(4,2)$, $(1,3)$, $(6,4)$, $(4,5)$, $(1,6)$, $(5,7)$ (in blu); accanto a ogni nodo la sua distanza:

        ![Figura 2](../img/es-shortest-paths/fig02.svg){ .fig loading=lazy  }

        Il cammino minimo da $1$ a $7$ è $1,6,4,5,7$, di lunghezza $8+3+1+5=17$.

    3. I potenziali sono $\vet{\pi}=(0,\,-16,\,-5,\,-11,\,-12,\,-8,\,-17)$, e $\bar{c}_{ij}=d_{ij}-\pi_i+\pi_j$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,3)\)</span></th>
        <th><span class="arithmatex">\((1,6)\)</span></th>
        <th><span class="arithmatex">\((2,3)\)</span></th>
        <th><span class="arithmatex">\((3,4)\)</span></th>
        <th><span class="arithmatex">\((3,5)\)</span></th>
        <th><span class="arithmatex">\((4,2)\)</span></th>
        <th><span class="arithmatex">\((4,5)\)</span></th>
        <th><span class="arithmatex">\((5,7)\)</span></th>
        <th><span class="arithmatex">\((6,4)\)</span></th>
        <th><span class="arithmatex">\((7,1)\)</span></th>
        <th><span class="arithmatex">\((7,2)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(d_{ij}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\bar{c}_{ij}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(24\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        </table></div>

        Tutti i costi ridotti sono non negativi, e gli archi stretti sono $(1,3)$, $(1,6)$, $(4,2)$, $(4,5)$, $(5,7)$, $(6,4)$: esattamente gli archi dell'albero dei cammini minimi.

    !!! chiave ""

        L'algoritmo di Dijkstra dà $\tilde{\vet{d}}=(0,\,16,\,5,\,11,\,12,\,8,\,17)$; i potenziali $\pi_i=-\tilde{d}(i)$ sono ammissibili, e i loro archi stretti formano l'albero dei cammini minimi.

<a id="esercizio-3-2"></a>

!!! esercizio "Esercizio 3.2: Bellman--Ford con archi negativi"

    !!! esercizio "Esercizio"

        Consideriamo il grafo orientato $G=(N,A)$ con $N=\{1,2,\dots,6\}$, gli $10$ archi e le lunghezze $d_{ij}$ della tabella, disegnato qui sotto; la sorgente è $s=1$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,3)\)</span></th>
        <th><span class="arithmatex">\((1,5)\)</span></th>
        <th><span class="arithmatex">\((2,1)\)</span></th>
        <th><span class="arithmatex">\((2,6)\)</span></th>
        <th><span class="arithmatex">\((3,2)\)</span></th>
        <th><span class="arithmatex">\((4,2)\)</span></th>
        <th><span class="arithmatex">\((4,3)\)</span></th>
        <th><span class="arithmatex">\((5,3)\)</span></th>
        <th><span class="arithmatex">\((5,4)\)</span></th>
        <th><span class="arithmatex">\((5,6)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(d_{ij}\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(-3\)</span></td>
        <td><span class="arithmatex">\(-4\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        </tr>
        </table></div>

        ![Figura 3](../img/es-shortest-paths/fig03.svg){ .fig loading=lazy  }

    **Domande**

    1. Eseguire l'algoritmo di Bellman–Ford da $s=1$: dare le etichette $d^k$ di ogni passata e il numero di passate.

    2. Disegnare l'albero dei cammini minimi e dare un cammino minimo da $1$ a $6$.

    3. Eseguire l'algoritmo di Dijkstra con le stesse lunghezze: quali etichette sono sbagliate, e perché?

??? soluzione "Soluzione"

    Usiamo le regole (S1)–(S5) del riquadro all'inizio di questi esercizi.

    1. Ogni riga è una passata; accanto a un'etichetta che è diminuita, tra parentesi il nuovo predecessore:

        $$
        \begin{array}{c|cccccc}
        \hline {k} & {d^k(1)} & {d^k(2)} & {d^k(3)} & {d^k(4)} & {d^k(5)} & {d^k(6)} \\
        \hline {0} & {0} & {\infty} & {\infty} & {\infty} & {\infty} & {\infty} \\
        {1} & {0} & {\infty} & {7} ({1}) & {\infty} & {4} ({1}) & {\infty} \\
        {2} & {0} & {4} ({3}) & {7} & {7} ({5}) & {4} & {12} ({5}) \\
        {3} & {0} & {3} ({4}) & {7} & {7} & {4} & {10} ({2}) \\
        {4} & {0} & {3} & {7} & {7} & {4} & {9} ({2}) \\
        {5} & {0} & {3} & {7} & {7} & {4} & {9} \\
        \hline
        \end{array}
        $$

        La passata $5$ ripete le etichette della passata $4$: l'algoritmo si ferma dopo $5$ passate con $\tilde{\vet{d}}=(0,\,3,\,7,\,7,\,4,\,9)$.

    2. Gli ultimi predecessori danno gli archi $(4,2)$, $(1,3)$, $(5,4)$, $(1,5)$, $(2,6)$ (in blu):

        ![Figura 4](../img/es-shortest-paths/fig04.svg){ .fig loading=lazy  }

        Il cammino minimo da $1$ a $6$ è $1,5,4,2,6$, di lunghezza $9$.

    3. L'algoritmo di Dijkstra rende permanenti i nodi nell'ordine $1,5,3,2,4,6$ e restituisce $(0,\,4,\,7,\,7,\,4,\,10)$: le etichette dei nodi $2,6$ sono sbagliate. L'arco negativo $(4,2)$ termina in un nodo che è già permanente quando la sua coda viene scelta, quindi (S1) non lo usa mai, sebbene $\tilde{d}(4)+d_{42}=7-4=3<4$.

    !!! chiave ""

        Con archi negativi e senza cicli negativi, l'algoritmo di Bellman–Ford si ferma dopo $5$ passate con $\tilde{\vet{d}}=(0,\,3,\,7,\,7,\,4,\,9)$, mentre l'algoritmo di Dijkstra sbaglia.

<a id="esercizio-3-3"></a>

!!! esercizio "Esercizio 3.3: Rilevamento di un ciclo negativo"

    !!! esercizio "Esercizio"

        Consideriamo il grafo orientato $G=(N,A)$ con $N=\{1,2,\dots,5\}$, gli $8$ archi e le lunghezze $d_{ij}$ della tabella, disegnato qui sotto; la sorgente è $s=1$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,2)\)</span></th>
        <th><span class="arithmatex">\((1,4)\)</span></th>
        <th><span class="arithmatex">\((2,3)\)</span></th>
        <th><span class="arithmatex">\((3,1)\)</span></th>
        <th><span class="arithmatex">\((3,4)\)</span></th>
        <th><span class="arithmatex">\((4,2)\)</span></th>
        <th><span class="arithmatex">\((4,5)\)</span></th>
        <th><span class="arithmatex">\((5,3)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(d_{ij}\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(-9\)</span></td>
        </tr>
        </table></div>

        ![Figura 5](../img/es-shortest-paths/fig05.svg){ .fig loading=lazy  }

    **Domande**

    1. Eseguire l'algoritmo di Bellman–Ford da $s=1$ per $5$ passate. $G$ ha un ciclo negativo raggiungibile da $1$?

    2. Trovare un ciclo negativo leggendo i predecessori all'indietro, e darne la lunghezza.

    3. Qual è il valore ottimo del modello LP a sorgente singola $\mathrm{SP}(1)$?

??? soluzione "Soluzione"

    Usiamo le regole (S1)–(S5) del riquadro all'inizio di questi esercizi.

    1. Ogni riga è una passata; accanto a un'etichetta che è diminuita, tra parentesi il nuovo predecessore:

        $$
        \begin{array}{c|ccccc}
        \hline {k} & {d^k(1)} & {d^k(2)} & {d^k(3)} & {d^k(4)} & {d^k(5)} \\
        \hline {0} & {0} & {\infty} & {\infty} & {\infty} & {\infty} \\
        {1} & {0} & {7} ({1}) & {\infty} & {\mathbf{7}} ({\mathbf{1}}) & {\infty} \\
        {2} & {0} & {7} & {11} ({2}) & {7} & {\mathbf{8}} ({\mathbf{4}}) \\
        {3} & {0} & {7} & {\mathbf{-1}} ({\mathbf{5}}) & {7} & {8} \\
        {4} & {0} & {7} & {-1} & {\mathbf{6}} ({\mathbf{3}}) & {8} \\
        {5} & {0} & {7} & {-1} & {6} & {\mathbf{7}} ({\mathbf{4}}) \\
        \hline
        \end{array}
        $$

        Nella passata $n=5$ l'etichetta del nodo $5$ scende da $8$ a $7$: $d^5 \neq d^4$, e un ciclo negativo è raggiungibile da $1$.

    2. Leggendo all'indietro a partire dal nodo $5$ (valori in grassetto): la riga $5$ dà $4$, la riga $4$ dà $3$, la riga $3$ dà $5$, la riga $2$ dà $4$, la riga $1$ dà $1$. La passeggiata è

        $$
        1,4,5,3,4,5, \qquad \text{di lunghezza } 7=d^5(5),
        $$

        e il suo primo nodo ripetuto chiude il ciclo $4,5,3,4$, di lunghezza $1-9+7=-1$ (in rosso):

        ![Figura 6](../img/es-shortest-paths/fig06.svg){ .fig loading=lazy  }

    3. Il modello è ammissibile, perché ogni nodo è raggiungibile da $1$, e $G$ ha un ciclo negativo: aggiungere $\lambda$ unità di flusso lungo il ciclo conserva i bilanci e abbassa il valore di $\lambda$. Il modello $\mathrm{SP}(1)$ è illimitato (Gurobi lo conferma).

    !!! chiave ""

        Un cambiamento nella passata $n=5$ rivela un ciclo negativo: la passeggiata letta all'indietro nella tabella contiene il ciclo $4,5,3,4$ di lunghezza $-1$, e il modello LP è illimitato.

<a id="esercizio-3-4"></a>

!!! esercizio "Esercizio 3.4: Cammini minimi in un grafo aciclico"

    !!! esercizio "Esercizio"

        Consideriamo il grafo orientato $G=(N,A)$ con $N=\{1,2,\dots,7\}$, gli $11$ archi e le lunghezze $d_{ij}$ della tabella, disegnato qui sotto; la sorgente è $s=1$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,2)\)</span></th>
        <th><span class="arithmatex">\((1,3)\)</span></th>
        <th><span class="arithmatex">\((1,6)\)</span></th>
        <th><span class="arithmatex">\((2,4)\)</span></th>
        <th><span class="arithmatex">\((3,2)\)</span></th>
        <th><span class="arithmatex">\((3,4)\)</span></th>
        <th><span class="arithmatex">\((3,5)\)</span></th>
        <th><span class="arithmatex">\((4,5)\)</span></th>
        <th><span class="arithmatex">\((5,7)\)</span></th>
        <th><span class="arithmatex">\((6,4)\)</span></th>
        <th><span class="arithmatex">\((6,5)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(d_{ij}\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        </table></div>

        ![Figura 7](../img/es-shortest-paths/fig07.svg){ .fig loading=lazy  }

    **Domande**

    1. Mostrare che $G$ è aciclico trovandone l'ordine topologico con (S4).

    2. Calcolare i cammini minimi da $s=1$ con l'algoritmo per i grafi aciclici, e disegnare l'albero dei cammini minimi.

    3. Calcolare un cammino massimo da $1$ a $7$ e la sua lunghezza.

??? soluzione "Soluzione"

    Usiamo le regole (S1)–(S5) del riquadro all'inizio di questi esercizi.

    1. Togliendo ogni volta il nodo senza archi entranti di indice minimo si ottiene l'ordine $1,3,2,6,4,5,7$. Ogni arco va in avanti in quest'ordine, quindi $G$ non ha cicli orientati.

    2. Ogni riga elabora un nodo e mostra le etichette dopo l'elaborazione:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>passo</th>
        <th>nodo <span class="arithmatex">\(i\)</span></th>
        <th><span class="arithmatex">\(d(1)\)</span></th>
        <th><span class="arithmatex">\(d(2)\)</span></th>
        <th><span class="arithmatex">\(d(3)\)</span></th>
        <th><span class="arithmatex">\(d(4)\)</span></th>
        <th><span class="arithmatex">\(d(5)\)</span></th>
        <th><span class="arithmatex">\(d(6)\)</span></th>
        <th><span class="arithmatex">\(d(7)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        </table></div>

        Quindi $\tilde{\vet{d}}=(0,\,6,\,6,\,4,\,3,\,1,\,2)$; i predecessori danno gli archi $(1,2)$, $(1,3)$, $(6,4)$, $(6,5)$, $(1,6)$, $(5,7)$ (in blu):

        ![Figura 8](../img/es-shortest-paths/fig08.svg){ .fig loading=lazy  }

        Il cammino minimo da $1$ a $7$ è $1,6,5,7$, di lunghezza $2$.

    3. Con le lunghezze $-d_{ij}$ lo stesso algoritmo dà le lunghezze dei cammini massimi

        $$
        (0,\,13,\,6,\,19,\,27,\,1,\,26).
        $$

        Un cammino massimo da $1$ a $7$ è $1,3,2,4,5,7$, di lunghezza $26$.

    !!! chiave ""

        Nell'ordine topologico $1,3,2,6,4,5,7$ ogni etichetta è definitiva quando il suo nodo viene elaborato: cammino minimo verso $7$ di lunghezza $2$, cammino massimo di lunghezza $26$.

<a id="esercizio-3-5"></a>

!!! esercizio "Esercizio 3.5: Potenziali come certificato di ottimalità"

    !!! esercizio "Esercizio"

        Consideriamo il grafo orientato $G=(N,A)$ con $N=\{1,2,\dots,6\}$, gli $10$ archi e le lunghezze $d_{ij}$ della tabella, disegnato qui sotto; la sorgente è $s=1$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,3)\)</span></th>
        <th><span class="arithmatex">\((1,5)\)</span></th>
        <th><span class="arithmatex">\((2,3)\)</span></th>
        <th><span class="arithmatex">\((3,4)\)</span></th>
        <th><span class="arithmatex">\((3,5)\)</span></th>
        <th><span class="arithmatex">\((4,6)\)</span></th>
        <th><span class="arithmatex">\((5,4)\)</span></th>
        <th><span class="arithmatex">\((6,1)\)</span></th>
        <th><span class="arithmatex">\((6,2)\)</span></th>
        <th><span class="arithmatex">\((6,5)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(d_{ij}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        </tr>
        </table></div>

        ![Figura 9](../img/es-shortest-paths/fig09.svg){ .fig loading=lazy  }

        L'albero $\bar{T}$ con gli archi $(6,2)$, $(1,3)$, $(3,4)$, $(1,5)$, $(4,6)$ dà le etichette $\bar{\vet{d}}=(0,\,25,\,5,\,13,\,4,\,20)$, le lunghezze dei suoi cammini da $1$.

    **Domande**

    1. Scrivere il modello duale $D(\mathrm{SP}(1,6))$ del modello LP del cammino minimo da $1$ a $6$.

    2. Calcolare i costi ridotti dei potenziali $\bar{\pi}_i=-\bar{d}(i)$. Il cammino di $\bar{T}$ da $1$ a $6$ è un cammino minimo?

    3. Sono dati i potenziali $\tilde{\vet{\pi}}=(0,\,-19,\,-5,\,-7,\,-4,\,-14)$. Mostrare che sono ammissibili, e trovare un cammino da $1$ a $6$ che essi certificano come minimo.

    4. Quali sono i valori ottimi di $\mathrm{SP}(1,6)$ e del suo duale?

??? soluzione "Soluzione"

    Usiamo le regole (S1)–(S5) del riquadro all'inizio di questi esercizi.

    1. C'è una variabile libera $\pi_i$ per ogni nodo e un vincolo $\pi_i-\pi_j \le d_{ij}$ per ogni arco:

        $$
        \begin{array}{rll}
        \max & \pi_1-\pi_{6} & \\
        \text{soggetto a} & \pi_{1}-\pi_{3} \le 5 & \text{arco }(1,3) \\
        & \pi_{1}-\pi_{5} \le 4 & \text{arco }(1,5) \\
        & \pi_{2}-\pi_{3} \le 2 & \text{arco }(2,3) \\
        & \pi_{3}-\pi_{4} \le 8 & \text{arco }(3,4) \\
        & \pi_{3}-\pi_{5} \le 1 & \text{arco }(3,5) \\
        & \pi_{4}-\pi_{6} \le 7 & \text{arco }(4,6) \\
        & \pi_{5}-\pi_{4} \le 3 & \text{arco }(5,4) \\
        & \pi_{6}-\pi_{1} \le 9 & \text{arco }(6,1) \\
        & \pi_{6}-\pi_{2} \le 5 & \text{arco }(6,2) \\
        & \pi_{6}-\pi_{5} \le 8 & \text{arco }(6,5) \\
        & \pi_i \in \R, & i \in \{1,\dots,6\}.
        \end{array}
        $$

    2. Con $\bar{\vet{\pi}}=(0,\,-25,\,-5,\,-13,\,-4,\,-20)$ i costi ridotti sono:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,3)\)</span></th>
        <th><span class="arithmatex">\((1,5)\)</span></th>
        <th><span class="arithmatex">\((2,3)\)</span></th>
        <th><span class="arithmatex">\((3,4)\)</span></th>
        <th><span class="arithmatex">\((3,5)\)</span></th>
        <th><span class="arithmatex">\((4,6)\)</span></th>
        <th><span class="arithmatex">\((5,4)\)</span></th>
        <th><span class="arithmatex">\((6,1)\)</span></th>
        <th><span class="arithmatex">\((6,2)\)</span></th>
        <th><span class="arithmatex">\((6,5)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(d_{ij}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\bar{c}_{ij}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(-6\)</span></td>
        <td><span class="arithmatex">\(29\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(24\)</span></td>
        </tr>
        </table></div>

        L'arco $(5,4)$ ha $\bar{c}_{54}=3-(-4)+(-13)=-6<0$: i potenziali non sono ammissibili, ed entrare nel nodo $4$ attraverso $(5,4)$ dà un cammino di lunghezza $7<13=\bar{d}(4)$. Il cammino $1,3,4,6$ di $\bar{T}$ ha lunghezza $20$, maggiore della distanza $14$: non è minimo.

    3. I costi ridotti di $\tilde{\vet{\pi}}$ sono tutti non negativi:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,3)\)</span></th>
        <th><span class="arithmatex">\((1,5)\)</span></th>
        <th><span class="arithmatex">\((2,3)\)</span></th>
        <th><span class="arithmatex">\((3,4)\)</span></th>
        <th><span class="arithmatex">\((3,5)\)</span></th>
        <th><span class="arithmatex">\((4,6)\)</span></th>
        <th><span class="arithmatex">\((5,4)\)</span></th>
        <th><span class="arithmatex">\((6,1)\)</span></th>
        <th><span class="arithmatex">\((6,2)\)</span></th>
        <th><span class="arithmatex">\((6,5)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(d_{ij}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\bar{c}_{ij}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        </tr>
        </table></div>

        Il cammino $1,5,4,6$ usa solo archi stretti, quindi per (S5) è un cammino minimo, di lunghezza $\tilde{\pi}_1-\tilde{\pi}_{6}=14$.

        ![Figura 10](../img/es-shortest-paths/fig10.svg){ .fig loading=lazy  }

    4. Per la dualità debole il vettore di incidenza di $1,5,4,6$, di valore $14$, e $\tilde{\vet{\pi}}$, di valore $\tilde{\pi}_1-\tilde{\pi}_{6}=14$, sono entrambi ottimi: $z(\mathrm{SP}(1,6))=z(D(\mathrm{SP}(1,6)))=14$ (Gurobi lo conferma).

    !!! chiave ""

        Potenziali con un costo ridotto negativo indicano un cammino più corto; potenziali ammissibili con un cammino stretto lo certificano: la distanza da $1$ a $6$ è $14$.
