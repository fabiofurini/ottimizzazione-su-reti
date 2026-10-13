---
title: "Degenerazione e alberi fortemente fattibili"
---

# 8.7 Degenerazione e alberi fortemente fattibili { #sez-sec-ns-degeneracy }

<div class="info-capitolo" markdown>

**Parte 4 · Il simplesso su reti · Capitolo 8** · [:material-book-open-variant: Capitolo 8: Simplesso su reti](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-simplesso-su-reti.pdf) · [:material-pencil: Esercizi: Simplesso su reti](../../esercizi/network-simplex.md)

</div>

<a id="box-21-ns-def-strong"></a>

!!! definizione "Definizione 8.16: struttura ad albero fortemente ammissibile"

    Sia $(T,L,U)$ una struttura ad albero fattibile con la soluzione ad albero $\vet{x}$ e radice $n$. Per un nodo $i \neq n$, l'albero arco tra $i$ e il nodo successivo del suo percorso verso la radice <strong>punta verso la radice</strong> se $i$ è la sua coda, e <strong>lontano dalla radice</strong> se $i$ è la sua testa. La struttura ad albero è <strong>fortemente fattibile</strong> se

    - ogni arco di albero con $x_{ij}=0$ punta verso la radice e

    - ogni arco di albero con $x_{ij}=u_{ij}$ punta lontano dalla radice.

- Equivalentemente, una quantità positiva di flusso può essere inviata da ogni nodo alla radice lungo il suo percorso ad albero. Un arco puntando verso la radice viene traslato in avanti e necessita di $x_{ij}<u_{ij}$; un arco rivolto in direzione opposta viene percorso all'indietro e necessita di $x_{ij}>0$.

- Una struttura ad albero ammissibile non degenerata è fortemente ammissibile.

- In un pivot degenere il flusso e il costo non cambiano, ma l'albero sì. <span style="color:#1971c2">[Proposizione 8.15](l-algoritmo-del-simplesso-di-rete.md#box-19-ns-prop-finite)</span> non esclude che una sequenza di pivot degeneri ritorni ad una struttura ad albero già soddisfatta: l'algoritmo sarebbe quindi <strong>ciclo</strong>, come l'algoritmo del simplesso di [Capitolo 7 «Condizioni di ottimalità e regole pivot»](https://fabiofurini.github.io/programmazione-lineare/simplesso/07-ottimalita-pivot/).

<a id="box-22-ns-ex-strong"></a>

!!! esempio "Esempio 8.6: le quattro strutture ad albero di $\bar{\vet{x}}$"

    Nel flusso $\bar{\vet{x}}$ di <span style="color:#1971c2">[Esempio 8.2](basi-e-alberi-ricoprenti.md#box-8-ns-ex-tree)</span> gli archi $(1,2)$, $(2,4)$, $(4,6)$, $(5,4)$ sono strettamente tra i loro limiti e collegano tutti i nodi tranne $3$. Uno albero ricoprente che li contiene aggiunge un arco alla volta incidente legato al nodo $3$ e ogni scelta fornisce una struttura ad albero con la stessa soluzione ad albero $\bar{\vet{x}}$:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>aggiunti arco, flusso e percorso da <span class="arithmatex">\(3\)</span> alla radice e fortemente ammissibile</th>
    </tr>
    <tr>
    <td><span class="arithmatex">\((3,2)\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(3,2,4,6\)</span>: l'arco punta verso la radice e sì</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\((1,3)\)</span></td>
    <td><span class="arithmatex">\(4=u_{13}\)</span></td>
    <td><span class="arithmatex">\(3,1,2,4,6\)</span>: l'arco punta lontano dalla radice e sì</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\((3,5)\)</span></td>
    <td><span class="arithmatex">\(4=u_{35}\)</span></td>
    <td><span class="arithmatex">\(3,5,4,6\)</span>: l'arco punta verso la radice e no</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\((4,3)\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(3,4,6\)</span>: l'arco punta lontano dalla radice e no</td>
    </tr>
    </table></div>

    Con $(3,5)$ nell'albero, nessun flusso può lasciare il nodo $3$ verso la radice, perché $(3,5)$ è saturo; con $(4,3)$, n il flusso può raggiungere $4$ da $3$, perché $(4,3)$ è vuoto. Il perno di <span style="color:#1971c2">[Esempio 8.4](il-perno.md#box-18-ns-ex-pivot)</span> va dal primo struttura al secondo.

<a id="box-23-ns-lem-degenerate"></a>

!!! teorema "Lemma 8.17: pivot degenerati"

    Sia $(T,L,U)$ fortemente ammissibile, e sia $C$ il ciclo di un pivot, percorso dall'apice $w$: il percorso dell'albero $P$ da $w$ a $p$, l'arco $e$, il percorso dell'albero $Q$ da $q$ a $w$. Quindi ogni arco di $Q$ e l'arco $e$ hanno positivo capacità residua. In particolare, se $\theta=0$, tutti gli archi di blocco giacciono su $P$.

??? dimostrazione "Dimostrazione"

    La capacità residua di $e$ è $u_{kl}>0$: è $u_{kl}-0$ se $e \in L$ e $x_{kl}=u_{kl}$ se $e \in U$. L'apice $w$ si trova sul percorso dell'albero da $q$ alla radice, quindi $Q$ è la prima parte di questo percorso, percorsa verso la radice. Di forte fattibilità una quantità positiva di flusso può essere inviata da $q$ alla radice lungo di esso: ogni arco di $Q$ ha positivo capacità residua in direzione di $C$. <span class="qed">□</span>

<a id="box-24-ns-th-strong"></a>

!!! teorema "Teorema 8.18: la regola dell'arco uscente mantiene una forte fattibilità"

    Se $(T,L,U)$ è fortemente ammissibile e $\theta<+\infty$, la struttura ad albero ottenuta dal pivot, con l'arco uscente di <span style="color:#1971c2">[Definizione 8.11](il-perno.md#box-14-ns-def-pivot)</span>, è fortemente fattibile.

??? dimostrazione "Dimostrazione"

    Lascia che $C$ visiti $w=v_0,v_1,\dots,v_r=w$ nella sua direzione, con $f$ tra $v_s$ e $v_{s+1}$, e lascia che $\vet{x}'$ sia il nuovo flusso. Supponiamo che $i$ sia un nodo e $y$ il primo nodo di $C$ nel percorso ad albero fino alla radice in $T$.

    1. <em>Il nuovo percorso.</em> Se il percorso di $i$ non soddisfa $C$, è lo stesso in $T'$. Altrimenti il percorso di $i$ in $T'$ va da $i$ a $y$ come in $T$, poi da $y$ a $w$ all'interno di $C \setminus \{f\}$, quindi da $w$ alla radice come in $T$. Le due parti esterne non utilizzano alcun arco di $C$, quindi i loro flussi non cambiano e portano ancora flusso positivo verso il radice.

    2. <em>La parte all'interno di $C$.</em> Se $y=v_t$ con $t \le s$, il percorso va $v_t,v_{t-1},\dots,v_0=w$, contro il direzione di $C$. Se $t \ge s+1$, va $v_t,v_{t+1},\dots,v_r=w$, nella direzione di $C$.

    3. <em>Caso $\theta>0$.</em> Rispetto a $C$, la capacità residua di ogni arco aumenta di $\theta>0$. In direzione di $C$, gli archi dopo $f$ non sono bloccanti, perché $f$ è l'ultimo arco bloccante: la loro capacità residua è maggiore di $\theta$ e rimane positivo.

    4. <em>Caso $\theta=0$.</em> Il flusso non cambia, e $f$ giace su $P$ di <span style="color:#1971c2">[Lemma 8.17](#box-23-ns-lem-degenerate)</span>. Per $t \le s$, il percorso da $v_t$ a $w$ sale fino a $P$: fa parte del percorso ad albero di $v_t$ in $T$, che porta flusso positivo verso la radice. Per $t \ge s+1$, gli archi di $P$ dopo $f$ non sono bloccanti e $e$ e gli archi di $Q$ hanno capacità residua positiva per lo stesso lemma.

    In tutti i casi ogni nodo può inviare una quantità positiva di flusso alla radice in $T'$. <span class="qed">□</span>

<a id="box-25-ns-th-finite"></a>

!!! teorema "Teorema 8.19: finitezza dell'algoritmo del simplesso di rete"

    Se la struttura ad albero iniziale è fortemente ammissibile e ogni perno utilizza l'arco uscente di <span style="color:#1971c2">[Definizione 8.11](il-perno.md#box-14-ns-def-pivot)</span>, allora ogni struttura ad albero incontrata è fortemente ammissibile, nessuna struttura ad albero è si incontrano due volte e l'algoritmo si ferma dopo un numero finito di pivot. Ciò vale per qualunque regola che scelga l'entrata arco tra gli archi idonei.

??? dimostrazione "Dimostrazione"

    L'ammissibilità forte segue per induzione da <span style="color:#1971c2">[Teorema 8.18](#box-24-ns-th-strong)</span>.

    1. Un pivot con $\theta>0$ diminuisce il costo (<span style="color:#1971c2">[Proposizione 8.12](il-perno.md#box-15-ns-prop-pivot)</span>).

    2. In un pivot degenere, $f$ giace su $P$ (<span style="color:#1971c2">[Lemma 8.17](#box-23-ns-lem-degenerate)</span>), quindi il percorso da $p$ al root passa attraverso $f$ e $p \in S$. Se $e \in L$, allora $p=k$ e i potenziali di $S$ cambiano di $\bar{c}_{kl}<0$; se $e \in U$, allora $p=l$ e cambiano con $-\bar{c}_{kl}<0$ (<span style="color:#1971c2">[Proposizione 8.13](il-perno.md#box-16-ns-prop-update)</span>). Quindi $\sum_{i \in N}\pi_i$ diminuisce rigorosamente, mentre il costo non cambia.

    3. Una struttura ad albero determina il suo costo e le sue potenziali. Ad ogni pivot la coppia $\big(\vet{c}'\vet{x},\, \sum_{i \in N}\pi_i\big)$ diminuisce rigorosamente in ordine lessicografo, quindi nessuna struttura ad albero viene soddisfatta due volte; ci sono infinitamente molti di loro. <span class="qed">□</span>

- La dimostrazione utilizza la regola in due punti: in un perno degenere l'arco uscente si trova tra l'apice e $p$, e il nuovo albero è fortemente fattibile. Una scelta diversa tra gli archi di blocco può produrre una struttura ad albero che non lo è fortemente fattibile.

- Il teorema necessita di una struttura ad albero iniziale fortemente ammissibile: quando non se ne conosce alcuna, si costruisce con un albero ausiliario rete.

!!! chiave ""

    In un albero fortemente ammissibile ogni nodo può spingere il flusso alla radice. Scegliere come arco di uscita l'ultimo arco di blocco da cui partire l'apice mantiene questa proprietà; quindi un perno degenere abbassa i potenziali di un sottoalbero e nessuna struttura ad albero ripete: l'algoritmo non può ciclare.

---

**Avanti:** [8.8 Un esempio capacitato con un perno degenere](un-esempio-capacitato-con-un-perno-degenere.md)
