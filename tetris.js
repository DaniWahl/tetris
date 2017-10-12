class Tetris 
{
    constructor(element) 
    {
        this.element = element;
        this.canvas = element.querySelector('.arena');
        this.nextCanvas = element.querySelector('.next');
        this.context = this.canvas.getContext('2d');
        this.nextContext = this.nextCanvas.getContext('2d');

        this.scale = 20;

        this.arena = new Arena(12, 20, this.scale);
        this.player = new Player(this);

        this.colors = [
            null,
            '#FF0D72',
            '#0DC2FF',
            '#0DFF72',
            '#F538FF',
            '#FF8E0D',
            '#FFE138',
            '#3877FF',
        ];

        let lastTime = 0;
        const update = (time = 0) => {
            const deltaTime = time - lastTime;
            lastTime = time;
        
            this.player.update(deltaTime);
        
            this.draw();
            requestAnimationFrame(update)
        };

        update();

        this.updateScore(0);
    }

    draw() 
    {
        this.context.fillStyle = '#000';
        this.context.fillRect(0,0,this.canvas.width, this.canvas.height);
        this.nextContext.fillStyle = '#000';
        this.nextContext.fillRect(0,0,this.nextCanvas.width, this.nextCanvas.height);
    
        this.drawMatrix(this.arena.matrix, {x:0, y:0}, this.context);
        this.drawMatrix(this.player.matrix, this.player.pos, this.context);

        this.drawMatrix(this.player.nextMatrix, {x:1, y:1}, this.nextContext);
    }
    
    drawMatrix(matrix, offset, context) 
    {
        const scale = this.scale;
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if(value !== 0) {
                    context.fillStyle = this.colors[value];
                    context.strokeStyle = "rgba(0,0,0,0.8)";

                    context.fillRect(
                        (x* scale) + (offset.x * scale), 
                        (y* scale) + (offset.y * scale), 
                        scale, 
                        scale
                    );
                    context.strokeRect(
                        (x* scale) + (offset.x * scale), 
                        (y* scale) + (offset.y * scale), 
                        scale, 
                        scale
                    );
                }
            });
        });
    }

    updateScore(score) 
    {
        this.element.querySelector('.score').innerText = score;
    }
}