---
title: "Problemi di cammino minimo"
---

# 3.1 Problemi di cammino minimo { #sez-sec-sp-problems }

<div class="info-capitolo" markdown>

**Parte 2 · Alberi e cammini · Capitolo 3** · [:material-book-open-variant: Capitolo 3: Cammini minimi](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-alberi-e-cammini.pdf) · [:material-presentation: Slide](../../pdf/slide-shortest-paths.pdf) · [:material-pencil: Esercizi: Cammini minimi](../../esercizi/shortest-paths.md) · [:material-gesture-tap: App: Cammini minimi: Dijkstra, Bellman–Ford, grafi aciclici](../../laboratorio/cammini-minimi-dijkstra-bellman-ford.md)

</div>

<a id="box-1-sp-def-problem"></a>

!!! definizione "Definizione 3.1: problemi di cammino minimo"

    Sia $G=(N,A)$ un grafo orientato con una <strong>lunghezza</strong> $d_{ij} \in \R$ per ogni arco $(i,j) \in A$, di qualsiasi segno.

    - La lunghezza di una passeggiata orientata $W=i_0,i_1,\dots,i_k$ è la somma delle lunghezze dei suoi archi, $d(W)=\sum_{t=1}^{k} d_{i_{t-1}i_t}$.

    - Dati due nodi $s$ e $t$, il <strong>problema del cammino minimo $s$–$t$</strong> chiede un cammino orientato da $s$ a $t$ di lunghezza minima.

    - Dato un nodo $s$, la <strong>sorgente</strong>, il <strong>problema dei cammini minimi a sorgente singola</strong> chiede un cammino orientato minimo da $s$ a ogni nodo $j \in N$.

    La lunghezza minima di un cammino orientato da $s$ a $j$ è la <strong>distanza</strong> $\tilde{d}(j)$ di $j$; poniamo $\tilde{d}(j)=+\infty$ se $j$ non è raggiungibile da $s$.

- In questo capitolo scriviamo $n=|N|$, $m=|A|$, e “cammino” e “ciclo” indicano sempre un cammino orientato e un ciclo orientato.

- Un algoritmo per il problema a sorgente singola risolve anche il problema $s$–$t$, per tutti i $t$ insieme.

<a id="box-2-sp-ex-ref"></a>

!!! esempio "Esempio 3.1: il grafo di riferimento con le lunghezze"

    Diamo al grafo di riferimento del [Capitolo 1 «Grafi»](../../grafi/graphs/index.md) le lunghezze $d_{ij}$ scritte sugli archi, tutte non negative; la sorgente è $s=1$.

    ![Figura 1](../../img/shortest-paths/fig01.svg){ .fig loading=lazy  }

    Tre dei cammini da $1$ a $6$ e le loro lunghezze sono:

    $$
    d(1,2,4,6)=7+3+5=15, \qquad d(1,3,2,4,6)=2+3+3+5=13, \qquad d(1,3,5,6)=2+8+7=17.
    $$

    Le distanze dal nodo $1$, calcolate nella <span style="color:#1971c2">Sezione [3.6](l-algoritmo-di-dijkstra.md#sez-sec-sp-dijkstra)</span>, sono

    $$
    \tilde{d}=(0,\,5,\,2,\,8,\,10,\,13),
    $$

    quindi $1,3,2,4,6$ è un cammino minimo da $1$ a $6$.

## 3.1.1 Cicli negativi

<a id="box-3-sp-def-negcycle"></a>

!!! definizione "Definizione 3.2: ciclo negativo"

    Un <strong>ciclo negativo</strong> è un ciclo orientato $C$ con $d(C)<0$. Nel resto del capitolo facciamo riferimento a due ipotesi:

    - **(A1)** ogni nodo di $G$ è raggiungibile da $s$;

    - **(A2)** nessun ciclo negativo di $G$ è raggiungibile da $s$.

<a id="box-4-sp-lem-walk"></a>

!!! teorema "Lemma 3.3: passeggiate e cammini"

    Sotto (A2), per ogni passeggiata orientata $W$ da $s$ a $j$ esiste un cammino orientato $P$ da $s$ a $j$, con archi di $W$, tale che $d(P) \le d(W)$.

??? dimostrazione "Dimostrazione"

    Per induzione sul numero di archi di $W$. Se $W$ ha nodi distinti, $P=W$.

    1. Altrimenti $W$ ripete un nodo: $W=s,\dots,i_a,\dots,i_b,\dots,j$ con $i_a=i_b$, $a<b$ e $b-a$ minimo. Il tratto $C=i_a,\dots,i_b$ è un ciclo, raggiungibile da $s$ lungo $W$.

    2. Per (A2), $d(C) \ge 0$. Togliendo $C$ da $W$ si ottiene una passeggiata $W'$ da $s$ a $j$ con meno archi e $d(W')=d(W)-d(C) \le d(W)$.

    3. Per induzione $W'$ contiene un cammino $P$ con $d(P) \le d(W') \le d(W)$. <span class="qed">□</span>

- Sotto (A2) la lunghezza minima di una passeggiata da $s$ a $j$ coincide con la distanza $\tilde{d}(j)$: gli algoritmi di questo capitolo calcolano lunghezze di passeggiate, e il lemma le trasforma in cammini.

- Con un ciclo negativo $C$ raggiungibile da $s$ e dal quale $j$ è raggiungibile, percorrendo $C$ ancora e ancora si ottengono passeggiate da $s$ a $j$ di lunghezza negativa arbitrariamente grande in valore assoluto. Gli algoritmi di questo capitolo, allora, rilevano $C$ invece di calcolare le distanze.

<a id="box-5-sp-ex-negcycle"></a>

!!! esempio "Esempio 3.2: un ciclo negativo"

    Il grafo di riferimento ha due cicli, $2,4,3,2$ e $3,5,4,3$. Con le lunghezze dell'<span style="color:#1971c2">[Esempio 3.1](#box-2-sp-ex-ref)</span> le loro lunghezze sono $7$ e $11$. Se la lunghezza dell'arco $(5,4)$ scende da $2$ a $d''_{54}=-10$, il ciclo $3,5,4,3$ ha lunghezza

    $$
    8-10+1=-1 ,
    $$

    e le passeggiate $1,3,5,6$, $1,3,5,4,3,5,6$, $1,3,5,4,3,5,4,3,5,6$, … da $1$ a $6$ hanno lunghezze $17,16,15,\dots$: nessuna passeggiata è minima. Useremo di nuovo queste lunghezze $d''$ nella <span style="color:#1971c2">Sezione [3.5](l-algoritmo-di-bellmanford.md#sez-sec-sp-bf)</span>.

## 3.1.2 Ottimalità dei sottocammini

<a id="box-6-sp-lem-subpath"></a>

!!! teorema "Lemma 3.4: ottimalità dei sottocammini"

    Sotto (A2), sia $P$ un cammino minimo da $s$ a $j$ e sia $i$ un nodo di $P$. Allora il sottocammino $P_{si}$ di $P$ da $s$ a $i$ è un cammino minimo da $s$ a $i$.

??? dimostrazione "Dimostrazione"

    Scriviamo $P$ come $P_{si}$ seguito dal sottocammino $P_{ij}$ da $i$ a $j$, quindi $d(P)=d(P_{si})+d(P_{ij})$. Supponiamo per assurdo che un cammino $Q$ da $s$ a $i$ abbia $d(Q)<d(P_{si})$.

    1. $Q$ seguito da $P_{ij}$ è una passeggiata da $s$ a $j$ di lunghezza $d(Q)+d(P_{ij})<d(P)$.

    2. Per il <span style="color:#1971c2">[Lemma 3.3](#box-4-sp-lem-walk)</span> essa contiene un cammino da $s$ a $j$ più corto di $P$: assurdo. <span class="qed">□</span>

<a id="box-7-sp-th-bellman"></a>

!!! teorema "Teorema 3.5: equazioni di Bellman"

    Sotto (A1) e (A2), le distanze soddisfano

    $$
    \tilde{d}(s)=0, \qquad \tilde{d}(j)=\min_{(i,j) \in \delta^-(j)} \big\{\, \tilde{d}(i)+d_{ij} \,\big\}, \quad
    \forall j \in N \setminus \{s\},
    $$

    e $\tilde{d}(j) \le \tilde{d}(i)+d_{ij}$ per ogni arco $(i,j) \in A$.

??? dimostrazione "Dimostrazione"

    Tutte le distanze sono finite per (A1), e $\tilde{d}(s)=0$: il cammino $s$ ha lunghezza $0$, e un cammino da $s$ a $s$ con archi sarebbe un ciclo, di lunghezza $\ge 0$ per (A2).

    - <em>Disuguaglianza.</em> Un cammino minimo da $s$ a $i$ seguito dall'arco $(i,j)$ è una passeggiata di lunghezza $\tilde{d}(i)+d_{ij}$; per il <span style="color:#1971c2">[Lemma 3.3](#box-4-sp-lem-walk)</span>, $\tilde{d}(j) \le \tilde{d}(i)+d_{ij}$.

    - <em>Equazione.</em> Per $j \neq s$, sia $P$ un cammino minimo da $s$ a $j$ e $(i,j)$ il suo ultimo arco. Per il <span style="color:#1971c2">[Lemma 3.4](#box-6-sp-lem-subpath)</span>, $\tilde{d}(j)=d(P)=\tilde{d}(i)+d_{ij}$, quindi il minimo è raggiunto.

    <p class="qed-riga"><span class="qed">□</span></p>

<a id="box-8-sp-prop-tree"></a>

!!! teorema "Proposizione 3.6: albero dei cammini minimi"

    Sotto (A1) e (A2), esiste un albero ricoprente $T$ di $G$, l'<strong>albero dei cammini minimi</strong>, tale che per ogni $j \in N$ il cammino da $s$ a $j$ in $T$ è orientato ed è un cammino minimo.

??? dimostrazione "Dimostrazione"

    Per ogni $j$, sia $k(j)$ il numero minimo di archi di un cammino minimo da $s$ a $j$; $k(s)=0$.

    1. Per $j \neq s$, scegliamo un cammino minimo $P$ da $s$ a $j$ con $k(j)$ archi, e sia $\mathit{pred}(j)$ il nodo che precede $j$ su $P$.

    2. Il sottocammino di $P$ da $s$ a $\mathit{pred}(j)$ è minimo (<span style="color:#1971c2">[Lemma 3.4](#box-6-sp-lem-subpath)</span>) e ha $k(j)-1$ archi, quindi $k(\mathit{pred}(j)) \le k(j)-1$ e $\tilde{d}(j)=\tilde{d}(\mathit{pred}(j))+d_{\mathit{pred}(j)\,j}$.

    3. Passando da $j$ a $\mathit{pred}(j)$ il numero $k$ diminuisce strettamente, quindi la sequenza termina in $s$. Gli archi $(\mathit{pred}(j),j)$ sono $n-1$ e collegano ogni nodo a $s$: formano un albero ricoprente ([Capitolo 1, Teorema «caratterizzazioni di un albero»](../../grafi/graphs/alberi-e-foreste.md)).

    4. Lungo il cammino dell'albero $s=i_0,i_1,\dots,i_r=j$ ogni arco soddisfa $\tilde{d}(i_t)=\tilde{d}(i_{t-1})+d_{i_{t-1}i_t}$; sommando, la sua lunghezza è $\tilde{d}(j)$. <span class="qed">□</span>

<a id="box-9-sp-ex-bellman"></a>

!!! esempio "Esempio 3.3: le equazioni di Bellman sul grafo di riferimento"

    Con le distanze $\tilde{d}=(0,5,2,8,10,13)$ dell'<span style="color:#1971c2">[Esempio 3.1](#box-2-sp-ex-ref)</span>:

    - il nodo $4$ ha gli archi entranti $(2,4)$ e $(5,4)$, e $\tilde{d}(4)=\min\{5+3,\;10+2\}=8$;

    - il nodo $6$ ha gli archi entranti $(4,6)$ e $(5,6)$, e $\tilde{d}(6)=\min\{8+5,\;10+7\}=13$.

    Gli archi che realizzano il minimo formano l'albero dei cammini minimi $(1,3)$, $(3,2)$, $(2,4)$, $(3,5)$, $(4,6)$, in blu; accanto a ogni nodo la sua distanza.

    ![Figura 2](../../img/shortest-paths/fig02.svg){ .fig loading=lazy  }

!!! chiave ""

    Senza cicli negativi raggiungibili dalla sorgente, ogni sottocammino di un cammino minimo è minimo, le distanze soddisfano le equazioni di Bellman, e un solo albero ricoprente contiene un cammino minimo verso ogni nodo.

---

**Avanti:** [3.2 Condizioni di ottimalità e potenziali](condizioni-di-ottimalita-e-potenziali.md)
