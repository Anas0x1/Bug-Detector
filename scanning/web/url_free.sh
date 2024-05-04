#!/bin/bash

# Check if the user input is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <URL>"
    exit 1
fi

# Extract the protocol from the URL
protocol="$(echo "$1" | grep -oP '^\w+://')"
if [ -z "$protocol" ]; then
    echo "Invalid URL format. Please include the protocol (e.g., http:// or https://)."
    exit 1
fi

# Check if the link is live
if curl --output /dev/null --silent --head --fail "$1"; then
    echo "Link is live."

    # Check if the link has an endpoint or parameter
    if curl -sI "$1" | grep -qE '^[Ll]ocation:|^Content-Type:.*text/html'; then
        echo "Link has an endpoint or parameter."

        # Extract the endpoint or parameter
        if endpoint="$(basename $1)"; then
            echo "Endpoint found: $endpoint"

            #extracting domain from url
            domain=$echo "$1" | cut -d '/' -f 3)

            #extracting domain ip
            host -t A $domain | cut -d ' ' -f 4 | tee -a ip.txt

            whatweb $domain | tr ',' '\n' | tee -a tech.txt
            dnsrecon -d $domain --lifetime 4.0 | tee -a dns.txt
            sslyze $domain | tee -a ssl.txt

            response_0=$(curl -sIL "$1")
            if [[ $response_0 == *"HTTP/1."* ]]; then
                echo -e "[-] Communication is made over unsecure, unencrypted HTTP. "
            else
                echo -e "[+] Communication is made over a secure protocol using HTTPS. "
            fi

            wafw00f $1 | grep -A 4 -E "Checking" | tee -a waf.txt

            curl -sI "$domain" -o response_headers.txt
            for header in $(cat headers.txt); do
                if grep -q "^$header:" response_headers.txt; then
                    echo -e "[+] Security header:${BOLDGREEN} $header ${WHITE}is present."
                else
                    echo -e "[-] Security header:${RED} $header  ${WHITE}is missing."
                fi; done

            # Use dirsearch to fuzz directories
            echo "Running dirsearch to fuzz directories..."
            dirsearch -u $1 -mc 200

        elif parameter="$(curl -sIL "$1" | grep -iE '^location:|^Content-Type:.*text/html' | grep -oP '(?<=\?).*$' | tail -n1)"; then
            echo "Parameter found: $parameter"

            #extracting domain from url
            domain=$echo "$1" | cut -d '/' -f 3)

            #extracting domain ip
            host -t A $domain | cut -d ' ' -f 4 | tee -a ip.txt

            whatweb $domain | tr ',' '\n' | tee -a tech.txt
            dnsrecon -d $domain --lifetime 4.0 | tee -a dns.txt
            sslyze $domain | tee -a ssl.txt

            response_0=$(curl -sIL "$1")
            if [[ $response_0 == *"HTTP/1."* ]]; then
                echo -e "[-] Communication is made over unsecure, unencrypted HTTP. "
            else
                echo -e "[+] Communication is made over a secure protocol using HTTPS. "
            fi

            wafw00f $1 | grep -A 4 -E "Checking" | tee -a waf.txt

            curl -sI "$domain" -o response_headers.txt
            for header in $(cat headers.txt); do
                if grep -q "^$header:" response_headers.txt; then
                    echo -e "[+] Security header:${BOLDGREEN} $header ${WHITE}is present."
                else
                    echo -e "[-] Security header:${RED} $header  ${WHITE}is missing."
                fi; done
            

        else
            echo "Endpoint or parameter not found."
        fi

    else
        echo "Link does not have an endpoint or parameter."
    fi

else
    echo "Link is not live."
fi
