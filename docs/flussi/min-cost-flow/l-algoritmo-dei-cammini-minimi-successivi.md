---
title: "L'algoritmo dei cammini minimi successivi"
---

# 6.7 L'algoritmo dei cammini minimi successivi

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 6** · [:material-book-open-variant: Capitolo 6: Flusso di costo minimo](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-presentation: Slide](../../pdf/slide-min-cost-flow.pdf) · [:material-pencil: Esercizi: Flusso di costo minimo](../../esercizi/min-cost-flow.md) · [:material-gesture-tap: App: Flusso di costo minimo: cancellazione dei cicli e cammini minimi successivi](../../laboratorio/flusso-di-costo-minimo.md)

</div>

<a id="sez-sec-mc-ssp"></a>

<a id="box-21-mc-def-pseudo"></a>

!!! definizione "Definizione 6.15: pseudoflusso e squilibri"

    Uno <strong>pseudoflusso</strong> è un vettore $\vet{x}$ con $\vet{l} \le \vet{x} \le \vet{u}$, che può violare la conservazione del flusso. Lo <strong>squilibrio</strong> del nodo $i$ è

    $$
    e_i=b_i-\Big(\sum_{(i,j) \in \delta^+(i)} x_{ij}-\sum_{(j,i) \in \delta^-(i)} x_{ji}\Big):
    $$

    l'offerta che $i$ deve ancora mandare se $e_i>0$ (un <strong>nodo in eccesso</strong>), la domanda che deve ancora ricevere se $e_i<0$ (un <strong>nodo in deficit</strong>).

- Uno pseudoflusso è un flusso ammissibile esattamente quando $\vet{e}=\vet{0}$. Gli squilibri hanno somma zero, perché i bilanci hanno somma zero e ogni arco aggiunge $x_{ij}$ alla sua coda e lo sottrae alla sua testa.

- La rete residua $G(\vet{x})$ di uno pseudoflusso si definisce come nella <span style="color:#1971c2">[Definizione 6.1](la-rete-residua-con-i-costi.md#box-1-mc-def-residual)</span>. Aumentare $\vet{x}$ lungo un cammino $P$ di $G(\vet{x})$ da $s$ a $t$ di $\delta \le r(P)=\min_{(i,j) \in P}r_{ij}$ si definisce come per i cicli: i limiti restano soddisfatti, $e_s$ diminuisce di $\delta$, $e_t$ aumenta di $\delta$, e il costo cresce di $\delta\, c(P)$, dove $c(P)=\sum_{(i,j) \in P} c^x_{ij}$.

- L'idea è mantenere potenziali con costi ridotti non negativi su $G(\vet{x})$, la condizione del <span style="color:#1971c2">[Teorema 6.9](condizioni-di-ottimalita-con-i-potenziali.md#box-12-mc-th-potentials)</span>, mentre gli squilibri vanno a zero. Con $\vet{x}=\vet{0}$, $\vet{\pi}= \vet{0}$ e costi $c_{ij} \ge 0$ la condizione vale all'inizio.

<a id="box-22-mc-lem-ssp"></a>

!!! teorema "Lemma 6.16: i cammini minimi mantengono non negativi i costi ridotti"

    Sia $\vet{x}$ uno pseudoflusso e siano $\vet{\pi}$ potenziali con $\bar{c}^{\pi}_{ij}=c^x_{ij}-\pi_i+\pi_j \ge 0$ su ogni arco di $G(\vet{x})$. Siano $d(i)$ le distanze da un nodo $s$ in $G(\vet{x})$ con le lunghezze $\bar{c}^{\pi}$ ($d(i)=+\infty$ se $i$ non è raggiungibile), $t$ un nodo con $d(t)<+\infty$, $P$ un cammino minimo da $s$ a $t$, e

    $$
    \pi'_i=\pi_i-\min\{d(i),d(t)\}, \qquad \forall i \in N .
    $$

    - **(a)** $c^x_{ij}-\pi'_i+\pi'_j \ge 0$ su ogni arco di $G(\vet{x})$.

    - **(b)** $c^x_{ij}-\pi'_i+\pi'_j=0$ su ogni arco di $P$.

    - **(c)** Se $\vet{x}'$ è $\vet{x}$ aumentato lungo $P$ di $\delta \le r(P)$, allora $c^{x'}_{ij}-\pi'_i+\pi'_j \ge 0$ su ogni arco di $G(\vet{x}')$.

??? dimostrazione "Dimostrazione"

    Sia $\hat{d}(i)=\min\{d(i),d(t)\}$. Il costo ridotto di $(i,j)$ con $\vet{\pi}'$ è $\bar{c}^{\pi}_{ij}+\hat{d}(i)- \hat{d}(j)$.

    - **(a)** Sia $(i,j)$ un arco di $G(\vet{x})$. Se $d(i)<+\infty$, un cammino minimo fino a $i$ seguito da $(i,j)$ dà $d(j) \le d(i)+\bar{c}^{\pi}_{ij}$, quindi $\hat{d}(j) \le \min\{d(i)+\bar{c}^{\pi}_{ij},\,d(t)\} \le \hat{d}(i)+ \bar{c}^{\pi}_{ij}$, perché $\bar{c}^{\pi}_{ij} \ge 0$. Se $d(i)=+\infty$, allora $\hat{d}(i)=d(t) \ge \hat{d}(j)$. In entrambi i casi il nuovo costo ridotto è non negativo.

    - **(b)** I sottocammini di $P$ sono minimi (Lemma «ottimalità dei sottocammini» del Capitolo 3), quindi $d(j)=d(i)+ \bar{c}^{\pi}_{ij}$ su ogni arco di $P$, e $d(i) \le d(t)$ lungo $P$ perché le lunghezze sono non negative. Quindi $\hat{d}=d$ su $P$, e il nuovo costo ridotto è $0$.

    - **(c)** Aumentare lungo $P$ cambia $G(\vet{x})$ solo sugli archi di $P$: un arco $(i,j)$ di $P$ può scomparire, e può comparire l'arco opposto $(j,i)$. L'opposto di un arco residuo ha il costo opposto, quindi per (b) costo ridotto $0$; gli altri archi mantengono i loro costi ridotti, non negativi per (a).

    <p class="qed-riga"><span class="qed">□</span></p>

- Per ogni cammino $P$ da $s$ a $t$ i potenziali danno una somma telescopica: $\sum_{(i,j) \in P}\bar{c}^{\pi}_{ij}=c(P)-\pi_s+ \pi_t$. Un cammino minimo per i costi ridotti è un cammino di costo minimo di $G(\vet{x})$: il flusso viaggia lungo i cammini più economici, da cui il nome dell'algoritmo.

!!! algoritmo "Algoritmo: Algoritmo dei cammini minimi successivi"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> una rete bilanciata con <span class="arithmatex">\(\vet{l}=\vet{0}\)</span>, <span class="arithmatex">\(b_i\)</span> e <span class="arithmatex">\(u_{ij}\)</span> interi, costi <span class="arithmatex">\(c_{ij} \ge 0\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> un flusso ottimo <span class="arithmatex">\(\vet{x}\)</span> con il suo certificato <span class="arithmatex">\(\vet{\pi}\)</span>, oppure «inammissibile»</div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Passo 0 (inizializzazione).</strong> Porre <span class="arithmatex">\(\vet{x}:=\vet{0}\)</span>, <span class="arithmatex">\(\vet{\pi}:=\vet{0}\)</span> e <span class="arithmatex">\(\vet{e}:=\vet{b}\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">2</span><strong>Passo 1 (selezione).</strong> Se <span class="arithmatex">\(\vet{e}=\vet{0}\)</span>, <code>STOP</code>: <span class="arithmatex">\(\vet{x}\)</span> è ottimo, con <span class="arithmatex">\(\vet{\pi}\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">3</span>  Altrimenti sia <span class="arithmatex">\(s\)</span> il nodo di indice minimo con <span class="arithmatex">\(e_s>0\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">4</span><strong>Passo 2 (cammini minimi).</strong> Eseguire Dijkstra da <span class="arithmatex">\(s\)</span> su <span class="arithmatex">\(G(\vet{x})\)</span>, lunghezze <span class="arithmatex">\(c^x_{ij}-\pi_i+\pi_j\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">5</span>  Se nessun nodo con <span class="arithmatex">\(e_t<0\)</span> è raggiungibile, <code>STOP</code>: inammissibile.</div><div class="pc" style="--liv:0"><span class="pc-n">6</span>  Altrimenti <span class="arithmatex">\(t\)</span> è il nodo raggiungibile con <span class="arithmatex">\(e_t<0\)</span> e <span class="arithmatex">\(d(t)\)</span> minima, e <span class="arithmatex">\(P\)</span> il suo cammino.</div><div class="pc" style="--liv:0"><span class="pc-n">7</span><strong>Passo 3 (aumento).</strong> Porre <span class="arithmatex">\(\pi_i:=\pi_i-\min\{d(i),d(t)\}\)</span> per ogni <span class="arithmatex">\(i \in N\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">8</span>  Aumentare <span class="arithmatex">\(\vet{x}\)</span> lungo <span class="arithmatex">\(P\)</span> di <span class="arithmatex">\(\delta:=\min\{e_s,-e_t,r(P)\}\)</span>, e aggiornare <span class="arithmatex">\(e_s\)</span>, <span class="arithmatex">\(e_t\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">9</span>  Andare al Passo 1.</div></div>

- <strong>Regole di questo capitolo.</strong> L'algoritmo di Dijkstra risolve i pareggi con l'indice minimo, come nel Capitolo 3; tra i nodi in deficit alla stessa distanza, $t$ è quello di indice minimo.

<a id="box-23-mc-th-ssp"></a>

!!! teorema "Teorema 6.17: correttezza dell'algoritmo dei cammini minimi successivi"

    Con i dati di ingresso dell'algoritmo, all'inizio di ogni iterazione $\vet{x}$ è uno pseudoflusso intero e $c^x_{ij}-\pi_i+\pi_j \ge 0$ su ogni arco di $G(\vet{x})$. L'algoritmo si ferma dopo al più $D=\sum_{i: b_i>0}b_i$ iterazioni. Se si ferma al Passo 1, $\vet{x}$ è un flusso ottimo; se si ferma al Passo 2, la rete non ha flussi ammissibili.

??? dimostrazione "Dimostrazione"

    Dimostriamo l'invariante, poi il limite sulle iterazioni e i due arresti.

    1. <em>Invariante.</em> All'inizio $G(\vet{0})$ ha solo gli archi in avanti, con costi $c_{ij} \ge 0$, e $\vet{\pi}=\vet{0}$. L'algoritmo di Dijkstra si può applicare, perché le lunghezze sono non negative, e il <span style="color:#1971c2">[Lemma 6.16](#box-22-mc-lem-ssp)</span>(c) mantiene non negativi i costi ridotti. La quantità $\delta$ è un intero positivo, perché $e_s$, $-e_t$ e le capacità residue sono interi positivi (o $+\infty$), quindi $\vet{x}$ resta intero.

    2. <em>Limite.</em> Se $e_s>0$, qualche nodo ha $e_t<0$, perché gli squilibri hanno somma zero. Ogni iterazione abbassa $\sum_{i: e_i>0}e_i$ di $\delta \ge 1$, e nessuno squilibrio cambia segno, perché $\delta \le e_s$ e $\delta \le -e_t$. La somma parte da $D$.

    3. <em>Arresto al Passo 1.</em> $\vet{e}=\vet{0}$, quindi $\vet{x}$ è un flusso ammissibile, ottimo per l'invariante e il <span style="color:#1971c2">[Teorema 6.9](condizioni-di-ottimalita-con-i-potenziali.md#box-12-mc-th-potentials)</span>.

    4. <em>Arresto al Passo 2.</em> Sia $S$ l'insieme dei nodi raggiungibili da $s$. Nessun arco di $G(\vet{x})$ esce da $S$, quindi $x_{ij}=u_{ij}$ su $\delta^+(S)$ e $x_{ij}=0$ su $\delta^-(S)$. Lo pseudoflusso soddisfa la conservazione con i bilanci $b_i-e_i$, quindi per il Lemma «flusso attraverso un taglio» del Capitolo 4

        $$
        \sum_{i \in S} b_i=x(\delta^+(S))-x(\delta^-(S))+\sum_{i \in S} e_i=u(\delta^+(S))+\sum_{i \in S}e_i>u(\delta^+(S)),
        $$

        perché $e_s>0$ e nessun nodo di $S$ ha $e_i<0$. La condizione sui tagli del Capitolo 4 è violata da $S$: non esistono flussi ammissibili.

    <p class="qed-riga"><span class="qed">□</span></p>

- <strong>Tempo di esecuzione.</strong> Ogni iterazione esegue l'algoritmo di Dijkstra in tempo $O(n^2)$: $O(D\,n^2)$ in totale, un limite pseudopolinomiale.

- <strong>Costi negativi.</strong> Se alcuni archi di capacità finita hanno $c_{ij}<0$, si parte da $x_{ij}=u_{ij}$ su questi archi e $x_{ij}=0$ altrove, con $\vet{e}=\vet{b}-\mat{B}\vet{x}$: un arco di questo tipo dà solo il suo arco all'indietro, di costo $-c_{ij}>0$, e $\vet{\pi}=\vet{0}$ funziona di nuovo.

### 6.7.1 I cammini minimi successivi sulla rete di riferimento

<a id="box-24-mc-ex-ssp"></a>

!!! esempio "Esempio 6.7: cammini minimi successivi"

    Partiamo da $\vet{x}=\vet{0}$, $\vet{\pi}=\vet{0}$ e $\vet{e}=\vet{b}=(5,2,0,-3,0,-4)$. Nella prima tabella ogni riga è un'iterazione, con il nodo $s$, le distanze dell'algoritmo di Dijkstra e il nodo $t$; la seconda tabella dà il cammino $P$, il suo costo ridotto $d(t)$ e il suo costo $c(P)$, la quantità $\delta$ e il costo del nuovo flusso.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>it.</th>
    <th><span class="arithmatex">\(s\)</span></th>
    <th><span class="arithmatex">\(d(1)\)</span></th>
    <th><span class="arithmatex">\(d(2)\)</span></th>
    <th><span class="arithmatex">\(d(3)\)</span></th>
    <th><span class="arithmatex">\(d(4)\)</span></th>
    <th><span class="arithmatex">\(d(5)\)</span></th>
    <th><span class="arithmatex">\(d(6)\)</span></th>
    <th><span class="arithmatex">\(t\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(8\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    </tr>
    </table></div>

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>it.</th>
    <th><span class="arithmatex">\(P\)</span></th>
    <th><span class="arithmatex">\(d(t)\)</span></th>
    <th><span class="arithmatex">\(c(P)\)</span></th>
    <th><span class="arithmatex">\(\delta\)</span></th>
    <th>costo</th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(1,2,4\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(21\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(1,3,5,6\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(8\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(37\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(2,4,6\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(47\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(2,1,3,5,4,6\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(13\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(60\)</span></td>
    </tr>
    </table></div>

    La terza tabella dà, dopo ogni iterazione, i potenziali, gli squilibri e il flusso.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>it.</th>
    <th><span class="arithmatex">\(\vet{\pi}\)</span></th>
    <th><span class="arithmatex">\(\vet{e}\)</span></th>
    <th><span class="arithmatex">\(\vet{x}\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\((0,0,0,0,0,0)\)</span></td>
    <td><span class="arithmatex">\((5,2,0,-3,0,-4)\)</span></td>
    <td><span class="arithmatex">\((0,0,0,0,0,0,0,0,0)\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\((0,-2,-2,-7,-5,-7)\)</span></td>
    <td><span class="arithmatex">\((2,2,0,0,0,-4)\)</span></td>
    <td><span class="arithmatex">\((3,0,3,0,0,0,0,0,0)\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\((0,-2,-2,-7,-5,-8)\)</span></td>
    <td><span class="arithmatex">\((0,2,0,0,0,-2)\)</span></td>
    <td><span class="arithmatex">\((3,2,3,0,2,0,0,0,2)\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\((0,-2,-2,-7,-5,-12)\)</span></td>
    <td><span class="arithmatex">\((0,1,0,0,0,-1)\)</span></td>
    <td><span class="arithmatex">\((3,2,4,0,2,0,1,0,2)\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\((0,-2,-2,-10,-5,-15)\)</span></td>
    <td><span class="arithmatex">\((0,0,0,0,0,0)\)</span></td>
    <td><span class="arithmatex">\((2,3,4,0,3,0,2,1,2)\)</span></td>
    </tr>
    </table></div>

    I costi ridotti $\bar{c}_{ij}=c_{ij}-\pi_i+\pi_j$ degli archi di $A$, prima di ogni iterazione, sono (l'arco in avanti ha $\bar{c}_{ij}$ se $x_{ij}<u_{ij}$, l'arco all'indietro $-\bar{c}_{ij}$ se $x_{ij}>0$):

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>it.</th>
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
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(8\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(8\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(8\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(-4\)</span></td>
    </tr>
    </table></div>

    - <em>Iterazione $1$.</em> I costi ridotti sono i costi. I nodi in deficit $4$ e $6$ sono a distanza $7$ e $8$: $t=4$, e $\delta=\min\{5,3,4,4\}=3$. Il nodo $6$ è più lontano di $t$ e il suo potenziale diminuisce di $7$, non di $8$.

    - <em>Iterazione $2$.</em> Gli archi $(1,2)$, $(2,4)$ del primo cammino hanno ora costo ridotto $0$, e così i loro archi all'indietro. Il cammino $1,3,5,6$ ha costo ridotto $1$ e costo $8$; $\delta=\min\{2,4,4,4,2\}=2$ è fissato da $e_1$ e da $u_{56}$.

    - <em>Iterazione $3$.</em> $s=2$, e $d(1)=0$ attraverso l'arco all'indietro $(2,1)$. Il cammino $2,4,6$ usa l'ultima unità di $(2,4)$.

    - <em>Iterazione $4$.</em> Il cammino $2,1,3,5,4,6$ usa l'arco all'indietro $(2,1)$: un'unità che andava da $1$ a $2$ viene deviata da $1$ attraverso $3$, $5$ e $4$. La figura mostra $G(\vet{x})$ con $r_{ij}$ e il costo ridotto su ogni arco, e il cammino in blu.

    ![Figura 3](../../img/min-cost-flow/fig03.svg){ .fig loading=lazy  }

    Dopo l'iterazione $4$ gli squilibri sono nulli e $\vet{x}=\tilde{\vet{x}}$, di costo $60$. Traslati di $15$, i potenziali diventano $(15,13,13,5,10,0)$: i potenziali del Capitolo 4.

- Qui i costi $7,8,10,13$ dei cammini crescono da un'iterazione all'altra: le unità successive viaggiano lungo cammini più costosi, e il costo totale è $3 \cdot 7+2 \cdot 8+10+13=60$.

- Qui bastano quattro iterazioni, mentre il limite del <span style="color:#1971c2">[Teorema 6.17](#box-23-mc-th-ssp)</span> è $D=7$.

!!! attenzione "Dijkstra ha bisogno dei costi ridotti"

    Nell'iterazione $4$ gli archi $(2,1)$, $(3,1)$, $(4,2)$, $(5,3)$, $(6,4)$, $(6,5)$ di $G(\vet{x})$ sono archi all'indietro con costi $c^x_{ij}$ negativi, e l'algoritmo di Dijkstra con lunghezze negative può sbagliare ([Capitolo 3](../../alberi-e-cammini/shortest-paths/l-algoritmo-di-dijkstra.md)). I potenziali rendono non negative tutte le lunghezze senza cambiare i cammini minimi.

!!! chiave ""

    L'algoritmo dei cammini minimi successivi manda flusso da un nodo in eccesso a un nodo in deficit lungo un cammino minimo di $G(\vet{x})$, trovato dall'algoritmo di Dijkstra sui costi ridotti. L'aggiornamento $\pi_i:=\pi_i-\min\{d(i),d(t)\}$ mantiene non negativi i costi ridotti, quindi il flusso finale è ottimo e i potenziali lo certificano.

## 6.8 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Dare all'arco all'indietro il costo $+c_{ij}$.</strong> Un arco all'indietro diminuisce $x_{ij}$, quindi risparmia $c_{ij}$ per unità: il suo costo è $-c_{ij}$, e la sua capacità residua è $x_{ij}-l_{ij}$.

    - <strong>Aumentare di più di $r(W)$.</strong> Qualche arco del ciclo uscirebbe dai suoi limiti; $\theta=r(W)$ è il passo più lungo possibile.

    - <strong>Eseguire Bellman–Ford da un solo nodo.</strong> Un ciclo negativo non raggiungibile da quel nodo sfugge; le etichette partono da $0$ su ogni nodo.

    - <strong>Scambiare la passeggiata per il ciclo.</strong> La passeggiata con $n$ archi letta dalla tabella contiene un ciclo negativo, ma non è essa stessa un ciclo: il ciclo è il tratto tra due occorrenze dello stesso nodo.

    - <strong>Eseguire l'algoritmo di Dijkstra sui costi $c^x_{ij}$.</strong> Gli archi all'indietro possono avere costi negativi; le lunghezze sono i costi ridotti $c^x_{ij}-\pi_i+\pi_j$.

    - <strong>Aggiornare i potenziali con il segno sbagliato.</strong> Con $\bar{c}_{ij}=c_{ij}-\pi_i+\pi_j$ l'aggiornamento è $\pi_i:=\pi_i-\min\{d(i),d(t)\}$; i nodi più lontani di $t$ diminuiscono solo di $d(t)$.

    - <strong>Prendere per ottimo il flusso massimo del Passo 0.</strong> La rete ausiliaria non ha costi: il suo flusso massimo è ammissibile, e ottimo solo per caso.

## 6.9 In sintesi

!!! chiave "In sintesi"

    - La rete residua $G(\vet{x})$ ha un arco in avanti $(i,j)$ con $r_{ij}=u_{ij}-x_{ij}$ e costo $c_{ij}$, e un arco all'indietro $(j,i)$ con $r_{ji}=x_{ij}-l_{ij}$ e costo $-c_{ij}$; aumentare lungo un ciclo $W$ cambia il costo di $\theta\,c(W)$.

    - Una circolazione si scompone in cicli; la differenza di due flussi ammissibili è una circolazione su $G(\vet{x})$.

    - Un flusso ammissibile è ottimo se e solo se $G(\vet{x})$ non ha cicli negativi, se e solo se esistono potenziali che danno costi ridotti non negativi su $G(\vet{x})$; sugli archi di $A$: $\bar{c}_{ij}>0 \Rightarrow x_{ij}=l_{ij}$, $\bar{c}_{ij}<0 \Rightarrow x_{ij}=u_{ij}$.

    - Un flusso massimo da una super sorgente a un super pozzo trova un flusso ammissibile o dimostra che non ne esistono.

    - Cancellazione dei cicli: Bellman–Ford da etichette $0$ trova un ciclo negativo, aumentare di $r(W)$ lo cancella; al più $\vet{c}'\vet{x}^0-z(\mathrm{MCF})$ iterazioni con dati interi.

    - Cammini minimi successivi: Dijkstra sui costi ridotti da un nodo in eccesso al nodo in deficit più vicino, $\pi_i:=\pi_i-\min\{d(i),d(t)\}$; al più $D$ iterazioni.

    <strong>La rete di riferimento in breve.</strong>

    <div class="tabella" markdown="0"><table>
    <tr>
    <td>flusso più costoso</td>
    <td><span class="arithmatex">\(\vet{x}^0=(1,4,4,1,4,1,3,3,1)\)</span>, costo <span class="arithmatex">\(80\)</span></td>
    </tr>
    <tr>
    <td>cancellazione dei cicli da <span class="arithmatex">\(\vet{x}^0\)</span></td>
    <td>cicli <span class="arithmatex">\(4,5,3,4\)</span>; <span class="arithmatex">\(6,4,5,6\)</span>; <span class="arithmatex">\(3,1,2,3\)</span>: costi <span class="arithmatex">\(80,69,62,60\)</span></td>
    </tr>
    <tr>
    <td>cammini minimi successivi</td>
    <td>cammini <span class="arithmatex">\(1,2,4\)</span>; <span class="arithmatex">\(1,3,5,6\)</span>; <span class="arithmatex">\(2,4,6\)</span>; <span class="arithmatex">\(2,1,3,5,4,6\)</span>: costi <span class="arithmatex">\(21,37,47,60\)</span></td>
    </tr>
    <tr>
    <td>primo flusso ammissibile</td>
    <td>flusso massimo di valore <span class="arithmatex">\(7\)</span>; su <span class="arithmatex">\(A\)</span> è <span class="arithmatex">\(\tilde{\vet{x}}\)</span></td>
    </tr>
    <tr>
    <td>flusso ottimo</td>
    <td><span class="arithmatex">\(\tilde{\vet{x}}=(2,3,4,0,3,0,2,1,2)\)</span>, <span class="arithmatex">\(z(\mathrm{MCF})=60\)</span></td>
    </tr>
    <tr>
    <td>potenziali (<span class="arithmatex">\(\pi_6=0\)</span>)</td>
    <td><span class="arithmatex">\(\vet{\pi}=(15,13,13,5,10,0)\)</span></td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Flusso di costo minimo](../../esercizi/min-cost-flow.md)

