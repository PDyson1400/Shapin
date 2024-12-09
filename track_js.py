import os
import subprocess
import time

DIR = './js'

def path(file):
    return DIR + '/' + file

def npm_run(script):
     subprocess.run(["npm", "run", script], shell=True, capture_output=True, text=True)

def current_time():
    local_time = time.localtime()
    current_time = time.strftime("%H:%M:%S", local_time)
    return current_time

files = os.listdir('./js')
file_changes = {}

for file in files:
        file_changes[file] = os.stat(path(file)).st_mtime

while True:
    files = os.listdir('./js')
    for file in files:
        if os.stat(path(file)).st_mtime != file_changes.get(file):
            # npm_run("lint")
            # print("linted " + current_time())

            npm_run("bundle")
            print("changed " + file + " " + current_time())
            file_changes[file] = os.stat(path(file)).st_mtime
    time.sleep(1)