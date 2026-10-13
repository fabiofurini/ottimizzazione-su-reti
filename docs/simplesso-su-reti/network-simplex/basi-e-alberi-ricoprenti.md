---
title: "Basi e alberi ricoprenti"
---

# 8.2 Basi e alberi ricoprenti { #sez-sec-ns-trees }

<div class="info-capitolo" markdown>

**Parte 4 · Il simplesso su reti · Capitolo 8** · [:material-book-open-variant: Capitolo 8: Simplesso su reti](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-simplesso-su-reti.pdf) · [:material-pencil: Esercizi: Simplesso su reti](../../esercizi/network-simplex.md)

</div>

<a id="box-4-ns-th-bases"></a>

!!! teorema "Teorema 8.3: le basi sono gli albero ricoprente"

    Lascia che il grafo non orientato sottostante di $G=(N,A)$ sia connesso. Un insieme $T$ di archi $n-1$ è una base se e solo se è un albero di copertura. Inoltre, per uno albero ricoprente $T$ le righe e le colonne di $\mat{M}_T$ possono essere ordinate in modo che la matrice è triangolare inferiore con voci diagonali $\pm 1$ e $\det(\mat{M}_T)=\pm 1$.

??? dimostrazione "Dimostrazione"

    Utilizziamo i risultati di [Capitolo 1 «Grafi»](../../grafi/graphs/index.md).

    1. <em>Le colonne di $T$ in $\mat{M}$ e in $\mat{B}$ sono indipendenti insieme.</em> La voce del nodo $n$ di $\sum_{a \in T}\lambda_a\mat{B}_a$ è meno la somma delle altre voci, poiché la somma delle righe di $\mat{B}$ dà come risultato zero. Quindi $\sum_{a \in T}\lambda_a\mat{M}_a=\vet{0}$ se e solo se $\sum_{a \in T}\lambda_a\mat{B}_a=\vet{0}$.

    2. <em>Un albero ricoprente è una base.</em> Le sue colonne in $\mat{B}$ sono linearmente indipendenti dal Lemma «colonne di a foresta».

    3. <em>Una base è uno albero ricoprente.</em> Se gli archi $n-1$ di $T$ fossero aciclici, formerebbero uno albero ricoprente Teorema «caratterizzazioni di un albero»(c). Altrimenti $T$ contiene un ciclo, le cui colonne sono linearmente dipendenti da Lemma «colonne di un ciclo», e $T$ non è una base.

    4. <em>Forma triangolare.</em> Per induzione su $n$; per $n=2$ la matrice è $1 \times 1$ con voce $\pm 1$. Per $n \ge 3$ l'albero ha almeno due foglie (Lemma «foglie»), quindi ha una foglia $\ell \neq n$, con il suo unico arco arboreo $a_\ell$. La riga $\ell$ di $\mat{M}_T$ ha la singola voce diversa da zero $\pm 1$, nella colonna di $a_\ell$.

    5. Inserisci prima la riga $\ell$ e la colonna di $a_\ell$. La loro eliminazione lascia la matrice costruita allo stesso modo per lo albero ricoprente $T \setminus \{a_\ell\}$ dei nodi $N \setminus \{\ell\}$, che contengono ancora $n$: per induzione esso può essere ordinato nella forma triangolare inferiore. Espansione lungo la prima fila, $\det(\mat{M}_T)=\pm 1$. <span class="qed">□</span>

<a id="box-5-ns-cor-integer"></a>

!!! teorema "Corollario 8.4: soluzioni di alberi interi"

    Se i saldi e le capacità finite sono interi, ogni soluzione base del modello $\mathrm{MCF}$ è intera.

??? dimostrazione "Dimostrazione"

    Il lato destro $\vet{h}-\sum_{a \in U}\mat{M}_au_a$ è intero e $\det(\mat{M}_T)=\pm 1$ per <span style="color:#1971c2">[Teorema 8.3](#box-4-ns-th-bases)</span>: per la regola di Cramer ogni variabile base è un numero intero. Questo è il integralità di [Capitolo 4 «Flusso di rete modelli»](../../flussi/network-flow-models/index.md), visti sulle basi. <span class="qed">□</span>

<a id="box-6-ns-def-tree"></a>

!!! definizione "Definizione 8.5: struttura ad albero e soluzione ad albero"

    Sia $T$ uno albero ricoprente di $G$. Una <strong>struttura ad albero</strong> è una tripla $(T,L,U)$, dove la partizione $L$ e $U$ $A \setminus T$ e ogni arco di $U$ hanno una capacità finita. La sua <strong>tree solution</strong> è la sua soluzione di base: $x_{ij}=0$ su $L$, $x_{ij}=u_{ij}$ su $U$ e $\mat{B}\vet{x}=\vet{b}$.

    - La struttura ad albero è <strong>ammissibile</strong> se $0 \le x_{ij} \le u_{ij}$ su ogni arco di $T$.

    - Una struttura ad albero ammissibile è <strong>degenerata</strong> se qualche arco di $T$ ha $x_{ij}=0$ o $x_{ij}=u_{ij}$.

!!! attenzione "Base e stato associato"

    - L'albero $T$ è la base. Gli insiemi $L$ e $U$ dicono solo su quale limite si trova ciascun arco non di base.

    - Un arco di $U$ non è basico, sebbene il suo flusso $u_{ij}$ sia positivo. Un arco di $T$ può avere flusso $0$ o $u_{ij}$: la soluzione dell'albero è quindi degenere, ma l'arco è ancora fondamentale.

<a id="box-7-ns-prop-leaves"></a>

!!! teorema "Proposizione 8.6: la soluzione per l'albero dalle foglie"

    Sia $(T,L,U)$ una struttura ad albero e siano <strong>saldi residui</strong>

    $$
    \hat{b}_i=b_i-\sum_{(i,j) \in U}u_{ij}+\sum_{(j,i) \in U}u_{ji}, \qquad \forall i \in N.
    $$

    Ripetere fino a quando non rimane più alcun arco di albero: prendere una foglia $\ell \neq n$ dell'albero rimanente, con il suo arco di albero $a$ e il suo vicino $j$; impostare $x_a=\hat{b}_\ell$ se $a=(\ell,j)$ e $x_a=-\hat{b}_\ell$ se $a=(j,\ell)$; aggiungi $\hat{b}_\ell$ a $\hat{b}_j$; eliminare $\ell$ e $a$. I valori ottenuti, con $x=0$ su $L$ e $x=u$ su $U$, sono la soluzione dell'albero.

??? dimostrazione "Dimostrazione"

    Il saldo residuo $\hat{b}_i$ è il saldo del nodo $i$ una volta che i flussi sugli archi di $U$ vengono spostati sul lato destro. Dimostriamo che ogni passo mantiene questa invarianza: i restanti archi degli alberi devono soddisfare la conservazione con il saldi residui correnti.

    1. Alla foglia $\ell$ l'unica incognita rimasta è $x_a$, quindi il vincolo di conservazione di $\ell$ legge $x_a= \hat{b}_\ell$ se $\ell$ è la coda di $a$ e $-x_a=\hat{b}_\ell$ se $\ell$ è la sua testa.

    2. Nel vincolo di $j$ compare l'arco $a$ con $-x_a$ se $a=(\ell,j)$ e con $+x_a$ se $a=(j,\ell)$. Moving il termine noto sul lato destro aggiunge $x_a=\hat{b}_\ell$ o $-x_a=\hat{b}_\ell$ a $\hat{b}_j$.

    3. Un albero con almeno due nodi ha una foglia diversa da $n$ ([Capitolo 1, Lemma «foglie»](../../grafi/graphs/alberi-e-foreste.md)), quindi la procedura termina con il solo nodo $n$. Il suo vincolo è mantenuto da<span style="color:#1971c2">[Lemma 8.2](l-algoritmo-del-simplesso-sul-modello-del-flusso-di-costo-mi.md#box-2-ns-lem-redundant)</span>, e la soluzione è unica per <span style="color:#1971c2">[Teorema 8.3](#box-4-ns-th-bases)</span>. <span class="qed">□</span>

- Negli esempi l'anta è sempre quella con <strong>indice più piccolo</strong> diverso da $n$.

- Ogni foglia trasferisce il suo saldo residuo alla vicina. Quindi il flusso su un arco di albero è uguale al residuo totale equilibrio dei nodi che l'arco separa da $n$, come in [Capitolo 4, Lemma «flusso attraverso un taglio»](../../flussi/network-flow-models/reti-e-flussi.md).

<a id="box-8-ns-ex-tree"></a>

!!! esempio "Esempio 8.2: il flusso $\bar{\vet{x}}$ del capitolo 4 come soluzione ad albero"

    Utilizziamo la rete di riferimento di [Capitolo 4](../../flussi/network-flow-models/reti-e-flussi.md), con $\vet{b}=(5,2,0,-3,0,-4)$ e

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

    Prendi $T=\{(1,2),(2,4),(3,2),(4,6),(5,4)\}$, $U=\{(1,3),(3,5),(5,6)\}$ e $L=\{(4,3)\}$. I saldi residui sono

    $$
    \hat{\vet{b}}=(5-4,\;2,\;0+4-4,\;-3,\;0+4-2,\;-4+2)=(1,2,0,-3,2,-2).
    $$

    Le ante vengono lavorate nell'ordine $1,3,2,5,4$:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>foglia <span class="arithmatex">\(\ell\)</span></th>
    <th>arco dell'albero</th>
    <th>flusso</th>
    <th>saldo residuo del vicino</th>
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

    La soluzione ad albero è il flusso $\bar{\vet{x}}=(1,4,3,0,4,0,2,2,2)$ del Capitolo 4, con costo $63$. Nella figura il gli archi degli alberi sono blu, gli archi di $U$ rossi e l'arco di $L$ grigio e tratteggiato; ogni arco trasporta $x_{ij}/u_{ij}$.

    ![Figura 1](../../img/network-simplex/fig01.svg){ .fig loading=lazy  }

    L'arco dell'albero $(3,2)$ ha flusso $0$: la struttura dell'albero è fattibile e degenere.

!!! chiave ""

    Le basi del modello $\mathrm{MCF}$ sono gli albero ricoprente e le loro matrici sono triangolari con determinante $\pm 1$. A la soluzione ad albero fissa gli archi di $L$ a $0$ e quelli di $U$ alla loro capacità, e seguono i flussi sugli archi dell'albero dalle foglie.

---

**Avanti:** [8.3 Potenziali e ottimalità](potenziali-e-ottimalita.md)
