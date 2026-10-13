---
title: "Basi e alberi ricoprenti"
---

# 8.2 Basi e alberi ricoprenti { #sez-sec-ns-trees }

<div class="info-capitolo" markdown>

**Parte 4 · Il simplesso su reti · Capitolo 8** · [:material-book-open-variant: Capitolo 8: Simplesso su reti](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-simplesso-su-reti.pdf) · [:material-pencil: Esercizi: Simplesso su reti](../../esercizi/network-simplex.md)

</div>

<a id="box-4-ns-th-bases"></a>

!!! teorema "Teorema 8.3: le basi corrispondono agli alberi ricoprenti"

    Supponiamo che il grafo non orientato sottostante a $G=(N,A)$ sia connesso. Un insieme $T$ di $n-1$ archi è una base se e solo se è un albero ricoprente. Inoltre, per ogni albero ricoprente $T$ si possono ordinare le righe e le colonne di $\mat{M}_T$ in modo che la matrice sia triangolare inferiore, con elementi diagonali pari a $\pm 1$; dunque $\det(\mat{M}_T)=\pm 1$.

??? dimostrazione "Dimostrazione"

    Utilizziamo i risultati di [Capitolo 1 «Grafi»](../../grafi/graphs/index.md).

    1. <em>Indipendenza delle colonne.</em> Ogni combinazione lineare delle colonne di $\mat{B}$ ha somma delle componenti uguale a zero. Perciò, se le prime $n-1$ componenti sono nulle, lo è anche la componente $n$. Ne segue che le colonne di $\mat{M}_T$ sono indipendenti se e solo se lo sono le corrispondenti colonne di $\mat{B}$.

    2. <em>Un albero ricoprente è una base.</em> Le colonne di $\mat{B}$ associate agli archi di un albero ricoprente sono linearmente indipendenti, per il Lemma «Colonne di una foresta».

    3. <em>Una base è un albero ricoprente.</em> Se gli $n-1$ archi di $T$ non formassero un albero ricoprente, per la caratterizzazione degli alberi del Capitolo 1 conterrebbero un ciclo. Le colonne associate a un ciclo sono linearmente dipendenti (Lemma «Colonne di un ciclo»), quindi $T$ non sarebbe una base.

    4. <em>Forma triangolare.</em> Procediamo per induzione su $n$. Per $n=2$, $\mat{M}_T$ è una matrice $1 \times 1$ con elemento $\pm 1$. Per $n\ge 3$, l'albero ha almeno due foglie (Lemma «Foglie»); scegliamone una $\ell\neq n$ e indichiamo con $a_\ell$ il suo unico arco. Nella riga $\ell$ di $\mat{M}_T$ l'unico elemento non nullo è $\pm 1$, nella colonna di $a_\ell$.

    5. Ordiniamo per prima la riga $\ell$ e per prima la colonna di $a_\ell$. Eliminandole, resta la matrice associata all'albero ricoprente $T\setminus\{a_\ell\}$ sui nodi $N\setminus\{\ell\}$, che contiene ancora $n$. Per induzione, questa sottomatrice si può ordinare in forma triangolare inferiore. Sviluppando il determinante lungo la prima riga, otteniamo $\det(\mat{M}_T)=\pm 1$. <span class="qed">□</span>

<a id="box-5-ns-cor-integer"></a>

!!! teorema "Corollario 8.4: soluzioni di alberi interi"

    Se i saldi e le capacità finite sono interi, ogni soluzione base del modello $\mathrm{MCF}$ è intera.

??? dimostrazione "Dimostrazione"

    Il termine noto $\vet{h}-\sum_{a \in U}\mat{M}_a u_a$ è intero e, per <span style="color:#1971c2">[Teorema 8.3](#box-4-ns-th-bases)</span>, $\det(\mat{M}_T)=\pm1$. Per la regola di Cramer, tutte le variabili di base sono quindi intere. È il risultato di integralità del [Capitolo 4](../../flussi/network-flow-models/index.md), applicato alle soluzioni di base. <span class="qed">□</span>

<a id="box-6-ns-def-tree"></a>

!!! definizione "Definizione 8.5: struttura ad albero e soluzione ad albero"

    Sia $T$ un albero ricoprente di $G$. Una <strong>struttura ad albero</strong> è una tripla $(T,L,U)$, dove $L$ e $U$ formano una partizione di $A\setminus T$ e ogni arco in $U$ ha capacità finita. La <strong>soluzione ad albero</strong> associata è la soluzione di base definita da $x_{ij}=0$ sugli archi in $L$, $x_{ij}=u_{ij}$ sugli archi in $U$ e $\mat{B}\vet{x}=\vet{b}$.

    - La struttura ad albero è <strong>ammissibile</strong> se $0 \le x_{ij} \le u_{ij}$ su ogni arco di $T$.

    - Una struttura ad albero ammissibile è <strong>degenerata</strong> se qualche arco di $T$ ha $x_{ij}=0$ o $x_{ij}=u_{ij}$.

!!! attenzione "Base e stato associato"

    - L'albero $T$ è la base. Gli insiemi $L$ e $U$ indicano soltanto a quale limite è fissato ciascun arco fuori base.

    - Un arco in $U$ è fuori base anche quando il suo flusso $u_{ij}$ è positivo. Un arco di $T$ può invece avere flusso $0$ oppure $u_{ij}$: in tal caso la soluzione ad albero è degenere, ma l'arco rimane di base.

<a id="box-7-ns-prop-leaves"></a>

!!! teorema "Proposizione 8.6: calcolo della soluzione ad albero eliminando le foglie"

    Sia $(T,L,U)$ una struttura ad albero e siano <strong>saldi residui</strong>

    $$
    \hat{b}_i=b_i-\sum_{(i,j) \in U}u_{ij}+\sum_{(j,i) \in U}u_{ji}, \qquad \forall i \in N.
    $$

    Finché restano archi dell'albero, scegli una foglia $\ell\neq n$ dell'albero residuo; siano $a$ il suo unico arco e $j$ il nodo adiacente. Poni $x_a=\hat{b}_\ell$ se $a=(\ell,j)$ e $x_a=-\hat{b}_\ell$ se $a=(j,\ell)$; aggiorna $\hat{b}_j$ aggiungendovi $\hat{b}_\ell$; infine elimina $\ell$ e $a$. I valori così ottenuti, insieme a $x=0$ sugli archi in $L$ e $x=u$ su quelli in $U$, costituiscono la soluzione ad albero.

??? dimostrazione "Dimostrazione"

    Il saldo residuo $\hat{b}_i$ è il saldo del nodo $i$ dopo aver trasferito al termine noto i flussi sugli archi di $U$. Mostriamo che ogni passo conserva questa proprietà: gli archi dell'albero rimasti devono soddisfare i vincoli di conservazione con i saldi residui correnti.

    1. Alla foglia $\ell$ l'unica incognita rimasta è $x_a$, quindi il vincolo di conservazione di $\ell$ legge $x_a= \hat{b}_\ell$ se $\ell$ è la coda di $a$ e $-x_a=\hat{b}_\ell$ se $\ell$ è la sua testa.

    2. Nel vincolo del nodo $j$, il coefficiente di $x_a$ è $-1$ se $a=(\ell,j)$ e $+1$ se $a=(j,\ell)$. Trasferendo il termine noto al secondo membro, il saldo residuo $\hat{b}_j$ aumenta di $x_a=\hat{b}_\ell$ oppure di $-x_a=\hat{b}_\ell$, rispettivamente.

    3. Ogni albero con almeno due nodi ha una foglia diversa da $n$ ([Lemma «Foglie» del Capitolo 1](../../grafi/graphs/alberi-e-foreste.md)); quindi la procedura termina quando resta il solo nodo $n$. Il suo vincolo è automaticamente soddisfatto per <span style="color:#1971c2">[Lemma 8.2](l-algoritmo-del-simplesso-sul-modello-del-flusso-di-costo-mi.md#box-2-ns-lem-redundant)</span>, e la soluzione è unica per <span style="color:#1971c2">[Teorema 8.3](#box-4-ns-th-bases)</span>. <span class="qed">□</span>

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

    Le basi del modello $\mathrm{MCF}$ corrispondono agli alberi ricoprenti e le relative matrici hanno determinante $\pm1$. La soluzione ad albero fissa a $0$ i flussi sugli archi in $L$ e alla capacità quelli sugli archi in $U$; i flussi sugli archi dell'albero si calcolano eliminando le foglie.

---

**Avanti:** [8.3 Potenziali e ottimalità](potenziali-e-ottimalita.md)
