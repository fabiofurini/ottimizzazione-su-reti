---
title: "Esercizi · Trasporto e assegnamento"
---

# Esercizi · Trasporto e assegnamento

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 7** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 7: Trasporto e assegnamento](../flussi/transportation-and-assignment/index.md) · [:material-file-pdf-box: Eserciziario, volume 3 (PDF)](../pdf/esercizi-3-flussi.pdf)

</div>

!!! formula "Regole usate in questi esercizi"

    Le definizioni e i risultati del capitolo [«Trasporto e assegnamento»](../flussi/transportation-and-assignment/index.md). Le origini sono $1,2,\dots,m$ con offerte $a_i$, le destinazioni $m+1,m+2,\dots,m+n$ con domande $d_j$, e le celle $(i,j)$ si considerano in ordine riga–colonna.

    - **(F1)** <strong>Modello.</strong> $\min \sum_{i}\sum_{j} c_{ij}x_{ij}$ con somme di riga $a_i$, somme di colonna $d_j$ e $\vet{x} \ge \vet{0}$; ammissibile se e solo se $\sum_i a_i=\sum_j d_j$. Un eccesso di offerta va a una destinazione fittizia con costi $0$.

    - **(F2)** <strong>Basi.</strong> Una base è un insieme di $m+n-1$ celle che formano un albero ricoprente della rete bipartita (nessun cammino chiuso che alterna righe e colonne). La sua soluzione di base si trova foglia per foglia; è degenere se una cella di base ha valore $0$.

    - **(F3)** <strong>Soluzioni iniziali.</strong> Angolo nord-ovest: la cella attiva con riga e colonna più piccole. Costo minimo: la cella attiva più economica, a parità $i$ più piccolo e poi $j$. La quantità è $\min\{\bar{a}_i,\bar{d}_j\}$; se $\bar{a}_i=0$ e un'altra riga è attiva, si barra la riga, altrimenti la colonna.

    - **(F4)** <strong>Metodo dei potenziali.</strong> $\pi_i-\pi_j=c_{ij}$ sulle celle di base, $\pi_{m+n}=0$; $\bar{c}_{ij}=c_{ij}-\pi_i+\pi_j$. Ottima se $\bar{c} \ge 0$, unica se $\bar{c}_{ij}>0$ fuori dalla base. Altrimenti entra il $\bar{c}_e$ più negativo (a parità: $i$ più piccolo, poi $j$); il ciclo parte da $e$ lungo la sua riga con segni $+,-,+,\dots$; $\theta$ è il minimo sulle celle $-$, ed esce la prima di esse con $\bar{x}=\theta$ in ordine riga–colonna; il costo cambia di $\theta\,\bar{c}_e$.

    - **(F5)** <strong>Algoritmo ungherese.</strong> Sottrarre i minimi di riga ($\pi_i$) e poi i minimi di colonna ($-\pi_j$). Trovare un insieme massimo di zeri indipendenti (riga per riga, cammini alternanti, colonne in ordine crescente); se ha $n$ zeri, fermarsi. Altrimenti le linee sono le righe non raggiunte e le colonne raggiunte da cammini alternanti a partire dalle righe non accoppiate; $\delta$ è il minimo elemento non coperto, sottratto agli elementi non coperti e aggiunto a quelli coperti due volte ($\pi_i \mathrel{+}=\delta$ sulle righe non coperte, $\pi_j \mathrel{+}=\delta$ sulle colonne coperte). Il valore duale $\sum_i\pi_i-\sum_j\pi_j$ cresce di $\delta\,(n-k)$ con $k$ linee.

<a id="esercizio-7-1"></a>

!!! esercizio "Esercizio 7.1: Soluzioni ammissibili di base iniziali"

    !!! esercizio "Esercizio"

        Tre stabilimenti $1,2,3$ hanno un'offerta di $a_1=30$, $a_2=40$, $a_3=20$ unità di un prodotto, e tre clienti $4,5,6$ hanno una domanda di $d_4=15$, $d_5=25$, $d_6=40$ unità. Ogni domanda va soddisfatta, e ogni stabilimento spedisce al più la sua offerta. I costi unitari di spedizione sono:

        $$
        \begin{array}{c|ccc|c}
        \hline {c_{ij}} & {4} & {5} & {6} & {a_i} \\
        \hline {1} & {7} & {4} & {7} & {30} \\
        {2} & {1} & {6} & {8} & {40} \\
        {3} & {9} & {9} & {6} & {20} \\
        \hline {d_j} & {15} & {25} & {40} &  \\
        \hline
        \end{array}
        $$

    **Domande**

    1. L'istanza è bilanciata? Aggiungere una destinazione fittizia come in (F1) e scrivere la tabella di trasporto.

    2. Costruire una soluzione ammissibile di base iniziale con la regola dell'angolo nord-ovest: elencare i passi, scrivere la soluzione nella tabella e calcolarne il costo.

    3. Costruire una soluzione ammissibile di base iniziale con la regola del costo minimo, e confrontare i due costi.

    4. Verificare che entrambe le soluzioni abbiano $m+n-1$ celle di base che formano un albero ricoprente. Quanta offerta lascia inutilizzata ogni stabilimento nelle due soluzioni?

??? soluzione "Soluzione"

    Usiamo le regole (F1)–(F5) del riquadro all'inizio di questi esercizi.

    1. L'offerta totale è $30+40+20=90$ e la domanda totale è $15+25+40=80$: l'istanza non è bilanciata, con un eccesso di $10$ unità. Aggiungiamo la destinazione fittizia $7$ con domanda $d_{7}=10$ e costi $c_{17}=c_{27}=c_{37}=0$:

        $$
        \begin{array}{c|cccc|c}
        \hline {c_{ij}} & {4} & {5} & {6} & {7} & {a_i} \\
        \hline {1} & {7} & {4} & {7} & {0} & {30} \\
        {2} & {1} & {6} & {8} & {0} & {40} \\
        {3} & {9} & {9} & {6} & {0} & {20} \\
        \hline {d_j} & {15} & {25} & {40} & {10} & {90} \\
        \hline
        \end{array}
        $$

    2. I passi della regola dell'angolo nord-ovest sono

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
        <td><span class="arithmatex">\(15\)</span></td>
        <td>colonna <span class="arithmatex">\(4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((1,5)\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td>riga <span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((2,5)\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td>colonna <span class="arithmatex">\(5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((2,6)\)</span></td>
        <td><span class="arithmatex">\(30\)</span></td>
        <td>riga <span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((3,6)\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td>colonna <span class="arithmatex">\(6\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\((3,7)\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td>riga <span class="arithmatex">\(3\)</span>, colonna <span class="arithmatex">\(7\)</span></td>
        </tr>
        </table></div>

        e la soluzione è

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
        <td class="cella-blu"><span class="arithmatex">\(15\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(15\)</span></td>
        <td></td>
        <td></td>
        <td><span class="arithmatex">\(30\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td></td>
        <td class="cella-blu"><span class="arithmatex">\(10\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(30\)</span></td>
        <td></td>
        <td><span class="arithmatex">\(40\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td></td>
        <td></td>
        <td class="cella-blu"><span class="arithmatex">\(10\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(d_j\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(25\)</span></td>
        <td><span class="arithmatex">\(40\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Il suo costo è $7 \cdot 15+4 \cdot 15+6 \cdot 10+8 \cdot 30+6 \cdot 10+0 \cdot 10=525$.

    3. I passi della regola del costo minimo sono

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>passo</th>
        <th>cella</th>
        <th>quantità</th>
        <th>barrata</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((1,7)\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td>colonna <span class="arithmatex">\(7\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((2,4)\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td>colonna <span class="arithmatex">\(4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((1,5)\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td>riga <span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((2,5)\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>colonna <span class="arithmatex">\(5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((3,6)\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td>riga <span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\((2,6)\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td>riga <span class="arithmatex">\(2\)</span>, colonna <span class="arithmatex">\(6\)</span></td>
        </tr>
        </table></div>

        Al passo $1$ le tre celle fittizie costano $0$, e la regola prende $(1,7)$, la riga più piccola. La soluzione è

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
        <td></td>
        <td class="cella-blu"><span class="arithmatex">\(20\)</span></td>
        <td></td>
        <td class="cella-blu"><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(30\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(15\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(5\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(20\)</span></td>
        <td></td>
        <td><span class="arithmatex">\(40\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td></td>
        <td></td>
        <td class="cella-blu"><span class="arithmatex">\(20\)</span></td>
        <td></td>
        <td><span class="arithmatex">\(20\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(d_j\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(25\)</span></td>
        <td><span class="arithmatex">\(40\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Il suo costo è $4 \cdot 20+0 \cdot 10+1 \cdot 15+6 \cdot 5+8 \cdot 20+6 \cdot 20=405$, minore del costo $525$ della regola dell'angolo nord-ovest.

    4. Ogni regola fa $m+n-1=3+4-1=6$ passi, una cella per passo; le celle formano un albero ricoprente perché la linea barrata a ogni passo non contiene celle successive. Il flusso sulla colonna fittizia è l'offerta non usata: con la regola dell'angolo nord-ovest lo stabilimento $1$ tiene $0$ unità, lo stabilimento $2$ ne tiene $0$ e lo stabilimento $3$ ne tiene $10$; con la regola del costo minimo lo stabilimento $1$ tiene $10$ unità, lo stabilimento $2$ ne tiene $0$ e lo stabilimento $3$ ne tiene $0$.

    !!! chiave ""

        Con la destinazione fittizia $7$ ($d_{7}=10$, costi nulli) la regola dell'angolo nord-ovest costa $525$ e la regola del costo minimo $405$.

<a id="esercizio-7-2"></a>

!!! esercizio "Esercizio 7.2: Il metodo dei potenziali"

    !!! esercizio "Esercizio"

        Consideriamo l'istanza di trasporto con origini $1,2,3$, destinazioni $4,5,6,7$, e i costi, le offerte e le domande della tabella:

        $$
        \begin{array}{c|cccc|c}
        \hline {c_{ij}} & {4} & {5} & {6} & {7} & {a_i} \\
        \hline {1} & {4} & {6} & {8} & {8} & {30} \\
        {2} & {2} & {2} & {7} & {7} & {15} \\
        {3} & {8} & {7} & {3} & {2} & {25} \\
        \hline {d_j} & {15} & {5} & {45} & {5} & {70} \\
        \hline
        \end{array}
        $$

    **Domande**

    1. Costruire la soluzione ammissibile di base iniziale con la regola dell'angolo nord-ovest e calcolarne il costo.

    2. Calcolare i potenziali della sua base ($\pi_7=0$) e i costi ridotti. La soluzione è ottima?

    3. Eseguire il metodo dei potenziali fino alla soluzione ottima, con le regole di (F4).

    4. Scrivere i potenziali ottimi e verificare che il valore del modello duale è uguale al costo ottimo. La soluzione ottima è unica?

??? soluzione "Soluzione"

    Usiamo le regole (F1)–(F5) del riquadro all'inizio di questi esercizi.

    1. La regola dell'angolo nord-ovest dà

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
        <td><span class="arithmatex">\(15\)</span></td>
        <td>colonna <span class="arithmatex">\(4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((1,5)\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>colonna <span class="arithmatex">\(5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((1,6)\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td>riga <span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((2,6)\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td>riga <span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((3,6)\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td>colonna <span class="arithmatex">\(6\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\((3,7)\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>riga <span class="arithmatex">\(3\)</span>, colonna <span class="arithmatex">\(7\)</span></td>
        </tr>
        </table></div>

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
        <td class="cella-blu"><span class="arithmatex">\(15\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(5\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(10\)</span></td>
        <td></td>
        <td><span class="arithmatex">\(30\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td></td>
        <td></td>
        <td class="cella-blu"><span class="arithmatex">\(15\)</span></td>
        <td></td>
        <td><span class="arithmatex">\(15\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td></td>
        <td></td>
        <td class="cella-blu"><span class="arithmatex">\(20\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(25\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(d_j\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(45\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td></td>
        </tr>
        </table></div>

        con costo $4 \cdot 15+6 \cdot 5+8 \cdot 10+7 \cdot 15+3 \cdot 20+2 \cdot 5=345$.

    2. Da $\pi_7=0$ lungo le celle di base: $\pi_{1}=7,\ \pi_{2}=6,\ \pi_{3}=2,\ \pi_{4}=3,\ \pi_{5}=1,\ \pi_{6}=-1,\ \pi_{7}=0$. I costi ridotti delle celle fuori base sono nella prima tabella della risposta successiva; $\bar{c}_{25}=-3$ e $\bar{c}_{24}=-1$ sono negativi, quindi la soluzione non è ottima.

    3. Le tabelle contengono le quantità delle celle di base (blu, in grassetto) e i costi ridotti delle altre celle; i potenziali sono sui margini. <br><strong>Iterazione 1</strong><br> Potenziali: $\pi_{1}=7,\ \pi_{2}=6,\ \pi_{3}=2,\ \pi_{4}=3,\ \pi_{5}=1,\ \pi_{6}=-1,\ \pi_{7}=0$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th></th>
        <th><span class="arithmatex">\(4\)</span></th>
        <th><span class="arithmatex">\(5\)</span></th>
        <th><span class="arithmatex">\(6\)</span></th>
        <th><span class="arithmatex">\(7\)</span></th>
        <th><span class="arithmatex">\(\pi_i\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{15}\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{5}\,\ominus\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{10}\,\oplus\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td class="cella-rossa"><span class="arithmatex">\(-3\,\oplus\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{15}\,\ominus\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{20}\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{5}\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\pi_j\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td></td>
        </tr>
        </table></div>

        - I costi ridotti negativi sono $\bar{c}_{25}=-3$, $\bar{c}_{24}=-1$; la cella $(2,5)$ entra in base.

        - Il ciclo è $\,(2,5)^{+},\ (2,6)^{-},\ (1,6)^{+},\ (1,5)^{-}$.

        - Le celle con segno $-$ hanno $\bar{x}_{26}=15$ e $\bar{x}_{15}=5$: $\theta=5$, e la cella $(1,5)$ esce dalla base.

        - Il costo passa da $345$ a $345+5\cdot(-3)=330$.

        <strong>Iterazione 2</strong><br> Potenziali: $\pi_{1}=7,\ \pi_{2}=6,\ \pi_{3}=2,\ \pi_{4}=3,\ \pi_{5}=4,\ \pi_{6}=-1,\ \pi_{7}=0$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th></th>
        <th><span class="arithmatex">\(4\)</span></th>
        <th><span class="arithmatex">\(5\)</span></th>
        <th><span class="arithmatex">\(6\)</span></th>
        <th><span class="arithmatex">\(7\)</span></th>
        <th><span class="arithmatex">\(\pi_i\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{15}\,\ominus\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{15}\,\oplus\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td class="cella-rossa"><span class="arithmatex">\(-1\,\oplus\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{5}\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{10}\,\ominus\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{20}\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{5}\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\pi_j\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td></td>
        </tr>
        </table></div>

        - L'unico costo ridotto negativo è $\bar{c}_{24}=-1$: la cella $(2,4)$ entra in base.

        - Il ciclo è $\,(2,4)^{+},\ (2,6)^{-},\ (1,6)^{+},\ (1,4)^{-}$.

        - Le celle con segno $-$ hanno $\bar{x}_{26}=10$ e $\bar{x}_{14}=15$: $\theta=10$, e la cella $(2,6)$ esce dalla base.

        - Il costo passa da $330$ a $330+10\cdot(-1)=320$.

        <strong>Iterazione 3</strong><br> Potenziali: $\pi_{1}=7,\ \pi_{2}=5,\ \pi_{3}=2,\ \pi_{4}=3,\ \pi_{5}=3,\ \pi_{6}=-1,\ \pi_{7}=0$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th></th>
        <th><span class="arithmatex">\(4\)</span></th>
        <th><span class="arithmatex">\(5\)</span></th>
        <th><span class="arithmatex">\(6\)</span></th>
        <th><span class="arithmatex">\(7\)</span></th>
        <th><span class="arithmatex">\(\pi_i\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{5}\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{25}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{10}\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{5}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{20}\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{5}\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\pi_j\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td></td>
        </tr>
        </table></div>

        - Tutti i costi ridotti sono non negativi: la soluzione ammissibile di base è ottima, con costo $z=320$.

    4. I potenziali ottimi sono $\pi_{1}=7,\ \pi_{2}=5,\ \pi_{3}=2,\ \pi_{4}=3,\ \pi_{5}=3,\ \pi_{6}=-1,\ \pi_{7}=0$, e il valore duale è

        $$
        \sum_{i} a_i\pi_i-\sum_{j} d_j\pi_j=335-15=320,
        $$

        uguale al costo ottimo. Ogni cella fuori base ha $\bar{c}_{ij}>0$, quindi la soluzione ottima è unica.

    !!! chiave ""

        Dall'angolo nord-ovest (costo $345$) il metodo dei potenziali fa $2$ pivot e raggiunge l'unico ottimo $\tilde{x}_{14}=5$, $\tilde{x}_{16}=25$, $\tilde{x}_{24}=10$, $\tilde{x}_{25}=5$, $\tilde{x}_{36}=20$, $\tilde{x}_{37}=5$, con costo $320$.

<a id="esercizio-7-3"></a>

!!! esercizio "Esercizio 7.3: Degenerazione"

    !!! esercizio "Esercizio"

        Consideriamo l'istanza di trasporto con origini $1,2,3$ e destinazioni $4,5,6$:

        $$
        \begin{array}{c|ccc|c}
        \hline {c_{ij}} & {4} & {5} & {6} & {a_i} \\
        \hline {1} & {7} & {3} & {7} & {20} \\
        {2} & {5} & {3} & {1} & {10} \\
        {3} & {6} & {7} & {8} & {25} \\
        \hline {d_j} & {10} & {10} & {35} & {55} \\
        \hline
        \end{array}
        $$

    **Domande**

    1. Costruire la soluzione dell'angolo nord-ovest. A quale passo si esauriscono insieme una riga e una colonna? Quale cella di base ha valore $0$, e perché deve restare nella base?

    2. Eseguire il metodo dei potenziali a partire da questa soluzione, con le regole di (F4).

    3. Quale pivot è degenere, e che cosa cambia in esso? Dare la soluzione ottima e il suo costo.

??? soluzione "Soluzione"

    Usiamo le regole (F1)–(F5) del riquadro all'inizio di questi esercizi.

    1. La regola dell'angolo nord-ovest dà

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
        <td><span class="arithmatex">\(10\)</span></td>
        <td>riga <span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((2,5)\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>colonna <span class="arithmatex">\(5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((2,6)\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td>riga <span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((3,6)\)</span></td>
        <td><span class="arithmatex">\(25\)</span></td>
        <td>riga <span class="arithmatex">\(3\)</span>, colonna <span class="arithmatex">\(6\)</span></td>
        </tr>
        </table></div>

        Al passo $2$ la cella $(1,5)$ esaurisce sia la riga $1$ sia la colonna $5$. Viene barrata solo la riga, e la cella successiva $(2,5)$ della colonna $5$ riceve la quantità $0$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(\bar{x}_{ij}\)</span></th>
        <th><span class="arithmatex">\(4\)</span></th>
        <th><span class="arithmatex">\(5\)</span></th>
        <th><span class="arithmatex">\(6\)</span></th>
        <th><span class="arithmatex">\(a_i\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(10\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(10\)</span></td>
        <td></td>
        <td><span class="arithmatex">\(20\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td></td>
        <td class="cella-blu"><span class="arithmatex">\(0\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td></td>
        <td></td>
        <td class="cella-blu"><span class="arithmatex">\(25\)</span></td>
        <td><span class="arithmatex">\(25\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(d_j\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(35\)</span></td>
        <td></td>
        </tr>
        </table></div>

        La soluzione, di costo $310$, è degenere. La base richiede $m+n-1=5$ celle: senza $(2,5)$ le altre celle non ricoprono i $6$ nodi, e i potenziali non si possono calcolare.

    2. <strong>Iterazione 1</strong><br> Potenziali: $\pi_{1}=1,\ \pi_{2}=1,\ \pi_{3}=8,\ \pi_{4}=-6,\ \pi_{5}=-2,\ \pi_{6}=0$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th></th>
        <th><span class="arithmatex">\(4\)</span></th>
        <th><span class="arithmatex">\(5\)</span></th>
        <th><span class="arithmatex">\(6\)</span></th>
        <th><span class="arithmatex">\(\pi_i\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{10}\,\ominus\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{10}\,\oplus\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{0}\,\ominus\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{10}\,\oplus\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td class="cella-rossa"><span class="arithmatex">\(-8\,\oplus\)</span></td>
        <td><span class="arithmatex">\(-3\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{25}\,\ominus\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\pi_j\)</span></td>
        <td><span class="arithmatex">\(-6\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td></td>
        </tr>
        </table></div>

        - I costi ridotti negativi sono $\bar{c}_{34}=-8$, $\bar{c}_{35}=-3$, $\bar{c}_{24}=-2$; la cella $(3,4)$ entra in base.

        - Il ciclo è $\,(3,4)^{+},\ (3,6)^{-},\ (2,6)^{+},\ (2,5)^{-},\ (1,5)^{+},\ (1,4)^{-}$.

        - Le celle con segno $-$ hanno $\bar{x}_{36}=25$, $\bar{x}_{25}=0$ e $\bar{x}_{14}=10$: $\theta=0$, e la cella $(2,5)$ esce dalla base.

        - Il pivot è degenere: la soluzione e il suo costo $z=310$ non cambiano, cambia solo la base.

        <strong>Iterazione 2</strong><br> Potenziali: $\pi_{1}=9,\ \pi_{2}=1,\ \pi_{3}=8,\ \pi_{4}=2,\ \pi_{5}=6,\ \pi_{6}=0$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th></th>
        <th><span class="arithmatex">\(4\)</span></th>
        <th><span class="arithmatex">\(5\)</span></th>
        <th><span class="arithmatex">\(6\)</span></th>
        <th><span class="arithmatex">\(\pi_i\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{10}\,\ominus\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{10}\)</span></td>
        <td class="cella-rossa"><span class="arithmatex">\(-2\,\oplus\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{10}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{0}\,\oplus\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{25}\,\ominus\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\pi_j\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td></td>
        </tr>
        </table></div>

        - L'unico costo ridotto negativo è $\bar{c}_{16}=-2$: la cella $(1,6)$ entra in base.

        - Il ciclo è $\,(1,6)^{+},\ (1,4)^{-},\ (3,4)^{+},\ (3,6)^{-}$.

        - Le celle con segno $-$ hanno $\bar{x}_{14}=10$ e $\bar{x}_{36}=25$: $\theta=10$, e la cella $(1,4)$ esce dalla base.

        - Il costo passa da $310$ a $310+10\cdot(-2)=290$.

        <strong>Iterazione 3</strong><br> Potenziali: $\pi_{1}=7,\ \pi_{2}=1,\ \pi_{3}=8,\ \pi_{4}=2,\ \pi_{5}=4,\ \pi_{6}=0$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th></th>
        <th><span class="arithmatex">\(4\)</span></th>
        <th><span class="arithmatex">\(5\)</span></th>
        <th><span class="arithmatex">\(6\)</span></th>
        <th><span class="arithmatex">\(\pi_i\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{10}\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{10}\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{10}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{10}\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{15}\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\pi_j\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td></td>
        </tr>
        </table></div>

        - Tutti i costi ridotti sono non negativi: la soluzione ammissibile di base è ottima, con costo $z=290$.

    3. Il primo pivot ha $\theta=0$: la cella $(3,4)$ entra con valore $0$ ed esce $(2,5)$; la soluzione e il suo costo non cambiano, ma i nuovi potenziali mostrano un costo ridotto negativo. La soluzione ottima è $\tilde{x}_{15}=10$, $\tilde{x}_{16}=10$, $\tilde{x}_{26}=10$, $\tilde{x}_{34}=10$, $\tilde{x}_{36}=15$, con costo $290$, ed è unica, perché ogni cella fuori base ha $\bar{c}_{ij}>0$.

    !!! chiave ""

        La soluzione dell'angolo nord-ovest è degenere (la cella di base $(2,5)$ ha valore $0$); il primo pivot ha $\theta=0$, il secondo pivot raggiunge l'ottimo, di costo $290$.

<a id="esercizio-7-4"></a>

!!! esercizio "Esercizio 7.4: L'algoritmo ungherese"

    !!! esercizio "Esercizio"

        Cinque lavoratori $1,2,3,4,5$ vanno assegnati a cinque lavori $6,7,8,9,10$, un lavoro ciascuno, a costo totale minimo. I costi sono:

        $$
        \begin{array}{c|ccccc}
        \hline {c_{ij}} & {6} & {7} & {8} & {9} & {10} \\
        \hline {1} & {6} & {10} & {10} & {5} & {3} \\
        {2} & {11} & {12} & {9} & {7} & {7} \\
        {3} & {8} & {1} & {12} & {6} & {11} \\
        {4} & {12} & {7} & {10} & {8} & {2} \\
        {5} & {3} & {4} & {11} & {6} & {1} \\
        \hline
        \end{array}
        $$

    **Domande**

    1. Ridurre le righe e poi le colonne della matrice. Quali potenziali danno le riduzioni, e quale lower bound sul costo ottimo?

    2. Eseguire l'algoritmo ungherese: a ogni iterazione dare un insieme massimo di zeri indipendenti, le linee di (F5) e l'aggiustamento $\delta$.

    3. Dare l'assegnamento ottimo e il suo costo, e verificare che i potenziali finali sono una soluzione duale ottima.

??? soluzione "Soluzione"

    Usiamo le regole (F1)–(F5) del riquadro all'inizio di questi esercizi.

    1. I minimi di riga sono $3,7,1,2,1$, quindi $\pi_{1}=3$, $\pi_{2}=7$, $\pi_{3}=1$, $\pi_{4}=2$, $\pi_{5}=1$:

        $$
        \begin{array}{c|ccccc}
        \hline {c_{ij}-\pi_i} & {6} & {7} & {8} & {9} & {10} \\
        \hline {1} & {3} & {7} & {7} & {2} & {0} \\
        {2} & {4} & {5} & {2} & {0} & {0} \\
        {3} & {7} & {0} & {11} & {5} & {10} \\
        {4} & {10} & {5} & {8} & {6} & {0} \\
        {5} & {2} & {3} & {10} & {5} & {0} \\
        \hline
        \end{array}
        $$

        I minimi di colonna sono allora $2,0,2,0,0$, quindi $\pi_{6}=-2$ e $\pi_{8}=-2$, e gli altri $\pi_j$ sono $0$. Il valore duale $\sum_i\pi_i-\sum_j\pi_j=18$ è un lower bound sul costo di ogni assegnamento.

    2. In ogni matrice gli zeri indipendenti sono riquadrati, le linee sono blu e la cella di $\delta$ è rossa; i potenziali sono sui margini. <br><strong>Iterazione 1</strong>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(\bar{c}_{ij}\)</span></th>
        <th><span class="arithmatex">\(6\)</span></th>
        <th><span class="arithmatex">\(7\)</span></th>
        <th><span class="arithmatex">\(8\)</span></th>
        <th><span class="arithmatex">\(9\)</span></th>
        <th><span class="arithmatex">\(10\)</span></th>
        <th><span class="arithmatex">\(\pi_i\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-rossa"><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(5\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(0\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(5\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(9\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(5\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(3\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(8\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(5\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\pi_j\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td></td>
        </tr>
        </table></div>

        - Un insieme massimo di zeri indipendenti (riquadrati) ha $4$ elementi: $(1,10)$, $(2,8)$, $(3,7)$, $(5,6)$.

        - Le $4<5$ linee (blu) sono le righe $2$, $3$ e $5$ e la colonna $10$.

        - Il minimo elemento non coperto è $\delta=1$, nella cella $(1,6)$ (rossa). Lo sottraiamo dagli elementi non coperti e lo aggiungiamo agli elementi coperti due volte: $\pi_i$ cresce di $1$ per le righe non coperte $1$ e $4$, e $\pi_j$ cresce di $1$ per la colonna coperta $10$. Il valore duale cresce di $1\cdot(5-4)=1$.

        <strong>Iterazione 2</strong>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(\bar{c}_{ij}\)</span></th>
        <th><span class="arithmatex">\(6\)</span></th>
        <th><span class="arithmatex">\(7\)</span></th>
        <th><span class="arithmatex">\(8\)</span></th>
        <th><span class="arithmatex">\(9\)</span></th>
        <th><span class="arithmatex">\(10\)</span></th>
        <th><span class="arithmatex">\(\pi_i\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td class="cella-rossa"><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(5\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(0\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(5\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(9\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(5\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\pi_j\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td></td>
        </tr>
        </table></div>

        - Un insieme massimo di zeri indipendenti (riquadrati) ha $4$ elementi: $(1,6)$, $(2,8)$, $(3,7)$, $(4,10)$.

        - Le $4<5$ linee (blu) sono le righe $2$ e $3$ e le colonne $6$ e $10$.

        - Il minimo elemento non coperto è $\delta=1$, nella cella $(1,9)$ (rossa). Lo sottraiamo dagli elementi non coperti e lo aggiungiamo agli elementi coperti due volte: $\pi_i$ cresce di $1$ per le righe non coperte $1$, $4$ e $5$, e $\pi_j$ cresce di $1$ per le colonne coperte $6$ e $10$. Il valore duale cresce di $1\cdot(5-4)=1$.

        <strong>Iterazione 3</strong>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(\bar{c}_{ij}\)</span></th>
        <th><span class="arithmatex">\(6\)</span></th>
        <th><span class="arithmatex">\(7\)</span></th>
        <th><span class="arithmatex">\(8\)</span></th>
        <th><span class="arithmatex">\(9\)</span></th>
        <th><span class="arithmatex">\(10\)</span></th>
        <th><span class="arithmatex">\(\pi_i\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(0\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(5\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(3\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(3\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(5\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(0\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(6\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(9\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(5\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(7\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(3\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(4\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(4\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(7\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(4\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\pi_j\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td></td>
        </tr>
        </table></div>

        - Un insieme massimo di zeri indipendenti (riquadrati) ha $5$ elementi: $(1,9)$, $(2,8)$, $(3,7)$, $(4,10)$, $(5,6)$.

        - Formano un assegnamento di costo ridotto nullo: l'algoritmo si ferma, e l'assegnamento è ottimo.

    3. L'assegnamento ottimo è $1 \to 9$, $2 \to 8$, $3 \to 7$, $4 \to 10$, $5 \to 6$, con costo $5+9+1+2+3=20$. I potenziali finali danno $\sum_i\pi_i-\sum_j\pi_j=19-(-1)=20$, uguale al costo; tutti i costi ridotti sono non negativi, quindi i potenziali sono duali ammissibili ed entrambe le soluzioni sono ottime. L'ottimo è unico, come conferma l'enumerazione dei $120$ assegnamenti.

    !!! chiave ""

        Le riduzioni danno il lower bound $18$; due aggiustamenti, con $\delta=1$ e $\delta=1$, portano all'assegnamento ottimo $1 \to 9$, $2 \to 8$, $3 \to 7$, $4 \to 10$, $5 \to 6$, di costo $20$.

<a id="esercizio-7-5"></a>

!!! esercizio "Esercizio 7.5: Basi, cicli e regola del costo minimo"

    !!! esercizio "Esercizio"

        Consideriamo l'istanza di trasporto con origini $1,2,3$ e destinazioni $4,5,6$:

        $$
        \begin{array}{c|ccc|c}
        \hline {c_{ij}} & {4} & {5} & {6} & {a_i} \\
        \hline {1} & {2} & {4} & {1} & {30} \\
        {2} & {4} & {8} & {5} & {20} \\
        {3} & {9} & {1} & {1} & {15} \\
        \hline {d_j} & {35} & {10} & {20} & {65} \\
        \hline
        \end{array}
        $$

        e i tre insiemi di celle

        $$
        T_1=\{(1,4),(2,4),(2,6),(3,5),(3,6)\},\qquad T_2=\{(1,6),(2,4),(2,6),(3,5),(3,6)\},
        $$

        $$
        T_3=\{(2,4),(2,5),(2,6),(3,5),(3,6)\}.
        $$

    **Domande**

    1. Quali fra $T_1$, $T_2$, $T_3$ sono basi? Per ogni base calcolare la sua soluzione di base e dire se è ammissibile.

    2. Dimostrare che aggiungere una costante $k$ a tutti i costi della riga $i$ aggiunge $k\,a_i$ al costo di ogni soluzione ammissibile, e quindi le soluzioni ottime non cambiano. Che cosa succede aggiungendo $k$ a una colonna $j$?

    3. Costruire la soluzione del costo minimo e decidere con i potenziali se è ottima. La regola del costo minimo è sempre ottima?

??? soluzione "Soluzione"

    Usiamo le regole (F1)–(F5) del riquadro all'inizio di questi esercizi.

    1. Ogni insieme ha $m+n-1=5$ celle, quindi è una base esattamente quando non contiene cicli (F2).

        - $T_1$ non ha cicli: è un albero ricoprente. Foglia per foglia, la foglia $1$ dà $x_{14}=30$, la foglia $4$ dà $x_{24}=5$, la foglia $2$ dà $x_{26}=15$, la foglia $5$ dà $x_{35}=10$, la foglia $3$ dà $x_{36}=5$: la soluzione di base è ammissibile.

        - $T_2$ non ha cicli: è un albero ricoprente. Foglia per foglia, la foglia $1$ dà $x_{16}=30$, la foglia $4$ dà $x_{24}=35$, la foglia $2$ dà $x_{26}=-15$, la foglia $5$ dà $x_{35}=10$, la foglia $3$ dà $x_{36}=5$: il valore $-15$ è negativo, e la soluzione di base non è ammissibile.

        - $T_3$ contiene le celle $(2,5)$, $(3,5)$, $(3,6)$, $(2,6)$, che formano il ciclo $2,5,3,6,2$ alternando righe e colonne: le loro colonne sono linearmente dipendenti, e $T_3$ non è una base.

    2. Sia $c'_{ij}=c_{ij}+k$ per ogni $j$ e $c'_{hj}=c_{hj}$ per $h \neq i$. Per ogni $\vet{x}$ ammissibile

        $$
        \sum_{h}\sum_{j} c'_{hj}x_{hj}=\sum_{h}\sum_{j} c_{hj}x_{hj}+k\sum_{j} x_{ij}=\sum_{h}\sum_{j} c_{hj}x_{hj}+k\,a_i ,
        $$

        perché la riga $i$ di una soluzione ammissibile ha somma $a_i$. Tutti i costi cambiano della stessa costante, quindi l'ordine delle soluzioni ammissibili, e le soluzioni ottime, non cambiano. Allo stesso modo, aggiungere $k$ alla colonna $j$ aggiunge $k\,d_j$ a ogni costo. Nel metodo dei potenziali questo è un cambiamento di $\pi_i$ di $k$ (o di $\pi_j$ di $-k$), a meno della normalizzazione, e i costi ridotti non cambiano.

    3. La regola del costo minimo dà

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>passo</th>
        <th>cella</th>
        <th>quantità</th>
        <th>barrata</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((1,6)\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td>colonna <span class="arithmatex">\(6\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((3,5)\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td>colonna <span class="arithmatex">\(5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((1,4)\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td>riga <span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((2,4)\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td>riga <span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((3,4)\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>riga <span class="arithmatex">\(3\)</span>, colonna <span class="arithmatex">\(4\)</span></td>
        </tr>
        </table></div>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(\bar{x}_{ij}\)</span></th>
        <th><span class="arithmatex">\(4\)</span></th>
        <th><span class="arithmatex">\(5\)</span></th>
        <th><span class="arithmatex">\(6\)</span></th>
        <th><span class="arithmatex">\(a_i\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(10\)</span></td>
        <td></td>
        <td class="cella-blu"><span class="arithmatex">\(20\)</span></td>
        <td><span class="arithmatex">\(30\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(20\)</span></td>
        <td></td>
        <td></td>
        <td><span class="arithmatex">\(20\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(5\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(10\)</span></td>
        <td></td>
        <td><span class="arithmatex">\(15\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(d_j\)</span></td>
        <td><span class="arithmatex">\(35\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td></td>
        </tr>
        </table></div>

        con costo $175$. I suoi potenziali e i costi ridotti sono

        <div class="tabella" markdown="0"><table>
        <tr>
        <th></th>
        <th><span class="arithmatex">\(4\)</span></th>
        <th><span class="arithmatex">\(5\)</span></th>
        <th><span class="arithmatex">\(6\)</span></th>
        <th><span class="arithmatex">\(\pi_i\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{10}\,\oplus\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{20}\,\ominus\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{20}\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{5}\,\ominus\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\mathbf{10}\)</span></td>
        <td class="cella-rossa"><span class="arithmatex">\(-7\,\oplus\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\pi_j\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td></td>
        </tr>
        </table></div>

        - L'unico costo ridotto negativo è $\bar{c}_{36}=-7$: la cella $(3,6)$ entra in base.

        - Il ciclo è $\,(3,6)^{+},\ (3,4)^{-},\ (1,4)^{+},\ (1,6)^{-}$.

        - Le celle con segno $-$ hanno $\bar{x}_{34}=5$ e $\bar{x}_{16}=20$: $\theta=5$, e la cella $(3,4)$ esce dalla base.

        - Il costo passa da $175$ a $175+5\cdot(-7)=140$.

        La soluzione non è ottima: un pivot dà l'ottimo, di costo $140$. La regola del costo minimo guarda una cella alla volta e non è sempre ottima; questa istanza è un controesempio.

    !!! chiave ""

        $T_1$ è una base con soluzione di base ammissibile, $T_2$ una base con un valore negativo, $T_3$ contiene un ciclo. La soluzione del costo minimo (costo $175$) non è ottima: l'ottimo è $140$.

<a id="esercizio-7-6"></a>

!!! esercizio "Esercizio 7.6: Un assegnamento di profitto massimo"

    !!! esercizio "Esercizio"

        Quattro venditori $1,2,3,4$ vanno assegnati a quattro regioni $5,6,7,8$, una regione ciascuno. I profitti attesi $p_{ij}$ sono:

        $$
        \begin{array}{c|cccc}
        \hline {p_{ij}} & {5} & {6} & {7} & {8} \\
        \hline {1} & {9} & {4} & {5} & {1} \\
        {2} & {8} & {5} & {3} & {3} \\
        {3} & {2} & {1} & {1} & {1} \\
        {4} & {2} & {2} & {6} & {8} \\
        \hline
        \end{array}
        $$

        Cerchiamo un assegnamento di profitto totale massimo.

    **Domande**

    1. Trasformare il problema in un problema di assegnamento di costo minimo con costi non negativi.

    2. Risolverlo con l'algoritmo ungherese.

    3. Dare l'assegnamento di profitto massimo e il suo profitto.

??? soluzione "Soluzione"

    Usiamo le regole (F1)–(F5) del riquadro all'inizio di questi esercizi.

    1. Il profitto più grande è $p_{\max}=9$. Con $c_{ij}=9-p_{ij}$ ogni assegnamento costa $4 \cdot 9$ meno il suo profitto, quindi minimizzare il costo massimizza il profitto:

        $$
        \begin{array}{c|cccc}
        \hline {c_{ij}} & {5} & {6} & {7} & {8} \\
        \hline {1} & {0} & {5} & {4} & {8} \\
        {2} & {1} & {4} & {6} & {6} \\
        {3} & {7} & {8} & {8} & {8} \\
        {4} & {7} & {7} & {3} & {1} \\
        \hline
        \end{array}
        $$

    2. I minimi di riga sono $0,1,7,1$ e poi i minimi di colonna $0,1,1,0$: <br><strong>Iterazione 1</strong>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(\bar{c}_{ij}\)</span></th>
        <th><span class="arithmatex">\(5\)</span></th>
        <th><span class="arithmatex">\(6\)</span></th>
        <th><span class="arithmatex">\(7\)</span></th>
        <th><span class="arithmatex">\(8\)</span></th>
        <th><span class="arithmatex">\(\pi_i\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(0\)</span></td>
        <td class="cella-rossa"><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(0\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(0\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(6\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(5\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\pi_j\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td></td>
        </tr>
        </table></div>

        - Un insieme massimo di zeri indipendenti (riquadrati) ha $3$ elementi: $(1,5)$, $(3,6)$, $(4,8)$.

        - Le $3<4$ linee (blu) sono le righe $3$ e $4$ e la colonna $5$.

        - Il minimo elemento non coperto è $\delta=2$, nella cella $(2,6)$ (rossa). Lo sottraiamo dagli elementi non coperti e lo aggiungiamo agli elementi coperti due volte: $\pi_i$ cresce di $2$ per le righe non coperte $1$ e $2$, e $\pi_j$ cresce di $2$ per la colonna coperta $5$. Il valore duale cresce di $2\cdot(4-3)=2$.

        <strong>Iterazione 2</strong>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(\bar{c}_{ij}\)</span></th>
        <th><span class="arithmatex">\(5\)</span></th>
        <th><span class="arithmatex">\(6\)</span></th>
        <th><span class="arithmatex">\(7\)</span></th>
        <th><span class="arithmatex">\(8\)</span></th>
        <th><span class="arithmatex">\(\pi_i\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(0\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(0\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(8\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(5\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(\boxed{0}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\pi_j\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td></td>
        </tr>
        </table></div>

        - Un insieme massimo di zeri indipendenti (riquadrati) ha $4$ elementi: $(1,5)$, $(2,6)$, $(3,7)$, $(4,8)$.

        - Formano un assegnamento di costo ridotto nullo: l'algoritmo si ferma, e l'assegnamento è ottimo.

    3. L'assegnamento ottimo è $1 \to 5$, $2 \to 6$, $3 \to 7$, $4 \to 8$, con costo $13$ e profitto

        $$
        9+5+1+8=23=4 \cdot 9-13.
        $$

        L'enumerazione dei $24$ assegnamenti conferma che è l'unico ottimo.

    !!! chiave ""

        Con $c_{ij}=9-p_{ij}$ l'algoritmo ungherese dà $1 \to 5$, $2 \to 6$, $3 \to 7$, $4 \to 8$, con profitto $23$.
