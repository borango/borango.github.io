---
title: Renewable Energy - Sources and Effects on hybrid sailing catamaran Maru
layout: kts-paper
ogimage: graph.png
abstract: "Wind and Solar energy are powering Propulsion, Navigation and Cooking in various redundant ways - some more obvious than others."
---
<script src="/lib/graph.js" type="text/ecmascript"></script>
<script>
      var sdoc
      window.addEventListener("load", function()
      {
        sdoc = document.getElementById("graph_1").getSVGDocument()
      })

      function a0()
      {
        onpress( sdoc, "e"              )
        onpress( sdoc, "s"              )
        onclick( sdoc, "MARU-139"       )
      }
      function a1()
      {
        onpress( sdoc, "e"              )
        onclick( sdoc, "NAVIGARE-14"	)
        onclick( sdoc, "UNIVERSAL-23"	)
        onpress( sdoc, "j"              )
      }
      function a2()
      {
        onpress( sdoc, "e"		)
        onclick( sdoc, "NAVIGARE-14"	)
        onclick( sdoc, "UNIVERSAL-22"	)
        onpress( sdoc, "j"              )
      }
      function a3()
      {
        onpress( sdoc, "e"		)
        onclick( sdoc, "BOGOI-557"	)
        onclick( sdoc, "NAVIGARE-41"	)
        onpress( sdoc, "j"              )
      }
      function a4()
      {
        onpress( sdoc, "e"		)
        onclick( sdoc, "NAVIGARE-41"	)
        onclick( sdoc, "UNIVERSAL-22"	)
        onpress( sdoc, "j"              )
      }
      function a5()
      {
        onpress( sdoc, "e"		)
        onclick( sdoc, "MARU-400"	)
        onclick( sdoc, "UNIVERSAL-23"	)
        onpress( sdoc, "j"              )
      }
      function a6()
      {
        onpress( sdoc, "e"		)
        onclick( sdoc, "NAVIGARE-42"	)
        onclick( sdoc, "UNIVERSAL-23"	)
        onpress( sdoc, "j"              )
      }
      function e()
      {
        onpress( sdoc, "e"		)
      }
    </script>

# <center>{{ page.title }}</center>

<object class="clear" id="graph_1" width="100%" data="graph-local.svg" type="image/svg+xml" alt="knowledge map" ></object>


selected information surgeries:

1. <button onclick="a0()">Sailing mode</button>
2. <button onclick="a1()">Propulsion by Wind</button>
3. <button onclick="a2()">Propulsion by Sun</button>
4. <button onclick="a3()">Coffee by Sun (directly)</button>
5. <button onclick="a4()">Coffee by Sun (all)</button>
6. <button onclick="a5()">Frying by Wind</button>
7. <button onclick="a6()">Preparing soup by Wind</button>

<button onclick="e()">(clear selections)</button>

---

## annotations

1. How a sailbot essentially works (since some 60.000 years): wind powering sails -> boat is sailing... amazingly simple

2. more general case: how does Wind propel the hybrid boat? The previously explored *Sailing* mode is part of this answer. Second, there is a more complex case where wind powers the *Wind Turbine* which charges a battery which later can power the electric engine. And finally there is a somewhat surprising solution: while sailing (in strong wind), the electric engine can recuperate and charge a battery. This electricity can later be used to run the same engine. In total: 3 different ways how to travel by the power of wind.

3. similar question about the other renewable energy source: Solar. Through various solar panels, electricity is generated in various ways. The details don't matter that much. One way or the other, this energy ends up at a 48-Volt battery. Energy can be used immediately (with strong sunshine) or later to power the engine.

4. Now let's get into even nicer applications: eating and dringing... How can I prepare hot water for a café by sunshine? The most direct way is by using a solar oven such as the *GoSun Go*. No electricity involved.

5. More generally, on board of Maru there are 2 circuits for collecting solar energy into a 12 Volt system and into a 48 Volt system. With 48 Volt I can operate an inverter (230 V) and from that an induction stove, then put an old-school pot with water on that stove. From 12 Volt I can run the *Fusion* solar oven, which also features an electric heating element (besides collecting solar heat directly, such as the *Go*).

6. Now let's see how Maru's crew can fry something in the pan, with the help of Wind energy. The solution is similar to question 2. Instead of the engine we are running the induction stove. _Try pressing the buttons **2** and **6** in sequence._

7. Finally, if soup is good enough then we also have the option of boiling water from a 12 Volt device, such as the *Fusion* stove. _Try pressing the buttons **6** and **7** in sequence._

Note that you can also click in the diagram and explore all chains of cause and effect yourself!

---

## "Making of..."

I prepared these examples for 3 different reasons:

- To summarize (for those who are interested) some proven ways for sustainable, off-the-grid production and consumption of energy.

- To help myself understanding how all components on my boat are connected, both for planning the installation and for maintenance.

- To showcase KTS - the *Knowledge Transformation System* which is my digital passion. Powered by renewable energy :-)


Please send my a note via the Email link below if you have questions or any kind of feedback.


---
*Footnote: Sailing is the most expensive way of travelling for free.*
