---
title: "Condizioni di ottimalità con potenziali"
---

# 6.4 Condizioni di ottimalità con potenziali { #sez-sec-mc-potentials }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 6** · [:material-book-open-variant: Capitolo 6: Flusso di costo minimo](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-pencil: Esercizi: Flusso di costo minimo](../../esercizi/min-cost-flow.md)

</div>

- Dati i potenziali $\vet{\pi} \in \R^n$, il costo ridotto di un arco $(i,j)$ di $G(\vet{x})$ è $c^x_{ij}-\pi_i+ \pi_j$. For a forward arc it is $\bar{c}_{ij}=c_{ij}-\pi_i+\pi_j$, il costo ridotto di [Capitolo 4](../network-flow-models/il-modello-duale-e-i-costi-ridotti.md); per l'arco all'indietro $(j,i)$ di $(i,j)$ è $-c_{ij}-\pi_j+\pi_i=-\bar{c}_{ij}$.

- Lungo un ciclo $W$ di $G(\vet{x})$ i potenziali si telescopio, come in [Capitolo 3](../../alberi-e-cammini/shortest-paths/condizioni-e-potenziali-di-ottimalita.md):

    $$
    c(W)=\sum_{(i,j) \in W}\big(c^x_{ij}-\pi_i+\pi_j\big).
    $$

<a id="box-12-mc-th-potentials"></a>

!!! teorema "Teorema 6.9: ottimizzazione dei costi ridotti"

    Un flusso ammissibile $\vet{x}$ è ottimale se e solo se esistono potenziali $\vet{\pi} \in \R^n$ tali che

    $$
    c^x_{ij}-\pi_i+\pi_j \ge 0 \qquad \text{per ogni arco } (i,j) \text{ di } G(\vet{x}).
    $$

??? dimostrazione "Dimostrazione"

    <em>If.</em> Con la formula telescopica ogni ciclo di $G(\vet{x})$ ha $c(W) \ge 0$ e $\vet{x}$ è ottimale per <span style="color:#1971c2">[Teorema 6.7](condizioni-di-ottimalita-del-ciclo-negativo.md#box-9-mc-th-negcycle)</span>.

    <em>Solo se.</em> Sia $\vet{x}$ ottimale: per <span style="color:#1971c2">[Teorema 6.7](condizioni-di-ottimalita-del-ciclo-negativo.md#box-9-mc-th-negcycle)</span>, $G(\vet{x})$ non ha ciclo negativo.

    1. Aggiungere un nodo $r$ e un arco $(r,i)$ di costo $0$ per ogni $i \in N$. Nel nuovo grafo ogni nodo è raggiungibile da $r$, e i cicli sono quelli di $G(\vet{x})$, poiché nessun arco entra in $r$: nessuno è negativo.

    2. Per il Teorema «Equazioni di Bellman» di [Capitolo 3](../../alberi-e-cammini/shortest-paths/problemi-del-percorso-piu-breve.md), le distanze $d(i)$ da $r$ sono finite e $d(j) \le d(i)+c^x_{ij}$ per ogni arco $(i,j)$ di $G(\vet{x})$.

    3. Con $\pi_i=-d(i)$ otteniamo $c^x_{ij}-\pi_i+\pi_j=c^x_{ij}+d(i)-d(j) \ge 0$. <span class="qed">□</span>

<a id="box-13-mc-cor-cs"></a>

!!! teorema "Corollario 6.10: allentamento complementare"

    Sia $\vet{x}$ un flusso ammissibile e $\vet{\pi} \in \R^n$. La condizione di <span style="color:#1971c2">[Teorema 6.9](#box-12-mc-th-potentials)</span> vale se e solo se, per ogni arco $(i,j) \in A$,

    $$
    \bar{c}_{ij}>0 \;\Rightarrow\; x_{ij}=l_{ij}, \qquad\qquad \bar{c}_{ij}<0 \;\Rightarrow\; x_{ij}=u_{ij} .
    $$

    In particolare, $l_{ij}<x_{ij}<u_{ij}$ implica $\bar{c}_{ij}=0$.

??? dimostrazione "Dimostrazione"

    L'arco $(i,j) \in A$ dà luogo all'arco in avanti, di costo ridotto $\bar{c}_{ij}$, quando $x_{ij}<u_{ij}$, e all'arco all'indietro, di costo ridotto $-\bar{c}_{ij}$, quando $x_{ij}>l_{ij}$. Quindi la condizione sugli archi del grafo residuo è

    $$
    x_{ij}<u_{ij} \;\Rightarrow\; \bar{c}_{ij} \ge 0, \qquad\qquad x_{ij}>l_{ij} \;\Rightarrow\; \bar{c}_{ij} \le 0 .
    $$

    Poiché $l_{ij} \le x_{ij} \le u_{ij}$, la prima implicazione è equivalente a $\bar{c}_{ij}<0 \Rightarrow x_{ij}=u_{ij}$, mentre la seconda equivale a $\bar{c}_{ij}>0 \Rightarrow x_{ij}=l_{ij}$. Se $l_{ij}<x_{ij}<u_{ij}$, si applicano entrambe le implicazioni e $\bar{c}_{ij}=0$. <span class="qed">□</span>

- Con $\vet{l}=\vet{0}$ queste sono le condizioni del Corollario «certificato a costo ridotto» di [Capitolo 4](../network-flow-models/il-modello-duale-e-i-costi-ridotti.md). Lì si sono dimostrati sufficienti con la dualità LP; <span style="color:#1971c2">[Teorema 6.9](#box-12-mc-th-potentials)</span> mostra che ogni il flusso ottimale ha tali potenzialità che con $\alpha_{ij}=\max\{0,-\bar{c}_{ij}\}$ formano una doppia soluzione ottimale.

- I potenziali della prova sono $\pi_i=-d(i)$, meno le distanze da $r$, come $\pi_i=-\tilde{d}(i)$ in [Capitolo 3](../../alberi-e-cammini/shortest-paths/condizioni-e-potenziali-di-ottimalita.md). Possono essere spostati di una costante; li normalizziamo con $\pi_n=0$.

<a id="box-14-mc-ex-potentials"></a>

!!! esempio "Esempio 6.4: il certificato del flusso ottimale"

    Prendiamo $\tilde{\vet{x}}$ e i potenziali $\vet{\pi}=(15,13,13,5,10,0)$ del capitolo 4. I costi ridotti del gli archi di $G(\tilde{\vet{x}})$ sono $\bar{c}_{ij}$ sugli archi in avanti e $-\bar{c}_{ij}$ sugli archi all'indietro:

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
    <td><span class="arithmatex">\(\tilde{x}_{ij}\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\bar{c}_{ij}\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(-3\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(-7\)</span></td>
    </tr>
    <tr>
    <td>avanti <span class="arithmatex">\((i,j)\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td>–</td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td>–</td>
    </tr>
    <tr>
    <td>indietro <span class="arithmatex">\((j,i)\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td>–</td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td>–</td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    </tr>
    </table></div>

    - Tutti gli archi $14$ di $G(\tilde{\vet{x}})$ hanno costo ridotto non negativo: da <span style="color:#1971c2">[Teorema 6.9](#box-12-mc-th-potentials)</span>, $\tilde{\vet{x}}$ è ottimale. Sotto forma di <span style="color:#1971c2">[Corollario 6.10](#box-13-mc-cor-cs)</span>: $(3,2)$ e $(4,3)$ sono vuoti, $(2,4)$ e $(5,6)$ sono saturati.

    - I potenziali sono meno i costi delle passeggiate più economiche di $G(\tilde{\vet{x}})$ che terminano in ciascun nodo. Per esempio la cammino $6,4,5,3,1$ utilizza quattro archi all'indietro e costa $-5-5-3-2=-15=-\pi_1$: in $G$ è il percorso $1,3,5,4,6$ dello albero ricoprente del capitolo 4.

!!! chiave ""

    Un flusso ammissibile è ottimo se e solo se alcuni potenziali danno costi ridotti non negativi su tutti gli archi di $G(\vet{x})$: positivo $\bar{c}_{ij}$ solo sugli archi al limite inferiore, negativo solo sugli archi saturati. Tale i potenziali sono meno le distanze in $G(\vet{x})$ da un nodo unito a tutti gli altri.

---

**Avanti:** [6.5 Un primo flusso fattibile](un-primo-flusso-fattibile.md)
