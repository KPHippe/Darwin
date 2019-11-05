/**
 * Kyle Hippe
 * Fall 2018
 * November 25
 * JavaScript Documentation, Rediscovering Javascript book
 * No special instructions
 */

/**
 * This class manages the main GUI and the simulation loop.  You shouldn't need to
 * edit anything in this file.
 */
class Darwin {

    constructor() {
        this.canvas = document.getElementById("my-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvasW = this.canvas.width;
        this.canvasH = this.canvas.height;
        this.world = new World(40, 40);
        this.animationSpeed = 0.25;
        this.previousTimestamp = null;
        this.timestepEl = document.getElementById("timestep");
        this.timestep = 0;
        this.running = false;
        this.drawGrid();
    }
    /**
     * The main simulation loop.
     * @param {Number} timestamp 
     */
    mainLoop(timestamp) {
        let delta = timestamp - this.previousTimestamp;
        if( ! this.previousTimestamp ) {
            this.previousTimestamp = timestamp;
            delta = 0.0;
        }
        if( delta / 1000.0 > this.animationSpeed ) {
            this.timestep++;
            this.timestepEl.textContent = "" + this.timestep;
            this.world.step();
            this.drawWorld();
            this.previousTimestamp = timestamp;
        }
        if( this.running ) {
            window.requestAnimationFrame((t) => this.mainLoop(t));
        }
    }
    
    /**
     * Clear the canvas
     */
    clear() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvasW, this.canvasH);
    }

    drawWorld() {
        this.clear();
        this.drawGrid();
        this.drawCreatures();
    }

    drawGrid() {
        this.ctx.fillStyle = "black";

        // Rows
        this.ctx.beginPath();
        for( let i = 0; i <= this.world.getRows(); i++ ) {
            let y = i * (this.canvasH / this.world.getRows());
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvasW, y);
        }
        for( let i = 0; i <= this.world.getColumns(); i++ ) {
            let x = i * (this.canvasW / this.world.getColumns());
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvasH);
        }
        this.ctx.stroke();
    }

    drawCreatures() {
        // Assume square cells
        let cellSize = this.canvasW / this.world.getRows();
        let buff = 0.2 * cellSize;
        let creatureSize = cellSize - (2 * buff);
        let c2 = creatureSize / 2;

        this.world.creatures.forEach( (c) => {
            let pt = c.getLocation();
            this.drawCreature( cellSize * pt.col + cellSize / 2, 
                cellSize * pt.row + cellSize / 2, creatureSize, c );
        });
    }

    drawCreature( x, y, size, c ) {
        let c2 = size / 2;

        this.ctx.translate( x, y );
        if( c.getDirection() === Direction.NORTH ) this.ctx.rotate( Math.PI );
        if( c.getDirection() === Direction.EAST ) this.ctx.rotate( -Math.PI / 2);
        if( c.getDirection() === Direction.WEST ) this.ctx.rotate( Math.PI / 2);
        
        this.ctx.fillStyle = c.species.color;
        this.ctx.beginPath();
        this.ctx.moveTo(-c2, -c2);
        this.ctx.lineTo( c2, -c2 );
        this.ctx.lineTo( c2, 0);
        this.ctx.lineTo( 0, c2 );
        this.ctx.lineTo( -c2, 0 );
        this.ctx.fill();
        this.ctx.setTransform(1,0,0,1,0,0);
    }

    start() {
        this.running = true;
        window.requestAnimationFrame((t) => this.mainLoop(t));
    }

    stop() {
        this.running = false;
    }

}

// When the page loads, create a Darwin object and enter main loop
window.addEventListener("load", function() {
    let d = new Darwin();
    let startBtn = document.getElementById('start-sim-btn');
    startBtn.addEventListener("click", () => d.start() );
    let stopBtn = document.getElementById('stop-sim-btn');
    stopBtn.addEventListener("click", () => d.stop() );
});