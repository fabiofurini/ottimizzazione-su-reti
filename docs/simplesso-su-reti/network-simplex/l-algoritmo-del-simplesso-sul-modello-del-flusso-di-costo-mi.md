---
title: "L'algoritmo del simplesso sul modello del flusso di costo minimo"
---

# 8.1 L'algoritmo del simplesso sul modello del flusso di costo minimo { #sez-sec-ns-lp }

<div class="info-capitolo" markdown>

**Parte 4 · Il simplesso su reti · Capitolo 8** · [:material-book-open-variant: Capitolo 8: Simplesso su reti](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-simplesso-su-reti.pdf) · [:material-pencil: Esercizi: Simplesso su reti](../../esercizi/network-simplex.md)

</div>

<a id="box-1-ns-def-basis"></a>

!!! definizione "Definizione 8.1: base e soluzione di base"

    Sia $G=(N,A)$ una rete con $n$ nodi e $m$ archi, il cui grafo non orientato sottostante è connesso. La rete ha saldi $b_i$ tali che $\sum_{i \in N} b_i=0$, costi $c_{ij}$, limiti inferiori nulli e capacità $0<u_{ij} \le +\infty$. Indichiamo con $\mat{B}$ la matrice di incidenza nodo-arco e con $\mat{M}$ la matrice ottenuta eliminando da $\mat{B}$ la riga del nodo $n$. Sia $\mat{M}_a$ la colonna di $\mat{M}$ associata all'arco $a$ e sia $\vet{h}=(b_1,b_2,\dots,b_{n-1})'$.

    - Una <strong>base</strong> è un insieme $T \subseteq A$ di $n-1$ archi le cui colonne $\mat{M}_a$, con $a \in T$, sono linearmente indipendenti. Gli archi di $T$ sono <strong>di base</strong>; gli altri sono <strong>fuori base</strong>.

    - L'<strong>assegnazione dei limiti</strong> agli archi fuori base è una partizione di $A \setminus T$ in due insiemi $L$ e $U$, dove ogni arco in $U$ ha capacità finita. Gli archi in $L$ sono fissati al limite inferiore, quelli in $U$ al limite superiore.

    - La <strong>soluzione di base</strong> associata a $(T,L,U)$ è il vettore $\vet{x}$ definito da $x_{ij}=0$ sugli archi in $L$, $x_{ij}=u_{ij}$ sugli archi in $U$ e $\mat{M}\vet{x}=\vet{h}$. È <strong>ammissibile</strong> se $0 \le x_{ij} \le u_{ij}$ per ogni arco di $T$.

- In tutto il capitolo consideriamo reti con le proprietà appena descritte. Rimuoviamo i limiti inferiori come in [Capitolo 4 «Modelli di flusso su reti»](../../flussi/network-flow-models/index.md); eliminiamo gli archi con $u_{ij}=0$ e scriviamo il modello $\mathrm{MCF}$ come

    $$
    \min\big\{\,\vet{c}'\vet{x} \;:\; \mat{B}\vet{x}=\vet{b},~\vet{0} \le \vet{x} \le \vet{u}\,\big\}.
    $$

- La base è un insieme di colonne; $L$ e $U$ indicano a quale limite è fissata ciascuna variabile fuori base. I valori delle variabili di base risolvono il sistema quadrato $\mat{M}_T\vet{x}_T=\vet{h}-\sum_{a \in U}\mat{M}_a u_a$. La soluzione è unica perché $\mat{M}_T$ è non singolare.

<a id="box-2-ns-lem-redundant"></a>

!!! teorema "Lemma 8.2: l'equazione ridondante"

    Supponiamo che il grafo non orientato sottostante a $G$ sia connesso e che $\sum_{i \in N} b_i=0$. Allora $\mat{M}$ ha rango $n-1$ e un vettore $\vet{x} \in \R^m$ soddisfa $\mat{B}\vet{x}=\vet{b}$ se e solo se soddisfa $\mat{M}\vet{x}=\vet{h}$.

??? dimostrazione "Dimostrazione"

    La matrice $\mat{M}$ ha rango $n-1$ per il [Corollario «Basi della matrice di incidenza» del Capitolo 1](../../grafi/graphs/il-rango-della-matrice-di-incidenza.md): eliminando una riga di $\mat{B}$ restano $n-1$ righe linearmente indipendenti.

    - Se $\mat{B}\vet{x}=\vet{b}$, in particolare $\mat{M}\vet{x}=\vet{h}$.

    - Viceversa, ogni colonna di $\mat{B}$ contiene un $+1$ e un $-1$, quindi la somma delle righe di $\mat{B}$ è il vettore nullo. Se $\mat{M}\vet{x}=\vet{h}$, la componente $n$ di $\mat{B}\vet{x}$ vale $-\sum_{i=1}^{n-1}b_i=b_n$.

    <p class="qed-riga"><span class="qed">□</span></p>

- Quindi ogni soluzione di base soddisfa i vincoli di conservazione in tutti i nodi, compreso il nodo $n$.

- La definizione coincide con quella usata nell'algoritmo del simplesso, con una differenza: nel [Capitolo 6 «Algoritmo del simplesso»](https://fabiofurini.github.io/programmazione-lineare/simplesso/06-simplesso/) del modulo di Programmazione lineare ogni variabile fuori base è fissata a zero; qui può invece trovarsi al limite superiore $u_{ij}$.

## 8.1.1 L'algoritmo del simplesso con limiti

- Come nel [Capitolo 11 «Simplesso rivisto»](https://fabiofurini.github.io/programmazione-lineare/metodi-avanzati/11-simplesso-rivisto/) del modulo di Programmazione lineare, i <strong>moltiplicatori del simplesso</strong> $\vet{\pi} \in \R^{n-1}$ associati alla base $T$ risolvono il sistema $\vet{\pi}'\mat{M}_T=\vet{c}_T'$. Il costo ridotto della variabile $x_a$ è $c_a-\vet{\pi}'\mat{M}_a$.

- Il modello $\mathrm{MCF}$ è un problema di minimizzazione. Una variabile fuori base fissata al limite inferiore può ridurre il costo aumentando se il suo costo ridotto è negativo; una variabile fissata al limite superiore può ridurlo diminuendo se il costo ridotto è positivo.

- Se nessuna variabile fuori base può ridurre il costo, la soluzione di base è ottimale. Altrimenti si sceglie una variabile entrante. Il test del rapporto determina il massimo passo che mantiene le variabili di base entro i rispettivi limiti; una variabile di base che raggiunge un limite diventa la variabile uscente.

- L'<strong>algoritmo del simplesso su reti</strong> esegue le stesse operazioni senza ricorrere alle matrici: le basi sono alberi ricoprenti, i moltiplicatori sono potenziali calcolati lungo l'albero e il test del rapporto si svolge lungo un ciclo.

<a id="box-3-ns-ex-bases"></a>

!!! esempio "Esempio 8.1: basi della rete di riferimento"

    Nella rete di riferimento del [Capitolo 4 «Modelli di flusso su reti»](../../flussi/network-flow-models/index.md), la matrice $\mat{M}$ è la matrice di incidenza privata della riga del nodo $6$. Una base contiene $n-1=5$ archi.

    - Gli archi $(1,2)$, $(2,4)$, $(3,2)$, $(4,6)$, $(5,4)$ danno una sottomatrice $5 \times 5$ di $\mat{M}$ con determinante $1$: formano una base.

    - Gli archi $(1,2)$, $(2,4)$, $(3,2)$, $(4,3)$, $(5,6)$ toccano ogni nodo, ma contengono il ciclo $2,4,3,2$: la somma delle colonne $(2,4)$, $(4,3)$, $(3,2)$ dà zero e il determinante è $0$.

    - Tra i $126$ sottoinsiemi di $5$ archi, esattamente $55$ determinano una sottomatrice non singolare; corrispondono ai $55$ alberi ricoprenti del grafo di riferimento. Tutti i determinanti valgono $1$ oppure $-1$.

!!! chiave ""

    In una rete connessa il vincolo del nodo $n$ è ridondante. Una base è un insieme di $n-1$ archi le cui colonne in $\mat{M}$ sono linearmente indipendenti. Gli archi fuori base sono fissati a $0$ (insieme $L$) o alla propria capacità (insieme $U$); i valori degli archi di base determinano così la soluzione di base.

---

**Avanti:** [8.2 Basi e alberi ricoprenti](basi-e-alberi-ricoprenti.md)
