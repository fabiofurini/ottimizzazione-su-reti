---
title: "Il modello di programmazione lineare"
---

# 9.7 Il modello di programmazione lineare { #sez-pm-sec-lp }

<div class="info-capitolo" markdown>

**Parte 5 · Gestione dei progetti · Capitolo 9** · [:material-book-open-variant: Capitolo 9: Gestione dei progetti](index.md) · [:material-file-pdf-box: Dispensa, volume 5 (PDF)](../../pdf/dispensa-5-gestione-dei-progetti.pdf) · [:material-presentation: Slide](../../pdf/slide-project-management.pdf) · [:material-pencil: Esercizi: Gestione dei progetti](../../esercizi/project-management.md) · [:material-gesture-tap: App: Il metodo del cammino critico (CPM)](../../laboratorio/cammino-critico-cpm.md)

</div>

- La durata minima del progetto è il valore ottimo di un modello LP le cui variabili sono i tempi di inizio. Usiamo $n+2$ variabili libere, una per ogni nodo:

    $$
    t_j=\text{tempo di inizio del nodo } j, \qquad \forall j \in N .
    $$

!!! chiave ""

    Usando queste variabili, un modello LP per la durata minima del progetto è il seguente:

    <a id="eq-pm-PD"></a>

    \begin{align*}
    &&   \min \;\; t_{n+1}-t_0                                                               \label{pm:obj}  \tag{9.1a}\\[1ex]
    && \text{soggetto a} \quad  t_j-t_i &\ge d_i, & \forall (i,j) \in A,                 \label{pm:cons}  \tag{9.1b}\\[1ex]
    && t_i &\in \R, & \forall i \in N.                                                  \label{pm:dom} \tag{9.1c}
    \end{align*}

    Questo modello LP si indica come modello $\mathrm{PD}$.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{PD}$:

    - la funzione obiettivo $\eqref{pm:obj}$ minimizza il tempo che va dall'inizio del progetto a FINISH;

    - i vincoli $\eqref{pm:cons}$ fanno iniziare ogni nodo dopo che ciascuno dei suoi predecessori immediati è terminato;

    - infine, i vincoli $\eqref{pm:dom}$ definiscono le variabili del modello LP, che sono libere.

- Aggiungere la stessa costante a tutti i tempi di inizio non cambia i vincoli né il valore: i calendari sono le soluzioni ammissibili con $t_0=0$, e $z(\mathrm{PD})=T$.

## 9.7.1 Il modello duale: un cammino massimo

- Seguendo le regole del [Capitolo 9 «Teoria della dualità»](https://fabiofurini.github.io/programmazione-lineare/dualita/09-dualita/) del modulo Programmazione lineare, usiamo una variabile duale $x_{ij} \ge 0$ per ogni vincolo $\eqref{pm:cons}$, un vincolo di $\ge$ di un modello di minimo. Ogni variabile libera $t_i$ dà un'equazione duale, il cui termine noto è il coefficiente di $t_i$ nella funzione obiettivo.

- La variabile $t_i$ ha coefficiente $+1$ nei vincoli degli archi entranti in $i$ e $-1$ in quelli degli archi uscenti da $i$. Con i bilanci

    $$
    b_0=1, \qquad b_{n+1}=-1, \qquad b_i=0, \quad \forall i \in N \setminus \{0,n+1\},
    $$

    l'equazione di $t_i$, moltiplicata per $-1$, è un vincolo di conservazione del flusso.

!!! chiave ""

    Usando una variabile duale non negativa $x_{ij}$ per ogni vincolo $\eqref{pm:cons}$, il duale del modello $\mathrm{PD}$ è:

    <a id="eq-pm-DPD"></a>

    \begin{align*}
    &&   \max \;\; \sum_{(i,j) \in A} d_i\, x_{ij}                                              \label{pm:dobj}  \tag{9.2a}\\[1ex]
    && \text{soggetto a} \quad  \sum_{(i,j) \in \delta^+(i)} x_{ij}-\sum_{(j,i) \in \delta^-(i)} x_{ji}
    &= b_i, & \forall i \in N,                                                             \label{pm:dcons}  \tag{9.2b}\\[1ex]
    && x_{ij} &\ge 0, & \forall (i,j) \in A.                                                \label{pm:ddom} \tag{9.2c}
    \end{align*}

    Questo modello LP si indica come modello $D(\mathrm{PD})$.

- Descrizione del modello duale:

    - i vincoli $\eqref{pm:dcons}$ inviano un'unità di flusso da START a FINISH;

    - la funzione obiettivo $\eqref{pm:dobj}$ massimizza la lunghezza del flusso, con lunghezza $d_i$ sull'arco $(i,j)$: il vettore di incidenza di un cammino $P$ da START a FINISH è ammissibile, con valore $L(P)$.

- Con le lunghezze $-d_i$, il modello $D(\mathrm{PD})$ è il modello $\mathrm{SP}(0,n+1)$ del [Capitolo 3](../../alberi-e-cammini/shortest-paths/la-formulazione-di-programmazione-lineare.md) con l'obiettivo moltiplicato per $-1$, e il modello $\mathrm{PD}$ è il suo duale: i tempi di inizio sono i potenziali, $\pi_i=t_i$.

- Il costo ridotto dell'arco $(i,j)$ è allora $\bar{c}_{ij}=-d_i-t_i+t_j$. Con $\vet{t}=\mathit{ES}$ vale $\bar{c}_{ij}=\mathit{ES}_j-\mathit{EF}_i \ge 0$: gli archi stretti sono gli archi con costo ridotto nullo, e il <span style="color:#1971c2">[Teorema 9.15](scorte-e-attivita-critiche.md#box-19-pm-th-tight)</span> è il certificato del [Capitolo 3](../../alberi-e-cammini/shortest-paths/condizioni-di-ottimalita-e-potenziali.md): potenziali ammissibili e un cammino di archi con costo ridotto nullo.

<a id="box-24-pm-th-lp"></a>

!!! teorema "Teorema 9.18: modelli LP e cammini critici"

    $z(\mathrm{PD})=z(D(\mathrm{PD}))=T$. I calendari $\mathit{ES}$ e $\mathit{LS}$ sono ottimi per il modello $\mathrm{PD}$, e il vettore di incidenza di ogni cammino critico è ottimo per il modello $D(\mathrm{PD})$. Inoltre ogni soluzione ottima del modello $\mathrm{PD}$ soddisfa $t_j=t_i+d_i$ su ogni arco $(i,j)$ di ogni cammino critico.

??? dimostrazione "Dimostrazione"

    1. $\mathit{ES}$ e $\mathit{LS}$ sono ammissibili per il modello $\mathrm{PD}$, con valore $T-0=T$, per il <span style="color:#1971c2">[Teorema 9.8](la-passata-in-avanti-i-tempi-al-piu-presto.md#box-10-pm-th-earliest)</span> e il <span style="color:#1971c2">[Teorema 9.11](la-passata-all-indietro-i-tempi-al-piu-tardi.md#box-14-pm-th-latest)</span>.

    2. Siano $P$ un cammino critico e $\vet{x}^P$ il suo vettore di incidenza, con $x^P_{ij}=1$ sugli archi di $P$ e $0$ altrove. Un'unità esce da START, un'unità entra in FINISH, e ogni altro nodo di $P$ ha un arco entrante e un arco uscente di $P$: $\vet{x}^P$ è ammissibile per il modello $D(\mathrm{PD})$, con valore $L(P)=T$.

    3. Una soluzione ammissibile del modello $\mathrm{PD}$ e una soluzione ammissibile del suo duale con lo stesso valore sono entrambe ottime, per la dualità debole.

    4. Siano $\vet{t}$ ottima per il modello $\mathrm{PD}$ e $P=i_0,i_1,\dots,i_k$ un cammino critico. Sommando i vincoli dei suoi archi,

        $$
        T=t_{n+1}-t_0=\sum_{s=0}^{k-1} \big(t_{i_{s+1}}-t_{i_s}\big) \ge \sum_{s=0}^{k-1} d_{i_s}=L(P)=T,
        $$

        quindi ogni vincolo di un arco di $P$ vale con l'uguaglianza.

    <p class="qed-riga"><span class="qed">□</span></p>

- In ogni calendario di durata minima le attività critiche iniziano al loro inizio al più presto, che coincide con il loro inizio al più tardi.

<a id="box-25-pm-ex-lp"></a>

!!! esempio "Esempio 9.7: i modelli LP del caso di studio"

    Per il caso di studio il modello $\mathrm{PD}$ ha $16$ variabili e $19$ vincoli; per esempio, il vincolo dell'arco $(5,8)$ è $t_8-t_5 \ge 4$. Con Gurobi:

    - $z(\mathrm{PD})=z(D(\mathrm{PD}))=44$, e la soluzione duale ottima restituita da Gurobi è il vettore di incidenza del cammino critico START$,1,2,3,5,6,10,12,14,$FINISH;

    - la soluzione ottima del modello $\mathrm{PD}$ non è unica: $\mathit{ES}$ e $\mathit{LS}$ sono entrambe ottime, e differiscono, per esempio, sull'attività $4$, con $\mathit{ES}_4=16$ e $\mathit{LS}_4=20$;

    - con $\vet{t}=\mathit{ES}$ i costi ridotti $\bar{c}_{ij}=\mathit{ES}_j-\mathit{EF}_i$ sono nulli su ogni arco, tranne $\bar{c}_{58}=9$, $\bar{c}_{9,10}=2$, $\bar{c}_{11,14}=1$ e $\bar{c}_{13,15}=4$. Gli archi $(3,4)$, $(4,7)$, $(7,8)$, $(8,13)$ sono stretti, ma gli archi stretti a partire dall'attività $13$ non arrivano a FINISH, quindi la catena $4,7,8,13$ non sta su un cammino critico.

!!! chiave ""

    Il modello $\mathrm{PD}$ minimizza $t_{n+1}-t_0$ soggetto a $t_j-t_i \ge d_i$ su ogni arco; il suo duale invia un'unità di flusso da START a FINISH lungo un cammino massimo. Entrambi i valori ottimi sono $T$: $\mathit{ES}$ e $\mathit{LS}$ sono calendari ottimi, e ogni cammino critico è una soluzione duale ottima.

---

**Avanti:** [9.8 Due cammini critici e variazioni delle durate](due-cammini-critici-e-variazioni-delle-durate.md)
