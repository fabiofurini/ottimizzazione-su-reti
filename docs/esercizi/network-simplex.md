---
title: "Esercizi · Il simplesso su reti"
---

# Esercizi · Il simplesso su reti

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 8** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 8: Simplesso su reti](../simplesso-su-reti/network-simplex/index.md) · [:material-file-pdf-box: Eserciziario, volume 4 (PDF)](../pdf/esercizi-4-simplesso-su-reti.pdf)

</div>

!!! formula "Regole utilizzate in questi esercizi"

    Le definizioni e i risultati del capitolo [«La rete simplex»](../simplesso-su-reti/network-simplex/index.md), per un rete connessa $G=(N,A)$ con saldi $b_i$, $\sum_{i \in N}b_i=0$, limiti inferiori zero, capacità $u_{ij}$ e costi $c_{ij}$; gli archi sono in ordine lessicografo e la radice di ogni albero è l'ultimo nodo $n$.

    - **(N1)** <strong>Soluzione albero.</strong> $x_{ij}=0$ su $L$, $x_{ij}=u_{ij}$ su $U$; con i saldi residui $\hat{b}_i=b_i-\sum_{(i,j) \in U}u_{ij}+\sum_{(j,i) \in U}u_{ji}$, prendere l'anta $\ell \neq n$ con l'indice più piccolo, con arco albero $a$ e vicino $j$: $x_a=\hat{b}_\ell$ se $a=(\ell,j)$, $x_a=-\hat{b}_\ell$ se $a=(j,\ell)$, quindi $\hat{b}_j:=\hat{b}_j+\hat{b}_\ell$; elimina $\ell$ e ripeti.

    - **(N2)** <strong>Potenziali.</strong> $\pi_n=0$ e $\bar{c}_{ij}=c_{ij}-\pi_i+\pi_j=0$ sugli archi dell'albero: $\pi_j=\pi_i-c_{ij}$ oppure $\pi_i=\pi_j+c_{ij}$. Il costo ridotto di un arco non basico è il costo del suo ciclo fondamentale, percorso nella sua direzione.

    - **(N3)** <strong>Ottimalità.</strong> $\bar{c}_{ij} \ge 0$ su $L$ e $\bar{c}_{ij} \le 0$ su $U$: la soluzione ad albero è ottimale e l’ottimo unico se le disuguaglianze sono strette.

    - **(N4)** <strong>Pivot.</strong> Arco di ingresso: tra gli archi di $L$ con $\bar{c}_{ij}<0$ e di $U$ con $\bar{c}_{ij}>0$, il più grande $|\bar{c}_{ij}|$ (il primo in ordine lessicografo se più di uno). Il ciclo $C$ avviene come arco di entrata se è in $L$, contro se è in $U$; capacità residua $u_{ij}-x_{ij}$ su arco avanti, $x_{ij}$ su arco indietro arco; $\theta$ è il minimo. L'apice è il primo nodo condiviso dai percorsi ad albero degli estremi dell'arco entrante alla radice; l'arco in uscita è l'ultimo arco di blocco dall'apice lungo $C$ e va a $U$ se in avanti, a $L$ se all'indietro. Il costo diminuisce di $\theta|\bar{c}_{kl}|$; i potenziali del sottoalbero $S$ tagliato dall'arco uscente cambiare con $-\bar{c}_{kl}$ se $l \in S$, con $+\bar{c}_{kl}$ se $k \in S$.

    - **(N5)** <strong>Forte fattibilità.</strong> Ogni arco di albero con $x_{ij}=0$ punta verso la radice e ogni arco di albero con $x_{ij}=u_{ij}$ punta lontano dalla radice.

    - **(N6)** <strong>Fase 0.</strong> Nodo artificiale $r=n+1$, arco $(i,r)$ se $b_i \ge 0$ e $(r,i)$ se $b_i<0$, capacità $+\infty$, costo $1$ (costo $0$ su $A$), root $r$. $G$ è fattibile se e solo se $z_0=0$; quindi il simplesso della rete prosegue con i costi $c_{ij}$ ($0$ sugli archi artificiali), e possono entrare solo gli archi con $\bar{c}^0_{ij}=0$.

<a id="esercizio-8-1"></a>

!!! esercizio "Esercizio 8.1: Basi e soluzioni per alberi"

    !!! esercizio "Esercizio"

        Consideriamo la rete $G=(N,A)$ con $N=\{1,2,\dots,5\}$, gli archi $8$

        $$
        A=\{(1,3),(1,4),(2,1),(2,4),(4,3),(5,1),(5,3),(5,4)\},
        $$

        i saldi $b_1=3$, $b_2=2$, $b_3=-7$, $b_4=-3$, $b_5=5$, i limiti inferiori dello zero e i costi e le capacità della tabella; nella figura ogni arco porta $c_{ij},u_{ij}$ e ogni nodo il suo equilibrio.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,3)\)</span></th>
        <th><span class="arithmatex">\((1,4)\)</span></th>
        <th><span class="arithmatex">\((2,1)\)</span></th>
        <th><span class="arithmatex">\((2,4)\)</span></th>
        <th><span class="arithmatex">\((4,3)\)</span></th>
        <th><span class="arithmatex">\((5,1)\)</span></th>
        <th><span class="arithmatex">\((5,3)\)</span></th>
        <th><span class="arithmatex">\((5,4)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(c_{ij}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u_{ij}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        </tr>
        </table></div>

        ![Figura 1](../img/es-network-simplex/fig01.svg){ .fig loading=lazy  }

        Consideriamo l'albero di copertura $T=\{(1,3),(1,4),(2,4),(5,4)\}$, gli insiemi $U=\{(4,3),(5,1)\}$ e $L=\{(2,1),(5,3)\}$ e l'insieme degli archi $F=\{(1,4),(2,1),(2,4),(5,3)\}$.

    **Domande**

    1. Dimostrare che $F$ non è una base: trovare un ciclo di $F$ e una combinazione lineare delle sue colonne di $\mat{B}$ pari a zero. Perché $T$ è una base?

    2. Calcolare i saldi residui e la soluzione dell'albero di $(T,L,U)$ dalle foglie, come in (N1).

    3. La struttura ad albero è fattibile? È degenerato? Calcolarne il costo.

    4. La struttura ad albero è fortemente ammissibile, con radice $5$?

??? soluzione "Soluzione"

    Usiamo le regole (N1)–(N6) del riquadro all'inizio di questi esercizi.

    1. Gli archi di $F$ contengono il ciclo $1,4,2,1$, che utilizza $(1,4)$ avanti, $(2,4)$ indietro, $(2,1)$ avanti. Con $+1$ per gli archi avanti e $-1$ per quelli indietro,

        $$
        \mat{B}_{(1,4)} -\mat{B}_{(2,4)} +\mat{B}_{(2,1)}=\vet{0},
        $$

        quindi le colonne di $F$ sono linearmente dipendenti, in $\mat{B}$ e nella matrice senza la riga del nodo $5$: $F$ non è una base. Il set $T$ ha archi $4$ e collega tutti i nodi, quindi è uno albero ricoprente e gli albero ricoprente sono le basi.

    2. I saldi residui spostano i flussi di $U$ sul lato destro:

        $$
        \hat{\vet{b}}=(7,2,-2,-8,1) .
        $$

        Le foglie vengono elaborate nell'ordine $2,3,1,4$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>foglia <span class="arithmatex">\(\ell\)</span> e arco dell'albero e flusso e saldo residuo del vicino</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((2,4)\)</span></td>
        <td><span class="arithmatex">\(x_{24}=\hat{b}_{2}=2\)</span></td>
        <td><span class="arithmatex">\(\hat{b}_{4}=-8+2=-6\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((1,3)\)</span></td>
        <td><span class="arithmatex">\(x_{13}=-\hat{b}_{3}=2\)</span></td>
        <td><span class="arithmatex">\(\hat{b}_{1}=7-2=5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((1,4)\)</span></td>
        <td><span class="arithmatex">\(x_{14}=\hat{b}_{1}=5\)</span></td>
        <td><span class="arithmatex">\(\hat{b}_{4}=-6+5=-1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((5,4)\)</span></td>
        <td><span class="arithmatex">\(x_{54}=-\hat{b}_{4}=1\)</span></td>
        <td><span class="arithmatex">\(\hat{b}_{5}=1-1=0\)</span></td>
        </tr>
        </table></div>

        Con $x_{ij}=0$ su $L$ e $x_{ij}=u_{ij}$ su $U$, la soluzione ad albero è

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,3)\)</span></th>
        <th><span class="arithmatex">\((1,4)\)</span></th>
        <th><span class="arithmatex">\((2,1)\)</span></th>
        <th><span class="arithmatex">\((2,4)\)</span></th>
        <th><span class="arithmatex">\((4,3)\)</span></th>
        <th><span class="arithmatex">\((5,1)\)</span></th>
        <th><span class="arithmatex">\((5,3)\)</span></th>
        <th><span class="arithmatex">\((5,4)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(x_{ij}\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u_{ij}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        </tr>
        </table></div>

    3. Ogni arco di albero ha $0 \le x_{ij} \le u_{ij}$, quindi la struttura ad albero è fattibile. L'arco dell'albero $(2,4)$ ha $x_{24}=2$, al limite: la struttura dell'albero è degenere. Il suo costo è

        $$
        1 \cdot 2+7 \cdot 5+1 \cdot 2+6 \cdot 5+7 \cdot 4+1 \cdot 1=98 .
        $$

    4. No. L'arco dell'albero $(2,4)$ è al massimo delle sue capacità e punta verso la radice: sul percorso dell'albero da $2$ alla radice non può più essere inviato alcun flusso. Per (N5) la struttura ad albero non è fortemente ammissibile.

        ![Figura 2](../img/es-network-simplex/fig02.svg){ .fig loading=lazy  }

    !!! chiave ""

        $F$ contiene un ciclo e non è una base; $(T,L,U)$ è fattibile e degenerato, con costo $98$ e non è fortemente fattibile a causa dell'arco $(2,4)$.

<a id="esercizio-8-2"></a>

!!! esercizio "Esercizio 8.2: Potenziali e certificato di ottimalità"

    !!! esercizio "Esercizio"

        Consideriamo la rete $G=(N,A)$ con $N=\{1,2,\dots,5\}$, gli archi $8$

        $$
        A=\{(1,3),(2,1),(2,3),(4,2),(4,3),(5,1),(5,2),(5,4)\},
        $$

        i saldi $b_1=-3$, $b_2=0$, $b_3=-7$, $b_4=4$, $b_5=6$, i limiti inferiori dello zero e i costi e le capacità della tabella; nella figura ogni arco porta $c_{ij},u_{ij}$ e ogni nodo il suo equilibrio.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,3)\)</span></th>
        <th><span class="arithmatex">\((2,1)\)</span></th>
        <th><span class="arithmatex">\((2,3)\)</span></th>
        <th><span class="arithmatex">\((4,2)\)</span></th>
        <th><span class="arithmatex">\((4,3)\)</span></th>
        <th><span class="arithmatex">\((5,1)\)</span></th>
        <th><span class="arithmatex">\((5,2)\)</span></th>
        <th><span class="arithmatex">\((5,4)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(c_{ij}\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u_{ij}\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        </tr>
        </table></div>

        ![Figura 3](../img/es-network-simplex/fig03.svg){ .fig loading=lazy  }

        Consideriamo la struttura ad albero con $T=\{(1,3),(4,2),(5,1),(5,2)\}$, $U=\{(2,3),(4,3)\}$ e $L=\{(2,1),(5,4)\}$, la cui soluzione ad albero è

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,3)\)</span></th>
        <th><span class="arithmatex">\((2,1)\)</span></th>
        <th><span class="arithmatex">\((2,3)\)</span></th>
        <th><span class="arithmatex">\((4,2)\)</span></th>
        <th><span class="arithmatex">\((4,3)\)</span></th>
        <th><span class="arithmatex">\((5,1)\)</span></th>
        <th><span class="arithmatex">\((5,2)\)</span></th>
        <th><span class="arithmatex">\((5,4)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(x_{ij}\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        </table></div>

    **Domande**

    1. Calcola i potenziali di $T$ con radice $5$ ($\pi_5=0$), come in (N2).

    2. Calcolare i costi ridotti degli archi non basici. La soluzione dell'albero è ottimale? È l'ottimo unico?

    3. Scrivete il ciclo fondamentale di $(4,3)$, percorso nella sua direzione, e verificate che il suo costo sia uguale a $\bar{c}_{43}$.

    4. Fornire una soluzione ottimale $(\vet{\pi},\vet{\alpha})$ del modello duale di [Capitolo 4 «Modelli di flusso di rete»](../flussi/network-flow-models/index.md), con $\alpha_{ij}=\max\{0,-\bar{c}_{ij}\}$, e verificare che il valore duale sia uguale al costo del flusso.

??? soluzione "Soluzione"

    Usiamo le regole (N1)–(N6) del riquadro all'inizio di questi esercizi.

    1. Scendendo lungo l'albero dalla radice $5$:

        $$
        \begin{gathered}
        \pi_{1}=\pi_{5}-c_{51}=-6, \qquad \pi_{2}=\pi_{5}-c_{52}=-4, \qquad \pi_{3}=\pi_{1}-c_{13}=-12\\
        \pi_{4}=\pi_{2}+c_{42}=0 .
        \end{gathered}
        $$

        Quindi $\vet{\pi}=(-6,-4,-12,0,0)$.

    2. I costi ridotti $\bar{c}_{ij}=c_{ij}-\pi_i+\pi_j$ sono

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,3)\)</span></th>
        <th><span class="arithmatex">\((2,1)\)</span></th>
        <th><span class="arithmatex">\((2,3)\)</span></th>
        <th><span class="arithmatex">\((4,2)\)</span></th>
        <th><span class="arithmatex">\((4,3)\)</span></th>
        <th><span class="arithmatex">\((5,1)\)</span></th>
        <th><span class="arithmatex">\((5,2)\)</span></th>
        <th><span class="arithmatex">\((5,4)\)</span></th>
        </tr>
        <tr>
        <td>stato</td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{U}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{U}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(x_{ij}\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\bar{c}_{ij}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(-8\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        </tr>
        </table></div>

        Gli archi di $L$ hanno $\bar{c}_{21}=5, \bar{c}_{54}=7$, tutti positivi, e gli archi di $U$ hanno $\bar{c}_{23}=-2, \bar{c}_{43}=-8$, tutti negativi. Per (N3) la soluzione dell'albero è ottima, con costo $80$, ed è l'unico ottimo perché le disuguaglianze sono strette (Gurobi conferma il valore).

        ![Figura 4](../img/es-network-simplex/fig04.svg){ .fig loading=lazy  }

    3. Il ciclo è $4,3,1,5,2,4$: $(4,3)$ avanti, $(1,3)$ indietro, $(5,1)$ indietro, $(5,2)$ avanti, $(4,2)$ indietro. Il suo costo è

        $$
        c_{43}-c_{13}-c_{51}+c_{52}-c_{42}=4-6-6+4-4=-8=\bar{c}_{43} .
        $$

    4. Con $\alpha_{ij}=\max\{0,-\bar{c}_{ij}\}$ valgono i vincoli duali $\pi_i-\pi_j-\alpha_{ij} \le c_{ij}$, e $\alpha_{ij}>0$ solo sugli archi di $U$: $\alpha_{23}=2$, $\alpha_{43}=8$. Il valore duale è

        $$
        \sum_{i \in N} b_i\pi_i-\sum_{(i,j) \in A} u_{ij}\alpha_{ij}=102-22=80,
        $$

        pari al costo: entrambe le soluzioni sono ottimali.

    !!! chiave ""

        I potenziali $\vet{\pi}=(-6,-4,-12,0,0)$ danno $\bar{c}>0$ su $L$ e $\bar{c}<0$ su $U$: la soluzione ad albero è l'unico ottimo, con costo $80$ pari al valore duale.

<a id="esercizio-8-3"></a>

!!! esercizio "Esercizio 8.3: La rete simplex senza capacità"

    !!! esercizio "Esercizio"

        Consideriamo la rete $G=(N,A)$ con $N=\{1,2,\dots,6\}$, gli archi $9$

        $$
        A=\{(1,2),(2,3),(2,4),(3,4),(3,5),(4,5),(5,1),(6,1),(6,2)\},
        $$

        i saldi $b_1=-1$, $b_2=0$, $b_3=3$, $b_4=-2$, $b_5=-5$, $b_6=5$, limiti inferiori zero e i costi della tabella (nessuna capacità: $u_{ij}=+\infty$); nella figura ogni arco porta $c_{ij}$ e ogni nodo il suo equilibrio.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,2)\)</span></th>
        <th><span class="arithmatex">\((2,3)\)</span></th>
        <th><span class="arithmatex">\((2,4)\)</span></th>
        <th><span class="arithmatex">\((3,4)\)</span></th>
        <th><span class="arithmatex">\((3,5)\)</span></th>
        <th><span class="arithmatex">\((4,5)\)</span></th>
        <th><span class="arithmatex">\((5,1)\)</span></th>
        <th><span class="arithmatex">\((6,1)\)</span></th>
        <th><span class="arithmatex">\((6,2)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(c_{ij}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        </table></div>

        ![Figura 5](../img/es-network-simplex/fig05.svg){ .fig loading=lazy  }

        La struttura ad albero iniziale ha $T=\{(1,2),(2,3),(3,4),(3,5),(6,1)\}$, $L=\{(2,4),(4,5),(5,1),(6,2)\}$ e $U=\emptyset$.

    **Domande**

    1. Calcola la soluzione ad albero della struttura ad albero iniziale, il suo costo e le sue potenziali. Non è degenerato?

    2. Risolvere il problema con l'algoritmo del simplesso di rete, con le regole (N1)–(N4): per ogni iterazione fornire i flussi, i potenziali, i costi ridotti, l'arco entrante, il ciclo con il suo apice, il passo e l'arco uscente.

    3. Fornisci il flusso ottimale e il relativo costo e spiega perché è l'unico ottimale.

??? soluzione "Soluzione"

    Usiamo le regole (N1)–(N6) del riquadro all'inizio di questi esercizi.

    1. Dalle foglie, come in (N1):

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,2)\)</span></th>
        <th><span class="arithmatex">\((2,3)\)</span></th>
        <th><span class="arithmatex">\((2,4)\)</span></th>
        <th><span class="arithmatex">\((3,4)\)</span></th>
        <th><span class="arithmatex">\((3,5)\)</span></th>
        <th><span class="arithmatex">\((4,5)\)</span></th>
        <th><span class="arithmatex">\((5,1)\)</span></th>
        <th><span class="arithmatex">\((6,1)\)</span></th>
        <th><span class="arithmatex">\((6,2)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(x_{ij}\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        </table></div>

        Ogni arco dell'albero ha un flusso positivo, quindi la soluzione dell'albero non è degenere; il suo costo è $83$. Dalla radice $6$, $\vet{\pi}=(-5,-6,-10,-14,-16,0)$.

    2. <strong>Iterazione 1</strong><br> I potenziali sono $\vet{\pi}=(-5,-6,-10,-14,-16,0)$ e il costo è $83$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,2)\)</span></th>
        <th><span class="arithmatex">\((2,3)\)</span></th>
        <th><span class="arithmatex">\((2,4)\)</span></th>
        <th><span class="arithmatex">\((3,4)\)</span></th>
        <th><span class="arithmatex">\((3,5)\)</span></th>
        <th><span class="arithmatex">\((4,5)\)</span></th>
        <th><span class="arithmatex">\((5,1)\)</span></th>
        <th><span class="arithmatex">\((6,1)\)</span></th>
        <th><span class="arithmatex">\((6,2)\)</span></th>
        </tr>
        <tr>
        <td>stato</td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(x_{ij}\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\bar{c}_{ij}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(-4\)</span></td>
        </tr>
        </table></div>

        - Gli archi idonei sono $(2,4)$ e $(6,2)$; l'arco entrante è $e=(6,2)$, con $\bar{c}_{62}=-4$, in $L$: $C$ lo segue.

        - I percorsi dell'albero fino alla radice sono $6$ e $2,1,6$: l'apice è $w=6$ e $C$ è $6,2,1,6$.

            <div class="tabella" markdown="0"><table>
            <tr>
            <td>arco di <span class="arithmatex">\(C\)</span></td>
            <td><span class="arithmatex">\((6,2)\)</span></td>
            <td><span class="arithmatex">\((1,2)\)</span></td>
            <td><span class="arithmatex">\((6,1)\)</span></td>
            </tr>
            <tr>
            <td>direzione</td>
            <td><span class="arithmatex">\(+\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            </tr>
            <tr>
            <td>residuo</td>
            <td><span class="arithmatex">\(+\infty\)</span></td>
            <td><span class="arithmatex">\(4\)</span></td>
            <td><span class="arithmatex">\(5\)</span></td>
            </tr>
            </table></div>

        - $\theta=4$: l'unico arco bloccante è $(1,2)$; lascia l'albero, verso $L$. Il costo diventa $83-4 \cdot 4=67$.

        - La rimozione di $(1,2)$ elimina $S=\{2,3,4,5\}$, che contiene $l=2$: questi potenziali cambiano con $-\bar{c}_{62}=4$.

        <strong>Iterazione 2</strong><br> I potenziali sono $\vet{\pi}=(-5,-2,-6,-10,-12,0)$ e il costo è $67$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,2)\)</span></th>
        <th><span class="arithmatex">\((2,3)\)</span></th>
        <th><span class="arithmatex">\((2,4)\)</span></th>
        <th><span class="arithmatex">\((3,4)\)</span></th>
        <th><span class="arithmatex">\((3,5)\)</span></th>
        <th><span class="arithmatex">\((4,5)\)</span></th>
        <th><span class="arithmatex">\((5,1)\)</span></th>
        <th><span class="arithmatex">\((6,1)\)</span></th>
        <th><span class="arithmatex">\((6,2)\)</span></th>
        </tr>
        <tr>
        <td>stato</td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(x_{ij}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\bar{c}_{ij}\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        </table></div>

        - L'unico arco idoneo è $e=(2,4)$, con $\bar{c}_{24}=-1$, in $L$: $C$ lo segue.

        - I percorsi dell'albero fino alla radice sono $2,6$ e $4,3,2,6$: l'apice è $w=2$ e $C$ è $2,4,3,2$.

            <div class="tabella" markdown="0"><table>
            <tr>
            <td>arco di <span class="arithmatex">\(C\)</span></td>
            <td><span class="arithmatex">\((2,4)\)</span></td>
            <td><span class="arithmatex">\((3,4)\)</span></td>
            <td><span class="arithmatex">\((2,3)\)</span></td>
            </tr>
            <tr>
            <td>direzione</td>
            <td><span class="arithmatex">\(+\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            </tr>
            <tr>
            <td>residuo</td>
            <td><span class="arithmatex">\(+\infty\)</span></td>
            <td><span class="arithmatex">\(2\)</span></td>
            <td><span class="arithmatex">\(4\)</span></td>
            </tr>
            </table></div>

        - $\theta=2$: l'unico arco bloccante è $(3,4)$; lascia l'albero, verso $L$. Il costo diventa $67-2 \cdot 1=65$.

        - La rimozione di $(3,4)$ elimina $S=\{4\}$, che contiene $l=4$: questi potenziali cambiano con $-\bar{c}_{24}=1$.

        <strong>Iterazione 3</strong><br> I potenziali sono $\vet{\pi}=(-5,-2,-6,-9,-12,0)$ e il costo è $65$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,2)\)</span></th>
        <th><span class="arithmatex">\((2,3)\)</span></th>
        <th><span class="arithmatex">\((2,4)\)</span></th>
        <th><span class="arithmatex">\((3,4)\)</span></th>
        <th><span class="arithmatex">\((3,5)\)</span></th>
        <th><span class="arithmatex">\((4,5)\)</span></th>
        <th><span class="arithmatex">\((5,1)\)</span></th>
        <th><span class="arithmatex">\((6,1)\)</span></th>
        <th><span class="arithmatex">\((6,2)\)</span></th>
        </tr>
        <tr>
        <td>stato</td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(x_{ij}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\bar{c}_{ij}\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        </table></div>

        Tutti gli archi di $L$ hanno $\bar{c}_{ij} \ge 0$: <code>STOP</code>.

    3. Il flusso ottimale è

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,2)\)</span></th>
        <th><span class="arithmatex">\((2,3)\)</span></th>
        <th><span class="arithmatex">\((2,4)\)</span></th>
        <th><span class="arithmatex">\((3,4)\)</span></th>
        <th><span class="arithmatex">\((3,5)\)</span></th>
        <th><span class="arithmatex">\((4,5)\)</span></th>
        <th><span class="arithmatex">\((5,1)\)</span></th>
        <th><span class="arithmatex">\((6,1)\)</span></th>
        <th><span class="arithmatex">\((6,2)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\tilde{x}_{ij}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        </tr>
        </table></div>

        con costo $65$. Tutti gli archi non di base sono in $L$ con $\bar{c}_{ij}>0$, quindi per (N3) è l'unico ottimo; Gurobi dà lo stesso valore.

        ![Figura 6](../img/es-network-simplex/fig06.svg){ .fig loading=lazy  }

    !!! chiave ""

        Il simplesso della rete realizza pivot non degeneri $2$, con costi $83$, $67$, $65$; l'ultimo albero certifica l'unico ottimale, di costo $65$.

<a id="esercizio-8-4"></a>

!!! esercizio "Esercizio 8.4: La rete simplex con capacità"

    !!! esercizio "Esercizio"

        Consideriamo la rete $G=(N,A)$ con $N=\{1,2,\dots,5\}$, gli archi $8$

        $$
        A=\{(1,2),(1,4),(1,5),(2,3),(3,1),(3,4),(4,5),(5,3)\},
        $$

        i saldi $b_1=5$, $b_2=-5$, $b_3=7$, $b_4=-2$, $b_5=-5$, i limiti inferiori dello zero e i costi e le capacità della tabella; nella figura ogni arco porta $c_{ij},u_{ij}$ e ogni nodo il suo equilibrio.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,2)\)</span></th>
        <th><span class="arithmatex">\((1,4)\)</span></th>
        <th><span class="arithmatex">\((1,5)\)</span></th>
        <th><span class="arithmatex">\((2,3)\)</span></th>
        <th><span class="arithmatex">\((3,1)\)</span></th>
        <th><span class="arithmatex">\((3,4)\)</span></th>
        <th><span class="arithmatex">\((4,5)\)</span></th>
        <th><span class="arithmatex">\((5,3)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(c_{ij}\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u_{ij}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        </table></div>

        ![Figura 7](../img/es-network-simplex/fig07.svg){ .fig loading=lazy  }

        La struttura ad albero iniziale ha $T=\{(1,2),(1,4),(3,1),(4,5)\}$, $U=\{(1,5),(3,4),(5,3)\}$ e $L=\{(2,3)\}$.

    **Domande**

    1. Calcola la soluzione ad albero della struttura ad albero iniziale e il suo costo. Verifica che sia fortemente fattibile, con root $5$.

    2. Risolvi il problema con l'algoritmo del simplesso di rete, con le regole (N1)–(N4), fornendo tutti i dettagli di ogni iterazione.

    3. Quale pivot è degenerato? Cosa cambia in quel perno e cosa no?

    4. Fornisci il flusso ottimale, il suo costo e gli archi alla loro capacità.

??? soluzione "Soluzione"

    Usiamo le regole (N1)–(N6) del riquadro all'inizio di questi esercizi.

    1. Dalle foglie, come in (N1):

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,2)\)</span></th>
        <th><span class="arithmatex">\((1,4)\)</span></th>
        <th><span class="arithmatex">\((1,5)\)</span></th>
        <th><span class="arithmatex">\((2,3)\)</span></th>
        <th><span class="arithmatex">\((3,1)\)</span></th>
        <th><span class="arithmatex">\((3,4)\)</span></th>
        <th><span class="arithmatex">\((4,5)\)</span></th>
        <th><span class="arithmatex">\((5,3)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(x_{ij}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u_{ij}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        </table></div>

        Il suo costo è $121$. Gli archi dell'albero a limite sono: $(1,4)$, con $x_{14}=0$, punta verso la radice; $(1,2)$, con $x_{12}=5=u_{12}$, punta lontano dalla radice. Per (N5) la struttura ad albero è fortemente ammissibile.

    2. <strong>Iterazione 1</strong><br> I potenziali sono $\vet{\pi}=(9,3,16,7,0)$ e il costo è $121$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,2)\)</span></th>
        <th><span class="arithmatex">\((1,4)\)</span></th>
        <th><span class="arithmatex">\((1,5)\)</span></th>
        <th><span class="arithmatex">\((2,3)\)</span></th>
        <th><span class="arithmatex">\((3,1)\)</span></th>
        <th><span class="arithmatex">\((3,4)\)</span></th>
        <th><span class="arithmatex">\((4,5)\)</span></th>
        <th><span class="arithmatex">\((5,3)\)</span></th>
        </tr>
        <tr>
        <td>stato</td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{U}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{U}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{U}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(x_{ij}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\bar{c}_{ij}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(-3\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(-7\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        </tr>
        </table></div>

        - L'unico arco idoneo è $e=(5,3)$, con $\bar{c}_{53}=22$, in $U$: $C$ viene attraversato rispetto ad esso.

        - I percorsi dell'albero fino alla radice sono $5$ e $3,1,4,5$: l'apice è $w=5$ e $C$ è $5,4,1,3,5$.

            <div class="tabella" markdown="0"><table>
            <tr>
            <td>arco di <span class="arithmatex">\(C\)</span></td>
            <td><span class="arithmatex">\((4,5)\)</span></td>
            <td><span class="arithmatex">\((1,4)\)</span></td>
            <td><span class="arithmatex">\((3,1)\)</span></td>
            <td><span class="arithmatex">\((5,3)\)</span></td>
            </tr>
            <tr>
            <td>direzione</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            </tr>
            <tr>
            <td>residuo</td>
            <td><span class="arithmatex">\(4\)</span></td>
            <td><span class="arithmatex">\(0\)</span></td>
            <td><span class="arithmatex">\(3\)</span></td>
            <td><span class="arithmatex">\(2\)</span></td>
            </tr>
            </table></div>

        - $\theta=0$: l'unico arco bloccante è $(1,4)$; lascia l'albero, verso $L$. Il pivot è degenerato e il costo rimane $121$.

        - La rimozione di $(1,4)$ elimina $S=\{1,2,3\}$, che contiene $l=3$: questi potenziali cambiano con $-\bar{c}_{53}=-22$.

        <strong>Iterazione 2</strong><br> I potenziali sono $\vet{\pi}=(-13,-19,-6,7,0)$ e il costo è $121$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,2)\)</span></th>
        <th><span class="arithmatex">\((1,4)\)</span></th>
        <th><span class="arithmatex">\((1,5)\)</span></th>
        <th><span class="arithmatex">\((2,3)\)</span></th>
        <th><span class="arithmatex">\((3,1)\)</span></th>
        <th><span class="arithmatex">\((3,4)\)</span></th>
        <th><span class="arithmatex">\((4,5)\)</span></th>
        <th><span class="arithmatex">\((5,3)\)</span></th>
        </tr>
        <tr>
        <td>stato</td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{U}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{U}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(x_{ij}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\bar{c}_{ij}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        </table></div>

        - Gli archi idonei sono $(1,5)$ e $(3,4)$; l'arco entrante è $e=(1,5)$, con $\bar{c}_{15}=19$, in $U$: $C$ viene attraversato contro di esso.

        - I percorsi dell'albero fino alla radice sono $1,3,5$ e $5$: l'apice è $w=5$ e $C$ è $5,1,3,5$.

            <div class="tabella" markdown="0"><table>
            <tr>
            <td>arco di <span class="arithmatex">\(C\)</span></td>
            <td><span class="arithmatex">\((1,5)\)</span></td>
            <td><span class="arithmatex">\((3,1)\)</span></td>
            <td><span class="arithmatex">\((5,3)\)</span></td>
            </tr>
            <tr>
            <td>direzione</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            </tr>
            <tr>
            <td>residuo</td>
            <td><span class="arithmatex">\(3\)</span></td>
            <td><span class="arithmatex">\(3\)</span></td>
            <td><span class="arithmatex">\(2\)</span></td>
            </tr>
            </table></div>

        - $\theta=2$: l'unico arco bloccante è $(5,3)$; lascia l'albero, verso $L$. Il costo diventa $121-2 \cdot 19=83$.

        - La rimozione di $(5,3)$ elimina $S=\{1,2,3\}$, che contiene $k=1$: questi potenziali cambiano con $\bar{c}_{15}=19$.

        <strong>Iterazione 3</strong><br> I potenziali sono $\vet{\pi}=(6,0,13,7,0)$ e il costo è $83$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,2)\)</span></th>
        <th><span class="arithmatex">\((1,4)\)</span></th>
        <th><span class="arithmatex">\((1,5)\)</span></th>
        <th><span class="arithmatex">\((2,3)\)</span></th>
        <th><span class="arithmatex">\((3,1)\)</span></th>
        <th><span class="arithmatex">\((3,4)\)</span></th>
        <th><span class="arithmatex">\((4,5)\)</span></th>
        <th><span class="arithmatex">\((5,3)\)</span></th>
        </tr>
        <tr>
        <td>stato</td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{U}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(x_{ij}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\bar{c}_{ij}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(-4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        </tr>
        </table></div>

        Tutti gli archi di $L$ hanno $\bar{c}_{ij} \ge 0$ e tutti gli archi di $U$ hanno $\bar{c}_{ij} \le 0$: <code>STOP</code>.

    3. L'iterazione $1$ è degenere: $\theta=0$ perché l'arco $(1,4)$ ha capacità residua $0$ lungo $C$. Il flusso e il costo ($121$) non cambiano, ma l'albero sì: $(5,3)$ entra, $(1,4)$ esce e i potenziali di $S=\{1,2,3\}$ cambiano di $-22$.

    4. Il flusso ottimale è

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,2)\)</span></th>
        <th><span class="arithmatex">\((1,4)\)</span></th>
        <th><span class="arithmatex">\((1,5)\)</span></th>
        <th><span class="arithmatex">\((2,3)\)</span></th>
        <th><span class="arithmatex">\((3,1)\)</span></th>
        <th><span class="arithmatex">\((3,4)\)</span></th>
        <th><span class="arithmatex">\((4,5)\)</span></th>
        <th><span class="arithmatex">\((5,3)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\tilde{x}_{ij}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u_{ij}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        </table></div>

        con costo $83$; gli archi di $U$ alla loro capacità sono $(3,4)$. I costi ridotti sono strettamente positivi su $L$ e strettamente negativi su $U$, quindi l'ottimo è unico (Gurobi dà lo stesso valore).

        ![Figura 8](../img/es-network-simplex/fig08.svg){ .fig loading=lazy  }

    !!! chiave ""

        Dal costo $121$ l'algoritmo raggiunge l'unico ottimo, di costo $83$, in pivot $2$, uno dei quali degenere.

<a id="esercizio-8-5"></a>

!!! esercizio "Esercizio 8.5: Alberi fortemente ammissibili e regola dell'arco uscente"

    !!! esercizio "Esercizio"

        Consideriamo la rete $G=(N,A)$ con $N=\{1,2,\dots,6\}$, gli archi $9$

        $$
        A=\{(1,3),(1,5),(2,3),(4,2),(5,3),(5,4),(5,6),(6,1),(6,2)\},
        $$

        i saldi $b_1=0$, $b_2=-4$, $b_3=-5$, $b_4=1$, $b_5=3$, $b_6=5$, limiti inferiori dello zero e i costi e le capacità della tabella; nella figura ogni arco porta $c_{ij},u_{ij}$ e ogni nodo il suo equilibrio.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,3)\)</span></th>
        <th><span class="arithmatex">\((1,5)\)</span></th>
        <th><span class="arithmatex">\((2,3)\)</span></th>
        <th><span class="arithmatex">\((4,2)\)</span></th>
        <th><span class="arithmatex">\((5,3)\)</span></th>
        <th><span class="arithmatex">\((5,4)\)</span></th>
        <th><span class="arithmatex">\((5,6)\)</span></th>
        <th><span class="arithmatex">\((6,1)\)</span></th>
        <th><span class="arithmatex">\((6,2)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(c_{ij}\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u_{ij}\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        </tr>
        </table></div>

        ![Figura 9](../img/es-network-simplex/fig09.svg){ .fig loading=lazy  }

        Consideriamo la struttura ad albero con $T=\{(1,3),(1,5),(2,3),(4,2),(6,1)\}$, $U=\{(5,3),(5,4)\}$ e $L=\{(5,6),(6,2)\}$.

    **Domande**

    1. Calcolare la soluzione ad albero e verificare che la struttura ad albero sia fortemente ammissibile, con root $6$.

    2. Calcolare i potenziali ed i costi ridotti, e scegliere l'arco entrante con (N4).

    3. Trova l'apice, il ciclo, il gradino e gli archi di blocco. Quale arco esce dall'albero con la regola di (N4)? Verificare che la nuova struttura ad albero sia fortemente ammissibile.

    4. Mostrare che scegliendo l'altro arco di blocco, $(1,3)$, si ottiene una struttura ad albero che non è fortemente ammissibile.

    5. Dimostrare che in un pivot degenere da un albero fortemente ammissibile, eseguito con la regola di (N4), la somma dei potenziali diminuisce rigorosamente, e verificarlo su questo pivot.

??? soluzione "Soluzione"

    Usiamo le regole (N1)–(N6) del riquadro all'inizio di questi esercizi.

    1. Dalle foglie, come in (N1):

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,3)\)</span></th>
        <th><span class="arithmatex">\((1,5)\)</span></th>
        <th><span class="arithmatex">\((2,3)\)</span></th>
        <th><span class="arithmatex">\((4,2)\)</span></th>
        <th><span class="arithmatex">\((5,3)\)</span></th>
        <th><span class="arithmatex">\((5,4)\)</span></th>
        <th><span class="arithmatex">\((5,6)\)</span></th>
        <th><span class="arithmatex">\((6,1)\)</span></th>
        <th><span class="arithmatex">\((6,2)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(x_{ij}\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u_{ij}\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        </tr>
        </table></div>

        Gli archi dell'albero in corrispondenza di un limite sono: $(6,1)$, con $x_{61}=5=u_{61}$, punta lontano dalla radice; $(2,3)$, con $x_{23}=0$, punta verso la radice; $(1,3)$, con $x_{13}=3=u_{13}$, punta lontano dalla radice. Per (N5) la struttura ad albero è fortemente ammissibile.

    2. I potenziali sono $\vet{\pi}=(-7,-8,-9,-1,-15,0)$ e il costo è $125$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,3)\)</span></th>
        <th><span class="arithmatex">\((1,5)\)</span></th>
        <th><span class="arithmatex">\((2,3)\)</span></th>
        <th><span class="arithmatex">\((4,2)\)</span></th>
        <th><span class="arithmatex">\((5,3)\)</span></th>
        <th><span class="arithmatex">\((5,4)\)</span></th>
        <th><span class="arithmatex">\((5,6)\)</span></th>
        <th><span class="arithmatex">\((6,1)\)</span></th>
        <th><span class="arithmatex">\((6,2)\)</span></th>
        </tr>
        <tr>
        <td>stato</td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{U}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{U}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(x_{ij}\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\bar{c}_{ij}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(-3\)</span></td>
        </tr>
        </table></div>

        Gli archi idonei sono $(5,3)$, $(5,4)$ e $(6,2)$; l'arco entrante è $e=(5,4)$, con $\bar{c}_{54}=22$.

    3. I percorsi dell'albero fino alla radice sono $5,1,6$ e $4,2,3,1,6$: l'apice è $w=1$ e $C$ è $1,3,2,4,5,1$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <td>arco di <span class="arithmatex">\(C\)</span></td>
        <td><span class="arithmatex">\((1,3)\)</span></td>
        <td><span class="arithmatex">\((2,3)\)</span></td>
        <td><span class="arithmatex">\((4,2)\)</span></td>
        <td><span class="arithmatex">\((5,4)\)</span></td>
        <td><span class="arithmatex">\((1,5)\)</span></td>
        </tr>
        <tr>
        <td>direzione</td>
        <td><span class="arithmatex">\(+\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        </tr>
        <tr>
        <td>residuo</td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        </table></div>

        Quindi $\theta=0$ e gli archi di blocco sono $(1,3)$ e $(2,3)$, in questo ordine dall'apice: l'arco in uscita è $(2,3)$ e va a $L$. Il flusso non cambia e il nuovo albero è $T'=\{(1,3),(1,5),(4,2),(5,4),(6,1)\}$. Gli archi dell'albero in corrispondenza di un limite sono: $(6,1)$, con $x_{61}=5=u_{61}$, punta lontano dalla radice; $(1,3)$, con $x_{13}=3=u_{13}$, punta lontano dalla radice; $(5,4)$, con $x_{54}=3=u_{54}$, punta lontano dalla radice. Per (N5) la struttura ad albero è fortemente ammissibile.

    4. Con $(1,3)$ in uscita, l'albero sarebbe $\{(1,5),(2,3),(4,2),(5,4),(6,1)\}$ e l'arco $(2,3)$ ha flusso zero e punta lontano dalla radice: per (N5) questa struttura ad albero non è fortemente ammissibile.

    5. In un pivot degenere tutti gli archi bloccanti giacciono sul percorso dell'albero $P$ dall'apice a $p$, il punto finale dove $C$ entra in $e$: gli archi del percorso da $q$ all'apice e $e$ stesso hanno capacità residua positiva, per forte fattibilità. Quindi l'arco uscente separa $p$ dalla radice, $p \in S$, e da (N4) i potenziali di $S$ cambiano da $\bar{c}_{kl}<0$ se $p=k$ (arco di $L$) o da $-\bar{c}_{kl}<0$ se $p=l$ (arco di $U$). Qui $p=4$, $S=\{2,4\}$ e i potenziali di $S$ cambiano di $-22$: la somma dei potenziali passa da $-40$ a $-84$.

    !!! chiave ""

        Il perno di $(5,4)$ è degenere con due archi di bloccaggio; la regola sceglie $(2,3)$ e mantiene l'albero fortemente ammissibile, mentre $(1,3)$ no; la somma dei potenziali scende da $-40$ a $-84$.

<a id="esercizio-8-6"></a>

!!! esercizio "Esercizio 8.6: Phase 0"

    !!! esercizio "Esercizio"

        Consideriamo la rete $G=(N,A)$ con $N=\{1,2,\dots,5\}$, gli archi $6$

        $$
        A=\{(1,4),(1,5),(2,1),(3,2),(4,3),(5,2)\},
        $$

        i saldi $b_1=4$, $b_2=-4$, $b_3=3$, $b_4=-1$, $b_5=-2$, i limiti inferiori dello zero e i costi e le capacità della tabella; nella figura ogni arco porta $c_{ij},u_{ij}$ e ogni nodo il suo equilibrio.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,4)\)</span></th>
        <th><span class="arithmatex">\((1,5)\)</span></th>
        <th><span class="arithmatex">\((2,1)\)</span></th>
        <th><span class="arithmatex">\((3,2)\)</span></th>
        <th><span class="arithmatex">\((4,3)\)</span></th>
        <th><span class="arithmatex">\((5,2)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(c_{ij}\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u_{ij}\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        </table></div>

        ![Figura 10](../img/es-network-simplex/fig10.svg){ .fig loading=lazy  }

        Nessun flusso fattibile è noto in anticipo.

    **Domande**

    1. Costruire la rete ausiliaria della Fase 0 come in (N6): nodo artificiale, archi artificiali, costi, albero iniziale, i suoi flussi, il suo costo $z_0$ e le sue potenziali.

    2. Esegui la Fase 0 con le regole (N1)–(N4). La rete è fattibile?

    3. Quali archi vengono congelati alla fine della Fase 0? Continuare con l'algoritmo del simplesso di rete e trovare un flusso ottimale di $G$.

??? soluzione "Soluzione"

    Usiamo le regole (N1)–(N6) del riquadro all'inizio di questi esercizi.

    1. Il nodo artificiale è $6$, con $b_{6}=0$, e gli archi artificiali sono $(1,6)$, $(6,2)$, $(3,6)$, $(6,4)$ e $(6,5)$, con capacità $+\infty$ e costo $1$ (gli archi di $A$ costano $0$). L'albero iniziale è formato dagli archi artificiali, con flussi $x_{16}=4$, $x_{62}=4$, $x_{36}=3$, $x_{64}=1$, $x_{65}=2$ e $z_0=14$. La radice è $6$ e i potenziali sono $\vet{\pi}=(1,-1,1,-1,-1,0)$: $1$ per gli archi $(i,6)$, $-1$ per gli archi $(6,i)$.

        ![Figura 11](../img/es-network-simplex/fig11.svg){ .fig loading=lazy  }

        Gli archi di $A$, tutti vuoti, non vengono disegnati.

    2. <strong>Iterazione 1</strong><br> I potenziali sono $\vet{\pi}=(1,-1,1,-1,-1,0)$ e il costo $z_0$ è $14$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,4)\)</span></th>
        <th><span class="arithmatex">\((1,5)\)</span></th>
        <th><span class="arithmatex">\((1,6)\)</span></th>
        <th><span class="arithmatex">\((2,1)\)</span></th>
        <th><span class="arithmatex">\((3,2)\)</span></th>
        <th><span class="arithmatex">\((3,6)\)</span></th>
        <th><span class="arithmatex">\((4,3)\)</span></th>
        <th><span class="arithmatex">\((5,2)\)</span></th>
        <th><span class="arithmatex">\((6,2)\)</span></th>
        <th><span class="arithmatex">\((6,4)\)</span></th>
        <th><span class="arithmatex">\((6,5)\)</span></th>
        </tr>
        <tr>
        <td>stato</td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(x_{ij}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\bar{c}_{ij}\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        </table></div>

        - Gli archi idonei sono $(1,4)$, $(1,5)$ e $(3,2)$; l'arco entrante è $e=(1,4)$, con $\bar{c}_{14}=-2$, in $L$: $C$ lo segue.

        - I percorsi dell'albero fino alla radice sono $1,6$ e $4,6$: l'apice è $w=6$ e $C$ è $6,1,4,6$.

            <div class="tabella" markdown="0"><table>
            <tr>
            <td>arco di <span class="arithmatex">\(C\)</span></td>
            <td><span class="arithmatex">\((1,6)\)</span></td>
            <td><span class="arithmatex">\((1,4)\)</span></td>
            <td><span class="arithmatex">\((6,4)\)</span></td>
            </tr>
            <tr>
            <td>direzione</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(+\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            </tr>
            <tr>
            <td>residuo</td>
            <td><span class="arithmatex">\(4\)</span></td>
            <td><span class="arithmatex">\(6\)</span></td>
            <td><span class="arithmatex">\(1\)</span></td>
            </tr>
            </table></div>

        - $\theta=1$: l'unico arco bloccante è $(6,4)$; lascia l'albero, verso $L$. Il costo diventa $14-1 \cdot 2=12$.

        - La rimozione di $(6,4)$ esclude $S=\{4\}$, che contiene $l=4$: questi potenziali cambiano con $-\bar{c}_{14}=2$.

        <strong>Iterazione 2</strong><br> I potenziali sono $\vet{\pi}=(1,-1,1,1,-1,0)$ e il costo $z_0$ è $12$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,4)\)</span></th>
        <th><span class="arithmatex">\((1,5)\)</span></th>
        <th><span class="arithmatex">\((1,6)\)</span></th>
        <th><span class="arithmatex">\((2,1)\)</span></th>
        <th><span class="arithmatex">\((3,2)\)</span></th>
        <th><span class="arithmatex">\((3,6)\)</span></th>
        <th><span class="arithmatex">\((4,3)\)</span></th>
        <th><span class="arithmatex">\((5,2)\)</span></th>
        <th><span class="arithmatex">\((6,2)\)</span></th>
        <th><span class="arithmatex">\((6,4)\)</span></th>
        <th><span class="arithmatex">\((6,5)\)</span></th>
        </tr>
        <tr>
        <td>stato</td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(x_{ij}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\bar{c}_{ij}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        </table></div>

        - Gli archi idonei sono $(1,5)$ e $(3,2)$; l'arco entrante è $e=(1,5)$, con $\bar{c}_{15}=-2$, in $L$: $C$ lo segue.

        - I percorsi dell'albero fino alla radice sono $1,6$ e $5,6$: l'apice è $w=6$ e $C$ è $6,1,5,6$.

            <div class="tabella" markdown="0"><table>
            <tr>
            <td>arco di <span class="arithmatex">\(C\)</span></td>
            <td><span class="arithmatex">\((1,6)\)</span></td>
            <td><span class="arithmatex">\((1,5)\)</span></td>
            <td><span class="arithmatex">\((6,5)\)</span></td>
            </tr>
            <tr>
            <td>direzione</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(+\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            </tr>
            <tr>
            <td>residuo</td>
            <td><span class="arithmatex">\(3\)</span></td>
            <td><span class="arithmatex">\(3\)</span></td>
            <td><span class="arithmatex">\(2\)</span></td>
            </tr>
            </table></div>

        - $\theta=2$: l'unico arco bloccante è $(6,5)$; lascia l'albero, verso $L$. Il costo diventa $12-2 \cdot 2=8$.

        - La rimozione di $(6,5)$ esclude $S=\{5\}$, che contiene $l=5$: questi potenziali cambiano con $-\bar{c}_{15}=2$.

        <strong>Iterazione 3</strong><br> I potenziali sono $\vet{\pi}=(1,-1,1,1,1,0)$ e il costo $z_0$ è $8$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,4)\)</span></th>
        <th><span class="arithmatex">\((1,5)\)</span></th>
        <th><span class="arithmatex">\((1,6)\)</span></th>
        <th><span class="arithmatex">\((2,1)\)</span></th>
        <th><span class="arithmatex">\((3,2)\)</span></th>
        <th><span class="arithmatex">\((3,6)\)</span></th>
        <th><span class="arithmatex">\((4,3)\)</span></th>
        <th><span class="arithmatex">\((5,2)\)</span></th>
        <th><span class="arithmatex">\((6,2)\)</span></th>
        <th><span class="arithmatex">\((6,4)\)</span></th>
        <th><span class="arithmatex">\((6,5)\)</span></th>
        </tr>
        <tr>
        <td>stato</td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(x_{ij}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\bar{c}_{ij}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        </table></div>

        - Gli archi idonei sono $(3,2)$ e $(5,2)$; l'arco entrante è $e=(3,2)$, con $\bar{c}_{32}=-2$, in $L$: $C$ lo segue.

        - I percorsi dell'albero fino alla radice sono $3,6$ e $2,6$: l'apice è $w=6$ e $C$ è $6,3,2,6$.

            <div class="tabella" markdown="0"><table>
            <tr>
            <td>arco di <span class="arithmatex">\(C\)</span></td>
            <td><span class="arithmatex">\((3,6)\)</span></td>
            <td><span class="arithmatex">\((3,2)\)</span></td>
            <td><span class="arithmatex">\((6,2)\)</span></td>
            </tr>
            <tr>
            <td>direzione</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(+\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            </tr>
            <tr>
            <td>residuo</td>
            <td><span class="arithmatex">\(3\)</span></td>
            <td><span class="arithmatex">\(6\)</span></td>
            <td><span class="arithmatex">\(4\)</span></td>
            </tr>
            </table></div>

        - $\theta=3$: l'unico arco bloccante è $(3,6)$; lascia l'albero, verso $L$. Il costo diventa $8-3 \cdot 2=2$.

        - La rimozione di $(3,6)$ esclude $S=\{3\}$, che contiene $k=3$: questi potenziali cambiano con $\bar{c}_{32}=-2$.

        <strong>Iterazione 4</strong><br> I potenziali sono $\vet{\pi}=(1,-1,-1,1,1,0)$ e il costo $z_0$ è $2$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,4)\)</span></th>
        <th><span class="arithmatex">\((1,5)\)</span></th>
        <th><span class="arithmatex">\((1,6)\)</span></th>
        <th><span class="arithmatex">\((2,1)\)</span></th>
        <th><span class="arithmatex">\((3,2)\)</span></th>
        <th><span class="arithmatex">\((3,6)\)</span></th>
        <th><span class="arithmatex">\((4,3)\)</span></th>
        <th><span class="arithmatex">\((5,2)\)</span></th>
        <th><span class="arithmatex">\((6,2)\)</span></th>
        <th><span class="arithmatex">\((6,4)\)</span></th>
        <th><span class="arithmatex">\((6,5)\)</span></th>
        </tr>
        <tr>
        <td>stato</td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(x_{ij}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\bar{c}_{ij}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        </table></div>

        - Gli archi idonei sono $(4,3)$ e $(5,2)$; l'arco entrante è $e=(4,3)$, con $\bar{c}_{43}=-2$, in $L$: $C$ lo segue.

        - I percorsi dell'albero fino alla radice sono $4,1,6$ e $3,2,6$: l'apice è $w=6$ e $C$ è $6,1,4,3,2,6$.

            <div class="tabella" markdown="0"><table>
            <tr>
            <td>arco di <span class="arithmatex">\(C\)</span></td>
            <td><span class="arithmatex">\((1,6)\)</span></td>
            <td><span class="arithmatex">\((1,4)\)</span></td>
            <td><span class="arithmatex">\((4,3)\)</span></td>
            <td><span class="arithmatex">\((3,2)\)</span></td>
            <td><span class="arithmatex">\((6,2)\)</span></td>
            </tr>
            <tr>
            <td>direzione</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(+\)</span></td>
            <td><span class="arithmatex">\(+\)</span></td>
            <td><span class="arithmatex">\(+\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            </tr>
            <tr>
            <td>residuo</td>
            <td><span class="arithmatex">\(1\)</span></td>
            <td><span class="arithmatex">\(5\)</span></td>
            <td><span class="arithmatex">\(6\)</span></td>
            <td><span class="arithmatex">\(3\)</span></td>
            <td><span class="arithmatex">\(1\)</span></td>
            </tr>
            </table></div>

        - $\theta=1$: gli archi di bloccaggio sono $(1,6)$ e $(6,2)$, e l'ultimo dall'apice è $(6,2)$; lascia l'albero, verso $L$. Il costo diventa $2-1 \cdot 2=0$.

        - La rimozione di $(6,2)$ elimina $S=\{2,3\}$, che contiene $l=3$: questi potenziali cambiano con $-\bar{c}_{43}=2$.

        <strong>Iterazione 5</strong><br> I potenziali sono $\vet{\pi}=(1,1,1,1,1,0)$ e il costo $z_0$ è $0$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,4)\)</span></th>
        <th><span class="arithmatex">\((1,5)\)</span></th>
        <th><span class="arithmatex">\((1,6)\)</span></th>
        <th><span class="arithmatex">\((2,1)\)</span></th>
        <th><span class="arithmatex">\((3,2)\)</span></th>
        <th><span class="arithmatex">\((3,6)\)</span></th>
        <th><span class="arithmatex">\((4,3)\)</span></th>
        <th><span class="arithmatex">\((5,2)\)</span></th>
        <th><span class="arithmatex">\((6,2)\)</span></th>
        <th><span class="arithmatex">\((6,4)\)</span></th>
        <th><span class="arithmatex">\((6,5)\)</span></th>
        </tr>
        <tr>
        <td>stato</td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(x_{ij}\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\bar{c}_{ij}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        </table></div>

        Tutti gli archi di $L$ hanno $\bar{c}_{ij} \ge 0$: <code>STOP</code>.

        La fase 0 termina con $z_0=0$: per (N6) la rete è percorribile.

    3. Gli archi congelati, con $\bar{c}^0_{ij} \neq 0$, sono $(6,2)$ ($\bar{c}^0=2$), $(6,4)$ ($\bar{c}^0=2$), $(6,5)$ ($\bar{c}^0=2$). Con i costi $c_{ij}$ su $A$ e $0$ sugli archi artificiali: <br><strong>Iterazione 1</strong><br> I potenziali sono $\vet{\pi}=(0,-19,-13,-8,-8,0)$ e il costo è $61$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,4)\)</span></th>
        <th><span class="arithmatex">\((1,5)\)</span></th>
        <th><span class="arithmatex">\((1,6)\)</span></th>
        <th><span class="arithmatex">\((2,1)\)</span></th>
        <th><span class="arithmatex">\((3,2)\)</span></th>
        <th><span class="arithmatex">\((3,6)\)</span></th>
        <th><span class="arithmatex">\((4,3)\)</span></th>
        <th><span class="arithmatex">\((5,2)\)</span></th>
        <th><span class="arithmatex">\((6,2)\)</span></th>
        <th><span class="arithmatex">\((6,4)\)</span></th>
        <th><span class="arithmatex">\((6,5)\)</span></th>
        </tr>
        <tr>
        <td>stato</td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(x_{ij}\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\bar{c}_{ij}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(25\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(-4\)</span></td>
        <td><span class="arithmatex">\(-19\)</span></td>
        <td><span class="arithmatex">\(-8\)</span></td>
        <td><span class="arithmatex">\(-8\)</span></td>
        </tr>
        </table></div>

        Gli archi $(6,2)$, $(6,4)$ e $(6,5)$ violano (N3) ma sono congelati e non possono entrare.

        - L'unico arco idoneo è $e=(5,2)$, con $\bar{c}_{52}=-4$, in $L$: $C$ lo segue.

        - I percorsi dell'albero fino alla radice sono $5,1,6$ e $2,3,4,1,6$: l'apice è $w=1$ e $C$ è $1,5,2,3,4,1$.

            <div class="tabella" markdown="0"><table>
            <tr>
            <td>arco di <span class="arithmatex">\(C\)</span></td>
            <td><span class="arithmatex">\((1,5)\)</span></td>
            <td><span class="arithmatex">\((5,2)\)</span></td>
            <td><span class="arithmatex">\((3,2)\)</span></td>
            <td><span class="arithmatex">\((4,3)\)</span></td>
            <td><span class="arithmatex">\((1,4)\)</span></td>
            </tr>
            <tr>
            <td>direzione</td>
            <td><span class="arithmatex">\(+\)</span></td>
            <td><span class="arithmatex">\(+\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            </tr>
            <tr>
            <td>residuo</td>
            <td><span class="arithmatex">\(1\)</span></td>
            <td><span class="arithmatex">\(2\)</span></td>
            <td><span class="arithmatex">\(4\)</span></td>
            <td><span class="arithmatex">\(1\)</span></td>
            <td><span class="arithmatex">\(2\)</span></td>
            </tr>
            </table></div>

        - $\theta=1$: gli archi di bloccaggio sono $(1,5)$ e $(4,3)$, e l'ultimo dall'apice è $(4,3)$; lascia l'albero, verso $L$. Il costo diventa $61-1 \cdot 4=57$.

        - La rimozione di $(4,3)$ elimina $S=\{2,3\}$, che contiene $l=2$: questi potenziali cambiano con $-\bar{c}_{52}=4$.

        <strong>Iterazione 2</strong><br> I potenziali sono $\vet{\pi}=(0,-15,-9,-8,-8,0)$ e il costo è $57$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,4)\)</span></th>
        <th><span class="arithmatex">\((1,5)\)</span></th>
        <th><span class="arithmatex">\((1,6)\)</span></th>
        <th><span class="arithmatex">\((2,1)\)</span></th>
        <th><span class="arithmatex">\((3,2)\)</span></th>
        <th><span class="arithmatex">\((3,6)\)</span></th>
        <th><span class="arithmatex">\((4,3)\)</span></th>
        <th><span class="arithmatex">\((5,2)\)</span></th>
        <th><span class="arithmatex">\((6,2)\)</span></th>
        <th><span class="arithmatex">\((6,4)\)</span></th>
        <th><span class="arithmatex">\((6,5)\)</span></th>
        </tr>
        <tr>
        <td>stato</td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(x_{ij}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\bar{c}_{ij}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(-15\)</span></td>
        <td><span class="arithmatex">\(-8\)</span></td>
        <td><span class="arithmatex">\(-8\)</span></td>
        </tr>
        </table></div>

        Gli archi $(6,2)$, $(6,4)$ e $(6,5)$ violano (N3) ma sono congelati e non possono entrare. Tutti gli altri archi di $L$ hanno $\bar{c}_{ij} \ge 0$: <code>STOP</code>.

        Limitato a $A$, il flusso ottimale è

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,4)\)</span></th>
        <th><span class="arithmatex">\((1,5)\)</span></th>
        <th><span class="arithmatex">\((2,1)\)</span></th>
        <th><span class="arithmatex">\((3,2)\)</span></th>
        <th><span class="arithmatex">\((4,3)\)</span></th>
        <th><span class="arithmatex">\((5,2)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\tilde{x}_{ij}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        </table></div>

        con costo $57$ (Gurobi dà lo stesso valore).

    !!! chiave ""

        La fase 0 porta $z_0$ da $14$ a $0$ nei perni $4$; il simplesso della rete raggiunge quindi il flusso ottimo di $G$, di costo $57$, nel pivot $1$.
