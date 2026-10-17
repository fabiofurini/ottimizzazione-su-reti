---
title: "Il problema dell'albero ricoprente di costo minimo"
---

# 2.1 Il problema dell'albero ricoprente di costo minimo { #sez-sec-mst-problem }

<div class="info-capitolo" markdown>

**Parte 2 · Alberi e cammini · Capitolo 2** · [:material-book-open-variant: Capitolo 2: Alberi ricoprenti](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-alberi-e-cammini.pdf) · [:material-presentation: Slide](../../pdf/slide-minimum-spanning-trees.pdf) · [:material-pencil: Esercizi: Alberi ricoprenti](../../esercizi/minimum-spanning-trees.md) · [:material-gesture-tap: App: Alberi ricoprenti minimi: Kruskal e Prim](../../laboratorio/albero-ricoprente-minimo-kruskal-prim.md)

</div>

<a id="box-1-mst-def-mst"></a>

!!! definizione "Definizione 2.1: problema dell'albero ricoprente di costo minimo"

    Sia $G=(V,E)$ un grafo non orientato connesso con $n=|V|$ vertici e $m=|E|$ spigoli, e sia associato a ogni spigolo $e \in E$ un <strong>peso</strong> $w_e \in \R$. Il <strong>peso</strong> di un insieme di spigoli $F \subseteq E$ è

    $$
    w(F)=\sum_{e \in F} w_e .
    $$

    Il <strong>problema dell'albero ricoprente di costo minimo</strong> (MST) chiede un albero ricoprente $\tilde{T}=(V,\tilde{F})$ di $G$ di peso minimo:

    $$
    w(\tilde{F}) \le w(F) \qquad \text{per ogni albero ricoprente } (V,F) \text{ di } G .
    $$

    Un albero ricoprente di peso minimo è un <strong>albero ricoprente di costo minimo</strong>. Scriviamo $w_{uv}$ per il peso dello spigolo $\{u,v\}$, e identifichiamo un albero ricoprente con il suo insieme di spigoli.

- Un grafo connesso ha almeno un albero ricoprente, e ne ha un numero finito: un albero ricoprente di costo minimo esiste sempre. Ogni albero ricoprente ha $n-1$ spigoli.

- I pesi possono essere negativi. Aggiungere la stessa costante a ogni peso aggiunge $(n-1)$ volte quella costante al peso di ogni albero ricoprente, quindi gli alberi ricoprenti di costo minimo non cambiano.

- Un <strong>albero ricoprente di costo massimo</strong> è un albero ricoprente di costo minimo per i pesi $-w_e$.

<a id="box-2-mst-ex-ref"></a>

!!! esempio "Esempio 2.1: il grafo di riferimento pesato"

    Prendiamo il grafo non orientato soggiacente al grafo di riferimento del capitolo [«Grafi»](../../grafi/graphs/index.md), con $n=6$ vertici, $m=9$ spigoli e i pesi

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>spigolo</th>
    <th><span class="arithmatex">\(\{1,2\}\)</span></th>
    <th><span class="arithmatex">\(\{1,3\}\)</span></th>
    <th><span class="arithmatex">\(\{2,3\}\)</span></th>
    <th><span class="arithmatex">\(\{2,4\}\)</span></th>
    <th><span class="arithmatex">\(\{3,4\}\)</span></th>
    <th><span class="arithmatex">\(\{3,5\}\)</span></th>
    <th><span class="arithmatex">\(\{4,5\}\)</span></th>
    <th><span class="arithmatex">\(\{4,6\}\)</span></th>
    <th><span class="arithmatex">\(\{5,6\}\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(w_e\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(8\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(9\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    </tr>
    </table></div>

    ![Figura 1](../../img/minimum-spanning-trees/fig01.svg){ .fig loading=lazy  }

    Chiamiamo questo grafo <strong>grafo di riferimento pesato</strong>: tutti gli esempi del capitolo lo usano. I pesi sono gli interi distinti $1,2,\dots,9$.

<a id="box-3-mst-ex-opt"></a>

!!! esempio "Esempio 2.2: l'albero ricoprente di costo minimo del grafo di riferimento"

    Il grafo di riferimento pesato ha $55$ alberi ricoprenti. Enumerandoli tutti, il peso minimo è $18$, raggiunto soltanto dall'albero (in blu nella figura)

    $$
    \tilde{F}=\big\{\{1,3\},\{2,3\},\{3,4\},\{4,5\},\{5,6\}\big\}, \qquad w(\tilde{F})=1+3+5+2+7=18 .
    $$

    ![Figura 2](../../img/minimum-spanning-trees/fig02.svg){ .fig loading=lazy  }

    L'albero ricoprente $\{1,2\},\{1,3\},\{2,4\},\{3,5\},\{4,6\}$ trovato dalla visita in ampiezza nel capitolo [«Grafi»](../../grafi/graphs/index.md) pesa $4+1+6+8+9=28$, e un albero ricoprente di costo massimo pesa $34$.

- Enumerare gli alberi ricoprenti è praticabile solo su grafi piccolissimi: il grafo di riferimento, con $6$ vertici e $9$ spigoli, ne ha già $55$. Gli algoritmi di questo capitolo trovano un albero ricoprente di costo minimo in tempo polinomiale.

## 2.1.1 Applicazioni

- <strong>Progettazione di reti.</strong> I vertici sono siti (uffici, case, stabilimenti) e $w_{uv}$ è il costo di un collegamento diretto (un cavo, un tubo, una strada); la rete più economica che collega tutti i siti è un albero ricoprente di costo minimo.

- <strong>Clustering.</strong> Togliendo i $k-1$ spigoli più pesanti di un albero ricoprente di costo minimo, i vertici si dividono in $k$ gruppi di punti vicini (clustering a collegamento singolo).

- <strong>Sottoproblema.</strong> Gli alberi ricoprenti di costo minimo danno lower bound per il problema del commesso viaggiatore e un punto di partenza per algoritmi euristici di progettazione di reti.

!!! chiave ""

    Un albero ricoprente di costo minimo collega tutti i vertici di un grafo pesato connesso con $n-1$ spigoli di peso totale minimo; sul grafo di riferimento pesato è unico e pesa $18$.

---

**Avanti:** [2.2 Tagli e cicli](tagli-e-cicli.md)
