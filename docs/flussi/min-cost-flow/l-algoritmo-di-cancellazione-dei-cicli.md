---
title: "L'algoritmo di cancellazione dei cicli"
---

# 6.6 L'algoritmo di cancellazione dei cicli { #sez-sec-mc-cycle-canceling }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 6** · [:material-book-open-variant: Capitolo 6: Flusso di costo minimo](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-presentation: Slide](../../pdf/slide-min-cost-flow.pdf) · [:material-pencil: Esercizi: Flusso di costo minimo](../../esercizi/min-cost-flow.md) · [:material-gesture-tap: App: Flusso di costo minimo: cancellazione dei cicli e cammini minimi successivi](../../laboratorio/flusso-di-costo-minimo.md)

</div>

- Il <span style="color:#1971c2">[Teorema 6.7](condizioni-di-ottimalita-dei-cicli-negativi.md#box-9-mc-th-negcycle)</span> suggerisce un algoritmo dovuto a Klein: finché $G(\vet{x})$ ha un ciclo negativo, aumentiamo lungo di esso. Aumentando di $r(W)$ saturiamo un arco di $W$, che esce da $G(\vet{x})$: il ciclo è <strong>cancellato</strong>.

## 6.6.1 Trovare un ciclo negativo

- Un ciclo negativo di $G(\vet{x})$ non è necessariamente raggiungibile da un nodo dato. Eseguiamo l'algoritmo di Bellman–Ford del [Capitolo 3](../../alberi-e-cammini/shortest-paths/l-algoritmo-di-bellmanford.md) da un nuovo nodo $r$ collegato a ogni nodo da un arco di costo $0$; la sua prima passata dà etichetta $0$ a ogni nodo, e scriviamo la tabella da lì.

<a id="box-18-mc-prop-bf"></a>

!!! teorema "Proposizione 6.13: Bellman–Ford sulla rete residua"

    Sia $d^0(j)=0$ per ogni $j \in N$ e, per $k \ge 1$,

    $$
    d^k(j)=\min\Big\{\, d^{k-1}(j),\; \min_{(i,j) \in A(\vet{x})} \big(d^{k-1}(i)+c^x_{ij}\big) \Big\},
    \qquad \forall j \in N .
    $$

    - **(a)** $d^k(j)$ è il costo minimo di una passeggiata di $G(\vet{x})$ con al più $k$ archi che termina in $j$, dove la passeggiata senza archi ha costo $0$.

    - **(b)** $G(\vet{x})$ ha un ciclo negativo se e solo se $d^n \neq d^{n-1}$. In tal caso, se $d^n(j)<d^{n-1}(j)$, i predecessori letti all'indietro a partire da $j$, una riga per passata dalla riga $n$ alla riga $1$, danno una passeggiata di $G(\vet{x})$ con $n$ archi, che termina in $j$ e contiene un ciclo negativo.

    - **(c)** Se $d^k=d^{k-1}$ per qualche $k \le n$, i potenziali $\pi_i=-d^k(i)$ soddisfano $c^x_{ij}-\pi_i+\pi_j \ge 0$ su ogni arco di $G(\vet{x})$.

??? dimostrazione "Dimostrazione"

    Sia $H$ il grafo $G(\vet{x})$ con l'aggiunta del nodo $r$ e degli archi $(r,i)$ di costo $0$, e siano $D^k$ le etichette di Bellman–Ford da $r$ in $H$: $D^1(i)=0$ per ogni $i \in N$, e $D^k(r)=0$ per ogni $k$.

    1. Per induzione su $k$, $D^{k+1}(j)=d^k(j)$ per $j \in N$: le ricorsioni coincidono, e l'arco $(r,j)$ offre $D^k(r)+0=0$, che non abbassa mai il minimo perché $d^{k-1}(j) \le d^0(j)=0$. Una passeggiata da $r$ con $k+1$ archi è un arco $(r,i)$ seguito da una passeggiata di $G(\vet{x})$ con $k$ archi a partire da $i$: questo dimostra (a).

    2. In $H$ ogni nodo è raggiungibile da $r$, e i cicli sono quelli di $G(\vet{x})$. Per il Teorema «rilevazione di un ciclo negativo» del Capitolo 3, applicato agli $n+1$ nodi di $H$, esiste un ciclo negativo se e solo se $D^{n+1} \neq D^{n}$, cioè $d^n \neq d^{n-1}$. La passeggiata da $r$ con $n+1$ archi letta nelle righe $n+1,\dots,2$ di $H$, che sono le nostre righe $n,\dots,1$, contiene un ciclo negativo; senza il suo primo arco $(r,\cdot)$ è una passeggiata di $G(\vet{x})$ con $n$ archi, e il ciclo non contiene $r$. Questo dimostra (b).

    3. Se $d^k=d^{k-1}$, la passata successiva ripete le etichette: $d^k(j) \le d^k(i)+c^x_{ij}$ per ogni arco $(i,j)$ di $G(\vet{x})$, che è (c) con $\pi=-d^k$. <span class="qed">□</span>

- <strong>Regole di questo capitolo.</strong> Gli archi di $G(\vet{x})$ sono esaminati in ordine lessicografico; come nel Capitolo 3, i pareggi nel minimo vanno alla coda più piccola e un predecessore cambia solo quando l'etichetta diminuisce strettamente. Se $d^n \neq d^{n-1}$, $j$ è il nodo più piccolo con $d^n(j)<d^{n-1}(j)$, e il ciclo è il tratto della passeggiata tra le due occorrenze del primo nodo incontrato due volte, leggendo la passeggiata dal suo primo nodo.

- All'arresto i potenziali $\pi_i=-d^k(i)$ sono traslati in modo che $\pi_n=0$.

## 6.6.2 L'algoritmo

!!! algoritmo "Algoritmo: Algoritmo di cancellazione dei cicli"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> una rete bilanciata con <span class="arithmatex">\(\vet{l}=\vet{0}\)</span>, capacità <span class="arithmatex">\(u_{ij}\)</span>, costi <span class="arithmatex">\(c_{ij}\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> un flusso ottimo <span class="arithmatex">\(\vet{x}\)</span> con il suo certificato <span class="arithmatex">\(\vet{\pi}\)</span>, oppure «inammissibile», oppure «illimitato»</div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Passo 0 (avvio).</strong> Se un ciclo di archi con <span class="arithmatex">\(u_{ij}=+\infty\)</span> ha costo negativo, <code>STOP</code>: illimitato.</div><div class="pc" style="--liv:0"><span class="pc-n">2</span>  Trovare un flusso ammissibile <span class="arithmatex">\(\vet{x}\)</span> con un flusso massimo della rete ausiliaria.</div><div class="pc" style="--liv:0"><span class="pc-n">3</span>  Se il suo valore è minore di <span class="arithmatex">\(D\)</span>, <code>STOP</code>: inammissibile.</div><div class="pc" style="--liv:0"><span class="pc-n">4</span><strong>Passo 1 (ciclo negativo).</strong> Eseguire Bellman–Ford su <span class="arithmatex">\(G(\vet{x})\)</span> a partire da <span class="arithmatex">\(d^0=\vet{0}\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">5</span>  Se <span class="arithmatex">\(d^k=d^{k-1}\)</span> per qualche <span class="arithmatex">\(k \le n\)</span>, <code>STOP</code>: <span class="arithmatex">\(\vet{x}\)</span> è ottimo, con <span class="arithmatex">\(\vet{\pi}=-d^k\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">6</span>  Altrimenti leggere un ciclo negativo <span class="arithmatex">\(W\)</span> dalla tabella.</div><div class="pc" style="--liv:0"><span class="pc-n">7</span><strong>Passo 2 (cancellazione).</strong> Aumentare <span class="arithmatex">\(\vet{x}\)</span> lungo <span class="arithmatex">\(W\)</span> di <span class="arithmatex">\(\theta=r(W)\)</span> e andare al Passo 1.</div></div>

- Il test del Passo 0 è la <span style="color:#1971c2">[Proposizione 6.13](#box-18-mc-prop-bf)</span> applicata al grafo degli archi con $u_{ij}=+\infty$ e ai loro costi. Quando il test non scatta, ogni ciclo negativo di $G(\vet{x})$ ha un arco di capacità residua finita (dimostrazione della <span style="color:#1971c2">[Proposizione 6.8](condizioni-di-ottimalita-dei-cicli-negativi.md#box-10-mc-prop-unbounded)</span>), quindi $r(W)<+\infty$ nel Passo 2.

- Nel Passo 0 va bene qualsiasi flusso ammissibile; il flusso massimo è un modo per trovarlo.

<a id="box-19-mc-th-cc"></a>

!!! teorema "Teorema 6.14: correttezza della cancellazione dei cicli"

    Siano interi i bilanci, le capacità e i costi, con capacità eventualmente $+\infty$, e l'algoritmo superi il Passo 0 con un flusso ammissibile intero $\vet{x}^0$. Allora ogni flusso dell'algoritmo è intero e ammissibile, ogni iterazione abbassa il costo di almeno $1$, e l'algoritmo si ferma dopo al più $\vet{c}'\vet{x}^0-z(\mathrm{MCF})$ iterazioni con un flusso ottimo.

??? dimostrazione "Dimostrazione"

    Per la <span style="color:#1971c2">[Proposizione 6.8](condizioni-di-ottimalita-dei-cicli-negativi.md#box-10-mc-prop-unbounded)</span> il modello è limitato, quindi ha un valore ottimo $z(\mathrm{MCF})$.

    1. Se $\vet{x}$ è intero, le capacità residue sono interi positivi o $+\infty$, e $r(W)$ è un intero positivo, perché $r(W)<+\infty$. Per la <span style="color:#1971c2">[Proposizione 6.3](la-rete-residua-con-i-costi.md#box-3-mc-prop-augment)</span> il nuovo flusso è ammissibile e intero.

    2. Il costo cambia di $r(W)\,c(W)$, dove $r(W) \ge 1$ e $c(W) \le -1$ sono interi: diminuisce di almeno $1$.

    3. Il costo parte da $\vet{c}'\vet{x}^0$ e non scende mai sotto $z(\mathrm{MCF})$, quindi le iterazioni sono al più $\vet{c}'\vet{x}^0-z(\mathrm{MCF})$. All'arresto $G(\vet{x})$ non ha cicli negativi (<span style="color:#1971c2">[Proposizione 6.13](#box-18-mc-prop-bf)</span>), e $\vet{x}$ è ottimo per il <span style="color:#1971c2">[Teorema 6.7](condizioni-di-ottimalita-dei-cicli-negativi.md#box-9-mc-th-negcycle)</span>. <span class="qed">□</span>

- <strong>Tempo di esecuzione.</strong> $G(\vet{x})$ ha al più $2m$ archi, quindi il Passo 1 richiede tempo $O(n\,m)$. Con capacità finite, $U=\max u_{ij}$ e $K=\max |c_{ij}|$, ogni flusso costa tra $-mKU$ e $mKU$: al più $2mKU$ iterazioni, e tempo $O(n\,m^2 K U)$.

- Il limite dipende dalla grandezza dei numeri $K$ e $U$, non solo da $n$ e $m$: è un limite <strong>pseudopolinomiale</strong>.

## 6.6.3 La cancellazione dei cicli sulla rete di riferimento

- Sulla rete di riferimento il Passo 0 restituisce $\tilde{\vet{x}}$ (<span style="color:#1971c2">[Esempio 6.5](un-primo-flusso-ammissibile.md#box-17-mc-ex-feasible)</span>), e l'algoritmo si ferma alla prima esecuzione di Bellman–Ford. Per vederlo all'opera partiamo dal flusso più costoso $\vet{x}^0$ dell'<span style="color:#1971c2">[Esempio 6.1](la-rete-residua-con-i-costi.md#box-4-mc-ex-residual)</span>, di costo $80$.

- Nelle tabelle ogni riga è una passata $k$; accanto a un'etichetta che è diminuita, tra parentesi, il suo nuovo predecessore. Le caselle lette all'indietro per trovare la passeggiata sono in grassetto.

<a id="box-20-mc-ex-cc"></a>

!!! esempio "Esempio 6.6: cancellazione dei cicli dal flusso più costoso"

    <strong>Iterazione 1</strong><br> $G(\vet{x}^0)$ è la rete residua dell'<span style="color:#1971c2">[Esempio 6.1](la-rete-residua-con-i-costi.md#box-4-mc-ex-residual)</span>. Bellman–Ford dà:

    $$
    \begin{array}{c|cccccc}
    \hline {k} & {d^k(1)} & {d^k(2)} & {d^k(3)} & {d^k(4)} & {d^k(5)} & {d^k(6)} \\
    \hline {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
    {1} & {-2} ({2}) & {-5} ({4}) & {-3} ({5}) & {\mathbf{-5}} ({\mathbf{6}}) & {-5} ({4}) & {0} \\
    {2} & {-7} ({2}) & {-10} ({4}) & {-8} ({5}) & {-6} ({3}) & {\mathbf{-10}} ({\mathbf{4}}) & {-2} ({5}) \\
    {3} & {-12} ({2}) & {-11} ({4}) & {\mathbf{-13}} ({\mathbf{5}}) & {-11} ({3}) & {-11} ({4}) & {-7} ({5}) \\
    {4} & {-15} ({3}) & {-16} ({4}) & {-14} ({5}) & {\mathbf{-16}} ({\mathbf{3}}) & {-16} ({4}) & {-8} ({5}) \\
    {5} & {-18} ({2}) & {\mathbf{-21}} ({\mathbf{4}}) & {-19} ({5}) & {-17} ({3}) & {-21} ({4}) & {-13} ({5}) \\
    {6} & {\mathbf{-23}} ({\mathbf{2}}) & {-22} ({4}) & {-24} ({5}) & {-22} ({3}) & {-22} ({4}) & {-18} ({5}) \\
    \hline
    \end{array}
    $$

    Tutte le etichette diminuiscono nella passata $6$, quindi $j=1$. Leggendo all'indietro: la riga $6$ dà $2$, la riga $5$ per il nodo $2$ dà $4$, poi $3$, $5$, $4$, $6$. La passeggiata $6,4,5,3,4,2,1$ incontra due volte il nodo $4$: $W=4,5,3,4$, con $c(W)=-11$ e $r(W)=1$. Il nuovo flusso è $\vet{x}^1=(1,4,4,1,3,0,3,2,1)$, di costo $69$.

    <strong>Iterazione 2</strong><br> Gli archi di $W$ cambiano: $(4,5)$ e $(5,3)$ perdono un'unità, $(3,4)$ scompare, e compaiono gli archi in avanti $(3,5)$, $(5,4)$. $G(\vet{x}^1)$ è:

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
    <td>in avanti <span class="arithmatex">\((i,j)\)</span>: <span class="arithmatex">\(r,c\)</span></td>
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
    <td>all'indietro <span class="arithmatex">\((j,i)\)</span>: <span class="arithmatex">\(r,c\)</span></td>
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
    {1} & {-2} ({2}) & {-5} ({4}) & {-3} ({5}) & {\mathbf{-5}} ({\mathbf{6}}) & {-5} ({4}) & {0} \\
    {2} & {-7} ({2}) & {-10} ({4}) & {-8} ({5}) & {-5} & {\mathbf{-10}} ({\mathbf{4}}) & {-2} ({5}) \\
    {3} & {-12} ({2}) & {-10} & {-13} ({5}) & {-7} ({6}) & {-10} & {\mathbf{-7}} ({\mathbf{5}}) \\
    {4} & {-15} ({3}) & {-12} ({4}) & {-13} & {\mathbf{-12}} ({\mathbf{6}}) & {-12} ({4}) & {-7} \\
    {5} & {-15} & {\mathbf{-17}} ({\mathbf{4}}) & {-15} ({5}) & {-12} & {-17} ({4}) & {-9} ({5}) \\
    {6} & {\mathbf{-19}} ({\mathbf{2}}) & {-17} & {-20} ({5}) & {-14} ({6}) & {-17} & {-14} ({5}) \\
    \hline
    \end{array}
    $$

    Ancora $j=1$, e la passeggiata è $6,4,5,6,4,2,1$: $W=6,4,5,6$, formato dagli archi all'indietro di $(4,6)$ e $(5,4)$ e dall'arco in avanti $(5,6)$, con $c(W)=-5-5+3=-7$ e $r(W)=\min\{3,2,1\}=1$. Il nuovo flusso è $\vet{x}^2=(1,4,4,1,3,0,2,1,2)$, di costo $62$.

    <strong>Iterazione 3</strong><br> In $G(\vet{x}^2)$ l'arco $(5,6)$ è saturo: resta solo il suo arco all'indietro $(6,5)$, con $r=2$; gli archi $(6,4)$, $(4,5)$ hanno capacità residue $2$ e $1$, gli archi in avanti $(4,6)$, $(5,4)$ capacità residue $3$ e $2$. Bellman–Ford dà:

    $$
    \begin{array}{c|cccccc}
    \hline {k} & {d^k(1)} & {d^k(2)} & {d^k(3)} & {d^k(4)} & {d^k(5)} & {d^k(6)} \\
    \hline {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
    {1} & {-2} ({2}) & {-5} ({4}) & {-3} ({5}) & {\mathbf{-5}} ({\mathbf{6}}) & {-5} ({4}) & {0} \\
    {2} & {-7} ({2}) & {-10} ({4}) & {-8} ({5}) & {-5} & {\mathbf{-10}} ({\mathbf{4}}) & {0} \\
    {3} & {-12} ({2}) & {-10} & {\mathbf{-13}} ({\mathbf{5}}) & {-5} & {-10} & {0} \\
    {4} & {\mathbf{-15}} ({\mathbf{3}}) & {-11} ({3}) & {-13} & {-5} & {-10} & {0} \\
    {5} & {-15} & {\mathbf{-13}} ({\mathbf{1}}) & {-13} & {-5} & {-10} & {0} \\
    {6} & {-15} & {-13} & {\mathbf{-15}} ({\mathbf{2}}) & {-5} & {-10} & {0} \\
    \hline
    \end{array}
    $$

    Solo il nodo $3$ diminuisce nella passata $6$: $j=3$, e la passeggiata è $6,4,5,3,1,2,3$. Il nodo $3$ compare due volte: $W=3,1,2,3$, formato dall'arco all'indietro di $(1,3)$, dall'arco in avanti $(1,2)$ e dall'arco all'indietro di $(3,2)$, con $c(W)=-2+2-2=-2$ e $r(W)=\min\{4,3,1\}=1$. Il nuovo flusso è $\vet{x}^3=(2,3,4,0,3,0,2,1,2)=\tilde{\vet{x}}$, di costo $60$.

    <strong>Iterazione 4</strong><br> Bellman–Ford su $G(\tilde{\vet{x}})$ ripete le righe $0$–$5$ dell'iterazione $3$, e nella passata $6$ nessuna etichetta diminuisce: $d^6=d^5=(-15,-13,-13,-5,-10,0)$. L'algoritmo si ferma con $\tilde{\vet{x}}$, certificato da $\vet{\pi}=-d^6=(15,13,13,5,10,0)$, già normalizzati con $\pi_6=0$: i potenziali del Capitolo 4.

- In sintesi:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>iterazione</th>
    <th>costo di <span class="arithmatex">\(\vet{x}\)</span></th>
    <th><span class="arithmatex">\(j\)</span></th>
    <th>ciclo <span class="arithmatex">\(W\)</span></th>
    <th><span class="arithmatex">\(c(W)\)</span></th>
    <th><span class="arithmatex">\(r(W)\)</span></th>
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

- Il limite del <span style="color:#1971c2">[Teorema 6.14](#box-19-mc-th-cc)</span> ammette $80-60=20$ iterazioni; ne bastano tre. I tre cicli sono quelli della scomposizione dell'<span style="color:#1971c2">[Esempio 6.2](circolazioni-e-loro-scomposizione.md#box-8-mc-ex-decomp)</span>, trovati in un ordine diverso.

!!! chiave ""

    L'algoritmo di cancellazione dei cicli parte da un flusso ammissibile e cancella i cicli negativi di $G(\vet{x})$, trovati da Bellman–Ford a partire da etichette tutte uguali a $0$. Con dati interi ogni cancellazione abbassa il costo di almeno $1$; all'arresto le etichette danno i potenziali che certificano il flusso ottimo.

---

**Avanti:** [6.7 L'algoritmo dei cammini minimi successivi](l-algoritmo-dei-cammini-minimi-successivi.md)
