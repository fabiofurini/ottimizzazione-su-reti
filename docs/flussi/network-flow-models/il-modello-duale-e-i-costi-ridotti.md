---
title: "Il modello duale e i costi ridotti"
---

# 4.7 Il modello duale e i costi ridotti { #sez-sec-nf-dual }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 4** · [:material-book-open-variant: Capitolo 4: Modelli di flusso](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-presentation: Slide](../../pdf/slide-network-flow-models.pdf) · [:material-pencil: Esercizi: Modelli di flusso](../../esercizi/network-flow-models.md)

</div>

- Per la <span style="color:#1971c2">[Proposizione 4.9](rimozione-dei-limiti-inferiori.md#box-12-nf-prop-subst)</span> i limiti inferiori si possono eliminare, quindi in questa sezione $\vet{l}=\vet{0}$ e ogni capacità è finita. Il vincolo $x_{ij} \le u_{ij}$ si scrive come $-x_{ij} \ge -u_{ij}$.

- Seguendo le regole del [Capitolo 9 «Teoria della dualità»](https://fabiofurini.github.io/programmazione-lineare/dualita/09-dualita/) del modulo Programmazione lineare, usiamo una variabile duale libera $\pi_i$, il <strong>potenziale</strong> del nodo $i$, per la sua equazione di conservazione, e una variabile duale non negativa $\alpha_{ij}$ per la capacità di $(i,j)$.

!!! chiave ""

    Con variabili duali libere $\pi_i$ per i vincoli [(4.1b)](il-modello-di-flusso-di-costo-minimo.md#mjx-eqn:nf:cons) e variabili duali non negative $\alpha_{ij}$ per le capacità, il modello duale del modello $\mathrm{MCF}$ con $\vet{l}=\vet{0}$ è:

    <a id="eq-nf-DUAL"></a>

    \begin{align*}
    &&   \max \;\;{\sum_{i \in N} b_i \, \pi_i - \sum_{(i,j) \in A} u_{ij} \, \alpha_{ij}}        \label{nf:dobj}  \tag{4.2a}\\[1ex]
    && \text{soggetto a} \quad  \pi_i - \pi_j - \alpha_{ij} &\le c_{ij}, & \forall (i,j) \in A, \label{nf:dcons}  \tag{4.2b}\\[1ex]
    && \pi_i &\in \R, & \forall i \in N,                                                    \label{nf:dfree}  \tag{4.2c}\\[1ex]
    && \alpha_{ij} &\ge 0, & \forall (i,j) \in A.                                         \label{nf:dalpha} \tag{4.2d}
    \end{align*}

    Questo modello LP si indica come modello $D(\mathrm{MCF})$.

- Descrizione del modello duale:

    - la colonna di $x_{ij}$ ha $+1$ nell'equazione di $i$, $-1$ nell'equazione di $j$ e $-1$ nel suo vincolo di capacità, e questo dà il vincolo duale $\eqref{nf:dcons}$, uno per ogni arco;

    - le variabili primali sono non negative, quindi i vincoli duali sono di tipo $\le$.

- Aggiungere la stessa costante a tutti i potenziali non cambia né $\eqref{nf:dcons}$ né l'obiettivo, perché $\sum_{i \in N} b_i=0$: i potenziali si possono normalizzare, per esempio con $\pi_n=0$.

<a id="box-24-nf-def-reduced"></a>

!!! definizione "Definizione 4.17: costo ridotto"

    Dati i potenziali $\vet{\pi} \in \R^n$, il <strong>costo ridotto</strong> dell'arco $(i,j) \in A$ è

    $$
    \bar{c}_{ij}=c_{ij}-\pi_i+\pi_j .
    $$

- Il vincolo duale $\eqref{nf:dcons}$ si scrive $\bar{c}_{ij}+\alpha_{ij} \ge 0$. Fissati i potenziali, la scelta migliore di $\alpha_{ij} \ge 0$ è la più piccola, $\alpha_{ij}=\max\{0,-\bar{c}_{ij}\}$.

<a id="box-25-nf-lem-identity"></a>

!!! teorema "Lemma 4.18: costo e costo ridotto"

    Per ogni $\vet{x}$ con $\mat{B}\vet{x}=\vet{b}$ e ogni $\vet{\pi} \in \R^n$,

    $$
    \sum_{(i,j) \in A} c_{ij}\, x_{ij}=\sum_{(i,j) \in A} \bar{c}_{ij}\, x_{ij}+\sum_{i \in N} b_i\, \pi_i .
    $$

??? dimostrazione "Dimostrazione"

    Poiché $c_{ij}=\bar{c}_{ij}+\pi_i-\pi_j$, basta mostrare che $\sum_{(i,j) \in A}(\pi_i-\pi_j)\,x_{ij}=\sum_{i \in N} b_i\pi_i$. Il termine $\pi_i x_{ij}$ va alla coda e $-\pi_j x_{ij}$ alla testa, quindi

    $$
    \sum_{(i,j) \in A}(\pi_i-\pi_j)\,x_{ij}=\sum_{i \in N} \pi_i \Big(\sum_{(i,j) \in \delta^+(i)} x_{ij}-\sum_{(j,i)
    \in \delta^-(i)} x_{ji}\Big)=\sum_{i \in N} \pi_i\, b_i .
    \qedhere
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

<a id="box-26-nf-th-gap"></a>

!!! teorema "Teorema 4.19: gap di dualità"

    Siano $\vet{x}$ un flusso ammissibile ($\vet{l}=\vet{0}$) e $(\vet{\pi},\vet{\alpha})$ una soluzione ammissibile del modello $D(\mathrm{MCF})$. Allora

    $$
    \sum_{(i,j) \in A} c_{ij}x_{ij}-\Big(\sum_{i \in N} b_i\pi_i-\sum_{(i,j) \in A} u_{ij}\alpha_{ij}\Big)
    =\sum_{(i,j) \in A} (\bar{c}_{ij}+\alpha_{ij})\,x_{ij}+\sum_{(i,j) \in A} \alpha_{ij}\,(u_{ij}-x_{ij}) \;\ge\; 0,
    $$

    e le due soluzioni sono ottime se e solo se, per ogni arco, $(\bar{c}_{ij}+\alpha_{ij})\,x_{ij}=0$ e $\alpha_{ij}(u_{ij}-x_{ij})=0$.

??? dimostrazione "Dimostrazione"

    Per il <span style="color:#1971c2">[Lemma 4.18](#box-25-nf-lem-identity)</span>, il membro sinistro è $\sum \bar{c}_{ij}x_{ij}+\sum u_{ij}\alpha_{ij}$, e $u_{ij}\alpha_{ij}=\alpha_{ij}x_{ij}+\alpha_{ij}(u_{ij}-x_{ij})$ dà l'identità.

    - Ogni termine è non negativo: $\bar{c}_{ij}+\alpha_{ij} \ge 0$ per $\eqref{nf:dcons}$, $\alpha_{ij} \ge 0$, e $0 \le x_{ij} \le u_{ij}$.

    - Se il gap è nullo, il costo primale è uguale a un valore duale, che per la disuguaglianza appena dimostrata è un lower bound di ogni costo primale: $\vet{x}$ è ottimo, e allo stesso modo $(\vet{\pi},\vet{\alpha})$ è ottima.

    - Se entrambe sono ottime, il gap è nullo per il teorema della dualità forte del [Capitolo 9 «Teoria della dualità»](https://fabiofurini.github.io/programmazione-lineare/dualita/09-dualita/). Una somma di termini non negativi è nulla se e solo se ogni termine è nullo.

    <p class="qed-riga"><span class="qed">□</span></p>

<a id="box-27-nf-cor-certificate"></a>

!!! teorema "Corollario 4.20: certificato dei costi ridotti"

    Siano $\vet{x}$ un flusso ammissibile ($\vet{l}=\vet{0}$) e $\vet{\pi} \in \R^n$ potenziali tali che, per ogni arco,

    $$
    \bar{c}_{ij}>0 \;\Rightarrow\; x_{ij}=0, \qquad\qquad \bar{c}_{ij}<0 \;\Rightarrow\; x_{ij}=u_{ij}.
    $$

    Allora $\vet{x}$ è un flusso ottimo, e $\vet{\pi}$ con $\alpha_{ij}=\max\{0,-\bar{c}_{ij}\}$ è una soluzione ottima del modello $D(\mathrm{MCF})$.

??? dimostrazione "Dimostrazione"

    La coppia $(\vet{\pi},\vet{\alpha})$ è duale ammissibile, perché $\alpha_{ij} \ge 0$ e $\bar{c}_{ij}+\alpha_{ij} \ge 0$. Verifichiamo le due condizioni del <span style="color:#1971c2">[Teorema 4.19](#box-26-nf-th-gap)</span> su ogni arco.

    - Se $\bar{c}_{ij} \ge 0$, allora $\alpha_{ij}=0$, e $\bar{c}_{ij}x_{ij}=0$ perché $\bar{c}_{ij}>0$ impone $x_{ij}=0$.

    - Se $\bar{c}_{ij}<0$, allora $\bar{c}_{ij}+\alpha_{ij}=0$, e $\alpha_{ij}(u_{ij}-x_{ij})=0$ perché $x_{ij}=u_{ij}$.

    Il gap è nullo, quindi le due soluzioni sono ottime. <span class="qed">□</span>

- Un arco con costo ridotto positivo è vuoto, un arco con costo ridotto negativo è saturo, e un arco strettamente compreso fra i suoi limiti ha costo ridotto nullo.

<a id="box-28-nf-ex-dual"></a>

!!! esempio "Esempio 4.8: il duale della rete di riferimento"

    Per la rete dell'<span style="color:#1971c2">[Esempio 4.1](reti-e-flussi.md#box-3-nf-ex-ref)</span>, il modello $D(\mathrm{MCF})$ è

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

    I bilanci $b_3=b_5=0$ fanno sparire $\pi_3$ e $\pi_5$ dall'obiettivo.

- I potenziali e i costi ridotti sono la base dei test di ottimalità del [Capitolo 6 «Flusso di costo minimo»](../min-cost-flow/index.md).

!!! chiave ""

    Il duale del modello $\mathrm{MCF}$ ha un potenziale $\pi_i$ per nodo; il costo ridotto è $\bar{c}_{ij}=c_{ij}-\pi_i+\pi_j$. Un flusso ammissibile con gli archi a costo ridotto positivo vuoti e gli archi a costo ridotto negativo saturi è ottimo.

---

**Avanti:** [4.8 Casi speciali](casi-speciali.md)
