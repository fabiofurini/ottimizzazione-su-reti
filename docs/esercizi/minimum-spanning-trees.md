---
title: "Esercizi · Alberi ricoprenti di costo minimo"
---

# Esercizi · Alberi ricoprenti di costo minimo

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 2** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 2: Alberi ricoprenti](../alberi-e-cammini/minimum-spanning-trees/index.md) · [:material-file-pdf-box: Eserciziario, volume 2 (PDF)](../pdf/esercizi-2-alberi-e-cammini.pdf)

</div>

!!! formula "Regole usate in questi esercizi"

    Le definizioni e gli algoritmi del capitolo [«Alberi ricoprenti di costo minimo»](../alberi-e-cammini/minimum-spanning-trees/index.md), per un grafo non orientato connesso $G=(V,E)$ con $n=|V|$, $m=|E|$ e pesi $w_e$.

    - **(M1)** <strong>Proprietà del taglio.</strong> Se nessuno spigolo di $F$ attraversa $\delta(S)$ e $F$ è contenuto in un albero ricoprente di costo minimo, aggiungere uno spigolo più leggero di $\delta(S)$ conserva questa proprietà; se lo spigolo più leggero di $\delta(S)$ è unico, sta in ogni albero ricoprente di costo minimo.

    - **(M2)** <strong>Proprietà del ciclo.</strong> Uno spigolo più pesante di un ciclo si può lasciare fuori; uno spigolo strettamente più pesante degli altri spigoli di un ciclo non sta in nessun albero ricoprente di costo minimo.

    - **(M3)** <strong>Ottimalità.</strong> Un albero ricoprente $T$ è ottimo se e solo se $w_e \ge w_f$ per ogni $e \notin T$ e ogni $f$ del suo ciclo fondamentale $C(T,e)$; è l'unico ottimo se e solo se tutte queste disuguaglianze sono strette.

    - **(M4)** <strong>Kruskal.</strong> Gli spigoli si esaminano per peso non decrescente, a parità di peso in ordine lessicografico di $\{u,v\}$, $u<v$; uno spigolo è accettato se i suoi estremi stanno in componenti diverse di $(V,F)$.

    - **(M5)** <strong>Prim.</strong> Da $s=1$: selezionare $v \notin S$ con $d(v)$ minimo, a parità di etichetta quello di indice minimo, e aggiungere $\{\mathit{pred}(v),v\}$; poi porre $d(u):=w_{vu}$, $\mathit{pred}(u):=v$ per ogni $u \notin S$ adiacente a $v$ con $w_{vu}<d(u)$.

<a id="esercizio-2-1"></a>

!!! esercizio "Esercizio 2.1: Algoritmo di Kruskal"

    !!! esercizio "Esercizio"

        Consideriamo il grafo non orientato $G=(V,E)$ con $V=\{1,2,\dots,7\}$ e gli $11$ spigoli con i pesi

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>spigolo</th>
        <th><span class="arithmatex">\(\{1,2\}\)</span></th>
        <th><span class="arithmatex">\(\{1,5\}\)</span></th>
        <th><span class="arithmatex">\(\{2,3\}\)</span></th>
        <th><span class="arithmatex">\(\{2,5\}\)</span></th>
        <th><span class="arithmatex">\(\{2,6\}\)</span></th>
        <th><span class="arithmatex">\(\{3,6\}\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(w_e\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        </tr>
        <tr>
        <td>spigolo</td>
        <td><span class="arithmatex">\(\{3,7\}\)</span></td>
        <td><span class="arithmatex">\(\{4,7\}\)</span></td>
        <td><span class="arithmatex">\(\{5,6\}\)</span></td>
        <td><span class="arithmatex">\(\{5,7\}\)</span></td>
        <td><span class="arithmatex">\(\{6,7\}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(w_e\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        </tr>
        </table></div>

        disegnato qui sotto.

        ![Figura 1](../img/es-minimum-spanning-trees/fig01.svg){ .fig loading=lazy  }

    **Domande**

    1. Ordinare gli spigoli come in (M4).

    2. Eseguire l'algoritmo di Kruskal: per ogni spigolo esaminato, dire se è accettato o rifiutato e dare le componenti di $(V,F)$.

    3. Disegnare l'albero ricoprente di costo minimo e darne il peso.

    4. Per ogni spigolo rifiutato, dare un ciclo di cui è lo spigolo più pesante.

??? soluzione "Soluzione"

    Usiamo le regole (M1)–(M5) del riquadro all'inizio di questi esercizi.

    1. Per peso non decrescente: $\{2,3\},~\{2,5\},~\{1,2\},~\{3,7\},~\{2,6\},~\{3,6\},~\{1,5\},~\{5,7\},~\{5,6\},~\{4,7\},~\{6,7\}$, con pesi $1,4,5,7,8,9,10,14,15,16,18$.

    2. Ogni riga è uno spigolo esaminato:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(k\)</span></th>
        <th>spigolo <span class="arithmatex">\(e_k\)</span></th>
        <th><span class="arithmatex">\(w_{e_k}\)</span></th>
        <th>decisione e componenti di <span class="arithmatex">\((V,F)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\{2,3\}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>accetta: <span class="arithmatex">\(\{1\},\{2,3\},\{4\},\{5\},\{6\},\{7\}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\{2,5\}\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>accetta: <span class="arithmatex">\(\{1\},\{2,3,5\},\{4\},\{6\},\{7\}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\{1,2\}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>accetta: <span class="arithmatex">\(\{1,2,3,5\},\{4\},\{6\},\{7\}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\{3,7\}\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td>accetta: <span class="arithmatex">\(\{1,2,3,5,7\},\{4\},\{6\}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\{2,6\}\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td>accetta: <span class="arithmatex">\(\{1,2,3,5,6,7\},\{4\}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\{3,6\}\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td>rifiuta (<span class="arithmatex">\(3\)</span> e <span class="arithmatex">\(6\)</span> stanno entrambi in <span class="arithmatex">\(\{1,2,3,5,6,7\}\)</span>)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\{1,5\}\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td>rifiuta (<span class="arithmatex">\(1\)</span> e <span class="arithmatex">\(5\)</span> stanno entrambi in <span class="arithmatex">\(\{1,2,3,5,6,7\}\)</span>)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\{5,7\}\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td>rifiuta (<span class="arithmatex">\(5\)</span> e <span class="arithmatex">\(7\)</span> stanno entrambi in <span class="arithmatex">\(\{1,2,3,5,6,7\}\)</span>)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(\{5,6\}\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td>rifiuta (<span class="arithmatex">\(5\)</span> e <span class="arithmatex">\(6\)</span> stanno entrambi in <span class="arithmatex">\(\{1,2,3,5,6,7\}\)</span>)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(\{4,7\}\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td>accetta: <span class="arithmatex">\(\{1,2,3,4,5,6,7\}\)</span></td>
        </tr>
        </table></div>

        L'algoritmo si ferma dopo $10$ degli $11$ spigoli, quando $|F|=6$. Lo spigolo $\{6,7\}$ non viene mai esaminato.

    3. L'albero è $F=\{\{1,2\},\allowbreak \{2,3\},\allowbreak \{2,5\},\allowbreak \{2,6\},\allowbreak \{3,7\},\allowbreak \{4,7\}\}$, di peso $5+1+4+8+7+16=41$; su ogni spigolo dell'albero, il peso e fra parentesi il passo in cui è stato accettato:

        ![Figura 2](../img/es-minimum-spanning-trees/fig02.svg){ .fig loading=lazy  }

    4. Uno spigolo rifiutato unisce due vertici già collegati da $F$, e il cammino di $F$ fra loro usa solo spigoli esaminati prima, quindi più leggeri: $\{3,6\}$, di peso $9$, chiude il ciclo $3,2,6,3$ con spigoli dell'albero di pesi $1,~8$; $\{1,5\}$, di peso $10$, chiude il ciclo $1,2,5,1$ con spigoli dell'albero di pesi $5,~4$; $\{5,7\}$, di peso $14$, chiude il ciclo $5,2,3,7,5$ con spigoli dell'albero di pesi $4,~1,~7$; $\{5,6\}$, di peso $15$, chiude il ciclo $5,2,6,5$ con spigoli dell'albero di pesi $4,~8$. Per (M2) nessuno di questi spigoli sta in un albero ricoprente di costo minimo.

    !!! chiave ""

        L'algoritmo di Kruskal accetta $\{2,3\},\allowbreak \{2,5\},\allowbreak \{1,2\},\allowbreak \{3,7\},\allowbreak \{2,6\},\allowbreak \{4,7\}$ in quest'ordine e trova l'albero ricoprente di costo minimo di peso $41$; è unico, perché i pesi sono distinti.

<a id="esercizio-2-2"></a>

!!! esercizio "Esercizio 2.2: Algoritmo di Prim"

    !!! esercizio "Esercizio"

        Consideriamo il grafo non orientato $G=(V,E)$ con $V=\{1,2,\dots,7\}$ e gli $11$ spigoli con i pesi

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>spigolo</th>
        <th><span class="arithmatex">\(\{1,2\}\)</span></th>
        <th><span class="arithmatex">\(\{1,3\}\)</span></th>
        <th><span class="arithmatex">\(\{1,5\}\)</span></th>
        <th><span class="arithmatex">\(\{2,3\}\)</span></th>
        <th><span class="arithmatex">\(\{2,5\}\)</span></th>
        <th><span class="arithmatex">\(\{2,6\}\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(w_e\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        </tr>
        <tr>
        <td>spigolo</td>
        <td><span class="arithmatex">\(\{3,6\}\)</span></td>
        <td><span class="arithmatex">\(\{4,7\}\)</span></td>
        <td><span class="arithmatex">\(\{5,6\}\)</span></td>
        <td><span class="arithmatex">\(\{5,7\}\)</span></td>
        <td><span class="arithmatex">\(\{6,7\}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(w_e\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        </tr>
        </table></div>

        disegnato qui sotto.

        ![Figura 3](../img/es-minimum-spanning-trees/fig03.svg){ .fig loading=lazy  }

    **Domande**

    1. Eseguire l'algoritmo di Prim da $s=1$: dopo ogni iterazione, dare il vertice selezionato, lo spigolo aggiunto e le etichette $d(v)$ e $\mathit{pred}(v)$ dei vertici fuori da $S$.

    2. Quali etichette diminuiscono durante l'esecuzione, e perché?

    3. Disegnare l'albero ricoprente di costo minimo e darne il peso.

    4. In quale ordine l'algoritmo di Kruskal accetta gli stessi spigoli?

??? soluzione "Soluzione"

    Usiamo le regole (M1)–(M5) del riquadro all'inizio di questi esercizi.

    1. Ogni riga mostra $d(v)$ dopo l'aggiornamento, con $\mathit{pred}(v)$ fra parentesi; un trattino indica i vertici in $S$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>it.</th>
        <th>selezionato</th>
        <th>spigolo aggiunto</th>
        <th><span class="arithmatex">\(d(2)\)</span></th>
        <th><span class="arithmatex">\(d(3)\)</span></th>
        <th><span class="arithmatex">\(d(4)\)</span></th>
        <th><span class="arithmatex">\(d(5)\)</span></th>
        <th><span class="arithmatex">\(d(6)\)</span></th>
        <th><span class="arithmatex">\(d(7)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>–</td>
        <td><span class="arithmatex">\(6~(1)\)</span></td>
        <td><span class="arithmatex">\(4~(1)\)</span></td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        <td><span class="arithmatex">\(8~(1)\)</span></td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\{1,3\}\)</span></td>
        <td><span class="arithmatex">\(1~(3)\)</span></td>
        <td>–</td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        <td><span class="arithmatex">\(8~(1)\)</span></td>
        <td><span class="arithmatex">\(15~(3)\)</span></td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\{2,3\}\)</span></td>
        <td>–</td>
        <td>–</td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        <td><span class="arithmatex">\(8~(1)\)</span></td>
        <td><span class="arithmatex">\(7~(2)\)</span></td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\{2,6\}\)</span></td>
        <td>–</td>
        <td>–</td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        <td><span class="arithmatex">\(8~(1)\)</span></td>
        <td>–</td>
        <td><span class="arithmatex">\(16~(6)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\{1,5\}\)</span></td>
        <td>–</td>
        <td>–</td>
        <td><span class="arithmatex">\(\infty\)</span></td>
        <td>–</td>
        <td>–</td>
        <td><span class="arithmatex">\(16~(6)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\{6,7\}\)</span></td>
        <td>–</td>
        <td>–</td>
        <td><span class="arithmatex">\(2~(7)\)</span></td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\{4,7\}\)</span></td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        </tr>
        </table></div>

        I vertici entrano in $S$ nell'ordine $1,3,2,6,5,7,4$.

    2. Un'etichetta diminuisce quando il vertice appena inserito ha uno spigolo più leggero verso $u$: all'iterazione $1$, $d(2)$ scende da $6$ a $1$ (spigolo $\{2,3\}$); all'iterazione $1$, $d(6)$ scende da $\infty$ a $15$ (spigolo $\{3,6\}$); all'iterazione $2$, $d(6)$ scende da $15$ a $7$ (spigolo $\{2,6\}$); all'iterazione $3$, $d(7)$ scende da $\infty$ a $16$ (spigolo $\{6,7\}$); all'iterazione $5$, $d(4)$ scende da $\infty$ a $2$ (spigolo $\{4,7\}$).

    3. L'albero è $F=\{\{1,3\},\allowbreak \{1,5\},\allowbreak \{2,3\},\allowbreak \{2,6\},\allowbreak \{4,7\},\allowbreak \{6,7\}\}$, di peso $38$:

        ![Figura 4](../img/es-minimum-spanning-trees/fig04.svg){ .fig loading=lazy  }

    4. L'algoritmo di Kruskal accetta gli spigoli per peso non decrescente: $\{2,3\},\allowbreak \{4,7\},\allowbreak \{1,3\},\allowbreak \{2,6\},\allowbreak \{1,5\},\allowbreak \{6,7\}$. L'albero è lo stesso, perché i pesi sono distinti e l'albero ricoprente di costo minimo è unico; cambia solo l'ordine.

    !!! chiave ""

        L'algoritmo di Prim da $1$ aggiunge $\{1,3\},\allowbreak \{2,3\},\allowbreak \{2,6\},\allowbreak \{1,5\},\allowbreak \{6,7\},\allowbreak \{4,7\}$; l'albero ricoprente di costo minimo pesa $38$, come quello trovato dall'algoritmo di Kruskal.

<a id="esercizio-2-3"></a>

!!! esercizio "Esercizio 2.3: Proprietà del taglio e del ciclo"

    !!! esercizio "Esercizio"

        Consideriamo il grafo non orientato $G=(V,E)$ con $V=\{1,2,\dots,6\}$ e gli $10$ spigoli con i pesi

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>spigolo</th>
        <th><span class="arithmatex">\(\{1,2\}\)</span></th>
        <th><span class="arithmatex">\(\{1,3\}\)</span></th>
        <th><span class="arithmatex">\(\{1,4\}\)</span></th>
        <th><span class="arithmatex">\(\{1,5\}\)</span></th>
        <th><span class="arithmatex">\(\{2,3\}\)</span></th>
        <th><span class="arithmatex">\(\{2,5\}\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(w_e\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        </tr>
        <tr>
        <td>spigolo</td>
        <td><span class="arithmatex">\(\{2,6\}\)</span></td>
        <td><span class="arithmatex">\(\{3,6\}\)</span></td>
        <td><span class="arithmatex">\(\{4,5\}\)</span></td>
        <td><span class="arithmatex">\(\{4,6\}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(w_e\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        </tr>
        </table></div>

        disegnato qui sotto. Consideriamo anche l'albero ricoprente $T_0=\{\{1,2\},\allowbreak \{1,3\},\allowbreak \{1,4\},\allowbreak \{1,5\},\allowbreak \{3,6\}\}$.

        ![Figura 5](../img/es-minimum-spanning-trees/fig05.svg){ .fig loading=lazy  }

    **Domande**

    1. Trovare il taglio $\delta(\{1,2\})$. Quale dei suoi spigoli appartiene a ogni albero ricoprente di costo minimo?

    2. Trovare un ciclo che contiene lo spigolo $\{2,5\}$ e usarlo per mostrare che $\{2,5\}$ non sta in nessun albero ricoprente di costo minimo.

    3. $T_0$ è un albero ricoprente di costo minimo? Elencare le coppie $(e,f)$, $e \notin T_0$, $f \in C(T_0,e)$, che violano la condizione del ciclo (M3).

    4. Migliorare $T_0$ con lo scambio della coppia che viola la condizione con la differenza $w_f-w_e$ più grande, e dare il nuovo peso. Qual è il peso di un albero ricoprente di costo minimo?

??? soluzione "Soluzione"

    Usiamo le regole (M1)–(M5) del riquadro all'inizio di questi esercizi.

    1. $\delta(\{1,2\})=\{\{1,3\},\allowbreak \{1,4\},\allowbreak \{1,5\},\allowbreak \{2,3\},\allowbreak \{2,5\},\allowbreak \{2,6\}\}$, con pesi $14,1,5,9,8,11$. Lo spigolo $\{1,4\}$ è l'unico più leggero, quindi appartiene a ogni albero ricoprente di costo minimo per (M1).

    2. Il ciclo $2,1,4,5,2$ usa gli spigoli $\{1,2\},\allowbreak \{1,4\},\allowbreak \{4,5\},\allowbreak \{2,5\}$, con pesi $6,1,4,8$. Lo spigolo $\{2,5\}$, di peso $8$, è strettamente il più pesante, quindi non sta in nessun albero ricoprente di costo minimo per (M2).

    3. $T_0$ pesa $41$. Per ogni spigolo $e$ fuori da $T_0$ confrontiamo $w_e$ con gli spigoli del suo ciclo fondamentale; le coppie che violano la condizione, con $w_f>w_e$, sono $(\{2,3\},\{1,3\})$, $(\{2,6\},\{1,3\})$, $(\{2,6\},\{3,6\})$, $(\{4,5\},\{1,5\})$, $(\{4,6\},\{1,3\})$, $(\{4,6\},\{3,6\})$. Per (M3), $T_0$ non è ottimo.

    4. La differenza più grande si ha per $e=\{2,3\}$ e $f=\{1,3\}$, con $w_f-w_e=14-9=5$: lo spigolo $f$ sta su $C(T_0,e)$, i cui spigoli sono $\{1,2\},\allowbreak \{1,3\},\allowbreak \{2,3\}$. Lo scambio dà l'albero ricoprente $\{\{1,2\},\allowbreak \{1,4\},\allowbreak \{1,5\},\allowbreak \{2,3\},\allowbreak \{3,6\}\}$ di peso $41-5=36$. L'algoritmo di Kruskal dà l'albero ricoprente di costo minimo $\{\{1,2\},\allowbreak \{1,4\},\allowbreak \{2,3\},\allowbreak \{2,6\},\allowbreak \{4,5\}\}$, di peso $31$:

        ![Figura 6](../img/es-minimum-spanning-trees/fig06.svg){ .fig loading=lazy  }

    !!! chiave ""

        $\{1,4\}$ è imposto da un taglio, $\{2,5\}$ è escluso da un ciclo; $T_0$ (peso $41$) viola la condizione del ciclo, e l'ottimo pesa $31$.

<a id="esercizio-2-4"></a>

!!! esercizio "Esercizio 2.4: Unicità e pesi uguali"

    !!! esercizio "Esercizio"

        Consideriamo il grafo non orientato $G=(V,E)$ con $V=\{1,2,\dots,6\}$ e gli $9$ spigoli con i pesi

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>spigolo</th>
        <th><span class="arithmatex">\(\{1,2\}\)</span></th>
        <th><span class="arithmatex">\(\{1,3\}\)</span></th>
        <th><span class="arithmatex">\(\{1,4\}\)</span></th>
        <th><span class="arithmatex">\(\{2,3\}\)</span></th>
        <th><span class="arithmatex">\(\{2,5\}\)</span></th>
        <th><span class="arithmatex">\(\{2,6\}\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(w_e\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        </tr>
        <tr>
        <td>spigolo</td>
        <td><span class="arithmatex">\(\{4,5\}\)</span></td>
        <td><span class="arithmatex">\(\{4,6\}\)</span></td>
        <td><span class="arithmatex">\(\{5,6\}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(w_e\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        </tr>
        </table></div>

        disegnato qui sotto.

        ![Figura 7](../img/es-minimum-spanning-trees/fig07.svg){ .fig loading=lazy  }

    **Domande**

    1. Trovare con l'algoritmo di Kruskal un albero ricoprente di costo minimo $T$, e il suo peso.

    2. Usando i tagli fondamentali di $T$, trovare gli spigoli che appartengono a ogni albero ricoprente di costo minimo.

    3. Usando i cicli fondamentali di $T$, trovare gli spigoli che non appartengono a nessun albero ricoprente di costo minimo.

    4. L'albero ricoprente di costo minimo è unico? Darne un altro, se esiste, e il numero degli alberi ricoprenti di costo minimo.

??? soluzione "Soluzione"

    Usiamo le regole (M1)–(M5) del riquadro all'inizio di questi esercizi.

    1. Algoritmo di Kruskal, con i pesi uguali in ordine lessicografico:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(k\)</span></th>
        <th>spigolo <span class="arithmatex">\(e_k\)</span></th>
        <th><span class="arithmatex">\(w_{e_k}\)</span></th>
        <th>decisione e componenti di <span class="arithmatex">\((V,F)\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\{1,4\}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>accetta: <span class="arithmatex">\(\{1,4\},\{2\},\{3\},\{5\},\{6\}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\{2,5\}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>accetta: <span class="arithmatex">\(\{1,4\},\{2,5\},\{3\},\{6\}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\{4,5\}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>accetta: <span class="arithmatex">\(\{1,2,4,5\},\{3\},\{6\}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\{1,3\}\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>accetta: <span class="arithmatex">\(\{1,2,3,4,5\},\{6\}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\{2,3\}\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>rifiuta (<span class="arithmatex">\(2\)</span> e <span class="arithmatex">\(3\)</span> stanno entrambi in <span class="arithmatex">\(\{1,2,3,4,5\}\)</span>)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\{2,6\}\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>accetta: <span class="arithmatex">\(\{1,2,3,4,5,6\}\)</span></td>
        </tr>
        </table></div>

        $T=\{\{1,3\},\allowbreak \{1,4\},\allowbreak \{2,5\},\allowbreak \{2,6\},\allowbreak \{4,5\}\}$, di peso $10$.

        ![Figura 8](../img/es-minimum-spanning-trees/fig08.svg){ .fig loading=lazy  }

    2. Uno spigolo di $T$ sta in ogni albero ricoprente di costo minimo se e solo se è strettamente il più leggero del suo taglio fondamentale (la componente $S_e$ di $T\setminus\{e\}$ che contiene l'estremo più piccolo):

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(e \in T\)</span></th>
        <th><span class="arithmatex">\(w_e\)</span></th>
        <th><span class="arithmatex">\(S_e\)</span></th>
        <th>pesi degli altri spigoli di <span class="arithmatex">\(\delta(S_e)\)</span></th>
        <th>strettamente il più leggero?</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,3\}\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\{1,2,4,5,6\}\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>sì</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,4\}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\{1,3\}\)</span></td>
        <td><span class="arithmatex">\(5\)</span>, <span class="arithmatex">\(4\)</span></td>
        <td>sì</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{2,5\}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\{2,6\}\)</span></td>
        <td><span class="arithmatex">\(5\)</span>, <span class="arithmatex">\(4\)</span>, <span class="arithmatex">\(4\)</span>, <span class="arithmatex">\(5\)</span></td>
        <td>sì</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{2,6\}\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\{1,2,3,4,5\}\)</span></td>
        <td><span class="arithmatex">\(4\)</span>, <span class="arithmatex">\(5\)</span></td>
        <td>no: <span class="arithmatex">\(\{4,6\}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{4,5\}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\{1,3,4\}\)</span></td>
        <td><span class="arithmatex">\(5\)</span>, <span class="arithmatex">\(4\)</span>, <span class="arithmatex">\(4\)</span></td>
        <td>sì</td>
        </tr>
        </table></div>

        Gli spigoli che stanno in ogni albero ricoprente di costo minimo sono $\{1,3\},\allowbreak \{1,4\},\allowbreak \{2,5\},\allowbreak \{4,5\}$.

    3. Uno spigolo fuori da $T$ non sta in nessun albero ricoprente di costo minimo se e solo se è strettamente il più pesante del suo ciclo fondamentale:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(e \notin T\)</span></th>
        <th><span class="arithmatex">\(w_e\)</span></th>
        <th>spigoli dell'albero in <span class="arithmatex">\(C(T,e)\)</span></th>
        <th>loro pesi</th>
        <th>strettamente il più pesante?</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,2\}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\{1,4\},\allowbreak \{4,5\},\allowbreak \{2,5\}\)</span></td>
        <td><span class="arithmatex">\(1\)</span>, <span class="arithmatex">\(1\)</span>, <span class="arithmatex">\(1\)</span></td>
        <td>sì</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{2,3\}\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\{2,5\},\allowbreak \{4,5\},\allowbreak \{1,4\},\allowbreak \{1,3\}\)</span></td>
        <td><span class="arithmatex">\(1\)</span>, <span class="arithmatex">\(1\)</span>, <span class="arithmatex">\(1\)</span>, <span class="arithmatex">\(3\)</span></td>
        <td>sì</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{4,6\}\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\{4,5\},\allowbreak \{2,5\},\allowbreak \{2,6\}\)</span></td>
        <td><span class="arithmatex">\(1\)</span>, <span class="arithmatex">\(1\)</span>, <span class="arithmatex">\(4\)</span></td>
        <td>no: <span class="arithmatex">\(\{2,6\}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{5,6\}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\{2,5\},\allowbreak \{2,6\}\)</span></td>
        <td><span class="arithmatex">\(1\)</span>, <span class="arithmatex">\(4\)</span></td>
        <td>sì</td>
        </tr>
        </table></div>

        Gli spigoli che non stanno in nessun albero ricoprente di costo minimo sono $\{1,2\},\allowbreak \{2,3\},\allowbreak \{5,6\}$.

    4. Qualche disuguaglianza non è stretta, quindi per (M3) l'ottimo non è unico. Per esempio anche $\{\{1,3\},\allowbreak \{1,4\},\allowbreak \{2,5\},\allowbreak \{4,5\},\allowbreak \{4,6\}\}$ pesa $10$. Enumerando i $64$ alberi ricoprenti, esattamente $2$ hanno peso $10$.

    !!! chiave ""

        Il peso minimo è $10$, raggiunto da $2$ alberi ricoprenti; i pesi uguali nei tagli e nei cicli fondamentali di un albero ottimo dicono quali spigoli sono imposti e quali sono esclusi.

<a id="esercizio-2-5"></a>

!!! esercizio "Esercizio 2.5: Modellare con gli alberi ricoprenti di costo minimo"

    !!! esercizio "Esercizio"

        Un'azienda vuole collegare i suoi $6$ edifici $1,2,\dots,6$ con una rete in fibra ottica. Si può costruire un collegamento diretto fra le coppie qui sotto, e $w_e$ è il suo costo (in migliaia di euro):

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>spigolo</th>
        <th><span class="arithmatex">\(\{1,2\}\)</span></th>
        <th><span class="arithmatex">\(\{1,3\}\)</span></th>
        <th><span class="arithmatex">\(\{1,4\}\)</span></th>
        <th><span class="arithmatex">\(\{1,5\}\)</span></th>
        <th><span class="arithmatex">\(\{2,3\}\)</span></th>
        <th><span class="arithmatex">\(\{2,5\}\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(w_e\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(29\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(26\)</span></td>
        </tr>
        <tr>
        <td>spigolo</td>
        <td><span class="arithmatex">\(\{2,6\}\)</span></td>
        <td><span class="arithmatex">\(\{3,6\}\)</span></td>
        <td><span class="arithmatex">\(\{4,5\}\)</span></td>
        <td><span class="arithmatex">\(\{5,6\}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(w_e\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        </tr>
        </table></div>

        Ogni edificio deve poter raggiungere ogni altro, eventualmente passando per altri edifici.

        ![Figura 9](../img/es-minimum-spanning-trees/fig09.svg){ .fig loading=lazy  }

        Ogni collegamento $e$ funziona inoltre con probabilità $p_e$, indipendentemente dagli altri:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>collegamento</th>
        <th><span class="arithmatex">\(\{1,2\}\)</span></th>
        <th><span class="arithmatex">\(\{1,3\}\)</span></th>
        <th><span class="arithmatex">\(\{1,4\}\)</span></th>
        <th><span class="arithmatex">\(\{1,5\}\)</span></th>
        <th><span class="arithmatex">\(\{2,3\}\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(p_e\)</span></td>
        <td><span class="arithmatex">\(0.97\)</span></td>
        <td><span class="arithmatex">\(0.90\)</span></td>
        <td><span class="arithmatex">\(0.91\)</span></td>
        <td><span class="arithmatex">\(0.84\)</span></td>
        <td><span class="arithmatex">\(0.94\)</span></td>
        </tr>
        <tr>
        <td>collegamento</td>
        <td><span class="arithmatex">\(\{2,5\}\)</span></td>
        <td><span class="arithmatex">\(\{2,6\}\)</span></td>
        <td><span class="arithmatex">\(\{3,6\}\)</span></td>
        <td><span class="arithmatex">\(\{4,5\}\)</span></td>
        <td><span class="arithmatex">\(\{5,6\}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(p_e\)</span></td>
        <td><span class="arithmatex">\(0.96\)</span></td>
        <td><span class="arithmatex">\(0.93\)</span></td>
        <td><span class="arithmatex">\(0.85\)</span></td>
        <td><span class="arithmatex">\(0.81\)</span></td>
        <td><span class="arithmatex">\(0.98\)</span></td>
        </tr>
        </table></div>

    **Domande**

    1. Modellare come problema su grafi la rete più economica, e risolverlo.

    2. Per motivi di sicurezza, gli edifici $2$ e $6$ devono essere collegati direttamente. Come si trova la rete più economica, e quanto costa?

    3. Una rete con $n-1$ collegamenti funziona se funzionano tutti i suoi collegamenti. Modellare la rete più affidabile come un problema di albero ricoprente di costo minimo, risolverlo e dare la probabilità che la rete funzioni.

??? soluzione "Soluzione"

    Usiamo le regole (M1)–(M5) del riquadro all'inizio di questi esercizi.

    1. Gli edifici sono i vertici e i collegamenti possibili gli spigoli di $G$, con pesi $w_e$. Una rete più economica è connessa, e non ha cicli: togliere uno spigolo di un ciclo la lascia connessa e ne abbassa il costo, perché i costi sono positivi. Quindi è un albero ricoprente di costo minimo. L'algoritmo di Kruskal dà

        $$
        T=\{\{1,2\},\allowbreak \{1,4\},\allowbreak \{1,5\},\allowbreak \{2,3\},\allowbreak \{3,6\}\}, \qquad w(T)=56.
        $$

        ![Figura 10](../img/es-minimum-spanning-trees/fig10.svg){ .fig loading=lazy  }

    2. Ogni albero ricoprente che contiene $\{2,6\}$ cambia peso della stessa quantità se cambia $w_{26}$. Ponendo $w_{26}=0$, sotto ogni altro peso, l'algoritmo di Kruskal accetta per primo $\{2,6\}$ e restituisce l'albero più economico che lo contiene: $\{\{1,2\},\allowbreak \{1,4\},\allowbreak \{1,5\},\allowbreak \{2,3\},\allowbreak \{2,6\}\}$, che con i costi originali ha $w=59$, cioè $3$ in più di $T$.

    3. La rete funziona con probabilità $\prod_{e \in T} p_e$. Massimizzarla equivale a minimizzare $\sum_{e \in T} (-\log p_e)$, un problema di albero ricoprente di costo minimo con pesi $-\log p_e$. Questi pesi sono ordinati come i $-p_e$, e l'algoritmo di Kruskal usa solo l'ordine: esamina i collegamenti per affidabilità non crescente e dà

        $$
        \{\{1,2\},\allowbreak \{1,4\},\allowbreak \{2,3\},\allowbreak \{2,5\},\allowbreak \{5,6\}\}, \qquad \prod_{e} p_e=0.97 \cdot 0.91 \cdot 0.94 \cdot 0.96 \cdot 0.98 \approx 0.7806.
        $$

    !!! chiave ""

        Rete più economica: un albero ricoprente di costo minimo, che costa $56$; con il collegamento imposto $\{2,6\}$ costa $59$; la rete più affidabile è un albero ricoprente di costo massimo per i pesi $p_e$.
