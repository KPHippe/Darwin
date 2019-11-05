/**
 * Kyle Hippe
 * Fall 2018
 * November 25
 * JavaScript Documentation, Rediscovering Javascript book
 * No special instructions
 */
/**
 * This file contains several useful utility functions and objects.  You should
 * make use of them throughout the program.
 * 
 * You should not need to edit anything in this file.
 */


 /**
  * A simple class representing a location on the grid.  It has two properties:
  *   row and col.
  */
class Point {
    constructor( row, col ) {
        this.row = row;
        this.col = col;
    }
}

/**
 * This is a global object used to represent directions.  For example, when referring
 * to directions throughout the program, you should use the properites of this object:
 * Direction.NORTH, Direction.SOUTN, Direction.EAST, or Direction.WEST>
 */
Direction = {
    NORTH: 1,
    SOUTH: 2,
    EAST: 3,
    WEST: 4
};

/**
 * This is another global object containing some helpful functions for navigation.
 */
Geometry = {
    /**
     * Returns the direction that is 90 degrees left from dir.
     * @param {Direction property} dir a direction
     */
    leftFrom: function( dir ) {
        if( dir === Direction.NORTH ) return Direction.WEST;
        if( dir === Direction.SOUTH ) return Direction.EAST;
        if( dir === Direction.EAST ) return Direction.NORTH;
        if( dir === Direction.WEST ) return Direction.SOUTH;
    },
    /**
     * Returns the direction that is 90 degrees right from dir.
     * @param {Direction property} dir a direction
     */
    rightFrom: function(dir ) {
        if( dir === Direction.NORTH ) return Direction.EAST;
        if( dir === Direction.SOUTH ) return Direction.WEST;
        if( dir === Direction.EAST ) return Direction.SOUTH;
        if( dir === Direction.WEST ) return Direction.NORTH;
    },
    /**
     * Returns the point that is directly in front of a creature located
     * at point, facing dir.
     * @param {Point} point a position
     * @param {Direction property} dir a direction
     */
    adjacentPoint: function(point, dir) {
        if( dir === Direction.NORTH ) return new Point(point.row - 1, point.col);
        if( dir === Direction.SOUTH ) return new Point(point.row + 1, point.col);
        if( dir === Direction.EAST ) return new Point(point.row, point.col + 1);
        if( dir === Direction.WEST ) return new Point(point.row, point.col - 1);
    },
    /**
     * Returns a random direction.
     */
    randomDirection: function() {
        let d = Math.floor(Math.random() * 4) + 1;
        return d;
    }

};