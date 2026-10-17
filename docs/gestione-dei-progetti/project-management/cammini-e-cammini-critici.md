---
title: "Cammini e cammini critici"
---

# 9.2 Cammini e cammini critici { #sez-pm-sec-paths }

<div class="info-capitolo" markdown>

**Parte 5 · Gestione dei progetti · Capitolo 9** · [:material-book-open-variant: Capitolo 9: Gestione dei progetti](index.md) · [:material-file-pdf-box: Dispensa, volume 5 (PDF)](../../pdf/dispensa-5-gestione-dei-progetti.pdf) · [:material-presentation: Slide](../../pdf/slide-project-management.pdf) · [:material-pencil: Esercizi: Gestione dei progetti](../../esercizi/project-management.md) · [:material-gesture-tap: App: Il metodo del cammino critico (CPM)](../../laboratorio/cammino-critico-cpm.md)

</div>

- Sotto le ipotesi (H1) e (H2), il metodo del cammino critico risponde alle seguenti domande.

    1. Qual è il tempo minimo necessario per completare il progetto?

    2. Quando può iniziare e terminare, al più presto, ogni attività?

    3. Quando deve iniziare e terminare, al più tardi, ogni attività per non ritardare il completamento del progetto?

    4. Quali attività sono critiche, cioè tali che ogni loro ritardo ritarda il progetto?

    5. Per le altre attività, quanto ritardo si può tollerare?

<a id="box-6-pm-def-critical"></a>

!!! definizione "Definizione 9.5: lunghezza di un cammino e cammino critico"

    Ogni arco $(i,j) \in A$ ha <strong>lunghezza</strong> $d_i$, la durata della sua coda. La <strong>lunghezza</strong> di un cammino orientato $P=i_0,i_1,\dots,i_k$ è

    $$
    L(P)=\sum_{s=0}^{k-1} d_{i_s},
    $$

    la durata complessiva dei suoi nodi, escluso l'ultimo. Un <strong>cammino critico</strong> è un cammino da START a FINISH di lunghezza massima. Un'attività è <strong>critica</strong> se sta su un cammino critico.

- Su un cammino da START a FINISH le durate del primo e dell'ultimo nodo sono nulle: $L(P)$ è la durata complessiva delle attività del cammino.

- Un progetto può avere più cammini critici: quando più cammini hanno la stessa lunghezza massima, sono tutti critici.

<a id="box-7-pm-lem-path"></a>

!!! teorema "Lemma 9.6: ogni cammino limita la durata"

    Per ogni calendario $\vet{t}$ e ogni cammino $P$ da START a FINISH, $t_{n+1} \ge L(P)$.

??? dimostrazione "Dimostrazione"

    Sia $P=i_0,i_1,\dots,i_k$ con $i_0=0$ e $i_k=n+1$. Sommando i vincoli $t_{i_{s+1}} \ge t_{i_s}+d_{i_s}$ degli archi di $P$, i tempi di inizio si elidono a catena:

    $$
    t_{n+1}-t_0 \ge \sum_{s=0}^{k-1} d_{i_s}=L(P),
    $$

    e $t_0=0$. <span class="qed">□</span>

- Le attività di un cammino si svolgono una dopo l'altra, senza sovrapposizioni: il progetto non può durare meno di nessun cammino.

<a id="box-8-pm-ex-paths"></a>

!!! esempio "Esempio 9.2: i cammini del caso di studio"

    La rete dell'<span style="color:#1971c2">[Esempio 9.1](progetti-e-reti-delle-attivita.md#box-3-pm-ex-case)</span> ha sei cammini da START a FINISH; le loro lunghezze, in settimane, sono:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>cammino da START a FINISH</th>
    <th>lunghezza (settimane)</th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\text{START},1,2,3,4,7,8,13,\text{FINISH}\)</span></td>
    <td><span class="arithmatex">\(2+4+10+6+7+9+2=40\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\text{START},1,2,3,5,6,10,11,14,\text{FINISH}\)</span></td>
    <td><span class="arithmatex">\(2+4+10+4+5+8+4+6=43\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\text{START},1,2,3,5,6,10,12,14,\text{FINISH}\)</span></td>
    <td><span class="arithmatex">\(2+4+10+4+5+8+5+6=44\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\text{START},1,2,3,5,8,13,\text{FINISH}\)</span></td>
    <td><span class="arithmatex">\(2+4+10+4+9+2=31\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\text{START},1,2,3,9,10,11,14,\text{FINISH}\)</span></td>
    <td><span class="arithmatex">\(2+4+10+7+8+4+6=41\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\text{START},1,2,3,9,10,12,14,\text{FINISH}\)</span></td>
    <td><span class="arithmatex">\(2+4+10+7+8+5+6=42\)</span></td>
    </tr>
    </table></div>

    - Il cammino più lungo è START$,1,2,3,5,6,10,12,14,$FINISH, di lunghezza $44$: per il <span style="color:#1971c2">[Lemma 9.6](#box-7-pm-lem-path)</span>, ogni calendario dura almeno $44$ settimane.

    - Il progetto può durare più di un dato cammino. Sul cammino START$,1,2,3,5,8,13,$FINISH, di lunghezza $31$, l'attività $8$ aspetta l'attività $5$, che può terminare alla settimana $2+4+10+4=20$, ma anche l'attività $7$, che non sta sul cammino e non può terminare prima della settimana $2+4+10+6+7=29$.

!!! attenzione "Il numero dei cammini"

    Elencare i cammini non funziona sui progetti grandi: il loro numero può crescere esponenzialmente con $n$. Una sequenza di $k$ coppie di attività in parallelo, ogni coppia dopo la precedente, ha $2^k$ cammini da START a FINISH. Il metodo del cammino critico trova la lunghezza di un cammino massimo senza elencare i cammini.

!!! chiave ""

    La lunghezza di un cammino da START a FINISH è la durata complessiva delle sue attività. Ogni calendario dura almeno quanto ognuno di questi cammini; i cammini critici sono quelli più lunghi.

---

**Avanti:** [9.3 La passata in avanti: i tempi al più presto](la-passata-in-avanti-i-tempi-al-piu-presto.md)
