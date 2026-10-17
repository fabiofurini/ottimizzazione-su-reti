---
title: "Reti e flussi"
---

# 4.1 Reti e flussi { #sez-sec-nf-networks }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 4** · [:material-book-open-variant: Capitolo 4: Modelli di flusso](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-presentation: Slide](../../pdf/slide-network-flow-models.pdf) · [:material-pencil: Esercizi: Modelli di flusso](../../esercizi/network-flow-models.md)

</div>

<a id="box-1-nf-def-network"></a>

!!! definizione "Definizione 4.1: rete"

    Una <strong>rete</strong> è un grafo orientato $G=(N,A)$, con $n=|N|$ nodi e $m=|A|$ archi, insieme ai seguenti dati.

    - Ogni nodo $i \in N$ ha un <strong>bilancio</strong> $b_i \in \R$. Il nodo è un <strong>nodo di offerta</strong> se $b_i>0$, un <strong>nodo di domanda</strong> se $b_i<0$ e un <strong>nodo di trasbordo</strong> se $b_i=0$.

    - Ogni arco $(i,j) \in A$ ha un <strong>limite inferiore</strong> $l_{ij}$ e una <strong>capacità</strong> $u_{ij}$, con $0 \le l_{ij} \le u_{ij} \le +\infty$, e un <strong>costo</strong> $c_{ij} \in \R$ per unità di flusso.

    Quando i limiti inferiori non sono dati, $l_{ij}=0$ per ogni arco.

<a id="box-2-nf-def-flow"></a>

!!! definizione "Definizione 4.2: flusso"

    Sia $G=(N,A)$ una rete. Un <strong>flusso</strong> è un vettore $\vet{x} \in \R^m$ con una componente $x_{ij}$, la quantità inviata lungo l'arco, per ogni $(i,j) \in A$.

    - Il flusso soddisfa il vincolo di <strong>conservazione del flusso</strong> del nodo $i$ se ciò che esce da $i$ meno ciò che entra in $i$ è uguale al bilancio:

        $$
        \sum_{(i,j) \in \delta^+(i)} x_{ij} \;-\; \sum_{(j,i) \in \delta^-(i)} x_{ji} = b_i .
        $$

    - Il flusso è <strong>ammissibile</strong> se soddisfa la conservazione del flusso in ogni nodo e $l_{ij} \le x_{ij} \le u_{ij}$ per ogni arco. Il suo <strong>costo</strong> è $\sum_{(i,j) \in A} c_{ij}\, x_{ij}$.

- Un nodo di offerta invia $b_i$ unità in più di quante ne riceve, un nodo di domanda riceve $-b_i$ unità in più di quante ne invia, e un nodo di trasbordo trasmette tutto ciò che riceve.

- Con la matrice di incidenza nodo–arco $\mat{B}$ del [Capitolo 1 «Grafi»](../../grafi/graphs/index.md), la conservazione del flusso in tutti i nodi si scrive $\mat{B}\vet{x}=\vet{b}$: la riga $i$ di $\mat{B}\vet{x}$ è il flusso uscente meno il flusso entrante di $i$.

<a id="box-3-nf-ex-ref"></a>

!!! esempio "Esempio 4.1: la rete di riferimento"

    Aggiungiamo i dati al grafo di riferimento del [Capitolo 1 «Grafi»](../../grafi/graphs/index.md), con gli archi numerati $a_1,a_2,\dots,a_9$ in ordine lessicografico. I bilanci sono

    $$
    b_1=5,\qquad b_2=2,\qquad b_3=0,\qquad b_4=-3,\qquad b_5=0,\qquad b_6=-4,
    $$

    quindi i nodi $1$ e $2$ offrono $7$ unità, i nodi $4$ e $6$ le domandano, e i nodi $3$ e $5$ sono nodi di trasbordo. I limiti inferiori sono nulli, e i costi e le capacità sono:

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

    Nella figura ogni arco porta la coppia $c_{ij},u_{ij}$, e ogni nodo il suo bilancio $b_i$ (in blu).

    ![Figura 1](../../img/network-flow-models/fig01.svg){ .fig loading=lazy  }

    Il flusso $\bar{\vet{x}}$ con

    $$
    \bar{x}_{12}=1,~ \bar{x}_{13}=4,~ \bar{x}_{24}=3,~ \bar{x}_{32}=0,~ \bar{x}_{35}=4,~ \bar{x}_{43}=0,~
    \bar{x}_{46}=2,~ \bar{x}_{54}=2,~ \bar{x}_{56}=2
    $$

    è ammissibile. Per esempio, nel nodo $4$ il flusso uscente è $\bar{x}_{43}+\bar{x}_{46}=2$, il flusso entrante è $\bar{x}_{24}+\bar{x}_{54}=5$, e $2-5=-3=b_4$. Gli archi $(1,3)$, $(3,5)$ e $(5,6)$ sono saturi, e il costo di $\bar{\vet{x}}$ è $63$.

## 4.1.1 Flusso attraverso un taglio

- Per un insieme di nodi $S \subseteq N$, indichiamo con $\delta^+(S)$ gli archi con la coda in $S$ e la testa fuori da $S$, con $\delta^-(S)$ gli archi con la testa in $S$ e la coda fuori da $S$, e poniamo $x(F)=\sum_{(i,j) \in F} x_{ij}$ per un insieme di archi $F$.

<a id="box-4-nf-lem-cut"></a>

!!! teorema "Lemma 4.3: flusso attraverso un taglio"

    Sia $\vet{x}$ un vettore che soddisfa la conservazione del flusso in ogni nodo di una rete $G=(N,A)$. Allora, per ogni $S \subseteq N$,

    $$
    x(\delta^+(S))-x(\delta^-(S))=\sum_{i \in S} b_i .
    $$

??? dimostrazione "Dimostrazione"

    Sommiamo i vincoli di conservazione dei nodi di $S$; il termine noto è $\sum_{i \in S} b_i$.

    - Un arco con entrambi gli estremi in $S$ compare due volte, con $+x_{ij}$ nella riga della coda e $-x_{ij}$ nella riga della testa: si cancella.

    - Un arco di $\delta^+(S)$ compare solo nella riga della coda, con $+x_{ij}$; un arco di $\delta^-(S)$ solo nella riga della testa, con $-x_{ij}$; gli altri archi non compaiono.

    <p class="qed-riga"><span class="qed">□</span></p>

- Nell'<span style="color:#1971c2">[Esempio 4.1](#box-3-nf-ex-ref)</span>, l'insieme $S=\{1,2,3\}$ ha $\delta^+(S)=\{(2,4),(3,5)\}$ e $\delta^-(S)=\{(4,3)\}$. Il flusso $\bar{\vet{x}}$ dà $3+4-0=7=b_1+b_2+b_3$.

!!! chiave ""

    Una rete ha bilanci sui nodi e limiti inferiori, capacità e costi sugli archi. Un flusso ammissibile soddisfa $\mat{B}\vet{x}=\vet{b}$ e i limiti; attraverso ogni taglio, il flusso uscente netto è uguale al bilancio totale dei nodi interni.

---

**Avanti:** [4.2 Il modello di flusso di costo minimo](il-modello-di-flusso-di-costo-minimo.md)
