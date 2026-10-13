---
title: "Rappresentazioni di un grafo"
---

# 1.2 Rappresentazioni di un grafo { #sez-sec-gr-representations }

<div class="info-capitolo" markdown>

**Parte 1 · Grafi · Capitolo 1** · [:material-book-open-variant: Capitolo 1: Grafi](index.md) · [:material-file-pdf-box: Dispensa, volume 1 (PDF)](../../pdf/dispensa-1-grafi.pdf) · [:material-pencil: Esercizi: Grafi](../../esercizi/graphs.md) · [:material-gesture-tap: App: Ricerca su grafo: BFS e DFS](../../laboratorio/ricerca-bfs-dfs.md)

</div>

<a id="box-10-gr-def-adjmatrix"></a>

!!! definizione "Definizione 1.7: matrice di adiacenza"

    La <strong>matrice di adiacenza</strong> di un grafo orientato $G=(N,A)$ è la matrice $n \times n$ $\mat{M}$ con voci

    $$
    m_{ij}=\begin{cases} 1 & \text{se } (i,j) \in A,\\ 0 & \text{altrimenti,}\end{cases}
    \qquad \forall i,j \in \{1,2,\dots,n\}.
    $$

    La matrice di adiacenza di un grafo non orientato ha $m_{uv}=m_{vu}=1$ per ogni lato $\{u,v\}$: è simmetrica.

<a id="box-11-gr-def-incidence"></a>

!!! definizione "Definizione 1.8: matrice di incidenza nodo-arco"

    Sia $G=(N,A)$ un grafo diretto con archi $a_1,a_2,\dots,a_m$. La <strong>matrice di incidenza nodo–arco</strong> è la $n \times m$ matrice $\mat{B}$ con una riga per nodo e una colonna per arco, le cui voci sono

    $$
    b_{ik}=\begin{cases} +1 & \text{se } i \text{ è la coda di } a_k,\\ -1 & \text{se } i \text{ è la testa di }
    a_k,\\ 0 & \text{altrimenti,}\end{cases}
    \qquad \forall i \in \{1,2,\dots,n\},~ \forall k \in \{1,2,\dots,m\}.
    $$

- Ogni colonna di $\mat{B}$ ha esattamente uno $+1$ (la coda) e uno $-1$ (la testa), quindi la somma delle righe di $\mat{B}$ è il vettore zero.

- La riga $i$ ha uno $+1$ per ogni arco di $\delta^+(i)$ e uno $-1$ per ogni arco di $\delta^-(i)$: ha $\deg^+(i)+\deg^-(i)$ voci diverse da zero.

- La <strong>matrice di incidenza vertici–lati</strong> di un grafo non orientato ha un $1$ in entrambi i punti finali di ogni lato.

<a id="box-12-gr-ex-matrices"></a>

!!! esempio "Esempio 1.4: le matrici del grafo di riferimento"

    La matrice di adiacenza $\mat{M}$ e la matrice di incidenza nodo-arco $\mat{B}$ del grafo di riferimento di <span style="color:#1971c2">[Esempio 1.2](grafi-non-orientati-e-orientati.md#box-5-gr-ex-ref)</span> vengono mostrati con l'indice di ogni riga (un nodo) e di ogni colonna (un nodo in $\mat{M}$, un arco in $\mat{B}$):

    $$
    \mat{M}:\quad
    \begin{array}{c|rrrrrr}
    & 1 & 2 & 3 & 4 & 5 & 6\\ \hline
    1 & 0 & 1 & 1 & 0 & 0 & 0\\
    2 & 0 & 0 & 0 & 1 & 0 & 0\\
    3 & 0 & 1 & 0 & 0 & 1 & 0\\
    4 & 0 & 0 & 1 & 0 & 0 & 1\\
    5 & 0 & 0 & 0 & 1 & 0 & 1\\
    6 & 0 & 0 & 0 & 0 & 0 & 0\\
    \end{array}
    $$

    $$
    \mat{B}:\quad
    \begin{array}{c|rrrrrrrrr}
    & a_1 & a_2 & a_3 & a_4 & a_5 & a_6 & a_7 & a_8 & a_9\\ \hline
    1 & 1 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0\\
    2 & -1 & 0 & 1 & -1 & 0 & 0 & 0 & 0 & 0\\
    3 & 0 & -1 & 0 & 1 & 1 & -1 & 0 & 0 & 0\\
    4 & 0 & 0 & -1 & 0 & 0 & 1 & 1 & -1 & 0\\
    5 & 0 & 0 & 0 & 0 & -1 & 0 & 0 & 1 & 1\\
    6 & 0 & 0 & 0 & 0 & 0 & 0 & -1 & 0 & -1\\
    \end{array}
    $$

    Ad esempio, la colonna $a_6=(4,3)$ ha $+1$ nella riga $4$ (la coda) e $-1$ nella riga $3$ (la testa). Riga $6$ di $\mat{M}$ è zero, perché il nodo $6$ non ha successori.

<a id="box-13-gr-def-lists"></a>

!!! definizione "Definizione 1.9: elenchi di adiacenze ed elenchi di archi"

    Sia $G=(N,A)$ un grafo diretto.

    - Le <strong>liste di adiacenza</strong> memorizzano, per ogni nodo $i$, la lista $L(i)$ dei suoi successori, cioè le teste degli archi di $\delta^+(i)$. In questo modulo ogni lista è ordinata per indice crescente.

    - <strong>Arc list</strong> memorizza due array di lunghezza $m$, con la coda e la testa di ogni arco.

    Per un grafo non orientato la lista $L(v)$ contiene l'intorno $N(v)$ e ogni arco appare in due liste.

<a id="box-14-gr-ex-lists"></a>

!!! esempio "Esempio 1.5: le liste del grafo di riferimento"

    Le liste di adiacenza e la lista di archi del grafo di riferimento sono:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">\(i\)</span></th>
    <th><span class="arithmatex">\(L(i)\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(2,~3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(2,~5\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(3,~6\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(4,~6\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(6\)</span></td>
    <td>(vuoto)</td>
    </tr>
    </table></div>

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>arco</th>
    <th><span class="arithmatex">\(a_1\)</span></th>
    <th><span class="arithmatex">\(a_2\)</span></th>
    <th><span class="arithmatex">\(a_3\)</span></th>
    <th><span class="arithmatex">\(a_4\)</span></th>
    <th><span class="arithmatex">\(a_5\)</span></th>
    <th><span class="arithmatex">\(a_6\)</span></th>
    <th><span class="arithmatex">\(a_7\)</span></th>
    <th><span class="arithmatex">\(a_8\)</span></th>
    <th><span class="arithmatex">\(a_9\)</span></th>
    </tr>
    <tr>
    <td>coda</td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    </tr>
    <tr>
    <td>testa</td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    </tr>
    </table></div>

    Gli elenchi del grafo non orientato sottostante sono $L(1)=\{2,3\}$, $L(2)=\{1,3,4\}$, $L(3)=\{1,2,4,5\}$, $L(4)=\{2,3,5,6\}$, $L(5)=\{3,4,6\}$ e $L(6)=\{4,5\}$.

## 1.2.1 Spazio e tempo di accesso

- La tabella mette a confronto le quattro rappresentazioni di un grafo orientato. Lo spazio è il numero di voci memorizzate; le due operazioni sono il test di un arco e la scansione dei successori di un nodo.

<div class="tabella" markdown="0"><table>
<tr>
<th>rappresentazione e spazio ed è <span class="arithmatex">\((i,j) \in A\)</span>?</th>
<th>successori di <span class="arithmatex">\(i\)</span></th>
</tr>
<tr>
<td>matrice di adiacenza</td>
<td><span class="arithmatex">\(n^2\)</span></td>
<td><span class="arithmatex">\(O(1)\)</span></td>
<td><span class="arithmatex">\(O(n)\)</span></td>
</tr>
<tr>
<td>matrice di incidenza nodo-arco</td>
<td><span class="arithmatex">\(n\,m\)</span></td>
<td><span class="arithmatex">\(O(m)\)</span></td>
<td><span class="arithmatex">\(O(m)\)</span></td>
</tr>
<tr>
<td>elenco archi</td>
<td><span class="arithmatex">\(2\,m\)</span></td>
<td><span class="arithmatex">\(O(m)\)</span></td>
<td><span class="arithmatex">\(O(m)\)</span></td>
</tr>
<tr>
<td>elenchi di adiacenze</td>
<td><span class="arithmatex">\(n+m\)</span></td>
<td><span class="arithmatex">\(O(\deg^+(i))\)</span></td>
<td><span class="arithmatex">\(O(\deg^+(i))\)</span></td>
</tr>
</table></div>

- Per il grafo di riferimento le quattro rappresentazioni memorizzano le voci $36$, $54$, $18$ e $15$.

- Un grafo diretto semplice ha $m \le n(n-1)$. Nelle reti delle applicazioni $m$ è molto più piccolo di $n^2$ (il grafo è <strong>sparse</strong>) e le liste di adiacenza sono la rappresentazione scelta per gli algoritmi.

## 1.2.2 La matrice di incidenza e la conservazione del flusso

- Dato un valore $x_{ij}$ per ogni arco, la riga $i$ di $\mat{B}\vet{x}$ è ciò che lascia il nodo $i$ meno ciò che vi entra:

    $$
    (\mat{B}\vet{x})_i=\sum_{(i,j) \in \delta^+(i)} x_{ij} \;-\; \sum_{(j,i) \in \delta^-(i)} x_{ji},
    \qquad \forall i \in N.
    $$

- Con $x_{ij}=1$ per ogni arco del grafo di riferimento, $\mat{B}\vet{x}$ è il vettore delle differenze $\deg^+(i)-\deg^-(i)$:

    $$
    \mat{B}\vet{x}=(2,\,-1,\,0,\,0,\,1,\,-2)' .
    $$

!!! chiave ""

    La matrice di incidenza nodo-arco ha $+1$ nella coda e $-1$ nella testa di ogni arco; gli elenchi di adiacenza memorizzano a tracciare un grafo nello spazio $n+m$ e fornire i successori di un nodo nel tempo $O(\deg^+(i))$.

---

**Avanti:** [1.3 Connettività](connettivita.md)
