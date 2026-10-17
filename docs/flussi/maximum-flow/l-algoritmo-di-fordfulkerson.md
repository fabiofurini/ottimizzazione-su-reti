---
title: "L'algoritmo di Ford–Fulkerson"
---

# 5.5 L'algoritmo di Ford–Fulkerson { #sez-sec-mf-ff }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 5** · [:material-book-open-variant: Capitolo 5: Flusso massimo](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-presentation: Slide](../../pdf/slide-maximum-flow.pdf) · [:material-pencil: Esercizi: Flusso massimo](../../esercizi/maximum-flow.md) · [:material-gesture-tap: App: Flusso massimo: Ford–Fulkerson ed Edmonds–Karp](../../laboratorio/flusso-massimo-ford-fulkerson-edmonds-karp.md)

</div>

- Per il <span style="color:#1971c2">[Teorema 5.8](il-teorema-flusso-massimo-taglio-minimo.md#box-12-mf-th-mfmc)</span>, un flusso si può migliorare finché la sua rete residua ha un cammino aumentante. L'<strong>algoritmo di Ford–Fulkerson</strong> parte dal flusso nullo e aumenta il flusso lungo questi cammini finché non ne rimane nessuno.

!!! algoritmo "Algoritmo: Algoritmo di Ford–Fulkerson"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> un grafo orientato <span class="arithmatex">\(G=(N,A)\)</span> con capacità intere <span class="arithmatex">\(u_{ij} \ge 0\)</span>, una sorgente <span class="arithmatex">\(s\)</span> e un pozzo <span class="arithmatex">\(t\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> un flusso massimo <span class="arithmatex">\(\vet{x}\)</span> e un taglio minimo <span class="arithmatex">\((S,N \setminus S)\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Passo 0 (inizializzazione).</strong> Poni <span class="arithmatex">\(x_{ij}:=0\)</span> per ogni <span class="arithmatex">\((i,j) \in A\)</span>, e <span class="arithmatex">\(v:=0\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">2</span><strong>Passo 1 (visita).</strong> Costruisci la rete residua <span class="arithmatex">\(G(\vet{x})\)</span> e visitala a partire da <span class="arithmatex">\(s\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">3</span>  Se <span class="arithmatex">\(t\)</span> non è etichettato, <code>STOP</code>: <span class="arithmatex">\(\vet{x}\)</span> è un flusso massimo, e <span class="arithmatex">\(S\)</span> è l'insieme dei nodi etichettati.</div><div class="pc" style="--liv:0"><span class="pc-n">4</span><strong>Passo 2 (aumento).</strong> Sia <span class="arithmatex">\(P\)</span> il cammino dei predecessori da <span class="arithmatex">\(s\)</span> a <span class="arithmatex">\(t\)</span>, e
    <span class="arithmatex">\(\delta:=\min_{(i,j) \in P} r_{ij}\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">5</span>  Aumenta <span class="arithmatex">\(\vet{x}\)</span> lungo <span class="arithmatex">\(P\)</span> di <span class="arithmatex">\(\delta\)</span>, poni <span class="arithmatex">\(v:=v+\delta\)</span>, e torna al Passo 1.</div></div>

- Il Passo 1 può usare qualunque visita della [sezione «Visita di un grafo» del Capitolo 1](../../grafi/graphs/visita-di-un-grafo.md). In questo modulo l'algoritmo di Ford–Fulkerson usa la <strong>visita in profondità</strong>: $\mathit{LIST}$ è una pila, gli archi residui che escono da ogni nodo sono esaminati per indice crescente della testa, e la visita si ferma appena $t$ è etichettato.

- Quando la visita non etichetta $t$, ha etichettato tutti i nodi raggiungibili da $s$ (Capitolo 1, Teorema «correttezza della visita»): formano l'insieme $S$ del Passo 1.

<a id="box-14-mf-th-ff"></a>

!!! teorema "Teorema 5.9: correttezza di Ford–Fulkerson"

    Siano le capacità intere. Allora ogni flusso calcolato dall'algoritmo di Ford–Fulkerson è intero, l'algoritmo si ferma dopo al più $\tilde{v}$ aumenti, e all'arresto $\vet{x}$ è un flusso massimo e $(S,N \setminus S)$ è un taglio minimo.

??? dimostrazione "Dimostrazione"

    Usiamo il <span style="color:#1971c2">[Lemma 5.7](la-rete-residua.md#box-9-mf-lem-aug)</span> e il <span style="color:#1971c2">[Teorema 5.8](il-teorema-flusso-massimo-taglio-minimo.md#box-12-mf-th-mfmc)</span>.

    1. <em>Integralità.</em> Il flusso nullo è intero. Se $\vet{x}$ è intero, tutte le capacità residue sono intere, quindi $\delta$ è un intero positivo e il flusso aumentato è intero.

    2. <em>Terminazione.</em> Ogni flusso è ammissibile, e ogni aumento accresce il valore di $\delta \ge 1$. Nessun valore supera $\tilde{v}$, quindi gli aumenti sono al più $\tilde{v}$.

    3. <em>Ottimalità.</em> All'arresto $t$ non è etichettato, quindi $G(\vet{x})$ non ha cammini aumentanti e $S$ è l'insieme dei nodi raggiungibili da $s$. La dimostrazione di (b) implica (c) dà $v=u(S,N \setminus S)$: il flusso è massimo e il taglio è minimo. <span class="qed">□</span>

<a id="box-15-mf-cor-integral"></a>

!!! teorema "Corollario 5.10: integralità"

    Se tutte le capacità sono intere, esiste un flusso massimo con componenti intere.

??? dimostrazione "Dimostrazione"

    È il flusso restituito dall'algoritmo di Ford–Fulkerson, per il <span style="color:#1971c2">[Teorema 5.9](#box-14-mf-th-ff)</span>. <span class="qed">□</span>

- La stessa conclusione segue dal [Teorema «vertici interi» del Capitolo 4](../network-flow-models/totale-unimodularita-e-integralita.md): con l'arco $(t,s)$, il modello $\mathrm{MF}$ è un modello di flusso di costo minimo con dati interi, e il suo ottimo è raggiunto in un vertice intero.

- Le capacità razionali diventano intere moltiplicandole per un denominatore comune, che moltiplica ogni flusso e ogni taglio per lo stesso fattore: l'algoritmo si ferma anche con capacità razionali.

<a id="box-16-mf-th-ff-time"></a>

!!! teorema "Teorema 5.11: tempo di esecuzione di Ford–Fulkerson"

    Con capacità intere, l'algoritmo di Ford–Fulkerson richiede tempo $O((n+m)\,\tilde{v})$, e $\tilde{v} \le (n-1)\,U$, dove $U$ è la capacità più grande.

??? dimostrazione "Dimostrazione"

    Ogni iterazione costruisce $G(\vet{x})$ in tempo $O(m)$, la visita in tempo $O(n+m)$, perché $G(\vet{x})$ ha al più $2m$ archi (Capitolo 1, Teorema «tempo di esecuzione della visita»), e cambia al più $n-1$ flussi lungo $P$. Le iterazioni con un aumento sono al più $\tilde{v}$, più l'ultima.

    - Per il <span style="color:#1971c2">[Corollario 5.4](tagli.md#box-5-mf-cor-weak)</span> con $S=\{s\}$, $\tilde{v} \le u(\{s\},N \setminus \{s\})$, e da $s$ escono al più $n-1$ archi, ciascuno con capacità al più $U$.

    <p class="qed-riga"><span class="qed">□</span></p>

- Il limite cresce con il valore $U$ delle capacità, e non solo con il numero delle loro cifre, circa $\log_2 U$: il tempo di esecuzione è <strong>pseudopolinomiale</strong>. L'<span style="color:#1971c2">[Esempio 5.7](#box-18-mf-ex-bad)</span> mostra che il numero di aumenti può davvero crescere con le capacità.

## 5.5.1 Ford–Fulkerson sulla rete di riferimento

<a id="box-17-mf-ex-ff"></a>

!!! esempio "Esempio 5.6: Ford–Fulkerson sulla rete di riferimento"

    Eseguiamo l'algoritmo sulla rete dell'<span style="color:#1971c2">[Esempio 5.1](il-problema-del-flusso-massimo.md#box-2-mf-ex-ref)</span>. Ogni riga è un'iterazione: il cammino aumentante, le capacità residue dei suoi archi, gli archi all'indietro che usa, il collo di bottiglia e il nuovo valore.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>iterazione</th>
    <th>cammino aumentante</th>
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

    I flussi dopo ogni iterazione ($k=0$ è il flusso nullo) sono:

    $$
    \begin{array}{c|ccccccccc}
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

    - L'iterazione $1$ è la visita in profondità dell'[Esempio «DFS dal nodo $1$» del Capitolo 1](../../grafi/graphs/visita-di-un-grafo.md): tutti gli archi sono vuoti, $G(\vet{0})=G$, e il cammino passa per l'arco $(4,3)$.

    - Dopo l'iterazione $2$ il flusso è $\bar{\vet{x}}$ dell'<span style="color:#1971c2">[Esempio 5.1](il-problema-del-flusso-massimo.md#box-2-mf-ex-ref)</span>, e l'iterazione $3$ è l'aumento dell'<span style="color:#1971c2">[Esempio 5.3](la-rete-residua.md#box-10-mf-ex-residual)</span>: l'arco all'indietro $(3,4)$ annulla le due unità inviate su $(4,3)$ nell'iterazione $1$.

    - La sesta visita etichetta solo i nodi $1$ e $2$, e l'algoritmo si ferma: il flusso è $\tilde{\vet{x}}$ dell'<span style="color:#1971c2">[Esempio 5.5](il-teorema-flusso-massimo-taglio-minimo.md#box-13-mf-ex-maxflow)</span>, e $S=\{1,2\}$ dà il taglio minimo di capacità $u_{13}+u_{24}=7$.

    - L'algoritmo esegue $5$ aumenti, entro il limite $\tilde{v}=7$ del <span style="color:#1971c2">[Teorema 5.9](#box-14-mf-th-ff)</span>.

## 5.5.2 Il numero di aumenti

<a id="box-18-mf-ex-bad"></a>

!!! esempio "Esempio 5.7: molti aumenti"

    Nella rete qui sotto, $M$ è un intero positivo. I cammini $1,2,4$ e $1,3,4$ portano $M$ unità ciascuno, e il taglio $S=\{1\}$ ha capacità $2M$, quindi $\tilde{v}=2M$.

    ![Figura 5](../../img/maximum-flow/fig05.svg){ .fig loading=lazy  }

    - L'algoritmo di Ford–Fulkerson ammette qualunque cammino aumentante. Se i cammini $1,2,3,4$ e $1,3,2,4$ si alternano, il secondo attraverso l'arco all'indietro $(3,2)$, ogni collo di bottiglia è $\delta=1$, dato dall'arco $(2,3)$ o dal suo arco all'indietro: servono $2M$ aumenti, due milioni per $M=10^6$.

    - Con la visita in profondità di questo modulo, per $M \ge 2$, i cammini sono $1,2,3,4$, poi $1,2,4$, $1,3,2,4$ e $1,3,4$, con $\delta=1$, $M-1$, $1$, $M-1$: quattro aumenti.

!!! chiave ""

    L'algoritmo di Ford–Fulkerson aumenta il flusso lungo cammini della rete residua finché non ne rimane nessuno. Con capacità intere si ferma dopo al più $\tilde{v}$ aumenti, con un flusso massimo intero e un taglio minimo; il suo tempo di esecuzione $O((n+m)\,\tilde{v})$ è pseudopolinomiale.

---

**Avanti:** [5.6 L'algoritmo di Edmonds–Karp](l-algoritmo-di-edmondskarp.md)
