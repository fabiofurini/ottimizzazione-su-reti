---
title: "Alberi e foreste"
---

# 1.4 Alberi e foreste { #sez-sec-gr-trees }

<div class="info-capitolo" markdown>

**Parte 1 · Grafi · Capitolo 1** · [:material-book-open-variant: Capitolo 1: Grafi](index.md) · [:material-file-pdf-box: Dispensa, volume 1 (PDF)](../../pdf/dispensa-1-grafi.pdf) · [:material-presentation: Slide](../../pdf/slide-graphs.pdf) · [:material-pencil: Esercizi: Grafi](../../esercizi/graphs.md) · [:material-gesture-tap: App: Ricerca su grafo: BFS e DFS](../../laboratorio/ricerca-bfs-dfs.md)

</div>

<a id="box-19-gr-def-tree"></a>

!!! definizione "Definizione 1.13: albero, foresta e albero ricoprente"

    Sia $G=(V,E)$ un grafo non orientato.

    - $G$ è una <strong>foresta</strong> se è aciclico, e un <strong>albero</strong> se è connesso e aciclico. Un vertice di grado $1$ è una <strong>foglia</strong>.

    - Un <strong>albero ricoprente</strong> di un grafo connesso $G$ è un albero $T=(V,F)$ con $F \subseteq E$; una <strong>foresta ricoprente</strong> di $G$ è una foresta $(V,F)$, $F \subseteq E$, con le stesse componenti connesse di $G$.

    Per un grafo orientato $G=(N,A)$ le nozioni si applicano al grafo non orientato sottostante: un sottoinsieme di archi $F \subseteq A$ è un albero (una foresta) se gli spigoli corrispondenti formano un albero (una foresta).

<a id="box-20-gr-lem-leaves"></a>

!!! teorema "Lemma 1.14: foglie"

    Ogni albero con $n \ge 2$ vertici ha almeno due foglie.

??? dimostrazione "Dimostrazione"

    L'albero è connesso con $n \ge 2$ vertici, quindi ha uno spigolo. Sia $v_0,v_1,\dots,v_k$ un cammino di lunghezza massima, con $k \ge 1$. Un vicino $u \neq v_1$ di $v_0$ starebbe sul cammino, chiudendo un ciclo, oppure estenderebbe il cammino, contro la sua massimalità. Quindi $\deg(v_0)=1$, e allo stesso modo $\deg(v_k)=1$. <span class="qed">□</span>

<a id="box-21-gr-lem-add"></a>

!!! teorema "Lemma 1.15: aggiunta di uno spigolo"

    Sia $G=(V,E)$ un grafo con $k$ componenti connesse, e sia $e=\{u,v\} \notin E$ con $u,v \in V$.

    1. Se $u$ e $v$ stanno in componenti diverse di $G$, il grafo $(V,E \cup \{e\})$ ha $k-1$ componenti e nessun ciclo che passa per $e$.

    2. Se $u$ e $v$ stanno nella stessa componente di $G$, il grafo $(V,E \cup \{e\})$ ha $k$ componenti e un ciclo che passa per $e$.

??? dimostrazione "Dimostrazione"

    1. Lo spigolo $e$ unisce in una sola le componenti di $u$ e di $v$, e lascia invariate le altre componenti. Un ciclo che passa per $e$ darebbe, senza $e$, un cammino da $u$ a $v$ in $G$: impossibile.

    2. Le componenti non cambiano. Un cammino $u=v_0,v_1,\dots,v_k=v$ di $G$ ha $k \ge 2$, perché $\{u,v\} \notin E$; con $e$ chiude il ciclo $v_0,v_1,\dots,v_k,v_0$. <span class="qed">□</span>

<a id="box-22-gr-cor-count"></a>

!!! teorema "Corollario 1.16: spigoli e componenti"

    Un grafo con $n$ vertici, $m$ spigoli e $k$ componenti connesse soddisfa $k \ge n-m$, con l'uguaglianza se e solo se il grafo è aciclico.

??? dimostrazione "Dimostrazione"

    Partiamo da $(V,\emptyset)$, che ha $n$ componenti, e inseriamo gli $m$ spigoli uno alla volta. Per il <span style="color:#1971c2">[Lemma 1.15](#box-21-gr-lem-add)</span>, ogni inserimento o diminuisce di uno il numero di componenti, oppure lo lascia invariato e chiude un ciclo. Quindi $k \ge n-m$.

    - Se il grafo ha un ciclo $C$, l'ultimo spigolo di $C$ a essere inserito unisce due vertici già connessi dal resto di $C$: lascia invariato il numero, e $k > n-m$.

    - Se il grafo è aciclico, nessun inserimento chiude un ciclo, perché un ciclo di un grafo intermedio è un ciclo del grafo finale: $k=n-m$.

    <p class="qed-riga"><span class="qed">□</span></p>

<a id="box-23-gr-th-tree"></a>

!!! teorema "Teorema 1.17: caratterizzazioni di un albero"

    Sia $G=(V,E)$ un grafo non orientato con $n$ vertici e $m$ spigoli. Le seguenti affermazioni sono equivalenti:

    - **(a)** $G$ è un albero (connesso e aciclico);

    - **(b)** $G$ è connesso e $m=n-1$;

    - **(c)** $G$ è aciclico e $m=n-1$;

    - **(d)** per ogni coppia di vertici $u$ e $v$ esiste esattamente un cammino da $u$ a $v$;

    - **(e)** $G$ è connesso, e la rimozione di un qualsiasi spigolo lo rende non connesso.

??? dimostrazione "Dimostrazione"

    Sia $k$ il numero di componenti connesse; $G$ è connesso se e solo se $k=1$.

    - <strong>(a)$\Rightarrow$(b),(c).</strong> $G$ è aciclico con $k=1$, quindi $m=n-k=n-1$ per il <span style="color:#1971c2">[Corollario 1.16](#box-22-gr-cor-count)</span>.

    - <strong>(b)$\Rightarrow$(a).</strong> Qui $k=1=n-m$: vale l'uguaglianza, e $G$ è aciclico per lo stesso corollario.

    - <strong>(c)$\Rightarrow$(a).</strong> $G$ è aciclico, quindi $k=n-m=1$ per lo stesso corollario: $G$ è connesso.

    Per (a)$\Leftrightarrow$(d), connesso significa almeno un cammino fra ogni coppia di vertici; mostriamo che aciclico significa al più uno.

    - Se $G$ ha un ciclo $v_0,v_1,\dots,v_{k-1},v_0$, i vertici $v_0$ e $v_1$ sono uniti da due cammini: lo spigolo $\{v_0,v_1\}$, e $v_0,v_{k-1},\dots,v_2,v_1$.

    - Siano $P \neq Q$ due cammini da $u$ a $v$. Sia $w$ l'ultimo vertice della loro parte iniziale comune, e $x$ il primo vertice dopo $w$ su $P$ che sta anche su $Q$ ($v$ è un candidato). I tratti di $P$ e di $Q$ da $w$ a $x$ hanno in comune solo $w$ e $x$, e non sono formati entrambi dal solo spigolo $\{w,x\}$, perché $P$ e $Q$ lasciano $w$ lungo spigoli diversi. Insieme formano un ciclo.

    Per (a)$\Leftrightarrow$(e), sia $G$ connesso e sia $e=\{u,v\} \in E$. Applicando il <span style="color:#1971c2">[Lemma 1.15](#box-21-gr-lem-add)</span> a $(V,E \setminus \{e\})$ e a $e$: lo spigolo $e$ sta su un ciclo di $G$ se e solo se $u$ e $v$ sono connessi in $(V,E \setminus \{e\})$, cioè se e solo se rimuovendo $e$ il grafo resta connesso. Quindi ogni rimozione rende $G$ non connesso se e solo se nessuno spigolo sta su un ciclo. <span class="qed">□</span>

<a id="box-24-gr-cor-spanning"></a>

!!! teorema "Corollario 1.18: foreste ricoprenti"

    Ogni grafo con $n$ vertici e $k$ componenti connesse ha una foresta ricoprente, con $n-k$ spigoli. In particolare, ogni grafo connesso ha un albero ricoprente, con $n-1$ spigoli.

??? dimostrazione "Dimostrazione"

    Finché il grafo ha un ciclo, rimuoviamo uno spigolo $e=\{u,v\}$ di un ciclo. Il resto del ciclo connette ancora $u$ e $v$, quindi riaggiungere $e$ non cambia le componenti (<span style="color:#1971c2">[Lemma 1.15](#box-21-gr-lem-add)</span>, parte 2): neanche rimuoverlo le cambia. Il grafo finale è aciclico con le stesse $k$ componenti, quindi è una foresta ricoprente, e ha $n-k$ spigoli per il <span style="color:#1971c2">[Corollario 1.16](#box-22-gr-cor-count)</span>. <span class="qed">□</span>

## 1.4.1 Cicli fondamentali

<a id="box-25-gr-prop-fundamental"></a>

!!! teorema "Proposizione 1.19: ciclo fondamentale"

    Sia $T=(V,F)$ un albero ricoprente di un grafo connesso $G=(V,E)$, e sia $e=\{u,v\} \in E \setminus F$. Il grafo $(V,F \cup \{e\})$ contiene esattamente un ciclo, il <strong>ciclo fondamentale</strong> $C(T,e)$, formato da $e$ e dall'unico cammino da $u$ a $v$ in $T$.

??? dimostrazione "Dimostrazione"

    I vertici $u$ e $v$ sono connessi in $T$, quindi lo spigolo $e$ e il cammino da $u$ a $v$ in $T$ formano un ciclo (<span style="color:#1971c2">[Lemma 1.15](#box-21-gr-lem-add)</span>, parte 2). Ogni ciclo di $(V,F \cup \{e\})$ contiene $e$, perché $T$ è aciclico; togliendo $e$ resta un cammino da $u$ a $v$ in $T$, che è unico per il <span style="color:#1971c2">[Teorema 1.17](#box-23-gr-th-tree)</span>(d). <span class="qed">□</span>

- Un grafo connesso con un albero ricoprente $T$ ha $m-n+1$ cicli fondamentali, uno per ogni spigolo esterno a $T$.

- In un grafo orientato il ciclo fondamentale di un arco $(i,j) \notin F$ è percorso nel verso di $(i,j)$: gli archi di $T$ percorsi dalla coda alla testa sono in avanti, gli altri all'indietro.

<a id="box-26-gr-ex-tree"></a>

!!! esempio "Esempio 1.7: un albero ricoprente del grafo di riferimento"

    Gli archi $F=\{(1,2),(1,3),(2,4),(3,5),(4,6)\}$ formano un albero ricoprente $T$ del grafo di riferimento (in blu nella figura): sono $5=n-1$ archi, e i loro spigoli formano un grafo connesso.

    ![Figura 5](../../img/graphs/fig05.svg){ .fig loading=lazy  }

    Gli $m-n+1=4$ archi esterni a $T$ (tratteggiati) danno i cicli fondamentali, scritti a partire dalla coda dell'arco:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>arco</th>
    <th>ciclo fondamentale</th>
    <th>archi all'indietro</th>
    </tr>
    <tr>
    <td><span class="arithmatex">\((3,2)\)</span></td>
    <td><span class="arithmatex">\(3,2,1,3\)</span></td>
    <td><span class="arithmatex">\((1,2)\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\((4,3)\)</span></td>
    <td><span class="arithmatex">\(4,3,1,2,4\)</span></td>
    <td><span class="arithmatex">\((1,3)\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\((5,4)\)</span></td>
    <td><span class="arithmatex">\(5,4,2,1,3,5\)</span></td>
    <td><span class="arithmatex">\((2,4),~(1,2)\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\((5,6)\)</span></td>
    <td><span class="arithmatex">\(5,6,4,2,1,3,5\)</span></td>
    <td><span class="arithmatex">\((4,6),~(2,4),~(1,2)\)</span></td>
    </tr>
    </table></div>

    Per esempio, il ciclo di $(3,2)$ usa $(3,2)$ in avanti, $(1,2)$ all'indietro (da $2$ a $1$) e $(1,3)$ in avanti.

!!! chiave ""

    Un albero è connesso e aciclico; due qualsiasi delle proprietà “connesso”, “aciclico”, “$n-1$ spigoli” implicano la terza. Aggiungendo a un albero ricoprente uno spigolo esterno si crea esattamente un ciclo, il ciclo fondamentale.

---

**Avanti:** [1.5 Il rango della matrice di incidenza](il-rango-della-matrice-di-incidenza.md)
