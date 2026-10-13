---
title: "L'algoritmo greedy generico"
---

# 2.4 L'algoritmo greedy generico { #sez-sec-mst-greedy }

<div class="info-capitolo" markdown>

**Parte 2 · Alberi e cammini · Capitolo 2** · [:material-book-open-variant: Capitolo 2: Alberi ricoprenti](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-alberi-e-cammini.pdf) · [:material-pencil: Esercizi: Alberi ricoprenti](../../esercizi/minimum-spanning-trees.md) · [:material-gesture-tap: App: Alberi ricoprenti minimi: Kruskal e Prim](../../laboratorio/albero-ricoprente-minimo-kruskal-prim.md)

</div>

- La proprietà cut suggerisce di costruire uno albero ricoprente minimo un lato alla volta: l'insieme corrente $F$ è sempre contenuto in un albero di copertura minimo e il lato successivo è il lato più leggero di un taglio non attraversato da $F$.

!!! algoritmo "Algoritmo: Algoritmo greedy generico per MST"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> un grafo connesso non orientato <span class="arithmatex">\(G=(V,E)\)</span> con pesi <span class="arithmatex">\(w_e\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> un albero di copertura minimo <span class="arithmatex">\(F\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Passaggio 0 (inizializzazione).</strong> Imposta <span class="arithmatex">\(F:=\emptyset\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">2</span><strong>Passaggio 1 (test di arresto).</strong> Se <span class="arithmatex">\(|F|=n-1\)</span>, <code>STOP</code>.</div><div class="pc" style="--liv:0"><span class="pc-n">3</span><strong>Passaggio 2 (aumento).</strong> Scegli un taglio <span class="arithmatex">\(\delta(S)\)</span> con <span class="arithmatex">\(F \cap \delta(S)=\emptyset\)</span> e aggiungi a <span class="arithmatex">\(F\)</span> un lato di
    peso minimo in <span class="arithmatex">\(\delta(S)\)</span>. Vai al passaggio 1.</div></div>

<a id="box-15-mst-th-greedy"></a>

!!! teorema "Teorema 2.9: correttezza dell'algoritmo greedy generico"

    Ad ogni iterazione dell'algoritmo greedy generico esiste un taglio come nel passaggio 2 che non è vuoto e $F$ è contenuto in un albero di copertura minimo. Alla fine, $F$ è un albero ricoprente minimo.

??? dimostrazione "Dimostrazione"

    Per induzione sulle iterazioni; $F=\emptyset$ è contenuto in ogni albero ricoprente minimo.

    1. Se $|F|<n-1$, il grafo $(V,F)$ è una foresta (un sottoinsieme di un albero) con componenti $n-|F| \ge 2$. Lascia che $S$ sia uno di essi: nessun lato di $F$ attraversa $\delta(S)$ e $\delta(S) \neq \emptyset$ perché $G$ è connesso.

    2. Per la proprietà di taglio (<span style="color:#1971c2">[Teorema 2.6](la-proprieta-di-taglio-e-la-proprieta-di-ciclo.md#box-9-mst-th-cut)</span>(a)), il nuovo insieme $F \cup \{e\}$ è ancora contenuto in un albero di copertura minimo.

    3. Quando $|F|=n-1$, $F$ è contenuto in uno albero ricoprente minimo $T^\star$ con lati $n-1$, quindi $F=T^\star$. <span class="qed">□</span>

- Il lato aggiunto $e=\{u,v\}$ ha $u \in S$ e $v \notin S$ e nessun lato di $F$ incrocia $\delta(S)$: $u$ e $v$ sono in diversi componenti di $(V,F)$, quindi $e$ non chiude un ciclo.

- Gli algoritmi di Kruskal e di Prim sono due modi per scegliere il taglio nello Step 2.

!!! chiave ""

    Aggiungendo, $n-1$ volte, il lato più leggero di un taglio non attraversato dai lati correnti costruisce un albero ricoprente minimo.

---

**Avanti:** [2.5 Algoritmo di Kruskal](algoritmo-di-kruskal.md)
