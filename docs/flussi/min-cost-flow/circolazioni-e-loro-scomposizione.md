---
title: "Circolazioni e loro scomposizione"
---

# 6.2 Circolazioni e loro scomposizione { #sez-sec-mc-decomposition }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 6** · [:material-book-open-variant: Capitolo 6: Flusso di costo minimo](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-pencil: Esercizi: Flusso di costo minimo](../../esercizi/min-cost-flow.md)

</div>

<a id="box-5-mc-def-circ"></a>

!!! definizione "Definizione 6.4: circolazione"

    Sia $H=(N,F)$ un grafo diretto. Un <strong>circolazione</strong> su $H$ è un vettore $\vet{y} \in \R^{F}$ con $\vet{y} \ge \vet{0}$ tale che ogni nodo abbia un flusso in uscita uguale all'afflusso:

    $$
    \sum_{(i,j) \in \delta^+(i)} y_{ij}=\sum_{(j,i) \in \delta^-(i)} y_{ji}, \qquad \forall i \in N .
    $$

    Il <strong>vettore di incidenza</strong> $\vet{\chi}^W$ di un ciclo diretto $W$ di $H$, con $\chi^W_a=1$ sugli archi di $W$ e $\chi^W_a=0$ altrove, è una circolazione.

<a id="box-6-mc-lem-decomp"></a>

!!! teorema "Lemma 6.5: scomposizione in cicli"

    Sia $\vet{y} \neq \vet{0}$ una circolazione su $H=(N,F)$, con archi $p$ dove $y_a>0$. Poi ci sono i cicli diretti $W_1,W_2,\dots,W_k$ di $H$, con $k \le p$, composto da archi con $y_a>0$ e numeri $\theta_1,\theta_2,\dots, \theta_k>0$ tale che

    $$
    \vet{y}=\sum_{h=1}^{k} \theta_h\, \vet{\chi}^{W_h} .
    $$

    Se $\vet{y}$ è un numero intero, i numeri $\theta_h$ sono numeri interi.

??? dimostrazione "Dimostrazione"

    Per induzione su $p$.

    1. <em>Un ciclo.</em> Sia $(i_0,i_1)$ un arco con $y_{i_0i_1}>0$. Il nodo $i_1$ riceve un afflusso positivo, quindi da bilanciare alcuni archi $(i_1,i_2)$ ha $y_{i_1i_2}>0$. Proseguendo allo stesso modo costruiamo un cammino diretto formato da archi con $y>0$. Poiché $N$ è finito, un nodo si ripete e il tratto di cammino tra le sue due occorrenze è un ciclo diretto $W_1$.

    2. <em>Rimozione.</em> Lascia che $\theta_1=\min_{a \in W_1} y_a>0$. Il vettore $\vet{y}'=\vet{y}-\theta_1 \vet{\chi}^{W_1}$ è non negativo, è bilanciato come differenza di vettori bilanciati e ha al massimo $p-1$ archi positivi, poiché $y'_a=0$ su un arco di $W_1$ che raggiunge il minimo.

    3. <em>Induzione.</em> Se $\vet{y}'=\vet{0}$, allora $\vet{y}=\theta_1\vet{\chi}^{W_1}$. Altrimenti l'induzione dà $\vet{y}'=\sum_{h=2}^{k}\theta_h\vet{\chi}^{W_h}$ con $k-1 \le p-1$ cicli di archi con $y'_a>0$, quindi $y_a>0$.

    Se $\vet{y}$ è un numero intero, $\theta_1$ è una delle sue voci e $\vet{y}'$ è un numero intero, quindi tutti i $\theta_h$ sono numeri interi. <span class="qed">□</span>

<a id="box-7-mc-lem-diff"></a>

!!! teorema "Lemma 6.6: la differenza di due flussi fattibili"

    Siano $\vet{x}$ e $\vet{x}'$ flussi ammissibili. Definire $\vet{y}$ sugli archi di $G(\vet{x})$: per ogni $(i,j) \in A$,

    $$
    \begin{aligned}
    y_{ij}&=x'_{ij}-x_{ij} && \text{sull'arco in avanti } (i,j), \text{ se } x'_{ij}>x_{ij},\\
    y_{ji}&=x_{ij}-x'_{ij} && \text{sull'arco all'indietro } (j,i), \text{ se } x'_{ij}<x_{ij},
    \end{aligned}
    $$

    e $y=0$ sugli altri archi di $G(\vet{x})$. Quindi $\vet{y}$ è una circolazione su $G(\vet{x})$ con $y_{ij} \le r_{ij}$, e

    $$
    \vet{c}'\vet{x}'-\vet{c}'\vet{x}=\sum_{(i,j) \in A(\vet{x})} c^x_{ij}\, y_{ij}=\sum_{h=1}^{k}\theta_h\, c(W_h)
    $$

    per ogni scomposizione di $\vet{y}=\sum_{h=1}^{k}\theta_h\vet{\chi}^{W_h}$ in cicli di $G(\vet{x})$.

??? dimostrazione "Dimostrazione"

    Controlliamo che $\vet{y}$ viva su $G(\vet{x})$, che sia bilanciato e il suo costo.

    1. Se $x'_{ij}>x_{ij}$, allora $x_{ij}<x'_{ij} \le u_{ij}$: l'arco in avanti esiste e $y_{ij} \le u_{ij}-x_{ij}= r_{ij}$. Se $x'_{ij}<x_{ij}$, allora $x_{ij}>x'_{ij} \ge l_{ij}$: esiste l'arco all'indietro e $y_{ji} \le x_{ij}-l_{ij} =r_{ji}$.

    2. Come nella dimostrazione di <span style="color:#1971c2">[Proposizione 6.3](la-rete-residua-con-i-costi.md#box-3-mc-prop-augment)</span>, $y$ su un arco $(i,k)$ di $G(\vet{x})$ aggiunge $y$ al deflusso meno l'afflusso di $i$ e lo sottrae da quello di $k$, esattamente come la variazione da $\vet{x}$ a $\vet{x}'$ fa sull'arco corrispondente di $A$. Quindi il deflusso meno l'afflusso di $\vet{y}$ nel nodo $i$ è $(\mat{B}\vet{x}')_i-(\mat{B}\vet{x})_i=b_i-b_i=0$.

    3. Un arco in avanti contribuisce $c_{ij}(x'_{ij}-x_{ij})$, un arco all'indietro $-c_{ij}(x_{ij}-x'_{ij})=c_{ij}(x'_{ij}- x_{ij})$: il totale è $\vet{c}'(\vet{x}'-\vet{x})$. Con la scomposizione, $\sum c^x_{ij}y_{ij}=\sum_h \theta_h \sum_{(i,j) \in W_h} c^x_{ij}=\sum_h \theta_h\, c(W_h)$. <span class="qed">□</span>

- Per <span style="color:#1971c2">[Lemma 6.5](#box-6-mc-lem-decomp)</span> esiste una tale scomposizione: $\vet{x}'$ è $\vet{x}$ aumentata lungo i cicli $W_1,W_2,\dots,W_k$ di $G(\vet{x})$ di $\theta_1,\theta_2,\dots,\theta_k$. Poiché $\vet{y}$ è positivo su al massimo un arco di $G(\vet{x})$ per arco di $A$, $k \le m$.

<a id="box-8-mc-ex-decomp"></a>

!!! esempio "Esempio 6.2: dal flusso più costoso al flusso ottimale"

    Confrontiamo $\vet{x}^0$ di <span style="color:#1971c2">[Esempio 6.1](la-rete-residua-con-i-costi.md#box-4-mc-ex-residual)</span>, di costo $80$, con il flusso ottimale $\tilde{\vet{x}}=(2,3,4,0,3,0,2,1,2)$ del capitolo 4, di costo $60$. La differenza è

    $$
    \tilde{\vet{x}}-\vet{x}^0=(1,\,-1,\,0,\,-1,\,-1,\,-1,\,-1,\,-2,\,1),
    $$

    quindi $\vet{y}$ è positivo su otto archi di $G(\vet{x}^0)$: gli archi in avanti $(1,2)$ e $(5,6)$, con $y=1$, e gli archi all'indietro

    $$
    y_{31}=1, \qquad y_{23}=1, \qquad y_{53}=1, \qquad y_{34}=1, \qquad y_{64}=1, \qquad y_{45}=2 .
    $$

    Seguiamo la dimostrazione di <span style="color:#1971c2">[Lemma 6.5](#box-6-mc-lem-decomp)</span>, partendo ogni volta dal primo arco con $y>0$ in ordine lessicografo e lasciando ogni nodo lungo il suo arco con $y>0$ di testa più piccola:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">\(h\)</span></th>
    <th>ciclo <span class="arithmatex">\(W_h\)</span></th>
    <th><span class="arithmatex">\(\theta_h\)</span></th>
    <th><span class="arithmatex">\(c(W_h)\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(1,2,3,1\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(2-2-2=-2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3,4,5,3\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(-3-5-3=-11\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(4,5,6,4\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(-5+3-5=-7\)</span></td>
    </tr>
    </table></div>

    Di <span style="color:#1971c2">[Lemma 6.6](#box-7-mc-lem-diff)</span>, $\vet{c}'\tilde{\vet{x}}-\vet{c}'\vet{x}^0=-2-11-7=-20=60-80$. Tutto tre cicli sono negativi e $W_2$ è il ciclo $4,5,3,4$ di <span style="color:#1971c2">[Esempio 6.1](la-rete-residua-con-i-costi.md#box-4-mc-ex-residual)</span>, scritto da nodo $3$.

!!! chiave ""

    Una circolazione è una somma di multipli positivi di cicli orientati. La differenza tra due flussi ammissibili è a circolazione su $G(\vet{x})$: ogni flusso fattibile viene raggiunto da $\vet{x}$ lungo cicli di $G(\vet{x})$, e il costo modifiche apportate da $\sum_h \theta_h\, c(W_h)$.

---

**Avanti:** [6.3 Condizioni di ottimalità del ciclo negativo](condizioni-di-ottimalita-del-ciclo-negativo.md)
