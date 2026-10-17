---
title: "Istanze non bilanciate"
---

# 4.5 Istanze non bilanciate { #sez-sec-nf-dummy }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 4** · [:material-book-open-variant: Capitolo 4: Modelli di flusso](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-presentation: Slide](../../pdf/slide-network-flow-models.pdf) · [:material-pencil: Esercizi: Modelli di flusso](../../esercizi/network-flow-models.md)

</div>

<a id="box-14-nf-def-unbalanced"></a>

!!! definizione "Definizione 4.10: istanza non bilanciata"

    Un'istanza con $\sum_{i \in N} b_i>0$ è <strong>non bilanciata</strong>: l'offerta totale supera la domanda totale. Ogni domanda deve essere soddisfatta, e ogni nodo di offerta $i$ invia <em>al più</em> $b_i$ unità:

    $$
    \sum_{(i,j) \in \delta^+(i)} x_{ij} - \sum_{(j,i) \in \delta^-(i)} x_{ji} \;\le\; b_i \quad \forall i \in N:\, b_i>0,
    \qquad\quad = b_i \quad \forall i \in N:\, b_i \le 0,
    $$

    con i limiti $l_{ij} \le x_{ij} \le u_{ij}$ e l'obiettivo $\min \sum_{(i,j) \in A} c_{ij}\,x_{ij}$.

<a id="box-15-nf-def-dummy"></a>

!!! definizione "Definizione 4.11: nodo fittizio"

    Siano $P=\{i \in N : b_i>0\}$ i nodi di offerta e $e=\sum_{i \in N} b_i>0$ l'eccesso. La <strong>rete bilanciata</strong> aggiunge un <strong>nodo fittizio</strong> $d$ con bilancio $b_d=-e$, e un arco $(i,d)$ per ogni $i \in P$ con $l_{id}=0$, $u_{id}=+\infty$ e $c_{id}=0$.

<a id="box-16-nf-prop-dummy"></a>

!!! teorema "Proposizione 4.12: il nodo fittizio"

    Le soluzioni ammissibili dell'istanza non bilanciata e i flussi ammissibili della rete bilanciata si corrispondono, con lo stesso costo: un flusso della rete bilanciata ristretto ad $A$ è ammissibile per l'istanza non bilanciata, e una soluzione dell'istanza non bilanciata diventa un flusso ammissibile con $x_{id}=b_i-(\text{flusso uscente}-\text{flusso entrante di } i)$.

??? dimostrazione "Dimostrazione"

    Per un vettore $\vet{x}$ su $A$, sia $s_i(\vet{x})$ il flusso uscente meno il flusso entrante del nodo $i$ lungo gli archi di $A$.

    1. Sia $(\vet{x},(x_{id})_{i \in P})$ ammissibile per la rete bilanciata. In $i \in P$ la conservazione si scrive $s_i(\vet{x})+x_{id}=b_i$ con $x_{id} \ge 0$, quindi $s_i(\vet{x}) \le b_i$; negli altri nodi di $N$ si scrive $s_i(\vet{x})=b_i$.

    2. Viceversa, sia $\vet{x}$ ammissibile per l'istanza non bilanciata, e poniamo $x_{id}=b_i-s_i(\vet{x}) \ge 0$ per $i \in P$. La conservazione vale in ogni nodo di $N$, e in $d$ il flusso entrante è

        $$
        \sum_{i \in P} x_{id}=\sum_{i \in P} b_i-\sum_{i \in N} s_i(\vet{x})+\sum_{i \notin P} s_i(\vet{x})
        =\sum_{i \in P} b_i - 0+\sum_{i \notin P} b_i=e,
        $$

        perché i valori $s_i(\vet{x})$ sommano a zero: ogni arco di $A$ dà $+x_{ij}$ alla sua coda e $-x_{ij}$ alla sua testa. Quindi $d$ riceve esattamente $-b_d=e$ unità.

    Gli archi fittizi costano zero, quindi i due costi coincidono. <span class="qed">□</span>

- Il flusso su $(i,d)$ è la parte dell'offerta di $i$ che non viene usata.

- Se la domanda totale supera l'offerta totale e le domande sono limiti superiori, un nodo fittizio $d$ con bilancio $b_d=-\sum_{i \in N} b_i$ e archi $(d,j)$ verso i nodi di domanda bilancia la rete allo stesso modo.

<a id="box-17-nf-ex-dummy"></a>

!!! esempio "Esempio 4.5: un nodo fittizio sulla rete di riferimento"

    Nella rete dell'<span style="color:#1971c2">[Esempio 4.1](reti-e-flussi.md#box-3-nf-ex-ref)</span> portiamo l'offerta del nodo $2$ a $b_2=4$. L'offerta totale è $9$, la domanda totale è $7$, e l'eccesso è $e=2$.

    - La rete bilanciata aggiunge il nodo $7$ con $b_7=-2$, e gli archi $(1,7)$ e $(2,7)$ con costo $0$ e capacità $+\infty$ (tratteggiati nella figura).

    - Il suo flusso ottimo, calcolato con Gurobi, spedisce tutte le $4$ unità del nodo $2$ e solo $3$ unità del nodo $1$: $x_{17}=2$, $x_{27}=0$, con valore ottimo $56$.

    ![Figura 2](../../img/network-flow-models/fig02.svg){ .fig loading=lazy  }

!!! chiave ""

    Un'istanza non bilanciata diventa una rete bilanciata con un nodo fittizio che assorbe l'eccesso attraverso archi a costo zero; il flusso su un arco fittizio è l'offerta non usata della sua coda.

---

**Avanti:** [4.6 Totale unimodularità e integralità](totale-unimodularita-e-integralita.md)
