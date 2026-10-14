---
title: "Percorsi più brevi nei grafici aciclici"
---

# 3.4 Percorsi più brevi nei grafici aciclici { #sez-sec-sp-dag }

<div class="info-capitolo" markdown>

**Parte 2 · Alberi e cammini · Capitolo 3** · [:material-book-open-variant: Capitolo 3: Cammini minimi](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-alberi-e-cammini.pdf) · [:material-pencil: Esercizi: Cammini minimi](../../esercizi/shortest-paths.md) · [:material-gesture-tap: App: Cammini minimi: Dijkstra, Bellman–Ford, grafi aciclici](../../laboratorio/cammini-minimi-dijkstra-bellman-ford.md)

</div>

<a id="box-18-sp-def-topo"></a>

!!! definizione "Definizione 3.13: grafo aciclico e ordine topologico"

    Un grafo diretto senza cicli diretti è un <strong>grafo aciclico diretto</strong> (DAG). Un <strong>ordine topologico</strong> di $G=(N,A)$ è un ordinamento $v_1,v_2,\dots,v_n$ dei suoi nodi tale che ogni arco vada avanti:

    $$
    (v_a,v_b) \in A \quad \Longrightarrow \quad a<b .
    $$

<a id="box-19-sp-prop-topo"></a>

!!! teorema "Proposizione 3.14: ordini topologici"

    Un grafo diretto ha un ordine topologico se e solo se è aciclico.

??? dimostrazione "Dimostrazione"

    Se $G$ avesse un ordine topologico, un ciclo $i_0,i_1,\dots,i_k=i_0$ andrebbe avanti su ogni arco e ritornerebbe al suo primo nodo: impossibile. Viceversa, sia $G$ aciclico; discutiamo per induzione su $n$.

    1. $G$ ha un nodo senza arco entrante: altrimenti, camminare all'indietro lungo archi entranti da qualsiasi nodo, dopo $n$ passi che un nodo ripete e il cammino contiene un ciclo.

    2. Metti prima un nodo di questo tipo $v_1$. Il grafo senza $v_1$ è aciclico e per induzione ha un ordine topologico $v_2,\dots,v_n$; nessun arco entra in $v_1$, quindi $v_1,v_2,\dots,v_n$ è un ordine topologico di $G$. <span class="qed">□</span>

!!! algoritmo "Algoritmo: Percorsi più brevi in un grafo aciclico"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> un grafo aciclico <span class="arithmatex">\(G=(N,A)\)</span> con lunghezze <span class="arithmatex">\(d_{ij}\)</span> di qualsiasi segno, una sorgente <span class="arithmatex">\(s \in N\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> le distanze <span class="arithmatex">\(d(j)=\tilde{d}(j)\)</span> e i predecessori <span class="arithmatex">\(\mathit{pred}(j)\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Passaggio 0 (ordine).</strong> Trova un ordine topologico: rimuovi ripetutamente un nodo senza inserire archi (il più piccolo
    indice, se più di uno).</div><div class="pc" style="--liv:0"><span class="pc-n">2</span>  Imposta <span class="arithmatex">\(d(s):=0\)</span> e <span class="arithmatex">\(d(j):=+\infty\)</span> per <span class="arithmatex">\(j \neq s\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">3</span><strong>Passaggio 1 (etichette).</strong> Per ciascun nodo <span class="arithmatex">\(i\)</span> in ordine topologico con <span class="arithmatex">\(d(i)<+\infty\)</span> e ciascun arco <span class="arithmatex">\((i,j) \in \delta^+(i)\)</span>:</div><div class="pc" style="--liv:0"><span class="pc-n">4</span>  se <span class="arithmatex">\(d(i)+d_{ij}<d(j)\)</span>, impostare <span class="arithmatex">\(d(j):=d(i)+d_{ij}\)</span> e <span class="arithmatex">\(\mathit{pred}(j):=i\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">5</span>  <code>STOP</code>.</div></div>

<a id="box-20-sp-th-dag"></a>

!!! teorema "Teorema 3.15: correttezza e tempo di esecuzione su grafi aciclici"

    Su un grafo aciclico con lunghezze di qualsiasi segno, l'algoritmo «Percorsi più brevi in un grafo aciclico» termina con $d(j)=\tilde{d}(j)$ per ogni $j \in N$ e viene eseguito in tempo $O(n+m)$.

??? dimostrazione "Dimostrazione"

    Un grafo aciclico non ha alcun ciclo, quindi vale la (A2). Ogni etichetta finita è la lunghezza di una passeggiata da $s$, quindi $d(j) \ge \tilde{d}(j)$ di <span style="color:#1971c2">[Lemma 3.3](problemi-del-percorso-piu-breve.md#box-4-sp-lem-walk)</span>; le etichette diminuiscono solo.

    1. Lascia che $j$ sia raggiungibile e $s=i_0,i_1,\dots,i_k=j$ un percorso più breve; i suoi nodi appaiono in questo ordine nel file ordine topologico, poiché ogni arco va avanti.

    2. Per induzione su $t$, dopo l'elaborazione di $i_t$ $d(i_t) \le \tilde{d}(i_t)$: il percorso verso $i_{t-1}$ è il più breve (<span style="color:#1971c2">[Lemma 3.4](problemi-del-percorso-piu-breve.md#box-6-sp-lem-subpath)</span>), e l'elaborazione $i_{t-1}$ restituisce $d(i_t) \le \tilde{d}(i_{t-1})+d_{i_{t-1}i_t}=\tilde{d}(i_t)$.

    3. I nodi non raggiungibili da $s$ mantengono $d(j)=+\infty=\tilde{d}(j)$.

    <em>Tempo.</em> L'ordine topologico impiega $O(n+m)$ tempo con un contatore degli archi entranti di ogni nodo, decrementato quando viene rimossa una coda; Il passaggio 1 esegue la scansione di ogni arco una volta. <span class="qed">□</span>

- La regola dell'indice più piccolo fissa un ordine per gli esempi; qualsiasi nodo senza inserire archi può essere rimosso.

- Con le lunghezze $-d_{ij}$ l'algoritmo calcola <strong>percorsi più lunghi</strong>, poiché un grafo aciclico non ha ciclo ripetere. I percorsi più lunghi nei grafi aciclici sono il nucleo di [Capitolo 9 «Progetto gestione»](../../gestione-dei-progetti/project-management/index.md).

<a id="box-21-sp-ex-dag"></a>

!!! esempio "Esempio 3.6: un'istanza aciclica"

    Invertendo l'arco $(4,3)$ del grafo di riferimento in $(3,4)$, con $d_{34}=1$, si ottiene un grafo aciclico. Lo diamo le lunghezze di <span style="color:#1971c2">[Esempio 3.1](problemi-del-percorso-piu-breve.md#box-2-sp-ex-ref)</span> tranne $d_{54}=-3$ (rosso).

    ![Figura 3](../../img/shortest-paths/fig03.svg){ .fig loading=lazy  }

    Il passo 0 fornisce l'ordine topologico $1,3,2,5,4,6$: dopo $1$, solo $3$ non ha arco entrante; allora $2$ e $5$ lo sono gratuito e $2$ inizia per primo. Ogni riga della tabella elabora un nodo e mostra le etichette dopo di esso:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>gradino e nodo <span class="arithmatex">\(i\)</span></th>
    <th><span class="arithmatex">\(d(1)\)</span></th>
    <th><span class="arithmatex">\(d(2)\)</span></th>
    <th><span class="arithmatex">\(d(3)\)</span></th>
    <th><span class="arithmatex">\(d(4)\)</span></th>
    <th><span class="arithmatex">\(d(5)\)</span></th>
    <th><span class="arithmatex">\(d(6)\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(\infty\)</span></td>
    <td><span class="arithmatex">\(\infty\)</span></td>
    <td><span class="arithmatex">\(\infty\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(\infty\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(\infty\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(17\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(8\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(8\)</span></td>
    </tr>
    </table></div>

    I predecessori danno l'albero $(1,3)$, $(3,2)$, $(3,4)$, $(3,5)$, $(4,6)$ (blu). L'arco negativo $(5,4)$ non lo è utilizzato: $d(5)-3=7>3=d(4)$. Con le lunghezze $-d_{ij}$ le lunghezze del percorso più lunghe da $1$ sono $(0,7,2,10,10,17)$.

!!! chiave ""

    Un grafo è aciclico se e solo se ha un ordine topologico. Scansionando i nodi in quest'ordine, ogni etichetta è definitiva quando il suo nodo viene elaborato: percorsi più brevi nel tempo $O(n+m)$, con lunghezze di qualsiasi segno.

---

**Avanti:** [3.5 L'algoritmo Bellman–Ford](l-algoritmo-bellmanford.md)
