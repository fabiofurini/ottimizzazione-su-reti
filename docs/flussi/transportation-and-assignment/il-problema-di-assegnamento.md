---
title: "Il problema di assegnamento"
---

# 7.5 Il problema di assegnamento

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 7** · [:material-book-open-variant: Capitolo 7: Trasporto e assegnamento](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-presentation: Slide](../../pdf/slide-transportation-and-assignment.pdf) · [:material-pencil: Esercizi: Trasporto e assegnamento](../../esercizi/transportation-and-assignment.md) · [:material-gesture-tap: App: Trasporto: soluzione iniziale e metodo dei potenziali](../../laboratorio/trasporto-metodo-dei-potenziali.md) · [:material-gesture-tap: App: Assegnamento: l'algoritmo ungherese](../../laboratorio/assegnamento-algoritmo-ungherese.md)

</div>

<a id="sez-ta-sec-assignment"></a>

<a id="box-22-ta-def-ap"></a>

!!! definizione "Definizione 7.14: problema di assegnamento"

    Ci sono $n$ lavoratori, le origini $P=\{1,2,\dots,n\}$, e $n$ lavori, le destinazioni $D=\{n+1,n+2,\dots,2n\}$; $c_{ij}$ è il costo di assegnare il lavoratore $i$ al lavoro $j$. Un <strong>assegnamento</strong> dà a ogni lavoratore esattamente un lavoro e ogni lavoro a esattamente un lavoratore. Il <strong>problema di assegnamento</strong> chiede un assegnamento di costo totale minimo.

- Usiamo una variabile binaria $x_{ij}$ per ogni coppia $i \in P$, $j \in D$, uguale a $1$ se il lavoratore $i$ riceve il lavoro $j$.

!!! chiave ""

    Con queste variabili, un modello di programmazione lineare intera (ILP) per il problema di assegnamento è il seguente:

    <a id="eq-ta-AP"></a>

    \begin{align*}
    &&   \min \;\;{\sum_{i \in P} \sum_{j \in D} c_{ij} \, x_{ij}}                                \label{ta:aobj}  \tag{7.3a}\\[1ex]
    && \text{soggetto a} \quad  \sum_{j \in D} x_{ij} &= 1, & \forall i \in P,                \label{ta:arow}  \tag{7.3b}\\[1ex]
    && \sum_{i \in P} x_{ij} &= 1, & \forall j \in D,                                        \label{ta:acol}  \tag{7.3c}\\[1ex]
    && x_{ij} &\in \{0,1\}, & \forall i \in P,~\forall j \in D.                               \label{ta:adom} \tag{7.3d}
    \end{align*}

    Questo modello è detto modello $\mathrm{AP}$.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{AP}$:

    - la funzione obiettivo $\eqref{ta:aobj}$ minimizza il costo totale dell'assegnamento;

    - i vincoli $\eqref{ta:arow}$ danno a ogni lavoratore esattamente un lavoro;

    - i vincoli $\eqref{ta:acol}$ danno ogni lavoro a esattamente un lavoratore;

    - infine, i vincoli $\eqref{ta:adom}$ definiscono le variabili binarie del modello.

- Una matrice $n \times n$ con elementi in $\{0,1\}$ ed esattamente un $1$ in ogni riga e in ogni colonna è una <strong>matrice di permutazione</strong>. Le soluzioni ammissibili del modello $\mathrm{AP}$ sono le matrici di permutazione: ci sono $n!$ assegnamenti.

<a id="box-23-ta-prop-ap"></a>

!!! teorema "Proposizione 7.15: il rilassamento LP del modello di assegnamento"

    Il rilassamento LP del modello $\mathrm{AP}$, con $x_{ij} \ge 0$ al posto di $\eqref{ta:adom}$, è il modello $\mathrm{TP}$ con $a_i=1$ e $d_j=1$. I suoi vertici sono matrici di permutazione, e ha una soluzione ottima che è un assegnamento.

??? dimostrazione "Dimostrazione"

    I vincoli $\eqref{ta:arow}$ e $\eqref{ta:acol}$ sono i vincoli [(7.1b)](il-problema-di-trasporto.md#mjx-eqn:ta:supply) e [(7.1c)](il-problema-di-trasporto.md#mjx-eqn:ta:demand) con offerte e domande unitarie, e l'istanza è bilanciata, con totale $n$. Per la <span style="color:#1971c2">[Proposizione 7.2](il-problema-di-trasporto.md#box-2-ta-prop-exist)</span> ha una soluzione ottima in un vertice, e ogni vertice è intero per il Teorema «vertici interi» del [Capitolo 4](../network-flow-models/totale-unimodularita-e-integralita.md). Una soluzione ammissibile intera ha $0 \le x_{ij} \le 1$, perché $x_{ij}$ è al più la somma della sua riga: è una matrice di permutazione. <span class="qed">□</span>

<a id="box-24-ta-ex-ap"></a>

!!! esempio "Esempio 7.9: quattro lavoratori e quattro lavori"

    Quattro lavoratori $1,2,3,4$ e quattro lavori $5,6,7,8$ hanno i costi

    $$
    \begin{array}{c|cccc}
    \hline {c_{ij}} & {5} & {6} & {7} & {8} \\
    \hline {1} & {2} & {4} & {3} & {5} \\
    {2} & {4} & {8} & {1} & {1} \\
    {3} & {2} & {6} & {9} & {6} \\
    {4} & {1} & {9} & {8} & {6} \\
    \hline
    \end{array}
    $$

    I $4!=24$ assegnamenti, enumerati, hanno un unico minimo: il lavoratore $1$ riceve il lavoro $7$, il lavoratore $2$ il lavoro $8$, il lavoratore $3$ il lavoro $6$, il lavoratore $4$ il lavoro $5$, con costo $3+1+6+1=11$. Gurobi dà lo stesso assegnamento come soluzione ottima del rilassamento LP.

### 7.5.1 Degenerazione del metodo dei potenziali

- Una base del rilassamento LP ha $2n-1$ celle, ma un assegnamento ha solo $n$ celle con $x_{ij}=1$: ogni soluzione ammissibile di base ha $n-1$ celle di base con valore $0$, ed è degenere.

- Il metodo dei potenziali risolve il rilassamento LP, ma molti suoi pivot hanno $\theta=0$. Sull'<span style="color:#1971c2">[Esempio 7.9](#box-24-ta-ex-ap)</span> la regola dell'angolo nord-ovest dà la base qui sotto, con tre zeri di base; da questa base il metodo dei potenziali arriva all'ottimo dopo $6$ pivot, $4$ dei quali degeneri.

<div class="tabella" markdown="0"><table>
<tr>
<th><span class="arithmatex">\(\bar{x}_{ij}\)</span></th>
<th><span class="arithmatex">\(5\)</span></th>
<th><span class="arithmatex">\(6\)</span></th>
<th><span class="arithmatex">\(7\)</span></th>
<th><span class="arithmatex">\(8\)</span></th>
<th><span class="arithmatex">\(a_i\)</span></th>
</tr>
<tr>
<td><span class="arithmatex">\(1\)</span></td>
<td class="cella-blu"><span class="arithmatex">\(1\)</span></td>
<td></td>
<td></td>
<td></td>
<td><span class="arithmatex">\(1\)</span></td>
</tr>
<tr>
<td><span class="arithmatex">\(2\)</span></td>
<td class="cella-blu"><span class="arithmatex">\(0\)</span></td>
<td class="cella-blu"><span class="arithmatex">\(1\)</span></td>
<td></td>
<td></td>
<td><span class="arithmatex">\(1\)</span></td>
</tr>
<tr>
<td><span class="arithmatex">\(3\)</span></td>
<td></td>
<td class="cella-blu"><span class="arithmatex">\(0\)</span></td>
<td class="cella-blu"><span class="arithmatex">\(1\)</span></td>
<td></td>
<td><span class="arithmatex">\(1\)</span></td>
</tr>
<tr>
<td><span class="arithmatex">\(4\)</span></td>
<td></td>
<td></td>
<td class="cella-blu"><span class="arithmatex">\(0\)</span></td>
<td class="cella-blu"><span class="arithmatex">\(1\)</span></td>
<td><span class="arithmatex">\(1\)</span></td>
</tr>
<tr>
<td><span class="arithmatex">\(d_j\)</span></td>
<td><span class="arithmatex">\(1\)</span></td>
<td><span class="arithmatex">\(1\)</span></td>
<td><span class="arithmatex">\(1\)</span></td>
<td><span class="arithmatex">\(1\)</span></td>
<td></td>
</tr>
</table></div>

### 7.5.2 Riduzioni e potenziali

<a id="box-25-ta-lem-reduce"></a>

!!! teorema "Lemma 7.16: costi ridotti di un assegnamento"

    Dati i potenziali $\vet{\pi}$, sia $\bar{c}_{ij}=c_{ij}-\pi_i+\pi_j$. Per ogni $\vet{x}$ che soddisfa $\eqref{ta:arow}$ e $\eqref{ta:acol}$,

    $$
    \sum_{i \in P}\sum_{j \in D} c_{ij}\,x_{ij}=\sum_{i \in P}\sum_{j \in D} \bar{c}_{ij}\,x_{ij}+\sum_{i \in P}\pi_i-
    \sum_{j \in D}\pi_j .
    $$

    Quindi sottrarre una costante da una riga o da una colonna della matrice dei costi cambia il costo di ogni assegnamento della stessa costante, e gli assegnamenti ottimi non cambiano.

??? dimostrazione "Dimostrazione"

    È l'identità della <span style="color:#1971c2">Sezione [7.4](il-metodo-dei-potenziali.md#sez-ta-sec-potentials)</span> con $a_i=d_j=1$. Sottrarre $r$ dalla riga $i$ dà i costi ridotti di $\pi_i=r$ con gli altri potenziali uguali a $0$; sottrarre $s$ dalla colonna $j$ dà quelli di $\pi_j=-s$. <span class="qed">□</span>

<a id="box-26-ta-cor-zero"></a>

!!! teorema "Corollario 7.17: gli assegnamenti a costo ridotto nullo sono ottimi"

    Se $\bar{c}_{ij} \ge 0$ per ogni cella e un assegnamento usa solo celle con $\bar{c}_{ij}=0$, allora è ottimo, anche per il rilassamento LP, il suo costo è $\sum_{i \in P}\pi_i-\sum_{j \in D}\pi_j$, e $\vet{\pi}$ è ottima per il duale del rilassamento LP, il modello $D(\mathrm{TP})$ con $a_i=d_j=1$.

??? dimostrazione "Dimostrazione"

    Per il <span style="color:#1971c2">[Lemma 7.16](#box-25-ta-lem-reduce)</span>, l'assegnamento costa $\sum_{i \in P}\pi_i-\sum_{j \in D}\pi_j$, e ogni $\vet{x} \ge \vet{0}$ che soddisfa $\eqref{ta:arow}$ e $\eqref{ta:acol}$ costa almeno altrettanto, perché $\bar{c} \ge 0$. I potenziali soddisfano $\pi_i-\pi_j \le c_{ij}$ con lo stesso valore, quindi sono ottimi per la dualità debole. <span class="qed">□</span>

### 7.5.3 Zeri indipendenti e linee

<a id="box-27-ta-def-cover"></a>

!!! definizione "Definizione 7.18: zeri indipendenti e coperture"

    Sia $\bar{c}$ una matrice $n \times n$ con elementi non negativi. Un insieme di elementi nulli è <strong>indipendente</strong> se due di essi non stanno mai nella stessa riga o nella stessa colonna. Un insieme di <strong>linee</strong>, righe e colonne, <strong>copre</strong> gli zeri se ogni elemento nullo sta in almeno una delle linee.

- $n$ zeri indipendenti formano un assegnamento di costo ridotto nullo, ottimo per il <span style="color:#1971c2">[Corollario 7.17](#box-26-ta-cor-zero)</span>.

- Nella rete bipartita i cui archi sono le celle con $\bar{c}_{ij}=0$, un insieme di zeri indipendenti è un matching, cioè un insieme di archi senza estremi in comune, come nel [Capitolo 5 «Flusso massimo»](../maximum-flow/index.md), e una copertura è un insieme di nodi che tocca ogni arco.

<a id="box-28-ta-th-konig"></a>

!!! teorema "Teorema 7.19: König ed Egerváry"

    Il numero massimo di zeri indipendenti di una matrice è uguale al numero minimo di linee che coprono tutti i suoi zeri.

??? dimostrazione "Dimostrazione"

    Sia $M$ un insieme massimo di zeri indipendenti. Una riga o una colonna è <strong>accoppiata</strong> se contiene uno zero di $M$.

    1. <em>Linee $\ge$ zeri.</em> Gli zeri di $M$ stanno in righe e colonne diverse, quindi una linea ne contiene al più uno, e una copertura richiede almeno $|M|$ linee.

    2. <em>Cammini alternanti.</em> Un <strong>cammino alternante</strong> parte da una riga non accoppiata, va da una riga a una colonna attraverso uno zero non in $M$, e da una colonna a una riga attraverso lo zero di $M$ di quella colonna. Siano $R$ e $K$ le righe e le colonne raggiunte da cammini alternanti, comprese le righe non accoppiate.

    3. <em>Ogni colonna di $K$ è accoppiata.</em> Altrimenti un cammino alternante termina in una colonna non accoppiata. Lungo di esso, gli zeri non in $M$ sono uno in più degli zeri di $M$: scambiandoli si ottiene un insieme indipendente con $|M|+1$ zeri, contro la massimalità di $M$.

    4. <em>Le linee.</em> Sia $L$ l'insieme delle righe non in $R$ e delle colonne in $K$. Uno zero $(i,j)$ con riga $i \in R$ ha colonna $j \in K$: se non è in $M$, un cammino fino a $i$ prosegue fino a $j$; se è in $M$, la riga $i$ è accoppiata, quindi è stata raggiunta dalla sua colonna $j$. Quindi $L$ copre tutti gli zeri.

    5. <em>Conteggio.</em> Le righe non in $R$ sono accoppiate, perché le righe non accoppiate stanno in $R$, e le colonne di $K$ sono accoppiate. Uno zero di $M$ in una colonna di $K$ ha la sua riga in $R$, quindi sta esattamente su una linea di $L$. Linee e zeri di $M$ si corrispondono uno a uno, e $|L|=|M|$. <span class="qed">□</span>

- La dimostrazione è costruttiva: dà le linee di una copertura minima a partire da un insieme massimo di zeri indipendenti, e un insieme che non è massimo si allarga lungo un cammino alternante che termina in una colonna non accoppiata.

### 7.5.4 L'algoritmo ungherese

!!! algoritmo "Algoritmo: L'algoritmo ungherese"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> una matrice dei costi <span class="arithmatex">\(n \times n\)</span> <span class="arithmatex">\(c_{ij}\)</span>, <span class="arithmatex">\(i \in P\)</span>, <span class="arithmatex">\(j \in D\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> un assegnamento ottimo e potenziali ottimi <span class="arithmatex">\(\vet{\pi}\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Passo 0 (riduzione).</strong> Sottrarre da ogni riga il suo minimo, <span class="arithmatex">\(\pi_i\)</span>; poi sottrarre da ogni colonna del risultato
    il suo minimo, <span class="arithmatex">\(-\pi_j\)</span>. Sia <span class="arithmatex">\(\bar{c}\)</span> la matrice ridotta.</div><div class="pc" style="--liv:0"><span class="pc-n">2</span><strong>Passo 1 (zeri indipendenti).</strong> Trovare un insieme massimo <span class="arithmatex">\(M\)</span> di zeri indipendenti di <span class="arithmatex">\(\bar{c}\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">3</span>  Se <span class="arithmatex">\(|M|=n\)</span>, <code>STOP</code>: <span class="arithmatex">\(M\)</span> è un assegnamento ottimo.</div><div class="pc" style="--liv:0"><span class="pc-n">4</span><strong>Passo 2 (linee).</strong> Coprire gli zeri con <span class="arithmatex">\(|M|<n\)</span> linee, come nella dimostrazione del teorema di König ed Egerváry.</div><div class="pc" style="--liv:0"><span class="pc-n">5</span><strong>Passo 3 (aggiustamento).</strong> Sia <span class="arithmatex">\(\delta\)</span> il minimo elemento non coperto. Sottrarre <span class="arithmatex">\(\delta\)</span> dagli elementi non
    coperti e aggiungerlo agli elementi coperti due volte: <span class="arithmatex">\(\pi_i:=\pi_i+\delta\)</span> per ogni riga non coperta, <span class="arithmatex">\(\pi_j:=\pi_j+\delta\)</span>
    per ogni colonna coperta. Andare al Passo 1.</div></div>

- <strong>Regola degli esempi.</strong> Al Passo 1 l'insieme $M$ si costruisce riga per riga, in ordine crescente: ogni riga cerca un cammino alternante verso una colonna non accoppiata, in profondità, provando le colonne in ordine crescente.

- L'algoritmo è dovuto a H. W. Kuhn (1955), che lo chiamò così in onore dei matematici ungheresi D. König e J. Egerváry.

<a id="box-29-ta-th-hungarian"></a>

!!! teorema "Teorema 7.20: correttezza dell'algoritmo ungherese"

    A ogni iterazione $\bar{c}_{ij}=c_{ij}-\pi_i+\pi_j \ge 0$ per ogni cella, e il Passo 3 aumenta il valore duale $\sum_{i \in P}\pi_i-\sum_{j \in D}\pi_j$ di $\delta\,(n-k)>0$, dove $k<n$ è il numero di linee. Con costi interi l'algoritmo si ferma dopo un numero finito di iterazioni con un assegnamento ottimo, e $\vet{\pi}$ è ottima per il duale del rilassamento LP.

??? dimostrazione "Dimostrazione"

    1. <em>Passo 0.</em> Sottrarre il minimo di una riga lascia elementi non negativi e uno zero nella riga; i minimi di colonna sono allora $\ge 0$, e sottrarli mantiene gli elementi non negativi. Per costruzione $\bar{c}_{ij}=c_{ij}- \pi_i+\pi_j$.

    2. <em>Passo 3.</em> Tutti gli zeri sono coperti, quindi $\delta>0$, e gli elementi non coperti restano $\ge 0$. L'aggiornamento dei potenziali dà $-\delta$ su riga e colonna non coperte, $-\delta+\delta=0$ su riga non coperta e colonna coperta, $+\delta$ su riga e colonna coperte, $0$ su riga coperta e colonna non coperta: esattamente l'aggiustamento.

    3. <em>Valore duale.</em> Con $k_r$ righe coperte e $k_c$ colonne coperte, il valore cresce di $\delta\,(n-k_r)-\delta\,k_c=\delta\,(n-k)$, e $k=|M|<n$ per il <span style="color:#1971c2">[Teorema 7.19](#box-28-ta-th-konig)</span>.

    4. <em>Terminazione.</em> Per il <span style="color:#1971c2">[Lemma 7.16](#box-25-ta-lem-reduce)</span> il valore duale non supera mai il costo di un assegnamento. Con costi interi ogni $\delta$ è un intero $\ge 1$, quindi il numero di aggiustamenti è finito. All'arresto $M$ è un assegnamento di zeri, ottimo con $\vet{\pi}$ per il <span style="color:#1971c2">[Corollario 7.17](#box-26-ta-cor-zero)</span>. <span class="qed">□</span>

### 7.5.5 L'algoritmo ungherese sull'esempio

<a id="box-30-ta-ex-hungarian"></a>

!!! esempio "Esempio 7.10: l'algoritmo ungherese"

    Eseguiamo l'algoritmo sull'<span style="color:#1971c2">[Esempio 7.9](#box-24-ta-ex-ap)</span>.

    <strong>Passo 0.</strong> I minimi di riga sono $2,1,2,1$, quindi $\pi_1=2$, $\pi_2=1$, $\pi_3=2$, $\pi_4=1$, e le righe diventano

    $$
    \begin{array}{c|cccc}
    \hline {c_{ij}-\pi_i} & {5} & {6} & {7} & {8} \\
    \hline {1} & {0} & {2} & {1} & {3} \\
    {2} & {3} & {7} & {0} & {0} \\
    {3} & {0} & {4} & {7} & {4} \\
    {4} & {0} & {8} & {7} & {5} \\
    \hline
    \end{array}
    $$

    I minimi di colonna sono $0,2,0,0$: cambia solo la colonna $6$, e $\pi_6=-2$. Il valore duale $2+1+2+1+2=8$ è un lower bound sul costo di ogni assegnamento.

    In ciascuna delle matrici che seguono gli zeri indipendenti sono riquadrati, le linee sono blu e la cella di $\delta$ è rossa; i potenziali sono sui margini.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th colspan="6"><strong>Iterazione 1</strong></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\bar{c}_{ij}\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(8\)</span></td>
    <td><span class="arithmatex">\(\pi_i\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(0\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(1\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(3\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(5\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
    <td class="cella-rossa"><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\pi_j\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(-2\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td></td>
    </tr>
    </table></div>

    - Un insieme massimo di zeri indipendenti (riquadrati) ha $3$ elementi: $(1,6)$, $(2,7)$, $(3,5)$.

    - Le $3<4$ linee (blu) sono le righe $1$ e $2$ e la colonna $5$.

    - Il minimo elemento non coperto è $\delta=2$, nella cella $(3,6)$ (rossa). Lo sottraiamo dagli elementi non coperti e lo aggiungiamo agli elementi coperti due volte: $\pi_i$ cresce di $2$ per le righe non coperte $3$ e $4$, e $\pi_j$ cresce di $2$ per la colonna coperta $5$. Il valore duale cresce di $2\cdot(4-3)=2$.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th colspan="6"><strong>Iterazione 2</strong></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\bar{c}_{ij}\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(8\)</span></td>
    <td><span class="arithmatex">\(\pi_i\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(2\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
    <td class="cella-rossa"><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(5\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(5\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(0\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\pi_j\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(-2\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td></td>
    </tr>
    </table></div>

    - Un insieme massimo di zeri indipendenti (riquadrati) ha $3$ elementi: $(1,6)$, $(2,7)$, $(3,5)$.

    - Le $3<4$ linee (blu) sono la riga $2$ e le colonne $5$ e $6$.

    - Il minimo elemento non coperto è $\delta=1$, nella cella $(1,7)$ (rossa). Lo sottraiamo dagli elementi non coperti e lo aggiungiamo agli elementi coperti due volte: $\pi_i$ cresce di $1$ per le righe non coperte $1$, $3$ e $4$, e $\pi_j$ cresce di $1$ per le colonne coperte $5$ e $6$. Il valore duale cresce di $1\cdot(4-3)=1$.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th colspan="6"><strong>Iterazione 3</strong></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\bar{c}_{ij}\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(8\)</span></td>
    <td><span class="arithmatex">\(\pi_i\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(2\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(0\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(6\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(6\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(0\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(0\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(4\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(4\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(4\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\pi_j\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(-1\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td></td>
    </tr>
    </table></div>

    - Un insieme massimo di zeri indipendenti (riquadrati) ha $4$ elementi: $(1,7)$, $(2,8)$, $(3,6)$, $(4,5)$.

    - Formano un assegnamento di costo ridotto nullo: l'algoritmo si ferma, e l'assegnamento è ottimo.

- L'assegnamento ottimo è $1 \to 7$, $2 \to 8$, $3 \to 6$, $4 \to 5$, con costo $3+1+6+1=11$, l'unico ottimo dell'<span style="color:#1971c2">[Esempio 7.9](#box-24-ta-ex-ap)</span>.

- I potenziali finali $\pi_1=3$, $\pi_2=1$, $\pi_3=5$, $\pi_4=4$ e $\pi_5=3$, $\pi_6=-1$, $\pi_7=0$, $\pi_8=0$ sono una soluzione duale ottima, di valore $(3+1+5+4)-(3-1+0+0)=11$. Il valore duale è cresciuto da $8$ a $10$ e poi a $11$.

- Le linee sono quelle della dimostrazione del <span style="color:#1971c2">[Teorema 7.19](#box-28-ta-th-konig)</span>. Nell'iterazione $1$ la riga $4$ non è accoppiata; da essa un cammino alternante raggiunge la colonna $5$ attraverso il suo zero, e poi la riga $3$, accoppiata alla colonna $5$. Quindi $R=\{3,4\}$, $K=\{5\}$, e le linee sono le righe $1$, $2$ e la colonna $5$.

!!! chiave ""

    Il problema di assegnamento è un problema di trasporto con offerte e domande unitarie, sul quale il metodo dei potenziali fa molti pivot degeneri. L'algoritmo ungherese mantiene $\bar{c}_{ij}=c_{ij}-\pi_i+\pi_j \ge 0$, copre gli zeri con il numero minimo di linee (König–Egerváry) e aumenta il valore duale finché $n$ zeri indipendenti danno un assegnamento ottimo.

## 7.6 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Risolvere un'istanza non bilanciata così com'è.</strong> Con più offerta che domanda i vincoli di uguaglianza non hanno soluzione: aggiungere una destinazione fittizia a costi nulli, oppure un'origine fittizia quando la domanda supera l'offerta.

    - <strong>Togliere uno zero di base.</strong> Una base degenere ha comunque $m+n-1$ celle; senza la cella di valore $0$ l'albero è sconnesso e i potenziali non si possono calcolare.

    - <strong>Prendere come base un insieme con un ciclo.</strong> $m+n-1$ celle sono una base solo se non contengono un cammino chiuso che alterna righe e colonne.

    - <strong>Mescolare le convenzioni di segno.</strong> Qui $\bar{c}_{ij}=c_{ij}-\pi_i+\pi_j$ con $\pi_i-\pi_j=c_{ij}$ sulle celle di base; con $u_i+v_j=c_{ij}$ i potenziali delle destinazioni cambiano segno.

    - <strong>Calcolare $\theta$ su tutte le celle del ciclo.</strong> $\theta$ è il minimo sulle sole celle con segno $-$; la cella entrante riceve $\theta$.

    - <strong>Coprire gli zeri con troppe linee.</strong> Le linee dell'algoritmo ungherese devono essere una copertura minima, tante quanti gli zeri indipendenti; con più linee $\delta$ può essere sbagliato o si può mancare l'arresto.

    - <strong>Dimenticare gli elementi coperti due volte.</strong> Al Passo 3 dell'algoritmo ungherese $\delta$ si sottrae dagli elementi non coperti e si aggiunge a quelli coperti da una riga e da una colonna.

    - <strong>Eseguire gli algoritmi sui profitti.</strong> Gli algoritmi minimizzano: con profitti $p_{ij}$ da massimizzare, usare i costi $c_{ij}=-p_{ij}$, oppure $c_{ij}=p_{\max}-p_{ij}$ con $p_{\max}$ il profitto più grande, per tenerli non negativi.

## 7.7 In sintesi

!!! chiave "In sintesi"

    - Il modello $\mathrm{TP}$ spedisce le offerte $a_i$ di $m$ origini alle domande $d_j$ di $n$ destinazioni; è un modello $\mathrm{MCF}$ sulla rete bipartita completa, ammissibile esattamente quando è bilanciato.

    - Un'istanza di trasbordo senza capacità diventa un'istanza di trasporto con le distanze come costi.

    - Una base è un albero ricoprente della rete bipartita, con $m+n-1$ celle; la sua soluzione di base si trova foglia per foglia ed è intera per dati interi.

    - Le regole dell'angolo nord-ovest e del costo minimo costruiscono una soluzione ammissibile di base, una linea per passo.

    - Il metodo dei potenziali: potenziali con $\bar{c}_{ij}=0$ sulla base e $\pi_{m+n}=0$; ottimo quando $\bar{c} \ge 0$; altrimenti $\theta$ unità si spostano lungo il ciclo della cella entrante, e il costo scende di $\theta\,|\bar{c}_e|$.

    - Il modello $\mathrm{AP}$ è un modello $\mathrm{TP}$ con dati unitari; l'algoritmo ungherese riduce righe e colonne, copre gli zeri con un numero minimo di linee (König–Egerváry) e aggiusta di $\delta$, aumentando il valore duale.

    <strong>Le istanze in breve.</strong>

    <div class="tabella" markdown="0"><table>
    <tr>
    <td>magazzini e negozi</td>
    <td>nord-ovest <span class="arithmatex">\(440\)</span>, costo minimo <span class="arithmatex">\(170\)</span>, ottimo <span class="arithmatex">\(165\)</span></td>
    </tr>
    <tr>
    <td>metodo dei potenziali</td>
    <td><span class="arithmatex">\(4\)</span> pivot dal nord-ovest, <span class="arithmatex">\(1\)</span> dal costo minimo</td>
    </tr>
    <tr>
    <td>potenziali ottimi</td>
    <td><span class="arithmatex">\(\tilde{\vet{\pi}}=(3,2,5,2,4,1,0)\)</span>, con <span class="arithmatex">\(\pi_7=0\)</span></td>
    </tr>
    <tr>
    <td>con <span class="arithmatex">\(a_1=40\)</span></td>
    <td>destinazione fittizia <span class="arithmatex">\(8\)</span>, ottimo <span class="arithmatex">\(155\)</span></td>
    </tr>
    <tr>
    <td>istanza degenere</td>
    <td><span class="arithmatex">\(\theta=0\)</span>, poi <span class="arithmatex">\(\theta=5\)</span>; ottimo <span class="arithmatex">\(235\)</span></td>
    </tr>
    <tr>
    <td>trasbordo, senza capacità</td>
    <td>ottimo <span class="arithmatex">\(49\)</span></td>
    </tr>
    <tr>
    <td>lavoratori e lavori</td>
    <td>lower bound <span class="arithmatex">\(8\)</span>, <span class="arithmatex">\(\delta=2\)</span>, <span class="arithmatex">\(\delta=1\)</span>, ottimo <span class="arithmatex">\(11\)</span></td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Trasporto e assegnamento](../../esercizi/transportation-and-assignment.md)

