---
title: "La passata all'indietro: i tempi al più tardi"
---

# 9.4 La passata all'indietro: i tempi al più tardi { #sez-pm-sec-backward }

<div class="info-capitolo" markdown>

**Parte 5 · Gestione dei progetti · Capitolo 9** · [:material-book-open-variant: Capitolo 9: Gestione dei progetti](index.md) · [:material-file-pdf-box: Dispensa, volume 5 (PDF)](../../pdf/dispensa-5-gestione-dei-progetti.pdf) · [:material-presentation: Slide](../../pdf/slide-project-management.pdf) · [:material-pencil: Esercizi: Gestione dei progetti](../../esercizi/project-management.md) · [:material-gesture-tap: App: Il metodo del cammino critico (CPM)](../../laboratorio/cammino-critico-cpm.md)

</div>

- Quanto dopo $\mathit{ES}_j$ può iniziare un'attività senza ritardare il progetto? Rispondono i tempi al più tardi, supponendo che non ci siano altri ritardi.

<a id="box-13-pm-def-latest"></a>

!!! definizione "Definizione 9.10: tempi di inizio e di fine al più tardi"

    Sia $T=\mathit{ES}_{n+1}$. La <strong>fine al più tardi</strong> $\mathit{LF}_j$ e l'<strong>inizio al più tardi</strong> $\mathit{LS}_j$ dei nodi si calcolano nell'ordine topologico inverso con la <strong>passata all'indietro</strong>:

    $$
    \mathit{LF}_{n+1}=T, \qquad \mathit{LF}_j=\min_{(j,k) \in \delta^+(j)} \mathit{LS}_k, \quad \forall j \in N \setminus \{n+1\}, \qquad
    \mathit{LS}_j=\mathit{LF}_j-d_j, \quad \forall j \in N .
    $$

- È la <strong>regola della fine al più tardi</strong>: la fine al più tardi di un'attività è il minimo inizio al più tardi dei suoi successori immediati. I successori immediati non possono iniziare prima che l'attività sia terminata, quindi l'attività deve terminare in tempo perché tutti possano iniziare entro il loro inizio al più tardi.

<a id="box-14-pm-th-latest"></a>

!!! teorema "Teorema 9.11: tempi al più tardi"

    Per ogni nodo $j \in N$, $T-\mathit{LS}_j$ è la lunghezza di un cammino massimo da $j$ a FINISH. Inoltre $\mathit{LS}$ è un calendario di durata $T$, e ogni calendario $\vet{t}$ con $t_{n+1} \le T$ soddisfa $t_j \le \mathit{LS}_j$ per ogni $j \in N$.

??? dimostrazione "Dimostrazione"

    Dimostriamo la prima e l'ultima affermazione per induzione lungo l'ordine topologico inverso.

    1. <em>Nodo $n+1$.</em> L'unico cammino da $n+1$ a FINISH ha lunghezza $0=T-\mathit{LS}_{n+1}$, e $t_{n+1} \le T=\mathit{LS}_{n+1}$.

    2. <em>Cammini massimi.</em> Sia $j \neq n+1$. Ogni cammino da $j$ a FINISH è un arco $(j,k) \in \delta^+(j)$, di lunghezza $d_j$, seguito da un cammino da $k$ a FINISH. Per induzione la sua lunghezza massima è

        $$
        d_j+\max_{(j,k) \in \delta^+(j)} \big(T-\mathit{LS}_k\big)=d_j+T-\mathit{LF}_j=T-\mathit{LS}_j .
        $$

    3. <em>Limite superiore.</em> Per ogni arco $(j,k) \in \delta^+(j)$, per induzione $t_j \le t_k-d_j \le \mathit{LS}_k-d_j$; quindi $t_j \le \mathit{LF}_j-d_j=\mathit{LS}_j$.

    4. <em>$\mathit{LS}$ è un calendario.</em> $\mathit{LS}_k \ge \mathit{LF}_j=\mathit{LS}_j+d_j$ per ogni arco $(j,k) \in A$, per il minimo nella definizione. Inoltre $\mathit{LS}_{n+1}=T$, e $\mathit{LS}_0=T-T=0$, perché un cammino massimo da START a FINISH ha lunghezza $T$. <span class="qed">□</span>

- In ogni calendario di durata $T$, il nodo $j$ inizia fra $\mathit{ES}_j$ e $\mathit{LS}_j$, ed entrambi gli estremi sono raggiunti, dai calendari $\mathit{ES}$ e $\mathit{LS}$.

<a id="box-15-pm-ex-backward"></a>

!!! esempio "Esempio 9.4: la passata all'indietro sul caso di studio"

    La passata all'indietro elabora i nodi nell'ordine $15,14,\dots,0$. Ogni riga riporta gli inizi al più tardi dei successori immediati (il minimo in grassetto), poi $\mathit{LF}_j$ e $\mathit{LS}_j$.

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

    La passata termina con $\mathit{LS}_0=0$, come prevede il <span style="color:#1971c2">[Teorema 9.11](#box-14-pm-th-latest)</span>. Per esempio, l'attività $9$ deve terminare entro $\mathit{LF}_9=\mathit{LS}_{10}=25$, quindi deve iniziare entro $\mathit{LS}_9=18$, due settimane dopo il suo inizio al più presto $\mathit{ES}_9=16$. Nella figura, accanto a ogni nodo, la sua durata (in blu) e i suoi tempi al più tardi.

    ![Figura 3](../../img/project-management/fig03.svg){ .fig loading=lazy  }

!!! chiave ""

    La passata all'indietro calcola, in ordine topologico inverso, $\mathit{LF}_j=\min \mathit{LS}_k$ sui successori immediati e $\mathit{LS}_j=\mathit{LF}_j-d_j$, partendo da $\mathit{LF}_{n+1}=T$. $T-\mathit{LS}_j$ è la lunghezza di un cammino massimo da $j$ a FINISH, e in ogni calendario di durata $T$ il nodo $j$ inizia fra $\mathit{ES}_j$ e $\mathit{LS}_j$.

---

**Avanti:** [9.5 Scorte e attività critiche](scorte-e-attivita-critiche.md)
