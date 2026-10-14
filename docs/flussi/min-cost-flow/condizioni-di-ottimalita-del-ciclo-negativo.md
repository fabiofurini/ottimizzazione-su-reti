---
title: "Condizioni di ottimalità del ciclo negativo"
---

# 6.3 Condizioni di ottimalità del ciclo negativo { #sez-sec-mc-negcycle }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 6** · [:material-book-open-variant: Capitolo 6: Flusso di costo minimo](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-pencil: Esercizi: Flusso di costo minimo](../../esercizi/min-cost-flow.md)

</div>

<a id="box-9-mc-th-negcycle"></a>

!!! teorema "Teorema 6.7: ottimalità del ciclo negativo"

    Un flusso ammissibile $\vet{x}$ è ottimale se e solo se la sua rete residua $G(\vet{x})$ non ha ciclo negativo.

??? dimostrazione "Dimostrazione"

    Dimostriamo le due implicazioni.

    - <em>Un ciclo negativo migliora $\vet{x}$.</em> Sia $W$ un ciclo negativo di $G(\vet{x})$ e $\theta=\min\{r(W), 1\}>0$. By <span style="color:#1971c2">[Proposizione 6.3](la-rete-residua-con-i-costi.md#box-3-mc-prop-augment)</span>, $\vet{x}$ augmented along $W$ by $\theta$ è un flusso di costi fattibile $\vet{c}'\vet{x}+\theta\,c(W)<\vet{c}'\vet{x}$, quindi $\vet{x}$ non è ottimale.

    - <em>Senza cicli negativi $\vet{x}$ è ottimale.</em> Sia $\vet{x}'$ un flusso qualsiasi ammissibile. Di <span style="color:#1971c2">[Lemma 6.6](circolazioni-e-loro-scomposizione.md#box-7-mc-lem-diff)</span>, $\vet{c}'\vet{x}'=\vet{c}'\vet{x}+\sum_h\theta_h\,c(W_h)$ con cicli $W_h$ di $G(\vet{x})$ e $\theta_h>0$. Ogni $c(W_h)$ è non negativo, quindi $\vet{c}'\vet{x}' \ge \vet{c}'\vet{x}$.

    <p class="qed-riga"><span class="qed">□</span></p>

- La dimostrazione confronta due flussi attraverso la loro differenza e non utilizza la dualità LP.

- Quando alcune capacità sono infinite, il modello può essere illimitato e la proposizione successiva dice esattamente quando.

<a id="box-10-mc-prop-unbounded"></a>

!!! teorema "Proposizione 6.8: istanze illimitate"

    Supponiamo che il modello $\mathrm{MCF}$ abbia un flusso ammissibile. È illimitato se e solo se $G$ ha un ciclo diretto $C$ di costo negativo, $\sum_{(i,j) \in C} c_{ij}<0$, i cui archi hanno tutti $u_{ij}=+\infty$.

??? dimostrazione "Dimostrazione"

    <em>Se.</em> Sia $\vet{x}$ fattibile. Ogni arco di $C$ ha $x_{ij}<u_{ij}=+\infty$, quindi $C$ è un ciclo di archi in avanti di $G(\vet{x})$ con $r(C)=+\infty$. L'integrazione lungo $C$ con qualsiasi $\theta>0$ fornisce flussi di costi fattibili $\vet{c}'\vet{x}+\theta\,c(C)$, che tende a $-\infty$.

    <em>Solo se.</em> Assumi che non esista un tale ciclo $C$ e fissa un flusso ammissibile $\vet{x}$. Lascia che $R$ sia il più grande capacità residua finita di un arco di $G(\vet{x})$ ($R=0$ se non ce n'è) e $K=\max_{(i,j) \in A}|c_{ij}|$. Lascia che $\vet{x}'$ sia qualsiasi flusso ammissibile, scomposto come in <span style="color:#1971c2">[Lemma 6.6](circolazioni-e-loro-scomposizione.md#box-7-mc-lem-diff)</span>.

    1. Un ciclo $W_h$ con $c(W_h)<0$ ha un arco $a$ di capacità residua finita: gli archi all'indietro hanno residuo finito capacità e un ciclo di archi in avanti con capacità infinita sarebbe un ciclo $C$. Quindi $\theta_h \le y_a \le r_a \le R$.

    2. $W_h$ ha al massimo archi $n$, quindi $c(W_h) \ge -nK$; ci sono al massimo i cicli $m$.

    Quindi $\vet{c}'\vet{x}' \ge \vet{c}'\vet{x}-m\,R\,n\,K$ per ogni $\vet{x}'$ ammissibile: il modello è limitato. <span class="qed">□</span>

- Un PL ammissibile limitato ha una soluzione ottima ([Programmazione lineare, capitolo 15 «La geometria della Programmazione Lineare»](https://fabiofurini.github.io/programmazione-lineare/metodi-avanzati/15-geometria/)). Con capacità limitate, il modello $\mathrm{MCF}$ non è mai illimitato.

<a id="box-11-mc-ex-negcycle"></a>

!!! esempio "Esempio 6.3: un flusso non ottimale e un'istanza illimitata"

    - Il flusso ammissibile $\bar{\vet{x}}=(1,4,3,0,4,0,2,2,2)$ di [Capitolo 4](../network-flow-models/reti-e-flussi.md) costa $63$. La sua rete residua ha il ciclo $W=1,2,4,5,3,1$, composto dagli archi diretti $(1,2)$, $(2,4)$ e dagli archi all'indietro $(4,5)$, $(5,3)$, $(3,1)$:

        $$
        c(W)=2+5-5-3-2=-3, \qquad r(W)=\min\{3,1,2,4,4\}=1 .
        $$

        Per <span style="color:#1971c2">[Teorema 6.7](#box-9-mc-th-negcycle)</span> $\bar{\vet{x}}$ non è ottimale. L'aumento di $1$ dà $\tilde{\vet{x}}$, del costo $63-3=60$: il gap $3$ di $\bar{\vet{x}}$ calcolato con la soluzione duale nel Capitolo 4.

    - Con $c_{54}=-12$ e $u_{35}=u_{54}=u_{43}=+\infty$, il ciclo diretto $3,5,4,3$ di $G$ costa $3-12+3=-6$ e ha capacità infinite. Con <span style="color:#1971c2">[Proposizione 6.8](#box-10-mc-prop-unbounded)</span> il modello è illimitato, come Gurobi conferma: ogni unità inviata nel ciclo riduce il costo di $6$.

!!! chiave ""

    Un flusso ammissibile è ottimale se e solo se la sua rete residua non ha ciclo negativo. Un modello fattibile è illimitato se e solo se un ciclo diretto negativamente ha tutte le sue capacità infinite.

---

**Avanti:** [6.4 Condizioni di ottimalità con potenziali](condizioni-di-ottimalita-con-potenziali.md)
