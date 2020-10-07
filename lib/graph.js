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

var temp

/*
 * count max distances from node both ways (north and south),
 * then travel the longer path because that is more interesting

TODO: fix overlapping colors and too many visits in case of cirular path

 */
function onclick( id, event )
{
 console.log( "\n\nclick\n" )
 event.preventDefault()

 if( NEXT_CLICK_MEMORY == 'r' )
 {
  remove_visitor_tags(  document.getElementById( id )  )
  NEXT_CLICK_MEMORY = false; return
 }

 var myTags = [	calculate_travel_tag( id, DIRECTION_SOUTH ) ,
 		calculate_travel_tag( id, DIRECTION_NORTH ) ]

 var max_distance = Array.from(  [0, 1], dir => begin_counting( id, dir )  )

 if( max_distance[0] + max_distance[1] == 0 ) { console.info("no neighbors"); return }

 var svgElm = document.getElementById( id )
 var visitorTags = [ svgElm.getAttribute( "tag1" ), svgElm.getAttribute( "tag2" )]

 if( max_distance[0] == max_distance[1] )
 {
  console.info( "equal path lengths North and South" )
//if( visitorTags[0] == myTags[1] && visitorTags[1] == myTags[0] )
  if( visitorTags.includes( myTags[ 0 ] )  	// been there
   && visitorTags.includes( myTags[ 1 ] ) ) 	// been the other way, too
  {
    console.info( "cleaning up" )
    erase_both_ways( id, max_distance )
  }
  else //follow both
  {
    start_travel ( id , max_distance , DIRECTION_SOUTH )
    start_travel ( id , max_distance , DIRECTION_NORTH )
  }
 }
 else // paths are not equally long
 {
    let direction = NEXT_CLICK_DIRECTION > -1 ? NEXT_CLICK_DIRECTION
                    :
                    max_distance[0] > max_distance[1] ? 0 : 1	// direction of the longer path

    if(   visitorTags.includes( myTags[    direction ] )  )	// been there
    {
      if( visitorTags.includes( myTags[ 1- direction ] )  	// been the other way, too ...
	  ||
          NEXT_CLICK_DIRECTION == direction 			// explicit direction wish ...
	  ||
	  max_distance[ 1- direction ] == 0			// no reverse path
       )
        erase_both_ways( id, max_distance )			// ... reverse not an option
      else
        start_travel ( id , max_distance , 1- direction)	// travel reversed direction
    }
    else
        start_travel ( id , max_distance ,    direction)	// travel direction of longer, untravelled path
 }
 NEXT_CLICK_DIRECTION = -1
}

function erase_both_ways( id , max_distance )
{
  console.info ( "erasing both ways" )
  start_travel ( id , max_distance , DIRECTION_SOUTH, MISSION_ERASE )

  document.getElementById( id ).setAttribute( "tag1", "dummy" )
  // set a dummy tag so that next travel does not terminate on already cleared node

  start_travel ( id , max_distance , DIRECTION_NORTH, MISSION_ERASE )
}

function start_travel( id , max_distance, direction, mission = null )
{
 temp = 0
 console.info( "going " + DIRSTRING [ direction ] + " for max " + max_distance[ direction ] + " steps" + ( mission ? (" on mission " + mission ) : "..." )  )

 document.querySelectorAll( "[distance]"  ).forEach(   (svgElm) => {  svgElm.removeAttribute( "distance" )  }   ) 

 let dist = travel_node(	id , 0 ,
		direction == DIRECTION_SOUTH ? 0 : max_distance[DIRECTION_NORTH] ,
		max_distance[direction]+1 ,
		direction,
		mission ? mission : calculate_travel_tag( id, direction )  )

 console.info( "travelled " + temp + " nodes and max distance of " + dist )
 return dist
}

function calculate_travel_tag( id, direction )
{
 return id + "-going-" + direction
}

function begin_counting( id, direction )
{
 temp = 0
 document.querySelectorAll( "[counterdistance]"  ).forEach(   (svgElm) => {  svgElm.removeAttribute( "counterdistance" )  }   ) 
 let result = travel_node( id, 0, 0, 0, direction, MISSION_COUNT )
 console.info(  "counted d = " + result + " and visited " + temp + " nodes " + DIRSTRING[ direction ]  )
 return result
}

/*
 * recursive coloring travel, node hop
 */
function travel_node( id , current_dist, current_rank , total_ranks , direction , tag )
{
 ++temp; // console.log( "  entering n " + id + " at d: " + current_dist + ", r: " + current_rank + " of " + total_ranks )
 if(  set_visitor_tags( id , current_dist, current_rank , total_ranks , direction , tag )  )
 {
  let edges = document.querySelectorAll(  next_edges_selector( id, direction )  )
  if( edges.length == 0 ) { console.info( "  terminating in dead end at d = " + current_dist ); return 0 }

  // recurse and increment color rank IF travelling South (color rank decreases from edge to next node, in positive flow direction)
  return Math.max(   ... Array.from(  edges, edge => travel_edge( edge.id , current_dist, current_rank + 1 - direction , total_ranks , direction , tag )
  )   )
 }
 else return 0
}

/*
 * recursive coloring travel, edge hop
 */
function travel_edge( id , current_dist, current_rank , total_ranks , direction , tag )
{
 // console.log( "  entering e " + id + " at d: " + current_dist + ", r: " + current_rank + " of " + total_ranks )
 set_visitor_tags( id , current_dist, current_rank , total_ranks , direction , tag ) 

 // recurse and decrement color rank IF travelling North (color rank decreases from edge to next node, in positive flow direction)
 return 1 + travel_node( id.split( node_separator )[ direction ] , 1+current_dist, current_rank - direction , total_ranks , direction , tag )
}

/*
 * mark node as visited and return whether recursion should continue from here
 */
function set_visitor_tags( id , current_dist, current_rank , total_ranks , direction , tag )
{
 let svgElm = document.getElementById( id )

 if( tag == MISSION_COUNT )
 {
  let counterdistance = svgElm.getAttribute( "counterdistance" )
  if( ! svgElm.hasAttribute( "counterdistance" )          // not been here before OR
   || counterdistance > current_dist )                    // previous visit through a longer path than current visit
  {
   svgElm.setAttribute( "counterdistance", current_dist ) // (over-)write current (shorter) distance
   return true                                            // ... and continue
  }
  console.info( "   terminating count at current d = " + current_dist + " and prev. counter d = " + counterdistance )
  return false
 }

 let tag1   = svgElm.getAttribute( "tag1" )
 let tag2   = svgElm.getAttribute( "tag2" )

 if( tag == MISSION_ERASE )
 {
  if( tag1 == null && tag2 == null ) { console.log( "already erased" ); return false }
  // else
  remove_visitor_tags( svgElm )				// otherwise clear ...
  return true						// ... and continue
 }

 // mission = tag

 let distance = svgElm.getAttribute( "distance" )
 if( ! svgElm.hasAttribute( "distance" )          // not been here before OR
  || distance > current_dist )                    // previous visit through a longer path than current visit
 {
  if(  ! svgElm.hasAttribute( "tag1" ) || distance > current_dist  )
   { svgElm.setAttribute( "tag1", tag ) }
  else
   { svgElm.setAttribute( "tag2", tag ) }

   svgElm.classList.remove( "dim" )

   svgElm.setAttribute( "colorank",
			total_ranks > 9	// largest brewer scheme
			?
			Math.round( 1.0 * current_rank / total_ranks * 9) + "-9"
			:
			                  current_rank                    + "-" + total_ranks	)

   svgElm.setAttribute( "distance", current_dist );

   return true
 }
 console.info( "   terminating color at current d = " + current_dist )
 return false
}

function next_edges_selector( id, direction )
{
 if( direction == DIRECTION_NORTH ) { return '[id^="' +                  id + node_separator + '"]' }
 if( direction == DIRECTION_SOUTH ) { return '[id$="' + node_separator + id +   '"]:not( [id^="a_"] )' }
 return "error - unknown direction code"
}


window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Should do nothing if the default action has been cancelled
  }

  var handled = false;
  if (event.key !== undefined)
  {
    handled = true

//	if( event.key == 'c' )
//    {
//      console.log( "[c]reate new Jira object" )
//      showCollectorDialog();
//    }
//  else
	if( event.key == 'd' )
    {
      console.log( "[d]im selected nodes" )
      document.querySelectorAll( "g[tag1]" ).forEach( (svgElm) => { remove_visitor_tags( svgElm ); svgElm.classList.add( "dim" ) })
    }
    else
	if( event.key == 'e' )
    {
      console.log( "[e]rase all travel paths" )
      document.querySelectorAll( "[tag1]"  ).forEach( (svgElm) => { remove_visitor_tags( svgElm    ) })
      document.querySelectorAll( ".dim"    ).forEach( (svgElm) => { svgElm.classList.remove( "dim" ) })
      // ^ amazing workaround for the class "dim" not being removed effectively inside remove_visitor_tags()
    }
    else
	if( event.key == 'F' ) // key 'f' also captures CTRL-F in chrome, so no more find-in-page possible
    {
      console.log( "[F]ocus on (=dim all except) selected nodes" )
      document.querySelectorAll( "g.edge:not([tag1]), g.node:not([tag1])" ).forEach( (svgElm) => { svgElm.classList.add( "dim" ) })
      document.querySelectorAll( "g[tag1]"       ).forEach( (svgElm) => { remove_visitor_tags( svgElm ) })
    }
    else
	if( event.key == 'h' )
    {
      console.log( "activating [h]yperlink mode (de-activating visual mode)" )
      activate_hyperlink_mode()
    }
    else
	if( event.key == 'i' )
    {
      console.log( "keep [i]ntersecting paths (clear the rest)" )
      var intersection = document.querySelectorAll( "g[tag2]" )
      if( intersection.length > 0 )
      {
       document.querySelectorAll( "g[tag1]:not([tag2])" ).forEach( (svgElm) => { svgElm.removeAttribute( "tag1" ) })
       console.log( "all but intersection cleared - you can [M]erge to turn the former intersection from blue to orange")
      }
      else
      {
       console.log( "currently no intersecting paths")
      }
    }
    else
	if( event.key == 'l' )
    {
      console.log( "[l]ist of selected nodes:" )
      document.querySelectorAll( "g.node[tag1]" ).forEach( (svgElm) => { console.log( svgElm.id ) })
    }
    else
         if( event.key == 'm' )
    {
      console.log( "[m]erge path intersections" )
      document.querySelectorAll( "g[tag2]" ).forEach( (svgElm) => { svgElm.removeAttribute( "tag2" ) })
    }
    else 
	if( event.key == 'n' ) // key 'f' also captures CTRL-F in chrome, so no more find-in-page possible
    {
      console.log( "travel [n]orth (forward) direction upon next CLICK" )
      NEXT_CLICK_DIRECTION = DIRECTION_NORTH
    }
    else
	if( event.key == 'r' )
    {
      console.log( "[r]emove a single node upon next CLICK" )
      NEXT_CLICK_MEMORY = event.key
    }
    else
	if( event.key == 's' )
    {
      console.log( "travel [s]outh (backward) direction upon next CLICK" )
      NEXT_CLICK_DIRECTION = DIRECTION_SOUTH
    }
    else
	if( event.key == 'v' )
    {
      console.log( "activating [v]isual mode (de-activating hyperlink mode)" )
      activate_visual_mode()
    }
    else
	 if( event.key == 'x' )
    {
      console.log( "clear path intersections [x]" )
      document.querySelectorAll( "g[tag2]" ).forEach( (svgElm) => { remove_visitor_tags( svgElm ) })
    }
    else
	 if( event.key == 'y' )
    {
      console.log( "[y]ank selection to clipboard" )
      let result = ""
      document.querySelectorAll( "g.node[tag1]" ).forEach( (svgElm) => { result = result + svgElm.id + " , " })
      navigator.clipboard.writeText( result.slice( 0, -3 ) ).then( function() { }, function() { } );
    }
    else
    {
      console.log( event.key )
      handled = false
    }
  } else if (event.keyCode !== undefined) {
    // Handle the event with KeyboardEvent.keyCode and set handled true.
  }

  if (handled) {
    // Suppress "double action" if event handled
    event.preventDefault();
  }
}, true);

function remove_visitor_tags( svgElm )
{
 svgElm.removeAttribute( "tag1"		)
 svgElm.removeAttribute( "tag2"		)
 svgElm.removeAttribute( "colorank"	)
 svgElm.removeAttribute( "distance"	)
 svgElm.removeAttribute( "counterdistance"	)
 svgElm.classList.remove( "dim"		)
}

window.onload = function()
{
 activate_visual_mode()
}

function activate_visual_mode()
{
 document.querySelectorAll( "g.node" ).forEach( (svgElm) => { svgElm.onclick = function(event){onclick(svgElm.id,event)} })
}

function activate_hyperlink_mode()
{
 document.querySelectorAll( "g.node" ).forEach( (svgElm) => { svgElm.onclick = "" })
}

