---
title: "Il rango della matrice di incidenza"
---

# 1.5 Il rango della matrice di incidenza { #sez-sec-gr-rank }

<div class="info-capitolo" markdown>

**Parte 1 · Grafi · Capitolo 1** · [:material-book-open-variant: Capitolo 1: Grafi](index.md) · [:material-file-pdf-box: Dispensa, volume 1 (PDF)](../../pdf/dispensa-1-grafi.pdf) · [:material-presentation: Slide](../../pdf/slide-graphs.pdf) · [:material-pencil: Esercizi: Grafi](../../esercizi/graphs.md) · [:material-gesture-tap: App: Ricerca su grafo: BFS e DFS](../../laboratorio/ricerca-bfs-dfs.md)

</div>

- Sia $G=(N,A)$ un grafo orientato con matrice di incidenza nodo–arco $\mat{B}$. Indichiamo con $\mat{B}_a$ la colonna dell'arco $a$, e con $\vet{e}_i$ l'$i$-esimo vettore unitario di $\R^n$, in modo che $\mat{B}_{(i,j)}=\vet{e}_i-\vet{e}_j$.

<a id="box-27-gr-lem-forest"></a>

!!! teorema "Lemma 1.20: colonne di una foresta"

    Se gli archi $F \subseteq A$ formano una foresta, le colonne $\mat{B}_a$, $a \in F$, sono linearmente indipendenti.

??? dimostrazione "Dimostrazione"

    Per induzione su $|F|$; per $F=\emptyset$ non c'è nulla da dimostrare. Siano $|F| \ge 1$ e $\sum_{a \in F} \lambda_a \mat{B}_a=\vet{0}$.

    1. Una componente della foresta con almeno un arco è un albero con almeno $2$ nodi, quindi ha una foglia $\ell$ (<span style="color:#1971c2">[Lemma 1.14](alberi-e-foreste.md#box-20-gr-lem-leaves)</span>); sia $a' \in F$ l'unico arco di $F$ incidente a $\ell$.

    2. La riga $\ell$ della combinazione contiene solo il termine di $a'$, che è $\pm\lambda_{a'}$; quindi $\lambda_{a'}=0$.

    3. Gli archi $F \setminus \{a'\}$ formano ancora una foresta, e $\sum_{a \in F \setminus \{a'\}} \lambda_a \mat{B}_a=\vet{0}$: per induzione tutti i $\lambda_a$ sono nulli. <span class="qed">□</span>

<a id="box-28-gr-lem-cycle"></a>

!!! teorema "Lemma 1.21: colonne di un ciclo"

    Se gli archi $C \subseteq A$ formano un ciclo, le colonne $\mat{B}_a$, $a \in C$, sono linearmente dipendenti.

??? dimostrazione "Dimostrazione"

    Il ciclo visiti $v_0,v_1,\dots,v_k=v_0$ lungo gli archi $c_1,c_2,\dots,c_k$, e sia $\varepsilon_t=+1$ se $c_t$ è in avanti e $\varepsilon_t=-1$ se è all'indietro. In entrambi i casi $\varepsilon_t \mat{B}_{c_t}=\vet{e}_{v_{t-1}}- \vet{e}_{v_t}$, e la somma è telescopica:

    $$
    \sum_{t=1}^{k} \varepsilon_t \mat{B}_{c_t}=\vet{e}_{v_0}-\vet{e}_{v_k}=\vet{0}.
    $$

    I coefficienti $\varepsilon_t$ non sono nulli, quindi le colonne sono linearmente dipendenti. <span class="qed">□</span>

<a id="box-29-gr-th-rank"></a>

!!! teorema "Teorema 1.22: rango della matrice di incidenza"

    Sia $G=(N,A)$ un grafo orientato il cui grafo non orientato sottostante ha $k$ componenti connesse. Allora

    $$
    \rank(\mat{B})=|N|-k .
    $$

??? dimostrazione "Dimostrazione"

    Siano $N_1,N_2,\dots,N_k$ gli insiemi di nodi delle componenti, e $n=|N|$.

    - <em>$\rank(\mat{B}) \ge n-k$.</em> Per il <span style="color:#1971c2">[Corollario 1.18](alberi-e-foreste.md#box-24-gr-cor-spanning)</span> il grafo ha una foresta ricoprente con $n-k$ archi, le cui colonne sono linearmente indipendenti per il <span style="color:#1971c2">[Lemma 1.20](#box-27-gr-lem-forest)</span>.

    - <em>$\rank(\mat{B}) \le n-k$.</em> Ogni arco ha entrambi gli estremi nella stessa componente, quindi per ogni $h \in \{1,2,\dots,k\}$ la somma delle righe dei nodi di $N_h$ è il vettore nullo. I $k$ vettori $\vet{y}^h$ con $y^h_i=1$ per $i \in N_h$ e $0$ altrimenti soddisfano $(\vet{y}^h)' \mat{B}=\vet{0}'$.

    - Questi $k$ vettori hanno supporti disgiunti, quindi sono linearmente indipendenti: lo spazio nullo sinistro di $\mat{B}$ ha dimensione almeno $k$, e $\rank(\mat{B}) \le n-k$.

    <p class="qed-riga"><span class="qed">□</span></p>

<a id="box-30-gr-cor-basis"></a>

!!! teorema "Corollario 1.23: basi della matrice di incidenza"

    Sia connesso il grafo non orientato sottostante a $G=(N,A)$. Allora $\rank(\mat{B})=|N|-1$, la matrice ottenuta eliminando una qualsiasi riga di $\mat{B}$ ha rango pieno per righe, e un insieme di $|N|-1$ colonne di $\mat{B}$ è linearmente indipendente se e solo se i suoi archi formano un albero ricoprente.

??? dimostrazione "Dimostrazione"

    Il rango è $n-1$ per il <span style="color:#1971c2">[Teorema 1.22](#box-29-gr-th-rank)</span> con $k=1$.

    - La somma delle righe è nulla, quindi ogni riga è l'opposto della somma delle altre: le $n-1$ righe restanti generano lo spazio delle righe, che ha dimensione $n-1$, e sono linearmente indipendenti.

    - Se $n-1$ archi formano un albero ricoprente, le loro colonne sono indipendenti per il <span style="color:#1971c2">[Lemma 1.20](#box-27-gr-lem-forest)</span>. Se le loro colonne sono indipendenti, gli archi non contengono cicli per il <span style="color:#1971c2">[Lemma 1.21](#box-28-gr-lem-cycle)</span>: sono aciclici con $n-1$ archi, quindi formano un albero ricoprente per il <span style="color:#1971c2">[Teorema 1.17](alberi-e-foreste.md#box-23-gr-th-tree)</span>(c).

    <p class="qed-riga"><span class="qed">□</span></p>

<a id="box-31-gr-ex-rank"></a>

!!! esempio "Esempio 1.8: il rango sul grafo di riferimento"

    - Il grafo di riferimento è debolmente connesso, quindi $\rank(\mat{B})=6-1=5$; l'eliminazione di Gauss sulla matrice dell'<span style="color:#1971c2">[Esempio 1.4](rappresentazioni-di-un-grafo.md#box-12-gr-ex-matrices)</span> lo conferma.

    - Le cinque colonne dell'albero ricoprente dell'<span style="color:#1971c2">[Esempio 1.7](alberi-e-foreste.md#box-26-gr-ex-tree)</span>, $a_1,a_2,a_3,a_5,a_7$, sono linearmente indipendenti.

    - Il ciclo orientato $2,4,3,2$ usa $a_3=(2,4)$, $a_6=(4,3)$, $a_4=(3,2)$, tutti in avanti, e $\mat{B}_{a_3}+\mat{B}_{a_6}+\mat{B}_{a_4}=\vet{0}$.

    - Senza gli archi $(4,6)$ e $(5,6)$ il grafo ha le due componenti $\{1,2,3,4,5\}$ e $\{6\}$, e il rango della sua matrice di incidenza è $6-2=4$.

!!! chiave ""

    Il rango della matrice di incidenza nodo–arco è il numero di nodi meno il numero di componenti connesse. In un grafo connesso una riga è ridondante, e le basi di $\mat{B}$ sono esattamente gli alberi ricoprenti.

---

**Avanti:** [1.6 Visita di un grafo](visita-di-un-grafo.md)
