---
title: "Margini e attività critiche"
---

# 9.5 Margini e attività critiche { #sez-pm-sec-slacks }

<div class="info-capitolo" markdown>

**Parte 5 · Gestione dei progetti · Capitolo 9** · [:material-book-open-variant: Capitolo 9: Gestione dei progetti](index.md) · [:material-file-pdf-box: Dispensa, volume 5 (PDF)](../../pdf/dispensa-5-gestione-dei-progetti.pdf) · [:material-pencil: Esercizi: Gestione dei progetti](../../esercizi/project-management.md)

</div>

<a id="box-16-pm-def-slacks"></a>

!!! definizione "Definizione 9.12: allentamenti e archi stretti"

    Per ogni attività $j \in \{1,2,\dots,n\}$:

    - <strong>margine totale</strong> è $\mathit{TS}_j=\mathit{LS}_j-\mathit{ES}_j=\mathit{LF}_j-\mathit{EF}_j$;

    - <strong>margine libero</strong> è $\mathit{FS}_j=\min_{(j,k) \in \delta^+(j)} \mathit{ES}_k-\mathit{EF}_j$.

    Un arco $(i,j) \in A$ è <strong>stretto</strong> se $\mathit{ES}_j=\mathit{EF}_i$.

- Le due differenze in $\mathit{TS}_j$ coincidono, poiché entrambe le coppie di orari differiscono per $d_j$.

- Il margine di flessibilità totale è il ritardo dell'attività $j$ che non ritarda il progetto; il margine libero è il ritardo che non sposta la prima ora di inizio di qualsiasi altra attività. I due risultati seguenti precisano queste definizioni.

<a id="box-17-pm-th-total"></a>

!!! teorema "Teorema 9.13: attività critiche e flessibilità totali"

    Per ogni attività $j$, sia $L_j$ la lunghezza massima di un percorso dall'INIZIO alla FINE attraverso $j$. Quindi:

    - **(a)** $\mathit{TS}_j=T-L_j \ge 0$, quindi $\mathit{TS}_j=0$ se e solo se $j$ è critico;

    - **(b)** per ogni $\delta$ con $0 \le \delta \le \mathit{TS}_j$ è previsto un programma di durata $T$ con $t_j=\mathit{ES}_j+\delta$ e nessun programma di durata $T$ ha $t_j>\mathit{ES}_j+\mathit{TS}_j$.

??? dimostrazione "Dimostrazione"

    1. Un percorso da INIZIO a FINE attraverso $j$ è un percorso da INIZIO a $j$ seguito da un percorso da $j$ a FINE e la sua lunghezza è la somma delle due lunghezze. Prendendo quelli più lunghi, di <span style="color:#1971c2">[Teorema 9.8](il-passaggio-in-avanti-i-primi-tempi.md#box-10-pm-th-earliest)</span> e <span style="color:#1971c2">[Teorema 9.11](il-passaggio-all-indietro-ultimi-tempi.md#box-14-pm-th-latest)</span>,

        $$
        L_j=\mathit{ES}_j+\big(T-\mathit{LS}_j\big)=T-\mathit{TS}_j .
        $$

    2. Ogni percorso da INIZIO a FINE ha lunghezza al massimo $T$, quindi $\mathit{TS}_j \ge 0$, con uguaglianza se e solo se un percorso fino a $j$ ha lunghezza $T$, ovvero $j$ è critico.

    3. Se $\mathit{TS}_j>0$, lascia $\lambda=\delta/\mathit{TS}_j \in [0,1]$. $\mathit{ES}$ e $\mathit{LS}$ sono orari di durata $T$, e il i vincoli di una pianificazione sono lineari, quindi $(1-\lambda)\mathit{ES}+\lambda\mathit{LS}$ è una pianificazione di durata $T$, con $t_j=\mathit{ES}_j+\lambda\,\mathit{TS}_j=\mathit{ES}_j+\delta$. Se $\mathit{TS}_j=0$, allora $\delta=0$ e $\mathit{ES}$ funzionano.

    4. Per <span style="color:#1971c2">[Teorema 9.11](il-passaggio-all-indietro-ultimi-tempi.md#box-14-pm-th-latest)</span>, ogni programma di durata $T$ ha $t_j \le \mathit{LS}_j=\mathit{ES}_j+\mathit{TS}_j$. <span class="qed">□</span>

<a id="box-18-pm-prop-free"></a>

!!! teorema "Proposizione 9.14: lasco libero"

    Per ogni attività $j$, $0 \le \mathit{FS}_j \le \mathit{TS}_j$. Inoltre, per ogni $\delta$ con $0 \le \delta \le \mathit{FS}_j$, il gli orari di inizio $\mathit{ES}$ con $\mathit{ES}_j+\delta$ al posto di $\mathit{ES}_j$ formano un programma di durata $T$: l'attività $j$ è ritardata di $\delta$ e ogni altro nodo mantiene la prima ora di inizio.

??? dimostrazione "Dimostrazione"

    1. Con il passaggio in avanti, $\mathit{ES}_k \ge \mathit{EF}_j$ per ogni arco $(j,k)$, quindi $\mathit{FS}_j \ge 0$. Inoltre $\mathit{ES}_k \le \mathit{LS}_k$ per ogni nodo $k$, da <span style="color:#1971c2">[Teorema 9.13](#box-17-pm-th-total)</span> per le attività e da allora $\mathit{ES}_{n+1}=\mathit{LS}_{n+1}=T$. Quindi

        $$
        \mathit{FS}_j=\min_{(j,k) \in \delta^+(j)} \mathit{ES}_k-\mathit{EF}_j \le \min_{(j,k) \in \delta^+(j)} \mathit{LS}_k-\mathit{EF}_j=\mathit{LF}_j-\mathit{EF}_j=\mathit{TS}_j .
        $$

    2. Cambiano solo i vincoli degli archi di $j$. Per $(i,j) \in \delta^-(j)$: $\mathit{ES}_j+\delta \ge \mathit{ES}_j \ge \mathit{EF}_i$. For $(j,k) \in \delta^+(j)$: $\mathit{ES}_k \ge \mathit{EF}_j+\mathit{FS}_j \ge (\mathit{ES}_j+\delta)+d_j$.

    3. La durata è ancora $\mathit{ES}_{n+1}=T$, da $j \neq n+1$. <span class="qed">□</span>

<a id="box-19-pm-th-tight"></a>

!!! teorema "Teorema 9.15: i percorsi critici sono percorsi di archi stretti"

    Un percorso $P$ dall'INIZIO alla FINE è critico se e solo se tutti i suoi archi sono stretti.

??? dimostrazione "Dimostrazione"

    Lascia che $P=i_0,i_1,\dots,i_k$ con $i_0=0$ e $i_k=n+1$. Ogni arco ha $\mathit{ES}_{i_{s+1}}-\mathit{EF}_{i_s} \ge 0$. Sommando oltre gli archi di $P$, il telescopio con i primi tempi di inizio:

    $$
    \sum_{s=0}^{k-1} \big(\mathit{ES}_{i_{s+1}}-\mathit{EF}_{i_s}\big)=\mathit{ES}_{n+1}-\mathit{ES}_0-\sum_{s=0}^{k-1} d_{i_s}=T-L(P).
    $$

    Una somma di termini non negativi è zero se e solo se ogni termine è zero: $L(P)=T$ se e solo se ogni arco di $P$ è stretto. <span class="qed">□</span>

- I percorsi critici sono i percorsi da INIZIO a FINE che utilizzano solo archi stretti: per elencarli tutti seguire gli archi stretti da START.

- Ogni attività di un percorso critico ha un margine di flessibilità totale pari a zero. Un percorso fatto di attività critiche, invece, lo è critico solo se i suoi archi sono stretti.

<a id="box-20-pm-ex-slacks"></a>

!!! esempio "Esempio 9.5: pantaloni e percorso critico del caso studio"

    Per mostrare tutti gli orari contemporaneamente scriviamo accanto a ciascun nodo la coppia $\mathrm{S}=(\mathit{ES}_j,\mathit{LS}_j)$ dei suoi orari di inizio e la coppia $\mathrm{F}=(\mathit{EF}_j,\mathit{LF}_j)$ dei suoi tempi di arrivo, come nella figura dell'attività $13$:

    ![Figura 4](../../img/project-management/fig04.svg){ .fig loading=lazy  }

    La tabella raccoglie gli orari ed i tempi delle attività di <span style="color:#1971c2">[Esempio 9.3](il-passaggio-in-avanti-i-primi-tempi.md#box-12-pm-ex-forward)</span> e <span style="color:#1971c2">[Esempio 9.4](il-passaggio-all-indietro-ultimi-tempi.md#box-15-pm-ex-backward)</span>.

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
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td>sì</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td>sì</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(16\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(16\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td>sì</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(16\)</span></td>
    <td><span class="arithmatex">\(22\)</span></td>
    <td><span class="arithmatex">\(20\)</span></td>
    <td><span class="arithmatex">\(26\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(16\)</span></td>
    <td><span class="arithmatex">\(20\)</span></td>
    <td><span class="arithmatex">\(16\)</span></td>
    <td><span class="arithmatex">\(20\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td>sì</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(20\)</span></td>
    <td><span class="arithmatex">\(25\)</span></td>
    <td><span class="arithmatex">\(20\)</span></td>
    <td><span class="arithmatex">\(25\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td>sì</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(22\)</span></td>
    <td><span class="arithmatex">\(29\)</span></td>
    <td><span class="arithmatex">\(26\)</span></td>
    <td><span class="arithmatex">\(33\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(8\)</span></td>
    <td><span class="arithmatex">\(9\)</span></td>
    <td><span class="arithmatex">\(29\)</span></td>
    <td><span class="arithmatex">\(38\)</span></td>
    <td><span class="arithmatex">\(33\)</span></td>
    <td><span class="arithmatex">\(42\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(9\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(16\)</span></td>
    <td><span class="arithmatex">\(23\)</span></td>
    <td><span class="arithmatex">\(18\)</span></td>
    <td><span class="arithmatex">\(25\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(8\)</span></td>
    <td><span class="arithmatex">\(25\)</span></td>
    <td><span class="arithmatex">\(33\)</span></td>
    <td><span class="arithmatex">\(25\)</span></td>
    <td><span class="arithmatex">\(33\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td>sì</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(11\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(33\)</span></td>
    <td><span class="arithmatex">\(37\)</span></td>
    <td><span class="arithmatex">\(34\)</span></td>
    <td><span class="arithmatex">\(38\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(12\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(33\)</span></td>
    <td><span class="arithmatex">\(38\)</span></td>
    <td><span class="arithmatex">\(33\)</span></td>
    <td><span class="arithmatex">\(38\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td>sì</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(13\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(38\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td><span class="arithmatex">\(42\)</span></td>
    <td><span class="arithmatex">\(44\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(14\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(38\)</span></td>
    <td><span class="arithmatex">\(44\)</span></td>
    <td><span class="arithmatex">\(38\)</span></td>
    <td><span class="arithmatex">\(44\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td>sì</td>
    </tr>
    </table></div>

    - Le attività critiche sono $1,2,3,5,6,10,12,14$. Gli archi stretti dall'INIZIO raggiungono la FINE solo lungo START$,1,2,3,5,6,10,12,14,$FINISH: il percorso critico è unico e la sua lunghezza è $T=44$ (blu in figura).

    - Le attività $4,7,8,13$ formano una catena con $\mathit{TS}_{4}=\mathit{TS}_{7}=\mathit{TS}_{8}=\mathit{TS}_{13}=4$, ma solo l'ultima ha margine libero, $\mathit{FS}_{13}=4$. Se l'attività $4$ inizia $4$ con settimane di ritardo, le attività $7$, $8$, $13$ devono iniziare $4$ con settimane di ritardo anche, e il progetto termina ancora alla settimana $44$.

    - Le attività $9$ e $11$ hanno lo stesso margine di flessibilità totale e libero delle settimane $2$ e $1$.

    ![Figura 5](../../img/project-management/fig05.svg){ .fig loading=lazy  }

!!! attenzione "I margini totali sono condivisi"

    Il margine totale di un'attività è condiviso con le altre attività dello stesso percorso. Le attività della catena $4,7,8,13$ hanno ciascuna un margine totale di $4$ settimane. Se l'attività $4$ dura $3$ settimane in più e l'attività $8$ dura $2$ settimane in più, il ritardo complessivo lungo la catena è $5>4$ settimane e il progetto termina alla settimana $45$.

!!! chiave ""

    Il margine di flessibilità totale $\mathit{TS}_j=\mathit{LS}_j-\mathit{ES}_j$ è il ritardo di $j$ che non ritarda il progetto; il margine libero $\mathit{FS}_j \le \mathit{TS}_j$ è il ritardo che non sposta nessun'altra attività. Le attività critiche hanno $\mathit{TS}_j=0$ e il i percorsi critici sono i percorsi dall'INIZIO alla FINE costituiti da archi stretti.

---

**Avanti:** [9.6 Il metodo del percorso critico](il-metodo-del-percorso-critico.md)
