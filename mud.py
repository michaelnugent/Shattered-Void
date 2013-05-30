from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals
import gevent.monkey
from socketio.server import SocketIOServer
gevent.monkey.patch_all()

#Hide this in a lib we arn't a webapp damnit this is a MUD
from flask import Flask, request, Response

from socketio import socketio_manage
from socketio.namespace import BaseNamespace

class MudSocketIo(BaseNamespace):
    #define methods to accept various things
    pass


#Flash Shit
app = Flask(__name__)
app.debug = True

@app.route("/socket.io/<path:remaining>")
def socketio(remaining):
    try:
        socketio_manage(request.environ, {'/mud': MudSocketIo}, request)
    except:
        print('Something exploded in socketio_manage')
    return Response()


if __name__ == '__main__':
    print('Starting Web App for SocketIO Requests')
    SocketIOServer(('0.0.0.0', 3141), app, resource="socket.io").serve_forever()
