---
title: "Degenerazione e alberi fortemente ammissibili"
---

# 8.7 Degenerazione e alberi fortemente ammissibili { #sez-sec-ns-degeneracy }

<div class="info-capitolo" markdown>

**Parte 4 · Il simplesso su reti · Capitolo 8** · [:material-book-open-variant: Capitolo 8: Simplesso su reti](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-simplesso-su-reti.pdf) · [:material-presentation: Slide](../../pdf/slide-network-simplex.pdf) · [:material-pencil: Esercizi: Simplesso su reti](../../esercizi/network-simplex.md) · [:material-gesture-tap: App: Il simplesso su reti, pivot per pivot](../../laboratorio/simplesso-su-reti.md)

</div>

<a id="box-21-ns-def-strong"></a>

!!! definizione "Definizione 8.16: struttura ad albero fortemente ammissibile"

    Sia $(T,L,U)$ una struttura ad albero ammissibile con soluzione ad albero $\vet{x}$ e radice $n$. Per un nodo $i \neq n$, l'arco dell'albero tra $i$ e il nodo successivo del suo cammino verso la radice <strong>punta verso la radice</strong> se $i$ è la sua coda, e <strong>in senso opposto alla radice</strong> se $i$ è la sua testa. La struttura ad albero è <strong>fortemente ammissibile</strong> se

    - ogni arco dell'albero con $x_{ij}=0$ punta verso la radice, e

    - ogni arco dell'albero con $x_{ij}=u_{ij}$ punta in senso opposto alla radice.

- Equivalentemente, da ogni nodo si può inviare una quantità positiva di flusso alla radice lungo il suo cammino nell'albero. Un arco che punta verso la radice è percorso in avanti e richiede $x_{ij}<u_{ij}$; un arco che punta in senso opposto è percorso all'indietro e richiede $x_{ij}>0$.

- Una struttura ad albero ammissibile non degenere è fortemente ammissibile.

- In un pivot degenere il flusso e il costo non cambiano, ma l'albero sì. La <span style="color:#1971c2">[Proposizione 8.15](l-algoritmo-del-simplesso-su-reti.md#box-19-ns-prop-finite)</span> non esclude che una sequenza di pivot degeneri torni a una struttura ad albero già incontrata: l'algoritmo andrebbe allora in <strong>ciclo</strong>, come l'algoritmo del simplesso del [Capitolo 7 «Condizioni di ottimalità e regole di pivot»](https://fabiofurini.github.io/programmazione-lineare/simplesso/07-ottimalita-pivot/).

<a id="box-22-ns-ex-strong"></a>

!!! esempio "Esempio 8.6: le quattro strutture ad albero di $\bar{\vet{x}}$"

    Nel flusso $\bar{\vet{x}}$ dell'<span style="color:#1971c2">[Esempio 8.2](basi-e-alberi-ricoprenti.md#box-8-ns-ex-tree)</span> gli archi $(1,2)$, $(2,4)$, $(4,6)$, $(5,4)$ sono strettamente compresi tra i loro limiti, e collegano tutti i nodi tranne il $3$. Un albero ricoprente che li contiene aggiunge un arco a un limite incidente nel nodo $3$, e ogni scelta dà una struttura ad albero con la stessa soluzione ad albero $\bar{\vet{x}}$:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>arco aggiunto</th>
    <th>flusso</th>
    <th>cammino da <span class="arithmatex">\(3\)</span> alla radice</th>
    <th>fortemente ammissibile</th>
    </tr>
    <tr>
    <td><span class="arithmatex">\((3,2)\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(3,2,4,6\)</span>: l'arco punta verso la radice</td>
    <td>sì</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\((1,3)\)</span></td>
    <td><span class="arithmatex">\(4=u_{13}\)</span></td>
    <td><span class="arithmatex">\(3,1,2,4,6\)</span>: l'arco punta in senso opposto alla radice</td>
    <td>sì</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\((3,5)\)</span></td>
    <td><span class="arithmatex">\(4=u_{35}\)</span></td>
    <td><span class="arithmatex">\(3,5,4,6\)</span>: l'arco punta verso la radice</td>
    <td>no</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\((4,3)\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(3,4,6\)</span>: l'arco punta in senso opposto alla radice</td>
    <td>no</td>
    </tr>
    </table></div>

    Con $(3,5)$ nell'albero nessun flusso può lasciare il nodo $3$ verso la radice, perché $(3,5)$ è saturo; con $(4,3)$ nessun flusso può raggiungere $4$ da $3$, perché $(4,3)$ è vuoto. Il pivot dell'<span style="color:#1971c2">[Esempio 8.4](il-pivot.md#box-18-ns-ex-pivot)</span> passa dalla prima struttura alla seconda.

<a id="box-23-ns-lem-degenerate"></a>

!!! teorema "Lemma 8.17: pivot degeneri"

    Sia $(T,L,U)$ fortemente ammissibile, e sia $C$ il ciclo di un pivot, percorso a partire dall'apice $w$: il cammino nell'albero $P$ da $w$ a $p$, l'arco $e$, il cammino nell'albero $Q$ da $q$ a $w$. Allora ogni arco di $Q$ e l'arco $e$ hanno capacità residua positiva. In particolare, se $\theta=0$, tutti gli archi bloccanti stanno su $P$.

??? dimostrazione "Dimostrazione"

    La capacità residua di $e$ è $u_{kl}>0$: vale $u_{kl}-0$ se $e \in L$ e $x_{kl}=u_{kl}$ se $e \in U$. L'apice $w$ sta sul cammino nell'albero da $q$ alla radice, quindi $Q$ è la prima parte di questo cammino, percorsa verso la radice. Per la forte ammissibilità da $q$ si può inviare lungo di esso una quantità positiva di flusso alla radice: ogni arco di $Q$ ha capacità residua positiva nella direzione di $C$. <span class="qed">□</span>

<a id="box-24-ns-th-strong"></a>

!!! teorema "Teorema 8.18: la regola dell'arco uscente mantiene la forte ammissibilità"

    Se $(T,L,U)$ è fortemente ammissibile e $\theta<+\infty$, la struttura ad albero ottenuta dal pivot, con l'arco uscente della <span style="color:#1971c2">[Definizione 8.11](il-pivot.md#box-14-ns-def-pivot)</span>, è fortemente ammissibile.

??? dimostrazione "Dimostrazione"

    Sia $C$ il ciclo che visita $w=v_0,v_1,\dots,v_r=w$ nella sua direzione, con $f$ tra $v_s$ e $v_{s+1}$, e sia $\vet{x}'$ il nuovo flusso. Siano $i$ un nodo e $y$ il primo nodo di $C$ sul suo cammino nell'albero verso la radice in $T$.

    1. <em>Il nuovo cammino.</em> Se il cammino di $i$ non incontra $C$, è lo stesso in $T'$. Altrimenti il cammino di $i$ in $T'$ va da $i$ a $y$ come in $T$, poi da $y$ a $w$ dentro $C \setminus \{f\}$, poi da $w$ alla radice come in $T$. Le due parti esterne non usano archi di $C$, quindi i loro flussi non cambiano e portano ancora flusso positivo verso la radice.

    2. <em>La parte dentro $C$.</em> Se $y=v_t$ con $t \le s$, il cammino va $v_t,v_{t-1},\dots,v_0=w$, contro la direzione di $C$. Se $t \ge s+1$, va $v_t,v_{t+1},\dots,v_r=w$, nella direzione di $C$.

    3. <em>Caso $\theta>0$.</em> Contro la direzione di $C$, la capacità residua di ogni arco aumenta di $\theta>0$. Nella direzione di $C$, gli archi dopo $f$ non sono bloccanti, perché $f$ è l'ultimo arco bloccante: la loro capacità residua era maggiore di $\theta$, e resta positiva.

    4. <em>Caso $\theta=0$.</em> Il flusso non cambia, e $f$ sta su $P$ per il <span style="color:#1971c2">[Lemma 8.17](#box-23-ns-lem-degenerate)</span>. Per $t \le s$, il cammino da $v_t$ a $w$ risale $P$: fa parte del cammino nell'albero di $v_t$ in $T$, che porta flusso positivo verso la radice. Per $t \ge s+1$, gli archi di $P$ dopo $f$ non sono bloccanti, ed $e$ e gli archi di $Q$ hanno capacità residua positiva per lo stesso lemma.

    In tutti i casi da ogni nodo si può inviare una quantità positiva di flusso alla radice in $T'$. <span class="qed">□</span>

<a id="box-25-ns-th-finite"></a>

!!! teorema "Teorema 8.19: finitezza dell'algoritmo del simplesso su reti"

    Se la struttura ad albero iniziale è fortemente ammissibile e ogni pivot usa l'arco uscente della <span style="color:#1971c2">[Definizione 8.11](il-pivot.md#box-14-ns-def-pivot)</span>, allora ogni struttura ad albero incontrata è fortemente ammissibile, nessuna struttura ad albero si ripete e l'algoritmo si ferma dopo un numero finito di pivot. Questo vale per qualunque regola che scelga l'arco entrante tra gli archi ammissibili per l'ingresso.

??? dimostrazione "Dimostrazione"

    La forte ammissibilità segue per induzione dal <span style="color:#1971c2">[Teorema 8.18](#box-24-ns-th-strong)</span>.

    1. Un pivot con $\theta>0$ riduce il costo (<span style="color:#1971c2">[Proposizione 8.12](il-pivot.md#box-15-ns-prop-pivot)</span>).

    2. In un pivot degenere, $f$ sta su $P$ (<span style="color:#1971c2">[Lemma 8.17](#box-23-ns-lem-degenerate)</span>), quindi il cammino da $p$ alla radice passa per $f$, e $p \in S$. Se $e \in L$, allora $p=k$ e i potenziali di $S$ cambiano di $\bar{c}_{kl}<0$; se $e \in U$, allora $p=l$ e cambiano di $-\bar{c}_{kl}<0$ (<span style="color:#1971c2">[Proposizione 8.13](il-pivot.md#box-16-ns-prop-update)</span>). Quindi $\sum_{i \in N}\pi_i$ diminuisce strettamente, mentre il costo non cambia.

    3. Una struttura ad albero determina il suo costo e i suoi potenziali. A ogni pivot la coppia $\big(\vet{c}'\vet{x},\, \sum_{i \in N}\pi_i\big)$ diminuisce strettamente in ordine lessicografico, quindi nessuna struttura ad albero si ripete; le strutture ad albero sono in numero finito. <span class="qed">□</span>

- La dimostrazione usa la regola in due punti: in un pivot degenere l'arco uscente sta tra l'apice e $p$, e il nuovo albero è fortemente ammissibile. Una scelta diversa tra gli archi bloccanti può produrre una struttura ad albero che non è fortemente ammissibile.

- Il teorema richiede una struttura ad albero iniziale fortemente ammissibile: quando non se ne conosce una, la si costruisce con una rete ausiliaria.

!!! chiave ""

    In un albero fortemente ammissibile da ogni nodo si può spingere flusso verso la radice. Scegliere come arco uscente l'ultimo arco bloccante a partire dall'apice mantiene questa proprietà; allora un pivot degenere abbassa i potenziali di un sottoalbero, e nessuna struttura ad albero si ripete: l'algoritmo non può ciclare.

---

**Avanti:** [8.8 Un esempio con capacità e un pivot degenere](un-esempio-con-capacita-e-un-pivot-degenere.md)
