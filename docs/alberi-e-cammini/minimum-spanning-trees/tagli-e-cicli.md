---
title: "Tagli e cicli"
---

# 2.2 Tagli e cicli { #sez-sec-mst-cuts }

<div class="info-capitolo" markdown>

**Parte 2 · Alberi e cammini · Capitolo 2** · [:material-book-open-variant: Capitolo 2: Alberi ricoprenti](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-alberi-e-cammini.pdf) · [:material-presentation: Slide](../../pdf/slide-minimum-spanning-trees.pdf) · [:material-pencil: Esercizi: Alberi ricoprenti](../../esercizi/minimum-spanning-trees.md) · [:material-gesture-tap: App: Alberi ricoprenti minimi: Kruskal e Prim](../../laboratorio/albero-ricoprente-minimo-kruskal-prim.md)

</div>

<a id="box-4-mst-def-cut"></a>

!!! definizione "Definizione 2.2: taglio"

    Sia $G=(V,E)$ un grafo non orientato e $S \subseteq V$ con $\emptyset \neq S \neq V$. Il <strong>taglio</strong> definito da $S$ è l'insieme degli spigoli con esattamente un estremo in $S$:

    $$
    \delta(S)=\big\{\, \{u,v\} \in E : u \in S,~ v \notin S \,\big\}.
    $$

    Uno spigolo di $\delta(S)$ <strong>attraversa</strong> il taglio. Per un singolo vertice, $\delta(\{v\})=\delta(v)$ è l'insieme degli spigoli incidenti in $v$.

- Un grafo è connesso se e solo se ogni taglio $\delta(S)$ è non vuoto: un taglio vuoto separa $S$ da $V \setminus S$, e un cammino da $u \in S$ a $v \notin S$ deve usare uno spigolo di $\delta(S)$.

- Per esempio, nel grafo di riferimento pesato, $\delta(\{1,2,3\})=\{\{2,4\},\{3,4\},\{3,5\}\}$ e $\delta(\{6\})=\{\{4,6\},\{5,6\}\}$.

<a id="box-5-mst-lem-even"></a>

!!! teorema "Lemma 2.3: un ciclo attraversa un taglio un numero pari di volte"

    Sia $C$ un ciclo di $G$ e $\delta(S)$ un taglio. Allora $|C \cap \delta(S)|$ è pari. In particolare, se un ciclo contiene uno spigolo di $\delta(S)$, contiene almeno un altro spigolo di $\delta(S)$.

??? dimostrazione "Dimostrazione"

    Siano $v_0,v_1,\dots,v_k=v_0$ i vertici visitati dal ciclo. Lo spigolo $\{v_{t-1},v_t\}$ attraversa il taglio se e solo se $v_{t-1}$ e $v_t$ stanno da parti diverse. Percorrendo il ciclo, la parte cambia a ogni spigolo che attraversa il taglio, e solo lì; il percorso termina in $v_0$, dalla parte da cui era partito, quindi il numero di cambi è pari. <span class="qed">□</span>

<a id="box-6-mst-def-fcut"></a>

!!! definizione "Definizione 2.4: taglio fondamentale"

    Sia $T$ un albero ricoprente di un grafo connesso $G=(V,E)$ ed $e=\{u,v\} \in T$. Il grafo $T \setminus \{e\}$ ha due componenti connesse; sia $S_e$ quella che contiene $u$. Il <strong>taglio fondamentale</strong> di $e$ è $\delta(S_e)$.

- $T \setminus \{e\}$ ha $n-2$ spigoli e nessun ciclo, quindi ha $n-(n-2)=2$ componenti ([Corollario «spigoli e componenti»](../../grafi/graphs/alberi-e-foreste.md)); $v$ non sta in $S_e$, altrimenti il cammino da $u$ a $v$ in $T$ non sarebbe unico.

- L'unico spigolo di $T$ nel taglio fondamentale di $e$ è $e$ stesso: ogni altro spigolo di $T$ sta dentro una delle due componenti.

<a id="box-7-mst-lem-exchange"></a>

!!! teorema "Lemma 2.5: scambio"

    Sia $T$ un albero ricoprente di un grafo connesso $G=(V,E)$.

    1. Se $e \notin T$ e $f$ è uno spigolo del ciclo fondamentale $C(T,e)$, allora $T \cup \{e\} \setminus \{f\}$ è un albero ricoprente.

    2. Se $f \in T$ ed $e \notin T$ attraversa il taglio fondamentale di $f$, allora $f \in C(T,e)$, e $T \cup \{e\} \setminus \{f\}$ è un albero ricoprente.

??? dimostrazione "Dimostrazione"

    1. Il resto di $C(T,e)$ collega gli estremi di $f$, quindi togliendo $f$ dal grafo connesso $T \cup \{e\}$ si ottiene ancora un grafo connesso. Il risultato è connesso e ha $n-1$ spigoli: è un albero ricoprente per le [caratterizzazioni di un albero](../../grafi/graphs/alberi-e-foreste.md), (b).

    2. Gli estremi di $e$ stanno da parti diverse del taglio fondamentale $\delta(S_f)$. Il cammino fra loro in $T$ fa parte di $C(T,e)$, e deve attraversare $\delta(S_f)$ con uno spigolo di $T$; l'unico è $f$. Il punto 1 conclude. <span class="qed">□</span>

<a id="box-8-mst-ex-cuts"></a>

!!! esempio "Esempio 2.3: tagli e cicli del grafo di riferimento"

    La figura mostra il taglio $\delta(\{1,2,3\})$ (spigoli rossi) e il ciclo $3,4,5$ (ombreggiato in blu): il ciclo usa gli spigoli $\{3,4\}$ e $\{3,5\}$ del taglio, un numero pari.

    ![Figura 3](../../img/minimum-spanning-trees/fig03.svg){ .fig loading=lazy  }

    Per l'albero ricoprente di costo minimo $\tilde{F}$ dell'<span style="color:#1971c2">[Esempio 2.2](il-problema-dell-albero-ricoprente-di-costo-minimo.md#box-3-mst-ex-opt)</span>, il taglio fondamentale di $\{3,4\}$ è $\delta(\{1,2,3\})$, e il ciclo fondamentale di $\{3,5\}$ è $C(\tilde{F},\{3,5\})=3,4,5,3$.

!!! chiave ""

    Un ciclo attraversa ogni taglio un numero pari di volte. Aggiungendo uno spigolo a un albero ricoprente e togliendo un qualsiasi spigolo del ciclo che esso chiude, si ottiene un altro albero ricoprente.

---

**Avanti:** [2.3 La proprietà del taglio e la proprietà del ciclo](la-proprieta-del-taglio-e-la-proprieta-del-ciclo.md)
