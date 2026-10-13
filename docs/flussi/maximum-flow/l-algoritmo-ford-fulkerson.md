---
title: "L'algoritmo Ford-Fulkerson"
---

# 5.5 L'algoritmo Ford-Fulkerson { #sez-sec-mf-ff }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 5** · [:material-book-open-variant: Capitolo 5: Flusso massimo](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-pencil: Esercizi: Flusso massimo](../../esercizi/maximum-flow.md) · [:material-gesture-tap: App: Flusso massimo: Ford–Fulkerson ed Edmonds–Karp](../../laboratorio/flusso-massimo-ford-fulkerson-edmonds-karp.md)

</div>

- Per <span style="color:#1971c2">[Teorema 5.8](il-teorema-del-taglio-minimo-del-flusso-massimo.md#box-12-mf-th-mfmc)</span>, un flusso può essere migliorato purché la sua rete residua abbia una percorso aumentante. L'algoritmo <strong>Ford–Fulkerson</strong> parte dal flusso zero e aumenta lungo tali percorsi fino a non ne è rimasto nessuno.

!!! algoritmo "Algoritmo: Algoritmo Ford–Fulkerson"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> un grafo diretto <span class="arithmatex">\(G=(N,A)\)</span> con capacità intere <span class="arithmatex">\(u_{ij} \ge 0\)</span>, una sorgente <span class="arithmatex">\(s\)</span> e un sink <span class="arithmatex">\(t\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> un flusso massimo <span class="arithmatex">\(\vet{x}\)</span> e un taglio minimo <span class="arithmatex">\((S,N \setminus S)\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Passaggio 0 (inizializzazione).</strong> Imposta <span class="arithmatex">\(x_{ij}:=0\)</span> per ogni <span class="arithmatex">\((i,j) \in A\)</span> e <span class="arithmatex">\(v:=0\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">2</span><strong>Passaggio 1 (ricerca).</strong> Costruisci la rete residua <span class="arithmatex">\(G(\vet{x})\)</span> e cercala da <span class="arithmatex">\(s\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">3</span>  Se <span class="arithmatex">\(t\)</span> non è etichettato, <code>STOP</code>: <span class="arithmatex">\(\vet{x}\)</span> è un flusso massimo e <span class="arithmatex">\(S\)</span> è l'insieme dei nodi etichettati.</div><div class="pc" style="--liv:0"><span class="pc-n">4</span><strong>Passaggio 2 (aumento).</strong> Sia <span class="arithmatex">\(P\)</span> il percorso dei predecessori da <span class="arithmatex">\(s\)</span> a <span class="arithmatex">\(t\)</span> e
    <span class="arithmatex">\(\delta:=\min_{(i,j) \in P} r_{ij}\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">5</span>  Aumenta <span class="arithmatex">\(\vet{x}\)</span> insieme a <span class="arithmatex">\(P\)</span> di <span class="arithmatex">\(\delta\)</span>, imposta <span class="arithmatex">\(v:=v+\delta\)</span> e vai al passaggio 1.</div></div>

- Nel passaggio 1 è possibile utilizzare qualsiasi ricerca di [Capitolo 1, Sezione «Grafo cerca»](../../grafi/graphs/ricerca-su-grafi.md). In questo modulo l'algoritmo Ford–Fulkerson utilizza la <strong>ricerca approfondita</strong>: $\mathit{LIST}$ è uno stack, il gli archi residui che escono da ciascun nodo vengono scansionati aumentando l'indice della testa e la ricerca si interrompe non appena $t$ è etichettato.

- Quando la ricerca non etichetta $t$, ha etichettato tutti i nodi raggiungibili da $s$ (Capitolo 1, Teorema «correttezza della ricerca»): costituiscono l'insieme $S$ dello Step 1.

<a id="box-14-mf-th-ff"></a>

!!! teorema "Teorema 5.9: correttezza di Ford–Fulkerson"

    Lascia che le capacità siano intere. Allora ogni flusso calcolato dall'algoritmo Ford-Fulkerson è intero, l'algoritmo si ferma dopo al massimo gli aumenti $\tilde{v}$ e alla fermata $\vet{x}$ è un flusso massimo e $(S,N \setminus S)$ è un taglio minimo.

??? dimostrazione "Dimostrazione"

    Usiamo <span style="color:#1971c2">[Lemma 5.7](la-rete-residua.md#box-9-mf-lem-aug)</span> e <span style="color:#1971c2">[Teorema 5.8](il-teorema-del-taglio-minimo-del-flusso-massimo.md#box-12-mf-th-mfmc)</span>.

    1. <em>Integralità.</em> Il flusso zero è intero. Se $\vet{x}$ è intero, tutte le capacità residue sono intere, quindi $\delta$ è un numero intero positivo e il flusso aumentato è un numero intero.

    2. <em>Terminazione.</em> Ogni flusso è fattibile e ogni aumento aumenta il valore di $\delta \ge 1$. Nessun valore supera $\tilde{v}$, quindi ci sono al massimo aumenti $\tilde{v}$.

    3. <em>Ottimalità.</em> Alla fermata $t$ non è etichettato, quindi $G(\vet{x})$ non ha percorso aumentante e $S$ è l'insieme di i nodi raggiungibili da $s$. La dimostrazione di (b) implica che (c) dà $v=u(S,N \setminus S)$: il flusso è massimo e il il taglio è minimo. <span class="qed">□</span>

<a id="box-15-mf-cor-integral"></a>

!!! teorema "Corollario 5.10: integralità"

    Se tutte le capacità sono intere, esiste un flusso massimo con voci intere.

??? dimostrazione "Dimostrazione"

    Il flusso restituito dall'algoritmo Ford–Fulkerson, da <span style="color:#1971c2">[Teorema 5.9](#box-14-mf-th-ff)</span>. <span class="qed">□</span>

- La stessa conclusione segue da [Capitolo 4, Teorema «vertici interi»](../network-flow-models/totale-unimodularita-e-integralita.md): con l'arco $(t,s)$, il modello $\mathrm{MF}$ è un modello di flusso a costo minimo con numero intero dati, e il suo ottimo è raggiunto su un vertice intero.

- Le capacità razionali diventano intere dopo la moltiplicazione per un denominatore comune, che moltiplica ogni flusso e ogni taglio dello stesso fattore: l'algoritmo si ferma anche alle capacità razionali.

<a id="box-16-mf-th-ff-time"></a>

!!! teorema "Teorema 5.11: tempo di esecuzione di Ford–Fulkerson"

    Con capacità intere, l'algoritmo Ford–Fulkerson viene eseguito nel tempo $O((n+m)\,\tilde{v})$ e $\tilde{v} \le (n-1)\,U$, where $U$ è la capacità maggiore.

??? dimostrazione "Dimostrazione"

    Ogni iterazione crea $G(\vet{x})$ nel tempo $O(m)$, lo cerca nel tempo $O(n+m)$, poiché $G(\vet{x})$ ha al massimo $2m$ archi (Capitolo 1, Teorema «tempo di esecuzione della ricerca»), e le variazioni al massimo $n-1$ scorrono lungo $P$. Ci sono al massimo $\tilde{v}$ iterazioni con un aumento, più l'ultima.

    - Di <span style="color:#1971c2">[Corollario 5.4](tagli.md#box-5-mf-cor-weak)</span> con $S=\{s\}$, $\tilde{v} \le u(\{s\},N \setminus \{s\})$, e $s$ ha al massimo $n-1$ archi uscenti, ciascuno con capacità al massimo $U$.

    <p class="qed-riga"><span class="qed">□</span></p>

- Il limite cresce con il valore $U$ delle capacità, e non solo con il numero delle loro cifre, di circa $\log_2 U$: il tempo di esecuzione è <strong>pseudopolinomio</strong>. <span style="color:#1971c2">[Esempio 5.7](#box-18-mf-ex-bad)</span> mostra che il numero di gli aumenti possono davvero crescere con le capacità.

## 5.5.1 Ford–Fulkerson sulla rete di riferimento

<a id="box-17-mf-ex-ff"></a>

!!! esempio "Esempio 5.6: Ford–Fulkerson sulla rete di riferimento"

    Eseguiamo l'algoritmo sulla rete di <span style="color:#1971c2">[Esempio 5.1](il-problema-del-flusso-massimo.md#box-2-mf-ex-ref)</span>. Ogni riga è un'iterazione: il percorso aumentante, le capacità residue dei suoi archi, gli archi arretrati che utilizza, il collo di bottiglia e il nuovo valore.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>iterazione e percorso aumentante</th>
    <th><span class="arithmatex">\(r_{ij}\)</span> su <span class="arithmatex">\(P\)</span></th>
    <th>archi all'indietro</th>
    <th><span class="arithmatex">\(\delta\)</span></th>
    <th><span class="arithmatex">\(v\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(1,2,4,3,5,6\)</span></td>
    <td><span class="arithmatex">\(5,3,2,4,3\)</span></td>
    <td>–</td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(1,2,4,6\)</span></td>
    <td><span class="arithmatex">\(3,1,4\)</span></td>
    <td>–</td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(1,3,4,6\)</span></td>
    <td><span class="arithmatex">\(4,2,3\)</span></td>
    <td><span class="arithmatex">\((3,4)\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(1,3,5,4,6\)</span></td>
    <td><span class="arithmatex">\(2,2,2,1\)</span></td>
    <td>–</td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(1,3,5,6\)</span></td>
    <td><span class="arithmatex">\(1,1,1\)</span></td>
    <td>–</td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    </tr>
    </table></div>

    I flussi dopo ogni iterazione ($k=0$ è il flusso zero) sono:

    $$
    \begin{array}{c|cccccccccc}
    \hline {k} & {x_{12}} & {x_{13}} & {x_{24}} & {x_{32}} & {x_{35}} & {x_{43}} & {x_{46}} & {x_{54}} & {x_{56}} \\
    \hline {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
    {1} & {2} & {0} & {2} & {0} & {2} & {2} & {0} & {0} & {2} \\
    {2} & {3} & {0} & {3} & {0} & {2} & {2} & {1} & {0} & {2} \\
    {3} & {3} & {2} & {3} & {0} & {2} & {0} & {3} & {0} & {2} \\
    {4} & {3} & {3} & {3} & {0} & {3} & {0} & {4} & {1} & {2} \\
    {5} & {3} & {4} & {3} & {0} & {4} & {0} & {4} & {1} & {3} \\
    \hline
    \end{array}
    $$

    - L'iterazione $1$ è la ricerca approfondita di [Capitolo 1, Esempio «DFS da nodo $1$»](../../grafi/graphs/ricerca-su-grafi.md): tutti gli archi sono vuoti, $G(\vet{0})=G$, e il percorso passa attraverso l'arco $(4,3)$.

    - Dopo l'iterazione $2$ il flusso è $\bar{\vet{x}}$ di <span style="color:#1971c2">[Esempio 5.1](il-problema-del-flusso-massimo.md#box-2-mf-ex-ref)</span> e l'iterazione $3$ è il aumento di <span style="color:#1971c2">[Esempio 5.3](la-rete-residua.md#box-10-mf-ex-residual)</span>: l'arco all'indietro $(3,4)$ annulla le due unità inviate su $(4,3)$ nell'iterazione $1$.

    - La sesta ricerca etichetta solo i nodi $1$ e $2$, e l'algoritmo si interrompe: il flusso è $\tilde{\vet{x}}$ di <span style="color:#1971c2">[Esempio 5.5](il-teorema-del-taglio-minimo-del-flusso-massimo.md#box-13-mf-ex-maxflow)</span> e $S=\{1,2\}$ fornisce il taglio minimo di capacità $u_{13}+u_{24}=7$.

    - L'algoritmo effettua aumenti $5$, entro il limite $\tilde{v}=7$ di <span style="color:#1971c2">[Teorema 5.9](#box-14-mf-th-ff)</span>.

## 5.5.2 Il numero di aumenti

<a id="box-18-mf-ex-bad"></a>

!!! esempio "Esempio 5.7: molti miglioramenti"

    Nella rete seguente, $M$ è un numero intero positivo. I percorsi $1,2,4$ e $1,3,4$ portano ciascuno unità $M$ e il taglio $S=\{1\}$ ha la capacità $2M$, quindi $\tilde{v}=2M$.

    ![Figura 5](../../img/maximum-flow/fig05.svg){ .fig loading=lazy  }

    - L'algoritmo Ford–Fulkerson consente qualsiasi percorso aumentante. Se i percorsi $1,2,3,4$ e $1,3,2,4$ si alternano, il secondo attraverso l'arco all'indietro $(3,2)$, ogni collo di bottiglia è $\delta=1$, dato dall'arco $(2,3)$ o dal suo arco all'indietro: sono necessari gli aumenti $2M$, due milioni per $M=10^6$.

    - Con la ricerca approfondita di questo modulo, per $M \ge 2$, i percorsi sono $1,2,3,4$, quindi $1,2,4$, $1,3,2,4$ e $1,3,4$, con $\delta=1$, $M-1$, $1$, $M-1$: quattro ampliamenti.

!!! chiave ""

    L'algoritmo Ford-Fulkerson aumenta lungo i percorsi della rete residua fino a quando non ne rimane più nessuno. Con numero intero capacità si ferma dopo al massimo $\tilde{v}$ aumenti, con un flusso massimo intero e un taglio minimo; suo il tempo di esecuzione $O((n+m)\,\tilde{v})$ è pseudopolinomiale.

---

**Avanti:** [5.6 L'algoritmo Edmonds–Karp](l-algoritmo-edmondskarp.md)
