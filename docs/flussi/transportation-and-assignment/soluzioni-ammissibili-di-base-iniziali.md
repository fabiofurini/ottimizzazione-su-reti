---
title: "Soluzioni ammissibili di base iniziali"
---

# 7.3 Soluzioni ammissibili di base iniziali { #sez-ta-sec-initial }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 7** · [:material-book-open-variant: Capitolo 7: Trasporto e assegnamento](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-presentation: Slide](../../pdf/slide-transportation-and-assignment.pdf) · [:material-pencil: Esercizi: Trasporto e assegnamento](../../esercizi/transportation-and-assignment.md) · [:material-gesture-tap: App: Trasporto: soluzione iniziale e metodo dei potenziali](../../laboratorio/trasporto-metodo-dei-potenziali.md) · [:material-gesture-tap: App: Assegnamento: l'algoritmo ungherese](../../laboratorio/assegnamento-algoritmo-ungherese.md)

</div>

- Una soluzione ammissibile di base si costruisce riempiendo la tabella una cella alla volta. Una riga o una colonna è <strong>attiva</strong> finché non viene barrata; l'offerta residua $\bar{a}_i$ e la domanda residua $\bar{d}_j$ sono ciò che resta da spedire e da ricevere.

- Le due regole che seguono differiscono solo nella scelta della cella successiva.

!!! algoritmo "Algoritmo: Soluzione ammissibile di base iniziale"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> un'istanza bilanciata con offerte <span class="arithmatex">\(a_i\)</span>, domande <span class="arithmatex">\(d_j\)</span> e costi <span class="arithmatex">\(c_{ij}\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> una base <span class="arithmatex">\(T\)</span> e la sua soluzione ammissibile di base <span class="arithmatex">\(\bar{\vet{x}}\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Passo 0 (inizializzazione).</strong> Tutte le righe e le colonne sono attive; <span class="arithmatex">\(\bar{a}_i:=a_i\)</span>, <span class="arithmatex">\(\bar{d}_j:=d_j\)</span>, <span class="arithmatex">\(T:=\emptyset\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">2</span><strong>Passo 1 (scelta della cella).</strong> Scegliere una cella <span class="arithmatex">\((i,j)\)</span> con riga e colonna attive:</div><div class="pc" style="--liv:0"><span class="pc-n">3</span>  <em>regola dell'angolo nord-ovest</em>: la cella con <span class="arithmatex">\(i\)</span> più piccolo e <span class="arithmatex">\(j\)</span> più piccolo;</div><div class="pc" style="--liv:0"><span class="pc-n">4</span>  <em>regola del costo minimo</em>: la cella con <span class="arithmatex">\(c_{ij}\)</span> più piccolo (a parità, <span class="arithmatex">\(i\)</span> più piccolo, poi <span class="arithmatex">\(j\)</span>).</div><div class="pc" style="--liv:0"><span class="pc-n">5</span><strong>Passo 2 (quantità).</strong> Porre <span class="arithmatex">\(\bar{x}_{ij}:=\min\{\bar{a}_i,\bar{d}_j\}\)</span>, aggiungere <span class="arithmatex">\((i,j)\)</span> a <span class="arithmatex">\(T\)</span>, e sottrarre
    <span class="arithmatex">\(\bar{x}_{ij}\)</span> da <span class="arithmatex">\(\bar{a}_i\)</span> e da <span class="arithmatex">\(\bar{d}_j\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">6</span><strong>Passo 3 (barratura).</strong> Se <span class="arithmatex">\(\bar{a}_i=0\)</span> e un'altra riga è attiva, barrare la riga <span class="arithmatex">\(i\)</span>; altrimenti barrare la
    colonna <span class="arithmatex">\(j\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">7</span>  Se nessuna colonna è attiva, <code>STOP</code>; altrimenti andare al Passo 1.</div></div>

- Quando $\bar{a}_i=\bar{d}_j=0$ nello stesso momento, viene barrata solo la riga: la colonna resta attiva con domanda residua $0$, e una cella successiva di quella colonna riceve la quantità $0$. Questa cella di base con valore $0$ mantiene $T$ un albero ricoprente, e la soluzione è degenere.

<a id="box-12-ta-th-initial"></a>

!!! teorema "Teorema 7.8: la soluzione iniziale è di base"

    Con entrambe le regole, l'algoritmo «Soluzione ammissibile di base iniziale» si ferma dopo $m+n-1$ passi, e $T$ è una base con soluzione ammissibile di base $\bar{\vet{x}}$.

??? dimostrazione "Dimostrazione"

    1. <em>Invariante.</em> Le offerte residue delle righe attive e le domande residue delle colonne attive hanno somme uguali: vale all'inizio, e il Passo 2 sottrae la stessa quantità dalle due parti.

    2. <em>Una linea barrata ha residuo $0$.</em> Una riga barrata ha $\bar{a}_i=0$. Una colonna viene barrata quando $\bar{a}_i>0$, e allora $\bar{x}_{ij}=\bar{d}_j$ e $\bar{d}_j=0$, oppure quando la riga $i$ è l'unica riga attiva con $\bar{a}_i=0$, e allora ogni colonna attiva ha residuo $0$ per l'invariante.

    3. <em>Conteggio.</em> Una riga viene barrata solo se un'altra riga è attiva, quindi una riga $r$ non viene mai barrata, e l'algoritmo si ferma quando le $n$ colonne sono barrate. All'arresto le righe attive hanno residuo $0$ per l'invariante, e una riga che arriva a $0$ senza essere barrata è l'unica riga attiva. Quindi i passi sono $(m-1)+n=m+n-1$, una cella ciascuno, tutte diverse, perché una cella si sceglie in due linee attive e una delle due viene poi barrata.

    4. <em>Ammissibilità.</em> All'arresto ogni riga e ogni colonna ha residuo $0$, quindi $\bar{\vet{x}} \ge \vet{0}$ soddisfa tutti i vincoli.

    5. <em>Albero.</em> Sia $L_t$ la linea barrata al passo $t$: nessuna cella successiva sta in $L_t$. Procedendo all'indietro dall'ultimo passo, le celle dei passi $t,t+1,\dots$ formano un albero: la cella del passo $t$ collega il nuovo nodo $L_t$ alla sua altra linea, ancora attiva, quindi un nodo delle celle successive o la riga $r$. Per $t=1$ l'albero ricopre tutti gli $m+n$ nodi. <span class="qed">□</span>

## 7.3.1 La regola dell'angolo nord-ovest

<a id="box-13-ta-ex-nw"></a>

!!! esempio "Esempio 7.5: la regola dell'angolo nord-ovest"

    Sull'<span style="color:#1971c2">[Esempio 7.1](il-problema-di-trasporto.md#box-3-ta-ex-tp)</span> la regola dell'angolo nord-ovest parte dalla cella $(1,4)$ e si sposta a destra o in basso. I suoi passi sono:

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
    <td><span class="arithmatex">\(10\)</span></td>
    <td>colonna <span class="arithmatex">\(4\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\((1,5)\)</span></td>
    <td><span class="arithmatex">\(20\)</span></td>
    <td>riga <span class="arithmatex">\(1\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\((2,5)\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td>colonna <span class="arithmatex">\(5\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\((2,6)\)</span></td>
    <td><span class="arithmatex">\(15\)</span></td>
    <td>colonna <span class="arithmatex">\(6\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\((2,7)\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td>riga <span class="arithmatex">\(2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\((3,7)\)</span></td>
    <td><span class="arithmatex">\(30\)</span></td>
    <td>riga <span class="arithmatex">\(3\)</span>, colonna <span class="arithmatex">\(7\)</span></td>
    </tr>
    </table></div>

    La soluzione ammissibile di base, con le celle di base in blu, è

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">\(\bar{x}_{ij}\)</span></th>
    <th><span class="arithmatex">\(4\)</span></th>
    <th><span class="arithmatex">\(5\)</span></th>
    <th><span class="arithmatex">\(6\)</span></th>
    <th><span class="arithmatex">\(7\)</span></th>
    <th><span class="arithmatex">\(a_i\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(10\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(20\)</span></td>
    <td></td>
    <td></td>
    <td><span class="arithmatex">\(30\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td></td>
    <td class="cella-blu"><span class="arithmatex">\(5\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(15\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(30\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td></td>
    <td></td>
    <td></td>
    <td class="cella-blu"><span class="arithmatex">\(30\)</span></td>
    <td><span class="arithmatex">\(30\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(d_j\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(25\)</span></td>
    <td><span class="arithmatex">\(15\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td></td>
    </tr>
    </table></div>

    Il suo costo è

    $$
    1 \cdot 10+9 \cdot 20+4 \cdot 5+2 \cdot 15+2 \cdot 10+6 \cdot 30=440 .
    $$

    Le sei celle di base formano l'albero ricoprente qui sotto, con le quantità sugli archi.

    ![Figura 3](../../img/transportation-and-assignment/fig03.svg){ .fig loading=lazy  }

- La regola dell'angolo nord-ovest ignora i costi: su questa istanza spedisce $20$ unità sulla cella $(1,5)$, di costo $9$, e $30$ unità su $(3,7)$, di costo $6$.

## 7.3.2 La regola del costo minimo

<a id="box-14-ta-ex-mc"></a>

!!! esempio "Esempio 7.6: la regola del costo minimo"

    Sull'<span style="color:#1971c2">[Esempio 7.1](il-problema-di-trasporto.md#box-3-ta-ex-tp)</span> la regola del costo minimo sceglie, a ogni passo, la cella più economica fra le righe e le colonne attive:

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
    <td><span class="arithmatex">\(10\)</span></td>
    <td>colonna <span class="arithmatex">\(4\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\((3,5)\)</span></td>
    <td><span class="arithmatex">\(25\)</span></td>
    <td>colonna <span class="arithmatex">\(5\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\((1,6)\)</span></td>
    <td><span class="arithmatex">\(15\)</span></td>
    <td>colonna <span class="arithmatex">\(6\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\((2,7)\)</span></td>
    <td><span class="arithmatex">\(30\)</span></td>
    <td>riga <span class="arithmatex">\(2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\((1,7)\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td>riga <span class="arithmatex">\(1\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\((3,7)\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td>riga <span class="arithmatex">\(3\)</span>, colonna <span class="arithmatex">\(7\)</span></td>
    </tr>
    </table></div>

    - Al passo $1$ le celle $(1,4)$ e $(3,5)$ costano entrambe $1$, e $(1,4)$ viene prima, perché la sua riga è più piccola. Al passo $3$ le celle $(1,6)$, $(2,6)$, $(2,7)$ costano $2$, e $(1,6)$ viene prima.

    - Al passo $4$ è attiva solo la colonna $7$: prende tutta l'offerta della riga $2$, poi $5$ unità dalla riga $1$ e $5$ dalla riga $3$.

    La soluzione ammissibile di base è

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">\(\bar{x}_{ij}\)</span></th>
    <th><span class="arithmatex">\(4\)</span></th>
    <th><span class="arithmatex">\(5\)</span></th>
    <th><span class="arithmatex">\(6\)</span></th>
    <th><span class="arithmatex">\(7\)</span></th>
    <th><span class="arithmatex">\(a_i\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(10\)</span></td>
    <td></td>
    <td class="cella-blu"><span class="arithmatex">\(15\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(30\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td></td>
    <td></td>
    <td></td>
    <td class="cella-blu"><span class="arithmatex">\(30\)</span></td>
    <td><span class="arithmatex">\(30\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td></td>
    <td class="cella-blu"><span class="arithmatex">\(25\)</span></td>
    <td></td>
    <td class="cella-blu"><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(30\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(d_j\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(25\)</span></td>
    <td><span class="arithmatex">\(15\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td></td>
    </tr>
    </table></div>

    con costo

    $$
    1 \cdot 10+2 \cdot 15+3 \cdot 5+2 \cdot 30+1 \cdot 25+6 \cdot 5=170 .
    $$

!!! chiave ""

    Riempiendo una cella per passo e barrando una linea per passo si ottiene una soluzione ammissibile di base con $m+n-1$ celle di base. La regola dell'angolo nord-ovest ignora i costi; la regola del costo minimo di solito parte molto più vicino all'ottimo ($170$ invece di $440$ nell'esempio).

---

**Avanti:** [7.4 Il metodo dei potenziali](il-metodo-dei-potenziali.md)
