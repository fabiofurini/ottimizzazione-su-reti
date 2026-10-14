---
title: "Algoritmo di Kruskal"
---

# 2.5 Algoritmo di Kruskal { #sez-sec-mst-kruskal }

<div class="info-capitolo" markdown>

**Parte 2 · Alberi e cammini · Capitolo 2** · [:material-book-open-variant: Capitolo 2: Alberi ricoprenti](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-alberi-e-cammini.pdf) · [:material-pencil: Esercizi: Alberi ricoprenti](../../esercizi/minimum-spanning-trees.md) · [:material-gesture-tap: App: Alberi ricoprenti minimi: Kruskal e Prim](../../laboratorio/albero-ricoprente-minimo-kruskal-prim.md)

</div>

!!! algoritmo "Algoritmo: Algoritmo di Kruskal"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> un grafo connesso non orientato <span class="arithmatex">\(G=(V,E)\)</span> con pesi <span class="arithmatex">\(w_e\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> un albero di copertura minimo <span class="arithmatex">\(F\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Passaggio 0 (inizializzazione).</strong> Ordina i lati in base al peso non decrescente, <span class="arithmatex">\(w_{e_1} \le w_{e_2} \le \dots \le w_{e_m}\)</span>, and set <span class="arithmatex">\(F:=\emptyset\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">2</span><strong>Passaggio 1 (scansione).</strong> Per <span class="arithmatex">\(k=1,2,\dots,m\)</span>: se i punti finali di <span class="arithmatex">\(e_k\)</span> si trovano in componenti diversi di <span class="arithmatex">\((V,F)\)</span>, impostare
    <span class="arithmatex">\(F:=F \cup \{e_k\}\)</span>; altrimenti rifiuta <span class="arithmatex">\(e_k\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">3</span>  Se <span class="arithmatex">\(|F|=n-1\)</span>, <code>STOP</code>.</div></div>

- Un lato è <strong>accettato</strong> se unisce due diversi componenti di $(V,F)$ e <strong>rifiutato</strong> se lo farebbe chiudere un ciclo. I componenti di $(V,F)$ iniziano come singoli vertici $n$ e si fondono ad ogni accettazione.

- In questo modulo, i lati di uguale peso vengono scansionati in ordine lessicografo di $\{u,v\}$, con $u<v$.

<a id="box-16-mst-th-kruskal"></a>

!!! teorema "Teorema 2.10: correttezza dell'algoritmo di Kruskal"

    L'algoritmo di Kruskal si ferma con $|F|=n-1$ e $F$ è uno albero ricoprente minimo.

??? dimostrazione "Dimostrazione"

    Mostriamo che ogni lato accettato $e_k=\{u,v\}$ è una scelta del passo 2 dell'algoritmo greedy generico. Lasciamo $S$ è il componente di $(V,F)$ che contiene $u$, subito prima che $e_k$ venga accettato: $v \notin S$ e nessun lato di $F$ incrocia $\delta(S)$.

    1. Lascia che $e_h \in \delta(S)$ con $h<k$. Quando $e_h$ è stato scansionato non è stato accettato, poiché $F \cap \delta(S)=\emptyset$; quindi è allora gli estremo erano nello stesso componente e lo sono ancora, perché i componenti si uniscono solo. Ciò contraddice $e_h \in \delta(S)$.

    2. Quindi ogni lato di $\delta(S)$ è un certo $e_h$ con $h \ge k$ e $w_{e_h} \ge w_{e_k}$: $e_k$ ha un minimo peso in $\delta(S)$.

    3. Se la scansione terminasse con $|F|<n-1$, la foresta $(V,F)$ avrebbe due componenti uniti da un lato di $G$ e quel lato sarebbe stato accettato una volta scansionato, secondo l'argomentazione del punto 1.

    Secondo <span style="color:#1971c2">[Teorema 2.9](l-algoritmo-greedy-generico.md#box-15-mst-th-greedy)</span>, $F$ è uno albero ricoprente minimo. <span class="qed">□</span>

## 2.5.1 Implementazione e tempo di esecuzione

- I componenti di $(V,F)$ sono mantenuti in una struttura <strong>union–find</strong>: ogni vertice $v$ memorizza l'etichetta $\mathit{comp}(v)$ del suo componente e ogni componente memorizza l'elenco dei suoi vertici e la sua dimensione.

- Testare se $u$ e $v$ si trovano in componenti diversi è il confronto $\mathit{comp}(u) \neq \mathit{comp}(v)$, in $O(1)$ tempo. L'unione di due componenti rietichetta i vertici di <em>più piccolo</em> (<strong>unione per dimensione</strong>).

<a id="box-17-mst-th-kruskal-time"></a>

!!! teorema "Teorema 2.11: tempo di esecuzione dell'algoritmo di Kruskal"

    Con la struttura unione-trova per etichette e unione per dimensione, l'algoritmo di Kruskal viene eseguito nel tempo $O(m\log n)$.

??? dimostrazione "Dimostrazione"

    1. L'ordinamento dei lati richiede tempo $O(m\log m)$; da $m \le n^2$, $\log m \le 2\log n$ e questo è $O(m\log n)$.

    2. La scansione esegue i test $m$, ciascuno nel tempo $O(1)$.

    3. Quando un vertice cambia rappresentante, il suo componente si fonde con un componente di dimensione almeno pari. La dimensione del componente almeno raddoppia e non supera mai $n$; quindi ogni vertice cambia rappresentante al massimo $\log_2 n$ volte. Tutte le fusioni richiedono complessivamente tempo $O(n\log n)$.

    $G$ è connesso, quindi $n-1 \le m$ e il totale è $O(m\log n+n\log n)=O(m\log n)$. <span class="qed">□</span>

- Il tempo di esecuzione è dominato dall'ordinamento. Con l'unione: trova la struttura per alberi, con l'unione per rango e compressione del percorso, la scansione richiede un tempo quasi lineare; il limite rimane $O(m\log n)$ a causa dell'ordinamento.

- L'algoritmo utilizza solo confronti tra pesi: ogni trasformazione crescente dei pesi dà il stesso albero.

## 2.5.2 Algoritmo di Kruskal sul grafo di riferimento

<a id="box-18-mst-ex-kruskal"></a>

!!! esempio "Esempio 2.7: Algoritmo di Kruskal"

    Eseguiamo l'algoritmo di Kruskal sul grafo di riferimento ponderato. I lati in ordine di peso sono $\{1,3\},\{4,5\},\{2,3\},\{1,2\},\{3,4\},\{2,4\},\{5,6\},\{3,5\},\{4,6\}$. Ogni riga rappresenta un lato scansionato, con il componenti di $(V,F)$ dopo il passaggio:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">\(k\)</span></th>
    <th>lato <span class="arithmatex">\(e_k\)</span></th>
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
    <td>rifiuta (<span class="arithmatex">\(1\)</span> e <span class="arithmatex">\(2\)</span> sono entrambi in <span class="arithmatex">\(\{1,2,3\}\)</span>)</td>
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
    <td>rifiuta (<span class="arithmatex">\(2\)</span> e <span class="arithmatex">\(4\)</span> sono entrambi in <span class="arithmatex">\(\{1,2,3,4,5\}\)</span>)</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(7\)</span> e <span class="arithmatex">\(\{5,6\}\)</span> e <span class="arithmatex">\(7\)</span> e accetta: <span class="arithmatex">\(\{1,2,3,4,5,6\}\)</span>; <span class="arithmatex">\(|F|=5\)</span>, <code>STOP</code></td>
    </tr>
    </table></div>

    L'algoritmo si ferma dopo $7$ dei lati $9$, con $F=\{\{1,3\},\{4,5\},\{2,3\},\{3,4\},\{5,6\}\}$ di peso $18$: l'albero $\tilde{F}$ di <span style="color:#1971c2">[Esempio 2.2](il-problema-dell-albero-di-copertura-minimo.md#box-3-mst-ex-opt)</span>. La figura mostra, su ciascun lato dell'albero, il suo peso e il peso tra parentesi il passo $k$ della sua accettazione.

    ![Figura 4](../../img/minimum-spanning-trees/fig04.svg){ .fig loading=lazy  }

- I lati scartati $\{1,2\}$ e $\{2,4\}$ sono i lati più pesanti dei cicli $1,2,3$ e $2,3,4$, poiché la proprietà del ciclo prevede; i lati $\{3,5\}$ e $\{4,6\}$ non vengono mai scansionati.

!!! chiave ""

    L'algoritmo di Kruskal scansiona gli lati con peso non decrescente e accetta quelli che uniscono due componenti; con union: trova che viene eseguito nel tempo $O(m\log n)$, dominato dall'ordinamento.

---

**Avanti:** [2.6 Algoritmo di Prim](algoritmo-di-prim.md)
