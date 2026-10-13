---
title: "Unicità dell'albero di copertura minimo"
---

# 2.7 Unicità dell'albero di copertura minimo

<div class="info-capitolo" markdown>

**Parte 2 · Alberi e cammini · Capitolo 2** · [:material-book-open-variant: Capitolo 2: Alberi ricoprenti](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-alberi-e-cammini.pdf) · [:material-pencil: Esercizi: Alberi ricoprenti](../../esercizi/minimum-spanning-trees.md) · [:material-gesture-tap: App: Alberi ricoprenti minimi: Kruskal e Prim](../../laboratorio/albero-ricoprente-minimo-kruskal-prim.md)

</div>

<a id="sez-sec-mst-uniqueness"></a>
<a id="box-23-mst-th-unique"></a>

!!! teorema "Teorema 2.15: pesi distinti"

    Se i pesi $w_e$, $e \in E$, sono distinti a coppie, il grafo connesso $G=(V,E)$ ha esattamente uno spanning minimo albero.

??? dimostrazione "Dimostrazione"

    Supponiamo che $T_1 \neq T_2$ siano alberi di copertura minimi. Hanno lo stesso numero di lati, quindi la differenza simmetrica $(T_1 \setminus T_2) \cup (T_2 \setminus T_1)$ non è vuoto; lascia che $e$ sia il suo lato più leggero e dì $e \in T_1 \setminus T_2$.

    1. Il ciclo $C(T_2,e)$ non è contenuto nell'aciclico $T_1$, quindi ha un fronte $f \notin T_1$; $f \neq e$ e $f \in T_2$, quindi $f \in T_2 \setminus T_1$.

    2. $f$ è nella differenza simmetrica e $f \neq e$, quindi $w_f>w_e$, essendo i pesi distinti.

    3. $T_2 \cup \{e\} \setminus \{f\}$ è uno albero ricoprente (<span style="color:#1971c2">[Lemma 2.5](tagli-e-cicli.md#box-7-mst-lem-exchange)</span>) di peso $w(T_2)+w_e-w_f<w(T_2)$: una contraddizione. <span class="qed">□</span>

- Con pesi distinti, algoritmo di Kruskal, algoritmo di Prim da qualsiasi vertice iniziale e ogni esecuzione del l'algoritmo greedy generico restituisce lo stesso albero.

- Sul grafo di riferimento, l'algoritmo di Prim da $s=6$ aggiunge $\{5,6\},\{4,5\},\{3,4\},\{1,3\},\{2,3\}$: ancora una volta il albero $\tilde{F}$.

### 2.7.1 Pesi con valori di parità

<a id="box-24-mst-prop-ties"></a>

!!! teorema "Proposizione 2.16: edge in ogni o nessun albero ricoprente minimo"

    Sia $T$ uno albero ricoprente minimo di $G=(V,E)$.

    - **(a)** Un lato $e \in T$ appartiene ad ogni albero di copertura minimo se e solo se $w_e<w_f$ per ogni $f \neq e$ in il taglio fondamentale di $e$.

    - **(b)** Un lato $e \notin T$ non appartiene a nessun albero di copertura minimo se e solo se $w_e>w_f$ per ogni $f \neq e$ in $C(T,e)$.

    In particolare, $T$ è l'unico albero di copertura minimo se e solo se ogni lato esterno a $T$ è strettamente più pesante di gli altri lati del suo ciclo fondamentale.

??? dimostrazione "Dimostrazione"

    - **(a)** Se le disuguaglianze valgono, $e$ si trova in ogni albero di copertura minimo secondo la proprietà cut (<span style="color:#1971c2">[Teorema 2.6](la-proprieta-di-taglio-e-la-proprieta-di-ciclo.md#box-9-mst-th-cut)</span>(b)). Altrimenti alcuni $f \neq e$ nel taglio fondamentale hanno $w_f \le w_e$ e $w_f \ge w_e$ dalla condizione di taglio (<span style="color:#1971c2">[Teorema 2.8](la-proprieta-di-taglio-e-la-proprieta-di-ciclo.md#box-12-mst-th-optimality)</span>): quindi $w_f=w_e$ e $T \cup \{f\} \setminus \{e\}$ è un albero ricoprente (<span style="color:#1971c2">[Lemma 2.5](tagli-e-cicli.md#box-7-mst-lem-exchange)</span>(2)) dello stesso peso, senza $e$.

    - **(b)** Se le disuguaglianze valgono, $e$ non si trova in alcun albero di copertura minimo secondo la proprietà cycle (<span style="color:#1971c2">[Teorema 2.7](la-proprieta-di-taglio-e-la-proprieta-di-ciclo.md#box-10-mst-th-cycle)</span>(b)). Altrimenti alcuni $f \neq e$ in $C(T,e)$ hanno $w_f=w_e$, in base al ciclo condizione e $T \cup \{e\} \setminus \{f\}$ è uno albero ricoprente minimo contenente $e$.

    Per l'ultima affermazione: $T$ è unico se e solo se nessun arco esterno a $T$ appartiene ad un albero di copertura minimo, cioè (b) vale per ogni $e \notin T$. <span class="qed">□</span>

<a id="box-25-mst-ex-ties"></a>

!!! esempio "Esempio 2.9: legami sul grafo di riferimento"

    - Lascia che $w_{12}=3$ invece di $4$, in modo che $w_{12}=w_{23}=3$. Il ciclo fondamentale di $\{1,2\}$ in $\tilde{F}$ è $1,3,2,1$, con $w_{23}=w_{12}$: di <span style="color:#1971c2">[Proposizione 2.16](#box-24-mst-prop-ties)</span>(b), l'albero Anche $\{1,2\},\{1,3\},\{3,4\},\{4,5\},\{5,6\}$ è ottimale, con peso $18$.

    - L'enumerazione conferma che questi sono gli unici due albero ricoprente minimi. Algoritmo di Kruskal, scansione $\{1,2\}$ prima di $\{2,3\}$, restituisce quello con $\{1,2\}$.

    - Non sempre i legami creano più alberi ottimali: con $w_{35}=w_{46}=9$ l'albero $\tilde{F}$ è ancora l'unico albero di copertura minimo, perché ciascuno dei quattro lati esterni ad esso rimane rigorosamente il più pesante del suo ciclo.

!!! chiave ""

    Con pesi distinti l'albero di copertura minimo è unico. Con i legami, un albero è l'unico ottimo se e solo se ogni lato esterno ad esso è strettamente il più pesante del suo ciclo fondamentale.

## 2.8 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Utilizzo della proprietà di taglio con un taglio attraversato da $F$.</strong> Il lato più leggero di $\delta(S)$ è sicuro solo se non il lato già scelto incrocia $\delta(S)$.

    - <strong>Accettare un lato nell'algoritmo di Kruskal perché tocca un nuovo vertice.</strong> Il test è se i due gli endpoint si trovano in componenti diversi: $\{3,4\}$ è accettato sebbene sia $3$ che $4$ siano già coperti.

    - <strong>Aggiornamento delle etichette nell'algoritmo di Prim con le lunghezze dei percorsi.</strong> La nuova etichetta è il peso $w_{vu}$ di un lato singolo, non $d(v)+w_{vu}$: questo è l'algoritmo di Dijkstra per i percorsi più brevi.

    - <strong>Dimenticando che le etichette possono solo diminuire.</strong> Nell'algoritmo di Prim $d(u)$ cambia solo quando $w_{vu}<d(u)$.

    - <strong>Rivendicare l'unicità dall'algoritmo.</strong> Kruskal e Prim restituiscono un albero; con cravatte altre ottimali gli alberi possono esistere, e si trovano attraverso le uguaglianze nei cicli fondamentali.

    - <strong>Applicazione degli algoritmi ai grafi orientati.</strong> Uno albero ricoprente minimo è definito sui grafi non orientati; in un grafo orientato l'orientamento degli archi viene ignorato.

## 2.9 In sintesi

!!! chiave "In sintesi"

    - Uno albero ricoprente minimo è uno albero ricoprente di peso totale minimo di un grafo pesato connesso; ha Lati $n-1$.

    - Proprietà taglio: il lato più leggero di un taglio non attraversato da $F$ estende $F$ entro un certo albero ricoprente minimo. Proprietà del ciclo: il lato più pesante di un ciclo può essere tralasciato e, se è strettamente il più pesante, non è ottimale.

    - Uno albero ricoprente è ottimale se e solo se ogni arco esterno ad esso è il più pesante del suo ciclo fondamentale, oppure equivalentemente ogni lato dell'albero è il più leggero del suo taglio fondamentale.

    - L'algoritmo di Kruskal ordina gli lati e accetta quelli che uniscono due componenti, nel tempo $O(m\log n)$; Quello di Prim L'algoritmo fa crescere un albero con le etichette $d(v)$, nel tempo $O(n^2)$.

    - Con pesi distinti l'albero di copertura minimo è unico.

    <strong>Il grafo di riferimento ponderato in sintesi.</strong>

    <div class="tabella" markdown="0"><table>
    <tr>
    <td>vertici, lati, albero ricoprente e <span class="arithmatex">\(n=6\)</span>, <span class="arithmatex">\(m=9\)</span>, <span class="arithmatex">\(55\)</span></td>
    </tr>
    <tr>
    <td>albero di copertura minimo</td>
    <td><span class="arithmatex">\(\{1,3\},\{2,3\},\{3,4\},\{4,5\},\{5,6\}\)</span>, peso <span class="arithmatex">\(18\)</span> (unico)</td>
    </tr>
    <tr>
    <td>Kruskal e accetta <span class="arithmatex">\(\{1,3\},\{4,5\},\{2,3\},\{3,4\},\{5,6\}\)</span>; rifiuta <span class="arithmatex">\(\{1,2\},\{2,4\}\)</span></td>
    </tr>
    <tr>
    <td>Prim da <span class="arithmatex">\(1\)</span> e seleziona <span class="arithmatex">\(3,2,4,5,6\)</span></td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Alberi ricoprenti](../../esercizi/minimum-spanning-trees.md)
