#!/bin/bash

# Function to check if a command exists
check_command() {
    
local cmd=$1
if ! command -v "$cmd" &> /dev/null; then
    echo "Error: $cmd is not installed."
    exit 1    
fi
}

# Check required commands

for cmd in nmap ping dig whois traceroute grep awk cut paste; do
    check_command "$cmd"
done

#=================================To scan ip===============================

live_ip(){

    local ip=$1

    # Check if IP is live
    if ping -c 3 -W 1 "$ip" &> /dev/null; then
        return 0
    else
        return 1
    fi
}

reverse_dns_lookup(){

    local ip=$1

    echo "Title: Reverse DNS Lookup IP: $ip"
    echo "######################################################################"

    domain=$(dig -x "$ip" +short)
    if [ $? -eq 0 ]; then
        if [ -z "$domain" ]; then
    	    domain="N/A"
        fi
        echo "Output: "
        echo "Domain: $domain"
        
        if [ "$domain" != "N/A" ]; then
            data=$(dig "$domain" ANY +noall +answer)
            if [ -n "$data" ]; then
    	        echo "Additional DNS records: "
    	        echo "$data"
    	    fi
        fi
    else
        echo "Error : Error during performing reverse dns lookup"
    fi
    echo "######################################################################"
    echo "Description: The dig command is used to perform reverse DNS lookup on IPs and retrieve other related records"
    echo "######################################################################"
    echo "Mitigation: It is just information gathering, NO mitigation for it"
    echo "######################################################################"
}

asn_lookup(){
    local ip=$1

    echo "Title: ASN Lookup IP: $ip"
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
    echo "Mitigation: It is just information gathering, NO mitigation for it"
    echo "######################################################################"
}

whois_lookup(){

    local ip=$1

    echo "Title: Whois Lookup IP: $ip"
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
    echo "Mitigation: It is just information gathering, NO mitigation for it"
    echo "######################################################################"
}

traceroute_scan(){

    local ip=$1

    echo "Title: Traceroute IP:$ip"
    echo "######################################################################"

    echo "Output: "
    traceroute_result=$(traceroute "$ip" 2>&1 | awk '!/\*/{print $1, $2, $3}' | column -t )
    if [[ $? -eq 0 ]]; then
        echo "$traceroute_result"
    else
        echo "Error: An error occurred while performing traceroute."
    fi
    echo "######################################################################"
    echo "Description: The traceroute command is used to trace the path packets take to reach the target IP address."
    echo "######################################################################"
    echo "Mitigation: It is just information gathering, NO mitigation for it"
    echo "######################################################################"
}

port_scanning(){

    local ip=$1

    echo "Title: Port Scanning IP: $ip"
    echo "######################################################################"

    
    local ip=$1

    echo "Title: Port Scanning IP: $ip"
    echo "######################################################################"

    output=$(nmap -Pn -n -T4 --open -p1-65535 -sV "$ip" 2>/dev/null | grep -P '^\d+/tcp' | awk '{print $1}')
    if [[ $? -ne 0 ]]; then
        echo "Error: Error during port scanning"
    else
        echo "Output: "
        if [ -n "$output" ]; then
            echo "$output"
        else
            echo "No open ports found in $ip"
        fi
        echo "######################################################################"
        echo "Description: The nmap tool is used for port scanning to identify open ports on the target IP address."
	echo "######################################################################"
	echo "Mitigation: It is just information gathering, NO mitigation for it"
        echo "######################################################################"
    fi
}

perform_scan(){

    local ip=$1
    
    reverse_dns_lookup "$ip"
    asn_lookup "$ip"
    whois_lookup "$ip"
    traceroute_scan "$ip"
    port_scanning "$ip"
    bash cve.sh "$ip"

}
#================================To Validate ip===========================
validate_ip() {
   
    local ip=$1

    if [[ "$input" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]]; then
        IFS='.' read -r -a octets <<< "$ip"
        for octet in "${octets[@]}"; do
            if (( "$octet" < 0 || "$octet" > 255 )); then
                echo "Error: Invalid IP address"
                exit 1
            fi
        done
    else
        echo "Error: Invalid Input: $input"
        exit 1
    fi
    echo "Output: "
    echo "The IP $input is valid"
}

#==================================== Main ==========================================

# Check if IP is provided as argument
if [ $# -ne 1 ]; then
    echo "Usage: $0 <IP>"
    exit 1
fi

echo "######################################################################"
echo "Title: Checking IP Format/Connectivity"
echo "######################################################################"
# Validate the provided argument
input=$1
validate_ip "$input"
live_ip "$input"
echo "######################################################################"
echo "Description: Verifying the Format of IP and connectivity"
echo "######################################################################"
echo "Mitigation: It is just information gathering, NO mitigation for it"

perform_scan "$input"
