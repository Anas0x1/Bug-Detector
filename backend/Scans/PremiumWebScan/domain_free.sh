#!/bin/bash

#colors 
END="\e[1m"
Red="\e[31m"
GREEN="\e[32m"
BOLDGREEN="\e[1;${GREEN}"
YELLOW="\033[0;33m"
CYAN="\e[0;36m"
WHITE="\e[0;37m"



# Function to validate domain or subdomain
validate_domain() {
	# Regex pattern for domain/subdomain validation
	pattern="^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$"

	# Check if the input matches the pattern
	if [[ $1 =~ $pattern ]]; then
		echo -e "${CYAN}[+] User Input Validation${WHITE}"
		echo -e "${BOLDGREEN}[+] Valid domain/subdomain: $1 ${WHITE}"
		echo -e "${YELLOW}################################################${WHITE}"
		
		echo -e "${CYAN}[+] Extracting Domain/Subdomain IP${WHITE}" 
		if command -v host &> /dev/null; then
			echo -e "${BOLDGREEN}"
			host -t A $1 | cut -d ' ' -f 4 | tee -a ip.txt
			echo -e "${WHITE}"
			echo -e "${YELLOW}################################################${WHITE}"
		else
			echo "[-] please install host"
		fi

		echo -e "${CYAN}[+] Extracting Web Technologies${WHITE}" 
		if command -v whatweb &> /dev/null;then
			whatweb $1 | tr ',' '\n' | tee -a technologies.txt
			echo -e "${YELLOW}################################################${WHITE}"
		else
			echo "[-] please install whatweb"
		fi

		echo -e "${CYAN}[+] DNS Enumeration${WHITE}" 
		if command -v dnsrecon &> /dev/null;then
			dnsrecon -d $1 --lifetime 4.0 | tee -a dns.txt
			echo -e "${YELLOW}################################################${WHITE}"
		else
			echo "[-] please install dnsrecon"
		fi
		
		echo -e "${CYAN}[+] Checking SSL Certificate${WHITE}" 
		if command -v sslyze &> /dev/null;then
			sslyze $1 | tee -a ssl.txt
			echo -e "${YELLOW}################################################${WHITE}"
		else
			echo "[-] please install sslyze"
		fi

		url="$1"
		response_0=$(curl -sIL "$url")
		echo -e "${CYAN}[+] Checking HTTP/HTTPS${WHITE}"
		if [[ $response_0 == *"HTTP/1."* ]]; then
			echo -e "${RED}[-] Communication is made over unsecure, unencrypted HTTP. ${WHITE}"
			echo -e "${YELLOW}################################################${WHITE}"
		else
			echo -e "${BOLDGREEN}[+] Communication is made over a secure protocol using HTTPS. ${WHITE}"
			echo -e "${YELLOW}################################################${WHITE}"
		fi

		echo -e "${CYAN}[+] Checking WAF${WHITE}" 
		if command -v wafw00f &> /dev/null;then
			 wafw00f http://$1 | grep -A 4 -E "Checking" | tee -a waf.txt
			 echo -e "${YELLOW}################################################${WHITE}"
		else
			echo "[-] please install wafw00f"
		fi

		echo -e "${CYAN}[+] Checking Response Headers${WHITE}"
		curl -sI "$1" -o response_headers.txt
		for header in $(cat headers.txt); do
			if grep -q "^$header:" response_headers.txt; then
				echo -e "[+] Security header:${BOLDGREEN} $header ${WHITE}is present."
			else
				echo -e "[-] Security header:${RED} $header  ${WHITE}is missing."
			fi; done
			
		echo -e "${YELLOW}################################################${WHITE}"
		
		echo -e "${CYAN}[+] Analyze robots.txt for interesting URLs${WHITE}"
		# Fetch the robots.txt file and check the HTTP response code
		response_1=$(curl -s -o /dev/null -w "%{http_code}" "${url}/robots.txt")

		# Check if the response code is 200 (OK) or 301 (Moved Permanently)
		if [ "$response_1" -eq 200 ] || [ "$response_1" -eq 301 ]; then
			echo -e "[+] http://${url}/robots.txt ${BOLDGREEN}is existed ${WHITE}"
			echo -e "${YELLOW}################################################${WHITE}"
		else
			echo -e "[-] robots.txt ${RED}does not exist for http://${url} ${WHITE}"
			echo -e "${YELLOW}################################################${WHITE}"
		fi


		echo -e "${CYAN}[+] Check whether a client access file exists(clientaccesspolicy.xml)${WHITE}" 
		# Fetch the clientaccesspolicy.xml file and check the HTTP response code
		response_2=$(curl -s -o /dev/null -w "%{http_code}" "${url}/clientaccesspolicy.xml")

		# Check if the response code is 200 (OK) or 301 (Moved Permanently)
		if [ "$response_2" -eq 200 ] || [ "$response_2" -eq 301 ]; then
			echo -e "[+] http://${url}/clientaccesspolicy.xml ${BOLDGREEN}is existed ${WHITE}"
			echo -e "${YELLOW}################################################${WHITE}"
		else
			echo -e "[-] clientaccesspolicy.xml ${RED}does not exist for http://${url}${WHITE}"
			echo -e "${YELLOW}################################################${WHITE}"
		fi

		echo -e "${CYAN}[+] Check whether a cross domain file exists(crossdomain.xml)${WHITE}"
		# Fetch the crossdomain.xml file and check the HTTP response code
		response_3=$(curl -s -o /dev/null -w "%{http_code}" "${url}/crossdomain.xml")

		# Check if the response code is 200 (OK) or 301 (Moved Permanently)
		if [ "$response_3" -eq 200 ] || [ "$response_3" -eq 301 ]; then
			echo -e "[+] http://${url}/crossdomain.xml ${BOLDGREEN}is existed ${WHITE}"
			echo -e "${YELLOW}################################################${WHITE}"
		else
			echo -e "[-] crossdomain.xml ${RED}does not exist for http://${url}${WHITE}"
			echo -e "${YELLOW}################################################${WHITE}"
		fi
		
		echo -e "${CYAN}[+] Subdomain Enumeration${WHITE}" 
		if command -v subfinder &> /dev/null;then
			echo -e "${BOLDGREEN}"
			subfinder -silent -d $1 -o subs.txt 
			line_0=$(cat subs.txt | wc -l)
			echo -e "${WHITE}"
			echo -e "${CYAN}[+] Found $line_0 subdomains for $url${WHITE}"
			echo -e "${YELLOW}################################################${WHITE}"
		else
			echo "[-] please install subfinder"
		fi
		
		echo -e "${CYAN}[+] Collecting Live Subdomains${WHITE}" 
		if command -v httpx &> /dev/null;then
			echo -e "${BOLDGREEN}"
			cat subs.txt | httpx -silent -mc 200 | tee live.txt
			line_1=$(cat live.txt | wc -l)
			echo -e "${WHITE}"
			echo -e "${CYAN}[+] Found $line_0 live subdomains for $url${WHITE}"
			echo -e "${YELLOW}################################################${WHITE}"
		else
			echo "[-] please install httpx"
		fi
		
		echo -e "${CYAN}[+] Finding Sensitive Endpoints${WHITE}" 
		if command -v dirsearch &> /dev/null;then
			echo -e "${BOLDGREEN}"
			dirsearch -u $1 --full-url | grep -oE 'http[s]?://[^[:space:]]+' | tee dirs.txt
			line_2=$(cat dirs.txt | wc -l)
			echo -e "${WHITE}"
			echo -e "${CYAN}[+] Found $line_2 URLs from directory fuzzing for $url${WHITE}"
			echo -e "${YELLOW}################################################${WHITE}"
		else
			echo "[-] please install dirsearch"
		fi

	else
		echo -e "${RED} Invalid domain/subdomain: $1 ${WHITE}"
	fi
}


# Get user input
input=$1

# Call the function to validate the input
validate_domain "$input"
	




