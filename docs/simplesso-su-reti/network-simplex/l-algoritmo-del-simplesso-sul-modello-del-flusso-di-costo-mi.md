---
title: "L'algoritmo del simplesso sul modello del flusso di costo minimo"
---

# 8.1 L'algoritmo del simplesso sul modello del flusso di costo minimo { #sez-sec-ns-lp }

<div class="info-capitolo" markdown>

**Parte 4 · Il simplesso su reti · Capitolo 8** · [:material-book-open-variant: Capitolo 8: Simplesso su reti](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-simplesso-su-reti.pdf) · [:material-pencil: Esercizi: Simplesso su reti](../../esercizi/network-simplex.md)

</div>

<a id="box-1-ns-def-basis"></a>

!!! definizione "Definizione 8.1: base e soluzione di base"

    Sia $G=(N,A)$ una rete con nodi $n$ e archi $m$, il cui grafo non orientato sottostante è connesso, con equilibri $b_i$ tale che $\sum_{i \in N} b_i=0$, costa $c_{ij}$, zero limiti inferiori e capacità $0<u_{ij} \le +\infty$. Lasciamo $\mat{M}$ essere la sua matrice di incidenza nodo-arco $\mat{B}$ senza la riga del nodo $n$, con la colonna $\mat{M}_a$ per il arco $a$ e lascia $\vet{h}=(b_1,b_2,\dots,b_{n-1})'$.

    - A <strong>basis</strong> è un insieme $T \subseteq A$ di archi $n-1$ le cui colonne $\mat{M}_a$, $a \in T$, sono linearmente indipendenti. Gli archi di $T$ sono <strong>basic</strong>, gli altri archi sono <strong>nonbasic</strong>.

    - Uno <strong>stato associato</strong> degli archi non di base è una partizione di $A \setminus T$ in due insiemi $L$ e $U$, dove ogni arco di $U$ ha una capacità finita.

    - La <strong>soluzione base</strong> di $(T,L,U)$ è il vettore $\vet{x}$ con $x_{ij}=0$ sugli archi di $L$, $x_{ij}=u_{ij}$ sugli archi di $U$ e $\mat{M}\vet{x}=\vet{h}$. È <strong>fattibile</strong> se $0 \le x_{ij} \le u_{ij}$ sugli archi di $T$.

- In tutto il capitolo la rete è come nella definizione. I limiti inferiori vengono rimossi come in [Capitolo 4 «Flusso di rete models»](../../flussi/network-flow-models/index.md), un arco con $u_{ij}=0$ viene eliminato e il modello $\mathrm{MCF}$ viene

    $$
    \min\big\{\,\vet{c}'\vet{x} \;:\; \mat{B}\vet{x}=\vet{b},~\vet{0} \le \vet{x} \le \vet{u}\,\big\}.
    $$

- La base è un insieme di colonne; $L$ e $U$ indicano a quale limite è fissa ciascuna variabile non di base. I valori del le variabili di base risolvono il sistema quadrato $\mat{M}_T\vet{x}_T=\vet{h}-\sum_{a \in U}\mat{M}_a u_a$, which has a unique solution because $\mat{M}_T$ non è singolare.

<a id="box-2-ns-lem-redundant"></a>

!!! teorema "Lemma 8.2: l'equazione ridondante"

    Lascia che il grafo non orientato sottostante di $G$ sia connesso e $\sum_{i \in N} b_i=0$. Quindi $\mat{M}$ ha il rango $n-1$ e un vettore $\vet{x} \in \R^m$ soddisfa $\mat{B}\vet{x}=\vet{b}$ se e solo se soddisfa $\mat{M}\vet{x}=\vet{h}$.

??? dimostrazione "Dimostrazione"

    La classifica è $n-1$ di [Capitolo 1, Corollario «basi della matrice di incidenza»](../../grafi/graphs/il-rango-della-matrice-di-incidenza.md): eliminando una riga di $\mat{B}$ si lasciano $n-1$ righe linearmente indipendenti.

    - Se $\mat{B}\vet{x}=\vet{b}$, in particolare $\mat{M}\vet{x}=\vet{h}$.

    - Al contrario, ogni colonna di $\mat{B}$ ha uno $+1$ e uno $-1$, quindi la somma delle righe di $\mat{B}$ dà zero vettore. Se $\mat{M}\vet{x}=\vet{h}$, la riga $n$ di $\mat{B}\vet{x}$ è $-\sum_{i=1}^{n-1}b_i=b_n$.

    <p class="qed-riga"><span class="qed">□</span></p>

- Quindi una soluzione base soddisfa i vincoli di conservazione di tutti i nodi, nodo $n$ compreso.

- La definizione è quella dell'algoritmo del simplesso con una differenza: in [Capitolo 6 «Algoritmo simplex»](https://fabiofurini.github.io/programmazione-lineare/simplesso/06-simplesso/) del modulo Programmazione lineare ogni variabile non di base è zero, mentre qui una variabile non di base può anche trovarsi al suo vertice legato $u_{ij}$.

## 8.1.1 L'algoritmo del simplesso con limiti

- Come in [Capitolo 11 «Algoritmo del simplesso rivisto»](https://fabiofurini.github.io/programmazione-lineare/metodi-avanzati/11-simplesso-rivisto/), in base $T$ i <strong>moltiplicatori del simplesso</strong> $\vet{\pi} \in \R^{n-1}$ risolvono il primo sistema $\vet{\pi}'\mat{M}_T=\vet{c}_T'$, e il costo ridotto della variabile $x_a$ è $c_a-\vet{\pi}'\mat{M}_a$.

- Il modello $\mathrm{MCF}$ è una minimizzazione. Una variabile non fondamentale al suo limite inferiore riduce il costo quando aumenta se il suo costo ridotto è negativo; una variabile non di base al suo limite superiore riduce il costo quando diminuisce se viene ridotta il costo è positivo

- Se nessuna variabile non di base può ridurre il costo, la soluzione di base è ottimale. Altrimenti uno di loro entra nella base, il test del rapporto fornisce il passo più grande che mantiene le variabili di base entro i loro limiti, e una variabile di base che raggiunge un limite lascia la base.

- L'algoritmo del simplesso di rete <strong>e</strong>segue esattamente queste operazioni, senza matrici: le basi sono attraversando alberi, i moltiplicatori sono potenziali calcolati lungo l'albero e il test del rapporto viene eseguito lungo un ciclo.

<a id="box-3-ns-ex-bases"></a>

!!! esempio "Esempio 8.1: basi della rete di riferimento"

    Nella rete di riferimento di [Capitolo 4 «Modelli di flusso di rete»](../../flussi/network-flow-models/index.md) la matrice $\mat{M}$ è la matrice di incidenza senza la riga del nodo $6$; una base ha Archi $n-1=5$.

    - Gli archi $(1,2)$, $(2,4)$, $(3,2)$, $(4,6)$, $(5,4)$ danno una sottomatrice $5 \times 5$ di $\mat{M}$ con determinante $1$: formano una base.

    - Gli archi $(1,2)$, $(2,4)$, $(3,2)$, $(4,3)$, $(5,6)$ toccano ogni nodo, ma contengono il ciclo $2,4,3,2$: la somma delle colonne $(2,4)$, $(4,3)$, $(3,2)$ dà zero e il determinante è $0$.

    - Degli insiemi $126$ di archi $5$, esattamente $55$ forniscono una sottomatrice non singolare e sono gli alberi di copertura $55$ del grafo di riferimento. Tutti questi determinanti sono $1$ o $-1$.

!!! chiave ""

    In una rete connessa l'equazione del nodo $n$ è ridondante. Una base è un insieme di archi $n-1$ con linearità colonne indipendenti in $\mat{M}$; gli archi non base sono fissati a $0$ (impostare $L$) o alla loro capacità (impostare $U$) e segue la soluzione di base.

---

**Avanti:** [8.2 Basi e alberi ricoprenti](basi-e-alberi-ricoprenti.md)
