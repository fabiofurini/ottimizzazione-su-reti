---
title: "La rete residua con i costi"
---

# 6.1 La rete residua con i costi { #sez-sec-mc-residual }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 6** · [:material-book-open-variant: Capitolo 6: Flusso di costo minimo](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-presentation: Slide](../../pdf/slide-min-cost-flow.pdf) · [:material-pencil: Esercizi: Flusso di costo minimo](../../esercizi/min-cost-flow.md) · [:material-gesture-tap: App: Flusso di costo minimo: cancellazione dei cicli e cammini minimi successivi](../../laboratorio/flusso-di-costo-minimo.md)

</div>

- In questo capitolo la rete $G=(N,A)$ ha bilanci $b_i$ con $\sum_{i \in N} b_i=0$, limiti inferiori $l_{ij}$, capacità $u_{ij}$ (finite o $+\infty$) e costi $c_{ij}$, come nel [Capitolo 4](../network-flow-models/reti-e-flussi.md). Gli archi sono numerati $a_1,a_2,\dots,a_m$ in ordine lessicografico.

- L'insieme $A$ non contiene coppie di archi opposti $(i,j)$, $(j,i)$. Un arco $(j,i)$ opposto a $(i,j)$ si può sostituire con gli archi $(j,k)$ e $(k,i)$ attraverso un nuovo nodo di trasbordo $k$, entrambi con i limiti di $(j,i)$, il primo con il suo costo e il secondo con costo $0$: i flussi e i loro costi non cambiano.

<a id="box-1-mc-def-residual"></a>

!!! definizione "Definizione 6.1: rete residua"

    Sia $\vet{x}$ un vettore con $l_{ij} \le x_{ij} \le u_{ij}$ per ogni arco. La <strong>rete residua</strong> $G(\vet{x})=(N,A(\vet{x}))$ ha, per ogni arco $(i,j) \in A$:

    - l'<strong>arco in avanti</strong> $(i,j)$, se $x_{ij}<u_{ij}$, con <strong>capacità residua</strong> $r_{ij}=u_{ij}-x_{ij}$ e costo $c_{ij}$;

    - l'<strong>arco all'indietro</strong> $(j,i)$, se $x_{ij}>l_{ij}$, con capacità residua $r_{ji}=x_{ij}-l_{ij}$ e costo $-c_{ij}$.

    Indichiamo con $c^x_{ij}$ il costo dell'arco $(i,j)$ di $G(\vet{x})$.

- Un arco in avanti può portare altre $r_{ij}$ unità su $(i,j)$. Un arco all'indietro $(j,i)$ rimanda unità da $j$ a $i$ diminuendo $x_{ij}$, e risparmia $c_{ij}$ per unità.

- Un arco di $A$ dà due archi di $G(\vet{x})$ esattamente quando $l_{ij}<x_{ij}<u_{ij}$. Con $\vet{l}=\vet{0}$ e senza i costi, $G(\vet{x})$ è la rete residua del [Capitolo 5 «Flusso massimo»](../maximum-flow/index.md).

<a id="box-2-mc-def-cycle"></a>

!!! definizione "Definizione 6.2: cicli della rete residua"

    Sia $W$ un ciclo orientato di $G(\vet{x})$. Il suo <strong>costo</strong> e la sua <strong>capacità residua</strong> sono

    $$
    c(W)=\sum_{(i,j) \in W} c^x_{ij}, \qquad\qquad r(W)=\min_{(i,j) \in W} r_{ij},
    $$

    e $W$ è un <strong>ciclo negativo</strong> se $c(W)<0$. <strong>Aumentare</strong> $\vet{x}$ lungo $W$ di $\theta$, con $0<\theta \le r(W)$, significa aumentare $x_{ij}$ di $\theta$ per ogni arco in avanti $(i,j)$ di $W$ e diminuire $x_{ij}$ di $\theta$ per ogni arco $(i,j) \in A$ il cui arco all'indietro $(j,i)$ sta in $W$.

<a id="box-3-mc-prop-augment"></a>

!!! teorema "Proposizione 6.3: aumento lungo un ciclo"

    Sia $\vet{l} \le \vet{x} \le \vet{u}$, sia $W$ un ciclo di $G(\vet{x})$ e $0<\theta \le r(W)$, e sia $\vet{x}'$ il vettore $\vet{x}$ aumentato lungo $W$ di $\theta$. Allora $\vet{l} \le \vet{x}' \le \vet{u}$, ogni nodo ha lo stesso flusso uscente meno entrante in $\vet{x}'$ e in $\vet{x}$, e

    $$
    \vet{c}'\vet{x}'=\vet{c}'\vet{x}+\theta\, c(W).
    $$

??? dimostrazione "Dimostrazione"

    Verifichiamo le tre affermazioni arco per arco.

    1. <em>Limiti.</em> Su un arco in avanti, $x'_{ij}=x_{ij}+\theta \le x_{ij}+r_{ij}=u_{ij}$. Se l'arco all'indietro $(j,i)$ sta in $W$, allora $x'_{ij}=x_{ij}-\theta \ge x_{ij}-r_{ji}=l_{ij}$.

    2. <em>Bilanci.</em> Aumentare di $\theta$ lungo un arco $(i,k)$ di $G(\vet{x})$ alza di $\theta$ il flusso uscente meno entrante di $i$ e abbassa di $\theta$ quello di $k$: un arco in avanti manda più flusso da $i$ a $k$, un arco all'indietro manda meno flusso da $k$ a $i$. Ogni nodo di $W$ è la coda di un arco di $W$ e la testa di un altro, quindi le variazioni si compensano.

    3. <em>Costo.</em> Un arco in avanti cambia il costo di $c_{ij}\theta=c^x_{ij}\theta$; un arco all'indietro $(j,i)$ lo cambia di $-c_{ij}\theta=c^x_{ji}\theta$. Sommando lungo $W$ si ottiene $\theta\, c(W)$. <span class="qed">□</span>

- Se $\vet{x}$ è un flusso ammissibile, lo è anche $\vet{x}'$. Lungo un ciclo negativo il costo diminuisce di $\theta\, |c(W)|$.

<a id="box-4-mc-ex-residual"></a>

!!! esempio "Esempio 6.1: la rete residua del flusso più costoso"

    Usiamo la rete di riferimento del [Capitolo 4](../network-flow-models/reti-e-flussi.md), con limiti inferiori nulli, i bilanci $\vet{b}=(5,2,0,-3,0,-4)$, e i costi e le capacità

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>arco</th>
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
    <td><span class="arithmatex">\(c_{ij}\)</span></td>
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
    <td><span class="arithmatex">\(u_{ij}\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    </tr>
    </table></div>

    Il suo flusso ammissibile più costoso, calcolato con Gurobi massimizzando il costo, è

    $$
    \vet{x}^0=(1,\,4,\,4,\,1,\,4,\,1,\,3,\,3,\,1), \qquad \vet{c}'\vet{x}^0=80,
    $$

    con le componenti nell'ordine degli archi; è l'unico flusso di costo $80$, come conferma l'enumerazione dei $12$ flussi ammissibili interi. Ogni arco dà i seguenti archi di $G(\vet{x}^0)$, con capacità residua e costo:

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
    <td><span class="arithmatex">\(x^0_{ij}\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    </tr>
    <tr>
    <td>in avanti <span class="arithmatex">\((i,j)\)</span>: <span class="arithmatex">\(r,c\)</span></td>
    <td><span class="arithmatex">\(3,2\)</span></td>
    <td>–</td>
    <td>–</td>
    <td><span class="arithmatex">\(1,2\)</span></td>
    <td>–</td>
    <td><span class="arithmatex">\(2,3\)</span></td>
    <td><span class="arithmatex">\(2,5\)</span></td>
    <td>–</td>
    <td><span class="arithmatex">\(1,3\)</span></td>
    </tr>
    <tr>
    <td>all'indietro <span class="arithmatex">\((j,i)\)</span>: <span class="arithmatex">\(r,c\)</span></td>
    <td><span class="arithmatex">\(1,-2\)</span></td>
    <td><span class="arithmatex">\(4,-2\)</span></td>
    <td><span class="arithmatex">\(4,-5\)</span></td>
    <td><span class="arithmatex">\(1,-2\)</span></td>
    <td><span class="arithmatex">\(4,-3\)</span></td>
    <td><span class="arithmatex">\(1,-3\)</span></td>
    <td><span class="arithmatex">\(3,-5\)</span></td>
    <td><span class="arithmatex">\(3,-5\)</span></td>
    <td><span class="arithmatex">\(1,-3\)</span></td>
    </tr>
    </table></div>

    Nella figura ogni arco di $G(\vet{x}^0)$ porta la coppia $r_{ij},c^x_{ij}$; il ciclo $W=4,5,3,4$ è in rosso.

    ![Figura 1](../../img/min-cost-flow/fig01.svg){ .fig loading=lazy  }

    - Il ciclo $W=4,5,3,4$ usa gli archi all'indietro di $(5,4)$, $(3,5)$ e $(4,3)$:

        $$
        c(W)=-5-3-3=-11, \qquad r(W)=\min\{3,4,1\}=1.
        $$

    - Aumentando di $\theta=1$, $x_{54}$, $x_{35}$ e $x_{43}$ diminuiscono di un'unità. Il nuovo flusso $\vet{x}^1=(1,4,4,1,3,0,3,2,1)$ è ammissibile e costa $80-11=69$: l'unità che girava lungo il ciclo orientato $3,5,4,3$ di $G$ costava $11$ e non consegnava nulla.

!!! chiave ""

    La rete residua $G(\vet{x})$ ha un arco in avanti di costo $c_{ij}$ dove $x_{ij}$ può crescere e un arco all'indietro di costo $-c_{ij}$ dove $x_{ij}$ può diminuire. Aumentare lungo un ciclo di $G(\vet{x})$ mantiene i limiti e i bilanci, e cambia il costo di $\theta\, c(W)$.

---

**Avanti:** [6.2 Circolazioni e loro scomposizione](circolazioni-e-loro-scomposizione.md)
