---
title: "Il perno"
---

# 8.4 Il perno { #sez-sec-ns-pivot }

<div class="info-capitolo" markdown>

**Parte 4 · Il simplesso su reti · Capitolo 8** · [:material-book-open-variant: Capitolo 8: Simplesso su reti](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-simplesso-su-reti.pdf) · [:material-pencil: Esercizi: Simplesso su reti](../../esercizi/network-simplex.md)

</div>

<a id="box-14-ns-def-pivot"></a>

!!! definizione "Definizione 8.11: il perno della rete simplex"

    Sia $(T,L,U)$ una struttura ad albero ammissibile, con soluzione ad albero $\vet{x}$ e potenziali $\vet{\pi}$.

    - Un arco è <strong>idoneo</strong> se è in $L$ con $\bar{c}_{ij}<0$ o in $U$ con $\bar{c}_{ij}>0$. Il <strong>arco in entrata</strong> $e=(k,l)$ è l'arco idoneo con il $|\bar{c}_{ij}|$ più grande; se più di uno, il primo entrato ordine lessicografo.

    - Il <strong>ciclo del pivot</strong> $C$ è il ciclo fondamentale di $e$, percorso nella direzione di $e$ se $e \in L$, e nella direzione opposta se $e \in U$.

    - La <strong>capacità residua</strong> di un arco di $C$ è $u_{ij}-x_{ij}$ se l'arco è in avanti ($+\infty$ se $u_{ij}=+\infty$) e $x_{ij}$ se è all'indietro. <strong>step</strong> $\theta$ è la capacità residua minima lungo $C$ e gli archi che lo raggiungono sono <strong>bloccanti</strong>.

    - Il <strong>apex</strong> $w$ di $C$ è il primo nodo condiviso dai percorsi dell'albero da $k$ e da $l$ alla radice $n$. Lo <strong>arco di uscita</strong> $f$ è l'ultimo arco di blocco incontrato quando $C$ viene attraversato nella sua direzione a partire da $w$.

    Un pivot con $\theta=0$ è <strong>degenerato</strong>.

- L'invio di unità $\theta$ lungo $C$ aumenta il flusso sugli archi in avanti e lo diminuisce sugli archi all'indietro. L'arco entrante è avanti se è in $L$, il cui flusso deve aumentare, e indietro se è in $U$, il cui flusso deve diminuire.

- Lascia che $p$ e $q$ siano i punti finali di $e$ nella direzione di $C$: $p=k$, $q=l$ se $e \in L$ e $p=l$, $q=k$ se $e \in U$. Partendo dall'apice, $C$ segue il percorso dell'albero da $w$ fino a $p$, l'arco $e$ da $p$ a $q$ e il percorso dell'albero da $q$ fino a $w$.

- L'arco in entrata è un candidato per uscire: la sua capacità residua è $u_{kl}$, quindi $\theta \le u_{kl}$.

<a id="box-15-ns-prop-pivot"></a>

!!! teorema "Proposizione 8.12: il perno"

    Nell'impostazione di <span style="color:#1971c2">[Definizione 8.11](#box-14-ns-def-pivot)</span>, lascia che $\theta<+\infty$ e $\vet{x}'$ siano ottenuti da $\vet{x}$ aggiungendo $\theta$ sugli archi anteriori di $C$ e sottraendo $\theta$ sugli archi posteriori.

    - **(a)** $\vet{x}'$ è un flusso ammissibile e $\vet{c}'\vet{x}'=\vet{c}'\vet{x}-\theta\,|\bar{c}_{kl}|$.

    - **(b)** $T'=T \cup \{e\} \setminus \{f\}$ è uno albero ricoprente e $\vet{x}'$ è la soluzione ad albero della struttura $(T',L',U')$, dove $f$ va a $U$ se è avanti in $C$ e a $L$ se è indietro. Se $f=e$, allora $T'=T$ e $e$ si sposta da $L$ a $U$ o da $U$ a $L$.

??? dimostrazione "Dimostrazione"

    Sia $\varepsilon_a=+1$ sugli archi anteriori e $-1$ sugli archi posteriori di $C$, e sia $\vet{x}^C$ il vettore di incidenza con segno di $C$, con $x^C_a=\varepsilon_a$ su $C$ e $0$ altrove: quindi $\vet{x}'=\vet{x}+\theta \vet{x}^C$.

    1. <em>Conservazione.</em> $\mat{B}\vet{x}^C=\sum_{a \in C}\varepsilon_a\mat{B}_a=\vet{0}$ di [Capitolo 1, Lemma «colonne di un ciclo»](../../grafi/graphs/il-rango-della-matrice-di-incidenza.md), quindi $\mat{B}\vet{x}'=\vet{b}$.

    2. <em>Limiti.</em> Un arco in avanti aumenta di $\theta \le u_{ij}-x_{ij}$, un arco all'indietro diminuisce di $\theta \le x_{ij}$, gli altri archi non cambiano.

    3. <em>Costo.</em> $\vet{c}'\vet{x}'-\vet{c}'\vet{x}=\theta\,c(C)=\theta\,\varepsilon_e\bar{c}_{kl}$ di <span style="color:#1971c2">[Lemma 8.9](potenziali-e-ottimalita.md#box-11-ns-lem-cycle)</span>, poiché gli archi dell'albero hanno $\bar{c}_{ij}=0$. If $e \in L$, then $\varepsilon_e=+1$ e $\bar{c}_{kl}<0$; se $e \in U$, allora $\varepsilon_e=-1$ e $\bar{c}_{kl}>0$. In entrambi i casi $\varepsilon_e\bar{c}_{kl} =-|\bar{c}_{kl}|$.

    4. <em>Il nuovo albero.</em> $C$ è l'unico ciclo di $T \cup \{e\}$ ([Capitolo 1, Proposizione «ciclo fondamentale»](../../grafi/graphs/alberi-e-foreste.md)). La rimozione di $f \in C$ lascia un grafo connesso, poiché il resto di $C$ si unisce ancora ai punti finali di $f$; ha archi $n-1$, quindi è uno albero ricoprente (Teorema «caratterizzazioni di un albero»(b)).

    5. <em>La nuova soluzione ad albero.</em> Gli archi non di base diversi da $e$ e $f$ mantengono il loro flusso e il loro limite. L'arco $f$ sta bloccando, quindi dopo il passaggio $x'_f=u_f$ se è avanti e $x'_f=0$ se è indietro. Hence $\vet{x}'$ satisfies $\mat{B}\vet{x}'=\vet{b}$ e i limiti fissati da $(T',L',U')$, ed è la soluzione ad albero di <span style="color:#1971c2">[Teorema 8.3](basi-e-alberi-ricoprenti.md#box-4-ns-th-bases)</span>. <span class="qed">□</span>

<a id="box-16-ns-prop-update"></a>

!!! teorema "Proposizione 8.13: l'aggiornamento dei potenziali"

    Nel pivot di <span style="color:#1971c2">[Proposizione 8.12](#box-15-ns-prop-pivot)</span>, sia $f \neq e$ e $R$ e $S$ siano gli insiemi di nodi dei due componenti di $T \setminus \{f\}$, con $n \in R$. Quindi $e$ ha un endpoint in $R$ e uno in $S$ e il i potenziali di $T'$ sono

    $$
    \pi'_i=\pi_i, \quad \forall i \in R, \qquad\qquad
    \pi'_i=\begin{cases} \pi_i-\bar{c}_{kl} & \text{se } l \in S,\\ \pi_i+\bar{c}_{kl} & \text{se } k \in S, \end{cases}
    \quad \forall i \in S .
    $$

??? dimostrazione "Dimostrazione"

    L'albero $T'$ è connesso e $T' \setminus \{e\}=T \setminus \{f\}$ non ha arco tra $R$ e $S$: quindi $e$ si unisce $R$ e $S$. Verifichiamo che i valori $\pi'$ dell'enunciato siano i potenziali di $T'$, che sono unici per <span style="color:#1971c2">[Lemma 8.8](potenziali-e-ottimalita.md#box-10-ns-lem-multipliers)</span>.

    1. Gli archi di $T' \setminus \{e\}$ hanno entrambi i punti finali in $R$ o entrambi in $S$, dove tutti i potenziali cambiano secondo stesso importo: il loro costo ridotto resta $0$.

    2. Se $l \in S$, allora $c_{kl}-\pi'_k+\pi'_l=c_{kl}-\pi_k+\pi_l-\bar{c}_{kl}=0$. Se $k \in S$, allora $c_{kl}-\pi'_k+ \pi'_l=c_{kl}-\pi_k-\bar{c}_{kl}+\pi_l=0$.

    3. La radice $n$ è in $R$, quindi $\pi'_n=\pi_n=0$. <span class="qed">□</span>

- Cambiano solo i potenziali del sottoalbero $S$ tagliato da $f$, tutti della stessa quantità. Se $f=e$, l'albero e il i potenziali non cambiano

- I costi ridotti cambiano solo sugli archi con un punto finale in $R$ e l'altro in $S$.

<a id="box-17-ns-prop-unbounded"></a>

!!! teorema "Proposizione 8.14: problema illimitato"

    Se $\theta=+\infty$, allora $e \in L$, il ciclo $C$ è un ciclo diretto i cui archi hanno capacità infinita, il suo costo è $-|\bar{c}_{kl}|<0$ e il modello $\mathrm{MCF}$ non ha limiti.

??? dimostrazione "Dimostrazione"

    Un arco all'indietro ha la capacità residua finita $x_{ij}$, mentre un arco in avanti con capacità finita ha la capacità finita capacità residua $u_{ij}-x_{ij}$. Quindi ogni arco di $C$ va avanti con $u_{ij}=+\infty$; in particolare $e$ è avanti, so $e \in L$. Come in <span style="color:#1971c2">[Proposizione 8.12](#box-15-ns-prop-pivot)</span>, $\vet{x}+t\vet{x}^C$ è fattibile per ogni $t \ge 0$, con costo $\vet{c}'\vet{x}-t\,|\bar{c}_{kl}|$ che tende a $-\infty$. <span class="qed">□</span>

<a id="box-18-ns-ex-pivot"></a>

!!! esempio "Esempio 8.4: un pivot dall'albero di $\bar{\vet{x}}$"

    Continuiamo <span style="color:#1971c2">[Esempio 8.3](potenziali-e-ottimalita.md#box-13-ns-ex-potentials)</span>. Gli archi idonei sono $(1,3)$ e $(3,5)$, entrambi in $U$, con $\bar{c}_{13}=2$ e $\bar{c}_{35}=1$.

    - <em>Entrata nell'arco.</em> Il più grande $|\bar{c}_{ij}|$ è $2$: $e=(1,3)$. È in $U$, quindi $C$ viene attraversato $(1,3)$: $p=3$ e $q=1$.

    - <em>Apex.</em> I percorsi dell'albero fino alla radice sono $1,2,4,6$ e $3,2,4,6$: l'apice è $w=2$. Da $w$ il ciclo va $2 \to 3$ lungo $(3,2)$, $3 \to 1$ lungo $(1,3)$, $1 \to 2$ lungo $(1,2)$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <td>arco di <span class="arithmatex">\(C\)</span></td>
        <td><span class="arithmatex">\((3,2)\)</span></td>
        <td><span class="arithmatex">\((1,3)\)</span></td>
        <td><span class="arithmatex">\((1,2)\)</span></td>
        </tr>
        <tr>
        <td>direzione</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(+\)</span></td>
        </tr>
        <tr>
        <td>residuo</td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        </table></div>

    - <em>Passo e uscita dall'arco.</em> $\theta=\min\{0,4,3\}=0$ e l'unico arco bloccante è $(3,2)$: lascia l'albero, all'indietro, quindi va a $L$. Il perno è degenerato.

    - <em>Aggiornamento.</em> Il flusso non cambia e il costo rimane $63$. Il nuovo albero è $T'=\{(1,2),(1,3),(2,4),(4,6),(5,4)\}$, dove $(1,3)$ è un arco base alla sua capacità. La rimozione di $(3,2)$ da $T$ interrompe $S=\{3\}$, che contiene $l=3$: $\pi'_3=\pi_3-\bar{c}_{13}=12-2=10$.

    Nella figura gli archi di $C$ sono viola, l'arco entrante è tratteggiato; accanto ad ogni nodo il suo potenziale.

    ![Figura 2](../../img/network-simplex/fig02.svg){ .fig loading=lazy  }

!!! chiave ""

    Un perno invia le unità $\theta$ attorno al ciclo fondamentale dell'arco entrante, orientato in modo che il suo flusso si allontani da è limitato; il costo diminuisce di $\theta|\bar{c}_{kl}|$. L'arco uscente è l'ultimo arco bloccante dall'apice e cambiano solo i potenziali del sottoalbero che taglia.

---

**Avanti:** [8.5 L'algoritmo del simplesso di rete](l-algoritmo-del-simplesso-di-rete.md)
