---
title: "Un esempio senza capacità"
---

# 8.6 Un esempio senza capacità { #sez-sec-ns-example-a }

<div class="info-capitolo" markdown>

**Parte 4 · Il simplesso su reti · Capitolo 8** · [:material-book-open-variant: Capitolo 8: Simplesso su reti](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-simplesso-su-reti.pdf) · [:material-pencil: Esercizi: Simplesso su reti](../../esercizi/network-simplex.md)

</div>

- Utilizziamo la rete di riferimento con i saldi $\vet{b}=(5,2,0,-3,0,-4)$ e i costi di <span style="color:#1971c2">[Esempio 8.2](basi-e-alberi-ricoprenti.md#box-8-ns-ex-tree)</span>, ma senza capacità: $u_{ij}=+\infty$ per ogni arco, quindi $U=\emptyset$.

- La struttura ad albero iniziale invia lungo il percorso $5$ le unità $1$ del nodo $1,3,5,4$ e le unità $2$ del nodo $2$ lungo $(2,4)$; il nodo $4$ mantiene le unità $3$ e inoltra le unità $4$ al nodo $6$:

    $$
    T=\{(1,3),(2,4),(3,5),(4,6),(5,4)\}, \qquad L=\{(1,2),(3,2),(4,3),(5,6)\}, \qquad U=\emptyset .
    $$

- Ogni soluzione ad albero dell'esempio non è degenere. Ogni tabella riporta lo stato degli archi (T, L, U), i flussi e la riduzione dei costi; ciascuna tabella dei cicli elenca gli archi di $C$ dall'apice.

<a id="box-20-ns-ex-a"></a>

!!! esempio "Esempio 8.5: rete senza capacità"

    <strong>Iterazione 1</strong><br> Le potenziali sono $\vet{\pi}=(15,10,13,5,10,0)$ e il costo è $80$.

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
    <td>stato</td>
    <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
    <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
    <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
    <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
    <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
    <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
    <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
    <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
    <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(x_{ij}\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\bar{c}_{ij}\)</span></td>
    <td><span class="arithmatex">\(-3\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(-1\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(-7\)</span></td>
    </tr>
    </table></div>

    - Gli archi idonei sono $(1,2)$, $(3,2)$ e $(5,6)$; l'arco entrante è $e=(5,6)$, con $\bar{c}_{56}=-7$. Lo è in $L$, quindi $C$ segue $(5,6)$.

    - I percorsi dell'albero fino alla radice sono $5,4,6$ e $6$: l'apice è $w=6$ e $C$ è $6,4,5,6$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <td>arco di <span class="arithmatex">\(C\)</span></td>
        <td><span class="arithmatex">\((4,6)\)</span></td>
        <td><span class="arithmatex">\((5,4)\)</span></td>
        <td><span class="arithmatex">\((5,6)\)</span></td>
        </tr>
        <tr>
        <td>direzione</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(+\)</span></td>
        </tr>
        <tr>
        <td>residuo</td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        </tr>
        </table></div>

    - $\theta=4$ e $(4,6)$ lasciano l'albero verso $L$. Le unità $4$ per il nodo $6$ ora viaggiano su $(5,6)$ invece che $5,4,6$ e il costo diventa $80-4 \cdot 7=52$.

    - La rimozione di $(4,6)$ elimina $S=\{1,2,3,4,5\}$, che contiene $k=5$: questi potenziali cambiano con $\bar{c}_{56}=-7$.

    ![Figura 3](../../img/network-simplex/fig03.svg){ .fig loading=lazy  }

    <strong>Iterazione 2</strong><br> Le potenziali sono $\vet{\pi}=(8,3,6,-2,3,0)$ e il costo è $52$.

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
    <td>stato</td>
    <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
    <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
    <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
    <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
    <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
    <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
    <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
    <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
    <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(x_{ij}\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\bar{c}_{ij}\)</span></td>
    <td><span class="arithmatex">\(-3\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(-1\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    </tr>
    </table></div>

    - Gli archi idonei sono $(1,2)$ e $(3,2)$; l'arco entrante è $e=(1,2)$, con $\bar{c}_{12}=-3$, in $L$.

    - I percorsi dell'albero fino alla radice sono $1,3,5,6$ e $2,4,5,6$: l'apice è $w=5$ e $C$ è $5,3,1,2,4,5$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <td>arco di <span class="arithmatex">\(C\)</span></td>
        <td><span class="arithmatex">\((3,5)\)</span></td>
        <td><span class="arithmatex">\((1,3)\)</span></td>
        <td><span class="arithmatex">\((1,2)\)</span></td>
        <td><span class="arithmatex">\((2,4)\)</span></td>
        <td><span class="arithmatex">\((5,4)\)</span></td>
        </tr>
        <tr>
        <td>direzione</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(+\)</span></td>
        <td><span class="arithmatex">\(+\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        </tr>
        <tr>
        <td>residuo</td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        </table></div>

    - $\theta=1$ e $(5,4)$ lasciano l'albero verso $L$. L'unità per il nodo $4$ che ha viaggiato lungo $1,3,5,4$, al costo $10$, ora viaggia lungo $1,2,4$, al costo $7$: il costo diventa $52-1 \cdot 3=49$.

    - La rimozione di $(5,4)$ esclude $S=\{2,4\}$, che contiene $l=2$: questi potenziali cambiano con $-\bar{c}_{12}=3$.

    ![Figura 4](../../img/network-simplex/fig04.svg){ .fig loading=lazy  }

    <strong>Iterazione 3</strong><br> Le potenziali sono $\vet{\pi}=(8,6,6,1,3,0)$ e il costo è $49$.

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
    <td>stato</td>
    <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
    <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
    <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
    <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
    <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
    <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
    <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
    <td><span class="arithmatex">\(\mathrm{L}\)</span></td>
    <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(x_{ij}\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\bar{c}_{ij}\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(8\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    </tr>
    </table></div>

    Tutti gli archi di $L$ hanno $\bar{c}_{ij}>0$: <code>STOP</code>. Per <span style="color:#1971c2">[Teorema 8.10](potenziali-e-ottimalita.md#box-12-ns-th-optimality)</span> il flusso $x_{12}=1$, $x_{13}=4$, $x_{24}=3$, $x_{35}=4$, $x_{56}=4$ è l'unico flusso ottimale, con valore

    $$
    2 \cdot 1+2 \cdot 4+5 \cdot 3+3 \cdot 4+3 \cdot 4=49 .
    $$

    ![Figura 5](../../img/network-simplex/fig05.svg){ .fig loading=lazy  }

- Gurobi (gurobipy) conferma il valore ottimale $49$ e il flusso ottimale; enumerando tutti gli alberi fattibili strutture danno lo stesso ottimo unico.

- Il flusso ottimale invia le unità $4$ su $(5,6)$, la cui capacità nel Capitolo 4 è $u_{56}=2$: con le capacità questo flusso non è fattibile e il valore ottimale aumenta da $49$ a $60$.

!!! chiave ""

    Senza capacità $U$ è vuoto e solo gli archi all'indietro possono bloccarsi. Sulla rete di riferimento due pivot abbassano il costo da $80$ a $52$ e a $49$; i costi ridotti dell'ultimo albero sono positivi su tutti gli archi non basici.

---

**Avanti:** [8.7 Degenerazione e alberi fortemente fattibili](degenerazione-e-alberi-fortemente-fattibili.md)
