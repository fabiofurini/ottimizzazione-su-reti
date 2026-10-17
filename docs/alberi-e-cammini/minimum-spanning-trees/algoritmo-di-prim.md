---
title: "Algoritmo di Prim"
---

# 2.6 Algoritmo di Prim { #sez-sec-mst-prim }

<div class="info-capitolo" markdown>

**Parte 2 · Alberi e cammini · Capitolo 2** · [:material-book-open-variant: Capitolo 2: Alberi ricoprenti](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-alberi-e-cammini.pdf) · [:material-presentation: Slide](../../pdf/slide-minimum-spanning-trees.pdf) · [:material-pencil: Esercizi: Alberi ricoprenti](../../esercizi/minimum-spanning-trees.md) · [:material-gesture-tap: App: Alberi ricoprenti minimi: Kruskal e Prim](../../laboratorio/albero-ricoprente-minimo-kruskal-prim.md)

</div>

- L'algoritmo di Prim fa crescere un solo albero da un vertice di partenza $s$: l'insieme $S$ dei vertici dell'albero definisce il taglio $\delta(S)$ del Passo 2, e lo spigolo più leggero del taglio si trova attraverso un'<strong>etichetta</strong> $d(v)$ per ogni vertice $v \notin S$.

!!! algoritmo "Algoritmo: Algoritmo di Prim"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> un grafo non orientato connesso <span class="arithmatex">\(G=(V,E)\)</span> con pesi <span class="arithmatex">\(w_e\)</span>, dato con le sue liste di adiacenza; un vertice di partenza
    <span class="arithmatex">\(s \in V\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> un albero ricoprente di costo minimo <span class="arithmatex">\(F\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Passo 0 (inizializzazione).</strong> Porre <span class="arithmatex">\(S:=\{s\}\)</span> e <span class="arithmatex">\(F:=\emptyset\)</span>. Per ogni <span class="arithmatex">\(v \neq s\)</span>: se <span class="arithmatex">\(\{s,v\} \in E\)</span>, porre
    <span class="arithmatex">\(d(v):=w_{sv}\)</span> e <span class="arithmatex">\(\mathit{pred}(v):=s\)</span>; altrimenti porre <span class="arithmatex">\(d(v):=+\infty\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">2</span><strong>Passo 1 (selezione).</strong> Se <span class="arithmatex">\(S=V\)</span>, <code>STOP</code>. Altrimenti selezionare <span class="arithmatex">\(v \notin S\)</span> con <span class="arithmatex">\(d(v)\)</span> minimo, e porre
    <span class="arithmatex">\(S:=S \cup \{v\}\)</span>, <span class="arithmatex">\(F:=F \cup \{\{\mathit{pred}(v),v\}\}\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">3</span><strong>Passo 2 (aggiornamento).</strong> Per ogni <span class="arithmatex">\(u \notin S\)</span> adiacente a <span class="arithmatex">\(v\)</span> con <span class="arithmatex">\(w_{vu}<d(u)\)</span>, porre <span class="arithmatex">\(d(u):=w_{vu}\)</span> e
    <span class="arithmatex">\(\mathit{pred}(u):=v\)</span>. Andare al Passo 1.</div></div>

- In questo modulo il vertice di partenza è $s=1$, e nel Passo 1, a parità di etichetta, si sceglie il vertice di indice minimo.

<a id="box-19-mst-lem-labels"></a>

!!! teorema "Lemma 2.12: significato delle etichette"

    A ogni esecuzione del Passo 1 dell'algoritmo di Prim, per ogni $v \notin S$,

    $$
    d(v)=\min\big\{\, w_{uv} : u \in S,~ \{u,v\} \in E \,\big\}
    $$

    ($+\infty$ se $v$ non ha vicini in $S$), e quando $d(v)<+\infty$ il minimo è raggiunto da $u=\mathit{pred}(v)$.

??? dimostrazione "Dimostrazione"

    Per induzione. Alla prima esecuzione $S=\{s\}$, e il Passo 0 pone esattamente $d(v)=w_{sv}$, oppure $+\infty$. Supponiamo vera l'affermazione prima dell'inserimento di un vertice $v$ in $S$. Per $u \notin S \cup \{v\}$, il nuovo insieme $S \cup \{v\}$ aggiunge il candidato $w_{vu}$ quando $\{v,u\} \in E$, e il Passo 2 sostituisce $d(u)$ e $\mathit{pred}(u)$ esattamente quando questo candidato è più piccolo. Le altre etichette e gli altri predecessori non cambiano. <span class="qed">□</span>

<a id="box-20-mst-th-prim"></a>

!!! teorema "Teorema 2.13: correttezza dell'algoritmo di Prim"

    L'algoritmo di Prim si ferma con $|F|=n-1$, e $F$ è un albero ricoprente di costo minimo.

??? dimostrazione "Dimostrazione"

    Tutti gli spigoli di $F$ hanno entrambi gli estremi in $S$, quindi $F \cap \delta(S)=\emptyset$.

    1. Per il <span style="color:#1971c2">[Lemma 2.12](#box-19-mst-lem-labels)</span>, $\min_{v \notin S} d(v)$ è il peso minimo di uno spigolo di $\delta(S)$, raggiunto da $\{\mathit{pred}(v),v\}$ per il $v$ selezionato; è finito perché $G$ è connesso.

    2. Quindi ogni iterazione è una scelta del Passo 2 dell'algoritmo greedy generico, con il taglio $\delta(S)$.

    3. Ogni iterazione aggiunge un vertice a $S$ e uno spigolo a $F$, quindi l'algoritmo si ferma dopo $n-1$ iterazioni con $|F|=n-1$; il <span style="color:#1971c2">[Teorema 2.9](l-algoritmo-greedy-generico.md#box-15-mst-th-greedy)</span> conclude. <span class="qed">□</span>

<a id="box-21-mst-th-prim-time"></a>

!!! teorema "Teorema 2.14: tempo di esecuzione dell'algoritmo di Prim"

    Con le etichette memorizzate in un array, l'algoritmo di Prim richiede tempo $O(n^2)$.

??? dimostrazione "Dimostrazione"

    Ci sono $n-1$ selezioni, e ciascuna scorre le etichette di al più $n$ vertici: $O(n^2)$ in totale. L'aggiornamento dopo l'inserimento di $v$ scorre la lista di adiacenza di $v$ in tempo $O(\deg(v))$, e $\sum_{v \in V} \deg(v)=2m$. Il totale è $O(n^2+m)=O(n^2)$, poiché $m \le n^2$. <span class="qed">□</span>

- Sui grafi densi, con $m$ dell'ordine di $n^2$, il limite $O(n^2)$ è lineare nella dimensione del grafo.

- Con le etichette in uno heap binario, ogni selezione e ogni aggiornamento richiedono tempo $O(\log n)$, per $O(m\log n)$ in totale: meglio sui grafi sparsi.

## 2.6.1 Algoritmo di Prim sul grafo di riferimento

<a id="box-22-mst-ex-prim"></a>

!!! esempio "Esempio 2.8: algoritmo di Prim dal vertice $1$"

    Eseguiamo l'algoritmo di Prim sul grafo di riferimento pesato a partire da $s=1$. Ogni riga mostra il vertice selezionato, lo spigolo aggiunto a $F$ e le etichette $d(v)$ dei vertici fuori da $S$ dopo l'aggiornamento, con $\mathit{pred}(v)$ fra parentesi; un trattino indica i vertici già in $S$.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>iterazione</th>
    <th>selezionato</th>
    <th>spigolo aggiunto</th>
    <th><span class="arithmatex">\(d(2)\)</span></th>
    <th><span class="arithmatex">\(d(3)\)</span></th>
    <th><span class="arithmatex">\(d(4)\)</span></th>
    <th><span class="arithmatex">\(d(5)\)</span></th>
    <th><span class="arithmatex">\(d(6)\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td>–</td>
    <td><span class="arithmatex">\(4~(1)\)</span></td>
    <td><span class="arithmatex">\(1~(1)\)</span></td>
    <td><span class="arithmatex">\(\infty\)</span></td>
    <td><span class="arithmatex">\(\infty\)</span></td>
    <td><span class="arithmatex">\(\infty\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(\{1,3\}\)</span></td>
    <td><span class="arithmatex">\(3~(3)\)</span></td>
    <td>–</td>
    <td><span class="arithmatex">\(5~(3)\)</span></td>
    <td><span class="arithmatex">\(8~(3)\)</span></td>
    <td><span class="arithmatex">\(\infty\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(\{2,3\}\)</span></td>
    <td>–</td>
    <td>–</td>
    <td><span class="arithmatex">\(5~(3)\)</span></td>
    <td><span class="arithmatex">\(8~(3)\)</span></td>
    <td><span class="arithmatex">\(\infty\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(\{3,4\}\)</span></td>
    <td>–</td>
    <td>–</td>
    <td>–</td>
    <td><span class="arithmatex">\(2~(4)\)</span></td>
    <td><span class="arithmatex">\(9~(4)\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(\{4,5\}\)</span></td>
    <td>–</td>
    <td>–</td>
    <td>–</td>
    <td>–</td>
    <td><span class="arithmatex">\(7~(5)\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(\{5,6\}\)</span></td>
    <td>–</td>
    <td>–</td>
    <td>–</td>
    <td>–</td>
    <td>–</td>
    </tr>
    </table></div>

    All'iterazione $1$ l'etichetta di $2$ scende da $4$ a $3$, perché $w_{32}=3<4$; all'iterazione $3$ l'etichetta di $5$ scende da $8$ a $2$. La figura mostra lo stato dopo l'iterazione $2$: il taglio $\delta(\{1,2,3\})$ è attraversato da $\{2,4\}$, $\{3,4\}$, $\{3,5\}$, e il prossimo spigolo è $\{3,4\}$, con $d(4)=5$.

    ![Figura 5](../../img/minimum-spanning-trees/fig05.svg){ .fig loading=lazy  }

    L'albero finale è $\{1,3\},\{2,3\},\{3,4\},\{4,5\},\{5,6\}$, di peso $18$: lo stesso albero dell'algoritmo di Kruskal, con gli spigoli aggiunti in un ordine diverso.

- L'algoritmo di Kruskal aggiunge $\{4,5\}$ per secondo, l'algoritmo di Prim per quarto: Kruskal fa crescere una foresta, Prim un solo albero che contiene $s$.

!!! chiave ""

    L'algoritmo di Prim fa crescere un albero da $s$ e aggiunge lo spigolo più leggero che ne esce; le etichette $d(v)$ danno quello spigolo in tempo $O(n)$, per $O(n^2)$ in totale.

---

**Avanti:** [2.7 Unicità dell'albero ricoprente di costo minimo](unicita-dell-albero-ricoprente-di-costo-minimo.md)
