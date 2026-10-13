---
title: "Soluzioni iniziali di base fattibili"
---

# 7.3 Soluzioni iniziali di base fattibili { #sez-ta-sec-initial }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 7** · [:material-book-open-variant: Capitolo 7: Trasporto e assegnamento](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-pencil: Esercizi: Trasporto e assegnamento](../../esercizi/transportation-and-assignment.md)

</div>

- Una soluzione fattibile di base viene creata riempiendo il tableau una cella alla volta. Una riga o una colonna lo è <strong>attivo</strong> finché non viene cancellato; l'offerta residua $\bar{a}_i$ e la domanda residua $\bar{d}_j$ sono ciò che è rimasti da spedire e da ricevere.

- Le due regole seguenti differiscono solo per la scelta della cella successiva.

!!! algoritmo "Algoritmo: Soluzione fattibile di base iniziale"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> un'istanza bilanciata con forniture <span class="arithmatex">\(a_i\)</span>, richieste <span class="arithmatex">\(d_j\)</span> e costi <span class="arithmatex">\(c_{ij}\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> una base <span class="arithmatex">\(T\)</span> e la sua soluzione di base realizzabile <span class="arithmatex">\(\bar{\vet{x}}\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Passaggio 0 (inizializzazione).</strong> Tutte le righe e le colonne sono attive; <span class="arithmatex">\(\bar{a}_i:=a_i\)</span>, <span class="arithmatex">\(\bar{d}_j:=d_j\)</span>, <span class="arithmatex">\(T:=\emptyset\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">2</span><strong>Passaggio 1 (scelta della cella).</strong> Scegli una cella <span class="arithmatex">\((i,j)\)</span> con riga e colonna attive:</div><div class="pc" style="--liv:0"><span class="pc-n">3</span>  <em>regola dell'angolo nord-ovest</em>: la cella con il più piccolo <span class="arithmatex">\(i\)</span> e il più piccolo <span class="arithmatex">\(j\)</span>;</div><div class="pc" style="--liv:0"><span class="pc-n">4</span>  <em>regola del costo minimo</em>: la cella con il più piccolo <span class="arithmatex">\(c_{ij}\)</span> (il più piccolo <span class="arithmatex">\(i\)</span>, poi <span class="arithmatex">\(j\)</span>, in parità).</div><div class="pc" style="--liv:0"><span class="pc-n">5</span><strong>Passaggio 2 (importo).</strong> Imposta <span class="arithmatex">\(\bar{x}_{ij}:=\min\{\bar{a}_i,\bar{d}_j\}\)</span>, aggiungi <span class="arithmatex">\((i,j)\)</span> a <span class="arithmatex">\(T\)</span> e sottrai
    <span class="arithmatex">\(\bar{x}_{ij}\)</span> da <span class="arithmatex">\(\bar{a}_i\)</span> e da <span class="arithmatex">\(\bar{d}_j\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">6</span><strong>Passaggio 3 (cancellazione).</strong> Se <span class="arithmatex">\(\bar{a}_i=0\)</span> e un'altra riga sono attivi, cancella la riga <span class="arithmatex">\(i\)</span>; altrimenti cancellalo
    colonna <span class="arithmatex">\(j\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">7</span>  Se nessuna colonna è attiva, <code>STOP</code>; altrimenti vai al passo 1.</div></div>

- Quando $\bar{a}_i=\bar{d}_j=0$ contemporaneamente viene barrata solo la riga: la colonna rimane attiva con residuo richiedono $0$ e una cella successiva di quella colonna ottiene l'importo $0$. Questa cella base con valore $0$ mantiene $T$ un intervallo albero e la soluzione è degenere.

<a id="box-12-ta-th-initial"></a>

!!! teorema "Teorema 7.8: la soluzione iniziale è semplice"

    Con entrambe le regole, l'algoritmo «Soluzione di base ammissibile iniziale» si ferma dopo i passaggi $m+n-1$ e $T$ è una base con soluzione di base realizzabile $\bar{\vet{x}}$.

??? dimostrazione "Dimostrazione"

    1. <em>Invariante.</em> Le forniture residue delle righe attive e le richieste residue delle colonne attive hanno somme uguali: vero all'inizio e il passaggio 2 sottrae lo stesso importo da entrambi i lati.

    2. <em>Una linea incrociata ha un residuo $0$.</em> Una riga incrociata ha $\bar{a}_i=0$. Una colonna viene attraversata quando $\bar{a}_i>0$, e poi $\bar{x}_{ij}=\bar{d}_j$ e $\bar{d}_j=0$, o quando la riga $i$ è l'unica riga attiva con $\bar{a}_i=0$, e poi ogni colonna attiva ha $0$ residuo rispetto all'invariante.

    3. <em>Conteggio.</em> Una riga viene barrata solo se un'altra riga è attiva, quindi una riga $r$ non viene mai barrata e la l'algoritmo si interrompe quando le colonne $n$ vengono cancellate. All'arresto le righe attive hanno $0$ residuo dall'invariante, e una riga che raggiunge $0$ senza essere barrata è l'unica riga attiva. Quindi i passaggi sono $(m-1)+n=m+n-1$, una cella ciascuna, tutte diverse, poiché una cella viene scelta in due righe attive e una di queste viene poi barrata.

    4. <em>Fattibilità.</em> Alla fine ogni riga e ogni colonna ha un residuo $0$, quindi $\bar{\vet{x}} \ge \vet{0}$ soddisfa tutti i vincoli.

    5. <em>Albero.</em> Sia $L_t$ la linea attraversata nel passaggio $t$: nessuna cella successiva si trova in $L_t$. All'indietro rispetto all'ultimo passo, le celle dei passi $t,t+1,\dots$ formano un albero: la cella del passo $t$ unisce il nuovo nodo $L_t$ alla sua altra linea, che è ancora attivo, quindi un nodo delle celle successive ovvero la riga $r$. In $t=1$ l'albero si estende su tutti i nodi $m+n$. <span class="qed">□</span>

## 7.3.1 La regola dell'angolo nord-ovest

<a id="box-13-ta-ex-nw"></a>

!!! esempio "Esempio 7.5: la regola dell'angolo nord-ovest"

    Su <span style="color:#1971c2">[Esempio 7.1](il-problema-dei-trasporti.md#box-3-ta-ex-tp)</span> la regola dell'angolo nord-ovest inizia dalla cella $(1,4)$ e si sposta verso destra o verso il basso. Suo i passaggi sono:

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

    La soluzione di base ammissibile, con le celle base in blu, è

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

    Le sei celle base formano l'albero di copertura sottostante, con gli importi sugli archi.

    ![Figura 3](../../img/transportation-and-assignment/fig03.svg){ .fig loading=lazy  }

- La regola dell'angolo nord-ovest ignora i costi: in questo caso spedisce unità $20$ sulla cella $(1,5)$, di costo Unità $9$ e $30$ su $(3,7)$, al costo di $6$.

## 7.3.2 La regola del costo minimo

<a id="box-14-ta-ex-mc"></a>

!!! esempio "Esempio 7.6: la regola del costo minimo"

    Su <span style="color:#1971c2">[Esempio 7.1](il-problema-dei-trasporti.md#box-3-ta-ex-tp)</span> la regola del costo minimo sceglie, ad ogni passo, la cella più economica tra le righe attive e colonne:

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

    - Nel passaggio $1$ le celle $(1,4)$ e $(3,5)$ costano entrambe $1$ e $(1,4)$ inizia per prima, poiché la sua riga è più piccola. Al passo $3$ le celle $(1,6)$, $(2,6)$, $(2,7)$ costano $2$ e $(1,6)$ vanno per prime.

    - Al passo $4$ è attiva solo la colonna $7$: prende tutta la fornitura della riga $2$, quindi le unità $5$ dalla riga $1$ e $5$ dalla riga $3$.

    La soluzione fattibile di base è

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

    Riempiendo una cella per passaggio e cancellando una riga per passaggio si ottiene una soluzione di base fattibile con le celle di base $m+n-1$. La regola dell'angolo nord-ovest ignora i costi; la regola del costo minimo di solito inizia molto più vicino al valore ottimale ($170$ invece di $440$ nell'esempio).

---

**Avanti:** [7.4 Il metodo potenziale](il-metodo-potenziale.md)
