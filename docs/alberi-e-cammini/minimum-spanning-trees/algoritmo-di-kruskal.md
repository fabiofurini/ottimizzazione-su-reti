---
title: "Algoritmo di Kruskal"
---

# 2.5 Algoritmo di Kruskal { #sez-sec-mst-kruskal }

<div class="info-capitolo" markdown>

**Parte 2 · Alberi e cammini · Capitolo 2** · [:material-book-open-variant: Capitolo 2: Alberi ricoprenti](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-alberi-e-cammini.pdf) · [:material-presentation: Slide](../../pdf/slide-minimum-spanning-trees.pdf) · [:material-pencil: Esercizi: Alberi ricoprenti](../../esercizi/minimum-spanning-trees.md) · [:material-gesture-tap: App: Alberi ricoprenti minimi: Kruskal e Prim](../../laboratorio/albero-ricoprente-minimo-kruskal-prim.md)

</div>

!!! algoritmo "Algoritmo: Algoritmo di Kruskal"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> un grafo non orientato connesso <span class="arithmatex">\(G=(V,E)\)</span> con pesi <span class="arithmatex">\(w_e\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> un albero ricoprente di costo minimo <span class="arithmatex">\(F\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Passo 0 (inizializzazione).</strong> Ordinare gli spigoli per peso non decrescente, <span class="arithmatex">\(w_{e_1} \le w_{e_2} \le \dots \le w_{e_m}\)</span>, e porre <span class="arithmatex">\(F:=\emptyset\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">2</span><strong>Passo 1 (scansione).</strong> Per <span class="arithmatex">\(k=1,2,\dots,m\)</span>: se gli estremi di <span class="arithmatex">\(e_k\)</span> stanno in componenti diverse di <span class="arithmatex">\((V,F)\)</span>, porre
    <span class="arithmatex">\(F:=F \cup \{e_k\}\)</span>; altrimenti rifiutare <span class="arithmatex">\(e_k\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">3</span>  Se <span class="arithmatex">\(|F|=n-1\)</span>, <code>STOP</code>.</div></div>

- Uno spigolo è <strong>accettato</strong> se unisce due componenti diverse di $(V,F)$, e <strong>rifiutato</strong> se chiuderebbe un ciclo. Le componenti di $(V,F)$ partono come gli $n$ vertici isolati e si fondono a ogni accettazione.

- In questo modulo, gli spigoli di peso uguale si esaminano in ordine lessicografico di $\{u,v\}$, con $u<v$.

<a id="box-16-mst-th-kruskal"></a>

!!! teorema "Teorema 2.10: correttezza dell'algoritmo di Kruskal"

    L'algoritmo di Kruskal si ferma con $|F|=n-1$, e $F$ è un albero ricoprente di costo minimo.

??? dimostrazione "Dimostrazione"

    Mostriamo che ogni spigolo accettato $e_k=\{u,v\}$ è una scelta del Passo 2 dell'algoritmo greedy generico. Sia $S$ la componente di $(V,F)$ che contiene $u$, subito prima che $e_k$ sia accettato: $v \notin S$, e nessuno spigolo di $F$ attraversa $\delta(S)$.

    1. Sia $e_h \in \delta(S)$ con $h<k$. Quando $e_h$ è stato esaminato non è stato accettato, perché $F \cap \delta(S)=\emptyset$; quindi i suoi estremi stavano allora nella stessa componente, e ci stanno ancora, perché le componenti si fondono soltanto. Questo contraddice $e_h \in \delta(S)$.

    2. Quindi ogni spigolo di $\delta(S)$ è un $e_h$ con $h \ge k$, e $w_{e_h} \ge w_{e_k}$: $e_k$ ha peso minimo in $\delta(S)$.

    3. Se la scansione terminasse con $|F|<n-1$, la foresta $(V,F)$ avrebbe due componenti unite da uno spigolo di $G$, e quello spigolo sarebbe stato accettato quando è stato esaminato, per l'argomento del punto 1.

    Per il <span style="color:#1971c2">[Teorema 2.9](l-algoritmo-greedy-generico.md#box-15-mst-th-greedy)</span>, $F$ è un albero ricoprente di costo minimo. <span class="qed">□</span>

## 2.5.1 Implementazione e tempo di esecuzione

- Le componenti di $(V,F)$ sono mantenute in una struttura <strong>union–find</strong>: ogni vertice $v$ memorizza l'etichetta $\mathit{comp}(v)$ della sua componente, e ogni componente memorizza la lista dei suoi vertici e la sua dimensione.

- Verificare se $u$ e $v$ stanno in componenti diverse è il confronto $\mathit{comp}(u) \neq \mathit{comp}(v)$, in tempo $O(1)$. Fondere due componenti rietichetta i vertici della <em>più piccola</em> (<strong>unione per dimensione</strong>).

<a id="box-17-mst-th-kruskal-time"></a>

!!! teorema "Teorema 2.11: tempo di esecuzione dell'algoritmo di Kruskal"

    Con la struttura union–find per etichette e l'unione per dimensione, l'algoritmo di Kruskal richiede tempo $O(m\log n)$.

??? dimostrazione "Dimostrazione"

    1. Ordinare gli spigoli richiede tempo $O(m\log m)$; poiché $m \le n^2$, $\log m \le 2\log n$ e questo è $O(m\log n)$.

    2. La scansione esegue $m$ test, ciascuno in tempo $O(1)$.

    3. Quando un vertice viene rietichettato, la sua componente si fonde con una almeno altrettanto grande, quindi la dimensione della sua componente almeno raddoppia. La dimensione non supera mai $n$, quindi ogni vertice viene rietichettato al più $\log_2 n$ volte: tutte le fusioni richiedono tempo $O(n\log n)$.

    $G$ è connesso, quindi $n-1 \le m$, e il totale è $O(m\log n+n\log n)=O(m\log n)$. <span class="qed">□</span>

- Il tempo di esecuzione è dominato dall'ordinamento. Con la struttura union–find ad alberi, con unione per rango e compressione dei cammini, la scansione richiede un tempo quasi lineare; il limite resta $O(m\log n)$ a causa dell'ordinamento.

- L'algoritmo usa solo confronti fra pesi: ogni trasformazione crescente dei pesi dà lo stesso albero.

## 2.5.2 Algoritmo di Kruskal sul grafo di riferimento

<a id="box-18-mst-ex-kruskal"></a>

!!! esempio "Esempio 2.7: algoritmo di Kruskal"

    Eseguiamo l'algoritmo di Kruskal sul grafo di riferimento pesato. Gli spigoli in ordine di peso sono $\{1,3\},\{4,5\},\{2,3\},\{1,2\},\{3,4\},\{2,4\},\{5,6\},\{3,5\},\{4,6\}$. Ogni riga è uno spigolo esaminato, con le componenti di $(V,F)$ dopo il passo:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">\(k\)</span></th>
    <th>spigolo <span class="arithmatex">\(e_k\)</span></th>
    <th><span class="arithmatex">\(w_{e_k}\)</span></th>
    <th>decisione e componenti di <span class="arithmatex">\((V,F)\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(\{1,3\}\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td>accetta: <span class="arithmatex">\(\{1,3\},\{2\},\{4\},\{5\},\{6\}\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(\{4,5\}\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td>accetta: <span class="arithmatex">\(\{1,3\},\{2\},\{4,5\},\{6\}\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(\{2,3\}\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td>accetta: <span class="arithmatex">\(\{1,2,3\},\{4,5\},\{6\}\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(\{1,2\}\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td>rifiuta (<span class="arithmatex">\(1\)</span> e <span class="arithmatex">\(2\)</span> stanno entrambi in <span class="arithmatex">\(\{1,2,3\}\)</span>)</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(\{3,4\}\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td>accetta: <span class="arithmatex">\(\{1,2,3,4,5\},\{6\}\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(\{2,4\}\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td>rifiuta (<span class="arithmatex">\(2\)</span> e <span class="arithmatex">\(4\)</span> stanno entrambi in <span class="arithmatex">\(\{1,2,3,4,5\}\)</span>)</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(\{5,6\}\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td>accetta: <span class="arithmatex">\(\{1,2,3,4,5,6\}\)</span>; <span class="arithmatex">\(|F|=5\)</span>, <code>STOP</code></td>
    </tr>
    </table></div>

    L'algoritmo si ferma dopo $7$ dei $9$ spigoli, con $F=\{\{1,3\},\{4,5\},\{2,3\},\{3,4\},\{5,6\}\}$ di peso $18$: l'albero $\tilde{F}$ dell'<span style="color:#1971c2">[Esempio 2.2](il-problema-dell-albero-ricoprente-di-costo-minimo.md#box-3-mst-ex-opt)</span>. La figura mostra, su ogni spigolo dell'albero, il suo peso e fra parentesi il passo $k$ in cui è stato accettato.

    ![Figura 4](../../img/minimum-spanning-trees/fig04.svg){ .fig loading=lazy  }

- Gli spigoli rifiutati $\{1,2\}$ e $\{2,4\}$ sono gli spigoli più pesanti dei cicli $1,2,3$ e $2,3,4$, come prevede la proprietà del ciclo; gli spigoli $\{3,5\}$ e $\{4,6\}$ non vengono mai esaminati.

!!! chiave ""

    L'algoritmo di Kruskal esamina gli spigoli per peso non decrescente e accetta quelli che uniscono due componenti; con union–find richiede tempo $O(m\log n)$, dominato dall'ordinamento.

---

**Avanti:** [2.6 Algoritmo di Prim](algoritmo-di-prim.md)
