# Auftragsverarbeitung

Die Mitwirkung von Boran Gögetap bei der Verarbeitung von Kundendaten regeln der Kunde und Boran Gögetap in zwei Arten von Einzelaufträgen:

1. Auftrag zur Übertragung und Speicherung (ÜS) von Daten
1. Auftrag zur Transformation und Auslieferung (TA) von Daten

Diese Einzelaufträge löst der Kunde in folgendem Servicedesk-Portal aus:

https://goegetap.atlassian.net/servicedesk/customer/portal/6

Jeder Auftrag beschreibt den fachlichen, technischen, örtlichen und zeitlichen Umfang der Datenverarbeitung.

Hier folgen Bedingungen welche für jeden einzelnen Auftrag gelten:

## Vertraulichkeit

Der Kunde deklariert eine Vertraulichkeitsfreigabe für gespeicherte und transformierte Daten. Aktuell sind folgende Freigabestufen vorgesehen:

1 — persönlich\
2 — gruppenweit\
3 — firmenweit\
9 — öffentlich (weltweit, unbegrenzt)

Unabhängig von dieser Deklaration gelten Kundendaten immer dann als ***9 — öffentlich*** eingestuft falls die Daten ohne Anmeldung oder andere Sicherheitsmaßnahmen von jedermann über das Internet aus der Kundendomäne abgerufen werden können (Pull-Mechanismus).

Kundendaten gelten als ***vertraulich*** eingestuft wenn diese vom Kunden über einen Push-Mechanismus übertragen werden und keine explizite Freigabe zur Veröffentlichung besteht.

## Geltungsbereich

Der fachliche und technische Geltungsbereich einer Einzelvereinbarung ist in jedem Auftrag durch folgende zwei Felder definiert:

1. Herkunftsdomäne

Die Domäne der Datenherkunft. Für Daten aus Jira (sowohl Server als auch Cloud) ist das der Text aus der URL zwischen https:// und dem nächsten / , zum Beispiel: goegetap.atlassian.net

2. Verwaltungsrahmen

Fachliche und technische Eingrenzung der Daten. Für Daten aus Jira ist das der Schlüssel des Projektes (meist wenige Großbuchstaben), z.B. KT oder BOGO.

## Beendigung

Jeder Auftrag kann mit einem Ende-Datum vereinbart werden. Ansonsten läuft der Auftrag unbefristet.

In jedem Fall kann der Kunde die Vereinbarungen jederzeit fristlos beenden.

Soweit nicht anders vereinbart kann auch Boran Gögetap die Vereinbarungen jederzeit fristlos beenden, z.B. wenn ein sicherer Betrieb nicht zweifelsfrei weiter möglich ist oder wenn keine kaufmännische Bestellung vorliegt. Insofern beinhalten diese Vereinbarungen keine Verfügbarkeitsgarantie sondern Vertraulichkeitsgarantien. SLAs inklusive Verfügbarkeitsgarantie sind jedoch individuell möglich.

# 1. Auftrag zur Übertragung und Speicherung von Daten  
(Verarbeitungsauftrag ÜS)

Der Kunde überträgt seine eigenen Daten an wissenswandler.de, zunächst mit dem Auftrag zur Speicherung.

## Geltungsbereich

Für die Übertragung und Speicherung von Daten ist die Angabe von genau einem Verwaltungsrahmen möglich.

## Übertragung

Die Übertragung erfolgt an einen Server in der Domäne wissenswandler.de (z.B. webhook.wissenswandler.de ). Andere Domänen befinden sich eventuell nicht unter der Kontrolle von Boran Gögetap und unterliegen nicht dieser Vereinbarung.

## Speicherung

wissenswandler.de speichert die übertragenen Daten in seinem Rechenzentrum in der eigenen Betriebsstätte innerhalb Deutschlands.

wissenswandler.de speichert die Daten mit dem einzigen Zweck der Transformation und Auslieferung (TA), welche in gesonderten Aufträgen vereinbart sind.

Ohne Auftrag zur Transformation und Auslieferung (TA) erfolgt kein Zugriff auf die gespeicherten Kundendaten, weder durch Boran Gögetap noch durch Dritte.
Beginn

Aufträge zur Übertragung und Speicherung beginnen entweder mit einem Auftrag im Status Vereinbart (Agreed) oder durch Übertragung von Kundendaten.

## Beendigung

Aufträge zur Übertragung und Speicherung enden entweder per vereinbartem Ende-Datum oder jederzeit fristlos auf Kundenwunsch. Am deutlichsten kann der Kunde einen Auftrag im Workflow per Übergang in den Status Beendet (Terminated) beenden.

Die Beendigung des jeweils letzten aktiven Verarbeitungsauftrages ÜS zu einem Geltungsbereich entspricht einem Löschantrag für diesen Geltungsbereich. Ein vom Kunden abgegebener Löschantrag beendet alle Verarbeitungsaufträge ÜS zu diesem Geltungsbereich.

Falls 30 Tage lang kein aktiver Verarbeitungsauftrag TA zu den Daten im Geltungsbereich eines Verarbeitungsauftrag ÜS besteht, ist kein Zweck für die Speicherung erkennbar. Auch in diesem Fall endet der Verarbeitungsauftrag ÜS.
Löschung

Mit dem der Ende des letzten Verarbeitungsauftrags ÜS zu einem Geltungsbereich löscht Boran Gögetap sämtliche übertragenen und gespeicherten Daten die zum Geltungsbereich des Verarbeitungsauftrages gehören.

Abschließend setzt Boran Gögetap den Status des Auftrages auf Geschlossen (Closed).

Eventuell bestehende Aufträge zur Transformation und Auslieferung (TA), welche sich (auch) auf den Geltungsbereich einer beendeten Speicherung beziehen, sind dann wegen gelöschter Daten nicht mehr (oder nur noch teilweise) möglich. Boran Gögetap wird den Kunden im Fall solcher Konflikte informieren, die Löschung aber in jedem Fall vornehmen.

# 2. Auftrag zur Transformation von Daten und Auslieferung der Ergebnisse  
(Verarbeitungsauftrag TA)

Der Kunde wünscht eine Transformation (Verarbeitung) seiner gespeicherten Daten und letztlich die Auslieferung der Ergebnisse über ein bestimmtes Medium.

## Geltungsbereich

Die Angabe mehrerer Rahmen ist möglich, z.B. falls der Kunde eine Auswertung über mehrere Verwaltungsrahmen beauftragt.

Zu jedem Rahmen im Geltungsbereich eines Verarbeitungsauftrag TA muss ein aktiver Verarbeitungsauftrag ÜS bestehen.

## Transformation

Der Kunde bestimmt die gewünschte Transformation im Auftrag.

Ergebnis einer Transformation kann z.B. eine detaillierter Bericht (Liste) sein, ein aggregierter Bericht (Summen und Salden) oder eine Visualisierung.

Die Transformation selbst ist ein interner Vorgang auf wissenswandler.de .

## Auslieferung

Erst mit Auslieferung der Ergebnisse werden diese für ihre Empfänger verfügbar.

Der Kunde bestimmt per Auftrag über welches Medium die Ergebnisse ihre Empfänger erreichen sollen. Dabei ist der Kunde selbst für die fachliche Wahrung seiner deklarierten Vertraulichkeitsfreigabe verantwortlich indem er z.B. sicherstellt dass der Verteiler einer Auslieferung per Email tatsächlich die gewünschte Zielgruppe erreicht.

### Auslieferungsmedien

#### 1 — Hosting // 1 — am Auftragsvorgang

wissenswandler.de fügt die Ergebnisse als Anhang an den Auftragsvorgang im Servivedesk-Portal (goegetap.atlassian.net) hinzu.

Zugang zu den Ergebnissen hat somit die Person welche den Auftrag im Servicedesk erstellte. Außerdem hat jede Person oder Organisation, welche der Ersteller (mittels der Funktion Diese Anfrage teilen) zusätzlich hinzufügt, Zugang zu den Ergebnissen. Boran Gögetap wird den Vorgang und die Ergebnisse mit niemandem anderen teilen.

Diese Form von Hosting erfolgt in der Atlassian Cloud. Im Sinne von technischen und organisatorischen Maßnahmen gehen alle Beteiligten von einem unbestimmten Standort der Infrastruktur, also auch außerhalb der EU, aus.

#### 1 — Hosting // 2 — an anderem Vorgang in der Atlassian Cloud

Boran Gögetap fügt die Ergebnisse als Anhang an einen bestimmten Vorgang [V] in einer bestimmten Zieldomäne [D] in der Atlassian Cloud hinzu. Der Zugang für die Auslieferung erfolgt über das Benutzerkonto koordinator@wissenswandler.de, welches vom Betreiber von [D] entsprechend berechtigt werden muss.

Zugang zu den Ergebnissen regelt der Betreiber von [D]. Falls der Kunde nicht selbst Betreiber ist, sollte der Kunde diesem Betreiber vertrauen und sich über die Freigabe oder Zugangsbeschränkungen zu [V] informieren.

Diese Form von Hosting erfolgt in der Atlassian Cloud (siehe auch 1 // 1).

#### 1– Hosting // 3 — an anderem Vorgang auf Jira Server

wissenswandler.de fügt die Ergebnisse als Anhang an einen bestimmten Vorgang [V] in einer bestimmten Zieldomäne [D] auf einem Jira-Server (nicht Cloud) hinzu. Hierfür muss [D] per HTTPS-Protokoll aus dem Internet erreichbar sein (andernfalls siehe Medium 2 // 1).

Der Zugang für die Auslieferung erfolgt über ein vom Kunden bestimmtes Benutzerkonto [B] welches entsprechend auf [D] berechtigt sein muss. Details zur Authentifizierung für [B] vereinbaren Kunde und Boran Gögetap individuell.

Zugang zu den Ergebnissen regelt der Betreiber von [D] (siehe auch 1 // 2).

Der Standort der Infrastruktur ist durch den Betreiber von [D] bestimmt.

#### 1 — Hosting // 4 — auf wissenswandler.de

wissenswandler.de hält die Ergebnisse im eigenen Rechenzentrum in der eigenen Betriebsstätte innerhalb Deutschlands vor.

Zugang zu den Ergebnissen auf diesem Weg erhalten Benutzer, welche per Access Request des Kunden zu genau diesem Verarbeitungsauftrag TA zugelassen wurden.

Die Ergebnisse sind über eine zugangsgeschützte Adresse nach folgendem Schema verfügbar:

https://private.wissenswandler.de/Herkunftsdomäne/Pfad/[Dateinamen]

Nur im Fall von Freigabestufe 9 — öffentlich entfällt der Zugangsschutz. Dann sind die Ergebnisse über eine Adresse nach folgendem Schema verfügbar:

https://public.wissenswandler.de/Herkunftsdomäne/Pfad/[Dateinamen]

Die Werte für Herkunftsdomäne und Pfad bestimmt der Kunde im Auftrag.

Im Fall von mehreren Ergebnissen pro Auftrag ergeben sich die Werte für Dateinamen aus der Art der Transformation.

#### 2 — Email // 1 — an anderen Jira-Vorgang

wissenswandler.de sendet die Ergebnisse der Verarbeitung als Anhänge per Email mit Betreff [V] an die Email-Adresse [E] eines Jira-Mailhandlers.

Wenn der Mailhandler entsprechend konfiguriert ist, hängt das empfangende Jira die Email-Anhänge an den im Betreff genannten Vorgang [V] an.

Wäre Boran Gögetap der Betreiber des empfangenden Jira, so böte sich die direktere Auslieferung 1 // 2 an.

In der Praxis wird Boran Gögetap also nicht Betreiber des empfangenden Systems sein. Daher soll dieses Auslieferungsmedium unbedingt mit nicht-vertraulichen Ergebnissen getestet werden bevor der Auftrag in den Echtbetrieb geht. Vom Vorgehen bietet sich ein Test-Auftrag mit echten Werten für [E] und [V], jedoch unkritischem Geltungsbereich (z.B. Wallace + Gromit) oder einer unkritischer Test-Transformation (Anzahl der Vorgänge im Geltungsbereich) an. Nach erfolgreichem Test erfolgt der eigentliche Auftrag als Kopie des Test-Auftrags und Anpassung des Geltungsbereichs oder der Transformation.

Zugang zu den Ergebnissen regelt der Betreiber von [E], bzw. des Jira welches Emails an [E] verarbeitet (siehe auch 1 // 2).

Der Standort der Infrastruktur ist durch den Betreiber von [E], bzw. des verarbeitenden Jiras, bestimmt.

#### 2 — Email // 2 — an allgemeinen Email-Verteiler

wissenswandler.de sendet die Ergebnisse der Verarbeitung als Anhänge per Email an die Email-Adresse [E]. Der Betreff lautet dann:

[KTS] Auftragsname

Wobei der Wert für Auftragsname der Zusammenfassung des Verarbeitungsauftrages im Servicedesk-Portal entspricht.

## Beendigung

Aufträge zur Transformation und Auslieferung enden entweder per vereinbartem Ende-Datum oder jederzeit fristlos auf Kundenwunsch. Am deutlichsten kann der Kunde einen Auftrag im Workflow per Übergang in den Status Beendet (Terminated) beenden.

30 Tage nach dem Ende des jeweils letzten Verarbeitungsauftrag TA zu einem Geltungsbereich endet auch der entsprechende Verarbeitungsauftrag ÜS zu diesem Geltungsbereich, was zur Löschung der gespeicherten Daten führt.
Löschung

Im Fall folgender Auslieferungsmedien löscht wissenswandler.de die Verarbeitungsergebnisse welche aus diesem VerarbeitungsauftragTA entstanden sind :

1 // 1  
1 // 2 (falls Boran Gögetap die Zieldomäne [D] betreibt)  
1 // 4

Abschließend setzt Boran Gögetap den Status des Auftrages auf Geschlossen (Closed).

---

Stand dieser Erklärung: Version 1 vom 22.10.2019
