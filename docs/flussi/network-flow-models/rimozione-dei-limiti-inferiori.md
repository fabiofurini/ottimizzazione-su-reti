---
title: "Rimozione dei limiti inferiori"
---

# 4.4 Rimozione dei limiti inferiori { #sez-sec-nf-lower }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 4** · [:material-book-open-variant: Capitolo 4: Modelli di flusso](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-pencil: Esercizi: Modelli di flusso](../../esercizi/network-flow-models.md)

</div>

<a id="box-11-nf-def-subst"></a>

!!! definizione "Definizione 4.8: sostituzione dei limiti inferiori"

    Data una rete con limiti inferiori $\vet{l}$, la <strong>rete sostituita</strong> ha gli stessi nodi, archi e costi, zero limiti inferiori e

    $$
    b'_i=b_i-\sum_{(i,j) \in \delta^+(i)} l_{ij}+\sum_{(j,i) \in \delta^-(i)} l_{ji}, \quad \forall i \in N,
    \qquad\quad u'_{ij}=u_{ij}-l_{ij}, \quad \forall (i,j) \in A,
    $$

    ovvero $\vet{b}'=\vet{b}-\mat{B}\vet{l}$ e $\vet{u}'=\vet{u}-\vet{l}$.

- Le unità $l_{ij}$ che devono viaggiare su $(i,j)$ vengono inviate in anticipo: la coda $i$ ha unità $l_{ij}$ in meno a inviare, la testa $j$ ha unità $l_{ij}$ in meno da ricevere e l'arco ha unità $l_{ij}$ in meno di capacità libera.

<a id="box-12-nf-prop-subst"></a>

!!! teorema "Proposizione 4.9: rimozione dei limiti inferiori"

    La mappa $\vet{x}'=\vet{x}-\vet{l}$ è una corrispondenza biunivoca tra i flussi realizzabili di una rete e quelli della sua rete sostituita, e

    $$
    \vet{c}'\vet{x}=\vet{c}'\vet{x}'+\vet{c}'\vet{l}.
    $$

    Quindi i due modelli $\mathrm{MCF}$ hanno le stesse soluzioni ottimali, fino allo spostamento di $\vet{l}$, ed i loro valori ottimali differ by the constant $\vet{c}'\vet{l}$.

??? dimostrazione "Dimostrazione"

    La mappa è lineare e invertibile, con $\vet{x}=\vet{x}'+\vet{l}$ inverso. Per ogni $\vet{x} \in \R^m$:

    1. $\mat{B}\vet{x}=\vet{b}$ se e solo se $\mat{B}\vet{x}'=\mat{B}\vet{x}-\mat{B}\vet{l}=\vet{b}-\mat{B}\vet{l} =\vet{b}'$;

    2. $\vet{l} \le \vet{x} \le \vet{u}$ se e solo se $\vet{0} \le \vet{x}' \le \vet{u}-\vet{l}=\vet{u}'$;

    3. $\vet{c}'\vet{x}=\vet{c}'(\vet{x}'+\vet{l})=\vet{c}'\vet{x}'+\vet{c}'\vet{l}$.

    Il costo di ogni flusso ammissibile varia della stessa costante, quindi le soluzioni ottime corrispondono. <span class="qed">□</span>

<a id="box-13-nf-ex-lower"></a>

!!! esempio "Esempio 4.4: un limite inferiore sulla rete di riferimento"

    Nella rete di <span style="color:#1971c2">[Esempio 4.1](reti-e-flussi.md#box-3-nf-ex-ref)</span> imponiamo $l_{32}=1$: almeno un'unità deve viaggiare da $3$ a $2$. La colonna di $(3,2)$ in $\mat{B}$ ha $+1$ nella riga $3$ e $-1$ nella riga $2$, quindi $\mat{B}\vet{l}=(0,-1,1,0,0,0)'$ e

    $$
    \vet{b}'=\vet{b}-\mat{B}\vet{l}=(5,\,3,\,-1,\,-3,\,0,\,-4)', \qquad u'_{32}=2-1=1, \qquad \vet{c}'\vet{l}=c_{32}\,
    l_{32}=2.
    $$

    Il nodo $3$ diventa un nodo di domanda, perché ha già inviato un'unità e il nodo $2$ ha un'altra unità da inviare. Il la rete sostituita ha un valore ottimale $60$; aggiungendo la costante $2$, il valore ottimale con $l_{32}=1$ è $62$.

!!! chiave ""

    La sostituzione $\vet{x}=\vet{l}+\vet{x}'$ rimuove i limiti inferiori: $\vet{b}'=\vet{b}-\mat{B}\vet{l}$, $\vet{u}'=\vet{u}-\vet{l}$ e l'obiettivo cambia in base alla costante $\vet{c}'\vet{l}$.

---

**Avanti:** [4.5 Istanze non bilanciate](istanze-non-bilanciate.md)
