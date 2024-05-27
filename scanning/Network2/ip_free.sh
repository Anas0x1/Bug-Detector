#!/bin/bash

# Function to check if the input is a valid IP address
is_valid_ip() {
    local ip="$1"
    if [[ "$ip" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]]; then
        return 0
    else
        return 1
    fi
}

# Function to check if an IP is live using ping
is_live_ip() {
    local ip=$1
    if ping -c 3 $ip &> /dev/null; then
        return 0
    else
        return 1
    fi
}

# Check if IP is provided as argument
if [ $# -ne 1 ]; then
    echo "######################################################################"
    echo "Error: Usage -> $0 <IP>"
    echo "######################################################################"
    exit 1
fi

ip=$1

echo "######################################################################"
echo "Title:  Checking IP Format/Connectivity"
echo "######################################################################"

# Check if the input is a valid IP address
if ! is_valid_ip $ip; then
    echo "Error: Invalid IP address"
    exit 1
else
    echo "Output: The IP $ip is valid"
fi

# Check if the IP is live
if ! is_live_ip $ip; then
    echo "Error: The IP $ip is not live"
    exit 1
else
    echo "Output: The IP $ip is live"
fi

echo "######################################################################"
echo "Title: Information Gathering"
echo "######################################################################"

echo "Output: "
whois $ip

echo "######################################################################"
echo "Description: The whois command is used to retrieve information about domain names, IP addresses, and related entities from the WHOIS database."
echo "######################################################################"
echo "Title: DNS Lookup"
echo "######################################################################"

echo "Output: "
host $ip

echo "######################################################################"
echo "Description: The host command in Unix-like systems is used to perform DNS lookups, providing information about domain names and their associated IP addresses."
echo "######################################################################"
echo "Title: Port Scanning"
echo "######################################################################"

echo "Output: "
nmap -T4 -A -Pn $ip

echo "######################################################################"
echo "Description: The masscan tool is used for fast port scanning to identify open ports on the target IP address."
