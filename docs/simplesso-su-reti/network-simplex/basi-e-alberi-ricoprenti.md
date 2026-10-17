---
title: "Basi e alberi ricoprenti"
---

# 8.2 Basi e alberi ricoprenti { #sez-sec-ns-trees }

<div class="info-capitolo" markdown>

**Parte 4 · Il simplesso su reti · Capitolo 8** · [:material-book-open-variant: Capitolo 8: Simplesso su reti](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-simplesso-su-reti.pdf) · [:material-presentation: Slide](../../pdf/slide-network-simplex.pdf) · [:material-pencil: Esercizi: Simplesso su reti](../../esercizi/network-simplex.md) · [:material-gesture-tap: App: Il simplesso su reti, pivot per pivot](../../laboratorio/simplesso-su-reti.md)

</div>

<a id="box-4-ns-th-bases"></a>

!!! teorema "Teorema 8.3: le basi sono gli alberi ricoprenti"

    Sia connesso il grafo non orientato sottostante a $G=(N,A)$. Un insieme $T$ di $n-1$ archi è una base se e solo se è un albero ricoprente. Inoltre, per un albero ricoprente $T$ le righe e le colonne di $\mat{M}_T$ si possono ordinare in modo che la matrice sia triangolare inferiore con elementi diagonali $\pm 1$, e $\det(\mat{M}_T)=\pm 1$.

??? dimostrazione "Dimostrazione"

    Usiamo i risultati del [Capitolo 1 «Grafi»](../../grafi/graphs/index.md).

    1. <em>Le colonne di $T$ in $\mat{M}$ e in $\mat{B}$ sono indipendenti insieme.</em> La componente del nodo $n$ di $\sum_{a \in T}\lambda_a\mat{B}_a$ è l'opposto della somma delle altre componenti, perché le righe di $\mat{B}$ hanno somma nulla. Quindi $\sum_{a \in T}\lambda_a\mat{M}_a=\vet{0}$ se e solo se $\sum_{a \in T}\lambda_a\mat{B}_a=\vet{0}$.

    2. <em>Un albero ricoprente è una base.</em> Le sue colonne in $\mat{B}$ sono linearmente indipendenti per il Lemma «colonne di una foresta».

    3. <em>Una base è un albero ricoprente.</em> Se gli $n-1$ archi di $T$ fossero aciclici, formerebbero un albero ricoprente per il Teorema «caratterizzazioni di un albero»(c). Altrimenti $T$ contiene un ciclo, le cui colonne sono linearmente dipendenti per il Lemma «colonne di un ciclo», e $T$ non è una base.

    4. <em>Forma triangolare.</em> Per induzione su $n$; per $n=2$ la matrice è $1 \times 1$ con elemento $\pm 1$. Per $n \ge 3$ l'albero ha almeno due foglie (Lemma «foglie»), quindi ha una foglia $\ell \neq n$, con il suo unico arco $a_\ell$ dell'albero. La riga $\ell$ di $\mat{M}_T$ ha un solo elemento non nullo, $\pm 1$, nella colonna di $a_\ell$.

    5. Mettiamo per prime la riga $\ell$ e la colonna di $a_\ell$. Eliminandole resta la matrice costruita allo stesso modo per l'albero ricoprente $T \setminus \{a_\ell\}$ dei nodi $N \setminus \{\ell\}$, che contengono ancora $n$: per induzione si può ordinare in forma triangolare inferiore. Sviluppando lungo la prima riga, $\det(\mat{M}_T)=\pm 1$. <span class="qed">□</span>

<a id="box-5-ns-cor-integer"></a>

!!! teorema "Corollario 8.4: soluzioni ad albero intere"

    Se i bilanci e le capacità finite sono interi, ogni soluzione di base del modello $\mathrm{MCF}$ è intera.

??? dimostrazione "Dimostrazione"

    Il termine noto $\vet{h}-\sum_{a \in U}\mat{M}_au_a$ è intero, e $\det(\mat{M}_T)=\pm 1$ per il <span style="color:#1971c2">[Teorema 8.3](#box-4-ns-th-bases)</span>: per la regola di Cramer ogni variabile di base è intera. È l'integralità del [Capitolo 4 «Modelli di flusso su reti»](../../flussi/network-flow-models/index.md), vista sulle basi. <span class="qed">□</span>

<a id="box-6-ns-def-tree"></a>

!!! definizione "Definizione 8.5: struttura ad albero e soluzione ad albero"

    Sia $T$ un albero ricoprente di $G$. Una <strong>struttura ad albero</strong> è una tripla $(T,L,U)$, dove $L$ e $U$ formano una partizione di $A \setminus T$ e ogni arco di $U$ ha capacità finita. La sua <strong>soluzione ad albero</strong> è la sua soluzione di base: $x_{ij}=0$ su $L$, $x_{ij}=u_{ij}$ su $U$ e $\mat{B}\vet{x}=\vet{b}$.

    - La struttura ad albero è <strong>ammissibile</strong> se $0 \le x_{ij} \le u_{ij}$ su ogni arco di $T$.

    - Una struttura ad albero ammissibile è <strong>degenere</strong> se qualche arco di $T$ ha $x_{ij}=0$ o $x_{ij}=u_{ij}$.

!!! attenzione "Base e stato dei limiti"

    - L'albero $T$ è la base. Gli insiemi $L$ e $U$ dicono soltanto a quale limite sta ciascun arco fuori base.

    - Un arco di $U$ è fuori base, anche se il suo flusso $u_{ij}$ è positivo. Un arco di $T$ può avere flusso $0$ o $u_{ij}$: la soluzione ad albero è allora degenere, ma l'arco resta di base.

<a id="box-7-ns-prop-leaves"></a>

!!! teorema "Proposizione 8.6: la soluzione ad albero dalle foglie"

    Sia $(T,L,U)$ una struttura ad albero, e siano <strong>bilanci residui</strong>

    $$
    \hat{b}_i=b_i-\sum_{(i,j) \in U}u_{ij}+\sum_{(j,i) \in U}u_{ji}, \qquad \forall i \in N.
    $$

    Finché restano archi dell'albero: si prende una foglia $\ell \neq n$ dell'albero rimasto, con il suo arco $a$ dell'albero e il suo vicino $j$; si pone $x_a=\hat{b}_\ell$ se $a=(\ell,j)$ e $x_a=-\hat{b}_\ell$ se $a=(j,\ell)$; si somma $\hat{b}_\ell$ a $\hat{b}_j$; si eliminano $\ell$ e $a$. I valori ottenuti, con $x=0$ su $L$ e $x=u$ su $U$, sono la soluzione ad albero.

??? dimostrazione "Dimostrazione"

    Il bilancio residuo $\hat{b}_i$ è il bilancio del nodo $i$ dopo aver portato al termine noto i flussi sugli archi di $U$. Mostriamo che ogni passo mantiene questo invariante: gli archi dell'albero rimasti devono soddisfare la conservazione con i bilanci residui correnti.

    1. Nella foglia $\ell$ l'unica incognita rimasta è $x_a$, quindi il vincolo di conservazione di $\ell$ diventa $x_a= \hat{b}_\ell$ se $\ell$ è la coda di $a$, e $-x_a=\hat{b}_\ell$ se $\ell$ è la sua testa.

    2. Nel vincolo di $j$ l'arco $a$ compare con $-x_a$ se $a=(\ell,j)$ e con $+x_a$ se $a=(j,\ell)$. Portare il termine noto al secondo membro somma $x_a=\hat{b}_\ell$ o $-x_a=\hat{b}_\ell$ a $\hat{b}_j$.

    3. Un albero con almeno due nodi ha una foglia diversa da $n$ ([Lemma «foglie» del Capitolo 1](../../grafi/graphs/alberi-e-foreste.md)), quindi la procedura termina con il solo nodo $n$. Il suo vincolo vale per il <span style="color:#1971c2">[Lemma 8.2](l-algoritmo-del-simplesso-sul-modello-di-flusso-di-costo-min.md#box-2-ns-lem-redundant)</span>, e la soluzione è unica per il <span style="color:#1971c2">[Teorema 8.3](#box-4-ns-th-bases)</span>. <span class="qed">□</span>

- Negli esempi la foglia è sempre quella con l'<strong>indice minimo</strong> diverso da $n$.

- Ogni foglia passa il suo bilancio residuo al suo vicino. Quindi il flusso su un arco dell'albero è uguale alla somma dei bilanci residui dei nodi che l'arco separa da $n$, come nel [Lemma «flusso attraverso un taglio» del Capitolo 4](../../flussi/network-flow-models/reti-e-flussi.md).

<a id="box-8-ns-ex-tree"></a>

!!! esempio "Esempio 8.2: il flusso $\bar{\vet{x}}$ del Capitolo 4 come soluzione ad albero"

    Usiamo la rete di riferimento del [Capitolo 4](../../flussi/network-flow-models/reti-e-flussi.md), con $\vet{b}=(5,2,0,-3,0,-4)$ e

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
    <td><span class="arithmatex">\(c_{ij}\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
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

    Prendiamo $T=\{(1,2),(2,4),(3,2),(4,6),(5,4)\}$, $U=\{(1,3),(3,5),(5,6)\}$ e $L=\{(4,3)\}$. I bilanci residui sono

    $$
    \hat{\vet{b}}=(5-4,\;2,\;0+4-4,\;-3,\;0+4-2,\;-4+2)=(1,2,0,-3,2,-2).
    $$

    Le foglie vengono eliminate nell'ordine $1,3,2,5,4$:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>foglia <span class="arithmatex">\(\ell\)</span></th>
    <th>arco dell'albero</th>
    <th>flusso</th>
    <th>bilancio residuo del vicino</th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\((1,2)\)</span></td>
    <td><span class="arithmatex">\(x_{12}=\hat{b}_1=1\)</span></td>
    <td><span class="arithmatex">\(\hat{b}_2=2+1=3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\((3,2)\)</span></td>
    <td><span class="arithmatex">\(x_{32}=\hat{b}_3=0\)</span></td>
    <td><span class="arithmatex">\(\hat{b}_2=3+0=3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\((2,4)\)</span></td>
    <td><span class="arithmatex">\(x_{24}=\hat{b}_2=3\)</span></td>
    <td><span class="arithmatex">\(\hat{b}_4=-3+3=0\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\((5,4)\)</span></td>
    <td><span class="arithmatex">\(x_{54}=\hat{b}_5=2\)</span></td>
    <td><span class="arithmatex">\(\hat{b}_4=0+2=2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\((4,6)\)</span></td>
    <td><span class="arithmatex">\(x_{46}=\hat{b}_4=2\)</span></td>
    <td><span class="arithmatex">\(\hat{b}_6=-2+2=0\)</span></td>
    </tr>
    </table></div>

    La soluzione ad albero è il flusso $\bar{\vet{x}}=(1,4,3,0,4,0,2,2,2)$ del Capitolo 4, con costo $63$. Nella figura gli archi dell'albero sono blu, gli archi di $U$ rossi e l'arco di $L$ grigio e tratteggiato; su ogni arco è indicato $x_{ij}/u_{ij}$.

    ![Figura 1](../../img/network-simplex/fig01.svg){ .fig loading=lazy  }

    L'arco $(3,2)$ dell'albero ha flusso $0$: la struttura ad albero è ammissibile e degenere.

!!! chiave ""

    Le basi del modello $\mathrm{MCF}$ sono gli alberi ricoprenti, e le loro matrici sono triangolari con determinante $\pm 1$. Una soluzione ad albero fissa gli archi di $L$ a $0$ e quelli di $U$ alla loro capacità, e i flussi sugli archi dell'albero si ottengono dalle foglie.

---

**Avanti:** [8.3 Potenziali e ottimalità](potenziali-e-ottimalita.md)
