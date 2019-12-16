/**
 * Kyle Hippe
 * Fall 2018
 * November 25
 * JavaScript Documentation, Rediscovering Javascript book
 * No special instructions
 */
/**
 * An instance of World represents the simulation world.  
 */
class World {
    
    /**
     * Constructs a World object.
     * @param {Number} w the width of this World (number of columns) 
     * @param {Number} h the height of this World (number of rows)
     */
    constructor( w, h ) {
        this.rows = h;
        this.columns = w;

        // The array containing the Species objects
        this.species = [];

        // The array containing all of the Creatures in this simulation
        this.creatures = [];

        this.loadSpecies();
        this.populate();
    }

    /**
     * Load the programs for each species and create a Species object for each,
     * and add to this.species.
     */
    loadSpecies() {
        let speciesElements = document.activeElement.getElementsByClassName('species-data');
        
        for(let i = 0; i < speciesElements.length; i++){
            let spec = new Species(speciesElements[i].text);
            this.species.push(spec);
        }
    }

    /**
     * Create a random set of creatures with random positions and orientations.
     */
    populate() {
        
        for(let i = 0; i < 40;i++){
            let tempCols = Math.floor(Math.random() * this.columns);
            let tempRows = Math.floor(Math.random() * this.rows);
            let tempPoint = new Point(tempRows, tempCols);
            let tempDir = Geometry.randomDirection();
            let tempBreed= Math.floor(Math.random() * this.species.length);
            let tempSpecies = new Creature(this.species[tempBreed], tempPoint, tempDir, this);
            this.creatures.push(tempSpecies);
        }

    }

    /**
     * Run one simulation step.  This is called from the main GUI.  It must iterate through
     * all creatures and execute takeOneTurn() for each.  For full credit, you must use the
     * forEach method:  this.creatures.forEach(..).
     */
    step() {
        this.creatures.forEach(function(being){
            being.takeOneTurn();
        });
    }

    /**
     * Searches the creature list to find the creature that exists at (row, col).  If
     * no such creature exists, it returns undefined.  For full credit, you must use the
     * find method: this.creatures.find(...).
     * 
     * @param {Number} row the row number 
     * @param {Number} col the column number
     * @returns {Creature} the Creature at (row, col) or undefined if no creature exists
     *     at that location.
     */
    getContents( row, col ) {
        
        let foundCreature = this.creatures.find(function(being){
            let tempPoint = being.getLocation();
            if(tempPoint.row === row && tempPoint.col === col){
                return being;
            }
        });
        return foundCreature;
    }

    getRows() { return this.rows; }
    getColumns() { return this.columns; }

    /**
     * Add a creature to this world.
     * @param {Creature} creature a Creature object.
     */
    addCreature( creature ) {
        this.creatures.push(creature);
    }

    replaceCreature (creature, index){
        this.creatures[index].species = creature.species;
        this.creatures[index].pc = 1;
    }

    findIndex (creature){
        for(let i = 0; i < this.creatures.length; i++){
            if(this.creatures[i].location === creature.location){
                return i;
            }
        }
        return -1;
    }

    /**
     * Returns whether or not point is in the valid range for this World.
     * 
     * @param {Point} point a point.
     * @return {Boolean} true if point is a valid location in this World.
     */
    inRange( point ) {
        if(point.row > this.getRows()-1){
            return false;
        }
        if(point.row < 0){
            return false;
        }
        if(point.col > this.getColumns()-1){
            return false;
        }
        if(point.col < 0){
            return false;
        }
        return true;
    }
}