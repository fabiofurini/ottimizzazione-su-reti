---
title: "Soluzioni di base"
---

# 7.2 Soluzioni di base { #sez-ta-sec-basic }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 7** · [:material-book-open-variant: Capitolo 7: Trasporto e assegnamento](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-pencil: Esercizi: Trasporto e assegnamento](../../esercizi/transportation-and-assignment.md)

</div>

- La colonna di $x_{ij}$ nei vincoli del modello $\mathrm{TP}$ ha due voci uguali a $1$, nella riga del offerta di $i$ e nella riga della domanda di $j$. Cambiando il segno delle righe della domanda si ottiene la matrice di incidenza $\mat{B}$ della rete bipartita completa e non modifica né il rango né le dipendenze lineari delle colonne.

<a id="box-7-ta-prop-rank"></a>

!!! teorema "Proposizione 7.4: rango del modello di trasporto"

    I vincoli $m+n$ del modello $\mathrm{TP}$ hanno il rango $m+n-1$. In un'istanza bilanciata ogni vincolo è implicito nel altri.

??? dimostrazione "Dimostrazione"

    Ogni origine è unita ad ogni destinazione, quindi è connessa l'intera rete bipartita, e la sua incidenza matrice ha rango $m+n-1$ per il Teorema «rango della matrice di incidenza» di [Capitolo 1](../../grafi/graphs/il-rango-della-matrice-di-incidenza.md). La somma delle righe dell'offerta meno la somma delle righe della domanda è zero, poiché entrambe le somme contengono ogni variabile una volta e la stessa combinazione dei lati destri è $\sum_{i \in P} a_i-\sum_{j \in D} d_j=0$: qualsiasi vincolo è a combinazione degli altri. <span class="qed">□</span>

<a id="box-8-ta-def-basis"></a>

!!! definizione "Definizione 7.5: base e soluzione di base"

    Una <strong>basis</strong> del modello $\mathrm{TP}$ è un insieme $T$ di celle $m+n-1$ i cui archi formano uno albero ricoprente dell'intero rete bipartita; le sue celle sono le <strong>celle base</strong>. Una <strong>soluzione base</strong> di $T$ è una soluzione di vincoli [(7.1b)](il-problema-dei-trasporti.md#mjx-eqn:ta:supply) e [(7.1c)](il-problema-dei-trasporti.md#mjx-eqn:ta:demand) con $x_{ij}=0$ per ogni cella esterna a $T$. È un <strong>base soluzione ammissibile</strong> se $\vet{x} \ge \vet{0}$, ed è <strong>degenerata</strong> se qualche cella base ha $x_{ij}=0$.

<a id="box-9-ta-th-basis"></a>

!!! teorema "Teorema 7.6: le basi sono alberi ricoperti"

    - **(a)** Un insieme di celle $m+n-1$ ha colonne linearmente indipendenti se e solo se i suoi archi formano uno albero ricoprente.

    - **(b)** In un'istanza bilanciata, ogni base $T$ ha esattamente una soluzione di base. Si trova fissando, ancora e ancora, la cella di una foglia dell'albero, ed è intera quando le forniture e le richieste sono intere.

??? dimostrazione "Dimostrazione"

    La parte (a) è il Corollario «basi della matrice di incidenza» di [Capitolo 1](../../grafi/graphs/il-rango-della-matrice-di-incidenza.md), poiché il segno delle righe della domanda non modifica le dipendenze delle colonne. Per la parte (b):

    1. <em>Unicità.</em> Due soluzioni base di $T$ differiscono per un vettore $\vet{y}$ che è zero all'esterno di $T$ e soddisfa i vincoli con zero lati destri; le colonne di $T$ sono indipendenti da (a), quindi $\vet{y}=\vet{0}$.

    2. <em>Costruzione.</em> L'albero ha una foglia $v$ (Lemma «foglie» di [Capitolo 1](../../grafi/graphs/alberi-e-foreste.md)), con uno solo cella $e$ di $T$. Il vincolo di $v$ non contiene altre celle di base, quindi $x_e$ equivale all'offerta o alla domanda di $v$.

    3. Rimuoviamo $v$ e $e$ e sottraiamo $x_e$ dall'offerta o dalla domanda dell'altro endpoint di $e$. Il restante le celle formano un albero di copertura dei nodi rimanenti e le rimanenti forniture e domande hanno ancora somme uguali.

    4. Quando viene lasciata una singola cella, entrambi i suoi punti finali sono foglie e le somme uguali danno lo stesso valore per entrambi vincoli. Ogni valore è ottenuto da somme e differenze dei dati, quindi è intero per dati interi. <span class="qed">□</span>

<a id="box-10-ta-prop-vertex"></a>

!!! teorema "Proposizione 7.7: i vertici sono basilari"

    Ogni vertice $\bar{\vet{x}}$ della regione ammissibile del modello $\mathrm{TP}$ è una soluzione ammissibile di base: le sue celle con $\bar{x}_{ij}>0$ formano una foresta, contenuta in una base $T$, e $\bar{\vet{x}}$ è la soluzione base di $T$.

??? dimostrazione "Dimostrazione"

    Lascia che $F$ siano le celle con $\bar{x}_{ij}>0$.

    1. Le colonne di $F$ sono linearmente indipendenti, per il primo passo della dimostrazione del Teorema «vertici interi» di [Capitolo 4](../network-flow-models/totale-unimodularita-e-integralita.md): qui rigorosamente le celle tra i loro limiti ci sono quelli di $F$. Un ciclo ha colonne dipendenti (Lemma «colonne di un ciclo» del Capitolo 1), quindi $F$ è una foresta.

    2. La rete è connessa: mentre la foresta ha due o più componenti, qualche arco ne unisce uno all'altro uno, e sommandolo non si crea alcun ciclo (Lemma «aggiungere un lato» del Capitolo 1). Terminiamo con uno albero ricoprente $T \supseteq F$.

    3. $\bar{\vet{x}}$ è zero all'esterno di $F \subseteq T$, quindi è la soluzione base di $T$, unica per <span style="color:#1971c2">[Teorema 7.6](#box-9-ta-th-basis)</span>. <span class="qed">□</span>

- Un ciclo della rete bipartita alterna origini e destinazioni. Nel tableau è un percorso chiuso celle dell'insieme, spostandosi alternativamente lungo una riga e lungo una colonna: un insieme di celle è una base se ha $m+n-1$ celle e nessun percorso chiuso.

- Una soluzione ammissibile di base ha al massimo $m+n-1$ quantità positive; ne ha di meno quando è degenere.

<a id="box-11-ta-ex-bases"></a>

!!! esempio "Esempio 7.4: basi dell'istanza di trasporto"

    In <span style="color:#1971c2">[Esempio 7.1](il-problema-dei-trasporti.md#box-3-ta-ex-tp)</span> una base ha celle $m+n-1=3+4-1=6$.

    - Le celle $(1,4)$, $(1,5)$, $(2,4)$, $(2,5)$, $(3,6)$, $(3,7)$ non sono una base: $(1,4)$, $(2,4)$, $(2,5)$, $(1,5)$ costituiscono il ciclo $1,4,2,5,1$, anzi $\mat{A}_{14}-\mat{A}_{24}+\mat{A}_{25}-\mat{A}_{15}=\vet{0}$ per la loro colonne $\mat{A}_{ij}$.

    - Le celle $(1,4)$, $(1,5)$, $(1,6)$, $(1,7)$, $(2,7)$, $(3,7)$ formano uno albero ricoprente. Lascia $2,3,4,5,6$ fisso $x_{27}=30$, $x_{37}=30$, $x_{14}=10$, $x_{15}=25$, $x_{16}=15$; quindi viene fornita la riga di origine $1$

        $$
        x_{17}=30-10-25-15=-20 .
        $$

        La soluzione di base esiste, ma non è fattibile.

!!! chiave ""

    I vincoli del modello $\mathrm{TP}$ hanno rango $m+n-1$. Una base è un albero di copertura della rete bipartita, con celle $m+n-1$; la sua soluzione di base si trova foglia per foglia, è intera per dati interi e ogni vertice è una base soluzione fattibile.

---

**Avanti:** [7.3 Soluzioni iniziali di base fattibili](soluzioni-iniziali-di-base-fattibili.md)
