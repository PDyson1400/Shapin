import os
import subprocess
import time

DIR = './js'

def path(file):
    return DIR + '/' + file

def bundle_js():
    subprocess.run(["npm", "run", "bundle"], shell=True, capture_output=True, text=True)

files = os.listdir('./js')
file_changes = {}

for file in files:
        file_changes[file] = os.stat(path(file)).st_mtime

while True:
    files = os.listdir('./js')
    for file in files:
        if os.stat(path(file)).st_mtime != file_changes.get(file):
            local_time = time.localtime()
            current_time = time.strftime("%H:%M:%S", local_time)
            print("changed " + file + " " + current_time)
            file_changes[file] = os.stat(path(file)).st_mtime
            bundle_js()
    time.sleep(1)