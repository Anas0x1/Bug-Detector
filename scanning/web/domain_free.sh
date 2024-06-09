#!/bin/bash

# Function to validate domain or subdomain
validate_domain() {
	local domain=$1

	echo "######################################################################"
	echo "Validating Domain Format"
	echo "######################################################################"

	# Regex pattern for domain/subdomain validation
	local pattern="^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$"

	# Check if the input matches the pattern
	if [[ $domain =~ $pattern ]]; then
		echo -e "Valid domain/subdomain format: $domain"
		# Check if the domain is live or down
		check_domain_status "$domain"
	else
		echo -e "Error: Invalid domain/subdomain format: $domain"
		exit 1
	fi
}

check_domain_status() {
	local domain=$1

	echo "######################################################################"
	echo "Checking Domain/Subdomain Connection"
	echo "######################################################################"
	# Check if the domain is live by sending a ping request
	if ping -c 1 "$domain" &>/dev/null; then
		echo -e "Domain is live: $domain"
	else
		echo -e "Error: Domain is down: $domain"
		exit 1
	fi
}

target_whois() {
	local domain=$1

	echo "######################################################################"
	echo "Information gathering"
	echo "######################################################################"
	if command -v whois &> /dev/null; then
		whois "$domain"
	else
		echo "Error: whois command not found"
	fi	
	echo "######################################################################"
	echo "Gathering information using whois command is to identifying registry like creation date, admin country, name servers, etc."
}

web_tech() {
	local domain=$1

	echo "######################################################################"
	echo "Extracting Web Technologies"
	echo "######################################################################"
	if command -v whatweb &> /dev/null; then
		whatweb "$domain" | tr ',' '\n'
	else
		echo "Error: whatweb command not found"
	fi
	echo "######################################################################"
	echo "Collecting web technologies and operating system which website based on"
}

A_Record() {
	local domain=$1

	echo "######################################################################"
	echo "DNS Enumeration (A Record)"
	echo "######################################################################"
	if command -v host &> /dev/null; then
		host -t A $domain | cut -d ' ' -f 4
	else
		echo "Error: Connection timeout"
	fi
	echo "######################################################################"
	echo "Enumerating domain/subdomain dns is a sensitive process that identify A records that fetch the original IPv4 from domain"
}

NS_Record() {
	local domain=$1

	echo "######################################################################"
	echo "DNS Enumeration (NS Record)"
	echo "######################################################################"
	if command -v host &> /dev/null; then
		host -t NS $domain | cut -d ' ' -f 4
	else
		echo "Error: Connection timeout"
	fi
	echo "######################################################################"
	echo "Enumerating domain/subdomain dns is a sensitive process that identify NS records that fetch all name servers"
}

MX_Record() {
	local domain=$1

	echo "######################################################################"
	echo "DNS Enumeration (MX Record)"
	echo "######################################################################"
	if command -v host &> /dev/null; then
		host -t MX $domain | cut -d ' ' -f 4
	else
		echo "Error: Connection timeout"
	fi
	echo "######################################################################"
	echo "Enumerating domain/subdomain dns is a sensitive process that identify NS records that fetch mail servers names"
}

ssl_cert() {
	local domain=$1

	echo "######################################################################"
	echo "Checking SSL Certificate"
	echo "######################################################################"
	if command -v sslyze &> /dev/null; then
		sslyze "$domain"
	else
		echo "Error: sslyze command not found"
	fi
	echo "######################################################################"
	echo "Checking domain/subdomain SSL certificate that related to if the domain/subdomain has a secure or unsecure traffic"
}

check_protocol() {
	local domain=$1

	echo "######################################################################"
	echo "Checking HTTP/HTTPS"
	echo "######################################################################"

	local response=$(curl -sIL "$domain")
	if [[ $response == *"HTTP/1."* ]]; then
		echo -e "Communication is made over unsecure, unencrypted HTTP."
	else
		echo -e "Communication is made over a secure protocol using HTTPS."
	fi
	echo "######################################################################"
	echo "Checking if domain/subdomain uses a HTTP/HTTPS protocol"
}

waf() {
	local domain=$1

	echo "######################################################################"
	echo "Checking WAF"
	echo "######################################################################"
	if command -v wafw00f &> /dev/null; then
		wafw00f http://"$domain" | grep -A 4 -E "Checking"
	else
		echo "Error: wafw00f command not found"
	fi
	echo "######################################################################"
	echo "Checking web application firewall is a sensitive process that detecting if domain/subdomain uses a WAF or not"
}

res_headers() {
	local domain=$1
	echo "######################################################################"
	echo "Checking Response Headers"
	echo "######################################################################"
	curl -sI "$domain" -o results.txt
	for header in $(cat response_headers.txt); do
		if grep -q "^$header:" results.txt; then
			echo -e "Security header: $header exists."
		else
			echo -e "Security header: $header is missing."
		fi
	done
	echo "######################################################################"
	echo "Checking response headers for security impacts that attackers can exploit the existence of specific response header"
	rm results.txt
}

check_robots() {
	local domain=$1

	echo "######################################################################"
	echo "Crawling robots.txt file"
	echo "######################################################################"
	# Fetch the robots.txt file and check the HTTP response code
	local response=$(curl -s -o /dev/null -w "%{http_code}" "http://$domain/robots.txt")
	# Check if the response code is 200 (OK) or 301 (Moved Permanently)
	if [[ "$response" -eq 200 ]] || [[ "$response" -eq 301 ]]; then
		echo -e "http://$domain/robots.txt exists"
	else
		echo -e "robots.txt does not exist for http://$domain"
	fi
	echo "######################################################################"
	echo "Crawling robots.txt file is being inside the information gathering process, this file contains allowed/disallowed user-agents and paths"
}

check_sitemap() {
	local domain=$1

	echo "######################################################################"
	echo "Crawling sitemap.xml file"
	echo "######################################################################"
	# Fetch the sitemap.xml file and check the HTTP response code
	local response=$(curl -s -o /dev/null -w "%{http_code}" "http://$domain/sitemap.xml")
	# Check if the response code is 200 (OK) or 301 (Moved Permanently)
	if [[ "$response" -eq 200 ]] || [[ "$response" -eq 301 ]]; then
		echo -e "http://$domain/sitemap.xml exists"
	else
		echo -e "sitemap.xml does not exist for http://$domain"
	fi
	echo "######################################################################"
	echo "A sitemap file is an XML document that lists the URLs of a website, helping search engines understand its structure and improve indexing."
}

check_clientaccesspolicy() {
	local domain=$1

	echo "######################################################################"
	echo "Crawling clientaccesspolicy.xml file"
	echo "######################################################################"
	# Fetch the clientaccesspolicy.xml file and check the HTTP response code
	local response=$(curl -s -o /dev/null -w "%{http_code}" "http://$domain/clientaccesspolicy.xml")
	# Check if the response code is 200 (OK) or 301 (Moved Permanently)
	if [[ "$response" -eq 200 ]] || [[ "$response" -eq 301 ]]; then
		echo -e "http://$domain/clientaccesspolicy.xml exists"
	else
		echo -e "clientaccesspolicy.xml does not exist for http://$domain"
	fi
	echo "######################################################################"
	echo "A clientaccesspolicy.xml file is an XML configuration file used by Silverlight applications to define cross-domain access policies for making network requests to a domain."
}

check_crossdomain() {
	local domain=$1

	echo "######################################################################"
	echo "Crawling crossdomain.xml file"
	echo "######################################################################"
	# Fetch the crossdomain.xml file and check the HTTP response code
	local response=$(curl -s -o /dev/null -w "%{http_code}" "http://$domain/crossdomain.xml")
	# Check if the response code is 200 (OK) or 301 (Moved Permanently)
	if [[ "$response" -eq 200 ]] || [[ "$response" -eq 301 ]]; then
		echo -e "http://$domain/crossdomain.xml exists"
	else
		echo -e "crossdomain.xml does not exist for http://$domain"
	fi
	echo "######################################################################"
	echo "A crossdomain.xml file is an XML configuration file used by web applications to specify permissions for cross-origin resource sharing, allowing controlled access to resources by external domains."
}

sub_enum() {
	local domain=$1

	echo "######################################################################"
	echo "Subdomain Enumeration"
	echo "######################################################################"
	if command -v subfinder &> /dev/null; then
		subfinder -silent -d "$domain" -o subs.txt
		local count=$(cat subs.txt | wc -l)
		echo -e "Found $count subdomains for $domain"
	else
		echo "Error: subfinder command not found"
	fi
	echo "######################################################################"
	echo "Subdomain enumeration is the process of identifying and listing all the subdomains associated with a main domain, often used for security assessments and reconnaissance."
}

live_subs() {
	local domain=$1

	echo "######################################################################"
	echo "Collecting Live Subdomains"
	echo "######################################################################"
	if command -v httpx &> /dev/null; then
		cat subs.txt | httpx -silent -mc 200 | tee live.txt
		local count=$(cat live.txt | wc -l)
		echo -e "Found $count live subdomains for $domain"
	else
		echo "Error: httpx command not found"
	fi
	rm subs.txt live.txt
	echo "######################################################################"
	echo "Live subdomain enumeration is the process of actively identifying and listing all subdomains of a given domain in real-time."
}

fuzzing() {
	local domain=$1

	echo "######################################################################"
	echo "Finding Sensitive Endpoints"
	echo "######################################################################"
	if command -v dirsearch &> /dev/null; then
		dirsearch -u "$domain" --full-url | grep -oE 'http[s]?://[^[:space:]]+' | tee dirs.txt
		local count=$(cat dirs.txt | wc -l)
		echo -e "Found $count URLs from directory fuzzing for $domain"
	else
		echo "Error: dirsearch command not found"
	fi
	rm dirs.txt
	echo "######################################################################"
	echo "Directory fuzzing is a technique used in cybersecurity to discover hidden directories and files on a web server by systematically testing various directory names."
}

json_files() {
	local domain=$1

	echo "######################################################################"
	echo "Crawling JSON files"
	echo "######################################################################"
	echo "$domain" | waybackurls | grep 'json'
	echo "######################################################################"
	echo "JSON files are lightweight data-interchange formats that may contain structured data or configurations and are often used in web applications."
}

js_files() {
	local domain=$1

	echo "######################################################################"
	echo "Crawling JS files"
	echo "######################################################################"
	katana -u $domain | grep -iE '\.js' | grep -iEv '(\.jsp|\.json)'
	echo "######################################################################"
	echo "JavaScript files contain code that enables dynamic, interactive behavior on websites by manipulating the HTML and CSS, responding to user actions, and communicating with servers."
}

emails() {
	local domain=$1

	echo "######################################################################"
	echo "Finding Emails"
	echo "######################################################################"
	emailfinder -d "$domain" 
	echo "######################################################################"
	echo "EmailFinder can locate email addresses associated with a domain or individual."

}

# Main function to process the input
process_input() {
	local input=$1

	if validate_domain "$input" && check_domain_status "$input"; then
		target_whois "$input"
		web_tech "$input"
		A_Record "$input"
		NS_Record "$input"
		MX_Record "$input"
		ssl_cert "$input"
		check_protocol "$input"
		waf "$input"
		res_headers "$input"
		check_robots "$input"
		check_sitemap "$input"
		check_crossdomain "$input"
		check_clientaccesspolicy "$input"
		sub_enum "$input"
		live_subs "$input"
		fuzzing "$input"
		json_files "$input"
		js_files "$input"
		emails "$input"
		exit 0
	else
		echo "Error: Domain is down or invalid format."
		exit 1
	fi
}

# Get user input
input=$1

# Call the main function with the user input
process_input "$input"
