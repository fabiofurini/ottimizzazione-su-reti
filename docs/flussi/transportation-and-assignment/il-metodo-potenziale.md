---
title: "Il metodo potenziale"
---

# 7.4 Il metodo potenziale { #sez-ta-sec-potentials }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 7** · [:material-book-open-variant: Capitolo 7: Trasporto e assegnamento](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-pencil: Esercizi: Trasporto e assegnamento](../../esercizi/transportation-and-assignment.md)

</div>

- Scriviamo i vincoli [(7.1c)](il-problema-dei-trasporti.md#mjx-eqn:ta:demand) come $-\sum_{i \in P} x_{ij}=-d_j$, i vincoli di conservazione del destinazioni e utilizzare una variabile duale libera $\pi_v$, il potenziale del nodo $v$, per il vincolo di ogni nodo $v \in P \cup D$, entra [Capitolo 4](../network-flow-models/il-modello-duale-e-i-costi-ridotti.md).

!!! chiave ""

    Utilizzando una variabile duale libera $\pi_v$ per il vincolo di ciascun nodo $v \in P \cup D$, il modello duale del modello $\mathrm{TP}$ è:

    <a id="eq-ta-DUAL"></a>

    \begin{align*}
    &&   \max \;\;{\sum_{i \in P} a_i \, \pi_i - \sum_{j \in D} d_j \, \pi_j}                    \label{ta:dobj}  \tag{7.2a}\\[1ex]
    && \text{subject to} \quad  \pi_i - \pi_j &\le c_{ij}, & \forall i \in P,~\forall j \in D, \label{ta:dcons}  \tag{7.2b}\\[1ex]
    && \pi_v &\in \R, & \forall v \in P \cup D.                                           \label{ta:dfree} \tag{7.2c}
    \end{align*}

    Questo modello LP è denominato modello $D(\mathrm{TP})$.

- Con il costo ridotto di $\bar{c}_{ij}=c_{ij}-\pi_i+\pi_j$ di [Capitolo 4](../network-flow-models/il-modello-duale-e-i-costi-ridotti.md), il vincolo duale $\eqref{ta:dcons}$ equivale a richiedere $\bar{c}_{ij} \ge 0$.

- Aggiungere la stessa costante a tutti i potenziali non modifica i costi ridotti né, se l'istanza è bilanciata, il valore della funzione obiettivo $\eqref{ta:dobj}$. Normalizziamo con $\pi_{m+n}=0$ il potenziale dell'ultima destinazione.

- Per ogni $\vet{x}$ che soddisfa i vincoli [(7.1b)](il-problema-dei-trasporti.md#mjx-eqn:ta:supply) e [(7.1c)](il-problema-dei-trasporti.md#mjx-eqn:ta:demand), i potenziali si sommano su riga per riga e colonna per colonna:

    $$
    \sum_{i \in P}\sum_{j \in D} (\pi_i-\pi_j)\,x_{ij}=\sum_{i \in P} a_i\,\pi_i-\sum_{j \in D} d_j\,\pi_j ,
    $$

    e da $c_{ij}=\bar{c}_{ij}+\pi_i-\pi_j$,

    $$
    \sum_{i \in P}\sum_{j \in D} c_{ij}\,x_{ij}=\sum_{i \in P}\sum_{j \in D}\bar{c}_{ij}\,x_{ij}+\sum_{i \in P}
    a_i\,\pi_i-\sum_{j \in D} d_j\,\pi_j .
    $$

    Questo è il Lemma «costo e costo ridotto» del Capitolo 4 per la rete bipartita.

<a id="box-15-ta-def-potentials"></a>

!!! definizione "Definizione 7.9: potenziali di una base"

    I <strong>potenziali di una base</strong> $T$ sono i valori $\pi_v$, $v \in P \cup D$, tali che

    $$
    \bar{c}_{ij}=c_{ij}-\pi_i+\pi_j=0, \quad \forall (i,j) \in T, \qquad\qquad \pi_{m+n}=0 .
    $$

- I potenziali associati a una base esistono e sono univoci. A partire da $\pi_{m+n}=0$, una cella base $(i,j)$ con un estremo già noto permette di calcolare l'altro: $\pi_i=\pi_j+c_{ij}$ o $\pi_j=\pi_i-c_{ij}$. Ogni nodo viene raggiunto lungo il suo percorso unico nell'albero da $m+n$, che ne forza il valore.

<a id="box-16-ta-th-opt"></a>

!!! teorema "Teorema 7.10: criterio di ottimalità"

    Sia $\bar{\vet{x}}$ la soluzione di base ammissibile di una base $T$, con potenziali $\vet{\pi}$. Se $\bar{c}_{ij} \ge 0$ per ogni cella, allora $\bar{\vet{x}}$ è ottimale per il modello $\mathrm{TP}$, $\vet{\pi}$ è ottimale per il modello $D(\mathrm{TP})$, e

    $$
    \sum_{i \in P}\sum_{j \in D} c_{ij}\,\bar{x}_{ij}=\sum_{i \in P} a_i\,\pi_i-\sum_{j \in D} d_j\,\pi_j .
    $$

    Se inoltre $\bar{c}_{ij}>0$ per ogni cella esterna a $T$, allora $\bar{\vet{x}}$ è l'unica soluzione ottimale.

??? dimostrazione "Dimostrazione"

    Usiamo l'identità sopra. Lascia che $z_\pi=\sum_{i \in P} a_i\pi_i-\sum_{j \in D} d_j\pi_j$.

    1. Per $\bar{\vet{x}}$: $\bar{c}_{ij}=0$ su $T$ e $\bar{x}_{ij}=0$ all'esterno di $T$, quindi $\sum \bar{c}_{ij}\bar{x}_{ij}=0$ e il costo di $\bar{\vet{x}}$ è $z_\pi$.

    2. Per ogni $\vet{x}$ ammissibile: $\bar{c} \ge 0$ e $\vet{x} \ge \vet{0}$, quindi il suo costo è almeno $z_\pi$; quindi $\bar{\vet{x}}$ è ottimale. I potenziali soddisfano $\eqref{ta:dcons}$, e il loro valore $z_\pi$ equivale a un costo primario: da dualità debole sono ottimali.

    3. Se $\bar{c}_{ij}>0$ esterno a $T$, uno $\vet{x}$ ottimale ha $\sum \bar{c}_{ij}x_{ij}=0$, quindi $x_{ij}=0$ esterno $T$: è la soluzione base di $T$, ovvero $\bar{\vet{x}}$ di <span style="color:#1971c2">[Teorema 7.6](soluzioni-di-base.md#box-9-ta-th-basis)</span>. <span class="qed">□</span>

## 7.4.1 Il ciclo di una cella e il pivot

<a id="box-17-ta-lem-cycle"></a>

!!! teorema "Lemma 7.11: il ciclo di una cella non basica"

    Sia $T$ una base e $e=(k,l) \notin T$. Le celle $T \cup \{e\}$ contengono esattamente un ciclo $C$, composto da $e$ e da il percorso da $l$ a $k$ nell'albero. Scrivi $C$ partendo da $e$ e muovendoti prima lungo la riga $k$, e dai il segno $+$ alle celle in posizione dispari ($e$ compreso) e $-$ alle altre. Quindi ogni riga e ogni colonna che soddisfa $C$ contiene esattamente una cella di $C$ con segno $+$ e una con segno $-$.

??? dimostrazione "Dimostrazione"

    Il ciclo è il ciclo fondamentale dell'arco $(k,l)$ (Proposizione «ciclo fondamentale» di [Capitolo 1](../../grafi/graphs/alberi-e-foreste.md)). Visita il nodi $k,j_1,i_1,j_2,\dots,l$ alternativamente in $P$ e in $D$, quindi ha un numero pari di celle e due consecutive le celle condividono un nodo: le prime due condividono la riga $k$, le due successive una colonna e così via. Ogni nodo di $C$ si trova in esattamente due celle di $C$, che sono consecutive lungo $C$, l'ultima e la prima comprese: le loro posizioni sono parità diversa, quindi segni diversi. <span class="qed">□</span>

<a id="box-18-ta-th-pivot"></a>

!!! teorema "Teorema 7.12: il perno"

    Sia $\bar{\vet{x}}$ la soluzione ammissibile di base di una base $T$ con potenziali $\vet{\pi}$, sia $e \notin T$ con $\bar{c}_e<0$, siano $C^+$ e $C^-$ le celle del suo ciclo con segno $+$ e $-$, e siano

    $$
    \theta=\min\{\bar{x}_f : f \in C^-\},
    $$

    raggiunto in una cella $f^\ast \in C^-$. Per $0 \le t \le \theta$, lasciare che $\vet{x}(t)$ sia $\bar{\vet{x}}$ con $t$ aggiunto sulle celle di $C^+$ e sottratto sulle celle di $C^-$.

    - **(a)** $\vet{x}(t)$ è fattibile e il suo costo è il costo di $\bar{\vet{x}}$ più $t\,\bar{c}_e$.

    - **(b)** $T'=T \cup \{e\} \setminus \{f^\ast\}$ è una base e $\vet{x}(\theta)$ è la sua soluzione fattibile di base.

??? dimostrazione "Dimostrazione"

    1. <em>Fattibilità.</em> Per <span style="color:#1971c2">[Lemma 7.11](#box-17-ta-lem-cycle)</span> ogni riga e colonna di $C$ guadagna $t$ su uno cella e perde $t$ su un'altra, quindi tutte le somme rimangono invariate. Le celle di $C^-$ mantengono $\bar{x}_f-t \ge 0$ da $t \le \theta$.

    2. <em>Costo.</em> La variazione del costo è $t\big(\sum_{C^+} c_{ij}-\sum_{C^-} c_{ij}\big)$. Ogni nodo di $C$ si trova in una cella di $C^+$ e una di $C^-$, quindi $\sum_{C^+}(\pi_i-\pi_j)=\sum_{C^-}(\pi_i-\pi_j)$, e la modifica è $t\big(\sum_{C^+}\bar{c}_{ij}-\sum_{C^-}\bar{c}_{ij}\big)=t\,\bar{c}_e$: le altre celle di $C$ sono base, con $\bar{c}_{ij}=0$.

    3. <em>Nuova base.</em> $T'$ ha celle $m+n-1$ e non ha ciclo: l'unico ciclo di $T \cup \{e\}$ è $C$, che contiene $f^\ast$. Un insieme aciclico di archi $m+n-1$ sui nodi $m+n$ è uno albero ricoprente (Teorema «caratterizzazioni di un albero» del Capitolo 1). $\vet{x}(\theta)$ è zero all'esterno di $T'$, poiché $x_{f^\ast}(\theta)=0$, quindi è la soluzione di base di $T'$. <span class="qed">□</span>

!!! algoritmo "Algoritmo: Il metodo potenziale"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> un'istanza bilanciata con forniture <span class="arithmatex">\(a_i\)</span>, richieste <span class="arithmatex">\(d_j\)</span> e costi <span class="arithmatex">\(c_{ij}\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> una soluzione fattibile di base ottimale <span class="arithmatex">\(\tilde{\vet{x}}\)</span> e potenziali ottimali <span class="arithmatex">\(\tilde{\vet{\pi}}\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Passaggio 0 (base iniziale).</strong> Costruisci una base <span class="arithmatex">\(T\)</span> e la sua soluzione di base fattibile <span class="arithmatex">\(\bar{\vet{x}}\)</span> con il
    regola dell'angolo nord-ovest o regola del costo minimo.</div><div class="pc" style="--liv:0"><span class="pc-n">2</span><strong>Passaggio 1 (potenziali).</strong> Calcola i potenziali di <span class="arithmatex">\(T\)</span> e i costi ridotti <span class="arithmatex">\(\bar{c}_{ij}=c_{ij}-\pi_i+\pi_j\)</span> di
    le celle all'esterno di <span class="arithmatex">\(T\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">3</span><strong>Passaggio 2 (test di ottimalità).</strong> Se <span class="arithmatex">\(\bar{c}_{ij} \ge 0\)</span> per ogni cella, <code>STOP</code>: <span class="arithmatex">\(\bar{\vet{x}}\)</span> è ottimale.</div><div class="pc" style="--liv:0"><span class="pc-n">4</span><strong>Passaggio 3 (immissione nella cella).</strong> Scegli una cella <span class="arithmatex">\(e\)</span> con <span class="arithmatex">\(\bar{c}_e<0\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">5</span><strong>Passaggio 4 (ciclo).</strong> Trova il ciclo di <span class="arithmatex">\(e\)</span> con i suoi segni, <span class="arithmatex">\(\theta:=\min\{\bar{x}_f : f \in C^-\}\)</span>, e un'uscita
    cella <span class="arithmatex">\(f^\ast \in C^-\)</span> con <span class="arithmatex">\(\bar{x}_{f^\ast}=\theta\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">6</span><strong>Passaggio 5 (perno).</strong> Aggiungi <span class="arithmatex">\(\theta\)</span> su <span class="arithmatex">\(C^+\)</span>, sottrai <span class="arithmatex">\(\theta\)</span> su <span class="arithmatex">\(C^-\)</span>, imposta <span class="arithmatex">\(T:=T \cup \{e\} \setminus \{f^\ast\}\)</span> e vai al passaggio 1.</div></div>

- <strong>Regole degli esempi.</strong> Nel passo 3 la cella in ingresso ha il costo ridotto più negativo (il più piccolo $i$, poi $j$, in parità). Nel passaggio 4 il ciclo viene scritto dalla cella in entrata che si muove prima lungo la sua riga e in uscita cella è la prima cella di $C^-$ con $\bar{x}_f=\theta$ in ordine riga-colonna.

- Il metodo è noto anche come <strong>metodo u-v</strong> o metodo MODI (distribuzione modificata) e il ciclo come metodo <strong>stepping stone</strong> percorso: gli importi si muovono lungo di esso come sulle pietre al di là di un fiume.

<a id="box-19-ta-th-termination"></a>

!!! teorema "Teorema 7.13: terminazione"

    Se $\theta>0$ ad ogni iterazione, il metodo potenziale si ferma dopo un numero finito di iterazioni con una base ottimale soluzione fattibile e potenziali ottimali.

??? dimostrazione "Dimostrazione"

    Con <span style="color:#1971c2">[Teorema 7.12](#box-18-ta-th-pivot)</span> ogni iterazione con $\theta>0$ si sposta su una nuova base e diminuisce il costo di $\theta\,|\bar{c}_e|>0$. Una base determina la sua soluzione di base (<span style="color:#1971c2">[Teorema 7.6](soluzioni-di-base.md#box-9-ta-th-basis)</span>), quindi una base visitata due volte avrebbe due costi diversi: nessuna base si ripete. Esistono un numero finito di set di $m+n-1$ celle, quindi il metodo si interrompe al passaggio 2 e si applica <span style="color:#1971c2">[Teorema 7.10](#box-16-ta-th-opt)</span>. <span class="qed">□</span>

- Quando $\theta=0$ il pivot è <strong>degenere</strong>: cambia la base, ma non la soluzione di base né il costo. Il metodo dei potenziali è l'algoritmo del simplesso sul modello $\mathrm{TP}$: le celle di base sono le variabili di base, $\bar{c}_{ij}$ sono i costi ridotti e il ciclo descrive come cambiano le variabili di base quando $x_e$ cresce.

- La regola anticiclaggio di Bland garantisce che nessuna base si ripeta, anche in presenza di pivot degeneri. Qui scegliamo come cella entrante la prima con $\bar{c}_{ij}<0$ in ordine lessicografico e applichiamo la regola di uscita descritta nel [Capitolo 7 «Condizioni di ottimalità e regole pivot»](https://fabiofurini.github.io/programmazione-lineare/simplesso/07-ottimalita-pivot/) del modulo di Programmazione lineare.

!!! attenzione "La convenzione u-v"

    Molti libri di testo formulano il metodo $u$-$v$ con $u_i+v_j=c_{ij}$ sulle celle di base e $\bar{c}_{ij}=c_{ij}-u_i-v_j$. Nella notazione di questo capitolo, si pone $u_i=\pi_i$ per le origini e $v_j=-\pi_j$ per le destinazioni. I costi ridotti coincidono; cambia soltanto il segno dei potenziali associati alle destinazioni.

## 7.4.2 Il metodo potenziale sull'istanza di trasporto

- Partiamo dalla soluzione angolo nord-ovest di <span style="color:#1971c2">[Esempio 7.5](soluzioni-iniziali-di-base-fattibili.md#box-13-ta-ex-nw)</span>, di costo $440$.

- In ogni tableau le celle base (blu) contengono la quantità $\bar{x}_{ij}$ in grassetto, e le altre celle la quantità ridotta costo $\bar{c}_{ij}$; l'ultima colonna e l'ultima riga contengono i potenziali. La cella entrante è rossa e le celle del ciclo sono contrassegnate con $\oplus$ e $\ominus$.

<a id="box-20-ta-ex-potentials"></a>

!!! esempio "Esempio 7.7: il metodo potenziale dall'angolo nord-ovest"

    Nella prima iterazione i potenziali della base nord-ovest provengono da $\pi_7=0$, lungo l'albero:

    $$
    \pi_2=\pi_7+c_{27}=2,\qquad \pi_3=\pi_7+c_{37}=6,\qquad \pi_5=\pi_2-c_{25}=-2,
    $$

    $$
    \pi_6=\pi_2-c_{26}=0,\qquad \pi_1=\pi_5+c_{15}=7,\qquad \pi_4=\pi_1-c_{14}=6 .
    $$

    Ad esempio, $\bar{c}_{35}=c_{35}-\pi_3+\pi_5=1-6-2=-7$.

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

    - I costi ridotti negativi sono $\bar{c}_{35}=-7$, $\bar{c}_{16}=-5$, $\bar{c}_{17}=-4$, $\bar{c}_{36}=-2$; la cella $(3,5)$ entra nella base.

    - Il ciclo è $\,(3,5)^{+},\ (3,7)^{-},\ (2,7)^{+},\ (2,5)^{-}$.

    - Le celle con segno $-$ hanno $\bar{x}_{37}=30$ e $\bar{x}_{25}=5$: $\theta=5$ e la cella $(2,5)$ lascia la base.

    - Il costo va da $440$ a $440+5\cdot(-7)=405$.

    Nella rete l'arco entrante $(3,5)$ (rosso tratteggiato) chiude il ciclo $3,5,2,7,3$ con l'albero.

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

    - I costi ridotti negativi sono $\bar{c}_{16}=-12$, $\bar{c}_{17}=-11$, $\bar{c}_{36}=-2$; la cella $(1,6)$ entra nella base.

    - Il ciclo è $\,(1,6)^{+},\ (1,5)^{-},\ (3,5)^{+},\ (3,7)^{-},\ (2,7)^{+},\ (2,6)^{-}$.

    - Le celle con segno $-$ hanno $\bar{x}_{15}=20$, $\bar{x}_{37}=25$ e $\bar{x}_{26}=15$: $\theta=15$ e la cella $(2,6)$ lascia la base.

    - Il costo va da $405$ a $405+15\cdot(-12)=225$.

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

    - L'unico costo ridotto negativo è $\bar{c}_{17}=-11$: la cella $(1,7)$ entra nella base.

    - Il ciclo è $\,(1,7)^{+},\ (1,5)^{-},\ (3,5)^{+},\ (3,7)^{-}$.

    - Le celle con segno $-$ hanno $\bar{x}_{15}=5$ e $\bar{x}_{37}=10$: $\theta=5$ e la cella $(1,5)$ lascia la base.

    - Il costo va da $225$ a $225+5\cdot(-11)=170$.

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

    - L'unico costo ridotto negativo è $\bar{c}_{36}=-1$: la cella $(3,6)$ entra nella base.

    - Il ciclo è $\,(3,6)^{+},\ (3,7)^{-},\ (1,7)^{+},\ (1,6)^{-}$.

    - Le celle con segno $-$ hanno $\bar{x}_{37}=5$ e $\bar{x}_{16}=15$: $\theta=5$ e la cella $(3,7)$ lascia la base.

    - Il costo va da $170$ a $170+5\cdot(-1)=165$.

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

    - Tutti i costi ridotti sono non negativi: la soluzione di base ammissibile è ottimale, con costo $z=165$.

- La soluzione ottimale è

    $$
    \tilde{x}_{14}=10,\quad \tilde{x}_{16}=10,\quad \tilde{x}_{17}=10,\quad \tilde{x}_{27}=30,\quad \tilde{x}_{35}=25,\quad
    \tilde{x}_{36}=5, \qquad z(\mathrm{TP})=165 .
    $$

    Ogni cella esterna alla base ha $\bar{c}_{ij}>0$, quindi per <span style="color:#1971c2">[Teorema 7.10](#box-16-ta-th-opt)</span> l'ottimo è unico.

- I potenziali $\tilde{\vet{\pi}}=(3,2,5,2,4,1,0)$ sono ottimali per il modello $D(\mathrm{TP})$, con valore

    $$
    30\,(3+2+5)-(10 \cdot 2+25 \cdot 4+15 \cdot 1+40 \cdot 0)=300-135=165 .
    $$

    Gurobi restituisce la stessa soluzione ottimale e i suoi valori duali coincidono con $\tilde{\vet{\pi}}$.

- Dalla soluzione a costo minimo di <span style="color:#1971c2">[Esempio 7.6](soluzioni-iniziali-di-base-fattibili.md#box-14-ta-ex-mc)</span> il metodo necessita di un unico pivot: quella soluzione ha la base dell'iterazione $4$ e la cella in ingresso $(3,6)$, con $\theta=5$, fornisce l'ottimale.

## 7.4.3 Degeneracy

<a id="box-21-ta-ex-degenerate"></a>

!!! esempio "Esempio 7.8: un pivot degenerato"

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

    - Nella regola dell'angolo nord-ovest la prima cella scarica la riga $1$ e la colonna $4$ contemporaneamente. Solo la riga è incrociata esce, e la cella $(2,4)$ entra in $T$ con l'importo $0$: la soluzione, di costo $250$, è degenere.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>passo</th>
    <th>cella</th>
    <th>importo</th>
    <th>barrato</th>
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

    - L'unico costo ridotto negativo è $\bar{c}_{34}=-10$: la cella $(3,4)$ entra nella base.

    - Il ciclo è $\,(3,4)^{+},\ (3,5)^{-},\ (2,5)^{+},\ (2,4)^{-}$.

    - Le celle con segno $-$ hanno $\bar{x}_{35}=5$ e $\bar{x}_{24}=0$: $\theta=0$ e la cella $(2,4)$ lascia la base.

    - Il perno è degenere: la soluzione ed il suo costo $z=250$ non cambiano, cambia solo la base.

    Nella seconda iterazione è cambiata la base, quindi sono cambiate anche i potenziali: ora $\bar{c}_{15}<0$.

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

    - L'unico costo ridotto negativo è $\bar{c}_{15}=-3$: la cella $(1,5)$ entra nella base.

    - Il ciclo è $\,(1,5)^{+},\ (1,4)^{-},\ (3,4)^{+},\ (3,5)^{-}$.

    - Le celle con segno $-$ hanno $\bar{x}_{14}=30$ e $\bar{x}_{35}=5$: $\theta=5$ e la cella $(3,5)$ lascia la base.

    - Il costo va da $250$ a $250+5\cdot(-3)=235$.

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

    - Tutti i costi ridotti sono non negativi: la soluzione di base ammissibile è ottimale, con costo $z=235$.

    La soluzione ottimale è unica, con costo $235$, e Gurobi lo conferma.

- La cella base con valore $0$ deve essere mantenuta in $T$: senza di essa le altre quattro celle non si estenderebbero sulle sei nodi e i potenziali non potevano essere calcolati.

- Il perno degenere dell'iterazione $1$ non abbassa il costo, ma si sposta su una base le cui potenziali rivelano una cella migliorante.

!!! chiave ""

    Il metodo dei potenziali calcola i potenziali della base ($\bar{c}_{ij}=0$ sulle celle base, $\pi_{m+n}=0$), ferma quando ogni costo ridotto non è negativo e altrimenti sposta le unità $\theta$ attorno al ciclo di una cella in entrata. Il riduzione dei costi di $\theta\,|\bar{c}_e|$; con $\theta=0$ cambia solo la base.

---

**Avanti:** [7.5 Il problema dell'assegnazione](il-problema-dell-assegnazione.md)
