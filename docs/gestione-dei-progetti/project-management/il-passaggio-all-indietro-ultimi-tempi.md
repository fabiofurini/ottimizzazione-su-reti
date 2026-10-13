---
title: "Il passaggio all'indietro: ultimi tempi"
---

# 9.4 Il passaggio all'indietro: ultimi tempi { #sez-pm-sec-backward }

<div class="info-capitolo" markdown>

**Parte 5 · Gestione dei progetti · Capitolo 9** · [:material-book-open-variant: Capitolo 9: Gestione dei progetti](index.md) · [:material-file-pdf-box: Dispensa, volume 5 (PDF)](../../pdf/dispensa-5-gestione-dei-progetti.pdf) · [:material-pencil: Esercizi: Gestione dei progetti](../../esercizi/project-management.md)

</div>

- Quanto tempo dopo $\mathit{ES}_j$ può iniziare un'attività senza ritardare il progetto? Gli ultimi tempi rispondono, presupponendo che non si verifichi nessun altro ritardo.

<a id="box-13-pm-def-latest"></a>

!!! definizione "Definizione 9.10: ultimi orari di inizio e fine"

    Lascia che $T=\mathit{ES}_{n+1}$. <strong>ultima ora di fine</strong> $\mathit{LF}_j$ e <strong>ultima ora di inizio</strong> $\mathit{LS}_j$ dei nodi vengono calcolati nell'ordine topologico inverso da <strong>passaggio all'indietro</strong>:

    $$
    \mathit{LF}_{n+1}=T, \qquad \mathit{LF}_j=\min_{(j,k) \in \delta^+(j)} \mathit{LS}_k, \quad \forall j \in N \setminus \{n+1\}, \qquad
    \mathit{LS}_j=\mathit{LF}_j-d_j, \quad \forall j \in N .
    $$

- Questa è la <strong>regola dell'ultima ora di fine</strong>: l'ultima ora di fine di un'attività è la più piccola ora di inizio dei suoi immediati successori. Gli immediati successori non potranno iniziare prima che l'attività sia terminata, quindi l'attività deve terminare in tempo affinché tutte possano iniziare entro l'ultimo orario di inizio.

<a id="box-14-pm-th-latest"></a>

!!! teorema "Teorema 9.11: ultimi orari"

    Per ogni nodo $j \in N$, $T-\mathit{LS}_j$ è la lunghezza del percorso più lungo da $j$ a FINISH. Inoltre, $\mathit{LS}$ è un programma di durata $T$, e ogni programma $\vet{t}$ con $t_{n+1} \le T$ soddisfa $t_j \le \mathit{LS}_j$ per ogni $j \in N$.

??? dimostrazione "Dimostrazione"

    Dimostriamo la prima e l'ultima affermazione per induzione lungo l'ordine topologico inverso.

    1. <em>Nodo $n+1$.</em> L'unico percorso da $n+1$ a FINISH ha lunghezza $0=T-\mathit{LS}_{n+1}$ e $t_{n+1} \le T=\mathit{LS}_{n+1}$.

    2. <em>Percorsi più lunghi.</em> Lascia $j \neq n+1$. Ogni percorso da $j$ a FINISH è un arco $(j,k) \in \delta^+(j)$, di lunghezza $d_j$, seguito da un percorso da $k$ a FINISH. Per induzione la sua lunghezza massima è

        $$
        d_j+\max_{(j,k) \in \delta^+(j)} \big(T-\mathit{LS}_k\big)=d_j+T-\mathit{LF}_j=T-\mathit{LS}_j .
        $$

    3. <em>Limite superiore.</em> Per ogni arco $(j,k) \in \delta^+(j)$, per induzione $t_j \le t_k-d_j \le \mathit{LS}_k-d_j$; quindi $t_j \le \mathit{LF}_j-d_j=\mathit{LS}_j$.

    4. <em>$\mathit{LS}$ è una pianificazione.</em> $\mathit{LS}_k \ge \mathit{LF}_j=\mathit{LS}_j+d_j$ per ogni arco $(j,k) \in A$, dal minimo nel definizione. Inoltre $\mathit{LS}_{n+1}=T$ e $\mathit{LS}_0=T-T=0$, poiché il percorso più lungo da INIZIO a FINE ha lunghezza $T$. <span class="qed">□</span>

- In ogni programma di durata $T$, il nodo $j$ inizia tra $\mathit{ES}_j$ e $\mathit{LS}_j$ ed entrambi gli estremi sono raggiunto, secondo gli orari $\mathit{ES}$ e $\mathit{LS}$.

<a id="box-15-pm-ex-backward"></a>

!!! esempio "Esempio 9.4: il passaggio all'indietro sul caso di studio"

    Il passaggio all'indietro elabora i nodi nell'ordine $15,14,\dots,0$. Ogni riga fornisce gli ultimi orari di inizio del successori immediati (il minimo in grassetto), quindi $\mathit{LF}_j$ e $\mathit{LS}_j$.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>nodo <span class="arithmatex">\(j\)</span></th>
    <th><span class="arithmatex">\(d_j\)</span></th>
    <th><span class="arithmatex">\(\mathit{LS}_k\)</span> dei successori (<span class="arithmatex">\(k\)</span>)</th>
    <th><span class="arithmatex">\(\mathit{LF}_j\)</span></th>
    <th><span class="arithmatex">\(\mathit{LS}_j\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(15\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td>—</td>
    <td><span class="arithmatex">\(44\)</span></td>
    <td><span class="arithmatex">\(44\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(14\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(\mathbf{44}\)</span> (<span class="arithmatex">\(15\)</span>)</td>
    <td><span class="arithmatex">\(44\)</span></td>
    <td><span class="arithmatex">\(38\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(13\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(\mathbf{44}\)</span> (<span class="arithmatex">\(15\)</span>)</td>
    <td><span class="arithmatex">\(44\)</span></td>
    <td><span class="arithmatex">\(42\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(12\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(\mathbf{38}\)</span> (<span class="arithmatex">\(14\)</span>)</td>
    <td><span class="arithmatex">\(38\)</span></td>
    <td><span class="arithmatex">\(33\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(11\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(\mathbf{38}\)</span> (<span class="arithmatex">\(14\)</span>)</td>
    <td><span class="arithmatex">\(38\)</span></td>
    <td><span class="arithmatex">\(34\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(8\)</span></td>
    <td><span class="arithmatex">\(34\)</span> (<span class="arithmatex">\(11\)</span>), <span class="arithmatex">\(\mathbf{33}\)</span> (<span class="arithmatex">\(12\)</span>)</td>
    <td><span class="arithmatex">\(33\)</span></td>
    <td><span class="arithmatex">\(25\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(9\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(\mathbf{25}\)</span> (<span class="arithmatex">\(10\)</span>)</td>
    <td><span class="arithmatex">\(25\)</span></td>
    <td><span class="arithmatex">\(18\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(8\)</span></td>
    <td><span class="arithmatex">\(9\)</span></td>
    <td><span class="arithmatex">\(\mathbf{42}\)</span> (<span class="arithmatex">\(13\)</span>)</td>
    <td><span class="arithmatex">\(42\)</span></td>
    <td><span class="arithmatex">\(33\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(\mathbf{33}\)</span> (<span class="arithmatex">\(8\)</span>)</td>
    <td><span class="arithmatex">\(33\)</span></td>
    <td><span class="arithmatex">\(26\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(\mathbf{25}\)</span> (<span class="arithmatex">\(10\)</span>)</td>
    <td><span class="arithmatex">\(25\)</span></td>
    <td><span class="arithmatex">\(20\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(\mathbf{20}\)</span> (<span class="arithmatex">\(6\)</span>), <span class="arithmatex">\(33\)</span> (<span class="arithmatex">\(8\)</span>)</td>
    <td><span class="arithmatex">\(20\)</span></td>
    <td><span class="arithmatex">\(16\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(\mathbf{26}\)</span> (<span class="arithmatex">\(7\)</span>)</td>
    <td><span class="arithmatex">\(26\)</span></td>
    <td><span class="arithmatex">\(20\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(20\)</span> (<span class="arithmatex">\(4\)</span>), <span class="arithmatex">\(\mathbf{16}\)</span> (<span class="arithmatex">\(5\)</span>), <span class="arithmatex">\(18\)</span> (<span class="arithmatex">\(9\)</span>)</td>
    <td><span class="arithmatex">\(16\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(\mathbf{6}\)</span> (<span class="arithmatex">\(3\)</span>)</td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(\mathbf{2}\)</span> (<span class="arithmatex">\(2\)</span>)</td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(\mathbf{0}\)</span> (<span class="arithmatex">\(1\)</span>)</td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    </tr>
    </table></div>

    Il passaggio termina con $\mathit{LS}_0=0$, come previsto da <span style="color:#1971c2">[Teorema 9.11](#box-14-pm-th-latest)</span>. Ad esempio, l'attività $9$ deve terminare entro $\mathit{LF}_9=\mathit{LS}_{10}=25$, quindi deve iniziare entro $\mathit{LS}_9=18$, due settimane dopo la prima ora di inizio $\mathit{ES}_9=16$. Nella figura, accanto ad ogni nodo, la sua durata (blu) e i suoi ultimi tempi.

    ![Figura 3](../../img/project-management/fig03.svg){ .fig loading=lazy  }

!!! chiave ""

    Il passaggio all'indietro calcola, in ordine topologico inverso, $\mathit{LF}_j=\min \mathit{LS}_k$ sugli immediati successori e $\mathit{LS}_j=\mathit{LF}_j-d_j$, a partire da $\mathit{LF}_{n+1}=T$. $T-\mathit{LS}_j$ è la lunghezza del percorso più lungo da $j$ a FINISH e in ogni programma di durata $T$ il nodo $j$ inizia tra $\mathit{ES}_j$ e $\mathit{LS}_j$.

---

**Avanti:** [9.5 Margini e attività critiche](margini-e-attivita-critiche.md)
