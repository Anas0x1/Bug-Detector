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

#=================================To scan ip and cidr===============================

# Function to scan single ip
scan_ip(){

local ip=$1

# Check if IP is live
output=$(nmap -sn -PU -PE -T4 -n "$ip")
if echo "$output" | grep -q "Host is up"; then
    echo -e "${boldgreen}[+] IP: $ip is live${reset}"

    # extract mac address if found
    mac=$(echo "$output" | awk '/MAC/{print $3}')
else
    echo -e "${boldred}[-] IP: $ip is not live${reset}"
    exit 1
fi

echo -e "\n${boldcyan}###################### IP: $ip ######################${reset}"

bash scan.sh "$ip"
}


# Functios to scan cidr
perform_scan_for_cidr() {
    local ip=$1
    echo -e "\n${boldcyan}###################### IP: $ip ######################${reset}"
    bash scan.sh "$ip"
}

export -f perform_scan_for_cidr

scan_cidr(){

local cidr=$1

echo -e "\n${cyan}############## Live IP Addresses in $cidr ##############${reset}"
echo -e "[*] Finding Live Hosts..."

# find live hosts on CIDR
live=$(sudo nmap -sn -PU -PE -n -T4 "$cidr" | grep "Nmap scan report" | awk '{print $5}')

if [ ${#live[@]} -eq 0 ]; then
    echo -e "${boldred}[-] NO Live Hosts Found${reset}"
    exit 1
fi

for ip in $live; do
   echo -e "[+] $ip"
done

# count of live hosts
count=$(echo $live | wc -w)
echo -e "\n${cyan}[~] Number of live hosts: $count${reset}"
echo -e "\n[*] Scanning Live Hosts...\n"

parallel -j 4 perform_scan_for_cidr ::: $live

}

#================================To Validate ip and cidr============================
# Function to validate IP
validate_ip() {
local ip=$1
# check if ip address is valid
IFS='.' read -r -a octets <<< "$ip"
for octet in "${octets[@]}"; do
   if (( "$octet" < 0 || "$octet" > 255 )); then
       echo -e "${boldred}[-] Invalid IP Address: $ip${reset}"
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
    echo -e "${boldred}[-] Invalid CIDR${reset}"
    return 1
fi

# check if ip address is valid
if ! validate_ip "$ip_address"; then
    return 1
fi

return 0
}

#==================================== Main ==========================================

start_time=$(date +%s)

# Run with sudo
if [ $(id -u) -ne 0 ]; then
    echo -e "${boldred}This script requires root privileges. Please run it with sudo.${reset}"
    exit 1
fi

# Check if IP is provided as argument
if [ $# -ne 1 ]; then
    echo -e "${boldred}Usage: $0 <IP OR CIDR>${reset}"
    exit 1
fi

echo -e "${cyan}######################## Input Validation ########################${reset}"
# Check if IP or CIDR
input="$1"
if [[ "$input" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]]; then
    if validate_ip "$input"; then
        echo -e "\n${boldgreen}[+] Valid IP Address: $input${reset}"
        # Scan the ip
        scan_ip "$input"
    fi

elif [[ "$input" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}/[0-9]{1,2}$ ]]; then 
    if validate_cidr "$input"; then
        echo -e "\n${boldgreen}[+] Valid CIDR: $input${reset}"
        scan_cidr "$input"
    fi
else
    echo -e "${boldred}Invalid Input: $input${reset}"
fi

end_time=$(date +%s)
elapsed_time=$((end_time - start_time))
echo -e "\n${cyan}Scanning finihsed in: $elapsed_time seconds${reset}"
