#!/bin/bash

target=$1

# function to search vor vulnerabilities
scan_and_search() {
    local port=$1
    local target=$2

    # perform service detection on the port
    service=$(nmap -Pn -n -T4 -p "$port" --version-intensity 5 -sV -oG - "$target" | grep "Ports: " | cut -d "/" -f5,6,7)
    echo " [+] $port: $service"

    # getting version name
    version=$(echo $service | cut -d "/" -f3)

    if [ -n "$version" ]; then
        # search for vulnerabilities
        vulnerabilities=$(./mitrecve crawl "\"$version\"")
        if [ -n "$vulnerabilities" ]; then
            echo " [+] Vulnerabilites found for this service"
            echo "$vulnerabilities"
        else
            echo " [-] No vulnerabilities for this service"
        fi
    fi
}

export -f scan_and_search



# getting open ports
echo " [-] Performing Port Scan..."
open_ports=$(sudo nmap -sS -Pn -n -p- -T4 --open "$target" | grep -oP '(\d+)/' | awk -F'/' '{print $1}')


# count of open ports
count=$(echo $open_ports | wc -w)
echo " [+] There are ($count) ports open on $target"


# version detection and vulnerability check
echo " [-] Performing Service Detection and Vulnerability Check..."
parallel scan_and_search ::: "${open_ports[@]}" ::: "$target"
