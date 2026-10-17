---
title: "Condizioni di ottimalità e potenziali"
---

# 3.2 Condizioni di ottimalità e potenziali { #sez-sec-sp-potentials }

<div class="info-capitolo" markdown>

**Parte 2 · Alberi e cammini · Capitolo 3** · [:material-book-open-variant: Capitolo 3: Cammini minimi](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-alberi-e-cammini.pdf) · [:material-presentation: Slide](../../pdf/slide-shortest-paths.pdf) · [:material-pencil: Esercizi: Cammini minimi](../../esercizi/shortest-paths.md) · [:material-gesture-tap: App: Cammini minimi: Dijkstra, Bellman–Ford, grafi aciclici](../../laboratorio/cammini-minimi-dijkstra-bellman-ford.md)

</div>

<a id="box-10-sp-def-potentials"></a>

!!! definizione "Definizione 3.7: potenziali e costi ridotti"

    Un vettore $\vet{\pi} \in \R^n$ assegna un <strong>potenziale</strong> $\pi_i$ a ogni nodo $i \in N$. Il <strong>costo ridotto</strong> dell'arco $(i,j)$ rispetto a $\vet{\pi}$ è

    $$
    \bar{c}_{ij}=d_{ij}-\pi_i+\pi_j .
    $$

    I potenziali sono <strong>ammissibili</strong> se $\bar{c}_{ij} \ge 0$ per ogni arco $(i,j) \in A$, e un arco con $\bar{c}_{ij}=0$ è <strong>stretto</strong>.

- Date delle <strong>etichette</strong> $d(j)$, lunghezze di passeggiate da $s$ a $j$, usiamo i potenziali $\pi_i=-d(i)$. Allora $\bar{c}_{ij}=d_{ij}+d(i)-d(j)$, e i potenziali sono ammissibili se e solo se $d(j) \le d(i)+d_{ij}$ per ogni arco.

- Lungo una passeggiata $W=i_0,i_1,\dots,i_k$ i potenziali si elidono a catena (somma telescopica):

    $$
    d(W)=\sum_{t=1}^{k} \bar{c}_{i_{t-1}i_t} \;+\; \pi_{i_0}-\pi_{i_k} .
    $$

<a id="box-11-sp-th-certificate"></a>

!!! teorema "Teorema 3.8: potenziali come certificato di ottimalità"

    Siano $\vet{\pi}$ potenziali ammissibili e sia $P$ un cammino da $s$ a $t$ i cui archi sono tutti stretti. Allora $P$ è un cammino minimo da $s$ a $t$, e $d(P)=\pi_s-\pi_t$. Inoltre $G$ non ha cicli negativi.

??? dimostrazione "Dimostrazione"

    Usiamo la formula telescopica qui sopra.

    1. Gli archi di $P$ hanno $\bar{c}_{ij}=0$, quindi $d(P)=\pi_s-\pi_t$.

    2. Per ogni cammino $Q$ da $s$ a $t$, $d(Q)=\sum_{(i,j) \in Q}\bar{c}_{ij}+\pi_s-\pi_t \ge \pi_s-\pi_t=d(P)$.

    3. Per ogni ciclo $C$ il primo e l'ultimo nodo coincidono, quindi $d(C)=\sum_{(i,j) \in C}\bar{c}_{ij} \ge 0$. <span class="qed">□</span>

<a id="box-12-sp-cor-conditions"></a>

!!! teorema "Corollario 3.9: condizioni di ottimalità per le etichette"

    Siano le etichette $d(j)$, $j \in N$, finite con $d(s)=0$, e supponiamo che

    - **(i)** $d(j) \le d(i)+d_{ij}$ per ogni arco $(i,j) \in A$;

    - **(ii)** per ogni $j \neq s$ esista un cammino da $s$ a $j$ di lunghezza $d(j)$.

    Allora $d(j)=\tilde{d}(j)$ per ogni $j \in N$.

??? dimostrazione "Dimostrazione"

    Per (i) i potenziali $\pi_i=-d(i)$ sono ammissibili, quindi ogni cammino $Q$ da $s$ a $j$ ha $d(Q) \ge \pi_s-\pi_j=d(j)$ con il ragionamento del <span style="color:#1971c2">[Teorema 3.8](#box-11-sp-th-certificate)</span>. Per (ii) il valore $d(j)$ è realizzato da un cammino, quindi $d(j)=\tilde{d}(j)$. <span class="qed">□</span>

<a id="box-13-sp-ex-certificate"></a>

!!! esempio "Esempio 3.4: un certificato sul grafo di riferimento"

    Con le distanze dell'<span style="color:#1971c2">[Esempio 3.1](problemi-di-cammino-minimo.md#box-2-sp-ex-ref)</span> i potenziali sono $\vet{\pi}=-\tilde{\vet{d}}=(0,-5,-2,-8,-10, -13)$, e i costi ridotti $\bar{c}_{ij}=d_{ij}-\pi_i+\pi_j$ sono:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>arco</th>
    <th><span class="arithmatex">\((1,2)\)</span></th>
    <th><span class="arithmatex">\((1,3)\)</span></th>
    <th><span class="arithmatex">\((2,4)\)</span></th>
    <th><span class="arithmatex">\((3,2)\)</span></th>
    <th><span class="arithmatex">\((3,5)\)</span></th>
    <th><span class="arithmatex">\((4,3)\)</span></th>
    <th><span class="arithmatex">\((4,6)\)</span></th>
    <th><span class="arithmatex">\((5,4)\)</span></th>
    <th><span class="arithmatex">\((5,6)\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(d_{ij}\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(8\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\bar{c}_{ij}\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    </tr>
    </table></div>

    - Tutti i costi ridotti sono non negativi, e gli archi stretti sono gli archi dell'albero dei cammini minimi. Il cammino $1,3,2,4,6$ è stretto, quindi è minimo, con lunghezza $\pi_1-\pi_6=13$.

    - L'albero della visita in ampiezza, $(1,2)$, $(1,3)$, $(2,4)$, $(3,5)$, $(4,6)$, dà le etichette $(0,7,2,10,10,15)$. Con i loro potenziali, $\bar{c}_{32}=3-(-2)+(-7)=-2<0$: i potenziali non sono ammissibili, ed entrare nel nodo $2$ attraverso $(3,2)$ accorcia il suo cammino di $2$.

!!! chiave ""

    Potenziali ammissibili ($\bar{c}_{ij}=d_{ij}-\pi_i+\pi_j \ge 0$ su ogni arco) e un cammino fatto di archi stretti dimostrano che il cammino è minimo. Con le etichette, $\pi_i=-d(i)$, e l'ammissibilità si legge $d(j) \le d(i)+d_{ij}$.

---

**Avanti:** [3.3 La formulazione di programmazione lineare](la-formulazione-di-programmazione-lineare.md)
