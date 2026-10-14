---
title: "Il modello duale e i costi ridotti"
---

# 4.7 Il modello duale e i costi ridotti { #sez-sec-nf-dual }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 4** · [:material-book-open-variant: Capitolo 4: Modelli di flusso](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-pencil: Esercizi: Modelli di flusso](../../esercizi/network-flow-models.md)

</div>

- Con <span style="color:#1971c2">[Proposizione 4.9](rimozione-dei-limiti-inferiori.md#box-12-nf-prop-subst)</span> i limiti inferiori possono essere rimossi, quindi in questa sezione $\vet{l}=\vet{0}$ e ogni capacità è finita. Il vincolo $x_{ij} \le u_{ij}$ è scritto come $-x_{ij} \ge -u_{ij}$.

- Seguire le regole di [Capitolo 9 «Teoria della dualità»](https://fabiofurini.github.io/programmazione-lineare/dualita/09-dualita/) del modulo Programmazione lineare, utilizziamo una variabile duale libera $\pi_i$, il <strong>potenziale</strong> di nodo $i$, per la sua equazione di conservazione, e una variabile duale non negativa $\alpha_{ij}$ per la capacità di $(i,j)$.

!!! chiave ""

    Utilizzo delle variabili doppie libere $\pi_i$ per i vincoli [(4.1b)](il-modello-di-flusso-di-costo-minimo.md#mjx-eqn:nf:cons) e delle variabili doppie non negative $\alpha_{ij}$ per le capacità, il modello duale del modello $\mathrm{MCF}$ con $\vet{l}=\vet{0}$ è:

    <a id="eq-nf-DUAL"></a>

    \begin{align*}
    &&   \max \;\;{\sum_{i \in N} b_i \, \pi_i - \sum_{(i,j) \in A} u_{ij} \, \alpha_{ij}}        \label{nf:dobj}  \tag{4.2a}\\[1ex]
    && \text{subject to} \quad  \pi_i - \pi_j - \alpha_{ij} &\le c_{ij}, & \forall (i,j) \in A, \label{nf:dcons}  \tag{4.2b}\\[1ex]
    && \pi_i &\in \R, & \forall i \in N,                                                    \label{nf:dfree}  \tag{4.2c}\\[1ex]
    && \alpha_{ij} &\ge 0, & \forall (i,j) \in A.                                         \label{nf:dalpha} \tag{4.2d}
    \end{align*}

    Questo modello LP è denominato modello $D(\mathrm{MCF})$.

- Descrizione del modello duale:

    - la colonna di $x_{ij}$ ha $+1$ nell'equazione di $i$, $-1$ nell'equazione di $j$ e $-1$ nella sua capacità vincolo, che dà il vincolo duale $\eqref{nf:dcons}$, uno per ogni arco;

    - le variabili primarie sono non negative, quindi i vincoli duali sono di tipo $\le$.

- L'aggiunta della stessa costante a tutti i potenziali non modifica né $\eqref{nf:dcons}$ né l'obiettivo, poiché $\sum_{i \in N} b_i=0$: i potenziali possono essere normalizzati, ad esempio con $\pi_n=0$.

<a id="box-24-nf-def-reduced"></a>

!!! definizione "Definizione 4.17: costo ridotto"

    Date i potenziali $\vet{\pi} \in \R^n$, il <strong>costo ridotto</strong> dell'arco $(i,j) \in A$ è

    $$
    \bar{c}_{ij}=c_{ij}-\pi_i+\pi_j .
    $$

- Il vincolo duale $\eqref{nf:dcons}$ legge $\bar{c}_{ij}+\alpha_{ij} \ge 0$. Per i potenziali fissi, il migliore la scelta di $\alpha_{ij} \ge 0$ è la più piccola, $\alpha_{ij}=\max\{0,-\bar{c}_{ij}\}$.

<a id="box-25-nf-lem-identity"></a>

!!! teorema "Lemma 4.18: costo e costo ridotto"

    Per ogni $\vet{x}$ con $\mat{B}\vet{x}=\vet{b}$ e ogni $\vet{\pi} \in \R^n$,

    $$
    \sum_{(i,j) \in A} c_{ij}\, x_{ij}=\sum_{(i,j) \in A} \bar{c}_{ij}\, x_{ij}+\sum_{i \in N} b_i\, \pi_i .
    $$

??? dimostrazione "Dimostrazione"

    Poiché $c_{ij}=\bar{c}_{ij}+\pi_i-\pi_j$ è sufficiente mostrare $\sum_{(i,j) \in A}(\pi_i-\pi_j)\,x_{ij}=\sum_{i \in N} b_i\pi_i$. Il termine $\pi_i x_{ij}$ va alla coda e $-\pi_j x_{ij}$ alla testa, quindi

    $$
    \sum_{(i,j) \in A}(\pi_i-\pi_j)\,x_{ij}= \sum_{i \in N} \pi_i \Big (\sum_{(i,j) \in \delta ^+(i)} x_{ij} -\sum_{(j,i)\in \delta^-(i)} x_{ji}\Big)=\sum_{i \in N} \pi_i\, b_i .
    \qedhere
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

<a id="box-26-nf-th-gap"></a>

!!! teorema "Teorema 4.19: dualità gap"

    Sia $\vet{x}$ un flusso ammissibile ($\vet{l}=\vet{0}$) e $(\vet{\pi},\vet{\alpha})$ una soluzione ammissibile del Modello $D(\mathrm{MCF})$. Poi

    $$
    \sum_{(i,j) \in A} c_{ij}x_{ij}-\Big(\sum_{i \in N} b_i\pi_i-\sum_{(i,j) \in A} u_{ij}\alpha_{ij}\Big)
    =\sum_{(i,j) \in A} (\bar{c}_{ij}+\alpha_{ij})\,x_{ij}+\sum_{(i,j) \in A} \alpha_{ij}\,(u_{ij}-x_{ij}) \;\ge\; 0,
    $$

    ed entrambe le soluzioni sono ottimali se e solo se, per ogni arco, $(\bar{c}_{ij}+\alpha_{ij})\,x_{ij}=0$ e $\alpha_{ij}(u_{ij}-x_{ij})=0$.

??? dimostrazione "Dimostrazione"

    Per <span style="color:#1971c2">[Lemma 4.18](#box-25-nf-lem-identity)</span>, il lato sinistro è $\sum \bar{c}_{ij}x_{ij}+\sum u_{ij}\alpha_{ij}$, and $u_{ij}\alpha_{ij}=\alpha_{ij}x_{ij}+\alpha_{ij}(u_{ij}-x_{ij})$ fornisce l'identità.

    - Ogni termine è non negativo: $\bar{c}_{ij}+\alpha_{ij} \ge 0$ per $\eqref{nf:dcons}$, $\alpha_{ij} \ge 0$ e $0 \le x_{ij} \le u_{ij}$.

    - Se il divario è zero, il costo primario è uguale a un valore duale, che è un limite inferiore su ogni costo primario da parte del la disuguaglianza appena dimostrata: $\vet{x}$ è ottimale, e allo stesso modo $(\vet{\pi},\vet{\alpha})$ è ottimale.

    - Se entrambi sono ottimali, il divario è zero per il teorema della dualità forte di [Capitolo 9 «Teoria della dualità»](https://fabiofurini.github.io/programmazione-lineare/dualita/09-dualita/). Una somma di termini non negativi è zero se e solo se ogni termine è zero.

    <p class="qed-riga"><span class="qed">□</span></p>

<a id="box-27-nf-cor-certificate"></a>

!!! teorema "Corollario 4.20: certificato a costo ridotto"

    Sia $\vet{x}$ un flusso ammissibile ($\vet{l}=\vet{0}$) e $\vet{\pi} \in \R^n$ potenziali tali che, per ogni arco,

    $$
    \bar{c}_{ij}>0 \;\Rightarrow\; x_{ij}=0, \qquad\qquad \bar{c}_{ij}<0 \;\Rightarrow\; x_{ij}=u_{ij}.
    $$

    Allora $\vet{x}$ è un flusso ottimale e $\vet{\pi}$ con $\alpha_{ij}=\max\{0,-\bar{c}_{ij}\}$ è una soluzione ottimale del modello $D(\mathrm{MCF})$.

??? dimostrazione "Dimostrazione"

    La coppia $(\vet{\pi},\vet{\alpha})$ è duale, poiché $\alpha_{ij} \ge 0$ e $\bar{c}_{ij}+\alpha_{ij} \ge 0$. Controlliamo le due condizioni di <span style="color:#1971c2">[Teorema 4.19](#box-26-nf-th-gap)</span> su ogni arco.

    - Se $\bar{c}_{ij} \ge 0$, allora $\alpha_{ij}=0$ e $\bar{c}_{ij}x_{ij}=0$ perché $\bar{c}_{ij}>0$ forza $x_{ij}=0$.

    - Se $\bar{c}_{ij}<0$, allora $\bar{c}_{ij}+\alpha_{ij}=0$ e $\alpha_{ij}(u_{ij}-x_{ij})=0$ perché $x_{ij}=u_{ij}$.

    Il divario è zero, quindi entrambe le soluzioni sono ottimali. <span class="qed">□</span>

- Un arco con costo ridotto positivo è vuoto, un arco con costo ridotto negativo è saturo e un arco strettamente tra i suoi limiti ha un costo ridotto pari a zero.

<a id="box-28-nf-ex-dual"></a>

!!! esempio "Esempio 4.8: il duale della rete di riferimento"

    Per la rete di <span style="color:#1971c2">[Esempio 4.1](reti-e-flussi.md#box-3-nf-ex-ref)</span>, il modello $D(\mathrm{MCF})$ è

    $$
    \max\; 5\pi_1+2\pi_2-3\pi_4-4\pi_6-\big(4\alpha_{12}+4\alpha_{13}+4\alpha_{24}+2\alpha_{32}+4\alpha_{35}+3\alpha_{43}
    +5\alpha_{46}+3\alpha_{54}+2\alpha_{56}\big)
    $$

    con $\vet{\alpha} \ge \vet{0}$, potenziali liberi e un vincolo per arco:

    $$
    \begin{array}{lll}
    \pi_1-\pi_2-\alpha_{12} \le 2, & \pi_1-\pi_3-\alpha_{13} \le 2, & \pi_2-\pi_4-\alpha_{24} \le 5,\\
    \pi_3-\pi_2-\alpha_{32} \le 2, & \pi_3-\pi_5-\alpha_{35} \le 3, & \pi_4-\pi_3-\alpha_{43} \le 3,\\
    \pi_4-\pi_6-\alpha_{46} \le 5, & \pi_5-\pi_4-\alpha_{54} \le 5, & \pi_5-\pi_6-\alpha_{56} \le 3.
    \end{array}
    $$

    I bilancieri $b_3=b_5=0$ fanno scomparire $\pi_3$ e $\pi_5$ dall'obiettivo.

- I potenziali ed i costi ridotti sono alla base dei test di ottimalità di [Capitolo 6 «Flusso di costo minimo»](../min-cost-flow/index.md).

!!! chiave ""

    Il duale del modello $\mathrm{MCF}$ ha un potenziale $\pi_i$ per nodo; il costo ridotto è $\bar{c}_{ij}=c_{ij}-\pi_i+\pi_j$. Un flusso ammissibile i cui archi a costo ridotto positivo sono vuoti e gli archi a costo ridotto negativo sono saturati è ottimale.

---

**Avanti:** [4.8 Casi speciali](casi-speciali.md)
