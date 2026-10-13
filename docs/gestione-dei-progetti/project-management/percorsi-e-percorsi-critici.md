---
title: "Percorsi e percorsi critici"
---

# 9.2 Percorsi e percorsi critici { #sez-pm-sec-paths }

<div class="info-capitolo" markdown>

**Parte 5 · Gestione dei progetti · Capitolo 9** · [:material-book-open-variant: Capitolo 9: Gestione dei progetti](index.md) · [:material-file-pdf-box: Dispensa, volume 5 (PDF)](../../pdf/dispensa-5-gestione-dei-progetti.pdf) · [:material-pencil: Esercizi: Gestione dei progetti](../../esercizi/project-management.md)

</div>

- In (H1) e (H2), il metodo del percorso critico risponde alle seguenti domande.

    1. Qual è il tempo minimo richiesto per completare il progetto?

    2. Quando può iniziare e terminare al più presto ciascuna attività?

    3. Quando deve iniziare e terminare al più tardi ciascuna attività, per non ritardare il completamento del progetto?

    4. Quali attività sono critiche, per cui qualsiasi ritardo su di esse ritarda il progetto?

    5. Per le altre attività, quanto ritardo può essere tollerato?

<a id="box-6-pm-def-critical"></a>

!!! definizione "Definizione 9.5: lunghezza di un percorso e percorso critico"

    Ogni arco $(i,j) \in A$ ha <strong>lunghezza</strong> $d_i$, la durata della sua coda. Il <strong>lunghezza</strong> di un diretto il percorso $P=i_0,i_1,\dots,i_k$ è

    $$
    L(P)=\sum_{s=0}^{k-1} d_{i_s},
    $$

    la durata totale dei suoi nodi tranne l'ultimo. Un <strong>percorso critico</strong> è un percorso dall'INIZIO alla FINE di lunghezza massima. Un'attività è <strong>critica</strong> se si trova su un percorso critico.

- Su un percorso da INIZIO a FINE le durate del primo e dell'ultimo nodo sono zero: $L(P)$ è il totale durata delle attività del percorso.

- Un progetto può avere più percorsi critici: quando più percorsi si congiungono per la lunghezza massima, sono tutti critico.

<a id="box-7-pm-lem-path"></a>

!!! teorema "Lemma 9.6: ogni percorso delimita la durata"

    Per ogni programma $\vet{t}$ e ogni percorso $P$ dall'INIZIO alla FINE, $t_{n+1} \ge L(P)$.

??? dimostrazione "Dimostrazione"

    Lascia che $P=i_0,i_1,\dots,i_k$ con $i_0=0$ e $i_k=n+1$. Sommando i vincoli $t_{i_{s+1}} \ge t_{i_s}+d_{i_s}$ degli archi di $P$, il telescopio dei tempi di inizio:

    $$
    t_{n+1}-t_0 \ge \sum_{s=0}^{k-1} d_{i_s}=L(P),
    $$

    e $t_0=0$. <span class="qed">□</span>

- Le attività di un percorso devono essere svolte una dopo l'altra, senza sovrapposizioni: il progetto non può essere più breve di qualsiasi percorso.

<a id="box-8-pm-ex-paths"></a>

!!! esempio "Esempio 9.2: i percorsi del caso studio"

    La rete di <span style="color:#1971c2">[Esempio 9.1](progetti-e-reti-di-progetto.md#box-3-pm-ex-case)</span> ha sei percorsi da INIZIO a FINE; la loro durata, in settimane, è:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>percorso dall'INIZIO alla FINE e durata (settimane)</th>
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

    - Il percorso più lungo è START$,1,2,3,5,6,10,12,14,$FINISH, di lunghezza $44$: da <span style="color:#1971c2">[Lemma 9.6](#box-7-pm-lem-path)</span>, ogni programmazione dura almeno $44$ settimane.

    - Il progetto può durare più di un determinato percorso. Sul percorso START$,1,2,3,5,8,13,$FINISH, di lunghezza $31$, l'attività $8$ attende l'attività $5$, che può terminare nella settimana $2+4+10+4=20$, ma anche l'attività $7$, che non è sul percorso e non è possibile terminarlo prima della settimana $2+4+10+6+7=29$.

!!! attenzione "Il numero di percorsi"

    Elencare i percorsi non funziona su progetti di grandi dimensioni: il loro numero può crescere esponenzialmente con $n$. Una sequenza di $k$ coppie di attività parallele, ciascuna coppia dopo la precedente, ha percorsi $2^k$ da INIZIO a FINE. Il critico path trova la lunghezza di un percorso più lungo senza elencare i percorsi.

!!! chiave ""

    La lunghezza di un percorso dall'INIZIO alla FINE è la durata totale delle sue attività. Ogni programma dura almeno quanto lungo quanto ogni percorso del genere; i percorsi critici sono quelli più lunghi.

---

**Avanti:** [9.3 Il passaggio in avanti: i primi tempi](il-passaggio-in-avanti-i-primi-tempi.md)
