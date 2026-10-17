---
title: "L'algoritmo di Edmonds–Karp"
---

# 5.6 L'algoritmo di Edmonds–Karp { #sez-sec-mf-ek }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 5** · [:material-book-open-variant: Capitolo 5: Flusso massimo](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-presentation: Slide](../../pdf/slide-maximum-flow.pdf) · [:material-pencil: Esercizi: Flusso massimo](../../esercizi/maximum-flow.md) · [:material-gesture-tap: App: Flusso massimo: Ford–Fulkerson ed Edmonds–Karp](../../laboratorio/flusso-massimo-ford-fulkerson-edmonds-karp.md)

</div>

<a id="box-19-mf-def-ek"></a>

!!! definizione "Definizione 5.12: algoritmo di Edmonds–Karp"

    L'<strong>algoritmo di Edmonds–Karp</strong> è l'algoritmo di Ford–Fulkerson in cui il Passo 1 usa la <strong>visita in ampiezza</strong>: $\mathit{LIST}$ è una coda, gli archi residui che escono da ogni nodo sono esaminati per indice crescente della testa, e la visita si ferma appena $t$ è etichettato. Le capacità sono numeri reali non negativi qualsiasi.

- Per la [Proposizione «BFS trova i percorsi più brevi in numero di archi» del Capitolo 1](../../grafi/graphs/visita-di-un-grafo.md), il cammino aumentante ha il numero minimo di archi fra i cammini da $s$ a $t$ in $G(\vet{x})$.

- Per un flusso ammissibile $\vet{x}$ e un nodo $i$, $d_{\vet{x}}(i)$ è il numero minimo di archi di un cammino da $s$ a $i$ in $G(\vet{x})$, e $d_{\vet{x}}(i)=+\infty$ se $i$ non è raggiungibile.

- Un arco del cammino aumentante è <strong>critico</strong> se la sua capacità residua è uguale a $\delta$: dopo l'aumento la sua capacità residua è zero, ed esce dalla rete residua.

- Un aumento lungo $P$ diminuisce $r_{ij}$ di $\delta$ e aumenta $r_{ji}$ di $\delta$ su ogni arco $(i,j)$ di $P$, e non cambia nessun'altra capacità residua. Quindi gli archi che entrano nella rete residua sono inversi di archi di $P$.

<a id="box-20-mf-lem-dist"></a>

!!! teorema "Lemma 5.13: le distanze non diminuiscono"

    Sia $\vet{x}'$ ottenuto da $\vet{x}$ con un aumento lungo un cammino $P$ da $s$ a $t$ di $G(\vet{x})$ con il numero minimo di archi. Allora $d_{\vet{x}'}(i) \ge d_{\vet{x}}(i)$ per ogni $i \in N$.

??? dimostrazione "Dimostrazione"

    Mostriamo che ogni arco $(a,b)$ di $G(\vet{x}')$ soddisfa $d_{\vet{x}}(b) \le d_{\vet{x}}(a)+1$.

    1. Se $(a,b)$ è un arco di $G(\vet{x})$, un cammino più breve da $s$ ad $a$ seguito da $(a,b)$ raggiunge $b$ con $d_{\vet{x}}(a)+1$ archi.

    2. Altrimenti $(a,b)$ è l'inverso di un arco $(b,a)$ di $P$. La parte di $P$ da $s$ a ciascuno dei suoi nodi ha il numero minimo di archi: un cammino verso quel nodo con meno archi, seguito dal resto di $P$, darebbe una passeggiata da $s$ a $t$ con meno archi di $P$, e quindi un cammino più corto al suo interno ([Capitolo 1, Lemma «ogni passeggiata contiene un cammino»](../../grafi/graphs/grafi-non-orientati-e-orientati.md)). Quindi $d_{\vet{x}}(a)=d_{\vet{x}}(b)+1$, e $d_{\vet{x}}(b) \le d_{\vet{x}}(a)+1$.

    Sia ora $s=i_0,i_1,\dots,i_q=i$ un cammino di $G(\vet{x}')$ con $q=d_{\vet{x}'}(i)$ archi. Lungo i suoi archi $d_{\vet{x}}$ cresce al più di $1$ alla volta, quindi $d_{\vet{x}}(i) \le d_{\vet{x}}(s)+q=d_{\vet{x}'}(i)$. Se $i$ non è raggiungibile in $G(\vet{x}')$, allora $d_{\vet{x}'}(i)=+\infty$. <span class="qed">□</span>

<a id="box-21-mf-lem-critical"></a>

!!! teorema "Lemma 5.14: archi critici"

    Nell'algoritmo di Edmonds–Karp, sia l'arco residuo $(i,j)$ critico nell'aumento che parte dal flusso $\vet{x}$, e di nuovo critico in un aumento successivo, che parte dal flusso $\vet{y}$. Allora $d_{\vet{y}}(i) \ge d_{\vet{x}}(i)+2$.

??? dimostrazione "Dimostrazione"

    Applichiamo il <span style="color:#1971c2">[Lemma 5.13](#box-20-mf-lem-dist)</span> a ogni aumento fra $\vet{x}$ e $\vet{y}$.

    1. Con il flusso $\vet{x}$, l'arco $(i,j)$ sta su un cammino con il numero minimo di archi, quindi $d_{\vet{x}}(j)=d_{\vet{x}}(i)+1$; dopo l'aumento $r_{ij}=0$.

    2. Con il flusso $\vet{y}$ l'arco $(i,j)$ è di nuovo nella rete residua, quindi un aumento intermedio, che parte da un flusso $\vet{z}$, ha aumentato $r_{ij}$: il suo cammino usava l'arco inverso $(j,i)$, e $d_{\vet{z}}(i)=d_{\vet{z}}(j)+1$.

    3. Le distanze non diminuiscono mai, quindi $d_{\vet{z}}(j) \ge d_{\vet{x}}(j)$ e $d_{\vet{y}}(i) \ge d_{\vet{z}}(i)$. Ne segue

        $$
        d_{\vet{y}}(i) \ge d_{\vet{z}}(i)=d_{\vet{z}}(j)+1 \ge d_{\vet{x}}(j)+1=d_{\vet{x}}(i)+2 .
        $$

    <p class="qed-riga"><span class="qed">□</span></p>

<a id="box-22-mf-th-ek"></a>

!!! teorema "Teorema 5.15: tempo di esecuzione di Edmonds–Karp"

    Per qualsiasi capacità non negativa, l'algoritmo di Edmonds–Karp si ferma dopo al più $n\,m$ aumenti con un flusso massimo e un taglio minimo, e richiede tempo $O(n\,m\,(n+m))$, cioè $O(n\,m^2)$ quando $m \ge n-1$.

??? dimostrazione "Dimostrazione"

    1. Ogni aumento ha almeno un arco critico: un arco di $P$ la cui capacità residua è uguale a $\delta$.

    2. Quando $(i,j)$ è critico, $i$ precede $t$ su un cammino da $s$ a $t$ con al più $n-1$ archi, quindi $0 \le d(i) \le n-2$. Per il <span style="color:#1971c2">[Lemma 5.14](#box-21-mf-lem-critical)</span> questa distanza cresce di almeno $2$ fra due volte in cui l'arco è critico, quindi $(i,j)$ è critico al più $\lfloor \frac{n-2}{2} \rfloor+1 \le \frac{n}{2}$ volte.

    3. Ogni arco residuo è $(i,j)$ o $(j,i)$ per un arco $(i,j) \in A$: ce ne sono al più $2m$, e gli aumenti sono al più $2m \cdot \frac{n}{2}=n\,m$.

    4. Ogni iterazione richiede tempo $O(n+m)$, come nel <span style="color:#1971c2">[Teorema 5.11](l-algoritmo-di-fordfulkerson.md#box-16-mf-th-ff-time)</span>. All'arresto $G(\vet{x})$ non ha cammini aumentanti, e il <span style="color:#1971c2">[Teorema 5.8](il-teorema-flusso-massimo-taglio-minimo.md#box-12-mf-th-mfmc)</span> si applica come nella dimostrazione del <span style="color:#1971c2">[Teorema 5.9](l-algoritmo-di-fordfulkerson.md#box-14-mf-th-ff)</span>. <span class="qed">□</span>

- Il limite dipende solo da $n$ e $m$, non dalle capacità: l'algoritmo di Edmonds–Karp è <strong>fortemente polinomiale</strong>, e si ferma anche con capacità irrazionali.

## 5.6.1 Edmonds–Karp sulla rete di riferimento

<a id="box-23-mf-ex-ek"></a>

!!! esempio "Esempio 5.8: Edmonds–Karp sulla rete di riferimento"

    Eseguiamo l'algoritmo sulla rete dell'<span style="color:#1971c2">[Esempio 5.1](il-problema-del-flusso-massimo.md#box-2-mf-ex-ref)</span>; la colonna «archi» è il numero di archi del cammino aumentante.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>iterazione</th>
    <th>cammino aumentante</th>
    <th>archi</th>
    <th><span class="arithmatex">\(r_{ij}\)</span> su <span class="arithmatex">\(P\)</span></th>
    <th>archi all'indietro</th>
    <th><span class="arithmatex">\(\delta\)</span></th>
    <th><span class="arithmatex">\(v\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(1,2,4,6\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(5,3,4\)</span></td>
    <td>–</td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(1,3,5,6\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(4,4,3\)</span></td>
    <td>–</td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(1,3,5,4,6\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(1,1,2,1\)</span></td>
    <td>–</td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    </tr>
    </table></div>

    Le distanze $d_{\vet{x}}(i)$ nella rete residua prima di ogni visita sono:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>iterazione</th>
    <th><span class="arithmatex">\(d(1)\)</span></th>
    <th><span class="arithmatex">\(d(2)\)</span></th>
    <th><span class="arithmatex">\(d(3)\)</span></th>
    <th><span class="arithmatex">\(d(4)\)</span></th>
    <th><span class="arithmatex">\(d(5)\)</span></th>
    <th><span class="arithmatex">\(d(6)\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    </tr>
    <tr>
    <td>arresto</td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(\infty\)</span></td>
    <td><span class="arithmatex">\(\infty\)</span></td>
    <td><span class="arithmatex">\(\infty\)</span></td>
    <td><span class="arithmatex">\(\infty\)</span></td>
    </tr>
    </table></div>

    - L'iterazione $1$ è la visita in ampiezza dell'[Esempio «BFS dal nodo $1$» del Capitolo 1](../../grafi/graphs/visita-di-un-grafo.md), il cui cammino nell'albero fino al nodo $6$ è $1,2,4,6$.

    - Gli archi critici sono $(2,4)$ nell'iterazione $1$, $(5,6)$ nell'iterazione $2$, e $(1,3)$, $(3,5)$, $(4,6)$ nell'iterazione $3$. Quando $(2,4)$ esce dalla rete residua, $d(4)$ cresce da $2$ a $3$; nessuna distanza diminuisce mai.

    - L'algoritmo esegue $3$ aumenti, contro i $5$ dell'<span style="color:#1971c2">[Esempio 5.6](l-algoritmo-di-fordfulkerson.md#box-17-mf-ex-ff)</span>, molto sotto il limite $n\,m=54$. Termina con lo stesso flusso massimo $\tilde{\vet{x}}$, l'unico, e con lo stesso taglio $S=\{1,2\}$.

    - Sulla rete dell'<span style="color:#1971c2">[Esempio 5.7](l-algoritmo-di-fordfulkerson.md#box-18-mf-ex-bad)</span> la visita in ampiezza trova $1,2,4$ e poi $1,3,4$, ciascuno con $\delta=M$: due aumenti per ogni $M$.

!!! chiave ""

    L'algoritmo di Edmonds–Karp aumenta il flusso lungo cammini con il minor numero di archi, trovati dalla visita in ampiezza. Le distanze da $s$ nella rete residua non diminuiscono mai, ogni arco è critico al più $\frac{n}{2}$ volte, e l'algoritmo esegue al più $n\,m$ aumenti: tempo $O(n\,m^2)$, per qualsiasi capacità.

---

**Avanti:** [5.7 Applicazioni](applicazioni.md)
