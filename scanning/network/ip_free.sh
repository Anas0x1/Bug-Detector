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
    echo "Usage: $0 <IP>"
    exit 1
fi

ip=$1

# Check if the input is a valid IP address
if ! is_valid_ip $ip; then
    echo "Invalid IP address"
    exit 1
else
	echo "The IP $ip is valid"
fi

# Check if the IP is live
if ! is_live_ip $ip; then
    echo "The IP $ip is not live"
    exit 1
else
	echo "The IP $ip is live"
fi

# Information gathering using host
echo "############### Information gathering using host ###############"
echo "[+] A Record "
host -t A $ip
echo "\n"
echo "[+] AAAA Record "
host -t AAAA $ip
echo "\n"
echo "[+] TXT Record "
host -t TXT $ip
echo "\n"
echo "[+] MX Record "
host -t MX $ip
echo "\n"
echo "[+] NS Record "
host -t NS $ip
echo "\n"


# Information gathering using nslookup
echo "############### Information gathering using nslookup ###############"
nslookup $ip

# Information gathering using dnsenum
echo "############### Information gathering using dnsenum ###############"
dnsenum $ip

# Port Scanning
echo "############### Port Scanning ###############"
nmap -T4 -Pn $ip
