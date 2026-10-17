---
title: "Circolazioni e loro scomposizione"
---

# 6.2 Circolazioni e loro scomposizione { #sez-sec-mc-decomposition }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 6** · [:material-book-open-variant: Capitolo 6: Flusso di costo minimo](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-presentation: Slide](../../pdf/slide-min-cost-flow.pdf) · [:material-pencil: Esercizi: Flusso di costo minimo](../../esercizi/min-cost-flow.md) · [:material-gesture-tap: App: Flusso di costo minimo: cancellazione dei cicli e cammini minimi successivi](../../laboratorio/flusso-di-costo-minimo.md)

</div>

<a id="box-5-mc-def-circ"></a>

!!! definizione "Definizione 6.4: circolazione"

    Sia $H=(N,F)$ un grafo orientato. Una <strong>circolazione</strong> su $H$ è un vettore $\vet{y} \in \R^{F}$ con $\vet{y} \ge \vet{0}$ tale che in ogni nodo il flusso uscente sia uguale al flusso entrante:

    $$
    \sum_{(i,j) \in \delta^+(i)} y_{ij}=\sum_{(j,i) \in \delta^-(i)} y_{ji}, \qquad \forall i \in N .
    $$

    Il <strong>vettore di incidenza</strong> $\vet{\chi}^W$ di un ciclo orientato $W$ di $H$, con $\chi^W_a=1$ sugli archi di $W$ e $\chi^W_a=0$ altrove, è una circolazione.

<a id="box-6-mc-lem-decomp"></a>

!!! teorema "Lemma 6.5: scomposizione in cicli"

    Sia $\vet{y} \neq \vet{0}$ una circolazione su $H=(N,F)$, con $p$ archi su cui $y_a>0$. Allora esistono cicli orientati $W_1,W_2,\dots,W_k$ di $H$, con $k \le p$, formati da archi con $y_a>0$, e numeri $\theta_1,\theta_2,\dots, \theta_k>0$ tali che

    $$
    \vet{y}=\sum_{h=1}^{k} \theta_h\, \vet{\chi}^{W_h} .
    $$

    Se $\vet{y}$ è intero, i numeri $\theta_h$ sono interi.

??? dimostrazione "Dimostrazione"

    Per induzione su $p$.

    1. <em>Un ciclo.</em> Sia $(i_0,i_1)$ un arco con $y_{i_0i_1}>0$. Il nodo $i_1$ riceve un flusso entrante positivo, quindi per il bilancio qualche arco $(i_1,i_2)$ ha $y_{i_1i_2}>0$. Proseguendo allo stesso modo costruiamo una passeggiata orientata di archi con $y>0$. Poiché $N$ è finito, un nodo si ripete, e il tratto della passeggiata tra le sue due occorrenze è un ciclo orientato $W_1$.

    2. <em>Rimozione.</em> Sia $\theta_1=\min_{a \in W_1} y_a>0$. Il vettore $\vet{y}'=\vet{y}-\theta_1 \vet{\chi}^{W_1}$ è non negativo, è bilanciato come differenza di vettori bilanciati e ha al più $p-1$ archi positivi, perché $y'_a=0$ su un arco di $W_1$ che realizza il minimo.

    3. <em>Induzione.</em> Se $\vet{y}'=\vet{0}$, allora $\vet{y}=\theta_1\vet{\chi}^{W_1}$. Altrimenti l'induzione dà $\vet{y}'=\sum_{h=2}^{k}\theta_h\vet{\chi}^{W_h}$ con $k-1 \le p-1$ cicli di archi con $y'_a>0$, e quindi $y_a>0$.

    Se $\vet{y}$ è intero, $\theta_1$ è una delle sue componenti e $\vet{y}'$ è intero, quindi tutti i $\theta_h$ sono interi. <span class="qed">□</span>

<a id="box-7-mc-lem-diff"></a>

!!! teorema "Lemma 6.6: la differenza di due flussi ammissibili"

    Siano $\vet{x}$ e $\vet{x}'$ flussi ammissibili. Definiamo $\vet{y}$ sugli archi di $G(\vet{x})$: per ogni $(i,j) \in A$,

    $$
    \begin{aligned}
    y_{ij}&=x'_{ij}-x_{ij} && \text{sull'arco in avanti } (i,j), \text{ se } x'_{ij}>x_{ij},\\
    y_{ji}&=x_{ij}-x'_{ij} && \text{sull'arco all'indietro } (j,i), \text{ se } x'_{ij}<x_{ij},
    \end{aligned}
    $$

    e $y=0$ sugli altri archi di $G(\vet{x})$. Allora $\vet{y}$ è una circolazione su $G(\vet{x})$ con $y_{ij} \le r_{ij}$, e

    $$
    \vet{c}'\vet{x}'-\vet{c}'\vet{x}=\sum_{(i,j) \in A(\vet{x})} c^x_{ij}\, y_{ij}=\sum_{h=1}^{k}\theta_h\, c(W_h)
    $$

    per ogni scomposizione $\vet{y}=\sum_{h=1}^{k}\theta_h\vet{\chi}^{W_h}$ in cicli di $G(\vet{x})$.

??? dimostrazione "Dimostrazione"

    Verifichiamo che $\vet{y}$ stia sugli archi di $G(\vet{x})$, che sia bilanciato, e calcoliamo il suo costo.

    1. Se $x'_{ij}>x_{ij}$, allora $x_{ij}<x'_{ij} \le u_{ij}$: l'arco in avanti esiste e $y_{ij} \le u_{ij}-x_{ij}= r_{ij}$. Se $x'_{ij}<x_{ij}$, allora $x_{ij}>x'_{ij} \ge l_{ij}$: l'arco all'indietro esiste e $y_{ji} \le x_{ij}-l_{ij} =r_{ji}$.

    2. Come nella dimostrazione della <span style="color:#1971c2">[Proposizione 6.3](la-rete-residua-con-i-costi.md#box-3-mc-prop-augment)</span>, $y$ su un arco $(i,k)$ di $G(\vet{x})$ aggiunge $y$ al flusso uscente meno entrante di $i$ e lo sottrae a quello di $k$, esattamente come fa la variazione da $\vet{x}$ a $\vet{x}'$ sull'arco corrispondente di $A$. Quindi il flusso uscente meno entrante di $\vet{y}$ nel nodo $i$ è $(\mat{B}\vet{x}')_i-(\mat{B}\vet{x})_i=b_i-b_i=0$.

    3. Un arco in avanti contribuisce con $c_{ij}(x'_{ij}-x_{ij})$, un arco all'indietro con $-c_{ij}(x_{ij}-x'_{ij})=c_{ij}(x'_{ij}- x_{ij})$: il totale è $\vet{c}'(\vet{x}'-\vet{x})$. Con la scomposizione, $\sum c^x_{ij}y_{ij}=\sum_h \theta_h \sum_{(i,j) \in W_h} c^x_{ij}=\sum_h \theta_h\, c(W_h)$. <span class="qed">□</span>

- Per il <span style="color:#1971c2">[Lemma 6.5](#box-6-mc-lem-decomp)</span> la scomposizione esiste, quindi $\vet{x}'$ è il flusso $\vet{x}$ aumentato lungo i cicli $W_1,W_2,\dots,W_k$ di $G(\vet{x})$ di $\theta_1,\theta_2,\dots,\theta_k$. Poiché $\vet{y}$ è positivo su al più un arco di $G(\vet{x})$ per ogni arco di $A$, $k \le m$.

<a id="box-8-mc-ex-decomp"></a>

!!! esempio "Esempio 6.2: dal flusso più costoso al flusso ottimo"

    Confrontiamo $\vet{x}^0$ dell'<span style="color:#1971c2">[Esempio 6.1](la-rete-residua-con-i-costi.md#box-4-mc-ex-residual)</span>, di costo $80$, con il flusso ottimo $\tilde{\vet{x}}=(2,3,4,0,3,0,2,1,2)$ del Capitolo 4, di costo $60$. La differenza è

    $$
    \tilde{\vet{x}}-\vet{x}^0=(1,\,-1,\,0,\,-1,\,-1,\,-1,\,-1,\,-2,\,1),
    $$

    quindi $\vet{y}$ è positivo su otto archi di $G(\vet{x}^0)$: gli archi in avanti $(1,2)$ e $(5,6)$, con $y=1$, e gli archi all'indietro

    $$
    y_{31}=1, \qquad y_{23}=1, \qquad y_{53}=1, \qquad y_{34}=1, \qquad y_{64}=1, \qquad y_{45}=2 .
    $$

    Seguiamo la dimostrazione del <span style="color:#1971c2">[Lemma 6.5](#box-6-mc-lem-decomp)</span>, partendo ogni volta dal primo arco con $y>0$ in ordine lessicografico e lasciando ogni nodo lungo il suo arco con $y>0$ di testa più piccola:

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

    Per il <span style="color:#1971c2">[Lemma 6.6](#box-7-mc-lem-diff)</span>, $\vet{c}'\tilde{\vet{x}}-\vet{c}'\vet{x}^0=-2-11-7=-20=60-80$. Tutti e tre i cicli sono negativi, e $W_2$ è il ciclo $4,5,3,4$ dell'<span style="color:#1971c2">[Esempio 6.1](la-rete-residua-con-i-costi.md#box-4-mc-ex-residual)</span>, scritto a partire dal nodo $3$.

!!! chiave ""

    Una circolazione è una somma di multipli positivi di cicli orientati. La differenza di due flussi ammissibili è una circolazione su $G(\vet{x})$: ogni flusso ammissibile si raggiunge da $\vet{x}$ lungo cicli di $G(\vet{x})$, e il costo cambia di $\sum_h \theta_h\, c(W_h)$.

---

**Avanti:** [6.3 Condizioni di ottimalità dei cicli negativi](condizioni-di-ottimalita-dei-cicli-negativi.md)
