---
title: "Il rango della matrice di incidenza"
---

# 1.5 Il rango della matrice di incidenza { #sez-sec-gr-rank }

<div class="info-capitolo" markdown>

**Parte 1 · Grafi · Capitolo 1** · [:material-book-open-variant: Capitolo 1: Grafi](index.md) · [:material-file-pdf-box: Dispensa, volume 1 (PDF)](../../pdf/dispensa-1-grafi.pdf) · [:material-pencil: Esercizi: Grafi](../../esercizi/graphs.md) · [:material-gesture-tap: App: Ricerca su grafo: BFS e DFS](../../laboratorio/ricerca-bfs-dfs.md)

</div>

- Sia $G=(N,A)$ un grafo diretto con matrice di incidenza nodi-arco $\mat{B}$. Indichiamo con $\mat{B}_a$ il colonna dell'arco $a$, e da $\vet{e}_i$ il vettore unitario $i$-esimo di $\R^n$, in modo che $\mat{B}_{(i,j)}=\vet{e}_i-\vet{e}_j$.

<a id="box-27-gr-lem-forest"></a>

!!! teorema "Lemma 1.20: colonne di una foresta"

    Se gli archi $F \subseteq A$ formano una foresta, le colonne $\mat{B}_a$, $a \in F$, sono linearmente indipendenti.

??? dimostrazione "Dimostrazione"

    Per induzione su $|F|$; per $F=\emptyset$ non c'è nulla da dimostrare. Lascia che $|F| \ge 1$ e $\sum_{a \in F} \lambda_a \mat{B}_a=\vet{0}$.

    1. Un componente della foresta con almeno un arco è un albero con almeno $2$ nodi, quindi ha una foglia $\ell$ (<span style="color:#1971c2">[Lemma 1.14](alberi-e-foreste.md#box-20-gr-lem-leaves)</span>); lascia che $a' \in F$ sia l'unico arco di $F$ incidente a $\ell$.

    2. La riga $\ell$ della combinazione contiene solo il termine di $a'$, che è $\pm\lambda_{a'}$; quindi $\lambda_{a'}=0$.

    3. Gli archi $F \setminus \{a'\}$ formano ancora una foresta, e $\sum_{a \in F \setminus \{a'\}} \lambda_a \mat{B}_a=\vet{0}$: per induzione tutti gli $\lambda_a$ sono zero. <span class="qed">□</span>

<a id="box-28-gr-lem-cycle"></a>

!!! teorema "Lemma 1.21: colonne di un ciclo"

    Se gli archi $C \subseteq A$ formano un ciclo, le colonne $\mat{B}_a$, $a \in C$, sono linearmente dipendenti.

??? dimostrazione "Dimostrazione"

    Lascia che il ciclo visiti $v_0,v_1,\dots,v_k=v_0$ lungo gli archi $c_1,c_2,\dots,c_k$ e lascia che $\varepsilon_t=+1$ se $c_t$ è avanti e $\varepsilon_t=-1$ se è indietro. In entrambi i casi $\varepsilon_t \mat{B}_{c_t}=\vet{e}_{v_{t-1}}- \vet{e}_{v_t}$ e la somma dei telescopi:

    $$
    \sum_{t=1}^{k} \varepsilon_t \mat{B}_{c_t}=\vet{e}_{v_0}-\vet{e}_{v_k}=\vet{0}.
    $$

    I coefficienti $\varepsilon_t$ non sono zero, quindi le colonne sono linearmente dipendenti. <span class="qed">□</span>

<a id="box-29-gr-th-rank"></a>

!!! teorema "Teorema 1.22: rango della matrice di incidenza"

    Sia $G=(N,A)$ un grafo diretto il cui grafo non orientato sottostante ha componenti connessi $k$. Poi

    $$
    \rank(\mat{B})=|N|-k .
    $$

??? dimostrazione "Dimostrazione"

    Sia $N_1,N_2,\dots,N_k$ gli insiemi di nodi dei componenti e $n=|N|$.

    - <em>$\rank(\mat{B}) \ge n-k$.</em> Per <span style="color:#1971c2">[Corollario 1.18](alberi-e-foreste.md#box-24-gr-cor-spanning)</span> il grafo ha uno spanning foresta con archi $n-k$, le cui colonne sono linearmente indipendenti per <span style="color:#1971c2">[Lemma 1.20](#box-27-gr-lem-forest)</span>.

    - <em>$\rank(\mat{B}) \le n-k$.</em> Ogni arco ha entrambi gli estremi nello stesso componente, quindi per ogni $h \in \{1,2,\dots,k\}$ le righe dei nodi di $N_h$ si sommano al vettore zero. I vettori $k$ $\vet{y}^h$ con $y^h_i=1$ per $i \in N_h$ e $0$ altrimenti soddisfare $(\vet{y}^h)' \mat{B}=\vet{0}'$.

    - Questi vettori $k$ hanno supporti disgiunti, quindi sono linearmente indipendenti: lo spazio nullo sinistro di $\mat{B}$ ha dimensione almeno $k$ e $\rank(\mat{B}) \le n-k$.

    <p class="qed-riga"><span class="qed">□</span></p>

<a id="box-30-gr-cor-basis"></a>

!!! teorema "Corollario 1.23: basi della matrice di incidenza"

    Lascia che il grafo non orientato sottostante di $G=(N,A)$ sia connesso. Quindi $\rank(\mat{B})=|N|-1$, la matrice ottenuta da l'eliminazione di una riga qualsiasi di $\mat{B}$ ha il rango di riga completo e un insieme di colonne $|N|-1$ di $\mat{B}$ è lineare indipendente se e solo se i suoi archi formano un albero coprente.

??? dimostrazione "Dimostrazione"

    Il rango è $n-1$ di <span style="color:#1971c2">[Teorema 1.22](#box-29-gr-th-rank)</span> con $k=1$.

    - La somma delle righe dà zero, quindi ogni riga è meno la somma delle altre: le rimanenti righe $n-1$ si estendono sulla riga spazio, che ha dimensione $n-1$, e sono linearmente indipendenti.

    - Se gli archi $n-1$ formano un albero ricoprente, le loro colonne sono indipendenti da <span style="color:#1971c2">[Lemma 1.20](#box-27-gr-lem-forest)</span>. Se le loro colonne sono indipendenti, gli archi non contengono cicli <span style="color:#1971c2">[Lemma 1.21](#box-28-gr-lem-cycle)</span>: sono aciclici con archi $n-1$, quindi un albero ricoprente di <span style="color:#1971c2">[Teorema 1.17](alberi-e-foreste.md#box-23-gr-th-tree)</span>(c).

    <p class="qed-riga"><span class="qed">□</span></p>

<a id="box-31-gr-ex-rank"></a>

!!! esempio "Esempio 1.8: il rango sul grafo di riferimento"

    - Il grafo di riferimento è debolmente connesso, quindi $\rank(\mat{B})=6-1=5$; Eliminazione gaussiana sulla matrice di <span style="color:#1971c2">[Esempio 1.4](rappresentazioni-di-un-grafo.md#box-12-gr-ex-matrices)</span> lo conferma.

    - Le cinque colonne dello albero ricoprente di <span style="color:#1971c2">[Esempio 1.7](alberi-e-foreste.md#box-26-gr-ex-tree)</span>, $a_1,a_2,a_3,a_5,a_7$, sono linearmente indipendente.

    - Il ciclo diretto $2,4,3,2$ utilizza $a_3=(2,4)$, $a_6=(4,3)$, $a_4=(3,2)$, tutto avanti e $\mat{B}_{a_3}+\mat{B}_{a_6}+\mat{B}_{a_4}=\vet{0}$.

    - Senza gli archi $(4,6)$ e $(5,6)$ il grafo ha le due componenti $\{1,2,3,4,5\}$ e $\{6\}$, e il il rango della sua matrice di incidenza è $6-2=4$.

!!! chiave ""

    Il rango della matrice di incidenza nodo-arco è il numero di nodi meno il numero di componenti connessi. Nell'a grafo connesso una riga è ridondante e le basi di $\mat{B}$ sono esattamente gli albero ricoprente.

---

**Avanti:** [1.6 Ricerca su grafi](ricerca-su-grafi.md)
