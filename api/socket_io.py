import os
from dotenv import load_dotenv
import socketio

load_dotenv()

FRONTEND_URL = os.getenv('FRONTEND_URL')

sio_server = socketio.AsyncServer(
  async_mode='asgi',
  cors_allowed_origins=FRONTEND_URL
)

sio_app = socketio.ASGIApp(
  socketio_server=sio_server
)

# current_room_id = ''

@sio_server.event
async def connect(sid, environ, auth):
  print(f'{sid}: connected')
  await sio_server.emit('userConnected', {'sid': sid})

@sio_server.event
async def join_room(sid, room):
  # global current_room_id
  print('room', room)
  # current_room_id = room
  await sio_server.enter_room(sid, room)
  await sio_server.emit('userConnected', f'User has joined the room', room=room)

@sio_server.event
async def updateShapeList(sid, res):
  data = res.get('data')
  room = res.get('idRoom')
  print('idRoom SHAPE', room)
  await sio_server.emit('updateShapeList', {'sid': sid, 'data': data}, room=room)

@sio_server.event
async def updateHistoryShapeList(sid, res):
  data = res.get('data')
  room = res.get('idRoom')
  await sio_server.emit('updateHistoryShapeList', {'sid': sid, 'data': data}, room=room)

# @sio_server.event
# async def disconnect(sid):
#   print(f'{sid}: disconnected')
#   print(f'{current_room_id}: joined')
#   await sio_server.emit('userDisconnected', f'User has left the room', room=current_room_id)
