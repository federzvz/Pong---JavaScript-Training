(function () {
    self.Board = function (width, height) {
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
        this.playing = false;
    }

    self.Board.prototype = { // metodo que retorna las barras y las pelotas que estan dentro del tablero
        get elements() {
            var elements = this.bars.map(function (bar) {
                return bar;
            });
            elements.push(this.ball);
            return elements;
        }
    }
})();

(function () {
    self.BoardView = function (canvas, board) {
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.cxt = canvas.getContext("2d");
    }
})();

(function () {
    self.Bar = function (x, y, width, height, board) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.kind = "rectangle";
        this.speed = 10;
    }

    self.Bar.prototype = {
        down: function () {
            this.y += this.speed;

        },
        up: function () {
            this.y -= this.speed;
        },
        toString: function () {
            return "x: " + this.x + "y: " + this.y;
        }
    }
})();

function draw(cxt, element) {

    switch (element.kind) {
        case "rectangle":
            cxt.fillRect(element.x, element.y, element.width, element.height);
            break;

        case "circle":
            cxt.beginPath();
            cxt.arc(element.x, element.y, element.radius, 0, 7);
            cxt.fill();
            cxt.closePath();
            break;
    }
}

document.addEventListener("keydown", function (ev) {
    console.log(ev.keyCode);
    if (ev.keyCode == 87) {
        ev.preventDefault();
        bar.up();

    }
    else if (ev.keyCode == 83) {
        ev.preventDefault();
        bar.down();
    }
    else if (ev.keyCode == 73) {
        ev.preventDefault();
        bar_2.up();
    }
    else if (ev.keyCode == 75) {
        ev.preventDefault();
        bar_2.down();
    }
    else if (ev.keyCode === 32) {
        ev.preventDefault();
        board.playing = !board.playing;

    }
});

(function () {
    self.Ball = function (x, y, radius, board) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed_y = 0;
        this.speed_x = 3;
        this.board = board;
        this.direction = 1;
        this.bounce_angle = 0;
        this.max_bounce_angle = Math.PI / 12;
        this.speed = 3;

        board.ball = this;
        this.kind = "circle";
    }
})();

self.addEventListener("load",main);

function main(){
    var borad = new Board(800,400);
    var bar = new Bar(20,100,40,100,board);
    var canvas = document.getElementById("canvas");
    var board_view = new BoardView(canvas,board);
    board_view.draw();
}