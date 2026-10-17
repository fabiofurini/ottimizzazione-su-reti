---
title: "La formulazione di programmazione lineare"
---

# 3.3 La formulazione di programmazione lineare { #sez-sec-sp-lp }

<div class="info-capitolo" markdown>

**Parte 2 · Alberi e cammini · Capitolo 3** · [:material-book-open-variant: Capitolo 3: Cammini minimi](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-alberi-e-cammini.pdf) · [:material-presentation: Slide](../../pdf/slide-shortest-paths.pdf) · [:material-pencil: Esercizi: Cammini minimi](../../esercizi/shortest-paths.md) · [:material-gesture-tap: App: Cammini minimi: Dijkstra, Bellman–Ford, grafi aciclici](../../laboratorio/cammini-minimi-dijkstra-bellman-ford.md)

</div>

- Un cammino da $s$ a $t$ invia un'unità di flusso da $s$ a $t$. Usiamo una variabile $x_{ij} \ge 0$ per ogni arco, il flusso sull'arco, e i <strong>bilanci</strong>

    $$
    b_s=1, \qquad b_t=-1, \qquad b_i=0, \quad \forall i \in N \setminus \{s,t\}.
    $$

!!! chiave ""

    Usando queste variabili, un modello LP per il problema del cammino minimo $s$–$t$ è il seguente:

    <a id="eq-SP_ST"></a>

    \begin{align*}
    &&   \min \;\;{\sum_{(i,j) \in A} d_{ij} \, x_{ij}}                                     \label{obj_SP}  \tag{3.1a}\\[1ex]
    && \text{soggetto a} \quad  {\sum_{(i,j) \in \delta^+(i)} x_{ij} \;-\; \sum_{(j,i) \in \delta^-(i)} x_{ji}}
    &= b_i, & \forall i \in N,                                                           \label{cons1_SP}  \tag{3.1b}\\[1ex]
    &&x_{ij}                        &\ge  0, & \forall (i,j) \in A.                    \label{cons2_SP} \tag{3.1c}
    \end{align*}

    Questo modello LP si indica come modello $\mathrm{SP}(s,t)$.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{SP}(s,t)$:

    - la funzione obiettivo $\eqref{obj_SP}$ minimizza la lunghezza totale del flusso;

    - i vincoli $\eqref{cons1_SP}$ sono i vincoli di conservazione del flusso: un'unità esce da $s$, un'unità entra in $t$, e ogni altro nodo invia quello che riceve;

    - infine, i vincoli $\eqref{cons2_SP}$ definiscono le variabili del modello LP.

- In forma matriciale il modello è $\min\{\vet{d}'\vet{x} : \mat{B}\vet{x}=\vet{b},\ \vet{x} \ge \vet{0}\}$, con la matrice di incidenza nodo-arco $\mat{B}$ del [Capitolo 1](../../grafi/graphs/rappresentazioni-di-un-grafo.md): $+1$ nella coda e $-1$ nella testa di ogni arco.

- Il <strong>vettore di incidenza</strong> $\vet{x}^P$ di un cammino $P$ da $s$ a $t$, con $x^P_{ij}=1$ sugli archi di $P$ e $0$ altrove, è ammissibile, e il suo valore è $d(P)$.

## 3.3.1 Il modello duale e i potenziali

- Il vincolo del nodo $i$ è un'equazione, quindi la sua variabile duale $\pi_i$ è libera. La colonna di $x_{ij}$ in $\mat{B}$ ha $+1$ nella riga $i$ e $-1$ nella riga $j$, quindi il vincolo duale di $x_{ij} \ge 0$ è $\pi_i-\pi_j \le d_{ij}$ ([Programmazione lineare, Capitolo 9 «Teoria della dualità»](https://fabiofurini.github.io/programmazione-lineare/dualita/09-dualita/)).

!!! chiave ""

    Usando una variabile duale libera $\pi_i$ per ciascun vincolo $\eqref{cons1_SP}$, il modello duale del modello $\mathrm{SP}(s,t)$ è:

    <a id="eq-DUAL_SP"></a>

    \begin{align*}
    &&   \max \;\; \pi_s-\pi_t                                                    \label{obj_DSP}  \tag{3.2a}\\[2ex]
    && \text{soggetto a} \quad  \pi_i-\pi_j  &\le d_{ij}, & \forall (i,j) \in A,          \label{cons1_DSP}  \tag{3.2b}\\[2ex]
    &&\pi_i                        &\in \R, & \forall i \in N.                           \label{cons2_DSP} \tag{3.2c}
    \end{align*}

- Il vincolo $\eqref{cons1_DSP}$ è $\bar{c}_{ij}=d_{ij}-\pi_i+\pi_j \ge 0$: le soluzioni ammissibili del duale sono i potenziali ammissibili della <span style="color:#1971c2">[Definizione 3.7](condizioni-di-ottimalita-e-potenziali.md#box-10-sp-def-potentials)</span>, e $\bar{c}_{ij}$ è il costo ridotto di $x_{ij}$ nel senso della programmazione lineare.

<a id="box-14-sp-th-lp"></a>

!!! teorema "Teorema 3.10: LP e cammini minimi"

    Sotto (A1) e (A2), il modello $\mathrm{SP}(s,t)$ ha una soluzione ottima e $z(\mathrm{SP}(s,t))=\tilde{d}(t)$. Il vettore di incidenza di un cammino minimo da $s$ a $t$ è ottimo per $\mathrm{SP}(s,t)$, e i potenziali $\pi_i=-\tilde{d}(i)$ sono ottimi per $D(\mathrm{SP}(s,t))$.

??? dimostrazione "Dimostrazione"

    Sia $P$ un cammino minimo da $s$ a $t$, che esiste per (A1).

    1. $\vet{x}^P$ è ammissibile per $\mathrm{SP}(s,t)$, con valore $d(P)=\tilde{d}(t)$.

    2. Per il <span style="color:#1971c2">[Teorema 3.5](problemi-di-cammino-minimo.md#box-7-sp-th-bellman)</span>, $\tilde{d}(j) \le \tilde{d}(i)+d_{ij}$ per ogni arco, quindi $\pi_i=-\tilde{d}(i)$ soddisfa $\pi_i-\pi_j \le d_{ij}$; il suo valore è $\pi_s-\pi_t=0+\tilde{d}(t)$.

    3. Una soluzione primale ammissibile e una soluzione duale ammissibile con lo stesso valore sono entrambe ottime, per la dualità debole. <span class="qed">□</span>

<a id="box-15-sp-prop-unbounded"></a>

!!! teorema "Proposizione 3.11: un ciclo negativo rende il modello illimitato"

    Se $\mathrm{SP}(s,t)$ è ammissibile e $G$ ha un ciclo negativo $C$, raggiungibile da $s$ o no, allora $\mathrm{SP}(s,t)$ è illimitato.

??? dimostrazione "Dimostrazione"

    Sia $\bar{\vet{x}}$ ammissibile e sia $\vet{x}^C$ il vettore di incidenza di $C$. Le colonne degli archi di $C$ sommano a zero ([Capitolo 1, Lemma «colonne di un ciclo»](../../grafi/graphs/il-rango-della-matrice-di-incidenza.md)), quindi $\mat{B}\vet{x}^C=\vet{0}$. Per ogni $\lambda \ge 0$ il vettore $\bar{\vet{x}}+\lambda\vet{x}^C$ è ammissibile, con valore $\vet{d}'\bar{\vet{x}}+\lambda\, d(C)$, che tende a $-\infty$. <span class="qed">□</span>

!!! attenzione "Il segno dei potenziali"

    Con la matrice di incidenza del corso ($+1$ nella coda) il vincolo duale è $\pi_i-\pi_j \le d_{ij}$, e i potenziali ottimi sono $\pi_i=-\tilde{d}(i)$, a meno di una costante additiva. La forma $\pi_j-\pi_i \le d_{ij}$, con $\pi_i=\tilde{d}(i)$, appartiene alla convenzione di segno opposta ($-1$ nella coda).

## 3.3.2 Il modello a sorgente singola

- Per trovare un cammino minimo da $s$ a ogni nodo, $s$ invia un'unità a ciascuno degli altri $n-1$ nodi:

    $$
    b_s=n-1, \qquad b_i=-1, \quad \forall i \in N \setminus \{s\}.
    $$

    Con questi bilanci il modello [(3.1)](#eq-SP_ST) si chiama $\mathrm{SP}(s)$; il suo duale massimizza $(n-1)\pi_s-\sum_{i \neq s}\pi_i$ con gli stessi vincoli $\eqref{cons1_DSP}$.

<a id="box-16-sp-prop-single"></a>

!!! teorema "Proposizione 3.12: il modello a sorgente singola"

    Sotto (A1) e (A2), sia $T$ un albero dei cammini minimi e, per ogni $j \neq s$, sia $T_j$ l'insieme dei nodi il cui cammino nell'albero passa per $j$ ($j$ compreso). Il flusso con $x_{ij}=|T_j|$ sugli archi $(i,j)$ di $T$ e $0$ altrove è ottimo per $\mathrm{SP}(s)$, i potenziali $\pi_i=-\tilde{d}(i)$ sono ottimi per il suo duale, e

    $$
    z(\mathrm{SP}(s))=\sum_{j \in N}\tilde{d}(j).
    $$

??? dimostrazione "Dimostrazione"

    1. <em>Ammissibilità.</em> In un nodo $j \neq s$ il flusso che entra sull'arco dell'albero è $|T_j|$, e il flusso che esce è $\sum |T_h|$ sugli archi dell'albero $(j,h)$, cioè $|T_j|-1$: il bilancio è $-1$. In $s$ il flusso uscente copre tutti gli altri nodi: $n-1$.

    2. <em>Valore.</em> Il flusso è la somma dei vettori di incidenza degli $n-1$ cammini dell'albero, perché l'arco $(i,j)$ sta sui cammini dell'albero dei $|T_j|$ nodi di $T_j$. Il suo valore è $\sum_{j}\tilde{d}(j)$.

    3. <em>Duale.</em> $\pi_i=-\tilde{d}(i)$ è ammissibile come nel <span style="color:#1971c2">[Teorema 3.10](#box-14-sp-th-lp)</span>, con valore $(n-1)\cdot 0+\sum_{i \neq s}\tilde{d}(i)$. Per la dualità debole entrambe le soluzioni sono ottime. <span class="qed">□</span>

- Nel [Capitolo 4 «Modelli di flusso su reti»](../../flussi/network-flow-models/index.md) si mostra che i vertici di questi poliedri sono interi, per la totale unimodularità di $\mat{B}$.

<a id="box-17-sp-ex-lp"></a>

!!! esempio "Esempio 3.5: i modelli LP sul grafo di riferimento"

    Risolviamo i modelli con le lunghezze dell'<span style="color:#1971c2">[Esempio 3.1](problemi-di-cammino-minimo.md#box-2-sp-ex-ref)</span>, $s=1$ e $t=6$ (valori verificati con Gurobi).

    - $\mathrm{SP}(1,6)$: $z(\mathrm{SP}(1,6))=13$, con $x_{13}=x_{32}=x_{24}=x_{46}=1$ e tutte le altre variabili a $0$: il cammino $1,3,2,4,6$. Il valore duale è $\pi_1-\pi_6=13$.

    - $\mathrm{SP}(1)$: $z(\mathrm{SP}(1))=0+5+2+8+10+13=38$, con i flussi sull'albero dei cammini minimi

        $$
        x_{13}=5, \qquad x_{32}=3, \qquad x_{24}=2, \qquad x_{46}=1, \qquad x_{35}=1 .
        $$

        Per esempio $T_3=\{2,3,4,5,6\}$, quindi $x_{13}=5$; il costo è $2\cdot 5+3\cdot 3+3\cdot 2+5+8=38$. I duali ottimi, normalizzati con $\pi_1=0$, sono $\vet{\pi}=(0,-5,-2,-8,-10,-13)$.

    - Con le lunghezze $d''$ dell'<span style="color:#1971c2">[Esempio 3.2](problemi-di-cammino-minimo.md#box-5-sp-ex-negcycle)</span> il modello $\mathrm{SP}(1,6)$ è illimitato: ogni unità di flusso lungo il ciclo $3,5,4,3$ abbassa il valore di $1$.

!!! chiave ""

    Un cammino minimo è un flusso unitario da $s$ a $t$: $\min \vet{d}'\vet{x}$ con $\mat{B}\vet{x}=\vet{b}$, $\vet{x} \ge \vet{0}$. Il suo duale ha i vincoli $\pi_i-\pi_j \le d_{ij}$, e $\pi_i=-\tilde{d}(i)$ è ottimo; un ciclo negativo in un punto qualsiasi di $G$ rende il modello illimitato.

---

**Avanti:** [3.4 Cammini minimi nei grafi aciclici](cammini-minimi-nei-grafi-aciclici.md)
