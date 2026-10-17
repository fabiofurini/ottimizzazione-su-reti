---
title: "Il metodo dei potenziali"
---

# 7.4 Il metodo dei potenziali { #sez-ta-sec-potentials }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 7** · [:material-book-open-variant: Capitolo 7: Trasporto e assegnamento](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-presentation: Slide](../../pdf/slide-transportation-and-assignment.pdf) · [:material-pencil: Esercizi: Trasporto e assegnamento](../../esercizi/transportation-and-assignment.md) · [:material-gesture-tap: App: Trasporto: soluzione iniziale e metodo dei potenziali](../../laboratorio/trasporto-metodo-dei-potenziali.md) · [:material-gesture-tap: App: Assegnamento: l'algoritmo ungherese](../../laboratorio/assegnamento-algoritmo-ungherese.md)

</div>

- Scriviamo i vincoli [(7.1c)](il-problema-di-trasporto.md#mjx-eqn:ta:demand) come $-\sum_{i \in P} x_{ij}=-d_j$, i vincoli di conservazione delle destinazioni, e usiamo una variabile duale libera $\pi_v$, il potenziale del nodo $v$, per il vincolo di ogni nodo $v \in P \cup D$, come nel [Capitolo 4](../network-flow-models/il-modello-duale-e-i-costi-ridotti.md).

!!! chiave ""

    Con una variabile duale libera $\pi_v$ per il vincolo di ogni nodo $v \in P \cup D$, il modello duale del modello $\mathrm{TP}$ è:

    <a id="eq-ta-DUAL"></a>

    \begin{align*}
    &&   \max \;\;{\sum_{i \in P} a_i \, \pi_i - \sum_{j \in D} d_j \, \pi_j}                    \label{ta:dobj}  \tag{7.2a}\\[1ex]
    && \text{soggetto a} \quad  \pi_i - \pi_j &\le c_{ij}, & \forall i \in P,~\forall j \in D, \label{ta:dcons}  \tag{7.2b}\\[1ex]
    && \pi_v &\in \R, & \forall v \in P \cup D.                                           \label{ta:dfree} \tag{7.2c}
    \end{align*}

    Questo modello LP è detto modello $D(\mathrm{TP})$.

- Con il costo ridotto $\bar{c}_{ij}=c_{ij}-\pi_i+\pi_j$ del [Capitolo 4](../network-flow-models/il-modello-duale-e-i-costi-ridotti.md), il vincolo duale $\eqref{ta:dcons}$ diventa $\bar{c}_{ij} \ge 0$.

- Aggiungere la stessa costante a tutti i potenziali non cambia i costi ridotti né, in un'istanza bilanciata, l'obiettivo $\eqref{ta:dobj}$. Normalizziamo con $\pi_{m+n}=0$, il potenziale dell'ultima destinazione.

- Per ogni $\vet{x}$ che soddisfa i vincoli [(7.1b)](il-problema-di-trasporto.md#mjx-eqn:ta:supply) e [(7.1c)](il-problema-di-trasporto.md#mjx-eqn:ta:demand), i potenziali si sommano riga per riga e colonna per colonna:

    $$
    \sum_{i \in P}\sum_{j \in D} (\pi_i-\pi_j)\,x_{ij}=\sum_{i \in P} a_i\,\pi_i-\sum_{j \in D} d_j\,\pi_j ,
    $$

    e poiché $c_{ij}=\bar{c}_{ij}+\pi_i-\pi_j$,

    $$
    \sum_{i \in P}\sum_{j \in D} c_{ij}\,x_{ij}=\sum_{i \in P}\sum_{j \in D}\bar{c}_{ij}\,x_{ij}+\sum_{i \in P}
    a_i\,\pi_i-\sum_{j \in D} d_j\,\pi_j .
    $$

    È il Lemma «costo e costo ridotto» del Capitolo 4 per la rete bipartita.

<a id="box-15-ta-def-potentials"></a>

!!! definizione "Definizione 7.9: potenziali di una base"

    I <strong>potenziali di una base</strong> $T$ sono i valori $\pi_v$, $v \in P \cup D$, tali che

    $$
    \bar{c}_{ij}=c_{ij}-\pi_i+\pi_j=0, \quad \forall (i,j) \in T, \qquad\qquad \pi_{m+n}=0 .
    $$

- I potenziali di una base esistono e sono unici. Partendo da $\pi_{m+n}=0$, una cella di base $(i,j)$ con un estremo noto dà l'altro: $\pi_i=\pi_j+c_{ij}$ oppure $\pi_j=\pi_i-c_{ij}$. Ogni nodo si raggiunge lungo il suo unico cammino nell'albero a partire da $m+n$, che ne fissa il valore.

<a id="box-16-ta-th-opt"></a>

!!! teorema "Teorema 7.10: criterio di ottimalità"

    Sia $\bar{\vet{x}}$ la soluzione ammissibile di base di una base $T$, con potenziali $\vet{\pi}$. Se $\bar{c}_{ij} \ge 0$ per ogni cella, allora $\bar{\vet{x}}$ è ottima per il modello $\mathrm{TP}$, $\vet{\pi}$ è ottima per il modello $D(\mathrm{TP})$, e

    $$
    \sum_{i \in P}\sum_{j \in D} c_{ij}\,\bar{x}_{ij}=\sum_{i \in P} a_i\,\pi_i-\sum_{j \in D} d_j\,\pi_j .
    $$

    Se inoltre $\bar{c}_{ij}>0$ per ogni cella fuori da $T$, allora $\bar{\vet{x}}$ è l'unica soluzione ottima.

??? dimostrazione "Dimostrazione"

    Usiamo l'identità precedente. Sia $z_\pi=\sum_{i \in P} a_i\pi_i-\sum_{j \in D} d_j\pi_j$.

    1. Per $\bar{\vet{x}}$: $\bar{c}_{ij}=0$ su $T$ e $\bar{x}_{ij}=0$ fuori da $T$, quindi $\sum \bar{c}_{ij}\bar{x}_{ij}=0$ e il costo di $\bar{\vet{x}}$ è $z_\pi$.

    2. Per ogni $\vet{x}$ ammissibile: $\bar{c} \ge 0$ e $\vet{x} \ge \vet{0}$, quindi il suo costo è almeno $z_\pi$; dunque $\bar{\vet{x}}$ è ottima. I potenziali soddisfano $\eqref{ta:dcons}$, e il loro valore $z_\pi$ è uguale al costo di una soluzione primale: per la dualità debole sono ottimi.

    3. Se $\bar{c}_{ij}>0$ fuori da $T$, una $\vet{x}$ ottima ha $\sum \bar{c}_{ij}x_{ij}=0$, quindi $x_{ij}=0$ fuori da $T$: è la soluzione di base di $T$, che è $\bar{\vet{x}}$ per il <span style="color:#1971c2">[Teorema 7.6](soluzioni-di-base.md#box-9-ta-th-basis)</span>. <span class="qed">□</span>

## 7.4.1 Il ciclo di una cella e il pivot

<a id="box-17-ta-lem-cycle"></a>

!!! teorema "Lemma 7.11: il ciclo di una cella non di base"

    Siano $T$ una base ed $e=(k,l) \notin T$. Le celle $T \cup \{e\}$ contengono esattamente un ciclo $C$, formato da $e$ e dal cammino da $l$ a $k$ nell'albero. Scriviamo $C$ partendo da $e$ e muovendoci prima lungo la riga $k$, e diamo il segno $+$ alle celle nelle posizioni dispari ($e$ compresa) e $-$ alle altre. Allora ogni riga e ogni colonna che incontra $C$ contiene esattamente una cella di $C$ con segno $+$ e una con segno $-$.

??? dimostrazione "Dimostrazione"

    Il ciclo è il ciclo fondamentale dell'arco $(k,l)$ (Proposizione «ciclo fondamentale» del [Capitolo 1](../../grafi/graphs/alberi-e-foreste.md)). Visita i nodi $k,j_1,i_1,j_2,\dots,l$ alternativamente in $P$ e in $D$, quindi ha un numero pari di celle, e due celle consecutive hanno un nodo in comune: le prime due la riga $k$, le due successive una colonna, e così via. Ogni nodo di $C$ sta in esattamente due celle di $C$, consecutive lungo $C$, compresa la coppia formata dall'ultima e dalla prima: le loro posizioni hanno parità diversa, quindi segni diversi. <span class="qed">□</span>

<a id="box-18-ta-th-pivot"></a>

!!! teorema "Teorema 7.12: il pivot"

    Siano $\bar{\vet{x}}$ la soluzione ammissibile di base di una base $T$ con potenziali $\vet{\pi}$, $e \notin T$ con $\bar{c}_e<0$, $C^+$ e $C^-$ le celle del suo ciclo con segno $+$ e $-$, e

    $$
    \theta=\min\{\bar{x}_f : f \in C^-\},
    $$

    raggiunto in una cella $f^\ast \in C^-$. Per $0 \le t \le \theta$, sia $\vet{x}(t)$ il vettore $\bar{\vet{x}}$ con $t$ aggiunto sulle celle di $C^+$ e sottratto sulle celle di $C^-$.

    - **(a)** $\vet{x}(t)$ è ammissibile, e il suo costo è il costo di $\bar{\vet{x}}$ più $t\,\bar{c}_e$.

    - **(b)** $T'=T \cup \{e\} \setminus \{f^\ast\}$ è una base, e $\vet{x}(\theta)$ è la sua soluzione ammissibile di base.

??? dimostrazione "Dimostrazione"

    1. <em>Ammissibilità.</em> Per il <span style="color:#1971c2">[Lemma 7.11](#box-17-ta-lem-cycle)</span> ogni riga e colonna di $C$ guadagna $t$ su una cella e perde $t$ su un'altra, quindi tutte le somme restano invariate. Le celle di $C^-$ restano $\bar{x}_f-t \ge 0$ perché $t \le \theta$.

    2. <em>Costo.</em> La variazione di costo è $t\big(\sum_{C^+} c_{ij}-\sum_{C^-} c_{ij}\big)$. Ogni nodo di $C$ sta in una cella di $C^+$ e in una di $C^-$, quindi $\sum_{C^+}(\pi_i-\pi_j)=\sum_{C^-}(\pi_i-\pi_j)$, e la variazione è $t\big(\sum_{C^+}\bar{c}_{ij}-\sum_{C^-}\bar{c}_{ij}\big)=t\,\bar{c}_e$: le altre celle di $C$ sono di base, con $\bar{c}_{ij}=0$.

    3. <em>Nuova base.</em> $T'$ ha $m+n-1$ celle, e non ha cicli: l'unico ciclo di $T \cup \{e\}$ è $C$, che contiene $f^\ast$. Un insieme aciclico di $m+n-1$ archi su $m+n$ nodi è un albero ricoprente (Teorema «caratterizzazioni di un albero» del Capitolo 1). $\vet{x}(\theta)$ è nullo fuori da $T'$, perché $x_{f^\ast}(\theta)=0$, quindi è la soluzione di base di $T'$. <span class="qed">□</span>

!!! algoritmo "Algoritmo: Il metodo dei potenziali"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> un'istanza bilanciata con offerte <span class="arithmatex">\(a_i\)</span>, domande <span class="arithmatex">\(d_j\)</span> e costi <span class="arithmatex">\(c_{ij}\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> una soluzione ammissibile di base ottima <span class="arithmatex">\(\tilde{\vet{x}}\)</span> e potenziali ottimi <span class="arithmatex">\(\tilde{\vet{\pi}}\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Passo 0 (base iniziale).</strong> Costruire una base <span class="arithmatex">\(T\)</span> e la sua soluzione ammissibile di base <span class="arithmatex">\(\bar{\vet{x}}\)</span> con la
    regola dell'angolo nord-ovest o con la regola del costo minimo.</div><div class="pc" style="--liv:0"><span class="pc-n">2</span><strong>Passo 1 (potenziali).</strong> Calcolare i potenziali di <span class="arithmatex">\(T\)</span> e i costi ridotti <span class="arithmatex">\(\bar{c}_{ij}=c_{ij}-\pi_i+\pi_j\)</span> delle
    celle fuori da <span class="arithmatex">\(T\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">3</span><strong>Passo 2 (test di ottimalità).</strong> Se <span class="arithmatex">\(\bar{c}_{ij} \ge 0\)</span> per ogni cella, <code>STOP</code>: <span class="arithmatex">\(\bar{\vet{x}}\)</span> è ottima.</div><div class="pc" style="--liv:0"><span class="pc-n">4</span><strong>Passo 3 (cella entrante).</strong> Scegliere una cella <span class="arithmatex">\(e\)</span> con <span class="arithmatex">\(\bar{c}_e<0\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">5</span><strong>Passo 4 (ciclo).</strong> Trovare il ciclo di <span class="arithmatex">\(e\)</span> con i suoi segni, <span class="arithmatex">\(\theta:=\min\{\bar{x}_f : f \in C^-\}\)</span>, e una cella
    uscente <span class="arithmatex">\(f^\ast \in C^-\)</span> con <span class="arithmatex">\(\bar{x}_{f^\ast}=\theta\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">6</span><strong>Passo 5 (pivot).</strong> Aggiungere <span class="arithmatex">\(\theta\)</span> su <span class="arithmatex">\(C^+\)</span>, sottrarre <span class="arithmatex">\(\theta\)</span> su <span class="arithmatex">\(C^-\)</span>, porre <span class="arithmatex">\(T:=T \cup \{e\} \setminus \{f^\ast\}\)</span>, e tornare al Passo 1.</div></div>

- <strong>Regole degli esempi.</strong> Al Passo 3 la cella entrante ha il costo ridotto più negativo (a parità, $i$ più piccolo, poi $j$). Al Passo 4 il ciclo si scrive dalla cella entrante muovendosi prima lungo la sua riga, e la cella uscente è la prima cella di $C^-$ con $\bar{x}_f=\theta$ in ordine riga–colonna.

- Il metodo è noto anche come <strong>metodo u-v</strong> o metodo MODI (<em>modified distribution</em>), e il ciclo come cammino <strong>stepping stone</strong>: le quantità si spostano lungo il ciclo come sulle pietre per attraversare un fiume.

<a id="box-19-ta-th-termination"></a>

!!! teorema "Teorema 7.13: terminazione"

    Se $\theta>0$ a ogni iterazione, il metodo dei potenziali si ferma dopo un numero finito di iterazioni con una soluzione ammissibile di base ottima e potenziali ottimi.

??? dimostrazione "Dimostrazione"

    Per il <span style="color:#1971c2">[Teorema 7.12](#box-18-ta-th-pivot)</span> ogni iterazione con $\theta>0$ passa a una nuova base e diminuisce il costo di $\theta\,|\bar{c}_e|>0$. Una base determina la sua soluzione di base (<span style="color:#1971c2">[Teorema 7.6](soluzioni-di-base.md#box-9-ta-th-basis)</span>), quindi una base visitata due volte avrebbe due costi diversi: nessuna base si ripete. Gli insiemi di $m+n-1$ celle sono in numero finito, quindi il metodo si ferma, al Passo 2, e si applica il <span style="color:#1971c2">[Teorema 7.10](#box-16-ta-th-opt)</span>. <span class="qed">□</span>

- Quando $\theta=0$ il pivot è <strong>degenere</strong>: cambia la base, ma non la soluzione né il suo costo. Il metodo dei potenziali è l'algoritmo del simplesso sul modello $\mathrm{TP}$: le celle di base sono le variabili di base, i $\bar{c}_{ij}$ sono i loro costi ridotti, e il ciclo descrive come cambiano le variabili di base quando $x_e$ cresce.

- Si applica quindi la regola anticiclo di Bland del [Capitolo 7 «Condizioni di ottimalità e regole di pivot»](https://fabiofurini.github.io/programmazione-lineare/simplesso/07-ottimalita-pivot/) del modulo Programmazione lineare: con la prima cella con $\bar{c}_{ij}<0$ in ordine riga–colonna come cella entrante, e la regola di uscita vista sopra, nessuna base si ripete, anche con pivot degeneri.

!!! attenzione "La convenzione u-v"

    Molti libri di testo scrivono il metodo u-v con $u_i+v_j=c_{ij}$ sulle celle di base e $\bar{c}_{ij}=c_{ij}-u_i-v_j$. Sono i potenziali di questo capitolo con $u_i=\pi_i$ per le origini e $v_j=-\pi_j$ per le destinazioni: i costi ridotti sono gli stessi, e i potenziali delle destinazioni cambiano segno.

## 7.4.2 Il metodo dei potenziali sull'istanza di trasporto

- Partiamo dalla soluzione dell'angolo nord-ovest dell'<span style="color:#1971c2">[Esempio 7.5](soluzioni-ammissibili-di-base-iniziali.md#box-13-ta-ex-nw)</span>, di costo $440$.

- In ogni tabella le celle di base (blu) contengono la quantità $\bar{x}_{ij}$ in grassetto, e le altre celle il costo ridotto $\bar{c}_{ij}$; l'ultima colonna e l'ultima riga contengono i potenziali. La cella entrante è rossa, e le celle del ciclo sono segnate con $\oplus$ e $\ominus$.

<a id="box-20-ta-ex-potentials"></a>

!!! esempio "Esempio 7.7: il metodo dei potenziali dall'angolo nord-ovest"

    Nella prima iterazione i potenziali della base nord-ovest si ricavano da $\pi_7=0$, lungo l'albero:

    $$
    \pi_2=\pi_7+c_{27}=2,\qquad \pi_3=\pi_7+c_{37}=6,\qquad \pi_5=\pi_2-c_{25}=-2,
    $$

    $$
    \pi_6=\pi_2-c_{26}=0,\qquad \pi_1=\pi_5+c_{15}=7,\qquad \pi_4=\pi_1-c_{14}=6 .
    $$

    Per esempio, $\bar{c}_{35}=c_{35}-\pi_3+\pi_5=1-6-2=-7$.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th colspan="6"><strong>Iterazione 1</strong></th>
    </tr>
    <tr>
    <td></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(\pi_i\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{10}\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{20}\)</span></td>
    <td><span class="arithmatex">\(-5\)</span></td>
    <td><span class="arithmatex">\(-4\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{5}\,\ominus\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{15}\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{10}\,\oplus\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(9\)</span></td>
    <td class="cella-rossa"><span class="arithmatex">\(-7\,\oplus\)</span></td>
    <td><span class="arithmatex">\(-2\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{30}\,\ominus\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\pi_j\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(-2\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td></td>
    </tr>
    </table></div>

    - I costi ridotti negativi sono $\bar{c}_{35}=-7$, $\bar{c}_{16}=-5$, $\bar{c}_{17}=-4$, $\bar{c}_{36}=-2$; la cella $(3,5)$ entra in base.

    - Il ciclo è $\,(3,5)^{+},\ (3,7)^{-},\ (2,7)^{+},\ (2,5)^{-}$.

    - Le celle con segno $-$ hanno $\bar{x}_{37}=30$ e $\bar{x}_{25}=5$: $\theta=5$, e la cella $(2,5)$ esce dalla base.

    - Il costo passa da $440$ a $440+5\cdot(-7)=405$.

    Nella rete, l'arco entrante $(3,5)$ (rosso, tratteggiato) chiude il ciclo $3,5,2,7,3$ con l'albero.

    ![Figura 4](../../img/transportation-and-assignment/fig04.svg){ .fig loading=lazy  }

    Nella seconda iterazione il ciclo ha sei celle e visita tutte e tre le righe.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th colspan="6"><strong>Iterazione 2</strong></th>
    </tr>
    <tr>
    <td></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(\pi_i\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{10}\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{20}\,\ominus\)</span></td>
    <td class="cella-rossa"><span class="arithmatex">\(-12\,\oplus\)</span></td>
    <td><span class="arithmatex">\(-11\)</span></td>
    <td><span class="arithmatex">\(14\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(14\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{15}\,\ominus\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{15}\,\oplus\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(16\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{5}\,\oplus\)</span></td>
    <td><span class="arithmatex">\(-2\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{25}\,\ominus\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\pi_j\)</span></td>
    <td><span class="arithmatex">\(13\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td></td>
    </tr>
    </table></div>

    - I costi ridotti negativi sono $\bar{c}_{16}=-12$, $\bar{c}_{17}=-11$, $\bar{c}_{36}=-2$; la cella $(1,6)$ entra in base.

    - Il ciclo è $\,(1,6)^{+},\ (1,5)^{-},\ (3,5)^{+},\ (3,7)^{-},\ (2,7)^{+},\ (2,6)^{-}$.

    - Le celle con segno $-$ hanno $\bar{x}_{15}=20$, $\bar{x}_{37}=25$ e $\bar{x}_{26}=15$: $\theta=15$, e la cella $(2,6)$ esce dalla base.

    - Il costo passa da $405$ a $405+15\cdot(-12)=225$.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th colspan="6"><strong>Iterazione 3</strong></th>
    </tr>
    <tr>
    <td></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(\pi_i\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{10}\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{5}\,\ominus\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{15}\)</span></td>
    <td class="cella-rossa"><span class="arithmatex">\(-11\,\oplus\)</span></td>
    <td><span class="arithmatex">\(14\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(14\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(12\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{30}\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(16\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{20}\,\oplus\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{10}\,\ominus\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\pi_j\)</span></td>
    <td><span class="arithmatex">\(13\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(12\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td></td>
    </tr>
    </table></div>

    - L'unico costo ridotto negativo è $\bar{c}_{17}=-11$: la cella $(1,7)$ entra in base.

    - Il ciclo è $\,(1,7)^{+},\ (1,5)^{-},\ (3,5)^{+},\ (3,7)^{-}$.

    - Le celle con segno $-$ hanno $\bar{x}_{15}=5$ e $\bar{x}_{37}=10$: $\theta=5$, e la cella $(1,5)$ esce dalla base.

    - Il costo passa da $225$ a $225+5\cdot(-11)=170$.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th colspan="6"><strong>Iterazione 4</strong></th>
    </tr>
    <tr>
    <td></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(\pi_i\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{10}\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{15}\,\ominus\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{5}\,\oplus\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{30}\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{25}\)</span></td>
    <td class="cella-rossa"><span class="arithmatex">\(-1\,\oplus\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{5}\,\ominus\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\pi_j\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td></td>
    </tr>
    </table></div>

    - L'unico costo ridotto negativo è $\bar{c}_{36}=-1$: la cella $(3,6)$ entra in base.

    - Il ciclo è $\,(3,6)^{+},\ (3,7)^{-},\ (1,7)^{+},\ (1,6)^{-}$.

    - Le celle con segno $-$ hanno $\bar{x}_{37}=5$ e $\bar{x}_{16}=15$: $\theta=5$, e la cella $(3,7)$ esce dalla base.

    - Il costo passa da $170$ a $170+5\cdot(-1)=165$.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th colspan="6"><strong>Iterazione 5</strong></th>
    </tr>
    <tr>
    <td></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(\pi_i\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{10}\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{10}\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{10}\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{30}\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{25}\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{5}\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\pi_j\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td></td>
    </tr>
    </table></div>

    - Tutti i costi ridotti sono non negativi: la soluzione ammissibile di base è ottima, con costo $z=165$.

- La soluzione ottima è

    $$
    \tilde{x}_{14}=10,\quad \tilde{x}_{16}=10,\quad \tilde{x}_{17}=10,\quad \tilde{x}_{27}=30,\quad \tilde{x}_{35}=25,\quad
    \tilde{x}_{36}=5, \qquad z(\mathrm{TP})=165 .
    $$

    Ogni cella fuori dalla base ha $\bar{c}_{ij}>0$, quindi per il <span style="color:#1971c2">[Teorema 7.10](#box-16-ta-th-opt)</span> l'ottimo è unico.

- I potenziali $\tilde{\vet{\pi}}=(3,2,5,2,4,1,0)$ sono ottimi per il modello $D(\mathrm{TP})$, con valore

    $$
    30\,(3+2+5)-(10 \cdot 2+25 \cdot 4+15 \cdot 1+40 \cdot 0)=300-135=165 .
    $$

    Gurobi restituisce la stessa soluzione ottima, e i suoi valori duali coincidono con $\tilde{\vet{\pi}}$.

- Dalla soluzione del costo minimo dell'<span style="color:#1971c2">[Esempio 7.6](soluzioni-ammissibili-di-base-iniziali.md#box-14-ta-ex-mc)</span> il metodo richiede un solo pivot: quella soluzione ha la base dell'iterazione $4$, e la cella entrante $(3,6)$, con $\theta=5$, dà l'ottimo.

## 7.4.3 Degenerazione

<a id="box-21-ta-ex-degenerate"></a>

!!! esempio "Esempio 7.8: un pivot degenere"

    Consideriamo l'istanza

    $$
    \begin{array}{c|ccc|c}
    \hline {c_{ij}} & {4} & {5} & {6} & {a_i} \\
    \hline {1} & {1} & {4} & {7} & {30} \\
    {2} & {6} & {2} & {5} & {25} \\
    {3} & {3} & {9} & {5} & {30} \\
    \hline {d_j} & {30} & {30} & {25} & {85} \\
    \hline
    \end{array}
    $$

    - Nella regola dell'angolo nord-ovest la prima cella esaurisce insieme la riga $1$ e la colonna $4$. Viene barrata solo la riga, e la cella $(2,4)$ entra in $T$ con quantità $0$: la soluzione, di costo $250$, è degenere.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>passo</th>
    <th>cella</th>
    <th>quantità</th>
    <th>barrata</th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\((1,4)\)</span></td>
    <td><span class="arithmatex">\(30\)</span></td>
    <td>riga <span class="arithmatex">\(1\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\((2,4)\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td>colonna <span class="arithmatex">\(4\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\((2,5)\)</span></td>
    <td><span class="arithmatex">\(25\)</span></td>
    <td>riga <span class="arithmatex">\(2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\((3,5)\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td>colonna <span class="arithmatex">\(5\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\((3,6)\)</span></td>
    <td><span class="arithmatex">\(25\)</span></td>
    <td>riga <span class="arithmatex">\(3\)</span>, colonna <span class="arithmatex">\(6\)</span></td>
    </tr>
    </table></div>

    <div class="tabella" markdown="0"><table>
    <tr>
    <th colspan="5"><strong>Iterazione 1</strong></th>
    </tr>
    <tr>
    <td></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(\pi_i\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{30}\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(14\)</span></td>
    <td><span class="arithmatex">\(-7\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{0}\,\ominus\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{25}\,\oplus\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(-2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td class="cella-rossa"><span class="arithmatex">\(-10\,\oplus\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{5}\,\ominus\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{25}\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\pi_j\)</span></td>
    <td><span class="arithmatex">\(-8\)</span></td>
    <td><span class="arithmatex">\(-4\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td></td>
    </tr>
    </table></div>

    - L'unico costo ridotto negativo è $\bar{c}_{34}=-10$: la cella $(3,4)$ entra in base.

    - Il ciclo è $\,(3,4)^{+},\ (3,5)^{-},\ (2,5)^{+},\ (2,4)^{-}$.

    - Le celle con segno $-$ hanno $\bar{x}_{35}=5$ e $\bar{x}_{24}=0$: $\theta=0$, e la cella $(2,4)$ esce dalla base.

    - Il pivot è degenere: la soluzione e il suo costo $z=250$ non cambiano, cambia solo la base.

    Nella seconda iterazione la base è cambiata, quindi sono cambiati anche i potenziali: ora $\bar{c}_{15}<0$.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th colspan="5"><strong>Iterazione 2</strong></th>
    </tr>
    <tr>
    <td></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(\pi_i\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{30}\,\ominus\)</span></td>
    <td class="cella-rossa"><span class="arithmatex">\(-3\,\oplus\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{25}\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(-2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{0}\,\oplus\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{5}\,\ominus\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{25}\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\pi_j\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(-4\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td></td>
    </tr>
    </table></div>

    - L'unico costo ridotto negativo è $\bar{c}_{15}=-3$: la cella $(1,5)$ entra in base.

    - Il ciclo è $\,(1,5)^{+},\ (1,4)^{-},\ (3,4)^{+},\ (3,5)^{-}$.

    - Le celle con segno $-$ hanno $\bar{x}_{14}=30$ e $\bar{x}_{35}=5$: $\theta=5$, e la cella $(3,5)$ esce dalla base.

    - Il costo passa da $250$ a $250+5\cdot(-3)=235$.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th colspan="5"><strong>Iterazione 3</strong></th>
    </tr>
    <tr>
    <td></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(\pi_i\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{25}\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{5}\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{25}\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{5}\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\mathbf{25}\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\pi_j\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(-1\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td></td>
    </tr>
    </table></div>

    - Tutti i costi ridotti sono non negativi: la soluzione ammissibile di base è ottima, con costo $z=235$.

    La soluzione ottima è unica, con costo $235$, e Gurobi lo conferma.

- La cella di base con valore $0$ va tenuta in $T$: senza di essa, le altre quattro celle non ricoprirebbero i sei nodi, e i potenziali non si potrebbero calcolare.

- Il pivot degenere dell'iterazione $1$ non abbassa il costo, ma porta a una base i cui potenziali rivelano una cella migliorante.

!!! chiave ""

    Il metodo dei potenziali calcola i potenziali della base ($\bar{c}_{ij}=0$ sulle celle di base, $\pi_{m+n}=0$), si ferma quando ogni costo ridotto è non negativo, e altrimenti sposta $\theta$ unità lungo il ciclo di una cella entrante. Il costo diminuisce di $\theta\,|\bar{c}_e|$; con $\theta=0$ cambia solo la base.

---

**Avanti:** [7.5 Il problema di assegnamento](il-problema-di-assegnamento.md)
