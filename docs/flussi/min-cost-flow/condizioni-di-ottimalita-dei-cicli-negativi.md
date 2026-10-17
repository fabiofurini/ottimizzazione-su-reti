---
title: "Condizioni di ottimalità dei cicli negativi"
---

# 6.3 Condizioni di ottimalità dei cicli negativi { #sez-sec-mc-negcycle }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 6** · [:material-book-open-variant: Capitolo 6: Flusso di costo minimo](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-presentation: Slide](../../pdf/slide-min-cost-flow.pdf) · [:material-pencil: Esercizi: Flusso di costo minimo](../../esercizi/min-cost-flow.md) · [:material-gesture-tap: App: Flusso di costo minimo: cancellazione dei cicli e cammini minimi successivi](../../laboratorio/flusso-di-costo-minimo.md)

</div>

<a id="box-9-mc-th-negcycle"></a>

!!! teorema "Teorema 6.7: ottimalità dei cicli negativi"

    Un flusso ammissibile $\vet{x}$ è ottimo se e solo se la sua rete residua $G(\vet{x})$ non ha cicli negativi.

??? dimostrazione "Dimostrazione"

    Dimostriamo le due implicazioni.

    - <em>Un ciclo negativo migliora $\vet{x}$.</em> Sia $W$ un ciclo negativo di $G(\vet{x})$ e $\theta=\min\{r(W), 1\}>0$. Per la <span style="color:#1971c2">[Proposizione 6.3](la-rete-residua-con-i-costi.md#box-3-mc-prop-augment)</span>, $\vet{x}$ aumentato lungo $W$ di $\theta$ è un flusso ammissibile di costo $\vet{c}'\vet{x}+\theta\,c(W)<\vet{c}'\vet{x}$, quindi $\vet{x}$ non è ottimo.

    - <em>Senza cicli negativi $\vet{x}$ è ottimo.</em> Sia $\vet{x}'$ un qualsiasi flusso ammissibile. Per il <span style="color:#1971c2">[Lemma 6.6](circolazioni-e-loro-scomposizione.md#box-7-mc-lem-diff)</span>, $\vet{c}'\vet{x}'=\vet{c}'\vet{x}+\sum_h\theta_h\,c(W_h)$ con cicli $W_h$ di $G(\vet{x})$ e $\theta_h>0$. Ogni $c(W_h)$ è non negativo, quindi $\vet{c}'\vet{x}' \ge \vet{c}'\vet{x}$.

    <p class="qed-riga"><span class="qed">□</span></p>

- La dimostrazione confronta due flussi attraverso la loro differenza, e non usa la dualità della PL.

- Quando alcune capacità sono infinite il modello può essere illimitato, e la proposizione seguente dice esattamente quando.

<a id="box-10-mc-prop-unbounded"></a>

!!! teorema "Proposizione 6.8: istanze illimitate"

    Supponiamo che il modello $\mathrm{MCF}$ abbia un flusso ammissibile. Il modello è illimitato se e solo se $G$ ha un ciclo orientato $C$ di costo negativo, $\sum_{(i,j) \in C} c_{ij}<0$, i cui archi hanno tutti $u_{ij}=+\infty$.

??? dimostrazione "Dimostrazione"

    <em>Se.</em> Sia $\vet{x}$ ammissibile. Ogni arco di $C$ ha $x_{ij}<u_{ij}=+\infty$, quindi $C$ è un ciclo di archi in avanti di $G(\vet{x})$ con $r(C)=+\infty$. Aumentando lungo $C$ di un qualsiasi $\theta>0$ otteniamo flussi ammissibili di costo $\vet{c}'\vet{x}+\theta\,c(C)$, che tende a $-\infty$.

    <em>Solo se.</em> Supponiamo che un tale ciclo $C$ non esista, e fissiamo un flusso ammissibile $\vet{x}$. Sia $R$ la massima capacità residua finita di un arco di $G(\vet{x})$ ($R=0$ se non ce ne sono), e $K=\max_{(i,j) \in A}|c_{ij}|$. Sia $\vet{x}'$ un qualsiasi flusso ammissibile, scomposto come nel <span style="color:#1971c2">[Lemma 6.6](circolazioni-e-loro-scomposizione.md#box-7-mc-lem-diff)</span>.

    1. Un ciclo $W_h$ con $c(W_h)<0$ ha un arco $a$ di capacità residua finita: gli archi all'indietro hanno capacità residua finita, e un ciclo di archi in avanti con capacità infinita sarebbe un ciclo $C$. Quindi $\theta_h \le y_a \le r_a \le R$.

    2. $W_h$ ha al più $n$ archi, quindi $c(W_h) \ge -nK$; i cicli sono al più $m$.

    Quindi $\vet{c}'\vet{x}' \ge \vet{c}'\vet{x}-m\,R\,n\,K$ per ogni $\vet{x}'$ ammissibile: il modello è limitato. <span class="qed">□</span>

- Un problema di PL ammissibile e limitato ha una soluzione ottima ([Programmazione lineare, Capitolo 15 «La geometria della programmazione lineare»](https://fabiofurini.github.io/programmazione-lineare/metodi-avanzati/15-geometria/)). Con capacità finite il modello $\mathrm{MCF}$ non è mai illimitato.

<a id="box-11-mc-ex-negcycle"></a>

!!! esempio "Esempio 6.3: un flusso non ottimo e un'istanza illimitata"

    - Il flusso ammissibile $\bar{\vet{x}}=(1,4,3,0,4,0,2,2,2)$ del [Capitolo 4](../network-flow-models/reti-e-flussi.md) costa $63$. La sua rete residua ha il ciclo $W=1,2,4,5,3,1$, formato dagli archi in avanti $(1,2)$, $(2,4)$ e dagli archi all'indietro $(4,5)$, $(5,3)$, $(3,1)$:

        $$
        c(W)=2+5-5-3-2=-3, \qquad r(W)=\min\{3,1,2,4,4\}=1 .
        $$

        Per il <span style="color:#1971c2">[Teorema 6.7](#box-9-mc-th-negcycle)</span> $\bar{\vet{x}}$ non è ottimo. Aumentando di $1$ otteniamo $\tilde{\vet{x}}$, di costo $63-3=60$: il gap $3$ di $\bar{\vet{x}}$ calcolato con la soluzione duale nel Capitolo 4.

    - Con $c_{54}=-12$ e $u_{35}=u_{54}=u_{43}=+\infty$, il ciclo orientato $3,5,4,3$ di $G$ costa $3-12+3=-6$ e ha capacità infinite. Per la <span style="color:#1971c2">[Proposizione 6.8](#box-10-mc-prop-unbounded)</span> il modello è illimitato, come conferma Gurobi: ogni unità mandata lungo il ciclo abbassa il costo di $6$.

!!! chiave ""

    Un flusso ammissibile è ottimo se e solo se la sua rete residua non ha cicli negativi. Un modello ammissibile è illimitato se e solo se un ciclo orientato negativo ha tutte le capacità infinite.

---

**Avanti:** [6.4 Condizioni di ottimalità con i potenziali](condizioni-di-ottimalita-con-i-potenziali.md)
