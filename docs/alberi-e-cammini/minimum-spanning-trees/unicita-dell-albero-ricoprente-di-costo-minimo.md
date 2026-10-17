---
title: "Unicità dell'albero ricoprente di costo minimo"
---

# 2.7 Unicità dell'albero ricoprente di costo minimo

<div class="info-capitolo" markdown>

**Parte 2 · Alberi e cammini · Capitolo 2** · [:material-book-open-variant: Capitolo 2: Alberi ricoprenti](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-alberi-e-cammini.pdf) · [:material-presentation: Slide](../../pdf/slide-minimum-spanning-trees.pdf) · [:material-pencil: Esercizi: Alberi ricoprenti](../../esercizi/minimum-spanning-trees.md) · [:material-gesture-tap: App: Alberi ricoprenti minimi: Kruskal e Prim](../../laboratorio/albero-ricoprente-minimo-kruskal-prim.md)

</div>

<a id="sez-sec-mst-uniqueness"></a>

<a id="box-23-mst-th-unique"></a>

!!! teorema "Teorema 2.15: pesi distinti"

    Se i pesi $w_e$, $e \in E$, sono distinti a due a due, il grafo connesso $G=(V,E)$ ha esattamente un albero ricoprente di costo minimo.

??? dimostrazione "Dimostrazione"

    Supponiamo che $T_1 \neq T_2$ siano alberi ricoprenti di costo minimo. Hanno lo stesso numero di spigoli, quindi la differenza simmetrica $(T_1 \setminus T_2) \cup (T_2 \setminus T_1)$ è non vuota; sia $e$ il suo spigolo più leggero, e supponiamo $e \in T_1 \setminus T_2$.

    1. Il ciclo $C(T_2,e)$ non è contenuto in $T_1$, che è aciclico, quindi ha uno spigolo $f \notin T_1$; $f \neq e$, e $f \in T_2$, quindi $f \in T_2 \setminus T_1$.

    2. $f$ sta nella differenza simmetrica e $f \neq e$, quindi $w_f>w_e$, perché i pesi sono distinti.

    3. $T_2 \cup \{e\} \setminus \{f\}$ è un albero ricoprente (<span style="color:#1971c2">[Lemma 2.5](tagli-e-cicli.md#box-7-mst-lem-exchange)</span>) di peso $w(T_2)+w_e-w_f<w(T_2)$: una contraddizione. <span class="qed">□</span>

- Con pesi distinti, l'algoritmo di Kruskal, l'algoritmo di Prim da qualsiasi vertice di partenza e ogni esecuzione dell'algoritmo greedy generico restituiscono lo stesso albero.

- Sul grafo di riferimento, l'algoritmo di Prim a partire da $s=6$ aggiunge gli spigoli $\{5,6\},\{4,5\},\{3,4\},\{1,3\},\{2,3\}$: ancora una volta l'albero $\tilde{F}$.

### 2.7.1 Pesi uguali

<a id="box-24-mst-prop-ties"></a>

!!! teorema "Proposizione 2.16: spigoli in tutti o in nessun albero ricoprente di costo minimo"

    Sia $T$ un albero ricoprente di costo minimo di $G=(V,E)$.

    - **(a)** Uno spigolo $e \in T$ appartiene a ogni albero ricoprente di costo minimo se e solo se $w_e<w_f$ per ogni $f \neq e$ nel taglio fondamentale di $e$.

    - **(b)** Uno spigolo $e \notin T$ non appartiene a nessun albero ricoprente di costo minimo se e solo se $w_e>w_f$ per ogni $f \neq e$ in $C(T,e)$.

    In particolare, $T$ è l'unico albero ricoprente di costo minimo se e solo se ogni spigolo fuori da $T$ è strettamente più pesante degli altri spigoli del suo ciclo fondamentale.

??? dimostrazione "Dimostrazione"

    - **(a)** Se le disuguaglianze valgono, $e$ sta in ogni albero ricoprente di costo minimo per la proprietà del taglio (<span style="color:#1971c2">[Teorema 2.6](la-proprieta-del-taglio-e-la-proprieta-del-ciclo.md#box-9-mst-th-cut)</span>(b)). Altrimenti qualche $f \neq e$ nel taglio fondamentale ha $w_f \le w_e$, e $w_f \ge w_e$ per la condizione del taglio (<span style="color:#1971c2">[Teorema 2.8](la-proprieta-del-taglio-e-la-proprieta-del-ciclo.md#box-12-mst-th-optimality)</span>): quindi $w_f=w_e$, e $T \cup \{f\} \setminus \{e\}$ è un albero ricoprente (<span style="color:#1971c2">[Lemma 2.5](tagli-e-cicli.md#box-7-mst-lem-exchange)</span>(2)) dello stesso peso, senza $e$.

    - **(b)** Se le disuguaglianze valgono, $e$ non sta in nessun albero ricoprente di costo minimo per la proprietà del ciclo (<span style="color:#1971c2">[Teorema 2.7](la-proprieta-del-taglio-e-la-proprieta-del-ciclo.md#box-10-mst-th-cycle)</span>(b)). Altrimenti qualche $f \neq e$ in $C(T,e)$ ha $w_f=w_e$, per la condizione del ciclo, e $T \cup \{e\} \setminus \{f\}$ è un albero ricoprente di costo minimo che contiene $e$.

    Per l'ultima affermazione: $T$ è unico se e solo se nessuno spigolo fuori da $T$ appartiene a un albero ricoprente di costo minimo, cioè se (b) vale per ogni $e \notin T$. <span class="qed">□</span>

<a id="box-25-mst-ex-ties"></a>

!!! esempio "Esempio 2.9: pesi uguali sul grafo di riferimento"

    - Poniamo $w_{12}=3$ invece di $4$, in modo che $w_{12}=w_{23}=3$. Il ciclo fondamentale di $\{1,2\}$ in $\tilde{F}$ è $1,3,2,1$, con $w_{23}=w_{12}$: per la <span style="color:#1971c2">[Proposizione 2.16](#box-24-mst-prop-ties)</span>(b), anche l'albero $\{1,2\},\{1,3\},\{3,4\},\{4,5\},\{5,6\}$ è ottimo, con peso $18$.

    - L'enumerazione conferma che questi sono gli unici due alberi ricoprenti di costo minimo. L'algoritmo di Kruskal, che esamina $\{1,2\}$ prima di $\{2,3\}$, restituisce quello con $\{1,2\}$.

    - I pesi uguali non creano sempre più alberi ottimi: con $w_{35}=w_{46}=9$ l'albero $\tilde{F}$ è ancora l'unico albero ricoprente di costo minimo, perché ciascuno dei quattro spigoli fuori dall'albero resta strettamente il più pesante del suo ciclo.

!!! chiave ""

    Con pesi distinti l'albero ricoprente di costo minimo è unico. Con pesi uguali, un albero è l'unico ottimo se e solo se ogni spigolo fuori dall'albero è strettamente il più pesante del suo ciclo fondamentale.

## 2.8 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Usare la proprietà del taglio con un taglio attraversato da $F$.</strong> Lo spigolo più leggero di $\delta(S)$ è sicuro solo se nessuno spigolo già scelto attraversa $\delta(S)$.

    - <strong>Accettare uno spigolo nell'algoritmo di Kruskal perché tocca un vertice nuovo.</strong> Il test è se i due estremi stanno in componenti diverse: $\{3,4\}$ è accettato anche se $3$ e $4$ sono già entrambi coperti.

    - <strong>Aggiornare le etichette nell'algoritmo di Prim con le lunghezze dei cammini.</strong> La nuova etichetta è il peso $w_{vu}$ di un solo spigolo, non $d(v)+w_{vu}$: quello è l'algoritmo di Dijkstra per i cammini minimi.

    - <strong>Dimenticare che le etichette possono solo diminuire.</strong> Nell'algoritmo di Prim $d(u)$ cambia solo quando $w_{vu}<d(u)$.

    - <strong>Dedurre l'unicità dall'algoritmo.</strong> Kruskal e Prim restituiscono un solo albero; con pesi uguali possono esistere altri alberi ottimi, e si trovano attraverso le uguaglianze nei cicli fondamentali.

    - <strong>Applicare gli algoritmi ai grafi orientati.</strong> L'albero ricoprente di costo minimo è definito sui grafi non orientati; in un grafo orientato si ignora l'orientamento degli archi.

## 2.9 In sintesi

!!! chiave "In sintesi"

    - Un albero ricoprente di costo minimo è un albero ricoprente di peso totale minimo di un grafo pesato connesso; ha $n-1$ spigoli.

    - Proprietà del taglio: lo spigolo più leggero di un taglio non attraversato da $F$ estende $F$ dentro qualche albero ricoprente di costo minimo. Proprietà del ciclo: lo spigolo più pesante di un ciclo si può lasciare fuori, e se è strettamente il più pesante non sta in nessun albero ottimo.

    - Un albero ricoprente è ottimo se e solo se ogni spigolo fuori dall'albero è il più pesante del suo ciclo fondamentale, o equivalentemente ogni spigolo dell'albero è il più leggero del suo taglio fondamentale.

    - L'algoritmo di Kruskal ordina gli spigoli e accetta quelli che uniscono due componenti, in tempo $O(m\log n)$; l'algoritmo di Prim fa crescere un albero con le etichette $d(v)$, in tempo $O(n^2)$.

    - Con pesi distinti l'albero ricoprente di costo minimo è unico.

    <strong>Il grafo di riferimento pesato in breve.</strong>

    <div class="tabella" markdown="0"><table>
    <tr>
    <td>vertici, spigoli, alberi ricoprenti</td>
    <td><span class="arithmatex">\(n=6\)</span>, <span class="arithmatex">\(m=9\)</span>, <span class="arithmatex">\(55\)</span></td>
    </tr>
    <tr>
    <td>albero ricoprente di costo minimo</td>
    <td><span class="arithmatex">\(\{1,3\},\{2,3\},\{3,4\},\{4,5\},\{5,6\}\)</span>, peso <span class="arithmatex">\(18\)</span> (unico)</td>
    </tr>
    <tr>
    <td>Kruskal</td>
    <td>accetta <span class="arithmatex">\(\{1,3\},\{4,5\},\{2,3\},\{3,4\},\{5,6\}\)</span>; rifiuta <span class="arithmatex">\(\{1,2\},\{2,4\}\)</span></td>
    </tr>
    <tr>
    <td>Prim da <span class="arithmatex">\(1\)</span></td>
    <td>seleziona <span class="arithmatex">\(3,2,4,5,6\)</span></td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Alberi ricoprenti](../../esercizi/minimum-spanning-trees.md)

