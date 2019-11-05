/**
 * Kyle Hippe
 * Fall 2018
 * November 25
 * JavaScript Documentation, Rediscovering Javascript book
 * No special instructions
 */
/**
 * This class represents a species of creatures.  It primarily contains
 * the progrm code for the species.
 */
class Species {
    
    /**
     * Constructs a Species object from the given program code.
     * 
     * It should set the following properties:
     *    this.name -- the name of this species
     *    this.color -- the color of this species
     *    this.code  -- an array, containing the code for this species.  Each element of 
     *         this array should contain an object with the following two properties: 
     *         "opcode" and "address".  The "opcode" property is the name of the instruction,
     *         and "address" is the jump address (only needed for instructions that have a
     *         jump location).  For example: one possible entry in the array:
     *                { opcode: "ifenemy", address: 4 }
     * 
     * @param {string} code a string containing the program code for this Species. 
     */
    constructor( code ) {
        // TODO : parse code and store in this.code as described above.  Also, store
        // the color for this species in this.color.
        let tempCode = code.trim().split(/\r?\n/);
        this.code = [];
        //two indents in a row
        for(let i = 0; tempCode[i] != "";i++){
            if(i === 0){
                let tempInstruction = tempCode[i].split(/\s/);
                this.name = tempInstruction[0];
                this.color = tempInstruction[1];
            }
            else{ //needs work to seperate
                let tempInstruction = [tempCode[i]];
                if(tempCode[i] != undefined && tempCode[i].indexOf(' ') >= 0){
                    //let tempInstruction = tempCode.split(' ');
                    let tempInstruction = [tempCode[i].substring(0, tempCode[i].indexOf(' ')),
                             parseInt(tempCode[i].substring(tempCode[i].indexOf(' '), tempCode[i].length))-1];
                    let step = {opcode:tempInstruction[0], address:tempInstruction[1]};
                    this.code.push(step);
                }
                else if(tempCode[i] != undefined && tempCode[i].indexOf(' ') === -1){
                    let step = {opcode:tempInstruction[0], address:null};
                    this.code.push(step);
                }
                
            }
        }    
    }

    /**
     * Returns the code for instruction step.
     * 
     * @param {Number} step the instruction number.
     * @returns {Object} an object containing the instruction for example:  { opcode: "ifwall", address: 4 } 
     */
    programStep( step ) {
        return this.code[step];
    }
}