/*  Copyright 2019-2023 Boran Gögetap <- boran@goegetap.name

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

const node_separator	= "___" // KTS contract for the id of edges, so that we can split it into node ids

const DIRECTION_NORTH	= 1	// constant to indicate direction of travel, going "up" or "North"
const DIRECTION_SOUTH	= 0	// constant to indicate direction of travel, going "down" or "South"
const DIRECTION_BOTH  = 2	// constant to indicate direction of travel, going "both" ways

const DIRSTRING		= ['South', 'North']	// textual representation of direction

const MISSION_ERASE	= "MISSION_ERASE" 
const MISSION_COUNT     = "MISSION_COUNT" 

var NEXT_CLICK_MEMORY		= false
var NEXT_CLICK_DIRECTION	= -1	

var visited
var focussed

/*
 * convenience function to execute either a click- or a press-command
 * which is mostly used in the URL interface for passing a (sequence of) command(s)
 */
function e( symbol )
{
  command = keyboardFunctionMap[ symbol ];
  if( command )
  {
    press( symbol );
    return;
  }

  elm = document.getElementById( symbol );
  if( elm )
  {
    click( elm );
    return;
  }

  throw( "don't know how to execute statement ==>" + symbol + "<==" );
}

/*
 * shortcut function for conclick
 */
function click( elm ) { return onclick( document, elm, null ) }

/*
 * KTS response on a click: traverse the graph and present that path by coloring the nodes and edges
 *
 * count max distances from clicked node both ways (north and south),
 * then travel the longer path because that is more interesting
 */
function onclick( document, elm, event )
{
 console.debug( "entering via click event in document.doctype.nodeName: " + document.doctype.nodeName );

  if( typeof elm === 'string' )
  {
    id = elm;
    console.debug( "converting ID " + id + " string to document element" )
    elm = document.getElementById( id )
    if( !elm )
    {
      console.error( "cannot find element with id " + id ); 
      return
    }
  }
  id = elm.id
  focussed = elm

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
  if( NEXT_CLICK_DIRECTION == DIRECTION_BOTH )
  {
    start_travel ( document, elm , max_distance , DIRECTION_SOUTH );
    start_travel ( document, elm , max_distance , DIRECTION_NORTH );
  }
  else
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

function start_travel( document, elm , max_distance, direction, mission = calculate_travel_tag( id , direction ) )
{
  visited = 0
  console.debug( "going " + DIRSTRING [ direction ] + " for max " + max_distance[ direction ] + " steps" + ( mission ? (" on mission " + mission ) : "..." )  )

  document.querySelectorAll( "[distance]"  ).forEach(   (svgElm) => {  svgElm.removeAttribute( "distance" )  }   ) 

  let dist = travel_node( document,	elm , 0 ,
    direction == DIRECTION_SOUTH ? 0 : max_distance[DIRECTION_NORTH] ,
    max_distance[direction]+1 ,
    direction,
    mission
  ) 

  let logtext = "visited " + visited + " nodes with max distance of " + dist + " between";
  switch( mission )
  {
    case MISSION_COUNT:
      console.debug( logtext );
      break;
    default:
      console.info( logtext );
  }

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
  if( edges.length == 0 ) return 0 // terminate recursion and 'count' this node
  else
  // recurse and increment color rank IF travelling South (color rank decreases from edge to next node, in positive flow direction)
  return Math.max(   ... Array.from(  edges, edge => travel_edge( document, edge , current_dist, current_rank + 1 - direction , total_ranks , direction , tag )
  )   )
 }
 else return -1 // terminate recursion and undo count of this node (it gets added by the previous travel_edge on call stack)
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
  return true						// ... and continue recursion
 }

 //
 // mission = tag or COUNT
 //
 
 let g_a_text = elm.querySelector( "g a text" )
 let isLogicalAndNode =
     g_a_text &&
     g_a_text.innerHTML == "∧"

 let isActivated = true

 if( isLogicalAndNode )
 {
  let nIncomingEdges  = document.querySelectorAll(  next_edges_selector( elm.id , DIRECTION_SOUTH, false )  ).length
  let nActivatedEdges = document.querySelectorAll(  next_edges_selector( elm.id , DIRECTION_SOUTH, true  )  ).length
  isActivated = nIncomingEdges == nActivatedEdges
 }

 let seenBefore = elm.hasAttribute( "distance"	)	// been here before

 let distance = + elm.getAttribute( "distance"	)

 if( distance > current_dist				// previous visit through a longer path than current visit
     ||							// OR
     ! seenBefore				)	// first time here
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
   return isActivated
 }
 //console.info( "   terminating travel at current d = " + current_dist )
 return false
}

function next_edges_selector( id, direction, tagged = false )
{
 if( direction == DIRECTION_NORTH )
 {
   return '[id^="' +                  id + node_separator +
   '"]' 
 }
 if( direction == DIRECTION_SOUTH )
 {
   return '[id$="' + node_separator + id +
   '"]' + (tagged ? '[tag1]' : '') + ':not( [id^="a_"] )'
 }
 return "error - unknown direction code"
}


const keyboardFunctionMap = {

B : { text : "travel [B]oth ways upon next CLICK (= sequence of [N],[S])", 	f : (document) =>
    {
      NEXT_CLICK_DIRECTION = DIRECTION_BOTH
    }}
,
d : { text : "[d]im selected nodes (= inverse of [F])",					f : function(document)
      {
        document.querySelectorAll( "g[tag1]" ).forEach( (svgElm) => { remove_visitor_tags( svgElm ); svgElm.classList.add( "dim" ) })
      }
    }
,
e : { text : "[e]rase all color markup",				f : function(document)
      {
	// cleanup tagged nodes
        document.querySelectorAll( "g"  ).forEach( (svgElm) => { remove_visitor_tags( svgElm    ) })
	// also un-dim dimmed nodes
        document.querySelectorAll( "g"    ).forEach( (svgElm) => { svgElm.classList.remove( "dim","hover","underline" ) })
      }
    }
,
// key 'f' also captures CTRL-F in chrome, so no more find-in-page possible
F : { text : "[F]ocus on selected nodes (= inverse of [d])",		f : function(document)
    {
      document.querySelectorAll( "g.edge:not([tag1]), g.node:not([tag1])" ).forEach( (svgElm) => { svgElm.classList.add( "dim" ) })
      document.querySelectorAll( "g[tag1]"       ).forEach( (svgElm) => { remove_visitor_tags( svgElm ) })
    }}
,
h : { text : "activating [h]yperlink mode (= inverse of [v])", f : function(document)
    {
      activate_hyperlink_mode(document)
    }}
,
i : { text : "keep [i]ntersecting paths (clear the rest) = inverse of [o]",		f : (document) =>
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
N : { text : "travel [N]orth (forward) direction upon next CLICK (= inverse of [S])", 	f : function(document)
    {
      NEXT_CLICK_DIRECTION = DIRECTION_NORTH
    }}
,
o : { text : "keep [o]utersection (clear intersection) = inverse of [i]",		f : (document) =>
    {
      document.querySelectorAll("g[tag2]").forEach((svgElm) => { remove_visitor_tags(svgElm) })
    }}
,
// key 'r' also captures CTRL-R in chrome, so no more page-reload possible
R : { text : "[R]emove a single node upon next CLICK", 			f : function(document)
    {
      remove_visitor_tags( focussed )
    }}
,
// key 's' also captures CTRL-S in chrome, so no more save-page possible
S : { text : "travel [S]outh (backward) direction upon next CLICK (= inverse of [N])",	f : function(document)
    {
      NEXT_CLICK_DIRECTION = DIRECTION_SOUTH
    }}
,
u : { text : "copy [u]rl of focussed node to clipboard",		f : function(document)
    {
      let url = document.querySelector( "#" + focussed.id + " g a" ).getAttribute( "xlink:href" ); 
      console.info( "focussed.id: " + focussed.id + " with url: " + url );
      navigator.clipboard.writeText( url );
    }}
,
v : { text : "activating [v]isual mode (= inverse of [h])",	f : function(document)
    {
      activate_visual_mode(document)
    }}
,
y : { text : "[y]ank (copy) ID of focussed node to clipboard",	f : function(document)
    {
      console.info( "focussed.id: " + focussed.id );
      navigator.clipboard.writeText( focussed.id );
    }}
,
',':{ text : "copy selection to clipboard, separated by [,] (comma)", f : function(document) { copy_selection_to_clipboard( document, ',' ) } }
,
' ':{ text : "[SPACE] copy selection to clipboard, separated by [ ] (space)", f : function(document) { copy_selection_to_clipboard( document, ' ' ) } }

,
'?':{ text : "show this help window",						f : (document) =>
    {
      console.debug( "output of keyboardFunctionMap in console (should also appear in browser as SVG / HTML)" )
      for (let key in keyboardFunctionMap)
      {
        console.info(key + " : " + keyboardFunctionMap[key]["text"])
      }

      // for HTML (also inside SVG):
      apply_display_style( "ktsKeyboardHelp", 'display: block' )

      try
      {
        // for SVG:
        document.getElementById( "fo0").removeAttribute( "display" )
      }
      catch( e )
      {
      }
    }}
,
'Escape': { text : "close this help window",			f : (document) => 
    {
      // for HTML (also inside SVG):
      apply_display_style( "ktsKeyboardHelp", 'display: none' )

      try
      {
        // for SVG:
        document.getElementById( "fo0").setAttribute( "display", "none" )
      }
      catch( e )
      {
      }
    }
}
}

function apply_display_style( docElmId, style )
{
  try
  {
    // for HTML:
    document.getElementById( docElmId ).style = style
  }
  catch( e )
  {
    console.error( "document not prepared for help window - render SVG with KTS later then 2023-01-04" )
  }
}

/*
 * recursive function to find the (transitive) parent graph node for a given SVG element
 */
function findParentGraphNode( svgElm )
{
  if( svgElm.tagName == "g" && svgElm.classList.contains( "node" ) )
  {
    return svgElm;
  }
  return( findParentGraphNode( svgElm.parentNode ) );
}

function press( key )	// shortcut without document parameter
{
  return execute_keyboard_function( document, key )
}

function onpress( document, key )	//convenience of shorter function name for HTML documents
{
  return execute_keyboard_function( document, key )
}
function execute_keyboard_function( document, key )
{
  try{
    console.debug( "entering via keyboard event in document.doctype.nodeName: " + document.doctype.nodeName );
  }
  catch( e )
  {
    console.debug( "entering via keyboard event in document.childNodes[0].localName: " + document.childNodes[0].localName );
  }

  let ktsFunction = keyboardFunctionMap[ key ];
  if( !ktsFunction )
  {
    throw( "wrong command - press '?' for help" )
  }
  console.log(  ktsFunction["text"]  )
                ktsFunction["f"   ] (document)
}

/*
 * copy the IDs of all selected nodes to the clipboard,
 * separated by the given separator string
 * (e.g. "," or " ")
 */
function copy_selection_to_clipboard( document, separator )
{
  const selection = Array.from(document.querySelectorAll( "g.node[tag1]" )).reduce( (acc,curr) => {return acc + curr.id + separator},"" ).slice(0,-(separator.length))
  navigator.clipboard.writeText( selection );
  console.info( "selection (now on clipboard): " + selection );
}

/*
 * leave the DOM clean by removing all attributes and classes that were added by KTS
 */
function remove_visitor_tags( svgElm )
{
  svgElm.removeAttribute( "tag1"		)
  svgElm.removeAttribute( "tag2"		)
  svgElm.removeAttribute( "colorank"	)
  svgElm.removeAttribute( "distance"	)
  svgElm.classList.remove( "dim"		)
}

/*
 * the event.target is a lower-level element (one which has visible parts on the screen),
 * typically not a graph node (which is a group of elements, some of them visible)
 */
function register_mouseover_events( document )
{
  document.querySelectorAll( "g.node" ).forEach
  ( (e) =>
  {
    e.addEventListener
    ( "mouseover",
      (event) =>
      {
        focussed = findParentGraphNode( event.target ) ;
        console.debug( "focussed.id: " + focussed.id );
      }
    ),
    false
  }
  )
}

    
function generateKeyboardShortcutButtons( document )
{
  const NSPCE_XHTML = "http://www.w3.org/1999/xhtml"
  let doctype;
  try {
    doctype = document.doctype.nodeName;
  }
  catch( e )
  {
    doctype = document.childNodes[0].localName;
  }

  console.debug( "generating KeyboardShortcutButtons for " + doctype + " ..." );

  let helpParent;
  let buttonContainer;
  switch( doctype )
  {
  case "html":
    helpParent = document.body
    buttonContainer	= document.createElement( "div" )
    break;
  case "svg":
    /*
    // following div is necessary for getting on an HTML namespace track, otherwise the SVG namespace is used
    helpParent = document.createElementNS(NSPCE_XHTML, "div");
    
    foreignObject = document.createElement( 'foreignObject' );
    foreignObject.setAttribute( "width",  "100%");
    foreignObject.setAttribute( "height", "100%");
    foreignObject.height= "100%" ;
    foreignObject.appendChild( helpParent );
    document.getRootNode().children[0].appendChild( foreignObject );
    */
    helpParent = document.getElementById( "htmldiv" );

    buttonContainer	= document.createElementNS( NSPCE_XHTML, "div" )
    break;
  }
  //helpParent.classList.add( "ktsKeyboardHelpParent" );
      
  let
  keyboardHelpDiv			= document.createElement("div")

  try
  {
    helpParent.appendChild( keyboardHelpDiv )

    buttonContainer.setAttribute( "id", "ktsKeyboardButtons" );
    //buttonContainer.classList.add( "modal-content" )
    for (let key in keyboardFunctionMap)
    {
      buttonContainer.innerHTML +=
        '<p>' +
        '<button onclick="press( \'' + key + '\' )">' + key +
        '</button> ' +
        keyboardFunctionMap[key]["text"] +
        '</p>'
    }
    
    keyboardHelpDiv.setAttribute( "id", "ktsKeyboardHelp" );
    keyboardHelpDiv.innerHTML = 'KTS Commands';
    keyboardHelpDiv.style = "display: none";
    keyboardHelpDiv.appendChild( buttonContainer );
  }
  catch( e )
  {
    console.error( "document not prepared for help window - render SVG with KTS later then 2023-01-04" )
  }
}

/*
 * activate the visual mode = traverse the graph by clicking on nodes
 * implemented via onclick event handler on each graph node
 */
function activate_visual_mode(document)
{
 document.querySelectorAll( "g.node" ).forEach(    (svgElm) => {   svgElm.onclick = (event) => { onclick(document, svgElm, event) }   }    )
}

function activate_hyperlink_mode(document)
{
 document.querySelectorAll( "g.node" ).forEach( (svgElm) => { svgElm.onclick = "" })
}

/*
 * from: https://stackoverflow.com/a/30070207
 */
function getParameterByName(name)
{
  let results = getParametersByName(name);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function getParametersByName(name)
{
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  return regex.exec(location.search);
}

function addKeyListener ()
{
window.addEventListener("keydown", function(event) {
  if (event.defaultPrevented) {
    return; // Should do nothing if the default action has been cancelled
  }

  let handled = false;
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
      console.debug( event.key )
    }
  }

  if (handled) {
    // Suppress "double action" if event handled
    event.preventDefault();
  }
}, true);
}

function execute_url_command()
{
  let auto_execute_command  = getParameterByName( "exec" )
  if( auto_execute_command == "" )
  {   auto_execute_command = "v" }

      auto_execute_command.split( "," ).forEach( (command) => e( command ) )

  const highlight = getParameterByName( "highlight" )
  if(   highlight != "" )
  {
    highlight_node( highlight )
  }
}

function analyze()
{
  let all_nodes = document.querySelectorAll( "g.node" );
  let distances =     Array.from( all_nodes ).map( (elm) => { result = {}; result[elm.id] = start_travel( document, elm , [0,0], DIRECTION_NORTH, MISSION_COUNT); return result } );
  distances.push( ... Array.from( all_nodes ).map( (elm) => { result = {}; result[elm.id] = start_travel( document, elm , [0,0], DIRECTION_SOUTH, MISSION_COUNT); return result } )) ;
  let sorted_distances = distances.map( (o) => Object.entries(o) ).sort( (a,b) => b[0][1] - a[0][1] );
  let maximum_longdistance = sorted_distances[0][0][1];
  console.info( distances.length + " nodes in graph, longest path = " + (maximum_longdistance+1) );
  console.info( "now highlighting the fundamental nodes ... " );
  fundamental_nodes = distances.filter( (o) => Object.values(o)[0] == maximum_longdistance ).forEach
  ( (o) => 
    {
      click( Object.keys(o)[0] )
    }
  );
}

function highlight_node( id )
{
  let node = document.getElementById( id );
  node.classList.add( "hover" );
  console.info( "highlighted node " + id + " - you can reset that with keyboard command [e]");
}

/*
 * browser lifecycle actions
 */

window.onload = function()
{
  generateKeyboardShortcutButtons( document );
  addKeyListener();
  register_mouseover_events( document );
  analyze();
  execute_url_command();
}
