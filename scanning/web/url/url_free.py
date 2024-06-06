import subprocess
import sys
import requests

def param_discovery(url):
	print("######################################################################")
	print("Parameter Discovery")
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
			print(f"{result_3.stdout}")
		else:
			print("No parameters exist")

	print("######################################################################")
	print("Discovering hidden parameters is an important for finding vulnerabilities")
	print("######################################################################")
	print("Mitigate parameter discovery by validating and sanitizing all input parameters and implementing proper access controls.")
	result_3 = subprocess.run(f"rm output_2.txt file.txt", shell=True, capture_output=True, text=True)

def xss_scan(url):
	#Check if the URL argument is provided
	if len(sys.argv) < 2:
		print("Usage: python3 xss.py <URL>")
		sys.exit(1)

	print("######################################################################")
	print("Scanning XSS Vulnerability")
	print("######################################################################")
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
	print("######################################################################")
	print("XSS (Cross-Site Scripting) is a security vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users. These scripts can steal sensitive information, deface websites, or redirect users to malicious sites.")
	print("######################################################################")
	print("To mitigate XSS, always sanitize and encode user input before rendering it in the browser, and use Content Security Policy (CSP) to restrict the sources of executable scripts. Additionally, validate and escape dynamic content in templates to prevent malicious code injection.")
	result_4 = subprocess.run(f"rm unfiltered_tags.txt", shell=True, capture_output=True, text=True)

def open_redirect_scan(url):
    print("######################################################################")
    print("Open Redirect Scanning")
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
        print(f"Vulnerable to open redirect: {url} -> {headers['Location']}")
        print("Headers:")
        for key, value in headers.items():
            print(f"{key}: {value}")
    else:
        print(f"Not vulnerable: {url}")

    print("######################################################################")
    print("Open redirect is a vulnerability classified as medium severity because it helps attackers in social engineering.")
    print("######################################################################")
    print("To mitigate open redirect vulnerabilities: Implement server-side URL validation to restrict allowed redirect destinations, Use a whitelist approach to specify trusted redirect URLs and domains.")

def lfi_scan(url):
	#vuln_link="http://testphp.vulnweb.com/showimage.php?file="

	print("######################################################################")
	print("Local File Inclusion Scanning")
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
		print(response.text)
	else:
		print(f"Failed to retrieve the file. HTTP Status Code: {response.status_code}")
	
	print("######################################################################")
	print("Description: Local File Inclusion is a critical vulnerability that allow attackers to access sensitive files on the system")
	print("######################################################################")
	print("Mitigation of LFI vulnerability involves validating user input and restricting file system access, employing input sanitization, and utilizing whitelists for file inclusion. Additionally, employing proper access controls and avoiding the direct use of user input for file system operations are crucial.")


def sqli_scan(url):
	# Check if the URL argument is provided
	if len(sys.argv) < 2:
		print("Usage: python3 sqli.py <URL>")
		sys.exit(1)

	print("######################################################################")
	print("Scanning SQLi Vulnerability")
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
			print(f"This link {url} vulnerable to SQLi")
		else:
			print("Not Vulnerabele to SQLi")

	print("######################################################################")
	print("Description: SQL injection is a critical security vulnerability which allow attackers to retrieve sensitive data from database")
	print("To mitigate SQL injection: Sanitize user inputs by validating and using parameterized queries, Implement proper input validation and encoding to prevent malicious SQL injections.")
	result_3 = subprocess.run(f"rm output*.txt", shell=True, capture_output=True, text=True)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script.py <url>")
        sys.exit(1)
    
    url = sys.argv[1]
    param_discovery(url)
    xss_scan(url)
    open_redirect_scan(url)
    lfi_scan(url)
    sqli_scan(url)

