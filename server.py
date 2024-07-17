import http.server
import socketserver
import argparse

parser = argparse.ArgumentParser(description='Start a simple HTTP server.')
parser.add_argument('--port', type=int, default=8080, help='Port to run the server on (default: 8080)')
args = parser.parse_args()

PORT = args.port
DIRECTORY = "."

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    print(f"Serving at port {PORT}")
    httpd.serve_forever()
