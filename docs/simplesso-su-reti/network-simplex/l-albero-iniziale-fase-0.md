---
title: "L'albero iniziale: Fase 0"
---

# 8.9 L'albero iniziale: Fase 0

<div class="info-capitolo" markdown>

**Parte 4 · Il simplesso su reti · Capitolo 8** · [:material-book-open-variant: Capitolo 8: Simplesso su reti](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-simplesso-su-reti.pdf) · [:material-pencil: Esercizi: Simplesso su reti](../../esercizi/network-simplex.md)

</div>

<a id="sez-sec-ns-phase0"></a>
<a id="box-27-ns-def-auxiliary"></a>

!!! definizione "Definizione 8.20: rete ausiliaria"

    Sia $G=(N,A)$ una rete con $\sum_{i \in N}b_i=0$. La <strong>rete ausiliaria</strong> $G^0$ aggiunge a $G$ il <strong>nodo artificiale</strong> $r=n+1$, con $b_r=0$ e un <strong>arco artificiale</strong> per ogni nodo $i \in N$:

    $$
    (i,r) \ \text{ se } b_i \ge 0, \qquad\qquad (r,i) \ \text{ se } b_i<0,
    $$

    con capacità $+\infty$. I costi della Fase 0 sono $c^0_{ij}=1$ sugli archi artificiali e $c^0_{ij}=0$ sugli archi di $A$. <strong>Fase 0</strong> applica l'algoritmo del simplesso su reti a $G^0$ con i costi $c^0_{ij}$, partendo dall'albero degli archi artificiali, con $L=A$ e $U=\emptyset$; la radice è l'ultimo nodo, $r$.

- Il valore della Fase 0 è il flusso totale sugli archi artificiali: misura quanto il flusso è lontano dall'essere un flusso di $G$. Questo è il problema ausiliario di [Capitolo 8 «Fase 0 del simplesso»](https://fabiofurini.github.io/programmazione-lineare/simplesso/08-fase-zero/), scritto sulla rete.

<a id="box-28-ns-prop-initial"></a>

!!! teorema "Proposizione 8.21: l'albero iniziale della Fase 0"

    Gli archi artificiali formano un albero di copertura di $G^0$. La sua soluzione ad albero ha $x_{ir}=b_i$ se $b_i \ge 0$, $x_{ri}=-b_i$ se $b_i<0$ e $x_{ij}=0$ su $A$; il suo costo è $\sum_{i \in N}|b_i|$ e la struttura ad albero è fortemente ammissibile.

??? dimostrazione "Dimostrazione"

    Gli archi artificiali $n$ uniscono ogni nodo di $N$ a $r$: formano un grafo connesso con i nodi $n+1$ e gli archi $n$, un albero di copertura.

    - In un nodo $i \in N$ l'unico arco con flusso è il suo arco artificiale, quindi vale la conservazione. A $r$ il deflusso meno l'afflusso è $\sum_{i:\,b_i<0}(-b_i)-\sum_{i:\,b_i \ge 0}b_i=-\sum_{i \in N}b_i=0=b_r$.

    - Gli archi dell'albero con flusso zero sono gli archi $(i,r)$ con $b_i=0$: la loro coda è $i$, quindi puntano verso la radice. Nessun arco di albero raggiunge la sua capacità, ovvero $+\infty$.

    <p class="qed-riga"><span class="qed">□</span></p>

<a id="box-29-ns-th-phase0"></a>

!!! teorema "Teorema 8.22: Fase 0"

    La fase 0 si ferma dopo un numero finito di pivot con un valore ottimale $z_0 \ge 0$. La rete $G$ ha un flusso fattibile se e solo se $z_0=0$, e in tal caso il flusso finale della Fase 0, limitato a $A$, è un flusso fattibile di $G$.

??? dimostrazione "Dimostrazione"

    Tutte le capacità di $G^0$ sono positive e la struttura ad albero iniziale è fortemente ammissibile (<span style="color:#1971c2">[Proposizione 8.21](#box-28-ns-prop-initial)</span>), quindi la Fase 0 si interrompe con <span style="color:#1971c2">[Teorema 8.19](degenerazione-e-alberi-fortemente-fattibili.md#box-25-ns-th-finite)</span>.

    1. Non può fermarsi al passo 3: i costi $c^0_{ij}$ sono non negativi, quindi nessun ciclo ha costi negativi (<span style="color:#1971c2">[Proposizione 8.14](il-perno.md#box-17-ns-prop-unbounded)</span>). Si ferma al passo 1 con un flusso ottimale, di valore $z_0 \ge 0$.

    2. Se $G$ ha un flusso ammissibile, lo stesso flusso con zero sugli archi artificiali è ammissibile per $G^0$ con costo $0$, quindi $z_0=0$.

    3. Se $z_0=0$, ogni arco artificiale porta flusso nullo, quindi i vincoli di conservazione dei nodi di $N$ comportano solo archi di $A$: la restrizione a $A$ è un flusso ammissibile di $G$. <span class="qed">□</span>

- Quando $z_0=0$, l'albero finale della Fase 0 contiene ancora archi artificiali, necessari per collegare la radice $r$ agli altri nodi. La proposizione seguente mostra come proseguire a partire da questo albero.

<a id="box-30-ns-prop-after"></a>

!!! teorema "Proposizione 8.23: dalla Fase 0 al simplesso su reti"

    Supponiamo che la Fase 0 termini con $z_0=0$, flusso $\tilde{\vet{x}}^0$, struttura ad albero $(T,L,U)$ e costi ridotti $\bar{c}^0_{ij}$. Applichiamo a $G^0$ l'algoritmo del simplesso su reti a partire da $(T,L,U)$, assegnando i costi $c_{ij}$ agli archi di $A$ e costo $0$ agli archi artificiali. Facciamo entrare soltanto archi con $\bar{c}^0_{ij}=0$. Ogni flusso visitato assegna valore zero agli archi artificiali e l'algoritmo termina con un flusso ottimale di $G$, oppure dimostra che il modello $\mathrm{MCF}$ è illimitato.

??? dimostrazione "Dimostrazione"

    Chiamiamo <em>fissati</em> gli archi con $\bar{c}^0_{ij} \neq 0$. Sono fuori base e, per l'ottimalità della Fase 0, quelli con $\bar{c}^0_{ij}>0$ appartengono a $L$ e hanno flusso $0$, mentre quelli con $\bar{c}^0_{ij}<0$ appartengono a $U$ e hanno flusso $u_{ij}$.

    1. <em>Identità chiave.</em> Sia $\vet{y}$ un flusso ammissibile di $G^0$. Per il [Lemma «Costo e costo ridotto» del Capitolo 4](../../flussi/network-flow-models/il-modello-duale-e-i-costi-ridotti.md) e poiché il costo di $\tilde{\vet{x}}^0$ è $z_0=0$,

        $$
        \sum_{a}c^0_ay_a=\sum_{a}\bar{c}^0_a\,(y_a-\tilde{x}^0_a) .
        $$

        Ogni termine è $\bar{c}^0_ay_a \ge 0$ sugli archi congelati di $L$, $\bar{c}^0_a(y_a-u_a) \ge 0$ sugli archi congelati di $U$, e $0$ altrove.

    2. <em>Nessun flusso artificiale.</em> Gli archi fissati non entrano mai nell'albero, quindi mantengono i propri valori in ogni soluzione visitata. Ogni termine nell'identità è nullo; di conseguenza il flusso artificiale totale $\sum_a c^0_a y_a$ è zero e ciascun arco artificiale trasporta flusso nullo.

    3. <em>I flussi ammissibili di $G$ rispettano i valori fissati.</em> Sia $\vet{y}$ un flusso ammissibile di $G$, esteso con valore zero sugli archi artificiali. Poiché $\sum_a c^0_a y_a=0$, ogni termine dell'identità è nullo: quindi $y_a=0$ sugli archi fissati in $L$ e $y_a=u_a$ su quelli fissati in $U$.

    4. <em>Ottimalità.</em> Supponiamo che l'algoritmo termini con il flusso $\vet{x}$ e i potenziali $\vet{\pi}$. Come nel <span style="color:#1971c2">[Teorema 8.10](potenziali-e-ottimalita.md#box-12-ns-th-optimality)</span>, vale

        $$
        \vet{c}'\vet{y}-\vet{c}'\vet{x}=\sum_{a}\bar{c}_a(y_a-x_a).
        $$

        Gli archi fissati e quelli dell'albero contribuiscono zero; per gli altri archi in $L$ e $U$, le condizioni di arresto rendono ogni termine non negativo. Quindi $\vet{c}'\vet{y} \ge \vet{c}'\vet{x}$.

    5. <em>Illimitatezza.</em> Se l'algoritmo termina al Passaggio 3, i flussi

        $$
        \vet{x}+t\vet{x}^C,\qquad t\ge 0,
        $$

        della <span style="color:#1971c2">[Proposizione 8.14](il-perno.md#box-17-ns-prop-unbounded)</span> mantengono invariati i valori sugli archi fissati. Per l'identità del punto 1 hanno flusso nullo sugli archi artificiali; sono quindi flussi ammissibili di $G$ e il loro costo tende a $-\infty$.

    Le strutture incontrate rimangono fortemente ammissibili e l'algoritmo si ferma per <span style="color:#1971c2">[Teorema 8.19](degenerazione-e-alberi-fortemente-fattibili.md#box-25-ns-th-finite)</span>. <span class="qed">□</span>

<a id="box-31-ns-ex-phase0"></a>

!!! esempio "Esempio 8.8: Fase 0 sulla rete di riferimento"

    Per la rete di riferimento con capacità, la rete ausiliaria aggiunge il nodo artificiale $7$ e gli archi artificiali $(1,7)$, $(2,7)$, $(3,7)$, $(5,7)$ per i nodi con $b_i\ge 0$, e $(7,4)$, $(7,6)$ per quelli con $b_i<0$. L'albero iniziale (in blu) trasporta rispettivamente $5$, $2$, $0$, $0$, $3$ e $4$ unità su questi archi. Gli archi di $A$ sono inizialmente vuoti e non sono disegnati; il valore iniziale è $z_0=14$. I potenziali iniziali valgono $\pi_i=1$ per i nodi collegati a $7$ da un arco $(i,7)$ e $\pi_i=-1$ per quelli collegati da un arco $(7,i)$.

    ![Figura 8](../../img/network-simplex/fig08.svg){ .fig loading=lazy  }

    La Fase 0 esegue sei pivot: ogni arco entrante ha $\bar{c}^0_{ij}=-2$ e l’apice del ciclo è sempre la radice $7$.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>pivot</th>
    <th>arco entrante</th>
    <th><span class="arithmatex">\(\bar{c}^0_{ij}\)</span></th>
    <th>apice</th>
    <th><span class="arithmatex">\(\theta\)</span></th>
    <th>archi bloccanti</th>
    <th>arco uscente</th>
    <th><span class="arithmatex">\(z_0\)</span> dopo</th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\((2,4)\)</span></td>
    <td><span class="arithmatex">\(-2\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\((2,7)\)</span></td>
    <td><span class="arithmatex">\((2,7)\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\((1,2)\)</span></td>
    <td><span class="arithmatex">\(-2\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\((7,4)\)</span></td>
    <td><span class="arithmatex">\((7,4)\)</span></td>
    <td><span class="arithmatex">\(8\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\((4,6)\)</span></td>
    <td><span class="arithmatex">\(-2\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\((2,4)\)</span></td>
    <td><span class="arithmatex">\((2,4)\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\((5,4)\)</span></td>
    <td><span class="arithmatex">\(-2\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\((5,7)\)</span></td>
    <td><span class="arithmatex">\((5,7)\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\((3,5)\)</span></td>
    <td><span class="arithmatex">\(-2\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\((3,7)\)</span></td>
    <td><span class="arithmatex">\((3,7)\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\((1,3)\)</span></td>
    <td><span class="arithmatex">\(-2\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\((1,7)\)</span>, <span class="arithmatex">\((5,4)\)</span>, <span class="arithmatex">\((7,6)\)</span></td>
    <td><span class="arithmatex">\((7,6)\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    </tr>
    </table></div>

    - I pivot $4$ e $5$ sono degeneri. Al pivot $3$, l'arco $(2,4)$ raggiunge la capacità e passa all'insieme $U$.

    - Al pivot $6$, il ciclo è $7,1,3,5,4,6,7$ e ha tre archi bloccanti. La regola sceglie $(7,6)$, l'ultimo arco bloccante incontrato percorrendo il ciclo dall'apice. Se uscisse $(1,7)$, l'albero conterrebbe l'arco saturo $(5,4)$ diretto verso la radice e l'arco vuoto $(7,6)$ diretto in senso opposto; se uscisse $(5,4)$, $(7,6)$ resterebbe vuoto e diretto lontano dalla radice. In entrambi i casi la nuova struttura perderebbe la forte ammissibilità.

    - La Fase 0 termina con $z_0=0$, albero formato dagli archi $(1,2)$, $(1,3)$, $(1,7)$, $(3,5)$, $(4,6)$, $(5,4)$, e $U=\{(2,4)\}$. Tutti i potenziali dei nodi di $N$ valgono $1$: i costi ridotti della Fase 0 sono nulli su ogni arco, tranne $(7,4)$ e $(7,6)$, per i quali valgono $2$. Questi due archi restano fissati.

    Con i costi $c_{ij}$ la soluzione ad albero costa $74$. Gli archi $(7,4)$ e $(7,6)$ hanno costi ridotti $-10$ e $-15$, ma sono congelati: l'unico arco che può entrare è $(5,6)$, con $\bar{c}_{56}=-7$. La sua capacità residua $u_{56}=2$ è il più piccolo lungo il suo ciclo, quindi $(5,6)$ stesso è l'arco uscente e si sposta su $U$ e il costo diventa $74-2 \cdot 7=60$: l'ottimo di <span style="color:#1971c2">[Esempio 8.7](un-esempio-capacitato-con-un-perno-degenere.md#box-26-ns-ex-b)</span>. Se $(7,6)$ potesse entrare, le unità $3$ viaggerebbero da $1$ a $6$ attraverso il nodo artificiale, al costo $29$: non un flusso di $G$.

!!! chiave ""

    La fase 0 parte dalla stella fortemente ammissibile degli archi artificiali e minimizza il flusso artificiale: $z_0>0$ dimostra che non esiste alcun flusso fattibile. Se $z_0=0$, il simplesso su reti continua dall'albero finale, con i costi originali, e possono entrare solo gli archi con costo ridotto pari a zero in Fase 0.

## 8.10 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Considerare di base gli archi con flusso positivo.</strong> La base è l'albero $T$: un arco in $U$ può avere flusso positivo pur essendo fuori base; un arco dell'albero può invece avere flusso $0$ oppure $u_{ij}$.

    - <strong>Utilizzo del test del segno di una massimizzazione.</strong> Nel modello $\mathrm{MCF}$, una minimizzazione, un arco di $L$ è idoneo se $\bar{c}_{ij}<0$ e un arco di $U$ se $\bar{c}_{ij}>0$.

    - <strong>Orientare il ciclo come arco entrante quando è in $U$.</strong> Il suo flusso deve diminuire, quindi il ciclo va contro di esso e l'arco entrante è all'indietro.

    - <strong>Dimenticare l'arco entrante nel test del rapporto.</strong> La sua capacità residua è $u_{kl}$; se è l'unico arco bloccante, l'albero non cambia e l'arco passa da $L$ a $U$ o viceversa.

    - <strong>Aggiornamento di tutti i potenziali.</strong> Cambiano solo i potenziali del sottoalbero tagliato dall'arco uscente, tutti per $\bar{c}_{kl}$ o $-\bar{c}_{kl}$.

    - <strong>Scegliere un arco bloccante qualsiasi.</strong> Selezionare l'ultimo arco bloccante incontrato dall'apice preserva la forte ammissibilità dell'albero; una scelta diversa può far perdere questa proprietà e la garanzia di terminazione.

    - <strong>Far entrare archi fissati dopo la Fase 0.</strong> Un arco con $\bar{c}^0_{ij} \neq 0$ può reintrodurre flusso sugli archi artificiali. Possono entrare soltanto gli archi con $\bar{c}^0_{ij}=0$.

## 8.11 In sintesi

!!! chiave "In sintesi"

    - In una rete connessa l'equazione del nodo $n$ è ridondante; le basi del modello $\mathrm{MCF}$ corrispondono agli alberi ricoprenti e le relative matrici hanno determinante $\pm 1$.

    - Una struttura ad albero $(T,L,U)$ assegna agli archi fuori dall'albero il valore $0$ oppure la capacità. La soluzione sugli archi dell'albero si calcola eliminando le foglie; i potenziali si calcolano a partire dalla radice, ponendo $\pi_n=0$.

    - Il costo ridotto di un arco non basico è il costo del suo ciclo fondamentale; $\bar{c} \ge 0$ su $L$ e $\bar{c} \le 0$ su $U$ certificano l'ottimalità.

    - Un pivot invia $\theta$ unità lungo il ciclo fondamentale dell'arco entrante e riduce il costo di $\theta|\bar{c}_{kl}|$. L'arco uscente è l'ultimo arco bloccante incontrato dall'apice; cambiano soltanto i potenziali dei nodi di un sottoalbero.

    - La forte ammissibilità degli alberi e la regola per scegliere l'arco uscente evitano il ciclaggio. La Fase 0 sulla rete ausiliaria trova un albero iniziale fortemente ammissibile oppure dimostra che non esiste un flusso ammissibile.

    <strong>La rete di riferimento in sintesi.</strong>

    <div class="tabella" markdown="0"><table>
    <tr>
    <td>senza capacità e costi <span class="arithmatex">\(80\)</span>, <span class="arithmatex">\(52\)</span>, <span class="arithmatex">\(49\)</span>; albero ottimale <span class="arithmatex">\((1,2),(1,3),(2,4),(3,5),(5,6)\)</span></td>
    </tr>
    <tr>
    <td>con capacità, da <span class="arithmatex">\(\bar{\vet{x}}\)</span> e costi <span class="arithmatex">\(63\)</span>, <span class="arithmatex">\(63\)</span> (degenerato), <span class="arithmatex">\(60\)</span>; <span class="arithmatex">\(U=\{(2,4),(5,6)\}\)</span></td>
    </tr>
    <tr>
    <td>potenziali ottimali (<span class="arithmatex">\(\pi_6=0\)</span>) e <span class="arithmatex">\((8,6,6,1,3,0)\)</span> senza capacità, <span class="arithmatex">\((15,13,13,5,10,0)\)</span> con</td>
    </tr>
    <tr>
    <td>Fase 0</td>
    <td><span class="arithmatex">\(z_0\)</span> da <span class="arithmatex">\(14\)</span> a <span class="arithmatex">\(0\)</span> in sei perni, poi un perno da <span class="arithmatex">\(74\)</span> a <span class="arithmatex">\(60\)</span></td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Simplesso su reti](../../esercizi/network-simplex.md)
