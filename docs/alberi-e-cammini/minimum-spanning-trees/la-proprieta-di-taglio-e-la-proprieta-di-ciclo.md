---
title: "La proprietà di taglio e la proprietà di ciclo"
---

# 2.3 La proprietà di taglio e la proprietà di ciclo { #sez-sec-mst-properties }

<div class="info-capitolo" markdown>

**Parte 2 · Alberi e cammini · Capitolo 2** · [:material-book-open-variant: Capitolo 2: Alberi ricoprenti](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-alberi-e-cammini.pdf) · [:material-pencil: Esercizi: Alberi ricoprenti](../../esercizi/minimum-spanning-trees.md) · [:material-gesture-tap: App: Alberi ricoprenti minimi: Kruskal e Prim](../../laboratorio/albero-ricoprente-minimo-kruskal-prim.md)

</div>

<a id="box-9-mst-th-cut"></a>

!!! teorema "Teorema 2.6: proprietà taglio"

    Sia $G=(V,E)$ un grafo connesso con pesi $w_e$, e sia $F \subseteq E$ contenuto in qualche minimo albero di copertura. Sia $\delta(S)$ un taglio con $F \cap \delta(S)=\emptyset$ e sia $e$ un lato di peso minimo in $\delta(S)$.

    - **(a)** $F \cup \{e\}$ è contenuto in uno albero ricoprente minimo.

    - **(b)** Se $w_e<w_f$ per ogni $f \in \delta(S) \setminus \{e\}$, allora $e$ appartiene a ogni albero ricoprente minimo.

??? dimostrazione "Dimostrazione"

    Sia $T^\star$ un albero ricoprente minimo con $F \subseteq T^\star$; per (b), sia $T^\star$ qualsiasi albero di copertura minimo e $F=\emptyset$. Se $e \in T^\star$ non c'è nulla da dimostrare; lascia che $e \notin T^\star$.

    1. Il ciclo fondamentale $C(T^\star,e)$ contiene il lato $e$ di $\delta(S)$, quindi contiene un altro lato $f \in \delta(S)$, $f \neq e$ (<span style="color:#1971c2">[Lemma 2.3](tagli-e-cicli.md#box-5-mst-lem-even)</span>). Tutti i lati diversi da $e$ sono presenti $T^\star$, quindi $f \in T^\star$; e $f \notin F$, da $F \cap \delta(S)=\emptyset$.

    2. Di <span style="color:#1971c2">[Lemma 2.5](tagli-e-cicli.md#box-7-mst-lem-exchange)</span>, $T'=T^\star \cup \{e\} \setminus \{f\}$ è uno albero ricoprente, con $w(T')=w(T^\star)+w_e-w_f$.

    3. (a) $e$ ha un peso minimo in $\delta(S)$, quindi $w_e \le w_f$ e $w(T') \le w(T^\star)$: $T'$ è un peso minimo albero ricoprente contenente $F \cup \{e\}$.

    4. (b) Qui $w_e<w_f$ e $w(T')<w(T^\star)$, contro l'ottimalità di $T^\star$: quindi $e \in T^\star$. <span class="qed">□</span>

<a id="box-10-mst-th-cycle"></a>

!!! teorema "Teorema 2.7: proprietà ciclo"

    Sia $G=(V,E)$ un grafo connesso con pesi $w_e$, sia $C$ un ciclo di $G$ e $e$ un arco di peso massimo in $C$.

    - **(a)** Alcuni albero ricoprente minimi non contengono $e$.

    - **(b)** Se $w_e>w_f$ per ogni $f \in C \setminus \{e\}$, allora nessun albero ricoprente minimo contiene $e$.

??? dimostrazione "Dimostrazione"

    Sia $T^\star$ un albero di copertura minimo con $e \in T^\star$ (se non ce n'è, valgono entrambe le affermazioni) e sia $\delta(S_e)$ è il taglio fondamentale di $e$ in $T^\star$.

    1. Il ciclo $C$ contiene il lato $e$ di $\delta(S_e)$, quindi contiene un altro lato $f \in \delta(S_e)$ (<span style="color:#1971c2">[Lemma 2.3](tagli-e-cicli.md#box-5-mst-lem-even)</span>); $f \notin T^\star$, poiché $e$ è l'unico lato di $T^\star$ nella sua taglio fondamentale.

    2. Da <span style="color:#1971c2">[Lemma 2.5](tagli-e-cicli.md#box-7-mst-lem-exchange)</span>(2), $T'=T^\star \cup \{f\} \setminus \{e\}$ è una copertura albero, con $w(T')=w(T^\star)+w_f-w_e$.

    3. (a) $w_f \le w_e$, quindi $T'$ è un albero ricoprente minimo senza $e$. (b) $w_f<w_e$ darebbe $w(T')<w(T^\star)$, una contraddizione: nessun albero ricoprente minimo contiene $e$. <span class="qed">□</span>

<a id="box-11-mst-ex-properties"></a>

!!! esempio "Esempio 2.4: le due proprietà sul grafo di riferimento"

    - <em>Proprietà di taglio.</em> Il lato $\{3,4\}$, di peso $5$, è l'unico lato più leggero di $\delta(\{1,2,3\})=\{\{2,4\},\{3,4\},\{3,5\}\}$, con pesi $6,5,8$: appartiene ad ogni albero di copertura minimo. Allo stesso modo, $\{5,6\}$ è l'esclusivo lato più leggero di $\delta(\{6\})$.

    - <em>Proprietà del ciclo.</em> Il lato $\{1,2\}$ è l'unico lato più pesante del ciclo $1,2,3$ (pesi $4,3,1$), e $\{3,5\}$ è l'unico lato più pesante del ciclo $3,4,5$ (pesi $5,2,8$): non contiene alcun albero di copertura minimo loro. I cicli $2,3,4$ e $4,5,6$ escludono $\{2,4\}$ e $\{4,6\}$.

    - I quattro lati esclusi lasciano esattamente i lati $5$ di $\tilde{F}$: le sole due proprietà lo dimostrano $\tilde{F}$ è l'unico albero di copertura minimo.

## 2.3.1 Condizioni di ottimalità

<a id="box-12-mst-th-optimality"></a>

!!! teorema "Teorema 2.8: condizioni di ottimalità"

    Sia $T$ un albero ricoprente di un grafo connesso $G=(V,E)$ con pesi $w_e$. Le seguenti dichiarazioni sono equivalente:

    - **(i)** $T$ è uno albero ricoprente minimo;

    - **(ii)** <strong>condizione ciclo</strong>: per ogni $e \notin T$, $w_e \ge w_f$ per ogni lato $f$ di $C(T,e)$;

    - **(iii)** <strong>condizione di taglio</strong>: per ogni $e \in T$, $w_e \le w_f$ per ogni lato $f$ del taglio fondamentale di $e$.

??? dimostrazione "Dimostrazione"

    Dimostriamo (i)$\Rightarrow$(iii)$\Rightarrow$(ii)$\Rightarrow$(i).

    - <strong>(i)$\Rightarrow$(iii).</strong> Se $f$ incrocia il taglio fondamentale di $e \in T$ con $w_f<w_e$, allora $T \cup \{f\} \setminus \{e\}$ è uno albero ricoprente (<span style="color:#1971c2">[Lemma 2.5](tagli-e-cicli.md#box-7-mst-lem-exchange)</span>(2)) più leggero di $T$.

    - <strong>(iii)$\Rightarrow$(ii).</strong> Lascia che $e \notin T$ e $f \in C(T,e)$, $f \neq e$. Il percorso di $T$ tra i gli endpoint di $e$ utilizzano $f$ ed è unico, quindi la rimozione di $f$ li separa: $e$ attraversa il taglio fondamentale di $f$, e $w_f \le w_e$ da (iii).

    <strong>(ii)$\Rightarrow$(i).</strong> Tra gli albero ricoprente minimi, sia $T^\star$ ad avere il maggior numero di archi in comune con $T$ e presuppone $T^\star \neq T$.

    1. Prendi $e \in T^\star \setminus T$ e lascia che $\delta(S_e)$ sia il suo taglio fondamentale in $T^\star$. Il ciclo $C(T,e)$ contiene $e$, quindi contiene un altro lato $f \in \delta(S_e)$ (<span style="color:#1971c2">[Lemma 2.3](tagli-e-cicli.md#box-5-mst-lem-even)</span>), con $f \in T$ e $f \notin T^\star$.

    2. Di <span style="color:#1971c2">[Lemma 2.5](tagli-e-cicli.md#box-7-mst-lem-exchange)</span>(2), $T'=T^\star \cup \{f\} \setminus \{e\}$ è una copertura albero e $w_f \le w_e$ mediante (ii) applicato a $e \notin T$. Quindi $w(T') \le w(T^\star)$.

    3. $T'$ è un albero ricoprente minimo con un lato in più in comune con $T$: una contraddizione. Quindi $T=T^\star$. <span class="qed">□</span>

<a id="box-13-mst-ex-certificate"></a>

!!! esempio "Esempio 2.5: certificare l'albero ottimale"

    Per l'albero $\tilde{F}$ di <span style="color:#1971c2">[Esempio 2.2](il-problema-dell-albero-di-copertura-minimo.md#box-3-mst-ex-opt)</span>, i quattro lati esterni all'albero e la loro fondamentale i cicli sono:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>lato <span class="arithmatex">\(e \notin \tilde{F}\)</span></th>
    <th><span class="arithmatex">\(C(\tilde{F},e)\)</span></th>
    <th>pesi dei lati dell'albero del ciclo</th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\{1,2\}\)</span>, <span class="arithmatex">\(w=4\)</span></td>
    <td><span class="arithmatex">\(1,3,2,1\)</span></td>
    <td><span class="arithmatex">\(1,~3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\{2,4\}\)</span>, <span class="arithmatex">\(w=6\)</span></td>
    <td><span class="arithmatex">\(2,3,4,2\)</span></td>
    <td><span class="arithmatex">\(3,~5\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\{3,5\}\)</span>, <span class="arithmatex">\(w=8\)</span></td>
    <td><span class="arithmatex">\(3,4,5,3\)</span></td>
    <td><span class="arithmatex">\(5,~2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\{4,6\}\)</span>, <span class="arithmatex">\(w=9\)</span></td>
    <td><span class="arithmatex">\(4,5,6,4\)</span></td>
    <td><span class="arithmatex">\(2,~7\)</span></td>
    </tr>
    </table></div>

    Ogni lato esterno all'albero è pesante almeno quanto i lati dell'albero del suo ciclo: di <span style="color:#1971c2">[Teorema 2.8](#box-12-mst-th-optimality)</span> l'albero è ottimale, senza enumerare gli albero ricoprente $55$.

<a id="box-14-mst-ex-improve"></a>

!!! esempio "Esempio 2.6: migliorare un albero che non è ottimale"

    L'albero BFS $T=\{\{1,2\},\{1,3\},\{2,4\},\{3,5\},\{4,6\}\}$, di peso $28$, viola la condizione del ciclo. Per $e=\{4,5\}$, di peso $2$, il ciclo fondamentale $4,2,1,3,5,4$ contiene $\{2,4\}$, $\{1,2\}$ e $\{3,5\}$, di pesi $6,4,8$.

    - Rimuovendo il più pesante, $\{3,5\}$, e aggiungendo $\{4,5\}$ si ottiene un albero portante del peso $28+2-8=22$.

    - La dimostrazione di <span style="color:#1971c2">[Teorema 2.8](#box-12-mst-th-optimality)</span> si trasforma in un algoritmo: ripetere lo scambio mentre un lato viola la condizione. Gli algoritmi delle sezioni successive sono più veloci.

!!! chiave ""

    Il lato più leggero di un taglio appartiene a un albero di copertura minimo e il lato più pesante di un ciclo può essere lasciato fuori. Un albero di copertura è ottimale se e solo se ogni arco esterno ad esso è il più pesante del suo ciclo fondamentale.

---

**Avanti:** [2.4 L'algoritmo greedy generico](l-algoritmo-greedy-generico.md)
