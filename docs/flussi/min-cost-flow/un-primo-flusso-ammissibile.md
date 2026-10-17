---
title: "Un primo flusso ammissibile"
---

# 6.5 Un primo flusso ammissibile { #sez-sec-mc-feasible }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 6** · [:material-book-open-variant: Capitolo 6: Flusso di costo minimo](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-presentation: Slide](../../pdf/slide-min-cost-flow.pdf) · [:material-pencil: Esercizi: Flusso di costo minimo](../../esercizi/min-cost-flow.md) · [:material-gesture-tap: App: Flusso di costo minimo: cancellazione dei cicli e cammini minimi successivi](../../laboratorio/flusso-di-costo-minimo.md)

</div>

- Un algoritmo che migliora un flusso ammissibile ha bisogno di un flusso ammissibile da cui partire. Con la sostituzione del [Capitolo 4](../network-flow-models/rimozione-dei-limiti-inferiori.md) possiamo supporre $\vet{l}=\vet{0}$.

<a id="box-15-mc-def-aux"></a>

!!! definizione "Definizione 6.11: rete ausiliaria"

    Sia $G=(N,A)$ una rete bilanciata con $\vet{l}=\vet{0}$, e sia $D=\sum_{i \in N: b_i>0} b_i$ la sua offerta totale. La <strong>rete ausiliaria</strong> aggiunge a $G$ una <strong>super sorgente</strong> $s$ e un <strong>super pozzo</strong> $t$, un arco $(s,i)$ con capacità $b_i$ per ogni nodo di offerta $i$, e un arco $(i,t)$ con capacità $-b_i$ per ogni nodo di domanda $i$; gli archi di $A$ mantengono le loro capacità.

<a id="box-16-mc-prop-feasible"></a>

!!! teorema "Proposizione 6.12: un flusso ammissibile da un flusso massimo"

    La rete $G$ ha un flusso ammissibile se e solo se il flusso massimo da $s$ a $t$ della rete ausiliaria ha valore $D$. In tal caso, la restrizione di un flusso massimo agli archi di $A$ è un flusso ammissibile di $G$.

??? dimostrazione "Dimostrazione"

    Il valore di un flusso da $s$ a $t$ è il flusso uscente da $s$, al più la capacità totale $D$ degli archi $(s,i)$.

    1. <em>Solo se.</em> Sia $\vet{x}$ ammissibile, e poniamo $x_{si}=b_i$ sugli archi $(s,i)$ e $x_{it}=-b_i$ sugli archi $(i,t)$. In un nodo di offerta il flusso uscente meno entrante diventa $b_i-x_{si}=0$, in un nodo di domanda $b_i+x_{it}=0$, e i nodi di trasbordo non cambiano: è un flusso da $s$ a $t$ di valore $D$, quindi massimo.

    2. <em>Se.</em> Sia $D$ il valore di un flusso massimo. Allora tutti gli archi $(s,i)$ sono saturi. Il valore è anche il flusso entrante in $t$, e gli archi $(i,t)$ hanno capacità totale $\sum_{i: b_i<0}(-b_i)=D$, perché la rete è bilanciata: anch'essi sono saturi.

    3. La conservazione del flusso in $i \in N$ dà allora, lungo gli archi di $A$, flusso uscente meno entrante pari a $x_{si}-x_{it}=b_i$, e le capacità sono rispettate: la restrizione ad $A$ è un flusso ammissibile. <span class="qed">□</span>

- Calcoliamo il flusso massimo con l'algoritmo di Edmonds–Karp del [Capitolo 5](../maximum-flow/l-algoritmo-di-edmondskarp.md): una visita in ampiezza da $s$ nella rete residua, che esamina gli archi uscenti da un nodo per indice crescente della testa ($s$ prima del nodo $1$, $t$ dopo il nodo $n$).

- Il flusso massimo ignora i costi: dà un flusso ammissibile, di solito lontano dall'ottimo.

<a id="box-17-mc-ex-feasible"></a>

!!! esempio "Esempio 6.5: un flusso ammissibile della rete di riferimento"

    La rete di riferimento ha $D=5+2=7$. La rete ausiliaria aggiunge gli archi $(s,1)$, $(s,2)$ con capacità $5$, $2$, e $(4,t)$, $(6,t)$ con capacità $3$, $4$ (in rosso e tratteggiati nella figura). I cammini aumentanti dell'algoritmo di Edmonds–Karp sono:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>cammino</th>
    <th>nodi</th>
    <th>unità</th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(s,2,4,t\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(s,1,2,4,t\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(s,1,2,4,6,t\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(s,1,3,5,6,t\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(s,1,3,5,4,6,t\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    </tr>
    </table></div>

    Il valore è $7=D$, quindi la rete ha un flusso ammissibile. Ogni arco porta $x_{ij}/u_{ij}$:

    ![Figura 2](../../img/min-cost-flow/fig02.svg){ .fig loading=lazy  }

    La restrizione ad $A$ è $(2,3,4,0,3,0,2,1,2)$: su questa istanza è il flusso ottimo $\tilde{\vet{x}}$ del Capitolo 4. È una coincidenza, perché la visita non guarda mai i costi.

!!! chiave ""

    Una super sorgente che alimenta i nodi di offerta e un super pozzo alimentato dai nodi di domanda trasformano l'ammissibilità in un problema di flusso massimo: la rete ha un flusso ammissibile se e solo se il flusso massimo satura tutti gli archi nuovi.

---

**Avanti:** [6.6 L'algoritmo di cancellazione dei cicli](l-algoritmo-di-cancellazione-dei-cicli.md)
