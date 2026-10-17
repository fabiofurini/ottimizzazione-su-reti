---
title: "La proprietà del taglio e la proprietà del ciclo"
---

# 2.3 La proprietà del taglio e la proprietà del ciclo { #sez-sec-mst-properties }

<div class="info-capitolo" markdown>

**Parte 2 · Alberi e cammini · Capitolo 2** · [:material-book-open-variant: Capitolo 2: Alberi ricoprenti](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-alberi-e-cammini.pdf) · [:material-presentation: Slide](../../pdf/slide-minimum-spanning-trees.pdf) · [:material-pencil: Esercizi: Alberi ricoprenti](../../esercizi/minimum-spanning-trees.md) · [:material-gesture-tap: App: Alberi ricoprenti minimi: Kruskal e Prim](../../laboratorio/albero-ricoprente-minimo-kruskal-prim.md)

</div>

<a id="box-9-mst-th-cut"></a>

!!! teorema "Teorema 2.6: proprietà del taglio"

    Sia $G=(V,E)$ un grafo connesso con pesi $w_e$, e sia $F \subseteq E$ contenuto in qualche albero ricoprente di costo minimo. Sia $\delta(S)$ un taglio con $F \cap \delta(S)=\emptyset$, e sia $e$ uno spigolo di peso minimo in $\delta(S)$.

    - **(a)** $F \cup \{e\}$ è contenuto in qualche albero ricoprente di costo minimo.

    - **(b)** Se $w_e<w_f$ per ogni $f \in \delta(S) \setminus \{e\}$, allora $e$ appartiene a ogni albero ricoprente di costo minimo.

??? dimostrazione "Dimostrazione"

    Sia $T^\star$ un albero ricoprente di costo minimo con $F \subseteq T^\star$; per (b), sia $T^\star$ un qualsiasi albero ricoprente di costo minimo e $F=\emptyset$. Se $e \in T^\star$ non c'è niente da dimostrare; sia $e \notin T^\star$.

    1. Il ciclo fondamentale $C(T^\star,e)$ contiene lo spigolo $e$ di $\delta(S)$, quindi contiene un altro spigolo $f \in \delta(S)$, $f \neq e$ (<span style="color:#1971c2">[Lemma 2.3](tagli-e-cicli.md#box-5-mst-lem-even)</span>). Tutti i suoi spigoli diversi da $e$ stanno in $T^\star$, quindi $f \in T^\star$; e $f \notin F$, perché $F \cap \delta(S)=\emptyset$.

    2. Per il <span style="color:#1971c2">[Lemma 2.5](tagli-e-cicli.md#box-7-mst-lem-exchange)</span>, $T'=T^\star \cup \{e\} \setminus \{f\}$ è un albero ricoprente, con $w(T')=w(T^\star)+w_e-w_f$.

    3. (a) $e$ ha peso minimo in $\delta(S)$, quindi $w_e \le w_f$ e $w(T') \le w(T^\star)$: $T'$ è un albero ricoprente di costo minimo che contiene $F \cup \{e\}$.

    4. (b) Qui $w_e<w_f$ e $w(T')<w(T^\star)$, contro l'ottimalità di $T^\star$: quindi $e \in T^\star$. <span class="qed">□</span>

<a id="box-10-mst-th-cycle"></a>

!!! teorema "Teorema 2.7: proprietà del ciclo"

    Sia $G=(V,E)$ un grafo connesso con pesi $w_e$, sia $C$ un ciclo di $G$ ed $e$ uno spigolo di peso massimo in $C$.

    - **(a)** Qualche albero ricoprente di costo minimo non contiene $e$.

    - **(b)** Se $w_e>w_f$ per ogni $f \in C \setminus \{e\}$, allora nessun albero ricoprente di costo minimo contiene $e$.

??? dimostrazione "Dimostrazione"

    Sia $T^\star$ un albero ricoprente di costo minimo con $e \in T^\star$ (se non ce n'è nessuno, entrambe le affermazioni valgono), e sia $\delta(S_e)$ il taglio fondamentale di $e$ in $T^\star$.

    1. Il ciclo $C$ contiene lo spigolo $e$ di $\delta(S_e)$, quindi contiene un altro spigolo $f \in \delta(S_e)$ (<span style="color:#1971c2">[Lemma 2.3](tagli-e-cicli.md#box-5-mst-lem-even)</span>); $f \notin T^\star$, perché $e$ è l'unico spigolo di $T^\star$ nel suo taglio fondamentale.

    2. Per il <span style="color:#1971c2">[Lemma 2.5](tagli-e-cicli.md#box-7-mst-lem-exchange)</span>(2), $T'=T^\star \cup \{f\} \setminus \{e\}$ è un albero ricoprente, con $w(T')=w(T^\star)+w_f-w_e$.

    3. (a) $w_f \le w_e$, quindi $T'$ è un albero ricoprente di costo minimo senza $e$. (b) $w_f<w_e$ darebbe $w(T')<w(T^\star)$, una contraddizione: nessun albero ricoprente di costo minimo contiene $e$. <span class="qed">□</span>

<a id="box-11-mst-ex-properties"></a>

!!! esempio "Esempio 2.4: le due proprietà sul grafo di riferimento"

    - <em>Proprietà del taglio.</em> Lo spigolo $\{3,4\}$, di peso $5$, è l'unico spigolo più leggero di $\delta(\{1,2,3\})=\{\{2,4\},\{3,4\},\{3,5\}\}$, con pesi $6,5,8$: appartiene a ogni albero ricoprente di costo minimo. Allo stesso modo, $\{5,6\}$ è l'unico spigolo più leggero di $\delta(\{6\})$.

    - <em>Proprietà del ciclo.</em> Lo spigolo $\{1,2\}$ è l'unico spigolo più pesante del ciclo $1,2,3$ (pesi $4,3,1$), e $\{3,5\}$ è l'unico spigolo più pesante del ciclo $3,4,5$ (pesi $5,2,8$): nessun albero ricoprente di costo minimo li contiene. I cicli $2,3,4$ e $4,5,6$ escludono $\{2,4\}$ e $\{4,6\}$.

    - I quattro spigoli esclusi lasciano esattamente i $5$ spigoli di $\tilde{F}$: le due proprietà da sole dimostrano che $\tilde{F}$ è l'unico albero ricoprente di costo minimo.

## 2.3.1 Condizioni di ottimalità

<a id="box-12-mst-th-optimality"></a>

!!! teorema "Teorema 2.8: condizioni di ottimalità"

    Sia $T$ un albero ricoprente di un grafo connesso $G=(V,E)$ con pesi $w_e$. Le seguenti affermazioni sono equivalenti:

    - **(i)** $T$ è un albero ricoprente di costo minimo;

    - **(ii)** <strong>condizione del ciclo</strong>: per ogni $e \notin T$, $w_e \ge w_f$ per ogni spigolo $f$ di $C(T,e)$;

    - **(iii)** <strong>condizione del taglio</strong>: per ogni $e \in T$, $w_e \le w_f$ per ogni spigolo $f$ del taglio fondamentale di $e$.

??? dimostrazione "Dimostrazione"

    Dimostriamo (i)$\Rightarrow$(iii)$\Rightarrow$(ii)$\Rightarrow$(i).

    - <strong>(i)$\Rightarrow$(iii).</strong> Se $f$ attraversa il taglio fondamentale di $e \in T$ con $w_f<w_e$, allora $T \cup \{f\} \setminus \{e\}$ è un albero ricoprente (<span style="color:#1971c2">[Lemma 2.5](tagli-e-cicli.md#box-7-mst-lem-exchange)</span>(2)) più leggero di $T$.

    - <strong>(iii)$\Rightarrow$(ii).</strong> Siano $e \notin T$ e $f \in C(T,e)$, $f \neq e$. Il cammino di $T$ fra gli estremi di $e$ usa $f$, ed è unico, quindi togliere $f$ li separa: $e$ attraversa il taglio fondamentale di $f$, e $w_f \le w_e$ per (iii).

    <strong>(ii)$\Rightarrow$(i).</strong> Fra gli alberi ricoprenti di costo minimo, sia $T^\star$ uno con il massimo numero di spigoli in comune con $T$, e supponiamo $T^\star \neq T$.

    1. Prendiamo $e \in T^\star \setminus T$, e sia $\delta(S_e)$ il suo taglio fondamentale in $T^\star$. Il ciclo $C(T,e)$ contiene $e$, quindi contiene un altro spigolo $f \in \delta(S_e)$ (<span style="color:#1971c2">[Lemma 2.3](tagli-e-cicli.md#box-5-mst-lem-even)</span>), con $f \in T$ e $f \notin T^\star$.

    2. Per il <span style="color:#1971c2">[Lemma 2.5](tagli-e-cicli.md#box-7-mst-lem-exchange)</span>(2), $T'=T^\star \cup \{f\} \setminus \{e\}$ è un albero ricoprente, e $w_f \le w_e$ per (ii) applicata a $e \notin T$. Quindi $w(T') \le w(T^\star)$.

    3. $T'$ è un albero ricoprente di costo minimo con uno spigolo in più in comune con $T$: una contraddizione. Quindi $T=T^\star$. <span class="qed">□</span>

<a id="box-13-mst-ex-certificate"></a>

!!! esempio "Esempio 2.5: certificare l'albero ottimo"

    Per l'albero $\tilde{F}$ dell'<span style="color:#1971c2">[Esempio 2.2](il-problema-dell-albero-ricoprente-di-costo-minimo.md#box-3-mst-ex-opt)</span>, i quattro spigoli fuori dall'albero e i loro cicli fondamentali sono:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>spigolo <span class="arithmatex">\(e \notin \tilde{F}\)</span></th>
    <th><span class="arithmatex">\(C(\tilde{F},e)\)</span></th>
    <th>pesi degli spigoli dell'albero nel ciclo</th>
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

    Ogni spigolo fuori dall'albero è pesante almeno quanto gli spigoli dell'albero del suo ciclo: per il <span style="color:#1971c2">[Teorema 2.8](#box-12-mst-th-optimality)</span> l'albero è ottimo, senza enumerare i $55$ alberi ricoprenti.

<a id="box-14-mst-ex-improve"></a>

!!! esempio "Esempio 2.6: migliorare un albero che non è ottimo"

    L'albero della visita in ampiezza $T=\{\{1,2\},\{1,3\},\{2,4\},\{3,5\},\{4,6\}\}$, di peso $28$, viola la condizione del ciclo. Per $e=\{4,5\}$, di peso $2$, il ciclo fondamentale $4,2,1,3,5,4$ contiene $\{2,4\}$, $\{1,2\}$ e $\{3,5\}$, di pesi $6,4,8$.

    - Togliendo il più pesante dei tre, $\{3,5\}$, e aggiungendo $\{4,5\}$ si ottiene un albero ricoprente di peso $28+2-8=22$.

    - La dimostrazione del <span style="color:#1971c2">[Teorema 2.8](#box-12-mst-th-optimality)</span> diventa un algoritmo: ripetere lo scambio finché uno spigolo viola la condizione. Gli algoritmi delle prossime sezioni sono più veloci.

!!! chiave ""

    Lo spigolo più leggero di un taglio appartiene a qualche albero ricoprente di costo minimo, e lo spigolo più pesante di un ciclo si può lasciare fuori. Un albero ricoprente è ottimo se e solo se ogni spigolo fuori dall'albero è il più pesante del suo ciclo fondamentale.

---

**Avanti:** [2.4 L'algoritmo greedy generico](l-algoritmo-greedy-generico.md)
