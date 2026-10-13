---
title: "Il passaggio in avanti: i primi tempi"
---

# 9.3 Il passaggio in avanti: i primi tempi { #sez-pm-sec-forward }

<div class="info-capitolo" markdown>

**Parte 5 · Gestione dei progetti · Capitolo 9** · [:material-book-open-variant: Capitolo 9: Gestione dei progetti](index.md) · [:material-file-pdf-box: Dispensa, volume 5 (PDF)](../../pdf/dispensa-5-gestione-dei-progetti.pdf) · [:material-pencil: Esercizi: Gestione dei progetti](../../esercizi/project-management.md)

</div>

- Assumiamo innanzitutto che non si verifichi alcun ritardo: ogni attività assume la sua durata stimata e inizia non appena i suoi immediati predecessori sono finiti.

<a id="box-9-pm-def-earliest"></a>

!!! definizione "Definizione 9.7: primi orari di inizio e fine"

    Sia $v_0,v_1,\dots,v_{n+1}$ un ordine topologico della rete del progetto. <strong>prima ora di inizio</strong> $\mathit{ES}_j$ e <strong>prima ora di fine</strong> $\mathit{EF}_j$ dei nodi vengono calcolati in questo ordine dal <strong>passaggio in avanti</strong>:

    $$
    \mathit{ES}_0=0, \qquad \mathit{ES}_j=\max_{(i,j) \in \delta^-(j)} \mathit{EF}_i, \quad \forall j \in N \setminus \{0\}, \qquad
    \mathit{EF}_j=\mathit{ES}_j+d_j, \quad \forall j \in N .
    $$

- Questa è la <strong>regola dell'ora di inizio più remota</strong>: la prima ora di inizio di un'attività è la prima tempo di fine dei suoi immediati predecessori. Quando il nodo $j$ viene elaborato, i suoi predecessori lo precedono nel file ordine topologico, quindi sono noti i primi tempi di fine.

- Come in [Capitolo 3](../../alberi-e-cammini/shortest-paths/percorsi-piu-brevi-nei-grafici-aciclici.md), l'ordine topologico rimuove, ad ogni passo, il nodo senza inserire archi di <strong>indice più piccolo</strong>. Il nodo $0$ viene rimosso per primo.

<a id="box-10-pm-th-earliest"></a>

!!! teorema "Teorema 9.8: primi tempi"

    Per ogni nodo $j \in N$, $\mathit{ES}_j$ è la lunghezza del percorso più lungo da START a $j$. Inoltre, $\mathit{ES}$ è un programma, e ogni programma $\vet{t}$ soddisfa $t_j \ge \mathit{ES}_j$ per ogni $j \in N$.

??? dimostrazione "Dimostrazione"

    Dimostriamo la prima e l'ultima affermazione per induzione lungo l'ordine topologico.

    1. <em>Nodo $0$.</em> Nessun arco entra in START: l'unico percorso da START a $0$ non ha archi e ha lunghezza $0=\mathit{ES}_0$ e ogni pianificazione ha $t_0=0=\mathit{ES}_0$.

    2. <em>Percorsi più lunghi.</em> Lascia $j \neq 0$. Ogni percorso da START a $j$ è un percorso da START ad alcuni $i$ seguito da un arco $(i,j) \in \delta^-(j)$ di lunghezza $d_i$ e $i$ viene prima di $j$. Per induzione la sua lunghezza massima è

        $$
        \max_{(i,j) \in \delta^-(j)} \big(\mathit{ES}_i+d_i\big)=\max_{(i,j) \in \delta^-(j)} \mathit{EF}_i=\mathit{ES}_j .
        $$

    3. <em>Limite inferiore.</em> Per ogni arco $(i,j) \in \delta^-(j)$, per induzione $t_j \ge t_i+d_i \ge \mathit{ES}_i+d_i=\mathit{EF}_i$; quindi $t_j \ge \mathit{ES}_j$.

    4. <em>$\mathit{ES}$ è una pianificazione.</em> $\mathit{ES}_0=0$ e $\mathit{ES}_j \ge \mathit{EF}_i=\mathit{ES}_i+d_i$ per ogni arco $(i,j) \in A$, dal massimo nella definizione. <span class="qed">□</span>

<a id="box-11-pm-th-duration"></a>

!!! teorema "Teorema 9.9: durata minima del progetto"

    In (H1) e (H2), la durata minima del progetto è $T=\mathit{ES}_{n+1}$, la lunghezza di un percorso critico e la pianificazione $\mathit{ES}$ ci riesce.

??? dimostrazione "Dimostrazione"

    Per <span style="color:#1971c2">[Teorema 9.8](#box-10-pm-th-earliest)</span>, $\mathit{ES}$ è un programma di durata $\mathit{ES}_{n+1}$, e ogni programma ha $t_{n+1} \ge \mathit{ES}_{n+1}$: quindi $T=\mathit{ES}_{n+1}$. Per lo stesso teorema, $\mathit{ES}_{n+1}$ è la lunghezza del percorso più lungo dall'INIZIO alla FINE, cioè di un percorso critico. <span class="qed">□</span>

- Vengono utilizzate entrambe le ipotesi: (H1) rende fisse le lunghezze dei percorsi e (H2) rende le precedenze gli unici vincoli di un programma.

- Il passaggio in avanti è l'algoritmo per i grafi aciclici di [Capitolo 3 «Il più breve percorsi»](../../alberi-e-cammini/shortest-paths/percorsi-piu-brevi-nei-grafici-aciclici.md), con il massimo al posto del minimo: con le lunghezze dell'arco $-d_i$, quell'algoritmo calcola le etichette $d(j)=-\mathit{ES}_j$. Un percorso più lungo è facile da trovare perché la rete è aciclica.

<a id="box-12-pm-ex-forward"></a>

!!! esempio "Esempio 9.3: il passaggio in avanti del caso di studio"

    Nel caso di studio ogni attività ha predecessori immediati di indice più piccolo, così è l'ordine topologico $0,1,2,\dots,15$. Ogni riga elabora un nodo: i primi tempi di fine dei suoi immediati predecessori (il massimo in grassetto), quindi $\mathit{ES}_j$ e $\mathit{EF}_j$.

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
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(\mathbf{0}\)</span> (<span class="arithmatex">\(0\)</span>)</td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(\mathbf{2}\)</span> (<span class="arithmatex">\(1\)</span>)</td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(\mathbf{6}\)</span> (<span class="arithmatex">\(2\)</span>)</td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(16\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(\mathbf{16}\)</span> (<span class="arithmatex">\(3\)</span>)</td>
    <td><span class="arithmatex">\(16\)</span></td>
    <td><span class="arithmatex">\(22\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(\mathbf{16}\)</span> (<span class="arithmatex">\(3\)</span>)</td>
    <td><span class="arithmatex">\(16\)</span></td>
    <td><span class="arithmatex">\(20\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(\mathbf{20}\)</span> (<span class="arithmatex">\(5\)</span>)</td>
    <td><span class="arithmatex">\(20\)</span></td>
    <td><span class="arithmatex">\(25\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(\mathbf{22}\)</span> (<span class="arithmatex">\(4\)</span>)</td>
    <td><span class="arithmatex">\(22\)</span></td>
    <td><span class="arithmatex">\(29\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(8\)</span></td>
    <td><span class="arithmatex">\(9\)</span></td>
    <td><span class="arithmatex">\(20\)</span> (<span class="arithmatex">\(5\)</span>), <span class="arithmatex">\(\mathbf{29}\)</span> (<span class="arithmatex">\(7\)</span>)</td>
    <td><span class="arithmatex">\(29\)</span></td>
    <td><span class="arithmatex">\(38\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(9\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(\mathbf{16}\)</span> (<span class="arithmatex">\(3\)</span>)</td>
    <td><span class="arithmatex">\(16\)</span></td>
    <td><span class="arithmatex">\(23\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(8\)</span></td>
    <td><span class="arithmatex">\(\mathbf{25}\)</span> (<span class="arithmatex">\(6\)</span>), <span class="arithmatex">\(23\)</span> (<span class="arithmatex">\(9\)</span>)</td>
    <td><span class="arithmatex">\(25\)</span></td>
    <td><span class="arithmatex">\(33\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(11\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(\mathbf{33}\)</span> (<span class="arithmatex">\(10\)</span>)</td>
    <td><span class="arithmatex">\(33\)</span></td>
    <td><span class="arithmatex">\(37\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(12\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(\mathbf{33}\)</span> (<span class="arithmatex">\(10\)</span>)</td>
    <td><span class="arithmatex">\(33\)</span></td>
    <td><span class="arithmatex">\(38\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(13\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(\mathbf{38}\)</span> (<span class="arithmatex">\(8\)</span>)</td>
    <td><span class="arithmatex">\(38\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(14\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(37\)</span> (<span class="arithmatex">\(11\)</span>), <span class="arithmatex">\(\mathbf{38}\)</span> (<span class="arithmatex">\(12\)</span>)</td>
    <td><span class="arithmatex">\(38\)</span></td>
    <td><span class="arithmatex">\(44\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(15\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(40\)</span> (<span class="arithmatex">\(13\)</span>), <span class="arithmatex">\(\mathbf{44}\)</span> (<span class="arithmatex">\(14\)</span>)</td>
    <td><span class="arithmatex">\(44\)</span></td>
    <td><span class="arithmatex">\(44\)</span></td>
    </tr>
    </table></div>

    Il nodo FINITURA dà $T=\mathit{ES}_{15}=44$: se tutto rispetta i tempi previsti, il progetto viene completato in $44$ settimane. Dentro la figura, accanto a ciascun nodo, la sua durata (blu) e i suoi primi tempi.

    ![Figura 2](../../img/project-management/fig02.svg){ .fig loading=lazy  }

!!! chiave ""

    Il passaggio in avanti calcola, in ordine topologico, $\mathit{ES}_j=\max \mathit{EF}_i$ rispetto ai predecessori immediati e $\mathit{EF}_j=\mathit{ES}_j+d_j$. $\mathit{ES}_j$ è la lunghezza del percorso più lungo da START a $j$ e $T=\mathit{ES}_{n+1}$ è la lunghezza di un percorso critico.

---

**Avanti:** [9.4 Il passaggio all'indietro: ultimi tempi](il-passaggio-all-indietro-ultimi-tempi.md)
