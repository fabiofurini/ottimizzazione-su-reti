---
title: "Il problema dell'assegnazione"
---

# 7.5 Il problema dell'assegnazione

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 7** · [:material-book-open-variant: Capitolo 7: Trasporto e assegnamento](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-pencil: Esercizi: Trasporto e assegnamento](../../esercizi/transportation-and-assignment.md)

</div>

<a id="sez-ta-sec-assignment"></a>
<a id="box-22-ta-def-ap"></a>

!!! definizione "Definizione 7.14: problema di assegnazione"

    Sono presenti i lavoratori $n$, le origini $P=\{1,2,\dots,n\}$, e i lavori $n$, le destinazioni $D=\{n+1,n+2,\dots,2n\}$; $c_{ij}$ è il costo di assegnazione del lavoratore $i$ al lavoro $j$. Un <strong>assegnazione</strong> assegna a ogni lavoratore esattamente un lavoro e ogni lavoro a esattamente un lavoratore. Il <strong>problema di assegnazione</strong> richiede un'assegnazione di costo totale minimo.

- Usiamo una variabile binaria $x_{ij}$ per ogni coppia $i \in P$, $j \in D$, uguale a $1$ se il lavoratore $i$ ottiene il lavoro $j$.

!!! chiave ""

    Utilizzando queste variabili, un modello di Programmazione Lineare Intera (ILP) per il problema di assegnazione si legge come segue:

    <a id="eq-ta-AP"></a>

    \begin{align*}
    &&   \min \;\;{\sum_{i \in P} \sum_{j \in D} c_{ij} \, x_{ij}}                                \label{ta:aobj}  \tag{7.3a}\\[1ex]
    && \text{subject to} \quad  \sum_{j \in D} x_{ij} &= 1, & \forall i \in P,                \label{ta:arow}  \tag{7.3b}\\[1ex]
    && \sum_{i \in P} x_{ij} &= 1, & \forall j \in D,                                        \label{ta:acol}  \tag{7.3c}\\[1ex]
    && x_{ij} &\in \{0,1\}, & \forall i \in P,~\forall j \in D.                               \label{ta:adom} \tag{7.3d}
    \end{align*}

    Questo modello è denominato modello $\mathrm{AP}$.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{AP}$:

    - la funzione obiettivo $\eqref{ta:aobj}$ minimizza il costo totale dell'incarico;

    - Vincoli  $\eqref{ta:arow}$ assegna a ogni lavoratore esattamente un lavoro;

    - Vincoli  $\eqref{ta:acol}$ assegna ogni lavoro esattamente a un lavoratore;

    - infine, i vincoli $\eqref{ta:adom}$ definiscono le variabili binarie del modello.

- Una matrice $n \times n$ con voci in $\{0,1\}$ ed esattamente uno $1$ in ogni riga e in ogni colonna è una <strong>matrice di permutazione</strong>. Le soluzioni ammissibili del modello $\mathrm{AP}$ sono le matrici di permutazione: esistono $n!$ incarichi.

<a id="box-23-ta-prop-ap"></a>

!!! teorema "Proposizione 7.15: il rilassamento LP del modello di assegnazione"

    Il relax LP del modello $\mathrm{AP}$, con $x_{ij} \ge 0$ al posto di $\eqref{ta:adom}$, è il modello $\mathrm{TP}$ con $a_i=1$ e $d_j=1$. I suoi vertici sono matrici di permutazione e ha una soluzione ottima che è un assegnamento.

??? dimostrazione "Dimostrazione"

    I vincoli $\eqref{ta:arow}$ e $\eqref{ta:acol}$ sono [(7.1b)](il-problema-dei-trasporti.md#mjx-eqn:ta:supply) e [(7.1c)](il-problema-dei-trasporti.md#mjx-eqn:ta:demand) con alimentazioni unitarie e richieste e l'istanza è bilanciata, con $n$ totale. Per <span style="color:#1971c2">[Proposizione 7.2](il-problema-dei-trasporti.md#box-2-ta-prop-exist)</span> ha un soluzione ottima in un vertice, e ogni vertice è intero per il Teorema «vertici interi» di [Capitolo 4](../network-flow-models/totale-unimodularita-e-integralita.md). Un intero ammissibile la soluzione ha $0 \le x_{ij} \le 1$, poiché $x_{ij}$ è al massimo la somma della sua riga: è una matrice di permutazione. <span class="qed">□</span>

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

    Le assegnazioni $4!=24$, enumerate, hanno un minimo univoco: lavoratore $1$ ottiene lavoro $7$, lavoratore $2$ lavoro $8$, lavoratore $3$ lavoro $6$, lavoratore $4$ lavoro $5$, con costo $3+1+6+1=11$. Gurobi assegna lo stesso compito della soluzione ottima del Rilassamento dell'LP.

### 7.5.1 Degenerazione del metodo potenziale

- Una base del rilassamento LP ha celle $2n-1$, ma un'assegnazione ha solo celle $n$ con $x_{ij}=1$: ogni base la soluzione fattibile ha celle base $n-1$ con valore $0$ ed è degenere.

- Il metodo potenziale risolve il rilassamento LP, ma molti dei suoi perni hanno $\theta=0$. Su <span style="color:#1971c2">[Esempio 7.9](#box-24-ta-ex-ap)</span> la regola dell'angolo nord-ovest dà la base sottostante, con tre zeri fondamentali; da esso il potenziale metodo giunge al ottimale dopo i perni $6$, $4$ degenera.

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

!!! teorema "Lemma 7.16: costi ridotti di un incarico"

    Per i potenziali $\vet{\pi}$, sia $\bar{c}_{ij}=c_{ij}-\pi_i+\pi_j$. Per ogni $\vet{x}$ che soddisfa $\eqref{ta:arow}$ e $\eqref{ta:acol}$,

    $$
    \sum_{i \in P}\sum_{j \in D} c_{ij}\,x_{ij}=\sum_{i \in P}\sum_{j \in D} \bar{c}_{ij}\,x_{ij}+\sum_{i \in P}\pi_i-
    \sum_{j \in D}\pi_j .
    $$

    Quindi sottraendo una costante da una riga o da una colonna della matrice dei costi si modifica il costo di ogni assegnazione di stessa costante e le assegnazioni ottimali non cambiano.

??? dimostrazione "Dimostrazione"

    È l'identità di <span style="color:#1971c2">Sezione [7.4](il-metodo-potenziale.md#sez-ta-sec-potentials)</span> con $a_i=d_j=1$. Sottrarre $r$ dalla riga $i$ equivale a porre $\pi_i=r$ e tutti gli altri potenziali uguali a zero: il costo ridotto della cella $(i,j)$ diminuisce di $r$. Sottrarre $s$ dalla colonna $j$ equivale a porre $\pi_j=-s$ e gli altri potenziali a zero: il costo ridotto della cella $(i,j)$ diminuisce di $s$. <span class="qed">□</span>

<a id="box-26-ta-cor-zero"></a>

!!! teorema "Corollario 7.17: gli incarichi a costo zero sono ottimali"

    Se $\bar{c}_{ij} \ge 0$ per ogni cella, ogni assegnazione che utilizza soltanto celle con costo ridotto nullo è ottimale. Il suo costo coincide con $\sum_{i \in P}\pi_i-\sum_{j \in D}\pi_j$; pertanto $\vet{\pi}$ è una soluzione ottimale del duale del rilassamento lineare, il modello $D(\mathrm{TP})$ con $a_i=d_j=1$.

??? dimostrazione "Dimostrazione"

    Per <span style="color:#1971c2">[Lemma 7.16](#box-25-ta-lem-reduce)</span>, l'incarico costa $\sum_{i \in P}\pi_i-\sum_{j \in D}\pi_j$, e ogni $\vet{x} \ge \vet{0}$ soddisfacente $\eqref{ta:arow}$ e $\eqref{ta:acol}$ costa almeno altrettanto, visto che $\bar{c} \ge 0$. Il i potenziali soddisfano $\pi_i-\pi_j \le c_{ij}$ con lo stesso valore, quindi sono ottimali per dualità debole. <span class="qed">□</span>

### 7.5.3 Zeri indipendenti e righe

<a id="box-27-ta-def-cover"></a>

!!! definizione "Definizione 7.18: zeri e coperture indipendenti"

    Sia $\bar{c}$ una matrice $n \times n$ con voci non negative. Un insieme di zero voci è <strong>indipendente</strong> se no due di essi si trovano nella stessa riga o nella stessa colonna. Un insieme di <strong>linee</strong>, righe e colonne, <strong>copre</strong> il zeri se ogni voce zero si trova in almeno una delle righe.

- $n$ zeri indipendenti formano un'assegnazione di costo zero ridotto, ottimale per <span style="color:#1971c2">[Corollario 7.17](#box-26-ta-cor-zero)</span>.

- Nella rete bipartita i cui archi sono le celle con $\bar{c}_{ij}=0$, un insieme di zeri indipendenti è un corrispondenza, un insieme di archi senza punti finali comuni come in [Capitolo 5 «Flusso massimo»](../maximum-flow/index.md) e una copertura è un insieme di nodi che tocca ogni arco.

<a id="box-28-ta-th-konig"></a>

!!! teorema "Teorema 7.19: König e Egerváry"

    Il numero massimo di zeri indipendenti di una matrice è uguale al numero minimo di righe che coprono tutti i suoi zeri.

??? dimostrazione "Dimostrazione"

    Sia $M$ un insieme massimo di zeri indipendenti. Una riga o una colonna è <strong>corrispondente</strong> se contiene uno zero di $M$.

    1. <em>Righe $\ge$ zeri.</em> Gli zeri di $M$ si trovano in righe e colonne diverse, quindi una riga contiene al massimo uno di e una copertura necessita di almeno linee $|M|$.

    2. <em>Percorsi alternati.</em> Un <strong>percorso alternato</strong> inizia in una riga senza corrispondenza, va da una riga a una colonna attraverso uno zero non in $M$ e da una colonna a una riga attraverso lo zero di $M$ di quella colonna. Lascia che $R$ e $K$ siano i le righe e le colonne raggiunte da percorsi alternati, comprese le righe non corrispondenti.

    3. <em>Ogni colonna di $K$ corrisponde.</em> Altrimenti un percorso alternato termina con una colonna senza corrispondenza. Lungo esso, il gli zeri non presenti in $M$ sono uno in più rispetto agli zeri di $M$: scambiandoli si ottiene un insieme indipendente con zeri $|M|+1$, contro la massimalità di $M$.

    4. <em>Le righe.</em> Sia $L$ le righe non in $R$ e le colonne in $K$. Ha uno zero $(i,j)$ con la riga $i \in R$ colonna $j \in K$: se non è in $M$, un percorso verso $i$ continua fino a $j$; se è in $M$, la riga $i$ viene abbinata, quindi era raggiunto dalla sua colonna $j$. Quindi $L$ copre tutti gli zeri.

    5. <em>Conteggio.</em> Le righe non in $R$ vengono abbinate, poiché le righe senza corrispondenza sono in $R$ e le colonne di $K$ sono abbinato. Uno zero di $M$ in una colonna di $K$ ha la sua riga in $R$, quindi si trova esattamente su una riga di $L$. Linee e zeri di $M$ corrispondono uno a uno e $|L|=|M|$. <span class="qed">□</span>

- La dimostrazione è costruttiva: fornisce le linee di una copertura minima da un insieme massimo di zeri indipendenti, e un insieme che non è massimo viene ampliato lungo un percorso alternato che termina in una colonna non abbinata.

### 7.5.4 L'algoritmo ungherese

!!! algoritmo "Algoritmo: L'algoritmo ungherese"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> una matrice dei costi <span class="arithmatex">\(n \times n\)</span> <span class="arithmatex">\(c_{ij}\)</span>, <span class="arithmatex">\(i \in P\)</span>, <span class="arithmatex">\(j \in D\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> un'assegnazione ottimale e potenziali ottimali <span class="arithmatex">\(\vet{\pi}\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Passaggio 0 (riduzione).</strong> Sottrai da ciascuna riga il suo minimo, <span class="arithmatex">\(\pi_i\)</span>; quindi sottrai da ciascuna colonna del risultato
    il suo minimo, <span class="arithmatex">\(-\pi_j\)</span>. Sia <span class="arithmatex">\(\bar{c}\)</span> la matrice ridotta.</div><div class="pc" style="--liv:0"><span class="pc-n">2</span><strong>Passaggio 1 (zeri indipendenti).</strong> Trova un insieme massimo <span class="arithmatex">\(M\)</span> di zeri indipendenti di <span class="arithmatex">\(\bar{c}\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">3</span>  Se <span class="arithmatex">\(|M|=n\)</span>, <code>STOP</code>: <span class="arithmatex">\(M\)</span> è un'assegnazione ottimale.</div><div class="pc" style="--liv:0"><span class="pc-n">4</span><strong>Passaggio 2 (linee).</strong> Copri gli zeri con le linee <span class="arithmatex">\(|M|<n\)</span>, come nella dimostrazione del teorema di König e Egerváry.</div><div class="pc" style="--liv:0"><span class="pc-n">5</span><strong>Passaggio 3 (regolazione).</strong> Sia <span class="arithmatex">\(\delta\)</span> la voce minima scoperta. Sottrarre <span class="arithmatex">\(\delta\)</span> dallo scoperto
    voci e aggiungerlo alle voci coperte due volte: <span class="arithmatex">\(\pi_i:=\pi_i+\delta\)</span> per ogni riga scoperta, <span class="arithmatex">\(\pi_j:=\pi_j+\delta\)</span>
    per ogni colonna coperta. Vai al passaggio 1.</div></div>

- <strong>Regola degli esempi.</strong> Nel Passo 1 l'insieme $M$ viene costruito riga per riga, in ordine crescente: ogni riga cerca un percorso alternato verso una colonna senza eguali, prima la profondità, provando le colonne in ordine crescente.

- L'algoritmo è dovuto a H. W. Kuhn (1955), che lo chiamò in onore dei matematici ungheresi D. König e J. Egerváry.

<a id="box-29-ta-th-hungarian"></a>

!!! teorema "Teorema 7.20: correttezza dell'algoritmo ungherese"

    Ad ogni iterazione $\bar{c}_{ij}=c_{ij}-\pi_i+\pi_j \ge 0$ per ogni cella e il passaggio 3 aumenta il valore duale $\sum_{i \in P}\pi_i-\sum_{j \in D}\pi_j$ per $\delta\,(n-k)>0$, dove $k<n$ è il numero di righe. Con costi interi l'algoritmo si ferma dopo un numero finito di iterazioni con un'assegnazione ottimale e $\vet{\pi}$ è ottimale per il duale del rilassamento LP.

??? dimostrazione "Dimostrazione"

    1. <em>Passaggio 0.</em> La sottrazione del minimo di una riga lascia voci non negative e uno zero nella riga; la colonna i minimi sono quindi $\ge 0$ e la loro sottrazione mantiene le voci non negative. Per costruzione $\bar{c}_{ij}=c_{ij}- \pi_i+\pi_j$.

    2. <em>Passaggio 3.</em> Tutti gli zeri sono coperti, quindi $\delta>0$ e le voci scoperte rimangono $\ge 0$. L'aggiornamento del i potenziali danno $-\delta$ su riga e colonna scoperte, $-\delta+\delta=0$ su riga scoperta e colonna coperta, $+\delta$ su riga e colonna coperte, $0$ su riga coperta e colonna scoperta: esattamente la regolazione.

    3. <em>Valore duale.</em> Con righe coperte $k_r$ e colonne coperte $k_c$, il valore aumenta di $\delta\,(n-k_r)-\delta\,k_c=\delta\,(n-k)$ e $k=|M|<n$ di <span style="color:#1971c2">[Teorema 7.19](#box-28-ta-th-konig)</span>.

    4. <em>Terminazione.</em> Con <span style="color:#1971c2">[Lemma 7.16](#box-25-ta-lem-reduce)</span> il valore duale non supera mai il costo di un incarico. Con costi interi ogni $\delta$ è un intero $\ge 1$, quindi il numero di aggiustamenti è finito. Alla fermata $M$ è un'assegnazione di zeri, ottimale con $\vet{\pi}$ di <span style="color:#1971c2">[Corollario 7.17](#box-26-ta-cor-zero)</span>. <span class="qed">□</span>

### 7.5.5 L'algoritmo ungherese nell'esempio

<a id="box-30-ta-ex-hungarian"></a>

!!! esempio "Esempio 7.10: l'algoritmo ungherese"

    Eseguiamo l'algoritmo su <span style="color:#1971c2">[Esempio 7.9](#box-24-ta-ex-ap)</span>.

    <strong>Passaggio 0.</strong> I minimi di riga sono $2,1,2,1$, quindi $\pi_1=2$, $\pi_2=1$, $\pi_3=2$, $\pi_4=1$ e le righe diventano

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

    I minimi di colonna sono $0,2,0,0$: cambia solo la colonna $6$ e $\pi_6=-2$. Il valore duale $2+1+2+1+2=8$ è un limite inferiore sul costo di ogni incarico.

    In ciascuna matrice gli zeri indipendenti sono riquadrati, le linee blu e la cella corrispondente a $\delta$ è evidenziata in rosso; i potenziali sono riportati ai margini.

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

    - Un set massimo di zeri indipendenti (riquadro) ha elementi $3$: $(1,6)$, $(2,7)$, $(3,5)$.

    - Le linee $3<4$ (blu) sono le righe $1$ e $2$ e la colonna $5$.

    - La voce minima scoperta è $\delta=2$, nella cella $(3,6)$ (rossa). Lo sottraiamo dalle voci scoperte e lo aggiungiamo alle voci coperte due volte: $\pi_i$ cresce di $2$ per le righe scoperte $3$ e $4$ e $\pi_j$ cresce di $2$ per la colonna coperta $5$. Il valore duale cresce di $2\cdot(4-3)=2$.

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

    - Un set massimo di zeri indipendenti (riquadro) ha elementi $3$: $(1,6)$, $(2,7)$, $(3,5)$.

    - Le linee $3<4$ (blu) sono la riga $2$ e le colonne $5$ e $6$.

    - La voce minima scoperta è $\delta=1$, nella cella $(1,7)$ (rossa). Lo sottraiamo dalle voci scoperte e lo aggiungiamo alle voci coperte due volte: $\pi_i$ cresce di $1$ per le righe scoperte $1$, $3$ e $4$ e $\pi_j$ cresce di $1$ per le colonne coperte $5$ e $6$. Il valore duale cresce di $1\cdot(4-3)=1$.

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

    - Un set massimo di zeri indipendenti (riquadro) ha elementi $4$: $(1,7)$, $(2,8)$, $(3,6)$, $(4,5)$.

    - Formano un'assegnazione a costo ridotto zero: l'algoritmo si ferma e l'assegnazione è ottimale.

- L'assegnazione ottimale è $1 \to 7$, $2 \to 8$, $3 \to 6$, $4 \to 5$, con costo $3+1+6+1=11$, l'ottimo unico di <span style="color:#1971c2">[Esempio 7.9](#box-24-ta-ex-ap)</span>.

- I potenziali finali $\pi_1=3$, $\pi_2=1$, $\pi_3=5$, $\pi_4=4$ e $\pi_5=3$, $\pi_6=-1$, $\pi_7=0$, $\pi_8=0$ sono un'ottima soluzione duale, di valore $(3+1+5+4)-(3-1+0+0)=11$. Il valore duale è cresciuto da $8$ a $10$ e poi a $11$.

- Le righe sono quelle della dimostrazione di <span style="color:#1971c2">[Teorema 7.19](#box-28-ta-th-konig)</span>. Nell'iterazione $1$ la riga $4$ è senza eguali; da esso un percorso alternato raggiunge, attraverso il suo zero, la colonna $5$, e poi la riga $3$, abbinata alla colonna $5$. Quindi $R=\{3,4\}$, $K=\{5\}$ e le righe sono le righe $1$, $2$ e la colonna $5$.

!!! chiave ""

    Il problema di assegnazione è un problema di trasporto con offerte e domande unitarie. Il metodo dei potenziali è alla base dell’algoritmo ungherese, che può richiedere pivot degeneri. L'algoritmo ungherese mantiene $\bar{c}_{ij}=c_{ij}-\pi_i+\pi_j \ge 0$, copre gli zeri con il numero minimo di linee (König–Egerváry) e aumenta il valore duale finché $n$ zeri indipendenti non forniscono un'assegnazione ottimale.

## 7.6 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Risolvere un'istanza sbilanciata così com'è.</strong> Con più offerta che domanda i vincoli di uguaglianza non hanno soluzione: aggiungere una destinazione fittizia a costi zero, oppure un'origine fittizia quando la domanda supera l'offerta.

    - <strong>Tralasciare uno zero di base.</strong> Una base degenere ha ancora celle $m+n-1$; senza la cella del valore $0$ l'albero è disconnesso e i potenziali non possono essere calcolati.

    - <strong>Prendere un insieme con un ciclo come base.</strong> $m+n-1$ le celle sono una base solo se non contengono un percorso chiuso righe e colonne alternate.

    - <strong>Mescolare le convenzioni dei segni.</strong> Qui $\bar{c}_{ij}=c_{ij}-\pi_i+\pi_j$ con $\pi_i-\pi_j=c_{ij}$ sulle celle di base; con $u_i+v_j=c_{ij}$ i potenziali di destinazione cambiano segno.

    - <strong>Calcolo $\theta$ su tutte le celle del ciclo.</strong> $\theta$ è il minimo sulle celle con segno $-$ solo; la cella entrante riceve $\theta$.

    - <strong>Coprire gli zeri con troppe righe.</strong> Le righe dell'algoritmo ungherese devono essere una copertura minima, poiché tanti quanti gli zeri indipendenti; con più linee $\delta$ potrebbe essere sbagliato o la fermata saltata.

    - <strong>Dimenticare le voci coperte due volte.</strong> Nel passaggio 3 dell'algoritmo ungherese $\delta$ viene sottratto da le voci scoperte e sommate a quelle coperte da una riga e da una colonna.

    - <strong>Eseguire gli algoritmi sui profitti.</strong> Minimizzano: con i profitti $p_{ij}$ per massimizzare, utilizzare i costi $c_{ij}=-p_{ij}$ o $c_{ij}=p_{\max}-p_{ij}$ con $p_{\max}$ il profitto maggiore, per mantenerli non negativi.

## 7.7 In sintesi

!!! chiave "In sintesi"

    - Il modello $\mathrm{TP}$ spedisce le forniture $a_i$ delle origini $m$ alle richieste $d_j$ delle destinazioni $n$; è un Modello $\mathrm{MCF}$ su rete bipartita completa, ammissibile esattamente quando è bilanciata.

    - Un'istanza di traslato senza capacità diventa un'istanza di trasporto con le distanze come costi.

    - Una base è uno albero ricoprente della rete bipartita, con celle $m+n-1$; la sua soluzione di base si trova foglia per foglia ed è intero per dati interi.

    - L'angolo nord-ovest e le regole del costo minimo costruiscono una soluzione fattibile di base, una riga per passaggio.

    - Il metodo dei potenziali: potenziali con $\bar{c}_{ij}=0$ sulla base e $\pi_{m+n}=0$; ottimale quando $\bar{c} \ge 0$; altrimenti le unità $\theta$ si muovono attorno al ciclo della cella entrante e il costo diminuisce di $\theta\,|\bar{c}_e|$.

    - Il modello $\mathrm{AP}$ è un modello $\mathrm{TP}$ con dati dell'unità; l'algoritmo ungherese riduce righe e colonne, copre il zeri con un numero minimo di righe (König–Egerváry) e si regola con $\delta$, aumentando il valore duale.

    <strong>Le istanze in breve.</strong>

    <div class="tabella" markdown="0"><table>
    <tr>
    <td>magazzini e negozi</td>
    <td>nord-ovest <span class="arithmatex">\(440\)</span>, costo minimo <span class="arithmatex">\(170\)</span>, ottimale <span class="arithmatex">\(165\)</span></td>
    </tr>
    <tr>
    <td>metodo potenziale</td>
    <td><span class="arithmatex">\(4\)</span> pivot da nord-ovest, <span class="arithmatex">\(1\)</span> dal costo minimo</td>
    </tr>
    <tr>
    <td>potenziali ottimali</td>
    <td><span class="arithmatex">\(\tilde{\vet{\pi}}=(3,2,5,2,4,1,0)\)</span>, con <span class="arithmatex">\(\pi_7=0\)</span></td>
    </tr>
    <tr>
    <td>con <span class="arithmatex">\(a_1=40\)</span> e destinazione fittizia <span class="arithmatex">\(8\)</span>, ottimale <span class="arithmatex">\(155\)</span></td>
    </tr>
    <tr>
    <td>istanza degenerata</td>
    <td><span class="arithmatex">\(\theta=0\)</span>, quindi <span class="arithmatex">\(\theta=5\)</span>; ottimale <span class="arithmatex">\(235\)</span></td>
    </tr>
    <tr>
    <td>traslato, nessuna capacità e <span class="arithmatex">\(49\)</span> ottimale</td>
    </tr>
    <tr>
    <td>lavoratori e lavori e vincoli <span class="arithmatex">\(8\)</span>, <span class="arithmatex">\(\delta=2\)</span>, <span class="arithmatex">\(\delta=1\)</span>, ottimale <span class="arithmatex">\(11\)</span></td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Trasporto e assegnamento](../../esercizi/transportation-and-assignment.md)
