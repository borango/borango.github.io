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
        onpress( sdoc, "n"              )
        onclick( sdoc, "OTHER-54"       )
        onpress( sdoc, "n"              )
        onclick( sdoc, "SYMMETA-189"    )
        onpress( sdoc, "j"              )
      }
      function a2()
      {
        onpress( sdoc, "e"      )
        onpress( sdoc, "n"              )
        onclick( sdoc, "OTHER-49"       )
        onpress( sdoc, "n"              )
        onclick( sdoc, "SYMMETA-188"    )
        onpress( sdoc, "j"              )
      }
    </script>

# <center>{{ page.title }}</center>

<object class="clear" id="graph_1" width="100%" data="graph-local.svg" type="image/svg+xml" alt="knowledge map" ></object>

---

Ein paar vorbereitete Auswertungen:
<button onclick="a0()">Sailing mode</button>
<button onclick="a1()">Propulsion by Wind</button>
<button onclick="a2()">Propulsion by Sun</button>
