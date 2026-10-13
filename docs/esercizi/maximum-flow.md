---
title: "Esercizi · Flusso massimo"
---

# Esercizi · Flusso massimo

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 5** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 5: Flusso massimo](../flussi/maximum-flow/index.md) · [:material-file-pdf-box: Eserciziario, volume 3 (PDF)](../pdf/esercizi-3-flussi.pdf)

</div>

!!! formula "Regole utilizzate in questi esercizi"

    Le definizioni e gli algoritmi del capitolo [«Flusso massimo»](../flussi/maximum-flow/index.md), per una grafo $G=(N,A)$ senza archi opposti, con capacità $u_{ij}$, una sorgente $s$ e un pozzo $t$.

    - **(M1)** <strong>Flussi e tagli.</strong> Un flusso ammissibile ha $0 \le x_{ij} \le u_{ij}$ e conservazione in ogni nodo diversi da $s$ e $t$; il suo valore $v$ è il deflusso netto di $s$. Per ogni $s$–$t$ tagliato $(S,N \setminus S)$,

        $$
        v=x(\delta^+(S))-x(\delta^-(S)) \le u(S,N \setminus S)=\sum_{(i,j) \in \delta^+(S)} u_{ij} ,
        $$

        con uguaglianza se e solo se gli archi anteriori del taglio sono saturi e i suoi archi posteriori vuoti.

    - **(M2)** <strong>Rete residua.</strong> Per $(i,j) \in A$: l'arco in avanti $(i,j)$ con $r_{ij}=u_{ij}-x_{ij}$ se $x_{ij}<u_{ij}$, l'arco all'indietro $(j,i)$ con $r_{ji}=x_{ij}$ se $x_{ij}>0$. Lungo un percorso aumentante $P$ il il collo di bottiglia è $\delta=\min_{(i,j) \in P} r_{ij}$: $x_{ij}$ cresce di $\delta$ sugli archi anteriori di $P$ e diminuisce da $\delta$ sugli archi di $G$ il cui arco indietro è in $P$.

    - **(M3)** <strong>Ricerca.</strong> La ricerca di $G(\vet{x})$ da $s$ scansiona gli archi residui che escono da ciascun nodo per indice crescente della testa, e si ferma non appena viene etichettato $t$; il percorso aumentante è il percorso del predecessori. Ford–Fulkerson utilizza la ricerca in profondità ($\mathit{LIST}$ è uno stack), Edmonds–Karp la ricerca in ampiezza ricerca ($\mathit{LIST}$ è una coda).

    - **(M4)** <strong>Stop.</strong> Se la ricerca non etichetta $t$, il flusso è massimo e l'insieme $S$ degli elementi etichettati i nodi danno un taglio minimo, con $v=u(S,N \setminus S)$.

    - **(M5)** <strong>Edmonds–Karp.</strong> Le distanze $d_{\vet{x}}(i)$ (il minor numero di archi da $s$ in $G(\vet{x})$) mai diminuire; un arco di $P$ con $r_{ij}=\delta$ è critico; al massimo potenziamenti $n\,m$.

    - **(M6)** <strong>Applicazioni.</strong> Abbinamento: archi $(s,i)$, $(i,j)$, $(j,t)$ con portata $1$, lati con flusso $1$ formano una corrispondenza massima. Con tutte le capacità $1$, il valore massimo è il numero massimo di percorsi arcodisgiunti da $s$ a $t$ e il numero minimo di archi la cui rimozione non lascia tale percorso.

<a id="esercizio-5-1"></a>

!!! esercizio "Esercizio 5.1: La rete residua"

    !!! esercizio "Esercizio"

        Consideriamo la rete $G=(N,A)$ con $N=\{1,2,\dots,6\}$, sorgente $s=1$, sink $t=6$, gli archi $9$

        $$
        A=\{(1,2),(1,3),(2,3),(2,4),(2,5),(3,5),(4,3),(4,6),(5,6)\},
        $$

        e le capacità $u_{ij}$ della tabella. Un metodo che aumenta solo i flussi si è fermato al flusso $\bar{\vet{x}}$ della tabella, disegnata con $\bar{x}_{ij}/u_{ij}$ sugli archi.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,2)\)</span></th>
        <th><span class="arithmatex">\((1,3)\)</span></th>
        <th><span class="arithmatex">\((2,3)\)</span></th>
        <th><span class="arithmatex">\((2,4)\)</span></th>
        <th><span class="arithmatex">\((2,5)\)</span></th>
        <th><span class="arithmatex">\((3,5)\)</span></th>
        <th><span class="arithmatex">\((4,3)\)</span></th>
        <th><span class="arithmatex">\((4,6)\)</span></th>
        <th><span class="arithmatex">\((5,6)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u_{ij}\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\bar{x}_{ij}\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        </table></div>

        ![Figura 1](../img/es-maximum-flow/fig01.svg){ .fig loading=lazy  }

    **Domande**

    1. Verificare che $\bar{\vet{x}}$ sia un flusso ammissibile e calcolarne il valore.

    2. Disegna la rete residua $G(\bar{\vet{x}})$, con le capacità residue.

    3. Trovare il percorso di aumento dato dalla ricerca in profondità di (M3), il suo collo di bottiglia e il flusso dopo l'aumento.

    4. Dimostrare che il nuovo flusso è massimo.

??? soluzione "Soluzione"

    Usiamo le regole (M1)–(M6) del riquadro all'inizio di questi esercizi.

    1. Tutti i flussi sono compresi tra $0$ e la capacità. Ai nodi $2,\dots,5$ l'afflusso è uguale al deflusso: nodo $2$: $3=2+1+0$, nodo $3$: $0+2+0=2$, nodo $4$: $1=0+1$, nodo $5$: $0+2=2$. Il valore è il deflusso netto di $s=1$:

        $$
        v=\bar{x}_{12}+\bar{x}_{13}=3+0=3.
        $$

    2. Ogni arco con $\bar{x}_{ij}<u_{ij}$ dà un arco in avanti con $r_{ij}=u_{ij}-\bar{x}_{ij}$, ogni arco con $\bar{x}_{ij}>0$ un arco all'indietro $(j,i)$ con $r_{ji}=\bar{x}_{ij}$. La rete residua ha archi $13$; quelli indietro, tratteggiati, sono $(2,1)$, $(3,2)$, $(4,2)$, $(5,3)$, $(6,4)$, $(6,5)$.

        ![Figura 2](../img/es-maximum-flow/fig02.svg){ .fig loading=lazy  }

    3. La ricerca approfondita etichetta $1,3,2,4,6$, in questo ordine, e trova

        $$
        P=1,3,2,4,6, \qquad \delta=\min\{4,2,7,8\}=2,
        $$

        attraverso l'arco rovescio $(3,2)$: il flusso su $(2,3)$ diminuisce. Il nuovo flusso è

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,2)\)</span></th>
        <th><span class="arithmatex">\((1,3)\)</span></th>
        <th><span class="arithmatex">\((2,3)\)</span></th>
        <th><span class="arithmatex">\((2,4)\)</span></th>
        <th><span class="arithmatex">\((2,5)\)</span></th>
        <th><span class="arithmatex">\((3,5)\)</span></th>
        <th><span class="arithmatex">\((4,3)\)</span></th>
        <th><span class="arithmatex">\((4,6)\)</span></th>
        <th><span class="arithmatex">\((5,6)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\tilde{x}_{ij}\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        </table></div>

        con valore $3+2=5$.

    4. In $G(\tilde{\vet{x}})$ la ricerca da $1$ etichetta solo i nodi di $S=\{1,3,5\}$, quindi non esiste alcun percorso aumentante. Per $S=\{1,3,5\}$ gli archi in avanti $(1,2)$, $(5,6)$ sono saturati e gli archi all'indietro $(2,3)$, $(2,5)$, $(4,3)$ sono vuoti. Quindi

        $$
        u(S,N \setminus S)=3+2=5=v,
        $$

        e per (M1) nessun flusso ha un valore maggiore: $\tilde{\vet{x}}$ è massimo (gli archi anteriori del taglio sono verdi, i nodi di $S$ ombreggiati).

        ![Figura 3](../img/es-maximum-flow/fig03.svg){ .fig loading=lazy  }

    !!! chiave ""

        Il flusso $\bar{\vet{x}}$ di valore $3$ non può essere migliorato solo con archi in avanti; un aumento attraverso l'arco rovescio $(3,2)$ raggiunge il valore massimo $5$, certificato dal taglio $S=\{1,3,5\}$.

<a id="esercizio-5-2"></a>

!!! esercizio "Esercizio 5.2: L'algoritmo Ford-Fulkerson"

    !!! esercizio "Esercizio"

        Consideriamo la rete $G=(N,A)$ con $N=\{1,2,\dots,7\}$, sorgente $s=1$, sink $t=7$, gli archi $10$

        $$
        A=\{(1,2),(1,3),(2,4),(3,6),(4,3),(4,5),(5,2),(5,6),(5,7),(6,7)\},
        $$

        e le portate della tabella, sempre accanto agli archi in figura.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,2)\)</span></th>
        <th><span class="arithmatex">\((1,3)\)</span></th>
        <th><span class="arithmatex">\((2,4)\)</span></th>
        <th><span class="arithmatex">\((3,6)\)</span></th>
        <th><span class="arithmatex">\((4,3)\)</span></th>
        <th><span class="arithmatex">\((4,5)\)</span></th>
        <th><span class="arithmatex">\((5,2)\)</span></th>
        <th><span class="arithmatex">\((5,6)\)</span></th>
        <th><span class="arithmatex">\((5,7)\)</span></th>
        <th><span class="arithmatex">\((6,7)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u_{ij}\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        </tr>
        </table></div>

        ![Figura 4](../img/es-maximum-flow/fig04.svg){ .fig loading=lazy  }

    **Domande**

    1. Eseguire l'algoritmo Ford–Fulkerson dal flusso zero, con la ricerca in profondità di (M3): per ogni iterazione fornire il percorso aumentante, le sue capacità residue, $\delta$ e il nuovo valore.

    2. Fornire la portata massima e un taglio minimo e verificare che il valore sia uguale alla capacità del taglio.

    3. Quale iterazione utilizza un arco all'indietro e quale flusso di $G$ diminuisce?

??? soluzione "Soluzione"

    Usiamo le regole (M1)–(M6) del riquadro all'inizio di questi esercizi.

    1. <strong>Iterazione 1</strong><br> La ricerca etichetta i nodi $1,2,4,3,6,7$, in questo ordine. Il percorso aumentante è $P=1,2,4,3,6,7$; le sue capacità residue sono $6,5,8,2,5$, quindi $\delta=2$. Nuovi flussi: $x_{12}=0+2=2$, $x_{24}=0+2=2$, $x_{43}=0+2=2$, $x_{36}=0+2=2$, $x_{67}=0+2=2$; il valore diventa $v=2$.

        <strong>Iterazione 2</strong><br> La ricerca etichetta i nodi $1,2,4,3,5,6,7$, in questo ordine. Il percorso aumentante è $P=1,2,4,5,6,7$; le sue capacità residue sono $4,3,5,1,3$, quindi $\delta=1$. Nuovi flussi: $x_{12}=2+1=3$, $x_{24}=2+1=3$, $x_{45}=0+1=1$, $x_{56}=0+1=1$, $x_{67}=2+1=3$; il valore diventa $v=3$.

        <strong>Iterazione 3</strong><br> La ricerca etichetta i nodi $1,2,4,3,5,7$, in questo ordine. Il percorso aumentante è $P=1,2,4,5,7$; le sue capacità residue sono $3,2,4,4$, quindi $\delta=2$. Nuovi flussi: $x_{12}=3+2=5$, $x_{24}=3+2=5$, $x_{45}=1+2=3$, $x_{57}=0+2=2$; il valore diventa $v=5$.

        <strong>Iterazione 4</strong><br> La ricerca etichetta i nodi $1,2,3,4,5,7$, in questo ordine. Il percorso aumentante è $P=1,3,4,5,7$; le sue capacità residue sono $9,2,2,2$, quindi $\delta=2$. Utilizza l'arco all'indietro $(3,4)$. Nuovi flussi: $x_{13}=0+2=2$, $x_{43}=2-2=0$, $x_{45}=3+2=5$, $x_{57}=2+2=4$; il valore diventa $v=7$.

        <strong>Iterazione 5</strong><br> La ricerca etichetta solo i nodi di $S=\{1,2,3\}$: $t$ non è etichettato e l'algoritmo si ferma con $v=7$.

        In breve:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>iterazione e percorso aumentante</th>
        <th><span class="arithmatex">\(r_{ij}\)</span> su <span class="arithmatex">\(P\)</span></th>
        <th>archi all'indietro</th>
        <th><span class="arithmatex">\(\delta\)</span></th>
        <th><span class="arithmatex">\(v\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1,2,4,3,6,7\)</span></td>
        <td><span class="arithmatex">\(6,5,8,2,5\)</span></td>
        <td>–</td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1,2,4,5,6,7\)</span></td>
        <td><span class="arithmatex">\(4,3,5,1,3\)</span></td>
        <td>–</td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1,2,4,5,7\)</span></td>
        <td><span class="arithmatex">\(3,2,4,4\)</span></td>
        <td>–</td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1,3,4,5,7\)</span></td>
        <td><span class="arithmatex">\(9,2,2,2\)</span></td>
        <td><span class="arithmatex">\((3,4)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        </tr>
        </table></div>

    2. Il flusso massimo è

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,2)\)</span></th>
        <th><span class="arithmatex">\((1,3)\)</span></th>
        <th><span class="arithmatex">\((2,4)\)</span></th>
        <th><span class="arithmatex">\((3,6)\)</span></th>
        <th><span class="arithmatex">\((4,3)\)</span></th>
        <th><span class="arithmatex">\((4,5)\)</span></th>
        <th><span class="arithmatex">\((5,2)\)</span></th>
        <th><span class="arithmatex">\((5,6)\)</span></th>
        <th><span class="arithmatex">\((5,7)\)</span></th>
        <th><span class="arithmatex">\((6,7)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\tilde{x}_{ij}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u_{ij}\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        </tr>
        </table></div>

        con valore $\tilde{v}=7$. L'ultima ricerca etichetta $S=\{1,2,3\}$. Per $S=\{1,2,3\}$ gli archi in avanti $(2,4)$, $(3,6)$ sono saturati e gli archi all'indietro $(4,3)$, $(5,2)$ sono vuoti. Quindi

        $$
        u(S,N \setminus S)=5+2=7=v,
        $$

        quindi il flusso è massimo e il taglio è minimo. Nella figura gli archi anteriori del taglio sono verdi e i nodi di $S$ ombreggiati.

        ![Figura 5](../img/es-maximum-flow/fig05.svg){ .fig loading=lazy  }

        <strong>Unicità.</strong> I tagli minimi, di capacità $7$, sono $S=\{1,2,3\}$, $S=\{1,2,3,4\}$, $S=\{1,2,3,4,5\}$. Per (M1) ogni flusso massimo satura i loro archi in avanti e svuota i loro archi all'indietro: $x_{24}=5$, $x_{36}=2$, $x_{43}=0$, $x_{45}=5$, $x_{52}=0$, $x_{56}=1$, $x_{57}=4$. La conservazione fissa poi gli altri archi: al nodo $2$, $x_{12}=5$; al nodo $3$, $x_{13}=2$; al nodo $6$, $x_{67}=3$. Pertanto $\tilde{\vet{x}}$ è l'unico flusso massimo.

    3. L'iterazione $4$ utilizza l'arco all'indietro $(3,4)$: il flusso su $(4,3)$ diminuisce di $\delta=2$, annullando parte di una scelta precedente della ricerca in profondità.

    !!! chiave ""

        Ford–Fulkerson realizza potenziamenti $4$ e raggiunge $\tilde{v}=7$; l'ultima ricerca restituisce il taglio minimo $S=\{1,2,3\}$ di portata $7$.

<a id="esercizio-5-3"></a>

!!! esercizio "Esercizio 5.3: L'algoritmo di Edmonds-Karp"

    !!! esercizio "Esercizio"

        Consideriamo la rete $G=(N,A)$ con $N=\{1,2,\dots,7\}$, sorgente $s=1$, sink $t=7$, gli archi $10$

        $$
        A=\{(1,2),(1,3),(2,4),(2,5),(3,4),(3,6),(4,6),(5,4),(5,7),(6,7)\},
        $$

        e le portate della tabella, sempre accanto agli archi in figura.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,2)\)</span></th>
        <th><span class="arithmatex">\((1,3)\)</span></th>
        <th><span class="arithmatex">\((2,4)\)</span></th>
        <th><span class="arithmatex">\((2,5)\)</span></th>
        <th><span class="arithmatex">\((3,4)\)</span></th>
        <th><span class="arithmatex">\((3,6)\)</span></th>
        <th><span class="arithmatex">\((4,6)\)</span></th>
        <th><span class="arithmatex">\((5,4)\)</span></th>
        <th><span class="arithmatex">\((5,7)\)</span></th>
        <th><span class="arithmatex">\((6,7)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u_{ij}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        </table></div>

        ![Figura 6](../img/es-maximum-flow/fig06.svg){ .fig loading=lazy  }

    **Domande**

    1. Eseguire l'algoritmo Edmonds–Karp dal flusso zero: per ogni iterazione fornire il percorso aumentante, il suo numero di archi, le sue capacità residue, $\delta$ e il nuovo valore.

    2. Fornire le distanze $d_{\vet{x}}(i)$ di tutti i nodi della rete residua prima di ogni ricerca, verificare che non diminuiscano mai, ed elencare gli archi critici di ogni aumento.

    3. Fornisce il flusso massimo e un taglio minimo. Su questa rete l'algoritmo Ford–Fulkerson con la ricerca in profondità effettua aumenti $4$: confronta.

??? soluzione "Soluzione"

    Usiamo le regole (M1)–(M6) del riquadro all'inizio di questi esercizi.

    1. <strong>Iterazione 1</strong><br> La ricerca etichetta i nodi $1,2,3,4,5,6,7$, in questo ordine. Il percorso aumentante è $P=1,2,5,7$, con archi $3$; le sue capacità residue sono $5,7,9$, quindi $\delta=5$. Nuovi flussi: $x_{12}=0+5=5$, $x_{25}=0+5=5$, $x_{57}=0+5=5$; il valore diventa $v=5$.

        <strong>Iterazione 2</strong><br> La ricerca etichetta i nodi $1,3,4,6,7$, in questo ordine. Il percorso aumentante è $P=1,3,6,7$, con archi $3$; le sue capacità residue sono $5,1,2$, quindi $\delta=1$. Nuovi flussi: $x_{13}=0+1=1$, $x_{36}=0+1=1$, $x_{67}=0+1=1$; il valore diventa $v=6$.

        <strong>Iterazione 3</strong><br> La ricerca etichetta i nodi $1,3,4,6,7$, in questo ordine. Il percorso aumentante è $P=1,3,4,6,7$, con archi $4$; le sue capacità residue sono $4,1,2,1$, quindi $\delta=1$. Nuovi flussi: $x_{13}=1+1=2$, $x_{34}=0+1=1$, $x_{46}=0+1=1$, $x_{67}=1+1=2$; il valore diventa $v=7$.

        <strong>Iterazione 4</strong><br> La ricerca etichetta solo i nodi di $S=\{1,3\}$: $t$ non è etichettato e l'algoritmo si ferma con $v=7$.

    2. Le distanze vengono calcolate mediante una ricerca in ampiezza completa della rete residua:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>prima della ricerca</th>
        <th><span class="arithmatex">\(d(1)\)</span></th>
        <th><span class="arithmatex">\(d(2)\)</span></th>
        <th><span class="arithmatex">\(d(3)\)</span></th>
        <th><span class="arithmatex">\(d(4)\)</span></th>
        <th><span class="arithmatex">\(d(5)\)</span></th>
        <th><span class="arithmatex">\(d(6)\)</span></th>
        <th><span class="arithmatex">\(d(7)\)</span></th>
        </tr>
        <tr>
        <td>iterazione <span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td>iterazione <span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td>iterazione <span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        </tr>
        <tr>
        <td>ferma</td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        </tr>
        </table></div>

        Ogni colonna non è decrescente, come afferma (M5). Gli archi critici, con $r_{ij}=\delta$, sono: iterazione $1$: $(1,2)$; iterazione $2$: $(3,6)$; iterazione $3$: $(3,4)$, $(6,7)$.

    3. Il flusso massimo è

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,2)\)</span></th>
        <th><span class="arithmatex">\((1,3)\)</span></th>
        <th><span class="arithmatex">\((2,4)\)</span></th>
        <th><span class="arithmatex">\((2,5)\)</span></th>
        <th><span class="arithmatex">\((3,4)\)</span></th>
        <th><span class="arithmatex">\((3,6)\)</span></th>
        <th><span class="arithmatex">\((4,6)\)</span></th>
        <th><span class="arithmatex">\((5,4)\)</span></th>
        <th><span class="arithmatex">\((5,7)\)</span></th>
        <th><span class="arithmatex">\((6,7)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\tilde{x}_{ij}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u_{ij}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        </table></div>

        con valore $\tilde{v}=7$. L'ultima ricerca etichetta $S=\{1,3\}$. Per $S=\{1,3\}$ gli archi in avanti $(1,2)$, $(3,4)$, $(3,6)$ sono saturati e non sono presenti archi all'indietro. Quindi

        $$
        u(S,N \setminus S)=5+1+1=7=v,
        $$

        quindi il taglio è minimo (archi anteriori in verde, nodi di $S$ ombreggiati).

        ![Figura 7](../img/es-maximum-flow/fig07.svg){ .fig loading=lazy  }

        Edmonds–Karp necessita di potenziamenti $3$, rispetto allo $4$ di Ford–Fulkerson; entrambi sono molto al di sotto del limite $n\,m=70$ di (M5).

        <strong>Unicità.</strong> I tagli minimi, di capacità $7$, sono $S=\{1,3\}$, $S=\{1,3,4,6\}$. Per (M1) ogni flusso massimo satura i loro archi in avanti e svuota i loro archi all'indietro: $x_{12}=5$, $x_{24}=0$, $x_{34}=1$, $x_{36}=1$, $x_{54}=0$, $x_{67}=2$. La conservazione fissa poi gli altri archi: al nodo $1$, $x_{13}=2$; al nodo $2$, $x_{25}=5$; al nodo $4$, $x_{46}=1$; al nodo $5$, $x_{57}=5$. Pertanto $\tilde{\vet{x}}$ è l'unico flusso massimo.

    !!! chiave ""

        Edmonds–Karp raggiunge $\tilde{v}=7$ negli aumenti $3$ lungo percorsi con archi $3,3,4$; le distanze non diminuiscono mai, ed il taglio $S=\{1,3\}$ è minimo.

<a id="esercizio-5-4"></a>

!!! esercizio "Esercizio 5.4: Tagli minimi"

    !!! esercizio "Esercizio"

        Consideriamo la rete $G=(N,A)$ con $N=\{1,2,\dots,6\}$, sorgente $s=1$, sink $t=6$, gli archi $8$

        $$
        A=\{(1,2),(1,3),(2,4),(3,4),(4,5),(4,6),(5,3),(5,6)\},
        $$

        e le capacità intere della tabella, sempre accanto agli archi in figura.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,2)\)</span></th>
        <th><span class="arithmatex">\((1,3)\)</span></th>
        <th><span class="arithmatex">\((2,4)\)</span></th>
        <th><span class="arithmatex">\((3,4)\)</span></th>
        <th><span class="arithmatex">\((4,5)\)</span></th>
        <th><span class="arithmatex">\((4,6)\)</span></th>
        <th><span class="arithmatex">\((5,3)\)</span></th>
        <th><span class="arithmatex">\((5,6)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u_{ij}\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        </tr>
        </table></div>

        ![Figura 8](../img/es-maximum-flow/fig08.svg){ .fig loading=lazy  }

    **Domande**

    1. Elenca i tagli $s$–$t$ con le relative capacità e trova tutti i tagli minimi.

    2. Controllare che il flusso $\vet{x}$ indicato sotto sia massimo.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th><span class="arithmatex">\((1,2)\)</span></th>
        <th><span class="arithmatex">\((1,3)\)</span></th>
        <th><span class="arithmatex">\((2,4)\)</span></th>
        <th><span class="arithmatex">\((3,4)\)</span></th>
        <th><span class="arithmatex">\((4,5)\)</span></th>
        <th><span class="arithmatex">\((4,6)\)</span></th>
        <th><span class="arithmatex">\((5,3)\)</span></th>
        <th><span class="arithmatex">\((5,6)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(x_{ij}\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        </table></div>

    3. Dimostrare che, con capacità intere, innalzando $u_{ij}$ di un'unità si aumenta il valore massimo se e solo se $(i,j)$ è un arco anteriore di ogni taglio minimo.

    4. Per quali archi di questa rete l'aumento della capacità di un'unità aumenta il valore massimo?

??? soluzione "Soluzione"

    Usiamo le regole (M1)–(M6) del riquadro all'inizio di questi esercizi.

    1. Sono presenti tagli $2^{4}=16$; accanto a ciascun set $S$, la sua capacità:

        $$
        \begin{array}{cc|cc|cc|cc}
        \hline {S} & {u} & {S} & {u} & {S} & {u} & {S} & {u} \\
        \hline {\{1\}} & {9} & {\{1,2\}} & {9} & {\{1,3\}} & {16} & {\{1,4\}} & {21} \\
        {\{1,5\}} & {18} & {\{1,2,3\}} & {16} & {\{1,2,4\}} & {14} & {\{1,2,5\}} & {18} \\
        {\{1,3,4\}} & {19} & {\{1,3,5\}} & {24} & {\{1,4,5\}} & {26} & {\{1,2,3,4\}} & {12} \\
        {\{1,2,3,5\}} & {24} & {\{1,2,4,5\}} & {19} & {\{1,3,4,5\}} & {23} & {\{1,2,3,4,5\}} & {16} \\
        \hline
        \end{array}
        $$

        La capacità minima è $9$, raggiunta dai tagli $2$ $S=\{1\}$, $S=\{1,2\}$.

    2. Il flusso è fattibile: ogni arco trasporta un flusso tra $0$ e la sua capacità, e in ogni nodo diverso da $1$ e $6$ l'afflusso è uguale al deflusso. Il suo valore è $9$, pari alla capacità di taglio minima: di (M1) nessun flusso è migliore. Ad esempio, per $S=\{1\}$ gli archi diretti $(1,2)$, $(1,3)$ sono saturati e gli archi posteriori non esistono.

    3. Sia $\tilde{v}$ il valore massimo e $\vet{u}'$ le capacità con $u'_{ij}=u_{ij}+1$. La capacità di un taglio aumenta di $1$ se $(i,j)$ è uno dei suoi archi in avanti e non cambia altrimenti.

        - Se $(i,j)$ è un arco in avanti di ogni taglio minimo, ogni taglio minimo ottiene la capacità $\tilde{v}+1$. Ogni altro taglio aveva una capacità intera maggiore di $\tilde{v}$, quindi almeno $\tilde{v}+1$, e non diminuisce. La nuova capacità di taglio minima è $\tilde{v}+1$ e, secondo il teorema di taglio minimo del flusso massimo, lo è anche il nuovo valore massimo.

        - Se un taglio minimo $(S,N \setminus S)$ non ha $(i,j)$ come arco in avanti, la sua capacità rimane $\tilde{v}$ e ogni flusso per $\vet{u}'$ ha un valore massimo di $\tilde{v}$ di (M1). Il vecchio flusso massimo è ancora fattibile, quindi il valore massimo rimane $\tilde{v}$.

        Con capacità frazionarie la prima parte fallisce: un taglio non minimo può essere inferiore a un'unità sopra $\tilde{v}$.

    4. Con la domanda 3, cerchiamo gli archi che sono archi in avanti di tutti i tagli minimi:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>arco</th>
        <th>arco in avanti di</th>
        <th>valore massimo con <span class="arithmatex">\(u_{ij}+1\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,2)\)</span></td>
        <td><span class="arithmatex">\(S=\{1\}\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,3)\)</span></td>
        <td>ogni taglio minimo</td>
        <td><span class="arithmatex">\(10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,4)\)</span></td>
        <td><span class="arithmatex">\(S=\{1,2\}\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,4)\)</span></td>
        <td>nessun taglio minimo</td>
        <td><span class="arithmatex">\(9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((4,5)\)</span></td>
        <td>nessun taglio minimo</td>
        <td><span class="arithmatex">\(9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((4,6)\)</span></td>
        <td>nessun taglio minimo</td>
        <td><span class="arithmatex">\(9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((5,3)\)</span></td>
        <td>nessun taglio minimo</td>
        <td><span class="arithmatex">\(9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((5,6)\)</span></td>
        <td>nessun taglio minimo</td>
        <td><span class="arithmatex">\(9\)</span></td>
        </tr>
        </table></div>

        Il valore massimo cresce solo per l'arco $(1,3)$, da $9$ a $10$. Gli archi $(1,2)$, $(2,4)$ appartengono ad alcuni tagli minimi ma non a tutti, e sollevarli non cambia nulla.

    !!! chiave ""

        Il valore massimo è $9$, con tagli minimi $2$; a tutti appartiene solo l'arco $(1,3)$ e solo aumentandone la portata si aumenta il valore massimo.

<a id="esercizio-5-5"></a>

!!! esercizio "Esercizio 5.5: Corrispondenza massima"

    !!! esercizio "Esercizio"

        Quattro lavoratori $V_1=\{1,2,3,4\}$ e quattro lavori $V_2=\{5,6,7,8\}$ formano il grafo bipartito $H=(V_1 \cup V_2,E)$, con un lato $\{i,j\}$ quando il lavoratore $i$ può eseguire il lavoro $j$:

        $$
        E=\big\{\{1,5\},\{2,6\},\{2,7\},\{2,8\},\{3,5\},\{4,5\},\{4,6\}\big\}.
        $$

        ![Figura 9](../img/es-maximum-flow/fig09.svg){ .fig loading=lazy  }

    **Domande**

    1. Costruisci la rete di $H$ (M6), con i nodi nell'ordine $s,1,2,\dots,8,t$.

    2. Esegui l'algoritmo Edmonds–Karp dal flusso zero.

    3. Dare un abbinamento massimo ed il taglio minimo riscontrato in battuta.

    4. Sia $S$ l'insieme etichettato dall'ultima ricerca e $C=(V_1 \setminus S) \cup (V_2 \cap S)$. Controlla che ogni lato abbia un punto finale in $C$ e deduci ancora che nessuna corrispondenza ha più lati di quello trovato.

??? soluzione "Soluzione"

    Usiamo le regole (M1)–(M6) del riquadro all'inizio di questi esercizi.

    1. La rete ha gli archi $(s,i)$ per $i \in V_1$, gli archi $(i,j)$ per i lati $7$ e gli archi $(j,t)$ per $j \in V_2$, tutti con capacità $1$: archi $15$ in tutto.

    2. <strong>Iterazione 1</strong><br> La ricerca etichetta i nodi $s,1,2,3,4,5,6,7,8,t$, in questo ordine. Il percorso aumentante è $P=s,1,5,t$, con archi $3$; le sue capacità residue sono $1,1,1$, quindi $\delta=1$. Nuovi flussi: $x_{s1}=0+1=1$, $x_{15}=0+1=1$, $x_{5t}=0+1=1$; il valore diventa $v=1$.

        <strong>Iterazione 2</strong><br> La ricerca etichetta i nodi $s,2,3,4,6,7,8,5,t$, in questo ordine. Il percorso aumentante è $P=s,2,6,t$, con archi $3$; le sue capacità residue sono $1,1,1$, quindi $\delta=1$. Nuovi flussi: $x_{s2}=0+1=1$, $x_{26}=0+1=1$, $x_{6t}=0+1=1$; il valore diventa $v=2$.

        <strong>Iterazione 3</strong><br> La ricerca etichetta i nodi $s,3,4,5,6,1,2,7,8,t$, in questo ordine. Il percorso aumentante è $P=s,4,6,2,7,t$, con archi $5$; le sue capacità residue sono $1,1,1,1,1$, quindi $\delta=1$. Utilizza l'arco all'indietro $(6,2)$. Nuovi flussi: $x_{s4}=0+1=1$, $x_{46}=0+1=1$, $x_{26}=1-1=0$, $x_{27}=0+1=1$, $x_{7t}=0+1=1$; il valore diventa $v=3$.

        <strong>Iterazione 4</strong><br> La ricerca etichetta solo i nodi di $S=\{s,1,3,5\}$: $t$ non è etichettato e l'algoritmo si ferma con $v=3$.

    3. I lati con flusso $1$ danno il corrispondente $M=\{\{1,5\},\{2,7\},\{4,6\}\}$, con lati $3$; non è l'unico abbinamento massimo (ci sono $4$). L'iterazione $3$ riassegna i lavori attraverso l'arco all'indietro $(6,2)$. L'ultima ricerca etichetta $S=\{s,1,3,5\}$; gli archi anteriori del taglio sono $(s,2)$, $(s,4)$, $(5,t)$, con portata $3=|M|$, quindi l'adattamento è massimo.

        ![Figura 10](../img/es-maximum-flow/fig10.svg){ .fig loading=lazy  }

    4. Qui $C=\{2,4,5\}$, con nodi $3$. Ogni lato $\{i,j\}$ ha $i \in C$ o $j \in C$: $\{1,5\}$ di $5$, $\{2,6\}$ di $2$, $\{2,7\}$ di $2$, $\{2,8\}$ di $2$, $\{3,5\}$ di $5$, $\{4,5\}$ di $4$, $\{4,6\}$ di $4$. I lati di una corrispondenza non hanno un punto finale comune, quindi ognuno di essi utilizza un nodo diverso di $C$: nessuna corrispondenza ha più di $|C|=3$ lati.

    !!! chiave ""

        La corrispondenza massima ha lati $3$, un lavoro rimane libero; il taglio dell'ultima ricerca e i nodi $3$ di $C$ certificano che non esiste corrispondenza maggiore.

<a id="esercizio-5-6"></a>

!!! esercizio "Esercizio 5.6: Cammini arcodisgiunti"

    !!! esercizio "Esercizio"

        Consideriamo il grafo orientato $G=(N,A)$ con $N=\{1,2,\dots,8\}$ e gli archi $12$

        $$
        A=\{(1,2),(1,3),(1,4),(2,5),(3,7),(4,3),(4,7),(5,6),(5,8),(6,4),(6,8),(7,8)\}.
        $$

        Cerchiamo percorsi da $s=1$ a $t=8$ senza arco comune.

        ![Figura 11](../img/es-maximum-flow/fig11.svg){ .fig loading=lazy  }

    **Domande**

    1. Assegna ad ogni arco la capacità $1$ ed esegui l'algoritmo Edmonds–Karp dal flusso zero.

    2. Decompone il flusso massimo in percorsi archidisgiunti da $1$ a $8$.

    3. Trova un insieme minimo di archi la cui rimozione non lascia alcun percorso da $1$ a $8$. L'insieme degli archi che escono dal nodo $1$ è un tale insieme minimo?

??? soluzione "Soluzione"

    Usiamo le regole (M1)–(M6) del riquadro all'inizio di questi esercizi.

    1. <strong>Iterazione 1</strong><br> La ricerca etichetta i nodi $1,2,3,4,5,7,6,8$, in questo ordine. Il percorso aumentante è $P=1,2,5,8$, con archi $3$; le sue capacità residue sono $1,1,1$, quindi $\delta=1$. Nuovi flussi: $x_{12}=0+1=1$, $x_{25}=0+1=1$, $x_{58}=0+1=1$; il valore diventa $v=1$.

        <strong>Iterazione 2</strong><br> La ricerca etichetta i nodi $1,3,4,7,8$, in questo ordine. Il percorso aumentante è $P=1,3,7,8$, con archi $3$; le sue capacità residue sono $1,1,1$, quindi $\delta=1$. Nuovi flussi: $x_{13}=0+1=1$, $x_{37}=0+1=1$, $x_{78}=0+1=1$; il valore diventa $v=2$.

        <strong>Iterazione 3</strong><br> La ricerca etichetta solo i nodi di $S=\{1,3,4,7\}$: $t$ non è etichettato e l'algoritmo si ferma con $v=2$.

    2. Gli archi con flusso $1$ sono $(1,2)$, $(1,3)$, $(2,5)$, $(3,7)$, $(5,8)$, $(7,8)$. Seguendoli da $1$, ogni arco una volta, fornisce i percorsi

        $$
        1,2,5,8, \qquad 1,3,7,8,
        $$

        senza arco comune. Per (M6) nessuna famiglia di percorsi arcodisgiunti ha più di percorsi $2$.

    3. Le ultime etichette di ricerca $S=\{1,3,4,7\}$ e gli archi anteriori del taglio sono $(1,2)$, $(7,8)$: la rimozione di questi archi $2$ non lascia alcun percorso da $1$ a $8$, poiché ogni percorso di questo tipo lascia $S$ attraverso uno di essi. Meno archi non sono sufficienti, perché ciascuno dei percorsi $2$ disgiunti da archi necessita del proprio arco rimosso. Gli archi $3$ che escono dal nodo $1$ disconnettono anche $1$ da $8$, ma non sono un insieme minimo: il taglio $S=\{1\}$ ha capacità $3>2$. I tagli minimi sono $S=\{1,3,4,7\}$, $S=\{1,2,3,4,7\}$.

    !!! chiave ""

        Al massimo i percorsi archi-disgiunti $2$ vanno da $1$ a $8$ e gli archi $2$ del taglio $S=\{1,3,4,7\}$ li disconnettono.
