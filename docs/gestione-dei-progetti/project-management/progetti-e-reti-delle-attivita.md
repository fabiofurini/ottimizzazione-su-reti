---
title: "Progetti e reti delle attività"
---

# 9.1 Progetti e reti delle attività { #sez-pm-sec-networks }

<div class="info-capitolo" markdown>

**Parte 5 · Gestione dei progetti · Capitolo 9** · [:material-book-open-variant: Capitolo 9: Gestione dei progetti](index.md) · [:material-file-pdf-box: Dispensa, volume 5 (PDF)](../../pdf/dispensa-5-gestione-dei-progetti.pdf) · [:material-presentation: Slide](../../pdf/slide-project-management.pdf) · [:material-pencil: Esercizi: Gestione dei progetti](../../esercizi/project-management.md) · [:material-gesture-tap: App: Il metodo del cammino critico (CPM)](../../laboratorio/cammino-critico-cpm.md)

</div>

<a id="box-1-pm-def-project"></a>

!!! definizione "Definizione 9.1: progetto"

    Un <strong>progetto</strong> è un insieme di $n$ <strong>attività</strong>, numerate $1,2,\dots,n$, con i seguenti dati.

    - Ogni attività $j$ ha una <strong>durata</strong> $d_j \in \Q_{>0}$.

    - Alcune coppie $(i,j)$ di attività sono <strong>precedenze</strong>: l'attività $i$ è un <strong>predecessore immediato</strong> dell'attività $j$, e $j$ può iniziare solo quando $i$ è terminata. Un'attività con più predecessori immediati può iniziare solo quando sono terminati tutti.

- Per descrivere un progetto servono tre tipi di informazioni: le <strong>attività</strong>, al livello di dettaglio desiderato; le <strong>precedenze</strong>, cioè i predecessori immediati di ogni attività; le <strong>durate</strong>, cioè una stima del tempo richiesto da ogni attività.

- In tutto il capitolo facciamo due ipotesi:

    - **(H1)** le durate sono <strong>deterministiche</strong>: ogni attività dura esattamente la sua durata stimata $d_j$, senza interruzioni;

    - **(H2)** le risorse sono <strong>illimitate</strong>: le attività non legate da precedenze possono svolgersi contemporaneamente.

- Il metodo di questo capitolo è il <strong>metodo del cammino critico</strong> (CPM, <em>critical path method</em>). È stato sviluppato alla fine degli anni Cinquanta, indipendentemente dalla tecnica PERT (<em>program evaluation and review technique</em>), e i due nomi sono spesso uniti in PERT/CPM.

<a id="box-2-pm-def-network"></a>

!!! definizione "Definizione 9.2: rete delle attività"

    La <strong>rete delle attività</strong> di un progetto con $n$ attività è il grafo orientato $G=(N,A)$ con $N=\{0,1,\dots,n+1\}$ e i seguenti nodi e archi.

    - Il nodo $j \in \{1,2,\dots,n\}$ è l'attività $j$. Il nodo $0$ è il nodo <strong>START</strong> e il nodo $n+1$ è il nodo <strong>FINISH</strong>, con durate $d_0=d_{n+1}=0$.

    - $A$ contiene l'arco $(i,j)$ per ogni precedenza, l'arco $(0,j)$ per ogni attività $j$ senza predecessori immediati e l'arco $(j,n+1)$ per ogni attività $j$ che non è predecessore immediato di nessuna attività.

- Questa è la rete <strong>activity-on-node</strong> (AON): le attività sono i nodi, e gli archi indicano solo le precedenze. Nella rete <strong>activity-on-arc</strong> (AOA) ogni attività è un arco, e un nodo separa un'attività dai suoi predecessori immediati.

- La rete AON è più facile da costruire, più facile da leggere per chi non ha esperienza e più facile da aggiornare quando il progetto cambia: usiamo sempre questa, e la chiamiamo semplicemente rete delle attività.

- In pratica la rete delle attività è costruita da un software di gestione dei progetti a partire dall'elenco delle attività.

<a id="box-3-pm-ex-case"></a>

!!! esempio "Esempio 9.1: il caso di studio"

    Un'impresa edile deve programmare le squadre che svolgono le $14$ attività di un progetto di costruzione. La tabella riporta, per ogni attività, i predecessori immediati e la durata stimata.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>attività <span class="arithmatex">\(j\)</span></th>
    <th>descrizione</th>
    <th>predecessori immediati</th>
    <th><span class="arithmatex">\(d_j\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td>Scavare</td>
    <td>—</td>
    <td><span class="arithmatex">\(2\)</span> settimane</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td>Gettare le fondamenta</td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(4\)</span> settimane</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td>Erigere i muri grezzi</td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(10\)</span> settimane</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td>Costruire il tetto</td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(6\)</span> settimane</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(5\)</span></td>
    <td>Installare l'impianto idraulico esterno</td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(4\)</span> settimane</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(6\)</span></td>
    <td>Installare l'impianto idraulico interno</td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(5\)</span> settimane</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(7\)</span></td>
    <td>Montare il rivestimento esterno</td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(7\)</span> settimane</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(8\)</span></td>
    <td>Eseguire la tinteggiatura esterna</td>
    <td><span class="arithmatex">\(5\)</span>, <span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(9\)</span> settimane</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(9\)</span></td>
    <td>Eseguire l'impianto elettrico</td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(7\)</span> settimane</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(10\)</span></td>
    <td>Montare le pareti in cartongesso</td>
    <td><span class="arithmatex">\(6\)</span>, <span class="arithmatex">\(9\)</span></td>
    <td><span class="arithmatex">\(8\)</span> settimane</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(11\)</span></td>
    <td>Posare i pavimenti</td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(4\)</span> settimane</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(12\)</span></td>
    <td>Eseguire la tinteggiatura interna</td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(5\)</span> settimane</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(13\)</span></td>
    <td>Installare le finiture esterne</td>
    <td><span class="arithmatex">\(8\)</span></td>
    <td><span class="arithmatex">\(2\)</span> settimane</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(14\)</span></td>
    <td>Installare le finiture interne</td>
    <td><span class="arithmatex">\(11\)</span>, <span class="arithmatex">\(12\)</span></td>
    <td><span class="arithmatex">\(6\)</span> settimane</td>
    </tr>
    </table></div>

    Sommando le durate si ottiene un totale di $79$ settimane. Più attività possono svolgersi contemporaneamente, e questo può ridurre di molto la durata del progetto. La rete delle attività ha i $16$ nodi $0,1,\dots,15$ e $19$ archi; accanto a ogni nodo, in blu, la sua durata.

    ![Figura 1](../../img/project-management/fig01.svg){ .fig loading=lazy  }

    L'attività $1$ è l'unica senza predecessori immediati, quindi da START esce il solo arco $(0,1)$; le attività $13$ e $14$ non sono predecessori immediati di nessuna attività, quindi entrano in FINISH.

## 9.1.1 Calendari e reti acicliche

<a id="box-4-pm-def-schedule"></a>

!!! definizione "Definizione 9.3: calendario"

    Un <strong>calendario</strong> di un progetto è un vettore $\vet{t}=(t_0,t_1,\dots,t_{n+1})$ di <strong>tempi di inizio</strong> con $t_0=0$ e

    $$
    t_j \ge t_i+d_i, \quad \forall (i,j) \in A .
    $$

    Il nodo $j$ inizia al tempo $t_j$ e termina al tempo $t_j+d_j$. La <strong>durata</strong> del calendario è $t_{n+1}$, e la <strong>durata minima del progetto</strong> $T$ è la minima durata di un calendario.

- Il vincolo dell'arco $(i,j)$ dice che $j$ inizia dopo che $i$ è terminata. Per (H1) e (H2), le precedenze sono gli unici vincoli di un calendario.

- Gli archi $(j,n+1)$ fanno iniziare FINISH dopo che tutte le attività sono terminate: $t_{n+1}$ è il tempo di completamento del progetto.

<a id="box-5-pm-prop-acyclic"></a>

!!! teorema "Proposizione 9.4: un calendario richiede una rete aciclica"

    Un progetto ha un calendario se e solo se la sua rete delle attività è aciclica.

??? dimostrazione "Dimostrazione"

    Nessun arco entra nel nodo $0$ e nessun arco esce dal nodo $n+1$, quindi ogni ciclo orientato di $G$ è formato da attività.

    1. Siano $i_0,i_1,\dots,i_k=i_0$ un ciclo orientato e $\vet{t}$ un calendario. Sommando i vincoli dei suoi archi, i tempi di inizio si elidono a catena (somma telescopica):

        $$
        0=t_{i_k}-t_{i_0} \ge \sum_{s=0}^{k-1} d_{i_s} >0,
        $$

        una contraddizione, perché le durate delle attività sono positive.

    2. Sia $G$ aciclico, e sia $v_0,v_1,\dots,v_{n+1}$ un ordine topologico ([Capitolo 3, Proposizione «ordini topologici»](../../alberi-e-cammini/shortest-paths/cammini-minimi-nei-grafi-aciclici.md)) con $v_0=0$: il nodo $0$ non ha archi entranti e può essere tolto per primo. Siano $D$ la durata massima e $t_{v_a}=a\,D$ per ogni $a$.

    3. Allora $t_0=0$, e ogni arco $(v_a,v_b)$ va in avanti, $a<b$, quindi $t_{v_b}-t_{v_a}=(b-a)\,D \ge D \ge d_{v_a}$: $\vet{t}$ è un calendario. <span class="qed">□</span>

- D'ora in poi la rete delle attività è aciclica. Allora ogni attività sta su un cammino da START a FINISH: risalendo gli archi all'indietro si arriva a un nodo senza predecessori immediati, che è collegato a START, e seguendoli in avanti si arriva a un nodo senza successori, che è collegato a FINISH.

- Un ciclo nelle precedenze è un errore del piano: un'attività dovrebbe terminare prima di iniziare.

!!! chiave ""

    Un progetto è un insieme di attività con durate e precedenze. La sua rete delle attività ha un nodo per ogni attività, più START e FINISH, e un arco per ogni precedenza; un calendario esiste se e solo se la rete è aciclica.

---

**Avanti:** [9.2 Cammini e cammini critici](cammini-e-cammini-critici.md)
