---
title: "L'algoritmo greedy generico"
---

# 2.4 L'algoritmo greedy generico { #sez-sec-mst-greedy }

<div class="info-capitolo" markdown>

**Parte 2 · Alberi e cammini · Capitolo 2** · [:material-book-open-variant: Capitolo 2: Alberi ricoprenti](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-alberi-e-cammini.pdf) · [:material-presentation: Slide](../../pdf/slide-minimum-spanning-trees.pdf) · [:material-pencil: Esercizi: Alberi ricoprenti](../../esercizi/minimum-spanning-trees.md) · [:material-gesture-tap: App: Alberi ricoprenti minimi: Kruskal e Prim](../../laboratorio/albero-ricoprente-minimo-kruskal-prim.md)

</div>

- La proprietà del taglio suggerisce di costruire un albero ricoprente di costo minimo uno spigolo alla volta: l'insieme corrente $F$ è sempre contenuto in qualche albero ricoprente di costo minimo, e lo spigolo successivo è il più leggero di un taglio non attraversato da $F$.

!!! algoritmo "Algoritmo: Algoritmo greedy generico per l'MST"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> un grafo non orientato connesso <span class="arithmatex">\(G=(V,E)\)</span> con pesi <span class="arithmatex">\(w_e\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> un albero ricoprente di costo minimo <span class="arithmatex">\(F\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Passo 0 (inizializzazione).</strong> Porre <span class="arithmatex">\(F:=\emptyset\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">2</span><strong>Passo 1 (test di arresto).</strong> Se <span class="arithmatex">\(|F|=n-1\)</span>, <code>STOP</code>.</div><div class="pc" style="--liv:0"><span class="pc-n">3</span><strong>Passo 2 (aumento).</strong> Scegliere un taglio <span class="arithmatex">\(\delta(S)\)</span> con <span class="arithmatex">\(F \cap \delta(S)=\emptyset\)</span>, e aggiungere a <span class="arithmatex">\(F\)</span> uno spigolo
    di peso minimo in <span class="arithmatex">\(\delta(S)\)</span>. Andare al Passo 1.</div></div>

<a id="box-15-mst-th-greedy"></a>

!!! teorema "Teorema 2.9: correttezza dell'algoritmo greedy generico"

    A ogni iterazione dell'algoritmo greedy generico esiste un taglio non vuoto come nel Passo 2, e $F$ è contenuto in qualche albero ricoprente di costo minimo. Alla fine, $F$ è un albero ricoprente di costo minimo.

??? dimostrazione "Dimostrazione"

    Per induzione sulle iterazioni; $F=\emptyset$ è contenuto in ogni albero ricoprente di costo minimo.

    1. Se $|F|<n-1$, il grafo $(V,F)$ è una foresta (un sottoinsieme di un albero) con $n-|F| \ge 2$ componenti. Sia $S$ una di esse: nessuno spigolo di $F$ attraversa $\delta(S)$, e $\delta(S) \neq \emptyset$ perché $G$ è connesso.

    2. Per la proprietà del taglio (<span style="color:#1971c2">[Teorema 2.6](la-proprieta-del-taglio-e-la-proprieta-del-ciclo.md#box-9-mst-th-cut)</span>(a)), il nuovo insieme $F \cup \{e\}$ è ancora contenuto in qualche albero ricoprente di costo minimo.

    3. Quando $|F|=n-1$, $F$ è contenuto in un albero ricoprente di costo minimo $T^\star$ con $n-1$ spigoli, quindi $F=T^\star$. <span class="qed">□</span>

- Lo spigolo aggiunto $e=\{u,v\}$ ha $u \in S$ e $v \notin S$, e nessuno spigolo di $F$ attraversa $\delta(S)$: $u$ e $v$ stanno in componenti diverse di $(V,F)$, quindi $e$ non chiude un ciclo.

- Gli algoritmi di Kruskal e di Prim sono due modi di scegliere il taglio nel Passo 2.

!!! chiave ""

    Aggiungendo $n-1$ volte lo spigolo più leggero di un taglio non attraversato dagli spigoli correnti si costruisce un albero ricoprente di costo minimo.

---

**Avanti:** [2.5 Algoritmo di Kruskal](algoritmo-di-kruskal.md)
