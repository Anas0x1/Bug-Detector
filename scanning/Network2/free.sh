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

for cmd in nmap dig whois traceroute masscan grep awk cut paste; do
    check_command "$cmd"
done

#=================================To scan ip===============================

live_ip(){

    local ip=$1

    output=$(nmap -sn -PU -PE -T4 -n "$ip")
    if echo "$output" | grep -q "Host is up"; then
        echo "Output: The IP $ip is live"
    else
        echo "Error: The IP $ip is not live"
        exit 1
    fi
}

reverse_dns_lookup(){

    local ip=$1

    echo "######################################################################"
    echo "Title: Reverse DNS Lookup IP: $ip"
    echo "######################################################################"

    echo "Output: "
    domain=$(dig -x "$ip" +short)
    if [ -z "$domain" ]; then
    	domain="N/A"
    fi
    
    echo "Domain: $domain"
    if [ "$domain" != "N/A" ]; then
        data=$(dig "$domain" ANY +noall +answer)
        if [ -n "$data" ]; then
    	    echo "Additional DNS records: "
    	    echo "$data"
    	fi
    fi
    echo "######################################################################"
    echo "Description: The dig command is used to perform reverse DNS lookup on IPs and retrieve other related records"
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
}

traceroute_scan(){

    local ip=$1

    echo "Title: Traceroute IP:$ip"
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
}

port_scanning(){

    local ip=$1

    echo "Title: Port Scanning IP: $ip"
    echo "######################################################################"

    output=$(masscan -p1-65535 --open-only --max-rate 900 "$ip" 2>/dev/null | awk '/open/{print $4}' | cut -d "/" -f1 | paste -sd, -)
    if [[ $? -ne 0 ]]; then
        echo "Error: Error during port scanning"
    else
        if [ -n "$output" ]; then
            echo "Output: "
            echo "Open Ports: $output"
        
            echo "######################################################################"
            echo "Description: The masscan tool is used for fast port scanning to identify open ports on the target IP address."
            echo "######################################################################"
            echo "Title: Service Detection IP: $ip"
            echo "######################################################################"
            services=$(nmap -sS -Pn -n -sV -T4 -p "$output" $ip )
 	    if [[ $? -ne 0 ]]; then
            	echo "Error: Error during service detection"
            else
                echo "Output: "
                if [ -n "$services" ]; then
	    	    echo "$services" | grep "open"
	        else
	            echo "No services found"
	        fi
	    fi
	    echo "######################################################################"
	    echo "Description: The nmap tool is used to identify services running on open ports on the target IP address."
            echo "######################################################################"
        else
            echo "No open ports found in $ip"
        fi
    fi
}

os_detection(){

    local ip=$1

    echo "Title: OS Detection IP: $ip"
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
            echo "OS detection failed."
        fi
    else
        echo "Error: An error occurred while performing OS detection."
    fi
    echo "######################################################################"
    echo "Description: Perform OS detection using the Nmap command."
    echo "######################################################################"
}

perform_scan(){

    local ip=$1
    
    reverse_dns_lookup "$ip"
    asn_lookup "$ip"
    whois_lookup "$ip"
    traceroute_scan "$ip"
    port_scanning "$ip"
    os_detection "$ip"
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

    echo "Output: The IP $input is valid"
}

#==================================== Main ==========================================

# Run with sudo
if [ $(id -u) -ne 0 ]; then
    echo "This script requires root privileges. Please run it with sudo"
    exit 1
fi

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

perform_scan "$input"
