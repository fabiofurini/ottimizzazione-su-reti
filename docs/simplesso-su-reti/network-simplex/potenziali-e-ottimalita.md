---
title: "Potenziali e ottimalità"
---

# 8.3 Potenziali e ottimalità { #sez-sec-ns-optimality }

<div class="info-capitolo" markdown>

**Parte 4 · Il simplesso su reti · Capitolo 8** · [:material-book-open-variant: Capitolo 8: Simplesso su reti](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-simplesso-su-reti.pdf) · [:material-pencil: Esercizi: Simplesso su reti](../../esercizi/network-simplex.md)

</div>

<a id="box-9-ns-def-potentials"></a>

!!! definizione "Definizione 8.7: potenziali di un albero"

    Sia $T$ un albero ricoprente di $G$. Il nodo $n$ è la <strong>radice</strong> di $T$. I <strong>potenziali</strong> di $T$ sono i valori $\pi_i$, per $i\in N$, tali che

    $$
    \bar{c}_{ij}=c_{ij}-\pi_i+\pi_j=0, \quad \forall (i,j) \in T, \qquad\qquad \pi_n=0 .
    $$

- Calcoliamo i potenziali a partire dalla radice, come nel certificato del [Capitolo 4](../../flussi/network-flow-models/un-istanza-di-traslato.md): poniamo $\pi_n=0$ e, per ogni arco $(i,j)$ dell'albero con un potenziale già noto, ricaviamo $\pi_j=\pi_i-c_{ij}$ oppure $\pi_i=\pi_j+c_{ij}$.

- La normalizzazione $\pi_n=0$ corrisponde alla riga cancellata del nodo $n$ in $\mat{M}$.

<a id="box-10-ns-lem-multipliers"></a>

!!! teorema "Lemma 8.8: potenziali e moltiplicatori del simplesso"

    I potenziali di un albero ricoprente $T$ esistono e sono unici. Il vettore $(\pi_1,\pi_2,\dots,\pi_{n-1})$ è il vettore dei moltiplicatori del simplesso associato alla base $T$ e $\bar{c}_{ij}$ è il costo ridotto della variabile $x_{ij}$. Inoltre, $\pi_i$ è il costo del cammino nell'albero da $i$ a $n$, dove un arco percorso dalla coda alla testa contribuisce $+c_{ij}$ e un arco percorso dalla testa alla coda contribuisce $-c_{ij}$.

??? dimostrazione "Dimostrazione"

    Scriviamo $\vet{\pi}=(\pi_1,\pi_2,\dots,\pi_{n-1})$ per i primi potenziali $n-1$ e $\pi_n=0$.

    1. La colonna di $(i,j)$ in $\mat{M}$ ha $+1$ nella riga $i$ e $-1$ nella riga $j$, la riga di $n$ essendo eliminata. Quindi $\vet{\pi}'\mat{M}_{(i,j)}=\pi_i-\pi_j$, anche quando $i=n$ o $j=n$.

    2. Il sistema $\vet{\pi}'\mat{M}_T=\vet{c}_T'$ legge $\pi_i-\pi_j=c_{ij}$ sugli archi dell'albero, ovvero $\bar{c}_{ij}=0$. La sua matrice è non singolare per <span style="color:#1971c2">[Teorema 8.3](basi-e-alberi-ricoprenti.md#box-4-ns-th-bases)</span>, quindi i potenziali esistono e sono unici e $c_{ij}-\vet{\pi}'\mat{M}_{(i,j)}=c_{ij}-\pi_i+\pi_j=\bar{c}_{ij}$.

    3. Sia $i=v_0,v_1,\dots,v_r=n$ il percorso dell'albero. Un arco percorso dalla coda alla testa dà $\pi_{v_{t-1}}-\pi_{v_t}= c_{v_{t-1}v_t}$; un arco percorso dalla testa alla coda dà $\pi_{v_{t-1}}-\pi_{v_t}=-c_{v_tv_{t-1}}$. Sommando lungo il cammino, i termini telescopici danno $\pi_i-\pi_n=\pi_i$. <span class="qed">□</span>

- Percorriamo un <strong>ciclo</strong> $C$ di $G$ in una delle due direzioni. Gli archi attraversati dalla coda alla testa sono percorsi <strong>in avanti</strong>, gli altri <strong>all'indietro</strong>; il costo del ciclo è

    $$
    c(C)=\sum_{(i,j) \text{ in avanti}} c_{ij}-\sum_{(i,j) \text{ all'indietro}} c_{ij} .
    $$

<a id="box-11-ns-lem-cycle"></a>

!!! teorema "Lemma 8.9: il costo di un ciclo"

    Per ogni vettore di potenziali $\vet{\pi}$ e ogni ciclo $C$ percorso in una direzione,

    $$
    c(C)=\sum_{(i,j) \text{ in avanti}} \bar{c}_{ij}-\sum_{(i,j) \text{ all'indietro}} \bar{c}_{ij} .
    $$

    In particolare, se $\vet{\pi}$ è il vettore dei potenziali di un albero ricoprente $T$ e $C$ è il ciclo fondamentale di un arco $(k,l) \notin T$, percorso in direzione di $(k,l)$, poi $c(C)=\bar{c}_{kl}$.

??? dimostrazione "Dimostrazione"

    Sia $C$ il ciclo $v_0,v_1,\dots,v_r=v_0$ e sia $a_t$ l'arco che collega $v_{t-1}$ a $v_t$.

    1. Se $a_t=(v_{t-1},v_t)$ è percorso in avanti, allora $\bar{c}_{a_t}=c_{a_t}-(\pi_{v_{t-1}}-\pi_{v_t})$. Se invece $a_t=(v_t,v_{t-1})$ è percorso all'indietro, allora $-\bar{c}_{a_t}=-c_{a_t}-(\pi_{v_{t-1}}-\pi_{v_t})$.

    2. Sommando lungo il ciclo, i termini $\pi_{v_{t-1}}-\pi_{v_t}$ si cancellano e danno $\pi_{v_0}-\pi_{v_r}=0$. Si ottiene così la formula.

    3. Per il ciclo fondamentale di $(k,l)$, ogni arco dell'albero ha $\bar{c}_{ij}=0$ e $(k,l)$ è in avanti: la somma è $\bar{c}_{kl}$. <span class="qed">□</span>

<a id="box-12-ns-th-optimality"></a>

!!! teorema "Teorema 8.10: ottimalità di una soluzione ad albero"

    Sia $(T,L,U)$ una struttura ad albero ammissibile, con soluzione ad albero $\vet{x}$ e potenziali $\vet{\pi}$. Se

    $$
    \bar{c}_{ij} \ge 0, \quad \forall (i,j) \in L, \qquad\qquad \bar{c}_{ij} \le 0, \quad \forall (i,j) \in U,
    $$

    allora $\vet{x}$ è una soluzione ottimale del modello $\mathrm{MCF}$. Se le disuguaglianze sono strette, $\vet{x}$ è l'unica soluzione ottimale.

??? dimostrazione "Dimostrazione"

    Sia $\vet{y}$ un flusso ammissibile. Per il [Lemma «Costo e costo ridotto» del Capitolo 4](../../flussi/network-flow-models/il-modello-duale-e-i-costi-ridotti.md), $\vet{c}'\vet{y}=\bar{\vet{c}}'\vet{y}+\vet{b}'\vet{\pi}$ e $\vet{c}'\vet{x}=\bar{\vet{c}}'\vet{x}+ \vet{b}'\vet{\pi}$, quindi

    $$
    \vet{c}'\vet{y}-\vet{c}'\vet{x}=\sum_{(i,j) \in A}\bar{c}_{ij}\,(y_{ij}-x_{ij}) .
    $$

    - Sugli archi di $T$ il termine è zero, poiché $\bar{c}_{ij}=0$.

    - Sugli archi di $L$, $x_{ij}=0 \le y_{ij}$ e $\bar{c}_{ij} \ge 0$: il termine è $\bar{c}_{ij}y_{ij} \ge 0$.

    - Sugli archi di $U$, $x_{ij}=u_{ij} \ge y_{ij}$ e $\bar{c}_{ij} \le 0$: il termine è $\bar{c}_{ij}(y_{ij}-u_{ij}) \ge 0$.

    Quindi $\vet{c}'\vet{y} \ge \vet{c}'\vet{x}$. Se le disuguaglianze sono strette, l'uguaglianza $\vet{c}'\vet{y}=\vet{c}'\vet{x}$ implica $y_{ij}=0$ sugli archi in $L$ e $y_{ij}=u_{ij}$ su quelli in $U$. I flussi sugli archi di $T$ coincidono quindi con quelli della soluzione ad albero, che è unica (<span style="color:#1971c2">[Teorema 8.3](basi-e-alberi-ricoprenti.md#box-4-ns-th-bases)</span>) e $\vet{y}=\vet{x}$. <span class="qed">□</span>

- Sono le condizioni del [Corollario «Certificato di costo ridotto» del Capitolo 4](../../flussi/network-flow-models/il-modello-duale-e-i-costi-ridotti.md): un arco con costo ridotto positivo è al limite inferiore, uno con costo ridotto negativo è al limite superiore e ogni arco dell'albero ha costo ridotto nullo.

- Un arco di $L$ con $\bar{c}_{ij}<0$ o di $U$ con $\bar{c}_{ij}>0$ viola queste condizioni. Per il <span style="color:#1971c2">[Lemma 8.9](#box-11-ns-lem-cycle)</span>, inviando flusso lungo il suo ciclo fondamentale nella direzione opportuna, il costo diminuisce di $|\bar{c}_{ij}|$ per unità.

<a id="box-13-ns-ex-potentials"></a>

!!! esempio "Esempio 8.3: potenziali e costi ridotti dell'albero di $\bar{\vet{x}}$"

    Per la struttura ad albero di <span style="color:#1971c2">[Esempio 8.2](basi-e-alberi-ricoprenti.md#box-8-ns-ex-tree)</span> partiamo dalla radice $6$:

    $$
    \begin{gathered}
    \pi_6=0, \qquad \pi_4=\pi_6+c_{46}=5, \qquad \pi_2=\pi_4+c_{24}=10,\\
    \pi_5=\pi_4+c_{54}=10, \qquad \pi_1=\pi_2+c_{12}=12, \qquad \pi_3=\pi_2+c_{32}=12 .
    \end{gathered}
    $$

    Ad esempio, $\pi_1=c_{12}+c_{24}+c_{46}=12$ è il costo del cammino nell'albero $1,2,4,6$. I costi ridotti degli archi fuori base sono

    $$
    \begin{gathered}
    \bar{c}_{13}=2-12+12=2, \qquad \bar{c}_{35}=3-12+10=1,\\
    \bar{c}_{43}=3-5+12=10, \qquad \bar{c}_{56}=3-10+0=-7 .
    \end{gathered}
    $$

    - L'arco $(4,3) \in L$ ha $\bar{c}_{43} \ge 0$ e l'arco $(5,6) \in U$ ha $\bar{c}_{56} \le 0$.

    - Gli archi $(1,3)$ e $(3,5)$ appartengono a $U$ e hanno costo ridotto positivo: le condizioni del <span style="color:#1971c2">[Teorema 8.10](#box-12-ns-th-optimality)</span> non sono soddisfatte.

    - Il ciclo fondamentale di $(1,3)$, percorso nella direzione dell'arco, è $1,3,2,1$: percorre $(1,3)$ e $(3,2)$ in avanti e $(1,2)$ all'indietro. Il suo costo è $c_{13}+c_{32}-c_{12}=2+2-2=2=\bar{c}_{13}$. Riducendo $x_{13}$ e inviando flusso lungo il ciclo nella direzione opposta, il costo diminuisce di $2$ per unità.

!!! chiave ""

    I potenziali sono normalizzati a zero nella radice e rendono nullo il costo ridotto di ogni arco dell'albero. I primi $n-1$ potenziali sono i moltiplicatori del simplesso. Il costo ridotto di un arco fuori base coincide con il costo del suo ciclo fondamentale; una soluzione ad albero è ottimale se $\bar{c}\ge0$ su $L$ e $\bar{c}\le0$ su $U$.

---

**Avanti:** [8.4 Il perno](il-perno.md)
