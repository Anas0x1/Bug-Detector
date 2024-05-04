#!/usr/bin/python3

#vuln_link = "https://xss-game.appspot.com/level1/frame?query=test"

import subprocess
import sys

# Check if the URL argument is provided
if len(sys.argv) < 2:
	print("Usage: python3 xss.py <URL>")
	sys.exit(1)

# Get the URL from command line argument
url = sys.argv[1]

# Execute the command to run kxss and save the unfiltered tags to a file
result = subprocess.run(f"echo '{url}' | kxss | tee unfiltered_tags.txt", shell=True, capture_output=True, text=True)

# Check if the unfiltered tags file contains vulnerable characters
with open("unfiltered_tags.txt", "r") as file:
	unfiltered_tags = file.read()
	if '<' in unfiltered_tags and '>' in unfiltered_tags and '"' in unfiltered_tags:
		print(f"This link {url} may be vulnerable to XSS")
	else:
		print("Not Vulnerabel to XSS")
