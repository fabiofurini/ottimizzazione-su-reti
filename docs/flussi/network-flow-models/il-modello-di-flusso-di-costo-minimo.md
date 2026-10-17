---
title: "Il modello di flusso di costo minimo"
---

# 4.2 Il modello di flusso di costo minimo { #sez-sec-nf-model }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 4** · [:material-book-open-variant: Capitolo 4: Modelli di flusso](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-presentation: Slide](../../pdf/slide-network-flow-models.pdf) · [:material-pencil: Esercizi: Modelli di flusso](../../esercizi/network-flow-models.md)

</div>

<a id="box-5-nf-def-mcf"></a>

!!! definizione "Definizione 4.4: problema di flusso di costo minimo"

    Data una rete $G=(N,A)$ con bilanci $b_i$, limiti inferiori $l_{ij}$, capacità $u_{ij}$ e costi $c_{ij}$, il <strong>problema di flusso di costo minimo</strong> chiede un flusso ammissibile di costo minimo.

- Usiamo una variabile continua $x_{ij}$ per ogni arco $(i,j) \in A$, il flusso sull'arco.

!!! chiave ""

    Con queste variabili, un modello di programmazione lineare (LP) per il problema di flusso di costo minimo è il seguente:

    <a id="eq-nf-MCF"></a>

    \begin{align*}
    &&   \min \;\;{\sum_{(i,j) \in A} c_{ij} \, x_{ij}}                                      \label{nf:obj}  \tag{4.1a}\\[1ex]
    && \text{soggetto a} \quad  \sum_{(i,j) \in \delta^+(i)} x_{ij} - \sum_{(j,i) \in \delta^-(i)} x_{ji}
    &= b_i, & \forall i \in N,                                                       \label{nf:cons}  \tag{4.1b}\\[1ex]
    && l_{ij} \le x_{ij} &\le u_{ij}, & \forall (i,j) \in A.                          \label{nf:bounds} \tag{4.1c}
    \end{align*}

    Questo modello LP si indica come modello $\mathrm{MCF}$.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{MCF}$:

    - la funzione obiettivo lineare $\eqref{nf:obj}$ minimizza il costo totale del flusso;

    - i vincoli $\eqref{nf:cons}$ sono i vincoli di conservazione del flusso, uno per ogni nodo;

    - infine, i vincoli $\eqref{nf:bounds}$ impongono il limite inferiore e la capacità di ogni arco.

- Con la matrice di incidenza nodo–arco $\mat{B}$, il vettore $\vet{c}$ dei costi e i vettori $\vet{l}$, $\vet{u}$ dei limiti, il modello $\mathrm{MCF}$ è

    $$
    \min \;\big\{\, \vet{c}' \vet{x} \;:\; \mat{B}\vet{x}=\vet{b},~ \vet{l} \le \vet{x} \le \vet{u} \,\big\}.
    $$

- Il modello ha $m$ variabili e $n$ equazioni. La colonna di $x_{ij}$ in $\mat{B}$ ha solo due elementi non nulli, $+1$ nella riga $i$ e $-1$ nella riga $j$: questa struttura dà tutte le proprietà di questo capitolo.

<a id="box-6-nf-ex-model"></a>

!!! esempio "Esempio 4.2: il modello $\mathrm{MCF}$ della rete di riferimento"

    Per la rete dell'<span style="color:#1971c2">[Esempio 4.1](reti-e-flussi.md#box-3-nf-ex-ref)</span> il modello $\mathrm{MCF}$ ha $9$ variabili e $6$ equazioni:

    $\begin{array}{rrrrrrrrrrcr} \min & 2x_{12} & +2x_{13} & +5x_{24} & +2x_{32} & +3x_{35} & +3x_{43} & +5x_{46} & +5x_{54} & +3x_{56} & & \\[1ex] \text{soggetto a} & x_{12} & +x_{13} & & & & & & & & = & 5\\ & -x_{12} & & +x_{24} & -x_{32} & & & & & & = & 2\\ & & -x_{13} & & +x_{32} & +x_{35} & -x_{43} & & & & = & 0\\ & & & -x_{24} & & & +x_{43} & +x_{46} & -x_{54} & & = & -3\\ & & & & & -x_{35} & & & +x_{54} & +x_{56} & = & 0\\ & & & & & & & -x_{46} & & -x_{56} & = & -4 \end{array}$

    insieme a $0 \le x_{12} \le 4$, $0 \le x_{13} \le 4$, $0 \le x_{24} \le 4$, $0 \le x_{32} \le 2$, $0 \le x_{35} \le 4$, $0 \le x_{43} \le 3$, $0 \le x_{46} \le 5$, $0 \le x_{54} \le 3$, $0 \le x_{56} \le 2$. La matrice dei coefficienti delle equazioni è la matrice di incidenza $\mat{B}$ del grafo di riferimento.

!!! chiave ""

    Il problema di flusso di costo minimo è l'LP $\min\{\vet{c}'\vet{x} : \mat{B}\vet{x}=\vet{b},~\vet{l} \le \vet{x} \le \vet{u}\}$: una variabile per arco, un'equazione di conservazione per nodo.

---

**Avanti:** [4.3 Condizioni di ammissibilità](condizioni-di-ammissibilita.md)
