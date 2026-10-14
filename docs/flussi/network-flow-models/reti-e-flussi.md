---
title: "Reti e flussi"
---

# 4.1 Reti e flussi { #sez-sec-nf-networks }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 4** · [:material-book-open-variant: Capitolo 4: Modelli di flusso](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-pencil: Esercizi: Modelli di flusso](../../esercizi/network-flow-models.md)

</div>

<a id="box-1-nf-def-network"></a>

!!! definizione "Definizione 4.1: rete"

    Una <strong>rete</strong> è un grafo diretto $G=(N,A)$, con nodi $n=|N|$ e archi $m=|A|$, insieme ai seguenti dati.

    - Ogni nodo $i \in N$ ha un <strong>balance</strong> $b_i \in \R$. Il nodo è un <strong>nodo di fornitura</strong> se $b_i>0$, un <strong>nodo di richiesta</strong> se $b_i<0$ e <strong>nodo di traslato</strong> se $b_i=0$.

    - Ogni arco $(i,j) \in A$ ha un <strong>limite inferiore</strong> $l_{ij}$ e un <strong>capacità</strong> $u_{ij}$, con $0 \le l_{ij} \le u_{ij} \le +\infty$, and a <strong>cost</strong> $c_{ij} \in \R$ per unità di portata.

    Quando non vengono forniti i limiti inferiori, $l_{ij}=0$ per ogni arco.

<a id="box-2-nf-def-flow"></a>

!!! definizione "Definizione 4.2: flusso"

    Sia $G=(N,A)$ una rete. Un <strong>flusso</strong> è un vettore $\vet{x} \in \R^m$ con una componente $x_{ij}$ per ogni $(i,j) \in A$, pari alla quantità inviata lungo l'arco.

    - Il flusso soddisfa il vincolo <strong>conservazione del flusso</strong> del nodo $i$ se ciò che esce da $i$ meno ciò che entra $i$ equivale al saldo:

        $$
        \sum_{(i,j) \in \delta^+(i)} x_{ij} \;-\; \sum_{(j,i) \in \delta^-(i)} x_{ji} = b_i .
        $$

    - Il flusso è <strong>ammissibile</strong> se soddisfa la conservazione del flusso in ogni nodo e $l_{ij} \le x_{ij} \le u_{ij}$ per ogni arco. Il suo <strong>costo</strong> è $\sum_{(i,j) \in A} c_{ij}\, x_{ij}$.

- Un nodo di offerta invia $b_i$ unità in più di quante ne riceve; un nodo di domanda riceve $-b_i$ unità in più di quante ne invia. Un nodo di transito trasmette tutto il flusso che riceve.

- Con la matrice di incidenza nodo-arco $\mat{B}$ del [Capitolo 1 «Grafi»](../../grafi/graphs/index.md), la conservazione del flusso in tutti i nodi si scrive $\mat{B}\vet{x}=\vet{b}$: la riga $i$ di $\mat{B}\vet{x}$ è il deflusso meno l'afflusso di $i$.

<a id="box-3-nf-ex-ref"></a>

!!! esempio "Esempio 4.1: la rete di riferimento"

    Aggiungiamo i dati al grafo di riferimento di [Capitolo 1 «Grafi»](../../grafi/graphs/index.md), con gli archi numerati $a_1,a_2,\dots,a_9$ in ordine lessicografo. I saldi sono

    $$
    b_1=5,\qquad b_2=2,\qquad b_3=0,\qquad b_4=-3,\qquad b_5=0,\qquad b_6=-4,
    $$

    quindi i nodi $1$ e $2$ forniscono unità $7$, i nodi $4$ e $6$ le richiedono e i nodi $3$ e $5$ sono nodi di traslato. I limiti inferiori sono zero e i costi e le capacità sono:

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

    Nella figura ogni arco porta la coppia $c_{ij},u_{ij}$, e ogni nodo il suo equilibrio $b_i$ (in blu).

    ![Figura 1](../../img/network-flow-models/fig01.svg){ .fig loading=lazy  }

    Il flusso $\bar{\vet{x}}$ con

    $$
    \bar{x}_{12}=1,~ \bar{x}_{13}=4,~ \bar{x}_{24}=3,~ \bar{x}_{32}=0,~ \bar{x}_{35}=4,~ \bar{x}_{43}=0,~
    \bar{x}_{46}=2,~ \bar{x}_{54}=2,~ \bar{x}_{56}=2
    $$

    è fattibile. Ad esempio, nel nodo $4$ il deflusso è $\bar{x}_{43}+\bar{x}_{46}=2$, l'afflusso è $\bar{x}_{24}+\bar{x}_{54}=5$ e $2-5=-3=b_4$. Gli archi $(1,3)$, $(3,5)$ e $(5,6)$ sono al completo e il costo di $\bar{\vet{x}}$ è $63$.

## 4.1.1 Flusso attraverso un taglio

- Per un insieme di nodi $S \subseteq N$, denotiamo con $\delta^+(S)$ gli archi con la coda in $S$ e la testa all'esterno di $S$, da $\delta^-(S)$ gli archi con la testa in $S$ e la coda all'esterno di $S$ e $x(F)=\sum_{(i,j) \in F} x_{ij}$ for a set of arcs $F$.

<a id="box-4-nf-lem-cut"></a>

!!! teorema "Lemma 4.3: flusso attraverso un taglio"

    Lascia che $\vet{x}$ soddisfi la conservazione del flusso in ogni nodo di una rete $G=(N,A)$. Quindi, per ogni $S \subseteq N$,

    $$
    x(\delta^+(S))-x(\delta^-(S))=\sum_{i \in S} b_i .
    $$

??? dimostrazione "Dimostrazione"

    Sommare i vincoli di conservazione dei nodi di $S$; il lato destro è $\sum_{i \in S} b_i$.

    - Un arco con entrambi i punti finali in $S$ appare due volte, con $+x_{ij}$ nella riga della coda e $-x_{ij}$ nella riga fila della sua testa: annulla.

    - Un arco di $\delta^+(S)$ appare solo nella riga della sua coda, con $+x_{ij}$; un arco di $\delta^-(S)$ solo in la fila della sua testa, con $-x_{ij}$; gli altri archi non compaiono.

    <p class="qed-riga"><span class="qed">□</span></p>

- In <span style="color:#1971c2">[Esempio 4.1](#box-3-nf-ex-ref)</span>, l'insieme $S=\{1,2,3\}$ ha $\delta^+(S)=\{(2,4),(3,5)\}$ e $\delta^-(S)=\{(4,3)\}$. Il flusso $\bar{\vet{x}}$ dà $3+4-0=7=b_1+b_2+b_3$.

!!! chiave ""

    Una rete ha equilibri sui nodi e limiti inferiori, capacità e costi sugli archi. Un flusso ammissibile soddisfa $\mat{B}\vet{x}=\vet{b}$ e i limiti; attraverso ogni taglio, il deflusso netto equivale al saldo totale dei nodi dentro.

---

**Avanti:** [4.2 Il modello di flusso di costo minimo](il-modello-di-flusso-di-costo-minimo.md)
