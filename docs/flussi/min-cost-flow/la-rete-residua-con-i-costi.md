---
title: "La rete residua con i costi"
---

# 6.1 La rete residua con i costi { #sez-sec-mc-residual }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 6** · [:material-book-open-variant: Capitolo 6: Flusso di costo minimo](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-pencil: Esercizi: Flusso di costo minimo](../../esercizi/min-cost-flow.md)

</div>

- In questo capitolo la rete $G=(N,A)$ ha saldi $b_i$ con $\sum_{i \in N} b_i=0$, limiti inferiori $l_{ij}$, capacità $u_{ij}$ (finite o $+\infty$) e costi $c_{ij}$, come in [Capitolo 4](../network-flow-models/reti-e-flussi.md). Gli archi sono numerati $a_1,a_2,\dots,a_m$ in ordine lessicografo.

- L'insieme $A$ non ha coppia di archi opposti $(i,j)$, $(j,i)$. Un arco $(j,i)$ opposto a $(i,j)$ può essere sostituito da gli archi $(j,k)$ e $(k,i)$ attraverso un nuovo nodo di traslato $k$, entrambi con i limiti di $(j,i)$, il primo con il suo costo e il secondo con costo $0$: i flussi ed i relativi costi non cambiano.

<a id="box-1-mc-def-residual"></a>

!!! definizione "Definizione 6.1: rete residua"

    Sia $\vet{x}$ un vettore con $l_{ij} \le x_{ij} \le u_{ij}$ per ogni arco. La <strong>rete residua</strong> $G(\vet{x})=(N,A(\vet{x}))$ ha, per ogni arco $(i,j) \in A$:

    - il <strong>arco avanti</strong> $(i,j)$, se $x_{ij}<u_{ij}$, con <strong>capacità residua</strong> $r_{ij}=u_{ij}-x_{ij}$ e costo $c_{ij}$;

    - il <strong>arco all'indietro</strong> $(j,i)$, se $x_{ij}>l_{ij}$, con capacità residua $r_{ji}=x_{ij}-l_{ij}$ e costo $-c_{ij}$.

    Scriviamo $c^x_{ij}$ per il costo dell'arco $(i,j)$ di $G(\vet{x})$.

- Un arco in avanti può trasportare $r_{ij}$ più unità su $(i,j)$. Un arco all'indietro $(j,i)$ rimanda le unità da $j$ a $i$ diminuendo $x_{ij}$ e risparmia $c_{ij}$ per unità.

- Un arco di $A$ dà due archi di $G(\vet{x})$ esattamente quando $l_{ij}<x_{ij}<u_{ij}$. Con $\vet{l}=\vet{0}$ e senza i costi, $G(\vet{x})$ è la rete residua di [Capitolo 5 «Flusso massimo»](../maximum-flow/index.md).

<a id="box-2-mc-def-cycle"></a>

!!! definizione "Definizione 6.2: cicli della rete residua"

    Sia $W$ un ciclo diretto di $G(\vet{x})$. Il suo <strong>costo</strong> e il suo <strong>capacità residua</strong> sono

    $$
    c(W)=\sum_{(i,j) \in W} c^x_{ij}, \qquad\qquad r(W)=\min_{(i,j) \in W} r_{ij},
    $$

    e $W$ è un <strong>ciclo negativo</strong> se $c(W)<0$. <strong>Aumento</strong> $\vet{x}$ insieme a $W$ di $\theta$, con $0<\theta \le r(W)$, significa aumentare $x_{ij}$ di $\theta$ per ogni arco in avanti $(i,j)$ di $W$ e diminuire $x_{ij}$ da $\theta$ per ogni arco $(i,j) \in A$ il cui arco all'indietro $(j,i)$ è in $W$.

<a id="box-3-mc-prop-augment"></a>

!!! teorema "Proposizione 6.3: aumentare lungo un ciclo"

    Sia $\vet{l} \le \vet{x} \le \vet{u}$, sia $W$ un ciclo di $G(\vet{x})$ e $0<\theta \le r(W)$, e sia $\vet{x}'$ può essere $\vet{x}$ ampliato insieme a $W$ da $\theta$. Quindi $\vet{l} \le \vet{x}' \le \vet{u}$, ogni nodo ha il file stesso deflusso meno afflusso in $\vet{x}'$ e in $\vet{x}$, e

    $$
    \vet{c}'\vet{x}'=\vet{c}'\vet{x}+\theta\, c(W).
    $$

??? dimostrazione "Dimostrazione"

    Controlliamo le tre affermazioni arco per arco.

    1. <em>Bounds.</em> Su un arco in avanti, $x'_{ij}=x_{ij}+\theta \le x_{ij}+r_{ij}=u_{ij}$. Se l'arco all'indietro $(j,i)$ è in $W$, quindi $x'_{ij}=x_{ij}-\theta \ge x_{ij}-r_{ji}=l_{ij}$.

    2. <em>Saldi.</em> Aumentando di $\theta$ lungo un arco $(i,k)$ di $G(\vet{x})$ aumenta il deflusso meno l'afflusso di $i$ di $\theta$ e abbassa quello di $k$ di $\theta$: un arco in avanti invia più flusso da $i$ a $k$, un arco all'indietro invia meno flusso da $k$ a $i$. Ogni nodo di $W$ è la coda di un arco di $W$ e la testa di un altro, quindi le modifiche annullare.

    3. <em>Costo.</em> Un arco in avanti modifica il costo di $c_{ij}\theta=c^x_{ij}\theta$; un arco all'indietro $(j,i)$ lo cambia di $-c_{ij}\theta=c^x_{ji}\theta$. La somma di $W$ dà $\theta\, c(W)$. <span class="qed">□</span>

- Se $\vet{x}$ è un flusso ammissibile, lo è anche $\vet{x}'$. Durante un ciclo negativo il costo diminuisce di $\theta\, |c(W)|$.

<a id="box-4-mc-ex-residual"></a>

!!! esempio "Esempio 6.1: la rete residua del flusso più costoso"

    Utilizziamo la rete di riferimento di [Capitolo 4](../network-flow-models/reti-e-flussi.md), con limiti inferiori pari a zero, i saldi $\vet{b}=(5,2,0,-3,0,-4)$ e i costi e le capacità

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

    Il suo flusso realizzabile più costoso, calcolato con Gurobi massimizzando il costo, è

    $$
    \vet{x}^0=(1,\,4,\,4,\,1,\,4,\,1,\,3,\,3,\,1), \qquad \vet{c}'\vet{x}^0=80,
    $$

    con le voci nell'ordine degli archi; è l'unico flusso di costo $80$, come enumerazione dell'intero $12$ confermano i flussi fattibili. Ogni arco dà i seguenti archi di $G(\vet{x}^0)$, con capacità residua e costo:

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
    <td>avanti <span class="arithmatex">\((i,j)\)</span>: <span class="arithmatex">\(r,c\)</span></td>
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
    <td>indietro <span class="arithmatex">\((j,i)\)</span>: <span class="arithmatex">\(r,c\)</span></td>
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

    Nella figura ogni arco di $G(\vet{x}^0)$ porta la coppia $r_{ij},c^x_{ij}$; il ciclo $W=4,5,3,4$ è rosso.

    ![Figura 1](../../img/min-cost-flow/fig01.svg){ .fig loading=lazy  }

    - Il ciclo $W=4,5,3,4$ utilizza gli archi indietro di $(5,4)$, $(3,5)$ e $(4,3)$:

        $$
        c(W)=-5-3-3=-11, \qquad r(W)=\min\{3,4,1\}=1.
        $$

    - L'aumento di $\theta=1$ diminuisce $x_{54}$, $x_{35}$ e $x_{43}$ di un'unità. Il nuovo flusso $\vet{x}^1=(1,4,4,1,3,0,3,2,1)$ è fattibile e costa $80-11=69$: l'unità che ha fatto il giro del ciclo diretto $3,5,4,3$ di $G$ costa $11$ e non consegna nulla.

!!! chiave ""

    La rete residua $G(\vet{x})$ ha un arco di costo in avanti $c_{ij}$ dove $x_{ij}$ può crescere e un arco all'indietro di costo $-c_{ij}$ dove $x_{ij}$ può diminuire. L'aumento lungo un ciclo di $G(\vet{x})$ mantiene i limiti e il saldi e modifica il costo di $\theta\, c(W)$.

---

**Avanti:** [6.2 Circolazioni e loro scomposizione](circolazioni-e-loro-scomposizione.md)
