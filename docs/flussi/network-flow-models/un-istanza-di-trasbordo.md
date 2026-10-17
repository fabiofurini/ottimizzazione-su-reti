---
title: "Un'istanza di trasbordo"
---

# 4.9 Un'istanza di trasbordo

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 4** · [:material-book-open-variant: Capitolo 4: Modelli di flusso](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-presentation: Slide](../../pdf/slide-network-flow-models.pdf) · [:material-pencil: Esercizi: Modelli di flusso](../../esercizi/network-flow-models.md)

</div>

<a id="sez-sec-nf-example"></a>

- Risolviamo il modello $\mathrm{MCF}$ dell'<span style="color:#1971c2">[Esempio 4.2](il-modello-di-flusso-di-costo-minimo.md#box-6-nf-ex-model)</span>: la rete di riferimento, con due nodi di offerta, due nodi di domanda e due nodi di trasbordo. La soluzione ottima è calcolata con Gurobi (gurobipy), e poi certificata a mano con il <span style="color:#1971c2">[Corollario 4.20](il-modello-duale-e-i-costi-ridotti.md#box-27-nf-cor-certificate)</span>.

<a id="box-29-nf-ex-opt"></a>

!!! esempio "Esempio 4.9: il flusso ottimo"

    Il flusso ottimo $\tilde{\vet{x}}$ e il suo valore ottimo sono

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>arco</th>
    <th><span class="arithmatex">\((1,2)\)</span></th>
    <th><span class="arithmatex">\((1,3)\)</span></th>
    <th><span class="arithmatex">\((2,4)\)</span></th>
    <th><span class="arithmatex">\((3,2)\)</span></th>
    <th><span class="arithmatex">\((3,5)\)</span></th>
    <th><span class="arithmatex">\((4,3)\)</span></th>
    <th><span class="arithmatex">\((4,6)\)</span></th>
    <th><span class="arithmatex">\((5,4)\)</span></th>
    <th><span class="arithmatex">\((5,6)\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\tilde{x}_{ij}\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(u_{ij}\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    </tr>
    </table></div>

    $z(\mathrm{MCF})=60$.

    Nella figura ogni arco porta $\tilde{x}_{ij}/u_{ij}$: gli archi strettamente compresi fra i loro limiti sono blu, gli archi saturi rossi, gli archi vuoti grigi e tratteggiati. Accanto a ogni nodo, il suo potenziale.

    ![Figura 3](../../img/network-flow-models/fig03.svg){ .fig loading=lazy  }

    Il flusso è intero, come garantisce il <span style="color:#1971c2">[Corollario 4.16](totale-unimodularita-e-integralita.md#box-22-nf-cor-integral)</span>.

### 4.9.1 Il certificato di ottimalità

1. I cinque archi blu $(1,2)$, $(1,3)$, $(3,5)$, $(4,6)$, $(5,4)$ formano un albero ricoprente. Imponiamo costo ridotto nullo su di essi, $\pi_i-\pi_j=c_{ij}$, e normalizziamo con $\pi_6=0$.

2. Procedendo a ritroso dal nodo $6$: $\pi_4=\pi_6+c_{46}=5$, $\pi_5=\pi_4+c_{54}=10$, $\pi_3=\pi_5+c_{35}=13$, $\pi_1=\pi_3+c_{13}=15$ e $\pi_2=\pi_1-c_{12}=13$.

3. Il potenziale $\pi_i$ è il costo del cammino nell'albero da $i$ a $6$: per esempio, $\pi_1=c_{13}+c_{35}+c_{54}+ c_{46}=2+3+5+5=15$.

<a id="box-30-nf-ex-cert"></a>

!!! esempio "Esempio 4.10: costi ridotti e ottimalità"

    I costi ridotti $\bar{c}_{ij}=c_{ij}-\pi_i+\pi_j$ sono:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>arco</th>
    <th><span class="arithmatex">\((1,2)\)</span></th>
    <th><span class="arithmatex">\((1,3)\)</span></th>
    <th><span class="arithmatex">\((2,4)\)</span></th>
    <th><span class="arithmatex">\((3,2)\)</span></th>
    <th><span class="arithmatex">\((3,5)\)</span></th>
    <th><span class="arithmatex">\((4,3)\)</span></th>
    <th><span class="arithmatex">\((4,6)\)</span></th>
    <th><span class="arithmatex">\((5,4)\)</span></th>
    <th><span class="arithmatex">\((5,6)\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\bar{c}_{ij}\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(-3\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(-7\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\alpha_{ij}\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    </tr>
    </table></div>

    - Gli archi con $\bar{c}_{ij}>0$, $(3,2)$ e $(4,3)$, sono vuoti; gli archi con $\bar{c}_{ij}<0$, $(2,4)$ e $(5,6)$, sono saturi. Per il <span style="color:#1971c2">[Corollario 4.20](il-modello-duale-e-i-costi-ridotti.md#box-27-nf-cor-certificate)</span>, $\tilde{\vet{x}}$ è ottimo.

    - Il valore duale è $\sum_{i \in N} b_i\pi_i-\sum_{(i,j) \in A} u_{ij}\alpha_{ij}=86-26=60$, uguale al costo di $\tilde{\vet{x}}$. I potenziali coincidono con i valori duali restituiti da Gurobi, traslati in modo che $\pi_6=0$.

- <strong>Unicità.</strong> Ogni flusso ottimo ha gap nullo con $(\vet{\pi},\vet{\alpha})$, quindi per il <span style="color:#1971c2">[Teorema 4.19](il-modello-duale-e-i-costi-ridotti.md#box-26-nf-th-gap)</span> ha $x_{32}=x_{43}=0$, $x_{24}=4$ e $x_{56}=2$. Il flusso sui cinque archi dell'albero è allora fissato dalla conservazione, perché le loro colonne sono linearmente indipendenti: $\tilde{\vet{x}}$ è l'unico flusso ottimo.

- <strong>Il flusso $\bar{\vet{x}}$.</strong> Il flusso ammissibile $\bar{\vet{x}}$ dell'<span style="color:#1971c2">[Esempio 4.1](reti-e-flussi.md#box-3-nf-ex-ref)</span> costa $63$, e il suo gap con la stessa soluzione duale è $63-60=3=\alpha_{24}(u_{24}-\bar{x}_{24})=3 \cdot (4-3)$: l'arco $(2,4)$ è usato troppo poco.

!!! chiave ""

    Sulla rete di riferimento il flusso ottimo costa $60$. I potenziali del suo albero ricoprente danno costi ridotti positivi solo su archi vuoti e negativi solo su archi saturi: certificano l'ottimalità senza un solutore.

## 4.10 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Scambiare flusso uscente e flusso entrante.</strong> Il vincolo di conservazione è flusso uscente meno flusso entrante uguale a $b_i$, con $b_i>0$ in un nodo di offerta: i segni seguono la matrice di incidenza, $+1$ nella coda.

    - <strong>Considerare sufficiente $\sum_i b_i=0$.</strong> Una rete bilanciata può non avere flussi ammissibili: un taglio può essere troppo piccolo per trasportare l'offerta dei nodi interni.

    - <strong>Sbagliare i segni della sostituzione.</strong> Con $\vet{x}=\vet{l}+\vet{x}'$ la coda di $(i,j)$ perde $l_{ij}$ unità di bilancio e la testa le guadagna; la costante $\vet{c}'\vet{l}$ va aggiunta di nuovo al valore.

    - <strong>Dimenticare il nodo fittizio.</strong> Un'istanza con più offerta che domanda non ha flussi ammissibili con le uguaglianze; gli archi fittizi devono costare zero, altrimenti l'offerta non usata viene pagata.

    - <strong>Pretendere l'integralità per qualsiasi matrice.</strong> I vertici interi richiedono una matrice TU e $\vet{b}$, $\vet{l}$, $\vet{u}$ interi; i costi possono essere frazionari.

    - <strong>Scrivere il costo ridotto con i segni sbagliati.</strong> In questo modulo $\bar{c}_{ij}=c_{ij}-\pi_i+\pi_j$, con $-\pi$ della coda e $+\pi$ della testa.

    - <strong>Aspettarsi potenziali unici.</strong> I potenziali sono definiti a meno di una costante additiva; si fissano con una normalizzazione come $\pi_n=0$.

## 4.11 In sintesi

!!! chiave "In sintesi"

    - Una rete ha bilanci $b_i$, limiti inferiori $l_{ij}$, capacità $u_{ij}$ e costi $c_{ij}$; il problema di flusso di costo minimo è l'LP $\min\{\vet{c}'\vet{x} : \mat{B}\vet{x}=\vet{b},~\vet{l} \le \vet{x} \le \vet{u}\}$.

    - Attraverso ogni taglio il flusso uscente netto è uguale al bilancio dei nodi interni; una rete ammissibile è bilanciata e soddisfa la condizione di taglio.

    - I limiti inferiori si rimuovono con $\vet{x}=\vet{l}+\vet{x}'$; un eccesso di offerta va a un nodo fittizio attraverso archi a costo zero.

    - La matrice di incidenza è totalmente unimodulare, quindi con $\vet{b}$, $\vet{l}$, $\vet{u}$ interi ogni vertice è intero e il modello $\mathrm{MCF}$ ha una soluzione ottima intera.

    - Il duale ha i potenziali $\pi_i$; con $\bar{c}_{ij}=c_{ij}-\pi_i+\pi_j$, un flusso con gli archi a costo positivo vuoti e gli archi a costo negativo saturi è ottimo.

    - Cammino minimo, flusso massimo, trasporto e assegnamento sono modelli $\mathrm{MCF}$.

    <strong>La rete di riferimento in breve.</strong>

    <div class="tabella" markdown="0"><table>
    <tr>
    <td>bilanci</td>
    <td><span class="arithmatex">\(\vet{b}=(5,2,0,-3,0,-4)\)</span></td>
    </tr>
    <tr>
    <td>flusso ottimo</td>
    <td><span class="arithmatex">\(\tilde{\vet{x}}=(2,3,4,0,3,0,2,1,2)\)</span>, <span class="arithmatex">\(z(\mathrm{MCF})=60\)</span></td>
    </tr>
    <tr>
    <td>potenziali (<span class="arithmatex">\(\pi_6=0\)</span>)</td>
    <td><span class="arithmatex">\(\vet{\pi}=(15,13,13,5,10,0)\)</span></td>
    </tr>
    <tr>
    <td>archi vuoti / saturi</td>
    <td><span class="arithmatex">\((3,2)\)</span>, <span class="arithmatex">\((4,3)\)</span> / <span class="arithmatex">\((2,4)\)</span>, <span class="arithmatex">\((5,6)\)</span></td>
    </tr>
    <tr>
    <td>con <span class="arithmatex">\(l_{32}=1\)</span></td>
    <td><span class="arithmatex">\(\vet{b}'=(5,3,-1,-3,0,-4)\)</span>, valore ottimo <span class="arithmatex">\(62\)</span></td>
    </tr>
    <tr>
    <td>con <span class="arithmatex">\(b_2=4\)</span> (nodo fittizio <span class="arithmatex">\(7\)</span>)</td>
    <td><span class="arithmatex">\(x_{17}=2\)</span>, valore ottimo <span class="arithmatex">\(56\)</span></td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Modelli di flusso](../../esercizi/network-flow-models.md)

