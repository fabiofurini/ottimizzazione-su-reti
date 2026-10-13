---
title: "Connettività"
---

# 1.3 Connettività { #sez-sec-gr-connectivity }

<div class="info-capitolo" markdown>

**Parte 1 · Grafi · Capitolo 1** · [:material-book-open-variant: Capitolo 1: Grafi](index.md) · [:material-file-pdf-box: Dispensa, volume 1 (PDF)](../../pdf/dispensa-1-grafi.pdf) · [:material-pencil: Esercizi: Grafi](../../esercizi/graphs.md) · [:material-gesture-tap: App: Ricerca su grafo: BFS e DFS](../../laboratorio/ricerca-bfs-dfs.md)

</div>

<a id="box-15-gr-def-connected"></a>

!!! definizione "Definizione 1.10: grafo connesso e componenti connessi"

    Sia $G=(V,E)$ un grafo non orientato.

    - Due vertici $u$ e $v$ sono <strong>connessi</strong> se $G$ ha un percorso da $u$ a $v$; il grafo $G$ è <strong>connected</strong> se ogni due vertici sono collegati.

    - Un <strong>componente connesso</strong> di $G$ è un sottoinsieme massimo $U \subseteq V$ di vertici connessi a coppie.

    Un grafo orientato è <strong>debolmente connesso</strong> se il suo grafo non orientato sottostante è connesso e il suo grafo connesso i componenti sono quelli del grafo non orientato sottostante.

<a id="box-16-gr-def-strong"></a>

!!! definizione "Definizione 1.11: raggiungibilità e componenti fortemente connessi"

    Sia $G=(N,A)$ un grafo diretto.

    - Un nodo $j$ è <strong>raggiungibile</strong> da $i$ se $G$ ha un percorso diretto da $i$ a $j$; l'insieme dei nodi raggiungibile da $i$, $i$ compreso, è indicato con $R(i)$.

    - I nodi $i$ e $j$ sono <strong>fortemente connesso</strong> se $j \in R(i)$ e $i \in R(j)$; il grafo è <strong>fortemente connesso</strong> se ogni due nodi sono fortemente connessi.

    - Un <strong>componente fortemente connesso</strong> di $G$ è un sottoinsieme massimo $S \subseteq N$ di coppie fortemente connesse nodi connessi.

<a id="box-17-gr-prop-equiv"></a>

!!! teorema "Proposizione 1.12: i componenti sono classi di equivalenza"

    Essere connessi è una relazione di equivalenza su $V$ ed essere fortemente connessi è una relazione di equivalenza su $N$. Da qui la partizione di componenti connessi $V$ e la partizione di componenti fortemente connessi $N$.

??? dimostrazione "Dimostrazione"

    Dimostriamo le tre proprietà per la connessione forte; il caso non orientato è lo stesso con i percorsi al posto di percorsi diretti.

    1. <em>Riflessivo</em>: il percorso $i$ di lunghezza $0$ mostra che $i \in R(i)$.

    2. <em>Simmetrico</em>: la definizione è simmetrica in $i$ e $j$.

    3. <em>Transitivo</em>: un percorso diretto da $i$ a $j$Z seguito da uno da $j$ a $h$ è una passeggiata diretta da Da $i$ a $h$, che contiene un percorso diretto da <span style="color:#1971c2">[Lemma 1.6](grafi-non-orientati-e-orientati.md#box-9-gr-lem-walk)</span>. Lo stesso vale da $h$ a $i$.

    Le classi di equivalenza sono i sottoinsiemi massimi di elementi correlati a coppie, cioè i componenti. <span class="qed">□</span>

- Il <strong>grafo invertito</strong> $G'=(N,A')$ ha l'arco $(j,i)$ per ogni arco $(i,j) \in A$. Il nodo $i$ è raggiungibile da $j$ in $G$ se e solo se $j$ è raggiungibile da $i$ in $G'$; indichiamo con $R'(i)$ l'insieme dei nodi raggiungibili da $i$ in $G'$.

- Con <span style="color:#1971c2">[Definizione 1.11](#box-16-gr-def-strong)</span>, il componente fortemente connesso che contiene $i$ è

    $$
    S(i)=R(i) \cap R'(i).
    $$

<a id="box-18-gr-ex-components"></a>

!!! esempio "Esempio 1.6: componenti del grafo di riferimento"

    Nel grafo di riferimento:

    $$
    R(1)=\{1,2,3,4,5,6\}, \qquad R(2)=\{2,3,4,5,6\}, \qquad R(6)=\{6\}.
    $$

    Nel grafo invertito $R'(3)=\{1,2,3,4,5\}$ e $R(3)=\{2,3,4,5,6\}$, quindi $S(3)=\{2,3,4,5\}$. Il fortemente connesso i componenti sono

    $$
    \{1\}, \qquad \{2,3,4,5\}, \qquad \{6\}.
    $$

    ![Figura 4](../../img/graphs/fig04.svg){ .fig loading=lazy  }

    Il grafo è debolmente connesso, con una componente connessa, ma non è fortemente connesso: nessun nodo è raggiungibile from node $6$.

!!! chiave ""

    Le componenti connesse e le componenti fortemente connesse sono le classi di due relazioni di equivalenza. Il Il componente fortemente connesso di $i$ è $R(i) \cap R'(i)$: i nodi raggiungibili da $i$ che possono anche raggiungere $i$.

---

**Avanti:** [1.4 Alberi e foreste](alberi-e-foreste.md)
