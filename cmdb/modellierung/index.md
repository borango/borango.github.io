# CMDB Modellierung

> Praktischer, herstellerunabhängiger Workshop mit Best Practices für Aufbau, Einführung und Betrieb der Configuration Management Database (CMDB) als zentrales Tool im IT Service Management (ITSM)

Teilnehmer entwickeln ihr eigenes CMDB Datenmodell und pflegen anschließend Configuration Items in einer CMDB Testumgebung.

Dauer: 1 Tag

Listenpreis[^1]: € 1.200

Ermäßigter Preis[^2]: € 600

![diagram of an example configuration](img/configuration-map.svg)

## Zielgruppe

* CMDB – Projektleiter
* Configuration Manager
* Change Manager, Release- und Deployment Manager
* Architekten
* Prozessberater

## Kursziele

* Grundlagen der CMDB Modellierung erlernen (CMDB Design)
* Konzepte von zentralen und föderierten (federated) CMDBs verstehen
* Einführungspfade einer CMDB kennenlernen
* Anforderungen zur Auswahl passender CMDB Tools sammeln
* den Configuration Management Prozess praktisch umsetzen (planen, identifizieren, steuern, dokumentieren, überprüfen)

## Inhalte

* Praxisbeispiele von CMDB Einführungen
* Graphentheorie und Datenmodell (CMDB Schema)
* Configuration Item (CI) und Beziehung zwischen CIs
* CI Typen und Attribute
* Beziehungstypen und Kardinalitäten
* Abfragen und Suche in einer CMDB
* Methoden zur Visualisierung
* Metriken und CMDB Audit
* Kontinuierliche Verbesserung am CMDB Modell und Inhalt

## Inhouse Termine

Diesen Workshop biete ich Ihnen auch zu individuellen Inhouse-Terminen an.

## ITIL: CMDB, CMS + SKMS

ITIL V3 erweitert das Konzept der CMDB: ein Configuration Management System (CMS) kann mehrere CMDBs enthalten.

Das CMS ist Bestandteil eines Service Knowledge Management System (SKMS), in dem schließlich alle (servicerelevanten) Informationen vernetzt sind – nicht nur solche die unter Konfigurationskontrolle stehen.

Alle vorgenannten Systeme dienen der strukturierten Sammlung und Verwertung von Information, daher kann man diese Systeme auch als einen Teil von ERP, EAM oder Wissensmanagement verstehen.

## Beispiele für Prozessunterstützung

* im Incident Management recherchieren Mitarbeiter die Abhängigkeiten von CIs sowie die Historie von Änderungen, um die möglichen Ursachen einer Störung **nach** deren Eintritt zu ermitteln
* im Change Management analysieren Mitarbeiter die Beziehungen in der CMDB zur Bewertung der möglichen Auswirkung (Impact) **vor** geplanten Änderungen
* im Service Level Management speichern Mitarbeiter die Informationen über SLAs, Vertragspartner und Kommunikationspartner in der CMDB

## Bezug zu anderen Standards

Die ISO 20000 Norm für IT Service Management fordert einen Configuration Management Prozess inklusive CMDB (siehe auch ISO 19770).

Das Cobit Framework für IT Governance enthält ebenfalls einen Prozess "Manage the configuration" und bezieht sich auf Configuration Items sowie unterstützende Tools, z.B. ein zentrales Repository.

Die ISO 10007 Norm enthält branchenneutrale Empfehlungen zu Konfigurationsmanagement.

## Asset Management und die CMDB

Asset Management (Anlagegüterverwaltung) überschneidet sich teilweise mit Konfigurationsmanagement: viele Configuration Items sind gleichzeitig Anlagen, Anlagegüter oder Vermögensgegenstände. Asset Management wird überwiegend für die finanzielle Bewertung betrieben, daher umfasst das Anlagevermögen per Definition keine Elemente mit geringem eigenen Wert, sowie keine Anlagen die sich nicht dauerhaft im Besitz des Unternehmens befinden. Das Konfigurationsmangement hingegen verwaltet alle Komponenten die für das Funktionieren von Services eine Rolle spielen. Außerdem dokumentiert die CMDB alle wesentlichen Zusammenhänge zwischen diesen Komponenten. Beim Anlagevermögen werden nur minimale Zusammenhänge geführt (Standort, Kostenstelle).

## Open Source CMDB (KTS)

Reale Beispiele bearbeiten wir im Kurs mit verschiedenenn Open Source Tools (KTS, GraphViz, Observable) oder in einer kostenlosen Jira Instanz. Jeder Teilnehmer kann diese Tools samt Beispieldaten mit nach Hause nehmen oder in der Cloud weiter betreiben. Die im Kurs vorgestellten Konzepte sind herstellerneutral, produktunabhängig und allgemein einsetzbar.

## CMDB Viewer

Die Daten der CMDB visualieren wir im Kurs mit verschiedenen Werkzeugen, z.B. als 2-dimensionale druckbare Ansichten oder als 3-dimensionale Strukturen.

## Prüfung und Abschluss

Der Workshop enthält eine praktische Prüfung und führt zum Configuration Expert Zertifikat.

## Unterlagen als PDF

Teilnehmer erhalten die Schulungsunterlagen in elektronischer Form zur weiteren Verwendung nach dem Kurs.

{% include training-footnotes.md %}
