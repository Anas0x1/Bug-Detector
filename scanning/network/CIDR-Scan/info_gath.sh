#!/bin/bash

cidr=$1

validate_CIDR(){
    local cidr=$1
    cidr_regex="^([0-9]{1,3}\.){3}[0-9]{1,3}/[0-9]{1,2}$"

    if [[ $cidr =~ $cidr_regex ]]; then

        # split CIDR into ip address and prefix length
        IFS='/' read -r ip_address prefix_length <<< "$cidr"

        # check if prefix length is valid
        if (( $prefix_length < 0 || "$prefix_length" > 32 )); then
            return 1
        fi

        # check if ip address is valid
        IFS='.' read -r -a octets <<< "$ip_address"
        for octet in "${octets[@]}"; do
            if (( $octet < 0 || $octet > 255 )); then
                return 1
            fi
        done

        return 0

    else
        return 1
    fi
}

export -f validate_CIDR


# check if cidr is provided as argument
if [ $# -ne 1 ]; then
    echo "Enter cidr: $0 CIDR"
    exit 1
fi


# check if the cidr is valid
if ! validate_CIDR $cidr; then
    echo "Invalid CIDR: $cidr"
    exit 1
else
    echo "Valid CIDR: $cidr"
fi


printf "\n"
echo "------------------ Live IP Addresses in $cidr ------------------"
printf "\n"

# find live hosts on CIDR
live=$(sudo nmap -sn -PU -n -T4 $cidr | grep "Nmap scan report" | awk '{print $5}')

    if [ ${#live[@]} -eq 0 ]; then
        echo "NO Live Hosts Found"
        exit 1
    fi

    for ip in $live; do
       echo $ip
    done

printf "\n"
echo "--------------- Information Gathering on live IP addresses ---------------"
printf "\n"

# information gathering on live ips
for ip in $live; do
   printf "\n"
   echo "------------------ $ip -----------------"
   # peform DNS lookup
   domain=$(nslookup -type=PTR $ip | grep -i "name" | awk '{print $4}')
   if [ -z $domain ]; then
       domain="N/A"
   fi
   printf "\n"
   echo "---------- Reverse DNS Lookup ----------"
   printf "\n"
   echo "IP: $ip, Domain: $domain"
   printf "\n"


   # perform traceroute
   printf "\n"
   echo "---------- Traceroute ----------"
   printf "\n"
   traceroute $ip
   printf "\n"

   # perform whois lookup
   printf "\n"
   echo "---------- WHOIS Lookup ----------"
   printf "\n"
   whois $ip

done
