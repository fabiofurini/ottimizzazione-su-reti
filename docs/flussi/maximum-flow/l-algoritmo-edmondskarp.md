---
title: "L'algoritmo Edmonds–Karp"
---

# 5.6 L'algoritmo Edmonds–Karp { #sez-sec-mf-ek }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 5** · [:material-book-open-variant: Capitolo 5: Flusso massimo](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-pencil: Esercizi: Flusso massimo](../../esercizi/maximum-flow.md) · [:material-gesture-tap: App: Flusso massimo: Ford–Fulkerson ed Edmonds–Karp](../../laboratorio/flusso-massimo-ford-fulkerson-edmonds-karp.md)

</div>

<a id="box-19-mf-def-ek"></a>

!!! definizione "Definizione 5.12: Algoritmo di Edmonds–Karp"

    L'algoritmo <strong>Edmonds–Karp</strong> è l'algoritmo Ford–Fulkerson in cui il Passo 1 utilizza l'algoritmo <strong>ricerca in ampiezza</strong>: $\mathit{LIST}$ è una coda, gli archi residui che escono da ciascun nodo vengono scansionati aumentando l'indice della testa e la ricerca si interrompe non appena viene etichettato $t$. Le capacità sono numeri reali non negativi.

- Di [Capitolo 1, Proposta «BFS trova i percorsi più brevi in numero di archi»](../../grafi/graphs/ricerca-su-grafi.md), il percorso aumentante ha il numero minimo di archi tra i percorsi da $s$ a $t$ in $G(\vet{x})$.

- Per un flusso ammissibile $\vet{x}$ e un nodo $i$, $d_{\vet{x}}(i)$ è il numero minimo di archi di un percorso da $s$ a $i$ in $G(\vet{x})$ e $d_{\vet{x}}(i)=+\infty$ se $i$ non è raggiungibile.

- Un arco del cammino aumentante è <strong>critico</strong> se la sua capacità residua è uguale a $\delta$: dopo il aumento la sua capacità residua è zero e lascia la rete residua.

- Un aumento lungo $P$ abbassa $r_{ij}$ di $\delta$ e solleva $r_{ji}$ di $\delta$ su ogni arco $(i,j)$ di $P$ e non modifica nessun'altra capacità residua. Quindi gli archi che entrano nella rete residua sono inversi di archi di $P$.

<a id="box-20-mf-lem-dist"></a>

!!! teorema "Lemma 5.13: le distanze non diminuiscono"

    Sia $\vet{x}'$ ottenuto da $\vet{x}$ mediante un aumento lungo un percorso $P$ da $s$ a $t$ di $G(\vet{x})$ con il numero minimo di archi. Quindi $d_{\vet{x}'}(i) \ge d_{\vet{x}}(i)$ per ogni $i \in N$.

??? dimostrazione "Dimostrazione"

    Mostriamo che ogni arco $(a,b)$ di $G(\vet{x}')$ soddisfa $d_{\vet{x}}(b) \le d_{\vet{x}}(a)+1$.

    1. Se $(a,b)$ è un arco di $G(\vet{x})$, un percorso più breve da $s$ a $a$ seguito da $(a,b)$ raggiunge $b$ con Archi $d_{\vet{x}}(a)+1$.

    2. Altrimenti $(a,b)$ è il rovescio di un arco $(b,a)$ di $P$. La parte di $P$ da $s$ a ciascuno dei suoi nodi ha il numero minimo di archi: un percorso verso quel nodo con meno archi, seguito dal resto di $P$, darebbe una passeggiata da Da $s$ a $t$ con meno archi di $P$ e un percorso al suo interno ([Capitolo 1, Lemma «una passeggiata contiene un cammino»](../../grafi/graphs/grafi-non-orientati-e-orientati.md)). Quindi $d_{\vet{x}}(a)=d_{\vet{x}}(b)+1$ e $d_{\vet{x}}(b) \le d_{\vet{x}}(a)+1$.

    Ora lasciamo che $s=i_0,i_1,\dots,i_q=i$ sia un percorso di $G(\vet{x}')$ con archi $q=d_{\vet{x}'}(i)$. Lungo i suoi archi $d_{\vet{x}}$ cresce al massimo di $1$ alla volta, quindi $d_{\vet{x}}(i) \le d_{\vet{x}}(s)+q=d_{\vet{x}'}(i)$. Se $i$ non lo è raggiungibile in $G(\vet{x}')$, quindi $d_{\vet{x}'}(i)=+\infty$. <span class="qed">□</span>

<a id="box-21-mf-lem-critical"></a>

!!! teorema "Lemma 5.14: archi critici"

    Nell'algoritmo Edmonds–Karp, lasciamo che l'arco residuo $(i,j)$ sia critico nell'aumento al flusso $\vet{x}$, e nuovamente critico in un successivo aumento al flusso $\vet{y}$. Quindi $d_{\vet{y}}(i) \ge d_{\vet{x}}(i)+2$.

??? dimostrazione "Dimostrazione"

    Applichiamo <span style="color:#1971c2">[Lemma 5.13](#box-20-mf-lem-dist)</span> ad ogni aumento tra $\vet{x}$ e $\vet{y}$.

    1. In $\vet{x}$, l'arco $(i,j)$ si trova su un percorso con il numero minimo di archi, quindi $d_{\vet{x}}(j)=d_{\vet{x}}(i)+1$; dopo l'ampliamento $r_{ij}=0$.

    2. In $\vet{y}$ l'arco $(i,j)$ è tornato nella rete residua, quindi qualche aumento nel mezzo, in un flusso $\vet{z}$, $r_{ij}$ rialzato: il suo percorso utilizzava l'arco inverso $(j,i)$ e $d_{\vet{z}}(i)=d_{\vet{z}}(j)+1$.

    3. Le distanze non diminuiscono mai, quindi $d_{\vet{z}}(j) \ge d_{\vet{x}}(j)$ e $d_{\vet{y}}(i) \ge d_{\vet{z}}(i)$. Quindi

        $$
        d_{\vet{y}}(i) \ge d_{\vet{z}}(i)=d_{\vet{z}}(j)+1 \ge d_{\vet{x}}(j)+1=d_{\vet{x}}(i)+2 .
        $$

    <p class="qed-riga"><span class="qed">□</span></p>

<a id="box-22-mf-th-ek"></a>

!!! teorema "Teorema 5.15: tempo di esecuzione di Edmonds–Karp"

    Per qualsiasi capacità non negativa, l'algoritmo Edmonds–Karp si ferma dopo al massimo gli aumenti $n\,m$ con un massimo flusso e un taglio minimo e viene eseguito nel tempo $O(n\,m\,(n+m))$, ovvero $O(n\,m^2)$ quando $m \ge n-1$.

??? dimostrazione "Dimostrazione"

    1. Ogni potenziamento ha almeno un arco critico: un arco di $P$ la cui capacità residua è pari a $\delta$.

    2. Quando $(i,j)$ è critico, $i$ si trova prima di $t$ su un percorso da $s$ a $t$ con al massimo $n-1$ archi, quindi $0 \le d(i) \le n-2$. Per <span style="color:#1971c2">[Lemma 5.14](#box-21-mf-lem-critical)</span> questa distanza cresce di almeno $2$ tra due tempi critici, quindi $(i,j)$ è critico al massimo nei tempi $\lfloor \frac{n-2}{2} \rfloor+1 \le \frac{n}{2}$.

    3. Ogni arco residuo è $(i,j)$ o $(j,i)$ per un arco $(i,j) \in A$: ce ne sono al massimo $2m$, e al massimo Miglioramenti $2m \cdot \frac{n}{2}=n\,m$.

    4. Ogni iterazione richiede tempo $O(n+m)$, come in <span style="color:#1971c2">[Teorema 5.11](l-algoritmo-ford-fulkerson.md#box-16-mf-th-ff-time)</span>. Alla fermata $G(\vet{x})$ non ha cammino aumentante, e <span style="color:#1971c2">[Teorema 5.8](il-teorema-del-taglio-minimo-del-flusso-massimo.md#box-12-mf-th-mfmc)</span> si applica come nella dimostrazione di <span style="color:#1971c2">[Teorema 5.9](l-algoritmo-ford-fulkerson.md#box-14-mf-th-ff)</span>. <span class="qed">□</span>

- Il limite dipende solo da $n$ e $m$, non dalle capacità: l'algoritmo Edmonds–Karp è <strong>fortemente polinomiale</strong>, e si ferma anche alle capacità irrazionali.

## 5.6.1 Edmonds–Karp sulla rete di riferimento

<a id="box-23-mf-ex-ek"></a>

!!! esempio "Esempio 5.8: Edmonds–Karp sulla rete di riferimento"

    Eseguiamo l'algoritmo sulla rete di <span style="color:#1971c2">[Esempio 5.1](il-problema-del-flusso-massimo.md#box-2-mf-ex-ref)</span>; la colonna «archi» è il numero di archi del percorso aumentante.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>iterazione e percorso incrementale e archi</th>
    <th><span class="arithmatex">\(r_{ij}\)</span> su <span class="arithmatex">\(P\)</span> e archi all'indietro</th>
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

    Le distanze $d_{\vet{x}}(i)$ nella rete residua prima di ogni ricerca sono:

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

    - Iterazione $1$ è la ricerca in ampiezza di [Capitolo 1, Esempio «BFS da nodo $1$»](../../grafi/graphs/ricerca-su-grafi.md), il cui percorso dell'albero al nodo $6$ è $1,2,4,6$.

    - Gli archi critici sono $(2,4)$ nell'iterazione $1$, $(5,6)$ nell'iterazione $2$ e $(1,3)$, $(3,5)$, $(4,6)$ nell'iterazione iterazione $3$. Quando $(2,4)$ lascia la rete residua, $d(4)$ cresce da $2$ a $3$; nessuna distanza diminuisce mai.

    - L'algoritmo necessita di aumenti $3$, rispetto a $5$ di <span style="color:#1971c2">[Esempio 5.6](l-algoritmo-ford-fulkerson.md#box-17-mf-ex-ff)</span>, molto al di sotto del limite $n\,m=54$. Termina con la stessa portata massima $\tilde{\vet{x}}$, unica, e lo stesso taglio $S=\{1,2\}$.

    - Sulla rete di <span style="color:#1971c2">[Esempio 5.7](l-algoritmo-ford-fulkerson.md#box-18-mf-ex-bad)</span> la ricerca in ampiezza trova prima $1,2,4$ e poi $1,3,4$, ciascuno con $\delta=M$: due ampliamenti per ogni $M$.

!!! chiave ""

    L'algoritmo Edmonds–Karp aumenta lungo i percorsi con il minor numero di archi, trovati dalla ricerca in ampiezza. Il le distanze da $s$ nella rete residua non diminuiscono mai, ogni arco è critico al massimo $\frac{n}{2}$ volte e il l'algoritmo effettua al massimo gli aumenti $n\,m$: tempo $O(n\,m^2)$, per qualsiasi capacità.

---

**Avanti:** [5.7 Applicazioni](applicazioni.md)
