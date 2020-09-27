      google.charts.load('current', {
        'packages': ['sankey']
      });
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'From');
        data.addColumn('string', 'To');
        data.addColumn('number', 'Weight');
        data.addColumn({
          type: 'string',
          role: 'tooltip'
        });
        
        var factor_dream	=	parseFloat( document.querySelector('input[name="Traum"]:checked'			).value		);
        var factor_the		=	parseFloat( document.querySelector('input[name="Thermik"]:checked'		).value		);
				var factor_ans		=	parseFloat( document.querySelector('input[name="Anstrengung"]:checked').value 	);
        var factor_dizzy	= parseFloat( document.querySelector('input[name="Dizzy"]:checked'			).value		);
        var factor_vertigo= parseFloat( document.querySelector('input[name="vertigo"]:checked'		).value		);
        var factor_cold		= parseFloat( document.querySelector('input[name="cold"]:checked'		).value		);

				var ans_lei = factor_ans * 0.50;
        var ans_ubw = factor_ans * 0.50;
        var ans_cal = factor_ans * 1.00;
        var ans_car = factor_ans * 1.00;
        var sum_ans = ans_lei + ans_ubw + ans_cal + ans_car;

        var ubw1		= 0.50;
        var ubw3 		= 0.25;
        var ubwsumme = ubw1 + ans_ubw + ubw3;

        var erf1 = 0.50;
        var erf2 = 1.00;
        var erf3 = ubwsumme;
        var erfsumme = erf1 + erf2 + erf3;

        var schw_o_2 = ubw1;

        var shk = factor_the * factor_dizzy * 0.25;

        var cir_alt = factor_the * 2;
        var cir_brd = factor_the * 0.25;
        var cir_diz = factor_the * factor_dizzy * 0.25;
				var the_cir = cir_alt + cir_brd + cir_diz;
        
        var the = the_cir + shk;
        
        var abh_alt = 4;
        var alt = abh_alt + cir_alt;
        
        var fwb = 0.25; // fly with birds
        var brd = cir_brd + fwb;
        
				var abh_s3d = 0.5
        var man = factor_dizzy > 0 ? man = 0 : 1.5;

				var man_diz = factor_dizzy * man;
				var dizzy		= man_diz + cir_diz + shk;

				var man_s3d = man - man_diz;
        
        var s3d = man_s3d + abh_s3d;
        
        var gli = alt / 4;
        var lit = alt / 4;
        var pan = alt / 4;
        var ver = alt / 8 * factor_vertigo;
        var alt_col = alt / 16 * factor_cold;
        
        var dur = Math.abs( alt - gli - lit - pan - ver - alt_col );
        
        var dur_col = dur / 3.0 * factor_cold;
        var pip = dur > 1.0 ? (dur - 1) / 3 : 0;
        var dur_lei = dur > 0.5 ? (dur - 0.5) / 4 : 0.01;
        var dur_hap = dur - dur_col - pip - dur_lei;
     
     		var col = dur_col + alt_col;
        
        var fre = gli / 2;
        var gli_nat = gli / 2;

				var hik_nat = 1;
        var nat = brd + hik_nat + gli_nat;
        
        var rows = [

// voll positiv (1. Grad)

          ['Vertrauen',											'Glücksgefühl', 1.5, '...'],
          ['Gefühl der Leichtigkeit',				'Glücksgefühl', lit, 'das Gefühl der Leichtigkeit trägt zur Freude bei'],
          ['Sensation im Raum',							'Glücksgefühl', s3d, 'außergewöhnliches Raumgefühl erzeugt Freude'],
						];
          if( factor_dream > 0) { rows.push.apply( rows, [
					['persönlicher Traum',						'Glücksgefühl', factor_dream, 'einen persönlichen Traum zu erfüllen erzeugt tiefe Befriedigung und Freude'],
          ['Flug', 'persönlicher Traum', factor_dream, 'Fliegen kann einen persönlichen Traum -buchstäblich- wahr werden lassen'],
						]);}
          rows.push.apply( rows, [
          
					['Einklang mit der Natur fühlen', 'Glücksgefühl', nat, '(ohne Worte)'],
          ['Gefühl der Freiheit',						'Glücksgefühl', fre, 'das Gefühl der Freiheit trägt zur Freude bei'],
          ['Erfolgserlebnis',								'Glücksgefühl', erfsumme, 'das Erfolgserlebnis erzeugt besonders lang anhaltendes Glücksgefühl'],
          ['Panorama',											'Glücksgefühl', pan, 'optischer Gaumenschmaus trägt zur Freude bei (Fotos und Filme können das für später festhalten)'],
					['Dauer',													'Glücksgefühl', dur_hap, 'ein längerer Flug verstärkt in der Regel alle Glücksgefühle'],
          ['Kalorien verbraucht',						'Fitness',			ans_cal, '...'],
          ['Herz und Kreislauf trainiert',	'Fitness',			ans_car, '...'],
          
// rein positiv (2. Grad)

          ['Abheben',			'Erfolgserlebnis', erf1, 'das Abheben erzeugt sofort ein Erfolgserlebnis' ],
          ['Landen',			'Erfolgserlebnis', erf2, '...'],
					['Überwindung', 'Erfolgserlebnis', erf3, 'jede erfolgreiche Überwindung erzeugt ein tiefes und anhaltendes Erfolgserlebnis'],
          ['Gleiten', 'Einklang mit der Natur fühlen', gli_nat, 'im Gleitflug wirken alle Kräfte wie aufgehoben; der Fahrwind rauscht, ansonsten Stille'],
					['Gleiten', 'Gefühl der Freiheit', fre, 'die Fähigkeit zu Fliegen -wohin wir wollen- erzeugt ein Gefühl der Freiheit'],
          ['sich fühlen wie ein Vogel', 'Einklang mit der Natur fühlen', brd, '(ohne Worte)'],
          ['mit Vögeln fliegen (selten)', 'sich fühlen wie ein Vogel', fwb, '..!'],
          ['Höhe', 'Panorama', pan, 'Höhe ermöglicht ein außergewöhnliches Panorama über Berge, Seen und über das Flachland'],
          ['Abheben', 'Sensation im Raum', abh_s3d, 'das Abheben bewirkt ein sensationelles Gefühl von Schwerelosigkeit' ],
          ['Flug', 'mit Vögeln fliegen (selten)', .25, 'mit etwas Glück nähern wir uns in der Luft Krähen, Falken, Milanen oder Adlern'],
          ['Höhe', 'Gefühl der Leichtigkeit', lit, 'Höhe erzeugt ein Gefühl der Leichtigkeit'],
          ['Manöver (auf Wunsch)', 'Sensation im Raum', man_s3d, 'schnelle Drehungen, hohe G-Kräfte oder starke Neigungen können Begeisterung erzeugen (bei dem ders mag)'],
          ['Wanderung', 'Einklang mit der Natur fühlen', hik_nat, 'Die Wanderung zum Gipfel ist unsere ruhige Einstimmung in die Natur und auf den möglichen Flug.'],
          ['Kennenlernen', 'Vertrauen', 1, '...'],
					['Höhe', 'Gleiten', gli, 'sanft gleiten wir auf der Höhe ins Tal'],
          ['Anstrengung',										'Kalorien verbraucht',					ans_cal, '...'],
          ['Anstrengung',										'Herz und Kreislauf trainiert',	ans_car, '...'],

// rein positiv (3. Grad und höher)

						] );
          if( cir_brd > 0) { rows.push.apply( rows, [
          ['Thermikkreisen','sich fühlen wie ein Vogel',	cir_brd,	'beim Kreisen fühle ich mich den Vögeln am nächsten' ],
						]);}
          rows.push.apply( rows, [
          
          ['gefühlte oder echte Schwierigkeit',	'Überwindung', ubw1, '...'],
          ['Anstrengung',												'Überwindung', ans_ubw, 'der innere Schweinehund'],
          ['Gefühl der Gefahr',									'Überwindung', ubw3, 'jede Umsetzung bei gefühlter Gefahr kostet Überwindung, selbst wenn die Aktivität objektiv sicher ist'],

// neutral (gemischte Folgen)

					['Flug', 'Starten', 5.5, 'der Start ist die erste Phase im Flug'],
						] );
          if( the > 0) { rows.push.apply( rows, [

          ['Flug',					'Thermik',										the,			'je nach Wetterbedingungen entsteht thermischer Aufwind - den können wir nutzen oder auch nicht'],
          ['Thermik',				'Thermikkreisen',							the_cir,	'aufsteigende, schlauchförmige Luft zentrieren wir mit Kreisen um zu steigen'],
          ['Thermikkreisen','Höhe',												cir_alt,	'durch Kreisen gewinnen wir mehr und mehr Höhe'],
						]);}
          rows.push.apply( rows, [
          
					['etwas Neues probieren', 'gefühlte oder echte Schwierigkeit', .5, 'Abenteuer oder Expeditionen sind für die meisten Menschen eine Herausforderung' ],
          ['Wanderung', 'Kennenlernen', 1, 'auf der Wanderung können wir uns in Ruhe kennen lernen'],
          ['Wanderung', 'Anstrengung', sum_ans, 'wie anstrengend oder einfach eine Wanderung ist, können wir durch geeignete Auswahl leicht steuern'],
          ['Starten', 'Abheben', 5, '...'],
					['Abheben', 'Höhe', abh_alt, 'gleich nach dem Abheben erleben wir die Gipfelhöhe als zunehmende Höhe über Grund, im freien Luftraum'],
					['Höhe', 'Dauer', dur, 'mehr Höhe verlängert den Flug'],
					['etwas Neues probieren', 'Restrisiko', .5, 'im Unbekannten können Gefahren lauern' ],
						] );
          if( man > 0) { rows.push.apply( rows, [
					['Flug', 'Manöver (auf Wunsch)', man, 'je nach Wunsch des Passagiers können wir in sanften oder extremen Manövern ganz besondere Flugzustände erleben'],
						]);}
          rows.push.apply( rows, [
          ['Flug', 'Landen', 1, 'die letzte Phase im Flug - nicht schwierig aber eindrucksvoll'],
          ['Nervosität', 'Vertrauen', .5, 'Nervosität kann durch Vertrauen reduziert oder abgeleitet werden' ],
					['gefühlte oder echte Schwierigkeit', 'Nervosität', .5, 'die gefühlte Schwierigkeit kann zu Nervosität führen'],

          ['Starten', 'gefühlte oder echte Schwierigkeit', .5, 'der Startvorgang ist die anspruchsvollste Phase des Fluges für den Passagier'],
						] );
          if( shk > 0) { rows.push.apply( rows, [

          ['Thermik', 'Schaukeln', shk, 'thermische Luft bringt den Gleitschirm immer mehr oder weniger zum Schaukeln'],

// rein negativ (2. Grad und höher)

					['Schaukeln', 'Schwindel', shk, 'Kreisen kann Schwindelgefühl oder Übelkeit auslösen'],

						]);}
            
          rows.push.apply( rows, [

					['Flug', 'Restrisiko', .25, 'aus welchen Gründen auch immer: ein Gleitschirmflug birgt ein gewisses Restrisiko'],
						] );
            
          if( cir_diz > 0)	{ rows.push.apply( rows, [	['Thermikkreisen','Schwindel', cir_diz,	'Kreisen kann Schwindelgefühl oder Übelkeit auslösen (individuell verschieden)'],	]);}
          if( alt_col > 0)	{ rows.push.apply( rows, [	['Höhe',	'Kälte', alt_col, 'je höher umso kälter'],	]);}
          if( dur_col > 0)	{ rows.push.apply( rows, [	['Dauer', 'Kälte', dur_col, 'je länger umso kälter'],	]);}
          if( man_diz > 0)	{ rows.push.apply( rows, [	['Manöver (auf Wunsch)', 'Schwindel', man_diz, 'Manöver können zu Schwindelgefühl führen'],	]);}

          if( ver > 0) { rows.push.apply( rows, [
          
					['Höhe', 'Höhenangst', ver, 'Höhe kann Höhenangst auslösen'],
          ['Höhenangst', 'Leidensfaktoren', ver, 'Höhenangst schmälert den Genuss - daher bereiten wir uns sorgfältig vor und versuchen alle Ängste zu reduzieren'],
          
						]);}
          rows.push.apply( rows, [

          ['Restrisiko', 'Gefühl der Gefahr', 0.5, 'die Kenntnis oder Phantasie in Bezug auf das Restrisiko kann ein Gefühl der Gefahr erzeugen'],
          ['Gefühl der Gefahr', 'Nervosität', .25, 'die gefühlte Schwierigkeit kann zu Nervosität führen'],
					['Restrisiko', 'Prävention', 0.25, 'für erkennbare Restrisiken sollen die Beteiligten angemessene Gegenmaßnahmen ergreifen'],
					['Prävention', 'Unfall', 0.25, 'wo präventive Maßnahmen nicht wirksam waren, kann ein Unfall passieren'],
						] );

          if( pip > 0) {
          rows.push.apply( rows, [
          ['Dauer', 'Harndrang', pip, 'ein Flug kann auch mehrere Stunden lang dauern (das besprechen wir vorab)'],
          ['Harndrang', 'Leidensfaktoren', pip, 'der Passagier entscheidet wann genug ist'],	]); }

          rows.push.apply( rows, [

          ['Anstrengung', 'Leidensfaktoren', ans_lei, '...'],
					['Dauer', 'Leidensfaktoren', dur_lei, 'Irgendwann wird es unbequem, anstrengend oder kalt. Deshalb bestimmt der Passagier wann genug ist.'],
					['Schwindel', 'Leidensfaktoren', dizzy, 'Schwindel oder Übelkeit schmälern den Genuss - in solchen Fällen vermeiden wir Manöver und besondere Wetterbedingungen'],
          ['Nervosität', 'Leidensfaktoren', .25, 'Nervosität schmälert den Genuss - deshalb bereiten wir uns in aller Ruhe auf den Flug vor'],
						] );
          if( col > 0) { rows.push.apply( rows, [	['Kälte',			'Leidensfaktoren', col,	'Kälte ist unangenehm wenn die Kleidung nicht ausreichend isoliert'],	]);}
          rows.push.apply( rows, [
					['Unfall', 'Leidensfaktoren', .25, '...'],

        ] );
        
        data.addRows( rows );


        var colors = [
          '#1a9641',
          '#1a9641',
        	'#2c7bb6',
          '#d7191c',
        ];

        var options = {
          width:  1200,
          height: 1100,
          iterations: 64,
          
          sankey: {
            node: {
              colors: colors,
              nodePadding: 80
            },
            link: {
              colorMode: 'gradient',
            }
          }
        };

        // Instantiates and draws our chart, passing in some options.
        var chart = new google.visualization.Sankey(document.getElementById('sankey_basic'));
        chart.draw(data, options);
      }

