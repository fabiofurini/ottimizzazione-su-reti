---
title: "Il problema di trasporto"
---

# 7.1 Il problema di trasporto { #sez-ta-sec-transport }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 7** · [:material-book-open-variant: Capitolo 7: Trasporto e assegnamento](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-presentation: Slide](../../pdf/slide-transportation-and-assignment.pdf) · [:material-pencil: Esercizi: Trasporto e assegnamento](../../esercizi/transportation-and-assignment.md) · [:material-gesture-tap: App: Trasporto: soluzione iniziale e metodo dei potenziali](../../laboratorio/trasporto-metodo-dei-potenziali.md) · [:material-gesture-tap: App: Assegnamento: l'algoritmo ungherese](../../laboratorio/assegnamento-algoritmo-ungherese.md)

</div>

<a id="box-1-ta-def-tp"></a>

!!! definizione "Definizione 7.1: problema di trasporto"

    Ci sono $m$ <strong>origini</strong> e $n$ <strong>destinazioni</strong>. Numeriamo le origini $1,2,\dots,m$ e le destinazioni $m+1,m+2,\dots,m+n$, e scriviamo

    $$
    P=\{1,2,\dots,m\}, \qquad D=\{m+1,m+2,\dots,m+n\}.
    $$

    - Ogni origine $i \in P$ ha un'<strong>offerta</strong> $a_i>0$, ogni destinazione $j \in D$ ha una <strong>domanda</strong> $d_j>0$, e $c_{ij} \in \R$ è il costo di spedizione di un'unità da $i$ a $j$.

    - L'istanza è <strong>bilanciata</strong> se $\sum_{i \in P} a_i=\sum_{j \in D} d_j$.

    Il <strong>problema di trasporto</strong> chiede le quantità $x_{ij} \ge 0$ da spedire da ogni origine $i$ a ogni destinazione $j$, in modo che ogni origine spedisca tutta la sua offerta e ogni destinazione riceva la sua domanda, a costo totale minimo.

- In questo capitolo $m$ e $n$ sono il numero di origini e il numero di destinazioni. La rete associata ha $m+n$ nodi e un arco $(i,j)$ per ogni $i \in P$ e $j \in D$, cioè $m\,n$ archi: è la <strong>rete bipartita completa</strong> di $P$ e $D$, perché ogni arco va da $P$ a $D$.

- Numerare le destinazioni dopo le origini dà a ogni nodo un suo numero, e più avanti un suo potenziale.

- Usiamo una variabile continua $x_{ij}$ per ogni coppia $i \in P$, $j \in D$: la quantità spedita da $i$ a $j$.

!!! chiave ""

    Con queste variabili, un modello LP per il problema di trasporto è il seguente:

    <a id="eq-ta-TP"></a>

    \begin{align*}
    &&   \min \;\;{\sum_{i \in P} \sum_{j \in D} c_{ij} \, x_{ij}}                                \label{ta:obj}  \tag{7.1a}\\[1ex]
    && \text{soggetto a} \quad  \sum_{j \in D} x_{ij} &= a_i, & \forall i \in P,              \label{ta:supply}  \tag{7.1b}\\[1ex]
    && \sum_{i \in P} x_{ij} &= d_j, & \forall j \in D,                                      \label{ta:demand}  \tag{7.1c}\\[1ex]
    && x_{ij} &\ge 0, & \forall i \in P,~\forall j \in D.                                     \label{ta:dom} \tag{7.1d}
    \end{align*}

    Questo modello LP è detto modello $\mathrm{TP}$.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{TP}$:

    - la funzione obiettivo $\eqref{ta:obj}$ minimizza il costo totale di spedizione;

    - i vincoli $\eqref{ta:supply}$, uno per ogni origine, spediscono tutta l'offerta dell'origine;

    - i vincoli $\eqref{ta:demand}$, uno per ogni destinazione, consegnano tutta la domanda della destinazione;

    - infine, i vincoli $\eqref{ta:dom}$ definiscono le variabili del modello LP.

- Moltiplicando per $-1$ i vincoli $\eqref{ta:demand}$ si ottengono i vincoli di conservazione del flusso della rete bipartita completa, con bilanci $b_i=a_i$ per $i \in P$, $b_j=-d_j$ per $j \in D$, e senza capacità. Il modello $\mathrm{TP}$ è il modello $\mathrm{MCF}$ della riga «Trasporto» della tabella «Casi speciali» del [Capitolo 4 «Modelli di flusso su reti»](../network-flow-models/casi-speciali.md).

<a id="box-2-ta-prop-exist"></a>

!!! teorema "Proposizione 7.2: ammissibilità e integralità"

    Un'istanza del problema di trasporto ha una soluzione ammissibile se e solo se è bilanciata. Un'istanza bilanciata ha una soluzione ottima e, se le offerte $a_i$ e le domande $d_j$ sono intere, ha una soluzione ottima intera.

??? dimostrazione "Dimostrazione"

    Sia $S=\sum_{i \in P} a_i$.

    1. <em>Il bilanciamento è necessario.</em> Se $\vet{x}$ è ammissibile, sommando i vincoli $\eqref{ta:supply}$ e i vincoli $\eqref{ta:demand}$ si ottiene la stessa somma di tutte le variabili: $\sum_{i \in P} a_i=\sum_{i \in P}\sum_{j \in D} x_{ij}=\sum_{j \in D} d_j$.

    2. <em>Il bilanciamento è sufficiente.</em> Se $S=\sum_{j \in D} d_j$, le quantità $x_{ij}=a_i\,d_j/S \ge 0$ sono ammissibili: la riga $i$ ha somma $a_i\sum_{j \in D} d_j/S=a_i$, e la colonna $j$ ha somma $d_j\sum_{i \in P} a_i/S=d_j$.

    3. <em>Soluzione ottima.</em> Ogni soluzione ammissibile ha $0 \le x_{ij} \le a_i$, quindi la regione ammissibile è un poliedro limitato non vuoto, e una funzione lineare vi raggiunge il minimo in un vertice ([Capitolo 15 «La geometria della programmazione lineare»](https://fabiofurini.github.io/programmazione-lineare/metodi-avanzati/15-geometria/) del modulo Programmazione lineare).

    4. <em>Integralità.</em> Con bilanci interi e senza capacità, ogni vertice è intero per il Teorema «vertici interi» del [Capitolo 4](../network-flow-models/totale-unimodularita-e-integralita.md). <span class="qed">□</span>

## 7.1.1 La tabella di trasporto

- La <strong>tabella di trasporto</strong> è una tabella $m \times n$ con una riga per ogni origine e una colonna per ogni destinazione. La cella $(i,j)$ contiene il costo $c_{ij}$, o più avanti la quantità $x_{ij}$; l'ultima colonna contiene le offerte $a_i$ e l'ultima riga le domande $d_j$.

- Un vettore $\vet{x} \ge \vet{0}$ scritto nella tabella è ammissibile se e solo se ogni riga ha per somma la sua offerta e ogni colonna la sua domanda.

<a id="box-3-ta-ex-tp"></a>

!!! esempio "Esempio 7.1: tre magazzini e quattro negozi"

    Un'azienda ha tre magazzini, le origini $1,2,3$, con $30$ unità ciascuno, e quattro negozi, le destinazioni $4,5,6,7$, con domande $10$, $25$, $15$ e $40$. I costi unitari sono nella tabella:

    $$
    \begin{array}{c|cccc|c}
    \hline {c_{ij}} & {4} & {5} & {6} & {7} & {a_i} \\
    \hline {1} & {1} & {9} & {2} & {3} & {30} \\
    {2} & {3} & {4} & {2} & {2} & {30} \\
    {3} & {9} & {1} & {4} & {6} & {30} \\
    \hline {d_j} & {10} & {25} & {15} & {40} & {90} \\
    \hline
    \end{array}
    $$

    L'istanza è bilanciata: l'offerta totale e la domanda totale valgono entrambe $90$. Nella rete bipartita completa ogni origine è collegata a ogni destinazione, con $3 \cdot 4=12$ archi; accanto a ogni nodo, la sua offerta o la sua domanda.

    ![Figura 1](../../img/transportation-and-assignment/fig01.svg){ .fig loading=lazy  }

    Le quantità proporzionali $x_{ij}=a_i\,d_j/90$ della <span style="color:#1971c2">[Proposizione 7.2](#box-2-ta-prop-exist)</span> sono ammissibili, per esempio $x_{14}=30 \cdot 10/90=\frac{10}{3}$, ma frazionarie; i vertici della regione ammissibile sono interi.

## 7.1.2 Istanze non bilanciate

- Se l'offerta totale supera la domanda totale e ogni origine spedisce <em>al più</em> la sua offerta, aggiungiamo una <strong>destinazione fittizia</strong> con domanda $\sum_{i \in P} a_i-\sum_{j \in D} d_j$ e costo $0$ da ogni origine. La quantità spedita alla destinazione fittizia è l'offerta non usata dell'origine: è il nodo fittizio del [Capitolo 4](../network-flow-models/istanze-non-bilanciate.md), come colonna della tabella.

- Se la domanda totale supera l'offerta totale e una destinazione può ricevere meno della sua domanda, aggiungiamo un'<strong>origine fittizia</strong> con offerta $\sum_{j \in D} d_j-\sum_{i \in P} a_i$. Il costo della sua cella $(\cdot,j)$ è la penale per ogni unità di domanda di $j$ non soddisfatta, oppure $0$ se non c'è penale.

<a id="box-4-ta-ex-dummy"></a>

!!! esempio "Esempio 7.2: una destinazione fittizia"

    Nell'<span style="color:#1971c2">[Esempio 7.1](#box-3-ta-ex-tp)</span> l'offerta del magazzino $1$ sale a $a_1=40$: l'offerta totale è $100$ e la domanda totale $90$.

    - Aggiungiamo la destinazione fittizia $8$ con domanda $d_8=100-90=10$, e le celle $(1,8)$, $(2,8)$, $(3,8)$ con costo $0$: la tabella ha una quinta colonna.

    - La soluzione ottima, calcolata con Gurobi, è unica:

        $$
        \tilde{x}_{14}=10,~ \tilde{x}_{16}=15,~ \tilde{x}_{17}=10,~ \tilde{x}_{18}=5,~ \tilde{x}_{27}=30,~ \tilde{x}_{35}=25,~
        \tilde{x}_{38}=5,
        $$

        con costo $155$. I magazzini $1$ e $3$ tengono $5$ unità ciascuno, e il magazzino $2$ spedisce tutta la sua offerta.

## 7.1.3 Il trasbordo come trasporto

- In un'istanza di trasbordo le unità possono passare per nodi intermedi. Quando gli archi non hanno capacità, ogni unità può viaggiare lungo un cammino minimo, e contano soltanto le distanze fra i nodi di offerta e i nodi di domanda.

<a id="box-5-ta-prop-transship"></a>

!!! teorema "Proposizione 7.3: trasbordo come trasporto"

    Sia $G=(N,A)$ una rete con bilanci $b_i$, limiti inferiori nulli, senza capacità e con costi $c_{ij} \ge 0$. Siano $P=\{i \in N : b_i>0\}$ e $D=\{j \in N : b_j<0\}$, e supponiamo che ogni $j \in D$ sia raggiungibile da ogni $i \in P$, con distanza $\tilde{d}(i,j)$ per le lunghezze $c_{ij}$. Allora il costo minimo di un flusso ammissibile è uguale al valore ottimo dell'istanza di trasporto con origini $P$, offerte $a_i=b_i$, destinazioni $D$, domande $d_j=-b_j$ e costi $\tilde{d}(i,j)$.

??? dimostrazione "Dimostrazione"

    Confrontiamo i due valori ottimi.

    1. <em>Dalle spedizioni ai flussi.</em> Sia $\vet{y}$ ammissibile per l'istanza di trasporto. Inviando $y_{ij}$ unità lungo un cammino minimo da $i$ a $j$, per ogni coppia, si ottiene un flusso $\vet{x} \ge \vet{0}$: il nodo $i \in P$ invia $\sum_{j \in D} y_{ij}=b_i$ unità, il nodo $j \in D$ ne riceve $-b_j$, gli altri nodi inoltrano ciò che ricevono. Il suo costo è $\sum_{i,j} \tilde{d}(i,j)\,y_{ij}$, quindi il costo minimo di un flusso è al più l'ottimo del trasporto.

    2. <em>Dai flussi alle spedizioni.</em> Mostriamo per induzione sul numero di archi con $x_{ij}>0$ più il numero di nodi con $b_i \neq 0$ che ogni flusso ammissibile $\vet{x}$ costa almeno $\sum_{i,j} \tilde{d}(i,j)\,y_{ij}$ per qualche $\vet{y}$ ammissibile. Se $\vet{b}=\vet{0}$, prendiamo $\vet{y}=\vet{0}$.

    3. Altrimenti partiamo da un nodo $i_0$ con $b_{i_0}>0$: il suo flusso uscente è positivo, quindi ha un arco uscente con flusso positivo. Un nodo $v$ con $b_v \ge 0$ raggiunto lungo un tale arco ha flusso entrante positivo, quindi flusso uscente positivo. Seguiamo questi archi finché un nodo si ripete o si raggiunge un nodo $j_0$ con $b_{j_0}<0$.

    4. Se un nodo si ripete, gli archi formano un ciclo orientato $C$ con flussi positivi. Sottrarre il loro minimo $\varepsilon$ lungo $C$ mantiene il flusso ammissibile, non aumenta il costo, perché $c \ge 0$, e svuota un arco: si applica l'induzione.

    5. Altrimenti abbiamo un cammino $Q$ da $i_0$ a $j_0$. Sia $\varepsilon>0$ il minimo fra $b_{i_0}$, $-b_{j_0}$ e i flussi su $Q$. Sottrarre $\varepsilon$ lungo $Q$, e da $b_{i_0}$ e $-b_{j_0}$, dà un flusso ammissibile $\vet{x}'$ per i nuovi bilanci, con meno archi positivi o bilanci non nulli, e

        $$
        \vet{c}'\vet{x}=\vet{c}'\vet{x}'+\varepsilon\, c(Q) \ge \vet{c}'\vet{x}'+\varepsilon\,\tilde{d}(i_0,j_0).
        $$

        Per induzione $\vet{c}'\vet{x}' \ge \sum \tilde{d}(i,j)\,y'_{ij}$; aggiungendo $\varepsilon$ a $y'_{i_0j_0}$ si ottiene il $\vet{y}$ cercato.

    <p class="qed-riga"><span class="qed">□</span></p>

<a id="box-6-ta-ex-transship"></a>

!!! esempio "Esempio 7.3: l'istanza di trasbordo del Capitolo 4 senza capacità"

    Prendiamo la rete di riferimento del [Capitolo 4](../network-flow-models/un-istanza-di-trasbordo.md), con gli stessi bilanci $\vet{b}=(5,2,0,-3,0,-4)$ e gli stessi costi, e togliamo le capacità. Le origini sono i nodi di offerta $1,2$ e le destinazioni i nodi di domanda $4,6$; teniamo i nomi della rete.

    - Le distanze sono $\tilde{d}(1,4)=7$ lungo $1,2,4$, $\tilde{d}(1,6)=8$ lungo $1,3,5,6$, $\tilde{d}(2,4)=5$ lungo $2,4$, e $\tilde{d}(2,6)=10$ lungo $2,4,6$.

    - L'istanza di trasporto $2 \times 2$ ha $a_1=5$, $a_2=2$, $d_4=3$, $d_6=4$. Con $y_{24}=t \in [0,2]$ le altre quantità sono $y_{14}=3-t$, $y_{16}=2+t$, $y_{26}=2-t$, e il costo è

        $$
        7(3-t)+8(2+t)+5t+10(2-t)=57-4t,
        $$

        minimo per $t=2$: $y_{14}=1$, $y_{16}=4$, $y_{24}=2$, $y_{26}=0$, con costo $49$.

    - Lungo i cammini minimi si ottiene il flusso $x_{12}=1$, $x_{13}=4$, $x_{24}=3$, $x_{35}=4$, $x_{56}=4$ (blu), di costo $49$, l'ottimo calcolato da Gurobi. Con le capacità del Capitolo 4 questo flusso non è ammissibile, perché l'arco $(5,6)$ ha capacità $2$, e l'ottimo è $60$.

    ![Figura 2](../../img/transportation-and-assignment/fig02.svg){ .fig loading=lazy  }

!!! chiave ""

    Il problema di trasporto spedisce le offerte di $m$ origini alle domande di $n$ destinazioni a costo minimo. È un modello di flusso di costo minimo sulla rete bipartita completa; è ammissibile esattamente quando è bilanciato, e un'origine o una destinazione fittizia lo bilancia.

---

**Avanti:** [7.2 Soluzioni di base](soluzioni-di-base.md)
