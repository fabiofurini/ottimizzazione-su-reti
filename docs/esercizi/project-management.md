---
title: "Esercizi · Gestione dei progetti"
---

# Esercizi · Gestione dei progetti

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 9** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 9: Gestione dei progetti](../gestione-dei-progetti/project-management/index.md) · [:material-file-pdf-box: Eserciziario, volume 5 (PDF)](../pdf/esercizi-5-gestione-dei-progetti.pdf)

</div>

!!! formula "Regole utilizzate in questi esercizi"

    Le definizioni e il metodo del capitolo [«Gestione del progetto»](../gestione-dei-progetti/project-management/index.md), per un progetto con attività $1,2,\dots,n$, durate $d_j>0$ e immediati predecessori.

    - **(P1)** <strong>Rete di progetto.</strong> Nodi $0$ (INIZIO), $1,2,\dots,n$ e $n+1$ (FINE), con $d_0=d_{n+1}=0$; un arco $(i,j)$ per ogni precedenza, $(0,j)$ per ogni attività senza immediati predecessori, $(j,n+1)$ per ogni attività senza successori. L'arco $(i,j)$ ha lunghezza $d_i$.

    - **(P2)** <strong>Ordine topologico.</strong> Rimuove ripetutamente il nodo senza inserire archi di indice più piccolo; se tutto i restanti nodi hanno archi entranti, le precedenze contengono un ciclo.

    - **(P3)** <strong>Passo in avanti</strong>, in ordine topologico: $\mathit{ES}_0=0$, $\mathit{ES}_j=\max_{(i,j) \in A} \mathit{EF}_i$, $\mathit{EF}_j=\mathit{ES}_j+d_j$; la durata minima del progetto è $T=\mathit{ES}_{n+1}$.

    - **(P4)** <strong>Passaggio all'indietro</strong>, in ordine inverso: $\mathit{LF}_{n+1}=T$, $\mathit{LF}_j=\min_{(j,k) \in A} \mathit{LS}_k$, $\mathit{LS}_j=\mathit{LF}_j-d_j$. Pantaloni $\mathit{TS}_j=\mathit{LS}_j-\mathit{ES}_j$ e $\mathit{FS}_j=\min_{(j,k) \in A} \mathit{ES}_k-\mathit{EF}_j$; l'arco $(i,j)$ è teso se $\mathit{ES}_j=\mathit{EF}_i$, e i percorsi critici sono i percorsi dall'INIZIO alla FINE costituiti da archi stretti.

    - **(P5)** <strong>Modifiche e LP.</strong> Se $d_j$ cresce di $\delta$, $T'=T+\max\{0,\delta-\mathit{TS}_j\}$; se diminuisce di $\delta$, $T-\delta \le T' \le T$, con $T'=T$ quando un percorso critico evita $j$. Il modello $\mathrm{PD}$ lo è $\min\{t_{n+1}-t_0 : t_j-t_i \ge d_i,\ (i,j) \in A\}$ e il suo doppio invia un'unità di flusso da INIZIO a FINE, massimizzando $\sum d_i x_{ij}$.

<a id="esercizio-9-1"></a>

!!! esercizio "Esercizio 9.1: Il passaggio in avanti e quello all'indietro"

    !!! esercizio "Esercizio"

        Un progetto ha attività $7$, numerate $1,2,\dots,7$, con i predecessori immediati e le durate (in giorni) della tabella.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>attività <span class="arithmatex">\(j\)</span> e predecessori immediati e <span class="arithmatex">\(d_j\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>—</td>
        <td><span class="arithmatex">\(9\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>—</td>
        <td><span class="arithmatex">\(2\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(8\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(7\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(4\)</span>, <span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(6\)</span> giorni</td>
        </tr>
        </table></div>

    **Domande**

    1. Disegnare la rete di progetto, con il nodo START $0$ e il nodo FINISH $8$, e darne l'ordine topologico (P2).

    2. Esegui il forward pass: fornisci $\mathit{ES}_j$ e $\mathit{EF}_j$ per ogni nodo e la durata minima del progetto $T$.

    3. Esegui il passaggio all'indietro: assegna $\mathit{LF}_j$ e $\mathit{LS}_j$ per ogni nodo.

    4. Trova il percorso critico e verifica che la sua lunghezza sia $T$.

??? soluzione "Soluzione"

    Usiamo le regole (P1)–(P5) del riquadro all'inizio di questi esercizi.

    1. Le attività $1$ e $3$ non hanno predecessori immediati e sono collegate a START; le attività $6$ e $7$ non hanno successori ed entrano FINISH. Le durate sono scritte sopra i nodi:

        ![Figura 1](../img/es-project-management/fig01.svg){ .fig loading=lazy  }

        Ogni attività ha predecessori immediati di indice più piccolo, quindi l'ordine topologico è $0,1,2,3,4,5,6,7,8$.

    2. Ogni riga elabora un nodo: i primi tempi di fine dei suoi immediati predecessori (il massimo in grassetto), quindi $\mathit{ES}_j$ e $\mathit{EF}_j$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>nodo <span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(d_j\)</span></th>
        <th><span class="arithmatex">\(\mathit{EF}_i\)</span> dei predecessori (<span class="arithmatex">\(i\)</span>)</th>
        <th><span class="arithmatex">\(\mathit{ES}_j\)</span></th>
        <th><span class="arithmatex">\(\mathit{EF}_j\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>—</td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(\mathbf{0}\)</span> (<span class="arithmatex">\(0\)</span>)</td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\mathbf{9}\)</span> (<span class="arithmatex">\(1\)</span>)</td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\mathbf{0}\)</span> (<span class="arithmatex">\(0\)</span>)</td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\mathbf{2}\)</span> (<span class="arithmatex">\(3\)</span>)</td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\mathbf{11}\)</span> (<span class="arithmatex">\(2\)</span>)</td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\mathbf{18}\)</span> (<span class="arithmatex">\(5\)</span>)</td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(10\)</span> (<span class="arithmatex">\(4\)</span>), <span class="arithmatex">\(\mathbf{18}\)</span> (<span class="arithmatex">\(5\)</span>)</td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td><span class="arithmatex">\(24\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(23\)</span> (<span class="arithmatex">\(6\)</span>), <span class="arithmatex">\(\mathbf{24}\)</span> (<span class="arithmatex">\(7\)</span>)</td>
        <td><span class="arithmatex">\(24\)</span></td>
        <td><span class="arithmatex">\(24\)</span></td>
        </tr>
        </table></div>

        La durata minima del progetto è di $T=\mathit{ES}_{8}=24$ giorni.

    3. Nell'ordine inverso ogni riga fornisce gli ultimi orari di inizio degli immediati successori (il minimo in grassetto), quindi $\mathit{LF}_j$ e $\mathit{LS}_j$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>nodo <span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(d_j\)</span></th>
        <th><span class="arithmatex">\(\mathit{LS}_k\)</span> dei successori (<span class="arithmatex">\(k\)</span>)</th>
        <th><span class="arithmatex">\(\mathit{LF}_j\)</span></th>
        <th><span class="arithmatex">\(\mathit{LS}_j\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>—</td>
        <td><span class="arithmatex">\(24\)</span></td>
        <td><span class="arithmatex">\(24\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\mathbf{24}\)</span> (<span class="arithmatex">\(8\)</span>)</td>
        <td><span class="arithmatex">\(24\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\mathbf{24}\)</span> (<span class="arithmatex">\(8\)</span>)</td>
        <td><span class="arithmatex">\(24\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(19\)</span> (<span class="arithmatex">\(6\)</span>), <span class="arithmatex">\(\mathbf{18}\)</span> (<span class="arithmatex">\(7\)</span>)</td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\mathbf{18}\)</span> (<span class="arithmatex">\(7\)</span>)</td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\mathbf{10}\)</span> (<span class="arithmatex">\(4\)</span>)</td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\mathbf{11}\)</span> (<span class="arithmatex">\(5\)</span>)</td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(\mathbf{9}\)</span> (<span class="arithmatex">\(2\)</span>)</td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\mathbf{0}\)</span> (<span class="arithmatex">\(1\)</span>), <span class="arithmatex">\(8\)</span> (<span class="arithmatex">\(3\)</span>)</td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        </table></div>

        Il pass termina con $\mathit{LS}_0=0$.

    4. Gli archi stretti che partono da INIZIO raggiungono FINE lungo un unico percorso, in blu:

        ![Figura 2](../img/es-project-management/fig02.svg){ .fig loading=lazy  }

        Il percorso critico è $\text{START},\allowbreak 1,\allowbreak 2,\allowbreak 5,\allowbreak 7,\allowbreak \text{FINISH}$, di lunghezza $9+2+7+6=24=T$.

    !!! chiave ""

        Il passaggio in avanti dà $T=24$, il passaggio all'indietro termina con $\mathit{LS}_0=0$ e il percorso critico è $\text{START},\allowbreak 1,\allowbreak 2,\allowbreak 5,\allowbreak 7,\allowbreak \text{FINISH}$.

<a id="esercizio-9-2"></a>

!!! esercizio "Esercizio 9.2: Pantaloni e il diagramma di Gantt"

    !!! esercizio "Esercizio"

        Un progetto ha attività $8$, numerate $1,2,\dots,8$, con i predecessori immediati e le durate (in giorni) della tabella.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>attività <span class="arithmatex">\(j\)</span> e predecessori immediati e <span class="arithmatex">\(d_j\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>—</td>
        <td><span class="arithmatex">\(5\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(6\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(9\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(2\)</span>, <span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(9\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(4\)</span>, <span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(6\)</span>, <span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(3\)</span> giorni</td>
        </tr>
        </table></div>

    **Domande**

    1. Calcola il primo e l'ultimo orario di inizio e fine di tutte le attività e la durata minima del progetto $T$.

    2. Calcola il margine di flessibilità totale e libero di ogni attività. Quali attività sono critiche? Indica il percorso critico.

    3. Di quanti giorni è possibile ritardare l'attività $2$ senza ritardare il progetto? E senza spostare la prima ora di inizio di qualsiasi altra attività? Quali attività si spostano se subiscono un ritardo di $\mathit{TS}_{2}$ giorni?

    4. Disegna il diagramma di Gantt della prima pianificazione, con i margini di flessibilità totali.

??? soluzione "Soluzione"

    Usiamo le regole (P1)–(P5) del riquadro all'inizio di questi esercizi.

    1. Il passaggio in avanti nell'ordine topologico $0,1,2,3,4,5,6,7,8,9$ e il passaggio all'indietro nell'ordine inverso danno:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(d_j\)</span></th>
        <th><span class="arithmatex">\(\mathit{ES}_j\)</span></th>
        <th><span class="arithmatex">\(\mathit{EF}_j\)</span></th>
        <th><span class="arithmatex">\(\mathit{LS}_j\)</span></th>
        <th><span class="arithmatex">\(\mathit{LF}_j\)</span></th>
        <th><span class="arithmatex">\(\mathit{TS}_j\)</span></th>
        <th><span class="arithmatex">\(\mathit{FS}_j\)</span></th>
        <th>critico</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>sì</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>sì</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>sì</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td><span class="arithmatex">\(24\)</span></td>
        <td><span class="arithmatex">\(28\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        <td><span class="arithmatex">\(28\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        <td><span class="arithmatex">\(28\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>sì</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(28\)</span></td>
        <td><span class="arithmatex">\(31\)</span></td>
        <td><span class="arithmatex">\(28\)</span></td>
        <td><span class="arithmatex">\(31\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>sì</td>
        </tr>
        </table></div>

        e $T=\mathit{ES}_{9}=31$ giorni.

    2. Le ultime due colonne della tabella sono $\mathit{TS}_j=\mathit{LS}_j-\mathit{ES}_j$ e $\mathit{FS}_j=\min \mathit{ES}_k-\mathit{EF}_j$. Le attività critiche, con $\mathit{TS}_j=0$, sono $1$, $3$, $5$, $7$ e $8$, e gli archi stretti da START raggiungono FINISH solo lungo $\text{START},\allowbreak 1,\allowbreak 3,\allowbreak 5,\allowbreak 7,\allowbreak 8,\allowbreak \text{FINISH}$, il percorso critico.

    3. Attività $2$ ha $\mathit{TS}_{2}=8$ e $\mathit{FS}_{2}=3$. Può iniziare $8$ con giorni di ritardo senza ritardare il progetto, ma solo $3$ con giorni di ritardo senza spostare altre attività. Con un ritardo di $8$ giorni i primi orari di inizio delle attività $4$ e $6$ si spostano di $5$ giorni e la FINE rimane a $T=31$.

    4. Barre da $\mathit{ES}_j$ a $\mathit{EF}_j$ (attività critiche in blu), caselle tratteggiate da $\mathit{EF}_j$ a $\mathit{LF}_j$:

        ![Figura 3](../img/es-project-management/fig03.svg){ .fig loading=lazy  }

        Le barre blu si susseguono senza interruzioni dal giorno $0$ al giorno $31$.

    !!! chiave ""

        $T=31$; il percorso critico è $\text{START},\allowbreak 1,\allowbreak 3,\allowbreak 5,\allowbreak 7,\allowbreak 8,\allowbreak \text{FINISH}$. L'attività $2$ può assorbire $8$ giorni di ritardo, ma solo $3$ senza spostare altre attività.

<a id="esercizio-9-3"></a>

!!! esercizio "Esercizio 9.3: Ordine topologico e precedenze incoerenti"

    !!! esercizio "Esercizio"

        Un progetto ha attività $7$, numerate $1,2,\dots,7$, con i predecessori immediati e le durate (in giorni) della tabella.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>attività <span class="arithmatex">\(j\)</span> e predecessori immediati e <span class="arithmatex">\(d_j\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(6\)</span>, <span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(2\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span>, <span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(6\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>—</td>
        <td><span class="arithmatex">\(4\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(8\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>—</td>
        <td><span class="arithmatex">\(7\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(8\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(3\)</span>, <span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span> giorni</td>
        </tr>
        </table></div>

    **Domande**

    1. Trovare l'ordine topologico della rete di progetto con (P2), dando ad ogni passo i nodi senza inserire archi.

    2. Eseguire il passaggio in avanti e fornire la durata minima del progetto $T$ e il percorso critico.

    3. Il pianificatore aggiunge la precedenza «l'attività $2$ deve essere terminata prima dell'inizio dell'attività $3$». Esegui (P2) sulla nuova rete, trova un ciclo diretto e dimostra che il nuovo progetto non ha una pianificazione.

??? soluzione "Soluzione"

    Usiamo le regole (P1)–(P5) del riquadro all'inizio di questi esercizi.

    1. La rete del progetto, con le durate sopra i nodi:

        ![Figura 4](../img/es-project-management/fig04.svg){ .fig loading=lazy  }

        Ad ogni passo viene eliminato il nodo di indice più piccolo tra i nodi senza inserire archi:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>passo e nodi senza inserire archi e rimossi</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span> e <span class="arithmatex">\(3\)</span>, <span class="arithmatex">\(5\)</span> e <span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span> e <span class="arithmatex">\(6\)</span>, <span class="arithmatex">\(7\)</span> e <span class="arithmatex">\(6\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(4\)</span>, <span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        </tr>
        </table></div>

        L'ordine topologico è $0,3,5,6,4,7,1,2,8$: le attività non sono numerate in questo ordine.

    2. Ogni riga elabora un nodo, in ordine topologico:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>nodo <span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(d_j\)</span></th>
        <th><span class="arithmatex">\(\mathit{EF}_i\)</span> dei predecessori (<span class="arithmatex">\(i\)</span>)</th>
        <th><span class="arithmatex">\(\mathit{ES}_j\)</span></th>
        <th><span class="arithmatex">\(\mathit{EF}_j\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>—</td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\mathbf{0}\)</span> (<span class="arithmatex">\(0\)</span>)</td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\mathbf{0}\)</span> (<span class="arithmatex">\(0\)</span>)</td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\mathbf{7}\)</span> (<span class="arithmatex">\(5\)</span>)</td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\mathbf{15}\)</span> (<span class="arithmatex">\(6\)</span>)</td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(4\)</span> (<span class="arithmatex">\(3\)</span>), <span class="arithmatex">\(\mathbf{7}\)</span> (<span class="arithmatex">\(5\)</span>)</td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\mathbf{15}\)</span> (<span class="arithmatex">\(6\)</span>), <span class="arithmatex">\(12\)</span> (<span class="arithmatex">\(7\)</span>)</td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(17\)</span> (<span class="arithmatex">\(1\)</span>), <span class="arithmatex">\(\mathbf{23}\)</span> (<span class="arithmatex">\(4\)</span>)</td>
        <td><span class="arithmatex">\(23\)</span></td>
        <td><span class="arithmatex">\(29\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\mathbf{29}\)</span> (<span class="arithmatex">\(2\)</span>)</td>
        <td><span class="arithmatex">\(29\)</span></td>
        <td><span class="arithmatex">\(29\)</span></td>
        </tr>
        </table></div>

        Quindi i giorni $T=\mathit{ES}_{8}=29$ e gli archi stretti danno il percorso critico $\text{START},\allowbreak 5,\allowbreak 6,\allowbreak 4,\allowbreak 2,\allowbreak \text{FINISH}$.

    3. Con il nuovo arco $(2,3)$ la regola (P2) procede come segue:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>passo e nodi senza inserire archi e rimossi</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span>, <span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span>, <span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(6\)</span>, <span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span>, <span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td>nessuno</td>
        <td>—</td>
        </tr>
        </table></div>

        Si ferma con i nodi $1$, $2$, $3$ e $7$ a sinistra, tutti con archi entranti. Andando a ritroso dal nodo $1$ lungo archi entranti troviamo il ciclo $1,2,3,7,1$. Sommando i vincoli $t_j \ge t_i+d_i$ dei suoi archi si annullano gli orari di inizio:

        $$
        0 \ge d_{1}+d_{2}+d_{3}+d_{7}=2+6+4+5=17,
        $$

        una contraddizione: le nuove precedenze non ammettono alcun calendario e il piano deve essere corretto.

    !!! chiave ""

        L'ordine topologico $0,3,5,6,4,7,1,2,8$ dà $T=29$. La precedenza $(2,3)$ chiude il ciclo $1,2,3,7,1$ e non esiste alcuna pianificazione.

<a id="esercizio-9-4"></a>

!!! esercizio "Esercizio 9.4: Due percorsi critici e cambiamenti di durate"

    !!! esercizio "Esercizio"

        Un progetto ha attività $8$, numerate $1,2,\dots,8$, con i predecessori immediati e le durate (in giorni) della tabella.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>attività <span class="arithmatex">\(j\)</span> e predecessori immediati e <span class="arithmatex">\(d_j\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>—</td>
        <td><span class="arithmatex">\(4\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(7\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>—</td>
        <td><span class="arithmatex">\(6\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(2\)</span>, <span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(6\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(6\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(3\)</span> giorni</td>
        </tr>
        </table></div>

    **Domande**

    1. Calcola il primo e l'ultimo tempo, $T$ e tutti i percorsi critici.

    2. Senza eseguire nuovamente il metodo, cosa puoi dire sulla durata minima del progetto se (i) $d_{4}$ diminuisce di $1$; (ii) $d_{1}$ diminuisce di $1$; (iii) $d_{3}$ aumenta di $7$?

    3. Controlla le tre risposte eseguendo nuovamente il passaggio in avanti e fornisci i nuovi percorsi critici.

??? soluzione "Soluzione"

    Usiamo le regole (P1)–(P5) del riquadro all'inizio di questi esercizi.

    1. Il passaggio in avanti e quello all'indietro danno:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(d_j\)</span></th>
        <th><span class="arithmatex">\(\mathit{ES}_j\)</span></th>
        <th><span class="arithmatex">\(\mathit{EF}_j\)</span></th>
        <th><span class="arithmatex">\(\mathit{LS}_j\)</span></th>
        <th><span class="arithmatex">\(\mathit{LF}_j\)</span></th>
        <th><span class="arithmatex">\(\mathit{TS}_j\)</span></th>
        <th><span class="arithmatex">\(\mathit{FS}_j\)</span></th>
        <th>critico</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>sì</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>sì</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>sì</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>sì</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>sì</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>sì</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td></td>
        </tr>
        </table></div>

        quindi $T=22$. Gli archi stretti che partono dallo START raggiungono il FINE lungo due percorsi, in blu: $\text{START},\allowbreak 1,\allowbreak 2,\allowbreak 4,\allowbreak 6,\allowbreak \text{FINISH}$ e $\text{START},\allowbreak 1,\allowbreak 2,\allowbreak 5,\allowbreak 7,\allowbreak \text{FINISH}$.

        ![Figura 5](../img/es-project-management/fig05.svg){ .fig loading=lazy  }

    2. (i) L'attività $4$ si trova solo su $\text{START},\allowbreak 1,\allowbreak 2,\allowbreak 4,\allowbreak 6,\allowbreak \text{FINISH}$; l'altro percorso critico lo evita, quindi con (P5) $T'=T=22$. (ii) L'attività $1$ si trova su entrambi i percorsi critici: da (P5), $21 \le T' \le 22$, ed entrambi i percorsi critici diventano $1$ più brevi di un giorno. (iii) L'attività $3$ ha $\mathit{TS}_{3}=5$, quindi $T'=T+\max\{0,7-5\}=24$.

    3. Esecuzione del metodo del percorso critico su ogni progetto modificato:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>modifica</th>
        <th><span class="arithmatex">\(\mathit{TS}_j\)</span> e nuovo <span class="arithmatex">\(T\)</span> e percorsi critici dopo la modifica</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(d_4=5 \to 4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td><span class="arithmatex">\(\text{START},1,2,5,7,\text{FINISH}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(d_1=4 \to 3\)</span> e <span class="arithmatex">\(0\)</span> e <span class="arithmatex">\(21\)</span> e <span class="arithmatex">\(\text{START},1,2,4,6,\text{FINISH}\)</span>; <span class="arithmatex">\(\text{START},1,2,5,7,\text{FINISH}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(d_3=6 \to 13\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(24\)</span></td>
        <td><span class="arithmatex">\(\text{START},3,4,6,\text{FINISH}\)</span></td>
        </tr>
        </table></div>

        In (ii) ogni percorso che evita l'attività $1$ dura al massimo $21$ giorni, quindi viene raggiunto il limite inferiore.

    !!! chiave ""

        Con due percorsi critici, abbreviare un'attività su uno solo di essi non abbrevia il progetto; abbreviando l'attività comune eseguita da $1$ e un ritardo di $\mathit{TS}_{3}+2$ sull'attività $3$ ritarda il progetto di $2$ giorni.

<a id="esercizio-9-5"></a>

!!! esercizio "Esercizio 9.5: Il modello LP e il suo duale"

    !!! esercizio "Esercizio"

        Un progetto ha attività $4$, numerate $1,2,\dots,4$, con i predecessori immediati e le durate (in giorni) della tabella.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>attività <span class="arithmatex">\(j\)</span> e predecessori immediati e <span class="arithmatex">\(d_j\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>—</td>
        <td><span class="arithmatex">\(8\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(9\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span> giorni</td>
        </tr>
        </table></div>

    **Domande**

    1. Scrivi il modello $\mathrm{PD}$ del progetto, con una variabile $t_j$ per nodo.

    2. Scrivi il suo modello duale $D(\mathrm{PD})$, con una variabile $x_{ij}$ per arco.

    3. Calcola $\mathit{ES}$ e $\mathit{LS}$, mostra che entrambi sono ottimali per il modello $\mathrm{PD}$ e fornisce una soluzione ottimale di $D(\mathrm{PD})$. Dimostrare l'ottimalità con dualità debole.

    4. Quali vincoli del modello $\mathrm{PD}$ valgono con l'uguaglianza in ogni soluzione ottimale?

??? soluzione "Soluzione"

    Usiamo le regole (P1)–(P5) del riquadro all'inizio di questi esercizi.

    1. La rete di progetto, con le durate sopra i nodi, ha gli archi $(0,1)$, $(1,2)$, $(1,3)$, $(1,4)$, $(2,5)$, $(3,5)$, $(4,5)$:

        ![Figura 6](../img/es-project-management/fig06.svg){ .fig loading=lazy  }

        Esiste un vincolo $t_j-t_i \ge d_i$ per arco e le variabili sono libere:

        $$
        \small
        \setlength{\arraycolsep}{3pt}
        \begin{array}{rrrrrrrcr}
        \min & -t_{0} &  &  &  &  & +t_{5} & & \\
        \text{subject to} & -t_{0} & +t_{1} &  &  &  &  & \ge & 0 \\
        &  & -t_{1} & +t_{2} &  &  &  & \ge & 8 \\
        &  & -t_{1} &  & +t_{3} &  &  & \ge & 8 \\
        &  & -t_{1} &  &  & +t_{4} &  & \ge & 8 \\
        &  &  & -t_{2} &  &  & +t_{5} & \ge & 5 \\
        &  &  &  & -t_{3} &  & +t_{5} & \ge & 9 \\
        &  &  &  &  & -t_{4} & +t_{5} & \ge & 2 \\
        & t_{0}, & t_{1}, & t_{2}, & t_{3}, & t_{4}, & t_{5} & \in & \R
        \end{array}
        $$

    2. Esiste una variabile $x_{ij} \ge 0$ per arco e un vincolo di conservazione del flusso per nodo, con $b_0=1$ e $b_{5}=-1$; gli archi che partono da START hanno lunghezza $d_0=0$:

        $$
        \small
        \setlength{\arraycolsep}{2.5pt}
        \begin{array}{rrrrrrrrcr}
        \max &  & 8\,x_{12} & +8\,x_{13} & +8\,x_{14} & +5\,x_{25} & +9\,x_{35} & +2\,x_{45} & & \\
        \text{subject to} & x_{01} &  &  &  &  &  &  & = & 1 \\
        & -x_{01} & +x_{12} & +x_{13} & +x_{14} &  &  &  & = & 0 \\
        &  & -x_{12} &  &  & +x_{25} &  &  & = & 0 \\
        &  &  & -x_{13} &  &  & +x_{35} &  & = & 0 \\
        &  &  &  & -x_{14} &  &  & +x_{45} & = & 0 \\
        &  &  &  &  & -x_{25} & -x_{35} & -x_{45} & = & -1 \\
        & x_{01}, & x_{12}, & x_{13}, & x_{14}, & x_{25}, & x_{35}, & x_{45} & \ge & 0
        \end{array}
        $$

    3. Il passaggio in avanti e quello all'indietro danno $\mathit{ES}=(0,\,0,\,8,\,8,\,8,\,17)$ e $\mathit{LS}=(0,\,0,\,12,\,8,\,15,\,17)$, entrambi con $t_{5}-t_0=17$. Entrambi soddisfano ogni vincolo del modello $\mathrm{PD}$, e differiscono sui nodi $2$, $4$: la soluzione ottimale del modello $\mathrm{PD}$ non è unica. Il percorso critico è $\text{START},\allowbreak 1,\allowbreak 3,\allowbreak \text{FINISH}$; il suo vettore di incidenza, con $x_{ij}=1$ sugli archi $(0,1)$, $(1,3)$, $(3,5)$ e $0$ altrove, è ammissibile per $D(\mathrm{PD})$ con valore $8+9=17$. Per dualità debole una soluzione ammissibile del modello $\mathrm{PD}$ e una soluzione ammissibile del suo duale con lo stesso valore sono entrambe ottimali: $z(\mathrm{PD})=z(D(\mathrm{PD}))=17$ (Gurobi conferma entrambi i valori).

    4. I vincoli degli archi del cammino critico: sommandoli, $t_{5}-t_0 \ge 17$, e una soluzione ottima ha $t_{5}-t_0=17$, quindi ciascuno di essi vale con uguaglianza. Il vincolo di ogni altro arco è rigoroso per $\mathit{ES}$ o per $\mathit{LS}$, due soluzioni ottimali:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco <span class="arithmatex">\((i,j)\)</span></th>
        <th><span class="arithmatex">\(d_i\)</span></th>
        <th><span class="arithmatex">\(\mathit{ES}_j-\mathit{ES}_i\)</span></th>
        <th><span class="arithmatex">\(\mathit{LS}_j-\mathit{LS}_i\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,2)\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,4)\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,5)\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((4,5)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        </table></div>

        In ogni riga almeno una delle due differenze è maggiore di $d_i$.

    !!! chiave ""

        $z(\mathrm{PD})=z(D(\mathrm{PD}))=17$: $\mathit{ES}$ e $\mathit{LS}$ sono pianificazioni ottimali e il percorso critico è la doppia soluzione ottimale.

<a id="esercizio-9-6"></a>

!!! esercizio "Esercizio 9.6: Proofs e counterexamples"

    !!! esercizio "Esercizio"

        Un progetto ha attività $7$, numerate $1,2,\dots,7$, con i predecessori immediati e le durate (in giorni) della tabella.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>attività <span class="arithmatex">\(j\)</span> e predecessori immediati e <span class="arithmatex">\(d_j\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>—</td>
        <td><span class="arithmatex">\(9\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(7\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(2\)</span>, <span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(6\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(9\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span> giorni</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(4\)</span>, <span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(9\)</span> giorni</td>
        </tr>
        </table></div>

    **Domande**

    1. In un progetto, due attività $i$ e $j$ non sono collegate da alcun percorso, $i$ ha già un immediato successore e $j$ un immediato predecessore. Viene aggiunta la precedenza «$i$ prima di $j$». Dimostrare che la nuova durata minima del progetto è

        $$
        T'=T+\max\{0,\ \mathit{EF}_i-\mathit{LS}_j\},
        $$

        dove $\mathit{EF}_i$, $\mathit{LS}_j$ e $T$ vengono calcolati prima della modifica.

    2. Nel progetto della tabella, calcolare i tempi e utilizzare la formula per le precedenze «$5$ prima di $6$» e «$2$ prima di $3$».

    3. Uno studente sostiene: «un percorso dall'INIZIO alla FINE fatto di attività critiche è un percorso critico». Confutare l'affermazione con un progetto di quattro attività.

??? soluzione "Soluzione"

    Usiamo le regole (P1)–(P5) del riquadro all'inizio di questi esercizi.

    1. Viene aggiunto solo un arco, $(i,j)$, poiché $i$ ha già un successore e $j$ un predecessore, e non viene visualizzato alcun ciclo, poiché nessun percorso va da $j$ a $i$. Ogni percorso che non utilizza $(i,j)$ mantiene la sua lunghezza e quello più lungo ha lunghezza $T$.

        - Un nuovo percorso è un percorso da START a $i$, l'arco $(i,j)$ di lunghezza $d_i$ e un percorso da $j$ a FINISH. I due pezzi non utilizzano $(i,j)$, altrimenti il percorso visiterebbe $i$ o $j$ due volte.

        - I pezzi più lunghi hanno lunghezze $\mathit{ES}_i$ e $T-\mathit{LS}_j$ (passaggio avanti e indietro della vecchia rete), quindi il nuovo percorso più lungo ha lunghezza $\mathit{ES}_i+d_i+T-\mathit{LS}_j=T+\mathit{EF}_i-\mathit{LS}_j$.

        - La durata minima del progetto è la lunghezza massima di un percorso dall'INIZIO alla FINE: $T'=\max\{T,\ T+\mathit{EF}_i-\mathit{LS}_j\}$.

    2. I tempi del progetto sono:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(d_j\)</span></th>
        <th><span class="arithmatex">\(\mathit{ES}_j\)</span></th>
        <th><span class="arithmatex">\(\mathit{EF}_j\)</span></th>
        <th><span class="arithmatex">\(\mathit{LS}_j\)</span></th>
        <th><span class="arithmatex">\(\mathit{LF}_j\)</span></th>
        <th><span class="arithmatex">\(\mathit{TS}_j\)</span></th>
        <th><span class="arithmatex">\(\mathit{FS}_j\)</span></th>
        <th>critico</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>sì</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>sì</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>sì</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td><span class="arithmatex">\(26\)</span></td>
        <td><span class="arithmatex">\(28\)</span></td>
        <td><span class="arithmatex">\(32\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        <td><span class="arithmatex">\(32\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        <td><span class="arithmatex">\(32\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>sì</td>
        </tr>
        </table></div>

        con $T=32$.

        - «$5$ prima di $6$»: $\mathit{EF}_{5}=23 \le 28=\mathit{LS}_{6}$, quindi $T'=T=32$: l'attività $6$ potrebbe dover iniziare più tardi di $\mathit{ES}_{6}=22$, ma entro il suo tempo libero.

        - «$2$ prima di $3$»: $\mathit{EF}_{2}=16>9=\mathit{LS}_{3}$, quindi $T'=32+16-9=39$.

        L'esecuzione del metodo del percorso critico sulle due nuove reti fornisce gli stessi valori.

    3. Partecipa alle attività $1,2,3,4$ con durate $d_1=1$, $d_2=2$, $d_3=2$, $d_4=1$, dove $1$ precede $3$ e $4$ e $2$ precede $4$:

        ![Figura 7](../img/es-project-management/fig07.svg){ .fig loading=lazy  }

        Il passaggio in avanti fornisce $\mathit{ES}=(0,0,0,1,2,3)$ per i nodi $0,1,\dots,5$ e $T=3$. I due percorsi critici $\text{START},\allowbreak 1,\allowbreak 3,\allowbreak \text{FINISH}$ e $\text{START},\allowbreak 2,\allowbreak 4,\allowbreak \text{FINISH}$ (blu) contengono tutte le attività, quindi ogni attività è critica. Il percorso $\text{START},\allowbreak 1,\allowbreak 4,\allowbreak \text{FINISH}$ utilizza solo attività critiche, ma la sua lunghezza è $1+1=2<3$: il suo arco $(1,4)$ non è stretto, $\mathit{EF}_1=1<2=\mathit{ES}_4$.

    !!! chiave ""

        Aggiungendo la precedenza «$i$ prima di $j$» ritarda il progetto di $\max\{0,\mathit{EF}_i-\mathit{LS}_j\}$; un percorso di attività critiche è critico solo se i suoi archi sono stretti.
