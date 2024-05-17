#!/bin/bash


# Function to validate domain or subdomain
validate_domain() {
	local url=$1

	# Regex pattern for domain/subdomain validation
	pattern="^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$"

	echo "######################################################################"
	echo "Title: User Input Validation"
	echo "######################################################################"
	# Check if the input matches the pattern
	if [[ $1 =~ $pattern ]]; then
		echo -e "Output: Valid domain/subdomain: $url"
		
		# Check if the domain is live or down
		check_domain_status "$url"
	else
		echo -e "Output: Invalid domain/subdomain: $url"
		exit 1
	fi
}

check_domain_status() {
	local url=$1

	echo "######################################################################"
	echo "Title: Extracting Domain/Subdomain IP"
	echo "######################################################################"
	# Check if the domain is live by sending a ping request
	if ping -c 1 "$url" &>/dev/null; then
		echo -e "Output: Domain is live: $url"

		if command -v host &> /dev/null; then
			echo "Output: "
			host -t A $1 | cut -d ' ' -f 4 
		else
			echo "Error: host Connection Error"
		fi

		echo "######################################################################"
		echo "Title: Extracting Web Technologies"
		echo "######################################################################"
		if command -v whatweb &> /dev/null;then
			whatweb $1 | tr ',' '\n' 
		else
			echo "Error: whatweb Connection Error"
		fi

		echo "######################################################################"
		echo "Title: DNS Enumeration"
		echo "######################################################################"
		if command -v dnsrecon &> /dev/null;then
			dnsenum --enum $1 
		else
			echo "Error: dnsrecon Connection Error"
		fi
		
		echo "######################################################################"
		echo "Title: Checking SSL Certificate"
		echo "######################################################################"
		if command -v sslyze &> /dev/null;then
			echo "Output: "
			sslyze $1 
		else
			echo "Error: sslyze Connection Error"
		fi

		echo "######################################################################"
		echo "Title: Checking HTTP/HTTPS"
		echo "######################################################################"
		url="$1"
		response_0=$(curl -sIL "$url")
		if [[ $response_0 == *"HTTP/1."* ]]; then
			echo -e "Output: Communication is made over unsecure, unencrypted HTTP."
		else
			echo -e "Output: Communication is made over a secure protocol using HTTPS."
		fi

		echo "######################################################################"
		echo "Title: Checking WAF"
		echo "######################################################################"
		if command -v wafw00f &> /dev/null;then
			echo "Output: "
			wafw00f http://$1 | grep -A 4 -E "Checking" 
		else
			echo "Error: wafw00f Connection Error"
		fi

		echo "######################################################################"
		echo "Title: Checking Response Headers"
		echo "######################################################################"
		curl -sI "$1" -o response_headers.txt
		for header in $(cat missing_security_headers.txt); do
			if grep -q "^$header:" response_headers.txt; then
				echo -e "Output: Security header: $header is existed."
			else
				echo -e "Output: Security header: $header is missed."
			fi; done
		
		rm response_headers

		echo "######################################################################"
		echo "Title: Crawling robots.txt file"
		echo "######################################################################"
		# Fetch the robots.txt file and check the HTTP response code
		response_1=$(curl -s -o /dev/null -w "%{http_code}" "${url}/robots.txt")

		# Check if the response code is 200 (OK) or 301 (Moved Permanently)
		if [ "$response_1" -eq 200 ] || [ "$response_1" -eq 301 ]; then
			echo -e "Output: http://${url}/robots.txt is existed"
		else
			echo -e "Output: robots.txt does not exist for http://${url}"
		fi

		echo "######################################################################"
		echo "Title: Crawling clientaccesspolicy.xml file"
		echo "######################################################################"
		# Fetch the clientaccesspolicy.xml file and check the HTTP response code
		response_2=$(curl -s -o /dev/null -w "%{http_code}" "${url}/clientaccesspolicy.xml")

		# Check if the response code is 200 (OK) or 301 (Moved Permanently)
		if [ "$response_2" -eq 200 ] || [ "$response_2" -eq 301 ]; then
			echo -e "Output: http://${url}/clientaccesspolicy.xml is existed"
		else
			echo -e "Output: clientaccesspolicy.xml does not exist for http://${url}"
		fi

		echo "######################################################################"
		echo "Title: Crawling crossdomain.xml file"
		echo "######################################################################"
		# Fetch the crossdomain.xml file and check the HTTP response code
		response_3=$(curl -s -o /dev/null -w "%{http_code}" "${url}/crossdomain.xml")

		# Check if the response code is 200 (OK) or 301 (Moved Permanently)
		if [ "$response_3" -eq 200 ] || [ "$response_3" -eq 301 ]; then
			echo -e "Output: http://${url}/crossdomain.xml is existed"
		else
			echo -e "Output: crossdomain.xml does not exist for http://${url}"
		fi
		
		echo "######################################################################"
		echo "Title: Subdomain Enumeration"
		echo "######################################################################"
		if command -v subfinder &> /dev/null;then
			echo -e "${BOLDGREEN}"
			subfinder -silent -d $1 -o subs.txt 
			line_0=$(cat subs.txt | wc -l)
			echo -e "Output: Found $line_0 subdomains for $url"
		else
			echo "Error: subfinder Connection Error"
		fi
		
		echo "######################################################################"
		echo "Title: Collecting Live Subdomains"
		echo "######################################################################"
		if command -v httpx &> /dev/null;then
			cat subs.txt | httpx -silent -mc 200 | tee live.txt
			line_1=$(cat live.txt | wc -l)
			echo -e "Output: Found $line_1 live subdomains for $url"
		else
			echo "[-] please install httpx"
		fi
		
		rm subs.txt live.txt

		echo "######################################################################"
		echo "Title: Finding Sensitive Endpoints"
		echo "######################################################################"
		if command -v dirsearch &> /dev/null;then
			dirsearch -u $1 --full-url | grep -oE 'http[s]?://[^[:space:]]+' | tee dirs.txt
			line_2=$(cat dirs.txt | wc -l)
			echo -e "Output: Found $line_2 URLs from directory fuzzing for $url"
		else
			echo "Error: dirsearch Connecton Error"
		fi

		rm dirs
	else
		echo -e "Error: Domain is down."
		exit 1
	fi
}



# Get user input
input=$1

# Call the function to validate the input
validate_domain "$input"
	
