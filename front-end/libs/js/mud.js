
$(document).ready( function() {
    var rpg;
    RPGJS.load(function() {
        rpg = new Rpg("canvas_rpg");
        rpg.loadMap('MAP001', {
            tileset: '023-FarmVillage01.png',
            player:  {
                x: 26,
                y: 18,
                filename: '001-Fighter01.png'
            }
        }, function () {
            rpg.setScreenIn("Player");
        });
    });

    $('#term').terminal(function(command, term) {
        socket.on('server', function (data) {
            console.log("Iterator: ", i);
            console.log("I am receiving: ", data);
            if ( i == data.trans_id ) {
                i += 1;
                term.echo(data.value);
                data = null;
            }
        });

        if (command === 'help') {
            term.echo("Test help");
        }
        else if (command !== '') {
            socket.emit( 'player_action', { data: command } );
        }

//            else if (command !== '') {
//            console.log("wtf am i here?);
//                try {
//                    var result = window.eval(command);
//                    if (result !== undefined) {
//                        term.echo(new String(result));
//                    }
//                } catch(e) {
//                    term.error(new String(e));
//                }
//            }

        else {
            term.echo('');
        }
    }, {
        greetings: 'Shattered Void v.Early',
        name: 'js_demo',
        height: 200,
        prompt: 'mud> '
    });
});