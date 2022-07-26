---
title: Renewable Energy - Sources and Effects on hybrid sailing catamaran Maru
layout: kts-paper
ogimage: graph.png
abstract: "Wind and Solar energy are powering Propulsion, and Navigation and Cooking in various redundant ways - some more obvious than others."
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

<button onclick="e()">(clear selections)</button>

---

## annotations

1. what a sailbot is mainly used for: wind powering sails -> boat is sailing... amazingly simple

2. more general case: how does Wind propel the hybrid boat? The previously explored *Sailing* mode is part of this answer. Second, there is a more complex case where wind powers the *Wind Turbine* which charges a battery which later can power the electric engine. And finally there is a somewhat surprising solution: while sailing (in strong wind), the electric engine can recuperate and charge a battery. This electricity can later be used to run the same engine. In total: 3 different ways how to travel by the power of wind.
3. similar question about the other renewable energy source: Solar. Through various solar panels, electricity is generated in various ways. The details don't matter that much. One way or the other, this energy ends up at a 48-Volt battery. Energy can be used immediately (with strong sunshine) or later to power the engine.
4. How can I prepare hot water for a café by sunshine? The most direct way is by using a solar oven such as the *GoSun Go*. No electricity involved.
5. More generally, on board of Maru there are 2 circuits for collecting solar energy into a 12 Volt system and into a 48 Volt system. With 48 Volt I can operate an inverter (230 V) and from that an induction stove, then put an old-school pot with water on that stove. From 12 Volt I can run the *Fusion* solar oven, which also features an electric heating element (besides collecting solar heat directly, such as the *Go*).



*Side note: Sailing is the most expensive way of travelling for free.*
