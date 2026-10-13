---
title: "Feasibility conditions"
---

# 4.3 Feasibility conditions { #sez-sec-nf-feasibility }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 4** · [:material-book-open-variant: Capitolo 4: Modelli di flusso](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-pencil: Esercizi: Modelli di flusso](../../esercizi/network-flow-models.md)

</div>

<a id="box-7-nf-def-balanced"></a>

!!! definizione "Definizione 4.5: rete bilanciata"

    Una rete è <strong>balanced</strong> se $\sum_{i \in N} b_i=0$, cioè se l'offerta totale è uguale alla domanda totale.

<a id="box-8-nf-prop-balance"></a>

!!! teorema "Proposizione 4.6: una rete fattibile è bilanciata"

    Se una rete $G=(N,A)$ ha un flusso fattibile, allora $\sum_{i \in N} b_i=0$.

??? dimostrazione "Dimostrazione"

    Applicare <span style="color:#1971c2">[Lemma 4.3](reti-e-flussi.md#box-4-nf-lem-cut)</span> con $S=N$: nessun arco esce o entra in $N$, quindi $\delta^+(N)=\delta^-(N)= \emptyset$ e $\sum_{i \in N} b_i=0$. In forma di matrice, le righe di $\mat{B}$ si sommano al vettore zero, quindi le voci di $\vet{b}=\mat{B}\vet{x}$. <span class="qed">□</span>

<a id="box-9-nf-prop-cut"></a>

!!! teorema "Proposizione 4.7: cut condition"

    Se una rete $G=(N,A)$ ha un flusso ammissibile, allora per ogni $S \subseteq N$

    $$
    \sum_{i \in S} b_i \;\le\; u(\delta^+(S)) - l(\delta^-(S)),
    $$

    dove $u(F)$ e $l(F)$ sono le somme delle capacità e dei limiti inferiori degli archi di $F$.

??? dimostrazione "Dimostrazione"

    Sia $\vet{x}$ un flusso ammissibile. Da <span style="color:#1971c2">[Lemma 4.3](reti-e-flussi.md#box-4-nf-lem-cut)</span> e i limiti $x_{ij} \le u_{ij}$ su $\delta^+(S)$ e $x_{ij} \ge l_{ij}$ su $\delta^-(S)$,

    $$
    \sum_{i \in S} b_i = x(\delta^+(S))-x(\delta^-(S)) \le u(\delta^+(S))-l(\delta^-(S)).
    \qedhere
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

- L'offerta dei nodi di $S$, al netto della loro domanda, deve poter uscire da $S$ attraverso gli archi di $\delta^+(S)$, mentre gli archi di $\delta^-(S)$ portano almeno i loro limiti inferiori in $S$.

- Una rete equilibrata non può ancora avere un flusso fattibile: l'equilibrio è solo una condizione necessaria.

<a id="box-10-nf-ex-infeasible"></a>

!!! esempio "Esempio 4.3: reti bilanciate senza flusso fattibile"

    Manteniamo gli archi, i costi e le capacità della rete di riferimento e cambiamo gli equilibri.

    1. Con $b_5=-1$, $b_6=1$ e $b_i=0$ per gli altri nodi la rete è bilanciata. Ma il nodo $6$ non ha uscita arco: per $S=\{6\}$ otteniamo $\delta^+(S)=\emptyset$ e la condizione di taglio fallisce, poiché $b_6=1>0$.

    2. Con $b_1=9$, $b_6=-8$ e gli altri equilibri come in <span style="color:#1971c2">[Esempio 4.1](reti-e-flussi.md#box-3-nf-ex-ref)</span>, la rete è equilibrata, dal $9+2-3-8=0$. Per $S=\{1\}$ otteniamo $u(\delta^+(S))=u_{12}+u_{13}=8<9=b_1$: il nodo $1$ non può inviare la sua fornitura.

    Per la rete di riferimento stessa, tutti i set $62$ $S$ con $\emptyset \neq S \neq N$ soddisfano la condizione di taglio e il flusso $\bar{\vet{x}}$ di <span style="color:#1971c2">[Esempio 4.1](reti-e-flussi.md#box-3-nf-ex-ref)</span> è fattibile.

!!! chiave ""

    Una rete con flusso ammissibile è equilibrata, e ogni taglio può portare al suo interno la fornitura netta dei nodi. Questi sono necessarie condizioni: una rete equilibrata potrebbe non avere un flusso fattibile.

---

**Avanti:** [4.4 Rimozione dei limiti inferiori](rimozione-dei-limiti-inferiori.md)
