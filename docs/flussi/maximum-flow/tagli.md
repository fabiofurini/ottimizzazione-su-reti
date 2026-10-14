---
title: "Tagli"
---

# 5.2 Tagli { #sez-sec-mf-cuts }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 5** · [:material-book-open-variant: Capitolo 5: Flusso massimo](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-pencil: Esercizi: Flusso massimo](../../esercizi/maximum-flow.md) · [:material-gesture-tap: App: Flusso massimo: Ford–Fulkerson ed Edmonds–Karp](../../laboratorio/flusso-massimo-ford-fulkerson-edmonds-karp.md)

</div>

<a id="box-3-mf-def-cut"></a>

!!! definizione "Definizione 5.2: $s$–$t$ taglio"

    Lascia che $S \subseteq N$ con $s \in S$ e $t \notin S$. Il taglio <strong>$s$–$t$</strong> $(S,N \setminus S)$ è il partizione dei nodi in $S$ e $N \setminus S$.

    - I suoi <strong>archi in avanti</strong> sono gli archi di $\delta^+(S)$, da $S$ a $N \setminus S$, e i suoi <strong>all'indietro archi</strong> gli archi di $\delta^-(S)$, da $N \setminus S$ a $S$.

    - La sua <strong>capacità</strong> è la capacità totale degli archi anteriori:

        $$
        u(S,N \setminus S)=\sum_{(i,j) \in \delta^+(S)} u_{ij} .
        $$

    - Un <strong>taglio minimo</strong> è un taglio $s$–$t$ di capacità minima.

- Le capacità degli archi indietro non entrano in $u(S,N \setminus S)$.

- Ogni nodo diverso da $s$ e $t$ può trovarsi su entrambi i lati, quindi una rete ha tagli $2^{n-2}$ $s$–$t$.

- Come nel Capitolo 4, $x(F)=\sum_{(i,j) \in F} x_{ij}$ per un insieme di archi $F$.

<a id="box-4-mf-lem-cut"></a>

!!! teorema "Lemma 5.3: flusso attraverso un $s$–$t$ taglio"

    Sia $\vet{x}$ un flusso ammissibile di valore $v$. Quindi, per ogni $s$–$t$ tagliato $(S,N \setminus S)$,

    $$
    v=x(\delta^+(S))-x(\delta^-(S)).
    $$

    In particolare, con $S=N \setminus \{t\}$, la raccolta netta di $t$ è $v$.

??? dimostrazione "Dimostrazione"

    Sia $b_i$ il deflusso netto del nodo $i$ sotto $\vet{x}$: $b_s=v$ e $b_i=0$ per $i \notin \{s,t\}$. Poi $\vet{x}$ soddisfa la conservazione del flusso con questi equilibri e [Capitolo 4, Lemma «flusso attraverso un taglio»](../network-flow-models/reti-e-flussi.md) dà $x(\delta^+(S))-x(\delta^-(S))=\sum_{i \in S} b_i$ per ogni $S \subseteq N$.

    1. Con $S=N$ nessun arco esce o entra in $S$, quindi $\sum_{i \in N} b_i=0$ e $b_t=-v$.

    2. Per un taglio $s$–$t$, $s \in S$ e $t \notin S$, quindi $\sum_{i \in S} b_i=b_s=v$. <span class="qed">□</span>

<a id="box-5-mf-cor-weak"></a>

!!! teorema "Corollario 5.4: dualità debole"

    Per ogni portata ammissibile $\vet{x}$ di valore $v$ ed ogni $s$–$t$ taglio $(S,N \setminus S)$,

    $$
    v \le u(S,N \setminus S),
    $$

    con uguaglianza se e solo se $x_{ij}=u_{ij}$ per ogni $(i,j) \in \delta^+(S)$ e $x_{ij}=0$ per ogni $(i,j) \in \delta^-(S)$. In case of equality, $\vet{x}$ is a maximum flow and $(S,N \setminus S)$ è un taglio minimo.

??? dimostrazione "Dimostrazione"

    Da <span style="color:#1971c2">[Lemma 5.3](#box-4-mf-lem-cut)</span> e i limiti $x_{ij} \le u_{ij}$ su $\delta^+(S)$ e $x_{ij} \ge 0$ su $\delta^-(S)$,

    $$
    v=x(\delta^+(S))-x(\delta^-(S)) \le u(S,N \setminus S)-0 .
    $$

    - L'uguaglianza vale se e solo se ogni limite utilizzato è stretto, arco per arco.

    - In caso di uguaglianza, ogni flusso ammissibile $\vet{x}'$ ha valore $v' \le u(S,N \setminus S)=v$, e ogni $s$–$t$ tagliare $(S',N \setminus S')$ ha $u(S',N \setminus S') \ge v=u(S,N \setminus S)$.

    <p class="qed-riga"><span class="qed">□</span></p>

<a id="box-6-mf-ex-cuts"></a>

!!! esempio "Esempio 5.2: i tagli della rete di riferimento"

    La rete di riferimento di <span style="color:#1971c2">[Esempio 5.1](il-problema-del-flusso-massimo.md#box-2-mf-ex-ref)</span> ha tagli $2^4=16$ $s$–$t$. Accanto a ciascun set $S$, il capacità $u(S,N \setminus S)$:

    $$
    \begin{array}{cc|cc|cc|cc}
    \hline {S} & {u} & {S} & {u} & {S} & {u} & {S} & {u} \\
    \hline {\{1\}} & {9} & {\{1,2\}} & {7} & {\{1,3\}} & {11} & {\{1,4\}} & {15} \\
    {\{1,5\}} & {14} & {\{1,2,3\}} & {7} & {\{1,2,4\}} & {10} & {\{1,2,5\}} & {12} \\
    {\{1,3,4\}} & {15} & {\{1,3,5\}} & {12} & {\{1,4,5\}} & {18} & {\{1,2,3,4\}} & {8} \\
    {\{1,2,3,5\}} & {8} & {\{1,2,4,5\}} & {13} & {\{1,3,4,5\}} & {14} & {\{1,2,3,4,5\}} & {7} \\
    \hline
    \end{array}
    $$

    - La capacità minima è $7$, ottenuta con tre tagli: $S=\{1,2\}$, $S=\{1,2,3\}$ e $S=\{1,2,3,4,5\}$. Di <span style="color:#1971c2">[Corollario 5.4](#box-5-mf-cor-weak)</span>, nessun flusso ammissibile ha un valore maggiore di $7$.

    - Per $S=\{1,2,3\}$ gli archi in avanti sono $(2,4)$, $(3,5)$ e l'arco all'indietro è $(4,3)$. Con il flusso $\bar{\vet{x}}$ di <span style="color:#1971c2">[Esempio 5.1](il-problema-del-flusso-massimo.md#box-2-mf-ex-ref)</span>,

        $$
        \bar{x}_{24}+\bar{x}_{35}-\bar{x}_{43}=3+2-2=3=v, \qquad u(S,N \setminus S)=u_{24}+u_{35}=3+4=7 .
        $$

!!! attenzione "La capacità di un taglio"

    La capacità $u(S,N \setminus S)$ somma le capacità solo degli archi anteriori. Per $S=\{1,2,3\}$ sì $u_{24}+u_{35}=7$; aggiungendo la capacità dell'arco all'indietro $(4,3)$ si otterrebbe $9$, che non delimita nulla. Un flusso su a L'arco all'indietro riporta le unità in $S$ e riduce il flusso netto attraverso il taglio.

!!! chiave ""

    Il flusso netto attraverso ogni taglio $s$–$t$ è il valore $v$, quindi $v \le u(S,N \setminus S)$ per ogni flusso e ogni taglio, con uguaglianza quando gli archi anteriori sono saturi e gli archi posteriori vuoti. Sulla rete di riferimento non c'è flusso valore maggiore di $7$.

---

**Avanti:** [5.3 La rete residua](la-rete-residua.md)
