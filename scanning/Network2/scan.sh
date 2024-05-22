#!/bin/bash

# Define color variables
export red="\e[31m"
export green="\e[32m"
export cyan="\e[36m"
export bold="\e[1m"
export reset="\e[0m"
export boldred="${bold}${red}"
export boldgreen="${bold}${green}"
export boldcyan="${bold}${cyan}"

ip=$1


# Perform DNS Lookup
echo -e "\n${cyan}############ Reverse DNS Lookup ############${reset}"
echo -e "[*] Reverse DNS Lookup for $ip..."

domain=$(nslookup -type=PTR "$ip" | grep -i "name" | awk '{print $4}')
   if [ -z "$domain" ]; then
       domain="N/A"
   fi

if [ "$domain" == "N/A" ]; then
    echo "[-] Domain: $domain"
else
    echo "[+] IP: $ip, Domain: $domain"
fi



# Perform whois Lookup
echo -e "\n${cyan}############### Whois Lookup ###############${reset}"
echo -e "[*] Whois Lookup for $ip..."

whois_output=$(whois "$ip" | awk '!/^#/ && NF > 0')
if [[ $? -ne 0 ]]; then
    echo -e "${boldred}[-] Error during whois lookup${reset}\n $whois_output"
else
    echo "$whois_output"
fi



# Perform SSL/TLS Enumeration

echo -e "\n${cyan}############### SSL/TLS Enumeration ###############${reset}"
echo -e "[*] Enumerate SSL/TLS..."
ssl_output=$(sslscan "$ip" 2>/dev/null)
echo "$ssl_output"


# Perform ASN Lookup
echo -e "\n${cyan}############### IP To ASN Lookup ###############${reset}"
echo -e "[*] ASN Lookup for $ip..."
whois -h whois.cymru.com " -v $ip"


# Perform port scan
echo -e "\n${cyan}################ Open Ports ################${reset}"
echo "[*] Performing Port Scanning in $ip..."

output=$(masscan -p1-65535 --open-only --max-rate 800 "$ip" 2>/dev/null | awk '/open/{print $2,$3,$4}')
if [[ $? -ne 0 ]]; then
    echo -e "${boldred}[-] Error during port scanning${reset}"
else
    if [ -n "$output" ]; then
        echo "$output" | while IFS= read -r line; do
            echo "$line"
        done

	count=$(echo "$output" | wc -l)

        echo -e "\n${cyan}[~] Number of open ports: $count${reset}"
    else
        echo -e "${boldred}[-] No open ports found in $ip${reset}"
    fi
fi



# Scan with shodan
bash cve.sh "$ip"
