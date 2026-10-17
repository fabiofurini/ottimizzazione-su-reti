---
title: "Due cammini critici e variazioni delle durate"
---

# 9.8 Due cammini critici e variazioni delle durate

<div class="info-capitolo" markdown>

**Parte 5 · Gestione dei progetti · Capitolo 9** · [:material-book-open-variant: Capitolo 9: Gestione dei progetti](index.md) · [:material-file-pdf-box: Dispensa, volume 5 (PDF)](../../pdf/dispensa-5-gestione-dei-progetti.pdf) · [:material-presentation: Slide](../../pdf/slide-project-management.pdf) · [:material-pencil: Esercizi: Gestione dei progetti](../../esercizi/project-management.md) · [:material-gesture-tap: App: Il metodo del cammino critico (CPM)](../../laboratorio/cammino-critico-cpm.md)

</div>

<a id="sez-pm-sec-changes"></a>

- Chi pianifica si chiede spesso che cosa succede al progetto se un'attività dura di più, o se più squadre la rendono più breve. Le scorte e i cammini critici rispondono senza eseguire di nuovo il metodo.

<a id="box-26-pm-prop-change"></a>

!!! teorema "Proposizione 9.19: variazione di una durata"

    Siano $j$ un'attività, $\delta>0$, e $T'$ la durata minima del progetto dopo la variazione.

    - **(a)** Se $d_j$ aumenta di $\delta$, allora $T'=T+\max\{0,\,\delta-\mathit{TS}_j\}$.

    - **(b)** Se $d_j$ diminuisce di $\delta<d_j$, allora $T-\delta \le T' \le T$, e $T'=T$ se qualche cammino critico non contiene $j$.

??? dimostrazione "Dimostrazione"

    Per il <span style="color:#1971c2">[Teorema 9.9](la-passata-in-avanti-i-tempi-al-piu-presto.md#box-11-pm-th-duration)</span>, la durata minima del progetto è la lunghezza massima di un cammino da START a FINISH. La variazione cambia di $\pm\delta$ la lunghezza dei cammini che passano per $j$, e solo di quelli.

    - **(a)** Per il <span style="color:#1971c2">[Teorema 9.13](scorte-e-attivita-critiche.md#box-17-pm-th-total)</span>, i cammini più lunghi che passano per $j$ crescono a $L_j+\delta=T-\mathit{TS}_j+\delta$. Se $\mathit{TS}_j>0$, i cammini critici evitano $j$ e mantengono la lunghezza $T$; se $\mathit{TS}_j=0$, i cammini che evitano $j$ hanno lunghezza al più $T<T+\delta$. In entrambi i casi $T'=\max\{T,\,T-\mathit{TS}_j+\delta\}$.

    - **(b)** Nessun cammino si allunga e ogni cammino si accorcia al più di $\delta$, quindi $T-\delta \le T' \le T$. Un cammino critico che evita $j$ mantiene la lunghezza $T$.

    <p class="qed-riga"><span class="qed">□</span></p>

<a id="box-27-pm-ex-two"></a>

!!! esempio "Esempio 9.8: un progetto con due cammini critici"

    Un progetto ha $8$ attività, con i predecessori immediati e le durate della tabella.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>attività <span class="arithmatex">\(j\)</span></th>
    <th>predecessori immediati</th>
    <th><span class="arithmatex">\(d_j\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td>—</td>
    <td><span class="arithmatex">\(2\)</span> giorni</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(2\)</span> giorni</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td>—</td>
    <td><span class="arithmatex">\(4\)</span> giorni</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(3\)</span> giorni</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(5\)</span> giorni</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(3\)</span>, <span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(5\)</span> giorni</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(4\)</span>, <span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(3\)</span> giorni</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(8\)</span></td>
    <td><span class="arithmatex">\(6\)</span>, <span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(3\)</span> giorni</td>
    </tr>
    </table></div>

    L'attività $2$ segue l'attività $3$, quindi l'ordine topologico non è quello naturale. START libera $1$ e $3$; il nodo $1$ è tolto per primo e libera $4$ e $5$; poi $3$ è il nodo libero di indice minimo e libera $2$, che viene prima di $4$. L'ordine è $0,1,3,2,4,5,6,7,8,9$, e la passata in avanti e quella all'indietro danno:

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
    <th>critica</th>
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
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    <td><span class="arithmatex">\(13\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td>sì</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td>sì</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td>sì</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td>sì</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(8\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(13\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(13\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td>sì</td>
    </tr>
    </table></div>

    - $T=13$, e da START a FINISH vanno due cammini di archi stretti: START$,1,4,6,8,$FINISH e START$,1,5,7,8,$FINISH, entrambi di lunghezza $13$ (in blu nella figura, con le durate sopra i nodi).

    - L'attività $3$ ha $\mathit{TS}_3=1$ e $\mathit{FS}_3=0$: un giorno di ritardo sposta l'inizio al più presto dell'attività $2$, non la fine del progetto. L'attività $2$ ha $\mathit{TS}_2=\mathit{FS}_2=7$.

    - Il cammino START$,1,4,7,8,$FINISH usa solo attività critiche, ma il suo arco $(4,7)$ non è stretto, $\mathit{EF}_4=5<7=\mathit{ES}_7$: la sua lunghezza è $2+3+3+3=11$, e non è critico.

    ![Figura 7](../../img/project-management/fig07.svg){ .fig loading=lazy  }

<a id="box-28-pm-ex-changes"></a>

!!! esempio "Esempio 9.9: variazioni di una durata"

    Cambiamo una durata alla volta nel progetto dell'<span style="color:#1971c2">[Esempio 9.8](#box-27-pm-ex-two)</span>; la nuova durata e i cammini critici sono calcolati con il metodo del cammino critico, e concordano con la <span style="color:#1971c2">[Proposizione 9.19](#box-26-pm-prop-change)</span>.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>variazione</th>
    <th><span class="arithmatex">\(\mathit{TS}_j\)</span></th>
    <th>nuovo <span class="arithmatex">\(T\)</span></th>
    <th>cammini critici dopo la variazione</th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(d_5=5 \to 4\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(13\)</span></td>
    <td><span class="arithmatex">\(\text{START},1,4,6,8,\text{FINISH}\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(d_8=3 \to 2\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(12\)</span></td>
    <td><span class="arithmatex">\(\text{START},1,4,6,8,\text{FINISH}\)</span>; <span class="arithmatex">\(\text{START},1,5,7,8,\text{FINISH}\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(d_3=4 \to 6\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(14\)</span></td>
    <td><span class="arithmatex">\(\text{START},3,6,8,\text{FINISH}\)</span></td>
    </tr>
    </table></div>

    - Accorciare di un giorno l'attività $5$ non accorcia il progetto: il cammino critico START$,1,4,6,8,$FINISH evita l'attività $5$, e $T'=T=13$ per (b). Resta un solo cammino critico.

    - L'attività $8$ sta su entrambi i cammini critici: accorciarla di un giorno dà $T'=T-1=12$, ed entrambi i cammini restano critici.

    - L'attività $3$ dura $2$ giorni in più, più della sua scorta totale $\mathit{TS}_3=1$: per (a), $T'=13+(2-1)=14$, e START$,3,6,8,$FINISH diventa il cammino critico.

!!! attenzione "Accorciare un progetto"

    Per accorciare un progetto, ogni cammino critico deve diventare più corto. Quando ci sono più cammini critici, un'attività che sta su uno solo di essi non serve: si accorcia un'attività comune a tutti, oppure un'attività su ciascuno.

!!! chiave ""

    Se $d_j$ cresce di $\delta$, il progetto dura $\max\{0,\delta-\mathit{TS}_j\}$ in più. Se $d_j$ diminuisce, il progetto guadagna al più la stessa quantità, e niente se un cammino critico evita $j$: con più cammini critici, bisogna accorciarli tutti.

## 9.9 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Sommare tutte le durate.</strong> Il caso di studio dura $T=44$ settimane, non $79$: le attività non legate da precedenze si svolgono in parallelo.

    - <strong>Prendere il minimo nella passata in avanti.</strong> Un'attività inizia quando <em>tutti</em> i suoi predecessori immediati sono terminati: $\mathit{ES}_j$ è il massimo delle loro fini al più presto. Simmetricamente, $\mathit{LF}_j$ è il minimo degli inizi al più tardi dei successori.

    - <strong>Dimenticare START, FINISH e i loro archi.</strong> Ogni attività senza predecessori immediati ha bisogno dell'arco da START, e ogni attività senza successori dell'arco verso FINISH.

    - <strong>Sommare le scorte totali lungo un cammino.</strong> La catena $4,7,8,13$ del caso di studio ha in tutto $4$ settimane di scorta, non $16$.

    - <strong>Confondere scorta totale e scorta libera.</strong> Un ritardo maggiore di $\mathit{FS}_j$ sposta altre attività, anche quando non ritarda il progetto.

    - <strong>Leggere un cammino critico solo dalle attività critiche.</strong> Nell'<span style="color:#1971c2">[Esempio 9.8](#box-27-pm-ex-two)</span> il cammino START$,1,4,7,8,$FINISH ha solo attività critiche, e non è critico: bisogna controllare che gli archi siano stretti.

    - <strong>Accorciare un'attività che sta su uno solo dei cammini critici.</strong> La durata del progetto non cambia.

    - <strong>Accettare precedenze con un ciclo.</strong> Non esiste alcun calendario, e l'ordine topologico si ferma prima di aver ordinato tutti i nodi.

## 9.10 In sintesi

!!! chiave "In sintesi"

    - Un progetto ha attività con durate deterministiche e precedenze; la sua rete delle attività ha un nodo per ogni attività, più START e FINISH, e deve essere aciclica.

    - La lunghezza di un cammino da START a FINISH è la durata complessiva delle sue attività; ogni calendario dura almeno quanto ogni cammino, e i cammini critici sono quelli più lunghi.

    - La passata in avanti dà $\mathit{ES}_j=\max \mathit{EF}_i$ e $T=\mathit{ES}_{n+1}$, la lunghezza di un cammino critico; la passata all'indietro dà $\mathit{LF}_j=\min \mathit{LS}_k$ partendo da $\mathit{LF}_{n+1}=T$.

    - $\mathit{TS}_j=\mathit{LS}_j-\mathit{ES}_j$ è il ritardo che non ritarda il progetto, $\mathit{FS}_j \le \mathit{TS}_j$ il ritardo che non sposta altre attività; i cammini critici sono i cammini di archi stretti.

    - Il modello $\mathrm{PD}$ $\min\{t_{n+1}-t_0 : t_j-t_i \ge d_i\}$ ha come duale il modello di cammino massimo, ed entrambi hanno valore ottimo $T$.

    - Aumentare $d_j$ di $\delta$ ritarda il progetto di $\max\{0,\delta-\mathit{TS}_j\}$; accorciare serve solo se ogni cammino critico diventa più corto.

    <strong>I due progetti in breve.</strong>

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>caso di studio</th>
    <th><span class="arithmatex">\(14\)</span> attività, <span class="arithmatex">\(79\)</span> settimane in tutto; <span class="arithmatex">\(T=44\)</span> settimane</th>
    </tr>
    <tr>
    <td>cammino critico</td>
    <td><span class="arithmatex">\(\text{START},1,2,3,5,6,10,12,14,\text{FINISH}\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(j\)</span> non critiche (<span class="arithmatex">\(\mathit{TS}_j,\mathit{FS}_j\)</span>)</td>
    <td><span class="arithmatex">\(4\)</span> (<span class="arithmatex">\(4,0\)</span>), <span class="arithmatex">\(7\)</span> (<span class="arithmatex">\(4,0\)</span>), <span class="arithmatex">\(8\)</span> (<span class="arithmatex">\(4,0\)</span>), <span class="arithmatex">\(9\)</span> (<span class="arithmatex">\(2,2\)</span>), <span class="arithmatex">\(11\)</span> (<span class="arithmatex">\(1,1\)</span>), <span class="arithmatex">\(13\)</span> (<span class="arithmatex">\(4,4\)</span>)</td>
    </tr>
    <tr>
    <td>modelli LP</td>
    <td><span class="arithmatex">\(z(\mathrm{PD})=z(D(\mathrm{PD}))=44\)</span>; <span class="arithmatex">\(\mathit{ES}\)</span> e <span class="arithmatex">\(\mathit{LS}\)</span> ottimi</td>
    </tr>
    <tr>
    <td>secondo esempio</td>
    <td><span class="arithmatex">\(T=13\)</span>, 2 cammini critici:</td>
    </tr>
    <tr>
    <td></td>
    <td><span class="arithmatex">\(\text{START},1,4,6,8,\text{FINISH}\)</span> e <span class="arithmatex">\(\text{START},1,5,7,8,\text{FINISH}\)</span></td>
    </tr>
    <tr>
    <td>variazioni</td>
    <td><span class="arithmatex">\(d_5=5\to 4\)</span>: <span class="arithmatex">\(T=13\)</span>; <span class="arithmatex">\(d_8=3\to 2\)</span>: <span class="arithmatex">\(T=12\)</span>; <span class="arithmatex">\(d_3=4\to 6\)</span>: <span class="arithmatex">\(T=14\)</span></td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Gestione dei progetti](../../esercizi/project-management.md)

