---
hide:
  - navigation
---

# Laboratorio interattivo

Qui l'ottimizzazione su reti si tocca con mano: ogni app esegue un algoritmo passo per passo sulle istanze di riferimento del corso,
che si possono anche cambiare. Scegli un'app: si apre a tutta pagina. Tutto gira nel browser; i numeri sono calcolati dall'algoritmo, non scritti a mano.

## Grafi

<div class="grid cards" markdown>

-   :material-graph-outline: **Ricerca su grafo: BFS e DFS**

    ---

    La ricerca generica un'iterazione alla volta, con LIST come coda (BFS) o come pila (DFS): ordine di etichettatura, albero dei predecessori e livelli d(j).

    [Apri l'app →](ricerca-bfs-dfs.md)

</div>

## Alberi e cammini

<div class="grid cards" markdown>

-   :material-pine-tree: **Alberi ricoprenti minimi: Kruskal e Prim**

    ---

    Kruskal sui lati ordinati per peso, con le componenti e i lati scartati; Prim con le etichette d(v), pred(v) e il taglio; il peso dell'albero.

    [Apri l'app →](albero-ricoprente-minimo-kruskal-prim.md)

-   :material-map-marker-path: **Cammini minimi: Dijkstra, Bellman–Ford, grafi aciclici**

    ---

    Le etichette d(i) e pred(i) passo per passo: nodi permanenti di Dijkstra, passate di Bellman–Ford con i cicli negativi, ordine topologico; alla fine l'albero e il certificato dei potenziali.

    [Apri l'app →](cammini-minimi-dijkstra-bellman-ford.md)

</div>

## Flussi

<div class="grid cards" markdown>

-   :material-pipe: **Flusso massimo: Ford–Fulkerson ed Edmonds–Karp**

    ---

    La rete residua, il cammino aumentante (visita in profondità o in ampiezza), il collo di bottiglia e l'aggiornamento del flusso; alla fine il taglio minimo, di capacità uguale al valore del flusso.

    [Apri l'app →](flusso-massimo-ford-fulkerson-edmonds-karp.md)

-   :material-cash: **Flusso di costo minimo: cancellazione dei cicli e cammini minimi successivi**

    ---

    La rete residua con i costi, il ciclo negativo e il suo aumento, oppure i cammini minimi sui costi ridotti; alla fine il certificato dei potenziali.

    [Apri l'app →](flusso-di-costo-minimo.md)

-   :material-truck-delivery: **Trasporto: soluzione iniziale e metodo dei potenziali**

    ---

    La tabella dei trasporti: angolo nord-ovest o costo minimo, poi i potenziali, i costi ridotti, il ciclo della cella entrante e il passo.

    [Apri l'app →](trasporto-metodo-dei-potenziali.md)

-   :material-grid: **Assegnamento: l'algoritmo ungherese**

    ---

    Riduzione per righe e per colonne, copertura degli zeri con il minimo numero di linee, aggiustamento della matrice e assegnamento ottimo.

    [Apri l'app →](assegnamento-algoritmo-ungherese.md)

</div>

## Il simplesso su reti

<div class="grid cards" markdown>

-   :material-swap-horizontal: **Il simplesso su reti, pivot per pivot**

    ---

    L'albero di base, gli archi ai limiti, i potenziali e i costi ridotti; l'arco entrante, il ciclo, il passo e l'arco uscente; alla fine il certificato.

    [Apri l'app →](simplesso-su-reti.md)

</div>

## Gestione dei progetti

<div class="grid cards" markdown>

-   :material-chart-gantt: **Il metodo del cammino critico (CPM)**

    ---

    Il passaggio in avanti e all'indietro sulla rete di progetto, i margini, le attività critiche e il diagramma di Gantt.

    [Apri l'app →](cammino-critico-cpm.md)

</div>
