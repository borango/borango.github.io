/*  Copyright 2019-2020 Boran Gögetap <- boran@goegetap.name

    javascript for interactive SVG graph viewer,
    ... Teil von // part of ...
    Knowledge Transformation System (KTS)

    KTS ist Freie Software: Sie können es unter den Bedingungen
    der GNU Affero General Public License, wie von der Free Software Foundation,
    Version 3 der Lizenz oder (nach Ihrer Wahl) jeder neueren
    veröffentlichten Version, weiter verteilen und/oder modifizieren.

    KTS wird in der Hoffnung, dass es nützlich sein wird, aber
    OHNE JEDE GEWÄHRLEISTUNG, bereitgestellt; sogar ohne die implizite
    Gewährleistung der MARKTFÄHIGKEIT oder EIGNUNG FÜR EINEN BESTIMMTEN ZWECK.
    Siehe die GNU Affero General Public License für weitere Details.

    Sie sollten eine Kopie der GNU Affero General Public License zusammen mit diesem
    Programm erhalten haben. Wenn nicht, siehe <https://www.gnu.org/licenses/>.

    //

    KTS is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    KTS is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with KTS.  If not, see <https://www.gnu.org/licenses/>.
 */

const DIRECTION_NORTH	= 1
const DIRECTION_SOUTH	= 0

const DIRSTRING		= ['South', 'North']

const node_separator	= "___"

const MISSION_ERASE	= "MISSION_ERASE" 
const MISSION_COUNT     = "MISSION_COUNT" 

var NEXT_CLICK_MEMORY		= false
var NEXT_CLICK_DIRECTION	= -1

var visited

var focussed

/*
 * count max distances from node both ways (north and south),
 * then travel the longer path because that is more interesting
 */
function onclick( document, elm, event )
{
 switch( typeof elm )
 {
  case 'string' :
   elm = document.getElementById( elm )
  case 'object' :
   id = elm.id
   focussed = elm
 }

 console.log( "click on Element with id " + id )
 if( event ) event.preventDefault()

 if( NEXT_CLICK_MEMORY == 'R' )
 {
  remove_visitor_tags( elm ) 
  NEXT_CLICK_MEMORY = false; return
 }

 var myTags = [	calculate_travel_tag( id, DIRECTION_SOUTH ) ,
 		calculate_travel_tag( id, DIRECTION_NORTH ) ]

 let max_distance = Array.from(  [0,1], dir => start_travel( document, elm , [0,0], dir, MISSION_COUNT )  )

 if( max_distance[0] + max_distance[1] == 0 ) { console.info("no neighbors"); return }

 var visitorTags = [ elm.getAttribute( "tag1" ), elm.getAttribute( "tag2" )]

 if( NEXT_CLICK_DIRECTION > -1 )		// explicit wish
 {
  start_travel ( document, elm , max_distance , NEXT_CLICK_DIRECTION )
 }
 else
 if( max_distance[0] == max_distance[1] )
 {
  console.info( "equal path lengths North and South" )
  if( visitorTags.includes( myTags[ 0 ] )  	// been there
   && visitorTags.includes( myTags[ 1 ] ) ) 	// been the other way, too
  {
    console.info( "cleaning up" )
    erase_both_ways( document, elm , max_distance )
  }
  else //follow both
  {
    start_travel ( document, elm , max_distance , DIRECTION_SOUTH )
    start_travel ( document, elm , max_distance , DIRECTION_NORTH )
  }
 }
 else // paths are not equally long
 {
    let direction = max_distance[0] > max_distance[1] ? 0 : 1	// direction of the longer path

    if(   visitorTags.includes( myTags[    direction ] )  )	// been there
    {
      if( visitorTags.includes( myTags[ 1- direction ] )  	// been the other way, too ...
	  ||
	  max_distance[ 1- direction ] == 0			// no reverse path
       )
        erase_both_ways( document, elm, max_distance )			// ... reverse not an option
      else
        start_travel ( document, elm , max_distance , 1- direction)	// travel reversed direction
    }
    else
        start_travel ( document, elm , max_distance ,    direction)	// travel direction of longer, untravelled path
 }
 NEXT_CLICK_DIRECTION = -1
}

function calculate_travel_tag( id, direction )
{
 return id + "-going-" + direction
}

function erase_both_ways( document, elm , max_distance )
{
  console.info ( "erasing both ways" )
  start_travel ( document, elm , max_distance , DIRECTION_SOUTH, MISSION_ERASE )

  elm.setAttribute( "tag1", "dummy" ) // set dummy tag so that next travel does not terminate on already cleared node

  start_travel ( document, elm , max_distance , DIRECTION_NORTH, MISSION_ERASE )
}

function start_travel( document, elm , max_distance, direction, mission = null )
{
 visited = 0
 console.info( "going " + DIRSTRING [ direction ] + " for max " + max_distance[ direction ] + " steps" + ( mission ? (" on mission " + mission ) : "..." )  )

 document.querySelectorAll( "[distance]"  ).forEach(   (svgElm) => {  svgElm.removeAttribute( "distance" )  }   ) 

 let dist = travel_node( document,	elm , 0 ,
		direction == DIRECTION_SOUTH ? 0 : max_distance[DIRECTION_NORTH] ,
		max_distance[direction]+1 ,
		direction,
		mission ? mission : calculate_travel_tag( id , direction )  ) 

 console.info( "visited " + visited + " nodes and max distance of " + dist )
 return dist
}

/*
 * recursive coloring travel, node hop
 */
function travel_node( document, elm , current_dist, current_rank , total_ranks , direction , tag )
{
 ++visited; // console.log( "  entering n " + elm.id + " at d: " + current_dist + ", r: " + current_rank + " of " + total_ranks )
 if(  set_visitor_tags( elm , current_dist, current_rank , total_ranks , direction , tag )  )
 {
  let edges = document.querySelectorAll(  next_edges_selector( elm.id , direction )  )
  if( edges.length == 0 ) return 0 // terminate and 'count' this node
  else
  // recurse and increment color rank IF travelling South (color rank decreases from edge to next node, in positive flow direction)
  return Math.max(   ... Array.from(  edges, edge => travel_edge( document, edge , current_dist, current_rank + 1 - direction , total_ranks , direction , tag )
  )   )
 }
 else return -1 // terminate and undo count of this node (it gets added by the previous travel_edge on call stack)
}

/*
 * recursive coloring travel, edge hop, adding 1 to recursive distance _assuming_ that the folowing node 'counts'
 */
function travel_edge( document, elm , current_dist, current_rank , total_ranks , direction , tag )
{
 // console.log( "  entering e " + elm.id + " at d: " + current_dist + ", r: " + current_rank + " of " + total_ranks )

 if( document.querySelector( '[id^="' + elm.id + '"] > g > a > path[stroke-dasharray]' ) ) return 0

 set_visitor_tags( elm , current_dist, current_rank , total_ranks , direction , tag ) 

 // recurse and decrement color rank IF travelling North (color rank decreases from edge to next node, in positive flow direction)
 return 1 + travel_node(   document,
                       document.getElementById(  elm.id.split( node_separator )[ direction ]  ),
                       1+current_dist, current_rank - direction , total_ranks , direction , tag   )
}

/*
 * mark node as visited and return whether recursion should continue from here
 */
function set_visitor_tags( elm , current_dist, current_rank , total_ranks , direction , tag )
{
 if( tag == MISSION_ERASE )
 {
  if( ! elm.hasAttribute( "tag1" ) &&
      ! elm.hasAttribute( "tag2" ) ) return false	// already erased
  // else
  remove_visitor_tags( elm )				// otherwise clear...
  return true						// ... and continue
 }

 // mission = tag or COUNT

 let distance = + elm.getAttribute( "distance" )
 if( !            elm.hasAttribute( "distance" )	// not been here before OR
  || distance > current_dist )				// previous visit through a longer path than current visit
 {
   elm.setAttribute( "distance", current_dist );

   if( tag != MISSION_COUNT )				// tagging, not counting
   {
     if(  ! elm.hasAttribute( "tag1" ) || distance > current_dist  )
            elm.setAttribute( "tag1", tag )
     else
         elm.setAttribute( "tag2", tag )

         elm.classList.remove( "dim" )

         elm.setAttribute( "colorank",
			    total_ranks > 9		// largest brewer scheme
			    ?
			    Math.round( 1.0 * current_rank / total_ranks * 9) + "-9"
			    :
			                      current_rank                    + "-" + total_ranks )
   }
   return true
 }
 //console.info( "   terminating travel at current d = " + current_dist )
 return false
}

function next_edges_selector( id, direction )
{
 if( direction == DIRECTION_NORTH )
 {
   return '[id^="' +                  id + node_separator +
   '"]' 
 }
 if( direction == DIRECTION_SOUTH )
 {
   return '[id$="' + node_separator + id +
   '"]:not( [id^="a_"] )'
 }
 return "error - unknown direction code"
}


const keyboardFunctionMap = {

/* Jira-create currently not implement to save JQuery and Jira libs
c : { text : "[c]reate new Jira object", 	f : function()
    {
      showCollectorDialog();
    }}
,*/
d : { text : "[d]im selected nodes",					f : function(document)
      {
        document.querySelectorAll( "g[tag1]" ).forEach( (svgElm) => { remove_visitor_tags( svgElm ); svgElm.classList.add( "dim" ) })
      }
    }
,
e : { text : "[e]rase all travel paths",				f : function(document)
      {
	// cleanup tagged nodes
        document.querySelectorAll( "[tag1]"  ).forEach( (svgElm) => { remove_visitor_tags( svgElm    ) })
	// also un-dim dimmed nodes
        document.querySelectorAll( ".dim"    ).forEach( (svgElm) => { svgElm.classList.remove( "dim" ) })
      }
    }
,
// key 'f' also captures CTRL-F in chrome, so no more find-in-page possible
F : { text : "[F]ocus on (=dim all except) selected nodes",		f : function(document)
    {
      document.querySelectorAll( "g.edge:not([tag1]), g.node:not([tag1])" ).forEach( (svgElm) => { svgElm.classList.add( "dim" ) })
      document.querySelectorAll( "g[tag1]"       ).forEach( (svgElm) => { remove_visitor_tags( svgElm ) })
    }}
,
h : { text : "activating [h]yperlink mode (de-activating visual mode)", f : function(document)
    {
      activate_hyperlink_mode(document)
    }}
,
i : { text : "keep [i]ntersecting paths (clear the rest)",		f : function(document)
    {
      var intersection = document.querySelectorAll( "g[tag2]" )
      if( intersection.length > 0 )
      {
       document.querySelectorAll( "g[tag1]:not([tag2])" ).forEach( (svgElm) => { svgElm.removeAttribute( "tag1" ) })
       console.log( " all but intersection cleared - you can [m]erge to turn the former intersection from blue to orange")
      }
      else console.log( " currently no intersecting paths")
    }}
,
j : { text : "shortcut for [i] + [F] (focus on intersection)",		f : function(document)
    {
      execute_keyboard_function( document, "i" )
      execute_keyboard_function( document, "F" )
    }}
,
l : { text : "[l]ist of selected nodes (use [,] and [ ] to put on clipboard)",		f : function(document)
    {
      document.querySelectorAll( "g.node[tag1]" ).forEach( (svgElm) => { console.log( svgElm.id ) })
    }}
,
m : { text : "[m]erge path intersections", 				f : function(document)
    {
      document.querySelectorAll( "g[tag2]" ).forEach( (svgElm) => { svgElm.removeAttribute( "tag2" ) })
    }}
,
n : { text : "travel [n]orth (forward) direction upon next CLICK", 	f : function(document)
    {
      NEXT_CLICK_DIRECTION = DIRECTION_NORTH
    }}
,
o : { text : "keep [o]utersection (clear intersection)",		f : function(document)
    {
      var intersection = document.querySelectorAll( "g[tag2]" )
      if( intersection.length > 0 )
      {
       document.querySelectorAll( "g[tag2]" ).forEach( (svgElm) =>
       {
        svgElm.removeAttribute( "tag1" )
        svgElm.removeAttribute( "tag2" )
       })
       console.info( " intersection cleared" )
      }
      else console.log( " currently no intersecting paths")
    }}
,
R : { text : "[R]emove a single node upon next CLICK", 			f : function(document)
    {
    }}
,
s : { text : "travel [s]outh (backward) direction upon next CLICK",	f : function(document)
    {
      NEXT_CLICK_DIRECTION = DIRECTION_SOUTH
    }}
,
u : { text : "copy [u]rl of focussed node to clipboard",		f : function(document)
    {
      navigator.clipboard.writeText(
        document.querySelector( "#" + focussed.id + " g a" ).getAttribute( "xlink:href" )
      ).then( function() { }, function() { } );
    }}
,
v : { text : "activating [v]isual mode (de-activating hyperlink mode)",	f : function(document)
    {
      activate_visual_mode(document)
    }}
,
x : { text : "clear path intersections [x]",				f : function(document)
    {
      document.querySelectorAll( "g[tag2]" ).forEach( (svgElm) => { remove_visitor_tags( svgElm ) })
    }}
,
y : { text : "[y]ank (copy) focussed node ID to clipboard",		f : function(document)
    {
      navigator.clipboard.writeText( focussed.id ).then( function(document) { }, function(document) { } );
    }}
,
',':{ text : "copy selection to clipboard, separated by [,]", f : function(document) { copy_selection_to_clipboard( document, ',' ) } }
,
' ':{ text : "copy selection to clipboard, separated by [ ]", f : function(document) { copy_selection_to_clipboard( document, ' ' ) } }


,
'?':{ text : "Help",							f : function(document)
      {
        for (let key in keyboardFunctionMap) {
          console.log( key + " : " + keyboardFunctionMap[key]["text"] );
	  }
      }
    }
}

document.querySelectorAll( "g.node" ).forEach( (e) => { e.addEventListener("mouseover", function(event) { console.info( event ); focussed = event.target  }  ), false  } )

window.addEventListener("keydown", function(event) {
  if (event.defaultPrevented) {
    return; // Should do nothing if the default action has been cancelled
  }

  var handled = false;
  if (event.key !== undefined)
  {
    NEXT_CLICK_MEMORY = event.key

    if( event.key in keyboardFunctionMap )
    {
      execute_keyboard_function( document, event.key )
      handled = true
    }
    else
    {
      console.info( event.key )
    }
  } else if ( event.keyCode !== undefined ) {
    // Handle the event with KeyboardEvent.keyCode and set handled true.
  }

  if (handled) {
    // Suppress "double action" if event handled
    event.preventDefault();
  }
}, true);

function onpress( document, key )	//convenience of shorter function name for HTML documents
{
         execute_keyboard_function( document, key )
}
function execute_keyboard_function( document, key )
{
  console.log(  keyboardFunctionMap[ key ]["text"]  )
                keyboardFunctionMap[ key ]["f"   ] (document)
}

function copy_selection_to_clipboard( document, separator )
{
 let result = ""
 document.querySelectorAll( "g.node[tag1]" ).forEach( (svgElm) => { result = result + svgElm.id + " " + separator + " " })
 navigator.clipboard.writeText( result.slice( 0, -3 ) ).then( function() { }, function() { } );
}

function remove_visitor_tags( svgElm )
{
 svgElm.removeAttribute( "tag1"		)
 svgElm.removeAttribute( "tag2"		)
 svgElm.removeAttribute( "colorank"	)
 svgElm.removeAttribute( "distance"	)
 svgElm.classList.remove( "dim"		)
}

window.onload = function()
{
 var auto_execute_command  = getParameterByName( "exec" )
 if( auto_execute_command == "" )
 {   auto_execute_command = "v" }
 execute_keyboard_function( document,
     auto_execute_command )

 generateKeyboardShortcutButtons()
}

function generateKeyboardShortcutButtons()
{
 let buttonContainer = document.getElementById("keyboardshortcuts")

 if( buttonContainer == null )
 {
  console.info( "no HTML element with ID 'keyboardshortcuts' found -> skipping the insertion of keyboard shortcuts" )
 }
 else
 {
 for (let key in keyboardFunctionMap)
 {
  buttonContainer.innerHTML +=
   '<p>' +
    '<button onclick="onpress( sdoc, \'' + key + '\' )">' + key +
    '</button> ' +
    keyboardFunctionMap[key]["text"] +
   '</p>'
 }
 }
}

function activate_visual_mode(document)
{
 document.querySelectorAll( "g.node" ).forEach(    (svgElm) => {   svgElm.onclick = function(event){  onclick( document , svgElm , event )  }   }    )
}

function activate_hyperlink_mode(document)
{
 document.querySelectorAll( "g.node" ).forEach( (svgElm) => { svgElm.onclick = "" })
}

/*
 * from: https://stackoverflow.com/a/30070207
 */
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
