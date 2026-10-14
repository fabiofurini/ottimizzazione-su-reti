---
title: "Problemi del percorso più breve"
---

# 3.1 Problemi del percorso più breve { #sez-sec-sp-problems }

<div class="info-capitolo" markdown>

**Parte 2 · Alberi e cammini · Capitolo 3** · [:material-book-open-variant: Capitolo 3: Cammini minimi](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-alberi-e-cammini.pdf) · [:material-pencil: Esercizi: Cammini minimi](../../esercizi/shortest-paths.md) · [:material-gesture-tap: App: Cammini minimi: Dijkstra, Bellman–Ford, grafi aciclici](../../laboratorio/cammini-minimi-dijkstra-bellman-ford.md)

</div>

<a id="box-1-sp-def-problem"></a>

!!! definizione "Definizione 3.1: problemi sul percorso più breve"

    Sia $G=(N,A)$ un grafo orientato con una <strong>lunghezza</strong> $d_{ij} \in \R$ per ogni arco $(i,j) \in A$, di qualsiasi segno.

    - La lunghezza di un cammino diretto $W=i_0,i_1,\dots,i_k$ è la somma delle lunghezze dei suoi archi, $d(W)=\sum_{t=1}^{k} d_{i_{t-1}i_t}$.

    - Dati due nodi $s$ e $t$, il problema del percorso più breve <strong>$s$–$t$</strong> richiede un percorso diretto da $s$ a $t$ di lunghezza minima.

    - Dato un nodo $s$, <strong>sorgente</strong>, <strong>problema del percorso più breve a sorgente singola</strong> richiede un percorso diretto da $s$ a ogni nodo $j \in N$.

    La lunghezza minima di un percorso diretto da $s$ a $j$ è <strong>distanza</strong> $\tilde{d}(j)$ di $j$; abbiamo impostato $\tilde{d}(j)=+\infty$ se $j$ non è raggiungibile da $s$.

- In questo capitolo scriviamo $n=|N|$, $m=|A|$, e “percorso” e “ciclo” indicano sempre percorso diretto e percorso diretto ciclo.

- Un algoritmo per il problema della singola origine risolve anche il problema $s$–$t$, per ogni $t$ contemporaneamente.

<a id="box-2-sp-ex-ref"></a>

!!! esempio "Esempio 3.1: il grafo di riferimento con lunghezze"

    Diamo il grafo di riferimento di [Capitolo 1 «Grafi»](../../grafi/graphs/index.md) le lunghezze $d_{ij}$ scritte sugli archi, tutte non negative; la fonte è $s=1$.

    ![Figura 1](../../img/shortest-paths/fig01.svg){ .fig loading=lazy  }

    Tre dei percorsi da $1$ a $6$ e le relative lunghezze sono:

    $$
    d(1,2,4,6)=7+3+5=15, \qquad d(1,3,2,4,6)=2+3+3+5=13, \qquad d(1,3,5,6)=2+8+7=17.
    $$

    Le distanze dal nodo $1$, calcolate in <span style="color:#1971c2">Sezione [3.6](algoritmo-di-dijkstra.md#sez-sec-sp-dijkstra)</span>, sono

    $$
    \tilde{d}=(0,\,5,\,2,\,8,\,10,\,13),
    $$

    quindi $1,3,2,4,6$ è il percorso più breve da $1$ a $6$.

## 3.1.1 Cicli negativi

<a id="box-3-sp-def-negcycle"></a>

!!! definizione "Definizione 3.2: ciclo negativo"

    Un <strong>ciclo negativo</strong> è un ciclo diretto $C$ con $d(C)<0$. Nel resto del capitolo ne citeremo due ipotesi:

    - **(A1)** ogni nodo di $G$ è raggiungibile da $s$;

    - **(A2)** nessun ciclo negativo di $G$ è raggiungibile da $s$.

<a id="box-4-sp-lem-walk"></a>

!!! teorema "Lemma 3.3: passeggiate e sentieri"

    Sotto (A2), per ogni cammino diretto $W$ da $s$ a $j$ esiste un percorso diretto $P$ da $s$ a $j$, con archi di $W$, tale che $d(P) \le d(W)$.

??? dimostrazione "Dimostrazione"

    Per induzione sul numero di archi di $W$. Se $W$ ha nodi distinti, $P=W$.

    1. Altrimenti $W$ ripete un nodo: $W=s,\dots,i_a,\dots,i_b,\dots,j$ con $i_a=i_b$, $a<b$ e $b-a$ minimo. Il pezzo $C=i_a,\dots,i_b$ è un ciclo, raggiungibile da $s$ lungo $W$.

    2. Di (A2), $d(C) \ge 0$. L'eliminazione di $C$ da $W$ consente di eseguire una passeggiata $W'$ da $s$ a $j$ con meno archi e $d(W')=d(W)-d(C) \le d(W)$.

    3. Per induzione $W'$ contiene un percorso $P$ con $d(P) \le d(W') \le d(W)$. <span class="qed">□</span>

- Sotto l'ipotesi (A2), la lunghezza minima di un cammino da $s$ a $j$ coincide con la distanza $\tilde{d}(j)$. Gli algoritmi di questo capitolo calcolano le lunghezze minime dei cammini; il lemma precedente permette di ricondurle a percorsi.

- Se esiste un ciclo negativo $C$ raggiungibile da $s$ e da cui si può raggiungere $j$, percorrere $C$ ripetutamente produce cammini da $s$ a $j$ di lunghezza arbitrariamente negativa. In questo caso gli algoritmi rilevano $C$ e non calcolano distanze finite.

<a id="box-5-sp-ex-negcycle"></a>

!!! esempio "Esempio 3.2: un ciclo negativo"

    Il grafo di riferimento ha due cicli, $2,4,3,2$ e $3,5,4,3$. Con le lunghezze di <span style="color:#1971c2">[Esempio 3.1](#box-2-sp-ex-ref)</span> le loro lunghezze sono $7$ e $11$. Se la lunghezza dell'arco $(5,4)$ scende da $2$ a $d''_{54}=-10$, il ciclo $3,5,4,3$ ha lunghezza

    $$
    8-10+1=-1 ,
    $$

    e le passeggiate $1,3,5,6$, $1,3,5,4,3,5,6$, $1,3,5,4,3,5,4,3,5,6$, … da $1$ a $6$ hanno lunghezze $17,16,15,\dots$: nessuna passeggiata è la più breve. Utilizziamo nuovamente queste lunghezze $d''$ in <span style="color:#1971c2">Section [3.5](l-algoritmo-bellmanford.md#sez-sec-sp-bf)</span>.

## 3.1.2 Ottimità dei sottopercorsi

<a id="box-6-sp-lem-subpath"></a>

!!! teorema "Lemma 3.4: ottimalità dei sottopercorsi"

    In (A2), sia $P$ il percorso più breve da $s$ a $j$ e sia $i$ un nodo di $P$. Quindi il sottopercorso $P_{si}$ di $P$ da $s$ a $i$ è il percorso più breve da $s$ a $i$.

??? dimostrazione "Dimostrazione"

    Scrivi $P$ come $P_{si}$ seguito dal sottopercorso $P_{ij}$ da $i$ a $j$, quindi $d(P)=d(P_{si})+d(P_{ij})$. Assumere da contraddizione che un percorso $Q$ da $s$ a $i$ abbia $d(Q)<d(P_{si})$.

    1. $Q$ seguito da $P_{ij}$ è una passeggiata da $s$ a $j$ di lunghezza $d(Q)+d(P_{ij})<d(P)$.

    2. Da <span style="color:#1971c2">[Lemma 3.3](#box-4-sp-lem-walk)</span> contiene un percorso da $s$ a $j$ più corto di $P$: un contraddizione. <span class="qed">□</span>

<a id="box-7-sp-th-bellman"></a>

!!! teorema "Teorema 3.5: Equazioni di Bellman"

    Per (A1) e (A2), le distanze sono soddisfatte

    $$
    \tilde{d}(s)=0, \qquad \tilde{d}(j)=\min_{(i,j) \in \delta^-(j)} \big\{\, \tilde{d}(i)+d_{ij} \,\big\}, \quad
    \forall j \in N \setminus \{s\},
    $$

    e $\tilde{d}(j) \le \tilde{d}(i)+d_{ij}$ per ogni arco $(i,j) \in A$.

??? dimostrazione "Dimostrazione"

    Tutte le distanze sono finite da (A1) e $\tilde{d}(s)=0$: il percorso $s$ ha lunghezza $0$ e un percorso da $s$ a $s$ con archi sarebbe un ciclo, di lunghezza $\ge 0$ per (A2).

    - <em>Disuguaglianza.</em> Un percorso più breve da $s$ a $i$ seguito dall'arco $(i,j)$ è una passeggiata di lunghezza $\tilde{d}(i)+d_{ij}$; di <span style="color:#1971c2">[Lemma 3.3](#box-4-sp-lem-walk)</span>, $\tilde{d}(j) \le \tilde{d}(i)+d_{ij}$.

    - <em>Equazione.</em> Per $j \neq s$, sia $P$ il percorso più breve da $s$ a $j$ e $(i,j)$ il suo ultimo arco. Di <span style="color:#1971c2">[Lemma 3.4](#box-6-sp-lem-subpath)</span>, $\tilde{d}(j)=d(P)=\tilde{d}(i)+d_{ij}$, quindi il minimo è raggiunto.

    <p class="qed-riga"><span class="qed">□</span></p>

<a id="box-8-sp-prop-tree"></a>

!!! teorema "Proposizione 3.6: shortest path tree"

    Sotto (A1) e (A2), c'è uno albero ricoprente $T$ di $G$, lo <strong>albero del percorso più breve</strong>, tale che per ogni $j \in N$ il percorso da $s$ a $j$ in $T$ è diretto ed è il percorso più breve.

??? dimostrazione "Dimostrazione"

    Per ogni $j$, sia $k(j)$ il numero minimo di archi di un percorso minimo da $s$ a $j$; $k(s)=0$.

    1. Per $j \neq s$, scegliere un percorso più breve $P$ da $s$ a $j$ con archi $k(j)$ e lasciare che $\mathit{pred}(j)$ sia il nodo prima di $j$ su $P$.

    2. Il sottopercorso di $P$ da $s$ a $\mathit{pred}(j)$ è il più breve (<span style="color:#1971c2">[Lemma 3.4](#box-6-sp-lem-subpath)</span>) con $k(j)-1$ archi, quindi $k(\mathit{pred}(j)) \le k(j)-1$ e $\tilde{d}(j)=\tilde{d}(\mathit{pred}(j))+d_{\mathit{pred}(j)\,j}$.

    3. Passando da $j$ a $\mathit{pred}(j)$, il numero $k$ diminuisce rigorosamente, quindi la sequenza termina con $s$. Gli archi $(\mathit{pred}(j),j)$ sono $n-1$ e collegano ogni nodo a $s$: formano uno albero ricoprente ([Capitolo 1, Teorema «caratterizzazioni di un albero»](../../grafi/graphs/alberi-e-foreste.md)).

    4. Lungo il percorso dell'albero $s=i_0,i_1,\dots,i_r=j$ ogni arco soddisfa $\tilde{d}(i_t)=\tilde{d}(i_{t-1})+d_{i_{t-1}i_t}$; sommando, la sua lunghezza è $\tilde{d}(j)$. <span class="qed">□</span>

<a id="box-9-sp-ex-bellman"></a>

!!! esempio "Esempio 3.3: Equazioni di Bellman sul grafo di riferimento"

    Con le distanze $\tilde{d}=(0,5,2,8,10,13)$ di <span style="color:#1971c2">[Esempio 3.1](#box-2-sp-ex-ref)</span>:

    - Il nodo $4$ ha gli archi entranti $(2,4)$ e $(5,4)$ e $\tilde{d}(4)=\min\{5+3,\;10+2\}=8$;

    - Il nodo $6$ ha gli archi entranti $(4,6)$ e $(5,6)$ e $\tilde{d}(6)=\min\{8+5,\;10+7\}=13$.

    Gli archi che raggiungono il minimo formano l'albero dei percorsi più brevi $(1,3)$, $(3,2)$, $(2,4)$, $(3,5)$, $(4,6)$, in blu; successivo ad ogni nodo la sua distanza.

    ![Figura 2](../../img/shortest-paths/fig02.svg){ .fig loading=lazy  }

!!! chiave ""

    Senza cicli negativi raggiungibili dalla sorgente, ogni sottopercorso di un percorso più breve è la distanza più breve soddisfare le equazioni di Bellman e uno albero ricoprente contiene il percorso più breve per ogni nodo.

---

**Avanti:** [3.2 Condizioni e potenziali di ottimalità](condizioni-e-potenziali-di-ottimalita.md)
