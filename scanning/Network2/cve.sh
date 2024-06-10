#!/bin/bash

# Check if an IP address was provided
if [ -z "$1" ]; then
    echo "Usage: $0 <IP_ADDRESS>"
    exit 1
fi

# URL of the webpage
url="https://www.shodan.io/host/$1"

# Extract the CVE numbers using grep with a regex pattern
cves=$(curl -s "$url" | grep -Eo 'CVE-[0-9]{4}-[0-9]+' | sort | uniq | tee cves.txt)

# Count the number of CVEs
cves_number=$(cat cves.txt | wc -l)

echo "Title: Vulnerabilities"
echo "######################################################################"

echo "Output: "
if [ -s "cves.txt" ]; then
    # Iterate over each CVE and its link
    while IFS= read -r cve; do
        # Fetch the HTML content for the CVE
        html_content=$(curl -s "https://nvd.nist.gov/vuln/detail/$cve")
    
        # Debug: print HTML content to ensure it's being fetched correctly
        # echo "$html_content" > "$cve.html"
    
        # Add Description
        description=$(echo "$html_content" | grep -oP '(?<=<p data-testid="vuln-description">).*?(?=</p>)' | sed 's/&\#39;/\'"'"'/g')

        echo -e "CVE Number: $cve"
        echo -e "Description: ${description:-No description found}\n"
    done < cves.txt
else
    echo "NO vulnerabilities found for this IP"
fi
echo "######################################################################"
echo "Description: Scan for vulnerabilities associated with the discovered device(s) using Shodan, enabling     identification of potential security weaknesses in the targeted systems and networks."
echo "######################################################################"
echo "Mitigation: "
if [ -s "cves.txt" ]; then    
    while IFS= read -r cve; do
    
        # Replace the placeholder in the URL with the current CVE
        mitre="https://cve.mitre.org/cgi-bin/cvename.cgi?name=$cve"
        nist="https://nvd.nist.gov/vuln/detail/$cve"
        echo "CVE: $cve"
        echo -e "MITRE Reference: $mitre"
        echo -e "NIST Reference: $nist\n"
    done < cves.txt
else
    echo "NO mitigation"
fi
echo "######################################################################"
# Cleanup
rm cves.txt
