---
title: "Totale unimodularità e integralità"
---

# 4.6 Totale unimodularità e integralità { #sez-sec-nf-tu }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 4** · [:material-book-open-variant: Capitolo 4: Modelli di flusso](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-presentation: Slide](../../pdf/slide-network-flow-models.pdf) · [:material-pencil: Esercizi: Modelli di flusso](../../esercizi/network-flow-models.md)

</div>

<a id="box-18-nf-def-tu"></a>

!!! definizione "Definizione 4.13: matrice totalmente unimodulare"

    Una matrice intera $\mat{M}$ è <strong>totalmente unimodulare</strong> (TU) se il determinante di ogni sottomatrice quadrata di $\mat{M}$ vale $0$, $+1$ o $-1$. Una sottomatrice quadrata si ottiene scegliendo $k$ righe e $k$ colonne, per un qualsiasi $k \ge 1$.

- Con $k=1$ la definizione richiede che ogni elemento di una matrice TU sia $0$, $+1$ o $-1$.

<a id="box-19-nf-th-tu"></a>

!!! teorema "Teorema 4.14: la matrice di incidenza è totalmente unimodulare"

    La matrice di incidenza nodo–arco $\mat{B}$ di ogni grafo orientato $G=(N,A)$ è totalmente unimodulare.

??? dimostrazione "Dimostrazione"

    Sia $\mat{M}$ una sottomatrice $k \times k$ di $\mat{B}$; dimostriamo $\det(\mat{M}) \in \{0,+1,-1\}$ per induzione su $k$. Per $k=1$ l'elemento vale $0$, $+1$ o $-1$. Sia $k \ge 2$. Ogni colonna di $\mat{B}$ ha esattamente un $+1$ e un $-1$, quindi ogni colonna di $\mat{M}$ ha al più due elementi non nulli; i casi sono tre.

    1. <em>Una colonna di $\mat{M}$ è nulla.</em> Allora $\det(\mat{M})=0$.

    2. <em>Una colonna di $\mat{M}$ ha esattamente un elemento non nullo, $\pm 1$.</em> Lo sviluppo di Laplace lungo questa colonna dà $\det(\mat{M})=\pm\det(\mat{M}')$, dove $\mat{M}'$ è una sottomatrice $(k-1) \times (k-1)$ di $\mat{B}$: per induzione $\det(\mat{M}') \in \{0,+1,-1\}$.

    3. <em>Ogni colonna di $\mat{M}$ ha due elementi non nulli, $+1$ e $-1$.</em> Allora le righe di $\mat{M}$ sommano al vettore nullo, sono linearmente dipendenti, e $\det(\mat{M})=0$. <span class="qed">□</span>

<a id="box-20-nf-ex-tu"></a>

!!! esempio "Esempio 4.6: sottomatrici della matrice di incidenza di riferimento"

    Prendiamo le righe $2,3,4$ della matrice di incidenza $\mat{B}$ del grafo di riferimento e due scelte di tre colonne.

    $$
    \begin{array}{c|rrr}
    & a_1 & a_3 & a_5\\ \hline
    2 & -1 & 1 & 0\\
    3 & 0 & 0 & 1\\
    4 & 0 & -1 & 0
    \end{array}
    \qquad\qquad
    \begin{array}{c|rrr}
    & a_3 & a_4 & a_6\\ \hline
    2 & 1 & -1 & 0\\
    3 & 0 & 1 & -1\\
    4 & -1 & 0 & 1
    \end{array}
    $$

    - La colonna di $a_1=(1,2)$ nella prima matrice ha un solo elemento non nullo (caso 2): sviluppando lungo di essa, e poi lungo la colonna di $a_5$, il determinante vale $-1$.

    - Gli archi $a_3=(2,4)$, $a_4=(3,2)$, $a_6=(4,3)$ della seconda matrice formano il ciclo $2,4,3,2$, e tutti i loro estremi sono fra le righe scelte: ogni colonna ha $+1$ e $-1$ (caso 3), e il determinante vale $0$.

    - La matrice $\mat{B}$ ha $5004$ sottomatrici quadrate; il calcolo di tutti i loro determinanti conferma che assumono solo i valori $-1$, $0$ e $+1$.

## 4.6.1 Vertici interi

- Un punto $\bar{\vet{x}}$ di un poliedro $P$ è un <strong>vertice</strong> se non è il punto medio di due punti distinti di $P$, come nel [Capitolo 15 «La geometria della programmazione lineare»](https://fabiofurini.github.io/programmazione-lineare/metodi-avanzati/15-geometria/) del modulo Programmazione lineare.

- Per un insieme di archi $F$, indichiamo con $\mat{B}_F$ la sottomatrice delle colonne di $F$, e con $\vet{x}_F$ le corrispondenti componenti di $\vet{x}$.

<a id="box-21-nf-th-vertices"></a>

!!! teorema "Teorema 4.15: vertici interi"

    Sia $G=(N,A)$ una rete con bilanci interi $\vet{b}$, limiti inferiori interi $\vet{l}$ e capacità $\vet{u}$ intere o pari a $+\infty$. Allora ogni vertice di

    $$
    P=\big\{\, \vet{x} \in \R^m : \mat{B}\vet{x}=\vet{b},~ \vet{l} \le \vet{x} \le \vet{u} \,\big\}
    $$

    è un vettore intero.

??? dimostrazione "Dimostrazione"

    Sia $\bar{\vet{x}}$ un vertice di $P$, e sia $F=\{\, a \in A : l_a<\bar{x}_a<u_a \,\}$ l'insieme degli archi strettamente compresi fra i loro limiti. Se $F=\emptyset$, ogni componente di $\bar{\vet{x}}$ è un limite, quindi un intero.

    1. <em>Le colonne di $\mat{B}_F$ sono linearmente indipendenti.</em> Altrimenti $\mat{B}_F\vet{d}_F=\vet{0}$ per qualche $\vet{d} \neq \vet{0}$ con $d_a=0$ per $a \notin F$. Per $\varepsilon>0$ piccolo sia $\bar{\vet{x}}+\varepsilon \vet{d}$ sia $\bar{\vet{x}}-\varepsilon\vet{d}$ rispettano i limiti stretti su $F$ e $\mat{B}\vet{x}=\vet{b}$, quindi stanno in $P$, e $\bar{\vet{x}}$ è il loro punto medio: una contraddizione.

    2. <em>Il sistema per $\bar{\vet{x}}_F$ ha dati interi.</em> Ogni $a \notin F$ ha $\bar{x}_a \in \{l_a,u_a\}$, un intero, quindi $\mat{B}_F\bar{\vet{x}}_F=\vet{b}-\sum_{a \notin F} \mat{B}_a\bar{x}_a=:\hat{\vet{b}}$ è intero.

    3. <em>Regola di Cramer.</em> $\mat{B}_F$ ha rango $|F|$, quindi $|F|$ delle sue righe formano una matrice quadrata non singolare $\mat{M}$, e $\mat{M}\bar{\vet{x}}_F=\hat{\vet{b}}_R$ su queste righe $R$. Per la regola di Cramer ogni componente di $\bar{\vet{x}}_F$ è $\det(\mat{M}_a)/\det(\mat{M})$, con $\mat{M}_a$ una matrice intera.

    4. Per il <span style="color:#1971c2">[Teorema 4.14](#box-19-nf-th-tu)</span>, $\det(\mat{M})=\pm 1$, quindi ogni componente di $\bar{\vet{x}}_F$ è un intero. <span class="qed">□</span>

<a id="box-22-nf-cor-integral"></a>

!!! teorema "Corollario 4.16: integralità del modello di flusso di costo minimo"

    Siano interi i bilanci, i limiti inferiori e le capacità, con ogni capacità finita. Se il modello $\mathrm{MCF}$ ha una soluzione ammissibile, allora ha una soluzione ottima intera, per qualsiasi vettore dei costi $\vet{c}$.

??? dimostrazione "Dimostrazione"

    Il poliedro $P$ è non vuoto e limitato, perché $\vet{l} \le \vet{x} \le \vet{u}$ con limiti finiti. Una funzione lineare raggiunge il minimo su un poliedro non vuoto e limitato in un vertice ([Capitolo 15 «La geometria della programmazione lineare»](https://fabiofurini.github.io/programmazione-lineare/metodi-avanzati/15-geometria/)), e ogni vertice di $P$ è intero per il <span style="color:#1971c2">[Teorema 4.15](#box-21-nf-th-vertices)</span>. <span class="qed">□</span>

- L'algoritmo del simplesso termina in un vertice, quindi con dati interi restituisce un flusso ottimo intero: il vincolo di interezza $x_{ij} \in \Z_{\ge 0}$ si ha gratis.

- La totale unimodularità è una proprietà della matrice: per una matrice che non è TU, un termine noto intero può dare vertici frazionari.

<a id="box-23-nf-ex-nottu"></a>

!!! esempio "Esempio 4.7: una matrice non totalmente unimodulare"

    Il triangolo non orientato con vertici $1,2,3$ e spigoli $e_1=\{1,2\}$, $e_2=\{1,3\}$, $e_3=\{2,3\}$ ha la matrice di incidenza vertici–spigoli

    $$
    \mat{M}=\begin{pmatrix} 1 & 1 & 0\\ 1 & 0 & 1\\ 0 & 1 & 1 \end{pmatrix}, \qquad \det(\mat{M})=-2,
    $$

    quindi $\mat{M}$ non è TU. Il poliedro $\{\vet{y} \in \R^3 : \mat{M}\vet{y}=\vet{1},~ \vet{y} \ge \vet{0}\}$ contiene il solo punto $\vet{y}=(\frac{1}{2},\frac{1}{2},\frac{1}{2})$, perché $\mat{M}$ è non singolare: questo vertice è frazionario, anche se i dati sono interi.

!!! chiave ""

    La matrice di incidenza di un grafo orientato è totalmente unimodulare. Quindi, con bilanci e limiti interi, ogni vertice della regione ammissibile è intero, e il modello $\mathrm{MCF}$ ha una soluzione ottima intera.

---

**Avanti:** [4.7 Il modello duale e i costi ridotti](il-modello-duale-e-i-costi-ridotti.md)
