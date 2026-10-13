---
title: "L'algoritmo di annullamento del ciclo"
---

# 6.6 L'algoritmo di annullamento del ciclo { #sez-sec-mc-cycle-canceling }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 6** · [:material-book-open-variant: Capitolo 6: Flusso di costo minimo](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-pencil: Esercizi: Flusso di costo minimo](../../esercizi/min-cost-flow.md)

</div>

- <span style="color:#1971c2">[Teorema 6.7](condizioni-di-ottimalita-del-ciclo-negativo.md#box-9-mc-th-negcycle)</span> suggerisce un algoritmo dovuto a Klein: mentre $G(\vet{x})$ ha ciclo negativo, aumenta lungo di esso. L'aumento di $r(W)$ satura un arco di $W$, che lascia $G(\vet{x})$: il ciclo è <strong>annullato</strong>.

## 6.6.1 Trovare un ciclo negativo

- Non è necessario che un ciclo negativo di $G(\vet{x})$ sia raggiungibile da un dato nodo. Eseguiamo l'algoritmo Bellman–Ford di [Capitolo 3](../../alberi-e-cammini/shortest-paths/l-algoritmo-bellmanford.md) da un nuovo nodo $r$ unito ad ogni nodo da un arco di costo $0$; il suo primo passaggio assegna l'etichetta $0$ a ogni nodo e noi scrivi la tabella da lì.

<a id="box-18-mc-prop-bf"></a>

!!! teorema "Proposizione 6.13: Bellman–Ford sulla rete residua"

    Sia $d^0(j)=0$ per ogni $j \in N$ e, per $k \ge 1$,

    $$
    d^k(j)=\min\Big\{\, d^{k-1}(j),\; \min_{(i,j) \in A(\vet{x})} \big(d^{k-1}(i)+c^x_{ij}\big) \Big\},
    \qquad \forall j \in N .
    $$

    - **(a)** $d^k(j)$ è il costo minimo di una cammino di $G(\vet{x})$ con al massimo $k$ archi che termina a $j$, la cammino senza archi con costo $0$.

    - **(b)** $G(\vet{x})$ ha un ciclo negativo se e solo se $d^n \neq d^{n-1}$. In tal caso, se $d^n(j)<d^{n-1}(j)$, i predecessori leggono all'indietro da $j$, una riga per passaggio dalla riga $n$ alla riga $1$, danno una passeggiata di $G(\vet{x})$ con Archi $n$, che terminano in $j$, che contengono un ciclo negativo.

    - **(c)** Se $d^k=d^{k-1}$ per alcuni $k \le n$, i potenziali $\pi_i=-d^k(i)$ soddisfano $c^x_{ij}-\pi_i+\pi_j \ge 0$ su ogni arco di $G(\vet{x})$.

??? dimostrazione "Dimostrazione"

    Sia $H$ $G(\vet{x})$ più il nodo $r$ e gli archi $(r,i)$ di costo $0$, e siano $D^k$ le etichette di Bellman–Ford da $r$ a $H$: $D^1(i)=0$ per ogni $i \in N$ e $D^k(r)=0$ per ogni $k$.

    1. Per induzione su $k$, $D^{k+1}(j)=d^k(j)$ per $j \in N$: le ricorsioni coincidono, e l'arco $(r,j)$ offre $D^k(r)+0=0$, che non abbassa mai il minimo da $d^{k-1}(j) \le d^0(j)=0$. Una passeggiata da $r$ con gli archi $k+1$ è un arco $(r,i)$ seguito da una cammino di $G(\vet{x})$ con archi $k$ da $i$: questo dimostra (a).

    2. In $H$ ogni nodo è raggiungibile da $r$, ed i cicli sono quelli di $G(\vet{x})$. Per il Teorema «rilevazione di a ciclo negativo» del Capitolo 3, applicato ai nodi $n+1$ di $H$, esiste un ciclo negativo se e solo se $D^{n+1} \neq D^{n}$, cioè $d^n \neq d^{n-1}$. La cammino da $r$ con gli archi $n+1$ letti in righe $n+1,\dots,2$ di $H$, quali sono le nostre righe $n,\dots,1$, contiene un ciclo negativo; senza il suo primo arco $(r,\cdot)$ è una passeggiata $G(\vet{x})$ con archi $n$ e il ciclo non contiene $r$. Ciò dimostra (b).

    3. Se $d^k=d^{k-1}$, la passata successiva ripete le etichette: $d^k(j) \le d^k(i)+c^x_{ij}$ per ogni arco $(i,j)$ di $G(\vet{x})$, che è (c) con $\pi=-d^k$. <span class="qed">□</span>

- <strong>Regole di questo capitolo.</strong> Gli archi di $G(\vet{x})$ vengono scanditi in ordine lessicografo; come nel capitolo 3, i legami nel minimo vanno alla coda più piccola e un predecessore cambia solo quando l'etichetta diminuisce rigorosamente. Se $d^n \neq d^{n-1}$, $j$ è il nodo più piccolo con $d^n(j)<d^{n-1}(j)$ e il ciclo è la parte del percorso tra le due occorrenze del primo nodo si sono incontrate due volte, leggendo il cammino dal suo primo nodo.

- Alla fermata i potenziali $\pi_i=-d^k(i)$ vengono spostati in modo che $\pi_n=0$.

## 6.6.2 L'algoritmo

!!! algoritmo "Algoritmo: Algoritmo di annullamento ciclo"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> una rete bilanciata con <span class="arithmatex">\(\vet{l}=\vet{0}\)</span>, capacità <span class="arithmatex">\(u_{ij}\)</span>, costi <span class="arithmatex">\(c_{ij}\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> un flusso ottimale <span class="arithmatex">\(\vet{x}\)</span> con il suo certificato <span class="arithmatex">\(\vet{\pi}\)</span>, o «irrealizzabile», o «illimitato»</div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Passo 0 (inizio).</strong> Se un ciclo di archi con <span class="arithmatex">\(u_{ij}=+\infty\)</span> ha costo negativo, <code>STOP</code>: illimitato.</div><div class="pc" style="--liv:0"><span class="pc-n">2</span>  Trovare un flusso ammissibile <span class="arithmatex">\(\vet{x}\)</span> con un flusso massimo della rete ausiliaria.</div><div class="pc" style="--liv:0"><span class="pc-n">3</span>  Se il suo valore è inferiore a <span class="arithmatex">\(D\)</span>, <code>STOP</code>: impossibile.</div><div class="pc" style="--liv:0"><span class="pc-n">4</span><strong>Passaggio 1 (ciclo negativo).</strong> Esegui Bellman–Ford su <span class="arithmatex">\(G(\vet{x})\)</span> da <span class="arithmatex">\(d^0=\vet{0}\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">5</span>  Se <span class="arithmatex">\(d^k=d^{k-1}\)</span> per alcuni <span class="arithmatex">\(k \le n\)</span>, <code>STOP</code>: <span class="arithmatex">\(\vet{x}\)</span> è ottimale, con <span class="arithmatex">\(\vet{\pi}=-d^k\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">6</span>  Altrimenti leggere un ciclo negativo <span class="arithmatex">\(W\)</span> dalla tabella.</div><div class="pc" style="--liv:0"><span class="pc-n">7</span><strong>Passaggio 2 (annulla).</strong> Aumenta <span class="arithmatex">\(\vet{x}\)</span> insieme a <span class="arithmatex">\(W\)</span> con <span class="arithmatex">\(\theta=r(W)\)</span> e vai al passaggio 1.</div></div>

- Il test del Passo 0 è <span style="color:#1971c2">[Proposizione 6.13](#box-18-mc-prop-bf)</span> applicato al grafo degli archi con $u_{ij}=+\infty$ e relativi costi. Quando fallisce, ogni ciclo negativo di $G(\vet{x})$ ha un arco di residuo finito capacità (prova di <span style="color:#1971c2">[Proposizione 6.8](condizioni-di-ottimalita-del-ciclo-negativo.md#box-10-mc-prop-unbounded)</span>), quindi $r(W)<+\infty$ nel passaggio 2.

- Qualsiasi flusso fattibile può essere utilizzato nel passaggio 0; il flusso massimo è un modo per trovarlo.

<a id="box-19-mc-th-cc"></a>

!!! teorema "Teorema 6.14: correttezza annullamento ciclo"

    Siano interi i saldi, le capacità ed i costi, con capacità possibilmente $+\infty$, e si lasci che l'algoritmo superare il passo 0 con un flusso ammissibile intero $\vet{x}^0$. Allora ogni flusso dell'algoritmo è intero e ammissibile, ogni l'iterazione riduce il costo almeno di $1$ e l'algoritmo si ferma al massimo dopo $\vet{c}'\vet{x}^0-z(\mathrm{MCF})$ iterazioni con un flusso ottimale.

??? dimostrazione "Dimostrazione"

    Con <span style="color:#1971c2">[Proposizione 6.8](condizioni-di-ottimalita-del-ciclo-negativo.md#box-10-mc-prop-unbounded)</span> il modello è limitato, quindi ha un valore ottimale $z(\mathrm{MCF})$.

    1. Se $\vet{x}$ è un numero intero, le capacità residue sono numeri interi positivi o $+\infty$ e $r(W)$ è un valore positivo intero, poiché $r(W)<+\infty$. Per <span style="color:#1971c2">[Proposizione 6.3](la-rete-residua-con-i-costi.md#box-3-mc-prop-augment)</span> il nuovo flusso è fattibile e intero.

    2. Il costo varia di $r(W)\,c(W)$, dove $r(W) \ge 1$ e $c(W) \le -1$ sono numeri interi: diminuisce di almeno $1$.

    3. Il costo parte da $\vet{c}'\vet{x}^0$ e non scende mai sotto $z(\mathrm{MCF})$, quindi ci sono al massimo Iterazioni $\vet{c}'\vet{x}^0-z(\mathrm{MCF})$. Alla fermata $G(\vet{x})$ non ha ciclo negativo (<span style="color:#1971c2">[Proposizione 6.13](#box-18-mc-prop-bf)</span>) e $\vet{x}$ è ottimale per <span style="color:#1971c2">[Teorema 6.7](condizioni-di-ottimalita-del-ciclo-negativo.md#box-9-mc-th-negcycle)</span>. <span class="qed">□</span>

- <strong>Tempo di esecuzione.</strong> $G(\vet{x})$ ha al massimo archi $2m$, quindi il passaggio 1 richiede tempo $O(n\,m)$. Con finito capacità, $U=\max u_{ij}$ e $K=\max |c_{ij}|$, ogni flusso costa tra $-mKU$ e $mKU$: al massimo $2mKU$ iterazioni e tempo $O(n\,m^2 K U)$.

- Il limite dipende dalla dimensione dei numeri $K$ e $U$, non solo da $n$ e $m$: è un Limite <strong>pseudo-polinomio</strong>.

## 6.6.3 Annullamento ciclo sulla rete di riferimento

- Sulla rete di riferimento il passo 0 restituisce $\tilde{\vet{x}}$ (<span style="color:#1971c2">[Esempio 6.5](un-primo-flusso-fattibile.md#box-17-mc-ex-feasible)</span>) e il l'algoritmo si ferma alla prima corsa Bellman-Ford. Per vederlo all'opera partiamo dal flusso più costoso $\vet{x}^0$ di <span style="color:#1971c2">[Esempio 6.1](la-rete-residua-con-i-costi.md#box-4-mc-ex-residual)</span>, di costo $80$.

- Nelle tabelle ogni riga è una tessera $k$; accanto a un'etichetta diminuita, il suo nuovo predecessore tra parentesi. Il le voci lette al contrario per trovare la passeggiata sono in grassetto.

<a id="box-20-mc-ex-cc"></a>

!!! esempio "Esempio 6.6: ciclo di annullamento dal flusso più costoso"

    <strong>Iterazione 1</strong><br> $G(\vet{x}^0)$ è la rete residua di <span style="color:#1971c2">[Esempio 6.1](la-rete-residua-con-i-costi.md#box-4-mc-ex-residual)</span>. Bellman–Ford fornisce:

    $$
    \begin{array}{c|cccccc}
    \hline {k} & {d^k(1)} & {d^k(2)} & {d^k(3)} & {d^k(4)} & {d^k(5)} & {d^k(6)} \\
    \hline {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
    {1}\text{ e }{-2} ({2}\text{) e }{-5} ({4}\text{) e }{-3} ({5}\text{) e }{\mathbf{-5}} ({\mathbf{6}}\text{) e }{-5} ({4}) & {0} \\
    {2}\text{ e }{-7} ({2}\text{) e }{-10} ({4}\text{) e }{-8} ({5}\text{) e }{-6} ({3}\text{) e }{\mathbf{-10}} ({\mathbf{4}}\text{) e }{-2} ({5}) \\
    {3}\text{ e }{-12} ({2}\text{) e }{-11} ({4}\text{) e }{\mathbf{-13}} ({\mathbf{5}}\text{) e }{-11} ({3}\text{) e }{-11} ({4}\text{) e }{-7} ({5}) \\
    {4}\text{ e }{-15} ({3}\text{) e }{-16} ({4}\text{) e }{-14} ({5}\text{) e }{\mathbf{-16}} ({\mathbf{3}}\text{) e }{-16} ({4}\text{) e }{-8} ({5}) \\
    {5}\text{ e }{-18} ({2}\text{) e }{\mathbf{-21}} ({\mathbf{4}}\text{) e }{-19} ({5}\text{) e }{-17} ({3}\text{) e }{-21} ({4}\text{) e }{-13} ({5}) \\
    {6}\text{ e }{\mathbf{-23}} ({\mathbf{2}}\text{) e }{-22} ({4}\text{) e }{-24} ({5}\text{) e }{-22} ({3}\text{) e }{-22} ({4}) & {-18} ({5}) \\
    \hline
    \end{array}
    $$

    Tutte le etichette diminuiscono nel passaggio $6$, quindi $j=1$. Leggendo all'indietro: la riga $6$ dà $2$, la riga $5$ per il nodo $2$ dà $4$, quindi $3$, $5$, $4$, $6$. La passeggiata $6,4,5,3,4,2,1$ incontra il nodo $4$ due volte: $W=4,5,3,4$, con $c(W)=-11$ e $r(W)=1$. Il il nuovo flusso è $\vet{x}^1=(1,4,4,1,3,0,3,2,1)$, di costo $69$.

    <strong>Iterazione 2</strong><br> Gli archi di $W$ cambiano: $(4,5)$ e $(5,3)$ perdono un'unità, $(3,4)$ scompare e gli archi in avanti Vengono visualizzati $(3,5)$, $(5,4)$. $G(\vet{x}^1)$ è:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>arco <span class="arithmatex">\((i,j)\)</span></th>
    <th><span class="arithmatex">\((1,2)\)</span></th>
    <th><span class="arithmatex">\((1,3)\)</span></th>
    <th><span class="arithmatex">\((2,4)\)</span></th>
    <th><span class="arithmatex">\((3,2)\)</span></th>
    <th><span class="arithmatex">\((3,5)\)</span></th>
    <th><span class="arithmatex">\((4,3)\)</span></th>
    <th><span class="arithmatex">\((4,6)\)</span></th>
    <th><span class="arithmatex">\((5,4)\)</span></th>
    <th><span class="arithmatex">\((5,6)\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(x^1_{ij}\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    </tr>
    <tr>
    <td>avanti <span class="arithmatex">\((i,j)\)</span>: <span class="arithmatex">\(r,c\)</span></td>
    <td><span class="arithmatex">\(3,2\)</span></td>
    <td>–</td>
    <td>–</td>
    <td><span class="arithmatex">\(1,2\)</span></td>
    <td><span class="arithmatex">\(1,3\)</span></td>
    <td><span class="arithmatex">\(3,3\)</span></td>
    <td><span class="arithmatex">\(2,5\)</span></td>
    <td><span class="arithmatex">\(1,5\)</span></td>
    <td><span class="arithmatex">\(1,3\)</span></td>
    </tr>
    <tr>
    <td>indietro <span class="arithmatex">\((j,i)\)</span>: <span class="arithmatex">\(r,c\)</span></td>
    <td><span class="arithmatex">\(1,-2\)</span></td>
    <td><span class="arithmatex">\(4,-2\)</span></td>
    <td><span class="arithmatex">\(4,-5\)</span></td>
    <td><span class="arithmatex">\(1,-2\)</span></td>
    <td><span class="arithmatex">\(3,-3\)</span></td>
    <td>–</td>
    <td><span class="arithmatex">\(3,-5\)</span></td>
    <td><span class="arithmatex">\(2,-5\)</span></td>
    <td><span class="arithmatex">\(1,-3\)</span></td>
    </tr>
    </table></div>

    $$
    \begin{array}{c|cccccc}
    \hline {k} & {d^k(1)} & {d^k(2)} & {d^k(3)} & {d^k(4)} & {d^k(5)} & {d^k(6)} \\
    \hline {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
    {1}\text{ e }{-2} ({2}\text{) e }{-5} ({4}\text{) e }{-3} ({5}\text{) e }{\mathbf{-5}} ({\mathbf{6}}\text{) e }{-5} ({4}) & {0} \\
    {2}\text{ e }{-7} ({2}\text{) e }{-10} ({4}\text{) e }{-8} ({5}\text{) e }{-5}\text{ e }{\mathbf{-10}} ({\mathbf{4}}) & {-2} ({5}) \\
    {3}\text{ e }{-12} ({2}\text{) e }{-10}\text{ e }{-13} ({5}\text{) e }{-7} ({6}\text{) e }{-10} & {\mathbf{-7}} ({\mathbf{5}}) \\
    {4}\text{ e }{-15} ({3}\text{) e }{-12} ({4}\text{) e }{-13}\text{ e }{\mathbf{-12}} ({\mathbf{6}}\text{) e }{-12} ({4}) & {-7} \\
    {5}\text{ e }{-15}\text{ e }{\mathbf{-17}} ({\mathbf{4}}\text{) e }{-15} ({5}\text{) e }{-12}\text{ e }{-17} ({4}) & {-9} ({5}) \\
    {6}\text{ e }{\mathbf{-19}} ({\mathbf{2}}\text{) e }{-17}\text{ e }{-20} ({5}\text{) e }{-14} ({6}\text{) e }{-17} & {-14} ({5}) \\
    \hline
    \end{array}
    $$

    Ancora $j=1$, e il cammino è $6,4,5,6,4,2,1$: $W=6,4,5,6$, formato dagli archi all'indietro di $(4,6)$ e $(5,4)$ e da l'arco in avanti $(5,6)$, con $c(W)=-5-5+3=-7$ e $r(W)=\min\{3,2,1\}=1$. Il nuovo flusso è $\vet{x}^2=(1,4,4,1,3,0,2,1,2)$, di costo $62$.

    <strong>Iterazione 3</strong><br> In $G(\vet{x}^2)$ l'arco $(5,6)$ è saturo: rimane solo il suo arco all'indietro $(6,5)$, con $r=2$, e gli archi $(6,4)$, $(4,5)$ hanno capacità residue $2$ e $1$, gli archi in avanti $(4,6)$, $(5,4)$ residui capacità $3$ e $2$. Bellman–Ford fornisce:

    $$
    \begin{array}{c|cccccc}
    \hline {k} & {d^k(1)} & {d^k(2)} & {d^k(3)} & {d^k(4)} & {d^k(5)} & {d^k(6)} \\
    \hline {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
    {1}\text{ e }{-2} ({2}\text{) e }{-5} ({4}\text{) e }{-3} ({5}\text{) e }{\mathbf{-5}} ({\mathbf{6}}\text{) e }{-5} ({4}) & {0} \\
    {2}\text{ e }{-7} ({2}\text{) e }{-10} ({4}\text{) e }{-8} ({5}\text{) e }{-5}\text{ e }{\mathbf{-10}} ({\mathbf{4}}) & {0} \\
    {3} & {-12} ({2}) & {-10} & {\mathbf{-13}} ({\mathbf{5}}) & {-5} & {-10} & {0} \\
    {4} & {\mathbf{-15}} ({\mathbf{3}}) & {-11} ({3}) & {-13} & {-5} & {-10} & {0} \\
    {5} & {-15} & {\mathbf{-13}} ({\mathbf{1}}) & {-13} & {-5} & {-10} & {0} \\
    {6} & {-15} & {-13} & {\mathbf{-15}} ({\mathbf{2}}) & {-5} & {-10} & {0} \\
    \hline
    \end{array}
    $$

    Solo il nodo $3$ diminuisce nel passaggio $6$: $j=3$ e la cammino è $6,4,5,3,1,2,3$. Il nodo $3$ è soddisfatto due volte: $W=3,1,2,3$, realizzato dell'arco all'indietro di $(1,3)$, dell'arco in avanti $(1,2)$ e dell'arco all'indietro di $(3,2)$, con $c(W)=-2+2-2=-2$ e $r(W)=\min\{4,3,1\}=1$. Il nuovo flusso è $\vet{x}^3=(2,3,4,0,3,0,2,1,2)=\tilde{\vet{x}}$, di costo $60$.

    <strong>Iterazione 4</strong><br> Bellman–Ford su $G(\tilde{\vet{x}})$ ripete le righe $0$–$5$ dell'iterazione $3$ e nel passaggio $6$ no l'etichetta diminuisce: $d^6=d^5=(-15,-13,-13,-5,-10,0)$. L'algoritmo si ferma con $\tilde{\vet{x}}$, certificato da $\vet{\pi}=-d^6=(15,13,13,5,10,0)$, già normalizzato con $\pi_6=0$: le potenzialità del capitolo 4.

- In sintesi:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>iterazione e costo di <span class="arithmatex">\(\vet{x}\)</span> e <span class="arithmatex">\(j\)</span> e ciclo <span class="arithmatex">\(W\)</span> e <span class="arithmatex">\(c(W)\)</span> e <span class="arithmatex">\(r(W)\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(80\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(4,5,3,4\)</span></td>
    <td><span class="arithmatex">\(-11\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(69\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(6,4,5,6\)</span></td>
    <td><span class="arithmatex">\(-7\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(62\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(3,1,2,3\)</span></td>
    <td><span class="arithmatex">\(-2\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(60\)</span></td>
    <td>–</td>
    <td>nessun ciclo negativo</td>
    <td>–</td>
    <td>–</td>
    </tr>
    </table></div>

- Il limite di <span style="color:#1971c2">[Teorema 6.14](#box-19-mc-th-cc)</span> consente le iterazioni $80-60=20$; ne bastano tre. I tre i cicli sono i cicli della scomposizione di <span style="color:#1971c2">[Esempio 6.2](circolazioni-e-loro-scomposizione.md#box-8-mc-ex-decomp)</span>, trovati in un ordine diverso.

!!! chiave ""

    L'algoritmo di annullamento del ciclo parte da un flusso ammissibile e annulla i cicli negativi di $G(\vet{x})$, trovati da Bellman–Ford dalle etichette tutte uguali a $0$. Con dati interi ogni cancellazione abbassa il costo di almeno $1$; a allo stop le etichette danno le potenzialità che certificano il flusso ottimale.

---

**Avanti:** [6.7 L'algoritmo del percorso più breve successivo](l-algoritmo-del-percorso-piu-breve-successivo.md)
