---
title: "Il modello di programmazione lineare"
---

# 9.7 Il modello di programmazione lineare { #sez-pm-sec-lp }

<div class="info-capitolo" markdown>

**Parte 5 · Gestione dei progetti · Capitolo 9** · [:material-book-open-variant: Capitolo 9: Gestione dei progetti](index.md) · [:material-file-pdf-box: Dispensa, volume 5 (PDF)](../../pdf/dispensa-5-gestione-dei-progetti.pdf) · [:material-pencil: Esercizi: Gestione dei progetti](../../esercizi/project-management.md)

</div>

- La durata minima del progetto è il valore ottimale di un modello LP le cui variabili sono gli orari di inizio. Usiamo $n+2$ variabili libere, una per ogni nodo:

    $$
    t_j=\text{start time of node } j, \qquad \forall j \in N .
    $$

!!! chiave ""

    Utilizzando queste variabili, un modello LP per la durata minima del progetto è il seguente:

    <a id="eq-pm-PD"></a>

    \begin{align*}
    &&   \min \;\; t_{n+1}-t_0                                                               \label{pm:obj}  \tag{9.1a}\\[1ex]
    && \text{subject to} \quad  t_j-t_i &\ge d_i, & \forall (i,j) \in A,                 \label{pm:cons}  \tag{9.1b}\\[1ex]
    && t_i &\in \R, & \forall i \in N.                                                  \label{pm:dom} \tag{9.1c}
    \end{align*}

    Questo modello LP è denominato modello $\mathrm{PD}$.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{PD}$:

    - la funzione obiettivo $\eqref{pm:obj}$ riduce al minimo il tempo dall'inizio del progetto alla FINE;

    - Vincoli  $\eqref{pm:cons}$ fanno sì che ogni nodo inizi dopo che ciascuno dei suoi immediati predecessori è terminato;

    - infine, i vincoli $\eqref{pm:dom}$ definiscono le variabili del modello LP, che sono libere.

- Aggiungendo la stessa costante a tutti gli orari di inizio si mantengono i vincoli e il valore: gli orari sono gli soluzioni realizzabili con $t_0=0$ e $z(\mathrm{PD})=T$.

## 9.7.1 Il modello duale: il percorso più lungo

- Seguire le regole di [Capitolo 9 «Teoria della dualità»](https://fabiofurini.github.io/programmazione-lineare/dualita/09-dualita/) del modulo Programmazione lineare, utilizziamo una variabile duale $x_{ij} \ge 0$ per ogni vincolo $\eqref{pm:cons}$, un vincolo $\ge$ di un modello di minimizzazione. Ogni variabile libera $t_i$ dà un duale equazione, il cui membro destro è il coefficiente di $t_i$ nella funzione obiettivo.

- La variabile $t_i$ ha coefficiente $+1$ nei vincoli degli archi entranti in $i$ e $-1$ in quelli degli archi archi in uscita da $i$. Con i saldi

    $$
    b_0=1, \qquad b_{n+1}=-1, \qquad b_i=0, \quad \forall i \in N \setminus \{0,n+1\},
    $$

    l'equazione di $t_i$, moltiplicata per $-1$, è un vincolo di conservazione del flusso.

!!! chiave ""

    Utilizzando una variabile doppia non negativa $x_{ij}$ per ciascun vincolo $\eqref{pm:cons}$, il modello doppio del modello $\mathrm{PD}$ è:

    <a id="eq-pm-DPD"></a>

    \begin{align*}
    &&   \max \;\; \sum_{(i,j) \in A} d_i\, x_{ij}                                              \label{pm:dobj}  \tag{9.2a}\\[1ex]
    && \text{subject to} \quad  \sum_{(i,j) \in \delta^+(i)} x_{ij}-\sum_{(j,i) \in \delta^-(i)} x_{ji}
    &= b_i, & \forall i \in N,                                                             \label{pm:dcons}  \tag{9.2b}\\[1ex]
    && x_{ij} &\ge 0, & \forall (i,j) \in A.                                                \label{pm:ddom} \tag{9.2c}
    \end{align*}

    Questo modello LP è denominato modello $D(\mathrm{PD})$.

- Descrizione del modello doppio:

    - Vincoli  $\eqref{pm:dcons}$ invia un'unità di flusso da INIZIO a FINE;

    - la funzione obiettivo $\eqref{pm:dobj}$ massimizza la lunghezza del flusso, con lunghezza $d_i$ sull'arco $(i,j)$: è ammissibile il vettore di incidenza di un percorso $P$ da INIZIO a FINE, con valore $L(P)$.

- Con le lunghezze $-d_i$, il modello $D(\mathrm{PD})$ è il modello $\mathrm{SP}(0,n+1)$ di [Capitolo 3](../../alberi-e-cammini/shortest-paths/la-formulazione-della-programmazione-lineare.md) con il obiettivo moltiplicato per $-1$, e il modello $\mathrm{PD}$ è il suo doppio: gli orari di inizio sono i potenziali, $\pi_i=t_i$.

- Il costo ridotto dell'arco $(i,j)$ è quindi $\bar{c}_{ij}=-d_i-t_i+t_j$. Con $\vet{t}=\mathit{ES}$ lo è $\bar{c}_{ij}=\mathit{ES}_j-\mathit{EF}_i \ge 0$: gli archi stretti sono gli archi a costo ridotto zero, e <span style="color:#1971c2">[Teorema 9.15](margini-e-attivita-critiche.md#box-19-pm-th-tight)</span> è il certificato di [Capitolo 3](../../alberi-e-cammini/shortest-paths/condizioni-e-potenziali-di-ottimalita.md), potenziali ammissibili e percorso di archi con costo ridotto zero.

<a id="box-24-pm-th-lp"></a>

!!! teorema "Teorema 9.18: Modelli LP e percorsi critici"

    $z(\mathrm{PD})=z(D(\mathrm{PD}))=T$. Gli orari $\mathit{ES}$ e $\mathit{LS}$ sono ottimali per il modello $\mathrm{PD}$ e il vettore di incidenza di ogni percorso critico è ottimale per il modello $D(\mathrm{PD})$. Inoltre, ogni soluzione ottimale del modello $\mathrm{PD}$ soddisfa $t_j=t_i+d_i$ su ogni arco $(i,j)$ di ogni percorso critico.

??? dimostrazione "Dimostrazione"

    1. $\mathit{ES}$ e $\mathit{LS}$ sono realizzabili per il modello $\mathrm{PD}$, con valore $T-0=T$, da <span style="color:#1971c2">[Teorema 9.8](il-passaggio-in-avanti-i-primi-tempi.md#box-10-pm-th-earliest)</span> e <span style="color:#1971c2">[Teorema 9.11](il-passaggio-all-indietro-ultimi-tempi.md#box-14-pm-th-latest)</span>.

    2. Sia $P$ un percorso critico e $\vet{x}^P$ il suo vettore di incidenza, con $x^P_{ij}=1$ sugli archi di $P$ e $0$ altrove. Un'unità lascia START, un'unità entra FINISH e ogni altro nodo di $P$ ha un ingresso e uno arco in uscita da $P$: $\vet{x}^P$ è fattibile per il modello $D(\mathrm{PD})$, con valore $L(P)=T$.

    3. Una soluzione ammissibile del modello $\mathrm{PD}$ e una soluzione ammissibile del suo duale con lo stesso valore sono entrambe ottimale, per dualità debole.

    4. Lascia che $\vet{t}$ sia ottimale per il modello $\mathrm{PD}$ e $P=i_0,i_1,\dots,i_k$ un percorso critico. Sommando il vincoli dei suoi archi,

        $$
        T=t_{n+1}-t_0=\sum_{s=0}^{k-1} \big(t_{i_{s+1}}-t_{i_s}\big) \ge \sum_{s=0}^{k-1} d_{i_s}=L(P)=T,
        $$

        quindi ogni vincolo di un arco di $P$ vale con uguaglianza.

    <p class="qed-riga"><span class="qed">□</span></p>

- In ogni programma di durata minima le attività critiche iniziano al primo orario di inizio, che equivale a i loro ultimi orari di inizio.

<a id="box-25-pm-ex-lp"></a>

!!! esempio "Esempio 9.7: i modelli LP del caso studio"

    Per il caso di studio il modello $\mathrm{PD}$ ha variabili $16$ e vincoli $19$; ad esempio, il vincolo dell'arco $(5,8)$ è $t_8-t_5 \ge 4$. Risolto con Gurobi:

    - $z(\mathrm{PD})=z(D(\mathrm{PD}))=44$ e la doppia soluzione ottimale restituita da Gurobi è il vettore di incidenza del critico percorso START$,1,2,3,5,6,10,12,14,$FINISH;

    - la soluzione ottimale del modello $\mathrm{PD}$ non è unica: $\mathit{ES}$ e $\mathit{LS}$ sono entrambi ottimali, e differiscono, per ad esempio, sull'attività $4$, con $\mathit{ES}_4=16$ e $\mathit{LS}_4=20$;

    - con $\vet{t}=\mathit{ES}$ i costi ridotti $\bar{c}_{ij}=\mathit{ES}_j-\mathit{EF}_i$ sono pari a zero su ogni arco escluso $\bar{c}_{58}=9$, $\bar{c}_{9,10}=2$, $\bar{c}_{11,14}=1$ e $\bar{c}_{13,15}=4$. Gli archi $(3,4)$, $(4,7)$, $(7,8)$, $(8,13)$ sono stretti, ma gli archi stretti dell'attività $13$ non raggiungono FINE, quindi la catena $4,7,8,13$ è non su un percorso critico.

!!! chiave ""

    Il modello $\mathrm{PD}$ minimizza $t_{n+1}-t_0$ soggetto a $t_j-t_i \ge d_i$ su ogni arco; il suo duale invia un'unità di flusso dall'INIZIO alla FINE lungo il percorso più lungo. Entrambi i valori ottimali sono $T$: $\mathit{ES}$ e $\mathit{LS}$ sono pianificazioni ottimali e ogni percorso critico è una soluzione duale ottimale.

---

**Avanti:** [9.8 Due percorsi critici e cambi di durata](due-percorsi-critici-e-cambi-di-durata.md)
