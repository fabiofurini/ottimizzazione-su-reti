---
title: "L'algoritmo del simplesso sul modello di flusso di costo minimo"
---

# 8.1 L'algoritmo del simplesso sul modello di flusso di costo minimo { #sez-sec-ns-lp }

<div class="info-capitolo" markdown>

**Parte 4 · Il simplesso su reti · Capitolo 8** · [:material-book-open-variant: Capitolo 8: Simplesso su reti](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-simplesso-su-reti.pdf) · [:material-presentation: Slide](../../pdf/slide-network-simplex.pdf) · [:material-pencil: Esercizi: Simplesso su reti](../../esercizi/network-simplex.md) · [:material-gesture-tap: App: Il simplesso su reti, pivot per pivot](../../laboratorio/simplesso-su-reti.md)

</div>

<a id="box-1-ns-def-basis"></a>

!!! definizione "Definizione 8.1: base e soluzione di base"

    Sia $G=(N,A)$ una rete con $n$ nodi e $m$ archi, il cui grafo non orientato sottostante è connesso, con bilanci $b_i$ tali che $\sum_{i \in N} b_i=0$, costi $c_{ij}$, limiti inferiori nulli e capacità $0<u_{ij} \le +\infty$. Sia $\mat{M}$ la sua matrice di incidenza nodo-arco $\mat{B}$ senza la riga del nodo $n$, con la colonna $\mat{M}_a$ per l'arco $a$, e sia $\vet{h}=(b_1,b_2,\dots,b_{n-1})'$.

    - Una <strong>base</strong> è un insieme $T \subseteq A$ di $n-1$ archi le cui colonne $\mat{M}_a$, $a \in T$, sono linearmente indipendenti. Gli archi di $T$ sono <strong>di base</strong>, gli altri archi sono <strong>fuori base</strong>.

    - Uno <strong>stato dei limiti</strong> degli archi fuori base è una partizione di $A \setminus T$ in due insiemi $L$ e $U$, dove ogni arco di $U$ ha capacità finita.

    - La <strong>soluzione di base</strong> di $(T,L,U)$ è il vettore $\vet{x}$ con $x_{ij}=0$ sugli archi di $L$, $x_{ij}=u_{ij}$ sugli archi di $U$ e $\mat{M}\vet{x}=\vet{h}$. È <strong>ammissibile</strong> se $0 \le x_{ij} \le u_{ij}$ sugli archi di $T$.

- In tutto il capitolo la rete è come nella definizione. I limiti inferiori si rimuovono come nel [Capitolo 4 «Modelli di flusso su reti»](../../flussi/network-flow-models/index.md), un arco con $u_{ij}=0$ si elimina, e il modello $\mathrm{MCF}$ è

    $$
    \min\big\{\,\vet{c}'\vet{x} \;:\; \mat{B}\vet{x}=\vet{b},~\vet{0} \le \vet{x} \le \vet{u}\,\big\}.
    $$

- La base è un insieme di colonne; $L$ e $U$ dicono a quale limite è fissata ciascuna variabile fuori base. I valori delle variabili di base risolvono il sistema quadrato $\mat{M}_T\vet{x}_T=\vet{h}-\sum_{a \in U}\mat{M}_a u_a$, che ha un'unica soluzione perché $\mat{M}_T$ è non singolare.

<a id="box-2-ns-lem-redundant"></a>

!!! teorema "Lemma 8.2: l'equazione ridondante"

    Sia connesso il grafo non orientato sottostante a $G$ e sia $\sum_{i \in N} b_i=0$. Allora $\mat{M}$ ha rango $n-1$, e un vettore $\vet{x} \in \R^m$ soddisfa $\mat{B}\vet{x}=\vet{b}$ se e solo se soddisfa $\mat{M}\vet{x}=\vet{h}$.

??? dimostrazione "Dimostrazione"

    Il rango è $n-1$ per il [Corollario «basi della matrice di incidenza» del Capitolo 1](../../grafi/graphs/il-rango-della-matrice-di-incidenza.md): eliminando una riga di $\mat{B}$ restano $n-1$ righe linearmente indipendenti.

    - Se $\mat{B}\vet{x}=\vet{b}$, allora in particolare $\mat{M}\vet{x}=\vet{h}$.

    - Viceversa, ogni colonna di $\mat{B}$ ha un $+1$ e un $-1$, quindi le righe di $\mat{B}$ hanno per somma il vettore nullo. Se $\mat{M}\vet{x}=\vet{h}$, la riga $n$ di $\mat{B}\vet{x}$ vale $-\sum_{i=1}^{n-1}b_i=b_n$.

    <p class="qed-riga"><span class="qed">□</span></p>

- Quindi una soluzione di base soddisfa i vincoli di conservazione di tutti i nodi, compreso il nodo $n$.

- La definizione è quella dell'algoritmo del simplesso, con una differenza: nel [Capitolo 6 «Algoritmo del simplesso»](https://fabiofurini.github.io/programmazione-lineare/simplesso/06-simplesso/) del modulo Programmazione lineare ogni variabile fuori base vale zero, mentre qui una variabile fuori base può stare anche al suo limite superiore $u_{ij}$.

## 8.1.1 L'algoritmo del simplesso con limiti

- Come nel [Capitolo 11 «Algoritmo del simplesso rivisto»](https://fabiofurini.github.io/programmazione-lineare/metodi-avanzati/11-simplesso-rivisto/), in una base $T$ i <strong>moltiplicatori del simplesso</strong> $\vet{\pi} \in \R^{n-1}$ risolvono il primo sistema $\vet{\pi}'\mat{M}_T=\vet{c}_T'$, e il costo ridotto della variabile $x_a$ è $c_a-\vet{\pi}'\mat{M}_a$.

- Il modello $\mathrm{MCF}$ è un problema di minimo. Una variabile fuori base al limite inferiore riduce il costo aumentando se il suo costo ridotto è negativo; una variabile fuori base al limite superiore riduce il costo diminuendo se il suo costo ridotto è positivo.

- Se nessuna variabile fuori base può ridurre il costo, la soluzione di base è ottima. Altrimenti una di esse entra in base, il test dei rapporti dà il passo massimo che mantiene le variabili di base entro i loro limiti, e una variabile di base che raggiunge un limite esce dalla base.

- L'<strong>algoritmo del simplesso su reti</strong> esegue esattamente queste operazioni, senza matrici: le basi sono alberi ricoprenti, i moltiplicatori sono potenziali calcolati lungo l'albero e il test dei rapporti si svolge lungo un ciclo.

<a id="box-3-ns-ex-bases"></a>

!!! esempio "Esempio 8.1: basi della rete di riferimento"

    Nella rete di riferimento del [Capitolo 4 «Modelli di flusso su reti»](../../flussi/network-flow-models/index.md) la matrice $\mat{M}$ è la matrice di incidenza senza la riga del nodo $6$; una base ha $n-1=5$ archi.

    - Gli archi $(1,2)$, $(2,4)$, $(3,2)$, $(4,6)$, $(5,4)$ danno una sottomatrice $5 \times 5$ di $\mat{M}$ con determinante $1$: formano una base.

    - Gli archi $(1,2)$, $(2,4)$, $(3,2)$, $(4,3)$, $(5,6)$ toccano tutti i nodi, ma contengono il ciclo $2,4,3,2$: le colonne di $(2,4)$, $(4,3)$, $(3,2)$ hanno somma nulla, e il determinante è $0$.

    - Dei $126$ insiemi di $5$ archi, esattamente $55$ danno una sottomatrice non singolare, e sono i $55$ alberi ricoprenti del grafo di riferimento. Tutti questi determinanti valgono $1$ o $-1$.

!!! chiave ""

    In una rete connessa l'equazione del nodo $n$ è ridondante. Una base è un insieme di $n-1$ archi con colonne linearmente indipendenti in $\mat{M}$; gli archi fuori base sono fissati a $0$ (insieme $L$) o alla loro capacità (insieme $U$), e la soluzione di base ne segue.

---

**Avanti:** [8.2 Basi e alberi ricoprenti](basi-e-alberi-ricoprenti.md)
