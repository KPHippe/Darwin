/**
 * Kyle Hippe
 * Fall 2018
 * November 25
 * JavaScript Documentation, Rediscovering Javascript book
 * No special instructions
 */
/**
 * A Creature object is a single creature in this simulation.
 */
class Creature {

    /**
     * Constructs a Creature object.
     * 
     * @param {Species} species The species of this creature. 
     * @param {Point} point The position of this creature 
     * @param {Number} direction The direction that this Creature is facing.
     *      One of the properties of the Direction object in geometry.js.
     * @param {World} world A reference to the world object for this simulation. 
     */
    constructor( species, point, direction, world ) {
        this.location = point;
        this.direction = direction;
        this.species = species;
        this.world = world;
        // The program counter (pc) for this creature.  This keeps track of the
        // current instruction in the creature's program. changed to start at 0 since  
        //code starts at 0
        this.pc = 1;
    }

    getSpecies() {
        return this.species;
    }

    getDirection() {
        return this.direction;
    }

    getLocation() {
        return this.location;
    }

    /**
     * Executes this creature's program from the current instruction until one turn
     * is complete.  A turn is complete when one of the instructions:  hop, left,
     * right, or infect is executed.  Prior to that, the creature may execute one or
     * several instructions.
     * 
     * You can access the instructions for the species of this creature via: 
     * this.species.programStep() (see species.js).
     * expect to be long
     */
    takeOneTurn() {
        // do until right left infect hop
        //location and direction are important
        /*turn, this.direction = Geometry.leftFrom(this.direction); might have to make more than 1 line*/
        /*hop see what is infront of creature, if is creature/wall/ obstacle wont move, otherwise move
        
        use species object to get the code and world to see what is infront etc*/
        let keywords = ["hop", "left", "right", "infect"];
        
        for(let i = 0; i < this.species.code.length; i++ ){
            //basecase to break the loop
            if(i > 0 && keywords.includes(this.species.code[this.pc].opcode)){
                break;
            }
        //go instructions, changes pc to address
            if(this.species.code[this.pc].opcode === "go"){
                this.pc = this.species.code[this.pc].address; 
                continue;
            }
        //left
            if(this.species.code[this.pc].opcode === "left"){
                this.direction = Geometry.leftFrom(this.direction);
                this.pc++;
            }
        //right
            if(this.species.code[this.pc].opcode === "right"){
                this.direction = Geometry.rightFrom(this.direction);
                this.pc++;
            }
        //hop
            if(this.species.code[this.pc].opcode === "hop"){
                let firstPoint = new Point(this.location.row, this.location.col);
                let tempPoint = Geometry.adjacentPoint(firstPoint, this.direction);
                let checkSpecies = this.world.getContents(tempPoint.row, tempPoint.col);
                if((checkSpecies === undefined) && (this.world.inRange(tempPoint))){
                        this.location = tempPoint;
                    }
                //else do nothing because something is there or its out of range
                this.pc++
            }
        //ifenemy
            if(this.species.code[this.pc].opcode === "ifenemy"){
                let tempPoint = Geometry.adjacentPoint(this.location, this.direction);
                let checkSpecies = this.world.getContents(tempPoint.row, tempPoint.col);
                if(checkSpecies != undefined && this.species !== checkSpecies.species){
                    this.pc = this.species.code[this.pc].address;
                }
                else{
                    this.pc++;
                }
            }

        //infect
            if(this.species.code[this.pc].opcode === "infect"){
                let tempPoint = Geometry.adjacentPoint(this.location, this.direction);
                let oldCreature = this.world.getContents(tempPoint.row, tempPoint.col);
                if(oldCreature != undefined){
                    let newCreature = new Creature(this.species, tempPoint, oldCreature.direction, this.world);
                    let index = this.world.findIndex(oldCreature);
                    if(index >= 0){
                        this.world.replaceCreature(newCreature, index);
                    }
                }
                this.pc++;

            }
        //ifwall
            if(this.species.code[this.pc].opcode === "ifwall"){
                let tempPoint = Geometry.adjacentPoint(this.location, this.direction);
                if(!this.world.inRange(tempPoint)){ //if it is not inrange
                    this.pc = this.species.code[this.pc].address;
                }
                else{ //else hop
                    this.pc++; 
                }
            }
        //ifsame
            if(this.species.code[this.pc].opcode === "ifsame"){
                let tempPoint = Geometry.adjacentPoint(this.location, this.direction);
                let checkSpecies = this.world.getContents(tempPoint.row, tempPoint.col)
                if(checkSpecies === undefined){
                    this.pc++;
                }
                else if(checkSpecies.species === this.species){
                    this.pc = this.species.code[this.pc].address;
                }
            }
        //if random
            if(this.species.code[this.pc].opcode === "ifrandom"){
                let chance = Math.round(Math.random());
                if(chance === 0){
                    this.pc++;
                }
                else if(chance === 1){
                    this.pc = this.species.code[this.pc].address;
                }
            }
        }
    }
}