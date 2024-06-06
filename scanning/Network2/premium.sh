#!/bin/bash

#=================================To scan ip and cidr===============================

# Function to scan single ip
scan_ip(){

local ip=$1

# Check if IP is live
output=$(nmap -sn -PU -PE -T4 -n "$ip")
if echo "$output" | grep -q "Host is up"; then
     echo "Output: The IP $ip is live"

else
    echo "Error: The IP $ip is not live"
    exit 1
fi

perform_scan "$ip"

}

# Function to perform scan
perform_scan(){

local ip=$1

# Perform DNS Lookup
echo "######################################################################"
echo "Title: Reverse DNS Lookup $ip"
echo "######################################################################"

echo "Output: "

domain=$(nslookup -type=PTR "$ip" | grep -i "name" | awk '{print $4}')
   if [ -z "$domain" ]; then
       domain="N/A"
   fi

if [ "$domain" == "N/A" ]; then
    echo "Domain: $domain"
else
    echo "IP: $ip, Domain: $domain"
fi

echo "######################################################################"
echo "Description: The nslookup command is used to perform reverse DNS lookups, To map IP addresses to domain names"
echo "######################################################################"


# Perform ASN Lookup
echo "Title: ASN Lookup $ip"
echo "######################################################################"

asn_result=$(whois -h whois.cymru.com " -v $ip" 2>&1)
if [[ -n $asn_result ]]; then
    echo "Output: "
    echo "$asn_result"
else
    echo "Error: An error occurred while performing the ASN Lookup."
fi
echo "######################################################################"
echo "Description: The whois command is used to retrieve ASN information from the Cymru WHOIS database."
echo "######################################################################"


# Perform Whois lookup
echo "Title: Whois Lookup $ip"
echo "######################################################################"

echo "Output: "
output=$(whois "$ip" 2>&1)

if [ $? -eq 0 ]; then
  filtered_output=$(echo "$output" | awk '!/^#/ && NF > 0')
  
  if [ -n "$filtered_output" ]; then
    echo "$filtered_output"
  else
    echo "No relevant information found for $ip."
  fi
else
  echo "Error: Failed to retrieve whois information."
fi

echo "######################################################################"
echo "Description: The whois command is used to retrieve information about domain names, IP addresses, and related entities from the WHOIS database."
echo "######################################################################"


# Perform Traceroute
echo "Title: Traceroute $ip"
echo "######################################################################"

echo "Output: "
traceroute_result=$(traceroute "$ip" 2>&1 | awk '{print $1, $2, $3}' | column -t )
if [[ $? -eq 0 ]]; then
    echo "$traceroute_result"
else
    echo "Error: An error occurred while performing traceroute."
fi
echo "######################################################################"
echo "Description: The traceroute command is used to trace the path packets take to reach the target IP address."
echo "######################################################################"


# Perform SSL/TLS Enumeration
echo "Title: SSL/TLS Enumeration $ip"
echo "######################################################################"

ssl_result=$(sslscan "$ip" 2>&1)
if echo "$ssl_result" | grep -q "ERROR"; then
        echo "Error: An error occurred while performing the SSL/TLS Enumeration."
else
	echo "Output: "
        echo "$ssl_result"
fi
echo "######################################################################"
echo "Description: SSLScan command queries SSL services, such as HTTPS, in order to determine the ciphers that are supported"
echo "######################################################################"


# Perform port scan
echo "Title: Port Scanning $ip"
echo "######################################################################"

output=$(masscan -p1-65535 --open-only --max-rate 800 "$ip" 2>/dev/null | awk '/open/{print $2,$3,$4}')
if [[ $? -ne 0 ]]; then
    echo "Error: Error during port scanning"
else
    if [ -n "$output" ]; then
        echo "Output: "
        echo "$output" | while IFS= read -r line; do
            echo "$line"
        done

	count=$(echo "$output" | wc -l)

        echo -e "\nNumber of open ports: $count"
    else
        echo "No open ports found in $ip"
    fi
fi

echo "######################################################################"
echo "Description: The masscan tool is used for fast port scanning to identify open ports on the target IP address."
echo "######################################################################"


# Perform OS Detection
echo "Title: OS Detection $ip"
echo "######################################################################"

echo "Output: "
nmap_result=$(nmap -Pn -n -O --osscan-limit --osscan-guess --fuzzy --mtu 24 "$ip" 2>&1)
if [[ $? -eq 0 ]]; then
    os_info=$(echo "$nmap_result" | grep -i "OS details" | awk -F': ' '{print $2}')
    os_guess=$(echo "$nmap_result" | grep -i "Aggressive OS guesses" | awk -F': ' '{print $2}')
    if [[ -n $os_info ]]; then
        echo "OS Details: $os_info"
    elif [[ -n $os_guess ]]; then
        echo "OS Guess: $os_guess"
    else
        echo "OS detection Failed."
    fi
else
    echo "Error: An error occurred while performing OS detection."
fi
echo "######################################################################"
echo "Description: Perform OS detection using the Nmap command."
echo "######################################################################"

# Scan with shodan
bash cve.sh "$ip"
}
export -f perform_scan


scan_cidr(){

local cidr=$1
echo "######################################################################"
echo "Title: Host Discovery"
echo "######################################################################"

echo "Output: "
# find live hosts on CIDR
live=$(sudo nmap -sn -PU -PE -n -T4 "$cidr" | grep "Nmap scan report" | awk '{print $5}')

if [ ${#live[@]} -eq 0 ]; then
    echo "NO Live Hosts Found"
    exit 1
fi

for ip in $live; do
   echo "$ip"
done

# count of live hosts
count=$(echo $live | wc -w)
echo -e "\nNumber of live hosts: $count"
echo "######################################################################"
echo "Description: Performing host discovery with nmap to find live hosts in CIDR"

# Call the function to perform scan on each live ip in parallel
echo "$live" | parallel -j 8 perform_scan
}

#================================To Validate ip and cidr============================
# Function to validate IP
validate_ip() {
local ip=$1
# check if ip address is valid
IFS='.' read -r -a octets <<< "$ip"
for octet in "${octets[@]}"; do
   if (( "$octet" < 0 || "$octet" > 255 )); then
       echo "Error: Invalid IP address"
       return 1
   fi
done

return 0
}

# Function to validate CIDR
validate_cidr() {
local cidr=$1
# split CIDR into ip address and prefix length
IFS='/' read -r ip_address prefix_length <<< "$cidr"

# check if prefix length is valid
if (( "$prefix_length" < 0 || "$prefix_length" > 32 )); then
    echo "Error: Invalid CIDR"
    return 1
fi

# check if ip address is valid
if ! validate_ip "$ip_address"; then
    return 1
fi
return 0
}

#==================================== Main ==========================================

# Run with sudo
if [ $(id -u) -ne 0 ]; then
    echo "This script requires root privileges. Please run it with sudo"
    exit 1
fi

# Check if IP is provided as argument
if [ $# -ne 1 ]; then
    echo "Usage: $0 <IP OR CIDR>"
    exit 1
fi

echo "######################################################################"
echo "Title: Checking IP Format/Connectivity"
echo "######################################################################"

# Check if IP or CIDR
input="$1"
if [[ "$input" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]]; then
    if validate_ip "$input"; then
        echo "Output: The IP $input is valid"
        # Scan the ip
        scan_ip "$input"
    fi
elif [[ "$input" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}/[0-9]{1,2}$ ]]; then 
    if validate_cidr "$input"; then
        echo "Output: The CIDR $input is valid"
        scan_cidr "$input"
    fi
else
    echo "Invalid Input: $input"
fi
