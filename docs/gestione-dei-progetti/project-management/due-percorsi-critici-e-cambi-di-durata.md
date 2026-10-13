---
title: "Due percorsi critici e cambi di durata"
---

# 9.8 Due percorsi critici e cambi di durata

<div class="info-capitolo" markdown>

**Parte 5 · Gestione dei progetti · Capitolo 9** · [:material-book-open-variant: Capitolo 9: Gestione dei progetti](index.md) · [:material-file-pdf-box: Dispensa, volume 5 (PDF)](../../pdf/dispensa-5-gestione-dei-progetti.pdf) · [:material-pencil: Esercizi: Gestione dei progetti](../../esercizi/project-management.md)

</div>

<a id="sez-pm-sec-changes"></a>
- Un pianificatore spesso chiede cosa succede al progetto se un'attività richiede più tempo o se più squadre la realizzano più breve. Gli allentamenti e i percorsi critici rispondono senza eseguire nuovamente il metodo.

<a id="box-26-pm-prop-change"></a>

!!! teorema "Proposizione 9.19: modifica una durata"

    Lascia che $j$ sia un'attività, $\delta>0$ e $T'$ la durata minima del progetto dopo la modifica.

    - **(a)** Se $d_j$ aumenta di $\delta$, allora $T'=T+\max\{0,\,\delta-\mathit{TS}_j\}$.

    - **(b)** Se $d_j$ diminuisce di $\delta<d_j$, allora $T-\delta \le T' \le T$ e $T'=T$ se qualche percorso critico lo fa non contenere $j$.

??? dimostrazione "Dimostrazione"

    Per <span style="color:#1971c2">[Teorema 9.9](il-passaggio-in-avanti-i-primi-tempi.md#box-11-pm-th-duration)</span>, la durata minima del progetto è la lunghezza massima di un percorso da INIZIO per FINE. La modifica modifica con $\pm\delta$ la lunghezza dei percorsi attraverso $j$, e solo di essi.

    - **(a)** Secondo <span style="color:#1971c2">[Teorema 9.13](margini-e-attivita-critiche.md#box-17-pm-th-total)</span>, i percorsi più lunghi attraverso $j$ crescono fino a $L_j+\delta=T-\mathit{TS}_j+\delta$. Se $\mathit{TS}_j>0$, i percorsi critici evitano $j$ e mantengono la lunghezza $T$; se $\mathit{TS}_j=0$, il i percorsi che evitano $j$ hanno una lunghezza massima pari a $T<T+\delta$. In entrambi i casi $T'=\max\{T,\,T-\mathit{TS}_j+\delta\}$.

    - **(b)** Nessun percorso cresce e ogni percorso perde al massimo $\delta$, quindi $T-\delta \le T' \le T$. Un percorso critico quello evita $j$ mantiene la lunghezza $T$.

    <p class="qed-riga"><span class="qed">□</span></p>

<a id="box-27-pm-ex-two"></a>

!!! esempio "Esempio 9.8: un progetto con due percorsi critici"

    Un progetto ha attività $8$ con i predecessori immediati e le durate della tabella.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>attività <span class="arithmatex">\(j\)</span> e predecessori immediati e <span class="arithmatex">\(d_j\)</span></th>
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

    L'attività $2$ segue l'attività $3$, quindi l'ordine topologico non è quello naturale. START libera $1$ e $3$; nodo $1$ viene rimosso per primo e libera $4$ e $5$; quindi $3$ è il nodo libero con l'indice più piccolo e libera $2$, che viene prima di $4$. L'ordine è $0,1,3,2,4,5,6,7,8,9$, e il passaggio avanti e quello indietro danno:

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

    - $T=13$ e due percorsi di archi stretti vanno dall'INIZIO alla FINE: START$,1,4,6,8,$FINISH e START$,1,5,7,8,$FINISH, entrambi di lunghezza $13$ (blu in figura, con le durate sopra i nodi).

    - L'attività $3$ ha $\mathit{TS}_3=1$ e $\mathit{FS}_3=0$: un giorno di ritardo sposta la prima ora di inizio dell'attività $2$, non la fine del progetto. L'attività $2$ ha $\mathit{TS}_2=\mathit{FS}_2=7$.

    - Il percorso START$,1,4,7,8,$FINISH utilizza solo attività critiche, ma il suo arco $(4,7)$ non è stretto, $\mathit{EF}_4=5<7=\mathit{ES}_7$: la sua lunghezza è $2+3+3+3=11$ e non è critica.

    ![Figura 7](../../img/project-management/fig07.svg){ .fig loading=lazy  }

<a id="box-28-pm-ex-changes"></a>

!!! esempio "Esempio 9.9: modifiche di una durata"

    Modifichiamo una durata alla volta nel progetto di <span style="color:#1971c2">[Esempio 9.8](#box-27-pm-ex-two)</span>; la nuova durata e la criticità i percorsi sono calcolati con il metodo del percorso critico e concordano con <span style="color:#1971c2">[Proposizione 9.19](#box-26-pm-prop-change)</span>.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>modifica</th>
    <th><span class="arithmatex">\(\mathit{TS}_j\)</span> e nuovo <span class="arithmatex">\(T\)</span> e percorsi critici dopo la modifica</th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(d_5=5 \to 4\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(13\)</span></td>
    <td><span class="arithmatex">\(\text{START},1,4,6,8,\text{FINISH}\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(d_8=3 \to 2\)</span> e <span class="arithmatex">\(0\)</span> e <span class="arithmatex">\(12\)</span> e <span class="arithmatex">\(\text{START},1,4,6,8,\text{FINISH}\)</span>; <span class="arithmatex">\(\text{START},1,5,7,8,\text{FINISH}\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(d_3=4 \to 6\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(14\)</span></td>
    <td><span class="arithmatex">\(\text{START},3,6,8,\text{FINISH}\)</span></td>
    </tr>
    </table></div>

    - Accorciare di un giorno l'attività $5$ non abbrevia il progetto: il percorso critico START$,1,4,6,8,$FINISH evita l'attività $5$ e $T'=T=13$ da (b). Rimane solo un percorso critico.

    - L'attività $8$ si trova su entrambi i percorsi critici: accorciandolo di un giorno si ottiene $T'=T-1=12$ ed entrambi i percorsi rimangono critico.

    - L'attività $3$ impiega $2$ giorni in più, più del suo rallentamento totale $\mathit{TS}_3=1$: da (a), $T'=13+(2-1)=14$ e START$,3,6,8,$FINISH diventa il percorso critico.

!!! attenzione "Riduzione di un progetto"

    Per abbreviare un progetto, ogni percorso critico deve diventare più breve. Quando sono presenti diversi percorsi critici, un'attività poggiare su uno solo di essi non aiuta: abbreviare un'attività comune a tutti, oppure un'attività su ciascuno.

!!! chiave ""

    Se $d_j$ cresce di $\delta$, il progetto dura $\max\{0,\delta-\mathit{TS}_j\}$ di più. Se $d_j$ diminuisce, il progetto guadagna a più o meno la stessa quantità, e niente se un percorso critico evita $j$: con diversi percorsi critici, tutti devono essere accorciato.

## 9.9 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Sommando tutte le durate.</strong> Il caso di studio dura $T=44$ settimane, non $79$: attività che non sono collegati da precedenze funzionano in parallelo.

    - <strong>Prendendo il minimo nel passaggio in avanti.</strong> Un'attività inizia quando <em>tutti</em> i suoi immediati predecessori sono finiti: $\mathit{ES}_j$ è il massimo dei loro primi tempi di arrivo. Simmetricamente, $\mathit{LF}_j$ è il minimo del ultimi orari di inizio dei successori.

    - <strong>Dimenticando INIZIO, FINE e i loro archi.</strong> Ogni attività senza predecessori immediati necessita dell'arco da INIZIO, e ogni attività senza successori l'arco fino a FINE.

    - <strong>Somma dei rallentamenti totali lungo un percorso.</strong> La catena $4,7,8,13$ del caso di studio ha $4$ settimane di rallentamento in tutto, non $16$.

    - <strong>Confusione del margine di flessibilità totale e libero.</strong> Un ritardo maggiore di $\mathit{FS}_j$ sposta altre attività, anche quando lo fa non ritardare il progetto.

    - <strong>Lettura di un percorso critico solo dalle attività critiche.</strong> In <span style="color:#1971c2">[Esempio 9.8](#box-27-pm-ex-two)</span> il il percorso START$,1,4,7,8,$FINISH ha solo attività critiche, e non è critico: controlla che gli archi siano stretti.

    - <strong>Riduzione di un'attività su uno dei numerosi percorsi critici.</strong> La durata del progetto non cambia.

    - <strong>Accettare le precedenze con un ciclo.</strong> Non esiste alcuna pianificazione e l'ordine topologico si interrompe prima ordinare tutti i nodi.

## 9.10 In sintesi

!!! chiave "In sintesi"

    - Un progetto ha attività con durate e precedenze deterministiche; la sua rete di progetto ha un nodo per ogni attività, più INIZIO e FINE, e deve essere aciclica.

    - La lunghezza di un percorso dall'INIZIO alla FINE è la durata totale delle sue attività; ogni programma dura alle almeno quanto ogni percorso, e i percorsi critici sono i più lunghi.

    - Il passaggio in avanti fornisce $\mathit{ES}_j=\max \mathit{EF}_i$ e $T=\mathit{ES}_{n+1}$, la lunghezza di un percorso critico; il passaggio all'indietro dà $\mathit{LF}_j=\min \mathit{LS}_k$ a partire da $\mathit{LF}_{n+1}=T$.

    - $\mathit{TS}_j=\mathit{LS}_j-\mathit{ES}_j$ è il ritardo che non ritarda il progetto, $\mathit{FS}_j \le \mathit{TS}_j$ il ritardo che non sposta altre attività; i percorsi critici sono i percorsi di archi stretti.

    - Il modello $\mathrm{PD}$ $\min\{t_{n+1}-t_0 : t_j-t_i \ge d_i\}$ ha il modello con percorso più lungo come doppio ed entrambi hanno valore ottimale $T$.

    - L'aumento di $d_j$ di $\delta$ ritarda il progetto di $\max\{0,\delta-\mathit{TS}_j\}$; l'accorciamento aiuta solo se ogni il percorso critico si accorcia.

    <strong>I due progetti in sintesi.</strong>

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>caso di studio e attività <span class="arithmatex">\(14\)</span>, settimane <span class="arithmatex">\(79\)</span> in tutto; <span class="arithmatex">\(T=44\)</span> settimane</th>
    </tr>
    <tr>
    <td>percorso critico</td>
    <td><span class="arithmatex">\(\text{START},1,2,3,5,6,10,12,14,\text{FINISH}\)</span></td>
    </tr>
    <tr>
    <td>non critico <span class="arithmatex">\(j\)</span> (<span class="arithmatex">\(\mathit{TS}_j,\mathit{FS}_j\)</span>) e <span class="arithmatex">\(4\)</span> (<span class="arithmatex">\(4,0\)</span>), <span class="arithmatex">\(7\)</span> (<span class="arithmatex">\(4,0\)</span>), <span class="arithmatex">\(8\)</span> (<span class="arithmatex">\(4,0\)</span>), <span class="arithmatex">\(9\)</span> (<span class="arithmatex">\(2,2\)</span>), <span class="arithmatex">\(11\)</span> (<span class="arithmatex">\(1,1\)</span>), <span class="arithmatex">\(13\)</span> (<span class="arithmatex">\(4,4\)</span>)</td>
    </tr>
    <tr>
    <td>Modelli LP e <span class="arithmatex">\(z(\mathrm{PD})=z(D(\mathrm{PD}))=44\)</span>; <span class="arithmatex">\(\mathit{ES}\)</span> e <span class="arithmatex">\(\mathit{LS}\)</span> ottimali</td>
    </tr>
    <tr>
    <td>secondo esempio</td>
    <td><span class="arithmatex">\(T=13\)</span>, 2 percorsi critici:</td>
    </tr>
    <tr>
    <td></td>
    <td><span class="arithmatex">\(\text{START},1,4,6,8,\text{FINISH}\)</span> e <span class="arithmatex">\(\text{START},1,5,7,8,\text{FINISH}\)</span></td>
    </tr>
    <tr>
    <td>modifiche</td>
    <td><span class="arithmatex">\(d_5=5\to 4\)</span>: <span class="arithmatex">\(T=13\)</span>; <span class="arithmatex">\(d_8=3\to 2\)</span>: <span class="arithmatex">\(T=12\)</span>; <span class="arithmatex">\(d_3=4\to 6\)</span>: <span class="arithmatex">\(T=14\)</span></td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Gestione dei progetti](../../esercizi/project-management.md)
